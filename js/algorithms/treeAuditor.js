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
    this.targetType = 'bst'; // 'bst' | 'avl' | 'rbtree' | 'btree' | 'linkedlist' | 'graphs' | 'minheap' | 'maxheap'
    this.revealMode = true; // true: show errors / diagnosis; false: classroom student mode (hidden)
    this.bfConvention = 'leftMinusRight'; // 'leftMinusRight' | 'rightMinusLeft'
    this.showNilNodes = true;
    this.selectedNodeId = null;
    this.nextId = 1;
    this.cachedAuditResult = { isValid: true, errors: [], warnings: [], stats: {} };

    // Specialized data models for multi-structure auditing
    this.btreeData = null;
    this.linkedListData = null;
    this.graphData = null;

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
    this.btreeData = null;
    this.linkedListData = null;
    this.graphData = null;
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

    if (!this.root && !this.btreeData && !this.linkedListData && !this.graphData) {
      this.cachedAuditResult = {
        isValid: true,
        errors: [],
        warnings: [],
        stats: { nodeCount: 0, height: 0 },
        summary: 'Estrutura vazia. Nenhuma violação detectada.'
      };
      return this.cachedAuditResult;
    }

    const errors = [];
    const warnings = [];

    // Calculate basic heights (if binary tree root exists)
    if (this.root) {
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
    }

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

    // -------------------------------------------------------------
    // 5. AUDIT: ÁRVORE-B INVARIANTS
    // -------------------------------------------------------------
    if (type === 'btree' && this.btreeData) {
      this.auditBTree(errors, warnings);
    }

    // -------------------------------------------------------------
    // 6. AUDIT: LISTAS ENCADEADAS (LINKED LIST) INVARIANTS
    // -------------------------------------------------------------
    if (type === 'linkedlist' && this.linkedListData) {
      this.auditLinkedList(errors, warnings);
    }

    // -------------------------------------------------------------
    // 7. AUDIT: GRAFOS (ALGORITMOS & INVARIANTES)
    // -------------------------------------------------------------
    if (type === 'graphs' && this.graphData) {
      this.auditGraph(errors, warnings);
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
        height: this.root ? this.root.actualHeight : 0
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
        message: `O nó <strong>${node.key}</strong> está desbalanceado com Fator de Balanceamento <strong>FB = ${bf > 0 ? '+' + bf : bf}</strong> (|FB| &ge; 2).`,
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


  // =========================================================================
  // B-TREE AUDIT ENGINE
  // =========================================================================

  auditBTree(errors, warnings) {
    if (!this.btreeData || !this.btreeData.root) return;
    const order = this.btreeData.order || 3;
    const minKeys = Math.ceil(order / 2) - 1;
    const maxKeys = order - 1;
    const leafDepths = [];

    const traverse = (node, minBound, maxBound, depth, isRoot) => {
      if (!node) return;
      node.hasError = false;
      node.errorMsg = null;

      // 1. Invariant: Keys sorted within node
      for (let i = 0; i < node.keys.length - 1; i++) {
        if (node.keys[i] >= node.keys[i + 1]) {
          node.hasError = true;
          errors.push({
            rule: "Ordem Interna das Chaves",
            nodeIds: [node.id],
            title: `Chaves fora de ordem no Nó #${node.id}`,
            message: `No nó #${node.id}, a chave ${node.keys[i]} é &ge; ${node.keys[i + 1]}.`,
            explanation: "Em uma Árvore-B, as chaves em qualquer nó devem estar estritamente em ordem crescente (K₁ < K₂ < ... < Kₙ).",
            fixHint: "Ordene as chaves do nó em ordem estritamente crescente."
          });
        }
      }

      // 2. Invariant: Max capacity (Overflow without split)
      if (node.keys.length > maxKeys) {
        node.hasError = true;
        errors.push({
          rule: `Capacidade Máxima (Overflow, Ordem M=${order})`,
          nodeIds: [node.id],
          title: `Overflow de Chaves no Nó #${node.id}`,
          message: `O nó possui ${node.keys.length} chaves, excedendo a capacidade máxima de ${maxKeys} chaves para ordem M=${order}.`,
          explanation: `Em uma Árvore-B de ordem M=${order}, cada nó suporta no máximo M - 1 = ${maxKeys} chaves. Ao exceder esse limite, deve-se realizar a cisão (split) promovendo a chave mediana para o nó pai.`,
          fixHint: "Execute a cisão (split) do nó, promovendo a mediana para o pai e dividindo as chaves restantes em dois novos nós."
        });
      }

      // 3. Invariant: Min capacity (Underflow without borrow/merge)
      if (!isRoot && node.keys.length < minKeys) {
        node.hasError = true;
        errors.push({
          rule: `Ocupação Mínima (Underflow, Ordem M=${order})`,
          nodeIds: [node.id],
          title: `Underflow de Chaves no Nó #${node.id}`,
          message: `O nó não-raiz possui apenas ${node.keys.length} chave(s), abaixo da ocupação mínima de ⌈M/2⌉ - 1 = ${minKeys} chave(s).`,
          explanation: "Todo nó não-raiz em uma Árvore-B deve satisfazer o requisito de ocupação mínima para garantir eficiência em operações de disco e altura logarítmica.",
          fixHint: "Faça um empréstimo (rotação) de chave com irmão adjacente ou funda (merge) este nó com seu irmão e a chave separadora do pai."
        });
      }

      // 4. Invariant: Subtree keys within parent range boundaries
      for (const k of node.keys) {
        if (k <= minBound || k >= maxBound) {
          node.hasError = true;
          errors.push({
            rule: "Propriedade de Busca Multiway",
            nodeIds: [node.id],
            title: `Chave ${k} Fora do Intervalo Permitido`,
            message: `A chave ${k} no nó #${node.id} viola o intervalo delimitador (${minBound === -Infinity ? '-∞' : minBound}, ${maxBound === Infinity ? '+∞' : maxBound}) definido pelo nó ancestral.`,
            explanation: "As chaves em uma subárvore filha devem residir estritamente entre as duas chaves delimitadoras do nó pai que enquadram o ponteiro filho correspondente.",
            fixHint: "Mova a chave para a subárvore delimitadora correta ou reajuste as chaves delimitadoras do nó pai."
          });
        }
      }

      // 5. Check leaf depth uniformness
      if (node.isLeaf || !node.children || node.children.length === 0) {
        leafDepths.push({ nodeId: node.id, depth });
      } else {
        // Recurse children with bounded intervals
        for (let i = 0; i < node.children.length; i++) {
          const childMin = (i === 0) ? minBound : node.keys[i - 1];
          const childMax = (i < node.keys.length) ? node.keys[i] : maxBound;
          traverse(node.children[i], childMin, childMax, depth + 1, false);
        }
      }
    };

    traverse(this.btreeData.root, -Infinity, Infinity, 0, true);

    // Uniform Leaf Depth Check
    if (leafDepths.length > 1) {
      const firstDepth = leafDepths[0].depth;
      const unequal = leafDepths.filter(l => l.depth !== firstDepth);
      if (unequal.length > 0) {
        for (const u of unequal) {
          const n = this.findBTreeNode(this.btreeData.root, u.nodeId);
          if (n) n.hasError = true;
        }
        errors.push({
          rule: "Altura Perfeita (Folhas Uniformes)",
          nodeIds: leafDepths.map(l => l.nodeId),
          title: "Violação da Altura Uniforme das Folhas",
          message: `Folhas encontradas em profundidades desiguais (níveis ${[...new Set(leafDepths.map(l => l.depth))].join(' e ')}).`,
          explanation: "Uma das propriedades fundamentais e definidoras da Árvore-B é que todas as folhas residem rigorosamente na mesma profundidade. Cisões devem propagar até a raiz quando necessário.",
          fixHint: "Balanceie a árvore de baixo para cima propagando cisões ou reorganizando fusões até que todas as folhas fiquem no mesmo nível."
        });
      }
    }
  }

  findBTreeNode(node, id) {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children) {
      for (const c of node.children) {
        const found = this.findBTreeNode(c, id);
        if (found) return found;
      }
    }
    return null;
  }

  // =========================================================================
  // LINKED LIST AUDIT ENGINE
  // =========================================================================

  auditLinkedList(errors, warnings) {
    if (!this.linkedListData || !this.linkedListData.nodes || this.linkedListData.nodes.length === 0) return;
    const nodes = this.linkedListData.nodes;
    const isDoubly = this.linkedListData.type === 'doubly';
    const headId = this.linkedListData.head;

    // 1. Detect accidental cycles in singly list
    const visited = new Set();
    let currId = headId;
    let cycleFound = false;

    while (currId !== null && currId !== undefined) {
      const node = nodes.find(n => n.id === currId);
      if (!node) {
        // Dangling pointer
        errors.push({
          rule: "Integridade de Referência de Memória",
          nodeIds: [visited.size > 0 ? Array.from(visited).pop() : 1],
          title: "Ponteiro Órfão / Inválido Detectado",
          message: `Referência para nó inexistente (#${currId}) encontrada na lista.`,
          explanation: "Ponteiros próximos (next) devem apontar para nós válidos alocados ou para NULL.",
          fixHint: "Ajuste o ponteiro para o nó de destino correto ou para NULL."
        });
        break;
      }

      if (visited.has(currId)) {
        cycleFound = true;
        node.hasError = true;
        errors.push({
          rule: "Linearidade / Ausência de Ciclo Não-Intencional",
          nodeIds: [node.id],
          title: "Ciclo Acidental Detectado na Lista Simples",
          message: `O nó #${node.id} (valor: ${node.val}) aponta de volta para nó anterior, formando um ciclo infinito.`,
          explanation: "Em uma Lista Encadeada Linear Simples terminada em NULL, a presença de um ciclo acidental causa travamento permanente de algoritmos de percurso como 'while (curr != NULL)'.",
          fixHint: "Aponte o ponteiro next do último nó para NULL para finalizar a lista encadeada."
        });
        break;
      }

      visited.add(currId);
      currId = node.next;
    }

    // 2. Doubly Linked List: Inconsistency check between prev and next
    if (isDoubly) {
      nodes.forEach(node => {
        if (node.next !== null && node.next !== undefined) {
          const nextNode = nodes.find(n => n.id === node.next);
          if (nextNode && nextNode.prev !== node.id) {
            node.hasError = true;
            nextNode.hasError = true;
            errors.push({
              rule: "Consistência Bidirecional (prev <-> next)",
              nodeIds: [node.id, nextNode.id],
              title: "Inconsistência de Ponteiro Anterior (prev != next)",
              message: `O nó #${node.id} aponta via 'next' para #${nextNode.id}, mas #${nextNode.id}.prev aponta para #${nextNode.prev === null ? 'NULL' : nextNode.prev} (deveria apontar para #${node.id}).`,
              explanation: "Em uma Lista Duplamente Encadeada, os ponteiros devem ser estritamente recíprocos: se A.next == B, então B.prev deve obrigatoriamente ser igual a A.",
              fixHint: `Ajuste #${nextNode.id}.prev = #${node.id} para restaurar a consistência bidirecional da lista.`
            });
          }
        }
      });
    }

    // 3. Unreachable orphan nodes
    const unreachable = nodes.filter(n => !visited.has(n.id));
    if (unreachable.length > 0 && !cycleFound) {
      warnings.push({
        rule: "Acessibilidade a Partir da Cabeça (Head)",
        nodeIds: unreachable.map(n => n.id),
        title: "Nós Desconectados / Órfãos",
        message: `Os nós ${unreachable.map(n => '#' + n.id).join(', ')} não são alcançáveis a partir da cabeça da lista.`,
        explanation: "Nós desvinculados do ponteiro head representam vazamento de memória ou perda de referência estrutural.",
        fixHint: "Conecte os nós órfãos à sequência da lista ou remova-os."
      });
    }
  }

  // =========================================================================
  // GRAPH AUDIT ENGINE
  // =========================================================================

  auditGraph(errors, warnings) {
    if (!this.graphData || !this.graphData.vertices || this.graphData.vertices.length === 0) return;
    const { vertices, edges, directed } = this.graphData;

    // Reset error markers
    edges.forEach(e => { e.hasError = false; });
    vertices.forEach(v => { v.hasError = false; });

    // 1. Dijkstra Invariant: No negative edge weights
    const negEdges = edges.filter(e => e.weight !== null && e.weight !== undefined && e.weight < 0);
    if (negEdges.length > 0) {
      negEdges.forEach(e => {
        e.hasError = true;
        const u = vertices.find(v => v.id === e.u);
        const v = vertices.find(v => v.id === e.v);
        if (u) u.hasError = true;
        if (v) v.hasError = true;
        errors.push({
          rule: "Condição de Corretude do Algoritmo de Dijkstra",
          nodeIds: [e.u, e.v],
          title: "Aresta com Peso Negativo Detectada",
          message: `Aresta (${u ? u.label : e.u} ➔ ${v ? v.label : e.v}) possui peso negativo (${e.weight}).`,
          explanation: "O Algoritmo de Dijkstra adota uma abordagem gulosa que assume pesos estritamente não-negativos (peso >= 0). Pesos negativos podem fazer com que distâncias já fixadas sejam recalculadas incorretamente. Para pesos negativos, deve-se usar o Algoritmo de Bellman-Ford.",
          fixHint: "Substitua o peso negativo por um valor positivo (>= 0) ou utilize o Algoritmo de Bellman-Ford."
        });
      });
    }

    // 2. DAG Invariant: Directed Cycle Detection (breaking Topological Sort)
    if (directed) {
      const color = new Map(); // 0: White (unvisited), 1: Gray (visiting), 2: Black (finished)
      vertices.forEach(v => color.set(v.id, 0));
      const parent = new Map();
      let cyclePath = null;

      const dfs = (u) => {
        color.set(u, 1);
        const neighbors = edges.filter(e => e.u === u).map(e => e.v);
        for (const v of neighbors) {
          if (color.get(v) === 1) {
            // Back edge found (cycle!)
            cyclePath = [v, u];
            return true;
          }
          if (color.get(v) === 0) {
            parent.set(v, u);
            if (dfs(v)) return true;
          }
        }
        color.set(u, 2);
        return false;
      };

      for (const v of vertices) {
        if (color.get(v.id) === 0) {
          if (dfs(v.id)) break;
        }
      }

      if (cyclePath) {
        cyclePath.forEach(id => {
          const v = vertices.find(node => node.id === id);
          if (v) v.hasError = true;
        });
        errors.push({
          rule: "Aciclicidade de Grafo Direcionado (DAG)",
          nodeIds: cyclePath,
          title: "Ciclo Direcionado Detectado (Ordenação Topológica Impossível)",
          message: `O grafo possui um ciclo direcionado envolvendo os vértices ${cyclePath.map(id => {
            const v = vertices.find(node => node.id === id);
            return v ? v.label : id;
          }).join(' ➔ ')}.`,
          explanation: "A Ordenação Topológica só é matematicamente definida para Grafos Acíclicos Direcionados (DAGs). Havendo qualquer dependência circular, não existe uma ordenação linear válida dos vértices.",
          fixHint: "Remova a aresta de retorno para eliminar a dependência circular no grafo."
        });
      }
    }

    // 3. Connectivity check: Disconnected components
    if (vertices.length > 0) {
      const visited = new Set();
      const queue = [vertices[0].id];
      visited.add(vertices[0].id);

      while (queue.length > 0) {
        const u = queue.shift();
        edges.forEach(e => {
          if (e.u === u && !visited.has(e.v)) {
            visited.add(e.v);
            queue.push(e.v);
          } else if (!directed && e.v === u && !visited.has(e.u)) {
            visited.add(e.u);
            queue.push(e.u);
          }
        });
      }

      const unvisited = vertices.filter(v => !visited.has(v.id));
      if (unvisited.length > 0) {
        unvisited.forEach(v => { v.hasError = true; });
        errors.push({
          rule: "Conectividade do Grafo",
          nodeIds: unvisited.map(v => v.id),
          title: "Grafo Desconexo / Componentes Isoladas",
          message: `Vértices isolados detectados: ${unvisited.map(v => v.label).join(', ')} não são alcançáveis a partir de ${vertices[0].label}.`,
          explanation: "Algoritmos de busca em grafos (como BFS ou Dijkstra padrão com única origem) não visitam componentes desconexas, deixando vértices inalcançáveis.",
          fixHint: "Adicione arestas de conexão entre as componentes ou itere sobre todos os vértices não visitados na busca."
        });
      }
    }
  }

  // =========================================================================
  // SCENE BUILDERS FOR SPECIALIZED DATA MODELS
  // =========================================================================

  buildBTreeScene() {
    if (!this.btreeData || !this.btreeData.root) return { elements: [], links: [], decorations: [] };
    const elements = [];
    const links = [];
    const decorations = [];
    const root = this.btreeData.root;
    const cellW = 36;
    const cellH = 32;
    const spacingX = 22;
    const levelSpacingY = 90;

    const measure = (node) => {
      if (!node) return 0;
      node.width = Math.max(node.keys.length * cellW, cellW);
      if (!node.children || node.children.length === 0) {
        node.subtreeWidth = node.width + spacingX;
        return node.subtreeWidth;
      }
      let sum = 0;
      for (const c of node.children) sum += measure(c);
      node.subtreeWidth = Math.max(node.width + spacingX, sum);
      return node.subtreeWidth;
    };
    measure(root);

    const assignPos = (node, leftX, depth) => {
      if (!node) return;
      node.y = 80 + depth * levelSpacingY;
      node.x = leftX + (node.subtreeWidth - node.width) / 2;
      if (node.children && node.children.length > 0) {
        let curX = leftX;
        for (const c of node.children) {
          assignPos(c, curX, depth + 1);
          curX += c.subtreeWidth;
        }
      }
    };
    assignPos(root, 100, 0);

    const collect = (node) => {
      if (!node) return;
      const numKeys = node.keys.length;

      for (let i = 0; i < numKeys; i++) {
        const cellX = node.x + i * cellW;
        const cellY = node.y;

        let fill = '#ffffff';
        let stroke = '#64748b';
        let textColor = '#0f172a';

        if (this.revealMode && node.hasError) {
          fill = '#fee2e2';
          stroke = '#ef4444';
          textColor = '#991b1b';
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
          highlighted: this.revealMode && node.hasError
        });
      }

      if (node.children && node.children.length > 0) {
        const numPointers = node.children.length;
        for (let i = 0; i < numPointers; i++) {
          const child = node.children[i];
          if (!child) continue;

          let ptrX;
          if (i === 0) ptrX = node.x;
          else if (i === numPointers - 1) ptrX = node.x + numKeys * cellW;
          else ptrX = node.x + i * cellW;
          const ptrY = node.y + cellH;

          const childMidX = child.x + (child.keys.length * cellW) / 2;
          const childMidY = child.y;

          links.push({
            x1: ptrX,
            y1: ptrY,
            x2: childMidX,
            y2: childMidY,
            color: (this.revealMode && child.hasError) ? '#ef4444' : '#64748b',
            width: (this.revealMode && child.hasError) ? 2.5 : 1.8
          });

          elements.push({
            type: 'circle',
            x: ptrX,
            y: ptrY,
            radius: 3,
            fill: '#64748b',
            stroke: '#64748b'
          });

          collect(child);
        }
      }
    };
    collect(root);

    const order = this.btreeData.order || 3;
    decorations.push({
      type: 'text',
      text: `Auditoria de Árvore-B (Ordem M=${order}) | Capacidade permitida: [${Math.ceil(order/2)-1} ... ${order-1}] chaves por nó`,
      x: 140,
      y: 40,
      font: 'bold 13px "Inter", sans-serif',
      color: '#0284c7'
    });

    return { elements, links, decorations };
  }

  buildLinkedListScene() {
    if (!this.linkedListData || !this.linkedListData.nodes) return { elements: [], links: [], decorations: [] };
    const elements = [];
    const links = [];
    const decorations = [];
    const nodes = this.linkedListData.nodes;
    const isDoubly = this.linkedListData.type === 'doubly';

    const cellW = isDoubly ? 90 : 70;
    const cellH = 44;
    const startX = 140;
    const startY = 200;
    const spacingX = 60;

    nodes.forEach((n, idx) => {
      n.x = startX + idx * (cellW + spacingX);
      n.y = startY;

      let fill = '#ffffff';
      let stroke = '#64748b';
      let textColor = '#0f172a';

      if (this.revealMode && n.hasError) {
        fill = '#fee2e2';
        stroke = '#ef4444';
        textColor = '#991b1b';
      }

      // Draw cell body
      elements.push({
        type: 'rect',
        x: n.x,
        y: n.y,
        w: cellW,
        h: cellH,
        label: n.val,
        fill,
        stroke,
        textColor,
        highlighted: this.revealMode && n.hasError
      });

      // Pointer links
      if (n.next !== null && n.next !== undefined) {
        const targetNode = nodes.find(m => m.id === n.next);
        if (targetNode) {
          const targetIdx = nodes.indexOf(targetNode);
          const isBackward = targetIdx <= idx;
          const x1 = n.x + cellW;
          const y1 = n.y + cellH / 2;

          if (isBackward) {
            // Loop back arc above nodes
            const x2 = targetNode.x + cellW / 2;
            const y2 = targetNode.y;
            links.push({
              x1, y1,
              x2, y2,
              curved: true,
              directed: true,
              color: '#ef4444',
              width: 2.5
            });
          } else {
            // Forward straight arrow
            const x2 = targetNode.x;
            const y2 = targetNode.y + cellH / 2;
            links.push({
              x1, y1,
              x2, y2,
              directed: true,
              color: (this.revealMode && n.hasError) ? '#ef4444' : '#64748b',
              width: 2
            });
          }
        }
      } else {
        // NULL ground symbol
        links.push({
          x1: n.x + cellW,
          y1: n.y + cellH / 2,
          x2: n.x + cellW + 28,
          y2: n.y + cellH / 2,
          color: '#64748b',
          width: 1.8
        });
        decorations.push({
          type: 'text',
          text: '⏚ NULL',
          x: n.x + cellW + 32,
          y: n.y + cellH / 2 + 4,
          font: 'bold 12px "Inter", sans-serif',
          color: '#64748b'
        });
      }

      // If doubly linked list, draw prev arrow
      if (isDoubly && n.prev !== null && n.prev !== undefined) {
        const prevNode = nodes.find(m => m.id === n.prev);
        if (prevNode) {
          const x1 = n.x;
          const y1 = n.y + cellH / 2 + 10;
          const x2 = prevNode.x + cellW;
          const y2 = prevNode.y + cellH / 2 + 10;
          links.push({
            x1, y1,
            x2, y2,
            directed: true,
            color: (this.revealMode && n.hasError) ? '#ef4444' : '#38bdf8',
            width: 1.8
          });
        }
      }
    });

    decorations.push({
      type: 'text',
      text: `Auditoria de ${isDoubly ? 'Lista Duplamente Encadeada' : 'Lista Simplesmente Encadeada'} | Invariantes de Ponteiros e Continuidade`,
      x: 140,
      y: 50,
      font: 'bold 13px "Inter", sans-serif',
      color: '#0284c7'
    });

    return { elements, links, decorations };
  }

  buildGraphScene() {
    if (!this.graphData || !this.graphData.vertices) return { elements: [], links: [], decorations: [] };
    const elements = [];
    const links = [];
    const decorations = [];
    const { vertices, edges, directed } = this.graphData;

    // Draw Edges
    edges.forEach(e => {
      const u = vertices.find(v => v.id === e.u);
      const v = vertices.find(v => v.id === e.v);
      if (!u || !v) return;

      const isLoop = (e.u === e.v);
      const isErr = this.revealMode && e.hasError;

      links.push({
        x1: u.x, y1: u.y,
        x2: v.x, y2: v.y,
        r1: 22, r2: 22,
        isSelfLoop: isLoop,
        directed: directed || e.directed,
        weight: e.weight !== undefined ? e.weight : null,
        color: isErr ? '#ef4444' : '#64748b',
        width: isErr ? 3.5 : 2,
        highlighted: isErr
      });
    });

    // Draw Vertices
    vertices.forEach(v => {
      let fill = '#ffffff';
      let stroke = '#64748b';
      let textColor = '#0f172a';

      if (this.revealMode && v.hasError) {
        fill = '#fee2e2';
        stroke = '#ef4444';
        textColor = '#991b1b';
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
        highlighted: this.revealMode && v.hasError
      });
    });

    decorations.push({
      type: 'text',
      text: `Auditoria de Grafo | Invariantes de Algoritmos (Dijkstra, Ciclos DAG e Conectividade)`,
      x: 140,
      y: 45,
      font: 'bold 13px "Inter", sans-serif',
      color: '#0284c7'
    });

    return { elements, links, decorations };
  }

  getTargetName(type) {
    switch (type) {
      case 'bst': return 'Árvore Binária de Busca (BST)';
      case 'avl': return 'Árvore AVL';
      case 'rbtree': return 'Árvore Rubro-Negra';
      case 'btree': return 'Árvore-B';
      case 'linkedlist': return 'Lista Encadeada';
      case 'graphs': return 'Grafo (Algoritmos & Invariantes)';
      case 'minheap': return 'Min-Heap';
      case 'maxheap': return 'Max-Heap';
      default: return type;
    }
  }

  // =========================================================================
  // SCENE BUILDER FOR CANVAS
  // =========================================================================

  buildScene() {
    if (this.targetType === 'btree' && this.btreeData) {
      return this.buildBTreeScene();
    }
    if (this.targetType === 'linkedlist' && this.linkedListData) {
      return this.buildLinkedListScene();
    }
    if (this.targetType === 'graphs' && this.graphData) {
      return this.buildGraphScene();
    }

    if (!this.root) {
      return {
        elements: [],
        links: [],
        decorations: [{
          type: 'text',
          text: 'Estrutura vazia. Escolha um exercício no menu acima ou monte a árvore inserindo nós.',
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


      // -------------------------------------------------------------------
      // 13. Árvore-B: Overflow de Chaves sem Cisão (M=3)
      // -------------------------------------------------------------------
      case 'btree_overflow': {
        this.clear();
        this.targetType = 'btree';
        // Order 3 (max 2 keys allowed). Root has 3 keys (20, 40, 60) without split!
        this.btreeData = {
          order: 3,
          root: {
            id: 1,
            keys: [20, 40, 60],
            isLeaf: false,
            children: [
              { id: 2, keys: [10], isLeaf: true, children: [] },
              { id: 3, keys: [30], isLeaf: true, children: [] },
              { id: 4, keys: [50], isLeaf: true, children: [] },
              { id: 5, keys: [70], isLeaf: true, children: [] }
            ]
          }
        };
        break;
      }

      // -------------------------------------------------------------------
      // 14. Árvore-B: Violação de Intervalo em Subárvore Filha
      // -------------------------------------------------------------------
      case 'btree_range_err': {
        this.clear();
        this.targetType = 'btree';
        // Middle child between 20 and 50 contains 60 (> 50)!
        this.btreeData = {
          order: 3,
          root: {
            id: 1,
            keys: [20, 50],
            isLeaf: false,
            children: [
              { id: 2, keys: [10], isLeaf: true, children: [] },
              { id: 3, keys: [30, 60], isLeaf: true, children: [] },
              { id: 4, keys: [70], isLeaf: true, children: [] }
            ]
          }
        };
        break;
      }

      // -------------------------------------------------------------------
      // 15. Árvore-B: Violação de Altura Uniforme das Folhas
      // -------------------------------------------------------------------
      case 'btree_depth_err': {
        this.clear();
        this.targetType = 'btree';
        // Left branch has depth 2, right leaf is at depth 1!
        this.btreeData = {
          order: 3,
          root: {
            id: 1,
            keys: [40],
            isLeaf: false,
            children: [
              {
                id: 2,
                keys: [20],
                isLeaf: false,
                children: [
                  { id: 4, keys: [10], isLeaf: true, children: [] },
                  { id: 5, keys: [30], isLeaf: true, children: [] }
                ]
              },
              { id: 3, keys: [60], isLeaf: true, children: [] }
            ]
          }
        };
        break;
      }

      // -------------------------------------------------------------------
      // 16. Árvore-B: Underflow de Nó (Menos Chaves que o Mínimo)
      // -------------------------------------------------------------------
      case 'btree_underflow': {
        this.clear();
        this.targetType = 'btree';
        // Order 3 (min keys = 1 for non-root). Child 3 is empty (0 keys)!
        this.btreeData = {
          order: 3,
          root: {
            id: 1,
            keys: [40],
            isLeaf: false,
            children: [
              { id: 2, keys: [20], isLeaf: true, children: [] },
              { id: 3, keys: [], isLeaf: true, children: [] }
            ]
          }
        };
        break;
      }

      // -------------------------------------------------------------------
      // 17. Árvore-B Válida e Balanceada
      // -------------------------------------------------------------------
      case 'btree_valid': {
        this.clear();
        this.targetType = 'btree';
        this.btreeData = {
          order: 3,
          root: {
            id: 1,
            keys: [30],
            isLeaf: false,
            children: [
              { id: 2, keys: [10, 20], isLeaf: true, children: [] },
              { id: 3, keys: [40, 50], isLeaf: true, children: [] }
            ]
          }
        };
        break;
      }

      // -------------------------------------------------------------------
      // 18. Lista Simples: Ciclo Acidental Não-Intencional
      // -------------------------------------------------------------------
      case 'll_cycle_err': {
        this.clear();
        this.targetType = 'linkedlist';
        this.linkedListData = {
          type: 'singly',
          head: 1,
          nodes: [
            { id: 1, val: 10, next: 2, prev: null },
            { id: 2, val: 20, next: 3, prev: null },
            { id: 3, val: 30, next: 4, prev: null },
            { id: 4, val: 40, next: 2, prev: null }, // Cycle back to #2!
            { id: 5, val: 50, next: null, prev: null } // Orphan
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 19. Lista Dupla: Inconsistência de Ponteiro Anterior (prev != next)
      // -------------------------------------------------------------------
      case 'll_inconsistent_prev': {
        this.clear();
        this.targetType = 'linkedlist';
        this.linkedListData = {
          type: 'doubly',
          head: 1,
          nodes: [
            { id: 1, val: 10, next: 2, prev: null },
            { id: 2, val: 20, next: 3, prev: 1 },
            { id: 3, val: 30, next: 4, prev: 1 }, // Error: points back to 1 instead of 2!
            { id: 4, val: 40, next: null, prev: 3 }
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 20. Lista Simples: Ponteiro Órfão / Inválido
      // -------------------------------------------------------------------
      case 'll_dangling_tail': {
        this.clear();
        this.targetType = 'linkedlist';
        this.linkedListData = {
          type: 'singly',
          head: 1,
          nodes: [
            { id: 1, val: 15, next: 2, prev: null },
            { id: 2, val: 25, next: 99, prev: null } // Node #99 does not exist!
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 21. Lista Simples Válida (Terminada em NULL)
      // -------------------------------------------------------------------
      case 'll_valid_singly': {
        this.clear();
        this.targetType = 'linkedlist';
        this.linkedListData = {
          type: 'singly',
          head: 1,
          nodes: [
            { id: 1, val: 10, next: 2, prev: null },
            { id: 2, val: 20, next: 3, prev: null },
            { id: 3, val: 30, next: 4, prev: null },
            { id: 4, val: 40, next: null, prev: null }
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 22. Lista Duplamente Encadeada Válida
      // -------------------------------------------------------------------
      case 'll_valid_doubly': {
        this.clear();
        this.targetType = 'linkedlist';
        this.linkedListData = {
          type: 'doubly',
          head: 1,
          nodes: [
            { id: 1, val: 10, next: 2, prev: null },
            { id: 2, val: 20, next: 3, prev: 1 },
            { id: 3, val: 30, next: 4, prev: 2 },
            { id: 4, val: 40, next: null, prev: 3 }
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 23. Grafo: Aresta com Peso Negativo (Falha no Dijkstra)
      // -------------------------------------------------------------------
      case 'graph_dijkstra_neg': {
        this.clear();
        this.targetType = 'graphs';
        this.graphData = {
          directed: true,
          vertices: [
            { id: 0, label: 'A', x: 180, y: 160 },
            { id: 1, label: 'B', x: 340, y: 120 },
            { id: 2, label: 'C', x: 260, y: 260 },
            { id: 3, label: 'D', x: 440, y: 220 }
          ],
          edges: [
            { u: 0, v: 1, weight: 4 },
            { u: 0, v: 2, weight: 2 },
            { u: 1, v: 3, weight: 5 },
            { u: 2, v: 1, weight: -5 }, // Negative weight! Dijkstra breaks here
            { u: 2, v: 3, weight: 8 }
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 24. Grafo: Ciclo Direcionado que Impede Ordenação Topológica
      // -------------------------------------------------------------------
      case 'graph_dag_cycle': {
        this.clear();
        this.targetType = 'graphs';
        this.graphData = {
          directed: true,
          vertices: [
            { id: 0, label: 'A', x: 160, y: 180 },
            { id: 1, label: 'B', x: 280, y: 120 },
            { id: 2, label: 'C', x: 400, y: 120 },
            { id: 3, label: 'D', x: 340, y: 250 },
            { id: 4, label: 'E', x: 480, y: 200 }
          ],
          edges: [
            { u: 0, v: 1, weight: null },
            { u: 1, v: 2, weight: null },
            { u: 2, v: 3, weight: null },
            { u: 3, v: 1, weight: null }, // Cycle B -> C -> D -> B!
            { u: 3, v: 4, weight: null }
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 25. Grafo: Componentes Desconexas (Vértice Isolado)
      // -------------------------------------------------------------------
      case 'graph_disconnected': {
        this.clear();
        this.targetType = 'graphs';
        this.graphData = {
          directed: false,
          vertices: [
            { id: 0, label: 'A', x: 180, y: 150 },
            { id: 1, label: 'B', x: 280, y: 120 },
            { id: 2, label: 'C', x: 230, y: 240 },
            { id: 3, label: 'D', x: 420, y: 140 },
            { id: 4, label: 'E', x: 460, y: 250 }
          ],
          edges: [
            { u: 0, v: 1, weight: null },
            { u: 1, v: 2, weight: null },
            { u: 3, v: 4, weight: null } // Component D-E completely disconnected from A-B-C!
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 26. Grafo: DAG Válido para Ordenação Topológica
      // -------------------------------------------------------------------
      case 'graph_valid_dag': {
        this.clear();
        this.targetType = 'graphs';
        this.graphData = {
          directed: true,
          vertices: [
            { id: 0, label: 'A', x: 160, y: 180 },
            { id: 1, label: 'B', x: 280, y: 120 },
            { id: 2, label: 'C', x: 280, y: 250 },
            { id: 3, label: 'D', x: 420, y: 180 }
          ],
          edges: [
            { u: 0, v: 1, weight: null },
            { u: 0, v: 2, weight: null },
            { u: 1, v: 3, weight: null },
            { u: 2, v: 3, weight: null }
          ]
        };
        break;
      }

      // -------------------------------------------------------------------
      // 27. Grafo: Ponderado Válido para Dijkstra
      // -------------------------------------------------------------------
      case 'graph_valid_weighted': {
        this.clear();
        this.targetType = 'graphs';
        this.graphData = {
          directed: true,
          vertices: [
            { id: 0, label: 'A', x: 160, y: 180 },
            { id: 1, label: 'B', x: 280, y: 120 },
            { id: 2, label: 'C', x: 280, y: 250 },
            { id: 3, label: 'D', x: 420, y: 180 }
          ],
          edges: [
            { u: 0, v: 1, weight: 4 },
            { u: 0, v: 2, weight: 2 },
            { u: 1, v: 3, weight: 3 },
            { u: 2, v: 3, weight: 6 }
          ]
        };
        break;
      }

      default:
        break;
    }

    this.audit();
    return this.root;
  }
}
