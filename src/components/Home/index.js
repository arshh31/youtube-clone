import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {MdSearch} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import ModeContext from '../../context/ModeContext'
import Header from '../Header'
import NxtwatchBanner from '../NxtwatchBanner'
import AllVideos from '../AllVideos'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
}
class Home extends Component {
  state = {
    videosList: [],
    videoApiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    this.setState({videoApiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = fetchedData.videos.map(eachVideos => ({
        id: eachVideos.id,
        publishedAt: eachVideos.published_at,
        thumbnailUrl: eachVideos.thumbnail_url,
        title: eachVideos.title,
        viewCount: eachVideos.view_count,
        channel: {
          name: eachVideos.channel.name,
          profileImage: eachVideos.channel.profile_image_url,
        },
      }))
      this.setState({
        videosList: updatedData,
        videoApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({videoApiStatus: apiStatusConstants.failed})
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
        const contactTitle = isDarkMode
          ? 'darkContactHeading'
          : 'lightContactHeading'
        const contactDescription = isDarkMode
          ? 'darkcontactDescription'
          : 'lightcontactDescription'
        return (
          <div className={categoryContainer}>
            <ul className="nav-items">
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
            <div className="contact-container">
              <p className={contactTitle}>CONTACT US</p>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="socialMedia-Images"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="twitter logo"
                  className="socialMedia-Images"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="socialMedia-Images"
                />
              </div>
              <p className={contactDescription}>
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderBannerContainer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode, showBanner} = value
        const {videosList} = this.state
        const videoContainer = isDarkMode
          ? 'darkVideoContainer'
          : 'lightVideoContainer'
        return (
          <div className={videoContainer} data-testid="banner">
            {showBanner && <NxtwatchBanner />}
            {this.renderSearchBar()}
            {this.renderFinalContainer()}
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderVideoItem = () => {
    const {videosList} = this.state
    if (videosList.length === 0) {
      return this.renderRandomWordSearch()
    }
    return this.renderVideoCard()
  }

  renderRandomWordSearch = () => (
    <div className="noVideos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="failedImage"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button onClick={() => this.getAllVideos()} className="failedButton">
        Retry
      </button>
    </div>
  )

  renderVideoCard = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const {videosList} = this.state
        return (
          <ul className="videosContainer">
            {videosList.map(eachVideo => (
              <AllVideos videoDetails={eachVideo} key={eachVideo.id} />
            ))}
          </ul>
        )
      }}
    </ModeContext.Consumer>
  )

  renderSearchBar = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        const {searchInput} = this.state
        const searchInputClassname = isDarkMode ? 'darkSearch' : 'lightSearch'
        const searchButton = isDarkMode ? 'darkSearch' : 'lightSearch'
        return (
          <div className="searchElements">
            <input
              type="search"
              className={searchInputClassname}
              placeholder="Search"
              onChange={event =>
                this.setState({searchInput: event.target.value})
              }
              value={searchInput}
            />
            <button
              className={searchButton}
              type="button"
              data-testid="searchButton"
              onClick={() => this.getAllVideos()}
            >
              search
            </button>
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
            <img src={failedImage} className="failedImage" alt="failure view" />
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

  renderFinalContainer = () => {
    const {videoApiStatus} = this.state
    switch (videoApiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItem()
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
            <div className="contentContainer" data-testid="home">
              {this.renderCategoriesContainer()}
              {this.renderBannerContainer()}
            </div>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  render() {
    return this.renderHomeContainer()
  }
}

export default Home
