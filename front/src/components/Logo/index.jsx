import React from 'react'
import PropTypes from 'prop-types'
import './styels.scss'

function Logo(props) {
  return (
    <div className="flex nowrap justify-center items-center">
      <img src="https://image.flaticon.com/icons/png/512/1729/1729953.png" className="h-8 w-7 bg-gray-300 mx-2" alt="Logo" />
      <span className="uppercase text-2xl logo">
        <span className="text-indigo-400">Aurora</span>&nbsp;
        <span className='text-yellow-400'>Borealis</span> 
      </span>
    </div>
  )
}

Logo.propTypes = {
  size: PropTypes.string
}

export default Logo

