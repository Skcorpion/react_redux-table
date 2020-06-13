import { ActionTypes, Actions } from '../utils/actionTypes';

/*
 * action creators
 */
export const setFilteredQuery = (filteredQuery: string): Actions => ({
  type: ActionTypes.SET_FILTERED_QUERY,
  filteredQuery,
});
export const setSort = (sortBy: string, sortOrder: string): Actions => ({
  type: ActionTypes.SET_SORT,
  sortBy,
  sortOrder,
});
