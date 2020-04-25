$(function() {

  $('#newString').on('click', function () {
      $('#string').append(`

          <div class="item">
            <button class="edit">✎</button>
            <h3 class="question">Введите название строки</h3>
            <div class="control">
              <button class="btn plus">+</button>
              <button class="btn minus">-</button>
              <span class="value">0</span>
            </div>
          </div>

        `);
  });

  let arrSum = [];
  let total = 0;

  $('.content').on('click', '.btn', function (event) {
      let arrElementNumber = $(event.target).closest('.item').index();
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

  $('.body-wrap').on('click', '.question', function (event) {
      let editButton = $(event.target).prev('.edit');

      editButton.is(':visible')
        ?   $('.edit').hide()
        :   ($('.edit').hide(), editButton.show())
  });

});
