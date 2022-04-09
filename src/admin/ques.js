import { useState, useEffect } from 'react'
import axios from "axios";

function Ques(props) {
    
    const qId = props.question.id_question; 
    const title = props.question.name_question;
    const text = props.question.text_question;

    function handleChange(event) { 
        
        const {value, name} = event.target
        console.log(name, value)
    }
    
    return (
        <div>
                <input onChange={() => props.edit(qId, title, text )} 
                        type="text"
                        text={title} 
                        name="title" 
                        placeholder="Title" 
                        value={title} />
                <input onChange={() => props.edit(qId, title, text )} 
                        type="text"
                        text={text} 
                        name="text" 
                        placeholder="Text" 
                        value={text} />
                <button onClick={() => props.delete(qId)}>Удалить</button>
                <button onClick={() => props.edit(qId, title, text )}>Редактировать</button>
        </div>
    );
}

export default Ques;