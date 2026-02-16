import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import ModeContext from '../../context/ModeContext'
import Header from '../Header'
import TrendingVideoCard from '../TrendingVideoCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
}

class TrendingRoute extends Component {
  state = {trendingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const {videos} = fetchedData

    if (response.ok === true) {
      const updatedData = videos.map(eachVideo => ({
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        channel: {
          name: eachVideo.channel.name,
          profileImage: eachVideo.channel.profile_image_url,
        },
      }))
      this.setState({
        trendingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }

  renderCategoriesContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode, showBanner} = value
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

  renderTrendingVideos = () => (
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
              <h1 className="trendingVideosTitle">Trending </h1>
            </div>
            {this.renderFinalTrending()}
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderTrendingVideoCards = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const {trendingVideos} = this.state
        return (
          <div>
            <ul>
              {trendingVideos.map(eachVideo => (
                <TrendingVideoCard
                  videoCardDetails={eachVideo}
                  key={eachVideo.id}
                />
              ))}
            </ul>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderFailureView = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const failedImage = isDarkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="failedContainer">
            <img src={failedImage} className="failedImage" />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete you request</p>
            <p>Please try again</p>
            <button onClick={() => this.getAllVideos()}>Retry</button>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderLoaderView = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const loaderColor = isDarkMode ? 'white' : 'black'
        return (
          <div className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={loaderColor}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderFinalTrending = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideoCards()
      case apiStatusConstants.failed:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderHomeContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode, showBanner} = value
        const homeContainerTheme = isDarkMode
          ? 'darkHomeContainer'
          : 'lightHomeContainer'
        return (
          <div className={homeContainerTheme}>
            <Header />
            <div className="contentContainer">
              {this.renderCategoriesContainer()}
              {this.renderTrendingVideos()}
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

export default TrendingRoute
