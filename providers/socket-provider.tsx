'use client';

import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client';

interface SocketContextValues {
  socket: Socket;
  setSocket: (val: Socket) => void;
}

const SocketContext = createContext<SocketContextValues>({} as SocketContextValues);

function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if(!socket) {
      setSocket(io('http://localhost:3001'));
    }
  },[]);
  
  if(!socket) return null;

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;

export const useSocketContext = () => {
  const contextValue = useContext(SocketContext);
  if(contextValue === undefined) throw new Error('something went wrong, please use useSocketContext inside its provider');
  return contextValue;
}