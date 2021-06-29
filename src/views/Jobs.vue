<template>
  <div class="wrapper">
    <div class="left">
      <h1>Вакансии</h1>
      <h2>ПРИГЛАШАЕМ НА РАБОТУ</h2>
      <ul>
        <li>Трудоустройство согласно ТК РФ и полное его соблюдение</li>
        <li>Официальная заработная плата</li>
        <li>Работа рядом с домом</li>
        <li>Возможность профессионального и карьерного роста</li>
      </ul>
      <h2>Контактная информация</h2>
      <ul>
        <li>+7 (3522) 47‒41‒11</li>
        <li>+7 (961) 752-71-91</li>
      </ul>
      <h2>Логистика, склад, закупки</h2>
      <p>Кладовщик (старший продавец)</p>
      <h2>Рабочий персонал</h2>
      <p>Грузчик, продавец - кассир</p>
    </div>
    <div class="right">
      <h1>Оставить резюме:</h1>
      <input type="text" name="" id="" placeholder="Имя" />
      <input type="text" name="" id="" placeholder="Номер телефона" />
      <input type="text" name="" id="" placeholder="e-mail" />
      <input
        type="file"
        name=""
        placeholder="Ваше резюме в формате .docx"
        id=""
      />
      <button class="button button-large button-primary">
        <span class="button-label">Отправить</span>
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  min-height: 90vh;
  width: 100%;
  padding: 32px 40px;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    padding: 16px 32px;
  }
}

.right {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;

  input {
    padding: 16px;
    background-color: #ebebeb;
    border-radius: 16px;
    border: none;
    margin: 8px 0;
    outline: none;
  }

  .button-label {
    text-align: center;
    width: 100%;
  }
}

h1 {
  margin-bottom: 8px;
  color: #2075f5;
}

h2 {
  margin: 4px;
  margin-top: 16px;
  color: #4d4d4d;
}

p,
li,
a {
  font-size: 24px;
  margin-bottom: 16px;
  text-decoration: none;
  list-style-type: square;
}
</style>
