const postList = document.querySelector(".posts__table-body");
const tableHeadGroup = document.querySelector(".table__head");
const form = document.querySelector(".form");
const btnSearch = document.querySelector(".form__btn-search");
const btnReset = document.querySelector(".form__btn-reset");
const input = document.querySelector(".form-search__input");
const arorwArray = document.querySelectorAll(".table__arrow");

let postsArray = [];

async function getPosts() {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	const data = await response.json();
	postsArray = data;
	createPostItems(postsArray);
}

function createPost(obj) {
	const postTR = document.createElement("tr");
	const postUserId = document.createElement("td");
	const postID = document.createElement("td");
	const postTitle = document.createElement("td");
	const postBody = document.createElement("td");

	postUserId.textContent = obj.userId;
	postID.textContent = obj.id;
	postTitle.textContent = obj.title;
	postBody.textContent = obj.body;

	postTR.append(postUserId);
	postTR.append(postUserId);
	postTR.append(postID);
	postTR.append(postTitle);
	postTR.append(postBody);

	postList.append(postTR);
}

function createPostItems(arr) {
	postList.innerHTML = "";
	for (const item of arr) {
		createPost(item);
	}
}

getPosts();

function filterPosts(arr, prop, value) {
	let result = [];
	let copyArray = [...arr];
	for (const item of copyArray) {
		if (String(item[prop]).includes(value) == true) result.push(item);
	}

	createPostItems(result);
}

function createError(input, text) {
	const parent = input.parentNode;
	const errorLabel = document.createElement("label");

	errorLabel.classList.add("error-label");
	errorLabel.textContent = text;

	parent.classList.add("error");
	parent.append(errorLabel);
}

function removeError(input) {
	const parent = input.parentNode;

	if (parent.classList.contains("error")) {
		parent.querySelector(".error-label").remove();
		parent.classList.remove("error");
	}
}

btnSearch.addEventListener("click", (e) => {
	e.preventDefault();

	if (input.value.length < input.dataset.minLength) {
		createError(
			input,
			`минимальное количество символов: ${input.dataset.minLength}`
		);
		createPostItems(postsArray);
	} else {
		removeError(input);
		filterPosts(postsArray, "body", input.value);
	}
});

btnReset.addEventListener("click", (e) => {
	e.preventDefault();
	input.value = "";
	arorwArray.forEach((item) => {
		if (item.classList.contains("table__arrow--active")) {
			item.classList.remove("table__arrow--active");
		}
	});
	createPostItems(postsArray);
});

const sortPosts = (arr, prop, dir = false) =>
	arr.sort((a, b) => ((!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 1));

tableHeadGroup.addEventListener("click", (e) => {
	const postsArrayCopy = [...postsArray];

	if (e.target.classList.contains("table__user-id")) {
		if (!e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "userId", false);
			e.target.classList.add("table__arrow--active");

			createPostItems(postsArrayCopy);
		} else if (e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "userId", true);
			e.target.classList.remove("table__arrow--active");

			createPostItems(postsArrayCopy);
		}
	} else if (e.target.classList.contains("table__id")) {
		if (!e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "id", false);
			e.target.classList.add("table__arrow--active");

			createPostItems(postsArrayCopy);
		} else if (e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "id", true);
			e.target.classList.remove("table__arrow--active");

			createPostItems(postsArrayCopy);
		}
	} else if (e.target.classList.contains("table__title")) {
		if (!e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "title", false);
			e.target.classList.add("table__arrow--active");

			createPostItems(postsArrayCopy);
		} else if (e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "title", true);
			e.target.classList.remove("table__arrow--active");

			createPostItems(postsArrayCopy);
		}
	} else if (e.target.classList.contains("table__body")) {
		if (!e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "body", false);
			e.target.classList.add("table__arrow--active");

			createPostItems(postsArrayCopy);
		} else if (e.target.classList.contains("table__arrow--active")) {
			sortPosts(postsArrayCopy, "body", true);
			e.target.classList.remove("table__arrow--active");

			createPostItems(postsArrayCopy);
		}
	}
});
