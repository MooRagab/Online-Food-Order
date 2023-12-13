import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/Online Food Order")
    .then((res) =>
      console.log(`DB Connected successfully on .........${process.env.DBURI} `)
    )
    .catch((err) => console.log(` Fail to connect  DB.........${err} `));
};

export default connectDB;
