import { AnswerTextArea } from './AnswerTextArea';
import RepetitionBlock from './RepetitionBlock';

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