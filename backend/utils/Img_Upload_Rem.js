const cloudinary =require('./cloudinary')

const extractPublicIdFromUrl = (url) => {

  const match = url.split('/');

  if (match[match.length-2]) {
    let s=match[match.length-2]+'/'+match[match.length-1]
     return s.split('.')[0]
  } else {
    throw new Error('Invalid Cloudinary URL');
  }
};




// Cloudinary Upload Function
exports.uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "drivers", resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};


exports.removeImg = (imageUrl) => {
  return new Promise((resolve, reject) => {
   
    try {
      const publicId = extractPublicIdFromUrl(imageUrl);
      console.log(publicId)
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

