import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './user/Login'
import Header from './user/Header'
import useToken from './user/useToken' 
import Main from './main'
import SignUp from './user/SignUp'
import Repetition from './rep'

function App() {

    const { token, removeToken, setToken } = useToken();
    const [id_subject, setSubject] = useState(-1);
    const [questions, setQuestions] = useState([])
    
    return (
          <BrowserRouter> 
              {token==="" || token=== undefined?  
                <Routes>
                  <Route exact path="/" element={<Login setToken={setToken} token={token}/>}></Route>
                  <Route exact path="/signup" element={<SignUp />}></Route>
                </Routes>
              :(
                <>
                  <Header removeToken={removeToken} token={token} setToken={setToken}
                  id_subject={id_subject} setSubject={setSubject}
                  quastions={questions} setQuestions={setQuestions}/>
                  <Routes>
                    <Route exact path="/" element={<Main token={token} setToken={setToken} 
                    id_subject={id_subject} setSubject={setSubject}
                    questions={questions} setQuestions={setQuestions}/>}></Route>
                    <Route exact path="/repetition/" element={<Repetition token={token} setToken={setToken}/>}></Route>
                  </Routes>
                </>
              )}
          </BrowserRouter>
    );
  }


export default App;