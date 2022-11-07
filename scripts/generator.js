document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', () => {
        document.querySelector('#results').innerHTML = 'Натисніть кнопку "Згенерувати", щоб згенерувати випадкові числа';
    })
});


document.querySelector('[name="amount"]').addEventListener('blur', function () {
    let amount = this.value;
    if (amount < 0) {
        document.querySelector('[name="amount"]').value = '1';
    }
})


document.querySelector('#get').addEventListener('click', () => {
    let amount = parseInt(document.querySelector('[name="amount"]').value);
    let unique = document.querySelector('[name="unique"]').checked;
    let min = parseInt(document.querySelector('[name="min"]').value);
    let max = parseInt(document.querySelector('[name="max"]').value);
    let minInclude = document.querySelector('[name="minInclude"]').checked;
    let maxInclude = document.querySelector('[name="maxInclude"]').checked;
    let sort = document.querySelector('[name="sort"]').checked;
    let results = document.querySelector('#results');

    if (min > max) {
        let temp = min;
        min = max;
        document.querySelector('[name="min"]').value = min;
        max = temp;
        document.querySelector('[name="max"]').value = max;
    }

    if (minInclude && maxInclude) {
        if ((amount > (max - min) + 1) && unique) {
            alert('Унікальних значень не може бути більше ніж чисел в діапазоні!')
        } else {
            if (sort) {
                results.innerHTML = getNumbers(amount, min, max, unique).sort((a, b) => a - b).join(', ');
                return;
            }
            results.innerHTML = getNumbers(amount, min, max, unique).join(', ');
        }
    } else if (minInclude || maxInclude) {
        if ((amount > (max - min)) && unique) {
            alert('Унікальних значень не може бути більше ніж чисел в діапазоні!')
        } else {
            if (sort) {
                results.innerHTML = getNumbers(amount, min, max, unique, minInclude, maxInclude).sort((a, b) => a - b).join(', ');
                return;
            }
            results.innerHTML = getNumbers(amount, min, max, unique, minInclude, maxInclude).join(', ');
        }
    } else {
        if ((amount > (max - min) - 1) && unique) {
            alert('Унікальних значень не може бути більше ніж числе в діапазоні!')
        } else {
            if (sort) {
                results.innerHTML = getNumbers(amount, min, max, unique, minInclude, maxInclude).sort((a, b) => a - b).join(', ');
                return;
            }
            results.innerHTML = getNumbers(amount, min, max, unique, minInclude, maxInclude).join(', ');
        }
    }
});


function getNumbers(amount, min, max, unique, minInclude = true, maxInclude = true) {
    let result = [];
    if (unique) {
        for (let i = 0; i < amount;) {
            let item = getRandomNumber(min, max);
            if (!result.includes(item)) {
                if (minInclude && maxInclude) {
                    result.push(item);
                    i++;
                } else if (minInclude && !maxInclude) {
                    if (item !== max) {
                        result.push(item);
                        i++;
                    }
                } else if (!minInclude && maxInclude) {
                    if (item !== min) {
                        result.push(item);
                        i++;
                    }
                } else {
                    if (item !== min && item !== max) {
                        result.push(item);
                        i++;
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < amount;) {
            let item = getRandomNumber(min, max);
            if (minInclude && maxInclude) {
                result.push(item);
                i++;
            } else if (minInclude && !maxInclude) {
                if (item !== max) {
                    result.push(item);
                    i++;
                }
            } else if (!minInclude && maxInclude) {
                if (item !== min) {
                    result.push(item);
                    i++;
                }
            } else {
                if (item !== min && item !== max) {
                    result.push(item);
                    i++;
                }
            }
        }
    }
    return result;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}