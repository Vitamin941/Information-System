import React, {useState} from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './user/Login'
import Header from './user/Header'
import useToken from './user/useToken' 

import Main from './main'
import Admin from './admin'


function App() {

    const { token, removeToken, setToken } = useToken();
  
    return (
          <BrowserRouter> {/* Роутеры для перехода на разные страницы пока только "/" */}
              <Header token={removeToken}/> {/* Блок где находится кнопка для авторизации, пока тут */}
              {/* Далее идет проверка на наличие токена, нужного для авторизации
              Если его нет на компьютере, то предлагается авторизоваться и перейти на страницу Login.js
              Если токен есть, то используются роутеры.
              Переходя на страницу main необходимо отдать ей возможность настраивать токен и сам токен тоже
              

              Пока эта функция не используется и любому пользователю доступны все куски кода :)*/}
              {!token && token!=="" &&token!== undefined?  
                <Login setToken={setToken} />
              
              :( 
                <Routes>
                  <Route exact path="/" element={<Main token={token} setToken={setToken}/>}></Route>
                  <Route exact path="/admin/" element={<Admin token={token} setToken={setToken}/>}></Route>
                </Routes>
              )};
          </BrowserRouter>
    );
  }


export default App;