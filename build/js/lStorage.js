$(function() {
  let firstValue = localStorage.getItem('string0')
    firstValue == 'null' ?
    $('.value').text(0) :
    $('.value').text(firstValue) ;

  let totalValue = localStorage.getItem('total')
    totalValue == 'undefined' || 'NaN' || 'null' ?
    $('#total').text(0):
    $('#total').text(totalValue);

  let qtString = localStorage.getItem('qtString');
  for (i=1;i<qtString;i++) {
    let n = localStorage.getItem('string'+i)
    if (n == null) {
    n = 0
    };
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
              <span class="value">${n}</span></div>
      </div>

    `);
  }

});
