import React, { useState } from "react";
import GPT from "./pages/GPT";
import Main from "./pages/Main";
import Papago from "./pages/Papago";
import Kogpt from "./pages/Kogpt";
import Karlo from "./pages/Karlo";
import Book from "./pages/Book";
import Kymo from "./pages/Kymo";
import Min from "./pages/Min";
export default function App() {
  const [current, setCurrent] = useState("main");

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
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("kymo")}>
          <h3 className="item">경모</h3>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("min")}>
          <h3 className="item">민</h3>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent("book")}>
          <h3 className="item">Book</h3>
        </div>
      </div>
      {current === "main" && <Main />}
      {current === "gpt" && <GPT />}
      {current === "kymo" && <Kymo />}
      {current === "min" && <Min />}
      {current === "book" && <Book />}
    </div>
  );
}
