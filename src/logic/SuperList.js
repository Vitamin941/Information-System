import React from "react";
import {Question} from "./Question";
import axios from "axios";


export class SuperList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            text: '',
            generatedQuestion: false,
            activeQuestion: NaN
        };

        this.onCreate = this.onCreate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    deleteItem(qu_del){
        axios({
            method: "post",
            url: "/delete_question/"+qu_del.id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
        })
        this.props.setQuestions(this.props.questions.filter(qu => qu !== qu_del))
    }
    seeAnswer(id){
        axios({
            method: "get",
            url: "/get_answer/"+id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
        .then((resp) => {
            this.props.setAnswer(resp.data.answer)         
        })
        
    }
    onCreate(e) {
        e.preventDefault();
        this.setState(state => ({
            items: state.items,
            text: state.text,
            generatedQuestion: true
        }))
    }

    onSubmit(e) {
        e.preventDefault()
        let input = document.getElementsByClassName("inputer")[0]
        const newQuestion = {
            text: input.value,
            difficultyCount: 5,
            id: -1
        };
        this.props.setQuestions(this.props.questions.concat(newQuestion))
        this.setState(state => ({
            text: state.text,
            generatedQuestion: false
        }));
        
        this.addToDB(newQuestion)
    }

    addToDB(question) {
        axios({
            method: "post",
            url: "/add_question",
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
            data:{
                id_subject: this.props.id_subject,
                text: question.text,
                photo: NaN,
                answer: ""
            },
        })
        .then(function (response) {
            question.id = response.data.id;
          })
    }
    
    render() { 
        return (
          <div className="questions-container">
                <div className="text-one-heading">
                    <h2 className="subject-heading" data-id_subject={this.props.id_subject}></h2>
                </div>
                {this.props.questions.map(question => 
                    <Question key={question.id} text={question.text} level={question.level} id={question.id} 
                    token={this.props.token} deleteItem={() => this.deleteItem(question)}
                    seeAnswer={() => this.seeAnswer(question.id)} answer={this.props.answer}/>
                )}
                {this.state.generatedQuestion
                    ?
                    <div className="input-container">
                        <input className="inputer" placeholder="Введите текст"/>
                    </div>
                    :
                    <></>
                }
                <div className="buttons-container">
                    <button className="question-adder" onClick={this.onCreate} />
                    {this.state.generatedQuestion?
                        <button className="question-submiter" onClick={this.onSubmit} />
                        :
                        <></>
                    }
                </div>
        </div>
        );
      }
  }