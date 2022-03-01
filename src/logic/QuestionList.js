import React, {useContext} from "react";
import ReactDOM from "react-dom";
import Question from "./Question";


export default function QuestionList(props) {

    return (
        <div className='questions-container'>
            {props.questions.map(question => 
                <Question text={question.text} difficultyCount={question.difficultyCount}/>
            )}
        </div>
    )

    function insertForm() {
        return (
            <form className="one-question-builder">
                <textarea itemType="text" placeholder="Введите вопрос" className="question-form"/>
            </form>
        )
    }
}

