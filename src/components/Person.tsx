import React, { FC } from 'react';
import { IPersonWithId } from '../utils/interfaces';
import classNames from 'classnames';

import { useHistory, useLocation, useParams } from 'react-router-dom';

type Props = {
  person: IPersonWithId;
};

const Person: FC<Props> = ({ person }) => {
  const {
    id,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    age,
    century,
  } = person;

  const toParamsName = name.toLowerCase().replace(/ /g, '-');

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { personName } = useParams();

  const handlerParamsUpdate = () => {
    history.push({
      pathname: `/people/${toParamsName}`,
      search: searchParams.toString(),
    });
  };

  return (
    <tr
      className={classNames('people-table__person-row', {
        selected: personName === toParamsName,
      })}
      onClick={handlerParamsUpdate}
    >
      <td>{id}</td>
      <td className={classNames({ 'line-through': born < 1650 })}>{name}</td>
      <td className={sex === 'm' ? 'male' : 'female'}>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
      <td className={classNames({ green: age >= 65 })}>{age}</td>
      <td className={`lived-in-${century}`}>{century}</td>
    </tr>
  );
};

export default Person;
