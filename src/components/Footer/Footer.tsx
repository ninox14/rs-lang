import { FC } from 'react';
import './Footer.scss';

export const Footer: FC = () => (
  <footer className="footer">
    <div className="footer__logo-wrapper">
      <a href="https://rs.school/js/" target="_blank" className="footer__logo"></a>
      <span className="footer__year">© 2022</span>
    </div>
    <div className="footer__links-wrapper">
      <a href="https://github.com/ninox14" target="_blank" className="footer__link">
        ninox14
      </a>
      <a href="https://github.com/roninpepe" target="_blank" className="footer__link">
        roninpepe
      </a>
      <a href="https://github.com/wunlei" target="_blank" className="footer__link">
        wunlei
      </a>
    </div>
  </footer>
);
