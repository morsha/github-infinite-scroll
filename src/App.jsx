import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:searchTerm">
          <Main />
        </Route>
        <Route>
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
