function createNewsHtml(news) {
    var newsComponent = ''

    newsComponent += '<div class="col-12 col-lg-6">'
    newsComponent += '<div class="single-blog-area d-flex align-items-start">'
    newsComponent += '<div class="blog-thumbnail">'
    newsComponent += '<img src="'+ news.image +'" alt="">'
    newsComponent += '</div>'

    newsComponent += '<div class="blog-content">'
    newsComponent += '<a href="'+ news.url +'" class="post-title" target="_blank">'+ news.title +'</a>'
    newsComponent += '<div class="meta-data">'
    newsComponent += '<a href="#">'+ news.source +'</a> | '
    newsComponent += '<a href="#">'+ news.time +'</a>'
    newsComponent += '</div>'
    newsComponent += '</div>'
    newsComponent += '</div>'
    newsComponent += '</div>'

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
       for (let i = 0; i < length; i++) {
           text +=  createNewsHtml(newsJson[i])
       }
       document.getElementById("news-content").innerHTML = text
    };
    req.send(null);
}

loadCoins()
