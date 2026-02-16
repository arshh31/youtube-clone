import {Link} from 'react-router-dom'

import ModeContext from '../../context/ModeContext'
import Header from '../Header'
import NxtwatchBanner from '../NxtwatchBanner'
import './index.css'

const NotFound = () => {
  const renderCategoriesContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value

        const categoryContainer = isDarkMode
          ? 'darkCategoryContainer'
          : 'lightCategoryContainer'

        const linkTitles = isDarkMode ? 'darkLink-Titles' : 'lightLinkTitles'
        return (
          <div className={categoryContainer}>
            <ul>
              <li className="list-items">
                <Link to="/" className="link-items">
                  <p className={linkTitles}>Home</p>
                </Link>
              </li>

              <li className="list-items">
                <Link to="/trending" className="link-items">
                  <p className={linkTitles}>Trending</p>
                </Link>
              </li>

              <li className="list-items">
                <Link to="/gaming" className="link-items">
                  <p className={linkTitles}>Gaming</p>
                </Link>
              </li>

              <li className="list-items">
                <Link to="/saved-videos" className="link-items">
                  <p className={linkTitles}>Saved Videos</p>
                </Link>
              </li>
            </ul>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  const renderNotFoundRoute = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const notFoundImage = isDarkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        return (
          <div className="notFoundContainer">
            <img
              src={notFoundImage}
              className="notFoundImage"
              alt="Not Found"
            />
            <h1>Page Not Found</h1>
            <p>we are sorry, the page you requested could not be found.</p>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )
  const renderHomeContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const homeContainerTheme = isDarkMode
          ? 'darkHomeContainer'
          : 'lightHomeContainer'
        return (
          <div className={homeContainerTheme}>
            <Header />
            <div className="contentContainer">
              {renderCategoriesContainer()}
              {renderNotFoundRoute()}
            </div>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  return <div>{renderHomeContainer()}</div>
}
export default NotFound
