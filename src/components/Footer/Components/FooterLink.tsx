import { FC } from 'react';

interface FooterLinkInterface {
  link: string;
  name: string;
}

export const FooterLink: FC<FooterLinkInterface> = ({ link, name }) => (
  <a
    href={link}
    target="_blank"
    className="team-list__link"
    rel="noopener noreferrer"
  >
    {name}
  </a>
);
