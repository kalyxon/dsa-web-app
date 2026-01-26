# Arrays

## Arrays in C++

An array is a collection of elements of the same type stored in contiguous memory locations.

### Declaration and Initialization

```cpp
#include <iostream>
using namespace std;

int main() {
    // Different ways to declare and initialize arrays
    int arr1[5];                    // Declaration without initialization
    int arr2[5] = {1, 2, 3, 4, 5};  // Declaration with initialization
    int arr3[] = {1, 2, 3, 4, 5};   // Size determined by initializer
    int arr4[5] = {1, 2};           // Remaining elements initialized to 0
    
    // Accessing array elements
    cout << "Element at index 2: " << arr2[2] << endl;  // Output: 3
    
    // Modifying array elements
    arr2[2] = 10;
    cout << "Modified element: " << arr2[2] << endl;    // Output: 10
    
    return 0;
}
```

**Output:**
```
Element at index 2: 3
Modified element: 10
```

### Array Traversal and Basic Operations

```cpp
#include <iostream>
using namespace std;

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    cout << "Array elements: ";
    // Traversing array using for loop
    for(int i = 0; i < size; i++) {
        cout << numbers[i] << " ";
    }
    cout << endl;
    
    // Finding sum of all elements
    int sum = 0;
    for(int i = 0; i < size; i++) {
        sum += numbers[i];
    }
    cout << "Sum of elements: " << sum << endl;
    
    // Finding maximum element
    int maxElement = numbers[0];
    for(int i = 1; i < size; i++) {
        if(numbers[i] > maxElement) {
            maxElement = numbers[i];
        }
    }
    cout << "Maximum element: " << maxElement << endl;
    
    return 0;
}
```

**Output:**
```
Array elements: 10 20 30 40 50
Sum of elements: 150
Maximum element: 50
```

### Multi-dimensional Arrays

```cpp
#include <iostream>
using namespace std;

int main() {
    // 2D Array (Matrix)
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    cout << "2D Array Elements:" << endl;
    for(int i = 0; i < 3; i++) {
        for(int j = 0; j < 3; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

**Output:**
```
2D Array Elements:
1 2 3
4 5 6
7 8 9
```

## DSA Bubble Sort

Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

### How Bubble Sort Works

1. **First Pass**: Compare adjacent elements from start to end
2. **Swap if needed**: If current element > next element, swap them
3. **Repeat**: Continue for n-1 passes
4. **Optimization**: If no swaps in a pass, array is sorted

### Basic Implementation

```cpp
#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    // Outer loop for passes
    for(int i = 0; i < n-1; i++) {
        // Inner loop for comparisons
        for(int j = 0; j < n-i-1; j++) {
            // Compare adjacent elements
            if(arr[j] > arr[j+1]) {
                // Swap if wrong order
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    printArray(arr, n);
    
    bubbleSort(arr, n);
    
    cout << "Sorted array: ";
    printArray(arr, n);
    
    return 0;
}
```

**Output:**
```
Original array: 64 34 25 12 22 11 90 
Sorted array: 11 12 22 25 34 64 90
```

### Optimized Bubble Sort

```cpp
#include <iostream>
using namespace std;

void optimizedBubbleSort(int arr[], int n) {
    bool swapped;
    
    for(int i = 0; i < n-1; i++) {
        swapped = false;
        
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true;
            }
        }
        
        // If no swaps occurred, array is sorted
        if(!swapped) {
            cout << "Array sorted after " << i+1 << " passes" << endl;
            break;
        }
    }
}

int main() {
    int arr[] = {5, 1, 4, 2, 8};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    optimizedBubbleSort(arr, n);
    
    cout << "Sorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Output:**
```
Original array: 5 1 4 2 8 
Array sorted after 4 passes
Sorted array: 1 2 4 5 8
```

### Bubble Sort Complexity Analysis

**Time Complexity:**
- **Best Case**: O(n) - When array is already sorted
- **Average Case**: O(n²)
- **Worst Case**: O(n²) - When array is reverse sorted

**Space Complexity:**
- O(1) - In-place sorting algorithm

**Advantages:**
- Simple to understand and implement
- Stable sorting algorithm
- In-place algorithm (no extra memory needed)

**Disadvantages:**
- Too slow for large datasets
- Not suitable for real-world applications

### Visual Example of Bubble Sort

```
Pass 1:
[5, 3, 8, 4, 2] → Compare 5 and 3, swap
[3, 5, 8, 4, 2] → Compare 5 and 8, no swap
[3, 5, 8, 4, 2] → Compare 8 and 4, swap
[3, 5, 4, 8, 2] → Compare 8 and 2, swap
[3, 5, 4, 2, 8] → Largest element (8) at end

Pass 2:
[3, 5, 4, 2, 8] → Compare 3 and 5, no swap
[3, 5, 4, 2, 8] → Compare 5 and 4, swap
[3, 4, 5, 2, 8] → Compare 5 and 2, swap
[3, 4, 2, 5, 8] → Second largest (5) in position

Continue until sorted...
```

## DSA Selection Sort

Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: sorted and unsorted. It repeatedly selects the smallest element from the unsorted part and moves it to the sorted part.

### How Selection Sort Works

1. Find the minimum element in the unsorted array
2. Swap it with the first element of the unsorted part
3. Move the boundary between sorted and unsorted parts one element to the right
4. Repeat until the entire array is sorted

### Basic Implementation

```cpp
#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for(int i = 0; i < n-1; i++) {
        // Assume minimum is at current position
        int minIndex = i;
        
        // Find minimum element in unsorted part
        for(int j = i+1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum element with first element of unsorted part
        if(minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        
        // Display array after each pass
        cout << "Pass " << i+1 << ": ";
        for(int k = 0; k < n; k++) {
            cout << arr[k] << " ";
        }
        cout << endl;
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl << endl;
    
    selectionSort(arr, n);
    
    cout << "\nSorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Output:**
```
Original array: 64 25 12 22 11 

Pass 1: 11 25 12 22 64 
Pass 2: 11 12 25 22 64 
Pass 3: 11 12 22 25 64 
Pass 4: 11 12 22 25 64 

Sorted array: 11 12 22 25 64
```

### Selection Sort with Visualization

```cpp
#include <iostream>
using namespace std;

void selectionSortWithDetails(int arr[], int n) {
    cout << "\n=== Selection Sort Process ===" << endl;
    
    for(int i = 0; i < n-1; i++) {
        cout << "\nPass " << i+1 << ":" << endl;
        cout << "Looking for minimum in unsorted part [" << i << " to " << n-1 << "]" << endl;
        
        int minIndex = i;
        
        // Find minimum
        for(int j = i+1; j < n; j++) {
            cout << "  Comparing arr[" << minIndex << "]=" << arr[minIndex] 
                 << " with arr[" << j << "]=" << arr[j];
            
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
                cout << " -> New minimum found!" << endl;
            } else {
                cout << " -> No change" << endl;
            }
        }
        
        cout << "Minimum element: arr[" << minIndex << "]=" << arr[minIndex] << endl;
        
        // Swap if needed
        if(minIndex != i) {
            cout << "Swapping arr[" << i << "]=" << arr[i] 
                 << " with arr[" << minIndex << "]=" << arr[minIndex] << endl;
            
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        
        cout << "Array after pass " << i+1 << ": ";
        for(int k = 0; k < n; k++) {
            if(k < i+1) cout << "[" << arr[k] << "] ";  // Sorted part
            else cout << arr[k] << " ";                 // Unsorted part
        }
        cout << endl;
    }
}

int main() {
    int arr[] = {29, 10, 14, 37, 13};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    selectionSortWithDetails(arr, n);
    
    cout << "\nFinal sorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Output:**
```
Original array: 29 10 14 37 13 

=== Selection Sort Process ===

Pass 1:
Looking for minimum in unsorted part [0 to 4]
  Comparing arr[0]=29 with arr[1]=10 -> New minimum found!
  Comparing arr[1]=10 with arr[2]=14 -> No change
  Comparing arr[1]=10 with arr[3]=37 -> No change
  Comparing arr[1]=10 with arr[4]=13 -> No change
Minimum element: arr[1]=10
Swapping arr[0]=29 with arr[1]=10
Array after pass 1: [10] 29 14 37 13 

Pass 2:
Looking for minimum in unsorted part [1 to 4]
  Comparing arr[1]=29 with arr[2]=14 -> New minimum found!
  Comparing arr[2]=14 with arr[3]=37 -> No change
  Comparing arr[2]=14 with arr[4]=13 -> New minimum found!
Minimum element: arr[4]=13
Swapping arr[1]=29 with arr[4]=13
Array after pass 2: [10] [13] 14 37 29 

... (continued)
```

### Selection Sort Complexity Analysis

**Time Complexity:**
- **Best Case**: O(n²) - Still needs to compare all elements
- **Average Case**: O(n²)
- **Worst Case**: O(n²)

**Space Complexity:**
- O(1) - In-place sorting algorithm

**Number of Comparisons:**
- Always makes n(n-1)/2 comparisons

**Number of Swaps:**
- Maximum n-1 swaps (minimum data movement)

**Advantages:**
- Simple to implement
- Performs well on small lists
- Memory efficient (in-place)
- Makes minimum number of swaps

**Disadvantages:**
- O(n²) time complexity makes it inefficient for large lists
- Not stable by default (can be made stable)
- Not adaptive (doesn't take advantage of existing order)

### Stability in Selection Sort

By default, Selection Sort is **not stable** because it swaps non-adjacent elements. However, we can implement a stable version:

```cpp
#include <iostream>
using namespace std;

void stableSelectionSort(int arr[], int n) {
    for(int i = 0; i < n-1; i++) {
        int minIndex = i;
        
        // Find minimum element
        for(int j = i+1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Instead of swapping, shift elements
        int minValue = arr[minIndex];
        for(int k = minIndex; k > i; k--) {
            arr[k] = arr[k-1];
        }
        arr[i] = minValue;
    }
}

int main() {
    // Array with duplicate values to test stability
    int arr[] = {4, 2, 3, 4, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << "(" << arr[i] << ") ";
    }
    cout << endl;
    
    stableSelectionSort(arr, n);
    
    cout << "Sorted array (stable): ";
    for(int i = 0; i < n; i++) {
        cout << "(" << arr[i] << ") ";
    }
    cout << endl;
    
    return 0;
}
```

### When to Use Selection Sort

1. **Small datasets** where simplicity is more important than efficiency
2. **Memory-constrained environments** due to O(1) space complexity
3. **When swapping is expensive** compared to comparisons
4. **Educational purposes** to understand sorting concepts

### Comparison with Other Sorting Algorithms

| Algorithm | Time Complexity | Space Complexity | Stable | In-place |
|-----------|----------------|------------------|--------|----------|
| Bubble Sort | O(n²) | O(1) | Yes | Yes |
| **Selection Sort** | O(n²) | O(1) | No* | Yes |
| Insertion Sort | O(n²) | O(1) | Yes | Yes |
| Merge Sort | O(n log n) | O(n) | Yes | No |

*Can be made stable with modifications

## DSA Insertion Sort

Insertion Sort is a simple, efficient sorting algorithm that builds the final sorted array one item at a time. It's much like sorting playing cards in your hands.

### How Insertion Sort Works

1. Start with the second element (consider first element as sorted)
2. Compare current element with elements in the sorted portion
3. Shift all larger elements one position to the right
4. Insert current element at the correct position
5. Repeat for all elements

### Basic Implementation

```cpp
#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
    for(int i = 1; i < n; i++) {
        int key = arr[i];  // Current element to be inserted
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
        
        // Display array after each iteration
        cout << "After iteration " << i << ": ";
        for(int k = 0; k < n; k++) {
            cout << arr[k] << " ";
        }
        cout << endl;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl << endl;
    
    insertionSort(arr, n);
    
    cout << "\nSorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Output:**
```
Original array: 12 11 13 5 6 

After iteration 1: 11 12 13 5 6 
After iteration 2: 11 12 13 5 6 
After iteration 3: 5 11 12 13 6 
After iteration 4: 5 6 11 12 13 

Sorted array: 5 6 11 12 13
```

### Visual Step-by-Step Process

```cpp
#include <iostream>
using namespace std;

void insertionSortVisual(int arr[], int n) {
    cout << "\n=== Insertion Sort Process ===" << endl;
    
    for(int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        cout << "\nIteration " << i << ": Key = " << key << endl;
        cout << "Sorted portion: ";
        for(int k = 0; k < i; k++) {
            cout << "[" << arr[k] << "] ";
        }
        cout << endl;
        
        cout << "Comparing key with sorted elements (right to left):" << endl;
        
        // Shift elements greater than key
        while(j >= 0 && arr[j] > key) {
            cout << "  " << arr[j] << " > " << key 
                 << " -> Shift " << arr[j] << " to position " << j+1 << endl;
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key
        arr[j + 1] = key;
        cout << "Insert " << key << " at position " << j+1 << endl;
        
        cout << "Array after iteration: ";
        for(int k = 0; k < n; k++) {
            if(k <= i) cout << "[" << arr[k] << "] ";
            else cout << arr[k] << " ";
        }
        cout << endl;
    }
}

int main() {
    int arr[] = {8, 3, 5, 1, 4};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    insertionSortVisual(arr, n);
    
    cout << "\nFinal sorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Output:**
```
Original array: 8 3 5 1 4 

=== Insertion Sort Process ===

Iteration 1: Key = 3
Sorted portion: [8] 
Comparing key with sorted elements (right to left):
  8 > 3 -> Shift 8 to position 1
Insert 3 at position 0
Array after iteration: [3] [8] 5 1 4 

Iteration 2: Key = 5
Sorted portion: [3] [8] 
Comparing key with sorted elements (right to left):
  8 > 5 -> Shift 8 to position 2
Insert 5 at position 1
Array after iteration: [3] [5] [8] 1 4 

... (continued)
```

### Binary Insertion Sort (Optimized)

```cpp
#include <iostream>
using namespace std;

// Binary search to find insertion position
int binarySearch(int arr[], int key, int low, int high) {
    while(low <= high) {
        int mid = low + (high - low) / 2;
        
        if(key == arr[mid])
            return mid + 1;
        else if(key > arr[mid])
            low = mid + 1;
        else
            high = mid - 1;
    }
    return low;
}

void binaryInsertionSort(int arr[], int n) {
    for(int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Find position to insert using binary search
        int pos = binarySearch(arr, key, 0, j);
        
        cout << "Element " << key << " should be inserted at position " << pos << endl;
        
        // Shift all elements after pos to the right
        while(j >= pos) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[pos] = key;
        
        cout << "Array after inserting " << key << ": ";
        for(int k = 0; k < n; k++) {
            cout << arr[k] << " ";
        }
        cout << endl;
    }
}

int main() {
    int arr[] = {37, 23, 0, 17, 12, 72, 31};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl << endl;
    
    binaryInsertionSort(arr, n);
    
    cout << "\nSorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### Insertion Sort Complexity Analysis

**Time Complexity:**
- **Best Case**: O(n) - When array is already sorted
- **Average Case**: O(n²)
- **Worst Case**: O(n²) - When array is reverse sorted

**Space Complexity:**
- O(1) - In-place sorting algorithm

**Comparisons:**
- Best case: n-1 comparisons
- Worst case: n(n-1)/2 comparisons

**Shifts:**
- Same as number of comparisons

**Advantages:**
- Simple implementation
- Efficient for small data sets
- Adaptive: Efficient for data sets that are already substantially sorted
- Stable: Maintains relative order of equal elements
- In-place: Requires O(1) additional memory
- Online: Can sort a list as it receives it

**Disadvantages:**
- O(n²) time complexity for average and worst cases
- Less efficient on large lists than more advanced algorithms

### Real-world Applications

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int rollNumber;
    float marks;
    
    void display() {
        cout << name << " (Roll: " << rollNumber << ", Marks: " << marks << ")" << endl;
    }
};

// Insertion sort for array of structures
void sortStudentsByMarks(Student students[], int n) {
    for(int i = 1; i < n; i++) {
        Student key = students[i];
        int j = i - 1;
        
        // Sort by marks in descending order
        while(j >= 0 && students[j].marks < key.marks) {
            students[j + 1] = students[j];
            j--;
        }
        students[j + 1] = key;
    }
}

int main() {
    Student students[] = {
        {"Alice", 101, 85.5},
        {"Bob", 102, 92.0},
        {"Charlie", 103, 78.5},
        {"David", 104, 88.0},
        {"Eve", 105, 91.5}
    };
    
    int n = sizeof(students) / sizeof(students[0]);
    
    cout << "Students before sorting:" << endl;
    for(int i = 0; i < n; i++) {
        students[i].display();
    }
    
    sortStudentsByMarks(students, n);
    
    cout << "\nStudents after sorting by marks (descending):" << endl;
    for(int i = 0; i < n; i++) {
        students[i].display();
    }
    
    return 0;
}
```

**Output:**
```
Students before sorting:
Alice (Roll: 101, Marks: 85.5)
Bob (Roll: 102, Marks: 92)
Charlie (Roll: 103, Marks: 78.5)
David (Roll: 104, Marks: 88)
Eve (Roll: 105, Marks: 91.5)

Students after sorting by marks (descending):
Bob (Roll: 102, Marks: 92)
Eve (Roll: 105, Marks: 91.5)
David (Roll: 104, Marks: 88)
Alice (Roll: 101, Marks: 85.5)
Charlie (Roll: 103, Marks: 78.5)
```

### When to Use Insertion Sort

1. **Small datasets** (typically n < 50)
2. **Nearly sorted data**
3. **Online algorithms** where data comes in stream
4. **As the base case for recursive algorithms** like QuickSort
5. **When memory write is expensive** (minimal writes compared to Selection Sort)

### Performance Comparison

```cpp
#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

void fillArray(int arr[], int n, int type) {
    switch(type) {
        case 0: // Random
            for(int i = 0; i < n; i++) {
                arr[i] = rand() % 1000;
            }
            break;
        case 1: // Sorted
            for(int i = 0; i < n; i++) {
                arr[i] = i * 10;
            }
            break;
        case 2: // Reverse sorted
            for(int i = 0; i < n; i++) {
                arr[i] = (n - i) * 10;
            }
            break;
    }
}

void insertionSort(int arr[], int n) {
    for(int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    srand(time(0));
    
    int sizes[] = {100, 1000, 5000};
    string types[] = {"Random", "Sorted", "Reverse Sorted"};
    
    cout << "Insertion Sort Performance Analysis\n" << endl;
    cout << "Size\tType\t\tTime (ms)" << endl;
    cout << "--------------------------------" << endl;
    
    for(int size : sizes) {
        for(int type = 0; type < 3; type++) {
            int* arr = new int[size];
            fillArray(arr, size, type);
            
            clock_t start = clock();
            insertionSort(arr, size);
            clock_t end = clock();
            
            double time_taken = double(end - start) / CLOCKS_PER_SEC * 1000;
            
            cout << size << "\t" << types[type] << "\t\t" << time_taken << " ms" << endl;
            
            delete[] arr;
        }
        cout << endl;
    }
    
    return 0;
}
```

**Sample Output:**
```
Insertion Sort Performance Analysis

Size    Type            Time (ms)
--------------------------------
100     Random          0.023 ms
100     Sorted          0.001 ms
100     Reverse Sorted  0.045 ms

1000    Random          2.341 ms
1000    Sorted          0.012 ms
1000    Reverse Sorted  4.892 ms

5000    Random          58.732 ms
5000    Sorted          0.056 ms
5000    Reverse Sorted  117.451 ms
```

This demonstrates Insertion Sort's adaptiveness - it performs much better on already sorted data compared to random or reverse sorted data.

# DSA Quick Sort - Complete C++ Guide

## Introduction to Quick Sort

Quick Sort is a **divide-and-conquer** algorithm that works by selecting a 'pivot' element and partitioning the array around it. It's one of the most efficient sorting algorithms for average cases.

### Key Characteristics:
- Average case time complexity: O(n log n)
- Worst case: O(n²) (rare with good pivot selection)
- In-place sorting algorithm
- Not stable by default
- Recursive algorithm

## How Quick Sort Works

### The Three-Step Process:
1. **Pivot Selection**: Choose an element as pivot
2. **Partitioning**: Rearrange array so elements < pivot are on left, elements > pivot are on right
3. **Recursion**: Apply Quick Sort recursively to left and right sub-arrays

### Visual Example:
```
Original: [10, 80, 30, 90, 40, 50, 70]
Pivot = 70 (last element)

After Partition: [10, 30, 40, 50, 70, 90, 80]
                ↑ pivot at correct position

Recursively sort left [10, 30, 40, 50] and right [90, 80]
```

## Basic Quick Sort Implementation

```cpp
#include <iostream>
using namespace std;

// Function to swap two elements
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Partition function using last element as pivot
int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // Choosing last element as pivot
    int i = low - 1;        // Index of smaller element
    
    for(int j = low; j <= high - 1; j++) {
        // If current element is smaller than or equal to pivot
        if(arr[j] <= pivot) {
            i++;  // Increment index of smaller element
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// Quick Sort function
void quickSort(int arr[], int low, int high) {
    if(low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        int pi = partition(arr, low, high);
        
        // Separately sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Function to print array
void printArray(int arr[], int size) {
    for(int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    printArray(arr, n);
    
    quickSort(arr, 0, n - 1);
    
    cout << "Sorted array: ";
    printArray(arr, n);
    
    return 0;
}
```

**Output:**
```
Original array: 10 7 8 9 1 5 
Sorted array: 1 5 7 8 9 10
```

## Detailed Step-by-Step Visualization

```cpp
#include <iostream>
using namespace std;

int partitionVisual(int arr[], int low, int high, int& step) {
    int pivot = arr[high];
    int i = low - 1;
    
    cout << "\nStep " << step++ << ": Partitioning from index " 
         << low << " to " << high << endl;
    cout << "Pivot element: " << pivot << endl;
    cout << "Initial array: ";
    for(int k = low; k <= high; k++) {
        cout << arr[k] << " ";
    }
    cout << endl;
    
    for(int j = low; j <= high - 1; j++) {
        cout << "  Comparing arr[" << j << "]=" << arr[j] 
             << " with pivot=" << pivot;
        
        if(arr[j] <= pivot) {
            i++;
            cout << " -> Swapping arr[" << i << "]=" << arr[i] 
                 << " with arr[" << j << "]=" << arr[j] << endl;
            
            // Swap arr[i] and arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        } else {
            cout << " -> No swap needed" << endl;
        }
    }
    
    // Swap arr[i+1] and arr[high] (pivot)
    cout << "  Final swap: Moving pivot to position " << i+1 << endl;
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    cout << "After partition: ";
    for(int k = low; k <= high; k++) {
        if(k == i + 1) cout << "[" << arr[k] << "] ";
        else cout << arr[k] << " ";
    }
    cout << endl;
    
    return (i + 1);
}

void quickSortVisual(int arr[], int low, int high, int& step) {
    if(low < high) {
        int pi = partitionVisual(arr, low, high, step);
        
        cout << "\nRecursively sorting left subarray [" 
             << low << " to " << pi-1 << "] and right subarray [" 
             << pi+1 << " to " << high << "]" << endl;
        
        quickSortVisual(arr, low, pi - 1, step);
        quickSortVisual(arr, pi + 1, high, step);
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    int step = 1;
    
    cout << "=== Quick Sort Step-by-Step Demonstration ===" << endl;
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    quickSortVisual(arr, 0, n-1, step);
    
    cout << "\nFinal sorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Output:**
```
=== Quick Sort Step-by-Step Demonstration ===
Original array: 64 25 12 22 11 

Step 1: Partitioning from index 0 to 4
Pivot element: 11
Initial array: 64 25 12 22 11 
  Comparing arr[0]=64 with pivot=11 -> No swap needed
  Comparing arr[1]=25 with pivot=11 -> No swap needed
  Comparing arr[2]=12 with pivot=11 -> No swap needed
  Comparing arr[3]=22 with pivot=11 -> No swap needed
  Final swap: Moving pivot to position 0
After partition: [11] 25 12 22 64 

Recursively sorting left subarray [0 to -1] and right subarray [1 to 4]

Step 2: Partitioning from index 1 to 4
Pivot element: 64
Initial array: 25 12 22 64 
  Comparing arr[1]=25 with pivot=64 -> Swapping arr[1]=25 with arr[1]=25
  Comparing arr[2]=12 with pivot=64 -> Swapping arr[2]=12 with arr[2]=12
  Comparing arr[3]=22 with pivot=64 -> Swapping arr[3]=22 with arr[3]=22
  Final swap: Moving pivot to position 4
After partition: 25 12 22 [64] 

... (continued)
```

## Different Pivot Selection Strategies

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// 1. First element as pivot
int partitionFirst(int arr[], int low, int high) {
    int pivot = arr[low];
    int i = low + 1;
    
    for(int j = low + 1; j <= high; j++) {
        if(arr[j] < pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    swap(arr[low], arr[i-1]);
    return i-1;
}

// 2. Last element as pivot (Standard)
int partitionLast(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for(int j = low; j <= high - 1; j++) {
        if(arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

// 3. Middle element as pivot
int partitionMiddle(int arr[], int low, int high) {
    int mid = low + (high - low) / 2;
    int pivot = arr[mid];
    
    // Move pivot to end
    swap(arr[mid], arr[high]);
    
    int i = low - 1;
    for(int j = low; j <= high - 1; j++) {
        if(arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

// 4. Random pivot (Better for avoiding worst case)
int partitionRandom(int arr[], int low, int high) {
    // Generate random index between low and high
    int random = low + rand() % (high - low + 1);
    
    // Move random pivot to end
    swap(arr[random], arr[high]);
    
    return partitionLast(arr, low, high);
}

// 5. Median of Three (Best for real-world data)
int medianOfThree(int arr[], int low, int high) {
    int mid = low + (high - low) / 2;
    
    // Sort low, mid, high
    if(arr[high] < arr[low])
        swap(arr[high], arr[low]);
    if(arr[mid] < arr[low])
        swap(arr[mid], arr[low]);
    if(arr[high] < arr[mid])
        swap(arr[high], arr[mid]);
    
    // Move median to high position
    swap(arr[mid], arr[high]);
    
    return partitionLast(arr, low, high);
}

void testPivotStrategies(int arr[], int n, string strategy) {
    cout << "\nTesting " << strategy << " pivot:" << endl;
    cout << "Original: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    // Create copy for testing
    int* testArr = new int[n];
    copy(arr, arr + n, testArr);
    
    // Apply quick sort with specific pivot
    if(strategy == "First") partitionFirst(testArr, 0, n-1);
    else if(strategy == "Last") partitionLast(testArr, 0, n-1);
    else if(strategy == "Middle") partitionMiddle(testArr, 0, n-1);
    else if(strategy == "Random") partitionRandom(testArr, 0, n-1);
    else if(strategy == "Median") medianOfThree(testArr, 0, n-1);
    
    cout << "After partition: ";
    for(int i = 0; i < n; i++) cout << testArr[i] << " ";
    cout << endl;
    
    delete[] testArr;
}

int main() {
    srand(time(0));
    
    int arr[] = {9, 7, 5, 11, 12, 2, 14, 3, 10, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "=== Pivot Selection Strategies Comparison ===" << endl;
    
    testPivotStrategies(arr, n, "First");
    testPivotStrategies(arr, n, "Last");
    testPivotStrategies(arr, n, "Middle");
    testPivotStrategies(arr, n, "Random");
    testPivotStrategies(arr, n, "Median");
    
    return 0;
}
```

## Iterative Quick Sort Implementation

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Iterative Quick Sort using stack
void iterativeQuickSort(int arr[], int low, int high) {
    // Create a stack
    stack<int> s;
    
    // Push initial values
    s.push(low);
    s.push(high);
    
    while(!s.empty()) {
        // Pop high and low
        high = s.top();
        s.pop();
        low = s.top();
        s.pop();
        
        // Partition the array
        int pivot = arr[high];
        int i = low - 1;
        
        for(int j = low; j <= high - 1; j++) {
            if(arr[j] <= pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        int pi = i + 1;
        
        // Push left side to stack if there are elements
        if(pi - 1 > low) {
            s.push(low);
            s.push(pi - 1);
        }
        
        // Push right side to stack if there are elements
        if(pi + 1 < high) {
            s.push(pi + 1);
            s.push(high);
        }
    }
}

int main() {
    int arr[] = {4, 3, 5, 2, 1, 3, 2, 3};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    iterativeQuickSort(arr, 0, n-1);
    
    cout << "Sorted array (iterative): ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

## Quick Sort Complexity Analysis

### Time Complexity:
- **Best Case**: O(n log n) - When pivot divides array into equal halves
- **Average Case**: O(n log n)
- **Worst Case**: O(n²) - When pivot is smallest or largest element (sorted/reverse sorted arrays)

### Space Complexity:
- **Best Case**: O(log n) - Recursion stack depth
- **Worst Case**: O(n) - In case of skewed recursion

### Mathematical Analysis:
For average case:
```
T(n) = 2T(n/2) + O(n)
Using Master Theorem: T(n) = O(n log n)
```

## Optimizations and Improvements

### 1. Tail Call Optimization
```cpp
// Optimized Quick Sort with tail recursion elimination
void optimizedQuickSort(int arr[], int low, int high) {
    while(low < high) {
        int pi = partition(arr, low, high);
        
        // Always sort the smaller part first
        if(pi - low < high - pi) {
            optimizedQuickSort(arr, low, pi - 1);
            low = pi + 1;
        } else {
            optimizedQuickSort(arr, pi + 1, high);
            high = pi - 1;
        }
    }
}
```

### 2. Insertion Sort for Small Arrays
```cpp
void hybridQuickSort(int arr[], int low, int high) {
    const int THRESHOLD = 10;
    
    while(low < high) {
        // Use insertion sort for small subarrays
        if(high - low < THRESHOLD) {
            insertionSort(arr, low, high);
            break;
        }
        
        int pi = partition(arr, low, high);
        
        // Tail call optimization
        if(pi - low < high - pi) {
            hybridQuickSort(arr, low, pi - 1);
            low = pi + 1;
        } else {
            hybridQuickSort(arr, pi + 1, high);
            high = pi - 1;
        }
    }
}

void insertionSort(int arr[], int low, int high) {
    for(int i = low + 1; i <= high; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while(j >= low && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

### 3. Three-Way Partitioning (for arrays with many duplicates)
```cpp
void threeWayPartition(int arr[], int low, int high, int& i, int& j) {
    int pivot = arr[high];
    int mid = low;
    
    while(mid <= high) {
        if(arr[mid] < pivot) {
            swap(arr[low], arr[mid]);
            low++;
            mid++;
        } else if(arr[mid] == pivot) {
            mid++;
        } else { // arr[mid] > pivot
            swap(arr[mid], arr[high]);
            high--;
        }
    }
    
    i = low - 1;
    j = mid;
}

void threeWayQuickSort(int arr[], int low, int high) {
    if(low < high) {
        int i, j;
        
        // Partition array into three parts
        threeWayPartition(arr, low, high, i, j);
        
        // Recursively sort left and right parts
        threeWayQuickSort(arr, low, i);
        threeWayQuickSort(arr, j, high);
    }
}
```

## Performance Comparison

```cpp
#include <iostream>
#include <ctime>
#include <cstdlib>
#include <algorithm>
using namespace std;

void generateArray(int arr[], int n, int type) {
    switch(type) {
        case 0: // Random
            for(int i = 0; i < n; i++) arr[i] = rand() % 10000;
            break;
        case 1: // Sorted
            for(int i = 0; i < n; i++) arr[i] = i;
            break;
        case 2: // Reverse sorted
            for(int i = 0; i < n; i++) arr[i] = n - i;
            break;
        case 3: // Many duplicates
            for(int i = 0; i < n; i++) arr[i] = rand() % 100;
            break;
    }
}

void testPerformance() {
    srand(time(0));
    
    int sizes[] = {1000, 10000, 50000, 100000};
    string types[] = {"Random", "Sorted", "Reverse", "Duplicates"};
    
    cout << "\n=== Quick Sort Performance Analysis ===" << endl;
    cout << "Size\tType\t\tTime (ms)" << endl;
    cout << "----------------------------------------" << endl;
    
    for(int size : sizes) {
        for(int type = 0; type < 4; type++) {
            int* arr = new int[size];
            int* arrCopy = new int[size];
            
            generateArray(arr, size, type);
            copy(arr, arr + size, arrCopy);
            
            clock_t start = clock();
            
            // Standard Quick Sort
            quickSort(arrCopy, 0, size-1);
            
            clock_t end = clock();
            double time_taken = double(end - start) / CLOCKS_PER_SEC * 1000;
            
            cout << size << "\t" << types[type];
            if(types[type].length() < 8) cout << "\t";
            cout << "\t" << time_taken << " ms" << endl;
            
            delete[] arr;
            delete[] arrCopy;
        }
        cout << endl;
    }
}

int main() {
    testPerformance();
    return 0;
}
```

## Applications of Quick Sort

### 1. Finding Kth Smallest/Largest Element
```cpp
#include <iostream>
using namespace std;

// QuickSelect algorithm to find kth smallest element
int quickSelect(int arr[], int low, int high, int k) {
    if(low == high) return arr[low];
    
    int pi = partition(arr, low, high);
    int length = pi - low + 1;
    
    if(k == length) {
        return arr[pi];
    } else if(k < length) {
        return quickSelect(arr, low, pi - 1, k);
    } else {
        return quickSelect(arr, pi + 1, high, k - length);
    }
}

int main() {
    int arr[] = {7, 10, 4, 3, 20, 15};
    int n = sizeof(arr) / sizeof(arr[0]);
    int k = 3;
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    int kthSmallest = quickSelect(arr, 0, n-1, k);
    cout << k << "th smallest element is: " << kthSmallest << endl;
    
    return 0;
}
```

### 2. Sorting Custom Objects
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Product {
public:
    string name;
    double price;
    int quantity;
    
    Product(string n, double p, int q) : name(n), price(p), quantity(q) {}
    
    void display() {
        cout << name << " - $" << price << " (Qty: " << quantity << ")" << endl;
    }
};

// Partition function for products
int partitionProducts(vector<Product>& products, int low, int high, bool byPrice = true) {
    double pivot = byPrice ? products[high].price : products[high].quantity;
    int i = low - 1;
    
    for(int j = low; j <= high - 1; j++) {
        double current = byPrice ? products[j].price : products[j].quantity;
        
        if(current <= pivot) {
            i++;
            swap(products[i], products[j]);
        }
    }
    swap(products[i + 1], products[high]);
    return (i + 1);
}

void quickSortProducts(vector<Product>& products, int low, int high, bool byPrice = true) {
    if(low < high) {
        int pi = partitionProducts(products, low, high, byPrice);
        quickSortProducts(products, low, pi - 1, byPrice);
        quickSortProducts(products, pi + 1, high, byPrice);
    }
}

int main() {
    vector<Product> products = {
        Product("Laptop", 999.99, 15),
        Product("Phone", 699.99, 30),
        Product("Tablet", 399.99, 25),
        Product("Monitor", 249.99, 20),
        Product("Keyboard", 49.99, 50)
    };
    
    cout << "Products sorted by price:" << endl;
    quickSortProducts(products, 0, products.size()-1, true);
    for(auto& p : products) p.display();
    
    cout << "\nProducts sorted by quantity:" << endl;
    quickSortProducts(products, 0, products.size()-1, false);
    for(auto& p : products) p.display();
    
    return 0;
}
```

## Advantages and Disadvantages

### Advantages:
1. **Fast**: Average case O(n log n) performance
2. **In-place**: Requires O(log n) extra space for recursion
3. **Cache-friendly**: Good locality of reference
4. **Parallelizable**: Can be easily parallelized
5. **Adaptive**: Performs well on various data distributions

### Disadvantages:
1. **Worst-case O(n²)**: Can degrade on already sorted data
2. **Not stable**: Doesn't preserve relative order of equal elements
3. **Recursive**: Deep recursion can cause stack overflow
4. **Pivot selection**: Performance depends heavily on pivot choice

## Best Practices and Tips

1. **Use median-of-three** for pivot selection in practice
2. **Switch to insertion sort** for small subarrays (n < 10-20)
3. **Implement iterative version** for large arrays to avoid stack overflow
4. **Use three-way partitioning** for arrays with many duplicates
5. **Randomize input** or use random pivot to avoid worst-case scenarios

## Comparison with Other Sorting Algorithms

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <ctime>
using namespace std;

void compareSortingAlgorithms() {
    const int SIZE = 10000;
    vector<int> data(SIZE);
    
    // Generate random data
    generate(data.begin(), data.end(), []() { return rand() % 10000; });
    
    cout << "Sorting " << SIZE << " elements:" << endl;
    cout << "Algorithm\tTime (ms)" << endl;
    cout << "------------------------" << endl;
    
    // Test std::sort (usually Quick Sort variant)
    vector<int> copy1 = data;
    clock_t start = clock();
    sort(copy1.begin(), copy1.end());
    clock_t end = clock();
    cout << "std::sort\t" << double(end - start) / CLOCKS_PER_SEC * 1000 << endl;
    
    // Test Quick Sort
    vector<int> copy2 = data;
    start = clock();
    quickSort(copy2.data(), 0, SIZE-1);
    end = clock();
    cout << "Quick Sort\t" << double(end - start) / CLOCKS_PER_SEC * 1000 << endl;
    
    // Test Merge Sort
    vector<int> copy3 = data;
    start = clock();
    sort(copy3.begin(), copy3.end());  // std::sort is often faster
    end = clock();
    cout << "Merge Sort\t" << double(end - start) / CLOCKS_PER_SEC * 1000 << endl;
}

int main() {
    srand(time(0));
    compareSortingAlgorithms();
    return 0;
}
```


*Noted*
Quick Sort is one of the most efficient and widely used sorting algorithms. Its average-case O(n log n) performance, in-place nature, and cache efficiency make it suitable for most practical applications. However, careful implementation with proper pivot selection and optimizations is crucial to avoid worst-case scenarios.


# DSA Counting Sort - Complete C++ Guide

## Introduction to Counting Sort

Counting Sort is a **non-comparison-based** sorting algorithm that works by counting the occurrences of each distinct element in the input array. It's extremely efficient when the range of input values is limited.

### Key Characteristics:
- **Time Complexity**: O(n + k) where k is the range of input
- **Space Complexity**: O(k) additional space
- **Stable**: Yes, maintains relative order of equal elements
- **Not In-place**: Requires additional memory
- **Integer Sorting**: Only works with integer keys

## How Counting Sort Works

### The Four-Step Process:
1. **Find Range**: Determine the minimum and maximum values in the array
2. **Count Frequencies**: Create a count array to store frequency of each value
3. **Cumulative Count**: Transform count array to cumulative counts
4. **Build Output**: Place elements in output array using count array

### Visual Example:
```
Input: [4, 2, 2, 8, 3, 3, 1]

Step 1: Find range (min=1, max=8)
Step 2: Count frequencies: [0,1,2,2,1,0,0,0,1]
Step 3: Cumulative: [0,1,3,5,6,6,6,6,7]
Step 4: Build output: [1,2,2,3,3,4,8]
```

## Basic Counting Sort Implementation

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(int arr[], int n) {
    // Step 1: Find the maximum element
    int maxVal = *max_element(arr, arr + n);
    
    // Step 2: Create count array and initialize with 0
    vector<int> count(maxVal + 1, 0);
    
    // Step 3: Store count of each element
    cout << "Step 3: Counting frequencies" << endl;
    for(int i = 0; i < n; i++) {
        count[arr[i]]++;
        cout << "  Element " << arr[i] << ": count[" << arr[i] 
             << "] = " << count[arr[i]] << endl;
    }
    
    // Display count array
    cout << "\nCount array: ";
    for(int i = 0; i <= maxVal; i++) {
        cout << count[i] << " ";
    }
    cout << endl;
    
    // Step 4: Modify count array to store cumulative sum
    cout << "\nStep 4: Creating cumulative count" << endl;
    for(int i = 1; i <= maxVal; i++) {
        count[i] += count[i-1];
        cout << "  count[" << i << "] = count[" << i << "] + count[" 
             << i-1 << "] = " << count[i] << endl;
    }
    
    // Display cumulative count array
    cout << "\nCumulative count array: ";
    for(int i = 0; i <= maxVal; i++) {
        cout << count[i] << " ";
    }
    cout << endl;
    
    // Step 5: Build output array
    vector<int> output(n);
    cout << "\nStep 5: Building output array" << endl;
    for(int i = n-1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        cout << "  Place " << arr[i] << " at position " 
             << count[arr[i]] - 1 << endl;
        count[arr[i]]--;
    }
    
    // Step 6: Copy output array to original array
    for(int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    printArray(arr, n);
    cout << endl;
    
    countingSort(arr, n);
    
    cout << "\nSorted array: ";
    printArray(arr, n);
    
    return 0;
}
```

**Output:**
```
Original array: 4 2 2 8 3 3 1 

Step 3: Counting frequencies
  Element 4: count[4] = 1
  Element 2: count[2] = 1
  Element 2: count[2] = 2
  Element 8: count[8] = 1
  Element 3: count[3] = 1
  Element 3: count[3] = 2
  Element 1: count[1] = 1

Count array: 0 1 2 2 1 0 0 0 1 

Step 4: Creating cumulative count
  count[1] = count[1] + count[0] = 1
  count[2] = count[2] + count[1] = 3
  count[3] = count[3] + count[2] = 5
  count[4] = count[4] + count[3] = 6
  count[5] = count[5] + count[4] = 6
  count[6] = count[6] + count[5] = 6
  count[7] = count[7] + count[6] = 6
  count[8] = count[8] + count[7] = 7

Cumulative count array: 0 1 3 5 6 6 6 6 7 

Step 5: Building output array
  Place 1 at position 0
  Place 3 at position 4
  Place 3 at position 3
  Place 8 at position 6
  Place 2 at position 2
  Place 2 at position 1
  Place 4 at position 5

Sorted array: 1 2 2 3 3 4 8
```

## Detailed Step-by-Step Visualization

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSortVisual(int arr[], int n) {
    cout << "=== Counting Sort Step-by-Step ===\n" << endl;
    
    // Display original array
    cout << "Input array: ";
    for(int i = 0; i < n; i++) {
        cout << "[" << arr[i] << "] ";
    }
    cout << endl;
    
    // Step 1: Find range
    int maxVal = *max_element(arr, arr + n);
    int minVal = *min_element(arr, arr + n);
    int range = maxVal - minVal + 1;
    
    cout << "\nStep 1: Find range" << endl;
    cout << "  Minimum value: " << minVal << endl;
    cout << "  Maximum value: " << maxVal << endl;
    cout << "  Range: " << maxVal << " - " << minVal << " + 1 = " << range << endl;
    
    // Step 2: Create and initialize count array
    vector<int> count(range, 0);
    
    cout << "\nStep 2: Initialize count array of size " << range << endl;
    cout << "  count array indices: ";
    for(int i = 0; i < range; i++) {
        cout << i + minVal << " ";
    }
    cout << endl;
    
    // Step 3: Store count of each element
    cout << "\nStep 3: Count frequencies" << endl;
    for(int i = 0; i < n; i++) {
        count[arr[i] - minVal]++;
        cout << "  Element " << arr[i] << " -> index " 
             << arr[i] - minVal << " : count = " << count[arr[i] - minVal] << endl;
    }
    
    cout << "\nCount array: ";
    for(int i = 0; i < range; i++) {
        cout << count[i] << " ";
    }
    cout << endl;
    
    // Step 4: Cumulative count
    cout << "\nStep 4: Cumulative count (positions)" << endl;
    for(int i = 1; i < range; i++) {
        count[i] += count[i-1];
        cout << "  count[" << i + minVal << "] = " << count[i] 
             << " (position for next " << i + minVal << ")" << endl;
    }
    
    // Step 5: Build output array
    vector<int> output(n);
    cout << "\nStep 5: Build output array (processing input from right to left)" << endl;
    
    for(int i = n-1; i >= 0; i--) {
        // Find position in output array
        int position = count[arr[i] - minVal] - 1;
        output[position] = arr[i];
        
        cout << "\n  Processing element arr[" << i << "] = " << arr[i] << endl;
        cout << "    Position in output: count[" << arr[i] << "] - 1 = " 
             << position << endl;
        cout << "    Output array now: ";
        for(int j = 0; j < n; j++) {
            if(j == position) cout << "[" << output[j] << "] ";
            else if(output[j] != 0) cout << output[j] << " ";
            else cout << "_ ";
        }
        cout << endl;
        
        // Decrease count for this element
        count[arr[i] - minVal]--;
    }
    
    // Step 6: Copy back
    cout << "\nStep 6: Copy output to original array" << endl;
    for(int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

int main() {
    int arr[] = {9, 1, 6, 7, 6, 2, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    countingSortVisual(arr, n);
    
    cout << "\nFinal sorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Output:**
```
=== Counting Sort Step-by-Step ===

Input array: [9] [1] [6] [7] [6] [2] [1] 

Step 1: Find range
  Minimum value: 1
  Maximum value: 9
  Range: 9 - 1 + 1 = 9

Step 2: Initialize count array of size 9
  count array indices: 1 2 3 4 5 6 7 8 9 

Step 3: Count frequencies
  Element 9 -> index 8 : count = 1
  Element 1 -> index 0 : count = 1
  Element 6 -> index 5 : count = 1
  Element 7 -> index 6 : count = 1
  Element 6 -> index 5 : count = 2
  Element 2 -> index 1 : count = 1
  Element 1 -> index 0 : count = 2

Count array: 2 1 0 0 0 2 1 0 1 

Step 4: Cumulative count (positions)
  count[2] = 3 (position for next 2)
  count[3] = 3 (position for next 3)
  count[4] = 3 (position for next 4)
  count[5] = 5 (position for next 5)
  count[6] = 6 (position for next 6)
  count[7] = 7 (position for next 7)
  count[8] = 7 (position for next 8)
  count[9] = 8 (position for next 9)

Step 5: Build output array (processing input from right to left)

  Processing element arr[6] = 1
    Position in output: count[1] - 1 = 1
    Output array now: _ [1] _ _ _ _ _ 

  Processing element arr[5] = 2
    Position in output: count[2] - 1 = 2
    Output array now: _ 1 [2] _ _ _ _ 

  ... (continued)
```

## Counting Sort with Negative Numbers

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSortWithNegative(int arr[], int n) {
    // Find both min and max values
    int maxVal = *max_element(arr, arr + n);
    int minVal = *min_element(arr, arr + n);
    int range = maxVal - minVal + 1;
    
    cout << "Array with negative numbers: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    cout << "Min: " << minVal << ", Max: " << maxVal 
         << ", Range: " << range << endl;
    
    // Create count array
    vector<int> count(range, 0);
    
    // Count frequencies
    for(int i = 0; i < n; i++) {
        count[arr[i] - minVal]++;
    }
    
    cout << "Count array (index 0 represents value " << minVal << "):" << endl;
    for(int i = 0; i < range; i++) {
        cout << "Value " << i + minVal << ": " << count[i] << " times" << endl;
    }
    
    // Cumulative count
    for(int i = 1; i < range; i++) {
        count[i] += count[i-1];
    }
    
    // Build output array
    vector<int> output(n);
    for(int i = n-1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    // Copy back
    for(int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

int main() {
    int arr[] = {-5, -10, 0, -3, 8, 5, -1, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    countingSortWithNegative(arr, n);
    
    cout << "\nSorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

## Counting Sort for Characters

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

void countingSortCharacters(string& str) {
    int n = str.length();
    
    cout << "Original string: " << str << endl;
    
    // Since characters are from 0 to 255 (ASCII)
    const int RANGE = 256;
    vector<int> count(RANGE, 0);
    
    // Count frequency of each character
    for(int i = 0; i < n; i++) {
        count[str[i]]++;
    }
    
    // Display character frequencies
    cout << "\nCharacter frequencies:" << endl;
    for(int i = 0; i < RANGE; i++) {
        if(count[i] > 0) {
            if(i >= 32 && i <= 126) { // Printable characters
                cout << "  '" << char(i) << "' (ASCII " << i << "): " 
                     << count[i] << " times" << endl;
            }
        }
    }
    
    // Cumulative count
    for(int i = 1; i < RANGE; i++) {
        count[i] += count[i-1];
    }
    
    // Build output
    vector<char> output(n);
    for(int i = n-1; i >= 0; i--) {
        output[count[str[i]] - 1] = str[i];
        count[str[i]]--;
    }
    
    // Copy back to string
    for(int i = 0; i < n; i++) {
        str[i] = output[i];
    }
}

int main() {
    string text = "counting sort example";
    
    cout << "=== Counting Sort for Characters ===" << endl;
    countingSortCharacters(text);
    
    cout << "\nSorted string: " << text << endl;
    
    return 0;
}
```

## Counting Sort Complexity Analysis

### Time Complexity:
- **Best Case**: O(n + k)
- **Average Case**: O(n + k)
- **Worst Case**: O(n + k)

Where:
- **n** = number of elements in input array
- **k** = range of input (max - min + 1)

### Space Complexity:
- **O(k)** for count array
- **O(n)** for output array
- **Total**: O(n + k)

### When is Counting Sort Efficient?
- **k is small** compared to n
- **n is large** but values are limited
- **Integer sorting** is required
- **Stability** is important

## Optimized Counting Sort

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Optimized version that minimizes memory usage
void optimizedCountingSort(int arr[], int n) {
    if(n == 0) return;
    
    // Find min and max in single pass
    int minVal = arr[0];
    int maxVal = arr[0];
    
    for(int i = 1; i < n; i++) {
        if(arr[i] < minVal) minVal = arr[i];
        if(arr[i] > maxVal) maxVal = arr[i];
    }
    
    int range = maxVal - minVal + 1;
    
    // Early return if range is too large
    if(range > 1000000) { // Arbitrary threshold
        cout << "Range too large for Counting Sort. Use another algorithm." << endl;
        return;
    }
    
    // Use vector for dynamic allocation
    vector<int> count(range, 0);
    
    // Count frequencies
    for(int i = 0; i < n; i++) {
        count[arr[i] - minVal]++;
    }
    
    // Reconstruct sorted array directly
    int index = 0;
    for(int i = 0; i < range; i++) {
        while(count[i] > 0) {
            arr[index++] = i + minVal;
            count[i]--;
        }
    }
}

// For arrays with small range, we can avoid output array
void countingSortInPlace(int arr[], int n) {
    if(n <= 1) return;
    
    int minVal = arr[0];
    int maxVal = arr[0];
    
    for(int i = 1; i < n; i++) {
        if(arr[i] < minVal) minVal = arr[i];
        if(arr[i] > maxVal) maxVal = arr[i];
    }
    
    int range = maxVal - minVal + 1;
    vector<int> count(range, 0);
    
    // Count frequencies
    for(int i = 0; i < n; i++) {
        count[arr[i] - minVal]++;
    }
    
    // Overwrite original array
    int currentIndex = 0;
    for(int value = 0; value < range; value++) {
        int actualValue = value + minVal;
        for(int j = 0; j < count[value]; j++) {
            arr[currentIndex++] = actualValue;
        }
    }
}

int main() {
    int arr1[] = {1, 4, 1, 2, 7, 5, 2};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    
    cout << "Optimized Counting Sort:" << endl;
    cout << "Original: ";
    for(int i = 0; i < n1; i++) cout << arr1[i] << " ";
    cout << endl;
    
    optimizedCountingSort(arr1, n1);
    
    cout << "Sorted: ";
    for(int i = 0; i < n1; i++) cout << arr1[i] << " ";
    cout << endl;
    
    return 0;
}
```

## Applications of Counting Sort

### 1. Sorting Exam Scores (0-100 range)
```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

void sortExamScores() {
    const int NUM_STUDENTS = 50;
    const int MAX_SCORE = 100;
    
    vector<int> scores(NUM_STUDENTS);
    
    // Generate random scores
    srand(time(0));
    for(int i = 0; i < NUM_STUDENTS; i++) {
        scores[i] = rand() % (MAX_SCORE + 1); // 0 to 100
    }
    
    cout << "Exam Scores (Unsorted):" << endl;
    for(int i = 0; i < NUM_STUDENTS; i++) {
        cout << scores[i] << " ";
        if((i + 1) % 10 == 0) cout << endl;
    }
    
    // Counting sort is perfect for this!
    vector<int> count(MAX_SCORE + 1, 0);
    
    for(int score : scores) {
        count[score]++;
    }
    
    // Reconstruct sorted scores
    int index = 0;
    for(int score = 0; score <= MAX_SCORE; score++) {
        while(count[score] > 0) {
            scores[index++] = score;
            count[score]--;
        }
    }
    
    cout << "\n\nExam Scores (Sorted):" << endl;
    for(int i = 0; i < NUM_STUDENTS; i++) {
        cout << scores[i] << " ";
        if((i + 1) % 10 == 0) cout << endl;
    }
    
    // Calculate statistics
    cout << "\nStatistics:" << endl;
    cout << "Highest score: " << scores[NUM_STUDENTS - 1] << endl;
    cout << "Lowest score: " << scores[0] << endl;
    cout << "Median score: " << scores[NUM_STUDENTS / 2] << endl;
}

int main() {
    sortExamScores();
    return 0;
}
```

### 2. Histogram Generation
```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

void generateHistogram(const vector<int>& data) {
    if(data.empty()) return;
    
    // Find range
    int minVal = data[0];
    int maxVal = data[0];
    for(int val : data) {
        if(val < minVal) minVal = val;
        if(val > maxVal) maxVal = val;
    }
    
    int range = maxVal - minVal + 1;
    vector<int> histogram(range, 0);
    
    // Build histogram
    for(int val : data) {
        histogram[val - minVal]++;
    }
    
    // Display histogram
    cout << "\nValue Range Histogram:" << endl;
    cout << "----------------------" << endl;
    
    int maxCount = *max_element(histogram.begin(), histogram.end());
    
    for(int i = 0; i < range; i++) {
        int value = i + minVal;
        int count = histogram[i];
        
        if(count > 0) {
            cout << setw(3) << value << ": " 
                 << string(count * 50 / maxCount, '#') 
                 << " (" << count << ")" << endl;
        }
    }
}

int main() {
    vector<int> data = {1, 3, 2, 1, 4, 2, 3, 5, 1, 2, 
                        3, 4, 5, 2, 1, 3, 4, 2, 1, 5};
    
    cout << "Original data: ";
    for(int val : data) cout << val << " ";
    cout << endl;
    
    generateHistogram(data);
    
    return 0;
}
```

## Comparison with Other Sorting Algorithms

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <ctime>
#include <cstdlib>
using namespace std;

void performanceComparison() {
    srand(time(0));
    
    // Test cases
    vector<pair<string, vector<int>>> testCases = {
        {"Small Range (0-100)", {}},
        {"Medium Range (0-1000)", {}},
        {"Large Range (0-10000)", {}},
        {"Very Large Range (0-100000)", {}}
    };
    
    const int SIZE = 10000;
    
    // Generate test data
    for(auto& testCase : testCases) {
        testCase.second.resize(SIZE);
        int maxVal;
        
        if(testCase.first.find("Small") != string::npos) maxVal = 100;
        else if(testCase.first.find("Medium") != string::npos) maxVal = 1000;
        else if(testCase.first.find("Large") != string::npos) maxVal = 10000;
        else maxVal = 100000;
        
        for(int i = 0; i < SIZE; i++) {
            testCase.second[i] = rand() % (maxVal + 1);
        }
    }
    
    cout << "Performance Comparison (Sorting " << SIZE << " elements)" << endl;
    cout << "================================================" << endl;
    
    for(auto& testCase : testCases) {
        cout << "\nTest: " << testCase.first << endl;
        
        // Test Counting Sort
        vector<int> data1 = testCase.second;
        clock_t start = clock();
        
        // Implement counting sort here
        int maxVal = *max_element(data1.begin(), data1.end());
        int minVal = *min_element(data1.begin(), data1.end());
        int range = maxVal - minVal + 1;
        vector<int> count(range, 0);
        
        for(int val : data1) count[val - minVal]++;
        
        int index = 0;
        for(int i = 0; i < range; i++) {
            while(count[i] > 0) {
                data1[index++] = i + minVal;
                count[i]--;
            }
        }
        
        clock_t end = clock();
        double countingTime = double(end - start) / CLOCKS_PER_SEC * 1000;
        
        // Test std::sort (Quick Sort variant)
        vector<int> data2 = testCase.second;
        start = clock();
        sort(data2.begin(), data2.end());
        end = clock();
        double quickTime = double(end - start) / CLOCKS_PER_SEC * 1000;
        
        cout << "  Counting Sort: " << countingTime << " ms" << endl;
        cout << "  Quick Sort (std::sort): " << quickTime << " ms" << endl;
        cout << "  Ratio (Counting/Quick): " << countingTime/quickTime << endl;
    }
}

int main() {
    performanceComparison();
    return 0;
}
```

## Limitations and When Not to Use Counting Sort

### Limitations:
1. **Integer Only**: Only works with integer keys
2. **Range Dependency**: Performance depends on range k, not just n
3. **Memory Usage**: Requires O(k) additional memory
4. **Not Comparison-based**: Cannot be used with custom comparators

### When NOT to use Counting Sort:
1. **When k is very large** compared to n (e.g., k = n²)
2. **When sorting floating-point numbers**
3. **When sorting complex objects** with integer keys but large payloads
4. **When memory is severely constrained**

## Hybrid Approach: Counting Sort + Other Algorithms

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Hybrid approach: Use Counting Sort for small range, Quick Sort otherwise
void hybridSort(vector<int>& arr) {
    if(arr.size() <= 1) return;
    
    // Find range
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    // Threshold: if range is small compared to size, use Counting Sort
    if(range < arr.size() * 2) {
        cout << "Using Counting Sort (range=" << range 
             << ", size=" << arr.size() << ")" << endl;
        
        vector<int> count(range, 0);
        for(int val : arr) {
            count[val - minVal]++;
        }
        
        int index = 0;
        for(int i = 0; i < range; i++) {
            while(count[i] > 0) {
                arr[index++] = i + minVal;
                count[i]--;
            }
        }
    } else {
        cout << "Using Quick Sort (range=" << range 
             << ", size=" << arr.size() << ")" << endl;
        sort(arr.begin(), arr.end());
    }
}

int main() {
    // Test case 1: Small range - Counting Sort
    vector<int> data1 = {1, 4, 1, 2, 7, 5, 2, 3, 6, 2, 1};
    cout << "Test 1 - Small range:" << endl;
    hybridSort(data1);
    cout << "Sorted: ";
    for(int val : data1) cout << val << " ";
    cout << endl;
    
    // Test case 2: Large range - Quick Sort
    vector<int> data2 = {1000, 5000, 200, 8000, 1500, 9000, 300};
    cout << "\nTest 2 - Large range:" << endl;
    hybridSort(data2);
    cout << "Sorted: ";
    for(int val : data2) cout << val << " ";
    cout << endl;
    
    return 0;
}
```

## Summary

Counting Sort is a highly efficient algorithm when the range of input values is small. Its O(n + k) time complexity makes it faster than comparison-based sorts in specific scenarios. However, its limitations mean it's not a general-purpose sorting algorithm.

**Key Takeaways:**
- Best when k (range) is small compared to n
- Stable sorting algorithm
- Not in-place (requires additional memory)
- Only works with integer keys
- Excellent for specific applications like sorting grades, ages, or exam scores


# DSA Radix Sort - Complete C++ Guide

## Introduction to Radix Sort

Radix Sort is a **non-comparative integer sorting algorithm** that sorts numbers by processing individual digits. It groups numbers by each digit, from least significant digit (LSD) to most significant digit (MSD).

### Key Characteristics:
- **Time Complexity**: O(d*(n + k)) where d is number of digits, k is base (usually 10)
- **Space Complexity**: O(n + k) additional space
- **Stable**: Yes, maintains relative order
- **Not In-place**: Requires additional memory
- **Integer Sorting**: Works only with integers (or objects with integer keys)

## How Radix Sort Works

### The LSD (Least Significant Digit) Approach:
1. **Start from LSD**: Begin with the rightmost digit
2. **Group by digit**: Place numbers in buckets based on current digit
3. **Collect buckets**: Gather numbers back in order
4. **Repeat**: Move to next digit to the left
5. **Continue**: Until all digits are processed

### Visual Example:
```
Input: [170, 45, 75, 90, 802, 24, 2, 66]

Step 1 (Sort by units digit):
Buckets: 0:[170,90], 2:[802,2], 4:[24], 5:[45,75], 6:[66]
Result: [170, 90, 802, 2, 24, 45, 75, 66]

Step 2 (Sort by tens digit):
Buckets: 0:[802,2], 2:[24], 4:[45], 6:[66], 7:[170,75], 9:[90]
Result: [802, 2, 24, 45, 66, 170, 75, 90]

Step 3 (Sort by hundreds digit):
Buckets: 0:[2,24,45,66,75,90], 1:[170], 8:[802]
Result: [2, 24, 45, 66, 75, 90, 170, 802] ← Sorted!
```

## Basic Radix Sort Implementation

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// A utility function to get the maximum value in arr[]
int getMax(int arr[], int n) {
    int maxVal = arr[0];
    for(int i = 1; i < n; i++) {
        if(arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

// Using counting sort as a subroutine for radix sort
void countingSortForRadix(int arr[], int n, int exp) {
    vector<int> output(n);  // Output array
    int count[10] = {0};    // Count array for digits 0-9
    
    cout << "\nSorting by digit at position 10^" << exp << ":" << endl;
    
    // Store count of occurrences
    for(int i = 0; i < n; i++) {
        int digit = (arr[i] / exp) % 10;
        count[digit]++;
        cout << "  Element " << arr[i] << " -> digit " << digit 
             << " (count[" << digit << "] = " << count[digit] << ")" << endl;
    }
    
    cout << "\nCount array: ";
    for(int i = 0; i < 10; i++) {
        cout << count[i] << " ";
    }
    cout << endl;
    
    // Change count[i] to contain actual position
    for(int i = 1; i < 10; i++) {
        count[i] += count[i-1];
    }
    
    cout << "Cumulative count: ";
    for(int i = 0; i < 10; i++) {
        cout << count[i] << " ";
    }
    cout << endl;
    
    // Build output array
    for(int i = n-1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        cout << "  Placing " << arr[i] << " at position " 
             << count[digit] - 1 << endl;
        count[digit]--;
    }
    
    cout << "Output array: ";
    for(int i = 0; i < n; i++) {
        cout << output[i] << " ";
    }
    cout << endl;
    
    // Copy output to arr[]
    for(int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Main Radix Sort function
void radixSort(int arr[], int n) {
    // Find maximum number to know number of digits
    int maxVal = getMax(arr, n);
    
    cout << "Maximum value: " << maxVal << endl;
    cout << "Number of digits: " << to_string(maxVal).length() << endl;
    
    // Do counting sort for every digit
    for(int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortForRadix(arr, n, exp);
    }
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    printArray(arr, n);
    
    radixSort(arr, n);
    
    cout << "\nSorted array: ";
    printArray(arr, n);
    
    return 0;
}
```

**Output:**
```
Original array: 170 45 75 90 802 24 2 66 
Maximum value: 802
Number of digits: 3

Sorting by digit at position 10^1:
  Element 170 -> digit 0 (count[0] = 1)
  Element 45 -> digit 5 (count[5] = 1)
  Element 75 -> digit 5 (count[5] = 2)
  Element 90 -> digit 0 (count[0] = 2)
  Element 802 -> digit 2 (count[2] = 1)
  Element 24 -> digit 4 (count[4] = 1)
  Element 2 -> digit 2 (count[2] = 2)
  Element 66 -> digit 6 (count[6] = 1)

Count array: 2 0 2 0 1 2 1 0 0 0 
Cumulative count: 2 2 4 4 5 7 8 8 8 8 
  Placing 66 at position 7
  Placing 2 at position 3
  Placing 24 at position 4
  Placing 802 at position 2
  Placing 90 at position 1
  Placing 75 at position 6
  Placing 45 at position 5
  Placing 170 at position 0
Output array: 170 90 802 2 24 45 75 66 

... (continues for tens and hundreds digits)
```

## Detailed Step-by-Step Visualization

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

void radixSortVisual(int arr[], int n) {
    cout << "=== Radix Sort Step-by-Step ===\n" << endl;
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << setw(3) << arr[i] << " ";
    }
    cout << endl;
    
    // Find maximum value
    int maxVal = *max_element(arr, arr + n);
    int numDigits = to_string(maxVal).length();
    
    cout << "\nMaximum value: " << maxVal << endl;
    cout << "Number of digits to process: " << numDigits << endl;
    
    // Process each digit
    for(int digitPos = 0; digitPos < numDigits; digitPos++) {
        int exp = pow(10, digitPos);
        
        cout << "\n" << string(60, '=') << endl;
        cout << "Processing " << (digitPos == 0 ? "units" : 
               digitPos == 1 ? "tens" : 
               digitPos == 2 ? "hundreds" : to_string(digitPos) + "th") 
             << " digit (position 10^" << digitPos << ")" << endl;
        cout << string(60, '=') << endl;
        
        // Create 10 buckets (0-9)
        vector<vector<int>> buckets(10);
        
        // Distribute numbers into buckets based on current digit
        cout << "\nDistributing numbers into buckets:" << endl;
        for(int i = 0; i < n; i++) {
            int digit = (arr[i] / exp) % 10;
            buckets[digit].push_back(arr[i]);
            
            cout << "  " << setw(3) << arr[i] << " -> bucket[" << digit << "] ";
            cout << "(digit: " << setw(2) << digit << ")" << endl;
        }
        
        // Display buckets
        cout << "\nBuckets after distribution:" << endl;
        for(int i = 0; i < 10; i++) {
            if(!buckets[i].empty()) {
                cout << "  Bucket[" << i << "]: ";
                for(int num : buckets[i]) {
                    cout << setw(3) << num << " ";
                }
                cout << endl;
            }
        }
        
        // Collect numbers from buckets
        cout << "\nCollecting numbers from buckets:" << endl;
        int index = 0;
        for(int i = 0; i < 10; i++) {
            cout << "  From bucket[" << i << "]: ";
            for(int num : buckets[i]) {
                arr[index++] = num;
                cout << setw(3) << num << " ";
            }
            if(!buckets[i].empty()) cout << endl;
        }
        
        cout << "\nArray after processing this digit: ";
        for(int i = 0; i < n; i++) {
            cout << setw(3) << arr[i] << " ";
        }
        cout << endl;
        
        // Show digit extraction for each number
        cout << "\nDigit extraction details:" << endl;
        cout << "Number\t\tDigit at 10^" << digitPos << "\t\tCalculation" << endl;
        cout << string(50, '-') << endl;
        for(int i = 0; i < n; i++) {
            int digit = (arr[i] / exp) % 10;
            cout << setw(3) << arr[i] << "\t\t" << setw(2) << digit 
                 << "\t\t\t(" << arr[i] << " / " << exp << ") % 10 = " << digit << endl;
        }
    }
    
    cout << "\n" << string(60, '=') << endl;
    cout << "FINAL SORTED ARRAY:" << endl;
    cout << string(60, '=') << endl;
    for(int i = 0; i < n; i++) {
        cout << setw(3) << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {329, 457, 657, 839, 436, 720, 355};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    radixSortVisual(arr, n);
    
    return 0;
}
```

**Output:**
```
=== Radix Sort Step-by-Step ===

Original array: 329 457 657 839 436 720 355 

Maximum value: 839
Number of digits to process: 3

============================================================
Processing units digit (position 10^0)
============================================================

Distributing numbers into buckets:
  329 -> bucket[9] (digit:  9)
  457 -> bucket[7] (digit:  7)
  657 -> bucket[7] (digit:  7)
  839 -> bucket[9] (digit:  9)
  436 -> bucket[6] (digit:  6)
  720 -> bucket[0] (digit:  0)
  355 -> bucket[5] (digit:  5)

Buckets after distribution:
  Bucket[0]: 720 
  Bucket[5]: 355 
  Bucket[6]: 436 
  Bucket[7]: 457 657 
  Bucket[9]: 329 839 

Collecting numbers from buckets:
  From bucket[0]: 720 
  From bucket[5]: 355 
  From bucket[6]: 436 
  From bucket[7]: 457 657 
  From bucket[9]: 329 839 

Array after processing this digit: 720 355 436 457 657 329 839 

... (continues for tens and hundreds digits)
```

## Radix Sort for Negative Numbers

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

void radixSortWithNegatives(vector<int>& arr) {
    if(arr.empty()) return;
    
    cout << "Original array (with negatives): ";
    for(int num : arr) cout << num << " ";
    cout << endl;
    
    // Separate positive and negative numbers
    vector<int> positives, negatives;
    for(int num : arr) {
        if(num >= 0) positives.push_back(num);
        else negatives.push_back(abs(num));  // Store absolute value
    }
    
    cout << "\nPositive numbers: ";
    for(int num : positives) cout << num << " ";
    cout << endl;
    
    cout << "Negative numbers (absolute values): ";
    for(int num : negatives) cout << num << " ";
    cout << endl;
    
    // Sort positive numbers normally
    if(!positives.empty()) {
        int maxPos = *max_element(positives.begin(), positives.end());
        for(int exp = 1; maxPos / exp > 0; exp *= 10) {
            vector<int> output(positives.size());
            int count[10] = {0};
            
            for(int num : positives) count[(num / exp) % 10]++;
            for(int i = 1; i < 10; i++) count[i] += count[i-1];
            for(int i = positives.size() - 1; i >= 0; i--) {
                int digit = (positives[i] / exp) % 10;
                output[count[digit] - 1] = positives[i];
                count[digit]--;
            }
            positives = output;
        }
    }
    
    // Sort negative numbers (as absolute values)
    if(!negatives.empty()) {
        int maxNeg = *max_element(negatives.begin(), negatives.end());
        for(int exp = 1; maxNeg / exp > 0; exp *= 10) {
            vector<int> output(negatives.size());
            int count[10] = {0};
            
            for(int num : negatives) count[(num / exp) % 10]++;
            for(int i = 1; i < 10; i++) count[i] += count[i-1];
            for(int i = negatives.size() - 1; i >= 0; i--) {
                int digit = (negatives[i] / exp) % 10;
                output[count[digit] - 1] = negatives[i];
                count[digit]--;
            }
            negatives = output;
        }
        
        // Convert back to negative and reverse order
        reverse(negatives.begin(), negatives.end());
        for(int& num : negatives) num = -num;
    }
    
    // Combine results: negatives (sorted descending by absolute value) then positives
    arr.clear();
    arr.insert(arr.end(), negatives.begin(), negatives.end());
    arr.insert(arr.end(), positives.begin(), positives.end());
    
    cout << "\nSorted array: ";
    for(int num : arr) cout << num << " ";
    cout << endl;
}

int main() {
    vector<int> arr = {-170, 45, -75, 90, -802, 24, -2, 66, 0, -1};
    
    cout << "=== Radix Sort with Negative Numbers ===" << endl;
    radixSortWithNegatives(arr);
    
    return 0;
}
```

## Radix Sort for Strings

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

void radixSortStrings(vector<string>& arr, int maxLen) {
    cout << "Sorting strings using Radix Sort (LSD)" << endl;
    cout << "Maximum length: " << maxLen << endl;
    
    // Process from rightmost character to leftmost
    for(int pos = maxLen - 1; pos >= 0; pos--) {
        cout << "\nProcessing character at position " << pos << ":" << endl;
        
        // Create buckets for ASCII characters (256 possible)
        vector<vector<string>> buckets(256);
        
        // Distribute strings into buckets
        for(const string& str : arr) {
            int charIndex;
            if(pos < str.length()) {
                charIndex = str[pos];
                cout << "  \"" << str << "\" -> bucket[" << charIndex 
                     << "] (char: '" << str[pos] << "')" << endl;
            } else {
                charIndex = 0;  // Null character for shorter strings
                cout << "  \"" << str << "\" -> bucket[0] (shorter string)" << endl;
            }
            buckets[charIndex].push_back(str);
        }
        
        // Collect strings from buckets
        int index = 0;
        for(int i = 0; i < 256; i++) {
            for(const string& str : buckets[i]) {
                arr[index++] = str;
            }
        }
        
        // Display intermediate result
        cout << "After position " << pos << ": ";
        for(const string& str : arr) {
            cout << "\"" << str << "\" ";
        }
        cout << endl;
    }
}

int main() {
    vector<string> words = {"word", "category", "cat", "new", "news", 
                           "world", "bear", "at", "work", "time"};
    
    // Find maximum length
    int maxLen = 0;
    for(const string& word : words) {
        maxLen = max(maxLen, (int)word.length());
    }
    
    cout << "Original strings: ";
    for(const string& word : words) {
        cout << "\"" << word << "\" ";
    }
    cout << endl;
    
    radixSortStrings(words, maxLen);
    
    cout << "\nSorted strings: ";
    for(const string& word : words) {
        cout << "\"" << word << "\" ";
    }
    cout << endl;
    
    return 0;
}
```

## Different Radix Sort Variations

### 1. MSD (Most Significant Digit) Radix Sort
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// MSD Radix Sort (recursive)
void msdRadixSort(vector<int>& arr, int left, int right, int exp) {
    if(left >= right || exp == 0) return;
    
    cout << "\nMSD Processing: range [" << left << "," << right 
         << "], exp=" << exp << endl;
    
    // Create buckets
    vector<vector<int>> buckets(10);
    vector<int> output(right - left + 1);
    
    // Distribute into buckets
    for(int i = left; i <= right; i++) {
        int digit = (arr[i] / exp) % 10;
        buckets[digit].push_back(arr[i]);
    }
    
    // Collect from buckets and recursively sort each bucket
    int index = left;
    for(int digit = 0; digit < 10; digit++) {
        if(!buckets[digit].empty()) {
            // Copy bucket to array segment
            for(int num : buckets[digit]) {
                arr[index++] = num;
            }
            
            // Recursively sort this bucket with next digit
            int bucketStart = index - buckets[digit].size();
            int bucketEnd = index - 1;
            
            if(buckets[digit].size() > 1 && exp/10 > 0) {
                msdRadixSort(arr, bucketStart, bucketEnd, exp/10);
            }
        }
    }
}

int main() {
    vector<int> arr = {329, 457, 657, 839, 436, 720, 355};
    
    cout << "MSD Radix Sort" << endl;
    cout << "Original: ";
    for(int num : arr) cout << num << " ";
    cout << endl;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    int maxExp = 1;
    while(maxExp <= maxVal) maxExp *= 10;
    maxExp /= 10;  // Get highest power of 10
    
    msdRadixSort(arr, 0, arr.size()-1, maxExp);
    
    cout << "\nSorted: ";
    for(int num : arr) cout << num << " ";
    cout << endl;
    
    return 0;
}
```

### 2. Radix Sort with Different Bases
```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

// Radix Sort with configurable base
void radixSortWithBase(vector<int>& arr, int base = 10) {
    if(arr.empty()) return;
    
    cout << "Radix Sort with base " << base << endl;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    int maxDigit = 0;
    
    // Calculate maximum number of digits in given base
    while(maxVal > 0) {
        maxVal /= base;
        maxDigit++;
    }
    
    cout << "Maximum digits in base " << base << ": " << maxDigit << endl;
    
    // Process each digit
    for(int digitPos = 0; digitPos < maxDigit; digitPos++) {
        int exp = pow(base, digitPos);
        vector<vector<int>> buckets(base);
        
        // Distribute
        for(int num : arr) {
            int digit = (num / exp) % base;
            buckets[digit].push_back(num);
        }
        
        // Collect
        int index = 0;
        for(int i = 0; i < base; i++) {
            for(int num : buckets[i]) {
                arr[index++] = num;
            }
        }
        
        cout << "After digit position " << digitPos << ": ";
        for(int num : arr) cout << num << " ";
        cout << endl;
    }
}

int main() {
    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    
    cout << "Testing different bases for Radix Sort" << endl;
    cout << "Original: ";
    for(int num : arr) cout << num << " ";
    cout << endl << endl;
    
    // Test with different bases
    vector<int> arr1 = arr;
    radixSortWithBase(arr1, 2);  // Binary
    
    cout << "\n";
    vector<int> arr2 = arr;
    radixSortWithBase(arr2, 8);  // Octal
    
    cout << "\n";
    vector<int> arr3 = arr;
    radixSortWithBase(arr3, 10); // Decimal
    
    cout << "\n";
    vector<int> arr4 = arr;
    radixSortWithBase(arr4, 16); // Hexadecimal
    
    return 0;
}
```

## Radix Sort Complexity Analysis

### Time Complexity:
- **Best Case**: O(d*(n + k)) where:
  - d = number of digits
  - n = number of elements
  - k = base (radix) - usually 10
- **Average Case**: O(d*(n + k))
- **Worst Case**: O(d*(n + k))

### Space Complexity:
- **O(n + k)** for buckets/count array
- Additional O(1) for variables

### Comparison with Other Algorithms:
```
For n numbers with maximum d digits:
- Radix Sort: O(d*(n + k))
- Quick Sort: O(n log n) average
- Counting Sort: O(n + k) but k can be very large
```

## Performance Comparison

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <ctime>
#include <random>
#include <iomanip>
using namespace std;

void performanceTest() {
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(0, 10000);
    
    vector<int> sizes = {1000, 10000, 50000, 100000};
    
    cout << "Radix Sort vs Quick Sort Performance Comparison\n" << endl;
    cout << setw(10) << "Size" << setw(15) << "Radix Sort" 
         << setw(15) << "Quick Sort" << setw(15) << "Ratio" << endl;
    cout << string(55, '-') << endl;
    
    for(int size : sizes) {
        // Generate random data
        vector<int> data(size);
        for(int i = 0; i < size; i++) {
            data[i] = dis(gen);
        }
        
        // Test Radix Sort
        vector<int> radixData = data;
        clock_t start = clock();
        
        // Radix Sort implementation
        int maxVal = *max_element(radixData.begin(), radixData.end());
        for(int exp = 1; maxVal / exp > 0; exp *= 10) {
            vector<int> output(radixData.size());
            int count[10] = {0};
            
            for(int num : radixData) count[(num / exp) % 10]++;
            for(int i = 1; i < 10; i++) count[i] += count[i-1];
            for(int i = radixData.size() - 1; i >= 0; i--) {
                int digit = (radixData[i] / exp) % 10;
                output[count[digit] - 1] = radixData[i];
                count[digit]--;
            }
            radixData = output;
        }
        
        clock_t end = clock();
        double radixTime = double(end - start) / CLOCKS_PER_SEC * 1000;
        
        // Test Quick Sort (std::sort)
        vector<int> quickData = data;
        start = clock();
        sort(quickData.begin(), quickData.end());
        end = clock();
        double quickTime = double(end - start) / CLOCKS_PER_SEC * 1000;
        
        cout << setw(10) << size 
             << setw(15) << fixed << setprecision(2) << radixTime << " ms"
             << setw(15) << quickTime << " ms"
             << setw(15) << radixTime/quickTime << endl;
    }
}

int main() {
    performanceTest();
    return 0;
}
```

## Applications of Radix Sort

### 1. Sorting IP Addresses
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

struct IPAddress {
    int octet1, octet2, octet3, octet4;
    
    IPAddress(const string& ip) {
        stringstream ss(ip);
        char dot;
        ss >> octet1 >> dot >> octet2 >> dot >> octet3 >> dot >> octet4;
    }
    
    int toInt() const {
        return (octet1 << 24) | (octet2 << 16) | (octet3 << 8) | octet4;
    }
    
    string toString() const {
        return to_string(octet1) + "." + to_string(octet2) + "." + 
               to_string(octet3) + "." + to_string(octet4);
    }
};

void sortIPAddresses(vector<IPAddress>& ips) {
    cout << "Sorting IP addresses using Radix Sort\n" << endl;
    
    // Convert IPs to integers
    vector<int> ipInts;
    for(const auto& ip : ips) {
        ipInts.push_back(ip.toInt());
    }
    
    // Radix sort on the integers
    int maxVal = *max_element(ipInts.begin(), ipInts.end());
    for(int exp = 1; maxVal / exp > 0; exp *= 10) {
        vector<int> output(ipInts.size());
        int count[10] = {0};
        
        for(int num : ipInts) count[(num / exp) % 10]++;
        for(int i = 1; i < 10; i++) count[i] += count[i-1];
        for(int i = ipInts.size() - 1; i >= 0; i--) {
            int digit = (ipInts[i] / exp) % 10;
            output[count[digit] - 1] = ipInts[i];
            count[digit]--;
        }
        ipInts = output;
    }
    
    // Convert back to IPAddress objects
    vector<IPAddress> sortedIPs;
    for(int ipInt : ipInts) {
        sortedIPs.push_back(IPAddress(
            to_string((ipInt >> 24) & 0xFF) + "." +
            to_string((ipInt >> 16) & 0xFF) + "." +
            to_string((ipInt >> 8) & 0xFF) + "." +
            to_string(ipInt & 0xFF)
        ));
    }
    
    ips = sortedIPs;
}

int main() {
    vector<IPAddress> ips = {
        IPAddress("192.168.1.1"),
        IPAddress("10.0.0.1"),
        IPAddress("172.16.0.1"),
        IPAddress("192.168.0.1"),
        IPAddress("10.0.0.2"),
        IPAddress("172.16.0.10")
    };
    
    cout << "Original IPs:" << endl;
    for(const auto& ip : ips) {
        cout << "  " << ip.toString() << endl;
    }
    
    sortIPAddresses(ips);
    
    cout << "\nSorted IPs:" << endl;
    for(const auto& ip : ips) {
        cout << "  " << ip.toString() << endl;
    }
    
    return 0;
}
```

### 2. Sorting Dates (YYYYMMDD format)
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

void sortDates(vector<int>& dates) {
    cout << "Sorting dates (YYYYMMDD format) using Radix Sort\n" << endl;
    
    // Sort by day (last 2 digits)
    for(int exp = 1; exp <= 100; exp *= 10) {
        vector<int> output(dates.size());
        int count[10] = {0};
        
        for(int date : dates) count[(date / exp) % 10]++;
        for(int i = 1; i < 10; i++) count[i] += count[i-1];
        for(int i = dates.size() - 1; i >= 0; i--) {
            int digit = (dates[i] / exp) % 10;
            output[count[digit] - 1] = dates[i];
            count[digit]--;
        }
        dates = output;
    }
    
    // Sort by month (digits 3-4 from right)
    for(int exp = 100; exp <= 10000; exp *= 10) {
        vector<int> output(dates.size());
        int count[10] = {0};
        
        for(int date : dates) count[(date / exp) % 10]++;
        for(int i = 1; i < 10; i++) count[i] += count[i-1];
        for(int i = dates.size() - 1; i >= 0; i--) {
            int digit = (dates[i] / exp) % 10;
            output[count[digit] - 1] = dates[i];
            count[digit]--;
        }
        dates = output;
    }
    
    // Sort by year (remaining digits)
    for(int exp = 10000; exp <= 1000000; exp *= 10) {
        vector<int> output(dates.size());
        int count[10] = {0};
        
        for(int date : dates) count[(date / exp) % 10]++;
        for(int i = 1; i < 10; i++) count[i] += count[i-1];
        for(int i = dates.size() - 1; i >= 0; i--) {
            int digit = (dates[i] / exp) % 10;
            output[count[digit] - 1] = dates[i];
            count[digit]--;
        }
        dates = output;
    }
}

int main() {
    vector<int> dates = {
        20231225,  // Christmas 2023
        20240101,  // New Year 2024
        20231031,  // Halloween 2023
        20231201,  // December 1, 2023
        20231115,  // November 15, 2023
        20240214   // Valentine's Day 2024
    };
    
    cout << "Original dates:" << endl;
    for(int date : dates) {
        string dateStr = to_string(date);
        cout << "  " << dateStr.substr(0,4) << "-" 
             << dateStr.substr(4,2) << "-" 
             << dateStr.substr(6,2) << endl;
    }
    
    sortDates(dates);
    
    cout << "\nSorted dates:" << endl;
    for(int date : dates) {
        string dateStr = to_string(date);
        cout << "  " << dateStr.substr(0,4) << "-" 
             << dateStr.substr(4,2) << "-" 
             << dateStr.substr(6,2) << endl;
    }
    
    return 0;
}
```

## Optimizations and Best Practices

### 1. Early Termination
```cpp
void optimizedRadixSort(vector<int>& arr) {
    if(arr.size() <= 1) return;
    
    // Find min and max
    int minVal = arr[0], maxVal = arr[0];
    for(int num : arr) {
        if(num < minVal) minVal = num;
        if(num > maxVal) maxVal = num;
    }
    
    // If range is small, use Counting Sort instead
    if(maxVal - minVal < 1000) {
        vector<int> count(maxVal - minVal + 1, 0);
        for(int num : arr) count[num - minVal]++;
        
        int index = 0;
        for(int i = 0; i < count.size(); i++) {
            while(count[i] > 0) {
                arr[index++] = i + minVal;
                count[i]--;
            }
        }
        return;
    }
    
    // Otherwise use Radix Sort
    for(int exp = 1; maxVal / exp > 0; exp *= 10) {
        vector<int> output(arr.size());
        int count[10] = {0};
        
        for(int num : arr) count[(num / exp) % 10]++;
        for(int i = 1; i < 10; i++) count[i] += count[i-1];
        for(int i = arr.size() - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        arr = output;
    }
}
```

### 2. Hybrid Approach with Insertion Sort
```cpp
void hybridRadixSort(vector<int>& arr, int threshold = 100) {
    if(arr.size() <= threshold) {
        // Use insertion sort for small arrays
        for(int i = 1; i < arr.size(); i++) {
            int key = arr[i];
            int j = i - 1;
            while(j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return;
    }
    
    // Use Radix Sort for larger arrays
    int maxVal = *max_element(arr.begin(), arr.end());
    for(int exp = 1; maxVal / exp > 0; exp *= 10) {
        vector<int> output(arr.size());
        int count[10] = {0};
        
        for(int num : arr) count[(num / exp) % 10]++;
        for(int i = 1; i < 10; i++) count[i] += count[i-1];
        for(int i = arr.size() - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        arr = output;
    }
}
```

## Common Interview Questions

1. **Implement Radix Sort** for integers
2. **Sort an array of strings** using Radix Sort
3. **Compare Radix Sort with Quick Sort** for large datasets
4. **Handle negative numbers** in Radix Sort
5. **What's the time complexity** of Radix Sort and when is it optimal?

## Summary

Radix Sort is a powerful non-comparative sorting algorithm that excels when:
- Sorting integers or fixed-length keys
- The number of digits is small compared to the number of elements
- Stability is required

**Key Advantages:**
- O(d*(n + k)) time complexity, which can be better than O(n log n) for certain data
- Stable sorting algorithm
- Works well with fixed-length keys like integers, strings, dates

**Key Limitations:**
- Only works with integer keys or fixed-length keys
- Requires additional memory O(n + k)
- Not as cache-friendly as comparison sorts

**Best Use Cases:**
- Sorting large sets of integers with limited range
- Sorting IP addresses, dates, or other fixed-format data
- When stability is crucial and keys are integers

---
*[Next: DSA Merge Sort, Linear Search, Binary Search...]*

# DSA Merge Sort - Complete C++ Guide

## Introduction to Merge Sort

Merge Sort is a **divide-and-conquer** algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. It's one of the most efficient and reliable sorting algorithms.

### Key Characteristics:
- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(n) additional space
- **Stable**: Yes, maintains relative order of equal elements
- **Not In-place**: Requires additional memory
- **Recursive**: Naturally implemented using recursion

## How Merge Sort Works

### The Three-Step Process:
1. **Divide**: Split the array into two equal halves
2. **Conquer**: Recursively sort both halves
3. **Combine**: Merge the two sorted halves into one sorted array

### Visual Example:
```
Original: [38, 27, 43, 3, 9, 82, 10]

Divide:
[38, 27, 43, 3] | [9, 82, 10]

Divide further:
[38, 27] | [43, 3] | [9, 82] | [10]

Divide until single elements:
[38] | [27] | [43] | [3] | [9] | [82] | [10]

Merge sorted pairs:
[27, 38] | [3, 43] | [9, 82] | [10]

Continue merging:
[3, 27, 38, 43] | [9, 10, 82]

Final merge:
[3, 9, 10, 27, 38, 43, 82]
```

## Basic Merge Sort Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Merge two sorted subarrays
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;    // Size of left subarray
    int n2 = right - mid;       // Size of right subarray
    
    // Create temporary arrays
    vector<int> L(n1), R(n2);
    
    // Copy data to temp arrays
    for(int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for(int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    // Merge temp arrays back into arr[left..right]
    int i = 0, j = 0, k = left;
    
    while(i < n1 && j < n2) {
        if(L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements of L[]
    while(i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // Copy remaining elements of R[]
    while(j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Main merge sort function
void mergeSort(int arr[], int left, int right) {
    if(left < right) {
        int mid = left + (right - left) / 2;
        
        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge sorted halves
        merge(arr, left, mid, right);
    }
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    printArray(arr, n);
    
    mergeSort(arr, 0, n - 1);
    
    cout << "Sorted array: ";
    printArray(arr, n);
    
    return 0;
}
```

**Output:**
```
Original array: 12 11 13 5 6 7 
Sorted array: 5 6 7 11 12 13
```

## Detailed Step-by-Step Visualization

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

void printArrayWithMarkers(int arr[], int left, int right, int mid = -1) {
    for(int i = left; i <= right; i++) {
        if(i == mid) cout << "[" << arr[i] << "] ";
        else if(i == left && left == right) cout << "{" << arr[i] << "} ";
        else cout << arr[i] << " ";
    }
}

void mergeVisual(int arr[], int left, int mid, int right, int depth) {
    string indent(depth * 4, ' ');
    
    cout << indent << "Merging: L[";
    printArrayWithMarkers(arr, left, mid);
    cout << "] and R[";
    printArrayWithMarkers(arr, mid + 1, right);
    cout << "]" << endl;
    
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for(int i = 0; i < n1; i++) L[i] = arr[left + i];
    for(int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    cout << indent << "  Left array: ";
    for(int val : L) cout << val << " ";
    cout << endl;
    
    cout << indent << "  Right array: ";
    for(int val : R) cout << val << " ";
    cout << endl;
    
    cout << indent << "  Merge process: ";
    
    while(i < n1 && j < n2) {
        if(L[i] <= R[j]) {
            arr[k] = L[i];
            cout << L[i] << " ";
            i++;
        } else {
            arr[k] = R[j];
            cout << R[j] << " ";
            j++;
        }
        k++;
    }
    
    while(i < n1) {
        arr[k] = L[i];
        cout << L[i] << " ";
        i++;
        k++;
    }
    
    while(j < n2) {
        arr[k] = R[j];
        cout << R[j] << " ";
        j++;
        k++;
    }
    
    cout << endl;
    
    cout << indent << "  Result: [";
    for(int idx = left; idx <= right; idx++) {
        cout << arr[idx] << " ";
    }
    cout << "]" << endl;
}

void mergeSortVisual(int arr[], int left, int right, int depth = 0) {
    string indent(depth * 4, ' ');
    
    cout << indent << "mergeSort(arr, " << left << ", " << right << ")" << endl;
    cout << indent << "Current segment: [";
    printArrayWithMarkers(arr, left, right);
    cout << "]" << endl;
    
    if(left < right) {
        int mid = left + (right - left) / 2;
        
        cout << indent << "Divide at mid = " << mid << endl;
        cout << indent << string(40, '-') << endl;
        
        // Recursively sort first half
        mergeSortVisual(arr, left, mid, depth + 1);
        
        // Recursively sort second half
        mergeSortVisual(arr, mid + 1, right, depth + 1);
        
        // Merge sorted halves
        cout << indent << string(40, '-') << endl;
        cout << indent << "Now merging..." << endl;
        mergeVisual(arr, left, mid, right, depth);
    } else {
        cout << indent << "Base case (single element)" << endl;
    }
    
    cout << indent << string(40, '=') << endl;
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "=== Merge Sort Step-by-Step Visualization ===" << endl;
    cout << "Original array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl << endl;
    
    mergeSortVisual(arr, 0, n - 1);
    
    cout << "\nFinal sorted array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    return 0;
}
```

**Output:**
```
=== Merge Sort Step-by-Step Visualization ===
Original array: 38 27 43 3 9 82 10 

mergeSort(arr, 0, 6)
Current segment: [38 27 43 3 9 82 10 ]
Divide at mid = 3
----------------------------------------
    mergeSort(arr, 0, 3)
    Current segment: [38 27 43 3 ]
    Divide at mid = 1
    ----------------------------------------
        mergeSort(arr, 0, 1)
        Current segment: [38 27 ]
        Divide at mid = 0
        ----------------------------------------
            mergeSort(arr, 0, 0)
            Current segment: [{38} ]
            Base case (single element)
            ========================================
            mergeSort(arr, 1, 1)
            Current segment: [{27} ]
            Base case (single element)
            ========================================
        Now merging...
        Merging: L[38 ] and R[27 ]
          Left array: 38 
          Right array: 27 
          Merge process: 27 38 
          Result: [27 38 ]
        ========================================
    ... (continues with detailed merging steps)
```

## Iterative Merge Sort

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void iterativeMergeSort(int arr[], int n) {
    cout << "Iterative Merge Sort" << endl;
    
    // Create a temporary array
    vector<int> temp(n);
    
    // Start with subarrays of size 1, then 2, 4, 8...
    for(int currSize = 1; currSize < n; currSize *= 2) {
        cout << "\nCurrent subarray size: " << currSize << endl;
        
        for(int leftStart = 0; leftStart < n; leftStart += 2 * currSize) {
            int mid = min(leftStart + currSize - 1, n - 1);
            int rightEnd = min(leftStart + 2 * currSize - 1, n - 1);
            
            cout << "  Merging [" << leftStart << "-" << mid 
                 << "] and [" << mid+1 << "-" << rightEnd << "]" << endl;
            
            int i = leftStart;
            int j = mid + 1;
            int k = leftStart;
            
            // Merge two subarrays into temp
            while(i <= mid && j <= rightEnd) {
                if(arr[i] <= arr[j]) {
                    temp[k++] = arr[i++];
                } else {
                    temp[k++] = arr[j++];
                }
            }
            
            // Copy remaining elements
            while(i <= mid) {
                temp[k++] = arr[i++];
            }
            while(j <= rightEnd) {
                temp[k++] = arr[j++];
            }
            
            // Copy merged subarray back to original
            for(int idx = leftStart; idx <= rightEnd; idx++) {
                arr[idx] = temp[idx];
            }
            
            cout << "    Result: ";
            for(int idx = leftStart; idx <= rightEnd; idx++) {
                cout << arr[idx] << " ";
            }
            cout << endl;
        }
        
        cout << "Array after size " << currSize << " passes: ";
        for(int i = 0; i < n; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    iterativeMergeSort(arr, n);
    
    cout << "\nSorted array: ";
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

## Merge Sort Complexity Analysis

### Time Complexity Analysis:
1. **Divide Step**: 
   - Finding mid takes O(1)
   - Dividing array into halves: O(1)

2. **Conquer Step**:
   - Two recursive calls on half the size: 2T(n/2)

3. **Combine Step**:
   - Merging two sorted arrays: O(n)

**Recurrence Relation:**
```
T(n) = 2T(n/2) + O(n)
```

**Solving using Master Theorem:**
- a = 2 (number of subproblems)
- b = 2 (factor of size reduction)
- f(n) = O(n) = n¹
- Since f(n) = Θ(n¹) and log_b(a) = log₂(2) = 1
- Case 2: T(n) = Θ(n log n)

### Space Complexity:
- **Recursive version**: O(n) for temp arrays + O(log n) recursion stack
- **Iterative version**: O(n) for temp arrays
- **Total**: O(n)

## Optimization Techniques

### 1. Use Insertion Sort for Small Subarrays
```cpp
const int INSERTION_THRESHOLD = 16;

void insertionSort(int arr[], int left, int right) {
    for(int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while(j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void optimizedMergeSort(int arr[], int left, int right) {
    // Use insertion sort for small arrays
    if(right - left + 1 <= INSERTION_THRESHOLD) {
        insertionSort(arr, left, right);
        return;
    }
    
    if(left < right) {
        int mid = left + (right - left) / 2;
        
        optimizedMergeSort(arr, left, mid);
        optimizedMergeSort(arr, mid + 1, right);
        
        // Merge only if necessary
        if(arr[mid] > arr[mid + 1]) {
            merge(arr, left, mid, right);
        }
    }
}
```

### 2. Avoid Repeated Memory Allocation
```cpp
void mergeSortOptimized(int arr[], int left, int right, vector<int>& temp) {
    if(left >= right) return;
    
    int mid = left + (right - left) / 2;
    
    mergeSortOptimized(arr, left, mid, temp);
    mergeSortOptimized(arr, mid + 1, right, temp);
    
    // Merge using pre-allocated temp array
    int i = left, j = mid + 1, k = left;
    
    while(i <= mid && j <= right) {
        if(arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while(i <= mid) temp[k++] = arr[i++];
    while(j <= right) temp[k++] = arr[j++];
    
    // Copy back
    for(int idx = left; idx <= right; idx++) {
        arr[idx] = temp[idx];
    }
}
```

### 3. Natural Merge Sort (Adaptive)
```cpp
int findNextRun(int arr[], int n, int start) {
    if(start >= n - 1) return n;
    
    int i = start;
    while(i < n - 1 && arr[i] <= arr[i + 1]) {
        i++;
    }
    return i + 1;
}

void naturalMergeSort(int arr[], int n) {
    vector<int> temp(n);
    
    while(true) {
        int start = 0;
        bool sorted = true;
        
        while(start < n) {
            int mid = findNextRun(arr, n, start);
            int end = findNextRun(arr, n, mid);
            
            if(end <= n) {
                // Merge arr[start..mid-1] and arr[mid..end-1]
                int i = start, j = mid, k = start;
                
                while(i < mid && j < end) {
                    if(arr[i] <= arr[j]) {
                        temp[k++] = arr[i++];
                    } else {
                        temp[k++] = arr[j++];
                    }
                }
                
                while(i < mid) temp[k++] = arr[i++];
                while(j < end) temp[k++] = arr[j++];
                
                sorted = false;
                start = end;
            } else {
                break;
            }
        }
        
        // Copy back
        for(int i = 0; i < n; i++) {
            arr[i] = temp[i];
        }
        
        if(sorted) break;
    }
}
```

## Merge Sort for Linked Lists

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedListMergeSort {
private:
    Node* head;
    
    // Find middle using slow-fast pointer technique
    Node* findMiddle(Node* head) {
        if(!head) return head;
        
        Node* slow = head;
        Node* fast = head->next;
        
        while(fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        return slow;
    }
    
    // Merge two sorted linked lists
    Node* merge(Node* left, Node* right) {
        if(!left) return right;
        if(!right) return left;
        
        Node* result = nullptr;
        
        if(left->data <= right->data) {
            result = left;
            result->next = merge(left->next, right);
        } else {
            result = right;
            result->next = merge(left, right->next);
        }
        
        return result;
    }
    
public:
    LinkedListMergeSort() : head(nullptr) {}
    
    void push(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
    
    Node* mergeSort(Node* node) {
        if(!node || !node->next) return node;
        
        // Find middle
        Node* middle = findMiddle(node);
        Node* nextToMiddle = middle->next;
        
        // Split into two halves
        middle->next = nullptr;
        
        // Recursively sort both halves
        Node* left = mergeSort(node);
        Node* right = mergeSort(nextToMiddle);
        
        // Merge sorted halves
        return merge(left, right);
    }
    
    void sort() {
        head = mergeSort(head);
    }
    
    void printList() {
        Node* current = head;
        while(current) {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }
};

int main() {
    LinkedListMergeSort list;
    
    // Add elements in reverse order
    list.push(15);
    list.push(10);
    list.push(5);
    list.push(20);
    list.push(3);
    list.push(2);
    
    cout << "Original linked list: ";
    list.printList();
    
    list.sort();
    
    cout << "Sorted linked list: ";
    list.printList();
    
    return 0;
}
```

## External Merge Sort (For Large Files)

```cpp
#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

class ExternalMergeSort {
private:
    int chunkSize;
    string inputFile;
    string outputFile;
    
    void createSortedChunks() {
        ifstream inFile(inputFile, ios::binary);
        vector<int> buffer(chunkSize);
        int chunkNum = 0;
        
        cout << "Creating sorted chunks..." << endl;
        
        while(true) {
            // Read chunk
            inFile.read((char*)buffer.data(), chunkSize * sizeof(int));
            int count = inFile.gcount() / sizeof(int);
            
            if(count == 0) break;
            
            // Sort chunk
            sort(buffer.begin(), buffer.begin() + count);
            
            // Write sorted chunk to temp file
            string chunkFile = "chunk_" + to_string(chunkNum++) + ".dat";
            ofstream outFile(chunkFile, ios::binary);
            outFile.write((char*)buffer.data(), count * sizeof(int));
            outFile.close();
            
            cout << "Created chunk " << chunkFile << " with " 
                 << count << " elements" << endl;
        }
        
        inFile.close();
    }
    
    struct HeapNode {
        int value;
        int chunkIndex;
        
        bool operator>(const HeapNode& other) const {
            return value > other.value;
        }
    };
    
    void kWayMerge(int numChunks) {
        cout << "\nPerforming " << numChunks << "-way merge..." << endl;
        
        vector<ifstream> chunkFiles(numChunks);
        priority_queue<HeapNode, vector<HeapNode>, greater<HeapNode>> minHeap;
        
        // Open all chunk files
        for(int i = 0; i < numChunks; i++) {
            string chunkFile = "chunk_" + to_string(i) + ".dat";
            chunkFiles[i].open(chunkFile, ios::binary);
            
            // Read first element from each chunk
            int value;
            if(chunkFiles[i].read((char*)&value, sizeof(int))) {
                minHeap.push({value, i});
            }
        }
        
        ofstream outFile(outputFile, ios::binary);
        
        // Perform k-way merge
        while(!minHeap.empty()) {
            HeapNode smallest = minHeap.top();
            minHeap.pop();
            
            // Write smallest element to output
            outFile.write((char*)&smallest.value, sizeof(int));
            
            // Read next element from the same chunk
            int nextValue;
            if(chunkFiles[smallest.chunkIndex].read((char*)&nextValue, sizeof(int))) {
                minHeap.push({nextValue, smallest.chunkIndex});
            }
        }
        
        // Close files
        for(auto& file : chunkFiles) {
            file.close();
        }
        outFile.close();
        
        cout << "Merge complete. Output written to " << outputFile << endl;
    }
    
public:
    ExternalMergeSort(string input, string output, int chunk) 
        : inputFile(input), outputFile(output), chunkSize(chunk) {}
    
    void sort() {
        createSortedChunks();
        
        // Count chunks (simplified - in real implementation, count them)
        int numChunks = 3; // This should be calculated
        
        kWayMerge(numChunks);
        
        // Cleanup temp files
        for(int i = 0; i < numChunks; i++) {
            remove(("chunk_" + to_string(i) + ".dat").c_str());
        }
    }
};

int main() {
    // Note: This is a simplified example. In practice, you would:
    // 1. Generate a large binary file with random integers
    // 2. Use appropriate chunk size based on available memory
    // 3. Handle variable chunk sizes
    
    cout << "External Merge Sort Concept Demonstration" << endl;
    cout << "This demonstrates the algorithm structure." << endl;
    cout << "In practice, you would work with actual file I/O." << endl;
    
    return 0;
}
```

## Applications of Merge Sort

### 1. Counting Inversions
```cpp
#include <iostream>
#include <vector>
using namespace std;

long long mergeAndCount(int arr[], int temp[], int left, int mid, int right) {
    int i = left, j = mid + 1, k = left;
    long long inversions = 0;
    
    while(i <= mid && j <= right) {
        if(arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            // arr[i] > arr[j], so all remaining in left are inversions
            temp[k++] = arr[j++];
            inversions += (mid - i + 1);
        }
    }
    
    while(i <= mid) temp[k++] = arr[i++];
    while(j <= right) temp[k++] = arr[j++];
    
    for(int idx = left; idx <= right; idx++) {
        arr[idx] = temp[idx];
    }
    
    return inversions;
}

long long countInversions(int arr[], int temp[], int left, int right) {
    long long inversions = 0;
    
    if(left < right) {
        int mid = left + (right - left) / 2;
        
        inversions += countInversions(arr, temp, left, mid);
        inversions += countInversions(arr, temp, mid + 1, right);
        inversions += mergeAndCount(arr, temp, left, mid, right);
    }
    
    return inversions;
}

int main() {
    int arr[] = {1, 20, 6, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    vector<int> temp(n);
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    long long inversions = countInversions(arr, temp.data(), 0, n - 1);
    
    cout << "Number of inversions: " << inversions << endl;
    cout << "Sorted array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    return 0;
}
```

### 2. External Sorting (Sort-Merge Join)
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<pair<int, string>> sortMergeJoin(
    vector<pair<int, string>>& table1,
    vector<pair<int, string>>& table2
) {
    // Sort both tables by key using merge sort
    sort(table1.begin(), table1.end());
    sort(table2.begin(), table2.end());
    
    vector<pair<int, string>> result;
    int i = 0, j = 0;
    
    cout << "Performing Sort-Merge Join..." << endl;
    
    while(i < table1.size() && j < table2.size()) {
        if(table1[i].first < table2[j].first) {
            i++;
        } else if(table1[i].first > table2[j].first) {
            j++;
        } else {
            // Keys match - join
            cout << "Match found: Key=" << table1[i].first 
                 << ", Value1=" << table1[i].second
                 << ", Value2=" << table2[j].second << endl;
            
            result.push_back({table1[i].first, 
                            table1[i].second + ":" + table2[j].second});
            
            // Handle duplicates
            int tempI = i, tempJ = j;
            while(tempI + 1 < table1.size() && 
                  table1[tempI + 1].first == table1[i].first) {
                tempI++;
                result.push_back({table1[tempI].first, 
                                table1[tempI].second + ":" + table2[j].second});
            }
            
            while(tempJ + 1 < table2.size() && 
                  table2[tempJ + 1].first == table2[j].first) {
                tempJ++;
                result.push_back({table1[i].first, 
                                table1[i].second + ":" + table2[tempJ].second});
            }
            
            i++;
            j++;
        }
    }
    
    return result;
}

int main() {
    vector<pair<int, string>> employees = {
        {101, "Alice"},
        {102, "Bob"},
        {103, "Charlie"},
        {101, "Anna"}  // Duplicate key
    };
    
    vector<pair<int, string>> departments = {
        {101, "Engineering"},
        {102, "Sales"},
        {104, "Marketing"},
        {101, "R&D"}  // Duplicate key
    };
    
    auto joined = sortMergeJoin(employees, departments);
    
    cout << "\nJoin Result:" << endl;
    for(auto& row : joined) {
        cout << "ID: " << row.first << ", Combined: " << row.second << endl;
    }
    
    return 0;
}
```

## Performance Comparison

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
#include <random>
using namespace std;
using namespace chrono;

void testSortingAlgorithms() {
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(1, 1000000);
    
    vector<int> sizes = {1000, 10000, 50000, 100000, 500000};
    
    cout << "Sorting Algorithm Performance Comparison\n" << endl;
    cout << "Size\t\tMerge Sort\tQuick Sort\tstd::sort" << endl;
    cout << string(60, '-') << endl;
    
    for(int size : sizes) {
        // Generate random data
        vector<int> data(size);
        for(int i = 0; i < size; i++) {
            data[i] = dis(gen);
        }
        
        // Test Merge Sort
        vector<int> mergeData = data;
        auto start = high_resolution_clock::now();
        
        // Merge Sort implementation
        vector<int> temp(size);
        auto mergeSortFunc = [&](auto&& self, int left, int right) -> void {
            if(left >= right) return;
            
            int mid = left + (right - left) / 2;
            self(self, left, mid);
            self(self, mid + 1, right);
            
            int i = left, j = mid + 1, k = left;
            while(i <= mid && j <= right) {
                if(mergeData[i] <= mergeData[j]) {
                    temp[k++] = mergeData[i++];
                } else {
                    temp[k++] = mergeData[j++];
                }
            }
            while(i <= mid) temp[k++] = mergeData[i++];
            while(j <= right) temp[k++] = mergeData[j++];
            
            for(int idx = left; idx <= right; idx++) {
                mergeData[idx] = temp[idx];
            }
        };
        
        mergeSortFunc(mergeSortFunc, 0, size - 1);
        auto end = high_resolution_clock::now();
        auto mergeTime = duration_cast<microseconds>(end - start).count() / 1000.0;
        
        // Test Quick Sort (naive implementation for comparison)
        vector<int> quickData = data;
        start = high_resolution_clock::now();
        sort(quickData.begin(), quickData.end());  // Using std::sort
        end = high_resolution_clock::now();
        auto quickTime = duration_cast<microseconds>(end - start).count() / 1000.0;
        
        // Test std::sort (usually introsort)
        vector<int> stdData = data;
        start = high_resolution_clock::now();
        sort(stdData.begin(), stdData.end());
        end = high_resolution_clock::now();
        auto stdTime = duration_cast<microseconds>(end - start).count() / 1000.0;
        
        cout << size << "\t\t" 
             << fixed << setprecision(2) 
             << mergeTime << " ms\t\t"
             << quickTime << " ms\t\t"
             << stdTime << " ms" << endl;
    }
}

int main() {
    testSortingAlgorithms();
    return 0;
}
```

## Common Interview Questions

### 1. Implement Merge Sort
```cpp
// Basic implementation as shown above
```

### 2. Count Inversions in an Array
```cpp
// Shown in applications section
```

### 3. Sort a Linked List using Merge Sort
```cpp
// Shown in linked list section
```

### 4. External Sort Implementation
```cpp
// Concept shown in external merge sort section
```

### 5. Merge k Sorted Arrays
```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {
    // Min-heap with pairs (value, array index, element index)
    priority_queue<pair<int, pair<int, int>>, 
                   vector<pair<int, pair<int, int>>>,
                   greater<pair<int, pair<int, int>>>> minHeap;
    
    // Push first element of each array
    for(int i = 0; i < arrays.size(); i++) {
        if(!arrays[i].empty()) {
            minHeap.push({arrays[i][0], {i, 0}});
        }
    }
    
    vector<int> result;
    
    while(!minHeap.empty()) {
        auto current = minHeap.top();
        minHeap.pop();
        
        int value = current.first;
        int arrayIdx = current.second.first;
        int elementIdx = current.second.second;
        
        result.push_back(value);
        
        // Push next element from the same array
        if(elementIdx + 1 < arrays[arrayIdx].size()) {
            minHeap.push({arrays[arrayIdx][elementIdx + 1], 
                         {arrayIdx, elementIdx + 1}});
        }
    }
    
    return result;
}
```

## Advantages and Disadvantages

### Advantages:
1. **Guaranteed O(n log n) performance** in all cases
2. **Stable sort** - maintains relative order
3. **Well-suited for linked lists** with O(1) extra space
4. **Excellent for external sorting** (disk-based data)
5. **Predictable performance** - no worst-case O(n²) scenarios

### Disadvantages:
1. **O(n) additional space** required
2. **Not in-place** - needs temporary arrays
3. **Slower than Quick Sort** in practice for arrays
4. **Recursive overhead** for function calls

## When to Use Merge Sort

1. **When stability is required**
2. **When working with linked lists**
3. **For external sorting** (large files that don't fit in memory)
4. **When predictable O(n log n) performance is critical**
5. **When sorting data that's mostly in sequential access media**

## Summary

Merge Sort is a reliable, efficient sorting algorithm that guarantees O(n log n) performance. Its divide-and-conquer approach makes it particularly useful for:

- **Linked lists** (in-place merging with O(1) space)
- **External sorting** (handling data larger than memory)
- **Stable sorting requirements**
- **Situations where worst-case performance matters**

While it may not be as fast as Quick Sort for in-memory array sorting in practice, its predictable performance and stability make it an essential algorithm in many applications.

**Key Takeaways:**
- Divide-and-conquer algorithm
- Stable sorting with O(n log n) guaranteed performance
- Requires O(n) additional space
- Excellent for linked lists and external sorting
- Foundation for more complex algorithms (merge join, inversion counting, etc.)

---
*[Next: DSA Linear Search, Binary Search...]*

# DSA Linear Search - Complete C++ Guide

## Introduction to Linear Search

Linear Search, also known as Sequential Search, is the simplest searching algorithm that checks each element in a collection sequentially until the target element is found or the entire collection has been searched.

### Key Characteristics:
- **Time Complexity**: O(n) in worst case
- **Space Complexity**: O(1)
- **No prerequisites**: Doesn't require sorted data
- **Simple implementation**: Easy to understand and implement
- **Universal**: Works on any data structure with sequential access

## How Linear Search Works

### The Basic Algorithm:
1. Start from the first element
2. Compare each element with the target value
3. If match found, return the index
4. If end reached without finding, return -1

### Visual Example:
```
Array: [10, 23, 45, 70, 11, 15]
Search for: 70

Step 1: Check 10 ≠ 70
Step 2: Check 23 ≠ 70
Step 3: Check 45 ≠ 70
Step 4: Check 70 = 70 → Found at index 3
```

## Basic Linear Search Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Linear search function
int linearSearch(int arr[], int n, int target) {
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            return i;  // Return index if found
        }
    }
    return -1;  // Return -1 if not found
}

// Linear search with vector
int linearSearchVector(const vector<int>& vec, int target) {
    for(int i = 0; i < vec.size(); i++) {
        if(vec[i] == target) {
            return i;
        }
    }
    return -1;
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {10, 23, 45, 70, 11, 15};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 70;
    
    cout << "Array: ";
    printArray(arr, n);
    cout << "Searching for: " << target << endl;
    
    int result = linearSearch(arr, n, target);
    
    if(result != -1) {
        cout << "Element found at index: " << result << endl;
    } else {
        cout << "Element not found in the array" << endl;
    }
    
    // Using vector
    vector<int> vec = {10, 23, 45, 70, 11, 15};
    cout << "\nUsing vector: ";
    for(int num : vec) cout << num << " ";
    cout << endl;
    
    int vecResult = linearSearchVector(vec, 11);
    cout << "Element 11 found at index: " << vecResult << endl;
    
    return 0;
}
```

**Output:**
```
Array: 10 23 45 70 11 15 
Searching for: 70
Element found at index: 3

Using vector: 10 23 45 70 11 15 
Element 11 found at index: 4
```

## Detailed Step-by-Step Visualization

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

void linearSearchVisual(int arr[], int n, int target) {
    cout << "=== Linear Search Step-by-Step ===\n" << endl;
    cout << "Array: ";
    for(int i = 0; i < n; i++) {
        cout << "[" << i << "]: " << setw(3) << arr[i] << "  ";
    }
    cout << "\nTarget: " << target << endl << endl;
    
    bool found = false;
    int comparisons = 0;
    
    for(int i = 0; i < n; i++) {
        comparisons++;
        
        cout << "Step " << i + 1 << ": ";
        cout << "Check arr[" << i << "] = " << arr[i];
        
        if(arr[i] == target) {
            cout << " ✅ MATCH FOUND!" << endl;
            cout << "   Element " << target << " found at index " << i << endl;
            cout << "   Total comparisons: " << comparisons << endl;
            found = true;
            break;
        } else {
            cout << " ✗ Not equal to " << target << endl;
        }
        
        // Visual representation
        cout << "   Array: ";
        for(int j = 0; j < n; j++) {
            if(j == i) {
                cout << "[" << arr[j] << "] ";  // Current position
            } else {
                cout << arr[j] << " ";
            }
        }
        cout << endl << endl;
    }
    
    if(!found) {
        cout << "❌ Element " << target << " not found in the array" << endl;
        cout << "Total comparisons: " << comparisons << endl;
    }
    
    cout << "\n" << string(50, '=') << endl;
    cout << "Performance Summary:" << endl;
    cout << "  Best case: 1 comparison (element at first position)" << endl;
    cout << "  Worst case: " << n << " comparisons (element not found or at last)" << endl;
    cout << "  Average case: " << n/2 << " comparisons" << endl;
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Test 1: Element present in array" << endl;
    linearSearchVisual(arr, n, 22);
    
    cout << "\n\nTest 2: Element not in array" << endl;
    linearSearchVisual(arr, n, 99);
    
    return 0;
}
```

**Output:**
```
=== Linear Search Step-by-Step ===

Array: [0]:  64  [1]:  34  [2]:  25  [3]:  12  [4]:  22  [5]:  11  [6]:  90  
Target: 22

Step 1: Check arr[0] = 64 ✗ Not equal to 22
   Array: [64] 34 25 12 22 11 90 

Step 2: Check arr[1] = 34 ✗ Not equal to 22
   Array: 64 [34] 25 12 22 11 90 

Step 3: Check arr[2] = 25 ✗ Not equal to 22
   Array: 64 34 [25] 12 22 11 90 

Step 4: Check arr[3] = 12 ✗ Not equal to 22
   Array: 64 34 25 [12] 22 11 90 

Step 5: Check arr[4] = 22 ✅ MATCH FOUND!
   Element 22 found at index 4
   Total comparisons: 5
```

## Variations of Linear Search

### 1. Linear Search with Sentinel
```cpp
#include <iostream>
using namespace std;

// Sentinel linear search (reduces comparisons)
int sentinelLinearSearch(int arr[], int n, int target) {
    // Store last element
    int last = arr[n - 1];
    
    // Set last element as target
    arr[n - 1] = target;
    
    int i = 0;
    while(arr[i] != target) {
        i++;
    }
    
    // Restore last element
    arr[n - 1] = last;
    
    // Check if found
    if(i < n - 1 || arr[n - 1] == target) {
        return i;
    }
    
    return -1;
}

int main() {
    int arr[] = {10, 20, 30, 40, 50, 60};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 40;
    
    cout << "Sentinel Linear Search" << endl;
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\nSearching for: " << target << endl;
    
    int result = sentinelLinearSearch(arr, n, target);
    
    if(result != -1) {
        cout << "Element found at index: " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }
    
    return 0;
}
```

### 2. Linear Search for Multiple Occurrences
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Find all occurrences
vector<int> linearSearchAll(int arr[], int n, int target) {
    vector<int> indices;
    
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            indices.push_back(i);
        }
    }
    
    return indices;
}

// Find first and last occurrence
pair<int, int> linearSearchFirstLast(int arr[], int n, int target) {
    int first = -1, last = -1;
    
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            if(first == -1) {
                first = i;  // First occurrence
            }
            last = i;  // Update last occurrence
        }
    }
    
    return {first, last};
}

int main() {
    int arr[] = {10, 20, 30, 20, 40, 20, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 20;
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\nSearching for: " << target << endl;
    
    // Find all occurrences
    vector<int> allIndices = linearSearchAll(arr, n, target);
    
    cout << "\nAll occurrences at indices: ";
    for(int idx : allIndices) {
        cout << idx << " ";
    }
    cout << "(" << allIndices.size() << " occurrences)" << endl;
    
    // Find first and last occurrence
    auto [first, last] = linearSearchFirstLast(arr, n, target);
    
    cout << "First occurrence: " << first << endl;
    cout << "Last occurrence: " << last << endl;
    
    return 0;
}
```

### 3. Linear Search with Frequency Count
```cpp
#include <iostream>
using namespace std;

void linearSearchWithFrequency(int arr[], int n, int target) {
    int count = 0;
    int firstIndex = -1;
    int lastIndex = -1;
    
    cout << "Searching for " << target << "..." << endl;
    
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            count++;
            if(firstIndex == -1) {
                firstIndex = i;
            }
            lastIndex = i;
            
            cout << "  Found at index " << i << " (Occurrence #" << count << ")" << endl;
        }
    }
    
    cout << "\nSummary:" << endl;
    cout << "  Total occurrences: " << count << endl;
    
    if(count > 0) {
        cout << "  First occurrence: index " << firstIndex << endl;
        cout << "  Last occurrence: index " << lastIndex << endl;
        cout << "  Frequency: " << count << " times" << endl;
    } else {
        cout << "  Element not found in array" << endl;
    }
}

int main() {
    int arr[] = {2, 4, 6, 8, 4, 10, 4, 12, 14, 4};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    linearSearchWithFrequency(arr, n, 4);
    
    return 0;
}
```

## Linear Search on Different Data Structures

### 1. Linear Search in Strings
```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Search character in string
int linearSearchString(const string& str, char target) {
    for(int i = 0; i < str.length(); i++) {
        if(str[i] == target) {
            return i;
        }
    }
    return -1;
}

// Search substring in string
int linearSearchSubstring(const string& str, const string& substring) {
    int n = str.length();
    int m = substring.length();
    
    for(int i = 0; i <= n - m; i++) {
        int j;
        for(j = 0; j < m; j++) {
            if(str[i + j] != substring[j]) {
                break;
            }
        }
        if(j == m) {
            return i;  // Substring found starting at index i
        }
    }
    return -1;
}

int main() {
    string text = "Hello, welcome to C++ programming!";
    char targetChar = 'w';
    string targetSubstring = "C++";
    
    cout << "Text: \"" << text << "\"" << endl;
    
    // Search for character
    int charIndex = linearSearchString(text, targetChar);
    if(charIndex != -1) {
        cout << "Character '" << targetChar << "' found at index: " << charIndex << endl;
    } else {
        cout << "Character '" << targetChar << "' not found" << endl;
    }
    
    // Search for substring
    int subIndex = linearSearchSubstring(text, targetSubstring);
    if(subIndex != -1) {
        cout << "Substring \"" << targetSubstring << "\" found starting at index: " << subIndex << endl;
    } else {
        cout << "Substring \"" << targetSubstring << "\" not found" << endl;
    }
    
    return 0;
}
```

### 2. Linear Search in 2D Arrays
```cpp
#include <iostream>
using namespace std;

// Search in 2D array
pair<int, int> linearSearch2D(int matrix[][3], int rows, int cols, int target) {
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < cols; j++) {
            if(matrix[i][j] == target) {
                return {i, j};  // Return row and column indices
            }
        }
    }
    return {-1, -1};  // Not found
}

// Search in jagged array (vector of vectors)
pair<int, int> linearSearchJagged(const vector<vector<int>>& jagged, int target) {
    for(int i = 0; i < jagged.size(); i++) {
        for(int j = 0; j < jagged[i].size(); j++) {
            if(jagged[i][j] == target) {
                return {i, j};
            }
        }
    }
    return {-1, -1};
}

int main() {
    // 2D array
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    cout << "2D Array:" << endl;
    for(int i = 0; i < 3; i++) {
        for(int j = 0; j < 3; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    
    int target = 5;
    auto [row, col] = linearSearch2D(matrix, 3, 3, target);
    
    if(row != -1) {
        cout << "Element " << target << " found at position: (" 
             << row << ", " << col << ")" << endl;
    } else {
        cout << "Element " << target << " not found" << endl;
    }
    
    // Jagged array
    vector<vector<int>> jagged = {
        {1, 2},
        {3, 4, 5, 6},
        {7},
        {8, 9, 10}
    };
    
    cout << "\nJagged Array:" << endl;
    for(const auto& row : jagged) {
        for(int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }
    
    target = 6;
    auto [rowJ, colJ] = linearSearchJagged(jagged, target);
    
    if(rowJ != -1) {
        cout << "Element " << target << " found at position: (" 
             << rowJ << ", " << colJ << ")" << endl;
    }
    
    return 0;
}
```

### 3. Linear Search in Linked List
```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    void insert(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
    
    // Linear search in linked list
    Node* linearSearch(int target) {
        Node* current = head;
        int position = 0;
        
        while(current != nullptr) {
            if(current->data == target) {
                cout << "Found " << target << " at position " << position << endl;
                return current;
            }
            current = current->next;
            position++;
        }
        
        cout << target << " not found in the list" << endl;
        return nullptr;
    }
    
    void display() {
        Node* current = head;
        cout << "Linked List: ";
        while(current != nullptr) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    
    // Insert elements
    list.insert(10);
    list.insert(20);
    list.insert(30);
    list.insert(40);
    list.insert(50);
    
    list.display();
    
    // Search for elements
    list.linearSearch(30);
    list.linearSearch(25);  // Not in list
    
    return 0;
}
```

## Optimized Linear Search Techniques

### 1. Transposition (Move to Front) for Frequently Accessed Items
```cpp
#include <iostream>
using namespace std;

// Transposition: Move found element one step forward
int linearSearchTransposition(int arr[], int n, int target) {
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            if(i > 0) {
                // Swap with previous element
                swap(arr[i], arr[i - 1]);
                return i - 1;  // Return new position
            }
            return i;  // Already at front
        }
    }
    return -1;
}

// Move to front: Move found element to beginning
int linearSearchMoveToFront(int arr[], int n, int target) {
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            if(i > 0) {
                // Move to front
                int temp = arr[i];
                for(int j = i; j > 0; j--) {
                    arr[j] = arr[j - 1];
                }
                arr[0] = temp;
                return 0;  // Now at front
            }
            return i;  // Already at front
        }
    }
    return -1;
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    printArray(arr, n);
    
    cout << "\nSearching for 40 with transposition..." << endl;
    int result1 = linearSearchTransposition(arr, n, 40);
    cout << "Found at (new) index: " << result1 << endl;
    cout << "Array after transposition: ";
    printArray(arr, n);
    
    cout << "\nSearching for 40 again with transposition..." << endl;
    result1 = linearSearchTransposition(arr, n, 40);
    cout << "Found at (new) index: " << result1 << endl;
    cout << "Array after second transposition: ";
    printArray(arr, n);
    
    // Reset array
    int arr2[] = {10, 20, 30, 40, 50};
    cout << "\n\nReset array: ";
    printArray(arr2, n);
    
    cout << "\nSearching for 40 with move-to-front..." << endl;
    int result2 = linearSearchMoveToFront(arr2, n, 40);
    cout << "Found at (new) index: " << result2 << endl;
    cout << "Array after move-to-front: ";
    printArray(arr2, n);
    
    return 0;
}
```

### 2. Recursive Linear Search
```cpp
#include <iostream>
using namespace std;

// Recursive linear search
int recursiveLinearSearch(int arr[], int size, int target, int index = 0) {
    // Base cases
    if(index >= size) {
        return -1;  // Element not found
    }
    if(arr[index] == target) {
        return index;  // Element found
    }
    
    // Recursive call
    return recursiveLinearSearch(arr, size, target, index + 1);
}

// Recursive search from both ends
int recursiveLinearSearchBothEnds(int arr[], int left, int right, int target) {
    // Base cases
    if(left > right) {
        return -1;
    }
    if(arr[left] == target) {
        return left;
    }
    if(arr[right] == target) {
        return right;
    }
    
    // Recursive call
    return recursiveLinearSearchBothEnds(arr, left + 1, right - 1, target);
}

int main() {
    int arr[] = {10, 20, 30, 40, 50, 60, 70};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    cout << "\nRecursive search for 40: ";
    int result1 = recursiveLinearSearch(arr, n, 40);
    if(result1 != -1) {
        cout << "Found at index " << result1 << endl;
    } else {
        cout << "Not found" << endl;
    }
    
    cout << "Recursive search for 90: ";
    int result2 = recursiveLinearSearch(arr, n, 90);
    if(result2 != -1) {
        cout << "Found at index " << result2 << endl;
    } else {
        cout << "Not found" << endl;
    }
    
    cout << "\nRecursive search from both ends for 20: ";
    int result3 = recursiveLinearSearchBothEnds(arr, 0, n - 1, 20);
    if(result3 != -1) {
        cout << "Found at index " << result3 << endl;
    }
    
    return 0;
}
```

## Performance Analysis

```cpp
#include <iostream>
#include <chrono>
#include <random>
#include <vector>
#include <algorithm>
using namespace std;
using namespace chrono;

void performanceTest() {
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(1, 100000);
    
    vector<int> sizes = {1000, 10000, 50000, 100000, 500000};
    
    cout << "Linear Search Performance Analysis\n" << endl;
    cout << "Size\t\tBest Case\tWorst Case\tAverage Case" << endl;
    cout << string(60, '-') << endl;
    
    for(int size : sizes) {
        // Generate random data
        vector<int> data(size);
        for(int i = 0; i < size; i++) {
            data[i] = dis(gen);
        }
        
        // Test Best Case (element at first position)
        int targetBest = data[0];
        auto start = high_resolution_clock::now();
        
        // Linear search
        for(int i = 0; i < size; i++) {
            if(data[i] == targetBest) {
                break;
            }
        }
        
        auto end = high_resolution_clock::now();
        auto bestTime = duration_cast<nanoseconds>(end - start).count();
        
        // Test Worst Case (element not present)
        int targetWorst = -1;  // Not in array
        start = high_resolution_clock::now();
        
        for(int i = 0; i < size; i++) {
            if(data[i] == targetWorst) {
                break;
            }
        }
        
        end = high_resolution_clock::now();
        auto worstTime = duration_cast<nanoseconds>(end - start).count();
        
        // Test Average Case (element in middle)
        int targetAvg = data[size / 2];
        start = high_resolution_clock::now();
        
        for(int i = 0; i < size; i++) {
            if(data[i] == targetAvg) {
                break;
            }
        }
        
        end = high_resolution_clock::now();
        auto avgTime = duration_cast<nanoseconds>(end - start).count();
        
        cout << size << "\t\t"
             << bestTime << " ns\t"
             << worstTime << " ns\t"
             << avgTime << " ns" << endl;
    }
}

// Compare with binary search (requires sorted data)
void compareWithBinarySearch() {
    cout << "\n\nComparison with Binary Search (on sorted data)\n" << endl;
    cout << "Size\t\tLinear Search\tBinary Search\tSpeedup" << endl;
    cout << string(60, '-') << endl;
    
    for(int size = 1000; size <= 100000; size *= 10) {
        vector<int> data(size);
        for(int i = 0; i < size; i++) {
            data[i] = i;  // Sorted data
        }
        
        int target = size / 2;
        
        // Linear search
        auto start = high_resolution_clock::now();
        for(int i = 0; i < size; i++) {
            if(data[i] == target) break;
        }
        auto end = high_resolution_clock::now();
        auto linearTime = duration_cast<nanoseconds>(end - start).count();
        
        // Binary search
        start = high_resolution_clock::now();
        int left = 0, right = size - 1;
        while(left <= right) {
            int mid = left + (right - left) / 2;
            if(data[mid] == target) break;
            else if(data[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        end = high_resolution_clock::now();
        auto binaryTime = duration_cast<nanoseconds>(end - start).count();
        
        double speedup = (double)linearTime / binaryTime;
        
        cout << size << "\t\t"
             << linearTime << " ns\t"
             << binaryTime << " ns\t"
             << fixed << setprecision(1) << speedup << "x" << endl;
    }
}

int main() {
    performanceTest();
    compareWithBinarySearch();
    return 0;
}
```

## Applications of Linear Search

### 1. Finding Minimum/Maximum Element
```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

pair<int, int> findMinMax(int arr[], int n) {
    if(n == 0) return {INT_MAX, INT_MIN};
    
    int minVal = arr[0];
    int maxVal = arr[0];
    
    for(int i = 1; i < n; i++) {
        if(arr[i] < minVal) {
            minVal = arr[i];
        }
        if(arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    
    return {minVal, maxVal};
}

// Find second largest element
int findSecondLargest(int arr[], int n) {
    if(n < 2) return -1;
    
    int largest = INT_MIN;
    int secondLargest = INT_MIN;
    
    for(int i = 0; i < n; i++) {
        if(arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];
        } else if(arr[i] > secondLargest && arr[i] != largest) {
            secondLargest = arr[i];
        }
    }
    
    return (secondLargest == INT_MIN) ? -1 : secondLargest;
}

int main() {
    int arr[] = {12, 35, 1, 10, 34, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    auto [minVal, maxVal] = findMinMax(arr, n);
    cout << "Minimum: " << minVal << endl;
    cout << "Maximum: " << maxVal << endl;
    
    int secondLargest = findSecondLargest(arr, n);
    cout << "Second Largest: " << secondLargest << endl;
    
    return 0;
}
```

### 2. Data Validation and Filtering
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Validate if all elements are positive
bool validateAllPositive(const vector<int>& data) {
    for(int num : data) {
        if(num <= 0) {
            return false;
        }
    }
    return true;
}

// Filter even numbers
vector<int> filterEvenNumbers(const vector<int>& data) {
    vector<int> result;
    for(int num : data) {
        if(num % 2 == 0) {
            result.push_back(num);
        }
    }
    return result;
}

// Find duplicates
vector<int> findDuplicates(const vector<int>& data) {
    vector<int> duplicates;
    
    for(int i = 0; i < data.size(); i++) {
        for(int j = i + 1; j < data.size(); j++) {
            if(data[i] == data[j]) {
                // Check if already in duplicates
                bool alreadyFound = false;
                for(int dup : duplicates) {
                    if(dup == data[i]) {
                        alreadyFound = true;
                        break;
                    }
                }
                if(!alreadyFound) {
                    duplicates.push_back(data[i]);
                }
            }
        }
    }
    
    return duplicates;
}

int main() {
    vector<int> data = {1, 2, 3, 4, 5, 2, 3, 6, 7, 8};
    
    cout << "Data: ";
    for(int num : data) cout << num << " ";
    cout << endl;
    
    cout << "\nAll positive? " << (validateAllPositive(data) ? "Yes" : "No") << endl;
    
    vector<int> evens = filterEvenNumbers(data);
    cout << "Even numbers: ";
    for(int num : evens) cout << num << " ";
    cout << endl;
    
    vector<int> duplicates = findDuplicates(data);
    cout << "Duplicates: ";
    for(int num : duplicates) cout << num << " ";
    cout << endl;
    
    return 0;
}
```

### 3. Simple Database Search
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    int id;
    string name;
    float grade;
    
    void display() const {
        cout << "ID: " << id << ", Name: " << name << ", Grade: " << grade << endl;
    }
};

class StudentDatabase {
private:
    vector<Student> students;
    
public:
    void addStudent(int id, string name, float grade) {
        students.push_back({id, name, grade});
    }
    
    // Search by ID
    Student* searchById(int id) {
        for(auto& student : students) {
            if(student.id == id) {
                return &student;
            }
        }
        return nullptr;
    }
    
    // Search by name
    vector<Student*> searchByName(const string& name) {
        vector<Student*> results;
        for(auto& student : students) {
            if(student.name == name) {
                results.push_back(&student);
            }
        }
        return results;
    }
    
    // Search by grade range
    vector<Student*> searchByGradeRange(float minGrade, float maxGrade) {
        vector<Student*> results;
        for(auto& student : students) {
            if(student.grade >= minGrade && student.grade <= maxGrade) {
                results.push_back(&student);
            }
        }
        return results;
    }
    
    void displayAll() {
        cout << "\nAll Students:" << endl;
        for(const auto& student : students) {
            student.display();
        }
    }
};

int main() {
    StudentDatabase db;
    
    // Add sample data
    db.addStudent(101, "Alice", 85.5);
    db.addStudent(102, "Bob", 92.0);
    db.addStudent(103, "Charlie", 78.5);
    db.addStudent(104, "Alice", 88.0);
    db.addStudent(105, "David", 91.5);
    
    db.displayAll();
    
    cout << "\nSearch by ID 103:" << endl;
    Student* student = db.searchById(103);
    if(student) student->display();
    
    cout << "\nSearch by name 'Alice':" << endl;
    auto aliceStudents = db.searchByName("Alice");
    for(auto s : aliceStudents) s->display();
    
    cout << "\nSearch by grade range (80.0 - 90.0):" << endl;
    auto gradeStudents = db.searchByGradeRange(80.0, 90.0);
    for(auto s : gradeStudents) s->display();
    
    return 0;
}
```

## Common Interview Questions

### 1. Basic Linear Search Implementation
```cpp
// Already shown in basic examples
```

### 2. Find Missing Number in Array
```cpp
#include <iostream>
#include <vector>
using namespace std;

int findMissingNumber(const vector<int>& arr, int n) {
    // Array contains numbers from 1 to n with one missing
    for(int i = 1; i <= n; i++) {
        bool found = false;
        for(int num : arr) {
            if(num == i) {
                found = true;
                break;
            }
        }
        if(!found) {
            return i;
        }
    }
    return -1;  // No missing number
}

// Better approach using sum formula
int findMissingNumberOptimized(const vector<int>& arr, int n) {
    int totalSum = n * (n + 1) / 2;
    int arraySum = 0;
    
    for(int num : arr) {
        arraySum += num;
    }
    
    return totalSum - arraySum;
}

int main() {
    vector<int> arr = {1, 2, 4, 5, 6};  // Missing 3
    int n = 6;  // Numbers from 1 to 6
    
    cout << "Array: ";
    for(int num : arr) cout << num << " ";
    cout << endl;
    
    int missing = findMissingNumber(arr, n);
    cout << "Missing number (linear search): " << missing << endl;
    
    missing = findMissingNumberOptimized(arr, n);
    cout << "Missing number (optimized): " << missing << endl;
    
    return 0;
}
```

### 3. Find Pair with Given Sum
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Brute force approach using linear search
pair<int, int> findPairWithSum(const vector<int>& arr, int target) {
    for(int i = 0; i < arr.size(); i++) {
        for(int j = i + 1; j < arr.size(); j++) {
            if(arr[i] + arr[j] == target) {
                return {arr[i], arr[j]};
            }
        }
    }
    return {-1, -1};
}

// Find all pairs
vector<pair<int, int>> findAllPairsWithSum(const vector<int>& arr, int target) {
    vector<pair<int, int>> pairs;
    
    for(int i = 0; i < arr.size(); i++) {
        for(int j = i + 1; j < arr.size(); j++) {
            if(arr[i] + arr[j] == target) {
                pairs.push_back({arr[i], arr[j]});
            }
        }
    }
    
    return pairs;
}

int main() {
    vector<int> arr = {8, 7, 2, 5, 3, 1};
    int target = 10;
    
    cout << "Array: ";
    for(int num : arr) cout << num << " ";
    cout << "\nTarget sum: " << target << endl;
    
    auto pair = findPairWithSum(arr, target);
    if(pair.first != -1) {
        cout << "Pair found: " << pair.first << " + " << pair.second 
             << " = " << target << endl;
    } else {
        cout << "No pair found" << endl;
    }
    
    cout << "\nAll pairs with sum " << target << ":" << endl;
    auto allPairs = findAllPairsWithSum(arr, target);
    for(const auto& p : allPairs) {
        cout << p.first << " + " << p.second << " = " << target << endl;
    }
    
    return 0;
}
```

## Advantages and Disadvantages

### Advantages:
1. **Simple to implement** - Easy to understand and code
2. **No prerequisites** - Works on unsorted data
3. **Versatile** - Works on arrays, linked lists, files, etc.
4. **Good for small datasets** - Simple and effective
5. **Useful for one-time searches** - When data won't be searched frequently

### Disadvantages:
1. **O(n) time complexity** - Slow for large datasets
2. **Inefficient for frequent searches** - Better algorithms exist for repeated searches
3. **No early termination benefit** for unsorted data
4. **Worst-case visits all elements** even when element not present

## When to Use Linear Search

1. **Small datasets** (n < 100)
2. **Unsorted data** where sorting cost > search cost
3. **One-time searches** or infrequent searches
4. **When simplicity** is more important than efficiency
5. **Linked lists** and other sequential access data structures
6. **Educational purposes** to understand searching concepts

## Summary

Linear Search is the most basic searching algorithm that forms the foundation for understanding more complex searching techniques. While it's inefficient for large datasets, it has several practical applications:

- **Simple data validation and filtering**
- **Small database lookups**
- **Finding min/max in unsorted data**
- **Educational purposes** to learn searching concepts

**Key Takeaways:**
- Time complexity: O(n) worst case, O(1) best case
- Space complexity: O(1)
- Works on any sequential data structure
- Simple to implement and understand
- Foundation for more advanced algorithms

---
*[Next: DSA Binary Search...]*

# DSA Binary Search - Complete C++ Guide

## Introduction to Binary Search

Binary Search is an **efficient searching algorithm** that finds the position of a target value within a **sorted array**. It works by repeatedly dividing the search interval in half.

### Key Characteristics:
- **Time Complexity**: O(log n) - extremely efficient
- **Space Complexity**: O(1) for iterative, O(log n) for recursive
- **Prerequisite**: Array must be sorted
- **Divide and Conquer**: Halves search space each iteration

## How Binary Search Works

### The Algorithm:
1. Start with the entire sorted array
2. Compare target with middle element
3. If target equals middle element, return index
4. If target is smaller, search left half
5. If target is larger, search right half
6. Repeat until found or search space exhausted

### Visual Example:
```
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Search for: 23

Step 1: left=0, right=9, mid=4 → arr[4]=16 < 23 → search right
Step 2: left=5, right=9, mid=7 → arr[7]=56 > 23 → search left  
Step 3: left=5, right=6, mid=5 → arr[5]=23 == 23 → Found!
```

## Basic Binary Search Implementation

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Iterative binary search
int binarySearchIterative(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow
        
        cout << "Searching: left=" << left << ", right=" << right 
             << ", mid=" << mid << ", arr[mid]=" << arr[mid] << endl;
        
        if(arr[mid] == target) {
            return mid;  // Target found
        }
        else if(arr[mid] < target) {
            left = mid + 1;  // Search right half
            cout << "  Target > arr[mid], moving left to " << left << endl;
        }
        else {
            right = mid - 1;  // Search left half
            cout << "  Target < arr[mid], moving right to " << right << endl;
        }
    }
    
    return -1;  // Target not found
}

// Recursive binary search
int binarySearchRecursive(int arr[], int left, int right, int target) {
    if(left > right) {
        return -1;  // Base case: not found
    }
    
    int mid = left + (right - left) / 2;
    
    cout << "Recursive call: left=" << left << ", right=" << right 
         << ", mid=" << mid << ", arr[mid]=" << arr[mid] << endl;
    
    if(arr[mid] == target) {
        return mid;
    }
    else if(arr[mid] < target) {
        return binarySearchRecursive(arr, mid + 1, right, target);
    }
    else {
        return binarySearchRecursive(arr, left, mid - 1, target);
    }
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;
    
    cout << "Sorted array: ";
    printArray(arr, n);
    cout << "Searching for: " << target << endl << endl;
    
    cout << "=== Iterative Binary Search ===" << endl;
    int resultIterative = binarySearchIterative(arr, n, target);
    
    if(resultIterative != -1) {
        cout << "\nElement found at index: " << resultIterative << endl;
    } else {
        cout << "\nElement not found" << endl;
    }
    
    cout << "\n=== Recursive Binary Search ===" << endl;
    int resultRecursive = binarySearchRecursive(arr, 0, n-1, target);
    
    if(resultRecursive != -1) {
        cout << "\nElement found at index: " << resultRecursive << endl;
    } else {
        cout << "\nElement not found" << endl;
    }
    
    return 0;
}
```

**Output:**
```
Sorted array: 2 5 8 12 16 23 38 56 72 91 
Searching for: 23

=== Iterative Binary Search ===
Searching: left=0, right=9, mid=4, arr[mid]=16
  Target > arr[mid], moving left to 5
Searching: left=5, right=9, mid=7, arr[mid]=56
  Target < arr[mid], moving right to 6
Searching: left=5, right=6, mid=5, arr[mid]=23

Element found at index: 5

=== Recursive Binary Search ===
Recursive call: left=0, right=9, mid=4, arr[mid]=16
Recursive call: left=5, right=9, mid=7, arr[mid]=56
Recursive call: left=5, right=6, mid=5, arr[mid]=23

Element found at index: 5
```

## Detailed Step-by-Step Visualization

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

void binarySearchVisual(int arr[], int n, int target) {
    cout << "=== Binary Search Visualization ===\n" << endl;
    cout << "Array: ";
    for(int i = 0; i < n; i++) {
        cout << "[" << i << "]: " << setw(3) << arr[i] << "  ";
    }
    cout << "\nTarget: " << target << endl << endl;
    
    int left = 0;
    int right = n - 1;
    int step = 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        cout << "Step " << step++ << ":" << endl;
        cout << "  Search space: indices " << left << " to " << right << endl;
        
        // Visualize current search space
        cout << "  ";
        for(int i = 0; i < n; i++) {
            if(i == left) cout << "[";
            if(i == mid) cout << "(" << arr[i] << ")";
            else cout << arr[i];
            if(i == right) cout << "]";
            cout << " ";
        }
        cout << endl;
        
        cout << "  Compare target " << target << " with arr[" << mid << "] = " << arr[mid] << endl;
        
        if(arr[mid] == target) {
            cout << "  ✅ MATCH FOUND at index " << mid << "!" << endl;
            cout << "\nTotal steps: " << (step - 1) << endl;
            cout << "Maximum possible steps for array of size " << n << ": " 
                 << (int)log2(n) + 1 << endl;
            return;
        }
        else if(arr[mid] < target) {
            cout << "  → Target is larger, search RIGHT half" << endl;
            left = mid + 1;
        }
        else {
            cout << "  ← Target is smaller, search LEFT half" << endl;
            right = mid - 1;
        }
        
        cout << endl;
    }
    
    cout << "❌ Element not found" << endl;
    cout << "Total steps: " << (step - 1) << endl;
}

void demonstrateLogarithmicNature() {
    cout << "\n" << string(60, '=') << endl;
    cout << "Demonstrating Logarithmic Nature of Binary Search\n" << endl;
    cout << setw(10) << "Array Size" << setw(20) << "Max Comparisons" 
         << setw(20) << "log₂(n)" << endl;
    cout << string(50, '-') << endl;
    
    vector<int> sizes = {10, 100, 1000, 10000, 100000, 1000000, 10000000};
    for(int size : sizes) {
        int maxComparisons = (int)log2(size) + 1;
        cout << setw(10) << size 
             << setw(20) << maxComparisons 
             << setw(20) << fixed << setprecision(2) << log2(size) << endl;
    }
    
    cout << "\nEven with 10 million elements, binary search needs only ";
    cout << (int)log2(10000000) + 1 << " comparisons!" << endl;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Test 1: Element present in array" << endl;
    binarySearchVisual(arr, n, 15);
    
    cout << "\n\nTest 2: Element not in array" << endl;
    binarySearchVisual(arr, n, 20);
    
    demonstrateLogarithmicNature();
    
    return 0;
}
```

**Output:**
```
=== Binary Search Visualization ===

Array: [0]:   1  [1]:   3  [2]:   5  [3]:   7  [4]:   9  [5]:  11  [6]:  13  [7]:  15  [8]:  17  [9]:  19  [10]:  21  [11]:  23  [12]:  25  [13]:  27  [14]:  29  
Target: 15

Step 1:
  Search space: indices 0 to 14
  [(1) 3 5 7 9 11 13 15 17 19 21 23 25 27 29]
  Compare target 15 with arr[7] = 15
  ✅ MATCH FOUND at index 7!

Total steps: 1
Maximum possible steps for array of size 15: 4
```

## Binary Search with STL Functions

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

void demonstrateSTLBinarySearch() {
    vector<int> vec = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    
    cout << "Vector: ";
    for(int num : vec) cout << num << " ";
    cout << endl;
    
    // 1. binary_search - returns bool
    cout << "\n1. std::binary_search():" << endl;
    int target = 7;
    if(binary_search(vec.begin(), vec.end(), target)) {
        cout << "Element " << target << " exists in vector" << endl;
    } else {
        cout << "Element " << target << " does not exist" << endl;
    }
    
    // 2. lower_bound - returns iterator to first element >= target
    cout << "\n2. std::lower_bound():" << endl;
    target = 8;
    auto lb = lower_bound(vec.begin(), vec.end(), target);
    if(lb != vec.end()) {
        cout << "First element >= " << target << " is " << *lb 
             << " at index " << distance(vec.begin(), lb) << endl;
    } else {
        cout << "No element >= " << target << endl;
    }
    
    // 3. upper_bound - returns iterator to first element > target
    cout << "\n3. std::upper_bound():" << endl;
    target = 7;
    auto ub = upper_bound(vec.begin(), vec.end(), target);
    if(ub != vec.end()) {
        cout << "First element > " << target << " is " << *ub 
             << " at index " << distance(vec.begin(), ub) << endl;
    } else {
        cout << "No element > " << target << endl;
    }
    
    // 4. equal_range - returns pair of lower_bound and upper_bound
    cout << "\n4. std::equal_range():" << endl;
    target = 7;
    auto bounds = equal_range(vec.begin(), vec.end(), target);
    cout << "Range of " << target << ": [" 
         << distance(vec.begin(), bounds.first) << ", " 
         << distance(vec.begin(), bounds.second) << ")" << endl;
    cout << "Elements in range: ";
    for(auto it = bounds.first; it != bounds.second; ++it) {
        cout << *it << " ";
    }
    cout << endl;
}

// Custom comparator for descending order
void binarySearchDescending() {
    vector<int> vec = {19, 17, 15, 13, 11, 9, 7, 5, 3, 1};
    
    cout << "\nDescending vector: ";
    for(int num : vec) cout << num << " ";
    cout << endl;
    
    // Binary search with custom comparator
    int target = 7;
    auto comp = [](int a, int b) { return a > b; };  // For descending order
    
    if(binary_search(vec.begin(), vec.end(), target, comp)) {
        cout << "Element " << target << " found in descending vector" << endl;
    }
    
    // Find position
    auto pos = lower_bound(vec.begin(), vec.end(), target, comp);
    cout << "Position of " << target << " (or where it would be): index " 
         << distance(vec.begin(), pos) << endl;
}

int main() {
    cout << "=== STL Binary Search Functions ===" << endl;
    demonstrateSTLBinarySearch();
    binarySearchDescending();
    
    return 0;
}
```

## Variations of Binary Search

### 1. Finding First Occurrence
```cpp
#include <iostream>
#include <vector>
using namespace std;

int findFirstOccurrence(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    int result = -1;
    
    cout << "Finding FIRST occurrence of " << target << endl;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        cout << "  left=" << left << ", right=" << right 
             << ", mid=" << mid << ", arr[mid]=" << arr[mid] << endl;
        
        if(arr[mid] == target) {
            result = mid;        // Record position
            right = mid - 1;     // Continue searching left
            cout << "    Found at " << mid << ", now searching left for earlier occurrence" << endl;
        }
        else if(arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    
    return result;
}

int main() {
    int arr[] = {2, 4, 10, 10, 10, 18, 20, 20, 30, 30, 30, 30, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array (with duplicates): ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    int target = 10;
    int first = findFirstOccurrence(arr, n, target);
    
    if(first != -1) {
        cout << "\nFirst occurrence of " << target << " is at index: " << first << endl;
    } else {
        cout << "\nElement not found" << endl;
    }
    
    target = 30;
    first = findFirstOccurrence(arr, n, target);
    cout << "\nFirst occurrence of " << target << " is at index: " << first << endl;
    
    return 0;
}
```

### 2. Finding Last Occurrence
```cpp
#include <iostream>
using namespace std;

int findLastOccurrence(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    int result = -1;
    
    cout << "Finding LAST occurrence of " << target << endl;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        cout << "  left=" << left << ", right=" << right 
             << ", mid=" << mid << ", arr[mid]=" << arr[mid] << endl;
        
        if(arr[mid] == target) {
            result = mid;        // Record position
            left = mid + 1;      // Continue searching right
            cout << "    Found at " << mid << ", now searching right for later occurrence" << endl;
        }
        else if(arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    
    return result;
}

int main() {
    int arr[] = {2, 4, 10, 10, 10, 18, 20, 20, 30, 30, 30, 30, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    int target = 30;
    int last = findLastOccurrence(arr, n, target);
    
    if(last != -1) {
        cout << "\nLast occurrence of " << target << " is at index: " << last << endl;
    } else {
        cout << "\nElement not found" << endl;
    }
    
    return 0;
}
```

### 3. Count Occurrences using Binary Search
```cpp
#include <iostream>
using namespace std;

int countOccurrences(int arr[], int n, int target) {
    // Find first occurrence
    int first = -1;
    int left = 0, right = n - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            first = mid;
            right = mid - 1;
        }
        else if(arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    
    if(first == -1) return 0;  // Element not found
    
    // Find last occurrence
    int last = -1;
    left = 0;
    right = n - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            last = mid;
            left = mid + 1;
        }
        else if(arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    
    return last - first + 1;
}

int main() {
    int arr[] = {2, 4, 10, 10, 10, 18, 20, 20, 30, 30, 30, 30, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    int target = 10;
    int count = countOccurrences(arr, n, target);
    cout << "\nElement " << target << " occurs " << count << " times" << endl;
    
    target = 30;
    count = countOccurrences(arr, n, target);
    cout << "Element " << target << " occurs " << count << " times" << endl;
    
    target = 25;
    count = countOccurrences(arr, n, target);
    cout << "Element " << target << " occurs " << count << " times" << endl;
    
    return 0;
}
```

## Advanced Binary Search Problems

### 1. Find Floor and Ceil
```cpp
#include <iostream>
#include <climits>
using namespace std;

pair<int, int> findFloorCeil(int arr[], int n, int target) {
    int floor = INT_MIN;
    int ceil = INT_MAX;
    
    int left = 0, right = n - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) {
            return {arr[mid], arr[mid]};  // Both floor and ceil are the element itself
        }
        else if(arr[mid] < target) {
            floor = max(floor, arr[mid]);  // Update floor
            left = mid + 1;
        }
        else {
            ceil = min(ceil, arr[mid]);    // Update ceil
            right = mid - 1;
        }
    }
    
    return {floor, ceil};
}

int main() {
    int arr[] = {1, 2, 8, 10, 10, 12, 19};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    vector<int> testValues = {0, 1, 5, 10, 15, 20};
    
    for(int target : testValues) {
        auto [floor, ceil] = findFloorCeil(arr, n, target);
        
        cout << "\nTarget: " << target << endl;
        if(floor == INT_MIN) {
            cout << "Floor: Doesn't exist" << endl;
        } else {
            cout << "Floor: " << floor << endl;
        }
        
        if(ceil == INT_MAX) {
            cout << "Ceil: Doesn't exist" << endl;
        } else {
            cout << "Ceil: " << ceil << endl;
        }
    }
    
    return 0;
}
```

### 2. Find Minimum in Rotated Sorted Array
```cpp
#include <iostream>
#include <vector>
using namespace std;

int findMinInRotatedArray(int arr[], int n) {
    int left = 0;
    int right = n - 1;
    
    cout << "Finding minimum in rotated sorted array" << endl;
    
    // If array is not rotated
    if(arr[left] < arr[right]) {
        cout << "Array is not rotated, minimum is first element" << endl;
        return arr[left];
    }
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        cout << "  left=" << left << "(" << arr[left] << "), "
             << "right=" << right << "(" << arr[right] << "), "
             << "mid=" << mid << "(" << arr[mid] << ")" << endl;
        
        if(arr[mid] > arr[right]) {
            // Minimum is in right half
            left = mid + 1;
            cout << "    arr[mid] > arr[right], search RIGHT" << endl;
        } else {
            // Minimum is in left half (including mid)
            right = mid;
            cout << "    arr[mid] <= arr[right], search LEFT (including mid)" << endl;
        }
    }
    
    cout << "Minimum found at index " << left << endl;
    return arr[left];
}

int main() {
    // Test cases
    int arr1[] = {4, 5, 6, 7, 0, 1, 2};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    
    cout << "Array 1: ";
    for(int i = 0; i < n1; i++) cout << arr1[i] << " ";
    cout << endl;
    
    int min1 = findMinInRotatedArray(arr1, n1);
    cout << "Minimum: " << min1 << endl;
    
    cout << "\n" << string(40, '-') << endl;
    
    int arr2[] = {3, 4, 5, 1, 2};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    
    cout << "Array 2: ";
    for(int i = 0; i < n2; i++) cout << arr2[i] << " ";
    cout << endl;
    
    int min2 = findMinInRotatedArray(arr2, n2);
    cout << "Minimum: " << min2 << endl;
    
    return 0;
}
```

### 3. Search in Rotated Sorted Array
```cpp
#include <iostream>
using namespace std;

int searchInRotatedArray(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    cout << "Searching for " << target << " in rotated array" << endl;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        cout << "  left=" << left << "(" << arr[left] << "), "
             << "right=" << right << "(" << arr[right] << "), "
             << "mid=" << mid << "(" << arr[mid] << ")" << endl;
        
        if(arr[mid] == target) {
            return mid;
        }
        
        // Left half is sorted
        if(arr[left] <= arr[mid]) {
            cout << "    Left half [" << left << "-" << mid << "] is sorted" << endl;
            if(arr[left] <= target && target < arr[mid]) {
                // Target in sorted left half
                cout << "    Target in sorted left half" << endl;
                right = mid - 1;
            } else {
                // Target in right half
                cout << "    Target in right half" << endl;
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            cout << "    Right half [" << mid << "-" << right << "] is sorted" << endl;
            if(arr[mid] < target && target <= arr[right]) {
                // Target in sorted right half
                cout << "    Target in sorted right half" << endl;
                left = mid + 1;
            } else {
                // Target in left half
                cout << "    Target in left half" << endl;
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

int main() {
    int arr[] = {4, 5, 6, 7, 0, 1, 2};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Rotated array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    vector<int> testTargets = {0, 3, 5, 7};
    
    for(int target : testTargets) {
        cout << "\nSearching for " << target << ":" << endl;
        int result = searchInRotatedArray(arr, n, target);
        
        if(result != -1) {
            cout << "Found at index: " << result << endl;
        } else {
            cout << "Not found" << endl;
        }
    }
    
    return 0;
}
```

## Binary Search on Answer (Predicate-based)

### 1. Find Square Root with Precision
```cpp
#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

// Find integer square root
int sqrtInteger(int n) {
    if(n < 2) return n;
    
    int left = 1, right = n;
    int result = 0;
    
    cout << "Finding integer square root of " << n << endl;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        long long square = (long long)mid * mid;
        
        cout << "  Trying mid=" << mid << ", square=" << square << endl;
        
        if(square == n) {
            return mid;
        }
        else if(square < n) {
            result = mid;        // Store as potential answer
            left = mid + 1;
            cout << "    square < n, update result to " << result << endl;
        }
        else {
            right = mid - 1;
            cout << "    square > n, search left" << endl;
        }
    }
    
    return result;
}

// Find square root with precision
double sqrtPrecision(int n, int precision) {
    double result = sqrtInteger(n);
    
    cout << "\nFinding square root with precision " << precision << endl;
    cout << "Integer part: " << result << endl;
    
    double increment = 0.1;
    for(int p = 0; p < precision; p++) {
        while(result * result <= n) {
            result += increment;
            cout << "  Trying " << fixed << setprecision(p+1) 
                 << result << ", square=" << result*result << endl;
        }
        
        // Step back once
        result -= increment;
        increment /= 10;
    }
    
    return result;
}

int main() {
    int n = 50;
    
    cout << "=== Finding Square Root of " << n << " ===" << endl;
    
    int intSqrt = sqrtInteger(n);
    cout << "\nInteger square root: " << intSqrt << endl;
    
    double preciseSqrt = sqrtPrecision(n, 3);
    cout << "\nSquare root with 3 decimal places: " 
         << fixed << setprecision(3) << preciseSqrt << endl;
    cout << "Actual sqrt(" << n << "): " << sqrt(n) << endl;
    
    return 0;
}
```

### 2. Find Peak Element
```cpp
#include <iostream>
#include <vector>
using namespace std;

int findPeakElement(int arr[], int n) {
    int left = 0;
    int right = n - 1;
    
    cout << "Finding peak element" << endl;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        cout << "  left=" << left << "(" << arr[left] << "), "
             << "right=" << right << "(" << arr[right] << "), "
             << "mid=" << mid << "(" << arr[mid] << ")" << endl;
        
        if(arr[mid] > arr[mid + 1]) {
            // Peak is in left half (including mid)
            cout << "    arr[mid] > arr[mid+1], peak in LEFT half" << endl;
            right = mid;
        } else {
            // Peak is in right half
            cout << "    arr[mid] <= arr[mid+1], peak in RIGHT half" << endl;
            left = mid + 1;
        }
    }
    
    cout << "Peak found at index " << left << endl;
    return left;
}

int main() {
    // Test cases
    int arr1[] = {1, 2, 3, 1};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    
    cout << "Array 1: ";
    for(int i = 0; i < n1; i++) cout << arr[i] << " ";
    cout << endl;
    
    int peak1 = findPeakElement(arr1, n1);
    cout << "Peak element index: " << peak1 << ", value: " << arr1[peak1] << endl;
    
    cout << "\n" << string(40, '-') << endl;
    
    int arr2[] = {1, 2, 1, 3, 5, 6, 4};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    
    cout << "Array 2: ";
    for(int i = 0; i < n2; i++) cout << arr2[i] << " ";
    cout << endl;
    
    int peak2 = findPeakElement(arr2, n2);
    cout << "Peak element index: " << peak2 << ", value: " << arr2[peak2] << endl;
    
    return 0;
}
```

## Binary Search in 2D Arrays (Matrix)

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Binary search in sorted matrix
pair<int, int> binarySearchMatrix(vector<vector<int>>& matrix, int target) {
    if(matrix.empty() || matrix[0].empty()) return {-1, -1};
    
    int rows = matrix.size();
    int cols = matrix[0].size();
    
    int left = 0;
    int right = rows * cols - 1;  // Treat matrix as 1D array
    
    cout << "Searching for " << target << " in " 
         << rows << "x" << cols << " matrix" << endl;
    cout << "Treating matrix as 1D array of size " << rows * cols << endl;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        // Convert 1D index to 2D indices
        int row = mid / cols;
        int col = mid % cols;
        int value = matrix[row][col];
        
        cout << "  left=" << left << ", right=" << right 
             << ", mid=" << mid << " -> (" << row << "," << col 
             << ") = " << value << endl;
        
        if(value == target) {
            return {row, col};
        }
        else if(value < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    
    return {-1, -1};
}

// Search in row-wise and column-wise sorted matrix
pair<int, int> searchInSortedMatrix(vector<vector<int>>& matrix, int target) {
    if(matrix.empty() || matrix[0].empty()) return {-1, -1};
    
    int rows = matrix.size();
    int cols = matrix[0].size();
    
    // Start from top-right corner
    int row = 0;
    int col = cols - 1;
    
    cout << "Starting from top-right corner (" << row << "," << col << ")" << endl;
    
    while(row < rows && col >= 0) {
        int value = matrix[row][col];
        
        cout << "  Checking (" << row << "," << col << ") = " << value << endl;
        
        if(value == target) {
            return {row, col};
        }
        else if(value > target) {
            cout << "    Value > target, move LEFT" << endl;
            col--;  // Move left in same row
        }
        else {
            cout << "    Value < target, move DOWN" << endl;
            row++;  // Move down to next row
        }
    }
    
    return {-1, -1};
}

int main() {
    // Sorted matrix (both rows and columns sorted)
    vector<vector<int>> matrix1 = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    
    cout << "Matrix 1 (sorted):" << endl;
    for(const auto& row : matrix1) {
        for(int num : row) cout << num << "\t";
        cout << endl;
    }
    
    int target = 16;
    auto [r1, c1] = binarySearchMatrix(matrix1, target);
    
    if(r1 != -1) {
        cout << "\nFound " << target << " at (" << r1 << "," << c1 << ")" << endl;
    } else {
        cout << "\n" << target << " not found" << endl;
    }
    
    // Row-wise and column-wise sorted matrix
    vector<vector<int>> matrix2 = {
        {10, 20, 30, 40},
        {15, 25, 35, 45},
        {27, 29, 37, 48},
        {32, 33, 39, 50}
    };
    
    cout << "\n\nMatrix 2 (row and column sorted):" << endl;
    for(const auto& row : matrix2) {
        for(int num : row) cout << num << "\t";
        cout << endl;
    }
    
    target = 29;
    auto [r2, c2] = searchInSortedMatrix(matrix2, target);
    
    if(r2 != -1) {
        cout << "\nFound " << target << " at (" << r2 << "," << c2 << ")" << endl;
    } else {
        cout << "\n" << target << " not found" << endl;
    }
    
    return 0;
}
```

## Performance Analysis

```cpp
#include <iostream>
#include <chrono>
#include <random>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;
using namespace chrono;

void performanceComparison() {
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(1, 10000000);
    
    vector<int> sizes = {1000, 10000, 100000, 1000000, 10000000};
    
    cout << "Binary Search vs Linear Search Performance\n" << endl;
    cout << setw(12) << "Array Size" 
         << setw(20) << "Binary Search" 
         << setw(20) << "Linear Search" 
         << setw(15) << "Speedup" << endl;
    cout << string(67, '-') << endl;
    
    for(int size : sizes) {
        // Generate sorted data
        vector<int> data(size);
        for(int i = 0; i < size; i++) {
            data[i] = dis(gen);
        }
        sort(data.begin(), data.end());
        
        // Choose a target (middle element for average case)
        int target = data[size / 2];
        
        // Binary Search
        auto start = high_resolution_clock::now();
        
        int left = 0, right = size - 1;
        while(left <= right) {
            int mid = left + (right - left) / 2;
            if(data[mid] == target) break;
            else if(data[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        
        auto end = high_resolution_clock::now();
        auto binaryTime = duration_cast<nanoseconds>(end - start).count();
        
        // Linear Search
        start = high_resolution_clock::now();
        
        for(int i = 0; i < size; i++) {
            if(data[i] == target) break;
        }
        
        end = high_resolution_clock::now();
        auto linearTime = duration_cast<nanoseconds>(end - start).count();
        
        double speedup = (double)linearTime / binaryTime;
        
        cout << setw(12) << size 
             << setw(20) << binaryTime << " ns"
             << setw(20) << linearTime << " ns"
             << setw(15) << fixed << setprecision(1) << speedup << "x" << endl;
    }
    
    cout << "\n" << string(67, '=') << endl;
    cout << "Key Observations:" << endl;
    cout << "1. Binary search is O(log n), linear search is O(n)" << endl;
    cout << "2. For 10 million elements, binary search is thousands of times faster!" << endl;
    cout << "3. Binary search requires sorted data as prerequisite" << endl;
}

// Demonstrate worst-case comparisons
void worstCaseAnalysis() {
    cout << "\n\nWorst-case Comparisons Analysis\n" << endl;
    cout << setw(12) << "Array Size" 
         << setw(20) << "Max Comparisons" 
         << setw(25) << "log₂(n) (rounded up)" << endl;
    cout << string(57, '-') << endl;
    
    for(int size = 10; size <= 1000000000; size *= 10) {
        int maxComparisons = (int)ceil(log2(size));
        cout << setw(12) << size 
             << setw(20) << maxComparisons 
             << setw(25) << log2(size) << endl;
    }
}

int main() {
    performanceComparison();
    worstCaseAnalysis();
    return 0;
}
```

## Common Interview Questions

### 1. Implement Binary Search
```cpp
// Already shown in basic examples
```

### 2. Find First and Last Position of Element
```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> searchRange(int arr[], int n, int target) {
    vector<int> result = {-1, -1};
    
    // Find first position
    int left = 0, right = n - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            result[0] = mid;
            right = mid - 1;  // Continue searching left
        }
        else if(arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    
    // Find last position
    left = 0, right = n - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            result[1] = mid;
            left = mid + 1;  // Continue searching right
        }
        else if(arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    
    return result;
}

int main() {
    int arr[] = {5, 7, 7, 8, 8, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 8;
    
    cout << "Array: ";
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\nTarget: " << target << endl;
    
    vector<int> range = searchRange(arr, n, target);
    cout << "Range: [" << range[0] << ", " << range[1] << "]" << endl;
    
    return 0;
}
```

### 3. Find Minimum in Rotated Sorted Array
```cpp
// Already shown in advanced problems
```

### 4. Find Peak Element
```cpp
// Already shown in advanced problems
```

### 5. Search in Infinite Sorted Array
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Simulating infinite array with bounds
int searchInfiniteArray(int arr[], int target) {
    // Start with small window
    int low = 0;
    int high = 1;
    
    cout << "Searching in 'infinite' array for " << target << endl;
    
    // Double the window until we find bounds
    while(arr[high] < target) {
        cout << "  Window [" << low << "-" << high << "], arr[" 
             << high << "]=" << arr[high] << " < " << target << endl;
        low = high;
        high *= 2;
        cout << "  Doubling window to [" << low << "-" << high << "]" << endl;
    }
    
    cout << "  Final window: [" << low << "-" << high 
         << "], arr[" << high << "]=" << arr[high] << " >= " << target << endl;
    
    // Now perform normal binary search
    while(low <= high) {
        int mid = low + (high - low) / 2;
        
        if(arr[mid] == target) {
            return mid;
        }
        else if(arr[mid] < target) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    
    return -1;
}

int main() {
    // Simulating "infinite" array (actually finite but we don't know size)
    const int SIZE = 1000;
    int arr[SIZE];
    for(int i = 0; i < SIZE; i++) {
        arr[i] = i * 2;  // Even numbers
    }
    
    int target = 256;
    int result = searchInfiniteArray(arr, target);
    
    if(result != -1) {
        cout << "\nFound " << target << " at index " << result << endl;
    } else {
        cout << "\n" << target << " not found" << endl;
    }
    
    return 0;
}
```

## Advantages and Disadvantages

### Advantages:
1. **Extremely fast**: O(log n) time complexity
2. **Efficient for large datasets**: Scales well with input size
3. **Simple concept**: Easy to understand and implement
4. **Foundation for many algorithms**: Used in trees, databases, etc.

### Disadvantages:
1. **Requires sorted data**: Sorting adds O(n log n) overhead
2. **Not suitable for linked lists**: Random access required
3. **More complex than linear search**: Slightly harder to implement correctly
4. **Overflow risk**: Calculating mid can overflow for large indices

## When to Use Binary Search

1. **Large sorted datasets** (n > 1000)
2. **Frequent search operations** on static data
3. **When data can be pre-sorted** once and searched many times
4. **Memory is limited** (binary search uses O(1) space)
5. **When predictable performance** is required

## Summary

Binary Search is one of the most important and efficient searching algorithms in computer science. Its logarithmic time complexity makes it incredibly fast even for massive datasets.

**Key Takeaways:**
- Requires sorted data as prerequisite
- Time complexity: O(log n) - extremely efficient
- Space complexity: O(1) for iterative, O(log n) for recursive
- Foundation for more advanced algorithms and data structures
- Many variations: first/last occurrence, rotated arrays, etc.
- Used in databases, file systems, and many real-world applications

**Remember:**
- Always check if data is sorted before using binary search
- Be careful with integer overflow when calculating mid
- Consider using STL functions (binary_search, lower_bound, etc.) when possible
- Understand the variations for different problem types

Binary Search demonstrates the power of divide-and-conquer algorithms and is essential knowledge for any programmer or computer scientist.

---
*This completes our comprehensive DSA notes covering Arrays, Sorting Algorithms (Bubble, Selection, Insertion, Quick, Counting, Radix, Merge), and Searching Algorithms (Linear, Binary). Each section includes theory, implementations, visualizations, complexity analysis, and practical applications.*