//Load the request module
var request = require('request');

var poster = function(id, output)
{

console.log("sending post request with message ");
var labels = output.taxonomy.taxonomy;
var labelStr = "";

for (var i = 0, len = labels.length; i < len; i++) {

  console.log(labels[i]);

  labelStr = labelStr+","+labels[i].label;
}
console.log(labelStr.slice(1));

  var putUrl = 'https://regina.stamplayapp.com/api/cobject/v1/knowledgeobject/'+id;
request({
    url: putUrl, //URL to hit
    //qs: {sender: 'blog example', title: 'blogger stuff'}, //Query string data
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',

    },
    json: {
        content: output.text.content,
        link_author: output.author.author,
        tags:labelStr.slice(1)
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});


}


module.exports = poster;
