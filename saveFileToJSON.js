const fs = require('fs');

const saveToJSON = result =>{
    let jsonData= JSON.stringify(result);
    fs.writeFile("resultset.json",jsonData, error=>{
        if(error){
            console.log("ERROR! :", error);
        }else{
            console.log("JSON file is successfully saved.");
        }
    })
}

module.exports={
    saveFile: saveToJSON
}