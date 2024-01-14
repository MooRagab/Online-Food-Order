import { IsEmail, Length } from "class-validator";

export class CreateCustomerInput {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;

  firstName: string;
  
  lastName: string;
}

export class UserLoginInput {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}
