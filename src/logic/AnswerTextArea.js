import axios from "axios";
import React from "react";
import '../css/AnswerTextArea.css'

export class AnswerTextArea extends React.Component {
    constructor() {
        super()

        this.state = {
            drag: false
        }

        this.onDragStartHandler = this.onDragStartHandler.bind(this)
        this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this)
        this.onDropHandler = this.onDropHandler.bind(this)
    }

    onDragStartHandler(e) {
        e.preventDefault();

        this.setState(state => ({
            drag: true
        }));
    }

    onDragLeaveHandler(e) {
        e.preventDefault();

        this.setState(state => ({
            drag: false
        }));
    }

    onDropHandler(e) {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        console.log(files)
    }

    render() {
        return(
            <div className='answer-container'>
            <textarea placeholder="Введите текст ответа" className="answer-text-area"/>
            {this.state.drag 
                    ?
                    <div className="photo-loader"
                        onDragStart={e => this.onDragStartHandler(e)}
                        onDragLeave={e => this.onDragLeaveHandler(e)}
                        onDragOver={e => this.onDragStartHandler(e)}
                        onDrop={e => this.onDropHandler(e)}>
                        <img src={require("../their_image/load_img.png")} alt="Картиночка загрузки" className="load-img"/>
                        <p className="load-text">Отпустите чтобы загрузить файл</p>
                    </div> 
                    :
                    <div className="photo-loader"
                        onDragStart={e => this.onDragStartHandler(e)}
                        onDragLeave={e => this.onDragLeaveHandler(e)}
                        onDragOver={e => this.onDragStartHandler(e)}>
                        <img src={require('../their_image/load_img.png')} alt="Картиночка загрузки" className="load-img"/> 
                         <p className="load-text">Кликните, чтоб загрузить <br/>фото или перетащите <br/>изображение прямо сюда</p>
                    </div>
                    }
        </div>
        )

    }
}