const https = require('https');

function search(query) {
  return new Promise((resolve) => {
    https.get('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query + ' pinterest.com aesthetic wallpaper'), (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = data.match(/src="\/\/external-content\.duckduckgo\.com\/iu\/\?u=([^&"]+)/g);
        if (matches && matches.length > 0) {
          const rawUrl = decodeURIComponent(matches[0].split('=')[1]);
          console.log(query + ':', rawUrl);
        } else {
          console.log(query + ':', 'None');
        }
        resolve();
      });
    });
  });
}

async function run() {
  await search('messi world cup');
  await search('cristiano ronaldo real madrid');
  await search('neymar brazil');
  await search('paolo maldini ac milan');
  await search('football jersey rack aesthetic');
  await search('retro football jersey aesthetic');
  await search('football stadium cinematic aesthetic');
  await search('national football team aesthetic');
  await search('football player edition jersey aesthetic');
}
run();
