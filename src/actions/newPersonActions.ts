import { ActionTypes, Actions } from '../utils/actionTypes';
import { IPerson } from '../utils/interfaces';

/*
 * action creators
 */
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
