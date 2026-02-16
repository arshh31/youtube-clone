import React from 'react'

const ModeContext = React.createContext({
  isDarkMode: false,
  changeMode: () => {},
  showBanner: true,
  changeBannerStatus: () => {},
  savedVideosList: [],
  addVideoToList: () => {},
  isSaved: false,
})

export default ModeContext
