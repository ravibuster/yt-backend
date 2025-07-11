import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (filePath) => {
  try {
    if(!filepath) return null; // Check if filePath is provided
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto', // Automatically detect the resource type
    })
    fs.unlinkSync(filePath) // Remove the file after upload
    return result
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export { uploadImage }
export default cloudinary; // Export the configured cloudinary instance