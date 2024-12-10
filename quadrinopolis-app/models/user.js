import { timeStamp } from "console";
import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        password: {type: String, required: true},
    },
    {timestamps : true}
);

const modelName = mongoose.models.user || mongoose.model("user", userSchema);

export default modelName;