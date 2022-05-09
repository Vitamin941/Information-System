import { useState, useEffect} from 'react'
import React from "react";
import {Question} from "./Question";
import axios from "axios";
import '../css/RepetitionBlock.css';

export class RepetitionBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rep_: 0,
            repId: NaN,
            repText: "",
            repLevel: 0,
            repIdRep: NaN
        }
        this.correctly_answered = this.correctly_answered.bind(this)
        this.wrong_answered = this.wrong_answered.bind(this)
      }

    componentDidMount(){
        this.get_rep()
    }

    correctly_answered(rep_id){
        axios({
            method: "POST",
            url:"/correctly_answered_quastion/" + rep_id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        }).then((resp) => {
            this.get_rep()
        })
        .catch(error => console.log(error))
    }
    wrong_answered(rep_id){
        axios({
            method: "POST",
            url:"/wrong_answered_quastion/" + rep_id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        }).then((resp) => {
            this.get_rep()
        })
        .catch(error => console.log(error))
    }  
    get_rep(){
        axios({
            method: "GET",
            url:"/get_repit_quastion",
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
            })
        .then((resp) => {
            let info = 0
            this.state.rep_ = info
            if (resp.data.question.length > 0){
                info = 1
                this.state.rep_ = info
                this.state.repId = resp.data.question[0].id
                this.state.repText  = resp.data.question[0].text
                this.state.repLevel = resp.data.question[0].level
                this.state.repIdRep = resp.data.question[0].rep_id
                this.setState({
                    repId: resp.data.question[0].id,
                    repText: resp.data.question[0].text,
                    repLevel: resp.data.question[0].level,
                    repIdRep: resp.data.question[0].rep_id
                })
            }
            this.setState({
                rep_: info
            })
        })
        .catch(error => console.log(error))
    }
    render() { 
        return(
        <div className="questions-container">
             {this.state.rep_ > 0 ? 
              ( <div className="one-question-container">  
                    <div className="text-container">
                        <p className="question-text">{this.state.repText} </p> 
                    </div>
                    <div>
                    <button onClick={() => this.correctly_answered(this.state.repIdRep)}>Правильно {this.state.repIdRep}</button>
                    <button onClick={() => this.wrong_answered(this.state.repIdRep)}>Неправильно {this.state.repIdRep}</button>
                    </div>
                </div>
              ) : (
                  <p>Вопросов для повторения нет</p>
              )
            }
            <textarea className="answer-text-notes"></textarea>
        </div>
    )}  
  }

  export default RepetitionBlock;