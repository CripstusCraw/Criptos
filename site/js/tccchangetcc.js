var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
   


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

function createCriptoHtml(cripto) {
    var newsComponent = ''
    debugger
    
    newsComponent += '<div class="col-12 col-lg-6">'
    newsComponent += '<div class="cryptos-prices-table">'                        
    newsComponent += '<div class="single-price-table d-flex align-items-center justify-content-between">'
    newsComponent += '<div class="p-content d-flex align-items-center">'
    //newsComponent += '<span>'+ cripto.coin_id +'</span>'
    newsComponent += '<img src="https://s2.coinmarketcap.com/static/img/coins/64x64/'+ cripto.coin_id +'.png" alt="" width="29" height="29" >'
    newsComponent += '<p>'+ cripto.name +' &nbsp; <span>'+ cripto.symbol +'</span></p>'
    newsComponent += '</div>'
    newsComponent += '<div class="price increase">'
    newsComponent += '<p>'+ formatter.format(cripto.price_BRL); +'</p>'
    newsComponent += '</div>'
    newsComponent += '</div>'
    newsComponent += '</div>'
    newsComponent += '</div>'
   
  
    return newsComponent
  }
  function loadCoins(all) {
    const url_coins = 'https://criptuscraw.github.io/Criptos/output/coinmarketcap.json'
    var req = new XMLHttpRequest();
      req.overrideMimeType("application/json");
      req.open('GET', url_coins, true);
      req.onload  = function() {
         const criptoJson = JSON.parse(req.responseText);
         var text = ''

         if (all) {
            for (let i = 0; i < criptoJson.length; i++) {
                
                    text +=  createCriptoHtml(criptoJson[i])
                }

         }else {
         
         for (let i = 0; i < 10; i++) {
             text +=  createCriptoHtml(criptoJson[i])
         }
        }
         document.getElementById("cripto-content").innerHTML = text
      };
      req.send(null);
  }
  
 

function loadNews(all) {
  const url_coins = 'https://criptuscraw.github.io/Criptos/output/google-news.json'
  var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', url_coins, true);
    req.onload  = function() {
       const newsJson = JSON.parse(req.responseText);
       const newsJsonS=shuffle(newsJson);
       var text = ''
       if (all) {
        for (let i = 0; i < newsJson.length; i++) {
            
                text +=  createNewsHtml(newsJsonS[i])
            }

     }else {// for (let i = 0; i < newsJson.length; i++) {
       for (let i = 0; i < 6; i++) {
           text +=  createNewsHtml(newsJsonS[i])
       }
       }
       document.getElementById("news-content").innerHTML = text
    };
    req.send(null);
}


