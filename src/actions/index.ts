import { Actions, ActionTypes } from '../utils/actionTypes';
import { IPerson } from '../utils/interfaces';
import { Dispatch } from 'react';
import { getPeopleFromServer } from '../api';

/*
 * action creators
 */
const requestingData = (): Actions => ({
  type: ActionTypes.REQUESTING_DATA,
});
const receivedData = (people: IPerson[]): Actions => ({
  type: ActionTypes.RECEIVED_DATA,
  people,
});
export const setFilteredQuery = (filteredQuery: string): Actions => ({
  type: ActionTypes.SET_FILTERED_QUERY,
  filteredQuery,
});
export const setSort = (sortBy: string, sortOrder: string): Actions => ({
  type: ActionTypes.SET_SORT,
  sortBy,
  sortOrder,
});
export const setNewPersonName = (newPersonName: string): Actions => ({
  type: ActionTypes.SET_NEW_PERSON_NAME,
  newPersonName,
});
export const setNewPersonBirth = (newPersonBirth: number): Actions => ({
  type: ActionTypes.SET_NEW_PERSON_BIRTH,
  newPersonBirth,
});
export const setNewPersonDeath = (newPersonDeath: number): Actions => ({
  type: ActionTypes.SET_NEW_PERSON_DEATH,
  newPersonDeath,
});
export const setNewPersonMother = (newPersonMother: string): Actions => ({
  type: ActionTypes.SET_NEW_PERSON_MOTHER,
  newPersonMother,
});
export const setNewPersonFather = (newPersonFather: string): Actions => ({
  type: ActionTypes.SET_NEW_PERSON_FATHER,
  newPersonFather,
});
export const setNewPersonSex = (newPersonSex: string): Actions => ({
  type: ActionTypes.SET_NEW_PERSON_SEX,
  newPersonSex,
});
export const submitForm = (newPerson: IPerson): Actions => ({
  type: ActionTypes.SUBMIT_FORM,
  newPerson,
});

export const loadData = () => {
  return async function (dispatch: Dispatch<Actions>) {
    dispatch(requestingData());

    const people = await getPeopleFromServer();
    dispatch(receivedData(people));
  };
};
