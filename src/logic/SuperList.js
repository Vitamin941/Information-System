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
        this.delete = this.deleteQuestion.bind(this)
    }

    componentDidMount() {
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

    deleteQuestion(qu_del) {

        console.log("Удаляю", qu_del)
        axios({
            method: "post",
            url: "/delete_question/"+qu_del.id,
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
        })
        .then(function (response) {
            console.log(response);
          })
        const newItems = this.state.items.filter(qu => qu !== qu_del)
        console.log(newItems)
        this.setState({items:newItems})
    }

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
        
        this.addToDB(newQuestion)
    }

    addToDB(question) {
        axios({
            method: "post",
            url: "/add_question",
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
            data:{
                id_subject: 1,
                text: question.text,
                photo: NaN,
                answer: ""
            },
        })
        .then(resp =>  console.log(resp.data.id))
        .then(resp => this.state.items[this.state.items.length - 1].id = resp.data.id )

    }

    render() {
        return (
          <div className="questions-container">
                {this.state.items.map(question => 
                    <Question text={question.text} level={question.level} id={question.id} token={this.props.token} del={() => this.deleteQuestion(question)}/>
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
                    {this.state.generatedQuestion
                        ?
                        <button className="question-submiter" onClick={this.onSubmit} />
                        :
                        <></>
                    }
                </div>
        </div>
        );
      }
  }