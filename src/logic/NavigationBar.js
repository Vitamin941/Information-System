import React from "react"
import { useState } from 'react';
import axios from "axios";
import OpenWindow from '../user/UserWindow';

const NavigationBar = () => (
    <nav className="nav-bar">
        <a href="#" className="link">ссылка куда-то</a>
        <a href="#" className="link">ссылка куда-то</a>
        <a href="#" className="link">ссылка куда-то</a>);

react(
        <div className="block-user-window">
            <div className="user-window-hidden">
<<<<<<< HEAD
                <form  className="get">
            <input  
                  type="text" className="get-user-window"
                  placeholder="Поиск"
 />
          <button type="submit" className="button-get-user-window"><i class="fa fa-search"></i></button>
        </form>
=======
                Макс пока свой код тут будет писать
>>>>>>> 258884688085317b9c48449815aca3f3c9456d02
                  <textarea className="email-user-window">
                  </textarea >
                <form>
                  <button className="button-email-user-window">Отправить</button> 
                </form>
                <form className="button-user-window">
                  <button className="button-email-user-Settings"></button> 
                  <button className="button-email-user-Exit"></button>
                </form>
            </div>
            <div className="user-window-link" onClick={OpenWindow}></div>
        </div>
   </nav>
);

export default NavigationBar;