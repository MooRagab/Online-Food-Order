import { Request, NextFunction, Response } from "express";

const dataMethod = ["body", "query", "headers", "params"];

export const validation = (schema: []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationArr = [];
      dataMethod.forEach((key, i) => {
        if (schema[key]) {
          // console.log(key);
          const validationResult = schema[key].validate(req[key], {
            abortEarly: false,
          });
          if (validationResult?.error?.details) {
            validationArr.push(validationResult.error.details);
          }
        }
      });
      if (validationArr.length) {
        res
          .status(400)
          .json({ message: "Validation Error", err: validationArr });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", err: error });
    }
  };
};
