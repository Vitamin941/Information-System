import React from "react";
import {Question} from "./Question";

export class SuperList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            items: props.questions, 
            text: '',
            generatedQuestion: false
        };

        this.onCreate = this.onCreate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onCreate(e) {
        e.preventDefault();
        this.setState(state => ({
            items: state.items,
            text: state.text,
            generatedQuestion: true
        }))
        // const newQuestion = {
        //     text: '',
        //     difficultyCount: 5
        // };

        // this.setState(state => ({
        //     items: state.items.concat(newQuestion),
        //     text: state.text
        // }));
    }

    onSubmit(e) {
        e.preventDefault()
        let input = document.getElementsByClassName("inputer")[0]
        const newQuestion = {
            text: input.value,
            difficultyCount: 5,
        };

        this.setState(state => ({
            items: state.items.concat(newQuestion),
            text: state.text,
            generatedQuestion: false
        }));
    }

    render() {
        return (
          <div className="questions-container">
                {this.state.items.map(question => 
                    <Question text={question.text} difficultyCount={question.difficultyCount}/>
                )}
                {this.state.generatedQuestion
                    ?
                    <div className="input-container">
                        <input className="inputer" placeholder="Введите текст"/>
                    </div>
                    :
                    <></>
                }
                <div className="buttons-container">
                    <button className="question-adder" onClick={this.onCreate} />
                    {this.state.generatedQuestion?
                        <button className="question-submiter" onClick={this.onSubmit} />
                        :
                        <></>
                    }
                </div>
        </div>
        );
      }
  }