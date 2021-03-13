import React from 'react'
import PropTypes from 'prop-types'
import "./styles.scss"

const getColor = type => {
  let color = "bg-gray-100", textColor = "bg-gray-800"
  switch(type){
    case 'primary': 
      color = "bg-green-400 hover:bg-green-300"
      textColor = 'text-gray-900'
      break
    case 'secondary': 
      color = "bg-gray-400 hover:bg-gray-300"
      textColor = 'text-gray-900'
      break
    case 'tertiary':
      color = "bg-blue-400 hover:bg- blue-300"
      textColor = 'text-gray-900'
      break
    default:
      break   
  }
  return {color, textColor}
}

const getSize = type => {
  let btnSize = "text-base", btnTextSize = "bg-gray-800"
  switch(type){
    case 'lg': 
      btnSize = "px-6 py-3"
      btnTextSize = 'text-xl'
      break
    case 'md': 
      btnSize = "px-5 py-3"
      btnTextSize = 'text-base'
      break
    case 'sm':
      btnSize = "px-2 py-1"
      btnTextSize = 'text-sm'
      break
    default:
      break   
  }
  return {btnSize, btnTextSize}
}
function Button(props) {
  const {type="primary", text="", size='md', action=e=>{e.preventDefalt()}, icon=null} = props
  const {color, textColor} = getColor(type), {btnSize, btnTextSize} = getSize(size)
  return (
    <button onClick={action} className={`num-button ${btnTextSize} ${btnSize} ${textColor} ${color}`}>
      {icon? <i className={`px-2 ${icon} ${btnTextSize} text-gray-900`}></i>: null}
      <div className={`${textColor} text-${size} `}>{text}</div>
      {props.children}
    </button>
  )
}

Button.propTypes = {
  capitalize: PropTypes.bool,
  icon: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  uppercase: PropTypes.bool,
  action: PropTypes.func
}

export default Button

