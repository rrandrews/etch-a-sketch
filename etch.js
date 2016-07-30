var etchWidth; 
var gradient;

$(document).ready(function()
{
	etchWidth = parseInt($(".etch").css("width"), 10);
	createGrid(16,16);
});


$('.etch').on('mouseenter', '.pixel', function() {

	darkenPixel($(this));

});

$('.bar').on('click', '#reset', function() {
	var size = prompt("Enter new grid size:");
	createGrid(size, size);
});

function createGrid(x, y) {
	resetGrid();

	for (var row = 0; row < y; row++)
	{
		$(".etch").append( '<div class="row" data-row="' + row + '"></div>' );

		for (var col = 0; col < x; col++)
		{
			$('.row[data-row = "' + row + '"]').append('<div class="pixel" data-row="' + row + '" data-col="' + col + '"></div>');
		}
	}

	// Figure out & set the new pixel heigh & width
	var pixelSize = etchWidth / x;
	$(".pixel").css({"width": pixelSize, "height": pixelSize});
	$(".row").css({"height" : pixelSize});


	// creates steps for 10 gradients before hitting black
	gradient = Math.round(getPixelColor($(".pixel")) / 10);
}

function darkenPixel($pixel) {
	var pColor = getPixelColor($($pixel));
	if (pColor - gradient > 0) {
		pColor -= gradient;
	} else pColor = 0;

	$($pixel).css({"background-color": "rgb(" + pColor + ", " + pColor + "," + pColor +")"});
	console.log($($pixel).css("background-color"));
}

function getPixelColor($pixel) {
	// this will fail if the CSS doesn't use rgb()
	var color = parseInt(String($($pixel).css("background-color")).substring(4), 10);
	return color;
}

function resetGrid() {
	$('.row').remove();
}