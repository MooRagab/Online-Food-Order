export interface createVendorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface VendorLoginInputs {
  email: string;
  password: string;
}

export interface VendorPayload {
  _id : string;
}