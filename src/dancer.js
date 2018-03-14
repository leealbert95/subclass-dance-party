// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {


  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"><img class="img"/></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  
  this.step();
  this.center = {y: top + this.$node.height() / 2, x: left + this.$node.width() / 2};

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

};

Dancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  
  var newY = top + this.$node.height() / 2;
  var newX = left + this.$node.width() / 2;
  
  var styleSettings = {
    top: top,
    left: left
  };
  
  this.center.y = newY;
  this.center.x = newX;
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function(topPos) {
  var styleSettings = {
    top: topPos, 
    left: this.lineUpPosition
  };
  this.$node.css(styleSettings);
};
