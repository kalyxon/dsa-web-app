
# Time Complexity

Time Complexity is a fundamental concept in computer science that describes the amount of computational time an algorithm takes to run as a function of the input size. It provides a theoretical estimate of the time required for an algorithm to complete, helping us understand and compare the efficiency of different algorithms.

## Introduction to Time Complexity

Time complexity is typically expressed using Big O notation, which describes the upper bound of growth rate as input size increases. We focus on the worst-case scenario to guarantee performance under any condition.

### Common Time Complexities

```cpp
#include <iostream>
#include <vector>
#include <chrono>
#include <algorithm>
using namespace std;
using namespace std::chrono;

// Function to demonstrate different time complexities
void demonstrateComplexities() {
    cout << "Common Time Complexities:\n" << endl;
    cout << "O(1)     - Constant Time:      Accessing array element" << endl;
    cout << "O(log n) - Logarithmic Time:   Binary search" << endl;
    cout << "O(n)     - Linear Time:        Linear search" << endl;
    cout << "O(n log n) - Linearithmic:     Merge sort, Quick sort" << endl;
    cout << "O(n²)    - Quadratic Time:     Bubble sort, Selection sort" << endl;
    cout << "O(2ⁿ)    - Exponential Time:   Fibonacci recursive" << endl;
    cout << "O(n!)    - Factorial Time:     Traveling salesman brute force\n" << endl;
}

// Example: O(1) Constant Time
void constantTime(int arr[], int index) {
    // Accessing array element takes constant time
    cout << "Element at index " << index << ": " << arr[index] << " (O(1) operation)" << endl;
}

// Example: O(n) Linear Time
void linearTime(int arr[], int n, int target) {
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            cout << "Found " << target << " at index " << i << " (O(n) operation)" << endl;
            return;
        }
    }
    cout << target << " not found (O(n) operation)" << endl;
}

// Example: O(n²) Quadratic Time
void quadraticTime(int arr[], int n) {
    int comparisons = 0;
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            comparisons++;
        }
    }
    cout << "Performed " << comparisons << " comparisons (O(n²) operation)" << endl;
}
```

### Why Time Complexity Matters

```cpp
#include <iostream>
#include <cmath>
using namespace std;

void compareComplexities() {
    cout << "\n=== Growth Rate Comparison ===\n" << endl;
    cout << "Input Size | O(1) | O(log n) | O(n) | O(n log n) | O(n²) | O(2ⁿ)" << endl;
    cout << "-----------|------|----------|------|------------|-------|------" << endl;
    
    int sizes[] = {10, 100, 1000, 10000};
    
    for(int n : sizes) {
        cout << n << "\t   | 1";
        cout << "\t   | " << (int)log2(n);
        cout << "\t    | " << n;
        cout << "\t| " << (int)(n * log2(n));
        cout << "\t     | " << n * n;
        cout << "\t| " << (long long)pow(2, n) << endl;
    }
    
    cout << "\nKey Insight: As n grows, efficient algorithms make huge differences!" << endl;
}
```

## Bubble Sort

**Time Complexity:** O(n²) in worst and average cases, O(n) in best case (already sorted)

### Implementation with Time Analysis

```cpp
#include <iostream>
#include <vector>
#include <chrono>
using namespace std;
using namespace std::chrono;

void bubbleSort(int arr[], int n) {
    long long comparisons = 0;
    long long swaps = 0;
    
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            comparisons++;
            if(arr[j] > arr[j+1]) {
                swaps++;
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    
    cout << "Bubble Sort completed with:" << endl;
    cout << "Comparisons: " << comparisons << " (≈ n²/2 = " << (n*n)/2 << ")" << endl;
    cout << "Swaps: " << swaps << endl;
    cout << "Time Complexity: O(n²)" << endl;
}

void optimizedBubbleSort(int arr[], int n) {
    long long comparisons = 0;
    long long swaps = 0;
    bool swapped;
    
    for(int i = 0; i < n-1; i++) {
        swapped = false;
        for(int j = 0; j < n-i-1; j++) {
            comparisons++;
            if(arr[j] > arr[j+1]) {
                swaps++;
                swap(arr[j], arr[j+1]);
                swapped = true;
            }
        }
        if(!swapped) break; // Early termination
    }
    
    cout << "\nOptimized Bubble Sort completed with:" << endl;
    cout << "Comparisons: " << comparisons << endl;
    cout << "Swaps: " << swaps << endl;
    cout << "Best Case Time: O(n) when already sorted" << endl;
    cout << "Average/Worst Case Time: O(n²)" << endl;
}
```

**Complexity Analysis:**
- **Worst Case (Reverse Sorted):** O(n²) comparisons and swaps
- **Average Case:** O(n²)
- **Best Case (Already Sorted):** O(n) comparisons, O(1) swaps
- **Space Complexity:** O(1) - In-place sorting

## Selection Sort

**Time Complexity:** O(n²) in all cases (best, average, worst)

### Implementation with Time Analysis

```cpp
#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    long long comparisons = 0;
    long long swaps = 0;
    
    cout << "\n=== Selection Sort Process ===" << endl;
    
    for(int i = 0; i < n-1; i++) {
        int minIndex = i;
        
        // Find minimum in unsorted part
        for(int j = i+1; j < n; j++) {
            comparisons++;
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap if needed
        if(minIndex != i) {
            swaps++;
            swap(arr[i], arr[minIndex]);
        }
        
        cout << "Pass " << i+1 << ": Comparisons = " << comparisons 
             << ", Swaps = " << swaps << endl;
    }
    
    cout << "\nTotal Comparisons: " << comparisons << " (n*(n-1)/2 = " 
         << (n*(n-1))/2 << ")" << endl;
    cout << "Total Swaps: " << swaps << " (n-1 at maximum)" << endl;
    cout << "Time Complexity: Always O(n²)" << endl;
    cout << "Space Complexity: O(1)" << endl;
}
```

**Complexity Analysis:**
- **Comparisons:** Always n(n-1)/2 = O(n²)
- **Swaps:** At most n-1 = O(n)
- **Best/Worst/Average Case:** All O(n²) for comparisons
- **Advantage:** Minimal swaps compared to Bubble Sort

## Insertion Sort

**Time Complexity:** O(n²) worst/average, O(n) best case

### Implementation with Time Analysis

```cpp
#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
    long long comparisons = 0;
    long long shifts = 0;
    
    cout << "\n=== Insertion Sort Process ===" << endl;
    
    for(int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while(j >= 0) {
            comparisons++;
            if(arr[j] > key) {
                arr[j + 1] = arr[j];
                shifts++;
                j--;
            } else {
                break;
            }
        }
        arr[j + 1] = key;
        
        cout << "After iteration " << i << ": Comparisons = " << comparisons 
             << ", Shifts = " << shifts << endl;
    }
    
    cout << "\nTotal Comparisons: " << comparisons << endl;
    cout << "Total Shifts: " << shifts << endl;
    cout << "Best Case (sorted): O(n) comparisons, O(1) shifts" << endl;
    cout << "Worst Case (reverse sorted): O(n²) comparisons and shifts" << endl;
    cout << "Average Case: O(n²)" << endl;
    cout << "Space Complexity: O(1)" << endl;
}
```

**Complexity Analysis:**
- **Best Case (Sorted Array):** O(n) comparisons, O(1) shifts
- **Worst Case (Reverse Sorted):** O(n²) comparisons and shifts
- **Average Case:** O(n²)
- **Stable:** Yes (maintains relative order)
- **Adaptive:** Performs better on partially sorted arrays

## Quick Sort

**Time Complexity:** O(n log n) average, O(n²) worst case

### Implementation with Time Analysis

```cpp
#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

long long comparisons = 0;
long long swaps = 0;

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for(int j = low; j < high; j++) {
        comparisons++;
        if(arr[j] <= pivot) {
            i++;
            swaps++;
            swap(arr[i], arr[j]);
        }
    }
    swaps++;
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

int randomizedPartition(int arr[], int low, int high) {
    // Random pivot reduces chance of worst case
    int random = low + rand() % (high - low + 1);
    swap(arr[random], arr[high]);
    return partition(arr, low, high);
}

void quickSort(int arr[], int low, int high, bool randomized = false) {
    if(low < high) {
        int pi;
        if(randomized) {
            pi = randomizedPartition(arr, low, high);
        } else {
            pi = partition(arr, low, high);
        }
        
        quickSort(arr, low, pi - 1, randomized);
        quickSort(arr, pi + 1, high, randomized);
    }
}

void analyzeQuickSort() {
    srand(time(0));
    
    // Worst case array (already sorted)
    int worstArr[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int n = 8;
    
    cout << "\n=== Quick Sort Analysis ===" << endl;
    
    // Reset counters
    comparisons = 0;
    swaps = 0;
    
    cout << "\nWorst Case (Sorted Array):" << endl;
    quickSort(worstArr, 0, n-1, false);
    cout << "Comparisons: " << comparisons << " (n²/2 = " << (n*n)/2 << ")" << endl;
    cout << "Swaps: " << swaps << endl;
    cout << "Time Complexity: O(n²)" << endl;
    
    // Random array for average case
    int avgArr[] = {3, 7, 1, 8, 4, 2, 6, 5};
    comparisons = 0;
    swaps = 0;
    
    cout << "\nAverage Case (Random Array):" << endl;
    quickSort(avgArr, 0, n-1, true);
    cout << "Comparisons: " << comparisons << " (≈ n log n = " << n * (int)log2(n) << ")" << endl;
    cout << "Swaps: " << swaps << endl;
    cout << "Time Complexity: O(n log n)" << endl;
    
    cout << "\nKey Points:" << endl;
    cout << "1. Average Case: O(n log n)" << endl;
    cout << "2. Worst Case: O(n²) when pivot is smallest/largest" << endl;
    cout << "3. Randomized pivot helps avoid worst case" << endl;
    cout << "4. Space Complexity: O(log n) for recursion stack" << endl;
}
```

**Complexity Analysis:**
- **Best Case:** O(n log n) - balanced partitions
- **Average Case:** O(n log n)
- **Worst Case:** O(n²) - unbalanced partitions
- **Space Complexity:** O(log n) average, O(n) worst for recursion stack

## Counting Sort

**Time Complexity:** O(n + k) where k is range of input

### Implementation with Time Analysis

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(int arr[], int n) {
    cout << "\n=== Counting Sort ===" << endl;
    
    // Find range
    int maxVal = *max_element(arr, arr + n);
    int minVal = *min_element(arr, arr + n);
    int range = maxVal - minVal + 1;
    
    cout << "Input Range: " << minVal << " to " << maxVal << endl;
    cout << "Range size (k): " << range << endl;
    
    vector<int> count(range, 0);
    vector<int> output(n);
    
    // Count occurrences
    long long operations = 0;
    for(int i = 0; i < n; i++) {
        count[arr[i] - minVal]++;
        operations++;
    }
    cout << "Counting phase operations: " << operations << " (O(n))" << endl;
    
    // Cumulative count
    operations = 0;
    for(int i = 1; i < range; i++) {
        count[i] += count[i-1];
        operations++;
    }
    cout << "Cumulative count operations: " << operations << " (O(k))" << endl;
    
    // Build output array
    operations = 0;
    for(int i = n-1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
        operations++;
    }
    cout << "Building output operations: " << operations << " (O(n))" << endl;
    
    // Copy back
    for(int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
    
    cout << "\nTotal Time Complexity: O(n + k)" << endl;
    cout << "When k = O(n), time is O(n)" << endl;
    cout << "Space Complexity: O(n + k)" << endl;
    cout << "Stable: Yes" << endl;
}
```

**Complexity Analysis:**
- **Time Complexity:** O(n + k) where k is range of input
- **Space Complexity:** O(n + k)
- **Best Use Case:** When k = O(n) - small range integers
- **Stable:** Yes
- **Not Comparison Based:** Doesn't use comparisons

## Radix Sort

**Time Complexity:** O(d × (n + b)) where d is digits, b is base

### Implementation with Time Analysis

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Get digit at position (1s, 10s, 100s, etc.)
int getDigit(int num, int position) {
    for(int i = 0; i < position; i++) {
        num /= 10;
    }
    return num % 10;
}

// Get maximum number of digits
int getMaxDigits(int arr[], int n) {
    int maxNum = *max_element(arr, arr + n);
    int digits = 0;
    while(maxNum > 0) {
        digits++;
        maxNum /= 10;
    }
    return digits;
}

void radixSort(int arr[], int n) {
    cout << "\n=== Radix Sort ===" << endl;
    
    int maxDigits = getMaxDigits(arr, n);
    cout << "Maximum digits: " << maxDigits << endl;
    
    long long totalOperations = 0;
    
    for(int digitPos = 0; digitPos < maxDigits; digitPos++) {
        vector<vector<int>> buckets(10);
        long long operations = 0;
        
        // Distribute numbers into buckets
        for(int i = 0; i < n; i++) {
            int digit = getDigit(arr[i], digitPos);
            buckets[digit].push_back(arr[i]);
            operations++;
        }
        
        // Collect from buckets
        int index = 0;
        for(int d = 0; d < 10; d++) {
            for(int num : buckets[d]) {
                arr[index++] = num;
                operations++;
            }
        }
        
        cout << "Digit position " << digitPos << ": " << operations << " operations" << endl;
        totalOperations += operations;
    }
    
    cout << "\nTotal Operations: " << totalOperations << endl;
    cout << "Time Complexity: O(d × (n + b))" << endl;
    cout << "Where: d = " << maxDigits << " digits, n = " << n 
         << " elements, b = 10 (decimal base)" << endl;
    cout << "When d is constant and b = O(n): O(n)" << endl;
    cout << "Space Complexity: O(n + b)" << endl;
}
```

**Complexity Analysis:**
- **Time Complexity:** O(d × (n + b))
- **Space Complexity:** O(n + b)
- **Best Use Case:** Fixed-length integer keys
- **Stable:** Yes (when counting sort is used for digit sorting)
- **LSD vs MSD:** LSD (Least Significant Digit) is more common

## Merge Sort

**Time Complexity:** O(n log n) in all cases

### Implementation with Time Analysis

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long comparisons = 0;
long long merges = 0;

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    // Copy data
    for(int i = 0; i < n1; i++) L[i] = arr[left + i];
    for(int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    // Merge
    int i = 0, j = 0, k = left;
    
    while(i < n1 && j < n2) {
        comparisons++;
        if(L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining
    while(i < n1) {
        arr[k] = L[i];
        i++; k++;
    }
    while(j < n2) {
        arr[k] = R[j];
        j++; k++;
    }
    
    merges++;
}

void mergeSort(int arr[], int left, int right) {
    if(left >= right) return;
    
    int mid = left + (right - left) / 2;
    
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void analyzeMergeSort() {
    cout << "\n=== Merge Sort Analysis ===" << endl;
    
    // Reset counters
    comparisons = 0;
    merges = 0;
    
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr)/sizeof(arr[0]);
    
    cout << "Array size: " << n << endl;
    cout << "Theoretical comparisons: n log n = " 
         << n * (int)log2(n) << " to " << n * (int)log2(n) * 2 << endl;
    
    mergeSort(arr, 0, n-1);
    
    cout << "\nActual Results:" << endl;
    cout << "Comparisons: " << comparisons << endl;
    cout << "Merge operations: " << merges << endl;
    
    cout << "\nTime Complexity Analysis:" << endl;
    cout << "Recurrence Relation: T(n) = 2T(n/2) + O(n)" << endl;
    cout << "Using Master Theorem: O(n log n)" << endl;
    cout << "Best/Worst/Average Case: All O(n log n)" << endl;
    cout << "Space Complexity: O(n) for temporary arrays" << endl;
    cout << "Stable: Yes" << endl;
}
```

**Complexity Analysis:**
- **Time Complexity:** Always O(n log n)
- **Space Complexity:** O(n) auxiliary space
- **Stable:** Yes
- **Parallelizable:** Yes (divide and conquer nature)
- **Not In-place:** Requires extra memory

## Linear Search

**Time Complexity:** O(n) worst/average, O(1) best case

### Implementation with Time Analysis

```cpp
#include <iostream>
#include <vector>
#include <ctime>
#include <cstdlib>
using namespace std;

void linearSearchAnalysis() {
    cout << "\n=== Linear Search Analysis ===" << endl;
    
    srand(time(0));
    
    // Create arrays of different sizes
    int sizes[] = {100, 1000, 10000, 100000};
    
    cout << "\nSize\tBest Case\tWorst Case\tAverage Case" << endl;
    cout << "----\t----------\t-----------\t------------" << endl;
    
    for(int size : sizes) {
        vector<int> arr(size);
        
        // Fill with random numbers
        for(int i = 0; i < size; i++) {
            arr[i] = rand() % 1000000;
        }
        
        // Best case: search for first element
        int bestCaseKey = arr[0];
        long long comparisons = 0;
        for(int i = 0; i < size; i++) {
            comparisons++;
            if(arr[i] == bestCaseKey) break;
        }
        int bestCaseComp = comparisons;
        
        // Worst case: search for non-existent element
        comparisons = 0;
        int worstCaseKey = -1; // Not in array
        for(int i = 0; i < size; i++) {
            comparisons++;
            if(arr[i] == worstCaseKey) break;
        }
        int worstCaseComp = comparisons;
        
        // Average case: search random element
        comparisons = 0;
        int avgKey = arr[rand() % size];
        for(int i = 0; i < size; i++) {
            comparisons++;
            if(arr[i] == avgKey) break;
        }
        int avgCaseComp = comparisons;
        
        cout << size << "\t" << bestCaseComp << "\t\t" 
             << worstCaseComp << "\t\t" << avgCaseComp << endl;
    }
    
    cout << "\nTime Complexity Summary:" << endl;
    cout << "Best Case (element at front): O(1)" << endl;
    cout << "Worst Case (element at end or not present): O(n)" << endl;
    cout << "Average Case: O(n)" << endl;
    cout << "Space Complexity: O(1)" << endl;
}
```

**Complexity Analysis:**
- **Best Case:** O(1) - element at first position
- **Worst Case:** O(n) - element at last position or not found
- **Average Case:** O(n) - element somewhere in middle
- **Space Complexity:** O(1)
- **Use Case:** Unsorted or small datasets

## Binary Search

**Time Complexity:** O(log n) worst/average, O(1) best case

### Implementation with Time Analysis

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

void binarySearchAnalysis() {
    cout << "\n=== Binary Search Analysis ===" << endl;
    
    // Demonstrate logarithmic growth
    cout << "\nSize (n)\tlog₂(n)\tMaximum Comparisons" << endl;
    cout << "--------\t-------\t-------------------" << endl;
    
    int sizes[] = {10, 100, 1000, 10000, 100000, 1000000};
    
    for(int size : sizes) {
        int maxComparisons = (int)log2(size) + 1;
        cout << size << "\t\t" << (int)log2(size) << "\t" << maxComparisons << endl;
    }
    
    // Interactive binary search with step counting
    cout << "\n=== Binary Search Demonstration ===" << endl;
    
    vector<int> sortedArray;
    for(int i = 0; i < 100; i++) {
        sortedArray.push_back(i * 2); // Even numbers 0-198
    }
    
    int target = 86;
    cout << "Searching for " << target << " in sorted array of 100 elements" << endl;
    
    int left = 0, right = sortedArray.size() - 1;
    int steps = 0;
    bool found = false;
    
    while(left <= right) {
        steps++;
        int mid = left + (right - left) / 2;
        
        cout << "Step " << steps << ": ";
        cout << "Search range [" << sortedArray[left] << "..." << sortedArray[right] << "]";
        cout << ", Mid index = " << mid << ", Value = " << sortedArray[mid] << endl;
        
        if(sortedArray[mid] == target) {
            cout << "Found at index " << mid << " in " << steps << " steps!" << endl;
            found = true;
            break;
        } else if(sortedArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    if(!found) {
        cout << "Not found after " << steps << " steps." << endl;
    }
    
    cout << "\nTime Complexity Analysis:" << endl;
    cout << "Recurrence: T(n) = T(n/2) + O(1)" << endl;
    cout << "Solution: O(log n)" << endl;
    cout << "Best Case: O(1) - middle element" << endl;
    cout << "Worst/Average Case: O(log n)" << endl;
    cout << "Space Complexity:" << endl;
    cout << "  Iterative: O(1)" << endl;
    cout << "  Recursive: O(log n) for call stack" << endl;
    cout << "Prerequisite: Array must be sorted" << endl;
}
```

### Iterative vs Recursive Binary Search

```cpp
#include <iostream>
using namespace std;

// Iterative Binary Search
int binarySearchIterative(int arr[], int n, int target, int& comparisons) {
    int left = 0, right = n - 1;
    
    while(left <= right) {
        comparisons++;
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) {
            return mid;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Recursive Binary Search
int binarySearchRecursive(int arr[], int left, int right, int target, int& comparisons) {
    comparisons++;
    if(left > right) return -1;
    
    int mid = left + (right - left) / 2;
    
    if(arr[mid] == target) {
        return mid;
    } else if(arr[mid] < target) {
        return binarySearchRecursive(arr, mid + 1, right, target, comparisons);
    } else {
        return binarySearchRecursive(arr, left, mid - 1, target, comparisons);
    }
}

void compareBinarySearchMethods() {
    cout << "\n=== Iterative vs Recursive Binary Search ===" << endl;
    
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91};
    int n = sizeof(arr)/sizeof(arr[0]);
    int target = 23;
    
    int iterComp = 0, recurComp = 0;
    
    int iterResult = binarySearchIterative(arr, n, target, iterComp);
    int recurResult = binarySearchRecursive(arr, 0, n-1, target, recurComp);
    
    cout << "Array size: " << n << endl;
    cout << "Target: " << target << endl;
    cout << "\nIterative Search:" << endl;
    cout << "  Found at index: " << iterResult << endl;
    cout << "  Comparisons: " << iterComp << endl;
    cout << "  Space: O(1)" << endl;
    
    cout << "\nRecursive Search:" << endl;
    cout << "  Found at index: " << recurResult << endl;
    cout << "  Comparisons: " << recurComp << endl;
    cout << "  Space: O(log n) for call stack" << endl;
    
    cout << "\nBoth have O(log n) time complexity!" << endl;
}
```

## Comprehensive Comparison Table

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

void comparisonTable() {
    cout << "\n=== Sorting Algorithms Comparison ===" << endl;
    cout << "\nAlgorithm\t\tBest\t\tAverage\t\tWorst\t\tSpace\tStable" << endl;
    cout << "---------\t\t----\t\t-------\t\t-----\t\t-----\t-----" << endl;
    
    cout << left;
    cout << setw(20) << "Bubble Sort" << setw(12) << "O(n)" << setw(12) << "O(n²)" 
         << setw(12) << "O(n²)" << setw(12) << "O(1)" << "Yes" << endl;
    
    cout << setw(20) << "Selection Sort" << setw(12) << "O(n²)" << setw(12) << "O(n²)" 
         << setw(12) << "O(n²)" << setw(12) << "O(1)" << "No" << endl;
    
    cout << setw(20) << "Insertion Sort" << setw(12) << "O(n)" << setw(12) << "O(n²)" 
         << setw(12) << "O(n²)" << setw(12) << "O(1)" << "Yes" << endl;
    
    cout << setw(20) << "Quick Sort" << setw(12) << "O(n log n)" << setw(12) << "O(n log n)" 
         << setw(12) << "O(n²)" << setw(12) << "O(log n)" << "No" << endl;
    
    cout << setw(20) << "Merge Sort" << setw(12) << "O(n log n)" << setw(12) << "O(n log n)" 
         << setw(12) << "O(n log n)" << setw(12) << "O(n)" << "Yes" << endl;
    
    cout << setw(20) << "Counting Sort" << setw(12) << "O(n + k)" << setw(12) << "O(n + k)" 
         << setw(12) << "O(n + k)" << setw(12) << "O(n + k)" << "Yes" << endl;
    
    cout << setw(20) << "Radix Sort" << setw(12) << "O(d(n + b))" << setw(12) << "O(d(n + b))" 
         << setw(12) << "O(d(n + b))" << setw(12) << "O(n + b)" << "Yes" << endl;
    
    cout << "\n=== Searching Algorithms Comparison ===" << endl;
    cout << "\nAlgorithm\t\tBest\t\tAverage\t\tWorst\t\tSpace\tRequires Sort" << endl;
    cout << "---------\t\t----\t\t-------\t\t-----\t\t-----\t-------------" << endl;
    
    cout << setw(20) << "Linear Search" << setw(12) << "O(1)" << setw(12) << "O(n)" 
         << setw(12) << "O(n)" << setw(12) << "O(1)" << "No" << endl;
    
    cout << setw(20) << "Binary Search" << setw(12) << "O(1)" << setw(12) << "O(log n)" 
         << setw(12) << "O(log n)" << setw(12) << "O(1)" << "Yes" << endl;
}
```

## Practical Guidelines for Algorithm Selection

```cpp
#include <iostream>
using namespace std;

void algorithmSelectionGuide() {
    cout << "\n=== Algorithm Selection Guide ===" << endl;
    
    cout << "\nWhen to use which sorting algorithm:\n" << endl;
    
    cout << "1. Small datasets (< 100 elements):" << endl;
    cout << "   - Insertion Sort (simple, stable, good for nearly sorted)" << endl;
    cout << "   - Bubble Sort (educational purposes only)" << endl;
    
    cout << "\n2. Medium to large datasets:" << endl;
    cout << "   - Quick Sort (general purpose, fastest average case)" << endl;
    cout << "   - Merge Sort (stable, predictable O(n log n), good for linked lists)" << endl;
    
    cout << "\n3. Special cases:" << endl;
    cout << "   - Counting Sort (small integer range, k = O(n))" << endl;
    cout << "   - Radix Sort (fixed-length integer keys)" << endl;
    cout << "   - Selection Sort (when swaps are expensive)" << endl;
    
    cout << "\nWhen to use which searching algorithm:\n" << endl;
    
    cout << "1. Unsorted array:" << endl;
    cout << "   - Linear Search (only option)" << endl;
    
    cout << "\n2. Sorted array:" << endl;
    cout << "   - Binary Search (most efficient, O(log n))" << endl;
    cout << "   - Linear Search (if array is small)" << endl;
    
    cout << "\n3. Multiple searches:" << endl;
    cout << "   - Sort first (O(n log n)), then binary search (O(log n) each)" << endl;
    cout << "   - Only beneficial if performing many searches" << endl;
}
```

## Complexity Classes Visualization

```cpp
#include <iostream>
#include <cmath>
using namespace std;

void complexityGraph() {
    cout << "\n=== Complexity Growth Visualization ===\n" << endl;
    cout << "n\tO(1)\tO(log n)\tO(n)\tO(n log n)\tO(n²)\tO(2ⁿ)" << endl;
    cout << "-\t----\t--------\t----\t---------\t----\t----" << endl;
    
    for(int n = 2; n <= 32; n *= 2) {
        cout << n << "\t1";
        cout << "\t" << (int)log2(n);
        cout << "\t\t" << n;
        cout << "\t" << (int)(n * log2(n));
        cout << "\t\t" << n * n;
        
        if(pow(2, n) > 1000000) {
            cout << "\t>1M";
        } else {
            cout << "\t" << (int)pow(2, n);
        }
        cout << endl;
    }
    
    cout << "\nTakeaway: Exponential algorithms become impractical quickly!" << endl;
}
```

## Time Complexity in Practice

```cpp
#include <iostream>
#include <chrono>
#include <vector>
#include <algorithm>
using namespace std;
using namespace std::chrono;

void practicalTiming() {
    cout << "\n=== Practical Timing Examples ===" << endl;
    
    // Test different algorithms with increasing sizes
    vector<int> sizes = {1000, 10000, 50000};
    
    for(int size : sizes) {
        cout << "\nArray size: " << size << endl;
        
        // Generate random array
        vector<int> arr(size);
        for(int i = 0; i < size; i++) {
            arr[i] = rand() % 100000;
        }
        
        // Test Linear Search (worst case)
        auto start = high_resolution_clock::now();
        linearSearch(arr.data(), size, -1); // Search for non-existent
        auto stop = high_resolution_clock::now();
        auto duration = duration_cast<microseconds>(stop - start);
        cout << "Linear Search: " << duration.count() << " μs (O(n))" << endl;
        
        // Sort array for binary search
        sort(arr.begin(), arr.end());
        
        // Test Binary Search
        start = high_resolution_clock::now();
        binary_search(arr.begin(), arr.end(), -1); // Search for non-existent
        stop = high_resolution_clock::now();
        duration = duration_cast<microseconds>(stop - start);
        cout << "Binary Search: " << duration.count() << " μs (O(log n))" << endl;
        
        // The difference grows dramatically with size!
    }
}
```

## Key Takeaways

1. **Time Complexity Matters**: The difference between O(n²) and O(n log n) is huge for large n
2. **Know Your Data**: Choose algorithms based on data characteristics (sorted, range, size)
3. **Best/Worst Cases**: Consider both for critical applications
4. **Space vs Time**: Often trade space for time (e.g., counting sort)
5. **Practical vs Theoretical**: Real-world performance depends on constants, cache, etc.

Understanding time complexity is essential for writing efficient code and is a fundamental skill for every programmer and computer scientist.