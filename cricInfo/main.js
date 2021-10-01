let request = require("request");
let cheerio = require("cheerio");
let playerData = require("./data");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request (url, cb1);
function cb1(err, res, html){
    if(err){
        console.log(err);
    }else if(res.statusCode == 404){
        console.log("page not found");
    }else{
        getAllMatches(html);
    }
}

function getAllMatches(html){
    let searchTool = cheerio.load(html);
    let viewAllMatches = searchTool(".widget-items.cta-link");
    let allMatchPage = searchTool(viewAllMatches).find("a");
    let allMatchPageLink = allMatchPage.attr("href");
    let compLink1 = `https://www.espncricinfo.com${allMatchPageLink}`;
    request(compLink1, cb2);

}

function cb2(err, res, html){
    if(err){
        console.log(err);
    }else if(res.statusCode == 404){
        console.log("page not found");
    }else{
        getAllScorecards(html);
    }
}

function getAllScorecards(html){
    let searchTool = cheerio.load(html);
    let scorecardArr = searchTool(`.match-cta-container a[data-hover="Scorecard"]`);
    for(let i=0; i<scorecardArr.length; i++){
        let halfLink= searchTool(scorecardArr[i]).attr("href");
        let linkToEachMatch = `https://www.espncricinfo.com${halfLink}`;
        request(linkToEachMatch, cb3);
    }
}

function cb3(err, res, html){
    if(err){
        console.log(err);
    }else if(res.statusCode == 404){
        console.log("page not found");
    }else{
        playerData.fxn(html);
    }
}