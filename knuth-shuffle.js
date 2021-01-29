const deck = [
	"2♣",
	"3♣",
	"4♣",
	"5♣",
	"6♣",
	"7♣",
	"8♣",
	"9♣",
	"10♣",
	"J♣",
	"Q♣",
	"K♣",
	"A♣",
	"2♦",
	"3♦",
	"4♦",
	"5♦",
	"6♦",
	"7♦",
	"8♦",
	"9♦",
	"10♦",
	"J♦",
	"Q♦",
	"K♦",
	"A♦",
	"2♥",
	"3♥",
	"4♥",
	"5♥",
	"6♥",
	"7♥",
	"8♥",
	"9♥",
	"10♥",
	"J♥",
	"Q♥",
	"K♥",
	"A♥",
	"2♠",
	"3♠",
	"4♠",
	"5♠",
	"6♠",
	"7♠",
	"8♠",
	"9♠",
	"10♠",
	"J♠",
	"Q♠",
	"K♠",
	"A♠",
];

/**
 *
 * @param {Number} pos1
 * @param {Number} pos2
 */
function swapPositions(pos1, pos2) {
	const arr = this;
	[ arr[pos1], arr[pos2] ] = [ arr[pos2], arr[pos1] ];
}

/**
 *
 * @param {Array} deck
 */
function shuffle(deck) {
	const length = deck.length;
	let filledArray = Array(length).fill(0).map((_, index) => index);

	for (let i = length - 1; i >= 0; i--) {
        const seed = Math.floor(Math.random() * length);
        swapPositions.call(filledArray, seed, i);
    }

    const shuffledDeck = filledArray.map((val) => deck[val]);
    return shuffledDeck;
}

const shuffledDeck = shuffle(deck);
console.log(shuffledDeck);
console.assert(shuffledDeck.every((card) => deck.includes(card)), "Shuffle failed.");
