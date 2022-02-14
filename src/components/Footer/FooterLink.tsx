import { ReactElement } from 'react';
import { Author } from 'types/rs-lang';

const FooterLink = ({ github, name, nickname }: Author): ReactElement => (
  <a
    href={github}
    title={name}
    className="footer__link"
    target="_blank"
    rel="noopener noreferrer"
  >
    {nickname}
  </a>
);

export default FooterLink;
