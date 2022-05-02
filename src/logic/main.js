import { AnswerTextArea } from './AnswerTextArea';
import { SuperList } from './SuperList';

import { useState, useEffect } from 'react'

function Main(props) {

    return (
        <div className="main">
            <div className='main-container'>
                    <SuperList token={props.token}/>
                    <AnswerTextArea/>
            </div>
        </div>
    );
}

export default Main;