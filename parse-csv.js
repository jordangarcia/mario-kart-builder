//Converter Class 
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");
 

function writeFile(name) {
  var csvFileName="./" + name + ".csv";
  var fileStream=fs.createReadStream(csvFileName);
  //new converter instance 
  var csvConverter=new Converter({constructResult:true});

  //end_parsed will be emitted once parsing finished 
  csvConverter.on("end_parsed",function(jsonObj){
    var fs = require('fs');
    var output = "./" + name + ".json";
    var contents = JSON.stringify(jsonObj, null, "  ");
    fs.writeFile(output, contents, function(err) {
      if(err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
  });

  //read from file
  fileStream.pipe(csvConverter);
}

['karts', 'wheels', 'gliders'].forEach(writeFile);
