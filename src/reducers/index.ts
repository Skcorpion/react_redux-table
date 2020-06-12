import { RootState, IPersonWithId } from '../utils/interfaces';
import { createSelector } from 'reselect';
import { SortingTypes, Actions, ActionTypes } from '../utils/actionTypes';

//selector
export const getPeople = (state: RootState) => state.people;
export const getFilteredQuery = (state: RootState) => state.filteredQuery;
export const getSortBy = (state: RootState) => state.sortBy;
export const getSortOrder = (state: RootState) => state.sortOrder;
export const getLoaded = (state: RootState) => state.loaded;

export const getNewPersonName = (state: RootState) => state.newPersonName;
export const getNewPersonBirth = (state: RootState) => state.newPersonBirth;
export const getRangeOfBirth = (state: RootState) => state.rangeOfBirth;
export const getRangeOfDeath = (state: RootState) => state.rangeOfDeath;

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
    console.log('getParents');

    const birth = newPersonBirth || 0;
    return [
      ...people.filter(
        (person) => person.born + 12 < birth && person.died > birth
      ),
    ];
  }
);

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const ageCalculator = (died: number, born: number) => died - born;
const centryCalculator = (died: number) => Math.ceil(died / 100);
const idCalculator = (people: IPersonWithId[]) =>
  people[people.length - 1].id + 1;

const initialState: RootState = {
  people: [],
  fetching: false,
  loaded: false,
  filteredQuery: '',
  sortBy: 'id',
  sortOrder: false,
  newPersonName: '',
  newPersonBirth: null,
  newPersonDeath: null,
  newPersonMother: null,
  newPersonFather: null,
  newPersonSex: null,
  rangeOfBirth: range(1700, new Date().getFullYear(), 1),
  rangeOfDeath: [],
};

export const rootReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.REQUESTING_DATA:
      return { ...state, fetching: true };

    case ActionTypes.RECEIVED_DATA:
      return {
        ...state,
        people: [...action.people].map((person, i) => {
          return {
            ...person,
            id: i + 1,
            age: ageCalculator(person.died, person.born),
            century: centryCalculator(person.died),
          };
        }),
        fetching: false,
        loaded: true,
      };

    case ActionTypes.SET_FILTERED_QUERY:
      return { ...state, filteredQuery: action.filteredQuery };

    case ActionTypes.SET_SORT:
      if (action.sortOrder) {
        return {
          ...state,
          sortBy: action.sortBy,
          sortOrder: action.sortOrder === 'asc' ? false : true,
        };
      }

      return {
        ...state,
        sortBy: action.sortBy,
        sortOrder: state.sortBy === action.sortBy ? !state.sortOrder : false,
      };

    case ActionTypes.SET_NEW_PERSON_NAME:
      return { ...state, newPersonName: action.newPersonName };

    case ActionTypes.SET_NEW_PERSON_BIRTH:
      const birth = action.newPersonBirth;
      return {
        ...state,
        newPersonBirth: birth || null,
        rangeOfDeath: birth
          ? [...state.rangeOfBirth.slice(birth - 1700, birth - 1550)]
          : [],
      };

    case ActionTypes.SET_NEW_PERSON_DEATH:
      return {
        ...state,
        newPersonDeath: action.newPersonDeath || null,
      };

    case ActionTypes.SET_NEW_PERSON_MOTHER:
      return {
        ...state,
        newPersonMother: action.newPersonMother || null,
      };

    case ActionTypes.SET_NEW_PERSON_FATHER:
      return {
        ...state,
        newPersonFather: action.newPersonFather || null,
      };

    case ActionTypes.SET_NEW_PERSON_SEX:
      return {
        ...state,
        newPersonSex: action.newPersonSex || null,
      };

    case ActionTypes.SUBMIT_FORM:
      return {
        ...state,
        people: [
          ...state.people,
          {
            name: state.newPersonName,
            sex: state.newPersonSex!,
            born: state.newPersonBirth!,
            died: state.newPersonDeath!,
            fatherName: state.newPersonFather,
            motherName: state.newPersonMother,
            id: idCalculator(state.people),
            age: ageCalculator(state.newPersonDeath!, state.newPersonBirth!),
            century: centryCalculator(state.newPersonDeath!),
          },
        ],
        newPersonName: '',
        newPersonSex: null,
        newPersonBirth: null,
        newPersonDeath: null,
        newPersonFather: null,
        newPersonMother: null,
      };

    default:
      return state;
  }
};
