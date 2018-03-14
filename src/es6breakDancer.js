var BreakDancer = class BreakDancer extends Dancer {
  
  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);
    
    this.angle = 0;
    this.frameCounter = 0; 
    this.frameLimit = 5;
    this.lineUpPosition = '400px';

    super.step.call(this);

    $(this.$node).on('click', function(event) {
      window.targetNode = this;
    });
  
    $(this.$node).children().attr('src', 'https://zippy.gfycat.com/LavishVastBluejay.gif');
  }

  step() {
    //super.step.call();
    
    this.$node.css({"transform": `rotate(${this.angle}deg)`,});
  
    this.frameCounter++;
    this.angle += 20;
  
    if (this.frameCounter === this.frameLimit) {
      this.frameCounter = 0;
    }
    if (this.angle === 360) { 
      this.angle = 0;
    }
  }
  
  lineUp(topPos) {
    super.lineUp.call(this, topPos);
  }
};