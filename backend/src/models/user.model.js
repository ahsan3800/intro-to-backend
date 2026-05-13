
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 3,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
            maxLength: 128
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }
    },

    {
        timestamps: true
    }

)


// hashing the password before saving  

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return; 

    this.password = await bcrypt.hash(this.password, 10);
})


// comparing the password 

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema);