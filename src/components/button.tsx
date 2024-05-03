import React from 'react'

function Button({text, bgcolor, txtcolor }:any) {
  return (
    <button className={`${bgcolor} ${txtcolor} font-extrabold text-xs uppercase py-2 px-4 rounded-lg`}>{text}</button>
  )
}

export default Button