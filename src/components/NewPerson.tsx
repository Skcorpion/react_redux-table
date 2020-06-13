import React, { FC, useState, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../utils/interfaces';
import debounce from 'lodash/debounce';
import {
  getNewPersonName,
  getRangeOfBirth,
  getRangeOfDeath,
  getVisibleParents,
  getSubmitedData,
} from '../reducers';
import {
  setNewPersonName,
  setNewPersonBirth,
  setNewPersonDeath,
  setNewPersonMother,
  setNewPersonFather,
  setNewPersonSex,
  submitForm,
} from '../actions';
import { useHistory } from 'react-router-dom';

const NewPerson: FC<ConnectedProps<typeof connector>> = ({
  newPersonName,
  rangeOfBirth,
  rangeOfDeath,
  parents,
  newPerson,
  setNewPersonName,
  setNewPersonBirth,
  setNewPersonDeath,
  setNewPersonMother,
  setNewPersonFather,
  setNewPersonSex,
  submitForm,
}) => {
  const history = useHistory();
  const [visiblePersonName, setVisiblePersonName] = useState<string>('');
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitForm(newPerson);
    history.goBack();
  };

  const updateName = useCallback(
    debounce((value: string) => {
      setNewPersonName(value);
    }, 1000),
    []
  );
  const handleForNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
      .replace(/[^a-zA-Z\s]/g, '')
      .replace(/^\s+/, '')
      .replace(/\s+/g, ' ');

    setVisiblePersonName(value);
    updateName(value);
  };

  const handleForBirthSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewPersonBirth(+event.target.value);
  };
  const handleForDeathSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewPersonDeath(+event.target.value);
  };
  const handleForMotherSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewPersonMother(event.target.value);
  };
  const handleForFatherSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewPersonFather(event.target.value);
  };
  const handleForSexSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPersonSex(event.target.value);
  };

  const rangeOfBirthList = rangeOfBirth.map((year) => (
    <option key={year}>{year}</option>
  ));
  const rangeOfDeathList = rangeOfDeath.map((year) => (
    <option key={year}>{year}</option>
  ));
  const mothersList = parents
    .filter((parent) => parent.sex === 'f')
    .map((mother) => <option key={mother.id}>{mother.name}</option>);
  const fathersList = parents
    .filter((parent) => parent.sex === 'm')
    .map((father) => <option key={father.id}>{father.name}</option>);

  return (
    <>
      <h1>New Person</h1>
      <form className="new-person-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter the name"
          maxLength={30}
          value={visiblePersonName}
          onChange={handleForNameInput}
          required
        />
        <div className="new-person-form__field">
          <select
            className="input new-person-form__input-select"
            onChange={handleForBirthSelect}
            required
          >
            <option value="">Birth Year</option>
            {rangeOfBirthList}
          </select>
          <select
            className="input new-person-form__input-select"
            onChange={handleForDeathSelect}
            required
          >
            <option value="">Death Year</option>
            {rangeOfDeathList}
          </select>
        </div>
        <div className="new-person-form__field">
          <select
            className="input new-person-form__input-select"
            onChange={handleForMotherSelect}
            required
          >
            <option value="">Choose mother</option>
            {mothersList}
          </select>
          <select
            className="input new-person-form__input-select"
            onChange={handleForFatherSelect}
            required
          >
            <option value="">Choose father</option>
            {fathersList}
          </select>
        </div>
        <div className="new-person-form__field new-person-form__field-sex">
          <label htmlFor="f">
            <input
              type="radio"
              className="new-person-form__input-radio"
              id="f"
              name="sex"
              value="f"
              onChange={handleForSexSelect}
              required
            />
            female
          </label>
          <label htmlFor="m">
            <input
              type="radio"
              className="new-person-form__input-radio"
              id="m"
              name="sex"
              value="m"
              onChange={handleForSexSelect}
              required
            />
            male
          </label>
        </div>
        <button type="submit" className="button new-person-form__button">
          Add
        </button>
      </form>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  newPersonName: getNewPersonName(state),
  rangeOfBirth: getRangeOfBirth(state),
  rangeOfDeath: getRangeOfDeath(state),
  parents: getVisibleParents(state),
  newPerson: getSubmitedData(state),
});

const mapDispatchToProps = {
  setNewPersonName,
  setNewPersonBirth,
  setNewPersonDeath,
  setNewPersonMother,
  setNewPersonFather,
  setNewPersonSex,
  submitForm,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(NewPerson);
