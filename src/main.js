import NavigationBar from './logic/NavigationBar';
import { AnswerTextArea } from './logic/AnswerTextArea';
import { SuperList } from './logic/SuperList';

import { useState, useEffect } from 'react'
import axios from "axios";

function Main(props) {

    return (
        <div className="main">
            <NavigationBar/>
            <div className='main-container'>
                    {/* <SuperList questions={questions} /> */}
                    <SuperList token={props.token}/>
                    <AnswerTextArea/>
            </div>
        </div>
    );
}

export default Main;