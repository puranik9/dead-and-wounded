var win = false;
var difficulty = +document.getElementById("difficulty-level").value;
let compInput=[];


// Generate array of 4 unique random numbers
function generateCompInput() {
	while (compInput.length < difficulty) {
		const rand = Math.floor(Math.random() * 9);
		if(compInput.indexOf(rand) === -1) {
			compInput.push(rand);
		}
	}
}
generateCompInput();

//Get difficulty level
document.getElementById("difficulty-level").onchange = function(){
	difficulty = +document.getElementById("difficulty-level").value;
	generateCompInput();
	document.getElementById("user-input").maxLength = difficulty;
	console.log(difficulty);
	console.log(compInput);
};

function deadAndWounded(compInput, userInput) {
	const userArray = (""+userInput).split("");
	let dead = 0;
	let wounded = 0;

	for(var i = 0; i < userArray.length; i++){
        if (userArray[i] == compInput[i]) {
            dead++;
        } 
		for (var j = 0; j < userArray.length; j++) {
			if (i !== j && userArray[i] == compInput[j]) {
				wounded++;
			}
		}
	} 

	if (dead === difficulty) {
		win = true;
		return "All dead, you win!";
	}

	return `${dead} dead, ${wounded} wounded`
}

function addResultRow(guessText, resultText) {
	var tableBody = document.getElementById("result-body")
	var guessCell = document.createElement("td");
	var resultCell = document.createElement("td");
	var newRow = document.createElement("tr");
	guessCell.innerHTML = guessText;
	resultCell.innerHTML = resultText;
	newRow.append(guessCell);
	newRow.append(resultCell);
	tableBody.append(newRow)
}

function guess() {
	console.log(difficulty);
	const userInput = document.getElementById("user-input").value;
	const error = document.getElementById("form-errors");

    if (userInput.length === 0 ) {
        error.innerHTML = "Input cannot be empty"
	} else if (isNaN(userInput)) {
        error.innerHTML = "Input must be a number"
	} else if (userInput.length !== difficulty) {
        error.innerHTML = `Input must be ${difficulty} characters`
    } else {
		error.innerHTML = "";

		if (win) {
			return;
		} else {
			addResultRow(userInput, deadAndWounded(compInput, userInput))
		}
    }
}
