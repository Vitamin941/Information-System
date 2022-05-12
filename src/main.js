import { AnswerTextArea } from './logic/AnswerTextArea';
import { SuperList } from './logic/SuperList';
import { useState } from 'react'

function Main(props) {
    const [answer, setAnswer] = useState("");
    const [photo, setPhoto] = useState();
    
    return (
        <div className="main">
            <div className='main-container'>
                    <SuperList token={props.token} 
                    id_subject={props.id_subject} setSubject={props.setSubject}
                    questions={props.questions} setQuestions={props.setQuestions}
                    answer={answer} setAnswer={setAnswer}
                    photo={photo} setPhoto={setPhoto}/>
                    <AnswerTextArea
                    answer={answer} setAnswer={setAnswer}
                    photo={photo} setPhoto={setPhoto}/>
            </div>
        </div>
    );
}

export default Main;