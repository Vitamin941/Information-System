import React from "react"
import { useState } from 'react';
import axios from "axios";
import OpenWindow from '../user/UserWindow';

const NavigationBar = () => (
    <nav className="nav-bar">
        <a href="#" className="link">ссылка куда-то</a>
        <a href="#" className="link">ссылка куда-то</a>
        <a href="#" className="link">ссылка куда-то</a>
        <div className="block-user-window">            
            <div className="user-window-hidden">
              <form  className="get">
                <input  
                type="text" className="get-user-window"
                placeholder="Поиск"/>
                <button type="submit" className="button-get-user-window"></button>
              </form>

              <textarea className="email-user-window">
              </textarea >
              <form>
                <button className="button-email-user-window">Отправить</button> 
              </form>
              <div className="button-user-window">
                <a className="button-email-user-Settings"></a> 
                <a className="button-email-user-Exit"></a>
              </div>
            </div>
            <div className="user-window-link" onClick={OpenWindow}></div>
        </div>
   </nav>
);

export default NavigationBar;