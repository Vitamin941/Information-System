import axios from "axios";

function Header(props) {
  // Запрос на выход 
  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    // Кнопка для выхода находится в шапке
    return(
        <header className="App-header">
            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}

export default Header;