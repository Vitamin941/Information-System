import React from "react";

const Question = ({ text, difficultyCount }) => (
    <div className="one-question-container">
        <div className="text-container">
            <p className="question-text">{text}</p>
        </div>
        <div className="circle"/>
        <div className="circle"/>
        <div className="circle"/>
        <div className="circle"/>
        <div className="circle"/>
    </div>
);

export default Question;