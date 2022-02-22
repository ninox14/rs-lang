import './Header.scss';
import PagesData from './PagesData';
import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { logOut } from 'api/AuthService';

const SignIn: FC = () => (
  <Link to={'/'} className="header__btn_signin" onClick={logOut}>
    Выйти
  </Link>
);

const LogOut: FC = () => (
  <Link to={'/auth'} className="header__btn_signin">
    Войти
  </Link>
);

const Header: FC = () => {
  const isLogged = !!useAppSelector((state) => state.word.userId);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header
      className="header"
      onClick={() => {
        if (isOpen) {
          setIsOpen(!isOpen);
        }
      }}
    >
      <Link to={'/'} className="header__logo"></Link>
      <div
        className={`header__overlay ${isOpen ? 'header__overlay_opened' : ''}`}
      ></div>
      <button
        className={`header__btn_menu ${
          isOpen ? 'header__btn_menu_opened' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Меню
      </button>
      <nav className={`header-nav ${isOpen ? 'header-nav_opened' : ''}`}>
        <ul className="nav-list">
          {PagesData.map((el) => (
            <li key={el.label} className="nav-list__item">
              <Link className="nav-list__link" to={el.url}>
                {el.label}
              </Link>
            </li>
          ))}
          {isLogged ? <SignIn /> : <LogOut />}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
