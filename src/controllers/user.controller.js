import { User } from '../models/user.model.js'
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


// Generate Refresh And Access Tokens
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()
        
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        
        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something Went Wrong While Generatinig Access Or Refresh Token")
    }
}

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body;

    if (!username || !email || !fullName || !password) { 
        throw new ApiError (400,"All Fields Are Required")
    }

    const existingUser = await User.findOne({
        $or: [{email,username}]
    })

    if (existingUser) {
        throw new ApiError (409,"User Already Exists")
    }

    const user = await User.create({
        username,
        email,
        fullName,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(409,"User Not Created")
    }


    return res
        .status(200)
        .json(new ApiResponse(200, {createdUser}, "User Created Successfully"));
})


// Login User
const loginUser = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;
    
    if (!email || !password) {
        throw new ApiError(400,"Email and Password are Required")
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(404,"User Not Found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401,"Invalid Credentials")
    }

  
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, 
                {user: loggedInUser,accessToken},
                "User Logged In"
            )
    )
})

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
    req.user._id,
        {
        $unset: { refreshToken: 1 },
    },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200, {},"Logged out Successfully"))


})

const allUsers = asyncHandler(async (req, res) => {
    if (!(req.user.role === "admin")) {
        throw new ApiError(
            403,
            "Forbidden: Access Denied"
        )
    }

    const users = await User.find().select("fullname username email")

    return res.json(
        new ApiResponse(200,{users},"All Users")
    )
})
export {
    registerUser,
    loginUser,
    logoutUser,
    allUsers,

}