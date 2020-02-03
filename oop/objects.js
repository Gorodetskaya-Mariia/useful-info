//1.object literal syntax
const circle = {
	radius: 1,
	location: {
		x: 1,
		y: 2
	},
	draw: function(){
		console.log('draw');
	}
};

circle.draw();
//properties: radius and location. they are used to hold values
//methods: draw. It is used to define some logic

//2. Factory function
function createCirce(radius){
	return {
		radius,
		draw: function(){
			console.log('draw');
		}
	}
}

const circle1 = createCirce(1);
circle1.draw();

//3. Constructor function
function Circle(radius){
	this.radius = radius;
	//defaultLocation and computedOptimumLocation are available only here
	//it is abstraction
	let defaultLocation = { x: 0, y: 0 };
	let computedOptimumLocation = function(){
		//...
	}
	this.draw = function(){
		computedOptimumLocation();
		console.log('draw');
	}
}
const circle2 = new Circle(2);
//new operator
// 1) creates a new empty Object
// 2) sets this to the Object
// 3) return Object with properties and methods. We do not write return

//adding properties
circle.location = { x: 1 };
circle['location'] = { y: 2 };
const propertyName = 'center-location';
circle[propertyName] = { x:2 };

//deleting properties
delete circle.location;
delete circle['location'];

//getter is a function which is used to read a property
function Circle(radius){
	this.radius = radius;

	let defaultLocation = { x: 0, y: 0 };
	
	this.draw = function(){
		console.log('draw');
	}

	//getter
	Object.defineProperty(this, 'defaultLocation',{
		get: function(){
			return defaultLocation;
		},
		//setter
		set: function(value){
			//benefit of setter is we can add validation:
			if(!value.x || !value.y) throw new Error('Invalid location')
			defaultLocation = value;
		}
	});
}

// circle2.defaultLocation = 1;

//Stop watch
function StopWatch(){
	let duration = 0;
	let running = false;
	let startTime = 0;

	this.start = function(){
		if(running){
			throw new Error("Stop watch has been started")
		} else {
			duration = 0;
			startTime = new Date();
			running = true;
		}
	}

	this.stop = function(){
		if(!running){
			throw new Error("Stop watch has not been started")
		} else {
			duration = (new Date() - startTime)/1000;
			running = false;
		}		 
	}

	this.reset = function(){
		duration = 0;
		startTime = 0;
		running = false;
	}

	Object.defineProperty(this, 'duration',{
		get: function(){
			return duration;
		}
	});
}

const sw = new StopWatch();

//iteration
function Circle3(radius){
	//instance members
	this.radius = radius;

	this.move = function(){
		console.log('move');
	}	
}

const c1 = new Circle3(2);
//prototype members
Circle3.prototype.draw = function(){
	console.log('draw');
}
//returns instance members
console.log(Object.keys(c1)); //radius,move
//return all members instance + prototype
for(let item in c1){
	console.log(item);//radius,move,draw
}

//prototypical inheritance
function Shape(color){
	this.color = color;
}

Shape.prototype.duplicate = function() {
	console.log('duplicate');
}

function Circle6(radius, color){
	//if we want to add color as a property to Circle6 we should:
	Shape.call(this, color);
	this.radius = radius;	
}
//now Shape is a parent for Circle
Circle6.prototype = Object.create(Shape.prototype);
//if we reset a prototype make sure to reset a constructor
Circle6.prototype.constructor = Circle6;
const s = new Shape();
const c = new Circle6(5,'red');

//if I want to rewrite duplicate method I should
Circle6.prototype.duplicate = function(){
	console.log('duplicate circle');
} 
//Polymorphism
function Square(){

}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.duplicate = function(){
	console.log('duplicate square');
}

const shapes = [
	new Circle6(),
	new Square()
]
//each object will provide different implementations of duplicate method
for(let shape of shapes){
	shape.duplicate();
}

//----------------
//Mixins
function mixin(target, ...sources){
	Object.assign(target, ...sources);
}

const canEat = {
	eat: function(){
		this.hunger--;
		console.log('eating');
	}
};

const canWalk = {
	walk: function(){
		console.log('walking');
	}
};

const canSwim = {
	swim: function(){
		console.log('swim');
	}
}
//we compose two objects to another to create a new instance
function Person(){

}
mixin(Person.prototype, canEat, canWalk);
const person = new Person();
console.log(person);

function Goldfish(){

}
mixin(Goldfish.prototype,canEat, canSwim);
const goldfish = new Goldfish();
console.log(goldfish);
//---------------------------------------
//cloning of objects
const user = {
	name: "John",
	age: 23
}
const clone = {};
//1
for(let key in user){
	clone[key] = user[key];
}
//2
const clone = Object.assign({}, user);
//for deep cloning use _.cloneDeep(obj) from lodash
const data = [
	{name: "M", age: 20},
	{name: "F", age: 25},
	{name: "M", age: 20},
	{name: "F", age: 25},
	{name: "F", age: 21},
	{name: "M", age: 23}
];


function normalizeData(obj,propertyBySort,anotherProperty){
	let newObj = {};

	obj.forEach(item=>{
		if(!newObj[item[propertyBySort]]){
			newObj[item[propertyBySort]] = [];
		}
		newObj[item[propertyBySort]].push(item[anotherProperty])
	});

	return newObj;
}
//А потом напиши ф-ю которая выдаст средний возраст по полю "name"
function range(array){
	return array.reduce((sum, item)=>{
		return sum + item;
	},0)/ array.length;
}
const newData = normalizeData(data,"name","age");
range(newData["M"]);

// 1. Cat constructor, requiring arguments for name and weight
// 2. Throw an error if name or weight not specified when invoking the constructor.
// 3. Cat.averageWeight() method should give the average weight of all cat instances created with Cat, even after if the instance's properties have changed.
// 4. Must use Object.defineProperty
var Cat = (function (name, weight) {
  let cats = [];
  function Cat(name, weight){
    if(!name && !weight) throw new Error("enter values");
    Object.defineProperty(this, 'name', {
      get: function () { return name }
    });

     Object.defineProperty(this, 'weight', {
      get: function () { return weight },
      set: function (x) { weight = x; return weight }
    });
    cats.push(this);  
	};
	
  Cat.averageWeight = function(){
    return cats.reduce(function (sum, cat) { return sum + cat.weight }, 0) / cats.length;
  }
  
  return Cat;
}());

fluffy = new Cat('fluffy', 15);

// New
// So what about new? Well, the unary operator new is intended to create "instances" of a constructor function. To be more precise, the operation new Constructor(arg1, arg2, ...argX) does the following:

//1 Creates an empty object (which we'll call instance) which prototypally inherits from Constructor.prototype
//2 Binds Constructor to instance (meaning this is instance) and invokes Constructor with any arguments passed in
//3 If the return value of Constructor is an object (including arrays, functions, dates, regexes, etc.) the operation evaluates to that object
//4 Otherwise, the operation evaluates to instance
//TODO
// Write a function nouveau (that's French for "new") which takes one function parameter (the constructor), plus an unknown number of additional parameters of any type (arguments for the constructor). When invoked, nouveau should do everything new does and return the same object new would evaluate to, as specified above.
function nouveau (Constructor, ...args) {
  const instance = Object.create(Constructor.prototype);//1
  const result = Constructor.apply(instance, args);//2
  return result === Object(result) ? result : instance;//3,4
function Person (name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  return 'Hi, I am ' + this.name;
};

var guy = nouveau(Person, 'Guy');
guy.name;// 'Guy'
guy.sayHi();//'Hi, I am Guy'