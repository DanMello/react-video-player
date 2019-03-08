# React-Video-Player 

[![npm version](https://badge.fury.io/js/react-vp.svg)](//npmjs.com/package/react-vp)

A React component for easily playing videos on mobile and desktop devices. Comes with video controls and customization for audio slider and video seekbar to match the theme of your website.

### Requirements
1. React and React-dom 16.5.2 or greater

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
              colors={{
                audioThumb: 'rgb(0, 125, 255)',
                audioSlider: '#ccc',
                videoThumb: 'rgb(0, 125, 255)',
                seekbarPlayed: 'rgb(0, 125, 255)',
                seekbarProgress: '#ccc',
                seekbarBackground: 'rgb(58, 61, 80)'
              }}
              />
  }
}
```
Demo page: [`https://mellocloud.com/react-video-player`](https://mellocloud.com/react-video-player)

### Props

Prop | Description | Required
---- | ----------- | -------
`className` | Css class for the video container, this will be applied to the desktop version of the video player. | no
`mobileClassName` | Css class for the video container, this will be applied to the mobile version of the video player. | no
`videoPath` | Path to the video you want to play. | yes
`videoThumbnail` | Path to the video thumbnail. | yes
`isMobile` | This is a bool, how you determine if the user is on desktop or mobile is up to you or you can put false if its only for desktop. | yes
`colors` | This is an object with colors so you can customize your video player to match your theme. By default its blue and grayish | no

# What I Learned

1. To get the offset from a component to the left of the page you can use

```js
let offset = seekbar.getBoundingClientRect().left //used to move the seekbar thumb.
```

2. CSS modules, how to hash css classnames so that they don't interfere with existing CSS classes when bringing this into your project.

3. npm link, how to test npm packages before releasing them.

4. Last but not least I learned a ton about videos on the web including Media Events, Fullscreen API, and Media Source Extensions. If you are interested in learning more about video players here is a great tutorial series from Google chrome developers youtube channel https://www.youtube.com/watch?v=--KA2VrPDao&t=8s