export default class ImageTracker {
  constructor() {
    this.templateImage = null
    this.predictedImage = null
    this.blurRadius = 5
    this.width = 300
    this.height = 300
    this.matchesThreshold = 15
    this.errorThreshold = 40
  }
  doMatch() {
    const templateTrackData = this.trackImage(this.templateImage)
    const predictedTrackData = this.trackImage(this.predictedImage)
    const matches = tracking.Brief.reciprocalMatch(templateTrackData.keypoints, templateTrackData.descriptor, predictedTrackData.keypoints, predictedTrackData.descriptor);
    return {
      template: templateTrackData,
      predicted: predictedTrackData,
      matches: matches,
      result: this.isMatch(matches)
    }
  }
  isMatch(matches) {
    console.log(matches.length)
    if (matches.length <= this.matchesThreshold) {
      return false
    }
    const RMSE = this.getRMSE(matches)
    console.log(RMSE)
    return RMSE.result <= this.errorThreshold && RMSE.result > 0 ? true : false
  }
  getRMSE(matches) {
    const normTemplateKP = matches.map(x => { return this.normalizeVector(x.keypoint1, 300) })
    const normPredictedKP = matches.map(x => { return this.normalizeVector(x.keypoint2, 300) })
    let sumSquaredErrors = 0
    for (let i = 0; i < normPredictedKP.length; i++) {
      const x = normPredictedKP[i][1] - normTemplateKP[i][1]
      const y = normPredictedKP[i][0] - normTemplateKP[i][0]
      const eucledianDistance = Math.sqrt(x*x + y*y)
      sumSquaredErrors = sumSquaredErrors + Math.pow(eucledianDistance, 2)
    }
    const result = normPredictedKP.length ? Math.sqrt(sumSquaredErrors/normPredictedKP.length) : -1
    return {
      normTemplateKP: normTemplateKP,
      normPredictedKP: normPredictedKP,
      result: result
    }
  }
  normalizeVector(point, scale) {
    const norm = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
    if (norm != 0) {
      const x = scale * point[0] / norm;
      const y = scale * point[1] / norm;
      return [x, y]
    }
    return [0, 0]
  }
  trackImage(context) {
    const imageData = context.getImageData(0, 0, this.width, this.height);
    const imageBlur = tracking.Image.blur(imageData.data, this.width, this.height, this.blurRadius)
    const imageGray = tracking.Image.grayscale(imageBlur, this.width, this.height);
    const keypoints = tracking.Fast.findCorners(imageGray, this.width, this.height);
    const templateDescriptor = tracking.Brief.getDescriptors(imageGray, this.width, keypoints);
    return {
      keypoints: keypoints,
      descriptor: templateDescriptor
    }
  }
}