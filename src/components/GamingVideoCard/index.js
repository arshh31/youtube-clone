import {Link} from 'react-router-dom'
import ModeContext from '../../context/ModeContext'
import './index.css'

const GamingVideoCard = props => (
  <ModeContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const {gamingDetails} = props
      const {id, thumbnailUrl, title, viewCount} = gamingDetails
      const gamingVideoCardtitle = isDarkMode ? 'darkTitle' : 'lightTitle'
      const gamingVideoCount = isDarkMode ? 'darkCount' : 'lightCount'
      return (
        <Link to={`/videos/${id}`} className="linkVideoCard">
          <div className="gamingVideoCard">
            <img
              src={thumbnailUrl}
              className="thumbnailImage"
              alt="video thumbnail"
            />
            <p className={gamingVideoCardtitle}>{title}</p>
            <div>
              <p className={gamingVideoCount}>{viewCount} Watching Worldwide</p>
            </div>
          </div>
        </Link>
      )
    }}
  </ModeContext.Consumer>
)
export default GamingVideoCard
