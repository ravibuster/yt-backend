import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.models.js';
import { upload } from '../middlewares/multer.middlewares.js';  

const registerUser = asyncHandler(async (req, res) => {
  // Logic for registering a user
  if (!req.body.email || !req.body.password) {
    throw new ApiError(400, 'Email and password are required');
  }
  // multer middleware will handle file uploads
  if (!req.files || !req.files.avatar) { 
    throw new ApiError(400, 'Avatar image is required');
  }
  // req.files will contain the uploaded files
  const avatarLocalPath = req.files.avatar[0]?.path; 
  // Assuming multer stores the file in the specified path

  const coverImageLocalPath = req.files.coverImage[0]?.path; // Assuming multer stores the file in the specified path
  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar image is required');
  } 

  const avatar = await User.uploadImage(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await User.uploadImage(coverImageLocalPath) : null;  
  // Add the uploaded image URLs to the request body
  req.body.avatar = avatar?.secure_url; // Assuming the uploadImage method returns an object
  req.body.coverImage = coverImage?.secure_url; // Assuming the uploadImage method returns an object

  // save the user to the database
  if (await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })) {
    throw new ApiError(400, 'User with this email already exists or username is taken');
  }
  const user = await User.create({
    fullName: req.body.fullName,
    username: req.body.username.toLowerCase(),
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    coverImage: coverImage?.secure_url || "",
  });
  // If user creation fails, throw an error
  const createdUser = await User.findById(user._id).select('-password -refreshToken -__v');
  if (!createdUser) {
    throw new ApiError(500, 'User registration failed');
  }
  res.status(201).json({ message: 'User registered successfully', user: createdUser });
});
const loginUser = asyncHandler(async (req, res) => {
  // Logic for logging in a user
  if (!req.body.email || !req.body.password) {
    throw new ApiError(400, 'Email and password are required');
  }
  res.status(200).json({ message: 'User logged in successfully' });
});

export { registerUser, loginUser };
