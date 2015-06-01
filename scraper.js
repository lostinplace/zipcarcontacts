var $ = require('jquery'),
  cheerio = require('cheerio'),
  http = require('http'),
  html = '',
  json2csv = require('json2csv'),
  readyCallback;


function parseChunk(chunk){
  html += chunk.toString()
}

function parseHTML(){
  var $ =  cheerio.load(html)
  var $contactBlocks = $('div.row');
  var outputArr = [];
  var row;
  var $block;
  $contactBlocks.each(function(blockIndex,block){
    row = [];
    $block = cheerio.load(block);
    var $els=$block('*:not(:has(*))')
    $els.each(function(elIndex,el){
      row.push(el.childNodes[0].data)
    });
    outputArr.push(row);
  });

  json2csv({ data: outputArr,fields:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}, function(err, csv) {
    if (err) console.log(err);
    readyCallback(csv);
  });
}

function gotResponse(resp) {
  resp.on('data', parseChunk)
  resp.on('end', parseHTML)
}

function getCSVforURL(url, callback){
  readyCallback =  callback;
  http.get(url).on('response', gotResponse);
}

module.exports=getCSVforURL;
