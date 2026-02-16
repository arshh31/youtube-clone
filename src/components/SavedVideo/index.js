import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import ModeContext from '../../context/ModeContext'
import Header from '../Header'
import SavedVideoCard from '../SavedVideoCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
}

class SavedVideo extends Component {
  state = {gamingVideos: [], apiStatus: apiStatusConstants.initial}

  renderCategoriesContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode, showBanner, savedVideosList} = value
        console.log(savedVideosList)
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

  renderSavedVideos = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const trendingVideoContainer = isDarkMode
          ? 'darkTrendingVideoContainer'
          : 'lightTrendingVideoContainer'
        const wholeTrendingContainer = isDarkMode
          ? 'darkWholeContainer'
          : 'lightWholecontainer'

        const logoContainerClassName = isDarkMode
          ? 'darklogoContainer'
          : 'lightlogoContainer'
        return (
          <div className={wholeTrendingContainer}>
            <div className={trendingVideoContainer}>
              <div className={logoContainerClassName} />
              <h1 className="trendingVideosTitle">Saved Videos </h1>
            </div>
            {this.renderSavedVideoCards()}
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderSavedVideoCards = () => (
    <ModeContext.Consumer>
      {value => {
        const {savedVideosList} = value
        return (
          <div>
            <ul>
              {savedVideosList.map(eachVideo => (
                <SavedVideoCard
                  savedVideoDetails={eachVideo}
                  key={eachVideo.id}
                />
              ))}
            </ul>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderNoSavedVideosContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode, savedVideosList} = value
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="failedImage"
            />
            <h1>No saved videos found</h1>
            <p>You can save your videos while watching them</p>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderHomeContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode, showBanner, savedVideosList} = value
        const homeContainerTheme = isDarkMode
          ? 'darkHomeContainer'
          : 'lightHomeContainer'
        const hasSavedVideos = savedVideosList.length > 0
        return (
          <div className={homeContainerTheme}>
            <Header />
            <div className="contentContainer">
              {this.renderCategoriesContainer()}
              {hasSavedVideos
                ? this.renderSavedVideos()
                : this.renderNoSavedVideosContainer()}
            </div>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  render() {
    return <div>{this.renderHomeContainer()}</div>
  }
}

export default SavedVideo
