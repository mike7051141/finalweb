import React, { useState } from "react";
import Main from "./pages/Main";
import Books from "./pages/Books";
import Songs from "./pages/Songs";
import Read from "./pages/Read";
import SongList from "./pages/SongList";
import GPT from "./pages/GPT";

const pages = ["main", "Songs", "SongList", "Books", "Read", "GPT"];

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
          padding: 0,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {pages.map((page) => (
          <div
            key={page}
            style={{
              width: 210,
              height: 30,
              padding: 15,
              cursor: "pointer",
              background: current === page ? "#919191" : "black",
              color: current === page ? "black" : "white",
            }}
            onClick={() => setCurrent(page)}
          >
            <h3 className="item">{page === "main" ? "메인 페이지" : page}</h3>
          </div>
        ))}
      </div>
      {current === "main" && <Main />}
      {current === "Songs" && <Songs />}
      {current === "Books" && <Books />}
      {current === "Read" && <Read />}
      {current === "SongList" && <SongList />}
      {current === "GPT" && <GPT />}
    </div>
  );
}
