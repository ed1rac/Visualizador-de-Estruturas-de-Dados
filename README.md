# 🚀 Visualizador de Estruturas de Dados & Algoritmos (v2.2.0)

> **Reconstrução, Modernização e Extensão** do aplicativo educacional clássico `visualization.jar` (originalmente desenvolvido pelo Prof. David Galles na University of San Francisco - USFCA).
> 
> 🌐 **Multiplataforma:** Versão Web Online (Vercel & GitHub Pages) + Aplicativo Desktop nativo para Windows (`.exe`) + Arquivo único Standalone (`.html`) para uso offline em qualquer sistema!

---

## 🎯 Modos de Acesso e Uso

O projeto foi projetado para oferecer máxima acessibilidade e simplicidade tanto para professores em sala de aula quanto para estudantes em laboratório ou em casa:

| Modo | Formato | Como Acessar / Usar | Plataformas |
| :--- | :--- | :--- | :--- |
| **🌐 Web Online (Vercel)** | Nuvem / Edge | [visualizador-estruturas.vercel.app](https://visualizador-estruturas.vercel.app) *(versão completa com Modo Exercícios & Auditoria)* | Qualquer navegador moderno (Computador, Celular, Tablet) |
| **🌐 Web Online (GitHub Pages)** | GitHub Pages | [Acessar no GitHub Pages](https://ed1rac.github.io/Visualizador-de-Estruturas-de-Dados/) diretamente no navegador | Qualquer navegador moderno (Windows, Mac, Linux, Celular/Tablet) |
| **📦 Desktop Portátil** | `.exe` (~74 MB) | Baixar na [Aba Releases](https://github.com/Ed1rac/Visualizador-de-Estruturas-de-Dados/releases) e dar duplo clique (não requer instalação nem privilégios de administrador) | Windows 10 / 11 (64-bit) |
| **💿 Desktop Instalador** | `.exe` (~81 MB) | Baixar na [Aba Releases](https://github.com/Ed1rac/Visualizador-de-Estruturas-de-Dados/releases) e instalar com atalhos no Menu Iniciar e Área de Trabalho | Windows 10 / 11 (64-bit) |
| **📄 Arquivo Único Standalone** | `.html` (~225 KB) | Baixar o arquivo `visualizador-standalone.html` e abrir com duplo clique no navegador, 100% offline | Qualquer sistema (Windows, macOS, Linux) |

---

## 📖 Sobre o Projeto

Este software foi recriado a partir da análise detalhada por **Engenharia Reversa (REA)** do aplicativo legado em Java (`visualization.jar`). Ele transforma uma aplicação desktop Swing de 2006 em uma moderna plataforma interativa e responsiva, com foco no rigor didático para o ensino universitário de Ciência da Computação e Engenharia.

### 🌟 Destaques e Recursos (v2.2.0):

1. **Recolhimento do Menu Lateral ("Estruturas Principais"):**
   - Botão **☰ Menu** no cabeçalho superior e botão **◀** no menu lateral para ocultar/mostrar a barra de navegação com 1 clique, maximizando a área de visualização das estruturas de dados com redimensionamento fluido automático do canvas.

2. **Árvores-B com Ordens Flexíveis (M = 3 a 8) e Metadados em Tempo Real:**
   - Suporte dinâmico a ordens customizáveis: **M=3 (Árvore 2-3)**, **M=4 (Árvore 2-3-4)**, **M=5**, **M=6**, **M=7** e **M=8**.
   - Exibição em tempo real da quantidade mínima e máxima de chaves e filhos no cabeçalho e na barra de ferramentas.
   - Animação passo a passo de inserção com **Cisão (Split)** e **Promoção da Chave Mediana**, remoção com **Empréstimo/Rotação** e **Fusão (Merge)**.

3. **🎓 Modo Exercícios & Auditoria Expandido (Árvores-B, Listas Encadeadas e Grafos):**
   - **Árvores-B:** Diagnóstico automático de overflow de chaves sem split, underflow, violação de limites em subárvores e desequilíbrio na profundidade das folhas.
   - **Listas Encadeadas:** Detecção de ciclos acidentais em listas simples, inconsistência de ponteiros `prev != next` em listas duplas e ponteiros órfãos.
   - **Grafos:** Detecção de arestas com pesos negativos (incompatíveis com a premissa gulosa de Dijkstra), ciclos direcionados que impedem Ordenação Topológica (DAGs) e componentes desconexas.
   - **Modo Aluno (Gabarito Oculto):** Projeção para a turma responder ao desafio antes de revelar o diagnóstico oficial.

4. **Interatividade em Grafos (Laços/Self-Loops e Grafos Sem Peso):**
   - Suporte intuitivo a **Laços (Self-Loops)**: Arestas ligadas ao próprio vértice com arco circular e suporte a peso/direção.
   - Alternância facilitada entre **Grafo Ponderado** e **Grafo Não-Ponderado (sem pesos)** com checkbox "☑ Ponderado".
   - Execução transparente de **BFS** e **Dijkstra** em grafos ponderados ou não-ponderados.

5. **Árvores AVL com Fator de Balanceamento Customizável:**
   - Padronização rigorosa da terminologia para **Fator de Balanceamento (FB)** em toda a interface e documentação.
   - Alternância entre convenções: $\text{Altura(Esq)} - \text{Altura(Dir)}$ [Tradicional PT/BR] e $\text{Altura(Dir)} - \text{Altura(Esq)}$ [Cormen/CLRS].

6. **Explicações Teóricas e Pseudocódigos Dinâmicos Corrigidos:**
   - Painel explicativo e de complexidade específico para a **Árvore-B**, eliminando texto residual da AVL.
   - Explicação dedicada e pseudocódigo em vetor 1D para o **Problema do Troco Mínimo (Coin Change)**.

12. **Todas as Estruturas Lineares (LIFO, FIFO e Encadeada):**
   - **Pilha (Stack):** Operações `Push`, `Pop` e apontador de `TOPO`.
   - **Fila (Queue):** Operações `Enqueue` (Rear) e `Dequeue` (Front) com animação de fluxo e tratamento de underflow.
   - **Lista Encadeada Simples:** Inserção e remoção no Início (Head) ou Fim (Tail), busca nó a nó e ponteiros dinâmicos apontando para `NULL`.

12. **Programação Dinâmica Completa:**
   - **Fibonacci:** Abordagem iterativa bottom-up em $O(n)$.
   - **Mochila 0/1 (0/1 Knapsack):** Matriz 2D comparando decisões de inclusão e exclusão com *backtracking* dos itens ótimos.
   - **Problema do Troco Mínimo (Coin Change):** Vetor 1D calculando a quantidade mínima de moedas.

12. **Interatividade Total em Grafos:**
   - Inserção manual de **Vértices** com rótulos customizados.
   - Inserção manual de **Arestas Ponderadas** selecionando origem, destino e peso.
   - Gerador de grafos aleatórios com distribuição orgânica (formatos geométricos variados a cada clique), além de **BFS** e **Dijkstra**.

12. **Ordenação com Sentido Duplo e Pseudocódigos Dinâmicos:**
   - Ordenação **Crescente (Ascendente)** e **Decrescente (Descendente)** para Bubble Sort, Selection Sort, Insertion Sort e Quick Sort.
   - O painel lateral (gaveta) atualiza dinamicamente o **pseudocódigo**, a **explicação teórica** e a **tabela Big-O** de acordo com o algoritmo selecionado.

12. **Zoom & Pan Infinito em Todos os Módulos:**
   - Botões flutuantes: **Zoom In (+)**, **Zoom Out (-)** e **Reset / 100%**.
   - Suporte a scroll com a roda do mouse (*mouse wheel*) com foco no cursor.
   - Arrastar com o mouse (*drag to pan*) para navegar livremente por árvores profundas e grafos extensos.

12. **Multi-idioma Nativo (i18n):**
   - 🇧🇷 **Português (pt-BR)** | 🇺🇸 **Inglês (en)** | 🇪🇸 **Espanhol (es)** + Alternância de Tema Claro/Escuro.

12. **Linha do Tempo Bidirecional:**
    - Reproduzir / Pausar / **Voltar Passo (Step Backward - ⏮)** / Avançar Passo / Controle de velocidade / Estruturas iniciam zeradas.

12. **🎓 Modo Exercícios & Auditoria de Árvores:**
    - Construção livre de árvores para criar intencionalmente estruturas com erros para desafios e aulas.
    - Diagnóstico automático e em tempo real de violações de invariantes em Árvores Binárias de Busca (ABB), AVL, Rubro-Negras e Heaps.
    - Modo Gabarito Oculto (Modo Aluno) para projeção em sala de aula e Modo Gabarito Revelado com as correções e rotações necessárias.
    - Biblioteca de 12 pegadinhas de prova e exercícios pré-configurados com 1 clique.

---

## 📂 Estrutura do Repositório

```
visualizador-v2/
├── index.html                     # Ponto de entrada Web (GitHub Pages & Vercel) e Desktop
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
        ├── btree.js               # Árvore-B (Multiway, Cisão, Fusão, Rotação)
        ├── treeAuditor.js         # Auditoria de invariantes e exercícios de sala de aula
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

---

## ☕ Apoie o Projeto (Me Pague um Café / Buy Me a Coffee)

Este projeto é desenvolvido com dedicação e carinho. Se este projeto foi útil para os seus estudos, trabalho ou produtividade diária e você quiser apoiar o desenvolvimento contínuo:

- ☕ **Buy Me a Coffee (Internacional / Cartão / QR Code)**:
  - 👉 **[https://buymeacoffee.com/edkallenn](https://buymeacoffee.com/edkallenn)**
  - [![](https://img.shields.io/badge/☕_Buy_Me_a_Coffee-Apoiar_Projeto-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/edkallenn)
  - Escaneie o QR Code abaixo com a câmera do celular para abrir diretamente:

<div align="center">
  <a href="https://buymeacoffee.com/edkallenn" target="_blank">
    <img src="./bmc_qr.png" alt="Buy Me a Coffee QR Code — Edkallenn (@ed1rac)" width="220" />
  </a>
</div>

- 🇧🇷 **PIX (Brasil — Qualquer valor, taxa zero)**:
  - **Chave PIX (E-mail)**: `edkevan@gmail.com`
  - **Titular**: Edkallenn Silva de Lima

Muito obrigado pelo apoio! 🚀

---
