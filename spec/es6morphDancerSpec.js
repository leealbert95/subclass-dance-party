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

  it('should have a step function that makes its node blink', function() {
    sinon.spy(morphDancer.$node, 'toggle');
    morphDancer.step();
    expect(morphDancer.$node.toggle.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(morphDancer, 'step');
      expect(morphDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); 

      expect(morphDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(morphDancer.step.callCount).to.be.equal(2);
    });
  });
});