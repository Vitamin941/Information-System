import { useState } from 'react';
//npm install react-router-dom


function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token'); // просатриваем сохраненные токены на компе
    return userToken && userToken //сам не понял, что за костыль
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken); // Прописываем в систему
    setToken(userToken); // Сохраняем в переменую token
  };

  function removeToken() {
    localStorage.removeItem("token"); //удаляем из системы
    setToken(""); // чистим переменную
  }

  // Возвращает  токен, метод его удаления и как его сохранять
  return {
    token,
    removeToken,
    setToken: saveToken
  }

}

export default useToken;