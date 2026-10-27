/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Multilingual Translations (pt-BR, en, es)
 */

export const I18N = {
  'pt-BR': {
    appName: "Visualizador de Estruturas de Dados & Algoritmos",
    appVersion: "v2.0.0",
    themeToggle: "Alternar Tema Claro/Escuro",
    categories: {
      arrays: "Algoritmos em Arrays",
      linear: "Listas, Pilhas e Filas",
      sorting: "Algoritmos de Ordenação",
      avl: "Árvore AVL (Fator de Balanço)",
      rbtree: "Árvore Rubro-Negra (NIL Nodes)",
      btree: "Árvore-B (Multiway)",
      trees: "Árvores (BST, AVL, Rubro-Negra, B-Tree)",
      heaps: "Heaps e Filas de Prioridade",
      graphs: "Algoritmos em Grafos",
      hashing: "Tabelas Hash",
      dp: "Programação Dinâmica",
      compression: "Compressão (Huffman)",
      exercises: "🎓 Auditoria & Construção Livre"
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
      pseudocode: "Pseudocódigo",
      auditor: "🔍 Diagnóstico"
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
      },
      exercises: {
        title: "Modo Exercícios & Auditoria de Árvores",
        description: "Este ambiente permite construir árvores livremente, inserindo nós em posições arbitrárias para criar propositalmente árvores com erros ou carregar pegadinhas clássicas de provas. O motor de auditoria em tempo real inspeciona a estrutura contra as invariantes matemáticas de Árvores Binárias de Busca (ABB), Árvores AVL, Árvores Rubro-Negras e Heaps, diagnosticando a regra exata violada, os nós envolvidos e a rotação ou correção necessária.",
        bestTime: "O(n)",
        avgTime: "O(n)",
        worstTime: "O(n)",
        space: "O(h)",
        pseudocode: `funcao auditarArvore(no, minVal, maxVal):
    se no == NULO: retornar VÁLIDO
    
    // Invariante de Árvore Binária de Busca (Global e Local)
    se no.chave <= minVal ou no.chave >= maxVal:
        registrarErro("Violação de Invariante de ABB", no)
        
    // Invariante de Árvore AVL
    se tipo == "AVL" e abs(no.alturaEsq - no.alturaDir) > 1:
        registrarErro("Desbalanceamento AVL", calcularRotacao(no))
        
    // Invariantes da Árvore Rubro-Negra (Regras 1 a 5)
    se tipo == "RUBRO_NEGRA":
        verificarRegras1a5(no)
        
    retornar auditarArvore(no.esq) e auditarArvore(no.dir)`
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
      btree: "B-Tree (Multiway)",
      trees: "Trees (BST, AVL, Red-Black, B-Tree)",
      heaps: "Heaps & Priority Queues",
      graphs: "Graph Algorithms",
      hashing: "Hash Tables",
      dp: "Dynamic Programming",
      compression: "Compression (Huffman)",
      exercises: "🎓 Tree Auditor & Free Build"
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
      pseudocode: "Pseudocode",
      auditor: "🔍 Error Diagnosis"
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
      },
      exercises: {
        title: "Tree Auditor & Exercise Mode",
        description: "Construct arbitrary binary trees freely or test classic student exam traps. Real-time auditing checks BST ordering (local and global ancestors), AVL balance factors, Red-Black properties (rules 1-5), and Heap priority invariants.",
        bestTime: "O(n)",
        avgTime: "O(n)",
        worstTime: "O(n)",
        space: "O(h)",
        pseudocode: `function auditTree(node, minVal, maxVal):
    if node == null: return VALID
    if node.key <= minVal or node.key >= maxVal:
        recordError("BST Invariant Violation", node)
    if type == "AVL" and abs(node.hL - node.hR) > 1:
        recordError("AVL Unbalance", computeRotation(node))
    if type == "RBTREE":
        verifyRules1to5(node)
    return auditTree(node.left) and auditTree(node.right)`
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
      btree: "Árbol-B (Multicamino)",
      trees: "Árboles (BST, AVL, Rojinegro, B-Tree)",
      heaps: "Montículos (Heaps) y Colas de Prioridad",
      graphs: "Algoritmos en Grafos",
      hashing: "Tablas Hash",
      dp: "Programación Dinâmica",
      compression: "Compresión (Huffman)",
      exercises: "🎓 Auditoría y Construcción Libre"
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
      pseudocode: "Pseudocódigo",
      auditor: "🔍 Diagnóstico de Errores"
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
      },
      exercises: {
        title: "Modo Ejercicios y Auditoría de Árboles",
        description: "Construya árboles binarios libremente insertando nodos en cualquier posición o cargue trampas clásicas de exámenes. El motor de auditoría comprueba invariantes de ABB, AVL, Árboles Rojinegros y Heaps, diagnosticando violaciones y acciones correctivas.",
        bestTime: "O(n)",
        avgTime: "O(n)",
        worstTime: "O(n)",
        space: "O(h)",
        pseudocode: `funcion auditarArbol(nodo, minVal, maxVal)...`
      }
    }
  }
};
