import { FC } from 'react';
import { ReactComponent as RSSLogo } from 'assets/icons/rs-school-logo.svg';
import authors from 'data/team';
import { Author } from 'types/rs-lang';
import FooterLink from './FooterLink';

const Footer: FC = () => (
  <footer className="footer">
    <div className="footer__wrapper">
      <a
        href="https://rs.school/js/"
        target="_blank"
        className="footer__logo-link"
      >
        <RSSLogo className="footer__logo" />
      </a>
      <span className="footer__year">© 2022</span>
    </div>
    <div className="footer__wrapper">
      {authors.map((author: Author) => (
        <FooterLink
          nickname={author.nickname}
          github={author.github}
          name={author.name}
        />
      ))}
    </div>
  </footer>
);

export default Footer;
