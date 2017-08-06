import React from 'react'

const Nav = ({ categories, onChange }) => {
    const navs = categories.map(c => {
        return (
            <li key={c.id} onClick={() => { onChange(c.src)}}>{"c.name"}</li>)
    })
    return (
        <nav>
            <ul>{navs}</ul>
        </nav>
    )
}

export default Nav