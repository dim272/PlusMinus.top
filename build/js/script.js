$(function() {

// Поведение кнопки "Добавить"

  $('#newString').on('click', function (event) {
      $('#string').append(`

        <div class="item">
            <div class="delete-block hidden">
                <span class="delete-title">Удалить строку?</span>
                <button class="btn-yes">Да</button>
                <button class="btn-no">Нет</button>
            </div>
            <h3 class="question" contenteditable="true">
                Введите название строки
                <button class="delete-btn hidden" contenteditable="false">⨯</button>
            </h3>
            <div class="control">
                <button class="btn plus">+</button>
                <button class="btn minus">-</button>
                <span class="value">0</span></div>
        </div>

        `);

        // Добавление в массив значания общего количества строк qtString

        let qtString = $('.item').length;
        localStorage.setItem('qtString', qtString);
  });

// Массив в который добавляются циферные значения каждой строки
// для последующего суммирования

  let arrSum = [];

//  Добавление в массив значений из хранилища при загрузке страницы

  let qtString = localStorage.getItem('qtString');
  for (i=0;i<qtString;i++) {
    lStorageStringNum = Number(localStorage.getItem('string'+i));
    arrSum[i] = lStorageStringNum;
    arrCalc();
  };

// Поведение кнопок + и -

  $('.content').on('click', '.btn', function (event) {
      let elementNumber = $(event.target).closest('.item').index();
      let num = $(event.target).nextAll('.value').text();

      if ($(event.target).is('.plus')) {
        num++
      }
      if ($(event.target).is('.minus')) {
        num--
      }

      $(event.target).nextAll('.value').text(num)

      // Добавление полученого значения в массив с номером строки elementNumber
      arrSum[elementNumber] = num;

      // Добавление в хранилище значения строки с ключём в виде её номера
      localStorage.setItem('string'+elementNumber, num);

      arrCalc();
  });

  // Сложение всех чисел массива
  function arrCalc () {
    let total = arrSum.reduce(function (sum, current) {
      return sum + current;
    }, 0);

    $('#total').text(total);

    // Добавление в хранилище общей суммы масива с ключем "total"
    localStorage.setItem('total', total);
    // localStorage.clear();
    // console.log(localStorage);
  };

// Поведение кнопок удаления строки

  $('h3.question').on('click', function(event) {
    $('.delete-btn').addClass('hidden');
    $(event.target).children('.delete-btn').removeClass('hidden');
  });

  $('.delete-btn').on('click', function(event) {
    $(event.target).closest('.question').prevAll('.delete-block').removeClass('hidden');
  });

  $('.btn-no').on('click',function(event) {
    $(event.target).closest('.delete-block').addClass('hidden');
    console.log(localStorage);

    let x = localStorage.getItem('string0');

    console.log(x);
  });

  $('.btn-yes').on('click', function(event) {
    let n = $(event.target).closest('.item').index();
    $(event.target).closest('.item').remove();
    arrSum.splice(n,1);
    localStorage.removeItem('string'+n);
    let qS = localStorage.getItem('qtString');
    console.log(qS);
    qS = Number (qS);
    qS = qS - 1;
    console.log(qS);
    localStorage.setItem('qtString', qS);
    console.log(localStorage);
    arrCalc();
  });

  $('*').on('click', function(event) {
    let h3Question = $('h3.question');
    let deleteBtn = $('.delete-btn')
    if (!h3Question.is(event.target) && !deleteBtn.is(event.target)) {
    $('.delete-btn').addClass('hidden');
    };
  });

  // Кнопка удаления ВСЕХ данных, отчистка localStorage и массива arrSum

  $('.clear-all').on('click', function() {
    $('.clear-wrap').removeClass('hidden');
  });

  $('.clear-no').on('click', function() {
    $('.clear-wrap').addClass('hidden');
  });

  $('.clear-yes').on('click', function() {
    localStorage.clear();
    arrSum.splice(0);
    location.reload();
  });

});
