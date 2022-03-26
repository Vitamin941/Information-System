import React from "react";
import '../css/AnswerTextArea.css'

const AnswerTextArea = () => (
    <div className='answer-container'>
        <textarea placeholder="Введите текст ответа" className="answer-text-area">
        </textarea>

        <div className="photo-loader"> 
            <p className="load-text">Кликните, чтоб загрузить <br/>фото или перетащите <br/>изображение прямо сюда</p>
        </div>
    </div>
);

export default AnswerTextArea;