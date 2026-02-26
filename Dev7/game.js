

"use strict"; // Do NOT remove this directive!


const xGrid = 7;
const yGrid = 10;
const bottomRow = 9;
const furtherestRow = xGrid - 2;
const gameNam = "I-90";

let boatx, boaty; 
let endState, _play;
let score = 0;

/*Function to check if the x value is within the grid*/
function xCheck(xCoord)
{
	var xReturn = true;

	if(xCoord < 1 || xCoord > furtherestRow)
	{
		xReturn = false;
	}	

	return xReturn;
}


function colorEdges()
{
	for(var i = 0; i < yGrid; i+=1)
	{
		PS.color(0, i, 76, 173, 37);
	}
	for(var i = 0; i < yGrid; i+=1)
	{
		PS.color(xGrid - 1, i, 76, 173, 37);
	}

	return null;
}



//Attempt 2 to make the cars work for the game
var Car = 
{
	r: PS.random(255),
	g: PS.random(255),
	b: PS.random(255),

	framerate: 5, //animation frames of 6/60, or 10 frames per second

	dropX: [],
	dropY: [],

	exit: function()
	{
		PS.audioPlay("fx_ding", {volume: 0.80});
	},

	//Helps fun the animation
	tick: function()
	{
		var len, i, x, y;

		len = Car.dropX.length;

		i = 0;
		while(i < len)
		{
			x = Car.dropX[i];
			y = Car.dropY[i];

			if(y < bottomRow)
			{
				PS.color(x,y,PS.COLOR_WHITE);
				y += 1;
				Car.dropY[i] = y;
				PS.color(x, y, );

				if(y < bottomRow)
				{
					PS.color(x,y, Car.r, Car.g, Car.b);
				}
				else if(x == boatx && y == boaty)
				{
					endState = true;
					Car.exit();
				}
				else
				{
					Car.exit();
					score += 1;
				}
				i += 1;
			}
			else
			{
				Car.dropX.splice(i,1);
				Car.dropY.splice(i,1);

				len -= 1;
			}
			
		}
	}
}

var mainRun =
{
	tickRate: 30,

	endScreen: function()
	{
		_play = false;
		PS.statusColor(9, 15, 6);
		PS.statusText("Cars Passed: " + score + " | Press 'r' to restart");
		PS.color(PS.ALL, PS.ALL, 118, 145, 108);
	},

	reset: function()
	{
		_play = true;
		endState = false;
		score = 0;
		PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE)
		colorEdges();
		boatx = 2; boaty = yGrid - 1;
		PS.color(boatx, boaty, 92, 91, 48);
	},

	mainLoop: function()
	{
		let Xstart = PS.random(4) + 1;

		if(endState != true)
		{
			Car.dropX.push(Xstart);
			Car.dropY.push(0);
			PS.audioPlay("fx_click", {volume: 0.70});
		}	
		else
		{
			mainRun.endScreen();
		}
	}

}


//Initalizes the game to start
PS.init = function( system, options ) 
{
	endState = false;
	_play = true;

	//Sets the grid and starting position of the car
	PS.gridSize( xGrid, yGrid );
	PS.gridColor(190, 255, 164);
	boatx = 2; boaty = yGrid - 1;

	PS.statusText(gameNam + " | Cars Passed: " + score);
	PS.border(PS.ALL, PS.ALL, 0);

	//Colors the edges of the grid
	colorEdges();

	PS.color(boatx, boaty, 92, 91, 48);

	//Runs the enemy creation and animation speed
	PS.timerStart(Car.framerate, Car.tick);
	PS.timerStart(mainRun.tickRate, mainRun.mainLoop);
};

PS.keyDown = function( key, shift, ctrl, options ) 
{
	if(_play != false)
	{
		//This moves the player character to the left
		if(key == PS.KEY_ARROW_LEFT && xCheck(boatx - 1) == true)
		{
			PS.color(boatx, boaty, PS.COLOR_WHITE);
			boatx -= 1;
			PS.color(boatx, boaty, 92, 91, 48);
			PS.audioPlay("fx_zurp", {volume: 0.25});
		}
		//This moves the player character to the right
		else if(key == PS.KEY_ARROW_RIGHT && xCheck(boatx + 1) == true)
		{
			PS.color(boatx, boaty, PS.COLOR_WHITE);
			boatx += 1;
			PS.color(boatx, boaty, 92, 91, 48);
			PS.audioPlay("fx_zurp", {volume: 0.25});
		}
		//This is when the player hits the edge of the road.
		else
		{
			PS.statusText("Your at the edge.");
			PS.audioPlay("fx_uhoh");
		}
	}
	//This is called when the game can be restarted
	else if(key == 114 && _play == false)
	{
		//PS.debug("Restart state is being found.");
		mainRun.reset();
	}

};



PS.keyUp = function( key, shift, ctrl, options ) 
{	
	PS.statusText(gameNam + " | Cars Passed: " + score);
};



