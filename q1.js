let request = require("request");
let cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary", cb);
function cb(err, res, html){
    if(err){
        console.log(err);
    }else if(res.statusCode==404){
        console.log("page not found");
    }else{
        dataExtracter(html);
    }
    
}
function dataExtracter(html){
    let selectorTool = cheerio.load(html);
    let elementArr = selectorTool(".match-comment-wrapper .match-comment-long-text");
    let lbc = selectorTool(elementArr[0]).text();
    console.log(lbc);
}