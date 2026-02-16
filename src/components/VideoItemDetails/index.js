import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import ModeContext from '../../context/ModeContext'
import './index.css'

class VideoItemDetails extends Component {
  state = {videoDetails: '', isLiked: false, isDisliked: false}

  componentDidMount() {
    this.getVideoDetails()
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislikeButton = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const updatedData = {
        videoUrl: fetchedData.video_details.video_url,
        description: fetchedData.video_details.description,
        id: fetchedData.video_details.id,
        publishedAt: fetchedData.video_details.published_at,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        viewCount: fetchedData.video_details.view_count,
        title: fetchedData.video_details.title,

        channel: {
          name: fetchedData.video_details.channel.name,
          profileImage: fetchedData.video_details.channel.profile_image_url,
          subscriberCount: fetchedData.video_details.channel.subscriber_count,
        },
      }
      this.setState({videoDetails: updatedData})
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

  renderVideoPlayer = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDarkMode, addVideoToList, isSaved} = value
        const {videoDetails, isDisliked, isLiked} = this.state
        const {
          id,
          description,
          videoUrl,
          publishedAt,
          thumbnailUrl,
          channel,
          title,
          viewCount,
        } = videoDetails

        if (!channel) {
          return <p>loading</p>
        }
        const {profileImage, name, subscriberCount} = channel

        let todayTime = ''
        if (publishedAt) {
          const date = new Date(publishedAt)
          todayTime = formatDistanceToNow(date)
        }
        todayTime = todayTime
          .replace('over ', '')
          .replace('about ', '')
          .replace('almost', '')
        const likedBtnClassName = isLiked ? 'isLikedBtn' : ''
        const dislikedBtnClassName = isDisliked ? 'isDislikedBtn' : ''
        const savedBtnClassName = isSaved ? 'isSavedBtn' : ''
        const horizontalLineclassName = isDarkMode
          ? 'darkHorizontalLine'
          : 'lightHorizontalLine'

        const onClickSaveBtn = () => {
          addVideoToList({...videoDetails})
        }

        const viewsAndPublishContainer = isDarkMode
          ? 'darkviewsAndPublish-Container'
          : 'lightviewsAndPublish-Container'

        const channelContent = isDarkMode
          ? 'darkChannelContent'
          : 'lightChannelContent'

        const buttonContainerClassName = isDarkMode
          ? 'darkbuttonsContainer'
          : 'lightbuttonsContainer'

        const descriptionClassName = isDarkMode
          ? 'darkDescription'
          : 'lightDescription'
        const titleClassName = isDarkMode
          ? 'darkDescription'
          : 'lightDescription'

        const saveContent = isSaved ? 'saved' : 'save'
        return (
          <div className="playerContainer">
            <ReactPlayer url={videoUrl} width="90%" height="60%" />
            <p className={titleClassName}>{title}</p>
            <div className={viewsAndPublishContainer}>
              <div className="viewsAndPublishContent">
                <p>{viewCount} views</p>
                <p className="todayTime">{todayTime} ago</p>
              </div>
              <div className={buttonContainerClassName}>
                <button
                  className={`${buttonContainerClassName} ${likedBtnClassName}`}
                  onClick={this.onClickLikeButton}
                >
                  Like
                </button>
                <button
                  className={`${buttonContainerClassName} ${dislikedBtnClassName}`}
                  onClick={this.onClickDislikeButton}
                >
                  Dislike
                </button>
                <button
                  className={`${buttonContainerClassName} ${savedBtnClassName}`}
                  onClick={onClickSaveBtn}
                >
                  <p>{saveContent}</p>
                </button>
              </div>
            </div>
            <div>
              <hr className={horizontalLineclassName} />
            </div>

            <div className="channelInfo">
              <div>
                <img
                  src={profileImage}
                  className="profileImage"
                  alt="channel logo"
                />
              </div>
              <div className={channelContent}>
                <p>{name}</p>
                <p>{subscriberCount} subscribers</p>
              </div>
            </div>
            <p className={descriptionClassName}>{description}</p>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderHomeandHeader = () => (
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
              {this.renderVideoPlayer()}
            </div>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  render() {
    return this.renderHomeandHeader()
  }
}

export default VideoItemDetails
