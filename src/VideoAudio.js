import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FaVolumeUp, FaVolumeOff, FaVolumeMute, FaVolumeDown } from 'react-icons/fa'

import styles from './video.css'

class VideoAudio extends Component {

  constructor() {

    super()

    this.state = {
      offset: 0,
      x: 0,
      volume: null
    }

    this.audioSlider = React.createRef()

    this.toggleMute = this.toggleMute.bind(this)
    this.startEvent = this.startEvent.bind(this)
    this.moveEvent = this.moveEvent.bind(this)
    this.endEvent = this.endEvent.bind(this)
  }

  componentDidMount() {

    if (!this.props.videoref.current.muted && !this.props.isMobile) {
      
      this.setState({
        volume: this.props.videoref.current.volume
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (!this.props.isMobile) {

      let slider = ReactDOM.findDOMNode(this.audioSlider.current)
      let offset = slider.getBoundingClientRect().left

      if (offset !== this.state.offset) {

        this.setState({
          offset: offset
        })
      }
    }
  }

  toggleMute() {

    if (this.props.hide || this.props.loading) return

    if (!!this.props.videoref.current.muted) {
      this.props.videoref.current.muted = false
    } else {
      this.props.videoref.current.muted = true
    }
  }

  startEvent(e) {

    if (this.props.hide || this.props.loading) return

    document.onmousemove = this.moveEvent
    document.onmouseup = this.endEvent
  }

  moveEvent(e) {

    if (this.props.hide || this.props.loading) return

    if (this.props.videoref.current.muted) {

      this.props.videoref.current.muted = false
    }

    if (this.state.volume) {

      this.setState({
        volume: null
      })
    }

    const audioSliderWidth = this.audioSlider.current.offsetWidth

    let position = e.pageX - this.state.offset

    if (position < 0) {

      position = 0

    } else if (position > audioSliderWidth) {

      position = audioSliderWidth
    }

    this.props.videoref.current.volume = position / audioSliderWidth

    this.setState({
      x: position
    })
  }

  endEvent(e) {

    document.onmousemove = null
    document.onmouseup = null
  }

  render() {

    const video = this.props.videoref.current
    
    let audio

    if (video !== null) {

      if (!!video.muted) {

        audio = <FaVolumeMute/>

      } else {

        let volume = video.volume

        switch(true) {
          case (volume >= 0.5):
            audio = <FaVolumeUp/>
            break;
          case (volume < 0.5 && volume !== 0):
            audio = <FaVolumeDown/>
            break;
          case (volume === 0):
            audio = <FaVolumeOff/>
            break;
        }
      }
    }

    let thumbPosition

    if (this.state.volume) {

      thumbPosition = this.state.volume * this.audioSlider.current.offsetWidth + 'px'

    } else {

      thumbPosition = this.state.x + 'px'
    }

    return (
      <div className={styles.videoAudioContainer} onClick={this.props.isMobile ? this.toggleMute : null}>
        <div className={styles.videoAudioIcon} onClick={!this.props.isMobile ? this.toggleMute : null}>
          { audio }
        </div>
        {!this.props.isMobile &&
          <div className={styles.videoAudioVolumebarContainer} ref={this.audioSlider} onClick={this.moveEvent}>
            <div 
              className={styles.videoAudioThumb}
              onMouseDown={this.startEvent}
              style={{
                left: thumbPosition
              }}
              >
            </div>
          </div>
        }
      </div>
    )
  }
}

export default VideoAudio