import NavigationBar from './logic/NavigationBar';
import { AnswerTextArea } from './logic/AnswerTextArea';
import { SuperList } from './logic/SuperList';

import { useState, useEffect } from 'react'
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

    var [questions, setQuestions] = useState([{text:'1',diffQuestion:4}]);

    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: '/'
    //     })
    //     .then((response) => setQuestions(questions.concat(response)))
    //     .catch(error => {
    //         console.log(error)
    //     })
    // })

    return (
        <div className="main">
            <NavigationBar/>
            <div className='main-container'>
                    <SuperList questions={questions} />
                    <AnswerTextArea/>
            </div>
        </div>
    );
}

export default Main;