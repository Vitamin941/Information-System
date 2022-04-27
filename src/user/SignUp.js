import { useState } from 'react';
import axios from "axios";
import '../css/Login.css';

function SignUp(props){
    const [signUpForm, setSignUpForm] = useState({
        username: "",
        fullname: "",
        password: ""
      })
    
    function signUp(event){
        axios({
            method: "POST",
            url:"/signup",
            data:{
              username: signUpForm.username,
              fullname: signUpForm.fullname,
              password: signUpForm.password
             }
        }).then((response) => {
            alert(response.data)
            console.log(response.data)
        }).catch((error) => {
            if (error.response) {
                alert(error.response.data)
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
        setSignUpForm(({
            username: "",
            fullname: "",
            password: ""}))
    
        event.preventDefault()
    }

    function handleChange(event) { 
        console.log("Change")
        const {value, name} = event.target
        setSignUpForm(prevNote => ({
            ...prevNote, [name]: value})
        )
    }
    return (
        <div>
          <h1>Регистрация</h1>
            <form className="signup">
              <input onChange={handleChange} 
                    type="username"
                    text={signUpForm.username} 
                    name="username" 
                    placeholder="Username" 
                    value={signUpForm.username} />
              <input onChange={handleChange} 
                    type="fullname"
                    text={signUpForm.fullname} 
                    name="fullname" 
                    placeholder="Fullname" 
                    value={signUpForm.fullname} />
              <input onChange={handleChange} 
                    type="password"
                    text={signUpForm.password} 
                    name="password" 
                    placeholder="Password" 
                    value={signUpForm.password} />
  
            <button onClick={signUp}>Поехали</button>
          </form>
          <a href='/'>Страница входа</a>
        </div>
    );
}

export default SignUp;