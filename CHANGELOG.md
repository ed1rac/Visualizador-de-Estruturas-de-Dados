# 📋 CHANGELOG - Visualizador de Estruturas de Dados & Algoritmos

## [2.2.0] - 2026-10-21
### Árvores-B Flexíveis, Auditoria Multi-Estrutura, Grafos Aprimorados e Melhorias de Espaço

1. **Recolhimento do Menu Lateral ("Estruturas Principais"):**
   - Implementado botão **☰ Menu** no cabeçalho superior e **◀** na barra lateral para recolher e expandir o menu com 1 clique.
   - O canvas recalcula suas dimensões e limites automaticamente, maximizando a área de exibição para estruturas profundas e volumosas.

2. **Árvores-B com Ordens Flexíveis (M = 3 a 8):**
   - Suporte a ordens configuráveis arbitrárias: **M=3 (Árvore 2-3)**, **M=4 (Árvore 2-3-4)**, **M=5**, **M=6**, **M=7** e **M=8**.
   - Exibição dinâmica em tempo real no cabeçalho e na barra de ferramentas dos limites teóricos de ocupação: chaves mínimas $\lceil M/2 \rceil - 1$, chaves máximas $M - 1$, e filhos mínimos e máximos.

3. **🎓 Expansão do Modo Exercícios e Auditoria:**
   - **Árvores-B:** Diagnóstico automático de overflow de chaves sem split, underflow sem empréstimo/fusão, violação de intervalos multiway entre subárvores e desequilíbrio na profundidade das folhas.
   - **Listas Encadeadas:** Diagnóstico de ciclos acidentais em listas lineares simples, inconsistência de ponteiros bidirecionais `prev != next` em listas duplas e ponteiros órfãos/inválidos.
   - **Grafos:** Deteção de arestas com peso negativo (que invalidam o algoritmo guloso de Dijkstra), ciclos direcionados que quebram Ordenação Topológica em DAGs e componentes desconexas.
   - 15 novos exercícios e cenários de desafio para projeção em sala de aula com Modo Aluno (Gabarito Oculto).

4. **Aprimoramentos em Grafos (Laços e Grafos Não-Ponderados):**
   - Suporte intuitivo a **Laços (Self-Loops)**: Arestas ligadas do vértice a ele mesmo com desenho em arco circular dedicado.
   - Opção para desenhar **Grafos Não-Ponderados** (sem exibir números/badges de pesos) via checkbox "☑ Ponderado".
   - Algoritmos de BFS e Dijkstra integrados e compatíveis com arestas com ou sem peso.

5. **Correção de Explicações e Pseudocódigos Dinâmicos:**
   - Adicionada explicação teórica, análise de complexidade e pseudocódigo dedicados da **Árvore-B** no painel lateral (eliminando texto residual da AVL).
   - Corrigido o chaveamento do **Problema do Troco Mínimo (Coin Change)** no painel explicativo.

6. **Padronização Terminológica Rigorosa:**
   - Substituição de todas as ocorrências de "Fator de Balanço" por **"Fator de Balanceamento"** em conformidade com o uso acadêmico em sala de aula.

---

## [2.1.0] - 2026-10-15
### Aprimoramentos Avançados de Didática e Estruturas de Dados

Esta versão traz expansões substanciais solicitadas pelo usuário para aprofundar o rigor visual e didático:

1. **Barra de Status com Badges em Destaque:**
   - As rotações da Árvore AVL agora são categorizadas explicitamente com badges dourados: `[ROTAÇÃO SIMPLES À DIREITA (LL)]`, `[ROTAÇÃO SIMPLES À ESQUERDA (RR)]`, `[ROTAÇÃO DUPLA ESQUERDA-DIREITA (LR)]` e `[ROTAÇÃO DUPLA DIREITA-ESQUERDA (RL)]`.
   - As operações da Árvore Rubro-Negra exibem badges vermelhos categorizando os casos invariantes: `[RECOLORAÇÃO (CASO 1: Tio Vermelho)]`, `[ROTAÇÃO (CASO 2: Joelho)]` e `[ROTAÇÃO E RECOLORAÇÃO (CASO 3: Reta)]`.

2. **Expansão das Estruturas Lineares:**
   - Adicionada **Fila (Queue - FIFO)** com animações de `Enqueue` no Fim (Rear) e `Dequeue` no Início (Front), incluindo ponteiros e tratamento de underflow.
   - Adicionada **Lista Simplesmente Encadeada (Singly Linked List)** com inserção no Início (Head), inserção no Fim (Tail), remoção no Início/Fim, busca linear nó a nó e visualização de nós dinâmicos apontando para `NULL`.

3. **Expansão da Programação Dinâmica:**
   - Adicionado o **Problema da Mochila 0/1 (0/1 Knapsack)** com matriz 2D passo a passo, comparando decisões de inclusão e exclusão e destacando o caminho de rastreamento (*backtracking*) dos itens ótimos.
   - Adicionado o **Problema do Troco Mínimo (Coin Change)** com vetor 1D passo a passo, resolvendo subproblemas de quantidades menores e rastreando a combinação ótima de moedas.

4. **Interatividade Completa em Grafos:**
   - Inserção manual de **Vértices** com rótulos personalizados.
   - Inserção manual de **Arestas Ponderadas** selecionando nós de origem e destino com seus respectivos pesos.
   - Gerador de grafos aleatórios reformulado com trigonometria orgânica e espalhamento radial para garantir formatos espaciais variados e dinâmicos a cada clique.

5. **Ordenação com Sentido Duplo e Pseudocódigos Dinâmicos:**
   - Suporte a ordenação **Crescente (Ascendente)** e **Decrescente (Descendente)** em Bubble Sort, Selection Sort, Insertion Sort e Quick Sort.
   - O painel lateral (gaveta) agora se sincroniza automaticamente com o algoritmo de ordenação, estrutura linear ou algoritmo DP selecionado, exibindo imediatamente seu respectivo pseudocódigo, explicação teórica e tabela Big-O.

6. **Estado Inicial Zerado (*Clean Slate*):**
   - Todas as estruturas agora iniciam vazias por padrão, facultando ao usuário a inserção pontual, aleatória ou em lote.

---

## [2.0.0] - 2026-10-14
### Reconstrução e Modernização a partir da Engenharia Reversa do `visualization.jar` (v1.04)

Esta versão representa uma reescrita completa e modernização do aplicativo educacional original (*Data Structure Visualization* v1.04, lançado em 2006 pelo Prof. David Galles, USFCA).

---

### 🌟 Principais Novidades & Melhorias Solicitadas

#### 1. Árvore AVL com Fatores de Balanceamento Flexíveis
- **Cálculo Preciso do Fator de Balanceamento (FB):** Cada nó agora exibe em tempo real sua altura e o respectivo Fator de Balanceamento.
- **Alternância de Convenção pelo Usuário:**
  - *Convenção Tradicional PT/BR:* $FB = \text{Altura(Esquerda)} - \text{Altura(Direita)}$ (usada por Ziviani, Szwarcfiter).
  - *Convenção Internacional / CLRS:* $FB = \text{Altura(Direita)} - \text{Altura(Esquerda)}$ (usada por Cormen et al.).
- **Destaque Visual de Desbalanceamento:** Nós com $|FB| > 1$ são sinalizados com badge de alerta em vermelho e a rotação necessária (Simples ou Dupla) é explicada e animada passo a passo.

#### 2. Árvores Rubro-Negras (Red-Black Trees)
- **Coloração e Regras Invariantes:** Suporte nativo a nós Vermelhos e Pretos.
- **Alternância de Nós NIL (Folhas Nulas):** O usuário pode, com um clique, optar por visualizar ou ocultar os nós sentinela pretos (`NIL`).
- **Animação Didática das Regras:** Visualização clara das recolorações (Caso 1: tio vermelho) e rotações (Casos 2 e 3: tio preto com formação de triângulo ou linha reta).

#### 3. Zoom & Pan Infinito em Todos os Algoritmos
- **Zoom Dinâmico:** Botões na tela para Zoom In (`+`), Zoom Out (`-`) e Redefinir para 100% / Ajustar à Tela (`1:1`).
- **Suporte a Mouse Wheel e Drag:** O usuário pode usar o scroll do mouse para aproximar ou afastar com foco na posição do cursor, e arrastar a tela (*drag to pan*) para navegar por grafos grandes ou árvores profundas.

#### 4. Suporte Multi-idioma (i18n)
- **3 Idiomas Suportados:**
  - 🇧🇷 Português do Brasil (`pt-BR`)
  - 🇺🇸 Inglês (`en`)
  - 🇪🇸 Espanhol (`es`)
- **Mudança Instantânea:** Altera dinamicamente rótulos de menus, botões, mensagens de status e todo o painel de explicações sem recarregar a página.

#### 5. Painel de Explicações Didáticas & Complexidades
- **Gaveta Lateral de Conteúdo:** Cada algoritmo possui agora 3 abas integradas:
  1. *Conceito & Funcionamento Didático:* Explicação teórica clara e intuitiva.
  2. *Tabela de Complexidade Assintótica:* Melhor Caso, Caso Médio, Pior Caso e Espaço Auxiliar em notação Big-O.
  3. *Pseudocódigo Formatado:* Passo a passo com destaque das operações.

#### 6. Geração de Valores Aleatórios
- Inserção de valor aleatório individual com um clique.
- Geração de vetores, árvores e grafos aleatórios automáticos.
- Inserção em lote (*bulk insert*) de múltiplos valores.

#### 7. Novos Algoritmos de Arrays
Adicionado um módulo dedicado inexistente no aplicativo original:
- **Busca Linear** e **Busca Binária** com visualização de ponteiros (`low`, `mid`, `high`).
- **Técnica de Dois Ponteiros:** Inversão de Array e Two Sum.
- **Janela Deslizante (Sliding Window):** Subarray contíguo de tamanho $k$ com maior soma.
- **Algoritmo de Kadane:** Subarray contíguo de soma máxima em $O(n)$.
- **Bandeira Nacional Holandesa (Dutch National Flag):** Partição de 3 vias (0s, 1s, 2s).

#### 8. Novo Recurso de Linha do Tempo: Step Backward (Voltar Passo)
- Ao contrário do app original que só permitia avançar (*Step*), a v2.0.0 armazena o histórico de estados e permite **voltar passos no tempo** (⏮), facilitando a revisão de pontos críticos de um algoritmo.

---

### 🐛 Correções de Bugs do Código Original (v1.04)
1. **Thread Safety & Race Conditions:** Eliminada a criação descontrolada de `new Thread()` do Swing original, substituída por um motor de animação baseado em snapshots de estado e timeline determinística.
2. **Duplicação de Código:** Corrigida a inicialização redundante em `DSWindow.java` (`this.stackPanel = new DSPanelStackArray(this)` chamada duas vezes seguidas).
3. **Erros Ortográficos Corrigidos:**
   - `"Sorting Algortihms"` -> `"Sorting Algorithms"`
   - `"Graph Algortihms"` -> `"Graph Algorithms"`
   - `"Fibonacci: Recurisve"` -> `"Fibonacci: Recursive"`
   - `"View Internal Represntation"` -> `"View Internal Representation"`
4. **Resolução de Tela e DPI:** Adoção de vetorização e Canvas responsivo com suporte a monitores modernos Retina e 4K.
