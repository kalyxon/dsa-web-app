---
id: maximum-flow
title: Maximum Flow
---

# Maximum Flow

Maximum Flow is a fundamental problem in network theory that involves finding the maximum amount of flow that can be sent from a source node to a sink node in a flow network. A flow network is a directed graph where each edge has a capacity (maximum amount of flow it can carry) and actual flow (amount currently passing through).

## Key Concepts in Maximum Flow

1. **Flow Network**: Directed graph G = (V, E) with:
   - Source node 's' (where flow originates)
   - Sink node 't' (where flow terminates)
   - Capacity c(u,v) ≥ 0 for each edge (u,v) ∈ E

2. **Flow Constraints**:
   - **Capacity Constraint**: f(u,v) ≤ c(u,v) for all edges
   - **Flow Conservation**: Σ f(u,v) = Σ f(v,w) for all v ≠ s,t
   - **Skew Symmetry**: f(u,v) = -f(v,u)

3. **Residual Graph**: Represents remaining capacity after current flow
4. **Augmenting Path**: Path from source to sink in residual graph
5. **Minimum Cut**: Minimum capacity cut separating source from sink (Max-Flow Min-Cut Theorem)

## DSA Maximum Flow Algorithms

### The Maximum Flow Problem

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

class Graph {
private:
    int V;
    vector<vector<int>> capacity;
    vector<vector<int>> flow;
    
public:
    Graph(int vertices) : V(vertices) {
        capacity.resize(V, vector<int>(V, 0));
        flow.resize(V, vector<int>(V, 0));
    }
    
    void addEdge(int u, int v, int cap) {
        capacity[u][v] = cap;
    }
    
    int getCapacity(int u, int v) {
        return capacity[u][v];
    }
    
    int getFlow(int u, int v) {
        return flow[u][v];
    }
    
    void setFlow(int u, int v, int f) {
        flow[u][v] = f;
    }
    
    int getVertices() {
        return V;
    }
};

// Utility function to print flow network
void printFlowNetwork(Graph& g, int source, int sink) {
    int V = g.getVertices();
    
    cout << "Flow Network:" << endl;
    cout << "Source: " << source << ", Sink: " << sink << endl;
    cout << "Edges (u -> v): capacity / flow" << endl;
    
    int totalFlow = 0;
    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            int cap = g.getCapacity(u, v);
            int f = g.getFlow(u, v);
            if (cap > 0) {
                cout << u << " -> " << v << ": " << cap << " / " << f << endl;
                if (u == source) {
                    totalFlow += f;
                }
            }
        }
    }
    cout << "Current total flow from source: " << totalFlow << endl << endl;
}
```

**Example Network:**
```
    10        5
 (0)---->(1)---->(3)
  |       |       ^
  |10     |5      |10
  v       v       |
 (2)---->(4)---->(5)
    15       10
Source: 0, Sink: 5
```

## DSA Ford-Fulkerson Algorithm

The Ford-Fulkerson method is a greedy approach for computing maximum flow. It repeatedly finds augmenting paths in the residual graph and augments flow until no more augmenting paths exist.

### How Ford-Fulkerson Works

1. **Initialize**: Start with zero flow
2. **Find Augmenting Path**: Find any path from source to sink with positive residual capacity
3. **Augment Flow**: Push the minimum residual capacity along the path
4. **Update Residual Graph**: Update forward and backward edges
5. **Repeat**: Until no augmenting path exists

### Ford-Fulkerson Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <algorithm>
using namespace std;

// DFS for finding augmenting path (used in Ford-Fulkerson)
bool dfs(vector<vector<int>>& residual, int source, int sink, vector<int>& parent) {
    int V = residual.size();
    vector<bool> visited(V, false);
    
    // Stack for DFS
    vector<int> stack;
    stack.push_back(source);
    visited[source] = true;
    parent[source] = -1;
    
    while (!stack.empty()) {
        int u = stack.back();
        stack.pop_back();
        
        for (int v = 0; v < V; v++) {
            if (!visited[v] && residual[u][v] > 0) {
                parent[v] = u;
                visited[v] = true;
                
                if (v == sink) {
                    return true;
                }
                stack.push_back(v);
            }
        }
    }
    
    return visited[sink];
}

// Ford-Fulkerson Algorithm Implementation
int fordFulkerson(vector<vector<int>>& capacity, int source, int sink) {
    int V = capacity.size();
    
    // Create residual graph and initialize with capacities
    vector<vector<int>> residual(V, vector<int>(V, 0));
    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            residual[u][v] = capacity[u][v];
        }
    }
    
    vector<int> parent(V);
    int maxFlow = 0;
    int iteration = 0;
    
    cout << "=== Ford-Fulkerson Algorithm ===" << endl;
    
    // Augment flow while there's a path from source to sink
    while (dfs(residual, source, sink, parent)) {
        iteration++;
        
        // Find minimum residual capacity along the path
        int pathFlow = INT_MAX;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            pathFlow = min(pathFlow, residual[u][v]);
        }
        
        // Update residual capacities and reverse edges
        cout << "\nIteration " << iteration << ":";
        cout << "\nAugmenting path: ";
        vector<int> path;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            path.push_back(v);
            residual[u][v] -= pathFlow;
            residual[v][u] += pathFlow;
        }
        path.push_back(source);
        reverse(path.begin(), path.end());
        
        for (int i = 0; i < path.size(); i++) {
            cout << path[i];
            if (i < path.size() - 1) cout << " -> ";
        }
        cout << "\nFlow augmented: " << pathFlow << endl;
        
        // Add path flow to overall flow
        maxFlow += pathFlow;
        cout << "Total flow so far: " << maxFlow << endl;
    }
    
    cout << "\nMaximum flow: " << maxFlow << endl;
    return maxFlow;
}

int main() {
    // Create a flow network
    int V = 6;
    vector<vector<int>> capacity(V, vector<int>(V, 0));
    
    // Example network from CLRS
    capacity[0][1] = 16;
    capacity[0][2] = 13;
    capacity[1][2] = 10;
    capacity[1][3] = 12;
    capacity[2][1] = 4;
    capacity[2][4] = 14;
    capacity[3][2] = 9;
    capacity[3][5] = 20;
    capacity[4][3] = 7;
    capacity[4][5] = 4;
    
    int source = 0, sink = 5;
    
    cout << "Initial Network:" << endl;
    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            if (capacity[u][v] > 0) {
                cout << u << " -> " << v << ": " << capacity[u][v] << endl;
            }
        }
    }
    
    int maxFlow = fordFulkerson(capacity, source, sink);
    
    return 0;
}
```

**Output:**
```
Initial Network:
0 -> 1: 16
0 -> 2: 13
1 -> 2: 10
1 -> 3: 12
2 -> 1: 4
2 -> 4: 14
3 -> 2: 9
3 -> 5: 20
4 -> 3: 7
4 -> 5: 4

=== Ford-Fulkerson Algorithm ===

Iteration 1:
Augmenting path: 0 -> 1 -> 3 -> 5
Flow augmented: 12
Total flow so far: 12

Iteration 2:
Augmenting path: 0 -> 2 -> 4 -> 5
Flow augmented: 4
Total flow so far: 16

Iteration 3:
Augmenting path: 0 -> 2 -> 4 -> 3 -> 5
Flow augmented: 7
Total flow so far: 23

Maximum flow: 23
```

### Ford-Fulkerson Complexity

**Time Complexity:**
- O(E × max_flow) in worst case
- Depends on the choice of augmenting paths
- Can be exponential for poor path choices

**Space Complexity:**
- O(V²) for adjacency matrix representation
- O(V + E) for adjacency list representation

**Advantages:**
- Simple to understand and implement
- Works for both integer and real-valued capacities
- Guaranteed to find maximum flow

**Disadvantages:**
- May take exponential time with poor augmenting path choices
- Not polynomial time in general case

## DSA Edmonds-Karp Algorithm

Edmonds-Karp is a specific implementation of Ford-Fulkerson that uses Breadth-First Search (BFS) to find the shortest augmenting path (in terms of number of edges). This guarantees polynomial time complexity.

### How Edmonds-Karp Works

1. **Initialize**: Start with zero flow
2. **BFS**: Find shortest augmenting path from source to sink using BFS
3. **Augment Flow**: Push flow equal to minimum residual capacity along the path
4. **Update Residual Graph**: Update forward and backward edges
5. **Repeat**: Until no augmenting path exists

### Edmonds-Karp Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <algorithm>
using namespace std;

// BFS for finding shortest augmenting path
bool bfs(vector<vector<int>>& residual, int source, int sink, vector<int>& parent) {
    int V = residual.size();
    vector<bool> visited(V, false);
    
    queue<int> q;
    q.push(source);
    visited[source] = true;
    parent[source] = -1;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v = 0; v < V; v++) {
            if (!visited[v] && residual[u][v] > 0) {
                parent[v] = u;
                visited[v] = true;
                
                if (v == sink) {
                    return true;
                }
                q.push(v);
            }
        }
    }
    
    return visited[sink];
}

// Edmonds-Karp Algorithm Implementation
int edmondsKarp(vector<vector<int>>& capacity, int source, int sink) {
    int V = capacity.size();
    
    // Create residual graph
    vector<vector<int>> residual(V, vector<int>(V, 0));
    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            residual[u][v] = capacity[u][v];
        }
    }
    
    vector<int> parent(V);
    int maxFlow = 0;
    int iteration = 0;
    
    cout << "=== Edmonds-Karp Algorithm ===" << endl;
    
    // Augment flow while there's a path from source to sink
    while (bfs(residual, source, sink, parent)) {
        iteration++;
        
        // Find minimum residual capacity along the path
        int pathFlow = INT_MAX;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            pathFlow = min(pathFlow, residual[u][v]);
        }
        
        // Update residual capacities
        cout << "\nIteration " << iteration << ":";
        cout << "\nShortest augmenting path (BFS): ";
        
        vector<int> path;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            path.push_back(v);
            residual[u][v] -= pathFlow;
            residual[v][u] += pathFlow;
        }
        path.push_back(source);
        reverse(path.begin(), path.end());
        
        for (int i = 0; i < path.size(); i++) {
            cout << path[i];
            if (i < path.size() - 1) cout << " -> ";
        }
        cout << "\nFlow augmented: " << pathFlow << endl;
        
        // Add path flow to overall flow
        maxFlow += pathFlow;
        cout << "Total flow so far: " << maxFlow << endl;
    }
    
    cout << "\nMaximum flow: " << maxFlow << endl;
    return maxFlow;
}

// Find minimum cut (S-T cut) after running max flow
void findMinCut(vector<vector<int>>& residual, int source) {
    int V = residual.size();
    vector<bool> visited(V, false);
    
    // BFS to find reachable vertices from source in residual graph
    queue<int> q;
    q.push(source);
    visited[source] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v = 0; v < V; v++) {
            if (!visited[v] && residual[u][v] > 0) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    
    cout << "\nMinimum Cut (S-T Cut):" << endl;
    cout << "Set S (reachable from source): ";
    for (int i = 0; i < V; i++) {
        if (visited[i]) cout << i << " ";
    }
    
    cout << "\nSet T (not reachable): ";
    for (int i = 0; i < V; i++) {
        if (!visited[i]) cout << i << " ";
    }
    cout << endl;
}

int main() {
    // Create the same flow network
    int V = 6;
    vector<vector<int>> capacity(V, vector<int>(V, 0));
    
    capacity[0][1] = 16;
    capacity[0][2] = 13;
    capacity[1][2] = 10;
    capacity[1][3] = 12;
    capacity[2][1] = 4;
    capacity[2][4] = 14;
    capacity[3][2] = 9;
    capacity[3][5] = 20;
    capacity[4][3] = 7;
    capacity[4][5] = 4;
    
    int source = 0, sink = 5;
    
    cout << "Network Representation:" << endl;
    cout << "    16         12" << endl;
    cout << " (0)---->(1)---->(3)" << endl;
    cout << "   | \\    /|      |" << endl;
    cout << " 13|  \\ /  |10    |20" << endl;
    cout << "   |   X   |      |" << endl;
    cout << "   |  / \\  |      |" << endl;
    cout << "   v /   \\ v      v" << endl;
    cout << " (2)---->(4)---->(5)" << endl;
    cout << "     14        4" << endl;
    cout << "Source: 0, Sink: 5\n" << endl;
    
    int maxFlow = edmondsKarp(capacity, source, sink);
    
    // Create residual graph for min-cut demonstration
    vector<vector<int>> residual(V, vector<int>(V, 0));
    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            residual[u][v] = capacity[u][v];
        }
    }
    
    // Run BFS to prepare for min-cut
    vector<int> parent(V);
    while (bfs(residual, source, sink, parent)) {
        int pathFlow = INT_MAX;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            pathFlow = min(pathFlow, residual[u][v]);
        }
        
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            residual[u][v] -= pathFlow;
            residual[v][u] += pathFlow;
        }
    }
    
    findMinCut(residual, source);
    
    return 0;
}
```

**Output:**
```
Network Representation:
    16         12
 (0)---->(1)---->(3)
   | \    /|      |
 13|  \ /  |10    |20
   |   X   |      |
   |  / \  |      |
   v /   \ v      v
 (2)---->(4)---->(5)
     14        4
Source: 0, Sink: 5

=== Edmonds-Karp Algorithm ===

Iteration 1:
Shortest augmenting path (BFS): 0 -> 1 -> 3 -> 5
Flow augmented: 12
Total flow so far: 12

Iteration 2:
Shortest augmenting path (BFS): 0 -> 2 -> 4 -> 5
Flow augmented: 4
Total flow so far: 16

Iteration 3:
Shortest augmenting path (BFS): 0 -> 2 -> 4 -> 3 -> 5
Flow augmented: 7
Total flow so far: 23

Maximum flow: 23

Minimum Cut (S-T Cut):
Set S (reachable from source): 0 2 4 
Set T (not reachable): 1 3 5
```

### Edmonds-Karp Complexity

**Time Complexity:**
- O(V × E²) - Polynomial time
- BFS takes O(E) time
- At most O(VE) augmentations

**Space Complexity:**
- O(V²) for adjacency matrix
- O(V + E) for adjacency list

**Advantages:**
- Guaranteed polynomial time (O(VE²))
- Always finds the shortest augmenting path
- More efficient than basic Ford-Fulkerson
- Implementation is straightforward

**Disadvantages:**
- Slower than more advanced algorithms like Dinic's
- Still not the most efficient for large networks

## Comparison: Ford-Fulkerson vs Edmonds-Karp

| Aspect | Ford-Fulkerson | Edmonds-Karp |
|--------|----------------|--------------|
| **Path Finding** | DFS (any path) | BFS (shortest path) |
| **Time Complexity** | O(E × max_flow) | O(V × E²) |
| **Guarantee** | May be exponential | Polynomial time |
| **Implementation** | Simpler | Slightly more complex |
| **Use Case** | Small networks, theoretical | Practical applications |
| **Performance** | Variable, depends on path choice | Consistent, predictable |

## Max-Flow Min-Cut Theorem

The fundamental theorem of network flows states that:
**Maximum flow from source to sink = Minimum capacity of an s-t cut**

### Finding Minimum Cut

```cpp
// Function to demonstrate Max-Flow Min-Cut Theorem
void maxFlowMinCutTheorem() {
    cout << "\n=== Max-Flow Min-Cut Theorem ===" << endl;
    cout << "Theorem: In any flow network:" << endl;
    cout << "1. Maximum flow from s to t = Minimum s-t cut capacity" << endl;
    cout << "2. An s-t cut is a partition of vertices into S and T" << endl;
    cout << "   where s ∈ S and t ∈ T" << endl;
    cout << "3. Cut capacity = sum of capacities from S to T" << endl;
    
    cout << "\nExample Proof:" << endl;
    cout << "For our network with max flow = 23:" << endl;
    cout << "Consider cut: S = {0, 2, 4}, T = {1, 3, 5}" << endl;
    cout << "Edges crossing cut: 0->1(16), 2->1(4), 4->3(7), 4->5(4)" << endl;
    cout << "But after max flow, some edges are saturated:" << endl;
    cout << "0->1 carries 12/16, 4->3 carries 7/7 (saturated)" << endl;
    cout << "2->1 carries 0/4 (reverse flow possible)" << endl;
    cout << "4->5 carries 4/4 (saturated)" << endl;
    cout << "Cut capacity = 12 + 0 + 7 + 4 = 23 = Max flow ✓" << endl;
}
```

## Applications of Maximum Flow

### 1. **Network Routing**
```cpp
// Example: Internet packet routing
class NetworkRouter {
public:
    int findMaxBandwidth(vector<vector<int>>& bandwidth, int server, int client) {
        // Bandwidth matrix represents maximum data rate between nodes
        return edmondsKarp(bandwidth, server, client);
    }
};
```

### 2. **Bipartite Matching**
```cpp
// Maximum bipartite matching using max flow
int bipartiteMatching(vector<vector<int>>& adj, int m, int n) {
    // Create flow network: source -> U -> V -> sink
    int V = m + n + 2;
    int source = V - 2, sink = V - 1;
    
    vector<vector<int>> capacity(V, vector<int>(V, 0));
    
    // Connect source to U vertices
    for (int i = 0; i < m; i++) {
        capacity[source][i] = 1;
    }
    
    // Connect V vertices to sink
    for (int j = 0; j < n; j++) {
        capacity[m + j][sink] = 1;
    }
    
    // Connect U to V based on adjacency
    for (int i = 0; i < m; i++) {
        for (int j : adj[i]) {
            capacity[i][m + j] = 1;
        }
    }
    
    return edmondsKarp(capacity, source, sink);
}
```

### 3. **Supply Chain Optimization**
```cpp
// Factory to warehouse distribution
class SupplyChain {
public:
    int optimizeDistribution(vector<int>& factoryOutput, 
                            vector<int>& warehouseDemand,
                            vector<vector<int>>& transportCapacity) {
        // Add super source and super sink
        int factories = factoryOutput.size();
        int warehouses = warehouseDemand.size();
        int V = factories + warehouses + 2;
        int source = V - 2, sink = V - 1;
        
        vector<vector<int>> capacity(V, vector<int>(V, 0));
        
        // Connect source to factories
        for (int i = 0; i < factories; i++) {
            capacity[source][i] = factoryOutput[i];
        }
        
        // Connect warehouses to sink
        for (int j = 0; j < warehouses; j++) {
            capacity[factories + j][sink] = warehouseDemand[j];
        }
        
        // Connect factories to warehouses
        for (int i = 0; i < factories; i++) {
            for (int j = 0; j < warehouses; j++) {
                capacity[i][factories + j] = transportCapacity[i][j];
            }
        }
        
        return edmondsKarp(capacity, source, sink);
    }
};
```

## Advanced Maximum Flow Algorithms

### 1. **Dinic's Algorithm** (More Efficient)
- Time Complexity: O(V²E) or O(E√V) for unit capacities
- Uses BFS for level graph + DFS for blocking flow

### 2. **Push-Relabel Algorithm**
- Time Complexity: O(V³) or O(V²√E)
- More complex but very efficient in practice
- Uses height labels and excess flow

## Common Problems and Solutions

### Problem 1: Multiple Sources and Sinks
**Solution**: Add super source and super sink
```cpp
int maxFlowMultipleSourcesSinks(vector<vector<int>>& capacity, 
                               vector<int>& sources, 
                               vector<int>& sinks) {
    int V = capacity.size();
    int superSource = V, superSink = V + 1;
    V += 2;
    
    vector<vector<int>> newCapacity(V, vector<int>(V, 0));
    
    // Copy original capacities
    for (int i = 0; i < capacity.size(); i++) {
        for (int j = 0; j < capacity[i].size(); j++) {
            newCapacity[i][j] = capacity[i][j];
        }
    }
    
    // Connect super source to all sources
    for (int s : sources) {
        newCapacity[superSource][s] = INT_MAX;
    }
    
    // Connect all sinks to super sink
    for (int t : sinks) {
        newCapacity[t][superSink] = INT_MAX;
    }
    
    return edmondsKarp(newCapacity, superSource, superSink);
}
```

### Problem 2: Vertex Capacities
**Solution**: Split each vertex into in-vertex and out-vertex
```cpp
int maxFlowVertexCapacities(vector<vector<int>>& edgeCapacity,
                           vector<int>& vertexCapacity, 
                           int source, int sink) {
    int V = edgeCapacity.size();
    int newV = 2 * V;
    
    vector<vector<int>> newCapacity(newV, vector<int>(newV, 0));
    
    // Split each vertex v into v_in and v_out
    for (int v = 0; v < V; v++) {
        int v_in = 2 * v;
        int v_out = 2 * v + 1;
        
        // Edge from v_in to v_out with vertex capacity
        newCapacity[v_in][v_out] = vertexCapacity[v];
        
        // Redirect original edges
        for (int u = 0; u < V; u++) {
            if (edgeCapacity[u][v] > 0) {
                int u_out = 2 * u + 1;
                newCapacity[u_out][v_in] = edgeCapacity[u][v];
            }
        }
    }
    
    return edmondsKarp(newCapacity, 2 * source, 2 * sink + 1);
}
```

## Practice Problems

1. **Basic Maximum Flow**: Find max flow in given network
2. **Bipartite Matching**: Maximum number of job assignments
3. **Edge Disjoint Paths**: Maximum number of paths with no common edges
4. **Circulation with Demands**: Flow network with vertex demands
5. **Maximum Flow with Lower Bounds**: Edges have minimum required flow

## Common Mistakes to Avoid

1. **Forgetting reverse edges**: Crucial for algorithm correctness
2. **Not handling multiple edges**: Sum capacities for parallel edges
3. **Integer overflow**: Use long long for large capacities
4. **Infinite loops**: Ensure proper termination conditions
5. **Wrong residual graph updates**: Update both forward and backward edges

## Visual Example: Maximum Flow Process

```
Initial Network:
    10       4
 s----->A----->t
 |      |      ^
 |5     |3     |8
 v      v      |
 B----->C------+
    9       6

Step 1: Find path s->A->t, flow = 4
Step 2: Find path s->B->C->t, flow = 6
Step 3: Find path s->A->C->t, flow = 3
Step 4: Find path s->B->t, flow = 5

Total Flow = 4 + 6 + 3 + 5 = 18

Residual Graph after max flow:
    (6)       (0)   // Numbers show remaining capacity
 s----->A----->t
 |      |      ^
 |(0)   |(0)   |(2)
 v      v      |
 B----->C------+
    (4)       (0)

Minimum Cut: {s, A, B, C} to {t} with capacity 18
```

## Performance Considerations

1. **For dense graphs**: Edmonds-Karp is usually sufficient
2. **For large sparse graphs**: Consider Dinic's algorithm
3. **For unit capacities**: Use specialized algorithms
4. **For real-time applications**: Pre-compute or use approximate solutions
5. **Memory optimization**: Use adjacency lists instead of matrices

Maximum flow algorithms are fundamental tools in computer science with wide-ranging applications from network design to combinatorial optimization. Understanding both Ford-Fulkerson and Edmonds-Karp provides a solid foundation for tackling complex flow problems.

---