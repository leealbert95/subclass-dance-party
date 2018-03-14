var interactingDancer = class interactingDancer extends Dancer {
  
  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);
    
    this.frames = ['10px', '30px', '50px', '60px', '80px','60px', '50px', '30px', '10px', '1px' ];
    this.states = ['searching', 'orbitting', 'lined'];
    this.frameCount = 0;
    this.frameLimit = 10;
    this.lineUpPosition = '800px';
    this.state = this.states[0];
    this.target;
    this.orbitTime;
    
    super.step.call(this);

    var instance = this;
    $(this.$node).on('click', function(event) {
      if (window.targetNode) {
        instance.setTarget(window.targetNode);
      }
    });
  
    $(this.$node).children().attr('src', 'https://thumbs.gfycat.com/BoldConsiderateAndeancockoftherock-max-1mb.gif');
  }
  
  step() {
    super.step.call(this);
  
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
      var t = (Date.now() - this.orbitTime)/1000;
      var r = 150;
      var targetPosition = $(this.target).position();
      var targetY = targetPosition.top;
      var targetX = targetPosition.left;
      var newLeft = Math.floor(targetX + (r * Math.cos(t)));
      var newTop = Math.floor(targetY + (r * Math.sin(t)));
      this.setPosition(newTop, newLeft);
    };

    if (this.state === this.states[0] && this.target) {
      var distance = getDistance.call(this);
      if (distance > 150) {
        moveStraight.call(this);
      } else {
        this.state = this.states[1];
      }
    }  

    if (this.state === this.states[1]) {
      if (!this.orbitTime) {
        this.orbitTime = Date.now();
      }
      orbit.call(this);  
    }
  }
  
  setTarget(target) {
    this.target = target;
  }
  
  lineUp(topPos) {
    this.state = this.states[2];
    super.lineUp.call(this, topPos);
  }
  
  reset() {
    this.state = this.states[0];
  } 
   
};




















