import { loadData } from './fetchDataActions';
import { setSort, setFilteredQuery } from './sortActions';
import {
  setNewPersonName,
  setNewPersonBirth,
  setNewPersonDeath,
  setNewPersonFather,
  setNewPersonMother,
  setNewPersonSex,
  submitForm,
} from './newPersonActions';

export {
  // -------- Fetch data actions --------
  loadData,
  // -------- Sort actions --------
  setSort,
  setFilteredQuery,
  // -------- New person actions --------
  setNewPersonName,
  setNewPersonBirth,
  setNewPersonDeath,
  setNewPersonFather,
  setNewPersonMother,
  setNewPersonSex,
  submitForm,
};
