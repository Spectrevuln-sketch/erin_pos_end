import React from 'react'
import { MainApp } from './Section'
import { BrowserRouter as Router, } from 'react-router-dom';
import axios from 'axios';
import { AtuhContextProvider } from './context/authContext';
import { UserContextProvider } from './context/UserContext';
/* Axios Instance */
axios.defaults.withCredentials = true;
/* End Axios Instance */
function App() {
  return (
    <AtuhContextProvider>
      <Router>
        <UserContextProvider>
          <MainApp />
        </UserContextProvider>
      </Router>
    </AtuhContextProvider>
  );
}

export default App;