<template>
  <div class="wrapper">
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
</template>
<style lang="scss" scoped>
.wrapper {
  min-height: 90vh;
  width: 100%;
  padding: 32px 40px;
  background-color: #fff;

  @media screen and (max-width: 1000px) {
    padding: 16px 32px;
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
