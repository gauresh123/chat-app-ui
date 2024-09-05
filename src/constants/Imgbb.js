import axios from "axios";

export const IMGBBuploadImage = async (image) => {
  let body = new FormData();
  body.set("key", "b6039e9bcebd091e652fb70408d6bc25");
  body.append("image", image);

  try {
    const { data } = await axios.post("https://api.imgbb.com/1/upload", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!data) {
      return { error: "There was an error" };
    }
    return { imgurl: data.data.url };
  } catch (error) {
    return { error: error.message };
  }
};

export const getImageBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Data = reader.result.split(",")[1];
      resolve(base64Data);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
