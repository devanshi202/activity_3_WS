let request = require("request");
console.log("before");
request('http://www.google.com', cb);
function cb(error, response, html) {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', html); // Print the HTML for the Google homepage.
    if(error){
        console.log('error:', error);
    }else if(response.statusCode==404){
        console.log("page not found");
    }else{
        console.log("html:");
    }

}

console.log("after");