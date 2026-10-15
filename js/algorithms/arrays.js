/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Array Algorithms Module (Linear/Binary Search, Two Pointers, Sliding Window, Kadane, Dutch Flag, Rotate)
 */

export class ArrayAlgorithms {
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
