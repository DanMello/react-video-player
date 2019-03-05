# React-Video-Player

A React component for playing videos with controls.

### Requirements
1. React and React-dom 16.5.2 or greater

2. The body must have margin and padding 0 for the offsetLeft position to be correct in the video seekbar and volume slider.
```css
body {
  padding: 0;
  margin: 0;
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
Demo page: [`https://mellocloud.com`](https://mellocloud.com)

### Props

Prop | Description | Required
---- | ----------- | -------
`className` | Css class for the video container, this will be applied to the desktop version of the video player. | yes
`mobileClassName` | Css class for the video container, this will be applied to the mobile version of the video player. | no
`videoPath` | Path to the video you want to play. | yes
`videoThumbnail` | Path to the video thumbnail. | yes
`isMobile` | This is a bool, how you determine if the user is on desktop or mobile is up to you or you can put false if its only for desktop. | yes
