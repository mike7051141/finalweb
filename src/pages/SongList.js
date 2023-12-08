import axios from "axios";
import { useState, useEffect } from "react";

export default function SongList() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumTracks, setSelectedAlbumTracks] = useState([]);
  //const [songid, setSongid] = useState("");

  useEffect(() => {
    MySongList();
  }, []);

  const MySongList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/song");

      const albums = response.data.map((album) => ({
        name: album.name,
        artists: album.artists,
        album_type: album.album_type,
        album_href: album.album_href,
        images: album.images,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        songid: album.id,
        tracks: album.tracks.map((track) => ({
          name: track.name,
          preview_url: track.preview_url,
          track_Id: track.track_Id,
        })),
      }));

      console.log(albums);
      setAlbums(albums);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlbumTracks = (albumId) => {
    // albumId에 해당하는 앨범의 트랙을 가져와서 상태에 저장
    const selectedAlbum = albums.find((album) => album.songid === albumId);
    setSelectedAlbumTracks(selectedAlbum ? selectedAlbum.tracks : []);
  };

  const DeleteSong = async (songid) => {
    try {
      await axios.delete(`http://localhost:4000/song/${songid}`);
      MySongList();
      setSelectedAlbumTracks([]);
    } catch (error) {
      console.error(error);
    }
  };

  const playsong = (playsong) => {
    window.open(playsong, "_blank");
  };

  const albumnameput = async (album) => {
    try {
      const albumname = prompt("바꾸실 앨범 이름을 적어주세요");
      if (!albumname) {
        return;
      }
      album.name = albumname;
      await axios.put(`http://localhost:4000/song/${album.songid}`, album);
      MySongList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20, display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 20, marginBottom: 20 }}>내 앨범 리스트</h1>
        {albums.map((album, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 20 }}>
            <img
              src={album.images[0]}
              alt="Album Thumbnail"
              style={{ maxWidth: "150px", marginRight: 20 }}
            />

            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20 }}>{album.name}</h2>
              <button onClick={() => albumnameput(album)}>
                노래 이름 바꾸기
              </button>
              <p>{`아티스트: ${album.artists}`}</p>
              <p>{`앨범 타입: ${album.album_type}`}</p>
              <p>{`출시 날짜: ${album.release_date}`}</p>
              <p>{`트랙 수: ${album.total_tracks}`}</p>
              <button onClick={() => DeleteSong(album.songid)}>삭제</button>
              <button onClick={() => fetchAlbumTracks(album.songid)}>
                노래 리스트
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 20, marginBottom: 20 }}>노래 리스트</h1>
        {selectedAlbumTracks.map((track, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20 }}>{track.name}</h2>
              <button onClick={() => playsong(track.preview_url)}>
                노래 듣기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
