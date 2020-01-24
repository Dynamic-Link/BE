const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: "dhiayflin",
  api_key: "266536395857977",
  api_secret: "nKC01YmIE-tSDADn4YdxiSYpj1Q"
})

// Helper to upload image
const uploadImage = async req => {
  return cloudinary.v2.uploader.upload(
    req.files.url.path,
    async (error, result) => {
      if (error) return new Error("Upload Failed")
      return result
    }
  )
}

module.exports = uploadImage
