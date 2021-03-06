/**
 * Example uses of stacks
 * - undo feature
 * - compilers (syntax checking)
 * - evaluate expressions (1+3*2)
 * - build navigation (forward & back)
 *
 * Consider a stack of books - must remove top item to remove next item
 * LIFO - last in, first out
 *
 * A wrapper around an array or linked list that gives us a new way to access the data
 *
 * Operations:
 *      Push - O(1)
 *          add item to end
 *      Pop - O(1)
 *          remove item from end & returns item
 *      Peek - O(1)
 *          look at last item w/o removing
 *      isEmpty - O(1)
 *          see if the stack is empty
 *
 *  NOTE: there is no lookup function for a stack! not used to store lists
 *
 *  ALL stack operations run in O(1)!!!
 *
 **/

class Stack {
    constructor() {
        this.items = [];
    }

    //push
    push (item) {
        this.items.push(item)
    }

    //pop
    pop () {
        if (this.items.length === 0) {
            return 'Underflow';
        }
        return this.items.pop()
    }

    //peek
    peek () {
        return this.items[this.items.length - 1];
    }

    //isEmpty
    isEmpty () {
        return this.items.length === 0;
    }
}

function reverseString(string) {
    if (string === null) {
        throw new Error('Illegal argument');
    }
    const stack = new Stack();
    let result = '';
    string.split('').forEach((letter) => {
        stack.push(letter);
    })

    while (!stack.isEmpty()) {
        result += stack.pop();
    }

    console.log(result);
    return result;
}

// reverseString('taco');
// reverseString(null);

class Expression {
    constructor(expression) {
        this.expressionArray = expression.split('');
        this.stack = new Stack();
        this.bracketPairs = {
            '}': '{',
            ']': '[',
            '>': '<',
            ')': '(',
        }
        this.openingBrackets = this.setOpeningBrackets();
    }

    setOpeningBrackets() {
        let openingBrackets = [];
        Object.keys(this.bracketPairs).forEach((key) => {
            openingBrackets.push(this.bracketPairs[key]);
        })

        return openingBrackets;
    }

    isOpeningCharacter(character) {
        return character === '(' || character === '{' || character === '[' || character === '<'
    }

    isClosingCharacter(character) {
        return character === ')' || character === '}' || character === ']' || character === '>'
    }

    isBalanced() {
        for (let i = 0; i < this.expressionArray.length; i++) {
            let character = this.expressionArray[i];
            if (this.isOpeningCharacter(character)) {
                this.stack.push(character);
            }

            if (this.isClosingCharacter(character)) {
                if (this.stack.isEmpty()) {
                    return false;
                }
                let top = this.stack.pop();
                if (this.bracketsMatch(top, character)) {
                    return false;
                }
            }
        }

        return this.stack.isEmpty();
    }

    bracketsMatch(left, right) {
        return (right === ')' && left !== '(')
            || (right === '>' && left !== '<')
            || (right === ']' && left !== '[')
            || (right === '}' && left !== '{');
    }
}

let expression = new Expression('{({()})}');
console.log(expression.isBalanced());
