let path = require("path");
let xlsx = require("xlsx");
let fs = require("fs");
let cheerio = require("cheerio");

function playerData(html){
    let searchTool = cheerio.load(html);
    let teamNameArr = searchTool(".header-title.label"); 
    let team1 = teamNameArr[0].text().split("INNINGS");
    let team2 = teamNameArr[1].text().split("INNINGS");
    let team1name= team1[0].trim();
    let team2name = team2[0].trim();
    let teams = [team1name, team2name];

    let tables = searchTool(".table.batsman");
    let dirPath = path.join(__dirname, "playersData");
    fs.mkdirSync(dirPath);

    for(let i=0; i<tables.length; i++){

        let tableRows = searchTool(tables[i]).find("tbody tr");

        for(let j=0; j<tableRows.length; j++){

            let tableData = searchTool(tableRows[i]).find("td");

            if(tableData.length==8){

                let batsmanNameArr = searchTool(tableData[0]).find("a").text().split("\n");
                let batsmanName=batsmanNameArr[0].trim();

                let runs = tableData[2].text();
                let balls= tableData[3].text();
                let fours = tableData[5].text();
                let sixes = tableData[6].text();

                let obj={
                    "Match Name": `${team1name} v/s ${team2name}`,
                    "Team Name":teams[i],//check
                    "Runs": runs,
                    "Balls": balls,
                    "Fours":fours,
                    "Sixes":sixes
                }
                
                let playerFilePath = path.join(dirPath, `${batsmanName}.json`);

                if(fs.existsSync(playerFilePath)){

                    let fileArr = fs.readFileSync(playerFilePath);
                    fileArr.push(obj);
                    fs.writeFileSync(playerFilePath, fileArr);

                }else{

                    let playerDataArr=[];
                    playerDataArr.push(obj);
                    fs.writeFileSync(playerFilePath, playerDataArr);

                }
                
            }
        }
    }
    
}


module.exports={
    fxn : playerData
}