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

  $('.Form-info').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Main_chat__message-field').append(html);
      $('.Main_chat__message-field').animate({ scrollTop: $('.Main_chat__message-field')[0].scrollHeight});
      $(".Form-info__submit-btn").prop("disabled", false);
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})