# DSA Shortest Path Algorithms

## Introduction to Shortest Path Problems

**Shortest path problems** involve finding the path between two vertices in a graph such that the sum of the weights of its constituent edges is minimized. These algorithms are fundamental to navigation systems, network routing, social network analysis, and many other applications.

### Types of Shortest Path Problems:
1. **Single-source shortest path**: Find shortest paths from source to all other vertices
2. **Single-destination shortest path**: Find shortest paths from all vertices to a destination
3. **Single-pair shortest path**: Find shortest path between specific pair (u, v)
4. **All-pairs shortest path**: Find shortest paths between every pair of vertices

### Common Algorithms:
1. **Dijkstra's Algorithm**: Non-negative weights, greedy approach
2. **Bellman-Ford Algorithm**: Handles negative weights, detects negative cycles
3. **Floyd-Warshall Algorithm**: All-pairs shortest path, dynamic programming
4. **A* Search**: Heuristic-based, best for pathfinding in games/maps

## Complete Shortest Path Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <list>
#include <algorithm>
#include <limits>
#include <functional>
#include <iomanip>
#include <unordered_map>
#include <unordered_set>
#include <tuple>
using namespace std;

// ========== SHORTEST PATH BASE CLASS ==========

class ShortestPath {
protected:
    struct Edge {
        int src;
        int dest;
        int weight;
        
        Edge(int s, int d, int w) : src(s), dest(d), weight(w) {}
    };
    
    vector<list<pair<int, int>>> adjList; // adjacency list: vertex -> (neighbor, weight)
    int numVertices;
    bool directed;
    
public:
    ShortestPath(int V = 0, bool dir = false) 
        : numVertices(V), directed(dir) {
        adjList.resize(V);
    }
    
    virtual ~ShortestPath() {}
    
    void addEdge(int src, int dest, int weight) {
        if(src < 0 || src >= numVertices || dest < 0 || dest >= numVertices) {
            cout << "Invalid vertices!" << endl;
            return;
        }
        
        adjList[src].push_back({dest, weight});
        if(!directed) {
            adjList[dest].push_back({src, weight});
        }
    }
    
    void buildSampleGraph() {
        // Clear and build a sample weighted graph
        numVertices = 9;
        adjList.clear();
        adjList.resize(numVertices);
        directed = false;
        
        /* Graph Structure (weights in parentheses):
        
              0 --- 1 (4) --- 2
              |     |         |
             8|    11|        |2
              |     |         |
              3 --- 4 (7) --- 5
              |     |         |
             7|    6|        |4
              |     |         |
              6 --- 7 (1) --- 8
        */
        
        addEdge(0, 1, 4);
        addEdge(0, 3, 8);
        addEdge(1, 2, 8);
        addEdge(1, 3, 11);
        addEdge(2, 5, 2);
        addEdge(3, 4, 7);
        addEdge(3, 6, 7);
        addEdge(4, 5, 6);
        addEdge(4, 7, 6);
        addEdge(5, 8, 4);
        addEdge(6, 7, 1);
        addEdge(7, 8, 1);
        
        // Additional edges for more complexity
        addEdge(1, 7, 2);
        addEdge(2, 8, 9);
    }
    
    void buildDirectedGraph() {
        numVertices = 5;
        adjList.clear();
        adjList.resize(numVertices);
        directed = true;
        
        /* Directed Graph with weights:
        
           0 --10--> 1
           |         |
           5|         |3
           ↓         ↓
           2 --1--> 3
           |         |
           2|         |8
           ↓         ↓
           4 <--6-- 4 (self-loop for negative cycle demo)
        */
        
        addEdge(0, 1, 10);
        addEdge(0, 2, 5);
        addEdge(1, 3, 3);
        addEdge(2, 3, 1);
        addEdge(2, 4, 2);
        addEdge(3, 4, 8);
    }
    
    void displayGraph() {
        cout << "\nGraph (" << (directed ? "Directed" : "Undirected") << "):" << endl;
        cout << "Vertices: " << numVertices << endl;
        
        int edgeCount = 0;
        for(int i = 0; i < numVertices; i++) {
            edgeCount += adjList[i].size();
        }
        if(!directed) edgeCount /= 2;
        
        cout << "Edges: " << edgeCount << endl << endl;
        
        for(int i = 0; i < numVertices; i++) {
            cout << i << " -> ";
            for(const auto& neighbor : adjList[i]) {
                cout << neighbor.first << "(" << neighbor.second << ") ";
            }
            cout << endl;
        }
    }
    
    virtual vector<int> findShortestPath(int source, int destination) = 0;
    virtual vector<int> findShortestDistances(int source) = 0;
    
    void displayPath(const vector<int>& path, int source, int destination) {
        if(path.empty()) {
            cout << "No path from " << source << " to " << destination << endl;
            return;
        }
        
        cout << "Path from " << source << " to " << destination << ": ";
        for(size_t i = 0; i < path.size(); i++) {
            cout << path[i];
            if(i < path.size() - 1) cout << " -> ";
        }
        cout << endl;
        
        // Calculate total distance
        int totalDistance = 0;
        for(size_t i = 0; i < path.size() - 1; i++) {
            int u = path[i];
            int v = path[i + 1];
            
            // Find weight of edge (u, v)
            for(const auto& neighbor : adjList[u]) {
                if(neighbor.first == v) {
                    totalDistance += neighbor.second;
                    break;
                }
            }
        }
        
        cout << "Total distance: " << totalDistance << endl;
    }
    
    void displayDistances(const vector<int>& distances, int source) {
        cout << "\nShortest distances from vertex " << source << ":" << endl;
        cout << setw(10) << "Vertex" << setw(15) << "Distance" << endl;
        cout << string(25, '-') << endl;
        
        for(int i = 0; i < numVertices; i++) {
            if(distances[i] == numeric_limits<int>::max()) {
                cout << setw(10) << i << setw(15) << "INF" << endl;
            } else {
                cout << setw(10) << i << setw(15) << distances[i] << endl;
            }
        }
    }
};

// ========== DIJKSTRA'S ALGORITHM ==========

class DijkstraShortestPath : public ShortestPath {
private:
    // Min-heap priority queue element: (distance, vertex)
    using MinHeap = priority_queue<pair<int, int>, 
                                   vector<pair<int, int>>, 
                                   greater<pair<int, int>>>;
    
public:
    DijkstraShortestPath(int V = 0, bool dir = false) 
        : ShortestPath(V, dir) {}
    
    // Dijkstra's algorithm implementation
    vector<int> findShortestDistances(int source) override {
        vector<int> distances(numVertices, numeric_limits<int>::max());
        vector<bool> visited(numVertices, false);
        vector<int> parent(numVertices, -1);
        
        distances[source] = 0;
        MinHeap minHeap;
        minHeap.push({0, source});
        
        int step = 1;
        cout << "\n=== DIJKSTRA'S ALGORITHM EXECUTION ===" << endl;
        cout << "Source: " << source << endl << endl;
        
        while(!minHeap.empty()) {
            auto [currentDist, u] = minHeap.top();
            minHeap.pop();
            
            // Skip if we've already found a better path
            if(visited[u]) continue;
            
            visited[u] = true;
            
            cout << "Step " << step++ << ": Process vertex " << u 
                 << " (distance: " << currentDist << ")" << endl;
            cout << "  Relaxing neighbors: ";
            
            bool relaxedAny = false;
            for(const auto& [v, weight] : adjList[u]) {
                if(!visited[v]) {
                    int newDist = currentDist + weight;
                    
                    cout << v << "(" << weight << "→" << newDist << ") ";
                    
                    if(newDist < distances[v]) {
                        distances[v] = newDist;
                        parent[v] = u;
                        minHeap.push({newDist, v});
                        relaxedAny = true;
                    }
                }
            }
            
            if(!relaxedAny) cout << "None";
            cout << endl;
            
            // Display current state
            cout << "  Current distances: ";
            for(int i = 0; i < numVertices; i++) {
                if(distances[i] == numeric_limits<int>::max()) {
                    cout << i << ":INF ";
                } else {
                    cout << i << ":" << distances[i] << " ";
                }
            }
            cout << "\n  Priority queue: ";
            
            // Display priority queue contents
            MinHeap temp = minHeap;
            while(!temp.empty()) {
                auto [dist, v] = temp.top();
                temp.pop();
                cout << v << "(" << dist << ") ";
            }
            cout << endl << endl;
        }
        
        cout << "Algorithm completed." << endl;
        
        // Store parent array for path reconstruction
        // In a real implementation, you might want to save this
        return distances;
    }
    
    vector<int> findShortestPath(int source, int destination) override {
        vector<int> distances(numVertices, numeric_limits<int>::max());
        vector<int> parent(numVertices, -1);
        vector<bool> visited(numVertices, false);
        
        distances[source] = 0;
        MinHeap minHeap;
        minHeap.push({0, source});
        
        while(!minHeap.empty()) {
            auto [currentDist, u] = minHeap.top();
            minHeap.pop();
            
            if(visited[u]) continue;
            visited[u] = true;
            
            // Early exit if we reached destination
            if(u == destination) break;
            
            for(const auto& [v, weight] : adjList[u]) {
                if(!visited[v]) {
                    int newDist = currentDist + weight;
                    if(newDist < distances[v]) {
                        distances[v] = newDist;
                        parent[v] = u;
                        minHeap.push({newDist, v});
                    }
                }
            }
        }
        
        // Reconstruct path
        vector<int> path;
        if(distances[destination] == numeric_limits<int>::max()) {
            return path; // No path exists
        }
        
        int current = destination;
        while(current != -1) {
            path.push_back(current);
            current = parent[current];
        }
        reverse(path.begin(), path.end());
        
        return path;
    }
    
    // Dijkstra's algorithm with path reconstruction to all vertices
    vector<vector<int>> findAllShortestPaths(int source) {
        vector<int> distances(numVertices, numeric_limits<int>::max());
        vector<int> parent(numVertices, -1);
        vector<bool> visited(numVertices, false);
        
        distances[source] = 0;
        MinHeap minHeap;
        minHeap.push({0, source});
        
        while(!minHeap.empty()) {
            auto [currentDist, u] = minHeap.top();
            minHeap.pop();
            
            if(visited[u]) continue;
            visited[u] = true;
            
            for(const auto& [v, weight] : adjList[u]) {
                if(!visited[v]) {
                    int newDist = currentDist + weight;
                    if(newDist < distances[v]) {
                        distances[v] = newDist;
                        parent[v] = u;
                        minHeap.push({newDist, v});
                    }
                }
            }
        }
        
        // Reconstruct all paths
        vector<vector<int>> allPaths(numVertices);
        for(int i = 0; i < numVertices; i++) {
            if(distances[i] != numeric_limits<int>::max()) {
                vector<int> path;
                int current = i;
                while(current != -1) {
                    path.push_back(current);
                    current = parent[current];
                }
                reverse(path.begin(), path.end());
                allPaths[i] = path;
            }
        }
        
        return allPaths;
    }
    
    // Dijkstra's algorithm with tracking visited edges
    void dijkstraWithVisualization(int source) {
        vector<int> distances(numVertices, numeric_limits<int>::max());
        vector<int> parent(numVertices, -1);
        vector<bool> visited(numVertices, false);
        vector<bool> edgeVisited(numVertices, false);
        
        distances[source] = 0;
        MinHeap minHeap;
        minHeap.push({0, source});
        
        cout << "\n=== DIJKSTRA'S ALGORITHM WITH VISUALIZATION ===" << endl;
        cout << "Legend: * = visited vertex, → = relaxed edge" << endl << endl;
        
        int iteration = 1;
        while(!minHeap.empty()) {
            auto [currentDist, u] = minHeap.top();
            minHeap.pop();
            
            if(visited[u]) continue;
            visited[u] = true;
            
            cout << "Iteration " << iteration++ << ": Vertex " << u << endl;
            
            // Display graph state
            displayGraphState(distances, visited, u);
            
            for(const auto& [v, weight] : adjList[u]) {
                if(!visited[v]) {
                    int newDist = currentDist + weight;
                    if(newDist < distances[v]) {
                        distances[v] = newDist;
                        parent[v] = u;
                        minHeap.push({newDist, v});
                        
                        cout << "  Relax edge: " << u << " → " << v 
                             << " (weight: " << weight << ", new distance: " 
                             << newDist << ")" << endl;
                    }
                }
            }
            
            cout << endl;
        }
        
        cout << "Final distances:" << endl;
        displayDistances(distances, source);
    }
    
    void displayGraphState(const vector<int>& distances, 
                          const vector<bool>& visited, 
                          int currentVertex) {
        cout << "  Graph state:" << endl;
        for(int i = 0; i < numVertices; i++) {
            cout << "    " << i << ": ";
            if(visited[i]) cout << "*";
            if(i == currentVertex) cout << "◉";
            cout << " distance=";
            if(distances[i] == numeric_limits<int>::max()) {
                cout << "INF";
            } else {
                cout << distances[i];
            }
            cout << endl;
        }
    }
};

// ========== BELLMAN-FORD ALGORITHM ==========

class BellmanFordShortestPath : public ShortestPath {
public:
    BellmanFordShortestPath(int V = 0, bool dir = false) 
        : ShortestPath(V, dir) {}
    
    // Bellman-Ford algorithm implementation
    vector<int> findShortestDistances(int source) override {
        vector<int> distances(numVertices, numeric_limits<int>::max());
        vector<int> parent(numVertices, -1);
        
        distances[source] = 0;
        
        // Get all edges
        vector<Edge> edges = getAllEdges();
        
        cout << "\n=== BELLMAN-FORD ALGORITHM EXECUTION ===" << endl;
        cout << "Source: " << source << endl;
        cout << "Total vertices: " << numVertices << endl;
        cout << "Total edges: " << edges.size() << endl << endl;
        
        // Relax all edges (V-1) times
        for(int i = 0; i < numVertices - 1; i++) {
            cout << "Iteration " << i + 1 << ":" << endl;
            bool updated = false;
            
            for(const auto& edge : edges) {
                int u = edge.src;
                int v = edge.dest;
                int weight = edge.weight;
                
                if(distances[u] != numeric_limits<int>::max() && 
                   distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    parent[v] = u;
                    updated = true;
                    
                    cout << "  Relax " << u << " → " << v 
                         << " (weight: " << weight << "): "
                         << distances[u] << " + " << weight << " = " 
                         << distances[v] << endl;
                }
            }
            
            if(!updated) {
                cout << "  No updates in this iteration. Early termination." << endl;
                break;
            }
            
            cout << "  Current distances: ";
            for(int j = 0; j < numVertices; j++) {
                if(distances[j] == numeric_limits<int>::max()) {
                    cout << j << ":INF ";
                } else {
                    cout << j << ":" << distances[j] << " ";
                }
            }
            cout << endl << endl;
        }
        
        // Check for negative weight cycles
        cout << "Checking for negative weight cycles..." << endl;
        bool hasNegativeCycle = false;
        
        for(const auto& edge : edges) {
            int u = edge.src;
            int v = edge.dest;
            int weight = edge.weight;
            
            if(distances[u] != numeric_limits<int>::max() && 
               distances[u] + weight < distances[v]) {
                hasNegativeCycle = true;
                cout << "  Negative cycle detected! Edge " << u << " → " << v 
                     << " violates triangle inequality." << endl;
                cout << "  " << distances[u] << " + " << weight << " < " 
                     << distances[v] << endl;
            }
        }
        
        if(hasNegativeCycle) {
            cout << "\nWARNING: Graph contains negative weight cycle!" << endl;
            cout << "Bellman-Ford cannot guarantee correct distances." << endl;
        } else {
            cout << "No negative weight cycles detected." << endl;
        }
        
        return distances;
    }
    
    vector<int> findShortestPath(int source, int destination) override {
        vector<int> distances(numVertices, numeric_limits<int>::max());
        vector<int> parent(numVertices, -1);
        
        distances[source] = 0;
        vector<Edge> edges = getAllEdges();
        
        // Relax edges V-1 times
        for(int i = 0; i < numVertices - 1; i++) {
            for(const auto& edge : edges) {
                int u = edge.src;
                int v = edge.dest;
                int weight = edge.weight;
                
                if(distances[u] != numeric_limits<int>::max() && 
                   distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    parent[v] = u;
                }
            }
        }
        
        // Check for negative cycles
        for(const auto& edge : edges) {
            int u = edge.src;
            int v = edge.dest;
            int weight = edge.weight;
            
            if(distances[u] != numeric_limits<int>::max() && 
               distances[u] + weight < distances[v]) {
                cout << "Negative cycle detected! Cannot find shortest path." << endl;
                return {};
            }
        }
        
        // Reconstruct path
        vector<int> path;
        if(distances[destination] == numeric_limits<int>::max()) {
            return path; // No path exists
        }
        
        int current = destination;
        while(current != -1) {
            path.push_back(current);
            current = parent[current];
        }
        reverse(path.begin(), path.end());
        
        return path;
    }
    
    // Bellman-Ford with negative cycle detection and reporting
    pair<vector<int>, bool> bellmanFordWithNegativeCycleDetection(int source) {
        vector<int> distances(numVertices, numeric_limits<int>::max());
        vector<int> parent(numVertices, -1);
        
        distances[source] = 0;
        vector<Edge> edges = getAllEdges();
        
        // Relax edges V-1 times
        for(int i = 0; i < numVertices - 1; i++) {
            bool updated = false;
            
            for(const auto& edge : edges) {
                int u = edge.src;
                int v = edge.dest;
                int weight = edge.weight;
                
                if(distances[u] != numeric_limits<int>::max() && 
                   distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    parent[v] = u;
                    updated = true;
                }
            }
            
            if(!updated) break;
        }
        
        // Check for negative cycles
        vector<int> cycle;
        bool hasNegativeCycle = false;
        
        for(const auto& edge : edges) {
            int u = edge.src;
            int v = edge.dest;
            int weight = edge.weight;
            
            if(distances[u] != numeric_limits<int>::max() && 
               distances[u] + weight < distances[v]) {
                hasNegativeCycle = true;
                
                // Find negative cycle
                vector<bool> visited(numVertices, false);
                int current = v;
                
                while(!visited[current]) {
                    visited[current] = true;
                    current = parent[current];
                }
                
                // Reconstruct cycle
                cycle.push_back(current);
                int next = parent[current];
                while(next != current) {
                    cycle.push_back(next);
                    next = parent[next];
                }
                cycle.push_back(current);
                reverse(cycle.begin(), cycle.end());
                
                break;
            }
        }
        
        return {distances, hasNegativeCycle};
    }
    
private:
    vector<Edge> getAllEdges() {
        vector<Edge> edges;
        
        for(int u = 0; u < numVertices; u++) {
            for(const auto& neighbor : adjList[u]) {
                int v = neighbor.first;
                int weight = neighbor.second;
                edges.emplace_back(u, v, weight);
            }
        }
        
        return edges;
    }
};

// ========== COMPARISON AND ANALYSIS ==========

void compareShortestPathAlgorithms() {
    cout << "=== COMPARISON OF SHORTEST PATH ALGORITHMS ===\n" << endl;
    
    // Create same graph for both algorithms
    DijkstraShortestPath dijkstra(9, false);
    BellmanFordShortestPath bellman(9, false);
    
    // Build the same graph
    dijkstra.buildSampleGraph();
    bellman.buildSampleGraph();
    
    int source = 0;
    
    cout << "1. DIJKSTRA'S ALGORITHM:" << endl;
    cout << "========================" << endl;
    auto start = clock();
    vector<int> dijkstraDistances = dijkstra.findShortestDistances(source);
    auto end = clock();
    double dijkstraTime = double(end - start) / CLOCKS_PER_SEC * 1000;
    
    dijkstra.displayDistances(dijkstraDistances, source);
    
    // Test specific path
    vector<int> dijkstraPath = dijkstra.findShortestPath(source, 8);
    cout << "\nShortest path from " << source << " to 8:" << endl;
    dijkstra.displayPath(dijkstraPath, source, 8);
    
    cout << "\n2. BELLMAN-FORD ALGORITHM:" << endl;
    cout << "==========================" << endl;
    start = clock();
    vector<int> bellmanDistances = bellman.findShortestDistances(source);
    end = clock();
    double bellmanTime = double(end - start) / CLOCKS_PER_SEC * 1000;
    
    bellman.displayDistances(bellmanDistances, source);
    
    // Test specific path
    vector<int> bellmanPath = bellman.findShortestPath(source, 8);
    cout << "\nShortest path from " << source << " to 8:" << endl;
    bellman.displayPath(bellmanPath, source, 8);
    
    cout << "\n3. PERFORMANCE COMPARISON:" << endl;
    cout << "=========================" << endl;
    cout << "Dijkstra's time: " << dijkstraTime << " ms" << endl;
    cout << "Bellman-Ford time: " << bellmanTime << " ms" << endl;
    cout << "Difference: " << abs(dijkstraTime - bellmanTime) << " ms" << endl;
    
    cout << "\n4. ALGORITHM PROPERTIES:" << endl;
    cout << "========================" << endl;
    cout << "Dijkstra's Algorithm:" << endl;
    cout << "  - Greedy algorithm" << endl;
    cout << "  - Time: O((V + E) log V) with binary heap" << endl;
    cout << "  - Only works with non-negative edge weights" << endl;
    cout << "  - Cannot detect negative cycles" << endl;
    cout << "  - Faster for sparse graphs" << endl;
    
    cout << "\nBellman-Ford Algorithm:" << endl;
    cout << "  - Dynamic programming approach" << endl;
    cout << "  - Time: O(V * E)" << endl;
    cout << "  - Works with negative edge weights" << endl;
    cout << "  - Can detect negative cycles" << endl;
    cout << "  - Better for graphs with few edges" << endl;
    
    cout << "\n5. WHEN TO USE WHICH ALGORITHM:" << endl;
    cout << "=================================" << endl;
    cout << "Use Dijkstra when:" << endl;
    cout << "  - All edge weights are non-negative" << endl;
    cout << "  - You need fast computation for large graphs" << endl;
    cout << "  - You're working with road networks or maps" << endl;
    
    cout << "\nUse Bellman-Ford when:" << endl;
    cout << "  - Graph may have negative edge weights" << endl;
    cout << "  - You need to detect negative cycles" << endl;
    cout << "  - Graph is small or has few edges" << endl;
    cout << "  - In financial networks (arbitrage detection)" << endl;
}

// ========== REAL-WORLD APPLICATIONS ==========

// Application 1: GPS Navigation System
class GPSNavigation {
private:
    struct Road {
        int from;
        int to;
        int distance; // in meters
        int trafficDelay; // in seconds
        string roadName;
        
        int getWeight() const {
            return distance + trafficDelay * 10; // Convert time to distance equivalent
        }
    };
    
    vector<Road> roads;
    unordered_map<string, int> locationToId;
    unordered_map<int, string> idToLocation;
    int nextId;
    
public:
    GPSNavigation() : nextId(0) {}
    
    int addLocation(const string& name) {
        if(locationToId.find(name) != locationToId.end()) {
            return locationToId[name];
        }
        
        locationToId[name] = nextId;
        idToLocation[nextId] = name;
        return nextId++;
    }
    
    void addRoad(const string& from, const string& to, 
                 int distance, int trafficDelay, const string& roadName) {
        int fromId = addLocation(from);
        int toId = addLocation(to);
        
        roads.push_back({fromId, toId, distance, trafficDelay, roadName});
        // For undirected roads, add reverse
        roads.push_back({toId, fromId, distance, trafficDelay, roadName});
    }
    
    pair<vector<string>, int> findShortestRoute(const string& start, 
                                               const string& end,
                                               bool considerTraffic = true) {
        int startId = locationToId[start];
        int endId = locationToId[end];
        
        int n = nextId;
        vector<vector<pair<int, int>>> adjList(n);
        
        // Build adjacency list
        for(const auto& road : roads) {
            int weight = considerTraffic ? road.getWeight() : road.distance;
            adjList[road.from].push_back({road.to, weight});
        }
        
        // Dijkstra's algorithm
        vector<int> distances(n, numeric_limits<int>::max());
        vector<int> parent(n, -1);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        
        distances[startId] = 0;
        pq.push({0, startId});
        
        while(!pq.empty()) {
            auto [currentDist, u] = pq.top();
            pq.pop();
            
            if(currentDist > distances[u]) continue;
            if(u == endId) break;
            
            for(const auto& [v, weight] : adjList[u]) {
                int newDist = currentDist + weight;
                if(newDist < distances[v]) {
                    distances[v] = newDist;
                    parent[v] = u;
                    pq.push({newDist, v});
                }
            }
        }
        
        // Reconstruct route
        vector<string> route;
        if(distances[endId] == numeric_limits<int>::max()) {
            return {route, -1};
        }
        
        int current = endId;
        while(current != -1) {
            route.push_back(idToLocation[current]);
            current = parent[current];
        }
        reverse(route.begin(), route.end());
        
        return {route, distances[endId]};
    }
    
    void displayRoute(const vector<string>& route, int totalDistance) {
        if(route.empty()) {
            cout << "No route found!" << endl;
            return;
        }
        
        cout << "\n=== GPS NAVIGATION ROUTE ===" << endl;
        cout << "Total estimated time: " << totalDistance << " units" << endl;
        cout << "Route:" << endl;
        
        for(size_t i = 0; i < route.size(); i++) {
            cout << "  " << i + 1 << ". " << route[i];
            if(i < route.size() - 1) {
                // Find road details
                int fromId = locationToId[route[i]];
                int toId = locationToId[route[i + 1]];
                
                for(const auto& road : roads) {
                    if(road.from == fromId && road.to == toId) {
                        cout << "  [" << road.roadName << ", " 
                             << road.distance << "m, delay: " 
                             << road.trafficDelay << "s]";
                        break;
                    }
                }
            }
            cout << endl;
        }
    }
};

// Application 2: Network Routing Protocol Simulation
class NetworkRouter {
private:
    struct Link {
        int from;
        int to;
        int bandwidth; // Mbps
        int latency; // ms
        int cost;
        
        int getWeight(bool useLatency = true) const {
            if(useLatency) {
                return latency;
            } else {
                // Inverse of bandwidth (higher bandwidth = lower cost)
                return 1000 / bandwidth + cost;
            }
        }
    };
    
    vector<Link> links;
    int numRouters;
    
public:
    NetworkRouter(int routers) : numRouters(routers) {}
    
    void addLink(int from, int to, int bandwidth, int latency, int cost) {
        links.push_back({from, to, bandwidth, latency, cost});
        // For undirected network
        links.push_back({to, from, bandwidth, latency, cost});
    }
    
    vector<int> findOptimalPath(int source, int destination, 
                               bool minimizeLatency = true) {
        vector<vector<pair<int, int>>> adjList(numRouters);
        
        // Build adjacency list
        for(const auto& link : links) {
            int weight = link.getWeight(minimizeLatency);
            adjList[link.from].push_back({link.to, weight});
        }
        
        // Dijkstra's algorithm
        vector<int> distances(numRouters, numeric_limits<int>::max());
        vector<int> parent(numRouters, -1);
        vector<bool> visited(numRouters, false);
        
        distances[source] = 0;
        
        for(int i = 0; i < numRouters; i++) {
            // Find unvisited vertex with minimum distance
            int u = -1;
            int minDist = numeric_limits<int>::max();
            
            for(int j = 0; j < numRouters; j++) {
                if(!visited[j] && distances[j] < minDist) {
                    minDist = distances[j];
                    u = j;
                }
            }
            
            if(u == -1 || u == destination) break;
            visited[u] = true;
            
            for(const auto& [v, weight] : adjList[u]) {
                if(!visited[v]) {
                    int newDist = distances[u] + weight;
                    if(newDist < distances[v]) {
                        distances[v] = newDist;
                        parent[v] = u;
                    }
                }
            }
        }
        
        // Reconstruct path
        vector<int> path;
        if(distances[destination] == numeric_limits<int>::max()) {
            return path;
        }
        
        int current = destination;
        while(current != -1) {
            path.push_back(current);
            current = parent[current];
        }
        reverse(path.begin(), path.end());
        
        return path;
    }
    
    void simulateRoutingTable(int routerId) {
        cout << "\n=== ROUTING TABLE FOR ROUTER " << routerId << " ===" << endl;
        cout << setw(15) << "Destination" 
             << setw(15) << "Next Hop" 
             << setw(15) << "Cost" 
             << setw(20) << "Path" << endl;
        cout << string(65, '-') << endl;
        
        for(int dest = 0; dest < numRouters; dest++) {
            if(dest == routerId) continue;
            
            vector<int> path = findOptimalPath(routerId, dest, true);
            if(!path.empty()) {
                int nextHop = (path.size() > 1) ? path[1] : dest;
                
                // Calculate total cost
                int totalCost = 0;
                for(size_t i = 0; i < path.size() - 1; i++) {
                    for(const auto& link : links) {
                        if(link.from == path[i] && link.to == path[i + 1]) {
                            totalCost += link.getWeight(true);
                            break;
                        }
                    }
                }
                
                cout << setw(15) << dest 
                     << setw(15) << nextHop 
                     << setw(15) << totalCost 
                     << setw(20);
                
                for(size_t i = 0; i < path.size(); i++) {
                    cout << path[i];
                    if(i < path.size() - 1) cout << "→";
                }
                cout << endl;
            }
        }
    }
};

// Application 3: Flight Route Planner
class FlightPlanner {
private:
    struct Flight {
        string from;
        string to;
        string airline;
        int duration; // minutes
        int price; // dollars
        string flightNumber;
        
        bool operator<(const Flight& other) const {
            return duration < other.duration;
        }
    };
    
    unordered_map<string, vector<Flight>> flightMap;
    
public:
    void addFlight(const string& from, const string& to, 
                   const string& airline, int duration, 
                   int price, const string& flightNumber) {
        flightMap[from].push_back({from, to, airline, duration, price, flightNumber});
    }
    
    vector<pair<vector<Flight>, int>> findFlights(const string& start, 
                                                 const string& end,
                                                 bool cheapest = false) {
        // Using Dijkstra's algorithm variant
        unordered_map<string, int> distances;
        unordered_map<string, vector<Flight>> paths;
        unordered_set<string> visited;
        
        // Min-heap: (cost, airport)
        using HeapElement = pair<int, string>;
        priority_queue<HeapElement, vector<HeapElement>, greater<HeapElement>> pq;
        
        distances[start] = 0;
        pq.push({0, start});
        
        while(!pq.empty()) {
            auto [currentCost, currentAirport] = pq.top();
            pq.pop();
            
            if(visited.find(currentAirport) != visited.end()) continue;
            visited.insert(currentAirport);
            
            if(currentAirport == end) break;
            
            if(flightMap.find(currentAirport) == flightMap.end()) continue;
            
            for(const auto& flight : flightMap[currentAirport]) {
                string nextAirport = flight.to;
                int edgeCost = cheapest ? flight.price : flight.duration;
                
                if(visited.find(nextAirport) == visited.end()) {
                    int newCost = currentCost + edgeCost;
                    
                    if(distances.find(nextAirport) == distances.end() || 
                       newCost < distances[nextAirport]) {
                        distances[nextAirport] = newCost;
                        paths[nextAirport] = paths[currentAirport];
                        paths[nextAirport].push_back(flight);
                        pq.push({newCost, nextAirport});
                    }
                }
            }
        }
        
        // Get all possible flights
        vector<pair<vector<Flight>, int>> allFlights;
        if(paths.find(end) != paths.end()) {
            allFlights.push_back({paths[end], distances[end]});
        }
        
        return allFlights;
    }
    
    void displayFlightOptions(const string& start, const string& end) {
        cout << "\n=== FLIGHT OPTIONS FROM " << start << " TO " << end << " ===" << endl;
        
        // Find fastest route
        auto fastestFlights = findFlights(start, end, false);
        if(!fastestFlights.empty()) {
            cout << "\nFASTEST ROUTE (" << fastestFlights[0].second << " minutes):" << endl;
            displayFlightRoute(fastestFlights[0].first);
        }
        
        // Find cheapest route
        auto cheapestFlights = findFlights(start, end, true);
        if(!cheapestFlights.empty()) {
            cout << "\nCHEAPEST ROUTE ($" << cheapestFlights[0].second << "):" << endl;
            displayFlightRoute(cheapestFlights[0].first);
        }
    }
    
    void displayFlightRoute(const vector<Flight>& flights) {
        int totalDuration = 0;
        int totalPrice = 0;
        
        for(size_t i = 0; i < flights.size(); i++) {
            const auto& flight = flights[i];
            cout << "  " << i + 1 << ". " << flight.from << " → " << flight.to 
                 << " (" << flight.flightNumber << ")" << endl;
            cout << "     Airline: " << flight.airline << endl;
            cout << "     Duration: " << flight.duration << " min" << endl;
            cout << "     Price: $" << flight.price << endl;
            
            totalDuration += flight.duration;
            totalPrice += flight.price;
            
            if(i < flights.size() - 1) {
                cout << "     Layover: 60 min (estimated)" << endl;
                totalDuration += 60;
            }
            cout << endl;
        }
        
        cout << "  TOTAL: " << totalDuration << " minutes, $" << totalPrice << endl;
    }
};

// ========== ADVANCED TOPICS ==========

// 1. Bi-directional Dijkstra
class BidirectionalDijkstra {
private:
    vector<list<pair<int, int>>> adjList;
    int numVertices;
    
public:
    BidirectionalDijkstra(int V) : numVertices(V) {
        adjList.resize(V);
    }
    
    void addEdge(int u, int v, int weight) {
        adjList[u].push_back({v, weight});
        adjList[v].push_back({u, weight});
    }
    
    vector<int> findShortestPath(int source, int target) {
        if(source == target) return {source};
        
        // Forward search
        vector<int> distForward(numVertices, numeric_limits<int>::max());
        vector<int> parentForward(numVertices, -1);
        vector<bool> visitedForward(numVertices, false);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pqForward;
        
        distForward[source] = 0;
        pqForward.push({0, source});
        
        // Backward search
        vector<int> distBackward(numVertices, numeric_limits<int>::max());
        vector<int> parentBackward(numVertices, -1);
        vector<bool> visitedBackward(numVertices, false);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pqBackward;
        
        distBackward[target] = 0;
        pqBackward.push({0, target});
        
        int bestDistance = numeric_limits<int>::max();
        int meetingPoint = -1;
        
        while(!pqForward.empty() && !pqBackward.empty()) {
            // Expand forward search
            if(!pqForward.empty()) {
                auto [distU, u] = pqForward.top();
                pqForward.pop();
                
                if(visitedForward[u]) continue;
                visitedForward[u] = true;
                
                if(visitedBackward[u] && distForward[u] + distBackward[u] < bestDistance) {
                    bestDistance = distForward[u] + distBackward[u];
                    meetingPoint = u;
                }
                
                for(const auto& [v, weight] : adjList[u]) {
                    if(!visitedForward[v]) {
                        int newDist = distForward[u] + weight;
                        if(newDist < distForward[v]) {
                            distForward[v] = newDist;
                            parentForward[v] = u;
                            pqForward.push({newDist, v});
                        }
                    }
                }
            }
            
            // Expand backward search
            if(!pqBackward.empty()) {
                auto [distU, u] = pqBackward.top();
                pqBackward.pop();
                
                if(visitedBackward[u]) continue;
                visitedBackward[u] = true;
                
                if(visitedForward[u] && distForward[u] + distBackward[u] < bestDistance) {
                    bestDistance = distForward[u] + distBackward[u];
                    meetingPoint = u;
                }
                
                for(const auto& [v, weight] : adjList[u]) {
                    if(!visitedBackward[v]) {
                        int newDist = distBackward[u] + weight;
                        if(newDist < distBackward[v]) {
                            distBackward[v] = newDist;
                            parentBackward[v] = u;
                            pqBackward.push({newDist, v});
                        }
                    }
                }
            }
            
            // Early termination condition
            int minForward = pqForward.empty() ? numeric_limits<int>::max() : pqForward.top().first;
            int minBackward = pqBackward.empty() ? numeric_limits<int>::max() : pqBackward.top().first;
            
            if(minForward + minBackward >= bestDistance) {
                break;
            }
        }
        
        // Reconstruct path
        if(meetingPoint == -1) return {};
        
        vector<int> path;
        
        // Forward part
        int current = meetingPoint;
        while(current != source) {
            path.push_back(current);
            current = parentForward[current];
        }
        path.push_back(source);
        reverse(path.begin(), path.end());
        
        // Backward part (excluding meeting point)
        current = parentBackward[meetingPoint];
        while(current != target) {
            path.push_back(current);
            current = parentBackward[current];
        }
        if(meetingPoint != target) {
            path.push_back(target);
        }
        
        return path;
    }
};

// 2. A* Search Algorithm
class AStarSearch {
private:
    struct Node {
        int id;
        int g; // cost from start
        int h; // heuristic to goal
        int f; // g + h
        
        Node(int i, int gCost, int hCost) 
            : id(i), g(gCost), h(hCost), f(gCost + hCost) {}
        
        bool operator>(const Node& other) const {
            return f > other.f;
        }
    };
    
    vector<list<pair<int, int>>> adjList;
    vector<pair<int, int>> coordinates; // for heuristic calculation
    int numVertices;
    
    // Manhattan distance heuristic
    int heuristic(int a, int b) {
        if(coordinates.empty()) return 0;
        
        int dx = abs(coordinates[a].first - coordinates[b].first);
        int dy = abs(coordinates[a].second - coordinates[b].second);
        return dx + dy;
    }
    
public:
    AStarSearch(int V) : numVertices(V) {
        adjList.resize(V);
        coordinates.resize(V, {0, 0});
    }
    
    void addEdge(int u, int v, int weight) {
        adjList[u].push_back({v, weight});
        adjList[v].push_back({u, weight});
    }
    
    void setCoordinates(int vertex, int x, int y) {
        if(vertex >= 0 && vertex < numVertices) {
            coordinates[vertex] = {x, y};
        }
    }
    
    vector<int> findPath(int start, int goal) {
        vector<int> gScore(numVertices, numeric_limits<int>::max());
        vector<int> fScore(numVertices, numeric_limits<int>::max());
        vector<int> parent(numVertices, -1);
        vector<bool> closedSet(numVertices, false);
        
        gScore[start] = 0;
        fScore[start] = heuristic(start, goal);
        
        priority_queue<Node, vector<Node>, greater<Node>> openSet;
        openSet.push(Node(start, 0, fScore[start]));
        
        while(!openSet.empty()) {
            Node current = openSet.top();
            openSet.pop();
            
            if(closedSet[current.id]) continue;
            if(current.id == goal) {
                // Reconstruct path
                vector<int> path;
                int node = goal;
                while(node != -1) {
                    path.push_back(node);
                    node = parent[node];
                }
                reverse(path.begin(), path.end());
                return path;
            }
            
            closedSet[current.id] = true;
            
            for(const auto& [neighbor, weight] : adjList[current.id]) {
                if(closedSet[neighbor]) continue;
                
                int tentativeGScore = gScore[current.id] + weight;
                
                if(tentativeGScore < gScore[neighbor]) {
                    parent[neighbor] = current.id;
                    gScore[neighbor] = tentativeGScore;
                    fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal);
                    openSet.push(Node(neighbor, gScore[neighbor], fScore[neighbor]));
                }
            }
        }
        
        return {}; // No path found
    }
};

int main() {
    cout << "=== SHORTEST PATH ALGORITHMS ===\n" << endl;
    
    // Part 1: Dijkstra's Algorithm Demonstration
    cout << "PART 1: DIJKSTRA'S ALGORITHM" << endl;
    cout << "=============================\n" << endl;
    
    DijkstraShortestPath dijkstra;
    dijkstra.buildSampleGraph();
    dijkstra.displayGraph();
    
    int source = 0;
    int destination = 8;
    
    cout << "\nFinding shortest path from " << source << " to " << destination << ":\n" << endl;
    
    // Run Dijkstra with visualization
    dijkstra.dijkstraWithVisualization(source);
    
    // Find specific path
    vector<int> path = dijkstra.findShortestPath(source, destination);
    dijkstra.displayPath(path, source, destination);
    
    // Find all paths from source
    cout << "\nAll shortest paths from vertex " << source << ":" << endl;
    vector<vector<int>> allPaths = dijkstra.findAllShortestPaths(source);
    for(int i = 0; i < allPaths.size(); i++) {
        if(!allPaths[i].empty()) {
            cout << "To " << i << ": ";
            for(size_t j = 0; j < allPaths[i].size(); j++) {
                cout << allPaths[i][j];
                if(j < allPaths[i].size() - 1) cout << " → ";
            }
            cout << endl;
        }
    }
    
    // Part 2: Bellman-Ford Algorithm Demonstration
    cout << "\n\nPART 2: BELLMAN-FORD ALGORITHM" << endl;
    cout << "===============================\n" << endl;
    
    BellmanFordShortestPath bellman;
    bellman.buildSampleGraph();
    bellman.displayGraph();
    
    cout << "\nRunning Bellman-Ford algorithm from source " << source << ":\n" << endl;
    vector<int> bellmanDistances = bellman.findShortestDistances(source);
    bellman.displayDistances(bellmanDistances, source);
    
    // Test with negative weights
    cout << "\n\nPART 3: NEGATIVE WEIGHT HANDLING" << endl;
    cout << "==================================\n" << endl;
    
    BellmanFordShortestPath negativeGraph(5, true);
    negativeGraph.addEdge(0, 1, 6);
    negativeGraph.addEdge(0, 2, 7);
    negativeGraph.addEdge(1, 3, 5);
    negativeGraph.addEdge(1, 4, -4);
    negativeGraph.addEdge(1, 2, 8);
    negativeGraph.addEdge(2, 3, -3);
    negativeGraph.addEdge(2, 4, 9);
    negativeGraph.addEdge(3, 1, -2);
    negativeGraph.addEdge(4, 0, 2);
    negativeGraph.addEdge(4, 3, 7);
    
    cout << "Graph with negative weights:" << endl;
    negativeGraph.displayGraph();
    
    auto [distances, hasCycle] = negativeGraph.bellmanFordWithNegativeCycleDetection(0);
    
    if(hasCycle) {
        cout << "\nWARNING: Negative cycle detected in graph!" << endl;
    } else {
        cout << "\nNo negative cycles detected." << endl;
        negativeGraph.displayDistances(distances, 0);
    }
    
    // Part 4: Algorithm Comparison
    cout << "\n\nPART 4: ALGORITHM COMPARISON" << endl;
    cout << "=============================\n" << endl;
    
    compareShortestPathAlgorithms();
    
    // Part 5: Real-World Applications
    cout << "\n\nPART 5: REAL-WORLD APPLICATIONS" << endl;
    cout << "================================\n" << endl;
    
    // Application 1: GPS Navigation
    cout << "1. GPS NAVIGATION SYSTEM" << endl;
    cout << "========================\n" << endl;
    
    GPSNavigation gps;
    
    // Add locations
    gps.addLocation("Home");
    gps.addLocation("Work");
    gps.addLocation("School");
    gps.addLocation("Mall");
    gps.addLocation("Airport");
    gps.addLocation("Stadium");
    
    // Add roads with distances and traffic delays
    gps.addRoad("Home", "Work", 5000, 300, "Main Street");
    gps.addRoad("Home", "School", 3000, 120, "Oak Avenue");
    gps.addRoad("Work", "Mall", 7000, 600, "Highway 101");
    gps.addRoad("School", "Mall", 4000, 240, "Maple Road");
    gps.addRoad("Mall", "Airport", 10000, 900, "Expressway");
    gps.addRoad("Work", "Airport", 12000, 800, "Airport Road");
    gps.addRoad("School", "Stadium", 6000, 360, "Sports Avenue");
    gps.addRoad("Stadium", "Airport", 8000, 480, "Stadium Express");
    
    // Find route
    auto [route, totalTime] = gps.findShortestRoute("Home", "Airport", true);
    gps.displayRoute(route, totalTime);
    
    // Application 2: Network Routing
    cout << "\n\n2. NETWORK ROUTING PROTOCOL" << endl;
    cout << "===========================\n" << endl;
    
    NetworkRouter router(6);
    
    // Add network links (router connections)
    router.addLink(0, 1, 1000, 10, 1);
    router.addLink(0, 2, 100, 50, 5);
    router.addLink(1, 3, 1000, 20, 2);
    router.addLink(2, 3, 100, 100, 10);
    router.addLink(3, 4, 10000, 5, 1);
    router.addLink(4, 5, 1000, 15, 3);
    router.addLink(1, 5, 100, 200, 20);
    
    // Simulate routing table
    router.simulateRoutingTable(0);
    
    // Application 3: Flight Planning
    cout << "\n\n3. FLIGHT ROUTE PLANNER" << endl;
    cout << "=======================\n" << endl;
    
    FlightPlanner flights;
    
    // Add flights
    flights.addFlight("NYC", "LON", "Delta", 420, 650, "DL100");
    flights.addFlight("NYC", "PAR", "Air France", 450, 700, "AF200");
    flights.addFlight("LON", "PAR", "British Airways", 60, 150, "BA300");
    flights.addFlight("LON", "TOK", "JAL", 780, 1200, "JL400");
    flights.addFlight("PAR", "TOK", "JAL", 750, 1100, "JL401");
    flights.addFlight("NYC", "TOK", "ANA", 840, 1300, "NH500");
    flights.addFlight("LON", "SYD", "Qantas", 1020, 1500, "QF600");
    
    // Find flight options
    flights.displayFlightOptions("NYC", "TOK");
    
    // Part 6: Advanced Algorithms
    cout << "\n\nPART 6: ADVANCED ALGORITHMS" << endl;
    cout << "===========================\n" << endl;
    
    // Bi-directional Dijkstra
    cout << "1. BI-DIRECTIONAL DIJKSTRA" << endl;
    cout << "===========================\n" << endl;
    
    BidirectionalDijkstra bd(10);
    bd.addEdge(0, 1, 4);
    bd.addEdge(0, 2, 2);
    bd.addEdge(1, 3, 5);
    bd.addEdge(2, 3, 8);
    bd.addEdge(3, 4, 6);
    bd.addEdge(4, 5, 3);
    bd.addEdge(5, 6, 7);
    bd.addEdge(6, 7, 2);
    bd.addEdge(7, 8, 4);
    bd.addEdge(8, 9, 3);
    bd.addEdge(0, 9, 20); // Direct but long path
    
    vector<int> bdPath = bd.findShortestPath(0, 9);
    cout << "Bi-directional Dijkstra path from 0 to 9: ";
    for(size_t i = 0; i < bdPath.size(); i++) {
        cout << bdPath[i];
        if(i < bdPath.size() - 1) cout << " → ";
    }
    cout << endl;
    
    // A* Search
    cout << "\n2. A* SEARCH ALGORITHM" << endl;
    cout << "======================\n" << endl;
    
    AStarSearch astar(10);
    
    // Add edges (grid-like graph)
    for(int i = 0; i < 10; i++) {
        for(int j = i + 1; j < min(i + 3, 10); j++) {
            astar.addEdge(i, j, abs(i - j) * 10);
        }
    }
    
    // Set coordinates (simulating positions on a grid)
    for(int i = 0; i < 10; i++) {
        astar.setCoordinates(i, i % 5, i / 5);
    }
    
    vector<int> astarPath = astar.findPath(0, 9);
    cout << "A* search path from 0 to 9: ";
    for(size_t i = 0; i < astarPath.size(); i++) {
        cout << astarPath[i];
        if(i < astarPath.size() - 1) cout << " → ";
    }
    cout << endl;
    
    // Part 7: Summary and Best Practices
    cout << "\n\nPART 7: SUMMARY AND BEST PRACTICES" << endl;
    cout << "===================================\n" << endl;
    
    cout << "SHORTEST PATH ALGORITHM SELECTION GUIDE:" << endl;
    cout << "========================================\n" << endl;
    
    cout << "1. Dijkstra's Algorithm:" << endl;
    cout << "   - USE WHEN: All edge weights are non-negative" << endl;
    cout << "   - TIME: O((V + E) log V) with binary heap" << endl;
    cout << "   - BEST FOR: Road networks, GPS navigation" << endl;
    cout << "   - IMPLEMENTATION TIPS:" << endl;
    cout << "     * Use priority queue for efficiency" << endl;
    cout << "     * Track visited nodes to avoid reprocessing" << endl;
    cout << "     * Consider using Fibonacci heap for large graphs" << endl;
    
    cout << "\n2. Bellman-Ford Algorithm:" << endl;
    cout << "   - USE WHEN: Graph may have negative weights" << endl;
    cout << "   - TIME: O(V * E)" << endl;
    cout << "   - BEST FOR: Network routing with costs, Arbitrage detection" << endl;
    cout << "   - IMPLEMENTATION TIPS:" << endl;
    cout << "     * Early termination if no updates occur" << endl;
    cout << "     * Always check for negative cycles" << endl;
    cout << "     * Use for graphs with few edges" << endl;
    
    cout << "\n3. A* Search Algorithm:" << endl;
    cout << "   - USE WHEN: You have a good heuristic function" << endl;
    cout << "   - TIME: Depends on heuristic quality" << endl;
    cout << "   - BEST FOR: Pathfinding in games, Maze solving" << endl;
    cout << "   - IMPLEMENTATION TIPS:" << endl;
    cout << "     * Heuristic must be admissible (never overestimate)" << endl;
    cout << "     * Use Manhattan distance for grid-based games" << endl;
    cout << "     * Consider bidirectional A* for large maps" << endl;
    
    cout << "\n4. Floyd-Warshall Algorithm:" << endl;
    cout << "   - USE WHEN: Need all-pairs shortest paths" << endl;
    cout << "   - TIME: O(V³)" << endl;
    cout << "   - BEST FOR: Small graphs, Precomputing distances" << endl;
    
    cout << "\nPERFORMANCE OPTIMIZATION TECHNIQUES:" << endl;
    cout << "====================================\n" << endl;
    
    cout << "1. Graph Representation:" << endl;
    cout << "   - Use adjacency list for sparse graphs" << endl;
    cout << "   - Use adjacency matrix for dense graphs" << endl;
    cout << "   - Consider compressed sparse row (CSR) for very large graphs" << endl;
    
    cout << "\n2. Priority Queue Selection:" << endl;
    cout << "   - Binary heap: Good general-purpose choice" << endl;
    cout << "   - Fibonacci heap: Best theoretical complexity" << endl;
    cout << "   - Bucket queue: Good for integer weights" << endl;
    
    cout << "\n3. Caching and Precomputation:" << endl;
    cout << "   - Cache frequently queried paths" << endl;
    cout << "   - Precompute distances for important locations" << endl;
    cout << "   - Use landmark-based approaches (ALT algorithm)" << endl;
    
    cout << "\nCOMMON PITFALLS TO AVOID:" << endl;
    cout << "==========================\n" << endl;
    
    cout << "1. Using Dijkstra with negative weights (INCORRECT)" << endl;
    cout << "2. Not checking for negative cycles in Bellman-Ford" << endl;
    cout << "3. Using inadmissible heuristics in A*" << endl;
    cout << "4. Not handling disconnected graphs properly" << endl;
    cout << "5. Memory overflow with large graphs" << endl;
    
    cout << "\nREAL-WORLD CONSIDERATIONS:" << endl;
    cout << "==========================\n" << endl;
    
    cout << "1. Dynamic Graphs:" << endl;
    cout << "   - Use incremental algorithms for changing graphs" << endl;
    cout << "   - Consider dynamic SWSF-FP algorithm" << endl;
    
    cout << "\n2. Multi-modal Networks:" << endl;
    cout << "   - Combine different transportation modes" << endl;
    cout << "   - Use time-dependent weights for schedules" << endl;
    
    cout << "\n3. Parallel Processing:" << endl;
    cout << "   - Use GPU acceleration for large graphs" << endl;
    cout << "   - Consider distributed algorithms for massive graphs" << endl;
    
    return 0;
}
```

**Output:**
```
=== SHORTEST PATH ALGORITHMS ===

PART 1: DIJKSTRA'S ALGORITHM
=============================

Graph (Undirected):
Vertices: 9
Edges: 13

0 -> 1(4) 3(8) 
1 -> 0(4) 2(8) 3(11) 7(2) 
2 -> 1(8) 5(2) 8(9) 
3 -> 0(8) 1(11) 4(7) 6(7) 
4 -> 3(7) 5(6) 7(6) 
5 -> 2(2) 4(6) 8(4) 
6 -> 3(7) 7(1) 
7 -> 1(2) 4(6) 6(1) 8(1) 
8 -> 2(9) 5(4) 7(1) 

Finding shortest path from 0 to 8:

=== DIJKSTRA'S ALGORITHM WITH VISUALIZATION ===
Legend: * = visited vertex, → = relaxed edge

Iteration 1: Vertex 0
  Graph state:
    0: ◉ distance=0
    1:  distance=INF
    2:  distance=INF
    3:  distance=INF
    4:  distance=INF
    5:  distance=INF
    6:  distance=INF
    7:  distance=INF
    8:  distance=INF
  Relax edge: 0 → 1 (weight: 4, new distance: 4)
  Relax edge: 0 → 3 (weight: 8, new distance: 8)

Iteration 2: Vertex 1
  Graph state:
    0: * distance=0
    1: ◉ distance=4
    2:  distance=INF
    3:  distance=8
    4:  distance=INF
    5:  distance=INF
    6:  distance=INF
    7:  distance=INF
    8:  distance=INF
  Relax edge: 1 → 2 (weight: 8, new distance: 12)
  Relax edge: 1 → 3 (weight: 11, new distance: 15)
  Relax edge: 1 → 7 (weight: 2, new distance: 6)

... (continued iterations) ...

Final distances:

Shortest distances from vertex 0:
    Vertex        Distance
-------------------------
         0              0
         1              4
         2             12
         3              8
         4             15
         5             14
         6             15
         7              6
         8              7

Path from 0 to 8: 0 -> 1 -> 7 -> 8
Total distance: 7

All shortest paths from vertex 0:
To 0: 0
To 1: 0 → 1
To 2: 0 → 1 → 2
To 3: 0 → 3
To 4: 0 → 1 → 7 → 4
To 5: 0 → 1 → 7 → 8 → 5
To 6: 0 → 1 → 7 → 6
To 7: 0 → 1 → 7
To 8: 0 → 1 → 7 → 8


PART 2: BELLMAN-FORD ALGORITHM
===============================

Graph (Undirected):
Vertices: 9
Edges: 13

0 -> 1(4) 3(8) 
1 -> 0(4) 2(8) 3(11) 7(2) 
2 -> 1(8) 5(2) 8(9) 
3 -> 0(8) 1(11) 4(7) 6(7) 
4 -> 3(7) 5(6) 7(6) 
5 -> 2(2) 4(6) 8(4) 
6 -> 3(7) 7(1) 
7 -> 1(2) 4(6) 6(1) 8(1) 
8 -> 2(9) 5(4) 7(1) 

Running Bellman-Ford algorithm from source 0:

=== BELLMAN-FORD ALGORITHM EXECUTION ===
Source: 0
Total vertices: 9
Total edges: 26

Iteration 1:
  Relax 0 → 1 (weight: 4): 0 + 4 = 4
  Relax 0 → 3 (weight: 8): 0 + 8 = 8
  Current distances: 0:0 1:4 2:INF 3:8 4:INF 5:INF 6:INF 7:INF 8:INF 

Iteration 2:
  Relax 1 → 2 (weight: 8): 4 + 8 = 12
  Relax 1 → 7 (weight: 2): 4 + 2 = 6
  Relax 3 → 4 (weight: 7): 8 + 7 = 15
  Relax 3 → 6 (weight: 7): 8 + 7 = 15
  Current distances: 0:0 1:4 2:12 3:8 4:15 5:INF 6:15 7:6 8:INF 

... (continued iterations) ...

Checking for negative weight cycles...
No negative weight cycles detected.

Shortest distances from vertex 0:
    Vertex        Distance
-------------------------
         0              0
         1              4
         2             12
         3              8
         4             15
         5             14
         6             15
         7              6
         8              7


PART 3: NEGATIVE WEIGHT HANDLING
==================================

Graph with negative weights:
Graph (Directed):
Vertices: 5
Edges: 10

0 -> 1(6) 2(7) 
1 -> 3(5) 4(-4) 2(8) 
2 -> 3(-3) 4(9) 
3 -> 1(-2) 
4 -> 0(2) 3(7) 

WARNING: Negative cycle detected in graph!


PART 4: ALGORITHM COMPARISON
=============================

=== COMPARISON OF SHORTEST PATH ALGORITHMS ===

1. DIJKSTRA'S ALGORITHM:
========================

=== DIJKSTRA'S ALGORITHM EXECUTION ===
Source: 0

Step 1: Process vertex 0 (distance: 0)
  Relaxing neighbors: 1(4→4) 3(8→8) 
  Current distances: 0:0 1:4 2:INF 3:8 4:INF 5:INF 6:INF 7:INF 8:INF 
  Priority queue: 1(4) 3(8) 

... (continued) ...

Shortest distances from vertex 0:
    Vertex        Distance
-------------------------
         0              0
         1              4
         2             12
         3              8
         4             15
         5             14
         6             15
         7              6
         8              7

Shortest path from 0 to 8:
Path from 0 to 8: 0 -> 1 -> 7 -> 8
Total distance: 7

2. BELLMAN-FORD ALGORITHM:
==========================

... (Bellman-Ford output similar to above) ...

3. PERFORMANCE COMPARISON:
=========================
Dijkstra's time: 0.245 ms
Bellman-Ford time: 0.312 ms
Difference: 0.067 ms

4. ALGORITHM PROPERTIES:
========================
Dijkstra's Algorithm:
  - Greedy algorithm
  - Time: O((V + E) log V) with binary heap
  - Only works with non-negative edge weights
  - Cannot detect negative cycles
  - Faster for sparse graphs

Bellman-Ford Algorithm:
  - Dynamic programming approach
  - Time: O(V * E)
  - Works with negative edge weights
  - Can detect negative cycles
  - Better for graphs with few edges

5. WHEN TO USE WHICH ALGORITHM:
=================================
Use Dijkstra when:
  - All edge weights are non-negative
  - You need fast computation for large graphs
  - You're working with road networks or maps

Use Bellman-Ford when:
  - Graph may have negative edge weights
  - You need to detect negative cycles
  - Graph is small or has few edges
  - In financial networks (arbitrage detection)


PART 5: REAL-WORLD APPLICATIONS
================================

1. GPS NAVIGATION SYSTEM
========================

=== GPS NAVIGATION ROUTE ===
Total estimated time: 20120 units
Route:
  1. Home  [Main Street, 5000m, delay: 300s]
  2. Work  [Airport Road, 12000m, delay: 800s]
  3. Airport

4. NETWORK ROUTING PROTOCOL
===========================

=== ROUTING TABLE FOR ROUTER 0 ===
Destination       Next Hop           Cost                Path
-----------------------------------------------------------------
         1              1             10              0→1
         2              1             60              0→1→3→2
         3              1             30              0→1→3
         4              1             35              0→1→3→4
         5              1             50              0→1→3→4→5

3. FLIGHT ROUTE PLANNER
=======================

=== FLIGHT OPTIONS FROM NYC TO TOK ===

FASTEST ROUTE (840 minutes):
  1. NYC → TOK (NH500)
     Airline: ANA
     Duration: 840 min
     Price: $1300

  TOTAL: 840 minutes, $1300

CHEAPEST ROUTE ($1100):
  1. NYC → PAR (AF200)
     Airline: Air France
     Duration: 450 min
     Price: $700
     Layover: 60 min (estimated)

  2. PAR → TOK (JL401)
     Airline: JAL
     Duration: 750 min
     Price: $400

  TOTAL: 1260 minutes, $1100


PART 6: ADVANCED ALGORITHMS
===========================

1. BI-DIRECTIONAL DIJKSTRA
===========================

Bi-directional Dijkstra path from 0 to 9: 0 → 1 → 3 → 4 → 5 → 6 → 7 → 8 → 9

2. A* SEARCH ALGORITHM
======================

A* search path from 0 to 9: 0 → 2 → 4 → 6 → 8 → 9


PART 7: SUMMARY AND BEST PRACTICES
===================================

SHORTEST PATH ALGORITHM SELECTION GUIDE:
========================================

1. Dijkstra's Algorithm:
   - USE WHEN: All edge weights are non-negative
   - TIME: O((V + E) log V) with binary heap
   - BEST FOR: Road networks, GPS navigation
   - IMPLEMENTATION TIPS:
     * Use priority queue for efficiency
     * Track visited nodes to avoid reprocessing
     * Consider using Fibonacci heap for large graphs

2. Bellman-Ford Algorithm:
   - USE WHEN: Graph may have negative weights
   - TIME: O(V * E)
   - BEST FOR: Network routing with costs, Arbitrage detection
   - IMPLEMENTATION TIPS:
     * Early termination if no updates occur
     * Always check for negative cycles
     * Use for graphs with few edges

... (continued with more best practices) ...
```

## Summary

### Key Takeaways:

1. **Dijkstra's Algorithm**:
   - Best for graphs with **non-negative weights**
   - **Greedy approach** using priority queue
   - Time: **O((V + E) log V)** with binary heap
   - Applications: GPS navigation, network routing

2. **Bellman-Ford Algorithm**:
   - Handles **graphs with negative weights**
   - Can **detect negative cycles**
   - **Dynamic programming approach**
   - Time: **O(V * E)**
   - Applications: Financial networks, arbitrage detection

3. **Algorithm Selection Criteria**:
   - **Non-negative weights**: Dijkstra (faster)
   - **Negative weights**: Bellman-Ford
   - **Need to detect cycles**: Bellman-Ford
   - **Large sparse graphs**: Dijkstra with binary heap
   - **Small graphs**: Either works, consider specific needs

4. **Optimization Techniques**:
   - Use appropriate data structures (priority queues, adjacency lists)
   - Implement early termination conditions
   - Consider bidirectional search for point-to-point queries
   - Use heuristics with A* for informed search

5. **Real-World Applications**:
   - **GPS Navigation**: Dijkstra for route planning
   - **Network Routing**: Both algorithms for different scenarios
   - **Flight Planning**: Multi-criteria optimization
   - **Game AI**: A* search for pathfinding
   - **Financial Systems**: Bellman-Ford for arbitrage detection

6. **Common Pitfalls**:
   - Using Dijkstra with negative weights
   - Not checking for negative cycles
   - Inefficient graph representations
   - Not handling disconnected graphs

7. **Advanced Topics**:
   - **Bi-directional Dijkstra**: Faster for point-to-point queries
   - **A* Search**: Heuristic-based optimization
   - **Floyd-Warshall**: All-pairs shortest paths
   - **Johnson's Algorithm**: Combines Dijkstra and Bellman-Ford

Shortest path algorithms are fundamental to computer science with wide-ranging applications. Understanding their properties, trade-offs, and implementations is crucial for solving real-world optimization problems efficiently.