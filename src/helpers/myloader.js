import React, { Component } from 'react'
import styles from '../video.css'

class Loader extends Component {

  render() {
    return (
      <div
        className={styles[this.props.containerClass]}
        style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <div
        className={styles.videoLoaderCircle}
        style={{
          width: this.props.width,
          height: this.props.height,
          borderRightColor: this.props.color,
          borderBottomColor: this.props.color,
          borderTopColor: this.props.color
        }}>
        </div>
      </div>
    )
  }
}

export default Loader
