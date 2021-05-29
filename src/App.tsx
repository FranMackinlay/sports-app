import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import MainScreenComponent from './components/MainScreenComponent/MainScreenComponent';
import TeamComponent from './components/TeamComponent/TeamComponent';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/team/:idTeam" component={TeamComponent} />
          <Route path="/" component={MainScreenComponent} />
        </Switch>
      </Router >
    </div>
  );
}

export default App;
