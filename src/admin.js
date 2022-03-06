import { useState, useEffect } from 'react'
import axios from "axios";

function Admin(props) {
    // Кусочек для авторизации==================================
    const [quationData, setQuationData] = useState({
        title: "",
        text: ""
    })
    // Функция клеит запрос, как она это делает мне сложно сказать
    function add(event) { 
        console.log("Добавляем")
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/add",
            data:{
                title: quationData.title,
                text: quationData.text
            },
            headers: {
                    Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
              const res = response.data
              res.access_token && props.setToken(res.access_token)
              setQuationData(({
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


        setQuationData(({
        title: "",
        text: ""}))

        event.preventDefault()
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setQuationData(prevNote => ({
            ...prevNote, [name]: value})
        )}
    


    const [user, setUser] = useState() //Это хуки
    // вызываем что-бы наделить функциональный элемент состоянием
    // 
    useEffect(() => {
        axios({
        method: "GET",
        url:"/me",
        headers: {
            Authorization: 'Bearer ' + props.token
        }
        })
        .then((resp) => setUser(resp.data.username))
        .catch(error => console.log(error))
      }, [])

    return (
        <div><h1>Username: {user}</h1>
        <h1>Добавление вопроса</h1>
            <form className="quation">
                <input onChange={handleChange} 
                        type="text"
                        text={quationData.title} 
                        name="title" 
                        placeholder="Title" 
                        value={quationData.title} />
                <input onChange={handleChange} 
                        type="text"
                        text={quationData.text} 
                        name="text" 
                        placeholder="Text" 
                        value={quationData.text} />

                <button onClick={add}>Добавить</button>
            </form>
            
            
        </div>
    );
}

export default Admin;