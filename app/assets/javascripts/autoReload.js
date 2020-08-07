$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message-info" data-message-id=${message.id}>
          <div class="Message-info__name">
            ${message.user_name}
          </div>
          <div class="Message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message" data-message-id=${message.id}>
          <p class="Message__body">
            ${message.body}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
        `<div class="Message-info" data-message-id=${message.id}>
          <div class="Message-info__name">
            ${message.user_name}
          </div>
          <div class="Message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message" data-message-id=${message.id}>
          <p class="Message__body">
            ${message.body}
          </p>
        </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Message-info:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main_chat__message-field').append(insertHTML);
        $('.Main_chat__message-field').animate({ scrollTop: $('.Main_chat__message-field')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});