var state = '';
var container = '';
var container2 = '';
var final = false;
var display = document.getElementsByClassName("display");
function updateResult(val) {
  if (state === '' || final === true) {
    display[0].innerText = container;
  } else {
    display[0].innerText = container2;
  }
}
var one = document.getElementById("1");
var two = document.getElementById("2");
var three = document.getElementById("3");
var four = document.getElementById("4");
var five = document.getElementById("5");
var six = document.getElementById("6");
var seven = document.getElementById("7");
var eight = document.getElementById("8");
var nine = document.getElementById("9");
var zero = document.getElementById("0");
var comma = document.getElementById("comma");
var equal = document.getElementById("result");
var plus = document.getElementById("add");
var minus = document.getElementById("minus");
var multiply = document.getElementById("multiply");
var divide = document.getElementById("divide");
var clearAll = document.getElementById("clear-all");
var clearCell = document.getElementById("clear-cell");

one.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

two.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

three.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

four.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

five.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

six.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

seven.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

eight.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

nine.addEventListener('click', function () {
  if (state === '') {
    container += this.value;
  }
  if (state !== '') {
    container2 += this.value;
  }
  updateResult();
});

zero.addEventListener('click', function () {
  if (state === '' || final === true) {
    container += this.value;
  }
  if (state !== '' && final === false) {
    container2 += this.value;
  }
  updateResult();
});


comma.addEventListener('click', function () {

  if (state === '') {
    if (container == '') {
      container = container + '0' + this.value;
    }
    if (!container.includes('.')) {
      container += this.value;
    }
  }
  if (state !== '') {
    if (container2 == '') {
      container2 = container2 + '0' + this.value;
    }
    if (!container2.includes('.')) {
      container2 += this.value;
    }
  }
  updateResult();
});

equal.addEventListener('click', function () {
  container = Number(container);
  container2 = Number(container2);
  final = true;


  if (state === 'add') {
    container = container + container2;
  }
  if (state === 'minus') {
    container = container - container2;
  }
  if (state === 'multiply') {
    container = container * container2;
  }
  if (state === 'divide') {
    container = container / container2;
  }
  container = container.toString();
  container2 = container2.toString();
  updateResult();


});



plus.addEventListener('click', function () {
  if (container2 !== '') {
    count();
    updateResult();
  }
  state = 'add';
  final = false;

  container2 = '';
  updateResult();
});

minus.addEventListener('click', function () {
  if (container2 !== '') {
    count();
    updateResult();
  }
  state = 'minus';
  final = false;

  container2 = '';
  updateResult();
});

multiply.addEventListener('click', function () {
  if (container2 !== '') {
    count();
    updateResult();
  }
  state = 'multiply';
  final = false;

  container2 = '';
  updateResult();
});

divide.addEventListener('click', function () {
  if (container2 !== '') {
    count();
    updateResult();
  }
  state = 'divide';
  final = false;

  container2 = '';
  updateResult();
});

clearCell.addEventListener('click', function () {
  if (state === '') {
    container = '';
  }
  if (state !== '') {
    container2 = '';
  }
  updateResult();
});

clearAll.addEventListener('click', function () {
  state = '';
  container = '';
  container2 = '';
  updateResult();
});

function count() {
  switch (state) {
    case 'divide':
      container = Number(container) / Number(container2);
      container.toString();
      container2 = '';
      break;
    case 'multiply':
      container = Number(container) * Number(container2);
      container.toString();
      container2 = '';
      break;
    case 'add':
      container = Number(container) + Number(container2);
      container.toString();
      container2 = '';
      break;
    case 'minus':
      container = Number(container) - Number(container2);
      container.toString();
      container2 = '';
      break;
    default:
      break;
  }
}