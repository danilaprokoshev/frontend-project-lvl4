// @ts-check

import { useContext } from 'react';

import authContext from '../contexts/authorization.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
