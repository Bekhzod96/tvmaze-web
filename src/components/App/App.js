import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Show from '../Show/Show';
import NotFound from '../elements/NotFound/NotFound';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:showId" component={Show} exact />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
)

export default App;