var BlinkyDancer = class BlinkyDancer extends Dancer {

  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);

    this.lineUpPosition = '600px';
    this.frames = [0, 10, 20, 30, 40, 50, 40, 30, 20, 10];
    this.frameCounter = 0;
    this.frameLimit = 10;

    super.step.call(this);

    $(this.$node).on('click', function(event) {
      window.targetNode = this;
    });
    $(this.$node).children().attr('src', 'https://vignette.wikia.nocookie.net/spongebob/images/c/c1/Dp.gif/revision/latest?cb=20160718135900');
  }

  step() { 
    super.step.call(this);
    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.
    //this.$node.toggle();
    var height = this.frames[this.frameCounter];
    $(this.$node).css('transform', `translate(0px, -${height}px)`);

    this.frameCounter++; 
    
    if (this.frameCounter === this.frameLimit) {
      this.frameCounter = 0;
    }
    this.$node.toggle();
    super.step();
  }
  
  lineUp(topPos) {
    super.lineUp.call(this, topPos);
  }
};