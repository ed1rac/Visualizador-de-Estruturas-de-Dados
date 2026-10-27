/**
 * Data Structures & Algorithms Visualizer v2.1.0
 * Tree Auditor & Free-Form Tree Construction Engine for Student Exercises
 *
 * Allows constructing arbitrary / erroneous trees and auditing them against:
 * 1. Binary Search Tree (BST) invariant (local child & global ancestor subtree intervals)
 * 2. AVL Tree invariants (Balance Factor |FB| <= 1, height calculations, rotation diagnostics)
 * 3. Red-Black Tree invariants (Rules 1-5: Red root, Red-Red parent-child, Black-Height consistency)
 * 4. Min-Heap / Max-Heap invariants (Parent-child ordering, almost-complete shape)
 */

export class TreeAuditor {
  constructor() {
    this.root = null;
    this.targetType = 'bst'; // 'bst' | 'avl' | 'rbtree' | 'minheap' | 'maxheap'
    this.revealMode = true; // true: show errors / diagnosis; false: classroom student mode (hidden)
    this.bfConvention = 'leftMinusRight'; // 'leftMinusRight' | 'rightMinusLeft'
    this.showNilNodes = true;
    this.selectedNodeId = null;
    this.nextId = 1;
    this.cachedAuditResult = { isValid: true, errors: [], warnings: [], stats: {} };

    // Initialize with a classic educational trap tree
    this.loadPreset('bst_ancestor_trap');
  }

  // =========================================================================
  // NODE & TREE MANAGEMENT
  // =========================================================================

  createNode(key, color = 'BLACK') {
    return {
      id: this.nextId++,
      key: Number(key),
      color: color, // 'BLACK' | 'RED'
      left: null,
      right: null,
      parent: null,
      highlighted: false,
      hasError: false,
      errorMsg: null,
      x: 0,
      y: 0,
      gridX: 0,
      gridY: 0
    };
  }

  clear() {
    this.root = null;
    this.selectedNodeId = null;
    this.cachedAuditResult = { isValid: true, errors: [], warnings: [], stats: {} };
  }

  findNode(node, id) {
    if (!node) return null;
    if (node.id === Number(id)) return node;
    const l = this.findNode(node.left, id);
    if (l) return l;
    return this.findNode(node.right, id);
  }

  getAllNodes(node = this.root, acc = []) {
    if (!node) return acc;
    acc.push(node);
    if (node.left) this.getAllNodes(node.left, acc);
    if (node.right) this.getAllNodes(node.right, acc);
    return acc;
  }

  /**
   * Insert a node freely anywhere in the tree (allows deliberate error creation)
   * @param {number} key - Value of node
   * @param {number|null} parentId - ID of parent node, or null for root
   * @param {'left'|'right'} position - 'left' or 'right' child
   * @param {'BLACK'|'RED'} color - Node color for Red-Black trees
   */
  insertFreeNode(key, parentId = null, position = 'left', color = 'RED') {
    const val = Number(key);
    if (isNaN(val)) return { success: false, message: 'Valor numérico inválido.' };

    if (!this.root || parentId === null || parentId === 'root_new') {
      // Set as root
      const newRoot = this.createNode(val, color);
      if (this.root) {
        // Old root becomes child if position given, otherwise replaces
        if (position === 'left') newRoot.left = this.root;
        else newRoot.right = this.root;
        this.root.parent = newRoot;
      }
      this.root = newRoot;
      this.audit();
      return { success: true, node: newRoot };
    }

    const parent = this.findNode(this.root, Number(parentId));
    if (!parent) {
      return { success: false, message: `Nó pai #${parentId} não encontrado.` };
    }

    const newNode = this.createNode(val, color);
    newNode.parent = parent;

    if (position === 'left') {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this.audit();
    return { success: true, node: newNode };
  }

  removeNode(id) {
    if (!this.root) return false;
    const targetId = Number(id);

    if (this.root.id === targetId) {
      this.root = null;
      this.selectedNodeId = null;
      this.audit();
      return true;
    }

    const node = this.findNode(this.root, targetId);
    if (!node || !node.parent) return false;

    if (node.parent.left && node.parent.left.id === targetId) {
      node.parent.left = null;
    } else if (node.parent.right && node.parent.right.id === targetId) {
      node.parent.right = null;
    }

    if (this.selectedNodeId === targetId) {
      this.selectedNodeId = null;
    }

    this.audit();
    return true;
  }

  toggleNodeColor(id) {
    const node = this.findNode(this.root, Number(id));
    if (!node) return false;
    node.color = node.color === 'RED' ? 'BLACK' : 'RED';
    this.audit();
    return true;
  }

  updateNodeKey(id, newKey) {
    const node = this.findNode(this.root, Number(id));
    if (!node) return false;
    const val = Number(newKey);
    if (isNaN(val)) return false;
    node.key = val;
    this.audit();
    return true;
  }

  // =========================================================================
  // AUDIT ENGINE (INVARIANT CHECKING)
  // =========================================================================

  audit(targetType = null) {
    if (targetType) this.targetType = targetType;
    const type = this.targetType;

    // Reset error states on all nodes
    const allNodes = this.getAllNodes();
    for (const n of allNodes) {
      n.hasError = false;
      n.errorMsg = null;
      n.errorType = null;
    }

    if (!this.root) {
      this.cachedAuditResult = {
        isValid: true,
        errors: [],
        warnings: [],
        stats: { nodeCount: 0, height: 0 },
        summary: 'Árvore vazia. Nenhuma violação detectada.'
      };
      return this.cachedAuditResult;
    }

    const errors = [];
    const warnings = [];

    // Calculate basic heights
    const calcHeight = (node) => {
      if (!node) return 0;
      node.actualHeight = 1 + Math.max(calcHeight(node.left), calcHeight(node.right));
      return node.actualHeight;
    };
    calcHeight(this.root);

    // Calculate Balance Factors
    const calcBf = (node) => {
      if (!node) return 0;
      calcBf(node.left);
      calcBf(node.right);
      const hL = node.left ? node.left.actualHeight : 0;
      const hR = node.right ? node.right.actualHeight : 0;
      node.bf = this.bfConvention === 'leftMinusRight' ? (hL - hR) : (hR - hL);
      return node.bf;
    };
    calcBf(this.root);

    // -------------------------------------------------------------
    // 1. AUDIT: BINARY SEARCH TREE (BST)
    // -------------------------------------------------------------
    if (type === 'bst' || type === 'avl' || type === 'rbtree') {
      this.auditBst(this.root, -Infinity, Infinity, [], errors, warnings);
    }

    // -------------------------------------------------------------
    // 2. AUDIT: AVL INVARIANTS
    // -------------------------------------------------------------
    if (type === 'avl') {
      this.auditAvl(this.root, errors, warnings);
    }

    // -------------------------------------------------------------
    // 3. AUDIT: RED-BLACK TREE INVARIANTS
    // -------------------------------------------------------------
    if (type === 'rbtree') {
      this.auditRedBlack(this.root, errors, warnings);
    }

    // -------------------------------------------------------------
    // 4. AUDIT: MIN-HEAP / MAX-HEAP INVARIANTS
    // -------------------------------------------------------------
    if (type === 'minheap') {
      this.auditHeap(this.root, 'min', errors, warnings);
    } else if (type === 'maxheap') {
      this.auditHeap(this.root, 'max', errors, warnings);
    }

    // Mark nodes with errors
    for (const err of errors) {
      if (err.nodeIds && Array.isArray(err.nodeIds)) {
        for (const nid of err.nodeIds) {
          const n = this.findNode(this.root, nid);
          if (n) {
            n.hasError = true;
            n.errorMsg = err.title;
            n.errorType = err.rule;
          }
        }
      }
    }

    const isValid = errors.length === 0;
    this.cachedAuditResult = {
      isValid,
      targetType: type,
      errors,
      warnings,
      stats: {
        nodeCount: allNodes.length,
        height: this.root.actualHeight
      },
      summary: isValid
        ? `✅ Estrutura válida para ${this.getTargetName(type)}! Nenhuma violação detectada.`
        : `❌ ${errors.length} violação(ões) detectada(s) para ${this.getTargetName(type)}!`
    };

    return this.cachedAuditResult;
  }

  // --- BST AUDIT ---
  auditBst(node, minVal, maxVal, pathAncestors, errors, warnings) {
    if (!node) return;

    // Check Duplicate Keys
    const duplicates = pathAncestors.filter(a => a.key === node.key);
    if (duplicates.length > 0) {
      errors.push({
        rule: 'BST_DUPLICATE_KEY',
        title: 'Chave Duplicada',
        severity: 'error',
        nodeIds: [node.id, duplicates[0].id],
        message: `O nó com chave <strong>${node.key}</strong> já existe na árvore (nó ancestral #${duplicates[0].id}).`,
        explanation: 'Em uma Árvore Binária de Busca tradicional, todas as chaves devem ser distintas para garantir busca em tempo unívoco.',
        fixHint: `Altere o valor do nó #${node.id} para um valor exclusivo.`
      });
    }

    // Check Local Left Child Invariant
    if (node.left && node.left.key >= node.key) {
      errors.push({
        rule: 'BST_LOCAL_LEFT',
        title: 'Violação de ABB: Filho Esquerdo ≥ Pai',
        severity: 'error',
        nodeIds: [node.left.id, node.id],
        message: `O filho esquerdo <strong>${node.left.key}</strong> é maior ou igual ao pai <strong>${node.key}</strong>.`,
        explanation: `Na Árvore Binária de Busca, a subárvore esquerda deve conter estritamente valores menores que o nó pai ($esq < pai$). No entanto, temos $${node.left.key} \\ge ${node.key}$.`,
        fixHint: `Mova o nó #${node.left.id} para a subárvore direita ou altere seu valor para $< ${node.key}$.`
      });
    }

    // Check Local Right Child Invariant
    if (node.right && node.right.key <= node.key) {
      errors.push({
        rule: 'BST_LOCAL_RIGHT',
        title: 'Violação de ABB: Filho Direito ≤ Pai',
        severity: 'error',
        nodeIds: [node.right.id, node.id],
        message: `O filho direito <strong>${node.right.key}</strong> é menor ou igual ao pai <strong>${node.key}</strong>.`,
        explanation: `Na Árvore Binária de Busca, a subárvore direita deve conter estritamente valores maiores que o nó pai ($dir > pai$). No entanto, temos $${node.right.key} \\le ${node.key}$.`,
        fixHint: `Mova o nó #${node.right.id} para a subárvore esquerda ou altere seu valor para $> ${node.key}$.`
      });
    }

    // Check Global Subtree Ancestor Invariant (The classic exam trap!)
    if (node.key <= minVal.val) {
      errors.push({
        rule: 'BST_GLOBAL_ANCESTOR_MIN',
        title: 'Pegadinha de Prova: Violação Global de Ancestral',
        severity: 'error',
        nodeIds: [node.id, minVal.node.id],
        message: `O nó <strong>${node.key}</strong> viola o ancestral <strong>${minVal.node.key}</strong>.`,
        explanation: `O nó <strong>${node.key}</strong> está localizado na subárvore <em>DIREITA</em> do ancestral <strong>${minVal.node.key}</strong> (portanto deveria ser estritamente maior que ele), mas possui valor <strong>${node.key} &le; ${minVal.node.key}</strong>.`,
        fixHint: `Mesmo que localmente pareça ordenado em relação ao pai direto, na subárvore inteira à direita de ${minVal.node.key} todos os elementos devem ser $> ${minVal.node.key}$.`
      });
    }

    if (node.key >= maxVal.val) {
      errors.push({
        rule: 'BST_GLOBAL_ANCESTOR_MAX',
        title: 'Pegadinha de Prova: Violação Global de Ancestral',
        severity: 'error',
        nodeIds: [node.id, maxVal.node.id],
        message: `O nó <strong>${node.key}</strong> viola o ancestral <strong>${maxVal.node.key}</strong>.`,
        explanation: `O nó <strong>${node.key}</strong> está localizado na subárvore <em>ESQUERDA</em> do ancestral <strong>${maxVal.node.key}</strong> (portanto deveria ser estritamente menor que ele), mas possui valor <strong>${node.key} &ge; ${maxVal.node.key}</strong>.`,
        fixHint: `Na subárvore inteira à esquerda de ${maxVal.node.key}, todos os elementos devem ser $< ${maxVal.node.key}$.`
      });
    }

    // Recurse left with upper bound = node.key
    const newAncestors = [...pathAncestors, { id: node.id, key: node.key }];
    this.auditBst(
      node.left,
      minVal,
      { val: node.key, node: node },
      newAncestors,
      errors,
      warnings
    );

    // Recurse right with lower bound = node.key
    this.auditBst(
      node.right,
      { val: node.key, node: node },
      maxVal,
      newAncestors,
      errors,
      warnings
    );
  }

  // --- AVL AUDIT ---
  auditAvl(node, errors, warnings) {
    if (!node) return;

    this.auditAvl(node.left, errors, warnings);
    this.auditAvl(node.right, errors, warnings);

    const bf = node.bf;
    const absBf = Math.abs(bf);
    const hL = node.left ? node.left.actualHeight : 0;
    const hR = node.right ? node.right.actualHeight : 0;

    if (absBf > 1) {
      // Determine rotation type needed
      let rotationCase = '';
      let rotationDescription = '';
      let criticalChild = null;

      const isHeavyLeft = this.bfConvention === 'leftMinusRight' ? (bf > 1) : (bf < -1);

      if (isHeavyLeft) {
        // Heavy on left child
        criticalChild = node.left;
        const childBf = criticalChild ? criticalChild.bf : 0;
        const childHeavyLeft = this.bfConvention === 'leftMinusRight' ? (childBf >= 0) : (childBf <= 0);

        if (childHeavyLeft) {
          rotationCase = 'Caso LL (Esquerda-Esquerda)';
          rotationDescription = `Rotação Simples à Direita (Right Rotation) no nó <strong>${node.key}</strong>.`;
        } else {
          rotationCase = 'Caso LR (Esquerda-Direita)';
          rotationDescription = `Rotação Dupla à Direita: Rotação Simples à Esquerda no filho esquerdo <strong>${criticalChild.key}</strong>, seguida de Rotação Simples à Direita no nó <strong>${node.key}</strong>.`;
        }
      } else {
        // Heavy on right child
        criticalChild = node.right;
        const childBf = criticalChild ? criticalChild.bf : 0;
        const childHeavyRight = this.bfConvention === 'leftMinusRight' ? (childBf <= 0) : (childBf >= 0);

        if (childHeavyRight) {
          rotationCase = 'Caso RR (Direita-Direita)';
          rotationDescription = `Rotação Simples à Esquerda (Left Rotation) no nó <strong>${node.key}</strong>.`;
        } else {
          rotationCase = 'Caso RL (Direita-Esquerda)';
          rotationDescription = `Rotação Dupla à Esquerda: Rotação Simples à Direita no filho direito <strong>${criticalChild.key}</strong>, seguida de Rotação Simples à Esquerda no nó <strong>${node.key}</strong>.`;
        }
      }

      errors.push({
        rule: 'AVL_BALANCE_FACTOR',
        title: `Desbalanceamento AVL: ${rotationCase}`,
        severity: 'error',
        nodeIds: [node.id, ...(criticalChild ? [criticalChild.id] : [])],
        message: `O nó <strong>${node.key}</strong> está desbalanceado com Fator de Balanço <strong>FB = ${bf > 0 ? '+' + bf : bf}</strong> (|FB| &ge; 2).`,
        explanation: `A altura da subárvore esquerda é <strong>h(Esq) = ${hL}</strong> e da subárvore direita é <strong>h(Dir) = ${hR}</strong>. A diferença (${Math.abs(hL - hR)}) excede a tolerância máxima permitida pela AVL (|FB| &le; 1).`,
        fixHint: `<strong>Ação Corretiva:</strong> Aplicar <em>${rotationDescription}</em>`
      });
    }
  }

  // --- RED-BLACK AUDIT ---
  auditRedBlack(root, errors, warnings) {
    if (!root) return;

    // Rule 2: Root must be BLACK
    if (root.color !== 'BLACK') {
      errors.push({
        rule: 'RB_ROOT_NOT_BLACK',
        title: 'Violação da Regra 2: Raiz Vermelha',
        severity: 'error',
        nodeIds: [root.id],
        message: `A raiz da árvore (nó <strong>${root.key}</strong>) é <strong>VERMELHA</strong>.`,
        explanation: 'Pela Propriedade 2 das Árvores Rubro-Negras (Cormen / CLRS), a raiz deve ser estritamente PRETA.',
        fixHint: 'Recolora o nó raiz para PRETO. Isso não afeta a invariante de ordenação e aumenta a altura-preta de todas as folhas uniformemente.'
      });
    }

    // Rule 4: No Red-Red parent-child adjacency
    const checkRedRed = (node) => {
      if (!node) return;
      if (node.color === 'RED') {
        if (node.left && node.left.color === 'RED') {
          errors.push({
            rule: 'RB_RED_RED_CONFLICT',
            title: 'Violação da Regra 4: Conflito Vermelho-Vermelho',
            severity: 'error',
            nodeIds: [node.id, node.left.id],
            message: `O nó vermelho <strong>${node.key}</strong> tem um filho esquerdo também vermelho (<strong>${node.left.key}</strong>).`,
            explanation: 'Pela Propriedade 4, se um nó for vermelho, ambos os seus filhos devem ser pretos. Não podem ocorrer dois nós vermelhos consecutivos na mesma linhagem.',
            fixHint: 'Verifique a cor do nó "tio". Se o tio for vermelho, efetue uma recoloração (pai, tio pretos; avô vermelho). Se o tio for preto, execute as rotações correspondentes e recoloração.'
          });
        }
        if (node.right && node.right.color === 'RED') {
          errors.push({
            rule: 'RB_RED_RED_CONFLICT',
            title: 'Violação da Regra 4: Conflito Vermelho-Vermelho',
            severity: 'error',
            nodeIds: [node.id, node.right.id],
            message: `O nó vermelho <strong>${node.key}</strong> tem um filho direito também vermelho (<strong>${node.right.key}</strong>).`,
            explanation: 'Pela Propriedade 4, se um nó for vermelho, ambos os seus filhos devem ser pretos. Nós vermelhos consecutivos são estritamente proibidos.',
            fixHint: 'Efetue a rotação e recoloração do caso correspondente (recoloração se tio vermelho, rotação se tio preto).'
          });
        }
      }
      checkRedRed(node.left);
      checkRedRed(node.right);
    };
    checkRedRed(root);

    // Rule 5: Black-Height Consistency
    // Collect all paths to NIL leaves and count black nodes on each
    const paths = [];
    const traversePaths = (node, currentPath, blackCount) => {
      const isBlack = (!node || node.color === 'BLACK') ? 1 : 0;
      const count = blackCount + (node && node.color === 'BLACK' ? 1 : 0);

      if (!node) {
        // Reached a NIL leaf
        paths.push({
          pathNodes: [...currentPath, 'NIL'],
          blackCount: count + 1 // NIL leaves are conceptually black
        });
        return;
      }

      currentPath.push(`${node.key}(${node.color === 'RED' ? 'V' : 'P'})`);
      traversePaths(node.left, [...currentPath], count);
      traversePaths(node.right, [...currentPath], count);
    };
    traversePaths(root, [], 0);

    if (paths.length > 0) {
      const firstCount = paths[0].blackCount;
      const mismatchedPaths = paths.filter(p => p.blackCount !== firstCount);

      if (mismatchedPaths.length > 0) {
        // Distinct black counts found
        const countMap = {};
        for (const p of paths) {
          countMap[p.blackCount] = (countMap[p.blackCount] || 0) + 1;
        }

        const countsStr = Object.entries(countMap)
          .map(([c, qty]) => `${qty} caminho(s) com bh=${c}`)
          .join(', ');

        errors.push({
          rule: 'RB_BLACK_HEIGHT_MISMATCH',
          title: 'Violação da Regra 5: Altura-Preta Desigual (Black-Height)',
          severity: 'error',
          nodeIds: [root.id],
          message: `Nem todos os caminhos da raiz até as folhas NIL contêm a mesma quantidade de nós pretos.`,
          explanation: `Pela Propriedade 5, para cada nó, todos os caminhos simples até suas folhas descendentes (NIL) devem ter exatamente o mesmo número de nós pretos. Foram encontradas contagens divergentes: <strong>${countsStr}</strong>.`,
          fixHint: 'Recolora ou rebalanceie os ramos para garantir que cada ramo da árvore tenha a mesma altura preta.'
        });
      }
    }
  }

  // --- HEAP AUDIT ---
  auditHeap(root, heapType, errors, warnings) {
    if (!root) return;

    // Check order property
    const checkHeapOrder = (node) => {
      if (!node) return;

      if (heapType === 'min') {
        if (node.left && node.left.key < node.key) {
          errors.push({
            rule: 'HEAP_ORDER_VIOLATION',
            title: 'Violação de Min-Heap: Filho < Pai',
            severity: 'error',
            nodeIds: [node.id, node.left.id],
            message: `O filho esquerdo <strong>${node.left.key}</strong> é MENOR que o pai <strong>${node.key}</strong>.`,
            explanation: `Em um Min-Heap, todo nó pai deve ser menor ou igual a seus filhos ($pai \\le filhos$). Aqui temos $${node.key} > ${node.left.key}$.`,
            fixHint: `Troque a posição (swap) entre o nó #${node.id} e seu filho #${node.left.id} (operacão Heapify).`
          });
        }
        if (node.right && node.right.key < node.key) {
          errors.push({
            rule: 'HEAP_ORDER_VIOLATION',
            title: 'Violação de Min-Heap: Filho < Pai',
            severity: 'error',
            nodeIds: [node.id, node.right.id],
            message: `O filho direito <strong>${node.right.key}</strong> é MENOR que o pai <strong>${node.key}</strong>.`,
            explanation: `Em um Min-Heap, todo nó pai deve ser menor ou igual a seus filhos ($pai \\le filhos$). Aqui temos $${node.key} > ${node.right.key}$.`,
            fixHint: `Troque a posição (swap) entre o nó #${node.id} e seu filho #${node.right.id} (operacão Heapify).`
          });
        }
      } else {
        // Max-heap
        if (node.left && node.left.key > node.key) {
          errors.push({
            rule: 'HEAP_ORDER_VIOLATION',
            title: 'Violação de Max-Heap: Filho > Pai',
            severity: 'error',
            nodeIds: [node.id, node.left.id],
            message: `O filho esquerdo <strong>${node.left.key}</strong> é MAIOR que o pai <strong>${node.key}</strong>.`,
            explanation: `Em um Max-Heap, todo nó pai deve ser maior ou igual a seus filhos ($pai \\ge filhos$). Aqui temos $${node.key} < ${node.left.key}$.`,
            fixHint: `Troque a posição (swap) entre o nó #${node.id} e seu filho #${node.left.id} (operacão Heapify).`
          });
        }
        if (node.right && node.right.key > node.key) {
          errors.push({
            rule: 'HEAP_ORDER_VIOLATION',
            title: 'Violação de Max-Heap: Filho > Pai',
            severity: 'error',
            nodeIds: [node.id, node.right.id],
            message: `O filho direito <strong>${node.right.key}</strong> é MAIOR que o pai <strong>${node.key}</strong>.`,
            explanation: `Em um Max-Heap, todo nó pai deve ser maior ou igual a seus filhos ($pai \\ge filhos$). Aqui temos $${node.key} < ${node.right.key}$.`,
            fixHint: `Troque a posição (swap) entre o nó #${node.id} e seu filho #${node.right.id} (operacão Heapify).`
          });
        }
      }

      // Check structural completeness (right child without left child)
      if (node.right && !node.left) {
        errors.push({
          rule: 'HEAP_SHAPE_HOLE',
          title: 'Violação de Árvore Quase-Completa',
          severity: 'error',
          nodeIds: [node.id, node.right.id],
          message: `O nó <strong>${node.key}</strong> possui filho direito mas não possui filho esquerdo.`,
          explanation: 'Um Heap binário deve ser uma árvore binária quase-completa preenchida estritamente da esquerda para a direita em todos os níveis.',
          fixHint: 'Mova o elemento do filho direito para a posição de filho esquerdo.'
        });
      }

      checkHeapOrder(node.left);
      checkHeapOrder(node.right);
    };
    checkHeapOrder(root);
  }

  getTargetName(type) {
    switch (type) {
      case 'bst': return 'Árvore Binária de Busca (BST)';
      case 'avl': return 'Árvore AVL';
      case 'rbtree': return 'Árvore Rubro-Negra';
      case 'minheap': return 'Min-Heap';
      case 'maxheap': return 'Max-Heap';
      default: return type;
    }
  }

  // =========================================================================
  // SCENE BUILDER FOR CANVAS
  // =========================================================================

  buildScene() {
    if (!this.root) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: 'Árvore vazia. Escolha um exercício no menu acima ou monte sua árvore inserindo nós.',
          x: 120,
          y: 220,
          font: '15px "Inter", sans-serif',
          color: '#64748b'
        }]
      };
    }

    const elements = [];
    const links = [];
    const decorations = [];

    // 1. Calculate horizontal positions via in-order numbering
    let xCounter = 1;
    const assignCoords = (node, depth) => {
      if (!node) return;
      if (node.left) assignCoords(node.left, depth + 1);

      node.gridX = xCounter++;
      node.gridY = depth;

      if (node.right) assignCoords(node.right, depth + 1);
    };
    assignCoords(this.root, 1);

    // Convert to pixel coordinates
    const spacingX = 64;
    const spacingY = 88;
    const startX = 180;
    const startY = 85;

    const toPixels = (node) => {
      if (!node) return;
      node.x = startX + node.gridX * spacingX;
      node.y = startY + node.gridY * spacingY;
      if (node.left) toPixels(node.left);
      if (node.right) toPixels(node.right);
    };
    toPixels(this.root);

    const isRedBlack = this.targetType === 'rbtree';
    const isAvl = this.targetType === 'avl';

    // 2. Collect Links and Elements
    const collectVisuals = (node) => {
      if (!node) return;

      // Left Link
      if (node.left) {
        links.push({
          x1: node.x, y1: node.y,
          x2: node.left.x, y2: node.left.y,
          r1: 22, r2: 22,
          color: (this.revealMode && node.left.hasError) ? '#ef4444' : '#64748b',
          highlighted: node.left.highlighted
        });
        collectVisuals(node.left);
      } else if (isRedBlack && this.showNilNodes) {
        const nilX = node.x - 28;
        const nilY = node.y + 55;
        links.push({ x1: node.x, y1: node.y, x2: nilX, y2: nilY, r1: 22, r2: 10, color: '#94a3b8' });
        elements.push({ type: 'nil', x: nilX, y: nilY, size: 20 });
      }

      // Right Link
      if (node.right) {
        links.push({
          x1: node.x, y1: node.y,
          x2: node.right.x, y2: node.right.y,
          r1: 22, r2: 22,
          color: (this.revealMode && node.right.hasError) ? '#ef4444' : '#64748b',
          highlighted: node.right.highlighted
        });
        collectVisuals(node.right);
      } else if (isRedBlack && this.showNilNodes) {
        const nilX = node.x + 28;
        const nilY = node.y + 55;
        links.push({ x1: node.x, y1: node.y, x2: nilX, y2: nilY, r1: 22, r2: 10, color: '#94a3b8' });
        elements.push({ type: 'nil', x: nilX, y: nilY, size: 20 });
      }

      // Determine Node Appearance
      let fill = '#ffffff';
      let stroke = '#64748b';
      let textColor = '#0f172a';
      let badge = undefined;
      let badgeColor = undefined;

      if (isRedBlack) {
        fill = node.color === 'RED' ? '#ef4444' : '#1e293b';
        textColor = '#ffffff';
        stroke = node.color === 'RED' ? '#b91c1c' : '#0f172a';
      }

      // Display Badges
      if (isAvl) {
        const sign = node.bf > 0 ? `+${node.bf}` : `${node.bf}`;
        badge = `FB: ${sign} | h: ${node.actualHeight}`;
        if (Math.abs(node.bf) > 1) {
          badgeColor = '#dc2626'; // Alert
        } else if (node.bf === 0) {
          badgeColor = '#059669'; // Balanced
        } else {
          badgeColor = '#0284c7';
        }
      }

      // If in Reveal Mode and this node has an error:
      if (this.revealMode && node.hasError) {
        stroke = '#dc2626';
        if (!isRedBlack) {
          fill = '#fee2e2'; // Light red background for normal nodes
          textColor = '#991b1b';
        }
        if (!badge) {
          badge = '⚠️ Violação';
          badgeColor = '#dc2626';
        } else if (Math.abs(node.bf) > 1) {
          badgeColor = '#dc2626';
        }
      }

      // Selected node highlight
      if (this.selectedNodeId === node.id) {
        stroke = '#3b82f6';
      }

      elements.push({
        type: 'circle',
        id: node.id,
        x: node.x,
        y: node.y,
        radius: 22,
        label: node.key,
        fill,
        stroke,
        textColor,
        highlighted: node.highlighted || (this.revealMode && node.hasError),
        badge,
        badgeColor,
        isUnbalanced: this.revealMode && (node.hasError || (isAvl && Math.abs(node.bf) > 1))
      });
    };

    collectVisuals(this.root);

    // Add Classroom Mode Banner Decoration if hidden
    if (!this.revealMode) {
      decorations.push({
        type: 'text',
        text: '🎓 Modo Aluno Ativo: Gabarito e diagnósticos de erro ocultos. Tente identificar os erros visualmente!',
        x: 180,
        y: 45,
        font: 'bold 13px "Inter", sans-serif',
        color: '#d97706'
      });
    }

    return { elements, links, decorations };
  }

  // =========================================================================
  // PRESET EXERCISES LIBRARY
  // =========================================================================

  loadPreset(presetId) {
    this.clear();

    switch (presetId) {
      // -------------------------------------------------------------------
      // 1. BST: Pegadinha Clássica de Prova (Ancestral Global)
      // -------------------------------------------------------------------
      case 'bst_ancestor_trap': {
        this.targetType = 'bst';
        // Root = 40
        const r = this.createNode(40);
        this.root = r;

        // Left child = 20 (valid)
        const n20 = this.createNode(20);
        n20.parent = r;
        r.left = n20;

        // Right child = 60 (valid)
        const n60 = this.createNode(60);
        n60.parent = r;
        r.right = n60;

        // Children of 20: 10 and 30 (valid)
        const n10 = this.createNode(10);
        n10.parent = n20;
        n20.left = n10;

        const n30 = this.createNode(30);
        n30.parent = n20;
        n20.right = n30;

        // THE TRAP: Left child of 60 is 35!
        // Locally, 35 < 60 (looks fine to novice students)
        // But globally, 35 < 40, yet it is in the right subtree of 40!
        const n35 = this.createNode(35);
        n35.parent = n60;
        n60.left = n35;

        // Right child of 60 is 80 (valid)
        const n80 = this.createNode(80);
        n80.parent = n60;
        n60.right = n80;
        break;
      }

      // -------------------------------------------------------------------
      // 2. BST: Erro Local Simples (Filho Esquerdo Maior que Pai)
      // -------------------------------------------------------------------
      case 'bst_local_err': {
        this.targetType = 'bst';
        const r = this.createNode(50);
        this.root = r;

        // Error: 55 as left child of 50!
        const n55 = this.createNode(55);
        n55.parent = r;
        r.left = n55;

        const n70 = this.createNode(70);
        n70.parent = r;
        r.right = n70;

        const n20 = this.createNode(20);
        n20.parent = n55;
        n55.left = n20;
        break;
      }

      // -------------------------------------------------------------------
      // 3. BST Válida (Caso de Controle)
      // -------------------------------------------------------------------
      case 'bst_valid': {
        this.targetType = 'bst';
        const r = this.createNode(50);
        this.root = r;

        const n30 = this.createNode(30);
        n30.parent = r;
        r.left = n30;

        const n70 = this.createNode(70);
        n70.parent = r;
        r.right = n70;

        const n20 = this.createNode(20);
        n20.parent = n30;
        n30.left = n20;

        const n40 = this.createNode(40);
        n40.parent = n30;
        n30.right = n40;

        const n60 = this.createNode(60);
        n60.parent = n70;
        n70.left = n60;

        const n80 = this.createNode(80);
        n80.parent = n70;
        n70.right = n80;
        break;
      }

      // -------------------------------------------------------------------
      // 4. AVL: Desbalanceamento LL (Rotação Simples à Direita)
      // -------------------------------------------------------------------
      case 'avl_unbalanced_ll': {
        this.targetType = 'avl';
        const r = this.createNode(50);
        this.root = r;

        const n30 = this.createNode(30);
        n30.parent = r;
        r.left = n30;

        const n20 = this.createNode(20);
        n20.parent = n30;
        n30.left = n20;

        const n10 = this.createNode(10);
        n10.parent = n20;
        n20.left = n10;

        const n60 = this.createNode(60);
        n60.parent = r;
        r.right = n60;
        break;
      }

      // -------------------------------------------------------------------
      // 5. AVL: Desbalanceamento LR (Rotação Dupla Esquerda-Direita)
      // -------------------------------------------------------------------
      case 'avl_unbalanced_lr': {
        this.targetType = 'avl';
        const r = this.createNode(60);
        this.root = r;

        const n20 = this.createNode(20);
        n20.parent = r;
        r.left = n20;

        const n40 = this.createNode(40);
        n40.parent = n20;
        n20.right = n40;

        const n30 = this.createNode(30);
        n30.parent = n40;
        n40.left = n30;

        const n80 = this.createNode(80);
        n80.parent = r;
        r.right = n80;
        break;
      }

      // -------------------------------------------------------------------
      // 6. AVL Válida (Caso de Controle)
      // -------------------------------------------------------------------
      case 'avl_valid': {
        this.targetType = 'avl';
        const r = this.createNode(40);
        this.root = r;

        const n20 = this.createNode(20);
        n20.parent = r;
        r.left = n20;

        const n60 = this.createNode(60);
        n60.parent = r;
        r.right = n60;

        const n10 = this.createNode(10);
        n10.parent = n20;
        n20.left = n10;

        const n30 = this.createNode(30);
        n30.parent = n20;
        n20.right = n30;

        const n50 = this.createNode(50);
        n50.parent = n60;
        n60.left = n50;

        const n70 = this.createNode(70);
        n70.parent = n60;
        n60.right = n70;
        break;
      }

      // -------------------------------------------------------------------
      // 7. Rubro-Negra: Raiz Vermelha (Violação Regra 2)
      // -------------------------------------------------------------------
      case 'rb_red_root': {
        this.targetType = 'rbtree';
        // Root is RED (violation!)
        const r = this.createNode(30, 'RED');
        this.root = r;

        const n20 = this.createNode(20, 'BLACK');
        n20.parent = r;
        r.left = n20;

        const n40 = this.createNode(40, 'BLACK');
        n40.parent = r;
        r.right = n40;
        break;
      }

      // -------------------------------------------------------------------
      // 8. Rubro-Negra: Conflito Vermelho-Vermelho (Violação Regra 4)
      // -------------------------------------------------------------------
      case 'rb_red_red': {
        this.targetType = 'rbtree';
        const r = this.createNode(50, 'BLACK');
        this.root = r;

        // Node 30 is RED
        const n30 = this.createNode(30, 'RED');
        n30.parent = r;
        r.left = n30;

        // Its child 20 is ALSO RED (violation!)
        const n20 = this.createNode(20, 'RED');
        n20.parent = n30;
        n30.left = n20;

        const n70 = this.createNode(70, 'BLACK');
        n70.parent = r;
        r.right = n70;
        break;
      }

      // -------------------------------------------------------------------
      // 9. Rubro-Negra: Altura-Preta Desigual (Violação Regra 5)
      // -------------------------------------------------------------------
      case 'rb_black_height': {
        this.targetType = 'rbtree';
        const r = this.createNode(50, 'BLACK');
        this.root = r;

        // Left branch has TWO black nodes (50 -> 30 -> 20)
        const n30 = this.createNode(30, 'BLACK');
        n30.parent = r;
        r.left = n30;

        const n20 = this.createNode(20, 'BLACK');
        n20.parent = n30;
        n30.left = n20;

        // Right branch has only ONE black node (50 -> 70(RED))
        const n70 = this.createNode(70, 'RED');
        n70.parent = r;
        r.right = n70;
        break;
      }

      // -------------------------------------------------------------------
      // 10. Rubro-Negra Válida (Caso de Controle)
      // -------------------------------------------------------------------
      case 'rb_valid': {
        this.targetType = 'rbtree';
        const r = this.createNode(30, 'BLACK');
        this.root = r;

        const n20 = this.createNode(20, 'BLACK');
        n20.parent = r;
        r.left = n20;

        const n50 = this.createNode(50, 'BLACK');
        n50.parent = r;
        r.right = n50;

        const n40 = this.createNode(40, 'RED');
        n40.parent = n50;
        n50.left = n40;

        const n60 = this.createNode(60, 'RED');
        n60.parent = n50;
        n50.right = n60;
        break;
      }

      // -------------------------------------------------------------------
      // 11. Min-Heap: Inversão de Prioridade (Filho < Pai)
      // -------------------------------------------------------------------
      case 'heap_min_err': {
        this.targetType = 'minheap';
        const r = this.createNode(25);
        this.root = r;

        const n40 = this.createNode(40);
        n40.parent = r;
        r.left = n40;

        const n30 = this.createNode(30);
        n30.parent = r;
        r.right = n30;

        // Inversion: 15 as child of 40 (15 < 40 and 15 < 25!)
        const n15 = this.createNode(15);
        n15.parent = n40;
        n40.left = n15;

        const n50 = this.createNode(50);
        n50.parent = n40;
        n40.right = n50;
        break;
      }

      // -------------------------------------------------------------------
      // 12. Min-Heap: Buraco de Estrutura Quase-Completa
      // -------------------------------------------------------------------
      case 'heap_shape_err': {
        this.targetType = 'minheap';
        const r = this.createNode(10);
        this.root = r;

        // Right child exists without left child!
        const n20 = this.createNode(20);
        n20.parent = r;
        r.right = n20;

        const n30 = this.createNode(30);
        n30.parent = n20;
        n20.left = n30;
        break;
      }

      default:
        break;
    }

    this.audit();
    return this.root;
  }
}
