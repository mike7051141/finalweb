import axios from "axios";
import { useState } from "react";

const Papago = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState("");
  const translate = async () => {
    try {
      const response = await axios.post(
        `/v1/papago/n2mt?source=ko&target=en&text=${inputText}`,
        {
          data: null,
        },
        {
          headers: {
            "X-Naver-Client-Id": "CA8uwjnx8DPQfeGEvUbc",
            "X-Naver-Client-Secret": "bsewsKaUBr",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
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
          placeholder="단어 혹은 문장을 입력하세요 :"
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
      <button onClick={translate}>번역</button>
      <p style={{ color: "darkblue", fontSize: 16 }}>{data}</p>
    </div>
  );
};

export default Papago;
