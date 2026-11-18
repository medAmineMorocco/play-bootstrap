"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BranchIcon } from "./Primitives";
import styles from "./landing.module.css";

type BranchLaneConfig = {
  branch: string;
  agent: string;
  fsPath: string;
  activity: string;
  points: [number, number, number][];
  color: number;
  hex: string;
  speed: number;
  pulseCount: number;
  commitStops: number[];
  labelStop: number;
};

const BRANCH_LANES: BranchLaneConfig[] = [
  {
    branch: "main",
    agent: "Primary Worktree",
    fsPath: "~/dev/app",
    activity: "HEAD · synced with origin",
    points: [
      [-14.5, 2.2, -1.2],
      [-9.2, 1.8, 0.2],
      [-4.2, 0.6, 0.8],
      [4.2, 0.4, 0.8],
      [9.5, 1.6, 0.3],
      [14.5, 2.4, -1.0],
    ],
    color: 0x3758f9,
    hex: "#3758f9",
    speed: 0.04,
    pulseCount: 1,
    commitStops: [0.14, 0.86],
    labelStop: 0.14,
  },
  {
    branch: "feature/auth",
    agent: "✳ Claude Code",
    fsPath: "~/dev/app_wt_feature-auth",
    activity: "Editing src/auth/session.ts",
    points: [
      [-9.2, 1.8, 0.2],
      [-7.8, 3.8, 1.4],
      [-3.5, 4.5, 1.8],
      [3.2, 4.3, 1.5],
      [8.4, 3.6, 1.1],
      [13.8, 4.1, 0.2],
    ],
    color: 0x10b981,
    hex: "#10b981",
    speed: 0.05,
    pulseCount: 1,
    commitStops: [0.2, 0.82],
    labelStop: 0.82,
  },
  {
    branch: "fix/payment",
    agent: "✳ Cursor Agent",
    fsPath: "~/dev/app_wt_fix-payment",
    activity: "Running vitest webhook.spec.ts",
    points: [
      [-9.2, 1.8, 0.2],
      [-8.0, -1.2, 1.3],
      [-4.8, -3.1, 1.7],
      [2.5, -3.3, 1.4],
      [8.2, -1.6, 0.9],
      [13.5, -0.8, 0.1],
    ],
    color: 0x6366f1,
    hex: "#6366f1",
    speed: 0.045,
    pulseCount: 1,
    commitStops: [0.2, 0.84],
    labelStop: 0.2,
  },
  {
    branch: "ai/refactor-api",
    agent: "✳ Codex",
    fsPath: "~/dev/app_wt_ai-refactor",
    activity: "Refactoring 4 route handlers",
    points: [
      [-4.2, 0.6, 0.8],
      [-1.0, 2.9, 2.1],
      [4.8, 3.1, 2.2],
      [9.2, 2.5, 1.7],
      [13.2, 1.2, 0.8],
    ],
    color: 0xf59e0b,
    hex: "#f59e0b",
    speed: 0.055,
    pulseCount: 1,
    commitStops: [0.78],
    labelStop: 0.78,
  },
  {
    branch: "review/pr-128",
    agent: "✳ Antigravity",
    fsPath: "~/dev/app_wt_review-pr-128",
    activity: "Auditing diff · port 3004",
    points: [
      [4.2, 0.4, 0.8],
      [6.4, -2.5, 1.6],
      [9.8, -3.6, 1.4],
      [14.2, -3.1, 0.4],
    ],
    color: 0x06b6d4,
    hex: "#06b6d4",
    speed: 0.042,
    pulseCount: 1,
    commitStops: [0.78],
    labelStop: 0.78,
  },
];

function createRadialGlowTexture(colorHex: string): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.22, colorHex);
    gradient.addColorStop(0.55, `${colorHex}55`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createWorktreeAgentCardTexture(
  lane: BranchLaneConfig,
  darkTheme: boolean,
): THREE.CanvasTexture {
  const width = 520;
  const height = 148;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, width, height);

    const x = 8;
    const y = 8;
    const w = width - 16;
    const h = height - 16;
    const radius = 20;

    // Card surface
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.fillStyle = darkTheme
      ? "rgba(15, 20, 36, 0.9)"
      : "rgba(255, 255, 255, 0.94)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = darkTheme ? `${lane.hex}aa` : `${lane.hex}88`;
    ctx.stroke();

    // Top row: status dot + branch name + AI agent pill
    ctx.beginPath();
    ctx.arc(x + 24, y + 32, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = lane.hex;
    ctx.fill();

    ctx.font = "700 20px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillStyle = darkTheme ? "#f8fafc" : "#0f172a";
    ctx.textBaseline = "middle";
    ctx.fillText(`⑂ ${lane.branch}`, x + 40, y + 32);

    // Agent badge on top-right
    const agentText = lane.agent;
    ctx.font = "600 15px ui-monospace, SFMono-Regular, Consolas, monospace";
    const agentWidth = ctx.measureText(agentText).width + 22;
    const pillX = x + w - agentWidth - 16;
    const pillY = y + 16;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, agentWidth, 30, 15);
    ctx.fillStyle = darkTheme ? `${lane.hex}2e` : `${lane.hex}1c`;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = `${lane.hex}77`;
    ctx.stroke();
    ctx.fillStyle = darkTheme ? "#e2e8f0" : "#1e293b";
    ctx.fillText(agentText, pillX + 11, pillY + 15);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(x + 18, y + 58);
    ctx.lineTo(x + w - 18, y + 58);
    ctx.strokeStyle = darkTheme
      ? "rgba(148, 163, 184, 0.18)"
      : "rgba(15, 23, 42, 0.09)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Middle row: Filesystem directory path
    ctx.font = "600 16.5px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillStyle = darkTheme ? "#93c5fd" : "#2563eb";
    ctx.fillText(`📁 ${lane.fsPath}`, x + 20, y + 82);

    // Bottom row: Live AI agent activity
    ctx.font = "500 15px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillStyle = darkTheme ? "#94a3b8" : "#475569";
    ctx.fillText(`⚡ ${lane.activity}`, x + 20, y + 111);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function ThreeBranchCanvas({ dark = false }: { dark?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 820;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 120);
    camera.position.set(0, 0.2, 14.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const isDark = dark || document.documentElement.classList.contains("dark");

    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x94a3b8 : 0xffffff,
      isDark ? 1.4 : 1.8,
    );
    const keyLight = new THREE.DirectionalLight(0x6481ff, 2.2);
    keyLight.position.set(8, 10, 12);
    const rimLight = new THREE.PointLight(0x10b981, 2.8, 28);
    rimLight.position.set(-9, -4, 6);
    const cursorLight = new THREE.PointLight(0x3758f9, 3.2, 16);
    cursorLight.position.set(0, 0, 5);
    scene.add(ambientLight, keyLight, rimLight, cursorLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];
    const disposableTextures: THREE.Texture[] = [];

    // Subtle 3D architectural horizon grid
    const gridHelper = new THREE.GridHelper(
      42,
      38,
      0x3758f9,
      isDark ? 0x263252 : 0xcbd5f0,
    );
    gridHelper.rotation.x = Math.PI / 2.25;
    gridHelper.position.set(0, -1.6, -5.2);
    const gridMats = Array.isArray(gridHelper.material)
      ? gridHelper.material
      : [gridHelper.material];
    gridMats.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = isDark ? 0.18 : 0.12;
      disposableMaterials.push(mat);
    });
    disposableGeometries.push(gridHelper.geometry);
    rootGroup.add(gridHelper);

    const commitSphereGeo = new THREE.SphereGeometry(0.09, 18, 18);
    const worktreeOctaGeo = new THREE.OctahedronGeometry(0.2, 0);
    const worktreeCageGeo = new THREE.IcosahedronGeometry(0.3, 0);
    const gyroRingGeo = new THREE.TorusGeometry(0.35, 0.012, 12, 48);
    const shockwaveRingGeo = new THREE.RingGeometry(0.24, 0.3, 36);
    const trailSegmentGeo = new THREE.SphereGeometry(0.055, 12, 12);

    disposableGeometries.push(
      commitSphereGeo,
      worktreeOctaGeo,
      worktreeCageGeo,
      gyroRingGeo,
      shockwaveRingGeo,
      trailSegmentGeo,
    );

    const TRAIL_LENGTH = 7;

    type CometStream = {
      segments: THREE.Mesh[];
      glowSprite: THREE.Sprite;
      curve: THREE.CatmullRomCurve3;
      t: number;
      speed: number;
    };

    type WorktreeNode3D = {
      group: THREE.Group;
      core: THREE.Mesh;
      cage: THREE.Mesh;
      gyro1: THREE.Mesh;
      gyro2: THREE.Mesh;
      shockwave: THREE.Mesh;
      badge?: THREE.Sprite;
      basePos: THREE.Vector3;
      phase: number;
    };

    const cometStreams: CometStream[] = [];
    const worktreeNodes: WorktreeNode3D[] = [];

    BRANCH_LANES.forEach((lane, laneIndex) => {
      const vectors = lane.points.map(([x, y, z]) => new THREE.Vector3(x, y, z));
      const curve = new THREE.CatmullRomCurve3(vectors, false, "catmullrom", 0.5);

      const glowTex = createRadialGlowTexture(lane.hex);
      disposableTextures.push(glowTex);

      const outerTubeGeo = new THREE.TubeGeometry(curve, 110, 0.026, 10, false);
      const outerTubeMat = new THREE.MeshStandardMaterial({
        color: lane.color,
        emissive: lane.color,
        emissiveIntensity: isDark ? 0.35 : 0.2,
        roughness: 0.35,
        metalness: 0.5,
        transparent: true,
        opacity: isDark ? 0.32 : 0.18,
      });
      disposableGeometries.push(outerTubeGeo);
      disposableMaterials.push(outerTubeMat);
      rootGroup.add(new THREE.Mesh(outerTubeGeo, outerTubeMat));

      const coreLinePoints = curve.getPoints(120);
      const coreLineGeo = new THREE.BufferGeometry().setFromPoints(coreLinePoints);
      const coreLineMat = new THREE.LineBasicMaterial({
        color: isDark ? 0xffffff : lane.color,
        transparent: true,
        opacity: isDark ? 0.5 : 0.32,
      });
      disposableGeometries.push(coreLineGeo);
      disposableMaterials.push(coreLineMat);
      rootGroup.add(new THREE.Line(coreLineGeo, coreLineMat));

      lane.commitStops.forEach((stopT, idx) => {
        const pos = curve.getPointAt(stopT);
        const isPrimaryWorktreeNode = stopT === lane.labelStop;

        if (isPrimaryWorktreeNode) {
          const nodeGroup = new THREE.Group();
          nodeGroup.position.copy(pos);

          const coreMat = new THREE.MeshStandardMaterial({
            color: lane.color,
            emissive: lane.color,
            emissiveIntensity: 0.7,
            roughness: 0.15,
            metalness: 0.8,
          });
          const cageMat = new THREE.MeshBasicMaterial({
            color: isDark ? 0xffffff : lane.color,
            wireframe: true,
            transparent: true,
            opacity: isDark ? 0.55 : 0.45,
          });
          const gyroMat = new THREE.MeshBasicMaterial({
            color: lane.color,
            transparent: true,
            opacity: isDark ? 0.75 : 0.65,
          });
          const shockMat = new THREE.MeshBasicMaterial({
            color: lane.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5,
          });
          const glowSpriteMat = new THREE.SpriteMaterial({
            map: glowTex,
            color: lane.color,
            transparent: true,
            opacity: isDark ? 0.42 : 0.25,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });

          disposableMaterials.push(
            coreMat,
            cageMat,
            gyroMat,
            shockMat,
            glowSpriteMat,
          );

          const core = new THREE.Mesh(worktreeOctaGeo, coreMat);
          const cage = new THREE.Mesh(worktreeCageGeo, cageMat);
          const gyro1 = new THREE.Mesh(gyroRingGeo, gyroMat);
          const gyro2 = new THREE.Mesh(gyroRingGeo, gyroMat);
          gyro2.rotation.x = Math.PI / 2;
          const shockwave = new THREE.Mesh(shockwaveRingGeo, shockMat);

          const nodeGlow = new THREE.Sprite(glowSpriteMat);
          nodeGlow.scale.set(1.1, 1.1, 1);

          nodeGroup.add(core, cage, gyro1, gyro2, shockwave, nodeGlow);

          // 3D HUD Card showing Branch + AI Agent + System Filesystem Path
          const badgeTex = createWorktreeAgentCardTexture(lane, isDark);
          disposableTextures.push(badgeTex);
          const badgeMat = new THREE.SpriteMaterial({
            map: badgeTex,
            transparent: true,
            opacity: isDark ? 0.86 : 0.78,
            depthTest: false,
          });
          disposableMaterials.push(badgeMat);
          const badgeSprite = new THREE.Sprite(badgeMat);
          badgeSprite.scale.set(3.0, 0.85, 1);
          badgeSprite.position.set(0, 0.85, 0.2);
          nodeGroup.add(badgeSprite);

          rootGroup.add(nodeGroup);

          worktreeNodes.push({
            group: nodeGroup,
            core,
            cage,
            gyro1,
            gyro2,
            shockwave,
            badge: badgeSprite,
            basePos: pos.clone(),
            phase: laneIndex * 1.4 + idx,
          });
        } else {
          const commitMat = new THREE.MeshStandardMaterial({
            color: lane.color,
            emissive: lane.color,
            emissiveIntensity: 0.4,
            roughness: 0.2,
            metalness: 0.5,
          });
          const commitGlowMat = new THREE.SpriteMaterial({
            map: glowTex,
            color: lane.color,
            transparent: true,
            opacity: isDark ? 0.35 : 0.22,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          disposableMaterials.push(commitMat, commitGlowMat);

          const sphere = new THREE.Mesh(commitSphereGeo, commitMat);
          sphere.position.copy(pos);
          const glow = new THREE.Sprite(commitGlowMat);
          glow.scale.set(0.65, 0.65, 1);
          glow.position.copy(pos);

          rootGroup.add(sphere, glow);
        }
      });

      for (let p = 0; p < lane.pulseCount; p++) {
        const segments: THREE.Mesh[] = [];
        for (let s = 0; s < TRAIL_LENGTH; s++) {
          const ratio = 1 - s / TRAIL_LENGTH;
          const segMat = new THREE.MeshBasicMaterial({
            color: s === 0 ? 0xffffff : lane.color,
            transparent: true,
            opacity: Math.pow(ratio, 1.5) * (isDark ? 0.85 : 0.7),
          });
          disposableMaterials.push(segMat);
          const segMesh = new THREE.Mesh(trailSegmentGeo, segMat);
          segMesh.scale.setScalar(0.35 + ratio * 0.75);
          rootGroup.add(segMesh);
          segments.push(segMesh);
        }

        const headGlowMat = new THREE.SpriteMaterial({
          map: glowTex,
          color: lane.color,
          transparent: true,
          opacity: isDark ? 0.5 : 0.32,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        disposableMaterials.push(headGlowMat);
        const glowSprite = new THREE.Sprite(headGlowMat);
        glowSprite.scale.set(0.65, 0.65, 1);
        rootGroup.add(glowSprite);

        cometStreams.push({
          segments,
          glowSprite,
          curve,
          t: (p / lane.pulseCount + laneIndex * 0.19) % 1,
          speed: lane.speed,
        });
      }
    });

    const starCount = 75;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starsMat = new THREE.PointsMaterial({
      color: isDark ? 0x93c5fd : 0x3758f9,
      size: 0.075,
      transparent: true,
      opacity: isDark ? 0.42 : 0.25,
    });
    disposableGeometries.push(starsGeo);
    disposableMaterials.push(starsMat);
    const stars = new THREE.Points(starsGeo, starsMat);
    rootGroup.add(stars);

    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 820;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let isVisible = true;
    let frameId = 0;
    const clock = new THREE.Clock();

    const renderScene = () => {
      const elapsed = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05) || 0.016;

      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.025;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.025;

      cursorLight.position.set(
        currentPointer.x * 7,
        currentPointer.y * 4,
        4.5,
      );

      rootGroup.rotation.y =
        currentPointer.x * 0.08 + Math.sin(elapsed * 0.12) * 0.025;
      rootGroup.rotation.x =
        currentPointer.y * 0.045 + Math.cos(elapsed * 0.1) * 0.015;

      cometStreams.forEach((stream) => {
        stream.t = (stream.t + delta * stream.speed) % 1;
        stream.segments.forEach((seg, idx) => {
          const segT = (stream.t - idx * 0.007 + 1) % 1;
          const pos = stream.curve.getPointAt(segT);
          seg.position.copy(pos);
          if (idx === 0) {
            stream.glowSprite.position.copy(pos);
          }
        });
      });

      worktreeNodes.forEach((node) => {
        node.group.position.y =
          node.basePos.y + Math.sin(elapsed * 0.45 + node.phase) * 0.07;
        node.core.rotation.y = elapsed * 0.25 + node.phase;
        node.core.rotation.x = elapsed * 0.18 + node.phase;
        node.cage.rotation.y = -elapsed * 0.16 + node.phase;
        node.cage.rotation.z = elapsed * 0.12;
        node.gyro1.rotation.y = elapsed * 0.3 + node.phase;
        node.gyro1.rotation.x = Math.sin(elapsed * 0.22 + node.phase) * 0.35;
        node.gyro2.rotation.z = -elapsed * 0.25 + node.phase;

        const wave = (elapsed * 0.22 + node.phase * 0.25) % 1;
        node.shockwave.scale.setScalar(0.9 + wave * 1.2);
        (node.shockwave.material as THREE.MeshBasicMaterial).opacity =
          (1 - wave) * (isDark ? 0.35 : 0.22);
      });

      stars.rotation.y = elapsed * 0.008;
      stars.rotation.x = Math.sin(elapsed * 0.06) * 0.015;

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!isVisible) return;
      renderScene();
      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          clock.getDelta();
          if (prefersReducedMotion) {
            renderScene();
          } else {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(animate);
          }
        } else {
          window.cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.02 },
    );

    visibilityObserver.observe(container);
    renderScene();

    return () => {
      window.cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [dark]);

  return (
    <div
      ref={containerRef}
      className={styles.threeCanvasWrap}
      aria-hidden="true"
    />
  );
}

const PARALLEL_WORKTREE_LANES = [
  {
    branch: "feature/auth",
    fsPath: "~/workspace/acme-app_wt_feature-auth",
    agent: "Claude Code",
    color: "#10b981",
    steps: [
      "Editing src/auth/session.ts (+48 −12)",
      "Generating JWT refresh token rotation",
      "Running vitest src/auth/session.spec.ts ✓",
    ],
  },
  {
    branch: "fix/payment",
    fsPath: "~/workspace/acme-app_wt_fix-payment",
    agent: "Cursor",
    color: "#6366f1",
    steps: [
      "Patching src/billing/webhook.ts",
      "Verifying idempotency key lock",
      "Build & typecheck passed (0 errors) ✓",
    ],
  },
  {
    branch: "review/pr-128",
    fsPath: "~/workspace/acme-app_wt_review-pr-128",
    agent: "Antigravity",
    color: "#06b6d4",
    steps: [
      "Inspecting diff across 6 components",
      "Running dev server on localhost:3002",
      " Auditable changes verified ✓",
    ],
  },
  {
    branch: "experiment/ui",
    fsPath: "~/workspace/acme-app_wt_experiment-ui",
    agent: "Codex",
    color: "#f59e0b",
    steps: [
      "Scaffolding 3D graph canvas component",
      "Updating CSS tokens in theme.css",
      "Snapshot tests updated ✓",
    ],
  },
];

export function ParallelWorktreesLiveBoard() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((prev) => (prev + 1) % 3);
    }, 3200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={styles.after}>
      <div className={styles.liveBoardHeader}>
        <p className={styles.mono}>WITH WORKTREEWISE / PARALLEL AI AGENTS &amp; FILESYSTEM PATHS</p>
        <span className={styles.liveBadge}>
          <span className={styles.liveDot} />4 WORKTREES ACTIVE
        </span>
      </div>

      <div className={styles.branchRoot}>
        <BranchIcon />
        <strong>~/workspace/acme-app</strong>
        <span className={styles.sharedGitBadge}>.git shared</span>
      </div>

      <ul className={styles.parallelAgentRows}>
        {PARALLEL_WORKTREE_LANES.map((item, idx) => {
          const currentStep = item.steps[(stepIndex + idx) % item.steps.length];
          return (
            <li key={item.branch} className={styles.parallelAgentRow}>
              <div className={styles.parallelRowTop}>
                <span
                  className={styles.node}
                  style={{ borderColor: item.color }}
                />
                <code className={styles.branchCode}>{item.branch}</code>
                <span
                  className={styles.agentBadgePill}
                  style={{
                    borderColor: `${item.color}55`,
                    background: `${item.color}15`,
                  }}
                >
                  <span
                    className={styles.agentPulseDot}
                    style={{ background: item.color }}
                  />
                  ✳ {item.agent}
                </span>
              </div>

              <div className={styles.fsPathRow}>
                <span className={styles.fsFolderIcon} aria-hidden="true">
                  📁
                </span>
                <code className={styles.fsPathCode}>{item.fsPath}</code>
              </div>

              <div className={styles.agentActivityRow}>
                <span className={styles.agentActivityText}>{currentStep}</span>
                <span className={styles.agentProgressBar}>
                  <i
                    style={{
                      background: item.color,
                      width: `${45 + ((stepIndex + idx) % 3) * 27}%`,
                    }}
                  />
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.diagramNote}>
        <span />
        Separate filesystem directories. Multiple AI agents working simultaneously with zero file collisions.
      </div>
    </div>
  );
}

export function HomepageMotionController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const revealTargets = document.querySelectorAll<HTMLElement>(
      `.${styles.story}, .${styles.comparison}, .${styles.bento} > article, .${styles.savingsResult}, .${styles.trialPlan}, .${styles.proPlan}, .${styles.blackFridayBanner}, .${styles.downloadCard}`,
    );

    revealTargets.forEach((el) => {
      el.classList.add(styles.revealItem);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    const tiltFrames = document.querySelectorAll<HTMLElement>(
      `.${styles.heroProduct}, .${styles.storyProductVisual}, .${styles.workflowVisual}, .${styles.managementVisual}`,
    );

    const cleanups: (() => void)[] = [];

    tiltFrames.forEach((frame) => {
      const onMove = (e: MouseEvent) => {
        const rect = frame.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = relX * 5.5;
        const rotateX = -relY * 5.5;
        frame.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) translateZ(0)`;
      };

      const onLeave = () => {
        frame.style.transform =
          "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0)";
      };

      frame.addEventListener("mousemove", onMove, { passive: true });
      frame.addEventListener("mouseleave", onLeave, { passive: true });
      cleanups.push(() => {
        frame.removeEventListener("mousemove", onMove);
        frame.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      revealObserver.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
