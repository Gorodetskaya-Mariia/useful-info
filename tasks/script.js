document.addEventListener("DOMContentLoaded",function(){
	//change background-color and add text to a div by click on it
	data=[
		{color: "red", text: "Red"},
		{color: "green", text: "Green"},
		{color: "aqua", text: "Aqua"}
	];

	for(var i=0; i < data.length; i++){
		let element = document.getElementById("c" + (i+1));
		element.addEventListener("click", function(){
			element.style.backgroundColor = data[i].color;
			element.append(data[i].text);
		})
	}
	//Q: will the function work if "let i=0" change to "var i=0"?
	//A: no, i will be 3, element with index 3 does not exist
	//Q: how to correct it?
	//A: create closure, wrap in a function
	for(var i=0; i < data.length; i++){
		(function(i){
			let element = document.getElementById("c" + (i+1));
			element.addEventListener("click", function(){
				element.style.backgroundColor = data[i].color;
				element.append(data[i].text);
			})
		})(i);	
	}
//-----------------------------------------------------------------------------
// task2
//console.log id of every div which is inside of #root when click on it
	let root=document.getElementById("root");
	root.addEventListener("click", function(e){
		if(e.target.tagName == "DIV") console.log(e.target.getAttribute("id"));
	});
})