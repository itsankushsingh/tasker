import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


// User Schema - Ankush
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        password: {
            type: String,
            required: [true, 'Password is Required'],
            minlength : 6
        },
        refreshToken: {
            type: String,
         
        }

    },
    {
        timestamps: true
    }
)

// Hashing The Password Before Saving to the database
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    
    
})

// Comparing Password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

// Generating Acccess Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Generating Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

const User = mongoose.model("User", userSchema)

export {User}