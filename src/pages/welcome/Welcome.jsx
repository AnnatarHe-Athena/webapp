import React from 'react'
import styles from './page.css'

class Welcome extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <section className={styles.container}>
            <h2> welcome </h2>
          </section>
        )
    }
}

export default Welcome
