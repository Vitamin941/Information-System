import NavigationBar from './entities/NavigationBar';
import AnswerTextArea from './entities/AnswerTextArea';
import QuestionList from './entities/QuestionList';
import {MyList} from './entities/MyList';

import { useState } from 'react'
import axios from "axios";

function Main(props) {
    // Кусочек для авторизации==================================
    // const [profileData, setProfileData] = useState(null)
    // ++++++++++++++++++ Пример получения данных ++++++++++++++
    // function getData() {
    // axios({
    //   method: "GET",
    //   url:"/profile",
    //   headers: {
    //     Authorization: 'Bearer ' + props.token
    //   }
    // })
    // .then((response) => {
    //   const res =response.data
    //   res.access_token && props.setToken(res.access_token)
    //   setProfileData(({
    //     profile_name: res.name,
    //     about_me: res.about}))
    // }).catch((error) => {
    //   if (error.response) {
    //     console.log(error.response)
    //     console.log(error.response.status)
    //     console.log(error.response.headers)
    //     }
    // })}
    //
    // ++++++++++++++++++ Пример запроса в return ++++++++++++++++
    //  
    //<p>To get your profile details: </p><button onClick={getData}>Click me</button>
    //         {profileData && <div>
    //             <p>Profile name: {profileData.profile_name}</p>
    //             <p>About me: {profileData.about_me}</p>
    //             </div>
    //         }
    // Конец кусочка для авторизации==============================

    //Твой код теперь тут :)
    const [questions, setQuestions] = useState([
        { text: "1", difficultyCount: 1},
        { text: "2", difficultyCount: 2},
        { text: "3", difficultyCount: 3}
    ]);
  
    function createNewQuestion() {
        setQuestions(questions => questions.push({text: "4", difficultyCount: 2}))
    }
    return (
        <div className="main">
            <NavigationBar/>
            <div className='main-container'>
                <QuestionList questions={questions} />
                <div className='answer-container'>
                    <AnswerTextArea/>
                </div>
            </div>
        </div>
    );
}

export default Main;