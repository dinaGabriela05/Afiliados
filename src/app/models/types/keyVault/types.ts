import { Document } from "mongoose";

export interface IKeyVault extends Document {
    keyChekex: string;
    keyCheqScan: string;


}
