import React from "react";
import {Question} from "./Question";
import axios from "axios";

export class SuperList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            items: [], 
            text: '',
            generatedQuestion: false
        };

        this.onCreate = this.onCreate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        let data = []
        axios({
            method: "GET",
            url:"/get_question_subject/1",
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
            })
            .then(resp => this.setState(prevState => ({
                items: resp.data.questions,
                text: prevState.text,
                generatedQuestion: prevState.generatedQuestion
            })))
            .catch(error => console.log(error))
    }

    // componentDidUpdate() {
    //     axios({
    //         method: "POST",
    //         url:"add_question_subject/1",
    //         data:{
    //             text_question: items.text
    //         },
    //         headers: {
    //                 Authorization: 'Bearer ' + props.token
    //     }})
    // }

    onCreate(e) {
        e.preventDefault();
        this.setState(state => ({
            items: state.items,
            text: state.text,
            generatedQuestion: true
        }))
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
                    <Question text={question.text_question} difficultyCount={question.difficultyCount}/>
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