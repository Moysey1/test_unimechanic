// Исходный вариант кода
// Данный код пробегается по всему массиву и выводит результат сравнения заданного тернарным оператором все элементы которые больше 13 получают значения Good, а те что меньше Bad

const arr = [10, 12, 15, 21];

for (let i = 0; i < arr.length; i++) {
	setTimeout(function () {
		console.log(
			arr[i] > 13 ? `Good: ${arr[i]} :default` : `Bad: ${arr[i]} :default`
		);
	}, 3000);
}

// Модификация номер 1

// Создаем функцию которая в качестве аргумента принимает любой массив и делает вывод в консоль
function goodBadModOne(array) {
	// Методом массива ForEach перебираем все элменты массива и выводим результат в консоль

	array.forEach((item) => {
		setTimeout(() => {
			console.log(item > 13 ? `Good: ${item} :mod1` : `Bad: ${item} :mod1`);
		}, 3000);
	});
}

goodBadModOne(arr);

// Модификация номер 2

const arrNew = [1, 25, 7, 22, 31];

function goodBadModTwo(array) {
	// На случай если к нам придет не упорядоченный массив то мы его сортируем методом sort
	// Методом массива ForEach перебираем все элементы массива и выводим результат в консоль
	array
		.sort((a, b) => a - b)
		.forEach((item) => {
			setTimeout(() => {
				console.log(item > 13 ? `Good: ${item} :mod2` : `Bad: ${item} :mod2`);
			}, 3000);
		});
}

goodBadModTwo(arrNew);
