const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: "lambda-school",
  api_key: "489692727876691",
  api_secret: "_MtqxGzx5qWdpM5EJiLba6XPCWQ"
})

// Helper to upload image
const uploadImage = async req => {
  return cloudinary.v2.uploader.upload(
    req.files.url.path,
    async (error, result) => {
      console.log("result", result)

      if (error) return new Error("Upload Failed")
      return result
    }
  )
}

module.exports = uploadImage
