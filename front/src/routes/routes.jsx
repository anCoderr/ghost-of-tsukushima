import React from 'react'
// import PropTypes from 'prop-types'
import {NotFound} from '../pages/index.js'
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom'
import { Logo } from '../components/index.js'

function Routes(props) {
  return (
    <div className="">
    <nav className="navbar is-transparent" role='navigation' aria-label="main-navigation">
      <div className="navbar-start cursor-pointer">
        <div className="navbar-item bg-gray-400 bg-opacity-10">
          <i className="fa fa-bars text-2xl m-2 text-indigo-400 hover:text-indigo-500"/>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item bg-gray-400 bg-opacity-10" >
          <Logo/>
        </div>
      </div>
    </nav>
    <Router>
      <Switch>
        <Route path="/home" exact>Home</Route>
        <Redirect from="/" to="/home" exact/>
        <Route default component={NotFound}/>
      </Switch>
    </Router>
    </div>
  )
}

Routes.propTypes = {

}

export default Routes

