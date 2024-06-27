import { FC } from 'react';
import { Button } from 'src/ui-kit';
import cx from 'clsx';
import { IFilm, IPerson, IPlanet, ISpecie, IStarships, IVehicle } from 'src/api';
import './Card.scss';

export interface CardProps {
  data: IFilm | IPerson | IPlanet | ISpecie | IStarships | IVehicle;
  variant?: 'grid' | 'list';
}

export const Card: FC<CardProps> = ({ data, variant = 'grid' }) => {
  return (
    <div className={cx(`card card--${variant}`)}>
      <h2>{data.name || data.title}</h2>
      <div>
        <Button>Details</Button>
      </div>
    </div>
  );
};
