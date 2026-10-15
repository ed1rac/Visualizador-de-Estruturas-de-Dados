"""
Launcher do Visualizador de Estruturas de Dados e Algoritmos v2.0.0
Inicia um servidor local seguro e abre o navegador automaticamente.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

def main():
    # Muda para o diretório atual do script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    port = 8000
    httpd = None

    # Tenta portas de 8000 a 8050
    for p in range(8000, 8050):
        try:
            handler = http.server.SimpleHTTPRequestHandler
            httpd = socketserver.TCPServer(("", p), handler)
            port = p
            break
        except OSError:
            continue

    if not httpd:
        print("Erro: Nenhuma porta disponivel entre 8000 e 8050.")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 65)
    print("  Visualizador de Estruturas de Dados & Algoritmos v2.0.0")
    print("=" * 65)
    print(f"  Servidor HTTP local ativo em: {url}")
    print("  Abrindo automaticamente no seu navegador padrao...")
    print("  (Pressione Ctrl + C no terminal quando desejar encerrar)")
    print("=" * 65)

    webbrowser.open(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado com sucesso.")
        httpd.server_close()

if __name__ == '__main__':
    main()
