import React, { useState, useRef, useEffect } from "react";
import { chat } from "../openai";
import axios from "axios";

export default function GPT() {
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [notes, setNotes] = useState([]);
  const refText = useRef();

  const sendChat = () => {
    setQuestion(text);
    setAnswer("GPT가 생각중입니다 . . . . . . . . . . . . ! ! !");
    chat(text, (result) => {
      setAnswer(result);
    });
    refText.current.focus();
    setText("");
  };

  useEffect(() => {
    refText.current.focus();
    fetchNotes();
  }, []);

  const saveNote = async (question, answer) => {
    try {
      const response = await axios.post(`http://localhost:4000/notes`, {
        question,
        answer,
      });

      console.log(response);
      alert(`중요 노트에 추가되었습니다!`);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteNote = async (id) => {
    const confirmation = window.confirm("완벽히 이해하셨나요?!");

    if (!confirmation) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/notes/${id}`);
      console.log(response);
      alert(`완벽히 이해하셨나요?!`);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <div style={{ position: "relative", width: "80%", marginBottom: 30 }}>
        <input
          value={text}
          ref={refText}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 12,
            fontSize: 20,
          }}
          type="text"
          placeholder="질문을 입력하세요"
        />
        <img
          style={{
            position: "absolute",
            width: 20,
            top: 13,
            right: 1,
            cursor: "pointer",
          }}
          onClick={sendChat}
          src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            flex: 1,
            textAlign: "left",
            border: "1px solid black",
            borderRightWidth: 0,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            padding: 10,
          }}
        >
          <strong style={{ fontSize: 20 }}>Q </strong>
          {question}
        </span>
        <span
          style={{
            flex: 4,
            textAlign: "left",
            border: "1px solid black",
            borderLeftWidth: 0,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            padding: 10,
            marginRight: 10,
          }}
        >
          <strong style={{ fontSize: 20 }}>A </strong> {answer}
        </span>
        <button
          onClick={() => saveNote(question, answer)}
          style={{
            width: 100,
            height: 30,
            backgroundColor: "lightgreen",
            borderWidth: 0,
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          저장하기
        </button>
      </div>
      <br />
      <hr />
      <div>
        <div style={{ textAlign: "center", fontSize: 30, padding: 10 }}>
          중요 노트
        </div>
        {notes.map((note) => (
          <div key={note.id} style={{ marginBottom: 10, display: "flex" }}>
            <span style={{ flex: 1 }}>Q: {note.question}</span>
            <span style={{ flex: 4 }}>A: {note.answer}</span>
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                width: 90,
                height: 30,
                backgroundColor: "lightblue",
                borderWidth: 0,
                borderRadius: 20,
                cursor: "pointer",
              }}
            >
              복습 완료!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
