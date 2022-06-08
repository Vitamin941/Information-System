import { AnswerTextArea } from './AnswerTextArea';
import { SuperList } from './SuperList';
import { useState } from 'react'

function Main(props) {
    const [answer, setAnswer] = useState("");
    const [photo, setPhoto] = useState();
    const [activeQuastion, setActiveQuestion]= useState();
    return (
        <div className="main">
            <div className='main-container'>
                    <SuperList token={props.token} 
                    id_subject={props.id_subject} setSubject={props.setSubject}
                    questions={props.questions} setQuestions={props.setQuestions}
                    answer={answer} setAnswer={setAnswer}
                    photo={photo} setPhoto={setPhoto}
                    activeQuastion={activeQuastion} setActiveQuestion={setActiveQuestion}
                    />
                    <AnswerTextArea
                    token={props.token}
                    answer={answer} setAnswer={setAnswer}
                    photo={photo} setPhoto={setPhoto}
                    activeQuastion={activeQuastion} setActiveQuestion={setActiveQuestion}
                    />
            </div>
        </div>
    );
}

export default Main;