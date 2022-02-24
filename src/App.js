import NavigationBar from './entities/NavigationBar';
import AnswerTextArea from './entities/AnswerTextArea';
import QuestionList from './entities/QuestionList';
import {MyList} from './entities/MyList';

import React, {useState} from 'react';


function App() {
    const [questions, setQuestions] = useState([
      { text: "1", difficultyCount: 1},
      { text: "2", difficultyCount: 2},
      { text: "3", difficultyCount: 3}
    ]);

    function createNewQuestion() {
      setQuestions(questions => questions.push({text: "4", difficultyCount: 2}))
    }

    return (
        <div className='main'>
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


export default App;