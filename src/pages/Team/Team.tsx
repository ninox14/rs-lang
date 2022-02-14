import AuthorCard from 'components/TeamPage/AuthorCard';
import { FC, ReactElement } from 'react';

interface Author {
  name?: string;
  nickname?: string;
  github?: string;
  picture?: string;
  role?: string;
}

type Authors = Author[];

const authors: Authors = [
  {
    name: 'Nick Kleshchev',
    nickname: 'ninox14',
    github: 'https://github.com/ninox14',
    picture: 'https://avatars.githubusercontent.com/u/31549851',
    role: '',
  },
  {
    name: 'Mikita Bely',
    nickname: 'roninpepe',
    github: 'https://github.com/roninpepe',
    picture: 'https://avatars.githubusercontent.com/u/89341250',
    role: '',
  },
  {
    name: 'Polina Sudareva',
    nickname: 'wunlei',
    github: 'https://github.com/wunlei',
    picture: 'https://avatars.githubusercontent.com/u/70818020',
    role: '',
  },
];

export const Team: FC = () => {
  return (
    <main className="page page_team team">
      <div className="team__container">
        <h1 className="page-header team__header">Над проектом работали</h1>
        <div className="team__cards-container">
          {authors.map((author: Author): ReactElement => (
            <AuthorCard
              name={author.name}
              nickname={author.nickname}
              github={author.github}
              picture={author.picture}
              role={author.role}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Team;
