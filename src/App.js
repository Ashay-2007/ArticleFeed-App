import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';


function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, [])

  
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/dashboard">
            <Header/>
            <Dashboard/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
