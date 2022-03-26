import { useState } from 'react';
import axios from "axios";

function Login(props) {

    const [loginForm, setloginForm] = useState({
      username: "",
      password: ""
    })
    // Функция клеит запрос, как она это делает мне сложно сказать
    function logMeIn(event) { 
      console.log(loginForm.username, loginForm.password)
      axios({
        method: "POST",
        url:"/login",
        data:{
          username: loginForm.username,
          password: loginForm.password
         }
      })
      .then((response) => {
        console.log(response.data.access_token)
        props.setToken(response.data.access_token)
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
      <div>
        <h1>Login: panther, Password: password</h1>
          <form className="login">
            <input onChange={handleChange} 
                  type="username"
                  text={loginForm.username} 
                  name="username" 
                  placeholder="Username" 
                  value={loginForm.username} />
            <input onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

          <button onClick={logMeIn}>Поехали</button>
        </form>
      </div>
    );
}

export default Login;