import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types/prop-types';
import ToggleVideo from './ToggleVideo'
import VideoSeekbar from './VideoSeekbar'
import VideoAudio from './VideoAudio'
import Loader from './helpers/myloader'
import { timeConvert } from './helpers/numbers'
import { IoMdQrScanner } from 'react-icons/io'
import { FaExclamationTriangle } from 'react-icons/fa'
import styles from './video.css'

class ReactVideoPlayer extends Component {

  constructor() {

    super()

    this.state = {
      hide: false,
      delay: null,
      clicked: false,
      loading: false,
      playing: false,
      pausedBeforeSeek: false,
      seeking: false,
      seekInteraction: false,
      loadedPercentage: 0,
      positionLeft: 0,
      error: false,
      initialLoad: false,
      currentVideoTime: null,
      videoDuration: null,
      iphoneFullscreen: false,
      ahead15src: null,
      back15src: null
    }

    this._video = React.createRef()
    this._videoSeekbarComponent = React.createRef()
    this._button = React.createRef()
    this._progressBar = React.createRef()
    this._videoContainer = React.createRef()

    this.manageControllerMobile = this.manageControllerMobile.bind(this)
    this.manageControllerDesktop = this.manageControllerDesktop.bind(this)
    this.manageClickDesktop = this.manageClickDesktop.bind(this)
    this.playing = this.playing.bind(this)
    this.pause = this.pause.bind(this)
    this.timeupdate = this.timeupdate.bind(this)
    this.loading = this.loading.bind(this)
    this.loaded = this.loaded.bind(this)
    this.progress = this.progress.bind(this)
    this.error = this.error.bind(this)
    this.back15 = this.back15.bind(this)
    this.ahead15 = this.ahead15.bind(this)
    this.waiting = this.waiting.bind(this)
    this.canplay = this.canplay.bind(this)
    this.seeking = this.seeking.bind(this)
    this.seeked = this.seeked.bind(this)
    this.startSeekbarInteraction = this.startSeekbarInteraction.bind(this)
    this.endSeekbarInteraction = this.endSeekbarInteraction.bind(this)
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this.changedFullscreenIOS = this.changedFullscreenIOS.bind(this)
    this.ended = this.ended.bind(this)
    this.reloadPage = this.reloadPage.bind(this)
  }

  componentDidMount() {

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {

      this._video.current.autoplay = true
      this._video.current.muted = true

      this._video.current.addEventListener("webkitendfullscreen", this.changedFullscreenIOS)

      this.setState({
        initialLoad: true
      })
    }

    this._video.current.addEventListener('playing', this.playing)
    this._video.current.addEventListener('canplay', this.canplay)
    this._video.current.addEventListener('waiting', this.waiting)
    this._video.current.addEventListener('seeking', this.seeking)
    this._video.current.addEventListener('seeked', this.seeked)
    this._video.current.addEventListener('pause', this.pause)
    this._video.current.addEventListener('timeupdate', this.timeupdate)
    this._video.current.addEventListener('loadstart', this.loading)
    this._video.current.addEventListener('loadeddata', this.loaded)
    this._video.current.addEventListener('progress', this.progress)
    this._video.current.addEventListener('error', this.error)
    this._video.current.addEventListener('ended', this.ended)
  }

  componentWillUnmount() {

    if (this.state.delay) clearTimeout(this.state.delay)

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {

      this._video.current.remove('webkitendfullscreen', this.changedFullscreenIOS)
    }

    this._video.current.removeEventListener('playing', this.playing)
    this._video.current.removeEventListener('canplay', this.canplay)
    this._video.current.removeEventListener('waiting', this.waiting)
    this._video.current.removeEventListener('seeking', this.seeking)
    this._video.current.removeEventListener('seeked', this.seeked)
    this._video.current.removeEventListener('pause', this.pause)
    this._video.current.removeEventListener('timeupdate', this.timeupdate)
    this._video.current.removeEventListener('loadstart', this.loading)
    this._video.current.removeEventListener('loadeddata', this.loaded)
    this._video.current.removeEventListener('progress', this.progress)
    this._video.current.removeEventListener('error', this.error)
  }

  manageControllerMobile(e) {

    if (this.state.delay) clearTimeout(this.state.delay)

    if (!this.state.clicked || !e.target.classList.contains(styles.videoCenterControlsContainer)) {

      this.setState({
        hide: false,
        clicked: true,
        delay: setTimeout(() => {

          this.setState({
            hide: true,
            clicked: false
          })
        }, 2500)
      })

    } else {

      this.setState({
        hide: true,
        clicked: false
      })
    }
  }

  manageControllerDesktop(e) {

    if (this.state.delay) clearTimeout(this.state.delay)

    if (!this._video.current.paused && !this.state.hide) {

      this.setState({
        delay: setTimeout(() => {

          this.setState({
            hide: true
          })
        }, 2500)
      })

    } else if (this.state.hide) {

      this.setState({
        hide: false,
        delay: setTimeout(() => {

          this.setState({
            hide: true
          })
        }, 2500)
      })
    }
  }

  manageClickDesktop(e) {

    if (this.state.delay) clearTimeout(this.state.delay)

    if (e.target.classList.contains(styles.videoCenterControlsContainer)) {

      if (this._video.current.currentTime > 0 && !this._video.current.paused && !this._video.current.ended && this._video.current.readyState > 2) {

        this._video.current.pause()

      } else {

        this._video.current.play()
      }
    }

    let stateObj = {
      clicked: true
    }

    if (!this._video.current.paused) {

      stateObj.delay = setTimeout(() => {

        this.setState({
          hide: true,
          clicked: false
        })
      }, 2500)
    }

    this.setState(stateObj)
  }

  waiting() {

    this.setState({
      loading: true
    })
  }

  canplay() {

    this.setState({
      loading: false
    })
  }

  playing() {

    let stateObj = {
      playing: true,
      loading: false
    }

    if (this.state.initialLoad) {

      stateObj.hide = false
      stateObj.clicked = true,
      stateObj.initialLoad = false,
      stateObj.delay = setTimeout(() => {

        this.setState({
          hide: true,
          clicked: false
        })
      }, 2500)
    }

    this.setState(stateObj)
  }

  pause() {

    this.setState({
      playing: false,
      hide: false
    })
  }

  error() {

    this.setState({
      error: true
    })
  }

  timeupdate() {

    if (!this.state.seeking && !this.state.loading && !this.state.seekInteraction) {

      let offset = this._progressBar.current.offsetWidth

      let percentage = ( this._video.current.currentTime / this._video.current.duration ) * offset

      this.setState({
        positionLeft: percentage,
        currentVideoTime: timeConvert(this._video.current.currentTime, this._video.current.duration)
      })
    }
  }

  loading() {

    this.setState({
      loading: true
    })
  }

  loaded() {

    this.setState({
      loading: false,
      videoDuration: timeConvert(this._video.current.duration)
    })
  }

  progress() {

    let video = this._video.current
    let buffered = video.buffered
    let duration = video.duration
    let time  = video.currentTime
    let loadedPercentage

    if (duration > 0) {

      for (var i = 0; i < buffered.length; i++) {

        if (buffered.start(buffered.length - 1 - i) < time) {

          this.setState({
            loadedPercentage: buffered.end(buffered.length - 1 - i) / duration * 100
          })
          break;
        }
      }
    }
  }

  seeking() {

    this.setState({
      seeking: true
    })
  }

  seeked() {

    this.setState({
      seeking: false,
      currentVideoTime: timeConvert(this._video.current.currentTime, this._video.current.duration)
    })
  }

  startSeekbarInteraction() {

    if (this.state.delay && this.props.isMobile) clearTimeout(this.state.delay)

    this.setState({
      seekInteraction: true
    })
  }

  endSeekbarInteraction() {

    let stateObj = {
      seekInteraction: false
    }

    if (this.props.isMobile) {

      stateObj.delay = setTimeout(() => {

        this.setState({
          hide: true,
          clicked: false
        })
      }, 2500)
    }

    this.setState(stateObj)
  }

  back15(e) {

    e.preventDefault()

    if (this.state.hide) return

    let time = this._video.current.currentTime - 15

    if (time < 0) time = 0

    this._video.current.currentTime = time
  }

  ahead15(e) {

    e.preventDefault()

    if (this.state.hide) return

    let time = this._video.current.currentTime + 15

    if (time > this._video.current.duration) time = 0

    this._video.current.currentTime = time
  }

  toggleFullScreen() {

    if (this.state.hide || this.state.loading) return

    if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) {

      var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
          (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
          (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
          (document.msFullscreenElement && document.msFullscreenElement !== null);

      if (!isInFullScreen) {
        
        let i = this._videoContainer.current

        if (i.requestFullscreen) {
          i.requestFullscreen();
        } else if (i.webkitRequestFullscreen) {
          i.webkitRequestFullscreen();
        } else if (i.mozRequestFullScreen) {
          i.mozRequestFullScreen();
        } else if (i.msRequestFullscreen) {
          i.msRequestFullscreen();
        }
      
      } else {

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

      setTimeout(() => {

        this.timeupdate()

      }, 100)
              
    } else {

      if (!this.state.iphoneFullscreen) {

        this.setState({
          iphoneFullscreen: true
        }, () => {

          this._video.current.pause()
          this._video.current.play()          
        })
      }
    }
  }

  changedFullscreenIOS() {

    if(!document.fullScreenElement || document.webkitIsFullScreen == false || !document.mozFullScreen || !document.msFullscreenElement){

      this.setState({
        iphoneFullscreen: false
      })
    }
  }

  ended() {

    this._video.current.currentTime = 0

    this.setState({
      loadedPercentage: 0,
      positionLeft: 0
    })
  }

  reloadPage() {

    window.location.reload()
  }

  render() {

    return (
      <div style={{position: 'relative'}} className={!this.props.isMobile ? this.props.className : this.props.mobileClassName}>

          {this.state.error ?

            <div className={styles.videoErrorContainer} onClick={this.props.isMobile ? this.reloadPage : null}>
              <div className={styles.videoErrorPosition}>
                <div className={styles.videoErrorSubContainer}>
                  <FaExclamationTriangle className={styles.videoErrorIcon} />
                  <h1 className={styles.videoErrormessage}>Video not available.</h1>
                </div>
                <div className={!this.props.isMobile ? styles.videoRetryButton : styles.videoRetryButtonMobile} onClick={!this.props.isMobile ? this.reloadPage : null}>
                  {this.props.isMobile ? 'Tap to refresh' : 'Click to refresh'}
                </div>
              </div>
            </div>
            :
            <div
              ref={this._videoContainer}
              className={styles.videoPlayerOuterContainer}
              onMouseMove={!this.props.isMobile ? this.manageControllerDesktop : null}
              onClick={this.props.isMobile ? this.manageControllerMobile : this.manageClickDesktop}
              style={this.state.hide ? {cursor: 'none'} : {cursor: 'default'}}
              >
              
              {this.state.loading &&

                <Loader width={'30px'} height={'30px'} color={'white'} containerClass={'videoLoader'} />
              }

              <video
                className={styles.videoPlayerContainer}
                ref={this._video}
                poster={this.props.videoThumbnail}
                playsInline={this.state.iphoneFullscreen ? false : true}
                controls={this.state.iphoneFullscreen ? true : false}
                >

                <source type="video/mp4" src={this.props.videoPath} />

              </video>

              <div className={this.state.hide || this.state.loading || this.state.seekInteraction || this.state.iphoneFullscreen ? styles.videoHide : styles.videoShow}>

                <div className={styles.videoFullscreenButtonContainer} onClick={this.toggleFullScreen}>
                  <IoMdQrScanner className={styles.videoFullscreenButton} />
                </div>

                <VideoAudio videoref={this._video} isMobile={this.props.isMobile} hide={this.state.hide} loading={this.state.loading} />

                <div className={styles.videoCenterControlsContainer}>
                  
                  <div className={[styles.videoSkipContainer, styles.videoSkipLeft].join(' ')} onClick={this.back15}>
                    <img src={require('../assets/back15.png')} className={styles.videoSkipImage}/>
                  </div>

                  <ToggleVideo
                    videoref={this._video}
                    hide={this.state.hide}
                    playing={this.state.playing}
                  />

                  <div className={[styles.videoSkipContainer, styles.videoSkipRight].join(' ')} onClick={this.ahead15}>
                    <img src={require('../assets/ahead15.png')} className={styles.videoSkipImage}/>
                  </div>
                </div>
              </div>

              <div className={this.state.hide || this.state.iphoneFullscreen ? styles.videoHide : styles.videoShow}>

                <div className={styles.videoPlayControllerContainer}>

                  <div className={styles.videoTime}>{this.state.currentVideoTime !== null ? this.state.currentVideoTime : '--:--'}</div>

                  <VideoSeekbar
                    ref={this._videoSeekbarComponent}
                    loading={this.state.loading}
                    hide={this.state.hide}
                    videoref={this._video}
                    delay={this.state.delay}
                    isMobile={this.props.isMobile} 
                    button={this._button}
                    progressbar={this._progressBar}
                    startSeekbarInteraction={this.startSeekbarInteraction}
                    endSeekbarInteraction={this.endSeekbarInteraction}
                    loadedPercentage={this.state.loadedPercentage}
                    positionLeft={this.state.positionLeft}
                  />

                  <div className={styles.videoTime}>{this.state.videoDuration !== null ? this.state.videoDuration : '--:--'}</div>

                </div>
              </div>
            </div>
          }
      </div>
    )
  }
}

ReactVideoPlayer.propTypes = {
  className:PropTypes.string.isRequired,
  videoPath:PropTypes.string.isRequired,
  videoThumbnail:PropTypes.string.isRequired,
  isMobile:PropTypes.bool.isRequired
};

export default ReactVideoPlayer