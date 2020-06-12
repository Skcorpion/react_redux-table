import { IPerson } from './interfaces';

/*
 * action types
 */
export enum ActionTypes {
  REQUESTING_DATA = 'REQUESTING_DATA',
  RECEIVED_DATA = 'RECEIVED_DATA',
  SET_FILTERED_QUERY = 'SET_FILTERED_QUERY',
  SET_SORT = 'SET_SORT',
  SET_NEW_PERSON_NAME = 'SET_NEW_PERSON_NAME',
  SET_NEW_PERSON_BIRTH = 'SET_NEW_PERSON_BIRTH',
  SET_NEW_PERSON_DEATH = 'SET_NEW_PERSON_DEATH',
  SET_NEW_PERSON_MOTHER = 'SET_NEW_PERSON_MOTHER',
  SET_NEW_PERSON_FATHER = 'SET_NEW_PERSON_FATHER',
  SET_NEW_PERSON_SEX = 'SET_NEW_PERSON_SEX',
  SUBMIT_FORM = 'SUBMIT_FORM',
}

/*
 * other constants
 */
export enum SortingTypes {
  SORT_BY_ID = 'id',
  SORT_BY_BORN = 'born',
  SORT_BY_DIED = 'died',
  SORT_BY_AGE = 'age',
  SORT_BY_CENTURY = 'century',
  SORT_BY_NAME = 'name',
  SORT_BY_SEX = 'sex',
  SORT_BY_FATHER = 'fatherName',
  SORT_BY_MOTHER = 'motherName',
}

/*
 * actions
 */
interface RequestingDataAction {
  type: typeof ActionTypes.REQUESTING_DATA;
}
interface ReceivedDataAction {
  type: typeof ActionTypes.RECEIVED_DATA;
  people: IPerson[];
}
interface SetFilteredQueryAction {
  type: typeof ActionTypes.SET_FILTERED_QUERY;
  filteredQuery: string;
}
interface SetSortAction {
  type: typeof ActionTypes.SET_SORT;
  sortBy: string;
  sortOrder: string;
}

interface SetNewPersonNameAction {
  type: typeof ActionTypes.SET_NEW_PERSON_NAME;
  newPersonName: string;
}
interface SetNewPersonBirthAction {
  type: typeof ActionTypes.SET_NEW_PERSON_BIRTH;
  newPersonBirth: number;
}
interface SetNewPersonDeathAction {
  type: typeof ActionTypes.SET_NEW_PERSON_DEATH;
  newPersonDeath: number;
}
interface SetNewPersonMotherAction {
  type: typeof ActionTypes.SET_NEW_PERSON_MOTHER;
  newPersonMother: string;
}
interface SetNewPersonFatherAction {
  type: typeof ActionTypes.SET_NEW_PERSON_FATHER;
  newPersonFather: string;
}
interface SetNewPersonSexAction {
  type: typeof ActionTypes.SET_NEW_PERSON_SEX;
  newPersonSex: string;
}
interface SubmitFormAction {
  type: typeof ActionTypes.SUBMIT_FORM;
  newPerson: IPerson;
}

export type Actions =
  | RequestingDataAction
  | ReceivedDataAction
  | SetFilteredQueryAction
  | SetSortAction
  | SetNewPersonNameAction
  | SetNewPersonBirthAction
  | SetNewPersonDeathAction
  | SetNewPersonMotherAction
  | SetNewPersonFatherAction
  | SetNewPersonSexAction
  | SubmitFormAction;
