import AuthorCard from 'components/TeamPage/AuthorCard';
import authors from 'data/team';
import { FC, ReactElement } from 'react';
import { Author } from 'types/rs-lang';

export const Team: FC = () => {
  return (
    <main className="page page_team team">
      <div className="team__container">
        <h1 className="page__header team__header">Над проектом работали</h1>
        <div className="team__cards-container">
          {authors.map(
            (author: Author): ReactElement => (
              <AuthorCard
                name={author.name}
                nickname={author.nickname}
                github={author.github}
                picture={author.picture}
                role={author.role}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default Team;
