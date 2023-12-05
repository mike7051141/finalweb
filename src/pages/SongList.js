import axios from "axios";
import { async } from "q";
import { useState, useEffect } from "react";

const SongList = () => {
  const [albums, setAlbums] = useState([]);
  //const [songid, setSongid] = useState("");

  useEffect(() => {
    MySongList();
  }, []);

  const MySongList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/song");

      console.log(response.data);

      const albums = response.data.map((entry) => ({
        name: entry.album.name,
        artists: entry.album.artists,
        album_type: entry.album.album_type,
        external_urls: entry.album.external_urls,
        album_href: entry.album.album_href,
        images: entry.album.images,
        release_date: entry.album.release_date,
        total_tracks: entry.album.total_tracks,
        songid: entry.id,
      }));

      console.log(albums);
      setAlbums(albums); // 앨범 정보를 state 또는 변수에 저장할 수 있습니다.
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteSong = async (songid) => {
    try {
      // Make a request to update the hasRead value for the clicked document
      await axios.delete(`http://localhost:4000/song/${songid}`);
      // 독서 목록 다시 불러오기
      MySongList();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ padding: 20 }}>
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
              <button onClick={() => DeleteSong(album.songid)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SongList;
