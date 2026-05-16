import urllib.request, re

def get_images(query):
    url = f'https://wallpapercave.com/search?q={query.replace(" ", "+")}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode()
        matches = re.findall(r'src="(/wp/[^"]+\.jpg)"', html)
        return ['https://wallpapercave.com' + m for m in matches[:3]]
    except Exception as e: return []

print('Messi:', get_images('messi world cup aesthetic'))
print('Ronaldo:', get_images('cristiano ronaldo real madrid aesthetic'))
print('Neymar:', get_images('neymar aesthetic'))
print('Maldini:', get_images('paolo maldini aesthetic'))
print('Jersey Rack:', get_images('football jersey collection'))
print('Retro Jersey:', get_images('retro football shirt'))
print('Stadium:', get_images('stadium cinematic aesthetic'))
print('Hero:', get_images('football tunnel cinematic aesthetic'))
