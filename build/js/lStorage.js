$(function() {
  let firstValue = localStorage.getItem('string0')
    firstValue == 'undefined' || 'NaN' || 'null' ?
    $('.value').text(firstValue):
    firstValue = 0 ;

  let totalValue = localStorage.getItem('total')
    totalValue == 'undefined' || 'NaN' || 'null' ?
    $('#total').text(totalValue) :
    totalValue = 0;

  let qtString = localStorage.getItem('qtString');
  for (i=1;i<qtString;i++) {
    let n = localStorage.getItem('string'+i)
    if (n == null) {
    n = 0
    };
    $('#string').append(`

        <div class="item">
          <h3 class="question" contenteditable="true">Введите название строки</h3>
          <div class="control">
            <button class="btn plus">+</button>
            <button class="btn minus">-</button>
            <span class="value">${n}</span>
          </div>
        </div>

    `);
  }

});
