import { Actions, ActionTypes } from '../utils/actionTypes';
import { INewPerson } from '../utils/interfaces';

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const initialState: INewPerson = {
  newPersonName: '',
  newPersonBirth: null,
  newPersonDeath: null,
  newPersonMother: null,
  newPersonFather: null,
  newPersonSex: null,
  rangeOfBirth: range(1700, new Date().getFullYear(), 1),
  rangeOfDeath: [],
};

export default (state = initialState, action: Actions) => {
  switch (action.type) {
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

//selectors

export const getSubmitedData = (state: INewPerson) => ({
  name: state.newPersonName,
  sex: state.newPersonSex!,
  born: state.newPersonBirth!,
  died: state.newPersonDeath!,
  fatherName: state.newPersonFather,
  motherName: state.newPersonMother,
});
export const getNewPersonBirth = (state: INewPerson) => state.newPersonBirth;
export const getRangeOfBirth = (state: INewPerson) => state.rangeOfBirth;
export const getRangeOfDeath = (state: INewPerson) => state.rangeOfDeath;
