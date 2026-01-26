# Minimum Spanning Tree

A Minimum Spanning Tree (MST) is a subset of edges of a connected, edge-weighted undirected graph that connects all the vertices together without any cycles and with the minimum possible total edge weight. In simpler terms, it's the most efficient way to connect all points (vertices) in a network with the least total cost (edge weights).

## Key Properties of MST

1. **Spanning**: Connects all vertices in the graph
2. **Tree**: Contains no cycles (acyclic)
3. **Minimum**: Total edge weight is minimized
4. **Connected**: All vertices are reachable from any other vertex
5. **Edges**: Contains exactly V-1 edges for V vertices

## DSA Prim's Algorithm

Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. It starts from an arbitrary vertex and grows the MST one edge at a time, always adding the smallest-weight edge that connects a vertex in the MST to a vertex outside the MST.

### How Prim's Algorithm Works

1. **Initialize**: Start with an arbitrary vertex, mark it as visited
2. **Grow Tree**: Repeat until all vertices are visited:
   - Find the minimum-weight edge connecting visited and unvisited vertices
   - Add this edge to the MST
   - Mark the newly connected vertex as visited
3. **Terminate**: When all vertices are visited, MST is complete

### Prim's Algorithm Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

// Structure to represent a graph edge
struct Edge {
    int dest;
    int weight;
    Edge(int d, int w) : dest(d), weight(w) {}
};

// Function to implement Prim's Algorithm
void primMST(vector<vector<Edge>>& graph, int V) {
    vector<int> parent(V, -1);       // Store MST structure
    vector<int> key(V, INT_MAX);     // Key values to pick minimum weight edge
    vector<bool> inMST(V, false);    // Track vertices included in MST
    
    // Min-heap priority queue (weight, vertex)
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    
    // Start with vertex 0
    key[0] = 0;
    pq.push({0, 0});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        inMST[u] = true;
        
        // Check all adjacent vertices
        for (auto& edge : graph[u]) {
            int v = edge.dest;
            int weight = edge.weight;
            
            // If v is not in MST and weight is smaller than current key
            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                parent[v] = u;
                pq.push({key[v], v});
            }
        }
    }
    
    // Print the MST
    cout << "Minimum Spanning Tree (Prim's Algorithm):" << endl;
    cout << "Edge \tWeight" << endl;
    int totalWeight = 0;
    for (int i = 1; i < V; i++) {
        cout << parent[i] << " - " << i << " \t" << key[i] << endl;
        totalWeight += key[i];
    }
    cout << "Total weight of MST: " << totalWeight << endl;
}

int main() {
    // Example graph with 5 vertices
    int V = 5;
    vector<vector<Edge>> graph(V);
    
    // Adding edges (undirected graph)
    graph[0].push_back(Edge(1, 2));
    graph[0].push_back(Edge(3, 6));
    graph[1].push_back(Edge(0, 2));
    graph[1].push_back(Edge(2, 3));
    graph[1].push_back(Edge(3, 8));
    graph[1].push_back(Edge(4, 5));
    graph[2].push_back(Edge(1, 3));
    graph[2].push_back(Edge(4, 7));
    graph[3].push_back(Edge(0, 6));
    graph[3].push_back(Edge(1, 8));
    graph[3].push_back(Edge(4, 9));
    graph[4].push_back(Edge(1, 5));
    graph[4].push_back(Edge(2, 7));
    graph[4].push_back(Edge(3, 9));
    
    primMST(graph, V);
    
    return 0;
}
```

**Output:**
```
Minimum Spanning Tree (Prim's Algorithm):
Edge    Weight
0 - 1   2
1 - 2   3
0 - 3   6
1 - 4   5
Total weight of MST: 16
```

### Prim's Algorithm Complexity

**Time Complexity:**
- **Adjacency Matrix**: O(V²)
- **Adjacency List with Binary Heap**: O(E log V)
- **Adjacency List with Fibonacci Heap**: O(E + V log V)

**Space Complexity:**
- O(V + E) for storing the graph
- O(V) for auxiliary arrays

**Advantages:**
- Efficient for dense graphs
- Always finds the optimal solution
- Easy to implement with priority queues

**Disadvantages:**
- Requires graph to be connected
- Not as efficient for sparse graphs compared to Kruskal's

## DSA Kruskal's Algorithm

Kruskal's algorithm is another greedy algorithm for finding a minimum spanning tree. It works by sorting all edges from lowest to highest weight, then picking edges one by one while ensuring no cycles are formed.

### How Kruskal's Algorithm Works

1. **Sort Edges**: Sort all edges in non-decreasing order of their weight
2. **Initialize**: Create a forest (set of trees) where each vertex is a separate tree
3. **Process Edges**: For each edge in sorted order:
   - If adding the edge doesn't form a cycle, add it to MST
   - Otherwise, discard it
4. **Terminate**: When V-1 edges are added to MST

### Union-Find Data Structure

Kruskal's algorithm uses the Union-Find (Disjoint Set Union) data structure to efficiently detect cycles.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Structure to represent an edge
struct Edge {
    int src, dest, weight;
    
    // Comparator for sorting edges
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

// Union-Find (Disjoint Set) data structure
class UnionFind {
private:
    vector<int> parent, rank;
    
public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    void unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX != rootY) {
            // Union by rank
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
};

// Kruskal's Algorithm Implementation
void kruskalMST(vector<Edge>& edges, int V) {
    // Sort edges by weight
    sort(edges.begin(), edges.end());
    
    UnionFind uf(V);
    vector<Edge> mst;
    int totalWeight = 0;
    
    cout << "Kruskal's Algorithm Process:" << endl;
    cout << "Sorted edges by weight:" << endl;
    for (const auto& edge : edges) {
        cout << edge.src << " - " << edge.dest << " : " << edge.weight << endl;
    }
    cout << endl;
    
    for (const auto& edge : edges) {
        int srcRoot = uf.find(edge.src);
        int destRoot = uf.find(edge.dest);
        
        // If including this edge doesn't cause cycle
        if (srcRoot != destRoot) {
            mst.push_back(edge);
            totalWeight += edge.weight;
            uf.unite(srcRoot, destRoot);
            
            cout << "Adding edge: " << edge.src << " - " << edge.dest 
                 << " (weight: " << edge.weight << ")" << endl;
        } else {
            cout << "Skipping edge: " << edge.src << " - " << edge.dest 
                 << " (would create cycle)" << endl;
        }
        
        // Stop when we have V-1 edges
        if (mst.size() == V - 1) {
            break;
        }
    }
    
    // Print the MST
    cout << "\nMinimum Spanning Tree (Kruskal's Algorithm):" << endl;
    cout << "Edge \tWeight" << endl;
    for (const auto& edge : mst) {
        cout << edge.src << " - " << edge.dest << " \t" << edge.weight << endl;
    }
    cout << "Total weight of MST: " << totalWeight << endl;
}

int main() {
    // Example graph with 5 vertices and 7 edges
    int V = 5;
    vector<Edge> edges = {
        {0, 1, 2},
        {0, 3, 6},
        {1, 2, 3},
        {1, 3, 8},
        {1, 4, 5},
        {2, 4, 7},
        {3, 4, 9}
    };
    
    kruskalMST(edges, V);
    
    return 0;
}
```

**Output:**
```
Kruskal's Algorithm Process:
Sorted edges by weight:
0 - 1 : 2
1 - 2 : 3
1 - 4 : 5
0 - 3 : 6
2 - 4 : 7
1 - 3 : 8
3 - 4 : 9

Adding edge: 0 - 1 (weight: 2)
Adding edge: 1 - 2 (weight: 3)
Adding edge: 1 - 4 (weight: 5)
Skipping edge: 0 - 3 (would create cycle)
Adding edge: 0 - 3 (weight: 6)

Minimum Spanning Tree (Kruskal's Algorithm):
Edge    Weight
0 - 1   2
1 - 2   3
1 - 4   5
0 - 3   6
Total weight of MST: 16
```

### Kruskal's Algorithm Complexity

**Time Complexity:**
- **Sorting Edges**: O(E log E)
- **Union-Find Operations**: O(E α(V)) where α is the inverse Ackermann function
- **Overall**: O(E log E) or O(E log V) (since E ≤ V²)

**Space Complexity:**
- O(V + E) for storing edges and Union-Find structure

**Advantages:**
- Efficient for sparse graphs
- Simple to implement
- Works well with edge lists
- Doesn't require the graph to be connected initially

**Disadvantages:**
- Requires sorting all edges
- Less efficient for dense graphs
- Needs extra memory for Union-Find structure

## Comparison: Prim's vs Kruskal's

| Aspect | Prim's Algorithm | Kruskal's Algorithm |
|--------|-----------------|---------------------|
| **Approach** | Vertex-based (grows tree from starting vertex) | Edge-based (sorts all edges first) |
| **Best For** | Dense graphs | Sparse graphs |
| **Data Structure** | Priority Queue (Heap) | Union-Find (Disjoint Set) |
| **Time Complexity** | O(E log V) with binary heap | O(E log E) |
| **Space Complexity** | O(V + E) | O(V + E) |
| **Graph Requirement** | Must be connected | Can work with disconnected graphs |
| **Implementation** | Slightly more complex | Simpler with Union-Find |

## Applications of Minimum Spanning Tree

1. **Network Design**: Designing computer, telecommunications, or transportation networks
2. **Circuit Design**: Connecting pins on a circuit board with minimum wire length
3. **Cluster Analysis**: In machine learning for hierarchical clustering
4. **Image Segmentation**: In computer vision for region-based segmentation
5. **Road/Plumbing Networks**: Planning infrastructure with minimum cost
6. **Approximation Algorithms**: For NP-hard problems like Traveling Salesman

## Example: Real-World MST Application

Consider connecting 5 cities with roads. The costs (in millions) between cities are:
- City 0-1: $2M
- City 0-3: $6M
- City 1-2: $3M
- City 1-3: $8M
- City 1-4: $5M
- City 2-4: $7M
- City 3-4: $9M

Both Prim's and Kruskal's algorithms would find the optimal road network:
- Roads: 0-1, 1-2, 1-4, 0-3
- Total Cost: $16M

This ensures all cities are connected with minimum total construction cost, avoiding unnecessary expensive connections while preventing isolated cities.

## Visual Example of MST Construction

```
Initial Graph:
    2
 (0)---(1)
  |    /|\
 6|  8/ | \5
  |  /  |  \
 (3)  3 |  (4)
        |  /
        | /7
       (2)

MST Construction (Prim's starting from vertex 0):
Step 1: Start at 0
Step 2: Add edge 0-1 (weight 2)
Step 3: From {0,1}, add edge 1-2 (weight 3)
Step 4: From {0,1,2}, add edge 1-4 (weight 5)
Step 5: From {0,1,2,4}, add edge 0-3 (weight 6)

Final MST:
    2
 (0)---(1)
  |     |\
 6|     | \5
  |     |  \
 (3)  3 |  (4)
         (2)
Total Weight: 2 + 3 + 5 + 6 = 16
```

## Practice Problems

1. **Find MST Weight**: Given a graph with V vertices and E edges, find the weight of MST
2. **MST in Grid**: Connect all points in a 2D grid with minimum total Manhattan distance
3. **Second-best MST**: Find the spanning tree with the second minimum total weight
4. **Critical Edges**: Identify edges that must be included in every MST
5. **MST with Constraints**: Find MST while avoiding certain edges or requiring others

## Common Mistakes to Avoid

1. **Not checking for connectivity**: Ensure the graph is connected before applying Prim's
2. **Forgetting to sort edges**: Crucial for Kruskal's algorithm
3. **Ignoring cycle detection**: Essential in Kruskal's algorithm
4. **Using wrong data structures**: Choose appropriate structures for the algorithm
5. **Not optimizing Union-Find**: Implement path compression and union by rank for efficiency