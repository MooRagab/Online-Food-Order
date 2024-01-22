import joi from "joi";

const itemSchema = joi.object({
  _id: joi.string().required().length(24).messages({
    "any.required": "_id for product Is Required",
    "string.empty": "_id field cannot be empty",
    "string.length": "The _id field must be exactly 24 characters long.",
  }),
  unit: joi.number().required().min(1).messages({
    "any.required": "unit  Is Required",
    "string.empty": "unit field cannot be empty",
  }),
});

export const createOrder = {
  body: joi.object().keys({
    amount: joi.number().required().messages({
      "any.required": "Amount Is Required",
      "number.empty": "amount field cannot be empty",
    }),
    items: joi.array().items(itemSchema).required(),
  }),
};
