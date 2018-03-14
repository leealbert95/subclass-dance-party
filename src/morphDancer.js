var MorphDancer = function(top, left, timeBetweenSteps) {
  this.frames = ['150px', '170px', '190px', '210px', '230px','210px', '190px', '170px', '150px'];
  this.frameCounter = 0;
  this.frameLimit = 9;
  this.lineUpPosition = '200px';

  Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  $(this.$node).on('click', function(event) {
    window.targetNode = this;
  });

  $(this.$node).children().attr('src', 'https://media.giphy.com/media/RyAuIdvXOugUw/giphy.gif');
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
  this.$node.css({width: `${this.frames[this.frameCounter]}`, height: `${this.frames[this.frameCounter]}`});
  this.frameCounter++;
  if(this.frameCounter === this.frameLimit) {
    this.frameCounter = 0;
  }
};

MorphDancer.prototype.lineUp = function(topPos) {
  Dancer.prototype.lineUp.call(this, topPos);
};

