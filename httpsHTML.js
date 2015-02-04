var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var fs = require('fs');

var newFile = fs.createWriteStream('thisShit.txt');


	request('https://www.numberfire.com/nba/fantasy/full-fantasy-basketball-projections', function(error, res, html) {
		if (!error && res.statusCode == 200) {
			var $ = cheerio.load(html);
			
			$('script').each(function() {
				if ($(this).text().indexOf("var NF_DATA") > -1){
					console.log($(this).text());
					jsonit = $(this).text().replace("var NF_DATA = ", "").replace(";", "").replace("var GAQ_PUSH = [];", "");
					newFile.write(jsonit);
				}
			});
			$('tbody.projection-data').each(function(i, element){
				console.log($(this).text());
			});	
		}
	});
