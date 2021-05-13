// @ts-check

import { useContext } from 'react';

import socketContext from '../contexts/socket.jsx';

const useSocket = () => useContext(socketContext);

export default useSocket;
