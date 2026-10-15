"""
Build script to compile all ES Modules in js/ into bundle.js and visualizador-standalone.html
"""

import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))
js_dir = os.path.join(base_dir, 'js')

files_order = [
    ('i18n.js', os.path.join(js_dir, 'i18n.js')),
    ('canvas.js', os.path.join(js_dir, 'core', 'canvas.js')),
    ('animator.js', os.path.join(js_dir, 'core', 'animator.js')),
    ('trees.js', os.path.join(js_dir, 'algorithms', 'trees.js')),
    ('arrays.js', os.path.join(js_dir, 'algorithms', 'arrays.js')),
    ('sorting.js', os.path.join(js_dir, 'algorithms', 'sorting.js')),
    ('graphs.js', os.path.join(js_dir, 'algorithms', 'graphs.js')),
    ('others.js', os.path.join(js_dir, 'algorithms', 'others.js')),
    ('app.js', os.path.join(js_dir, 'app.js')),
]

bundle_parts = [
    "// Bundled Data Structures & Algorithms Visualizer v2.0.0 (Standalone No-Module)\n"
]

for label, fpath in files_order:
    bundle_parts.append(f"\n// ==================== {label} ====================\n")
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strip out ES Module imports: `import ... from '...';`
    content = re.sub(r'^\s*import\s+.*?from\s+[\'"].*?[\'"];?\s*$', '', content, flags=re.MULTILINE)
    # Strip out `export const ` -> `const `
    content = re.sub(r'^\s*export\s+const\s+', 'const ', content, flags=re.MULTILINE)
    # Strip out `export class ` -> `class `
    content = re.sub(r'^\s*export\s+class\s+', 'class ', content, flags=re.MULTILINE)
    # Strip out `export function ` -> `function `
    content = re.sub(r'^\s*export\s+function\s+', 'function ', content, flags=re.MULTILINE)
    # Strip out `export default `
    content = re.sub(r'^\s*export\s+default\s+', '', content, flags=re.MULTILINE)

    bundle_parts.append(content)

bundled_code = "\n".join(bundle_parts)

bundle_path = os.path.join(base_dir, 'bundle.js')
with open(bundle_path, 'w', encoding='utf-8') as f:
    f.write(bundled_code)
print(f"Generated bundle.js successfully! ({len(bundled_code)} bytes)")

# Now generate visualizador-standalone.html
index_path = os.path.join(base_dir, 'index.html')
css_path = os.path.join(base_dir, 'css', 'styles.css')
standalone_path = os.path.join(base_dir, 'visualizador-standalone.html')

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

html = html.replace('<link rel="stylesheet" href="css/styles.css">', f'<style>\n{css}\n</style>')
html = html.replace('<script src="bundle.js"></script>', f'<script>\n{bundled_code}\n</script>')

with open(standalone_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Generated visualizador-standalone.html successfully! ({len(html)} bytes)")
