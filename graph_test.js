class Node {
    constructor(data) {
        this.data = data;
        this.relative = [];
        this.isMarked = false;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
    }
    initMark() {
        for (let node of this.nodes) {
            node.isMarked = false; 
        }
    }
    // console.log('test');
    addEdge(node1, node2) {
        if (this.nodes.indexOf(node1) < 0) {
            this.nodes.push(node1);
        }
        if (this.nodes.indexOf(node2) < 0) {
            this.nodes.push(node2);
        }
        if (node1.relative.indexOf(node2) < 0) {
            node1.relative.push(node2);
        }
        if (node2.relative.indexOf(node1) < 0) {
            node2.relative.push(node1);
        }
    }
    dfs(node) {
        if (this.nodes.indexOf(node) < 0) {
            return null;
        }
        this.initMark();
        const stack = [node];
        const result = [];
        node.isMarked = true;
        while (stack.length > 0) {
            const root = stack.pop();
            for (let n of root.relative) {
                if (!n.isMarked) {
                    n.isMarked = true;
                    stack.push(n);
                }
            }
            result.push(root);
        }
        return result;
    }
    // 재귀호출 버전
    dfsR(node) {
        if (this.nodes.indexOf(node) < 0) {
            return null;
        }
        this.initMark();
        return this.__dfsR__(node);
    }
    __dfsR__(node) {
        const result = [];
        node.isMarked = true;
        result.push(node);
        for (let n of node.relative) {
            if (!n.isMarked) {
                result.push(...this.__dfsR__(n));
            }
        }
        return result;
    }
    bfs(node) {
        if (this.nodes.indexOf(node) < 0) {
            return null;
        }
        this.initMark();
        const queue = [node];
        const result = [];
        node.isMarked = true;
        while (queue.length > 0) {
            const root = queue.shift();
            for (let n of root.relative) {
                if (!n.isMarked) {
                    n.isMarked = true;
                    queue.push(n);
                }
            }
            result.push(root);
        }
        return result;
    }
    removeNode(node) {
        if (this.nodes.indexOf(node) < 0) {
            return;
        }
        for (let n of node.relative) {
            const index = n.relative.indexOf(node);
            n.relative.splice(index, 1);
        }
        node.relative = [];
    }
    serch(start, end) {
        if (this.nodes.indexOf(start) < 0 || this.nodes.indexOf(end) < 0) {
            return false;
        }
        this.initMark();
        const queue = [start];
        start.isMarked = true;
        while (queue.length > 0) {
            const root = queue.shift();
            if (root === end) {
                return true;
            }
            for (let n of root.relative) {
                if (!n.isMarked) {
                    n.isMarked = true;
                    queue.push(n);
                }
            }
        }
        return false;
    }
}

/*
    0
    | 
    1 - 3    7
    | / | \ /
    2 - 4  5 - 6 - 8
*/
const g = new Graph();
const [n0, n1, n2, n3, n4, n5, n6, n7, n8] = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(d => new Node(d));
g.addEdge(n0, n1);
g.addEdge(n1, n2);
g.addEdge(n1, n3);
g.addEdge(n2, n4);
g.addEdge(n2, n3);
g.addEdge(n3, n4);
g.addEdge(n3, n5);
g.addEdge(n5, n6);
g.addEdge(n5, n7);
g.addEdge(n6, n8);
// DFS(0) - 013576842
console.log('dfs(n0) - ', g.dfs(n0).map(n => n.data).join(', '));
// DFSR(0) - 012435687
console.log('dfsR(n0) - ', g.dfsR(n0).map(n => n.data).join(', '));
// BFS(0) - 012345678
console.log('bfs(n0) - ', g.bfs(n0).map(n => n.data).join(', '));
// 연결확인
console.log('serch(n0, n5) - ', g.serch(n0, n5));
// node제거
g.removeNode(n2);
console.log('removeNode(n2) - ', g.serch(n0, n5));
// node제거
g.removeNode(n3);
console.log('removeNode(n3) - ', g.serch(n0, n5));