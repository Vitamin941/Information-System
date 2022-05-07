import React from "react";
import axios from "axios";
import '../css/User-window.css'

export class Header extends React.Component {
  // const [subject, setSubject] = useState([]) 
  constructor(props){
    super(props);
    this.state = {
      subject: [],
    }
    this.logMeOut = this.logMeOut.bind(this)
    this.openSubjects = this.openSubjects.bind(this)
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
    var classNameNow = e.target.parentElement.children[1].className;
    if (classNameNow === "subjects-list"){
        e.target.parentElement.children[1].className ="subjects-list-hidden"
        classNameNow = "subjects-list-hidden"
    }else if (classNameNow === "subjects-list-hidden"){
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
            console.log(this.state.subject)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
        e.target.parentElement.children[1].className ="subjects-list"
    }
  }
  activeSubject(subject_id, subject_name) {
    document.querySelector(".link-subject").innerText = subject_name
    console.log(subject_id)
  }  
  render() { return(
        <header className="App-header">
            <nav className="nav-bar">
                <div className="block-subject">
                  <a href="#" className="link link-subject" onClick={this.openSubjects}>Категории</a>
                  <div className="subjects-list-hidden">
                    {this.state.subject.map(subject => 
                      <a key={subject.subject_id} href="#" className="el-subjects-list" 
                      onClick={() => this.activeSubject(subject.subject_id, subject.subject_name)}>
                      {subject.subject_name}</a>
                    )}
                  </div>
                </div>
                <a href="/admin" className="link">Админка</a>
                <a href="/repetition" className="link">Повторение</a>
                <a href="/" className="link">Главная</a>
                <div className="block-user-window">            
                    <div className="user-window-hidden">
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