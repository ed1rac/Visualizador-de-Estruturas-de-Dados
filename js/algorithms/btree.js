/**
 * Data Structures & Algorithms Visualizer v2.1.0
 * B-Tree (Multiway Balanced Search Tree) Engine
 *
 * Implements:
 * - Configurable Order M (3 = 2-3 Tree, 4 = 2-3-4 Tree, 5)
 * - Search with step-by-step key comparisons
 * - Insertion with median key promotion and node split (propagation up to root)
 * - Deletion with predecessor replacement, rotation (borrow from sibling), and node merging
 * - Planar 2D layout with non-overlapping multi-key segmented cells and pointer connections
 */

export class BTreeNode {
  constructor(isLeaf = true) {
    this.id = BTreeNode.nextId++;
    this.keys = [];
    this.children = [];
    this.isLeaf = isLeaf;
    this.parent = null;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.subtreeWidth = 0;
    this.highlightedKeyIdx = -1;
    this.highlighted = false;
    this.status = null;
  }
}
BTreeNode.nextId = 1;

export class BTreeAlgorithms {
  constructor(order = 3) {
    this.order = order; // Max children M (Order 3: 1-2 keys; Order 4: 1-3 keys; Order 5: 1-4 keys)
    this.root = null;
    this.initDefaultTree();
  }

  setOrder(newOrder) {
    const ord = Number(newOrder);
    if (ord >= 3 && ord <= 6) {
      this.order = ord;
      this.initDefaultTree();
    }
  }

  get minKeys() {
    return Math.ceil(this.order / 2) - 1;
  }

  get maxKeys() {
    return this.order - 1;
  }

  initDefaultTree() {
    this.root = null;
    BTreeNode.nextId = 1;
    const initialKeys = [20, 40, 10, 30, 50, 60, 25];
    for (const k of initialKeys) {
      this.rawInsert(k);
    }
  }

  clear() {
    this.root = null;
    BTreeNode.nextId = 1;
  }

  // Deep clone a B-Tree for immutable snapshot frames
  cloneTree(node) {
    if (!node) return null;
    const copy = new BTreeNode(node.isLeaf);
    copy.id = node.id;
    copy.keys = [...node.keys];
    copy.highlightedKeyIdx = node.highlightedKeyIdx;
    copy.highlighted = node.highlighted;
    copy.status = node.status;
    copy.x = node.x;
    copy.y = node.y;
    copy.width = node.width;
    copy.subtreeWidth = node.subtreeWidth;

    for (const child of node.children) {
      const childCopy = this.cloneTree(child);
      childCopy.parent = copy;
      copy.children.push(childCopy);
    }
    return copy;
  }

  // =========================================================================
  // LAYOUT AND SCENE BUILDER
  // =========================================================================

  layoutTree(root) {
    if (!root || root.keys.length === 0) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: `Árvore-B (Ordem ${this.order}) vazia. Digite um valor acima e clique em "Inserir" ou "Gerar Conjunto Aleatório".`,
          x: 120,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#64748b'
        }]
      };
    }

    const cellW = 38;
    const cellH = 34;
    const spacingX = 24;
    const levelSpacingY = 95;

    // 1. Calculate dimensions of each node and subtree width
    const measureSubtree = (node) => {
      if (!node) return 0;
      node.width = Math.max(node.keys.length * cellW, cellW);

      if (node.isLeaf || node.children.length === 0) {
        node.subtreeWidth = node.width + spacingX;
        return node.subtreeWidth;
      }

      let childrenTotalWidth = 0;
      for (const child of node.children) {
        childrenTotalWidth += measureSubtree(child);
      }

      node.subtreeWidth = Math.max(node.width + spacingX, childrenTotalWidth);
      return node.subtreeWidth;
    };
    measureSubtree(root);

    // 2. Position nodes using calculated subtree spans
    const assignPositions = (node, leftX, depth) => {
      if (!node) return;
      node.y = 85 + depth * levelSpacingY;
      // Center the node within its allocated subtree span
      node.x = leftX + (node.subtreeWidth - node.width) / 2;

      if (!node.isLeaf) {
        let currentChildX = leftX;
        for (const child of node.children) {
          assignPositions(child, currentChildX, depth + 1);
          currentChildX += child.subtreeWidth;
        }
      }
    };
    assignPositions(root, 100, 0);

    // 3. Collect elements (segmented cells) and links
    const elements = [];
    const links = [];
    const decorations = [];

    const collectVisuals = (node) => {
      if (!node) return;

      const numKeys = node.keys.length;
      const totalNodeW = numKeys * cellW;

      // Render cells for keys
      for (let i = 0; i < numKeys; i++) {
        const cellX = node.x + i * cellW;
        const cellY = node.y;
        const isKeyHighlighted = node.highlightedKeyIdx === i;

        let fill = '#ffffff';
        let stroke = '#64748b';
        let textColor = '#0f172a';

        if (isKeyHighlighted) {
          fill = '#f59e0b';
          stroke = '#d97706';
          textColor = '#ffffff';
        } else if (node.status === 'split') {
          fill = '#fee2e2';
          stroke = '#ef4444';
          textColor = '#991b1b';
        } else if (node.status === 'found') {
          fill = '#d1fae5';
          stroke = '#059669';
          textColor = '#065f46';
        }

        elements.push({
          type: 'rect',
          x: cellX,
          y: cellY,
          w: cellW,
          h: cellH,
          label: node.keys[i],
          fill,
          stroke,
          textColor,
          highlighted: isKeyHighlighted || node.highlighted
        });
      }

      // Draw pointer links to children
      if (!node.isLeaf && node.children.length > 0) {
        const numPointers = node.children.length;
        for (let i = 0; i < numPointers; i++) {
          const child = node.children[i];
          if (!child) continue;

          // Pointer origin: between keys or at the edges
          let ptrX;
          if (i === 0) {
            ptrX = node.x; // Left of first key
          } else if (i === numKeys) {
            ptrX = node.x + totalNodeW; // Right of last key
          } else {
            ptrX = node.x + i * cellW; // Boundary between key[i-1] and key[i]
          }
          const ptrY = node.y + cellH;

          // Child target: top center of child node
          const childTargetX = child.x + (child.keys.length * cellW) / 2;
          const childTargetY = child.y;

          links.push({
            x1: ptrX,
            y1: ptrY,
            x2: childTargetX,
            y2: childTargetY,
            r1: 0,
            r2: 0,
            color: '#64748b',
            width: 1.8
          });

          // Small circular dot indicating the pointer base
          elements.push({
            type: 'circle',
            x: ptrX,
            y: ptrY,
            radius: 3,
            fill: '#64748b',
            stroke: '#64748b'
          });

          collectVisuals(child);
        }
      }
    };

    collectVisuals(root);

    // Tree metadata header badge
    decorations.push({
      type: 'text',
      text: `Árvore-B de Ordem M=${this.order} | Capacidade de chaves por nó: [${this.minKeys} ... ${this.maxKeys}]`,
      x: 180,
      y: 45,
      font: 'bold 13px "Inter", sans-serif',
      color: '#0284c7'
    });

    return { elements, links, decorations };
  }

  // =========================================================================
  // INSERTION WITH SPLIT & MEDIAN PROMOTION
  // =========================================================================

  rawInsert(key) {
    key = Number(key);
    if (!this.root) {
      this.root = new BTreeNode(true);
      this.root.keys.push(key);
      return;
    }

    // Check duplicate
    if (this.contains(this.root, key)) return;

    const findLeaf = (node) => {
      if (node.isLeaf) return node;
      let i = 0;
      while (i < node.keys.length && key > node.keys[i]) i++;
      return findLeaf(node.children[i]);
    };

    const leaf = findLeaf(this.root);
    // Insert sorted
    let idx = 0;
    while (idx < leaf.keys.length && leaf.keys[idx] < key) idx++;
    leaf.keys.splice(idx, 0, key);

    // Propagate splits if overflow
    let curr = leaf;
    while (curr && curr.keys.length >= this.order) {
      curr = this.splitNode(curr);
    }
  }

  splitNode(node) {
    const midIdx = Math.floor(node.keys.length / 2);
    const medianKey = node.keys[midIdx];

    const rightNode = new BTreeNode(node.isLeaf);
    rightNode.keys = node.keys.slice(midIdx + 1);
    node.keys = node.keys.slice(0, midIdx);

    if (!node.isLeaf) {
      rightNode.children = node.children.slice(midIdx + 1);
      node.children = node.children.slice(0, midIdx + 1);
      for (const c of rightNode.children) {
        c.parent = rightNode;
      }
    }

    if (node === this.root) {
      const newRoot = new BTreeNode(false);
      newRoot.keys = [medianKey];
      newRoot.children = [node, rightNode];
      node.parent = newRoot;
      rightNode.parent = newRoot;
      this.root = newRoot;
      return null;
    } else {
      const parent = node.parent;
      rightNode.parent = parent;

      let insertIdx = 0;
      while (insertIdx < parent.keys.length && parent.keys[insertIdx] < medianKey) {
        insertIdx++;
      }
      parent.keys.splice(insertIdx, 0, medianKey);
      parent.children.splice(insertIdx + 1, 0, rightNode);
      return parent;
    }
  }

  contains(node, key) {
    if (!node) return false;
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) i++;
    if (i < node.keys.length && node.keys[i] === key) return true;
    if (node.isLeaf) return false;
    return this.contains(node.children[i], key);
  }

  // =========================================================================
  // ANIMATED FRAMES GENERATORS
  // =========================================================================

  generateBTreeInsertFrames(rawKey) {
    const key = Number(rawKey);
    const frames = [];

    const recordStep = (msg, nodeToHighlight = null, keyIdx = -1, status = null) => {
      const snapshot = this.cloneTree(this.root);
      if (nodeToHighlight && snapshot) {
        const findInSnapshot = (n) => {
          if (!n) return null;
          if (n.id === nodeToHighlight.id) return n;
          for (const c of n.children) {
            const found = findInSnapshot(c);
            if (found) return found;
          }
          return null;
        };
        const target = findInSnapshot(snapshot);
        if (target) {
          target.highlighted = true;
          target.highlightedKeyIdx = keyIdx;
          target.status = status;
        }
      }

      const scene = this.layoutTree(snapshot);
      frames.push({
        elements: scene.elements,
        links: scene.links,
        decorations: scene.decorations,
        message: msg
      });
    };

    if (isNaN(key)) {
      recordStep('Valor inválido. Digite um número.');
      return frames;
    }

    recordStep(`Iniciando inserção da chave ${key} na Árvore-B (Ordem M=${this.order})...`);

    if (!this.root) {
      this.root = new BTreeNode(true);
      this.root.keys.push(key);
      recordStep(`Árvore estava vazia. Chave ${key} inserida como raiz única.`, this.root, 0);
      return frames;
    }

    if (this.contains(this.root, key)) {
      recordStep(`[CHAVE DUPLICADA] A chave ${key} já existe na Árvore-B. Nenhuma alteração feita.`);
      return frames;
    }

    // Traverse to appropriate leaf
    let curr = this.root;
    while (!curr.isLeaf) {
      let i = 0;
      while (i < curr.keys.length && key > curr.keys[i]) {
        i++;
      }
      recordStep(`Descendo na árvore: chave ${key} comparada no nó. Seguindo para o filho [${i}].`, curr, i);
      curr = curr.children[i];
    }

    // Insert into leaf
    let insIdx = 0;
    while (insIdx < curr.keys.length && curr.keys[insIdx] < key) {
      insIdx++;
    }
    curr.keys.splice(insIdx, 0, key);
    recordStep(`Chave ${key} inserida na posição ordenada do nó folha. Chaves atuais: [${curr.keys.join(', ')}].`, curr, insIdx);

    // Handle potential overflow splits
    let nodeToSplit = curr;
    while (nodeToSplit && nodeToSplit.keys.length >= this.order) {
      const midIdx = Math.floor(nodeToSplit.keys.length / 2);
      const promotedKey = nodeToSplit.keys[midIdx];

      recordStep(
        `[CISÃO DE NÓ] Nó com overflow (${nodeToSplit.keys.length} chaves >= M=${this.order}). Mediana ${promotedKey} será promovida!`,
        nodeToSplit,
        midIdx,
        'split'
      );

      const rightNode = new BTreeNode(nodeToSplit.isLeaf);
      rightNode.keys = nodeToSplit.keys.slice(midIdx + 1);
      nodeToSplit.keys = nodeToSplit.keys.slice(0, midIdx);

      if (!nodeToSplit.isLeaf) {
        rightNode.children = nodeToSplit.children.slice(midIdx + 1);
        nodeToSplit.children = nodeToSplit.children.slice(0, midIdx + 1);
        for (const c of rightNode.children) {
          c.parent = rightNode;
        }
      }

      if (nodeToSplit === this.root) {
        const newRoot = new BTreeNode(false);
        newRoot.keys = [promotedKey];
        newRoot.children = [nodeToSplit, rightNode];
        nodeToSplit.parent = newRoot;
        rightNode.parent = newRoot;
        this.root = newRoot;

        recordStep(
          `[NOVA RAIZ] Raiz sofreu cisão! Nova raiz criada com a chave promovida ${promotedKey}. Altura da Árvore-B aumentou!`,
          newRoot,
          0
        );
        nodeToSplit = null;
      } else {
        const parent = nodeToSplit.parent;
        rightNode.parent = parent;

        let pIdx = 0;
        while (pIdx < parent.keys.length && parent.keys[pIdx] < promotedKey) {
          pIdx++;
        }
        parent.keys.splice(pIdx, 0, promotedKey);
        parent.children.splice(pIdx + 1, 0, rightNode);

        recordStep(
          `Chave mediana ${promotedKey} inserida no nó pai. Chaves no pai: [${parent.keys.join(', ')}].`,
          parent,
          pIdx
        );
        nodeToSplit = parent;
      }
    }

    recordStep(`Inserção da chave ${key} finalizada com sucesso! Todas as folhas continuam no mesmo nível.`, null);
    return frames;
  }

  // --- SEARCH ANIMATION ---
  generateBTreeSearchFrames(rawKey) {
    const key = Number(rawKey);
    const frames = [];

    const recordStep = (msg, nodeToHighlight = null, keyIdx = -1, status = null) => {
      const snapshot = this.cloneTree(this.root);
      if (nodeToHighlight && snapshot) {
        const findInSnapshot = (n) => {
          if (!n) return null;
          if (n.id === nodeToHighlight.id) return n;
          for (const c of n.children) {
            const found = findInSnapshot(c);
            if (found) return found;
          }
          return null;
        };
        const target = findInSnapshot(snapshot);
        if (target) {
          target.highlighted = true;
          target.highlightedKeyIdx = keyIdx;
          target.status = status;
        }
      }

      const scene = this.layoutTree(snapshot);
      frames.push({
        elements: scene.elements,
        links: scene.links,
        decorations: scene.decorations,
        message: msg
      });
    };

    if (isNaN(key)) {
      recordStep('Valor inválido para busca.');
      return frames;
    }

    if (!this.root) {
      recordStep('Árvore-B vazia. Chave não encontrada.');
      return frames;
    }

    recordStep(`Iniciando busca pela chave ${key} na Árvore-B...`);

    let curr = this.root;
    while (curr) {
      let i = 0;
      while (i < curr.keys.length && key > curr.keys[i]) {
        recordStep(`Comparando chave ${key} com chave ${curr.keys[i]}: ${key} > ${curr.keys[i]}. Avançando...`, curr, i);
        i++;
      }

      if (i < curr.keys.length && curr.keys[i] === key) {
        recordStep(`[CHAVE ENCONTRADA] Chave ${key} encontrada com sucesso no nó!`, curr, i, 'found');
        return frames;
      }

      if (curr.isLeaf) {
        recordStep(`[NÃO ENCONTRADA] Chegamos a uma folha e a chave ${key} não existe na árvore.`);
        return frames;
      }

      recordStep(`Chave ${key} é menor que ${curr.keys[i] !== undefined ? curr.keys[i] : 'infinito'}. Descendo pelo ponteiro [${i}]...`, curr, i);
      curr = curr.children[i];
    }

    recordStep(`Chave ${key} não encontrada.`);
    return frames;
  }

  // --- DELETION ---
  generateBTreeDeleteFrames(rawKey) {
    const key = Number(rawKey);
    const frames = [];

    const recordStep = (msg, nodeToHighlight = null, keyIdx = -1, status = null) => {
      const snapshot = this.cloneTree(this.root);
      if (nodeToHighlight && snapshot) {
        const findInSnapshot = (n) => {
          if (!n) return null;
          if (n.id === nodeToHighlight.id) return n;
          for (const c of n.children) {
            const found = findInSnapshot(c);
            if (found) return found;
          }
          return null;
        };
        const target = findInSnapshot(snapshot);
        if (target) {
          target.highlighted = true;
          target.highlightedKeyIdx = keyIdx;
          target.status = status;
        }
      }

      const scene = this.layoutTree(snapshot);
      frames.push({
        elements: scene.elements,
        links: scene.links,
        decorations: scene.decorations,
        message: msg
      });
    };

    if (isNaN(key)) {
      recordStep('Valor inválido para remoção.');
      return frames;
    }

    if (!this.root || !this.contains(this.root, key)) {
      recordStep(`Chave ${key} não encontrada na Árvore-B para remoção.`);
      return frames;
    }

    recordStep(`Iniciando remoção da chave ${key} na Árvore-B (Ordem M=${this.order})...`);

    // Helper to find key node
    const findNodeWithKey = (node, k) => {
      if (!node) return null;
      const idx = node.keys.indexOf(k);
      if (idx !== -1) return { node, idx };
      if (node.isLeaf) return null;
      let i = 0;
      while (i < node.keys.length && k > node.keys[i]) i++;
      return findNodeWithKey(node.children[i], k);
    };

    let targetInfo = findNodeWithKey(this.root, key);
    let targetNode = targetInfo.node;
    let targetIdx = targetInfo.idx;

    if (!targetNode.isLeaf) {
      // Find in-order predecessor (rightmost leaf of left child)
      let predNode = targetNode.children[targetIdx];
      while (!predNode.isLeaf) {
        predNode = predNode.children[predNode.children.length - 1];
      }
      const predKey = predNode.keys[predNode.keys.length - 1];

      recordStep(`Chave ${key} está em nó interno. Substituindo por predecessor em-ordem: ${predKey}.`, targetNode, targetIdx);
      targetNode.keys[targetIdx] = predKey;

      // Now remove predKey from predNode (which is a leaf)
      targetNode = predNode;
      targetIdx = predNode.keys.length - 1;
    }

    // Remove from leaf
    targetNode.keys.splice(targetIdx, 1);
    recordStep(`Chave removida do nó folha. Chaves restantes no nó: [${targetNode.keys.join(', ')}].`, targetNode);

    // Rebalance underflow upwards
    let curr = targetNode;
    while (curr !== this.root && curr.keys.length < this.minKeys) {
      const parent = curr.parent;
      const childIdx = parent.children.indexOf(curr);
      const leftSibling = childIdx > 0 ? parent.children[childIdx - 1] : null;
      const rightSibling = childIdx < parent.children.length - 1 ? parent.children[childIdx + 1] : null;

      // Case 1: Borrow from left sibling
      if (leftSibling && leftSibling.keys.length > this.minKeys) {
        const borrowedKey = leftSibling.keys.pop();
        const parentKey = parent.keys[childIdx - 1];
        parent.keys[childIdx - 1] = borrowedKey;
        curr.keys.unshift(parentKey);

        if (!leftSibling.isLeaf) {
          const borrowedChild = leftSibling.children.pop();
          borrowedChild.parent = curr;
          curr.children.unshift(borrowedChild);
        }

        recordStep(
          `[ROTAÇÃO À DIREITA / EMPRÉSTIMO] Nó com underflow pegou emprestado do irmão à esquerda via pai.`,
          curr,
          0
        );
        break;
      }
      // Case 2: Borrow from right sibling
      else if (rightSibling && rightSibling.keys.length > this.minKeys) {
        const borrowedKey = rightSibling.keys.shift();
        const parentKey = parent.keys[childIdx];
        parent.keys[childIdx] = borrowedKey;
        curr.keys.push(parentKey);

        if (!rightSibling.isLeaf) {
          const borrowedChild = rightSibling.children.shift();
          borrowedChild.parent = curr;
          curr.children.push(borrowedChild);
        }

        recordStep(
          `[ROTAÇÃO À ESQUERDA / EMPRÉSTIMO] Nó com underflow pegou emprestado do irmão à direita via pai.`,
          curr,
          curr.keys.length - 1
        );
        break;
      }
      // Case 3: Merge with sibling and parent key
      else {
        if (leftSibling) {
          const parentKey = parent.keys.splice(childIdx - 1, 1)[0];
          leftSibling.keys.push(parentKey, ...curr.keys);
          if (!curr.isLeaf) {
            for (const c of curr.children) c.parent = leftSibling;
            leftSibling.children.push(...curr.children);
          }
          parent.children.splice(childIdx, 1);

          recordStep(
            `[FUSÃO DE NÓS / MERGE] Nó e irmão esquerdo fundidos com a chave separadora do pai.`,
            leftSibling
          );
        } else if (rightSibling) {
          const parentKey = parent.keys.splice(childIdx, 1)[0];
          curr.keys.push(parentKey, ...rightSibling.keys);
          if (!rightSibling.isLeaf) {
            for (const c of rightSibling.children) c.parent = curr;
            curr.children.push(...rightSibling.children);
          }
          parent.children.splice(childIdx + 1, 1);

          recordStep(
            `[FUSÃO DE NÓS / MERGE] Nó e irmão direito fundidos com a chave separadora do pai.`,
            curr
          );
        }

        curr = parent;
      }
    }

    // If root became empty, shrink tree
    if (this.root && this.root.keys.length === 0) {
      if (this.root.children.length > 0) {
        this.root = this.root.children[0];
        this.root.parent = null;
        recordStep(`[REDUÇÃO DE ALTURA] Raiz esvaziou. Filho único tornou-se a nova raiz da Árvore-B!`, this.root);
      } else {
        this.root = null;
        recordStep(`Árvore-B esvaziada completamente.`);
      }
    }

    recordStep(`Remoção finalizada com sucesso!`, null);
    return frames;
  }
}
