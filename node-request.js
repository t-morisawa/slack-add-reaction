/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.emojiHeaven = (req_, res_) => {
  const querystring = require('querystring');
  const https = require('https');
  https.request.debug = true;

  const postData = querystring.stringify({});

  const payload = JSON.parse(req_.body.payload);

  const options = {
    hostname: 'slack.com',
    port: 443,
    path: '/api/reactions.add?token=' + process.env.SLACK_API_TOKEN + '&channel=' + payload.channel.id + '&timestamp=' + payload.message_ts + '&name=thumbsup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write('');
  req.end();

  let message = req_.query.message || req_.body.message || 'Hello World!';
  res_.status(200).send(message);

};
