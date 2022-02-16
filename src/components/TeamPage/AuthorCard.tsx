import { FC } from 'react';

import { ReactComponent as Github } from 'assets/icons/github.svg';

interface Author {
  name?: string;
  nickname?: string;
  github?: string;
  picture?: string;
  role?: string;
}

const AuthorCard: FC<Author> = (props) => {
  const { name, nickname, github, picture, role } = props;

  return (
    <div className="team__author-card author-card">
      <img
        src={picture}
        alt={`${nickname}’s profile picture.`}
        className="author-card__avatar"
      />
      <a href={github} className="author-card__github">
        <Github className="author-card__github-icon" /> {name}
      </a>
      <div className="author-card__role">{role}</div>
    </div>
  );
};

export default AuthorCard;
