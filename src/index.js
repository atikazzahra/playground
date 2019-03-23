import Polaroid from './Polaroid.js'
import corners from './corners.json'

window.onload = function() {
  const manager = new Polaroid()
  manager.template = corners
  manager.showCorners = true
  // manager.camera = false
  // manager.videoSrc = 'asset/video/trial.mp4'
  manager.run()
};

