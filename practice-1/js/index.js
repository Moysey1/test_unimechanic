const modal = document.getElementById("modal");
const btn = document.getElementById("openModal");
const close = document.querySelector(".modal__close");
const btnAdd = document.querySelector(".modal__form-btn__add");
const btnRemove = document.querySelector(".modal__form-btn__remove");
const body = document.querySelector("body");
const form = document.getElementById("form");
const allInputs = document.querySelectorAll(".modal__input");
const telInput = document.querySelector('input[type="tel"]');
const emailInput = document.querySelector('input[type="email"]');

btn.addEventListener("click", () => {
	allInputs.forEach((item) => {
		removeError(item);
		item.value = "";
	});
	modal.classList.add("modal--open");
});

close.addEventListener("click", () => {
	modal.classList.remove("modal--open");
});

btnRemove.addEventListener("click", (e) => {
	e.preventDefault();
	modal.classList.remove("modal--open");
});

function removeError(input) {
	const parent = input.parentNode;

	if (parent.classList.contains("error")) {
		parent.querySelector(".error-label").remove();
		parent.classList.remove("error");
	}
}

function validation() {
	let result = true;
	const telPattern =
		/^\+?[0-9]{1,4}[-.s]?\(?[0-9]{1,3}\)?[-.s]?[0-9]{1,4}[-.s]?[0-9]{1,4}[-.s]?[0-9]{1,9}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	telInput.addEventListener("input", function () {
		removeError(telInput);
		if (telPattern.test(telInput.value)) {
			telInput.setCustomValidity("");
		} else {
			createError(
				telInput,
				`Пожалуйста, введите действительный номер телефона`
			);
		}
	});

	emailInput.addEventListener("input", function () {
		const email = this.value;

		removeError(emailInput);
		if (emailRegex.test(email)) {
			this.setCustomValidity("");
		} else {
			createError(emailInput, "Неверный формат email");
		}
	});

	function createError(input, text) {
		const parent = input.parentNode;
		const errorLabel = document.createElement("label");

		errorLabel.classList.add("error-label");
		errorLabel.textContent = text;

		parent.classList.add("error");
		parent.append(errorLabel);
	}

	allInputs.forEach((input) => {
		removeError(input);

		if (input.value == "") {
			createError(input, "Поле не заполнено");
			result = false;
		}
	});

	return result;
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (validation() == true) {
		alert("Форма успешно отправлена");
	}
});
