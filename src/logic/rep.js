import { useState } from 'react';
import { AnswerTextArea } from './AnswerTextArea';
import RepetitionBlock from './RepetitionBlock';
import axios from "axios";

function Repetition(props) {
    const [answerShow, setAnswerShow] = useState(false);
    const [answer, setAnswer] = useState("");
    const [photo, setPhoto] = useState();
    const [idQuestion, setIdQuestion] = useState();

    function seeAnswer(){
        setAnswerShow(true)
        console.log(idQuestion)
        axios({
            method: "get",
            url: "/get_answer/"+idQuestion,
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((resp) => {
            setAnswer(resp.data.answer)      
            setPhoto(resp.data.photo)
        })
    }
    return (
        <div className="main">
            <div className='main-container'>
                    <RepetitionBlock token={props.token} setToken={props.setToken} setIdQuestion={setIdQuestion} setAnswerShow={setAnswerShow}/>
                    {answerShow
                    ?
                        <AnswerTextArea
                        answer={answer} setAnswer={setAnswer}
                        photo={photo} setPhoto={setPhoto}/>
                    :
                    <div>
                        <a onClick={() => seeAnswer()}>ПОКАЗАТЬ</a>
                    </div>
                    }
                    
            </div>
        </div>
    );
}

export default Repetition;