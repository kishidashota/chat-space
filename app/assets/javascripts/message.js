$(function(){
  function buildHTML(message){
    
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";

    var html = `<div class="message" data-message-id="${message.id}"> 
          <div class="date">
            <div class="date--name">
              ${message.user_name}
            </div>
            <div class="date--date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="list--message">
              ${message.body}
            </p>
            ${image}
          </div>
        </div>`
    return html;
        return html;
      
    
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
      console.log(data)
      var html = buildHTML(data);
       $('.main__list').append(html);      
       $('form')[0].reset();
       $('.main__list').animate({ scrollTop: $('.main__list')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });



    var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
   

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main__list').append(insertHTML);
      $('.main__list').animate({ scrollTop: $('.main__list')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled", false);
      }
    })
  
    .fail(function() {
      console.log('error');
    })
  };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
