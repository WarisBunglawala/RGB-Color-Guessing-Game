var numOfSquares = 6;
var colors = [];
var selectedColor;
var squares = document.querySelectorAll(".square");
var rgbdisplay = document.getElementById("rgbdisplay");
var message = document.querySelector("#message");
var heading = document.getElementById("main")
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

//while page load
init();
//setting up everything
function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

//setting up the modes buttons - easy & hard
function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//applying noOfSqaures on the base of mode - 3 & 6
			if(this.textContent === "Easy"){
				numOfSquares = 3;
			}else{
				numOfSquares = 6;
			}
			reset();
		});
	}
}

//setting up the squares logic
function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			//getting the color of clicked square
			var clicked = this.style.backgroundColor;
			//comparing with selectedColor
			if(clicked === selectedColor){
				message.style.color = "green";
				message.textContent = "Correct";
				changeColor(clicked);
				heading.style.backgroundColor = clicked;
				resetButton.textContent = "Play Again?";
			}else{
				message.style.color = "red";
				message.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function reset(){
	colors = generateRandomColors(numOfSquares);
	//change selectedColor
	selectedColor = pickRandomColor();
	//change rgbdisplay text
	rgbdisplay.textContent = selectedColor;
	//change colors in squares
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	heading.style.backgroundColor = "steelblue";
	message.textContent = "";
	resetButton.textContent= "New Colors";
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColor(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = selectedColor;
	}
};

function pickRandomColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = []

	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}