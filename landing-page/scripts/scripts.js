let nav = document.querySelector(".navbar"),
			image = document.querySelector(".image");
			button = document.querySelector(".ribbon"),
			buttonText = document.querySelector(".ribbon-text"),
			body = document.querySelector("body"),
			content = document.querySelector(".content");


window.addEventListener("click", function (evt) {
	
	if(evt.target.classList.contains("ribbon") || evt.target.classList.contains("ribbon-text")){
		event.preventDefault();
		image.classList.add("zoomOut");
		setTimeout(()=>{
			nav.classList.add("visible");
		}, 600);		
		body.classList.add("toScroll");
		button.style.top = "-66vh";
		buttonText.style.top = "-46vh";
		content.classList.add("visible");
	}
});