/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Main Application Controller & UI Coordinator
 */

import { I18N } from './i18n.js';
import { VisualizerCanvas } from './core/canvas.js';
import { Animator } from './core/animator.js';
import { TreeAlgorithms } from './algorithms/trees.js';
import { ArrayAlgorithms } from './algorithms/arrays.js';
import { SortingAlgorithms } from './algorithms/sorting.js';
import { GraphAlgorithms } from './algorithms/graphs.js';
import { OtherAlgorithms } from './algorithms/others.js';
import { TreeAuditor } from './algorithms/treeAuditor.js';
import { BTreeAlgorithms } from './algorithms/btree.js';

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
    this.treeAuditor = new TreeAuditor();
    this.btree = new BTreeAlgorithms(3);
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

    // Format violation badges [VIOLAÇÃO...] or [ERRO...]
    formatted = formatted.replace(/\[(VIOLAÇÃO|ERRO|PEGADINHA)[^\]]*\]/gi, (match) => {
      return `<span class="badge-tag-violation">${match}</span>`;
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
    const auditorTab = document.querySelector('.drawer-tab[data-tab="auditor"]');
    if (auditorTab && t.tabs.auditor) auditorTab.textContent = t.tabs.auditor;

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

    if (category === 'exercises') {
      this.activeDrawerTab = 'auditor';
      document.querySelectorAll('.drawer-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === 'auditor');
      });
    }

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

    } else if (this.currentCategory === 'btree') {
      toolbar.innerHTML = `
        <div class="input-group">
          <input type="number" id="inputBtreeVal" class="input-custom" placeholder="Valor" style="width:75px;" />
          <button id="btnBtreeInsert" class="btn-primary">${t.controls.insert}</button>
          <button id="btnBtreeDelete" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">${t.controls.delete}</button>
          <button id="btnBtreeSearch" class="btn-secondary">${t.controls.search}</button>
          <button id="btnBtreeRandom" class="btn-secondary">${t.controls.randomValue}</button>
          <button id="btnBtreeBulk" class="btn-secondary">${t.controls.randomSet}</button>
          <button id="btnClearBtree" class="btn-secondary">${t.controls.clear}</button>
        </div>
        <div class="input-group">
          <label style="font-size:0.8rem; font-weight:600;">Ordem (M):</label>
          <select id="selectBtreeOrder" class="select-custom">
            <option value="3" ${this.btree.order === 3 ? 'selected' : ''}>M=3 (Árvore 2-3 | 1 a 2 chaves)</option>
            <option value="4" ${this.btree.order === 4 ? 'selected' : ''}>M=4 (Árvore 2-3-4 | 1 a 3 chaves)</option>
            <option value="5" ${this.btree.order === 5 ? 'selected' : ''}>M=5 (Ordem 5 | 2 a 4 chaves)</option>
          </select>
        </div>
      `;

      document.getElementById('btnBtreeInsert').addEventListener('click', () => {
        const val = document.getElementById('inputBtreeVal').value;
        if (val !== '') {
          const frames = this.btree.generateBTreeInsertFrames(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputBtreeVal').value = '';
        }
      });

      document.getElementById('btnBtreeDelete').addEventListener('click', () => {
        const val = document.getElementById('inputBtreeVal').value;
        if (val !== '') {
          const frames = this.btree.generateBTreeDeleteFrames(val);
          this.animator.setTimeline(frames);
          document.getElementById('inputBtreeVal').value = '';
        }
      });

      document.getElementById('btnBtreeSearch').addEventListener('click', () => {
        const val = document.getElementById('inputBtreeVal').value;
        if (val !== '') {
          const frames = this.btree.generateBTreeSearchFrames(val);
          this.animator.setTimeline(frames);
        }
      });

      document.getElementById('btnBtreeRandom').addEventListener('click', () => {
        document.getElementById('inputBtreeVal').value = Math.floor(Math.random() * 90) + 10;
      });

      document.getElementById('btnBtreeBulk').addEventListener('click', () => {
        this.btree.clear();
        const values = [20, 40, 10, 30, 50, 60, 25, 35, 70, 80];
        let allFrames = [];
        for (const v of values) {
          allFrames = allFrames.concat(this.btree.generateBTreeInsertFrames(v));
        }
        this.animator.setTimeline(allFrames);
      });

      document.getElementById('btnClearBtree').addEventListener('click', () => {
        this.animator.stop();
        this.btree.clear();
        const scene = this.btree.layoutTree(this.btree.root);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      });

      document.getElementById('selectBtreeOrder').addEventListener('change', (e) => {
        this.btree.setOrder(e.target.value);
        const scene = this.btree.layoutTree(this.btree.root);
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        this.renderToolbar();
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
    } else if (this.currentCategory === 'exercises') {
      const allNodes = this.treeAuditor.getAllNodes();
      const parentOptions = allNodes.map(n => `<option value="${n.id}">Nó #${n.id} (valor: ${n.key})</option>`).join('');
      const removeOptions = allNodes.map(n => `<option value="${n.id}">Nó #${n.id} (valor: ${n.key})</option>`).join('');

      toolbar.innerHTML = `
        <div class="input-group">
          <label style="font-size:0.8rem; font-weight:600;">Tipo de Invariante:</label>
          <select id="selectAuditorType" class="select-custom">
            <option value="bst" ${this.treeAuditor.targetType === 'bst' ? 'selected' : ''}>🌲 ABB (Busca Binária)</option>
            <option value="avl" ${this.treeAuditor.targetType === 'avl' ? 'selected' : ''}>⚖️ Árvore AVL</option>
            <option value="rbtree" ${this.treeAuditor.targetType === 'rbtree' ? 'selected' : ''}>🔴⚫ Árvore Rubro-Negra</option>
            <option value="minheap" ${this.treeAuditor.targetType === 'minheap' ? 'selected' : ''}>⛰️ Min-Heap</option>
            <option value="maxheap" ${this.treeAuditor.targetType === 'maxheap' ? 'selected' : ''}>🏔️ Max-Heap</option>
          </select>
        </div>

        <div class="input-group">
          <label style="font-size:0.8rem; font-weight:600;">Exercícios / Pegadinhas:</label>
          <select id="selectPreset" class="select-custom" style="max-width:240px;">
            <optgroup label="Árvore Binária de Busca (ABB)">
              <option value="bst_ancestor_trap">Pegadinha: Violação de Ancestral Global</option>
              <option value="bst_local_err">Erro Local: Filho Esquerdo &ge; Pai</option>
              <option value="bst_valid">ABB Válida (Sem Erro)</option>
            </optgroup>
            <optgroup label="Árvore AVL">
              <option value="avl_unbalanced_ll">Desbalanceamento AVL: Caso LL (Rotação Dir)</option>
              <option value="avl_unbalanced_lr">Desbalanceamento AVL: Caso LR (Rotação Dupla)</option>
              <option value="avl_valid">AVL Válida Equilibrada</option>
            </optgroup>
            <optgroup label="Árvore Rubro-Negra">
              <option value="rb_red_root">Regra 2: Raiz Vermelha</option>
              <option value="rb_red_red">Regra 4: Vermelho-Vermelho Consecutivo</option>
              <option value="rb_black_height">Regra 5: Altura-Preta Desigual (bh)</option>
              <option value="rb_valid">Rubro-Negra 100% Válida</option>
            </optgroup>
            <optgroup label="Heaps Binários">
              <option value="heap_min_err">Min-Heap: Inversão Filho &lt; Pai</option>
              <option value="heap_shape_err">Violação de Árvore Quase-Completa</option>
            </optgroup>
          </select>
          <button id="btnLoadPreset" class="btn-secondary">Carregar</button>
        </div>

        <div class="input-group">
          <input type="number" id="inputNodeVal" class="input-custom" placeholder="Valor" style="width:75px;" />
          <select id="selectParentNode" class="select-custom" style="max-width:140px;">
            <option value="root_new">Definir como Raiz</option>
            ${parentOptions}
          </select>
          <select id="selectPosition" class="select-custom">
            <option value="left">Filho Esq</option>
            <option value="right">Filho Dir</option>
          </select>
          ${this.treeAuditor.targetType === 'rbtree' ? `
            <select id="selectNodeColor" class="select-custom">
              <option value="RED">🔴 Vermelho</option>
              <option value="BLACK">⚫ Preto</option>
            </select>
          ` : ''}
          <button id="btnInsertFree" class="btn-primary">➕ Inserir</button>
        </div>

        <div class="input-group">
          ${allNodes.length > 0 ? `
            <select id="selectDeleteNode" class="select-custom" style="max-width:140px;">
              ${removeOptions}
            </select>
            <button id="btnDeleteFree" class="btn-secondary" style="border-color:#ef4444; color:#ef4444;">🗑️ Remover</button>
            ${this.treeAuditor.targetType === 'rbtree' ? `
              <button id="btnToggleColorFree" class="btn-secondary">🎨 Inverter Cor</button>
            ` : ''}
          ` : ''}
          <button id="btnClearFree" class="btn-secondary">🧹 Limpar</button>
        </div>

        <div class="input-group">
          <button id="btnToggleReveal" class="btn-secondary" style="font-weight:600; border-color:${this.treeAuditor.revealMode ? '#0284c7' : '#d97706'}; color:${this.treeAuditor.revealMode ? '#0284c7' : '#d97706'};">
            ${this.treeAuditor.revealMode ? '👁️ Gabarito: Revelado' : '🙈 Gabarito: Oculto (Modo Aluno)'}
          </button>
          <button id="btnAuditNow" class="btn-primary" style="background:#059669; border-color:#059669;">🔍 Auditar</button>
        </div>
      `;

      // Helper to refresh everything
      const refreshAll = () => {
        this.treeAuditor.audit();
        const scene = this.treeAuditor.buildScene();
        this.canvas.setScene(scene.elements, scene.links, scene.decorations);
        this.updateStatusDisplay(this.treeAuditor.cachedAuditResult.summary);
        this.renderToolbar();
        this.renderDrawerContent();
      };

      document.getElementById('selectAuditorType').addEventListener('change', (e) => {
        this.treeAuditor.targetType = e.target.value;
        refreshAll();
      });

      document.getElementById('btnLoadPreset').addEventListener('click', () => {
        const val = document.getElementById('selectPreset').value;
        this.treeAuditor.loadPreset(val);
        refreshAll();
      });

      document.getElementById('btnInsertFree').addEventListener('click', () => {
        const key = document.getElementById('inputNodeVal').value;
        if (key === '') return;
        const parentId = document.getElementById('selectParentNode').value;
        const position = document.getElementById('selectPosition').value;
        const colorEl = document.getElementById('selectNodeColor');
        const color = colorEl ? colorEl.value : 'BLACK';

        this.treeAuditor.insertFreeNode(key, parentId === 'root_new' ? null : parentId, position, color);
        refreshAll();
      });

      const btnDelete = document.getElementById('btnDeleteFree');
      if (btnDelete) {
        btnDelete.addEventListener('click', () => {
          const id = document.getElementById('selectDeleteNode').value;
          this.treeAuditor.removeNode(id);
          refreshAll();
        });
      }

      const btnToggleColor = document.getElementById('btnToggleColorFree');
      if (btnToggleColor) {
        btnToggleColor.addEventListener('click', () => {
          const id = document.getElementById('selectDeleteNode').value;
          this.treeAuditor.toggleNodeColor(id);
          refreshAll();
        });
      }

      document.getElementById('btnClearFree').addEventListener('click', () => {
        this.treeAuditor.clear();
        refreshAll();
      });

      document.getElementById('btnToggleReveal').addEventListener('click', () => {
        this.treeAuditor.revealMode = !this.treeAuditor.revealMode;
        refreshAll();
      });

      document.getElementById('btnAuditNow').addEventListener('click', () => {
        this.activeDrawerTab = 'auditor';
        document.querySelectorAll('.drawer-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.tab === 'auditor');
        });
        const drawer = document.getElementById('explanationDrawer');
        if (drawer.classList.contains('collapsed')) {
          drawer.classList.remove('collapsed');
          this.drawerOpen = true;
          setTimeout(() => this.canvas.initCanvasSize(), 260);
        }
        refreshAll();
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
    } else if (this.currentCategory === 'btree') {
      const scene = this.btree.layoutTree(this.btree.root);
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
    } else if (this.currentCategory === 'exercises') {
      const scene = this.treeAuditor.buildScene();
      this.canvas.setScene(scene.elements, scene.links, scene.decorations);
      this.updateStatusDisplay(this.treeAuditor.cachedAuditResult.summary);
    }
    this.canvas.resetZoom();
  }

  renderDrawerContent() {
    const t = I18N[this.currentLang] || I18N['pt-BR'];
    let infoKey = 'avl';

    if (this.currentCategory === 'rbtree') infoKey = 'rbtree';
    else if (this.currentCategory === 'avl') infoKey = 'avl';
    else if (this.currentCategory === 'btree') infoKey = 'btree';
    else if (this.currentCategory === 'exercises') infoKey = 'exercises';
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

    if (this.activeDrawerTab === 'auditor') {
      const res = this.treeAuditor.cachedAuditResult;
      if (!this.treeAuditor.revealMode) {
        container.innerHTML = `
          <div class="audit-status-banner hidden">
            <span>🙈 Modo Aluno Ativado (Gabarito Oculto)</span>
          </div>
          <div class="audit-classroom-box">
            <h4 style="margin-bottom:0.8rem;">🎓 Desafio para a Turma</h4>
            <p style="margin-bottom:1.2rem; color:var(--text-secondary); line-height:1.5;">
              A árvore desenhada na tela contém propriedades e invariantes a serem inspecionadas pelos alunos.
              <br><br>
              Peça para a turma analisar a árvore, verificar as relações pai-filho e caminhos para folhas, e responder: 
              <strong>Qual é o erro presente nesta estrutura?</strong>
            </p>
            <button id="btnRevealInDrawer" class="btn-primary" style="padding:0.6rem 1.25rem; font-size:0.9rem;">
              👁️ Revelar Diagnóstico Oficial
            </button>
          </div>
        `;
        const btnReveal = document.getElementById('btnRevealInDrawer');
        if (btnReveal) {
          btnReveal.addEventListener('click', () => {
            this.treeAuditor.revealMode = true;
            this.loadInitialScene();
            this.renderToolbar();
            this.renderDrawerContent();
          });
        }
        return;
      }

      let errorsHtml = '';
      if (res.errors.length === 0) {
        errorsHtml = `
          <div class="audit-card success">
            <div class="audit-card-header">
              <span class="audit-rule-tag tag-success">100% VÁLIDO</span>
            </div>
            <div class="audit-card-title">✅ Nenhuma Violação Detectada</div>
            <div class="audit-card-msg">A estrutura atual satisfaz com perfeição todas as propriedades e invariantes da <strong>${this.treeAuditor.getTargetName(this.treeAuditor.targetType)}</strong>.</div>
          </div>
        `;
      } else {
        errorsHtml = res.errors.map((err, idx) => `
          <div class="audit-card">
            <div class="audit-card-header">
              <span class="audit-rule-tag">VIOLAÇÃO #${idx + 1}: ${err.rule}</span>
              <span style="font-size:0.75rem; color:#ef4444; font-weight:600;">Nós: ${err.nodeIds.map(id => '#' + id).join(', ')}</span>
            </div>
            <div class="audit-card-title">${err.title}</div>
            <div class="audit-card-msg">${err.message}</div>
            <div class="audit-card-explanation">${err.explanation}</div>
            <div class="audit-fix-box">💡 ${err.fixHint}</div>
          </div>
        `).join('');
      }

      container.innerHTML = `
        <div class="audit-status-banner ${res.isValid ? 'valid' : 'error'}">
          <span>${res.summary}</span>
        </div>
        <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.85rem; display:flex; justify-content:space-between;">
          <span>Alvo: <strong>${this.treeAuditor.getTargetName(this.treeAuditor.targetType)}</strong></span>
          <span>Nós: <strong>${res.stats.nodeCount}</strong> | Altura: <strong>${res.stats.height}</strong></span>
        </div>
        ${errorsHtml}
      `;
      return;
    }

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
