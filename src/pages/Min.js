import axios from "axios";
import { useState, useEffect } from "react";

// id = ee6178387d344c0da243b195c99b34c4
// password = 37d2be423dbf4563b06394127f887b75

const Min = () => {
  const [inputsearch, setinputSearch] = useState("");
  const [storedToken, setStoredToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const Id = "ee6178387d344c0da243b195c99b34c4";
      const Password = "37d2be423dbf4563b06394127f887b75";
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials&client_id=" +
          Id +
          "&client_secret=" +
          Password,
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

  const Searchsong = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: inputsearch,
          type: "album",
          limit: 20,
          offset: 5,
          include_external: true,
        },
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      });

      console.log(response.data);

      const albums = response.data.albums.items.map((album) => ({
        name: album.name,
        artists: album.artists.map((artist) => artist.name).join(", "),
        album_type: album.album_type,
        external_urls: album.external_urls.spotify,
        album_href: album.href,
        images: album.images.map((image) => image.url),
        is_playable: album.is_playable,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
      }));

      console.log(albums);
      setAlbums(albums); // 앨범 정보를 state 또는 변수에 저장할 수 있습니다.
    } catch (error) {
      console.error(error);
    }
  };

  const addSongList = async (album) => {
    try {
      const response = await axios.post(`http://localhost:4000/song`, {
        album,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {/* <button onClick={getProfile}>로그인</button>
      <button onClick={token}>토큰값확인</button> */}
      <div>
        <textarea
          style={{ with: 300, height: 20 }}
          value={inputsearch}
          onChange={(e) => setinputSearch(e.target.value)}
          placeholder="노래 검색"
        ></textarea>
      </div>
      <button onClick={Searchsong}>노래검색</button>
      <div>
        {albums.map((album, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 20 }}>
            <img
              src={album.images[0]}
              alt="Album Thumbnail"
              style={{ maxWidth: "150px", marginRight: 20 }}
            />

            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20 }}>{album.name}</h2>
              <p>{`아티스트: ${album.artists}`}</p>
              <p>{`앨범 타입: ${album.album_type}`}</p>
              <p>{`출시 날짜: ${album.release_date}`}</p>
              <p>{`트랙 수: ${album.total_tracks}`}</p>
              <button onClick={() => addSongList(album)}>노래 추가</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Min;
