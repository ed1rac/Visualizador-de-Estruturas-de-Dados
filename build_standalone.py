import os

base_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(base_dir, 'index.html'), 'r', encoding='utf-8') as f:
    html = f.read()

with open(os.path.join(base_dir, 'css', 'styles.css'), 'r', encoding='utf-8') as f:
    css = f.read()

with open(os.path.join(base_dir, 'bundle.js'), 'r', encoding='utf-8') as f:
    js = f.read()

html = html.replace('<link rel="stylesheet" href="css/styles.css">', f'<style>\n{css}\n</style>')
html = html.replace('<script src="bundle.js"></script>', f'<script>\n{js}\n</script>')

target = os.path.join(base_dir, 'visualizador-standalone.html')
with open(target, 'w', encoding='utf-8') as f:
    f.write(html)

print('Success! Generated standalone file with length:', len(html))
