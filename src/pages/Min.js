import axios from "axios";
import { useState } from "react";

// id = ee6178387d344c0da243b195c99b34c4
// password = 37d2be423dbf4563b06394127f887b75

const Min = () => {
  const [inputid, setInputId] = useState("");
  const [inputpassword, setInputPassword] = useState("");
  const [inputsearch, setinputSearch] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [storedToken, setStoredToken] = useState("");

  const getProfile = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials&client_id=" +
          inputid +
          "&client_secret=" +
          inputpassword,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);
      console.log(response.data.access_token);

      setStoredToken(response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  const token = async () => {
    console.log(storedToken);
  };

  const artistclick = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
        {
          headers: {
            Authorization: "Bearer" + storedToken,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Searchsong = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: "remaster track:Doxy artist:Miles Davis",
          type: "album",
          market: "ES",
          limit: 10,
          offset: 5,
          include_external: true,
        },
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      });

      console.log(response.data);
      setSearchdata(
        response.data.albums.items.map((album) => album.name).join(",")
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <textarea
          style={{ with: 500, height: 20 }}
          value={inputid}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="아이디"
        ></textarea>
      </div>
      <div>
        <textarea
          style={{ with: 300, height: 20 }}
          value={inputpassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="비밀번호"
        ></textarea>
      </div>
      <button onClick={getProfile}>로그인</button>
      <button onClick={token}>토큰값확인</button>
      <button onClick={artistclick}>예제</button>
      <div>
        <textarea
          style={{ with: 300, height: 20 }}
          value={inputsearch}
          onChange={(e) => setinputSearch(e.target.value)}
          placeholder="노래 검색"
        ></textarea>
      </div>
      <button onClick={Searchsong}>노래검색</button>
      <p style={{ color: "darkblue", fontSize: 16 }}>{searchdata}</p>
    </div>
  );
};
export default Min;
