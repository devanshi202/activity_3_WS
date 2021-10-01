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
    let max=0; let name ="";
    for(let i=0; i<elementArr.length; i++){
        let tdarr = selectorTool(elementArr[i]).find("td");
        
        let wicket = selectorTool(tdarr[4]).text();
        if(wicket>max){
            max= wicket;
            name = selectorTool(tdarr[0]).text();
        }
    }
    console.log(name + " "+ max);
}