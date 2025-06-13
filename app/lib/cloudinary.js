import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload an image to Cloudinary
 * @param {string} file - Base64 encoded image or file path
 * @param {string} folder - Cloudinary folder to store the image
 * @returns {Promise<Object>} - Cloudinary upload response
 */
export async function uploadImage(file, folder = "website_content") {
  try {
    // For server-side uploads when you have the file buffer or base64
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "image",
      allowed_formats: ["jpg", "png", "jpeg", "gif", "webp", "svg"],
      transformation: [{ quality: "auto" }],
    })

    return {
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("Failed to upload image")
  }
}

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Cloudinary public ID of the image
 * @returns {Promise<Object>} - Cloudinary deletion response
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    throw new Error("Failed to delete image")
  }
}

/**
 * Generate a signature for client-side uploads
 * @returns {Object} - Signature and other parameters for client-side upload
 */
export function getCloudinaryUploadSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "website_content",
      upload_preset: "website_uploads", // Create this preset in your Cloudinary dashboard
    },
    process.env.CLOUDINARY_API_SECRET,
  )

  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    uploadPreset: "website_uploads",
  }
}
