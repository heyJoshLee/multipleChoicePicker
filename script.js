var $saveList = $("#saveList"),
$editList = $("#editList"),
$listInput = $("#listInput"),
$listOutput = $("#listOutput"),
$answerSection = $("#answerSection"),
choices = [],
$choiceNumber = $("#choiceNumber")
choiceNumber =  0
slectedAnswer = "";

$saveList.on("click", function() {
  $(this).hide();
  $listInput.hide();
  $answerSection.show();
  $editList.show();
  choices = convertInputToSelection();
  createSelectionHTML(choices);
});

$editList.on("click", function() {
  $(this).hide();
  $listInput.show();
  $answerSection.hide();
  $saveList.show();
  clearAnswerSelection();
});

$choiceNumber.on("change", function() {
  choiceNumber = $(this).val();
})

function clearAnswerSelection() {
  $("#answerSelection").remove();
}

$(document).on("click", ".answer", function() {
  selectedAnswer = $(this).val();
  fillInChoices();
})

function fillInChoices() {

  // TODO: refactor this function
  $listOutput.empty();
  var shuffledChoices = shuffleArray(choices).filter(function(n) {
    return n !== undefined;
  });

  var outputArray = [selectedAnswer],
    amountToChoose = choiceNumber;
  
  // don't have more choices than in answer bank
  if (shuffledChoices.length < choiceNumber) {
    amountToChoose = shuffledChoices.length;
  }

  // fill array
  var i = 0;
  while(outputArray.length < amountToChoose) {
    if (shuffledChoices[i] !== selectedAnswer) { 
      outputArray.push(shuffledChoices[i])
    }
    i++;
  }
  outputArray = shuffleArray(outputArray)
  // create the html
  $listOutput.append("<ul id='outputList'></ul>");
  for(var i = 0; i < outputArray.length; i++) {
    $("#outputList").append("<li>" + outputArray[i] +"</li>")
  }
}


function createSelectionHTML(choices) {
  if (choices.length === 0 || choices[0] === "") {
    $answerSection.append("<h4>You didn't enter any choices!</h4>")
    return;
  }

  $answerSection.append("<select id='answerSelection' class='form-control' multiple> </select>")
  for(var i = 0; i < choices.length; i++) {
    $("#answerSelection").append("<option class='answer' val='" + choices[i] + "'>" + choices[i] + "</option>")    
  }
}

function convertInputToSelection() {
  var input = $listInput.val(),
  choices = input.split("\n");
  return  choices.filter(function(n) {
    return n !== ""
  });
}


function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
}


// set initial values
function startUp() {
  $editList.hide();
  $answerSection.hide();
  choiceNumber = $choiceNumber.val();
}


startUp();