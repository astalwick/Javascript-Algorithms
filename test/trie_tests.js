var chai = require('chai')
var should = chai.should();

var Trie = require('../trees/trie')
 
chai.config.includeStack = true;
 
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

describe("Trie", function() {
  describe("Trie Basics", function() {
    var trie = new Trie();
    beforeEach(function(){
      trie = new Trie();
    })

    // simple structure validation.
    it("should insert a string", function() {
      trie.insert('ab', 'test-value');
      trie.root.should.be.a('object');
      trie.root.should.have.property('children');
      trie.root.children.should.have.property('a');
      var a = trie.root.children['a'];
      a.should.be.an('object');
      a.should.have.property('children');
      a.children.should.have.property('b');
      var b = a.children['b'];
      b.should.be.an('object');
      b.should.have.property('children');
      b.children.should.have.property('_end');      
      b.children._end.should.equal('test-value');
    })

    // simple structure validation.
    it("should remove a string", function() {
      trie.insert('ab', 'test-value');
      trie.root.should.be.a('object');
      trie.root.should.have.property('children');
      trie.root.children.should.have.property('a');
      var a = trie.root.children['a'];
      a.should.be.an('object');
      a.should.have.property('children');
      a.children.should.have.property('b');
      var b = a.children['b'];
      b.should.be.an('object');
      b.should.have.property('children');
      b.children.should.have.property('_end');      
      b.children._end.should.equal('test-value');

      trie.remove('ab');
      trie.root.should.be.a('object');
      trie.root.should.have.property('children');
      trie.root.children.should.not.have.property('a');
    })    

    it('should survive inserting empty string', function() {
      trie.insert('', 'value');
    })
    it('should survive inserting undefined string', function() {
      trie.insert(undefined, 'value')
    })
    it('should survive inserting undefined value', function() {
      trie.insert('a', undefined)
    })


    it('should survive removing empty string', function() {
      trie.remove('');
    })

    it('should survive removing undefined string', function() {
      trie.remove(undefined);
    })

    it('should survive removing non-existant string', function() {
      trie.remove('werwerwerasdfasdf')
    })

    it('should find inserted word', function() {
      trie.insert('asdf_end', 'test-value')
      var x = trie.find('asdf_end');
      should.exist(x);

      x.should.equal('test-value');
    })

    it('should not find missing word', function() {
      trie.insert('wer', 'test-value1')
      trie.insert('sdf', 'test-value2')
      trie.insert('xcv', 'test-value3')
      trie.insert('qwe', 'test-value4')
      var asd = trie.find('asd');
      should.not.exist(asd);
      var wer = trie.find('wer');
      should.exist(wer)
      wer.should.equal('test-value1')
      var sdf = trie.find('sdf');
      should.exist(sdf)
      sdf.should.equal('test-value2')
      var xcv = trie.find('xcv');
      should.exist(xcv)
      xcv.should.equal('test-value3')
      var qwe = trie.find('qwe');
      should.exist(qwe)
      qwe.should.equal('test-value4')
    })

    it('should find both words with common prefix', function() {
      trie.insert('arlen rules', 'yes');
      trie.insert('arlen is the best', 'of course!');
      var doesArlenRule = trie.find('arlen rules');
      var isArlenTheBest = trie.find('arlen is the best');

      should.exist(doesArlenRule);
      doesArlenRule.should.equal('yes');
      should.exist(isArlenTheBest);
      isArlenTheBest.should.equal('of course!');

      should.not.exist(trie.find('arlen'))
    })

    it('should not find a word that has been removed and still find other similiarly prefixed strings', function() {
      trie.insert('arlen rules', 'yes');
      trie.insert('arlen is the best', 'of course!');
      var doesArlenRule = trie.find('arlen rules');
      var isArlenTheBest = trie.find('arlen is the best');

      should.exist(doesArlenRule);
      doesArlenRule.should.equal('yes');
      should.exist(isArlenTheBest);
      isArlenTheBest.should.equal('of course!');

      trie.remove('arlen rules');

      var doesArlenRule = trie.find('arlen rules');
      should.not.exist(doesArlenRule);

      var isArlenTheBest = trie.find('arlen is the best');
      should.exist(isArlenTheBest);
      isArlenTheBest.should.equal('of course!');
    })    
  })
})