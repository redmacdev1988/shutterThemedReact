const MAXCHAR = 256;

const BadHeuristic = function BadHeuristic(newPattern, newText) {

    this.pattern = (newPattern) ? newPattern : null;
    this.patternLength = (this.pattern) ? this.pattern.length : 0;

    this.text = (newText) ? newText : null;
    this.textLength = (this.text) ? this.text.length : 0;

    this.arrBadChar = [];

    this.arrAnswer = [];
    this.arrAnswerCur = 0;

    this.display = function() {
        console.log(`--- (BadHeuristic) display info---`);
        if (this.pattern) {
            console.log(`pattern: ${this.pattern}, with length: ${this.patternLength}`);
        } else {
            console.log('please assign valid pattern');
        }

        if (this.text) {
            console.log(`text: ${this.text}, with length: ${this.textLength}`);
        } else {
            console.log('please assign valid text');
        }
        console.log(`----------------------------------`);
    }
}

BadHeuristic.prototype.searchPattern  = function() {

    this.badCharacterHeuristic();
    let shift = 0;

    while (shift <= (this.textLength - this.patternLength)) {

        let j = this.patternLength - 1;

        // we calculate for a full match.
        while( j >= 0 && this.pattern[j] === this.text[shift + j]) {
            j--;
        }

        // if there is a full pattern match, j will be 0
        // if there is a mismatch, j will be > 0

        if(j < 0) { // Match

            //console.log(`√ match found at ${shift}`);
            this.arrAnswer[this.arrAnswerCur++] = shift;

            if ((shift + this.patternLength) < this.textLength) { // are we still within the confinement of the array?
                let indexOfChar = shift + this.patternLength;
                let char = this.text[indexOfChar];
                let asciiOfChar = char.charCodeAt(0);
                shift += this.patternLength - this.arrBadChar[asciiOfChar];
            } else {
                shift += 1; // going forward, it will be evaluated in the beginning of the while
            }


        } else { // pattern mismatch

            // for index of character over to the char after the mismatch. 
            let indexOfChar = shift + j;

            // then we get the character of that index
            let char = this.text[indexOfChar];

            // getting the ascii of that character, we look at the the value of that index ascii
            let asciiOfChar = char.charCodeAt(0);

            // in a 3 letter pattern, we may have 0, 1, or 2. 
            // in the end, we shift according to the max
            shift += Math.max(1, j - this.arrBadChar[asciiOfChar]);
        }
    }

    return this.arrAnswer;
}


// in the badChar array, the index represent the ascii
// 1) for each ascii, let's initialize to all -1
// 2) for each letter in the pattern, turn that letter into ascii
// then using the ascii as an index, let's assign it to the index of the pattern where this ascii is. 

BadHeuristic.prototype.badCharacterHeuristic = function() {
    for (let i = 0; i < MAXCHAR; i++) {
        this.arrBadChar[i] = -1;
    }
    for (let j = 0; j < this.patternLength; j++) {
        let letter = this.pattern[j];
        let ascii = letter.charCodeAt(0);
        this.arrBadChar[ascii] = j;
    }
}


export default BadHeuristic;