export interface IPerson {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
}

export interface IPersonWithId extends IPerson {
  id: number;
  century: number;
  age: number;
}

export interface ISort {
  filteredQuery: string;
  sortBy: string;
  sortOrder: boolean;
}

export interface IFetchData {
  people: IPersonWithId[];
  fetching: boolean;
  loaded: boolean;
}

export interface INewPerson {
  newPersonName: string;
  newPersonBirth: number | null;
  newPersonDeath: number | null;
  newPersonMother: string | null;
  newPersonFather: string | null;
  newPersonSex: string | null;
  rangeOfBirth: number[];
  rangeOfDeath: number[];
}

export interface RootState {
  sortReducer: ISort;
  fetchData: IFetchData;
  newPerson: INewPerson;
}
