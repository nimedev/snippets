/**
 * @module AppLayout
 */

// Dependencies
import React, { Component } from 'react'
import { Sidenav } from '../Sidenav'
import { Toolbar } from '../Toolbar'
import './AppLayout.css'

class AppLayout extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      sidenavOpen: false
    }
    this.toggleSidenav = this.toggleSidenav.bind(this)
  }

  /**
   * Change state of sidenav
   */
  toggleSidenav() {
    this.setState(prevState => {
      return { sidenavOpen: !prevState.sidenavOpen }
    })
  }

  render() {
    const { sidenavOpen } = this.state
    return (
      <div className="AppLayout">
        <Sidenav className="Flex-item--none"
          isVisible={sidenavOpen}
          toggleSidenav={this.toggleSidenav} />
        <div className="AppLayout-content Flex-item--auto">
          <Toolbar className="Flex-item--none"
            toggleSidenav={this.toggleSidenav} />
          <main className="AppLayout-main Flex-item--auto">
            <h1>Material Layout</h1>
          </main>
        </div>
      </div>
    )
  }
}

/**
 * AppLayout component
 */
export default AppLayout