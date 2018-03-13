$(document).ready(function() {
  window.blinkydancers = [];
  window.morphdancers = [];
  window.breakdancers = [];
  window.dancerState = 'random';
  window.stalkingNode;

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */
  
    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
  
    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    if (dancerMakerFunctionName === 'BlinkyDancer') {
      window.blinkydancers.push(dancer);
    }
    if (dancerMakerFunctionName === 'BreakDancer') {
      window.breakdancers.push(dancer);
    }
    if (dancerMakerFunctionName === 'MorphDancer') {
      window.morphdancers.push(dancer);
    }
    $('body').append(dancer.$node);

    if (window.dancerState === 'lined') {
      lineUpDancerGroup(window.blinkydancers);
      lineUpDancerGroup(window.breakdancers);
      lineUpDancerGroup(window.morphdancers);
    }  
  });
  
  var lineUpDancerGroup = function(dancers) {
    for (var i = 0; i < dancers.length; i++) {
      dancers[i].lineUp(i * 70);
    }
  };


  $('#lineUp').on('click', function(event) {
    window.dancerState = 'lined';
    lineUpDancerGroup(window.blinkydancers);
    lineUpDancerGroup(window.breakdancers);
    lineUpDancerGroup(window.morphdancers);
  });

  $('.dancer').on('click', function(event) {
    if (this instanceof InteractingDancer) {
      window.stalkingNode = this;
    } else {
      if (window.stalkingNode) {
        stalkingNode.setTarget(this);
      }
    }
  });

});

