import React from 'react'
import '../App.css'

const STYLES = ['btn--primary', 'btn--outline', 'btn--remove', 'btn--add']

const SIZES = ['btn--medium']

const COLORS = ['primary', 'red', 'green']

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor
}) => {

  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  const checkButtonColor = COLORS.includes(buttonColor) ? buttonColor : null

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
