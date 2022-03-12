import { useState, useEffect } from 'react'
import axios from "axios";

function Admin(props) {
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
                copy.push(el.name_question)
            })
            setQuestions(copy)
            setActiveSubject(resp.data.name_subject)
        })
        .catch(error => console.log(error))
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
            {questions.map((qu) => 
                <p>- {qu}</p>
            )}
        </div>
    );
}

export default Admin;