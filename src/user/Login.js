import { useState } from 'react';
import axios from "axios";

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })
    // Функция клеит запрос, как она это делает мне сложно сказать
    function logMeIn(event) { 
      console.log("Я сломал кнопку")
      axios({
        method: "POST",
        url:"token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
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
        <h1>Login: test, Password: test</h1>
          <form className="login">
            <input onChange={handleChange} 
                  type="email"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
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