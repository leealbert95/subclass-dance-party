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
  var instance = this;
  $(this.$node).on('click', function(event) {
    if (window.targetNode) {
      instance.setTarget(window.targetNode);
    }
  });

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

  var getDistance = function() {
    var targetPosition = $(this.target).position();
    var targetY = targetPosition.top + $(this.target).height() / 2;
    var targetX = targetPosition.left + $(this.target).width() / 2;
    
    return Math.sqrt(Math.pow(this.center.x - targetX, 2) + Math.pow(this.center.y - targetY, 2));
  };
  
  var moveStraight = function() {
    var targetPosition = $(this.target).position();
    var targetY = targetPosition.top + $(this.target).height() / 2;
    var targetX = targetPosition.left + $(this.target).width() / 2;
  
    var distanceY = (targetY - this.center.y);
    var distanceX = (targetX - this.center.x);
    var deltaY = 5;
    var deltaX = 5 * (distanceX/distanceY);
    if (distanceY < 0) {
      deltaY *= -1;
      deltaX *= -1;
    }

    var thisPosition = $(this.$node).position();
    this.setPosition(thisPosition.top + deltaY, thisPosition.left + deltaX);
  };

  var orbit = function() {

  };
  if (this.state === this.states[0] && this.target) {
    var distance = getDistance.call(this);
    if (distance > 150) {
      moveStraight.call(this);
    } 
  } 

  if (this.state === this.states[1]) {
    orbit();  
  }
  // var randNum = (Math.random() * Math.floor(this.frames.length));
  // this.$node.css({width: `${this.frames[randNum]}`});
  // this.frameCount++;
  // if(this.frameCount === this.frameLimit) {
  //   this.frameCount = 0;
  // }
  console.log($(this.$node).position());
};

InteractingDancer.prototype.setTarget = function(target) {
  this.target = target;
};

InteractingDancer.prototype.lineUp = function(topPos) {
  this.state = this.states[2];
  Dancer.prototype.lineUp.call(this, topPos);
};