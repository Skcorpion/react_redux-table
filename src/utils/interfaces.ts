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

export interface RootState {
  people: IPersonWithId[];
  fetching: boolean;
  loaded: boolean;
  filteredQuery: string;
  sortBy: string;
  sortOrder: boolean;
  newPersonName: string;
  newPersonBirth: number | null;
  newPersonDeath: number | null;
  newPersonMother: string | null;
  newPersonFather: string | null;
  newPersonSex: string | null;
  rangeOfBirth: number[];
  rangeOfDeath: number[];
}
