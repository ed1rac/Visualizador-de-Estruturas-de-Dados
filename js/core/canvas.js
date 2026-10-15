/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Core Canvas Engine with Infinite Zoom, Pan & Vector Rendering
 */

export class VisualizerCanvas {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);

    // Zoom & Pan transformation state
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.minScale = 0.2;
    this.maxScale = 4.0;

    // Drawing queue / scene elements
    this.elements = [];
    this.links = [];
    this.decorations = [];

    this.initCanvasSize();
    this.bindEvents();
    window.addEventListener('resize', () => this.initCanvasSize());
  }

  initCanvasSize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 800;
    this.height = rect.height || 600;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.render();
  }

  bindEvents() {
    // Mouse Drag to Pan
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.offsetX;
      this.dragStartY = e.clientY - this.offsetY;
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.offsetX = e.clientX - this.dragStartX;
      this.offsetY = e.clientY - this.dragStartY;
      this.render();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
      }
    });

    // Mouse Wheel to Zoom focused on cursor
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      const newScale = Math.min(Math.max(this.scale * zoomFactor, this.minScale), this.maxScale);

      // Adjust offset so zoom centers on mouse position
      this.offsetX = mouseX - (mouseX - this.offsetX) * (newScale / this.scale);
      this.offsetY = mouseY - (mouseY - this.offsetY) * (newScale / this.scale);
      this.scale = newScale;

      this.render();
      if (this.onZoomChange) this.onZoomChange(this.scale);
    }, { passive: false });

    // Touch support for mobile / tablets
    let touchStartDist = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX - this.offsetX;
        this.dragStartY = e.touches[0].clientY - this.offsetY;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && this.isDragging) {
        this.offsetX = e.touches[0].clientX - this.dragStartX;
        this.offsetY = e.touches[0].clientY - this.dragStartY;
        this.render();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / (touchStartDist || dist);
        this.scale = Math.min(Math.max(this.scale * factor, this.minScale), this.maxScale);
        touchStartDist = dist;
        this.render();
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  // Zoom control helpers
  zoomIn() {
    this.setZoom(this.scale * 1.25);
  }

  zoomOut() {
    this.setZoom(this.scale * 0.8);
  }

  resetZoom() {
    this.scale = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.render();
    if (this.onZoomChange) this.onZoomChange(this.scale);
  }

  setZoom(newScale) {
    const centerScreenX = this.width / 2;
    const centerScreenY = this.height / 2;
    const clampedScale = Math.min(Math.max(newScale, this.minScale), this.maxScale);

    this.offsetX = centerScreenX - (centerScreenX - this.offsetX) * (clampedScale / this.scale);
    this.offsetY = centerScreenY - (centerScreenY - this.offsetY) * (clampedScale / this.scale);
    this.scale = clampedScale;

    this.render();
    if (this.onZoomChange) this.onZoomChange(this.scale);
  }

  fitToBounds(minX, minY, maxX, maxY, padding = 60) {
    const contentW = maxX - minX || 100;
    const contentH = maxY - minY || 100;

    const scaleX = (this.width - padding * 2) / contentW;
    const scaleY = (this.height - padding * 2) / contentH;
    this.scale = Math.min(Math.max(Math.min(scaleX, scaleY), this.minScale), 1.6);

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    this.offsetX = (this.width / 2) - (midX * this.scale);
    this.offsetY = (this.height / 2) - (midY * this.scale);

    this.render();
    if (this.onZoomChange) this.onZoomChange(this.scale);
  }

  clearScene() {
    this.elements = [];
    this.links = [];
    this.decorations = [];
    this.render();
  }

  setScene(elements, links, decorations = []) {
    this.elements = elements || [];
    this.links = links || [];
    this.decorations = decorations || [];
    this.render();
  }

  render() {
    const ctx = this.ctx;
    const isDark = document.body.classList.contains('dark-theme');

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();

    ctx.save();
    // Apply pan and zoom
    ctx.translate(this.offsetX, this.offsetY);
    ctx.scale(this.scale, this.scale);

    // Draw subtle grid
    this.drawBackgroundGrid(ctx, isDark);

    // 1. Draw Links / Edges
    for (const link of this.links) {
      this.drawLink(ctx, link, isDark);
    }

    // 2. Draw Elements (Circles, Rectangles, Shapes)
    for (const elem of this.elements) {
      if (elem.type === 'circle') {
        this.drawCircle(ctx, elem, isDark);
      } else if (elem.type === 'rect') {
        this.drawRect(ctx, elem, isDark);
      } else if (elem.type === 'pointer') {
        this.drawPointer(ctx, elem, isDark);
      } else if (elem.type === 'nil') {
        this.drawNilNode(ctx, elem, isDark);
      }
    }

    // 3. Draw Extra Annotations / Badges
    for (const dec of this.decorations) {
      this.drawDecoration(ctx, dec, isDark);
    }

    ctx.restore();
  }

  drawBackgroundGrid(ctx, isDark) {
    const gridSpacing = 40;
    const startX = -this.offsetX / this.scale - 100;
    const startY = -this.offsetY / this.scale - 100;
    const endX = (this.width - this.offsetX) / this.scale + 100;
    const endY = (this.height - this.offsetY) / this.scale + 100;

    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1 / this.scale;

    ctx.beginPath();
    for (let x = Math.floor(startX / gridSpacing) * gridSpacing; x <= endX; x += gridSpacing) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }
    for (let y = Math.floor(startY / gridSpacing) * gridSpacing; y <= endY; y += gridSpacing) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }
    ctx.stroke();
  }

  drawCircle(ctx, node, isDark) {
    const radius = node.radius || 24;
    ctx.save();
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

    // Fill
    ctx.fillStyle = node.fill || (isDark ? '#2d3748' : '#ffffff');
    ctx.fill();

    // Border
    ctx.lineWidth = node.highlighted ? 3.5 : 2;
    ctx.strokeStyle = node.highlighted 
      ? '#f59e0b' 
      : (node.stroke || (isDark ? '#4a5568' : '#cbd5e1'));
    ctx.stroke();

    // Node label
    ctx.fillStyle = node.textColor || (isDark ? '#f8fafc' : '#0f172a');
    ctx.font = 'bold 14px "Inter", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(node.label ?? ''), node.x, node.y);

    // Height / Balance factor badge (For AVL and BST)
    if (node.badge !== undefined && node.badge !== null && String(node.badge).trim() !== '') {
      ctx.save();
      ctx.font = 'bold 11px "Inter", system-ui, -apple-system, sans-serif';
      const textMetrics = ctx.measureText(String(node.badge));
      const textW = textMetrics.width;
      const badgePaddingX = 14;
      const badgeW = Math.max(textW + badgePaddingX, 48);
      const badgeH = 20;
      const badgeY = node.y - radius - 12;

      // Subtle shadow for clean layering above background and links
      ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;

      // Badge Background
      ctx.fillStyle = node.badgeColor || (node.isUnbalanced ? '#dc2626' : (isDark ? '#0284c7' : '#0369a1'));
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(node.x - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 10);
      } else {
        ctx.rect(node.x - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
      }
      ctx.fill();

      // Clear shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Crisp subtle border
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.6)';
      ctx.stroke();

      // Badge Text (Always centered inside the measured background pill)
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(node.badge), node.x, badgeY);
      ctx.restore();
    }

    // Subtitle / Index label
    if (node.sublabel) {
      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '11px "Inter", sans-serif';
      ctx.fillText(node.sublabel, node.x, node.y + radius + 14);
    }

    ctx.restore();
  }

  drawNilNode(ctx, node, isDark) {
    const size = node.size || 22;
    ctx.save();
    ctx.fillStyle = '#0f172a'; // Black sentinel node
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.rect(node.x - size / 2, node.y - size / 2, size, size);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NIL', node.x, node.y);
    ctx.restore();
  }

  drawRect(ctx, rect, isDark) {
    ctx.save();
    const w = rect.w || 40;
    const h = rect.h || 40;
    const x = rect.x;
    const y = rect.y;

    ctx.beginPath();
    ctx.fillStyle = rect.fill || (isDark ? '#1e293b' : '#f8fafc');
    ctx.rect(x, y, w, h);
    ctx.fill();

    ctx.lineWidth = rect.highlighted ? 3 : 1.5;
    ctx.strokeStyle = rect.highlighted ? '#f59e0b' : (rect.stroke || (isDark ? '#475569' : '#cbd5e1'));
    ctx.stroke();

    // Value
    if (rect.label !== undefined) {
      ctx.fillStyle = rect.textColor || (isDark ? '#f8fafc' : '#0f172a');
      ctx.font = rect.font || 'bold 14px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(rect.label), x + w / 2, y + h / 2);
    }

    // Index or descriptor under cell
    if (rect.index !== undefined) {
      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '11px "Inter", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`[${rect.index}]`, x + w / 2, y + h + 14);
    }

    // Pointer / Arrow indicator (e.g. i, j, top, head, tail)
    if (rect.pointer) {
      ctx.fillStyle = rect.pointerColor || '#ef4444';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`↓ ${rect.pointer}`, x + w / 2, y - 10);
    }

    ctx.restore();
  }

  drawLink(ctx, link, isDark) {
    ctx.save();
    let x1 = link.x1;
    let y1 = link.y1;
    let x2 = link.x2;
    let y2 = link.y2;

    const r1 = link.r1 || 0;
    const r2 = link.r2 || 0;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);

    // If node radiuses are provided, clip the link to start and end cleanly at node perimeters
    if (dist > (r1 + r2) && (r1 > 0 || r2 > 0) && !link.curved) {
      const angle = Math.atan2(dy, dx);
      x1 = link.x1 + Math.cos(angle) * r1;
      y1 = link.y1 + Math.sin(angle) * r1;
      x2 = link.x2 - Math.cos(angle) * r2;
      y2 = link.y2 - Math.sin(angle) * r2;
    }

    ctx.lineWidth = link.highlighted ? 3 : (link.width || 1.8);
    ctx.strokeStyle = link.highlighted 
      ? '#f59e0b' 
      : (link.color || (isDark ? '#475569' : '#94a3b8'));

    ctx.beginPath();
    if (link.curved) {
      const midX = (x1 + x2) / 2 - (y2 - y1) * 0.2;
      const midY = (y1 + y2) / 2 + (x2 - x1) * 0.2;
      ctx.quadraticCurveTo(midX, midY, x2, y2);
    } else {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();

    // Directed Arrow Head
    if (link.directed) {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const headlen = 10;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    }

    // Edge Weight / Label
    if (link.weight !== undefined) {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(link.weight), midX + 8, midY - 8);
    }

    ctx.restore();
  }

  drawPointer(ctx, ptr, isDark) {
    ctx.save();
    ctx.strokeStyle = ptr.color || (isDark ? '#38bdf8' : '#0284c7');
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = 2;

    if (ptr.isNull) {
      // Ground / Null symbol
      ctx.beginPath();
      ctx.moveTo(ptr.x - 12, ptr.y);
      ctx.lineTo(ptr.x + 12, ptr.y);
      ctx.moveTo(ptr.x - 8, ptr.y + 4);
      ctx.lineTo(ptr.x + 8, ptr.y + 4);
      ctx.moveTo(ptr.x - 4, ptr.y + 8);
      ctx.lineTo(ptr.x + 4, ptr.y + 8);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(ptr.x1, ptr.y1);
      ctx.lineTo(ptr.x2, ptr.y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawDecoration(ctx, dec, isDark) {
    ctx.save();
    if (dec.type === 'text') {
      ctx.fillStyle = dec.color || (isDark ? '#e2e8f0' : '#1e293b');
      ctx.font = dec.font || '13px "Inter", sans-serif';
      ctx.textAlign = dec.align || 'left';
      ctx.fillText(dec.text, dec.x, dec.y);
    }
    ctx.restore();
  }
}
