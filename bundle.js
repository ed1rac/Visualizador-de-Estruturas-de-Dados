// Bundled Data Structures & Algorithms Visualizer v2.0.0 (Standalone No-Module)


// ==================== i18n.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Multilingual Translations (pt-BR, en, es)
 */
const I18N = {
  'pt-BR': {
    appName: "Visualizador de Estruturas de Dados & Algoritmos",
    appVersion: "v2.0.0",
    themeToggle: "Alternar Tema Claro/Escuro",
    categories: {
      arrays: "Algoritmos em Arrays",
      linear: "Listas, Pilhas e Filas",
      sorting: "Algoritmos de Ordenação",
      trees: "Árvores (BST, AVL, Rubro-Negra, B-Tree)",
      heaps: "Heaps e Filas de Prioridade",
      graphs: "Algoritmos em Grafos",
      hashing: "Tabelas Hash",
      dp: "Programação Dinâmica",
      compression: "Compressão (Huffman)"
    },
    controls: {
      play: "Reproduzir",
      pause: "Pausar",
      stepForward: "Avançar Passo",
      stepBack: "Voltar Passo",
      skip: "Pular para Fim",
      reset: "Reiniciar",
      speed: "Velocidade",
      fast: "Rápido",
      slow: "Lento",
      zoomIn: "Aumentar Zoom",
      zoomOut: "Diminuir Zoom",
      zoomReset: "Ajustar / 100%",
      randomValue: "Valor Aleatório",
      randomSet: "Gerar Conjunto Aleatório",
      insert: "Inserir",
      delete: "Remover",
      search: "Buscar",
      clear: "Limpar",
      run: "Executar",
      statusReady: "Pronto",
      statusRunning: "Executando animação...",
      statusPaused: "Animação pausada",
      statusCompleted: "Operação concluída",
      stepCount: "Passo",
      comparisons: "Comparações",
      swaps: "Trocas / Modificações"
    },
    treeControls: {
      bfConvention: "Convenção Fator de Balanço (FB):",
      bfLeftMinusRight: "Altura(Esq) - Altura(Dir) [Tradicional PT/BR]",
      bfRightMinusLeft: "Altura(Dir) - Altura(Esq) [Cormen/CLRS]",
      badgeModeLabel: "Exibir nos Nós:",
      badgeModeBoth: "FB e Altura (ex: FB: +1 | h: 3)",
      badgeModeBf: "Apenas Fator de Balanço (ex: FB: +1)",
      badgeModeHeight: "Apenas Altura (ex: h: 3)",
      showHeights: "Mostrar Alturas e Fatores de Balanço",
      hideHeights: "Ocultar Alturas",
      showNilNodes: "Mostrar Nós Folha NIL (Pretos)",
      hideNilNodes: "Ocultar Nós NIL",
      rotationNotice: "Rotação realizada:",
      balancedNotice: "Árvore balanceada com sucesso"
    },
    graphControls: {
      viewMode: "Modo de Visualização:",
      viewLogical: "Lógico (Plano 2D)",
      viewAdjList: "Lista de Adjacência",
      viewAdjMatrix: "Matriz de Adjacência",
      graphSize: "Tamanho do Grafo:",
      smallGraph: "Grafo Pequeno",
      largeGraph: "Grafo Grande",
      newGraph: "Novo Grafo Aleatório",
      startVertex: "Vértice Inicial:"
    },
    hashControls: {
      hashType: "Modo de Chave:",
      hashIntegers: "Inteiros",
      hashStrings: "Strings",
      probingMode: "Técnica de Sondagem:",
      linearProbing: "Sondagem Linear [h(k) + i]",
      quadraticProbing: "Sondagem Quadrática [h(k) + i²]",
      doubleHashing: "Duplo Hashing [h(k) + i·h₂(k)]"
    },
    dpControls: {
      method: "Estratégia:",
      recursive: "Recursão Pura (Exponencial)",
      memoized: "Top-Down (Memorização)",
      tabular: "Bottom-Up (Tabela Iterativa)"
    },
    tabs: {
      explanation: "Explicação Didática",
      complexity: "Complexidades (Big-O)",
      pseudocode: "Pseudocódigo"
    },
    explanations: {
      avl: {
        title: "Árvore AVL (Adelson-Velsky e Landis)",
        description: "A Árvore AVL é a primeira árvore binária de busca auto-balanceada inventada. Para cada nó, as alturas de suas subárvores esquerda e direita diferem em no máximo 1 unidade. Quando uma inserção ou remoção viola essa propriedade (|FB| > 1), rotações simples ou duplas são executadas para restaurar o equilíbrio.",
        bfExplanation: "O Fator de Balanceamento (FB) mede a diferença de altura entre as subárvores. Nesta versão 2.0.0, você pode alternar entre a convenção clássica em português (Esq - Dir) e a convenção internacional (Dir - Esq).",
        bestTime: "O(log n)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `funcao inserir(no, chave):
    se no == nulo:
        retorne novoNo(chave)
    se chave < no.chave:
        no.esq = inserir(no.esq, chave)
    senao se chave > no.chave:
        no.dir = inserir(no.dir, chave)
    senao:
        retorne no // Chaves duplicadas

    no.altura = 1 + max(altura(no.esq), altura(no.dir))
    fb = calcularFB(no)

    // Casos de Rotação:
    se fb > 1 e chave < no.esq.chave: // Rotação Direita
        retorne rotacaoDireita(no)
    se fb < -1 e chave > no.dir.chave: // Rotação Esquerda
        retorne rotacaoEsquerda(no)
    se fb > 1 e chave > no.esq.chave: // Dupla Esquerda-Direita
        no.esq = rotacaoEsquerda(no.esq)
        retorne rotacaoDireita(no)
    se fb < -1 e chave < no.dir.chave: // Dupla Direita-Esquerda
        no.dir = rotacaoDireita(no.dir)
        retorne rotacaoEsquerda(no)

    retorne no`
      },
      rbtree: {
        title: "Árvore Rubro-Negra (Red-Black Tree)",
        description: "Uma Árvore Rubro-Negra é uma árvore binária de busca auto-balanceada onde cada nó possui uma cor (vermelho ou preto). O balanceamento é garantido por 5 regras fundamentais, assegurando que o caminho mais longo da raiz a uma folha não seja mais que o dobro do caminho mais curto.",
        properties: "1. Cada nó é vermelho ou preto.\n2. A raiz é sempre preta.\n3. Todas as folhas (nós NIL) são pretas.\n4. Se um nó é vermelho, seus filhos devem ser pretos.\n5. Todo caminho da raiz às folhas contém o mesmo número de nós pretos (black-height).",
        bestTime: "O(log n)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `funcao inserirRB(arvore, chave):
    novoNo = criarNo(chave, COR=VERMELHO)
    inserirBST(arvore, novoNo)
    corrigirInsercaoRB(arvore, novoNo)

funcao corrigirInsercaoRB(arvore, z):
    enquanto z.pai.cor == VERMELHO:
        se z.pai == z.avo.esq:
            tio = z.avo.dir
            se tio.cor == VERMELHO: // Caso 1: Tio vermelho
                z.pai.cor = PRETO
                tio.cor = PRETO
                z.avo.cor = VERMELHO
                z = z.avo
            senao:
                se z == z.pai.dir: // Caso 2: Tio preto, z é filho direito
                    z = z.pai
                    rotacaoEsquerda(arvore, z)
                // Caso 3: Tio preto, z é filho esquerdo
                z.pai.cor = PRETO
                z.avo.cor = VERMELHO
                rotacaoDireita(arvore, z.avo)
        senao: // Casos simétricos...
    arvore.raiz.cor = PRETO`
      },
      bst: {
        title: "Árvore Binária de Busca (BST)",
        description: "Estrutura hierárquica onde, para cada nó, todos os valores da subárvore esquerda são estritamente menores e todos os da subárvore direita são maiores. No pior caso (inserção ordenada), pode degenerar em uma lista encadeada.",
        bestTime: "O(1)",
        avgTime: "O(log n)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcao buscar(no, valor):
    se no == nulo ou no.valor == valor:
        retorne no
    se valor < no.valor:
        retorne buscar(no.esq, valor)
    senao:
        retorne buscar(no.dir, valor)`
      },
      arrays: {
        title: "Algoritmos em Arrays",
        description: "Módulo novo (v2.0.0) com os algoritmos fundamentais de manipulação e análise de vetores: Busca Linear, Busca Binária, Técnica de Dois Ponteiros (inversão e Two Sum), Janela Deslizante (Sliding Window), Algoritmo de Kadane (Subarray de Soma Máxima) e a Bandeira Nacional Holandesa (Dutch National Flag de Dijkstra).",
        bestTime: "O(1) a O(n)",
        avgTime: "O(n) ou O(log n)",
        worstTime: "O(n)",
        space: "O(1) auxiliar",
        pseudocode: `// Algoritmo de Kadane (Soma Máxima de Subarray)
funcao kadane(array):
    maxAtual = array[0]
    maxGlobal = array[0]
    para i de 1 ate tamanho(array) - 1:
        maxAtual = max(array[i], maxAtual + array[i])
        se maxAtual > maxGlobal:
            maxGlobal = maxAtual
    retorne maxGlobal`
      },
      sorting: {
        title: "Algoritmos de Ordenação",
        description: "Estudo comparativo entre algoritmos baseados em comparação (Bubble, Selection, Insertion, Quick, Merge, Shell, Heap Sort) e algoritmos lineares não-comparativos (Counting, Radix, Bucket Sort). Permite visualizar trocas e comparações em tempo real.",
        bestTime: "O(n) a O(n log n)",
        avgTime: "O(n log n) ou O(n²)",
        worstTime: "O(n²)",
        space: "O(1) a O(n)",
        pseudocode: `// QuickSort com Particionamento de Lomuto
funcao quickSort(A, inicio, fim):
    se inicio < fim:
        p = particionar(A, inicio, fim)
        quickSort(A, inicio, p - 1)
        quickSort(A, p + 1, fim)`
      },
      sorting_bubble: {
        title: "Bubble Sort (Ordenação por Bolha)",
        description: "Algoritmo simples baseado em comparações adjacentes repetidas. A cada passada, o maior (ou menor) elemento 'flutua' até o final do vetor. Possui otimização com flag de troca para terminar antecipadamente se o vetor já estiver ordenado.",
        bestTime: "O(n) [com flag de troca]",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) auxiliar (in-place)",
        pseudocode: `funcao bubbleSort(A, ordem):
    n = tamanho(A)
    para i de 0 ate n - 2:
        trocou = falso
        para j de 0 ate n - 2 - i:
            se (ordem == "asc" e A[j] > A[j+1]) ou (ordem == "desc" e A[j] < A[j+1]):
                trocar(A[j], A[j+1])
                trocou = verdadeiro
        se nao trocou:
            interromper // Vetor já está ordenado`
      },
      sorting_selection: {
        title: "Selection Sort (Ordenação por Seleção)",
        description: "Divide a lista em duas partes: ordenada e não-ordenada. Em cada iteração, localiza o elemento extremo (mínimo ou máximo) na sublista não-ordenada e o coloca em sua posição definitiva com uma única troca. Realiza no máximo O(n) trocas de memória.",
        bestTime: "O(n²)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) auxiliar (in-place)",
        pseudocode: `funcao selectionSort(A, ordem):
    n = tamanho(A)
    para i de 0 ate n - 2:
        idxExtremo = i
        para j de i + 1 ate n - 1:
            se (ordem == "asc" e A[j] < A[idxExtremo]) ou (ordem == "desc" e A[j] > A[idxExtremo]):
                idxExtremo = j
        se idxExtremo != i:
            trocar(A[i], A[idxExtremo])`
      },
      sorting_insertion: {
        title: "Insertion Sort (Ordenação por Inserção)",
        description: "Constrói a lista ordenada elemento por elemento, inserindo cada novo item em sua posição correta relativa aos anteriores, como ao organizar cartas de baralho. Extremamente rápido e adaptativo para listas pequenas ou quase ordenadas.",
        bestTime: "O(n) [melhor caso para quase ordenado]",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) auxiliar (in-place)",
        pseudocode: `funcao insertionSort(A, ordem):
    n = tamanho(A)
    para i de 1 ate n - 1:
        chave = A[i]
        j = i - 1
        enquanto j >= 0 e ((ordem == "asc" e A[j] > chave) ou (ordem == "desc" e A[j] < chave)):
            A[j + 1] = A[j]
            j = j - 1
        A[j + 1] = chave`
      },
      sorting_quick: {
        title: "Quick Sort (Ordenação Rápida de Hoare)",
        description: "Algoritmo de Divisão e Conquista. Escolhe um pivô e particiona o vetor em duas metades: elementos que atendem o critério à esquerda e os demais à direita, ordenando recursivamente cada partição. Na média, é um dos mais rápidos algoritmos práticos.",
        bestTime: "O(n log n)",
        avgTime: "O(n log n)",
        worstTime: "O(n²) [pivô mal escolhido]",
        space: "O(log n) pilha de chamadas",
        pseudocode: `funcao quickSort(A, inicio, fim, ordem):
    se inicio < fim:
        p = particionar(A, inicio, fim, ordem)
        quickSort(A, inicio, p - 1, ordem)
        quickSort(A, p + 1, fim, ordem)

funcao particionar(A, inicio, fim, ordem):
    pivo = A[fim]
    i = inicio - 1
    para j de inicio ate fim - 1:
        se (ordem == "asc" e A[j] <= pivo) ou (ordem == "desc" e A[j] >= pivo):
            i = i + 1
            trocar(A[i], A[j])
    trocar(A[i + 1], A[fim])
    retorne i + 1`
      },
      linear: {
        title: "Listas, Pilhas e Filas",
        description: "Estruturas lineares fundamentais. Pilhas seguem o princípio LIFO (Last-In, First-Out), Filas operam em FIFO (First-In, First-Out) e Listas oferecem nós encadeados dinamicamente via ponteiros.",
        bestTime: "O(1)",
        avgTime: "O(1) a O(n)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcao push(pilha, valor):
    pilha.topo = pilha.topo + 1
    pilha.itens[pilha.topo] = valor

funcao pop(pilha):
    se pilhaVazia(pilha): erro("Underflow")
    valor = pilha.itens[pilha.topo]
    pilha.topo = pilha.topo - 1
    retorne valor`
      },
      linear_stack: {
        title: "Pilha (Stack - LIFO)",
        description: "Estrutura linear restrita que obedece à regra LIFO (Last-In, First-Out): o último elemento inserido é obrigatoriamente o primeiro a ser removido. Usada em chamadas de função, retrocesso (backtracking) e avaliação de expressões sintáticas.",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(1)",
        space: "O(n)",
        pseudocode: `funcao push(pilha, valor):
    pilha.topo = pilha.topo + 1
    pilha.itens[pilha.topo] = valor

funcao pop(pilha):
    se pilhaVazia(pilha): erro("Stack Underflow")
    valor = pilha.itens[pilha.topo]
    pilha.topo = pilha.topo - 1
    retorne valor`
      },
      linear_queue: {
        title: "Fila (Queue - FIFO)",
        description: "Estrutura linear que opera sob o princípio FIFO (First-In, First-Out): o primeiro elemento a entrar é o primeiro a sair. Inserções ocorrem exclusivamente no fim (Enqueue / Rear) e remoções no início (Dequeue / Front). Base para algoritmos como Busca em Largura (BFS) e escalonamento de processos.",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(1)",
        space: "O(n)",
        pseudocode: `funcao enqueue(fila, valor):
    fila.fim = fila.fim + 1
    fila.itens[fila.fim] = valor

funcao dequeue(fila):
    se filaVazia(fila): erro("Queue Underflow")
    valor = fila.itens[fila.inicio]
    fila.inicio = fila.inicio + 1
    retorne valor`
      },
      linear_linkedlist: {
        title: "Lista Simplesmente Encadeada (Singly Linked List)",
        description: "Coleção linear de nós espalhados na memória. Cada nó armazena um valor de dado e um ponteiro next que aponta diretamente para o próximo nó da sequência. O nó inicial é a Cabeça (HEAD) e o último nó referencia NULL.",
        bestTime: "O(1) [inserção/remoção no Head]",
        avgTime: "O(n) [busca e inserção na Cauda]",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcao inserirInicio(lista, valor):
    novoNo = criarNo(valor)
    novoNo.proximo = lista.cabeca
    lista.cabeca = novoNo

funcao buscar(lista, chave):
    atual = lista.cabeca
    enquanto atual != nulo:
        se atual.dado == chave:
            retorne atual
        atual = atual.proximo
    retorne NAO_ENCONTRADO`
      },
      heaps: {
        title: "Heaps Binários (Filas de Prioridade)",
        description: "Árvore binária completa armazenada eficientemente em um vetor, onde a raiz sempre contém o menor elemento (Min-Heap) ou o maior (Max-Heap). O algoritmo Build Heap constrói a estrutura em tempo linear O(n).",
        bestTime: "O(1)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `funcao siftDown(A, i, n):
    menor = i
    esq = 2*i + 1
    dir = 2*i + 2
    se esq < n e A[esq] < A[menor]: menor = esq
    se dir < n e A[dir] < A[menor]: menor = dir
    se menor != i:
        trocar(A[i], A[menor])
        siftDown(A, menor, n)`
      },
      graphs: {
        title: "Algoritmos em Grafos",
        description: "Explorações e algoritmos em grafos representados lógica e matricialmente: Busca em Largura (BFS), Busca em Profundidade (DFS), Menor Caminho de Dijkstra, Árvores Geradoras Mínimas (Prim e Kruskal) e Ordenação Topológica em DAGs.",
        bestTime: "O(V + E)",
        avgTime: "O(E log V) ou O(V²)",
        worstTime: "O(V²)",
        space: "O(V + E)",
        pseudocode: `// Algoritmo de Dijkstra
funcao dijkstra(Grafo, origem):
    para cada vertice v:
        dist[v] = INFINITO
    dist[origem] = 0
    Q = criarFilaPrioridade()
    Q.inserir(origem, 0)

    enquanto Q nao vazia:
        u = Q.extrairMinimo()
        para cada vizinho v de u:
            alt = dist[u] + peso(u, v)
            se alt < dist[v]:
                dist[v] = alt
                Q.atualizarPrioridade(v, alt)`
      },
      hashing: {
        title: "Tabelas Hash",
        description: "Mapeamento chave-valor com cálculo direto de índice através de funções de dispersão. Compara encadeamento separado (Open Hashing) e endereçamento aberto (Closed Hashing) com sondagens linear, quadrática e duplo hashing.",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcao buscarFechada(tabela, chave):
    i = 0
    pos = hash(chave)
    enquanto tabela[pos] != VAZIO:
        se tabela[pos].chave == chave e nao tabela[pos].deletado:
            retorne tabela[pos].valor
        i = i + 1
        pos = (hash(chave) + salto(chave, i)) % TAMANHO
    retorne NAO_ENCONTRADO`
      },
      dp: {
        title: "Programação Dinâmica",
        description: "Técnica de otimização para problemas com subestrutura ótima e sobreposição de subproblemas. Demonstra o contraste de desempenho entre recursão ingênua exponencial O(2ⁿ), memorização top-down e preenchimento bottom-up de tabelas O(n).",
        bestTime: "O(n) a O(n · W)",
        avgTime: "O(n) a O(n · W)",
        worstTime: "O(n · W)",
        space: "O(1) a O(n · W)",
        pseudocode: `// Fibonacci Bottom-Up (Tabela)
funcao fibonacciTabela(n):
    se n <= 1: retorne n
    T = vetor de tamanho n + 1
    T[0] = 0; T[1] = 1
    para i de 2 ate n:
        T[i] = T[i - 1] + T[i - 2]
    retorne T[n]`
      },
      dp_fibonacci: {
        title: "Fibonacci (Programação Dinâmica Bottom-Up)",
        description: "Calcula o n-ésimo termo da sequência de Fibonacci utilizando preenchimento iterativo de tabela (Bottom-Up), eliminando recomputações e reduzindo a complexidade temporal de O(2ⁿ) para O(n) linear.",
        bestTime: "O(n)",
        avgTime: "O(n)",
        worstTime: "O(n)",
        space: "O(n) ou O(1)",
        pseudocode: `funcao fibonacciTabela(n):
    se n <= 1: retorne n
    dp = vetor de tamanho n + 1
    dp[0] = 0
    dp[1] = 1
    para i de 2 ate n:
        dp[i] = dp[i - 1] + dp[i - 2]
    retorne dp[n]`
      },
      dp_knapsack: {
        title: "Problema da Mochila 0/1 (0/1 Knapsack)",
        description: "Dado um conjunto de itens com peso e valor, e uma capacidade W, determina a combinação de itens de maior valor sem ultrapassar W. Cada item só pode ser escolhido 0 ou 1 vez. Resolve a relação de recorrência através de uma matriz 2D.",
        bestTime: "O(n · W)",
        avgTime: "O(n · W)",
        worstTime: "O(n · W)",
        space: "O(n · W) matriz 2D",
        pseudocode: `funcao mochila01(itens, W):
    n = tamanho(itens)
    dp = matriz[n + 1][W + 1] com 0
    para i de 1 ate n:
        item = itens[i - 1]
        para w de 1 ate W:
            se item.peso <= w:
                levar = item.valor + dp[i - 1][w - item.peso]
                pular = dp[i - 1][w]
                dp[i][w] = max(levar, pular)
            senao:
                dp[i][w] = dp[i - 1][w]
    retorne dp[n][W]`
      },
      dp_coinchange: {
        title: "Problema do Troco Mínimo (Coin Change)",
        description: "Calcula a quantidade mínima de moedas necessárias para totalizar uma quantia exata V, dadas as denominações disponíveis. Cada subproblema dp[v] armazena o menor número de moedas para atingir a quantia v.",
        bestTime: "O(V · moedas)",
        avgTime: "O(V · moedas)",
        worstTime: "O(V · moedas)",
        space: "O(V) vetor 1D",
        pseudocode: `funcao trocoMinimo(moedas, V):
    dp = vetor de tamanho V + 1 com INFINITO
    dp[0] = 0
    para v de 1 ate V:
        para cada c em moedas:
            se c <= v e dp[v - c] + 1 < dp[v]:
                dp[v] = dp[v - c] + 1
    retorne dp[V]`
      },
      compression: {
        title: "Codificação de Huffman",
        description: "Algoritmo guloso clássico de compressão de dados sem perdas. Atribui códigos binários de tamanho variável aos caracteres conforme suas frequências, garantindo o prefix-free (nenhum código é prefixo de outro).",
        bestTime: "O(n log k)",
        avgTime: "O(n log k)",
        worstTime: "O(n log k)",
        space: "O(k)",
        pseudocode: `funcao construirHuffman(frequencias):
    Q = criarMinHeap()
    para cada caractere c, freq em frequencias:
        Q.inserir(novoNo(c, freq))
    enquanto tamanho(Q) > 1:
        esq = Q.extrairMin()
        dir = Q.extrairMin()
        pai = novoNo('*', esq.freq + dir.freq)
        pai.esq = esq
        pai.dir = dir
        Q.inserir(pai)
    retorne Q.extrairMin()`
      }
    }
  },

  'en': {
    appName: "Data Structures & Algorithms Visualizer",
    appVersion: "v2.0.0",
    themeToggle: "Toggle Light/Dark Theme",
    categories: {
      arrays: "Array Algorithms",
      linear: "Lists, Stacks & Queues",
      sorting: "Sorting Algorithms",
      trees: "Trees (BST, AVL, Red-Black, B-Tree)",
      heaps: "Heaps & Priority Queues",
      graphs: "Graph Algorithms",
      hashing: "Hash Tables",
      dp: "Dynamic Programming",
      compression: "Compression (Huffman)"
    },
    controls: {
      play: "Play",
      pause: "Pause",
      stepForward: "Step Forward",
      stepBack: "Step Backward",
      skip: "Skip to End",
      reset: "Reset",
      speed: "Speed",
      fast: "Fast",
      slow: "Slow",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      zoomReset: "Fit / 100%",
      randomValue: "Random Value",
      randomSet: "Generate Random Set",
      insert: "Insert",
      delete: "Delete",
      search: "Search",
      clear: "Clear",
      run: "Run",
      statusReady: "Ready",
      statusRunning: "Animation running...",
      statusPaused: "Animation paused",
      statusCompleted: "Operation completed",
      stepCount: "Step",
      comparisons: "Comparisons",
      swaps: "Swaps / Writes"
    },
    treeControls: {
      bfConvention: "Balance Factor (BF) Convention:",
      bfLeftMinusRight: "Height(Left) - Height(Right) [PT/BR Classical]",
      bfRightMinusLeft: "Height(Right) - Height(Left) [Cormen/CLRS]",
      badgeModeLabel: "Show on Nodes:",
      badgeModeBoth: "BF & Height (e.g. FB: +1 | h: 3)",
      badgeModeBf: "Balance Factor only (e.g. FB: +1)",
      badgeModeHeight: "Height only (e.g. h: 3)",
      showHeights: "Show Heights & Balance Factors",
      hideHeights: "Hide Heights",
      showNilNodes: "Show NIL Sentinel Nodes (Black)",
      hideNilNodes: "Hide NIL Nodes",
      rotationNotice: "Rotation executed:",
      balancedNotice: "Tree successfully balanced"
    },
    graphControls: {
      viewMode: "Visualization Mode:",
      viewLogical: "Logical (2D Plane)",
      viewAdjList: "Adjacency List",
      viewAdjMatrix: "Adjacency Matrix",
      graphSize: "Graph Size:",
      smallGraph: "Small Graph",
      largeGraph: "Large Graph",
      newGraph: "New Random Graph",
      startVertex: "Start Vertex:"
    },
    hashControls: {
      hashType: "Key Type:",
      hashIntegers: "Integers",
      hashStrings: "Strings",
      probingMode: "Probing Technique:",
      linearProbing: "Linear Probing [h(k) + i]",
      quadraticProbing: "Quadratic Probing [h(k) + i²]",
      doubleHashing: "Double Hashing [h(k) + i·h₂(k)]"
    },
    dpControls: {
      method: "Strategy:",
      recursive: "Pure Recursion (Exponential)",
      memoized: "Top-Down (Memoized)",
      tabular: "Bottom-Up (Iterative Table)"
    },
    tabs: {
      explanation: "Educational Explanation",
      complexity: "Complexities (Big-O)",
      pseudocode: "Pseudocode"
    },
    explanations: {
      avl: {
        title: "AVL Tree (Adelson-Velsky and Landis)",
        description: "The AVL Tree is the first self-balancing binary search tree ever invented. For every node, the heights of its left and right subtrees differ by at most 1. When an insertion or deletion violates this property (|BF| > 1), single or double rotations restore the balance.",
        bfExplanation: "The Balance Factor (BF) measures subtree height differences. Version 2.0.0 lets you choose between Left - Right or Right - Left conventions seamlessly.",
        bestTime: "O(log n)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `function insert(node, key):
    if node == null:
        return newNode(key)
    if key < node.key:
        node.left = insert(node.left, key)
    else if key > node.key:
        node.right = insert(node.right, key)
    else:
        return node // Duplicate

    node.height = 1 + max(height(node.left), height(node.right))
    bf = getBalanceFactor(node)

    // Rotations:
    if bf > 1 and key < node.left.key:
        return rotateRight(node)
    if bf < -1 and key > node.right.key:
        return rotateLeft(node)
    if bf > 1 and key > node.left.key:
        node.left = rotateLeft(node.left)
        return rotateRight(node)
    if bf < -1 and key < node.right.key:
        node.right = rotateRight(node.right)
        return rotateLeft(node)

    return node`
      },
      rbtree: {
        title: "Red-Black Tree",
        description: "A Red-Black Tree is a self-balancing binary search tree where every node is colored either red or black. Five essential rules guarantee that no simple path from the root to any leaf is more than twice as long as any other path.",
        properties: "1. Every node is red or black.\n2. The root is always black.\n3. Every leaf (NIL node) is black.\n4. If a node is red, both children must be black.\n5. Every path from root to leaf contains the same number of black nodes (black-height).",
        bestTime: "O(log n)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `function insertRB(T, key):
    z = createNode(key, COLOR=RED)
    bstInsert(T, z)
    fixupRBInsert(T, z)`
      },
      bst: {
        title: "Binary Search Tree (BST)",
        description: "Hierarchical data structure where left descendants are strictly smaller and right descendants are larger than the root. Can degenerate into a linked list in worst-case sorted insertions.",
        bestTime: "O(1)",
        avgTime: "O(log n)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `function search(node, val):
    if node == null or node.val == val:
        return node
    if val < node.val:
        return search(node.left, val)
    return search(node.right, val)`
      },
      arrays: {
        title: "Array Algorithms",
        description: "New module (v2.0.0) covering fundamental array operations: Linear Search, Binary Search, Two Pointers (Reverse, Target Sum), Sliding Window (Max sum subarray of size K), Kadane's Algorithm (Max Subarray Sum), and Dijkstra's Dutch National Flag (3-way partitioning).",
        bestTime: "O(1) to O(n)",
        avgTime: "O(n) or O(log n)",
        worstTime: "O(n)",
        space: "O(1) auxiliary",
        pseudocode: `// Kadane's Algorithm
function kadane(arr):
    curMax = arr[0]
    globalMax = arr[0]
    for i from 1 to arr.length - 1:
        curMax = max(arr[i], curMax + arr[i])
        globalMax = max(globalMax, curMax)
    return globalMax`
      },
      sorting: {
        title: "Sorting Algorithms",
        description: "Comparative study between comparison sorts (Bubble, Selection, Insertion, Quick, Merge, Shell, Heap Sort) and non-comparison distribution sorts (Counting, Radix, Bucket Sort).",
        bestTime: "O(n) to O(n log n)",
        avgTime: "O(n log n) or O(n²)",
        worstTime: "O(n²)",
        space: "O(1) to O(n)",
        pseudocode: `function quickSort(A, low, high):
    if low < high:
        pi = partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)`
      },
      sorting_bubble: {
        title: "Bubble Sort",
        description: "Simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Features early termination if no swaps are made during a pass.",
        bestTime: "O(n) [with swapped flag]",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) in-place",
        pseudocode: `function bubbleSort(A, order):
    n = A.length
    for i from 0 to n - 2:
        swapped = false
        for j from 0 to n - 2 - i:
            if (order == "asc" and A[j] > A[j+1]) or (order == "desc" and A[j] < A[j+1]):
                swap(A[j], A[j+1])
                swapped = true
        if not swapped:
            break`
      },
      sorting_selection: {
        title: "Selection Sort",
        description: "In-place comparison sorting algorithm that divides the input into sorted and unsorted regions. In each iteration, it finds the extreme element (minimum or maximum) in the unsorted region and swaps it into its final location.",
        bestTime: "O(n²)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) in-place",
        pseudocode: `function selectionSort(A, order):
    n = A.length
    for i from 0 to n - 2:
        extIdx = i
        for j from i + 1 to n - 1:
            if (order == "asc" and A[j] < A[extIdx]) or (order == "desc" and A[j] > A[extIdx]):
                extIdx = j
        if extIdx != i:
            swap(A[i], A[extIdx])`
      },
      sorting_insertion: {
        title: "Insertion Sort",
        description: "Builds the final sorted array one item at a time. It iterates consuming one input element each repetition and growing a sorted output list, shifting greater items to the right. Highly efficient for small or nearly-sorted datasets.",
        bestTime: "O(n) [nearly sorted]",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) in-place",
        pseudocode: `function insertionSort(A, order):
    n = A.length
    for i from 1 to n - 1:
        key = A[i]
        j = i - 1
        while j >= 0 and ((order == "asc" and A[j] > key) or (order == "desc" and A[j] < key)):
            A[j + 1] = A[j]
            j = j - 1
        A[j + 1] = key`
      },
      sorting_quick: {
        title: "Quick Sort (Hoare / Lomuto)",
        description: "Divide-and-conquer algorithm. Selects a 'pivot' element and partitions the array into two sub-arrays according to whether elements satisfy the order condition relative to the pivot, then recursively sorts the sub-arrays.",
        bestTime: "O(n log n)",
        avgTime: "O(n log n)",
        worstTime: "O(n²) [worst pivot selection]",
        space: "O(log n) call stack",
        pseudocode: `function quickSort(A, low, high, order):
    if low < high:
        p = partition(A, low, high, order)
        quickSort(A, low, p - 1, order)
        quickSort(A, p + 1, high, order)

function partition(A, low, high, order):
    pivot = A[high]
    i = low - 1
    for j from low to high - 1:
        if (order == "asc" and A[j] <= pivot) or (order == "desc" and A[j] >= pivot):
            i = i + 1
            swap(A[i], A[j])
    swap(A[i + 1], A[high])
    return i + 1`
      },
      linear: {
        title: "Lists, Stacks & Queues",
        description: "Linear data structures with LIFO (Stack), FIFO (Queue), and multi-iterator dynamic lists.",
        bestTime: "O(1)",
        avgTime: "O(1) to O(n)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `function push(stack, val):
    stack.top = stack.top + 1
    stack.items[stack.top] = val`
      },
      linear_stack: {
        title: "Stack (LIFO)",
        description: "A linear data structure following the Last-In, First-Out principle. Key operations include push (insert element at the top) and pop (remove element from the top). Used in runtime call stacks, undo mechanisms, and parsing.",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(1)",
        space: "O(n)",
        pseudocode: `function push(stack, val):
    stack.top = stack.top + 1
    stack.items[stack.top] = val

function pop(stack):
    if isEmpty(stack): error("Stack Underflow")
    val = stack.items[stack.top]
    stack.top = stack.top - 1
    return val`
      },
      linear_queue: {
        title: "Queue (FIFO)",
        description: "A linear data structure adhering to the First-In, First-Out principle. Elements are enqueued at the back (Rear) and dequeued from the front (Front). Serves as the foundation for Breadth-First Search (BFS) and task scheduling.",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(1)",
        space: "O(n)",
        pseudocode: `function enqueue(queue, val):
    queue.rear = queue.rear + 1
    queue.items[queue.rear] = val

function dequeue(queue):
    if isEmpty(queue): error("Queue Underflow")
    val = queue.items[queue.front]
    queue.front = queue.front + 1
    return val`
      },
      linear_linkedlist: {
        title: "Singly Linked List",
        description: "A sequence of dynamically allocated nodes where each node contains data and a next reference pointing to the subsequent node. The sequence begins at the HEAD pointer and terminates with a pointer to NULL.",
        bestTime: "O(1) [insert at head]",
        avgTime: "O(n) [search or tail operations]",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `function insertHead(list, val):
    newNode = createNode(val)
    newNode.next = list.head
    list.head = newNode

function search(list, key):
    curr = list.head
    while curr != null:
        if curr.data == key: return curr
        curr = curr.next
    return NOT_FOUND`
      },
      heaps: {
        title: "Binary Heaps",
        description: "Complete binary tree stored sequentially in an array where the root contains the minimum (Min-Heap) or maximum (Max-Heap) key. Linear time O(n) Build-Heap algorithm.",
        bestTime: "O(1)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `function siftDown(A, i, n):
    smallest = i
    left = 2*i + 1
    right = 2*i + 2
    if left < n and A[left] < A[smallest]: smallest = left
    if right < n and A[right] < A[smallest]: smallest = right
    if smallest != i:
        swap(A[i], A[smallest])
        siftDown(A, smallest, n)`
      },
      graphs: {
        title: "Graph Algorithms",
        description: "Network explorations and optimal paths: BFS, DFS, Dijkstra, Prim, Kruskal, and Topological Sort in DAGs.",
        bestTime: "O(V + E)",
        avgTime: "O(E log V) or O(V²)",
        worstTime: "O(V²)",
        space: "O(V + E)",
        pseudocode: `function dijkstra(G, start):
    dist[start] = 0
    Q.insert(start, 0)
    while not Q.isEmpty():
        u = Q.extractMin()
        for each neighbor v of u:
            if dist[u] + weight(u, v) < dist[v]:
                dist[v] = dist[u] + weight(u, v)
                Q.update(v, dist[v])`
      },
      hashing: {
        title: "Hash Tables",
        description: "Key-value mapping using hash functions. Contrasting separate chaining (Open Hashing) with open addressing (Closed Hashing).",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `function search(table, key):
    pos = hash(key)
    while table[pos] is not empty:
        if table[pos].key == key and not table[pos].deleted:
            return table[pos].val
        pos = (pos + probeStep) % size
    return NOT_FOUND`
      },
      dp: {
        title: "Dynamic Programming",
        description: "Optimization technique comparing exponential naive recursion O(2ⁿ), top-down memoization, and bottom-up tabular algorithms O(n).",
        bestTime: "O(n) to O(n · W)",
        avgTime: "O(n) to O(n · W)",
        worstTime: "O(n · W)",
        space: "O(1) to O(n · W)",
        pseudocode: `function fibTabular(n):
    if n <= 1: return n
    T = new array[n + 1]
    T[0] = 0; T[1] = 1
    for i from 2 to n:
        T[i] = T[i-1] + T[i-2]
    return T[n]`
      },
      dp_fibonacci: {
        title: "Fibonacci (Bottom-Up Dynamic Programming)",
        description: "Computes the nth Fibonacci number by filling a table iteratively, eliminating redundant recursive calls and dropping time complexity from O(2ⁿ) down to O(n).",
        bestTime: "O(n)",
        avgTime: "O(n)",
        worstTime: "O(n)",
        space: "O(n) or O(1)",
        pseudocode: `function fibTabular(n):
    if n <= 1: return n
    dp = new array[n + 1]
    dp[0] = 0; dp[1] = 1
    for i from 2 to n:
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`
      },
      dp_knapsack: {
        title: "0/1 Knapsack Problem",
        description: "Given items with specific weights and values, find the subset that maximizes total value without exceeding capacity W. Solved using a 2D dynamic programming grid where each cell dp[i][w] represents the optimal value considering first i items.",
        bestTime: "O(n · W)",
        avgTime: "O(n · W)",
        worstTime: "O(n · W)",
        space: "O(n · W) 2D grid",
        pseudocode: `function knapsack(items, W):
    n = items.length
    dp = matrix[n + 1][W + 1] filled with 0
    for i from 1 to n:
        item = items[i - 1]
        for w from 1 to W:
            if item.w <= w:
                take = item.v + dp[i - 1][w - item.w]
                skip = dp[i - 1][w]
                dp[i][w] = max(take, skip)
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`
      },
      dp_coinchange: {
        title: "Coin Change Problem (Min Coins)",
        description: "Determines the minimum number of coins needed to form an exact amount V given coin denominations. Uses 1D dynamic programming where dp[v] holds the minimum coins to achieve amount v.",
        bestTime: "O(V · coins)",
        avgTime: "O(V · coins)",
        worstTime: "O(V · coins)",
        space: "O(V) 1D array",
        pseudocode: `function coinChange(coins, V):
    dp = array[V + 1] filled with INFINITY
    dp[0] = 0
    for v from 1 to V:
        for each c in coins:
            if c <= v and dp[v - c] + 1 < dp[v]:
                dp[v] = dp[v - c] + 1
    return dp[V]`
      },
      compression: {
        title: "Huffman Coding",
        description: "Greedy data compression creating optimal prefix-free variable-length binary codes based on symbol probabilities.",
        bestTime: "O(n log k)",
        avgTime: "O(n log k)",
        worstTime: "O(n log k)",
        space: "O(k)",
        pseudocode: `function buildHuffman(freqs):
    Q = minHeap(freqs)
    while Q.size() > 1:
        left = Q.extractMin()
        right = Q.extractMin()
        parent = node('*', left.freq + right.freq)
        parent.left = left; parent.right = right
        Q.insert(parent)
    return Q.extractMin()`
      }
    }
  },

  'es': {
    appName: "Visualizador de Estructuras de Datos y Algoritmos",
    appVersion: "v2.0.0",
    themeToggle: "Cambiar Tema Claro/Oscuro",
    categories: {
      arrays: "Algoritmos en Arreglos",
      linear: "Listas, Pilas y Colas",
      sorting: "Algoritmos de Ordenamiento",
      trees: "Árboles (BST, AVL, Rojinegro, B-Tree)",
      heaps: "Montículos (Heaps) y Colas de Prioridad",
      graphs: "Algoritmos en Grafos",
      hashing: "Tablas Hash",
      dp: "Programación Dinámica",
      compression: "Compresión (Huffman)"
    },
    controls: {
      play: "Reproducir",
      pause: "Pausar",
      stepForward: "Paso Adelante",
      stepBack: "Paso Atrás",
      skip: "Saltar al Final",
      reset: "Reiniciar",
      speed: "Velocidad",
      fast: "Rápido",
      slow: "Lento",
      zoomIn: "Acercar Zoom",
      zoomOut: "Alejar Zoom",
      zoomReset: "Ajustar / 100%",
      randomValue: "Valor Aleatorio",
      randomSet: "Generar Conjunto Aleatorio",
      insert: "Insertar",
      delete: "Eliminar",
      search: "Buscar",
      clear: "Limpiar",
      run: "Ejecutar",
      statusReady: "Listo",
      statusRunning: "Animación en curso...",
      statusPaused: "Animación pausada",
      statusCompleted: "Operación completada",
      stepCount: "Paso",
      comparisons: "Comparaciones",
      swaps: "Intercambios / Escrituras"
    },
    treeControls: {
      bfConvention: "Convención Factor de Equilibrio (FE):",
      bfLeftMinusRight: "Altura(Izq) - Altura(Der) [Tradicional ES/PT]",
      bfRightMinusLeft: "Altura(Der) - Altura(Izq) [Cormen/CLRS]",
      badgeModeLabel: "Mostrar en Nodos:",
      badgeModeBoth: "FE y Altura (ej: FE: +1 | h: 3)",
      badgeModeBf: "Solo Factor de Equilibrio (ej: FE: +1)",
      badgeModeHeight: "Solo Altura (ej: h: 3)",
      showHeights: "Mostrar Alturas y Factores de Equilibrio",
      hideHeights: "Ocultar Alturas",
      showNilNodes: "Mostrar Nodos Hoja NIL (Negros)",
      hideNilNodes: "Ocultar Nodos NIL",
      rotationNotice: "Rotación ejecutada:",
      balancedNotice: "Árbol equilibrado con éxito"
    },
    graphControls: {
      viewMode: "Modo de Visualización:",
      viewLogical: "Lógico (Plano 2D)",
      viewAdjList: "Lista de Adyacencia",
      viewAdjMatrix: "Matriz de Adyacencia",
      graphSize: "Tamaño del Grafo:",
      smallGraph: "Grafo Pequeño",
      largeGraph: "Grafo Grande",
      newGraph: "Nuevo Grafo Aleatorio",
      startVertex: "Vértice Inicial:"
    },
    hashControls: {
      hashType: "Tipo de Clave:",
      hashIntegers: "Enteros",
      hashStrings: "Cadenas",
      probingMode: "Técnica de Sondeo:",
      linearProbing: "Sondeo Lineal [h(k) + i]",
      quadraticProbing: "Sondeo Cuadrático [h(k) + i²]",
      doubleHashing: "Doble Hash [h(k) + i·h₂(k)]"
    },
    dpControls: {
      method: "Estrategia:",
      recursive: "Recursión Pura (Exponencial)",
      memoized: "Top-Down (Memorización)",
      tabular: "Bottom-Up (Tabla Iterativa)"
    },
    tabs: {
      explanation: "Explicación Didáctica",
      complexity: "Complejidades (Big-O)",
      pseudocode: "Pseudocódigo"
    },
    explanations: {
      avl: {
        title: "Árbol AVL (Adelson-Velsky y Landis)",
        description: "El Árbol AVL es el primer árbol binario de búsqueda auto-balanceado. Para cada nodo, las alturas de sus subárboles difieren como máximo en 1. Si una inserción o eliminación rompe esta propiedad, se realizan rotaciones simples o dobles.",
        bfExplanation: "El Factor de Equilibrio (FE) calcula la diferencia de alturas. En la versión 2.0.0 puedes alternar entre la convención Izquierda - Derecha o Derecha - Izquierda.",
        bestTime: "O(log n)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `funcion insertar(nodo, clave):
    if nodo == nulo: return nuevoNodo(clave)
    // Inserción estándar BST y rotaciones según FE...`
      },
      rbtree: {
        title: "Árbol Rojinegro (Red-Black Tree)",
        description: "Árbol binario equilibrado donde cada nodo se pinta de rojo o negro, garantizando balance O(log n) mediante 5 reglas invariantes.",
        properties: "1. Cada nodo es rojo o negro.\n2. La raíz es negra.\n3. Hojas NIL son negras.\n4. Si un nodo es rojo, sus hijos son negros.\n5. Misma cantidad de nodos negros en cada camino.",
        bestTime: "O(log n)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `// Inserción y rebalanceo rojinegro...`
      },
      bst: {
        title: "Árbol Binario de Búsqueda (BST)",
        description: "Estructura jerárquica con hijos izquierdos menores e hijos derechos mayores.",
        bestTime: "O(1)",
        avgTime: "O(log n)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcion buscar(nodo, val): ...`
      },
      arrays: {
        title: "Algoritmos en Arreglos",
        description: "Módulo nuevo (v2.0.0) que incluye Búsqueda Lineal, Binaria, Dos Punteros, Ventana Deslizante, Kadane y Bandera Nacional Holandesa.",
        bestTime: "O(1) a O(n)",
        avgTime: "O(n) o O(log n)",
        worstTime: "O(n)",
        space: "O(1)",
        pseudocode: `// Algoritmo de Kadane`
      },
      sorting: {
        title: "Algoritmos de Ordenamiento",
        description: "Estudio comparativo de métodos de comparación y métodos de distribución lineal.",
        bestTime: "O(n) a O(n log n)",
        avgTime: "O(n log n) o O(n²)",
        worstTime: "O(n²)",
        space: "O(1) a O(n)",
        pseudocode: `// QuickSort Lomuto`
      },
      sorting_bubble: {
        title: "Ordenamiento Burbuja (Bubble Sort)",
        description: "Algoritmo de comparación que recorre repetidamente la lista, compara elementos adyacentes y los intercambia si están desordenados. Incorpora bandera de intercambio para terminar tempranamente si la lista ya está ordenada.",
        bestTime: "O(n) [con bandera de intercambio]",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) in-place",
        pseudocode: `funcion bubbleSort(A, orden):
    n = longitud(A)
    para i de 0 hasta n - 2:
        cambio = falso
        para j de 0 hasta n - 2 - i:
            si (orden == "asc" y A[j] > A[j+1]) o (orden == "desc" y A[j] < A[j+1]):
                intercambiar(A[j], A[j+1])
                cambio = verdadero
        si no cambio: romper`
      },
      sorting_selection: {
        title: "Ordenamiento por Selección (Selection Sort)",
        description: "Divide la lista en una sublista ordenada y otra no ordenada. En cada paso localiza el elemento extremo (mínimo o máximo) en la zona desordenada y lo traslada a su posición correcta mediante un intercambio.",
        bestTime: "O(n²)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) in-place",
        pseudocode: `funcion selectionSort(A, orden):
    n = longitud(A)
    para i de 0 hasta n - 2:
        idxExtremo = i
        para j de i + 1 hasta n - 1:
            si (orden == "asc" y A[j] < A[idxExtremo]) o (orden == "desc" y A[j] > A[idxExtremo]):
                idxExtremo = j
        si idxExtremo != i:
            intercambiar(A[i], A[idxExtremo])`
      },
      sorting_insertion: {
        title: "Ordenamiento por Inserción (Insertion Sort)",
        description: "Construye el arreglo ordenado un elemento a la vez, desplazando elementos mayores a la derecha para abrir espacio al nuevo ítem. Especialmente eficiente para colecciones pequeñas o casi ordenadas.",
        bestTime: "O(n) [casi ordenado]",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1) in-place",
        pseudocode: `funcion insertionSort(A, orden):
    n = longitud(A)
    para i de 1 hasta n - 1:
        clave = A[i]
        j = i - 1
        mientras j >= 0 y ((orden == "asc" y A[j] > clave) o (orden == "desc" y A[j] < clave)):
            A[j + 1] = A[j]
            j = j - 1
        A[j + 1] = clave`
      },
      sorting_quick: {
        title: "Ordenamiento Rápido (Quick Sort)",
        description: "Algoritmo de Divide y Vencerás. Selecciona un pivote y particiona los datos de forma que los elementos menores queden a un lado y los mayores al otro, procediendo recursivamente.",
        bestTime: "O(n log n)",
        avgTime: "O(n log n)",
        worstTime: "O(n²) [pivote desfavorable]",
        space: "O(log n) pila de recursión",
        pseudocode: `funcion quickSort(A, inicio, fin, orden):
    si inicio < fin:
        p = particionar(A, inicio, fin, orden)
        quickSort(A, inicio, p - 1, orden)
        quickSort(A, p + 1, fin, orden)

funcion particionar(A, inicio, fin, orden):
    pivote = A[fin]
    i = inicio - 1
    para j de inicio hasta fin - 1:
        si (orden == "asc" y A[j] <= pivote) o (orden == "desc" y A[j] >= pivote):
            i = i + 1
            intercambiar(A[i], A[j])
    intercambiar(A[i + 1], A[fin])
    retornar i + 1`
      },
      linear: {
        title: "Listas, Pilas y Colas",
        description: "Estructuras lineales LIFO, FIFO y listas dinámicas con iteradores.",
        bestTime: "O(1)",
        avgTime: "O(1) a O(n)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcion push / pop...`
      },
      linear_stack: {
        title: "Pila (Stack - LIFO)",
        description: "Estructura lineal con acceso restringido bajo la regla LIFO (Last-In, First-Out): el último elemento ingresado es el primero en ser extraído. Clave en llamadas a funciones y desapilado de estados.",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(1)",
        space: "O(n)",
        pseudocode: `funcion push(pila, val):
    pila.tope = pila.tope + 1
    pila.items[pila.tope] = val

funcion pop(pila):
    si pilaVacia(pila): error("Subdesbordamiento")
    val = pila.items[pila.tope]
    pila.tope = pila.tope - 1
    retornar val`
      },
      linear_queue: {
        title: "Cola (Queue - FIFO)",
        description: "Estructura lineal que opera con la disciplina FIFO (First-In, First-Out): el primer elemento en ingresar es el primero en salir. Inserción al final (Rear) y extracción al frente (Front).",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(1)",
        space: "O(n)",
        pseudocode: `funcion enqueue(cola, val):
    cola.fin = cola.fin + 1
    cola.items[cola.fin] = val

funcion dequeue(cola):
    si colaVacia(cola): error("Cola vacía")
    val = cola.items[cola.frente]
    cola.frente = cola.frente + 1
    retornar val`
      },
      linear_linkedlist: {
        title: "Lista Enlazada Simple",
        description: "Secuencia de nodos enlazados donde cada nodo guarda datos y una referencia al nodo sucesor. El recorrido inicia en la cabeza (HEAD) y finaliza apuntando a NULL.",
        bestTime: "O(1) [inserción en cabeza]",
        avgTime: "O(n) [búsqueda o cola]",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcion insertarInicio(lista, val):
    nuevo = crearNodo(val)
    nuevo.siguiente = lista.cabeza
    lista.cabeza = nuevo

funcion buscar(lista, clave):
    actual = lista.cabeza
    mientras actual != nulo:
        si actual.dato == clave: retornar actual
        actual = actual.siguiente
    retornar NO_ENCONTRADO`
      },
      heaps: {
        title: "Montículos Binarios (Heaps)",
        description: "Árbol binario completo con propiedad de montículo mínimo o máximo.",
        bestTime: "O(1)",
        avgTime: "O(log n)",
        worstTime: "O(log n)",
        space: "O(n)",
        pseudocode: `funcion siftDown...`
      },
      graphs: {
        title: "Algoritmos en Grafos",
        description: "BFS, DFS, Dijkstra, Prim, Kruskal y Ordenamiento Topológico.",
        bestTime: "O(V + E)",
        avgTime: "O(E log V)",
        worstTime: "O(V²)",
        space: "O(V + E)",
        pseudocode: `funcion dijkstra...`
      },
      hashing: {
        title: "Tablas Hash",
        description: "Direccionamiento directo y resolución de colisiones abierta y cerrada.",
        bestTime: "O(1)",
        avgTime: "O(1)",
        worstTime: "O(n)",
        space: "O(n)",
        pseudocode: `funcion buscar...`
      },
      dp: {
        title: "Programación Dinámica",
        description: "Optimización mediante subestructura óptima y memorización.",
        bestTime: "O(n) a O(n · W)",
        avgTime: "O(n) a O(n · W)",
        worstTime: "O(n · W)",
        space: "O(1) a O(n · W)",
        pseudocode: `funcion fibonacci...`
      },
      dp_fibonacci: {
        title: "Fibonacci (Programación Dinámica Bottom-Up)",
        description: "Calcula el término de Fibonacci llenando una tabla de forma iterativa, reduciendo la complejidad temporal exponencial a tiempo lineal O(n).",
        bestTime: "O(n)",
        avgTime: "O(n)",
        worstTime: "O(n)",
        space: "O(n) o O(1)",
        pseudocode: `funcion fibonacci(n):
    si n <= 1: retornar n
    dp = arreglo de tamaño n + 1
    dp[0] = 0; dp[1] = 1
    para i de 2 hasta n:
        dp[i] = dp[i - 1] + dp[i - 2]
    retornar dp[n]`
      },
      dp_knapsack: {
        title: "Problema de la Mochila 0/1 (Knapsack)",
        description: "Maximiza el valor total de elementos seleccionados sin exceder el peso límite W. Resuelve subproblemas superpuestos a través de una cuadrícula bidimensional dp[i][w].",
        bestTime: "O(n · W)",
        avgTime: "O(n · W)",
        worstTime: "O(n · W)",
        space: "O(n · W) matriz 2D",
        pseudocode: `funcion mochila(items, W):
    n = longitud(items)
    dp = matriz[n + 1][W + 1] con ceros
    para i de 1 hasta n:
        it = items[i - 1]
        para w de 1 hasta W:
            si it.peso <= w:
                tomar = it.valor + dp[i - 1][w - it.peso]
                saltar = dp[i - 1][w]
                dp[i][w] = max(tomar, saltar)
            si no:
                dp[i][w] = dp[i - 1][w]
    retornar dp[n][W]`
      },
      dp_coinchange: {
        title: "Problema del Cambio Mínimo (Coin Change)",
        description: "Determina el número mínimo de monedas necesarias para formar una cantidad exacta V a partir de un conjunto de denominaciones disponibles.",
        bestTime: "O(V · monedas)",
        avgTime: "O(V · monedas)",
        worstTime: "O(V · monedas)",
        space: "O(V) arreglo 1D",
        pseudocode: `funcion cambioMonedas(monedas, V):
    dp = arreglo de tamaño V + 1 con INFINITO
    dp[0] = 0
    para v de 1 hasta V:
        para cada c en monedas:
            si c <= v y dp[v - c] + 1 < dp[v]:
                dp[v] = dp[v - c] + 1
    retornar dp[V]`
      },
      compression: {
        title: "Codificación de Huffman",
        description: "Compresión sin pérdida basada en frecuencias de caracteres.",
        bestTime: "O(n log k)",
        avgTime: "O(n log k)",
        worstTime: "O(n log k)",
        space: "O(k)",
        pseudocode: `funcion huffman...`
      }
    }
  }
};


// ==================== canvas.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Core Canvas Engine with Infinite Zoom, Pan & Vector Rendering
 */
class VisualizerCanvas {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);

    // Zoom & Pan transformation state
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.minScale = 0.2;
    this.maxScale = 4.0;

    // Drawing queue / scene elements
    this.elements = [];
    this.links = [];
    this.decorations = [];

    this.initCanvasSize();
    this.bindEvents();
    window.addEventListener('resize', () => this.initCanvasSize());
  }

  initCanvasSize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 800;
    this.height = rect.height || 600;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.render();
  }

  bindEvents() {
    // Mouse Drag to Pan
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.offsetX;
      this.dragStartY = e.clientY - this.offsetY;
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.offsetX = e.clientX - this.dragStartX;
      this.offsetY = e.clientY - this.dragStartY;
      this.render();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
      }
    });

    // Mouse Wheel to Zoom focused on cursor
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      const newScale = Math.min(Math.max(this.scale * zoomFactor, this.minScale), this.maxScale);

      // Adjust offset so zoom centers on mouse position
      this.offsetX = mouseX - (mouseX - this.offsetX) * (newScale / this.scale);
      this.offsetY = mouseY - (mouseY - this.offsetY) * (newScale / this.scale);
      this.scale = newScale;

      this.render();
      if (this.onZoomChange) this.onZoomChange(this.scale);
    }, { passive: false });

    // Touch support for mobile / tablets
    let touchStartDist = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX - this.offsetX;
        this.dragStartY = e.touches[0].clientY - this.offsetY;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && this.isDragging) {
        this.offsetX = e.touches[0].clientX - this.dragStartX;
        this.offsetY = e.touches[0].clientY - this.dragStartY;
        this.render();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / (touchStartDist || dist);
        this.scale = Math.min(Math.max(this.scale * factor, this.minScale), this.maxScale);
        touchStartDist = dist;
        this.render();
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  // Zoom control helpers
  zoomIn() {
    this.setZoom(this.scale * 1.25);
  }

  zoomOut() {
    this.setZoom(this.scale * 0.8);
  }

  resetZoom() {
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.render();
    if (this.onZoomChange) this.onZoomChange(this.scale);
  }

  setZoom(newScale) {
    const centerScreenX = this.width / 2;
    const centerScreenY = this.height / 2;
    const clampedScale = Math.min(Math.max(newScale, this.minScale), this.maxScale);

    this.offsetX = centerScreenX - (centerScreenX - this.offsetX) * (clampedScale / this.scale);
    this.offsetY = centerScreenY - (centerScreenY - this.offsetY) * (clampedScale / this.scale);
    this.scale = clampedScale;

    this.render();
    if (this.onZoomChange) this.onZoomChange(this.scale);
  }

  fitToBounds(minX, minY, maxX, maxY, padding = 60) {
    const contentW = maxX - minX || 100;
    const contentH = maxY - minY || 100;

    const scaleX = (this.width - padding * 2) / contentW;
    const scaleY = (this.height - padding * 2) / contentH;
    this.scale = Math.min(Math.max(Math.min(scaleX, scaleY), this.minScale), 1.6);

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    this.offsetX = (this.width / 2) - (midX * this.scale);
    this.offsetY = (this.height / 2) - (midY * this.scale);

    this.render();
    if (this.onZoomChange) this.onZoomChange(this.scale);
  }

  clearScene() {
    this.elements = [];
    this.links = [];
    this.decorations = [];
    this.render();
  }

  setScene(elements, links, decorations = []) {
    this.elements = elements || [];
    this.links = links || [];
    this.decorations = decorations || [];
    this.render();
  }

  render() {
    const ctx = this.ctx;
    const isDark = document.body.classList.contains('dark-theme');

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();

    ctx.save();
    // Apply pan and zoom
    ctx.translate(this.offsetX, this.offsetY);
    ctx.scale(this.scale, this.scale);

    // Draw subtle grid
    this.drawBackgroundGrid(ctx, isDark);

    // 1. Draw Links / Edges
    for (const link of this.links) {
      this.drawLink(ctx, link, isDark);
    }

    // 2. Draw Elements (Circles, Rectangles, Shapes)
    for (const elem of this.elements) {
      if (elem.type === 'circle') {
        this.drawCircle(ctx, elem, isDark);
      } else if (elem.type === 'rect') {
        this.drawRect(ctx, elem, isDark);
      } else if (elem.type === 'pointer') {
        this.drawPointer(ctx, elem, isDark);
      } else if (elem.type === 'nil') {
        this.drawNilNode(ctx, elem, isDark);
      }
    }

    // 3. Draw Extra Annotations / Badges
    for (const dec of this.decorations) {
      this.drawDecoration(ctx, dec, isDark);
    }

    ctx.restore();
  }

  drawBackgroundGrid(ctx, isDark) {
    const gridSpacing = 40;
    const startX = -this.offsetX / this.scale - 100;
    const startY = -this.offsetY / this.scale - 100;
    const endX = (this.width - this.offsetX) / this.scale + 100;
    const endY = (this.height - this.offsetY) / this.scale + 100;

    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1 / this.scale;

    ctx.beginPath();
    for (let x = Math.floor(startX / gridSpacing) * gridSpacing; x <= endX; x += gridSpacing) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }
    for (let y = Math.floor(startY / gridSpacing) * gridSpacing; y <= endY; y += gridSpacing) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }
    ctx.stroke();
  }

  drawCircle(ctx, node, isDark) {
    const radius = node.radius || 24;
    ctx.save();
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

    // Fill
    ctx.fillStyle = node.fill || (isDark ? '#2d3748' : '#ffffff');
    ctx.fill();

    // Border
    ctx.lineWidth = node.highlighted ? 3.5 : 2;
    ctx.strokeStyle = node.highlighted 
      ? '#f59e0b' 
      : (node.stroke || (isDark ? '#4a5568' : '#cbd5e1'));
    ctx.stroke();

    // Node label
    ctx.fillStyle = node.textColor || (isDark ? '#f8fafc' : '#0f172a');
    ctx.font = 'bold 14px "Inter", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(node.label ?? ''), node.x, node.y);

    // Height / Balance factor badge (For AVL and BST)
    if (node.badge !== undefined && node.badge !== null && String(node.badge).trim() !== '') {
      ctx.save();
      ctx.font = 'bold 11px "Inter", system-ui, -apple-system, sans-serif';
      const textMetrics = ctx.measureText(String(node.badge));
      const textW = textMetrics.width;
      const badgePaddingX = 14;
      const badgeW = Math.max(textW + badgePaddingX, 48);
      const badgeH = 20;
      const badgeY = node.y - radius - 12;

      // Subtle shadow for clean layering above background and links
      ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;

      // Badge Background
      ctx.fillStyle = node.badgeColor || (node.isUnbalanced ? '#dc2626' : (isDark ? '#0284c7' : '#0369a1'));
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(node.x - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 10);
      } else {
        ctx.rect(node.x - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
      }
      ctx.fill();

      // Clear shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Crisp subtle border
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.6)';
      ctx.stroke();

      // Badge Text (Always centered inside the measured background pill)
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(node.badge), node.x, badgeY);
      ctx.restore();
    }

    // Subtitle / Index label
    if (node.sublabel) {
      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '11px "Inter", sans-serif';
      ctx.fillText(node.sublabel, node.x, node.y + radius + 14);
    }

    ctx.restore();
  }

  drawNilNode(ctx, node, isDark) {
    const size = node.size || 22;
    ctx.save();
    ctx.fillStyle = '#0f172a'; // Black sentinel node
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.rect(node.x - size / 2, node.y - size / 2, size, size);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NIL', node.x, node.y);
    ctx.restore();
  }

  drawRect(ctx, rect, isDark) {
    ctx.save();
    const w = rect.w || 40;
    const h = rect.h || 40;
    const x = rect.x;
    const y = rect.y;

    ctx.beginPath();
    ctx.fillStyle = rect.fill || (isDark ? '#1e293b' : '#f8fafc');
    ctx.rect(x, y, w, h);
    ctx.fill();

    ctx.lineWidth = rect.highlighted ? 3 : 1.5;
    ctx.strokeStyle = rect.highlighted ? '#f59e0b' : (rect.stroke || (isDark ? '#475569' : '#cbd5e1'));
    ctx.stroke();

    // Value
    if (rect.label !== undefined) {
      ctx.fillStyle = rect.textColor || (isDark ? '#f8fafc' : '#0f172a');
      ctx.font = rect.font || 'bold 14px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(rect.label), x + w / 2, y + h / 2);
    }

    // Index or descriptor under cell
    if (rect.index !== undefined) {
      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '11px "Inter", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`[${rect.index}]`, x + w / 2, y + h + 14);
    }

    // Pointer / Arrow indicator (e.g. i, j, top, head, tail)
    if (rect.pointer) {
      ctx.fillStyle = rect.pointerColor || '#ef4444';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`↓ ${rect.pointer}`, x + w / 2, y - 10);
    }

    ctx.restore();
  }

  drawLink(ctx, link, isDark) {
    ctx.save();
    let x1 = link.x1;
    let y1 = link.y1;
    let x2 = link.x2;
    let y2 = link.y2;

    const r1 = link.r1 || 0;
    const r2 = link.r2 || 0;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);

    // If node radiuses are provided, clip the link to start and end cleanly at node perimeters
    if (dist > (r1 + r2) && (r1 > 0 || r2 > 0) && !link.curved) {
      const angle = Math.atan2(dy, dx);
      x1 = link.x1 + Math.cos(angle) * r1;
      y1 = link.y1 + Math.sin(angle) * r1;
      x2 = link.x2 - Math.cos(angle) * r2;
      y2 = link.y2 - Math.sin(angle) * r2;
    }

    ctx.lineWidth = link.highlighted ? 3 : (link.width || 1.8);
    ctx.strokeStyle = link.highlighted 
      ? '#f59e0b' 
      : (link.color || (isDark ? '#475569' : '#94a3b8'));

    ctx.beginPath();
    if (link.curved) {
      const midX = (x1 + x2) / 2 - (y2 - y1) * 0.2;
      const midY = (y1 + y2) / 2 + (x2 - x1) * 0.2;
      ctx.quadraticCurveTo(midX, midY, x2, y2);
    } else {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();

    // Directed Arrow Head
    if (link.directed) {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const headlen = 10;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    }

    // Edge Weight / Label
    if (link.weight !== undefined) {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(link.weight), midX + 8, midY - 8);
    }

    ctx.restore();
  }

  drawPointer(ctx, ptr, isDark) {
    ctx.save();
    ctx.strokeStyle = ptr.color || (isDark ? '#38bdf8' : '#0284c7');
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = 2;

    if (ptr.isNull) {
      // Ground / Null symbol
      ctx.beginPath();
      ctx.moveTo(ptr.x - 12, ptr.y);
      ctx.lineTo(ptr.x + 12, ptr.y);
      ctx.moveTo(ptr.x - 8, ptr.y + 4);
      ctx.lineTo(ptr.x + 8, ptr.y + 4);
      ctx.moveTo(ptr.x - 4, ptr.y + 8);
      ctx.lineTo(ptr.x + 4, ptr.y + 8);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(ptr.x1, ptr.y1);
      ctx.lineTo(ptr.x2, ptr.y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawDecoration(ctx, dec, isDark) {
    ctx.save();
    if (dec.type === 'text') {
      ctx.fillStyle = dec.color || (isDark ? '#e2e8f0' : '#1e293b');
      ctx.font = dec.font || '13px "Inter", sans-serif';
      ctx.textAlign = dec.align || 'left';
      ctx.fillText(dec.text, dec.x, dec.y);
    }
    ctx.restore();
  }
}


// ==================== animator.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Animator & State-Timeline Engine with Bidirectional Step & Speed Control
 */
class Animator {
  constructor(canvas) {
    this.canvas = canvas;
    this.frames = [];
    this.currentFrame = -1;
    this.isPlaying = false;
    this.timer = null;
    this.speed = 400; // ms per step
    this.status = 'ready'; // 'ready', 'running', 'paused', 'completed'

    // Callbacks
    this.onFrameChange = null;
    this.onStatusChange = null;
  }

  setSpeed(ms) {
    this.speed = Math.max(50, Math.min(2000, ms));
    if (this.isPlaying) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.tick(), this.speed);
    }
  }

  setTimeline(frames, autoPlay = true) {
    this.stop();
    this.frames = frames || [];
    this.currentFrame = -1;

    if (this.frames.length > 0) {
      this.goToFrame(0);
      if (autoPlay) {
        this.play();
      } else {
        this.setStatus('ready');
      }
    } else {
      this.canvas.clearScene();
      this.setStatus('ready');
    }
  }

  addFrame(frame) {
    this.frames.push(frame);
    if (this.currentFrame === -1) {
      this.goToFrame(0);
    }
  }

  play() {
    if (this.frames.length === 0) return;
    if (this.currentFrame >= this.frames.length - 1) {
      // Replay from start if finished
      this.currentFrame = 0;
    }
    this.isPlaying = true;
    this.setStatus('running');
    clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), this.speed);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.timer);
    this.timer = null;
    this.setStatus('paused');
  }

  stop() {
    this.pause();
    this.currentFrame = -1;
    this.setStatus('ready');
  }

  tick() {
    if (this.currentFrame < this.frames.length - 1) {
      this.goToFrame(this.currentFrame + 1);
    } else {
      this.pause();
      this.setStatus('completed');
    }
  }

  stepForward() {
    this.pause();
    if (this.currentFrame < this.frames.length - 1) {
      this.goToFrame(this.currentFrame + 1);
    }
    if (this.currentFrame >= this.frames.length - 1) {
      this.setStatus('completed');
    }
  }

  stepBackward() {
    this.pause();
    if (this.currentFrame > 0) {
      this.goToFrame(this.currentFrame - 1);
      this.setStatus('paused');
    }
  }

  skipToEnd() {
    this.pause();
    if (this.frames.length > 0) {
      this.goToFrame(this.frames.length - 1);
      this.setStatus('completed');
    }
  }

  reset() {
    this.pause();
    if (this.frames.length > 0) {
      this.goToFrame(0);
      this.setStatus('ready');
    }
  }

  goToFrame(index) {
    if (index < 0 || index >= this.frames.length) return;
    this.currentFrame = index;
    const frame = this.frames[index];

    // Render snapshot on canvas
    this.canvas.setScene(frame.elements, frame.links, frame.decorations);

    // Auto-fit to bounds on initial frame or if explicitly requested
    if (frame.fitBounds) {
      this.autoFit(frame.elements);
    }

    if (this.onFrameChange) {
      this.onFrameChange({
        frameIndex: index,
        totalFrames: this.frames.length,
        message: frame.message || '',
        comparisons: frame.comparisons || 0,
        swaps: frame.swaps || 0,
        highlightLine: frame.highlightLine
      });
    }
  }

  autoFit(elements) {
    if (!elements || elements.length === 0) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const elem of elements) {
      const x = elem.x ?? 0;
      const y = elem.y ?? 0;
      const w = elem.w ?? elem.radius ?? 30;
      const h = elem.h ?? elem.radius ?? 30;
      minX = Math.min(minX, x - w);
      minY = Math.min(minY, y - h);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);
    }
    if (minX !== Infinity) {
      this.canvas.fitToBounds(minX, minY, maxX, maxY);
    }
  }

  setStatus(newStatus) {
    this.status = newStatus;
    if (this.onStatusChange) {
      this.onStatusChange(newStatus);
    }
  }
}


// ==================== trees.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Tree Algorithms: AVL (with configurable BF), Red-Black Tree (with NIL toggle), BST, B-Tree
 */
class TreeAlgorithms {
  constructor() {
    this.bfConvention = 'leftMinusRight'; // 'leftMinusRight' | 'rightMinusLeft'
    this.showHeights = true;
    this.showNilNodes = true;
    this.badgeMode = 'both'; // 'both' | 'bfOnly' | 'heightOnly'

    // Active tree roots
    this.avlRoot = null;
    this.rbRoot = null;
    this.bstRoot = null;
  }

  setBfConvention(conv) {
    this.bfConvention = conv;
  }

  setBadgeMode(mode) {
    this.badgeMode = mode;
  }

  setShowHeights(show) {
    this.showHeights = show;
  }

  setShowNilNodes(show) {
    this.showNilNodes = show;
  }

  // ==========================================
  // AVL TREE IMPLEMENTATION
  // ==========================================

  createAvlNode(key) {
    return {
      key: Number(key),
      height: 1,
      left: null,
      right: null,
      x: 0,
      y: 0
    };
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    if (!node) return 0;
    const hL = this.getHeight(node.left);
    const hR = this.getHeight(node.right);
    return this.bfConvention === 'leftMinusRight' ? (hL - hR) : (hR - hL);
  }

  updateHeight(node) {
    if (node) {
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
  }

  layoutTree(root, isRedBlack = false) {
    if (!root) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: isRedBlack
            ? 'Árvore Rubro-Negra vazia. Digite um valor acima e clique em "Inserir" ou "Gerar Conjunto Aleatório".'
            : 'Árvore AVL vazia. Digite um valor acima e clique em "Inserir" ou "Gerar Conjunto Aleatório".',
          x: 120,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#64748b'
        }]
      };
    }

    const elements = [];
    const links = [];

    // 1. Calculate horizontal positions via in-order numbering
    let xCounter = 1;
    const assignCoords = (node, depth) => {
      if (!node) return;
      if (node.left) assignCoords(node.left, depth + 1);

      node.gridX = xCounter++;
      node.gridY = depth;

      if (node.right) assignCoords(node.right, depth + 1);
    };
    assignCoords(root, 1);

    // Convert grid coords to pixels
    const spacingX = 60;
    const spacingY = 85;
    const startX = 180;
    const startY = 85;

    const toPixels = (node) => {
      if (!node) return;
      node.x = startX + node.gridX * spacingX;
      node.y = startY + node.gridY * spacingY;
      if (node.left) toPixels(node.left);
      if (node.right) toPixels(node.right);
    };
    toPixels(root);

    // Collect visual shapes and links
    const collectVisuals = (node) => {
      if (!node) return;

      // Children links
      if (node.left) {
        links.push({
          x1: node.x, y1: node.y,
          x2: node.left.x, y2: node.left.y,
          r1: 22, r2: 22,
          color: '#64748b',
          highlighted: node.left.highlighted
        });
        collectVisuals(node.left);
      } else if (isRedBlack && this.showNilNodes) {
        // Draw NIL node link
        const nilX = node.x - 28;
        const nilY = node.y + 55;
        links.push({ x1: node.x, y1: node.y, x2: nilX, y2: nilY, r1: 22, r2: 10, color: '#94a3b8' });
        elements.push({ type: 'nil', x: nilX, y: nilY, size: 20 });
      }

      if (node.right) {
        links.push({
          x1: node.x, y1: node.y,
          x2: node.right.x, y2: node.right.y,
          r1: 22, r2: 22,
          color: '#64748b',
          highlighted: node.right.highlighted
        });
        collectVisuals(node.right);
      } else if (isRedBlack && this.showNilNodes) {
        const nilX = node.x + 28;
        const nilY = node.y + 55;
        links.push({ x1: node.x, y1: node.y, x2: nilX, y2: nilY, r1: 22, r2: 10, color: '#94a3b8' });
        elements.push({ type: 'nil', x: nilX, y: nilY, size: 20 });
      }

      // Node element
      const bf = this.getBalanceFactor(node);
      const isUnbalanced = Math.abs(bf) > 1;

      let fill = '#ffffff';
      let textColor = '#0f172a';
      let stroke = '#64748b';

      if (isRedBlack) {
        fill = node.color === 'RED' ? '#ef4444' : '#1e293b';
        textColor = '#ffffff';
        stroke = node.color === 'RED' ? '#b91c1c' : '#0f172a';
      }

      let badge = undefined;
      let badgeColor = undefined;
      if (this.showHeights && !isRedBlack) {
        const sign = bf > 0 ? `+${bf}` : `${bf}`;
        if (this.badgeMode === 'bfOnly') {
          badge = `FB: ${sign}`;
        } else if (this.badgeMode === 'heightOnly') {
          badge = `h: ${node.height}`;
        } else {
          badge = `FB: ${sign} | h: ${node.height}`;
        }

        if (isUnbalanced) {
          badgeColor = '#dc2626'; // Alert red
        } else if (bf === 0) {
          badgeColor = '#059669'; // Balanced green
        } else {
          badgeColor = '#0284c7'; // Balanced blue
        }
      }

      elements.push({
        type: 'circle',
        x: node.x,
        y: node.y,
        radius: 22,
        label: node.key,
        fill,
        stroke,
        textColor,
        highlighted: node.highlighted,
        badge,
        badgeColor,
        isUnbalanced
      });
    };

    collectVisuals(root);
    return { elements, links };
  }

  // Deep clone tree structure for immutable animation snapshots
  cloneTree(root) {
    if (!root) return null;
    return {
      key: root.key,
      height: root.height,
      color: root.color,
      left: this.cloneTree(root.left),
      right: this.cloneTree(root.right)
    };
  }

  // AVL Insert with detailed animation steps
  generateAvlInsertFrames(key) {
    const frames = [];
    key = Number(key);

    const recordStep = (msg, highlightedKey = null, fitBounds = false) => {
      const scene = this.layoutTree(this.avlRoot);
      if (highlightedKey !== null) {
        const found = scene.elements.find(e => e.label === highlightedKey);
        if (found) found.highlighted = true;
      }
      frames.push({
        elements: scene.elements,
        links: scene.links,
        decorations: [],
        message: msg,
        fitBounds
      });
    };

    recordStep(`Iniciando inserção do valor ${key} na Árvore AVL.`);

    const rotateRight = (y) => {
      const x = y.left;
      const T2 = x.right;
      x.right = y;
      y.left = T2;
      this.updateHeight(y);
      this.updateHeight(x);
      return x;
    };

    const rotateLeft = (x) => {
      const y = x.right;
      const T2 = y.left;
      y.left = x;
      x.right = T2;
      this.updateHeight(x);
      this.updateHeight(y);
      return y;
    };

    const insertNode = (node, val) => {
      if (!node) {
        const newNode = this.createAvlNode(val);
        return newNode;
      }

      if (val < node.key) {
        recordStep(`Chave ${val} < ${node.key}. Descendo para a subárvore esquerda.`, node.key);
        node.left = insertNode(node.left, val);
      } else if (val > node.key) {
        recordStep(`Chave ${val} > ${node.key}. Descendo para a subárvore direita.`, node.key);
        node.right = insertNode(node.right, val);
      } else {
        recordStep(`Chave ${val} já existe na árvore. Nenhuma alteração feita.`, node.key);
        return node;
      }

      this.updateHeight(node);
      const bf = this.getBalanceFactor(node);
      recordStep(`Retornando ao nó ${node.key}. Altura atualizada: ${node.height}, Fator de Balanço (FB): ${bf}`, node.key);

      // Check balance violations depending on chosen convention:
      // In Left-Right: bf > 1 is Left-heavy, bf < -1 is Right-heavy
      // In Right-Left: bf < -1 is Left-heavy, bf > 1 is Right-heavy
      const isLeftHeavy = this.bfConvention === 'leftMinusRight' ? (bf > 1) : (bf < -1);
      const isRightHeavy = this.bfConvention === 'leftMinusRight' ? (bf < -1) : (bf > 1);

      // Case 1: Left-Left
      if (isLeftHeavy && val < node.left.key) {
        recordStep(`[ROTAÇÃO SIMPLES À DIREITA (LL)] Desbalanceamento no nó ${node.key} (FB=${bf}). Filho esquerdo ${node.left.key} desce à direita.`, node.key);
        const newSubRoot = rotateRight(node);
        recordStep(`[ROTAÇÃO CONCLUÍDA (LL)] Rotação à Direita finalizada em torno de ${newSubRoot.key}. Subárvore balanceada.`, newSubRoot.key);
        return newSubRoot;
      }

      // Case 2: Right-Right
      if (isRightHeavy && val > node.right.key) {
        recordStep(`[ROTAÇÃO SIMPLES À ESQUERDA (RR)] Desbalanceamento no nó ${node.key} (FB=${bf}). Filho direito ${node.right.key} desce à esquerda.`, node.key);
        const newSubRoot = rotateLeft(node);
        recordStep(`[ROTAÇÃO CONCLUÍDA (RR)] Rotação à Esquerda finalizada em torno de ${newSubRoot.key}. Subárvore balanceada.`, newSubRoot.key);
        return newSubRoot;
      }

      // Case 3: Left-Right
      if (isLeftHeavy && val > node.left.key) {
        recordStep(`[ROTAÇÃO DUPLA ESQUERDA-DIREITA (LR)] Desbalanceamento no nó ${node.key} (FB=${bf}). Passo 1: Rotacionar filho ${node.left.key} à Esquerda.`, node.key);
        node.left = rotateLeft(node.left);
        recordStep(`[ROTAÇÃO DUPLA (LR) - PASSO 2] Rotação à Esquerda concluída no filho. Agora executando Rotação à Direita em ${node.key}.`, node.key);
        const newSubRoot = rotateRight(node);
        recordStep(`[ROTAÇÃO CONCLUÍDA (LR)] Rotação Dupla Esquerda-Direita finalizada. Nova raiz da subárvore: ${newSubRoot.key}.`, newSubRoot.key);
        return newSubRoot;
      }

      // Case 4: Right-Left
      if (isRightHeavy && val < node.right.key) {
        recordStep(`[ROTAÇÃO DUPLA DIREITA-ESQUERDA (RL)] Desbalanceamento no nó ${node.key} (FB=${bf}). Passo 1: Rotacionar filho ${node.right.key} à Direita.`, node.key);
        node.right = rotateRight(node.right);
        recordStep(`[ROTAÇÃO DUPLA (RL) - PASSO 2] Rotação à Direita concluída no filho. Agora executando Rotação à Esquerda em ${node.key}.`, node.key);
        const newSubRoot = rotateLeft(node);
        recordStep(`[ROTAÇÃO CONCLUÍDA (RL)] Rotação Dupla Direita-Esquerda finalizada. Nova raiz da subárvore: ${newSubRoot.key}.`, newSubRoot.key);
        return newSubRoot;
      }

      return node;
    };

    this.avlRoot = insertNode(this.avlRoot, key);
    recordStep(`Inserção de ${key} concluída. Árvore AVL balanceada!`, key, true);
    return frames;
  }

  clearAvl() {
    this.avlRoot = null;
  }

  generateAvlDeleteFrames(key) {
    const frames = [];
    key = Number(key);

    const recordStep = (msg, highlightedKey = null, fitBounds = false) => {
      const scene = this.layoutTree(this.avlRoot);
      if (highlightedKey !== null) {
        const found = scene.elements.find(e => e.label === highlightedKey);
        if (found) found.highlighted = true;
      }
      frames.push({
        elements: scene.elements,
        links: scene.links,
        decorations: [],
        message: msg,
        fitBounds
      });
    };

    if (!this.avlRoot) {
      frames.push({
        elements: [],
        links: [],
        decorations: [],
        message: `A árvore AVL está vazia. Nenhuma exclusão a realizar.`
      });
      return frames;
    }

    recordStep(`Iniciando busca para remoção da chave ${key} na Árvore AVL.`);

    const rotateRight = (y) => {
      const x = y.left;
      const T2 = x.right;
      x.right = y;
      y.left = T2;
      this.updateHeight(y);
      this.updateHeight(x);
      return x;
    };

    const rotateLeft = (x) => {
      const y = x.right;
      const T2 = y.left;
      y.left = x;
      x.right = T2;
      this.updateHeight(x);
      this.updateHeight(y);
      return y;
    };

    const getMinValueNode = (node) => {
      let current = node;
      while (current.left) {
        current = current.left;
      }
      return current;
    };

    let keyFound = false;

    const deleteNode = (node, val) => {
      if (!node) {
        recordStep(`Chave ${val} não encontrada na árvore.`, null);
        return null;
      }

      if (val < node.key) {
        recordStep(`Chave ${val} < ${node.key}. Descendo para a subárvore esquerda.`, node.key);
        node.left = deleteNode(node.left, val);
      } else if (val > node.key) {
        recordStep(`Chave ${val} > ${node.key}. Descendo para a subárvore direita.`, node.key);
        node.right = deleteNode(node.right, val);
      } else {
        keyFound = true;
        recordStep(`Chave ${val} localizada no nó ${node.key}! Iniciando procedimento de remoção.`, node.key);

        // Case 1 or 2: Node with 0 or 1 child
        if (!node.left || !node.right) {
          const temp = node.left ? node.left : node.right;
          if (!temp) {
            // Leaf node (0 children)
            recordStep(`O nó ${node.key} é folha (sem filhos). Removendo diretamente.`, node.key);
            node = null;
            return null;
          } else {
            // 1 child
            recordStep(`O nó ${node.key} possui 1 filho (${temp.key}). Substituindo nó pelo filho.`, node.key);
            node = temp;
          }
        } else {
          // Case 3: Node with 2 children
          const successor = getMinValueNode(node.right);
          recordStep(`O nó ${node.key} tem 2 filhos. Buscando sucessor em-ordem: nó ${successor.key}.`, successor.key);
          node.key = successor.key;
          recordStep(`Copiando valor do sucessor (${successor.key}) para o nó. Removendo sucessor da subárvore direita.`, node.key);
          node.right = deleteNode(node.right, successor.key);
        }
      }

      if (!node) return null;

      this.updateHeight(node);
      const bf = this.getBalanceFactor(node);
      recordStep(`Retornando ao nó ${node.key}. Altura recalculada: ${node.height}, Fator de Balanço: ${bf}`, node.key);

      const isLeftHeavy = this.bfConvention === 'leftMinusRight' ? (bf > 1) : (bf < -1);
      const isRightHeavy = this.bfConvention === 'leftMinusRight' ? (bf < -1) : (bf > 1);

      if (isLeftHeavy) {
        const leftBf = this.getBalanceFactor(node.left);
        const leftChildBalancedOrLeftHeavy = this.bfConvention === 'leftMinusRight' ? (leftBf >= 0) : (leftBf <= 0);

        if (leftChildBalancedOrLeftHeavy) {
          recordStep(`[ROTAÇÃO SIMPLES À DIREITA (LL)] Desbalanceamento no nó ${node.key} após exclusão (FB=${bf}). Executando Rotação Simples à Direita.`, node.key);
          const newSubRoot = rotateRight(node);
          recordStep(`[ROTAÇÃO CONCLUÍDA (LL)] Rotação à Direita concluída em torno de ${newSubRoot.key}.`, newSubRoot.key);
          return newSubRoot;
        } else {
          recordStep(`[ROTAÇÃO DUPLA ESQUERDA-DIREITA (LR)] Desbalanceamento no nó ${node.key} (FB=${bf}). Passo 1: Rotacionar filho ${node.left.key} à Esquerda.`, node.key);
          node.left = rotateLeft(node.left);
          recordStep(`[ROTAÇÃO DUPLA (LR) - PASSO 2] Rotação à Esquerda no filho finalizada. Executando Rotação à Direita em ${node.key}.`, node.key);
          const newSubRoot = rotateRight(node);
          recordStep(`[ROTAÇÃO CONCLUÍDA (LR)] Rotação Dupla finalizada. Nova raiz: ${newSubRoot.key}.`, newSubRoot.key);
          return newSubRoot;
        }
      }

      if (isRightHeavy) {
        const rightBf = this.getBalanceFactor(node.right);
        const rightChildBalancedOrRightHeavy = this.bfConvention === 'leftMinusRight' ? (rightBf <= 0) : (rightBf >= 0);

        if (rightChildBalancedOrRightHeavy) {
          recordStep(`[ROTAÇÃO SIMPLES À ESQUERDA (RR)] Desbalanceamento no nó ${node.key} após exclusão (FB=${bf}). Executando Rotação Simples à Esquerda.`, node.key);
          const newSubRoot = rotateLeft(node);
          recordStep(`[ROTAÇÃO CONCLUÍDA (RR)] Rotação à Esquerda concluída em torno de ${newSubRoot.key}.`, newSubRoot.key);
          return newSubRoot;
        } else {
          recordStep(`[ROTAÇÃO DUPLA DIREITA-ESQUERDA (RL)] Desbalanceamento no nó ${node.key} (FB=${bf}). Passo 1: Rotacionar filho ${node.right.key} à Direita.`, node.key);
          node.right = rotateRight(node.right);
          recordStep(`[ROTAÇÃO DUPLA (RL) - PASSO 2] Rotação à Direita no filho finalizada. Executando Rotação à Esquerda em ${node.key}.`, node.key);
          const newSubRoot = rotateLeft(node);
          recordStep(`[ROTAÇÃO CONCLUÍDA (RL)] Rotação Dupla finalizada. Nova raiz: ${newSubRoot.key}.`, newSubRoot.key);
          return newSubRoot;
        }
      }

      return node;
    };

    this.avlRoot = deleteNode(this.avlRoot, key);
    if (keyFound) {
      recordStep(`Remoção da chave ${key} concluída com sucesso! Árvore AVL rebalanceada.`, null, true);
    } else {
      recordStep(`Fim da operação. A chave ${key} não existia na árvore.`, null, true);
    }

    return frames;
  }

  // ==========================================
  // RED-BLACK TREE IMPLEMENTATION
  // ==========================================

  createRbNode(key) {
    return {
      key: Number(key),
      color: 'RED', // Always insert as RED
      left: null,
      right: null,
      parent: null,
      x: 0,
      y: 0
    };
  }

  generateRbInsertFrames(key) {
    const frames = [];
    key = Number(key);

    const recordStep = (msg, highlightedKey = null, fitBounds = false) => {
      const scene = this.layoutTree(this.rbRoot, true);
      if (highlightedKey !== null) {
        const found = scene.elements.find(e => e.label === highlightedKey);
        if (found) found.highlighted = true;
      }
      frames.push({
        elements: scene.elements,
        links: scene.links,
        decorations: [],
        message: msg,
        fitBounds
      });
    };

    recordStep(`Iniciando inserção do valor ${key} na Árvore Rubro-Negra (nó inserido como VERMELHO).`);

    const rotateLeft = (x) => {
      const y = x.right;
      x.right = y.left;
      if (y.left) y.left.parent = x;
      y.parent = x.parent;
      if (!x.parent) {
        this.rbRoot = y;
      } else if (x === x.parent.left) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
      y.left = x;
      x.parent = y;
    };

    const rotateRight = (y) => {
      const x = y.left;
      y.left = x.right;
      if (x.right) x.right.parent = y;
      x.parent = y.parent;
      if (!y.parent) {
        this.rbRoot = x;
      } else if (y === y.parent.left) {
        y.parent.left = x;
      } else {
        y.parent.right = x;
      }
      x.right = y;
      y.parent = x;
    };

    // Standard BST insertion with parent tracking
    let node = this.createRbNode(key);
    let parent = null;
    let curr = this.rbRoot;

    while (curr) {
      parent = curr;
      if (node.key < curr.key) {
        recordStep(`Chave ${node.key} < ${curr.key}. Descendo para esquerda.`, curr.key);
        curr = curr.left;
      } else if (node.key > curr.key) {
        recordStep(`Chave ${node.key} > ${curr.key}. Descendo para direita.`, curr.key);
        curr = curr.right;
      } else {
        recordStep(`Chave ${node.key} já existe na árvore. Nenhuma alteração necessária.`, curr.key);
        return frames;
      }
    }

    node.parent = parent;
    if (!parent) {
      this.rbRoot = node;
      recordStep(`Árvore estava vazia. Nó ${key} inserido como raiz.`, key);
    } else if (node.key < parent.key) {
      parent.left = node;
      recordStep(`Nó ${key} anexado como filho esquerdo de ${parent.key}.`, key);
    } else {
      parent.right = node;
      recordStep(`Nó ${key} anexado como filho direito de ${parent.key}.`, key);
    }

    // Fixup Red-Black Tree invariant violations
    let z = node;
    while (z.parent && z.parent.color === 'RED') {
      if (z.parent === z.parent.parent.left) {
        const uncle = z.parent.parent.right;
        if (uncle && uncle.color === 'RED') {
          // Case 1: Uncle is RED -> Recolor parent, uncle, and grandparent
          recordStep(`[RECOLORAÇÃO (CASO 1: Tio Vermelho)] Pai ${z.parent.key} e Tio ${uncle.key} -> PRETO. Avô ${z.parent.parent.key} -> VERMELHO. O problema sobe para o avô.`, z.key);
          z.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
          recordStep(`[RECOLORAÇÃO CONCLUÍDA] Verificando invariantes no nó ${z.key}.`, z.key);
        } else {
          // Uncle is BLACK
          if (z === z.parent.right) {
            // Case 2: Triangle shape -> Rotate left on parent
            recordStep(`[ROTAÇÃO (CASO 2: Joelho)] Tio é PRETO e nó ${z.key} forma triângulo. Executando rotação à esquerda em ${z.parent.key} para alinhar em reta.`, z.key);
            z = z.parent;
            rotateLeft(z);
            recordStep(`[ROTAÇÃO DO CASO 2 FINALIZADA] Alinhado em linha reta. Transformado no Caso 3.`, z.key);
          }
          // Case 3: Line shape -> Rotate right on grandparent and recolor
          recordStep(`[ROTAÇÃO E RECOLORAÇÃO (CASO 3: Reta)] Tio é PRETO em reta. Recolore Pai ${z.parent.key} -> PRETO, Avô ${z.parent.parent.key} -> VERMELHO. Rotacionando à direita no Avô.`, z.key);
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          rotateRight(z.parent.parent);
          recordStep(`[ROTAÇÃO E RECOLORAÇÃO CONCLUÍDAS] Balanceamento concluído no Caso 3.`, z.key);
        }
      } else {
        // Symmetric cases (parent is right child of grandparent)
        const uncle = z.parent.parent.left;
        if (uncle && uncle.color === 'RED') {
          recordStep(`[RECOLORAÇÃO (CASO 1: Tio Vermelho)] Pai ${z.parent.key} e Tio ${uncle.key} -> PRETO. Avô ${z.parent.parent.key} -> VERMELHO. O problema sobe para o avô.`, z.key);
          z.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
          recordStep(`[RECOLORAÇÃO CONCLUÍDA] Verificando invariantes no nó ${z.key}.`, z.key);
        } else {
          if (z === z.parent.left) {
            recordStep(`[ROTAÇÃO (CASO 2: Joelho)] Tio é PRETO e nó ${z.key} forma triângulo à esquerda. Rotação à direita em ${z.parent.key}.`, z.key);
            z = z.parent;
            rotateRight(z);
            recordStep(`[ROTAÇÃO DO CASO 2 FINALIZADA] Alinhado em linha reta. Transformado no Caso 3.`, z.key);
          }
          recordStep(`[ROTAÇÃO E RECOLORAÇÃO (CASO 3: Reta)] Tio é PRETO em reta. Recolore Pai -> PRETO, Avô -> VERMELHO. Rotação à esquerda no Avô.`, z.key);
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          rotateLeft(z.parent.parent);
          recordStep(`[ROTAÇÃO E RECOLORAÇÃO CONCLUÍDAS] Balanceamento concluído no Caso 3.`, z.key);
        }
      }
    }

    if (this.rbRoot.color !== 'BLACK') {
      this.rbRoot.color = 'BLACK';
      recordStep(`[RECOLORAÇÃO DA RAIZ] Propriedade 2: A raiz ${this.rbRoot.key} é recolorida para PRETO.`, this.rbRoot.key);
    }

    recordStep(`Inserção de ${key} concluída com sucesso na Árvore Rubro-Negra!`, key, true);
    return frames;
  }

  clearRb() {
    this.rbRoot = null;
  }

  generateRbDeleteFrames(key) {
    const frames = [];
    key = Number(key);

    const recordStep = (msg, highlightedKey = null, fitBounds = false) => {
      const scene = this.layoutTree(this.rbRoot, true);
      if (highlightedKey !== null) {
        const found = scene.elements.find(e => e.label === highlightedKey);
        if (found) found.highlighted = true;
      }
      frames.push({
        elements: scene.elements,
        links: scene.links,
        decorations: [],
        message: msg,
        fitBounds
      });
    };

    if (!this.rbRoot) {
      frames.push({
        elements: [],
        links: [],
        decorations: [],
        message: `A árvore Rubro-Negra está vazia. Nenhuma exclusão a realizar.`
      });
      return frames;
    }

    recordStep(`Iniciando busca para remoção da chave ${key} na Árvore Rubro-Negra.`);

    let curr = this.rbRoot;
    while (curr && curr.key !== key) {
      if (key < curr.key) {
        recordStep(`Chave ${key} < ${curr.key}. Descendo para esquerda.`, curr.key);
        curr = curr.left;
      } else {
        recordStep(`Chave ${key} > ${curr.key}. Descendo para direita.`, curr.key);
        curr = curr.right;
      }
    }

    if (!curr) {
      recordStep(`Chave ${key} não encontrada na Árvore Rubro-Negra.`, null);
      return frames;
    }

    recordStep(`Chave ${key} encontrada (cor: ${curr.color === 'RED' ? 'VERMELHO' : 'PRETO'}). Iniciando remoção.`, curr.key);

    const getMin = (node) => {
      while (node.left) node = node.left;
      return node;
    };

    const transplant = (u, v) => {
      if (!u.parent) {
        this.rbRoot = v;
      } else if (u === u.parent.left) {
        u.parent.left = v;
      } else {
        u.parent.right = v;
      }
      if (v) v.parent = u.parent;
    };

    let y = curr;
    let yOrigColor = y.color;
    let x = null;

    if (!curr.left) {
      x = curr.right;
      transplant(curr, curr.right);
      recordStep(`Nó ${key} não possuía filho esquerdo. Substituído por filho direito.`, x ? x.key : null);
    } else if (!curr.right) {
      x = curr.left;
      transplant(curr, curr.left);
      recordStep(`Nó ${key} não possuía filho direito. Substituído por filho esquerdo.`, x ? x.key : null);
    } else {
      y = getMin(curr.right);
      yOrigColor = y.color;
      x = y.right;
      recordStep(`Nó ${key} possui 2 filhos. Sucessor em-ordem: nó ${y.key}.`, y.key);

      if (y.parent === curr) {
        if (x) x.parent = y;
      } else {
        transplant(y, y.right);
        y.right = curr.right;
        y.right.parent = y;
      }

      transplant(curr, y);
      y.left = curr.left;
      y.left.parent = y;
      y.color = curr.color;
      recordStep(`Sucessor ${y.key} substituiu ${curr.key} preservando a cor original.`, y.key);
    }

    if (this.rbRoot) {
      this.rbRoot.color = 'BLACK';
    }

    recordStep(`Remoção da chave ${key} concluída com sucesso na Árvore Rubro-Negra!`, null, true);
    return frames;
  }
}


// ==================== arrays.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Array Algorithms Module (Linear/Binary Search, Two Pointers, Sliding Window, Kadane, Dutch Flag, Rotate)
 */
class ArrayAlgorithms {
  constructor() {
    this.array = [];
  }

  setArray(arr) {
    this.array = arr.map(Number);
  }

  clear() {
    this.array = [];
  }

  insertElement(val) {
    const frames = [];
    val = Number(val);
    const arr = [...this.array];
    arr.push(val);
    this.array = arr;
    frames.push({
      ...this.buildScene(arr, {}, [arr.length - 1], `Elemento ${val} inserido no array (índice ${arr.length - 1}).`),
      message: `Elemento ${val} inserido no final do array.`
    });
    return frames;
  }

  deleteElement(target) {
    const frames = [];
    target = Number(target);
    const arr = [...this.array];
    const idx = arr.indexOf(target);

    if (idx === -1) {
      frames.push({
        ...this.buildScene(arr, {}, [], `Elemento ${target} não encontrado no array.`),
        message: `Elemento ${target} não existe no array.`
      });
      return frames;
    }

    frames.push({
      ...this.buildScene(arr, { del: idx }, [idx], `Elemento ${target} localizado no índice ${idx}. Removendo...`),
      message: `Elemento ${target} encontrado no índice ${idx}. Deslocando elementos.`
    });

    arr.splice(idx, 1);
    this.array = arr;

    frames.push({
      ...this.buildScene(arr, {}, [], `Elemento ${target} removido com sucesso.`),
      message: `Elemento ${target} removido. Tamanho atual do array: ${arr.length}.`
    });

    return frames;
  }

  generateRandomArray(size = 10, min = 1, max = 99) {
    this.array = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    return this.array;
  }

  // Build visual snapshot from array
  buildScene(arr, pointers = {}, highlightedIndices = [], statusMessage = '') {
    const elements = [];
    const cellW = 55;
    const cellH = 50;
    const startX = 120;
    const startY = 220;

    if (arr.length === 0) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: 'Array vazio. Insira valores no campo acima ou clique em "Gerar Conjunto Aleatório".',
          x: 180,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#64748b'
        }]
      };
    }

    arr.forEach((val, idx) => {
      const isHighlighted = highlightedIndices.includes(idx);
      const ptrs = [];
      for (const [ptrName, ptrIdx] of Object.entries(pointers)) {
        if (ptrIdx === idx) ptrs.push(ptrName);
      }

      elements.push({
        type: 'rect',
        x: startX + idx * (cellW + 8),
        y: startY,
        w: cellW,
        h: cellH,
        label: val,
        index: idx,
        highlighted: isHighlighted,
        pointer: ptrs.length > 0 ? ptrs.join(',') : undefined,
        pointerColor: ptrs.includes('mid') ? '#38bdf8' : (ptrs.includes('high') ? '#ef4444' : '#10b981'),
        fill: isHighlighted ? '#fef3c7' : undefined
      });
    });

    return {
      elements,
      links: [],
      decorations: statusMessage ? [{ type: 'text', text: statusMessage, x: startX, y: startY - 50, font: 'bold 16px "Inter", sans-serif' }] : []
    };
  }

  // 1. Linear Search
  generateLinearSearchFrames(target) {
    const frames = [];
    const arr = [...this.array];
    target = Number(target);

    frames.push({
      ...this.buildScene(arr, {}, [], `Iniciando Busca Linear pelo valor ${target}.`),
      message: `Iniciando Busca Linear pelo elemento ${target} no array de tamanho ${arr.length}.`
    });

    let found = false;
    for (let i = 0; i < arr.length; i++) {
      const match = arr[i] === target;
      frames.push({
        ...this.buildScene(arr, { i }, [i], `Comparando arr[${i}] = ${arr[i]} com ${target}.`),
        message: match 
          ? `Elemento ${target} ENCONTRADO no índice ${i}!` 
          : `arr[${i}] = ${arr[i]} não é igual a ${target}. Avançando...`,
        comparisons: i + 1
      });

      if (match) {
        found = true;
        break;
      }
    }

    if (!found) {
      frames.push({
        ...this.buildScene(arr, {}, [], `Elemento ${target} não existe no array.`),
        message: `Fim da busca: O valor ${target} NÃO foi encontrado no array.`
      });
    }

    return frames;
  }

  // 2. Binary Search
  generateBinarySearchFrames(target) {
    if (this.array.length === 0) {
      return [{
        ...this.buildScene([]),
        message: 'Array vazio! Insira valores ou clique em "Gerar Conjunto Aleatório" antes de buscar.'
      }];
    }
    const frames = [];
    const arr = [...this.array].sort((a, b) => a - b); // Must be sorted
    this.array = arr;
    target = Number(target);

    frames.push({
      ...this.buildScene(arr, {}, [], `Array pré-ordenado para Busca Binária. Alvo: ${target}.`),
      message: `Array ordenado. Iniciando busca binária por ${target}.`
    });

    let low = 0;
    let high = arr.length - 1;
    let comparisons = 0;
    let found = false;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      comparisons++;

      frames.push({
        ...this.buildScene(arr, { low, mid, high }, [mid], `low=${low}, mid=${mid}, high=${high}. Comparando arr[${mid}] (${arr[mid]}) com ${target}.`),
        message: `Calculado mid = ${mid}. Comparando arr[${mid}] = ${arr[mid]} com alvo ${target}.`,
        comparisons
      });

      if (arr[mid] === target) {
        found = true;
        frames.push({
          ...this.buildScene(arr, { mid }, [mid], `Elemento ${target} ENCONTRADO no índice ${mid}!`),
          message: `Sucesso! Elemento ${target} encontrado na posição ${mid} com ${comparisons} comparações.`,
          comparisons
        });
        break;
      } else if (arr[mid] < target) {
        frames.push({
          ...this.buildScene(arr, { low, mid, high }, [mid], `arr[${mid}] < ${target}. Descartando metade esquerda [${low}..${mid}].`),
          message: `${arr[mid]} < ${target}. O alvo deve estar à direita. Ajustando low = ${mid + 1}.`,
          comparisons
        });
        low = mid + 1;
      } else {
        frames.push({
          ...this.buildScene(arr, { low, mid, high }, [mid], `arr[${mid}] > ${target}. Descartando metade direita [${mid}..${high}].`),
          message: `${arr[mid]} > ${target}. O alvo deve estar à esquerda. Ajustando high = ${mid - 1}.`,
          comparisons
        });
        high = mid - 1;
      }
    }

    if (!found) {
      frames.push({
        ...this.buildScene(arr, {}, [], `Elemento ${target} não encontrado no array (low > high).`),
        message: `Busca finalizada: O valor ${target} NÃO está presente no array.`
      });
    }

    return frames;
  }

  // 3. Two Pointers: Invert Array
  generateReverseFrames() {
    if (this.array.length === 0) {
      return [{
        ...this.buildScene([]),
        message: 'Array vazio! Insira valores ou clique em "Gerar Conjunto Aleatório" antes de inverter.'
      }];
    }
    const frames = [];
    const arr = [...this.array];
    let left = 0;
    let right = arr.length - 1;
    let swaps = 0;

    frames.push({
      ...this.buildScene(arr, { left, right }, [left, right], `Iniciando Inversão com Dois Ponteiros.`),
      message: `Ponteiro esquerdo no índice 0, direito no índice ${right}.`
    });

    while (left < right) {
      frames.push({
        ...this.buildScene(arr, { left, right }, [left, right], `Trocando arr[${left}] (${arr[left]}) com arr[${right}] (${arr[right]}).`),
        message: `Invertendo elementos: arr[${left}] <-> arr[${right}].`,
        swaps
      });

      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      swaps++;

      frames.push({
        ...this.buildScene(arr, { left, right }, [left, right], `Troca realizada. Avançando ponteiros.`),
        message: `Avançando: left = ${left + 1}, right = ${right - 1}.`,
        swaps
      });

      left++;
      right--;
    }

    frames.push({
      ...this.buildScene(arr, {}, [], `Array completamente invertido em O(n/2) passos!`),
      message: `Inversão de array concluída com ${swaps} trocas.`,
      swaps
    });

    this.array = arr;
    return frames;
  }

  // 4. Sliding Window: Max Subarray of size K
  generateSlidingWindowFrames(k = 3) {
    if (this.array.length === 0) {
      return [{
        ...this.buildScene([]),
        message: 'Array vazio! Insira valores ou clique em "Gerar Conjunto Aleatório".'
      }];
    }
    const frames = [];
    const arr = [...this.array];
    k = Math.max(1, Math.min(k, arr.length));

    // First window sum
    let windowSum = 0;
    const initialIndices = [];
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
      initialIndices.push(i);
    }
    let maxSum = windowSum;
    let bestStart = 0;

    frames.push({
      ...this.buildScene(arr, { 'inicio': 0, 'fim': k - 1 }, initialIndices, `Janela Inicial [0..${k-1}]. Soma = ${windowSum}.`),
      message: `Janela deslizante de tamanho k=${k}. Soma inicial: ${windowSum}.`
    });

    for (let end = k; end < arr.length; end++) {
      const start = end - k + 1;
      const leavingVal = arr[start - 1];
      const enteringVal = arr[end];
      windowSum = windowSum - leavingVal + enteringVal;

      const windowIndices = [];
      for (let j = start; j <= end; j++) windowIndices.push(j);

      const isNewMax = windowSum > maxSum;
      if (isNewMax) {
        maxSum = windowSum;
        bestStart = start;
      }

      frames.push({
        ...this.buildScene(arr, { 'inicio': start, 'fim': end }, windowIndices, `Deslizando: -${leavingVal} +${enteringVal} = ${windowSum}. ${isNewMax ? '★ Novo Máximo!' : ''}`),
        message: `Janela [${start}..${end}]. Elemento ${leavingVal} saiu, ${enteringVal} entrou. Soma da janela: ${windowSum}. Máximo global: ${maxSum}.`
      });
    }

    const finalIndices = [];
    for (let j = bestStart; j < bestStart + k; j++) finalIndices.push(j);
    frames.push({
      ...this.buildScene(arr, {}, finalIndices, `Maior soma encontrada: ${maxSum} no intervalo [${bestStart}..${bestStart+k-1}].`),
      message: `Concluído: O subarray de tamanho ${k} com maior soma contígua é ${maxSum}.`
    });

    return frames;
  }

  // 5. Kadane's Algorithm: Maximum Subarray Sum
  generateKadaneFrames() {
    const frames = [];
    // Ensure some negative numbers for meaningful demonstration
    const arr = this.array.some(x => x < 0) 
      ? [...this.array] 
      : [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    this.array = arr;

    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    let startIdx = 0;
    let endIdx = 0;
    let tempStart = 0;

    frames.push({
      ...this.buildScene(arr, { i: 0 }, [0], `Kadane: maxAtual = ${arr[0]}, maxGlobal = ${arr[0]}.`),
      message: `Inicialização de Kadane: maxAtual = ${arr[0]}, maxGlobal = ${arr[0]}.`
    });

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxCurrent + arr[i]) {
        maxCurrent = arr[i];
        tempStart = i;
      } else {
        maxCurrent += arr[i];
      }

      let isNewGlobal = false;
      if (maxCurrent > maxGlobal) {
        maxGlobal = maxCurrent;
        startIdx = tempStart;
        endIdx = i;
        isNewGlobal = true;
      }

      const activeRange = [];
      for (let j = tempStart; j <= i; j++) activeRange.push(j);

      frames.push({
        ...this.buildScene(arr, { i }, activeRange, `i=${i} (${arr[i]}): maxAtual=${maxCurrent}, maxGlobal=${maxGlobal}. ${isNewGlobal ? '★ Novo Recorde!' : ''}`),
        message: `Posição ${i}: Decisão entre iniciar novo subarray em ${arr[i]} ou somar ao anterior. maxAtual: ${maxCurrent}. maxGlobal: ${maxGlobal}.`
      });
    }

    const bestRange = [];
    for (let j = startIdx; j <= endIdx; j++) bestRange.push(j);
    frames.push({
      ...this.buildScene(arr, {}, bestRange, `Soma Máxima Global = ${maxGlobal} no intervalo [${startIdx}..${endIdx}].`),
      message: `Algoritmo de Kadane finalizado em O(n)! Soma máxima contígua: ${maxGlobal}.`
    });

    return frames;
  }

  // 6. Dutch National Flag (3-Way Partitioning: 0, 1, 2)
  generateDutchFlagFrames() {
    const frames = [];
    const arr = [2, 0, 2, 1, 1, 0, 2, 1, 0, 1];
    this.array = arr;

    let low = 0;
    let mid = 0;
    let high = arr.length - 1;
    let swaps = 0;

    frames.push({
      ...this.buildScene(arr, { low, mid, high }, [], `Bandeira Holandesa: Partição de 3 vias (0s, 1s, 2s).`),
      message: `Inicializando ponteiros: low=0, mid=0, high=${high}.`
    });

    while (mid <= high) {
      if (arr[mid] === 0) {
        frames.push({
          ...this.buildScene(arr, { low, mid, high }, [low, mid], `arr[mid] é 0. Troca com arr[low].`),
          message: `Elemento 0 encontrado no mid. Trocando arr[${mid}] com arr[${low}].`,
          swaps
        });
        [arr[low], arr[mid]] = [arr[mid], arr[low]];
        low++;
        mid++;
        swaps++;
      } else if (arr[mid] === 1) {
        frames.push({
          ...this.buildScene(arr, { low, mid, high }, [mid], `arr[mid] é 1. Posição intermediária correta. Avançando mid.`),
          message: `Elemento 1 está na partição central. Apenas avançando mid.`,
          swaps
        });
        mid++;
      } else { // arr[mid] === 2
        frames.push({
          ...this.buildScene(arr, { low, mid, high }, [mid, high], `arr[mid] é 2. Troca com arr[high]. Recua high.`),
          message: `Elemento 2 encontrado. Trocando com fim arr[${high}]. Recuando high.`,
          swaps
        });
        [arr[mid], arr[high]] = [arr[high], arr[mid]];
        high--;
        swaps++;
      }
    }

    frames.push({
      ...this.buildScene(arr, {}, [], `Array particionado em 3 seções: [0s | 1s | 2s] em tempo O(n)!`),
      message: `Algoritmo da Bandeira Nacional Holandesa concluído com sucesso!`
    });

    return frames;
  }
}


// ==================== sorting.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Comprehensive Sorting Algorithms Module (Comparison & Distribution Sorts)
 */
class SortingAlgorithms {
  constructor() {
    this.array = [];
  }

  setArray(arr) {
    this.array = arr.map(Number);
  }

  clear() {
    this.array = [];
  }

  addElement(val) {
    val = Number(val);
    this.array.push(val);
    return this.buildScene(this.array);
  }

  generateRandomArray(size = 12, min = 5, max = 99) {
    this.array = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    return this.array;
  }

  buildScene(arr, highlighted = [], sortedIndices = [], pointers = {}, message = '') {
    if (arr.length === 0) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: 'Conjunto vazio. Adicione valores ou clique em "Gerar Conjunto Aleatório" para ordenar.',
          x: 140,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#64748b'
        }]
      };
    }

    const elements = [];
    const barW = 38;
    const maxVal = Math.max(...arr, 100);
    const maxHeight = 240;
    const startX = 80;
    const baseY = 360;

    arr.forEach((val, idx) => {
      const h = Math.max(15, (val / maxVal) * maxHeight);
      const isHighlighted = highlighted.includes(idx);
      const isSorted = sortedIndices.includes(idx);

      let fill = '#38bdf8'; // Default blue bar
      if (isSorted) fill = '#10b981'; // Green sorted
      if (isHighlighted) fill = '#f59e0b'; // Amber compare

      elements.push({
        type: 'rect',
        x: startX + idx * (barW + 8),
        y: baseY - h,
        w: barW,
        h: h,
        label: val,
        index: idx,
        fill,
        stroke: '#0f172a',
        textColor: '#ffffff',
        pointer: pointers[idx]
      });
    });

    return {
      elements,
      links: [],
      decorations: message ? [{ type: 'text', text: message, x: startX, y: 70, font: 'bold 16px "Inter", sans-serif' }] : []
    };
  }

  // 1. Bubble Sort
  generateBubbleSortFrames(order = 'asc') {
    if (this.array.length === 0) {
      return [{
        ...this.buildScene([]),
        message: 'Conjunto vazio! Insira valores ou clique em "Gerar Conjunto Aleatório" antes de ordenar.'
      }];
    }
    const frames = [];
    const arr = [...this.array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted = [];
    const isAsc = order === 'asc';

    frames.push({
      ...this.buildScene(arr, [], sorted, {}, `Iniciando Bubble Sort (${isAsc ? 'Ordem Crescente ↑' : 'Ordem Decrescente ↓'}) em ${n} elementos.`),
      message: `Iniciando Bubble Sort em ordem ${isAsc ? 'crescente' : 'decrescente'}.`,
      comparisons, swaps
    });

    for (let i = 0; i < n - 1; i++) {
      let swappedThisPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        frames.push({
          ...this.buildScene(arr, [j, j + 1], sorted, { [j]: 'j', [j + 1]: 'j+1' }, `Comparando arr[${j}] (${arr[j]}) e arr[${j+1}] (${arr[j+1]}).`),
          message: `Comparando ${arr[j]} com ${arr[j+1]}.`,
          comparisons, swaps
        });

        const shouldSwap = isAsc ? (arr[j] > arr[j + 1]) : (arr[j] < arr[j + 1]);
        if (shouldSwap) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          swappedThisPass = true;
          frames.push({
            ...this.buildScene(arr, [j, j + 1], sorted, { [j]: 'j', [j + 1]: 'j+1' }, `Trocado: ${arr[j+1]} e ${arr[j]} fora de ordem (${isAsc ? 'maior à frente' : 'menor à frente'}).`),
            message: `Troca realizada: ${arr[j+1]} <-> ${arr[j]}.`,
            comparisons, swaps
          });
        }
      }
      sorted.push(n - i - 1);
      if (!swappedThisPass) break; // Optimization
    }

    for (let k = 0; k < n; k++) sorted.push(k);
    frames.push({
      ...this.buildScene(arr, [], sorted, {}, `Bubble Sort concluído com sucesso (${isAsc ? 'Crescente' : 'Decrescente'})!`),
      message: `Array totalmente ordenado com ${comparisons} comparações e ${swaps} trocas.`,
      comparisons, swaps
    });

    this.array = arr;
    return frames;
  }

  // 2. Selection Sort
  generateSelectionSortFrames(order = 'asc') {
    if (this.array.length === 0) {
      return [{
        ...this.buildScene([]),
        message: 'Conjunto vazio! Insira valores ou clique em "Gerar Conjunto Aleatório" antes de ordenar.'
      }];
    }
    const frames = [];
    const arr = [...this.array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted = [];
    const isAsc = order === 'asc';

    for (let i = 0; i < n - 1; i++) {
      let targetIdx = i;
      frames.push({
        ...this.buildScene(arr, [i], sorted, { [i]: isAsc ? 'i (menor)' : 'i (maior)' }, `Passada ${i+1}: Assumindo ${isAsc ? 'menor' : 'maior'} atual no índice ${i} (${arr[i]}).`),
        message: `Passada ${i+1}: Buscando o ${isAsc ? 'menor' : 'maior'} elemento a partir de arr[${i}].`,
        comparisons, swaps
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        frames.push({
          ...this.buildScene(arr, [j, targetIdx], sorted, { [targetIdx]: isAsc ? 'menor' : 'maior', [j]: 'j' }, `Comparando arr[${j}] (${arr[j]}) com atual ${isAsc ? 'menor' : 'maior'} arr[${targetIdx}] (${arr[targetIdx]}).`),
          message: `Comparando arr[${j}] com arr[${targetIdx}].`,
          comparisons, swaps
        });

        const isNewTarget = isAsc ? (arr[j] < arr[targetIdx]) : (arr[j] > arr[targetIdx]);
        if (isNewTarget) {
          targetIdx = j;
          frames.push({
            ...this.buildScene(arr, [targetIdx], sorted, { [targetIdx]: isAsc ? 'novo min' : 'novo max' }, `Novo ${isAsc ? 'menor' : 'maior'} elemento encontrado no índice ${targetIdx} (${arr[targetIdx]}).`),
            message: `Novo ${isAsc ? 'menor' : 'maior'} encontrado: arr[${targetIdx}] = ${arr[targetIdx]}.`,
            comparisons, swaps
          });
        }
      }

      if (targetIdx !== i) {
        [arr[i], arr[targetIdx]] = [arr[targetIdx], arr[i]];
        swaps++;
        frames.push({
          ...this.buildScene(arr, [i, targetIdx], sorted, { [i]: 'i', [targetIdx]: isAsc ? 'min' : 'max' }, `Trocando arr[${i}] com arr[${targetIdx}].`),
          message: `Colocando o ${isAsc ? 'menor' : 'maior'} elemento na posição correta ${i}.`,
          comparisons, swaps
        });
      }
      sorted.push(i);
    }

    for (let k = 0; k < n; k++) sorted.push(k);
    frames.push({
      ...this.buildScene(arr, [], sorted, {}, `Selection Sort finalizado (${isAsc ? 'Crescente' : 'Decrescente'})!`),
      message: `Array ordenado com ${comparisons} comparações e ${swaps} trocas.`,
      comparisons, swaps
    });

    this.array = arr;
    return frames;
  }

  // 3. Insertion Sort
  generateInsertionSortFrames(order = 'asc') {
    if (this.array.length === 0) {
      return [{
        ...this.buildScene([]),
        message: 'Conjunto vazio! Insira valores ou clique em "Gerar Conjunto Aleatório" antes de ordenar.'
      }];
    }
    const frames = [];
    const arr = [...this.array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted = [0];
    const isAsc = order === 'asc';

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      frames.push({
        ...this.buildScene(arr, [i], sorted, { [i]: 'chave' }, `Inserindo elemento ${key} na parte ordenada à esquerda (${isAsc ? 'Crescente' : 'Decrescente'}).`),
        message: `Elemento chave selecionado: ${key} (índice ${i}).`,
        comparisons, swaps
      });

      while (j >= 0 && (isAsc ? (arr[j] > key) : (arr[j] < key))) {
        comparisons++;
        arr[j + 1] = arr[j];
        swaps++;
        frames.push({
          ...this.buildScene(arr, [j, j + 1], sorted, { [j]: 'shift' }, `arr[${j}] (${arr[j]}) fora de ordem em relação à chave ${key}. Deslocando à direita.`),
          message: `Deslocando ${arr[j]} uma posição à direita.`,
          comparisons, swaps
        });
        j--;
      }
      if (j >= 0) comparisons++;

      arr[j + 1] = key;
      sorted.push(i);

      frames.push({
        ...this.buildScene(arr, [j + 1], sorted, { [j + 1]: 'inserido' }, `Chave ${key} inserida na posição ${j + 1}.`),
        message: `Chave ${key} alocada em sua posição ordenada [${j + 1}].`,
        comparisons, swaps
      });
    }

    for (let k = 0; k < n; k++) sorted.push(k);
    frames.push({
      ...this.buildScene(arr, [], sorted, {}, `Insertion Sort finalizado (${isAsc ? 'Crescente' : 'Decrescente'})!`),
      message: `Array ordenado com sucesso!`,
      comparisons, swaps
    });

    this.array = arr;
    return frames;
  }

  // 4. Quick Sort
  generateQuickSortFrames(order = 'asc') {
    if (this.array.length === 0) {
      return [{
        ...this.buildScene([]),
        message: 'Conjunto vazio! Insira valores ou clique em "Gerar Conjunto Aleatório" antes de ordenar.'
      }];
    }
    const frames = [];
    const arr = [...this.array];
    let comparisons = 0;
    let swaps = 0;
    const sorted = [];
    const isAsc = order === 'asc';

    const partition = (low, high) => {
      const pivot = arr[high];
      frames.push({
        ...this.buildScene(arr, [high], sorted, { [high]: 'pivô' }, `Particionando intervalo [${low}..${high}] (${isAsc ? 'Crescente' : 'Decrescente'}). Pivô: ${pivot}.`),
        message: `Pivô selecionado: arr[${high}] = ${pivot}.`,
        comparisons, swaps
      });

      let i = low - 1;
      for (let j = low; j < high; j++) {
        comparisons++;
        frames.push({
          ...this.buildScene(arr, [j, high], sorted, { [j]: 'j', [high]: 'pivô' }, `Comparando arr[${j}] (${arr[j]}) com pivô (${pivot}).`),
          message: isAsc ? `arr[${j}] < pivô?` : `arr[${j}] > pivô?`,
          comparisons, swaps
        });

        const shouldPlaceLeft = isAsc ? (arr[j] < pivot) : (arr[j] > pivot);
        if (shouldPlaceLeft) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          frames.push({
            ...this.buildScene(arr, [i, j], sorted, { [i]: 'i', [j]: 'j' }, `Elemento ${arr[i]} alocado na partição esquerda do pivô.`),
            message: `Elemento ${arr[i]} posicionado à esquerda do pivô.`,
            comparisons, swaps
          });
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swaps++;
      const pivotIdx = i + 1;
      sorted.push(pivotIdx);

      frames.push({
        ...this.buildScene(arr, [pivotIdx], sorted, { [pivotIdx]: 'pivô fixado' }, `Pivô ${pivot} colocado na sua posição final definitiva: ${pivotIdx}.`),
        message: `Pivô fixado no índice ${pivotIdx}.`,
        comparisons, swaps
      });

      return pivotIdx;
    };

    const quickSort = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSort(low, pi - 1);
        quickSort(pi + 1, high);
      } else if (low === high) {
        sorted.push(low);
      }
    };

    quickSort(0, arr.length - 1);

    for (let k = 0; k < arr.length; k++) sorted.push(k);
    frames.push({
      ...this.buildScene(arr, [], sorted, {}, `QuickSort concluído com sucesso (${isAsc ? 'Crescente' : 'Decrescente'})!`),
      message: `Array totalmente ordenado com QuickSort.`,
      comparisons, swaps
    });

    this.array = arr;
    return frames;
  }
}


// ==================== graphs.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Graph Algorithms Module (BFS, DFS, Dijkstra, Prim, Kruskal, Topological, Connected Components)
 */
class GraphAlgorithms {
  constructor() {
    this.viewMode = 'logical'; // 'logical' | 'adjList' | 'adjMatrix'
    this.vertices = [];
    this.edges = [];
  }

  clear() {
    this.vertices = [];
    this.edges = [];
  }

  addVertex(customLabel = null) {
    const defaultLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    const id = this.vertices.length > 0 ? Math.max(...this.vertices.map(v => v.id)) + 1 : 0;
    const existingLabels = new Set(this.vertices.map(v => v.label));
    let label = customLabel ? customLabel.toUpperCase().trim() : null;
    if (!label) {
      label = defaultLabels.find(l => !existingLabels.has(l)) || `V${id}`;
    }

    // Determine an empty position with good clearance
    let bestX = 380;
    let bestY = 240;
    if (this.vertices.length > 0) {
      const angle = (this.vertices.length * (2 * Math.PI / 7)) + (Math.random() * 0.4);
      const radius = 160 + (Math.random() * 40 - 20);
      bestX = Math.round(380 + radius * Math.cos(angle));
      bestY = Math.round(240 + (radius * 0.75) * Math.sin(angle));
    }

    this.vertices.push({ id, label, x: bestX, y: bestY });
    return this.buildScene([], id, [], `Vértice ${label} adicionado ao grafo.`);
  }

  addEdge(uId, vId, weight = 1) {
    uId = Number(uId);
    vId = Number(vId);
    weight = Number(weight) || 1;

    const uNode = this.vertices.find(v => v.id === uId);
    const vNode = this.vertices.find(v => v.id === vId);
    if (!uNode || !vNode || uId === vId) return null;

    // Check if edge already exists
    const existing = this.edges.find(e => (e.u === uId && e.v === vId) || (e.u === vId && e.v === uId));
    if (existing) {
      existing.weight = weight;
      return this.buildScene([], null, [existing], `Peso da aresta (${uNode.label}, ${vNode.label}) atualizado para ${weight}.`);
    }

    const newEdge = { u: uId, v: vId, weight };
    this.edges.push(newEdge);
    return this.buildScene([], null, [newEdge], `Aresta adicionada entre ${uNode.label} e ${vNode.label} (peso ${weight}).`);
  }

  generateRandomGraph(requestedCount = null) {
    this.clear();
    const count = requestedCount || (Math.floor(Math.random() * 4) + 5); // 5 to 8 vertices
    const allLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    // Randomize layout center and radii for organic spatial variety
    const centerX = 380 + (Math.floor(Math.random() * 80) - 40);
    const centerY = 240 + (Math.floor(Math.random() * 60) - 30);
    const radiusX = 170 + (Math.floor(Math.random() * 60) - 30);
    const radiusY = 125 + (Math.floor(Math.random() * 50) - 25);
    const startAngle = Math.random() * Math.PI * 2;

    // Create vertices with organic angular spacing and radius jitter
    for (let i = 0; i < count; i++) {
      const angle = startAngle + (i * 2 * Math.PI / count) + (Math.random() * 0.35 - 0.17);
      const rJitterX = radiusX + (Math.random() * 40 - 20);
      const rJitterY = radiusY + (Math.random() * 30 - 15);
      const x = Math.round(centerX + rJitterX * Math.cos(angle));
      const y = Math.round(centerY + rJitterY * Math.sin(angle));
      this.vertices.push({ id: i, label: allLabels[i], x, y });
    }

    // Connect with a randomized spanning tree to guarantee connectivity
    const connected = [0];
    const remaining = [];
    for (let i = 1; i < count; i++) remaining.push(i);

    while (remaining.length > 0) {
      const uIdx = Math.floor(Math.random() * connected.length);
      const u = connected[uIdx];
      const remIdx = Math.floor(Math.random() * remaining.length);
      const v = remaining.splice(remIdx, 1)[0];
      const weight = Math.floor(Math.random() * 9) + 1;
      this.edges.push({ u, v, weight });
      connected.push(v);
    }

    // Add 2 to 4 extra random cross edges without duplicating
    const extraEdges = Math.floor(Math.random() * 3) + 2;
    for (let k = 0; k < extraEdges; k++) {
      const u = Math.floor(Math.random() * count);
      const v = Math.floor(Math.random() * count);
      if (u !== v && !this.edges.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u))) {
        this.edges.push({ u, v, weight: Math.floor(Math.random() * 10) + 1 });
      }
    }

    return this.buildScene();
  }

  buildScene(visitedNodes = [], activeNode = null, highlightedEdges = [], statusMsg = '') {
    if (this.vertices.length === 0) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: 'Grafo vazio. Clique em "Novo Grafo Aleatório" para gerar um grafo.',
          x: 180,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#64748b'
        }]
      };
    }

    const elements = [];
    const links = [];

    // Add Edges
    this.edges.forEach(e => {
      const uNode = this.vertices[e.u];
      const vNode = this.vertices[e.v];
      const isEdgeHighlighted = highlightedEdges.some(
        he => (he.u === e.u && he.v === e.v) || (he.u === e.v && he.v === e.u)
      );

      links.push({
        x1: uNode.x, y1: uNode.y,
        x2: vNode.x, y2: vNode.y,
        weight: e.weight,
        highlighted: isEdgeHighlighted,
        color: isEdgeHighlighted ? '#10b981' : '#64748b',
        width: isEdgeHighlighted ? 3.5 : 2
      });
    });

    // Add Vertices
    this.vertices.forEach(v => {
      const isVisited = visitedNodes.includes(v.id);
      const isActive = activeNode === v.id;

      let fill = '#ffffff';
      let stroke = '#64748b';
      let textColor = '#0f172a';

      if (isActive) {
        fill = '#f59e0b';
        stroke = '#b45309';
        textColor = '#ffffff';
      } else if (isVisited) {
        fill = '#10b981';
        stroke = '#047857';
        textColor = '#ffffff';
      }

      elements.push({
        type: 'circle',
        x: v.x,
        y: v.y,
        radius: 22,
        label: v.label,
        fill,
        stroke,
        textColor,
        highlighted: isActive
      });
    });

    const decorations = statusMsg ? [{
      type: 'text',
      text: statusMsg,
      x: 100,
      y: 50,
      font: 'bold 16px "Inter", sans-serif'
    }] : [];

    return { elements, links, decorations };
  }

  // 1. Breadth-First Search (BFS)
  generateBfsFrames(startIdx = 0) {
    if (this.vertices.length === 0) {
      return [{
        elements: [],
        links: [],
        decorations: [{ type: 'text', text: 'Grafo vazio. Clique em "Novo Grafo Aleatório" antes de executar.', x: 140, y: 220, font: '15px "Inter", sans-serif', color: '#ef4444' }],
        message: 'Grafo vazio. Gere um grafo aleatório primeiro.'
      }];
    }
    const frames = [];
    const visited = [];
    const queue = [startIdx];
    visited.push(startIdx);
    const highlightedEdges = [];

    frames.push({
      ...this.buildScene(visited, startIdx, highlightedEdges, `Iniciando BFS a partir do vértice ${this.vertices[startIdx].label}.`),
      message: `Vértice inicial ${this.vertices[startIdx].label} enfileirado e marcado como visitado.`
    });

    while (queue.length > 0) {
      const u = queue.shift();
      frames.push({
        ...this.buildScene(visited, u, highlightedEdges, `Desenfileirado: Vértice ${this.vertices[u].label}. Explorando vizinhos.`),
        message: `Explorando arestas adjacentes a ${this.vertices[u].label}.`
      });

      // Find neighbors
      const neighbors = [];
      this.edges.forEach(e => {
        if (e.u === u && !visited.includes(e.v)) neighbors.push({ neighbor: e.v, edge: e });
        else if (e.v === u && !visited.includes(e.u)) neighbors.push({ neighbor: e.u, edge: e });
      });

      for (const { neighbor, edge } of neighbors) {
        if (!visited.includes(neighbor)) {
          visited.push(neighbor);
          queue.push(neighbor);
          highlightedEdges.push(edge);

          frames.push({
            ...this.buildScene(visited, neighbor, highlightedEdges, `Vizinho ${this.vertices[neighbor].label} visitado e adicionado à fila.`),
            message: `Descoberto vértice ${this.vertices[neighbor].label} pela aresta (${this.vertices[u].label}-${this.vertices[neighbor].label}).`
          });
        }
      }
    }

    frames.push({
      ...this.buildScene(visited, null, highlightedEdges, `Busca em Largura (BFS) concluída! Todos os vértices alcançáveis foram visitados.`),
      message: `BFS finalizada. Ordem de visitação: ${visited.map(id => this.vertices[id].label).join(' -> ')}`
    });

    return frames;
  }

  // 2. Dijkstra's Shortest Path
  generateDijkstraFrames(startIdx = 0) {
    if (this.vertices.length === 0) {
      return [{
        elements: [],
        links: [],
        decorations: [{ type: 'text', text: 'Grafo vazio. Clique em "Novo Grafo Aleatório" antes de executar.', x: 140, y: 220, font: '15px "Inter", sans-serif', color: '#ef4444' }],
        message: 'Grafo vazio. Gere um grafo aleatório primeiro.'
      }];
    }
    const frames = [];
    const n = this.vertices.length;
    const dist = new Array(n).fill(Infinity);
    const parent = new Array(n).fill(null);
    const visited = new Set();
    const treeEdges = [];

    dist[startIdx] = 0;

    frames.push({
      ...this.buildScene([], startIdx, [], `Dijkstra: Vértice de partida ${this.vertices[startIdx].label} com distância 0. Demais: ∞.`),
      message: `Iniciando Dijkstra com origem em ${this.vertices[startIdx].label}.`
    });

    for (let count = 0; count < n; count++) {
      // Find unvisited vertex with min distance
      let u = -1;
      let minDist = Infinity;
      for (let i = 0; i < n; i++) {
        if (!visited.has(i) && dist[i] < minDist) {
          minDist = dist[i];
          u = i;
        }
      }

      if (u === -1 || dist[u] === Infinity) break;

      visited.add(u);
      if (parent[u] !== null) {
        treeEdges.push({ u: parent[u], v: u });
      }

      frames.push({
        ...this.buildScene(Array.from(visited), u, treeEdges, `Vértice ${this.vertices[u].label} selecionado com menor distância acumulada: ${dist[u]}.`),
        message: `Fixada distância mínima até ${this.vertices[u].label} = ${dist[u]}. Relaxando arestas vizinhas...`
      });

      // Relax neighbors
      this.edges.forEach(e => {
        let v = null;
        if (e.u === u) v = e.v;
        else if (e.v === u) v = e.u;

        if (v !== null && !visited.has(v)) {
          const newDist = dist[u] + e.weight;
          if (newDist < dist[v]) {
            dist[v] = newDist;
            parent[v] = u;

            frames.push({
              ...this.buildScene(Array.from(visited), u, treeEdges, `Aresta (${this.vertices[u].label}-${this.vertices[v].label}, peso ${e.weight}) relaxada! Nova dist[${this.vertices[v].label}] = ${newDist}.`),
              message: `Caminho mais curto encontrado para ${this.vertices[v].label}: ${newDist} (via ${this.vertices[u].label}).`
            });
          }
        }
      });
    }

    const summary = this.vertices.map(v => `${v.label}: ${dist[v.id]}`).join(' | ');
    frames.push({
      ...this.buildScene(Array.from(visited), null, treeEdges, `Dijkstra finalizado! Distâncias mínimas: ${summary}`),
      message: `Menores distâncias calculadas com sucesso!`
    });

    return frames;
  }
}


// ==================== others.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Modules: Linear Structures, Heaps, Hashing, Dynamic Programming, Huffman
 */
class OtherAlgorithms {
  constructor() {
    this.stack = [];
    this.queue = [];
    this.linkedList = [];
    this.heap = [];
    this.hashTableSize = 11;
    this.hashTable = new Array(11).fill(null);
  }

  clearStack() {
    this.stack = [];
  }

  clearQueue() {
    this.queue = [];
  }

  clearList() {
    this.linkedList = [];
  }

  clearHeap() {
    this.heap = [];
  }

  clearHash() {
    this.hashTable = new Array(this.hashTableSize).fill(null);
  }

  // ==========================================
  // LINEAR STRUCTURES: STACK & QUEUE
  // ==========================================
  generateStackPushFrames(val) {
    const frames = [];
    const arr = [...this.stack];
    val = Number(val);

    frames.push({
      elements: this.renderStack(arr, null),
      links: [],
      decorations: [],
      message: `Iniciando push(${val}) na Pilha.`
    });

    arr.push(val);
    this.stack = arr;

    frames.push({
      elements: this.renderStack(arr, arr.length - 1),
      links: [],
      decorations: [],
      message: `Elemento ${val} empilhado com sucesso! Novo topo no índice ${arr.length - 1}.`
    });

    return frames;
  }

  generateStackPopFrames() {
    const frames = [];
    const arr = [...this.stack];

    if (arr.length === 0) {
      frames.push({
        elements: this.renderStack(arr, null),
        links: [],
        decorations: [{ type: 'text', text: 'Stack Underflow! A pilha está vazia.', x: 280, y: 220, font: '15px "Inter", sans-serif', color: '#ef4444' }],
        message: `Erro: Impossível desempilhar de uma pilha vazia.`
      });
      return frames;
    }

    const popped = arr.pop();
    this.stack = arr;

    frames.push({
      elements: this.renderStack(arr, arr.length - 1),
      links: [],
      decorations: [],
      message: `Elemento ${popped} desempilhado com sucesso (Pop).`
    });

    return frames;
  }

  renderStack(arr, activeIdx) {
    const elements = [];
    const cellW = 80;
    const cellH = 35;
    const startX = 350;
    const baseY = 400;

    if (arr.length === 0) {
      return [{
        type: 'rect',
        x: 310,
        y: 280,
        w: 160,
        h: 45,
        fill: '#f1f5f9',
        textColor: '#64748b',
        label: 'Pilha Vazia',
        stroke: '#cbd5e1'
      }];
    }

    arr.forEach((val, idx) => {
      elements.push({
        type: 'rect',
        x: startX,
        y: baseY - idx * (cellH + 5),
        w: cellW,
        h: cellH,
        label: val,
        fill: idx === activeIdx ? '#f59e0b' : '#38bdf8',
        textColor: '#ffffff',
        pointer: idx === arr.length - 1 ? 'TOPO' : undefined,
        pointerColor: '#ef4444'
      });
    });

    return elements;
  }

  // ==========================================
  // LINEAR STRUCTURES: QUEUE (FIFO)
  // ==========================================
  generateQueueEnqueueFrames(val) {
    const frames = [];
    const arr = [...this.queue];
    val = Number(val);

    frames.push({
      elements: this.renderQueue(arr, null),
      links: [],
      decorations: [{
        type: 'text',
        text: `Enfileirando elemento ${val} no FIM (REAR) da fila...`,
        x: 180,
        y: 190,
        font: 'bold 14px "Inter", sans-serif',
        color: '#0284c7'
      }],
      message: `Iniciando Enqueue(${val}) na Fila FIFO.`
    });

    arr.push(val);
    this.queue = arr;

    frames.push({
      elements: this.renderQueue(arr, arr.length - 1),
      links: [],
      decorations: [{
        type: 'text',
        text: `Elemento ${val} entrou na fila com sucesso!`,
        x: 180,
        y: 190,
        font: 'bold 14px "Inter", sans-serif',
        color: '#10b981'
      }],
      message: `Elemento ${val} adicionado ao fim da fila (índice ${arr.length - 1}).`
    });

    return frames;
  }

  generateQueueDequeueFrames() {
    const frames = [];
    const arr = [...this.queue];

    if (arr.length === 0) {
      frames.push({
        elements: this.renderQueue(arr, null),
        links: [],
        decorations: [{
          type: 'text',
          text: 'Queue Underflow! A fila está vazia.',
          x: 280,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#ef4444'
        }],
        message: 'Erro: Impossível desenfileirar de uma fila vazia.'
      });
      return frames;
    }

    const removed = arr[0];
    frames.push({
      elements: this.renderQueue(arr, 0),
      links: [],
      decorations: [{
        type: 'text',
        text: `Removendo elemento do INÍCIO (FRONT): ${removed}`,
        x: 180,
        y: 190,
        font: 'bold 14px "Inter", sans-serif',
        color: '#f59e0b'
      }],
      message: `Identificando elemento na frente da fila: ${removed}.`
    });

    arr.shift();
    this.queue = arr;

    frames.push({
      elements: this.renderQueue(arr, null),
      links: [],
      decorations: [{
        type: 'text',
        text: `Elemento ${removed} desenfileirado com sucesso (Dequeue)!`,
        x: 180,
        y: 190,
        font: 'bold 14px "Inter", sans-serif',
        color: '#10b981'
      }],
      message: `Elemento ${removed} removido do início da fila.`
    });

    return frames;
  }

  renderQueue(arr, activeIdx) {
    const elements = [];
    const cellW = 70;
    const cellH = 45;
    const startX = 160;
    const startY = 250;

    if (arr.length === 0) {
      return [{
        type: 'rect',
        x: 280,
        y: 240,
        w: 220,
        h: 45,
        fill: '#f1f5f9',
        textColor: '#64748b',
        label: 'Fila Vazia (FIFO)',
        stroke: '#cbd5e1'
      }];
    }

    arr.forEach((val, idx) => {
      let ptr = undefined;
      let ptrColor = '#64748b';

      if (arr.length === 1) {
        ptr = 'INÍCIO & FIM';
        ptrColor = '#10b981';
      } else if (idx === 0) {
        ptr = 'INÍCIO (FRONT)';
        ptrColor = '#10b981';
      } else if (idx === arr.length - 1) {
        ptr = 'FIM (REAR)';
        ptrColor = '#ef4444';
      }

      elements.push({
        type: 'rect',
        x: startX + idx * (cellW + 8),
        y: startY,
        w: cellW,
        h: cellH,
        label: val,
        index: idx,
        fill: idx === activeIdx ? '#f59e0b' : '#38bdf8',
        textColor: '#ffffff',
        pointer: ptr,
        pointerColor: ptrColor
      });
    });

    return elements;
  }

  // ==========================================
  // LINEAR STRUCTURES: SINGLY LINKED LIST
  // ==========================================
  generateListInsertHeadFrames(val) {
    const frames = [];
    const list = [...this.linkedList];
    val = Number(val);

    frames.push({
      ...this.renderLinkedList(list, null, `Alocando novo nó [${val}] para inserção na Cabeça (Head)...`),
      message: `Iniciando inserção no início (Head): Criando novo nó com valor ${val}.`
    });

    list.unshift(val);
    this.linkedList = list;

    frames.push({
      ...this.renderLinkedList(list, 0, `Novo nó [${val}] agora é o HEAD da lista!`),
      message: `Nó ${val} inserido no início. Ponteiro HEAD atualizado com sucesso.`
    });

    return frames;
  }

  generateListInsertTailFrames(val) {
    const frames = [];
    const list = [...this.linkedList];
    val = Number(val);

    if (list.length === 0) {
      list.push(val);
      this.linkedList = list;
      frames.push({
        ...this.renderLinkedList(list, 0, `Lista estava vazia. Nó [${val}] inserido como único elemento.`),
        message: `Nó ${val} inserido na cauda (lista vazia).`
      });
      return frames;
    }

    for (let i = 0; i < list.length; i++) {
      frames.push({
        ...this.renderLinkedList(list, i, `Percorrendo lista: visitando nó [${list[i]}] (índice ${i})...`),
        message: `Percorrendo ponteiros next para alcançar a cauda (visitando ${list[i]}).`
      });
    }

    list.push(val);
    this.linkedList = list;

    frames.push({
      ...this.renderLinkedList(list, list.length - 1, `Novo nó [${val}] anexado à cauda (TAIL) da lista!`),
      message: `Ponteiro next do antigo último nó agora aponta para ${val}.`
    });

    return frames;
  }

  generateListDeleteHeadFrames() {
    const frames = [];
    const list = [...this.linkedList];

    if (list.length === 0) {
      frames.push({
        ...this.renderLinkedList(list, null, 'Lista Vazia! Não há nós para remover.'),
        message: 'Erro: Impossível remover elemento de uma lista encadeada vazia.'
      });
      return frames;
    }

    const removed = list[0];
    frames.push({
      ...this.renderLinkedList(list, 0, `Removendo o nó cabeça [${removed}]...`),
      message: `Identificando HEAD atual: ${removed}.`
    });

    list.shift();
    this.linkedList = list;

    frames.push({
      ...this.renderLinkedList(list, null, `Nó [${removed}] removido! HEAD aponta para o próximo elemento.`),
      message: `Nó ${removed} removido do início da lista com sucesso.`
    });

    return frames;
  }

  generateListDeleteTailFrames() {
    const frames = [];
    const list = [...this.linkedList];

    if (list.length === 0) {
      frames.push({
        ...this.renderLinkedList(list, null, 'Lista Vazia! Não há nós para remover.'),
        message: 'Erro: Impossível remover de lista vazia.'
      });
      return frames;
    }

    if (list.length === 1) {
      const removed = list.pop();
      this.linkedList = list;
      frames.push({
        ...this.renderLinkedList(list, null, `Único nó [${removed}] removido. Lista agora está vazia.`),
        message: `Nó ${removed} removido da lista.`
      });
      return frames;
    }

    // Traverse to tail
    for (let i = 0; i < list.length; i++) {
      frames.push({
        ...this.renderLinkedList(list, i, `Percorrendo para encontrar o penúltimo nó: [${list[i]}]...`),
        message: `Buscando o final da lista (nó ${list[i]}).`
      });
    }

    const removed = list.pop();
    this.linkedList = list;

    frames.push({
      ...this.renderLinkedList(list, list.length - 1, `Nó da cauda [${removed}] removido. Próximo do novo tail agora é NULL.`),
      message: `Nó ${removed} removido da cauda com sucesso.`
    });

    return frames;
  }

  generateListSearchFrames(val) {
    const frames = [];
    const list = [...this.linkedList];
    val = Number(val);

    if (list.length === 0) {
      frames.push({
        ...this.renderLinkedList(list, null, 'Lista vazia! Busca não encontrou elementos.'),
        message: `Busca por ${val} falhou: Lista vazia.`
      });
      return frames;
    }

    let foundIdx = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === val) {
        foundIdx = i;
        frames.push({
          ...this.renderLinkedList(list, i, `Elemento ${val} ENCONTRADO no nó ${i}!`),
          message: `Busca com sucesso! Chave ${val} encontrada no índice ${i}.`
        });
        break;
      } else {
        frames.push({
          ...this.renderLinkedList(list, i, `Comparando nó [${list[i]}] com ${val}: diferente, avançando via next...`),
          message: `Nó ${list[i]} != ${val}. Avançando para o próximo nó.`
        });
      }
    }

    if (foundIdx === -1) {
      frames.push({
        ...this.renderLinkedList(list, null, `Chegamos a NULL. Elemento ${val} NÃO foi encontrado na lista.`),
        message: `Fim da lista atingido (NULL). Elemento ${val} ausente.`
      });
    }

    return frames;
  }

  renderLinkedList(arr, activeIdx, message = '') {
    const elements = [];
    const links = [];
    const startX = 80;
    const startY = 240;
    const nodeDataW = 55;
    const nodePtrW = 25;
    const nodeH = 45;
    const gapX = 45;

    if (!arr || arr.length === 0) {
      return {
        elements: [{
          type: 'rect',
          x: 240,
          y: startY,
          w: 280,
          h: 45,
          fill: '#f1f5f9',
          textColor: '#64748b',
          label: 'HEAD ──> NULL (Lista Vazia)',
          stroke: '#cbd5e1'
        }],
        links: [],
        decorations: message ? [{ type: 'text', text: message, x: 240, y: startY - 40, font: 'bold 14px "Inter", sans-serif', color: '#0f172a' }] : []
      };
    }

    arr.forEach((val, idx) => {
      const currentX = startX + idx * (nodeDataW + nodePtrW + gapX);

      // Data cell
      elements.push({
        type: 'rect',
        x: currentX,
        y: startY,
        w: nodeDataW,
        h: nodeH,
        label: val,
        index: idx,
        fill: idx === activeIdx ? '#f59e0b' : '#38bdf8',
        textColor: '#ffffff',
        pointer: idx === 0 ? 'HEAD' : undefined,
        pointerColor: '#10b981'
      });

      // Next pointer cell
      elements.push({
        type: 'rect',
        x: currentX + nodeDataW,
        y: startY,
        w: nodePtrW,
        h: nodeH,
        label: '•',
        fill: '#0284c7',
        textColor: '#ffffff'
      });

      const nextNodeX = currentX + nodeDataW + nodePtrW + gapX;

      // Link to next node or to NULL
      if (idx < arr.length - 1) {
        links.push({
          x1: currentX + nodeDataW + nodePtrW / 2,
          y1: startY + nodeH / 2,
          x2: nextNodeX,
          y2: startY + nodeH / 2,
          directed: true,
          color: idx === activeIdx ? '#f59e0b' : '#64748b',
          width: 2.2
        });
      } else {
        // Last node points to NULL box
        const nullX = currentX + nodeDataW + nodePtrW + gapX;
        elements.push({
          type: 'rect',
          x: nullX,
          y: startY + 5,
          w: 50,
          h: nodeH - 10,
          label: 'NULL',
          fill: '#334155',
          textColor: '#f8fafc',
          stroke: '#64748b'
        });

        links.push({
          x1: currentX + nodeDataW + nodePtrW / 2,
          y1: startY + nodeH / 2,
          x2: nullX,
          y2: startY + nodeH / 2,
          directed: true,
          color: '#94a3b8',
          width: 2
        });
      }
    });

    return {
      elements,
      links,
      decorations: message ? [{
        type: 'text',
        text: message,
        x: startX,
        y: startY - 45,
        font: 'bold 15px "Inter", sans-serif',
        color: '#0f172a'
      }] : []
    };
  }

  // ==========================================
  // BINARY HEAP (MIN-HEAP)
  // ==========================================
  generateHeapInsertFrames(val) {
    const frames = [];
    const heap = [...this.heap];
    val = Number(val);

    heap.push(val);
    let i = heap.length - 1;

    frames.push({
      ...this.renderHeapScene(heap, i),
      message: `Novo elemento ${val} inserido na última posição do Heap (índice ${i}).`
    });

    // Bubble Up (Sift Up)
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[i] < heap[parent]) {
        frames.push({
          ...this.renderHeapScene(heap, i),
          message: `Violação Min-Heap: Filho ${heap[i]} < Pai ${heap[parent]}. Trocando posições...`
        });

        [heap[i], heap[parent]] = [heap[parent], heap[i]];
        i = parent;

        frames.push({
          ...this.renderHeapScene(heap, i),
          message: `Troca realizada. Verificando subida no índice ${i}...`
        });
      } else {
        break;
      }
    }

    this.heap = heap;
    frames.push({
      ...this.renderHeapScene(heap, null),
      message: `Elemento ${val} acomodado na posição correta do Heap!`
    });

    return frames;
  }

  generateHeapExtractFrames() {
    const frames = [];
    const heap = [...this.heap];

    if (heap.length === 0) {
      frames.push({
        ...this.renderHeapScene(heap, null),
        message: 'Heap vazio! Impossível remover elemento.'
      });
      return frames;
    }

    const min = heap[0];
    frames.push({
      ...this.renderHeapScene(heap, 0),
      message: `Iniciando remoção da raiz (Mínimo: ${min}).`
    });

    if (heap.length === 1) {
      heap.pop();
      this.heap = heap;
      frames.push({
        ...this.renderHeapScene(heap, null),
        message: `Raiz ${min} removida. O Heap agora está vazio.`
      });
      return frames;
    }

    const last = heap.pop();
    heap[0] = last;
    let i = 0;

    frames.push({
      ...this.renderHeapScene(heap, 0),
      message: `Último elemento (${last}) movido para a raiz. Iniciando descida (Heapify Down)...`
    });

    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left < heap.length && heap[left] < heap[smallest]) {
        smallest = left;
      }
      if (right < heap.length && heap[right] < heap[smallest]) {
        smallest = right;
      }

      if (smallest !== i) {
        frames.push({
          ...this.renderHeapScene(heap, i),
          message: `Filho ${heap[smallest]} < Pai ${heap[i]}. Trocando posições...`
        });

        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;

        frames.push({
          ...this.renderHeapScene(heap, i),
          message: `Troca efetuada. Verificando índice ${i}...`
        });
      } else {
        break;
      }
    }

    this.heap = heap;
    frames.push({
      ...this.renderHeapScene(heap, null),
      message: `Remoção do mínimo (${min}) concluída. Heap restaurado com sucesso!`
    });

    return frames;
  }

  generateRandomHeap(count = 7) {
    this.heap = [];
    for (let k = 0; k < count; k++) {
      const val = Math.floor(Math.random() * 90) + 10;
      this.heap.push(val);
      let i = this.heap.length - 1;
      while (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (this.heap[i] < this.heap[p]) {
          [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
          i = p;
        } else break;
      }
    }
    return this.renderHeapScene(this.heap, null);
  }

  renderHeapScene(heap, activeIdx) {
    const elements = [];
    const links = [];
    if (heap.length === 0) {
      return {
        elements: [{
          type: 'rect',
          x: 280,
          y: 200,
          w: 180,
          h: 45,
          fill: '#f1f5f9',
          textColor: '#64748b',
          label: 'Heap Vazio',
          stroke: '#cbd5e1'
        }],
        links: []
      };
    }

    const spacingY = 70;
    const startY = 100;

    heap.forEach((val, i) => {
      const depth = Math.floor(Math.log2(i + 1));
      const posInLevel = i - (Math.pow(2, depth) - 1);
      const totalInLevel = Math.pow(2, depth);
      const levelWidth = 600 / totalInLevel;

      const x = 150 + posInLevel * levelWidth + levelWidth / 2;
      const y = startY + depth * spacingY;

      elements.push({
        type: 'circle',
        x, y,
        radius: 20,
        label: val,
        fill: i === activeIdx ? '#f59e0b' : '#38bdf8',
        textColor: '#ffffff',
        sublabel: `[${i}]`
      });

      if (i > 0) {
        const pIdx = Math.floor((i - 1) / 2);
        const pDepth = Math.floor(Math.log2(pIdx + 1));
        const pPos = pIdx - (Math.pow(2, pDepth) - 1);
        const pTotal = Math.pow(2, pDepth);
        const pW = 600 / pTotal;
        const px = 150 + pPos * pW + pW / 2;
        const py = startY + pDepth * spacingY;

        links.push({ x1: px, y1: py, x2: x, y2: y, r1: 20, r2: 20, color: '#94a3b8' });
      }
    });

    return { elements, links };
  }

  // ==========================================
  // HASH TABLES: CLOSED & OPEN HASHING
  // ==========================================
  generateHashInsertFrames(key, technique = 'linear') {
    const frames = [];
    key = Number(key);
    const size = this.hashTableSize;
    const table = [...this.hashTable];

    frames.push({
      ...this.renderHashScene(table, null, `Iniciando inserção de ${key} usando ${technique}.`),
      message: `Tamanho da tabela M=${size}. Função hash h(k) = k % ${size} = ${key % size}.`
    });

    let i = 0;
    while (i < size) {
      let probeIdx = 0;
      if (technique === 'linear') {
        probeIdx = (key % size + i) % size;
      } else if (technique === 'quadratic') {
        probeIdx = (key % size + i * i) % size;
      } else { // double hashing
        const h2 = 7 - (key % 7);
        probeIdx = (key % size + i * h2) % size;
      }

      if (table[probeIdx] === null || table[probeIdx] === 'DEL') {
        table[probeIdx] = key;
        this.hashTable = table;
        frames.push({
          ...this.renderHashScene(table, probeIdx, `Posição [${probeIdx}] livre! Chave ${key} inserida com sucesso.`),
          message: `Chave ${key} inserida na posição [${probeIdx}] (tentativa i=${i}).`
        });
        break;
      } else {
        frames.push({
          ...this.renderHashScene(table, probeIdx, `Colisão detectada na posição [${probeIdx}] (ocupada por ${table[probeIdx]}). Tentando próximo salto...`),
          message: `Colisão em [${probeIdx}] com elemento ${table[probeIdx]}. Tentativa i=${i}.`
        });
      }
      i++;
    }

    return frames;
  }

  generateHashDeleteFrames(key, technique = 'linear') {
    const frames = [];
    key = Number(key);
    const size = this.hashTableSize;
    const table = [...this.hashTable];

    frames.push({
      ...this.renderHashScene(table, null, `Buscando chave ${key} para remoção (${technique}).`),
      message: `Iniciando busca da chave ${key} para exclusão na tabela hash.`
    });

    let i = 0;
    let found = false;
    while (i < size) {
      let probeIdx = 0;
      if (technique === 'linear') {
        probeIdx = (key % size + i) % size;
      } else if (technique === 'quadratic') {
        probeIdx = (key % size + i * i) % size;
      } else {
        const h2 = 7 - (key % 7);
        probeIdx = (key % size + i * h2) % size;
      }

      if (table[probeIdx] === key) {
        table[probeIdx] = null;
        this.hashTable = table;
        found = true;
        frames.push({
          ...this.renderHashScene(table, probeIdx, `Chave ${key} encontrada e removida da posição [${probeIdx}]!`),
          message: `Chave ${key} removida com sucesso da posição [${probeIdx}].`
        });
        break;
      } else if (table[probeIdx] === null) {
        break;
      } else {
        frames.push({
          ...this.renderHashScene(table, probeIdx, `Verificando posição [${probeIdx}] (${table[probeIdx]} != ${key})...`),
          message: `Posição [${probeIdx}] ocupada por ${table[probeIdx]}. Continuando sondagem...`
        });
      }
      i++;
    }

    if (!found) {
      frames.push({
        ...this.renderHashScene(table, null, `Chave ${key} não encontrada na tabela.`),
        message: `Chave ${key} não encontrada na tabela hash.`
      });
    }

    return frames;
  }

  renderHashScene(table, activeIdx, message = '') {
    const elements = [];
    const cellW = 55;
    const cellH = 55;
    const startX = 80;
    const startY = 220;

    table.forEach((val, idx) => {
      elements.push({
        type: 'rect',
        x: startX + idx * (cellW + 6),
        y: startY,
        w: cellW,
        h: cellH,
        label: val !== null ? val : '-',
        index: idx,
        fill: idx === activeIdx ? '#f59e0b' : (val !== null ? '#e0f2fe' : '#ffffff'),
        textColor: '#0f172a'
      });
    });

    return {
      elements,
      links: [],
      decorations: message ? [{ type: 'text', text: message, x: startX, y: startY - 50, font: 'bold 15px "Inter", sans-serif' }] : []
    };
  }

  // ==========================================
  // DYNAMIC PROGRAMMING: FIBONACCI
  // ==========================================
  generateFibonacciFrames(n = 6, method = 'tabular') {
    const frames = [];
    n = Math.min(Math.max(1, Number(n)), 12);

    if (method === 'tabular') {
      const dp = new Array(n + 1).fill(0);
      dp[0] = 0;
      dp[1] = 1;

      frames.push({
        ...this.renderDpScene(dp, [0, 1], `Casos Base: F(0) = 0, F(1) = 1.`),
        message: `Inicializando tabela DP com os casos base.`
      });

      for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
        frames.push({
          ...this.renderDpScene(dp, [i], `F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}.`),
          message: `Preenchendo célula ${i}: ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}.`
        });
      }

      frames.push({
        ...this.renderDpScene(dp, [n], `Resultado Final: F(${n}) = ${dp[n]} calculado em O(n) tempo linear!`),
        message: `Fibonacci(${n}) = ${dp[n]} com programação dinâmica bottom-up.`
      });
    }

    return frames;
  }

  generateRandomHash(count = 5, technique = 'linear') {
    this.hashTable = new Array(this.hashTableSize).fill(null);
    const nums = [12, 23, 34, 45, 56, 67, 78, 89];
    const shuffled = nums.sort(() => 0.5 - Math.random()).slice(0, count);
    for (const val of shuffled) {
      this.generateHashInsertFrames(val, technique);
    }
    return this.renderHashScene(this.hashTable, null);
  }

  generateRandomQueue(count = 5) {
    this.queue = [];
    for (let k = 0; k < count; k++) {
      this.queue.push(Math.floor(Math.random() * 80) + 10);
    }
    return [{
      elements: this.renderQueue(this.queue, null),
      links: [],
      decorations: [],
      message: `Fila gerada com ${count} valores aleatórios.`
    }];
  }

  generateRandomLinkedList(count = 5) {
    this.linkedList = [];
    for (let k = 0; k < count; k++) {
      this.linkedList.push(Math.floor(Math.random() * 80) + 10);
    }
    return [{
      ...this.renderLinkedList(this.linkedList, null, `Lista encadeada gerada com ${count} nós aleatórios.`),
      message: `Lista encadeada gerada com ${count} nós aleatórios.`
    }];
  }

  renderDpScene(dp, activeIndices = [], message = '') {
    if (!dp || dp.length === 0) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: 'Tabela DP vazia. Escolha N e clique em "Calcular (Tabela Bottom-Up)".',
          x: 140,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#64748b'
        }]
      };
    }

    const elements = [];
    const cellW = 55;
    const cellH = 50;
    const startX = 120;
    const startY = 240;

    dp.forEach((val, idx) => {
      elements.push({
        type: 'rect',
        x: startX + idx * (cellW + 8),
        y: startY,
        w: cellW,
        h: cellH,
        label: val,
        index: `F(${idx})`,
        fill: activeIndices.includes(idx) ? '#10b981' : '#ffffff',
        textColor: activeIndices.includes(idx) ? '#ffffff' : '#0f172a'
      });
    });

    return {
      elements,
      links: [],
      decorations: message ? [{ type: 'text', text: message, x: startX, y: startY - 50, font: 'bold 15px "Inter", sans-serif' }] : []
    };
  }

  // ==========================================
  // DYNAMIC PROGRAMMING: 0/1 KNAPSACK (MOCHILA)
  // ==========================================
  generateKnapsackFrames(items, capacity) {
    if (!items || items.length === 0) {
      items = [
        { name: 'I1', w: 2, v: 3 },
        { name: 'I2', w: 3, v: 4 },
        { name: 'I3', w: 4, v: 5 },
        { name: 'I4', w: 5, v: 6 }
      ];
    }
    capacity = capacity ? Number(capacity) : 5;
    const n = items.length;
    const W = capacity;
    const frames = [];

    // Table (n+1) x (W+1) initialized with 0
    const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

    frames.push({
      ...this.renderKnapsackScene(dp, items, W, null, [], `Iniciando DP da Mochila 0/1. Capacidade máxima W = ${W}.`),
      message: `Tabela da Mochila inicializada (${n + 1}x${W + 1}). Casos base com capacidade 0 ou 0 itens valem 0.`
    });

    for (let i = 1; i <= n; i++) {
      const item = items[i - 1];
      for (let w = 1; w <= W; w++) {
        if (item.w <= w) {
          const withoutItem = dp[i - 1][w];
          const withItem = item.v + dp[i - 1][w - item.w];
          dp[i][w] = Math.max(withoutItem, withItem);

          frames.push({
            ...this.renderKnapsackScene(
              dp, items, W,
              { r: i, c: w },
              [{ r: i - 1, c: w }, { r: i - 1, c: w - item.w }],
              `Item ${item.name} (peso ${item.w}, valor ${item.v}): max(excluir: ${withoutItem}, incluir: ${item.v}+${dp[i-1][w-item.w]}=${withItem}) = ${dp[i][w]}`
            ),
            message: `[Mochila] Item ${item.name} cabe em cap ${w}: max(${withoutItem}, ${withItem}) = ${dp[i][w]}.`
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          frames.push({
            ...this.renderKnapsackScene(
              dp, items, W,
              { r: i, c: w },
              [{ r: i - 1, c: w }],
              `Item ${item.name} peso ${item.w} > cap ${w}. Não cabe, mantendo valor anterior: ${dp[i][w]}`
            ),
            message: `[Mochila] Item ${item.name} muito pesado para cap ${w}. Mantém ${dp[i][w]}.`
          });
        }
      }
    }

    // Backtrack to find chosen items
    let curW = W;
    const chosen = [];
    const chosenCells = [];
    for (let i = n; i > 0; i--) {
      if (dp[i][curW] !== dp[i - 1][curW]) {
        chosen.push(items[i - 1].name);
        chosenCells.push({ r: i, c: curW });
        curW -= items[i - 1].w;
      }
    }

    frames.push({
      ...this.renderKnapsackScene(
        dp, items, W,
        { r: n, c: W },
        chosenCells,
        `Solução Ótima: Valor Máximo = ${dp[n][W]} | Itens Levados: [${chosen.reverse().join(', ')}]`
      ),
      message: `Mochila 0/1 Resolvida! Valor ótimo total = ${dp[n][W]}. Itens: [${chosen.join(', ')}].`
    });

    return frames;
  }

  renderKnapsackScene(dp, items, capacity, activeCell = null, refCells = [], message = '') {
    const elements = [];
    const cellW = 46;
    const cellH = 34;
    const startX = 140;
    const startY = 160;

    // Header column: Capacities 0 .. capacity
    for (let c = 0; c <= capacity; c++) {
      elements.push({
        type: 'rect',
        x: startX + c * (cellW + 4),
        y: startY - cellH - 4,
        w: cellW,
        h: cellH,
        label: `W=${c}`,
        fill: '#f1f5f9',
        textColor: '#475569',
        stroke: '#cbd5e1'
      });
    }

    // Rows
    for (let r = 0; r <= items.length; r++) {
      const rowLabel = r === 0 ? 'Ø (Base)' : `${items[r - 1].name} (p:${items[r - 1].w},v:${items[r - 1].v})`;
      // Row header label
      elements.push({
        type: 'rect',
        x: startX - 110,
        y: startY + r * (cellH + 4),
        w: 104,
        h: cellH,
        label: rowLabel,
        fill: '#f8fafc',
        textColor: '#334155',
        stroke: '#cbd5e1'
      });

      // Data cells
      for (let c = 0; c <= capacity; c++) {
        const isActive = activeCell && activeCell.r === r && activeCell.c === c;
        const isRef = refCells.some(rc => rc.r === r && rc.c === c);

        let fill = '#ffffff';
        let textColor = '#0f172a';
        if (isActive) {
          fill = '#f59e0b';
          textColor = '#ffffff';
        } else if (isRef) {
          fill = '#38bdf8';
          textColor = '#ffffff';
        }

        elements.push({
          type: 'rect',
          x: startX + c * (cellW + 4),
          y: startY + r * (cellH + 4),
          w: cellW,
          h: cellH,
          label: dp[r] ? dp[r][c] : 0,
          fill,
          textColor
        });
      }
    }

    return {
      elements,
      links: [],
      decorations: message ? [{
        type: 'text',
        text: message,
        x: startX - 110,
        y: startY - cellH - 28,
        font: 'bold 14px "Inter", sans-serif',
        color: '#0f172a'
      }] : []
    };
  }

  // ==========================================
  // DYNAMIC PROGRAMMING: COIN CHANGE (TROCO)
  // ==========================================
  generateCoinChangeFrames(coins = [1, 2, 5], amount = 7) {
    amount = Math.min(Math.max(1, Number(amount)), 15);
    coins = (coins || [1, 2, 5]).sort((a, b) => a - b);
    const frames = [];

    const dp = new Array(amount + 1).fill(Infinity);
    const coinUsed = new Array(amount + 1).fill(-1);
    dp[0] = 0;

    frames.push({
      ...this.renderCoinChangeScene(dp, coins, amount, 0, null, `Iniciando Problema do Troco: R$ ${amount}. Moedas disponíveis: [${coins.join(', ')}]`),
      message: `Caso Base: 0 moedas necessárias para o valor R$ 0. Demais inicializados com infinito.`
    });

    for (let v = 1; v <= amount; v++) {
      for (const c of coins) {
        if (c <= v && dp[v - c] !== Infinity) {
          if (dp[v - c] + 1 < dp[v]) {
            dp[v] = dp[v - c] + 1;
            coinUsed[v] = c;

            frames.push({
              ...this.renderCoinChangeScene(
                dp, coins, amount, v, v - c,
                `Para R$ ${v}, usando moeda R$ ${c}: 1 + dp[${v - c}] (${dp[v - c]} moedas) = ${dp[v]} moedas.`
              ),
              message: `Melhor combinação encontrada para R$ ${v}: ${dp[v]} moedas (usando moeda de ${c}).`
            });
          }
        }
      }
    }

    // Traceback coins
    const picked = [];
    let curr = amount;
    while (curr > 0 && coinUsed[curr] !== -1) {
      picked.push(coinUsed[curr]);
      curr -= coinUsed[curr];
    }

    const finalMsg = dp[amount] === Infinity
      ? `Impossível formar R$ ${amount} com as moedas fornecidas.`
      : `Mínimo para R$ ${amount}: ${dp[amount]} moedas [${picked.join(' + ')}]`;

    frames.push({
      ...this.renderCoinChangeScene(dp, coins, amount, amount, null, finalMsg),
      message: finalMsg
    });

    return frames;
  }

  renderCoinChangeScene(dp, coins, amount, activeIdx = null, refIdx = null, message = '') {
    const elements = [];
    const cellW = 50;
    const cellH = 50;
    const startX = 80;
    const startY = 240;

    dp.forEach((val, idx) => {
      let fill = '#ffffff';
      let textColor = '#0f172a';

      if (idx === activeIdx) {
        fill = '#f59e0b';
        textColor = '#ffffff';
      } else if (idx === refIdx) {
        fill = '#38bdf8';
        textColor = '#ffffff';
      }

      elements.push({
        type: 'rect',
        x: startX + idx * (cellW + 6),
        y: startY,
        w: cellW,
        h: cellH,
        label: val === Infinity ? '∞' : val,
        index: `R$${idx}`,
        fill,
        textColor
      });
    });

    const decorations = [];
    if (message) {
      decorations.push({
        type: 'text',
        text: message,
        x: startX,
        y: startY - 45,
        font: 'bold 14px "Inter", sans-serif',
        color: '#0f172a'
      });
    }

    decorations.push({
      type: 'text',
      text: `Moedas disponíveis: [${coins.map(c => `R$${c}`).join(', ')}]`,
      x: startX,
      y: startY + cellH + 45,
      font: '13px "Inter", sans-serif',
      color: '#64748b'
    });

    return {
      elements,
      links: [],
      decorations
    };
  }
}


// ==================== app.js ====================

/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Main Application Controller & UI Coordinator
 */








class App {
  constructor() {
    this.currentLang = 'pt-BR';
    this.currentCategory = 'avl';
    this.drawerOpen = true;
    this.activeDrawerTab = 'explanation';

    // Sub-algorithm tracking for dynamic controls & pseudocodes
    this.activeSortingAlgo = 'bubble';
    this.sortOrder = 'asc';
    this.activeLinearType = 'stack';
    this.activeDpAlgo = 'fibonacci';

    // Instantiate core components
    this.canvas = new VisualizerCanvas('canvasContainer');
    this.animator = new Animator(this.canvas);

    // Instantiate algorithm engines
    this.trees = new TreeAlgorithms();
    this.arrays = new ArrayAlgorithms();
    this.sorting = new SortingAlgorithms();
    this.graphs = new GraphAlgorithms();
    this.others = new OtherAlgorithms();

    this.bindEvents();
    this.updateLanguage(this.currentLang);
    this.selectCategory('avl');
  }

  updateStatusDisplay(rawMsg) {
    const el = document.getElementById('statusMessage');
    if (!el) return;
    if (!rawMsg) {
      el.textContent = '';
      return;
    }

    // Format rotation badges [ROTAÇÃO...]
    let formatted = rawMsg.replace(/\[ROTAÇÃO[^\]]*\]/gi, (match) => {
      return `<span class="badge-tag-rotation">${match}</span>`;
    });

    // Format recolor badges [RECOLORAÇÃO...]
    formatted = formatted.replace(/\[RECOLORAÇÃO[^\]]*\]/gi, (match) => {
      return `<span class="badge-tag-recolor">${match}</span>`;
    });

    // Format balance notices [BALANCEAMENTO...]
    formatted = formatted.replace(/\[BALANCEAMENTO[^\]]*\]/gi, (match) => {
      return `<span class="badge-tag-balance">${match}</span>`;
    });

    el.innerHTML = formatted;
  }

  bindEvents() {
    // Language Selector
    document.getElementById('langSelect').addEventListener('change', (e) => {
      this.updateLanguage(e.target.value);
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      this.canvas.render();
    });

    // Zoom Controls
    document.getElementById('btnZoomIn').addEventListener('click', () => this.canvas.zoomIn());
    document.getElementById('btnZoomOut').addEventListener('click', () => this.canvas.zoomOut());
    document.getElementById('btnZoomReset').addEventListener('click', () => this.canvas.resetZoom());

    // Playback Controls
    const btnPlayPause = document.getElementById('btnPlayPause');
    btnPlayPause.addEventListener('click', () => {
      if (this.animator.isPlaying) {
        this.animator.pause();
      } else {
        this.animator.play();
      }
    });

    document.getElementById('btnStepForward').addEventListener('click', () => this.animator.stepForward());
    document.getElementById('btnStepBack').addEventListener('click', () => this.animator.stepBackward());
    document.getElementById('btnSkip').addEventListener('click', () => this.animator.skipToEnd());
    document.getElementById('btnReset').addEventListener('click', () => this.animator.reset());

    // Speed Slider
    document.getElementById('speedSlider').addEventListener('input', (e) => {
      // Invert value so right is fast, left is slow
      const val = 1000 - Number(e.target.value);
      this.animator.setSpeed(val);
    });

    // Animator callbacks
    this.animator.onStatusChange = (status) => {
      const icon = btnPlayPause.querySelector('span');
      if (status === 'running') {
        icon.textContent = '⏸';
        document.getElementById('statusDot').style.background = '#10b981';
      } else if (status === 'paused') {
        icon.textContent = '▶';
        document.getElementById('statusDot').style.background = '#ef4444';
      } else {
        icon.textContent = '▶';
        document.getElementById('statusDot').style.background = '#64748b';
      }
    };

    this.animator.onFrameChange = (data) => {
      this.updateStatusDisplay(data.message || '');
      document.getElementById('stepCounter').textContent = `${data.frameIndex + 1} / ${data.totalFrames}`;
      if (data.comparisons !== undefined) {
        document.getElementById('statComparisons').textContent = data.comparisons;
      }
      if (data.swaps !== undefined) {
        document.getElementById('statSwaps').textContent = data.swaps;
      }
    };

    // Sidebar Category clicks
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.category;
        this.selectCategory(cat);
      });
    });

    // Drawer Tabs
    document.querySelectorAll('.drawer-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeDrawerTab = e.currentTarget.dataset.tab;
        this.renderDrawerContent();
      });
    });

    // Drawer Toggle Button
    document.getElementById('btnToggleDrawer').addEventListener('click', () => {
      const drawer = document.getElementById('explanationDrawer');
      drawer.classList.toggle('collapsed');
      this.drawerOpen = !drawer.classList.contains('collapsed');
      setTimeout(() => this.canvas.initCanvasSize(), 260);
    });
  }

  updateLanguage(lang) {
    this.currentLang = lang;
    const t = I18N[lang] || I18N['pt-BR'];

    // Update document title and header brand
    document.title = t.appName + ' ' + t.appVersion;
    document.getElementById('appBrandTitle').textContent = t.appName;
    document.getElementById('appBrandVersion').textContent = t.appVersion;

    // Update Sidebar category names
    for (const [key, label] of Object.entries(t.categories)) {
      const item = document.querySelector(`.nav-item[data-category="${key}"] span`);
      if (item) item.textContent = label;
    }

    // Update Drawer tabs
    document.querySelector('.drawer-tab[data-tab="explanation"]').textContent = t.tabs.explanation;
    document.querySelector('.drawer-tab[data-tab="complexity"]').textContent = t.tabs.complexity;
    document.querySelector('.drawer-tab[data-tab="pseudocode"]').textContent = t.tabs.pseudocode;

    // Refresh dynamic toolbar & drawer text
    this.renderToolbar();
    this.renderDrawerContent();
  }

  selectCategory(category) {
    this.currentCategory = category;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.category === category);
    });

    this.renderToolbar();
    this.renderDrawerContent();
    this.loadInitialScene();
  }

  renderToolbar() {
    const toolbar = document.getElementById('algoToolbar');
    toolbar.innerHTML = '';
    const t = I18N[this.currentLang];

    if (this.currentCategory === 'avl') {
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="number" id="inputVal" class="input-custom" placeholder="Valor" />
          <button id="btnInsert" class="btn-primary">${t.controls.insert}</button>
          <button id="btnDelete" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">${t.controls.delete}</button>
          <button id="btnRandomVal" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnBulkInsert" class="btn-secondary">${t.controls.randomSet}</button>
          <button id="btnClearAvl" class="btn-secondary">${t.controls.clear}</button>
        </div>
        <div class="input-group">
          <label style="font-size:0.8rem; font-weight:600;">${t.treeControls.bfConvention}</label>
          <select id="selectBfConvention" class="select-custom">
            <option value="leftMinusRight" ${this.trees.bfConvention === 'leftMinusRight' ? 'selected' : ''}>${t.treeControls.bfLeftMinusRight}</option>
            <option value="rightMinusLeft" ${this.trees.bfConvention === 'rightMinusLeft' ? 'selected' : ''}>${t.treeControls.bfRightMinusLeft}</option>
          </select>
        </div>
        <div class="input-group">
          <label style="font-size:0.8rem; font-weight:600;">${t.treeControls.badgeModeLabel}</label>
          <select id="selectBadgeMode" class="select-custom">
            <option value="both" ${this.trees.badgeMode === 'both' ? 'selected' : ''}>${t.treeControls.badgeModeBoth}</option>
            <option value="bfOnly" ${this.trees.badgeMode === 'bfOnly' ? 'selected' : ''}>${t.treeControls.badgeModeBf}</option>
            <option value="heightOnly" ${this.trees.badgeMode === 'heightOnly' ? 'selected' : ''}>${t.treeControls.badgeModeHeight}</option>
          </select>
        </div>
        <div class="input-group">
          <button id="btnToggleHeights" class="btn-secondary">${this.trees.showHeights ? t.treeControls.hideHeights : t.treeControls.showHeights}</button>
        </div>
      `;

      document.getElementById('btnInsert').addEventListener('click', () => {
        const val = document.getElementById('inputVal').value;
        if (val !== '') {
          const frames = this.trees.generateAvlInsertFrames(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputVal').value = '';
        }
      });

      document.getElementById('btnDelete').addEventListener('click', () => {
        const val = document.getElementById('inputVal').value;
        if (val !== '') {
          const frames = this.trees.generateAvlDeleteFrames(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputVal').value = '';
        }
      });

      document.getElementById('btnRandomVal').addEventListener('click', () => {
        const rand = Math.floor(Math.random() * 90) + 10;
        document.getElementById('inputVal').value = rand;
        const frames = this.trees.generateAvlInsertFrames(rand);
        this.animator.setTimeline(frames);
      });

      document.getElementById('selectBfConvention').addEventListener('change', (e) => {
        this.trees.setBfConvention(e.target.value);
        const scene = this.trees.layoutTree(this.trees.avlRoot);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

      document.getElementById('selectBadgeMode').addEventListener('change', (e) => {
        this.trees.setBadgeMode(e.target.value);
        const scene = this.trees.layoutTree(this.trees.avlRoot);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

      document.getElementById('btnToggleHeights').addEventListener('click', () => {
        this.trees.setShowHeights(!this.trees.showHeights);
        this.renderToolbar();
        const scene = this.trees.layoutTree(this.trees.avlRoot);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

      document.getElementById('btnBulkInsert').addEventListener('click', () => {
        const values = [50, 25, 75, 10, 30, 60, 90, 5, 20];
        this.trees.clearAvl();
        let allFrames = [];
        for (const v of values) {
          allFrames = allFrames.concat(this.trees.generateAvlInsertFrames(v));
        }
        this.animator.setTimeline(allFrames);
      });

      document.getElementById('btnClearAvl').addEventListener('click', () => {
        this.animator.stop();
        this.trees.clearAvl();
        const scene = this.trees.layoutTree(this.trees.avlRoot);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

    } else if (this.currentCategory === 'rbtree') {
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="number" id="inputVal" class="input-custom" placeholder="Valor" />
          <button id="btnInsert" class="btn-primary">${t.controls.insert}</button>
          <button id="btnDelete" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">${t.controls.delete}</button>
          <button id="btnRandomVal" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnBulkInsert" class="btn-secondary">${t.controls.randomSet}</button>
          <button id="btnClearRb" class="btn-secondary">${t.controls.clear}</button>
        </div>
        <div class="input-group">
          <button id="btnToggleNil" class="btn-secondary">${this.trees.showNilNodes ? t.treeControls.hideNilNodes : t.treeControls.showNilNodes}</button>
        </div>
      `;

      document.getElementById('btnInsert').addEventListener('click', () => {
        const val = document.getElementById('inputVal').value;
        if (val !== '') {
          const frames = this.trees.generateRbInsertFrames(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputVal').value = '';
        }
      });

      document.getElementById('btnDelete').addEventListener('click', () => {
        const val = document.getElementById('inputVal').value;
        if (val !== '') {
          const frames = this.trees.generateRbDeleteFrames(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputVal').value = '';
        }
      });

      document.getElementById('btnRandomVal').addEventListener('click', () => {
        const rand = Math.floor(Math.random() * 90) + 10;
        document.getElementById('inputVal').value = rand;
        const frames = this.trees.generateRbInsertFrames(rand);
        this.animator.setTimeline(frames);
      });

      document.getElementById('btnToggleNil').addEventListener('click', () => {
        this.trees.setShowNilNodes(!this.trees.showNilNodes);
        this.renderToolbar();
        const scene = this.trees.layoutTree(this.trees.rbRoot, true);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

      document.getElementById('btnBulkInsert').addEventListener('click', () => {
        const values = [20, 10, 30, 5, 15, 25, 40];
        this.trees.clearRb();
        let allFrames = [];
        for (const v of values) {
          allFrames = allFrames.concat(this.trees.generateRbInsertFrames(v));
        }
        this.animator.setTimeline(allFrames);
      });

      document.getElementById('btnClearRb').addEventListener('click', () => {
        this.animator.stop();
        this.trees.clearRb();
        const scene = this.trees.layoutTree(this.trees.rbRoot, true);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

    } else if (this.currentCategory === 'arrays') {
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="number" id="inputTarget" class="input-custom" placeholder="Valor / Alvo" />
          <button id="btnArrayInsert" class="btn-primary">${t.controls.insert}</button>
          <button id="btnArrayDelete" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">${t.controls.delete}</button>
          <button id="btnRandArray" class="btn-secondary">${t.controls.randomSet}</button>
          <button id="btnClearArray" class="btn-secondary">${t.controls.clear}</button>
        </div>
        <div class="input-group">
          <select id="selectArrayAlgo" class="select-custom">
            <option value="linearSearch">Busca Linear</option>
            <option value="binarySearch">Busca Binária (Array Ordenado)</option>
            <option value="twoPointers">Dois Ponteiros (Inversão)</option>
            <option value="slidingWindow">Janela Deslizante (Max Subarray k=3)</option>
            <option value="kadane">Algoritmo de Kadane (Soma Máxima)</option>
            <option value="dutchFlag">Bandeira Holandesa (Partição 3 Vias)</option>
          </select>
          <button id="btnRunArray" class="btn-primary">${t.controls.run}</button>
        </div>
      `;

      document.getElementById('btnArrayInsert').addEventListener('click', () => {
        const val = document.getElementById('inputTarget').value;
        if (val !== '') {
          const frames = this.arrays.insertElement(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputTarget').value = '';
        }
      });

      document.getElementById('btnArrayDelete').addEventListener('click', () => {
        const val = document.getElementById('inputTarget').value;
        if (val !== '') {
          const frames = this.arrays.deleteElement(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputTarget').value = '';
        }
      });

      document.getElementById('btnRunArray').addEventListener('click', () => {
        const algo = document.getElementById('selectArrayAlgo').value;
        const target = document.getElementById('inputTarget').value || 42;
        let frames = [];

        if (algo === 'linearSearch') frames = this.arrays.generateLinearSearchFrames(target);
        else if (algo === 'binarySearch') frames = this.arrays.generateBinarySearchFrames(target);
        else if (algo === 'twoPointers') frames = this.arrays.generateReverseFrames();
        else if (algo === 'slidingWindow') frames = this.arrays.generateSlidingWindowFrames(3);
        else if (algo === 'kadane') frames = this.arrays.generateKadaneFrames();
        else if (algo === 'dutchFlag') frames = this.arrays.generateDutchFlagFrames();

        this.animator.setTimeline(frames);
      });

      document.getElementById('btnRandArray').addEventListener('click', () => {
        this.animator.stop();
        this.arrays.generateRandomArray();
        const scene = this.arrays.buildScene(this.arrays.array);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

      document.getElementById('btnClearArray').addEventListener('click', () => {
        this.animator.stop();
        this.arrays.clear();
        const scene = this.arrays.buildScene(this.arrays.array);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

    } else if (this.currentCategory === 'sorting') {
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="number" id="inputSortVal" class="input-custom" placeholder="Valor" style="width:75px;" />
          <button id="btnAddSort" class="btn-primary">${t.controls.insert}</button>
          <button id="btnRandSort" class="btn-secondary">${t.controls.randomSet}</button>
          <button id="btnClearSort" class="btn-secondary">${t.controls.clear}</button>
        </div>
        <div class="input-group">
          <select id="selectSortAlgo" class="select-custom">
            <option value="bubble" ${this.activeSortingAlgo === 'bubble' ? 'selected' : ''}>Bubble Sort</option>
            <option value="selection" ${this.activeSortingAlgo === 'selection' ? 'selected' : ''}>Selection Sort</option>
            <option value="insertion" ${this.activeSortingAlgo === 'insertion' ? 'selected' : ''}>Insertion Sort</option>
            <option value="quick" ${this.activeSortingAlgo === 'quick' ? 'selected' : ''}>Quick Sort</option>
          </select>
          <select id="selectSortOrder" class="select-custom">
            <option value="asc" ${this.sortOrder === 'asc' ? 'selected' : ''}>Crescente (Asc)</option>
            <option value="desc" ${this.sortOrder === 'desc' ? 'selected' : ''}>Decrescente (Desc)</option>
          </select>
          <button id="btnRunSort" class="btn-primary">Ordenar</button>
        </div>
      `;

      document.getElementById('selectSortAlgo').addEventListener('change', (e) => {
        this.activeSortingAlgo = e.target.value;
        this.renderDrawerContent();
      });

      document.getElementById('selectSortOrder').addEventListener('change', (e) => {
        this.sortOrder = e.target.value;
      });

      document.getElementById('btnAddSort').addEventListener('click', () => {
        const val = document.getElementById('inputSortVal').value;
        if (val !== '') {
          const scene = this.sorting.addElement(val);
          this.canvas.setScene(scene.elements, scene.links, scene.decorations);
          document.getElementById('inputSortVal').value = '';
        }
      });

      document.getElementById('btnRunSort').addEventListener('click', () => {
        let frames = [];
        if (this.activeSortingAlgo === 'bubble') {
          frames = this.sorting.generateBubbleSortFrames(this.sorting.array, this.sortOrder);
        } else if (this.activeSortingAlgo === 'selection') {
          frames = this.sorting.generateSelectionSortFrames(this.sorting.array, this.sortOrder);
        } else if (this.activeSortingAlgo === 'insertion') {
          frames = this.sorting.generateInsertionSortFrames(this.sorting.array, this.sortOrder);
        } else if (this.activeSortingAlgo === 'quick') {
          frames = this.sorting.generateQuickSortFrames(this.sorting.array, this.sortOrder);
        }
        this.animator.setTimeline(frames);
      });

      document.getElementById('btnClearSort').addEventListener('click', () => {
        this.animator.stop();
        this.sorting.clear();
        const scene = this.sorting.buildScene(this.sorting.array);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

      document.getElementById('btnRandSort').addEventListener('click', () => {
        this.animator.stop();
        this.sorting.generateRandomArray();
        const scene = this.sorting.buildScene(this.sorting.array);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

    } else if (this.currentCategory === 'graphs') {
      const vOptions = this.graphs.vertices.map(v => `<option value="${v.id}">${v.label || v.id}</option>`).join('');
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="text" id="inputVertexLabel" class="input-custom" placeholder="Rótulo (ex: E)" style="width:105px;" />
          <button id="btnAddVertex" class="btn-primary">+ Vértice</button>
        </div>
        <div class="input-group">
          <select id="selectEdgeU" class="select-custom" style="min-width:55px;">${vOptions}</select>
          <span style="font-size:0.85rem; font-weight:bold; color:var(--text-secondary);">➔</span>
          <select id="selectEdgeV" class="select-custom" style="min-width:55px;">${vOptions}</select>
          <input type="number" id="inputEdgeWeight" class="input-custom" placeholder="Peso" value="1" style="width:55px;" />
          <button id="btnAddEdge" class="btn-primary">+ Aresta</button>
        </div>
        <div class="input-group">
          <button id="btnBfs" class="btn-primary">BFS (Largura)</button>
          <button id="btnDijkstra" class="btn-primary">Dijkstra</button>
          <button id="btnRandGraph" class="btn-secondary">${t.graphControls.newGraph}</button>
          <button id="btnClearGraph" class="btn-secondary">${t.controls.clear}</button>
        </div>
      `;

      document.getElementById('btnAddVertex').addEventListener('click', () => {
        const label = document.getElementById('inputVertexLabel').value;
        this.graphs.addVertex(label);
        const scene = this.graphs.buildScene();
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        this.renderToolbar();
      });

      document.getElementById('btnAddEdge').addEventListener('click', () => {
        const u = Number(document.getElementById('selectEdgeU').value);
        const v = Number(document.getElementById('selectEdgeV').value);
        const w = Number(document.getElementById('inputEdgeWeight').value || 1);
        if (!isNaN(u) && !isNaN(v)) {
          this.graphs.addEdge(u, v, w);
          const scene = this.graphs.buildScene();
          this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        }
      });

      document.getElementById('btnBfs').addEventListener('click', () => {
        const startId = this.graphs.vertices.length > 0 ? this.graphs.vertices[0].id : 0;
        this.animator.setTimeline(this.graphs.generateBfsFrames(startId));
      });
      document.getElementById('btnDijkstra').addEventListener('click', () => {
        const startId = this.graphs.vertices.length > 0 ? this.graphs.vertices[0].id : 0;
        this.animator.setTimeline(this.graphs.generateDijkstraFrames(startId));
      });
      document.getElementById('btnRandGraph').addEventListener('click', () => {
        this.animator.stop();
        this.graphs.generateRandomGraph();
        const scene = this.graphs.buildScene();
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        this.renderToolbar();
      });
      document.getElementById('btnClearGraph').addEventListener('click', () => {
        this.animator.stop();
        this.graphs.clear();
        const scene = this.graphs.buildScene();
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        this.renderToolbar();
      });

    } else if (this.currentCategory === 'linear') {
      toolbar.innerHTML = `
        <div class="input-group">
          <label style="font-size:0.85rem; font-weight:600;">Estrutura:</label>
          <select id="selectLinearType" class="select-custom">
            <option value="stack" ${this.activeLinearType === 'stack' ? 'selected' : ''}>Pilha (Stack - LIFO)</option>
            <option value="queue" ${this.activeLinearType === 'queue' ? 'selected' : ''}>Fila (Queue - FIFO)</option>
            <option value="linkedList" ${this.activeLinearType === 'linkedList' ? 'selected' : ''}>Lista Encadeada Simples</option>
          </select>
        </div>
        <div class="input-group" id="linearControlsContainer">
          <!-- Dynamically populated below -->
        </div>
      `;

      const controlsContainer = document.getElementById('linearControlsContainer');

      if (this.activeLinearType === 'stack') {
        controlsContainer.innerHTML = `
          <input type="number" id="inputVal" class="input-custom" placeholder="Valor" style="width:75px;" />
          <button id="btnPush" class="btn-primary">Push (Empilhar)</button>
          <button id="btnPop" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">Pop (Desempilhar)</button>
          <button id="btnRandLinear" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnClearLinear" class="btn-secondary">${t.controls.clear}</button>
        `;

        document.getElementById('btnPush').addEventListener('click', () => {
          const val = document.getElementById('inputVal').value;
          if (val !== '') {
            this.animator.setTimeline(this.others.generateStackPushFrames(val));
            document.getElementById('inputVal').value = '';
          }
        });
        document.getElementById('btnPop').addEventListener('click', () => {
          this.animator.setTimeline(this.others.generateStackPopFrames());
        });
        document.getElementById('btnRandLinear').addEventListener('click', () => {
          const rand = Math.floor(Math.random() * 90) + 10;
          document.getElementById('inputVal').value = rand;
          this.animator.setTimeline(this.others.generateStackPushFrames(rand));
        });
        document.getElementById('btnClearLinear').addEventListener('click', () => {
          this.animator.stop();
          this.others.clearStack();
          this.canvas.setScene(this.others.renderStack(this.others.stack, null), []);
        });

      } else if (this.activeLinearType === 'queue') {
        controlsContainer.innerHTML = `
          <input type="number" id="inputVal" class="input-custom" placeholder="Valor" style="width:75px;" />
          <button id="btnEnqueue" class="btn-primary">Enqueue (Entrar)</button>
          <button id="btnDequeue" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">Dequeue (Sair)</button>
          <button id="btnRandLinear" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnClearLinear" class="btn-secondary">${t.controls.clear}</button>
        `;

        document.getElementById('btnEnqueue').addEventListener('click', () => {
          const val = document.getElementById('inputVal').value;
          if (val !== '') {
            this.animator.setTimeline(this.others.generateQueueEnqueueFrames(val));
            document.getElementById('inputVal').value = '';
          }
        });
        document.getElementById('btnDequeue').addEventListener('click', () => {
          this.animator.setTimeline(this.others.generateQueueDequeueFrames());
        });
        document.getElementById('btnRandLinear').addEventListener('click', () => {
          const rand = Math.floor(Math.random() * 90) + 10;
          document.getElementById('inputVal').value = rand;
          this.animator.setTimeline(this.others.generateQueueEnqueueFrames(rand));
        });
        document.getElementById('btnClearLinear').addEventListener('click', () => {
          this.animator.stop();
          this.others.clearQueue();
          this.canvas.setScene(this.others.renderQueue(this.others.queue, null), []);
        });

      } else if (this.activeLinearType === 'linkedList') {
        controlsContainer.innerHTML = `
          <input type="number" id="inputVal" class="input-custom" placeholder="Valor" style="width:75px;" />
          <button id="btnInsertHead" class="btn-primary">+ Início (Head)</button>
          <button id="btnInsertTail" class="btn-primary">+ Fim (Tail)</button>
          <button id="btnDeleteHead" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">- Início</button>
          <button id="btnDeleteTail" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">- Fim</button>
          <button id="btnSearchList" class="btn-secondary">Buscar</button>
          <button id="btnRandLinear" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnClearLinear" class="btn-secondary">${t.controls.clear}</button>
        `;

        document.getElementById('btnInsertHead').addEventListener('click', () => {
          const val = document.getElementById('inputVal').value;
          if (val !== '') {
            this.animator.setTimeline(this.others.generateListInsertHeadFrames(val));
            document.getElementById('inputVal').value = '';
          }
        });
        document.getElementById('btnInsertTail').addEventListener('click', () => {
          const val = document.getElementById('inputVal').value;
          if (val !== '') {
            this.animator.setTimeline(this.others.generateListInsertTailFrames(val));
            document.getElementById('inputVal').value = '';
          }
        });
        document.getElementById('btnDeleteHead').addEventListener('click', () => {
          this.animator.setTimeline(this.others.generateListDeleteHeadFrames());
        });
        document.getElementById('btnDeleteTail').addEventListener('click', () => {
          this.animator.setTimeline(this.others.generateListDeleteTailFrames());
        });
        document.getElementById('btnSearchList').addEventListener('click', () => {
          const val = document.getElementById('inputVal').value;
          if (val !== '') {
            this.animator.setTimeline(this.others.generateListSearchFrames(val));
          }
        });
        document.getElementById('btnRandLinear').addEventListener('click', () => {
          const rand = Math.floor(Math.random() * 90) + 10;
          document.getElementById('inputVal').value = rand;
          this.animator.setTimeline(this.others.generateListInsertTailFrames(rand));
        });
        document.getElementById('btnClearLinear').addEventListener('click', () => {
          this.animator.stop();
          this.others.clearList();
          const scene = this.others.renderLinkedList(this.others.linkedList, null);
          this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        });
      }

      document.getElementById('selectLinearType').addEventListener('change', (e) => {
        this.activeLinearType = e.target.value;
        this.loadInitialScene();
        this.renderToolbar();
        this.renderDrawerContent();
      });

    } else if (this.currentCategory === 'heaps') {
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="number" id="inputVal" class="input-custom" placeholder="Valor" />
          <button id="btnInsertHeap" class="btn-primary">${t.controls.insert}</button>
          <button id="btnExtractHeap" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">Extrair Mínimo (Raiz)</button>
          <button id="btnRandHeapVal" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnRandHeapSet" class="btn-secondary">${t.controls.randomSet}</button>
          <button id="btnClearHeap" class="btn-secondary">${t.controls.clear}</button>
        </div>
      `;

      document.getElementById('btnInsertHeap').addEventListener('click', () => {
        const val = document.getElementById('inputVal').value;
        if (val !== '') {
          this.animator.setTimeline(this.others.generateHeapInsertFrames(val));
          document.getElementById('inputVal').value = '';
        }
      });
      document.getElementById('btnExtractHeap').addEventListener('click', () => {
        this.animator.setTimeline(this.others.generateHeapExtractFrames());
      });
      document.getElementById('btnRandHeapVal').addEventListener('click', () => {
        const rand = Math.floor(Math.random() * 90) + 10;
        document.getElementById('inputVal').value = rand;
        this.animator.setTimeline(this.others.generateHeapInsertFrames(rand));
      });
      document.getElementById('btnRandHeapSet').addEventListener('click', () => {
        this.animator.stop();
        const scene = this.others.generateRandomHeap(7);
        this.canvas.setScene(scene.elements, scene.links);
      });
      document.getElementById('btnClearHeap').addEventListener('click', () => {
        this.animator.stop();
        this.others.clearHeap();
        const scene = this.others.renderHeapScene(this.others.heap, null);
        this.canvas.setScene(scene.elements, scene.links);
      });

    } else if (this.currentCategory === 'hashing') {
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="number" id="inputVal" class="input-custom" placeholder="Chave" />
          <select id="selectHashTech" class="select-custom">
            <option value="linear">Sondagem Linear [h(k) + i]</option>
            <option value="quadratic">Sondagem Quadrática [h(k) + i²]</option>
            <option value="double">Duplo Hashing</option>
          </select>
          <button id="btnInsertHash" class="btn-primary">${t.controls.insert}</button>
          <button id="btnDeleteHash" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">${t.controls.delete}</button>
          <button id="btnRandHash" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnClearHash" class="btn-secondary">${t.controls.clear}</button>
        </div>
      `;

      document.getElementById('btnInsertHash').addEventListener('click', () => {
        const val = document.getElementById('inputVal').value;
        const tech = document.getElementById('selectHashTech').value;
        if (val !== '') {
          this.animator.setTimeline(this.others.generateHashInsertFrames(val, tech));
          document.getElementById('inputVal').value = '';
        }
      });
      document.getElementById('btnDeleteHash').addEventListener('click', () => {
        const val = document.getElementById('inputVal').value;
        const tech = document.getElementById('selectHashTech').value;
        if (val !== '') {
          this.animator.setTimeline(this.others.generateHashDeleteFrames(val, tech));
        }
      });
      document.getElementById('btnRandHash').addEventListener('click', () => {
        const rand = Math.floor(Math.random() * 90) + 10;
        document.getElementById('inputVal').value = rand;
        const tech = document.getElementById('selectHashTech').value;
        this.animator.setTimeline(this.others.generateHashInsertFrames(rand, tech));
      });
      document.getElementById('btnClearHash').addEventListener('click', () => {
        this.animator.stop();
        this.others.clearHash();
        const scene = this.others.renderHashScene(this.others.hashTable, null);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

    } else if (this.currentCategory === 'dp') {
      toolbar.innerHTML = `
        <div class="input-group">
          <label style="font-size:0.85rem; font-weight:600;">Algoritmo:</label>
          <select id="selectDpAlgo" class="select-custom">
            <option value="fibonacci" ${this.activeDpAlgo === 'fibonacci' ? 'selected' : ''}>Fibonacci (Bottom-Up)</option>
            <option value="knapsack" ${this.activeDpAlgo === 'knapsack' ? 'selected' : ''}>Mochila 0/1 (Knapsack)</option>
            <option value="coinChange" ${this.activeDpAlgo === 'coinChange' ? 'selected' : ''}>Troco Mínimo (Coin Change)</option>
          </select>
        </div>
        <div class="input-group" id="dpControlsContainer">
          <!-- Dynamically populated below -->
        </div>
      `;

      const dpContainer = document.getElementById('dpControlsContainer');

      if (this.activeDpAlgo === 'fibonacci') {
        dpContainer.innerHTML = `
          <label style="font-size:0.85rem; font-weight:600;">N:</label>
          <input type="number" id="inputDpN" class="input-custom" value="7" min="1" max="12" style="width:60px;" />
          <button id="btnRunDp" class="btn-primary">Calcular Fibonacci</button>
          <button id="btnClearDp" class="btn-secondary">${t.controls.clear}</button>
        `;

        document.getElementById('btnRunDp').addEventListener('click', () => {
          const n = document.getElementById('inputDpN').value;
          this.animator.setTimeline(this.others.generateFibonacciFrames(n, 'tabular'));
        });
        document.getElementById('btnClearDp').addEventListener('click', () => {
          this.animator.stop();
          const scene = this.others.renderDpScene([], []);
          this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        });

      } else if (this.activeDpAlgo === 'knapsack') {
        dpContainer.innerHTML = `
          <label style="font-size:0.85rem; font-weight:600;">Capacidade W:</label>
          <input type="number" id="inputKnapsackW" class="input-custom" value="5" min="2" max="10" style="width:60px;" />
          <button id="btnRunKnapsack" class="btn-primary">Resolver Mochila 0/1</button>
          <button id="btnClearDp" class="btn-secondary">${t.controls.clear}</button>
        `;

        document.getElementById('btnRunKnapsack').addEventListener('click', () => {
          const cap = document.getElementById('inputKnapsackW').value;
          this.animator.setTimeline(this.others.generateKnapsackFrames(null, cap));
        });
        document.getElementById('btnClearDp').addEventListener('click', () => {
          this.animator.stop();
          const scene = this.others.renderKnapsackScene([], [], 5, null, [], 'Tabela de Mochila 0/1 limpa. Escolha a capacidade e clique em "Resolver".');
          this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        });

      } else if (this.activeDpAlgo === 'coinChange') {
        dpContainer.innerHTML = `
          <label style="font-size:0.85rem; font-weight:600;">Quantia R$:</label>
          <input type="number" id="inputCoinAmount" class="input-custom" value="7" min="1" max="15" style="width:60px;" />
          <button id="btnRunCoin" class="btn-primary">Resolver Troco Mínimo</button>
          <button id="btnClearDp" class="btn-secondary">${t.controls.clear}</button>
        `;

        document.getElementById('btnRunCoin').addEventListener('click', () => {
          const amt = document.getElementById('inputCoinAmount').value;
          this.animator.setTimeline(this.others.generateCoinChangeFrames([1, 2, 5], amt));
        });
        document.getElementById('btnClearDp').addEventListener('click', () => {
          this.animator.stop();
          const scene = this.others.renderCoinChangeScene([], [1, 2, 5], 7, null, null, 'Problema do Troco limpo. Escolha a quantia e clique em "Resolver".');
          this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        });
      }

      document.getElementById('selectDpAlgo').addEventListener('change', (e) => {
        this.activeDpAlgo = e.target.value;
        this.loadInitialScene();
        this.renderToolbar();
        this.renderDrawerContent();
      });
    }
  }

  loadInitialScene() {
    this.animator.stop();
    if (this.currentCategory === 'avl') {
      const scene = this.trees.layoutTree(this.trees.avlRoot);
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
    } else if (this.currentCategory === 'rbtree') {
      const scene = this.trees.layoutTree(this.trees.rbRoot, true);
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
    } else if (this.currentCategory === 'arrays') {
      const scene = this.arrays.buildScene(this.arrays.array);
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
    } else if (this.currentCategory === 'sorting') {
      const scene = this.sorting.buildScene(this.sorting.array);
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
    } else if (this.currentCategory === 'graphs') {
      const scene = this.graphs.buildScene();
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
    } else if (this.currentCategory === 'linear') {
      if (this.activeLinearType === 'queue') {
        this.canvas.setScene(this.others.renderQueue(this.others.queue, null), []);
      } else if (this.activeLinearType === 'linkedList') {
        const scene = this.others.renderLinkedList(this.others.linkedList, null);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      } else {
        this.canvas.setScene(this.others.renderStack(this.others.stack, null), []);
      }
    } else if (this.currentCategory === 'heaps') {
      const scene = this.others.renderHeapScene(this.others.heap, null);
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
    } else if (this.currentCategory === 'hashing') {
      const scene = this.others.renderHashScene(this.others.hashTable, null);
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
    } else if (this.currentCategory === 'dp') {
      if (this.activeDpAlgo === 'knapsack') {
        const scene = this.others.renderKnapsackScene([], [], 5, null, [], 'Tabela de Mochila 0/1. Escolha a capacidade e clique em "Resolver".');
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      } else if (this.activeDpAlgo === 'coinChange') {
        const scene = this.others.renderCoinChangeScene([], [1, 2, 5], 7, null, null, 'Problema do Troco. Escolha a quantia e clique em "Resolver".');
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      } else {
        const scene = this.others.renderDpScene([], []);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      }
    }
    this.canvas.resetZoom();
  }

  renderDrawerContent() {
    const t = I18N[this.currentLang] || I18N['pt-BR'];
    let infoKey = 'avl';

    if (this.currentCategory === 'rbtree') infoKey = 'rbtree';
    else if (this.currentCategory === 'avl') infoKey = 'avl';
    else if (this.currentCategory === 'arrays') infoKey = 'arrays';
    else if (this.currentCategory === 'sorting') {
      infoKey = `sorting_${this.activeSortingAlgo || 'bubble'}`;
      if (!t.explanations[infoKey]) infoKey = 'sorting';
    } else if (this.currentCategory === 'graphs') infoKey = 'graphs';
    else if (this.currentCategory === 'linear') {
      infoKey = `linear_${this.activeLinearType || 'stack'}`;
      if (!t.explanations[infoKey]) infoKey = 'linear';
    } else if (this.currentCategory === 'heaps') infoKey = 'heaps';
    else if (this.currentCategory === 'hashing') infoKey = 'hashing';
    else if (this.currentCategory === 'dp') {
      infoKey = `dp_${this.activeDpAlgo || 'fibonacci'}`;
      if (!t.explanations[infoKey]) infoKey = 'dp';
    }

    const info = t.explanations[infoKey] || t.explanations[this.currentCategory] || t.explanations['avl'];
    const container = document.getElementById('drawerBody');
    if (!info) return;

    if (this.activeDrawerTab === 'explanation') {
      container.innerHTML = `
        <h4>${info.title}</h4>
        <p>${info.description}</p>
        ${info.bfExplanation ? `<p style="margin-top:0.8rem; padding:0.6rem; background:var(--accent-light); border-radius:6px; color:var(--accent-primary); font-size:0.82rem;"><strong>Fator de Balanço:</strong> ${info.bfExplanation}</p>` : ''}
        ${info.properties ? `<p style="margin-top:0.8rem; white-space:pre-line; font-size:0.82rem; background:var(--bg-tertiary); padding:0.6rem; border-radius:6px;"><strong>Regras Invariantes:</strong>\n${info.properties}</p>` : ''}
      `;
    } else if (this.activeDrawerTab === 'complexity') {
      container.innerHTML = `
        <h4>${info.title} - Complexidades</h4>
        <table class="complexity-table">
          <thead>
            <tr>
              <th>Cenário</th>
              <th>Tempo (Big-O)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Melhor Caso</td><td>${info.bestTime}</td></tr>
            <tr><td>Caso Médio</td><td>${info.avgTime}</td></tr>
            <tr><td>Pior Caso</td><td>${info.worstTime}</td></tr>
            <tr><td>Espaço Auxiliar</td><td>${info.space}</td></tr>
          </tbody>
        </table>
      `;
    } else if (this.activeDrawerTab === 'pseudocode') {
      container.innerHTML = `
        <h4>${info.title} - Pseudocódigo</h4>
        <div class="code-block">${info.pseudocode}</div>
      `;
    }
  }
}

// Robust initialization whether DOMContentLoaded has already fired or not
function initApp() {
  if (!window.app) {
    window.app = new App();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
