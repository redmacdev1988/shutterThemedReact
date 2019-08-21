
import BadHueristicAlgo from '../BadHeuristics/BadHeuristics';


//var CONSTANTS = require("./constants");
var CONSTANTS  = {
    PREORDER: 1,
    INORDER: 2,
    POSTORDER: 3,
    LEFT_HEAVY: 4,
    RIGHT_HEAVY: 5,
    LEFT: 6,
    RIGHT: 7,
    REVERSE_PRINT: 8,
};

// Using ES6:
class TreeNode {
    constructor (left, newData, newHeight, newBalance, right) {
        this.left = left || null;
        this.data = newData;
        this.height = newHeight;
        this.balance = newBalance;
        this.right = right || null;
    }

    display() {
        //console.log("> " + this.data + " height: " + this.height + ", balance: " + this.balance);
    }

    delete() {
        this.left = null;
        this.data = null;
        this.height = null;
        this.balance = null;
        this.right = null;
    }
}

function heightOfTree(node) {
    if (node === null) return -1;
    return Math.max(heightOfTree(node.left), 
                    heightOfTree(node.right)) + 1;
}

 // O( 1 )
 function calculateAndAssignNewBalance(node) {
    if (node === null) return 0;
    let leftHeight = (node.left ? node.left.height: -1);
    let rightHeight = (node.right ? node.right.height: -1);
    node.balance = leftHeight - rightHeight;
}

// O( 1 )
function calculateAndAssignNewHeight(node) {
    node.height = 1 + Math.max((node.right) ? node.right.height: -1,  (node.left) ? node.left.height: -1); 
}

// O(log n)
    // after each rotate, let's update the heights andn balance
function rotate(node, directionType) {
    var anchor = null;
    var toMove = node;

    if (directionType === CONSTANTS.LEFT) {
        anchor = node.right;
        toMove.right = (anchor.left) ? anchor.left : null;
        anchor.left = toMove;

    } else if (directionType === CONSTANTS.RIGHT) {
        anchor = node.left;
        toMove.left = (anchor.right) ? anchor.right : null;
        anchor.right = toMove;
    }

    // After an insertion, you need to update the balance factor of each "parent" 
    // all the way up the tree until the root; so it's a max of O(log n) updates.
    anchor.height = heightOfTree(anchor); // O(log n)
    toMove.height = heightOfTree(toMove); // O(log n)

    calculateAndAssignNewBalance(anchor);
    calculateAndAssignNewBalance(toMove);
    return anchor;
}

function startsWith(pattern, text) {
    console.log(`does text ${text} start with pattern ${pattern}?`);
    if (pattern.length > text.length) {
        console.log('uh oh pattern length is larger than tet lenght...false');
        return false;
    }

    let i = 0;
    let j = 0;
    while (i < text.length && j < pattern.length) {
        if (pattern[j] !== text[i]) {
            console.log(`no  text ${text} DNS with pattern ${pattern}`);
            return false;
        }
        i++;
        j++
    }

    console.log(`YES text${text} does start with pattern ${pattern} `);
    return true;
}

function startWithSearch(prependURL, pattern, node, results) {
    console.log(`pattern ${pattern}`);

    if (node == null || !node) return;
    
    // see if it starts with it
    let lastIndexOfText = node.data.lastIndexOf('/');
    let lastIndexOfDot = node.data.lastIndexOf('.');
    let ext = node.data.substring(lastIndexOfDot+1, node.data.length);
    let text = node.data.substring(lastIndexOfText+1, lastIndexOfDot);

    console.log(`text:${text}`);

    if (startsWith(pattern, text)) {
        console.log(`text ${text} starts with pattern ${pattern}`);

        results.push({
            found: [0],
            pattern,
            url: `${prependURL}${text}.${ext}`,
        });

        // if there's a match, we need to go BOTH left and right, because
        // its children may have matches also
        startWithSearch(prependURL, pattern, node.left, results);
        startWithSearch(prependURL, pattern, node.right, results);
        return;
    } 
    
    
    console.log('no match yet. so keep going');
    if (pattern < text) {
        startWithSearch(prependURL, pattern, node.left, results);
    } else {
        startWithSearch(prependURL, pattern, node.right, results);
    }
  
}

// O( log n )
function anyMatchSearch(prependURL, pattern, node, results) {
    if (node === null || !node) { return; }

    anyMatchSearch(prependURL, pattern, node.left, results);

    let lastIndexOfText = node.data.lastIndexOf('/');
    let lastIndexOfDot = node.data.lastIndexOf('.');
    let ext = node.data.substring(lastIndexOfDot+1, node.data.length);
    let text = node.data.substring(lastIndexOfText+1, lastIndexOfDot);
    let search = new BadHueristicAlgo(pattern, text);
    const found = search.searchPattern();
    if (found.length > 0) { // we have found something
        results.push({
            found,
            pattern,
            url: `${prependURL}${text}.${ext}`,
        }); 
    }
    anyMatchSearch(prependURL, pattern, node.right, results);
}


// O( log n )
function exactSearch(data, node) {
    if (node === null || !node) { 
        return null; 
    }
    if (data < node.data) {
        return exactSearch(data, node.left);
    } else if (data > node.data) {
        return exactSearch(data, node.right);
    } else if (data === node.data) {
        return node;
    }
}

function rightMostOfLeftSubTree(node, callback) {
    if (!node.right) {
        let toConnect = node.left;
        callback(node);
        return toConnect; // no more node.right, so we return node left
    }
    node.right = rightMostOfLeftSubTree(node.right, callback);
    return updateHeightBalanceThenCorrectImbalance(node);
}

function leftMostOfRightSubTree(node, callback) {
    if (!node.left) {
        let toConnect = node.right;
        callback(node);
        return toConnect; // no more node.right, so we return node left
    }
    node.left = leftMostOfRightSubTree(node.left, callback);
    return updateHeightBalanceThenCorrectImbalance(node);
}


function updateHeightBalanceThenCorrectImbalance(node) {
    calculateAndAssignNewHeight(node);
    calculateAndAssignNewBalance(node);
    return correctImbalanceIfAny(node);
}

function stdBSTDelete(data, node) {
    if (node === null || !node) { 
        console.log(`${data} not found in this tree`);
        return null; 
    }
    if (data < node.data) {
        node.left = stdBSTDelete(data, node.left);
    } else if (data > node.data) {
        node.right = stdBSTDelete(data, node.right);
    } else if (data === node.data) {
        if (!node.left && !node.right) { // no children
            node.delete();
            node = null;
            return null;
        }

        if (node.left && !node.right) { // left child
            let leftNode = node.left;
            node.delete();
            return leftNode;
        }

        if (!node.left && node.right) { // right child
            let rightNode = node.right;
            node.delete();
            return rightNode;
        }

        if (node.left && node.right) { // both children
            if  (node.left.height >= node.right.height) {  
                node.left = rightMostOfLeftSubTree(node.left, function(toDelete) {
                    node.data = toDelete.data;
                    toDelete.delete();
                });
            }

            if  (node.right.height > node.left.height) {
                node.right = leftMostOfRightSubTree(node.right, function(toDelete) {
                    node.data = toDelete.data;
                    toDelete.delete();
                });
            }
        }
    }

   return updateHeightBalanceThenCorrectImbalance(node);
}

// O( log n )  for the insertion
// running time of 1 insertion:
// O( log n) , for updating the heights up to the root
// O( log n ) for binary recursion of inserting
// Thus, each insertion is O( log n )

// 1) BST standard insert to the end
// before you recurse back up:
// 2) update node's height 
// 3) update node's balance. Balance it with rotate if unbalanced
function stdBSTInsert(data, node) {
    if (node === null) { return new TreeNode(null, data, 0, 0, null); }
    if (data < node.data) {
        node.left = stdBSTInsert(data, node.left);
    } else {
        node.right = stdBSTInsert(data, node.right);
    }
    return updateHeightBalanceThenCorrectImbalance(node);
}

function correctImbalanceIfAny(node) {
    if (node.balance >= 2) {
        if (node.left && node.left.balance >= 1) {
            node = rotate(node, CONSTANTS.RIGHT);  // O(log n)
        }
        if (node.left && node.left.balance <= -1) {
            node.left = rotate(node.left, CONSTANTS.LEFT); // O(log n)
            node = rotate(node, CONSTANTS.RIGHT); // O(log n)
        }
    }

    if (node.balance <= -2) {
        if (node.right && node.right.balance <= -1) {
            node = rotate(node, CONSTANTS.LEFT);  // O(log n)
        }
        if (node.right && node.right.balance >= 1) {
            node.right = rotate(node.right, CONSTANTS.RIGHT); // O(log n)
            node = rotate(node, CONSTANTS.LEFT); // O(log n)
        }
    }
    return node;
}


function display(node) {
    if (!node) return;
    display(node.left);
    node.display();
    display(node.right);
}

function clear(node) {
    if (!node) return;
    clear(node.left);
    clear(node.right);

    node.delete();
    node = null;
}


function preOrder(node, results) {
    if (!node) return;
    preOrder(node.left, results);
    results.push(node.data);
    preOrder(node.right, results)
}

function preOrderReverse(node, results) {
    if (!node) return;
    preOrderReverse(node.right, results);
    results.push(node.data);
    preOrderReverse(node.left, results)
}


//module.exports = class AVLTree {
const AVLTreeClass = class AVLTree {
    constructor () { 
        this._head = null; 
    }
    static CreateObject() { return new AVLTree(); }

    clearWholeTree() {
        if (!this._head) {
            console.log(`tree already empty`);
        } else {
            clear(this._head);
            this._head = null;
        }
    }

    insert(data) {
        if (!this._head) {
            this._head = new TreeNode(null, data, 0, 0, null); 
        } else {
            this._head = stdBSTInsert(data, this._head);
        }
    }

    delete(data) {
        if (!this._head) {
            console.log(`ø tree is empty. Not data to be found`);
            return null;
        } else {
            this._head = stdBSTDelete(data, this._head);
        }
    }

    searchForAnyMatch(prependURL, searchPattern) {
        let results = [];
        if (!this._head) {
            console.log(`ø tree is empty. No data to be found`);
            return results;
        } else {
            anyMatchSearch(prependURL, searchPattern, this._head, results);
            return results;
        }
    }

    searchForStartingWith(prependURL, searchPattern) {
        let results = [];
        if (!this._head) {
            console.log(`ø tree is empty. No data to be found`);
            return results;
        } else {
            startWithSearch(prependURL, searchPattern, this._head, results);
            return results;
        }
    }


    searchForExactMatch(data) {
        if (!this._head) {
            console.log(`ø tree is empty. Not data to be found`);
            return null;
        } else {
            return exactSearch(data, this._head);
        }
    }

    displayAllNodes() {
        console.log(`√ displayAllNodes √`);
        console.log(this._head);
        if (!this._head) {
            console.log('tree already empty;');
            return;
        } else {
            display(this._head);
        }
    }

    firstToLast() {
        let results = [];
        if (!this._head) {
            console.log('tree already empty;');
            return;
        } else {
            preOrder(this._head, results);
        }
        return results;
    }


    lastToFirst() {
        let results = [];
        if (!this._head) {
            console.log('tree already empty;');
            return;
        } else {
            preOrderReverse(this._head, results);
        }
        return results;
    }
}


export default AVLTreeClass;