import axios from "axios";
import '../css/User-window.css'

function Header(props) {
  // Запрос на выход 
  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
    window.open("/")
    }
    
    function OpenWindow(e) {
      var classNameNow = e.target.parentElement.children[0].className;
      if (classNameNow === "user-window"){
          e.target.parentElement.children[0].className ="user-window-hidden"
          classNameNow = "user-window-hidden"
      }else if (classNameNow === "user-window-hidden"){
          e.target.parentElement.children[0].className ="user-window"
      }
    } 
    return(
        <header className="App-header">
            <nav className="nav-bar">
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
                            <form><button className="button-email-user-Exit" onClick={logMeOut}></button></form>
                        </div>
                    </div>
                    <div className="user-window-link" onClick={OpenWindow}></div>
              </div>
            </nav>
        </header>
    )
}

export default Header;