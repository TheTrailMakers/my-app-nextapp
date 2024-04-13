import React from 'react'

function Button({text, bgcolor, txtcolor }:any) {
  return (
    <button className={`${bgcolor} ${txtcolor} font-bold text-xs uppercase py-1 px-4 rounded-lg`}>{text}</button>
  )
}

export default Button