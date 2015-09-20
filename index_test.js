console.log('Loading event');
//
var config = require('./config');
var request = require('request');
var url = 'http://im.kayac.com/api/post/' + config.username;
var password = config.password;

exports.handler = function(event, context) {
  // Generate formData
  // var message = JSON.parse(event.Records[0].Sns.Message);
  var message = event;
  var formData = {
    password: password,
    message: message.message,
    handler: message.url
  };

  // Post to im.kayac.com
  console.log('Sending im.kayac.com: ');
  console.log('URL: ' + url);
  console.log('Message: ' + formData.message);
  request.post({ url: url, formData: formData }, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('Message send failed:', err);
    }
    console.log('Message send successful!  Server responded with:', body);
    context.done(null,'');
  });
};
