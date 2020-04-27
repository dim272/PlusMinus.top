$(function() {

  $('#newString').on('click', function (event) {
      $('#string').append(`

          <div class="item">
            <h3 class="question" contenteditable="true">Введите название строки</h3>
            <div class="control">
              <button class="btn plus">+</button>
              <button class="btn minus">-</button>
              <span class="value">0</span>
            </div>
          </div>

        `);
        let qtString = $('.item').length;
        localStorage.setItem('qtString', qtString);
  });

  let arrSum = [];

  let qtString = localStorage.getItem('qtString');
  for (i=0;i<qtString;i++) {
    lStorageStringNum = Number(localStorage.getItem('string'+i));
    arrSum[i] = lStorageStringNum;
  };

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

      arrSum[elementNumber] = num;

      let total = arrSum.reduce(function(sum, current) {
        return sum + current;
      }, 0);

      $('#total').text(total);

      localStorage.setItem('string'+elementNumber, num);
      localStorage.setItem('total', total);
      // localStorage.clear();
      // console.log(localStorage);
  });

});
