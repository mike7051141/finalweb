import React, { useState } from "react";
import GPT from "./pages/GPT";
import Main from "./pages/Main";
import Kogpt from "./pages/Kogpt";
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
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("gpt")}>
          <h3 className="item">GPT</h3>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("kogpt")}>
          <h3 className="item">Kogpt</h3>
        </div>
      </div>
      {current === "main" && <Main />}
      {current === "gpt" && <GPT />}
      {current === "kogpt" && <Kogpt />}
    </div>
  );
}
