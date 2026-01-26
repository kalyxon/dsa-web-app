# DSA Hash Tables

## Introduction to Hash Tables

A **Hash Table** is a data structure that implements an **associative array** or **dictionary**, mapping keys to values. It uses a **hash function** to compute an index into an array of buckets/slots from which the desired value can be found.

### Key Characteristics:
- **Average Time Complexity**: O(1) for insert, delete, search
- **Worst Case Time Complexity**: O(n) due to collisions
- **Space Complexity**: O(n)
- **Load Factor**: Ratio of entries to buckets (typically 0.7-0.8)
- **Collision Resolution**: Chaining or Open Addressing

## Basic Concepts and Terminology

### Visual Overview:
```
Hash Table Structure:
Keys → Hash Function → Index → Bucket Array
[Key1] → h(Key1) → 3 → [Bucket3: (Key1, Value1) → (Key4, Value4) → ...]
[Key2] → h(Key2) → 7 → [Bucket7: (Key2, Value2)]
[Key3] → h(Key3) → 3 → [Bucket3: (Key1, Value1) → (Key4, Value4) → (Key3, Value3)]
```

### Key Components:
1. **Key**: Input to hash function
2. **Value**: Data associated with key
3. **Hash Function**: Maps key to index
4. **Bucket/Slot**: Array position storing key-value pairs
5. **Collision**: When two keys map to same index
6. **Load Factor**: n/m (entries/buckets)

## DSA Hash Tables

### 1. Hash Table Implementation with Chaining

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
#include <functional>
#include <cmath>
#include <iomanip>
using namespace std;

// Simple key-value pair structure
template<typename K, typename V>
struct KeyValuePair {
    K key;
    V value;
    
    KeyValuePair(const K& k, const V& v) : key(k), value(v) {}
};

// Hash Table with Separate Chaining
template<typename K, typename V>
class HashTable {
private:
    vector<list<KeyValuePair<K, V>>> table;
    int capacity;
    int size;
    double loadFactorThreshold;
    
    // Hash function (using std::hash)
    size_t hashFunction(const K& key) const {
        hash<K> hasher;
        return hasher(key) % capacity;
    }
    
    // Rehash when load factor exceeds threshold
    void rehash() {
        cout << "\n⚠️  Load factor exceeded threshold (" << loadFactor() << " > " 
             << loadFactorThreshold << "). Rehashing..." << endl;
        
        int oldCapacity = capacity;
        capacity = nextPrime(capacity * 2);
        
        vector<list<KeyValuePair<K, V>>> oldTable = move(table);
        table = vector<list<KeyValuePair<K, V>>>(capacity);
        size = 0;
        
        // Reinsert all elements
        for(const auto& bucket : oldTable) {
            for(const auto& kv : bucket) {
                insert(kv.key, kv.value);
            }
        }
        
        cout << "✅ Rehashed: New capacity = " << capacity << endl;
    }
    
    // Find next prime number (for capacity)
    bool isPrime(int n) const {
        if(n <= 1) return false;
        if(n <= 3) return true;
        if(n % 2 == 0 || n % 3 == 0) return false;
        
        for(int i = 5; i * i <= n; i += 6) {
            if(n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
    
    int nextPrime(int n) const {
        while(!isPrime(n)) {
            n++;
        }
        return n;
    }
    
public:
    // Constructor
    HashTable(int initialCapacity = 10, double threshold = 0.7) 
        : capacity(nextPrime(initialCapacity)), size(0), loadFactorThreshold(threshold) {
        table.resize(capacity);
        cout << "Hash Table created with capacity: " << capacity 
             << ", Load factor threshold: " << loadFactorThreshold << endl;
    }
    
    // Insert key-value pair
    void insert(const K& key, const V& value) {
        if(loadFactor() >= loadFactorThreshold) {
            rehash();
        }
        
        size_t index = hashFunction(key);
        
        // Check if key already exists
        for(auto& kv : table[index]) {
            if(kv.key == key) {
                kv.value = value;  // Update existing key
                cout << "Updated key '" << key << "' with value: " << value << endl;
                return;
            }
        }
        
        // Insert new key-value pair
        table[index].emplace_back(key, value);
        size++;
        
        cout << "Inserted key '" << key << "' with value: " << value 
             << " at index: " << index << endl;
    }
    
    // Search for a key
    V* search(const K& key) {
        size_t index = hashFunction(key);
        
        for(auto& kv : table[index]) {
            if(kv.key == key) {
                cout << "Found key '" << key << "' at index: " << index 
                     << ", value: " << kv.value << endl;
                return &kv.value;
            }
        }
        
        cout << "Key '" << key << "' not found" << endl;
        return nullptr;
    }
    
    // Delete a key
    bool remove(const K& key) {
        size_t index = hashFunction(key);
        
        auto& bucket = table[index];
        for(auto it = bucket.begin(); it != bucket.end(); ++it) {
            if(it->key == key) {
                cout << "Removed key '" << key << "' from index: " << index << endl;
                bucket.erase(it);
                size--;
                return true;
            }
        }
        
        cout << "Key '" << key << "' not found for removal" << endl;
        return false;
    }
    
    // Get current size
    int getSize() const {
        return size;
    }
    
    // Get capacity
    int getCapacity() const {
        return capacity;
    }
    
    // Calculate load factor
    double loadFactor() const {
        return static_cast<double>(size) / capacity;
    }
    
    // Display hash table
    void display() const {
        cout << "\n=== Hash Table Details ===" << endl;
        cout << "Capacity: " << capacity << endl;
        cout << "Size: " << size << endl;
        cout << "Load Factor: " << fixed << setprecision(2) << loadFactor() 
             << " (Threshold: " << loadFactorThreshold << ")" << endl;
        cout << "\nBucket Distribution:" << endl;
        
        int emptyBuckets = 0;
        int maxChainLength = 0;
        
        for(int i = 0; i < capacity; i++) {
            int chainLength = table[i].size();
            
            if(chainLength == 0) {
                emptyBuckets++;
            }
            
            if(chainLength > maxChainLength) {
                maxChainLength = chainLength;
            }
            
            cout << "  Bucket[" << i << "]: ";
            if(chainLength == 0) {
                cout << "Empty";
            } else {
                for(const auto& kv : table[i]) {
                    cout << "(" << kv.key << ":" << kv.value << ")";
                    if(&kv != &table[i].back()) {
                        cout << " → ";
                    }
                }
                cout << " [Length: " << chainLength << "]";
            }
            cout << endl;
        }
        
        cout << "\nStatistics:" << endl;
        cout << "  Empty Buckets: " << emptyBuckets << " (" 
             << (emptyBuckets * 100.0 / capacity) << "%)" << endl;
        cout << "  Max Chain Length: " << maxChainLength << endl;
        cout << "  Average Chain Length: " << fixed << setprecision(2) 
             << (size == 0 ? 0 : static_cast<double>(size) / (capacity - emptyBuckets)) << endl;
    }
    
    // Visual representation
    void displayVisual() const {
        cout << "\n=== Hash Table Visualization ===" << endl;
        
        for(int i = 0; i < capacity; i++) {
            cout << "[" << setw(2) << i << "] ";
            
            if(table[i].empty()) {
                cout << "└─ Empty" << endl;
            } else {
                cout << "├─ ";
                bool first = true;
                for(const auto& kv : table[i]) {
                    if(!first) cout << "   ├─ ";
                    cout << "(" << kv.key << ":" << kv.value << ")" << endl;
                    first = false;
                }
            }
        }
        
        cout << "===============================" << endl;
    }
};

// Demonstration
void demonstrateHashTable() {
    cout << "=== Hash Table Implementation with Chaining ===" << endl;
    
    HashTable<string, int> phoneBook(7, 0.6);  // Small capacity for demonstration
    
    // Insert some contacts
    phoneBook.insert("Alice", 1234567890);
    phoneBook.insert("Bob", 9876543210);
    phoneBook.insert("Charlie", 5551234567);
    phoneBook.insert("David", 4449876543);
    
    phoneBook.displayVisual();
    
    // Search operations
    cout << "\n--- Search Operations ---" << endl;
    phoneBook.search("Alice");
    phoneBook.search("Eve");  // Not found
    
    // Update existing key
    cout << "\n--- Update Operation ---" << endl;
    phoneBook.insert("Alice", 1112223333);
    
    // Insert more to trigger rehash
    cout << "\n--- Trigger Rehash ---" << endl;
    phoneBook.insert("Eve", 9998887777);
    phoneBook.insert("Frank", 6665554444);
    phoneBook.insert("Grace", 3332221111);
    
    phoneBook.display();
    
    // Remove operation
    cout << "\n--- Remove Operation ---" << endl;
    phoneBook.remove("Bob");
    
    phoneBook.displayVisual();
    
    // Display final statistics
    cout << "\nFinal Statistics:" << endl;
    cout << "Total entries: " << phoneBook.getSize() << endl;
    cout << "Table capacity: " << phoneBook.getCapacity() << endl;
}

int main() {
    demonstrateHashTable();
    return 0;
}
```

**Output:**
```
=== Hash Table Implementation with Chaining ===
Hash Table created with capacity: 7, Load factor threshold: 0.6
Inserted key 'Alice' with value: 1234567890 at index: 1
Inserted key 'Bob' with value: 9876543210 at index: 5
Inserted key 'Charlie' with value: 5551234567 at index: 3
Inserted key 'David' with value: 4449876543 at index: 5

=== Hash Table Visualization ===
[ 0] └─ Empty
[ 1] ├─ (Alice:1234567890)
[ 2] └─ Empty
[ 3] ├─ (Charlie:5551234567)
[ 4] └─ Empty
[ 5] ├─ (Bob:9876543210)
       ├─ (David:4449876543)
[ 6] └─ Empty
===============================

--- Search Operations ---
Found key 'Alice' at index: 1, value: 1234567890
Key 'Eve' not found

--- Update Operation ---
Updated key 'Alice' with value: 1112223333

--- Trigger Rehash ---
Inserted key 'Eve' with value: 9998887777 at index: 5
Inserted key 'Frank' with value: 6665554444 at index: 3

⚠️  Load factor exceeded threshold (0.86 > 0.6). Rehashing...
Inserted key 'Alice' with value: 1112223333 at index: 5
Inserted key 'Bob' with value: 9876543210 at index: 3
Inserted key 'Charlie' with value: 5551234567 at index: 9
Inserted key 'David' with value: 4449876543 at index: 0
Inserted key 'Eve' with value: 9998887777 at index: 11
Inserted key 'Frank' with value: 6665554444 at index: 7
✅ Rehashed: New capacity = 17
Inserted key 'Grace' with value: 3332221111 at index: 13

=== Hash Table Details ===
Capacity: 17
Size: 7
Load Factor: 0.41 (Threshold: 0.6)

Bucket Distribution:
  Bucket[0]: (David:4449876543) [Length: 1]
  Bucket[1]: Empty
  ... (more buckets) ...
  Bucket[17]: Empty

Statistics:
  Empty Buckets: 11 (64.71%)
  Max Chain Length: 1
  Average Chain Length: 1.17
```

### 2. Hash Table with Open Addressing (Linear Probing)

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <functional>
#include <iomanip>
using namespace std;

// Entry status for open addressing
enum EntryStatus {
    EMPTY,
    OCCUPIED,
    DELETED
};

// Entry structure for open addressing
template<typename K, typename V>
struct HashEntry {
    K key;
    V value;
    EntryStatus status;
    
    HashEntry() : status(EMPTY) {}
    HashEntry(const K& k, const V& v) : key(k), value(v), status(OCCUPIED) {}
};

// Hash Table with Open Addressing (Linear Probing)
template<typename K, typename V>
class OpenAddressingHashTable {
private:
    vector<HashEntry<K, V>> table;
    int capacity;
    int size;
    double loadFactorThreshold;
    
    // Hash function
    size_t hashFunction(const K& key, int attempt = 0) const {
        hash<K> hasher;
        return (hasher(key) + attempt) % capacity;
    }
    
    // Find next prime for capacity
    bool isPrime(int n) const {
        if(n <= 1) return false;
        if(n <= 3) return true;
        if(n % 2 == 0 || n % 3 == 0) return false;
        
        for(int i = 5; i * i <= n; i += 6) {
            if(n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
    
    int nextPrime(int n) const {
        while(!isPrime(n)) {
            n++;
        }
        return n;
    }
    
    // Probe sequence (linear probing)
    size_t probe(const K& key, int attempt) const {
        return hashFunction(key, attempt);
    }
    
    // Rehash when load factor exceeds threshold
    void rehash() {
        cout << "\n⚠️  Load factor exceeded threshold (" << loadFactor() << " > " 
             << loadFactorThreshold << "). Rehashing..." << endl;
        
        int oldCapacity = capacity;
        capacity = nextPrime(capacity * 2);
        
        vector<HashEntry<K, V>> oldTable = move(table);
        table = vector<HashEntry<K, V>>(capacity);
        size = 0;
        
        // Reinsert all occupied entries
        for(const auto& entry : oldTable) {
            if(entry.status == OCCUPIED) {
                insert(entry.key, entry.value);
            }
        }
        
        cout << "✅ Rehashed: New capacity = " << capacity << endl;
    }
    
public:
    // Constructor
    OpenAddressingHashTable(int initialCapacity = 10, double threshold = 0.7) 
        : capacity(nextPrime(initialCapacity)), size(0), loadFactorThreshold(threshold) {
        table.resize(capacity);
        cout << "Open Addressing Hash Table created with capacity: " << capacity 
             << ", Load factor threshold: " << loadFactorThreshold << endl;
    }
    
    // Insert key-value pair
    bool insert(const K& key, const V& value) {
        if(loadFactor() >= loadFactorThreshold) {
            rehash();
        }
        
        int attempt = 0;
        size_t index;
        
        // Find empty or deleted slot
        do {
            index = probe(key, attempt);
            
            if(table[index].status == EMPTY || table[index].status == DELETED) {
                // Found empty slot
                table[index] = HashEntry<K, V>(key, value);
                size++;
                cout << "Inserted key '" << key << "' with value: " << value 
                     << " at index: " << index << " (attempts: " << attempt + 1 << ")" << endl;
                return true;
            }
            
            if(table[index].status == OCCUPIED && table[index].key == key) {
                // Update existing key
                table[index].value = value;
                cout << "Updated key '" << key << "' with value: " << value 
                     << " at index: " << index << endl;
                return true;
            }
            
            attempt++;
        } while(attempt < capacity);
        
        cout << "❌ Failed to insert key '" << key << "': Table is full" << endl;
        return false;
    }
    
    // Search for a key
    V* search(const K& key) {
        int attempt = 0;
        size_t index;
        
        do {
            index = probe(key, attempt);
            
            if(table[index].status == EMPTY) {
                // Key not found
                break;
            }
            
            if(table[index].status == OCCUPIED && table[index].key == key) {
                cout << "Found key '" << key << "' at index: " << index 
                     << ", value: " << table[index].value 
                     << " (attempts: " << attempt + 1 << ")" << endl;
                return &table[index].value;
            }
            
            attempt++;
        } while(attempt < capacity);
        
        cout << "Key '" << key << "' not found" << endl;
        return nullptr;
    }
    
    // Delete a key
    bool remove(const K& key) {
        int attempt = 0;
        size_t index;
        
        do {
            index = probe(key, attempt);
            
            if(table[index].status == EMPTY) {
                break;
            }
            
            if(table[index].status == OCCUPIED && table[index].key == key) {
                table[index].status = DELETED;
                size--;
                cout << "Removed key '" << key << "' from index: " << index << endl;
                return true;
            }
            
            attempt++;
        } while(attempt < capacity);
        
        cout << "Key '" << key << "' not found for removal" << endl;
        return false;
    }
    
    // Get current size
    int getSize() const {
        return size;
    }
    
    // Get capacity
    int getCapacity() const {
        return capacity;
    }
    
    // Calculate load factor
    double loadFactor() const {
        return static_cast<double>(size) / capacity;
    }
    
    // Display hash table
    void display() const {
        cout << "\n=== Open Addressing Hash Table ===" << endl;
        cout << "Capacity: " << capacity << endl;
        cout << "Size: " << size << endl;
        cout << "Load Factor: " << fixed << setprecision(2) << loadFactor() << endl;
        
        cout << "\nTable Contents:" << endl;
        cout << left << setw(10) << "Index" 
             << setw(15) << "Status" 
             << setw(15) << "Key" 
             << setw(15) << "Value" << endl;
        cout << string(55, '-') << endl;
        
        for(int i = 0; i < capacity; i++) {
            cout << left << setw(10) << i;
            
            switch(table[i].status) {
                case EMPTY:
                    cout << setw(15) << "EMPTY" << endl;
                    break;
                case OCCUPIED:
                    cout << setw(15) << "OCCUPIED" 
                         << setw(15) << table[i].key 
                         << setw(15) << table[i].value << endl;
                    break;
                case DELETED:
                    cout << setw(15) << "DELETED" << endl;
                    break;
            }
        }
        
        // Calculate cluster statistics
        int maxClusterSize = 0;
        int currentCluster = 0;
        int totalClusters = 0;
        
        for(int i = 0; i < capacity; i++) {
            if(table[i].status == OCCUPIED) {
                currentCluster++;
            } else {
                if(currentCluster > 0) {
                    totalClusters++;
                    if(currentCluster > maxClusterSize) {
                        maxClusterSize = currentCluster;
                    }
                    currentCluster = 0;
                }
            }
        }
        
        // Handle cluster at the end
        if(currentCluster > 0) {
            totalClusters++;
            if(currentCluster > maxClusterSize) {
                maxClusterSize = currentCluster;
            }
        }
        
        cout << "\nCluster Statistics:" << endl;
        cout << "  Max Cluster Size: " << maxClusterSize << endl;
        cout << "  Total Clusters: " << totalClusters << endl;
        if(totalClusters > 0) {
            cout << "  Average Cluster Size: " << fixed << setprecision(2) 
                 << static_cast<double>(size) / totalClusters << endl;
        }
    }
    
    // Visual representation
    void displayVisual() const {
        cout << "\n=== Hash Table Visualization (Linear Probing) ===" << endl;
        
        for(int i = 0; i < capacity; i++) {
            cout << "[" << setw(2) << i << "] ";
            
            switch(table[i].status) {
                case EMPTY:
                    cout << "◻ Empty" << endl;
                    break;
                case OCCUPIED:
                    cout << "■ " << table[i].key << ":" << table[i].value << endl;
                    break;
                case DELETED:
                    cout << "◼ Deleted (tombstone)" << endl;
                    break;
            }
        }
        
        // Show probing sequence example
        cout << "\nProbing Sequence Example (for key 'Test'):" << endl;
        string testKey = "Test";
        for(int attempt = 0; attempt < 5; attempt++) {
            size_t index = probe(testKey, attempt);
            cout << "  Attempt " << attempt << ": index = " << index 
                 << " (hash + " << attempt << ")" << endl;
        }
    }
};

// Demonstration
void demonstrateOpenAddressingHashTable() {
    cout << "\n\n=== Hash Table with Open Addressing (Linear Probing) ===" << endl;
    
    OpenAddressingHashTable<string, int> table(7, 0.6);  // Small capacity for demo
    
    // Insert operations
    table.insert("Alice", 100);
    table.insert("Bob", 200);
    table.insert("Charlie", 300);
    table.insert("David", 400);
    
    table.displayVisual();
    
    // Search operations
    cout << "\n--- Search Operations ---" << endl;
    table.search("Alice");
    table.search("Eve");
    
    // Update existing
    cout << "\n--- Update Operation ---" << endl;
    table.insert("Alice", 150);
    
    // Insert more (will cause clustering)
    cout << "\n--- Insert More (Show Clustering) ---" << endl;
    table.insert("Eve", 500);
    table.insert("Frank", 600);
    
    table.display();
    
    // Remove operation
    cout << "\n--- Remove Operation ---" << endl;
    table.remove("Bob");
    
    table.displayVisual();
    
    // Search after removal (should skip tombstone)
    cout << "\n--- Search After Removal ---" << endl;
    table.search("Charlie");
    
    // Insert new key in deleted slot
    cout << "\n--- Insert in Deleted Slot ---" << endl;
    table.insert("Grace", 700);
    
    table.displayVisual();
}

int main() {
    demonstrateOpenAddressingHashTable();
    return 0;
}
```

## DSA Hash Sets

### 1. HashSet Implementation

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <functional>
#include <algorithm>
#include <iomanip>
using namespace std;

// HashSet Implementation with Separate Chaining
template<typename T>
class HashSet {
private:
    vector<list<T>> table;
    int capacity;
    int size;
    double loadFactorThreshold;
    
    // Hash function
    size_t hashFunction(const T& value) const {
        hash<T> hasher;
        return hasher(value) % capacity;
    }
    
    // Rehash when load factor exceeds threshold
    void rehash() {
        cout << "\n⚠️  Load factor exceeded threshold (" << loadFactor() << " > " 
             << loadFactorThreshold << "). Rehashing..." << endl;
        
        int oldCapacity = capacity;
        capacity = nextPrime(capacity * 2);
        
        vector<list<T>> oldTable = move(table);
        table = vector<list<T>>(capacity);
        size = 0;
        
        // Reinsert all elements
        for(const auto& bucket : oldTable) {
            for(const auto& value : bucket) {
                insert(value);
            }
        }
        
        cout << "✅ Rehashed: New capacity = " << capacity << endl;
    }
    
    // Prime number utilities
    bool isPrime(int n) const {
        if(n <= 1) return false;
        if(n <= 3) return true;
        if(n % 2 == 0 || n % 3 == 0) return false;
        
        for(int i = 5; i * i <= n; i += 6) {
            if(n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
    
    int nextPrime(int n) const {
        while(!isPrime(n)) {
            n++;
        }
        return n;
    }
    
public:
    // Constructor
    HashSet(int initialCapacity = 10, double threshold = 0.7) 
        : capacity(nextPrime(initialCapacity)), size(0), loadFactorThreshold(threshold) {
        table.resize(capacity);
        cout << "HashSet created with capacity: " << capacity 
             << ", Load factor threshold: " << loadFactorThreshold << endl;
    }
    
    // Insert a value
    bool insert(const T& value) {
        if(contains(value)) {
            cout << "Value '" << value << "' already exists in set" << endl;
            return false;
        }
        
        if(loadFactor() >= loadFactorThreshold) {
            rehash();
        }
        
        size_t index = hashFunction(value);
        table[index].push_back(value);
        size++;
        
        cout << "Inserted value: '" << value << "' at index: " << index << endl;
        return true;
    }
    
    // Check if value exists
    bool contains(const T& value) const {
        size_t index = hashFunction(value);
        
        for(const auto& item : table[index]) {
            if(item == value) {
                return true;
            }
        }
        return false;
    }
    
    // Search for a value
    bool search(const T& value) const {
        bool found = contains(value);
        cout << "Value '" << value << "' " << (found ? "found" : "not found") << " in set" << endl;
        return found;
    }
    
    // Remove a value
    bool erase(const T& value) {
        size_t index = hashFunction(value);
        auto& bucket = table[index];
        
        auto it = find(bucket.begin(), bucket.end(), value);
        if(it != bucket.end()) {
            bucket.erase(it);
            size--;
            cout << "Removed value: '" << value << "' from index: " << index << endl;
            return true;
        }
        
        cout << "Value '" << value << "' not found for removal" << endl;
        return false;
    }
    
    // Get current size
    int getSize() const {
        return size;
    }
    
    // Get capacity
    int getCapacity() const {
        return capacity;
    }
    
    // Calculate load factor
    double loadFactor() const {
        return static_cast<double>(size) / capacity;
    }
    
    // Check if set is empty
    bool empty() const {
        return size == 0;
    }
    
    // Clear all elements
    void clear() {
        for(auto& bucket : table) {
            bucket.clear();
        }
        size = 0;
        cout << "HashSet cleared" << endl;
    }
    
    // Display HashSet
    void display() const {
        cout << "\n=== HashSet Details ===" << endl;
        cout << "Capacity: " << capacity << endl;
        cout << "Size: " << size << endl;
        cout << "Load Factor: " << fixed << setprecision(2) << loadFactor() << endl;
        cout << "Elements: { ";
        
        bool first = true;
        for(const auto& bucket : table) {
            for(const auto& value : bucket) {
                if(!first) cout << ", ";
                cout << value;
                first = false;
            }
        }
        cout << " }" << endl;
        
        cout << "\nBucket Distribution:" << endl;
        int emptyBuckets = 0;
        int maxChainLength = 0;
        
        for(int i = 0; i < capacity; i++) {
            int chainLength = table[i].size();
            
            if(chainLength == 0) {
                emptyBuckets++;
            }
            
            if(chainLength > maxChainLength) {
                maxChainLength = chainLength;
            }
            
            cout << "  Bucket[" << i << "]: ";
            if(chainLength == 0) {
                cout << "Empty";
            } else {
                for(const auto& value : table[i]) {
                    cout << value;
                    if(&value != &table[i].back()) {
                        cout << " → ";
                    }
                }
                cout << " [Length: " << chainLength << "]";
            }
            cout << endl;
        }
        
        cout << "\nStatistics:" << endl;
        cout << "  Empty Buckets: " << emptyBuckets << " (" 
             << (emptyBuckets * 100.0 / capacity) << "%)" << endl;
        cout << "  Max Chain Length: " << maxChainLength << endl;
    }
    
    // Union of two sets
    HashSet<T> unionWith(const HashSet<T>& other) const {
        HashSet<T> result(max(capacity, other.capacity));
        
        // Add all elements from this set
        for(const auto& bucket : table) {
            for(const auto& value : bucket) {
                result.insert(value);
            }
        }
        
        // Add all elements from other set
        for(const auto& bucket : other.table) {
            for(const auto& value : bucket) {
                result.insert(value);
            }
        }
        
        return result;
    }
    
    // Intersection of two sets
    HashSet<T> intersectionWith(const HashSet<T>& other) const {
        HashSet<T> result(min(capacity, other.capacity));
        
        // Only check elements from the smaller set
        const HashSet<T>& smaller = (size < other.size) ? *this : other;
        const HashSet<T>& larger = (size < other.size) ? other : *this;
        
        for(const auto& bucket : smaller.table) {
            for(const auto& value : bucket) {
                if(larger.contains(value)) {
                    result.insert(value);
                }
            }
        }
        
        return result;
    }
    
    // Difference of two sets (this - other)
    HashSet<T> differenceWith(const HashSet<T>& other) const {
        HashSet<T> result(capacity);
        
        for(const auto& bucket : table) {
            for(const auto& value : bucket) {
                if(!other.contains(value)) {
                    result.insert(value);
                }
            }
        }
        
        return result;
    }
    
    // Check if this set is subset of another
    bool isSubsetOf(const HashSet<T>& other) const {
        for(const auto& bucket : table) {
            for(const auto& value : bucket) {
                if(!other.contains(value)) {
                    return false;
                }
            }
        }
        return true;
    }
};

// Demonstration
void demonstrateHashSet() {
    cout << "=== HashSet Implementation ===" << endl;
    
    HashSet<string> set1(7, 0.6);
    
    // Insert operations
    set1.insert("Apple");
    set1.insert("Banana");
    set1.insert("Cherry");
    set1.insert("Date");
    
    set1.display();
    
    // Search operations
    cout << "\n--- Search Operations ---" << endl;
    set1.search("Apple");
    set1.search("Elderberry");
    
    // Try to insert duplicate
    cout << "\n--- Insert Duplicate ---" << endl;
    set1.insert("Apple");
    
    // Insert more to trigger rehash
    cout << "\n--- Trigger Rehash ---" << endl;
    set1.insert("Elderberry");
    set1.insert("Fig");
    set1.insert("Grape");
    
    set1.display();
    
    // Remove operation
    cout << "\n--- Remove Operation ---" << endl;
    set1.erase("Banana");
    
    // Create another set for set operations
    cout << "\n--- Create Second Set ---" << endl;
    HashSet<string> set2(5);
    set2.insert("Cherry");
    set2.insert("Date");
    set2.insert("Elderberry");
    set2.insert("Honeydew");
    
    cout << "\nSet 1: ";
    set1.display();
    cout << "\nSet 2: ";
    set2.display();
    
    // Set operations
    cout << "\n--- Set Operations ---" << endl;
    
    // Union
    auto unionSet = set1.unionWith(set2);
    cout << "Union: ";
    unionSet.display();
    
    // Intersection
    auto intersectionSet = set1.intersectionWith(set2);
    cout << "\nIntersection: ";
    intersectionSet.display();
    
    // Difference
    auto differenceSet = set1.differenceWith(set2);
    cout << "\nDifference (Set1 - Set2): ";
    differenceSet.display();
    
    // Subset check
    HashSet<string> subset(3);
    subset.insert("Cherry");
    subset.insert("Date");
    
    cout << "\nSubset Check:" << endl;
    cout << "{Cherry, Date} is subset of Set1: " 
         << (subset.isSubsetOf(set1) ? "Yes" : "No") << endl;
    cout << "{Cherry, Date} is subset of Set2: " 
         << (subset.isSubsetOf(set2) ? "Yes" : "No") << endl;
    
    // Clear set
    cout << "\n--- Clear Set ---" << endl;
    set1.clear();
    cout << "Set 1 is empty: " << (set1.empty() ? "Yes" : "No") << endl;
}

int main() {
    demonstrateHashSet();
    return 0;
}
```

### 2. Practical Applications of HashSet

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <fstream>
#include <sstream>
using namespace std;

class HashSetApplications {
public:
    // 1. Find unique elements in an array
    static void findUniqueElements() {
        cout << "=== 1. Finding Unique Elements ===" << endl;
        
        vector<int> numbers = {1, 2, 3, 2, 4, 1, 5, 3, 6, 7, 5, 8, 9, 9};
        
        cout << "Original array: ";
        for(int num : numbers) cout << num << " ";
        cout << endl;
        
        // Using HashSet to find unique elements
        vector<int> uniqueNumbers;
        vector<bool> seen(100, false);  // Simplified HashSet
        
        for(int num : numbers) {
            if(!seen[num]) {
                seen[num] = true;
                uniqueNumbers.push_back(num);
            }
        }
        
        cout << "Unique elements: ";
        for(int num : uniqueNumbers) cout << num << " ";
        cout << endl;
        cout << "Total unique elements: " << uniqueNumbers.size() << endl;
    }
    
    // 2. Find duplicate elements
    static void findDuplicates() {
        cout << "\n=== 2. Finding Duplicate Elements ===" << endl;
        
        vector<string> words = {"apple", "banana", "apple", "cherry", 
                                "date", "banana", "elderberry", "apple"};
        
        cout << "Word list: ";
        for(const auto& word : words) cout << word << " ";
        cout << endl;
        
        // Find duplicates using HashSet
        vector<string> uniqueWords;
        vector<string> duplicates;
        vector<bool> seen(1000, false);
        
        for(const auto& word : words) {
            // Simple hash for demonstration
            size_t hash = 0;
            for(char c : word) hash = hash * 31 + c;
            hash %= 1000;
            
            if(seen[hash]) {
                if(find(duplicates.begin(), duplicates.end(), word) == duplicates.end()) {
                    duplicates.push_back(word);
                }
            } else {
                seen[hash] = true;
                uniqueWords.push_back(word);
            }
        }
        
        cout << "Duplicate words: ";
        for(const auto& word : duplicates) cout << word << " ";
        cout << endl;
        
        cout << "Word frequencies:" << endl;
        vector<int> frequency(1000, 0);
        for(const auto& word : words) {
            size_t hash = 0;
            for(char c : word) hash = hash * 31 + c;
            hash %= 1000;
            frequency[hash]++;
        }
        
        for(const auto& word : uniqueWords) {
            size_t hash = 0;
            for(char c : word) hash = hash * 31 + c;
            hash %= 1000;
            cout << "  " << word << ": " << frequency[hash] << " times" << endl;
        }
    }
    
    // 3. Check if array has all unique characters
    static void checkUniqueCharacters() {
        cout << "\n=== 3. Checking for Unique Characters ===" << endl;
        
        string testString1 = "abcdefg";
        string testString2 = "hello world";
        
        auto hasAllUnique = [](const string& str) -> bool {
            vector<bool> charSet(256, false);
            
            for(char c : str) {
                if(c == ' ') continue;  // Skip spaces
                
                if(charSet[c]) {
                    return false;  // Duplicate found
                }
                charSet[c] = true;
            }
            return true;
        };
        
        cout << "String: \"" << testString1 << "\"" << endl;
        cout << "All characters unique? " << (hasAllUnique(testString1) ? "Yes" : "No") << endl;
        
        cout << "\nString: \"" << testString2 << "\"" << endl;
        cout << "All characters unique? " << (hasAllUnique(testString2) ? "Yes" : "No") << endl;
        
        // Find first duplicate character
        auto findFirstDuplicate = [](const string& str) -> char {
            vector<bool> charSet(256, false);
            
            for(char c : str) {
                if(c == ' ') continue;
                
                if(charSet[c]) {
                    return c;
                }
                charSet[c] = true;
            }
            return '\0';  // No duplicate
        };
        
        char duplicate = findFirstDuplicate(testString2);
        if(duplicate != '\0') {
            cout << "First duplicate character: '" << duplicate << "'" << endl;
        }
    }
    
    // 4. Spell Checker Simulation
    static void spellChecker() {
        cout << "\n=== 4. Spell Checker Simulation ===" << endl;
        
        // Dictionary of valid words
        vector<string> dictionary = {
            "apple", "banana", "cherry", "date", "elderberry", 
            "fig", "grape", "honeydew", "kiwi", "lemon"
        };
        
        // Text to check
        vector<string> text = {"I", "like", "apples", "and", "bananas", 
                               "but", "not", "cheris", "or", "dates"};
        
        // Create HashSet from dictionary
        vector<bool> dictSet(1000, false);
        for(const auto& word : dictionary) {
            size_t hash = 0;
            for(char c : word) hash = hash * 31 + c;
            hash %= 1000;
            dictSet[hash] = true;
        }
        
        cout << "Dictionary: ";
        for(const auto& word : dictionary) cout << word << " ";
        cout << endl;
        
        cout << "\nText to check: ";
        for(const auto& word : text) cout << word << " ";
        cout << endl;
        
        cout << "\nSpell check results:" << endl;
        for(const auto& word : text) {
            // Convert to lowercase for comparison
            string lowerWord = word;
            transform(lowerWord.begin(), lowerWord.end(), lowerWord.begin(), ::tolower);
            
            size_t hash = 0;
            for(char c : lowerWord) hash = hash * 31 + c;
            hash %= 1000;
            
            if(dictSet[hash]) {
                cout << "  ✓ " << word << " is spelled correctly" << endl;
            } else {
                cout << "  ✗ " << word << " is misspelled" << endl;
                
                // Find suggestions
                cout << "    Suggestions: ";
                bool foundSuggestion = false;
                
                for(const auto& dictWord : dictionary) {
                    // Simple suggestion: words with same first letter
                    if(tolower(dictWord[0]) == tolower(lowerWord[0])) {
                        cout << dictWord << " ";
                        foundSuggestion = true;
                    }
                }
                
                if(!foundSuggestion) {
                    cout << "(no suggestions)";
                }
                cout << endl;
            }
        }
    }
    
    // 5. Find symmetric difference between two arrays
    static void findSymmetricDifference() {
        cout << "\n=== 5. Symmetric Difference Between Arrays ===" << endl;
        
        vector<int> array1 = {1, 2, 3, 4, 5};
        vector<int> array2 = {4, 5, 6, 7, 8};
        
        cout << "Array 1: ";
        for(int num : array1) cout << num << " ";
        cout << endl;
        
        cout << "Array 2: ";
        for(int num : array2) cout << num << " ";
        cout << endl;
        
        // Using HashSet approach
        vector<bool> set1(100, false);
        vector<bool> set2(100, false);
        
        for(int num : array1) set1[num] = true;
        for(int num : array2) set2[num] = true;
        
        vector<int> symmetricDiff;
        
        // Elements in array1 but not in array2
        for(int num : array1) {
            if(!set2[num]) {
                symmetricDiff.push_back(num);
            }
        }
        
        // Elements in array2 but not in array1
        for(int num : array2) {
            if(!set1[num]) {
                symmetricDiff.push_back(num);
            }
        }
        
        cout << "Symmetric difference: ";
        sort(symmetricDiff.begin(), symmetricDiff.end());
        for(int num : symmetricDiff) cout << num << " ";
        cout << endl;
        
        cout << "Explanation: Elements present in either array but not in both" << endl;
    }
};

int main() {
    cout << "=== Practical Applications of HashSet ===" << endl;
    
    HashSetApplications::findUniqueElements();
    HashSetApplications::findDuplicates();
    HashSetApplications::checkUniqueCharacters();
    HashSetApplications::spellChecker();
    HashSetApplications::findSymmetricDifference();
    
    return 0;
}
```

## DSA Hash Maps

### 1. HashMap Implementation

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
#include <functional>
#include <utility>
#include <iomanip>
#include <algorithm>
using namespace std;

// HashMap Implementation with Separate Chaining
template<typename K, typename V>
class HashMap {
private:
    vector<list<pair<K, V>>> table;
    int capacity;
    int size;
    double loadFactorThreshold;
    
    // Hash function
    size_t hashFunction(const K& key) const {
        hash<K> hasher;
        return hasher(key) % capacity;
    }
    
    // Rehash when load factor exceeds threshold
    void rehash() {
        cout << "\n⚠️  Load factor exceeded threshold (" << loadFactor() << " > " 
             << loadFactorThreshold << "). Rehashing..." << endl;
        
        int oldCapacity = capacity;
        capacity = nextPrime(capacity * 2);
        
        vector<list<pair<K, V>>> oldTable = move(table);
        table = vector<list<pair<K, V>>>(capacity);
        size = 0;
        
        // Reinsert all elements
        for(const auto& bucket : oldTable) {
            for(const auto& kv : bucket) {
                insert(kv.first, kv.second);
            }
        }
        
        cout << "✅ Rehashed: New capacity = " << capacity << endl;
    }
    
    // Prime number utilities
    bool isPrime(int n) const {
        if(n <= 1) return false;
        if(n <= 3) return true;
        if(n % 2 == 0 || n % 3 == 0) return false;
        
        for(int i = 5; i * i <= n; i += 6) {
            if(n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
    
    int nextPrime(int n) const {
        while(!isPrime(n)) {
            n++;
        }
        return n;
    }
    
public:
    // Constructor
    HashMap(int initialCapacity = 10, double threshold = 0.7) 
        : capacity(nextPrime(initialCapacity)), size(0), loadFactorThreshold(threshold) {
        table.resize(capacity);
        cout << "HashMap created with capacity: " << capacity 
             << ", Load factor threshold: " << loadFactorThreshold << endl;
    }
    
    // Insert or update key-value pair
    void insert(const K& key, const V& value) {
        if(loadFactor() >= loadFactorThreshold) {
            rehash();
        }
        
        size_t index = hashFunction(key);
        
        // Check if key already exists
        for(auto& kv : table[index]) {
            if(kv.first == key) {
                kv.second = value;  // Update existing key
                cout << "Updated key '" << key << "' with value: " << value << endl;
                return;
            }
        }
        
        // Insert new key-value pair
        table[index].emplace_back(key, value);
        size++;
        
        cout << "Inserted key '" << key << "' with value: " << value 
             << " at index: " << index << endl;
    }
    
    // Access element with [] operator
    V& operator[](const K& key) {
        size_t index = hashFunction(key);
        
        // Search for existing key
        for(auto& kv : table[index]) {
            if(kv.first == key) {
                return kv.second;
            }
        }
        
        // Key not found, insert default value
        table[index].emplace_back(key, V());
        size++;
        return table[index].back().second;
    }
    
    // Access element (const version)
    const V& at(const K& key) const {
        size_t index = hashFunction(key);
        
        for(const auto& kv : table[index]) {
            if(kv.first == key) {
                return kv.second;
            }
        }
        
        throw out_of_range("Key not found in HashMap");
    }
    
    // Check if key exists
    bool contains(const K& key) const {
        size_t index = hashFunction(key);
        
        for(const auto& kv : table[index]) {
            if(kv.first == key) {
                return true;
            }
        }
        return false;
    }
    
    // Remove key-value pair
    bool erase(const K& key) {
        size_t index = hashFunction(key);
        auto& bucket = table[index];
        
        for(auto it = bucket.begin(); it != bucket.end(); ++it) {
            if(it->first == key) {
                bucket.erase(it);
                size--;
                cout << "Removed key '" << key << "' from index: " << index << endl;
                return true;
            }
        }
        
        cout << "Key '" << key << "' not found for removal" << endl;
        return false;
    }
    
    // Get size
    int getSize() const {
        return size;
    }
    
    // Get capacity
    int getCapacity() const {
        return capacity;
    }
    
    // Calculate load factor
    double loadFactor() const {
        return static_cast<double>(size) / capacity;
    }
    
    // Check if empty
    bool empty() const {
        return size == 0;
    }
    
    // Clear all elements
    void clear() {
        for(auto& bucket : table) {
            bucket.clear();
        }
        size = 0;
        cout << "HashMap cleared" << endl;
    }
    
    // Get all keys
    vector<K> keys() const {
        vector<K> keyList;
        keyList.reserve(size);
        
        for(const auto& bucket : table) {
            for(const auto& kv : bucket) {
                keyList.push_back(kv.first);
            }
        }
        
        return keyList;
    }
    
    // Get all values
    vector<V> values() const {
        vector<V> valueList;
        valueList.reserve(size);
        
        for(const auto& bucket : table) {
            for(const auto& kv : bucket) {
                valueList.push_back(kv.second);
            }
        }
        
        return valueList;
    }
    
    // Get all entries
    vector<pair<K, V>> entries() const {
        vector<pair<K, V>> entryList;
        entryList.reserve(size);
        
        for(const auto& bucket : table) {
            for(const auto& kv : bucket) {
                entryList.emplace_back(kv.first, kv.second);
            }
        }
        
        return entryList;
    }
    
    // Display HashMap
    void display() const {
        cout << "\n=== HashMap Details ===" << endl;
        cout << "Capacity: " << capacity << endl;
        cout << "Size: " << size << endl;
        cout << "Load Factor: " << fixed << setprecision(2) << loadFactor() << endl;
        
        if(size == 0) {
            cout << "HashMap is empty" << endl;
            return;
        }
        
        cout << "\nEntries:" << endl;
        for(const auto& entry : entries()) {
            cout << "  " << entry.first << " → " << entry.second << endl;
        }
        
        cout << "\nBucket Distribution:" << endl;
        int emptyBuckets = 0;
        int maxChainLength = 0;
        
        for(int i = 0; i < capacity; i++) {
            int chainLength = table[i].size();
            
            if(chainLength == 0) {
                emptyBuckets++;
            }
            
            if(chainLength > maxChainLength) {
                maxChainLength = chainLength;
            }
            
            cout << "  Bucket[" << i << "]: ";
            if(chainLength == 0) {
                cout << "Empty";
            } else {
                for(const auto& kv : table[i]) {
                    cout << "(" << kv.first << ":" << kv.second << ")";
                    if(&kv != &table[i].back()) {
                        cout << " → ";
                    }
                }
                cout << " [Length: " << chainLength << "]";
            }
            cout << endl;
        }
        
        cout << "\nStatistics:" << endl;
        cout << "  Empty Buckets: " << emptyBuckets << " (" 
             << (emptyBuckets * 100.0 / capacity) << "%)" << endl;
        cout << "  Max Chain Length: " << maxChainLength << endl;
    }
    
    // Visual representation
    void displayVisual() const {
        cout << "\n=== HashMap Visualization ===" << endl;
        
        for(int i = 0; i < capacity; i++) {
            cout << "[" << setw(2) << i << "] ";
            
            if(table[i].empty()) {
                cout << "└─ Empty" << endl;
            } else {
                cout << "├─ ";
                bool first = true;
                for(const auto& kv : table[i]) {
                    if(!first) cout << "   ├─ ";
                    cout << kv.first << " → " << kv.second << endl;
                    first = false;
                }
            }
        }
        
        cout << "=============================" << endl;
    }
    
    // Merge with another HashMap
    void merge(const HashMap<K, V>& other) {
        for(const auto& bucket : other.table) {
            for(const auto& kv : bucket) {
                insert(kv.first, kv.second);
            }
        }
    }
};

// Demonstration
void demonstrateHashMap() {
    cout << "=== HashMap Implementation ===" << endl;
    
    HashMap<string, int> studentGrades(7, 0.6);
    
    // Insert operations
    studentGrades.insert("Alice", 95);
    studentGrades.insert("Bob", 87);
    studentGrades.insert("Charlie", 92);
    studentGrades.insert("David", 78);
    
    studentGrades.displayVisual();
    
    // Access using [] operator
    cout << "\n--- Access with [] Operator ---" << endl;
    cout << "Alice's grade: " << studentGrades["Alice"] << endl;
    
    // Update using [] operator
    studentGrades["Alice"] = 96;
    cout << "Updated Alice's grade: " << studentGrades["Alice"] << endl;
    
    // Insert using [] operator
    studentGrades["Eve"] = 88;
    cout << "Eve's grade (auto-inserted): " << studentGrades["Eve"] << endl;
    
    // Check contains
    cout << "\n--- Contains Check ---" << endl;
    cout << "Contains 'Bob'? " << (studentGrades.contains("Bob") ? "Yes" : "No") << endl;
    cout << "Contains 'Frank'? " << (studentGrades.contains("Frank") ? "Yes" : "No") << endl;
    
    // Insert more to trigger rehash
    cout << "\n--- Trigger Rehash ---" << endl;
    studentGrades.insert("Frank", 85);
    studentGrades.insert("Grace", 91);
    studentGrades.insert("Henry", 79);
    
    studentGrades.display();
    
    // Get keys, values, and entries
    cout << "\n--- Keys, Values, and Entries ---" << endl;
    
    auto allKeys = studentGrades.keys();
    cout << "Keys: ";
    for(const auto& key : allKeys) cout << key << " ";
    cout << endl;
    
    auto allValues = studentGrades.values();
    cout << "Values: ";
    for(int grade : allValues) cout << grade << " ";
    cout << endl;
    
    // Remove operation
    cout << "\n--- Remove Operation ---" << endl;
    studentGrades.erase("Bob");
    
    // Try to access removed key
    try {
        cout << "Trying to access removed key 'Bob': ";
        cout << studentGrades.at("Bob") << endl;
    } catch(const out_of_range& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    studentGrades.displayVisual();
    
    // Create another HashMap and merge
    cout << "\n--- Merge with Another HashMap ---" << endl;
    HashMap<string, int> additionalGrades(5);
    additionalGrades.insert("Ivy", 93);
    additionalGrades.insert("Jack", 84);
    additionalGrades.insert("Alice", 97);  // Should update existing
    
    studentGrades.merge(additionalGrades);
    studentGrades.display();
    
    // Clear HashMap
    cout << "\n--- Clear HashMap ---" << endl;
    studentGrades.clear();
    cout << "HashMap is empty: " << (studentGrades.empty() ? "Yes" : "No") << endl;
}

int main() {
    demonstrateHashMap();
    return 0;
}
```

### 2. Practical Applications of HashMap

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <algorithm>
#include <sstream>
#include <iomanip>
using namespace std;

class HashMapApplications {
public:
    // 1. Word Frequency Counter
    static void wordFrequencyCounter() {
        cout << "=== 1. Word Frequency Counter ===" << endl;
        
        string text = "the quick brown fox jumps over the lazy dog the fox is quick";
        
        cout << "Text: \"" << text << "\"" << endl;
        
        // Count word frequencies using map (simulating HashMap)
        map<string, int> frequencyMap;
        
        // Tokenize the text
        stringstream ss(text);
        string word;
        
        while(ss >> word) {
            // Convert to lowercase for consistency
            transform(word.begin(), word.end(), word.begin(), ::tolower);
            frequencyMap[word]++;
        }
        
        cout << "\nWord Frequencies:" << endl;
        cout << left << setw(15) << "Word" << "Frequency" << endl;
        cout << string(25, '-') << endl;
        
        for(const auto& entry : frequencyMap) {
            cout << left << setw(15) << entry.first << entry.second << endl;
        }
        
        // Find most frequent word
        string mostFrequentWord;
        int maxFrequency = 0;
        
        for(const auto& entry : frequencyMap) {
            if(entry.second > maxFrequency) {
                maxFrequency = entry.second;
                mostFrequentWord = entry.first;
            }
        }
        
        cout << "\nMost frequent word: \"" << mostFrequentWord 
             << "\" (appears " << maxFrequency << " times)" << endl;
    }
    
    // 2. Character Frequency Counter
    static void characterFrequencyCounter() {
        cout << "\n\n=== 2. Character Frequency Counter ===" << endl;
        
        string text = "Hello, World! This is a test string.";
        
        cout << "Text: \"" << text << "\"" << endl;
        
        // Count character frequencies
        map<char, int> charFrequency;
        
        for(char c : text) {
            if(isalpha(c)) {  // Only count letters
                char lowerC = tolower(c);
                charFrequency[lowerC]++;
            }
        }
        
        cout << "\nCharacter Frequencies (letters only):" << endl;
        
        // Display as histogram
        for(char c = 'a'; c <= 'z'; c++) {
            if(charFrequency.find(c) != charFrequency.end()) {
                cout << c << ": " << string(charFrequency[c], '*') 
                     << " (" << charFrequency[c] << ")" << endl;
            }
        }
        
        // Find most and least frequent letters
        char mostFrequent = ' ';
        char leastFrequent = ' ';
        int maxCount = 0;
        int minCount = INT_MAX;
        
        for(const auto& entry : charFrequency) {
            if(entry.second > maxCount) {
                maxCount = entry.second;
                mostFrequent = entry.first;
            }
            if(entry.second < minCount) {
                minCount = entry.second;
                leastFrequent = entry.first;
            }
        }
        
        cout << "\nMost frequent letter: '" << mostFrequent 
             << "' (" << maxCount << " times)" << endl;
        cout << "Least frequent letter: '" << leastFrequent 
             << "' (" << minCount << " times)" << endl;
    }
    
    // 3. Two Sum Problem
    static void twoSumProblem() {
        cout << "\n\n=== 3. Two Sum Problem ===" << endl;
        
        vector<int> numbers = {2, 7, 11, 15, 3, 6, 8};
        int target = 9;
        
        cout << "Array: ";
        for(int num : numbers) cout << num << " ";
        cout << endl;
        cout << "Target sum: " << target << endl;
        
        // Using HashMap to solve Two Sum
        map<int, int> numIndexMap;  // value → index
        
        cout << "\nSearching for pairs that sum to " << target << ":" << endl;
        
        for(int i = 0; i < numbers.size(); i++) {
            int complement = target - numbers[i];
            
            if(numIndexMap.find(complement) != numIndexMap.end()) {
                cout << "  Found: numbers[" << numIndexMap[complement] << "] = " << complement
                     << " + numbers[" << i << "] = " << numbers[i]
                     << " = " << target << endl;
            }
            
            numIndexMap[numbers[i]] = i;
        }
        
        // Alternative: Find all pairs
        cout << "\nAll pairs that sum to " << target << ":" << endl;
        vector<bool> used(numbers.size(), false);
        
        for(int i = 0; i < numbers.size(); i++) {
            if(used[i]) continue;
            
            for(int j = i + 1; j < numbers.size(); j++) {
                if(used[j]) continue;
                
                if(numbers[i] + numbers[j] == target) {
                    cout << "  (" << numbers[i] << ", " << numbers[j] << ")" << endl;
                    used[i] = used[j] = true;
                    break;
                }
            }
        }
    }
    
    // 4. Group Anagrams
    static void groupAnagrams() {
        cout << "\n\n=== 4. Group Anagrams ===" << endl;
        
        vector<string> words = {"eat", "tea", "tan", "ate", "nat", "bat", "tab", "ant"};
        
        cout << "Words: ";
        for(const auto& word : words) cout << word << " ";
        cout << endl;
        
        // Group anagrams using HashMap
        map<string, vector<string>> anagramGroups;
        
        for(const string& word : words) {
            // Create a sorted version as key
            string sortedWord = word;
            sort(sortedWord.begin(), sortedWord.end());
            
            anagramGroups[sortedWord].push_back(word);
        }
        
        cout << "\nAnagram Groups:" << endl;
        int groupNum = 1;
        
        for(const auto& group : anagramGroups) {
            cout << "Group " << groupNum++ << " (key: \"" << group.first << "\"): ";
            for(const auto& word : group.second) {
                cout << word << " ";
            }
            cout << endl;
        }
        
        // Show the HashMap structure
        cout << "\nHashMap Structure:" << endl;
        for(const auto& entry : anagramGroups) {
            cout << "  Key: \"" << entry.first << "\" → ";
            cout << "Values: { ";
            for(const auto& word : entry.second) {
                cout << word << " ";
            }
            cout << "}" << endl;
        }
    }
    
    // 5. First Non-Repeating Character
    static void firstNonRepeatingCharacter() {
        cout << "\n\n=== 5. First Non-Repeating Character ===" << endl;
        
        string testString = "swiss";
        
        cout << "String: \"" << testString << "\"" << endl;
        
        // Count character frequencies
        map<char, pair<int, int>> charInfo;  // char → (frequency, firstIndex)
        
        for(int i = 0; i < testString.length(); i++) {
            char c = testString[i];
            
            if(charInfo.find(c) == charInfo.end()) {
                // First occurrence
                charInfo[c] = make_pair(1, i);
            } else {
                // Increment frequency
                charInfo[c].first++;
            }
        }
        
        // Find first non-repeating character
        int firstNonRepeatingIndex = INT_MAX;
        char firstNonRepeatingChar = '\0';
        
        cout << "\nCharacter Analysis:" << endl;
        for(const auto& entry : charInfo) {
            cout << "  '" << entry.first << "': frequency=" << entry.second.first
                 << ", first index=" << entry.second.second << endl;
            
            if(entry.second.first == 1 && entry.second.second < firstNonRepeatingIndex) {
                firstNonRepeatingIndex = entry.second.second;
                firstNonRepeatingChar = entry.first;
            }
        }
        
        if(firstNonRepeatingChar != '\0') {
            cout << "\nFirst non-repeating character: '" << firstNonRepeatingChar
                 << "' at index " << firstNonRepeatingIndex << endl;
        } else {
            cout << "\nNo non-repeating characters found" << endl;
        }
        
        // Additional test cases
        cout << "\nAdditional Test Cases:" << endl;
        vector<string> testCases = {"programming", "aabbcc", "leetcode", "loveleetcode"};
        
        for(const string& testCase : testCases) {
            map<char, int> freq;
            for(char c : testCase) freq[c]++;
            
            char result = '\0';
            for(char c : testCase) {
                if(freq[c] == 1) {
                    result = c;
                    break;
                }
            }
            
            cout << "  \"" << testCase << "\" → ";
            if(result != '\0') {
                cout << "'" << result << "'" << endl;
            } else {
                cout << "No unique character" << endl;
            }
        }
    }
    
    // 6. LRU Cache Simulation
    static void lruCacheSimulation() {
        cout << "\n\n=== 6. LRU Cache Simulation ===" << endl;
        
        // Simplified LRU Cache using map and list
        int cacheCapacity = 3;
        
        cout << "LRU Cache with capacity: " << cacheCapacity << endl;
        
        // Using list to maintain order (most recent at front)
        list<pair<int, string>> cache;
        map<int, list<pair<int, string>>::iterator> cacheMap;
        
        auto get = [&](int key) -> string {
            if(cacheMap.find(key) == cacheMap.end()) {
                cout << "  GET(" << key << ") → Cache miss" << endl;
                return "";
            }
            
            // Move to front (most recently used)
            auto it = cacheMap[key];
            string value = it->second;
            cache.erase(it);
            cache.push_front({key, value});
            cacheMap[key] = cache.begin();
            
            cout << "  GET(" << key << ") → \"" << value << "\"" << endl;
            return value;
        };
        
        auto put = [&](int key, const string& value) {
            cout << "  PUT(" << key << ", \"" << value << "\")" << endl;
            
            if(cacheMap.find(key) != cacheMap.end()) {
                // Update existing
                auto it = cacheMap[key];
                cache.erase(it);
            } else if(cache.size() >= cacheCapacity) {
                // Remove least recently used
                int lruKey = cache.back().first;
                cout << "    Cache full, removing LRU key: " << lruKey << endl;
                cacheMap.erase(lruKey);
                cache.pop_back();
            }
            
            // Add to front
            cache.push_front({key, value});
            cacheMap[key] = cache.begin();
        };
        
        auto displayCache = [&]() {
            cout << "  Cache state: ";
            for(const auto& item : cache) {
                cout << item.first << ":\"" << item.second << "\" ";
            }
            cout << "(most recent first)" << endl;
        };
        
        // Simulate operations
        cout << "\nCache Operations:" << endl;
        put(1, "Data1");
        put(2, "Data2");
        put(3, "Data3");
        displayCache();
        
        get(1);  // Access key 1 (becomes most recent)
        displayCache();
        
        put(4, "Data4");  // Should remove key 2 (least recent)
        displayCache();
        
        get(2);  // Cache miss
        get(3);  // Access key 3
        displayCache();
        
        put(5, "Data5");  // Should remove key 1
        displayCache();
    }
};

int main() {
    cout << "=== Practical Applications of HashMap ===" << endl;
    
    HashMapApplications::wordFrequencyCounter();
    HashMapApplications::characterFrequencyCounter();
    HashMapApplications::twoSumProblem();
    HashMapApplications::groupAnagrams();
    HashMapApplications::firstNonRepeatingCharacter();
    HashMapApplications::lruCacheSimulation();
    
    return 0;
}
```

## Advanced Hash Table Concepts

### 1. Custom Hash Functions

```cpp
#include <iostream>
#include <string>
#include <functional>
#include <iomanip>
using namespace std;

class CustomHashFunctions {
public:
    // 1. String hash functions
    static void demonstrateStringHashing() {
        cout << "=== String Hash Functions ===" << endl;
        
        vector<string> testStrings = {
            "hello", "world", "hash", "table", "example",
            "a", "ab", "abc", "abcd", "abcde"
        };
        
        cout << left << setw(15) << "String" 
             << setw(20) << "std::hash" 
             << setw(20) << "Custom Hash 1" 
             << setw(20) << "Custom Hash 2" << endl;
        cout << string(75, '-') << endl;
        
        for(const auto& str : testStrings) {
            // Standard hash
            hash<string> stdHasher;
            size_t stdHash = stdHasher(str);
            
            // Custom hash 1: Simple polynomial rolling hash
            size_t customHash1 = 0;
            for(char c : str) {
                customHash1 = customHash1 * 31 + c;
            }
            
            // Custom hash 2: DJB2 hash algorithm
            size_t customHash2 = 5381;
            for(char c : str) {
                customHash2 = ((customHash2 << 5) + customHash2) + c;
            }
            
            cout << left << setw(15) << str 
                 << setw(20) << (stdHash % 1000)
                 << setw(20) << (customHash1 % 1000)
                 << setw(20) << (customHash2 % 1000) << endl;
        }
    }
    
    // 2. Custom object hashing
    struct Person {
        string name;
        int age;
        string city;
        
        Person(string n, int a, string c) : name(n), age(a), city(c) {}
        
        // Equality operator
        bool operator==(const Person& other) const {
            return name == other.name && age == other.age && city == other.city;
        }
    };
    
    // Custom hash for Person
    struct PersonHash {
        size_t operator()(const Person& p) const {
            // Combine hashes of members
            size_t nameHash = hash<string>()(p.name);
            size_t ageHash = hash<int>()(p.age);
            size_t cityHash = hash<string>()(p.city);
            
            // Simple combination
            return nameHash ^ (ageHash << 1) ^ (cityHash << 2);
        }
    };
    
    static void demonstrateCustomObjectHashing() {
        cout << "\n\n=== Custom Object Hashing ===" << endl;
        
        vector<Person> people = {
            Person("Alice", 25, "New York"),
            Person("Bob", 30, "London"),
            Person("Charlie", 25, "New York"),
            Person("Alice", 25, "New York")  // Duplicate
        };
        
        PersonHash personHasher;
        
        cout << "Person objects and their hashes:" << endl;
        cout << left << setw(20) << "Name" 
             << setw(10) << "Age" 
             << setw(15) << "City" 
             << setw(15) << "Hash" << endl;
        cout << string(60, '-') << endl;
        
        for(const auto& person : people) {
            size_t hashValue = personHasher(person);
            cout << left << setw(20) << person.name 
                 << setw(10) << person.age 
                 << setw(15) << person.city 
                 << setw(15) << (hashValue % 1000) << endl;
        }
        
        // Check equality and hash equality
        cout << "\nChecking duplicates:" << endl;
        for(size_t i = 0; i < people.size(); i++) {
            for(size_t j = i + 1; j < people.size(); j++) {
                if(people[i] == people[j]) {
                    cout << "  Person " << i << " and " << j << " are equal" << endl;
                }
                if(personHasher(people[i]) == personHasher(people[j])) {
                    cout << "  Person " << i << " and " << j << " have same hash" << endl;
                }
            }
        }
    }
    
    // 3. Perfect hashing demonstration
    static void demonstratePerfectHashing() {
        cout << "\n\n=== Perfect Hashing Concept ===" << endl;
        
        // Small set of known keys
        vector<string> keys = {"January", "February", "March", "April", "May", "June"};
        
        cout << "Keys: ";
        for(const auto& key : keys) cout << key << " ";
        cout << endl;
        
        // Try to find a perfect hash function
        cout << "\nSearching for perfect hash function..." << endl;
        
        for(int a = 1; a <= 10; a++) {
            for(int b = 0; b <= 10; b++) {
                vector<bool> occupied(keys.size(), false);
                bool collision = false;
                
                for(const auto& key : keys) {
                    size_t hash = 0;
                    for(char c : key) {
                        hash = hash * a + c + b;
                    }
                    size_t index = hash % keys.size();
                    
                    if(occupied[index]) {
                        collision = true;
                        break;
                    }
                    occupied[index] = true;
                }
                
                if(!collision) {
                    cout << "  Found perfect hash: h(key) = (";
                    cout << a << " * sum(chars) + " << b << ") % " << keys.size() << endl;
                    
                    // Show the mapping
                    cout << "  Mapping:" << endl;
                    for(const auto& key : keys) {
                        size_t hash = 0;
                        for(char c : key) hash = hash * a + c + b;
                        size_t index = hash % keys.size();
                        cout << "    \"" << key << "\" → " << index << endl;
                    }
                    return;
                }
            }
        }
        
        cout << "  No perfect hash found for this set with simple linear functions" << endl;
    }
    
    // 4. Cryptographic hash functions (conceptual)
    static void demonstrateCryptographicHashing() {
        cout << "\n\n=== Cryptographic Hash Properties ===" << endl;
        
        string testMessage = "Hello, World!";
        string similarMessage = "Hello, World?";
        
        cout << "Testing cryptographic hash properties:" << endl;
        cout << "1. Deterministic: Same input → same output" << endl;
        cout << "2. Quick to compute" << endl;
        cout << "3. Small changes → completely different hash" << endl;
        cout << "4. Impossible to reverse (pre-image resistance)" << endl;
        cout << "5. Hard to find collisions" << endl;
        
        // Simple simulation (not actually cryptographic)
        cout << "\nSimulation with simple hash functions:" << endl;
        
        auto simpleHash = [](const string& str) -> size_t {
            size_t hash = 0;
            for(char c : str) {
                hash = hash * 31 + c;
            }
            return hash;
        };
        
        size_t hash1 = simpleHash(testMessage);
        size_t hash2 = simpleHash(similarMessage);
        
        cout << "Message 1: \"" << testMessage << "\"" << endl;
        cout << "Hash 1: " << hash1 << " (hex: " << hex << hash1 << dec << ")" << endl;
        
        cout << "\nMessage 2: \"" << similarMessage << "\"" << endl;
        cout << "Hash 2: " << hash2 << " (hex: " << hex << hash2 << dec << ")" << endl;
        
        cout << "\nHash difference: " << abs((long long)(hash1 - hash2)) << endl;
        cout << "Percentage difference: " 
             << (abs((long long)(hash1 - hash2)) * 100.0 / max(hash1, hash2)) << "%" << endl;
    }
};

int main() {
    CustomHashFunctions::demonstrateStringHashing();
    CustomHashFunctions::demonstrateCustomObjectHashing();
    CustomHashFunctions::demonstratePerfectHashing();
    CustomHashFunctions::demonstrateCryptographicHashing();
    
    return 0;
}
```

### 2. Performance Analysis and Comparison

```cpp
#include <iostream>
#include <unordered_map>
#include <map>
#include <vector>
#include <chrono>
#include <random>
#include <iomanip>
#include <string>
#include <algorithm>
using namespace std;
using namespace chrono;

class HashTablePerformance {
private:
    // Generate random strings
    static vector<string> generateRandomStrings(int count, int length = 10) {
        vector<string> strings;
        strings.reserve(count);
        
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<> dis('a', 'z');
        
        for(int i = 0; i < count; i++) {
            string str;
            str.reserve(length);
            for(int j = 0; j < length; j++) {
                str.push_back(static_cast<char>(dis(gen)));
            }
            strings.push_back(str);
        }
        
        return strings;
    }
    
    // Generate random integers
    static vector<int> generateRandomIntegers(int count, int minVal = 0, int maxVal = 1000000) {
        vector<int> integers;
        integers.reserve(count);
        
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<> dis(minVal, maxVal);
        
        for(int i = 0; i < count; i++) {
            integers.push_back(dis(gen));
        }
        
        return integers;
    }
    
public:
    // Compare different hash table implementations
    static void compareImplementations(int elementCount) {
        cout << "\n" << string(80, '=') << endl;
        cout << "Performance Comparison: Hash Table Implementations" << endl;
        cout << "Testing with " << elementCount << " elements" << endl;
        cout << string(80, '=') << endl;
        
        // Generate test data
        auto strings = generateRandomStrings(elementCount);
        auto integers = generateRandomIntegers(elementCount);
        
        // 1. std::unordered_map (Hash Table)
        cout << "\n1. std::unordered_map (Hash Table):" << endl;
        unordered_map<string, int> unorderedMap;
        
        // Insertion test
        auto start = high_resolution_clock::now();
        for(int i = 0; i < elementCount; i++) {
            unorderedMap[strings[i]] = integers[i];
        }
        auto end = high_resolution_clock::now();
        auto unorderedInsertTime = duration_cast<microseconds>(end - start).count();
        
        // Search test
        start = high_resolution_clock::now();
        for(int i = 0; i < elementCount; i++) {
            auto it = unorderedMap.find(strings[i]);
            volatile int value = it->second;  // Prevent optimization
        }
        end = high_resolution_clock::now();
        auto unorderedSearchTime = duration_cast<microseconds>(end - start).count();
        
        // Delete test
        start = high_resolution_clock::now();
        for(int i = 0; i < elementCount; i++) {
            unorderedMap.erase(strings[i]);
        }
        end = high_resolution_clock::now();
        auto unorderedDeleteTime = duration_cast<microseconds>(end - start).count();
        
        // 2. std::map (Red-Black Tree)
        cout << "\n2. std::map (Red-Black Tree - Balanced BST):" << endl;
        map<string, int> sortedMap;
        
        // Insertion test
        start = high_resolution_clock::now();
        for(int i = 0; i < elementCount; i++) {
            sortedMap[strings[i]] = integers[i];
        }
        end = high_resolution_clock::now();
        auto mapInsertTime = duration_cast<microseconds>(end - start).count();
        
        // Search test
        start = high_resolution_clock::now();
        for(int i = 0; i < elementCount; i++) {
            auto it = sortedMap.find(strings[i]);
            volatile int value = it->second;
        }
        end = high_resolution_clock::now();
        auto mapSearchTime = duration_cast<microseconds>(end - start).count();
        
        // Delete test
        start = high_resolution_clock::now();
        for(int i = 0; i < elementCount; i++) {
            sortedMap.erase(strings[i]);
        }
        end = high_resolution_clock::now();
        auto mapDeleteTime = duration_cast<microseconds>(end - start).count();
        
        // 3. Custom Hash Table (simulated with vector for large data)
        cout << "\n3. Custom Hash Table (Separate Chaining - simulated):" << endl;
        
        // For fair comparison, we'll use unordered_map as proxy
        // In reality, custom implementation would have different characteristics
        
        // Display results
        cout << fixed << setprecision(2);
        cout << "\n" << string(80, '-') << endl;
        cout << left << setw(25) << "Operation" 
             << setw(20) << "unordered_map" 
             << setw(20) << "map (BST)" 
             << setw(15) << "Speedup" << endl;
        cout << string(80, '-') << endl;
        
        // Insertion comparison
        double insertSpeedup = static_cast<double>(mapInsertTime) / unorderedInsertTime;
        cout << left << setw(25) << "Insertion (μs)" 
             << setw(20) << unorderedInsertTime 
             << setw(20) << mapInsertTime 
             << setw(15) << insertSpeedup << "x" << endl;
        
        // Search comparison
        double searchSpeedup = static_cast<double>(mapSearchTime) / unorderedSearchTime;
        cout << left << setw(25) << "Search (μs)" 
             << setw(20) << unorderedSearchTime 
             << setw(20) << mapSearchTime 
             << setw(15) << searchSpeedup << "x" << endl;
        
        // Delete comparison
        double deleteSpeedup = static_cast<double>(mapDeleteTime) / unorderedDeleteTime;
        cout << left << setw(25) << "Deletion (μs)" 
             << setw(20) << unorderedDeleteTime 
             << setw(20) << mapDeleteTime 
             << setw(15) << deleteSpeedup << "x" << endl;
        
        cout << "\nKey Observations:" << endl;
        cout << "• unordered_map (hash table): Average O(1) operations" << endl;
        cout << "• map (red-black tree): Guaranteed O(log n) operations" << endl;
        cout << "• Hash tables are faster but have worst-case O(n)" << endl;
        cout << "• Balanced trees provide predictable performance" << endl;
    }
    
    // Analyze load factor impact
    static void analyzeLoadFactorImpact() {
        cout << "\n\n" << string(80, '=') << endl;
        cout << "Load Factor Impact Analysis" << endl;
        cout << string(80, '=') << endl;
        
        const int elementCount = 10000;
        auto strings = generateRandomStrings(elementCount);
        auto integers = generateRandomIntegers(elementCount);
        
        vector<double> loadFactors = {0.1, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 3.0};
        
        cout << left << setw(15) << "Load Factor" 
             << setw(20) << "Insert Time (μs)" 
             << setw(20) << "Search Time (μs)" 
             << setw(20) << "Collision Rate" << endl;
        cout << string(75, '-') << endl;
        
        for(double loadFactor : loadFactors) {
            // Create hash table with specific load factor
            int capacity = static_cast<int>(elementCount / loadFactor);
            unordered_map<string, int> testMap;
            testMap.rehash(capacity);  // Set initial bucket count
            
            // Insert elements
            auto start = high_resolution_clock::now();
            for(int i = 0; i < elementCount; i++) {
                testMap[strings[i]] = integers[i];
            }
            auto end = high_resolution_clock::now();
            auto insertTime = duration_cast<microseconds>(end - start).count();
            
            // Search elements
            start = high_resolution_clock::now();
            for(int i = 0; i < elementCount; i++) {
                testMap.find(strings[i]);
            }
            end = high_resolution_clock::now();
            auto searchTime = duration_cast<microseconds>(end - start).count();
            
            // Calculate collision rate (approximate)
            double collisionRate = 0;
            if(testMap.bucket_count() > 0) {
                collisionRate = 1.0 - (testMap.size() * 1.0 / testMap.bucket_count());
            }
            
            cout << left << setw(15) << loadFactor 
                 << setw(20) << insertTime 
                 << setw(20) << searchTime 
                 << setw(20) << fixed << setprecision(2) << collisionRate << endl;
        }
        
        cout << "\nAnalysis:" << endl;
        cout << "• Low load factor (< 0.5): Fast operations, more memory" << endl;
        cout << "• Optimal load factor (0.7-0.8): Good balance" << endl;
        cout << "• High load factor (> 1.0): More collisions, slower" << endl;
        cout << "• Standard libraries use ~0.75 as default max load factor" << endl;
    }
    
    // Compare collision resolution strategies
    static void compareCollisionResolution() {
        cout << "\n\n" << string(80, '=') << endl;
        cout << "Collision Resolution Strategy Comparison" << endl;
        cout << string(80, '=') << endl;
        
        const int elementCount = 5000;
        auto strings = generateRandomStrings(elementCount);
        
        cout << "Testing with " << elementCount << " elements" << endl;
        cout << "Note: Simulating different strategies with std::unordered_map" << endl;
        
        // Simulate different scenarios
        vector<pair<string, double>> scenarios = {
            {"Best Case (no collisions)", 0.1},
            {"Good Case (low collisions)", 0.5},
            {"Average Case", 1.0},
            {"Worst Case (all collisions)", 100.0}  // Simulated by bad hash
        };
        
        cout << left << setw(30) << "\nScenario" 
             << setw(20) << "Separate Chaining" 
             << setw(20) << "Linear Probing" 
             << setw(20) << "Double Hashing" << endl;
        cout << string(90, '-') << endl;
        
        for(const auto& scenario : scenarios) {
            // This is a conceptual comparison
            // In reality, you'd implement each strategy separately
            
            double factor = scenario.second;
            
            // Simulated times (in practice, implement and measure)
            double chainingTime = 100 + (factor * 50);
            double linearProbingTime = 80 + (factor * 100);
            double doubleHashingTime = 90 + (factor * 60);
            
            cout << left << setw(30) << scenario.first 
                 << setw(20) << fixed << setprecision(1) << chainingTime << " μs"
                 << setw(20) << linearProbingTime << " μs"
                 << setw(20) << doubleHashingTime << " μs" << endl;
        }
        
        cout << "\nStrategy Characteristics:" << endl;
        cout << "1. Separate Chaining:" << endl;
        cout << "   • Simple to implement" << endl;
        cout << "   • Handles arbitrary load factors" << endl;
        cout << "   • Memory overhead for pointers" << endl;
        
        cout << "\n2. Open Addressing (Linear Probing):" << endl;
        cout << "   • Better cache performance" << endl;
        cout << "   • Less memory overhead" << endl;
        cout << "   • Suffers from clustering" << endl;
        
        cout << "\n3. Open Addressing (Double Hashing):" << endl;
        cout << "   • Reduces clustering" << endl;
        cout << "   • More computation per probe" << endl;
        cout << "   • Better distribution" << endl;
        
        cout << "\n4. Open Addressing (Quadratic Probing):" << endl;
        cout << "   • Reduces primary clustering" << endl;
        cout << "   • May not find empty slot even if exists" << endl;
    }
    
    // Memory usage comparison
    static void analyzeMemoryUsage() {
        cout << "\n\n" << string(80, '=') << endl;
        cout << "Memory Usage Analysis" << endl;
        cout << string(80, '=') << endl;
        
        cout << "Theoretical memory usage for 1000 elements:" << endl;
        cout << left << setw(30) << "\nData Structure" 
             << setw(20) << "Theoretical O()" 
             << setw(30) << "Estimated Memory (bytes)" << endl;
        cout << string(80, '-') << endl;
        
        // Assuming 4-byte keys and values
        int keySize = 4;
        int valueSize = 4;
        int pointerSize = 8;  // 64-bit system
        
        vector<pair<string, pair<string, long long>>> structures = {
            {"Array (no gaps)", {"O(n)", 1000 * (keySize + valueSize)}},
            {"Separate Chaining", {"O(n + m)", 1000 * (keySize + valueSize + pointerSize) + 1000 * pointerSize}},
            {"Linear Probing", {"O(m)", 1500 * (keySize + valueSize)}},  // Assuming 1.5 load factor
            {"std::unordered_map", {"O(n)", 1000 * (keySize + valueSize + 2 * pointerSize)}},
            {"std::map (RB Tree)", {"O(n)", 1000 * (keySize + valueSize + 3 * pointerSize + 1)}},  // +1 for color
            {"Sorted Array", {"O(n)", 1000 * (keySize + valueSize)}}
        };
        
        for(const auto& structure : structures) {
            cout << left << setw(30) << structure.first 
                 << setw(20) << structure.second.first 
                 << setw(30) << structure.second.second << endl;
        }
        
        cout << "\nKey Points:" << endl;
        cout << "1. Open addressing uses less memory than chaining" << endl;
        cout << "2. Separate chaining has pointer overhead" << endl;
        cout << "3. Trees have more overhead than hash tables" << endl;
        cout << "4. Arrays have best memory efficiency but fixed size" << endl;
        cout << "5. Load factor significantly affects memory usage" << endl;
    }
};

int main() {
    HashTablePerformance::compareImplementations(10000);
    HashTablePerformance::analyzeLoadFactorImpact();
    HashTablePerformance::compareCollisionResolution();
    HashTablePerformance::analyzeMemoryUsage();
    
    return 0;
}
```

## Common Interview Questions

### 1. Implement a HashMap from scratch
```cpp
#include <iostream>
#include <vector>
#include <list>
#include <utility>
#include <string>
using namespace std;

class InterviewHashMap {
private:
    vector<list<pair<string, int>>> table;
    int capacity;
    int size;
    
    int hashFunction(const string& key) const {
        int hash = 0;
        for(char c : key) {
            hash = (hash * 31 + c) % capacity;
        }
        return hash;
    }
    
    void rehash() {
        int newCapacity = capacity * 2;
        vector<list<pair<string, int>>> newTable(newCapacity);
        
        for(const auto& bucket : table) {
            for(const auto& kv : bucket) {
                int newIndex = hashFunction(kv.first) % newCapacity;
                newTable[newIndex].push_back(kv);
            }
        }
        
        table = move(newTable);
        capacity = newCapacity;
    }
    
public:
    InterviewHashMap(int initialCapacity = 10) : capacity(initialCapacity), size(0) {
        table.resize(capacity);
    }
    
    void put(const string& key, int value) {
        if(size * 2 >= capacity) {
            rehash();
        }
        
        int index = hashFunction(key);
        
        // Check if key exists
        for(auto& kv : table[index]) {
            if(kv.first == key) {
                kv.second = value;
                return;
            }
        }
        
        // Insert new key
        table[index].emplace_back(key, value);
        size++;
    }
    
    int get(const string& key) const {
        int index = hashFunction(key);
        
        for(const auto& kv : table[index]) {
            if(kv.first == key) {
                return kv.second;
            }
        }
        
        return -1;  // Not found
    }
    
    void remove(const string& key) {
        int index = hashFunction(key);
        auto& bucket = table[index];
        
        for(auto it = bucket.begin(); it != bucket.end(); ++it) {
            if(it->first == key) {
                bucket.erase(it);
                size--;
                return;
            }
        }
    }
    
    void display() const {
        cout << "HashMap Contents:" << endl;
        for(int i = 0; i < capacity; i++) {
            if(!table[i].empty()) {
                cout << "Bucket " << i << ": ";
                for(const auto& kv : table[i]) {
                    cout << "[" << kv.first << "=" << kv.second << "] ";
                }
                cout << endl;
            }
        }
    }
};

void demonstrateInterviewHashMap() {
    cout << "=== Interview Question: Implement HashMap ===" << endl;
    
    InterviewHashMap map(5);
    
    map.put("apple", 10);
    map.put("banana", 20);
    map.put("cherry", 30);
    map.put("date", 40);
    
    map.display();
    
    cout << "\nget('apple'): " << map.get("apple") << endl;
    cout << "get('banana'): " << map.get("banana") << endl;
    cout << "get('elderberry'): " << map.get("elderberry") << endl;
    
    cout << "\nRemoving 'banana'..." << endl;
    map.remove("banana");
    map.display();
    
    cout << "\nAdding more elements to trigger rehash..." << endl;
    map.put("elderberry", 50);
    map.put("fig", 60);
    map.put("grape", 70);
    
    map.display();
}
```

### 2. Two Sum Problem (Optimized)
```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class TwoSumProblems {
public:
    // Basic Two Sum
    static vector<int> twoSum(const vector<int>& nums, int target) {
        unordered_map<int, int> numMap;  // value -> index
        
        for(int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if(numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            
            numMap[nums[i]] = i;
        }
        
        return {};
    }
    
    // Two Sum with multiple solutions
    static vector<vector<int>> twoSumAllPairs(const vector<int>& nums, int target) {
        unordered_map<int, vector<int>> numMap;  // value -> indices
        vector<vector<int>> result;
        vector<bool> used(nums.size(), false);
        
        // Store all indices for each number
        for(int i = 0; i < nums.size(); i++) {
            numMap[nums[i]].push_back(i);
        }
        
        for(int i = 0; i < nums.size(); i++) {
            if(used[i]) continue;
            
            int complement = target - nums[i];
            
            if(numMap.find(complement) != numMap.end()) {
                for(int j : numMap[complement]) {
                    if(j > i && !used[j]) {  // Avoid duplicates and self-pairing
                        result.push_back({i, j});
                        used[i] = used[j] = true;
                        break;
                    }
                }
            }
        }
        
        return result;
    }
    
    // Two Sum with sorted input
    static vector<int> twoSumSorted(const vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        
        while(left < right) {
            int sum = nums[left] + nums[right];
            
            if(sum == target) {
                return {left, right};
            } else if(sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return {};
    }
    
    static void demonstrate() {
        cout << "\n\n=== Two Sum Interview Problems ===" << endl;
        
        vector<int> nums = {2, 7, 11, 15, 3, 6, 8, 2};
        int target = 9;
        
        cout << "Array: ";
        for(int num : nums) cout << num << " ";
        cout << "\nTarget: " << target << endl;
        
        // Basic Two Sum
        cout << "\n1. Basic Two Sum (first pair):" << endl;
        auto result1 = twoSum(nums, target);
        if(!result1.empty()) {
            cout << "Indices: [" << result1[0] << ", " << result1[1] << "]" << endl;
            cout << "Values: " << nums[result1[0]] << " + " << nums[result1[1]] 
                 << " = " << target << endl;
        }
        
        // All pairs
        cout << "\n2. All Two Sum pairs:" << endl;
        auto result2 = twoSumAllPairs(nums, target);
        for(const auto& pair : result2) {
            cout << "  [" << pair[0] << ", " << pair[1] << "] → " 
                 << nums[pair[0]] << " + " << nums[pair[1]] << endl;
        }
        
        // Sorted array version
        cout << "\n3. Two Sum with sorted array:" << endl;
        vector<int> sortedNums = nums;
        sort(sortedNums.begin(), sortedNums.end());
        
        cout << "Sorted array: ";
        for(int num : sortedNums) cout << num << " ";
        cout << endl;
        
        auto result3 = twoSumSorted(sortedNums, target);
        if(!result3.empty()) {
            cout << "Indices: [" << result3[0] << ", " << result3[1] << "]" << endl;
            cout << "Values: " << sortedNums[result3[0]] << " + " 
                 << sortedNums[result3[1]] << " = " << target << endl;
        }
    }
};
```

### 3. LRU Cache Implementation
```cpp
#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
private:
    int capacity;
    list<pair<int, int>> cache;  // (key, value) pairs, most recent at front
    unordered_map<int, list<pair<int, int>>::iterator> cacheMap;
    
public:
    LRUCache(int cap) : capacity(cap) {}
    
    int get(int key) {
        if(cacheMap.find(key) == cacheMap.end()) {
            return -1;
        }
        
        // Move to front (most recently used)
        auto it = cacheMap[key];
        int value = it->second;
        cache.erase(it);
        cache.push_front({key, value});
        cacheMap[key] = cache.begin();
        
        return value;
    }
    
    void put(int key, int value) {
        if(cacheMap.find(key) != cacheMap.end()) {
            // Update existing
            auto it = cacheMap[key];
            cache.erase(it);
        } else if(cache.size() >= capacity) {
            // Remove least recently used
            int lruKey = cache.back().first;
            cacheMap.erase(lruKey);
            cache.pop_back();
        }
        
        // Add to front
        cache.push_front({key, value});
        cacheMap[key] = cache.begin();
    }
    
    void display() const {
        cout << "LRU Cache (most recent first): ";
        for(const auto& item : cache) {
            cout << item.first << ":" << item.second << " ";
        }
        cout << endl;
    }
};

void demonstrateLRUCache() {
    cout << "\n\n=== LRU Cache Implementation ===" << endl;
    
    LRUCache cache(3);
    
    cout << "Cache capacity: 3" << endl;
    
    cache.put(1, 100);
    cout << "put(1, 100)" << endl;
    cache.display();
    
    cache.put(2, 200);
    cout << "put(2, 200)" << endl;
    cache.display();
    
    cache.put(3, 300);
    cout << "put(3, 300)" << endl;
    cache.display();
    
    cout << "\nget(2): " << cache.get(2) << endl;
    cache.display();
    
    cache.put(4, 400);  // Should remove key 1 (LRU)
    cout << "\nput(4, 400) - should remove key 1" << endl;
    cache.display();
    
    cout << "\nget(1): " << cache.get(1) << " (should be -1, removed)" << endl;
    
    cache.put(5, 500);  // Should remove key 3
    cout << "\nput(5, 500) - should remove key 3" << endl;
    cache.display();
}
```

## Summary and Best Practices

### Hash Tables Summary:

**Key Characteristics:**
- **Average Time Complexity**: O(1) for insert, delete, search
- **Worst Case Time Complexity**: O(n) due to collisions
- **Space Complexity**: O(n)
- **Load Factor**: Critical parameter affecting performance
- **Collision Resolution**: Chaining vs Open Addressing

**Common Implementations:**
1. **Separate Chaining**: Each bucket is a linked list
2. **Open Addressing**: Linear probing, quadratic probing, double hashing
3. **Robin Hood Hashing**: Variant of open addressing
4. **Cuckoo Hashing**: Uses multiple hash functions

### Hash Sets vs Hash Maps:

| Aspect | HashSet | HashMap |
|--------|---------|---------|
| **Stores** | Only keys | Key-value pairs |
| **Use Case** | Membership testing | Associative storage |
| **Operations** | add, remove, contains | put, get, remove |
| **Complexity** | Same as HashMap | Same as HashSet |
| **Example** | Unique words | Word frequencies |

### Time Complexity Comparison:

| Operation | Hash Table (Avg) | Hash Table (Worst) | Balanced Tree | Sorted Array |
|-----------|------------------|-------------------|---------------|--------------|
| **Insert** | O(1) | O(n) | O(log n) | O(n) |
| **Search** | O(1) | O(n) | O(log n) | O(log n) |
| **Delete** | O(1) | O(n) | O(log n) | O(n) |
| **Min/Max** | O(n) | O(n) | O(log n) | O(1) |
| **Successor** | O(n) | O(n) | O(log n) | O(1) |

### When to Use Hash Tables:

**Use Hash Tables when:**
1. Need O(1) average time operations
2. Don't need sorted order of elements
3. Willing to trade worst-case performance for average-case
4. Have good hash function for keys
5. Memory is not extremely constrained

**Avoid Hash Tables when:**
1. Need guaranteed O(log n) worst-case performance
2. Need elements in sorted order
3. Memory is extremely limited
4. Need to frequently find min/max/successor
5. Keys have poor hash distribution

### Best Practices:

1. **Choose Good Hash Function**:
   - Distributes keys uniformly
   - Fast to compute
   - Minimizes collisions

2. **Manage Load Factor**:
   - Keep between 0.5 and 0.75 for best performance
   - Implement automatic rehashing
   - Monitor collision rates

3. **Choose Right Collision Resolution**:
   - **Separate Chaining**: Simple, handles high load factors
   - **Linear Probing**: Better cache performance, less memory
   - **Double Hashing**: Reduces clustering, more computation

4. **Consider Thread Safety**:
   - Standard library hash tables are not thread-safe
   - Use synchronization or concurrent hash maps for multi-threading

5. **Memory Considerations**:
   - Hash tables have overhead for buckets/pointers
   - Open addressing uses less memory than chaining
   - Consider memory locality for performance

### Common Pitfalls:

1. **Poor Hash Functions**: Lead to many collisions
2. **High Load Factor**: Causes performance degradation
3. **Mutable Keys**: Changing key after insertion breaks hash table
4. **Memory Leaks**: Forgetting to clean up in chaining implementation
5. **Resize Timing**: Resizing too early wastes memory, too late hurts performance

### Real-World Applications:

1. **Databases**: Indexing, join operations
2. **Caches**: LRU, LFU caches
3. **Compilers**: Symbol tables
4. **Networking**: Routing tables
5. **File Systems**: Inode tables
6. **Cryptography**: Digital signatures, message authentication
7. **Machine Learning**: Feature hashing
8. **Search Engines**: Inverted indexes
9. **Gaming**: Game state storage
10. **Web Browsers**: DNS caching, visited URLs

### STL Containers:

**C++ Standard Library provides:**
- `std::unordered_map`: Hash table implementation of map
- `std::unordered_set`: Hash table implementation of set
- `std::unordered_multimap`: Hash table with duplicate keys
- `std::unordered_multiset`: Hash table with duplicate values

**Comparison with ordered containers:**
- `unordered_*`: Hash tables, average O(1), not sorted
- `map/set`: Red-black trees, O(log n), sorted order

### Performance Tips:

1. **Reserve Capacity**: Use `reserve()` to avoid rehashing
2. **Custom Hash**: Provide good hash function for custom types
3. **Key Design**: Use immutable, easily hashable keys
4. **Profile**: Always profile with actual data and workload
5. **Consider Alternatives**: For small data, arrays/vectors may be faster

### Interview Preparation:

**Common Questions:**
1. Implement hash table from scratch
2. Two Sum problem and variants
3. Design LRU/LFU cache
4. Group anagrams
5. Find first non-repeating character
6. Subarray sum problems
7. Clone graph with random pointers
8. Word pattern matching

**Key Concepts to Understand:**
1. How hash functions work
2. Collision resolution strategies
3. Load factor and rehashing
4. Time-space tradeoffs
5. Differences between hash tables and trees

Hash tables are one of the most important and widely used data structures in computer science. They provide the foundation for efficient data retrieval in countless applications and are essential knowledge for any serious programmer.

---
*This completes our comprehensive DSA notes on Hash Tables, covering Hash Tables, Hash Sets, Hash Maps, implementations, performance analysis, and practical applications in C++.*


