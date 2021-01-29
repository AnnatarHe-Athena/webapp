import React from 'react'
const styles = require('./card.css').default

type CardProps = {
  isFar: boolean
  className?: string
  children: any
}

function Card(props: CardProps) {
  return (
    <div className={`py-20 px-12 rounded shadow-lg ${styles.card} ${props.isFar ? 'mt-40' : 'mt-4'} ${props.className}`}>
      {props.children}
    </div>
  )

}

export default Card
