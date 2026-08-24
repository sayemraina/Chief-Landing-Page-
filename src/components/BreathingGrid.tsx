"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// --- Grid constants ---
const CELL_SIZE = 96;
const COS_30 = Math.cos(Math.PI / 6);
const SIN_30 = Math.sin(Math.PI / 6);

// Line appearance
const LINE_WIDTH = 0.6;
const BASE_ALPHA_UV = 0.17;
const BASE_ALPHA_Z = 0.035;
const Z_LINE_EVERY = 3;

// Edge fade
const FADE_INNER = 0.45;
const FADE_OUTER = 0.85;

// Pulse
const PULSE_INTERVAL = 5000;
const PULSE_SPEED = 300;
const PULSE_WIDTH = 120;
const PULSE_BRIGHT = 0.28;
const PULSE_DECAY = 1500;

// Building form constants
const FORM_BRIGHT = 0.32;        // brightened grid line alpha
const FORM_LINE_WIDTH = 1;       // form segments draw bolder than base grid
const FORM_GLOW_BLUR = 0;        // soft glow radius on form segments
const FORM_ASSEMBLE_MS = 2500;
const FORM_HOLD_MS = 4000;
const FORM_DISSOLVE_MS = 2000;
const FORM_PAUSE_MS = 1200;

// --- Building form definitions ---
// Each form defines which grid-aligned line segments should brighten.
// Coordinates are in grid units (u, v, z) relative to the form origin.
// phase: assembly order (0 = ground, higher = later)

interface BrightSegment {
  from: [number, number, number];
  to: [number, number, number];
  phase: number;
}

// Bounding-box metadata (in screen-space "per-cell" units, i.e. before
// multiplying by an actual cell size) used to compute an expansive, centered
// scale/origin per form. Derived automatically from the segment geometry via
// computeFormFrame — hand-estimating these numbers is error-prone (it's easy
// to forget the z-height's contribution to vertical extent), so they're
// always computed from the real vertex positions instead.
interface FormFrame {
  xSpan: number;
  ySpan: number;
  xMid: number;
  yMid: number;
}

interface BuildingForm {
  name: string;
  frame: FormFrame;
  segments: BrightSegment[];
}

function computeFormFrame(segments: BrightSegment[]): FormFrame {
  let xMin = Infinity, xMax = -Infinity;
  let yMin = Infinity, yMax = -Infinity;
  for (const seg of segments) {
    for (const [u, v, z] of [seg.from, seg.to]) {
      const xOff = (u - v) * COS_30 * 0.5;
      const yOff = -(u + v) * SIN_30 * 0.5 - z * 0.55;
      xMin = Math.min(xMin, xOff);
      xMax = Math.max(xMax, xOff);
      yMin = Math.min(yMin, yOff);
      yMax = Math.max(yMax, yOff);
    }
  }
  return {
    xSpan: xMax - xMin,
    ySpan: yMax - yMin,
    xMid: (xMin + xMax) / 2,
    yMid: (yMin + yMax) / 2,
  };
}

// ---------------------------------------------------------------
// INDUSTRIAL — Small-bay flex/light industrial
// Shallow-bay, multi-tenant, low clear height, repeated dock doors —
// the mid-market industrial product, not big-box distribution.
// ---------------------------------------------------------------
const industrialSegments: BrightSegment[] = [
    // Phase 0: Ground footprint
    { from: [0,0,0], to: [14,0,0], phase: 0 },
    { from: [14,0,0], to: [14,6,0], phase: 0 },
    { from: [14,6,0], to: [0,6,0], phase: 0 },
    { from: [0,6,0], to: [0,0,0], phase: 0 },

    // Phase 1: Corner verticals (high clear height)
    { from: [0,0,0], to: [0,0,4], phase: 1 },
    { from: [14,0,0], to: [14,0,4], phase: 1 },
    { from: [0,6,0], to: [0,6,4], phase: 1 },
    { from: [14,6,0], to: [14,6,4], phase: 1 },
    // Mid-wall verticals (structural bays)
    { from: [7,0,0], to: [7,0,4], phase: 1 },
    { from: [7,6,0], to: [7,6,4], phase: 1 },

    // Phase 2: Dock doors (front face, every 2u)
    { from: [2,0,0], to: [2,0,3], phase: 2 },
    { from: [4,0,0], to: [4,0,3], phase: 2 },
    { from: [6,0,0], to: [6,0,3], phase: 2 },
    { from: [8,0,0], to: [8,0,3], phase: 2 },
    { from: [10,0,0], to: [10,0,3], phase: 2 },
    { from: [12,0,0], to: [12,0,3], phase: 2 },
    // Dock lintel
    { from: [0,0,3], to: [14,0,3], phase: 2 },
    // Mezzanine line (interior, visible on front face)
    { from: [0,0,2], to: [14,0,2], phase: 2 },

    // Phase 3: Roof + parapet
    { from: [0,0,4], to: [14,0,4], phase: 3 },
    { from: [0,0,4], to: [0,6,4], phase: 3 },
    { from: [14,0,4], to: [14,6,4], phase: 3 },
    { from: [0,6,4], to: [14,6,4], phase: 3 },
    // Parapet ridge (slightly above roof)
    { from: [0,0,4.3], to: [14,0,4.3], phase: 3 },
    // Roof structure lines
    { from: [7,0,4], to: [7,6,4], phase: 3 },
];
const INDUSTRIAL: BuildingForm = { name: "Industrial", frame: computeFormFrame(industrialSegments), segments: industrialSegments };

// ---------------------------------------------------------------
// OFFICE — Modern low/mid-rise Class A suburban campus
// Flight-to-quality, but the mid-market version: heavy glazing and an
// amenity entrance, not a CBD trophy tower with setbacks and a penthouse.
// ---------------------------------------------------------------
const officeSegments: BrightSegment[] = [
    // Phase 0: Footprint (5-story mid-rise, wider than tall)
    { from: [0,0,0], to: [9,0,0], phase: 0 },
    { from: [9,0,0], to: [9,5,0], phase: 0 },
    { from: [9,5,0], to: [0,5,0], phase: 0 },
    { from: [0,5,0], to: [0,0,0], phase: 0 },

    // Phase 1: Corner + mid-mullion verticals to roof (z=5)
    { from: [0,0,0], to: [0,0,5], phase: 1 },
    { from: [9,0,0], to: [9,0,5], phase: 1 },
    { from: [0,5,0], to: [0,5,5], phase: 1 },
    { from: [9,5,0], to: [9,5,5], phase: 1 },
    { from: [3,0,0], to: [3,0,5], phase: 1 },
    { from: [6,0,0], to: [6,0,5], phase: 1 },

    // Phase 2: Floor plates — glass curtain wall banding (front + side face)
    { from: [0,0,1], to: [9,0,1], phase: 2 },
    { from: [0,0,2], to: [9,0,2], phase: 2 },
    { from: [0,0,3], to: [9,0,3], phase: 2 },
    { from: [0,0,4], to: [9,0,4], phase: 2 },
    { from: [0,0,1], to: [0,5,1], phase: 2 },
    { from: [0,0,2], to: [0,5,2], phase: 2 },
    { from: [0,0,3], to: [0,5,3], phase: 2 },
    { from: [0,0,4], to: [0,5,4], phase: 2 },

    // Phase 3: Roof + terrace parapet + ground-floor entrance canopy
    { from: [0,0,5], to: [9,0,5], phase: 3 },
    { from: [0,0,5], to: [0,5,5], phase: 3 },
    { from: [9,0,5], to: [9,5,5], phase: 3 },
    { from: [0,5,5], to: [9,5,5], phase: 3 },
    // Rooftop terrace parapet ridge
    { from: [0,0,5.3], to: [9,0,5.3], phase: 3 },
    // Entrance canopy (projects out from the facade)
    { from: [3,-1,0], to: [3,-1,1.2], phase: 3 },
    { from: [6,-1,0], to: [6,-1,1.2], phase: 3 },
    { from: [3,-1,1.2], to: [6,-1,1.2], phase: 3 },
    { from: [3,-1,1.2], to: [3,0,1.2], phase: 3 },
    { from: [6,-1,1.2], to: [6,0,1.2], phase: 3 },
];
const OFFICE: BuildingForm = { name: "Office", frame: computeFormFrame(officeSegments), segments: officeSegments };

// ---------------------------------------------------------------
// RETAIL — Neighborhood strip center
// Single-row, grocery/pharmacy-anchored, inline storefronts. The
// mid-market retail product, not a large-format lifestyle center.
// ---------------------------------------------------------------
const retailSegments: BrightSegment[] = [
    // Phase 0: Footprint (single row, anchor + inline shops)
    { from: [0,0,0], to: [16,0,0], phase: 0 },
    { from: [16,0,0], to: [16,3,0], phase: 0 },
    { from: [16,3,0], to: [0,3,0], phase: 0 },
    { from: [0,3,0], to: [0,0,0], phase: 0 },

    // Phase 1: Verticals — anchor/inline divider + storefront dividers
    { from: [0,0,0], to: [0,0,2], phase: 1 },
    { from: [16,0,0], to: [16,0,2], phase: 1 },
    { from: [0,3,0], to: [0,3,2], phase: 1 },
    { from: [16,3,0], to: [16,3,2], phase: 1 },
    { from: [6,0,0], to: [6,0,2], phase: 1 },
    { from: [8,0,0], to: [8,0,2], phase: 1 },
    { from: [10,0,0], to: [10,0,2], phase: 1 },
    { from: [12,0,0], to: [12,0,2], phase: 1 },
    { from: [14,0,0], to: [14,0,2], phase: 1 },

    // Phase 2: Storefront transom line
    { from: [0,0,1.2], to: [16,0,1.2], phase: 2 },

    // Phase 3: Roof + anchor parapet (anchor reads taller than inline row)
    { from: [0,0,2], to: [16,0,2], phase: 3 },
    { from: [0,0,2], to: [0,3,2], phase: 3 },
    { from: [16,0,2], to: [16,3,2], phase: 3 },
    { from: [0,3,2], to: [16,3,2], phase: 3 },
    { from: [0,0,2.4], to: [6,0,2.4], phase: 3 },
];
const RETAIL: BuildingForm = { name: "Retail", frame: computeFormFrame(retailSegments), segments: retailSegments };

// One garden-style walk-up volume: footprint, corner verticals + a stair/
// walkway marker, a floor division line, and a roof with a pitched ridge.
// Multifamily's 3 buildings share this exact structure at different
// coordinates, so it's generated rather than hand-duplicated 3x.
function gardenBuilding(u0: number, v0: number, w: number, d: number, roofZ: number, ridgeZ: number): BrightSegment[] {
  const u1 = u0 + w, v1 = v0 + d, midU = u0 + w / 2, floorZ = roofZ * 0.5;
  return [
    { from: [u0,v0,0], to: [u1,v0,0], phase: 0 },
    { from: [u1,v0,0], to: [u1,v1,0], phase: 0 },
    { from: [u1,v1,0], to: [u0,v1,0], phase: 0 },
    { from: [u0,v1,0], to: [u0,v0,0], phase: 0 },
    { from: [u0,v0,0], to: [u0,v0,roofZ], phase: 1 },
    { from: [u1,v0,0], to: [u1,v0,roofZ], phase: 1 },
    { from: [u0,v1,0], to: [u0,v1,roofZ], phase: 1 },
    { from: [u1,v1,0], to: [u1,v1,roofZ], phase: 1 },
    { from: [midU,v0,0], to: [midU,v0,roofZ], phase: 1 },
    { from: [u0,v0,floorZ], to: [u1,v0,floorZ], phase: 2 },
    { from: [u0,v0,floorZ], to: [u0,v1,floorZ], phase: 2 },
    { from: [u0,v0,roofZ], to: [u1,v0,roofZ], phase: 3 },
    { from: [u0,v0,roofZ], to: [u0,v1,roofZ], phase: 3 },
    { from: [u1,v0,roofZ], to: [u1,v1,roofZ], phase: 3 },
    { from: [u0,v1,roofZ], to: [u1,v1,roofZ], phase: 3 },
    { from: [midU,v0,ridgeZ], to: [midU,v1,ridgeZ], phase: 3 },
  ];
}

// ---------------------------------------------------------------
// MULTIFAMILY — Garden-style value-add apartments
// The classic mid-market multifamily product: repeated low-rise
// walk-up volumes around a shared courtyard, not a single tower.
// ---------------------------------------------------------------
const multifamilySegments: BrightSegment[] = [
  ...gardenBuilding(0, 0, 4, 2, 2.6, 2.9),
  ...gardenBuilding(6, 0, 4, 2, 2.6, 2.9),
  ...gardenBuilding(2, 5, 6, 2, 2.6, 2.9),
];
const MULTIFAMILY: BuildingForm = { name: "Multifamily", frame: computeFormFrame(multifamilySegments), segments: multifamilySegments };

const FORMS = [INDUSTRIAL, OFFICE, RETAIL, MULTIFAMILY];

// Expansive-scale composition: each form's cell size is solved from its own
// bounding box so it fills a large share of the viewport — width bleed
// allowance and height bleed allowance, whichever is tighter wins (prevents
// a tall form from overflowing so far it loses its recognizable silhouette).
const WIDTH_FRACTION = 1.1;
const HEIGHT_FRACTION = 1.3;

// --- Convert isometric (u,v,z) to screen (x,y) ---
function isoToScreen(
  u: number, v: number, z: number,
  originX: number, originY: number,
  cell: number = CELL_SIZE
): [number, number] {
  const x = originX + (u - v) * cell * COS_30 * 0.5;
  const y = originY - (u + v) * cell * SIN_30 * 0.5 - z * cell * 0.55;
  return [x, y];
}

// --- Solve per-form scale + origin so it fills an expansive share of the
// viewport, centered on the form's true bounding-box midpoint (not the
// arbitrary (0,0) grid point) ---
function getFormLayout(form: BuildingForm, w: number, h: number, cx: number, cy: number) {
  const f = form.frame;
  const cellByWidth = (w * WIDTH_FRACTION) / f.xSpan;
  const cellByHeight = (h * HEIGHT_FRACTION) / f.ySpan;
  const cell = Math.min(cellByWidth, cellByHeight);
  const originX = cx - f.xMid * cell;
  const originY = cy - f.yMid * cell;
  return { cell, originX, originY };
}

// --- Morph state ---
interface MorphState {
  formIndex: number;
  phase: "assemble" | "hold" | "dissolve" | "pause";
  startTime: number;
}

// --- Utilities ---
function fadeMask(x: number, y: number, cx: number, cy: number, diagonal: number): number {
  const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
  const inner = diagonal * FADE_INNER;
  const outer = diagonal * FADE_OUTER;
  if (dist <= inner) return 1;
  if (dist >= outer) return 0;
  const t = (dist - inner) / (outer - inner);
  return 1 - t * t;
}

function ringIntensity(dist: number, ringRadius: number, ringWidth: number): number {
  const delta = Math.abs(dist - ringRadius);
  if (delta > ringWidth) return 0;
  const t = delta / ringWidth;
  return Math.max(0, 1 - t * t);
}

export function BreathingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pulseRef = useRef<{ startTime: number } | null>(null);
  const lastPulseRef = useRef<number>(0);
  const morphRef = useRef<MorphState>({ formIndex: 0, phase: "pause", startTime: 0 });
  const [scrollOpacity, setScrollOpacity] = useState(1);

  const draw = useCallback((now: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const cx = w / 2;
    const cy = h / 2;
    const diagonal = Math.sqrt(w * w + h * h);
    const lineColor = "148,163,184";

    // --- Pulse management ---
    if (!pulseRef.current && now - lastPulseRef.current >= PULSE_INTERVAL) {
      pulseRef.current = { startTime: now };
      lastPulseRef.current = now;
    }

    let pulseActive = false;
    let getPulseAlpha: ((dist: number) => number) | null = null;

    if (pulseRef.current) {
      const elapsed = now - pulseRef.current.startTime;
      const ringRadius = (elapsed / 1000) * PULSE_SPEED;
      const maxDist = diagonal * 0.8;
      const totalDuration = (maxDist / PULSE_SPEED) * 1000 + PULSE_DECAY;

      if (elapsed < totalDuration) {
        pulseActive = true;
        getPulseAlpha = (dist: number) => {
          const ringPassTime = (dist / PULSE_SPEED) * 1000;
          const timeSincePass = elapsed - ringPassTime;
          if (timeSincePass < 0) {
            return ringIntensity(dist, ringRadius, PULSE_WIDTH);
          } else if (timeSincePass < PULSE_DECAY) {
            const t = timeSincePass / PULSE_DECAY;
            return Math.max(0, (1 - t * t) * 0.5);
          }
          return 0;
        };
      } else {
        pulseRef.current = null;
      }
    }

    // --- Morph management ---
    const morph = morphRef.current;
    let morphActive = false;

    if (morph.phase === "pause" && morph.startTime === 0) {
      morph.startTime = now;
    }

    const morphElapsed = now - morph.startTime;

    if (morph.phase === "pause" && morphElapsed >= FORM_PAUSE_MS) {
      morph.phase = "assemble";
      morph.startTime = now;
      morphActive = true;
    } else if (morph.phase === "assemble") {
      morphActive = true;
      if (morphElapsed >= FORM_ASSEMBLE_MS) {
        morph.phase = "hold";
        morph.startTime = now;
      }
    } else if (morph.phase === "hold") {
      morphActive = true;
      if (morphElapsed >= FORM_HOLD_MS) {
        morph.phase = "dissolve";
        morph.startTime = now;
      }
    } else if (morph.phase === "dissolve") {
      morphActive = true;
      if (morphElapsed >= FORM_DISSOLVE_MS) {
        morph.phase = "pause";
        morph.startTime = now;
        morph.formIndex = (morph.formIndex + 1) % FORMS.length;
      }
    }

    const needsRedraw = pulseActive || morphActive || (morph.phase === "pause" && morphElapsed < 100);

    if (!needsRedraw) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    const activeForm = morphActive ? FORMS[morph.formIndex] : null;
    const currentMorphElapsed = now - morph.startTime;
    const formLayout = activeForm ? getFormLayout(activeForm, w, h, cx, cy) : null;

    // --- Clear + draw ---
    ctx.clearRect(0, 0, w, h);
    const extend = 200;

    // Helper: compute alpha for a grid line
    const getLineAlpha = (px: number, py: number, base: number) => {
      const fade = fadeMask(px, py, cx, cy, diagonal);
      if (fade < 0.001) return 0;

      let alpha = base;

      // Pulse
      if (pulseActive && getPulseAlpha) {
        const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
        const pulseAdd = getPulseAlpha(dist) * (PULSE_BRIGHT - base);
        alpha = Math.max(alpha, base + pulseAdd);
      }

      return alpha * fade;
    };

    // --- Draw U-lines (30° right-up) and V-lines (150° left-up) ---
    // The two families are identical except for the py/startY/endY sign,
    // which flips the diagonal direction — drawn here as one loop over
    // sign = [1, -1] instead of two near-duplicate blocks.
    const step = CELL_SIZE * SIN_30;
    const numLines = Math.ceil((diagonal + extend * 2) / step);

    for (const sign of [1, -1]) {
      for (let i = -numLines / 2; i <= numLines / 2; i++) {
        const px = cx + i * step * SIN_30;
        const py = cy + sign * i * step * COS_30;
        const startX = px - (diagonal + extend) * COS_30;
        const startY = py + sign * (diagonal + extend) * SIN_30;
        const endX = px + (diagonal + extend) * COS_30;
        const endY = py - sign * (diagonal + extend) * SIN_30;
        const alpha = getLineAlpha(px, py, BASE_ALPHA_UV);
        if (alpha < 0.001) continue;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
        ctx.lineWidth = LINE_WIDTH;
        ctx.stroke();
      }
    }

    // --- Draw Z-lines (vertical) ---
    const maxRange = Math.ceil(diagonal / step) + 2;
    for (let ui = -maxRange; ui <= maxRange; ui += Z_LINE_EVERY) {
      for (let vi = -maxRange; vi <= maxRange; vi += Z_LINE_EVERY) {
        const ix = cx + ui * step * SIN_30 + vi * step * SIN_30;
        const iy = cy + ui * step * COS_30 - vi * step * COS_30;
        const halfH = CELL_SIZE * 3;
        const startX = ix;
        const startY = iy - halfH;
        const endX = ix;
        const endY = iy + halfH;
        const alpha = getLineAlpha(ix, iy, BASE_ALPHA_Z);
        if (alpha < 0.001) continue;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
        ctx.lineWidth = LINE_WIDTH;
        ctx.stroke();
      }
    }

    // --- Draw form segments as overlay (grid lines "brightening") ---
    if (activeForm && morphActive && formLayout) {
      const maxPhase = Math.max(...activeForm.segments.map(s => s.phase));
      ctx.shadowColor = `rgba(${lineColor},0.9)`;
      ctx.shadowBlur = FORM_GLOW_BLUR;

      for (const seg of activeForm.segments) {
        // Compute segment alpha based on morph phase
        let segAlpha = 0;
        if (morph.phase === "assemble") {
          const phaseDuration = FORM_ASSEMBLE_MS / (maxPhase + 1);
          const segStart = seg.phase * phaseDuration;
          const progress = Math.max(0, Math.min(1, (currentMorphElapsed - segStart) / (phaseDuration * 0.8)));
          segAlpha = progress;
        } else if (morph.phase === "hold") {
          segAlpha = 1;
        } else if (morph.phase === "dissolve") {
          segAlpha = Math.max(0, 1 - currentMorphElapsed / FORM_DISSOLVE_MS);
        }
        if (segAlpha < 0.01) continue;

        const [sx, sy] = isoToScreen(seg.from[0], seg.from[1], seg.from[2], formLayout.originX, formLayout.originY, formLayout.cell);
        const [ex, ey] = isoToScreen(seg.to[0], seg.to[1], seg.to[2], formLayout.originX, formLayout.originY, formLayout.cell);

        // Apply fade mask at segment midpoint
        const midX = (sx + ex) / 2;
        const midY = (sy + ey) / 2;
        const fade = fadeMask(midX, midY, cx, cy, diagonal);
        const alpha = FORM_BRIGHT * segAlpha * fade;
        if (alpha < 0.001) continue;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
        ctx.lineWidth = FORM_LINE_WIDTH;
        ctx.stroke();
      }

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    }

    // --- Form label ---
    const showLabel = morphActive && activeForm && formLayout && (morph.phase === "hold" || morph.phase === "assemble" || morph.phase === "dissolve");
    if (showLabel && activeForm && formLayout) {
      let labelAlpha = 0.20;
      if (morph.phase === "assemble") {
        const labelStart = FORM_ASSEMBLE_MS * 0.7;
        if (currentMorphElapsed < labelStart) {
          labelAlpha = 0;
        } else {
          labelAlpha = Math.min(0.20, ((currentMorphElapsed - labelStart) / (FORM_ASSEMBLE_MS * 0.3)) * 0.20);
        }
      } else if (morph.phase === "dissolve") {
        labelAlpha = 0.20 * Math.max(0, 1 - currentMorphElapsed / FORM_DISSOLVE_MS);
      }

      // Place label centered under the form's bottom edge
      const labelX = formLayout.originX + activeForm.frame.xMid * formLayout.cell;
      const labelY = formLayout.originY + (activeForm.frame.yMid + activeForm.frame.ySpan / 2) * formLayout.cell + 20;
      const fade = fadeMask(labelX, labelY, cx, cy, diagonal);
      labelAlpha *= fade;

      if (labelAlpha > 0.01) {
        ctx.font = "12px Inter, system-ui, sans-serif";
        ctx.fillStyle = `rgba(${lineColor},${labelAlpha})`;
        ctx.textAlign = "center";
        ctx.fillText(activeForm.name, labelX, labelY + 15);
      }
    }

    // --- Schedule next frame ---
    animRef.current = requestAnimationFrame(draw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const DEMO_DIM = 0.08;

    const onScroll = () => {
      const demo = document.getElementById("demo-boundary");
      if (!demo) {
        setScrollOpacity(1);
        return;
      }
      const rect = demo.getBoundingClientRect();
      const vh = window.innerHeight;

      // How much of the demo overlaps the viewport (0 to 1)
      const visTop = Math.max(rect.top, 0);
      const visBot = Math.min(rect.bottom, vh);
      const overlap = Math.max(0, visBot - visTop) / vh;

      // Grid dims proportionally to demo visibility, never fully hidden
      setScrollOpacity(1 - overlap * (1 - DEMO_DIM));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    lastPulseRef.current = performance.now() - PULSE_INTERVAL + 1500;
    morphRef.current = { formIndex: 0, phase: "pause", startTime: performance.now() };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-300"
      style={{ opacity: scrollOpacity }}
    />
  );
}
