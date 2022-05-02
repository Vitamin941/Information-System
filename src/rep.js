import { AnswerTextArea } from './logic/AnswerTextArea';
import RepetitionBlock from './logic/RepetitionBlock';

function Repetition(props) {

    return (
        <div className="main">
            <div className='main-container'>
                    <RepetitionBlock token={props.token} setToken={props.setToken}/>
                    <AnswerTextArea/>
            </div>
        </div>
    );
}

export default Repetition;