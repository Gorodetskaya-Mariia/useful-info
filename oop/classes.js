// function Circle(){
// 	this.radius = radius;
// 	this.draw = function(){
// 		console.log('draw');
// 	}
// }

//rewrite it into class
class Circle {
  //we use constructor to initialize objects
  constructor(radius) {
    this.radius = radius;
    this.move = function() {
      console.log("move");
    };
  }
  //we initialize methods in body
  //Instance method. It is available in the instance which is a object
  draw() {
    console.log("draw");
  }
  //Static method is available in the class itself not in object instance
  //we use it for creating utility functions which is not type of particular object like Math.round()... Static method takes input and return something
  static parse(str) {
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
}

// const c = new Circle(1);
const c = new Circle('{"radius": 1}');
//static method is available like this
// c.parse();
//Classes are not hoisted

//Class Declaration
class Circle1 {}
//Class Expression
const Square = class {};
//to implement abstraction we use private properties and methods
//creation private methods or properties (_radius) by using Symbol()
// const _radius = Symbol();
// const _draw = Symbol();

// class Circle2 {
// 	constructor(radius){
// 		this[_radius] = radius;
// 	}

// 	[_draw](){

// 	}
// }
// const t = new Circle2(1);
//we use WeakMap to implement private properties and methods in an object
// const _radius = new WeakMap();
// const _move = new WeakMap();

// class Circle3 {
//   constructor(radius) {
//     _radius.set(this, radius);

//     _move.set(this, () => {
//       console.log("move", this);
//     });
//   }

//   draw() {
//     _move.get(this)();
//     console.log("draw");
//   }
// }

// const r = new Circle3(2);

//implementing getters and setters
const _radius = new WeakMap();

class Circle4{
	constructor(radius){
		_radius.set(this, radius);
	}

	get radius(){
		return _radius.get(this);
	}

	set radius(value){
		if(value <= 0) throw new Error('Invalid radius')
		_radius.set(this, value);
	}
}

const d = new Circle4(3);

//Inheritance
class Shape {
	constructor(color){
		this.color = color;
	}

	move(){
		console.log('move');
	}
}

class Circle5 extends Shape{
	constructor(color, radius){
		//we should call super() function with parameters to initialize the base object(Shape)
		super(color);
		this.radius = radius;
	}

	draw(){
		console.log('draw');
	}
}

const u = new Circle5('red', 7);

//method overwriting
//we want to have another implementation of move method
class Shape1 {
	move(){
		console.log('move');
	}
}

class Circle6 extends Shape1 {
	move(){
		super.move();//to access move method from Shape
		console.log('circle move');
	}
}

const o = new Circle6();