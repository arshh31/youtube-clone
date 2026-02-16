import ModeContext from '../../context/ModeContext'

import './index.css'

const NxtwatchBanner = () => (
  <ModeContext.Consumer>
    {value => {
      const {changeBannerStatus} = value
      const onCloseBanner = () => {
        changeBannerStatus()
      }
      return (
        <div className="bannerContainer">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="logoImage"
              alt="nxt watch logo"
            />
            <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
            <button>GET IT NOW</button>
          </div>
          <div className="closeButtonContainer">
            <button
              className="closeBtn"
              onClick={onCloseBanner}
              data-testid="close"
            >
              <p>close</p>
            </button>
          </div>
        </div>
      )
    }}
  </ModeContext.Consumer>
)

export default NxtwatchBanner
