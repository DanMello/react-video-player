import React, { Component } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import styles from './video.css'

class ToggleVideo extends Component {

  constructor() {

    super()

    this.toggleVideo = this.toggleVideo.bind(this)
  }

  toggleVideo() {

    if (this.props.hide) return
    
    if (this.props.videoref.current.currentTime > 0 && !this.props.videoref.current.paused && !this.props.videoref.current.ended && this.props.videoref.current.readyState > 2) {

      this.props.videoref.current.pause()

    } else {

      this.props.videoref.current.play()
    }
  }

  render() {

    return (

      <div className={styles.videoPlayButton} onClick={this.toggleVideo}>
        
        {!this.props.playing ? <FaPlay /> : <FaPause />}

      </div>
    )
  }
}

export default ToggleVideo