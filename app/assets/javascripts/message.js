$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="date">
            <div class="date--name">
              ${message.user_name}
            </div>
            <div class="date--date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="list--message">
              ${message.body}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="date">
            <div class="date--name">
              ${message.user_name}
            </div>
            <div class="date--date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="list--message">
              ${message.body}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $('.message--button').removeAttr('data-disable-with')   //連続で送信ボタンを押せるように


    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: "POST",  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){ //同じ変数を定義してあげる
      var html = buildHTML(data);
       $('.main__list').append(html);      
       $('form')[0].reset();
       console.log(data);
       $('.main__list').animate({ scrollTop: $('.main__list')[0].scrollHeight});//メッセージ画面全体にかかっているクラス名を$()に入れる
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
});