import { Key as ji, GitBranch as $i, Table as Hi, Terminal as Ui, ScrollText as qi, Box as Vi, ShieldCheck as Wi, Users as Yi, KeyRound as Xi, Layers as Gi, Clock as Qi, Workflow as Ki, MemoryStick as Ji, HardDrive as Zi, Server as el, AppWindow as nl, Share2 as tl, Webhook as rl, Plug as il, Copy as ll, DownloadCloud as ol, Network as al, Radio as ul, Cloud as sl, File as cl, Zap as fl, Image as hl, Braces as pl, Waves as ml, Cpu as dl, Cog as gl, Filter as yl, Brain as kl, FileBarChart as xl, BarChart3 as bl, Database as wl } from "lucide-react";
import { jsx as M, jsxs as ne, Fragment as tt } from "react/jsx-runtime";
import { useMemo as Te, useEffect as $n, useRef as Sn, useState as un, useLayoutEffect as on } from "react";
import { MarkerType as Sl, Handle as sn, Position as ae, useInternalNode as At, useStore as Cl, getSmoothStepPath as El, getBezierPath as Il, BaseEdge as Al, EdgeLabelRenderer as Tl, ReactFlow as vl, useReactFlow as Pl } from "@xyflow/react";
const Yh = (e, n) => ({ ...e, kind: "container", cell: [0, 0], layout: n.grid, children: n.nodes }), Xh = (e, n) => ({
  id: e,
  label: "",
  kind: "group",
  cell: [0, 0],
  layout: n.grid,
  children: n.nodes
}), Gh = (e, n) => ({
  grid: e,
  nodes: n.map(({ node: t, at: r }) => ({ ...t, cell: r }))
}), Qh = "#5b8cff", Kh = "#37d39a", Jh = "#ff7a59", Zh = "#b98bff", ep = "#3fd0d6", np = "#ff5d6c", br = "#9aa3b2", tp = "#d9b84a", Hn = "#5b6270", zl = {
  database: wl,
  barChart: bl,
  report: xl,
  brain: kl,
  funnel: yl,
  gears: gl,
  engine: dl,
  lake: ml,
  json: pl,
  image: hl,
  streaming: fl,
  file: cl,
  cloud: sl,
  stream: ul,
  federation: al,
  autoload: ol,
  copy: ll,
  plug: il,
  api: rl,
  share: tl,
  app: nl,
  server: el,
  disk: Zi,
  memory: Ji,
  workflow: Ki,
  clock: Qi,
  layers: Gi,
  key: Xi,
  users: Yi,
  shield: Wi,
  box: Vi,
  scroll: qi,
  terminal: Ui,
  table: Hi,
  branch: $i,
  surrogateKey: ji
}, Ll = (e) => e ? zl[e] : void 0, _l = 6;
function Dl(e, n, t) {
  const r = {};
  return wr(e, n, { x: 0, y: 0, w: t.width, h: t.height }, r), r;
}
const cn = (e) => Array.isArray(e) ? e : Array.from({ length: e }, () => 1), Un = (e) => e.reduce((n, t) => n + t, 0), Fl = (e) => e.reduce((n, t) => [...n, n[n.length - 1] + t], [0]);
function Tt(e, n, t, r) {
  const l = Un(e) + 2 * r + (e.length - 1) * t, o = n / l, i = e.map((a) => a * o);
  return { unit: o, sizes: i, before: Fl(i) };
}
function wr(e, n, t, r) {
  var p;
  const { gap: l = 0.2, padding: o = 0.4 } = n, i = Tt(cn(n.cols), t.w, l, o), a = Tt(cn(n.rows), t.h, l, o), s = i.unit * l, u = a.unit * l, f = i.unit * o, c = a.unit * o;
  for (const h of e) {
    const [g, w, E = 1, y = 1] = h.cell, S = {
      x: t.x + f + i.before[g] + g * s,
      y: t.y + c + a.before[w] + w * u,
      w: Un(i.sizes.slice(g, g + E)) + (E - 1) * s,
      h: Un(a.sizes.slice(w, w + y)) + (y - 1) * u
    };
    if (r[h.id] = S, (p = h.children) != null && p.length && h.layout) {
      const C = h.kind === "container" ? _l : 0, _ = { x: S.x + C, y: S.y + C, w: S.w - 2 * C, h: S.h - 2 * C };
      wr(h.children, h.layout, _, r);
    }
  }
}
const gn = (e, n) => `${e}->${n}`;
function Rl(e, n) {
  const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
  let o = null;
  const i = Math.min(n, e.length - 1);
  for (let s = 0; s <= i; s++)
    for (const u of e[s].delta)
      switch (u.kind) {
        case "solidify":
          for (const f of u.ids) t.add(f);
          break;
        case "draw":
          for (const [f, c] of u.edges) r.add(gn(f, c));
          break;
        case "annotate":
          l.set(u.id, u.value);
          break;
        case "pan":
          o = u.to;
          break;
      }
  const a = /* @__PURE__ */ new Set();
  if (i >= 0) {
    for (const s of e[i].delta)
      if (s.kind === "pulse") for (const u of s.ids) a.add(u);
  }
  return { nodes: t, edges: r, annotations: l, pulse: a, camera: o };
}
function Ml(e, n) {
  let t = n;
  for (; t > 0 && e[t - 1].scene === e[n].scene; ) t--;
  return t;
}
function Ol(e, n) {
  const t = Ml(e, n.section), r = [];
  for (let l = t; l < n.section; l++) r.push(...e[l].beats);
  return r.push(...e[n.section].beats.slice(0, n.beat + 1)), Rl(r, r.length - 1);
}
function Nl(e) {
  if (e.focus != null)
    return Array.isArray(e.focus) ? e.focus : [e.focus];
  const n = /* @__PURE__ */ new Set();
  for (const t of e.beats)
    for (const r of t.delta)
      if (r.kind === "solidify") for (const l of r.ids) n.add(l);
  if (n.size === 0) {
    for (const t of e.beats)
      for (const r of t.delta)
        if (r.kind === "draw") for (const [l, o] of r.edges)
          n.add(l), n.add(o);
  }
  return [...n];
}
function Cn(e, n, t) {
  const r = n.beat + t;
  return r >= 0 && r < e[n.section].beats.length ? { section: n.section, beat: r } : t > 0 && n.section < e.length - 1 ? { section: n.section + 1, beat: 0 } : t < 0 && n.section > 0 ? { section: n.section - 1, beat: e[n.section - 1].beats.length - 1 } : n;
}
function Bl(e) {
  const n = /* @__PURE__ */ new Set(), t = (r) => {
    var l;
    for (const o of r)
      n.add(o.id), (l = o.children) != null && l.length && t(o.children);
  };
  return t(e.nodes), n;
}
function jl(e) {
  return new Set(e.edges.map((n) => gn(n.from, n.to)));
}
function $l(e) {
  switch (e.kind) {
    case "solidify":
    case "pulse":
      return e.ids;
    case "annotate":
      return [e.id];
    case "pan":
      return [e.to];
    case "draw":
      return e.edges.flat();
  }
}
function rp(e, n) {
  const t = [];
  return e.forEach((r, l) => {
    const o = `§${l + 1} "${r.id}"`, i = n(r.scene);
    if (!i) {
      t.push(`${o}: references unknown scene "${r.scene}"`);
      return;
    }
    const a = Bl(i), s = jl(i);
    r.beats.forEach((u, f) => {
      for (const c of u.delta) {
        for (const p of $l(c))
          a.has(p) || t.push(`${o} beat ${f}: ${c.kind} id "${p}" is not a node in scene "${r.scene}"`);
        if (c.kind === "draw")
          for (const [p, h] of c.edges)
            s.has(gn(p, h)) || t.push(`${o} beat ${f}: draw ${p}->${h} has no matching edge in scene "${r.scene}"`);
      }
    });
  }), t;
}
const Hl = (e) => cn(e.grid.cols).length > cn(e.grid.rows).length ? "horizontal" : "vertical";
function Sr(e) {
  var t;
  const n = [];
  for (const r of e)
    n.push(r), (t = r.children) != null && t.length && n.push(...Sr(r.children));
  return n;
}
function Ul(e, n, t, r, l) {
  const o = !!l && l.size > 0;
  return Sr(e.nodes).map((i) => {
    const a = n[i.id], s = r ? r.has(i.id) : !0, u = o ? l.has(i.id) : !0, f = i.kind ?? "symbol", c = f === "symbol" || f === "term" || f === "code";
    return {
      id: i.id,
      type: "scene",
      position: { x: a.x, y: a.y },
      draggable: !1,
      selectable: !1,
      zIndex: c ? 10 : void 0,
      data: {
        label: i.label,
        sub: i.sub,
        type: i.type,
        icon: i.icon,
        filename: i.filename,
        iconInline: i.iconInline,
        mono: i.mono,
        color: i.color ?? br,
        kind: i.kind ?? "symbol",
        direction: t,
        width: a.w,
        height: a.h,
        ghosted: !s,
        highlighted: s && o && u,
        dimmed: s && o && !u
      }
    };
  });
}
function ql(e, n, t, r) {
  const l = !!r && r.size > 0;
  return e.edges.map((o, i) => {
    const a = !n || n.has(o.from) && n.has(o.to) || ((t == null ? void 0 : t.has(gn(o.from, o.to))) ?? !1), s = a && l && !r.has(o.from) && !r.has(o.to);
    return {
      id: `${o.from}-${o.to}-${i}`,
      source: o.from,
      target: o.to,
      type: "flow",
      data: { color: Hn, animated: o.animated, label: o.label, ghosted: !a, dimmed: s },
      markerEnd: { type: Sl.ArrowClosed, color: Hn }
    };
  });
}
function Vl(e, n, t, r, l = 0) {
  if (r === "term") {
    const f = Math.max(1, e.replace(/\s+/g, " ").trim().length), c = Math.max(n - 4, 6) / (f * 0.72), p = Math.max(t - l - 4, 6) / 1.2;
    return Math.max(4, Math.min(c, p, 18));
  }
  const o = e.split(/\s+/).filter(Boolean), i = Math.max(1, ...o.map((f) => f.length)), a = Math.max(n - 20, 8) / (i * 0.72), s = o.length > 1 ? 2 : 1, u = Math.max(t - l - 8, 8) / (s * 1.25);
  return Math.max(7, Math.min(a, u, 18));
}
function Wl(e, n, t, r = 1) {
  const l = Math.max(n - 8, 6) / (Math.max(e, 1) * 0.62), o = Math.max(t - 10, 6) / (r * 1.55);
  return Math.max(9, Math.min(l, o, 24));
}
function Yl(e, n) {
  const r = Math.max(n - 8, 6) / (Math.max(e.length, 1) * 0.86);
  return Math.max(4, Math.min(r, 16));
}
const Xl = /* @__PURE__ */ new Set([
  "import",
  "from",
  "def",
  "return",
  "lambda",
  "class",
  "val",
  "var",
  "new",
  "if",
  "else",
  "for",
  "in",
  "as",
  "select",
  "where",
  "group",
  "by",
  "join",
  "on",
  "and",
  "or",
  "not",
  "null",
  "true",
  "false"
]), Gl = (e) => /[A-Za-z_]/.test(e), Ql = (e) => /[A-Za-z0-9_]/.test(e), vt = (e) => /[0-9]/.test(e);
function Kl(e) {
  const n = [];
  let t = 0, r = !1;
  const l = (o, i) => {
    n.push({ cls: o, text: i }), o !== "ws" && (r = o === "punct" && i === ".");
  };
  for (; t < e.length; ) {
    const o = e[t];
    if (/\s/.test(o)) {
      let i = t + 1;
      for (; i < e.length && /\s/.test(e[i]); ) i++;
      l("ws", e.slice(t, i)), t = i;
      continue;
    }
    if (o === "'" || o === '"') {
      let i = t + 1;
      for (; i < e.length && e[i] !== o; ) i++;
      i = Math.min(i + 1, e.length), l("string", e.slice(t, i)), t = i;
      continue;
    }
    if (vt(o)) {
      let i = t + 1;
      for (; i < e.length && (vt(e[i]) || e[i] === "."); ) i++;
      l("number", e.slice(t, i)), t = i;
      continue;
    }
    if (Gl(o)) {
      let i = t + 1;
      for (; i < e.length && Ql(e[i]); ) i++;
      const a = e.slice(t, i), s = r ? "method" : Xl.has(a.toLowerCase()) ? "keyword" : "var";
      l(s, a), t = i;
      continue;
    }
    if (o === "…") {
      l("punct", o), t += 1;
      continue;
    }
    if (o === "." && e.slice(t, t + 3) === "...") {
      l("punct", "..."), t += 3;
      continue;
    }
    l("punct", o), t += 1;
  }
  return n;
}
function Jl(e, n = 2) {
  const t = e.replace(/[^a-zA-Z0-9]/g, "");
  return t ? t.charAt(0).toUpperCase() + t.slice(1, n).toLowerCase() : "";
}
function Cr({ data: e }) {
  const n = e;
  if (n.kind === "group")
    return /* @__PURE__ */ M("div", { className: "scene-node scene-node--group", style: { width: n.width, height: n.height } });
  const t = n.ghosted ? " scene-node--ghost" : n.highlighted ? " scene-node--lit" : n.dimmed ? " scene-node--dimmed" : "", r = n.direction === "horizontal";
  if (n.kind === "code") return /* @__PURE__ */ M(Zl, { d: n, state: t, horizontal: r });
  const l = n.kind === "container", o = n.kind === "symbol" && !!n.mono, i = n.kind === "symbol" || l ? Ll(n.icon) : void 0, a = Math.max(18, Math.min(Math.min(n.width, n.height) * 0.4, 48)), s = !!((i || o) && n.iconInline), u = n.kind === "term" && !!n.type, f = s ? Math.max(24, n.width - a - 12) : u ? Math.max(24, n.width * 0.6) : n.width, c = s ? 0 : o ? a + 4 : i ? a + 5 : 0, p = n.sub ? 16 : 0, h = l ? Yl(n.label, n.width) : Vl(n.label, f, n.height, n.kind, c + p);
  return /* @__PURE__ */ ne(
    "div",
    {
      className: `scene-node scene-node--${n.kind}${o ? " scene-node--mono" : ""}${s ? " scene-node--iconh" : ""}${t}`,
      style: { width: n.width, height: n.height, "--node-color": n.color },
      children: [
        /* @__PURE__ */ M(sn, { type: "target", position: r ? ae.Left : ae.Top, className: "scene-handle", isConnectable: !1 }),
        l ? /* @__PURE__ */ ne("span", { className: "scene-node__title", style: { fontSize: h }, children: [
          i && /* @__PURE__ */ M(i, { className: "scene-node__title-icon", size: Math.round(h * 1.25), strokeWidth: 1.75 }),
          n.label
        ] }) : /* @__PURE__ */ ne(tt, { children: [
          o ? /* @__PURE__ */ M("span", { className: "scene-node__mono", style: { width: a, height: a, fontSize: a * 0.42 }, children: i ? /* @__PURE__ */ M(i, { size: a * 0.6, strokeWidth: 2 }) : Jl(n.label) }) : i && /* @__PURE__ */ M(i, { className: "scene-node__icon", size: a, strokeWidth: 1.75 }),
          u ? /* @__PURE__ */ ne("span", { className: "scene-node__row", children: [
            /* @__PURE__ */ M("span", { className: "scene-node__label", style: { fontSize: h }, children: n.label }),
            /* @__PURE__ */ M("span", { className: "scene-node__type", style: { fontSize: h * 0.82 }, children: n.type })
          ] }) : /* @__PURE__ */ M("span", { className: "scene-node__label", style: { fontSize: h }, children: n.label }),
          n.sub && /* @__PURE__ */ M("span", { className: "scene-node__sub", children: n.sub })
        ] }),
        /* @__PURE__ */ M(sn, { type: "source", position: r ? ae.Right : ae.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
Cr.defaultColor = br;
function Zl({ d: e, state: n, horizontal: t }) {
  const r = e.label.length, l = e.sub ? e.sub.length + 2 : 0, o = e.sub ? 2 : 1, i = Math.max(20, Math.min(e.height * 0.18, 34)), s = Wl(
    Math.max(r, l),
    e.width - 30 - 26,
    e.height - i,
    o
  ), u = Kl(e.label);
  return /* @__PURE__ */ ne(
    "div",
    {
      className: `scene-node scene-node--code${n}`,
      style: { width: e.width, height: e.height, "--node-color": e.color },
      children: [
        /* @__PURE__ */ M(sn, { type: "target", position: t ? ae.Left : ae.Top, className: "scene-handle", isConnectable: !1 }),
        /* @__PURE__ */ ne("div", { className: "scene-node__code-bar", style: { height: i }, children: [
          /* @__PURE__ */ ne("span", { className: "scene-node__code-dots", children: [
            /* @__PURE__ */ M("i", { style: { background: "#ff5f56" } }),
            /* @__PURE__ */ M("i", { style: { background: "#ffbd2e" } }),
            /* @__PURE__ */ M("i", { style: { background: "#27c93f" } })
          ] }),
          e.filename && /* @__PURE__ */ M("span", { className: "scene-node__code-file", children: e.filename })
        ] }),
        /* @__PURE__ */ ne("div", { className: "scene-node__code-body", style: { fontSize: s }, children: [
          /* @__PURE__ */ ne("div", { className: "scene-node__code-line", children: [
            /* @__PURE__ */ M("span", { className: "scene-node__code-gutter", children: "1" }),
            /* @__PURE__ */ M("span", { className: "scene-node__code-src", children: u.map((f, c) => /* @__PURE__ */ M("span", { className: `tok-${f.cls}`, children: f.text }, c)) })
          ] }),
          e.sub && /* @__PURE__ */ ne("div", { className: "scene-node__code-line", children: [
            /* @__PURE__ */ M("span", { className: "scene-node__code-gutter" }),
            /* @__PURE__ */ M("span", { className: "scene-node__code-src tok-comment", children: `# ${e.sub}` })
          ] })
        ] }),
        /* @__PURE__ */ M(sn, { type: "source", position: t ? ae.Right : ae.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
const eo = 13, no = 8, to = 13, ro = (e) => Math.max(no, Math.min(to, eo * e));
function Pt(e, n) {
  const t = (e.measured.width ?? 0) / 2, r = (e.measured.height ?? 0) / 2, l = e.internals.positionAbsolute.x + t, o = e.internals.positionAbsolute.y + r, i = n.internals.positionAbsolute.x + (n.measured.width ?? 0) / 2, a = n.internals.positionAbsolute.y + (n.measured.height ?? 0) / 2, s = (i - l) / (2 * t) - (a - o) / (2 * r), u = (i - l) / (2 * t) + (a - o) / (2 * r), f = 1 / (Math.abs(s) + Math.abs(u) || 1);
  return { x: t * (f * s + f * u) + l, y: r * (-f * s + f * u) + o };
}
function zt(e, n) {
  const t = e.internals.positionAbsolute.x, r = e.internals.positionAbsolute.y, l = e.measured.width ?? 0;
  return n.x <= t + 1 ? ae.Left : n.x >= t + l - 1 ? ae.Right : n.y <= r + 1 ? ae.Top : ae.Bottom;
}
function io({ id: e, source: n, target: t, data: r, markerEnd: l }) {
  const o = At(n), i = At(t), a = Cl((F) => F.transform[2]);
  if (!(o != null && o.measured.width) || !(i != null && i.measured.width)) return null;
  const s = Pt(o, i), u = Pt(i, o), f = zt(o, s), c = zt(i, u), p = { sourceX: s.x, sourceY: s.y, targetX: u.x, targetY: u.y, sourcePosition: f, targetPosition: c }, [h, g, w] = f === c ? El({ ...p, borderRadius: 14, offset: 24 }) : Il(p), E = (r == null ? void 0 : r.color) ?? Hn, y = r == null ? void 0 : r.label, S = (r == null ? void 0 : r.ghosted) === !0, C = (r == null ? void 0 : r.dimmed) === !0, _ = (r == null ? void 0 : r.animated) !== !1 && !S && !C;
  return /* @__PURE__ */ ne(tt, { children: [
    /* @__PURE__ */ M(
      Al,
      {
        id: e,
        path: h,
        markerEnd: S ? void 0 : l,
        style: {
          stroke: E,
          strokeWidth: 1.75,
          opacity: S ? 0.14 : C ? 0.25 : 0.6,
          strokeDasharray: S ? "5 5" : void 0
        }
      }
    ),
    _ && /* @__PURE__ */ M("circle", { r: 3, fill: E, opacity: 0.85, children: /* @__PURE__ */ M("animateMotion", { dur: "2.4s", repeatCount: "indefinite", path: h }) }),
    y && !S && !C && /* @__PURE__ */ M(Tl, { children: /* @__PURE__ */ M(
      "div",
      {
        className: "scene-edge-label",
        style: { transform: `translate(-50%, -50%) translate(${g}px, ${w}px)`, fontSize: `${ro(a)}px` },
        children: y
      }
    ) })
  ] });
}
const lo = { scene: Cr }, oo = { flow: io }, ao = 0.08, uo = 0.22, so = 550;
function co(e) {
  if (!e.length) return null;
  const n = Math.min(...e.map((o) => o.x)), t = Math.min(...e.map((o) => o.y)), r = Math.max(...e.map((o) => o.x + o.w)), l = Math.max(...e.map((o) => o.y + o.h));
  return { x: n, y: t, width: r - n, height: l - t };
}
function fo({
  boxes: e,
  focusIds: n,
  fitMs: t = so
}) {
  const r = Pl(), l = n.join(",");
  return $n(() => {
    const o = n.map((u) => e[u]).filter(Boolean), i = co(o.length ? o : Object.values(e));
    if (!i) return;
    const a = o.length ? uo : ao, s = requestAnimationFrame(() => r.fitBounds(i, { padding: a, duration: t }));
    return () => cancelAnimationFrame(s);
  }, [l, e, r, t]), null;
}
function ho({
  scene: e,
  reveal: n = null,
  focus: t = [],
  fitMs: r
}) {
  const l = Hl(e), o = Te(() => Dl(e.nodes, e.grid, e.canvas), [e]), i = Te(() => t.length ? new Set(t) : null, [t]), a = Te(
    () => Ul(e, o, l, (n == null ? void 0 : n.nodes) ?? null, i),
    [e, o, l, n, i]
  ), s = Te(
    () => ql(e, (n == null ? void 0 : n.nodes) ?? null, (n == null ? void 0 : n.edges) ?? null, i),
    [e, n, i]
  );
  return /* @__PURE__ */ M("div", { className: "scene-flow", children: /* @__PURE__ */ M(
    vl,
    {
      nodes: a,
      edges: s,
      nodeTypes: lo,
      edgeTypes: oo,
      proOptions: { hideAttribution: !0 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !1,
      panOnDrag: !0,
      zoomOnScroll: !0,
      zoomOnDoubleClick: !1,
      minZoom: 0.2,
      maxZoom: 8,
      children: /* @__PURE__ */ M(fo, { boxes: o, focusIds: t, fitMs: r })
    }
  ) });
}
function po(e, n) {
  const t = Sn(null), r = Sn(n);
  r.current = n;
  const [l, o] = un(!1), i = Sn(l);
  return i.current = l, $n(() => {
    const u = new Audio();
    return u.addEventListener("ended", () => r.current()), t.current = u, () => u.pause();
  }, []), $n(() => {
    const u = t.current;
    u && (u.pause(), e ? (u.src = e, u.currentTime = 0, i.current && u.play().catch(() => {
    })) : (u.removeAttribute("src"), u.load()));
  }, [e]), { playing: l, toggle: () => {
    const u = t.current;
    !u || !u.getAttribute("src") || (i.current ? (u.pause(), o(!1)) : (u.play().catch(() => {
    }), o(!0)));
  }, stop: () => {
    var u;
    (u = t.current) == null || u.pause(), o(!1);
  } };
}
function mo(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const go = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, yo = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ko = {};
function Lt(e, n) {
  return (ko.jsx ? yo : go).test(e);
}
const xo = /[ \t\n\f\r]/g;
function bo(e) {
  return typeof e == "object" ? e.type === "text" ? _t(e.value) : !1 : _t(e);
}
function _t(e) {
  return e.replace(xo, "") === "";
}
class Ke {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(n, t, r) {
    this.normal = t, this.property = n, r && (this.space = r);
  }
}
Ke.prototype.normal = {};
Ke.prototype.property = {};
Ke.prototype.space = void 0;
function Er(e, n) {
  const t = {}, r = {};
  for (const l of e)
    Object.assign(t, l.property), Object.assign(r, l.normal);
  return new Ke(t, r, n);
}
function qn(e) {
  return e.toLowerCase();
}
class te {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(n, t) {
    this.attribute = t, this.property = n;
  }
}
te.prototype.attribute = "";
te.prototype.booleanish = !1;
te.prototype.boolean = !1;
te.prototype.commaOrSpaceSeparated = !1;
te.prototype.commaSeparated = !1;
te.prototype.defined = !1;
te.prototype.mustUseProperty = !1;
te.prototype.number = !1;
te.prototype.overloadedBoolean = !1;
te.prototype.property = "";
te.prototype.spaceSeparated = !1;
te.prototype.space = void 0;
let wo = 0;
const D = ze(), X = ze(), Vn = ze(), I = ze(), W = ze(), ve = ze(), ie = ze();
function ze() {
  return 2 ** ++wo;
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: D,
  booleanish: X,
  commaOrSpaceSeparated: ie,
  commaSeparated: ve,
  number: I,
  overloadedBoolean: Vn,
  spaceSeparated: W
}, Symbol.toStringTag, { value: "Module" })), En = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Wn)
);
class rt extends te {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(n, t, r, l) {
    let o = -1;
    if (super(n, t), Dt(this, "space", l), typeof r == "number")
      for (; ++o < En.length; ) {
        const i = En[o];
        Dt(this, En[o], (r & Wn[i]) === Wn[i]);
      }
  }
}
rt.prototype.defined = !0;
function Dt(e, n, t) {
  t && (e[n] = t);
}
function Oe(e) {
  const n = {}, t = {};
  for (const [r, l] of Object.entries(e.properties)) {
    const o = new rt(
      r,
      e.transform(e.attributes || {}, r),
      l,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), n[r] = o, t[qn(r)] = r, t[qn(o.attribute)] = r;
  }
  return new Ke(n, t, e.space);
}
const Ir = Oe({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: X,
    ariaAutoComplete: null,
    ariaBusy: X,
    ariaChecked: X,
    ariaColCount: I,
    ariaColIndex: I,
    ariaColSpan: I,
    ariaControls: W,
    ariaCurrent: null,
    ariaDescribedBy: W,
    ariaDetails: null,
    ariaDisabled: X,
    ariaDropEffect: W,
    ariaErrorMessage: null,
    ariaExpanded: X,
    ariaFlowTo: W,
    ariaGrabbed: X,
    ariaHasPopup: null,
    ariaHidden: X,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: W,
    ariaLevel: I,
    ariaLive: null,
    ariaModal: X,
    ariaMultiLine: X,
    ariaMultiSelectable: X,
    ariaOrientation: null,
    ariaOwns: W,
    ariaPlaceholder: null,
    ariaPosInSet: I,
    ariaPressed: X,
    ariaReadOnly: X,
    ariaRelevant: null,
    ariaRequired: X,
    ariaRoleDescription: W,
    ariaRowCount: I,
    ariaRowIndex: I,
    ariaRowSpan: I,
    ariaSelected: X,
    ariaSetSize: I,
    ariaSort: null,
    ariaValueMax: I,
    ariaValueMin: I,
    ariaValueNow: I,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function Ar(e, n) {
  return n in e ? e[n] : n;
}
function Tr(e, n) {
  return Ar(e, n.toLowerCase());
}
const So = Oe({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: ve,
    acceptCharset: W,
    accessKey: W,
    action: null,
    allow: null,
    allowFullScreen: D,
    allowPaymentRequest: D,
    allowUserMedia: D,
    alpha: D,
    alt: null,
    as: null,
    async: D,
    autoCapitalize: null,
    autoComplete: W,
    autoFocus: D,
    autoPlay: D,
    blocking: W,
    capture: null,
    charSet: null,
    checked: D,
    cite: null,
    className: W,
    closedBy: null,
    colorSpace: null,
    cols: I,
    colSpan: I,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: X,
    controls: D,
    controlsList: W,
    coords: I | ve,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: D,
    defer: D,
    dir: null,
    dirName: null,
    disabled: D,
    download: Vn,
    draggable: X,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: D,
    formTarget: null,
    headers: W,
    height: I,
    hidden: Vn,
    high: I,
    href: null,
    hrefLang: null,
    htmlFor: W,
    httpEquiv: W,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: D,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: D,
    itemId: null,
    itemProp: W,
    itemRef: W,
    itemScope: D,
    itemType: W,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: D,
    low: I,
    manifest: null,
    max: null,
    maxLength: I,
    media: null,
    method: null,
    min: null,
    minLength: I,
    multiple: D,
    muted: D,
    name: null,
    nonce: null,
    noModule: D,
    noValidate: D,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: D,
    optimum: I,
    pattern: null,
    ping: W,
    placeholder: null,
    playsInline: D,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: D,
    referrerPolicy: null,
    rel: W,
    required: D,
    reversed: D,
    rows: I,
    rowSpan: I,
    sandbox: W,
    scope: null,
    scoped: D,
    seamless: D,
    selected: D,
    shadowRootClonable: D,
    shadowRootCustomElementRegistry: D,
    shadowRootDelegatesFocus: D,
    shadowRootMode: null,
    shadowRootSerializable: D,
    shape: null,
    size: I,
    sizes: null,
    slot: null,
    span: I,
    spellCheck: X,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: I,
    step: null,
    style: null,
    tabIndex: I,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: D,
    useMap: null,
    value: X,
    width: I,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: W,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: I,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: I,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: D,
    // Lists. Use CSS to reduce space between items instead
    declare: D,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: I,
    // `<img>` and `<object>`
    leftMargin: I,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: I,
    // `<body>`
    marginWidth: I,
    // `<body>`
    noResize: D,
    // `<frame>`
    noHref: D,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: D,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: D,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: I,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: X,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: I,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: I,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: D,
    disablePictureInPicture: D,
    disableRemotePlayback: D,
    exportParts: ve,
    part: W,
    prefix: null,
    property: null,
    results: I,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Tr
}), Co = Oe({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    maskType: "mask-type",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: ie,
    accentHeight: I,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: I,
    amplitude: I,
    arabicForm: null,
    ascent: I,
    attributeName: null,
    attributeType: null,
    azimuth: I,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: I,
    by: null,
    calcMode: null,
    capHeight: I,
    className: W,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: I,
    diffuseConstant: I,
    direction: null,
    display: null,
    dur: null,
    divisor: I,
    dominantBaseline: null,
    download: D,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: I,
    enableBackground: null,
    end: null,
    event: null,
    exponent: I,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: I,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: ve,
    g2: ve,
    glyphName: ve,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: I,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: I,
    horizOriginX: I,
    horizOriginY: I,
    id: null,
    ideographic: I,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: I,
    k: I,
    k1: I,
    k2: I,
    k3: I,
    k4: I,
    kernelMatrix: ie,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: I,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskType: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: I,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: I,
    overlineThickness: I,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: I,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: W,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: I,
    pointsAtY: I,
    pointsAtZ: I,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ie,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ie,
    rev: ie,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ie,
    requiredFeatures: ie,
    requiredFonts: ie,
    requiredFormats: ie,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: I,
    specularExponent: I,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: I,
    strikethroughThickness: I,
    string: null,
    stroke: null,
    strokeDashArray: ie,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: I,
    strokeOpacity: I,
    strokeWidth: null,
    style: null,
    surfaceScale: I,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ie,
    tabIndex: I,
    tableValues: null,
    target: null,
    targetX: I,
    targetY: I,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ie,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: I,
    underlineThickness: I,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: I,
    values: null,
    vAlphabetic: I,
    vMathematical: I,
    vectorEffect: null,
    vHanging: I,
    vIdeographic: I,
    version: null,
    vertAdvY: I,
    vertOriginX: I,
    vertOriginY: I,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: I,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Ar
}), vr = Oe({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  }
}), Pr = Oe({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Tr
}), zr = Oe({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), Eo = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Io = /[A-Z]/g, Ft = /-[a-z]/g, Ao = /^data[-\w.:]+$/i;
function To(e, n) {
  const t = qn(n);
  let r = n, l = te;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Ao.test(n)) {
    if (n.charAt(4) === "-") {
      const o = n.slice(5).replace(Ft, Po);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = n.slice(4);
      if (!Ft.test(o)) {
        let i = o.replace(Io, vo);
        i.charAt(0) !== "-" && (i = "-" + i), n = "data" + i;
      }
    }
    l = rt;
  }
  return new l(r, n);
}
function vo(e) {
  return "-" + e.toLowerCase();
}
function Po(e) {
  return e.charAt(1).toUpperCase();
}
const zo = Er([Ir, So, vr, Pr, zr], "html"), it = Er([Ir, Co, vr, Pr, zr], "svg");
function Lo(e) {
  return e.join(" ").trim();
}
function Lr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fe = {}, In, Rt;
function _o() {
  if (Rt) return In;
  Rt = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, n = /\n/g, t = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, l = /^:\s*/, o = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, i = /^[;\s]*/, a = /^\s+|\s+$/g, s = `
`, u = "/", f = "*", c = "", p = "comment", h = "declaration";
  function g(E, y) {
    if (typeof E != "string")
      throw new TypeError("First argument must be a string");
    if (!E) return [];
    y = y || {};
    var S = 1, C = 1;
    function _(L) {
      var T = L.match(n);
      T && (S += T.length);
      var q = L.lastIndexOf(s);
      C = ~q ? L.length - q : C + L.length;
    }
    function F() {
      var L = { line: S, column: C };
      return function(T) {
        return T.position = new b(L), $(), T;
      };
    }
    function b(L) {
      this.start = L, this.end = { line: S, column: C }, this.source = y.source;
    }
    b.prototype.content = E;
    function N(L) {
      var T = new Error(
        y.source + ":" + S + ":" + C + ": " + L
      );
      if (T.reason = L, T.filename = y.source, T.line = S, T.column = C, T.source = E, !y.silent) throw T;
    }
    function H(L) {
      var T = L.exec(E);
      if (T) {
        var q = T[0];
        return _(q), E = E.slice(q.length), T;
      }
    }
    function $() {
      H(t);
    }
    function k(L) {
      var T;
      for (L = L || []; T = v(); )
        T !== !1 && L.push(T);
      return L;
    }
    function v() {
      var L = F();
      if (!(u != E.charAt(0) || f != E.charAt(1))) {
        for (var T = 2; c != E.charAt(T) && (f != E.charAt(T) || u != E.charAt(T + 1)); )
          ++T;
        if (T += 2, c === E.charAt(T - 1))
          return N("End of comment missing");
        var q = E.slice(2, T - 2);
        return C += 2, _(q), E = E.slice(T), C += 2, L({
          type: p,
          comment: q
        });
      }
    }
    function P() {
      var L = F(), T = H(r);
      if (T) {
        if (v(), !H(l)) return N("property missing ':'");
        var q = H(o), G = L({
          type: h,
          property: w(T[0].replace(e, c)),
          value: q ? w(q[0].replace(e, c)) : c
        });
        return H(i), G;
      }
    }
    function U() {
      var L = [];
      k(L);
      for (var T; T = P(); )
        T !== !1 && (L.push(T), k(L));
      return L;
    }
    return $(), U();
  }
  function w(E) {
    return E ? E.replace(a, c) : c;
  }
  return In = g, In;
}
var Mt;
function Do() {
  if (Mt) return Fe;
  Mt = 1;
  var e = Fe && Fe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.default = t;
  const n = e(_o());
  function t(r, l) {
    let o = null;
    if (!r || typeof r != "string")
      return o;
    const i = (0, n.default)(r), a = typeof l == "function";
    return i.forEach((s) => {
      if (s.type !== "declaration")
        return;
      const { property: u, value: f } = s;
      a ? l(u, f, s) : f && (o = o || {}, o[u] = f);
    }), o;
  }
  return Fe;
}
var He = {}, Ot;
function Fo() {
  if (Ot) return He;
  Ot = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, t = /^[^-]+$/, r = /^-(webkit|moz|ms|o|khtml)-/, l = /^-(ms)-/, o = function(u) {
    return !u || t.test(u) || e.test(u);
  }, i = function(u, f) {
    return f.toUpperCase();
  }, a = function(u, f) {
    return "".concat(f, "-");
  }, s = function(u, f) {
    return f === void 0 && (f = {}), o(u) ? u : (u = u.toLowerCase(), f.reactCompat ? u = u.replace(l, a) : u = u.replace(r, a), u.replace(n, i));
  };
  return He.camelCase = s, He;
}
var Ue, Nt;
function Ro() {
  if (Nt) return Ue;
  Nt = 1;
  var e = Ue && Ue.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  }, n = e(Do()), t = Fo();
  function r(l, o) {
    var i = {};
    return !l || typeof l != "string" || (0, n.default)(l, function(a, s) {
      a && s && (i[(0, t.camelCase)(a, o)] = s);
    }), i;
  }
  return r.default = r, Ue = r, Ue;
}
var Mo = Ro();
const Oo = /* @__PURE__ */ Lr(Mo), _r = Dr("end"), lt = Dr("start");
function Dr(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function No(e) {
  const n = lt(e), t = _r(e);
  if (n && t)
    return { start: n, end: t };
}
function We(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Bt(e.position) : "start" in e || "end" in e ? Bt(e) : "line" in e || "column" in e ? Yn(e) : "";
}
function Yn(e) {
  return jt(e && e.line) + ":" + jt(e && e.column);
}
function Bt(e) {
  return Yn(e && e.start) + "-" + Yn(e && e.end);
}
function jt(e) {
  return e && typeof e == "number" ? e : 1;
}
class J extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let l = "", o = {}, i = !1;
    if (t && ("line" in t && "column" in t ? o = { place: t } : "start" in t && "end" in t ? o = { place: t } : "type" in t ? o = {
      ancestors: [t],
      place: t.position
    } : o = { ...t }), typeof n == "string" ? l = n : !o.cause && n && (i = !0, l = n.message, o.cause = n), !o.ruleId && !o.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? o.ruleId = r : (o.source = r.slice(0, s), o.ruleId = r.slice(s + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const s = o.ancestors[o.ancestors.length - 1];
      s && (o.place = s.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = l, this.line = a ? a.line : void 0, this.name = We(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = i && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
J.prototype.file = "";
J.prototype.name = "";
J.prototype.reason = "";
J.prototype.message = "";
J.prototype.stack = "";
J.prototype.column = void 0;
J.prototype.line = void 0;
J.prototype.ancestors = void 0;
J.prototype.cause = void 0;
J.prototype.fatal = void 0;
J.prototype.place = void 0;
J.prototype.ruleId = void 0;
J.prototype.source = void 0;
const ot = {}.hasOwnProperty, Bo = /* @__PURE__ */ new Map(), jo = /[A-Z]/g, $o = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Ho = /* @__PURE__ */ new Set(["td", "th"]), Fr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Uo(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Ko(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Qo(t, n.jsx, n.jsxs);
  }
  const l = {
    Fragment: n.Fragment,
    ancestors: [],
    components: n.components || {},
    create: r,
    elementAttributeNameCase: n.elementAttributeNameCase || "react",
    evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
    filePath: t,
    ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
    passKeys: n.passKeys !== !1,
    passNode: n.passNode || !1,
    schema: n.space === "svg" ? it : zo,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, o = Rr(l, e, void 0);
  return o && typeof o != "string" ? o : l.create(
    e,
    l.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function Rr(e, n, t) {
  if (n.type === "element")
    return qo(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return Vo(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return Yo(e, n, t);
  if (n.type === "mdxjsEsm")
    return Wo(e, n);
  if (n.type === "root")
    return Xo(e, n, t);
  if (n.type === "text")
    return Go(e, n);
}
function qo(e, n, t) {
  const r = e.schema;
  let l = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (l = it, e.schema = l), e.ancestors.push(n);
  const o = Or(e, n.tagName, !1), i = Jo(e, n);
  let a = ut(e, n);
  return $o.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !bo(s) : !0;
  })), Mr(e, i, o, n), at(i, a), e.ancestors.pop(), e.schema = r, e.create(n, o, i, t);
}
function Vo(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Ge(e, n.position);
}
function Wo(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Ge(e, n.position);
}
function Yo(e, n, t) {
  const r = e.schema;
  let l = r;
  n.name === "svg" && r.space === "html" && (l = it, e.schema = l), e.ancestors.push(n);
  const o = n.name === null ? e.Fragment : Or(e, n.name, !0), i = Zo(e, n), a = ut(e, n);
  return Mr(e, i, o, n), at(i, a), e.ancestors.pop(), e.schema = r, e.create(n, o, i, t);
}
function Xo(e, n, t) {
  const r = {};
  return at(r, ut(e, n)), e.create(n, e.Fragment, r, t);
}
function Go(e, n) {
  return n.value;
}
function Mr(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function at(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function Qo(e, n, t) {
  return r;
  function r(l, o, i, a) {
    const u = Array.isArray(i.children) ? t : n;
    return a ? u(o, i, a) : u(o, i);
  }
}
function Ko(e, n) {
  return t;
  function t(r, l, o, i) {
    const a = Array.isArray(o.children), s = lt(r);
    return n(
      l,
      o,
      i,
      a,
      {
        columnNumber: s ? s.column - 1 : void 0,
        fileName: e,
        lineNumber: s ? s.line : void 0
      },
      void 0
    );
  }
}
function Jo(e, n) {
  const t = {};
  let r, l;
  for (l in n.properties)
    if (l !== "children" && ot.call(n.properties, l)) {
      const o = ea(e, l, n.properties[l]);
      if (o) {
        const [i, a] = o;
        e.tableCellAlignToStyle && i === "align" && typeof a == "string" && Ho.has(n.tagName) ? r = a : t[i] = a;
      }
    }
  if (r) {
    const o = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function Zo(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const i = o.expression;
        i.type;
        const a = i.properties[0];
        a.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Ge(e, n.position);
    else {
      const l = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          Ge(e, n.position);
      else
        o = r.value === null ? !0 : r.value;
      t[l] = /** @type {Props[keyof Props]} */
      o;
    }
  return t;
}
function ut(e, n) {
  const t = [];
  let r = -1;
  const l = e.passKeys ? /* @__PURE__ */ new Map() : Bo;
  for (; ++r < n.children.length; ) {
    const o = n.children[r];
    let i;
    if (e.passKeys) {
      const s = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (s) {
        const u = l.get(s) || 0;
        i = s + "-" + u, l.set(s, u + 1);
      }
    }
    const a = Rr(e, o, i);
    a !== void 0 && t.push(a);
  }
  return t;
}
function ea(e, n, t) {
  const r = To(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? mo(t) : Lo(t)), r.property === "style") {
      let l = typeof t == "object" ? t : na(e, String(t));
      return e.stylePropertyNameCase === "css" && (l = ta(l)), ["style", l];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Eo[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function na(e, n) {
  try {
    return Oo(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), l = new J("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw l.file = e.filePath || void 0, l.url = Fr + "#cannot-parse-style-attribute", l;
  }
}
function Or(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const l = n.split(".");
    let o = -1, i;
    for (; ++o < l.length; ) {
      const a = Lt(l[o]) ? { type: "Identifier", name: l[o] } : { type: "Literal", value: l[o] };
      i = i ? {
        type: "MemberExpression",
        object: i,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = i;
  } else
    r = Lt(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const l = (
      /** @type {string | number} */
      r.value
    );
    return ot.call(e.components, l) ? e.components[l] : l;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Ge(e);
}
function Ge(e, n) {
  const t = new J(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = Fr + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function ta(e) {
  const n = {};
  let t;
  for (t in e)
    ot.call(e, t) && (n[ra(t)] = e[t]);
  return n;
}
function ra(e) {
  let n = e.replace(jo, ia);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function ia(e) {
  return "-" + e.toLowerCase();
}
const An = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, la = {};
function st(e, n) {
  const t = la, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, l = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Nr(e, r, l);
}
function Nr(e, n, t) {
  if (oa(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return $t(e.children, n, t);
  }
  return Array.isArray(e) ? $t(e, n, t) : "";
}
function $t(e, n, t) {
  const r = [];
  let l = -1;
  for (; ++l < e.length; )
    r[l] = Nr(e[l], n, t);
  return r.join("");
}
function oa(e) {
  return !!(e && typeof e == "object");
}
const Ht = document.createElement("i");
function ct(e) {
  const n = "&" + e + ";";
  Ht.innerHTML = n;
  const t = Ht.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function le(e, n, t, r) {
  const l = e.length;
  let o = 0, i;
  if (n < 0 ? n = -n > l ? 0 : l + n : n = n > l ? l : n, t = t > 0 ? t : 0, r.length < 1e4)
    i = Array.from(r), i.unshift(n, t), e.splice(...i);
  else
    for (t && e.splice(n, t); o < r.length; )
      i = r.slice(o, o + 1e4), i.unshift(n, 0), e.splice(...i), o += 1e4, n += 1e4;
}
function oe(e, n) {
  return e.length > 0 ? (le(e, e.length, 0, n), e) : n;
}
const Ut = {}.hasOwnProperty;
function Br(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    aa(n, e[t]);
  return n;
}
function aa(e, n) {
  let t;
  for (t in n) {
    const l = (Ut.call(e, t) ? e[t] : void 0) || (e[t] = {}), o = n[t];
    let i;
    if (o)
      for (i in o) {
        Ut.call(l, i) || (l[i] = []);
        const a = o[i];
        ua(
          // @ts-expect-error Looks like a list.
          l[i],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function ua(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  le(e, 0, 0, r);
}
function jr(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function he(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Z = Se(/[A-Za-z]/), K = Se(/[\dA-Za-z]/), sa = Se(/[#-'*+\--9=?A-Z^-~]/);
function fn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Xn = Se(/\d/), ca = Se(/[\dA-Fa-f]/), fa = Se(/[!-/:-@[-`{-~]/);
function z(e) {
  return e !== null && e < -2;
}
function Y(e) {
  return e !== null && (e < 0 || e === 32);
}
function O(e) {
  return e === -2 || e === -1 || e === 32;
}
const yn = Se(new RegExp("\\p{P}|\\p{S}", "u")), Pe = Se(/\s/);
function Se(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function Ne(e) {
  const n = [];
  let t = -1, r = 0, l = 0;
  for (; ++t < e.length; ) {
    const o = e.charCodeAt(t);
    let i = "";
    if (o === 37 && K(e.charCodeAt(t + 1)) && K(e.charCodeAt(t + 2)))
      l = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (i = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(t + 1);
      o < 56320 && a > 56319 && a < 57344 ? (i = String.fromCharCode(o, a), l = 1) : i = "�";
    } else
      i = String.fromCharCode(o);
    i && (n.push(e.slice(r, t), encodeURIComponent(i)), r = t + l + 1, i = ""), l && (t += l, l = 0);
  }
  return n.join("") + e.slice(r);
}
function j(e, n, t, r) {
  const l = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return i;
  function i(s) {
    return O(s) ? (e.enter(t), a(s)) : n(s);
  }
  function a(s) {
    return O(s) && o++ < l ? (e.consume(s), a) : (e.exit(t), n(s));
  }
}
const ha = {
  tokenize: pa
};
function pa(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, l);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), j(e, n, "linePrefix");
  }
  function l(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, i(a);
  }
  function i(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return z(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), i);
  }
}
const ma = {
  tokenize: da
}, qt = {
  tokenize: ga
};
function da(e) {
  const n = this, t = [];
  let r = 0, l, o, i;
  return a;
  function a(C) {
    if (r < t.length) {
      const _ = t[r];
      return n.containerState = _[1], e.attempt(_[0].continuation, s, u)(C);
    }
    return u(C);
  }
  function s(C) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, l && S();
      const _ = n.events.length;
      let F = _, b;
      for (; F--; )
        if (n.events[F][0] === "exit" && n.events[F][1].type === "chunkFlow") {
          b = n.events[F][1].end;
          break;
        }
      y(r);
      let N = _;
      for (; N < n.events.length; )
        n.events[N][1].end = {
          ...b
        }, N++;
      return le(n.events, F + 1, 0, n.events.slice(_)), n.events.length = N, u(C);
    }
    return a(C);
  }
  function u(C) {
    if (r === t.length) {
      if (!l)
        return p(C);
      if (l.currentConstruct && l.currentConstruct.concrete)
        return g(C);
      n.interrupt = !!(l.currentConstruct && !l._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(qt, f, c)(C);
  }
  function f(C) {
    return l && S(), y(r), p(C);
  }
  function c(C) {
    return n.parser.lazy[n.now().line] = r !== t.length, i = n.now().offset, g(C);
  }
  function p(C) {
    return n.containerState = {}, e.attempt(qt, h, g)(C);
  }
  function h(C) {
    return r++, t.push([n.currentConstruct, n.containerState]), p(C);
  }
  function g(C) {
    if (C === null) {
      l && S(), y(0), e.consume(C);
      return;
    }
    return l = l || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: l,
      contentType: "flow",
      previous: o
    }), w(C);
  }
  function w(C) {
    if (C === null) {
      E(e.exit("chunkFlow"), !0), y(0), e.consume(C);
      return;
    }
    return z(C) ? (e.consume(C), E(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(C), w);
  }
  function E(C, _) {
    const F = n.sliceStream(C);
    if (_ && F.push(null), C.previous = o, o && (o.next = C), o = C, l.defineSkip(C.start), l.write(F), n.parser.lazy[C.start.line]) {
      let b = l.events.length;
      for (; b--; )
        if (
          // The token starts before the line ending…
          l.events[b][1].start.offset < i && // …and either is not ended yet…
          (!l.events[b][1].end || // …or ends after it.
          l.events[b][1].end.offset > i)
        )
          return;
      const N = n.events.length;
      let H = N, $, k;
      for (; H--; )
        if (n.events[H][0] === "exit" && n.events[H][1].type === "chunkFlow") {
          if ($) {
            k = n.events[H][1].end;
            break;
          }
          $ = !0;
        }
      for (y(r), b = N; b < n.events.length; )
        n.events[b][1].end = {
          ...k
        }, b++;
      le(n.events, H + 1, 0, n.events.slice(N)), n.events.length = b;
    }
  }
  function y(C) {
    let _ = t.length;
    for (; _-- > C; ) {
      const F = t[_];
      n.containerState = F[1], F[0].exit.call(n, e);
    }
    t.length = C;
  }
  function S() {
    l.write([null]), o = void 0, l = void 0, n.containerState._closeFlow = void 0;
  }
}
function ga(e, n, t) {
  return j(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Me(e) {
  if (e === null || Y(e) || Pe(e))
    return 1;
  if (yn(e))
    return 2;
}
function kn(e, n, t) {
  const r = [];
  let l = -1;
  for (; ++l < e.length; ) {
    const o = e[l].resolveAll;
    o && !r.includes(o) && (n = o(n, t), r.push(o));
  }
  return n;
}
const Gn = {
  name: "attention",
  resolveAll: ya,
  tokenize: ka
};
function ya(e, n) {
  let t = -1, r, l, o, i, a, s, u, f;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...e[r][1].end
          }, p = {
            ...e[t][1].start
          };
          Vt(c, -s), Vt(p, s), i = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: p
          }, o = {
            type: s > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, l = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...i.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...i.start
          }, e[t][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = oe(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = oe(u, [["enter", l, n], ["enter", i, n], ["exit", i, n], ["enter", o, n]]), u = oe(u, kn(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = oe(u, [["exit", o, n], ["enter", a, n], ["exit", a, n], ["exit", l, n]]), e[t][1].end.offset - e[t][1].start.offset ? (f = 2, u = oe(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : f = 0, le(e, r - 1, t - r + 3, u), t = r + u.length - f - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function ka(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, l = Me(r);
  let o;
  return i;
  function i(s) {
    return o = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === o)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), f = Me(s), c = !f || f === 2 && l || t.includes(s), p = !l || l === 2 && f || t.includes(r);
    return u._open = !!(o === 42 ? c : c && (l || !p)), u._close = !!(o === 42 ? p : p && (f || !c)), n(s);
  }
}
function Vt(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const xa = {
  name: "autolink",
  tokenize: ba
};
function ba(e, n, t) {
  let r = 0;
  return l;
  function l(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(h) {
    return Z(h) ? (e.consume(h), i) : h === 64 ? t(h) : u(h);
  }
  function i(h) {
    return h === 43 || h === 45 || h === 46 || K(h) ? (r = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || K(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), n) : h === null || h === 32 || h === 60 || fn(h) ? t(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), f) : sa(h) ? (e.consume(h), u) : t(h);
  }
  function f(h) {
    return K(h) ? c(h) : t(h);
  }
  function c(h) {
    return h === 46 ? (e.consume(h), r = 0, f) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), n) : p(h);
  }
  function p(h) {
    if ((h === 45 || K(h)) && r++ < 63) {
      const g = h === 45 ? p : c;
      return e.consume(h), g;
    }
    return t(h);
  }
}
const Je = {
  partial: !0,
  tokenize: wa
};
function wa(e, n, t) {
  return r;
  function r(o) {
    return O(o) ? j(e, l, "linePrefix")(o) : l(o);
  }
  function l(o) {
    return o === null || z(o) ? n(o) : t(o);
  }
}
const $r = {
  continuation: {
    tokenize: Ca
  },
  exit: Ea,
  name: "blockQuote",
  tokenize: Sa
};
function Sa(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    if (i === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(i), e.exit("blockQuoteMarker"), o;
    }
    return t(i);
  }
  function o(i) {
    return O(i) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(i), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(i));
  }
}
function Ca(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return O(i) ? j(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : o(i);
  }
  function o(i) {
    return e.attempt($r, n, t)(i);
  }
}
function Ea(e) {
  e.exit("blockQuote");
}
const Hr = {
  name: "characterEscape",
  tokenize: Ia
};
function Ia(e, n, t) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), l;
  }
  function l(o) {
    return fa(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(o);
  }
}
const Ur = {
  name: "characterReference",
  tokenize: Aa
};
function Aa(e, n, t) {
  const r = this;
  let l = 0, o, i;
  return a;
  function a(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), s;
  }
  function s(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, i = K, f(c));
  }
  function u(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, i = ca, f) : (e.enter("characterReferenceValue"), o = 7, i = Xn, f(c));
  }
  function f(c) {
    if (c === 59 && l) {
      const p = e.exit("characterReferenceValue");
      return i === K && !ct(r.sliceSerialize(p)) ? t(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return i(c) && l++ < o ? (e.consume(c), f) : t(c);
  }
}
const Wt = {
  partial: !0,
  tokenize: va
}, Yt = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Ta
};
function Ta(e, n, t) {
  const r = this, l = {
    partial: !0,
    tokenize: F
  };
  let o = 0, i = 0, a;
  return s;
  function s(b) {
    return u(b);
  }
  function u(b) {
    const N = r.events[r.events.length - 1];
    return o = N && N[1].type === "linePrefix" ? N[2].sliceSerialize(N[1], !0).length : 0, a = b, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(b);
  }
  function f(b) {
    return b === a ? (i++, e.consume(b), f) : i < 3 ? t(b) : (e.exit("codeFencedFenceSequence"), O(b) ? j(e, c, "whitespace")(b) : c(b));
  }
  function c(b) {
    return b === null || z(b) ? (e.exit("codeFencedFence"), r.interrupt ? n(b) : e.check(Wt, w, _)(b)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(b));
  }
  function p(b) {
    return b === null || z(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(b)) : O(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), j(e, h, "whitespace")(b)) : b === 96 && b === a ? t(b) : (e.consume(b), p);
  }
  function h(b) {
    return b === null || z(b) ? c(b) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), g(b));
  }
  function g(b) {
    return b === null || z(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(b)) : b === 96 && b === a ? t(b) : (e.consume(b), g);
  }
  function w(b) {
    return e.attempt(l, _, E)(b);
  }
  function E(b) {
    return e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), y;
  }
  function y(b) {
    return o > 0 && O(b) ? j(e, S, "linePrefix", o + 1)(b) : S(b);
  }
  function S(b) {
    return b === null || z(b) ? e.check(Wt, w, _)(b) : (e.enter("codeFlowValue"), C(b));
  }
  function C(b) {
    return b === null || z(b) ? (e.exit("codeFlowValue"), S(b)) : (e.consume(b), C);
  }
  function _(b) {
    return e.exit("codeFenced"), n(b);
  }
  function F(b, N, H) {
    let $ = 0;
    return k;
    function k(T) {
      return b.enter("lineEnding"), b.consume(T), b.exit("lineEnding"), v;
    }
    function v(T) {
      return b.enter("codeFencedFence"), O(T) ? j(b, P, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(T) : P(T);
    }
    function P(T) {
      return T === a ? (b.enter("codeFencedFenceSequence"), U(T)) : H(T);
    }
    function U(T) {
      return T === a ? ($++, b.consume(T), U) : $ >= i ? (b.exit("codeFencedFenceSequence"), O(T) ? j(b, L, "whitespace")(T) : L(T)) : H(T);
    }
    function L(T) {
      return T === null || z(T) ? (b.exit("codeFencedFence"), N(T)) : H(T);
    }
  }
}
function va(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return i === null ? t(i) : (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o);
  }
  function o(i) {
    return r.parser.lazy[r.now().line] ? t(i) : n(i);
  }
}
const Tn = {
  name: "codeIndented",
  tokenize: za
}, Pa = {
  partial: !0,
  tokenize: La
};
function za(e, n, t) {
  const r = this;
  return l;
  function l(u) {
    return e.enter("codeIndented"), j(e, o, "linePrefix", 5)(u);
  }
  function o(u) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? i(u) : t(u);
  }
  function i(u) {
    return u === null ? s(u) : z(u) ? e.attempt(Pa, i, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || z(u) ? (e.exit("codeFlowValue"), i(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function La(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return r.parser.lazy[r.now().line] ? t(i) : z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), l) : j(e, o, "linePrefix", 5)(i);
  }
  function o(i) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(i) : z(i) ? l(i) : t(i);
  }
}
const _a = {
  name: "codeText",
  previous: Fa,
  resolve: Da,
  tokenize: Ra
};
function Da(e) {
  let n = e.length - 4, t = 3, r, l;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    l === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (l = r) : (r === n || e[r][1].type === "lineEnding") && (e[l][1].type = "codeTextData", r !== l + 2 && (e[l][1].end = e[r - 1][1].end, e.splice(l + 2, r - l - 2), n -= r - l - 2, r = l + 2), l = void 0);
  return e;
}
function Fa(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Ra(e, n, t) {
  let r = 0, l, o;
  return i;
  function i(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit("codeTextSequence"), s(c));
  }
  function s(c) {
    return c === null ? t(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), s) : c === 96 ? (o = e.enter("codeTextSequence"), l = 0, f(c)) : z(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(c));
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || z(c) ? (e.exit("codeTextData"), s(c)) : (e.consume(c), u);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), l++, f) : l === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(c)) : (o.type = "codeTextData", u(c));
  }
}
class Ma {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(n, t, r) {
    const l = t || 0;
    this.setCursor(Math.trunc(n));
    const o = this.right.splice(this.right.length - l, Number.POSITIVE_INFINITY);
    return r && qe(this.left, r), o.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), qe(this.left, n);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(n) {
    this.setCursor(0), qe(this.right, n.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        qe(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        qe(this.left, t.reverse());
      }
  }
}
function qe(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function qr(e) {
  const n = {};
  let t = -1, r, l, o, i, a, s, u;
  const f = new Ma(e);
  for (; ++t < f.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = f.get(t), t && r[1].type === "chunkFlow" && f.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
      for (; ++o < s.length && s[o][1].type !== "content"; )
        s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, Oa(f, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (o = t, l = void 0; o--; )
        if (i = f.get(o), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank")
          i[0] === "enter" && (l && (f.get(l)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", l = o);
        else if (!(i[1].type === "linePrefix" || i[1].type === "listItemIndent")) break;
      l && (r[1].end = {
        ...f.get(l)[1].start
      }, a = f.slice(l, t), a.unshift(r), f.splice(l, t - l + 1, a));
    }
  }
  return le(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !u;
}
function Oa(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let l = n - 1;
  const o = [];
  let i = t._tokenizer;
  i || (i = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
  const a = i.events, s = [], u = {};
  let f, c, p = -1, h = t, g = 0, w = 0;
  const E = [w];
  for (; h; ) {
    for (; e.get(++l)[1] !== h; )
      ;
    o.push(l), h._tokenizer || (f = r.sliceStream(h), h.next || f.push(null), c && i.defineSkip(h.start), h._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(f), h._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), c = h, h = h.next;
  }
  for (h = t; ++p < a.length; )
    // Find a void token that includes a break.
    a[p][0] === "exit" && a[p - 1][0] === "enter" && a[p][1].type === a[p - 1][1].type && a[p][1].start.line !== a[p][1].end.line && (w = p + 1, E.push(w), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (i.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : E.pop(), p = E.length; p--; ) {
    const y = a.slice(E[p], E[p + 1]), S = o.pop();
    s.push([S, S + y.length - 1]), e.splice(S, 2, y);
  }
  for (s.reverse(), p = -1; ++p < s.length; )
    u[g + s[p][0]] = g + s[p][1], g += s[p][1] - s[p][0] - 1;
  return u;
}
const Na = {
  resolve: ja,
  tokenize: $a
}, Ba = {
  partial: !0,
  tokenize: Ha
};
function ja(e) {
  return qr(e), e;
}
function $a(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), l(a);
  }
  function l(a) {
    return a === null ? o(a) : z(a) ? e.check(Ba, i, o)(a) : (e.consume(a), l);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function i(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, l;
  }
}
function Ha(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), j(e, o, "linePrefix");
  }
  function o(i) {
    if (i === null || z(i))
      return t(i);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(i) : e.interrupt(r.parser.constructs.flow, t, n)(i);
  }
}
function Vr(e, n, t, r, l, o, i, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(y) {
    return y === 60 ? (e.enter(r), e.enter(l), e.enter(o), e.consume(y), e.exit(o), p) : y === null || y === 32 || y === 41 || fn(y) ? t(y) : (e.enter(r), e.enter(i), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), w(y));
  }
  function p(y) {
    return y === 62 ? (e.enter(o), e.consume(y), e.exit(o), e.exit(l), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(y));
  }
  function h(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(a), p(y)) : y === null || y === 60 || z(y) ? t(y) : (e.consume(y), y === 92 ? g : h);
  }
  function g(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), h) : h(y);
  }
  function w(y) {
    return !f && (y === null || y === 41 || Y(y)) ? (e.exit("chunkString"), e.exit(a), e.exit(i), e.exit(r), n(y)) : f < u && y === 40 ? (e.consume(y), f++, w) : y === 41 ? (e.consume(y), f--, w) : y === null || y === 32 || y === 40 || fn(y) ? t(y) : (e.consume(y), y === 92 ? E : w);
  }
  function E(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), w) : w(y);
  }
}
function Wr(e, n, t, r, l, o) {
  const i = this;
  let a = 0, s;
  return u;
  function u(h) {
    return e.enter(r), e.enter(l), e.consume(h), e.exit(l), e.enter(o), f;
  }
  function f(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !a && "_hiddenFootnoteSupport" in i.parser.constructs ? t(h) : h === 93 ? (e.exit(o), e.enter(l), e.consume(h), e.exit(l), e.exit(r), n) : z(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(h));
  }
  function c(h) {
    return h === null || h === 91 || h === 93 || z(h) || a++ > 999 ? (e.exit("chunkString"), f(h)) : (e.consume(h), s || (s = !O(h)), h === 92 ? p : c);
  }
  function p(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, c) : c(h);
  }
}
function Yr(e, n, t, r, l, o) {
  let i;
  return a;
  function a(p) {
    return p === 34 || p === 39 || p === 40 ? (e.enter(r), e.enter(l), e.consume(p), e.exit(l), i = p === 40 ? 41 : p, s) : t(p);
  }
  function s(p) {
    return p === i ? (e.enter(l), e.consume(p), e.exit(l), e.exit(r), n) : (e.enter(o), u(p));
  }
  function u(p) {
    return p === i ? (e.exit(o), s(i)) : p === null ? t(p) : z(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), j(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(p));
  }
  function f(p) {
    return p === i || p === null || z(p) ? (e.exit("chunkString"), u(p)) : (e.consume(p), p === 92 ? c : f);
  }
  function c(p) {
    return p === i || p === 92 ? (e.consume(p), f) : f(p);
  }
}
function Ye(e, n) {
  let t;
  return r;
  function r(l) {
    return z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), t = !0, r) : O(l) ? j(e, r, t ? "linePrefix" : "lineSuffix")(l) : n(l);
  }
}
const Ua = {
  name: "definition",
  tokenize: Va
}, qa = {
  partial: !0,
  tokenize: Wa
};
function Va(e, n, t) {
  const r = this;
  let l;
  return o;
  function o(h) {
    return e.enter("definition"), i(h);
  }
  function i(h) {
    return Wr.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function a(h) {
    return l = he(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : t(h);
  }
  function s(h) {
    return Y(h) ? Ye(e, u)(h) : u(h);
  }
  function u(h) {
    return Vr(
      e,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function f(h) {
    return e.attempt(qa, c, c)(h);
  }
  function c(h) {
    return O(h) ? j(e, p, "whitespace")(h) : p(h);
  }
  function p(h) {
    return h === null || z(h) ? (e.exit("definition"), r.parser.defined.push(l), n(h)) : t(h);
  }
}
function Wa(e, n, t) {
  return r;
  function r(a) {
    return Y(a) ? Ye(e, l)(a) : t(a);
  }
  function l(a) {
    return Yr(e, o, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return O(a) ? j(e, i, "whitespace")(a) : i(a);
  }
  function i(a) {
    return a === null || z(a) ? n(a) : t(a);
  }
}
const Ya = {
  name: "hardBreakEscape",
  tokenize: Xa
};
function Xa(e, n, t) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), l;
  }
  function l(o) {
    return z(o) ? (e.exit("hardBreakEscape"), n(o)) : t(o);
  }
}
const Ga = {
  name: "headingAtx",
  resolve: Qa,
  tokenize: Ka
};
function Qa(e, n) {
  let t = e.length - 2, r = 3, l, o;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (l = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, le(e, r, t - r + 1, [["enter", l, n], ["enter", o, n], ["exit", o, n], ["exit", l, n]])), e;
}
function Ka(e, n, t) {
  let r = 0;
  return l;
  function l(f) {
    return e.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e.enter("atxHeadingSequence"), i(f);
  }
  function i(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), i) : f === null || Y(f) ? (e.exit("atxHeadingSequence"), a(f)) : t(f);
  }
  function a(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), s(f)) : f === null || z(f) ? (e.exit("atxHeading"), n(f)) : O(f) ? j(e, a, "whitespace")(f) : (e.enter("atxHeadingText"), u(f));
  }
  function s(f) {
    return f === 35 ? (e.consume(f), s) : (e.exit("atxHeadingSequence"), a(f));
  }
  function u(f) {
    return f === null || f === 35 || Y(f) ? (e.exit("atxHeadingText"), a(f)) : (e.consume(f), u);
  }
}
const Ja = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Xt = ["pre", "script", "style", "textarea"], Za = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: tu,
  tokenize: ru
}, eu = {
  partial: !0,
  tokenize: lu
}, nu = {
  partial: !0,
  tokenize: iu
};
function tu(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function ru(e, n, t) {
  const r = this;
  let l, o, i, a, s;
  return u;
  function u(d) {
    return f(d);
  }
  function f(d) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(d), c;
  }
  function c(d) {
    return d === 33 ? (e.consume(d), p) : d === 47 ? (e.consume(d), o = !0, w) : d === 63 ? (e.consume(d), l = 3, r.interrupt ? n : m) : Z(d) ? (e.consume(d), i = String.fromCharCode(d), E) : t(d);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), l = 2, h) : d === 91 ? (e.consume(d), l = 5, a = 0, g) : Z(d) ? (e.consume(d), l = 4, r.interrupt ? n : m) : t(d);
  }
  function h(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? n : m) : t(d);
  }
  function g(d) {
    const ce = "CDATA[";
    return d === ce.charCodeAt(a++) ? (e.consume(d), a === ce.length ? r.interrupt ? n : P : g) : t(d);
  }
  function w(d) {
    return Z(d) ? (e.consume(d), i = String.fromCharCode(d), E) : t(d);
  }
  function E(d) {
    if (d === null || d === 47 || d === 62 || Y(d)) {
      const ce = d === 47, Ce = i.toLowerCase();
      return !ce && !o && Xt.includes(Ce) ? (l = 1, r.interrupt ? n(d) : P(d)) : Ja.includes(i.toLowerCase()) ? (l = 6, ce ? (e.consume(d), y) : r.interrupt ? n(d) : P(d)) : (l = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(d) : o ? S(d) : C(d));
    }
    return d === 45 || K(d) ? (e.consume(d), i += String.fromCharCode(d), E) : t(d);
  }
  function y(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? n : P) : t(d);
  }
  function S(d) {
    return O(d) ? (e.consume(d), S) : k(d);
  }
  function C(d) {
    return d === 47 ? (e.consume(d), k) : d === 58 || d === 95 || Z(d) ? (e.consume(d), _) : O(d) ? (e.consume(d), C) : k(d);
  }
  function _(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || K(d) ? (e.consume(d), _) : F(d);
  }
  function F(d) {
    return d === 61 ? (e.consume(d), b) : O(d) ? (e.consume(d), F) : C(d);
  }
  function b(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), s = d, N) : O(d) ? (e.consume(d), b) : H(d);
  }
  function N(d) {
    return d === s ? (e.consume(d), s = null, $) : d === null || z(d) ? t(d) : (e.consume(d), N);
  }
  function H(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || Y(d) ? F(d) : (e.consume(d), H);
  }
  function $(d) {
    return d === 47 || d === 62 || O(d) ? C(d) : t(d);
  }
  function k(d) {
    return d === 62 ? (e.consume(d), v) : t(d);
  }
  function v(d) {
    return d === null || z(d) ? P(d) : O(d) ? (e.consume(d), v) : t(d);
  }
  function P(d) {
    return d === 45 && l === 2 ? (e.consume(d), q) : d === 60 && l === 1 ? (e.consume(d), G) : d === 62 && l === 4 ? (e.consume(d), se) : d === 63 && l === 3 ? (e.consume(d), m) : d === 93 && l === 5 ? (e.consume(d), de) : z(d) && (l === 6 || l === 7) ? (e.exit("htmlFlowData"), e.check(eu, ge, U)(d)) : d === null || z(d) ? (e.exit("htmlFlowData"), U(d)) : (e.consume(d), P);
  }
  function U(d) {
    return e.check(nu, L, ge)(d);
  }
  function L(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), T;
  }
  function T(d) {
    return d === null || z(d) ? U(d) : (e.enter("htmlFlowData"), P(d));
  }
  function q(d) {
    return d === 45 ? (e.consume(d), m) : P(d);
  }
  function G(d) {
    return d === 47 ? (e.consume(d), i = "", ue) : P(d);
  }
  function ue(d) {
    if (d === 62) {
      const ce = i.toLowerCase();
      return Xt.includes(ce) ? (e.consume(d), se) : P(d);
    }
    return Z(d) && i.length < 8 ? (e.consume(d), i += String.fromCharCode(d), ue) : P(d);
  }
  function de(d) {
    return d === 93 ? (e.consume(d), m) : P(d);
  }
  function m(d) {
    return d === 62 ? (e.consume(d), se) : d === 45 && l === 2 ? (e.consume(d), m) : P(d);
  }
  function se(d) {
    return d === null || z(d) ? (e.exit("htmlFlowData"), ge(d)) : (e.consume(d), se);
  }
  function ge(d) {
    return e.exit("htmlFlow"), n(d);
  }
}
function iu(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o) : t(i);
  }
  function o(i) {
    return r.parser.lazy[r.now().line] ? t(i) : n(i);
  }
}
function lu(e, n, t) {
  return r;
  function r(l) {
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), e.attempt(Je, n, t);
  }
}
const ou = {
  name: "htmlText",
  tokenize: au
};
function au(e, n, t) {
  const r = this;
  let l, o, i;
  return a;
  function a(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), s;
  }
  function s(m) {
    return m === 33 ? (e.consume(m), u) : m === 47 ? (e.consume(m), F) : m === 63 ? (e.consume(m), C) : Z(m) ? (e.consume(m), H) : t(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), f) : m === 91 ? (e.consume(m), o = 0, g) : Z(m) ? (e.consume(m), S) : t(m);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), h) : t(m);
  }
  function c(m) {
    return m === null ? t(m) : m === 45 ? (e.consume(m), p) : z(m) ? (i = c, G(m)) : (e.consume(m), c);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), h) : c(m);
  }
  function h(m) {
    return m === 62 ? q(m) : m === 45 ? p(m) : c(m);
  }
  function g(m) {
    const se = "CDATA[";
    return m === se.charCodeAt(o++) ? (e.consume(m), o === se.length ? w : g) : t(m);
  }
  function w(m) {
    return m === null ? t(m) : m === 93 ? (e.consume(m), E) : z(m) ? (i = w, G(m)) : (e.consume(m), w);
  }
  function E(m) {
    return m === 93 ? (e.consume(m), y) : w(m);
  }
  function y(m) {
    return m === 62 ? q(m) : m === 93 ? (e.consume(m), y) : w(m);
  }
  function S(m) {
    return m === null || m === 62 ? q(m) : z(m) ? (i = S, G(m)) : (e.consume(m), S);
  }
  function C(m) {
    return m === null ? t(m) : m === 63 ? (e.consume(m), _) : z(m) ? (i = C, G(m)) : (e.consume(m), C);
  }
  function _(m) {
    return m === 62 ? q(m) : C(m);
  }
  function F(m) {
    return Z(m) ? (e.consume(m), b) : t(m);
  }
  function b(m) {
    return m === 45 || K(m) ? (e.consume(m), b) : N(m);
  }
  function N(m) {
    return z(m) ? (i = N, G(m)) : O(m) ? (e.consume(m), N) : q(m);
  }
  function H(m) {
    return m === 45 || K(m) ? (e.consume(m), H) : m === 47 || m === 62 || Y(m) ? $(m) : t(m);
  }
  function $(m) {
    return m === 47 ? (e.consume(m), q) : m === 58 || m === 95 || Z(m) ? (e.consume(m), k) : z(m) ? (i = $, G(m)) : O(m) ? (e.consume(m), $) : q(m);
  }
  function k(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || K(m) ? (e.consume(m), k) : v(m);
  }
  function v(m) {
    return m === 61 ? (e.consume(m), P) : z(m) ? (i = v, G(m)) : O(m) ? (e.consume(m), v) : $(m);
  }
  function P(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), l = m, U) : z(m) ? (i = P, G(m)) : O(m) ? (e.consume(m), P) : (e.consume(m), L);
  }
  function U(m) {
    return m === l ? (e.consume(m), l = void 0, T) : m === null ? t(m) : z(m) ? (i = U, G(m)) : (e.consume(m), U);
  }
  function L(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? t(m) : m === 47 || m === 62 || Y(m) ? $(m) : (e.consume(m), L);
  }
  function T(m) {
    return m === 47 || m === 62 || Y(m) ? $(m) : t(m);
  }
  function q(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(m);
  }
  function G(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), ue;
  }
  function ue(m) {
    return O(m) ? j(e, de, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : de(m);
  }
  function de(m) {
    return e.enter("htmlTextData"), i(m);
  }
}
const ft = {
  name: "labelEnd",
  resolveAll: fu,
  resolveTo: hu,
  tokenize: pu
}, uu = {
  tokenize: mu
}, su = {
  tokenize: du
}, cu = {
  tokenize: gu
};
function fu(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const l = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += l;
    }
  }
  return e.length !== t.length && le(e, 0, e.length, t), e;
}
function hu(e, n) {
  let t = e.length, r = 0, l, o, i, a;
  for (; t--; )
    if (l = e[t][1], o) {
      if (l.type === "link" || l.type === "labelLink" && l._inactive)
        break;
      e[t][0] === "enter" && l.type === "labelLink" && (l._inactive = !0);
    } else if (i) {
      if (e[t][0] === "enter" && (l.type === "labelImage" || l.type === "labelLink") && !l._balanced && (o = t, l.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else l.type === "labelEnd" && (i = t);
  const s = {
    type: e[o][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[i][1].end
    }
  }, f = {
    type: "labelText",
    start: {
      ...e[o + r + 2][1].end
    },
    end: {
      ...e[i - 2][1].start
    }
  };
  return a = [["enter", s, n], ["enter", u, n]], a = oe(a, e.slice(o + 1, o + r + 3)), a = oe(a, [["enter", f, n]]), a = oe(a, kn(n.parser.constructs.insideSpan.null, e.slice(o + r + 4, i - 3), n)), a = oe(a, [["exit", f, n], e[i - 2], e[i - 1], ["exit", u, n]]), a = oe(a, e.slice(i + 1)), a = oe(a, [["exit", s, n]]), le(e, o, e.length, a), e;
}
function pu(e, n, t) {
  const r = this;
  let l = r.events.length, o, i;
  for (; l--; )
    if ((r.events[l][1].type === "labelImage" || r.events[l][1].type === "labelLink") && !r.events[l][1]._balanced) {
      o = r.events[l][1];
      break;
    }
  return a;
  function a(p) {
    return o ? o._inactive ? c(p) : (i = r.parser.defined.includes(he(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(p), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(p);
  }
  function s(p) {
    return p === 40 ? e.attempt(uu, f, i ? f : c)(p) : p === 91 ? e.attempt(su, f, i ? u : c)(p) : i ? f(p) : c(p);
  }
  function u(p) {
    return e.attempt(cu, f, c)(p);
  }
  function f(p) {
    return n(p);
  }
  function c(p) {
    return o._balanced = !0, t(p);
  }
}
function mu(e, n, t) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), l;
  }
  function l(c) {
    return Y(c) ? Ye(e, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : Vr(e, i, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function i(c) {
    return Y(c) ? Ye(e, s)(c) : f(c);
  }
  function a(c) {
    return t(c);
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40 ? Yr(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function u(c) {
    return Y(c) ? Ye(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), n) : t(c);
  }
}
function du(e, n, t) {
  const r = this;
  return l;
  function l(a) {
    return Wr.call(r, e, o, i, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(he(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function i(a) {
    return t(a);
  }
}
function gu(e, n, t) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), l;
  }
  function l(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), n) : t(o);
  }
}
const yu = {
  name: "labelStartImage",
  resolveAll: ft.resolveAll,
  tokenize: ku
};
function ku(e, n, t) {
  const r = this;
  return l;
  function l(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), i) : t(a);
  }
  function i(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const xu = {
  name: "labelStartLink",
  resolveAll: ft.resolveAll,
  tokenize: bu
};
function bu(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(i), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(i) {
    return i === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(i) : n(i);
  }
}
const vn = {
  name: "lineEnding",
  tokenize: wu
};
function wu(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), j(e, n, "linePrefix");
  }
}
const an = {
  name: "thematicBreak",
  tokenize: Su
};
function Su(e, n, t) {
  let r = 0, l;
  return o;
  function o(u) {
    return e.enter("thematicBreak"), i(u);
  }
  function i(u) {
    return l = u, a(u);
  }
  function a(u) {
    return u === l ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || z(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function s(u) {
    return u === l ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), O(u) ? j(e, a, "whitespace")(u) : a(u));
  }
}
const ee = {
  continuation: {
    tokenize: Au
  },
  exit: vu,
  name: "list",
  tokenize: Iu
}, Cu = {
  partial: !0,
  tokenize: Pu
}, Eu = {
  partial: !0,
  tokenize: Tu
};
function Iu(e, n, t) {
  const r = this, l = r.events[r.events.length - 1];
  let o = l && l[1].type === "linePrefix" ? l[2].sliceSerialize(l[1], !0).length : 0, i = 0;
  return a;
  function a(h) {
    const g = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Xn(h)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(an, t, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return t(h);
  }
  function s(h) {
    return Xn(h) && ++i < 10 ? (e.consume(h), s) : (!r.interrupt || i < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : t(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      Je,
      // Can’t be empty when interrupting.
      r.interrupt ? t : f,
      e.attempt(Cu, p, c)
    );
  }
  function f(h) {
    return r.containerState.initialBlankLine = !0, o++, p(h);
  }
  function c(h) {
    return O(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), p) : t(h);
  }
  function p(h) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(h);
  }
}
function Au(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Je, l, o);
  function l(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, j(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !O(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, i(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Eu, n, i)(a));
  }
  function i(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, j(e, e.attempt(ee, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Tu(e, n, t) {
  const r = this;
  return j(e, l, "listItemIndent", r.containerState.size + 1);
  function l(o) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? n(o) : t(o);
  }
}
function vu(e) {
  e.exit(this.containerState.type);
}
function Pu(e, n, t) {
  const r = this;
  return j(e, l, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function l(o) {
    const i = r.events[r.events.length - 1];
    return !O(o) && i && i[1].type === "listItemPrefixWhitespace" ? n(o) : t(o);
  }
}
const Gt = {
  name: "setextUnderline",
  resolveTo: zu,
  tokenize: Lu
};
function zu(e, n) {
  let t = e.length, r, l, o;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (l = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !o && e[t][1].type === "definition" && (o = t);
  const i = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[l][1].type = "setextHeadingText", o ? (e.splice(l, 0, ["enter", i, n]), e.splice(o + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[o][1].end
  }) : e[r][1] = i, e.push(["exit", i, n]), e;
}
function Lu(e, n, t) {
  const r = this;
  let l;
  return o;
  function o(u) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), l = u, i(u)) : t(u);
  }
  function i(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === l ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), O(u) ? j(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || z(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const _u = {
  tokenize: Du
};
function Du(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Je,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, l, j(e, e.attempt(this.parser.constructs.flow, l, e.attempt(Na, l)), "linePrefix"))
  );
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function l(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const Fu = {
  resolveAll: Gr()
}, Ru = Xr("string"), Mu = Xr("text");
function Xr(e) {
  return {
    resolveAll: Gr(e === "text" ? Ou : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, l = this.parser.constructs[e], o = t.attempt(l, i, a);
    return i;
    function i(f) {
      return u(f) ? o(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        t.consume(f);
        return;
      }
      return t.enter("data"), t.consume(f), s;
    }
    function s(f) {
      return u(f) ? (t.exit("data"), o(f)) : (t.consume(f), s);
    }
    function u(f) {
      if (f === null)
        return !0;
      const c = l[f];
      let p = -1;
      if (c)
        for (; ++p < c.length; ) {
          const h = c[p];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Gr(e) {
  return n;
  function n(t, r) {
    let l = -1, o;
    for (; ++l <= t.length; )
      o === void 0 ? t[l] && t[l][1].type === "data" && (o = l, l++) : (!t[l] || t[l][1].type !== "data") && (l !== o + 2 && (t[o][1].end = t[l - 1][1].end, t.splice(o + 2, l - o - 2), l = o + 2), o = void 0);
    return e ? e(t, r) : t;
  }
}
function Ou(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], l = n.sliceStream(r);
      let o = l.length, i = -1, a = 0, s;
      for (; o--; ) {
        const u = l[o];
        if (typeof u == "string") {
          for (i = u.length; u.charCodeAt(i - 1) === 32; )
            a++, i--;
          if (i) break;
          i = -1;
        } else if (u === -2)
          s = !0, a++;
        else if (u !== -1) {
          o++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (a = 0), a) {
        const u = {
          type: t === e.length || s || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: o ? i : r.start._bufferIndex + i,
            _index: r.start._index + o,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(t, 0, ["enter", u, n], ["exit", u, n]), t += 2);
      }
      t++;
    }
  return e;
}
const Nu = {
  42: ee,
  43: ee,
  45: ee,
  48: ee,
  49: ee,
  50: ee,
  51: ee,
  52: ee,
  53: ee,
  54: ee,
  55: ee,
  56: ee,
  57: ee,
  62: $r
}, Bu = {
  91: Ua
}, ju = {
  [-2]: Tn,
  [-1]: Tn,
  32: Tn
}, $u = {
  35: Ga,
  42: an,
  45: [Gt, an],
  60: Za,
  61: Gt,
  95: an,
  96: Yt,
  126: Yt
}, Hu = {
  38: Ur,
  92: Hr
}, Uu = {
  [-5]: vn,
  [-4]: vn,
  [-3]: vn,
  33: yu,
  38: Ur,
  42: Gn,
  60: [xa, ou],
  91: xu,
  92: [Ya, Hr],
  93: ft,
  95: Gn,
  96: _a
}, qu = {
  null: [Gn, Fu]
}, Vu = {
  null: [42, 95]
}, Wu = {
  null: []
}, Yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Vu,
  contentInitial: Bu,
  disable: Wu,
  document: Nu,
  flow: $u,
  flowInitial: ju,
  insideSpan: qu,
  string: Hu,
  text: Uu
}, Symbol.toStringTag, { value: "Module" }));
function Xu(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const l = {}, o = [];
  let i = [], a = [];
  const s = {
    attempt: N(F),
    check: N(b),
    consume: S,
    enter: C,
    exit: _,
    interrupt: N(b, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: w,
    events: [],
    now: g,
    parser: e,
    previous: null,
    sliceSerialize: p,
    sliceStream: h,
    write: c
  };
  let f = n.tokenize.call(u, s);
  return n.resolveAll && o.push(n), u;
  function c(v) {
    return i = oe(i, v), E(), i[i.length - 1] !== null ? [] : (H(n, 0), u.events = kn(o, u.events, u), u.events);
  }
  function p(v, P) {
    return Qu(h(v), P);
  }
  function h(v) {
    return Gu(i, v);
  }
  function g() {
    const {
      _bufferIndex: v,
      _index: P,
      line: U,
      column: L,
      offset: T
    } = r;
    return {
      _bufferIndex: v,
      _index: P,
      line: U,
      column: L,
      offset: T
    };
  }
  function w(v) {
    l[v.line] = v.column, k();
  }
  function E() {
    let v;
    for (; r._index < i.length; ) {
      const P = i[r._index];
      if (typeof P == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < P.length; )
          y(P.charCodeAt(r._bufferIndex));
      else
        y(P);
    }
  }
  function y(v) {
    f = f(v);
  }
  function S(v) {
    z(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, k()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    i[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = v;
  }
  function C(v, P) {
    const U = P || {};
    return U.type = v, U.start = g(), u.events.push(["enter", U, u]), a.push(U), U;
  }
  function _(v) {
    const P = a.pop();
    return P.end = g(), u.events.push(["exit", P, u]), P;
  }
  function F(v, P) {
    H(v, P.from);
  }
  function b(v, P) {
    P.restore();
  }
  function N(v, P) {
    return U;
    function U(L, T, q) {
      let G, ue, de, m;
      return Array.isArray(L) ? (
        /* c8 ignore next 1 */
        ge(L)
      ) : "tokenize" in L ? (
        // Looks like a construct.
        ge([
          /** @type {Construct} */
          L
        ])
      ) : se(L);
      function se(Q) {
        return Be;
        function Be(be) {
          const Le = be !== null && Q[be], _e = be !== null && Q.null, en = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Le) ? Le : Le ? [Le] : [],
            ...Array.isArray(_e) ? _e : _e ? [_e] : []
          ];
          return ge(en)(be);
        }
      }
      function ge(Q) {
        return G = Q, ue = 0, Q.length === 0 ? q : d(Q[ue]);
      }
      function d(Q) {
        return Be;
        function Be(be) {
          return m = $(), de = Q, Q.partial || (u.currentConstruct = Q), Q.name && u.parser.constructs.disable.null.includes(Q.name) ? Ce() : Q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            P ? Object.assign(Object.create(u), P) : u,
            s,
            ce,
            Ce
          )(be);
        }
      }
      function ce(Q) {
        return v(de, m), T;
      }
      function Ce(Q) {
        return m.restore(), ++ue < G.length ? d(G[ue]) : q;
      }
    }
  }
  function H(v, P) {
    v.resolveAll && !o.includes(v) && o.push(v), v.resolve && le(u.events, P, u.events.length - P, v.resolve(u.events.slice(P), u)), v.resolveTo && (u.events = v.resolveTo(u.events, u));
  }
  function $() {
    const v = g(), P = u.previous, U = u.currentConstruct, L = u.events.length, T = Array.from(a);
    return {
      from: L,
      restore: q
    };
    function q() {
      r = v, u.previous = P, u.currentConstruct = U, u.events.length = L, a = T, k();
    }
  }
  function k() {
    r.line in l && r.column < 2 && (r.column = l[r.line], r.offset += l[r.line] - 1);
  }
}
function Gu(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, l = n.end._index, o = n.end._bufferIndex;
  let i;
  if (t === l)
    i = [e[t].slice(r, o)];
  else {
    if (i = e.slice(t, l), r > -1) {
      const a = i[0];
      typeof a == "string" ? i[0] = a.slice(r) : i.shift();
    }
    o > 0 && i.push(e[l].slice(0, o));
  }
  return i;
}
function Qu(e, n) {
  let t = -1;
  const r = [];
  let l;
  for (; ++t < e.length; ) {
    const o = e[t];
    let i;
    if (typeof o == "string")
      i = o;
    else switch (o) {
      case -5: {
        i = "\r";
        break;
      }
      case -4: {
        i = `
`;
        break;
      }
      case -3: {
        i = `\r
`;
        break;
      }
      case -2: {
        i = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && l) continue;
        i = " ";
        break;
      }
      default:
        i = String.fromCharCode(o);
    }
    l = o === -2, r.push(i);
  }
  return r.join("");
}
function Ku(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Br([Yu, ...(e || {}).extensions || []])
    ),
    content: l(ha),
    defined: [],
    document: l(ma),
    flow: l(_u),
    lazy: {},
    string: l(Ru),
    text: l(Mu)
  };
  return r;
  function l(o) {
    return i;
    function i(a) {
      return Xu(r, o, a);
    }
  }
}
function Ju(e) {
  for (; !qr(e); )
    ;
  return e;
}
const Qt = /[\0\t\n\r]/g;
function Zu() {
  let e = 1, n = "", t = !0, r;
  return l;
  function l(o, i, a) {
    const s = [];
    let u, f, c, p, h;
    for (o = n + (typeof o == "string" ? o.toString() : new TextDecoder(i || void 0).decode(o)), c = 0, n = "", t && (o.charCodeAt(0) === 65279 && c++, t = void 0); c < o.length; ) {
      if (Qt.lastIndex = c, u = Qt.exec(o), p = u && u.index !== void 0 ? u.index : o.length, h = o.charCodeAt(p), !u) {
        n = o.slice(c);
        break;
      }
      if (h === 10 && c === p && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), c < p && (s.push(o.slice(c, p)), e += p - c), h) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, s.push(-2); e++ < f; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = p + 1;
    }
    return a && (r && s.push(-5), n && s.push(n), s.push(null)), s;
  }
}
const es = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function ns(e) {
  return e.replace(es, ts);
}
function ts(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const l = t.charCodeAt(1), o = l === 120 || l === 88;
    return jr(t.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return ct(t) || e;
}
const Qr = {}.hasOwnProperty;
function rs(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), is(t)(Ju(Ku(t).document().write(Zu()(e, n, !0))));
}
function is(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(Et),
      autolinkProtocol: $,
      autolinkEmail: $,
      atxHeading: o(wt),
      blockQuote: o(_e),
      characterEscape: $,
      characterReference: $,
      codeFenced: o(en),
      codeFencedFenceInfo: i,
      codeFencedFenceMeta: i,
      codeIndented: o(en, i),
      codeText: o(Li, i),
      codeTextData: $,
      data: $,
      codeFlowValue: $,
      definition: o(_i),
      definitionDestinationString: i,
      definitionLabelString: i,
      definitionTitleString: i,
      emphasis: o(Di),
      hardBreakEscape: o(St),
      hardBreakTrailing: o(St),
      htmlFlow: o(Ct, i),
      htmlFlowData: $,
      htmlText: o(Ct, i),
      htmlTextData: $,
      image: o(Fi),
      label: i,
      link: o(Et),
      listItem: o(Ri),
      listItemValue: p,
      listOrdered: o(It, c),
      listUnordered: o(It),
      paragraph: o(Mi),
      reference: d,
      referenceString: i,
      resourceDestinationString: i,
      resourceTitleString: i,
      setextHeading: o(wt),
      strong: o(Oi),
      thematicBreak: o(Bi)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: F,
      autolink: s(),
      autolinkEmail: Le,
      autolinkProtocol: be,
      blockQuote: s(),
      characterEscapeValue: k,
      characterReferenceMarkerHexadecimal: Ce,
      characterReferenceMarkerNumeric: Ce,
      characterReferenceValue: Q,
      characterReference: Be,
      codeFenced: s(E),
      codeFencedFence: w,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: g,
      codeFlowValue: k,
      codeIndented: s(y),
      codeText: s(T),
      codeTextData: k,
      data: k,
      definition: s(),
      definitionDestinationString: _,
      definitionLabelString: S,
      definitionTitleString: C,
      emphasis: s(),
      hardBreakEscape: s(P),
      hardBreakTrailing: s(P),
      htmlFlow: s(U),
      htmlFlowData: k,
      htmlText: s(L),
      htmlTextData: k,
      image: s(G),
      label: de,
      labelText: ue,
      lineEnding: v,
      link: s(q),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ce,
      resourceDestinationString: m,
      resourceTitleString: se,
      resource: ge,
      setextHeading: s(H),
      setextHeadingLineSequence: N,
      setextHeadingText: b,
      strong: s(),
      thematicBreak: s()
    }
  };
  Kr(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(x) {
    let A = {
      type: "root",
      children: []
    };
    const R = {
      stack: [A],
      tokenStack: [],
      config: n,
      enter: a,
      exit: u,
      buffer: i,
      resume: f,
      data: t
    }, B = [];
    let V = -1;
    for (; ++V < x.length; )
      if (x[V][1].type === "listOrdered" || x[V][1].type === "listUnordered")
        if (x[V][0] === "enter")
          B.push(V);
        else {
          const fe = B.pop();
          V = l(x, fe, V);
        }
    for (V = -1; ++V < x.length; ) {
      const fe = n[x[V][0]];
      Qr.call(fe, x[V][1].type) && fe[x[V][1].type].call(Object.assign({
        sliceSerialize: x[V][2].sliceSerialize
      }, R), x[V][1]);
    }
    if (R.tokenStack.length > 0) {
      const fe = R.tokenStack[R.tokenStack.length - 1];
      (fe[1] || Kt).call(R, void 0, fe[0]);
    }
    for (A.position = {
      start: we(x.length > 0 ? x[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: we(x.length > 0 ? x[x.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, V = -1; ++V < n.transforms.length; )
      A = n.transforms[V](A) || A;
    return A;
  }
  function l(x, A, R) {
    let B = A - 1, V = -1, fe = !1, Ee, ye, je, $e;
    for (; ++B <= R; ) {
      const re = x[B];
      switch (re[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          re[0] === "enter" ? V++ : V--, $e = void 0;
          break;
        }
        case "lineEndingBlank": {
          re[0] === "enter" && (Ee && !$e && !V && !je && (je = B), $e = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          $e = void 0;
      }
      if (!V && re[0] === "enter" && re[1].type === "listItemPrefix" || V === -1 && re[0] === "exit" && (re[1].type === "listUnordered" || re[1].type === "listOrdered")) {
        if (Ee) {
          let De = B;
          for (ye = void 0; De--; ) {
            const ke = x[De];
            if (ke[1].type === "lineEnding" || ke[1].type === "lineEndingBlank") {
              if (ke[0] === "exit") continue;
              ye && (x[ye][1].type = "lineEndingBlank", fe = !0), ke[1].type = "lineEnding", ye = De;
            } else if (!(ke[1].type === "linePrefix" || ke[1].type === "blockQuotePrefix" || ke[1].type === "blockQuotePrefixWhitespace" || ke[1].type === "blockQuoteMarker" || ke[1].type === "listItemIndent")) break;
          }
          je && (!ye || je < ye) && (Ee._spread = !0), Ee.end = Object.assign({}, ye ? x[ye][1].start : re[1].end), x.splice(ye || B, 0, ["exit", Ee, re[2]]), B++, R++;
        }
        if (re[1].type === "listItemPrefix") {
          const De = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, re[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ee = De, x.splice(B, 0, ["enter", De, re[2]]), B++, R++, je = void 0, $e = !0;
        }
      }
    }
    return x[A][1]._spread = fe, R;
  }
  function o(x, A) {
    return R;
    function R(B) {
      a.call(this, x(B), B), A && A.call(this, B);
    }
  }
  function i() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(x, A, R) {
    this.stack[this.stack.length - 1].children.push(x), this.stack.push(x), this.tokenStack.push([A, R || void 0]), x.position = {
      start: we(A.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(x) {
    return A;
    function A(R) {
      x && x.call(this, R), u.call(this, R);
    }
  }
  function u(x, A) {
    const R = this.stack.pop(), B = this.tokenStack.pop();
    if (B)
      B[0].type !== x.type && (A ? A.call(this, x, B[0]) : (B[1] || Kt).call(this, x, B[0]));
    else throw new Error("Cannot close `" + x.type + "` (" + We({
      start: x.start,
      end: x.end
    }) + "): it’s not open");
    R.position.end = we(x.end);
  }
  function f() {
    return st(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function p(x) {
    if (this.data.expectingFirstListItemValue) {
      const A = this.stack[this.stack.length - 2];
      A.start = Number.parseInt(this.sliceSerialize(x), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.lang = x;
  }
  function g() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.meta = x;
  }
  function w() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function E() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = x.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = x.replace(/(\r?\n|\r)$/g, "");
  }
  function S(x) {
    const A = this.resume(), R = this.stack[this.stack.length - 1];
    R.label = A, R.identifier = he(this.sliceSerialize(x)).toLowerCase();
  }
  function C() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = x;
  }
  function _() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = x;
  }
  function F(x) {
    const A = this.stack[this.stack.length - 1];
    if (!A.depth) {
      const R = this.sliceSerialize(x).length;
      A.depth = R;
    }
  }
  function b() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function N(x) {
    const A = this.stack[this.stack.length - 1];
    A.depth = this.sliceSerialize(x).codePointAt(0) === 61 ? 1 : 2;
  }
  function H() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function $(x) {
    const R = this.stack[this.stack.length - 1].children;
    let B = R[R.length - 1];
    (!B || B.type !== "text") && (B = Ni(), B.position = {
      start: we(x.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, R.push(B)), this.stack.push(B);
  }
  function k(x) {
    const A = this.stack.pop();
    A.value += this.sliceSerialize(x), A.position.end = we(x.end);
  }
  function v(x) {
    const A = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const R = A.children[A.children.length - 1];
      R.position.end = we(x.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(A.type) && ($.call(this, x), k.call(this, x));
  }
  function P() {
    this.data.atHardBreak = !0;
  }
  function U() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = x;
  }
  function L() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = x;
  }
  function T() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = x;
  }
  function q() {
    const x = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = A, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function G() {
    const x = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      x.type += "Reference", x.referenceType = A, delete x.url, delete x.title;
    } else
      delete x.identifier, delete x.label;
    this.data.referenceType = void 0;
  }
  function ue(x) {
    const A = this.sliceSerialize(x), R = this.stack[this.stack.length - 2];
    R.label = ns(A), R.identifier = he(A).toLowerCase();
  }
  function de() {
    const x = this.stack[this.stack.length - 1], A = this.resume(), R = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, R.type === "link") {
      const B = x.children;
      R.children = B;
    } else
      R.alt = A;
  }
  function m() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = x;
  }
  function se() {
    const x = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = x;
  }
  function ge() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function ce(x) {
    const A = this.resume(), R = this.stack[this.stack.length - 1];
    R.label = A, R.identifier = he(this.sliceSerialize(x)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ce(x) {
    this.data.characterReferenceType = x.type;
  }
  function Q(x) {
    const A = this.sliceSerialize(x), R = this.data.characterReferenceType;
    let B;
    R ? (B = jr(A, R === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : B = ct(A);
    const V = this.stack[this.stack.length - 1];
    V.value += B;
  }
  function Be(x) {
    const A = this.stack.pop();
    A.position.end = we(x.end);
  }
  function be(x) {
    k.call(this, x);
    const A = this.stack[this.stack.length - 1];
    A.url = this.sliceSerialize(x);
  }
  function Le(x) {
    k.call(this, x);
    const A = this.stack[this.stack.length - 1];
    A.url = "mailto:" + this.sliceSerialize(x);
  }
  function _e() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function en() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Li() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function _i() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Di() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function wt() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function St() {
    return {
      type: "break"
    };
  }
  function Ct() {
    return {
      type: "html",
      value: ""
    };
  }
  function Fi() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Et() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function It(x) {
    return {
      type: "list",
      ordered: x.type === "listOrdered",
      start: null,
      spread: x._spread,
      children: []
    };
  }
  function Ri(x) {
    return {
      type: "listItem",
      spread: x._spread,
      checked: null,
      children: []
    };
  }
  function Mi() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Oi() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ni() {
    return {
      type: "text",
      value: ""
    };
  }
  function Bi() {
    return {
      type: "thematicBreak"
    };
  }
}
function we(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Kr(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Kr(e, r) : ls(e, r);
  }
}
function ls(e, n) {
  let t;
  for (t in n)
    if (Qr.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function Kt(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + We({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + We({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + We({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function os(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return rs(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
function as(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function us(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function ss(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, l = n.lang ? n.lang.split(/\s+/) : [];
  l.length > 0 && (r.className = ["language-" + l[0]]);
  let o = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (o.data = { meta: n.meta }), e.patch(n, o), o = e.applyData(n, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(n, o), o;
}
function cs(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function fs(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function hs(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), l = Ne(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let i, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), i = e.footnoteOrder.length) : i = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + l,
      id: t + "fnref-" + l + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(i) }]
  };
  e.patch(n, s);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(n, u), e.applyData(n, u);
}
function ps(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ms(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function Jr(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const l = e.all(n), o = l[0];
  o && o.type === "text" ? o.value = "[" + o.value : l.unshift({ type: "text", value: "[" });
  const i = l[l.length - 1];
  return i && i.type === "text" ? i.value += r : l.push({ type: "text", value: r }), l;
}
function ds(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Jr(e, n);
  const l = { src: Ne(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (l.title = r.title);
  const o = { type: "element", tagName: "img", properties: l, children: [] };
  return e.patch(n, o), e.applyData(n, o);
}
function gs(e, n) {
  const t = { src: Ne(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function ys(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function ks(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Jr(e, n);
  const l = { href: Ne(r.url || "") };
  r.title !== null && r.title !== void 0 && (l.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: l,
    children: e.all(n)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function xs(e, n) {
  const t = { href: Ne(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function bs(e, n, t) {
  const r = e.all(n), l = t ? ws(t) : Zr(n), o = {}, i = [];
  if (typeof n.checked == "boolean") {
    const f = r[0];
    let c;
    f && f.type === "element" && f.tagName === "p" ? c = f : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const f = r[a];
    (l || a !== 0 || f.type !== "element" || f.tagName !== "p") && i.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !l ? i.push(...f.children) : i.push(f);
  }
  const s = r[r.length - 1];
  s && (l || s.type !== "element" || s.tagName !== "p") && i.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: o, children: i };
  return e.patch(n, u), e.applyData(n, u);
}
function ws(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Zr(t[r]);
  }
  return n;
}
function Zr(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function Ss(e, n) {
  const t = {}, r = e.all(n);
  let l = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++l < r.length; ) {
    const i = r[l];
    if (i.type === "element" && i.tagName === "li" && i.properties && Array.isArray(i.properties.className) && i.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Cs(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Es(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Is(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function As(e, n) {
  const t = e.all(n), r = t.shift(), l = [];
  if (r) {
    const i = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], i), l.push(i);
  }
  if (t.length > 0) {
    const i = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = lt(n.children[1]), s = _r(n.children[n.children.length - 1]);
    a && s && (i.position = { start: a, end: s }), l.push(i);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(l, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Ts(e, n, t) {
  const r = t ? t.children : void 0, o = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", i = t && t.type === "table" ? t.align : void 0, a = i ? i.length : n.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const c = n.children[s], p = {}, h = i ? i[s] : void 0;
    h && (p.align = h);
    let g = { type: "element", tagName: o, properties: p, children: [] };
    c && (g.children = e.all(c), e.patch(c, g), g = e.applyData(c, g)), u.push(g);
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(n, f), e.applyData(n, f);
}
function vs(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Jt = 9, Zt = 32;
function Ps(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), l = 0;
  const o = [];
  for (; r; )
    o.push(
      er(n.slice(l, r.index), l > 0, !0),
      r[0]
    ), l = r.index + r[0].length, r = t.exec(n);
  return o.push(er(n.slice(l), l > 0, !1)), o.join("");
}
function er(e, n, t) {
  let r = 0, l = e.length;
  if (n) {
    let o = e.codePointAt(r);
    for (; o === Jt || o === Zt; )
      r++, o = e.codePointAt(r);
  }
  if (t) {
    let o = e.codePointAt(l - 1);
    for (; o === Jt || o === Zt; )
      l--, o = e.codePointAt(l - 1);
  }
  return l > r ? e.slice(r, l) : "";
}
function zs(e, n) {
  const t = { type: "text", value: Ps(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Ls(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const _s = {
  blockquote: as,
  break: us,
  code: ss,
  delete: cs,
  emphasis: fs,
  footnoteReference: hs,
  heading: ps,
  html: ms,
  imageReference: ds,
  image: gs,
  inlineCode: ys,
  linkReference: ks,
  link: xs,
  listItem: bs,
  list: Ss,
  paragraph: Cs,
  // @ts-expect-error: root is different, but hard to type.
  root: Es,
  strong: Is,
  table: As,
  tableCell: vs,
  tableRow: Ts,
  text: zs,
  thematicBreak: Ls,
  toml: nn,
  yaml: nn,
  definition: nn,
  footnoteDefinition: nn
};
function nn() {
}
const ei = -1, xn = 0, Xe = 1, hn = 2, ht = 3, pt = 4, mt = 5, dt = 6, ni = 7, ti = 8, ri = typeof self == "object" ? self : globalThis, nr = (e, n) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new ri[e](n);
}, Ds = (e, n) => {
  const t = (l, o) => (e.set(o, l), l), r = (l) => {
    if (e.has(l))
      return e.get(l);
    const [o, i] = n[l];
    switch (o) {
      case xn:
      case ei:
        return t(i, l);
      case Xe: {
        const a = t([], l);
        for (const s of i)
          a.push(r(s));
        return a;
      }
      case hn: {
        const a = t({}, l);
        for (const [s, u] of i)
          a[r(s)] = r(u);
        return a;
      }
      case ht:
        return t(new Date(i), l);
      case pt: {
        const { source: a, flags: s } = i;
        return t(new RegExp(a, s), l);
      }
      case mt: {
        const a = t(/* @__PURE__ */ new Map(), l);
        for (const [s, u] of i)
          a.set(r(s), r(u));
        return a;
      }
      case dt: {
        const a = t(/* @__PURE__ */ new Set(), l);
        for (const s of i)
          a.add(r(s));
        return a;
      }
      case ni: {
        const { name: a, message: s } = i;
        return t(
          typeof ri[a] == "function" ? nr(a, s) : new Error(s),
          l
        );
      }
      case ti:
        return t(BigInt(i), l);
      case "BigInt":
        return t(Object(BigInt(i)), l);
      case "ArrayBuffer":
        return t(new Uint8Array(i).buffer, i);
      case "DataView": {
        const { buffer: a } = new Uint8Array(i);
        return t(new DataView(a), i);
      }
    }
    return t(nr(o, i), l);
  };
  return r;
}, tr = (e) => Ds(/* @__PURE__ */ new Map(), e)(0), Ae = "", { toString: Fs } = {}, { keys: Rs } = Object, Ve = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [xn, n];
  const t = Fs.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Xe, Ae];
    case "Object":
      return [hn, Ae];
    case "Date":
      return [ht, Ae];
    case "RegExp":
      return [pt, Ae];
    case "Map":
      return [mt, Ae];
    case "Set":
      return [dt, Ae];
    case "DataView":
      return [Xe, t];
  }
  return t.includes("Array") ? [Xe, t] : e instanceof Error ? [ni, e.name || "Error"] : [hn, t];
}, tn = ([e, n]) => e === xn && (n === "function" || n === "symbol"), Ms = (e, n, t, r) => {
  const l = (i, a) => {
    const s = r.push(i) - 1;
    return t.set(a, s), s;
  }, o = (i) => {
    if (t.has(i))
      return t.get(i);
    let [a, s] = Ve(i);
    switch (a) {
      case xn: {
        let f = i;
        switch (s) {
          case "bigint":
            a = ti, f = i.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            f = null;
            break;
          case "undefined":
            return l([ei], i);
        }
        return l([a, f], i);
      }
      case Xe: {
        if (s) {
          let p = i;
          return s === "DataView" ? p = new Uint8Array(i.buffer) : s === "ArrayBuffer" && (p = new Uint8Array(i)), l([s, [...p]], i);
        }
        const f = [], c = l([a, f], i);
        for (const p of i)
          f.push(o(p));
        return c;
      }
      case hn: {
        if (s)
          switch (s) {
            case "BigInt":
              return l([s, i.toString()], i);
            case "Boolean":
            case "Number":
            case "String":
              return l([s, i.valueOf()], i);
          }
        if (n && "toJSON" in i)
          return o(i.toJSON());
        const f = [], c = l([a, f], i);
        for (const p of Rs(i))
          (e || !tn(Ve(i[p]))) && f.push([o(p), o(i[p])]);
        return c;
      }
      case ht:
        return l([a, isNaN(i.getTime()) ? Ae : i.toISOString()], i);
      case pt: {
        const { source: f, flags: c } = i;
        return l([a, { source: f, flags: c }], i);
      }
      case mt: {
        const f = [], c = l([a, f], i);
        for (const [p, h] of i)
          (e || !(tn(Ve(p)) || tn(Ve(h)))) && f.push([o(p), o(h)]);
        return c;
      }
      case dt: {
        const f = [], c = l([a, f], i);
        for (const p of i)
          (e || !tn(Ve(p))) && f.push(o(p));
        return c;
      }
    }
    const { message: u } = i;
    return l([a, { name: s, message: u }], i);
  };
  return o;
}, rr = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Ms(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, pn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? tr(rr(e, n)) : structuredClone(e)
) : (e, n) => tr(rr(e, n));
function Os(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function Ns(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Bs(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || Os, r = e.options.footnoteBackLabel || Ns, l = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", i = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const f = e.all(u), c = String(u.identifier).toUpperCase(), p = Ne(c.toLowerCase());
    let h = 0;
    const g = [], w = e.footnoteCounts.get(c);
    for (; w !== void 0 && ++h <= w; ) {
      g.length > 0 && g.push({ type: "text", value: " " });
      let S = typeof t == "string" ? t : t(s, h);
      typeof S == "string" && (S = { type: "text", value: S }), g.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + p + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(S) ? S : [S]
      });
    }
    const E = f[f.length - 1];
    if (E && E.type === "element" && E.tagName === "p") {
      const S = E.children[E.children.length - 1];
      S && S.type === "text" ? S.value += " " : E.children.push({ type: "text", value: " " }), E.children.push(...g);
    } else
      f.push(...g);
    const y = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + p },
      children: e.wrap(f, !0)
    };
    e.patch(u, y), a.push(y);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: o,
          properties: {
            ...pn(i),
            id: "footnote-label"
          },
          children: [{ type: "text", value: l }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const bn = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(e) {
    if (e == null)
      return Us;
    if (typeof e == "function")
      return wn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? js(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        $s(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Hs(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function js(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = bn(e[t]);
  return wn(r);
  function r(...l) {
    let o = -1;
    for (; ++o < n.length; )
      if (n[o].apply(this, l)) return !0;
    return !1;
  }
}
function $s(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return wn(t);
  function t(r) {
    const l = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (l[o] !== n[o]) return !1;
    return !0;
  }
}
function Hs(e) {
  return wn(n);
  function n(t) {
    return t && t.type === e;
  }
}
function wn(e) {
  return n;
  function n(t, r, l) {
    return !!(qs(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      l || void 0
    ));
  }
}
function Us() {
  return !0;
}
function qs(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ii = [], Vs = !0, Qn = !1, Ws = "skip";
function li(e, n, t, r) {
  let l;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : l = n;
  const o = bn(l), i = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, u, f) {
    const c = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof c.type == "string") {
      const h = (
        // `hast`
        typeof c.tagName == "string" ? c.tagName : (
          // `xast`
          typeof c.name == "string" ? c.name : void 0
        )
      );
      Object.defineProperty(p, "name", {
        value: "node (" + (s.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return p;
    function p() {
      let h = ii, g, w, E;
      if ((!n || o(s, u, f[f.length - 1] || void 0)) && (h = Ys(t(s, f)), h[0] === Qn))
        return h;
      if ("children" in s && s.children) {
        const y = (
          /** @type {UnistParent} */
          s
        );
        if (y.children && h[0] !== Ws)
          for (w = (r ? y.children.length : -1) + i, E = f.concat(y); w > -1 && w < y.children.length; ) {
            const S = y.children[w];
            if (g = a(S, w, E)(), g[0] === Qn)
              return g;
            w = typeof g[1] == "number" ? g[1] : w + i;
          }
      }
      return h;
    }
  }
}
function Ys(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Vs, e] : e == null ? ii : [e];
}
function gt(e, n, t, r) {
  let l, o, i;
  typeof n == "function" && typeof t != "function" ? (o = void 0, i = n, l = t) : (o = n, i = t, l = r), li(e, o, a, l);
  function a(s, u) {
    const f = u[u.length - 1], c = f ? f.children.indexOf(s) : void 0;
    return i(s, c, f);
  }
}
const Kn = {}.hasOwnProperty, Xs = {};
function Gs(e, n) {
  const t = n || Xs, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = { ..._s, ...t.handlers }, a = {
    all: u,
    applyData: Ks,
    definitionById: r,
    footnoteById: l,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: i,
    one: s,
    options: t,
    patch: Qs,
    wrap: Zs
  };
  return gt(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : l, p = String(f.identifier).toUpperCase();
      c.has(p) || c.set(p, f);
    }
  }), a;
  function s(f, c) {
    const p = f.type, h = a.handlers[p];
    if (Kn.call(a.handlers, p) && h)
      return h(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(p)) {
      if ("children" in f) {
        const { children: w, ...E } = f, y = pn(E);
        return y.children = a.all(f), y;
      }
      return pn(f);
    }
    return (a.options.unknownHandler || Js)(a, f, c);
  }
  function u(f) {
    const c = [];
    if ("children" in f) {
      const p = f.children;
      let h = -1;
      for (; ++h < p.length; ) {
        const g = a.one(p[h], f);
        if (g) {
          if (h && p[h - 1].type === "break" && (!Array.isArray(g) && g.type === "text" && (g.value = ir(g.value)), !Array.isArray(g) && g.type === "element")) {
            const w = g.children[0];
            w && w.type === "text" && (w.value = ir(w.value));
          }
          Array.isArray(g) ? c.push(...g) : c.push(g);
        }
      }
    }
    return c;
  }
}
function Qs(e, n) {
  e.position && (n.position = No(e));
}
function Ks(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, l = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const i = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: i };
      }
    t.type === "element" && o && Object.assign(t.properties, pn(o)), "children" in t && t.children && l !== null && l !== void 0 && (t.children = l);
  }
  return t;
}
function Js(e, n) {
  const t = n.data || {}, r = "value" in n && !(Kn.call(t, "hProperties") || Kn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Zs(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function ir(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function lr(e, n) {
  const t = Gs(e, n), r = t.one(e, void 0), l = Bs(t), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return l && o.children.push({ type: "text", value: `
` }, l), o;
}
function ec(e, n) {
  return e && "run" in e ? async function(t, r) {
    const l = (
      /** @type {HastRoot} */
      lr(t, { file: r, ...n })
    );
    await e.run(l, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      lr(t, { file: r, ...e || n })
    );
  };
}
function or(e) {
  if (e)
    throw e;
}
var Pn, ar;
function nc() {
  if (ar) return Pn;
  ar = 1;
  var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, l = function(u) {
    return typeof Array.isArray == "function" ? Array.isArray(u) : n.call(u) === "[object Array]";
  }, o = function(u) {
    if (!u || n.call(u) !== "[object Object]")
      return !1;
    var f = e.call(u, "constructor"), c = u.constructor && u.constructor.prototype && e.call(u.constructor.prototype, "isPrototypeOf");
    if (u.constructor && !f && !c)
      return !1;
    var p;
    for (p in u)
      ;
    return typeof p > "u" || e.call(u, p);
  }, i = function(u, f) {
    t && f.name === "__proto__" ? t(u, f.name, {
      enumerable: !0,
      configurable: !0,
      value: f.newValue,
      writable: !0
    }) : u[f.name] = f.newValue;
  }, a = function(u, f) {
    if (f === "__proto__")
      if (e.call(u, f)) {
        if (r)
          return r(u, f).value;
      } else return;
    return u[f];
  };
  return Pn = function s() {
    var u, f, c, p, h, g, w = arguments[0], E = 1, y = arguments.length, S = !1;
    for (typeof w == "boolean" && (S = w, w = arguments[1] || {}, E = 2), (w == null || typeof w != "object" && typeof w != "function") && (w = {}); E < y; ++E)
      if (u = arguments[E], u != null)
        for (f in u)
          c = a(w, f), p = a(u, f), w !== p && (S && p && (o(p) || (h = l(p))) ? (h ? (h = !1, g = c && l(c) ? c : []) : g = c && o(c) ? c : {}, i(w, { name: f, newValue: s(S, g, p) })) : typeof p < "u" && i(w, { name: f, newValue: p }));
    return w;
  }, Pn;
}
var tc = nc();
const zn = /* @__PURE__ */ Lr(tc);
function Jn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function rc() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...l) {
    let o = -1;
    const i = l.pop();
    if (typeof i != "function")
      throw new TypeError("Expected function as last argument, not " + i);
    a(null, ...l);
    function a(s, ...u) {
      const f = e[++o];
      let c = -1;
      if (s) {
        i(s);
        return;
      }
      for (; ++c < l.length; )
        (u[c] === null || u[c] === void 0) && (u[c] = l[c]);
      l = u, f ? ic(f, a)(...u) : i(null, ...u);
    }
  }
  function r(l) {
    if (typeof l != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + l
      );
    return e.push(l), n;
  }
}
function ic(e, n) {
  let t;
  return r;
  function r(...i) {
    const a = e.length > i.length;
    let s;
    a && i.push(l);
    try {
      s = e.apply(this, i);
    } catch (u) {
      const f = (
        /** @type {Error} */
        u
      );
      if (a && t)
        throw f;
      return l(f);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(o, l) : s instanceof Error ? l(s) : o(s));
  }
  function l(i, ...a) {
    t || (t = !0, n(i, ...a));
  }
  function o(i) {
    l(null, i);
  }
}
const pe = { basename: lc, dirname: oc, extname: ac, join: uc, sep: "/" };
function lc(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  Ze(e);
  let t = 0, r = -1, l = e.length, o;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; l--; )
      if (e.codePointAt(l) === 47) {
        if (o) {
          t = l + 1;
          break;
        }
      } else r < 0 && (o = !0, r = l + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let i = -1, a = n.length - 1;
  for (; l--; )
    if (e.codePointAt(l) === 47) {
      if (o) {
        t = l + 1;
        break;
      }
    } else
      i < 0 && (o = !0, i = l + 1), a > -1 && (e.codePointAt(l) === n.codePointAt(a--) ? a < 0 && (r = l) : (a = -1, r = i));
  return t === r ? r = i : r < 0 && (r = e.length), e.slice(t, r);
}
function oc(e) {
  if (Ze(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function ac(e) {
  Ze(e);
  let n = e.length, t = -1, r = 0, l = -1, o = 0, i;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (i) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (i = !0, t = n + 1), a === 46 ? l < 0 ? l = n : o !== 1 && (o = 1) : l > -1 && (o = -1);
  }
  return l < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && l === t - 1 && l === r + 1 ? "" : e.slice(l, t);
}
function uc(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    Ze(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : sc(t);
}
function sc(e) {
  Ze(e);
  const n = e.codePointAt(0) === 47;
  let t = cc(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function cc(e, n) {
  let t = "", r = 0, l = -1, o = 0, i = -1, a, s;
  for (; ++i <= e.length; ) {
    if (i < e.length)
      a = e.codePointAt(i);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(l === i - 1 || o === 1)) if (l !== i - 1 && o === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), l = i, o = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, l = i, o = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(l + 1, i) : t = e.slice(l + 1, i), r = i - l - 1;
      l = i, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return t;
}
function Ze(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const fc = { cwd: hc };
function hc() {
  return "/";
}
function Zn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function pc(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Zn(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return mc(e);
}
function mc(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const l = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw l.code = "ERR_INVALID_FILE_URL_PATH", l;
      }
    }
  return decodeURIComponent(n);
}
const Ln = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class oi {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(n) {
    let t;
    n ? Zn(n) ? t = { path: n } : typeof n == "string" || dc(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : fc.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Ln.length; ) {
      const o = Ln[r];
      o in t && t[o] !== void 0 && t[o] !== null && (this[o] = o === "history" ? [...t[o]] : t[o]);
    }
    let l;
    for (l in t)
      Ln.includes(l) || (this[l] = t[l]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? pe.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(n) {
    Dn(n, "basename"), _n(n, "basename"), this.path = pe.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? pe.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(n) {
    ur(this.basename, "dirname"), this.path = pe.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? pe.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(n) {
    if (_n(n, "extname"), ur(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = pe.join(this.dirname, this.stem + (n || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(n) {
    Zn(n) && (n = pc(n)), Dn(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? pe.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(n) {
    Dn(n, "stem"), _n(n, "stem"), this.path = pe.join(this.dirname || "", n + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(n, t, r) {
    const l = this.message(n, t, r);
    throw l.fatal = !0, l;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(n, t, r) {
    const l = this.message(n, t, r);
    return l.fatal = void 0, l;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(n, t, r) {
    const l = new J(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (l.name = this.path + ":" + l.name, l.file = this.path), l.fatal = !1, this.messages.push(l), l;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function _n(e, n) {
  if (e && e.includes(pe.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + pe.sep + "`"
    );
}
function Dn(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function ur(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function dc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const gc = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), l = r[e], o = function() {
      return l.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  })
), yc = {}.hasOwnProperty;
class yt extends gc {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = rc();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new yt()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(zn(!0, {}, this.namespace)), n;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (Mn("data", this.frozen), this.namespace[n] = t, this) : yc.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Mn("data", this.frozen), this.namespace = n, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const l = t.call(n, ...r);
      typeof l == "function" && this.transformers.use(l);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(n) {
    this.freeze();
    const t = rn(n), r = this.parser || this.Parser;
    return Fn("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(n, t) {
    const r = this;
    return this.freeze(), Fn("process", this.parser || this.Parser), Rn("process", this.compiler || this.Compiler), t ? l(void 0, t) : new Promise(l);
    function l(o, i) {
      const a = rn(n), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(f, c, p) {
        if (f || !c || !p)
          return u(f);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), g = r.stringify(h, p);
        bc(g) ? p.value = g : p.result = g, u(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          p
        );
      });
      function u(f, c) {
        f || !c ? i(f) : o ? o(c) : t(void 0, c);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(n) {
    let t = !1, r;
    return this.freeze(), Fn("processSync", this.parser || this.Parser), Rn("processSync", this.compiler || this.Compiler), this.process(n, l), cr("processSync", "process", t), r;
    function l(o, i) {
      t = !0, or(o), r = i;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(n, t, r) {
    sr(n), this.freeze();
    const l = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? o(void 0, r) : new Promise(o);
    function o(i, a) {
      const s = rn(t);
      l.run(n, s, u);
      function u(f, c, p) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || n
        );
        f ? a(f) : i ? i(h) : r(void 0, h, p);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(n, t) {
    let r = !1, l;
    return this.run(n, t, o), cr("runSync", "run", r), l;
    function o(i, a) {
      or(i), l = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(n, t) {
    this.freeze();
    const r = rn(t), l = this.compiler || this.Compiler;
    return Rn("stringify", l), sr(n), l(n, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(n, ...t) {
    const r = this.attachers, l = this.namespace;
    if (Mn("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : i(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function o(u) {
      if (typeof u == "function")
        s(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [f, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(f, c);
        } else
          i(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function i(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (l.settings = zn(!0, l.settings, u.settings));
    }
    function a(u) {
      let f = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++f < u.length; ) {
          const c = u[f];
          o(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, f) {
      let c = -1, p = -1;
      for (; ++c < r.length; )
        if (r[c][0] === u) {
          p = c;
          break;
        }
      if (p === -1)
        r.push([u, ...f]);
      else if (f.length > 0) {
        let [h, ...g] = f;
        const w = r[p][1];
        Jn(w) && Jn(h) && (h = zn(!0, w, h)), r[p] = [u, h, ...g];
      }
    }
  }
}
const kc = new yt().freeze();
function Fn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Rn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Mn(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function sr(e) {
  if (!Jn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function cr(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function rn(e) {
  return xc(e) ? e : new oi(e);
}
function xc(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function bc(e) {
  return typeof e == "string" || wc(e);
}
function wc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Sc = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", fr = [], hr = { allowDangerousHtml: !0 }, Cc = /^(https?|ircs?|mailto|xmpp)$/i, Ec = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Ic(e) {
  const n = Ac(e), t = Tc(e);
  return vc(n.runSync(n.parse(t), t), e);
}
function Ac(e) {
  const n = e.rehypePlugins || fr, t = e.remarkPlugins || fr, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...hr } : hr;
  return kc().use(os).use(t).use(ec, r).use(n);
}
function Tc(e) {
  const n = e.children || "", t = new oi();
  return typeof n == "string" && (t.value = n), t;
}
function vc(e, n) {
  const t = n.allowedElements, r = n.allowElement, l = n.components, o = n.disallowedElements, i = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || Pc;
  for (const f of Ec)
    Object.hasOwn(n, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + Sc + f.id, void 0);
  return gt(e, u), Uo(e, {
    Fragment: tt,
    components: l,
    ignoreInvalidStyle: !0,
    jsx: M,
    jsxs: ne,
    passKeys: !0,
    passNode: !0
  });
  function u(f, c, p) {
    if (f.type === "raw" && p && typeof c == "number")
      return i ? p.children.splice(c, 1) : p.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let h;
      for (h in An)
        if (Object.hasOwn(An, h) && Object.hasOwn(f.properties, h)) {
          const g = f.properties[h], w = An[h];
          (w === null || w.includes(f.tagName)) && (f.properties[h] = s(String(g || ""), h, f));
        }
    }
    if (f.type === "element") {
      let h = t ? !t.includes(f.tagName) : o ? o.includes(f.tagName) : !1;
      if (!h && r && typeof c == "number" && (h = !r(f, c, p)), h && p && typeof c == "number")
        return a && f.children ? p.children.splice(c, 1, ...f.children) : p.children.splice(c, 1), c;
    }
  }
}
function Pc(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), l = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    l !== -1 && n > l || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    Cc.test(e.slice(0, n)) ? e : ""
  );
}
function pr(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, l = t.indexOf(n);
  for (; l !== -1; )
    r++, l = t.indexOf(n, l + n.length);
  return r;
}
function zc(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Lc(e, n, t) {
  const l = bn((t || {}).ignore || []), o = _c(n);
  let i = -1;
  for (; ++i < o.length; )
    li(e, "text", a);
  function a(u, f) {
    let c = -1, p;
    for (; ++c < f.length; ) {
      const h = f[c], g = p ? p.children : void 0;
      if (l(
        h,
        g ? g.indexOf(h) : void 0,
        p
      ))
        return;
      p = h;
    }
    if (p)
      return s(u, f);
  }
  function s(u, f) {
    const c = f[f.length - 1], p = o[i][0], h = o[i][1];
    let g = 0;
    const E = c.children.indexOf(u);
    let y = !1, S = [];
    p.lastIndex = 0;
    let C = p.exec(u.value);
    for (; C; ) {
      const _ = C.index, F = {
        index: C.index,
        input: C.input,
        stack: [...f, u]
      };
      let b = h(...C, F);
      if (typeof b == "string" && (b = b.length > 0 ? { type: "text", value: b } : void 0), b === !1 ? p.lastIndex = _ + 1 : (g !== _ && S.push({
        type: "text",
        value: u.value.slice(g, _)
      }), Array.isArray(b) ? S.push(...b) : b && S.push(b), g = _ + C[0].length, y = !0), !p.global)
        break;
      C = p.exec(u.value);
    }
    return y ? (g < u.value.length && S.push({ type: "text", value: u.value.slice(g) }), c.children.splice(E, 1, ...S)) : S = [u], E + S.length;
  }
}
function _c(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const l = t[r];
    n.push([Dc(l[0]), Fc(l[1])]);
  }
  return n;
}
function Dc(e) {
  return typeof e == "string" ? new RegExp(zc(e), "g") : e;
}
function Fc(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const On = "phrasing", Nn = ["autolink", "link", "image", "label"];
function Rc() {
  return {
    transforms: [Hc],
    enter: {
      literalAutolink: Oc,
      literalAutolinkEmail: Bn,
      literalAutolinkHttp: Bn,
      literalAutolinkWww: Bn
    },
    exit: {
      literalAutolink: $c,
      literalAutolinkEmail: jc,
      literalAutolinkHttp: Nc,
      literalAutolinkWww: Bc
    }
  };
}
function Mc() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: On,
        notInConstruct: Nn
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: On,
        notInConstruct: Nn
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: On,
        notInConstruct: Nn
      }
    ]
  };
}
function Oc(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Bn(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function Nc(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function Bc(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function jc(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function $c(e) {
  this.exit(e);
}
function Hc(e) {
  Lc(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Uc],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), qc]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function Uc(e, n, t, r, l) {
  let o = "";
  if (!ai(l) || (/^w/i.test(n) && (t = n + t, n = "", o = "http://"), !Vc(t)))
    return !1;
  const i = Wc(t + r);
  if (!i[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + n + i[0],
    children: [{ type: "text", value: n + i[0] }]
  };
  return i[1] ? [a, { type: "text", value: i[1] }] : a;
}
function qc(e, n, t, r) {
  return (
    // Not an expected previous character.
    !ai(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function Vc(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function Wc(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const l = pr(e, "(");
  let o = pr(e, ")");
  for (; r !== -1 && l > o; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), o++;
  return [e, t];
}
function ai(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || Pe(t) || yn(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
ui.peek = nf;
function Yc() {
  this.buffer();
}
function Xc(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function Gc() {
  this.buffer();
}
function Qc(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function Kc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = he(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function Jc(e) {
  this.exit(e);
}
function Zc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = he(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function ef(e) {
  this.exit(e);
}
function nf() {
  return "[";
}
function ui(e, n, t, r) {
  const l = t.createTracker(r);
  let o = l.move("[^");
  const i = t.enter("footnoteReference"), a = t.enter("reference");
  return o += l.move(
    t.safe(t.associationId(e), { after: "]", before: o })
  ), a(), i(), o += l.move("]"), o;
}
function tf() {
  return {
    enter: {
      gfmFootnoteCallString: Yc,
      gfmFootnoteCall: Xc,
      gfmFootnoteDefinitionLabelString: Gc,
      gfmFootnoteDefinition: Qc
    },
    exit: {
      gfmFootnoteCallString: Kc,
      gfmFootnoteCall: Jc,
      gfmFootnoteDefinitionLabelString: Zc,
      gfmFootnoteDefinition: ef
    }
  };
}
function rf(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: ui },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, l, o, i) {
    const a = o.createTracker(i);
    let s = a.move("[^");
    const u = o.enter("footnoteDefinition"), f = o.enter("label");
    return s += a.move(
      o.safe(o.associationId(r), { before: s, after: "]" })
    ), f(), s += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), s += a.move(
      (n ? `
` : " ") + o.indentLines(
        o.containerFlow(r, a.current()),
        n ? si : lf
      )
    )), u(), s;
  }
}
function lf(e, n, t) {
  return n === 0 ? e : si(e, n, t);
}
function si(e, n, t) {
  return (t ? "" : "    ") + e;
}
const of = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
ci.peek = ff;
function af() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: sf },
    exit: { strikethrough: cf }
  };
}
function uf() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: of
      }
    ],
    handlers: { delete: ci }
  };
}
function sf(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function cf(e) {
  this.exit(e);
}
function ci(e, n, t, r) {
  const l = t.createTracker(r), o = t.enter("strikethrough");
  let i = l.move("~~");
  return i += t.containerPhrasing(e, {
    ...l.current(),
    before: i,
    after: "~"
  }), i += l.move("~~"), o(), i;
}
function ff() {
  return "~";
}
function hf(e) {
  return e.length;
}
function pf(e, n) {
  const t = n || {}, r = (t.align || []).concat(), l = t.stringLength || hf, o = [], i = [], a = [], s = [];
  let u = 0, f = -1;
  for (; ++f < e.length; ) {
    const w = [], E = [];
    let y = -1;
    for (e[f].length > u && (u = e[f].length); ++y < e[f].length; ) {
      const S = mf(e[f][y]);
      if (t.alignDelimiters !== !1) {
        const C = l(S);
        E[y] = C, (s[y] === void 0 || C > s[y]) && (s[y] = C);
      }
      w.push(S);
    }
    i[f] = w, a[f] = E;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < u; )
      o[c] = mr(r[c]);
  else {
    const w = mr(r);
    for (; ++c < u; )
      o[c] = w;
  }
  c = -1;
  const p = [], h = [];
  for (; ++c < u; ) {
    const w = o[c];
    let E = "", y = "";
    w === 99 ? (E = ":", y = ":") : w === 108 ? E = ":" : w === 114 && (y = ":");
    let S = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      s[c] - E.length - y.length
    );
    const C = E + "-".repeat(S) + y;
    t.alignDelimiters !== !1 && (S = E.length + S + y.length, S > s[c] && (s[c] = S), h[c] = S), p[c] = C;
  }
  i.splice(1, 0, p), a.splice(1, 0, h), f = -1;
  const g = [];
  for (; ++f < i.length; ) {
    const w = i[f], E = a[f];
    c = -1;
    const y = [];
    for (; ++c < u; ) {
      const S = w[c] || "";
      let C = "", _ = "";
      if (t.alignDelimiters !== !1) {
        const F = s[c] - (E[c] || 0), b = o[c];
        b === 114 ? C = " ".repeat(F) : b === 99 ? F % 2 ? (C = " ".repeat(F / 2 + 0.5), _ = " ".repeat(F / 2 - 0.5)) : (C = " ".repeat(F / 2), _ = C) : _ = " ".repeat(F);
      }
      t.delimiterStart !== !1 && !c && y.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && S === "") && (t.delimiterStart !== !1 || c) && y.push(" "), t.alignDelimiters !== !1 && y.push(C), y.push(S), t.alignDelimiters !== !1 && y.push(_), t.padding !== !1 && y.push(" "), (t.delimiterEnd !== !1 || c !== u - 1) && y.push("|");
    }
    g.push(
      t.delimiterEnd === !1 ? y.join("").replace(/ +$/, "") : y.join("")
    );
  }
  return g.join(`
`);
}
function mf(e) {
  return e == null ? "" : String(e);
}
function mr(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function df(e, n, t, r) {
  const l = t.enter("blockquote"), o = t.createTracker(r);
  o.move("> "), o.shift(2);
  const i = t.indentLines(
    t.containerFlow(e, o.current()),
    gf
  );
  return l(), i;
}
function gf(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function yf(e, n) {
  return dr(e, n.inConstruct, !0) && !dr(e, n.notInConstruct, !1);
}
function dr(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function gr(e, n, t, r) {
  let l = -1;
  for (; ++l < t.unsafe.length; )
    if (t.unsafe[l].character === `
` && yf(t.stack, t.unsafe[l]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function kf(e, n) {
  const t = String(e);
  let r = t.indexOf(n), l = r, o = 0, i = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === l ? ++o > i && (i = o) : o = 1, l = r + n.length, r = t.indexOf(n, l);
  return i;
}
function xf(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function bf(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function wf(e, n, t, r) {
  const l = bf(t), o = e.value || "", i = l === "`" ? "GraveAccent" : "Tilde";
  if (xf(e, t)) {
    const c = t.enter("codeIndented"), p = t.indentLines(o, Sf);
    return c(), p;
  }
  const a = t.createTracker(r), s = l.repeat(Math.max(kf(o, l) + 1, 3)), u = t.enter("codeFenced");
  let f = a.move(s);
  if (e.lang) {
    const c = t.enter(`codeFencedLang${i}`);
    f += a.move(
      t.safe(e.lang, {
        before: f,
        after: " ",
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  if (e.lang && e.meta) {
    const c = t.enter(`codeFencedMeta${i}`);
    f += a.move(" "), f += a.move(
      t.safe(e.meta, {
        before: f,
        after: `
`,
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  return f += a.move(`
`), o && (f += a.move(o + `
`)), f += a.move(s), u(), f;
}
function Sf(e, n, t) {
  return (t ? "" : "    ") + e;
}
function kt(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function Cf(e, n, t, r) {
  const l = kt(t), o = l === '"' ? "Quote" : "Apostrophe", i = t.enter("definition");
  let a = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("[");
  return u += s.move(
    t.safe(t.associationId(e), {
      before: u,
      after: "]",
      ...s.current()
    })
  ), u += s.move("]: "), a(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (a = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : `
`,
      ...s.current()
    })
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + l), u += s.move(
    t.safe(e.title, {
      before: u,
      after: l,
      ...s.current()
    })
  ), u += s.move(l), a()), i(), u;
}
function Ef(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function Qe(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function mn(e, n, t) {
  const r = Me(e), l = Me(n);
  return r === void 0 ? l === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : l === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? l === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : l === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : l === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : l === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
fi.peek = If;
function fi(e, n, t, r) {
  const l = Ef(t), o = t.enter("emphasis"), i = t.createTracker(r), a = i.move(l);
  let s = i.move(
    t.containerPhrasing(e, {
      after: l,
      before: a,
      ...i.current()
    })
  );
  const u = s.charCodeAt(0), f = mn(
    r.before.charCodeAt(r.before.length - 1),
    u,
    l
  );
  f.inside && (s = Qe(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = mn(r.after.charCodeAt(0), c, l);
  p.inside && (s = s.slice(0, -1) + Qe(c));
  const h = i.move(l);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: f.outside
  }, a + s + h;
}
function If(e, n, t) {
  return t.options.emphasis || "*";
}
function Af(e, n) {
  let t = !1;
  return gt(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, Qn;
  }), !!((!e.depth || e.depth < 3) && st(e) && (n.options.setext || t));
}
function Tf(e, n, t, r) {
  const l = Math.max(Math.min(6, e.depth || 1), 1), o = t.createTracker(r);
  if (Af(e, t)) {
    const f = t.enter("headingSetext"), c = t.enter("phrasing"), p = t.containerPhrasing(e, {
      ...o.current(),
      before: `
`,
      after: `
`
    });
    return c(), f(), p + `
` + (l === 1 ? "=" : "-").repeat(
      // The whole size…
      p.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(p.lastIndexOf("\r"), p.lastIndexOf(`
`)) + 1)
    );
  }
  const i = "#".repeat(l), a = t.enter("headingAtx"), s = t.enter("phrasing");
  o.move(i + " ");
  let u = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(u) && (u = Qe(u.charCodeAt(0)) + u.slice(1)), u = u ? i + " " + u : i, t.options.closeAtx && (u += " " + i), s(), a(), u;
}
hi.peek = vf;
function hi(e) {
  return e.value || "";
}
function vf() {
  return "<";
}
pi.peek = Pf;
function pi(e, n, t, r) {
  const l = kt(t), o = l === '"' ? "Quote" : "Apostrophe", i = t.enter("image");
  let a = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("![");
  return u += s.move(
    t.safe(e.alt, { before: u, after: "]", ...s.current() })
  ), u += s.move("]("), a(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (a = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...s.current()
    })
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + l), u += s.move(
    t.safe(e.title, {
      before: u,
      after: l,
      ...s.current()
    })
  ), u += s.move(l), a()), u += s.move(")"), i(), u;
}
function Pf() {
  return "!";
}
mi.peek = zf;
function mi(e, n, t, r) {
  const l = e.referenceType, o = t.enter("imageReference");
  let i = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("![");
  const u = t.safe(e.alt, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), i();
  const f = t.stack;
  t.stack = [], i = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return i(), t.stack = f, o(), l === "full" || !u || u !== c ? s += a.move(c + "]") : l === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function zf() {
  return "!";
}
di.peek = Lf;
function di(e, n, t) {
  let r = e.value || "", l = "`", o = -1;
  for (; new RegExp("(^|[^`])" + l + "([^`]|$)").test(r); )
    l += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < t.unsafe.length; ) {
    const i = t.unsafe[o], a = t.compilePattern(i);
    let s;
    if (i.atBreak)
      for (; s = a.exec(r); ) {
        let u = s.index;
        r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--, r = r.slice(0, u) + " " + r.slice(s.index + 1);
      }
  }
  return l + r + l;
}
function Lf() {
  return "`";
}
function gi(e, n) {
  const t = st(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
yi.peek = _f;
function yi(e, n, t, r) {
  const l = kt(t), o = l === '"' ? "Quote" : "Apostrophe", i = t.createTracker(r);
  let a, s;
  if (gi(e, t)) {
    const f = t.stack;
    t.stack = [], a = t.enter("autolink");
    let c = i.move("<");
    return c += i.move(
      t.containerPhrasing(e, {
        before: c,
        after: ">",
        ...i.current()
      })
    ), c += i.move(">"), a(), t.stack = f, c;
  }
  a = t.enter("link"), s = t.enter("label");
  let u = i.move("[");
  return u += i.move(
    t.containerPhrasing(e, {
      before: u,
      after: "](",
      ...i.current()
    })
  ), u += i.move("]("), s(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), u += i.move("<"), u += i.move(
    t.safe(e.url, { before: u, after: ">", ...i.current() })
  ), u += i.move(">")) : (s = t.enter("destinationRaw"), u += i.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...i.current()
    })
  )), s(), e.title && (s = t.enter(`title${o}`), u += i.move(" " + l), u += i.move(
    t.safe(e.title, {
      before: u,
      after: l,
      ...i.current()
    })
  ), u += i.move(l), s()), u += i.move(")"), a(), u;
}
function _f(e, n, t) {
  return gi(e, t) ? "<" : "[";
}
ki.peek = Df;
function ki(e, n, t, r) {
  const l = e.referenceType, o = t.enter("linkReference");
  let i = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("[");
  const u = t.containerPhrasing(e, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), i();
  const f = t.stack;
  t.stack = [], i = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return i(), t.stack = f, o(), l === "full" || !u || u !== c ? s += a.move(c + "]") : l === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function Df() {
  return "[";
}
function xt(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function Ff(e) {
  const n = xt(e), t = e.options.bulletOther;
  if (!t)
    return n === "*" ? "-" : "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (t === n)
    throw new Error(
      "Expected `bullet` (`" + n + "`) and `bulletOther` (`" + t + "`) to be different"
    );
  return t;
}
function Rf(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function xi(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function Mf(e, n, t, r) {
  const l = t.enter("list"), o = t.bulletCurrent;
  let i = e.ordered ? Rf(t) : xt(t);
  const a = e.ordered ? i === "." ? ")" : "." : Ff(t);
  let s = n && t.bulletLastUsed ? i === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (i === "*" || i === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (s = !0), xi(t) === i && f
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const p = e.children[c];
        if (p && p.type === "listItem" && p.children && p.children[0] && p.children[0].type === "thematicBreak") {
          s = !0;
          break;
        }
      }
    }
  }
  s && (i = a), t.bulletCurrent = i;
  const u = t.containerFlow(e, r);
  return t.bulletLastUsed = i, t.bulletCurrent = o, l(), u;
}
function Of(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function Nf(e, n, t, r) {
  const l = Of(t);
  let o = t.bulletCurrent || xt(t);
  n && n.type === "list" && n.ordered && (o = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + o);
  let i = o.length + 1;
  (l === "tab" || l === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (i = Math.ceil(i / 4) * 4);
  const a = t.createTracker(r);
  a.move(o + " ".repeat(i - o.length)), a.shift(i);
  const s = t.enter("listItem"), u = t.indentLines(
    t.containerFlow(e, a.current()),
    f
  );
  return s(), u;
  function f(c, p, h) {
    return p ? (h ? "" : " ".repeat(i)) + c : (h ? o : o + " ".repeat(i - o.length)) + c;
  }
}
function Bf(e, n, t, r) {
  const l = t.enter("paragraph"), o = t.enter("phrasing"), i = t.containerPhrasing(e, r);
  return o(), l(), i;
}
const jf = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  bn([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function $f(e, n, t, r) {
  return (e.children.some(function(i) {
    return jf(i);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function Hf(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
bi.peek = Uf;
function bi(e, n, t, r) {
  const l = Hf(t), o = t.enter("strong"), i = t.createTracker(r), a = i.move(l + l);
  let s = i.move(
    t.containerPhrasing(e, {
      after: l,
      before: a,
      ...i.current()
    })
  );
  const u = s.charCodeAt(0), f = mn(
    r.before.charCodeAt(r.before.length - 1),
    u,
    l
  );
  f.inside && (s = Qe(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = mn(r.after.charCodeAt(0), c, l);
  p.inside && (s = s.slice(0, -1) + Qe(c));
  const h = i.move(l + l);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: f.outside
  }, a + s + h;
}
function Uf(e, n, t) {
  return t.options.strong || "*";
}
function qf(e, n, t, r) {
  return t.safe(e.value, r);
}
function Vf(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function Wf(e, n, t) {
  const r = (xi(t) + (t.options.ruleSpaces ? " " : "")).repeat(Vf(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const wi = {
  blockquote: df,
  break: gr,
  code: wf,
  definition: Cf,
  emphasis: fi,
  hardBreak: gr,
  heading: Tf,
  html: hi,
  image: pi,
  imageReference: mi,
  inlineCode: di,
  link: yi,
  linkReference: ki,
  list: Mf,
  listItem: Nf,
  paragraph: Bf,
  root: $f,
  strong: bi,
  text: qf,
  thematicBreak: Wf
};
function Yf() {
  return {
    enter: {
      table: Xf,
      tableData: yr,
      tableHeader: yr,
      tableRow: Qf
    },
    exit: {
      codeText: Kf,
      table: Gf,
      tableData: jn,
      tableHeader: jn,
      tableRow: jn
    }
  };
}
function Xf(e) {
  const n = e._align;
  this.enter(
    {
      type: "table",
      align: n.map(function(t) {
        return t === "none" ? null : t;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function Gf(e) {
  this.exit(e), this.data.inTable = void 0;
}
function Qf(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function jn(e) {
  this.exit(e);
}
function yr(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function Kf(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, Jf));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function Jf(e, n) {
  return n === "|" ? n : e;
}
function Zf(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, l = n.stringLength, o = t ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: p,
      table: i,
      tableCell: s,
      tableRow: a
    }
  };
  function i(h, g, w, E) {
    return u(f(h, w, E), h.align);
  }
  function a(h, g, w, E) {
    const y = c(h, w, E), S = u([y]);
    return S.slice(0, S.indexOf(`
`));
  }
  function s(h, g, w, E) {
    const y = w.enter("tableCell"), S = w.enter("phrasing"), C = w.containerPhrasing(h, {
      ...E,
      before: o,
      after: o
    });
    return S(), y(), C;
  }
  function u(h, g) {
    return pf(h, {
      align: g,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: l
    });
  }
  function f(h, g, w) {
    const E = h.children;
    let y = -1;
    const S = [], C = g.enter("table");
    for (; ++y < E.length; )
      S[y] = c(E[y], g, w);
    return C(), S;
  }
  function c(h, g, w) {
    const E = h.children;
    let y = -1;
    const S = [], C = g.enter("tableRow");
    for (; ++y < E.length; )
      S[y] = s(E[y], h, g, w);
    return C(), S;
  }
  function p(h, g, w) {
    let E = wi.inlineCode(h, g, w);
    return w.stack.includes("tableCell") && (E = E.replace(/\|/g, "\\$&")), E;
  }
}
function eh() {
  return {
    exit: {
      taskListCheckValueChecked: kr,
      taskListCheckValueUnchecked: kr,
      paragraph: th
    }
  };
}
function nh() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: rh }
  };
}
function kr(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function th(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const l = n.children;
      let o = -1, i;
      for (; ++o < l.length; ) {
        const a = l[o];
        if (a.type === "paragraph") {
          i = a;
          break;
        }
      }
      i === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function rh(e, n, t, r) {
  const l = e.children[0], o = typeof e.checked == "boolean" && l && l.type === "paragraph", i = "[" + (e.checked ? "x" : " ") + "] ", a = t.createTracker(r);
  o && a.move(i);
  let s = wi.listItem(e, n, t, {
    ...r,
    ...a.current()
  });
  return o && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), s;
  function u(f) {
    return f + i;
  }
}
function ih() {
  return [
    Rc(),
    tf(),
    af(),
    Yf(),
    eh()
  ];
}
function lh(e) {
  return {
    extensions: [
      Mc(),
      rf(e),
      uf(),
      Zf(e),
      nh()
    ]
  };
}
const oh = {
  tokenize: hh,
  partial: !0
}, Si = {
  tokenize: ph,
  partial: !0
}, Ci = {
  tokenize: mh,
  partial: !0
}, Ei = {
  tokenize: dh,
  partial: !0
}, ah = {
  tokenize: gh,
  partial: !0
}, Ii = {
  name: "wwwAutolink",
  tokenize: ch,
  previous: Ti
}, Ai = {
  name: "protocolAutolink",
  tokenize: fh,
  previous: vi
}, xe = {
  name: "emailAutolink",
  tokenize: sh,
  previous: Pi
}, me = {};
function uh() {
  return {
    text: me
  };
}
let Ie = 48;
for (; Ie < 123; )
  me[Ie] = xe, Ie++, Ie === 58 ? Ie = 65 : Ie === 91 && (Ie = 97);
me[43] = xe;
me[45] = xe;
me[46] = xe;
me[95] = xe;
me[72] = [xe, Ai];
me[104] = [xe, Ai];
me[87] = [xe, Ii];
me[119] = [xe, Ii];
function sh(e, n, t) {
  const r = this;
  let l, o;
  return i;
  function i(c) {
    return !et(c) || !Pi.call(r, r.previous) || bt(r.events) ? t(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return et(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), s) : t(c);
  }
  function s(c) {
    return c === 46 ? e.check(ah, f, u)(c) : c === 45 || c === 95 || K(c) ? (o = !0, e.consume(c), s) : f(c);
  }
  function u(c) {
    return e.consume(c), l = !0, s;
  }
  function f(c) {
    return o && l && Z(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(c)) : t(c);
  }
}
function ch(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return i !== 87 && i !== 119 || !Ti.call(r, r.previous) || bt(r.events) ? t(i) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(oh, e.attempt(Si, e.attempt(Ci, o), t), t)(i));
  }
  function o(i) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(i);
  }
}
function fh(e, n, t) {
  const r = this;
  let l = "", o = !1;
  return i;
  function i(c) {
    return (c === 72 || c === 104) && vi.call(r, r.previous) && !bt(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), l += String.fromCodePoint(c), e.consume(c), a) : t(c);
  }
  function a(c) {
    if (Z(c) && l.length < 5)
      return l += String.fromCodePoint(c), e.consume(c), a;
    if (c === 58) {
      const p = l.toLowerCase();
      if (p === "http" || p === "https")
        return e.consume(c), s;
    }
    return t(c);
  }
  function s(c) {
    return c === 47 ? (e.consume(c), o ? u : (o = !0, s)) : t(c);
  }
  function u(c) {
    return c === null || fn(c) || Y(c) || Pe(c) || yn(c) ? t(c) : e.attempt(Si, e.attempt(Ci, f), t)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(c);
  }
}
function hh(e, n, t) {
  let r = 0;
  return l;
  function l(i) {
    return (i === 87 || i === 119) && r < 3 ? (r++, e.consume(i), l) : i === 46 && r === 3 ? (e.consume(i), o) : t(i);
  }
  function o(i) {
    return i === null ? t(i) : n(i);
  }
}
function ph(e, n, t) {
  let r, l, o;
  return i;
  function i(u) {
    return u === 46 || u === 95 ? e.check(Ei, s, a)(u) : u === null || Y(u) || Pe(u) || u !== 45 && yn(u) ? s(u) : (o = !0, e.consume(u), i);
  }
  function a(u) {
    return u === 95 ? r = !0 : (l = r, r = void 0), e.consume(u), i;
  }
  function s(u) {
    return l || r || !o ? t(u) : n(u);
  }
}
function mh(e, n) {
  let t = 0, r = 0;
  return l;
  function l(i) {
    return i === 40 ? (t++, e.consume(i), l) : i === 41 && r < t ? o(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? e.check(Ei, n, o)(i) : i === null || Y(i) || Pe(i) ? n(i) : (e.consume(i), l);
  }
  function o(i) {
    return i === 41 && r++, e.consume(i), l;
  }
}
function dh(e, n, t) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), o) : a === 93 ? (e.consume(a), l) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || Y(a) || Pe(a) ? n(a) : t(a)
    );
  }
  function l(a) {
    return a === null || a === 40 || a === 91 || Y(a) || Pe(a) ? n(a) : r(a);
  }
  function o(a) {
    return Z(a) ? i(a) : t(a);
  }
  function i(a) {
    return a === 59 ? (e.consume(a), r) : Z(a) ? (e.consume(a), i) : t(a);
  }
}
function gh(e, n, t) {
  return r;
  function r(o) {
    return e.consume(o), l;
  }
  function l(o) {
    return K(o) ? t(o) : n(o);
  }
}
function Ti(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || Y(e);
}
function vi(e) {
  return !Z(e);
}
function Pi(e) {
  return !(e === 47 || et(e));
}
function et(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || K(e);
}
function bt(e) {
  let n = e.length, t = !1;
  for (; n--; ) {
    const r = e[n][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      t = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      t = !1;
      break;
    }
  }
  return e.length > 0 && !t && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), t;
}
const yh = {
  tokenize: Ih,
  partial: !0
};
function kh() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: Sh,
        continuation: {
          tokenize: Ch
        },
        exit: Eh
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: wh
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: xh,
        resolveTo: bh
      }
    }
  };
}
function xh(e, n, t) {
  const r = this;
  let l = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let i;
  for (; l--; ) {
    const s = r.events[l][1];
    if (s.type === "labelImage") {
      i = s;
      break;
    }
    if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link")
      break;
  }
  return a;
  function a(s) {
    if (!i || !i._balanced)
      return t(s);
    const u = he(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }));
    return u.codePointAt(0) !== 94 || !o.includes(u.slice(1)) ? t(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), n(s));
  }
}
function bh(e, n) {
  let t = e.length;
  for (; t--; )
    if (e[t][1].type === "labelImage" && e[t][0] === "enter") {
      e[t][1];
      break;
    }
  e[t + 1][1].type = "data", e[t + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[t + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, l = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  l.end.column++, l.end.offset++, l.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, l.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, i = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, o.start),
    end: Object.assign({}, o.end)
  }, a = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[t + 1],
    e[t + 2],
    ["enter", r, n],
    // The `[`
    e[t + 3],
    e[t + 4],
    // The `^`.
    ["enter", l, n],
    ["exit", l, n],
    // Everything in between.
    ["enter", o, n],
    ["enter", i, n],
    ["exit", i, n],
    ["exit", o, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...a), e;
}
function wh(e, n, t) {
  const r = this, l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, i;
  return a;
  function a(c) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), s;
  }
  function s(c) {
    return c !== 94 ? t(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", u);
  }
  function u(c) {
    if (
      // Too long.
      o > 999 || // Closing brace with nothing.
      c === 93 && !i || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || Y(c)
    )
      return t(c);
    if (c === 93) {
      e.exit("chunkString");
      const p = e.exit("gfmFootnoteCallString");
      return l.includes(he(r.sliceSerialize(p))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(c);
    }
    return Y(c) || (i = !0), o++, e.consume(c), c === 92 ? f : u;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), o++, u) : u(c);
  }
}
function Sh(e, n, t) {
  const r = this, l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, i = 0, a;
  return s;
  function s(g) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), u;
  }
  function u(g) {
    return g === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : t(g);
  }
  function f(g) {
    if (
      // Too long.
      i > 999 || // Closing brace with nothing.
      g === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      g === null || g === 91 || Y(g)
    )
      return t(g);
    if (g === 93) {
      e.exit("chunkString");
      const w = e.exit("gfmFootnoteDefinitionLabelString");
      return o = he(r.sliceSerialize(w)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return Y(g) || (a = !0), i++, e.consume(g), g === 92 ? c : f;
  }
  function c(g) {
    return g === 91 || g === 92 || g === 93 ? (e.consume(g), i++, f) : f(g);
  }
  function p(g) {
    return g === 58 ? (e.enter("definitionMarker"), e.consume(g), e.exit("definitionMarker"), l.includes(o) || l.push(o), j(e, h, "gfmFootnoteDefinitionWhitespace")) : t(g);
  }
  function h(g) {
    return n(g);
  }
}
function Ch(e, n, t) {
  return e.check(Je, n, e.attempt(yh, n, t));
}
function Eh(e) {
  e.exit("gfmFootnoteDefinition");
}
function Ih(e, n, t) {
  const r = this;
  return j(e, l, "gfmFootnoteDefinitionIndent", 5);
  function l(o) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? n(o) : t(o);
  }
}
function Ah(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: l
  };
  return t == null && (t = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function l(i, a) {
    let s = -1;
    for (; ++s < i.length; )
      if (i[s][0] === "enter" && i[s][1].type === "strikethroughSequenceTemporary" && i[s][1]._close) {
        let u = s;
        for (; u--; )
          if (i[u][0] === "exit" && i[u][1].type === "strikethroughSequenceTemporary" && i[u][1]._open && // If the sizes are the same:
          i[s][1].end.offset - i[s][1].start.offset === i[u][1].end.offset - i[u][1].start.offset) {
            i[s][1].type = "strikethroughSequence", i[u][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, i[u][1].start),
              end: Object.assign({}, i[s][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, i[u][1].end),
              end: Object.assign({}, i[s][1].start)
            }, p = [["enter", f, a], ["enter", i[u][1], a], ["exit", i[u][1], a], ["enter", c, a]], h = a.parser.constructs.insideSpan.null;
            h && le(p, p.length, 0, kn(h, i.slice(u + 1, s), a)), le(p, p.length, 0, [["exit", c, a], ["enter", i[s][1], a], ["exit", i[s][1], a], ["exit", f, a]]), le(i, u - 1, s - u + 3, p), s = u + p.length - 2;
            break;
          }
      }
    for (s = -1; ++s < i.length; )
      i[s][1].type === "strikethroughSequenceTemporary" && (i[s][1].type = "data");
    return i;
  }
  function o(i, a, s) {
    const u = this.previous, f = this.events;
    let c = 0;
    return p;
    function p(g) {
      return u === 126 && f[f.length - 1][1].type !== "characterEscape" ? s(g) : (i.enter("strikethroughSequenceTemporary"), h(g));
    }
    function h(g) {
      const w = Me(u);
      if (g === 126)
        return c > 1 ? s(g) : (i.consume(g), c++, h);
      if (c < 2 && !t) return s(g);
      const E = i.exit("strikethroughSequenceTemporary"), y = Me(g);
      return E._open = !y || y === 2 && !!w, E._close = !w || w === 2 && !!y, a(g);
    }
  }
}
class Th {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(n, t, r) {
    vh(this, n, t, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(n) {
    if (this.map.sort(function(o, i) {
      return o[0] - i[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let l = r.pop();
    for (; l; ) {
      for (const o of l)
        n.push(o);
      l = r.pop();
    }
    this.map.length = 0;
  }
}
function vh(e, n, t, r) {
  let l = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; l < e.map.length; ) {
      if (e.map[l][0] === n) {
        e.map[l][1] += t, e.map[l][2].push(...r);
        return;
      }
      l += 1;
    }
    e.map.push([n, t, r]);
  }
}
function Ph(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const l = e[n];
    if (t) {
      if (l[0] === "enter")
        l[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (l[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (l[1].type === "tableDelimiterRow")
        break;
    } else l[0] === "enter" && l[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function zh() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Lh,
        resolveAll: _h
      }
    }
  };
}
function Lh(e, n, t) {
  const r = this;
  let l = 0, o = 0, i;
  return a;
  function a(k) {
    let v = r.events.length - 1;
    for (; v > -1; ) {
      const L = r.events[v][1].type;
      if (L === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      L === "linePrefix") v--;
      else break;
    }
    const P = v > -1 ? r.events[v][1].type : null, U = P === "tableHead" || P === "tableRow" ? b : s;
    return U === b && r.parser.lazy[r.now().line] ? t(k) : U(k);
  }
  function s(k) {
    return e.enter("tableHead"), e.enter("tableRow"), u(k);
  }
  function u(k) {
    return k === 124 || (i = !0, o += 1), f(k);
  }
  function f(k) {
    return k === null ? t(k) : z(k) ? o > 1 ? (o = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), h) : t(k) : O(k) ? j(e, f, "whitespace")(k) : (o += 1, i && (i = !1, l += 1), k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), i = !0, f) : (e.enter("data"), c(k)));
  }
  function c(k) {
    return k === null || k === 124 || Y(k) ? (e.exit("data"), f(k)) : (e.consume(k), k === 92 ? p : c);
  }
  function p(k) {
    return k === 92 || k === 124 ? (e.consume(k), c) : c(k);
  }
  function h(k) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(k) : (e.enter("tableDelimiterRow"), i = !1, O(k) ? j(e, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : g(k));
  }
  function g(k) {
    return k === 45 || k === 58 ? E(k) : k === 124 ? (i = !0, e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), w) : F(k);
  }
  function w(k) {
    return O(k) ? j(e, E, "whitespace")(k) : E(k);
  }
  function E(k) {
    return k === 58 ? (o += 1, i = !0, e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), y) : k === 45 ? (o += 1, y(k)) : k === null || z(k) ? _(k) : F(k);
  }
  function y(k) {
    return k === 45 ? (e.enter("tableDelimiterFiller"), S(k)) : F(k);
  }
  function S(k) {
    return k === 45 ? (e.consume(k), S) : k === 58 ? (i = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), C) : (e.exit("tableDelimiterFiller"), C(k));
  }
  function C(k) {
    return O(k) ? j(e, _, "whitespace")(k) : _(k);
  }
  function _(k) {
    return k === 124 ? g(k) : k === null || z(k) ? !i || l !== o ? F(k) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(k)) : F(k);
  }
  function F(k) {
    return t(k);
  }
  function b(k) {
    return e.enter("tableRow"), N(k);
  }
  function N(k) {
    return k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), N) : k === null || z(k) ? (e.exit("tableRow"), n(k)) : O(k) ? j(e, N, "whitespace")(k) : (e.enter("data"), H(k));
  }
  function H(k) {
    return k === null || k === 124 || Y(k) ? (e.exit("data"), N(k)) : (e.consume(k), k === 92 ? $ : H);
  }
  function $(k) {
    return k === 92 || k === 124 ? (e.consume(k), H) : H(k);
  }
}
function _h(e, n) {
  let t = -1, r = !0, l = 0, o = [0, 0, 0, 0], i = [0, 0, 0, 0], a = !1, s = 0, u, f, c;
  const p = new Th();
  for (; ++t < e.length; ) {
    const h = e[t], g = h[1];
    h[0] === "enter" ? g.type === "tableHead" ? (a = !1, s !== 0 && (xr(p, n, s, u, f), f = void 0, s = 0), u = {
      type: "table",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", u, n]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = !0, c = void 0, o = [0, 0, 0, 0], i = [0, t + 1, 0, 0], a && (a = !1, f = {
      type: "tableBody",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", f, n]])), l = g.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : l && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = !1, i[2] === 0 && (o[1] !== 0 && (i[0] = i[1], c = ln(p, n, o, l, void 0, c), o = [0, 0, 0, 0]), i[2] = t)) : g.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (i[0] = i[1], c = ln(p, n, o, l, void 0, c)), o = i, i = [o[1], t, 0, 0])) : g.type === "tableHead" ? (a = !0, s = t) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (s = t, o[1] !== 0 ? (i[0] = i[1], c = ln(p, n, o, l, t, c)) : i[1] !== 0 && (c = ln(p, n, i, l, t, c)), l = 0) : l && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (i[3] = t);
  }
  for (s !== 0 && xr(p, n, s, u, f), p.consume(n.events), t = -1; ++t < n.events.length; ) {
    const h = n.events[t];
    h[0] === "enter" && h[1].type === "table" && (h[1]._align = Ph(n.events, t));
  }
  return e;
}
function ln(e, n, t, r, l, o) {
  const i = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  t[0] !== 0 && (o.end = Object.assign({}, Re(n.events, t[0])), e.add(t[0], 0, [["exit", o, n]]));
  const s = Re(n.events, t[1]);
  if (o = {
    type: i,
    start: Object.assign({}, s),
    // Note: correct end is set later.
    end: Object.assign({}, s)
  }, e.add(t[1], 0, [["enter", o, n]]), t[2] !== 0) {
    const u = Re(n.events, t[2]), f = Re(n.events, t[3]), c = {
      type: a,
      start: Object.assign({}, u),
      end: Object.assign({}, f)
    };
    if (e.add(t[2], 0, [["enter", c, n]]), r !== 2) {
      const p = n.events[t[2]], h = n.events[t[3]];
      if (p[1].end = Object.assign({}, h[1].end), p[1].type = "chunkText", p[1].contentType = "text", t[3] > t[2] + 1) {
        const g = t[2] + 1, w = t[3] - t[2] - 1;
        e.add(g, w, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", c, n]]);
  }
  return l !== void 0 && (o.end = Object.assign({}, Re(n.events, l)), e.add(l, 0, [["exit", o, n]]), o = void 0), o;
}
function xr(e, n, t, r, l) {
  const o = [], i = Re(n.events, t);
  l && (l.end = Object.assign({}, i), o.push(["exit", l, n])), r.end = Object.assign({}, i), o.push(["exit", r, n]), e.add(t + 1, 0, o);
}
function Re(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Dh = {
  name: "tasklistCheck",
  tokenize: Rh
};
function Fh() {
  return {
    text: {
      91: Dh
    }
  };
}
function Rh(e, n, t) {
  const r = this;
  return l;
  function l(s) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), o)
    );
  }
  function o(s) {
    return Y(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), i) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), i) : t(s);
  }
  function i(s) {
    return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : t(s);
  }
  function a(s) {
    return z(s) ? n(s) : O(s) ? e.check({
      tokenize: Mh
    }, n, t)(s) : t(s);
  }
}
function Mh(e, n, t) {
  return j(e, r, "whitespace");
  function r(l) {
    return l === null ? t(l) : n(l);
  }
}
function Oh(e) {
  return Br([
    uh(),
    kh(),
    Ah(e),
    zh(),
    Fh()
  ]);
}
const Nh = {};
function Bh(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || Nh, r = n.data(), l = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), i = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  l.push(Oh(t)), o.push(ih()), i.push(lh(t));
}
function jh({ slide: e }) {
  return /* @__PURE__ */ ne("div", { className: "slide", children: [
    /* @__PURE__ */ M("h2", { className: "slide__title", children: e.title }),
    /* @__PURE__ */ M("div", { className: "slide__body", children: /* @__PURE__ */ M(Ic, { remarkPlugins: [Bh], children: e.body }) })
  ] });
}
const dn = 1920, nt = 1080, zi = 1120, $h = dn - zi;
function Hh() {
  const [e, n] = un(1);
  return on(() => {
    const t = () => n(Math.min(window.innerWidth / dn, window.innerHeight / nt));
    return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
  }, []), e;
}
function ip({ course: e, getScene: n, audioBase: t }) {
  const r = Hh(), l = e.sections, o = Te(
    () => typeof window < "u" && new URLSearchParams(window.location.search).has("capture"),
    []
  ), [i, a] = un({ section: 0, beat: 0 }), [s, u] = un(0), f = l[i.section], c = f ? n(f.scene) : void 0, p = Te(
    () => f ? Ol(l, i) : null,
    [l, i, f]
  ), h = Te(() => f ? Nl(f) : [], [f]), g = !o && f ? `${t}/${f.id}-${i.beat}.wav` : void 0, { toggle: w, stop: E } = po(
    g,
    () => a((y) => {
      const S = Cn(l, y, 1);
      return S.section === y.section && S.beat === y.beat && E(), S;
    })
  );
  return on(() => {
    if (o) return;
    const y = (S) => {
      l.length && (S.key === "ArrowRight" ? a((C) => Cn(l, C, 1)) : S.key === "ArrowLeft" ? a((C) => Cn(l, C, -1)) : S.key === " " && (S.preventDefault(), w()));
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }), on(() => {
    if (o)
      return window.__captureReady = !1, window.__capture = {
        plan: () => l.map((y, S) => ({ section: S, id: y.id, scene: y.scene, beats: y.beats.length })),
        seek: (y, S) => {
          window.__captureReady = !1, u(0), a({ section: y, beat: S });
        },
        transition: (y, S, C) => {
          window.__captureReady = !1, u(C), a({ section: y, beat: S });
        }
      }, () => {
        delete window.__capture;
      };
  }, [o, l]), on(() => {
    if (!o) return;
    window.__captureReady = !1;
    let y = 0;
    const S = requestAnimationFrame(() => {
      y = requestAnimationFrame(() => {
        window.__captureReady = !0;
      });
    });
    return () => {
      cancelAnimationFrame(S), cancelAnimationFrame(y);
    };
  }, [o, i]), f ? /* @__PURE__ */ M("div", { className: "rp-root", children: /* @__PURE__ */ M("div", { style: { width: dn * r, height: nt * r }, children: /* @__PURE__ */ ne(
    "div",
    {
      className: "rp-stage",
      style: {
        width: dn,
        height: nt,
        transform: `scale(${r})`,
        transformOrigin: "top left"
      },
      children: [
        /* @__PURE__ */ M("div", { className: "rp-scene-pane", style: { width: zi }, children: c && /* @__PURE__ */ M(ho, { scene: c, reveal: p, focus: h, fitMs: o ? s : void 0 }) }),
        /* @__PURE__ */ M("div", { className: "rp-slide-pane", style: { width: $h }, children: /* @__PURE__ */ M(jh, { slide: f.slide }) })
      ]
    }
  ) }) }) : null;
}
export {
  Qh as BLUE,
  Hn as EDGE,
  br as GRAY,
  Kh as GREEN,
  Jh as ORANGE,
  Zh as PURPLE,
  np as RED,
  ip as RevealPlayer,
  ho as SceneViewer,
  jh as SlidePane,
  ep as TEAL,
  tp as YELLOW,
  Yh as container,
  gn as edgeKey,
  Ll as getIcon,
  Xh as group,
  Dl as resolveGrid,
  Rl as revealAt,
  Ol as revealForPosition,
  Bl as sceneNodeIds,
  Ml as sceneRunStart,
  Cn as step,
  cn as tracks,
  po as useNarration,
  rp as validateCourse,
  Gh as wgrid
};
