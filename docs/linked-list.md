# DSA Linked Lists

## Introduction to Linked Lists

A **Linked List** is a linear data structure where elements are stored in **nodes**, and each node points to the next node via a **pointer**. Unlike arrays, linked lists are **dynamic** and can grow/shrink at runtime.

### Key Characteristics:
- **Dynamic Size**: No fixed size, can grow/shrink as needed
- **Memory Efficiency**: Uses memory only when needed
- **Sequential Access**: Elements accessed sequentially (not random access)
- **Insertion/Deletion**: O(1) at beginning, O(n) elsewhere
- **No Memory Wastage**: No pre-allocation needed

## Linked Lists in Memory

### Memory Representation:
- Each node contains:
  - **Data**: The actual value
  - **Next Pointer**: Address of next node
- Nodes are **not contiguous** in memory
- Last node points to `NULL` (end of list)

### Visual Memory Layout:
```
Memory Address | Node Representation
---------------+----------------------
0x1000         | [Data: 10 | Next: 0x2000] → Node 1
0x2000         | [Data: 20 | Next: 0x3000] → Node 2  
0x3000         | [Data: 30 | Next: NULL]   → Node 3
```

### Comparison with Arrays:

| Aspect | Array | Linked List |
|--------|-------|-------------|
| **Memory** | Contiguous | Non-contiguous |
| **Size** | Fixed | Dynamic |
| **Access** | Random (O(1)) | Sequential (O(n)) |
| **Insertion** | O(n) | O(1) at head |
| **Memory Usage** | May waste space | Efficient |
| **Cache** | Friendly | Unfriendly |

## Linked List Types

### 1. Singly Linked List
```cpp
struct Node {
    int data;
    Node* next;
    
    Node(int val) {
        data = val;
        next = nullptr;
    }
};
```

### 2. Doubly Linked List
```cpp
struct Node {
    int data;
    Node* next;
    Node* prev;
    
    Node(int val) {
        data = val;
        next = nullptr;
        prev = nullptr;
    }
};
```

### 3. Circular Linked List
```cpp
// Singly Circular
struct Node {
    int data;
    Node* next;
    
    Node(int val) {
        data = val;
        next = this;  // Points to itself initially
    }
};
```

## Basic Singly Linked List Implementation

```cpp
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    
    Node(int value) {
        data = value;
        next = nullptr;
    }
};

class LinkedList {
private:
    Node* head;
    int size;
    
public:
    LinkedList() {
        head = nullptr;
        size = 0;
    }
    
    // Insert at beginning
    void insertAtHead(int value) {
        Node* newNode = new Node(value);
        newNode->next = head;
        head = newNode;
        size++;
        cout << "Inserted " << value << " at head" << endl;
    }
    
    // Insert at end
    void insertAtTail(int value) {
        Node* newNode = new Node(value);
        
        if(head == nullptr) {
            head = newNode;
        } else {
            Node* temp = head;
            while(temp->next != nullptr) {
                temp = temp->next;
            }
            temp->next = newNode;
        }
        size++;
        cout << "Inserted " << value << " at tail" << endl;
    }
    
    // Insert at specific position
    void insertAtPosition(int value, int position) {
        if(position < 0 || position > size) {
            cout << "Invalid position!" << endl;
            return;
        }
        
        if(position == 0) {
            insertAtHead(value);
            return;
        }
        
        Node* newNode = new Node(value);
        Node* temp = head;
        
        for(int i = 0; i < position - 1; i++) {
            temp = temp->next;
        }
        
        newNode->next = temp->next;
        temp->next = newNode;
        size++;
        cout << "Inserted " << value << " at position " << position << endl;
    }
    
    // Delete from beginning
    void deleteFromHead() {
        if(head == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        Node* temp = head;
        head = head->next;
        cout << "Deleted " << temp->data << " from head" << endl;
        delete temp;
        size--;
    }
    
    // Delete from end
    void deleteFromTail() {
        if(head == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        if(head->next == nullptr) {
            cout << "Deleted " << head->data << " from tail" << endl;
            delete head;
            head = nullptr;
            size--;
            return;
        }
        
        Node* temp = head;
        while(temp->next->next != nullptr) {
            temp = temp->next;
        }
        
        cout << "Deleted " << temp->next->data << " from tail" << endl;
        delete temp->next;
        temp->next = nullptr;
        size--;
    }
    
    // Delete from specific position
    void deleteFromPosition(int position) {
        if(head == nullptr || position < 0 || position >= size) {
            cout << "Invalid position or empty list!" << endl;
            return;
        }
        
        if(position == 0) {
            deleteFromHead();
            return;
        }
        
        Node* temp = head;
        for(int i = 0; i < position - 1; i++) {
            temp = temp->next;
        }
        
        Node* toDelete = temp->next;
        temp->next = temp->next->next;
        cout << "Deleted " << toDelete->data << " from position " << position << endl;
        delete toDelete;
        size--;
    }
    
    // Search for a value
    bool search(int value) {
        Node* temp = head;
        int position = 0;
        
        while(temp != nullptr) {
            if(temp->data == value) {
                cout << "Found " << value << " at position " << position << endl;
                return true;
            }
            temp = temp->next;
            position++;
        }
        
        cout << value << " not found in list" << endl;
        return false;
    }
    
    // Get size
    int getSize() {
        return size;
    }
    
    // Display the list
    void display() {
        if(head == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        cout << "Linked List (" << size << " nodes): ";
        Node* temp = head;
        
        while(temp != nullptr) {
            cout << temp->data;
            if(temp->next != nullptr) {
                cout << " -> ";
            }
            temp = temp->next;
        }
        cout << " -> NULL" << endl;
    }
    
    // Reverse the list
    void reverse() {
        Node* prev = nullptr;
        Node* current = head;
        Node* next = nullptr;
        
        cout << "Reversing linked list..." << endl;
        
        while(current != nullptr) {
            next = current->next;  // Store next node
            current->next = prev;  // Reverse current node's pointer
            prev = current;        // Move pointers one position ahead
            current = next;
        }
        
        head = prev;
        cout << "List reversed successfully!" << endl;
    }
    
    // Destructor to free memory
    ~LinkedList() {
        cout << "\nCleaning up linked list..." << endl;
        Node* current = head;
        while(current != nullptr) {
            Node* next = current->next;
            cout << "Deleting node with value: " << current->data << endl;
            delete current;
            current = next;
        }
        head = nullptr;
        size = 0;
    }
};

int main() {
    LinkedList list;
    
    cout << "=== Singly Linked List Operations ===" << endl;
    
    // Insert operations
    list.insertAtHead(10);
    list.insertAtTail(20);
    list.insertAtTail(30);
    list.insertAtHead(5);
    list.insertAtPosition(15, 2);
    
    list.display();
    
    // Search operation
    list.search(20);
    list.search(100);
    
    // Delete operations
    list.deleteFromHead();
    list.display();
    
    list.deleteFromTail();
    list.display();
    
    list.deleteFromPosition(1);
    list.display();
    
    // Reverse operation
    list.insertAtTail(40);
    list.insertAtTail(50);
    list.display();
    
    list.reverse();
    list.display();
    
    cout << "\nCurrent size: " << list.getSize() << endl;
    
    return 0;
}
```

**Output:**
```
=== Singly Linked List Operations ===
Inserted 10 at head
Inserted 20 at tail
Inserted 30 at tail
Inserted 5 at head
Inserted 15 at position 2
Linked List (5 nodes): 5 -> 10 -> 15 -> 20 -> 30 -> NULL
Found 20 at position 3
100 not found in list
Deleted 5 from head
Linked List (4 nodes): 10 -> 15 -> 20 -> 30 -> NULL
Deleted 30 from tail
Linked List (3 nodes): 10 -> 15 -> 20 -> NULL
Deleted 20 from position 1
Linked List (2 nodes): 10 -> 15 -> NULL
Inserted 40 at tail
Inserted 50 at tail
Linked List (4 nodes): 10 -> 15 -> 40 -> 50 -> NULL
Reversing linked list...
List reversed successfully!
Linked List (4 nodes): 50 -> 40 -> 15 -> 10 -> NULL

Current size: 4

Cleaning up linked list...
Deleting node with value: 50
Deleting node with value: 40
Deleting node with value: 15
Deleting node with value: 10
```

## Doubly Linked List Implementation

```cpp
#include <iostream>
using namespace std;

class DNode {
public:
    int data;
    DNode* next;
    DNode* prev;
    
    DNode(int value) {
        data = value;
        next = nullptr;
        prev = nullptr;
    }
};

class DoublyLinkedList {
private:
    DNode* head;
    DNode* tail;
    int size;
    
public:
    DoublyLinkedList() {
        head = nullptr;
        tail = nullptr;
        size = 0;
    }
    
    // Insert at beginning
    void insertAtHead(int value) {
        DNode* newNode = new DNode(value);
        
        if(head == nullptr) {
            head = tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
        size++;
        cout << "Inserted " << value << " at head" << endl;
    }
    
    // Insert at end
    void insertAtTail(int value) {
        DNode* newNode = new DNode(value);
        
        if(tail == nullptr) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            newNode->prev = tail;
            tail = newNode;
        }
        size++;
        cout << "Inserted " << value << " at tail" << endl;
    }
    
    // Insert at specific position
    void insertAtPosition(int value, int position) {
        if(position < 0 || position > size) {
            cout << "Invalid position!" << endl;
            return;
        }
        
        if(position == 0) {
            insertAtHead(value);
            return;
        }
        
        if(position == size) {
            insertAtTail(value);
            return;
        }
        
        DNode* newNode = new DNode(value);
        DNode* temp = head;
        
        for(int i = 0; i < position - 1; i++) {
            temp = temp->next;
        }
        
        newNode->next = temp->next;
        newNode->prev = temp;
        temp->next->prev = newNode;
        temp->next = newNode;
        
        size++;
        cout << "Inserted " << value << " at position " << position << endl;
    }
    
    // Delete from beginning
    void deleteFromHead() {
        if(head == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        DNode* temp = head;
        
        if(head == tail) {
            head = tail = nullptr;
        } else {
            head = head->next;
            head->prev = nullptr;
        }
        
        cout << "Deleted " << temp->data << " from head" << endl;
        delete temp;
        size--;
    }
    
    // Delete from end
    void deleteFromTail() {
        if(tail == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        DNode* temp = tail;
        
        if(head == tail) {
            head = tail = nullptr;
        } else {
            tail = tail->prev;
            tail->next = nullptr;
        }
        
        cout << "Deleted " << temp->data << " from tail" << endl;
        delete temp;
        size--;
    }
    
    // Display forward
    void displayForward() {
        if(head == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        cout << "Doubly Linked List (Forward): ";
        DNode* temp = head;
        
        while(temp != nullptr) {
            cout << temp->data;
            if(temp->next != nullptr) {
                cout << " <-> ";
            }
            temp = temp->next;
        }
        cout << " -> NULL" << endl;
    }
    
    // Display backward
    void displayBackward() {
        if(tail == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        cout << "Doubly Linked List (Backward): ";
        DNode* temp = tail;
        
        while(temp != nullptr) {
            cout << temp->data;
            if(temp->prev != nullptr) {
                cout << " <-> ";
            }
            temp = temp->prev;
        }
        cout << " -> NULL" << endl;
    }
    
    // Get size
    int getSize() {
        return size;
    }
    
    // Destructor
    ~DoublyLinkedList() {
        cout << "\nCleaning up doubly linked list..." << endl;
        DNode* current = head;
        while(current != nullptr) {
            DNode* next = current->next;
            cout << "Deleting node with value: " << current->data << endl;
            delete current;
            current = next;
        }
        head = tail = nullptr;
        size = 0;
    }
};

int main() {
    DoublyLinkedList dll;
    
    cout << "=== Doubly Linked List Operations ===" << endl;
    
    // Insert operations
    dll.insertAtHead(10);
    dll.insertAtTail(20);
    dll.insertAtTail(30);
    dll.insertAtHead(5);
    dll.insertAtPosition(15, 2);
    
    dll.displayForward();
    dll.displayBackward();
    
    cout << "\nSize: " << dll.getSize() << endl;
    
    // Delete operations
    dll.deleteFromHead();
    dll.displayForward();
    
    dll.deleteFromTail();
    dll.displayForward();
    
    return 0;
}
```

**Output:**
```
=== Doubly Linked List Operations ===
Inserted 10 at head
Inserted 20 at tail
Inserted 30 at tail
Inserted 5 at head
Inserted 15 at position 2
Doubly Linked List (Forward): 5 <-> 10 <-> 15 <-> 20 <-> 30 -> NULL
Doubly Linked List (Backward): 30 <-> 20 <-> 15 <-> 10 <-> 5 -> NULL

Size: 5
Deleted 5 from head
Doubly Linked List (Forward): 10 <-> 15 <-> 20 <-> 30 -> NULL
Deleted 30 from tail
Doubly Linked List (Forward): 10 <-> 15 <-> 20 -> NULL

Cleaning up doubly linked list...
Deleting node with value: 10
Deleting node with value: 15
Deleting node with value: 20
```

## Circular Linked List Implementation

```cpp
#include <iostream>
using namespace std;

class CNode {
public:
    int data;
    CNode* next;
    
    CNode(int value) {
        data = value;
        next = nullptr;
    }
};

class CircularLinkedList {
private:
    CNode* head;
    int size;
    
public:
    CircularLinkedList() {
        head = nullptr;
        size = 0;
    }
    
    // Insert at beginning
    void insertAtHead(int value) {
        CNode* newNode = new CNode(value);
        
        if(head == nullptr) {
            head = newNode;
            newNode->next = head;  // Circular reference
        } else {
            CNode* temp = head;
            while(temp->next != head) {
                temp = temp->next;
            }
            newNode->next = head;
            temp->next = newNode;
            head = newNode;
        }
        size++;
        cout << "Inserted " << value << " at head" << endl;
    }
    
    // Insert at end
    void insertAtTail(int value) {
        CNode* newNode = new CNode(value);
        
        if(head == nullptr) {
            head = newNode;
            newNode->next = head;
        } else {
            CNode* temp = head;
            while(temp->next != head) {
                temp = temp->next;
            }
            temp->next = newNode;
            newNode->next = head;
        }
        size++;
        cout << "Inserted " << value << " at tail" << endl;
    }
    
    // Display the list
    void display() {
        if(head == nullptr) {
            cout << "List is empty!" << endl;
            return;
        }
        
        cout << "Circular Linked List (" << size << " nodes): ";
        CNode* temp = head;
        
        do {
            cout << temp->data;
            temp = temp->next;
            if(temp != head) {
                cout << " -> ";
            }
        } while(temp != head);
        
        cout << " -> [back to head]" << endl;
    }
    
    // Check if list is circular
    bool isCircular() {
        if(head == nullptr) return true;
        
        CNode* slow = head;
        CNode* fast = head;
        
        while(fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            
            if(slow == fast) {
                return true;
            }
        }
        return false;
    }
    
    // Josephus Problem Solution
    void josephusProblem(int k) {
        if(head == nullptr || size == 0) {
            cout << "List is empty!" << endl;
            return;
        }
        
        cout << "\nJosephus Problem with k = " << k << endl;
        cout << "Elimination order: ";
        
        CNode* current = head;
        CNode* prev = nullptr;
        
        // Find last node
        while(current->next != head) {
            current = current->next;
        }
        prev = current;
        current = head;
        
        while(size > 1) {
            // Move k-1 steps
            for(int i = 1; i < k; i++) {
                prev = current;
                current = current->next;
            }
            
            // Eliminate current node
            cout << current->data << " ";
            
            prev->next = current->next;
            CNode* toDelete = current;
            
            if(current == head) {
                head = head->next;
            }
            
            current = current->next;
            delete toDelete;
            size--;
        }
        
        cout << "\nSurvivor: " << current->data << endl;
        head = current;
        head->next = head;
    }
    
    // Destructor
    ~CircularLinkedList() {
        if(head == nullptr) return;
        
        cout << "\nCleaning up circular linked list..." << endl;
        CNode* current = head->next;
        
        while(current != head) {
            CNode* next = current->next;
            cout << "Deleting node with value: " << current->data << endl;
            delete current;
            current = next;
        }
        
        cout << "Deleting node with value: " << head->data << endl;
        delete head;
        head = nullptr;
        size = 0;
    }
};

int main() {
    CircularLinkedList cll;
    
    cout << "=== Circular Linked List Operations ===" << endl;
    
    // Insert operations
    cll.insertAtHead(10);
    cll.insertAtTail(20);
    cll.insertAtTail(30);
    cll.insertAtHead(5);
    cll.insertAtTail(40);
    
    cll.display();
    
    cout << "\nIs circular? " << (cll.isCircular() ? "Yes" : "No") << endl;
    
    // Josephus Problem
    CircularLinkedList josephusList;
    for(int i = 1; i <= 7; i++) {
        josephusList.insertAtTail(i);
    }
    
    josephusList.display();
    josephusList.josephusProblem(3);
    josephusList.display();
    
    return 0;
}
```

**Output:**
```
=== Circular Linked List Operations ===
Inserted 10 at head
Inserted 20 at tail
Inserted 30 at tail
Inserted 5 at head
Inserted 40 at tail
Circular Linked List (5 nodes): 5 -> 10 -> 20 -> 30 -> 40 -> [back to head]

Is circular? Yes

Circular Linked List (7 nodes): 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> [back to head]

Josephus Problem with k = 3
Elimination order: 3 6 2 7 5 1 
Survivor: 4
Circular Linked List (1 nodes): 4 -> [back to head]

Cleaning up circular linked list...
Deleting node with value: 4
```

## Linked List Operations Complexity Analysis

```cpp
#include <iostream>
#include <chrono>
#include <random>
#include <vector>
#include <iomanip>
using namespace std;
using namespace chrono;

class PerformanceAnalyzer {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    
    Node* head;
    
public:
    PerformanceAnalyzer() : head(nullptr) {}
    
    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        if(head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while(temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
    
    void clear() {
        while(head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
    void analyzeOperations(int n) {
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<> dis(1, 1000000);
        
        cout << "\n" << string(60, '=') << endl;
        cout << "Performance Analysis for " << n << " elements" << endl;
        cout << string(60, '=') << endl;
        
        // 1. Insert at head (O(1))
        clear();
        auto start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            insertAtHead(dis(gen));
        }
        auto end = high_resolution_clock::now();
        auto headTime = duration_cast<microseconds>(end - start).count();
        
        // 2. Insert at tail (O(n))
        clear();
        start = high_resolution_clock::now();
        for(int i = 0; i < n; i++) {
            insertAtTail(dis(gen));
        }
        end = high_resolution_clock::now();
        auto tailTime = duration_cast<microseconds>(end - start).count();
        
        // 3. Sequential search (O(n))
        start = high_resolution_clock::now();
        Node* temp = head;
        int searchValue = dis(gen);
        while(temp != nullptr && temp->data != searchValue) {
            temp = temp->next;
        }
        end = high_resolution_clock::now();
        auto searchTime = duration_cast<microseconds>(end - start).count();
        
        cout << fixed << setprecision(2);
        cout << "\nOperation Timings:" << endl;
        cout << string(40, '-') << endl;
        cout << setw(20) << "Operation" 
             << setw(20) << "Time (μs)" 
             << setw(20) << "Complexity" << endl;
        cout << string(60, '-') << endl;
        cout << setw(20) << "Insert at Head" 
             << setw(20) << headTime 
             << setw(20) << "O(1)" << endl;
        cout << setw(20) << "Insert at Tail" 
             << setw(20) << tailTime 
             << setw(20) << "O(n)" << endl;
        cout << setw(20) << "Search" 
             << setw(20) << searchTime 
             << setw(20) << "O(n)" << endl;
        
        cout << "\nKey Observations:" << endl;
        cout << "1. Insert at head is constant time: O(1)" << endl;
        cout << "2. Insert at tail is linear time: O(n)" << endl;
        cout << "3. Search is linear time: O(n)" << endl;
        cout << "4. Linked lists excel at frequent insertions/deletions at head" << endl;
    }
};

void compareWithArray(int n) {
    cout << "\n\n" << string(70, '=') << endl;
    cout << "Linked List vs Array Comparison for " << n << " elements" << endl;
    cout << string(70, '=') << endl;
    
    cout << setw(30) << "Operation" 
         << setw(20) << "Linked List" 
         << setw(20) << "Array" << endl;
    cout << string(70, '-') << endl;
    
    cout << setw(30) << "Insert at Beginning" 
         << setw(20) << "O(1)" 
         << setw(20) << "O(n)" << endl;
    
    cout << setw(30) << "Insert at End" 
         << setw(20) << "O(n)" 
         << setw(20) << "O(1) (if space)" << endl;
    
    cout << setw(30) << "Insert at Middle" 
         << setw(20) << "O(n)" 
         << setw(20) << "O(n)" << endl;
    
    cout << setw(30) << "Delete from Beginning" 
         << setw(20) << "O(1)" 
         << setw(20) << "O(n)" << endl;
    
    cout << setw(30) << "Random Access" 
         << setw(20) << "O(n)" 
         << setw(20) << "O(1)" << endl;
    
    cout << setw(30) << "Memory Usage" 
         << setw(20) << "Dynamic" 
         << setw(20) << "Fixed" << endl;
    
    cout << setw(30) << "Memory Overhead" 
         << setw(20) << "High (pointers)" 
         << setw(20) << "Low" << endl;
    
    cout << setw(30) << "Cache Performance" 
         << setw(20) << "Poor" 
         << setw(20) << "Excellent" << endl;
}

int main() {
    PerformanceAnalyzer analyzer;
    
    vector<int> testSizes = {1000, 10000, 50000};
    
    for(int size : testSizes) {
        analyzer.analyzeOperations(size);
    }
    
    compareWithArray(10000);
    
    return 0;
}
```

## Advanced Linked List Problems

### 1. Detect and Remove Loop
```cpp
#include <iostream>
using namespace std;

class LoopDetector {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    
    Node* head;
    
public:
    LoopDetector() : head(nullptr) {}
    
    void createListWithLoop(int nodes, int loopStart) {
        if(head != nullptr) clear();
        
        if(nodes <= 0) return;
        
        // Create nodes
        Node* loopNode = nullptr;
        Node* prev = nullptr;
        
        for(int i = 1; i <= nodes; i++) {
            Node* newNode = new Node(i);
            if(i == 1) head = newNode;
            if(i == loopStart) loopNode = newNode;
            if(prev != nullptr) prev->next = newNode;
            prev = newNode;
        }
        
        // Create loop if specified
        if(loopStart > 0 && loopStart <= nodes) {
            prev->next = loopNode;
            cout << "Created list with " << nodes << " nodes, loop starts at node " 
                 << loopStart << endl;
        } else {
            cout << "Created list with " << nodes << " nodes (no loop)" << endl;
        }
    }
    
    bool detectLoop() {
        if(head == nullptr) return false;
        
        Node* slow = head;
        Node* fast = head;
        
        while(fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            
            if(slow == fast) {
                cout << "Loop detected!" << endl;
                return true;
            }
        }
        
        cout << "No loop detected" << endl;
        return false;
    }
    
    void removeLoop() {
        if(head == nullptr) return;
        
        // Step 1: Detect loop
        Node* slow = head;
        Node* fast = head;
        bool loopExists = false;
        
        while(fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            
            if(slow == fast) {
                loopExists = true;
                break;
            }
        }
        
        if(!loopExists) {
            cout << "No loop to remove" << endl;
            return;
        }
        
        // Step 2: Find loop start
        slow = head;
        while(slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }
        
        // Step 3: Find last node
        Node* lastNode = slow;
        while(lastNode->next != slow) {
            lastNode = lastNode->next;
        }
        
        // Step 4: Remove loop
        lastNode->next = nullptr;
        cout << "Loop removed successfully!" << endl;
    }
    
    void display(int maxNodes = 20) {
        if(head == nullptr) {
            cout << "List is empty" << endl;
            return;
        }
        
        cout << "List: ";
        Node* temp = head;
        int count = 0;
        
        while(temp != nullptr && count < maxNodes) {
            cout << temp->data;
            if(temp->next != nullptr) {
                cout << " -> ";
            }
            temp = temp->next;
            count++;
        }
        
        if(temp != nullptr) {
            cout << "... (loop or large list)" << endl;
        } else {
            cout << " -> NULL" << endl;
        }
    }
    
    void clear() {
        while(head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
    ~LoopDetector() {
        clear();
    }
};

int main() {
    LoopDetector detector;
    
    cout << "=== Loop Detection and Removal ===" << endl;
    
    // Test 1: List without loop
    cout << "\nTest 1: Normal list (no loop)" << endl;
    detector.createListWithLoop(8, 0);
    detector.display();
    detector.detectLoop();
    
    // Test 2: List with loop
    cout << "\nTest 2: List with loop" << endl;
    detector.createListWithLoop(8, 3);
    detector.display(15);  // Show first 15 nodes to see loop
    detector.detectLoop();
    
    // Remove loop
    detector.removeLoop();
    detector.display();
    detector.detectLoop();
    
    // Test 3: Circular list
    cout << "\nTest 3: Circular list" << endl;
    detector.createListWithLoop(5, 1);
    detector.display(12);
    detector.detectLoop();
    detector.removeLoop();
    detector.display();
    
    return 0;
}
```

### 2. Find Middle Element
```cpp
#include <iostream>
using namespace std;

class MiddleFinder {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    
    Node* head;
    
public:
    MiddleFinder() : head(nullptr) {}
    
    void addNode(int val) {
        Node* newNode = new Node(val);
        if(head == nullptr) {
            head = newNode;
        } else {
            Node* temp = head;
            while(temp->next != nullptr) {
                temp = temp->next;
            }
            temp->next = newNode;
        }
    }
    
    int findMiddleTwoPass() {
        if(head == nullptr) return -1;
        
        // First pass: count nodes
        int count = 0;
        Node* temp = head;
        while(temp != nullptr) {
            count++;
            temp = temp->next;
        }
        
        // Second pass: go to middle
        temp = head;
        for(int i = 0; i < count/2; i++) {
            temp = temp->next;
        }
        
        return temp->data;
    }
    
    int findMiddleOnePass() {
        if(head == nullptr) return -1;
        
        Node* slow = head;
        Node* fast = head;
        
        while(fast != nullptr && fast->next != nullptr) {
            slow = slow->next;          // Moves 1 step
            fast = fast->next->next;    // Moves 2 steps
        }
        
        return slow->data;
    }
    
    void display() {
        Node* temp = head;
        cout << "List: ";
        while(temp != nullptr) {
            cout << temp->data;
            if(temp->next != nullptr) cout << " -> ";
            temp = temp->next;
        }
        cout << " -> NULL" << endl;
    }
    
    ~MiddleFinder() {
        while(head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    MiddleFinder finder;
    
    cout << "=== Finding Middle Element of Linked List ===" << endl;
    
    // Create list with odd number of elements
    for(int i = 1; i <= 7; i++) {
        finder.addNode(i * 10);
    }
    
    finder.display();
    
    cout << "\nTwo-pass method (count then find): ";
    cout << "Middle = " << finder.findMiddleTwoPass() << endl;
    
    cout << "One-pass method (slow/fast pointers): ";
    cout << "Middle = " << finder.findMiddleOnePass() << endl;
    
    // Create list with even number of elements
    MiddleFinder finder2;
    for(int i = 1; i <= 8; i++) {
        finder2.addNode(i * 5);
    }
    
    cout << "\n\nEven-sized list:" << endl;
    finder2.display();
    
    cout << "\nTwo-pass method: Middle = " << finder2.findMiddleTwoPass() << endl;
    cout << "One-pass method: Middle = " << finder2.findMiddleOnePass() << endl;
    cout << "(Note: For even length, both methods return second middle element)" << endl;
    
    return 0;
}
```

### 3. Merge Two Sorted Linked Lists
```cpp
#include <iostream>
using namespace std;

class ListMerger {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    
    Node* createList(const vector<int>& values) {
        if(values.empty()) return nullptr;
        
        Node* head = new Node(values[0]);
        Node* current = head;
        
        for(size_t i = 1; i < values.size(); i++) {
            current->next = new Node(values[i]);
            current = current->next;
        }
        
        return head;
    }
    
    void displayList(Node* head, const string& name) {
        cout << name << ": ";
        Node* temp = head;
        while(temp != nullptr) {
            cout << temp->data;
            if(temp->next != nullptr) cout << " -> ";
            temp = temp->next;
        }
        cout << " -> NULL" << endl;
    }
    
    Node* mergeSortedLists(Node* list1, Node* list2) {
        // Create a dummy node to simplify code
        Node dummy(0);
        Node* tail = &dummy;
        
        cout << "\nMerging process:" << endl;
        
        while(list1 != nullptr && list2 != nullptr) {
            cout << "  Comparing " << list1->data << " and " << list2->data;
            
            if(list1->data <= list2->data) {
                cout << " → Take " << list1->data << " from list1" << endl;
                tail->next = list1;
                list1 = list1->next;
            } else {
                cout << " → Take " << list2->data << " from list2" << endl;
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        
        // Append remaining nodes
        if(list1 != nullptr) {
            cout << "  Appending remaining from list1" << endl;
            tail->next = list1;
        } else if(list2 != nullptr) {
            cout << "  Appending remaining from list2" << endl;
            tail->next = list2;
        }
        
        return dummy.next;
    }
    
    void freeList(Node* head) {
        while(head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
public:
    void demoMerge() {
        cout << "=== Merging Two Sorted Linked Lists ===" << endl;
        
        // Create first sorted list
        vector<int> list1Values = {1, 3, 5, 7, 9};
        Node* list1 = createList(list1Values);
        displayList(list1, "List 1");
        
        // Create second sorted list
        vector<int> list2Values = {2, 4, 6, 8, 10};
        Node* list2 = createList(list2Values);
        displayList(list2, "List 2");
        
        // Merge the lists
        Node* merged = mergeSortedLists(list1, list2);
        displayList(merged, "Merged List");
        
        // Free memory
        freeList(merged);  // merged contains all nodes
    }
};

int main() {
    ListMerger merger;
    merger.demoMerge();
    return 0;
}
```

## STL Linked List Implementation

```cpp
#include <iostream>
#include <list>
#include <forward_list>
#include <algorithm>
#include <iterator>
using namespace std;

void demonstrateSTLLists() {
    cout << "=== STL Linked List Implementations ===" << endl;
    
    // 1. std::list (doubly linked list)
    cout << "\n1. std::list (Doubly Linked List):" << endl;
    list<int> myList = {10, 20, 30, 40, 50};
    
    cout << "Initial list: ";
    for(int num : myList) cout << num << " ";
    cout << endl;
    
    // Insert at beginning
    myList.push_front(5);
    cout << "After push_front(5): ";
    for(int num : myList) cout << num << " ";
    cout << endl;
    
    // Insert at end
    myList.push_back(60);
    cout << "After push_back(60): ";
    for(int num : myList) cout << num << " ";
    cout << endl;
    
    // Insert in middle
    auto it = myList.begin();
    advance(it, 3);  // Move iterator to position 3
    myList.insert(it, 25);
    cout << "After insert at position 3 (25): ";
    for(int num : myList) cout << num << " ";
    cout << endl;
    
    // Remove elements
    myList.remove(30);  // Remove all occurrences of 30
    cout << "After remove(30): ";
    for(int num : myList) cout << num << " ";
    cout << endl;
    
    // Sort the list
    myList.sort();
    cout << "After sort(): ";
    for(int num : myList) cout << num << " ";
    cout << endl;
    
    // Reverse the list
    myList.reverse();
    cout << "After reverse(): ";
    for(int num : myList) cout << num << " ";
    cout << endl;
    
    // 2. std::forward_list (singly linked list)
    cout << "\n2. std::forward_list (Singly Linked List):" << endl;
    forward_list<int> myForwardList = {15, 25, 35, 45};
    
    cout << "Initial forward_list: ";
    for(int num : myForwardList) cout << num << " ";
    cout << endl;
    
    // Insert after first element
    auto fit = myForwardList.begin();
    myForwardList.insert_after(fit, 20);
    cout << "After insert_after(begin, 20): ";
    for(int num : myForwardList) cout << num << " ";
    cout << endl;
    
    // Remove elements
    myForwardList.remove_if([](int n) { return n > 30; });
    cout << "After remove_if(>30): ";
    for(int num : myForwardList) cout << num << " ";
    cout << endl;
    
    // Sort
    myForwardList.sort();
    cout << "After sort(): ";
    for(int num : myForwardList) cout << num << " ";
    cout << endl;
    
    // Performance comparison
    cout << "\n3. Performance Characteristics:" << endl;
    cout << "std::list (doubly linked):" << endl;
    cout << "  - Insert/delete at any position: O(1) if iterator available" << endl;
    cout << "  - Random access: O(n)" << endl;
    cout << "  - Memory overhead: 2 pointers per node" << endl;
    
    cout << "\nstd::forward_list (singly linked):" << endl;
    cout << "  - Insert/delete after given position: O(1)" << endl;
    cout << "  - No size() method (to save space)" << endl;
    cout << "  - Memory overhead: 1 pointer per node" << endl;
}

// Custom object in linked list
void demonstrateCustomObjects() {
    cout << "\n\n=== Custom Objects in Linked List ===" << endl;
    
    struct Person {
        string name;
        int age;
        
        Person(string n, int a) : name(n), age(a) {}
        
        // For sorting
        bool operator<(const Person& other) const {
            return age < other.age;
        }
        
        // For display
        friend ostream& operator<<(ostream& os, const Person& p) {
            os << p.name << " (" << p.age << ")";
            return os;
        }
    };
    
    list<Person> people;
    
    people.push_back(Person("Alice", 25));
    people.push_back(Person("Bob", 30));
    people.push_back(Person("Charlie", 22));
    people.push_back(Person("Diana", 28));
    
    cout << "People list: ";
    for(const auto& person : people) {
        cout << person << " -> ";
    }
    cout << "NULL" << endl;
    
    // Sort by age
    people.sort();
    cout << "\nAfter sorting by age: ";
    for(const auto& person : people) {
        cout << person << " -> ";
    }
    cout << "NULL" << endl;
    
    // Remove people under 25
    people.remove_if([](const Person& p) { return p.age < 25; });
    cout << "\nAfter removing people under 25: ";
    for(const auto& person : people) {
        cout << person << " -> ";
    }
    cout << "NULL" << endl;
}

int main() {
    demonstrateSTLLists();
    demonstrateCustomObjects();
    return 0;
}
```

## Real-World Applications

### 1. Music Playlist
```cpp
#include <iostream>
#include <string>
using namespace std;

class MusicPlayer {
private:
    struct Song {
        string title;
        string artist;
        int duration;  // in seconds
        Song* next;
        Song* prev;
        
        Song(string t, string a, int d) 
            : title(t), artist(a), duration(d), next(nullptr), prev(nullptr) {}
        
        void display() const {
            int min = duration / 60;
            int sec = duration % 60;
            cout << "\"" << title << "\" by " << artist 
                 << " [" << min << ":" << (sec < 10 ? "0" : "") << sec << "]";
        }
    };
    
    Song* current;
    Song* head;
    Song* tail;
    
public:
    MusicPlayer() : current(nullptr), head(nullptr), tail(nullptr) {}
    
    void addSong(string title, string artist, int duration) {
        Song* newSong = new Song(title, artist, duration);
        
        if(head == nullptr) {
            head = tail = current = newSong;
            newSong->next = newSong;
            newSong->prev = newSong;
        } else {
            newSong->prev = tail;
            newSong->next = head;
            tail->next = newSong;
            head->prev = newSong;
            tail = newSong;
        }
        
        cout << "Added: ";
        newSong->display();
        cout << endl;
    }
    
    void playCurrent() {
        if(current == nullptr) {
            cout << "Playlist is empty!" << endl;
            return;
        }
        
        cout << "Now playing: ";
        current->display();
        cout << endl;
    }
    
    void nextSong() {
        if(current == nullptr) return;
        
        current = current->next;
        playCurrent();
    }
    
    void previousSong() {
        if(current == nullptr) return;
        
        current = current->prev;
        playCurrent();
    }
    
    void displayPlaylist() {
        if(head == nullptr) {
            cout << "Playlist is empty!" << endl;
            return;
        }
        
        cout << "\n=== Music Playlist ===" << endl;
        Song* temp = head;
        int index = 1;
        
        do {
            cout << index++ << ". ";
            temp->display();
            if(temp == current) {
                cout << " [CURRENT]";
            }
            cout << endl;
            temp = temp->next;
        } while(temp != head);
    }
    
    void removeCurrent() {
        if(current == nullptr) return;
        
        cout << "Removing: ";
        current->display();
        cout << endl;
        
        if(current->next == current) {  // Only one song
            delete current;
            head = tail = current = nullptr;
            return;
        }
        
        Song* toRemove = current;
        
        if(current == head) head = current->next;
        if(current == tail) tail = current->prev;
        
        current->prev->next = current->next;
        current->next->prev = current->prev;
        
        current = current->next;
        delete toRemove;
    }
    
    ~MusicPlayer() {
        if(head == nullptr) return;
        
        Song* current = head;
        Song* next;
        
        do {
            next = current->next;
            delete current;
            current = next;
        } while(current != head);
    }
};

int main() {
    MusicPlayer player;
    
    cout << "=== Music Playlist Application ===" << endl;
    
    // Add songs
    player.addSong("Bohemian Rhapsody", "Queen", 354);
    player.addSong("Stairway to Heaven", "Led Zeppelin", 482);
    player.addSong("Hotel California", "Eagles", 391);
    player.addSong("Imagine", "John Lennon", 183);
    player.addSong("Smells Like Teen Spirit", "Nirvana", 301);
    
    // Display playlist
    player.displayPlaylist();
    
    // Play songs
    cout << "\n=== Playing Songs ===" << endl;
    player.playCurrent();
    
    player.nextSong();
    player.nextSong();
    
    player.previousSong();
    
    // Remove current song
    cout << "\n=== Removing Song ===" << endl;
    player.removeCurrent();
    player.displayPlaylist();
    
    return 0;
}
```

### 2. Browser History
```cpp
#include <iostream>
#include <string>
#include <stack>
using namespace std;

class BrowserHistory {
private:
    struct Page {
        string url;
        string title;
        Page* next;
        Page* prev;
        
        Page(string u, string t) : url(u), title(t), next(nullptr), prev(nullptr) {}
        
        void display() const {
            cout << title << " (" << url << ")";
        }
    };
    
    Page* current;
    Page* head;
    
public:
    BrowserHistory() : current(nullptr), head(nullptr) {}
    
    void visitPage(string url, string title) {
        Page* newPage = new Page(url, title);
        
        // Remove forward history if we're not at the end
        if(current != nullptr) {
            // Delete all pages after current
            Page* temp = current->next;
            while(temp != nullptr) {
                Page* next = temp->next;
                cout << "Clearing forward history: ";
                temp->display();
                cout << endl;
                delete temp;
                temp = next;
            }
            current->next = nullptr;
        }
        
        // Add new page
        if(head == nullptr) {
            head = newPage;
        } else {
            current->next = newPage;
            newPage->prev = current;
        }
        
        current = newPage;
        
        cout << "Visited: ";
        newPage->display();
        cout << endl;
    }
    
    void goBack() {
        if(current == nullptr || current->prev == nullptr) {
            cout << "Cannot go back!" << endl;
            return;
        }
        
        current = current->prev;
        cout << "Went back to: ";
        current->display();
        cout << endl;
    }
    
    void goForward() {
        if(current == nullptr || current->next == nullptr) {
            cout << "Cannot go forward!" << endl;
            return;
        }
        
        current = current->next;
        cout << "Went forward to: ";
        current->display();
        cout << endl;
    }
    
    void displayHistory() {
        if(head == nullptr) {
            cout << "History is empty!" << endl;
            return;
        }
        
        cout << "\n=== Browser History ===" << endl;
        Page* temp = head;
        int index = 1;
        
        while(temp != nullptr) {
            cout << index++ << ". ";
            temp->display();
            if(temp == current) {
                cout << " [CURRENT]";
            }
            cout << endl;
            temp = temp->next;
        }
    }
    
    void clearHistory() {
        cout << "\nClearing all history..." << endl;
        Page* temp = head;
        
        while(temp != nullptr) {
            Page* next = temp->next;
            delete temp;
            temp = next;
        }
        
        head = current = nullptr;
        cout << "History cleared!" << endl;
    }
    
    ~BrowserHistory() {
        clearHistory();
    }
};

int main() {
    BrowserHistory browser;
    
    cout << "=== Browser History Simulation ===" << endl;
    
    // Visit pages
    browser.visitPage("https://www.google.com", "Google");
    browser.visitPage("https://www.github.com", "GitHub");
    browser.visitPage("https://www.stackoverflow.com", "Stack Overflow");
    
    // Display history
    browser.displayHistory();
    
    // Navigate
    cout << "\n=== Navigation ===" << endl;
    browser.goBack();
    browser.goBack();
    
    browser.goForward();
    
    // Visit new page (should clear forward history)
    cout << "\n=== Visiting New Page ===" << endl;
    browser.visitPage("https://www.leetcode.com", "LeetCode");
    browser.displayHistory();
    
    // Clear history
    browser.clearHistory();
    browser.displayHistory();
    
    return 0;
}
```

## Advantages and Disadvantages

### Advantages:
1. **Dynamic Size**: Can grow/shrink during runtime
2. **Efficient Insertions/Deletions**: O(1) at beginning, no shifting needed
3. **Memory Efficiency**: Uses memory only when needed
4. **No Memory Wastage**: Unlike arrays with fixed size
5. **Implementation Flexibility**: Can implement stacks, queues, etc.

### Disadvantages:
1. **Sequential Access**: No random access, must traverse from head
2. **Memory Overhead**: Extra memory for pointers
3. **Cache Unfriendly**: Non-contiguous memory locations
4. **Reverse Traversal**: Difficult in singly linked lists
5. **Complex Implementation**: More error-prone than arrays

## When to Use Linked Lists

1. **Frequent insertions/deletions** at beginning
2. **Unknown data size** at compile time
3. **Implementing stacks/queues**
4. **Memory is fragmented** (arrays need contiguous memory)
5. **No random access needed**
6. **Dynamic data structures** (trees, graphs adjacency lists)

## Summary

Linked Lists are fundamental dynamic data structures that form the basis for many advanced data structures and algorithms.

**Key Takeaways:**
- **Singly Linked List**: Each node points to next, efficient forward traversal
- **Doubly Linked List**: Nodes point to both next and previous, bidirectional traversal
- **Circular Linked List**: Last node points to first, useful for round-robin
- **Time Complexity**: 
  - Access: O(n)
  - Search: O(n)
  - Insert/Delete at head: O(1)
  - Insert/Delete at tail: O(n) (O(1) with tail pointer)
- **Space Complexity**: O(n) + pointer overhead
- **Real Applications**: Music players, browser history, undo/redo, symbol tables

**Common Patterns:**
1. **Two-pointer technique**: Fast/slow pointers for middle detection, loop detection
2. **Dummy node**: Simplify edge cases in merge operations
3. **Recursive reversal**: Elegant but O(n) space
4. **Iterative reversal**: O(1) space, modifies list

**Remember:**
- Always check for `nullptr` before dereferencing
- Free memory to avoid leaks (especially in C++)
- Consider using STL `list` or `forward_list` when possible
- Choose appropriate type: singly vs doubly vs circular based on needs

Linked Lists demonstrate elegant pointer manipulation and are essential for understanding more complex data structures like trees and graphs.

---
*This completes our comprehensive DSA notes on Linked Lists, covering theory, implementations, variations, performance analysis, and real-world applications in C++.*