import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ModeContext from './context/ModeContext'
import ProtectedRoute from './components/ProtectedRoute'
import TrendingRoute from './components/TrendingRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import GamingRoute from './components/GamingRoute'
import SavedVideo from './components/SavedVideo'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    isDarkMode: false,
    showBanner: true,
    savedVideosList: [],
    isSaved: false,
  }

  onChangeTheme = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  changeBanStatus = () => {
    this.setState({showBanner: false})
  }

  toggleSavedVideo = video => {
    this.setState(prevState => ({
      isSaved: !prevState.isSaved,
    }))
    this.setState(prevState => {
      const {savedVideosList} = prevState

      const isAlreadySaved = savedVideosList.some(
        eachVideo => eachVideo.id === video.id,
      )

      if (isAlreadySaved) {
        return {
          savedVideosList: savedVideosList.filter(
            eachVideo => eachVideo.id !== video.id,
          ),
        }
      }

      return {
        savedVideosList: [...savedVideosList, video],
      }
    })
  }

  render() {
    const {isDarkMode, showBanner, savedVideosList, isSaved} = this.state
    console.log(isSaved)
    return (
      <ModeContext.Provider
        value={{
          isDarkMode,
          showBanner,
          savedVideosList,
          isSaved,
          addVideoToList: this.toggleSavedVideo,
          changeMode: this.onChangeTheme,
          changeBannerStatus: this.changeBanStatus,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideo} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ModeContext.Provider>
    )
  }
}

export default App
