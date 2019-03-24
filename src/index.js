import Polaroid from './Polaroid.js'
window.onload = function() {
  const manager = new Polaroid()
  // manager.camera = false
  // manager.videoSrc = 'asset/video/trial.mp4'
  manager.run()
};