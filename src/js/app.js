var chess = new Chess();
var piecesClasses = {
    "k": "king",
    "q": "queen",
    "r": "rook",
    "b": "bishop",
    "n": "knight",
    "p": "pawn"
};
var colors = {
    "b": "black",
    "w": "white"
}

$(document).ready(function () {
    $("body").height(window.innerHeight);
    chess.reset();
    renderPosition(chess.board());
});

function clearBoard() {
    $(".cell").empty();
}
function renderPosition(position) {
    clearBoard();
    var cells = $(".cell");
    for(var row = 0; row < position.length; row++){
        for(var col = 0; col < position[row].length; col++) {
            var piece = position[row][col];
            if (piece != null) {
                var pieceHTML = document.createElement("div");
                $(pieceHTML).addClass("piece").addClass(piecesClasses[piece.type]).addClass(colors[piece.color])
                $(cells[8*row + col]).append(pieceHTML);
            }

        }
    }
}
function renderMove() {

}
    
