import { Actions, ActionTypes } from '../utils/actionTypes';
import { IFetchData, IPersonWithId } from '../utils/interfaces';

const ageCalculator = (died: number, born: number) => died - born;
const centryCalculator = (died: number) => Math.ceil(died / 100);
const idCalculator = (people: IPersonWithId[]) =>
  people[people.length - 1].id + 1;

const initialState: IFetchData = {
  people: [],
  fetching: false,
  loaded: false,
};

export default (state: IFetchData = initialState, action: Actions) => {
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
    case ActionTypes.SUBMIT_FORM:
      return {
        ...state,
        people: [
          ...state.people,
          {
            ...action.newPerson,
            id: idCalculator(state.people),
            age: ageCalculator(action.newPerson.died, action.newPerson.born),
            century: centryCalculator(action.newPerson.died),
          },
        ],
      };
    default:
      return state;
  }
};

//selector
export const getPeople = (state: IFetchData) => state.people;
export const getLoaded = (state: IFetchData) => state.loaded;
