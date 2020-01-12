const _array = new WeakMap();

class Stack {
	constructor() {
		_array.set(this, []);
	}

	peek(){
		const array = _array.get(this);

		if(array.length){
			return array[array.length - 1];
		} else {
			throw new Error('Stack is empty');
		}		
	}

	pop(){
		const array = _array.get(this);

		if(array.length){
			return array.pop();
		} else {
			throw new Error('Stack is empty');
		}
	}

	push(value){
		_array.get(this).push(value);
	}

	get count(){
		return _array.get(this).length;
	}	
}

const stack = new Stack();