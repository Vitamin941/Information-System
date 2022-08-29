import { useState } from 'react';
import axios from "axios";
import '../css/Login.css';

function Login(props) {

    const [loginForm, setloginForm] = useState({
      username: "",
      password: ""
    })
    // Функция клеит запрос, как она это делает мне сложно сказать
    function logMeIn(event) { 
      axios({
        method: "POST",
        url:"/login",
        data:{
          username: loginForm.username,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
        props.tokin = response.data.access_token
        // props.refresh_token = response.data.refresh_token
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        username: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}
    // Форма для авторизации записывает информацию в объект loginForm
    // в email и в password и кнопка для авторизации с действием logMeIn
    // Когда вводим какую-то информацию запускается handleChange
    return (
      <div className="sign_page">
        <h1 className="sign_h1">Авторизация</h1>
          <form className="login">
            <input className="sign_input" onChange={handleChange} 
                  type="username"
                  text={loginForm.username} 
                  name="username" 
                  placeholder="Username" 
                  value={loginForm.username} />
            <input className="sign_input" onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

          <button className="sign_button" onClick={logMeIn}>Поехали</button>
        </form>
        <a href='/signup'>Регистрация</a>
      </div>
    );
}

export default Login;