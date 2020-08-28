//socket connection
import io from 'socket.io-client'
import Cookies from '../utils/Cookies'
let token = Cookies.read('token')
let base_url = "http://localhost:3000"
let url
if (token) {

  url = base_url + "?token=" + token
} else {
  url = base_url
}
const socket = io.connect(url, {
  'sync disconnect on unload': true
}
)
export default socket