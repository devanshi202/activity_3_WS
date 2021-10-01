let request = require("request");
let cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard", cb);
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
    let elementArr = selectorTool(".table.bowler tbody tr");
    for(let i=0; i<elementArr.length; i++){
        let tdarr = selectorTool(elementArr[i]).find("td");
        let aElem = selectorTool(tdarr[0]).find("a");
        let halfLink = aElem.attr("href");
        let fullLink = `https://www.espncricinfo.com/${halfLink}`;
        request(fullLink, newcb);
    }
    function newcb(err, res, html){
        if(err){
            console.log(err);
        }else if(res.statusCode==404){
            console.log("page not found");
        }else{
            playerAges(html);
        }
        
    }
    function playerAges(html){
        let selectorTool = cheerio.load(html);
        let elementArr = selectorTool(".player-card-description.gray-900");
        let age = selectorTool(elementArr[2]).text();
        let name = selectorTool(elementArr[0]).text();
        console.log(name + " "+ age);
    }

    
}