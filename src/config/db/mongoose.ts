import mongoose from "mongoose";
import { MongoError } from "mongodb";
import { keyVault } from "../validators/keyVault";
mongoose.Promise = global.Promise;

export const connectDB = async () => {
 const conexion = await keyVault([
  'MONGODBURI',
   ]);
  const mongoURI = conexion.MONGODBURI as string;
  
  mongoose.connect(
    mongoURI,
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    },
    (err: MongoError) => {
      if (err) {
        console.warn(err);
        return console.warn("Unable to connect to the db");
      }
      console.log("DB Connected");
    }
  );
};

export { mongoose };
