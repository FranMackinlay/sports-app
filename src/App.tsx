import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import MainScreenComponent from './components/MainScreenComponent/MainScreenComponent';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          {/* <Route path="/login" component={LoginComponent} /> */}
          <Route path="/" component={MainScreenComponent} />
        </Switch>
      </Router >
    </div>
  );
}

export default App;
