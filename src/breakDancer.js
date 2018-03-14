var BreakDancer = function(top, left, timeBetweenSteps) {
  // Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  this.angle = 0;
  this.frameCounter = 0; 
  this.frameLimit = 5;
  this.lineUpPosition = '400px';

  Dancer.call(this, top, left, timeBetweenSteps);
  $(this.$node).on('click', function(event) {
    window.targetNode = this;
  });
  
  $(this.$node).children().attr('src', 'https://zippy.gfycat.com/LavishVastBluejay.gif');
};

BreakDancer.prototype = Object.create(Dancer.prototype);
BreakDancer.prototype.constructor = BreakDancer;

BreakDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this); 
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.css({"transform": `rotate(${this.angle}deg)`,});
  
  this.frameCounter++;
  this.angle += 20;
  
  if (this.frameCounter === this.frameLimit) {
    this.frameCounter = 0;
  }
  if (this.angle === 360) { 
    this.angle = 0;
  }
};

BreakDancer.prototype.lineUp = function(topPos) {
  Dancer.prototype.lineUp.call(this, topPos);
};