import joi from "joi";

export const signUp = {
  body: joi
    .object()
    .required()
    .keys({
      ownerName: joi.string().required().min(2).max(20).messages({
        "any.required": "Please enter owner name",
        "string.empty": " Owner name field cannot be empty",
        "string.max": "length must be less than or equal to 20 characters long",
        "string.min": "length must be at least 2 characters long",
      }),
      name: joi.string().required().min(1).max(20).messages({
        "any.required": "Please enter your restaurant name",
        "string.empty": "Name field cannot be empty",
        "string.max": "length must be less than or equal to 20 characters long",
        "string.min": "length must be at least 1 characters long",
      }),
      email: joi.string().required().email().messages({
        "any.required": "Email Is Required",
        "string.empty": "Email field cannot be empty",
        "string.email": "Please Enter Valid Email",
      }),
      password: joi
        .string()
        .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/))
        .min(8)
        .required()
        .messages({
          "any.required": "Password is required.",
          "string.empty": "Password field cannot be empty",
          "string.base": "Password must be a string.",
          "string.pattern.base":
            "Invalid password format. Must include at least one uppercase letter, one lowercase letter, and one number.",
          "string.pattern.invert.base":
            "Invalid characters in the password. Use only letters and numbers.",
          "string.min": "Password must be at least 8 characters long.",
        }),
      cPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.required": "Please confirm your password in cPassword field.",
        "string.empty": "cPassword field cannot be empty",
      }),
      phone: joi.string().required().min(11).max(11).messages({
        "any.required": "Please enter your phone",
        "string.empty": "phone field cannot be empty",
        "string.max":
          "Invalid phone number. Please enter a valid phone number with no more than 11 digits.",
        "string.min":
          "Invalid phone number. Please enter a valid phone number with no more than 11 digits.",
      }),
      address: joi.string().messages({
        "string.empty": "Address field cannot be empty",
      }),
      pincode: joi.string().required().messages({
        "any.required": "Please enter your pincode",
        "string.empty": "pincode field cannot be empty",
      }),
      foodType: joi.string(),
    }) ,
};
export const signIn = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().required().email().messages({
        "any.required": "Email Is Required",
        "string.empty": "Email field cannot be empty",
      }),
      password: joi.string().required().messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty",
      }),
    }),
};
