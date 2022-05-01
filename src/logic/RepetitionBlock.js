import { useState, useEffect} from 'react'
import React from "react";
import {Question} from "./Question";
import axios from "axios";
import '../css/RepetitionBlock.css';

function RepetitionBlock(props) {

    const [repId, setRepId] = useState()
    const [repText, setRepText] = useState()
    const [repLevel, setRepLevel] = useState()
    const [repIdRep, setRepIdRep] = useState()
    const [rep_, setRep] = useState(0)

    function get_rep(){
        axios({
            method: "GET",
            url:"/get_repit_quastion",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
            })
        .then((resp) => {
            if (resp.data.question.length > 0){
                setRep(1)
                setRepId(resp.data.question[0].id)
                setRepText(resp.data.question[0].text)
                setRepLevel(resp.data.question[0].level)
                setRepIdRep(resp.data.question[0].rep_id)
            }
        })
        .catch(error => console.log(error))
    }

    function correctly_answered(rep_id){
        axios({
            method: "POST",
            url:"/correctly_answered_quastion/" + rep_id,
            headers: {
                Authorization: 'Bearer ' + props.token
            }
            })
        .catch(error => console.log(error))
    }
    function wrong_answered(rep_id){
        axios({
            method: "POST",
            url:"/wrong_answered_quastion/" + rep_id,
            headers: {
                Authorization: 'Bearer ' + props.token
            }
            })
        .catch(error => console.log(error))
    }  
    useEffect(() =>{
        get_rep()
    },[])  
    return (
        <div className="questions-container">
             {rep_ > 0 ? 
              ( <div className="one-question-container">
                    
                        
                    <div className="text-container">
                        <p className="question-text">{repText} </p> 
                    </div>
                    <div>
                    <button onClick={() => correctly_answered(repIdRep)}>Правильно {repIdRep}</button>
                    <button onClick={() => wrong_answered(repIdRep)}>Неправильно {repIdRep}</button>
                    </div>
                    
                    
                </div>
              ) : (
                  <p>Вопросов для повторения нет</p>
              )
            }
            <textarea class="answer-text-notes"></textarea>
        </div>
    );
      
  }

  export default RepetitionBlock;