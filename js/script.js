$(function() {

/*
Навигация по коду / Code menu

- mainArr - основной массив с обектами
  в нёго добавляются объекты, количество которых зависит от количества строк
  в каждом объекте два ключа: text: 'текст строки',
                              number: 'число строки'
- Функции


Кнопки / Buttons:
 - +/- (.plusminus) прибавляет и отнимает число строки
 - Добавить (#newString) - Добавляет новую строку
 - Удалить (.delete-string) - вызывает запрос удаления строки
 - Да (.yes) - удаляет строку
 - Нет (.no) - закрывает запрос удаления строки
 - Кнопка "Корзина" (.clear-all) Вызывает запрос на удаление всех данных
 - Стереть всё? - Нет (.clear-no) - отменяет удаление всех данных
 - Стереть всё? - Да (.clear-yes) - полностью обнуляет счётчик и хранилище

Отслеживание blur с
  строки ввода текста
  числа
  главного заголовка

*/

  // Вынимаем массив из localStorage
  let mainArr = JSON.parse(localStorage.getItem('mainArr'));

  // Если он пуст, создаём массив с первой пустой строкой
  if (mainArr == null) {
    mainArr = [{'text': 'Введите название строки',
                  'number': 0}]
    localStorage.setItem('mainArr', JSON.stringify(mainArr))
  }

  //Добавляет в массив число строки. Срабатывает при нажатии +/-
  function newNum(event){
    let z = $(event.target).closest('.string').index();
    let strNum = Number ($(event.target).nextAll('.number').text());
    let strVal = $(event.target).prevAll('.text').text();
    mainArr[z] = { text: strVal, number: strNum };
    localStorage.setItem('mainArr', JSON.stringify(mainArr))
  }

  //Добавляет в массив текст строки. Срабатывает при blur с текста
  function newText(event) {
    let z = $(event.target).closest('.string').index();
    let strNum = Number ($(event.target).nextAll('.number').text());
    let strVal = $(event.target).text();
    mainArr[z] = { text: strVal, number: strNum };
    localStorage.setItem('mainArr', JSON.stringify(mainArr))
  }

  // Передаёт number всех объектов общего массива в массив total,
  // складывает все числа массива total
  // передаёт значение в .total-num и локальное хранилище
  function calcTotal() {
    let total = [];
    let x = mainArr.length;
    console.log(localStorage);
    for (let i=0;i<x;i++) {
      total[i] = mainArr[i].number;
    }
    let totalNum = total.reduce(function (sum, current) {
      return sum + current;
    }, 0);
    $('.total-num').text(totalNum);
    localStorage.setItem('total', totalNum);
  };

  // Поведение кнопок +/-
  $('.box-content').on('mousedown', '.plusminus', function(event) {
    let x = $(event.target).nextAll('.number').text();
    let val = $(event.target).val(); // +/-

    if (val == '+') {
        x++
      } else {
        x--
      }

    $(event.target).nextAll('.number').text(x);

    newNum(event);
    calcTotal();
    localStorage.setItem('mainArr', JSON.stringify(mainArr))
  });

  // добавляет новый div.string в div.box-content
 let newString = function () {
     $('.box-content').append(`

       <div class="string">
         <span class="text" contenteditable="true">Введите название строки</span>
         <button class="delete-string icon-cross hidden"></button>
         <button class="plusminus icon-plus" value="+"></button>
         <button class="plusminus icon-minus value="-""></button>
         <span class="number" contenteditable="true">0</span>
         <div class="del-string hidden">
           <div class="del-string__wrap">
             <button class="yes">Да</button>
             <p class="del-string__text">Удалить строку?</p>
             <button class="no">Нет</button>
           </div>
         </div>
       </div>

       `)
     //Добавляет значение новой строки в массив по её номеру
     let x = $('.box-content > .string').length;
     x = x - 1;
     mainArr[x] = {'text': 'Введите название строки',
                   'number': 0}
     localStorage.setItem('mainArr', JSON.stringify(mainArr));
     calcTotal();
 };

  //Кнока + вызывает функцию добавления новой строки "newString"
  $('#newString').on('mousedown', newString)

  // Показать кнопку "x" на выбранной строке, скрыть на остальных
  $('.box-content').on('mousedown', '.text', function(event) {
    $('.delete-string').addClass('hidden');
    $(event.target).nextAll('.delete-string').removeClass('hidden');
  });

  // Не получается использовать blur для скрытия кнопки х, когда уходишь с строки
  // Здесь отслеживаем все нажатия вне кнопки х и поля введения текста строки
  $(document).on('mousedown', function(event){
		let x = $('.delete-string');
    let y = $('.text');
		if ( !x.is(event.target) && !y.is(event.target) ){
			$('.delete-string').addClass('hidden')
		}
	});

  // Показ запроса на удаление строки
  $('.box-content').on('mousedown', '.delete-string', function(event) {
    $(event.target).addClass('hidden');
    $(event.target).nextAll('.del-string').removeClass('hidden');
  });

  // Кнопка НЕТ - на запросе удаления строки
  $('.box-content').on('mousedown', '.no', function(event) {
    $(event.target).closest('.del-string').addClass('hidden')
  });
  // Кнопка ДА - на запросе удаления строки
  $('.box-content').on('mousedown', '.yes', function(event) {
    let x = $(event.target).closest('.string').index();
    mainArr.splice(x, 1); // Удаляем объект из массива по номеру строки
    $(event.target).closest('.string').remove();
    calcTotal();
    localStorage.setItem('mainArr', JSON.stringify(mainArr))
  });

  // Нажатие на кнопку "Корзина"
  $('.clear-all').on('mousedown', function() {
    $('#clearText').removeClass('hidden');
  });

  // Кнопка НЕТ при запросе удаления всех данных
  $('#clearTextNo').on('mousedown', function() {
    $('#clearText').addClass('hidden');
  });

  // Кнопка Да при запросе удаления всех данных
  // Обнуляет массив, обновляет страницу
  $('#clearTextYes').on('mouseup', function() {
    while (mainArr.length > 0) {mainArr.pop()}
    localStorage.clear();
    $('#clearText').addClass('hidden');
    $('.box-content').html('');
    localStorage.setItem('total', 0);
    localStorage.setItem('main-title', 'Введите название счетчика');
    $('.main-title').text('Введите название счетчика');
    newString();
  });

  // Нажатие на кнопку "0"
  $('.zero').on('mousedown', function() {
    $('#clearNum').removeClass('hidden');
  });

  // Кнопка НЕТ при запросе удаления всех данных
  $('#clearNumNo').on('mousedown', function() {
    $('#clearNum').addClass('hidden');
  });

  // Кнопка Да при запросе удаления всех данных
  // Обнуляет массив, обновляет страницу
  $('#clearNumYes').on('mouseup', function() {
    let x = mainArr.length;
    for (let i=0; i<x; i++) {
      mainArr[i].number = 0;
    }
    localStorage.setItem('total', 0);
    localStorage.setItem('mainArr', JSON.stringify(mainArr))
    $('.total-num').text(0);
    $('.number').text(0);
    $('#clearNum').addClass('hidden');
  });

  //При каждом blur с текста строки добавляет его значение в массив и хранилище
  $('.box-content').on('blur', '.text', function(event) {
      newText(event);
  });

  // При каждом blur после введения цифры в строке
      // 1. Добавляет новые данные в массив
      // 2. Добавляет новые значения в массив
      // 3. Вызывает функцию подсчёта сумы calcTotal()
      // 4. Перезаписывает обновлённый массив в хранилище
  $('.box-content').on('blur', '.number', function(event) {
      let z = $(event.target).closest('.string').index();
      let strNum = Number ($(event.target).text());
      let strVal = $(event.target).prevAll('.text').text();
      mainArr[z] = { text: strVal, number: strNum }
      calcTotal();
      localStorage.setItem('mainArr', JSON.stringify(mainArr))
  });

  //Отслеживаем blur с названия счетчика (.main-title)
  //и добавяем его текст в хранилище
  $('.main-title').on('blur', function() {
    let x = $(this).text();
    localStorage.setItem('main-title', x);
  });

  //Кнопка Share - создание отчёта

  $('.report').on('mousedown', function() {
    $('#boxReport').removeClass('hidden');
    let title = $('.main-title').text();
    $('#report').append(`<b>${title}</b>\n</br>`)
    let total = $('.total-num').text();
    $('#report').append(`Всего: ${total}\n</br>`)
    let x = mainArr.length;
    for (let i=0;i<x;i++) {
      let text = mainArr[i].text;
      let num = mainArr[i].number;
      $('#report').append(`${text}: ${num}\n</br>`)
    }
  });

  $('.closeReport').on('mousedown', function() {
    $('#boxReport').addClass('hidden');
    $('#report').text('');
  });

  $('#coppy').on('mousedown', function () {
      let tmp = $("<textarea>");
      $("body").append(tmp);
      tmp.val($('#report').text()).select();
      document.execCommand("copy");
      tmp.remove();
  });

});
