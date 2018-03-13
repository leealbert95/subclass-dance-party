var MorphDancer = function(top, left, timeBetweenSteps) {
  this.frames = ['10px', '30px', '50px', '60px', '80px','60px', '50px', '30px', '10px', '1px' ];
  this.frameCount = 0;
  this.frameLimit = 10;
  this.lineUpPosition = '200px';

  Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

};

MorphDancer.prototype = Object.create(Dancer.prototype);
MorphDancer.prototype.constructor = MorphDancer;

MorphDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this); 
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  var randNum = (Math.random() * Math.floor(this.frames.length));
  this.$node.css({width: `${this.frames[this.frameCount]}`});
  this.frameCount++;
  if(this.frameCount === this.frameLimit) {
    this.frameCount = 0;
  }
};

MorphDancer.prototype.lineUp = function(topPos) {
  Dancer.prototype.lineUp.call(this, topPos);
};