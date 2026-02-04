

"use strict"; // Do NOT remove this directive! This is IMPORANT. 

const xGrid = 16;
const yGrid = 16;

var gameNam = "Flowers!!!";
var isNam = true; 
var numOutside = 0;

var numFlowers = 0; 

//this is the code that is run at the start of program
PS.init = function( system, options ) 
{

	PS.gridSize( xGrid, yGrid );
	PS.gridColor(175, 238, 238);

	PS.statusText(gameNam);

};

//Checks if the x value is within the grid
function xCheck(x)
{
	var xReturn = false; 

	if(x >= 0 && x < xGrid)
	{
		xReturn = true;
	}

	return xReturn; 
}

//checks if the y is within the grid
function yCheck(y)
{
	var yReturn = false; 

	if(y >= 0 && y < yGrid)
	{
		yReturn = true;
	}

	return yReturn; 
}


PS.touch = function( x, y, data, options ) 
{
	var rRan = PS.random(255); 
	var gRan = PS.random(255);
	var bRan = PS.random(255);

	numFlowers = numFlowers + 1;
	
	if(isNam == false)
	{
		PS.statusText(gameNam);
	}

	//This is pain
	PS.color(x,y,255,255,0);
	if(xCheck(x+1) == true && yCheck(y) == true)
	{
		PS.color(x+1,y, rRan, gRan, bRan);
	}
	if(xCheck(x-1) == true && yCheck(y) == true)
	{
		PS.color(x-1,y, rRan, gRan, bRan);
	}
	if(xCheck(x) == true && yCheck(y-1) == true)
	{
		PS.color(x,y-1, rRan, gRan, bRan);
	}
	if(xCheck(x) == true && yCheck(y+1) == true)
	{
		PS.color(x,y+1, rRan, gRan, bRan);
	}
};




PS.exitGrid = function( options ) 
{
	isNam = false; 
	numOutside = numOutside + 1; 
	PS.statusText("Thats not the grid.");

	if (numOutside > 15)
	{
			PS.statusText("Thats still not the grid.");
	}
};


