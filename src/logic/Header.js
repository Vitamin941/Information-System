import React from "react";
import axios from "axios";
import '../css/Header.css'
import '../css/User-window.css'
import { UserWindow } from "./UserWindow";

export class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subject: [],
    }
    
    this.openSubjects = this.openSubjects.bind(this)
    this.createSubject = this.createSubject.bind(this)
    this.deleteSubject = this.deleteSubject.bind(this)
  }

  openSubjects() {
    axios({
      method: "GET",
      url:"/get_subject",
      headers: {
          Authorization: 'Bearer ' + this.props.token
      }
    })
    .then((resp) => {
        this.state.subject = resp.data.subject
        this.setState({subject: this.state.subject})
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  activeSubject(subject_id, subject_name) {
    document.querySelector(".link-subject").innerText = subject_name
    document.querySelector(".subject-heading").innerHTML = subject_name
    this.props.setSubject(subject_id)
    this.getQuestionSubjects(subject_id)
  }  

  createSubject() {
    let name_subject = document.querySelector(".create-subject-input").value
    axios({
      method: "POST",
      url: "/add_subject",
      headers: {
          Authorization: 'Bearer ' + this.props.token
      },
      data:{
          name_subject: name_subject
      },
    })
    .then((resp) => {
      let new_subject = {
         subject_id: resp.data.id,
         subject_name: name_subject
      }
      this.state.subject = this.state.subject.concat(new_subject)
      this.setState({subject: this.state.subject})
    }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
    })
  }

  deleteSubject(id){
    console.log("Удалил")
    axios({
      method: "POST",
      url: "/delete_subject/" + id,
      headers: {
          Authorization: 'Bearer ' + this.props.token
      },
    }).then(
      this.setState({subject: this.state.subject.filter(sbj => sbj.subject_id !== id)})
    )
  }

  getQuestionSubjects(subject_id) {
    axios({
      method: "GET",
      url:"/get_question_subject/" + subject_id,
      headers: {
          Authorization: 'Bearer ' + this.props.token
      }
      })
      .then(resp => {
        this.props.setQuestions(resp.data.questions)})
      .catch(error => console.log(error))
  }

  render() {
    return(
        <header className="App-header">
            <nav className="nav-bar">
            {window.location.href.indexOf('/repetition') === -1 
              ?
                <div className="block-subject" data-id_subject={this.props.id_subject}>
                  <a href="#" className="link link-subject" onMouseOver={this.openSubjects}>Категории</a>
                  <div className="subjects-list">
                    {this.state.subject.map(subject => 
                    <div  key={subject.subject_id} className="row-subject">
                      <a key={subject.subject_id} href="#" className="el-subjects-list" 
                      onClick={() => this.activeSubject(subject.subject_id, subject.subject_name)}>
                      {subject.subject_name}</a>
                      <a className="delete-subject" onClick={() => this.deleteSubject(subject.subject_id)}></a>
                    </div>
                    )}
                    <div className="block-create-subject">
                      <input className="create-subject-input" type="text" placeholder="Новая категория"></input>
                      <a className="create-subject" onClick={this.createSubject}></a>
                    </div>
                  </div>
                </div>
              :
                <a href="#" className="link link-subject">Категории</a>
            }
                <a href="/repetition" className="link">Повторение</a>
                <a href="/" className="link">Главная</a>

              <UserWindow subject={this.state.subject} token={this.props.token}
              removeToken={this.props.removeToken} setToken={this.props.setToken}/>

            </nav>
        </header>
    )}
}

export default Header;