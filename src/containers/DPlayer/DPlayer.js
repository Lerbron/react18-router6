import React, { memo, useEffect } from "react";
import DPlayer from 'dplayer';

import './index.scss'

export default memo(props => {

  useEffect(() => {
    const options = {
      container: document.getElementById('dplayer'),
      autoplay: false,
      theme: '#FADFA3',
      loop: false,
      preload: 'auto',
      // logo: 'logo.png',
      volume: 1,
      mutex: true,
      video: {
        // url: 'https://prod-socraticlab-recording.s3.cn-north-1.amazonaws.com.cn/3a06fbfea1a0373c262ce3fcf5051996/5cd9d72de0f644e1b42f62aab270ec46_2.mp4',
        url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        // pic: 'dplayer.png',
        // thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
        // thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
        type: 'auto',
      },
    }
    const dp = new DPlayer(options);
    dp.on('timeupdate', () => {
      console.log('time---->', dp.video.currentTime)
    })
  }, [])

  return (
    <div id="dplayer"></div>
  )
})