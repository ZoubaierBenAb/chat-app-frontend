import io from 'socket.io-client'

let socket // used to store the user socket
const connectSocket = (user_id)=>{ // this function is used to establish the user_id connection with the socket in the server
socket = io('http://localhost:5000/',{
    query : `user_id=${user_id}`
})


}


export {socket,connectSocket}