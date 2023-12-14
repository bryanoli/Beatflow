import { useState, useEffect } from "react"
import useAuth from "../authentication/auth"
import "../styles/components/Player.css"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import SongRow from "./SongRow"
import TrackSearchResult from "./TrackSearch"
import { Container, Form, Row, Col } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: "3bf93ed47f8d4e1cb7181a0336888a7e",
})

export default function Dashboard({ code, spotify }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }


  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          artist: playingTrack.artist,
          track: playingTrack.title,

        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        {/* Sidebar */}
        <Col xs={2} className="p-0">
          <Sidebar
            accessToken={accessToken}
             />
        </Col>
        {/* Main Content */}
        <Col xs={10} className="p-0">
          <Container fluid className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <Form.Control
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
              {searchResults.map((track) => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))}
              {searchResults.length === 0 && playlistTracks.length === 0 && (
                <div className="text-center" style={{ whiteSpace: "pre" }}>
                  {lyrics}
                </div>
              )}
            </div>
            <div>
              <Footer accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}