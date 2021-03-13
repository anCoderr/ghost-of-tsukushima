import React from 'react'
// import PropTypes from 'prop-types'

import "./styles.scss"
import { useHistory } from 'react-router-dom'
import { Button } from '../../widgets'


function NotFound(props) {
  const history = useHistory()

  return (
    <div pageTitle={"Page not found"} links={[]}>
      <div className="page-not-found bg-gray-800">
        <div className="page-not-found-container">
          <div className="page-not-found-across">
            <div className="page-not-found-title text-gray-200">
              <i className="page-not-found-icon fas fa-dove text-gray-400 text-6xl"></i>
              <span className="page-not-found-404 text-gray-400 text-6xl">{"404"}</span>
            </div>
            <div className="page-not-found-title text-gray-500">{" Page not found!"}</div>
            <div className="text-3xl text-green-400 mb-6 mt-3">{" I guess u flew too far..."}</div>
            {/* <div className="page-not-found-subtitle mb-8 text-gray-200">{"We're ,sorry the page you requested could not be found. Please go back to our homepage."}</div> */}
            <Button action={e=>{e.preventDefault();history.push("/")}} icon="fa fa-home" size="lg">Home</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

NotFound.propTypes = {

}

export default NotFound
