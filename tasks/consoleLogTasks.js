var a=1;

obj = {
	a: 2,
	b: ()=> console.log(this.a),
	c: function(){
		console.log(this.a);
	},
	d: function () {this.b()}
}
obj.b()//1
obj.c()//2
//---------------------------------------------------------------------
function foo(){
	console.log(baz);
	console.log(bar);
	var baz = "baz";
	let bar = "bar";
}
foo();
//baz=undefined
//Cannot access 'bar' before initialization
//---------------------------------------------------------------------
new Promise((resolve, reject)=> resolve())
.then(()=>{
	console.log("1 then");
	throw "Oh error"})
.catch(console.log("new error"))
.catch(console.log("error 2"))
.then(console.log("2 then"))
// new error
// error 2
// 2 then
// 1 then

// без throw “Oh error” в первом then
new Promise((resolve, reject)=> resolve())
.then(console.log("1 then"))
.catch(console.log("new error"))
.catch(console.log("error 2"))
.then(console.log("2 then"))
// 1 then
// new error
// error 2
// 2 then
//----------------------------------------------------------------------
const animal = "snake";
const someMake = function(){
	let animal = "cat";
	function shout(){
		animal = "dog";
		console.log("1",animal);	
	}
	return shout;
}
const shout = someMake();
shout(); //1 dog
console.log(animal);//snake
