class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BST{
    constructor(array){
        this.root = this.buildTree(array);
    }
    buildTree(arr){
        let sortedArr = [...new Set(arr)].sort((a,b) => a-b);
        console.log(sortedArr);

        function balancedBST(leftIndex, rightIndex){
            if(leftIndex > rightIndex) return null;

            let midIndex = Math.floor((leftIndex + rightIndex)/2);
            let root = new Node(sortedArr[midIndex]);
            root.left = balancedBST(leftIndex, midIndex-1);
            root.right = balancedBST(midIndex+1, rightIndex);
            return root;
        }
        return balancedBST(0, sortedArr.length-1);
    }
    prettyPrint(node, prefix = "", isLeft = true){
        if (!node) {
          return;
        }
        if (node.right) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    insert(val){
        let temp = this.root;

        while(true){
            if(val < temp.value){
                if(temp.left){
                    temp = temp.left;
                } else {
                    temp.left = new Node(val);
                    return this.root;
                }
            }
            if(val > temp.value){
                if(temp.right){
                    temp = temp.right;
                }else {
                    temp.right = new Node(val);
                    return this.root;
                }
            }
            if(val === temp.value){
                return false;
            }
        }
    }
    deleteNode(node, key){
        if(node === null) return node;
        if(key < node.value){
            node.left = this.deleteNode(node.left, key);
        } else if(key > node.value){
            node.right = this.deleteNode(node.right, key)
        } else {
            if(!node.left && !node.right) {
                return null;
            } if(!node.left) {
                return node.right;
            } else if(!node.right) {
                return node.left;
            } 
            node.value = this.minNode(node.right);
            node.right = this.deleteNode(node.right, node.value);
        } 
        return node;
    }
    find(val){
        let queue = [];
        queue.push(this.root);

        while(queue.length){
            let result = queue.pop();
            if(val === result.value) return result;
            if(result.left) queue.unshift(result.left);
            if(result.right) queue.unshift(result.right);
        }
        return false;
    }
    minNode(node){
        let temp = node;
        if(!node) return null;
        while(temp){
            if(temp.left){
                temp = temp.left;
            } else return temp.value; 
        }
    }
    levelOrder(){
        let result = [];
        let queue = [];
        queue.push(this.root);

        while(queue.length){
            let temp = queue.pop();
            result.push(temp.value);
            if(temp.left) queue.unshift(temp.left);
            if(temp.right) queue.unshift(temp.right);
        }
        return result;
    }
    DFSInOrder(){
        let result = [];
    
        function traverse(node){
            if(node.left) traverse(node.left);
            result.push(node.value);
            if(node.right) traverse(node.right);
        }
        traverse(this.root);
        return result;
    }
    DFSPostOrder(){
        let result = [];
    
        function traverse(node){
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
            result.push(node.value);
        }
        traverse(this.root);
        return result;
    }
    DFSPreOrder(){
        let result = [];
    
        function traverse(node){
            result.push(node.value);
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
        }
        traverse(this.root);
        return result;
    }
    height(node){
        let result = [];
        let queue = [];
        queue.push(node);

        while(queue.length){
            let vals = [];
            let length = queue.length;

            for(let i = 0; i < length; i++){
                let temp = queue.pop();
                vals.push(temp.value);
                if(temp.left) queue.unshift(temp.left);
                if(temp.right) queue.unshift(temp.right);
            }
            result.push(vals);
        }
        return result.length;
    }
    depth(node){
        let depth = 0;
        function traverse(treeNode){
            if(treeNode.value === node.value){
                return depth;
            }
            if(node.value > treeNode.value) {
                depth++;
                return traverse(treeNode.right);
            } else if(node.value < treeNode.value){
                depth++;
                return traverse(treeNode.left);
            }
        }
        return traverse(this.root);
    }
    isBalanced(){
        let result = Math.abs(this.height(this.root.left) - this.height(this.root.right));
        return result > 1 ? false : true;
    }
    rebalance(){
        if(this.isBalanced()) return this.root;
        let newTree = this.DFSInOrder();
        this.root = this.buildTree(newTree);
        return this.root;
    }
    
}

let myTree = new BST([7, 4, 23, 3, 5, 7, 9, 67, 6345, 324]);
console.log(myTree.insert(1120));
console.log(myTree.find(67));
console.log(myTree.find(1));
console.log(myTree.prettyPrint(myTree.root));
console.log(myTree.levelOrder());
console.log(myTree.DFSInOrder());
console.log(myTree.DFSPostOrder());
console.log(myTree.DFSPreOrder());
console.log(myTree.isBalanced());
console.log(myTree.height(myTree.root));
console.log(myTree.depth(myTree.find(4)));
console.log(myTree.isBalanced());
console.log(myTree.minNode(myTree.root));
console.log(myTree.deleteNode(myTree.root, 9));
myTree.prettyPrint(myTree.root);
console.log(myTree.insert(1120));
console.log(myTree.insert(2120));
console.log(myTree.insert(3120));
console.log(myTree.insert(4120));
myTree.prettyPrint(myTree.root);
console.log(myTree.isBalanced());
console.log(myTree.rebalance());
myTree.prettyPrint(myTree.root);
