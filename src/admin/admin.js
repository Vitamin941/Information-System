import { useState, useEffect} from 'react'
import axios from "axios";
import Ques from "./ques"
import { SuperList } from '../logic/SuperList';
import { Question } from '../logic/Question';
import { render } from '@testing-library/react';

function Admin_(props) {
    const [user, setUser] = useState() 
    const [questions, setQuestions] = useState([]) 
    const [activ_subject, setActiveSubject] = useState()
    const [questionData, setQuestionData] = useState({
        title: "",
        text: ""
    })

    const [repQu, setRepQu] = useState([])
    const [rep_, setRep] = useState(0)

    function get_questions(id){
        axios({
            method: "GET",
            url:"/get_question_subject/" + id,
            headers: {
                Authorization: 'Bearer ' + props.token
            }
            })
        .then((resp) => {
            let copy = Object.assign([], []); 
            resp.data.questions.map((el) =>{
                copy.push(el)
            })
            // setQuestions(questions => questions.concat(copy))
            setQuestions(copy)
            setActiveSubject(resp.data.name_subject)
        })
        .catch(error => console.log(error))
        console.log("Получил из бд ", questions)
    }

    function get_me(){
        axios({
            method: "GET",

            url:"/me",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((resp) => setUser(resp.data.username))
        .catch(error => console.log(error))
    }  

    function add(event) { 
        console.log("Добавляем")
        axios({
            method: "POST",
            url:"add_question_subject/1",
            data:{
                name_question: questionData.title,
                text_question: questionData.text
            },
            headers: {
                    Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res = response.data
            res.access_token && props.setToken(res.access_token)
            setQuestionData(({
                title: res.title,
                text: res.text}))
            get_questions(1)
        })
        .catch((error) => {
              if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                }
        })


        setQuestionData(({
        title: "",
        text: ""}))

        event.preventDefault()
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setQuestionData(prevNote => ({
            ...prevNote, [name]: value})
        )}
    
    function deleteQuestion(id) {
        console.log("delete")
        setQuestions(questions.filter(qu => qu.id_question !== id))
        console.log(questions.filter(qu => qu.id_question !== id))
    }

    function editQuestion(id, title, text) {
        console.log("update")
        
        const newQ = questions.filter(qu => qu.id_question === id)
        newQ.text_question = text
        newQ.name_question = title
        setQuestions(questions.filter(qu => qu.id_question !== id))
        questions.push(newQ)
        setQuestions(questions)
        console.log()
        console.log(title, text)
    }
    
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
                setRepQu(resp.data.question[0].rep_id)
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
        get_me()
        get_questions(1)
        get_rep()
    },[])  
    
    return (
        <div>
            <h1>Username: {user}</h1>
            <h1>Добавление вопроса ({activ_subject})</h1>
            <a href='/'>Вопросеки</a>
        </div>
    );
}

export default Admin_;