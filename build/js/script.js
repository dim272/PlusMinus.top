$(function() {

  $('#newString').on('click', function () {
      $('#string').append(`
        <div class="item">
          <button class="edit hide">✎</button>
          <h3 class="question">Причина звонка 1</h3>
          <button class="btn plus">+</button>
          <button class="btn minus">-</button>
          <span class="value">0</span>
        </div>
        `);
  });

  let arrSum = [];
  let total = 0;

  $('.content').on('click', '.btn', function (event) {
      let arrElementNumber = $(event.target).closest('div').index();
      let num = $(event.target).nextAll('.value').text();
      if ($(event.target).is('.plus')) {
        num++
      }
      if ($(event.target).is('.minus')) {
        num--
      }

      $(event.target).nextAll('.value').text(num)

      arrSum[arrElementNumber] = num;

      total = arrSum.reduce(function(sum, current) {
        return sum + current;
      }, 0);
      $('#total').text(total);
  });

  $('.content').on('click', '.question', function (event) {

      let editButton = $(event.target).prev('.edit');

      editButton.is(':visible')
        ?   $('.edit').hide()
        :   ($('.edit').hide(), editButton.show())
  });

});
