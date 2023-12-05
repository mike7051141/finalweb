import axios from "axios";
import { useState } from "react";

const Read = () => {
  const [inputText, setInputText] = useState("");
  const [books, setBooks] = useState([]);

  const searchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/documents`);

      console.log("API Response:", response.data);

      // 책 정보 매핑
      const bookData = response.data.map((document) => ({
        authors: document.authors,
        contents: document.contents,
        price: document.price,
        publisher: document.publisher,
        title: document.title,
        thumbnail: document.thumbnail,
        finishDate: document.finishDate,
        hasRead: document.hasRead,
        id: document.id,
      }));
      console.log("Mapped Book Data:", bookData);
      // Update state with the mapped book data
      setBooks(bookData);
    } catch (error) {
      console.error(error);
    }
  };
  const finishReading = async (book) => {
    console.log(book.id);
    book.hasRead=true;
    try {
      // Make a request to update the hasRead value for the clicked document
      await axios.put(`http://localhost:4000/documents/${book.id}`,
        book      
      );
      searchBook();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: 20 }}>
        <button onClick={searchBook}>Search toReadList</button>
        {/* 책 정보들 매핑해서 출력하기 */}
        {books.map((book, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 20 }}>
            {/* 썸네일 */}
            <img
              src={book.thumbnail}
              alt="Thumbnail"
              style={{ maxWidth: "150px", marginRight: 20 }}
              onClick={() => finishReading(book)}
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
              <p>{book.finishDate}까지 읽을 예정이시죠?</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 20 }}>
        <button onClick={searchBook}>Search toReadList</button>
        {/* 책 정보들 매핑해서 출력하기 */}
        {books.map((book, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 20 }}>
            {/* 썸네일 */}
            <img
              src={book.thumbnail}
              alt="Thumbnail"
              style={{ maxWidth: "150px", marginRight: 20 }}
              onClick={() => finishReading(book.id)}
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
              <p>{book.finishDate}까지 읽을 예정이시죠?</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
