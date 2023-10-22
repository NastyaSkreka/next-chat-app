import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');


export default function Home() {
  return <div>hi</div>;
}
  