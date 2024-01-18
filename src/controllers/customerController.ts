import { NextFunction, Request, Response } from "express";
import {
  CartItem,
  CreateCustomerInput,
  OrderInputs,
  editCustomerProfileInput,
} from "../dto";
import {
  customerModel,
  foodModel,
  orderModel,
  transactionModel,
} from "../DB/models";
import bcrypt from "bcrypt";
import { GenerateOtp, sendEmail } from "../services";
import jwt from "jsonwebtoken";
import { offerModel } from "../DB/models/Offer.model";

//-----------------------------------Customer Section---------------------------------

export const customerSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, phone } = <CreateCustomerInput>(
    req.body
  );
  const customer = await customerModel.findOne({ email }).select("email");
  if (customer) {
    res.status(409).json({ message: "Email already exists" });
  } else {
    const customerPhone = await customerModel
      .findOne({ phone })
      .select("phone");
    if (customerPhone) {
      res.status(409).json({ message: "Phone is already used" });
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

      const savedCustomer = await customerModel.create({
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: "",
        orders: [],
      });
      if (!savedCustomer) {
        res.status(400).json({ message: "Fail to Register, Please Try Again" });
      } else {
        const token = jwt.sign(
          { id: savedCustomer._id },
          process.env.EMAIL_TOKEN
        );
        const message = `
      <a href = ${req.protocol}://${req.headers.host}/customer/confirmemail/${token}>Confirm Email</a>
      `;
        await sendEmail(email, "confirmEmail", message);
        res.status(201).json({ message: "Done!", savedCustomer });
      }
    }
  }
};

export const confirmCustomerEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN) as any;
    if (!decoded?.id) {
      res.status(400).json({ message: "In-Valid Token Payload" });
    } else {
      const user = await customerModel.updateOne(
        {
          _id: decoded.id,
          confirmEmail: false,
        },
        { confirmEmail: true }
      );
      user.modifiedCount
        ? res.status(200).json({ message: "Confirmed Done" })
        : res.status(400).json({ message: "Already Confirmed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const customerLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await customerModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    if (!user.confirmEmail) {
      return res
        .status(401)
        .json({ message: "Please Confirm Your Email First" });
    }
    const matchPass = bcrypt.compareSync(password, user.password);
    if (!matchPass) {
      return res.status(401).json({ message: "Wrong Password" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SIGNIN_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      return res
        .status(200)
        .json({ message: "Login Succesfully !", Token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getCustomerProfile = async (req: Request, res: Response) => {
  const customerProfile = await customerModel.findById(req.user._id);
  if (!customerProfile) {
    res.status(404).json({ message: "User Not Found" });
  } else {
    res.status(200).json({ message: customerProfile });
  }
};

export const editCustomerProfile = async (req: Request, res: Response) => {
  const { firstName, lastName, address, password } = <editCustomerProfileInput>(
    req.body
  );
  const customer = await customerModel.findById(req.user._id);
  if (!customer) {
    res.status(404).json({ message: "User Not Found" });
  } else {
    const match = bcrypt.compareSync(password, customer.password);
    if (!match) {
      res.status(401).json({ message: "Wrong Password" });
    } else {
      await customerModel.updateMany(
        { _id: req.user._id },
        { firstName, lastName, address }
      );
      res.status(200).json({ message: "Done !", customer });
    }
  }
};

//--------------------------------------Cart Section----------------------------------

export const addToCart = async (req: Request, res: Response) => {
  const customer = req.user;

  if (customer) {
    const profile = await customerModel.findById(customer._id);
    let cartItems = Array();

    const { _id, unit } = <CartItem>req.body;

    const food = await foodModel.findById(_id);

    if (food) {
      if (profile != null) {
        cartItems = profile.cart;

        if (cartItems.length > 0) {
          // check and update
          let existFoodItems = cartItems.filter(
            (item) => item.food._id.toString() === _id
          );
          if (existFoodItems.length > 0) {
            const index = cartItems.indexOf(existFoodItems[0]);

            if (unit > 0) {
              cartItems[index] = { food, unit };
            } else {
              cartItems.splice(index, 1);
            }
          } else {
            cartItems.push({ food, unit });
          }
        } else {
          // add new Item
          cartItems.push({ food, unit });
        }

        if (cartItems) {
          profile.cart = cartItems as any;
          const cartResult = await profile.save();
          return res.status(200).json(cartResult.cart);
        }
      }
    }
  }

  return res.status(404).json({ msg: "Unable to add to cart!" });
};

export const getCart = async (req: Request, res: Response) => {
  const customer = req.user;

  if (customer) {
    const profile = await customerModel.findById(customer._id);

    if (profile) {
      return res.status(200).json(profile.cart);
    }
  }

  return res.status(400).json({ message: "Cart is Empty!" });
};

export const deleteCart = async (req: Request, res: Response) => {
  const customer = req.user;

  if (customer) {
    const profile = await customerModel
      .findById(customer._id)
      .populate("cart.food")
      .exec();

    if (profile != null) {
      profile.cart = [] as any;
      const cartResult = await profile.save();

      return res.status(200).json(cartResult);
    }
  }

  return res.status(400).json({ message: "cart is Already Empty!" });
};

//-----------------------------------Order Section---------------------------------

export const createOrder = async (req: Request, res: Response) => {
  const customer = req.user;
  if (customer) {
    const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
    const profile = await customerModel.findById(customer._id);
    const cart = <[OrderInputs]>req.body;
    let cartItems = Array();
    let netAmount = 0.0;
    let vendorId;
    const foods = await foodModel
      .find()
      .where("_id")
      .in(cart.map((item) => item._id))
      .exec();

    foods.map((food) => {
      cart.map(({ _id, unit }) => {
        if (food._id == _id) {
          vendorId = food.vendorId;
          netAmount += food.price * unit;
          cartItems.push({ food, unit });
        }
      });
    });
    if (cartItems) {
      const currentOrder = await orderModel.create({
        vendorId: vendorId,
        orderId: orderId,
        items: cartItems,
        totalAmount: netAmount,
        remarks: "",
        deliveryId: "",
      });
      if (currentOrder) {
        profile.cart = [] as any;
        profile.orders.push(currentOrder);
        const profileResponse = await profile.save();
        return res.status(200).json(profileResponse);
      }
    }
  }
  return res.status(400).json({ message: "Error With Create Order" });
};

export const getOrders = async (req: Request, res: Response) => {
  const customer = req.user;

  if (customer) {
    const profile = await customerModel
      .findById(customer._id)
      .populate("orders");
    if (profile) {
      return res.status(200).json(profile.orders);
    }
  }

  return res.status(404).json({ msg: "Orders not found" });
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  if (orderId) {
    const order = await orderModel.findById(orderId).populate("items");

    if (order) {
      return res.status(200).json(order);
    }
  }

  return res.status(404).json({ msg: "Order not found" });
};

//-----------------------------------Offers Section---------------------------------

export const verifyOffer = async (req: Request, res: Response) => {
  const offerId = req.params.id;
  const customer = req.user;

  if (customer) {
    const appliedOffer = await offerModel.findById(offerId);

    if (appliedOffer) {
      if (appliedOffer.isActive) {
        return res
          .status(200)
          .json({ message: "Offer is Valid", offer: appliedOffer });
      }
    }
  }

  return res.status(400).json({ msg: "Offer is Not Valid" });
};

//-----------------------------------Payment Section---------------------------------

export const createPayment = async (req: Request, res: Response) => {
  const customer = req.user;

  const { amount, paymentMode, offerId } = req.body;

  let payableAmount = Number(amount);
  if (offerId) {
    const appliedOffer = await offerModel.findById(offerId);

    if (appliedOffer.isActive) {
      payableAmount = payableAmount - appliedOffer.offerAmount;
    }
  }
  // perform payment gateway charge api

  // create record on transaction
  const transaction = await transactionModel.create({
    customer: customer._id,
    vendorId: "",
    orderId: "",
    orderValue: payableAmount,
    offerUsed: offerId || "EGY",
    status: "OPEN",
    paymentMode: paymentMode,
    paymentResponse: "Payment is cash on Delivery",
  });

  //return transaction
  return res.status(200).json(transaction);
};
