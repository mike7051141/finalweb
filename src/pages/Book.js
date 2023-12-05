import axios from "axios";
import { useState } from "react";

const Book = () => {
  const [inputText, setInputText] = useState("");
  const [books, setBooks] = useState([]);

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

      // 책 정보 매핑
      const bookData = response.data.documents.map((document) => ({
        authors: document.authors,
        contents: document.contents,
        price: document.price,
        publisher: document.publisher,
        title: document.title,
        thumbnail: document.thumbnail,
      }));
      console.log(document);
      console.log(bookData);
      // Update state with the mapped book data
      setBooks(bookData);
    } catch (error) {
      console.error(error);
    }
  };

  const addList = async (book) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/documents`,
        book
      );

      console.log('Book added to toReadList:', response.data)
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
          placeholder="책 제목을 입력해주세요 :"
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
      <button onClick={searchBook}>책 검색</button>
      {/* 책 정보들 매핑해서 출력하기 */}
      {books.map((book, index) => (
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
            <button onClick={()=>addList(book)}>Add to toReadList</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Book;
