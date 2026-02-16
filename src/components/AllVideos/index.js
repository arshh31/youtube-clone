import {Link} from 'react-router-dom'
import ModeContext from '../../context/ModeContext'
import './index.css'

const AllVideos = props => (
  <ModeContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const {videoDetails} = props
      const {
        id,
        publishedAt,
        thumbnailUrl,
        title,
        viewCount,
        channel,
      } = videoDetails
      const {name, profileImage} = channel

      const videocardContainer = isDarkMode
        ? 'darkVideoCard-container'
        : 'lightVideoCard-container'

      const channelName = isDarkMode ? 'darkName' : 'lightName'
      const titleClassName = isDarkMode ? 'darkTitle' : 'lightTitle'
      return (
        <Link to={`/videos/${id}`} className="linkVideoCard">
          <div className={videocardContainer}>
            <div>
              <img
                src={thumbnailUrl}
                className="thumbnailImage"
                alt="video thumbnail"
              />
            </div>
            <div className="profileContainer">
              <div className="profileandName">
                <div>
                  <img
                    src={profileImage}
                    className="profileImage"
                    alt="channel logo"
                  />
                </div>
                <div>
                  <p className={titleClassName}>{title}</p>
                  <p className={channelName}>{name}</p>
                </div>
              </div>
              <div className={`viewsAndCount ${channelName}`}>
                <p>{viewCount} views</p>
                <p className="publishedDate">{publishedAt}</p>
              </div>
            </div>
          </div>
        </Link>
      )
    }}
  </ModeContext.Consumer>
)

export default AllVideos
