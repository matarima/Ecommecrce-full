import io from 'socket.io-client';

const socket = io('https://backend-ecommecre.onrender.com', {
  transports: ['websocket', 'polling'],
});


export default socket;
