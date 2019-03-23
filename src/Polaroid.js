import ImageTracker from './ImageTracker.js'

export default class Polaroid {
  constructor() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.action = document.getElementById('action');
    this.gif = document.getElementById('ghost');
    this.loading = document.getElementById('loading')
    this.context = canvas.getContext('2d');
    this.tracker = new ImageTracker();
    this.camera = true;
    this.videoSrc = '';
    this.trackerTask = null;
    this.match = 0;
    this.showCorners = false
    this.template = {}
  }
  run() {
    this.initTracker()
    this.startTracking()
    if (this.video.readyState === 4) {
      this.loading.remove()
      this.trackerTask.run()
      this.initActionListener()
    } else {
      this.video.onloadeddata = () => {
        this.loading.remove()
        this.trackerTask.run()
        this.initActionListener()
      }
    }
  }
  initTracker() {
    this.tracker.templateKeypoints_ =  this.template

    this.tracker.on('track', (event) => {
      this.requestFrame(event)
      this.isImageDetected(event.match)
    });
  }
  startTracking() {
    let options = {}
    if (this.camera) {
      options =  { 
        camera: this.camera,
        mediaConstraints: {
          video: {
            width: { exact: 300 },
            height: { exact: 300 }
          }
        }
      }
    } else {
      this.video.setAttribute('src', this.videoSrc);
    }
    this.trackerTask = tracking.track('#video', this.tracker, options);
    this.trackerTask.stop();
  }
  initActionListener() {
    this.action.onclick = () => {
      const onPause = this.action.classList.contains('onpause');
      const onPlay = this.action.classList.contains('onplay');
      if (onPause) {
        this.trackerTask.run();
        this.action.classList.remove('onpause');
        this.action.classList.add('onplay');
      } else if (onPlay) {
        this.trackerTask.stop();
        this.action.classList.remove('onplay');
        this.action.classList.add('onpause');
      }
    };
  }
  isImageDetected(match) {
    if (match) {
      this.gif.classList.remove('hide');
    } else {
      this.gif.classList.add('hide');
    }
  }
  requestFrame(event) {
    window.requestAnimationFrame(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      try {
        this.context.drawImage(this.video, 0, 0, this.video.width, this.video.height);
        if (this.showCorners && event.match) {
          for (let i = 0; i < event.corners.length; i += 2) {
            this.context.fillStyle = '#0f0';
            this.context.fillRect(event.corners[i], event.corners[i + 1], 3, 3);
          }
        }
      } catch (err) {}
    });
  }
}