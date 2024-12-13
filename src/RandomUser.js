import React, { useState, useEffect } from "react";

const RandomUser = () => {
  // Состояния для хранения данных и статуса загрузки
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для получения случайного пользователя
  const fetchRandomUser = async () => {
    setLoading(true); // Показываем индикатор загрузки
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUser(data.results[0]); // Получаем данные пользователя
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setLoading(false); // Останавливаем индикатор загрузки
    }
  };

  // Запрашиваем нового пользователя при монтировании компонента или по кнопке
  useEffect(() => {
    fetchRandomUser();
  }, []); // Пустой массив зависимостей, чтобы вызвать только один раз

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="random-user">
      <div className="user-info">
        {/* Изображение пользователя */}
        <img src={user.picture.large} alt="User" />

        {/* Полное имя */}
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>

        {/* Электронная почта */}
        <p>Email: {user.email}</p>

        {/* Пол */}
        <p>Gender: {user.gender}</p>

        {/* Местоположение */}
        <p>
          Location:{" "}
          {`${user.location.city}, ${user.location.state}, ${user.location.country}`}
        </p>
        <p>
          Address:{" "}
          {`${user.location.street.number} ${user.location.street.name}, ${user.location.postcode}`}
        </p>

        {/* Телефон */}
        <p>Phone: {user.phone}</p>
        <p>Cell: {user.cell}</p>

        {/* Дата рождения и возраст */}
        <p>Date of Birth: {new Date(user.dob.date).toLocaleDateString()}</p>
        <p>Age: {user.dob.age}</p>

        {/* Логин */}
        <p>Username: {user.login.username}</p>

        {/* Идентификатор SSN */}
        <p>SSN: {user.id.value}</p>

        {/* Страна */}
        <p>Nationality: {user.nat}</p>
      </div>

      {/* Кнопка для получения нового пользователя */}
      <button onClick={fetchRandomUser}>Получить нового пользователя</button>
    </div>
  );
};

export default RandomUser;
