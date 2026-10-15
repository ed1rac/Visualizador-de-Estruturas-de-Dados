/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Tree Algorithms: AVL (with configurable BF), Red-Black Tree (with NIL toggle), BST, B-Tree
 */

export class TreeAlgorithms {
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
