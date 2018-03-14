var MorphDancer = class MorphDancer extends Dancer {
  
  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);
    
    $(this.$node).on('click', function(event) {
      window.targetNode = this;
    });
    super.step.call(this);
    $(this.$node).children().attr('src', 'https://media.giphy.com/media/RyAuIdvXOugUw/giphy.gif');
  }
  
  step() {
    super.step.call(this);
    var randNum = (Math.random() * Math.floor(this.frames.length));
    this.$node.css({width: `${this.frames[this.frameCount]}`, height: `${this.frames[this.frameCount]}`});
    this.frameCount++;
    if(this.frameCount === this.frameLimit) {
      this.frameCount = 0;
    }
  }
  
  lineUp(topPos) {
    super.lineUp.call(this, topPos);
  }
};