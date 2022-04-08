import React from "react";
import {Question} from "./Question";

export class SuperList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            items: props.questions, 
            text: 0
        };

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();

        const newQuestion = {
            text: 1,
            difficultyCount: 5
        };

        this.setState(state => ({
            items: state.items.concat(newQuestion),
            text: state.text
        }));
    }

    render() {
        return (
          <div className="questions-container">
                {this.state.items.map(question => 
                    <Question text={question.text} difficultyCount={question.difficultyCount}/>
                )}
              <button className="question-adder" onClick={this.onSubmit} />
        </div>
        );
      }
  }