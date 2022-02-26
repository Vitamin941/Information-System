import React, {useState} from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './user/Login'
import Header from './user/Header'
import useToken from './user/useToken' 

import Main from './main'


function App() {
    //Твой код переехал в main :) надо авторизоваться логин:test пароль:test
    const { token, removeToken, setToken } = useToken();

    return (
          <BrowserRouter>
            <div className="main">
              <Header token={removeToken}/>
              {!token && token!=="" &&token!== undefined?  
              <Login setToken={setToken} />
              :(
                <>
                  <Routes>
                    <Route exact path="/" element={<Main token={token} setToken={setToken}/>}></Route>
                  </Routes>
                </>
              )}
            </div>
          </BrowserRouter>
    );
  }


export default App;