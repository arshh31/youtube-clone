import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ModeContext from '../../context/ModeContext'
import './index.css'

const SavedVideoCard = props => (
  <ModeContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const {savedVideoDetails} = props
      const {
        thumbnailUrl,
        id,
        publishedAt,
        title,
        videoUrl,
        viewCount,
        channel,
      } = savedVideoDetails
      if (!channel) {
        return <p>loading</p>
      }

      const {name} = channel
      let todayTime = ''
      if (publishedAt) {
        const date = new Date(publishedAt)
        todayTime = formatDistanceToNow(date)
      }
      todayTime = todayTime
        .replace('about ', '')
        .replace('almost', '')
        .replace('over', '')
      const trendingTitleClassName = isDarkMode
        ? 'darkTrendingTitle'
        : 'lightTrendingTitle'

      const trendingChannelName = isDarkMode
        ? 'darkChannelName'
        : 'lightChannelName'

      const trendingViewcountandTime = isDarkMode
        ? 'darktrendingViewcountandTime'
        : 'lightTrendingViewcountandTime'

      return (
        <Link to={`/videos/${id}`} className="linkVideoCard">
          <div className="trendingvideoCard-Container">
            <div>
              <img
                src={thumbnailUrl}
                className="thumbnailImages"
                alt="video thumbnail"
              />
            </div>
            <div className="trendingContents">
              <p className={trendingTitleClassName}>{title}</p>
              <p className={trendingChannelName}>{name}</p>
              <div className={trendingViewcountandTime}>
                <p>{viewCount} views</p>
                <p className="todayTime">{todayTime} ago</p>
              </div>
            </div>
          </div>
        </Link>
      )
    }}
  </ModeContext.Consumer>
)
export default SavedVideoCard
