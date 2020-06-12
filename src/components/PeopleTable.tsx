import React, { FC, useEffect, useState, useCallback } from 'react';
import { RootState } from '../utils/interfaces';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import Person from './Person';
import { connect, ConnectedProps } from 'react-redux';
import {
  getVisiblePeople,
  getSortBy,
  getSortOrder,
  getLoaded,
} from '../reducers';
import { setFilteredQuery, setSort } from '../actions';
import { useHistory, useLocation } from 'react-router-dom';

const PeopleTable: FC<ConnectedProps<typeof connector>> = ({
  people,
  sortByState,
  sortOrderState,
  loaded,
  setFilteredQuery,
  setSort,
}) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  useEffect(() => {
    if (!loaded) {
      // init
      setSort(sortBy || 'id', sortOrder || 'asc');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredQuery(query);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    searchParams.set('sortBy', sortByState);
    searchParams.set('sortOrder', sortOrderState ? 'desc' : 'asc');

    history.push({
      search: searchParams.toString(),
    });
    // eslint-disable-next-line
  }, [sortByState, sortOrderState]);

  const [visibleQuery, setVisibleQuery] = useState<string>(query);

  const updateQuery = (value: string) => {
    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    history.push({
      search: searchParams.toString(),
    });
  };

  const planQueryUpdate = useCallback(debounce(updateQuery, 1000), []);

  const handleQueryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVisibleQuery(value);
    planQueryUpdate(value);
  };

  const handleSortUpdate = (event: any) => {
    const th = event.target.closest('th');
    if (th) {
      const sortBy = th.innerText.toLowerCase();
      setSort(sortBy, '');
    }
  };

  const listOfHeads = [
    'id',
    'name',
    'sex',
    'born',
    'died',
    'mother',
    'father',
    'age',
    'century',
  ];
  const thList = listOfHeads.map((head, i) => (
    <th
      key={i}
      className={classNames({
        [`header-col_active_${sortOrderState ? 'desc' : 'asc'}`]:
          sortByState === head,
      })}
    >
      {head}
    </th>
  ));

  return (
    <>
      <h1>People Table</h1>
      <input
        type="search"
        placeholder="Search by name"
        className="input"
        value={visibleQuery}
        onChange={handleQueryUpdate}
      />
      <table className="people-table">
        <thead>
          <tr className="people-table__header-row" onClick={handleSortUpdate}>
            {thList}
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <Person key={person.id} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  people: getVisiblePeople(state),
  sortByState: getSortBy(state),
  sortOrderState: getSortOrder(state),
  loaded: getLoaded(state),
});

const mapDispatchToProps = {
  setFilteredQuery,
  setSort,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(PeopleTable);
