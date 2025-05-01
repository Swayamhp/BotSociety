import cloudinary from 'cloudinary';
// import { v2 as cloudinary } from 'cloudinary'; // for ES6 modules

cloudinary.config({
  cloud_name: 'dg71ir3qm',
  api_key: '133914543891541',
  api_secret: 'VbMz7Vc7rUIkU_wj1CnDxhzsvnI',
});
//api environment variables CLOUDINARY_URL=cloudinary://133914543891541:VbMz7Vc7rUIkU_wj1CnDxhzsvnI@dg71ir3qm
export const uploadBase64Image = async (base64Image) => {
  try {
    // Add "data:image/png;base64," if not already present
    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`, // or jpeg/gif depending on type
      {
        folder: 'genai_images'
      }
    );
    return uploadResponse.secure_url; // <- this is the image URL
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
  }
};