import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:searchTerm">
          <Main />
        </Route>
        <Route>
          <Main />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
