import React from 'react'
import style from './styles.less'
export const LoginButton = () => {
  return (
    <div className={`${style.postion} ${style.buttonClass}`}>
      <div className={style.loginText}>Login</div>
    </div>
  )
}
