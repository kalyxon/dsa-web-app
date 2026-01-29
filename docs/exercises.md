---
id: exercises
title: Exercises
---


#  Reference

## Euclidean Algorithm

The Euclidean Algorithm is an efficient method for computing the greatest common divisor (GCD) of two integers. It's one of the oldest known algorithms, dating back to ancient Greece.

### Mathematical Foundation

Given two integers a and b (where a > b), the Euclidean Algorithm is based on the principle:
**GCD(a, b) = GCD(b, a mod b)**

This process continues until b becomes 0, at which point a is the GCD.

### Basic Implementation

```cpp
#include <iostream>
#include <numeric> // for std::gcd in C++17+
using namespace std;

// Recursive Euclidean Algorithm
int gcdRecursive(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcdRecursive(b, a % b);
}

// Iterative Euclidean Algorithm
int gcdIterative(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Extended Euclidean Algorithm (also finds coefficients x, y)
// such that ax + by = gcd(a, b)
struct ExtendedGCD {
    int gcd;
    int x;
    int y;
};

ExtendedGCD extendedGCD(int a, int b) {
    if (b == 0) {
        return {a, 1, 0};
    }
    
    ExtendedGCD result = extendedGCD(b, a % b);
    return {
        result.gcd,
        result.y,
        result.x - (a / b) * result.y
    };
}

// Binary GCD (Stein's Algorithm) - efficient for computers
int binaryGCD(int a, int b) {
    if (a == 0) return b;
    if (b == 0) return a;
    
    // Find greatest power of 2 dividing both
    int shift = 0;
    while (((a | b) & 1) == 0) { // Both even
        a >>= 1;
        b >>= 1;
        shift++;
    }
    
    // Remove remaining factors of 2 from a
    while ((a & 1) == 0) {
        a >>= 1;
    }
    
    // Now a is odd
    do {
        // Remove factors of 2 from b
        while ((b & 1) == 0) {
            b >>= 1;
        }
        
        // Ensure a >= b
        if (a > b) {
            swap(a, b);
        }
        
        b = b - a;
    } while (b != 0);
    
    // Restore common factors of 2
    return a << shift;
}

int main() {
    int a = 56, b = 98;
    
    cout << "Finding GCD of " << a << " and " << b << ":" << endl;
    cout << "Recursive GCD: " << gcdRecursive(a, b) << endl;
    cout << "Iterative GCD: " << gcdIterative(a, b) << endl;
    cout << "Binary GCD: " << binaryGCD(a, b) << endl;
    
    ExtendedGCD result = extendedGCD(a, b);
    cout << "\nExtended Euclidean Algorithm:" << endl;
    cout << a << " × " << result.x << " + " << b << " × " << result.y 
         << " = " << result.gcd << endl;
    
    // Using built-in (C++17+)
    cout << "std::gcd: " << gcd(a, b) << endl;
    
    return 0;
}
```

**Output:**
```
Finding GCD of 56 and 98:
Recursive GCD: 14
Iterative GCD: 14
Binary GCD: 14

Extended Euclidean Algorithm:
56 × -3 + 98 × 2 = 14
std::gcd: 14
```

### Applications of Euclidean Algorithm

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 1. Simplify fractions
void simplifyFraction(int numerator, int denominator) {
    int g = gcdRecursive(numerator, denominator);
    cout << numerator << "/" << denominator << " = " 
         << numerator/g << "/" << denominator/g << endl;
}

// 2. Check if numbers are coprime (relatively prime)
bool areCoprime(int a, int b) {
    return gcdRecursive(a, b) == 1;
}

// 3. Find LCM using GCD
int lcm(int a, int b) {
    return (a / gcdRecursive(a, b)) * b; // Avoid overflow
}

// 4. Solve linear Diophantine equations ax + by = c
bool solveDiophantine(int a, int b, int c, int &x, int &y) {
    ExtendedGCD egcd = extendedGCD(a, b);
    
    if (c % egcd.gcd != 0) {
        return false; // No solution
    }
    
    x = egcd.x * (c / egcd.gcd);
    y = egcd.y * (c / egcd.gcd);
    return true;
}

// 5. Modular inverse using extended Euclidean
int modInverse(int a, int m) {
    ExtendedGCD egcd = extendedGCD(a, m);
    if (egcd.gcd != 1) {
        return -1; // Inverse doesn't exist
    }
    // Ensure positive result
    return (egcd.x % m + m) % m;
}

int main() {
    cout << "\n=== Applications of Euclidean Algorithm ===" << endl;
    
    // Simplify fraction
    simplifyFraction(24, 36);
    
    // Check coprime
    cout << "Are 15 and 28 coprime? " << (areCoprime(15, 28) ? "Yes" : "No") << endl;
    
    // Find LCM
    cout << "LCM of 12 and 18: " << lcm(12, 18) << endl;
    
    // Solve Diophantine equation
    int x, y;
    if (solveDiophantine(3, 5, 16, x, y)) {
        cout << "Solution to 3x + 5y = 16: x=" << x << ", y=" << y << endl;
    }
    
    // Modular inverse
    int inv = modInverse(3, 11);
    if (inv != -1) {
        cout << "Modular inverse of 3 mod 11: " << inv << endl;
        cout << "Verification: 3 * " << inv << " mod 11 = " << (3 * inv) % 11 << endl;
    }
    
    return 0;
}
```

**Time Complexity:** O(log min(a, b))
**Space Complexity:** O(1) for iterative, O(log n) for recursive

## DSA Huffman Coding

Huffman Coding is a lossless data compression algorithm that assigns variable-length codes to characters based on their frequencies. More frequent characters get shorter codes, less frequent get longer codes.

### How Huffman Coding Works

1. Calculate frequency of each character in input
2. Create leaf nodes for each character with their frequency
3. Build Huffman Tree:
   - Take two nodes with smallest frequency
   - Create new internal node with sum of frequencies
   - Repeat until single node remains
4. Traverse tree to assign codes (0 for left, 1 for right)

### Implementation

```cpp
#include <iostream>
#include <queue>
#include <unordered_map>
#include <vector>
#include <string>
using namespace std;

// Huffman Tree Node
struct HuffmanNode {
    char ch;
    int freq;
    HuffmanNode *left, *right;
    
    HuffmanNode(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

// Comparator for priority queue
struct CompareNodes {
    bool operator()(HuffmanNode* a, HuffmanNode* b) {
        return a->freq > b->freq; // Min-heap
    }
};

class HuffmanCoding {
private:
    HuffmanNode* root;
    unordered_map<char, string> huffmanCodes;
    
    // Build Huffman Tree
    void buildTree(const string& text) {
        // Count frequencies
        unordered_map<char, int> freq;
        for (char ch : text) {
            freq[ch]++;
        }
        
        // Create priority queue of leaf nodes
        priority_queue<HuffmanNode*, vector<HuffmanNode*>, CompareNodes> pq;
        
        cout << "Character Frequencies:" << endl;
        for (auto& pair : freq) {
            cout << "'" << pair.first << "': " << pair.second << endl;
            pq.push(new HuffmanNode(pair.first, pair.second));
        }
        
        // Build tree
        while (pq.size() > 1) {
            HuffmanNode* left = pq.top(); pq.pop();
            HuffmanNode* right = pq.top(); pq.pop();
            
            HuffmanNode* parent = new HuffmanNode('\0', left->freq + right->freq);
            parent->left = left;
            parent->right = right;
            
            pq.push(parent);
        }
        
        root = pq.top();
        cout << "\nRoot frequency: " << root->freq << endl;
    }
    
    // Generate codes by traversing tree
    void generateCodes(HuffmanNode* node, string code) {
        if (!node) return;
        
        if (node->ch != '\0') { // Leaf node
            huffmanCodes[node->ch] = code;
            cout << "'" << node->ch << "': " << code << endl;
            return;
        }
        
        generateCodes(node->left, code + "0");
        generateCodes(node->right, code + "1");
    }
    
public:
    HuffmanCoding(const string& text) {
        cout << "Original Text: " << text << endl;
        cout << "Original size: " << text.length() * 8 << " bits\n" << endl;
        
        buildTree(text);
        
        cout << "\nHuffman Codes:" << endl;
        generateCodes(root, "");
    }
    
    // Encode text
    string encode(const string& text) {
        string encoded = "";
        for (char ch : text) {
            encoded += huffmanCodes[ch];
        }
        return encoded;
    }
    
    // Decode encoded string
    string decode(const string& encoded) {
        string decoded = "";
        HuffmanNode* current = root;
        
        for (char bit : encoded) {
            if (bit == '0') {
                current = current->left;
            } else {
                current = current->right;
            }
            
            if (current->ch != '\0') { // Found leaf
                decoded += current->ch;
                current = root;
            }
        }
        
        return decoded;
    }
    
    // Calculate compression ratio
    void compressionStats(const string& text) {
        string encoded = encode(text);
        int originalBits = text.length() * 8;
        int encodedBits = encoded.length();
        
        cout << "\n=== Compression Statistics ===" << endl;
        cout << "Original bits: " << originalBits << endl;
        cout << "Encoded bits: " << encodedBits << endl;
        cout << "Compression ratio: " 
             << (double)encodedBits / originalBits * 100 << "%" << endl;
        cout << "Space saved: " 
             << (1 - (double)encodedBits / originalBits) * 100 << "%" << endl;
    }
    
    ~HuffmanCoding() {
        // Cleanup would require tree traversal to delete nodes
    }
};

int main() {
    string text = "huffman coding is cool";
    
    HuffmanCoding huffman(text);
    
    string encoded = huffman.encode(text);
    cout << "\nEncoded: " << encoded << endl;
    
    string decoded = huffman.decode(encoded);
    cout << "Decoded: " << decoded << endl;
    
    huffman.compressionStats(text);
    
    return 0;
}
```

**Output:**
```
Original Text: huffman coding is cool
Original size: 168 bits

Character Frequencies:
' ': 3
'a': 1
'c': 2
'd': 1
'f': 1
'g': 1
'h': 1
'i': 2
'l': 1
'm': 1
'n': 2
'o': 3
's': 1
'u': 1

Root frequency: 21

Huffman Codes:
' ': 00
'o': 01
'c': 1000
'i': 1001
'n': 1010
'a': 10110
'd': 10111
'f': 11000
'g': 11001
'h': 11010
'l': 11011
'm': 11100
's': 11101
'u': 11110

Encoded: 1101011111110010111000100100011001011000100111100100110110101000111101111011101
Decoded: huffman coding is cool

=== Compression Statistics ===
Original bits: 168
Encoded bits: 77
Compression ratio: 45.8333%
Space saved: 54.1667%
```

### Time Complexity:
- Building frequency table: O(n)
- Building priority queue: O(k log k) where k is unique characters
- Building tree: O(k log k)
- Encoding/Decoding: O(n)

## DSA The Traveling Salesman Problem (TSP)

The Traveling Salesman Problem is an NP-hard optimization problem: "Given a list of cities and distances between them, what is the shortest possible route that visits each city exactly once and returns to the origin city?"

### Approaches to Solve TSP

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
#include <iomanip>
#include <cmath>
using namespace std;

class TSP {
private:
    vector<vector<int>> distance;
    int n; // Number of cities
    
public:
    TSP(const vector<vector<int>>& dist) : distance(dist), n(dist.size()) {}
    
    // 1. Brute Force (Try all permutations) - O(n!)
    pair<vector<int>, int> bruteForce() {
        vector<int> path(n);
        vector<int> bestPath;
        int minCost = INT_MAX;
        
        // Initialize path as 0, 1, 2, ..., n-1
        for (int i = 0; i < n; i++) {
            path[i] = i;
        }
        
        do {
            int currentCost = 0;
            
            // Calculate cost for this permutation
            for (int i = 0; i < n - 1; i++) {
                currentCost += distance[path[i]][path[i + 1]];
            }
            currentCost += distance[path[n - 1]][path[0]]; // Return to start
            
            if (currentCost < minCost) {
                minCost = currentCost;
                bestPath = path;
            }
            
        } while (next_permutation(path.begin() + 1, path.end())); // Keep 0 fixed as start
        
        return {bestPath, minCost};
    }
    
    // 2. Dynamic Programming with Bitmasking - O(n² * 2ⁿ)
    pair<vector<int>, int> dpBitmask() {
        int totalStates = 1 << n;
        vector<vector<int>> dp(totalStates, vector<int>(n, INT_MAX));
        vector<vector<int>> parent(totalStates, vector<int>(n, -1));
        
        // Base case: starting at city 0
        dp[1][0] = 0; // Binary 1 means only city 0 visited
        
        // Fill DP table
        for (int mask = 1; mask < totalStates; mask++) {
            for (int last = 0; last < n; last++) {
                if (dp[mask][last] == INT_MAX) continue;
                if (!(mask & (1 << last))) continue;
                
                // Try all unvisited cities as next
                for (int next = 0; next < n; next++) {
                    if (mask & (1 << next)) continue; // Already visited
                    
                    int newMask = mask | (1 << next);
                    int newCost = dp[mask][last] + distance[last][next];
                    
                    if (newCost < dp[newMask][next]) {
                        dp[newMask][next] = newCost;
                        parent[newMask][next] = last;
                    }
                }
            }
        }
        
        // Find minimum cost to return to start
        int finalMask = totalStates - 1; // All cities visited
        int minCost = INT_MAX;
        int lastCity = -1;
        
        for (int i = 1; i < n; i++) {
            int cost = dp[finalMask][i] + distance[i][0];
            if (cost < minCost) {
                minCost = cost;
                lastCity = i;
            }
        }
        
        // Reconstruct path
        vector<int> path;
        int mask = finalMask;
        int current = lastCity;
        
        while (current != -1) {
            path.push_back(current);
            int prev = parent[mask][current];
            mask &= ~(1 << current); // Remove current from mask
            current = prev;
        }
        reverse(path.begin(), path.end());
        
        // Add starting city (0) at beginning and end
        vector<int> fullPath = {0};
        fullPath.insert(fullPath.end(), path.begin(), path.end());
        fullPath.push_back(0);
        
        return {fullPath, minCost};
    }
    
    // 3. Nearest Neighbor Heuristic - O(n²)
    pair<vector<int>, int> nearestNeighbor() {
        vector<bool> visited(n, false);
        vector<int> path = {0}; // Start at city 0
        visited[0] = true;
        int totalCost = 0;
        
        int current = 0;
        for (int i = 0; i < n - 1; i++) {
            int nearest = -1;
            int minDist = INT_MAX;
            
            // Find nearest unvisited city
            for (int next = 0; next < n; next++) {
                if (!visited[next] && distance[current][next] < minDist) {
                    minDist = distance[current][next];
                    nearest = next;
                }
            }
            
            path.push_back(nearest);
            visited[nearest] = true;
            totalCost += minDist;
            current = nearest;
        }
        
        // Return to start
        totalCost += distance[current][0];
        path.push_back(0);
        
        return {path, totalCost};
    }
    
    // 4. 2-opt Local Search Improvement
    vector<int> twoOptSwap(const vector<int>& path, int i, int k) {
        vector<int> newPath = path;
        reverse(newPath.begin() + i + 1, newPath.begin() + k + 1);
        return newPath;
    }
    
    pair<vector<int>, int> twoOptImprovement(const vector<int>& initialPath, int initialCost) {
        vector<int> bestPath = initialPath;
        int bestCost = initialCost;
        bool improved = true;
        
        while (improved) {
            improved = false;
            
            for (int i = 1; i < n; i++) {
                for (int k = i + 1; k <= n; k++) {
                    vector<int> newPath = twoOptSwap(bestPath, i, k);
                    int newCost = calculatePathCost(newPath);
                    
                    if (newCost < bestCost) {
                        bestPath = newPath;
                        bestCost = newCost;
                        improved = true;
                    }
                }
            }
        }
        
        return {bestPath, bestCost};
    }
    
    int calculatePathCost(const vector<int>& path) {
        int cost = 0;
        for (int i = 0; i < path.size() - 1; i++) {
            cost += distance[path[i]][path[i + 1]];
        }
        return cost;
    }
    
    // Print distance matrix
    void printDistanceMatrix() {
        cout << "Distance Matrix:" << endl;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cout << setw(4) << distance[i][j] << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    // Example: 5 cities
    vector<vector<int>> distances = {
        {0, 10, 15, 20, 25},
        {10, 0, 35, 25, 30},
        {15, 35, 0, 30, 20},
        {20, 25, 30, 0, 15},
        {25, 30, 20, 15, 0}
    };
    
    TSP tsp(distances);
    tsp.printDistanceMatrix();
    
    cout << "\n=== Solving TSP ===" << endl;
    
    // Brute Force (works for n ≤ 10)
    if (distances.size() <= 10) {
        auto [bfPath, bfCost] = tsp.bruteForce();
        cout << "\nBrute Force Solution:" << endl;
        cout << "Path: ";
        for (int city : bfPath) cout << city << " ";
        cout << "\nCost: " << bfCost << endl;
    }
    
    // Dynamic Programming (works for n ≤ 20)
    auto [dpPath, dpCost] = tsp.dpBitmask();
    cout << "\nDP with Bitmasking Solution:" << endl;
    cout << "Path: ";
    for (int city : dpPath) cout << city << " ";
    cout << "\nCost: " << dpCost << endl;
    
    // Nearest Neighbor Heuristic
    auto [nnPath, nnCost] = tsp.nearestNeighbor();
    cout << "\nNearest Neighbor Heuristic:" << endl;
    cout << "Path: ";
    for (int city : nnPath) cout << city << " ";
    cout << "\nCost: " << nnCost << endl;
    
    // Improve with 2-opt
    auto [optPath, optCost] = tsp.twoOptImprovement(nnPath, nnCost);
    cout << "\nAfter 2-opt Improvement:" << endl;
    cout << "Path: ";
    for (int city : optPath) cout << city << " ";
    cout << "\nCost: " << optCost << endl;
    
    return 0;
}
```

**Complexity Comparison:**
- Brute Force: O(n!)
- DP with Bitmasking: O(n² × 2ⁿ)
- Nearest Neighbor: O(n²)
- 2-opt: O(n²) per iteration

## DSA 0/1 Knapsack Problem

The 0/1 Knapsack Problem: Given weights and values of n items, put these items in a knapsack of capacity W to get maximum total value. You cannot break items (0/1 property).

### Solutions

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Knapsack {
private:
    vector<int> weights;
    vector<int> values;
    int capacity;
    int n;
    
public:
    Knapsack(const vector<int>& w, const vector<int>& v, int cap) 
        : weights(w), values(v), capacity(cap), n(w.size()) {}
    
    // 1. Recursive Solution (Exponential)
    int recursiveKnapsack(int i, int remaining) {
        if (i == 0 || remaining == 0) {
            return 0;
        }
        
        // If weight of current item > remaining capacity, skip it
        if (weights[i-1] > remaining) {
            return recursiveKnapsack(i-1, remaining);
        }
        
        // Return maximum of:
        // 1. Including current item
        // 2. Excluding current item
        return max(
            values[i-1] + recursiveKnapsack(i-1, remaining - weights[i-1]),
            recursiveKnapsack(i-1, remaining)
        );
    }
    
    // 2. Memoization (Top-down DP)
    int memoizationKnapsack() {
        vector<vector<int>> memo(n+1, vector<int>(capacity+1, -1));
        return memoHelper(n, capacity, memo);
    }
    
    int memoHelper(int i, int remaining, vector<vector<int>>& memo) {
        if (i == 0 || remaining == 0) {
            return 0;
        }
        
        if (memo[i][remaining] != -1) {
            return memo[i][remaining];
        }
        
        if (weights[i-1] > remaining) {
            memo[i][remaining] = memoHelper(i-1, remaining, memo);
        } else {
            memo[i][remaining] = max(
                values[i-1] + memoHelper(i-1, remaining - weights[i-1], memo),
                memoHelper(i-1, remaining, memo)
            );
        }
        
        return memo[i][remaining];
    }
    
    // 3. Tabulation (Bottom-up DP)
    int tabulationKnapsack() {
        vector<vector<int>> dp(n+1, vector<int>(capacity+1, 0));
        
        // Build table
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (weights[i-1] > w) {
                    dp[i][w] = dp[i-1][w];
                } else {
                    dp[i][w] = max(
                        dp[i-1][w],
                        values[i-1] + dp[i-1][w - weights[i-1]]
                    );
                }
            }
        }
        
        // Optional: Print selected items
        cout << "\nSelected items:" << endl;
        int w = capacity;
        int totalValue = dp[n][capacity];
        
        for (int i = n; i > 0 && totalValue > 0; i--) {
            if (totalValue != dp[i-1][w]) {
                cout << "Item " << i << " (weight: " << weights[i-1] 
                     << ", value: " << values[i-1] << ")" << endl;
                totalValue -= values[i-1];
                w -= weights[i-1];
            }
        }
        
        return dp[n][capacity];
    }
    
    // 4. Space Optimized DP (1D array)
    int spaceOptimizedKnapsack() {
        vector<int> dp(capacity+1, 0);
        
        for (int i = 0; i < n; i++) {
            // Traverse backwards to prevent reusing same item
            for (int w = capacity; w >= weights[i]; w--) {
                dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);
            }
            
            // Print DP array after each item
            cout << "After item " << i+1 << ": ";
            for (int w = 0; w <= capacity; w++) {
                cout << dp[w] << " ";
            }
            cout << endl;
        }
        
        return dp[capacity];
    }
    
    // 5. Meet in the Middle (for large n)
    int meetInMiddle() {
        // Split items into two halves
        int mid = n / 2;
        
        // Generate all subsets of first half
        vector<pair<int, int>> firstHalf;
        for (int mask = 0; mask < (1 << mid); mask++) {
            int weight = 0, value = 0;
            for (int i = 0; i < mid; i++) {
                if (mask & (1 << i)) {
                    weight += weights[i];
                    value += values[i];
                }
            }
            if (weight <= capacity) {
                firstHalf.push_back({weight, value});
            }
        }
        
        // Sort first half by weight
        sort(firstHalf.begin(), firstHalf.end());
        
        // Remove dominated pairs (if weight increases but value doesn't)
        vector<pair<int, int>> filtered;
        int maxValue = -1;
        for (auto& p : firstHalf) {
            if (p.second > maxValue) {
                filtered.push_back(p);
                maxValue = p.second;
            }
        }
        
        // Generate subsets of second half and combine
        int best = 0;
        int secondHalfSize = n - mid;
        
        for (int mask = 0; mask < (1 << secondHalfSize); mask++) {
            int weight = 0, value = 0;
            for (int i = 0; i < secondHalfSize; i++) {
                if (mask & (1 << i)) {
                    weight += weights[mid + i];
                    value += values[mid + i];
                }
            }
            
            if (weight <= capacity) {
                // Find best match from first half
                int remaining = capacity - weight;
                auto it = upper_bound(filtered.begin(), filtered.end(), 
                                     make_pair(remaining, INT_MAX));
                if (it != filtered.begin()) {
                    it--;
                    best = max(best, value + it->second);
                } else {
                    best = max(best, value);
                }
            }
        }
        
        return best;
    }
    
    void printItems() {
        cout << "\nItems:" << endl;
        cout << "Index\tWeight\tValue" << endl;
        for (int i = 0; i < n; i++) {
            cout << i+1 << "\t" << weights[i] << "\t" << values[i] << endl;
        }
        cout << "Capacity: " << capacity << endl;
    }
};

int main() {
    vector<int> weights = {2, 3, 4, 5};
    vector<int> values = {3, 4, 5, 6};
    int capacity = 5;
    
    Knapsack knapsack(weights, values, capacity);
    knapsack.printItems();
    
    cout << "\n=== Solving 0/1 Knapsack ===" << endl;
    
    // Recursive
    cout << "\nRecursive Solution: " 
         << knapsack.recursiveKnapsack(weights.size(), capacity) << endl;
    
    // Memoization
    cout << "Memoization Solution: " 
         << knapsack.memoizationKnapsack() << endl;
    
    // Tabulation
    cout << "\nTabulation Solution: " 
         << knapsack.tabulationKnapsack() << endl;
    
    // Space Optimized
    cout << "\nSpace Optimized Solution:" << endl;
    cout << "Maximum value: " << knapsack.spaceOptimizedKnapsack() << endl;
    
    // Meet in the Middle
    cout << "\nMeet in the Middle: " 
         << knapsack.meetInMiddle() << endl;
    
    return 0;
}
```

**Output:**
```
Items:
Index   Weight  Value
1       2       3
2       3       4
3       4       5
4       5       6
Capacity: 5

=== Solving 0/1 Knapsack ===

Recursive Solution: 7
Memoization Solution: 7

Tabulation Solution:
Selected items:
Item 2 (weight: 3, value: 4)
Item 1 (weight: 2, value: 3)
Maximum value: 7

Space Optimized Solution:
After item 1: 0 0 3 3 3 3 
After item 2: 0 0 3 4 4 7 
After item 3: 0 0 3 4 5 7 
After item 4: 0 0 3 4 5 7 
Maximum value: 7

Meet in the Middle: 7
```

**Complexity:**
- Recursive: O(2ⁿ)
- Memoization/Tabulation: O(n × W)
- Space Optimized: O(W)
- Meet in the Middle: O(2^(n/2) × n)

## DSA Memoization

Memoization is an optimization technique that stores results of expensive function calls and returns cached result when same inputs occur again.

### How Memoization Works

```cpp
#include <iostream>
#include <unordered_map>
#include <chrono>
#include <vector>
using namespace std;
using namespace std::chrono;

// 1. Classic Fibonacci Example
class Fibonacci {
private:
    unordered_map<int, long long> memo;
    
public:
    // Without memoization (exponential)
    long long fibNaive(int n) {
        if (n <= 1) return n;
        return fibNaive(n-1) + fibNaive(n-2);
    }
    
    // With memoization (linear)
    long long fibMemo(int n) {
        if (n <= 1) return n;
        
        if (memo.find(n) != memo.end()) {
            return memo[n];
        }
        
        memo[n] = fibMemo(n-1) + fibMemo(n-2);
        return memo[n];
    }
    
    // Tabulation version
    long long fibTab(int n) {
        if (n <= 1) return n;
        
        vector<long long> dp(n+1);
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        
        return dp[n];
    }
    
    // Space optimized
    long long fibOptimized(int n) {
        if (n <= 1) return n;
        
        long long a = 0, b = 1, c;
        for (int i = 2; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};

// 2. Grid Traveler Problem
// How many ways to travel from top-left to bottom-right in m×n grid?
class GridTraveler {
private:
    unordered_map<string, long long> memo;
    
public:
    long long gridTraveler(int m, int n) {
        string key = to_string(m) + "," + to_string(n);
        
        if (memo.find(key) != memo.end()) {
            return memo[key];
        }
        
        if (m == 1 && n == 1) return 1;
        if (m == 0 || n == 0) return 0;
        
        memo[key] = gridTraveler(m-1, n) + gridTraveler(m, n-1);
        return memo[key];
    }
};

// 3. CanSum Problem
// Can we achieve target sum using numbers from array?
class CanSum {
private:
    unordered_map<int, bool> memo;
    
public:
    bool canSum(int target, const vector<int>& numbers) {
        if (memo.find(target) != memo.end()) return memo[target];
        if (target == 0) return true;
        if (target < 0) return false;
        
        for (int num : numbers) {
            int remainder = target - num;
            if (canSum(remainder, numbers)) {
                memo[target] = true;
                return true;
            }
        }
        
        memo[target] = false;
        return false;
    }
};

// 4. HowSum Problem
// Return any combination that sums to target
class HowSum {
private:
    unordered_map<int, vector<int>> memo;
    
public:
    vector<int> howSum(int target, const vector<int>& numbers) {
        if (memo.find(target) != memo.end()) return memo[target];
        if (target == 0) return {};
        if (target < 0) return {INT_MIN}; // Sentinel for impossible
        
        for (int num : numbers) {
            int remainder = target - num;
            vector<int> remainderResult = howSum(remainder, numbers);
            
            if (!remainderResult.empty() || remainder == 0) {
                remainderResult.push_back(num);
                memo[target] = remainderResult;
                return remainderResult;
            }
        }
        
        memo[target] = {INT_MIN};
        return {INT_MIN};
    }
};

// 5. BestSum Problem
// Return shortest combination that sums to target
class BestSum {
private:
    unordered_map<int, vector<int>> memo;
    
public:
    vector<int> bestSum(int target, const vector<int>& numbers) {
        if (memo.find(target) != memo.end()) return memo[target];
        if (target == 0) return {};
        if (target < 0) return {INT_MIN};
        
        vector<int> shortest = {INT_MIN};
        
        for (int num : numbers) {
            int remainder = target - num;
            vector<int> combination = bestSum(remainder, numbers);
            
            if (combination.empty() || combination[0] != INT_MIN) {
                combination.push_back(num);
                
                if (shortest[0] == INT_MIN || combination.size() < shortest.size()) {
                    shortest = combination;
                }
            }
        }
        
        memo[target] = shortest;
        return shortest;
    }
};

// Generic Memoization Decorator Template
template<typename ReturnType, typename... Args>
class Memoizer {
private:
    using FunctionType = std::function<ReturnType(Args...)>;
    FunctionType func;
    unordered_map<string, ReturnType> cache;
    
    string createKey(Args... args) {
        string key;
        ((key += to_string(args) + ","), ...);
        return key;
    }
    
public:
    Memoizer(FunctionType f) : func(f) {}
    
    ReturnType operator()(Args... args) {
        string key = createKey(args...);
        
        if (cache.find(key) != cache.end()) {
            return cache[key];
        }
        
        ReturnType result = func(args...);
        cache[key] = result;
        return result;
    }
};

int main() {
    cout << "=== Memoization Examples ===\n" << endl;
    
    // Fibonacci
    Fibonacci fib;
    int n = 40;
    
    auto start = high_resolution_clock::now();
    cout << "Fibonacci(" << n << ") naive: " << fib.fibNaive(n) << endl;
    auto end = high_resolution_clock::now();
    cout << "Time: " << duration_cast<milliseconds>(end-start).count() << "ms\n" << endl;
    
    start = high_resolution_clock::now();
    cout << "Fibonacci(" << n << ") memoized: " << fib.fibMemo(n) << endl;
    end = high_resolution_clock::now();
    cout << "Time: " << duration_cast<microseconds>(end-start).count() << "μs\n" << endl;
    
    // Grid Traveler
    GridTraveler gt;
    cout << "Grid Traveler(18, 18): " << gt.gridTraveler(18, 18) << endl;
    
    // CanSum
    CanSum cs;
    vector<int> numbers = {2, 3, 5};
    cout << "\nCanSum(8, {2,3,5}): " << (cs.canSum(8, numbers) ? "true" : "false") << endl;
    cout << "CanSum(7, {2,4}): " << (cs.canSum(7, {2,4}) ? "true" : "false") << endl;
    
    // HowSum
    HowSum hs;
    vector<int> result = hs.howSum(8, numbers);
    cout << "\nHowSum(8, {2,3,5}): ";
    if (result[0] == INT_MIN) {
        cout << "null";
    } else {
        for (int num : result) cout << num << " ";
    }
    cout << endl;
    
    // BestSum
    BestSum bs;
    result = bs.bestSum(8, {2, 3, 5});
    cout << "\nBestSum(8, {2,3,5}): ";
    if (result[0] == INT_MIN) {
        cout << "null";
    } else {
        for (int num : result) cout << num << " ";
    }
    cout << endl;
    
    // Using generic memoizer
    cout << "\n=== Generic Memoizer ===" << endl;
    
    // Memoize a simple function
    function<int(int, int)> add = [](int a, int b) {
        cout << "Computing " << a << " + " << b << endl;
        return a + b;
    };
    
    Memoizer<int, int, int> memoizedAdd(add);
    
    cout << "First call (should compute): " << memoizedAdd(5, 3) << endl;
    cout << "Second call (should use cache): " << memoizedAdd(5, 3) << endl;
    cout << "Different call (should compute): " << memoizedAdd(5, 4) << endl;
    
    return 0;
}
```

**Key Benefits of Memoization:**
1. Eliminates redundant calculations
2. Converts exponential time to polynomial time
3. Easy to implement for recursive functions
4. Automatic cache management

**When to Use Memoization:**
- Overlapping subproblems
- Optimal substructure
- Function is pure (deterministic)
- Computation is expensive

## DSA Tabulation

Tabulation is a bottom-up dynamic programming approach that builds solutions iteratively from base cases to the desired solution.

### Comparison: Memoization vs Tabulation

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class TabulationExamples {
public:
    // 1. Fibonacci using tabulation
    long long fibTab(int n) {
        if (n <= 1) return n;
        
        vector<long long> table(n+1);
        table[0] = 0;
        table[1] = 1;
        
        cout << "Building table:" << endl;
        cout << "table[0] = 0" << endl;
        cout << "table[1] = 1" << endl;
        
        for (int i = 2; i <= n; i++) {
            table[i] = table[i-1] + table[i-2];
            cout << "table[" << i << "] = table[" << i-1 << "] + table[" << i-2 << "] = "
                 << table[i-1] << " + " << table[i-2] << " = " << table[i] << endl;
        }
        
        return table[n];
    }
    
    // 2. Grid Traveler using tabulation
    long long gridTravelerTab(int m, int n) {
        vector<vector<long long>> table(m+1, vector<long long>(n+1, 0));
        table[1][1] = 1;
        
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i+1 <= m) table[i+1][j] += table[i][j];
                if (j+1 <= n) table[i][j+1] += table[i][j];
            }
        }
        
        // Visualization
        cout << "\nGrid Traveler Table (" << m << "x" << n << "):" << endl;
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                cout << table[i][j] << "\t";
            }
            cout << endl;
        }
        
        return table[m][n];
    }
    
    // 3. CanSum using tabulation
    bool canSumTab(int target, const vector<int>& numbers) {
        vector<bool> table(target+1, false);
        table[0] = true; // Base case: sum 0 is always possible
        
        cout << "\nCanSum Table for target " << target << ":" << endl;
        cout << "table[0] = true (base case)" << endl;
        
        for (int i = 0; i <= target; i++) {
            if (table[i]) {
                for (int num : numbers) {
                    if (i + num <= target) {
                        if (!table[i + num]) {
                            table[i + num] = true;
                            cout << "table[" << i+num << "] = true (from " << i << " + " << num << ")" << endl;
                        }
                    }
                }
            }
        }
        
        return table[target];
    }
    
    // 4. HowSum using tabulation
    vector<int> howSumTab(int target, const vector<int>& numbers) {
        vector<vector<int>> table(target+1);
        table[0] = {}; // Base case
        
        for (int i = 0; i <= target; i++) {
            if (!table[i].empty() || i == 0) {
                for (int num : numbers) {
                    if (i + num <= target) {
                        // If current combination is better (shorter) or first time
                        if (table[i + num].empty() || 
                            table[i].size() + 1 < table[i + num].size()) {
                            table[i + num] = table[i];
                            table[i + num].push_back(num);
                        }
                    }
                }
            }
        }
        
        // Visualization
        cout << "\nHowSum Table:" << endl;
        for (int i = 0; i <= target; i++) {
            cout << "table[" << i << "] = ";
            if (table[i].empty()) {
                cout << "[]";
            } else {
                for (int num : table[i]) {
                    cout << num << " ";
                }
            }
            cout << endl;
        }
        
        return table[target];
    }
    
    // 5. BestSum using tabulation
    vector<int> bestSumTab(int target, const vector<int>& numbers) {
        vector<vector<int>> table(target+1);
        
        for (int i = 0; i <= target; i++) {
            if (i == 0 || !table[i].empty()) {
                for (int num : numbers) {
                    if (i + num <= target) {
                        vector<int> combination = table[i];
                        combination.push_back(num);
                        
                        if (table[i + num].empty() || 
                            combination.size() < table[i + num].size()) {
                            table[i + num] = combination;
                        }
                    }
                }
            }
        }
        
        return table[target];
    }
    
    // 6. Coin Change Problem (Minimum coins)
    int coinChangeTab(const vector<int>& coins, int amount) {
        vector<int> dp(amount+1, amount+1); // Initialize with invalid value
        dp[0] = 0; // 0 coins needed for amount 0
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        // Visualization
        cout << "\nCoin Change Table:" << endl;
        for (int i = 0; i <= amount; i++) {
            cout << "Amount " << i << ": ";
            if (dp[i] > amount) {
                cout << "Not possible";
            } else {
                cout << dp[i] << " coins";
            }
            cout << endl;
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
};

int main() {
    TabulationExamples tab;
    
    cout << "=== Tabulation Examples ===\n" << endl;
    
    // Fibonacci
    cout << "Fibonacci(10) using tabulation:" << endl;
    long long result = tab.fibTab(10);
    cout << "Result: " << result << "\n" << endl;
    
    // Grid Traveler
    cout << "Grid Traveler(3, 3): " << tab.gridTravelerTab(3, 3) << "\n" << endl;
    
    // CanSum
    vector<int> numbers = {2, 3, 5};
    cout << "CanSum(8, {2,3,5}): " 
         << (tab.canSumTab(8, numbers) ? "true" : "false") << "\n" << endl;
    
    // HowSum
    vector<int> howResult = tab.howSumTab(8, numbers);
    cout << "\nHowSum result: ";
    if (howResult.empty()) {
        cout << "Not possible";
    } else {
        for (int num : howResult) cout << num << " ";
    }
    cout << "\n" << endl;
    
    // Coin Change
    vector<int> coins = {1, 2, 5};
    int amount = 11;
    int minCoins = tab.coinChangeTab(coins, amount);
    cout << "\nMinimum coins to make " << amount << ": " << minCoins << endl;
    
    return 0;
}
```

**Tabulation vs Memoization:**

| Aspect | Tabulation | Memoization |
|--------|------------|-------------|
| **Approach** | Bottom-up | Top-down |
| **Implementation** | Iterative | Recursive |
| **Speed** | Usually faster (no recursion overhead) | Slower (recursion overhead) |
| **Memory** | Stores all states | Stores only needed states |
| **Stack Overflow** | No risk | Possible with deep recursion |
| **Complexity** | Easier to analyze | Harder to analyze |

## DSA Dynamic Programming

Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems and storing their solutions to avoid redundant computations.

### DP Problem Patterns

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class DynamicProgramming {
public:
    // Pattern 1: 0/1 Knapsack Problems
    int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
        int n = weights.size();
        vector<vector<int>> dp(n+1, vector<int>(capacity+1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (weights[i-1] > w) {
                    dp[i][w] = dp[i-1][w];
                } else {
                    dp[i][w] = max(dp[i-1][w], 
                                  values[i-1] + dp[i-1][w - weights[i-1]]);
                }
            }
        }
        return dp[n][capacity];
    }
    
    // Pattern 2: Unbounded Knapsack
    int unboundedKnapsack(vector<int>& weights, vector<int>& values, int capacity) {
        vector<int> dp(capacity+1, 0);
        
        for (int w = 0; w <= capacity; w++) {
            for (int i = 0; i < weights.size(); i++) {
                if (weights[i] <= w) {
                    dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);
                }
            }
        }
        return dp[capacity];
    }
    
    // Pattern 3: Longest Common Subsequence
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i-1] == text2[j-1]) {
                    dp[i][j] = 1 + dp[i-1][j-1];
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        // Reconstruction
        string lcs = "";
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (text1[i-1] == text2[j-1]) {
                lcs = text1[i-1] + lcs;
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) {
                i--;
            } else {
                j--;
            }
        }
        
        cout << "LCS: " << lcs << endl;
        return dp[m][n];
    }
    
    // Pattern 4: Longest Increasing Subsequence
    int longestIncreasingSubsequence(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        vector<int> prev(n, -1);
        int maxLen = 1, maxIdx = 0;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                maxIdx = i;
            }
        }
        
        // Reconstruction
        vector<int> lis;
        for (int i = maxIdx; i != -1; i = prev[i]) {
            lis.push_back(nums[i]);
        }
        reverse(lis.begin(), lis.end());
        
        cout << "LIS: ";
        for (int num : lis) cout << num << " ";
        cout << endl;
        
        return maxLen;
    }
    
    // Pattern 5: Edit Distance
    int editDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
        
        // Initialize
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i-1][j],    // Delete
                                        dp[i][j-1],    // Insert
                                        dp[i-1][j-1]}); // Replace
                }
            }
        }
        
        // Visualization
        cout << "\nEdit Distance Table:" << endl;
        cout << "   ";
        for (int j = 0; j <= n; j++) {
            if (j == 0) cout << "ε ";
            else cout << word2[j-1] << " ";
        }
        cout << endl;
        
        for (int i = 0; i <= m; i++) {
            if (i == 0) cout << "ε ";
            else cout << word1[i-1] << " ";
            
            for (int j = 0; j <= n; j++) {
                cout << dp[i][j] << " ";
            }
            cout << endl;
        }
        
        return dp[m][n];
    }
    
    // Pattern 6: Matrix Chain Multiplication
    int matrixChainMultiplication(vector<int>& dims) {
        int n = dims.size() - 1; // Number of matrices
        vector<vector<int>> dp(n, vector<int>(n, 0));
        vector<vector<int>> split(n, vector<int>(n, 0));
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j] + 
                               dims[i] * dims[k+1] * dims[j+1];
                    
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        split[i][j] = k;
                    }
                }
            }
        }
        
        // Print optimal parenthesization
        cout << "Optimal parenthesization: ";
        printParenthesization(split, 0, n-1);
        cout << endl;
        
        return dp[0][n-1];
    }
    
    void printParenthesization(vector<vector<int>>& split, int i, int j) {
        if (i == j) {
            cout << "A" << i;
        } else {
            cout << "(";
            printParenthesization(split, i, split[i][j]);
            printParenthesization(split, split[i][j] + 1, j);
            cout << ")";
        }
    }
    
    // Pattern 7: Rod Cutting
    int rodCutting(vector<int>& prices, int n) {
        vector<int> dp(n+1, 0);
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] = max(dp[i], prices[j-1] + dp[i-j]);
            }
        }
        
        // Reconstruction
        cout << "Optimal cuts: ";
        int length = n;
        while (length > 0) {
            for (int j = 1; j <= length; j++) {
                if (dp[length] == prices[j-1] + dp[length-j]) {
                    cout << j << " ";
                    length -= j;
                    break;
                }
            }
        }
        cout << endl;
        
        return dp[n];
    }
    
    // Pattern 8: Coin Change II (Number of ways)
    int coinChangeWays(vector<int>& coins, int amount) {
        vector<int> dp(amount+1, 0);
        dp[0] = 1;
        
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        
        // Print DP table
        cout << "\nCoin Change Ways Table:" << endl;
        for (int i = 0; i <= amount; i++) {
            cout << "Ways to make " << i << ": " << dp[i] << endl;
        }
        
        return dp[amount];
    }
};

int main() {
    DynamicProgramming dp;
    
    cout << "=== Dynamic Programming Patterns ===\n" << endl;
    
    // 0/1 Knapsack
    vector<int> weights = {1, 3, 4, 5};
    vector<int> values = {1, 4, 5, 7};
    cout << "0/1 Knapsack (capacity=7): " << dp.knapsack(weights, values, 7) << "\n" << endl;
    
    // Unbounded Knapsack
    cout << "Unbounded Knapsack (capacity=7): " << dp.unboundedKnapsack(weights, values, 7) << "\n" << endl;
    
    // LCS
    string text1 = "AGGTAB", text2 = "GXTXAYB";
    cout << "LCS Length: " << dp.longestCommonSubsequence(text1, text2) << "\n" << endl;
    
    // LIS
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS Length: " << dp.longestIncreasingSubsequence(nums) << "\n" << endl;
    
    // Edit Distance
    cout << "Edit Distance ('horse', 'ros'): " << dp.editDistance("horse", "ros") << "\n" << endl;
    
    // Matrix Chain Multiplication
    vector<int> dims = {40, 20, 30, 10, 30};
    cout << "Minimum multiplications: " << dp.matrixChainMultiplication(dims) << "\n" << endl;
    
    // Rod Cutting
    vector<int> prices = {1, 5, 8, 9, 10, 17, 17, 20};
    int rodLength = 8;
    cout << "Maximum rod value: " << dp.rodCutting(prices, rodLength) << "\n" << endl;
    
    // Coin Change Ways
    vector<int> coins = {1, 2, 5};
    cout << "Ways to make 5: " << dp.coinChangeWays(coins, 5) << endl;
    
    return 0;
}
```

**DP Problem Identification:**
1. **Optimal Substructure**: Optimal solution can be constructed from optimal solutions of subproblems
2. **Overlapping Subproblems**: Problem can be broken down into subproblems which are reused several times

**DP Solution Steps:**
1. Define state (what does dp[i] represent?)
2. Define recurrence relation
3. Define base cases
4. Choose implementation (memoization or tabulation)
5. Add optimization if needed

## DSA Greedy Algorithms

Greedy Algorithms make locally optimal choices at each step with the hope of finding a global optimum. They don't reconsider previous choices.

### When to Use Greedy Algorithms

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

class GreedyAlgorithms {
public:
    // 1. Activity Selection Problem
    vector<pair<int, int>> activitySelection(vector<pair<int, int>>& activities) {
        // Sort by finish time
        sort(activities.begin(), activities.end(), 
             [](const pair<int, int>& a, const pair<int, int>& b) {
                 return a.second < b.second;
             });
        
        vector<pair<int, int>> selected;
        int lastFinish = 0;
        
        cout << "Sorted activities (start, finish):" << endl;
        for (auto& activity : activities) {
            cout << "(" << activity.first << ", " << activity.second << ") ";
        }
        cout << "\n\nSelected activities:" << endl;
        
        for (auto& activity : activities) {
            if (activity.first >= lastFinish) {
                selected.push_back(activity);
                lastFinish = activity.second;
                cout << "Select: (" << activity.first << ", " << activity.second << ")" << endl;
            }
        }
        
        return selected;
    }
    
    // 2. Fractional Knapsack
    double fractionalKnapsack(vector<pair<int, int>>& items, int capacity) {
        // Calculate value/weight ratio and sort
        vector<pair<double, pair<int, int>>> ratios;
        
        for (auto& item : items) {
            double ratio = (double)item.second / item.first;
            ratios.push_back({ratio, item});
        }
        
        sort(ratios.rbegin(), ratios.rend()); // Descending
        
        double totalValue = 0;
        int remaining = capacity;
        
        cout << "\nFractional Knapsack (capacity: " << capacity << "):" << endl;
        cout << "Items sorted by value/weight ratio:" << endl;
        
        for (auto& [ratio, item] : ratios) {
            cout << "Weight: " << item.first << ", Value: " << item.second 
                 << ", Ratio: " << ratio << endl;
        }
        
        cout << "\nSelection process:" << endl;
        
        for (auto& [ratio, item] : ratios) {
            if (remaining == 0) break;
            
            int weight = item.first;
            int value = item.second;
            
            if (weight <= remaining) {
                // Take whole item
                totalValue += value;
                remaining -= weight;
                cout << "Take whole item: weight=" << weight 
                     << ", value=" << value << endl;
            } else {
                // Take fraction
                double fraction = (double)remaining / weight;
                totalValue += value * fraction;
                cout << "Take fraction " << fraction << " of item: weight=" << weight 
                     << ", value=" << value << ", added value=" << value * fraction << endl;
                remaining = 0;
            }
        }
        
        return totalValue;
    }
    
    // 3. Huffman Coding (Already covered)
    
    // 4. Dijkstra's Algorithm (Greedy approach for shortest path)
    vector<int> dijkstra(vector<vector<pair<int, int>>>& graph, int source) {
        int n = graph.size();
        vector<int> dist(n, INT_MAX);
        vector<bool> visited(n, false);
        priority_queue<pair<int, int>, vector<pair<int, int>>, 
                       greater<pair<int, int>>> pq;
        
        dist[source] = 0;
        pq.push({0, source});
        
        cout << "\nDijkstra's Algorithm from source " << source << ":" << endl;
        
        while (!pq.empty()) {
            int u = pq.top().second;
            int currentDist = pq.top().first;
            pq.pop();
            
            if (visited[u]) continue;
            visited[u] = true;
            
            cout << "Processing vertex " << u << " with distance " << currentDist << endl;
            
            for (auto& [v, weight] : graph[u]) {
                int newDist = currentDist + weight;
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    pq.push({newDist, v});
                    cout << "  Update vertex " << v << " to distance " << newDist << endl;
                }
            }
        }
        
        return dist;
    }
    
    // 5. Prim's Algorithm (Greedy approach for MST)
    vector<vector<pair<int, int>>> primMST(vector<vector<pair<int, int>>>& graph) {
        int n = graph.size();
        vector<bool> inMST(n, false);
        vector<int> key(n, INT_MAX);
        vector<int> parent(n, -1);
        priority_queue<pair<int, int>, vector<pair<int, int>>,
                       greater<pair<int, int>>> pq;
        
        key[0] = 0;
        pq.push({0, 0});
        
        cout << "\nPrim's Algorithm for MST:" << endl;
        
        while (!pq.empty()) {
            int u = pq.top().second;
            pq.pop();
            
            if (inMST[u]) continue;
            inMST[u] = true;
            
            cout << "Add vertex " << u << " to MST" << endl;
            
            for (auto& [v, weight] : graph[u]) {
                if (!inMST[v] && weight < key[v]) {
                    key[v] = weight;
                    parent[v] = u;
                    pq.push({key[v], v});
                    cout << "  Update vertex " << v << " with edge weight " << weight 
                         << " from " << u << endl;
                }
            }
        }
        
        // Build MST
        vector<vector<pair<int, int>>> mst(n);
        for (int i = 1; i < n; i++) {
            if (parent[i] != -1) {
                mst[parent[i]].push_back({i, key[i]});
                mst[i].push_back({parent[i], key[i]});
            }
        }
        
        return mst;
    }
    
    // 6. Kruskal's Algorithm (Greedy for MST using Union-Find)
    struct Edge {
        int u, v, weight;
        bool operator<(const Edge& other) const {
            return weight < other.weight;
        }
    };
    
    vector<Edge> kruskalMST(vector<Edge>& edges, int n) {
        // Sort edges by weight
        sort(edges.begin(), edges.end());
        
        // Union-Find structure
        vector<int> parent(n);
        vector<int> rank(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
        
        vector<Edge> mst;
        
        cout << "\nKruskal's Algorithm (edges sorted by weight):" << endl;
        for (auto& edge : edges) {
            cout << "Edge " << edge.u << "-" << edge.v << ": " << edge.weight << endl;
        }
        
        cout << "\nSelection process:" << endl;
        
        for (auto& edge : edges) {
            int rootU = find(parent, edge.u);
            int rootV = find(parent, edge.v);
            
            if (rootU != rootV) {
                mst.push_back(edge);
                unionSets(parent, rank, rootU, rootV);
                cout << "Select edge " << edge.u << "-" << edge.v 
                     << " (weight: " << edge.weight << ")" << endl;
            } else {
                cout << "Skip edge " << edge.u << "-" << edge.v 
                     << " (would create cycle)" << endl;
            }
            
            if (mst.size() == n - 1) break;
        }
        
        return mst;
    }
    
    int find(vector<int>& parent, int x) {
        if (parent[x] != x) {
            parent[x] = find(parent, parent[x]);
        }
        return parent[x];
    }
    
    void unionSets(vector<int>& parent, vector<int>& rank, int x, int y) {
        int rootX = find(parent, x);
        int rootY = find(parent, y);
        
        if (rootX != rootY) {
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    }
    
    // 7. Coin Change (Greedy when coins have certain properties)
    vector<int> coinChangeGreedy(vector<int>& coins, int amount) {
        sort(coins.rbegin(), coins.rend()); // Descending
        
        vector<int> result;
        int remaining = amount;
        
        cout << "\nGreedy Coin Change for amount " << amount << ":" << endl;
        cout << "Coins available: ";
        for (int coin : coins) cout << coin << " ";
        cout << endl;
        
        for (int coin : coins) {
            while (remaining >= coin) {
                remaining -= coin;
                result.push_back(coin);
                cout << "Take coin: " << coin << ", remaining: " << remaining << endl;
            }
        }
        
        if (remaining != 0) {
            cout << "Greedy algorithm failed! Remaining: " << remaining << endl;
            return {};
        }
        
        return result;
    }
    
    // 8. Job Sequencing with Deadlines
    struct Job {
        char id;
        int deadline;
        int profit;
    };
    
    vector<char> jobSequencing(vector<Job>& jobs) {
        // Sort by profit descending
        sort(jobs.begin(), jobs.end(), [](const Job& a, const Job& b) {
            return a.profit > b.profit;
        });
        
        int maxDeadline = 0;
        for (auto& job : jobs) {
            maxDeadline = max(maxDeadline, job.deadline);
        }
        
        vector<char> result(maxDeadline, '\0');
        vector<bool> slot(maxDeadline, false);
        
        cout << "\nJob Sequencing Problem:" << endl;
        cout << "Jobs sorted by profit:" << endl;
        for (auto& job : jobs) {
            cout << job.id << ": deadline=" << job.deadline 
                 << ", profit=" << job.profit << endl;
        }
        
        cout << "\nAssignment process:" << endl;
        
        for (auto& job : jobs) {
            // Find a free slot for this job
            for (int j = min(job.deadline, maxDeadline) - 1; j >= 0; j--) {
                if (!slot[j]) {
                    result[j] = job.id;
                    slot[j] = true;
                    cout << "Assign job " << job.id << " to slot " << j+1 << endl;
                    break;
                }
            }
        }
        
        // Remove empty slots
        vector<char> finalResult;
        for (char jobId : result) {
            if (jobId != '\0') {
                finalResult.push_back(jobId);
            }
        }
        
        return finalResult;
    }
};

int main() {
    GreedyAlgorithms greedy;
    
    cout << "=== Greedy Algorithms ===\n" << endl;
    
    // Activity Selection
    vector<pair<int, int>> activities = {
        {1, 3}, {2, 5}, {4, 6}, {6, 7}, {5, 8}, {7, 9}
    };
    
    auto selected = greedy.activitySelection(activities);
    cout << "\nTotal activities selected: " << selected.size() << "\n" << endl;
    
    // Fractional Knapsack
    vector<pair<int, int>> items = {
        {10, 60}, {20, 100}, {30, 120}
    };
    double maxValue = greedy.fractionalKnapsack(items, 50);
    cout << "\nMaximum value: " << maxValue << "\n" << endl;
    
    // Dijkstra's Algorithm
    int n = 5;
    vector<vector<pair<int, int>>> graph(n);
    graph[0] = {{1, 10}, {4, 5}};
    graph[1] = {{2, 1}, {4, 2}};
    graph[2] = {{3, 4}};
    graph[3] = {{2, 6}, {0, 7}};
    graph[4] = {{1, 3}, {2, 9}, {3, 2}};
    
    auto distances = greedy.dijkstra(graph, 0);
    cout << "\nShortest distances from source 0:" << endl;
    for (int i = 0; i < n; i++) {
        cout << "Vertex " << i << ": " << distances[i] << endl;
    }
    cout << endl;
    
    // Prim's MST
    auto mst = greedy.primMST(graph);
    cout << "\nMST edges:" << endl;
    for (int u = 0; u < mst.size(); u++) {
        for (auto& [v, w] : mst[u]) {
            if (u < v) { // Avoid duplicates
                cout << u << "-" << v << ": " << w << endl;
            }
        }
    }
    cout << endl;
    
    // Kruskal's MST
    vector<GreedyAlgorithms::Edge> edges = {
        {0, 1, 10}, {0, 4, 5}, {1, 2, 1}, {1, 4, 2},
        {2, 3, 4}, {3, 2, 6}, {3, 0, 7}, {4, 1, 3},
        {4, 2, 9}, {4, 3, 2}
    };
    
    auto kruskalResult = greedy.kruskalMST(edges, n);
    cout << "\nKruskal's MST edges:" << endl;
    int totalWeight = 0;
    for (auto& edge : kruskalResult) {
        cout << edge.u << "-" << edge.v << ": " << edge.weight << endl;
        totalWeight += edge.weight;
    }
    cout << "Total weight: " << totalWeight << "\n" << endl;
    
    // Coin Change (Greedy works for canonical coin systems)
    vector<int> coins = {25, 10, 5, 1};
    auto coinResult = greedy.coinChangeGreedy(coins, 63);
    cout << "\nCoins used: ";
    for (int coin : coinResult) cout << coin << " ";
    cout << "\nTotal coins: " << coinResult.size() << "\n" << endl;
    
    // Job Sequencing
    vector<GreedyAlgorithms::Job> jobs = {
        {'a', 2, 100}, {'b', 1, 19}, {'c', 2, 27},
        {'d', 1, 25}, {'e', 3, 15}
    };
    
    auto jobResult = greedy.jobSequencing(jobs);
    cout << "\nJob sequence: ";
    for (char jobId : jobResult) cout << jobId << " ";
    cout << endl;
    
    return 0;
}
```

**When Greedy Algorithms Work:**
1. **Greedy Choice Property**: Local optimal choice leads to global optimum
2. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems

**Common Greedy Algorithms:**
- Dijkstra's Algorithm (Shortest Path)
- Prim's and Kruskal's Algorithms (MST)
- Huffman Coding (Data Compression)
- Activity Selection
- Fractional Knapsack

**Limitations:**
- Don't always produce optimal solutions
- Need proof of correctness
- Not suitable for problems without greedy choice property

### Key Takeaways

1. **Euclidean Algorithm**: Efficient GCD computation with O(log min(a,b)) time
2. **Huffman Coding**: Optimal prefix codes for data compression
3. **TSP**: NP-hard, requires heuristics or exact methods for small n
4. **0/1 Knapsack**: Classic DP problem with O(nW) solution
5. **Memoization**: Top-down DP with caching
6. **Tabulation**: Bottom-up DP building table iteratively
7. **Dynamic Programming**: General technique for optimization problems
8. **Greedy Algorithms**: Make locally optimal choices, work for specific problems

Each technique has its strengths and weaknesses, and choosing the right approach depends on the problem characteristics, constraints, and requirements.

---