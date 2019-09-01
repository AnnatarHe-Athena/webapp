import React from 'react'
import PropTypes from 'prop-types'

class Tab extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      tab: props.tab[0].title
    }
  }

  render() {
    return (
      <div>
        <header className='flex'>
          {this.props.tab.map((x, i) => (
            <button className='focus:outline-none py-2 px-4 bg-red-200 hover:bg-red-400' key={i}>{x.title}</button>
          ))}
        </header>
        <div className='mt-2'>
          {this.props.tab.find(x => x.title === this.state.tab).body}
        </div>
      </div>
    )
  }
}

Tab.propTypes = {
  tab: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired
  })).isRequired
}

export default Tab
