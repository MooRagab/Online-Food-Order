
export class CreateCustomerInput {
  email: string;

  phone: string;

  password: string;

  firstName: string;

  lastName: string;
}

export class UserLoginInput {
  email: string;

  password: string;
}

export class editCustomerProfileInput {
  firstName: string;
  address: string;
  lastName: string;
  password: string;
}

export class CartItem {
  _id: string;
  unit: number;
}
export class OrderInputs {
  txnId: string;
  amount: number;
  items: [CartItem];
}

export class CreateDeliveryUserInput {
  email: string;

  phone: string;

  password: string;

  firstName: string;

  lastName: string;

  address: string;

  pincode: string;
}
