/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Modules: Linear Structures, Heaps, Hashing, Dynamic Programming, Huffman
 */

export class OtherAlgorithms {
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
