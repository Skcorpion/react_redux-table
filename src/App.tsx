import React, { FC, useEffect } from 'react';
import './App.css';
import { Route, NavLink, useLocation } from 'react-router-dom';
import PeopleTable from './components/PeopleTable';
import NewPerson from './components/NewPerson';
import { loadData } from './actions';
import { getLoaded } from './reducers';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from './utils/interfaces';

const App: FC<ConnectedProps<typeof connector>> = ({ loaded, loadData }) => {
  const location = useLocation();
  useEffect(() => {
    if (!loaded) {
      const loadDataHandler = async () => {
        // load data
        await loadData();
      };
      loadDataHandler();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <NavLink
        className="navigation__link"
        activeClassName="navigation__link_active"
        exact
        to="/people"
      >
        People Table
      </NavLink>
      <Route
        path="/people/:personName?"
        render={() => (
          <>
            <Route path="/people/new" component={NewPerson} />
            {location.pathname !== '/people/new' && (
              <>
                <NavLink
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                  exact
                  to="/people/new"
                >
                  New Person
                </NavLink>

                <PeopleTable />
              </>
            )}
          </>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loaded: getLoaded(state),
});

const mapDispatchToProps = {
  loadData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App);
