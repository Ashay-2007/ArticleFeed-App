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
import NewArticle from './NewArticle';
import CategoryArticles from './CategoryArticles';
import EditPage from './EditPage';
import Setting from './Setting';


function App() {

  const [{user}, dispatch] = useStateValue();

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

          {
            user ? (
              <Switch>
                <Route path="/dashboard">
                  <Header/>
                  <Dashboard/>
                </Route>
                <Route path="/new_article">
                  <Header/>
                  <NewArticle/>
                </Route>
                <Route path="/edit_article">
                  <Header/>
                  <EditPage/>
                </Route>
                <Route path="/setting">
                  <Header/>
                  <Setting/>
                </Route>
                <Route path="/sports">
                  <Header/>
                  <CategoryArticles category="sports"/>
                </Route>
                <Route path="/politics">
                  <Header/>
                  <CategoryArticles category="politics"/>
                </Route>
                <Route path="/technology">
                  <Header/>
                  <CategoryArticles category="technology"/>
                </Route>
                <Route path="/space">
                  <Header/>
                  <CategoryArticles category="space"/>
                </Route>
                <Route path="/travel">
                  <Header/>
                  <CategoryArticles category="travel"/>
                </Route>
                <Route path="/fashion">
                  <Header/>
                  <CategoryArticles category="fashion"/>
                </Route>
                <Route path="/">
                  <Header/>
                  <Home/>
                </Route>
              
              </Switch>
                       
            ) : (
              
              <div>
                <Switch>
                <Route path="/login">
                  <Login/>
                </Route>
                <Route path="/register">
                  <Register/>
                </Route>
                <Route path="/">
                  <Header/>
                  <Home/>
                </Route>
                </Switch>
                
              </div>
              
            )
          }
          
      </div>
    </Router>
    
  );
}

export default App;
