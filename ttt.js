var N_SIZE = 3,
EMPTY="&nbsp;",
boxes=[],
turn="#",
score,
moves;

function init() {
    var board = document.createElement('table');
    board.setAttribute("border",1);
    board.setAttribute("cellspacing", 0);

    var identifier = 1;
    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement("tr");
        board.appendChild(row);
        for(var j =0; j<N_SIZE;j++){
            var cell = document.createElement("td");
            cell.setAttribute('height',240);
            cell.setAttribute('width',240);
            cell.setAttribute('align','center');
            cell.setAttribute('valign','center');
            cell.classList.add('col'+j,'row'+i);

            if(i==j){
                cell.classList.add('diagonal0');   
            }
            if(j==N_SIZE-i-1){
                cell.classList.add('diagonal1');
            }
            cell.identifier = identifier;
            cell.addEventListener("click",set);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;

        }
        
    }
    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

function startNewGame() {
    score = {
        "#":0,
        "O":0
    };
    moves=0;
    turn="#";
    boxes.forEach(square => {
        square.innerHTML = EMPTY;
    });

}

// check if win or not
function win(clicked) {
    var memberOf = clicked.className.split(/\s+/);
    for(var i=0; i<memberOf.length; i++){
        var testClass = '.'+memberOf[i];
        var items = contains('#tictactoe '+testClass, turn);

        if (items.length == N_SIZE){
            return true;
        }
    }    
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}


function set() {
    if(this.innerHTML !== EMPTY){
        return;
    }
    // this.innerHTML = '';
    var img = document.createElement("img");
    img.setAttribute('height',120);
    img.setAttribute('width',120);
    img.setAttribute('align','center');
    img.setAttribute('valign','center');
    if(turn==="#"){
        img.setAttribute('src','sasuke.png');
        
    }
    else{
        img.setAttribute('src','naruto.png');
    }
    
    this.innerHTML = turn;
    this.appendChild(img);
    moves += 1;
    score[turn] += this.identifier;
    if(win(this)){
        // alert('Winner : Player '+turn );
        document.getElementById('content').textContent = "Player "+turn+" WINS!!!";
        startNewGame();
    }   
    else if(moves===N_SIZE*N_SIZE){
        // alert("DRAW");
        document.getElementById('content').textContent = "DRAW!!!";
        startNewGame();
    }
    else{
        turn = turn === "#" ? "O" : "#";
        document.getElementById('turn').textContent = "Player "+turn;
    }
    
}


init();