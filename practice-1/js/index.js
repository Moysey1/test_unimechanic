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
const InputFilelabel = document.querySelector(
	".modal__label-right__input-label"
);

let im = new Inputmask("+7 (999)-999-99-99");

im.mask(telInput);

allInputs.forEach((item) => {
	item.addEventListener("input", () => {
		removeError(item);
	});
});

function previewImage() {
	const preview = document.querySelector("#previewImg");
	const file = document.querySelector("#inputFile").files[0];
	const svg = document.querySelector(".modal__label-right__svg");
	const btn = document.querySelector(".modal__label-right__preview-btn");
	let result = false;

	var reader = new FileReader();

	reader.onloadend = function () {
		preview.src = reader.result;
	};

	if (file) {
		reader.readAsDataURL(file);
		svg.classList.add("modal__file--onload");
		InputFilelabel.classList.add("modal__file--onload");
		btn.removeAttribute("disabled");
		result = true;
	}

	btn.addEventListener("click", (e) => {
		e.preventDefault();
		btn.setAttribute("disabled", "disabled");
		preview.src = "./img/input-right.png";
		svg.classList.remove("modal__file--onload");
		InputFilelabel.classList.remove("modal__file--onload");
		InputFilelabel.classList.remove("input-file--error");
		result = false;
	});

	return result;
}

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

function createError(input, text) {
	const parent = input.parentNode;
	const errorLabel = document.createElement("label");

	errorLabel.classList.add("error-label");
	errorLabel.textContent = text;

	parent.classList.add("error");
	parent.append(errorLabel);
}

const validationLink = (reg, val) => {
	return reg.test(val);
};

function validation() {
	let result = true;
	const fileInput = document.querySelector(".input-file");
	const inputSelect = document.querySelector(".modal__form-bottom__select");

	if (inputSelect.selectedIndex == 0) {
		createError(inputSelect, "Пожалуйста, выберите опцию!");
		result = false;
	}

	inputSelect.addEventListener("change", () => {
		removeError(inputSelect);
	});

	if (fileInput.files.length < 2) {
		InputFilelabel.classList.add("input-file--error");
		result = false;
	}

	allInputs.forEach((input) => {
		removeError(input);
		if (input.value === "") {
			createError(input, "Поле не заполнено");
			result = false;
		} else if (input.value !== "") {
			if (input.classList.contains("input-tel")) {
				const regex = /^(\+7\s){1}\d{3}\s\d{3}-\d{2}-\d{2}$/;
				if (!validationLink(regex, input.value)) {
					createError(input, "Введите корректный номер телефона");
					result = false;
				} else {
					removeError(input);
				}
			}
			if (input.classList.contains("input-mail")) {
				const regex =
					/^[\w-]+(\.[\w-]+)*@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*(\.[a-zA-Z]{2,})$/;
				if (!validationLink(regex, input.value)) {
					createError(input, "Введите корректный e-mail");
					result = false;
				} else {
					removeError(input);
				}
			}
			if (input.classList.contains("input-cite")) {
				const regex =
					/^(?:https?:\/\/)?(?:[\w.-]+)\.[\w]{2,}(?:\/[\w .-]*)*\/?$/;
				if (!validationLink(regex, input.value)) {
					createError(
						input,
						"Введите корректный адрес сайта примеры (https://www.example.com)"
					);
					result = false;
				} else {
					removeError(input);
				}
			}
			if (input.classList.contains("input-vk")) {
				const regex = /https?:\/\/(?:www\.)?vk\.com\/[a-zA-Z0-9_-]+/;
				if (!validationLink(regex, input.value)) {
					createError(
						input,
						"Введите корректный адрес вконтакте примеры (https://vk.com/username или https://vk.com/id) "
					);
					result = false;
				} else {
					removeError(input);
				}
			}
			if (input.classList.contains("input-ok")) {
				const regex = /(https?:\/\/)?ok\.ru\/([a-zA-Z0-9_-]+)/;
				if (!validationLink(regex, input.value)) {
					createError(
						input,
						"Введите корректный адрес одноклассников примеры (http://ok.ru/... или https://ok.ru/...)"
					);
					result = false;
				} else {
					removeError(input);
				}
			}
			if (input.classList.contains("input-fb")) {
				const regex = /https?:\/\/(www\.)?facebook.com\/[a-zA-Z0-9_\.]+\/?/;
				if (!validationLink(regex, input.value)) {
					createError(
						input,
						"Введите корректный адрес facebook примеры (https://www.facebook.com/username/)"
					);
					result = false;
				} else {
					removeError(input);
				}
			}
			if (input.classList.contains("input-inst")) {
				const regex =
					/^https?:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/;
				if (!validationLink(regex, input.value)) {
					createError(
						input,
						"Введите корректный адрес instagram примеры (https://www.instagram.com/username/)"
					);
					result = false;
				} else {
					removeError(input);
				}
			}
			if (input.classList.contains("input-yt")) {
				const regex =
					/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=\w+)(?:\S+)?$/;
				if (!validationLink(regex, input.value)) {
					createError(
						input,
						"Введите корректный адрес youtube примеры (https://www.youtube.com/watch?v=abc123)"
					);
					result = false;
				} else {
					removeError(input);
				}
			}
		}
	});

	return result;
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (validation() === true) {
		alert("Форма успешно отправлена");
	}
});
