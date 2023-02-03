
function ajaxHandler() {
    let apiKey = "71950b8e9ba0353f6b1800939888da14";
    let apiKey2 = "4404babe01516afc672a8067f95cbabb";
    let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"    
      }).then(function(response) {
        console.log(response);    
      })

};

ajaxHandler();