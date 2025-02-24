import "./styles.css";
import { mergeSort } from "./mergeSort";

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

function buildTree(array) {
  let sortedArray = mergeSort(array);
  // remove duplicates - indexOf returns first index where value found
  let filteredSortedArray = sortedArray.filter(
    (value, index) => sortedArray.indexOf(value) === index,
  );
  let start = 0;
  let end = filteredSortedArray.length - 1;

  // base case for recursion
  if (start > end) return null;

  let middle = Math.floor((start + end) / 2);
  let root = new Node(filteredSortedArray[middle]);

  root.left = buildTree(filteredSortedArray.slice(0, middle));
  root.right = buildTree(filteredSortedArray.slice(middle + 1, end + 1));

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// function that inserts node with value in a Tree
function insert(value) {
  if (this.root === null) {
    this.root = new Node(value);
  } else {
    insertRecursive(this.root, value);
  }
}

function insertRecursive(node, value) {
  if (value < node.value) {
    if (node.left === null) {
      node.left = new Node(value);
    } else {
      insertRecursive(node.left, value);
    }
  } else if (value > node.value) {
    if (node.right === null) {
      node.right = new Node(value);
    } else {
      insertRecursive(node.right, value);
    }
  } else {
    console.log(`Value already exists in the tree`);
    return;
  }
}

// function that deletes node with value in a Tree
function deleteItem(value) {
  this.root = deleteNode(this.root, value);
}

function deleteNode(node, value) {
  if (node === null) {
    return null;
  }

  if (value < node.value) {
    node.left = deleteNode(node.left, value);
    return node;
  }

  if (value > node.value) {
    node.right = deleteNode(node.right, value);
    return node;
  }

  // if node with no children or 1 child
  if (node.left === null) {
    return node.right;
  } else if (node.right === null) {
    return node.left;
  }

  // if 2 children
  // findMin returns the minNode with minNode.left == null
  let minNode = findMin(node.right);
  node.value = minNode.value;
  node.right = deleteNode(node.right, minNode.value);

  return node;
}

// findMin returns the minNode with minNode.left == null
function findMin(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

// returns the node with the given value
function find(value) {
  if (this.root === null) {
    return null;
  }
  let foundNode = findNode(this.root, value);
  return foundNode.node;
}

function findNode(node, value, prevNode = null) {
  if (node === null) {
    console.log(`No more nodes`);
    return null;
  } else if (node.value === value) {
    return { prevNode, node };
  } else if (value < node.value) {
    prevNode = node;
    return findNode(node.left, value, prevNode);
  } else if (value > node.value) {
    prevNode = node;
    return findNode(node.right, value, prevNode);
  }
}

// returns tree items in level order for whatever callback function may want level-ordered items for
function levelOrder(callback) {
  if (typeof callback !== `function`) {
    throw new Error(`Callback function is required`);
  }
  if (this.root === null) return;
  let queue = [];
  queue.push(this.root);
  while (queue.length !== 0) {
    let current = queue.shift();
    callback(current);
    if (current.left !== null) {
      queue.push(current.left);
    }
    if (current.right !== null) {
      queue.push(current.right);
    }
  }
}

function inOrder(callback) {
  if (typeof callback !== `function`) {
    throw new Error(`Callback function is required`);
  }

  function traverse(node) {
    if (node === null) return;

    traverse(node.left);
    callback(node);
    traverse(node.right);
  }

  traverse(this.root);
}

function preOrder(callback) {
  if (typeof callback !== `function`) {
    throw new Error(`Callback function is required`);
  }

  function traverse(node) {
    if (node === null) return;

    callback(node);
    traverse(node.left);
    traverse(node.right);
  }

  traverse(this.root);
}

function postOrder(callback) {
  if (typeof callback !== `function`) {
    throw new Error(`Callback function is required`);
  }

  function traverse(node) {
    if (node === null) return;

    traverse(node.left);
    traverse(node.right);
    callback(node);
  }

  traverse(this.root);
}

// returns number of edges in the longest path from the node to a leaf node
// function height(node) {
//     let height;
//     if (node == null) {
//         return -1;
//     }

//     let leftHeight = this.height(node.left);
//     let rightHeight = this.height(node.right);

//     return 1 + Math.max(leftHeight, rightHeight)
// }

// returns the given node's depth from root node
function depth(node) {
  if (this.root === null) {
    return -1;
  }

  return findDepth(this.root, node, 0);
}

function findDepth(current, node, depthCount) {
  if (current === null) {
    return -1;
  }

  if (current === node) {
    return depthCount;
  }

  let leftDepth = findDepth(current.left, node, depthCount + 1);
  if (leftDepth !== -1) {
    return leftDepth;
  }

  return findDepth(current.right, node, depthCount + 1);
}

function isBalanced() {
  let root = this.root;
  return heightComparison(root) !== -1;
}

function heightComparison(node) {
  if (node === null) {
    return 0;
  }

  let leftHeight = heightComparison(node.left);
  if (leftHeight === -1) {
    return -1;
  }
  let rightHeight = heightComparison(node.right);
  if (rightHeight === -1) {
    return -1;
  }

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return -1;
  }

  if (node.left === null && node.right === null) {
    return 0;
  }

  return Math.max(leftHeight, rightHeight) + 1;
}

function rebalance() {
  if (this.isBalanced()) {
    console.log(`Tree already balanced`);
    return;
  }

  let nodesArray = [];
  this.inOrder(function (node) {
    nodesArray.push(node.value);
  });

  console.log(nodesArray);

  let rebalancedTree = new Tree(nodesArray);
  return rebalancedTree;
}

// prettyPrint takes the root and prints out the tree
// let node = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// prettyPrint(node.root);
Tree.prototype.insert = insert;
Tree.prototype.deleteItem = deleteItem;
Tree.prototype.find = find;
Tree.prototype.levelOrder = levelOrder;
Tree.prototype.inOrder = inOrder;
Tree.prototype.preOrder = preOrder;
Tree.prototype.postOrder = postOrder;
// Tree.prototype.height = height;
Tree.prototype.depth = depth;
Tree.prototype.isBalanced = isBalanced;
Tree.prototype.rebalance = rebalance;
// let node2 = node;
// node2.insert(325);
// node2.deleteItem(8)
// // console.log(node2.find(6345));
// prettyPrint(node2.root);

// node2.levelOrder(function(node) {
//     console.log(node.value)
// })
// node2.inOrder(function(node) {
//     console.log(node.value)
// })
// node2.preOrder(function(node) {
//     console.log(node.value)
// })
// node2.postOrder(function(node) {
//     console.log(node.value)
// })

// console.log(node.height(node.root))

// console.log(node2.depth(node2.find(6345)))

// console.log(node2.isBalanced())
// console.log(node2)
// let rebalancedTree = node2.rebalance();
// prettyPrint(rebalancedTree.root);
// console.log(rebalancedTree.isBalanced())

// TIE IT ALL TOGETHER / DRIVER SCRIPT
// generate random number < 100
function getRandomNumbers(length) {
  let randomNumbers = [];

  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * 101); // since Math.random is NOT inclusive of 1
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

let driverArray = getRandomNumbers(30);
let driverTree = new Tree(driverArray);
prettyPrint(driverTree.root);
console.log(driverTree.isBalanced());

// driverTree.levelOrder(function(node) {
//     console.log(node.value)
// })

// driverTree.preOrder(function(node) {
//     console.log(node.value)
// })

// driverTree.postOrder(function(node) {
//     console.log(node.value)
// })

// driverTree.inOrder(function(node) {
//     console.log(node.value)
// })

driverTree.insert(1033);
driverTree.insert(150);
driverTree.insert(483);

console.log(driverTree.isBalanced());

prettyPrint(driverTree.root);

let rebalancedTree = driverTree.rebalance();
console.log(rebalancedTree.isBalanced());

prettyPrint(rebalancedTree.root);

// rebalancedTree.levelOrder(function(node) {
//     console.log(node.value)
// })

// rebalancedTree.preOrder(function(node) {
//     console.log(node.value)
// })

// rebalancedTree.postOrder(function(node) {
//     console.log(node.value)
// })

// rebalancedTree.inOrder(function(node) {
//     console.log(node.value)
// })
