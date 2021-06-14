<template>
  <div id="app">
    <header class="header-wrapper">
      <div class="header-top">
        <button class="button button-primary-transparent">
          <img src="/img/navigation_arrow.svg" alt="" class="button-icon" />
          <span class="button-label">Курган</span>
        </button>
        <div class="header-top-right">
          <a href="#top">Магазины</a>
          <a href="#top" id="login-button">Личный кабинет</a>
        </div>
        <div id="loginForm" class="header-login-form hidden">
          <h4 class="header-login-form-title">Войти или зарегистрироваться</h4>
          <input type="text" placeholder="Имя пользователя" />
          <input type="password" placeholder="Пароль" />
          <button class="button button-primary button-block button-medium">
            Войти
          </button>
          <button
            id="registerButton"
            class="button button-secondary button-block button-medium"
          >
            Зарегистрироваться
          </button>
        </div>
        <div id="registerForm" class="header-login-form hidden">
          <h4 class="header-login-form-title">Регистрация</h4>
          <input type="text" placeholder="Имя пользователя" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <input type="password" placeholder="Повторите пароль" />
          <button class="button button-primary button-block button-medium">
            Зарегистрироваться
          </button>
          <button
            id="haveAccountButton"
            class="button button-secondary button-block button-medium"
          >
            У меня уже есть аккаунт
          </button>
        </div>
      </div>
      <div class="header-mid">
        <img src="/img/logo_akva.jpg" alt="" class="header-logo" />
        <div class="search">
          <input
            type="text"
            placeholder="Поиск по каталогу..."
            class="header-search"
          />
          <button class="button button-circle button-large button-primary">
            <img class="button-icon" src="/img/search_icon.svg" alt="" />
          </button>
        </div>
        <section class="header-phone">
          <img src="/img/phone_icon.svg" alt="" />
          <a href="tel:+78009999999">+7 800 999 99-99</a>
        </section>
        <button class="button button-large button-primary-transparent">
          <img src="/img/cart_icon.svg" alt="" class="button-icon" />
          <span class="button-label">Корзина</span>
        </button>
      </div>
      <div class="header-nav">
        <button class="button button-large-wide button-primary" id="catalog">
          <img src="/img/hamburger_icon.svg" alt="" class="button-icon" />
          <span class="button-label">Каталог товаров</span>
        </button>
        <a href="">Акции</a><a href="">Доставка и самовывоз</a
        ><a href="">Установка</a><a href="">Вакансии</a
        ><a href="">Юридическим лицам</a>
        <section class="catalog-list hidden">
          <div class="list-item">
            <span>Абразивные материалы</span>
            <img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden">
              <div class="list-item">Круги зачистные</div>
              <div class="list-item">Круги отрезные по металлу</div>
            </div>
          </div>
          <div class="list-item">
            <span>Вентиляционные системы</span
            ><img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden">
              <div class="list-item">Вентиляция AURAMAX</div>
              <div class="list-item">Вентиляция ФЛЕКС</div>
              <div class="list-item">Вентиляция ЭРА</div>
              <div class="list-item">Люки ревизионные LYUKER</div>
              <div class="list-item">Фурнитура для воздуховодов</div>
            </div>
          </div>
          <div class="list-item">
            <span>Водосливная арматура</span
            ><img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden">
              <div class="list-item">Водосливная арматура АНИ ПЛАСТ</div>
              <div class="list-item">Водосливная арматура ALCAPLAST</div>
              <div class="list-item">Водосливная арматура UNICORN</div>
              <div class="list-item">Водосливная арматура АКВАТЕР</div>
              <div class="list-item">Водосливная арматура разное</div>
              <div class="list-item">Шланги д/стиральных машин</div>
              <div class="list-item">
                Шланги д/стиральных машин в индивидуальной упаковке
              </div>
            </div>
          </div>
          <div class="list-item">
            <span>Смывная арматура</span
            ><img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden"></div>
          </div>
          <div class="list-item">
            <span>Резинотехнические изделия</span
            ><img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden"></div>
          </div>
          <div class="list-item">
            <span>Канализационные системы</span
            ><img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden"></div>
          </div>
          <div class="list-item">
            <span>Радиаторы и комплектующие</span
            ><img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden"></div>
          </div>
          <div class="list-item">
            <span>Водонагреватели, котлы, электрические теплые полы</span
            ><img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div class="list-item-children hidden"></div>
          </div>
        </section>
      </div>
    </header>
    <div class="container">
      <router-view />
    </div>
    <footer class="footer-wrapper">
      <div class="footer-top">
        <img src="/img/logo_akva.jpg" alt="" class="footer-logo" />
        <a href="">Связаться с нами</a>
        <a href="">Заказать обратный звонок</a>
        <a href="">Публичная оферта</a>
        <a href="">Политика конфеденциальности</a>
      </div>
      <!-- <div class="footer-bottom">2021 &copy; АКВА</div> -->
    </footer>
  </div>
</template>

<style lang="scss">
@import "sass/button";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  background-image: url("/img/geometry.png");
  background-size: 256px 256px;
  font-family: "Roboto", sans-serif;
}

.header-wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  font-family: "Roboto", sans-serif;
  min-height: 15vh;
  background-color: #fff;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.12);
}

.header-top a {
  text-decoration: none;
  color: #3c3c3a;
}

.header-top a:hover {
  color: #2075f5;
}

.header-top {
  display: flex;
  justify-content: space-between;
  padding: 12px 40px;
  align-items: center;
  width: 100%;
  background-color: #cdd9e9;
  position: relative;
}

.header-top-right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.header-login-form {
  position: absolute;
  background-color: #fff;
  padding: 16px;
  border-radius: 16px;
  top: calc(100% + 16px);
  right: 32px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.23);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-direction: column;
  max-width: 15vw;
}

.header-login-form-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
}

.header-login-form input {
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  outline: none;
  border: none;
  background-color: #ebebeb;
}

.header-mid {
  width: 100%;
  padding: 12px 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-nav {
  width: 100%;
  padding: 12px 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 64px;
  position: relative;
}

.header-nav a {
  color: #3a3a3c;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
}

.header-nav a:hover {
  color: #2075f5;
}

.search {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.header-search {
  width: 80%;
  background-color: #ebebeb;
  border-radius: 16px;
  padding: 16px 18px;
  outline: none;
  border: none;
}

.header-search-button {
  background-color: #2075f5;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-phone {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
  border-radius: 16px;
}

.header-phone img {
  height: 24px;
}

.header-phone a {
  font-weight: 700;
  font-size: 24px;
  color: #000;
  text-decoration: none;
}

.header-cart {
  height: 32px;
}

.header-search-button img {
  width: 16px;
}

.header-logo {
  height: 9vh;
}

.hidden {
  display: none;
}

.footer-wrapper {
  background-color: #cfcfcf;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 8px 40px;
  gap: 8px;
}

.footer-logo {
  height: 8vh;
}

.footer-top a {
  text-decoration: none;
  font-size: 18px;
  color: #f5f5f5;
  background-color: #2075f5;
  padding: 8px 16px;
  border-radius: 8px;
}

.footer-top a:hover {
  background-color: #1d62ca;
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
