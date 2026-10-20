# 🚀 Visualizador de Estruturas de Dados & Algoritmos (v2.1.0)

> **Reconstrução, Modernização e Extensão** do aplicativo educacional clássico `visualization.jar` (originalmente desenvolvido pelo Prof. David Galles na University of San Francisco - USFCA).
> 
> 🌐 **Multiplataforma:** Versão Web Online (GitHub Pages) + Aplicativo Desktop nativo para Windows (`.exe`) + Arquivo único Standalone (`.html`) para uso offline em qualquer sistema!

---

## 🎯 Modos de Acesso e Uso

O projeto foi projetado para oferecer máxima acessibilidade e simplicidade tanto para professores em sala de aula quanto para estudantes em laboratório ou em casa:

| Modo | Formato | Como Acessar / Usar | Plataformas |
| :--- | :--- | :--- | :--- |
| **🌐 Web Online** | GitHub Pages | [Acessar Online](https://ed1rac.github.io/Visualizador-de-Estruturas-de-Dados/) diretamente no navegador | Qualquer navegador moderno (Windows, Mac, Linux, Celular/Tablet) |
| **📦 Desktop Portátil** | `.exe` (~74 MB) | Baixar na [Aba Releases](https://github.com/Ed1rac/Visualizador-de-Estruturas-de-Dados/releases) e dar duplo clique (não requer instalação nem privilégios de administrador) | Windows 10 / 11 (64-bit) |
| **💿 Desktop Instalador** | `.exe` (~81 MB) | Baixar na [Aba Releases](https://github.com/Ed1rac/Visualizador-de-Estruturas-de-Dados/releases) e instalar com atalhos no Menu Iniciar e Área de Trabalho | Windows 10 / 11 (64-bit) |
| **📄 Arquivo Único Standalone** | `.html` (~225 KB) | Baixar o arquivo `visualizador-standalone.html` e abrir com duplo clique no navegador, 100% offline | Qualquer sistema (Windows, macOS, Linux) |

---

## 📖 Sobre o Projeto

Este software foi recriado a partir da análise detalhada por **Engenharia Reversa (REA)** do aplicativo legado em Java (`visualization.jar`). Ele transforma uma aplicação desktop Swing de 2006 em uma moderna plataforma interativa e responsiva, com foco no rigor didático para o ensino universitário de Ciência da Computação e Engenharia.

### 🌟 Destaques e Recursos (v2.1.0):

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
   - **Fila (Queue):** Operações `Enqueue` (Rear) e `Dequeue` (Front) com animação de fluxo e tratamento de underflow.
   - **Lista Encadeada Simples:** Inserção e remoção no Início (Head) ou Fim (Tail), busca nó a nó e ponteiros dinâmicos apontando para `NULL`.

5. **Programação Dinâmica Completa:**
   - **Fibonacci:** Abordagem iterativa bottom-up em $O(n)$.
   - **Mochila 0/1 (0/1 Knapsack):** Matriz 2D comparando decisões de inclusão e exclusão com *backtracking* dos itens ótimos.
   - **Problema do Troco Mínimo (Coin Change):** Vetor 1D calculando a quantidade mínima de moedas.

6. **Interatividade Total em Grafos:**
   - Inserção manual de **Vértices** com rótulos customizados.
   - Inserção manual de **Arestas Ponderadas** selecionando origem, destino e peso.
   - Gerador de grafos aleatórios com distribuição orgânica (formatos geométricos variados a cada clique), além de **BFS** e **Dijkstra**.

7. **Ordenação com Sentido Duplo e Pseudocódigos Dinâmicos:**
   - Ordenação **Crescente (Ascendente)** e **Decrescente (Descendente)** para Bubble Sort, Selection Sort, Insertion Sort e Quick Sort.
   - O painel lateral (gaveta) atualiza dinamicamente o **pseudocódigo**, a **explicação teórica** e a **tabela Big-O** de acordo com o algoritmo selecionado.

8. **Zoom & Pan Infinito em Todos os Módulos:**
   - Botões flutuantes: **Zoom In (+)**, **Zoom Out (-)** e **Reset / 100%**.
   - Suporte a scroll com a roda do mouse (*mouse wheel*) com foco no cursor.
   - Arrastar com o mouse (*drag to pan*) para navegar livremente por árvores profundas e grafos extensos.

9. **Multi-idioma Nativo (i18n):**
   - 🇧🇷 **Português (pt-BR)** | 🇺🇸 **Inglês (en)** | 🇪🇸 **Espanhol (es)** + Alternância de Tema Claro/Escuro.

10. **Linha do Tempo Bidirecional:**
    - Reproduzir / Pausar / **Voltar Passo (Step Backward - ⏮)** / Avançar Passo / Controle de velocidade / Estruturas iniciam zeradas.

---

## 📂 Estrutura do Repositório

```
visualizador-v2/
├── index.html                     # Ponto de entrada Web (GitHub Pages) e Desktop
├── bundle.js                      # Código JavaScript unificado e otimizado
├── visualizador-standalone.html   # Versão completa e autossuficiente em arquivo único (HTML+CSS+JS)
├── electron-main.js               # Processo principal da aplicação Desktop Electron
├── package.json                   # Configurações de scripts e empacotamento desktop
├── start.bat                      # Inicializador rápido para Windows (servidor local)
├── open_app.ps1                   # Script PowerShell para execução rápida
├── README.md                      # Documentação completa do projeto
├── CHANGELOG.md                   # Histórico de versões e notas de lançamento
├── css/
│   └── styles.css                 # Estilos da interface (temas claro e escuro)
└── js/
    ├── app.js                     # Controlador principal da aplicação
    ├── i18n.js                    # Dicionário de traduções e pseudocódigos
    ├── core/
    │   ├── canvas.js              # Motor de desenho em Canvas 2D com Zoom e Pan
    │   └── animator.js            # Motor da linha do tempo com reversibilidade
    └── algorithms/
        ├── trees.js               # BST, AVL e Rubro-Negra
        ├── arrays.js              # Buscas, Dois Ponteiros, Janela, Kadane, Bandeira Holandesa
        ├── sorting.js             # Bubble, Selection, Insertion e Quick Sort
        ├── graphs.js              # BFS, Dijkstra e manipulação de vértices/arestas
        └── others.js              # Pilha, Fila, Lista Encadeada, Heaps, Hash e DP
```

---

## 💻 Desenvolvimento & Compilação Desktop (Electron)

Se desejar executar ou compilar o executável desktop localmente a partir do código-fonte:

### Pré-requisitos:
- [Node.js](https://nodejs.org/) (v18 ou superior) e `npm`.

### Comandos:
```bash
# 1. Instalar as dependências do Electron
npm install

# 2. Executar a aplicação desktop em modo de desenvolvimento
npm start

# 3. Gerar o executável Portátil (.exe) na pasta dist/
npm run dist:portable

# 4. Gerar o Instalador Windows (.exe) na pasta dist/
npm run dist:setup
```

Os executáveis gerados serão salvos no diretório `dist/`.

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo de licença ou cabeçalhos para mais informações.
