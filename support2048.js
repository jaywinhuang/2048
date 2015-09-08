documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop (i, j) {
	return cellSpace + i * (cellSpace + cellSideLength);
};

function getPosLeft (i, j) {
	return cellSpace + j * (cellSpace + cellSideLength);
};

function getNumberBackgroundColor( number ){
	switch( number ){
		case 2 : return " #eee4da " ; break;
		case 4 : return " #ede0c8 " ; break;
		case 8 : return " #f2b179 " ; break;
		case 16 : return " #f59563 " ; break;
		case 32 : return " #f67c5f " ; break;
		case 64 : return " #f65e3b " ; break;
		case 128 : return " #edcf72 " ; break;
		case 256 : return " #edcc61 " ; break;
		case 512 : return " #edc850 " ; break;
		case 1024 : return " #edc53f " ; break;
		case 2048 : return " #edc22e " ; break;
	}
	return "black";
};

function getNumberColor(number){
	if (number <= 4)
		return "#776E65";
	return "#f9f6f2";
};

//It is only available when "my_list" is available.
function getFontSize(number){
	switch( number ){
		case 2 : return " 60px " ; break;
		case 4 : return " 50px " ; break;
		case 8 : return " 50px " ; break;
		case 16 : return " 25px " ; break;
		case 32 : return " 25px " ; break;
		case 64 : return " 25px " ; break;
		case 128 : return " 25px " ; break;
		case 256 : return " 25px " ; break;
		case 512 : return " 25px " ; break;
		case 1024 : return " 10px " ; break;
		case 2048 : return " 10px " ; break;
	}
	return "10px";
}

function nospace(board){
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (board[i][j] == 0)
				return false;

	return true;
};

function canMoveLeft( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
};

function canMoveUp (board){

	for (var j = 0; j < 4; j++){
		for (var i = 1; i < 4; i++){
			if (board[i][j] != 0 ){
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j])
					return true;
			}
		}
	}
	return false;
};

function canMoveRight (borad) {

	for (var i = 0; i < 4; i++){
		for (var j = 2; j >= 0; j--){
			if (board[i][j] != 0){
				if (board[i][j+1] == 0 || board[i][j+1] == board[i][j])
					return true;
			}
		}
	}
	return false;
}

function canMoveDown (board) {

	for (var j = 0; j < 4; j++)
		for (var i = 2; i >= 0; i--)
			if (board[i][j] != 0)
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true;
}

function noBlockHorizontal(row, col1, col2, board) {
	for (var i = col1 + 1; i < col2; i++)
		if (board[row][i] != 0)
			return false;
	return true;
};

function noBlockVertical (row1, row2, col, board){
	for (var i = row1 + 1; i < row2; i++){
		if (board[i][col] != 0)
			return false;
	}
	return true;
}













