import { Key as ls, GitBranch as cs, Table as us, Terminal as ds, ScrollText as fs, Box as ps, ShieldCheck as gs, Users as hs, KeyRound as ms, Layers as bs, Clock as _s, Workflow as Es, MemoryStick as ys, HardDrive as ks, Server as ws, AppWindow as xs, Share2 as Ss, Webhook as Ns, Plug as Ts, Copy as As, DownloadCloud as vs, Network as Cs, Radio as Is, Cloud as Os, File as Rs, Zap as Ms, Image as Ls, Braces as Ds, Waves as Ps, Cpu as Bs, Cog as Fs, Filter as zs, Brain as Us, FileBarChart as $s, BarChart3 as Hs, Database as Gs } from "lucide-react";
import { jsx as K, jsxs as Ne, Fragment as Tr } from "react/jsx-runtime";
import { useMemo as hn, useEffect as ur, useRef as Ht, useState as Et, useLayoutEffect as bt } from "react";
import { MarkerType as Ks, Handle as Rn, Position as ve, useInternalNode as oi, useStore as qs, getSmoothStepPath as Ws, getBezierPath as Vs, BaseEdge as Ys, EdgeLabelRenderer as Zs, ReactFlow as Xs, useReactFlow as Qs } from "@xyflow/react";
const ob = (e, n) => ({ ...e, kind: "container", cell: [0, 0], layout: n.grid, children: n.nodes }), ab = (e, n) => ({
  id: e,
  label: "",
  kind: "group",
  cell: [0, 0],
  layout: n.grid,
  children: n.nodes
}), sb = (e, n) => ({
  grid: e,
  nodes: n.map(({ node: t, at: r }) => ({ ...t, cell: r }))
}), lb = "#5b8cff", cb = "#37d39a", ub = "#ff7a59", db = "#b98bff", fb = "#3fd0d6", pb = "#ff5d6c", fo = "#9aa3b2", gb = "#d9b84a", dr = "#5b6270", js = {
  database: Gs,
  barChart: Hs,
  report: $s,
  brain: Us,
  funnel: zs,
  gears: Fs,
  engine: Bs,
  lake: Ps,
  json: Ds,
  image: Ls,
  streaming: Ms,
  file: Rs,
  cloud: Os,
  stream: Is,
  federation: Cs,
  autoload: vs,
  copy: As,
  plug: Ts,
  api: Ns,
  share: Ss,
  app: xs,
  server: ws,
  disk: ks,
  memory: ys,
  workflow: Es,
  clock: _s,
  layers: bs,
  key: ms,
  users: hs,
  shield: gs,
  box: ps,
  scroll: fs,
  terminal: ds,
  table: us,
  branch: cs,
  surrogateKey: ls
}, Ar = (e) => e ? js[e] : void 0, Js = 6;
function el(e, n, t) {
  const r = {};
  return po(e, n, { x: 0, y: 0, w: t.width, h: t.height }, r), r;
}
const yt = (e) => Array.isArray(e) ? e : Array.from({ length: e }, () => 1), fr = (e) => e.reduce((n, t) => n + t, 0), nl = (e) => e.reduce((n, t) => [...n, n[n.length - 1] + t], [0]);
function ai(e, n, t, r) {
  const o = fr(e) + 2 * r + (e.length - 1) * t, a = n / o, i = e.map((s) => s * a);
  return { unit: a, sizes: i, before: nl(i) };
}
function po(e, n, t, r) {
  var p;
  const { gap: o = 0.2, padding: a = 0.4 } = n, i = ai(yt(n.cols), t.w, o, a), s = ai(yt(n.rows), t.h, o, a), c = i.unit * o, l = s.unit * o, u = i.unit * a, d = s.unit * a;
  for (const f of e) {
    const [g, E, y = 1, _ = 1] = f.cell, x = {
      x: t.x + u + i.before[g] + g * c,
      y: t.y + d + s.before[E] + E * l,
      w: fr(i.sizes.slice(g, g + y)) + (y - 1) * c,
      h: fr(s.sizes.slice(E, E + _)) + (_ - 1) * l
    };
    if (r[f.id] = x, (p = f.children) != null && p.length && f.layout) {
      const k = f.kind === "container" ? Js : 0, A = { x: x.x + k, y: x.y + k, w: x.w - 2 * k, h: x.h - 2 * k };
      po(f.children, f.layout, A, r);
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
function hb(e, n) {
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
function go(e) {
  var t;
  const n = [];
  for (const r of e)
    n.push(r), (t = r.children) != null && t.length && n.push(...go(r.children));
  return n;
}
function ul(e, n, t, r, o) {
  const a = !!o && o.size > 0;
  return go(e.nodes).map((i) => {
    const s = n[i.id], c = r ? r.has(i.id) : !0, l = a ? o.has(i.id) : !0, u = i.kind ?? "symbol", d = u === "symbol" || u === "term" || u === "code" || u === "table";
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
        columns: i.columns,
        rows: i.rows,
        iconInline: i.iconInline,
        mono: i.mono,
        vertical: i.vertical,
        color: i.color ?? fo,
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
      markerEnd: { type: Ks.ArrowClosed, color: dr }
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
function pl(e, n, t, r, o) {
  const a = Math.max(o - 8, 6) / ((n + 1) * 2), i = Math.max(r - 16, 6) / (Math.max(t, 1) * 0.62 + e * 1.8);
  return Math.max(9, Math.min(a, i, 28));
}
function gl(e, n, t, r = 1) {
  const o = Math.max(n - 8, 6) / (Math.max(e, 1) * 0.62), a = Math.max(t - 10, 6) / (r * 1.8);
  return Math.max(9, Math.min(o, a, 24));
}
function hl(e, n) {
  const r = Math.max(n - 8, 6) / (Math.max(e.length, 1) * 0.86);
  return Math.max(4, Math.min(r, 16));
}
const ml = /* @__PURE__ */ new Set([
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
  "and",
  "or",
  "not",
  "null",
  "true",
  "false",
  "is",
  // SQL clauses + common verbs (so a multi-line query reads as coloured source)
  "select",
  "where",
  "group",
  "by",
  "join",
  "inner",
  "left",
  "right",
  "full",
  "outer",
  "cross",
  "on",
  "using",
  "having",
  "order",
  "asc",
  "desc",
  "limit",
  "offset",
  "distinct",
  "with",
  "recursive",
  "union",
  "intersect",
  "except",
  "all",
  "insert",
  "into",
  "values",
  "update",
  "set",
  "delete",
  "over",
  "partition",
  "between",
  "like",
  "exists",
  "case",
  "when",
  "then",
  "end",
  "count",
  "sum",
  "avg",
  "min",
  "max"
]), bl = (e) => /[A-Za-z_]/.test(e), _l = (e) => /[A-Za-z0-9_]/.test(e), si = (e) => /[0-9]/.test(e);
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
    if (a === "-" && e[t + 1] === "-" || a === "#") {
      o("comment", e.slice(t));
      break;
    }
    if (a === "'" || a === '"') {
      let i = t + 1;
      for (; i < e.length && e[i] !== a; ) i++;
      i = Math.min(i + 1, e.length), o("string", e.slice(t, i)), t = i;
      continue;
    }
    if (si(a)) {
      let i = t + 1;
      for (; i < e.length && (si(e[i]) || e[i] === "."); ) i++;
      o("number", e.slice(t, i)), t = i;
      continue;
    }
    if (bl(a)) {
      let i = t + 1;
      for (; i < e.length && _l(e[i]); ) i++;
      const s = e.slice(t, i), c = r ? "method" : ml.has(s.toLowerCase()) ? "keyword" : "var";
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
function yl(e, n = 2) {
  const t = e.replace(/[^a-zA-Z0-9]/g, "");
  return t ? t.charAt(0).toUpperCase() + t.slice(1, n).toLowerCase() : "";
}
function ho({ data: e }) {
  const n = e;
  if (n.kind === "group")
    return /* @__PURE__ */ K("div", { className: "scene-node scene-node--group", style: { width: n.width, height: n.height } });
  const t = n.ghosted ? " scene-node--ghost" : n.highlighted ? " scene-node--lit" : n.dimmed ? " scene-node--dimmed" : "", r = n.direction === "horizontal";
  if (n.kind === "code") return /* @__PURE__ */ K(kl, { d: n, state: t, horizontal: r });
  if (n.kind === "table") return /* @__PURE__ */ K(xl, { d: n, state: t, horizontal: r });
  if (n.kind === "symbol" && n.vertical) return /* @__PURE__ */ K(wl, { d: n, state: t });
  const o = n.kind === "container", a = n.kind === "symbol" && !!n.mono, i = n.kind === "symbol" || o ? Ar(n.icon) : void 0, s = Math.max(18, Math.min(Math.min(n.width, n.height) * 0.4, 48)), c = !!((i || a) && n.iconInline), l = n.kind === "term" && !!n.type, u = c ? Math.max(24, n.width - s - 12) : l ? Math.max(24, n.width * 0.6) : n.width, d = c ? 0 : a ? s + 4 : i ? s + 5 : 0, p = n.sub ? 16 : 0, f = o ? hl(n.label, n.width) : fl(n.label, u, n.height, n.kind, d + p);
  return /* @__PURE__ */ Ne(
    "div",
    {
      className: `scene-node scene-node--${n.kind}${a ? " scene-node--mono" : ""}${c ? " scene-node--iconh" : ""}${t}`,
      style: { width: n.width, height: n.height, "--node-color": n.color },
      children: [
        /* @__PURE__ */ K(Rn, { type: "target", position: r ? ve.Left : ve.Top, className: "scene-handle", isConnectable: !1 }),
        o ? /* @__PURE__ */ Ne("span", { className: "scene-node__title", style: { fontSize: f }, children: [
          i && /* @__PURE__ */ K(i, { className: "scene-node__title-icon", size: Math.round(f * 1.25), strokeWidth: 1.75 }),
          n.label
        ] }) : /* @__PURE__ */ Ne(Tr, { children: [
          a ? /* @__PURE__ */ K("span", { className: "scene-node__mono", style: { width: s, height: s, fontSize: s * 0.42 }, children: i ? /* @__PURE__ */ K(i, { size: s * 0.6, strokeWidth: 2 }) : yl(n.label) }) : i && /* @__PURE__ */ K(i, { className: "scene-node__icon", size: s, strokeWidth: 1.75 }),
          l ? /* @__PURE__ */ Ne("span", { className: "scene-node__row", children: [
            /* @__PURE__ */ K("span", { className: "scene-node__label", style: { fontSize: f }, children: n.label }),
            /* @__PURE__ */ K("span", { className: "scene-node__type", style: { fontSize: f * 0.82 }, children: n.type })
          ] }) : /* @__PURE__ */ K("span", { className: "scene-node__label", style: { fontSize: f }, children: n.label }),
          n.sub && /* @__PURE__ */ K("span", { className: "scene-node__sub", children: n.sub })
        ] }),
        /* @__PURE__ */ K(Rn, { type: "source", position: r ? ve.Right : ve.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
ho.defaultColor = fo;
function kl({ d: e, state: n, horizontal: t }) {
  const r = e.label.split(`
`), o = e.sub ? e.sub.length + 2 : 0, a = Math.max(o, ...r.map((u) => u.length)), i = r.length + (e.sub ? 1 : 0), s = Math.max(20, Math.min(e.height * 0.18, 34)), l = gl(a, e.width - 30 - 26, e.height - s - 36, i);
  return /* @__PURE__ */ Ne(
    "div",
    {
      className: `scene-node scene-node--code${n}`,
      style: { width: e.width, height: e.height, "--node-color": e.color },
      children: [
        /* @__PURE__ */ K(Rn, { type: "target", position: t ? ve.Left : ve.Top, className: "scene-handle", isConnectable: !1 }),
        /* @__PURE__ */ Ne("div", { className: "scene-node__code-bar", style: { height: s }, children: [
          /* @__PURE__ */ Ne("span", { className: "scene-node__code-dots", children: [
            /* @__PURE__ */ K("i", { style: { background: "#ff5f56" } }),
            /* @__PURE__ */ K("i", { style: { background: "#ffbd2e" } }),
            /* @__PURE__ */ K("i", { style: { background: "#27c93f" } })
          ] }),
          e.filename && /* @__PURE__ */ K("span", { className: "scene-node__code-file", children: e.filename })
        ] }),
        /* @__PURE__ */ Ne("div", { className: "scene-node__code-body", style: { fontSize: l }, children: [
          r.map((u, d) => /* @__PURE__ */ Ne("div", { className: "scene-node__code-line", children: [
            /* @__PURE__ */ K("span", { className: "scene-node__code-gutter", children: d + 1 }),
            /* @__PURE__ */ K("span", { className: "scene-node__code-src", children: El(u).map((p, f) => /* @__PURE__ */ K("span", { className: `tok-${p.cls}`, children: p.text }, f)) })
          ] }, d)),
          e.sub && /* @__PURE__ */ Ne("div", { className: "scene-node__code-line", children: [
            /* @__PURE__ */ K("span", { className: "scene-node__code-gutter" }),
            /* @__PURE__ */ K("span", { className: "scene-node__code-src tok-comment", children: `# ${e.sub}` })
          ] })
        ] }),
        /* @__PURE__ */ K(Rn, { type: "source", position: t ? ve.Right : ve.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
function wl({ d: e, state: n }) {
  const t = Ar(e.icon), r = Math.max(15, Math.min(e.width * 0.42, 26)), o = Math.max(e.height - (t ? r + 20 : 20), 20), a = Math.max(1, e.label.length), i = Math.max(9, Math.min(o / (a * 0.62), e.width * 0.5, 22));
  return /* @__PURE__ */ Ne(
    "div",
    {
      className: `scene-node scene-node--vtab${n}`,
      style: { width: e.width, height: e.height, "--node-color": e.color },
      children: [
        t && /* @__PURE__ */ K(t, { className: "scene-node__vtab-icon", size: r, strokeWidth: 1.75 }),
        /* @__PURE__ */ K("span", { className: "scene-node__vtab-label", style: { fontSize: i }, children: e.label })
      ]
    }
  );
}
function xl({ d: e, state: n, horizontal: t }) {
  const r = e.columns ?? [], o = e.rows ?? [], a = Ar(e.icon), i = Math.max(22, Math.min(e.height * 0.16, 40)), s = Math.max(r.join("   ").length, ...o.map((l) => l.join("   ").length), 1), c = pl(r.length, o.length, s, e.width, e.height - i);
  return /* @__PURE__ */ Ne(
    "div",
    {
      className: `scene-node scene-node--table${n}`,
      style: { width: e.width, height: e.height, "--node-color": e.color },
      children: [
        /* @__PURE__ */ K(Rn, { type: "target", position: t ? ve.Left : ve.Top, className: "scene-handle", isConnectable: !1 }),
        /* @__PURE__ */ Ne("div", { className: "scene-node__table-title", style: { height: i }, children: [
          a && /* @__PURE__ */ K(a, { className: "scene-node__title-icon", size: Math.round(i * 0.5), strokeWidth: 1.75 }),
          e.label
        ] }),
        /* @__PURE__ */ K("div", { className: "scene-node__table-wrap", style: { fontSize: c }, children: /* @__PURE__ */ Ne("table", { className: "scene-node__table", children: [
          /* @__PURE__ */ K("thead", { children: /* @__PURE__ */ K("tr", { children: r.map((l, u) => /* @__PURE__ */ K("th", { children: l }, u)) }) }),
          /* @__PURE__ */ K("tbody", { children: o.map((l, u) => /* @__PURE__ */ K("tr", { children: l.map((d, p) => /* @__PURE__ */ K("td", { children: d }, p)) }, u)) })
        ] }) }),
        /* @__PURE__ */ K(Rn, { type: "source", position: t ? ve.Right : ve.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
const Sl = 13, Nl = 8, Tl = 13, Al = (e) => Math.max(Nl, Math.min(Tl, Sl * e));
function li(e, n) {
  const t = (e.measured.width ?? 0) / 2, r = (e.measured.height ?? 0) / 2, o = e.internals.positionAbsolute.x + t, a = e.internals.positionAbsolute.y + r, i = n.internals.positionAbsolute.x + (n.measured.width ?? 0) / 2, s = n.internals.positionAbsolute.y + (n.measured.height ?? 0) / 2, c = (i - o) / (2 * t) - (s - a) / (2 * r), l = (i - o) / (2 * t) + (s - a) / (2 * r), u = 1 / (Math.abs(c) + Math.abs(l) || 1);
  return { x: t * (u * c + u * l) + o, y: r * (-u * c + u * l) + a };
}
function ci(e, n) {
  const t = e.internals.positionAbsolute.x, r = e.internals.positionAbsolute.y, o = e.measured.width ?? 0;
  return n.x <= t + 1 ? ve.Left : n.x >= t + o - 1 ? ve.Right : n.y <= r + 1 ? ve.Top : ve.Bottom;
}
function vl({ id: e, source: n, target: t, data: r, markerEnd: o }) {
  const a = oi(n), i = oi(t), s = qs((R) => R.transform[2]);
  if (!(a != null && a.measured.width) || !(i != null && i.measured.width)) return null;
  const c = li(a, i), l = li(i, a), u = ci(a, c), d = ci(i, l), p = { sourceX: c.x, sourceY: c.y, targetX: l.x, targetY: l.y, sourcePosition: u, targetPosition: d }, [f, g, E] = u === d ? Ws({ ...p, borderRadius: 14, offset: 24 }) : Vs(p), y = (r == null ? void 0 : r.color) ?? dr, _ = r == null ? void 0 : r.label, x = (r == null ? void 0 : r.ghosted) === !0, k = (r == null ? void 0 : r.dimmed) === !0, A = (r == null ? void 0 : r.animated) !== !1 && !x && !k;
  return /* @__PURE__ */ Ne(Tr, { children: [
    /* @__PURE__ */ K(
      Ys,
      {
        id: e,
        path: f,
        markerEnd: x ? void 0 : o,
        style: {
          stroke: y,
          strokeWidth: 1.75,
          opacity: x ? 0.14 : k ? 0.25 : 0.6,
          strokeDasharray: x ? "5 5" : void 0
        }
      }
    ),
    A && /* @__PURE__ */ K("circle", { r: 3, fill: y, opacity: 0.85, children: /* @__PURE__ */ K("animateMotion", { dur: "2.4s", repeatCount: "indefinite", path: f }) }),
    _ && !x && !k && /* @__PURE__ */ K(Zs, { children: /* @__PURE__ */ K(
      "div",
      {
        className: "scene-edge-label",
        style: { transform: `translate(-50%, -50%) translate(${g}px, ${E}px)`, fontSize: `${Al(s)}px` },
        children: _
      }
    ) })
  ] });
}
const Cl = { scene: ho }, Il = { flow: vl }, Ol = 0.08, Rl = 0.22, Ml = 550;
function Ll(e) {
  if (!e.length) return null;
  const n = Math.min(...e.map((a) => a.x)), t = Math.min(...e.map((a) => a.y)), r = Math.max(...e.map((a) => a.x + a.w)), o = Math.max(...e.map((a) => a.y + a.h));
  return { x: n, y: t, width: r - n, height: o - t };
}
function Dl({
  boxes: e,
  focusIds: n,
  fitMs: t = Ml
}) {
  const r = Qs(), o = n.join(",");
  return ur(() => {
    const a = n.map((l) => e[l]).filter(Boolean), i = Ll(a.length ? a : Object.values(e));
    if (!i) return;
    const s = a.length ? Rl : Ol, c = requestAnimationFrame(() => r.fitBounds(i, { padding: s, duration: t }));
    return () => cancelAnimationFrame(c);
  }, [o, e, r, t]), null;
}
function Pl({
  scene: e,
  reveal: n = null,
  focus: t = [],
  highlight: r = null,
  fitMs: o
}) {
  const a = cl(e), i = hn(() => el(e.nodes, e.grid, e.canvas), [e]), s = hn(() => {
    const u = r ?? t;
    return u.length ? new Set(u) : null;
  }, [r, t]), c = hn(
    () => ul(e, i, a, (n == null ? void 0 : n.nodes) ?? null, s),
    [e, i, a, n, s]
  ), l = hn(
    () => dl(e, (n == null ? void 0 : n.nodes) ?? null, (n == null ? void 0 : n.edges) ?? null, s),
    [e, n, s]
  );
  return /* @__PURE__ */ K("div", { className: "scene-flow", children: /* @__PURE__ */ K(
    Xs,
    {
      nodes: c,
      edges: l,
      nodeTypes: Cl,
      edgeTypes: Il,
      proOptions: { hideAttribution: !0 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !1,
      panOnDrag: !0,
      zoomOnScroll: !0,
      zoomOnDoubleClick: !1,
      minZoom: 0.2,
      maxZoom: 8,
      children: /* @__PURE__ */ K(Dl, { boxes: i, focusIds: t, fitMs: o })
    }
  ) });
}
function Bl(e, n) {
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
function Fl(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const zl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ul = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, $l = {};
function ui(e, n) {
  return ($l.jsx ? Ul : zl).test(e);
}
const Hl = /[ \t\n\f\r]/g;
function Gl(e) {
  return typeof e == "object" ? e.type === "text" ? di(e.value) : !1 : di(e);
}
function di(e) {
  return e.replace(Hl, "") === "";
}
class Qn {
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
Qn.prototype.normal = {};
Qn.prototype.property = {};
Qn.prototype.space = void 0;
function mo(e, n) {
  const t = {}, r = {};
  for (const o of e)
    Object.assign(t, o.property), Object.assign(r, o.normal);
  return new Qn(t, r, n);
}
function pr(e) {
  return e.toLowerCase();
}
class Pe {
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
Pe.prototype.attribute = "";
Pe.prototype.booleanish = !1;
Pe.prototype.boolean = !1;
Pe.prototype.commaOrSpaceSeparated = !1;
Pe.prototype.commaSeparated = !1;
Pe.prototype.defined = !1;
Pe.prototype.mustUseProperty = !1;
Pe.prototype.number = !1;
Pe.prototype.overloadedBoolean = !1;
Pe.prototype.property = "";
Pe.prototype.spaceSeparated = !1;
Pe.prototype.space = void 0;
let Kl = 0;
const Z = xn(), we = xn(), gr = xn(), v = xn(), ge = xn(), kn = xn(), He = xn();
function xn() {
  return 2 ** ++Kl;
}
const hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Z,
  booleanish: we,
  commaOrSpaceSeparated: He,
  commaSeparated: kn,
  number: v,
  overloadedBoolean: gr,
  spaceSeparated: ge
}, Symbol.toStringTag, { value: "Module" })), Kt = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(hr)
);
class vr extends Pe {
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
    if (super(n, t), fi(this, "space", o), typeof r == "number")
      for (; ++a < Kt.length; ) {
        const i = Kt[a];
        fi(this, Kt[a], (r & hr[i]) === hr[i]);
      }
  }
}
vr.prototype.defined = !0;
function fi(e, n, t) {
  t && (e[n] = t);
}
function Ln(e) {
  const n = {}, t = {};
  for (const [r, o] of Object.entries(e.properties)) {
    const a = new vr(
      r,
      e.transform(e.attributes || {}, r),
      o,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), n[r] = a, t[pr(r)] = r, t[pr(a.attribute)] = r;
  }
  return new Qn(n, t, e.space);
}
const bo = Ln({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: we,
    ariaAutoComplete: null,
    ariaBusy: we,
    ariaChecked: we,
    ariaColCount: v,
    ariaColIndex: v,
    ariaColSpan: v,
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
    ariaLevel: v,
    ariaLive: null,
    ariaModal: we,
    ariaMultiLine: we,
    ariaMultiSelectable: we,
    ariaOrientation: null,
    ariaOwns: ge,
    ariaPlaceholder: null,
    ariaPosInSet: v,
    ariaPressed: we,
    ariaReadOnly: we,
    ariaRelevant: null,
    ariaRequired: we,
    ariaRoleDescription: ge,
    ariaRowCount: v,
    ariaRowIndex: v,
    ariaRowSpan: v,
    ariaSelected: we,
    ariaSetSize: v,
    ariaSort: null,
    ariaValueMax: v,
    ariaValueMin: v,
    ariaValueNow: v,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function _o(e, n) {
  return n in e ? e[n] : n;
}
function Eo(e, n) {
  return _o(e, n.toLowerCase());
}
const ql = Ln({
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
    allowFullScreen: Z,
    allowPaymentRequest: Z,
    allowUserMedia: Z,
    alpha: Z,
    alt: null,
    as: null,
    async: Z,
    autoCapitalize: null,
    autoComplete: ge,
    autoFocus: Z,
    autoPlay: Z,
    blocking: ge,
    capture: null,
    charSet: null,
    checked: Z,
    cite: null,
    className: ge,
    closedBy: null,
    colorSpace: null,
    cols: v,
    colSpan: v,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: we,
    controls: Z,
    controlsList: ge,
    coords: v | kn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Z,
    defer: Z,
    dir: null,
    dirName: null,
    disabled: Z,
    download: gr,
    draggable: we,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: Z,
    formTarget: null,
    headers: ge,
    height: v,
    hidden: gr,
    high: v,
    href: null,
    hrefLang: null,
    htmlFor: ge,
    httpEquiv: ge,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Z,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Z,
    itemId: null,
    itemProp: ge,
    itemRef: ge,
    itemScope: Z,
    itemType: ge,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: Z,
    low: v,
    manifest: null,
    max: null,
    maxLength: v,
    media: null,
    method: null,
    min: null,
    minLength: v,
    multiple: Z,
    muted: Z,
    name: null,
    nonce: null,
    noModule: Z,
    noValidate: Z,
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
    open: Z,
    optimum: v,
    pattern: null,
    ping: ge,
    placeholder: null,
    playsInline: Z,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Z,
    referrerPolicy: null,
    rel: ge,
    required: Z,
    reversed: Z,
    rows: v,
    rowSpan: v,
    sandbox: ge,
    scope: null,
    scoped: Z,
    seamless: Z,
    selected: Z,
    shadowRootClonable: Z,
    shadowRootCustomElementRegistry: Z,
    shadowRootDelegatesFocus: Z,
    shadowRootMode: null,
    shadowRootSerializable: Z,
    shape: null,
    size: v,
    sizes: null,
    slot: null,
    span: v,
    spellCheck: we,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: v,
    step: null,
    style: null,
    tabIndex: v,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: Z,
    useMap: null,
    value: we,
    width: v,
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
    border: v,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: v,
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
    compact: Z,
    // Lists. Use CSS to reduce space between items instead
    declare: Z,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: v,
    // `<img>` and `<object>`
    leftMargin: v,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: v,
    // `<body>`
    marginWidth: v,
    // `<body>`
    noResize: Z,
    // `<frame>`
    noHref: Z,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: Z,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: Z,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: v,
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
    topMargin: v,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: v,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: Z,
    disablePictureInPicture: Z,
    disableRemotePlayback: Z,
    exportParts: kn,
    part: ge,
    prefix: null,
    property: null,
    results: v,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Eo
}), Wl = Ln({
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
    about: He,
    accentHeight: v,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: v,
    amplitude: v,
    arabicForm: null,
    ascent: v,
    attributeName: null,
    attributeType: null,
    azimuth: v,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: v,
    by: null,
    calcMode: null,
    capHeight: v,
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
    descent: v,
    diffuseConstant: v,
    direction: null,
    display: null,
    dur: null,
    divisor: v,
    dominantBaseline: null,
    download: Z,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: v,
    enableBackground: null,
    end: null,
    event: null,
    exponent: v,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: v,
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
    hanging: v,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: v,
    horizOriginX: v,
    horizOriginY: v,
    id: null,
    ideographic: v,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: v,
    k: v,
    k1: v,
    k2: v,
    k3: v,
    k4: v,
    kernelMatrix: He,
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
    limitingConeAngle: v,
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
    mediaSize: v,
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
    overlinePosition: v,
    overlineThickness: v,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: v,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: ge,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: v,
    pointsAtY: v,
    pointsAtZ: v,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: He,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: He,
    rev: He,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: He,
    requiredFeatures: He,
    requiredFonts: He,
    requiredFormats: He,
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
    specularConstant: v,
    specularExponent: v,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: v,
    strikethroughThickness: v,
    string: null,
    stroke: null,
    strokeDashArray: He,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: v,
    strokeOpacity: v,
    strokeWidth: null,
    style: null,
    surfaceScale: v,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: He,
    tabIndex: v,
    tableValues: null,
    target: null,
    targetX: v,
    targetY: v,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: He,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: v,
    underlineThickness: v,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: v,
    values: null,
    vAlphabetic: v,
    vMathematical: v,
    vectorEffect: null,
    vHanging: v,
    vIdeographic: v,
    version: null,
    vertAdvY: v,
    vertOriginX: v,
    vertOriginY: v,
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
    xHeight: v,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: _o
}), yo = Ln({
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
}), ko = Ln({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Eo
}), wo = Ln({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), Vl = {
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
}, Yl = /[A-Z]/g, pi = /-[a-z]/g, Zl = /^data[-\w.:]+$/i;
function Xl(e, n) {
  const t = pr(n);
  let r = n, o = Pe;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Zl.test(n)) {
    if (n.charAt(4) === "-") {
      const a = n.slice(5).replace(pi, jl);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = n.slice(4);
      if (!pi.test(a)) {
        let i = a.replace(Yl, Ql);
        i.charAt(0) !== "-" && (i = "-" + i), n = "data" + i;
      }
    }
    o = vr;
  }
  return new o(r, n);
}
function Ql(e) {
  return "-" + e.toLowerCase();
}
function jl(e) {
  return e.charAt(1).toUpperCase();
}
const Jl = mo([bo, ql, yo, ko, wo], "html"), Cr = mo([bo, Wl, yo, ko, wo], "svg");
function ec(e) {
  return e.join(" ").trim();
}
function Ir(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var vn = {}, qt, gi;
function nc() {
  if (gi) return qt;
  gi = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, n = /\n/g, t = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, o = /^:\s*/, a = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, i = /^[;\s]*/, s = /^\s+|\s+$/g, c = `
`, l = "/", u = "*", d = "", p = "comment", f = "declaration";
  function g(y, _) {
    if (typeof y != "string")
      throw new TypeError("First argument must be a string");
    if (!y) return [];
    _ = _ || {};
    var x = 1, k = 1;
    function A(L) {
      var C = L.match(n);
      C && (x += C.length);
      var X = L.lastIndexOf(c);
      k = ~X ? L.length - X : k + L.length;
    }
    function R() {
      var L = { line: x, column: k };
      return function(C) {
        return C.position = new w(L), H(), C;
      };
    }
    function w(L) {
      this.start = L, this.end = { line: x, column: k }, this.source = _.source;
    }
    w.prototype.content = y;
    function U(L) {
      var C = new Error(
        _.source + ":" + x + ":" + k + ": " + L
      );
      if (C.reason = L, C.filename = _.source, C.line = x, C.column = k, C.source = y, !_.silent) throw C;
    }
    function $(L) {
      var C = L.exec(y);
      if (C) {
        var X = C[0];
        return A(X), y = y.slice(X.length), C;
      }
    }
    function H() {
      $(t);
    }
    function S(L) {
      var C;
      for (L = L || []; C = P(); )
        C !== !1 && L.push(C);
      return L;
    }
    function P() {
      var L = R();
      if (!(l != y.charAt(0) || u != y.charAt(1))) {
        for (var C = 2; d != y.charAt(C) && (u != y.charAt(C) || l != y.charAt(C + 1)); )
          ++C;
        if (C += 2, d === y.charAt(C - 1))
          return U("End of comment missing");
        var X = y.slice(2, C - 2);
        return k += 2, A(X), y = y.slice(C), k += 2, L({
          type: p,
          comment: X
        });
      }
    }
    function B() {
      var L = R(), C = $(r);
      if (C) {
        if (P(), !$(o)) return U("property missing ':'");
        var X = $(a), se = L({
          type: f,
          property: E(C[0].replace(e, d)),
          value: X ? E(X[0].replace(e, d)) : d
        });
        return $(i), se;
      }
    }
    function ee() {
      var L = [];
      S(L);
      for (var C; C = B(); )
        C !== !1 && (L.push(C), S(L));
      return L;
    }
    return H(), ee();
  }
  function E(y) {
    return y ? y.replace(s, d) : d;
  }
  return qt = g, qt;
}
var hi;
function tc() {
  if (hi) return vn;
  hi = 1;
  var e = vn && vn.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(vn, "__esModule", { value: !0 }), vn.default = t;
  const n = e(nc());
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
var $n = {}, mi;
function rc() {
  if (mi) return $n;
  mi = 1, Object.defineProperty($n, "__esModule", { value: !0 }), $n.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, t = /^[^-]+$/, r = /^-(webkit|moz|ms|o|khtml)-/, o = /^-(ms)-/, a = function(l) {
    return !l || t.test(l) || e.test(l);
  }, i = function(l, u) {
    return u.toUpperCase();
  }, s = function(l, u) {
    return "".concat(u, "-");
  }, c = function(l, u) {
    return u === void 0 && (u = {}), a(l) ? l : (l = l.toLowerCase(), u.reactCompat ? l = l.replace(o, s) : l = l.replace(r, s), l.replace(n, i));
  };
  return $n.camelCase = c, $n;
}
var Hn, bi;
function ic() {
  if (bi) return Hn;
  bi = 1;
  var e = Hn && Hn.__importDefault || function(o) {
    return o && o.__esModule ? o : { default: o };
  }, n = e(tc()), t = rc();
  function r(o, a) {
    var i = {};
    return !o || typeof o != "string" || (0, n.default)(o, function(s, c) {
      s && c && (i[(0, t.camelCase)(s, a)] = c);
    }), i;
  }
  return r.default = r, Hn = r, Hn;
}
var oc = ic();
const ac = /* @__PURE__ */ Ir(oc), xo = So("end"), Or = So("start");
function So(e) {
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
function sc(e) {
  const n = Or(e), t = xo(e);
  if (n && t)
    return { start: n, end: t };
}
function Wn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? _i(e.position) : "start" in e || "end" in e ? _i(e) : "line" in e || "column" in e ? mr(e) : "";
}
function mr(e) {
  return Ei(e && e.line) + ":" + Ei(e && e.column);
}
function _i(e) {
  return mr(e && e.start) + "-" + mr(e && e.end);
}
function Ei(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ie extends Error {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = o, this.line = s ? s.line : void 0, this.name = Wn(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = i && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ie.prototype.file = "";
Ie.prototype.name = "";
Ie.prototype.reason = "";
Ie.prototype.message = "";
Ie.prototype.stack = "";
Ie.prototype.column = void 0;
Ie.prototype.line = void 0;
Ie.prototype.ancestors = void 0;
Ie.prototype.cause = void 0;
Ie.prototype.fatal = void 0;
Ie.prototype.place = void 0;
Ie.prototype.ruleId = void 0;
Ie.prototype.source = void 0;
const Rr = {}.hasOwnProperty, lc = /* @__PURE__ */ new Map(), cc = /[A-Z]/g, uc = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), dc = /* @__PURE__ */ new Set(["td", "th"]), No = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function fc(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = yc(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Ec(t, n.jsx, n.jsxs);
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
    schema: n.space === "svg" ? Cr : Jl,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, a = To(o, e, void 0);
  return a && typeof a != "string" ? a : o.create(
    e,
    o.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function To(e, n, t) {
  if (n.type === "element")
    return pc(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return gc(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return mc(e, n, t);
  if (n.type === "mdxjsEsm")
    return hc(e, n);
  if (n.type === "root")
    return bc(e, n, t);
  if (n.type === "text")
    return _c(e, n);
}
function pc(e, n, t) {
  const r = e.schema;
  let o = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (o = Cr, e.schema = o), e.ancestors.push(n);
  const a = vo(e, n.tagName, !1), i = kc(e, n);
  let s = Lr(e, n);
  return uc.has(n.tagName) && (s = s.filter(function(c) {
    return typeof c == "string" ? !Gl(c) : !0;
  })), Ao(e, i, a, n), Mr(i, s), e.ancestors.pop(), e.schema = r, e.create(n, a, i, t);
}
function gc(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Zn(e, n.position);
}
function hc(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Zn(e, n.position);
}
function mc(e, n, t) {
  const r = e.schema;
  let o = r;
  n.name === "svg" && r.space === "html" && (o = Cr, e.schema = o), e.ancestors.push(n);
  const a = n.name === null ? e.Fragment : vo(e, n.name, !0), i = wc(e, n), s = Lr(e, n);
  return Ao(e, i, a, n), Mr(i, s), e.ancestors.pop(), e.schema = r, e.create(n, a, i, t);
}
function bc(e, n, t) {
  const r = {};
  return Mr(r, Lr(e, n)), e.create(n, e.Fragment, r, t);
}
function _c(e, n) {
  return n.value;
}
function Ao(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function Mr(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function Ec(e, n, t) {
  return r;
  function r(o, a, i, s) {
    const l = Array.isArray(i.children) ? t : n;
    return s ? l(a, i, s) : l(a, i);
  }
}
function yc(e, n) {
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
function kc(e, n) {
  const t = {};
  let r, o;
  for (o in n.properties)
    if (o !== "children" && Rr.call(n.properties, o)) {
      const a = xc(e, o, n.properties[o]);
      if (a) {
        const [i, s] = a;
        e.tableCellAlignToStyle && i === "align" && typeof s == "string" && dc.has(n.tagName) ? r = s : t[i] = s;
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
function wc(e, n) {
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
        Zn(e, n.position);
    else {
      const o = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const s = r.value.data.estree.body[0];
          s.type, a = e.evaluater.evaluateExpression(s.expression);
        } else
          Zn(e, n.position);
      else
        a = r.value === null ? !0 : r.value;
      t[o] = /** @type {Props[keyof Props]} */
      a;
    }
  return t;
}
function Lr(e, n) {
  const t = [];
  let r = -1;
  const o = e.passKeys ? /* @__PURE__ */ new Map() : lc;
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
    const s = To(e, a, i);
    s !== void 0 && t.push(s);
  }
  return t;
}
function xc(e, n, t) {
  const r = Xl(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? Fl(t) : ec(t)), r.property === "style") {
      let o = typeof t == "object" ? t : Sc(e, String(t));
      return e.stylePropertyNameCase === "css" && (o = Nc(o)), ["style", o];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Vl[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function Sc(e, n) {
  try {
    return ac(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), o = new Ie("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw o.file = e.filePath || void 0, o.url = No + "#cannot-parse-style-attribute", o;
  }
}
function vo(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const o = n.split(".");
    let a = -1, i;
    for (; ++a < o.length; ) {
      const s = ui(o[a]) ? { type: "Identifier", name: o[a] } : { type: "Literal", value: o[a] };
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
    r = ui(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const o = (
      /** @type {string | number} */
      r.value
    );
    return Rr.call(e.components, o) ? e.components[o] : o;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Zn(e);
}
function Zn(e, n) {
  const t = new Ie(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = No + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function Nc(e) {
  const n = {};
  let t;
  for (t in e)
    Rr.call(e, t) && (n[Tc(t)] = e[t]);
  return n;
}
function Tc(e) {
  let n = e.replace(cc, Ac);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function Ac(e) {
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
}, vc = {};
function Dr(e, n) {
  const t = vc, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, o = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Co(e, r, o);
}
function Co(e, n, t) {
  if (Cc(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return yi(e.children, n, t);
  }
  return Array.isArray(e) ? yi(e, n, t) : "";
}
function yi(e, n, t) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; )
    r[o] = Co(e[o], n, t);
  return r.join("");
}
function Cc(e) {
  return !!(e && typeof e == "object");
}
const ki = document.createElement("i");
function Pr(e) {
  const n = "&" + e + ";";
  ki.innerHTML = n;
  const t = ki.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function Ge(e, n, t, r) {
  const o = e.length;
  let a = 0, i;
  if (n < 0 ? n = -n > o ? 0 : o + n : n = n > o ? o : n, t = t > 0 ? t : 0, r.length < 1e4)
    i = Array.from(r), i.unshift(n, t), e.splice(...i);
  else
    for (t && e.splice(n, t); a < r.length; )
      i = r.slice(a, a + 1e4), i.unshift(n, 0), e.splice(...i), a += 1e4, n += 1e4;
}
function qe(e, n) {
  return e.length > 0 ? (Ge(e, e.length, 0, n), e) : n;
}
const wi = {}.hasOwnProperty;
function Io(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Ic(n, e[t]);
  return n;
}
function Ic(e, n) {
  let t;
  for (t in n) {
    const o = (wi.call(e, t) ? e[t] : void 0) || (e[t] = {}), a = n[t];
    let i;
    if (a)
      for (i in a) {
        wi.call(o, i) || (o[i] = []);
        const s = a[i];
        Oc(
          // @ts-expect-error Looks like a list.
          o[i],
          Array.isArray(s) ? s : s ? [s] : []
        );
      }
  }
}
function Oc(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  Ge(e, 0, 0, r);
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
const Le = mn(/[A-Za-z]/), Ce = mn(/[\dA-Za-z]/), Rc = mn(/[#-'*+\--9=?A-Z^-~]/);
function kt(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const br = mn(/\d/), Mc = mn(/[\dA-Fa-f]/), Lc = mn(/[!-/:-@[-`{-~]/);
function W(e) {
  return e !== null && e < -2;
}
function he(e) {
  return e !== null && (e < 0 || e === 32);
}
function re(e) {
  return e === -2 || e === -1 || e === 32;
}
const Ct = mn(new RegExp("\\p{P}|\\p{S}", "u")), wn = mn(/\s/);
function mn(e) {
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
    if (a === 37 && Ce(e.charCodeAt(t + 1)) && Ce(e.charCodeAt(t + 2)))
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
const Dc = {
  tokenize: Pc
};
function Pc(e) {
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
    return W(s) ? (e.consume(s), e.exit("chunkText"), a) : (e.consume(s), i);
  }
}
const Bc = {
  tokenize: Fc
}, xi = {
  tokenize: zc
};
function Fc(e) {
  const n = this, t = [];
  let r = 0, o, a, i;
  return s;
  function s(k) {
    if (r < t.length) {
      const A = t[r];
      return n.containerState = A[1], e.attempt(A[0].continuation, c, l)(k);
    }
    return l(k);
  }
  function c(k) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, o && x();
      const A = n.events.length;
      let R = A, w;
      for (; R--; )
        if (n.events[R][0] === "exit" && n.events[R][1].type === "chunkFlow") {
          w = n.events[R][1].end;
          break;
        }
      _(r);
      let U = A;
      for (; U < n.events.length; )
        n.events[U][1].end = {
          ...w
        }, U++;
      return Ge(n.events, R + 1, 0, n.events.slice(A)), n.events.length = U, l(k);
    }
    return s(k);
  }
  function l(k) {
    if (r === t.length) {
      if (!o)
        return p(k);
      if (o.currentConstruct && o.currentConstruct.concrete)
        return g(k);
      n.interrupt = !!(o.currentConstruct && !o._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(xi, u, d)(k);
  }
  function u(k) {
    return o && x(), _(r), p(k);
  }
  function d(k) {
    return n.parser.lazy[n.now().line] = r !== t.length, i = n.now().offset, g(k);
  }
  function p(k) {
    return n.containerState = {}, e.attempt(xi, f, g)(k);
  }
  function f(k) {
    return r++, t.push([n.currentConstruct, n.containerState]), p(k);
  }
  function g(k) {
    if (k === null) {
      o && x(), _(0), e.consume(k);
      return;
    }
    return o = o || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: o,
      contentType: "flow",
      previous: a
    }), E(k);
  }
  function E(k) {
    if (k === null) {
      y(e.exit("chunkFlow"), !0), _(0), e.consume(k);
      return;
    }
    return W(k) ? (e.consume(k), y(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, s) : (e.consume(k), E);
  }
  function y(k, A) {
    const R = n.sliceStream(k);
    if (A && R.push(null), k.previous = a, a && (a.next = k), a = k, o.defineSkip(k.start), o.write(R), n.parser.lazy[k.start.line]) {
      let w = o.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          o.events[w][1].start.offset < i && // …and either is not ended yet…
          (!o.events[w][1].end || // …or ends after it.
          o.events[w][1].end.offset > i)
        )
          return;
      const U = n.events.length;
      let $ = U, H, S;
      for (; $--; )
        if (n.events[$][0] === "exit" && n.events[$][1].type === "chunkFlow") {
          if (H) {
            S = n.events[$][1].end;
            break;
          }
          H = !0;
        }
      for (_(r), w = U; w < n.events.length; )
        n.events[w][1].end = {
          ...S
        }, w++;
      Ge(n.events, $ + 1, 0, n.events.slice(U)), n.events.length = w;
    }
  }
  function _(k) {
    let A = t.length;
    for (; A-- > k; ) {
      const R = t[A];
      n.containerState = R[1], R[0].exit.call(n, e);
    }
    t.length = k;
  }
  function x() {
    o.write([null]), a = void 0, o = void 0, n.containerState._closeFlow = void 0;
  }
}
function zc(e, n, t) {
  return oe(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Mn(e) {
  if (e === null || he(e) || wn(e))
    return 1;
  if (Ct(e))
    return 2;
}
function It(e, n, t) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; ) {
    const a = e[o].resolveAll;
    a && !r.includes(a) && (n = a(n, t), r.push(a));
  }
  return n;
}
const _r = {
  name: "attention",
  resolveAll: Uc,
  tokenize: $c
};
function Uc(e, n) {
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
          Si(d, -c), Si(p, c), i = {
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
          }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = qe(l, [["enter", e[r][1], n], ["exit", e[r][1], n]])), l = qe(l, [["enter", o, n], ["enter", i, n], ["exit", i, n], ["enter", a, n]]), l = qe(l, It(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), l = qe(l, [["exit", a, n], ["enter", s, n], ["exit", s, n], ["exit", o, n]]), e[t][1].end.offset - e[t][1].start.offset ? (u = 2, l = qe(l, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : u = 0, Ge(e, r - 1, t - r + 3, l), t = r + l.length - u - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function $c(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, o = Mn(r);
  let a;
  return i;
  function i(c) {
    return a = c, e.enter("attentionSequence"), s(c);
  }
  function s(c) {
    if (c === a)
      return e.consume(c), s;
    const l = e.exit("attentionSequence"), u = Mn(c), d = !u || u === 2 && o || t.includes(c), p = !o || o === 2 && u || t.includes(r);
    return l._open = !!(a === 42 ? d : d && (o || !p)), l._close = !!(a === 42 ? p : p && (u || !d)), n(c);
  }
}
function Si(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Hc = {
  name: "autolink",
  tokenize: Gc
};
function Gc(e, n, t) {
  let r = 0;
  return o;
  function o(f) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(f) {
    return Le(f) ? (e.consume(f), i) : f === 64 ? t(f) : l(f);
  }
  function i(f) {
    return f === 43 || f === 45 || f === 46 || Ce(f) ? (r = 1, s(f)) : l(f);
  }
  function s(f) {
    return f === 58 ? (e.consume(f), r = 0, c) : (f === 43 || f === 45 || f === 46 || Ce(f)) && r++ < 32 ? (e.consume(f), s) : (r = 0, l(f));
  }
  function c(f) {
    return f === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : f === null || f === 32 || f === 60 || kt(f) ? t(f) : (e.consume(f), c);
  }
  function l(f) {
    return f === 64 ? (e.consume(f), u) : Rc(f) ? (e.consume(f), l) : t(f);
  }
  function u(f) {
    return Ce(f) ? d(f) : t(f);
  }
  function d(f) {
    return f === 46 ? (e.consume(f), r = 0, u) : f === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : p(f);
  }
  function p(f) {
    if ((f === 45 || Ce(f)) && r++ < 63) {
      const g = f === 45 ? p : d;
      return e.consume(f), g;
    }
    return t(f);
  }
}
const jn = {
  partial: !0,
  tokenize: Kc
};
function Kc(e, n, t) {
  return r;
  function r(a) {
    return re(a) ? oe(e, o, "linePrefix")(a) : o(a);
  }
  function o(a) {
    return a === null || W(a) ? n(a) : t(a);
  }
}
const Ro = {
  continuation: {
    tokenize: Wc
  },
  exit: Vc,
  name: "blockQuote",
  tokenize: qc
};
function qc(e, n, t) {
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
function Wc(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return re(i) ? oe(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : a(i);
  }
  function a(i) {
    return e.attempt(Ro, n, t)(i);
  }
}
function Vc(e) {
  e.exit("blockQuote");
}
const Mo = {
  name: "characterEscape",
  tokenize: Yc
};
function Yc(e, n, t) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), o;
  }
  function o(a) {
    return Lc(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(a);
  }
}
const Lo = {
  name: "characterReference",
  tokenize: Zc
};
function Zc(e, n, t) {
  const r = this;
  let o = 0, a, i;
  return s;
  function s(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), c;
  }
  function c(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, i = Ce, u(d));
  }
  function l(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, i = Mc, u) : (e.enter("characterReferenceValue"), a = 7, i = br, u(d));
  }
  function u(d) {
    if (d === 59 && o) {
      const p = e.exit("characterReferenceValue");
      return i === Ce && !Pr(r.sliceSerialize(p)) ? t(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return i(d) && o++ < a ? (e.consume(d), u) : t(d);
  }
}
const Ni = {
  partial: !0,
  tokenize: Qc
}, Ti = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Xc
};
function Xc(e, n, t) {
  const r = this, o = {
    partial: !0,
    tokenize: R
  };
  let a = 0, i = 0, s;
  return c;
  function c(w) {
    return l(w);
  }
  function l(w) {
    const U = r.events[r.events.length - 1];
    return a = U && U[1].type === "linePrefix" ? U[2].sliceSerialize(U[1], !0).length : 0, s = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(w);
  }
  function u(w) {
    return w === s ? (i++, e.consume(w), u) : i < 3 ? t(w) : (e.exit("codeFencedFenceSequence"), re(w) ? oe(e, d, "whitespace")(w) : d(w));
  }
  function d(w) {
    return w === null || W(w) ? (e.exit("codeFencedFence"), r.interrupt ? n(w) : e.check(Ni, E, A)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(w));
  }
  function p(w) {
    return w === null || W(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(w)) : re(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), oe(e, f, "whitespace")(w)) : w === 96 && w === s ? t(w) : (e.consume(w), p);
  }
  function f(w) {
    return w === null || W(w) ? d(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), g(w));
  }
  function g(w) {
    return w === null || W(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(w)) : w === 96 && w === s ? t(w) : (e.consume(w), g);
  }
  function E(w) {
    return e.attempt(o, A, y)(w);
  }
  function y(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), _;
  }
  function _(w) {
    return a > 0 && re(w) ? oe(e, x, "linePrefix", a + 1)(w) : x(w);
  }
  function x(w) {
    return w === null || W(w) ? e.check(Ni, E, A)(w) : (e.enter("codeFlowValue"), k(w));
  }
  function k(w) {
    return w === null || W(w) ? (e.exit("codeFlowValue"), x(w)) : (e.consume(w), k);
  }
  function A(w) {
    return e.exit("codeFenced"), n(w);
  }
  function R(w, U, $) {
    let H = 0;
    return S;
    function S(C) {
      return w.enter("lineEnding"), w.consume(C), w.exit("lineEnding"), P;
    }
    function P(C) {
      return w.enter("codeFencedFence"), re(C) ? oe(w, B, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(C) : B(C);
    }
    function B(C) {
      return C === s ? (w.enter("codeFencedFenceSequence"), ee(C)) : $(C);
    }
    function ee(C) {
      return C === s ? (H++, w.consume(C), ee) : H >= i ? (w.exit("codeFencedFenceSequence"), re(C) ? oe(w, L, "whitespace")(C) : L(C)) : $(C);
    }
    function L(C) {
      return C === null || W(C) ? (w.exit("codeFencedFence"), U(C)) : $(C);
    }
  }
}
function Qc(e, n, t) {
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
  tokenize: Jc
}, jc = {
  partial: !0,
  tokenize: eu
};
function Jc(e, n, t) {
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
    return l === null ? c(l) : W(l) ? e.attempt(jc, i, c)(l) : (e.enter("codeFlowValue"), s(l));
  }
  function s(l) {
    return l === null || W(l) ? (e.exit("codeFlowValue"), i(l)) : (e.consume(l), s);
  }
  function c(l) {
    return e.exit("codeIndented"), n(l);
  }
}
function eu(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return r.parser.lazy[r.now().line] ? t(i) : W(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o) : oe(e, a, "linePrefix", 5)(i);
  }
  function a(i) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? n(i) : W(i) ? o(i) : t(i);
  }
}
const nu = {
  name: "codeText",
  previous: ru,
  resolve: tu,
  tokenize: iu
};
function tu(e) {
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
function ru(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function iu(e, n, t) {
  let r = 0, o, a;
  return i;
  function i(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), s(d);
  }
  function s(d) {
    return d === 96 ? (e.consume(d), r++, s) : (e.exit("codeTextSequence"), c(d));
  }
  function c(d) {
    return d === null ? t(d) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), c) : d === 96 ? (a = e.enter("codeTextSequence"), o = 0, u(d)) : W(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(d));
  }
  function l(d) {
    return d === null || d === 32 || d === 96 || W(d) ? (e.exit("codeTextData"), c(d)) : (e.consume(d), l);
  }
  function u(d) {
    return d === 96 ? (e.consume(d), o++, u) : o === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(d)) : (a.type = "codeTextData", l(d));
  }
}
class ou {
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
    return r && Gn(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Gn(this.left, n);
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
    this.setCursor(0), Gn(this.right, n.reverse());
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
        Gn(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        Gn(this.left, t.reverse());
      }
  }
}
function Gn(e, n) {
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
  const u = new ou(e);
  for (; ++t < u.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = u.get(t), t && r[1].type === "chunkFlow" && u.get(t - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content"))
      for (; ++a < c.length && c[a][1].type !== "content"; )
        c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, au(u, t)), t = n[t], l = !0);
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
  return Ge(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !l;
}
function au(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let o = n - 1;
  const a = [];
  let i = t._tokenizer;
  i || (i = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
  const s = i.events, c = [], l = {};
  let u, d, p = -1, f = t, g = 0, E = 0;
  const y = [E];
  for (; f; ) {
    for (; e.get(++o)[1] !== f; )
      ;
    a.push(o), f._tokenizer || (u = r.sliceStream(f), f.next || u.push(null), d && i.defineSkip(f.start), f._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(u), f._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), d = f, f = f.next;
  }
  for (f = t; ++p < s.length; )
    // Find a void token that includes a break.
    s[p][0] === "exit" && s[p - 1][0] === "enter" && s[p][1].type === s[p - 1][1].type && s[p][1].start.line !== s[p][1].end.line && (E = p + 1, y.push(E), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (i.events = [], f ? (f._tokenizer = void 0, f.previous = void 0) : y.pop(), p = y.length; p--; ) {
    const _ = s.slice(y[p], y[p + 1]), x = a.pop();
    c.push([x, x + _.length - 1]), e.splice(x, 2, _);
  }
  for (c.reverse(), p = -1; ++p < c.length; )
    l[g + c[p][0]] = g + c[p][1], g += c[p][1] - c[p][0] - 1;
  return l;
}
const su = {
  resolve: cu,
  tokenize: uu
}, lu = {
  partial: !0,
  tokenize: du
};
function cu(e) {
  return Do(e), e;
}
function uu(e, n) {
  let t;
  return r;
  function r(s) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), o(s);
  }
  function o(s) {
    return s === null ? a(s) : W(s) ? e.check(lu, i, a)(s) : (e.consume(s), o);
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
function du(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), oe(e, a, "linePrefix");
  }
  function a(i) {
    if (i === null || W(i))
      return t(i);
    const s = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? n(i) : e.interrupt(r.parser.constructs.flow, t, n)(i);
  }
}
function Po(e, n, t, r, o, a, i, s, c) {
  const l = c || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(_) {
    return _ === 60 ? (e.enter(r), e.enter(o), e.enter(a), e.consume(_), e.exit(a), p) : _ === null || _ === 32 || _ === 41 || kt(_) ? t(_) : (e.enter(r), e.enter(i), e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), E(_));
  }
  function p(_) {
    return _ === 62 ? (e.enter(a), e.consume(_), e.exit(a), e.exit(o), e.exit(r), n) : (e.enter(s), e.enter("chunkString", {
      contentType: "string"
    }), f(_));
  }
  function f(_) {
    return _ === 62 ? (e.exit("chunkString"), e.exit(s), p(_)) : _ === null || _ === 60 || W(_) ? t(_) : (e.consume(_), _ === 92 ? g : f);
  }
  function g(_) {
    return _ === 60 || _ === 62 || _ === 92 ? (e.consume(_), f) : f(_);
  }
  function E(_) {
    return !u && (_ === null || _ === 41 || he(_)) ? (e.exit("chunkString"), e.exit(s), e.exit(i), e.exit(r), n(_)) : u < l && _ === 40 ? (e.consume(_), u++, E) : _ === 41 ? (e.consume(_), u--, E) : _ === null || _ === 32 || _ === 40 || kt(_) ? t(_) : (e.consume(_), _ === 92 ? y : E);
  }
  function y(_) {
    return _ === 40 || _ === 41 || _ === 92 ? (e.consume(_), E) : E(_);
  }
}
function Bo(e, n, t, r, o, a) {
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
    f === 94 && !s && "_hiddenFootnoteSupport" in i.parser.constructs ? t(f) : f === 93 ? (e.exit(a), e.enter(o), e.consume(f), e.exit(o), e.exit(r), n) : W(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), u) : (e.enter("chunkString", {
      contentType: "string"
    }), d(f));
  }
  function d(f) {
    return f === null || f === 91 || f === 93 || W(f) || s++ > 999 ? (e.exit("chunkString"), u(f)) : (e.consume(f), c || (c = !re(f)), f === 92 ? p : d);
  }
  function p(f) {
    return f === 91 || f === 92 || f === 93 ? (e.consume(f), s++, d) : d(f);
  }
}
function Fo(e, n, t, r, o, a) {
  let i;
  return s;
  function s(p) {
    return p === 34 || p === 39 || p === 40 ? (e.enter(r), e.enter(o), e.consume(p), e.exit(o), i = p === 40 ? 41 : p, c) : t(p);
  }
  function c(p) {
    return p === i ? (e.enter(o), e.consume(p), e.exit(o), e.exit(r), n) : (e.enter(a), l(p));
  }
  function l(p) {
    return p === i ? (e.exit(a), c(i)) : p === null ? t(p) : W(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), oe(e, l, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), u(p));
  }
  function u(p) {
    return p === i || p === null || W(p) ? (e.exit("chunkString"), l(p)) : (e.consume(p), p === 92 ? d : u);
  }
  function d(p) {
    return p === i || p === 92 ? (e.consume(p), u) : u(p);
  }
}
function Vn(e, n) {
  let t;
  return r;
  function r(o) {
    return W(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t = !0, r) : re(o) ? oe(e, r, t ? "linePrefix" : "lineSuffix")(o) : n(o);
  }
}
const fu = {
  name: "definition",
  tokenize: gu
}, pu = {
  partial: !0,
  tokenize: hu
};
function gu(e, n, t) {
  const r = this;
  let o;
  return a;
  function a(f) {
    return e.enter("definition"), i(f);
  }
  function i(f) {
    return Bo.call(
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
    return he(f) ? Vn(e, l)(f) : l(f);
  }
  function l(f) {
    return Po(
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
    return e.attempt(pu, d, d)(f);
  }
  function d(f) {
    return re(f) ? oe(e, p, "whitespace")(f) : p(f);
  }
  function p(f) {
    return f === null || W(f) ? (e.exit("definition"), r.parser.defined.push(o), n(f)) : t(f);
  }
}
function hu(e, n, t) {
  return r;
  function r(s) {
    return he(s) ? Vn(e, o)(s) : t(s);
  }
  function o(s) {
    return Fo(e, a, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(s);
  }
  function a(s) {
    return re(s) ? oe(e, i, "whitespace")(s) : i(s);
  }
  function i(s) {
    return s === null || W(s) ? n(s) : t(s);
  }
}
const mu = {
  name: "hardBreakEscape",
  tokenize: bu
};
function bu(e, n, t) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), o;
  }
  function o(a) {
    return W(a) ? (e.exit("hardBreakEscape"), n(a)) : t(a);
  }
}
const _u = {
  name: "headingAtx",
  resolve: Eu,
  tokenize: yu
};
function Eu(e, n) {
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
  }, Ge(e, r, t - r + 1, [["enter", o, n], ["enter", a, n], ["exit", a, n], ["exit", o, n]])), e;
}
function yu(e, n, t) {
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
    return u === 35 ? (e.enter("atxHeadingSequence"), c(u)) : u === null || W(u) ? (e.exit("atxHeading"), n(u)) : re(u) ? oe(e, s, "whitespace")(u) : (e.enter("atxHeadingText"), l(u));
  }
  function c(u) {
    return u === 35 ? (e.consume(u), c) : (e.exit("atxHeadingSequence"), s(u));
  }
  function l(u) {
    return u === null || u === 35 || he(u) ? (e.exit("atxHeadingText"), s(u)) : (e.consume(u), l);
  }
}
const ku = [
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
], Ai = ["pre", "script", "style", "textarea"], wu = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Nu,
  tokenize: Tu
}, xu = {
  partial: !0,
  tokenize: vu
}, Su = {
  partial: !0,
  tokenize: Au
};
function Nu(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function Tu(e, n, t) {
  const r = this;
  let o, a, i, s, c;
  return l;
  function l(b) {
    return u(b);
  }
  function u(b) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(b), d;
  }
  function d(b) {
    return b === 33 ? (e.consume(b), p) : b === 47 ? (e.consume(b), a = !0, E) : b === 63 ? (e.consume(b), o = 3, r.interrupt ? n : h) : Le(b) ? (e.consume(b), i = String.fromCharCode(b), y) : t(b);
  }
  function p(b) {
    return b === 45 ? (e.consume(b), o = 2, f) : b === 91 ? (e.consume(b), o = 5, s = 0, g) : Le(b) ? (e.consume(b), o = 4, r.interrupt ? n : h) : t(b);
  }
  function f(b) {
    return b === 45 ? (e.consume(b), r.interrupt ? n : h) : t(b);
  }
  function g(b) {
    const Oe = "CDATA[";
    return b === Oe.charCodeAt(s++) ? (e.consume(b), s === Oe.length ? r.interrupt ? n : B : g) : t(b);
  }
  function E(b) {
    return Le(b) ? (e.consume(b), i = String.fromCharCode(b), y) : t(b);
  }
  function y(b) {
    if (b === null || b === 47 || b === 62 || he(b)) {
      const Oe = b === 47, Ke = i.toLowerCase();
      return !Oe && !a && Ai.includes(Ke) ? (o = 1, r.interrupt ? n(b) : B(b)) : ku.includes(i.toLowerCase()) ? (o = 6, Oe ? (e.consume(b), _) : r.interrupt ? n(b) : B(b)) : (o = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(b) : a ? x(b) : k(b));
    }
    return b === 45 || Ce(b) ? (e.consume(b), i += String.fromCharCode(b), y) : t(b);
  }
  function _(b) {
    return b === 62 ? (e.consume(b), r.interrupt ? n : B) : t(b);
  }
  function x(b) {
    return re(b) ? (e.consume(b), x) : S(b);
  }
  function k(b) {
    return b === 47 ? (e.consume(b), S) : b === 58 || b === 95 || Le(b) ? (e.consume(b), A) : re(b) ? (e.consume(b), k) : S(b);
  }
  function A(b) {
    return b === 45 || b === 46 || b === 58 || b === 95 || Ce(b) ? (e.consume(b), A) : R(b);
  }
  function R(b) {
    return b === 61 ? (e.consume(b), w) : re(b) ? (e.consume(b), R) : k(b);
  }
  function w(b) {
    return b === null || b === 60 || b === 61 || b === 62 || b === 96 ? t(b) : b === 34 || b === 39 ? (e.consume(b), c = b, U) : re(b) ? (e.consume(b), w) : $(b);
  }
  function U(b) {
    return b === c ? (e.consume(b), c = null, H) : b === null || W(b) ? t(b) : (e.consume(b), U);
  }
  function $(b) {
    return b === null || b === 34 || b === 39 || b === 47 || b === 60 || b === 61 || b === 62 || b === 96 || he(b) ? R(b) : (e.consume(b), $);
  }
  function H(b) {
    return b === 47 || b === 62 || re(b) ? k(b) : t(b);
  }
  function S(b) {
    return b === 62 ? (e.consume(b), P) : t(b);
  }
  function P(b) {
    return b === null || W(b) ? B(b) : re(b) ? (e.consume(b), P) : t(b);
  }
  function B(b) {
    return b === 45 && o === 2 ? (e.consume(b), X) : b === 60 && o === 1 ? (e.consume(b), se) : b === 62 && o === 4 ? (e.consume(b), ue) : b === 63 && o === 3 ? (e.consume(b), h) : b === 93 && o === 5 ? (e.consume(b), fe) : W(b) && (o === 6 || o === 7) ? (e.exit("htmlFlowData"), e.check(xu, pe, ee)(b)) : b === null || W(b) ? (e.exit("htmlFlowData"), ee(b)) : (e.consume(b), B);
  }
  function ee(b) {
    return e.check(Su, L, pe)(b);
  }
  function L(b) {
    return e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), C;
  }
  function C(b) {
    return b === null || W(b) ? ee(b) : (e.enter("htmlFlowData"), B(b));
  }
  function X(b) {
    return b === 45 ? (e.consume(b), h) : B(b);
  }
  function se(b) {
    return b === 47 ? (e.consume(b), i = "", Q) : B(b);
  }
  function Q(b) {
    if (b === 62) {
      const Oe = i.toLowerCase();
      return Ai.includes(Oe) ? (e.consume(b), ue) : B(b);
    }
    return Le(b) && i.length < 8 ? (e.consume(b), i += String.fromCharCode(b), Q) : B(b);
  }
  function fe(b) {
    return b === 93 ? (e.consume(b), h) : B(b);
  }
  function h(b) {
    return b === 62 ? (e.consume(b), ue) : b === 45 && o === 2 ? (e.consume(b), h) : B(b);
  }
  function ue(b) {
    return b === null || W(b) ? (e.exit("htmlFlowData"), pe(b)) : (e.consume(b), ue);
  }
  function pe(b) {
    return e.exit("htmlFlow"), n(b);
  }
}
function Au(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return W(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), a) : t(i);
  }
  function a(i) {
    return r.parser.lazy[r.now().line] ? t(i) : n(i);
  }
}
function vu(e, n, t) {
  return r;
  function r(o) {
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), e.attempt(jn, n, t);
  }
}
const Cu = {
  name: "htmlText",
  tokenize: Iu
};
function Iu(e, n, t) {
  const r = this;
  let o, a, i;
  return s;
  function s(h) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(h), c;
  }
  function c(h) {
    return h === 33 ? (e.consume(h), l) : h === 47 ? (e.consume(h), R) : h === 63 ? (e.consume(h), k) : Le(h) ? (e.consume(h), $) : t(h);
  }
  function l(h) {
    return h === 45 ? (e.consume(h), u) : h === 91 ? (e.consume(h), a = 0, g) : Le(h) ? (e.consume(h), x) : t(h);
  }
  function u(h) {
    return h === 45 ? (e.consume(h), f) : t(h);
  }
  function d(h) {
    return h === null ? t(h) : h === 45 ? (e.consume(h), p) : W(h) ? (i = d, se(h)) : (e.consume(h), d);
  }
  function p(h) {
    return h === 45 ? (e.consume(h), f) : d(h);
  }
  function f(h) {
    return h === 62 ? X(h) : h === 45 ? p(h) : d(h);
  }
  function g(h) {
    const ue = "CDATA[";
    return h === ue.charCodeAt(a++) ? (e.consume(h), a === ue.length ? E : g) : t(h);
  }
  function E(h) {
    return h === null ? t(h) : h === 93 ? (e.consume(h), y) : W(h) ? (i = E, se(h)) : (e.consume(h), E);
  }
  function y(h) {
    return h === 93 ? (e.consume(h), _) : E(h);
  }
  function _(h) {
    return h === 62 ? X(h) : h === 93 ? (e.consume(h), _) : E(h);
  }
  function x(h) {
    return h === null || h === 62 ? X(h) : W(h) ? (i = x, se(h)) : (e.consume(h), x);
  }
  function k(h) {
    return h === null ? t(h) : h === 63 ? (e.consume(h), A) : W(h) ? (i = k, se(h)) : (e.consume(h), k);
  }
  function A(h) {
    return h === 62 ? X(h) : k(h);
  }
  function R(h) {
    return Le(h) ? (e.consume(h), w) : t(h);
  }
  function w(h) {
    return h === 45 || Ce(h) ? (e.consume(h), w) : U(h);
  }
  function U(h) {
    return W(h) ? (i = U, se(h)) : re(h) ? (e.consume(h), U) : X(h);
  }
  function $(h) {
    return h === 45 || Ce(h) ? (e.consume(h), $) : h === 47 || h === 62 || he(h) ? H(h) : t(h);
  }
  function H(h) {
    return h === 47 ? (e.consume(h), X) : h === 58 || h === 95 || Le(h) ? (e.consume(h), S) : W(h) ? (i = H, se(h)) : re(h) ? (e.consume(h), H) : X(h);
  }
  function S(h) {
    return h === 45 || h === 46 || h === 58 || h === 95 || Ce(h) ? (e.consume(h), S) : P(h);
  }
  function P(h) {
    return h === 61 ? (e.consume(h), B) : W(h) ? (i = P, se(h)) : re(h) ? (e.consume(h), P) : H(h);
  }
  function B(h) {
    return h === null || h === 60 || h === 61 || h === 62 || h === 96 ? t(h) : h === 34 || h === 39 ? (e.consume(h), o = h, ee) : W(h) ? (i = B, se(h)) : re(h) ? (e.consume(h), B) : (e.consume(h), L);
  }
  function ee(h) {
    return h === o ? (e.consume(h), o = void 0, C) : h === null ? t(h) : W(h) ? (i = ee, se(h)) : (e.consume(h), ee);
  }
  function L(h) {
    return h === null || h === 34 || h === 39 || h === 60 || h === 61 || h === 96 ? t(h) : h === 47 || h === 62 || he(h) ? H(h) : (e.consume(h), L);
  }
  function C(h) {
    return h === 47 || h === 62 || he(h) ? H(h) : t(h);
  }
  function X(h) {
    return h === 62 ? (e.consume(h), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(h);
  }
  function se(h) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), Q;
  }
  function Q(h) {
    return re(h) ? oe(e, fe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(h) : fe(h);
  }
  function fe(h) {
    return e.enter("htmlTextData"), i(h);
  }
}
const Br = {
  name: "labelEnd",
  resolveAll: Lu,
  resolveTo: Du,
  tokenize: Pu
}, Ou = {
  tokenize: Bu
}, Ru = {
  tokenize: Fu
}, Mu = {
  tokenize: zu
};
function Lu(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const o = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += o;
    }
  }
  return e.length !== t.length && Ge(e, 0, e.length, t), e;
}
function Du(e, n) {
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
  return s = [["enter", c, n], ["enter", l, n]], s = qe(s, e.slice(a + 1, a + r + 3)), s = qe(s, [["enter", u, n]]), s = qe(s, It(n.parser.constructs.insideSpan.null, e.slice(a + r + 4, i - 3), n)), s = qe(s, [["exit", u, n], e[i - 2], e[i - 1], ["exit", l, n]]), s = qe(s, e.slice(i + 1)), s = qe(s, [["exit", c, n]]), Ge(e, a, e.length, s), e;
}
function Pu(e, n, t) {
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
    return p === 40 ? e.attempt(Ou, u, i ? u : d)(p) : p === 91 ? e.attempt(Ru, u, i ? l : d)(p) : i ? u(p) : d(p);
  }
  function l(p) {
    return e.attempt(Mu, u, d)(p);
  }
  function u(p) {
    return n(p);
  }
  function d(p) {
    return a._balanced = !0, t(p);
  }
}
function Bu(e, n, t) {
  return r;
  function r(d) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), o;
  }
  function o(d) {
    return he(d) ? Vn(e, a)(d) : a(d);
  }
  function a(d) {
    return d === 41 ? u(d) : Po(e, i, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(d);
  }
  function i(d) {
    return he(d) ? Vn(e, c)(d) : u(d);
  }
  function s(d) {
    return t(d);
  }
  function c(d) {
    return d === 34 || d === 39 || d === 40 ? Fo(e, l, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(d) : u(d);
  }
  function l(d) {
    return he(d) ? Vn(e, u)(d) : u(d);
  }
  function u(d) {
    return d === 41 ? (e.enter("resourceMarker"), e.consume(d), e.exit("resourceMarker"), e.exit("resource"), n) : t(d);
  }
}
function Fu(e, n, t) {
  const r = this;
  return o;
  function o(s) {
    return Bo.call(r, e, a, i, "reference", "referenceMarker", "referenceString")(s);
  }
  function a(s) {
    return r.parser.defined.includes(Ye(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(s) : t(s);
  }
  function i(s) {
    return t(s);
  }
}
function zu(e, n, t) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), o;
  }
  function o(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), n) : t(a);
  }
}
const Uu = {
  name: "labelStartImage",
  resolveAll: Br.resolveAll,
  tokenize: $u
};
function $u(e, n, t) {
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
const Hu = {
  name: "labelStartLink",
  resolveAll: Br.resolveAll,
  tokenize: Gu
};
function Gu(e, n, t) {
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
  tokenize: Ku
};
function Ku(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), oe(e, n, "linePrefix");
  }
}
const _t = {
  name: "thematicBreak",
  tokenize: qu
};
function qu(e, n, t) {
  let r = 0, o;
  return a;
  function a(l) {
    return e.enter("thematicBreak"), i(l);
  }
  function i(l) {
    return o = l, s(l);
  }
  function s(l) {
    return l === o ? (e.enter("thematicBreakSequence"), c(l)) : r >= 3 && (l === null || W(l)) ? (e.exit("thematicBreak"), n(l)) : t(l);
  }
  function c(l) {
    return l === o ? (e.consume(l), r++, c) : (e.exit("thematicBreakSequence"), re(l) ? oe(e, s, "whitespace")(l) : s(l));
  }
}
const De = {
  continuation: {
    tokenize: Zu
  },
  exit: Qu,
  name: "list",
  tokenize: Yu
}, Wu = {
  partial: !0,
  tokenize: ju
}, Vu = {
  partial: !0,
  tokenize: Xu
};
function Yu(e, n, t) {
  const r = this, o = r.events[r.events.length - 1];
  let a = o && o[1].type === "linePrefix" ? o[2].sliceSerialize(o[1], !0).length : 0, i = 0;
  return s;
  function s(f) {
    const g = r.containerState.type || (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || f === r.containerState.marker : br(f)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), f === 42 || f === 45 ? e.check(_t, t, l)(f) : l(f);
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
      jn,
      // Can’t be empty when interrupting.
      r.interrupt ? t : u,
      e.attempt(Wu, p, d)
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
function Zu(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(jn, o, a);
  function o(s) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, oe(e, n, "listItemIndent", r.containerState.size + 1)(s);
  }
  function a(s) {
    return r.containerState.furtherBlankLines || !re(s) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, i(s)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Vu, n, i)(s));
  }
  function i(s) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, oe(e, e.attempt(De, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(s);
  }
}
function Xu(e, n, t) {
  const r = this;
  return oe(e, o, "listItemIndent", r.containerState.size + 1);
  function o(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? n(a) : t(a);
  }
}
function Qu(e) {
  e.exit(this.containerState.type);
}
function ju(e, n, t) {
  const r = this;
  return oe(e, o, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function o(a) {
    const i = r.events[r.events.length - 1];
    return !re(a) && i && i[1].type === "listItemPrefixWhitespace" ? n(a) : t(a);
  }
}
const vi = {
  name: "setextUnderline",
  resolveTo: Ju,
  tokenize: ed
};
function Ju(e, n) {
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
function ed(e, n, t) {
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
    return l === null || W(l) ? (e.exit("setextHeadingLine"), n(l)) : t(l);
  }
}
const nd = {
  tokenize: td
};
function td(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    jn,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, o, oe(e, e.attempt(this.parser.constructs.flow, o, e.attempt(su, o)), "linePrefix"))
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
const rd = {
  resolveAll: Uo()
}, id = zo("string"), od = zo("text");
function zo(e) {
  return {
    resolveAll: Uo(e === "text" ? ad : void 0),
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
function Uo(e) {
  return n;
  function n(t, r) {
    let o = -1, a;
    for (; ++o <= t.length; )
      a === void 0 ? t[o] && t[o][1].type === "data" && (a = o, o++) : (!t[o] || t[o][1].type !== "data") && (o !== a + 2 && (t[a][1].end = t[o - 1][1].end, t.splice(a + 2, o - a - 2), o = a + 2), a = void 0);
    return e ? e(t, r) : t;
  }
}
function ad(e, n) {
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
const sd = {
  42: De,
  43: De,
  45: De,
  48: De,
  49: De,
  50: De,
  51: De,
  52: De,
  53: De,
  54: De,
  55: De,
  56: De,
  57: De,
  62: Ro
}, ld = {
  91: fu
}, cd = {
  [-2]: Vt,
  [-1]: Vt,
  32: Vt
}, ud = {
  35: _u,
  42: _t,
  45: [vi, _t],
  60: wu,
  61: vi,
  95: _t,
  96: Ti,
  126: Ti
}, dd = {
  38: Lo,
  92: Mo
}, fd = {
  [-5]: Yt,
  [-4]: Yt,
  [-3]: Yt,
  33: Uu,
  38: Lo,
  42: _r,
  60: [Hc, Cu],
  91: Hu,
  92: [mu, Mo],
  93: Br,
  95: _r,
  96: nu
}, pd = {
  null: [_r, rd]
}, gd = {
  null: [42, 95]
}, hd = {
  null: []
}, md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: gd,
  contentInitial: ld,
  disable: hd,
  document: sd,
  flow: ud,
  flowInitial: cd,
  insideSpan: pd,
  string: dd,
  text: fd
}, Symbol.toStringTag, { value: "Module" }));
function bd(e, n, t) {
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
    check: U(w),
    consume: x,
    enter: k,
    exit: A,
    interrupt: U(w, {
      interrupt: !0
    })
  }, l = {
    code: null,
    containerState: {},
    defineSkip: E,
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
    return i = qe(i, P), y(), i[i.length - 1] !== null ? [] : ($(n, 0), l.events = It(a, l.events, l), l.events);
  }
  function p(P, B) {
    return Ed(f(P), B);
  }
  function f(P) {
    return _d(i, P);
  }
  function g() {
    const {
      _bufferIndex: P,
      _index: B,
      line: ee,
      column: L,
      offset: C
    } = r;
    return {
      _bufferIndex: P,
      _index: B,
      line: ee,
      column: L,
      offset: C
    };
  }
  function E(P) {
    o[P.line] = P.column, S();
  }
  function y() {
    let P;
    for (; r._index < i.length; ) {
      const B = i[r._index];
      if (typeof B == "string")
        for (P = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === P && r._bufferIndex < B.length; )
          _(B.charCodeAt(r._bufferIndex));
      else
        _(B);
    }
  }
  function _(P) {
    u = u(P);
  }
  function x(P) {
    W(P) ? (r.line++, r.column = 1, r.offset += P === -3 ? 2 : 1, S()) : P !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    i[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = P;
  }
  function k(P, B) {
    const ee = B || {};
    return ee.type = P, ee.start = g(), l.events.push(["enter", ee, l]), s.push(ee), ee;
  }
  function A(P) {
    const B = s.pop();
    return B.end = g(), l.events.push(["exit", B, l]), B;
  }
  function R(P, B) {
    $(P, B.from);
  }
  function w(P, B) {
    B.restore();
  }
  function U(P, B) {
    return ee;
    function ee(L, C, X) {
      let se, Q, fe, h;
      return Array.isArray(L) ? (
        /* c8 ignore next 1 */
        pe(L)
      ) : "tokenize" in L ? (
        // Looks like a construct.
        pe([
          /** @type {Construct} */
          L
        ])
      ) : ue(L);
      function ue(_e) {
        return en;
        function en(Be) {
          const nn = Be !== null && _e[Be], Fe = Be !== null && _e.null, cn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(nn) ? nn : nn ? [nn] : [],
            ...Array.isArray(Fe) ? Fe : Fe ? [Fe] : []
          ];
          return pe(cn)(Be);
        }
      }
      function pe(_e) {
        return se = _e, Q = 0, _e.length === 0 ? X : b(_e[Q]);
      }
      function b(_e) {
        return en;
        function en(Be) {
          return h = H(), fe = _e, _e.partial || (l.currentConstruct = _e), _e.name && l.parser.constructs.disable.null.includes(_e.name) ? Ke() : _e.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            B ? Object.assign(Object.create(l), B) : l,
            c,
            Oe,
            Ke
          )(Be);
        }
      }
      function Oe(_e) {
        return P(fe, h), C;
      }
      function Ke(_e) {
        return h.restore(), ++Q < se.length ? b(se[Q]) : X;
      }
    }
  }
  function $(P, B) {
    P.resolveAll && !a.includes(P) && a.push(P), P.resolve && Ge(l.events, B, l.events.length - B, P.resolve(l.events.slice(B), l)), P.resolveTo && (l.events = P.resolveTo(l.events, l));
  }
  function H() {
    const P = g(), B = l.previous, ee = l.currentConstruct, L = l.events.length, C = Array.from(s);
    return {
      from: L,
      restore: X
    };
    function X() {
      r = P, l.previous = B, l.currentConstruct = ee, l.events.length = L, s = C, S();
    }
  }
  function S() {
    r.line in o && r.column < 2 && (r.column = o[r.line], r.offset += o[r.line] - 1);
  }
}
function _d(e, n) {
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
function Ed(e, n) {
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
function yd(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Io([md, ...(e || {}).extensions || []])
    ),
    content: o(Dc),
    defined: [],
    document: o(Bc),
    flow: o(nd),
    lazy: {},
    string: o(id),
    text: o(od)
  };
  return r;
  function o(a) {
    return i;
    function i(s) {
      return bd(r, a, s);
    }
  }
}
function kd(e) {
  for (; !Do(e); )
    ;
  return e;
}
const Ci = /[\0\t\n\r]/g;
function wd() {
  let e = 1, n = "", t = !0, r;
  return o;
  function o(a, i, s) {
    const c = [];
    let l, u, d, p, f;
    for (a = n + (typeof a == "string" ? a.toString() : new TextDecoder(i || void 0).decode(a)), d = 0, n = "", t && (a.charCodeAt(0) === 65279 && d++, t = void 0); d < a.length; ) {
      if (Ci.lastIndex = d, l = Ci.exec(a), p = l && l.index !== void 0 ? l.index : a.length, f = a.charCodeAt(p), !l) {
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
const xd = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Sd(e) {
  return e.replace(xd, Nd);
}
function Nd(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const o = t.charCodeAt(1), a = o === 120 || o === 88;
    return Oo(t.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Pr(t) || e;
}
const $o = {}.hasOwnProperty;
function Td(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), Ad(t)(kd(yd(t).document().write(wd()(e, n, !0))));
}
function Ad(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Tn),
      autolinkProtocol: H,
      autolinkEmail: H,
      atxHeading: a(Nn),
      blockQuote: a(Fe),
      characterEscape: H,
      characterReference: H,
      codeFenced: a(cn),
      codeFencedFenceInfo: i,
      codeFencedFenceMeta: i,
      codeIndented: a(cn, i),
      codeText: a(Pn, i),
      codeTextData: H,
      data: H,
      codeFlowValue: H,
      definition: a(Bn),
      definitionDestinationString: i,
      definitionLabelString: i,
      definitionTitleString: i,
      emphasis: a(Fn),
      hardBreakEscape: a(ae),
      hardBreakTrailing: a(ae),
      htmlFlow: a(tn, i),
      htmlFlowData: H,
      htmlText: a(tn, i),
      htmlTextData: H,
      image: a(rn),
      label: i,
      link: a(Tn),
      listItem: a(Lt),
      listItemValue: p,
      listOrdered: a(zn, d),
      listUnordered: a(zn),
      paragraph: a(Dt),
      reference: b,
      referenceString: i,
      resourceDestinationString: i,
      resourceTitleString: i,
      setextHeading: a(Nn),
      strong: a(nt),
      thematicBreak: a(tt)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: R,
      autolink: c(),
      autolinkEmail: nn,
      autolinkProtocol: Be,
      blockQuote: c(),
      characterEscapeValue: S,
      characterReferenceMarkerHexadecimal: Ke,
      characterReferenceMarkerNumeric: Ke,
      characterReferenceValue: _e,
      characterReference: en,
      codeFenced: c(y),
      codeFencedFence: E,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: g,
      codeFlowValue: S,
      codeIndented: c(_),
      codeText: c(C),
      codeTextData: S,
      data: S,
      definition: c(),
      definitionDestinationString: A,
      definitionLabelString: x,
      definitionTitleString: k,
      emphasis: c(),
      hardBreakEscape: c(B),
      hardBreakTrailing: c(B),
      htmlFlow: c(ee),
      htmlFlowData: S,
      htmlText: c(L),
      htmlTextData: S,
      image: c(se),
      label: fe,
      labelText: Q,
      lineEnding: P,
      link: c(X),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: Oe,
      resourceDestinationString: h,
      resourceTitleString: ue,
      resource: pe,
      setextHeading: c($),
      setextHeadingLineSequence: U,
      setextHeadingText: w,
      strong: c(),
      thematicBreak: c()
    }
  };
  Ho(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(N) {
    let O = {
      type: "root",
      children: []
    };
    const V = {
      stack: [O],
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
          const ze = te.pop();
          le = o(N, ze, le);
        }
    for (le = -1; ++le < N.length; ) {
      const ze = n[N[le][0]];
      $o.call(ze, N[le][1].type) && ze[N[le][1].type].call(Object.assign({
        sliceSerialize: N[le][2].sliceSerialize
      }, V), N[le][1]);
    }
    if (V.tokenStack.length > 0) {
      const ze = V.tokenStack[V.tokenStack.length - 1];
      (ze[1] || Ii).call(V, void 0, ze[0]);
    }
    for (O.position = {
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
      O = n.transforms[le](O) || O;
    return O;
  }
  function o(N, O, V) {
    let te = O - 1, le = -1, ze = !1, an, We, un, bn;
    for (; ++te <= V; ) {
      const Re = N[te];
      switch (Re[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Re[0] === "enter" ? le++ : le--, bn = void 0;
          break;
        }
        case "lineEndingBlank": {
          Re[0] === "enter" && (an && !bn && !le && !un && (un = te), bn = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          bn = void 0;
      }
      if (!le && Re[0] === "enter" && Re[1].type === "listItemPrefix" || le === -1 && Re[0] === "exit" && (Re[1].type === "listUnordered" || Re[1].type === "listOrdered")) {
        if (an) {
          let dn = te;
          for (We = void 0; dn--; ) {
            const Ue = N[dn];
            if (Ue[1].type === "lineEnding" || Ue[1].type === "lineEndingBlank") {
              if (Ue[0] === "exit") continue;
              We && (N[We][1].type = "lineEndingBlank", ze = !0), Ue[1].type = "lineEnding", We = dn;
            } else if (!(Ue[1].type === "linePrefix" || Ue[1].type === "blockQuotePrefix" || Ue[1].type === "blockQuotePrefixWhitespace" || Ue[1].type === "blockQuoteMarker" || Ue[1].type === "listItemIndent")) break;
          }
          un && (!We || un < We) && (an._spread = !0), an.end = Object.assign({}, We ? N[We][1].start : Re[1].end), N.splice(We || te, 0, ["exit", an, Re[2]]), te++, V++;
        }
        if (Re[1].type === "listItemPrefix") {
          const dn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Re[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          an = dn, N.splice(te, 0, ["enter", dn, Re[2]]), te++, V++, un = void 0, bn = !0;
        }
      }
    }
    return N[O][1]._spread = ze, V;
  }
  function a(N, O) {
    return V;
    function V(te) {
      s.call(this, N(te), te), O && O.call(this, te);
    }
  }
  function i() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function s(N, O, V) {
    this.stack[this.stack.length - 1].children.push(N), this.stack.push(N), this.tokenStack.push([O, V || void 0]), N.position = {
      start: gn(O.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(N) {
    return O;
    function O(V) {
      N && N.call(this, V), l.call(this, V);
    }
  }
  function l(N, O) {
    const V = this.stack.pop(), te = this.tokenStack.pop();
    if (te)
      te[0].type !== N.type && (O ? O.call(this, N, te[0]) : (te[1] || Ii).call(this, N, te[0]));
    else throw new Error("Cannot close `" + N.type + "` (" + Wn({
      start: N.start,
      end: N.end
    }) + "): it’s not open");
    V.position.end = gn(N.end);
  }
  function u() {
    return Dr(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function p(N) {
    if (this.data.expectingFirstListItemValue) {
      const O = this.stack[this.stack.length - 2];
      O.start = Number.parseInt(this.sliceSerialize(N), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.lang = N;
  }
  function g() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.meta = N;
  }
  function E() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function y() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = N.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function _() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = N.replace(/(\r?\n|\r)$/g, "");
  }
  function x(N) {
    const O = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = O, V.identifier = Ye(this.sliceSerialize(N)).toLowerCase();
  }
  function k() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.title = N;
  }
  function A() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.url = N;
  }
  function R(N) {
    const O = this.stack[this.stack.length - 1];
    if (!O.depth) {
      const V = this.sliceSerialize(N).length;
      O.depth = V;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(N) {
    const O = this.stack[this.stack.length - 1];
    O.depth = this.sliceSerialize(N).codePointAt(0) === 61 ? 1 : 2;
  }
  function $() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function H(N) {
    const V = this.stack[this.stack.length - 1].children;
    let te = V[V.length - 1];
    (!te || te.type !== "text") && (te = on(), te.position = {
      start: gn(N.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, V.push(te)), this.stack.push(te);
  }
  function S(N) {
    const O = this.stack.pop();
    O.value += this.sliceSerialize(N), O.position.end = gn(N.end);
  }
  function P(N) {
    const O = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const V = O.children[O.children.length - 1];
      V.position.end = gn(N.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(O.type) && (H.call(this, N), S.call(this, N));
  }
  function B() {
    this.data.atHardBreak = !0;
  }
  function ee() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = N;
  }
  function L() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = N;
  }
  function C() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = N;
  }
  function X() {
    const N = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const O = this.data.referenceType || "shortcut";
      N.type += "Reference", N.referenceType = O, delete N.url, delete N.title;
    } else
      delete N.identifier, delete N.label;
    this.data.referenceType = void 0;
  }
  function se() {
    const N = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const O = this.data.referenceType || "shortcut";
      N.type += "Reference", N.referenceType = O, delete N.url, delete N.title;
    } else
      delete N.identifier, delete N.label;
    this.data.referenceType = void 0;
  }
  function Q(N) {
    const O = this.sliceSerialize(N), V = this.stack[this.stack.length - 2];
    V.label = Sd(O), V.identifier = Ye(O).toLowerCase();
  }
  function fe() {
    const N = this.stack[this.stack.length - 1], O = this.resume(), V = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, V.type === "link") {
      const te = N.children;
      V.children = te;
    } else
      V.alt = O;
  }
  function h() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.url = N;
  }
  function ue() {
    const N = this.resume(), O = this.stack[this.stack.length - 1];
    O.title = N;
  }
  function pe() {
    this.data.inReference = void 0;
  }
  function b() {
    this.data.referenceType = "collapsed";
  }
  function Oe(N) {
    const O = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = O, V.identifier = Ye(this.sliceSerialize(N)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ke(N) {
    this.data.characterReferenceType = N.type;
  }
  function _e(N) {
    const O = this.sliceSerialize(N), V = this.data.characterReferenceType;
    let te;
    V ? (te = Oo(O, V === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : te = Pr(O);
    const le = this.stack[this.stack.length - 1];
    le.value += te;
  }
  function en(N) {
    const O = this.stack.pop();
    O.position.end = gn(N.end);
  }
  function Be(N) {
    S.call(this, N);
    const O = this.stack[this.stack.length - 1];
    O.url = this.sliceSerialize(N);
  }
  function nn(N) {
    S.call(this, N);
    const O = this.stack[this.stack.length - 1];
    O.url = "mailto:" + this.sliceSerialize(N);
  }
  function Fe() {
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
  function Pn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Bn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Fn() {
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
  function zn(N) {
    return {
      type: "list",
      ordered: N.type === "listOrdered",
      start: null,
      spread: N._spread,
      children: []
    };
  }
  function Lt(N) {
    return {
      type: "listItem",
      spread: N._spread,
      checked: null,
      children: []
    };
  }
  function Dt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function nt() {
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
  function tt() {
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
function Ho(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Ho(e, r) : vd(e, r);
  }
}
function vd(e, n) {
  let t;
  for (t in n)
    if ($o.call(n, t))
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
function Ii(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Wn({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Wn({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Wn({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function Cd(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return Td(r, {
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
function Id(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Od(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function Rd(e, n) {
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
function Md(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Ld(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Dd(e, n) {
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
function Pd(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Bd(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function Go(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const o = e.all(n), a = o[0];
  a && a.type === "text" ? a.value = "[" + a.value : o.unshift({ type: "text", value: "[" });
  const i = o[o.length - 1];
  return i && i.type === "text" ? i.value += r : o.push({ type: "text", value: r }), o;
}
function Fd(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Go(e, n);
  const o = { src: Dn(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (o.title = r.title);
  const a = { type: "element", tagName: "img", properties: o, children: [] };
  return e.patch(n, a), e.applyData(n, a);
}
function zd(e, n) {
  const t = { src: Dn(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function Ud(e, n) {
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
function $d(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Go(e, n);
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
function Hd(e, n) {
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
function Gd(e, n, t) {
  const r = e.all(n), o = t ? Kd(t) : Ko(n), a = {}, i = [];
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
function Kd(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Ko(t[r]);
  }
  return n;
}
function Ko(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function qd(e, n) {
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
function Wd(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Vd(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Yd(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Zd(e, n) {
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
    }, s = Or(n.children[1]), c = xo(n.children[n.children.length - 1]);
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
function Xd(e, n, t) {
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
function Qd(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Oi = 9, Ri = 32;
function jd(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), o = 0;
  const a = [];
  for (; r; )
    a.push(
      Mi(n.slice(o, r.index), o > 0, !0),
      r[0]
    ), o = r.index + r[0].length, r = t.exec(n);
  return a.push(Mi(n.slice(o), o > 0, !1)), a.join("");
}
function Mi(e, n, t) {
  let r = 0, o = e.length;
  if (n) {
    let a = e.codePointAt(r);
    for (; a === Oi || a === Ri; )
      r++, a = e.codePointAt(r);
  }
  if (t) {
    let a = e.codePointAt(o - 1);
    for (; a === Oi || a === Ri; )
      o--, a = e.codePointAt(o - 1);
  }
  return o > r ? e.slice(r, o) : "";
}
function Jd(e, n) {
  const t = { type: "text", value: jd(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function ef(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const nf = {
  blockquote: Id,
  break: Od,
  code: Rd,
  delete: Md,
  emphasis: Ld,
  footnoteReference: Dd,
  heading: Pd,
  html: Bd,
  imageReference: Fd,
  image: zd,
  inlineCode: Ud,
  linkReference: $d,
  link: Hd,
  listItem: Gd,
  list: qd,
  paragraph: Wd,
  // @ts-expect-error: root is different, but hard to type.
  root: Vd,
  strong: Yd,
  table: Zd,
  tableCell: Qd,
  tableRow: Xd,
  text: Jd,
  thematicBreak: ef,
  toml: lt,
  yaml: lt,
  definition: lt,
  footnoteDefinition: lt
};
function lt() {
}
const qo = -1, Ot = 0, Yn = 1, wt = 2, Fr = 3, zr = 4, Ur = 5, $r = 6, Wo = 7, Vo = 8, Yo = typeof self == "object" ? self : globalThis, Li = (e, n) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new Yo[e](n);
}, tf = (e, n) => {
  const t = (o, a) => (e.set(a, o), o), r = (o) => {
    if (e.has(o))
      return e.get(o);
    const [a, i] = n[o];
    switch (a) {
      case Ot:
      case qo:
        return t(i, o);
      case Yn: {
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
      case Fr:
        return t(new Date(i), o);
      case zr: {
        const { source: s, flags: c } = i;
        return t(new RegExp(s, c), o);
      }
      case Ur: {
        const s = t(/* @__PURE__ */ new Map(), o);
        for (const [c, l] of i)
          s.set(r(c), r(l));
        return s;
      }
      case $r: {
        const s = t(/* @__PURE__ */ new Set(), o);
        for (const c of i)
          s.add(r(c));
        return s;
      }
      case Wo: {
        const { name: s, message: c } = i;
        return t(
          typeof Yo[s] == "function" ? Li(s, c) : new Error(c),
          o
        );
      }
      case Vo:
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
    return t(Li(a, i), o);
  };
  return r;
}, Di = (e) => tf(/* @__PURE__ */ new Map(), e)(0), yn = "", { toString: rf } = {}, { keys: of } = Object, Kn = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [Ot, n];
  const t = rf.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Yn, yn];
    case "Object":
      return [wt, yn];
    case "Date":
      return [Fr, yn];
    case "RegExp":
      return [zr, yn];
    case "Map":
      return [Ur, yn];
    case "Set":
      return [$r, yn];
    case "DataView":
      return [Yn, t];
  }
  return t.includes("Array") ? [Yn, t] : e instanceof Error ? [Wo, e.name || "Error"] : [wt, t];
}, ct = ([e, n]) => e === Ot && (n === "function" || n === "symbol"), af = (e, n, t, r) => {
  const o = (i, s) => {
    const c = r.push(i) - 1;
    return t.set(s, c), c;
  }, a = (i) => {
    if (t.has(i))
      return t.get(i);
    let [s, c] = Kn(i);
    switch (s) {
      case Ot: {
        let u = i;
        switch (c) {
          case "bigint":
            s = Vo, u = i.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            u = null;
            break;
          case "undefined":
            return o([qo], i);
        }
        return o([s, u], i);
      }
      case Yn: {
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
        for (const p of of(i))
          (e || !ct(Kn(i[p]))) && u.push([a(p), a(i[p])]);
        return d;
      }
      case Fr:
        return o([s, isNaN(i.getTime()) ? yn : i.toISOString()], i);
      case zr: {
        const { source: u, flags: d } = i;
        return o([s, { source: u, flags: d }], i);
      }
      case Ur: {
        const u = [], d = o([s, u], i);
        for (const [p, f] of i)
          (e || !(ct(Kn(p)) || ct(Kn(f)))) && u.push([a(p), a(f)]);
        return d;
      }
      case $r: {
        const u = [], d = o([s, u], i);
        for (const p of i)
          (e || !ct(Kn(p))) && u.push(a(p));
        return d;
      }
    }
    const { message: l } = i;
    return o([s, { name: c, message: l }], i);
  };
  return a;
}, Pi = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return af(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, xt = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? Di(Pi(e, n)) : structuredClone(e)
) : (e, n) => Di(Pi(e, n));
function sf(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function lf(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function cf(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || sf, r = e.options.footnoteBackLabel || lf, o = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", i = e.options.footnoteLabelProperties || {
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
    const g = [], E = e.footnoteCounts.get(d);
    for (; E !== void 0 && ++f <= E; ) {
      g.length > 0 && g.push({ type: "text", value: " " });
      let x = typeof t == "string" ? t : t(c, f);
      typeof x == "string" && (x = { type: "text", value: x }), g.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + p + (f > 1 ? "-" + f : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, f),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(x) ? x : [x]
      });
    }
    const y = u[u.length - 1];
    if (y && y.type === "element" && y.tagName === "p") {
      const x = y.children[y.children.length - 1];
      x && x.type === "text" ? x.value += " " : y.children.push({ type: "text", value: " " }), y.children.push(...g);
    } else
      u.push(...g);
    const _ = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + p },
      children: e.wrap(u, !0)
    };
    e.patch(l, _), s.push(_);
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
const Jn = (
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
      return pf;
    if (typeof e == "function")
      return Rt(e);
    if (typeof e == "object")
      return Array.isArray(e) ? uf(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        df(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return ff(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function uf(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Jn(e[t]);
  return Rt(r);
  function r(...o) {
    let a = -1;
    for (; ++a < n.length; )
      if (n[a].apply(this, o)) return !0;
    return !1;
  }
}
function df(e) {
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
function ff(e) {
  return Rt(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Rt(e) {
  return n;
  function n(t, r, o) {
    return !!(gf(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      o || void 0
    ));
  }
}
function pf() {
  return !0;
}
function gf(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Zo = [], hf = !0, Er = !1, mf = "skip";
function Xo(e, n, t, r) {
  let o;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : o = n;
  const a = Jn(o), i = r ? -1 : 1;
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
      let f = Zo, g, E, y;
      if ((!n || a(c, l, u[u.length - 1] || void 0)) && (f = bf(t(c, u)), f[0] === Er))
        return f;
      if ("children" in c && c.children) {
        const _ = (
          /** @type {UnistParent} */
          c
        );
        if (_.children && f[0] !== mf)
          for (E = (r ? _.children.length : -1) + i, y = u.concat(_); E > -1 && E < _.children.length; ) {
            const x = _.children[E];
            if (g = s(x, E, y)(), g[0] === Er)
              return g;
            E = typeof g[1] == "number" ? g[1] : E + i;
          }
      }
      return f;
    }
  }
}
function bf(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [hf, e] : e == null ? Zo : [e];
}
function Mt(e, n, t, r) {
  let o, a, i;
  typeof n == "function" && typeof t != "function" ? (a = void 0, i = n, o = t) : (a = n, i = t, o = r), Xo(e, a, s, o);
  function s(c, l) {
    const u = l[l.length - 1], d = u ? u.children.indexOf(c) : void 0;
    return i(c, d, u);
  }
}
const yr = {}.hasOwnProperty, _f = {};
function Ef(e, n) {
  const t = n || _f, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = { ...nf, ...t.handlers }, s = {
    all: l,
    applyData: kf,
    definitionById: r,
    footnoteById: o,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: i,
    one: c,
    options: t,
    patch: yf,
    wrap: xf
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
        const { children: E, ...y } = u, _ = xt(y);
        return _.children = s.all(u), _;
      }
      return xt(u);
    }
    return (s.options.unknownHandler || wf)(s, u, d);
  }
  function l(u) {
    const d = [];
    if ("children" in u) {
      const p = u.children;
      let f = -1;
      for (; ++f < p.length; ) {
        const g = s.one(p[f], u);
        if (g) {
          if (f && p[f - 1].type === "break" && (!Array.isArray(g) && g.type === "text" && (g.value = Bi(g.value)), !Array.isArray(g) && g.type === "element")) {
            const E = g.children[0];
            E && E.type === "text" && (E.value = Bi(E.value));
          }
          Array.isArray(g) ? d.push(...g) : d.push(g);
        }
      }
    }
    return d;
  }
}
function yf(e, n) {
  e.position && (n.position = sc(e));
}
function kf(e, n) {
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
function wf(e, n) {
  const t = n.data || {}, r = "value" in n && !(yr.call(t, "hProperties") || yr.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function xf(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function Bi(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function Fi(e, n) {
  const t = Ef(e, n), r = t.one(e, void 0), o = cf(t), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return o && a.children.push({ type: "text", value: `
` }, o), a;
}
function Sf(e, n) {
  return e && "run" in e ? async function(t, r) {
    const o = (
      /** @type {HastRoot} */
      Fi(t, { file: r, ...n })
    );
    await e.run(o, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      Fi(t, { file: r, ...e || n })
    );
  };
}
function zi(e) {
  if (e)
    throw e;
}
var Zt, Ui;
function Nf() {
  if (Ui) return Zt;
  Ui = 1;
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
    var l, u, d, p, f, g, E = arguments[0], y = 1, _ = arguments.length, x = !1;
    for (typeof E == "boolean" && (x = E, E = arguments[1] || {}, y = 2), (E == null || typeof E != "object" && typeof E != "function") && (E = {}); y < _; ++y)
      if (l = arguments[y], l != null)
        for (u in l)
          d = s(E, u), p = s(l, u), E !== p && (x && p && (a(p) || (f = o(p))) ? (f ? (f = !1, g = d && o(d) ? d : []) : g = d && a(d) ? d : {}, i(E, { name: u, newValue: c(x, g, p) })) : typeof p < "u" && i(E, { name: u, newValue: p }));
    return E;
  }, Zt;
}
var Tf = Nf();
const Xt = /* @__PURE__ */ Ir(Tf);
function kr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Af() {
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
      o = l, u ? vf(u, s)(...l) : i(null, ...l);
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
function vf(e, n) {
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
const je = { basename: Cf, dirname: If, extname: Of, join: Rf, sep: "/" };
function Cf(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  et(e);
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
function If(e) {
  if (et(e), e.length === 0)
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
function Of(e) {
  et(e);
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
function Rf(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    et(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Mf(t);
}
function Mf(e) {
  et(e);
  const n = e.codePointAt(0) === 47;
  let t = Lf(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function Lf(e, n) {
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
function et(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Df = { cwd: Pf };
function Pf() {
  return "/";
}
function wr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Bf(e) {
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
  return Ff(e);
}
function Ff(e) {
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
class Qo {
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
    n ? wr(n) ? t = { path: n } : typeof n == "string" || zf(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : Df.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    $i(this.basename, "dirname"), this.path = je.join(n || "", this.basename);
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
    if (jt(n, "extname"), $i(this.dirname, "extname"), n) {
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
    wr(n) && (n = Bf(n)), Jt(n, "path"), this.path !== n && this.history.push(n);
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
    const o = new Ie(
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
function $i(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function zf(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Uf = (
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
), $f = {}.hasOwnProperty;
class Hr extends Uf {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Af();
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
      new Hr()
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
    return typeof n == "string" ? arguments.length === 2 ? (tr("data", this.frozen), this.namespace[n] = t, this) : $f.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (tr("data", this.frozen), this.namespace = n, this) : this.namespace;
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
    const t = ut(n), r = this.parser || this.Parser;
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
      const s = ut(n), c = (
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
        Kf(g) ? p.value = g : p.result = g, l(
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
    return this.freeze(), er("processSync", this.parser || this.Parser), nr("processSync", this.compiler || this.Compiler), this.process(n, o), Gi("processSync", "process", t), r;
    function o(a, i) {
      t = !0, zi(a), r = i;
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
    Hi(n), this.freeze();
    const o = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? a(void 0, r) : new Promise(a);
    function a(i, s) {
      const c = ut(t);
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
    return this.run(n, t, a), Gi("runSync", "run", r), o;
    function a(i, s) {
      zi(i), o = s, r = !0;
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
    const r = ut(t), o = this.compiler || this.Compiler;
    return nr("stringify", o), Hi(n), o(n, r);
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
        const E = r[p][1];
        kr(E) && kr(f) && (f = Xt(!0, E, f)), r[p] = [l, f, ...g];
      }
    }
  }
}
const Hf = new Hr().freeze();
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
function Hi(e) {
  if (!kr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Gi(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function ut(e) {
  return Gf(e) ? e : new Qo(e);
}
function Gf(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Kf(e) {
  return typeof e == "string" || qf(e);
}
function qf(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Wf = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Ki = [], qi = { allowDangerousHtml: !0 }, Vf = /^(https?|ircs?|mailto|xmpp)$/i, Yf = [
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
function Zf(e) {
  const n = Xf(e), t = Qf(e);
  return jf(n.runSync(n.parse(t), t), e);
}
function Xf(e) {
  const n = e.rehypePlugins || Ki, t = e.remarkPlugins || Ki, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...qi } : qi;
  return Hf().use(Cd).use(t).use(Sf, r).use(n);
}
function Qf(e) {
  const n = e.children || "", t = new Qo();
  return typeof n == "string" && (t.value = n), t;
}
function jf(e, n) {
  const t = n.allowedElements, r = n.allowElement, o = n.components, a = n.disallowedElements, i = n.skipHtml, s = n.unwrapDisallowed, c = n.urlTransform || Jf;
  for (const u of Yf)
    Object.hasOwn(n, u.from) && ("" + u.from + (u.to ? "use `" + u.to + "` instead" : "remove it") + Wf + u.id, void 0);
  return Mt(e, l), fc(e, {
    Fragment: Tr,
    components: o,
    ignoreInvalidStyle: !0,
    jsx: K,
    jsxs: Ne,
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
          const g = u.properties[f], E = Wt[f];
          (E === null || E.includes(u.tagName)) && (u.properties[f] = c(String(g || ""), f, u));
        }
    }
    if (u.type === "element") {
      let f = t ? !t.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!f && r && typeof d == "number" && (f = !r(u, d, p)), f && p && typeof d == "number")
        return s && u.children ? p.children.splice(d, 1, ...u.children) : p.children.splice(d, 1), d;
    }
  }
}
function Jf(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), o = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    o !== -1 && n > o || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    Vf.test(e.slice(0, n)) ? e : ""
  );
}
function Wi(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, o = t.indexOf(n);
  for (; o !== -1; )
    r++, o = t.indexOf(n, o + n.length);
  return r;
}
function ep(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function np(e, n, t) {
  const o = Jn((t || {}).ignore || []), a = tp(n);
  let i = -1;
  for (; ++i < a.length; )
    Xo(e, "text", s);
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
    let _ = !1, x = [];
    p.lastIndex = 0;
    let k = p.exec(l.value);
    for (; k; ) {
      const A = k.index, R = {
        index: k.index,
        input: k.input,
        stack: [...u, l]
      };
      let w = f(...k, R);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === !1 ? p.lastIndex = A + 1 : (g !== A && x.push({
        type: "text",
        value: l.value.slice(g, A)
      }), Array.isArray(w) ? x.push(...w) : w && x.push(w), g = A + k[0].length, _ = !0), !p.global)
        break;
      k = p.exec(l.value);
    }
    return _ ? (g < l.value.length && x.push({ type: "text", value: l.value.slice(g) }), d.children.splice(y, 1, ...x)) : x = [l], y + x.length;
  }
}
function tp(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const o = t[r];
    n.push([rp(o[0]), ip(o[1])]);
  }
  return n;
}
function rp(e) {
  return typeof e == "string" ? new RegExp(ep(e), "g") : e;
}
function ip(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const rr = "phrasing", ir = ["autolink", "link", "image", "label"];
function op() {
  return {
    transforms: [fp],
    enter: {
      literalAutolink: sp,
      literalAutolinkEmail: or,
      literalAutolinkHttp: or,
      literalAutolinkWww: or
    },
    exit: {
      literalAutolink: dp,
      literalAutolinkEmail: up,
      literalAutolinkHttp: lp,
      literalAutolinkWww: cp
    }
  };
}
function ap() {
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
function sp(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function or(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function lp(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function cp(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function up(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function dp(e) {
  this.exit(e);
}
function fp(e) {
  np(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, pp],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), gp]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function pp(e, n, t, r, o) {
  let a = "";
  if (!jo(o) || (/^w/i.test(n) && (t = n + t, n = "", a = "http://"), !hp(t)))
    return !1;
  const i = mp(t + r);
  if (!i[0]) return !1;
  const s = {
    type: "link",
    title: null,
    url: a + n + i[0],
    children: [{ type: "text", value: n + i[0] }]
  };
  return i[1] ? [s, { type: "text", value: i[1] }] : s;
}
function gp(e, n, t, r) {
  return (
    // Not an expected previous character.
    !jo(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function hp(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function mp(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const o = Wi(e, "(");
  let a = Wi(e, ")");
  for (; r !== -1 && o > a; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), a++;
  return [e, t];
}
function jo(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || wn(t) || Ct(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
Jo.peek = Np;
function bp() {
  this.buffer();
}
function _p(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function Ep() {
  this.buffer();
}
function yp(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function kp(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Ye(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function wp(e) {
  this.exit(e);
}
function xp(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Ye(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function Sp(e) {
  this.exit(e);
}
function Np() {
  return "[";
}
function Jo(e, n, t, r) {
  const o = t.createTracker(r);
  let a = o.move("[^");
  const i = t.enter("footnoteReference"), s = t.enter("reference");
  return a += o.move(
    t.safe(t.associationId(e), { after: "]", before: a })
  ), s(), i(), a += o.move("]"), a;
}
function Tp() {
  return {
    enter: {
      gfmFootnoteCallString: bp,
      gfmFootnoteCall: _p,
      gfmFootnoteDefinitionLabelString: Ep,
      gfmFootnoteDefinition: yp
    },
    exit: {
      gfmFootnoteCallString: kp,
      gfmFootnoteCall: wp,
      gfmFootnoteDefinitionLabelString: xp,
      gfmFootnoteDefinition: Sp
    }
  };
}
function Ap(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: Jo },
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
        n ? ea : vp
      )
    )), l(), c;
  }
}
function vp(e, n, t) {
  return n === 0 ? e : ea(e, n, t);
}
function ea(e, n, t) {
  return (t ? "" : "    ") + e;
}
const Cp = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
na.peek = Lp;
function Ip() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: Rp },
    exit: { strikethrough: Mp }
  };
}
function Op() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Cp
      }
    ],
    handlers: { delete: na }
  };
}
function Rp(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function Mp(e) {
  this.exit(e);
}
function na(e, n, t, r) {
  const o = t.createTracker(r), a = t.enter("strikethrough");
  let i = o.move("~~");
  return i += t.containerPhrasing(e, {
    ...o.current(),
    before: i,
    after: "~"
  }), i += o.move("~~"), a(), i;
}
function Lp() {
  return "~";
}
function Dp(e) {
  return e.length;
}
function Pp(e, n) {
  const t = n || {}, r = (t.align || []).concat(), o = t.stringLength || Dp, a = [], i = [], s = [], c = [];
  let l = 0, u = -1;
  for (; ++u < e.length; ) {
    const E = [], y = [];
    let _ = -1;
    for (e[u].length > l && (l = e[u].length); ++_ < e[u].length; ) {
      const x = Bp(e[u][_]);
      if (t.alignDelimiters !== !1) {
        const k = o(x);
        y[_] = k, (c[_] === void 0 || k > c[_]) && (c[_] = k);
      }
      E.push(x);
    }
    i[u] = E, s[u] = y;
  }
  let d = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++d < l; )
      a[d] = Vi(r[d]);
  else {
    const E = Vi(r);
    for (; ++d < l; )
      a[d] = E;
  }
  d = -1;
  const p = [], f = [];
  for (; ++d < l; ) {
    const E = a[d];
    let y = "", _ = "";
    E === 99 ? (y = ":", _ = ":") : E === 108 ? y = ":" : E === 114 && (_ = ":");
    let x = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      c[d] - y.length - _.length
    );
    const k = y + "-".repeat(x) + _;
    t.alignDelimiters !== !1 && (x = y.length + x + _.length, x > c[d] && (c[d] = x), f[d] = x), p[d] = k;
  }
  i.splice(1, 0, p), s.splice(1, 0, f), u = -1;
  const g = [];
  for (; ++u < i.length; ) {
    const E = i[u], y = s[u];
    d = -1;
    const _ = [];
    for (; ++d < l; ) {
      const x = E[d] || "";
      let k = "", A = "";
      if (t.alignDelimiters !== !1) {
        const R = c[d] - (y[d] || 0), w = a[d];
        w === 114 ? k = " ".repeat(R) : w === 99 ? R % 2 ? (k = " ".repeat(R / 2 + 0.5), A = " ".repeat(R / 2 - 0.5)) : (k = " ".repeat(R / 2), A = k) : A = " ".repeat(R);
      }
      t.delimiterStart !== !1 && !d && _.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && x === "") && (t.delimiterStart !== !1 || d) && _.push(" "), t.alignDelimiters !== !1 && _.push(k), _.push(x), t.alignDelimiters !== !1 && _.push(A), t.padding !== !1 && _.push(" "), (t.delimiterEnd !== !1 || d !== l - 1) && _.push("|");
    }
    g.push(
      t.delimiterEnd === !1 ? _.join("").replace(/ +$/, "") : _.join("")
    );
  }
  return g.join(`
`);
}
function Bp(e) {
  return e == null ? "" : String(e);
}
function Vi(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function Fp(e, n, t, r) {
  const o = t.enter("blockquote"), a = t.createTracker(r);
  a.move("> "), a.shift(2);
  const i = t.indentLines(
    t.containerFlow(e, a.current()),
    zp
  );
  return o(), i;
}
function zp(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function Up(e, n) {
  return Yi(e, n.inConstruct, !0) && !Yi(e, n.notInConstruct, !1);
}
function Yi(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function Zi(e, n, t, r) {
  let o = -1;
  for (; ++o < t.unsafe.length; )
    if (t.unsafe[o].character === `
` && Up(t.stack, t.unsafe[o]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function $p(e, n) {
  const t = String(e);
  let r = t.indexOf(n), o = r, a = 0, i = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === o ? ++a > i && (i = a) : a = 1, o = r + n.length, r = t.indexOf(n, o);
  return i;
}
function Hp(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Gp(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function Kp(e, n, t, r) {
  const o = Gp(t), a = e.value || "", i = o === "`" ? "GraveAccent" : "Tilde";
  if (Hp(e, t)) {
    const d = t.enter("codeIndented"), p = t.indentLines(a, qp);
    return d(), p;
  }
  const s = t.createTracker(r), c = o.repeat(Math.max($p(a, o) + 1, 3)), l = t.enter("codeFenced");
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
function qp(e, n, t) {
  return (t ? "" : "    ") + e;
}
function Gr(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function Wp(e, n, t, r) {
  const o = Gr(t), a = o === '"' ? "Quote" : "Apostrophe", i = t.enter("definition");
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
function Vp(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function Xn(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function St(e, n, t) {
  const r = Mn(e), o = Mn(n);
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
ta.peek = Yp;
function ta(e, n, t, r) {
  const o = Vp(t), a = t.enter("emphasis"), i = t.createTracker(r), s = i.move(o);
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
  u.inside && (c = Xn(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), p = St(r.after.charCodeAt(0), d, o);
  p.inside && (c = c.slice(0, -1) + Xn(d));
  const f = i.move(o);
  return a(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: u.outside
  }, s + c + f;
}
function Yp(e, n, t) {
  return t.options.emphasis || "*";
}
function Zp(e, n) {
  let t = !1;
  return Mt(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, Er;
  }), !!((!e.depth || e.depth < 3) && Dr(e) && (n.options.setext || t));
}
function Xp(e, n, t, r) {
  const o = Math.max(Math.min(6, e.depth || 1), 1), a = t.createTracker(r);
  if (Zp(e, t)) {
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
  return /^[\t ]/.test(l) && (l = Xn(l.charCodeAt(0)) + l.slice(1)), l = l ? i + " " + l : i, t.options.closeAtx && (l += " " + i), c(), s(), l;
}
ra.peek = Qp;
function ra(e) {
  return e.value || "";
}
function Qp() {
  return "<";
}
ia.peek = jp;
function ia(e, n, t, r) {
  const o = Gr(t), a = o === '"' ? "Quote" : "Apostrophe", i = t.enter("image");
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
function jp() {
  return "!";
}
oa.peek = Jp;
function oa(e, n, t, r) {
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
function Jp() {
  return "!";
}
aa.peek = eg;
function aa(e, n, t) {
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
function eg() {
  return "`";
}
function sa(e, n) {
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
la.peek = ng;
function la(e, n, t, r) {
  const o = Gr(t), a = o === '"' ? "Quote" : "Apostrophe", i = t.createTracker(r);
  let s, c;
  if (sa(e, t)) {
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
function ng(e, n, t) {
  return sa(e, t) ? "<" : "[";
}
ca.peek = tg;
function ca(e, n, t, r) {
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
function tg() {
  return "[";
}
function Kr(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function rg(e) {
  const n = Kr(e), t = e.options.bulletOther;
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
function ig(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function ua(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function og(e, n, t, r) {
  const o = t.enter("list"), a = t.bulletCurrent;
  let i = e.ordered ? ig(t) : Kr(t);
  const s = e.ordered ? i === "." ? ")" : "." : rg(t);
  let c = n && t.bulletLastUsed ? i === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const u = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (i === "*" || i === "-") && // Empty first list item:
      u && (!u.children || !u.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (c = !0), ua(t) === i && u
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
function ag(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function sg(e, n, t, r) {
  const o = ag(t);
  let a = t.bulletCurrent || Kr(t);
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
function lg(e, n, t, r) {
  const o = t.enter("paragraph"), a = t.enter("phrasing"), i = t.containerPhrasing(e, r);
  return a(), o(), i;
}
const cg = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Jn([
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
function ug(e, n, t, r) {
  return (e.children.some(function(i) {
    return cg(i);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function dg(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
da.peek = fg;
function da(e, n, t, r) {
  const o = dg(t), a = t.enter("strong"), i = t.createTracker(r), s = i.move(o + o);
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
  u.inside && (c = Xn(l) + c.slice(1));
  const d = c.charCodeAt(c.length - 1), p = St(r.after.charCodeAt(0), d, o);
  p.inside && (c = c.slice(0, -1) + Xn(d));
  const f = i.move(o + o);
  return a(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: u.outside
  }, s + c + f;
}
function fg(e, n, t) {
  return t.options.strong || "*";
}
function pg(e, n, t, r) {
  return t.safe(e.value, r);
}
function gg(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function hg(e, n, t) {
  const r = (ua(t) + (t.options.ruleSpaces ? " " : "")).repeat(gg(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const fa = {
  blockquote: Fp,
  break: Zi,
  code: Kp,
  definition: Wp,
  emphasis: ta,
  hardBreak: Zi,
  heading: Xp,
  html: ra,
  image: ia,
  imageReference: oa,
  inlineCode: aa,
  link: la,
  linkReference: ca,
  list: og,
  listItem: sg,
  paragraph: lg,
  root: ug,
  strong: da,
  text: pg,
  thematicBreak: hg
};
function mg() {
  return {
    enter: {
      table: bg,
      tableData: Xi,
      tableHeader: Xi,
      tableRow: Eg
    },
    exit: {
      codeText: yg,
      table: _g,
      tableData: ar,
      tableHeader: ar,
      tableRow: ar
    }
  };
}
function bg(e) {
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
function _g(e) {
  this.exit(e), this.data.inTable = void 0;
}
function Eg(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function ar(e) {
  this.exit(e);
}
function Xi(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function yg(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, kg));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function kg(e, n) {
  return n === "|" ? n : e;
}
function wg(e) {
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
  function i(f, g, E, y) {
    return l(u(f, E, y), f.align);
  }
  function s(f, g, E, y) {
    const _ = d(f, E, y), x = l([_]);
    return x.slice(0, x.indexOf(`
`));
  }
  function c(f, g, E, y) {
    const _ = E.enter("tableCell"), x = E.enter("phrasing"), k = E.containerPhrasing(f, {
      ...y,
      before: a,
      after: a
    });
    return x(), _(), k;
  }
  function l(f, g) {
    return Pp(f, {
      align: g,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: o
    });
  }
  function u(f, g, E) {
    const y = f.children;
    let _ = -1;
    const x = [], k = g.enter("table");
    for (; ++_ < y.length; )
      x[_] = d(y[_], g, E);
    return k(), x;
  }
  function d(f, g, E) {
    const y = f.children;
    let _ = -1;
    const x = [], k = g.enter("tableRow");
    for (; ++_ < y.length; )
      x[_] = c(y[_], f, g, E);
    return k(), x;
  }
  function p(f, g, E) {
    let y = fa.inlineCode(f, g, E);
    return E.stack.includes("tableCell") && (y = y.replace(/\|/g, "\\$&")), y;
  }
}
function xg() {
  return {
    exit: {
      taskListCheckValueChecked: Qi,
      taskListCheckValueUnchecked: Qi,
      paragraph: Ng
    }
  };
}
function Sg() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: Tg }
  };
}
function Qi(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function Ng(e) {
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
function Tg(e, n, t, r) {
  const o = e.children[0], a = typeof e.checked == "boolean" && o && o.type === "paragraph", i = "[" + (e.checked ? "x" : " ") + "] ", s = t.createTracker(r);
  a && s.move(i);
  let c = fa.listItem(e, n, t, {
    ...r,
    ...s.current()
  });
  return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
  function l(u) {
    return u + i;
  }
}
function Ag() {
  return [
    op(),
    Tp(),
    Ip(),
    mg(),
    xg()
  ];
}
function vg(e) {
  return {
    extensions: [
      ap(),
      Ap(e),
      Op(),
      wg(e),
      Sg()
    ]
  };
}
const Cg = {
  tokenize: Dg,
  partial: !0
}, pa = {
  tokenize: Pg,
  partial: !0
}, ga = {
  tokenize: Bg,
  partial: !0
}, ha = {
  tokenize: Fg,
  partial: !0
}, Ig = {
  tokenize: zg,
  partial: !0
}, ma = {
  name: "wwwAutolink",
  tokenize: Mg,
  previous: _a
}, ba = {
  name: "protocolAutolink",
  tokenize: Lg,
  previous: Ea
}, ln = {
  name: "emailAutolink",
  tokenize: Rg,
  previous: ya
}, Je = {};
function Og() {
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
Je[72] = [ln, ba];
Je[104] = [ln, ba];
Je[87] = [ln, ma];
Je[119] = [ln, ma];
function Rg(e, n, t) {
  const r = this;
  let o, a;
  return i;
  function i(d) {
    return !xr(d) || !ya.call(r, r.previous) || qr(r.events) ? t(d) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(d));
  }
  function s(d) {
    return xr(d) ? (e.consume(d), s) : d === 64 ? (e.consume(d), c) : t(d);
  }
  function c(d) {
    return d === 46 ? e.check(Ig, u, l)(d) : d === 45 || d === 95 || Ce(d) ? (a = !0, e.consume(d), c) : u(d);
  }
  function l(d) {
    return e.consume(d), o = !0, c;
  }
  function u(d) {
    return a && o && Le(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(d)) : t(d);
  }
}
function Mg(e, n, t) {
  const r = this;
  return o;
  function o(i) {
    return i !== 87 && i !== 119 || !_a.call(r, r.previous) || qr(r.events) ? t(i) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Cg, e.attempt(pa, e.attempt(ga, a), t), t)(i));
  }
  function a(i) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(i);
  }
}
function Lg(e, n, t) {
  const r = this;
  let o = "", a = !1;
  return i;
  function i(d) {
    return (d === 72 || d === 104) && Ea.call(r, r.previous) && !qr(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), o += String.fromCodePoint(d), e.consume(d), s) : t(d);
  }
  function s(d) {
    if (Le(d) && o.length < 5)
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
    return d === null || kt(d) || he(d) || wn(d) || Ct(d) ? t(d) : e.attempt(pa, e.attempt(ga, u), t)(d);
  }
  function u(d) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(d);
  }
}
function Dg(e, n, t) {
  let r = 0;
  return o;
  function o(i) {
    return (i === 87 || i === 119) && r < 3 ? (r++, e.consume(i), o) : i === 46 && r === 3 ? (e.consume(i), a) : t(i);
  }
  function a(i) {
    return i === null ? t(i) : n(i);
  }
}
function Pg(e, n, t) {
  let r, o, a;
  return i;
  function i(l) {
    return l === 46 || l === 95 ? e.check(ha, c, s)(l) : l === null || he(l) || wn(l) || l !== 45 && Ct(l) ? c(l) : (a = !0, e.consume(l), i);
  }
  function s(l) {
    return l === 95 ? r = !0 : (o = r, r = void 0), e.consume(l), i;
  }
  function c(l) {
    return o || r || !a ? t(l) : n(l);
  }
}
function Bg(e, n) {
  let t = 0, r = 0;
  return o;
  function o(i) {
    return i === 40 ? (t++, e.consume(i), o) : i === 41 && r < t ? a(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? e.check(ha, n, a)(i) : i === null || he(i) || wn(i) ? n(i) : (e.consume(i), o);
  }
  function a(i) {
    return i === 41 && r++, e.consume(i), o;
  }
}
function Fg(e, n, t) {
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
    return Le(s) ? i(s) : t(s);
  }
  function i(s) {
    return s === 59 ? (e.consume(s), r) : Le(s) ? (e.consume(s), i) : t(s);
  }
}
function zg(e, n, t) {
  return r;
  function r(a) {
    return e.consume(a), o;
  }
  function o(a) {
    return Ce(a) ? t(a) : n(a);
  }
}
function _a(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || he(e);
}
function Ea(e) {
  return !Le(e);
}
function ya(e) {
  return !(e === 47 || xr(e));
}
function xr(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || Ce(e);
}
function qr(e) {
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
const Ug = {
  tokenize: Yg,
  partial: !0
};
function $g() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: qg,
        continuation: {
          tokenize: Wg
        },
        exit: Vg
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: Kg
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: Hg,
        resolveTo: Gg
      }
    }
  };
}
function Hg(e, n, t) {
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
function Gg(e, n) {
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
function Kg(e, n, t) {
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
function qg(e, n, t) {
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
      const E = e.exit("gfmFootnoteDefinitionLabelString");
      return a = Ye(r.sliceSerialize(E)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
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
function Wg(e, n, t) {
  return e.check(jn, n, e.attempt(Ug, n, t));
}
function Vg(e) {
  e.exit("gfmFootnoteDefinition");
}
function Yg(e, n, t) {
  const r = this;
  return oe(e, o, "gfmFootnoteDefinitionIndent", 5);
  function o(a) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? n(a) : t(a);
  }
}
function Zg(e) {
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
            f && Ge(p, p.length, 0, It(f, i.slice(l + 1, c), s)), Ge(p, p.length, 0, [["exit", d, s], ["enter", i[c][1], s], ["exit", i[c][1], s], ["exit", u, s]]), Ge(i, l - 1, c - l + 3, p), c = l + p.length - 2;
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
      const E = Mn(l);
      if (g === 126)
        return d > 1 ? c(g) : (i.consume(g), d++, f);
      if (d < 2 && !t) return c(g);
      const y = i.exit("strikethroughSequenceTemporary"), _ = Mn(g);
      return y._open = !_ || _ === 2 && !!E, y._close = !E || E === 2 && !!_, s(g);
    }
  }
}
class Xg {
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
    Qg(this, n, t, r);
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
function Qg(e, n, t, r) {
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
function jg(e, n) {
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
function Jg() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: eh,
        resolveAll: nh
      }
    }
  };
}
function eh(e, n, t) {
  const r = this;
  let o = 0, a = 0, i;
  return s;
  function s(S) {
    let P = r.events.length - 1;
    for (; P > -1; ) {
      const L = r.events[P][1].type;
      if (L === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      L === "linePrefix") P--;
      else break;
    }
    const B = P > -1 ? r.events[P][1].type : null, ee = B === "tableHead" || B === "tableRow" ? w : c;
    return ee === w && r.parser.lazy[r.now().line] ? t(S) : ee(S);
  }
  function c(S) {
    return e.enter("tableHead"), e.enter("tableRow"), l(S);
  }
  function l(S) {
    return S === 124 || (i = !0, a += 1), u(S);
  }
  function u(S) {
    return S === null ? t(S) : W(S) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(S), e.exit("lineEnding"), f) : t(S) : re(S) ? oe(e, u, "whitespace")(S) : (a += 1, i && (i = !1, o += 1), S === 124 ? (e.enter("tableCellDivider"), e.consume(S), e.exit("tableCellDivider"), i = !0, u) : (e.enter("data"), d(S)));
  }
  function d(S) {
    return S === null || S === 124 || he(S) ? (e.exit("data"), u(S)) : (e.consume(S), S === 92 ? p : d);
  }
  function p(S) {
    return S === 92 || S === 124 ? (e.consume(S), d) : d(S);
  }
  function f(S) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(S) : (e.enter("tableDelimiterRow"), i = !1, re(S) ? oe(e, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(S) : g(S));
  }
  function g(S) {
    return S === 45 || S === 58 ? y(S) : S === 124 ? (i = !0, e.enter("tableCellDivider"), e.consume(S), e.exit("tableCellDivider"), E) : R(S);
  }
  function E(S) {
    return re(S) ? oe(e, y, "whitespace")(S) : y(S);
  }
  function y(S) {
    return S === 58 ? (a += 1, i = !0, e.enter("tableDelimiterMarker"), e.consume(S), e.exit("tableDelimiterMarker"), _) : S === 45 ? (a += 1, _(S)) : S === null || W(S) ? A(S) : R(S);
  }
  function _(S) {
    return S === 45 ? (e.enter("tableDelimiterFiller"), x(S)) : R(S);
  }
  function x(S) {
    return S === 45 ? (e.consume(S), x) : S === 58 ? (i = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(S), e.exit("tableDelimiterMarker"), k) : (e.exit("tableDelimiterFiller"), k(S));
  }
  function k(S) {
    return re(S) ? oe(e, A, "whitespace")(S) : A(S);
  }
  function A(S) {
    return S === 124 ? g(S) : S === null || W(S) ? !i || o !== a ? R(S) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(S)) : R(S);
  }
  function R(S) {
    return t(S);
  }
  function w(S) {
    return e.enter("tableRow"), U(S);
  }
  function U(S) {
    return S === 124 ? (e.enter("tableCellDivider"), e.consume(S), e.exit("tableCellDivider"), U) : S === null || W(S) ? (e.exit("tableRow"), n(S)) : re(S) ? oe(e, U, "whitespace")(S) : (e.enter("data"), $(S));
  }
  function $(S) {
    return S === null || S === 124 || he(S) ? (e.exit("data"), U(S)) : (e.consume(S), S === 92 ? H : $);
  }
  function H(S) {
    return S === 92 || S === 124 ? (e.consume(S), $) : $(S);
  }
}
function nh(e, n) {
  let t = -1, r = !0, o = 0, a = [0, 0, 0, 0], i = [0, 0, 0, 0], s = !1, c = 0, l, u, d;
  const p = new Xg();
  for (; ++t < e.length; ) {
    const f = e[t], g = f[1];
    f[0] === "enter" ? g.type === "tableHead" ? (s = !1, c !== 0 && (ji(p, n, c, l, u), u = void 0, c = 0), l = {
      type: "table",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", l, n]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [0, 0, 0, 0], i = [0, t + 1, 0, 0], s && (s = !1, u = {
      type: "tableBody",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", u, n]])), o = g.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : o && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = !1, i[2] === 0 && (a[1] !== 0 && (i[0] = i[1], d = dt(p, n, a, o, void 0, d), a = [0, 0, 0, 0]), i[2] = t)) : g.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (i[0] = i[1], d = dt(p, n, a, o, void 0, d)), a = i, i = [a[1], t, 0, 0])) : g.type === "tableHead" ? (s = !0, c = t) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (c = t, a[1] !== 0 ? (i[0] = i[1], d = dt(p, n, a, o, t, d)) : i[1] !== 0 && (d = dt(p, n, i, o, t, d)), o = 0) : o && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (i[3] = t);
  }
  for (c !== 0 && ji(p, n, c, l, u), p.consume(n.events), t = -1; ++t < n.events.length; ) {
    const f = n.events[t];
    f[0] === "enter" && f[1].type === "table" && (f[1]._align = jg(n.events, t));
  }
  return e;
}
function dt(e, n, t, r, o, a) {
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
        const g = t[2] + 1, E = t[3] - t[2] - 1;
        e.add(g, E, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", d, n]]);
  }
  return o !== void 0 && (a.end = Object.assign({}, Cn(n.events, o)), e.add(o, 0, [["exit", a, n]]), a = void 0), a;
}
function ji(e, n, t, r, o) {
  const a = [], i = Cn(n.events, t);
  o && (o.end = Object.assign({}, i), a.push(["exit", o, n])), r.end = Object.assign({}, i), a.push(["exit", r, n]), e.add(t + 1, 0, a);
}
function Cn(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const th = {
  name: "tasklistCheck",
  tokenize: ih
};
function rh() {
  return {
    text: {
      91: th
    }
  };
}
function ih(e, n, t) {
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
    return W(c) ? n(c) : re(c) ? e.check({
      tokenize: oh
    }, n, t)(c) : t(c);
  }
}
function oh(e, n, t) {
  return oe(e, r, "whitespace");
  function r(o) {
    return o === null ? t(o) : n(o);
  }
}
function ah(e) {
  return Io([
    Og(),
    $g(),
    Zg(e),
    Jg(),
    rh()
  ]);
}
const sh = {};
function lh(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || sh, r = n.data(), o = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), i = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  o.push(ah(t)), a.push(Ag()), i.push(vg(t));
}
const Ji = (
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
    const r = Jn(t);
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
      return dh;
    if (typeof e == "string")
      return uh(e);
    if (typeof e == "object")
      return ch(e);
    if (typeof e == "function")
      return Wr(e);
    throw new Error("Expected function, string, or array as `test`");
  })
);
function ch(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Sn(e[t]);
  return Wr(r);
  function r(...o) {
    let a = -1;
    for (; ++a < n.length; )
      if (n[a].apply(this, o)) return !0;
    return !1;
  }
}
function uh(e) {
  return Wr(n);
  function n(t) {
    return t.tagName === e;
  }
}
function Wr(e) {
  return n;
  function n(t, r, o) {
    return !!(fh(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      o || void 0
    ));
  }
}
function dh(e) {
  return !!(e && typeof e == "object" && "type" in e && e.type === "element" && "tagName" in e && typeof e.tagName == "string");
}
function fh(e) {
  return e !== null && typeof e == "object" && "type" in e && "tagName" in e;
}
const eo = /\n/g, no = /[\t ]+/g, Sr = Sn("br"), to = Sn(yh), ph = Sn("p"), ro = Sn("tr"), gh = Sn([
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
  Eh,
  // From: <https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3>
  kh
]), ka = Sn([
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
function hh(e, n) {
  const t = n || {}, r = "children" in e ? e.children : [], o = ka(e), a = Sa(e, {
    whitespace: t.whitespace || "normal"
  }), i = [];
  (e.type === "text" || e.type === "comment") && i.push(
    ...xa(e, {
      breakBefore: !0,
      breakAfter: !0
    })
  );
  let s = -1;
  for (; ++s < r.length; )
    i.push(
      ...wa(
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
function wa(e, n, t) {
  return e.type === "element" ? mh(e, n, t) : e.type === "text" ? t.whitespace === "normal" ? xa(e, t) : bh(e) : [];
}
function mh(e, n, t) {
  const r = Sa(e, t), o = e.children || [];
  let a = -1, i = [];
  if (gh(e))
    return i;
  let s, c;
  for (Sr(e) || ro(e) && // @ts-expect-error: something up with types of parents.
  Ji(n, e, ro) ? c = `
` : ph(e) ? (s = 2, c = 2) : ka(e) && (s = 1, c = 1); ++a < o.length; )
    i = i.concat(
      wa(o[a], e, {
        whitespace: r,
        breakBefore: a ? void 0 : s,
        breakAfter: a < o.length - 1 ? Sr(o[a + 1]) : c
      })
    );
  return to(e) && // @ts-expect-error: something up with types of parents.
  Ji(n, e, to) && i.push("	"), s && i.unshift(s), c && i.push(c), i;
}
function xa(e, n) {
  const t = String(e.value), r = [], o = [];
  let a = 0;
  for (; a <= t.length; ) {
    eo.lastIndex = a;
    const c = eo.exec(t), l = c && "index" in c ? c.index : t.length;
    r.push(
      // Any sequence of collapsible spaces and tabs immediately preceding or
      // following a segment break is removed.
      _h(
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
function bh(e) {
  return [String(e.value)];
}
function _h(e, n, t) {
  const r = [];
  let o = 0, a;
  for (; o < e.length; ) {
    no.lastIndex = o;
    const i = no.exec(e);
    a = i ? i.index : e.length, !o && !a && i && !n && r.push(""), o !== a && r.push(e.slice(o, a)), o = i ? a + i[0].length : a;
  }
  return o !== a && !t && r.push(""), r.join(" ");
}
function Sa(e, n) {
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
function Eh(e) {
  return !!(e.properties || {}).hidden;
}
function yh(e) {
  return e.tagName === "td" || e.tagName === "th";
}
function kh(e) {
  return e.tagName === "dialog" && !(e.properties || {}).open;
}
function wh(e) {
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
  ], E = [
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
  ], _ = [
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
  ], A = {
    type: E,
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
      _hint: _
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
  }, w = [
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
    keywords: A,
    contains: w.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: A,
        contains: w.concat(["self"]),
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
    keywords: A,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: r,
        keywords: A,
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
        keywords: A,
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
            keywords: A,
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
    keywords: A,
    illegal: "</",
    classNameAliases: { "function.dispatch": "built_in" },
    contains: [].concat(
      U,
      $,
      R,
      w,
      [
        d,
        {
          // containers: ie, `vector <int> rooms (9);`
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
          end: ">",
          keywords: A,
          contains: [
            "self",
            s
          ]
        },
        {
          begin: e.IDENT_RE + "::",
          keywords: A
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
function xh(e) {
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
  }, t = wh(e), r = (
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
function Sh(e) {
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
  }, E = [
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
  ], _ = { match: /(\/[a-z._-]+)+/ }, x = [
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
  ], k = [
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
  ], A = [
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
      keyword: E,
      literal: y,
      built_in: [
        ...x,
        ...k,
        // Shell modifiers
        "set",
        "shopt",
        ...A,
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
      _,
      s,
      c,
      l,
      u,
      t
    ]
  };
}
function Nh(e) {
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
  }, _ = [
    d,
    s,
    t,
    e.C_BLOCK_COMMENT_MODE,
    u,
    l
  ], x = {
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
    contains: _.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: y,
        contains: _.concat(["self"]),
        relevance: 0
      }
    ]),
    relevance: 0
  }, k = {
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
      x,
      k,
      _,
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
function Th(e) {
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
  ], E = [
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
  ], _ = [
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
  ], A = {
    type: E,
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
      _hint: _
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
  }, w = [
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
    keywords: A,
    contains: w.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: A,
        contains: w.concat(["self"]),
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
    keywords: A,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      {
        // to prevent it from being confused as the function title
        begin: r,
        keywords: A,
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
        keywords: A,
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
            keywords: A,
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
    keywords: A,
    illegal: "</",
    classNameAliases: { "function.dispatch": "built_in" },
    contains: [].concat(
      U,
      $,
      R,
      w,
      [
        d,
        {
          // containers: ie, `vector <int> rooms (9);`
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
          end: ">",
          keywords: A,
          contains: [
            "self",
            s
          ]
        },
        {
          begin: e.IDENT_RE + "::",
          keywords: A
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
function Ah(e) {
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
  }, E = {
    className: "string",
    begin: /\$@"/,
    end: '"',
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      p
    ]
  }, y = e.inherit(E, {
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      f
    ]
  });
  p.contains = [
    E,
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
  const _ = { variants: [
    l,
    E,
    g,
    u,
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE
  ] }, x = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out" },
      s
    ]
  }, k = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", A = {
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
      _,
      c,
      {
        beginKeywords: "class interface",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          s,
          x,
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
          x,
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
        begin: "(" + k + "\\s+)+" + e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
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
              x
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
              _,
              c,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      A
    ]
  };
}
const vh = (e) => ({
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
}), Ch = [
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
], Ih = [
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
], Oh = [
  ...Ch,
  ...Ih
], Rh = [
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
].sort().reverse(), Mh = [
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
].sort().reverse(), Lh = [
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
].sort().reverse(), Dh = [
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
function Ph(e) {
  const n = e.regex, t = vh(e), r = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, o = "and or not only", a = /@-?\w[\w]*(-\w+)*/, i = "[a-zA-Z-][a-zA-Z0-9_-]*", s = [
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
          { begin: ":(" + Mh.join("|") + ")" },
          { begin: ":(:)?(" + Lh.join("|") + ")" }
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
        begin: "\\b(" + Dh.join("|") + ")\\b"
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
              attribute: Rh.join(" ")
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
        begin: "\\b(" + Oh.join("|") + ")\\b"
      }
    ]
  };
}
function Bh(e) {
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
function Fh(e) {
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
function zh(e) {
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
function Uh(e) {
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
var In = "[0-9](_*[0-9])*", ft = `\\.(${In})`, pt = "[0-9a-fA-F](_*[0-9a-fA-F])*", io = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${In})((${ft})|\\.)?|(${ft}))[eE][+-]?(${In})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${In})((${ft})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${ft})[fFdD]?\\b` },
    { begin: `\\b(${In})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${pt})\\.?|(${pt})?\\.(${pt}))[pP][+-]?(${In})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${pt})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function Na(e, n, t) {
  return t === -1 ? "" : e.replace(n, (r) => Na(e, n, t - 1));
}
function $h(e) {
  const n = e.regex, t = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", r = t + Na("(?:<" + t + "~~~(?:\\s*,\\s*" + t + "~~~)*>)?", /~~~/g, 2), c = {
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
              io,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      io,
      l
    ]
  };
}
const oo = "[A-Za-z$_][0-9A-Za-z$_]*", Hh = [
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
], Gh = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Ta = [
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
], Aa = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], va = [
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
], Kh = [
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
], qh = [].concat(
  va,
  Ta,
  Aa
);
function Wh(e) {
  const n = e.regex, t = (Q, { after: fe }) => {
    const h = "</" + Q[0].slice(1);
    return Q.input.indexOf(h, fe) !== -1;
  }, r = oo, o = {
    begin: "<>",
    end: "</>"
  }, a = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (Q, fe) => {
      const h = Q[0].length + Q.index, ue = Q.input[h];
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
      ue === ">" && (t(Q, { after: h }) || fe.ignoreMatch());
      let pe;
      const b = Q.input.substring(h);
      if (pe = b.match(/^\s*=/)) {
        fe.ignoreMatch();
        return;
      }
      if ((pe = b.match(/^\s+extends\s+/)) && pe.index === 0) {
        fe.ignoreMatch();
        return;
      }
    }
  }, s = {
    $pattern: oo,
    keyword: Hh,
    literal: Gh,
    built_in: qh,
    "variable.language": Kh
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
  }, E = {
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
  }, x = {
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
  }, k = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    g,
    E,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    d
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  p.contains = k.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: s,
    contains: [
      "self"
    ].concat(k)
  });
  const A = [].concat(x, p.contains), R = A.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: s,
      contains: ["self"].concat(A)
    }
  ]), w = {
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
        ...Ta,
        ...Aa
      ]
    }
  }, H = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, S = {
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
    contains: [w],
    illegal: /%/
  }, P = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function B(Q) {
    return n.concat("(?!", Q.join("|"), ")");
  }
  const ee = {
    match: n.concat(
      /\b/,
      B([
        ...va,
        "super",
        "import"
      ].map((Q) => `${Q}\\s*\\(`)),
      r,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, L = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, C = {
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
      w
    ]
  }, X = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", se = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(X)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      w
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
      E,
      y,
      x,
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
          x,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: X,
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
      S,
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
          w,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      L,
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
        contains: [w]
      },
      ee,
      P,
      U,
      C,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Vh(e) {
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
var On = "[0-9](_*[0-9])*", gt = `\\.(${On})`, ht = "[0-9a-fA-F](_*[0-9a-fA-F])*", Yh = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${On})((${gt})|\\.)?|(${gt}))[eE][+-]?(${On})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${On})((${gt})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${gt})[fFdD]?\\b` },
    { begin: `\\b(${On})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${ht})\\.?|(${ht})?\\.(${ht}))[pP][+-]?(${On})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${ht})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function Zh(e) {
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
  }, l = Yh, u = e.COMMENT(
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
const Xh = (e) => ({
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
}), Qh = [
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
], jh = [
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
], Jh = [
  ...Qh,
  ...jh
], em = [
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
].sort().reverse(), Ca = [
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
].sort().reverse(), Ia = [
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
].sort().reverse(), nm = [
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
].sort().reverse(), tm = Ca.concat(Ia).sort().reverse();
function rm(e) {
  const n = Xh(e), t = tm, r = "and or not only", o = "[\\w-]+", a = "(" + o + "|@\\{" + o + "\\})", i = [], s = [], c = function(k) {
    return {
      // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
      className: "string",
      begin: "~?" + k + ".*?" + k
    };
  }, l = function(k, A, R) {
    return {
      className: k,
      begin: A,
      relevance: R
    };
  }, u = {
    $pattern: /[a-z-]+/,
    keyword: r,
    attribute: em.join(" ")
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
        begin: "\\b(" + nm.join("|") + ")\\b",
        end: /(?=:)/,
        starts: {
          endsWithParent: !0,
          illegal: "[<=$]",
          relevance: 0,
          contains: s
        }
      }
    ]
  }, E = {
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
  }, _ = {
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
        begin: "\\b(" + Jh.join("|") + ")\\b",
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
        begin: ":(" + Ca.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + Ia.join("|") + ")"
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
  }, x = {
    begin: o + `:(:)?(${t.join("|")})`,
    returnBegin: !0,
    contains: [_]
  };
  return i.push(
    e.C_LINE_COMMENT_MODE,
    e.C_BLOCK_COMMENT_MODE,
    E,
    y,
    x,
    g,
    _,
    f,
    n.FUNCTION_DISPATCH
  ), {
    name: "Less",
    case_insensitive: !0,
    illegal: `[=>'/<($"]`,
    contains: i
  };
}
function im(e) {
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
function om(e) {
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
function am(e) {
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
  ].forEach((_) => {
    _.contains = _.contains.concat(f);
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
function sm(e) {
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
function lm(e) {
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
  ], p = (E, y, _ = "\\1") => {
    const x = _ === "\\1" ? _ : n.concat(_, y);
    return n.concat(
      n.concat("(?:", E, ")"),
      y,
      /(?:\\.|[^\\\/])*?/,
      x,
      /(?:\\.|[^\\\/])*?/,
      _,
      r
    );
  }, f = (E, y, _) => n.concat(
    n.concat("(?:", E, ")"),
    y,
    /(?:\\.|[^\\\/])*?/,
    _,
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
function cm(e) {
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
    "on:begin": (L, C) => {
      C.data._beginMatch = L[1] || L[2];
    },
    "on:end": (L, C) => {
      C.data._beginMatch !== L[1] && C.ignoreMatch();
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
  }, E = {
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
  ], _ = [
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
  ], x = [
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
  ], A = {
    keyword: _,
    literal: ((L) => {
      const C = [];
      return L.forEach((X) => {
        C.push(X), X.toLowerCase() === X ? C.push(X.toUpperCase()) : C.push(X.toLowerCase());
      }), C;
    })(y),
    built_in: x
  }, R = (L) => L.map((C) => C.replace(/\|\d+$/, "")), w = { variants: [
    {
      match: [
        /new/,
        n.concat(f, "+"),
        // to prevent built ins from being confused as the class constructor call
        n.concat("(?!", R(x).join("\\b|"), "\\b)"),
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
  }, S = {
    relevance: 0,
    begin: /\(/,
    end: /\)/,
    keywords: A,
    contains: [
      H,
      i,
      $,
      e.C_BLOCK_COMMENT_MODE,
      g,
      E,
      w
    ]
  }, P = {
    relevance: 0,
    match: [
      /\b/,
      // to prevent keywords from being confused as the function title
      n.concat("(?!fn\\b|function\\b|", R(_).join("\\b|"), "|", R(x).join("\\b|"), "\\b)"),
      r,
      n.concat(f, "*"),
      n.lookahead(/(?=\()/)
    ],
    scope: { 3: "title.function.invoke" },
    contains: [S]
  };
  S.contains.push(P);
  const B = [
    H,
    $,
    e.C_BLOCK_COMMENT_MODE,
    g,
    E,
    w
  ], ee = {
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
    keywords: A,
    contains: [
      ee,
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
      w,
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
            keywords: A,
            contains: [
              "self",
              ee,
              i,
              $,
              e.C_BLOCK_COMMENT_MODE,
              g,
              E
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
      E
    ]
  };
}
function um(e) {
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
function dm(e) {
  return {
    name: "Plain text",
    aliases: [
      "text",
      "txt"
    ],
    disableAutodetect: !0
  };
}
function fm(e) {
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
  }, p = "[0-9](_?[0-9])*", f = `(\\b(${p}))?\\.(${p})|\\b(${p})\\.`, g = `\\b|${r.join("|")}`, E = {
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
  }, _ = {
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
          E,
          d,
          e.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  return l.contains = [
    d,
    E,
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
      E,
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
        contains: [_]
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
          E,
          _,
          d
        ]
      }
    ]
  };
}
function pm(e) {
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
function gm(e) {
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
function hm(e) {
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
  }, E = {
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
  }, w = [
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
        E
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
  u.contains = w, E.contains = w;
  const S = [
    {
      begin: /^\s*=>/,
      starts: {
        end: "$",
        contains: w
      }
    },
    {
      className: "meta.prompt",
      begin: "^(" + "[>?]>" + "|" + "[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]" + "|" + "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>" + ")(?=[ ])",
      starts: {
        end: "$",
        keywords: i,
        contains: w
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
    contains: [e.SHEBANG({ binary: "ruby" })].concat(S).concat(l).concat(w)
  };
}
function mm(e) {
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
const bm = (e) => ({
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
}), _m = [
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
], Em = [
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
], ym = [
  ..._m,
  ...Em
], km = [
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
].sort().reverse(), wm = [
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
].sort().reverse(), xm = [
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
].sort().reverse(), Sm = [
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
function Nm(e) {
  const n = bm(e), t = xm, r = wm, o = "@[a-z-]+", a = "and or not only", s = {
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
        begin: "\\b(" + ym.join("|") + ")\\b",
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
        begin: "\\b(" + Sm.join("|") + ")\\b"
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
          attribute: km.join(" ")
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
function Tm(e) {
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
function Am(e) {
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
  ].filter((R) => !u.includes(R)), E = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/
  }, y = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, _ = {
    match: n.concat(/\b/, n.either(...f), /\s*\(/),
    relevance: 0,
    keywords: { built_in: f }
  };
  function x(R) {
    return n.concat(
      /\b/,
      n.either(...R.map((w) => w.replace(/\s+/, "\\s+"))),
      /\b/
    );
  }
  const k = {
    scope: "keyword",
    match: x(p),
    relevance: 0
  };
  function A(R, {
    exceptions: w,
    when: U
  } = {}) {
    const $ = U;
    return w = w || [], R.map((H) => H.match(/\|\d+$/) || w.includes(H) ? H : $(H) ? `${H}|0` : H);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: A(g, { when: (R) => R.length < 3 }),
      literal: a,
      type: s,
      built_in: d
    },
    contains: [
      {
        scope: "type",
        match: x(i)
      },
      k,
      _,
      E,
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
function qn(e) {
  return de("(?=", e, ")");
}
function de(...e) {
  return e.map((t) => Oa(t)).join("");
}
function vm(e) {
  const n = e[e.length - 1];
  return typeof n == "object" && n.constructor === Object ? (e.splice(e.length - 1, 1), n) : {};
}
function Me(...e) {
  return "(" + (vm(e).capture ? "" : "?:") + e.map((r) => Oa(r)).join("|") + ")";
}
const Vr = (e) => de(
  /\b/,
  e,
  /\w$/.test(e) ? /\b/ : /\B/
), Cm = [
  "Protocol",
  // contextual
  "Type"
  // contextual
].map(Vr), ao = [
  "init",
  "self"
].map(Vr), Im = [
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
], so = [
  "false",
  "nil",
  "true"
], Om = [
  "assignment",
  "associativity",
  "higherThan",
  "left",
  "lowerThan",
  "none",
  "right"
], Rm = [
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
], lo = [
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
], Ra = Me(
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
), Ma = Me(
  Ra,
  /[\u0300-\u036F]/,
  /[\u1DC0-\u1DFF]/,
  /[\u20D0-\u20FF]/,
  /[\uFE00-\uFE0F]/,
  /[\uFE20-\uFE2F]/
  // TODO: The following characters are also allowed, but the regex isn't supported yet.
  // /[\u{E0100}-\u{E01EF}]/u
), lr = de(Ra, Ma, "*"), La = Me(
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
), Nt = Me(
  La,
  /\d/,
  /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/
), Qe = de(La, Nt, "*"), mt = de(/[A-Z]/, Nt, "*"), Mm = [
  "attached",
  "autoclosure",
  de(/convention\(/, Me("swift", "block", "c"), /\)/),
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
], Lm = [
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
function Dm(e) {
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
      Me(...Cm, ...ao)
    ],
    className: { 2: "keyword" }
  }, a = {
    // Consume .keyword to prevent highlighting properties and methods as keywords.
    match: de(/\./, Me(...sr)),
    relevance: 0
  }, i = sr.filter((ae) => typeof ae == "string").concat(["_|0"]), s = sr.filter((ae) => typeof ae != "string").concat(Im).map(Vr), c = { variants: [
    {
      className: "keyword",
      match: Me(...s, ...ao)
    }
  ] }, l = {
    $pattern: Me(
      /\b\w+/,
      // regular keywords
      /#\w+/
      // number keywords
    ),
    keyword: i.concat(Rm),
    literal: so
  }, u = [
    o,
    a,
    c
  ], d = {
    // Consume .built_in to prevent highlighting properties and methods.
    match: de(/\./, Me(...lo)),
    relevance: 0
  }, p = {
    className: "built_in",
    match: de(/\b/, Me(...lo), /(?=\()/)
  }, f = [
    d,
    p
  ], g = {
    // Prevent -> from being highlighting as an operator.
    match: /->/,
    relevance: 0
  }, E = {
    className: "operator",
    relevance: 0,
    variants: [
      { match: lr },
      {
        // dot-operator: only operators that start with a dot are allowed to use dots as
        // characters (..., ...<, .*, etc). So there rule here is: a dot followed by one or more
        // characters that may also include dots.
        match: `\\.(\\.|${Ma})+`
      }
    ]
  }, y = [
    g,
    E
  ], _ = "([0-9]_*)+", x = "([0-9a-fA-F]_*)+", k = {
    className: "number",
    relevance: 0,
    variants: [
      // decimal floating-point-literal (subsumes decimal-literal)
      { match: `\\b(${_})(\\.(${_}))?([eE][+-]?(${_}))?\\b` },
      // hexadecimal floating-point-literal (subsumes hexadecimal-literal)
      { match: `\\b0x(${x})(\\.(${x}))?([pP][+-]?(${_}))?\\b` },
      // octal-literal
      { match: /\b0o([0-7]_*)+\b/ },
      // binary-literal
      { match: /\b0b([01]_*)+\b/ }
    ]
  }, A = (ae = "") => ({
    className: "subst",
    variants: [
      { match: de(/\\/, ae, /[0\\tnr"']/) },
      { match: de(/\\/, ae, /u\{[0-9a-fA-F]{1,8}\}/) }
    ]
  }), R = (ae = "") => ({
    className: "subst",
    match: de(/\\/, ae, /[\t ]*(?:[\r\n]|\r\n)/)
  }), w = (ae = "") => ({
    className: "subst",
    label: "interpol",
    begin: de(/\\/, ae, /\(/),
    end: /\)/
  }), U = (ae = "") => ({
    begin: de(ae, /"""/),
    end: de(/"""/, ae),
    contains: [
      A(ae),
      R(ae),
      w(ae)
    ]
  }), $ = (ae = "") => ({
    begin: de(ae, /"/),
    end: de(/"/, ae),
    contains: [
      A(ae),
      w(ae)
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
  }, S = [
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
    contains: S
  }, B = (ae) => {
    const tn = de(ae, /\//), rn = de(/\//, ae);
    return {
      begin: tn,
      end: rn,
      contains: [
        ...S,
        {
          scope: "comment",
          begin: `#(?!.*${rn})`,
          end: /$/
        }
      ]
    };
  }, ee = {
    scope: "regexp",
    variants: [
      B("###"),
      B("##"),
      B("#"),
      P
    ]
  }, L = { match: de(/`/, Qe, /`/) }, C = {
    className: "variable",
    match: /\$\d+/
  }, X = {
    className: "variable",
    match: `\\$${Nt}+`
  }, se = [
    L,
    C,
    X
  ], Q = {
    match: /(@|#(un)?)available/,
    scope: "keyword",
    starts: { contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: Lm,
        contains: [
          ...y,
          k,
          H
        ]
      }
    ] }
  }, fe = {
    scope: "keyword",
    match: de(/@/, Me(...Mm), qn(Me(/\(/, /\s+/)))
  }, h = {
    scope: "meta",
    match: de(/@/, Qe)
  }, ue = [
    Q,
    fe,
    h
  ], pe = {
    match: qn(/\b[A-Z]/),
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
        match: mt,
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
        match: de(/\s+&\s+/, qn(mt)),
        relevance: 0
      }
    ]
  }, b = {
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
  pe.contains.push(b);
  const Oe = {
    match: de(Qe, /\s*:/),
    keywords: "_|0",
    relevance: 0
  }, Ke = {
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    keywords: l,
    contains: [
      "self",
      Oe,
      ...r,
      ee,
      ...u,
      ...f,
      ...y,
      k,
      H,
      ...se,
      ...ue,
      pe
    ]
  }, _e = {
    begin: /</,
    end: />/,
    keywords: "repeat each",
    contains: [
      ...r,
      pe
    ]
  }, en = {
    begin: Me(
      qn(de(Qe, /\s*:/)),
      qn(de(Qe, /\s+/, Qe, /\s*:/))
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
  }, Be = {
    begin: /\(/,
    end: /\)/,
    keywords: l,
    contains: [
      en,
      ...r,
      ...u,
      ...y,
      k,
      H,
      ...ue,
      pe,
      Ke
    ],
    endsParent: !0,
    illegal: /["']/
  }, nn = {
    match: [
      /(func|macro)/,
      /\s+/,
      Me(L.match, Qe, lr)
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      _e,
      Be,
      n
    ],
    illegal: [
      /\[/,
      /%/
    ]
  }, Fe = {
    match: [
      /\b(?:subscript|init[?!]?)/,
      /\s*(?=[<(])/
    ],
    className: { 1: "keyword" },
    contains: [
      _e,
      Be,
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
  }, Pn = {
    begin: [
      /precedencegroup/,
      /\s+/,
      mt
    ],
    className: {
      1: "keyword",
      3: "title"
    },
    contains: [pe],
    keywords: [
      ...Om,
      ...so
    ],
    end: /}/
  }, Bn = {
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
  }, Fn = {
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
      _e,
      ...u,
      {
        begin: /:/,
        end: /\{/,
        keywords: l,
        contains: [
          {
            scope: "title.class.inherited",
            match: mt
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
      k,
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
      Fe,
      Bn,
      Fn,
      Nn,
      cn,
      Pn,
      {
        beginKeywords: "import",
        end: /$/,
        contains: [...r],
        relevance: 0
      },
      ee,
      ...u,
      ...f,
      ...y,
      k,
      H,
      ...se,
      ...ue,
      pe,
      Ke
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
], Pa = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Ba = [
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
], Fa = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], za = [
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
], Ua = [
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
], $a = [].concat(
  za,
  Ba,
  Fa
);
function Pm(e) {
  const n = e.regex, t = (Q, { after: fe }) => {
    const h = "</" + Q[0].slice(1);
    return Q.input.indexOf(h, fe) !== -1;
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
    isTrulyOpeningTag: (Q, fe) => {
      const h = Q[0].length + Q.index, ue = Q.input[h];
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
      ue === ">" && (t(Q, { after: h }) || fe.ignoreMatch());
      let pe;
      const b = Q.input.substring(h);
      if (pe = b.match(/^\s*=/)) {
        fe.ignoreMatch();
        return;
      }
      if ((pe = b.match(/^\s+extends\s+/)) && pe.index === 0) {
        fe.ignoreMatch();
        return;
      }
    }
  }, s = {
    $pattern: Tt,
    keyword: Da,
    literal: Pa,
    built_in: $a,
    "variable.language": Ua
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
  }, E = {
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
  }, x = {
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
  }, k = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    g,
    E,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    d
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  p.contains = k.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: s,
    contains: [
      "self"
    ].concat(k)
  });
  const A = [].concat(x, p.contains), R = A.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: s,
      contains: ["self"].concat(A)
    }
  ]), w = {
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
        ...Ba,
        ...Fa
      ]
    }
  }, H = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, S = {
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
    contains: [w],
    illegal: /%/
  }, P = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function B(Q) {
    return n.concat("(?!", Q.join("|"), ")");
  }
  const ee = {
    match: n.concat(
      /\b/,
      B([
        ...za,
        "super",
        "import"
      ].map((Q) => `${Q}\\s*\\(`)),
      r,
      n.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, L = {
    begin: n.concat(/\./, n.lookahead(
      n.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, C = {
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
      w
    ]
  }, X = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", se = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      n.lookahead(X)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      w
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
      E,
      y,
      x,
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
          x,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: X,
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
      S,
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
          w,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      L,
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
        contains: [w]
      },
      ee,
      P,
      U,
      C,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Bm(e) {
  const n = e.regex, t = Pm(e), r = Tt, o = [
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
    literal: Pa,
    built_in: $a.concat(o),
    "variable.language": Ua
  }, u = {
    className: "meta",
    begin: "@" + r
  }, d = (E, y, _) => {
    const x = E.contains.findIndex((k) => k.label === y);
    if (x === -1)
      throw new Error("can not find mode to replace");
    E.contains.splice(x, 1, _);
  };
  Object.assign(t.keywords, l), t.exports.PARAMS_CONTAINS.push(u);
  const p = t.contains.find((E) => E.scope === "attr"), f = Object.assign(
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
  const g = t.contains.find((E) => E.label === "func.def");
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
function Fm(e) {
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
function zm(e) {
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
function Um(e) {
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
function $m(e) {
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
  }, E = {
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
    E,
    a,
    i
  ], _ = [...y];
  return _.pop(), _.push(s), f.contains = _, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: y
  };
}
const Hm = {
  arduino: xh,
  bash: Sh,
  c: Nh,
  cpp: Th,
  csharp: Ah,
  css: Ph,
  diff: Bh,
  go: Fh,
  graphql: zh,
  ini: Uh,
  java: $h,
  javascript: Wh,
  json: Vh,
  kotlin: Zh,
  less: rm,
  lua: im,
  makefile: om,
  markdown: am,
  objectivec: sm,
  perl: lm,
  php: cm,
  "php-template": um,
  plaintext: dm,
  python: fm,
  "python-repl": pm,
  r: gm,
  ruby: hm,
  rust: mm,
  scss: Nm,
  shell: Tm,
  sql: Am,
  swift: Dm,
  typescript: Bm,
  vbnet: Fm,
  wasm: zm,
  xml: Um,
  yaml: $m
};
var cr, co;
function Gm() {
  if (co) return cr;
  co = 1;
  function e(m) {
    return m instanceof Map ? m.clear = m.delete = m.set = function() {
      throw new Error("map is read-only");
    } : m instanceof Set && (m.add = m.clear = m.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(m), Object.getOwnPropertyNames(m).forEach((T) => {
      const M = m[T], j = typeof M;
      (j === "object" || j === "function") && !Object.isFrozen(M) && e(M);
    }), m;
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
  function t(m) {
    return m.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function r(m, ...T) {
    const M = /* @__PURE__ */ Object.create(null);
    for (const j in m)
      M[j] = m[j];
    return T.forEach(function(j) {
      for (const Ee in j)
        M[Ee] = j[Ee];
    }), /** @type {T} */
    M;
  }
  const o = "</span>", a = (m) => !!m.scope, i = (m, { prefix: T }) => {
    if (m.startsWith("language:"))
      return m.replace("language:", "language-");
    if (m.includes(".")) {
      const M = m.split(".");
      return [
        `${T}${M.shift()}`,
        ...M.map((j, Ee) => `${j}${"_".repeat(Ee + 1)}`)
      ].join(" ");
    }
    return `${T}${m}`;
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
  const c = (m = {}) => {
    const T = { children: [] };
    return Object.assign(T, m), T;
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
      return typeof M == "string" ? T.addText(M) : M.children && (T.openNode(M), M.children.forEach((j) => this._walk(T, j)), T.closeNode(M)), T;
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
      const j = T.root;
      M && (j.scope = `language:${M}`), this.add(j);
    }
    toHTML() {
      return new s(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function d(m) {
    return m ? typeof m == "string" ? m : m.source : null;
  }
  function p(m) {
    return E("(?=", m, ")");
  }
  function f(m) {
    return E("(?:", m, ")*");
  }
  function g(m) {
    return E("(?:", m, ")?");
  }
  function E(...m) {
    return m.map((M) => d(M)).join("");
  }
  function y(m) {
    const T = m[m.length - 1];
    return typeof T == "object" && T.constructor === Object ? (m.splice(m.length - 1, 1), T) : {};
  }
  function _(...m) {
    return "(" + (y(m).capture ? "" : "?:") + m.map((j) => d(j)).join("|") + ")";
  }
  function x(m) {
    return new RegExp(m.toString() + "|").exec("").length - 1;
  }
  function k(m, T) {
    const M = m && m.exec(T);
    return M && M.index === 0;
  }
  const A = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function R(m, { joinWith: T }) {
    let M = 0;
    return m.map((j) => {
      M += 1;
      const Ee = M;
      let ye = d(j), z = "";
      for (; ye.length > 0; ) {
        const F = A.exec(ye);
        if (!F) {
          z += ye;
          break;
        }
        z += ye.substring(0, F.index), ye = ye.substring(F.index + F[0].length), F[0][0] === "\\" && F[1] ? z += "\\" + String(Number(F[1]) + Ee) : (z += F[0], F[0] === "(" && M++);
      }
      return z;
    }).map((j) => `(${j})`).join(T);
  }
  const w = /\b\B/, U = "[a-zA-Z]\\w*", $ = "[a-zA-Z_]\\w*", H = "\\b\\d+(\\.\\d+)?", S = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", P = "\\b(0b[01]+)", B = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", ee = (m = {}) => {
    const T = /^#![ ]*\//;
    return m.binary && (m.begin = E(
      T,
      /.*\b/,
      m.binary,
      /\b.*/
    )), r({
      scope: "meta",
      begin: T,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (M, j) => {
        M.index !== 0 && j.ignoreMatch();
      }
    }, m);
  }, L = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, C = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [L]
  }, X = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [L]
  }, se = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, Q = function(m, T, M = {}) {
    const j = r(
      {
        scope: "comment",
        begin: m,
        end: T,
        contains: []
      },
      M
    );
    j.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const Ee = _(
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
    return j.contains.push(
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
        begin: E(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          Ee,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), j;
  }, fe = Q("//", "$"), h = Q("/\\*", "\\*/"), ue = Q("#", "$"), pe = {
    scope: "number",
    begin: H,
    relevance: 0
  }, b = {
    scope: "number",
    begin: S,
    relevance: 0
  }, Oe = {
    scope: "number",
    begin: P,
    relevance: 0
  }, Ke = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      L,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [L]
      }
    ]
  }, _e = {
    scope: "title",
    begin: U,
    relevance: 0
  }, en = {
    scope: "title",
    begin: $,
    relevance: 0
  }, Be = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + $,
    relevance: 0
  };
  var Fe = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: C,
    BACKSLASH_ESCAPE: L,
    BINARY_NUMBER_MODE: Oe,
    BINARY_NUMBER_RE: P,
    COMMENT: Q,
    C_BLOCK_COMMENT_MODE: h,
    C_LINE_COMMENT_MODE: fe,
    C_NUMBER_MODE: b,
    C_NUMBER_RE: S,
    END_SAME_AS_BEGIN: function(m) {
      return Object.assign(
        m,
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
    MATCH_NOTHING_RE: w,
    METHOD_GUARD: Be,
    NUMBER_MODE: pe,
    NUMBER_RE: H,
    PHRASAL_WORDS_MODE: se,
    QUOTE_STRING_MODE: X,
    REGEXP_MODE: Ke,
    RE_STARTERS_RE: B,
    SHEBANG: ee,
    TITLE_MODE: _e,
    UNDERSCORE_IDENT_RE: $,
    UNDERSCORE_TITLE_MODE: en
  });
  function cn(m, T) {
    m.input[m.index - 1] === "." && T.ignoreMatch();
  }
  function Pn(m, T) {
    m.className !== void 0 && (m.scope = m.className, delete m.className);
  }
  function Bn(m, T) {
    T && m.beginKeywords && (m.begin = "\\b(" + m.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", m.__beforeBegin = cn, m.keywords = m.keywords || m.beginKeywords, delete m.beginKeywords, m.relevance === void 0 && (m.relevance = 0));
  }
  function Fn(m, T) {
    Array.isArray(m.illegal) && (m.illegal = _(...m.illegal));
  }
  function Nn(m, T) {
    if (m.match) {
      if (m.begin || m.end) throw new Error("begin & end are not supported with match");
      m.begin = m.match, delete m.match;
    }
  }
  function ae(m, T) {
    m.relevance === void 0 && (m.relevance = 1);
  }
  const tn = (m, T) => {
    if (!m.beforeMatch) return;
    if (m.starts) throw new Error("beforeMatch cannot be used with starts");
    const M = Object.assign({}, m);
    Object.keys(m).forEach((j) => {
      delete m[j];
    }), m.keywords = M.keywords, m.begin = E(M.beforeMatch, p(M.begin)), m.starts = {
      relevance: 0,
      contains: [
        Object.assign(M, { endsParent: !0 })
      ]
    }, m.relevance = 0, delete M.beforeMatch;
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
  function zn(m, T, M = Tn) {
    const j = /* @__PURE__ */ Object.create(null);
    return typeof m == "string" ? Ee(M, m.split(" ")) : Array.isArray(m) ? Ee(M, m) : Object.keys(m).forEach(function(ye) {
      Object.assign(
        j,
        zn(m[ye], T, ye)
      );
    }), j;
    function Ee(ye, z) {
      T && (z = z.map((F) => F.toLowerCase())), z.forEach(function(F) {
        const Y = F.split("|");
        j[Y[0]] = [ye, Lt(Y[0], Y[1])];
      });
    }
  }
  function Lt(m, T) {
    return T ? Number(T) : Dt(m) ? 0 : 1;
  }
  function Dt(m) {
    return rn.includes(m.toLowerCase());
  }
  const nt = {}, on = (m) => {
    console.error(m);
  }, tt = (m, ...T) => {
    console.log(`WARN: ${m}`, ...T);
  }, N = (m, T) => {
    nt[`${m}/${T}`] || (console.log(`Deprecated as of ${m}. ${T}`), nt[`${m}/${T}`] = !0);
  }, O = new Error();
  function V(m, T, { key: M }) {
    let j = 0;
    const Ee = m[M], ye = {}, z = {};
    for (let F = 1; F <= T.length; F++)
      z[F + j] = Ee[F], ye[F + j] = !0, j += x(T[F - 1]);
    m[M] = z, m[M]._emit = ye, m[M]._multi = !0;
  }
  function te(m) {
    if (Array.isArray(m.begin)) {
      if (m.skip || m.excludeBegin || m.returnBegin)
        throw on("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), O;
      if (typeof m.beginScope != "object" || m.beginScope === null)
        throw on("beginScope must be object"), O;
      V(m, m.begin, { key: "beginScope" }), m.begin = R(m.begin, { joinWith: "" });
    }
  }
  function le(m) {
    if (Array.isArray(m.end)) {
      if (m.skip || m.excludeEnd || m.returnEnd)
        throw on("skip, excludeEnd, returnEnd not compatible with endScope: {}"), O;
      if (typeof m.endScope != "object" || m.endScope === null)
        throw on("endScope must be object"), O;
      V(m, m.end, { key: "endScope" }), m.end = R(m.end, { joinWith: "" });
    }
  }
  function ze(m) {
    m.scope && typeof m.scope == "object" && m.scope !== null && (m.beginScope = m.scope, delete m.scope);
  }
  function an(m) {
    ze(m), typeof m.beginScope == "string" && (m.beginScope = { _wrap: m.beginScope }), typeof m.endScope == "string" && (m.endScope = { _wrap: m.endScope }), te(m), le(m);
  }
  function We(m) {
    function T(z, F) {
      return new RegExp(
        d(z),
        "m" + (m.case_insensitive ? "i" : "") + (m.unicodeRegex ? "u" : "") + (F ? "g" : "")
      );
    }
    class M {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(F, Y) {
        Y.position = this.position++, this.matchIndexes[this.matchAt] = Y, this.regexes.push([Y, F]), this.matchAt += x(F) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const F = this.regexes.map((Y) => Y[1]);
        this.matcherRe = T(R(F, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(F) {
        this.matcherRe.lastIndex = this.lastIndex;
        const Y = this.matcherRe.exec(F);
        if (!Y)
          return null;
        const Se = Y.findIndex((Un, Pt) => Pt > 0 && Un !== void 0), ke = this.matchIndexes[Se];
        return Y.splice(0, Se), Object.assign(Y, ke);
      }
    }
    class j {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(F) {
        if (this.multiRegexes[F]) return this.multiRegexes[F];
        const Y = new M();
        return this.rules.slice(F).forEach(([Se, ke]) => Y.addRule(Se, ke)), Y.compile(), this.multiRegexes[F] = Y, Y;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(F, Y) {
        this.rules.push([F, Y]), Y.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(F) {
        const Y = this.getMatcher(this.regexIndex);
        Y.lastIndex = this.lastIndex;
        let Se = Y.exec(F);
        if (this.resumingScanAtSamePosition() && !(Se && Se.index === this.lastIndex)) {
          const ke = this.getMatcher(0);
          ke.lastIndex = this.lastIndex + 1, Se = ke.exec(F);
        }
        return Se && (this.regexIndex += Se.position + 1, this.regexIndex === this.count && this.considerAll()), Se;
      }
    }
    function Ee(z) {
      const F = new j();
      return z.contains.forEach((Y) => F.addRule(Y.begin, { rule: Y, type: "begin" })), z.terminatorEnd && F.addRule(z.terminatorEnd, { type: "end" }), z.illegal && F.addRule(z.illegal, { type: "illegal" }), F;
    }
    function ye(z, F) {
      const Y = (
        /** @type CompiledMode */
        z
      );
      if (z.isCompiled) return Y;
      [
        Pn,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        Nn,
        an,
        tn
      ].forEach((ke) => ke(z, F)), m.compilerExtensions.forEach((ke) => ke(z, F)), z.__beforeBegin = null, [
        Bn,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        Fn,
        // default to 1 relevance if not specified
        ae
      ].forEach((ke) => ke(z, F)), z.isCompiled = !0;
      let Se = null;
      return typeof z.keywords == "object" && z.keywords.$pattern && (z.keywords = Object.assign({}, z.keywords), Se = z.keywords.$pattern, delete z.keywords.$pattern), Se = Se || /\w+/, z.keywords && (z.keywords = zn(z.keywords, m.case_insensitive)), Y.keywordPatternRe = T(Se, !0), F && (z.begin || (z.begin = /\B|\b/), Y.beginRe = T(Y.begin), !z.end && !z.endsWithParent && (z.end = /\B|\b/), z.end && (Y.endRe = T(Y.end)), Y.terminatorEnd = d(Y.end) || "", z.endsWithParent && F.terminatorEnd && (Y.terminatorEnd += (z.end ? "|" : "") + F.terminatorEnd)), z.illegal && (Y.illegalRe = T(
        /** @type {RegExp | string} */
        z.illegal
      )), z.contains || (z.contains = []), z.contains = [].concat(...z.contains.map(function(ke) {
        return bn(ke === "self" ? z : ke);
      })), z.contains.forEach(function(ke) {
        ye(
          /** @type Mode */
          ke,
          Y
        );
      }), z.starts && ye(z.starts, F), Y.matcher = Ee(Y), Y;
    }
    if (m.compilerExtensions || (m.compilerExtensions = []), m.contains && m.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return m.classNameAliases = r(m.classNameAliases || {}), ye(
      /** @type Mode */
      m
    );
  }
  function un(m) {
    return m ? m.endsWithParent || un(m.starts) : !1;
  }
  function bn(m) {
    return m.variants && !m.cachedVariants && (m.cachedVariants = m.variants.map(function(T) {
      return r(m, { variants: null }, T);
    })), m.cachedVariants ? m.cachedVariants : un(m) ? r(m, { starts: m.starts ? r(m.starts) : null }) : Object.isFrozen(m) ? r(m) : m;
  }
  var Re = "11.11.1";
  class dn extends Error {
    constructor(T, M) {
      super(T), this.name = "HTMLInjectionError", this.html = M;
    }
  }
  const Ue = t, Yr = r, Zr = Symbol("nomatch"), Ga = 7, Xr = function(m) {
    const T = /* @__PURE__ */ Object.create(null), M = /* @__PURE__ */ Object.create(null), j = [];
    let Ee = !0;
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
    function Y(I) {
      return F.noHighlightRe.test(I);
    }
    function Se(I) {
      let q = I.className + " ";
      q += I.parentNode ? I.parentNode.className : "";
      const ie = F.languageDetectRe.exec(q);
      if (ie) {
        const me = fn(ie[1]);
        return me || (tt(ye.replace("{}", ie[1])), tt("Falling back to no-highlight mode for this block.", I)), me ? ie[1] : "no-highlight";
      }
      return q.split(/\s+/).find((me) => Y(me) || fn(me));
    }
    function ke(I, q, ie) {
      let me = "", xe = "";
      typeof q == "object" ? (me = I, ie = q.ignoreIllegals, xe = q.language) : (N("10.7.0", "highlight(lang, code, ...args) has been deprecated."), N("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), xe = I, me = q), ie === void 0 && (ie = !0);
      const Ve = {
        code: me,
        language: xe
      };
      it("before:highlight", Ve);
      const pn = Ve.result ? Ve.result : Un(Ve.language, Ve.code, ie);
      return pn.code = Ve.code, it("after:highlight", pn), pn;
    }
    function Un(I, q, ie, me) {
      const xe = /* @__PURE__ */ Object.create(null);
      function Ve(D, G) {
        return D.keywords[G];
      }
      function pn() {
        if (!J.keywords) {
          Te.addText(be);
          return;
        }
        let D = 0;
        J.keywordPatternRe.lastIndex = 0;
        let G = J.keywordPatternRe.exec(be), ne = "";
        for (; G; ) {
          ne += be.substring(D, G.index);
          const ce = Xe.case_insensitive ? G[0].toLowerCase() : G[0], Ae = Ve(J, ce);
          if (Ae) {
            const [sn, as] = Ae;
            if (Te.addText(ne), ne = "", xe[ce] = (xe[ce] || 0) + 1, xe[ce] <= Ga && (st += as), sn.startsWith("_"))
              ne += G[0];
            else {
              const ss = Xe.classNameAliases[sn] || sn;
              Ze(G[0], ss);
            }
          } else
            ne += G[0];
          D = J.keywordPatternRe.lastIndex, G = J.keywordPatternRe.exec(be);
        }
        ne += be.substring(D), Te.addText(ne);
      }
      function ot() {
        if (be === "") return;
        let D = null;
        if (typeof J.subLanguage == "string") {
          if (!T[J.subLanguage]) {
            Te.addText(be);
            return;
          }
          D = Un(J.subLanguage, be, !0, ii[J.subLanguage]), ii[J.subLanguage] = /** @type {CompiledMode} */
          D._top;
        } else
          D = Bt(be, J.subLanguage.length ? J.subLanguage : null);
        J.relevance > 0 && (st += D.relevance), Te.__addSublanguage(D._emitter, D.language);
      }
      function $e() {
        J.subLanguage != null ? ot() : pn(), be = "";
      }
      function Ze(D, G) {
        D !== "" && (Te.startScope(G), Te.addText(D), Te.endScope());
      }
      function ei(D, G) {
        let ne = 1;
        const ce = G.length - 1;
        for (; ne <= ce; ) {
          if (!D._emit[ne]) {
            ne++;
            continue;
          }
          const Ae = Xe.classNameAliases[D[ne]] || D[ne], sn = G[ne];
          Ae ? Ze(sn, Ae) : (be = sn, pn(), be = ""), ne++;
        }
      }
      function ni(D, G) {
        return D.scope && typeof D.scope == "string" && Te.openNode(Xe.classNameAliases[D.scope] || D.scope), D.beginScope && (D.beginScope._wrap ? (Ze(be, Xe.classNameAliases[D.beginScope._wrap] || D.beginScope._wrap), be = "") : D.beginScope._multi && (ei(D.beginScope, G), be = "")), J = Object.create(D, { parent: { value: J } }), J;
      }
      function ti(D, G, ne) {
        let ce = k(D.endRe, ne);
        if (ce) {
          if (D["on:end"]) {
            const Ae = new n(D);
            D["on:end"](G, Ae), Ae.isMatchIgnored && (ce = !1);
          }
          if (ce) {
            for (; D.endsParent && D.parent; )
              D = D.parent;
            return D;
          }
        }
        if (D.endsWithParent)
          return ti(D.parent, G, ne);
      }
      function ns(D) {
        return J.matcher.regexIndex === 0 ? (be += D[0], 1) : ($t = !0, 0);
      }
      function ts(D) {
        const G = D[0], ne = D.rule, ce = new n(ne), Ae = [ne.__beforeBegin, ne["on:begin"]];
        for (const sn of Ae)
          if (sn && (sn(D, ce), ce.isMatchIgnored))
            return ns(G);
        return ne.skip ? be += G : (ne.excludeBegin && (be += G), $e(), !ne.returnBegin && !ne.excludeBegin && (be = G)), ni(ne, D), ne.returnBegin ? 0 : G.length;
      }
      function rs(D) {
        const G = D[0], ne = q.substring(D.index), ce = ti(J, D, ne);
        if (!ce)
          return Zr;
        const Ae = J;
        J.endScope && J.endScope._wrap ? ($e(), Ze(G, J.endScope._wrap)) : J.endScope && J.endScope._multi ? ($e(), ei(J.endScope, D)) : Ae.skip ? be += G : (Ae.returnEnd || Ae.excludeEnd || (be += G), $e(), Ae.excludeEnd && (be = G));
        do
          J.scope && Te.closeNode(), !J.skip && !J.subLanguage && (st += J.relevance), J = J.parent;
        while (J !== ce.parent);
        return ce.starts && ni(ce.starts, D), Ae.returnEnd ? 0 : G.length;
      }
      function is() {
        const D = [];
        for (let G = J; G !== Xe; G = G.parent)
          G.scope && D.unshift(G.scope);
        D.forEach((G) => Te.openNode(G));
      }
      let at = {};
      function ri(D, G) {
        const ne = G && G[0];
        if (be += D, ne == null)
          return $e(), 0;
        if (at.type === "begin" && G.type === "end" && at.index === G.index && ne === "") {
          if (be += q.slice(G.index, G.index + 1), !Ee) {
            const ce = new Error(`0 width match regex (${I})`);
            throw ce.languageName = I, ce.badRule = at.rule, ce;
          }
          return 1;
        }
        if (at = G, G.type === "begin")
          return ts(G);
        if (G.type === "illegal" && !ie) {
          const ce = new Error('Illegal lexeme "' + ne + '" for mode "' + (J.scope || "<unnamed>") + '"');
          throw ce.mode = J, ce;
        } else if (G.type === "end") {
          const ce = rs(G);
          if (ce !== Zr)
            return ce;
        }
        if (G.type === "illegal" && ne === "")
          return be += `
`, 1;
        if (Ut > 1e5 && Ut > G.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return be += ne, ne.length;
      }
      const Xe = fn(I);
      if (!Xe)
        throw on(ye.replace("{}", I)), new Error('Unknown language: "' + I + '"');
      const os = We(Xe);
      let zt = "", J = me || os;
      const ii = {}, Te = new F.__emitter(F);
      is();
      let be = "", st = 0, _n = 0, Ut = 0, $t = !1;
      try {
        if (Xe.__emitTokens)
          Xe.__emitTokens(q, Te);
        else {
          for (J.matcher.considerAll(); ; ) {
            Ut++, $t ? $t = !1 : J.matcher.considerAll(), J.matcher.lastIndex = _n;
            const D = J.matcher.exec(q);
            if (!D) break;
            const G = q.substring(_n, D.index), ne = ri(G, D);
            _n = D.index + ne;
          }
          ri(q.substring(_n));
        }
        return Te.finalize(), zt = Te.toHTML(), {
          language: I,
          value: zt,
          relevance: st,
          illegal: !1,
          _emitter: Te,
          _top: J
        };
      } catch (D) {
        if (D.message && D.message.includes("Illegal"))
          return {
            language: I,
            value: Ue(q),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: D.message,
              index: _n,
              context: q.slice(_n - 100, _n + 100),
              mode: D.mode,
              resultSoFar: zt
            },
            _emitter: Te
          };
        if (Ee)
          return {
            language: I,
            value: Ue(q),
            illegal: !1,
            relevance: 0,
            errorRaised: D,
            _emitter: Te,
            _top: J
          };
        throw D;
      }
    }
    function Pt(I) {
      const q = {
        value: Ue(I),
        illegal: !1,
        relevance: 0,
        _top: z,
        _emitter: new F.__emitter(F)
      };
      return q._emitter.addText(I), q;
    }
    function Bt(I, q) {
      q = q || F.languages || Object.keys(T);
      const ie = Pt(I), me = q.filter(fn).filter(Jr).map(
        ($e) => Un($e, I, !1)
      );
      me.unshift(ie);
      const xe = me.sort(($e, Ze) => {
        if ($e.relevance !== Ze.relevance) return Ze.relevance - $e.relevance;
        if ($e.language && Ze.language) {
          if (fn($e.language).supersetOf === Ze.language)
            return 1;
          if (fn(Ze.language).supersetOf === $e.language)
            return -1;
        }
        return 0;
      }), [Ve, pn] = xe, ot = Ve;
      return ot.secondBest = pn, ot;
    }
    function Ka(I, q, ie) {
      const me = q && M[q] || ie;
      I.classList.add("hljs"), I.classList.add(`language-${me}`);
    }
    function Ft(I) {
      let q = null;
      const ie = Se(I);
      if (Y(ie)) return;
      if (it(
        "before:highlightElement",
        { el: I, language: ie }
      ), I.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", I);
        return;
      }
      if (I.children.length > 0 && (F.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(I)), F.throwUnescapedHTML))
        throw new dn(
          "One of your code blocks includes unescaped HTML.",
          I.innerHTML
        );
      q = I;
      const me = q.textContent, xe = ie ? ke(me, { language: ie, ignoreIllegals: !0 }) : Bt(me);
      I.innerHTML = xe.value, I.dataset.highlighted = "yes", Ka(I, ie, xe.language), I.result = {
        language: xe.language,
        // TODO: remove with version 11.0
        re: xe.relevance,
        relevance: xe.relevance
      }, xe.secondBest && (I.secondBest = {
        language: xe.secondBest.language,
        relevance: xe.secondBest.relevance
      }), it("after:highlightElement", { el: I, result: xe, text: me });
    }
    function qa(I) {
      F = Yr(F, I);
    }
    const Wa = () => {
      rt(), N("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function Va() {
      rt(), N("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Qr = !1;
    function rt() {
      function I() {
        rt();
      }
      if (document.readyState === "loading") {
        Qr || window.addEventListener("DOMContentLoaded", I, !1), Qr = !0;
        return;
      }
      document.querySelectorAll(F.cssSelector).forEach(Ft);
    }
    function Ya(I, q) {
      let ie = null;
      try {
        ie = q(m);
      } catch (me) {
        if (on("Language definition for '{}' could not be registered.".replace("{}", I)), Ee)
          on(me);
        else
          throw me;
        ie = z;
      }
      ie.name || (ie.name = I), T[I] = ie, ie.rawDefinition = q.bind(null, m), ie.aliases && jr(ie.aliases, { languageName: I });
    }
    function Za(I) {
      delete T[I];
      for (const q of Object.keys(M))
        M[q] === I && delete M[q];
    }
    function Xa() {
      return Object.keys(T);
    }
    function fn(I) {
      return I = (I || "").toLowerCase(), T[I] || T[M[I]];
    }
    function jr(I, { languageName: q }) {
      typeof I == "string" && (I = [I]), I.forEach((ie) => {
        M[ie.toLowerCase()] = q;
      });
    }
    function Jr(I) {
      const q = fn(I);
      return q && !q.disableAutodetect;
    }
    function Qa(I) {
      I["before:highlightBlock"] && !I["before:highlightElement"] && (I["before:highlightElement"] = (q) => {
        I["before:highlightBlock"](
          Object.assign({ block: q.el }, q)
        );
      }), I["after:highlightBlock"] && !I["after:highlightElement"] && (I["after:highlightElement"] = (q) => {
        I["after:highlightBlock"](
          Object.assign({ block: q.el }, q)
        );
      });
    }
    function ja(I) {
      Qa(I), j.push(I);
    }
    function Ja(I) {
      const q = j.indexOf(I);
      q !== -1 && j.splice(q, 1);
    }
    function it(I, q) {
      const ie = I;
      j.forEach(function(me) {
        me[ie] && me[ie](q);
      });
    }
    function es(I) {
      return N("10.7.0", "highlightBlock will be removed entirely in v12.0"), N("10.7.0", "Please use highlightElement now."), Ft(I);
    }
    Object.assign(m, {
      highlight: ke,
      highlightAuto: Bt,
      highlightAll: rt,
      highlightElement: Ft,
      // TODO: Remove with v12 API
      highlightBlock: es,
      configure: qa,
      initHighlighting: Wa,
      initHighlightingOnLoad: Va,
      registerLanguage: Ya,
      unregisterLanguage: Za,
      listLanguages: Xa,
      getLanguage: fn,
      registerAliases: jr,
      autoDetection: Jr,
      inherit: Yr,
      addPlugin: ja,
      removePlugin: Ja
    }), m.debugMode = function() {
      Ee = !1;
    }, m.safeMode = function() {
      Ee = !0;
    }, m.versionString = Re, m.regex = {
      concat: E,
      lookahead: p,
      either: _,
      optional: g,
      anyNumberOfTimes: f
    };
    for (const I in Fe)
      typeof Fe[I] == "object" && e(Fe[I]);
    return Object.assign(m, Fe), m;
  }, An = Xr({});
  return An.newInstance = () => Xr({}), cr = An, An.HighlightJS = An, An.default = An, cr;
}
var Km = /* @__PURE__ */ Gm();
const qm = /* @__PURE__ */ Ir(Km), uo = {}, Wm = "hljs-";
function Vm(e) {
  const n = qm.newInstance();
  return e && a(e), {
    highlight: t,
    highlightAuto: r,
    listLanguages: o,
    register: a,
    registerAlias: i,
    registered: s
  };
  function t(c, l, u) {
    const d = u || uo, p = typeof d.prefix == "string" ? d.prefix : Wm;
    if (!n.getLanguage(c))
      throw new Error("Unknown language: `" + c + "` is not registered");
    n.configure({ __emitter: Ym, classPrefix: p });
    const f = (
      /** @type {HighlightResult & {_emitter: HastEmitter}} */
      n.highlight(l, { ignoreIllegals: !0, language: c })
    );
    if (f.errorRaised)
      throw new Error("Could not highlight with `Highlight.js`", {
        cause: f.errorRaised
      });
    const g = f._emitter.root, E = (
      /** @type {RootData} */
      g.data
    );
    return E.language = f.language, E.relevance = f.relevance, g;
  }
  function r(c, l) {
    const d = (l || uo).subset || o();
    let p = -1, f = 0, g;
    for (; ++p < d.length; ) {
      const E = d[p];
      if (!n.getLanguage(E)) continue;
      const y = t(E, c, l);
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
class Ym {
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
const Zm = {};
function Xm(e) {
  const n = e || Zm, t = n.aliases, r = n.detect || !1, o = n.languages || Hm, a = n.plainText, i = n.prefix, s = n.subset;
  let c = "hljs";
  const l = Vm(o);
  if (t && l.registerAlias(t), i) {
    const u = i.indexOf("-");
    c = u === -1 ? i : i.slice(0, u);
  }
  return function(u, d) {
    Mt(u, "element", function(p, f, g) {
      if (p.tagName !== "code" || !g || g.type !== "element" || g.tagName !== "pre")
        return;
      const E = Qm(p);
      if (E === !1 || !E && !r || E && a && a.includes(E))
        return;
      Array.isArray(p.properties.className) || (p.properties.className = []), p.properties.className.includes(c) || p.properties.className.unshift(c);
      const y = hh(p, { whitespace: "pre" });
      let _;
      try {
        _ = E ? l.highlight(E, y, { prefix: i }) : l.highlightAuto(y, { prefix: i, subset: s });
      } catch (x) {
        const k = (
          /** @type {Error} */
          x
        );
        if (E && /Unknown language/.test(k.message)) {
          d.message(
            "Cannot highlight as `" + E + "`, it’s not registered",
            {
              ancestors: [g, p],
              cause: k,
              place: p.position,
              ruleId: "missing-language",
              source: "rehype-highlight"
            }
          );
          return;
        }
        throw k;
      }
      !E && _.data && _.data.language && p.properties.className.push("language-" + _.data.language), _.children.length > 0 && (p.children = /** @type {Array<ElementContent>} */
      _.children);
    });
  };
}
function Qm(e) {
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
function jm({ slide: e }) {
  return /* @__PURE__ */ Ne("div", { className: "slide", children: [
    /* @__PURE__ */ K("h2", { className: "slide__title", children: e.title }),
    /* @__PURE__ */ K("div", { className: "slide__body", children: /* @__PURE__ */ K(
      Zf,
      {
        remarkPlugins: [lh],
        rehypePlugins: [[Xm, { detect: !0, ignoreMissing: !0 }]],
        children: e.body
      }
    ) })
  ] });
}
const At = 1920, Nr = 1080, Ha = 1120, Jm = At - Ha;
function eb() {
  const [e, n] = Et(1);
  return bt(() => {
    const t = () => n(Math.min(window.innerWidth / At, window.innerHeight / Nr));
    return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
  }, []), e;
}
function mb({ course: e, getScene: n, audioBase: t }) {
  const r = eb(), o = e.sections, a = hn(
    () => typeof window < "u" && new URLSearchParams(window.location.search).has("capture"),
    []
  ), [i, s] = Et({ section: 0, beat: 0 }), [c, l] = Et(0), u = o[i.section], d = u ? n(u.scene) : void 0, p = hn(
    () => u ? il(o, i) : null,
    [o, i, u]
  ), f = hn(() => u ? ol(u) : [], [u]), g = hn(() => (u == null ? void 0 : u.highlight) ?? null, [u]), E = !a && u ? `${t}/${u.id}-${i.beat}.wav` : void 0, { toggle: y, stop: _ } = Bl(
    E,
    () => s((x) => {
      const k = Gt(o, x, 1);
      return k.section === x.section && k.beat === x.beat && _(), k;
    })
  );
  return bt(() => {
    if (a) return;
    const x = (k) => {
      o.length && (k.key === "ArrowRight" ? s((A) => Gt(o, A, 1)) : k.key === "ArrowLeft" ? s((A) => Gt(o, A, -1)) : k.key === " " && (k.preventDefault(), y()));
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }), bt(() => {
    if (a)
      return window.__captureReady = !1, window.__capture = {
        plan: () => o.map((x, k) => ({ section: k, id: x.id, scene: x.scene, beats: x.beats.length })),
        seek: (x, k) => {
          window.__captureReady = !1, l(0), s({ section: x, beat: k });
        },
        transition: (x, k, A) => {
          window.__captureReady = !1, l(A), s({ section: x, beat: k });
        }
      }, () => {
        delete window.__capture;
      };
  }, [a, o]), bt(() => {
    if (!a) return;
    window.__captureReady = !1;
    let x = 0;
    const k = requestAnimationFrame(() => {
      x = requestAnimationFrame(() => {
        window.__captureReady = !0;
      });
    });
    return () => {
      cancelAnimationFrame(k), cancelAnimationFrame(x);
    };
  }, [a, i]), u ? /* @__PURE__ */ K("div", { className: "rp-root", children: /* @__PURE__ */ K("div", { style: { width: At * r, height: Nr * r }, children: /* @__PURE__ */ Ne(
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
        /* @__PURE__ */ K("div", { className: "rp-scene-pane", style: { width: Ha }, children: d && /* @__PURE__ */ K(Pl, { scene: d, reveal: p, focus: f, highlight: g, fitMs: a ? c : void 0 }) }),
        /* @__PURE__ */ K("div", { className: "rp-slide-pane", style: { width: Jm }, children: /* @__PURE__ */ K(jm, { slide: u.slide }) })
      ]
    }
  ) }) }) : null;
}
export {
  lb as BLUE,
  dr as EDGE,
  fo as GRAY,
  cb as GREEN,
  ub as ORANGE,
  db as PURPLE,
  pb as RED,
  mb as RevealPlayer,
  Pl as SceneViewer,
  jm as SlidePane,
  fb as TEAL,
  gb as YELLOW,
  ob as container,
  vt as edgeKey,
  Ar as getIcon,
  ab as group,
  el as resolveGrid,
  tl as revealAt,
  il as revealForPosition,
  al as sceneNodeIds,
  rl as sceneRunStart,
  Gt as step,
  yt as tracks,
  Bl as useNarration,
  hb as validateCourse,
  sb as wgrid
};
