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
    useEffect(() =>{
        axios({
            method: "GET",
            url:"/me",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((resp) => setUser(resp.data.username))
        .catch(error => console.log(error))

        axios({
            method: "GET",
            url:"/get_question_subject/1",
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
            console.log(questions)
        })
        .catch(error => console.log(error))
    },[])   
        
    // Функция клеит запрос, как она это делает мне сложно сказать
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
             
            {questions}
        </div>
    );
}

export default Admin;