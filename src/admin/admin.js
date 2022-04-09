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
    
    useEffect(() =>{
        get_me()
        get_questions(1)
    },[])  
    
    return (
        <div>
            <h1>Username: {user}</h1>
            <h1>Добавление вопроса ({activ_subject})</h1>
            <form className="question">
                <input onChange={handleChange} 
                        type="text"
                        text={questionData.title} 
                        name="title" 
                        placeholder="Title" 
                        value={questionData.title} />
                <input onChange={handleChange} 
                        type="text"
                        text={questionData.text} 
                        name="text" 
                        placeholder="Text" 
                        value={questionData.text} />
                <button onClick={add}>Добавить</button>
            </form> 
            
            <div className='main-container'>
                <SuperList questions={questions}/>
            </div>
        </div>
    );
}

export default Admin_;