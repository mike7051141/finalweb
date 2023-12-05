import axios from "axios";
import { useState, useEffect } from "react";

const Read = () => {
  const [inputText, setInputText] = useState("");
  const [books, setBooks] = useState([]);
  const [unreadBooks, setUnreadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    searchBook();
  }, []);

  const searchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/documents`);

      console.log("API Response:", response.data);

      // 책 정보 매핑
      const bookData = response.data.map((document) => ({
        id: document.id,
        authors: document.authors,
        contents: document.contents,
        price: document.price,
        publisher: document.publisher,
        title: document.title,
        thumbnail: document.thumbnail,
        finishDate: document.finishDate,
        hasRead: document.hasRead,
      }));
      console.log("Mapped Book Data:", bookData);

      // 모든 도서를 state에 저장
      setBooks(bookData);

      // hasRead가 false인 도서만 따로 저장
      setUnreadBooks(bookData.filter((book) => !book.hasRead));

      // hasRead가 true인 도서만 따로 저장
      setReadBooks(bookData.filter((book) => book.hasRead));
    } catch (error) {
      console.error(error);
    }
  };

  const finishReading = async (book) => {
    try {
      // hasRead 값을 true로 변경
      book.hasRead = true;

      // Make a request to update the hasRead value for the clicked document
      await axios.put(`http://localhost:4000/documents/${book.id}`, book);

      // 독서 목록 다시 불러오기
      searchBook();
    } catch (error) {
      console.error(error);
    }
  };

  const unfinishReading = async (book) => {
    try {
      // hasRead 값을 true로 변경
      book.hasRead = false;

      // Make a request to update the hasRead value for the clicked document
      await axios.put(`http://localhost:4000/documents/${book.id}`, book);

      // 독서 목록 다시 불러오기
      searchBook();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRead = async (bookId) => {
    try {
      // Make a request to update the hasRead value for the clicked document
      await axios.delete(`http://localhost:4000/documents/${bookId}`);
      // 독서 목록 다시 불러오기
      searchBook();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: 20 }}>
      <h3>아직 읽지 않은 책들</h3>
        {/* 책 정보들 매핑해서 출력하기 */}
        {unreadBooks.map((book, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 20 }}>
            {/* 썸네일 */}
            <img
              src={book.thumbnail}
              alt="Thumbnail"
              style={{ maxWidth: "150px", marginRight: 20 }}
            />

            {/* 책 제목, 내용, 가격, 출판사 등등 */}
            <div>
              <h2 style={{ fontSize: 20 }}>{book.title}</h2>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {book.contents}
              </p>
              <p>가격: {book.price}원</p>
              <p>출판사: {book.publisher}</p>
              <p>읽기 완료 예정일 : {book.finishDate}</p>
              <button onClick={() => finishReading(book)}>읽기 완료</button>
            </div>
          </div>
        ))}
      </div>


      <div style={{ padding: 20 }}>
        <h3>다 읽은 책들</h3>
        {/* 책 정보들 매핑해서 출력하기 */}
        {readBooks.map((book, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 20 }}>
            {/* 썸네일 */}
            <img
              src={book.thumbnail}
              alt="Thumbnail"
              style={{ maxWidth: "150px", marginRight: 20 }}
            />

            {/* 책 제목, 내용, 가격, 출판사 등등 */}
            <div>
              <h2 style={{ fontSize: 20 }}>{book.title}</h2>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {book.contents}
              </p>
              <p>가격: {book.price}원</p>
              <p>출판사: {book.publisher}</p>
              <p>읽기 완료 예정일 : {book.finishDate}</p>
              <button onClick={() => unfinishReading(book)}>읽기 취소</button>
              <button onClick={() => deleteRead(book.id)}>책 삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
