import React from "react";

export class Question extends React.Component {
    constructor(props) {
        super()

        let clicked= props.clicked ? true : false
        if (props.text === '')
            clicked=true

        this.state = {
            text: props.text,
            clicked: clicked
        }

        this.HandleClick = this.HandleClick.bind(this)
        this.HandleChange = this.HandleChange.bind(this)
        this.HandleSubmit = this.HandleSubmit.bind(this)

    }

    HandleClick = (e) => {
        e.preventDefault()
        this.setState(state => ({
            text: state.text,
            clicked: !state.clicked
        }))
    }

    HandleChange(e) {
        e.preventDefault()
        this.setState(state => ({
            text: e.target.value,
            clicked: state.clicked
        }))
    }

    HandleSubmit(e) {
        e.preventDefault()
        this.setState(state => ({
            text: state.text,
            clicked: false
        }))
    }

    render() {
        return(
        <div className="one-question-container">
            {this.state.clicked ?
                <div className="text-container" onClick={e => this.HandleClick(e)}>
                    <textarea 
                        className="question-text-input" 
                        type="text"
                        placeholder="Введите свой вопрос здесь"
                        defaultValue={this.state.text}
                        onChange={e => this.HandleChange(e)}
                        onClick={e => this.HandleSubmit(e)}/>
                </div>
                :
                <div className="text-container" onClick={e => this.HandleClick(e)}>
                    <p className="question-text">{this.state.text}</p>
                </div>
            }
            <div className="circle"/>   
            <div className="circle"/>
            <div className="circle"/>
            <div className="circle"/>
            <div className="circle"/>
        </div> 
        )}
}
