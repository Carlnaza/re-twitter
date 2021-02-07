// Dependencies
import {
  Route, Switch, Redirect
} from 'react-router-dom'
import ProtectedPage from './utils/ProtectedPage.js'

// Pages
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import NotFound from './pages/404.js'
import EmailConfirm from './pages/EmailConfirm'


// Library

function App() {

  return (
    <div>
      {/* Navbar */}


      {/* Navbar end */}
      <Switch>
        {/* Main App Pages */}
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/home'>
          <ProtectedPage>
            <Home />
          </ProtectedPage>
        </Route>
        {/* End Main App Pages */}
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/verify/:token' component={EmailConfirm} />
        <Route component={NotFound} />

      </Switch>
      {/* Footer */}
    </div>
  );
}

export default App;
