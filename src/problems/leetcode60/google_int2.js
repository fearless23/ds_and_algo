//fdffsdf

'abcdefg'


Internal<len=7>
.     ->left : Leaf<len=3>:'abc'
.     ->right: Internal<len=4>
.         ->left : Leaf<len=1>:'d'
.         ->right: Leaf<len=3>:'efg'



.                      Internal<len=7>
.                     /               \
.                  left               right
.                   /                   \
.   Leaf<len=3, data='abc'>            Internal<len=4>
.                                     /               \
.                                   left              right
.                                   /                   \
.                       Leaf<len=1, data='d'>          Leaf<len=3, data='efg'>
// abcdefg


.       7-5
.      / \
  'abc'  4-2
.        / \
.      'd'  efg-'g'


      7
     / \
    3   'defg'
   / \
 'a' 'bc' 

// input = tree at 7, index=3
// output = 'd'
class Node {
  constructor(length, left, right, str){
    if(str) // LeafNode
    if(length) // InternalNode
  }
}

class InternalNode extends Node{
  constructor(length, left, right){
    this.length = length;
    this.left = left;
    this.right = right;
  }
}

class LeafNode {
  constructor(str){
    this.val = str;
    this.length = str.length;
  }
}


// tree --> if it is a string (go to given index)
// if left and right 
// if left = 4   --> check if index lies within 0,4
// if left = str  --> str.length or check right
// right = InternalNode 4  ->  3 -- end are in right node

const find_char = (tree, index) => {
  const is_internal = instanceOf tree === InternalNode;
  
  if(is_internal){
      // if both internal nodes --> 
      // index = 3; l = 4
      const left_length = tree && tree.left.length >= index + 1; // go left
      if(go_left) {
        return find_char(tree.left, index)
      }
      else {
        return find_char(tree.right, index - tree.left.length)
      }
    }
  }
  else return tree.val[index]
}

// node, index, length

// 7, 2 , 2  --> cd

const find_substring = (tree, index, length) => {
  const is_internal = instanceOf tree === InternalNode;
  
  if(is_internal){
      // index = 3 , length = 2
      // indices = (3,4)
      // all in left
      // all in right
      // join left + right
      const last_index = index + length;
      
      const all_left = tree.left.length >= index + length;
      const all_right = tree.left.length <= index;
    
      if(all_left) {
        return find_substring(tree.left, index, length)
      }
      else if(all_right) {
        return find_substring(tree.right, index - tree.left.length, length)
      }
      else{
        // left = 4
        // index = 3 , length = 3
        // indices = (3,4, 5)
        const left_length = tree.left.length - index;
        const right_length = length - left_length
        return find_substring(tree.left, index, left_length) + find_substring(tree.right, 0, right_length)
      }
    }
  }
  else return tree.val.slice(index, index+length)
}


const delete_substring = (tree, index, length) => {
  tree.length = tree.length - length;
  const is_internal = instanceOf tree === InternalNode;
  
  if(is_internal){
      // index = 3 , length = 2
      // indices = (3,4)
      // all in left
      // all in right
      // join left + right
      const last_index = index + length;
      
      const all_left = tree.left.length >= index + length;
      const all_right = tree.left.length <= index;
    
      if(all_left) {
        // tree.left.length === length
        // tree.left = null;
        delete_substring(tree.left, index, length)
      }
      else if(all_right) {
        delete_substring(tree.right, index - tree.left.length, length)
      }
      else{
        // left = 4
        // index = 3 , length = 3
        // indices = (3,4, 5)
        const left_length = tree.left.length - index;
        const right_length = length - left_length
        delete_substring(tree.left, index, left_length) + delete_substring(tree.right, 0, right_length)
      }
    }
  }
  else {
    tree.val = helper(tree.val, index, length);
  }
}

const helper = (str, index, length) => {
   // abcdefg
   return str.slice(0,index) + str.slice(index+length)
}

      7
     / \
    3   'defg'
   / \
 'a' '' 



      5
     / \
  'a'   'defg'