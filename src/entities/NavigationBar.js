import React from "react"
import OpenWindow from '../user/UserWindow';

const NavigationBar = () => (
    <nav className="nav-bar">
        <a href="#" className="link">ссылка куда-то</a>
        <a href="#" className="link">ссылка куда-то</a>
        <a href="#" className="link">ссылка куда-то</a>
        <div className="block-user-window">
            <div className="user-window">
                Макс пока свой код тут будет писать
            </div>
            <div className="user-window-link" onClick={OpenWindow}></div>
        </div>
   </nav>
);

export default NavigationBar;