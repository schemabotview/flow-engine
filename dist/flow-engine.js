import { Key as ss, GitBranch as ls, Table as cs, Terminal as us, ScrollText as ds, Box as fs, ShieldCheck as ps, Users as gs, KeyRound as hs, Layers as ms, Clock as bs, Workflow as Es, MemoryStick as _s, HardDrive as ys, Server as ks, AppWindow as ws, Share2 as xs, Webhook as Ss, Plug as Ns, Copy as Ts, DownloadCloud as As, Network as vs, Radio as Cs, Cloud as Os, File as Is, Zap as Rs, Image as Ms, Braces as Ds, Waves as Ls, Cpu as Ps, Cog as Bs, Filter as Fs, Brain as zs, FileBarChart as Us, BarChart3 as $s, Database as Hs } from "lucide-react";
import { jsx as ee, jsxs as De, Fragment as Tr } from "react/jsx-runtime";
import { useMemo as yn, useEffect as ur, useRef as Ht, useState as Et, useLayoutEffect as mt } from "react";
import { MarkerType as Gs, Handle as _t, Position as qe, useInternalNode as ii, useStore as Ks, getSmoothStepPath as qs, getBezierPath as Ws, BaseEdge as Vs, EdgeLabelRenderer as Ys, ReactFlow as Zs, useReactFlow as Xs } from "@xyflow/react";
const tb = (e, n) => ({ ...e, kind: "container", cell: [0, 0], layout: n.grid, children: n.nodes }), rb = (e, n) => ({
  id: e,
  label: "",
  kind: "group",
  cell: [0, 0],
  layout: n.grid,
  children: n.nodes
}), ib = (e, n) => ({
  grid: e,
  nodes: n.map(({ node: t, at: r }) => ({ ...t, cell: r }))
}), ob = "#5b8cff", ab = "#37d39a", sb = "#ff7a59", lb = "#b98bff", cb = "#3fd0d6", ub = "#ff5d6c", uo = "#9aa3b2", db = "#d9b84a", dr = "#5b6270", Qs = {
  database: Hs,
  barChart: $s,
  report: Us,
  brain: zs,
  funnel: Fs,
  gears: Bs,
  engine: Ps,
  lake: Ls,
  json: Ds,
  image: Ms,
  streaming: Rs,
  file: Is,
  cloud: Os,
  stream: Cs,
  federation: vs,
  autoload: As,
  copy: Ts,
  plug: Ns,
  api: Ss,
  share: xs,
  app: ws,
  server: ks,
  disk: ys,
  memory: _s,
  workflow: Es,
  clock: bs,
  layers: ms,
  key: hs,
  users: gs,
  shield: ps,
  box: fs,
  scroll: ds,
  terminal: us,
  table: cs,
  branch: ls,
  surrogateKey: ss
}, js = (e) => e ? Qs[e] : void 0, Js = 6;
function el(e, n, t) {
  const r = {};
  return fo(e, n, { x: 0, y: 0, w: t.width, h: t.height }, r), r;
}
const yt = (e) => Array.isArray(e) ? e : Array.from({ length: e }, () => 1), fr = (e) => e.reduce((n, t) => n + t, 0), nl = (e) => e.reduce((n, t) => [...n, n[n.length - 1] + t], [0]);
function oi(e, n, t, r) {
  const o = fr(e) + 2 * r + (e.length - 1) * t, a = n / o, i = e.map((s) => s * a);
  return { unit: a, sizes: i, before: nl(i) };
}
function fo(e, n, t, r) {
  var p;
  const { gap: o = 0.2, padding: a = 0.4 } = n, i = oi(yt(n.cols), t.w, o, a), s = oi(yt(n.rows), t.h, o, a), c = i.unit * o, l = s.unit * o, u = i.unit * a, d = s.unit * a;
  for (const f of e) {
    const [g, _, y = 1, h = 1] = f.cell, w = {
      x: t.x + u + i.before[g] + g * c,
      y: t.y + d + s.before[_] + _ * l,
      w: fr(i.sizes.slice(g, g + y)) + (y - 1) * c,
      h: fr(s.sizes.slice(_, _ + h)) + (h - 1) * l
    };
    if (r[f.id] = w, (p = f.children) != null && p.length && f.layout) {
      const S = f.kind === "container" ? Js : 0, C = { x: w.x + S, y: w.y + S, w: w.w - 2 * S, h: w.h - 2 * S };
      fo(f.children, f.layout, C, r);
    }
  }
}
const vt = (e, n) => `${e}->${n}`;
function tl(e, n) {
  const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
  let a = null;
  const i = Math.min(n, e.length - 1);
  for (let c = 0; c <= i; c++)
    for (const l of e[c].delta)
      switch (l.kind) {
        case "solidify":
          for (const u of l.ids) t.add(u);
          break;
        case "draw":
          for (const [u, d] of l.edges) r.add(vt(u, d));
          break;
        case "annotate":
          o.set(l.id, l.value);
          break;
        case "pan":
          a = l.to;
          break;
      }
  const s = /* @__PURE__ */ new Set();
  if (i >= 0) {
    for (const c of e[i].delta)
      if (c.kind === "pulse") for (const l of c.ids) s.add(l);
  }
  return { nodes: t, edges: r, annotations: o, pulse: s, camera: a };
}
function rl(e, n) {
  let t = n;
  for (; t > 0 && e[t - 1].scene === e[n].scene; ) t--;
  return t;
}
function il(e, n) {
  const t = rl(e, n.section), r = [];
  for (let o = t; o < n.section; o++) r.push(...e[o].beats);
  return r.push(...e[n.section].beats.slice(0, n.beat + 1)), tl(r, r.length - 1);
}
function ol(e) {
  if (e.focus != null)
    return Array.isArray(e.focus) ? e.focus : [e.focus];
  const n = /* @__PURE__ */ new Set();
  for (const t of e.beats)
    for (const r of t.delta)
      if (r.kind === "solidify") for (const o of r.ids) n.add(o);
  if (n.size === 0) {
    for (const t of e.beats)
      for (const r of t.delta)
        if (r.kind === "draw") for (const [o, a] of r.edges)
          n.add(o), n.add(a);
  }
  return [...n];
}
function Gt(e, n, t) {
  const r = n.beat + t;
  return r >= 0 && r < e[n.section].beats.length ? { section: n.section, beat: r } : t > 0 && n.section < e.length - 1 ? { section: n.section + 1, beat: 0 } : t < 0 && n.section > 0 ? { section: n.section - 1, beat: e[n.section - 1].beats.length - 1 } : n;
}
function al(e) {
  const n = /* @__PURE__ */ new Set(), t = (r) => {
    var o;
    for (const a of r)
      n.add(a.id), (o = a.children) != null && o.length && t(a.children);
  };
  return t(e.nodes), n;
}
function sl(e) {
  return new Set(e.edges.map((n) => vt(n.from, n.to)));
}
function ll(e) {
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
function fb(e, n) {
  const t = [];
  return e.forEach((r, o) => {
    const a = `§${o + 1} "${r.id}"`, i = n(r.scene);
    if (!i) {
      t.push(`${a}: references unknown scene "${r.scene}"`);
      return;
    }
    const s = al(i), c = sl(i);
    r.beats.forEach((l, u) => {
      for (const d of l.delta) {
        for (const p of ll(d))
          s.has(p) || t.push(`${a} beat ${u}: ${d.kind} id "${p}" is not a node in scene "${r.scene}"`);
        if (d.kind === "draw")
          for (const [p, f] of d.edges)
            c.has(vt(p, f)) || t.push(`${a} beat ${u}: draw ${p}->${f} has no matching edge in scene "${r.scene}"`);
      }
    });
  }), t;
}
const cl = (e) => yt(e.grid.cols).length > yt(e.grid.rows).length ? "horizontal" : "vertical";
function po(e) {
  var t;
  const n = [];
  for (const r of e)
    n.push(r), (t = r.children) != null && t.length && n.push(...po(r.children));
  return n;
}
function ul(e, n, t, r, o) {
  const a = !!o && o.size > 0;
  return po(e.nodes).map((i) => {
    const s = n[i.id], c = r ? r.has(i.id) : !0, l = a ? o.has(i.id) : !0, u = i.kind ?? "symbol", d = u === "symbol" || u === "term" || u === "code";
    return {
      id: i.id,
      type: "scene",
      position: { x: s.x, y: s.y },
      draggable: !1,
      selectable: !1,
      zIndex: d ? 10 : void 0,
      data: {
        label: i.label,
        sub: i.sub,
        type: i.type,
        icon: i.icon,
        filename: i.filename,
        iconInline: i.iconInline,
        mono: i.mono,
        color: i.color ?? uo,
        kind: i.kind ?? "symbol",
        direction: t,
        width: s.w,
        height: s.h,
        ghosted: !c,
        highlighted: c && a && l,
        dimmed: c && a && !l
      }
    };
  });
}
function dl(e, n, t, r) {
  const o = !!r && r.size > 0;
  return e.edges.map((a, i) => {
    const s = !n || n.has(a.from) && n.has(a.to) || ((t == null ? void 0 : t.has(vt(a.from, a.to))) ?? !1), c = s && o && !r.has(a.from) && !r.has(a.to);
    return {
      id: `${a.from}-${a.to}-${i}`,
      source: a.from,
      target: a.to,
      type: "flow",
      data: { color: dr, animated: a.animated, label: a.label, ghosted: !s, dimmed: c },
      markerEnd: { type: Gs.ArrowClosed, color: dr }
    };
  });
}
function fl(e, n, t, r, o = 0) {
  if (r === "term") {
    const u = Math.max(1, e.replace(/\s+/g, " ").trim().length), d = Math.max(n - 4, 6) / (u * 0.72), p = Math.max(t - o - 4, 6) / 1.2;
    return Math.max(4, Math.min(d, p, 18));
  }
  const a = e.split(/\s+/).filter(Boolean), i = Math.max(1, ...a.map((u) => u.length)), s = Math.max(n - 20, 8) / (i * 0.72), c = a.length > 1 ? 2 : 1, l = Math.max(t - o - 8, 8) / (c * 1.25);
  return Math.max(7, Math.min(s, l, 18));
}
function pl(e, n, t, r = 1) {
  const o = Math.max(n - 8, 6) / (Math.max(e, 1) * 0.62), a = Math.max(t - 10, 6) / (r * 1.55);
  return Math.max(9, Math.min(o, a, 24));
}
function gl(e, n) {
  const r = Math.max(n - 8, 6) / (Math.max(e.length, 1) * 0.86);
  return Math.max(4, Math.min(r, 16));
}
const hl = /* @__PURE__ */ new Set([
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
]), ml = (e) => /[A-Za-z_]/.test(e), bl = (e) => /[A-Za-z0-9_]/.test(e), ai = (e) => /[0-9]/.test(e);
function El(e) {
  const n = [];
  let t = 0, r = !1;
  const o = (a, i) => {
    n.push({ cls: a, text: i }), a !== "ws" && (r = a === "punct" && i === ".");
  };
  for (; t < e.length; ) {
    const a = e[t];
    if (/\s/.test(a)) {
      let i = t + 1;
      for (; i < e.length && /\s/.test(e[i]); ) i++;
      o("ws", e.slice(t, i)), t = i;
      continue;
    }
    if (a === "'" || a === '"') {
      let i = t + 1;
      for (; i < e.length && e[i] !== a; ) i++;
      i = Math.min(i + 1, e.length), o("string", e.slice(t, i)), t = i;
      continue;
    }
    if (ai(a)) {
      let i = t + 1;
      for (; i < e.length && (ai(e[i]) || e[i] === "."); ) i++;
      o("number", e.slice(t, i)), t = i;
      continue;
    }
    if (ml(a)) {
      let i = t + 1;
      for (; i < e.length && bl(e[i]); ) i++;
      const s = e.slice(t, i), c = r ? "method" : hl.has(s.toLowerCase()) ? "keyword" : "var";
      o(c, s), t = i;
      continue;
    }
    if (a === "…") {
      o("punct", a), t += 1;
      continue;
    }
    if (a === "." && e.slice(t, t + 3) === "...") {
      o("punct", "..."), t += 3;
      continue;
    }
    o("punct", a), t += 1;
  }
  return n;
}
function _l(e, n = 2) {
  const t = e.replace(/[^a-zA-Z0-9]/g, "");
  return t ? t.charAt(0).toUpperCase() + t.slice(1, n).toLowerCase() : "";
}
function go({ data: e }) {
  const n = e;
  if (n.kind === "group")
    return /* @__PURE__ */ ee("div", { className: "scene-node scene-node--group", style: { width: n.width, height: n.height } });
  const t = n.ghosted ? " scene-node--ghost" : n.highlighted ? " scene-node--lit" : n.dimmed ? " scene-node--dimmed" : "", r = n.direction === "horizontal";
  if (n.kind === "code") return /* @__PURE__ */ ee(yl, { d: n, state: t, horizontal: r });
  const o = n.kind === "container", a = n.kind === "symbol" && !!n.mono, i = n.kind === "symbol" || o ? js(n.icon) : void 0, s = Math.max(18, Math.min(Math.min(n.width, n.height) * 0.4, 48)), c = !!((i || a) && n.iconInline), l = n.kind === "term" && !!n.type, u = c ? Math.max(24, n.width - s - 12) : l ? Math.max(24, n.width * 0.6) : n.width, d = c ? 0 : a ? s + 4 : i ? s + 5 : 0, p = n.sub ? 16 : 0, f = o ? gl(n.label, n.width) : fl(n.label, u, n.height, n.kind, d + p);
  return /* @__PURE__ */ De(
    "div",
    {
      className: `scene-node scene-node--${n.kind}${a ? " scene-node--mono" : ""}${c ? " scene-node--iconh" : ""}${t}`,
      style: { width: n.width, height: n.height, "--node-color": n.color },
      children: [
        /* @__PURE__ */ ee(_t, { type: "target", position: r ? qe.Left : qe.Top, className: "scene-handle", isConnectable: !1 }),
        o ? /* @__PURE__ */ De("span", { className: "scene-node__title", style: { fontSize: f }, children: [
          i && /* @__PURE__ */ ee(i, { className: "scene-node__title-icon", size: Math.round(f * 1.25), strokeWidth: 1.75 }),
          n.label
        ] }) : /* @__PURE__ */ De(Tr, { children: [
          a ? /* @__PURE__ */ ee("span", { className: "scene-node__mono", style: { width: s, height: s, fontSize: s * 0.42 }, children: i ? /* @__PURE__ */ ee(i, { size: s * 0.6, strokeWidth: 2 }) : _l(n.label) }) : i && /* @__PURE__ */ ee(i, { className: "scene-node__icon", size: s, strokeWidth: 1.75 }),
          l ? /* @__PURE__ */ De("span", { className: "scene-node__row", children: [
            /* @__PURE__ */ ee("span", { className: "scene-node__label", style: { fontSize: f }, children: n.label }),
            /* @__PURE__ */ ee("span", { className: "scene-node__type", style: { fontSize: f * 0.82 }, children: n.type })
          ] }) : /* @__PURE__ */ ee("span", { className: "scene-node__label", style: { fontSize: f }, children: n.label }),
          n.sub && /* @__PURE__ */ ee("span", { className: "scene-node__sub", children: n.sub })
        ] }),
        /* @__PURE__ */ ee(_t, { type: "source", position: r ? qe.Right : qe.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
go.defaultColor = uo;
function yl({ d: e, state: n, horizontal: t }) {
  const r = e.label.length, o = e.sub ? e.sub.length + 2 : 0, a = e.sub ? 2 : 1, i = Math.max(20, Math.min(e.height * 0.18, 34)), c = pl(
    Math.max(r, o),
    e.width - 30 - 26,
    e.height - i,
    a
  ), l = El(e.label);
  return /* @__PURE__ */ De(
    "div",
    {
      className: `scene-node scene-node--code${n}`,
      style: { width: e.width, height: e.height, "--node-color": e.color },
      children: [
        /* @__PURE__ */ ee(_t, { type: "target", position: t ? qe.Left : qe.Top, className: "scene-handle", isConnectable: !1 }),
        /* @__PURE__ */ De("div", { className: "scene-node__code-bar", style: { height: i }, children: [
          /* @__PURE__ */ De("span", { className: "scene-node__code-dots", children: [
            /* @__PURE__ */ ee("i", { style: { background: "#ff5f56" } }),
            /* @__PURE__ */ ee("i", { style: { background: "#ffbd2e" } }),
            /* @__PURE__ */ ee("i", { style: { background: "#27c93f" } })
          ] }),
          e.filename && /* @__PURE__ */ ee("span", { className: "scene-node__code-file", children: e.filename })
        ] }),
        /* @__PURE__ */ De("div", { className: "scene-node__code-body", style: { fontSize: c }, children: [
          /* @__PURE__ */ De("div", { className: "scene-node__code-line", children: [
            /* @__PURE__ */ ee("span", { className: "scene-node__code-gutter", children: "1" }),
            /* @__PURE__ */ ee("span", { className: "scene-node__code-src", children: l.map((u, d) => /* @__PURE__ */ ee("span", { className: `tok-${u.cls}`, children: u.text }, d)) })
          ] }),
          e.sub && /* @__PURE__ */ De("div", { className: "scene-node__code-line", children: [
            /* @__PURE__ */ ee("span", { className: "scene-node__code-gutter" }),
            /* @__PURE__ */ ee("span", { className: "scene-node__code-src tok-comment", children: `# ${e.sub}` })
          ] })
        ] }),
        /* @__PURE__ */ ee(_t, { type: "source", position: t ? qe.Right : qe.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
const kl = 13, wl = 8, xl = 13, Sl = (e) => Math.max(wl, Math.min(xl, kl * e));
function si(e, n) {
  const t = (e.measured.width ?? 0) / 2, r = (e.measured.height ?? 0) / 2, o = e.internals.positionAbsolute.x + t, a = e.internals.positionAbsolute.y + r, i = n.internals.positionAbsolute.x + (n.measured.width ?? 0) / 2, s = n.internals.positionAbsolute.y + (n.measured.height ?? 0) / 2, c = (i - o) / (2 * t) - (s - a) / (2 * r), l = (i - o) / (2 * t) + (s - a) / (2 * r), u = 1 / (Math.abs(c) + Math.abs(l) || 1);
  return { x: t * (u * c + u * l) + o, y: r * (-u * c + u * l) + a };
}
function li(e, n) {
  const t = e.internals.positionAbsolute.x, r = e.internals.positionAbsolute.y, o = e.measured.width ?? 0;
  return n.x <= t + 1 ? qe.Left : n.x >= t + o - 1 ? qe.Right : n.y <= r + 1 ? qe.Top : qe.Bottom;
}
function Nl({ id: e, source: n, target: t, data: r, markerEnd: o }) {
  const a = ii(n), i = ii(t), s = Ks((R) => R.transform[2]);
  if (!(a != null && a.measured.width) || !(i != null && i.measured.width)) return null;
  const c = si(a, i), l = si(i, a), u = li(a, c), d = li(i, l), p = { sourceX: c.x, sourceY: c.y, targetX: l.x, targetY: l.y, sourcePosition: u, targetPosition: d }, [f, g, _] = u === d ? qs({ ...p, borderRadius: 14, offset: 24 }) : Ws(p), y = (r == null ? void 0 : r.color) ?? dr, h = r == null ? void 0 : r.label, w = (r == null ? void 0 : r.ghosted) === !0, S = (r == null ? void 0 : r.dimmed) === !0, C = (r == null ? void 0 : r.animated) !== !1 && !w && !S;
  return /* @__PURE__ */ De(Tr, { children: [
    /* @__PURE__ */ ee(
      Vs,
      {
        id: e,
        path: f,
        markerEnd: w ? void 0 : o,
        style: {
          stroke: y,
          strokeWidth: 1.75,
          opacity: w ? 0.14 : S ? 0.25 : 0.6,
          strokeDasharray: w ? "5 5" : void 0
        }
      }
    ),
    C && /* @__PURE__ */ ee("circle", { r: 3, fill: y, opacity: 0.85, children: /* @__PURE__ */ ee("animateMotion", { dur: "2.4s", repeatCount: "indefinite", path: f }) }),
    h && !w && !S && /* @__PURE__ */ ee(Ys, { children: /* @__PURE__ */ ee(
      "div",
      {
        className: "scene-edge-label",
        style: { transform: `translate(-50%, -50%) translate(${g}px, ${_}px)`, fontSize: `${Sl(s)}px` },
        children: h
      }
    ) })
  ] });
}
const Tl = { scene: go }, Al = { flow: Nl }, vl = 0.08, Cl = 0.22, Ol = 550;
function Il(e) {
  if (!e.length) return null;
  const n = Math.min(...e.map((a) => a.x)), t = Math.min(...e.map((a) => a.y)), r = Math.max(...e.map((a) => a.x + a.w)), o = Math.max(...e.map((a) => a.y + a.h));
  return { x: n, y: t, width: r - n, height: o - t };
}
function Rl({
  boxes: e,
  focusIds: n,
  fitMs: t = Ol
}) {
  const r = Xs(), o = n.join(",");
  return ur(() => {
    const a = n.map((l) => e[l]).filter(Boolean), i = Il(a.length ? a : Object.values(e));
    if (!i) return;
    const s = a.length ? Cl : vl, c = requestAnimationFrame(() => r.fitBounds(i, { padding: s, duration: t }));
    return () => cancelAnimationFrame(c);
  }, [o, e, r, t]), null;
}
function Ml({
  scene: e,
  reveal: n = null,
  focus: t = [],
  fitMs: r
}) {
  const o = cl(e), a = yn(() => el(e.nodes, e.grid, e.canvas), [e]), i = yn(() => t.length ? new Set(t) : null, [t]), s = yn(
    () => ul(e, a, o, (n == null ? void 0 : n.nodes) ?? null, i),
    [e, a, o, n, i]
  ), c = yn(
    () => dl(e, (n == null ? void 0 : n.nodes) ?? null, (n == null ? void 0 : n.edges) ?? null, i),
    [e, n, i]
  );
  return /* @__PURE__ */ ee("div", { className: "scene-flow", children: /* @__PURE__ */ ee(
    Zs,
    {
      nodes: s,
      edges: c,
      nodeTypes: Tl,
      edgeTypes: Al,
      proOptions: { hideAttribution: !0 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !1,
      panOnDrag: !0,
      zoomOnScroll: !0,
      zoomOnDoubleClick: !1,
      minZoom: 0.2,
      maxZoom: 8,
      children: /* @__PURE__ */ ee(Rl, { boxes: a, focusIds: t, fitMs: r })
    }
  ) });
}
function Dl(e, n) {
  const t = Ht(null), r = Ht(n);
  r.current = n;
  const [o, a] = Et(!1), i = Ht(o);
  return i.current = o, ur(() => {
    const l = new Audio();
    return l.addEventListener("ended", () => r.current()), t.current = l, () => l.pause();
  }, []), ur(() => {
    const l = t.current;
    l && (l.pause(), e ? (l.src = e, l.currentTime = 0, i.current && l.play().catch(() => {
    })) : (l.removeAttribute("src"), l.load()));
  }, [e]), { playing: o, toggle: () => {
    const l = t.current;
    !l || !l.getAttribute("src") || (i.current ? (l.pause(), a(!1)) : (l.play().catch(() => {
    }), a(!0)));
  }, stop: () => {
    var l;
    (l = t.current) == null || l.pause(), a(!1);
  } };
}
function Ll(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const Pl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Bl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Fl = {};
function ci(e, n) {
  return (Fl.jsx ? Bl : Pl).test(e);
}
const zl = /[ \t\n\f\r]/g;
function Ul(e) {
  return typeof e == "object" ? e.type === "text" ? ui(e.value) : !1 : ui(e);
}
function ui(e) {
  return e.replace(zl, "") === "";
}
class Xn {
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
Xn.prototype.normal = {};
Xn.prototype.property = {};
Xn.prototype.space = void 0;
function ho(e, n) {
  const t = {}, r = {};
  for (const o of e)
    Object.assign(t, o.property), Object.assign(r, o.normal);
  return new Xn(t, r, n);
}
function pr(e) {
  return e.toLowerCase();
}
class Le {
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
Le.prototype.attribute = "";
Le.prototype.booleanish = !1;
Le.prototype.boolean = !1;
Le.prototype.commaOrSpaceSeparated = !1;
Le.prototype.commaSeparated = !1;
Le.prototype.defined = !1;
Le.prototype.mustUseProperty = !1;
Le.prototype.number = !1;
Le.prototype.overloadedBoolean = !1;
Le.prototype.property = "";
Le.prototype.spaceSeparated = !1;
Le.prototype.space = void 0;
let $l = 0;
const Y = xn(), we = xn(), gr = xn(), A = xn(), ge = xn(), kn = xn(), $e = xn();
function xn() {
  return 2 ** ++$l;
}
const hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Y,
  booleanish: we,
  commaOrSpaceSeparated: $e,
  commaSeparated: kn,
  number: A,
  overloadedBoolean: gr,
  spaceSeparated: ge
}, Symbol.toStringTag, { value: "Module" })), Kt = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(hr)
);
class Ar extends Le {
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
  constructor(n, t, r, o) {
    let a = -1;
    if (super(n, t), di(this, "space", o), typeof r == "number")
      for (; ++a < Kt.length; ) {
        const i = Kt[a];
        di(this, Kt[a], (r & hr[i]) === hr[i]);
      }
  }
}
Ar.prototype.defined = !0;
function di(e, n, t) {
  t && (e[n] = t);
}
function Mn(e) {
  const n = {}, t = {};
  for (const [r, o] of Object.entries(e.properties)) {
    const a = new Ar(
      r,
      e.transform(e.attributes || {}, r),
      o,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), n[r] = a, t[pr(r)] = r, t[pr(a.attribute)] = r;
  }
  return new Xn(n, t, e.space);
}
const mo = Mn({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: we,
    ariaAutoComplete: null,
    ariaBusy: we,
    ariaChecked: we,
    ariaColCount: A,
    ariaColIndex: A,
    ariaColSpan: A,
    ariaControls: ge,
    ariaCurrent: null,
    ariaDescribedBy: ge,
    ariaDetails: null,
    ariaDisabled: we,
    ariaDropEffect: ge,
    ariaErrorMessage: null,
    ariaExpanded: we,
    ariaFlowTo: ge,
    ariaGrabbed: we,
    ariaHasPopup: null,
    ariaHidden: we,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ge,
    ariaLevel: A,
    ariaLive: null,
    ariaModal: we,
    ariaMultiLine: we,
    ariaMultiSelectable: we,
    ariaOrientation: null,
    ariaOwns: ge,
    ariaPlaceholder: null,
    ariaPosInSet: A,
    ariaPressed: we,
    ariaReadOnly: we,
    ariaRelevant: null,
    ariaRequired: we,
    ariaRoleDescription: ge,
    ariaRowCount: A,
    ariaRowIndex: A,
    ariaRowSpan: A,
    ariaSelected: we,
    ariaSetSize: A,
    ariaSort: null,
    ariaValueMax: A,
    ariaValueMin: A,
    ariaValueNow: A,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function bo(e, n) {
  return n in e ? e[n] : n;
}
function Eo(e, n) {
  return bo(e, n.toLowerCase());
}
const Hl = Mn({
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
    accept: kn,
    acceptCharset: ge,
    accessKey: ge,
    action: null,
    allow: null,
    allowFullScreen: Y,
    allowPaymentRequest: Y,
    allowUserMedia: Y,
    alpha: Y,
    alt: null,
    as: null,
    async: Y,
    autoCapitalize: null,
    autoComplete: ge,
    autoFocus: Y,
    autoPlay: Y,
    blocking: ge,
    capture: null,
    charSet: null,
    checked: Y,
    cite: null,
    className: ge,
    closedBy: null,
    colorSpace: null,
    cols: A,
    colSpan: A,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: we,
    controls: Y,
    controlsList: ge,
    coords: A | kn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Y,
    defer: Y,
    dir: null,
    dirName: null,
    disabled: Y,
    download: gr,
    draggable: we,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: Y,
    formTarget: null,
    headers: ge,
    height: A,
    hidden: gr,
    high: A,
    href: null,
    hrefLang: null,
    htmlFor: ge,
    httpEquiv: ge,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Y,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Y,
    itemId: null,
    itemProp: ge,
    itemRef: ge,
    itemScope: Y,
    itemType: ge,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: Y,
    low: A,
    manifest: null,
    max: null,
    maxLength: A,
    media: null,
    method: null,
    min: null,
    minLength: A,
    multiple: Y,
    muted: Y,
    name: null,
    nonce: null,
    noModule: Y,
    noValidate: Y,
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
    open: Y,
    optimum: A,
    pattern: null,
    ping: ge,
    placeholder: null,
    playsInline: Y,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Y,
    referrerPolicy: null,
    rel: ge,
    required: Y,
    reversed: Y,
    rows: A,
    rowSpan: A,
    sandbox: ge,
    scope: null,
    scoped: Y,
    seamless: Y,
    selected: Y,
    shadowRootClonable: Y,
    shadowRootCustomElementRegistry: Y,
    shadowRootDelegatesFocus: Y,
    shadowRootMode: null,
    shadowRootSerializable: Y,
    shape: null,
    size: A,
    sizes: null,
    slot: null,
    span: A,
    spellCheck: we,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: A,
    step: null,
    style: null,
    tabIndex: A,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: Y,
    useMap: null,
    value: we,
    width: A,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: ge,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: A,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: A,
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
    compact: Y,
    // Lists. Use CSS to reduce space between items instead
    declare: Y,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: A,
    // `<img>` and `<object>`
    leftMargin: A,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: A,
    // `<body>`
    marginWidth: A,
    // `<body>`
    noResize: Y,
    // `<frame>`
    noHref: Y,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: Y,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: Y,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: A,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: we,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: A,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: A,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: Y,
    disablePictureInPicture: Y,
    disableRemotePlayback: Y,
    exportParts: kn,
    part: ge,
    prefix: null,
    property: null,
    results: A,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Eo
}), Gl = Mn({
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
    about: $e,
    accentHeight: A,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: A,
    amplitude: A,
    arabicForm: null,
    ascent: A,
    attributeName: null,
    attributeType: null,
    azimuth: A,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: A,
    by: null,
    calcMode: null,
    capHeight: A,
    className: ge,
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
    descent: A,
    diffuseConstant: A,
    direction: null,
    display: null,
    dur: null,
    divisor: A,
    dominantBaseline: null,
    download: Y,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: A,
    enableBackground: null,
    end: null,
    event: null,
    exponent: A,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: A,
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
    g1: kn,
    g2: kn,
    glyphName: kn,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: A,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: A,
    horizOriginX: A,
    horizOriginY: A,
    id: null,
    ideographic: A,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: A,
    k: A,
    k1: A,
    k2: A,
    k3: A,
    k4: A,
    kernelMatrix: $e,
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
    limitingConeAngle: A,
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
    mediaSize: A,
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
    overlinePosition: A,
    overlineThickness: A,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: A,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: ge,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: A,
    pointsAtY: A,
    pointsAtZ: A,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: $e,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: $e,
    rev: $e,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: $e,
    requiredFeatures: $e,
    requiredFonts: $e,
    requiredFormats: $e,
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
    specularConstant: A,
    specularExponent: A,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: A,
    strikethroughThickness: A,
    string: null,
    stroke: null,
    strokeDashArray: $e,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: A,
    strokeOpacity: A,
    strokeWidth: null,
    style: null,
    surfaceScale: A,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: $e,
    tabIndex: A,
    tableValues: null,
    target: null,
    targetX: A,
    targetY: A,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: $e,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: A,
    underlineThickness: A,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: A,
    values: null,
    vAlphabetic: A,
    vMathematical: A,
    vectorEffect: null,
    vHanging: A,
    vIdeographic: A,
    version: null,
    vertAdvY: A,
    vertOriginX: A,
    vertOriginY: A,
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
    xHeight: A,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: bo
}), _o = Mn({
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
}), yo = Mn({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Eo
}), ko = Mn({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), Kl = {
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
}, ql = /[A-Z]/g, fi = /-[a-z]/g, Wl = /^data[-\w.:]+$/i;
function Vl(e, n) {
  const t = pr(n);
  let r = n, o = Le;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Wl.test(n)) {
    if (n.charAt(4) === "-") {
      const a = n.slice(5).replace(fi, Zl);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = n.slice(4);
      if (!fi.test(a)) {
        let i = a.replace(ql, Yl);
        i.charAt(0) !== "-" && (i = "-" + i), n = "data" + i;
      }
    }
    o = Ar;
  }
  return new o(r, n);
}
function Yl(e) {
  return "-" + e.toLowerCase();
}
function Zl(e) {
  return e.charAt(1).toUpperCase();
}
const Xl = ho([mo, Hl, _o, yo, ko], "html"), vr = ho([mo, Gl, _o, yo, ko], "svg");
function Ql(e) {
  return e.join(" ").trim();
}
function Cr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var vn = {}, qt, pi;
function jl() {
  if (pi) return qt;
  pi = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, n = /\n/g, t = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, o = /^:\s*/, a = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, i = /^[;\s]*/, s = /^\s+|\s+$/g, c = `
`, l = "/", u = "*", d = "", p = "comment", f = "declaration";
  function g(y, h) {
    if (typeof y != "string")
      throw new TypeError("First argument must be a string");
    if (!y) return [];
    h = h || {};
    var w = 1, S = 1;
    function C(D) {
      var v = D.match(n);
      v && (w += v.length);
      var Z = D.lastIndexOf(c);
      S = ~Z ? D.length - Z : S + D.length;
    }
    function R() {
      var D = { line: w, column: S };
      return function(v) {
        return v.position = new k(D), H(), v;
      };
    }
    function k(D) {
      this.start = D, this.end = { line: w, column: S }, this.source = h.source;
    }
    k.prototype.content = y;
    function U(D) {
      var v = new Error(
        h.source + ":" + w + ":" + S + ": " + D
      );
      if (v.reason = D, v.filename = h.source, v.line = w, v.column = S, v.source = y, !h.silent) throw v;
    }
    function $(D) {
      var v = D.exec(y);
      if (v) {
        var Z = v[0];
        return C(Z), y = y.slice(Z.length), v;
      }
    }
    function H() {
      $(t);
    }
    function x(D) {
      var v;
      for (D = D || []; v = P(); )
        v !== !1 && D.push(v);
      return D;
    }
    function P() {
      var D = R();
      if (!(l != y.charAt(0) || u != y.charAt(1))) {
        for (var v = 2; d != y.charAt(v) && (u != y.charAt(v) || l != y.charAt(v + 1)); )
          ++v;
        if (v += 2, d === y.charAt(v - 1))
          return U("End of comment missing");
        var Z = y.slice(2, v - 2);
        return S += 2, C(Z), y = y.slice(v), S += 2, D({
          type: p,
          comment: Z
        });
      }
    }
    function B() {
      var D = R(), v = $(r);
      if (v) {
        if (P(), !$(o)) return U("property missing ':'");
        var Z = $(a), se = D({
          type: f,
          property: _(v[0].replace(e, d)),
          value: Z ? _(Z[0].replace(e, d)) : d
        });
        return $(i), se;
      }
    }
    function J() {
      var D = [];
      x(D);
      for (var v; v = B(); )
        v !== !1 && (D.push(v), x(D));
      return D;
    }
    return H(), J();
  }
  function _(y) {
    return y ? y.replace(s, d) : d;
  }
  return qt = g, qt;
}
var gi;
function Jl() {
  if (gi) return vn;
  gi = 1;
  var e = vn && vn.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(vn, "__esModule", { value: !0 }), vn.default = t;
  const n = e(jl());
  function t(r, o) {
    let a = null;
    if (!r || typeof r != "string")
      return a;
    const i = (0, n.default)(r), s = typeof o == "function";
    return i.forEach((c) => {
      if (c.type !== "declaration")
        return;
      const { property: l, value: u } = c;
      s ? o(l, u, c) : u && (a = a || {}, a[l] = u);
    }), a;
  }
  return vn;
}
var Un = {}, hi;
function ec() {
  if (hi) return Un;
  hi = 1, Object.defineProperty(Un, "__esModule", { value: !0 }), Un.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, t = /^[^-]+$/, r = /^-(webkit|moz|ms|o|khtml)-/, o = /^-(ms)-/, a = function(l) {
    return !l || t.test(l) || e.test(l);
  }, i = function(l, u) {
    return u.toUpperCase();
  }, s = function(l, u) {
    return "".concat(u, "-");
  }, c = function(l, u) {
    return u === void 0 && (u = {}), a(l) ? l : (l = l.toLowerCase(), u.reactCompat ? l = l.replace(o, s) : l = l.replace(r, s), l.replace(n, i));
  };
  return Un.camelCase = c, Un;
}
var $n, mi;
function nc() {
  if (mi) return $n;
  mi = 1;
  var e = $n && $n.__importDefault || function(o) {
    return o && o.__esModule ? o : { default: o };
  }, n = e(Jl()), t = ec();
  function r(o, a) {
    var i = {};
    return !o || typeof o != "string" || (0, n.default)(o, function(s, c) {
      s && c && (i[(0, t.camelCase)(s, a)] = c);
    }), i;
  }
  return r.default = r, $n = r, $n;
}
var tc = nc();
const rc = /* @__PURE__ */ Cr(tc), wo = xo("end"), Or = xo("start");
function xo(e) {
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
function ic(e) {
  const n = Or(e), t = wo(e);
  if (n && t)
    return { start: n, end: t };
}
function qn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? bi(e.position) : "start" in e || "end" in e ? bi(e) : "line" in e || "column" in e ? mr(e) : "";
}
function mr(e) {
  return Ei(e && e.line) + ":" + Ei(e && e.column);
}
function bi(e) {
  return mr(e && e.start) + "-" + mr(e && e.end);
}
function Ei(e) {
  return e && typeof e == "number" ? e : 1;
}
class ve extends Error {
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
    let o = "", a = {}, i = !1;
    if (t && ("line" in t && "column" in t ? a = { place: t } : "start" in t && "end" in t ? a = { place: t } : "type" in t ? a = {
      ancestors: [t],
      place: t.position
    } : a = { ...t }), typeof n == "string" ? o = n : !a.cause && n && (i = !0, o = n.message, a.cause = n), !a.ruleId && !a.source && typeof r == "string") {
      const c = r.indexOf(":");
      c === -1 ? a.ruleId = r : (a.source = r.slice(0, c), a.ruleId = r.slice(c + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const c = a.ancestors[a.ancestors.length - 1];
      c && (a.place = c.position);
    }
    const s = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = o, this.line = s ? s.line : void 0, this.name = qn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = i && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ve.prototype.file = "";
ve.prototype.name = "";
ve.prototype.reason = "";
ve.prototype.message = "";
ve.prototype.stack = "";
ve.prototype.column = void 0;
ve.prototype.line = void 0;
ve.prototype.ancestors = void 0;
ve.prototype.cause = void 0;
ve.prototype.fatal = void 0;
ve.prototype.place = void 0;
ve.prototype.ruleId = void 0;
ve.prototype.source = void 0;
const Ir = {}.hasOwnProperty, oc = /* @__PURE__ */ new Map(), ac = /[A-Z]/g, sc = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), lc = /* @__PURE__ */ new Set(["td", "th"]), So = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function cc(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = bc(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = mc(t, n.jsx, n.jsxs);
  }
  const o = {
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
    schema: n.space === "svg" ? vr : Xl,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, a = No(o, e, void 0);
  return a && typeof a != "string" ? a : o.create(
    e,
    o.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function No(e, n, t) {
  if (n.type === "element")
    return uc(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return dc(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return pc(e, n, t);
  if (n.type === "mdxjsEsm")
    return fc(e, n);
  if (n.type === "root")
    return gc(e, n, t);
  if (n.type === "text")
    return hc(e, n);
}
function uc(e, n, t) {
  const r = e.schema;
  let o = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (o = vr, e.schema = o), e.ancestors.push(n);
  const a = Ao(e, n.tagName, !1), i = Ec(e, n);
  let s = Mr(e, n);
  return sc.has(n.tagName) && (s = s.filter(function(c) {
    return typeof c == "string" ? !Ul(c) : !0;
  })), To(e, i, a, n), Rr(i, s), e.ancestors.pop(), e.schema = r, e.create(n, a, i, t);
}
function dc(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Yn(e, n.position);
}
function fc(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Yn(e, n.position);
}
function pc(e, n, t) {
  const r = e.schema;
  let o = r;
  n.name === "svg" && r.space === "html" && (o = vr, e.schema = o), e.ancestors.push(n);
  const a = n.name === null ? e.Fragment : Ao(e, n.name, !0), i = _c(e, n), s = Mr(e, n);
  return To(e, i, a, n), Rr(i, s), e.ancestors.pop(), e.schema = r, e.create(n, a, i, t);
}
function gc(e, n, t) {
  const r = {};
  return Rr(r, Mr(e, n)), e.create(n, e.Fragment, r, t);
}
function hc(e, n) {
  return n.value;
}
function To(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function Rr(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function mc(e, n, t) {
  return r;
  function r(o, a, i, s) {
    const l = Array.isArray(i.children) ? t : n;
    return s ? l(a, i, s) : l(a, i);
  }
}
function bc(e, n) {
  return t;
  function t(r, o, a, i) {
    const s = Array.isArray(a.children), c = Or(r);
    return n(
      o,
      a,
      i,
      s,
      {
        columnNumber: c ? c.column - 1 : void 0,
        fileName: e,
        lineNumber: c ? c.line : void 0
      },
      void 0
    );
  }
}
function Ec(e, n) {
  const t = {};
  let r, o;
  for (o in n.properties)
    if (o !== "children" && Ir.call(n.properties, o)) {
      const a = yc(e, o, n.properties[o]);
      if (a) {
        const [i, s] = a;
        e.tableCellAlignToStyle && i === "align" && typeof s == "string" && lc.has(n.tagName) ? r = s : t[i] = s;
      }
    }
  if (r) {
    const a = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    a[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function _c(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        a.type;
        const i = a.expression;
        i.type;
        const s = i.properties[0];
        s.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(s.argument)
        );
      } else
        Yn(e, n.position);
    else {
      const o = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          s.type, a = e.evaluater.evaluateExpression(s.expression);
        } else
          Yn(e, n.position);
      else
        a = r.value === null ? !0 : r.value;
      t[o] = /** @type {Props[keyof Props]} */
      a;
    }
  return t;
}
function Mr(e, n) {
  const t = [];
  let r = -1;
  const o = e.passKeys ? /* @__PURE__ */ new Map() : oc;
  for (; ++r < n.children.length; ) {
    const a = n.children[r];
    let i;
    if (e.passKeys) {
      const c = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (c) {
        const l = o.get(c) || 0;
        i = c + "-" + l, o.set(c, l + 1);
      }
    }
    const s = No(e, a, i);
    s !== void 0 && t.push(s);
  }
  return t;
}
function yc(e, n, t) {
  const r = Vl(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? Ll(t) : Ql(t)), r.property === "style") {
      let o = typeof t == "object" ? t : kc(e, String(t));
      return e.stylePropertyNameCase === "css" && (o = wc(o)), ["style", o];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Kl[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function kc(e, n) {
  try {
    return rc(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), o = new ve("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw o.file = e.filePath || void 0, o.url = So + "#cannot-parse-style-attribute", o;
  }
}
function Ao(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const o = n.split(".");
    let a = -1, i;
    for (; ++a < o.length; ) {
      const s = ci(o[a]) ? { type: "Identifier", name: o[a] } : { type: "Literal", value: o[a] };
      i = i ? {
        type: "MemberExpression",
        object: i,
        property: s,
        computed: !!(a && s.type === "Literal"),
        optional: !1
      } : s;
    }
    r = i;
  } else
    r = ci(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const o = (
      /** @type {string | number} */
      r.value
    );
    return Ir.call(e.components, o) ? e.components[o] : o;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Yn(e);
}
function Yn(e, n) {
  const t = new ve(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = So + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function wc(e) {
  const n = {};
  let t;
  for (t in e)
    Ir.call(e, t) && (n[xc(t)] = e[t]);
  return n;
}
function xc(e) {
  let n = e.replace(ac, Sc);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function Sc(e) {
  return "-" + e.toLowerCase();
}
const Wt = {
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
}, Nc = {};
function Dr(e, n) {
  const t = Nc, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, o = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return vo(e, r, o);
}
function vo(e, n, t) {
  if (Tc(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return _i(e.children, n, t);
  }
  return Array.isArray(e) ? _i(e, n, t) : "";
}
function _i(e, n, t) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; )
    r[o] = vo(e[o], n, t);
  return r.join("");
}
function Tc(e) {
  return !!(e && typeof e == "object");
}
const yi = document.createElement("i");
function Lr(e) {
  const n = "&" + e + ";";
  yi.innerHTML = n;
  const t = yi.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function He(e, n, t, r) {
  const o = e.length;
  let a = 0, i;
  if (n < 0 ? n = -n > o ? 0 : o + n : n = n > o ? o : n, t = t > 0 ? t : 0, r.length < 1e4)
    i = Array.from(r), i.unshift(n, t), e.splice(...i);
  else
    for (t && e.splice(n, t); a < r.length; )
      i = r.slice(a, a + 1e4), i.unshift(n, 0), e.splice(...i), a += 1e4, n += 1e4;
}
function Ke(e, n) {
  return e.length > 0 ? (He(e, e.length, 0, n), e) : n;
}
const ki = {}.hasOwnProperty;
function Co(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Ac(n, e[t]);
  return n;
}
function Ac(e, n) {
  let t;
  for (t in n) {
    const o = (ki.call(e, t) ? e[t] : void 0) || (e[t] = {}), a = n[t];
    let i;
    if (a)
      for (i in a) {
        ki.call(o, i) || (o[i] = []);
        const s = a[i];
        vc(
          // @ts-expect-error Looks like a list.
          o[i],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function vc(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  He(e, 0, 0, r);
}
function Oo(e, n) {
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
function Ye(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Re = hn(/[A-Za-z]/), Ae = hn(/[\dA-Za-z]/), Cc = hn(/[#-'*+\--9=?A-Z^-~]/);
function kt(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const br = hn(/\d/), Oc = hn(/[\dA-Fa-f]/), Ic = hn(/[!-/:-@[-`{-~]/);
function q(e) {
  return e !== null && e < -2;
}
function he(e) {
  return e !== null && (e < 0 || e === 32);
}
function re(e) {
  return e === -2 || e === -1 || e === 32;
}
const Ct = hn(new RegExp("\\p{P}|\\p{S}", "u")), wn = hn(/\s/);
function hn(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function Dn(e) {
  const n = [];
  let t = -1, r = 0, o = 0;
  for (; ++t < e.length; ) {
    const a = e.charCodeAt(t);
    let i = "";
    if (a === 37 && Ae(e.charCodeAt(t + 1)) && Ae(e.charCodeAt(t + 2)))
      o = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (i = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const s = e.charCodeAt(t + 1);
      a < 56320 && s > 56319 && s < 57344 ? (i = String.fromCharCode(a, s), o = 1) : i = "�";
    } else
      i = String.fromCharCode(a);
    i && (n.push(e.slice(r, t), encodeURIComponent(i)), r = t + o + 1, i = ""), o && (t += o, o = 0);
  }
  return n.join("") + e.slice(r);
}
function oe(e, n, t, r) {
  const o = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return i;
  function i(c) {
    return re(c) ? (e.enter(t), s(c)) : n(c);
  }
  function s(c) {
    return re(c) && a++ < o ? (e.consume(c), s) : (e.exit(t), n(c));
  }
}
const Rc = {
  tokenize: Mc
};
function Mc(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, o);
  let t;
  return n;
  function r(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), oe(e, n, "linePrefix");
  }
  function o(s) {
    return e.enter("paragraph"), a(s);
  }
  function a(s) {
    const c = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = c), t = c, i(s);
  }
  function i(s) {
    if (s === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(s);
      return;
    }
    return q(s) ? (e.consume(s), e.exit("chunkText"), a) : (e.consume(s), i);
  }
}
const Dc = {
  tokenize: Lc
}, wi = {
  tokenize: Pc
};
function Lc(e) {
  const n = this, t = [];
  let r = 0, o, a, i;
  return s;
  function s(S) {
    if (r < t.length) {
      const C = t[r];
      return n.containerState = C[1], e.attempt(C[0].continuation, c, l)(S);
    }
    return l(S);
  }
  function c(S) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, o && w();
      const C = n.events.length;
      let R = C, k;
      for (; R--; )
        if (n.events[R][0] === "exit" && n.events[R][1].type === "chunkFlow") {
          k = n.events[R][1].end;
          break;
        }
      h(r);
      let U = C;
      for (; U < n.events.length; )
        n.events[U][1].end = {
          ...k
        }, U++;
      return He(n.events, R + 1, 0, n.events.slice(C)), n.events.length = U, l(S);
    }
    return s(S);
  }
  function l(S) {
    if (r === t.length) {
      if (!o)
        return p(S);
      if (o.currentConstruct && o.currentConstruct.concrete)
        return g(S);
      n.interrupt = !!(o.currentConstruct && !o._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(wi, u, d)(S);
  }
  function u(S) {
    return o && w(), h(r), p(S);
  }
  function d(S) {
    return n.parser.lazy[n.now().line] = r !== t.length, i = n.now().offset, g(S);
  }
  function p(S) {
    return n.containerState = {}, e.attempt(wi, f, g)(S);
  }
  function f(S) {
    return r++, t.push([n.currentConstruct, n.containerState]), p(S);
  }
  function g(S) {
    if (S === null) {
      o && w(), h(0), e.consume(S);
      return;
    }
    return o = o || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: o,
      contentType: "flow",
      previous: a
    }), _(S);
  }
  function _(S) {
    if (S === null) {
      y(e.exit("chunkFlow"), !0), h(0), e.consume(S);
      return;
    }
    return q(S) ? (e.consume(S), y(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, s) : (e.consume(S), _);
  }
  function y(S, C) {
    const R = n.sliceStream(S);
    if (C && R.push(null), S.previous = a, a && (a.next = S), a = S, o.defineSkip(S.start), o.write(R), n.parser.lazy[S.start.line]) {
      let k = o.events.length;
      for (; k--; )
        if (
          // The token starts before the line ending…
          o.events[k][1].start.offset < i && // …and either is not ended yet…
          (!o.events[k][1].end || // …or ends after it.
          o.events[k][1].end.offset > i)
        )
          return;
      const U = n.events.length;
      let $ = U, H, x;
      for (; $--; )
        if (n.events[$][0] === "exit" && n.events[$][1].type === "chunkFlow") {
          if (H) {
            x = n.events[$][1].end;
            break;
          }
          H = !0;
        }
      for (h(r), k = U; k < n.events.length; )
        n.events[k][1].end = {
          ...x
        }, k++;
      He(n.events, $ + 1, 0, n.events.slice(U)), n.events.length = k;
    }
  }
  function h(S) {
    let C = t.length;
    for (; C-- > S; ) {
      const R = t[C];
      n.containerState = R[1], R[0].exit.call(n, e);
    }
    t.length = S;
  }
  function w() {
    o.write([null]), a = void 0, o = void 0, n.containerState._closeFlow = void 0;
  }
}
function Pc(e, n, t) {
  return oe(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Rn(e) {
  if (e === null || he(e) || wn(e))
    return 1;
  if (Ct(e))
    return 2;
}
function Ot(e, n, t) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; ) {
    const a = e[o].resolveAll;
    a && !r.includes(a) && (n = a(n, t), r.push(a));
  }
  return n;
}
const Er = {
  name: "attention",
  resolveAll: Bc,
  tokenize: Fc
};
function Bc(e, n) {
  let t = -1, r, o, a, i, s, c, l, u;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const d = {
            ...e[r][1].end
          }, p = {
            ...e[t][1].start
          };
          xi(d, -c), xi(p, c), i = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: {
              ...e[r][1].end
            }
          }, s = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: p
          }, a = {
            type: c > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, o = {
            type: c > 1 ? "strong" : "emphasis",
            start: {
              ...i.start
            },
            end: {
              ...s.end
            }
          }, e[r][1].end = {
            ...i.start
          }, e[t][1].start = {
            ...s.end
          }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = Ke(l, [["enter", e[r][1], n], ["exit", e[r][1], n]])), l = Ke(l, [["enter", o, n], ["enter", i, n], ["exit", i, n], ["enter", a, n]]), l = Ke(l, Ot(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), l = Ke(l, [["exit", a, n], ["enter", s, n], ["exit", s, n], ["exit", o, n]]), e[t][1].end.offset - e[t][1].start.offset ? (u = 2, l = Ke(l, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : u = 0, He(e, r - 1, t - r + 3, l), t = r + l.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Fc(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, o = Rn(r);
  let a;
  return i;
  function i(c) {
    return a = c, e.enter("attentionSequence"), s(c);
  }
  function s(c) {
    if (c === a)
      return e.consume(c), s;
    const l = e.exit("attentionSequence"), u = Rn(c), d = !u || u === 2 && o || t.includes(c), p = !o || o === 2 && u || t.includes(r);
    return l._open = !!(a === 42 ? d : d && (o || !p)), l._close = !!(a === 42 ? p : p && (u || !d)), n(c);
  }
}
function xi(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const zc = {
  name: "autolink",
  tokenize: Uc
};
function Uc(e, n, t) {
  let r = 0;
  return o;
  function o(f) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(f) {
    return Re(f) ? (e.consume(f), i) : f === 64 ? t(f) : l(f);
  }
  function i(f) {
    return f === 43 || f === 45 || f === 46 || Ae(f) ? (r = 1, s(f)) : l(f);
  }
  function s(f) {
    return f === 58 ? (e.consume(f), r = 0, c) : (f === 43 || f === 45 || f === 46 || Ae(f)) && r++ < 32 ? (e.consume(f), s) : (r = 0, l(f));
  }
  function c(f) {
    return f === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : f === null || f === 32 || f === 60 || kt(f) ? t(f) : (e.consume(f), c);
  }
  function l(f) {
    return f === 64 ? (e.consume(f), u) : Cc(f) ? (e.consume(f), l) : t(f);
  }
  function u(f) {
    return Ae(f) ? d(f) : t(f);
  }
  function d(f) {
    return f === 46 ? (e.consume(f), r = 0, u) : f === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : p(f);
  }
  function p(f) {
    if ((f === 45 || Ae(f)) && r++ < 63) {
      const g = f === 45 ? p : d;
      return e.consume(f), g;
    }
    return t(f);
  }
}
const Qn = {
  partial: !0,
  tokenize: $c
};
function $c(e, n, t) {
  return r;
  function r(a) {
    return re(a) ? oe(e, o, "linePrefix")(a) : o(a);
  }
  function o(a) {
    return a === null || q(a) ? n(a) : t(a);
  }
}
const Io = {
  continuation: {
    tokenize: Gc
  },
  exit: Kc,
  name: "blockQuote",
  tokenize: Hc
};
function Hc(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    if (i === 62) {
      const s = r.containerState;
      return s.open || (e.enter("blockQuote", {
        _container: !0
      }), s.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(i), e.exit("blockQuoteMarker"), a;
    }
    return t(i);
  }
  function a(i) {
    return re(i) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(i), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(i));
  }
}
function Gc(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return re(i) ? oe(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : a(i);
  }
  function a(i) {
    return e.attempt(Io, n, t)(i);
  }
}
function Kc(e) {
  e.exit("blockQuote");
}
const Ro = {
  name: "characterEscape",
  tokenize: qc
};
function qc(e, n, t) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), o;
  }
  function o(a) {
    return Ic(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(a);
  }
}
const Mo = {
  name: "characterReference",
  tokenize: Wc
};
function Wc(e, n, t) {
  const r = this;
  let o = 0, a, i;
  return s;
  function s(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), c;
  }
  function c(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, i = Ae, u(d));
  }
  function l(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, i = Oc, u) : (e.enter("characterReferenceValue"), a = 7, i = br, u(d));
  }
  function u(d) {
    if (d === 59 && o) {
      const p = e.exit("characterReferenceValue");
      return i === Ae && !Lr(r.sliceSerialize(p)) ? t(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return i(d) && o++ < a ? (e.consume(d), u) : t(d);
  }
}
const Si = {
  partial: !0,
  tokenize: Yc
}, Ni = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Vc
};
function Vc(e, n, t) {
  const r = this, o = {
    partial: !0,
    tokenize: R
  };
  let a = 0, i = 0, s;
  return c;
  function c(k) {
    return l(k);
  }
  function l(k) {
    const U = r.events[r.events.length - 1];
    return a = U && U[1].type === "linePrefix" ? U[2].sliceSerialize(U[1], !0).length : 0, s = k, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(k);
  }
  function u(k) {
    return k === s ? (i++, e.consume(k), u) : i < 3 ? t(k) : (e.exit("codeFencedFenceSequence"), re(k) ? oe(e, d, "whitespace")(k) : d(k));
  }
  function d(k) {
    return k === null || q(k) ? (e.exit("codeFencedFence"), r.interrupt ? n(k) : e.check(Si, _, C)(k)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(k));
  }
  function p(k) {
    return k === null || q(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(k)) : re(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), oe(e, f, "whitespace")(k)) : k === 96 && k === s ? t(k) : (e.consume(k), p);
  }
  function f(k) {
    return k === null || q(k) ? d(k) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), g(k));
  }
  function g(k) {
    return k === null || q(k) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(k)) : k === 96 && k === s ? t(k) : (e.consume(k), g);
  }
  function _(k) {
    return e.attempt(o, C, y)(k);
  }
  function y(k) {
    return e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), h;
  }
  function h(k) {
    return a > 0 && re(k) ? oe(e, w, "linePrefix", a + 1)(k) : w(k);
  }
  function w(k) {
    return k === null || q(k) ? e.check(Si, _, C)(k) : (e.enter("codeFlowValue"), S(k));
  }
  function S(k) {
    return k === null || q(k) ? (e.exit("codeFlowValue"), w(k)) : (e.consume(k), S);
  }
  function C(k) {
    return e.exit("codeFenced"), n(k);
  }
  function R(k, U, $) {
    let H = 0;
    return x;
    function x(v) {
      return k.enter("lineEnding"), k.consume(v), k.exit("lineEnding"), P;
    }
    function P(v) {
      return k.enter("codeFencedFence"), re(v) ? oe(k, B, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(v) : B(v);
    }
    function B(v) {
      return v === s ? (k.enter("codeFencedFenceSequence"), J(v)) : $(v);
    }
    function J(v) {
      return v === s ? (H++, k.consume(v), J) : H >= i ? (k.exit("codeFencedFenceSequence"), re(v) ? oe(k, D, "whitespace")(v) : D(v)) : $(v);
    }
    function D(v) {
      return v === null || q(v) ? (k.exit("codeFencedFence"), U(v)) : $(v);
    }
  }
}
function Yc(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return i === null ? t(i) : (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), a);
  }
  function a(i) {
    return r.parser.lazy[r.now().line] ? t(i) : n(i);
  }
}
const Vt = {
  name: "codeIndented",
  tokenize: Xc
}, Zc = {
  partial: !0,
  tokenize: Qc
};
function Xc(e, n, t) {
  const r = this;
  return o;
  function o(l) {
    return e.enter("codeIndented"), oe(e, a, "linePrefix", 5)(l);
  }
  function a(l) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? i(l) : t(l);
  }
  function i(l) {
    return l === null ? c(l) : q(l) ? e.attempt(Zc, i, c)(l) : (e.enter("codeFlowValue"), s(l));
  }
  function s(l) {
    return l === null || q(l) ? (e.exit("codeFlowValue"), i(l)) : (e.consume(l), s);
  }
  function c(l) {
    return e.exit("codeIndented"), n(l);
  }
}
function Qc(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return r.parser.lazy[r.now().line] ? t(i) : q(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o) : oe(e, a, "linePrefix", 5)(i);
  }
  function a(i) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? n(i) : q(i) ? o(i) : t(i);
  }
}
const jc = {
  name: "codeText",
  previous: eu,
  resolve: Jc,
  tokenize: nu
};
function Jc(e) {
  let n = e.length - 4, t = 3, r, o;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    o === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (o = r) : (r === n || e[r][1].type === "lineEnding") && (e[o][1].type = "codeTextData", r !== o + 2 && (e[o][1].end = e[r - 1][1].end, e.splice(o + 2, r - o - 2), n -= r - o - 2, r = o + 2), o = void 0);
  return e;
}
function eu(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function nu(e, n, t) {
  let r = 0, o, a;
  return i;
  function i(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), s(d);
  }
  function s(d) {
    return d === 96 ? (e.consume(d), r++, s) : (e.exit("codeTextSequence"), c(d));
  }
  function c(d) {
    return d === null ? t(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), c) : d === 96 ? (a = e.enter("codeTextSequence"), o = 0, u(d)) : q(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(d));
  }
  function l(d) {
    return d === null || d === 32 || d === 96 || q(d) ? (e.exit("codeTextData"), c(d)) : (e.consume(d), l);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), o++, u) : o === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(d)) : (a.type = "codeTextData", l(d));
  }
}
class tu {
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
    const o = t || 0;
    this.setCursor(Math.trunc(n));
    const a = this.right.splice(this.right.length - o, Number.POSITIVE_INFINITY);
    return r && Hn(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Hn(this.left, n);
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
    this.setCursor(0), Hn(this.right, n.reverse());
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
        Hn(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        Hn(this.left, t.reverse());
      }
  }
}
function Hn(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function Do(e) {
  const n = {};
  let t = -1, r, o, a, i, s, c, l;
  const u = new tu(e);
  for (; ++t < u.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = u.get(t), t && r[1].type === "chunkFlow" && u.get(t - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content"))
      for (; ++a < c.length && c[a][1].type !== "content"; )
        c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, ru(u, t)), t = n[t], l = !0);
    else if (r[1]._container) {
      for (a = t, o = void 0; a--; )
        if (i = u.get(a), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank")
          i[0] === "enter" && (o && (u.get(o)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", o = a);
        else if (!(i[1].type === "linePrefix" || i[1].type === "listItemIndent")) break;
      o && (r[1].end = {
        ...u.get(o)[1].start
      }, s = u.slice(o, t), s.unshift(r), u.splice(o, t - o + 1, s));
    }
  }
  return He(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !l;
}
function ru(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let o = n - 1;
  const a = [];
  let i = t._tokenizer;
  i || (i = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
  const s = i.events, c = [], l = {};
  let u, d, p = -1, f = t, g = 0, _ = 0;
  const y = [_];
  for (; f; ) {
    for (; e.get(++o)[1] !== f; )
      ;
    a.push(o), f._tokenizer || (u = r.sliceStream(f), f.next || u.push(null), d && i.defineSkip(f.start), f._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(u), f._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), d = f, f = f.next;
  }
  for (f = t; ++p < s.length; )
    // Find a void token that includes a break.
    s[p][0] === "exit" && s[p - 1][0] === "enter" && s[p][1].type === s[p - 1][1].type && s[p][1].start.line !== s[p][1].end.line && (_ = p + 1, y.push(_), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (i.events = [], f ? (f._tokenizer = void 0, f.previous = void 0) : y.pop(), p = y.length; p--; ) {
    const h = s.slice(y[p], y[p + 1]), w = a.pop();
    c.push([w, w + h.length - 1]), e.splice(w, 2, h);
  }
  for (c.reverse(), p = -1; ++p < c.length; )
    l[g + c[p][0]] = g + c[p][1], g += c[p][1] - c[p][0] - 1;
  return l;
}
const iu = {
  resolve: au,
  tokenize: su
}, ou = {
  partial: !0,
  tokenize: lu
};
function au(e) {
  return Do(e), e;
}
function su(e, n) {
  let t;
  return r;
  function r(s) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), o(s);
  }
  function o(s) {
    return s === null ? a(s) : q(s) ? e.check(ou, i, a)(s) : (e.consume(s), o);
  }
  function a(s) {
    return e.exit("chunkContent"), e.exit("content"), n(s);
  }
  function i(s) {
    return e.consume(s), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, o;
  }
}
function lu(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), oe(e, a, "linePrefix");
  }
  function a(i) {
    if (i === null || q(i))
      return t(i);
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? n(i) : e.interrupt(r.parser.constructs.flow, t, n)(i);
  }
}
function Lo(e, n, t, r, o, a, i, s, c) {
  const l = c || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(h) {
    return h === 60 ? (e.enter(r), e.enter(o), e.enter(a), e.consume(h), e.exit(a), p) : h === null || h === 32 || h === 41 || kt(h) ? t(h) : (e.enter(r), e.enter(i), e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), _(h));
  }
  function p(h) {
    return h === 62 ? (e.enter(a), e.consume(h), e.exit(a), e.exit(o), e.exit(r), n) : (e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === 62 ? (e.exit("chunkString"), e.exit(s), p(h)) : h === null || h === 60 || q(h) ? t(h) : (e.consume(h), h === 92 ? g : f);
  }
  function g(h) {
    return h === 60 || h === 62 || h === 92 ? (e.consume(h), f) : f(h);
  }
  function _(h) {
    return !u && (h === null || h === 41 || he(h)) ? (e.exit("chunkString"), e.exit(s), e.exit(i), e.exit(r), n(h)) : u < l && h === 40 ? (e.consume(h), u++, _) : h === 41 ? (e.consume(h), u--, _) : h === null || h === 32 || h === 40 || kt(h) ? t(h) : (e.consume(h), h === 92 ? y : _);
  }
  function y(h) {
    return h === 40 || h === 41 || h === 92 ? (e.consume(h), _) : _(h);
  }
}
function Po(e, n, t, r, o, a) {
  const i = this;
  let s = 0, c;
  return l;
  function l(f) {
    return e.enter(r), e.enter(o), e.consume(f), e.exit(o), e.enter(a), u;
  }
  function u(f) {
    return s > 999 || f === null || f === 91 || f === 93 && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    f === 94 && !s && "_hiddenFootnoteSupport" in i.parser.constructs ? t(f) : f === 93 ? (e.exit(a), e.enter(o), e.consume(f), e.exit(o), e.exit(r), n) : q(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(f));
  }
  function d(f) {
    return f === null || f === 91 || f === 93 || q(f) || s++ > 999 ? (e.exit("chunkString"), u(f)) : (e.consume(f), c || (c = !re(f)), f === 92 ? p : d);
  }
  function p(f) {
    return f === 91 || f === 92 || f === 93 ? (e.consume(f), s++, d) : d(f);
  }
}
function Bo(e, n, t, r, o, a) {
  let i;
  return s;
  function s(p) {
    return p === 34 || p === 39 || p === 40 ? (e.enter(r), e.enter(o), e.consume(p), e.exit(o), i = p === 40 ? 41 : p, c) : t(p);
  }
  function c(p) {
    return p === i ? (e.enter(o), e.consume(p), e.exit(o), e.exit(r), n) : (e.enter(a), l(p));
  }
  function l(p) {
    return p === i ? (e.exit(a), c(i)) : p === null ? t(p) : q(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), oe(e, l, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(p));
  }
  function u(p) {
    return p === i || p === null || q(p) ? (e.exit("chunkString"), l(p)) : (e.consume(p), p === 92 ? d : u);
  }
  function d(p) {
    return p === i || p === 92 ? (e.consume(p), u) : u(p);
  }
}
function Wn(e, n) {
  let t;
  return r;
  function r(o) {
    return q(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t = !0, r) : re(o) ? oe(e, r, t ? "linePrefix" : "lineSuffix")(o) : n(o);
  }
}
const cu = {
  name: "definition",
  tokenize: du
}, uu = {
  partial: !0,
  tokenize: fu
};
function du(e, n, t) {
  const r = this;
  let o;
  return a;
  function a(f) {
    return e.enter("definition"), i(f);
  }
  function i(f) {
    return Po.call(
      r,
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(f);
  }
  function s(f) {
    return o = Ye(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), f === 58 ? (e.enter("definitionMarker"), e.consume(f), e.exit("definitionMarker"), c) : t(f);
  }
  function c(f) {
    return he(f) ? Wn(e, l)(f) : l(f);
  }
  function l(f) {
    return Lo(
      e,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(f);
  }
  function u(f) {
    return e.attempt(uu, d, d)(f);
  }
  function d(f) {
    return re(f) ? oe(e, p, "whitespace")(f) : p(f);
  }
  function p(f) {
    return f === null || q(f) ? (e.exit("definition"), r.parser.defined.push(o), n(f)) : t(f);
  }
}
function fu(e, n, t) {
  return r;
  function r(s) {
    return he(s) ? Wn(e, o)(s) : t(s);
  }
  function o(s) {
    return Bo(e, a, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function a(s) {
    return re(s) ? oe(e, i, "whitespace")(s) : i(s);
  }
  function i(s) {
    return s === null || q(s) ? n(s) : t(s);
  }
}
const pu = {
  name: "hardBreakEscape",
  tokenize: gu
};
function gu(e, n, t) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), o;
  }
  function o(a) {
    return q(a) ? (e.exit("hardBreakEscape"), n(a)) : t(a);
  }
}
const hu = {
  name: "headingAtx",
  resolve: mu,
  tokenize: bu
};
function mu(e, n) {
  let t = e.length - 2, r = 3, o, a;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (o = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, a = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, He(e, r, t - r + 1, [["enter", o, n], ["enter", a, n], ["exit", a, n], ["exit", o, n]])), e;
}
function bu(e, n, t) {
  let r = 0;
  return o;
  function o(u) {
    return e.enter("atxHeading"), a(u);
  }
  function a(u) {
    return e.enter("atxHeadingSequence"), i(u);
  }
  function i(u) {
    return u === 35 && r++ < 6 ? (e.consume(u), i) : u === null || he(u) ? (e.exit("atxHeadingSequence"), s(u)) : t(u);
  }
  function s(u) {
    return u === 35 ? (e.enter("atxHeadingSequence"), c(u)) : u === null || q(u) ? (e.exit("atxHeading"), n(u)) : re(u) ? oe(e, s, "whitespace")(u) : (e.enter("atxHeadingText"), l(u));
  }
  function c(u) {
    return u === 35 ? (e.consume(u), c) : (e.exit("atxHeadingSequence"), s(u));
  }
  function l(u) {
    return u === null || u === 35 || he(u) ? (e.exit("atxHeadingText"), s(u)) : (e.consume(u), l);
  }
}
const Eu = [
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
], Ti = ["pre", "script", "style", "textarea"], _u = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: wu,
  tokenize: xu
}, yu = {
  partial: !0,
  tokenize: Nu
}, ku = {
  partial: !0,
  tokenize: Su
};
function wu(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function xu(e, n, t) {
  const r = this;
  let o, a, i, s, c;
  return l;
  function l(E) {
    return u(E);
  }
  function u(E) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(E), d;
  }
  function d(E) {
    return E === 33 ? (e.consume(E), p) : E === 47 ? (e.consume(E), a = !0, _) : E === 63 ? (e.consume(E), o = 3, r.interrupt ? n : m) : Re(E) ? (e.consume(E), i = String.fromCharCode(E), y) : t(E);
  }
  function p(E) {
    return E === 45 ? (e.consume(E), o = 2, f) : E === 91 ? (e.consume(E), o = 5, s = 0, g) : Re(E) ? (e.consume(E), o = 4, r.interrupt ? n : m) : t(E);
  }
  function f(E) {
    return E === 45 ? (e.consume(E), r.interrupt ? n : m) : t(E);
  }
  function g(E) {
    const Ce = "CDATA[";
    return E === Ce.charCodeAt(s++) ? (e.consume(E), s === Ce.length ? r.interrupt ? n : B : g) : t(E);
  }
  function _(E) {
    return Re(E) ? (e.consume(E), i = String.fromCharCode(E), y) : t(E);
  }
  function y(E) {
    if (E === null || E === 47 || E === 62 || he(E)) {
      const Ce = E === 47, Ge = i.toLowerCase();
      return !Ce && !a && Ti.includes(Ge) ? (o = 1, r.interrupt ? n(E) : B(E)) : Eu.includes(i.toLowerCase()) ? (o = 6, Ce ? (e.consume(E), h) : r.interrupt ? n(E) : B(E)) : (o = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(E) : a ? w(E) : S(E));
    }
    return E === 45 || Ae(E) ? (e.consume(E), i += String.fromCharCode(E), y) : t(E);
  }
  function h(E) {
    return E === 62 ? (e.consume(E), r.interrupt ? n : B) : t(E);
  }
  function w(E) {
    return re(E) ? (e.consume(E), w) : x(E);
  }
  function S(E) {
    return E === 47 ? (e.consume(E), x) : E === 58 || E === 95 || Re(E) ? (e.consume(E), C) : re(E) ? (e.consume(E), S) : x(E);
  }
  function C(E) {
    return E === 45 || E === 46 || E === 58 || E === 95 || Ae(E) ? (e.consume(E), C) : R(E);
  }
  function R(E) {
    return E === 61 ? (e.consume(E), k) : re(E) ? (e.consume(E), R) : S(E);
  }
  function k(E) {
    return E === null || E === 60 || E === 61 || E === 62 || E === 96 ? t(E) : E === 34 || E === 39 ? (e.consume(E), c = E, U) : re(E) ? (e.consume(E), k) : $(E);
  }
  function U(E) {
    return E === c ? (e.consume(E), c = null, H) : E === null || q(E) ? t(E) : (e.consume(E), U);
  }
  function $(E) {
    return E === null || E === 34 || E === 39 || E === 47 || E === 60 || E === 61 || E === 62 || E === 96 || he(E) ? R(E) : (e.consume(E), $);
  }
  function H(E) {
    return E === 47 || E === 62 || re(E) ? S(E) : t(E);
  }
  function x(E) {
    return E === 62 ? (e.consume(E), P) : t(E);
  }
  function P(E) {
    return E === null || q(E) ? B(E) : re(E) ? (e.consume(E), P) : t(E);
  }
  function B(E) {
    return E === 45 && o === 2 ? (e.consume(E), Z) : E === 60 && o === 1 ? (e.consume(E), se) : E === 62 && o === 4 ? (e.consume(E), ue) : E === 63 && o === 3 ? (e.consume(E), m) : E === 93 && o === 5 ? (e.consume(E), fe) : q(E) && (o === 6 || o === 7) ? (e.exit("htmlFlowData"), e.check(yu, pe, J)(E)) : E === null || q(E) ? (e.exit("htmlFlowData"), J(E)) : (e.consume(E), B);
  }
  function J(E) {
    return e.check(ku, D, pe)(E);
  }
  function D(E) {
    return e.enter("lineEnding"), e.consume(E), e.exit("lineEnding"), v;
  }
  function v(E) {
    return E === null || q(E) ? J(E) : (e.enter("htmlFlowData"), B(E));
  }
  function Z(E) {
    return E === 45 ? (e.consume(E), m) : B(E);
  }
  function se(E) {
    return E === 47 ? (e.consume(E), i = "", X) : B(E);
  }
  function X(E) {
    if (E === 62) {
      const Ce = i.toLowerCase();
      return Ti.includes(Ce) ? (e.consume(E), ue) : B(E);
    }
    return Re(E) && i.length < 8 ? (e.consume(E), i += String.fromCharCode(E), X) : B(E);
  }
  function fe(E) {
    return E === 93 ? (e.consume(E), m) : B(E);
  }
  function m(E) {
    return E === 62 ? (e.consume(E), ue) : E === 45 && o === 2 ? (e.consume(E), m) : B(E);
  }
  function ue(E) {
    return E === null || q(E) ? (e.exit("htmlFlowData"), pe(E)) : (e.consume(E), ue);
  }
  function pe(E) {
    return e.exit("htmlFlow"), n(E);
  }
}
function Su(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return q(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), a) : t(i);
  }
  function a(i) {
    return r.parser.lazy[r.now().line] ? t(i) : n(i);
  }
}
function Nu(e, n, t) {
  return r;
  function r(o) {
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), e.attempt(Qn, n, t);
  }
}
const Tu = {
  name: "htmlText",
  tokenize: Au
};
function Au(e, n, t) {
  const r = this;
  let o, a, i;
  return s;
  function s(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), c;
  }
  function c(m) {
    return m === 33 ? (e.consume(m), l) : m === 47 ? (e.consume(m), R) : m === 63 ? (e.consume(m), S) : Re(m) ? (e.consume(m), $) : t(m);
  }
  function l(m) {
    return m === 45 ? (e.consume(m), u) : m === 91 ? (e.consume(m), a = 0, g) : Re(m) ? (e.consume(m), w) : t(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), f) : t(m);
  }
  function d(m) {
    return m === null ? t(m) : m === 45 ? (e.consume(m), p) : q(m) ? (i = d, se(m)) : (e.consume(m), d);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), f) : d(m);
  }
  function f(m) {
    return m === 62 ? Z(m) : m === 45 ? p(m) : d(m);
  }
  function g(m) {
    const ue = "CDATA[";
    return m === ue.charCodeAt(a++) ? (e.consume(m), a === ue.length ? _ : g) : t(m);
  }
  function _(m) {
    return m === null ? t(m) : m === 93 ? (e.consume(m), y) : q(m) ? (i = _, se(m)) : (e.consume(m), _);
  }
  function y(m) {
    return m === 93 ? (e.consume(m), h) : _(m);
  }
  function h(m) {
    return m === 62 ? Z(m) : m === 93 ? (e.consume(m), h) : _(m);
  }
  function w(m) {
    return m === null || m === 62 ? Z(m) : q(m) ? (i = w, se(m)) : (e.consume(m), w);
  }
  function S(m) {
    return m === null ? t(m) : m === 63 ? (e.consume(m), C) : q(m) ? (i = S, se(m)) : (e.consume(m), S);
  }
  function C(m) {
    return m === 62 ? Z(m) : S(m);
  }
  function R(m) {
    return Re(m) ? (e.consume(m), k) : t(m);
  }
  function k(m) {
    return m === 45 || Ae(m) ? (e.consume(m), k) : U(m);
  }
  function U(m) {
    return q(m) ? (i = U, se(m)) : re(m) ? (e.consume(m), U) : Z(m);
  }
  function $(m) {
    return m === 45 || Ae(m) ? (e.consume(m), $) : m === 47 || m === 62 || he(m) ? H(m) : t(m);
  }
  function H(m) {
    return m === 47 ? (e.consume(m), Z) : m === 58 || m === 95 || Re(m) ? (e.consume(m), x) : q(m) ? (i = H, se(m)) : re(m) ? (e.consume(m), H) : Z(m);
  }
  function x(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Ae(m) ? (e.consume(m), x) : P(m);
  }
  function P(m) {
    return m === 61 ? (e.consume(m), B) : q(m) ? (i = P, se(m)) : re(m) ? (e.consume(m), P) : H(m);
  }
  function B(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), o = m, J) : q(m) ? (i = B, se(m)) : re(m) ? (e.consume(m), B) : (e.consume(m), D);
  }
  function J(m) {
    return m === o ? (e.consume(m), o = void 0, v) : m === null ? t(m) : q(m) ? (i = J, se(m)) : (e.consume(m), J);
  }
  function D(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? t(m) : m === 47 || m === 62 || he(m) ? H(m) : (e.consume(m), D);
  }
  function v(m) {
    return m === 47 || m === 62 || he(m) ? H(m) : t(m);
  }
  function Z(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(m);
  }
  function se(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), X;
  }
  function X(m) {
    return re(m) ? oe(e, fe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : fe(m);
  }
  function fe(m) {
    return e.enter("htmlTextData"), i(m);
  }
}
const Pr = {
  name: "labelEnd",
  resolveAll: Iu,
  resolveTo: Ru,
  tokenize: Mu
}, vu = {
  tokenize: Du
}, Cu = {
  tokenize: Lu
}, Ou = {
  tokenize: Pu
};
function Iu(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const o = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += o;
    }
  }
  return e.length !== t.length && He(e, 0, e.length, t), e;
}
function Ru(e, n) {
  let t = e.length, r = 0, o, a, i, s;
  for (; t--; )
    if (o = e[t][1], a) {
      if (o.type === "link" || o.type === "labelLink" && o._inactive)
        break;
      e[t][0] === "enter" && o.type === "labelLink" && (o._inactive = !0);
    } else if (i) {
      if (e[t][0] === "enter" && (o.type === "labelImage" || o.type === "labelLink") && !o._balanced && (a = t, o.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else o.type === "labelEnd" && (i = t);
  const c = {
    type: e[a][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, l = {
    type: "label",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[i][1].end
    }
  }, u = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[i - 2][1].start
    }
  };
  return s = [["enter", c, n], ["enter", l, n]], s = Ke(s, e.slice(a + 1, a + r + 3)), s = Ke(s, [["enter", u, n]]), s = Ke(s, Ot(n.parser.constructs.insideSpan.null, e.slice(a + r + 4, i - 3), n)), s = Ke(s, [["exit", u, n], e[i - 2], e[i - 1], ["exit", l, n]]), s = Ke(s, e.slice(i + 1)), s = Ke(s, [["exit", c, n]]), He(e, a, e.length, s), e;
}
function Mu(e, n, t) {
  const r = this;
  let o = r.events.length, a, i;
  for (; o--; )
    if ((r.events[o][1].type === "labelImage" || r.events[o][1].type === "labelLink") && !r.events[o][1]._balanced) {
      a = r.events[o][1];
      break;
    }
  return s;
  function s(p) {
    return a ? a._inactive ? d(p) : (i = r.parser.defined.includes(Ye(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(p), e.exit("labelMarker"), e.exit("labelEnd"), c) : t(p);
  }
  function c(p) {
    return p === 40 ? e.attempt(vu, u, i ? u : d)(p) : p === 91 ? e.attempt(Cu, u, i ? l : d)(p) : i ? u(p) : d(p);
  }
  function l(p) {
    return e.attempt(Ou, u, d)(p);
  }
  function u(p) {
    return n(p);
  }
  function d(p) {
    return a._balanced = !0, t(p);
  }
}
function Du(e, n, t) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), o;
  }
  function o(d) {
    return he(d) ? Wn(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : Lo(e, i, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function i(d) {
    return he(d) ? Wn(e, c)(d) : u(d);
  }
  function s(d) {
    return t(d);
  }
  function c(d) {
    return d === 34 || d === 39 || d === 40 ? Bo(e, l, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function l(d) {
    return he(d) ? Wn(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), n) : t(d);
  }
}
function Lu(e, n, t) {
  const r = this;
  return o;
  function o(s) {
    return Po.call(r, e, a, i, "reference", "referenceMarker", "referenceString")(s);
  }
  function a(s) {
    return r.parser.defined.includes(Ye(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(s) : t(s);
  }
  function i(s) {
    return t(s);
  }
}
function Pu(e, n, t) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), o;
  }
  function o(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), n) : t(a);
  }
}
const Bu = {
  name: "labelStartImage",
  resolveAll: Pr.resolveAll,
  tokenize: Fu
};
function Fu(e, n, t) {
  const r = this;
  return o;
  function o(s) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(s), e.exit("labelImageMarker"), a;
  }
  function a(s) {
    return s === 91 ? (e.enter("labelMarker"), e.consume(s), e.exit("labelMarker"), e.exit("labelImage"), i) : t(s);
  }
  function i(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(s) : n(s);
  }
}
const zu = {
  name: "labelStartLink",
  resolveAll: Pr.resolveAll,
  tokenize: Uu
};
function Uu(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(i), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(i) {
    return i === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(i) : n(i);
  }
}
const Yt = {
  name: "lineEnding",
  tokenize: $u
};
function $u(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), oe(e, n, "linePrefix");
  }
}
const bt = {
  name: "thematicBreak",
  tokenize: Hu
};
function Hu(e, n, t) {
  let r = 0, o;
  return a;
  function a(l) {
    return e.enter("thematicBreak"), i(l);
  }
  function i(l) {
    return o = l, s(l);
  }
  function s(l) {
    return l === o ? (e.enter("thematicBreakSequence"), c(l)) : r >= 3 && (l === null || q(l)) ? (e.exit("thematicBreak"), n(l)) : t(l);
  }
  function c(l) {
    return l === o ? (e.consume(l), r++, c) : (e.exit("thematicBreakSequence"), re(l) ? oe(e, s, "whitespace")(l) : s(l));
  }
}
const Me = {
  continuation: {
    tokenize: Wu
  },
  exit: Yu,
  name: "list",
  tokenize: qu
}, Gu = {
  partial: !0,
  tokenize: Zu
}, Ku = {
  partial: !0,
  tokenize: Vu
};
function qu(e, n, t) {
  const r = this, o = r.events[r.events.length - 1];
  let a = o && o[1].type === "linePrefix" ? o[2].sliceSerialize(o[1], !0).length : 0, i = 0;
  return s;
  function s(f) {
    const g = r.containerState.type || (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || f === r.containerState.marker : br(f)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), f === 42 || f === 45 ? e.check(bt, t, l)(f) : l(f);
      if (!r.interrupt || f === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), c(f);
    }
    return t(f);
  }
  function c(f) {
    return br(f) && ++i < 10 ? (e.consume(f), c) : (!r.interrupt || i < 2) && (r.containerState.marker ? f === r.containerState.marker : f === 41 || f === 46) ? (e.exit("listItemValue"), l(f)) : t(f);
  }
  function l(f) {
    return e.enter("listItemMarker"), e.consume(f), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || f, e.check(
      Qn,
      // Can’t be empty when interrupting.
      r.interrupt ? t : u,
      e.attempt(Gu, p, d)
    );
  }
  function u(f) {
    return r.containerState.initialBlankLine = !0, a++, p(f);
  }
  function d(f) {
    return re(f) ? (e.enter("listItemPrefixWhitespace"), e.consume(f), e.exit("listItemPrefixWhitespace"), p) : t(f);
  }
  function p(f) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(f);
  }
}
function Wu(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Qn, o, a);
  function o(s) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, oe(e, n, "listItemIndent", r.containerState.size + 1)(s);
  }
  function a(s) {
    return r.containerState.furtherBlankLines || !re(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, i(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ku, n, i)(s));
  }
  function i(s) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, oe(e, e.attempt(Me, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function Vu(e, n, t) {
  const r = this;
  return oe(e, o, "listItemIndent", r.containerState.size + 1);
  function o(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? n(a) : t(a);
  }
}
function Yu(e) {
  e.exit(this.containerState.type);
}
function Zu(e, n, t) {
  const r = this;
  return oe(e, o, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function o(a) {
    const i = r.events[r.events.length - 1];
    return !re(a) && i && i[1].type === "listItemPrefixWhitespace" ? n(a) : t(a);
  }
}
const Ai = {
  name: "setextUnderline",
  resolveTo: Xu,
  tokenize: Qu
};
function Xu(e, n) {
  let t = e.length, r, o, a;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (o = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !a && e[t][1].type === "definition" && (a = t);
  const i = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[o][1].type = "setextHeadingText", a ? (e.splice(o, 0, ["enter", i, n]), e.splice(a + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[a][1].end
  }) : e[r][1] = i, e.push(["exit", i, n]), e;
}
function Qu(e, n, t) {
  const r = this;
  let o;
  return a;
  function a(l) {
    let u = r.events.length, d;
    for (; u--; )
      if (r.events[u][1].type !== "lineEnding" && r.events[u][1].type !== "linePrefix" && r.events[u][1].type !== "content") {
        d = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (e.enter("setextHeadingLine"), o = l, i(l)) : t(l);
  }
  function i(l) {
    return e.enter("setextHeadingLineSequence"), s(l);
  }
  function s(l) {
    return l === o ? (e.consume(l), s) : (e.exit("setextHeadingLineSequence"), re(l) ? oe(e, c, "lineSuffix")(l) : c(l));
  }
  function c(l) {
    return l === null || q(l) ? (e.exit("setextHeadingLine"), n(l)) : t(l);
  }
}
const ju = {
  tokenize: Ju
};
function Ju(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Qn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, o, oe(e, e.attempt(this.parser.constructs.flow, o, e.attempt(iu, o)), "linePrefix"))
  );
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(a), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function o(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const ed = {
  resolveAll: zo()
}, nd = Fo("string"), td = Fo("text");
function Fo(e) {
  return {
    resolveAll: zo(e === "text" ? rd : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, o = this.parser.constructs[e], a = t.attempt(o, i, s);
    return i;
    function i(u) {
      return l(u) ? a(u) : s(u);
    }
    function s(u) {
      if (u === null) {
        t.consume(u);
        return;
      }
      return t.enter("data"), t.consume(u), c;
    }
    function c(u) {
      return l(u) ? (t.exit("data"), a(u)) : (t.consume(u), c);
    }
    function l(u) {
      if (u === null)
        return !0;
      const d = o[u];
      let p = -1;
      if (d)
        for (; ++p < d.length; ) {
          const f = d[p];
          if (!f.previous || f.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function zo(e) {
  return n;
  function n(t, r) {
    let o = -1, a;
    for (; ++o <= t.length; )
      a === void 0 ? t[o] && t[o][1].type === "data" && (a = o, o++) : (!t[o] || t[o][1].type !== "data") && (o !== a + 2 && (t[a][1].end = t[o - 1][1].end, t.splice(a + 2, o - a - 2), o = a + 2), a = void 0);
    return e ? e(t, r) : t;
  }
}
function rd(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], o = n.sliceStream(r);
      let a = o.length, i = -1, s = 0, c;
      for (; a--; ) {
        const l = o[a];
        if (typeof l == "string") {
          for (i = l.length; l.charCodeAt(i - 1) === 32; )
            s++, i--;
          if (i) break;
          i = -1;
        } else if (l === -2)
          c = !0, s++;
        else if (l !== -1) {
          a++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (s = 0), s) {
        const l = {
          type: t === e.length || c || s < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? i : r.start._bufferIndex + i,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - s,
            offset: r.end.offset - s
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...l.start
        }, r.start.offset === r.end.offset ? Object.assign(r, l) : (e.splice(t, 0, ["enter", l, n], ["exit", l, n]), t += 2);
      }
      t++;
    }
  return e;
}
const id = {
  42: Me,
  43: Me,
  45: Me,
  48: Me,
  49: Me,
  50: Me,
  51: Me,
  52: Me,
  53: Me,
  54: Me,
  55: Me,
  56: Me,
  57: Me,
  62: Io
}, od = {
  91: cu
}, ad = {
  [-2]: Vt,
  [-1]: Vt,
  32: Vt
}, sd = {
  35: hu,
  42: bt,
  45: [Ai, bt],
  60: _u,
  61: Ai,
  95: bt,
  96: Ni,
  126: Ni
}, ld = {
  38: Mo,
  92: Ro
}, cd = {
  [-5]: Yt,
  [-4]: Yt,
  [-3]: Yt,
  33: Bu,
  38: Mo,
  42: Er,
  60: [zc, Tu],
  91: zu,
  92: [pu, Ro],
  93: Pr,
  95: Er,
  96: jc
}, ud = {
  null: [Er, ed]
}, dd = {
  null: [42, 95]
}, fd = {
  null: []
}, pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: dd,
  contentInitial: od,
  disable: fd,
  document: id,
  flow: sd,
  flowInitial: ad,
  insideSpan: ud,
  string: ld,
  text: cd
}, Symbol.toStringTag, { value: "Module" }));
function gd(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const o = {}, a = [];
  let i = [], s = [];
  const c = {
    attempt: U(R),
    check: U(k),
    consume: w,
    enter: S,
    exit: C,
    interrupt: U(k, {
      interrupt: !0
    })
  }, l = {
    code: null,
    containerState: {},
    defineSkip: _,
    events: [],
    now: g,
    parser: e,
    previous: null,
    sliceSerialize: p,
    sliceStream: f,
    write: d
  };
  let u = n.tokenize.call(l, c);
  return n.resolveAll && a.push(n), l;
  function d(P) {
    return i = Ke(i, P), y(), i[i.length - 1] !== null ? [] : ($(n, 0), l.events = Ot(a, l.events, l), l.events);
  }
  function p(P, B) {
    return md(f(P), B);
  }
  function f(P) {
    return hd(i, P);
  }
  function g() {
    const {
      _bufferIndex: P,
      _index: B,
      line: J,
      column: D,
      offset: v
    } = r;
    return {
      _bufferIndex: P,
      _index: B,
      line: J,
      column: D,
      offset: v
    };
  }
  function _(P) {
    o[P.line] = P.column, x();
  }
  function y() {
    let P;
    for (; r._index < i.length; ) {
      const B = i[r._index];
      if (typeof B == "string")
        for (P = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === P && r._bufferIndex < B.length; )
          h(B.charCodeAt(r._bufferIndex));
      else
        h(B);
    }
  }
  function h(P) {
    u = u(P);
  }
  function w(P) {
    q(P) ? (r.line++, r.column = 1, r.offset += P === -3 ? 2 : 1, x()) : P !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    i[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = P;
  }
  function S(P, B) {
    const J = B || {};
    return J.type = P, J.start = g(), l.events.push(["enter", J, l]), s.push(J), J;
  }
  function C(P) {
    const B = s.pop();
    return B.end = g(), l.events.push(["exit", B, l]), B;
  }
  function R(P, B) {
    $(P, B.from);
  }
  function k(P, B) {
    B.restore();
  }
  function U(P, B) {
    return J;
    function J(D, v, Z) {
      let se, X, fe, m;
      return Array.isArray(D) ? (
        /* c8 ignore next 1 */
        pe(D)
      ) : "tokenize" in D ? (
        // Looks like a construct.
        pe([
          /** @type {Construct} */
          D
        ])
      ) : ue(D);
      function ue(Ee) {
        return en;
        function en(Pe) {
          const nn = Pe !== null && Ee[Pe], Be = Pe !== null && Ee.null, cn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(nn) ? nn : nn ? [nn] : [],
            ...Array.isArray(Be) ? Be : Be ? [Be] : []
          ];
          return pe(cn)(Pe);
        }
      }
      function pe(Ee) {
        return se = Ee, X = 0, Ee.length === 0 ? Z : E(Ee[X]);
      }
      function E(Ee) {
        return en;
        function en(Pe) {
          return m = H(), fe = Ee, Ee.partial || (l.currentConstruct = Ee), Ee.name && l.parser.constructs.disable.null.includes(Ee.name) ? Ge() : Ee.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            B ? Object.assign(Object.create(l), B) : l,
            c,
            Ce,
            Ge
          )(Pe);
        }
      }
      function Ce(Ee) {
        return P(fe, m), v;
      }
      function Ge(Ee) {
        return m.restore(), ++X < se.length ? E(se[X]) : Z;
      }
    }
  }
  function $(P, B) {
    P.resolveAll && !a.includes(P) && a.push(P), P.resolve && He(l.events, B, l.events.length - B, P.resolve(l.events.slice(B), l)), P.resolveTo && (l.events = P.resolveTo(l.events, l));
  }
  function H() {
    const P = g(), B = l.previous, J = l.currentConstruct, D = l.events.length, v = Array.from(s);
    return {
      from: D,
      restore: Z
    };
    function Z() {
      r = P, l.previous = B, l.currentConstruct = J, l.events.length = D, s = v, x();
    }
  }
  function x() {
    r.line in o && r.column < 2 && (r.column = o[r.line], r.offset += o[r.line] - 1);
  }
}
function hd(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, o = n.end._index, a = n.end._bufferIndex;
  let i;
  if (t === o)
    i = [e[t].slice(r, a)];
  else {
    if (i = e.slice(t, o), r > -1) {
      const s = i[0];
      typeof s == "string" ? i[0] = s.slice(r) : i.shift();
    }
    a > 0 && i.push(e[o].slice(0, a));
  }
  return i;
}
function md(e, n) {
  let t = -1;
  const r = [];
  let o;
  for (; ++t < e.length; ) {
    const a = e[t];
    let i;
    if (typeof a == "string")
      i = a;
    else switch (a) {
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
        if (!n && o) continue;
        i = " ";
        break;
      }
      default:
        i = String.fromCharCode(a);
    }
    o = a === -2, r.push(i);
  }
  return r.join("");
}
function bd(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Co([pd, ...(e || {}).extensions || []])
    ),
    content: o(Rc),
    defined: [],
    document: o(Dc),
    flow: o(ju),
    lazy: {},
    string: o(nd),
    text: o(td)
  };
  return r;
  function o(a) {
    return i;
    function i(s) {
      return gd(r, a, s);
    }
  }
}
function Ed(e) {
  for (; !Do(e); )
    ;
  return e;
}
const vi = /[\0\t\n\r]/g;
function _d() {
  let e = 1, n = "", t = !0, r;
  return o;
  function o(a, i, s) {
    const c = [];
    let l, u, d, p, f;
    for (a = n + (typeof a == "string" ? a.toString() : new TextDecoder(i || void 0).decode(a)), d = 0, n = "", t && (a.charCodeAt(0) === 65279 && d++, t = void 0); d < a.length; ) {
      if (vi.lastIndex = d, l = vi.exec(a), p = l && l.index !== void 0 ? l.index : a.length, f = a.charCodeAt(p), !l) {
        n = a.slice(d);
        break;
      }
      if (f === 10 && d === p && r)
        c.push(-3), r = void 0;
      else
        switch (r && (c.push(-5), r = void 0), d < p && (c.push(a.slice(d, p)), e += p - d), f) {
          case 0: {
            c.push(65533), e++;
            break;
          }
          case 9: {
            for (u = Math.ceil(e / 4) * 4, c.push(-2); e++ < u; ) c.push(-1);
            break;
          }
          case 10: {
            c.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      d = p + 1;
    }
    return s && (r && c.push(-5), n && c.push(n), c.push(null)), c;
  }
}
const yd = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function kd(e) {
  return e.replace(yd, wd);
}
function wd(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const o = t.charCodeAt(1), a = o === 120 || o === 88;
    return Oo(t.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Lr(t) || e;
}
const Uo = {}.hasOwnProperty;
function xd(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), Sd(t)(Ed(bd(t).document().write(_d()(e, n, !0))));
}
function Sd(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Tn),
      autolinkProtocol: H,
      autolinkEmail: H,
      atxHeading: a(Nn),
      blockQuote: a(Be),
      characterEscape: H,
      characterReference: H,
      codeFenced: a(cn),
      codeFencedFenceInfo: i,
      codeFencedFenceMeta: i,
      codeIndented: a(cn, i),
      codeText: a(Ln, i),
      codeTextData: H,
      data: H,
      codeFlowValue: H,
      definition: a(Pn),
      definitionDestinationString: i,
      definitionLabelString: i,
      definitionTitleString: i,
      emphasis: a(Bn),
      hardBreakEscape: a(ae),
      hardBreakTrailing: a(ae),
      htmlFlow: a(tn, i),
      htmlFlowData: H,
      htmlText: a(tn, i),
      htmlTextData: H,
      image: a(rn),
      label: i,
      link: a(Tn),
      listItem: a(Dt),
      listItemValue: p,
      listOrdered: a(Fn, d),
      listUnordered: a(Fn),
      paragraph: a(Lt),
      reference: E,
      referenceString: i,
      resourceDestinationString: i,
      resourceTitleString: i,
      setextHeading: a(Nn),
      strong: a(et),
      thematicBreak: a(nt)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: R,
      autolink: c(),
      autolinkEmail: nn,
      autolinkProtocol: Pe,
      blockQuote: c(),
      characterEscapeValue: x,
      characterReferenceMarkerHexadecimal: Ge,
      characterReferenceMarkerNumeric: Ge,
      characterReferenceValue: Ee,
      characterReference: en,
      codeFenced: c(y),
      codeFencedFence: _,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: g,
      codeFlowValue: x,
      codeIndented: c(h),
      codeText: c(v),
      codeTextData: x,
      data: x,
      definition: c(),
      definitionDestinationString: C,
      definitionLabelString: w,
      definitionTitleString: S,
      emphasis: c(),
      hardBreakEscape: c(B),
      hardBreakTrailing: c(B),
      htmlFlow: c(J),
      htmlFlowData: x,
      htmlText: c(D),
      htmlTextData: x,
      image: c(se),
      label: fe,
      labelText: X,
      lineEnding: P,
      link: c(Z),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: Ce,
      resourceDestinationString: m,
      resourceTitleString: ue,
      resource: pe,
      setextHeading: c($),
      setextHeadingLineSequence: U,
      setextHeadingText: k,
      strong: c(),
      thematicBreak: c()
    }
  };
  $o(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(N) {
    let I = {
      type: "root",
      children: []
    };
    const W = {
      stack: [I],
      tokenStack: [],
      config: n,
      enter: s,
      exit: l,
      buffer: i,
      resume: u,
      data: t
    }, te = [];
    let le = -1;
    for (; ++le < N.length; )
      if (N[le][1].type === "listOrdered" || N[le][1].type === "listUnordered")
        if (N[le][0] === "enter")
          te.push(le);
        else {
          const Fe = te.pop();
          le = o(N, Fe, le);
        }
    for (le = -1; ++le < N.length; ) {
      const Fe = n[N[le][0]];
      Uo.call(Fe, N[le][1].type) && Fe[N[le][1].type].call(Object.assign({
        sliceSerialize: N[le][2].sliceSerialize
      }, W), N[le][1]);
    }
    if (W.tokenStack.length > 0) {
      const Fe = W.tokenStack[W.tokenStack.length - 1];
      (Fe[1] || Ci).call(W, void 0, Fe[0]);
    }
    for (I.position = {
      start: gn(N.length > 0 ? N[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: gn(N.length > 0 ? N[N.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, le = -1; ++le < n.transforms.length; )
      I = n.transforms[le](I) || I;
    return I;
  }
  function o(N, I, W) {
    let te = I - 1, le = -1, Fe = !1, an, We, un, mn;
    for (; ++te <= W; ) {
      const Oe = N[te];
      switch (Oe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Oe[0] === "enter" ? le++ : le--, mn = void 0;
          break;
        }
        case "lineEndingBlank": {
          Oe[0] === "enter" && (an && !mn && !le && !un && (un = te), mn = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          mn = void 0;
      }
      if (!le && Oe[0] === "enter" && Oe[1].type === "listItemPrefix" || le === -1 && Oe[0] === "exit" && (Oe[1].type === "listUnordered" || Oe[1].type === "listOrdered")) {
        if (an) {
          let dn = te;
          for (We = void 0; dn--; ) {
            const ze = N[dn];
            if (ze[1].type === "lineEnding" || ze[1].type === "lineEndingBlank") {
              if (ze[0] === "exit") continue;
              We && (N[We][1].type = "lineEndingBlank", Fe = !0), ze[1].type = "lineEnding", We = dn;
            } else if (!(ze[1].type === "linePrefix" || ze[1].type === "blockQuotePrefix" || ze[1].type === "blockQuotePrefixWhitespace" || ze[1].type === "blockQuoteMarker" || ze[1].type === "listItemIndent")) break;
          }
          un && (!We || un < We) && (an._spread = !0), an.end = Object.assign({}, We ? N[We][1].start : Oe[1].end), N.splice(We || te, 0, ["exit", an, Oe[2]]), te++, W++;
        }
        if (Oe[1].type === "listItemPrefix") {
          const dn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Oe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          an = dn, N.splice(te, 0, ["enter", dn, Oe[2]]), te++, W++, un = void 0, mn = !0;
        }
      }
    }
    return N[I][1]._spread = Fe, W;
  }
  function a(N, I) {
    return W;
    function W(te) {
      s.call(this, N(te), te), I && I.call(this, te);
    }
  }
  function i() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function s(N, I, W) {
    this.stack[this.stack.length - 1].children.push(N), this.stack.push(N), this.tokenStack.push([I, W || void 0]), N.position = {
      start: gn(I.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(N) {
    return I;
    function I(W) {
      N && N.call(this, W), l.call(this, W);
    }
  }
  function l(N, I) {
    const W = this.stack.pop(), te = this.tokenStack.pop();
    if (te)
      te[0].type !== N.type && (I ? I.call(this, N, te[0]) : (te[1] || Ci).call(this, N, te[0]));
    else throw new Error("Cannot close `" + N.type + "` (" + qn({
      start: N.start,
      end: N.end
    }) + "): it’s not open");
    W.position.end = gn(N.end);
  }
  function u() {
    return Dr(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function p(N) {
    if (this.data.expectingFirstListItemValue) {
      const I = this.stack[this.stack.length - 2];
      I.start = Number.parseInt(this.sliceSerialize(N), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.lang = N;
  }
  function g() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.meta = N;
  }
  function _() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function y() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = N.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function h() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = N.replace(/(\r?\n|\r)$/g, "");
  }
  function w(N) {
    const I = this.resume(), W = this.stack[this.stack.length - 1];
    W.label = I, W.identifier = Ye(this.sliceSerialize(N)).toLowerCase();
  }
  function S() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = N;
  }
  function C() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = N;
  }
  function R(N) {
    const I = this.stack[this.stack.length - 1];
    if (!I.depth) {
      const W = this.sliceSerialize(N).length;
      I.depth = W;
    }
  }
  function k() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(N) {
    const I = this.stack[this.stack.length - 1];
    I.depth = this.sliceSerialize(N).codePointAt(0) === 61 ? 1 : 2;
  }
  function $() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function H(N) {
    const W = this.stack[this.stack.length - 1].children;
    let te = W[W.length - 1];
    (!te || te.type !== "text") && (te = on(), te.position = {
      start: gn(N.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, W.push(te)), this.stack.push(te);
  }
  function x(N) {
    const I = this.stack.pop();
    I.value += this.sliceSerialize(N), I.position.end = gn(N.end);
  }
  function P(N) {
    const I = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const W = I.children[I.children.length - 1];
      W.position.end = gn(N.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(I.type) && (H.call(this, N), x.call(this, N));
  }
  function B() {
    this.data.atHardBreak = !0;
  }
  function J() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = N;
  }
  function D() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = N;
  }
  function v() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = N;
  }
  function Z() {
    const N = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      N.type += "Reference", N.referenceType = I, delete N.url, delete N.title;
    } else
      delete N.identifier, delete N.label;
    this.data.referenceType = void 0;
  }
  function se() {
    const N = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      N.type += "Reference", N.referenceType = I, delete N.url, delete N.title;
    } else
      delete N.identifier, delete N.label;
    this.data.referenceType = void 0;
  }
  function X(N) {
    const I = this.sliceSerialize(N), W = this.stack[this.stack.length - 2];
    W.label = kd(I), W.identifier = Ye(I).toLowerCase();
  }
  function fe() {
    const N = this.stack[this.stack.length - 1], I = this.resume(), W = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, W.type === "link") {
      const te = N.children;
      W.children = te;
    } else
      W.alt = I;
  }
  function m() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = N;
  }
  function ue() {
    const N = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = N;
  }
  function pe() {
    this.data.inReference = void 0;
  }
  function E() {
    this.data.referenceType = "collapsed";
  }
  function Ce(N) {
    const I = this.resume(), W = this.stack[this.stack.length - 1];
    W.label = I, W.identifier = Ye(this.sliceSerialize(N)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ge(N) {
    this.data.characterReferenceType = N.type;
  }
  function Ee(N) {
    const I = this.sliceSerialize(N), W = this.data.characterReferenceType;
    let te;
    W ? (te = Oo(I, W === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : te = Lr(I);
    const le = this.stack[this.stack.length - 1];
    le.value += te;
  }
  function en(N) {
    const I = this.stack.pop();
    I.position.end = gn(N.end);
  }
  function Pe(N) {
    x.call(this, N);
    const I = this.stack[this.stack.length - 1];
    I.url = this.sliceSerialize(N);
  }
  function nn(N) {
    x.call(this, N);
    const I = this.stack[this.stack.length - 1];
    I.url = "mailto:" + this.sliceSerialize(N);
  }
  function Be() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function cn() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Ln() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Pn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Bn() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Nn() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function ae() {
    return {
      type: "break"
    };
  }
  function tn() {
    return {
      type: "html",
      value: ""
    };
  }
  function rn() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Tn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Fn(N) {
    return {
      type: "list",
      ordered: N.type === "listOrdered",
      start: null,
      spread: N._spread,
      children: []
    };
  }
  function Dt(N) {
    return {
      type: "listItem",
      spread: N._spread,
      checked: null,
      children: []
    };
  }
  function Lt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function et() {
    return {
      type: "strong",
      children: []
    };
  }
  function on() {
    return {
      type: "text",
      value: ""
    };
  }
  function nt() {
    return {
      type: "thematicBreak"
    };
  }
}
function gn(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function $o(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? $o(e, r) : Nd(e, r);
  }
}
function Nd(e, n) {
  let t;
  for (t in n)
    if (Uo.call(n, t))
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
function Ci(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + qn({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + qn({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + qn({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function Td(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return xd(r, {
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
function Ad(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function vd(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function Cd(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, o = n.lang ? n.lang.split(/\s+/) : [];
  o.length > 0 && (r.className = ["language-" + o[0]]);
  let a = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (a.data = { meta: n.meta }), e.patch(n, a), a = e.applyData(n, a), a = { type: "element", tagName: "pre", properties: {}, children: [a] }, e.patch(n, a), a;
}
function Od(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Id(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Rd(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), o = Dn(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let i, s = e.footnoteCounts.get(r);
  s === void 0 ? (s = 0, e.footnoteOrder.push(r), i = e.footnoteOrder.length) : i = a + 1, s += 1, e.footnoteCounts.set(r, s);
  const c = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + o,
      id: t + "fnref-" + o + (s > 1 ? "-" + s : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(i) }]
  };
  e.patch(n, c);
  const l = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(n, l), e.applyData(n, l);
}
function Md(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Dd(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function Ho(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const o = e.all(n), a = o[0];
  a && a.type === "text" ? a.value = "[" + a.value : o.unshift({ type: "text", value: "[" });
  const i = o[o.length - 1];
  return i && i.type === "text" ? i.value += r : o.push({ type: "text", value: r }), o;
}
function Ld(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Ho(e, n);
  const o = { src: Dn(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (o.title = r.title);
  const a = { type: "element", tagName: "img", properties: o, children: [] };
  return e.patch(n, a), e.applyData(n, a);
}
function Pd(e, n) {
  const t = { src: Dn(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function Bd(e, n) {
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
function Fd(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Ho(e, n);
  const o = { href: Dn(r.url || "") };
  r.title !== null && r.title !== void 0 && (o.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: o,
    children: e.all(n)
  };
  return e.patch(n, a), e.applyData(n, a);
}
function zd(e, n) {
  const t = { href: Dn(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Ud(e, n, t) {
  const r = e.all(n), o = t ? $d(t) : Go(n), a = {}, i = [];
  if (typeof n.checked == "boolean") {
    const u = r[0];
    let d;
    u && u.type === "element" && u.tagName === "p" ? d = u : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let s = -1;
  for (; ++s < r.length; ) {
    const u = r[s];
    (o || s !== 0 || u.type !== "element" || u.tagName !== "p") && i.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !o ? i.push(...u.children) : i.push(u);
  }
  const c = r[r.length - 1];
  c && (o || c.type !== "element" || c.tagName !== "p") && i.push({ type: "text", value: `
` });
  const l = { type: "element", tagName: "li", properties: a, children: i };
  return e.patch(n, l), e.applyData(n, l);
}
function $d(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Go(t[r]);
  }
  return n;
}
function Go(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function Hd(e, n) {
  const t = {}, r = e.all(n);
  let o = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++o < r.length; ) {
    const i = r[o];
    if (i.type === "element" && i.tagName === "li" && i.properties && Array.isArray(i.properties.className) && i.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const a = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, a), e.applyData(n, a);
}
function Gd(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Kd(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function qd(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Wd(e, n) {
  const t = e.all(n), r = t.shift(), o = [];
  if (r) {
    const i = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], i), o.push(i);
  }
  if (t.length > 0) {
    const i = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, s = Or(n.children[1]), c = wo(n.children[n.children.length - 1]);
    s && c && (i.position = { start: s, end: c }), o.push(i);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(o, !0)
  };
  return e.patch(n, a), e.applyData(n, a);
}
function Vd(e, n, t) {
  const r = t ? t.children : void 0, a = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", i = t && t.type === "table" ? t.align : void 0, s = i ? i.length : n.children.length;
  let c = -1;
  const l = [];
  for (; ++c < s; ) {
    const d = n.children[c], p = {}, f = i ? i[c] : void 0;
    f && (p.align = f);
    let g = { type: "element", tagName: a, properties: p, children: [] };
    d && (g.children = e.all(d), e.patch(d, g), g = e.applyData(d, g)), l.push(g);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(l, !0)
  };
  return e.patch(n, u), e.applyData(n, u);
}
function Yd(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Oi = 9, Ii = 32;
function Zd(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), o = 0;
  const a = [];
  for (; r; )
    a.push(
      Ri(n.slice(o, r.index), o > 0, !0),
      r[0]
    ), o = r.index + r[0].length, r = t.exec(n);
  return a.push(Ri(n.slice(o), o > 0, !1)), a.join("");
}
function Ri(e, n, t) {
  let r = 0, o = e.length;
  if (n) {
    let a = e.codePointAt(r);
    for (; a === Oi || a === Ii; )
      r++, a = e.codePointAt(r);
  }
  if (t) {
    let a = e.codePointAt(o - 1);
    for (; a === Oi || a === Ii; )
      o--, a = e.codePointAt(o - 1);
  }
  return o > r ? e.slice(r, o) : "";
}
function Xd(e, n) {
  const t = { type: "text", value: Zd(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Qd(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const jd = {
  blockquote: Ad,
  break: vd,
  code: Cd,
  delete: Od,
  emphasis: Id,
  footnoteReference: Rd,
  heading: Md,
  html: Dd,
  imageReference: Ld,
  image: Pd,
  inlineCode: Bd,
  linkReference: Fd,
  link: zd,
  listItem: Ud,
  list: Hd,
  paragraph: Gd,
  // @ts-expect-error: root is different, but hard to type.
  root: Kd,
  strong: qd,
  table: Wd,
  tableCell: Yd,
  tableRow: Vd,
  text: Xd,
  thematicBreak: Qd,
  toml: st,
  yaml: st,
  definition: st,
  footnoteDefinition: st
};
function st() {
}
const Ko = -1, It = 0, Vn = 1, wt = 2, Br = 3, Fr = 4, zr = 5, Ur = 6, qo = 7, Wo = 8, Vo = typeof self == "object" ? self : globalThis, Mi = (e, n) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new Vo[e](n);
}, Jd = (e, n) => {
  const t = (o, a) => (e.set(a, o), o), r = (o) => {
    if (e.has(o))
      return e.get(o);
    const [a, i] = n[o];
    switch (a) {
      case It:
      case Ko:
        return t(i, o);
      case Vn: {
        const s = t([], o);
        for (const c of i)
          s.push(r(c));
        return s;
      }
      case wt: {
        const s = t({}, o);
        for (const [c, l] of i)
          s[r(c)] = r(l);
        return s;
      }
      case Br:
        return t(new Date(i), o);
      case Fr: {
        const { source: s, flags: c } = i;
        return t(new RegExp(s, c), o);
      }
      case zr: {
        const s = t(/* @__PURE__ */ new Map(), o);
        for (const [c, l] of i)
          s.set(r(c), r(l));
        return s;
      }
      case Ur: {
        const s = t(/* @__PURE__ */ new Set(), o);
        for (const c of i)
          s.add(r(c));
        return s;
      }
      case qo: {
        const { name: s, message: c } = i;
        return t(
          typeof Vo[s] == "function" ? Mi(s, c) : new Error(c),
          o
        );
      }
      case Wo:
        return t(BigInt(i), o);
      case "BigInt":
        return t(Object(BigInt(i)), o);
      case "ArrayBuffer":
        return t(new Uint8Array(i).buffer, i);
      case "DataView": {
        const { buffer: s } = new Uint8Array(i);
        return t(new DataView(s), i);
      }
    }
    return t(Mi(a, i), o);
  };
  return r;
}, Di = (e) => Jd(/* @__PURE__ */ new Map(), e)(0), _n = "", { toString: ef } = {}, { keys: nf } = Object, Gn = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [It, n];
  const t = ef.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Vn, _n];
    case "Object":
      return [wt, _n];
    case "Date":
      return [Br, _n];
    case "RegExp":
      return [Fr, _n];
    case "Map":
      return [zr, _n];
    case "Set":
      return [Ur, _n];
    case "DataView":
      return [Vn, t];
  }
  return t.includes("Array") ? [Vn, t] : e instanceof Error ? [qo, e.name || "Error"] : [wt, t];
}, lt = ([e, n]) => e === It && (n === "function" || n === "symbol"), tf = (e, n, t, r) => {
  const o = (i, s) => {
    const c = r.push(i) - 1;
    return t.set(s, c), c;
  }, a = (i) => {
    if (t.has(i))
      return t.get(i);
    let [s, c] = Gn(i);
    switch (s) {
      case It: {
        let u = i;
        switch (c) {
          case "bigint":
            s = Wo, u = i.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            u = null;
            break;
          case "undefined":
            return o([Ko], i);
        }
        return o([s, u], i);
      }
      case Vn: {
        if (c) {
          let p = i;
          return c === "DataView" ? p = new Uint8Array(i.buffer) : c === "ArrayBuffer" && (p = new Uint8Array(i)), o([c, [...p]], i);
        }
        const u = [], d = o([s, u], i);
        for (const p of i)
          u.push(a(p));
        return d;
      }
      case wt: {
        if (c)
          switch (c) {
            case "BigInt":
              return o([c, i.toString()], i);
            case "Boolean":
            case "Number":
            case "String":
              return o([c, i.valueOf()], i);
          }
        if (n && "toJSON" in i)
          return a(i.toJSON());
        const u = [], d = o([s, u], i);
        for (const p of nf(i))
          (e || !lt(Gn(i[p]))) && u.push([a(p), a(i[p])]);
        return d;
      }
      case Br:
        return o([s, isNaN(i.getTime()) ? _n : i.toISOString()], i);
      case Fr: {
        const { source: u, flags: d } = i;
        return o([s, { source: u, flags: d }], i);
      }
      case zr: {
        const u = [], d = o([s, u], i);
        for (const [p, f] of i)
          (e || !(lt(Gn(p)) || lt(Gn(f)))) && u.push([a(p), a(f)]);
        return d;
      }
      case Ur: {
        const u = [], d = o([s, u], i);
        for (const p of i)
          (e || !lt(Gn(p))) && u.push(a(p));
        return d;
      }
    }
    const { message: l } = i;
    return o([s, { name: c, message: l }], i);
  };
  return a;
}, Li = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return tf(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, xt = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? Di(Li(e, n)) : structuredClone(e)
) : (e, n) => Di(Li(e, n));
function rf(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function of(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function af(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || rf, r = e.options.footnoteBackLabel || of, o = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", i = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, s = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const l = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!l)
      continue;
    const u = e.all(l), d = String(l.identifier).toUpperCase(), p = Dn(d.toLowerCase());
    let f = 0;
    const g = [], _ = e.footnoteCounts.get(d);
    for (; _ !== void 0 && ++f <= _; ) {
      g.length > 0 && g.push({ type: "text", value: " " });
      let w = typeof t == "string" ? t : t(c, f);
      typeof w == "string" && (w = { type: "text", value: w }), g.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + p + (f > 1 ? "-" + f : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, f),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(w) ? w : [w]
      });
    }
    const y = u[u.length - 1];
    if (y && y.type === "element" && y.tagName === "p") {
      const w = y.children[y.children.length - 1];
      w && w.type === "text" ? w.value += " " : y.children.push({ type: "text", value: " " }), y.children.push(...g);
    } else
      u.push(...g);
    const h = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + p },
      children: e.wrap(u, !0)
    };
    e.patch(l, h), s.push(h);
  }
  if (s.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: a,
          properties: {
            ...xt(i),
            id: "footnote-label"
          },
          children: [{ type: "text", value: o }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(s, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const jn = (
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
      return uf;
    if (typeof e == "function")
      return Rt(e);
    if (typeof e == "object")
      return Array.isArray(e) ? sf(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        lf(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return cf(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function sf(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = jn(e[t]);
  return Rt(r);
  function r(...o) {
    let a = -1;
    for (; ++a < n.length; )
      if (n[a].apply(this, o)) return !0;
    return !1;
  }
}
function lf(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Rt(t);
  function t(r) {
    const o = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let a;
    for (a in e)
      if (o[a] !== n[a]) return !1;
    return !0;
  }
}
function cf(e) {
  return Rt(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Rt(e) {
  return n;
  function n(t, r, o) {
    return !!(df(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      o || void 0
    ));
  }
}
function uf() {
  return !0;
}
function df(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Yo = [], ff = !0, _r = !1, pf = "skip";
function Zo(e, n, t, r) {
  let o;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : o = n;
  const a = jn(o), i = r ? -1 : 1;
  s(e, void 0, [])();
  function s(c, l, u) {
    const d = (
      /** @type {Record<string, unknown>} */
      c && typeof c == "object" ? c : {}
    );
    if (typeof d.type == "string") {
      const f = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(p, "name", {
        value: "node (" + (c.type + (f ? "<" + f + ">" : "")) + ")"
      });
    }
    return p;
    function p() {
      let f = Yo, g, _, y;
      if ((!n || a(c, l, u[u.length - 1] || void 0)) && (f = gf(t(c, u)), f[0] === _r))
        return f;
      if ("children" in c && c.children) {
        const h = (
          /** @type {UnistParent} */
          c
        );
        if (h.children && f[0] !== pf)
          for (_ = (r ? h.children.length : -1) + i, y = u.concat(h); _ > -1 && _ < h.children.length; ) {
            const w = h.children[_];
            if (g = s(w, _, y)(), g[0] === _r)
              return g;
            _ = typeof g[1] == "number" ? g[1] : _ + i;
          }
      }
      return f;
    }
  }
}
function gf(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [ff, e] : e == null ? Yo : [e];
}
function Mt(e, n, t, r) {
  let o, a, i;
  typeof n == "function" && typeof t != "function" ? (a = void 0, i = n, o = t) : (a = n, i = t, o = r), Zo(e, a, s, o);
  function s(c, l) {
    const u = l[l.length - 1], d = u ? u.children.indexOf(c) : void 0;
    return i(c, d, u);
  }
}
const yr = {}.hasOwnProperty, hf = {};
function mf(e, n) {
  const t = n || hf, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = { ...jd, ...t.handlers }, s = {
    all: l,
    applyData: Ef,
    definitionById: r,
    footnoteById: o,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: i,
    one: c,
    options: t,
    patch: bf,
    wrap: yf
  };
  return Mt(e, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : o, p = String(u.identifier).toUpperCase();
      d.has(p) || d.set(p, u);
    }
  }), s;
  function c(u, d) {
    const p = u.type, f = s.handlers[p];
    if (yr.call(s.handlers, p) && f)
      return f(s, u, d);
    if (s.options.passThrough && s.options.passThrough.includes(p)) {
      if ("children" in u) {
        const { children: _, ...y } = u, h = xt(y);
        return h.children = s.all(u), h;
      }
      return xt(u);
    }
    return (s.options.unknownHandler || _f)(s, u, d);
  }
  function l(u) {
    const d = [];
    if ("children" in u) {
      const p = u.children;
      let f = -1;
      for (; ++f < p.length; ) {
        const g = s.one(p[f], u);
        if (g) {
          if (f && p[f - 1].type === "break" && (!Array.isArray(g) && g.type === "text" && (g.value = Pi(g.value)), !Array.isArray(g) && g.type === "element")) {
            const _ = g.children[0];
            _ && _.type === "text" && (_.value = Pi(_.value));
          }
          Array.isArray(g) ? d.push(...g) : d.push(g);
        }
      }
    }
    return d;
  }
}
function bf(e, n) {
  e.position && (n.position = ic(e));
}
function Ef(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, o = e.data.hChildren, a = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const i = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: i };
      }
    t.type === "element" && a && Object.assign(t.properties, xt(a)), "children" in t && t.children && o !== null && o !== void 0 && (t.children = o);
  }
  return t;
}
function _f(e, n) {
  const t = n.data || {}, r = "value" in n && !(yr.call(t, "hProperties") || yr.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function yf(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function Pi(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function Bi(e, n) {
  const t = mf(e, n), r = t.one(e, void 0), o = af(t), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return o && a.children.push({ type: "text", value: `
` }, o), a;
}
function kf(e, n) {
  return e && "run" in e ? async function(t, r) {
    const o = (
      /** @type {HastRoot} */
      Bi(t, { file: r, ...n })
    );
    await e.run(o, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      Bi(t, { file: r, ...e || n })
    );
  };
}
function Fi(e) {
  if (e)
    throw e;
}
var Zt, zi;
function wf() {
  if (zi) return Zt;
  zi = 1;
  var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, o = function(l) {
    return typeof Array.isArray == "function" ? Array.isArray(l) : n.call(l) === "[object Array]";
  }, a = function(l) {
    if (!l || n.call(l) !== "[object Object]")
      return !1;
    var u = e.call(l, "constructor"), d = l.constructor && l.constructor.prototype && e.call(l.constructor.prototype, "isPrototypeOf");
    if (l.constructor && !u && !d)
      return !1;
    var p;
    for (p in l)
      ;
    return typeof p > "u" || e.call(l, p);
  }, i = function(l, u) {
    t && u.name === "__proto__" ? t(l, u.name, {
      enumerable: !0,
      configurable: !0,
      value: u.newValue,
      writable: !0
    }) : l[u.name] = u.newValue;
  }, s = function(l, u) {
    if (u === "__proto__")
      if (e.call(l, u)) {
        if (r)
          return r(l, u).value;
      } else return;
    return l[u];
  };
  return Zt = function c() {
    var l, u, d, p, f, g, _ = arguments[0], y = 1, h = arguments.length, w = !1;
    for (typeof _ == "boolean" && (w = _, _ = arguments[1] || {}, y = 2), (_ == null || typeof _ != "object" && typeof _ != "function") && (_ = {}); y < h; ++y)
      if (l = arguments[y], l != null)
        for (u in l)
          d = s(_, u), p = s(l, u), _ !== p && (w && p && (a(p) || (f = o(p))) ? (f ? (f = !1, g = d && o(d) ? d : []) : g = d && a(d) ? d : {}, i(_, { name: u, newValue: c(w, g, p) })) : typeof p < "u" && i(_, { name: u, newValue: p }));
    return _;
  }, Zt;
}
var xf = wf();
const Xt = /* @__PURE__ */ Cr(xf);
function kr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Sf() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...o) {
    let a = -1;
    const i = o.pop();
    if (typeof i != "function")
      throw new TypeError("Expected function as last argument, not " + i);
    s(null, ...o);
    function s(c, ...l) {
      const u = e[++a];
      let d = -1;
      if (c) {
        i(c);
        return;
      }
      for (; ++d < o.length; )
        (l[d] === null || l[d] === void 0) && (l[d] = o[d]);
      o = l, u ? Nf(u, s)(...l) : i(null, ...l);
    }
  }
  function r(o) {
    if (typeof o != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + o
      );
    return e.push(o), n;
  }
}
function Nf(e, n) {
  let t;
  return r;
  function r(...i) {
    const s = e.length > i.length;
    let c;
    s && i.push(o);
    try {
      c = e.apply(this, i);
    } catch (l) {
      const u = (
        /** @type {Error} */
        l
      );
      if (s && t)
        throw u;
      return o(u);
    }
    s || (c && c.then && typeof c.then == "function" ? c.then(a, o) : c instanceof Error ? o(c) : a(c));
  }
  function o(i, ...s) {
    t || (t = !0, n(i, ...s));
  }
  function a(i) {
    o(null, i);
  }
}
const je = { basename: Tf, dirname: Af, extname: vf, join: Cf, sep: "/" };
function Tf(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  Jn(e);
  let t = 0, r = -1, o = e.length, a;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; o--; )
      if (e.codePointAt(o) === 47) {
        if (a) {
          t = o + 1;
          break;
        }
      } else r < 0 && (a = !0, r = o + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let i = -1, s = n.length - 1;
  for (; o--; )
    if (e.codePointAt(o) === 47) {
      if (a) {
        t = o + 1;
        break;
      }
    } else
      i < 0 && (a = !0, i = o + 1), s > -1 && (e.codePointAt(o) === n.codePointAt(s--) ? s < 0 && (r = o) : (s = -1, r = i));
  return t === r ? r = i : r < 0 && (r = e.length), e.slice(t, r);
}
function Af(e) {
  if (Jn(e), e.length === 0)
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
function vf(e) {
  Jn(e);
  let n = e.length, t = -1, r = 0, o = -1, a = 0, i;
  for (; n--; ) {
    const s = e.codePointAt(n);
    if (s === 47) {
      if (i) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (i = !0, t = n + 1), s === 46 ? o < 0 ? o = n : a !== 1 && (a = 1) : o > -1 && (a = -1);
  }
  return o < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && o === t - 1 && o === r + 1 ? "" : e.slice(o, t);
}
function Cf(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    Jn(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Of(t);
}
function Of(e) {
  Jn(e);
  const n = e.codePointAt(0) === 47;
  let t = If(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function If(e, n) {
  let t = "", r = 0, o = -1, a = 0, i = -1, s, c;
  for (; ++i <= e.length; ) {
    if (i < e.length)
      s = e.codePointAt(i);
    else {
      if (s === 47)
        break;
      s = 47;
    }
    if (s === 47) {
      if (!(o === i - 1 || a === 1)) if (o !== i - 1 && a === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (c = t.lastIndexOf("/"), c !== t.length - 1) {
              c < 0 ? (t = "", r = 0) : (t = t.slice(0, c), r = t.length - 1 - t.lastIndexOf("/")), o = i, a = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, o = i, a = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(o + 1, i) : t = e.slice(o + 1, i), r = i - o - 1;
      o = i, a = 0;
    } else s === 46 && a > -1 ? a++ : a = -1;
  }
  return t;
}
function Jn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Rf = { cwd: Mf };
function Mf() {
  return "/";
}
function wr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Df(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!wr(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return Lf(e);
}
function Lf(e) {
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
        const o = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw o.code = "ERR_INVALID_FILE_URL_PATH", o;
      }
    }
  return decodeURIComponent(n);
}
const Qt = (
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
class Xo {
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
    n ? wr(n) ? t = { path: n } : typeof n == "string" || Pf(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : Rf.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Qt.length; ) {
      const a = Qt[r];
      a in t && t[a] !== void 0 && t[a] !== null && (this[a] = a === "history" ? [...t[a]] : t[a]);
    }
    let o;
    for (o in t)
      Qt.includes(o) || (this[o] = t[o]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? je.basename(this.path) : void 0;
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
    Jt(n, "basename"), jt(n, "basename"), this.path = je.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? je.dirname(this.path) : void 0;
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
    Ui(this.basename, "dirname"), this.path = je.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? je.extname(this.path) : void 0;
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
    if (jt(n, "extname"), Ui(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = je.join(this.dirname, this.stem + (n || ""));
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
    wr(n) && (n = Df(n)), Jt(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? je.basename(this.path, this.extname) : void 0;
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
    Jt(n, "stem"), jt(n, "stem"), this.path = je.join(this.dirname || "", n + (this.extname || ""));
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
    const o = this.message(n, t, r);
    throw o.fatal = !0, o;
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
    const o = this.message(n, t, r);
    return o.fatal = void 0, o;
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
    const o = new ve(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (o.name = this.path + ":" + o.name, o.file = this.path), o.fatal = !1, this.messages.push(o), o;
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
function jt(e, n) {
  if (e && e.includes(je.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + je.sep + "`"
    );
}
function Jt(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function Ui(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Pf(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Bf = (
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
    ), o = r[e], a = function() {
      return o.apply(a, arguments);
    };
    return Object.setPrototypeOf(a, r), a;
  })
), Ff = {}.hasOwnProperty;
class $r extends Bf {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Sf();
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
      new $r()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(Xt(!0, {}, this.namespace)), n;
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
    return typeof n == "string" ? arguments.length === 2 ? (tr("data", this.frozen), this.namespace[n] = t, this) : Ff.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (tr("data", this.frozen), this.namespace = n, this) : this.namespace;
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
      const o = t.call(n, ...r);
      typeof o == "function" && this.transformers.use(o);
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
    const t = ct(n), r = this.parser || this.Parser;
    return er("parse", r), r(String(t), t);
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
    return this.freeze(), er("process", this.parser || this.Parser), nr("process", this.compiler || this.Compiler), t ? o(void 0, t) : new Promise(o);
    function o(a, i) {
      const s = ct(n), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(s)
      );
      r.run(c, s, function(u, d, p) {
        if (u || !d || !p)
          return l(u);
        const f = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), g = r.stringify(f, p);
        $f(g) ? p.value = g : p.result = g, l(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          p
        );
      });
      function l(u, d) {
        u || !d ? i(u) : a ? a(d) : t(void 0, d);
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
    return this.freeze(), er("processSync", this.parser || this.Parser), nr("processSync", this.compiler || this.Compiler), this.process(n, o), Hi("processSync", "process", t), r;
    function o(a, i) {
      t = !0, Fi(a), r = i;
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
    $i(n), this.freeze();
    const o = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? a(void 0, r) : new Promise(a);
    function a(i, s) {
      const c = ct(t);
      o.run(n, c, l);
      function l(u, d, p) {
        const f = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || n
        );
        u ? s(u) : i ? i(f) : r(void 0, f, p);
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
    let r = !1, o;
    return this.run(n, t, a), Hi("runSync", "run", r), o;
    function a(i, s) {
      Fi(i), o = s, r = !0;
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
    const r = ct(t), o = this.compiler || this.Compiler;
    return nr("stringify", o), $i(n), o(n, r);
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
    const r = this.attachers, o = this.namespace;
    if (tr("use", this.frozen), n != null) if (typeof n == "function")
      c(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? s(n) : i(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function a(l) {
      if (typeof l == "function")
        c(l, []);
      else if (typeof l == "object")
        if (Array.isArray(l)) {
          const [u, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            l
          );
          c(u, d);
        } else
          i(l);
      else
        throw new TypeError("Expected usable value, not `" + l + "`");
    }
    function i(l) {
      if (!("plugins" in l) && !("settings" in l))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      s(l.plugins), l.settings && (o.settings = Xt(!0, o.settings, l.settings));
    }
    function s(l) {
      let u = -1;
      if (l != null) if (Array.isArray(l))
        for (; ++u < l.length; ) {
          const d = l[u];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + l + "`");
    }
    function c(l, u) {
      let d = -1, p = -1;
      for (; ++d < r.length; )
        if (r[d][0] === l) {
          p = d;
          break;
        }
      if (p === -1)
        r.push([l, ...u]);
      else if (u.length > 0) {
        let [f, ...g] = u;
        const _ = r[p][1];
        kr(_) && kr(f) && (f = Xt(!0, _, f)), r[p] = [l, f, ...g];
      }
    }
  }
}
const zf = new $r().freeze();
function er(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function nr(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function tr(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function $i(e) {
  if (!kr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Hi(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function ct(e) {
  return Uf(e) ? e : new Xo(e);
}
function Uf(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function $f(e) {
  return typeof e == "string" || Hf(e);
}
function Hf(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Gf = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Gi = [], Ki = { allowDangerousHtml: !0 }, Kf = /^(https?|ircs?|mailto|xmpp)$/i, qf = [
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
function Wf(e) {
  const n = Vf(e), t = Yf(e);
  return Zf(n.runSync(n.parse(t), t), e);
}
function Vf(e) {
  const n = e.rehypePlugins || Gi, t = e.remarkPlugins || Gi, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Ki } : Ki;
  return zf().use(Td).use(t).use(kf, r).use(n);
}
function Yf(e) {
  const n = e.children || "", t = new Xo();
  return typeof n == "string" && (t.value = n), t;
}
function Zf(e, n) {
  const t = n.allowedElements, r = n.allowElement, o = n.components, a = n.disallowedElements, i = n.skipHtml, s = n.unwrapDisallowed, c = n.urlTransform || Xf;
  for (const u of qf)
    Object.hasOwn(n, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + Gf + u.id, void 0);
  return Mt(e, l), cc(e, {
    Fragment: Tr,
    components: o,
    ignoreInvalidStyle: !0,
    jsx: ee,
    jsxs: De,
    passKeys: !0,
    passNode: !0
  });
  function l(u, d, p) {
    if (u.type === "raw" && p && typeof d == "number")
      return i ? p.children.splice(d, 1) : p.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let f;
      for (f in Wt)
        if (Object.hasOwn(Wt, f) && Object.hasOwn(u.properties, f)) {
          const g = u.properties[f], _ = Wt[f];
          (_ === null || _.includes(u.tagName)) && (u.properties[f] = c(String(g || ""), f, u));
        }
    }
    if (u.type === "element") {
      let f = t ? !t.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!f && r && typeof d == "number" && (f = !r(u, d, p)), f && p && typeof d == "number")
        return s && u.children ? p.children.splice(d, 1, ...u.children) : p.children.splice(d, 1), d;
    }
  }
}
function Xf(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), o = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    o !== -1 && n > o || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    Kf.test(e.slice(0, n)) ? e : ""
  );
}
function qi(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, o = t.indexOf(n);
  for (; o !== -1; )
    r++, o = t.indexOf(n, o + n.length);
  return r;
}
function Qf(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function jf(e, n, t) {
  const o = jn((t || {}).ignore || []), a = Jf(n);
  let i = -1;
  for (; ++i < a.length; )
    Zo(e, "text", s);
  function s(l, u) {
    let d = -1, p;
    for (; ++d < u.length; ) {
      const f = u[d], g = p ? p.children : void 0;
      if (o(
        f,
        g ? g.indexOf(f) : void 0,
        p
      ))
        return;
      p = f;
    }
    if (p)
      return c(l, u);
  }
  function c(l, u) {
    const d = u[u.length - 1], p = a[i][0], f = a[i][1];
    let g = 0;
    const y = d.children.indexOf(l);
    let h = !1, w = [];
    p.lastIndex = 0;
    let S = p.exec(l.value);
    for (; S; ) {
      const C = S.index, R = {
        index: S.index,
        input: S.input,
        stack: [...u, l]
      };
      let k = f(...S, R);
      if (typeof k == "string" && (k = k.length > 0 ? { type: "text", value: k } : void 0), k === !1 ? p.lastIndex = C + 1 : (g !== C && w.push({
        type: "text",
        value: l.value.slice(g, C)
      }), Array.isArray(k) ? w.push(...k) : k && w.push(k), g = C + S[0].length, h = !0), !p.global)
        break;
      S = p.exec(l.value);
    }
    return h ? (g < l.value.length && w.push({ type: "text", value: l.value.slice(g) }), d.children.splice(y, 1, ...w)) : w = [l], y + w.length;
  }
}
function Jf(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const o = t[r];
    n.push([ep(o[0]), np(o[1])]);
  }
  return n;
}
function ep(e) {
  return typeof e == "string" ? new RegExp(Qf(e), "g") : e;
}
function np(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const rr = "phrasing", ir = ["autolink", "link", "image", "label"];
function tp() {
  return {
    transforms: [cp],
    enter: {
      literalAutolink: ip,
      literalAutolinkEmail: or,
      literalAutolinkHttp: or,
      literalAutolinkWww: or
    },
    exit: {
      literalAutolink: lp,
      literalAutolinkEmail: sp,
      literalAutolinkHttp: op,
      literalAutolinkWww: ap
    }
  };
}
function rp() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: rr,
        notInConstruct: ir
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: rr,
        notInConstruct: ir
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: rr,
        notInConstruct: ir
      }
    ]
  };
}
function ip(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function or(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function op(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function ap(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function sp(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function lp(e) {
  this.exit(e);
}
function cp(e) {
  jf(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, up],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), dp]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function up(e, n, t, r, o) {
  let a = "";
  if (!Qo(o) || (/^w/i.test(n) && (t = n + t, n = "", a = "http://"), !fp(t)))
    return !1;
  const i = pp(t + r);
  if (!i[0]) return !1;
  const s = {
    type: "link",
    title: null,
    url: a + n + i[0],
    children: [{ type: "text", value: n + i[0] }]
  };
  return i[1] ? [s, { type: "text", value: i[1] }] : s;
}
function dp(e, n, t, r) {
  return (
    // Not an expected previous character.
    !Qo(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function fp(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function pp(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const o = qi(e, "(");
  let a = qi(e, ")");
  for (; r !== -1 && o > a; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), a++;
  return [e, t];
}
function Qo(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || wn(t) || Ct(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
jo.peek = wp;
function gp() {
  this.buffer();
}
function hp(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function mp() {
  this.buffer();
}
function bp(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function Ep(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Ye(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function _p(e) {
  this.exit(e);
}
function yp(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Ye(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function kp(e) {
  this.exit(e);
}
function wp() {
  return "[";
}
function jo(e, n, t, r) {
  const o = t.createTracker(r);
  let a = o.move("[^");
  const i = t.enter("footnoteReference"), s = t.enter("reference");
  return a += o.move(
    t.safe(t.associationId(e), { after: "]", before: a })
  ), s(), i(), a += o.move("]"), a;
}
function xp() {
  return {
    enter: {
      gfmFootnoteCallString: gp,
      gfmFootnoteCall: hp,
      gfmFootnoteDefinitionLabelString: mp,
      gfmFootnoteDefinition: bp
    },
    exit: {
      gfmFootnoteCallString: Ep,
      gfmFootnoteCall: _p,
      gfmFootnoteDefinitionLabelString: yp,
      gfmFootnoteDefinition: kp
    }
  };
}
function Sp(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: jo },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, o, a, i) {
    const s = a.createTracker(i);
    let c = s.move("[^");
    const l = a.enter("footnoteDefinition"), u = a.enter("label");
    return c += s.move(
      a.safe(a.associationId(r), { before: c, after: "]" })
    ), u(), c += s.move("]:"), r.children && r.children.length > 0 && (s.shift(4), c += s.move(
      (n ? `
` : " ") + a.indentLines(
        a.containerFlow(r, s.current()),
        n ? Jo : Np
      )
    )), l(), c;
  }
}
function Np(e, n, t) {
  return n === 0 ? e : Jo(e, n, t);
}
function Jo(e, n, t) {
  return (t ? "" : "    ") + e;
}
const Tp = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
ea.peek = Ip;
function Ap() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: Cp },
    exit: { strikethrough: Op }
  };
}
function vp() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Tp
      }
    ],
    handlers: { delete: ea }
  };
}
function Cp(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function Op(e) {
  this.exit(e);
}
function ea(e, n, t, r) {
  const o = t.createTracker(r), a = t.enter("strikethrough");
  let i = o.move("~~");
  return i += t.containerPhrasing(e, {
    ...o.current(),
    before: i,
    after: "~"
  }), i += o.move("~~"), a(), i;
}
function Ip() {
  return "~";
}
function Rp(e) {
  return e.length;
}
function Mp(e, n) {
  const t = n || {}, r = (t.align || []).concat(), o = t.stringLength || Rp, a = [], i = [], s = [], c = [];
  let l = 0, u = -1;
  for (; ++u < e.length; ) {
    const _ = [], y = [];
    let h = -1;
    for (e[u].length > l && (l = e[u].length); ++h < e[u].length; ) {
      const w = Dp(e[u][h]);
      if (t.alignDelimiters !== !1) {
        const S = o(w);
        y[h] = S, (c[h] === void 0 || S > c[h]) && (c[h] = S);
      }
      _.push(w);
    }
    i[u] = _, s[u] = y;
  }
  let d = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++d < l; )
      a[d] = Wi(r[d]);
  else {
    const _ = Wi(r);
    for (; ++d < l; )
      a[d] = _;
  }
  d = -1;
  const p = [], f = [];
  for (; ++d < l; ) {
    const _ = a[d];
    let y = "", h = "";
    _ === 99 ? (y = ":", h = ":") : _ === 108 ? y = ":" : _ === 114 && (h = ":");
    let w = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      c[d] - y.length - h.length
    );
    const S = y + "-".repeat(w) + h;
    t.alignDelimiters !== !1 && (w = y.length + w + h.length, w > c[d] && (c[d] = w), f[d] = w), p[d] = S;
  }
  i.splice(1, 0, p), s.splice(1, 0, f), u = -1;
  const g = [];
  for (; ++u < i.length; ) {
    const _ = i[u], y = s[u];
    d = -1;
    const h = [];
    for (; ++d < l; ) {
      const w = _[d] || "";
      let S = "", C = "";
      if (t.alignDelimiters !== !1) {
        const R = c[d] - (y[d] || 0), k = a[d];
        k === 114 ? S = " ".repeat(R) : k === 99 ? R % 2 ? (S = " ".repeat(R / 2 + 0.5), C = " ".repeat(R / 2 - 0.5)) : (S = " ".repeat(R / 2), C = S) : C = " ".repeat(R);
      }
      t.delimiterStart !== !1 && !d && h.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && w === "") && (t.delimiterStart !== !1 || d) && h.push(" "), t.alignDelimiters !== !1 && h.push(S), h.push(w), t.alignDelimiters !== !1 && h.push(C), t.padding !== !1 && h.push(" "), (t.delimiterEnd !== !1 || d !== l - 1) && h.push("|");
    }
    g.push(
      t.delimiterEnd === !1 ? h.join("").replace(/ +$/, "") : h.join("")
    );
  }
  return g.join(`
`);
}
function Dp(e) {
  return e == null ? "" : String(e);
}
function Wi(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function Lp(e, n, t, r) {
  const o = t.enter("blockquote"), a = t.createTracker(r);
  a.move("> "), a.shift(2);
  const i = t.indentLines(
    t.containerFlow(e, a.current()),
    Pp
  );
  return o(), i;
}
function Pp(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function Bp(e, n) {
  return Vi(e, n.inConstruct, !0) && !Vi(e, n.notInConstruct, !1);
}
function Vi(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function Yi(e, n, t, r) {
  let o = -1;
  for (; ++o < t.unsafe.length; )
    if (t.unsafe[o].character === `
` && Bp(t.stack, t.unsafe[o]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Fp(e, n) {
  const t = String(e);
  let r = t.indexOf(n), o = r, a = 0, i = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === o ? ++a > i && (i = a) : a = 1, o = r + n.length, r = t.indexOf(n, o);
  return i;
}
function zp(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Up(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function $p(e, n, t, r) {
  const o = Up(t), a = e.value || "", i = o === "`" ? "GraveAccent" : "Tilde";
  if (zp(e, t)) {
    const d = t.enter("codeIndented"), p = t.indentLines(a, Hp);
    return d(), p;
  }
  const s = t.createTracker(r), c = o.repeat(Math.max(Fp(a, o) + 1, 3)), l = t.enter("codeFenced");
  let u = s.move(c);
  if (e.lang) {
    const d = t.enter(`codeFencedLang${i}`);
    u += s.move(
      t.safe(e.lang, {
        before: u,
        after: " ",
        encode: ["`"],
        ...s.current()
      })
    ), d();
  }
  if (e.lang && e.meta) {
    const d = t.enter(`codeFencedMeta${i}`);
    u += s.move(" "), u += s.move(
      t.safe(e.meta, {
        before: u,
        after: `
`,
        encode: ["`"],
        ...s.current()
      })
    ), d();
  }
  return u += s.move(`
`), a && (u += s.move(a + `
`)), u += s.move(c), l(), u;
}
function Hp(e, n, t) {
  return (t ? "" : "    ") + e;
}
function Hr(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function Gp(e, n, t, r) {
  const o = Hr(t), a = o === '"' ? "Quote" : "Apostrophe", i = t.enter("definition");
  let s = t.enter("label");
  const c = t.createTracker(r);
  let l = c.move("[");
  return l += c.move(
    t.safe(t.associationId(e), {
      before: l,
      after: "]",
      ...c.current()
    })
  ), l += c.move("]: "), s(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), l += c.move("<"), l += c.move(
    t.safe(e.url, { before: l, after: ">", ...c.current() })
  ), l += c.move(">")) : (s = t.enter("destinationRaw"), l += c.move(
    t.safe(e.url, {
      before: l,
      after: e.title ? " " : `
`,
      ...c.current()
    })
  )), s(), e.title && (s = t.enter(`title${a}`), l += c.move(" " + o), l += c.move(
    t.safe(e.title, {
      before: l,
      after: o,
      ...c.current()
    })
  ), l += c.move(o), s()), i(), l;
}
function Kp(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function Zn(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function St(e, n, t) {
  const r = Rn(e), o = Rn(n);
  return r === void 0 ? o === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : o === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? o === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : o === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : o === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : o === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
na.peek = qp;
function na(e, n, t, r) {
  const o = Kp(t), a = t.enter("emphasis"), i = t.createTracker(r), s = i.move(o);
  let c = i.move(
    t.containerPhrasing(e, {
      after: o,
      before: s,
      ...i.current()
    })
  );
  const l = c.charCodeAt(0), u = St(
    r.before.charCodeAt(r.before.length - 1),
    l,
    o
  );
  u.inside && (c = Zn(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), p = St(r.after.charCodeAt(0), d, o);
  p.inside && (c = c.slice(0, -1) + Zn(d));
  const f = i.move(o);
  return a(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: u.outside
  }, s + c + f;
}
function qp(e, n, t) {
  return t.options.emphasis || "*";
}
function Wp(e, n) {
  let t = !1;
  return Mt(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, _r;
  }), !!((!e.depth || e.depth < 3) && Dr(e) && (n.options.setext || t));
}
function Vp(e, n, t, r) {
  const o = Math.max(Math.min(6, e.depth || 1), 1), a = t.createTracker(r);
  if (Wp(e, t)) {
    const u = t.enter("headingSetext"), d = t.enter("phrasing"), p = t.containerPhrasing(e, {
      ...a.current(),
      before: `
`,
      after: `
`
    });
    return d(), u(), p + `
` + (o === 1 ? "=" : "-").repeat(
      // The whole size…
      p.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(p.lastIndexOf("\r"), p.lastIndexOf(`
`)) + 1)
    );
  }
  const i = "#".repeat(o), s = t.enter("headingAtx"), c = t.enter("phrasing");
  a.move(i + " ");
  let l = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...a.current()
  });
  return /^[\t ]/.test(l) && (l = Zn(l.charCodeAt(0)) + l.slice(1)), l = l ? i + " " + l : i, t.options.closeAtx && (l += " " + i), c(), s(), l;
}
ta.peek = Yp;
function ta(e) {
  return e.value || "";
}
function Yp() {
  return "<";
}
ra.peek = Zp;
function ra(e, n, t, r) {
  const o = Hr(t), a = o === '"' ? "Quote" : "Apostrophe", i = t.enter("image");
  let s = t.enter("label");
  const c = t.createTracker(r);
  let l = c.move("![");
  return l += c.move(
    t.safe(e.alt, { before: l, after: "]", ...c.current() })
  ), l += c.move("]("), s(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), l += c.move("<"), l += c.move(
    t.safe(e.url, { before: l, after: ">", ...c.current() })
  ), l += c.move(">")) : (s = t.enter("destinationRaw"), l += c.move(
    t.safe(e.url, {
      before: l,
      after: e.title ? " " : ")",
      ...c.current()
    })
  )), s(), e.title && (s = t.enter(`title${a}`), l += c.move(" " + o), l += c.move(
    t.safe(e.title, {
      before: l,
      after: o,
      ...c.current()
    })
  ), l += c.move(o), s()), l += c.move(")"), i(), l;
}
function Zp() {
  return "!";
}
ia.peek = Xp;
function ia(e, n, t, r) {
  const o = e.referenceType, a = t.enter("imageReference");
  let i = t.enter("label");
  const s = t.createTracker(r);
  let c = s.move("![");
  const l = t.safe(e.alt, {
    before: c,
    after: "]",
    ...s.current()
  });
  c += s.move(l + "]["), i();
  const u = t.stack;
  t.stack = [], i = t.enter("reference");
  const d = t.safe(t.associationId(e), {
    before: c,
    after: "]",
    ...s.current()
  });
  return i(), t.stack = u, a(), o === "full" || !l || l !== d ? c += s.move(d + "]") : o === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Xp() {
  return "!";
}
oa.peek = Qp;
function oa(e, n, t) {
  let r = e.value || "", o = "`", a = -1;
  for (; new RegExp("(^|[^`])" + o + "([^`]|$)").test(r); )
    o += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++a < t.unsafe.length; ) {
    const i = t.unsafe[a], s = t.compilePattern(i);
    let c;
    if (i.atBreak)
      for (; c = s.exec(r); ) {
        let l = c.index;
        r.charCodeAt(l) === 10 && r.charCodeAt(l - 1) === 13 && l--, r = r.slice(0, l) + " " + r.slice(c.index + 1);
      }
  }
  return o + r + o;
}
function Qp() {
  return "`";
}
function aa(e, n) {
  const t = Dr(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
sa.peek = jp;
function sa(e, n, t, r) {
  const o = Hr(t), a = o === '"' ? "Quote" : "Apostrophe", i = t.createTracker(r);
  let s, c;
  if (aa(e, t)) {
    const u = t.stack;
    t.stack = [], s = t.enter("autolink");
    let d = i.move("<");
    return d += i.move(
      t.containerPhrasing(e, {
        before: d,
        after: ">",
        ...i.current()
      })
    ), d += i.move(">"), s(), t.stack = u, d;
  }
  s = t.enter("link"), c = t.enter("label");
  let l = i.move("[");
  return l += i.move(
    t.containerPhrasing(e, {
      before: l,
      after: "](",
      ...i.current()
    })
  ), l += i.move("]("), c(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (c = t.enter("destinationLiteral"), l += i.move("<"), l += i.move(
    t.safe(e.url, { before: l, after: ">", ...i.current() })
  ), l += i.move(">")) : (c = t.enter("destinationRaw"), l += i.move(
    t.safe(e.url, {
      before: l,
      after: e.title ? " " : ")",
      ...i.current()
    })
  )), c(), e.title && (c = t.enter(`title${a}`), l += i.move(" " + o), l += i.move(
    t.safe(e.title, {
      before: l,
      after: o,
      ...i.current()
    })
  ), l += i.move(o), c()), l += i.move(")"), s(), l;
}
function jp(e, n, t) {
  return aa(e, t) ? "<" : "[";
}
la.peek = Jp;
function la(e, n, t, r) {
  const o = e.referenceType, a = t.enter("linkReference");
  let i = t.enter("label");
  const s = t.createTracker(r);
  let c = s.move("[");
  const l = t.containerPhrasing(e, {
    before: c,
    after: "]",
    ...s.current()
  });
  c += s.move(l + "]["), i();
  const u = t.stack;
  t.stack = [], i = t.enter("reference");
  const d = t.safe(t.associationId(e), {
    before: c,
    after: "]",
    ...s.current()
  });
  return i(), t.stack = u, a(), o === "full" || !l || l !== d ? c += s.move(d + "]") : o === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Jp() {
  return "[";
}
function Gr(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function eg(e) {
  const n = Gr(e), t = e.options.bulletOther;
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
function ng(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function ca(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function tg(e, n, t, r) {
  const o = t.enter("list"), a = t.bulletCurrent;
  let i = e.ordered ? ng(t) : Gr(t);
  const s = e.ordered ? i === "." ? ")" : "." : eg(t);
  let c = n && t.bulletLastUsed ? i === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const u = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (i === "*" || i === "-") && // Empty first list item:
      u && (!u.children || !u.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (c = !0), ca(t) === i && u
    ) {
      let d = -1;
      for (; ++d < e.children.length; ) {
        const p = e.children[d];
        if (p && p.type === "listItem" && p.children && p.children[0] && p.children[0].type === "thematicBreak") {
          c = !0;
          break;
        }
      }
    }
  }
  c && (i = s), t.bulletCurrent = i;
  const l = t.containerFlow(e, r);
  return t.bulletLastUsed = i, t.bulletCurrent = a, o(), l;
}
function rg(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function ig(e, n, t, r) {
  const o = rg(t);
  let a = t.bulletCurrent || Gr(t);
  n && n.type === "list" && n.ordered && (a = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + a);
  let i = a.length + 1;
  (o === "tab" || o === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (i = Math.ceil(i / 4) * 4);
  const s = t.createTracker(r);
  s.move(a + " ".repeat(i - a.length)), s.shift(i);
  const c = t.enter("listItem"), l = t.indentLines(
    t.containerFlow(e, s.current()),
    u
  );
  return c(), l;
  function u(d, p, f) {
    return p ? (f ? "" : " ".repeat(i)) + d : (f ? a : a + " ".repeat(i - a.length)) + d;
  }
}
function og(e, n, t, r) {
  const o = t.enter("paragraph"), a = t.enter("phrasing"), i = t.containerPhrasing(e, r);
  return a(), o(), i;
}
const ag = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  jn([
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
function sg(e, n, t, r) {
  return (e.children.some(function(i) {
    return ag(i);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function lg(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
ua.peek = cg;
function ua(e, n, t, r) {
  const o = lg(t), a = t.enter("strong"), i = t.createTracker(r), s = i.move(o + o);
  let c = i.move(
    t.containerPhrasing(e, {
      after: o,
      before: s,
      ...i.current()
    })
  );
  const l = c.charCodeAt(0), u = St(
    r.before.charCodeAt(r.before.length - 1),
    l,
    o
  );
  u.inside && (c = Zn(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), p = St(r.after.charCodeAt(0), d, o);
  p.inside && (c = c.slice(0, -1) + Zn(d));
  const f = i.move(o + o);
  return a(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: u.outside
  }, s + c + f;
}
function cg(e, n, t) {
  return t.options.strong || "*";
}
function ug(e, n, t, r) {
  return t.safe(e.value, r);
}
function dg(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function fg(e, n, t) {
  const r = (ca(t) + (t.options.ruleSpaces ? " " : "")).repeat(dg(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const da = {
  blockquote: Lp,
  break: Yi,
  code: $p,
  definition: Gp,
  emphasis: na,
  hardBreak: Yi,
  heading: Vp,
  html: ta,
  image: ra,
  imageReference: ia,
  inlineCode: oa,
  link: sa,
  linkReference: la,
  list: tg,
  listItem: ig,
  paragraph: og,
  root: sg,
  strong: ua,
  text: ug,
  thematicBreak: fg
};
function pg() {
  return {
    enter: {
      table: gg,
      tableData: Zi,
      tableHeader: Zi,
      tableRow: mg
    },
    exit: {
      codeText: bg,
      table: hg,
      tableData: ar,
      tableHeader: ar,
      tableRow: ar
    }
  };
}
function gg(e) {
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
function hg(e) {
  this.exit(e), this.data.inTable = void 0;
}
function mg(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function ar(e) {
  this.exit(e);
}
function Zi(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function bg(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, Eg));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function Eg(e, n) {
  return n === "|" ? n : e;
}
function _g(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, o = n.stringLength, a = t ? " " : "|";
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
      tableCell: c,
      tableRow: s
    }
  };
  function i(f, g, _, y) {
    return l(u(f, _, y), f.align);
  }
  function s(f, g, _, y) {
    const h = d(f, _, y), w = l([h]);
    return w.slice(0, w.indexOf(`
`));
  }
  function c(f, g, _, y) {
    const h = _.enter("tableCell"), w = _.enter("phrasing"), S = _.containerPhrasing(f, {
      ...y,
      before: a,
      after: a
    });
    return w(), h(), S;
  }
  function l(f, g) {
    return Mp(f, {
      align: g,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: o
    });
  }
  function u(f, g, _) {
    const y = f.children;
    let h = -1;
    const w = [], S = g.enter("table");
    for (; ++h < y.length; )
      w[h] = d(y[h], g, _);
    return S(), w;
  }
  function d(f, g, _) {
    const y = f.children;
    let h = -1;
    const w = [], S = g.enter("tableRow");
    for (; ++h < y.length; )
      w[h] = c(y[h], f, g, _);
    return S(), w;
  }
  function p(f, g, _) {
    let y = da.inlineCode(f, g, _);
    return _.stack.includes("tableCell") && (y = y.replace(/\|/g, "\\$&")), y;
  }
}
function yg() {
  return {
    exit: {
      taskListCheckValueChecked: Xi,
      taskListCheckValueUnchecked: Xi,
      paragraph: wg
    }
  };
}
function kg() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: xg }
  };
}
function Xi(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function wg(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const o = n.children;
      let a = -1, i;
      for (; ++a < o.length; ) {
        const s = o[a];
        if (s.type === "paragraph") {
          i = s;
          break;
        }
      }
      i === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function xg(e, n, t, r) {
  const o = e.children[0], a = typeof e.checked == "boolean" && o && o.type === "paragraph", i = "[" + (e.checked ? "x" : " ") + "] ", s = t.createTracker(r);
  a && s.move(i);
  let c = da.listItem(e, n, t, {
    ...r,
    ...s.current()
  });
  return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
  function l(u) {
    return u + i;
  }
}
function Sg() {
  return [
    tp(),
    xp(),
    Ap(),
    pg(),
    yg()
  ];
}
function Ng(e) {
  return {
    extensions: [
      rp(),
      Sp(e),
      vp(),
      _g(e),
      kg()
    ]
  };
}
const Tg = {
  tokenize: Rg,
  partial: !0
}, fa = {
  tokenize: Mg,
  partial: !0
}, pa = {
  tokenize: Dg,
  partial: !0
}, ga = {
  tokenize: Lg,
  partial: !0
}, Ag = {
  tokenize: Pg,
  partial: !0
}, ha = {
  name: "wwwAutolink",
  tokenize: Og,
  previous: ba
}, ma = {
  name: "protocolAutolink",
  tokenize: Ig,
  previous: Ea
}, ln = {
  name: "emailAutolink",
  tokenize: Cg,
  previous: _a
}, Je = {};
function vg() {
  return {
    text: Je
  };
}
let En = 48;
for (; En < 123; )
  Je[En] = ln, En++, En === 58 ? En = 65 : En === 91 && (En = 97);
Je[43] = ln;
Je[45] = ln;
Je[46] = ln;
Je[95] = ln;
Je[72] = [ln, ma];
Je[104] = [ln, ma];
Je[87] = [ln, ha];
Je[119] = [ln, ha];
function Cg(e, n, t) {
  const r = this;
  let o, a;
  return i;
  function i(d) {
    return !xr(d) || !_a.call(r, r.previous) || Kr(r.events) ? t(d) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(d));
  }
  function s(d) {
    return xr(d) ? (e.consume(d), s) : d === 64 ? (e.consume(d), c) : t(d);
  }
  function c(d) {
    return d === 46 ? e.check(Ag, u, l)(d) : d === 45 || d === 95 || Ae(d) ? (a = !0, e.consume(d), c) : u(d);
  }
  function l(d) {
    return e.consume(d), o = !0, c;
  }
  function u(d) {
    return a && o && Re(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(d)) : t(d);
  }
}
function Og(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return i !== 87 && i !== 119 || !ba.call(r, r.previous) || Kr(r.events) ? t(i) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Tg, e.attempt(fa, e.attempt(pa, a), t), t)(i));
  }
  function a(i) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(i);
  }
}
function Ig(e, n, t) {
  const r = this;
  let o = "", a = !1;
  return i;
  function i(d) {
    return (d === 72 || d === 104) && Ea.call(r, r.previous) && !Kr(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), o += String.fromCodePoint(d), e.consume(d), s) : t(d);
  }
  function s(d) {
    if (Re(d) && o.length < 5)
      return o += String.fromCodePoint(d), e.consume(d), s;
    if (d === 58) {
      const p = o.toLowerCase();
      if (p === "http" || p === "https")
        return e.consume(d), c;
    }
    return t(d);
  }
  function c(d) {
    return d === 47 ? (e.consume(d), a ? l : (a = !0, c)) : t(d);
  }
  function l(d) {
    return d === null || kt(d) || he(d) || wn(d) || Ct(d) ? t(d) : e.attempt(fa, e.attempt(pa, u), t)(d);
  }
  function u(d) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(d);
  }
}
function Rg(e, n, t) {
  let r = 0;
  return o;
  function o(i) {
    return (i === 87 || i === 119) && r < 3 ? (r++, e.consume(i), o) : i === 46 && r === 3 ? (e.consume(i), a) : t(i);
  }
  function a(i) {
    return i === null ? t(i) : n(i);
  }
}
function Mg(e, n, t) {
  let r, o, a;
  return i;
  function i(l) {
    return l === 46 || l === 95 ? e.check(ga, c, s)(l) : l === null || he(l) || wn(l) || l !== 45 && Ct(l) ? c(l) : (a = !0, e.consume(l), i);
  }
  function s(l) {
    return l === 95 ? r = !0 : (o = r, r = void 0), e.consume(l), i;
  }
  function c(l) {
    return o || r || !a ? t(l) : n(l);
  }
}
function Dg(e, n) {
  let t = 0, r = 0;
  return o;
  function o(i) {
    return i === 40 ? (t++, e.consume(i), o) : i === 41 && r < t ? a(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? e.check(ga, n, a)(i) : i === null || he(i) || wn(i) ? n(i) : (e.consume(i), o);
  }
  function a(i) {
    return i === 41 && r++, e.consume(i), o;
  }
}
function Lg(e, n, t) {
  return r;
  function r(s) {
    return s === 33 || s === 34 || s === 39 || s === 41 || s === 42 || s === 44 || s === 46 || s === 58 || s === 59 || s === 63 || s === 95 || s === 126 ? (e.consume(s), r) : s === 38 ? (e.consume(s), a) : s === 93 ? (e.consume(s), o) : (
      // `<` is an end.
      s === 60 || // So is whitespace.
      s === null || he(s) || wn(s) ? n(s) : t(s)
    );
  }
  function o(s) {
    return s === null || s === 40 || s === 91 || he(s) || wn(s) ? n(s) : r(s);
  }
  function a(s) {
    return Re(s) ? i(s) : t(s);
  }
  function i(s) {
    return s === 59 ? (e.consume(s), r) : Re(s) ? (e.consume(s), i) : t(s);
  }
}
function Pg(e, n, t) {
  return r;
  function r(a) {
    return e.consume(a), o;
  }
  function o(a) {
    return Ae(a) ? t(a) : n(a);
  }
}
function ba(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || he(e);
}
function Ea(e) {
  return !Re(e);
}
function _a(e) {
  return !(e === 47 || xr(e));
}
function xr(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || Ae(e);
}
function Kr(e) {
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
const Bg = {
  tokenize: qg,
  partial: !0
};
function Fg() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: Hg,
        continuation: {
          tokenize: Gg
        },
        exit: Kg
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: $g
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: zg,
        resolveTo: Ug
      }
    }
  };
}
function zg(e, n, t) {
  const r = this;
  let o = r.events.length;
  const a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let i;
  for (; o--; ) {
    const c = r.events[o][1];
    if (c.type === "labelImage") {
      i = c;
      break;
    }
    if (c.type === "gfmFootnoteCall" || c.type === "labelLink" || c.type === "label" || c.type === "image" || c.type === "link")
      break;
  }
  return s;
  function s(c) {
    if (!i || !i._balanced)
      return t(c);
    const l = Ye(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }));
    return l.codePointAt(0) !== 94 || !a.includes(l.slice(1)) ? t(c) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), n(c));
  }
}
function Ug(e, n) {
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
  }, o = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  o.end.column++, o.end.offset++, o.end._bufferIndex++;
  const a = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, o.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, i = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, a.start),
    end: Object.assign({}, a.end)
  }, s = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[t + 1],
    e[t + 2],
    ["enter", r, n],
    // The `[`
    e[t + 3],
    e[t + 4],
    // The `^`.
    ["enter", o, n],
    ["exit", o, n],
    // Everything in between.
    ["enter", a, n],
    ["enter", i, n],
    ["exit", i, n],
    ["exit", a, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...s), e;
}
function $g(e, n, t) {
  const r = this, o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a = 0, i;
  return s;
  function s(d) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(d), e.exit("gfmFootnoteCallLabelMarker"), c;
  }
  function c(d) {
    return d !== 94 ? t(d) : (e.enter("gfmFootnoteCallMarker"), e.consume(d), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l);
  }
  function l(d) {
    if (
      // Too long.
      a > 999 || // Closing brace with nothing.
      d === 93 && !i || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      d === null || d === 91 || he(d)
    )
      return t(d);
    if (d === 93) {
      e.exit("chunkString");
      const p = e.exit("gfmFootnoteCallString");
      return o.includes(Ye(r.sliceSerialize(p))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(d), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(d);
    }
    return he(d) || (i = !0), a++, e.consume(d), d === 92 ? u : l;
  }
  function u(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), a++, l) : l(d);
  }
}
function Hg(e, n, t) {
  const r = this, o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a, i = 0, s;
  return c;
  function c(g) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
  }
  function l(g) {
    return g === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : t(g);
  }
  function u(g) {
    if (
      // Too long.
      i > 999 || // Closing brace with nothing.
      g === 93 && !s || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      g === null || g === 91 || he(g)
    )
      return t(g);
    if (g === 93) {
      e.exit("chunkString");
      const _ = e.exit("gfmFootnoteDefinitionLabelString");
      return a = Ye(r.sliceSerialize(_)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return he(g) || (s = !0), i++, e.consume(g), g === 92 ? d : u;
  }
  function d(g) {
    return g === 91 || g === 92 || g === 93 ? (e.consume(g), i++, u) : u(g);
  }
  function p(g) {
    return g === 58 ? (e.enter("definitionMarker"), e.consume(g), e.exit("definitionMarker"), o.includes(a) || o.push(a), oe(e, f, "gfmFootnoteDefinitionWhitespace")) : t(g);
  }
  function f(g) {
    return n(g);
  }
}
function Gg(e, n, t) {
  return e.check(Qn, n, e.attempt(Bg, n, t));
}
function Kg(e) {
  e.exit("gfmFootnoteDefinition");
}
function qg(e, n, t) {
  const r = this;
  return oe(e, o, "gfmFootnoteDefinitionIndent", 5);
  function o(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? n(a) : t(a);
  }
}
function Wg(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: a,
    resolveAll: o
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
  function o(i, s) {
    let c = -1;
    for (; ++c < i.length; )
      if (i[c][0] === "enter" && i[c][1].type === "strikethroughSequenceTemporary" && i[c][1]._close) {
        let l = c;
        for (; l--; )
          if (i[l][0] === "exit" && i[l][1].type === "strikethroughSequenceTemporary" && i[l][1]._open && // If the sizes are the same:
          i[c][1].end.offset - i[c][1].start.offset === i[l][1].end.offset - i[l][1].start.offset) {
            i[c][1].type = "strikethroughSequence", i[l][1].type = "strikethroughSequence";
            const u = {
              type: "strikethrough",
              start: Object.assign({}, i[l][1].start),
              end: Object.assign({}, i[c][1].end)
            }, d = {
              type: "strikethroughText",
              start: Object.assign({}, i[l][1].end),
              end: Object.assign({}, i[c][1].start)
            }, p = [["enter", u, s], ["enter", i[l][1], s], ["exit", i[l][1], s], ["enter", d, s]], f = s.parser.constructs.insideSpan.null;
            f && He(p, p.length, 0, Ot(f, i.slice(l + 1, c), s)), He(p, p.length, 0, [["exit", d, s], ["enter", i[c][1], s], ["exit", i[c][1], s], ["exit", u, s]]), He(i, l - 1, c - l + 3, p), c = l + p.length - 2;
            break;
          }
      }
    for (c = -1; ++c < i.length; )
      i[c][1].type === "strikethroughSequenceTemporary" && (i[c][1].type = "data");
    return i;
  }
  function a(i, s, c) {
    const l = this.previous, u = this.events;
    let d = 0;
    return p;
    function p(g) {
      return l === 126 && u[u.length - 1][1].type !== "characterEscape" ? c(g) : (i.enter("strikethroughSequenceTemporary"), f(g));
    }
    function f(g) {
      const _ = Rn(l);
      if (g === 126)
        return d > 1 ? c(g) : (i.consume(g), d++, f);
      if (d < 2 && !t) return c(g);
      const y = i.exit("strikethroughSequenceTemporary"), h = Rn(g);
      return y._open = !h || h === 2 && !!_, y._close = !_ || _ === 2 && !!h, s(g);
    }
  }
}
class Vg {
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
    Yg(this, n, t, r);
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
    if (this.map.sort(function(a, i) {
      return a[0] - i[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let o = r.pop();
    for (; o; ) {
      for (const a of o)
        n.push(a);
      o = r.pop();
    }
    this.map.length = 0;
  }
}
function Yg(e, n, t, r) {
  let o = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; o < e.map.length; ) {
      if (e.map[o][0] === n) {
        e.map[o][1] += t, e.map[o][2].push(...r);
        return;
      }
      o += 1;
    }
    e.map.push([n, t, r]);
  }
}
function Zg(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const o = e[n];
    if (t) {
      if (o[0] === "enter")
        o[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (o[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const a = r.length - 1;
          r[a] = r[a] === "left" ? "center" : "right";
        }
      } else if (o[1].type === "tableDelimiterRow")
        break;
    } else o[0] === "enter" && o[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function Xg() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Qg,
        resolveAll: jg
      }
    }
  };
}
function Qg(e, n, t) {
  const r = this;
  let o = 0, a = 0, i;
  return s;
  function s(x) {
    let P = r.events.length - 1;
    for (; P > -1; ) {
      const D = r.events[P][1].type;
      if (D === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      D === "linePrefix") P--;
      else break;
    }
    const B = P > -1 ? r.events[P][1].type : null, J = B === "tableHead" || B === "tableRow" ? k : c;
    return J === k && r.parser.lazy[r.now().line] ? t(x) : J(x);
  }
  function c(x) {
    return e.enter("tableHead"), e.enter("tableRow"), l(x);
  }
  function l(x) {
    return x === 124 || (i = !0, a += 1), u(x);
  }
  function u(x) {
    return x === null ? t(x) : q(x) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), f) : t(x) : re(x) ? oe(e, u, "whitespace")(x) : (a += 1, i && (i = !1, o += 1), x === 124 ? (e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), i = !0, u) : (e.enter("data"), d(x)));
  }
  function d(x) {
    return x === null || x === 124 || he(x) ? (e.exit("data"), u(x)) : (e.consume(x), x === 92 ? p : d);
  }
  function p(x) {
    return x === 92 || x === 124 ? (e.consume(x), d) : d(x);
  }
  function f(x) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(x) : (e.enter("tableDelimiterRow"), i = !1, re(x) ? oe(e, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(x) : g(x));
  }
  function g(x) {
    return x === 45 || x === 58 ? y(x) : x === 124 ? (i = !0, e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), _) : R(x);
  }
  function _(x) {
    return re(x) ? oe(e, y, "whitespace")(x) : y(x);
  }
  function y(x) {
    return x === 58 ? (a += 1, i = !0, e.enter("tableDelimiterMarker"), e.consume(x), e.exit("tableDelimiterMarker"), h) : x === 45 ? (a += 1, h(x)) : x === null || q(x) ? C(x) : R(x);
  }
  function h(x) {
    return x === 45 ? (e.enter("tableDelimiterFiller"), w(x)) : R(x);
  }
  function w(x) {
    return x === 45 ? (e.consume(x), w) : x === 58 ? (i = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(x), e.exit("tableDelimiterMarker"), S) : (e.exit("tableDelimiterFiller"), S(x));
  }
  function S(x) {
    return re(x) ? oe(e, C, "whitespace")(x) : C(x);
  }
  function C(x) {
    return x === 124 ? g(x) : x === null || q(x) ? !i || o !== a ? R(x) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(x)) : R(x);
  }
  function R(x) {
    return t(x);
  }
  function k(x) {
    return e.enter("tableRow"), U(x);
  }
  function U(x) {
    return x === 124 ? (e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), U) : x === null || q(x) ? (e.exit("tableRow"), n(x)) : re(x) ? oe(e, U, "whitespace")(x) : (e.enter("data"), $(x));
  }
  function $(x) {
    return x === null || x === 124 || he(x) ? (e.exit("data"), U(x)) : (e.consume(x), x === 92 ? H : $);
  }
  function H(x) {
    return x === 92 || x === 124 ? (e.consume(x), $) : $(x);
  }
}
function jg(e, n) {
  let t = -1, r = !0, o = 0, a = [0, 0, 0, 0], i = [0, 0, 0, 0], s = !1, c = 0, l, u, d;
  const p = new Vg();
  for (; ++t < e.length; ) {
    const f = e[t], g = f[1];
    f[0] === "enter" ? g.type === "tableHead" ? (s = !1, c !== 0 && (Qi(p, n, c, l, u), u = void 0, c = 0), l = {
      type: "table",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", l, n]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [0, 0, 0, 0], i = [0, t + 1, 0, 0], s && (s = !1, u = {
      type: "tableBody",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", u, n]])), o = g.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : o && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = !1, i[2] === 0 && (a[1] !== 0 && (i[0] = i[1], d = ut(p, n, a, o, void 0, d), a = [0, 0, 0, 0]), i[2] = t)) : g.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (i[0] = i[1], d = ut(p, n, a, o, void 0, d)), a = i, i = [a[1], t, 0, 0])) : g.type === "tableHead" ? (s = !0, c = t) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (c = t, a[1] !== 0 ? (i[0] = i[1], d = ut(p, n, a, o, t, d)) : i[1] !== 0 && (d = ut(p, n, i, o, t, d)), o = 0) : o && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (i[3] = t);
  }
  for (c !== 0 && Qi(p, n, c, l, u), p.consume(n.events), t = -1; ++t < n.events.length; ) {
    const f = n.events[t];
    f[0] === "enter" && f[1].type === "table" && (f[1]._align = Zg(n.events, t));
  }
  return e;
}
function ut(e, n, t, r, o, a) {
  const i = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", s = "tableContent";
  t[0] !== 0 && (a.end = Object.assign({}, Cn(n.events, t[0])), e.add(t[0], 0, [["exit", a, n]]));
  const c = Cn(n.events, t[1]);
  if (a = {
    type: i,
    start: Object.assign({}, c),
    // Note: correct end is set later.
    end: Object.assign({}, c)
  }, e.add(t[1], 0, [["enter", a, n]]), t[2] !== 0) {
    const l = Cn(n.events, t[2]), u = Cn(n.events, t[3]), d = {
      type: s,
      start: Object.assign({}, l),
      end: Object.assign({}, u)
    };
    if (e.add(t[2], 0, [["enter", d, n]]), r !== 2) {
      const p = n.events[t[2]], f = n.events[t[3]];
      if (p[1].end = Object.assign({}, f[1].end), p[1].type = "chunkText", p[1].contentType = "text", t[3] > t[2] + 1) {
        const g = t[2] + 1, _ = t[3] - t[2] - 1;
        e.add(g, _, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", d, n]]);
  }
  return o !== void 0 && (a.end = Object.assign({}, Cn(n.events, o)), e.add(o, 0, [["exit", a, n]]), a = void 0), a;
}
function Qi(e, n, t, r, o) {
  const a = [], i = Cn(n.events, t);
  o && (o.end = Object.assign({}, i), a.push(["exit", o, n])), r.end = Object.assign({}, i), a.push(["exit", r, n]), e.add(t + 1, 0, a);
}
function Cn(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Jg = {
  name: "tasklistCheck",
  tokenize: nh
};
function eh() {
  return {
    text: {
      91: Jg
    }
  };
}
function nh(e, n, t) {
  const r = this;
  return o;
  function o(c) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(c) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(c), e.exit("taskListCheckMarker"), a)
    );
  }
  function a(c) {
    return he(c) ? (e.enter("taskListCheckValueUnchecked"), e.consume(c), e.exit("taskListCheckValueUnchecked"), i) : c === 88 || c === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(c), e.exit("taskListCheckValueChecked"), i) : t(c);
  }
  function i(c) {
    return c === 93 ? (e.enter("taskListCheckMarker"), e.consume(c), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), s) : t(c);
  }
  function s(c) {
    return q(c) ? n(c) : re(c) ? e.check({
      tokenize: th
    }, n, t)(c) : t(c);
  }
}
function th(e, n, t) {
  return oe(e, r, "whitespace");
  function r(o) {
    return o === null ? t(o) : n(o);
  }
}
function rh(e) {
  return Co([
    vg(),
    Fg(),
    Wg(e),
    Xg(),
    eh()
  ]);
}
const ih = {};
function oh(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || ih, r = n.data(), o = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), i = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  o.push(rh(t)), a.push(Sg()), i.push(Ng(t));
}
const ji = (
  // Note: overloads like this are needed to support optional generics.
  /**
   * @type {(
   *   (<Kind extends UnistParent, Check extends Test>(parent: Kind, index: Child<Kind> | number, test: Check) => Matches<Child<Kind>, Check> | undefined) &
   *   (<Kind extends UnistParent>(parent: Kind, index: Child<Kind> | number, test?: null | undefined) => Child<Kind> | undefined)
   * )}
   */
  /**
   * @param {UnistParent} parent
   * @param {UnistNode | number} index
   * @param {Test} [test]
   * @returns {UnistNode | undefined}
   */
  (function(e, n, t) {
    const r = jn(t);
    if (!e || !e.type || !e.children)
      throw new Error("Expected parent node");
    if (typeof n == "number") {
      if (n < 0 || n === Number.POSITIVE_INFINITY)
        throw new Error("Expected positive finite number as index");
    } else if (n = e.children.indexOf(n), n < 0)
      throw new Error("Expected child node or index");
    for (; ++n < e.children.length; )
      if (r(e.children[n], n, e))
        return e.children[n];
  })
), Sn = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends TestFunction>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & Predicate<Condition, Element>) &
   *   (<Condition extends string>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & {tagName: Condition}) &
   *   ((test?: null | undefined) => (element?: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test | null | undefined} [test]
   * @returns {Check}
   */
  (function(e) {
    if (e == null)
      return lh;
    if (typeof e == "string")
      return sh(e);
    if (typeof e == "object")
      return ah(e);
    if (typeof e == "function")
      return qr(e);
    throw new Error("Expected function, string, or array as `test`");
  })
);
function ah(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Sn(e[t]);
  return qr(r);
  function r(...o) {
    let a = -1;
    for (; ++a < n.length; )
      if (n[a].apply(this, o)) return !0;
    return !1;
  }
}
function sh(e) {
  return qr(n);
  function n(t) {
    return t.tagName === e;
  }
}
function qr(e) {
  return n;
  function n(t, r, o) {
    return !!(ch(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      o || void 0
    ));
  }
}
function lh(e) {
  return !!(e && typeof e == "object" && "type" in e && e.type === "element" && "tagName" in e && typeof e.tagName == "string");
}
function ch(e) {
  return e !== null && typeof e == "object" && "type" in e && "tagName" in e;
}
const Ji = /\n/g, eo = /[\t ]+/g, Sr = Sn("br"), no = Sn(bh), uh = Sn("p"), to = Sn("tr"), dh = Sn([
  // List from: <https://html.spec.whatwg.org/multipage/rendering.html#hidden-elements>
  "datalist",
  "head",
  "noembed",
  "noframes",
  "noscript",
  // Act as if we support scripting.
  "rp",
  "script",
  "style",
  "template",
  "title",
  // Hidden attribute.
  mh,
  // From: <https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3>
  Eh
]), ya = Sn([
  "address",
  // Flow content
  "article",
  // Sections and headings
  "aside",
  // Sections and headings
  "blockquote",
  // Flow content
  "body",
  // Page
  "caption",
  // `table-caption`
  "center",
  // Flow content (legacy)
  "dd",
  // Lists
  "dialog",
  // Flow content
  "dir",
  // Lists (legacy)
  "dl",
  // Lists
  "dt",
  // Lists
  "div",
  // Flow content
  "figure",
  // Flow content
  "figcaption",
  // Flow content
  "footer",
  // Flow content
  "form,",
  // Flow content
  "h1",
  // Sections and headings
  "h2",
  // Sections and headings
  "h3",
  // Sections and headings
  "h4",
  // Sections and headings
  "h5",
  // Sections and headings
  "h6",
  // Sections and headings
  "header",
  // Flow content
  "hgroup",
  // Sections and headings
  "hr",
  // Flow content
  "html",
  // Page
  "legend",
  // Flow content
  "li",
  // Lists (as `display: list-item`)
  "listing",
  // Flow content (legacy)
  "main",
  // Flow content
  "menu",
  // Lists
  "nav",
  // Sections and headings
  "ol",
  // Lists
  "p",
  // Flow content
  "plaintext",
  // Flow content (legacy)
  "pre",
  // Flow content
  "section",
  // Sections and headings
  "ul",
  // Lists
  "xmp"
  // Flow content (legacy)
]);
function fh(e, n) {
  const t = n || {}, r = "children" in e ? e.children : [], o = ya(e), a = xa(e, {
    whitespace: t.whitespace || "normal"
  }), i = [];
  (e.type === "text" || e.type === "comment") && i.push(
    ...wa(e, {
      breakBefore: !0,
      breakAfter: !0
    })
  );
  let s = -1;
  for (; ++s < r.length; )
    i.push(
      ...ka(
        r[s],
        // @ts-expect-error: `tree` is a parent if we’re here.
        e,
        {
          whitespace: a,
          breakBefore: s ? void 0 : o,
          breakAfter: s < r.length - 1 ? Sr(r[s + 1]) : o
        }
      )
    );
  const c = [];
  let l;
  for (s = -1; ++s < i.length; ) {
    const u = i[s];
    typeof u == "number" ? l !== void 0 && u > l && (l = u) : u && (l !== void 0 && l > -1 && c.push(`
`.repeat(l) || " "), l = -1, c.push(u));
  }
  return c.join("");
}
function ka(e, n, t) {
  return e.type === "element" ? ph(e, n, t) : e.type === "text" ? t.whitespace === "normal" ? wa(e, t) : gh(e) : [];
}
function ph(e, n, t) {
  const r = xa(e, t), o = e.children || [];
  let a = -1, i = [];
  if (dh(e))
    return i;
  let s, c;
  for (Sr(e) || to(e) && // @ts-expect-error: something up with types of parents.
  ji(n, e, to) ? c = `
` : uh(e) ? (s = 2, c = 2) : ya(e) && (s = 1, c = 1); ++a < o.length; )
    i = i.concat(
      ka(o[a], e, {
        whitespace: r,
        breakBefore: a ? void 0 : s,
        breakAfter: a < o.length - 1 ? Sr(o[a + 1]) : c
      })
    );
  return no(e) && // @ts-expect-error: something up with types of parents.
  ji(n, e, no) && i.push("	"), s && i.unshift(s), c && i.push(c), i;
}
function wa(e, n) {
  const t = String(e.value), r = [], o = [];
  let a = 0;
  for (; a <= t.length; ) {
    Ji.lastIndex = a;
    const c = Ji.exec(t), l = c && "index" in c ? c.index : t.length;
    r.push(
      // Any sequence of collapsible spaces and tabs immediately preceding or
      // following a segment break is removed.
      hh(
        // […] ignoring bidi formatting characters (characters with the
        // Bidi_Control property [UAX9]: ALM, LTR, RTL, LRE-RLO, LRI-PDI) as if
        // they were not there.
        t.slice(a, l).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""),
        a === 0 ? n.breakBefore : !0,
        l === t.length ? n.breakAfter : !0
      )
    ), a = l + 1;
  }
  let i = -1, s;
  for (; ++i < r.length; )
    r[i].charCodeAt(r[i].length - 1) === 8203 || i < r.length - 1 && r[i + 1].charCodeAt(0) === 8203 ? (o.push(r[i]), s = void 0) : r[i] ? (typeof s == "number" && o.push(s), o.push(r[i]), s = 0) : (i === 0 || i === r.length - 1) && o.push(0);
  return o;
}
function gh(e) {
  return [String(e.value)];
}
function hh(e, n, t) {
  const r = [];
  let o = 0, a;
  for (; o < e.length; ) {
    eo.lastIndex = o;
    const i = eo.exec(e);
    a = i ? i.index : e.length, !o && !a && i && !n && r.push(""), o !== a && r.push(e.slice(o, a)), o = i ? a + i[0].length : a;
  }
  return o !== a && !t && r.push(""), r.join(" ");
}
function xa(e, n) {
  if (e.type === "element") {
    const t = e.properties || {};
    switch (e.tagName) {
      case "listing":
      case "plaintext":
      case "xmp":
        return "pre";
      case "nobr":
        return "nowrap";
      case "pre":
        return t.wrap ? "pre-wrap" : "pre";
      case "td":
      case "th":
        return t.noWrap ? "nowrap" : n.whitespace;
      case "textarea":
        return "pre-wrap";
    }
  }
  return n.whitespace;
}
function mh(e) {
  return !!(e.properties || {}).hidden;
}
function bh(e) {
  return e.tagName === "td" || e.tagName === "th";
}
function Eh(e) {
  return e.tagName === "dialog" && !(e.properties || {}).open;
}
function _h(e) {
  const n = e.regex, t = e.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), r = "decltype\\(auto\\)", o = "[a-zA-Z_]\\w*::", i = "(?!struct)(" + r + "|" + n.optional(o) + "[a-zA-Z_]\\w*" + n.optional("<[^<>]+>") + ")", s = {
    className: "type",
    begin: "\\b[a-z\\d_]*_t\\b"
  }, l = {
    className: "string",
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [e.BACKSLASH_ESCAPE]
      },
      {
        begin: "(u8?|U|L)?'(" + "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)" + "|.)",
        end: "'",
        illegal: "."
      },
      e.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  }, u = {
    className: "number",
    variants: [
      // Floating-point literal.
      {
        begin: "[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"
      },
      // Integer literal.
      {
        begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"
        // Note: there are user-defined literal suffixes too, but perhaps having the custom suffix not part of the
        // literal highlight actually makes it stand out more.
      }
    ],
    relevance: 0
  }, d = {
    className: "meta",
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      e.inherit(l, { className: "string" }),
      {
        className: "string",
        begin: /<.*?>/
      },
      t,
      e.C_BLOCK_COMMENT_MODE
    ]
  }, p = {
    className: "title",
    begin: n.optional(o) + e.IDENT_RE,
    relevance: 0
  }, f = n.optional(o) + e.IDENT_RE + "\\s*\\(", g = [
    "alignas",
    "alignof",
    "and",
    "and_eq",
    "asm",
    "atomic_cancel",
    "atomic_commit",
    "atomic_noexcept",
    "auto",
    "bitand",
    "bitor",
    "break",
    "case",
    "catch",
    "class",
    "co_await",
    "co_return",
    "co_yield",
    "compl",
    "concept",
    "const_cast|10",
    "consteval",
    "constexpr",
    "constinit",
    "continue",
    "decltype",
    "default",
    "delete",
    "do",
    "dynamic_cast|10",
    "else",
    "enum",
    "explicit",
    "export",
    "extern",
    "false",
    "final",
    "for",
    "friend",
    "goto",
    "if",
    "import",
    "inline",
    "module",
    "mutable",
    "namespace",
    "new",
    "noexcept",
    "not",
    "not_eq",
    "nullptr",
    "operator",
    "or",
    "or_eq",
    "override",
    "private",
    "protected",
    "public",
    "reflexpr",
    "register",
    "reinterpret_cast|10",
    "requires",
    "return",
    "sizeof",
    "static_assert",
    "static_cast|10",
    "struct",
    "switch",
    "synchronized",
    "template",
    "this",
    "thread_local",
    "throw",
    "transaction_safe",
    "transaction_safe_dynamic",
    "true",
    "try",
    "typedef",
    "typeid",
    "typename",
    "union",
    "using",
    "virtual",
    "volatile",
    "while",
    "xor",
    "xor_eq"
  ], _ = [
    "bool",
    "char",
    "char16_t",
    "char32_t",
    "char8_t",
    "double",
    "float",
    "int",
    "long",
    "short",
    "void",
    "wchar_t",
    "unsigned",
    "signed",
    "const",
    "static"
  ], y = [
    "any",
    "auto_ptr",
    "barrier",
    "binary_semaphore",
    "bitset",
    "complex",
    "condition_variable",
    "condition_variable_any",
    "counting_semaphore",
    "deque",
    "false_type",
    "flat_map",
    "flat_set",
    "future",
    "imaginary",
    "initializer_list",
    "istringstream",
    "jthread",
    "latch",
    "lock_guard",
    "multimap",
    "multiset",
    "mutex",
    "optional",
    "ostringstream",
    "packaged_task",
    "pair",
    "promise",
    "priority_queue",
    "queue",
    "recursive_mutex",
    "recursive_timed_mutex",
    "scoped_lock",
    "set",
    "shared_future",
    "shared_lock",
    "shared_mutex",
    "shared_timed_mutex",
    "shared_ptr",
    "stack",
    "string_view",
    "stringstream",
    "timed_mutex",
    "thread",
    "true_type",
    "tuple",
    "unique_lock",
    "unique_ptr",
    "unordered_map",
    "unordered_multimap",
    "unordered_multiset",
    "unordered_set",
    "variant",
    "vector",
    "weak_ptr",
    "wstring",
    "wstring_view"
  ], h = [
    "abort",
    "abs",
    "acos",
    "apply",
    "as_const",
    "asin",
    "atan",
    "atan2",
    "calloc",
    "ceil",
    "cerr",
    "cin",
    "clog",
    "cos",
    "cosh",
    "cout",
    "declval",
    "endl",
    "exchange",
    "exit",
    "exp",
    "fabs",
    "floor",
    "fmod",
    "forward",
    "fprintf",
    "fputs",
    "free",
    "frexp",
    "fscanf",
    "future",
    "invoke",
    "isalnum",
    "isalpha",
    "iscntrl",
    "isdigit",
    "isgraph",
    "islower",
    "isprint",
    "ispunct",
    "isspace",
    "isupper",
    "isxdigit",
    "labs",
    "launder",
    "ldexp",
    "log",
    "log10",
    "make_pair",
    "make_shared",
    "make_shared_for_overwrite",
    "make_tuple",
    "make_unique",
    "malloc",
    "memchr",
    "memcmp",
    "memcpy",
    "memset",
    "modf",
    "move",
    "pow",
    "printf",
    "putchar",
    "puts",
    "realloc",
    "scanf",
    "sin",
    "sinh",
    "snprintf",
    "sprintf",
    "sqrt",
    "sscanf",
    "std",
    "stderr",
    "stdin",
    "stdout",
    "strcat",
    "strchr",
    "strcmp",
    "strcpy",
    "strcspn",
    "strlen",
    "strncat",
    "strncmp",
    "strncpy",
    "strpbrk",
    "strrchr",
    "strspn",
    "strstr",
    "swap",
    "tan",
    "tanh",
    "terminate",
    "to_underlying",
    "tolower",
    "toupper",
    "vfprintf",
    "visit",
    "vprintf",
    "vsprintf"
  ], C = {
    type: _,
    keyword: g,
    literal: [
      "NULL",
      "false",
      "nullopt",
      "nullptr",
      "true"
    ],
    built_in: ["_Pragma"],
    _type_hints: y
  }, R = {
    className: "function.dispatch",
    relevance: 0,
    keywords: {
      // Only for relevance, not highlighting.
      _hint: h
    },
    begin: n.concat(
      /\b/,
      /(?!decltype)/,
      /(?!if)/,
      /(?!for)/,
      /(?!switch)/,
      /(?!while)/,
      e.IDENT_RE,
      n.lookahead(/(<[^<>]+>|)\s*\(/)
    )
  }, k = [
    R,
    d,
    s,
    t,
    e.C_BLOCK_COMMENT_MODE,
    u,
    l
  ], U = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: "new throw return else",
        end: /;/
      }
    ],
    keywords: C,
    contains: k.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: C,
        contains: k.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  }, $ = {
    className: "function",
    begin: "(" + i + "[\\*&\\s]+)+" + f,
    returnBegin: !0,
    end: /[{;=]/,
    excludeEnd: !0,
    keywords: C,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: r,
        keywords: C,
        relevance: 0
      },
      {
        begin: f,
        returnBegin: !0,
        contains: [p],
        relevance: 0
      },
      // needed because we do not have look-behind on the below rule
      // to prevent it from grabbing the final : in a :: pair
      {
        begin: /::/,
        relevance: 0
      },
      // initializers
      {
        begin: /:/,
        endsWithParent: !0,
        contains: [
          l,
          u
        ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: C,
        relevance: 0,
        contains: [
          t,
          e.C_BLOCK_COMMENT_MODE,
          l,
          u,
          s,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: C,
            relevance: 0,
            contains: [
              "self",
              t,
              e.C_BLOCK_COMMENT_MODE,
              l,
              u,
              s
            ]
          }
        ]
      },
      s,
      t,
      e.C_BLOCK_COMMENT_MODE,
      d
    ]
  };
  return {
    name: "C++",
    aliases: [
      "cc",
      "c++",
      "h++",
      "hpp",
      "hh",
      "hxx",
      "cxx"
    ],
    keywords: C,
    illegal: "</",
    classNameAliases: { "function.dispatch": "built_in" },
    contains: [].concat(
      U,
      $,
      R,
      k,
      [
        d,
        {
          // containers: ie, `vector <int> rooms (9);`
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
          end: ">",
          keywords: C,
          contains: [
            "self",
            s
          ]
        },
        {
          begin: e.IDENT_RE + "::",
          keywords: C
        },
        {
          match: [
            // extra complexity to deal with `enum class` and `enum struct`
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    )
  };
}
function yh(e) {
  const n = {
    type: [
      "boolean",
      "byte",
      "word",
      "String"
    ],
    built_in: [
      "KeyboardController",
      "MouseController",
      "SoftwareSerial",
      "EthernetServer",
      "EthernetClient",
      "LiquidCrystal",
      "RobotControl",
      "GSMVoiceCall",
      "EthernetUDP",
      "EsploraTFT",
      "HttpClient",
      "RobotMotor",
      "WiFiClient",
      "GSMScanner",
      "FileSystem",
      "Scheduler",
      "GSMServer",
      "YunClient",
      "YunServer",
      "IPAddress",
      "GSMClient",
      "GSMModem",
      "Keyboard",
      "Ethernet",
      "Console",
      "GSMBand",
      "Esplora",
      "Stepper",
      "Process",
      "WiFiUDP",
      "GSM_SMS",
      "Mailbox",
      "USBHost",
      "Firmata",
      "PImage",
      "Client",
      "Server",
      "GSMPIN",
      "FileIO",
      "Bridge",
      "Serial",
      "EEPROM",
      "Stream",
      "Mouse",
      "Audio",
      "Servo",
      "File",
      "Task",
      "GPRS",
      "WiFi",
      "Wire",
      "TFT",
      "GSM",
      "SPI",
      "SD"
    ],
    _hints: [
      "setup",
      "loop",
      "runShellCommandAsynchronously",
      "analogWriteResolution",
      "retrieveCallingNumber",
      "printFirmwareVersion",
      "analogReadResolution",
      "sendDigitalPortPair",
      "noListenOnLocalhost",
      "readJoystickButton",
      "setFirmwareVersion",
      "readJoystickSwitch",
      "scrollDisplayRight",
      "getVoiceCallStatus",
      "scrollDisplayLeft",
      "writeMicroseconds",
      "delayMicroseconds",
      "beginTransmission",
      "getSignalStrength",
      "runAsynchronously",
      "getAsynchronously",
      "listenOnLocalhost",
      "getCurrentCarrier",
      "readAccelerometer",
      "messageAvailable",
      "sendDigitalPorts",
      "lineFollowConfig",
      "countryNameWrite",
      "runShellCommand",
      "readStringUntil",
      "rewindDirectory",
      "readTemperature",
      "setClockDivider",
      "readLightSensor",
      "endTransmission",
      "analogReference",
      "detachInterrupt",
      "countryNameRead",
      "attachInterrupt",
      "encryptionType",
      "readBytesUntil",
      "robotNameWrite",
      "readMicrophone",
      "robotNameRead",
      "cityNameWrite",
      "userNameWrite",
      "readJoystickY",
      "readJoystickX",
      "mouseReleased",
      "openNextFile",
      "scanNetworks",
      "noInterrupts",
      "digitalWrite",
      "beginSpeaker",
      "mousePressed",
      "isActionDone",
      "mouseDragged",
      "displayLogos",
      "noAutoscroll",
      "addParameter",
      "remoteNumber",
      "getModifiers",
      "keyboardRead",
      "userNameRead",
      "waitContinue",
      "processInput",
      "parseCommand",
      "printVersion",
      "readNetworks",
      "writeMessage",
      "blinkVersion",
      "cityNameRead",
      "readMessage",
      "setDataMode",
      "parsePacket",
      "isListening",
      "setBitOrder",
      "beginPacket",
      "isDirectory",
      "motorsWrite",
      "drawCompass",
      "digitalRead",
      "clearScreen",
      "serialEvent",
      "rightToLeft",
      "setTextSize",
      "leftToRight",
      "requestFrom",
      "keyReleased",
      "compassRead",
      "analogWrite",
      "interrupts",
      "WiFiServer",
      "disconnect",
      "playMelody",
      "parseFloat",
      "autoscroll",
      "getPINUsed",
      "setPINUsed",
      "setTimeout",
      "sendAnalog",
      "readSlider",
      "analogRead",
      "beginWrite",
      "createChar",
      "motorsStop",
      "keyPressed",
      "tempoWrite",
      "readButton",
      "subnetMask",
      "debugPrint",
      "macAddress",
      "writeGreen",
      "randomSeed",
      "attachGPRS",
      "readString",
      "sendString",
      "remotePort",
      "releaseAll",
      "mouseMoved",
      "background",
      "getXChange",
      "getYChange",
      "answerCall",
      "getResult",
      "voiceCall",
      "endPacket",
      "constrain",
      "getSocket",
      "writeJSON",
      "getButton",
      "available",
      "connected",
      "findUntil",
      "readBytes",
      "exitValue",
      "readGreen",
      "writeBlue",
      "startLoop",
      "IPAddress",
      "isPressed",
      "sendSysex",
      "pauseMode",
      "gatewayIP",
      "setCursor",
      "getOemKey",
      "tuneWrite",
      "noDisplay",
      "loadImage",
      "switchPIN",
      "onRequest",
      "onReceive",
      "changePIN",
      "playFile",
      "noBuffer",
      "parseInt",
      "overflow",
      "checkPIN",
      "knobRead",
      "beginTFT",
      "bitClear",
      "updateIR",
      "bitWrite",
      "position",
      "writeRGB",
      "highByte",
      "writeRed",
      "setSpeed",
      "readBlue",
      "noStroke",
      "remoteIP",
      "transfer",
      "shutdown",
      "hangCall",
      "beginSMS",
      "endWrite",
      "attached",
      "maintain",
      "noCursor",
      "checkReg",
      "checkPUK",
      "shiftOut",
      "isValid",
      "shiftIn",
      "pulseIn",
      "connect",
      "println",
      "localIP",
      "pinMode",
      "getIMEI",
      "display",
      "noBlink",
      "process",
      "getBand",
      "running",
      "beginSD",
      "drawBMP",
      "lowByte",
      "setBand",
      "release",
      "bitRead",
      "prepare",
      "pointTo",
      "readRed",
      "setMode",
      "noFill",
      "remove",
      "listen",
      "stroke",
      "detach",
      "attach",
      "noTone",
      "exists",
      "buffer",
      "height",
      "bitSet",
      "circle",
      "config",
      "cursor",
      "random",
      "IRread",
      "setDNS",
      "endSMS",
      "getKey",
      "micros",
      "millis",
      "begin",
      "print",
      "write",
      "ready",
      "flush",
      "width",
      "isPIN",
      "blink",
      "clear",
      "press",
      "mkdir",
      "rmdir",
      "close",
      "point",
      "yield",
      "image",
      "BSSID",
      "click",
      "delay",
      "read",
      "text",
      "move",
      "peek",
      "beep",
      "rect",
      "line",
      "open",
      "seek",
      "fill",
      "size",
      "turn",
      "stop",
      "home",
      "find",
      "step",
      "tone",
      "sqrt",
      "RSSI",
      "SSID",
      "end",
      "bit",
      "tan",
      "cos",
      "sin",
      "pow",
      "map",
      "abs",
      "max",
      "min",
      "get",
      "run",
      "put"
    ],
    literal: [
      "DIGITAL_MESSAGE",
      "FIRMATA_STRING",
      "ANALOG_MESSAGE",
      "REPORT_DIGITAL",
      "REPORT_ANALOG",
      "INPUT_PULLUP",
      "SET_PIN_MODE",
      "INTERNAL2V56",
      "SYSTEM_RESET",
      "LED_BUILTIN",
      "INTERNAL1V1",
      "SYSEX_START",
      "INTERNAL",
      "EXTERNAL",
      "DEFAULT",
      "OUTPUT",
      "INPUT",
      "HIGH",
      "LOW"
    ]
  }, t = _h(e), r = (
    /** @type {Record<string,any>} */
    t.keywords
  );
  return r.type = [
    ...r.type,
    ...n.type
  ], r.literal = [
    ...r.literal,
    ...n.literal
  ], r.built_in = [
    ...r.built_in,
    ...n.built_in
  ], r._hints = n._hints, t.name = "Arduino", t.aliases = ["ino"], t.supersetOf = "cpp", t;
}
function kh(e) {
  const n = e.regex, t = {}, r = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [t]
      }
      // default values
    ]
  };
  Object.assign(t, {
    className: "variable",
    variants: [
      { begin: n.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      r
    ]
  });
  const o = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, a = e.inherit(
    e.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  ), i = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, s = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      t,
      o
    ]
  };
  o.contains.push(s);
  const c = {
    match: /\\"/
  }, l = {
    className: "string",
    begin: /'/,
    end: /'/
  }, u = {
    match: /\\'/
  }, d = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      e.NUMBER_MODE,
      t
    ]
  }, p = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], f = e.SHEBANG({
    binary: `(${p.join("|")})`,
    relevance: 10
  }), g = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, _ = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ], y = [
    "true",
    "false"
  ], h = { match: /(\/[a-z._-]+)+/ }, w = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], S = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], C = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], R = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: _,
      literal: y,
      built_in: [
        ...w,
        ...S,
        // Shell modifiers
        "set",
        "shopt",
        ...C,
        ...R
      ]
    },
    contains: [
      f,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      g,
      d,
      a,
      i,
      h,
      s,
      c,
      l,
      u,
      t
    ]
  };
}
function wh(e) {
  const n = e.regex, t = e.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), r = "decltype\\(auto\\)", o = "[a-zA-Z_]\\w*::", i = "(" + r + "|" + n.optional(o) + "[a-zA-Z_]\\w*" + n.optional("<[^<>]+>") + ")", s = {
    className: "type",
    variants: [
      { begin: "\\b[a-z\\d_]*_t\\b" },
      { match: /\batomic_[a-z]{3,6}\b/ }
    ]
  }, l = {
    className: "string",
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [e.BACKSLASH_ESCAPE]
      },
      {
        begin: "(u8?|U|L)?'(" + "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)" + "|.)",
        end: "'",
        illegal: "."
      },
      e.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  }, u = {
    className: "number",
    variants: [
      { match: /\b(0b[01']+)/ },
      { match: /(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/ },
      { match: /(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/ },
      { match: /(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/ }
    ],
    relevance: 0
  }, d = {
    className: "meta",
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef elifdef elifndef include" },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      e.inherit(l, { className: "string" }),
      {
        className: "string",
        begin: /<.*?>/
      },
      t,
      e.C_BLOCK_COMMENT_MODE
    ]
  }, p = {
    className: "title",
    begin: n.optional(o) + e.IDENT_RE,
    relevance: 0
  }, f = n.optional(o) + e.IDENT_RE + "\\s*\\(", y = {
    keyword: [
      "asm",
      "auto",
      "break",
      "case",
      "continue",
      "default",
      "do",
      "else",
      "enum",
      "extern",
      "for",
      "fortran",
      "goto",
      "if",
      "inline",
      "register",
      "restrict",
      "return",
      "sizeof",
      "typeof",
      "typeof_unqual",
      "struct",
      "switch",
      "typedef",
      "union",
      "volatile",
      "while",
      "_Alignas",
      "_Alignof",
      "_Atomic",
      "_Generic",
      "_Noreturn",
      "_Static_assert",
      "_Thread_local",
      // aliases
      "alignas",
      "alignof",
      "noreturn",
      "static_assert",
      "thread_local",
      // not a C keyword but is, for all intents and purposes, treated exactly like one.
      "_Pragma"
    ],
    type: [
      "float",
      "double",
      "signed",
      "unsigned",
      "int",
      "short",
      "long",
      "char",
      "void",
      "_Bool",
      "_BitInt",
      "_Complex",
      "_Imaginary",
      "_Decimal32",
      "_Decimal64",
      "_Decimal96",
      "_Decimal128",
      "_Decimal64x",
      "_Decimal128x",
      "_Float16",
      "_Float32",
      "_Float64",
      "_Float128",
      "_Float32x",
      "_Float64x",
      "_Float128x",
      // modifiers
      "const",
      "static",
      "constexpr",
      // aliases
      "complex",
      "bool",
      "imaginary"
    ],
    literal: "true false NULL",
    // TODO: apply hinting work similar to what was done in cpp.js
    built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
  }, h = [
    d,
    s,
    t,
    e.C_BLOCK_COMMENT_MODE,
    u,
    l
  ], w = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: "new throw return else",
        end: /;/
      }
    ],
    keywords: y,
    contains: h.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: y,
        contains: h.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  }, S = {
    begin: "(" + i + "[\\*&\\s]+)+" + f,
    returnBegin: !0,
    end: /[{;=]/,
    excludeEnd: !0,
    keywords: y,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: r,
        keywords: y,
        relevance: 0
      },
      {
        begin: f,
        returnBegin: !0,
        contains: [e.inherit(p, { className: "title.function" })],
        relevance: 0
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: y,
        relevance: 0,
        contains: [
          t,
          e.C_BLOCK_COMMENT_MODE,
          l,
          u,
          s,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: y,
            relevance: 0,
            contains: [
              "self",
              t,
              e.C_BLOCK_COMMENT_MODE,
              l,
              u,
              s
            ]
          }
        ]
      },
      s,
      t,
      e.C_BLOCK_COMMENT_MODE,
      d
    ]
  };
  return {
    name: "C",
    aliases: ["h"],
    keywords: y,
    // Until differentiations are added between `c` and `cpp`, `c` will
    // not be auto-detected to avoid auto-detect conflicts between C and C++
    disableAutodetect: !0,
    illegal: "</",
    contains: [].concat(
      w,
      S,
      h,
      [
        d,
        {
          begin: e.IDENT_RE + "::",
          keywords: y
        },
        {
          className: "class",
          beginKeywords: "enum class struct union",
          end: /[{;:<>=]/,
          contains: [
            { beginKeywords: "final class struct" },
            e.TITLE_MODE
          ]
        }
      ]
    ),
    exports: {
      preprocessor: d,
      strings: l,
      keywords: y
    }
  };
}
function xh(e) {
  const n = e.regex, t = e.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), r = "decltype\\(auto\\)", o = "[a-zA-Z_]\\w*::", i = "(?!struct)(" + r + "|" + n.optional(o) + "[a-zA-Z_]\\w*" + n.optional("<[^<>]+>") + ")", s = {
    className: "type",
    begin: "\\b[a-z\\d_]*_t\\b"
  }, l = {
    className: "string",
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: "\\n",
        contains: [e.BACKSLASH_ESCAPE]
      },
      {
        begin: "(u8?|U|L)?'(" + "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)" + "|.)",
        end: "'",
        illegal: "."
      },
      e.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  }, u = {
    className: "number",
    variants: [
      // Floating-point literal.
      {
        begin: "[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"
      },
      // Integer literal.
      {
        begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"
        // Note: there are user-defined literal suffixes too, but perhaps having the custom suffix not part of the
        // literal highlight actually makes it stand out more.
      }
    ],
    relevance: 0
  }, d = {
    className: "meta",
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      e.inherit(l, { className: "string" }),
      {
        className: "string",
        begin: /<.*?>/
      },
      t,
      e.C_BLOCK_COMMENT_MODE
    ]
  }, p = {
    className: "title",
    begin: n.optional(o) + e.IDENT_RE,
    relevance: 0
  }, f = n.optional(o) + e.IDENT_RE + "\\s*\\(", g = [
    "alignas",
    "alignof",
    "and",
    "and_eq",
    "asm",
    "atomic_cancel",
    "atomic_commit",
    "atomic_noexcept",
    "auto",
    "bitand",
    "bitor",
    "break",
    "case",
    "catch",
    "class",
    "co_await",
    "co_return",
    "co_yield",
    "compl",
    "concept",
    "const_cast|10",
    "consteval",
    "constexpr",
    "constinit",
    "continue",
    "decltype",
    "default",
    "delete",
    "do",
    "dynamic_cast|10",
    "else",
    "enum",
    "explicit",
    "export",
    "extern",
    "false",
    "final",
    "for",
    "friend",
    "goto",
    "if",
    "import",
    "inline",
    "module",
    "mutable",
    "namespace",
    "new",
    "noexcept",
    "not",
    "not_eq",
    "nullptr",
    "operator",
    "or",
    "or_eq",
    "override",
    "private",
    "protected",
    "public",
    "reflexpr",
    "register",
    "reinterpret_cast|10",
    "requires",
    "return",
    "sizeof",
    "static_assert",
    "static_cast|10",
    "struct",
    "switch",
    "synchronized",
    "template",
    "this",
    "thread_local",
    "throw",
    "transaction_safe",
    "transaction_safe_dynamic",
    "true",
    "try",
    "typedef",
    "typeid",
    "typename",
    "union",
    "using",
    "virtual",
    "volatile",
    "while",
    "xor",
    "xor_eq"
  ], _ = [
    "bool",
    "char",
    "char16_t",
    "char32_t",
    "char8_t",
    "double",
    "float",
    "int",
    "long",
    "short",
    "void",
    "wchar_t",
    "unsigned",
    "signed",
    "const",
    "static"
  ], y = [
    "any",
    "auto_ptr",
    "barrier",
    "binary_semaphore",
    "bitset",
    "complex",
    "condition_variable",
    "condition_variable_any",
    "counting_semaphore",
    "deque",
    "false_type",
    "flat_map",
    "flat_set",
    "future",
    "imaginary",
    "initializer_list",
    "istringstream",
    "jthread",
    "latch",
    "lock_guard",
    "multimap",
    "multiset",
    "mutex",
    "optional",
    "ostringstream",
    "packaged_task",
    "pair",
    "promise",
    "priority_queue",
    "queue",
    "recursive_mutex",
    "recursive_timed_mutex",
    "scoped_lock",
    "set",
    "shared_future",
    "shared_lock",
    "shared_mutex",
    "shared_timed_mutex",
    "shared_ptr",
    "stack",
    "string_view",
    "stringstream",
    "timed_mutex",
    "thread",
    "true_type",
    "tuple",
    "unique_lock",
    "unique_ptr",
    "unordered_map",
    "unordered_multimap",
    "unordered_multiset",
    "unordered_set",
    "variant",
    "vector",
    "weak_ptr",
    "wstring",
    "wstring_view"
  ], h = [
    "abort",
    "abs",
    "acos",
    "apply",
    "as_const",
    "asin",
    "atan",
    "atan2",
    "calloc",
    "ceil",
    "cerr",
    "cin",
    "clog",
    "cos",
    "cosh",
    "cout",
    "declval",
    "endl",
    "exchange",
    "exit",
    "exp",
    "fabs",
    "floor",
    "fmod",
    "forward",
    "fprintf",
    "fputs",
    "free",
    "frexp",
    "fscanf",
    "future",
    "invoke",
    "isalnum",
    "isalpha",
    "iscntrl",
    "isdigit",
    "isgraph",
    "islower",
    "isprint",
    "ispunct",
    "isspace",
    "isupper",
    "isxdigit",
    "labs",
    "launder",
    "ldexp",
    "log",
    "log10",
    "make_pair",
    "make_shared",
    "make_shared_for_overwrite",
    "make_tuple",
    "make_unique",
    "malloc",
    "memchr",
    "memcmp",
    "memcpy",
    "memset",
    "modf",
    "move",
    "pow",
    "printf",
    "putchar",
    "puts",
    "realloc",
    "scanf",
    "sin",
    "sinh",
    "snprintf",
    "sprintf",
    "sqrt",
    "sscanf",
    "std",
    "stderr",
    "stdin",
    "stdout",
    "strcat",
    "strchr",
    "strcmp",
    "strcpy",
    "strcspn",
    "strlen",
    "strncat",
    "strncmp",
    "strncpy",
    "strpbrk",
    "strrchr",
    "strspn",
    "strstr",
    "swap",
    "tan",
    "tanh",
    "terminate",
    "to_underlying",
    "tolower",
    "toupper",
    "vfprintf",
    "visit",
    "vprintf",
    "vsprintf"
  ], C = {
    type: _,
    keyword: g,
    literal: [
      "NULL",
      "false",
      "nullopt",
      "nullptr",
      "true"
    ],
    built_in: ["_Pragma"],
    _type_hints: y
  }, R = {
    className: "function.dispatch",
    relevance: 0,
    keywords: {
      // Only for relevance, not highlighting.
      _hint: h
    },
    begin: n.concat(
      /\b/,
      /(?!decltype)/,
      /(?!if)/,
      /(?!for)/,
      /(?!switch)/,
      /(?!while)/,
      e.IDENT_RE,
      n.lookahead(/(<[^<>]+>|)\s*\(/)
    )
  }, k = [
    R,
    d,
    s,
    t,
    e.C_BLOCK_COMMENT_MODE,
    u,
    l
  ], U = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: "new throw return else",
        end: /;/
      }
    ],
    keywords: C,
    contains: k.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: C,
        contains: k.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  }, $ = {
    className: "function",
    begin: "(" + i + "[\\*&\\s]+)+" + f,
    returnBegin: !0,
    end: /[{;=]/,
    excludeEnd: !0,
    keywords: C,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: r,
        keywords: C,
        relevance: 0
      },
      {
        begin: f,
        returnBegin: !0,
        contains: [p],
        relevance: 0
      },
      // needed because we do not have look-behind on the below rule
      // to prevent it from grabbing the final : in a :: pair
      {
        begin: /::/,
        relevance: 0
      },
      // initializers
      {
        begin: /:/,
        endsWithParent: !0,
        contains: [
          l,
          u
        ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: C,
        relevance: 0,
        contains: [
          t,
          e.C_BLOCK_COMMENT_MODE,
          l,
          u,
          s,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: C,
            relevance: 0,
            contains: [
              "self",
              t,
              e.C_BLOCK_COMMENT_MODE,
              l,
              u,
              s
            ]
          }
        ]
      },
      s,
      t,
      e.C_BLOCK_COMMENT_MODE,
      d
    ]
  };
  return {
    name: "C++",
    aliases: [
      "cc",
      "c++",
      "h++",
      "hpp",
      "hh",
      "hxx",
      "cxx"
    ],
    keywords: C,
    illegal: "</",
    classNameAliases: { "function.dispatch": "built_in" },
    contains: [].concat(
      U,
      $,
      R,
      k,
      [
        d,
        {
          // containers: ie, `vector <int> rooms (9);`
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
          end: ">",
          keywords: C,
          contains: [
            "self",
            s
          ]
        },
        {
          begin: e.IDENT_RE + "::",
          keywords: C
        },
        {
          match: [
            // extra complexity to deal with `enum class` and `enum struct`
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    )
  };
}
function Sh(e) {
  const n = [
    "bool",
    "byte",
    "char",
    "decimal",
    "delegate",
    "double",
    "dynamic",
    "enum",
    "float",
    "int",
    "long",
    "nint",
    "nuint",
    "object",
    "sbyte",
    "short",
    "string",
    "ulong",
    "uint",
    "ushort"
  ], t = [
    "public",
    "private",
    "protected",
    "static",
    "internal",
    "protected",
    "abstract",
    "async",
    "extern",
    "override",
    "unsafe",
    "virtual",
    "new",
    "sealed",
    "partial"
  ], r = [
    "default",
    "false",
    "null",
    "true"
  ], o = [
    "abstract",
    "as",
    "base",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "do",
    "else",
    "event",
    "explicit",
    "extern",
    "finally",
    "fixed",
    "for",
    "foreach",
    "goto",
    "if",
    "implicit",
    "in",
    "interface",
    "internal",
    "is",
    "lock",
    "namespace",
    "new",
    "operator",
    "out",
    "override",
    "params",
    "private",
    "protected",
    "public",
    "readonly",
    "record",
    "ref",
    "return",
    "scoped",
    "sealed",
    "sizeof",
    "stackalloc",
    "static",
    "struct",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "unchecked",
    "unsafe",
    "using",
    "virtual",
    "void",
    "volatile",
    "while"
  ], a = [
    "add",
    "alias",
    "and",
    "ascending",
    "args",
    "async",
    "await",
    "by",
    "descending",
    "dynamic",
    "equals",
    "file",
    "from",
    "get",
    "global",
    "group",
    "init",
    "into",
    "join",
    "let",
    "nameof",
    "not",
    "notnull",
    "on",
    "or",
    "orderby",
    "partial",
    "record",
    "remove",
    "required",
    "scoped",
    "select",
    "set",
    "unmanaged",
    "value|0",
    "var",
    "when",
    "where",
    "with",
    "yield"
  ], i = {
    keyword: o.concat(a),
    built_in: n,
    literal: r
  }, s = e.inherit(e.TITLE_MODE, { begin: "[a-zA-Z](\\.?\\w)*" }), c = {
    className: "number",
    variants: [
      { begin: "\\b(0b[01']+)" },
      { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)" },
      { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
    ],
    relevance: 0
  }, l = {
    className: "string",
    begin: /"""("*)(?!")(.|\n)*?"""\1/,
    relevance: 1
  }, u = {
    className: "string",
    begin: '@"',
    end: '"',
    contains: [{ begin: '""' }]
  }, d = e.inherit(u, { illegal: /\n/ }), p = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: i
  }, f = e.inherit(p, { illegal: /\n/ }), g = {
    className: "string",
    begin: /\$"/,
    end: '"',
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      e.BACKSLASH_ESCAPE,
      f
    ]
  }, _ = {
    className: "string",
    begin: /\$@"/,
    end: '"',
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      p
    ]
  }, y = e.inherit(_, {
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      f
    ]
  });
  p.contains = [
    _,
    g,
    u,
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    c,
    e.C_BLOCK_COMMENT_MODE
  ], f.contains = [
    y,
    g,
    d,
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    c,
    e.inherit(e.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })
  ];
  const h = { variants: [
    l,
    _,
    g,
    u,
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE
  ] }, w = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out" },
      s
    ]
  }, S = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", C = {
    // prevents expressions like `@class` from incorrect flagging
    // `class` as a keyword
    begin: "@" + e.IDENT_RE,
    relevance: 0
  };
  return {
    name: "C#",
    aliases: [
      "cs",
      "c#"
    ],
    keywords: i,
    illegal: /::/,
    contains: [
      e.COMMENT(
        "///",
        "$",
        {
          returnBegin: !0,
          contains: [
            {
              className: "doctag",
              variants: [
                {
                  begin: "///",
                  relevance: 0
                },
                { begin: "<!--|-->" },
                {
                  begin: "</?",
                  end: ">"
                }
              ]
            }
          ]
        }
      ),
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: { keyword: "if else elif endif define undef warning error line region endregion pragma checksum" }
      },
      h,
      c,
      {
        beginKeywords: "class interface",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          s,
          w,
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          s,
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: "record",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          s,
          w,
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: "meta",
        begin: "^\\s*\\[(?=[\\w])",
        excludeBegin: !0,
        end: "\\]",
        excludeEnd: !0,
        contains: [
          {
            className: "string",
            begin: /"/,
            end: /"/
          }
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: "new return throw await else",
        relevance: 0
      },
      {
        className: "function",
        begin: "(" + S + "\\s+)+" + e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
        returnBegin: !0,
        end: /\s*[{;=]/,
        excludeEnd: !0,
        keywords: i,
        contains: [
          // prevents these from being highlighted `title`
          {
            beginKeywords: t.join(" "),
            relevance: 0
          },
          {
            begin: e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
            returnBegin: !0,
            contains: [
              e.TITLE_MODE,
              w
            ],
            relevance: 0
          },
          { match: /\(\)/ },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: !0,
            excludeEnd: !0,
            keywords: i,
            relevance: 0,
            contains: [
              h,
              c,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      C
    ]
  };
}
const Nh = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), Th = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], Ah = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], vh = [
  ...Th,
  ...Ah
], Ch = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), Oh = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), Ih = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), Rh = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function Mh(e) {
  const n = e.regex, t = Nh(e), r = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, o = "and or not only", a = /@-?\w[\w]*(-\w+)*/, i = "[a-zA-Z-][a-zA-Z0-9_-]*", s = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: !0,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      t.BLOCK_COMMENT,
      r,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      t.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + i,
        relevance: 0
      },
      t.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + Oh.join("|") + ")" },
          { begin: ":(:)?(" + Ih.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      t.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + Rh.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          t.BLOCK_COMMENT,
          t.HEXCOLOR,
          t.IMPORTANT,
          t.CSS_NUMBER_MODE,
          ...s,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...s,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: !0,
                excludeEnd: !0
              }
            ]
          },
          t.FUNCTION_DISPATCH
        ]
      },
      {
        begin: n.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: a
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: o,
              attribute: Ch.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...s,
              t.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + vh.join("|") + ")\\b"
      }
    ]
  };
}
function Dh(e) {
  const n = e.regex;
  return {
    name: "Diff",
    aliases: ["patch"],
    contains: [
      {
        className: "meta",
        relevance: 10,
        match: n.either(
          /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,
          /^\*\*\* +\d+,\d+ +\*\*\*\*$/,
          /^--- +\d+,\d+ +----$/
        )
      },
      {
        className: "comment",
        variants: [
          {
            begin: n.either(
              /Index: /,
              /^index/,
              /={3,}/,
              /^-{3}/,
              /^\*{3} /,
              /^\+{3}/,
              /^diff --git/
            ),
            end: /$/
          },
          { match: /^\*{15}$/ }
        ]
      },
      {
        className: "addition",
        begin: /^\+/,
        end: /$/
      },
      {
        className: "deletion",
        begin: /^-/,
        end: /$/
      },
      {
        className: "addition",
        begin: /^!/,
        end: /$/
      }
    ]
  };
}
function Lh(e) {
  const a = {
    keyword: [
      "break",
      "case",
      "chan",
      "const",
      "continue",
      "default",
      "defer",
      "else",
      "fallthrough",
      "for",
      "func",
      "go",
      "goto",
      "if",
      "import",
      "interface",
      "map",
      "package",
      "range",
      "return",
      "select",
      "struct",
      "switch",
      "type",
      "var"
    ],
    type: [
      "bool",
      "byte",
      "complex64",
      "complex128",
      "error",
      "float32",
      "float64",
      "int8",
      "int16",
      "int32",
      "int64",
      "string",
      "uint8",
      "uint16",
      "uint32",
      "uint64",
      "int",
      "uint",
      "uintptr",
      "rune"
    ],
    literal: [
      "true",
      "false",
      "iota",
      "nil"
    ],
    built_in: [
      "append",
      "cap",
      "close",
      "complex",
      "copy",
      "imag",
      "len",
      "make",
      "new",
      "panic",
      "print",
      "println",
      "real",
      "recover",
      "delete"
    ]
  };
  return {
    name: "Go",
    aliases: ["golang"],
    keywords: a,
    illegal: "</",
    contains: [
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      {
        className: "string",
        variants: [
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          {
            begin: "`",
            end: "`"
          }
        ]
      },
      {
        className: "number",
        variants: [
          {
            match: /-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/,
            // hex without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/,
            // hex with a present digit before . (making a digit afterwards optional)
            relevance: 0
          },
          {
            match: /-?\b0[oO](_?[0-7])*i?/,
            // leading 0o octal
            relevance: 0
          },
          {
            match: /-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/,
            // decimal without a present digit before . (making a digit afterwards required)
            relevance: 0
          },
          {
            match: /-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/,
            // decimal with a present digit before . (making a digit afterwards optional)
            relevance: 0
          }
        ]
      },
      {
        begin: /:=/
        // relevance booster
      },
      {
        className: "function",
        beginKeywords: "func",
        end: "\\s*(\\{|$)",
        excludeEnd: !0,
        contains: [
          e.TITLE_MODE,
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: !0,
            keywords: a,
            illegal: /["']/
          }
        ]
      }
    ]
  };
}
function Ph(e) {
  const n = e.regex, t = /[_A-Za-z][_0-9A-Za-z]*/;
  return {
    name: "GraphQL",
    aliases: ["gql"],
    case_insensitive: !0,
    disableAutodetect: !1,
    keywords: {
      keyword: [
        "query",
        "mutation",
        "subscription",
        "type",
        "input",
        "schema",
        "directive",
        "interface",
        "union",
        "scalar",
        "fragment",
        "enum",
        "on"
      ],
      literal: [
        "true",
        "false",
        "null"
      ]
    },
    contains: [
      e.HASH_COMMENT_MODE,
      e.QUOTE_STRING_MODE,
      e.NUMBER_MODE,
      {
        scope: "punctuation",
        match: /[.]{3}/,
        relevance: 0
      },
      {
        scope: "punctuation",
        begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/,
        relevance: 0
      },
      {
        scope: "variable",
        begin: /\$/,
        end: /\W/,
        excludeEnd: !0,
        relevance: 0
      },
      {
        scope: "meta",
        match: /@\w+/,
        excludeEnd: !0
      },
      {
        scope: "symbol",
        begin: n.concat(t, n.lookahead(/\s*:/)),
        relevance: 0
      }
    ],
    illegal: [
      /[;<']/,
      /BEGIN/
    ]
  };
}
function Bh(e) {
  const n = e.regex, t = {
    className: "number",
    relevance: 0,
    variants: [
      { begin: /([+-]+)?[\d]+_[\d_]+/ },
      { begin: e.NUMBER_RE }
    ]
  }, r = e.COMMENT();
  r.variants = [
    {
      begin: /;/,
      end: /$/
    },
    {
      begin: /#/,
      end: /$/
    }
  ];
  const o = {
    className: "variable",
    variants: [
      { begin: /\$[\w\d"][\w\d_]*/ },
      { begin: /\$\{(.*?)\}/ }
    ]
  }, a = {
    className: "literal",
    begin: /\bon|off|true|false|yes|no\b/
  }, i = {
    className: "string",
    contains: [e.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: "'''",
        end: "'''",
        relevance: 10
      },
      {
        begin: '"""',
        end: '"""',
        relevance: 10
      },
      {
        begin: '"',
        end: '"'
      },
      {
        begin: "'",
        end: "'"
      }
    ]
  }, s = {
    begin: /\[/,
    end: /\]/,
    contains: [
      r,
      a,
      o,
      i,
      t,
      "self"
    ],
    relevance: 0
  }, c = /[A-Za-z0-9_-]+/, l = /"(\\"|[^"])*"/, u = /'[^']*'/, d = n.either(
    c,
    l,
    u
  ), p = n.concat(
    d,
    "(\\s*\\.\\s*",
    d,
    ")*",
    n.lookahead(/\s*=\s*[^#\s]/)
  );
  return {
    name: "TOML, also INI",
    aliases: ["toml"],
    case_insensitive: !0,
    illegal: /\S/,
    contains: [
      r,
      {
        className: "section",
        begin: /\[+/,
        end: /\]+/
      },
      {
        begin: p,
        className: "attr",
        starts: {
          end: /$/,
          contains: [
            r,
            s,
            a,
            o,
            i,
            t
          ]
        }
      }
    ]
  };
}
var On = "[0-9](_*[0-9])*", dt = `\\.(${On})`, ft = "[0-9a-fA-F](_*[0-9a-fA-F])*", ro = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${On})((${dt})|\\.)?|(${dt}))[eE][+-]?(${On})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${On})((${dt})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${dt})[fFdD]?\\b` },
    { begin: `\\b(${On})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${ft})\\.?|(${ft})?\\.(${ft}))[pP][+-]?(${On})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${ft})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function Sa(e, n, t) {
  return t === -1 ? "" : e.replace(n, (r) => Sa(e, n, t - 1));
}
function Fh(e) {
  const n = e.regex, t = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", r = t + Sa("(?:<" + t + "~~~(?:\\s*,\\s*" + t + "~~~)*>)?", /~~~/g, 2), c = {
    keyword: [
      "synchronized",
      "abstract",
      "private",
      "var",
      "static",
      "if",
      "const ",
      "for",
      "while",
      "strictfp",
      "finally",
      "protected",
      "import",
      "native",
      "final",
      "void",
      "enum",
      "else",
      "break",
      "transient",
      "catch",
      "instanceof",
      "volatile",
      "case",
      "assert",
      "package",
      "default",
      "public",
      "try",
      "switch",
      "continue",
      "throws",
      "protected",
      "public",
      "private",
      "module",
      "requires",
      "exports",
      "do",
      "sealed",
      "yield",
      "permits",
      "goto",
      "when"
    ],
    literal: [
      "false",
      "true",
      "null"
    ],
    type: [
      "char",
      "boolean",
      "long",
      "float",
      "int",
      "byte",
      "short",
      "double"
    ],
    built_in: [
      "super",
      "this"
    ]
  }, l = {
    className: "meta",
    begin: "@" + t,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
        // allow nested () inside our annotation
      }
    ]
  }, u = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    keywords: c,
    relevance: 0,
    contains: [e.C_BLOCK_COMMENT_MODE],
    endsParent: !0
  };
  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: c,
    illegal: /<\/|#/,
    contains: [
      e.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [e.BACKSLASH_ESCAPE]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      {
        match: [
          /\b(?:class|interface|enum|extends|implements|new)/,
          /\s+/,
          t
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        // Exceptions for hyphenated keywords
        match: /non-sealed/,
        scope: "keyword"
      },
      {
        begin: [
          n.concat(/(?!else)/, t),
          /\s+/,
          t,
          /\s+/,
          /=(?!=)/
        ],
        className: {
          1: "type",
          3: "variable",
          5: "operator"
        }
      },
      {
        begin: [
          /record/,
          /\s+/,
          t
        ],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [
          u,
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: "new throw return else",
        relevance: 0
      },
      {
        begin: [
          "(?:" + r + "\\s+)",
          e.UNDERSCORE_IDENT_RE,
          /\s*(?=\()/
        ],
        className: { 2: "title.function" },
        keywords: c,
        contains: [
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: c,
            relevance: 0,
            contains: [
              l,
              e.APOS_STRING_MODE,
              e.QUOTE_STRING_MODE,
              ro,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      ro,
      l
    ]
  };
}
const io = "[A-Za-z$_][0-9A-Za-z$_]*", zh = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], Uh = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Na = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Ta = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Aa = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], $h = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Hh = [].concat(
  Aa,
  Na,
  Ta
);
function Gh(e) {
  const n = e.regex, t = (X, { after: fe }) => {
    const m = "</" + X[0].slice(1);
    return X.input.indexOf(m, fe) !== -1;
  }, r = io, o = {
    begin: "<>",
    end: "</>"
  }, a = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (X, fe) => {
      const m = X[0].length + X.index, ue = X.input[m];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        ue === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        ue === ","
      ) {
        fe.ignoreMatch();
        return;
      }
      ue === ">" && (t(X, { after: m }) || fe.ignoreMatch());
      let pe;
      const E = X.input.substring(m);
      if (pe = E.match(/^\s*=/)) {
        fe.ignoreMatch();
        return;
      }
      if ((pe = E.match(/^\s+extends\s+/)) && pe.index === 0) {
        fe.ignoreMatch();
        return;
      }
    }
  }, s = {
    $pattern: io,
    keyword: zh,
    literal: Uh,
    built_in: Hh,
    "variable.language": $h
  }, c = "[0-9](_?[0-9])*", l = `\\.(${c})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, p = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: s,
    contains: []
    // defined later
  }, f = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "xml"
    }
  }, g = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "css"
    }
  }, _ = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "graphql"
    }
  }, y = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      p
    ]
  }, w = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, S = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    g,
    _,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    d
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  p.contains = S.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: s,
    contains: [
      "self"
    ].concat(S)
  });
  const C = [].concat(w, p.contains), R = C.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: s,
      contains: ["self"].concat(C)
    }
  ]), k = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: s,
    contains: R
  }, U = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(r, "(", n.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, $ = {
    relevance: 0,
    match: n.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Na,
        ...Ta
      ]
    }
  }, H = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, x = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [k],
    illegal: /%/
  }, P = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function B(X) {
    return n.concat("(?!", X.join("|"), ")");
  }
  const J = {
    match: n.concat(
      /\b/,
      B([
        ...Aa,
        "super",
        "import"
      ].map((X) => `${X}\\s*\\(`)),
      r,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, D = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, v = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      k
    ]
  }, Z = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", se = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(Z)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      k
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: s,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: R, CLASS_REFERENCE: $ },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      H,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      g,
      _,
      y,
      w,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      d,
      $,
      {
        scope: "attr",
        match: r + n.lookahead(":"),
        relevance: 0
      },
      se,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          w,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: Z,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: s,
                    contains: R
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: o.begin, end: o.end },
              { match: a },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      x,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          k,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      D,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [k]
      },
      J,
      P,
      U,
      v,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Kh(e) {
  const n = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  }, t = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, r = [
    "true",
    "false",
    "null"
  ], o = {
    scope: "literal",
    beginKeywords: r.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc"],
    keywords: {
      literal: r
    },
    contains: [
      n,
      t,
      e.QUOTE_STRING_MODE,
      o,
      e.C_NUMBER_MODE,
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
var In = "[0-9](_*[0-9])*", pt = `\\.(${In})`, gt = "[0-9a-fA-F](_*[0-9a-fA-F])*", qh = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${In})((${pt})|\\.)?|(${pt}))[eE][+-]?(${In})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${In})((${pt})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${pt})[fFdD]?\\b` },
    { begin: `\\b(${In})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${gt})\\.?|(${gt})?\\.(${gt}))[pP][+-]?(${In})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${gt})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function Wh(e) {
  const n = {
    keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
    built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
    literal: "true false null"
  }, t = {
    className: "keyword",
    begin: /\b(break|continue|return|this)\b/,
    starts: { contains: [
      {
        className: "symbol",
        begin: /@\w+/
      }
    ] }
  }, r = {
    className: "symbol",
    begin: e.UNDERSCORE_IDENT_RE + "@"
  }, o = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    contains: [e.C_NUMBER_MODE]
  }, a = {
    className: "variable",
    begin: "\\$" + e.UNDERSCORE_IDENT_RE
  }, i = {
    className: "string",
    variants: [
      {
        begin: '"""',
        end: '"""(?=[^"])',
        contains: [
          a,
          o
        ]
      },
      // Can't use built-in modes easily, as we want to use STRING in the meta
      // context as 'meta-string' and there's no syntax to remove explicitly set
      // classNames in built-in modes.
      {
        begin: "'",
        end: "'",
        illegal: /\n/,
        contains: [e.BACKSLASH_ESCAPE]
      },
      {
        begin: '"',
        end: '"',
        illegal: /\n/,
        contains: [
          e.BACKSLASH_ESCAPE,
          a,
          o
        ]
      }
    ]
  };
  o.contains.push(i);
  const s = {
    className: "meta",
    begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
  }, c = {
    className: "meta",
    begin: "@" + e.UNDERSCORE_IDENT_RE,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          e.inherit(i, { className: "string" }),
          "self"
        ]
      }
    ]
  }, l = qh, u = e.COMMENT(
    "/\\*",
    "\\*/",
    { contains: [e.C_BLOCK_COMMENT_MODE] }
  ), d = { variants: [
    {
      className: "type",
      begin: e.UNDERSCORE_IDENT_RE
    },
    {
      begin: /\(/,
      end: /\)/,
      contains: []
      // defined later
    }
  ] }, p = d;
  return p.variants[1].contains = [d], d.variants[1].contains = [p], {
    name: "Kotlin",
    aliases: [
      "kt",
      "kts"
    ],
    keywords: n,
    contains: [
      e.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      ),
      e.C_LINE_COMMENT_MODE,
      u,
      t,
      r,
      s,
      c,
      {
        className: "function",
        beginKeywords: "fun",
        end: "[(]|$",
        returnBegin: !0,
        excludeEnd: !0,
        keywords: n,
        relevance: 5,
        contains: [
          {
            begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: !0,
            relevance: 0,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "type",
            begin: /</,
            end: />/,
            keywords: "reified",
            relevance: 0
          },
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: !0,
            keywords: n,
            relevance: 0,
            contains: [
              {
                begin: /:/,
                end: /[=,\/]/,
                endsWithParent: !0,
                contains: [
                  d,
                  e.C_LINE_COMMENT_MODE,
                  u
                ],
                relevance: 0
              },
              e.C_LINE_COMMENT_MODE,
              u,
              s,
              c,
              i,
              e.C_NUMBER_MODE
            ]
          },
          u
        ]
      },
      {
        begin: [
          /class|interface|trait/,
          /\s+/,
          e.UNDERSCORE_IDENT_RE
        ],
        beginScope: {
          3: "title.class"
        },
        keywords: "class interface trait",
        end: /[:\{(]|$/,
        excludeEnd: !0,
        illegal: "extends implements",
        contains: [
          { beginKeywords: "public protected internal private constructor" },
          e.UNDERSCORE_TITLE_MODE,
          {
            className: "type",
            begin: /</,
            end: />/,
            excludeBegin: !0,
            excludeEnd: !0,
            relevance: 0
          },
          {
            className: "type",
            begin: /[,:]\s*/,
            end: /[<\(,){\s]|$/,
            excludeBegin: !0,
            returnEnd: !0
          },
          s,
          c
        ]
      },
      i,
      {
        className: "meta",
        begin: "^#!/usr/bin/env",
        end: "$",
        illegal: `
`
      },
      l
    ]
  };
}
const Vh = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), Yh = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], Zh = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], Xh = [
  ...Yh,
  ...Zh
], Qh = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), va = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), Ca = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), jh = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse(), Jh = va.concat(Ca).sort().reverse();
function em(e) {
  const n = Vh(e), t = Jh, r = "and or not only", o = "[\\w-]+", a = "(" + o + "|@\\{" + o + "\\})", i = [], s = [], c = function(S) {
    return {
      // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
      className: "string",
      begin: "~?" + S + ".*?" + S
    };
  }, l = function(S, C, R) {
    return {
      className: S,
      begin: C,
      relevance: R
    };
  }, u = {
    $pattern: /[a-z-]+/,
    keyword: r,
    attribute: Qh.join(" ")
  }, d = {
    // used only to properly balance nested parens inside mixin call, def. arg list
    begin: "\\(",
    end: "\\)",
    contains: s,
    keywords: u,
    relevance: 0
  };
  s.push(
    e.C_LINE_COMMENT_MODE,
    e.C_BLOCK_COMMENT_MODE,
    c("'"),
    c('"'),
    n.CSS_NUMBER_MODE,
    // fixme: it does not include dot for numbers like .5em :(
    {
      begin: "(url|data-uri)\\(",
      starts: {
        className: "string",
        end: "[\\)\\n]",
        excludeEnd: !0
      }
    },
    n.HEXCOLOR,
    d,
    l("variable", "@@?" + o, 10),
    l("variable", "@\\{" + o + "\\}"),
    l("built_in", "~?`[^`]*?`"),
    // inline javascript (or whatever host language) *multiline* string
    {
      // @media features (it’s here to not duplicate things in AT_RULE_MODE with extra PARENS_MODE overriding):
      className: "attribute",
      begin: o + "\\s*:",
      end: ":",
      returnBegin: !0,
      excludeEnd: !0
    },
    n.IMPORTANT,
    { beginKeywords: "and not" },
    n.FUNCTION_DISPATCH
  );
  const p = s.concat({
    begin: /\{/,
    end: /\}/,
    contains: i
  }), f = {
    beginKeywords: "when",
    endsWithParent: !0,
    contains: [{ beginKeywords: "and not" }].concat(s)
    // using this form to override VALUE’s 'function' match
  }, g = {
    begin: a + "\\s*:",
    returnBegin: !0,
    end: /[;}]/,
    relevance: 0,
    contains: [
      { begin: /-(webkit|moz|ms|o)-/ },
      n.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + jh.join("|") + ")\\b",
        end: /(?=:)/,
        starts: {
          endsWithParent: !0,
          illegal: "[<=$]",
          relevance: 0,
          contains: s
        }
      }
    ]
  }, _ = {
    className: "keyword",
    begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
    starts: {
      end: "[;{}]",
      keywords: u,
      returnEnd: !0,
      contains: s,
      relevance: 0
    }
  }, y = {
    className: "variable",
    variants: [
      // using more strict pattern for higher relevance to increase chances of Less detection.
      // this is *the only* Less specific statement used in most of the sources, so...
      // (we’ll still often loose to the css-parser unless there's '//' comment,
      // simply because 1 variable just can't beat 99 properties :)
      {
        begin: "@" + o + "\\s*:",
        relevance: 15
      },
      { begin: "@" + o }
    ],
    starts: {
      end: "[;}]",
      returnEnd: !0,
      contains: p
    }
  }, h = {
    // first parse unambiguous selectors (i.e. those not starting with tag)
    // then fall into the scary lookahead-discriminator variant.
    // this mode also handles mixin definitions and calls
    variants: [
      {
        begin: "[\\.#:&\\[>]",
        end: "[;{}]"
        // mixin calls end with ';'
      },
      {
        begin: a,
        end: /\{/
      }
    ],
    returnBegin: !0,
    returnEnd: !0,
    illegal: `[<='$"]`,
    relevance: 0,
    contains: [
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      f,
      l("keyword", "all\\b"),
      l("variable", "@\\{" + o + "\\}"),
      // otherwise it’s identified as tag
      {
        begin: "\\b(" + Xh.join("|") + ")\\b",
        className: "selector-tag"
      },
      n.CSS_NUMBER_MODE,
      l("selector-tag", a, 0),
      l("selector-id", "#" + a),
      l("selector-class", "\\." + a, 0),
      l("selector-tag", "&", 0),
      n.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        begin: ":(" + va.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + Ca.join("|") + ")"
      },
      {
        begin: /\(/,
        end: /\)/,
        relevance: 0,
        contains: p
      },
      // argument list of parametric mixins
      { begin: "!important" },
      // eat !important after mixin call or it will be colored as tag
      n.FUNCTION_DISPATCH
    ]
  }, w = {
    begin: o + `:(:)?(${t.join("|")})`,
    returnBegin: !0,
    contains: [h]
  };
  return i.push(
    e.C_LINE_COMMENT_MODE,
    e.C_BLOCK_COMMENT_MODE,
    _,
    y,
    w,
    g,
    h,
    f,
    n.FUNCTION_DISPATCH
  ), {
    name: "Less",
    case_insensitive: !0,
    illegal: `[=>'/<($"]`,
    contains: i
  };
}
function nm(e) {
  const n = "\\[=*\\[", t = "\\]=*\\]", r = {
    begin: n,
    end: t,
    contains: ["self"]
  }, o = [
    e.COMMENT("--(?!" + n + ")", "$"),
    e.COMMENT(
      "--" + n,
      t,
      {
        contains: [r],
        relevance: 10
      }
    )
  ];
  return {
    name: "Lua",
    aliases: ["pluto"],
    keywords: {
      $pattern: e.UNDERSCORE_IDENT_RE,
      literal: "true false nil",
      keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
      built_in: (
        // Metatags and globals:
        "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
      )
    },
    contains: o.concat([
      {
        className: "function",
        beginKeywords: "function",
        end: "\\)",
        contains: [
          e.inherit(e.TITLE_MODE, { begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*" }),
          {
            className: "params",
            begin: "\\(",
            endsWithParent: !0,
            contains: o
          }
        ].concat(o)
      },
      e.C_NUMBER_MODE,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      {
        className: "string",
        begin: n,
        end: t,
        contains: [r],
        relevance: 5
      }
    ])
  };
}
function tm(e) {
  const n = {
    className: "variable",
    variants: [
      {
        begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
        contains: [e.BACKSLASH_ESCAPE]
      },
      { begin: /\$[@%<?\^\+\*]/ }
    ]
  }, t = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      n
    ]
  }, r = {
    className: "variable",
    begin: /\$\([\w-]+\s/,
    end: /\)/,
    keywords: { built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value" },
    contains: [
      n,
      t
      // Added QUOTE_STRING as they can be a part of functions
    ]
  }, o = { begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" }, a = {
    className: "meta",
    begin: /^\.PHONY:/,
    end: /$/,
    keywords: {
      $pattern: /[\.\w]+/,
      keyword: ".PHONY"
    }
  }, i = {
    className: "section",
    begin: /^[^\s]+:/,
    end: /$/,
    contains: [n]
  };
  return {
    name: "Makefile",
    aliases: [
      "mk",
      "mak",
      "make"
    ],
    keywords: {
      $pattern: /[\w-]+/,
      keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
    },
    contains: [
      e.HASH_COMMENT_MODE,
      n,
      t,
      r,
      o,
      a,
      i
    ]
  };
}
function rm(e) {
  const n = e.regex, t = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, r = {
    begin: "^[-\\*]{3,}",
    end: "$"
  }, o = {
    className: "code",
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" },
      { begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*" },
      // needed to allow markdown as a sublanguage to work
      {
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        begin: "~~~",
        end: "~~~+[ ]*$"
      },
      { begin: "`.+?`" },
      {
        begin: "(?=^( {4}|\\t))",
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }
        ],
        relevance: 0
      }
    ]
  }, a = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: !0
  }, i = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: !0,
    contains: [
      {
        className: "symbol",
        begin: /\[/,
        end: /\]/,
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "link",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: !0
      }
    ]
  }, s = /[A-Za-z][A-Za-z0-9+.-]*/, c = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: n.concat(/\[.+?\]\(/, s, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: !0,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/
      },
      {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: !0,
        returnEnd: !0
      },
      {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: !0,
        excludeEnd: !0
      }
    ]
  }, l = {
    className: "strong",
    contains: [],
    // defined later
    variants: [
      {
        begin: /_{2}(?!\s)/,
        end: /_{2}/
      },
      {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/
      }
    ]
  }, u = {
    className: "emphasis",
    contains: [],
    // defined later
    variants: [
      {
        begin: /\*(?![*\s])/,
        end: /\*/
      },
      {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0
      }
    ]
  }, d = e.inherit(l, { contains: [] }), p = e.inherit(u, { contains: [] });
  l.contains.push(p), u.contains.push(d);
  let f = [
    t,
    c
  ];
  return [
    l,
    u,
    d,
    p
  ].forEach((h) => {
    h.contains = h.contains.concat(f);
  }), f = f.concat(l, u), {
    name: "Markdown",
    aliases: [
      "md",
      "mkdown",
      "mkd"
    ],
    contains: [
      {
        className: "section",
        variants: [
          {
            begin: "^#{1,6}",
            end: "$",
            contains: f
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              { begin: "^[=-]*$" },
              {
                begin: "^",
                end: "\\n",
                contains: f
              }
            ]
          }
        ]
      },
      t,
      a,
      l,
      u,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: f,
        end: "$"
      },
      o,
      r,
      c,
      i,
      {
        //https://spec.commonmark.org/0.31.2/#entity-references
        scope: "literal",
        match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
      }
    ]
  };
}
function im(e) {
  const n = {
    className: "built_in",
    begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
  }, t = /[a-zA-Z@][a-zA-Z0-9_]*/, s = {
    "variable.language": [
      "this",
      "super"
    ],
    $pattern: t,
    keyword: [
      "while",
      "export",
      "sizeof",
      "typedef",
      "const",
      "struct",
      "for",
      "union",
      "volatile",
      "static",
      "mutable",
      "if",
      "do",
      "return",
      "goto",
      "enum",
      "else",
      "break",
      "extern",
      "asm",
      "case",
      "default",
      "register",
      "explicit",
      "typename",
      "switch",
      "continue",
      "inline",
      "readonly",
      "assign",
      "readwrite",
      "self",
      "@synchronized",
      "id",
      "typeof",
      "nonatomic",
      "IBOutlet",
      "IBAction",
      "strong",
      "weak",
      "copy",
      "in",
      "out",
      "inout",
      "bycopy",
      "byref",
      "oneway",
      "__strong",
      "__weak",
      "__block",
      "__autoreleasing",
      "@private",
      "@protected",
      "@public",
      "@try",
      "@property",
      "@end",
      "@throw",
      "@catch",
      "@finally",
      "@autoreleasepool",
      "@synthesize",
      "@dynamic",
      "@selector",
      "@optional",
      "@required",
      "@encode",
      "@package",
      "@import",
      "@defs",
      "@compatibility_alias",
      "__bridge",
      "__bridge_transfer",
      "__bridge_retained",
      "__bridge_retain",
      "__covariant",
      "__contravariant",
      "__kindof",
      "_Nonnull",
      "_Nullable",
      "_Null_unspecified",
      "__FUNCTION__",
      "__PRETTY_FUNCTION__",
      "__attribute__",
      "getter",
      "setter",
      "retain",
      "unsafe_unretained",
      "nonnull",
      "nullable",
      "null_unspecified",
      "null_resettable",
      "class",
      "instancetype",
      "NS_DESIGNATED_INITIALIZER",
      "NS_UNAVAILABLE",
      "NS_REQUIRES_SUPER",
      "NS_RETURNS_INNER_POINTER",
      "NS_INLINE",
      "NS_AVAILABLE",
      "NS_DEPRECATED",
      "NS_ENUM",
      "NS_OPTIONS",
      "NS_SWIFT_UNAVAILABLE",
      "NS_ASSUME_NONNULL_BEGIN",
      "NS_ASSUME_NONNULL_END",
      "NS_REFINED_FOR_SWIFT",
      "NS_SWIFT_NAME",
      "NS_SWIFT_NOTHROW",
      "NS_DURING",
      "NS_HANDLER",
      "NS_ENDHANDLER",
      "NS_VALUERETURN",
      "NS_VOIDRETURN"
    ],
    literal: [
      "false",
      "true",
      "FALSE",
      "TRUE",
      "nil",
      "YES",
      "NO",
      "NULL"
    ],
    built_in: [
      "dispatch_once_t",
      "dispatch_queue_t",
      "dispatch_sync",
      "dispatch_async",
      "dispatch_once"
    ],
    type: [
      "int",
      "float",
      "char",
      "unsigned",
      "signed",
      "short",
      "long",
      "double",
      "wchar_t",
      "unichar",
      "void",
      "bool",
      "BOOL",
      "id|0",
      "_Bool"
    ]
  }, c = {
    $pattern: t,
    keyword: [
      "@interface",
      "@class",
      "@protocol",
      "@implementation"
    ]
  };
  return {
    name: "Objective-C",
    aliases: [
      "mm",
      "objc",
      "obj-c",
      "obj-c++",
      "objective-c++"
    ],
    keywords: s,
    illegal: "</",
    contains: [
      n,
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      e.C_NUMBER_MODE,
      e.QUOTE_STRING_MODE,
      e.APOS_STRING_MODE,
      {
        className: "string",
        variants: [
          {
            begin: '@"',
            end: '"',
            illegal: "\\n",
            contains: [e.BACKSLASH_ESCAPE]
          }
        ]
      },
      {
        className: "meta",
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: { keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include" },
        contains: [
          {
            begin: /\\\n/,
            relevance: 0
          },
          e.inherit(e.QUOTE_STRING_MODE, { className: "string" }),
          {
            className: "string",
            begin: /<.*?>/,
            end: /$/,
            illegal: "\\n"
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: "class",
        begin: "(" + c.keyword.join("|") + ")\\b",
        end: /(\{|$)/,
        excludeEnd: !0,
        keywords: c,
        contains: [e.UNDERSCORE_TITLE_MODE]
      },
      {
        begin: "\\." + e.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };
}
function om(e) {
  const n = e.regex, t = [
    "abs",
    "accept",
    "alarm",
    "and",
    "atan2",
    "bind",
    "binmode",
    "bless",
    "break",
    "caller",
    "chdir",
    "chmod",
    "chomp",
    "chop",
    "chown",
    "chr",
    "chroot",
    "class",
    "close",
    "closedir",
    "connect",
    "continue",
    "cos",
    "crypt",
    "dbmclose",
    "dbmopen",
    "defined",
    "delete",
    "die",
    "do",
    "dump",
    "each",
    "else",
    "elsif",
    "endgrent",
    "endhostent",
    "endnetent",
    "endprotoent",
    "endpwent",
    "endservent",
    "eof",
    "eval",
    "exec",
    "exists",
    "exit",
    "exp",
    "fcntl",
    "field",
    "fileno",
    "flock",
    "for",
    "foreach",
    "fork",
    "format",
    "formline",
    "getc",
    "getgrent",
    "getgrgid",
    "getgrnam",
    "gethostbyaddr",
    "gethostbyname",
    "gethostent",
    "getlogin",
    "getnetbyaddr",
    "getnetbyname",
    "getnetent",
    "getpeername",
    "getpgrp",
    "getpriority",
    "getprotobyname",
    "getprotobynumber",
    "getprotoent",
    "getpwent",
    "getpwnam",
    "getpwuid",
    "getservbyname",
    "getservbyport",
    "getservent",
    "getsockname",
    "getsockopt",
    "given",
    "glob",
    "gmtime",
    "goto",
    "grep",
    "gt",
    "hex",
    "if",
    "index",
    "int",
    "ioctl",
    "join",
    "keys",
    "kill",
    "last",
    "lc",
    "lcfirst",
    "length",
    "link",
    "listen",
    "local",
    "localtime",
    "log",
    "lstat",
    "lt",
    "ma",
    "map",
    "method",
    "mkdir",
    "msgctl",
    "msgget",
    "msgrcv",
    "msgsnd",
    "my",
    "ne",
    "next",
    "no",
    "not",
    "oct",
    "open",
    "opendir",
    "or",
    "ord",
    "our",
    "pack",
    "package",
    "pipe",
    "pop",
    "pos",
    "print",
    "printf",
    "prototype",
    "push",
    "q|0",
    "qq",
    "quotemeta",
    "qw",
    "qx",
    "rand",
    "read",
    "readdir",
    "readline",
    "readlink",
    "readpipe",
    "recv",
    "redo",
    "ref",
    "rename",
    "require",
    "reset",
    "return",
    "reverse",
    "rewinddir",
    "rindex",
    "rmdir",
    "say",
    "scalar",
    "seek",
    "seekdir",
    "select",
    "semctl",
    "semget",
    "semop",
    "send",
    "setgrent",
    "sethostent",
    "setnetent",
    "setpgrp",
    "setpriority",
    "setprotoent",
    "setpwent",
    "setservent",
    "setsockopt",
    "shift",
    "shmctl",
    "shmget",
    "shmread",
    "shmwrite",
    "shutdown",
    "sin",
    "sleep",
    "socket",
    "socketpair",
    "sort",
    "splice",
    "split",
    "sprintf",
    "sqrt",
    "srand",
    "stat",
    "state",
    "study",
    "sub",
    "substr",
    "symlink",
    "syscall",
    "sysopen",
    "sysread",
    "sysseek",
    "system",
    "syswrite",
    "tell",
    "telldir",
    "tie",
    "tied",
    "time",
    "times",
    "tr",
    "truncate",
    "uc",
    "ucfirst",
    "umask",
    "undef",
    "unless",
    "unlink",
    "unpack",
    "unshift",
    "untie",
    "until",
    "use",
    "utime",
    "values",
    "vec",
    "wait",
    "waitpid",
    "wantarray",
    "warn",
    "when",
    "while",
    "write",
    "x|0",
    "xor",
    "y|0"
  ], r = /[dualxmsipngr]{0,12}/, o = {
    $pattern: /[\w.]+/,
    keyword: t.join(" ")
  }, a = {
    className: "subst",
    begin: "[$@]\\{",
    end: "\\}",
    keywords: o
  }, i = {
    begin: /->\{/,
    end: /\}/
    // contains defined later
  }, s = {
    scope: "attr",
    match: /\s+:\s*\w+(\s*\(.*?\))?/
  }, c = {
    scope: "variable",
    variants: [
      { begin: /\$\d/ },
      {
        begin: n.concat(
          /[$%@](?!")(\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,
          // negative look-ahead tries to avoid matching patterns that are not
          // Perl at all like $ident$, @ident@, etc.
          "(?![A-Za-z])(?![@$%])"
        )
      },
      {
        // Only $= is a special Perl variable and one can't declare @= or %=.
        begin: /[$%@](?!")[^\s\w{=]|\$=/,
        relevance: 0
      }
    ],
    contains: [s]
  }, l = {
    className: "number",
    variants: [
      // decimal numbers:
      // include the case where a number starts with a dot (eg. .9), and
      // the leading 0? avoids mixing the first and second match on 0.x cases
      { match: /0?\.[0-9][0-9_]+\b/ },
      // include the special versioned number (eg. v5.38)
      { match: /\bv?(0|[1-9][0-9_]*(\.[0-9_]+)?|[1-9][0-9_]*)\b/ },
      // non-decimal numbers:
      { match: /\b0[0-7][0-7_]*\b/ },
      { match: /\b0x[0-9a-fA-F][0-9a-fA-F_]*\b/ },
      { match: /\b0b[0-1][0-1_]*\b/ }
    ],
    relevance: 0
  }, u = [
    e.BACKSLASH_ESCAPE,
    a,
    c
  ], d = [
    /!/,
    /\//,
    /\|/,
    /\?/,
    /'/,
    /"/,
    // valid but infrequent and weird
    /#/
    // valid but infrequent and weird
  ], p = (_, y, h = "\\1") => {
    const w = h === "\\1" ? h : n.concat(h, y);
    return n.concat(
      n.concat("(?:", _, ")"),
      y,
      /(?:\\.|[^\\\/])*?/,
      w,
      /(?:\\.|[^\\\/])*?/,
      h,
      r
    );
  }, f = (_, y, h) => n.concat(
    n.concat("(?:", _, ")"),
    y,
    /(?:\\.|[^\\\/])*?/,
    h,
    r
  ), g = [
    c,
    e.HASH_COMMENT_MODE,
    e.COMMENT(
      /^=\w/,
      /=cut/,
      { endsWithParent: !0 }
    ),
    i,
    {
      className: "string",
      contains: u,
      variants: [
        {
          begin: "q[qwxr]?\\s*\\(",
          end: "\\)",
          relevance: 5
        },
        {
          begin: "q[qwxr]?\\s*\\[",
          end: "\\]",
          relevance: 5
        },
        {
          begin: "q[qwxr]?\\s*\\{",
          end: "\\}",
          relevance: 5
        },
        {
          begin: "q[qwxr]?\\s*\\|",
          end: "\\|",
          relevance: 5
        },
        {
          begin: "q[qwxr]?\\s*<",
          end: ">",
          relevance: 5
        },
        {
          begin: "qw\\s+q",
          end: "q",
          relevance: 5
        },
        {
          begin: "'",
          end: "'",
          contains: [e.BACKSLASH_ESCAPE]
        },
        {
          begin: '"',
          end: '"'
        },
        {
          begin: "`",
          end: "`",
          contains: [e.BACKSLASH_ESCAPE]
        },
        {
          begin: /\{\w+\}/,
          relevance: 0
        },
        {
          begin: "-?\\w+\\s*=>",
          relevance: 0
        }
      ]
    },
    l,
    {
      // regexp container
      begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
      keywords: "split return print reverse grep",
      relevance: 0,
      contains: [
        e.HASH_COMMENT_MODE,
        {
          className: "regexp",
          variants: [
            // allow matching common delimiters
            { begin: p("s|tr|y", n.either(...d, { capture: !0 })) },
            // and then paired delmis
            { begin: p("s|tr|y", "\\(", "\\)") },
            { begin: p("s|tr|y", "\\[", "\\]") },
            { begin: p("s|tr|y", "\\{", "\\}") }
          ],
          relevance: 2
        },
        {
          className: "regexp",
          variants: [
            {
              // could be a comment in many languages so do not count
              // as relevant
              begin: /(m|qr)\/\//,
              relevance: 0
            },
            // prefix is optional with /regex/
            { begin: f("(?:m|qr)?", /\//, /\//) },
            // allow matching common delimiters
            { begin: f("m|qr", n.either(...d, { capture: !0 }), /\1/) },
            // allow common paired delmins
            { begin: f("m|qr", /\(/, /\)/) },
            { begin: f("m|qr", /\[/, /\]/) },
            { begin: f("m|qr", /\{/, /\}/) }
          ]
        }
      ]
    },
    {
      className: "function",
      beginKeywords: "sub method",
      end: "(\\s*\\(.*?\\))?[;{]",
      excludeEnd: !0,
      relevance: 5,
      contains: [e.TITLE_MODE, s]
    },
    {
      className: "class",
      beginKeywords: "class",
      end: "[;{]",
      excludeEnd: !0,
      relevance: 5,
      contains: [e.TITLE_MODE, s, l]
    },
    {
      begin: "-\\w\\b",
      relevance: 0
    },
    {
      begin: "^__DATA__$",
      end: "^__END__$",
      subLanguage: "mojolicious",
      contains: [
        {
          begin: "^@@.*",
          end: "$",
          className: "comment"
        }
      ]
    }
  ];
  return a.contains = g, i.contains = g, {
    name: "Perl",
    aliases: [
      "pl",
      "pm"
    ],
    keywords: o,
    contains: g
  };
}
function am(e) {
  const n = e.regex, t = /(?![A-Za-z0-9])(?![$])/, r = n.concat(
    /[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,
    t
  ), o = n.concat(
    /(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,
    t
  ), a = n.concat(
    /[A-Z]+/,
    t
  ), i = {
    scope: "variable",
    match: "\\$+" + r
  }, s = {
    scope: "meta",
    variants: [
      { begin: /<\?php/, relevance: 10 },
      // boost for obvious PHP
      { begin: /<\?=/ },
      // less relevant per PSR-1 which says not to use short-tags
      { begin: /<\?/, relevance: 0.1 },
      { begin: /\?>/ }
      // end php tag
    ]
  }, c = {
    scope: "subst",
    variants: [
      { begin: /\$\w+/ },
      {
        begin: /\{\$/,
        end: /\}/
      }
    ]
  }, l = e.inherit(e.APOS_STRING_MODE, { illegal: null }), u = e.inherit(e.QUOTE_STRING_MODE, {
    illegal: null,
    contains: e.QUOTE_STRING_MODE.contains.concat(c)
  }), d = {
    begin: /<<<[ \t]*(?:(\w+)|"(\w+)")\n/,
    end: /[ \t]*(\w+)\b/,
    contains: e.QUOTE_STRING_MODE.contains.concat(c),
    "on:begin": (D, v) => {
      v.data._beginMatch = D[1] || D[2];
    },
    "on:end": (D, v) => {
      v.data._beginMatch !== D[1] && v.ignoreMatch();
    }
  }, p = e.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*'(\w+)'\n/,
    end: /[ \t]*(\w+)\b/
  }), f = `[ 	
]`, g = {
    scope: "string",
    variants: [
      u,
      l,
      d,
      p
    ]
  }, _ = {
    scope: "number",
    variants: [
      { begin: "\\b0[bB][01]+(?:_[01]+)*\\b" },
      // Binary w/ underscore support
      { begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b" },
      // Octals w/ underscore support
      { begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b" },
      // Hex w/ underscore support
      // Decimals w/ underscore support, with optional fragments and scientific exponent (e) suffix.
      { begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?" }
    ],
    relevance: 0
  }, y = [
    "false",
    "null",
    "true"
  ], h = [
    // Magic constants:
    // <https://www.php.net/manual/en/language.constants.predefined.php>
    "__CLASS__",
    "__DIR__",
    "__FILE__",
    "__FUNCTION__",
    "__COMPILER_HALT_OFFSET__",
    "__LINE__",
    "__METHOD__",
    "__NAMESPACE__",
    "__TRAIT__",
    // Function that look like language construct or language construct that look like function:
    // List of keywords that may not require parenthesis
    "die",
    "echo",
    "exit",
    "include",
    "include_once",
    "print",
    "require",
    "require_once",
    // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
    // Other keywords:
    // <https://www.php.net/manual/en/reserved.php>
    // <https://www.php.net/manual/en/language.types.type-juggling.php>
    "array",
    "abstract",
    "and",
    "as",
    "binary",
    "bool",
    "boolean",
    "break",
    "callable",
    "case",
    "catch",
    "class",
    "clone",
    "const",
    "continue",
    "declare",
    "default",
    "do",
    "double",
    "else",
    "elseif",
    "empty",
    "enddeclare",
    "endfor",
    "endforeach",
    "endif",
    "endswitch",
    "endwhile",
    "enum",
    "eval",
    "extends",
    "final",
    "finally",
    "float",
    "for",
    "foreach",
    "from",
    "global",
    "goto",
    "if",
    "implements",
    "instanceof",
    "insteadof",
    "int",
    "integer",
    "interface",
    "isset",
    "iterable",
    "list",
    "match|0",
    "mixed",
    "new",
    "never",
    "object",
    "or",
    "private",
    "protected",
    "public",
    "readonly",
    "real",
    "return",
    "string",
    "switch",
    "throw",
    "trait",
    "try",
    "unset",
    "use",
    "var",
    "void",
    "while",
    "xor",
    "yield"
  ], w = [
    // Standard PHP library:
    // <https://www.php.net/manual/en/book.spl.php>
    "Error|0",
    "AppendIterator",
    "ArgumentCountError",
    "ArithmeticError",
    "ArrayIterator",
    "ArrayObject",
    "AssertionError",
    "BadFunctionCallException",
    "BadMethodCallException",
    "CachingIterator",
    "CallbackFilterIterator",
    "CompileError",
    "Countable",
    "DirectoryIterator",
    "DivisionByZeroError",
    "DomainException",
    "EmptyIterator",
    "ErrorException",
    "Exception",
    "FilesystemIterator",
    "FilterIterator",
    "GlobIterator",
    "InfiniteIterator",
    "InvalidArgumentException",
    "IteratorIterator",
    "LengthException",
    "LimitIterator",
    "LogicException",
    "MultipleIterator",
    "NoRewindIterator",
    "OutOfBoundsException",
    "OutOfRangeException",
    "OuterIterator",
    "OverflowException",
    "ParentIterator",
    "ParseError",
    "RangeException",
    "RecursiveArrayIterator",
    "RecursiveCachingIterator",
    "RecursiveCallbackFilterIterator",
    "RecursiveDirectoryIterator",
    "RecursiveFilterIterator",
    "RecursiveIterator",
    "RecursiveIteratorIterator",
    "RecursiveRegexIterator",
    "RecursiveTreeIterator",
    "RegexIterator",
    "RuntimeException",
    "SeekableIterator",
    "SplDoublyLinkedList",
    "SplFileInfo",
    "SplFileObject",
    "SplFixedArray",
    "SplHeap",
    "SplMaxHeap",
    "SplMinHeap",
    "SplObjectStorage",
    "SplObserver",
    "SplPriorityQueue",
    "SplQueue",
    "SplStack",
    "SplSubject",
    "SplTempFileObject",
    "TypeError",
    "UnderflowException",
    "UnexpectedValueException",
    "UnhandledMatchError",
    // Reserved interfaces:
    // <https://www.php.net/manual/en/reserved.interfaces.php>
    "ArrayAccess",
    "BackedEnum",
    "Closure",
    "Fiber",
    "Generator",
    "Iterator",
    "IteratorAggregate",
    "Serializable",
    "Stringable",
    "Throwable",
    "Traversable",
    "UnitEnum",
    "WeakReference",
    "WeakMap",
    // Reserved classes:
    // <https://www.php.net/manual/en/reserved.classes.php>
    "Directory",
    "__PHP_Incomplete_Class",
    "parent",
    "php_user_filter",
    "self",
    "static",
    "stdClass"
  ], C = {
    keyword: h,
    literal: ((D) => {
      const v = [];
      return D.forEach((Z) => {
        v.push(Z), Z.toLowerCase() === Z ? v.push(Z.toUpperCase()) : v.push(Z.toLowerCase());
      }), v;
    })(y),
    built_in: w
  }, R = (D) => D.map((v) => v.replace(/\|\d+$/, "")), k = { variants: [
    {
      match: [
        /new/,
        n.concat(f, "+"),
        // to prevent built ins from being confused as the class constructor call
        n.concat("(?!", R(w).join("\\b|"), "\\b)"),
        o
      ],
      scope: {
        1: "keyword",
        4: "title.class"
      }
    }
  ] }, U = n.concat(r, "\\b(?!\\()"), $ = { variants: [
    {
      match: [
        n.concat(
          /::/,
          n.lookahead(/(?!class\b)/)
        ),
        U
      ],
      scope: { 2: "variable.constant" }
    },
    {
      match: [
        /::/,
        /class/
      ],
      scope: { 2: "variable.language" }
    },
    {
      match: [
        o,
        n.concat(
          /::/,
          n.lookahead(/(?!class\b)/)
        ),
        U
      ],
      scope: {
        1: "title.class",
        3: "variable.constant"
      }
    },
    {
      match: [
        o,
        n.concat(
          "::",
          n.lookahead(/(?!class\b)/)
        )
      ],
      scope: { 1: "title.class" }
    },
    {
      match: [
        o,
        /::/,
        /class/
      ],
      scope: {
        1: "title.class",
        3: "variable.language"
      }
    }
  ] }, H = {
    scope: "attr",
    match: n.concat(r, n.lookahead(":"), n.lookahead(/(?!::)/))
  }, x = {
    relevance: 0,
    begin: /\(/,
    end: /\)/,
    keywords: C,
    contains: [
      H,
      i,
      $,
      e.C_BLOCK_COMMENT_MODE,
      g,
      _,
      k
    ]
  }, P = {
    relevance: 0,
    match: [
      /\b/,
      // to prevent keywords from being confused as the function title
      n.concat("(?!fn\\b|function\\b|", R(h).join("\\b|"), "|", R(w).join("\\b|"), "\\b)"),
      r,
      n.concat(f, "*"),
      n.lookahead(/(?=\()/)
    ],
    scope: { 3: "title.function.invoke" },
    contains: [x]
  };
  x.contains.push(P);
  const B = [
    H,
    $,
    e.C_BLOCK_COMMENT_MODE,
    g,
    _,
    k
  ], J = {
    begin: n.concat(
      /#\[\s*\\?/,
      n.either(
        o,
        a
      )
    ),
    beginScope: "meta",
    end: /]/,
    endScope: "meta",
    keywords: {
      literal: y,
      keyword: [
        "new",
        "array"
      ]
    },
    contains: [
      {
        begin: /\[/,
        end: /]/,
        keywords: {
          literal: y,
          keyword: [
            "new",
            "array"
          ]
        },
        contains: [
          "self",
          ...B
        ]
      },
      ...B,
      {
        scope: "meta",
        variants: [
          { match: o },
          { match: a }
        ]
      }
    ]
  };
  return {
    case_insensitive: !1,
    keywords: C,
    contains: [
      J,
      e.HASH_COMMENT_MODE,
      e.COMMENT("//", "$"),
      e.COMMENT(
        "/\\*",
        "\\*/",
        { contains: [
          {
            scope: "doctag",
            match: "@[A-Za-z]+"
          }
        ] }
      ),
      {
        match: /__halt_compiler\(\);/,
        keywords: "__halt_compiler",
        starts: {
          scope: "comment",
          end: e.MATCH_NOTHING_RE,
          contains: [
            {
              match: /\?>/,
              scope: "meta",
              endsParent: !0
            }
          ]
        }
      },
      s,
      {
        scope: "variable.language",
        match: /\$this\b/
      },
      i,
      P,
      $,
      {
        match: [
          /const/,
          /\s/,
          r
        ],
        scope: {
          1: "keyword",
          3: "variable.constant"
        }
      },
      k,
      {
        scope: "function",
        relevance: 0,
        beginKeywords: "fn function",
        end: /[;{]/,
        excludeEnd: !0,
        illegal: "[$%\\[]",
        contains: [
          { beginKeywords: "use" },
          e.UNDERSCORE_TITLE_MODE,
          {
            begin: "=>",
            // No markup, just a relevance booster
            endsParent: !0
          },
          {
            scope: "params",
            begin: "\\(",
            end: "\\)",
            excludeBegin: !0,
            excludeEnd: !0,
            keywords: C,
            contains: [
              "self",
              J,
              i,
              $,
              e.C_BLOCK_COMMENT_MODE,
              g,
              _
            ]
          }
        ]
      },
      {
        scope: "class",
        variants: [
          {
            beginKeywords: "enum",
            illegal: /[($"]/
          },
          {
            beginKeywords: "class interface trait",
            illegal: /[:($"]/
          }
        ],
        relevance: 0,
        end: /\{/,
        excludeEnd: !0,
        contains: [
          { beginKeywords: "extends implements" },
          e.UNDERSCORE_TITLE_MODE
        ]
      },
      // both use and namespace still use "old style" rules (vs multi-match)
      // because the namespace name can include `\` and we still want each
      // element to be treated as its own *individual* title
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: ";",
        illegal: /[.']/,
        contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { scope: "title.class" })]
      },
      {
        beginKeywords: "use",
        relevance: 0,
        end: ";",
        contains: [
          // TODO: title.function vs title.class
          {
            match: /\b(as|const|function)\b/,
            scope: "keyword"
          },
          // TODO: could be title.class or title.function
          e.UNDERSCORE_TITLE_MODE
        ]
      },
      g,
      _
    ]
  };
}
function sm(e) {
  return {
    name: "PHP template",
    subLanguage: "xml",
    contains: [
      {
        begin: /<\?(php|=)?/,
        end: /\?>/,
        subLanguage: "php",
        contains: [
          // We don't want the php closing tag ?> to close the PHP block when
          // inside any of the following blocks:
          {
            begin: "/\\*",
            end: "\\*/",
            skip: !0
          },
          {
            begin: 'b"',
            end: '"',
            skip: !0
          },
          {
            begin: "b'",
            end: "'",
            skip: !0
          },
          e.inherit(e.APOS_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: !0
          }),
          e.inherit(e.QUOTE_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: !0
          })
        ]
      }
    ]
  };
}
function lm(e) {
  return {
    name: "Plain text",
    aliases: [
      "text",
      "txt"
    ],
    disableAutodetect: !0
  };
}
function cm(e) {
  const n = e.regex, t = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u"), r = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ], s = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: r,
    built_in: [
      "__import__",
      "abs",
      "all",
      "any",
      "ascii",
      "bin",
      "bool",
      "breakpoint",
      "bytearray",
      "bytes",
      "callable",
      "chr",
      "classmethod",
      "compile",
      "complex",
      "delattr",
      "dict",
      "dir",
      "divmod",
      "enumerate",
      "eval",
      "exec",
      "filter",
      "float",
      "format",
      "frozenset",
      "getattr",
      "globals",
      "hasattr",
      "hash",
      "help",
      "hex",
      "id",
      "input",
      "int",
      "isinstance",
      "issubclass",
      "iter",
      "len",
      "list",
      "locals",
      "map",
      "max",
      "memoryview",
      "min",
      "next",
      "object",
      "oct",
      "open",
      "ord",
      "pow",
      "print",
      "property",
      "range",
      "repr",
      "reversed",
      "round",
      "set",
      "setattr",
      "slice",
      "sorted",
      "staticmethod",
      "str",
      "sum",
      "super",
      "tuple",
      "type",
      "vars",
      "zip"
    ],
    literal: [
      "__debug__",
      "Ellipsis",
      "False",
      "None",
      "NotImplemented",
      "True"
    ],
    type: [
      "Any",
      "Callable",
      "Coroutine",
      "Dict",
      "List",
      "Literal",
      "Generic",
      "Optional",
      "Sequence",
      "Set",
      "Tuple",
      "Type",
      "Union"
    ]
  }, c = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  }, l = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: s,
    illegal: /#/
  }, u = {
    begin: /\{\{/,
    relevance: 0
  }, d = {
    className: "string",
    contains: [e.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c,
          u,
          l
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c,
          u,
          l
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          e.BACKSLASH_ESCAPE,
          u,
          l
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          e.BACKSLASH_ESCAPE,
          u,
          l
        ]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  }, p = "[0-9](_?[0-9])*", f = `(\\b(${p}))?\\.(${p})|\\b(${p})\\.`, g = `\\b|${r.join("|")}`, _ = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${p})|(${f}))[eE][+-]?(${p})[jJ]?(?=${g})`
      },
      {
        begin: `(${f})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${g})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${g})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${g})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${g})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${p})[jJ](?=${g})`
      }
    ]
  }, y = {
    className: "comment",
    begin: n.lookahead(/# type:/),
    end: /$/,
    keywords: s,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: !0
      }
    ]
  }, h = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: !0
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: s,
        contains: [
          "self",
          c,
          _,
          d,
          e.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  return l.contains = [
    d,
    _,
    c
  ], {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: !0,
    keywords: s,
    illegal: /(<\/|\?)|=>/,
    contains: [
      c,
      _,
      {
        // very common convention
        scope: "variable.language",
        match: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      { match: /\bor\b/, scope: "keyword" },
      d,
      y,
      e.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          t
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [h]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              t,
              /\s*/,
              /\(\s*/,
              t,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              t
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          _,
          h,
          d
        ]
      }
    ]
  };
}
function um(e) {
  return {
    aliases: ["pycon"],
    contains: [
      {
        className: "meta.prompt",
        starts: {
          // a space separates the REPL prefix from the actual code
          // this is purely for cleaner HTML output
          end: / |$/,
          starts: {
            end: "$",
            subLanguage: "python"
          }
        },
        variants: [
          { begin: /^>>>(?=[ ]|$)/ },
          { begin: /^\.\.\.(?=[ ]|$)/ }
        ]
      }
    ]
  };
}
function dm(e) {
  const n = e.regex, t = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, r = n.either(
    // Special case: only hexadecimal binary powers can contain fractions
    /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
    // Hexadecimal numbers without fraction and optional binary power
    /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/,
    // Decimal numbers
    /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/
  ), o = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, a = n.either(
    /[()]/,
    /[{}]/,
    /\[\[/,
    /[[\]]/,
    /\\/,
    /,/
  );
  return {
    name: "R",
    keywords: {
      $pattern: t,
      keyword: "function if in break next repeat else for while",
      literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
      built_in: (
        // Builtin constants
        "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
      )
    },
    contains: [
      // Roxygen comments
      e.COMMENT(
        /#'/,
        /$/,
        { contains: [
          {
            // Handle `@examples` separately to cause all subsequent code
            // until the next `@`-tag on its own line to be kept as-is,
            // preventing highlighting. This code is example R code, so nested
            // doctags shouldn’t be treated as such. See
            // `test/markup/r/roxygen.txt` for an example.
            scope: "doctag",
            match: /@examples/,
            starts: {
              end: n.lookahead(n.either(
                // end if another doc comment
                /\n^#'\s*(?=@[a-zA-Z]+)/,
                // or a line with no comment
                /\n^(?!#')/
              )),
              endsParent: !0
            }
          },
          {
            // Handle `@param` to highlight the parameter name following
            // after.
            scope: "doctag",
            begin: "@param",
            end: /$/,
            contains: [
              {
                scope: "variable",
                variants: [
                  { match: t },
                  { match: /`(?:\\.|[^`\\])+`/ }
                ],
                endsParent: !0
              }
            ]
          },
          {
            scope: "doctag",
            match: /@[a-zA-Z]+/
          },
          {
            scope: "keyword",
            match: /\\[a-zA-Z]+/
          }
        ] }
      ),
      e.HASH_COMMENT_MODE,
      {
        scope: "string",
        contains: [e.BACKSLASH_ESCAPE],
        variants: [
          e.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\(/,
            end: /\)(-*)"/
          }),
          e.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\{/,
            end: /\}(-*)"/
          }),
          e.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\[/,
            end: /\](-*)"/
          }),
          e.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\(/,
            end: /\)(-*)'/
          }),
          e.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\{/,
            end: /\}(-*)'/
          }),
          e.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\[/,
            end: /\](-*)'/
          }),
          {
            begin: '"',
            end: '"',
            relevance: 0
          },
          {
            begin: "'",
            end: "'",
            relevance: 0
          }
        ]
      },
      // Matching numbers immediately following punctuation and operators is
      // tricky since we need to look at the character ahead of a number to
      // ensure the number is not part of an identifier, and we cannot use
      // negative look-behind assertions. So instead we explicitly handle all
      // possible combinations of (operator|punctuation), number.
      // TODO: replace with negative look-behind when available
      // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/ },
      // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/ },
      // { begin: /(?<![a-zA-Z0-9._])(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/ }
      {
        relevance: 0,
        variants: [
          {
            scope: {
              1: "operator",
              2: "number"
            },
            match: [
              o,
              r
            ]
          },
          {
            scope: {
              1: "operator",
              2: "number"
            },
            match: [
              /%[^%]*%/,
              r
            ]
          },
          {
            scope: {
              1: "punctuation",
              2: "number"
            },
            match: [
              a,
              r
            ]
          },
          {
            scope: { 2: "number" },
            match: [
              /[^a-zA-Z0-9._]|^/,
              // not part of an identifier, or start of document
              r
            ]
          }
        ]
      },
      // Operators/punctuation when they're not directly followed by numbers
      {
        // Relevance boost for the most common assignment form.
        scope: { 3: "operator" },
        match: [
          t,
          /\s+/,
          /<-/,
          /\s+/
        ]
      },
      {
        scope: "operator",
        relevance: 0,
        variants: [
          { match: o },
          { match: /%[^%]*%/ }
        ]
      },
      {
        scope: "punctuation",
        relevance: 0,
        match: a
      },
      {
        // Escaped identifier
        begin: "`",
        end: "`",
        contains: [{ begin: /\\./ }]
      }
    ]
  };
}
function fm(e) {
  const n = e.regex, t = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", r = n.either(
    /\b([A-Z]+[a-z0-9]+)+/,
    // ends in caps
    /\b([A-Z]+[a-z0-9]+)+[A-Z]+/
  ), o = n.concat(r, /(::\w+)*/), i = {
    "variable.constant": [
      "__FILE__",
      "__LINE__",
      "__ENCODING__"
    ],
    "variable.language": [
      "self",
      "super"
    ],
    keyword: [
      "alias",
      "and",
      "begin",
      "BEGIN",
      "break",
      "case",
      "class",
      "defined",
      "do",
      "else",
      "elsif",
      "end",
      "END",
      "ensure",
      "for",
      "if",
      "in",
      "module",
      "next",
      "not",
      "or",
      "redo",
      "require",
      "rescue",
      "retry",
      "return",
      "then",
      "undef",
      "unless",
      "until",
      "when",
      "while",
      "yield",
      ...[
        "include",
        "extend",
        "prepend",
        "public",
        "private",
        "protected",
        "raise",
        "throw"
      ]
    ],
    built_in: [
      "proc",
      "lambda",
      "attr_accessor",
      "attr_reader",
      "attr_writer",
      "define_method",
      "private_constant",
      "module_function"
    ],
    literal: [
      "true",
      "false",
      "nil"
    ]
  }, s = {
    className: "doctag",
    begin: "@[A-Za-z]+"
  }, c = {
    begin: "#<",
    end: ">"
  }, l = [
    e.COMMENT(
      "#",
      "$",
      { contains: [s] }
    ),
    e.COMMENT(
      "^=begin",
      "^=end",
      {
        contains: [s],
        relevance: 10
      }
    ),
    e.COMMENT("^__END__", e.MATCH_NOTHING_RE)
  ], u = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: i
  }, d = {
    className: "string",
    contains: [
      e.BACKSLASH_ESCAPE,
      u
    ],
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /`/,
        end: /`/
      },
      {
        begin: /%[qQwWx]?\(/,
        end: /\)/
      },
      {
        begin: /%[qQwWx]?\[/,
        end: /\]/
      },
      {
        begin: /%[qQwWx]?\{/,
        end: /\}/
      },
      {
        begin: /%[qQwWx]?</,
        end: />/
      },
      {
        begin: /%[qQwWx]?\//,
        end: /\//
      },
      {
        begin: /%[qQwWx]?%/,
        end: /%/
      },
      {
        begin: /%[qQwWx]?-/,
        end: /-/
      },
      {
        begin: /%[qQwWx]?\|/,
        end: /\|/
      },
      // in the following expressions, \B in the beginning suppresses recognition of ?-sequences
      // where ? is the last character of a preceding identifier, as in: `func?4`
      { begin: /\B\?(\\\d{1,3})/ },
      { begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/ },
      { begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/ },
      { begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/ },
      { begin: /\B\?\\(c|C-)[\x20-\x7e]/ },
      { begin: /\B\?\\?\S/ },
      // heredocs
      {
        // this guard makes sure that we have an entire heredoc and not a false
        // positive (auto-detect, etc.)
        begin: n.concat(
          /<<[-~]?'?/,
          n.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)
        ),
        contains: [
          e.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/,
            contains: [
              e.BACKSLASH_ESCAPE,
              u
            ]
          })
        ]
      }
    ]
  }, p = "[1-9](_?[0-9])*|0", f = "[0-9](_?[0-9])*", g = {
    className: "number",
    relevance: 0,
    variants: [
      // decimal integer/float, optionally exponential or rational, optionally imaginary
      { begin: `\\b(${p})(\\.(${f}))?([eE][+-]?(${f})|r)?i?\\b` },
      // explicit decimal/binary/octal/hexadecimal integer,
      // optionally rational and/or imaginary
      { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" },
      // 0-prefixed implicit octal integer, optionally rational and/or imaginary
      { begin: "\\b0(_?[0-7])+r?i?\\b" }
    ]
  }, _ = {
    variants: [
      {
        match: /\(\)/
      },
      {
        className: "params",
        begin: /\(/,
        end: /(?=\))/,
        excludeBegin: !0,
        endsParent: !0,
        keywords: i
      }
    ]
  }, k = [
    d,
    {
      variants: [
        {
          match: [
            /class\s+/,
            o,
            /\s+<\s+/,
            o
          ]
        },
        {
          match: [
            /\b(class|module)\s+/,
            o
          ]
        }
      ],
      scope: {
        2: "title.class",
        4: "title.class.inherited"
      },
      keywords: i
    },
    {
      match: [
        /(include|extend)\s+/,
        o
      ],
      scope: {
        2: "title.class"
      },
      keywords: i
    },
    {
      relevance: 0,
      match: [
        o,
        /\.new[. (]/
      ],
      scope: {
        1: "title.class"
      }
    },
    {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    },
    {
      relevance: 0,
      match: r,
      scope: "title.class"
    },
    {
      match: [
        /def/,
        /\s+/,
        t
      ],
      scope: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        _
      ]
    },
    {
      // swallow namespace qualifiers before symbols
      begin: e.IDENT_RE + "::"
    },
    {
      className: "symbol",
      begin: e.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
      relevance: 0
    },
    {
      className: "symbol",
      begin: ":(?!\\s)",
      contains: [
        d,
        { begin: t }
      ],
      relevance: 0
    },
    g,
    {
      // negative-look forward attempts to prevent false matches like:
      // @ident@ or $ident$ that might indicate this is not ruby at all
      className: "variable",
      begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
    },
    {
      className: "params",
      begin: /\|(?!=)/,
      end: /\|/,
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0,
      // this could be a lot of things (in other languages) other than params
      keywords: i
    },
    {
      // regexp container
      begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
      keywords: "unless",
      contains: [
        {
          className: "regexp",
          contains: [
            e.BACKSLASH_ESCAPE,
            u
          ],
          illegal: /\n/,
          variants: [
            {
              begin: "/",
              end: "/[a-z]*"
            },
            {
              begin: /%r\{/,
              end: /\}[a-z]*/
            },
            {
              begin: "%r\\(",
              end: "\\)[a-z]*"
            },
            {
              begin: "%r!",
              end: "![a-z]*"
            },
            {
              begin: "%r\\[",
              end: "\\][a-z]*"
            }
          ]
        }
      ].concat(c, l),
      relevance: 0
    }
  ].concat(c, l);
  u.contains = k, _.contains = k;
  const x = [
    {
      begin: /^\s*=>/,
      starts: {
        end: "$",
        contains: k
      }
    },
    {
      className: "meta.prompt",
      begin: "^(" + "[>?]>" + "|" + "[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]" + "|" + "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>" + ")(?=[ ])",
      starts: {
        end: "$",
        keywords: i,
        contains: k
      }
    }
  ];
  return l.unshift(c), {
    name: "Ruby",
    aliases: [
      "rb",
      "gemspec",
      "podspec",
      "thor",
      "irb"
    ],
    keywords: i,
    illegal: /\/\*/,
    contains: [e.SHEBANG({ binary: "ruby" })].concat(x).concat(l).concat(k)
  };
}
function pm(e) {
  const n = e.regex, t = /(r#)?/, r = n.concat(t, e.UNDERSCORE_IDENT_RE), o = n.concat(t, e.IDENT_RE), a = {
    className: "title.function.invoke",
    relevance: 0,
    begin: n.concat(
      /\b/,
      /(?!let|for|while|if|else|match\b)/,
      o,
      n.lookahead(/\s*\(/)
    )
  }, i = "([ui](8|16|32|64|128|size)|f(32|64))?", s = [
    "abstract",
    "as",
    "async",
    "await",
    "become",
    "box",
    "break",
    "const",
    "continue",
    "crate",
    "do",
    "dyn",
    "else",
    "enum",
    "extern",
    "false",
    "final",
    "fn",
    "for",
    "if",
    "impl",
    "in",
    "let",
    "loop",
    "macro",
    "match",
    "mod",
    "move",
    "mut",
    "override",
    "priv",
    "pub",
    "ref",
    "return",
    "self",
    "Self",
    "static",
    "struct",
    "super",
    "trait",
    "true",
    "try",
    "type",
    "typeof",
    "union",
    "unsafe",
    "unsized",
    "use",
    "virtual",
    "where",
    "while",
    "yield"
  ], c = [
    "true",
    "false",
    "Some",
    "None",
    "Ok",
    "Err"
  ], l = [
    // functions
    "drop ",
    // traits
    "Copy",
    "Send",
    "Sized",
    "Sync",
    "Drop",
    "Fn",
    "FnMut",
    "FnOnce",
    "ToOwned",
    "Clone",
    "Debug",
    "PartialEq",
    "PartialOrd",
    "Eq",
    "Ord",
    "AsRef",
    "AsMut",
    "Into",
    "From",
    "Default",
    "Iterator",
    "Extend",
    "IntoIterator",
    "DoubleEndedIterator",
    "ExactSizeIterator",
    "SliceConcatExt",
    "ToString",
    // macros
    "assert!",
    "assert_eq!",
    "bitflags!",
    "bytes!",
    "cfg!",
    "col!",
    "concat!",
    "concat_idents!",
    "debug_assert!",
    "debug_assert_eq!",
    "env!",
    "eprintln!",
    "panic!",
    "file!",
    "format!",
    "format_args!",
    "include_bytes!",
    "include_str!",
    "line!",
    "local_data_key!",
    "module_path!",
    "option_env!",
    "print!",
    "println!",
    "select!",
    "stringify!",
    "try!",
    "unimplemented!",
    "unreachable!",
    "vec!",
    "write!",
    "writeln!",
    "macro_rules!",
    "assert_ne!",
    "debug_assert_ne!"
  ], u = [
    "i8",
    "i16",
    "i32",
    "i64",
    "i128",
    "isize",
    "u8",
    "u16",
    "u32",
    "u64",
    "u128",
    "usize",
    "f32",
    "f64",
    "str",
    "char",
    "bool",
    "Box",
    "Option",
    "Result",
    "String",
    "Vec"
  ];
  return {
    name: "Rust",
    aliases: ["rs"],
    keywords: {
      $pattern: e.IDENT_RE + "!?",
      type: u,
      keyword: s,
      literal: c,
      built_in: l
    },
    illegal: "</",
    contains: [
      e.C_LINE_COMMENT_MODE,
      e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
      e.inherit(e.QUOTE_STRING_MODE, {
        begin: /b?"/,
        illegal: null
      }),
      {
        className: "symbol",
        // negative lookahead to avoid matching `'`
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*(?!')/
      },
      {
        scope: "string",
        variants: [
          { begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ },
          {
            begin: /b?'/,
            end: /'/,
            contains: [
              {
                scope: "char.escape",
                match: /\\('|\w|x\w{2}|u\w{4}|U\w{8})/
              }
            ]
          }
        ]
      },
      {
        className: "number",
        variants: [
          { begin: "\\b0b([01_]+)" + i },
          { begin: "\\b0o([0-7_]+)" + i },
          { begin: "\\b0x([A-Fa-f0-9_]+)" + i },
          { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + i }
        ],
        relevance: 0
      },
      {
        begin: [
          /fn/,
          /\s+/,
          r
        ],
        className: {
          1: "keyword",
          3: "title.function"
        }
      },
      {
        className: "meta",
        begin: "#!?\\[",
        end: "\\]",
        contains: [
          {
            className: "string",
            begin: /"/,
            end: /"/,
            contains: [
              e.BACKSLASH_ESCAPE
            ]
          }
        ]
      },
      {
        begin: [
          /let/,
          /\s+/,
          /(?:mut\s+)?/,
          r
        ],
        className: {
          1: "keyword",
          3: "keyword",
          4: "variable"
        }
      },
      // must come before impl/for rule later
      {
        begin: [
          /for/,
          /\s+/,
          r,
          /\s+/,
          /in/
        ],
        className: {
          1: "keyword",
          3: "variable",
          5: "keyword"
        }
      },
      {
        begin: [
          /type/,
          /\s+/,
          r
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        begin: [
          /(?:trait|enum|struct|union|impl|for)/,
          /\s+/,
          r
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        begin: e.IDENT_RE + "::",
        keywords: {
          keyword: "Self",
          built_in: l,
          type: u
        }
      },
      {
        className: "punctuation",
        begin: "->"
      },
      a
    ]
  };
}
const gm = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), hm = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], mm = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], bm = [
  ...hm,
  ...mm
], Em = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), _m = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), ym = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), km = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function wm(e) {
  const n = gm(e), t = ym, r = _m, o = "@[a-z-]+", a = "and or not only", s = {
    className: "variable",
    begin: "(\\$" + "[a-zA-Z-][a-zA-Z0-9_-]*" + ")\\b",
    relevance: 0
  };
  return {
    name: "SCSS",
    case_insensitive: !0,
    illegal: "[=/|']",
    contains: [
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      n.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: "#[A-Za-z0-9_-]+",
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\.[A-Za-z0-9_-]+",
        relevance: 0
      },
      n.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-tag",
        begin: "\\b(" + bm.join("|") + ")\\b",
        // was there, before, but why?
        relevance: 0
      },
      {
        className: "selector-pseudo",
        begin: ":(" + r.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + t.join("|") + ")"
      },
      s,
      {
        // pseudo-selector params
        begin: /\(/,
        end: /\)/,
        contains: [n.CSS_NUMBER_MODE]
      },
      n.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + km.join("|") + ")\\b"
      },
      { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" },
      {
        begin: /:/,
        end: /[;}{]/,
        relevance: 0,
        contains: [
          n.BLOCK_COMMENT,
          s,
          n.HEXCOLOR,
          n.CSS_NUMBER_MODE,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          n.IMPORTANT,
          n.FUNCTION_DISPATCH
        ]
      },
      // matching these here allows us to treat them more like regular CSS
      // rules so everything between the {} gets regular rule highlighting,
      // which is what we want for page and font-face
      {
        begin: "@(page|font-face)",
        keywords: {
          $pattern: o,
          keyword: "@page @font-face"
        }
      },
      {
        begin: "@",
        end: "[{;]",
        returnBegin: !0,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: a,
          attribute: Em.join(" ")
        },
        contains: [
          {
            begin: o,
            className: "keyword"
          },
          {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          },
          s,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          n.HEXCOLOR,
          n.CSS_NUMBER_MODE
        ]
      },
      n.FUNCTION_DISPATCH
    ]
  };
}
function xm(e) {
  return {
    name: "Shell Session",
    aliases: [
      "console",
      "shellsession"
    ],
    contains: [
      {
        className: "meta.prompt",
        // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
        // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
        // echo /path/to/home > t.exe
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
        starts: {
          end: /[^\\](?=\s*$)/,
          subLanguage: "bash"
        }
      }
    ]
  };
}
function Sm(e) {
  const n = e.regex, t = e.COMMENT("--", "$"), r = {
    scope: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ match: /''/ }]
      }
    ]
  }, o = {
    begin: /"/,
    end: /"/,
    contains: [{ match: /""/ }]
  }, a = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ], i = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ], s = [
    "bigint",
    "binary",
    "blob",
    "boolean",
    "char",
    "character",
    "clob",
    "date",
    "dec",
    "decfloat",
    "decimal",
    "float",
    "int",
    "integer",
    "interval",
    "nchar",
    "nclob",
    "national",
    "numeric",
    "real",
    "row",
    "smallint",
    "time",
    "timestamp",
    "varchar",
    "varying",
    // modifier (character varying)
    "varbinary"
  ], c = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ], l = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year"
  ], u = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket"
  ], d = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ], p = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ], f = u, g = [
    ...l,
    ...c
  ].filter((R) => !u.includes(R)), _ = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/
  }, y = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, h = {
    match: n.concat(/\b/, n.either(...f), /\s*\(/),
    relevance: 0,
    keywords: { built_in: f }
  };
  function w(R) {
    return n.concat(
      /\b/,
      n.either(...R.map((k) => k.replace(/\s+/, "\\s+"))),
      /\b/
    );
  }
  const S = {
    scope: "keyword",
    match: w(p),
    relevance: 0
  };
  function C(R, {
    exceptions: k,
    when: U
  } = {}) {
    const $ = U;
    return k = k || [], R.map((H) => H.match(/\|\d+$/) || k.includes(H) ? H : $(H) ? `${H}|0` : H);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: C(g, { when: (R) => R.length < 3 }),
      literal: a,
      type: s,
      built_in: d
    },
    contains: [
      {
        scope: "type",
        match: w(i)
      },
      S,
      h,
      _,
      r,
      o,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      t,
      y
    ]
  };
}
function Oa(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function Kn(e) {
  return de("(?=", e, ")");
}
function de(...e) {
  return e.map((t) => Oa(t)).join("");
}
function Nm(e) {
  const n = e[e.length - 1];
  return typeof n == "object" && n.constructor === Object ? (e.splice(e.length - 1, 1), n) : {};
}
function Ie(...e) {
  return "(" + (Nm(e).capture ? "" : "?:") + e.map((r) => Oa(r)).join("|") + ")";
}
const Wr = (e) => de(
  /\b/,
  e,
  /\w$/.test(e) ? /\b/ : /\B/
), Tm = [
  "Protocol",
  // contextual
  "Type"
  // contextual
].map(Wr), oo = [
  "init",
  "self"
].map(Wr), Am = [
  "Any",
  "Self"
], sr = [
  // strings below will be fed into the regular `keywords` engine while regex
  // will result in additional modes being created to scan for those keywords to
  // avoid conflicts with other rules
  "actor",
  "any",
  // contextual
  "associatedtype",
  "async",
  "await",
  /as\?/,
  // operator
  /as!/,
  // operator
  "as",
  // operator
  "borrowing",
  // contextual
  "break",
  "case",
  "catch",
  "class",
  "consume",
  // contextual
  "consuming",
  // contextual
  "continue",
  "convenience",
  // contextual
  "copy",
  // contextual
  "default",
  "defer",
  "deinit",
  "didSet",
  // contextual
  "distributed",
  "do",
  "dynamic",
  // contextual
  "each",
  "else",
  "enum",
  "extension",
  "fallthrough",
  /fileprivate\(set\)/,
  "fileprivate",
  "final",
  // contextual
  "for",
  "func",
  "get",
  // contextual
  "guard",
  "if",
  "import",
  "indirect",
  // contextual
  "infix",
  // contextual
  /init\?/,
  /init!/,
  "inout",
  /internal\(set\)/,
  "internal",
  "in",
  "is",
  // operator
  "isolated",
  // contextual
  "nonisolated",
  // contextual
  "lazy",
  // contextual
  "let",
  "macro",
  "mutating",
  // contextual
  "nonmutating",
  // contextual
  /open\(set\)/,
  // contextual
  "open",
  // contextual
  "operator",
  "optional",
  // contextual
  "override",
  // contextual
  "package",
  "postfix",
  // contextual
  "precedencegroup",
  "prefix",
  // contextual
  /private\(set\)/,
  "private",
  "protocol",
  /public\(set\)/,
  "public",
  "repeat",
  "required",
  // contextual
  "rethrows",
  "return",
  "set",
  // contextual
  "some",
  // contextual
  "static",
  "struct",
  "subscript",
  "super",
  "switch",
  "throws",
  "throw",
  /try\?/,
  // operator
  /try!/,
  // operator
  "try",
  // operator
  "typealias",
  /unowned\(safe\)/,
  // contextual
  /unowned\(unsafe\)/,
  // contextual
  "unowned",
  // contextual
  "var",
  "weak",
  // contextual
  "where",
  "while",
  "willSet"
  // contextual
], ao = [
  "false",
  "nil",
  "true"
], vm = [
  "assignment",
  "associativity",
  "higherThan",
  "left",
  "lowerThan",
  "none",
  "right"
], Cm = [
  "#colorLiteral",
  "#column",
  "#dsohandle",
  "#else",
  "#elseif",
  "#endif",
  "#error",
  "#file",
  "#fileID",
  "#fileLiteral",
  "#filePath",
  "#function",
  "#if",
  "#imageLiteral",
  "#keyPath",
  "#line",
  "#selector",
  "#sourceLocation",
  "#warning"
], so = [
  "abs",
  "all",
  "any",
  "assert",
  "assertionFailure",
  "debugPrint",
  "dump",
  "fatalError",
  "getVaList",
  "isKnownUniquelyReferenced",
  "max",
  "min",
  "numericCast",
  "pointwiseMax",
  "pointwiseMin",
  "precondition",
  "preconditionFailure",
  "print",
  "readLine",
  "repeatElement",
  "sequence",
  "stride",
  "swap",
  "swift_unboxFromSwiftValueWithType",
  "transcode",
  "type",
  "unsafeBitCast",
  "unsafeDowncast",
  "withExtendedLifetime",
  "withUnsafeMutablePointer",
  "withUnsafePointer",
  "withVaList",
  "withoutActuallyEscaping",
  "zip"
], Ia = Ie(
  /[/=\-+!*%<>&|^~?]/,
  /[\u00A1-\u00A7]/,
  /[\u00A9\u00AB]/,
  /[\u00AC\u00AE]/,
  /[\u00B0\u00B1]/,
  /[\u00B6\u00BB\u00BF\u00D7\u00F7]/,
  /[\u2016-\u2017]/,
  /[\u2020-\u2027]/,
  /[\u2030-\u203E]/,
  /[\u2041-\u2053]/,
  /[\u2055-\u205E]/,
  /[\u2190-\u23FF]/,
  /[\u2500-\u2775]/,
  /[\u2794-\u2BFF]/,
  /[\u2E00-\u2E7F]/,
  /[\u3001-\u3003]/,
  /[\u3008-\u3020]/,
  /[\u3030]/
), Ra = Ie(
  Ia,
  /[\u0300-\u036F]/,
  /[\u1DC0-\u1DFF]/,
  /[\u20D0-\u20FF]/,
  /[\uFE00-\uFE0F]/,
  /[\uFE20-\uFE2F]/
  // TODO: The following characters are also allowed, but the regex isn't supported yet.
  // /[\u{E0100}-\u{E01EF}]/u
), lr = de(Ia, Ra, "*"), Ma = Ie(
  /[a-zA-Z_]/,
  /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,
  /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,
  /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,
  /[\u1E00-\u1FFF]/,
  /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,
  /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,
  /[\u2C00-\u2DFF\u2E80-\u2FFF]/,
  /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,
  /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,
  /[\uFE47-\uFEFE\uFF00-\uFFFD]/
  // Should be /[\uFE47-\uFFFD]/, but we have to exclude FEFF.
  // The following characters are also allowed, but the regexes aren't supported yet.
  // /[\u{10000}-\u{1FFFD}\u{20000-\u{2FFFD}\u{30000}-\u{3FFFD}\u{40000}-\u{4FFFD}]/u,
  // /[\u{50000}-\u{5FFFD}\u{60000-\u{6FFFD}\u{70000}-\u{7FFFD}\u{80000}-\u{8FFFD}]/u,
  // /[\u{90000}-\u{9FFFD}\u{A0000-\u{AFFFD}\u{B0000}-\u{BFFFD}\u{C0000}-\u{CFFFD}]/u,
  // /[\u{D0000}-\u{DFFFD}\u{E0000-\u{EFFFD}]/u
), Nt = Ie(
  Ma,
  /\d/,
  /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/
), Qe = de(Ma, Nt, "*"), ht = de(/[A-Z]/, Nt, "*"), Om = [
  "attached",
  "autoclosure",
  de(/convention\(/, Ie("swift", "block", "c"), /\)/),
  "discardableResult",
  "dynamicCallable",
  "dynamicMemberLookup",
  "escaping",
  "freestanding",
  "frozen",
  "GKInspectable",
  "IBAction",
  "IBDesignable",
  "IBInspectable",
  "IBOutlet",
  "IBSegueAction",
  "inlinable",
  "main",
  "nonobjc",
  "NSApplicationMain",
  "NSCopying",
  "NSManaged",
  de(/objc\(/, Qe, /\)/),
  "objc",
  "objcMembers",
  "propertyWrapper",
  "requires_stored_property_inits",
  "resultBuilder",
  "Sendable",
  "testable",
  "UIApplicationMain",
  "unchecked",
  "unknown",
  "usableFromInline",
  "warn_unqualified_access"
], Im = [
  "iOS",
  "iOSApplicationExtension",
  "macOS",
  "macOSApplicationExtension",
  "macCatalyst",
  "macCatalystApplicationExtension",
  "watchOS",
  "watchOSApplicationExtension",
  "tvOS",
  "tvOSApplicationExtension",
  "swift"
];
function Rm(e) {
  const n = {
    match: /\s+/,
    relevance: 0
  }, t = e.COMMENT(
    "/\\*",
    "\\*/",
    { contains: ["self"] }
  ), r = [
    e.C_LINE_COMMENT_MODE,
    t
  ], o = {
    match: [
      /\./,
      Ie(...Tm, ...oo)
    ],
    className: { 2: "keyword" }
  }, a = {
    // Consume .keyword to prevent highlighting properties and methods as keywords.
    match: de(/\./, Ie(...sr)),
    relevance: 0
  }, i = sr.filter((ae) => typeof ae == "string").concat(["_|0"]), s = sr.filter((ae) => typeof ae != "string").concat(Am).map(Wr), c = { variants: [
    {
      className: "keyword",
      match: Ie(...s, ...oo)
    }
  ] }, l = {
    $pattern: Ie(
      /\b\w+/,
      // regular keywords
      /#\w+/
      // number keywords
    ),
    keyword: i.concat(Cm),
    literal: ao
  }, u = [
    o,
    a,
    c
  ], d = {
    // Consume .built_in to prevent highlighting properties and methods.
    match: de(/\./, Ie(...so)),
    relevance: 0
  }, p = {
    className: "built_in",
    match: de(/\b/, Ie(...so), /(?=\()/)
  }, f = [
    d,
    p
  ], g = {
    // Prevent -> from being highlighting as an operator.
    match: /->/,
    relevance: 0
  }, _ = {
    className: "operator",
    relevance: 0,
    variants: [
      { match: lr },
      {
        // dot-operator: only operators that start with a dot are allowed to use dots as
        // characters (..., ...<, .*, etc). So there rule here is: a dot followed by one or more
        // characters that may also include dots.
        match: `\\.(\\.|${Ra})+`
      }
    ]
  }, y = [
    g,
    _
  ], h = "([0-9]_*)+", w = "([0-9a-fA-F]_*)+", S = {
    className: "number",
    relevance: 0,
    variants: [
      // decimal floating-point-literal (subsumes decimal-literal)
      { match: `\\b(${h})(\\.(${h}))?([eE][+-]?(${h}))?\\b` },
      // hexadecimal floating-point-literal (subsumes hexadecimal-literal)
      { match: `\\b0x(${w})(\\.(${w}))?([pP][+-]?(${h}))?\\b` },
      // octal-literal
      { match: /\b0o([0-7]_*)+\b/ },
      // binary-literal
      { match: /\b0b([01]_*)+\b/ }
    ]
  }, C = (ae = "") => ({
    className: "subst",
    variants: [
      { match: de(/\\/, ae, /[0\\tnr"']/) },
      { match: de(/\\/, ae, /u\{[0-9a-fA-F]{1,8}\}/) }
    ]
  }), R = (ae = "") => ({
    className: "subst",
    match: de(/\\/, ae, /[\t ]*(?:[\r\n]|\r\n)/)
  }), k = (ae = "") => ({
    className: "subst",
    label: "interpol",
    begin: de(/\\/, ae, /\(/),
    end: /\)/
  }), U = (ae = "") => ({
    begin: de(ae, /"""/),
    end: de(/"""/, ae),
    contains: [
      C(ae),
      R(ae),
      k(ae)
    ]
  }), $ = (ae = "") => ({
    begin: de(ae, /"/),
    end: de(/"/, ae),
    contains: [
      C(ae),
      k(ae)
    ]
  }), H = {
    className: "string",
    variants: [
      U(),
      U("#"),
      U("##"),
      U("###"),
      $(),
      $("#"),
      $("##"),
      $("###")
    ]
  }, x = [
    e.BACKSLASH_ESCAPE,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [e.BACKSLASH_ESCAPE]
    }
  ], P = {
    begin: /\/[^\s](?=[^/\n]*\/)/,
    end: /\//,
    contains: x
  }, B = (ae) => {
    const tn = de(ae, /\//), rn = de(/\//, ae);
    return {
      begin: tn,
      end: rn,
      contains: [
        ...x,
        {
          scope: "comment",
          begin: `#(?!.*${rn})`,
          end: /$/
        }
      ]
    };
  }, J = {
    scope: "regexp",
    variants: [
      B("###"),
      B("##"),
      B("#"),
      P
    ]
  }, D = { match: de(/`/, Qe, /`/) }, v = {
    className: "variable",
    match: /\$\d+/
  }, Z = {
    className: "variable",
    match: `\\$${Nt}+`
  }, se = [
    D,
    v,
    Z
  ], X = {
    match: /(@|#(un)?)available/,
    scope: "keyword",
    starts: { contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: Im,
        contains: [
          ...y,
          S,
          H
        ]
      }
    ] }
  }, fe = {
    scope: "keyword",
    match: de(/@/, Ie(...Om), Kn(Ie(/\(/, /\s+/)))
  }, m = {
    scope: "meta",
    match: de(/@/, Qe)
  }, ue = [
    X,
    fe,
    m
  ], pe = {
    match: Kn(/\b[A-Z]/),
    relevance: 0,
    contains: [
      {
        // Common Apple frameworks, for relevance boost
        className: "type",
        match: de(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, Nt, "+")
      },
      {
        // Type identifier
        className: "type",
        match: ht,
        relevance: 0
      },
      {
        // Optional type
        match: /[?!]+/,
        relevance: 0
      },
      {
        // Variadic parameter
        match: /\.\.\./,
        relevance: 0
      },
      {
        // Protocol composition
        match: de(/\s+&\s+/, Kn(ht)),
        relevance: 0
      }
    ]
  }, E = {
    begin: /</,
    end: />/,
    keywords: l,
    contains: [
      ...r,
      ...u,
      ...ue,
      g,
      pe
    ]
  };
  pe.contains.push(E);
  const Ce = {
    match: de(Qe, /\s*:/),
    keywords: "_|0",
    relevance: 0
  }, Ge = {
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    keywords: l,
    contains: [
      "self",
      Ce,
      ...r,
      J,
      ...u,
      ...f,
      ...y,
      S,
      H,
      ...se,
      ...ue,
      pe
    ]
  }, Ee = {
    begin: /</,
    end: />/,
    keywords: "repeat each",
    contains: [
      ...r,
      pe
    ]
  }, en = {
    begin: Ie(
      Kn(de(Qe, /\s*:/)),
      Kn(de(Qe, /\s+/, Qe, /\s*:/))
    ),
    end: /:/,
    relevance: 0,
    contains: [
      {
        className: "keyword",
        match: /\b_\b/
      },
      {
        className: "params",
        match: Qe
      }
    ]
  }, Pe = {
    begin: /\(/,
    end: /\)/,
    keywords: l,
    contains: [
      en,
      ...r,
      ...u,
      ...y,
      S,
      H,
      ...ue,
      pe,
      Ge
    ],
    endsParent: !0,
    illegal: /["']/
  }, nn = {
    match: [
      /(func|macro)/,
      /\s+/,
      Ie(D.match, Qe, lr)
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      Ee,
      Pe,
      n
    ],
    illegal: [
      /\[/,
      /%/
    ]
  }, Be = {
    match: [
      /\b(?:subscript|init[?!]?)/,
      /\s*(?=[<(])/
    ],
    className: { 1: "keyword" },
    contains: [
      Ee,
      Pe,
      n
    ],
    illegal: /\[|%/
  }, cn = {
    match: [
      /operator/,
      /\s+/,
      lr
    ],
    className: {
      1: "keyword",
      3: "title"
    }
  }, Ln = {
    begin: [
      /precedencegroup/,
      /\s+/,
      ht
    ],
    className: {
      1: "keyword",
      3: "title"
    },
    contains: [pe],
    keywords: [
      ...vm,
      ...ao
    ],
    end: /}/
  }, Pn = {
    match: [
      /class\b/,
      /\s+/,
      /func\b/,
      /\s+/,
      /\b[A-Za-z_][A-Za-z0-9_]*\b/
    ],
    scope: {
      1: "keyword",
      3: "keyword",
      5: "title.function"
    }
  }, Bn = {
    match: [
      /class\b/,
      /\s+/,
      /var\b/
    ],
    scope: {
      1: "keyword",
      3: "keyword"
    }
  }, Nn = {
    begin: [
      /(struct|protocol|class|extension|enum|actor)/,
      /\s+/,
      Qe,
      /\s*/
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    },
    keywords: l,
    contains: [
      Ee,
      ...u,
      {
        begin: /:/,
        end: /\{/,
        keywords: l,
        contains: [
          {
            scope: "title.class.inherited",
            match: ht
          },
          ...u
        ],
        relevance: 0
      }
    ]
  };
  for (const ae of H.variants) {
    const tn = ae.contains.find((Tn) => Tn.label === "interpol");
    tn.keywords = l;
    const rn = [
      ...u,
      ...f,
      ...y,
      S,
      H,
      ...se
    ];
    tn.contains = [
      ...rn,
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          "self",
          ...rn
        ]
      }
    ];
  }
  return {
    name: "Swift",
    keywords: l,
    contains: [
      ...r,
      nn,
      Be,
      Pn,
      Bn,
      Nn,
      cn,
      Ln,
      {
        beginKeywords: "import",
        end: /$/,
        contains: [...r],
        relevance: 0
      },
      J,
      ...u,
      ...f,
      ...y,
      S,
      H,
      ...se,
      ...ue,
      pe,
      Ge
    ]
  };
}
const Tt = "[A-Za-z$_][0-9A-Za-z$_]*", Da = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], La = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Pa = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Ba = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Fa = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], za = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Ua = [].concat(
  Fa,
  Pa,
  Ba
);
function Mm(e) {
  const n = e.regex, t = (X, { after: fe }) => {
    const m = "</" + X[0].slice(1);
    return X.input.indexOf(m, fe) !== -1;
  }, r = Tt, o = {
    begin: "<>",
    end: "</>"
  }, a = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (X, fe) => {
      const m = X[0].length + X.index, ue = X.input[m];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        ue === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        ue === ","
      ) {
        fe.ignoreMatch();
        return;
      }
      ue === ">" && (t(X, { after: m }) || fe.ignoreMatch());
      let pe;
      const E = X.input.substring(m);
      if (pe = E.match(/^\s*=/)) {
        fe.ignoreMatch();
        return;
      }
      if ((pe = E.match(/^\s+extends\s+/)) && pe.index === 0) {
        fe.ignoreMatch();
        return;
      }
    }
  }, s = {
    $pattern: Tt,
    keyword: Da,
    literal: La,
    built_in: Ua,
    "variable.language": za
  }, c = "[0-9](_?[0-9])*", l = `\\.(${c})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, p = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: s,
    contains: []
    // defined later
  }, f = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "xml"
    }
  }, g = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "css"
    }
  }, _ = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "graphql"
    }
  }, y = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      p
    ]
  }, w = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, S = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    g,
    _,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    d
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  p.contains = S.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: s,
    contains: [
      "self"
    ].concat(S)
  });
  const C = [].concat(w, p.contains), R = C.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: s,
      contains: ["self"].concat(C)
    }
  ]), k = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: s,
    contains: R
  }, U = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          n.concat(r, "(", n.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, $ = {
    relevance: 0,
    match: n.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Pa,
        ...Ba
      ]
    }
  }, H = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, x = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [k],
    illegal: /%/
  }, P = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function B(X) {
    return n.concat("(?!", X.join("|"), ")");
  }
  const J = {
    match: n.concat(
      /\b/,
      B([
        ...Fa,
        "super",
        "import"
      ].map((X) => `${X}\\s*\\(`)),
      r,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, D = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, v = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      k
    ]
  }, Z = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", se = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(Z)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      k
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: s,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: R, CLASS_REFERENCE: $ },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      H,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      g,
      _,
      y,
      w,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      d,
      $,
      {
        scope: "attr",
        match: r + n.lookahead(":"),
        relevance: 0
      },
      se,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          w,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: Z,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: s,
                    contains: R
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: o.begin, end: o.end },
              { match: a },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      x,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          k,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      D,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [k]
      },
      J,
      P,
      U,
      v,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Dm(e) {
  const n = e.regex, t = Mm(e), r = Tt, o = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], a = {
    begin: [
      /namespace/,
      /\s+/,
      e.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, i = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: o
    },
    contains: [t.exports.CLASS_REFERENCE]
  }, s = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, c = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ], l = {
    $pattern: Tt,
    keyword: Da.concat(c),
    literal: La,
    built_in: Ua.concat(o),
    "variable.language": za
  }, u = {
    className: "meta",
    begin: "@" + r
  }, d = (_, y, h) => {
    const w = _.contains.findIndex((S) => S.label === y);
    if (w === -1)
      throw new Error("can not find mode to replace");
    _.contains.splice(w, 1, h);
  };
  Object.assign(t.keywords, l), t.exports.PARAMS_CONTAINS.push(u);
  const p = t.contains.find((_) => _.scope === "attr"), f = Object.assign(
    {},
    p,
    { match: n.concat(r, n.lookahead(/\s*\?:/)) }
  );
  t.exports.PARAMS_CONTAINS.push([
    t.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    p,
    // highlight the params key
    f
    // Added for optional property assignment highlighting
  ]), t.contains = t.contains.concat([
    u,
    a,
    i,
    f
    // Added for optional property assignment highlighting
  ]), d(t, "shebang", e.SHEBANG()), d(t, "use_strict", s);
  const g = t.contains.find((_) => _.label === "func.def");
  return g.relevance = 0, Object.assign(t, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), t;
}
function Lm(e) {
  const n = e.regex, t = {
    className: "string",
    begin: /"(""|[^/n])"C\b/
  }, r = {
    className: "string",
    begin: /"/,
    end: /"/,
    illegal: /\n/,
    contains: [
      {
        // double quote escape
        begin: /""/
      }
    ]
  }, o = /\d{1,2}\/\d{1,2}\/\d{4}/, a = /\d{4}-\d{1,2}-\d{1,2}/, i = /(\d|1[012])(:\d+){0,2} *(AM|PM)/, s = /\d{1,2}(:\d{1,2}){1,2}/, c = {
    className: "literal",
    variants: [
      {
        // #YYYY-MM-DD# (ISO-Date) or #M/D/YYYY# (US-Date)
        begin: n.concat(/# */, n.either(a, o), / *#/)
      },
      {
        // #H:mm[:ss]# (24h Time)
        begin: n.concat(/# */, s, / *#/)
      },
      {
        // #h[:mm[:ss]] A# (12h Time)
        begin: n.concat(/# */, i, / *#/)
      },
      {
        // date plus time
        begin: n.concat(
          /# */,
          n.either(a, o),
          / +/,
          n.either(i, s),
          / *#/
        )
      }
    ]
  }, l = {
    className: "number",
    relevance: 0,
    variants: [
      {
        // Float
        begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
      },
      {
        // Integer (base 10)
        begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
      },
      {
        // Integer (base 16)
        begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
      },
      {
        // Integer (base 8)
        begin: /&O[0-7_]+((U?[SIL])|[%&])?/
      },
      {
        // Integer (base 2)
        begin: /&B[01_]+((U?[SIL])|[%&])?/
      }
    ]
  }, u = {
    className: "label",
    begin: /^\w+:/
  }, d = e.COMMENT(/'''/, /$/, { contains: [
    {
      className: "doctag",
      begin: /<\/?/,
      end: />/
    }
  ] }), p = e.COMMENT(null, /$/, { variants: [
    { begin: /'/ },
    {
      // TODO: Use multi-class for leading spaces
      begin: /([\t ]|^)REM(?=\s)/
    }
  ] });
  return {
    name: "Visual Basic .NET",
    aliases: ["vb"],
    case_insensitive: !0,
    classNameAliases: { label: "symbol" },
    keywords: {
      keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
      built_in: (
        // Operators https://docs.microsoft.com/dotnet/visual-basic/language-reference/operators
        "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort"
      ),
      type: (
        // Data types https://docs.microsoft.com/dotnet/visual-basic/language-reference/data-types
        "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort"
      ),
      literal: "true false nothing"
    },
    illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
    contains: [
      t,
      r,
      c,
      l,
      u,
      d,
      p,
      {
        className: "meta",
        // TODO: Use multi-class for indentation once available
        begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
        end: /$/,
        keywords: { keyword: "const disable else elseif enable end externalsource if region then" },
        contains: [p]
      }
    ]
  };
}
function Pm(e) {
  e.regex;
  const n = e.COMMENT(/\(;/, /;\)/);
  n.contains.push("self");
  const t = e.COMMENT(/;;/, /$/), r = [
    "anyfunc",
    "block",
    "br",
    "br_if",
    "br_table",
    "call",
    "call_indirect",
    "data",
    "drop",
    "elem",
    "else",
    "end",
    "export",
    "func",
    "global.get",
    "global.set",
    "local.get",
    "local.set",
    "local.tee",
    "get_global",
    "get_local",
    "global",
    "if",
    "import",
    "local",
    "loop",
    "memory",
    "memory.grow",
    "memory.size",
    "module",
    "mut",
    "nop",
    "offset",
    "param",
    "result",
    "return",
    "select",
    "set_global",
    "set_local",
    "start",
    "table",
    "tee_local",
    "then",
    "type",
    "unreachable"
  ], o = {
    begin: [
      /(?:func|call|call_indirect)/,
      /\s+/,
      /\$[^\s)]+/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    }
  }, a = {
    className: "variable",
    begin: /\$[\w_]+/
  }, i = {
    match: /(\((?!;)|\))+/,
    className: "punctuation",
    relevance: 0
  }, s = {
    className: "number",
    relevance: 0,
    // borrowed from Prism, TODO: split out into variants
    match: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/
  }, c = {
    // look-ahead prevents us from gobbling up opcodes
    match: /(i32|i64|f32|f64)(?!\.)/,
    className: "type"
  }, l = {
    className: "keyword",
    // borrowed from Prism, TODO: split out into variants
    match: /\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/
  };
  return {
    name: "WebAssembly",
    keywords: {
      $pattern: /[\w.]+/,
      keyword: r
    },
    contains: [
      t,
      n,
      {
        match: [
          /(?:offset|align)/,
          /\s*/,
          /=/
        ],
        className: {
          1: "keyword",
          3: "operator"
        }
      },
      a,
      i,
      o,
      e.QUOTE_STRING_MODE,
      c,
      l,
      s
    ]
  };
}
function Bm(e) {
  const n = e.regex, t = n.concat(/[\p{L}_]/u, n.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, o = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, a = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, i = e.inherit(a, {
    begin: /\(/,
    end: /\)/
  }), s = e.inherit(e.APOS_STRING_MODE, { className: "string" }), c = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), l = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: r,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [o]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [o]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          a,
          c,
          s,
          i,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  a,
                  i,
                  c,
                  s
                ]
              }
            ]
          }
        ]
      },
      e.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      o,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              c
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [l],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [l],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: n.concat(
          /</,
          n.lookahead(n.concat(
            t,
            // <tag/>
            // <tag>
            // <tag ...
            n.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: t,
            relevance: 0,
            starts: l
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: n.concat(
          /<\//,
          n.lookahead(n.concat(
            t,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: t,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
function Fm(e) {
  const n = "true false yes no null", t = "[\\w#;/?:@&=+$,.~*'()[\\]]+", r = {
    className: "attr",
    variants: [
      // added brackets support and special char support
      { begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
      {
        // double quoted keys - with brackets and special char support
        begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/
      },
      {
        // single quoted keys - with brackets and special char support
        begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/
      }
    ]
  }, o = {
    className: "template-variable",
    variants: [
      {
        // jinja templates Ansible
        begin: /\{\{/,
        end: /\}\}/
      },
      {
        // Ruby i18n
        begin: /%\{/,
        end: /\}/
      }
    ]
  }, a = {
    className: "string",
    relevance: 0,
    begin: /'/,
    end: /'/,
    contains: [
      {
        match: /''/,
        scope: "char.escape",
        relevance: 0
      }
    ]
  }, i = {
    className: "string",
    relevance: 0,
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      { begin: /\S+/ }
    ],
    contains: [
      e.BACKSLASH_ESCAPE,
      o
    ]
  }, s = e.inherit(i, { variants: [
    {
      begin: /'/,
      end: /'/,
      contains: [
        {
          begin: /''/,
          relevance: 0
        }
      ]
    },
    {
      begin: /"/,
      end: /"/
    },
    { begin: /[^\s,{}[\]]+/ }
  ] }), p = {
    className: "number",
    begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
  }, f = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: n,
    relevance: 0
  }, g = {
    begin: /\{/,
    end: /\}/,
    contains: [f],
    illegal: "\\n",
    relevance: 0
  }, _ = {
    begin: "\\[",
    end: "\\]",
    contains: [f],
    illegal: "\\n",
    relevance: 0
  }, y = [
    r,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Ruby/Rails erb
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0
    },
    {
      // named tags
      className: "type",
      begin: "!\\w+!" + t
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + t + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + t
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + t
    },
    {
      // fragment id &ref
      className: "meta",
      begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // fragment reference *ref
      className: "meta",
      begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // array listing
      className: "bullet",
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    e.HASH_COMMENT_MODE,
    {
      beginKeywords: n,
      keywords: { literal: n }
    },
    p,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: e.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    g,
    _,
    a,
    i
  ], h = [...y];
  return h.pop(), h.push(s), f.contains = h, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: y
  };
}
const zm = {
  arduino: yh,
  bash: kh,
  c: wh,
  cpp: xh,
  csharp: Sh,
  css: Mh,
  diff: Dh,
  go: Lh,
  graphql: Ph,
  ini: Bh,
  java: Fh,
  javascript: Gh,
  json: Kh,
  kotlin: Wh,
  less: em,
  lua: nm,
  makefile: tm,
  markdown: rm,
  objectivec: im,
  perl: om,
  php: am,
  "php-template": sm,
  plaintext: lm,
  python: cm,
  "python-repl": um,
  r: dm,
  ruby: fm,
  rust: pm,
  scss: wm,
  shell: xm,
  sql: Sm,
  swift: Rm,
  typescript: Dm,
  vbnet: Lm,
  wasm: Pm,
  xml: Bm,
  yaml: Fm
};
var cr, lo;
function Um() {
  if (lo) return cr;
  lo = 1;
  function e(b) {
    return b instanceof Map ? b.clear = b.delete = b.set = function() {
      throw new Error("map is read-only");
    } : b instanceof Set && (b.add = b.clear = b.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(b), Object.getOwnPropertyNames(b).forEach((T) => {
      const M = b[T], Q = typeof M;
      (Q === "object" || Q === "function") && !Object.isFrozen(M) && e(M);
    }), b;
  }
  class n {
    /**
     * @param {CompiledMode} mode
     */
    constructor(T) {
      T.data === void 0 && (T.data = {}), this.data = T.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function t(b) {
    return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function r(b, ...T) {
    const M = /* @__PURE__ */ Object.create(null);
    for (const Q in b)
      M[Q] = b[Q];
    return T.forEach(function(Q) {
      for (const _e in Q)
        M[_e] = Q[_e];
    }), /** @type {T} */
    M;
  }
  const o = "</span>", a = (b) => !!b.scope, i = (b, { prefix: T }) => {
    if (b.startsWith("language:"))
      return b.replace("language:", "language-");
    if (b.includes(".")) {
      const M = b.split(".");
      return [
        `${T}${M.shift()}`,
        ...M.map((Q, _e) => `${Q}${"_".repeat(_e + 1)}`)
      ].join(" ");
    }
    return `${T}${b}`;
  };
  class s {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(T, M) {
      this.buffer = "", this.classPrefix = M.classPrefix, T.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(T) {
      this.buffer += t(T);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(T) {
      if (!a(T)) return;
      const M = i(
        T.scope,
        { prefix: this.classPrefix }
      );
      this.span(M);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(T) {
      a(T) && (this.buffer += o);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(T) {
      this.buffer += `<span class="${T}">`;
    }
  }
  const c = (b = {}) => {
    const T = { children: [] };
    return Object.assign(T, b), T;
  };
  class l {
    constructor() {
      this.rootNode = c(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(T) {
      this.top.children.push(T);
    }
    /** @param {string} scope */
    openNode(T) {
      const M = c({ scope: T });
      this.add(M), this.stack.push(M);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(T) {
      return this.constructor._walk(T, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(T, M) {
      return typeof M == "string" ? T.addText(M) : M.children && (T.openNode(M), M.children.forEach((Q) => this._walk(T, Q)), T.closeNode(M)), T;
    }
    /**
     * @param {Node} node
     */
    static _collapse(T) {
      typeof T != "string" && T.children && (T.children.every((M) => typeof M == "string") ? T.children = [T.children.join("")] : T.children.forEach((M) => {
        l._collapse(M);
      }));
    }
  }
  class u extends l {
    /**
     * @param {*} options
     */
    constructor(T) {
      super(), this.options = T;
    }
    /**
     * @param {string} text
     */
    addText(T) {
      T !== "" && this.add(T);
    }
    /** @param {string} scope */
    startScope(T) {
      this.openNode(T);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(T, M) {
      const Q = T.root;
      M && (Q.scope = `language:${M}`), this.add(Q);
    }
    toHTML() {
      return new s(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function d(b) {
    return b ? typeof b == "string" ? b : b.source : null;
  }
  function p(b) {
    return _("(?=", b, ")");
  }
  function f(b) {
    return _("(?:", b, ")*");
  }
  function g(b) {
    return _("(?:", b, ")?");
  }
  function _(...b) {
    return b.map((M) => d(M)).join("");
  }
  function y(b) {
    const T = b[b.length - 1];
    return typeof T == "object" && T.constructor === Object ? (b.splice(b.length - 1, 1), T) : {};
  }
  function h(...b) {
    return "(" + (y(b).capture ? "" : "?:") + b.map((Q) => d(Q)).join("|") + ")";
  }
  function w(b) {
    return new RegExp(b.toString() + "|").exec("").length - 1;
  }
  function S(b, T) {
    const M = b && b.exec(T);
    return M && M.index === 0;
  }
  const C = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function R(b, { joinWith: T }) {
    let M = 0;
    return b.map((Q) => {
      M += 1;
      const _e = M;
      let ye = d(Q), z = "";
      for (; ye.length > 0; ) {
        const F = C.exec(ye);
        if (!F) {
          z += ye;
          break;
        }
        z += ye.substring(0, F.index), ye = ye.substring(F.index + F[0].length), F[0][0] === "\\" && F[1] ? z += "\\" + String(Number(F[1]) + _e) : (z += F[0], F[0] === "(" && M++);
      }
      return z;
    }).map((Q) => `(${Q})`).join(T);
  }
  const k = /\b\B/, U = "[a-zA-Z]\\w*", $ = "[a-zA-Z_]\\w*", H = "\\b\\d+(\\.\\d+)?", x = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", P = "\\b(0b[01]+)", B = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", J = (b = {}) => {
    const T = /^#![ ]*\//;
    return b.binary && (b.begin = _(
      T,
      /.*\b/,
      b.binary,
      /\b.*/
    )), r({
      scope: "meta",
      begin: T,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (M, Q) => {
        M.index !== 0 && Q.ignoreMatch();
      }
    }, b);
  }, D = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, v = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [D]
  }, Z = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [D]
  }, se = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, X = function(b, T, M = {}) {
    const Q = r(
      {
        scope: "comment",
        begin: b,
        end: T,
        contains: []
      },
      M
    );
    Q.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const _e = h(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return Q.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: _(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          _e,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), Q;
  }, fe = X("//", "$"), m = X("/\\*", "\\*/"), ue = X("#", "$"), pe = {
    scope: "number",
    begin: H,
    relevance: 0
  }, E = {
    scope: "number",
    begin: x,
    relevance: 0
  }, Ce = {
    scope: "number",
    begin: P,
    relevance: 0
  }, Ge = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      D,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [D]
      }
    ]
  }, Ee = {
    scope: "title",
    begin: U,
    relevance: 0
  }, en = {
    scope: "title",
    begin: $,
    relevance: 0
  }, Pe = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + $,
    relevance: 0
  };
  var Be = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: v,
    BACKSLASH_ESCAPE: D,
    BINARY_NUMBER_MODE: Ce,
    BINARY_NUMBER_RE: P,
    COMMENT: X,
    C_BLOCK_COMMENT_MODE: m,
    C_LINE_COMMENT_MODE: fe,
    C_NUMBER_MODE: E,
    C_NUMBER_RE: x,
    END_SAME_AS_BEGIN: function(b) {
      return Object.assign(
        b,
        {
          /** @type {ModeCallback} */
          "on:begin": (T, M) => {
            M.data._beginMatch = T[1];
          },
          /** @type {ModeCallback} */
          "on:end": (T, M) => {
            M.data._beginMatch !== T[1] && M.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: ue,
    IDENT_RE: U,
    MATCH_NOTHING_RE: k,
    METHOD_GUARD: Pe,
    NUMBER_MODE: pe,
    NUMBER_RE: H,
    PHRASAL_WORDS_MODE: se,
    QUOTE_STRING_MODE: Z,
    REGEXP_MODE: Ge,
    RE_STARTERS_RE: B,
    SHEBANG: J,
    TITLE_MODE: Ee,
    UNDERSCORE_IDENT_RE: $,
    UNDERSCORE_TITLE_MODE: en
  });
  function cn(b, T) {
    b.input[b.index - 1] === "." && T.ignoreMatch();
  }
  function Ln(b, T) {
    b.className !== void 0 && (b.scope = b.className, delete b.className);
  }
  function Pn(b, T) {
    T && b.beginKeywords && (b.begin = "\\b(" + b.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", b.__beforeBegin = cn, b.keywords = b.keywords || b.beginKeywords, delete b.beginKeywords, b.relevance === void 0 && (b.relevance = 0));
  }
  function Bn(b, T) {
    Array.isArray(b.illegal) && (b.illegal = h(...b.illegal));
  }
  function Nn(b, T) {
    if (b.match) {
      if (b.begin || b.end) throw new Error("begin & end are not supported with match");
      b.begin = b.match, delete b.match;
    }
  }
  function ae(b, T) {
    b.relevance === void 0 && (b.relevance = 1);
  }
  const tn = (b, T) => {
    if (!b.beforeMatch) return;
    if (b.starts) throw new Error("beforeMatch cannot be used with starts");
    const M = Object.assign({}, b);
    Object.keys(b).forEach((Q) => {
      delete b[Q];
    }), b.keywords = M.keywords, b.begin = _(M.beforeMatch, p(M.begin)), b.starts = {
      relevance: 0,
      contains: [
        Object.assign(M, { endsParent: !0 })
      ]
    }, b.relevance = 0, delete M.beforeMatch;
  }, rn = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], Tn = "keyword";
  function Fn(b, T, M = Tn) {
    const Q = /* @__PURE__ */ Object.create(null);
    return typeof b == "string" ? _e(M, b.split(" ")) : Array.isArray(b) ? _e(M, b) : Object.keys(b).forEach(function(ye) {
      Object.assign(
        Q,
        Fn(b[ye], T, ye)
      );
    }), Q;
    function _e(ye, z) {
      T && (z = z.map((F) => F.toLowerCase())), z.forEach(function(F) {
        const V = F.split("|");
        Q[V[0]] = [ye, Dt(V[0], V[1])];
      });
    }
  }
  function Dt(b, T) {
    return T ? Number(T) : Lt(b) ? 0 : 1;
  }
  function Lt(b) {
    return rn.includes(b.toLowerCase());
  }
  const et = {}, on = (b) => {
    console.error(b);
  }, nt = (b, ...T) => {
    console.log(`WARN: ${b}`, ...T);
  }, N = (b, T) => {
    et[`${b}/${T}`] || (console.log(`Deprecated as of ${b}. ${T}`), et[`${b}/${T}`] = !0);
  }, I = new Error();
  function W(b, T, { key: M }) {
    let Q = 0;
    const _e = b[M], ye = {}, z = {};
    for (let F = 1; F <= T.length; F++)
      z[F + Q] = _e[F], ye[F + Q] = !0, Q += w(T[F - 1]);
    b[M] = z, b[M]._emit = ye, b[M]._multi = !0;
  }
  function te(b) {
    if (Array.isArray(b.begin)) {
      if (b.skip || b.excludeBegin || b.returnBegin)
        throw on("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), I;
      if (typeof b.beginScope != "object" || b.beginScope === null)
        throw on("beginScope must be object"), I;
      W(b, b.begin, { key: "beginScope" }), b.begin = R(b.begin, { joinWith: "" });
    }
  }
  function le(b) {
    if (Array.isArray(b.end)) {
      if (b.skip || b.excludeEnd || b.returnEnd)
        throw on("skip, excludeEnd, returnEnd not compatible with endScope: {}"), I;
      if (typeof b.endScope != "object" || b.endScope === null)
        throw on("endScope must be object"), I;
      W(b, b.end, { key: "endScope" }), b.end = R(b.end, { joinWith: "" });
    }
  }
  function Fe(b) {
    b.scope && typeof b.scope == "object" && b.scope !== null && (b.beginScope = b.scope, delete b.scope);
  }
  function an(b) {
    Fe(b), typeof b.beginScope == "string" && (b.beginScope = { _wrap: b.beginScope }), typeof b.endScope == "string" && (b.endScope = { _wrap: b.endScope }), te(b), le(b);
  }
  function We(b) {
    function T(z, F) {
      return new RegExp(
        d(z),
        "m" + (b.case_insensitive ? "i" : "") + (b.unicodeRegex ? "u" : "") + (F ? "g" : "")
      );
    }
    class M {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(F, V) {
        V.position = this.position++, this.matchIndexes[this.matchAt] = V, this.regexes.push([V, F]), this.matchAt += w(F) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const F = this.regexes.map((V) => V[1]);
        this.matcherRe = T(R(F, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(F) {
        this.matcherRe.lastIndex = this.lastIndex;
        const V = this.matcherRe.exec(F);
        if (!V)
          return null;
        const Se = V.findIndex((zn, Pt) => Pt > 0 && zn !== void 0), ke = this.matchIndexes[Se];
        return V.splice(0, Se), Object.assign(V, ke);
      }
    }
    class Q {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(F) {
        if (this.multiRegexes[F]) return this.multiRegexes[F];
        const V = new M();
        return this.rules.slice(F).forEach(([Se, ke]) => V.addRule(Se, ke)), V.compile(), this.multiRegexes[F] = V, V;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(F, V) {
        this.rules.push([F, V]), V.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(F) {
        const V = this.getMatcher(this.regexIndex);
        V.lastIndex = this.lastIndex;
        let Se = V.exec(F);
        if (this.resumingScanAtSamePosition() && !(Se && Se.index === this.lastIndex)) {
          const ke = this.getMatcher(0);
          ke.lastIndex = this.lastIndex + 1, Se = ke.exec(F);
        }
        return Se && (this.regexIndex += Se.position + 1, this.regexIndex === this.count && this.considerAll()), Se;
      }
    }
    function _e(z) {
      const F = new Q();
      return z.contains.forEach((V) => F.addRule(V.begin, { rule: V, type: "begin" })), z.terminatorEnd && F.addRule(z.terminatorEnd, { type: "end" }), z.illegal && F.addRule(z.illegal, { type: "illegal" }), F;
    }
    function ye(z, F) {
      const V = (
        /** @type CompiledMode */
        z
      );
      if (z.isCompiled) return V;
      [
        Ln,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        Nn,
        an,
        tn
      ].forEach((ke) => ke(z, F)), b.compilerExtensions.forEach((ke) => ke(z, F)), z.__beforeBegin = null, [
        Pn,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        Bn,
        // default to 1 relevance if not specified
        ae
      ].forEach((ke) => ke(z, F)), z.isCompiled = !0;
      let Se = null;
      return typeof z.keywords == "object" && z.keywords.$pattern && (z.keywords = Object.assign({}, z.keywords), Se = z.keywords.$pattern, delete z.keywords.$pattern), Se = Se || /\w+/, z.keywords && (z.keywords = Fn(z.keywords, b.case_insensitive)), V.keywordPatternRe = T(Se, !0), F && (z.begin || (z.begin = /\B|\b/), V.beginRe = T(V.begin), !z.end && !z.endsWithParent && (z.end = /\B|\b/), z.end && (V.endRe = T(V.end)), V.terminatorEnd = d(V.end) || "", z.endsWithParent && F.terminatorEnd && (V.terminatorEnd += (z.end ? "|" : "") + F.terminatorEnd)), z.illegal && (V.illegalRe = T(
        /** @type {RegExp | string} */
        z.illegal
      )), z.contains || (z.contains = []), z.contains = [].concat(...z.contains.map(function(ke) {
        return mn(ke === "self" ? z : ke);
      })), z.contains.forEach(function(ke) {
        ye(
          /** @type Mode */
          ke,
          V
        );
      }), z.starts && ye(z.starts, F), V.matcher = _e(V), V;
    }
    if (b.compilerExtensions || (b.compilerExtensions = []), b.contains && b.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return b.classNameAliases = r(b.classNameAliases || {}), ye(
      /** @type Mode */
      b
    );
  }
  function un(b) {
    return b ? b.endsWithParent || un(b.starts) : !1;
  }
  function mn(b) {
    return b.variants && !b.cachedVariants && (b.cachedVariants = b.variants.map(function(T) {
      return r(b, { variants: null }, T);
    })), b.cachedVariants ? b.cachedVariants : un(b) ? r(b, { starts: b.starts ? r(b.starts) : null }) : Object.isFrozen(b) ? r(b) : b;
  }
  var Oe = "11.11.1";
  class dn extends Error {
    constructor(T, M) {
      super(T), this.name = "HTMLInjectionError", this.html = M;
    }
  }
  const ze = t, Vr = r, Yr = Symbol("nomatch"), Ha = 7, Zr = function(b) {
    const T = /* @__PURE__ */ Object.create(null), M = /* @__PURE__ */ Object.create(null), Q = [];
    let _e = !0;
    const ye = "Could not find the language '{}', did you forget to load/include a language module?", z = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let F = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: u
    };
    function V(O) {
      return F.noHighlightRe.test(O);
    }
    function Se(O) {
      let K = O.className + " ";
      K += O.parentNode ? O.parentNode.className : "";
      const ie = F.languageDetectRe.exec(K);
      if (ie) {
        const me = fn(ie[1]);
        return me || (nt(ye.replace("{}", ie[1])), nt("Falling back to no-highlight mode for this block.", O)), me ? ie[1] : "no-highlight";
      }
      return K.split(/\s+/).find((me) => V(me) || fn(me));
    }
    function ke(O, K, ie) {
      let me = "", xe = "";
      typeof K == "object" ? (me = O, ie = K.ignoreIllegals, xe = K.language) : (N("10.7.0", "highlight(lang, code, ...args) has been deprecated."), N("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), xe = O, me = K), ie === void 0 && (ie = !0);
      const Ve = {
        code: me,
        language: xe
      };
      rt("before:highlight", Ve);
      const pn = Ve.result ? Ve.result : zn(Ve.language, Ve.code, ie);
      return pn.code = Ve.code, rt("after:highlight", pn), pn;
    }
    function zn(O, K, ie, me) {
      const xe = /* @__PURE__ */ Object.create(null);
      function Ve(L, G) {
        return L.keywords[G];
      }
      function pn() {
        if (!j.keywords) {
          Ne.addText(be);
          return;
        }
        let L = 0;
        j.keywordPatternRe.lastIndex = 0;
        let G = j.keywordPatternRe.exec(be), ne = "";
        for (; G; ) {
          ne += be.substring(L, G.index);
          const ce = Xe.case_insensitive ? G[0].toLowerCase() : G[0], Te = Ve(j, ce);
          if (Te) {
            const [sn, os] = Te;
            if (Ne.addText(ne), ne = "", xe[ce] = (xe[ce] || 0) + 1, xe[ce] <= Ha && (at += os), sn.startsWith("_"))
              ne += G[0];
            else {
              const as = Xe.classNameAliases[sn] || sn;
              Ze(G[0], as);
            }
          } else
            ne += G[0];
          L = j.keywordPatternRe.lastIndex, G = j.keywordPatternRe.exec(be);
        }
        ne += be.substring(L), Ne.addText(ne);
      }
      function it() {
        if (be === "") return;
        let L = null;
        if (typeof j.subLanguage == "string") {
          if (!T[j.subLanguage]) {
            Ne.addText(be);
            return;
          }
          L = zn(j.subLanguage, be, !0, ri[j.subLanguage]), ri[j.subLanguage] = /** @type {CompiledMode} */
          L._top;
        } else
          L = Bt(be, j.subLanguage.length ? j.subLanguage : null);
        j.relevance > 0 && (at += L.relevance), Ne.__addSublanguage(L._emitter, L.language);
      }
      function Ue() {
        j.subLanguage != null ? it() : pn(), be = "";
      }
      function Ze(L, G) {
        L !== "" && (Ne.startScope(G), Ne.addText(L), Ne.endScope());
      }
      function Jr(L, G) {
        let ne = 1;
        const ce = G.length - 1;
        for (; ne <= ce; ) {
          if (!L._emit[ne]) {
            ne++;
            continue;
          }
          const Te = Xe.classNameAliases[L[ne]] || L[ne], sn = G[ne];
          Te ? Ze(sn, Te) : (be = sn, pn(), be = ""), ne++;
        }
      }
      function ei(L, G) {
        return L.scope && typeof L.scope == "string" && Ne.openNode(Xe.classNameAliases[L.scope] || L.scope), L.beginScope && (L.beginScope._wrap ? (Ze(be, Xe.classNameAliases[L.beginScope._wrap] || L.beginScope._wrap), be = "") : L.beginScope._multi && (Jr(L.beginScope, G), be = "")), j = Object.create(L, { parent: { value: j } }), j;
      }
      function ni(L, G, ne) {
        let ce = S(L.endRe, ne);
        if (ce) {
          if (L["on:end"]) {
            const Te = new n(L);
            L["on:end"](G, Te), Te.isMatchIgnored && (ce = !1);
          }
          if (ce) {
            for (; L.endsParent && L.parent; )
              L = L.parent;
            return L;
          }
        }
        if (L.endsWithParent)
          return ni(L.parent, G, ne);
      }
      function es(L) {
        return j.matcher.regexIndex === 0 ? (be += L[0], 1) : ($t = !0, 0);
      }
      function ns(L) {
        const G = L[0], ne = L.rule, ce = new n(ne), Te = [ne.__beforeBegin, ne["on:begin"]];
        for (const sn of Te)
          if (sn && (sn(L, ce), ce.isMatchIgnored))
            return es(G);
        return ne.skip ? be += G : (ne.excludeBegin && (be += G), Ue(), !ne.returnBegin && !ne.excludeBegin && (be = G)), ei(ne, L), ne.returnBegin ? 0 : G.length;
      }
      function ts(L) {
        const G = L[0], ne = K.substring(L.index), ce = ni(j, L, ne);
        if (!ce)
          return Yr;
        const Te = j;
        j.endScope && j.endScope._wrap ? (Ue(), Ze(G, j.endScope._wrap)) : j.endScope && j.endScope._multi ? (Ue(), Jr(j.endScope, L)) : Te.skip ? be += G : (Te.returnEnd || Te.excludeEnd || (be += G), Ue(), Te.excludeEnd && (be = G));
        do
          j.scope && Ne.closeNode(), !j.skip && !j.subLanguage && (at += j.relevance), j = j.parent;
        while (j !== ce.parent);
        return ce.starts && ei(ce.starts, L), Te.returnEnd ? 0 : G.length;
      }
      function rs() {
        const L = [];
        for (let G = j; G !== Xe; G = G.parent)
          G.scope && L.unshift(G.scope);
        L.forEach((G) => Ne.openNode(G));
      }
      let ot = {};
      function ti(L, G) {
        const ne = G && G[0];
        if (be += L, ne == null)
          return Ue(), 0;
        if (ot.type === "begin" && G.type === "end" && ot.index === G.index && ne === "") {
          if (be += K.slice(G.index, G.index + 1), !_e) {
            const ce = new Error(`0 width match regex (${O})`);
            throw ce.languageName = O, ce.badRule = ot.rule, ce;
          }
          return 1;
        }
        if (ot = G, G.type === "begin")
          return ns(G);
        if (G.type === "illegal" && !ie) {
          const ce = new Error('Illegal lexeme "' + ne + '" for mode "' + (j.scope || "<unnamed>") + '"');
          throw ce.mode = j, ce;
        } else if (G.type === "end") {
          const ce = ts(G);
          if (ce !== Yr)
            return ce;
        }
        if (G.type === "illegal" && ne === "")
          return be += `
`, 1;
        if (Ut > 1e5 && Ut > G.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return be += ne, ne.length;
      }
      const Xe = fn(O);
      if (!Xe)
        throw on(ye.replace("{}", O)), new Error('Unknown language: "' + O + '"');
      const is = We(Xe);
      let zt = "", j = me || is;
      const ri = {}, Ne = new F.__emitter(F);
      rs();
      let be = "", at = 0, bn = 0, Ut = 0, $t = !1;
      try {
        if (Xe.__emitTokens)
          Xe.__emitTokens(K, Ne);
        else {
          for (j.matcher.considerAll(); ; ) {
            Ut++, $t ? $t = !1 : j.matcher.considerAll(), j.matcher.lastIndex = bn;
            const L = j.matcher.exec(K);
            if (!L) break;
            const G = K.substring(bn, L.index), ne = ti(G, L);
            bn = L.index + ne;
          }
          ti(K.substring(bn));
        }
        return Ne.finalize(), zt = Ne.toHTML(), {
          language: O,
          value: zt,
          relevance: at,
          illegal: !1,
          _emitter: Ne,
          _top: j
        };
      } catch (L) {
        if (L.message && L.message.includes("Illegal"))
          return {
            language: O,
            value: ze(K),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: L.message,
              index: bn,
              context: K.slice(bn - 100, bn + 100),
              mode: L.mode,
              resultSoFar: zt
            },
            _emitter: Ne
          };
        if (_e)
          return {
            language: O,
            value: ze(K),
            illegal: !1,
            relevance: 0,
            errorRaised: L,
            _emitter: Ne,
            _top: j
          };
        throw L;
      }
    }
    function Pt(O) {
      const K = {
        value: ze(O),
        illegal: !1,
        relevance: 0,
        _top: z,
        _emitter: new F.__emitter(F)
      };
      return K._emitter.addText(O), K;
    }
    function Bt(O, K) {
      K = K || F.languages || Object.keys(T);
      const ie = Pt(O), me = K.filter(fn).filter(jr).map(
        (Ue) => zn(Ue, O, !1)
      );
      me.unshift(ie);
      const xe = me.sort((Ue, Ze) => {
        if (Ue.relevance !== Ze.relevance) return Ze.relevance - Ue.relevance;
        if (Ue.language && Ze.language) {
          if (fn(Ue.language).supersetOf === Ze.language)
            return 1;
          if (fn(Ze.language).supersetOf === Ue.language)
            return -1;
        }
        return 0;
      }), [Ve, pn] = xe, it = Ve;
      return it.secondBest = pn, it;
    }
    function Ga(O, K, ie) {
      const me = K && M[K] || ie;
      O.classList.add("hljs"), O.classList.add(`language-${me}`);
    }
    function Ft(O) {
      let K = null;
      const ie = Se(O);
      if (V(ie)) return;
      if (rt(
        "before:highlightElement",
        { el: O, language: ie }
      ), O.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", O);
        return;
      }
      if (O.children.length > 0 && (F.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(O)), F.throwUnescapedHTML))
        throw new dn(
          "One of your code blocks includes unescaped HTML.",
          O.innerHTML
        );
      K = O;
      const me = K.textContent, xe = ie ? ke(me, { language: ie, ignoreIllegals: !0 }) : Bt(me);
      O.innerHTML = xe.value, O.dataset.highlighted = "yes", Ga(O, ie, xe.language), O.result = {
        language: xe.language,
        // TODO: remove with version 11.0
        re: xe.relevance,
        relevance: xe.relevance
      }, xe.secondBest && (O.secondBest = {
        language: xe.secondBest.language,
        relevance: xe.secondBest.relevance
      }), rt("after:highlightElement", { el: O, result: xe, text: me });
    }
    function Ka(O) {
      F = Vr(F, O);
    }
    const qa = () => {
      tt(), N("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Wa() {
      tt(), N("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Xr = !1;
    function tt() {
      function O() {
        tt();
      }
      if (document.readyState === "loading") {
        Xr || window.addEventListener("DOMContentLoaded", O, !1), Xr = !0;
        return;
      }
      document.querySelectorAll(F.cssSelector).forEach(Ft);
    }
    function Va(O, K) {
      let ie = null;
      try {
        ie = K(b);
      } catch (me) {
        if (on("Language definition for '{}' could not be registered.".replace("{}", O)), _e)
          on(me);
        else
          throw me;
        ie = z;
      }
      ie.name || (ie.name = O), T[O] = ie, ie.rawDefinition = K.bind(null, b), ie.aliases && Qr(ie.aliases, { languageName: O });
    }
    function Ya(O) {
      delete T[O];
      for (const K of Object.keys(M))
        M[K] === O && delete M[K];
    }
    function Za() {
      return Object.keys(T);
    }
    function fn(O) {
      return O = (O || "").toLowerCase(), T[O] || T[M[O]];
    }
    function Qr(O, { languageName: K }) {
      typeof O == "string" && (O = [O]), O.forEach((ie) => {
        M[ie.toLowerCase()] = K;
      });
    }
    function jr(O) {
      const K = fn(O);
      return K && !K.disableAutodetect;
    }
    function Xa(O) {
      O["before:highlightBlock"] && !O["before:highlightElement"] && (O["before:highlightElement"] = (K) => {
        O["before:highlightBlock"](
          Object.assign({ block: K.el }, K)
        );
      }), O["after:highlightBlock"] && !O["after:highlightElement"] && (O["after:highlightElement"] = (K) => {
        O["after:highlightBlock"](
          Object.assign({ block: K.el }, K)
        );
      });
    }
    function Qa(O) {
      Xa(O), Q.push(O);
    }
    function ja(O) {
      const K = Q.indexOf(O);
      K !== -1 && Q.splice(K, 1);
    }
    function rt(O, K) {
      const ie = O;
      Q.forEach(function(me) {
        me[ie] && me[ie](K);
      });
    }
    function Ja(O) {
      return N("10.7.0", "highlightBlock will be removed entirely in v12.0"), N("10.7.0", "Please use highlightElement now."), Ft(O);
    }
    Object.assign(b, {
      highlight: ke,
      highlightAuto: Bt,
      highlightAll: tt,
      highlightElement: Ft,
      // TODO: Remove with v12 API
      highlightBlock: Ja,
      configure: Ka,
      initHighlighting: qa,
      initHighlightingOnLoad: Wa,
      registerLanguage: Va,
      unregisterLanguage: Ya,
      listLanguages: Za,
      getLanguage: fn,
      registerAliases: Qr,
      autoDetection: jr,
      inherit: Vr,
      addPlugin: Qa,
      removePlugin: ja
    }), b.debugMode = function() {
      _e = !1;
    }, b.safeMode = function() {
      _e = !0;
    }, b.versionString = Oe, b.regex = {
      concat: _,
      lookahead: p,
      either: h,
      optional: g,
      anyNumberOfTimes: f
    };
    for (const O in Be)
      typeof Be[O] == "object" && e(Be[O]);
    return Object.assign(b, Be), b;
  }, An = Zr({});
  return An.newInstance = () => Zr({}), cr = An, An.HighlightJS = An, An.default = An, cr;
}
var $m = /* @__PURE__ */ Um();
const Hm = /* @__PURE__ */ Cr($m), co = {}, Gm = "hljs-";
function Km(e) {
  const n = Hm.newInstance();
  return e && a(e), {
    highlight: t,
    highlightAuto: r,
    listLanguages: o,
    register: a,
    registerAlias: i,
    registered: s
  };
  function t(c, l, u) {
    const d = u || co, p = typeof d.prefix == "string" ? d.prefix : Gm;
    if (!n.getLanguage(c))
      throw new Error("Unknown language: `" + c + "` is not registered");
    n.configure({ __emitter: qm, classPrefix: p });
    const f = (
      /** @type {HighlightResult & {_emitter: HastEmitter}} */
      n.highlight(l, { ignoreIllegals: !0, language: c })
    );
    if (f.errorRaised)
      throw new Error("Could not highlight with `Highlight.js`", {
        cause: f.errorRaised
      });
    const g = f._emitter.root, _ = (
      /** @type {RootData} */
      g.data
    );
    return _.language = f.language, _.relevance = f.relevance, g;
  }
  function r(c, l) {
    const d = (l || co).subset || o();
    let p = -1, f = 0, g;
    for (; ++p < d.length; ) {
      const _ = d[p];
      if (!n.getLanguage(_)) continue;
      const y = t(_, c, l);
      y.data && y.data.relevance !== void 0 && y.data.relevance > f && (f = y.data.relevance, g = y);
    }
    return g || {
      type: "root",
      children: [],
      data: { language: void 0, relevance: f }
    };
  }
  function o() {
    return n.listLanguages();
  }
  function a(c, l) {
    if (typeof c == "string")
      n.registerLanguage(c, l);
    else {
      let u;
      for (u in c)
        Object.hasOwn(c, u) && n.registerLanguage(u, c[u]);
    }
  }
  function i(c, l) {
    if (typeof c == "string")
      n.registerAliases(
        // Note: copy needed because hljs doesn’t accept readonly arrays yet.
        typeof l == "string" ? l : [...l],
        { languageName: c }
      );
    else {
      let u;
      for (u in c)
        if (Object.hasOwn(c, u)) {
          const d = c[u];
          n.registerAliases(
            // Note: copy needed because hljs doesn’t accept readonly arrays yet.
            typeof d == "string" ? d : [...d],
            { languageName: u }
          );
        }
    }
  }
  function s(c) {
    return !!n.getLanguage(c);
  }
}
class qm {
  /**
   * @param {Readonly<HljsOptions>} options
   *   Configuration.
   * @returns
   *   Instance.
   */
  constructor(n) {
    this.options = n, this.root = {
      type: "root",
      children: [],
      data: { language: void 0, relevance: 0 }
    }, this.stack = [this.root];
  }
  /**
   * @param {string} value
   *   Text to add.
   * @returns {undefined}
   *   Nothing.
   *
   */
  addText(n) {
    if (n === "") return;
    const t = this.stack[this.stack.length - 1], r = t.children[t.children.length - 1];
    r && r.type === "text" ? r.value += n : t.children.push({ type: "text", value: n });
  }
  /**
   *
   * @param {unknown} rawName
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */
  startScope(n) {
    this.openNode(String(n));
  }
  /**
   * @returns {undefined}
   *   Nothing.
   */
  endScope() {
    this.closeNode();
  }
  /**
   * @param {HastEmitter} other
   *   Other emitter.
   * @param {string} name
   *   Name of the sublanguage.
   * @returns {undefined}
   *   Nothing.
   */
  __addSublanguage(n, t) {
    const r = this.stack[this.stack.length - 1], o = (
      /** @type {Array<ElementContent>} */
      n.root.children
    );
    t ? r.children.push({
      type: "element",
      tagName: "span",
      properties: { className: [t] },
      children: o
    }) : r.children.push(...o);
  }
  /**
   * @param {string} name
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */
  openNode(n) {
    const t = this, r = n.split(".").map(function(i, s) {
      return s ? i + "_".repeat(s) : t.options.classPrefix + i;
    }), o = this.stack[this.stack.length - 1], a = {
      type: "element",
      tagName: "span",
      properties: { className: r },
      children: []
    };
    o.children.push(a), this.stack.push(a);
  }
  /**
   * @returns {undefined}
   *   Nothing.
   */
  closeNode() {
    this.stack.pop();
  }
  /**
   * @returns {undefined}
   *   Nothing.
   */
  finalize() {
  }
  /**
   * @returns {string}
   *   Nothing.
   */
  toHTML() {
    return "";
  }
}
const Wm = {};
function Vm(e) {
  const n = e || Wm, t = n.aliases, r = n.detect || !1, o = n.languages || zm, a = n.plainText, i = n.prefix, s = n.subset;
  let c = "hljs";
  const l = Km(o);
  if (t && l.registerAlias(t), i) {
    const u = i.indexOf("-");
    c = u === -1 ? i : i.slice(0, u);
  }
  return function(u, d) {
    Mt(u, "element", function(p, f, g) {
      if (p.tagName !== "code" || !g || g.type !== "element" || g.tagName !== "pre")
        return;
      const _ = Ym(p);
      if (_ === !1 || !_ && !r || _ && a && a.includes(_))
        return;
      Array.isArray(p.properties.className) || (p.properties.className = []), p.properties.className.includes(c) || p.properties.className.unshift(c);
      const y = fh(p, { whitespace: "pre" });
      let h;
      try {
        h = _ ? l.highlight(_, y, { prefix: i }) : l.highlightAuto(y, { prefix: i, subset: s });
      } catch (w) {
        const S = (
          /** @type {Error} */
          w
        );
        if (_ && /Unknown language/.test(S.message)) {
          d.message(
            "Cannot highlight as `" + _ + "`, it’s not registered",
            {
              ancestors: [g, p],
              cause: S,
              place: p.position,
              ruleId: "missing-language",
              source: "rehype-highlight"
            }
          );
          return;
        }
        throw S;
      }
      !_ && h.data && h.data.language && p.properties.className.push("language-" + h.data.language), h.children.length > 0 && (p.children = /** @type {Array<ElementContent>} */
      h.children);
    });
  };
}
function Ym(e) {
  const n = e.properties.className;
  let t = -1;
  if (!Array.isArray(n))
    return;
  let r;
  for (; ++t < n.length; ) {
    const o = String(n[t]);
    if (o === "no-highlight" || o === "nohighlight")
      return !1;
    !r && o.slice(0, 5) === "lang-" && (r = o.slice(5)), !r && o.slice(0, 9) === "language-" && (r = o.slice(9));
  }
  return r;
}
function Zm({ slide: e }) {
  return /* @__PURE__ */ De("div", { className: "slide", children: [
    /* @__PURE__ */ ee("h2", { className: "slide__title", children: e.title }),
    /* @__PURE__ */ ee("div", { className: "slide__body", children: /* @__PURE__ */ ee(
      Wf,
      {
        remarkPlugins: [oh],
        rehypePlugins: [[Vm, { detect: !0, ignoreMissing: !0 }]],
        children: e.body
      }
    ) })
  ] });
}
const At = 1920, Nr = 1080, $a = 1120, Xm = At - $a;
function Qm() {
  const [e, n] = Et(1);
  return mt(() => {
    const t = () => n(Math.min(window.innerWidth / At, window.innerHeight / Nr));
    return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
  }, []), e;
}
function pb({ course: e, getScene: n, audioBase: t }) {
  const r = Qm(), o = e.sections, a = yn(
    () => typeof window < "u" && new URLSearchParams(window.location.search).has("capture"),
    []
  ), [i, s] = Et({ section: 0, beat: 0 }), [c, l] = Et(0), u = o[i.section], d = u ? n(u.scene) : void 0, p = yn(
    () => u ? il(o, i) : null,
    [o, i, u]
  ), f = yn(() => u ? ol(u) : [], [u]), g = !a && u ? `${t}/${u.id}-${i.beat}.wav` : void 0, { toggle: _, stop: y } = Dl(
    g,
    () => s((h) => {
      const w = Gt(o, h, 1);
      return w.section === h.section && w.beat === h.beat && y(), w;
    })
  );
  return mt(() => {
    if (a) return;
    const h = (w) => {
      o.length && (w.key === "ArrowRight" ? s((S) => Gt(o, S, 1)) : w.key === "ArrowLeft" ? s((S) => Gt(o, S, -1)) : w.key === " " && (w.preventDefault(), _()));
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }), mt(() => {
    if (a)
      return window.__captureReady = !1, window.__capture = {
        plan: () => o.map((h, w) => ({ section: w, id: h.id, scene: h.scene, beats: h.beats.length })),
        seek: (h, w) => {
          window.__captureReady = !1, l(0), s({ section: h, beat: w });
        },
        transition: (h, w, S) => {
          window.__captureReady = !1, l(S), s({ section: h, beat: w });
        }
      }, () => {
        delete window.__capture;
      };
  }, [a, o]), mt(() => {
    if (!a) return;
    window.__captureReady = !1;
    let h = 0;
    const w = requestAnimationFrame(() => {
      h = requestAnimationFrame(() => {
        window.__captureReady = !0;
      });
    });
    return () => {
      cancelAnimationFrame(w), cancelAnimationFrame(h);
    };
  }, [a, i]), u ? /* @__PURE__ */ ee("div", { className: "rp-root", children: /* @__PURE__ */ ee("div", { style: { width: At * r, height: Nr * r }, children: /* @__PURE__ */ De(
    "div",
    {
      className: "rp-stage",
      style: {
        width: At,
        height: Nr,
        transform: `scale(${r})`,
        transformOrigin: "top left"
      },
      children: [
        /* @__PURE__ */ ee("div", { className: "rp-scene-pane", style: { width: $a }, children: d && /* @__PURE__ */ ee(Ml, { scene: d, reveal: p, focus: f, fitMs: a ? c : void 0 }) }),
        /* @__PURE__ */ ee("div", { className: "rp-slide-pane", style: { width: Xm }, children: /* @__PURE__ */ ee(Zm, { slide: u.slide }) })
      ]
    }
  ) }) }) : null;
}
export {
  ob as BLUE,
  dr as EDGE,
  uo as GRAY,
  ab as GREEN,
  sb as ORANGE,
  lb as PURPLE,
  ub as RED,
  pb as RevealPlayer,
  Ml as SceneViewer,
  Zm as SlidePane,
  cb as TEAL,
  db as YELLOW,
  tb as container,
  vt as edgeKey,
  js as getIcon,
  rb as group,
  el as resolveGrid,
  tl as revealAt,
  il as revealForPosition,
  al as sceneNodeIds,
  rl as sceneRunStart,
  Gt as step,
  yt as tracks,
  Dl as useNarration,
  fb as validateCourse,
  ib as wgrid
};
