import React from "react";
import axios from "axios";
import '../css/User-window.css'

export class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subject: [],
      me: "",
      login: "",
      msgUserId: -1,
      msgUderName: "",
      msgSubjectId: -1,
      msgSubjectName: ""
    }
    this.logMeOut = this.logMeOut.bind(this)
    this.get_me = this.get_me.bind(this)
    this.openSubjects = this.openSubjects.bind(this)
    this.createSubject = this.createSubject.bind(this)
    this.deleteSubject = this.deleteSubject.bind(this)
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
      this.state.me = resp.data.full_name
      this.state.login = resp.data.username
      this.setState({me: this.state.me})
      this.setState({login: this.state.login})
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
       this.props.setToken("")
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
    // window.location.href = '/'

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
                    <div className="row-subject">
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





                <div className="block-user-window">            
                    <div className="user-window-hidden">
                        <h1 className="name-user" >{this.state.me}</h1>
                        <p className="login-user">({this.state.login})</p>
                        <h1 className="h1-send-subject">Отправка группы:</h1>
                        <form  className="get">
                            <input  
                            type="text" className="get-user-window"
                            placeholder="Поиск пользователя" />
                            <a type="submit" className="button-get-user-window" onClick={this.getUserId}/>
                        </form>
                        {this.state.msgUserId !== -1?
                          <p>Выбран {this.state.msgUderName}</p>
                        :
                          <p>Никто не выбран</p>
                        }
                        <div className="block-subject" data-id_subject={this.props.id_subject}>
                          <a href="#" className="select-subject" onMouseOver={this.openSubjects}>Выбор категории</a>
                          <div className="send-subject-list">
                            {this.state.subject.map(subject => 
                              <a key={subject.subject_id} href="#" className="el-subjects-list" 
                              onClick={() => this.selectedSubject(subject.subject_id, subject.subject_name)}>
                              {subject.subject_name}</a>
                            )}
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