$(document).ready(function() {
  window.blinkydancers = [];
  window.morphdancers = [];
  window.breakdancers = [];
  window.interactingdancers = [];
  window.dancerState = 'random';
  window.targetNode;

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
      100
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
    if (dancerMakerFunctionName === 'InteractingDancer') {
      window.interactingdancers.push(dancer);
    }

    $('body').append(dancer.$node);
    

    if (window.dancerState === 'lined') {
      lineUpDancerGroup(window.blinkydancers);
      lineUpDancerGroup(window.breakdancers);
      lineUpDancerGroup(window.morphdancers);
      lineUpDancerGroup(window.interactingdancers);
    }  
  });
  
  var lineUpDancerGroup = function(dancers) {
    for (var i = 0; i < dancers.length; i++) {
      dancers[i].lineUp(i * 30);
    }
  };


  $('#lineUp').on('click', function(event) {
    window.dancerState = 'lined';
    lineUpDancerGroup(window.blinkydancers);
    lineUpDancerGroup(window.breakdancers);
    lineUpDancerGroup(window.morphdancers);
    lineUpDancerGroup(window.interactingdancers);
  });

  var disperseDancerGroup = function(dancers) {
    var isInteractingDancer = dancers[0] instanceof InteractingDancer;
    for (var i = 0; i < dancers.length; i++) {
      dancers[i].setPosition($("body").height() * Math.random(), $("body").width() * Math.random());
      if (isInteractingDancer) {
        dancers[i].reset();
      }
    }
  };

  $('#chaosmode').on('click', function(event) {
    window.dancerState = 'random';
    disperseDancerGroup(window.blinkydancers);
    disperseDancerGroup(window.breakdancers);
    disperseDancerGroup(window.morphdancers);
    disperseDancerGroup(window.interactingdancers);
  });
});

