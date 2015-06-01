var Hapi = require('hapi'),
  scraper = require('./scraper');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    scraper('http://www.zipcar.com/contact',function(str){
      var response = reply(str);
      response.type('application/octet-stream');
      response.header('content-disposition', 'attachment; filename=contactpage.csv;');
    });
  }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
