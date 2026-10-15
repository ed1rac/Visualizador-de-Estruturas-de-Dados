# 🚀 Visualizador de Estruturas de Dados & Algoritmos (v2.1.0)

> **Reconstrução, Modernização e Extensão** do aplicativo educacional clássico `visualization.jar` (originalmente desenvolvido pelo Prof. David Galles na University of San Francisco - USFCA).
> 
> 🌐 **100% Estático:** Roda totalmente no navegador (Client-Side), pronto para **GitHub Pages**, Vercel, Netlify ou uso offline!

---

## 📖 Sobre o Projeto

Este projeto foi recriado a partir da análise detalhada por **Engenharia Reversa (REA)** do software legado em Java. Ele transforma uma aplicação desktop Swing de 2006 em uma moderna plataforma interativa para ensino e aprendizado de Estruturas de Dados e Algoritmos.

### 🌟 Destaques da Versão 2.1.0:

1. **Barra de Status com Badges Didáticos:**
   - Exibição categorizada das rotações AVL: `[ROTAÇÃO SIMPLES À DIREITA (LL)]`, `[ROTAÇÃO SIMPLES À ESQUERDA (RR)]`, `[ROTAÇÃO DUPLA ESQUERDA-DIREITA (LR)]` e `[ROTAÇÃO DUPLA DIREITA-ESQUERDA (RL)]`.
   - Identificação dos casos da Árvore Rubro-Negra: `[RECOLORAÇÃO (CASO 1: Tio Vermelho)]`, `[ROTAÇÃO (CASO 2: Joelho)]` e `[ROTAÇÃO E RECOLORAÇÃO (CASO 3: Reta)]`.

2. **Árvores AVL com Fator de Balanço Customizável:**
   - Exibição em tempo real de altura e $FB$ em cada nó.
   - Alternância entre as convenções didáticas:
     - **Esquerda - Direita:** $\text{Altura(Esq)} - \text{Altura(Dir)}$ (padrão em livros no Brasil, ex: Ziviani/Szwarcfiter).
     - **Direita - Esquerda:** $\text{Altura(Dir)} - \text{Altura(Esq)}$ (padrão internacional, ex: Cormen/CLRS).

3. **Árvores Rubro-Negras (Red-Black Trees):**
   - Cores reais (Vermelho e Preto) com controle visual estrito das 5 propriedades invariantes.
   - Opção para **Mostrar ou Ocultar nós NIL (folhas pretas)**.
   - Animação passo a passo de inserção, recolorações (tio vermelho) e rotações (tio preto).

4. **Todas as Estruturas Lineares (LIFO, FIFO e Encadeada):**
   - **Pilha (Stack):** Operações `Push`, `Pop` e apontador de `TOPO`.
   - **Fila (Queue):** Operações `Enqueue` (Rear) e `Dequeue` (Front) com animação de fluxo.
   - **Lista Encadeada Simples:** Inserção e remoção no Início (Head) ou Fim (Tail), busca nó a nó e ponteiros dinâmicos apontando para `NULL`.

5. **Programação Dinâmica Completa:**
   - **Fibonacci:** Abordagem iterativa bottom-up em $O(n)$.
   - **Mochila 0/1 (0/1 Knapsack):** Matriz 2D comparando decisões de inclusão e exclusão com backtracking dos itens ótimos.
   - **Problema do Troco Mínimo (Coin Change):** Vetor 1D calculando a quantidade mínima de moedas.

6. **Interatividade Total em Grafos:**
   - Inserção manual de **Vértices** com rótulos customizados.
   - Inserção manual de **Arestas Ponderadas** selecionando origem, destino e peso.
   - Gerador de grafos aleatórios com distribuição orgânica (formatos geométricos variados a cada clique).

7. **Ordenação com Sentido Duplo e Pseudocódigos Dinâmicos:**
   - Ordenação **Crescente (Ascendente)** e **Decrescente (Descendente)** para Bubble Sort, Selection Sort, Insertion Sort e Quick Sort.
   - O painel lateral (gaveta) atualiza dinamicamente o **pseudocódigo**, a **explicação teórica** e a **tabela Big-O** de acordo com o algoritmo selecionado.

8. **Zoom & Pan Infinito em Todos os Módulos:**
   - Botões flutuantes: **Zoom In (+)**, **Zoom Out (-)** e **Reset / 100%**.
   - Suporte a scroll com a roda do mouse (*mouse wheel*) com foco no cursor.
   - Arrastar com o mouse (*drag to pan*) para navegar livremente.

9. **Multi-idioma Nativo (i18n):**
   - 🇧🇷 **Português (pt-BR)** | 🇺🇸 **Inglês (en)** | 🇪🇸 **Espanhol (es)**.

10. **Linha do Tempo Bidirecional:**
    - Reproduzir / Pausar / **Voltar Passo (Step Backward - ⏮)** / Avançar Passo / Velocidade ajustável.

---

## 🌐 Publicação no GitHub Pages

Este projeto é 100% estático e não requer servidor backend:
1. Crie um repositório no GitHub chamado **`Visualizador-de-Estruturas-de-Dados`**.
2. Faça o push dos arquivos desta pasta (`git push -u origin main`).
3. No GitHub, vá em **Settings** > **Pages** e em **Branch** selecione `main` e `/ (root)`.
4. O visualizador estará publicado e acessível publicamente em `https://<seu-usuario>.github.io/Visualizador-de-Estruturas-de-Dados/`.

---

## 📂 Estrutura de Arquivos

```
visualizador-v2/
├── index.html            # Interface principal da aplicação
├── start.bat             # Inicializador rápido para Windows (um clique)
├── README.md             # Este manual de uso
├── CHANGELOG.md          # Histórico detalhado de versões e melhorias
├── css/
│   └── styles.css        # Estilos modernos com suporte a tema Claro/Escuro
└── js/
    ├── app.js            # Controlador central da aplicação
    ├── i18n.js           # Dicionário multilíngue (pt-BR, en, es)
    ├── core/
    │   ├── canvas.js     # Motor de renderização vetorial com Zoom e Pan
    │   └── animator.js   # Motor de linha do tempo e animações reversíveis
    └── algorithms/
        ├── trees.js      # Árvores AVL, Rubro-Negra, BST
        ├── arrays.js     # Algoritmos de Arrays (Buscas, Janela, Kadane, etc.)
        ├── sorting.js    # Ordenações (Bubble, Selection, Insertion, Quick...)
        ├── graphs.js     # Grafos (BFS, DFS, Dijkstra, Prim, Kruskal...)
        └── others.js     # Pilhas, Filas, Heaps, Hashing, Prog. Dinâmica
```

---

## ⚡ Como Executar

Não é necessária nenhuma instalação complexa (Node.js, build tools ou JRE).

### Opção 1 (Mais Simples):
Dê um duplo clique no arquivo **`start.bat`** (ou dê dois cliques diretamente no arquivo **`index.html`**). O visualizador abrirá instantaneamente em seu navegador padrão (Google Chrome, Microsoft Edge, Firefox, etc.).

### Opção 2 (Via Servidor Local):
Se preferir rodar via HTTP local, abra o terminal nesta pasta e execute:
```bash
python -m http.server 8000
```
E acesse `http://localhost:8000` no navegador.
