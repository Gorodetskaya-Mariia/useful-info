window.onload = function () {
	var popup = document.querySelector(".popup_window"),
		inputs = document.querySelectorAll("form .popup__booking-form-input");

	//открытие онлайн-бронирования
	document.querySelector(".action.action--booking").onclick = function(e) {
		e.preventDefault();
		openPopup(".popup__booking", "opened", false);
	};

	//закрытие онлайн-бронирования
	document.querySelector(".popup__booking-close").onclick = function(e) {
		e.preventDefault();
		closePopup(".popup__booking","opened",".mobile-layout", false );
	};

	//проверка form на заполнение полей
	document.querySelector("form").onsubmit = function(e) {
		var error = false;

		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].value === "") {
				inputs[i].classList.add("error");
				error = true;
			} else {
				inputs[i].classList.remove("error");
			}
		}

		if (error) {
			e.preventDefault();
		}
	};
};

function closePopup(popupClass,activeClass, layout, overlay) {
	document.querySelector(popupClass).classList.remove(activeClass);
	document.querySelector(layout).style.overflow = "";
	if(overlay){
		document.querySelector(".mainmenuoverlay").classList.remove("opened");
	}
};

function openPopup(popupClass, activeClass, overlay) {
	var popupToOpen = document.querySelector(popupClass);

	popupToOpen.classList.add(activeClass);
	document.querySelector(".mobile-layout").style.overflow = "hidden";

	if(overlay){
		document.querySelector(".mainmenuoverlay").classList.add("opened");
	}
};