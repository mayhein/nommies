import React from 'react'
import '../App.css'
import { Button } from './Button'

function Navbar() {

  return (
    <>
        <div className="navbar">
          <div className="navbar-container container">
            <div className="navbar-logo">The Nommies</div>
            <div className="nav-btn">
              <div className="btn-link">
                <Button buttonStyle="btn--outline" ><a href='https://github.com/mayhein/nommies' target='_blank' rel="noreferrer">Click to view the source code on GitHub</a></Button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar

