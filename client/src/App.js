// Dependencies
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import ProtectedPage from './ProtectedPage.js'

// Pages
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import NotFound from './pages/404.js'
import EmailConfirm from './pages/EmailConfirm'

// Library

function App() {

  return (
    <Router>
      <div>
        {/* Navbar */}

        {/* Navbar end */}
        <Switch>
          <Route path='/emailconfirm' component={EmailConfirm} />
          <Route exact path='/home'>
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          </Route>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route component={NotFound} />
          
        </Switch>
        {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
