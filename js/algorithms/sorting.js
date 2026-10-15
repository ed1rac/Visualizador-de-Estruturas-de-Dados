/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Comprehensive Sorting Algorithms Module (Comparison & Distribution Sorts)
 */

export class SortingAlgorithms {
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
