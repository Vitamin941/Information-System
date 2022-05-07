import { AnswerTextArea } from './logic/AnswerTextArea';
import { SuperList } from './logic/SuperList';

import { useState, useEffect } from 'react'
import axios from "axios";

function Main(props) {

    return (
        <div className="main">
            <div className='main-container'>
                    {/* <SuperList questions={questions} /> */}
                    <SuperList token={props.token} 
                    id_subject={props.id_subject} setSubject={props.setSubject}
                    questions={props.questions} setQuestions={props.setQuestions}/>
                    <AnswerTextArea/>
            </div>
        </div>
    );
}

export default Main;