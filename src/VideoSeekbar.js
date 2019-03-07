import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FaPlay, FaPause } from 'react-icons/fa'
import styles from './progressbar.css'
import videoStyles from './video.css'

class VideoSeekbar extends Component {

  constructor() {

    super()

    this.state = {
      x: 0,
      offset: 0,
      loadedPercentage: 0,
      pausedBeforeSeek: null
    }

    this.startEvent = this.startEvent.bind(this)
    this.moveEvent = this.moveEvent.bind(this)
    this.endEvent = this.endEvent.bind(this)
    this.seekToPosition = this.seekToPosition.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {

    let seekbar = ReactDOM.findDOMNode(this)
    let offset = seekbar.getBoundingClientRect().left

    if (offset !== this.state.offset) {

      this.setState({
        offset: offset
      })
    }

    if (prevProps.loadedPercentage !== this.props.loadedPercentage) {

      this.setState({
        loadedPercentage: this.props.loadedPercentage
      })
    }

    if (prevProps.positionLeft !== this.props.positionLeft) {

      this.setState({
        x: this.props.positionLeft
      })
    }
  }

  startEvent(e) {
    
    if (this.props.hide || this.props.loading) return

    this.props.startSeekbarInteraction()

    let pausedBeforeSeek

    if (!this.props.videoref.current.paused) {

      this.props.videoref.current.playbackRate = 0

      pausedBeforeSeek = false

    } else {

      pausedBeforeSeek = true
    }

    if (e.type === 'touchstart') {

      document.ontouchmove = this.moveEvent
      document.ontouchend = this.endEvent

    } else {

      document.onmousemove = this.moveEvent
      document.onmouseup = this.endEvent
    }

    this.setState({
      pausedBeforeSeek
    })
  }

  moveEvent(e) {

    e.preventDefault()

    const progressbarwidth = this.props.progressbar.current.offsetWidth

    let position

    if (e.type === 'touchmove') {

      position = e.touches[0].pageX - this.state.offset

    } else {

      position = e.pageX - this.state.offset
    }

    if (position < 0) {

      position = 0

    } else if (position > progressbarwidth) {

      position = progressbarwidth
    }

    const percentage = (position / progressbarwidth)
    const videoTime = this.props.videoref.current.duration * percentage

    this.props.videoref.current.currentTime = videoTime

    this.setState({
      x: position
    })
  }

  endEvent(e) {

    e.preventDefault()

    this.props.endSeekbarInteraction()

    if (!this.state.pausedBeforeSeek) {

      this.props.videoref.current.playbackRate = 1
    }

    if (e.type === 'touchend') {

      document.ontouchmove = null
      document.ontouchend = null

    } else {

      document.onmousemove = null
      document.onmouseup = null
    }
  }

  seekToPosition(e) {

    const progressbarwidth = this.props.progressbar.current.offsetWidth

    let position = e.pageX - this.state.offset

    if (position < 0) {

      position = 0

    } else if (position > progressbarwidth) {

      position = progressbarwidth
    }

    const percentage = (position / progressbarwidth)
    const videoTime = this.props.videoref.current.duration * percentage

    this.props.videoref.current.currentTime = videoTime

    this.props.endSeekbarInteraction()

    this.setState({
      x: position
    })
  }

  render() {

    return (

      <div className={styles.progressBar} ref={this.props.progressbar} onClick={!this.props.isMobile ? this.seekToPosition : null}>

          <div
            className={styles.progressBarLoadedData}
            style={{
              width: this.state.loadedPercentage + '%'
            }}
          >
          </div>

          <div
            className={styles.progressBarPlayedData}
            style={{
              width: this.state.x + 'px'
            }}
          >
          </div>

          <div
            className={styles.progressButtonContainer}
            onMouseDown={!this.props.isMobile ? this.startEvent : null}
            onTouchStart={this.props.isMobile ? this.startEvent : null}
            ref={this.props.button}
            style={{
              left: this.state.x + 'px'
            }}
          >
            <span className={styles.progressButtonPadding}/>

          </div>

      </div>
    )
  }
}

export default VideoSeekbar