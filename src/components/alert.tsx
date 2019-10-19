import React from 'react'

type AlertType = 'success' | 'error' | 'info'

type AlertProps = {
  text: string
  type?: AlertType
}

const AlertInfo = {
  success: {
    icon: '👍',
    bgClass: 'bg-green',
    frontClass: ''
  },
  error: {
    icon: '🚫',
    bgClass: 'bg-red',
    frontClass: ''
  },
  info: {
    icon: '💁‍',
    bgClass: 'bg-blue',
    frontClass: ''
  }
}


function Alert(props: AlertProps) {
  const info = AlertInfo[props.type || 'info']
  return (
    <div className={`container rounded shadow ${info.bgClass}`}>
      <span className='mr-4 text-lg'>{info.icon}</span>
      <span className='text-lg text-white'>{props.text}</span>
    </div>
  )
}

export default Alert
