const https = require('https');

var url = 'https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json';

https.get(url, function(res){
  var body = '';

  res.on('data', function(chunk){
    body += chunk;
  });

  res.on('end', function(){
    JSON.parse(body).forEach((d) => {
      // process each emoji to use in cloud natural language
      const shortname = d.short_name;
      const replaced = shortname.replace(/[_-]/g, ' ');
      console.log(replaced + '.');
    });
  });
}).on('error', function(e){
  console.log("Got an error: ", e);
});
