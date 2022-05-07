import React from "react";
import {Question} from "./Question";
import axios from "axios";
import { useState } from "react/cjs/react.production.min";

export class SuperList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            items: [], 
            text: '',
            generatedQuestion: false
        };

        this.onCreate = this.onCreate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url:"/get_question_subject/1",
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
            })
            .then(resp => this.setState(prevState => ({
                items: resp.data.questions,
                text: prevState.text,
                generatedQuestion: prevState.generatedQuestion
            })))
            .catch(error => console.log(error))
    }

    deleteItem(qu_del){
        console.log("Удаляю", qu_del)
        axios({
            method: "post",
            url: "/delete_question/"+qu_del.id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
        })
        .then(function (response) {
            console.log(response);
        })
        this.state = {
            items: this.state.items.filter(qu => qu !== qu_del),
            text: this.state.text,
            generatedQuestion: this.state.generatedQuestion
        }
        this.setState(this.state)
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
        
        this.setState(state => ({
            items: state.items.concat(newQuestion),
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
                id_subject: 1,
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
                {this.state.items.map(question => 
                    <Question key={question.id} text={question.text} level={question.level} id={question.id} 
                    token={this.props.token} deleteItem={() => this.deleteItem(question)}/>
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