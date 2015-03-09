var END_TOKEN = '_end';
var Trie = function() {
  this.root = new TrieNode();

}

Trie.prototype.insert = function(toInsert, value) {
  if(!toInsert)
    return;

  var curNode = this.root;
  for(var i = 0; i < toInsert.length; i++) {
    if(!curNode.children[toInsert[i]]) {
      curNode.children[toInsert[i]] = new TrieNode();
    }
    curNode = curNode.children[toInsert[i]];
  }

  curNode.children[END_TOKEN] = value;
}


Trie.prototype.remove = function(toRemove) {
  var node = this._findNode(toRemove);
  if(!node)
    return;

  // this removes the node from the tree.
  delete node.children[END_TOKEN];

  // note that just deleting _end doesn't help 
  // reduce tree size.  we should clean up empty
  // branches.

  while(toRemove) {

    if(Object.keys(node.children).length !== 0) {
      return;
    }

    // get the last character
    var charToRemove = toRemove[toRemove.length-1];
    // get the string without the last character
    toRemove = toRemove.slice(0, toRemove.length - 1);
    // find the parent node
    node = this._findNode(toRemove);
    // remove the character from the parent node's children
    delete node.children[charToRemove];
  }
}

Trie.prototype.find = function(toFind) {
  var node = this._findNode(toFind);
  if(!node)
    return;

  return node.children[END_TOKEN];
}

Trie.prototype._findNode = function(toFind) {
  if(!toFind)
    return this.root;
  var curNode = this.root;
  for(var i = 0; i < toFind.length; i++) {
    if(!curNode.children[toFind[i]])
      return;
    curNode = curNode.children[toFind[i]] 
  }
  return curNode;
}

var TrieNode = function() {
  this.children = {}
}

module.exports = Trie;