<template>
  <div class="wrapper">
    <div class="text">
      <h1>Наши контакты:</h1>
      <h2>Адрес:</h2>
      <p>Г.Курган Ул. 3мкр-н, д. 1а</p>
      <h2>Телефон:</h2>
      <p>8-800-234-88-08</p>
      <h2>Телефон многоканальный:</h2>
      <p>+7 (3522) 47‒41‒11</p>
      <h2>Почтовый адрес:</h2>
      <a href="mailto:akva45@mail.ru"> akva45@mail.ru</a>
      <h2>График работы:</h2>
      <ul>
        <li>Пн 09:00–19:00</li>
        <li>Вт 09:00–19:00</li>
        <li>Ср 09:00–19:00</li>
        <li>Чт 09:00–19:00</li>
        <li>Пт 09:00–19:00</li>
        <li>Сб 09:00–18:00</li>
        <li>Вс 09:00–16:00</li>
      </ul>
    </div>
    <div class="map" style="position: relative; overflow: hidden">
      <a
        href="https://yandex.ru/maps/53/kurgan/?utm_medium=mapframe&utm_source=maps"
        style="color: #eee; font-size: 12px; position: absolute; top: 0px"
        >Курган</a
      ><a
        href="https://yandex.ru/maps/53/kurgan/house/3_y_mikrorayon_1a/YkwYdAJnSEEDQFtvfXh3cX5gZQ==/?ll=65.257143%2C55.460232&utm_medium=mapframe&utm_source=maps&z=17.15"
        style="color: #eee; font-size: 12px; position: absolute; top: 14px"
        >3-й микрорайон, 1А — Яндекс.Карты</a
      ><iframe
        src="https://yandex.ru/map-widget/v1/-/CCUemDT4XD"
        frameborder="1"
        allowfullscreen="true"
        style="position: relative"
      ></iframe>
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
    flex-direction: column;
  }
}

.map {
  width: 60%;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  iframe {
    width: 100%;
    min-height: 90vh;

    @media screen and (max-width: 1000px) {
      height: 30vh;
      min-height: auto;
    }
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
