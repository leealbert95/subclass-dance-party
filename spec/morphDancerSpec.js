describe('morphDancer', function() {

  var morphDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    morphDancer = new MorphDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(morphDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that changes its frame counter', function() {
    var oldCounter = morphDancer.frameCounter;
    morphDancer.step();
    var newCounter = morphDancer.frameCounter;
    expect(newCounter === oldCounter).to.be.false;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(morphDancer, 'step');
      expect(morphDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(morphDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(morphDancer.step.callCount).to.be.equal(2);
    });
  });
});