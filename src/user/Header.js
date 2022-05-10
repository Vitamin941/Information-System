import React from "react";
import axios from "axios";
import '../css/User-window.css'
import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

export class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subject: [],
      me: ""
    }
    this.logMeOut = this.logMeOut.bind(this)
    this.get_me = this.get_me.bind(this)
    this.openSubjects = this.openSubjects.bind(this)
    this.createSubject = this.createSubject.bind(this)
  }

  componentDidMount() {
    this.get_me()
  }
  get_me(){
    axios({
        method: "GET",
        url:"/me",
        headers: {
            Authorization: 'Bearer ' + this.props.token
        }
    })
    .then((resp) => {
      console.log(this.state.me)
      this.state.me = resp.data.full_name
      this.setState({me: this.state.me})
      console.log(this.state.me)
    })
    .catch(error => console.log(error))
}  
  // Запрос на выход
  logMeOut() {

    axios({
      method: "POST",
      url:"/logout",
    })
    .then(() => {
       this.props.removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
    window.open("/")
    }
    
  OpenWindow(e) {
    var classNameNow = e.target.parentElement.children[0].className;
    if (classNameNow === "user-window"){
        e.target.parentElement.children[0].className ="user-window-hidden"
        classNameNow = "user-window-hidden"
    }else if (classNameNow === "user-window-hidden"){
        e.target.parentElement.children[0].className ="user-window"
    }
  } 

  /* Когда пользователь нажимает на кнопку, переключаться раскрывает содержимое */
  openSubjects(e) {
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

  getQuestionSubjects(subject_id) {
    axios({
      method: "GET",
      url:"/get_question_subject/" + subject_id,
      headers: {
          Authorization: 'Bearer ' + this.props.token
      }
      })
      .then(resp => {
        // console.log(this.props.id_subject)
        // console.log(resp.data.questions); 
        this.props.setQuestions(resp.data.questions)})
      .catch(error => console.log(error))
  }
  render() { return(
        <header className="App-header">
            <nav className="nav-bar">
                <div className="block-subject" data-id_subject={this.props.id_subject}>
                  <a href="#" className="link link-subject" onMouseOver={this.openSubjects}>Категории</a>
                  <div className="subjects-list">
                    {this.state.subject.map(subject => 
                      <a key={subject.subject_id} href="#" className="el-subjects-list" 
                      onClick={() => this.activeSubject(subject.subject_id, subject.subject_name)}>
                      {subject.subject_name}</a>
                    )}
                    <div className="block-create-subject">
                      <input className="create-subject-input" type="text" placeholder="Новая категория"></input>
                      <a className="create-subject" onClick={this.createSubject}></a>
                    </div>
                  </div>
                </div>
                <a href="/repetition" className="link">Повторение</a>
                <a href="/" className="link">Главная</a>
                <div className="block-user-window">            
                    <div className="user-window-hidden">
                        <h1 className="name-user" >{this.state.me}</h1>
                        <form  className="get">
                            <input  
                            type="text" className="get-user-window"
                            placeholder="Поиск"/>
                            <button type="submit" className="button-get-user-window"></button>
                        </form>
                        <div className="text-user">
                            <ul>
                              <li>Первый пункт</li>
                              <li>Второй пункт</li>
                              <li>Третий пункт</li>
                            </ul>
                        </div>
                        <textarea className="email-user-window">
                        </textarea >
                        <form>
                            <button className="button-email-user-window">Отправить</button> 
                        </form>
                        <div className="button-user-window">
                            <a className="button-email-user-Settings"></a> 
                            <form><button className="button-email-user-Exit" onClick={this.logMeOut}></button></form>
                        </div>
                    </div>
                    <div className="user-window-link" onClick={this.OpenWindow}></div>
              </div>
            </nav>
        </header>
    )}
}

export default Header;