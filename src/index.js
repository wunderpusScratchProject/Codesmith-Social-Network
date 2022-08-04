import React from 'react';
import App from './App.jsx';
import { StoreProvider } from 'easy-peasy';
import { store } from './store';
import * as ReactDOM from 'react-dom';
import MainContainer from './containers/MainContainer.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { SetCohort } from './components/SetCohort.jsx';
import { HomePage } from './components/HomePage.jsx';
import { ResidentsContainer } from './containers/ResidentsContainer.jsx';
import { OrganizationContainer } from './containers/OrganizationContainer.jsx';
import { CohortContainer } from './containers/CohortContainer.jsx';
import { UserContainer } from './containers/UserContainer.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './containers/NavBarContainer.jsx';
import { SearchContainer } from './containers/SearchContainer.jsx';
// uncomment so that webpack can bundle styles
import styles from './App.scss';

// required by react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// render(
//   <App />,
//   document.getElementById('root')
// );
const rootElement = document.getElementById('root');
ReactDOM.render(
  <StoreProvider store={store}>
    {/* <App /> */}
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/setCohort" element={<SetCohort />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/residents" element={<ResidentsContainer />} />
        <Route path="/organization" element={<OrganizationContainer />} />
        <Route path="/cohort" element={<CohortContainer />} />
        <Route path="/user" element={<UserContainer />} />
        <Route path="/search" element={<SearchContainer />} />
      </Routes>
    </HashRouter>
  </StoreProvider>,
  rootElement
);
