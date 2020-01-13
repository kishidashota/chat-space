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

    $('.message--button').removeAttr('data-disable-with')   


    $.ajax({
      url: url, 
      type: "POST",  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){ 
      var html = buildHTML(data);
       $('.main__list').append(html);      
       $('form')[0].reset();
       $('.main__list').animate({ scrollTop: $('.main__list')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
});