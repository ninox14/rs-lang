import pages from 'data/pages';
import { ReactComponent as Logo } from 'assets/icons/rs-lang-logo.svg';
import { useState, FC, FormEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { logOut } from 'api/AuthService';

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Element>();
  const isLoggedIn = !!useAppSelector((state) => state.word.userId);
  const handleOpenNavMenu = (event: FormEvent): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (): void => {
    setAnchorElNav(undefined);
  };
  const loginBtnClass: string = isLoggedIn
    ? 'header__button header__button_brd header__button_red'
    : 'header__button header__button_brd';
  const getHeaderBtnUrl = (url: string, visibility?: boolean): string => {
    return visibility ?? true
      ? url === '/auth'
        ? isLoggedIn
          ? '#'
          : url
        : url
      : isLoggedIn
      ? url
      : '/auth';
  };
  return (
    <AppBar className="header">
      <Container className="header__container">
        <Toolbar className="header__wrapper header__toolbar" disableGutters>
          <Box className="header__logo">
            <Logo />
          </Box>
          <Box className="header__wrapper header__buttons header__buttons_desktop">
            {pages.map(
              ({ label, url, visibility }, index): ReactElement => (
                <Link
                  key={'headerLinkDesktop' + index}
                  to={getHeaderBtnUrl(url, visibility)}
                  className={url === '/auth' ? loginBtnClass : 'header__button'}
                  onClick={isLoggedIn && url === '/auth' ? logOut : undefined}
                >
                  {isLoggedIn && url === '/auth' ? 'Выйти' : label}
                </Link>
              )
            )}
          </Box>
          <Box className="header__wrapper header__buttons header__buttons_mobile">
            <Button
              key="Войти"
              className="button header__button header__button_brd"
              onClick={handleOpenNavMenu}
            >
              Меню
            </Button>
            <Menu
              id="menu-appbar"
              className="header__menu header-menu"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              onClick={handleCloseNavMenu}
            >
              {pages.map(
                ({ label, url, visibility }, index): ReactElement => (
                  <MenuItem
                    className={'header-menu__menu-item'}
                    key={'headerMenuItem' + index}
                  >
                    <Link
                      to={getHeaderBtnUrl(url, visibility)}
                      className="header-menu__button-wrapper"
                      onClick={
                        isLoggedIn && url === '/auth' ? logOut : undefined
                      }
                    >
                      <span
                        className={
                          url === '/auth' ? loginBtnClass : 'header__button'
                        }
                      >
                        {isLoggedIn && url === '/auth' ? 'Выйти' : label}
                      </span>
                    </Link>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
