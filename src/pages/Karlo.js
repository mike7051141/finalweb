// papago.js
import { useState } from "react";
import axios from "axios";

const Karlo = () => {
  const [inputText, setInputText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const makeImg = async () => {
    try {
      const data = JSON.stringify({
        prompt: inputText,
      });

      const config = {
        method: "post",
        url: "/v2/inference/karlo/t2i",
        maxBodyLength: Infinity,
        headers: {
          Authorization: "KakaoAK 4eb86019e227977251af1441c837fb0c",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      setImageUrl(response.data.images[0].image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="이미지에 대한 설명을 해주세요 (영어만 가능) :"
          rows={4}
          style={{ width: "80%" }}
        />
        <button onClick={makeImg}>이미지 제작</button>
      </div>

      <img
        src={imageUrl}
        alt="Generated Image"
        style={{ marginTop: 10, maxWidth: "100%" }}
      />
    </div>
  );
};

export default Karlo;
