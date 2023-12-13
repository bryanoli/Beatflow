import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/login"
import Dashboard from "./components/Body"
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <Dashboard code={code} spotify={spotify} /> : <Login />
}

export default App