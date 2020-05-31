$(function(){
  let x = JSON.parse(localStorage.getItem('mainArr'));

  if (x == null || x == undefined){
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


      `)
  } else {
    for (let i=0;i<x.length;i++) {
      $('.box-content').append(`

        <div class="string">
          <span class="text" contenteditable="true">${x[i].text}</span>
          <button class="delete-string icon-cross hidden"></button>
          <button class="plusminus icon-plus" value="+"></button>
          <button class="plusminus icon-minus value="-""></button>
          <span class="number" contenteditable="true">${x[i].number}</span>
          <div class="del-string hidden">
            <div class="del-string__wrap">
              <button class="yes">Да</button>
              <p class="del-string__text">Удалить строку?</p>
              <button class="no">Нет</button>
            </div>
        </div>

        `)
      }
  };

  let total = localStorage.getItem('total');
  if (total == null || total == undefined){
    $('.total-num').text(0);
    localStorage.setItem('total', 0)
  } else {
    $('.total-num').text(total);
  }


  let mainTitle = localStorage.getItem('main-title');
  if (mainTitle == null || mainTitle == undefined){
    $('.main-title').text('Введите название счетчика');
  } else {
    $('.main-title').text(mainTitle);
  }
})
