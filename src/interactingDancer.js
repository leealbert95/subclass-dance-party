var InteractingDancer = function(top, left, timeBetweenSteps) {
  this.frames = ['10px', '30px', '50px', '60px', '80px','60px', '50px', '30px', '10px', '1px' ];
  this.states = ['searching', 'orbitting', 'lined'];
  this.frameCount = 0;
  this.frameLimit = 10;
  this.lineUpPosition = '800px';
  this.state = this.states[0];
  this.target;

  Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

};

InteractingDancer.prototype = Object.create(Dancer.prototype);
InteractingDancer.prototype.constructor = InteractingDancer;

InteractingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this); 
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  

  // Do some fancy logic to find nearby node
  // Dancer.prototype.setPosition.call(this, newtop, newleft);
  
  // this.target is an html element
  var moveToTarget = function() {
    var targetPosition = this.target.position();
    var targetY = targetPosition.top + targetPosition.height() / 2;
    var targetX = targetPosition.left + targetPosition.width() / 2;
  };

  var orbit = function() {};
  
  
  if (this.state === this.states[0] && this.target) {
    moveToTarget();
  } 
  if (this.state === this.states[1]) {
    orbit();  
  }
  var randNum = (Math.random() * Math.floor(this.frames.length));
  this.$node.css({width: `${this.frames[randNum]}`});
  this.frameCount++;
  if(this.frameCount === this.frameLimit) {
    this.frameCount = 0;
  }
};

InteractingDancer.prototype.setTarget = function(target) {
  this.target = target;
};

InteractingDancer.prototype.lineUp = function(topPos) {
  this.state = this.states[2];
  Dancer.prototype.lineUp.call(this, topPos);
};