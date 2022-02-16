import { FC } from 'react';
import TeamData from './Components/TeamData';
import FooterLink from './Components/FooterLink';
import './Footer.scss';

const Footer: FC = () => (
  <footer className="footer">
    <div className="footer__logo-wrapper">
      <a
        href="https://rs.school/js/"
        target="_blank"
        className="footer__logo"
        rel="noopener noreferrer"
      ></a>
      <span className="footer__year">© 2022</span>
    </div>
    <ul className="team-list">
      {TeamData.map((el) => (
        <FooterLink key={el.name} link={el.link} name={el.name} />
      ))}
    </ul>
  </footer>
);

export default Footer;
