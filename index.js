const { Webhook } = require('discord-webhook-node');
const discordHook = new Webhook("DISCORD KANALI WEBHOOK BURAYA");
const open = require('open');
 
const webhookAvatar = 'https://i.pinimg.com/474x/15/9b/5c/159b5c7a9f0b097bbed833e2a50483cb--countries-around-the-world-around-the-worlds.jpg';
discordHook.setUsername('Bershka Stok Kontrol');
discordHook.setAvatar(webhookAvatar);

const urunApiLinkleri = [
'https://www.bershka.com/itxrest/2/catalog/store/44109521/40259537/product/114209936/stock',
'https://www.bershka.com/itxrest/2/catalog/store/44109521/40259537/product/114209936/stock'
];

const urunLinkleri = [
'https://www.bershka.com/tr/oversize-%C5%9Fi%C5%9Fme-mont-c0p114209936.html?colorId=700',
'https://www.bershka.com/tr/oversize-%C5%9Fi%C5%9Fme-mont-c0p114209936.html?colorId=700'
];

const urunIsimleri = [
'Kahverengi şişme mont [S]',
'Kahverengi şişme mont [M]'
];

const urunBedenleri = [
'13',
'14'
];

var bildirimDurdur = 0;

urunApiLinkleri.forEach((urunApiLinkleri, index) => {
  const urunIsim = urunIsimleri[index];
  const urunBeden = urunBedenleri[index];
  const urunLink = urunLinkleri[index];
  
  setInterval(function() {
		var url = urunApiLinkleri;
		var XMLHttpRequest = require('xhr2');
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST');
		xhr.setRequestHeader("Access-Control-Allow-Headers", "accept, content-type");
		xhr.setRequestHeader("Access-Control-Max-Age", "1728000");
		xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36");

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log(xhr.status);
				const obj = JSON.parse(xhr.responseText);
			  
				if(obj['stocks'][0]['stocks'][urunBeden]['availability'] !== "out_of_stock" ){
					if(bildirimDurdur == 0){
						discordHook.send(urunIsim + " için stok geldi "+ urunLink);
						bildirimDurdur = 1;
						setTimeout(function() {
							bildirimDurdur = 0;
						}, 3600000);
						console.log(urunIsim + " stoğa girdi");
						(async () => {
							await open(urunLink, {app: ['google chrome', '--incognito']});
						})();
					}
				}else{
					console.log(urunIsim + " stokta mevcut değil");
					
				}
			}};
			xhr.send();
	}, 15000);
});
