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

export const loadData = () => {
  return async function (dispatch: Dispatch<Actions>) {
    dispatch(requestingData());

    const people = await getPeopleFromServer();
    dispatch(receivedData(people));
  };
};
