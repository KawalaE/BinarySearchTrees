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
}

let myTree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(myTree);
