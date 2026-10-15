/**
 * Data Structures & Algorithms Visualizer v2.0.0
 * Animator & State-Timeline Engine with Bidirectional Step & Speed Control
 */

export class Animator {
  constructor(canvas) {
    this.canvas = canvas;
    this.frames = [];
    this.currentFrame = -1;
    this.isPlaying = false;
    this.timer = null;
    this.speed = 400; // ms per step
    this.status = 'ready'; // 'ready', 'running', 'paused', 'completed'

    // Callbacks
    this.onFrameChange = null;
    this.onStatusChange = null;
  }

  setSpeed(ms) {
    this.speed = Math.max(50, Math.min(2000, ms));
    if (this.isPlaying) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.tick(), this.speed);
    }
  }

  setTimeline(frames, autoPlay = true) {
    this.stop();
    this.frames = frames || [];
    this.currentFrame = -1;

    if (this.frames.length > 0) {
      this.goToFrame(0);
      if (autoPlay) {
        this.play();
      } else {
        this.setStatus('ready');
      }
    } else {
      this.canvas.clearScene();
      this.setStatus('ready');
    }
  }

  addFrame(frame) {
    this.frames.push(frame);
    if (this.currentFrame === -1) {
      this.goToFrame(0);
    }
  }

  play() {
    if (this.frames.length === 0) return;
    if (this.currentFrame >= this.frames.length - 1) {
      // Replay from start if finished
      this.currentFrame = 0;
    }
    this.isPlaying = true;
    this.setStatus('running');
    clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), this.speed);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.timer);
    this.timer = null;
    this.setStatus('paused');
  }

  stop() {
    this.pause();
    this.currentFrame = -1;
    this.setStatus('ready');
  }

  tick() {
    if (this.currentFrame < this.frames.length - 1) {
      this.goToFrame(this.currentFrame + 1);
    } else {
      this.pause();
      this.setStatus('completed');
    }
  }

  stepForward() {
    this.pause();
    if (this.currentFrame < this.frames.length - 1) {
      this.goToFrame(this.currentFrame + 1);
    }
    if (this.currentFrame >= this.frames.length - 1) {
      this.setStatus('completed');
    }
  }

  stepBackward() {
    this.pause();
    if (this.currentFrame > 0) {
      this.goToFrame(this.currentFrame - 1);
      this.setStatus('paused');
    }
  }

  skipToEnd() {
    this.pause();
    if (this.frames.length > 0) {
      this.goToFrame(this.frames.length - 1);
      this.setStatus('completed');
    }
  }

  reset() {
    this.pause();
    if (this.frames.length > 0) {
      this.goToFrame(0);
      this.setStatus('ready');
    }
  }

  goToFrame(index) {
    if (index < 0 || index >= this.frames.length) return;
    this.currentFrame = index;
    const frame = this.frames[index];

    // Render snapshot on canvas
    this.canvas.setScene(frame.elements, frame.links, frame.decorations);

    // Auto-fit to bounds on initial frame or if explicitly requested
    if (frame.fitBounds) {
      this.autoFit(frame.elements);
    }

    if (this.onFrameChange) {
      this.onFrameChange({
        frameIndex: index,
        totalFrames: this.frames.length,
        message: frame.message || '',
        comparisons: frame.comparisons || 0,
        swaps: frame.swaps || 0,
        highlightLine: frame.highlightLine
      });
    }
  }

  autoFit(elements) {
    if (!elements || elements.length === 0) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const elem of elements) {
      const x = elem.x ?? 0;
      const y = elem.y ?? 0;
      const w = elem.w ?? elem.radius ?? 30;
      const h = elem.h ?? elem.radius ?? 30;
      minX = Math.min(minX, x - w);
      minY = Math.min(minY, y - h);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);
    }
    if (minX !== Infinity) {
      this.canvas.fitToBounds(minX, minY, maxX, maxY);
    }
  }

  setStatus(newStatus) {
    this.status = newStatus;
    if (this.onStatusChange) {
      this.onStatusChange(newStatus);
    }
  }
}
