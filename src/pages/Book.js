import axios from "axios";
import { useState } from "react";

const Book = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState("");
  const searchBook = async () => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v3/search/book?target=title&query=${inputText}`,
        {
          headers: {
            Authorization: `KakaoAK 4eb86019e227977251af1441c837fb0c`,
          },
        }
      );

      console.log(response.data);
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
      <button onClick={searchBook}>책 검색</button>
      <p style={{ color: "darkblue", fontSize: 16 }}>{data}</p>
    </div>
  );
};

export default Book;
