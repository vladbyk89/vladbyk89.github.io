import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./UserModel";
import { ListSchema } from "./ListModel";

export interface BoardInterface {
  name: string;
  imageSrc: string;
  userList: [string];
  _id: string;
}

export const BoardSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    userArray: {
      type: [UserSchema],
      required: true,
    },
    listArray: {
      type: [ListSchema],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<BoardInterface>("Board", BoardSchema);
