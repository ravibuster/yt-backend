import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (filePath) => {
  try {
    if(!filePath) return null; // Check if filePath is provided
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto', // Automatically detect the resource type
    })
    if (!result || !result.secure_url) {
      throw new Error('Failed to upload image to Cloudinary')
    }
    console.log('Image uploaded successfully:', result.secure_url)
    fs.unlinkSync(filePath) // Remove the file after upload
    return result
  } catch (error) {
    fs.unlinkSync(filePath) // Ensure the file is removed even if upload fails
    console.error('Error uploading image:', error) 
    throw error
  }
}

export { uploadOnCloudinary as uploadImage } // Export the upload function for use in other modules
export default cloudinary; // Export the configured cloudinary instance