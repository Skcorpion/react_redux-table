import { RootState } from '../utils/interfaces';
import { createSelector } from 'reselect';
import { SortingTypes } from '../utils/actionTypes';
import sortReducer, * as fromSort from './sortReducer';
import fetchData, * as fromFetchData from './fetchData';
import newPerson, * as fromNewPerson from './newPerson';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  fetchData,
  sortReducer,
  newPerson,
});

//selector
export const getPeople = (state: RootState) =>
  fromFetchData.getPeople(state.fetchData);
export const getLoaded = (state: RootState) =>
  fromFetchData.getLoaded(state.fetchData);

export const getFilteredQuery = (state: RootState) =>
  fromSort.getFilteredQuery(state.sortReducer);
export const getSortBy = (state: RootState) =>
  fromSort.getSortBy(state.sortReducer);
export const getSortOrder = (state: RootState) =>
  fromSort.getSortOrder(state.sortReducer);

export const getNewPersonName = (state: RootState) =>
  fromNewPerson.getNewPersonName(state.newPerson);
export const getNewPersonBirth = (state: RootState) =>
  fromNewPerson.getNewPersonBirth(state.newPerson);
export const getRangeOfBirth = (state: RootState) =>
  fromNewPerson.getRangeOfBirth(state.newPerson);
export const getRangeOfDeath = (state: RootState) =>
  fromNewPerson.getRangeOfDeath(state.newPerson);
export const getSubmitedData = (state: RootState) =>
  fromNewPerson.getSubmitedData(state.newPerson);

export const getVisiblePeople = createSelector(
  [getPeople, getFilteredQuery, getSortBy, getSortOrder],
  (people, filteredQuery, sortBy, sortOrder) => {
    const pattern = new RegExp(filteredQuery, 'i');
    const visiblePeople = [
      ...people.filter(
        (person) =>
          pattern.test(person.name) ||
          pattern.test(person.motherName || '') ||
          pattern.test(person.fatherName || '')
      ),
    ];

    switch (sortBy) {
      case SortingTypes.SORT_BY_ID:
      case SortingTypes.SORT_BY_BORN:
      case SortingTypes.SORT_BY_DIED:
      case SortingTypes.SORT_BY_AGE:
      case SortingTypes.SORT_BY_CENTURY:
        visiblePeople.sort((a, b) => a[sortBy] - b[sortBy]);
        break;

      case SortingTypes.SORT_BY_NAME:
      case SortingTypes.SORT_BY_SEX:
        visiblePeople.sort((a, b) =>
          (a[sortBy] || '').localeCompare(b[sortBy] || '')
        );
        break;

      case 'father':
        visiblePeople.sort((a, b) =>
          (a[SortingTypes.SORT_BY_FATHER] || '').localeCompare(
            b[SortingTypes.SORT_BY_FATHER] || ''
          )
        );
        break;

      case 'mother':
        visiblePeople.sort((a, b) =>
          (a[SortingTypes.SORT_BY_MOTHER] || '').localeCompare(
            b[SortingTypes.SORT_BY_MOTHER] || ''
          )
        );
        break;

      default:
        break;
    }

    if (sortOrder) {
      visiblePeople.reverse();
    }

    return visiblePeople;
  }
);

export const getVisibleParents = createSelector(
  [getPeople, getNewPersonBirth],
  (people, newPersonBirth) => {
    const birth = newPersonBirth || 0;
    return [
      ...people.filter(
        (person) => person.born + 12 < birth && person.died > birth
      ),
    ];
  }
);
