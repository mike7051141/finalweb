// papago.js
import { useState } from "react";
import axios from "axios";

const Kogpt = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const makeStroy = async () => {
    try {
      const data = JSON.stringify({
        prompt: inputText,
        max_tokens: 512,
        temperate: 0.8,
        top_p: 1,
        n: 1,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        //url: "/v1/inference/kogpt/generation",
        headers: {
          Authorization: "KakaoAK 4eb86019e227977251af1441c837fb0c",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      setTranslatedText(inputText + response.data.generations[0].text);
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
          placeholder="스토리의 초기부분을 작성해주세요 :"
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
      <button onClick={makeStroy}>스토리 생성</button>
      <p style={{ color: "darkblue", fontSize: 16 }}>{translatedText}</p>
    </div>
  );
};

export default Kogpt;
