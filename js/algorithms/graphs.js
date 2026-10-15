/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Graph Algorithms Module (BFS, DFS, Dijkstra, Prim, Kruskal, Topological, Connected Components)
 */

export class GraphAlgorithms {
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
