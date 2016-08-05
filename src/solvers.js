/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



Array.prototype.makeSquare = function(n) {
  var diff = n - this.length;
  var newRow = Array(n);
  for (var j = 0; j < n; j++) {
    newRow[j] = 0;
  }
  for (var i = 0; i < diff; i++) {
    this.push(newRow);
  }
};

window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      if (board.isLegalRookPlay(row, col)) {
        board.togglePiece(row, col);
      }
    }
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var count = 0;
  var board = new Board({'n': n});
  var testingBoard = board.rows();
  var rowDepthIndex = -1;

  var recurse = function () {
    if (rowDepthIndex === n - 1) {
      var toTest = new Board(testingBoard);

      if (!(toTest.hasAnyColConflicts() || toTest.hasAnyRowConflicts())) {
        count++; 
      }
      return;
    }

    rowDepthIndex++;

    for (var i = 0; i < n; i++) {
      testingBoard[rowDepthIndex][i] = 1;
      var testBoard = new Board(testingBoard);
      if (!testBoard.hasAnyRookConflicts) {
        recurse();
      }
      testingBoard[rowDepthIndex][i] = 0;
    }
    rowDepthIndex--;
  };
  recurse([]);

  var solution = count;
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var count = 0;
  var board = new Board({'n': n});
  var rowDepthIndex = -1;
  var firstSol = [];

  var recurse = function () {
    if (rowDepthIndex === n - 1) {
      firstSol = board.rows();
      return;
    }

    rowDepthIndex++;

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowDepthIndex, i);
      if (!(board.hasColConflictAt(i) || 
            board.hasMajorDiagonalConflictAt(i - rowDepthIndex) || 
            board.hasMinorDiagonalConflictAt(i + rowDepthIndex))) {
        recurse();
      }
      if (firstSol.length !== 0) {
        return;
      }
      board.togglePiece(rowDepthIndex, i);
    }
    rowDepthIndex--;
  };
  recurse([]);

  var solution = firstSol;
  if (solution.length === 0) { 
    var retBoard = new Board({'n': n});
    solution = retBoard.rows(); 
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var count = 0;
  var board = new Board({'n': n});

  var rowDepthIndex = -1;

  var recurse = function () {
    if (rowDepthIndex === n - 1) {
      count++; 
      return;
    }

    rowDepthIndex++;

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowDepthIndex, i);

      // if (!board.hasAnyQueensConflicts()) {
      if (!(board.hasColConflictAt(i) || 
          board.hasMajorDiagonalConflictAt(i - rowDepthIndex) || 
          board.hasMinorDiagonalConflictAt(i + rowDepthIndex))) {
        recurse();
      }
      board.togglePiece(rowDepthIndex, i);
    }
    rowDepthIndex--;
  };
  recurse([]);

  var solution = count;
  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};

