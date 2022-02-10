import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState, FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import pages from '../../data/pages';
import session from '../../data/session';
import { ReactComponent as Logo } from '../../assets/icons/rs-lang-logo.svg';
import './Header.scss';

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Element>();
  const handleOpenNavMenu = (event: FormEvent): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (): void => {
    setAnchorElNav(undefined);
  };
  const loginBtnClass: string = session.loggedIn
    ? 'header-button header-button_brd header-button_brd-wrn'
    : 'header-button header-button_brd';

  return (
    <AppBar className="header" position="static">
      <Container maxWidth="xl" className="header-container">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, mr: 2, display: 'flex' }}
          >
            <Logo />
          </Typography>
          <Box
            sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}
            className="header-buttons header-buttons_desktop"
          >
            {pages.map(({ label, url, visibility }) => (
              <Link
                to={session.loggedIn && url === '/auth' ? '#' : url}
                className={
                  visibility ?? true
                    ? url === '/auth'
                      ? loginBtnClass
                      : 'header-button'
                    : 'header-button header-button_hidden'
                }
                onClick={handleCloseNavMenu}
              >
                {session.loggedIn && url === '/auth' ? 'Выйти' : label}
              </Link>
            ))}
          </Box>
          <Box
            sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}
            className="header-buttons header-buttons_mobile"
          >
            <Button
              key="Войти"
              className="header-button header-button_brd"
              sx={{ my: 2, display: 'block' }}
              onClick={handleOpenNavMenu}
            >
              Меню
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              onClick={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ label, url, visibility }) => (
                <MenuItem
                  className={visibility ?? true ? '' : 'header-button_hidden'}
                >
                  <Link
                    to={session.loggedIn && url === '/auth' ? '/logout' : url}
                    className="header-button"
                  >
                    <span
                      className={
                        url === '/auth' ? loginBtnClass : 'header-button'
                      }
                    >
                      {session.loggedIn && url === '/auth' ? 'Выйти' : label}
                    </span>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
