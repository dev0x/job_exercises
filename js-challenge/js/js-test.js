// Instructions
// ------------
//  1. Put your code in this document in the places marked by "verb me!".
//  2. The questions can be answered in about 5 or 10 lines of 
//     code; no solution should be over 20 lines.
//  3. Explanations should be 1 to 3 sentences.
//  4. Place any explanations inside comments.
//  5. Use clear variable names.
//  6. Test your code.  It will be eyeballed and tested.
//  7. Your code doesn't need to be robust; leave out try-catch blocks
//     and validation code.  Just solve the problem cleanly.
//  8. Feel free to use any available resources.
//  9. It's ok if you don't answer everything.  Just explain what
//     you know and where you're stuck.  Don't provide broken code.


// QUESTION 1
// Implement this function:
// filterValuesByKeys() takes in an object of key/value pairs and
// a filter function that accepts one argument and returns a Boolean.
//
// It returns an array containing the *values* from the object for
// which filter(*key*) is true.  The array is in no particular order.
// You do not need to validate anything.

function filterValuesByKeys( obj, filter ) {  // returns array
	var arraykeys = [];
		if(filter(key)){
			arraykeys.push(obj[key]);
		}
	return arraykeys;
}

function filter(key){
	var found = false;
	for(needle in keyValues){
		if(needle == key)
			found = true;
		}
	return found;

}


// QUESTION 2
// Implement and explain this function:
// buildBoundsDetector() takes numeric upper and lower bounds
// and returns a function that accepts a single numeric argument
// and returns true if the argument is inside the bounds and
// false if it is outside.  In other words, it could be used like this:
//     var isPercentage = buildBoundsDetector( 0, 100 );
//     if ( isPercentage(4) ) { ...
//
// Use <= and >= for the comparisions.
//
// Explain why this works.

function buildBoundDetector( lowerBound, upperBound ) {  // returns function
  return function(inVal){
	  if(lowerBound <= inVal && upperBound >= inVal){
		  return true;
	  } else {
		  return false;
	  }
  }
}
  // explain me!
  // This works because of Currying. 
  // A function takes multiple arguments, but can be called with a single argument.
  // It provides a convenience and sometimes might cause confusion for others 
  //   not familiar with functional design patterns.




// QUESTION 3
// This function should create a 2 dimension array pre-populated
// with zeros.  The output appears correct, but it has a bug.
// Explain what's wrong and fix it.

function defaultMatrix( size ) {  // returns array
	if(isNaN(size))
	  size = 1;
	var defaultValue = 0;
	var row = [];
	var matrix = [];
	for ( var i=0; i < 2; i++) { row.push( defaultValue ); } //loop twice, not size
	for ( var i=0; i < size; i++) { matrix.push( row ); }
	
	return matrix;
}
//What's wrong: Directions say create a 2 dimensional array.  With the 2 dimensional array 
//  requirement, going for a array length 1 returns 0  where it should be 0 0.  
//The previous code was making a full matrix, and not a two dimensional array with a
//  specified length.




// QUESTION 4
// ( Because JavaScript object-oriented terminology
// is not standardized, I'll define my terms. If
// the concepts are unfamiliar, you may want to skip
// this question.)
//
// Definitions: A "constructor" is a
// function designed to be called with the "new"
// operator.  A "class" is a "constructor" with
// functions defined on its prototype, and these
// functions are refered to as "methods".  A
// constructor is said to build an "instance" of
// the class. A "sub-class" is a class with prototype
// that is an instance of another class.
//
// We have the following class definition:
function Bird( speciesName, isMale, daysSinceBirth ) {
	this.speciesName = speciesName || 'unknown';
	this.daysSinceBirth = Number(daysSinceBirth) || 0;
	this.isMale = Boolean( isMale );
}
Bird.prototype.call = function() {
	alert( 'twitter!' );
	return this;
}
Bird.prototype.fly = function() {
	alert( 'flap!' );
	return this;
}
Bird.prototype.panic = function() {
	this.call().call().fly().fly();
}

Duck.prototype = new Bird;
Duck.prototype.constructor = Duck;
function Duck(isMale, daysSinceBirth){
	Bird.call(this, isMale, daysSinceBirth);
	this.speciesName = 'duck';

}
Duck.prototype.call = function(){
	alert( 'quack!' );
	return this;
}



// QUESTION 5 
// This block of code exhibits some interesting features:
if ( typeof test == 'undefined' ) { test = {}; }
	test.workbench = test.workbench || {};
	test.workbench.application = (function() {
    // private
    var currentId = 0;
    var idPrefix = 'test-workbench-application';

    // public
    function getNextId() {
        currentId++;
        return ( idPrefix + currentId );
    }

    return {
        getNextId: getNextId
    }

})();
//No need for code, just answer these questions:
//	1. What's the purpose of the first three lines?
//	2. What does (function() {...})(); do, and why is it important?
//	3. What makes currentId "private" while getNextId() is "public?"
//(Answers on the html page)

// QUESTION 6
// Write a function that accepts a HTML DOM Document object (which has the
// 		same functionality of the global "document" object) and runs all
// 		the script tags in the document.
function runScripts( doc ) {
  //get script
  var scriptElements = doc.getElementsByTagName('script');
  for (var i = 0; i < scriptElements.length; i++){
	if(scriptElements[i].type == 'text/javascript') //check
		eval(scriptElements[i].innerHTML); //eval it!
  }
}
