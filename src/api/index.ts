import { IPerson } from '../utils/interfaces';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getPeopleFromServer = async () => {
  return getData<IPerson[]>(`${API_URL}`);
};
