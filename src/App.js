import React, { useState, useRef, useEffect } from "react";
import { chat } from "./openai";
import axios from "axios";
import "./style.css";
import PapagoTranslator from "./PapagoTranslator";
export default function App() {
  const [current, setCurrent] = useState("third");
  return (
    <div>
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          color: "white",
          display: "flex",
          padding: 15,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("main")}>
          <h3 className="item">메인 페이지</h3>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("second")}>
          <h3 className="item">GPT</h3>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("third")}>
          <h3 className="item">Translator</h3>
        </div>
      </div>
      {current === "main" && <Main />}
      {current === "second" && <Second />}
      {current === "third" && <Third />}
    </div>
  );
}
const Main = () => {
  const title = "웹 개발 응용 (화) 프로젝트";
  const [imageSrc, setImageSrc] = useState("kangnam_logo.png");
  const [kangnamInfo, setKangnamInfo] = useState({
    name: "",
    id: "",
    intro: "",
  });

  const names = ["김경모", "김민", "김민기"];
  const srcs = ["kimmo.jpg", "kimmin.jpg", "kimmingi.jpg"];
  const kangnamId = ["201904011", "201904016", "201904017"];
  const kangnamIntro = [
    "안녕하세요 ICT융합공학부 19학번 김경모입니다.",
    "안녕하세요 소프트웨어응용학부 19학번 김민입니다.",
    "안녕하세요 소프트웨어응용학부 19학번 김민기입니다.",
  ];

  const handleImageChange = (index) => {
    setImageSrc(srcs[index]);
    setKangnamInfo({
      name: names[index],
      id: kangnamId[index],
      intro: kangnamIntro[index],
    });
  };

  return (
    <div
      className="center"
      style={{
        width: "100%",
        height: 1100,
        backgroundImage: 'url("/back2.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 style={{ textAlign: "center", color: "black" }}>{title}</h1>
      <table>
        <tr>
          <td id="td2">
            <img
              alt="pic"
              className="zoom round"
              id="imagekangnam"
              src={imageSrc}
              width={250}
            />
          </td>
          <td>
            <table id="grid">
              <tbody>
                {names.map((name, index) => (
                  <tr key={index}>
                    <td className="td-left">
                      <img
                        alt="pic"
                        className="ChangeImage"
                        width={60}
                        onClick={() => handleImageChange(index)}
                        src={srcs[index]}
                      />
                    </td>
                    <td className="td-right">
                      <span>{name}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td width="100px" className="hide">
            이름:
          </td>
          <td width="300px">
            <span id="knames">{kangnamInfo.name}</span>
          </td>
        </tr>
        <tr>
          <td className="hide">학번:</td>
          <td>
            <span id="kangnamID">{kangnamInfo.id}</span>
          </td>
        </tr>
        <tr>
          <td className="hide">소개:</td>
          <td>
            <span id="kangnamIntro">{kangnamInfo.intro}</span>
          </td>
        </tr>
      </table>
    </div>
  );
};

const Second = () => {
  const [text, setText] = useState("hello");
  const [message, setMessage] = useState("");
  const refText = useRef();

  const sendChat = () => {
    const prompt = text;
    setText("");
    refText.current.focus();
    setMessage((message) => message + "Q:" + text + "\n");
    chat(prompt, (result) => {
      console.log("==>", result);
      setMessage((message) => message + "A:" + result + "\n");
    });
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ flex: 10 }}>
        <div>{message}</div>
      </div>

      <div style={{ flex: 3 }}>
        <div style={{ flexDirection: "row" }}>
          <input
            type="text"
            style={{
              width: 300,
              fontSize: 15,
              borderColor: "red",
              borderWidth: 2,
            }}
            onChange={(evt) => setText(evt.target.value)}
            ref={refText}
            value={text}
          />
          <button onClick={() => sendChat()}>Send</button>
        </div>
      </div>
    </div>
  );
};

const Third = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const translator = new PapagoTranslator("CA8uwjnx8DPQfeGEvUbc", "bsewsKaUBr");

  const handleTranslate = async () => {
    try {
      const result = await translator.translate(inputText);
      setTranslatedText(result);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>한글을 영어로 번역하기</h2>
      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="번역할 한글을 입력하세요"
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={handleTranslate}>번역하기</button>
      </div>
      {translatedText && (
        <div style={{ marginTop: 20 }}>
          <h3>번역 결과:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};
