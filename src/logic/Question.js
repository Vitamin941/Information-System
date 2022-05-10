import React from "react";
import axios from "axios";
// import { For } from 'react-for';

export class Question extends React.Component {
    constructor(props) {
        super(props)

        let clicked = props.clicked ? true : false
        
        this.state = {
            text: props.text,
            id: props.id,
            clicked: clicked,
            level: props.level
        }

        this.HandleClick = this.HandleClick.bind(this)
        this.HandleChange = this.HandleChange.bind(this)
        this.HandleSubmit = this.HandleSubmit.bind(this)

    }
    getCircle (level) {
        let div = []
        let circle = "circle"
        let circleEmpty = "circle-empty"
        for (let i = 1; i <= 5; i++){
            if (i <= level){
                div.push(circle)
            } else {
                div.push(circleEmpty)
            }       
        }
        return div
    }
    HandleClick = (e) => {
        e.preventDefault()
        this.setState(state => ({
            text: state.text,
            clicked: !state.clicked
        }))
    }

    HandleChange(e) {
        e.preventDefault()
        this.setState(state => ({
            text: e.target.value,
            clicked: state.clicked
        }))
    }

    HandleSubmit(e) {
        e.preventDefault()
        this.setState(state => ({
            text: state.text,
            clicked: false
        }))
    }

    updateQuestion(e) {
        axios({
            method: "post",
            url: "/update_question/"+this.state.id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
            data:{
                text: this.state.text,
                answer: this.props.answer,
                photo: NaN
            }
        })
        // .then(function (response) {
        //     console.log(response);
        // })
    }

    render() {
        return(
        <div className="one-question-container" onClick={() => this.props.seeAnswer()}>
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
            {this.getCircle(this.state.level).map(type_ => {
                return <div className={type_}/>
                })
            }
            
            <button onClick={() => this.props.deleteItem()}>Удалить ({this.state.id})</button>
            <button onClick={e => this.updateQuestion(e)}>Обновить ({this.state.id})</button>
        </div> 
        )}
}
