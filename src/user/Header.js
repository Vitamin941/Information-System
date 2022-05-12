import React from "react";
import axios from "axios";
import '../css/User-window.css'

export class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subject: [],
      me: "",
      msgUserId: -1,
      msgUderName: "",
      msgSubjectId: -1,
      msgSubjectName: ""
    }
    this.logMeOut = this.logMeOut.bind(this)
    this.get_me = this.get_me.bind(this)
    this.openSubjects = this.openSubjects.bind(this)
    this.createSubject = this.createSubject.bind(this)
    this.getUserId = this.getUserId.bind(this)
    this.sendSubject = this.sendSubject.bind(this)
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
    window.location.href = '/'

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

  selectedSubject(subject_id, subject_name) {
    document.querySelector(".select-subject").innerText = subject_name
    this.setState({msgSubjectId:subject_id})
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
        this.props.setQuestions(resp.data.questions)})
      .catch(error => console.log(error))
  }

  getUserId (){
    let user_name = document.querySelector(".get-user-window").value
    console.log(user_name)
    axios({
      method: "GET",
      url:"/get_user_id/" + user_name,
      headers: {
          Authorization: 'Bearer ' + this.props.token
      }
    }).then(resp => {
        console.log(resp)
        if (resp.data.exis){
          this.setState({
            msgUserId: resp.data.user_id,
            msgUderName: resp.data.user_name
          })
        } else {
          this.setState({
            msgUserId: -1,
            msgUderName: ""
          })
        }
        
    })
      
  }

  sendSubject() {
    console.log(this.state.msgSubjectId)
    console.log(this.state.msgUserId)
    axios({
      method: "POST",
      url: "/send_subject/"+this.state.msgSubjectId.toString()+"/user/"+this.state.msgUserId.toString(),
      headers: {
          Authorization: 'Bearer ' + this.props.token
      }
    }).then(resp => {
      console.log(resp.data)
    })
  }
  render() { {console.log()}
    return(
        <header className="App-header">
            <nav className="nav-bar">
            {window.location.href.indexOf('/repetition') === -1 
              ?
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
              :
                <a href="#" className="link link-subject">Категории</a>
            }
                <a href="/repetition" className="link">Повторение</a>
                <a href="/" className="link">Главная</a>





                <div className="block-user-window">            
                    <div className="user-window-hidden">
                        <h1 className="name-user" >{this.state.me}</h1>
                        <form  className="get">
                            <input  
                            type="text" className="get-user-window"
                            placeholder="Поиск" />
                            <a type="submit" className="button-get-user-window" onClick={this.getUserId}/>
                        </form>
                        {this.state.msgUserId !== -1?
                          <p>Выбран {this.state.msgUderName}</p>
                        :
                          <p>Никто не выбран</p>
                        }
                        <div className="block-subject" data-id_subject={this.props.id_subject}>
                          <a href="#" className="select-subject" onMouseOver={this.openSubjects}>Выбор категории</a>
                          <div className="subjects-list">
                            {this.state.subject.map(subject => 
                              <a key={subject.subject_id} href="#" className="el-subjects-list" 
                              onClick={() => this.selectedSubject(subject.subject_id, subject.subject_name)}>
                              {subject.subject_name}</a>
                            )}
                            <div className="block-create-subject">
                              <input className="create-subject-input" type="text" placeholder="Новая категория"></input>
                              <a className="create-subject" onClick={this.createSubject}></a>
                            </div>
                          </div>
                        </div>
                        {this.state.msgUserId !== -1 && this.state.msgSubjectId !== -1?
                          <a className="button-email-user-window" onClick={this.sendSubject}>Отправить</a> 
                        :
                        <></>
                        }
                        <div className="button-user-window">
                            <a className="button-email-user-Settings"></a> 
                            <a className="button-email-user-Exit" onClick={this.logMeOut}></a>
                        </div>
                    </div>
                    <div className="user-window-link" onClick={this.OpenWindow}></div>
              </div>



            </nav>
        </header>
    )}
}

export default Header;