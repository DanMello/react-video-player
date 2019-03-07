# React-Video-Player 

A React component for easily playing videos with controls on mobile and desktop devices.

### Requirements
1. React and React-dom 16.5.2 or greater

2. The body must have margin and padding 0 for the offsetLeft position to be correct in the video seekbar and volume slider.
```css
body {
  padding: 0;
  margin: 0;
}
```
3. If you wrap the ReactVideoPlayer component with another component that has a set width, the seekbar and volume slider may not work properly. To fix put postion relative on the component wrapping ReactVideoPlayer.

Example:
```css
.video-container {
  width 400px;
  position: relative;
}
```

### Usage

```bash
npm install react-vp --save
```

```js
import React, { Component } from 'react'
import ReactVideoPlayer from 'react-vp'

class App extends Component {
  render () {
    return <ReactVideoPlayer 
              className={'video-container'}
              mobileClassName={'video-container-mobile'} 
              videoPath='assets/videos/video.mp4'
              videoThumbnail='assets/videos/thumbnail.png'
              isMobile={this.props.config.isMobile}
              />
  }
}
```
Demo page: [`https://mellocloud.com/react-video-player`](https://mellocloud.com/react-video-player)

### Props

Prop | Description | Required
---- | ----------- | -------
`className` | Css class for the video container, this will be applied to the desktop version of the video player. | yes
`mobileClassName` | Css class for the video container, this will be applied to the mobile version of the video player. | no
`videoPath` | Path to the video you want to play. | yes
`videoThumbnail` | Path to the video thumbnail. | yes
`isMobile` | This is a bool, how you determine if the user is on desktop or mobile is up to you or you can put false if its only for desktop. | yes
