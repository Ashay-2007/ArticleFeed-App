import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <h1>I am a login page.</h1>
          </Route>
          <Route path="/">
            <h1>I am a home page.</h1>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
