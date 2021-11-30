function createNewsHtml(news) {
    var newsComponent = ''
  
  newsComponent += '<div class="single-price-table d-flex align-items-centerjustify-content-between">'
  newsComponent += '<div class="p-content d-flex align-items-center">'
  newsComponent += '<span>'+ news.coin_id +'</span>'
  newsComponent += '<img src="'+ news.coin_id +'" alt="">'
  newsComponent += '<p>'+ news.name +' <span>'+ news.symbol +'</span></p>'
  newsComponent += '</div>'
  newsComponent += '<div class="price decrease">'
  newsComponent += '<p>'+ news.price +'</p>'
  newsComponent +=  '</div>'
  newsComponent +=  '</div>'
    return newsComponent
}



function loadCoins() {
  const url_coins = 'https://criptuscraw.github.io/Criptos/output/google-news.json'
  var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', url_coins, true);
    req.onload  = function() {
       const newsJson = JSON.parse(req.responseText);
       var text = ''
       // for (let i = 0; i < newsJson.length; i++) {
       for (let i = 0; i < 6; i++) {
           text +=  createNewsHtml(newsJson[i])
       }
       document.getElementById("news-content").innerHTML = text
    };
    req.send(null);
}

loadCoins()
