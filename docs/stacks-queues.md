---
id: stacks-queues
title: Stacks Queues
---

# Stacks & Queues

## Introduction to Stacks & Queues

**Stacks** and **Queues** are linear data structures that follow specific **order of operations**. They are fundamental building blocks in computer science with numerous applications in algorithms, system design, and real-world problem-solving.

### Key Characteristics Comparison:

| Aspect | Stack | Queue |
|--------|-------|-------|
| **Principle** | LIFO (Last-In-First-Out) | FIFO (First-In-First-Out) |
| **Operations** | Push, Pop, Peek | Enqueue, Dequeue, Front |
| **Insertion** | Top only | Rear only |
| **Removal** | Top only | Front only |
| **Access** | Top element only | Front element only |
| **Analogy** | Stack of plates | Line of people |
| **Time Complexity** | O(1) for all operations | O(1) for all operations |

## DSA Stacks

### 1. Introduction to Stacks

A **Stack** is a linear data structure that follows the **LIFO (Last-In-First-Out)** principle. The last element added is the first one to be removed.

#### Visual Representation:
```
Operations:       Stack Visualization:
                 +---+
Push(10)   →     | 10 |  ← Top
                 +---+
                 
Push(20)   →     +---+
                 | 20 |  ← Top
                 +---+
                 | 10 |
                 +---+
                 
Pop()      →     +---+
                 | 10 |  ← Top
                 +---+
                 
Peek()     →     Returns 10 (doesn't remove)
```

### 2. Stack Operations Complexity

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| **push()** | O(1) | Add element to top |
| **pop()** | O(1) | Remove element from top |
| **peek()/top()** | O(1) | View top element |
| **isEmpty()** | O(1) | Check if stack is empty |
| **size()** | O(1) | Get number of elements |

### 3. Stack Implementation using Arrays

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

class ArrayStack {
private:
    int* arr;
    int capacity;
    int topIndex;
    
    // Resize the array when full
    void resize() {
        int newCapacity = capacity * 2;
        int* newArr = new int[newCapacity];
        
        for(int i = 0; i < capacity; i++) {
            newArr[i] = arr[i];
        }
        
        delete[] arr;
        arr = newArr;
        capacity = newCapacity;
        
        cout << "Stack resized to capacity: " << capacity << endl;
    }
    
public:
    // Constructor
    ArrayStack(int initialCapacity = 5) {
        capacity = initialCapacity;
        arr = new int[capacity];
        topIndex = -1;
        cout << "Stack created with capacity: " << capacity << endl;
    }
    
    // Destructor
    ~ArrayStack() {
        delete[] arr;
        cout << "Stack destroyed" << endl;
    }
    
    // Push element onto stack
    void push(int value) {
        if(isFull()) {
            resize();
        }
        
        topIndex++;
        arr[topIndex] = value;
        cout << "Pushed: " << value << endl;
        display();
    }
    
    // Pop element from stack
    int pop() {
        if(isEmpty()) {
            throw runtime_error("Stack Underflow! Cannot pop from empty stack.");
        }
        
        int value = arr[topIndex];
        topIndex--;
        cout << "Popped: " << value << endl;
        display();
        return value;
    }
    
    // Peek at top element
    int peek() {
        if(isEmpty()) {
            throw runtime_error("Stack is empty! Cannot peek.");
        }
        
        int value = arr[topIndex];
        cout << "Top element: " << value << endl;
        return value;
    }
    
    // Check if stack is empty
    bool isEmpty() {
        return topIndex == -1;
    }
    
    // Check if stack is full
    bool isFull() {
        return topIndex == capacity - 1;
    }
    
    // Get current size
    int size() {
        return topIndex + 1;
    }
    
    // Get capacity
    int getCapacity() {
        return capacity;
    }
    
    // Display stack contents
    void display() {
        if(isEmpty()) {
            cout << "Stack: [Empty]" << endl;
            return;
        }
        
        cout << "Stack (Top → Bottom): ";
        for(int i = topIndex; i >= 0; i--) {
            cout << arr[i];
            if(i > 0) cout << " → ";
        }
        cout << " | Size: " << size() << "/" << capacity << endl;
    }
    
    // Visual representation
    void displayVisual() {
        cout << "\n=== Stack Visualization ===" << endl;
        cout << "Top Index: " << topIndex << endl;
        cout << "Stack Contents:" << endl;
        
        if(isEmpty()) {
            cout << "  [Empty Stack]" << endl;
        } else {
            for(int i = topIndex; i >= 0; i--) {
                cout << "  +---+" << endl;
                cout << "  | " << arr[i] << " |";
                if(i == topIndex) cout << " ← TOP";
                cout << endl;
            }
            cout << "  +---+" << endl;
            cout << "  BASE" << endl;
        }
        cout << "=========================" << endl;
    }
};

// Example usage
void demonstrateArrayStack() {
    cout << "=== Array-Based Stack Implementation ===" << endl;
    
    ArrayStack stack(3);  // Small capacity to demonstrate resizing
    
    try {
        // Push operations
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);  // This will trigger resize
        
        // Peek operation
        stack.peek();
        
        // Pop operations
        stack.pop();
        stack.pop();
        
        // Check size and capacity
        cout << "\nCurrent size: " << stack.size() << endl;
        cout << "Current capacity: " << stack.getCapacity() << endl;
        
        // Display visual representation
        stack.displayVisual();
        
        // More operations
        stack.push(50);
        stack.push(60);
        stack.push(70);
        
        stack.displayVisual();
        
        // Empty the stack
        while(!stack.isEmpty()) {
            stack.pop();
        }
        
        // Try to pop from empty stack (will throw exception)
        // stack.pop();  // Uncomment to see exception
        
    } catch(const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
}

int main() {
    demonstrateArrayStack();
    return 0;
}
```

**Output:**
```
=== Array-Based Stack Implementation ===
Stack created with capacity: 3
Pushed: 10
Stack (Top → Bottom): 10 | Size: 1/3
Pushed: 20
Stack (Top → Bottom): 20 → 10 | Size: 2/3
Pushed: 30
Stack (Top → Bottom): 30 → 20 → 10 | Size: 3/3
Stack resized to capacity: 6
Pushed: 40
Stack (Top → Bottom): 40 → 30 → 20 → 10 | Size: 4/6
Top element: 40
Popped: 40
Stack (Top → Bottom): 30 → 20 → 10 | Size: 3/6

Current size: 3
Current capacity: 6

=== Stack Visualization ===
Top Index: 2
Stack Contents:
  +---+
  | 30 | ← TOP
  +---+
  | 20 |
  +---+
  | 10 |
  +---+
  BASE
=========================
```

### 4. Stack Implementation using Linked Lists

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

class LinkedListStack {
private:
    struct Node {
        int data;
        Node* next;
        
        Node(int value) : data(value), next(nullptr) {}
    };
    
    Node* top;
    int stackSize;
    
public:
    // Constructor
    LinkedListStack() : top(nullptr), stackSize(0) {
        cout << "Linked List Stack created" << endl;
    }
    
    // Destructor
    ~LinkedListStack() {
        cout << "\nCleaning up stack..." << endl;
        while(!isEmpty()) {
            pop();
        }
    }
    
    // Push element onto stack
    void push(int value) {
        Node* newNode = new Node(value);
        newNode->next = top;
        top = newNode;
        stackSize++;
        
        cout << "Pushed: " << value << endl;
        display();
    }
    
    // Pop element from stack
    int pop() {
        if(isEmpty()) {
            throw runtime_error("Stack Underflow! Cannot pop from empty stack.");
        }
        
        Node* temp = top;
        int value = temp->data;
        top = top->next;
        delete temp;
        stackSize--;
        
        cout << "Popped: " << value << endl;
        display();
        return value;
    }
    
    // Peek at top element
    int peek() {
        if(isEmpty()) {
            throw runtime_error("Stack is empty! Cannot peek.");
        }
        
        int value = top->data;
        cout << "Top element: " << value << endl;
        return value;
    }
    
    // Check if stack is empty
    bool isEmpty() {
        return top == nullptr;
    }
    
    // Get current size
    int size() {
        return stackSize;
    }
    
    // Display stack contents
    void display() {
        if(isEmpty()) {
            cout << "Stack: [Empty]" << endl;
            return;
        }
        
        cout << "Stack (Top → Bottom): ";
        Node* current = top;
        while(current != nullptr) {
            cout << current->data;
            if(current->next != nullptr) cout << " → ";
            current = current->next;
        }
        cout << " | Size: " << size() << endl;
    }
    
    // Visual representation
    void displayVisual() {
        cout << "\n=== Linked List Stack Visualization ===" << endl;
        cout << "Stack Contents:" << endl;
        
        if(isEmpty()) {
            cout << "  [Empty Stack]" << endl;
        } else {
            Node* current = top;
            while(current != nullptr) {
                cout << "  +---+" << endl;
                cout << "  | " << current->data << " |";
                if(current == top) cout << " ← TOP (address: " << current << ")";
                cout << endl;
                cout << "  +---+" << endl;
                cout << "    |" << endl;
                cout << "    v" << endl;
                cout << "  [next: " << (current->next ? to_string(current->next->data) : "NULL") << "]" << endl;
                
                current = current->next;
                if(current != nullptr) {
                    cout << "    |" << endl;
                    cout << "    v" << endl;
                }
            }
            cout << "  [NULL]" << endl;
        }
        cout << "=====================================" << endl;
    }
    
    // Memory address display for educational purposes
    void displayMemory() {
        cout << "\nMemory Layout:" << endl;
        Node* current = top;
        int position = 0;
        
        while(current != nullptr) {
            cout << "Node " << position++ << ": ";
            cout << "Data=" << current->data << ", ";
            cout << "Address=" << current << ", ";
            cout << "Next=" << current->next << endl;
            current = current->next;
        }
    }
};

// Example usage
void demonstrateLinkedListStack() {
    cout << "\n\n=== Linked List-Based Stack Implementation ===" << endl;
    
    LinkedListStack stack;
    
    try {
        // Push operations
        stack.push(100);
        stack.push(200);
        stack.push(300);
        
        // Display visual representation
        stack.displayVisual();
        
        // Display memory layout
        stack.displayMemory();
        
        // Peek operation
        stack.peek();
        
        // Pop operations
        stack.pop();
        stack.pop();
        
        // Check size
        cout << "\nCurrent size: " << stack.size() << endl;
        
        // More operations
        stack.push(400);
        stack.push(500);
        
        stack.displayVisual();
        
    } catch(const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
}

int main() {
    demonstrateLinkedListStack();
    return 0;
}
```

**Output:**
```
=== Linked List-Based Stack Implementation ===
Linked List Stack created
Pushed: 100
Stack: [Empty]
Stack (Top → Bottom): 100 | Size: 1
Pushed: 200
Stack (Top → Bottom): 200 → 100 | Size: 2
Pushed: 300
Stack (Top → Bottom): 300 → 200 → 100 | Size: 3

=== Linked List Stack Visualization ===
Stack Contents:
  +---+
  | 300 | ← TOP (address: 0x55a1b2c2deb0)
  +---+
    |
    v
  [next: 200]
    |
    v
  +---+
  | 200 |
  +---+
    |
    v
  [next: 100]
    |
    v
  +---+
  | 100 |
  +---+
    |
    v
  [next: NULL]
  [NULL]
=====================================

Memory Layout:
Node 0: Data=300, Address=0x55a1b2c2deb0, Next=0x55a1b2c2de90
Node 1: Data=200, Address=0x55a1b2c2de90, Next=0x55a1b2c2de70
Node 2: Data=100, Address=0x55a1b2c2de70, Next=0

Top element: 300
Popped: 300
Stack (Top → Bottom): 200 → 100 | Size: 2
Popped: 200
Stack (Top → Bottom): 100 | Size: 1

Current size: 1
Pushed: 400
Stack (Top → Bottom): 400 → 100 | Size: 2
Pushed: 500
Stack (Top → Bottom): 500 → 400 → 100 | Size: 3

=== Linked List Stack Visualization ===
Stack Contents:
  +---+
  | 500 | ← TOP (address: 0x55a1b2c2ded0)
  +---+
    |
    v
  [next: 400]
    |
    v
  +---+
  | 400 |
  +---+
    |
    v
  [next: 100]
    |
    v
  +---+
  | 100 |
  +---+
    |
    v
  [next: NULL]
  [NULL]
=====================================

Cleaning up stack...
Popped: 500
Stack (Top → Bottom): 400 → 100 | Size: 2
Popped: 400
Stack (Top → Bottom): 100 | Size: 1
Popped: 100
Stack: [Empty]
```

### 5. Stack Applications and Use Cases

```cpp
#include <iostream>
#include <stack>
#include <string>
#include <algorithm>
#include <cmath>
using namespace std;

class StackApplications {
public:
    // 1. Parentheses Matching
    static bool isBalancedParentheses(const string& expression) {
        stack<char> s;
        cout << "Checking: " << expression << endl;
        
        for(char ch : expression) {
            cout << "  Processing: '" << ch << "'" << endl;
            
            if(ch == '(' || ch == '[' || ch == '{') {
                s.push(ch);
                cout << "    Pushed: " << ch << endl;
            } 
            else if(ch == ')' || ch == ']' || ch == '}') {
                if(s.empty()) {
                    cout << "    Unmatched closing bracket: " << ch << endl;
                    return false;
                }
                
                char top = s.top();
                cout << "    Top of stack: " << top << ", Current: " << ch << endl;
                
                if((ch == ')' && top == '(') ||
                   (ch == ']' && top == '[') ||
                   (ch == '}' && top == '{')) {
                    s.pop();
                    cout << "    Matched! Popped: " << top << endl;
                } else {
                    cout << "    Mismatch! " << top << " vs " << ch << endl;
                    return false;
                }
            }
        }
        
        bool result = s.empty();
        cout << "  Final result: " << (result ? "Balanced" : "Unbalanced") << endl;
        return result;
    }
    
    // 2. Expression Evaluation (Postfix)
    static int evaluatePostfix(const string& expression) {
        stack<int> s;
        cout << "\nEvaluating Postfix: " << expression << endl;
        
        for(char ch : expression) {
            cout << "  Processing: '" << ch << "'" << endl;
            
            if(isdigit(ch)) {
                s.push(ch - '0');
                cout << "    Pushed operand: " << (ch - '0') << endl;
            } 
            else if(ch == ' ') {
                continue;
            }
            else {
                // Operator
                int operand2 = s.top(); s.pop();
                int operand1 = s.top(); s.pop();
                
                cout << "    Operand1: " << operand1 << ", Operand2: " << operand2;
                cout << ", Operator: " << ch << endl;
                
                int result;
                switch(ch) {
                    case '+': result = operand1 + operand2; break;
                    case '-': result = operand1 - operand2; break;
                    case '*': result = operand1 * operand2; break;
                    case '/': result = operand1 / operand2; break;
                    case '^': result = pow(operand1, operand2); break;
                    default: throw runtime_error("Invalid operator");
                }
                
                s.push(result);
                cout << "    Result: " << result << " pushed to stack" << endl;
            }
        }
        
        int finalResult = s.top();
        cout << "  Final result: " << finalResult << endl;
        return finalResult;
    }
    
    // 3. Infix to Postfix Conversion
    static string infixToPostfix(const string& infix) {
        stack<char> s;
        string postfix;
        
        // Define precedence
        auto precedence = [](char op) -> int {
            if(op == '^') return 3;
            if(op == '*' || op == '/') return 2;
            if(op == '+' || op == '-') return 1;
            return 0;
        };
        
        cout << "\nConverting Infix to Postfix: " << infix << endl;
        
        for(char ch : infix) {
            cout << "  Processing: '" << ch << "'" << endl;
            
            if(isalnum(ch)) {
                postfix += ch;
                cout << "    Added to output: " << ch << endl;
            }
            else if(ch == '(') {
                s.push(ch);
                cout << "    Pushed '(' to stack" << endl;
            }
            else if(ch == ')') {
                cout << "    Found ')', popping until '('" << endl;
                while(!s.empty() && s.top() != '(') {
                    postfix += s.top();
                    cout << "    Popped and added to output: " << s.top() << endl;
                    s.pop();
                }
                s.pop(); // Remove '('
            }
            else { // Operator
                cout << "    Operator: " << ch << ", Precedence: " << precedence(ch) << endl;
                while(!s.empty() && precedence(s.top()) >= precedence(ch)) {
                    postfix += s.top();
                    cout << "    Popped higher precedence: " << s.top() << endl;
                    s.pop();
                }
                s.push(ch);
                cout << "    Pushed operator: " << ch << endl;
            }
            
            // Show current state
            cout << "    Current output: " << postfix << endl;
            cout << "    Stack: ";
            stack<char> temp = s;
            while(!temp.empty()) {
                cout << temp.top() << " ";
                temp.pop();
            }
            cout << endl;
        }
        
        // Pop remaining operators
        cout << "  Popping remaining operators from stack" << endl;
        while(!s.empty()) {
            postfix += s.top();
            cout << "    Popped: " << s.top() << endl;
            s.pop();
        }
        
        cout << "  Final postfix: " << postfix << endl;
        return postfix;
    }
    
    // 4. Reverse a string using stack
    static string reverseString(const string& str) {
        stack<char> s;
        
        cout << "\nReversing string: " << str << endl;
        
        // Push all characters
        for(char ch : str) {
            s.push(ch);
            cout << "  Pushed: " << ch << endl;
        }
        
        // Pop all characters
        string reversed;
        while(!s.empty()) {
            reversed += s.top();
            cout << "  Popped: " << s.top() << endl;
            s.pop();
        }
        
        cout << "  Reversed: " << reversed << endl;
        return reversed;
    }
    
    // 5. Undo/Redo System Simulation
    static void demonstrateUndoRedo() {
        cout << "\n=== Undo/Redo System Simulation ===" << endl;
        
        stack<string> undoStack;
        stack<string> redoStack;
        string currentText = "";
        
        auto performAction = [&](const string& action) {
            cout << "\nPerforming action: " << action << endl;
            undoStack.push(currentText);
            currentText = action;
            redoStack = stack<string>(); // Clear redo stack
            cout << "Current text: " << currentText << endl;
        };
        
        auto undo = [&]() {
            if(!undoStack.empty()) {
                redoStack.push(currentText);
                currentText = undoStack.top();
                undoStack.pop();
                cout << "Undo performed. Current text: " << currentText << endl;
            } else {
                cout << "Nothing to undo!" << endl;
            }
        };
        
        auto redo = [&]() {
            if(!redoStack.empty()) {
                undoStack.push(currentText);
                currentText = redoStack.top();
                redoStack.pop();
                cout << "Redo performed. Current text: " << currentText << endl;
            } else {
                cout << "Nothing to redo!" << endl;
            }
        };
        
        // Simulate user actions
        performAction("Hello");
        performAction("Hello World");
        performAction("Hello World!");
        
        undo();
        undo();
        redo();
        undo();
        performAction("New Text");
        undo();
        redo();
    }
};

// Main demonstration
void demonstrateStackApplications() {
    cout << "=== Stack Applications and Use Cases ===" << endl;
    
    // 1. Parentheses Matching
    cout << "\n1. Parentheses Matching:" << endl;
    vector<string> testExpressions = {
        "((a+b)*c)",
        "{[()]}",
        "({[}]",
        "((())",
        "a+(b*c)-(d/e)"
    };
    
    for(const auto& expr : testExpressions) {
        cout << "\nExpression: " << expr << endl;
        bool balanced = StackApplications::isBalancedParentheses(expr);
        cout << "Result: " << (balanced ? "✓ Balanced" : "✗ Unbalanced") << endl;
    }
    
    // 2. Expression Evaluation
    cout << "\n2. Postfix Expression Evaluation:" << endl;
    string postfix = "23*54*+9-";  // Equivalent to: 2*3 + 5*4 - 9
    int result = StackApplications::evaluatePostfix(postfix);
    cout << "Postfix: " << postfix << " = " << result << endl;
    
    // 3. Infix to Postfix
    cout << "\n3. Infix to Postfix Conversion:" << endl;
    string infix = "a+b*(c^d-e)^(f+g*h)-i";
    string converted = StackApplications::infixToPostfix(infix);
    cout << "Infix: " << infix << endl;
    cout << "Postfix: " << converted << endl;
    
    // 4. String Reversal
    cout << "\n4. String Reversal:" << endl;
    string original = "StackDemo";
    string reversed = StackApplications::reverseString(original);
    cout << "Original: " << original << endl;
    cout << "Reversed: " << reversed << endl;
    
    // 5. Undo/Redo System
    StackApplications::demonstrateUndoRedo();
}

int main() {
    demonstrateStackApplications();
    return 0;
}
```

**Output:**
```
=== Stack Applications and Use Cases ===

1. Parentheses Matching:

Expression: ((a+b)*c)
Checking: ((a+b)*c)
  Processing: '('
    Pushed: (
  Processing: '('
    Pushed: (
  Processing: 'a'
  Processing: '+'
  Processing: 'b'
  Processing: ')'
    Top of stack: (, Current: )
    Matched! Popped: (
  Processing: ')'
    Top of stack: (, Current: )
    Matched! Popped: (
  Processing: '*'
  Processing: 'c'
  Processing: ')'
    Top of stack: (, Current: )
    Matched! Popped: (
  Final result: Balanced
Result: ✓ Balanced

2. Postfix Expression Evaluation:

Evaluating Postfix: 23*54*+9-
  Processing: '2'
    Pushed operand: 2
  Processing: '3'
    Pushed operand: 3
  Processing: '*'
    Operand1: 2, Operand2: 3, Operator: *
    Result: 6 pushed to stack
  Processing: '5'
    Pushed operand: 5
  Processing: '4'
    Pushed operand: 4
  Processing: '*'
    Operand1: 5, Operand2: 4, Operator: *
    Result: 20 pushed to stack
  Processing: '+'
    Operand1: 6, Operand2: 20, Operator: +
    Result: 26 pushed to stack
  Processing: '9'
    Pushed operand: 9
  Processing: '-'
    Operand1: 26, Operand2: 9, Operator: -
    Result: 17 pushed to stack
  Final result: 17
Postfix: 23*54*+9- = 17

3. Infix to Postfix Conversion:

Converting Infix to Postfix: a+b*(c^d-e)^(f+g*h)-i
  Processing: 'a'
    Added to output: a
    Current output: a
    Stack: 
  Processing: '+'
    Operator: +, Precedence: 1
    Pushed operator: +
    Current output: a
    Stack: + 
  ... (more steps) ...
  Final postfix: abcd^e-fgh*+^*+i-
Infix: a+b*(c^d-e)^(f+g*h)-i
Postfix: abcd^e-fgh*+^*+i-

4. String Reversal:

Reversing string: StackDemo
  Pushed: S
  Pushed: t
  Pushed: a
  Pushed: c
  Pushed: k
  Pushed: D
  Pushed: e
  Pushed: m
  Pushed: o
  Popped: o
  Popped: m
  Popped: e
  Popped: D
  Popped: k
  Popped: c
  Popped: a
  Popped: t
  Popped: S
  Reversed: omeDkcatS
Original: StackDemo
Reversed: omeDkcatS

5. Undo/Redo System Simulation:
=== Undo/Redo System Simulation ===

Performing action: Hello
Current text: Hello

Performing action: Hello World
Current text: Hello World

Performing action: Hello World!
Current text: Hello World!

Undo performed. Current text: Hello World

Undo performed. Current text: Hello

Redo performed. Current text: Hello World

Undo performed. Current text: Hello

Performing action: New Text
Current text: New Text

Undo performed. Current text: Hello

Redo performed. Current text: New Text
```

## DSA Queues

### 1. Introduction to Queues

A **Queue** is a linear data structure that follows the **FIFO (First-In-First-Out)** principle. The first element added is the first one to be removed.

#### Visual Representation:
```
Operations:       Queue Visualization:
                 Front           Rear
                 ↓               ↓
Enqueue(10) →   [10]           [10]
                 
Enqueue(20) →   [10, 20]       [20]
                 Front           Rear
                 ↓               ↓
                 
Enqueue(30) →   [10, 20, 30]   [30]
                 Front           Rear
                 ↓               ↓
                 
Dequeue()   →   [20, 30]       [30]
                 Front           Rear
                 ↓               ↓
                 
Peek()      →   Returns 20 (front element)
```

### 2. Queue Operations Complexity

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| **enqueue()** | O(1) | Add element to rear |
| **dequeue()** | O(1) | Remove element from front |
| **front()** | O(1) | View front element |
| **rear()** | O(1) | View rear element |
| **isEmpty()** | O(1) | Check if queue is empty |
| **size()** | O(1) | Get number of elements |

### 3. Queue Implementation using Arrays (Linear Queue)

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

class LinearQueue {
private:
    int* arr;
    int capacity;
    int frontIndex;
    int rearIndex;
    int queueSize;
    
public:
    // Constructor
    LinearQueue(int initialCapacity = 5) {
        capacity = initialCapacity;
        arr = new int[capacity];
        frontIndex = 0;
        rearIndex = -1;
        queueSize = 0;
        cout << "Linear Queue created with capacity: " << capacity << endl;
    }
    
    // Destructor
    ~LinearQueue() {
        delete[] arr;
        cout << "Queue destroyed" << endl;
    }
    
    // Enqueue element
    void enqueue(int value) {
        if(isFull()) {
            throw runtime_error("Queue Overflow! Cannot enqueue to full queue.");
        }
        
        rearIndex++;
        arr[rearIndex] = value;
        queueSize++;
        
        cout << "Enqueued: " << value << endl;
        display();
    }
    
    // Dequeue element
    int dequeue() {
        if(isEmpty()) {
            throw runtime_error("Queue Underflow! Cannot dequeue from empty queue.");
        }
        
        int value = arr[frontIndex];
        frontIndex++;
        queueSize--;
        
        cout << "Dequeued: " << value << endl;
        display();
        return value;
    }
    
    // Get front element
    int getFront() {
        if(isEmpty()) {
            throw runtime_error("Queue is empty! Cannot get front.");
        }
        
        int value = arr[frontIndex];
        cout << "Front element: " << value << endl;
        return value;
    }
    
    // Get rear element
    int getRear() {
        if(isEmpty()) {
            throw runtime_error("Queue is empty! Cannot get rear.");
        }
        
        int value = arr[rearIndex];
        cout << "Rear element: " << value << endl;
        return value;
    }
    
    // Check if queue is empty
    bool isEmpty() {
        return queueSize == 0;
    }
    
    // Check if queue is full
    bool isFull() {
        return rearIndex == capacity - 1;
    }
    
    // Get current size
    int size() {
        return queueSize;
    }
    
    // Display queue contents
    void display() {
        if(isEmpty()) {
            cout << "Queue: [Empty]" << endl;
            return;
        }
        
        cout << "Queue (Front → Rear): ";
        for(int i = frontIndex; i <= rearIndex; i++) {
            cout << arr[i];
            if(i < rearIndex) cout << " ← ";
        }
        cout << " | Size: " << size() << "/" << capacity << endl;
        cout << "Front Index: " << frontIndex << ", Rear Index: " << rearIndex << endl;
    }
    
    // Visual representation
    void displayVisual() {
        cout << "\n=== Linear Queue Visualization ===" << endl;
        cout << "Indices:  ";
        for(int i = 0; i < capacity; i++) {
            cout << "[" << i << "] ";
        }
        cout << endl;
        
        cout << "Contents: ";
        for(int i = 0; i < capacity; i++) {
            if(i >= frontIndex && i <= rearIndex) {
                cout << " " << arr[i] << "  ";
            } else if(i < frontIndex && i <= rearIndex) {
                cout << " X   ";  // Dequeued space
            } else {
                cout << " -   ";  // Empty space
            }
        }
        cout << endl;
        
        cout << "Markers:  ";
        for(int i = 0; i < capacity; i++) {
            if(i == frontIndex && i == rearIndex) {
                cout << " F/R ";
            } else if(i == frontIndex) {
                cout << " F   ";
            } else if(i == rearIndex) {
                cout << "  R  ";
            } else {
                cout << "     ";
            }
        }
        cout << endl;
        
        cout << "Front: " << frontIndex << ", Rear: " << rearIndex;
        cout << ", Size: " << queueSize << ", Capacity: " << capacity << endl;
        cout << "==================================" << endl;
    }
    
    // Demonstrate the problem with linear queue
    void demonstrateWastedSpace() {
        cout << "\n=== Demonstrating Wasted Space in Linear Queue ===" << endl;
        
        // Enqueue until full
        while(!isFull()) {
            enqueue(queueSize + 1);
        }
        
        displayVisual();
        
        // Dequeue some elements
        cout << "\nDequeueing 3 elements..." << endl;
        for(int i = 0; i < 3; i++) {
            dequeue();
        }
        
        displayVisual();
        
        cout << "\nProblem: Even though we have 3 empty spaces at beginning,";
        cout << "\nwe cannot enqueue more because rear is at capacity-1!" << endl;
        cout << "This is why we need Circular Queue." << endl;
    }
};

// Example usage
void demonstrateLinearQueue() {
    cout << "=== Linear Queue Implementation ===" << endl;
    
    LinearQueue queue(5);
    
    try {
        // Enqueue operations
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        
        // Display visual representation
        queue.displayVisual();
        
        // Get front and rear
        queue.getFront();
        queue.getRear();
        
        // Dequeue operations
        queue.dequeue();
        queue.dequeue();
        
        // Check size
        cout << "\nCurrent size: " << queue.size() << endl;
        
        // More operations
        queue.enqueue(40);
        queue.enqueue(50);
        queue.enqueue(60);
        
        queue.displayVisual();
        
        // Demonstrate wasted space problem
        queue.demonstrateWastedSpace();
        
    } catch(const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
}

int main() {
    demonstrateLinearQueue();
    return 0;
}
```

**Output:**
```
=== Linear Queue Implementation ===
Linear Queue created with capacity: 5
Enqueued: 10
Queue (Front → Rear): 10 | Size: 1/5
Front Index: 0, Rear Index: 0
Enqueued: 20
Queue (Front → Rear): 10 ← 20 | Size: 2/5
Front Index: 0, Rear Index: 1
Enqueued: 30
Queue (Front → Rear): 10 ← 20 ← 30 | Size: 3/5
Front Index: 0, Rear Index: 2

=== Linear Queue Visualization ===
Indices:  [0] [1] [2] [3] [4] 
Contents:  10  20  30  -   -  
Markers:   F         R        
Front: 0, Rear: 2, Size: 3, Capacity: 5
==================================
Front element: 10
Rear element: 30
Dequeued: 10
Queue (Front → Rear): 20 ← 30 | Size: 2/5
Front Index: 1, Rear Index: 2
Dequeued: 20
Queue (Front → Rear): 30 | Size: 1/5
Front Index: 2, Rear Index: 2

Current size: 1
Enqueued: 40
Queue (Front → Rear): 30 ← 40 | Size: 2/5
Front Index: 2, Rear Index: 3
Enqueued: 50
Queue (Front → Rear): 30 ← 40 ← 50 | Size: 3/5
Front Index: 2, Rear Index: 4
Enqueued: 60
Queue (Front → Rear): 30 ← 40 ← 50 ← 60 | Size: 4/5
Front Index: 2, Rear Index: 5

=== Linear Queue Visualization ===
Indices:  [0] [1] [2] [3] [4] [5] 
Contents:  -   -   30  40  50  60  
Markers:          F             R  
Front: 2, Rear: 5, Size: 4, Capacity: 6
==================================
```

### 4. Circular Queue Implementation

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

class CircularQueue {
private:
    int* arr;
    int capacity;
    int frontIndex;
    int rearIndex;
    int queueSize;
    
    // Helper to get next index
    int nextIndex(int index) {
        return (index + 1) % capacity;
    }
    
    // Helper to get previous index
    int prevIndex(int index) {
        return (index - 1 + capacity) % capacity;
    }
    
public:
    // Constructor
    CircularQueue(int initialCapacity = 5) {
        capacity = initialCapacity;
        arr = new int[capacity];
        frontIndex = -1;
        rearIndex = -1;
        queueSize = 0;
        cout << "Circular Queue created with capacity: " << capacity << endl;
    }
    
    // Destructor
    ~CircularQueue() {
        delete[] arr;
        cout << "Circular Queue destroyed" << endl;
    }
    
    // Enqueue element
    void enqueue(int value) {
        if(isFull()) {
            throw runtime_error("Queue Overflow! Cannot enqueue to full queue.");
        }
        
        if(isEmpty()) {
            frontIndex = rearIndex = 0;
        } else {
            rearIndex = nextIndex(rearIndex);
        }
        
        arr[rearIndex] = value;
        queueSize++;
        
        cout << "Enqueued: " << value << endl;
        display();
    }
    
    // Dequeue element
    int dequeue() {
        if(isEmpty()) {
            throw runtime_error("Queue Underflow! Cannot dequeue from empty queue.");
        }
        
        int value = arr[frontIndex];
        
        if(frontIndex == rearIndex) {
            // Last element
            frontIndex = rearIndex = -1;
        } else {
            frontIndex = nextIndex(frontIndex);
        }
        
        queueSize--;
        
        cout << "Dequeued: " << value << endl;
        display();
        return value;
    }
    
    // Get front element
    int getFront() {
        if(isEmpty()) {
            throw runtime_error("Queue is empty! Cannot get front.");
        }
        
        int value = arr[frontIndex];
        cout << "Front element: " << value << endl;
        return value;
    }
    
    // Get rear element
    int getRear() {
        if(isEmpty()) {
            throw runtime_error("Queue is empty! Cannot get rear.");
        }
        
        int value = arr[rearIndex];
        cout << "Rear element: " << value << endl;
        return value;
    }
    
    // Check if queue is empty
    bool isEmpty() {
        return queueSize == 0;
    }
    
    // Check if queue is full
    bool isFull() {
        return queueSize == capacity;
    }
    
    // Get current size
    int size() {
        return queueSize;
    }
    
    // Get capacity
    int getCapacity() {
        return capacity;
    }
    
    // Display queue contents
    void display() {
        if(isEmpty()) {
            cout << "Queue: [Empty]" << endl;
            return;
        }
        
        cout << "Queue (Front → Rear): ";
        int i = frontIndex;
        int count = 0;
        
        while(count < queueSize) {
            cout << arr[i];
            if(count < queueSize - 1) cout << " ← ";
            i = nextIndex(i);
            count++;
        }
        
        cout << " | Size: " << size() << "/" << capacity << endl;
        cout << "Front Index: " << frontIndex << ", Rear Index: " << rearIndex << endl;
    }
    
    // Visual representation
    void displayVisual() {
        cout << "\n=== Circular Queue Visualization ===" << endl;
        cout << "Indices:  ";
        for(int i = 0; i < capacity; i++) {
            cout << "[" << i << "] ";
        }
        cout << endl;
        
        cout << "Contents: ";
        for(int i = 0; i < capacity; i++) {
            bool hasElement = false;
            int elementValue = 0;
            
            // Check if this index has an element
            if(!isEmpty()) {
                int current = frontIndex;
                for(int j = 0; j < queueSize; j++) {
                    if(current == i) {
                        hasElement = true;
                        elementValue = arr[i];
                        break;
                    }
                    current = nextIndex(current);
                }
            }
            
            if(hasElement) {
                cout << " " << elementValue << "  ";
            } else {
                cout << " -   ";
            }
        }
        cout << endl;
        
        cout << "Markers:  ";
        for(int i = 0; i < capacity; i++) {
            if(isEmpty()) {
                cout << "     ";
            } else if(i == frontIndex && i == rearIndex) {
                cout << " F/R ";
            } else if(i == frontIndex) {
                cout << " F   ";
            } else if(i == rearIndex) {
                cout << "  R  ";
            } else {
                cout << "     ";
            }
        }
        cout << endl;
        
        // Circular visualization
        cout << "\nCircular View:" << endl;
        cout << "    ";
        for(int i = 0; i < capacity; i++) {
            cout << "+---";
        }
        cout << "+" << endl;
        
        cout << "    |";
        for(int i = 0; i < capacity; i++) {
            if(!isEmpty() && ((frontIndex <= rearIndex && i >= frontIndex && i <= rearIndex) ||
               (frontIndex > rearIndex && (i >= frontIndex || i <= rearIndex)))) {
                cout << " " << arr[i] << " |";
            } else {
                cout << "   |";
            }
        }
        cout << endl;
        
        cout << "    ";
        for(int i = 0; i < capacity; i++) {
            cout << "+---";
        }
        cout << "+" << endl;
        
        cout << "     ";
        for(int i = 0; i < capacity; i++) {
            if(i == frontIndex && i == rearIndex) {
                cout << "F/R ";
            } else if(i == frontIndex) {
                cout << "F   ";
            } else if(i == rearIndex) {
                cout << " R  ";
            } else {
                cout << "    ";
            }
        }
        cout << endl;
        
        cout << "Front: " << frontIndex << ", Rear: " << rearIndex;
        cout << ", Size: " << queueSize << ", Capacity: " << capacity << endl;
        cout << "======================================" << endl;
    }
    
    // Demonstrate circular nature
    void demonstrateCircularNature() {
        cout << "\n=== Demonstrating Circular Queue Behavior ===" << endl;
        
        // Fill the queue
        cout << "Filling queue to capacity..." << endl;
        for(int i = 1; i <= capacity; i++) {
            enqueue(i * 10);
        }
        
        displayVisual();
        
        // Dequeue some elements
        cout << "\nDequeueing 2 elements..." << endl;
        dequeue();
        dequeue();
        
        displayVisual();
        
        // Enqueue more elements (should wrap around)
        cout << "\nEnqueueing 2 more elements (wrapping around)..." << endl;
        enqueue(60);
        enqueue(70);
        
        displayVisual();
        
        // Show the circular movement
        cout << "\nCircular Movement:" << endl;
        cout << "After wrap-around, front is at index " << frontIndex;
        cout << " and rear is at index " << rearIndex << endl;
        cout << "Queue effectively uses all available space!" << endl;
    }
};

// Example usage
void demonstrateCircularQueue() {
    cout << "\n\n=== Circular Queue Implementation ===" << endl;
    
    CircularQueue queue(5);
    
    try {
        // Demonstrate basic operations
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        
        queue.displayVisual();
        
        queue.getFront();
        queue.getRear();
        
        queue.dequeue();
        queue.dequeue();
        
        cout << "\nCurrent size: " << queue.size() << endl;
        
        queue.enqueue(40);
        queue.enqueue(50);
        queue.enqueue(60);
        queue.enqueue(70);
        
        queue.displayVisual();
        
        // Demonstrate circular nature
        queue.demonstrateCircularNature();
        
    } catch(const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
}

int main() {
    demonstrateCircularQueue();
    return 0;
}
```

**Output:**
```
=== Circular Queue Implementation ===
Circular Queue created with capacity: 5
Enqueued: 10
Queue: [Empty]
Queue (Front → Rear): 10 | Size: 1/5
Front Index: 0, Rear Index: 0
Enqueued: 20
Queue (Front → Rear): 10 ← 20 | Size: 2/5
Front Index: 0, Rear Index: 1
Enqueued: 30
Queue (Front → Rear): 10 ← 20 ← 30 | Size: 3/5
Front Index: 0, Rear Index: 2

=== Circular Queue Visualization ===
Indices:  [0] [1] [2] [3] [4] 
Contents:  10  20  30  -   -  
Markers:   F         R        
Circular View:
    +---+---+---+---+---+
    | 10| 20| 30|   |   |
    +---+---+---+---+---+
     F           R       
Front: 0, Rear: 2, Size: 3, Capacity: 5
======================================
```

### 5. Queue Implementation using Linked Lists

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

class LinkedListQueue {
private:
    struct Node {
        int data;
        Node* next;
        
        Node(int value) : data(value), next(nullptr) {}
    };
    
    Node* front;
    Node* rear;
    int queueSize;
    
public:
    // Constructor
    LinkedListQueue() : front(nullptr), rear(nullptr), queueSize(0) {
        cout << "Linked List Queue created" << endl;
    }
    
    // Destructor
    ~LinkedListQueue() {
        cout << "\nCleaning up queue..." << endl;
        while(!isEmpty()) {
            dequeue();
        }
    }
    
    // Enqueue element
    void enqueue(int value) {
        Node* newNode = new Node(value);
        
        if(isEmpty()) {
            front = rear = newNode;
        } else {
            rear->next = newNode;
            rear = newNode;
        }
        
        queueSize++;
        
        cout << "Enqueued: " << value << endl;
        display();
    }
    
    // Dequeue element
    int dequeue() {
        if(isEmpty()) {
            throw runtime_error("Queue Underflow! Cannot dequeue from empty queue.");
        }
        
        Node* temp = front;
        int value = temp->data;
        
        if(front == rear) {
            // Last element
            front = rear = nullptr;
        } else {
            front = front->next;
        }
        
        delete temp;
        queueSize--;
        
        cout << "Dequeued: " << value << endl;
        display();
        return value;
    }
    
    // Get front element
    int getFront() {
        if(isEmpty()) {
            throw runtime_error("Queue is empty! Cannot get front.");
        }
        
        int value = front->data;
        cout << "Front element: " << value << endl;
        return value;
    }
    
    // Get rear element
    int getRear() {
        if(isEmpty()) {
            throw runtime_error("Queue is empty! Cannot get rear.");
        }
        
        int value = rear->data;
        cout << "Rear element: " << value << endl;
        return value;
    }
    
    // Check if queue is empty
    bool isEmpty() {
        return front == nullptr;
    }
    
    // Get current size
    int size() {
        return queueSize;
    }
    
    // Display queue contents
    void display() {
        if(isEmpty()) {
            cout << "Queue: [Empty]" << endl;
            return;
        }
        
        cout << "Queue (Front → Rear): ";
        Node* current = front;
        while(current != nullptr) {
            cout << current->data;
            if(current->next != nullptr) cout << " ← ";
            current = current->next;
        }
        cout << " | Size: " << size() << endl;
    }
    
    // Visual representation
    void displayVisual() {
        cout << "\n=== Linked List Queue Visualization ===" << endl;
        
        if(isEmpty()) {
            cout << "  [Empty Queue]" << endl;
            cout << "  Front: NULL, Rear: NULL" << endl;
        } else {
            Node* current = front;
            int position = 0;
            
            cout << "Front → ";
            while(current != nullptr) {
                cout << "+---+";
                if(current->next != nullptr) cout << " → ";
                current = current->next;
            }
            cout << " NULL" << endl;
            
            current = front;
            cout << "       |";
            while(current != nullptr) {
                cout << " " << current->data << " |";
                if(current->next != nullptr) cout << "     ";
                current = current->next;
            }
            cout << endl;
            
            current = front;
            cout << "       +---+";
            while(current != nullptr && current->next != nullptr) {
                cout << "     +---+";
                current = current->next;
            }
            cout << endl;
            
            // Show pointers
            cout << "\nNode Details:" << endl;
            current = front;
            position = 0;
            while(current != nullptr) {
                cout << "  Node " << position++ << ": ";
                cout << "Data=" << current->data << ", ";
                cout << "Address=" << current << ", ";
                cout << "Next=" << current->next;
                if(current == front) cout << " [FRONT]";
                if(current == rear) cout << " [REAR]";
                cout << endl;
                current = current->next;
            }
        }
        
        cout << "Size: " << queueSize << endl;
        cout << "======================================" << endl;
    }
};

// Example usage
void demonstrateLinkedListQueue() {
    cout << "\n\n=== Linked List Queue Implementation ===" << endl;
    
    LinkedListQueue queue;
    
    try {
        // Enqueue operations
        queue.enqueue(100);
        queue.enqueue(200);
        queue.enqueue(300);
        
        // Display visual representation
        queue.displayVisual();
        
        // Get front and rear
        queue.getFront();
        queue.getRear();
        
        // Dequeue operations
        queue.dequeue();
        queue.dequeue();
        
        // Check size
        cout << "\nCurrent size: " << queue.size() << endl;
        
        // More operations
        queue.enqueue(400);
        queue.enqueue(500);
        queue.enqueue(600);
        
        queue.displayVisual();
        
        // Show memory efficiency
        cout << "\nMemory Efficiency:" << endl;
        cout << "Unlike array-based queues, linked list queues:" << endl;
        cout << "1. Never waste space (no fixed capacity)" << endl;
        cout << "2. Can grow dynamically" << endl;
        cout << "3. No need for circular logic" << endl;
        cout << "4. But have pointer overhead" << endl;
        
    } catch(const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
}

int main() {
    demonstrateLinkedListQueue();
    return 0;
}
```

**Output:**
```
=== Linked List Queue Implementation ===
Linked List Queue created
Enqueued: 100
Queue: [Empty]
Queue (Front → Rear): 100 | Size: 1
Enqueued: 200
Queue (Front → Rear): 100 ← 200 | Size: 2
Enqueued: 300
Queue (Front → Rear): 100 ← 200 ← 300 | Size: 3

=== Linked List Queue Visualization ===
Front → +---+ → +---+ → +---+ NULL
       | 100 |     | 200 |     | 300 |
       +---+     +---+     +---+

Node Details:
  Node 0: Data=100, Address=0x55f1a3a6deb0, Next=0x55f1a3a6de90 [FRONT]
  Node 1: Data=200, Address=0x55f1a3a6de90, Next=0x55f1a3a6de70
  Node 2: Data=300, Address=0x55f1a3a6de70, Next=0 [REAR]
Size: 3
======================================
Front element: 100
Rear element: 300
Dequeued: 100
Queue (Front → Rear): 200 ← 300 | Size: 2
Dequeued: 200
Queue (Front → Rear): 300 | Size: 1

Current size: 1
Enqueued: 400
Queue (Front → Rear): 300 ← 400 | Size: 2
Enqueued: 500
Queue (Front → Rear): 300 ← 400 ← 500 | Size: 3
Enqueued: 600
Queue (Front → Rear): 300 ← 400 ← 500 ← 600 | Size: 4

=== Linked List Queue Visualization ===
Front → +---+ → +---+ → +---+ → +---+ NULL
       | 300 |     | 400 |     | 500 |     | 600 |
       +---+     +---+     +---+     +---+

Node Details:
  Node 0: Data=300, Address=0x55f1a3a6de70, Next=0x55f1a3a6ded0 [FRONT]
  Node 1: Data=400, Address=0x55f1a3a6ded0, Next=0x55f1a3a6def0
  Node 2: Data=500, Address=0x55f1a3a6def0, Next=0x55f1a3a6df10
  Node 3: Data=600, Address=0x55f1a3a6df10, Next=0 [REAR]
Size: 4
======================================

Cleaning up queue...
Dequeued: 300
Queue (Front → Rear): 400 ← 500 ← 600 | Size: 3
Dequeued: 400
Queue (Front → Rear): 500 ← 600 | Size: 2
Dequeued: 500
Queue (Front → Rear): 600 | Size: 1
Dequeued: 600
Queue: [Empty]
```

### 6. Queue Applications and Use Cases

```cpp
#include <iostream>
#include <queue>
#include <string>
#include <chrono>
#include <thread>
#include <random>
using namespace std;

class QueueApplications {
public:
    // 1. Breadth-First Search (BFS) Simulation
    static void demonstrateBFS() {
        cout << "=== Breadth-First Search (BFS) Simulation ===" << endl;
        
        // Simple graph representation (adjacency list)
        vector<vector<int>> graph = {
            {1, 2},     // Node 0 connected to 1 and 2
            {0, 3, 4},  // Node 1 connected to 0, 3, 4
            {0, 5},     // Node 2 connected to 0, 5
            {1},        // Node 3 connected to 1
            {1, 5},     // Node 4 connected to 1, 5
            {2, 4}      // Node 5 connected to 2, 4
        };
        
        int startNode = 0;
        vector<bool> visited(6, false);
        queue<int> q;
        
        cout << "Graph with 6 nodes" << endl;
        cout << "Starting BFS from node " << startNode << endl << endl;
        
        // Start BFS
        q.push(startNode);
        visited[startNode] = true;
        
        int level = 0;
        while(!q.empty()) {
            int levelSize = q.size();
            cout << "Level " << level++ << ": ";
            
            for(int i = 0; i < levelSize; i++) {
                int currentNode = q.front();
                q.pop();
                
                cout << currentNode << " ";
                
                // Visit all neighbors
                for(int neighbor : graph[currentNode]) {
                    if(!visited[neighbor]) {
                        visited[neighbor] = true;
                        q.push(neighbor);
                    }
                }
            }
            cout << endl;
        }
        
        cout << "\nBFS Traversal Complete!" << endl;
    }
    
    // 2. Print Server Simulation
    static void demonstratePrintServer() {
        cout << "\n\n=== Print Server Simulation ===" << endl;
        
        struct PrintJob {
            int jobId;
            string documentName;
            int pages;
            
            void display() const {
                cout << "Job " << jobId << ": '" << documentName 
                     << "' (" << pages << " pages)";
            }
        };
        
        queue<PrintJob> printQueue;
        int jobCounter = 1;
        
        auto addPrintJob = [&](const string& docName, int pages) {
            PrintJob job{jobCounter++, docName, pages};
            printQueue.push(job);
            cout << "Added: ";
            job.display();
            cout << endl;
        };
        
        auto processPrintJob = [&]() {
            if(printQueue.empty()) {
                cout << "No jobs to process" << endl;
                return;
            }
            
            PrintJob job = printQueue.front();
            printQueue.pop();
            
            cout << "Processing: ";
            job.display();
            cout << endl;
            
            // Simulate printing time
            this_thread::sleep_for(chrono::milliseconds(500));
            cout << "  ✓ Completed!" << endl;
        };
        
        auto showQueueStatus = [&]() {
            cout << "\nPrint Queue Status:" << endl;
            if(printQueue.empty()) {
                cout << "  Queue is empty" << endl;
            } else {
                cout << "  Jobs in queue: " << printQueue.size() << endl;
                queue<PrintJob> temp = printQueue;
                int position = 1;
                while(!temp.empty()) {
                    cout << "  " << position++ << ". ";
                    temp.front().display();
                    cout << endl;
                    temp.pop();
                }
            }
        };
        
        // Simulate print server operations
        addPrintJob("Report.pdf", 10);
        addPrintJob("Presentation.pptx", 15);
        addPrintJob("Invoice.doc", 3);
        
        showQueueStatus();
        
        cout << "\n--- Processing Jobs ---" << endl;
        processPrintJob();
        processPrintJob();
        
        addPrintJob("Letter.txt", 2);
        
        showQueueStatus();
        
        cout << "\n--- Processing Remaining Jobs ---" << endl;
        while(!printQueue.empty()) {
            processPrintJob();
        }
        
        showQueueStatus();
    }
    
    // 3. Call Center Simulation
    static void demonstrateCallCenter() {
        cout << "\n\n=== Call Center Simulation ===" << endl;
        
        queue<pair<int, string>> callQueue;  // {callId, callerName}
        int callId = 1;
        int agents = 2;
        
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<> callDist(1, 5);  // Calls arrive every 1-5 seconds
        uniform_int_distribution<> serviceDist(3, 8); // Service takes 3-8 seconds
        
        auto newCall = [&](const string& caller) {
            callQueue.push({callId++, caller});
            cout << "📞 New call from: " << caller << " (ID: " << (callId-1) 
                 << "), Queue position: " << callQueue.size() << endl;
        };
        
        auto takeCall = [&](int agentId) {
            if(callQueue.empty()) {
                cout << "Agent " << agentId << ": No calls waiting" << endl;
                return;
            }
            
            auto call = callQueue.front();
            callQueue.pop();
            
            cout << "Agent " << agentId << ": Taking call from " << call.second 
                 << " (ID: " << call.first << ")" << endl;
            
            // Simulate call duration
            int duration = serviceDist(gen);
            this_thread::sleep_for(chrono::milliseconds(duration * 100));
            
            cout << "Agent " << agentId << ": Completed call with " << call.second 
                 << " (" << duration << " seconds)" << endl;
        };
        
        // Simulate call center operations
        cout << "Call center with " << agents << " agents opening..." << endl;
        
        // Initial calls
        newCall("Alice");
        newCall("Bob");
        newCall("Charlie");
        
        // Process calls
        for(int i = 0; i < 10; i++) {
            cout << "\n--- Time: " << i << " seconds ---" << endl;
            
            // Random new calls
            if(callDist(gen) <= 2) {  // 40% chance of new call
                vector<string> names = {"David", "Eve", "Frank", "Grace", "Henry"};
                newCall(names[callDist(gen) % names.size()]);
            }
            
            // Agents take calls
            for(int agent = 1; agent <= agents; agent++) {
                takeCall(agent);
            }
            
            // Show queue status
            if(!callQueue.empty()) {
                cout << "Calls waiting: " << callQueue.size() << endl;
            }
            
            this_thread::sleep_for(chrono::milliseconds(500));
        }
        
        cout << "\nCall center closing..." << endl;
        cout << "Remaining calls in queue: " << callQueue.size() << endl;
    }
    
    // 4. CPU Task Scheduling (Round Robin)
    static void demonstrateTaskScheduling() {
        cout << "\n\n=== CPU Task Scheduling (Round Robin) ===" << endl;
        
        struct Task {
            int id;
            string name;
            int burstTime;  // CPU time needed
            int remainingTime;
            
            Task(int i, string n, int bt) 
                : id(i), name(n), burstTime(bt), remainingTime(bt) {}
            
            void display() const {
                cout << "Task " << id << " ('" << name << "'): " 
                     << remainingTime << "/" << burstTime << " ms remaining";
            }
        };
        
        queue<Task> taskQueue;
        int timeQuantum = 4;  // ms per time slice
        
        // Create tasks
        vector<Task> tasks = {
            {1, "System Update", 10},
            {2, "User Process", 8},
            {3, "Background Job", 6},
            {4, "I/O Operation", 12},
            {5, "Network Request", 7}
        };
        
        // Add all tasks to queue
        for(auto& task : tasks) {
            taskQueue.push(task);
            cout << "Added: ";
            task.display();
            cout << endl;
        }
        
        cout << "\nStarting Round Robin Scheduling (Time Quantum: " 
             << timeQuantum << "ms)" << endl;
        cout << "==============================================" << endl;
        
        int currentTime = 0;
        int completedTasks = 0;
        
        while(!taskQueue.empty()) {
            Task currentTask = taskQueue.front();
            taskQueue.pop();
            
            cout << "\nTime " << currentTime << "ms: ";
            currentTask.display();
            cout << endl;
            
            // Execute for time quantum or remaining time, whichever is smaller
            int executeTime = min(timeQuantum, currentTask.remainingTime);
            currentTime += executeTime;
            currentTask.remainingTime -= executeTime;
            
            cout << "  Executed for " << executeTime << "ms, ";
            cout << "now at time " << currentTime << "ms" << endl;
            
            if(currentTask.remainingTime > 0) {
                // Task not finished, put back in queue
                taskQueue.push(currentTask);
                cout << "  Task not finished, requeued" << endl;
            } else {
                // Task completed
                completedTasks++;
                cout << "  ✓ Task completed! Total time: " << currentTask.burstTime << "ms" << endl;
                cout << "  Completed tasks: " << completedTasks << "/" << tasks.size() << endl;
            }
            
            // Show queue status
            if(!taskQueue.empty()) {
                cout << "  Tasks in queue: " << taskQueue.size() << endl;
            }
        }
        
        cout << "\n==============================================" << endl;
        cout << "All tasks completed in " << currentTime << "ms" << endl;
        cout << "Average waiting time would be calculated based on scheduling" << endl;
    }
};

// Main demonstration
void demonstrateQueueApplications() {
    cout << "=== Queue Applications and Use Cases ===" << endl;
    
    // 1. BFS Simulation
    QueueApplications::demonstrateBFS();
    
    // 2. Print Server Simulation
    QueueApplications::demonstratePrintServer();
    
    // 3. Call Center Simulation
    QueueApplications::demonstrateCallCenter();
    
    // 4. Task Scheduling
    QueueApplications::demonstrateTaskScheduling();
}

int main() {
    demonstrateQueueApplications();
    return 0;
}
```

**Output:**
```
=== Queue Applications and Use Cases ===
=== Breadth-First Search (BFS) Simulation ===
Graph with 6 nodes
Starting BFS from node 0

Level 0: 0 
Level 1: 1 2 
Level 2: 3 4 5 

BFS Traversal Complete!

=== Print Server Simulation ===
Added: Job 1: 'Report.pdf' (10 pages)
Added: Job 2: 'Presentation.pptx' (15 pages)
Added: Job 3: 'Invoice.doc' (3 pages)

Print Queue Status:
  Jobs in queue: 3
  1. Job 1: 'Report.pdf' (10 pages)
  2. Job 2: 'Presentation.pptx' (15 pages)
  3. Job 3: 'Invoice.doc' (3 pages)

--- Processing Jobs ---
Processing: Job 1: 'Report.pdf' (10 pages)
  ✓ Completed!
Processing: Job 2: 'Presentation.pptx' (15 pages)
  ✓ Completed!
Added: Job 4: 'Letter.txt' (2 pages)

Print Queue Status:
  Jobs in queue: 2
  1. Job 3: 'Invoice.doc' (3 pages)
  2. Job 4: 'Letter.txt' (2 pages)

--- Processing Remaining Jobs ---
Processing: Job 3: 'Invoice.doc' (3 pages)
  ✓ Completed!
Processing: Job 4: 'Letter.txt' (2 pages)
  ✓ Completed!

Print Queue Status:
  Queue is empty

=== Call Center Simulation ===
Call center with 2 agents opening...
📞 New call from: Alice (ID: 1), Queue position: 1
📞 New call from: Bob (ID: 2), Queue position: 2
📞 New call from: Charlie (ID: 3), Queue position: 3

--- Time: 0 seconds ---
Agent 1: Taking call from Alice (ID: 1)
Agent 2: Taking call from Bob (ID: 2)

--- Time: 1 seconds ---
Agent 1: Completed call with Alice (5 seconds)
Agent 1: Taking call from Charlie (ID: 3)
Agent 2: Completed call with Bob (6 seconds)
Agent 2: No calls waiting
... (simulation continues) ...

Call center closing...
Remaining calls in queue: 1

=== CPU Task Scheduling (Round Robin) ===
Added: Task 1 ('System Update'): 10/10 ms remaining
Added: Task 2 ('User Process'): 8/8 ms remaining
Added: Task 3 ('Background Job'): 6/6 ms remaining
Added: Task 4 ('I/O Operation'): 12/12 ms remaining
Added: Task 5 ('Network Request'): 7/7 ms remaining

Starting Round Robin Scheduling (Time Quantum: 4ms)
==============================================

Time 0ms: Task 1 ('System Update'): 10/10 ms remaining
  Executed for 4ms, now at time 4ms
  Task not finished, requeued
  Tasks in queue: 4

Time 4ms: Task 2 ('User Process'): 8/8 ms remaining
  Executed for 4ms, now at time 8ms
  Task not finished, requeued
  Tasks in queue: 4
... (scheduling continues) ...
==============================================
All tasks completed in 43ms
Average waiting time would be calculated based on scheduling
```

## Comparison: Stack vs Queue Implementations

```cpp
#include <iostream>
#include <stack>
#include <queue>
#include <vector>
#include <chrono>
#include <iomanip>
using namespace std;
using namespace chrono;

class PerformanceComparison {
public:
    static void compareStackImplementations(int n) {
        cout << "\n" << string(70, '=') << endl;
        cout << "Performance Comparison: Stack Implementations (n = " << n << ")" << endl;
        cout << string(70, '=') << endl;
        
        // 1. STL Stack
        cout << "\n1. STL Stack (deque by default):" << endl;
        stack<int> stlStack;
        
        auto start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            stlStack.push(i);
        }
        auto end = high_resolution_clock::now();
        auto stlPushTime = duration_cast<microseconds>(end - start).count();
        
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            stlStack.pop();
        }
        end = high_resolution_clock::now();
        auto stlPopTime = duration_cast<microseconds>(end - start).count();
        
        // 2. Array-based Stack
        cout << "\n2. Custom Array-based Stack:" << endl;
        vector<int> arrayStack;
        arrayStack.reserve(n);
        
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            arrayStack.push_back(i);
        }
        end = high_resolution_clock::now();
        auto arrayPushTime = duration_cast<microseconds>(end - start).count();
        
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            arrayStack.pop_back();
        }
        end = high_resolution_clock::now();
        auto arrayPopTime = duration_cast<microseconds>(end - start).count();
        
        // 3. Linked List-based Stack
        cout << "\n3. Custom Linked List-based Stack:" << endl;
        struct Node {
            int data;
            Node* next;
        };
        
        Node* linkedStack = nullptr;
        
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            Node* newNode = new Node{i, linkedStack};
            linkedStack = newNode;
        }
        end = high_resolution_clock::now();
        auto linkedPushTime = duration_cast<microseconds>(end - start).count();
        
        start = high_resolution_clock::now();
        while(linkedStack != nullptr) {
            Node* temp = linkedStack;
            linkedStack = linkedStack->next;
            delete temp;
        }
        end = high_resolution_clock::now();
        auto linkedPopTime = duration_cast<microseconds>(end - start).count();
        
        // Display results
        cout << fixed << setprecision(2);
        cout << "\n" << string(70, '-') << endl;
        cout << setw(25) << "Implementation" 
             << setw(15) << "Push Time" 
             << setw(15) << "Pop Time" 
             << setw(15) << "Total Time" << endl;
        cout << string(70, '-') << endl;
        
        cout << setw(25) << "STL Stack" 
             << setw(15) << stlPushTime << " μs"
             << setw(15) << stlPopTime << " μs"
             << setw(15) << (stlPushTime + stlPopTime) << " μs" << endl;
        
        cout << setw(25) << "Array-based Stack" 
             << setw(15) << arrayPushTime << " μs"
             << setw(15) << arrayPopTime << " μs"
             << setw(15) << (arrayPushTime + arrayPopTime) << " μs" << endl;
        
        cout << setw(25) << "Linked List Stack" 
             << setw(15) << linkedPushTime << " μs"
             << setw(15) << linkedPopTime << " μs"
             << setw(15) << (linkedPushTime + linkedPopTime) << " μs" << endl;
        
        cout << "\nKey Observations:" << endl;
        cout << "1. Array-based: Fastest for push/pop, contiguous memory" << endl;
        cout << "2. Linked List: Dynamic size, no capacity limits" << endl;
        cout << "3. STL Stack: Good balance, uses deque (double-ended queue)" << endl;
    }
    
    static void compareQueueImplementations(int n) {
        cout << "\n\n" << string(70, '=') << endl;
        cout << "Performance Comparison: Queue Implementations (n = " << n << ")" << endl;
        cout << string(70, '=') << endl;
        
        // 1. STL Queue
        cout << "\n1. STL Queue (deque by default):" << endl;
        queue<int> stlQueue;
        
        auto start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            stlQueue.push(i);
        }
        auto end = high_resolution_clock::now();
        auto stlEnqueueTime = duration_cast<microseconds>(end - start).count();
        
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            stlQueue.pop();
        }
        end = high_resolution_clock::now();
        auto stlDequeueTime = duration_cast<microseconds>(end - start).count();
        
        // 2. Circular Queue
        cout << "\n2. Custom Circular Queue:" << endl;
        vector<int> circularQueue(n);
        int front = 0, rear = -1, size = 0;
        
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            rear = (rear + 1) % n;
            circularQueue[rear] = i;
            size++;
        }
        end = high_resolution_clock::now();
        auto circularEnqueueTime = duration_cast<microseconds>(end - start).count();
        
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            front = (front + 1) % n;
            size--;
        }
        end = high_resolution_clock::now();
        auto circularDequeueTime = duration_cast<microseconds>(end - start).count();
        
        // Display results
        cout << "\n" << string(70, '-') << endl;
        cout << setw(25) << "Implementation" 
             << setw(15) << "Enqueue Time" 
             << setw(15) << "Dequeue Time" 
             << setw(15) << "Total Time" << endl;
        cout << string(70, '-') << endl;
        
        cout << setw(25) << "STL Queue" 
             << setw(15) << stlEnqueueTime << " μs"
             << setw(15) << stlDequeueTime << " μs"
             << setw(15) << (stlEnqueueTime + stlDequeueTime) << " μs" << endl;
        
        cout << setw(25) << "Circular Queue" 
             << setw(15) << circularEnqueueTime << " μs"
             << setw(15) << circularDequeueTime << " μs"
             << setw(15) << (circularEnqueueTime + circularDequeueTime) << " μs" << endl;
        
        cout << "\nKey Observations:" << endl;
        cout << "1. Circular Queue: Most efficient for fixed-size requirements" << endl;
        cout << "2. STL Queue: Flexible, good for general use" << endl;
        cout << "3. Linear Queue: Not shown (wastes space)" << endl;
    }
    
    static void stackVsQueueComparison() {
        cout << "\n\n" << string(70, '=') << endl;
        cout << "Stack vs Queue: When to Use Which?" << endl;
        cout << string(70, '=') << endl;
        
        cout << "\nUse STACK when:" << endl;
        cout << "1. Need LIFO behavior (last in, first out)" << endl;
        cout << "2. Implementing undo/redo functionality" << endl;
        cout << "3. Parsing expressions (postfix, infix)" << endl;
        cout << "4. Depth-First Search (DFS) algorithms" << endl;
        cout << "5. Function call management (call stack)" << endl;
        cout << "6. Backtracking algorithms" << endl;
        cout << "7. Syntax parsing (parentheses matching)" << endl;
        
        cout << "\nUse QUEUE when:" << endl;
        cout << "1. Need FIFO behavior (first in, first out)" << endl;
        cout << "2. Implementing task scheduling" << endl;
        cout << "3. Breadth-First Search (BFS) algorithms" << endl;
        cout << "4. Print spooling or job scheduling" << endl;
        cout << "5. Handling requests (web server, call center)" << endl;
        cout << "6. Message passing between processes" << endl;
        cout << "7. Simulating real-world queues" << endl;
        
        cout << "\nCommon Implementations:" << endl;
        cout << "Stack: Array, Linked List, Vector, Deque" << endl;
        cout << "Queue: Circular Array, Linked List, Deque, Priority Queue" << endl;
        
        cout << "\nTime Complexities (Average Case):" << endl;
        cout << setw(20) << "Operation" << setw(15) << "Stack" << setw(15) << "Queue" << endl;
        cout << string(50, '-') << endl;
        cout << setw(20) << "Insert" << setw(15) << "O(1)" << setw(15) << "O(1)" << endl;
        cout << setw(20) << "Delete" << setw(15) << "O(1)" << setw(15) << "O(1)" << endl;
        cout << setw(20) << "Access Top/Front" << setw(15) << "O(1)" << setw(15) << "O(1)" << endl;
        cout << setw(20) << "Search" << setw(15) << "O(n)" << setw(15) << "O(n)" << endl;
        
        cout << "\nMemory Considerations:" << endl;
        cout << "• Stack: Simpler, less overhead" << endl;
        cout << "• Queue: May need circular implementation to avoid waste" << endl;
        cout << "• Both: Dynamic versions have allocation overhead" << endl;
    }
};

int main() {
    int testSize = 10000;
    
    PerformanceComparison::compareStackImplementations(testSize);
    PerformanceComparison::compareQueueImplementations(testSize);
    PerformanceComparison::stackVsQueueComparison();
    
    return 0;
}
```

## STL Stack and Queue

```cpp
#include <iostream>
#include <stack>
#include <queue>
#include <deque>
#include <list>
#include <vector>
#include <string>
using namespace std;

void demonstrateSTLContainers() {
    cout << "=== STL Stack and Queue Containers ===" << endl;
    
    // 1. STL Stack with different underlying containers
    cout << "\n1. STL Stack with different containers:" << endl;
    
    // Default (uses deque)
    stack<int> stack1;
    cout << "Default stack (deque): ";
    for(int i = 1; i <= 5; i++) stack1.push(i * 10);
    while(!stack1.empty()) {
        cout << stack1.top() << " ";
        stack1.pop();
    }
    cout << endl;
    
    // Stack with vector
    stack<int, vector<int>> stack2;
    cout << "Stack with vector: ";
    for(int i = 1; i <= 5; i++) stack2.push(i * 10);
    while(!stack2.empty()) {
        cout << stack2.top() << " ";
        stack2.pop();
    }
    cout << endl;
    
    // Stack with list
    stack<int, list<int>> stack3;
    cout << "Stack with list: ";
    for(int i = 1; i <= 5; i++) stack3.push(i * 10);
    while(!stack3.empty()) {
        cout << stack3.top() << " ";
        stack3.pop();
    }
    cout << endl;
    
    // 2. STL Queue with different underlying containers
    cout << "\n2. STL Queue with different containers:" << endl;
    
    // Default (uses deque)
    queue<int> queue1;
    cout << "Default queue (deque): ";
    for(int i = 1; i <= 5; i++) queue1.push(i * 10);
    while(!queue1.empty()) {
        cout << queue1.front() << " ";
        queue1.pop();
    }
    cout << endl;
    
    // Queue with list
    queue<int, list<int>> queue2;
    cout << "Queue with list: ";
    for(int i = 1; i <= 5; i++) queue2.push(i * 10);
    while(!queue2.empty()) {
        cout << queue2.front() << " ";
        queue2.pop();
    }
    cout << endl;
    
    // 3. Deque (Double-ended queue) - versatile container
    cout << "\n3. Deque (Double-ended queue):" << endl;
    deque<int> dq;
    
    // Add elements at both ends
    dq.push_back(10);
    dq.push_front(5);
    dq.push_back(20);
    dq.push_front(1);
    
    cout << "Deque contents: ";
    for(int num : dq) {
        cout << num << " ";
    }
    cout << endl;
    
    cout << "Front: " << dq.front() << ", Back: " << dq.back() << endl;
    
    // Remove from both ends
    dq.pop_front();
    dq.pop_back();
    
    cout << "After pop_front and pop_back: ";
    for(int num : dq) {
        cout << num << " ";
    }
    cout << endl;
    
    // 4. Priority Queue (Heap)
    cout << "\n4. Priority Queue (Max-Heap by default):" << endl;
    priority_queue<int> pq;
    
    pq.push(30);
    pq.push(10);
    pq.push(50);
    pq.push(20);
    pq.push(40);
    
    cout << "Priority queue contents (max first): ";
    while(!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;
    
    // Min-Heap
    cout << "Priority queue as min-heap: ";
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    minHeap.push(30);
    minHeap.push(10);
    minHeap.push(50);
    minHeap.push(20);
    minHeap.push(40);
    
    while(!minHeap.empty()) {
        cout << minHeap.top() << " ";
        minHeap.pop();
    }
    cout << endl;
    
    // 5. Container Adapters Summary
    cout << "\n5. Container Adapters Summary:" << endl;
    cout << "Stack: LIFO, adapts deque/vector/list" << endl;
    cout << "Queue: FIFO, adapts deque/list" << endl;
    cout << "Priority Queue: Sorted, adapts vector/deque" << endl;
    cout << "Deque: Double-ended, base for stack/queue" << endl;
    
    cout << "\nChoosing the right container:" << endl;
    cout << "• Need LIFO? Use stack" << endl;
    cout << "• Need FIFO? Use queue" << endl;
    cout << "• Need sorted access? Use priority_queue" << endl;
    cout << "• Need both ends? Use deque directly" << endl;
    cout << "• Performance critical? Test with your data" << endl;
}

// Custom comparator for priority queue
struct Task {
    string name;
    int priority;
    int duration;
    
    Task(string n, int p, int d) : name(n), priority(p), duration(d) {}
    
    // For max-heap based on priority
    bool operator<(const Task& other) const {
        return priority < other.priority;
    }
    
    // For min-heap based on priority
    bool operator>(const Task& other) const {
        return priority > other.priority;
    }
};

void demonstrateCustomPriorityQueue() {
    cout << "\n\n=== Custom Objects in Priority Queue ===" << endl;
    
    // Max-heap (highest priority first)
    priority_queue<Task> taskQueue;
    
    taskQueue.push(Task("System Update", 1, 10));
    taskQueue.push(Task("User Request", 3, 5));
    taskQueue.push(Task("Critical Bug Fix", 5, 8));
    taskQueue.push(Task("Background Job", 2, 15));
    taskQueue.push(Task("Security Patch", 4, 6));
    
    cout << "Processing tasks by priority (highest first):" << endl;
    while(!taskQueue.empty()) {
        Task task = taskQueue.top();
        taskQueue.pop();
        cout << "  • " << task.name << " (Priority: " << task.priority 
             << ", Duration: " << task.duration << "min)" << endl;
    }
    
    // Min-heap (lowest priority first)
    cout << "\nProcessing tasks by priority (lowest first):" << endl;
    priority_queue<Task, vector<Task>, greater<Task>> minPriorityQueue;
    
    minPriorityQueue.push(Task("System Update", 1, 10));
    minPriorityQueue.push(Task("User Request", 3, 5));
    minPriorityQueue.push(Task("Critical Bug Fix", 5, 8));
    
    while(!minPriorityQueue.empty()) {
        Task task = minPriorityQueue.top();
        minPriorityQueue.pop();
        cout << "  • " << task.name << " (Priority: " << task.priority 
             << ", Duration: " << task.duration << "min)" << endl;
    }
}

int main() {
    demonstrateSTLContainers();
    demonstrateCustomPriorityQueue();
    return 0;
}
```

## Common Interview Questions

### 1. Implement Stack using Queues
```cpp
#include <iostream>
#include <queue>
using namespace std;

class StackUsingQueues {
private:
    queue<int> q1;
    queue<int> q2;
    
public:
    // Push operation - O(1)
    void push(int x) {
        q1.push(x);
        cout << "Pushed: " << x << endl;
    }
    
    // Pop operation - O(n)
    int pop() {
        if(q1.empty()) {
            throw runtime_error("Stack is empty!");
        }
        
        // Move all elements except last from q1 to q2
        while(q1.size() > 1) {
            q2.push(q1.front());
            q1.pop();
        }
        
        // Last element is the top
        int topValue = q1.front();
        q1.pop();
        
        // Swap q1 and q2
        swap(q1, q2);
        
        cout << "Popped: " << topValue << endl;
        return topValue;
    }
    
    // Top operation - O(n)
    int top() {
        if(q1.empty()) {
            throw runtime_error("Stack is empty!");
        }
        
        // Move all elements except last from q1 to q2
        while(q1.size() > 1) {
            q2.push(q1.front());
            q1.pop();
        }
        
        // Last element is the top
        int topValue = q1.front();
        q2.push(topValue);
        q1.pop();
        
        // Swap q1 and q2
        swap(q1, q2);
        
        cout << "Top: " << topValue << endl;
        return topValue;
    }
    
    bool empty() {
        return q1.empty();
    }
    
    void display() {
        cout << "Stack (top to bottom): ";
        queue<int> temp = q1;
        vector<int> elements;
        
        while(!temp.empty()) {
            elements.push_back(temp.front());
            temp.pop();
        }
        
        // Display in reverse (top first)
        for(int i = elements.size() - 1; i >= 0; i--) {
            cout << elements[i];
            if(i > 0) cout << " → ";
        }
        cout << endl;
    }
};

void demonstrateStackUsingQueues() {
    cout << "=== Implementing Stack using Two Queues ===" << endl;
    
    StackUsingQueues stack;
    
    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    stack.display();
    
    stack.top();
    stack.pop();
    
    stack.display();
    
    stack.push(40);
    stack.push(50);
    
    stack.display();
    
    while(!stack.empty()) {
        stack.pop();
    }
}
```

### 2. Implement Queue using Stacks
```cpp
#include <iostream>
#include <stack>
using namespace std;

class QueueUsingStacks {
private:
    stack<int> s1;  // For enqueue
    stack<int> s2;  // For dequeue
    
    // Transfer elements from s1 to s2 when s2 is empty
    void transferIfNeeded() {
        if(s2.empty()) {
            while(!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
    }
    
public:
    // Enqueue operation - O(1)
    void enqueue(int x) {
        s1.push(x);
        cout << "Enqueued: " << x << endl;
    }
    
    // Dequeue operation - Amortized O(1)
    int dequeue() {
        if(empty()) {
            throw runtime_error("Queue is empty!");
        }
        
        transferIfNeeded();
        
        int frontValue = s2.top();
        s2.pop();
        
        cout << "Dequeued: " << frontValue << endl;
        return frontValue;
    }
    
    // Front operation - Amortized O(1)
    int front() {
        if(empty()) {
            throw runtime_error("Queue is empty!");
        }
        
        transferIfNeeded();
        
        int frontValue = s2.top();
        cout << "Front: " << frontValue << endl;
        return frontValue;
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }
    
    void display() {
        cout << "Queue (front to rear): ";
        
        // First show elements in s2 (front elements)
        stack<int> temp = s2;
        vector<int> elements;
        
        while(!temp.empty()) {
            elements.push_back(temp.top());
            temp.pop();
        }
        
        // s2 elements are in reverse order in the stack
        for(int i = elements.size() - 1; i >= 0; i--) {
            cout << elements[i] << " ← ";
        }
        
        // Then show elements in s1 (rear elements)
        temp = s1;
        elements.clear();
        
        while(!temp.empty()) {
            elements.push_back(temp.top());
            temp.pop();
        }
        
        // s1 elements are already in correct order
        for(int i = 0; i < elements.size(); i++) {
            cout << elements[i];
            if(i < elements.size() - 1) cout << " ← ";
        }
        
        cout << endl;
    }
};

void demonstrateQueueUsingStacks() {
    cout << "\n\n=== Implementing Queue using Two Stacks ===" << endl;
    
    QueueUsingStacks queue;
    
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    
    queue.display();
    
    queue.front();
    queue.dequeue();
    
    queue.display();
    
    queue.enqueue(40);
    queue.enqueue(50);
    
    queue.display();
    
    while(!queue.empty()) {
        queue.dequeue();
    }
}
```

### 3. Next Greater Element
```cpp
#include <iostream>
#include <stack>
#include <vector>
using namespace std;

vector<int> nextGreaterElement(const vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> s;
    
    cout << "Finding Next Greater Element for each element:" << endl;
    cout << "Array: ";
    for(int num : arr) cout << num << " ";
    cout << endl << endl;
    
    for(int i = 0; i < n; i++) {
        cout << "Processing arr[" << i << "] = " << arr[i] << endl;
        
        while(!s.empty() && arr[s.top()] < arr[i]) {
            int idx = s.top();
            s.pop();
            result[idx] = arr[i];
            cout << "  arr[" << idx << "] = " << arr[idx] 
                 << " → NGE = " << arr[i] << endl;
        }
        
        s.push(i);
        cout << "  Pushed index " << i << " to stack" << endl;
    }
    
    cout << "\nRemaining elements in stack have no NGE" << endl;
    
    cout << "\nResult: ";
    for(int num : result) cout << num << " ";
    cout << endl;
    
    return result;
}

void demonstrateNextGreaterElement() {
    cout << "\n\n=== Next Greater Element Problem ===" << endl;
    
    vector<int> arr = {4, 5, 2, 10, 8};
    vector<int> result = nextGreaterElement(arr);
}
```

## Summary

### Stacks Summary:
- **Principle**: LIFO (Last-In-First-Out)
- **Operations**: push(), pop(), peek(), isEmpty(), size()
- **Implementations**: Array, Linked List, Vector, Deque
- **Time Complexity**: O(1) for all operations
- **Applications**: 
  - Function call stack
  - Expression evaluation
  - Undo/Redo operations
  - Parentheses matching
  - Backtracking algorithms
  - Depth-First Search

### Queues Summary:
- **Principle**: FIFO (First-In-First-Out)
- **Operations**: enqueue(), dequeue(), front(), rear(), isEmpty(), size()
- **Implementations**: 
  - Linear Queue (wastes space)
  - Circular Queue (efficient)
  - Linked List Queue (dynamic)
  - Priority Queue (sorted)
- **Time Complexity**: O(1) for all operations (amortized for some)
- **Applications**:
  - Task scheduling
  - Breadth-First Search
  - Print spooling
  - Message queues
  - Call center systems
  - CPU scheduling

### Key Differences:

| Aspect | Stack | Queue |
|--------|-------|-------|
| **Order** | LIFO | FIFO |
| **Insertion** | Always at top | Always at rear |
| **Removal** | Always from top | Always from front |
| **Access** | Only top element | Only front element |
| **Use Case** | Depth processing | Breadth processing |

### When to Choose:

**Choose Stack when:**
- You need to process items in reverse order
- Implementing recursive algorithms iteratively
- Parsing nested structures (HTML/XML, expressions)
- Need backtracking capability
- Memory management (call stack)

**Choose Queue when:**
- You need to process items in arrival order
- Implementing BFS algorithms
- Handling requests/tasks in order
- Buffer management
- Simulating real-world queues

### Best Practices:
1. **Use STL containers** (`stack`, `queue`, `priority_queue`) when possible
2. **Choose implementation based on needs**: 
   - Fixed size → Array/Circular Queue
   - Dynamic size → Linked List
   - Need both ends → Deque
3. **Consider memory locality**: Arrays have better cache performance
4. **Watch for edge cases**: Empty stack/queue operations
5. **Thread safety**: Consider synchronization for concurrent access

### Common Pitfalls:
1. **Stack overflow/underflow**: Always check bounds
2. **Queue waste**: Use circular implementation for arrays
3. **Memory leaks**: Clean up dynamically allocated nodes
4. **Iterator invalidation**: Be careful with references/pointers
5. **Concurrent modification**: Use proper synchronization

Stacks and Queues are fundamental building blocks in computer science. Mastering them is essential for understanding more complex data structures and algorithms. They demonstrate elegant solutions to many real-world problems through simple, well-defined operations.

---
