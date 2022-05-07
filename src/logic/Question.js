import React from "react";
import axios from "axios";

export class Question extends React.Component {
    constructor(props) {
        super()

        let clicked = props.clicked ? true : false

        this.state = {
            text: props.text,
            id: props.id,
            clicked: clicked
        }

        this.HandleClick = this.HandleClick.bind(this)
        this.HandleChange = this.HandleChange.bind(this)
        this.HandleSubmit = this.HandleSubmit.bind(this)

    }

    HandleClick = (e) => {
        e.preventDefault()
        console.log("Начал редактировать")
        this.setState(state => ({
            text: state.text,
            clicked: !state.clicked
        }))
    }

    HandleChange(e) {
        e.preventDefault()
        console.log("Редактирую")
        this.setState(state => ({
            text: e.target.value,
            clicked: state.clicked
        }))
    }

    HandleSubmit(e) {
        e.preventDefault()
        console.log("Сделал что-то другое")
        this.setState(state => ({
            text: state.text,
            clicked: false
        }))
    }

    updateQuestion(e) {
        console.log("Обновляю", e)
        axios({
            method: "post",
            url: "/update_question/"+this.state.id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
            data:{
                text: this.state.text,
                answer: "new",
                photo: NaN
            }
        })
        .then(function (response) {
            console.log(response);
          })
    }
    getAnswer(e) {
        axios({
            method: "get",
            url: "/get_answer/"+this.state.id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then((resp) => { console.log(resp.data)})
    }
    render() {
        return(
        <div className="one-question-container">
            {this.state.clicked 
                ?
                <div className="text-container" onClick={e => this.HandleClick(e)}>
                    <textarea 
                        className="question-text-input" 
                        type="text"
                        placeholder="Введите свой вопрос здесь"
                        defaultValue= {this.state.text !== '' ? this.state.text : ''}
                        onChange={e => this.HandleChange(e)}
                        onClick={e => this.HandleSubmit(e)}/>
                </div>
                :
                <div className="text-container" onClick={e => this.HandleClick(e)}>
                    <p className="question-text">{this.state.text}</p>
                </div>
            }
            <div className="circle-empty"/>   
            <div className="circle-empty"/>
            <div className="circle-empty"/>
            <div className="circle"/>
            <div className="circle"/>
            <button onClick={() => this.props.deleteItem()}>Удалить ({this.state.id})</button>
            <button onClick={e => this.updateQuestion(e)}>Обновить ({this.state.id})</button>
            <button onClick={e => this.getAnswer(e)}>Показать ответ({this.state.id})</button>
        </div> 
        )}
}
