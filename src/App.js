import React, {useState} from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './user/Login'
import Header from './user/Header'
import useToken from './user/useToken' 

import Main from './main'
import Admin_ from './admin/admin'
import SignUp from './user/SignUp'
import Repetition from './rep'


function App() {

    const { token, removeToken, setToken } = useToken();
  
    return (
          <BrowserRouter> {/* Роутеры для перехода на разные страницы пока только "/" */}
              {/* Далее идет проверка на наличие токена, нужного для авторизации
              Если его нет на компьютере, то предлагается авторизоваться и перейти на страницу Login.js
              Если токен есть, то используются роутеры.
              Переходя на страницу main необходимо отдать ей возможность настраивать токен и сам токен тоже
              

              Пока эта функция не используется и любому пользователю доступны все куски кода :)*/}

              {!token && token!=="" &&token!== undefined?  
                <Routes>
                  <Route exac path="/" element={<Login setToken={setToken} />}></Route>
                  <Route exac path="/signup" element={<SignUp />}></Route>
                </Routes>
              :(
                <>
                  <Header removeToken={removeToken}/>
                  <Routes>
                    <Route exact path="/" element={<Main token={token} setToken={setToken}/>}></Route>
                    <Route exact path="/admin/" element={<Admin_ token={token} setToken={setToken}/>}></Route>
                    <Route exact path="/repetition/" element={<Repetition token={token} setToken={setToken}/>}></Route>
                  </Routes>
                </>
              )}

          </BrowserRouter>
    );
  }


export default App;