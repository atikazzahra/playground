const similarity = require('compute-cosine-similarity')
export default class ImageTracker extends tracking.Tracker {
  constructor() {
    super();
    this.templateKeypoints_ = null;
    this.fastThreshold = 60;
    this.blur = 3;
  }
  setTemplate(keypoints, descriptor) {
    this.templateKeypoints_ = keypoints;
    this.templateDescriptors_ = descriptor;
  }
  track(pixels, width, height) {
    const blur = tracking.Image.blur(pixels, width, height, this.blur);
    const grayscale = tracking.Image.grayscale(blur, width, height);
    const keypoints = tracking.Fast.findCorners(grayscale, width, height, this.fastThreshold);
    this.emit('track', {
      corners: keypoints,
      match: this.getSimilarity(this.templateKeypoints_, keypoints)
    });
  }
  getSimilarity(templateKP, trackedKP) {
    if (trackedKP.length < 120) {
      return false
    }
    const maxLength = templateKP.length >= trackedKP.length ? trackedKP.length : templateKP.length
    const slicedTemplateKP = templateKP.slice(0, maxLength)
    const slicedTrackedKP = trackedKP.slice(0, maxLength)
    const cosineSimilarity = similarity(slicedTemplateKP, slicedTrackedKP);
    console.log(cosineSimilarity)
    const distance = 2 * (1 - cosineSimilarity);
    console.log(Math.sqrt(distance))
    return Math.sqrt(distance) >= 0.5
  }
}