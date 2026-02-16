import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoMdMenu} from 'react-icons/io'
import {FaMoon, FaSun} from 'react-icons/fa'
import ModeContext from '../../context/ModeContext'
import './index.css'

const Header = props => (
  <ModeContext.Consumer>
    {value => {
      const {isDarkMode, changeMode} = value
      const modeClassName = isDarkMode
        ? 'darkHeader-Container'
        : 'lightHeader-Container'
      const nxtWatchLogo = isDarkMode
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      const modeLogo = isDarkMode ? (
        <FaSun size={28} color="white" />
      ) : (
        <FaMoon size={28} />
      )
      const logoutBtnClassName = isDarkMode ? 'darkLogout' : 'lightLogout'

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const onChangeTheme = () => {
        changeMode()
      }
      return (
        <div className={modeClassName}>
          <Link to="/">
            <img
              src={nxtWatchLogo}
              className="nxtWatchLogo"
              alt="website logo"
            />
          </Link>
          <div className="modeDetails-Container">
            <button
              onClick={onChangeTheme}
              className="modeLogo-Button"
              data-testid="theme"
            >
              {modeLogo}
            </button>
            <IoMdMenu className="menuLogo" />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profilePic"
            />

            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  Logout
                </button>
              }
              className="popup-content"
            >
              {close => (
                <>
                  <div>
                    <p>Are you sure, you want to logout</p>
                    <div>
                      <button onClick={() => close()} className="cancelBtn">
                        Cancel
                      </button>
                      <button onClick={onClickLogout} className="confirmBtn">
                        Confirm
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      )
    }}
  </ModeContext.Consumer>
)

export default withRouter(Header)
