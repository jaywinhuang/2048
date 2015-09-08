var board = new Array();
var score = 0;
var hasConflicted = new Array();
//var my_list = {2:'好',4:'真好',8:'很好',16:'非常好',32:'好的很',64:'太好了',128:'好极了',256:'就是好',512:'实在是好',1024:'大家都说好',2048:'好到没话说'}
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){

	if (documentWidth > 500){
		gridContainerWidth = 500;
		cellSideLength = 100;
		cellSpace = 20;

	}

	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius', 0.02*gridContainerWidth);

	$('.grid-cell').css('width', cellSideLength);
	$('.grid-cell').css('height', cellSideLength);
	$('.grid-cell').css('border-radius', 0.02*cellSideLength);
}

function newgame() {
	init();
	generateOneNumber();
	generateOneNumber();
};

function init () {
	for ( var i = 0; i < 4; i++ ){
		for ( var j = 0; j < 4; j ++ ){
			 var gridCell = $("#grid-cell-" + i + "-" + j);
			 gridCell.css("top", getPosTop(i, j));
			 gridCell.css("left", getPosLeft(i, j));
		}
	}

	for ( var i = 0; i < 4; i ++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for ( var j = 0; j < 4; j ++){
			board[i][j] = 0;
			hasConflicted[i][j] = 0;
		}
	}

	score = 0;
	$('#score').text(0);
	updateBoardView();
	
};

function updateBoardView() {

    $(".number-cell").remove();
    for(var i = 0; i <  4; i++)
        for (var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);

            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength / 2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength / 2 );
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                //theNumberCell.css('font-size', getFontSize(board[i][j]));
                theNumberCell.text( board[i][j] );
            }
            hasConflicted[i][j] = 0;
        }

    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength + 'px');
};

function generateOneNumber(){
	if (nospace(board))
		return false;

	//随机一个位置
	var randx = parseInt( Math.floor(Math.random() * 4) ); 
	var randy = parseInt( Math.floor(Math.random() * 4) );

	var times = 0; 
	while (times < 50) {
		if (board[randx][randy] == 0)
			break;
		randx = parseInt( Math.floor(Math.random() * 4) ); 
		randy = parseInt( Math.floor(Math.random() * 4) ); 

		times ++;
	} 
	if (times == 50){
		for (var i = 0; i < 4; i++)
			for (var j = 0; j < 4; j++){
				if (board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
	}

	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	//Show the number at random (x,y)
	board[randx][randy] = randNumber;
	showNumberWithAnimation( randx, randy, randNumber);

	return true;
};

$(document).keydown( function(event){

	switch (event.keyCode){
		case 37://left
			event.preventDefault();
			if (moveLeft()){
				setTimeout("generateOneNumber()",150); 
				setTimeout("isGameOver()",200);
			}
			break;
		case 38: //up
			event.preventDefault();
			if (moveUp()){
				setTimeout("generateOneNumber()",150); 
				setTimeout("isGameOver()",200);
			}
			break;
		case 39: //right
			event.preventDefault();
			if (moveRight()) {
				setTimeout("generateOneNumber()",150); 
				setTimeout("isGameOver()",200); 
			}
			break;
		case 40: //down
			event.preventDefault();
			if (moveDown()) {
				setTimeout("generateOneNumber()",150); 
				setTimeout("isGameOver()",200);
			}
			break;
		default: break;
	}
});

document.addEventListener('touchstart', function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;

});

document.addEventListener('touchmove', function(event){
	event.preventDefault();
});

document.addEventListener('touchend', function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY; 

	var deltax = endx - startx;
	var deltay = endy - starty;

	if (Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth)
		return;

	if (Math.abs(deltax) > Math.abs(deltay)){
		//move in x axiel
		if (deltax > 0){
			//move right
			if (moveRight()) {
				generateOneNumber();
				setTimeout("isGameOver()",200); 
			}
		} else {
			//move left
			if (moveLeft()){
				generateOneNumber();
				setTimeout("isGameOver()",200);
			}
		}
	} else {
		//move in y axiel
		if (deltay > 0){
			//move down
			if (moveDown()) {
				generateOneNumber();
				setTimeout("isGameOver()",200);
			}
		} else {
			//move up
			if (moveUp()){
				generateOneNumber();
				setTimeout("isGameOver()",200);
			}
		}
	}
});


function isGameOver (){

	for (var i = 0; i < 4; i++){
		for (var j = 0; j <4; j++){
			if (board[i][j] == 0){
				return false;
			} else if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)){
				return false;
			}
		}
	}
	alert("Game Over.");
	return true;
}

function moveLeft (){

	if (!canMoveLeft(board))
		return false;

	//move left
	for (var i = 0; i < 4; i++)
		for (var j = 1; j < 4; j++){
			if (board[i][j] != 0){
				for (var k = 0; k < j; k++){
					if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board )){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0; 

						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0; 
						//add score
						score += board[i][k];
						hasConflicted[i][k] = true;
						updateScore(score);

						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",100);
	return true;
}

function moveUp (){
	if(!canMoveUp(board))
		return false;
	//move up
	for (var j = 0; j < 4; j++){
		for (var i = 1; i < 4; i ++){
			if (board[i][j] != 0){
				for (var k = 0; k < i; k++){
					if (board[k][j] == 0 && noBlockVertical(k, i, j, board )){
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board ) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						hasConflicted[k][j] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 100);
	return true;
}

function moveRight(){
	if (!canMoveRight(board))
		return false;

	for (var i = 0; i < 4; i ++){
		for (var j = 2; j >= 0; j--){
			if (board[i][j] != 0){
				for (var k = 3; k > j; k--){
					if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k] ){
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						hasConflicted[i][k] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 100);
	return true;
}

function moveDown(){
	if (!canMoveDown(board))
		return false;

	for (var j = 0; j < 4; j++){
		for (var i = 2; i >= 0; i--){
			if (board[i][j] != 0){
				for (var k = 3; k > i; k--){
					if (board[k][j] == 0 && noBlockVertical(i,k,j,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[k][j] == board[i][j] && noBlockVertical(i,k,j,board) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						hasConflicted[k][j] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 100);
	return true;
}




