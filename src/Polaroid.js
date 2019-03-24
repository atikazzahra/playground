import ImageTracker from './ImageTracker.js'

export default class Polaroid2 {
  constructor() {
    this.tracker = new ImageTracker();
    this.video = document.getElementById('video');
    this.videoCanvas = document.getElementById('canvas');
    this.template = document.getElementById('template')
    this.templateCanvas = document.getElementById('canvas-template');
    this.videoCtx = this.videoCanvas.getContext('2d');
    this.templateCtx = this.templateCanvas.getContext('2d');
    this.error = document.getElementById('error')

    this.action = document.getElementById('action');
    this.gif = document.getElementById('ghost');
    this.loading = document.getElementById('loading');
    this.stopTracking = false;
    this.camera = true
    this.videoSrc = ''
    this.setTimeout = 0
    this.showPlot = false
  }
  run() {
    if (this.camera) {
      this.initCamera()
    } else {
      this.video.setAttribute('src', this.videoSrc);
    }
    if (this.video.readyState === 4) {
      this.loading.remove()
      this.initTracker()
      this.requestFrame()
      this.initActionListener()
    } else {
      this.video.onloadeddata = () => {
        this.loading.remove()
        this.initTracker()
        this.requestFrame()
        this.initActionListener()
      }
    }
  }
  initCamera() {
    var constraints = { 
      audio: false, 
      facingMode: { exact: "environment" },
      video: { width: 300, height: 300 }
     }; 

    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        this.video.srcObject = mediaStream;
        this.video.onloadedmetadata = () => {
          video.play();
        };
      })
      .catch((e) => {
        this.loading.remove()
        this.error.classList.remove('hide');
      })
  }
  initTracker() {
    this.templateCtx.drawImage(this.template, 0, 0, this.template.width, this.template.height);
    try {
      this.videoCtx.drawImage(this.video, 0, 0, this.video.width, this.video.height);
    } catch (err) {}
    this.tracker.templateImage = this.templateCtx
    this.tracker.predictedImage = this.videoCtx
  }
  initActionListener() {
    this.action.onclick = () => {
      const onPause = this.action.classList.contains('onpause');
      const onPlay = this.action.classList.contains('onplay');
      if (onPause) {
        this.stopTracking = false
        this.action.classList.remove('onpause');
        this.action.classList.add('onplay');
      } else if (onPlay) {
        this.stopTracking = true
        this.action.classList.remove('onplay');
        this.action.classList.add('onpause');
      }
    };
  }
  requestFrame() {
    window.requestAnimationFrame(() => {
      if (!this.stopTracking) {
        this.videoCtx.clearRect(0, 0,  this.videoCtx.width,  this.videoCtx.height);
        try {
          this.videoCtx.drawImage(this.video, 0, 0, this.video.width, this.video.height);
        } catch (err) {}
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
          const resultMatch = this.tracker.doMatch()
          this.isImageDetected(resultMatch.result)
          if (this.showPlot) {
            this.drawPlotPoints(resultMatch)
          }
          // console.log(resultMatch.result)
        }
      }
      this.requestFrame()
    })
  }
  drawPlotPoints(result) {
    for (var i = 0; i < result.matches.length; i++) {
      this.videoCtx.fillStyle = '#0f0';
      this.videoCtx.fillRect(result.matches[i].keypoint2[0], result.matches[i].keypoint2[1], 4, 4);
      // this.videoCtx.fillRect(resultMatch.MSE.normPredictedKP[i][0], resultMatch.MSE.normPredictedKP[i][1], 4, 4);
      this.videoCtx.fillStyle = '#e91e63';
      this.videoCtx.fillRect(result.matches[i].keypoint1[0], result.matches[i].keypoint1[1], 4, 4);
      // this.videoCtx.fillRect(resultMatch.MSE.normTemplateKP[i][0], resultMatch.MSE.normTemplateKP[i][1], 4, 4);
    }
  }
  isImageDetected(match) {
    if (match) {
      clearTimeout(this.setTimeout)
      this.setTimeout = 0
      this.gif.classList.remove('hide');
    } else {
      if (!this.gif.classList.contains('hide') && !this.setTimeout) {
        const timeout = setTimeout(() => {
          // console.log('call pls')
          this.gif.classList.add('hide');
          this.setTimeout = 0
        }, 300)
        this.setTimeout = timeout
      }
    }
  }
}