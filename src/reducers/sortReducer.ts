import { ISort } from '../utils/interfaces';
import { Actions, ActionTypes } from '../utils/actionTypes';

const initialState = {
  filteredQuery: '',
  sortBy: 'id',
  sortOrder: false,
};

export default (state: ISort = initialState, action: Actions) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

//selectors
export const getFilteredQuery = (state: ISort) => state.filteredQuery;
export const getSortBy = (state: ISort) => state.sortBy;
export const getSortOrder = (state: ISort) => state.sortOrder;
