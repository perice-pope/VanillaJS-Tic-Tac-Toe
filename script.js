// MODEL
// Constants (lookup data structures - that don't change)
const COLOR_LOOKUP = {
  '1': 'purple',
  '-1': 'orange',
  'null': 'white'
};

const WIN_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

// State Variables (state is the data that changes as a program runs)
let board;  // array of 9 elements:  null -> empty; 1 or -1 -> player;
let turn;   // 1 or -1
let outcome;  // null -> in progress; 'T' -> Cat's Game; 1 or -1 player won

// VIEW
// Cache (remember) DOM Elements (if they are "touched" more than once)
const squareEls = Array.from(document.querySelectorAll('section > div'));
const msgEl = document.querySelector('h2');
const replayBtn = document.querySelector('button');

// GLUE (connection to the View/DOM)
// Event Listeners
document.querySelector('section')
  .addEventListener('click', handleMove);

replayBtn.addEventListener('click', initialize);

// CONTROLLER (Functions)

// initialize all state, then call render (means to display or visualize data)
initialize();

function initialize() {
  board = [null, null, null, null, null, null,null, null, null];
  turn = 1;
  outcome = null;
  render();
}

// The render function's responsibity to visualize all state
// and hide/show "controls"
function render() {
  // render the board
  squareEls.forEach((el, idx) => {
    el.style.backgroundColor = COLOR_LOOKUP[board[idx]];
  });
  renderMsg();
  replayBtn.style.visibility = outcome ? 'visible' : 'hidden';
}

function renderMsg() {
  if (outcome === 'T') {
    msgEl.innerHTML = "It's Another Cat's Game";
  } else if (outcome) {
    msgEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[outcome]}">${COLOR_LOOKUP[outcome].toUpperCase()} Wins!</span>`;
  } else {
    msgEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}'s Turn</span>`;
  }
}

// In response to user interaction, e.g., player clicked a square,
// update all impacted state, then call render
function handleMove(evt) {
  const idx = squareEls.indexOf(evt.target);
  if (idx === -1 || outcome) return;
  board[idx] = turn;
  outcome = getOutcome();
  turn *= -1;
  render();
}

function getOutcome() {
  for (let combo of WIN_COMBOS) {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) return turn;
  }
  return board.includes(null) ? null : 'T';
}
