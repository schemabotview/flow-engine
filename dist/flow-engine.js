import { Key as Bi, GitBranch as ji, Table as $i, Terminal as Hi, ScrollText as Ui, Box as qi, ShieldCheck as Vi, Users as Wi, KeyRound as Yi, Layers as Xi, Clock as Gi, Workflow as Qi, MemoryStick as Ki, HardDrive as Ji, Server as Zi, AppWindow as el, Share2 as nl, Webhook as tl, Plug as rl, Copy as il, DownloadCloud as ll, Network as ol, Radio as al, Cloud as ul, File as sl, Zap as cl, Image as fl, Braces as hl, Waves as pl, Cpu as ml, Cog as dl, Filter as gl, Brain as yl, FileBarChart as kl, BarChart3 as xl, Database as bl } from "lucide-react";
import { jsx as U, jsxs as be, Fragment as Zn } from "react/jsx-runtime";
import { useMemo as Re, useEffect as Nn, useRef as xn, useState as et, useLayoutEffect as kr } from "react";
import { MarkerType as wl, Handle as Et, Position as we, useInternalNode as It, useStore as Sl, getSmoothStepPath as Cl, getBezierPath as El, BaseEdge as Il, EdgeLabelRenderer as Al, ReactFlow as Tl, useReactFlow as vl } from "@xyflow/react";
const jh = (e, n) => ({ ...e, kind: "container", cell: [0, 0], layout: n.grid, children: n.nodes }), $h = (e, n) => ({
  id: e,
  label: "",
  kind: "group",
  cell: [0, 0],
  layout: n.grid,
  children: n.nodes
}), Hh = (e, n) => ({
  grid: e,
  nodes: n.map(({ node: t, at: r }) => ({ ...t, cell: r }))
}), Uh = "#5b8cff", qh = "#37d39a", Vh = "#ff7a59", Wh = "#b98bff", Yh = "#3fd0d6", Xh = "#ff5d6c", xr = "#9aa3b2", Gh = "#d9b84a", Bn = "#5b6270", Pl = {
  database: bl,
  barChart: xl,
  report: kl,
  brain: yl,
  funnel: gl,
  gears: dl,
  engine: ml,
  lake: pl,
  json: hl,
  image: fl,
  streaming: cl,
  file: sl,
  cloud: ul,
  stream: al,
  federation: ol,
  autoload: ll,
  copy: il,
  plug: rl,
  api: tl,
  share: nl,
  app: el,
  server: Zi,
  disk: Ji,
  memory: Ki,
  workflow: Qi,
  clock: Gi,
  layers: Xi,
  key: Yi,
  users: Wi,
  shield: Vi,
  box: qi,
  scroll: Ui,
  terminal: Hi,
  table: $i,
  branch: ji,
  surrogateKey: Bi
}, zl = (e) => e ? Pl[e] : void 0, Ll = 6;
function Dl(e, n, t) {
  const r = {};
  return br(e, n, { x: 0, y: 0, w: t.width, h: t.height }, r), r;
}
const an = (e) => Array.isArray(e) ? e : Array.from({ length: e }, () => 1), jn = (e) => e.reduce((n, t) => n + t, 0), Fl = (e) => e.reduce((n, t) => [...n, n[n.length - 1] + t], [0]);
function At(e, n, t, r) {
  const i = jn(e) + 2 * r + (e.length - 1) * t, o = n / i, l = e.map((a) => a * o);
  return { unit: o, sizes: l, before: Fl(l) };
}
function br(e, n, t, r) {
  var p;
  const { gap: i = 0.2, padding: o = 0.4 } = n, l = At(an(n.cols), t.w, i, o), a = At(an(n.rows), t.h, i, o), s = l.unit * i, u = a.unit * i, f = l.unit * o, c = a.unit * o;
  for (const h of e) {
    const [g, x, S = 1, y = 1] = h.cell, E = {
      x: t.x + f + l.before[g] + g * s,
      y: t.y + c + a.before[x] + x * u,
      w: jn(l.sizes.slice(g, g + S)) + (S - 1) * s,
      h: jn(a.sizes.slice(x, x + y)) + (y - 1) * u
    };
    if (r[h.id] = E, (p = h.children) != null && p.length && h.layout) {
      const C = h.kind === "container" ? Ll : 0, D = { x: E.x + C, y: E.y + C, w: E.w - 2 * C, h: E.h - 2 * C };
      br(h.children, h.layout, D, r);
    }
  }
}
const pn = (e, n) => `${e}->${n}`;
function _l(e, n) {
  const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let o = null;
  const l = Math.min(n, e.length - 1);
  for (let s = 0; s <= l; s++)
    for (const u of e[s].delta)
      switch (u.kind) {
        case "solidify":
          for (const f of u.ids) t.add(f);
          break;
        case "draw":
          for (const [f, c] of u.edges) r.add(pn(f, c));
          break;
        case "annotate":
          i.set(u.id, u.value);
          break;
        case "pan":
          o = u.to;
          break;
      }
  const a = /* @__PURE__ */ new Set();
  if (l >= 0) {
    for (const s of e[l].delta)
      if (s.kind === "pulse") for (const u of s.ids) a.add(u);
  }
  return { nodes: t, edges: r, annotations: i, pulse: a, camera: o };
}
function Rl(e, n) {
  let t = n;
  for (; t > 0 && e[t - 1].scene === e[n].scene; ) t--;
  return t;
}
function Ml(e, n) {
  const t = Rl(e, n.section), r = [];
  for (let i = t; i < n.section; i++) r.push(...e[i].beats);
  return r.push(...e[n.section].beats.slice(0, n.beat + 1)), _l(r, r.length - 1);
}
function Ol(e) {
  if (e.focus != null)
    return Array.isArray(e.focus) ? e.focus : [e.focus];
  const n = /* @__PURE__ */ new Set();
  for (const t of e.beats)
    for (const r of t.delta)
      if (r.kind === "solidify") for (const i of r.ids) n.add(i);
  if (n.size === 0) {
    for (const t of e.beats)
      for (const r of t.delta)
        if (r.kind === "draw") for (const [i, o] of r.edges)
          n.add(i), n.add(o);
  }
  return [...n];
}
function bn(e, n, t) {
  const r = n.beat + t;
  return r >= 0 && r < e[n.section].beats.length ? { section: n.section, beat: r } : t > 0 && n.section < e.length - 1 ? { section: n.section + 1, beat: 0 } : t < 0 && n.section > 0 ? { section: n.section - 1, beat: e[n.section - 1].beats.length - 1 } : n;
}
function Nl(e) {
  const n = /* @__PURE__ */ new Set(), t = (r) => {
    var i;
    for (const o of r)
      n.add(o.id), (i = o.children) != null && i.length && t(o.children);
  };
  return t(e.nodes), n;
}
function Bl(e) {
  return new Set(e.edges.map((n) => pn(n.from, n.to)));
}
function jl(e) {
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
function Qh(e, n) {
  const t = [];
  return e.forEach((r, i) => {
    const o = `§${i + 1} "${r.id}"`, l = n(r.scene);
    if (!l) {
      t.push(`${o}: references unknown scene "${r.scene}"`);
      return;
    }
    const a = Nl(l), s = Bl(l);
    r.beats.forEach((u, f) => {
      for (const c of u.delta) {
        for (const p of jl(c))
          a.has(p) || t.push(`${o} beat ${f}: ${c.kind} id "${p}" is not a node in scene "${r.scene}"`);
        if (c.kind === "draw")
          for (const [p, h] of c.edges)
            s.has(pn(p, h)) || t.push(`${o} beat ${f}: draw ${p}->${h} has no matching edge in scene "${r.scene}"`);
      }
    });
  }), t;
}
const $l = (e) => an(e.grid.cols).length > an(e.grid.rows).length ? "horizontal" : "vertical";
function wr(e) {
  var t;
  const n = [];
  for (const r of e)
    n.push(r), (t = r.children) != null && t.length && n.push(...wr(r.children));
  return n;
}
function Hl(e, n, t, r, i) {
  const o = !!i && i.size > 0;
  return wr(e.nodes).map((l) => {
    const a = n[l.id], s = r ? r.has(l.id) : !0, u = o ? i.has(l.id) : !0, f = l.kind ?? "symbol", c = f === "symbol" || f === "term";
    return {
      id: l.id,
      type: "scene",
      position: { x: a.x, y: a.y },
      draggable: !1,
      selectable: !1,
      zIndex: c ? 10 : void 0,
      data: {
        label: l.label,
        sub: l.sub,
        type: l.type,
        icon: l.icon,
        iconInline: l.iconInline,
        mono: l.mono,
        color: l.color ?? xr,
        kind: l.kind ?? "symbol",
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
function Ul(e, n, t, r) {
  const i = !!r && r.size > 0;
  return e.edges.map((o, l) => {
    const a = !n || n.has(o.from) && n.has(o.to) || ((t == null ? void 0 : t.has(pn(o.from, o.to))) ?? !1), s = a && i && !r.has(o.from) && !r.has(o.to);
    return {
      id: `${o.from}-${o.to}-${l}`,
      source: o.from,
      target: o.to,
      type: "flow",
      data: { color: Bn, animated: o.animated, label: o.label, ghosted: !a, dimmed: s },
      markerEnd: { type: wl.ArrowClosed, color: Bn }
    };
  });
}
function ql(e, n, t, r, i = 0) {
  if (r === "term") {
    const f = Math.max(1, e.replace(/\s+/g, " ").trim().length), c = Math.max(n - 4, 6) / (f * 0.72), p = Math.max(t - i - 4, 6) / 1.2;
    return Math.max(4, Math.min(c, p, 18));
  }
  const o = e.split(/\s+/).filter(Boolean), l = Math.max(1, ...o.map((f) => f.length)), a = Math.max(n - 20, 8) / (l * 0.72), s = o.length > 1 ? 2 : 1, u = Math.max(t - i - 8, 8) / (s * 1.25);
  return Math.max(7, Math.min(a, u, 18));
}
function Vl(e, n) {
  const r = Math.max(n - 8, 6) / (Math.max(e.length, 1) * 0.86);
  return Math.max(4, Math.min(r, 16));
}
function Wl(e, n = 2) {
  const t = e.replace(/[^a-zA-Z0-9]/g, "");
  return t ? t.charAt(0).toUpperCase() + t.slice(1, n).toLowerCase() : "";
}
function Sr({ data: e }) {
  const n = e;
  if (n.kind === "group")
    return /* @__PURE__ */ U("div", { className: "scene-node scene-node--group", style: { width: n.width, height: n.height } });
  const t = n.ghosted ? " scene-node--ghost" : n.highlighted ? " scene-node--lit" : n.dimmed ? " scene-node--dimmed" : "", r = n.direction === "horizontal", i = n.kind === "container", o = n.kind === "symbol" && !!n.mono, l = n.kind === "symbol" || i ? zl(n.icon) : void 0, a = Math.max(18, Math.min(Math.min(n.width, n.height) * 0.4, 48)), s = !!((l || o) && n.iconInline), u = n.kind === "term" && !!n.type, f = s ? Math.max(24, n.width - a - 12) : u ? Math.max(24, n.width * 0.6) : n.width, c = s ? 0 : o ? a + 4 : l ? a + 5 : 0, p = n.sub ? 16 : 0, h = i ? Vl(n.label, n.width) : ql(n.label, f, n.height, n.kind, c + p);
  return /* @__PURE__ */ be(
    "div",
    {
      className: `scene-node scene-node--${n.kind}${o ? " scene-node--mono" : ""}${s ? " scene-node--iconh" : ""}${t}`,
      style: { width: n.width, height: n.height, "--node-color": n.color },
      children: [
        /* @__PURE__ */ U(Et, { type: "target", position: r ? we.Left : we.Top, className: "scene-handle", isConnectable: !1 }),
        i ? /* @__PURE__ */ be("span", { className: "scene-node__title", style: { fontSize: h }, children: [
          l && /* @__PURE__ */ U(l, { className: "scene-node__title-icon", size: Math.round(h * 1.25), strokeWidth: 1.75 }),
          n.label
        ] }) : /* @__PURE__ */ be(Zn, { children: [
          o ? /* @__PURE__ */ U("span", { className: "scene-node__mono", style: { width: a, height: a, fontSize: a * 0.42 }, children: l ? /* @__PURE__ */ U(l, { size: a * 0.6, strokeWidth: 2 }) : Wl(n.label) }) : l && /* @__PURE__ */ U(l, { className: "scene-node__icon", size: a, strokeWidth: 1.75 }),
          u ? /* @__PURE__ */ be("span", { className: "scene-node__row", children: [
            /* @__PURE__ */ U("span", { className: "scene-node__label", style: { fontSize: h }, children: n.label }),
            /* @__PURE__ */ U("span", { className: "scene-node__type", style: { fontSize: h * 0.82 }, children: n.type })
          ] }) : /* @__PURE__ */ U("span", { className: "scene-node__label", style: { fontSize: h }, children: n.label }),
          n.sub && /* @__PURE__ */ U("span", { className: "scene-node__sub", children: n.sub })
        ] }),
        /* @__PURE__ */ U(Et, { type: "source", position: r ? we.Right : we.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
Sr.defaultColor = xr;
const Yl = 13, Xl = 8, Gl = 13, Ql = (e) => Math.max(Xl, Math.min(Gl, Yl * e));
function Tt(e, n) {
  const t = (e.measured.width ?? 0) / 2, r = (e.measured.height ?? 0) / 2, i = e.internals.positionAbsolute.x + t, o = e.internals.positionAbsolute.y + r, l = n.internals.positionAbsolute.x + (n.measured.width ?? 0) / 2, a = n.internals.positionAbsolute.y + (n.measured.height ?? 0) / 2, s = (l - i) / (2 * t) - (a - o) / (2 * r), u = (l - i) / (2 * t) + (a - o) / (2 * r), f = 1 / (Math.abs(s) + Math.abs(u) || 1);
  return { x: t * (f * s + f * u) + i, y: r * (-f * s + f * u) + o };
}
function vt(e, n) {
  const t = e.internals.positionAbsolute.x, r = e.internals.positionAbsolute.y, i = e.measured.width ?? 0;
  return n.x <= t + 1 ? we.Left : n.x >= t + i - 1 ? we.Right : n.y <= r + 1 ? we.Top : we.Bottom;
}
function Kl({ id: e, source: n, target: t, data: r, markerEnd: i }) {
  const o = It(n), l = It(t), a = Sl((_) => _.transform[2]);
  if (!(o != null && o.measured.width) || !(l != null && l.measured.width)) return null;
  const s = Tt(o, l), u = Tt(l, o), f = vt(o, s), c = vt(l, u), p = { sourceX: s.x, sourceY: s.y, targetX: u.x, targetY: u.y, sourcePosition: f, targetPosition: c }, [h, g, x] = f === c ? Cl({ ...p, borderRadius: 14, offset: 24 }) : El(p), S = (r == null ? void 0 : r.color) ?? Bn, y = r == null ? void 0 : r.label, E = (r == null ? void 0 : r.ghosted) === !0, C = (r == null ? void 0 : r.dimmed) === !0, D = (r == null ? void 0 : r.animated) !== !1 && !E && !C;
  return /* @__PURE__ */ be(Zn, { children: [
    /* @__PURE__ */ U(
      Il,
      {
        id: e,
        path: h,
        markerEnd: E ? void 0 : i,
        style: {
          stroke: S,
          strokeWidth: 1.75,
          opacity: E ? 0.14 : C ? 0.25 : 0.6,
          strokeDasharray: E ? "5 5" : void 0
        }
      }
    ),
    D && /* @__PURE__ */ U("circle", { r: 3, fill: S, opacity: 0.85, children: /* @__PURE__ */ U("animateMotion", { dur: "2.4s", repeatCount: "indefinite", path: h }) }),
    y && !E && !C && /* @__PURE__ */ U(Al, { children: /* @__PURE__ */ U(
      "div",
      {
        className: "scene-edge-label",
        style: { transform: `translate(-50%, -50%) translate(${g}px, ${x}px)`, fontSize: `${Ql(a)}px` },
        children: y
      }
    ) })
  ] });
}
const Jl = { scene: Sr }, Zl = { flow: Kl }, eo = 0.08, no = 0.22, to = 550;
function ro(e) {
  if (!e.length) return null;
  const n = Math.min(...e.map((o) => o.x)), t = Math.min(...e.map((o) => o.y)), r = Math.max(...e.map((o) => o.x + o.w)), i = Math.max(...e.map((o) => o.y + o.h));
  return { x: n, y: t, width: r - n, height: i - t };
}
function io({ boxes: e, focusIds: n }) {
  const t = vl(), r = n.join(",");
  return Nn(() => {
    const i = n.map((s) => e[s]).filter(Boolean), o = ro(i.length ? i : Object.values(e));
    if (!o) return;
    const l = i.length ? no : eo, a = requestAnimationFrame(() => t.fitBounds(o, { padding: l, duration: to }));
    return () => cancelAnimationFrame(a);
  }, [r, e, t]), null;
}
function lo({
  scene: e,
  reveal: n = null,
  focus: t = []
}) {
  const r = $l(e), i = Re(() => Dl(e.nodes, e.grid, e.canvas), [e]), o = Re(() => t.length ? new Set(t) : null, [t]), l = Re(
    () => Hl(e, i, r, (n == null ? void 0 : n.nodes) ?? null, o),
    [e, i, r, n, o]
  ), a = Re(
    () => Ul(e, (n == null ? void 0 : n.nodes) ?? null, (n == null ? void 0 : n.edges) ?? null, o),
    [e, n, o]
  );
  return /* @__PURE__ */ U("div", { className: "scene-flow", children: /* @__PURE__ */ U(
    Tl,
    {
      nodes: l,
      edges: a,
      nodeTypes: Jl,
      edgeTypes: Zl,
      proOptions: { hideAttribution: !0 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !1,
      panOnDrag: !0,
      zoomOnScroll: !0,
      zoomOnDoubleClick: !1,
      minZoom: 0.2,
      maxZoom: 8,
      children: /* @__PURE__ */ U(io, { boxes: i, focusIds: t })
    }
  ) });
}
function oo(e, n) {
  const t = xn(null), r = xn(n);
  r.current = n;
  const [i, o] = et(!1), l = xn(i);
  return l.current = i, Nn(() => {
    const u = new Audio();
    return u.addEventListener("ended", () => r.current()), t.current = u, () => u.pause();
  }, []), Nn(() => {
    const u = t.current;
    u && (u.pause(), e ? (u.src = e, u.currentTime = 0, l.current && u.play().catch(() => {
    })) : (u.removeAttribute("src"), u.load()));
  }, [e]), { playing: i, toggle: () => {
    const u = t.current;
    !u || !u.getAttribute("src") || (l.current ? (u.pause(), o(!1)) : (u.play().catch(() => {
    }), o(!0)));
  }, stop: () => {
    var u;
    (u = t.current) == null || u.pause(), o(!1);
  } };
}
function ao(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const uo = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, so = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, co = {};
function Pt(e, n) {
  return (co.jsx ? so : uo).test(e);
}
const fo = /[ \t\n\f\r]/g;
function ho(e) {
  return typeof e == "object" ? e.type === "text" ? zt(e.value) : !1 : zt(e);
}
function zt(e) {
  return e.replace(fo, "") === "";
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
function Cr(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new Ke(t, r, n);
}
function $n(e) {
  return e.toLowerCase();
}
class ne {
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
ne.prototype.attribute = "";
ne.prototype.booleanish = !1;
ne.prototype.boolean = !1;
ne.prototype.commaOrSpaceSeparated = !1;
ne.prototype.commaSeparated = !1;
ne.prototype.defined = !1;
ne.prototype.mustUseProperty = !1;
ne.prototype.number = !1;
ne.prototype.overloadedBoolean = !1;
ne.prototype.property = "";
ne.prototype.spaceSeparated = !1;
ne.prototype.space = void 0;
let po = 0;
const F = Pe(), X = Pe(), Hn = Pe(), I = Pe(), W = Pe(), Te = Pe(), re = Pe();
function Pe() {
  return 2 ** ++po;
}
const Un = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: F,
  booleanish: X,
  commaOrSpaceSeparated: re,
  commaSeparated: Te,
  number: I,
  overloadedBoolean: Hn,
  spaceSeparated: W
}, Symbol.toStringTag, { value: "Module" })), wn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Un)
);
class nt extends ne {
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
  constructor(n, t, r, i) {
    let o = -1;
    if (super(n, t), Lt(this, "space", i), typeof r == "number")
      for (; ++o < wn.length; ) {
        const l = wn[o];
        Lt(this, wn[o], (r & Un[l]) === Un[l]);
      }
  }
}
nt.prototype.defined = !0;
function Lt(e, n, t) {
  t && (e[n] = t);
}
function Oe(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new nt(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), n[r] = o, t[$n(r)] = r, t[$n(o.attribute)] = r;
  }
  return new Ke(n, t, e.space);
}
const Er = Oe({
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
function Ir(e, n) {
  return n in e ? e[n] : n;
}
function Ar(e, n) {
  return Ir(e, n.toLowerCase());
}
const mo = Oe({
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
    accept: Te,
    acceptCharset: W,
    accessKey: W,
    action: null,
    allow: null,
    allowFullScreen: F,
    allowPaymentRequest: F,
    allowUserMedia: F,
    alpha: F,
    alt: null,
    as: null,
    async: F,
    autoCapitalize: null,
    autoComplete: W,
    autoFocus: F,
    autoPlay: F,
    blocking: W,
    capture: null,
    charSet: null,
    checked: F,
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
    controls: F,
    controlsList: W,
    coords: I | Te,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: F,
    defer: F,
    dir: null,
    dirName: null,
    disabled: F,
    download: Hn,
    draggable: X,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: F,
    formTarget: null,
    headers: W,
    height: I,
    hidden: Hn,
    high: I,
    href: null,
    hrefLang: null,
    htmlFor: W,
    httpEquiv: W,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: F,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: F,
    itemId: null,
    itemProp: W,
    itemRef: W,
    itemScope: F,
    itemType: W,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: F,
    low: I,
    manifest: null,
    max: null,
    maxLength: I,
    media: null,
    method: null,
    min: null,
    minLength: I,
    multiple: F,
    muted: F,
    name: null,
    nonce: null,
    noModule: F,
    noValidate: F,
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
    open: F,
    optimum: I,
    pattern: null,
    ping: W,
    placeholder: null,
    playsInline: F,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: F,
    referrerPolicy: null,
    rel: W,
    required: F,
    reversed: F,
    rows: I,
    rowSpan: I,
    sandbox: W,
    scope: null,
    scoped: F,
    seamless: F,
    selected: F,
    shadowRootClonable: F,
    shadowRootCustomElementRegistry: F,
    shadowRootDelegatesFocus: F,
    shadowRootMode: null,
    shadowRootSerializable: F,
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
    typeMustMatch: F,
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
    compact: F,
    // Lists. Use CSS to reduce space between items instead
    declare: F,
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
    noResize: F,
    // `<frame>`
    noHref: F,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: F,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: F,
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
    credentialless: F,
    disablePictureInPicture: F,
    disableRemotePlayback: F,
    exportParts: Te,
    part: W,
    prefix: null,
    property: null,
    results: I,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ar
}), go = Oe({
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
    about: re,
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
    download: F,
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
    g1: Te,
    g2: Te,
    glyphName: Te,
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
    kernelMatrix: re,
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
    property: re,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: re,
    rev: re,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: re,
    requiredFeatures: re,
    requiredFonts: re,
    requiredFormats: re,
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
    strokeDashArray: re,
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
    systemLanguage: re,
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
    typeOf: re,
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
  transform: Ir
}), Tr = Oe({
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
}), vr = Oe({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ar
}), Pr = Oe({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), yo = {
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
}, ko = /[A-Z]/g, Dt = /-[a-z]/g, xo = /^data[-\w.:]+$/i;
function bo(e, n) {
  const t = $n(n);
  let r = n, i = ne;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && xo.test(n)) {
    if (n.charAt(4) === "-") {
      const o = n.slice(5).replace(Dt, So);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = n.slice(4);
      if (!Dt.test(o)) {
        let l = o.replace(ko, wo);
        l.charAt(0) !== "-" && (l = "-" + l), n = "data" + l;
      }
    }
    i = nt;
  }
  return new i(r, n);
}
function wo(e) {
  return "-" + e.toLowerCase();
}
function So(e) {
  return e.charAt(1).toUpperCase();
}
const Co = Cr([Er, mo, Tr, vr, Pr], "html"), tt = Cr([Er, go, Tr, vr, Pr], "svg");
function Eo(e) {
  return e.join(" ").trim();
}
function zr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fe = {}, Sn, Ft;
function Io() {
  if (Ft) return Sn;
  Ft = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, n = /\n/g, t = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, i = /^:\s*/, o = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, l = /^[;\s]*/, a = /^\s+|\s+$/g, s = `
`, u = "/", f = "*", c = "", p = "comment", h = "declaration";
  function g(S, y) {
    if (typeof S != "string")
      throw new TypeError("First argument must be a string");
    if (!S) return [];
    y = y || {};
    var E = 1, C = 1;
    function D(L) {
      var T = L.match(n);
      T && (E += T.length);
      var q = L.lastIndexOf(s);
      C = ~q ? L.length - q : C + L.length;
    }
    function _() {
      var L = { line: E, column: C };
      return function(T) {
        return T.position = new w(L), j(), T;
      };
    }
    function w(L) {
      this.start = L, this.end = { line: E, column: C }, this.source = y.source;
    }
    w.prototype.content = S;
    function O(L) {
      var T = new Error(
        y.source + ":" + E + ":" + C + ": " + L
      );
      if (T.reason = L, T.filename = y.source, T.line = E, T.column = C, T.source = S, !y.silent) throw T;
    }
    function $(L) {
      var T = L.exec(S);
      if (T) {
        var q = T[0];
        return D(q), S = S.slice(q.length), T;
      }
    }
    function j() {
      $(t);
    }
    function k(L) {
      var T;
      for (L = L || []; T = v(); )
        T !== !1 && L.push(T);
      return L;
    }
    function v() {
      var L = _();
      if (!(u != S.charAt(0) || f != S.charAt(1))) {
        for (var T = 2; c != S.charAt(T) && (f != S.charAt(T) || u != S.charAt(T + 1)); )
          ++T;
        if (T += 2, c === S.charAt(T - 1))
          return O("End of comment missing");
        var q = S.slice(2, T - 2);
        return C += 2, D(q), S = S.slice(T), C += 2, L({
          type: p,
          comment: q
        });
      }
    }
    function P() {
      var L = _(), T = $(r);
      if (T) {
        if (v(), !$(i)) return O("property missing ':'");
        var q = $(o), G = L({
          type: h,
          property: x(T[0].replace(e, c)),
          value: q ? x(q[0].replace(e, c)) : c
        });
        return $(l), G;
      }
    }
    function H() {
      var L = [];
      k(L);
      for (var T; T = P(); )
        T !== !1 && (L.push(T), k(L));
      return L;
    }
    return j(), H();
  }
  function x(S) {
    return S ? S.replace(a, c) : c;
  }
  return Sn = g, Sn;
}
var _t;
function Ao() {
  if (_t) return Fe;
  _t = 1;
  var e = Fe && Fe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.default = t;
  const n = e(Io());
  function t(r, i) {
    let o = null;
    if (!r || typeof r != "string")
      return o;
    const l = (0, n.default)(r), a = typeof i == "function";
    return l.forEach((s) => {
      if (s.type !== "declaration")
        return;
      const { property: u, value: f } = s;
      a ? i(u, f, s) : f && (o = o || {}, o[u] = f);
    }), o;
  }
  return Fe;
}
var He = {}, Rt;
function To() {
  if (Rt) return He;
  Rt = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, t = /^[^-]+$/, r = /^-(webkit|moz|ms|o|khtml)-/, i = /^-(ms)-/, o = function(u) {
    return !u || t.test(u) || e.test(u);
  }, l = function(u, f) {
    return f.toUpperCase();
  }, a = function(u, f) {
    return "".concat(f, "-");
  }, s = function(u, f) {
    return f === void 0 && (f = {}), o(u) ? u : (u = u.toLowerCase(), f.reactCompat ? u = u.replace(i, a) : u = u.replace(r, a), u.replace(n, l));
  };
  return He.camelCase = s, He;
}
var Ue, Mt;
function vo() {
  if (Mt) return Ue;
  Mt = 1;
  var e = Ue && Ue.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  }, n = e(Ao()), t = To();
  function r(i, o) {
    var l = {};
    return !i || typeof i != "string" || (0, n.default)(i, function(a, s) {
      a && s && (l[(0, t.camelCase)(a, o)] = s);
    }), l;
  }
  return r.default = r, Ue = r, Ue;
}
var Po = vo();
const zo = /* @__PURE__ */ zr(Po), Lr = Dr("end"), rt = Dr("start");
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
function Lo(e) {
  const n = rt(e), t = Lr(e);
  if (n && t)
    return { start: n, end: t };
}
function We(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ot(e.position) : "start" in e || "end" in e ? Ot(e) : "line" in e || "column" in e ? qn(e) : "";
}
function qn(e) {
  return Nt(e && e.line) + ":" + Nt(e && e.column);
}
function Ot(e) {
  return qn(e && e.start) + "-" + qn(e && e.end);
}
function Nt(e) {
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
    let i = "", o = {}, l = !1;
    if (t && ("line" in t && "column" in t ? o = { place: t } : "start" in t && "end" in t ? o = { place: t } : "type" in t ? o = {
      ancestors: [t],
      place: t.position
    } : o = { ...t }), typeof n == "string" ? i = n : !o.cause && n && (l = !0, i = n.message, o.cause = n), !o.ruleId && !o.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? o.ruleId = r : (o.source = r.slice(0, s), o.ruleId = r.slice(s + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const s = o.ancestors[o.ancestors.length - 1];
      s && (o.place = s.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = We(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = l && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const it = {}.hasOwnProperty, Do = /* @__PURE__ */ new Map(), Fo = /[A-Z]/g, _o = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Ro = /* @__PURE__ */ new Set(["td", "th"]), Fr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Mo(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = qo(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Uo(t, n.jsx, n.jsxs);
  }
  const i = {
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
    schema: n.space === "svg" ? tt : Co,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, o = _r(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function _r(e, n, t) {
  if (n.type === "element")
    return Oo(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return No(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return jo(e, n, t);
  if (n.type === "mdxjsEsm")
    return Bo(e, n);
  if (n.type === "root")
    return $o(e, n, t);
  if (n.type === "text")
    return Ho(e, n);
}
function Oo(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = tt, e.schema = i), e.ancestors.push(n);
  const o = Mr(e, n.tagName, !1), l = Vo(e, n);
  let a = ot(e, n);
  return _o.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !ho(s) : !0;
  })), Rr(e, l, o, n), lt(l, a), e.ancestors.pop(), e.schema = r, e.create(n, o, l, t);
}
function No(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Ge(e, n.position);
}
function Bo(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Ge(e, n.position);
}
function jo(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = tt, e.schema = i), e.ancestors.push(n);
  const o = n.name === null ? e.Fragment : Mr(e, n.name, !0), l = Wo(e, n), a = ot(e, n);
  return Rr(e, l, o, n), lt(l, a), e.ancestors.pop(), e.schema = r, e.create(n, o, l, t);
}
function $o(e, n, t) {
  const r = {};
  return lt(r, ot(e, n)), e.create(n, e.Fragment, r, t);
}
function Ho(e, n) {
  return n.value;
}
function Rr(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function lt(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function Uo(e, n, t) {
  return r;
  function r(i, o, l, a) {
    const u = Array.isArray(l.children) ? t : n;
    return a ? u(o, l, a) : u(o, l);
  }
}
function qo(e, n) {
  return t;
  function t(r, i, o, l) {
    const a = Array.isArray(o.children), s = rt(r);
    return n(
      i,
      o,
      l,
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
function Vo(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && it.call(n.properties, i)) {
      const o = Yo(e, i, n.properties[i]);
      if (o) {
        const [l, a] = o;
        e.tableCellAlignToStyle && l === "align" && typeof a == "string" && Ro.has(n.tagName) ? r = a : t[l] = a;
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
function Wo(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const l = o.expression;
        l.type;
        const a = l.properties[0];
        a.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Ge(e, n.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          Ge(e, n.position);
      else
        o = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return t;
}
function ot(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Do;
  for (; ++r < n.children.length; ) {
    const o = n.children[r];
    let l;
    if (e.passKeys) {
      const s = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (s) {
        const u = i.get(s) || 0;
        l = s + "-" + u, i.set(s, u + 1);
      }
    }
    const a = _r(e, o, l);
    a !== void 0 && t.push(a);
  }
  return t;
}
function Yo(e, n, t) {
  const r = bo(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? ao(t) : Eo(t)), r.property === "style") {
      let i = typeof t == "object" ? t : Xo(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = Go(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? yo[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function Xo(e, n) {
  try {
    return zo(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), i = new J("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Fr + "#cannot-parse-style-attribute", i;
  }
}
function Mr(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let o = -1, l;
    for (; ++o < i.length; ) {
      const a = Pt(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      l = l ? {
        type: "MemberExpression",
        object: l,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = l;
  } else
    r = Pt(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return it.call(e.components, i) ? e.components[i] : i;
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
function Go(e) {
  const n = {};
  let t;
  for (t in e)
    it.call(e, t) && (n[Qo(t)] = e[t]);
  return n;
}
function Qo(e) {
  let n = e.replace(Fo, Ko);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function Ko(e) {
  return "-" + e.toLowerCase();
}
const Cn = {
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
}, Jo = {};
function at(e, n) {
  const t = Jo, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Or(e, r, i);
}
function Or(e, n, t) {
  if (Zo(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Bt(e.children, n, t);
  }
  return Array.isArray(e) ? Bt(e, n, t) : "";
}
function Bt(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Or(e[i], n, t);
  return r.join("");
}
function Zo(e) {
  return !!(e && typeof e == "object");
}
const jt = document.createElement("i");
function ut(e) {
  const n = "&" + e + ";";
  jt.innerHTML = n;
  const t = jt.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function ie(e, n, t, r) {
  const i = e.length;
  let o = 0, l;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(n, t), e.splice(...l);
  else
    for (t && e.splice(n, t); o < r.length; )
      l = r.slice(o, o + 1e4), l.unshift(n, 0), e.splice(...l), o += 1e4, n += 1e4;
}
function le(e, n) {
  return e.length > 0 ? (ie(e, e.length, 0, n), e) : n;
}
const $t = {}.hasOwnProperty;
function Nr(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    ea(n, e[t]);
  return n;
}
function ea(e, n) {
  let t;
  for (t in n) {
    const i = ($t.call(e, t) ? e[t] : void 0) || (e[t] = {}), o = n[t];
    let l;
    if (o)
      for (l in o) {
        $t.call(i, l) || (i[l] = []);
        const a = o[l];
        na(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function na(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  ie(e, 0, 0, r);
}
function Br(e, n) {
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
function ce(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Z = Se(/[A-Za-z]/), K = Se(/[\dA-Za-z]/), ta = Se(/[#-'*+\--9=?A-Z^-~]/);
function un(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Vn = Se(/\d/), ra = Se(/[\dA-Fa-f]/), ia = Se(/[!-/:-@[-`{-~]/);
function z(e) {
  return e !== null && e < -2;
}
function Y(e) {
  return e !== null && (e < 0 || e === 32);
}
function M(e) {
  return e === -2 || e === -1 || e === 32;
}
const mn = Se(new RegExp("\\p{P}|\\p{S}", "u")), ve = Se(/\s/);
function Se(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function Ne(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const o = e.charCodeAt(t);
    let l = "";
    if (o === 37 && K(e.charCodeAt(t + 1)) && K(e.charCodeAt(t + 2)))
      i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (l = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(t + 1);
      o < 56320 && a > 56319 && a < 57344 ? (l = String.fromCharCode(o, a), i = 1) : l = "�";
    } else
      l = String.fromCharCode(o);
    l && (n.push(e.slice(r, t), encodeURIComponent(l)), r = t + i + 1, l = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
function B(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return l;
  function l(s) {
    return M(s) ? (e.enter(t), a(s)) : n(s);
  }
  function a(s) {
    return M(s) && o++ < i ? (e.consume(s), a) : (e.exit(t), n(s));
  }
}
const la = {
  tokenize: oa
};
function oa(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), B(e, n, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, l(a);
  }
  function l(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return z(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), l);
  }
}
const aa = {
  tokenize: ua
}, Ht = {
  tokenize: sa
};
function ua(e) {
  const n = this, t = [];
  let r = 0, i, o, l;
  return a;
  function a(C) {
    if (r < t.length) {
      const D = t[r];
      return n.containerState = D[1], e.attempt(D[0].continuation, s, u)(C);
    }
    return u(C);
  }
  function s(C) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && E();
      const D = n.events.length;
      let _ = D, w;
      for (; _--; )
        if (n.events[_][0] === "exit" && n.events[_][1].type === "chunkFlow") {
          w = n.events[_][1].end;
          break;
        }
      y(r);
      let O = D;
      for (; O < n.events.length; )
        n.events[O][1].end = {
          ...w
        }, O++;
      return ie(n.events, _ + 1, 0, n.events.slice(D)), n.events.length = O, u(C);
    }
    return a(C);
  }
  function u(C) {
    if (r === t.length) {
      if (!i)
        return p(C);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return g(C);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(Ht, f, c)(C);
  }
  function f(C) {
    return i && E(), y(r), p(C);
  }
  function c(C) {
    return n.parser.lazy[n.now().line] = r !== t.length, l = n.now().offset, g(C);
  }
  function p(C) {
    return n.containerState = {}, e.attempt(Ht, h, g)(C);
  }
  function h(C) {
    return r++, t.push([n.currentConstruct, n.containerState]), p(C);
  }
  function g(C) {
    if (C === null) {
      i && E(), y(0), e.consume(C);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: o
    }), x(C);
  }
  function x(C) {
    if (C === null) {
      S(e.exit("chunkFlow"), !0), y(0), e.consume(C);
      return;
    }
    return z(C) ? (e.consume(C), S(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(C), x);
  }
  function S(C, D) {
    const _ = n.sliceStream(C);
    if (D && _.push(null), C.previous = o, o && (o.next = C), o = C, i.defineSkip(C.start), i.write(_), n.parser.lazy[C.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < l && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > l)
        )
          return;
      const O = n.events.length;
      let $ = O, j, k;
      for (; $--; )
        if (n.events[$][0] === "exit" && n.events[$][1].type === "chunkFlow") {
          if (j) {
            k = n.events[$][1].end;
            break;
          }
          j = !0;
        }
      for (y(r), w = O; w < n.events.length; )
        n.events[w][1].end = {
          ...k
        }, w++;
      ie(n.events, $ + 1, 0, n.events.slice(O)), n.events.length = w;
    }
  }
  function y(C) {
    let D = t.length;
    for (; D-- > C; ) {
      const _ = t[D];
      n.containerState = _[1], _[0].exit.call(n, e);
    }
    t.length = C;
  }
  function E() {
    i.write([null]), o = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function sa(e, n, t) {
  return B(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Me(e) {
  if (e === null || Y(e) || ve(e))
    return 1;
  if (mn(e))
    return 2;
}
function dn(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (n = o(n, t), r.push(o));
  }
  return n;
}
const Wn = {
  name: "attention",
  resolveAll: ca,
  tokenize: fa
};
function ca(e, n) {
  let t = -1, r, i, o, l, a, s, u, f;
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
          Ut(c, -s), Ut(p, s), l = {
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
          }, i = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...l.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...l.start
          }, e[t][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = le(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = le(u, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["enter", o, n]]), u = le(u, dn(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = le(u, [["exit", o, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (f = 2, u = le(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : f = 0, ie(e, r - 1, t - r + 3, u), t = r + u.length - f - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function fa(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Me(r);
  let o;
  return l;
  function l(s) {
    return o = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === o)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), f = Me(s), c = !f || f === 2 && i || t.includes(s), p = !i || i === 2 && f || t.includes(r);
    return u._open = !!(o === 42 ? c : c && (i || !p)), u._close = !!(o === 42 ? p : p && (f || !c)), n(s);
  }
}
function Ut(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const ha = {
  name: "autolink",
  tokenize: pa
};
function pa(e, n, t) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(h) {
    return Z(h) ? (e.consume(h), l) : h === 64 ? t(h) : u(h);
  }
  function l(h) {
    return h === 43 || h === 45 || h === 46 || K(h) ? (r = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || K(h)) && r++ < 32 ? (e.consume(h), a) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), n) : h === null || h === 32 || h === 60 || un(h) ? t(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), f) : ta(h) ? (e.consume(h), u) : t(h);
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
  tokenize: ma
};
function ma(e, n, t) {
  return r;
  function r(o) {
    return M(o) ? B(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || z(o) ? n(o) : t(o);
  }
}
const jr = {
  continuation: {
    tokenize: ga
  },
  exit: ya,
  name: "blockQuote",
  tokenize: da
};
function da(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(l), e.exit("blockQuoteMarker"), o;
    }
    return t(l);
  }
  function o(l) {
    return M(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(l));
  }
}
function ga(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return M(l) ? B(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : o(l);
  }
  function o(l) {
    return e.attempt(jr, n, t)(l);
  }
}
function ya(e) {
  e.exit("blockQuote");
}
const $r = {
  name: "characterEscape",
  tokenize: ka
};
function ka(e, n, t) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return ia(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(o);
  }
}
const Hr = {
  name: "characterReference",
  tokenize: xa
};
function xa(e, n, t) {
  const r = this;
  let i = 0, o, l;
  return a;
  function a(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), s;
  }
  function s(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, l = K, f(c));
  }
  function u(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, l = ra, f) : (e.enter("characterReferenceValue"), o = 7, l = Vn, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const p = e.exit("characterReferenceValue");
      return l === K && !ut(r.sliceSerialize(p)) ? t(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return l(c) && i++ < o ? (e.consume(c), f) : t(c);
  }
}
const qt = {
  partial: !0,
  tokenize: wa
}, Vt = {
  concrete: !0,
  name: "codeFenced",
  tokenize: ba
};
function ba(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: _
  };
  let o = 0, l = 0, a;
  return s;
  function s(w) {
    return u(w);
  }
  function u(w) {
    const O = r.events[r.events.length - 1];
    return o = O && O[1].type === "linePrefix" ? O[2].sliceSerialize(O[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(w);
  }
  function f(w) {
    return w === a ? (l++, e.consume(w), f) : l < 3 ? t(w) : (e.exit("codeFencedFenceSequence"), M(w) ? B(e, c, "whitespace")(w) : c(w));
  }
  function c(w) {
    return w === null || z(w) ? (e.exit("codeFencedFence"), r.interrupt ? n(w) : e.check(qt, x, D)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(w));
  }
  function p(w) {
    return w === null || z(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(w)) : M(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), B(e, h, "whitespace")(w)) : w === 96 && w === a ? t(w) : (e.consume(w), p);
  }
  function h(w) {
    return w === null || z(w) ? c(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), g(w));
  }
  function g(w) {
    return w === null || z(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(w)) : w === 96 && w === a ? t(w) : (e.consume(w), g);
  }
  function x(w) {
    return e.attempt(i, D, S)(w);
  }
  function S(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), y;
  }
  function y(w) {
    return o > 0 && M(w) ? B(e, E, "linePrefix", o + 1)(w) : E(w);
  }
  function E(w) {
    return w === null || z(w) ? e.check(qt, x, D)(w) : (e.enter("codeFlowValue"), C(w));
  }
  function C(w) {
    return w === null || z(w) ? (e.exit("codeFlowValue"), E(w)) : (e.consume(w), C);
  }
  function D(w) {
    return e.exit("codeFenced"), n(w);
  }
  function _(w, O, $) {
    let j = 0;
    return k;
    function k(T) {
      return w.enter("lineEnding"), w.consume(T), w.exit("lineEnding"), v;
    }
    function v(T) {
      return w.enter("codeFencedFence"), M(T) ? B(w, P, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(T) : P(T);
    }
    function P(T) {
      return T === a ? (w.enter("codeFencedFenceSequence"), H(T)) : $(T);
    }
    function H(T) {
      return T === a ? (j++, w.consume(T), H) : j >= l ? (w.exit("codeFencedFenceSequence"), M(T) ? B(w, L, "whitespace")(T) : L(T)) : $(T);
    }
    function L(T) {
      return T === null || z(T) ? (w.exit("codeFencedFence"), O(T)) : $(T);
    }
  }
}
function wa(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? t(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? t(l) : n(l);
  }
}
const En = {
  name: "codeIndented",
  tokenize: Ca
}, Sa = {
  partial: !0,
  tokenize: Ea
};
function Ca(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), B(e, o, "linePrefix", 5)(u);
  }
  function o(u) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? l(u) : t(u);
  }
  function l(u) {
    return u === null ? s(u) : z(u) ? e.attempt(Sa, l, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || z(u) ? (e.exit("codeFlowValue"), l(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function Ea(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? t(l) : z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : B(e, o, "linePrefix", 5)(l);
  }
  function o(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(l) : z(l) ? i(l) : t(l);
  }
}
const Ia = {
  name: "codeText",
  previous: Ta,
  resolve: Aa,
  tokenize: va
};
function Aa(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Ta(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function va(e, n, t) {
  let r = 0, i, o;
  return l;
  function l(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit("codeTextSequence"), s(c));
  }
  function s(c) {
    return c === null ? t(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), s) : c === 96 ? (o = e.enter("codeTextSequence"), i = 0, f(c)) : z(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(c));
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || z(c) ? (e.exit("codeTextData"), s(c)) : (e.consume(c), u);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), i++, f) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(c)) : (o.type = "codeTextData", u(c));
  }
}
class Pa {
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
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
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
function Ur(e) {
  const n = {};
  let t = -1, r, i, o, l, a, s, u;
  const f = new Pa(e);
  for (; ++t < f.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = f.get(t), t && r[1].type === "chunkFlow" && f.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
      for (; ++o < s.length && s[o][1].type !== "content"; )
        s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, za(f, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (o = t, i = void 0; o--; )
        if (l = f.get(o), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = o);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...f.get(i)[1].start
      }, a = f.slice(i, t), a.unshift(r), f.splice(i, t - i + 1, a));
    }
  }
  return ie(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !u;
}
function za(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const o = [];
  let l = t._tokenizer;
  l || (l = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, s = [], u = {};
  let f, c, p = -1, h = t, g = 0, x = 0;
  const S = [x];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    o.push(i), h._tokenizer || (f = r.sliceStream(h), h.next || f.push(null), c && l.defineSkip(h.start), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(f), h._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), c = h, h = h.next;
  }
  for (h = t; ++p < a.length; )
    // Find a void token that includes a break.
    a[p][0] === "exit" && a[p - 1][0] === "enter" && a[p][1].type === a[p - 1][1].type && a[p][1].start.line !== a[p][1].end.line && (x = p + 1, S.push(x), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (l.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : S.pop(), p = S.length; p--; ) {
    const y = a.slice(S[p], S[p + 1]), E = o.pop();
    s.push([E, E + y.length - 1]), e.splice(E, 2, y);
  }
  for (s.reverse(), p = -1; ++p < s.length; )
    u[g + s[p][0]] = g + s[p][1], g += s[p][1] - s[p][0] - 1;
  return u;
}
const La = {
  resolve: Fa,
  tokenize: _a
}, Da = {
  partial: !0,
  tokenize: Ra
};
function Fa(e) {
  return Ur(e), e;
}
function _a(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : z(a) ? e.check(Da, l, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function l(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function Ra(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), B(e, o, "linePrefix");
  }
  function o(l) {
    if (l === null || z(l))
      return t(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(l) : e.interrupt(r.parser.constructs.flow, t, n)(l);
  }
}
function qr(e, n, t, r, i, o, l, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(y) {
    return y === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(y), e.exit(o), p) : y === null || y === 32 || y === 41 || un(y) ? t(y) : (e.enter(r), e.enter(l), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), x(y));
  }
  function p(y) {
    return y === 62 ? (e.enter(o), e.consume(y), e.exit(o), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(y));
  }
  function h(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(a), p(y)) : y === null || y === 60 || z(y) ? t(y) : (e.consume(y), y === 92 ? g : h);
  }
  function g(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), h) : h(y);
  }
  function x(y) {
    return !f && (y === null || y === 41 || Y(y)) ? (e.exit("chunkString"), e.exit(a), e.exit(l), e.exit(r), n(y)) : f < u && y === 40 ? (e.consume(y), f++, x) : y === 41 ? (e.consume(y), f--, x) : y === null || y === 32 || y === 40 || un(y) ? t(y) : (e.consume(y), y === 92 ? S : x);
  }
  function S(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), x) : x(y);
  }
}
function Vr(e, n, t, r, i, o) {
  const l = this;
  let a = 0, s;
  return u;
  function u(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(o), f;
  }
  function f(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? t(h) : h === 93 ? (e.exit(o), e.enter(i), e.consume(h), e.exit(i), e.exit(r), n) : z(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(h));
  }
  function c(h) {
    return h === null || h === 91 || h === 93 || z(h) || a++ > 999 ? (e.exit("chunkString"), f(h)) : (e.consume(h), s || (s = !M(h)), h === 92 ? p : c);
  }
  function p(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, c) : c(h);
  }
}
function Wr(e, n, t, r, i, o) {
  let l;
  return a;
  function a(p) {
    return p === 34 || p === 39 || p === 40 ? (e.enter(r), e.enter(i), e.consume(p), e.exit(i), l = p === 40 ? 41 : p, s) : t(p);
  }
  function s(p) {
    return p === l ? (e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : (e.enter(o), u(p));
  }
  function u(p) {
    return p === l ? (e.exit(o), s(l)) : p === null ? t(p) : z(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), B(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(p));
  }
  function f(p) {
    return p === l || p === null || z(p) ? (e.exit("chunkString"), u(p)) : (e.consume(p), p === 92 ? c : f);
  }
  function c(p) {
    return p === l || p === 92 ? (e.consume(p), f) : f(p);
  }
}
function Ye(e, n) {
  let t;
  return r;
  function r(i) {
    return z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : M(i) ? B(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const Ma = {
  name: "definition",
  tokenize: Na
}, Oa = {
  partial: !0,
  tokenize: Ba
};
function Na(e, n, t) {
  const r = this;
  let i;
  return o;
  function o(h) {
    return e.enter("definition"), l(h);
  }
  function l(h) {
    return Vr.call(
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
    return i = ce(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : t(h);
  }
  function s(h) {
    return Y(h) ? Ye(e, u)(h) : u(h);
  }
  function u(h) {
    return qr(
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
    return e.attempt(Oa, c, c)(h);
  }
  function c(h) {
    return M(h) ? B(e, p, "whitespace")(h) : p(h);
  }
  function p(h) {
    return h === null || z(h) ? (e.exit("definition"), r.parser.defined.push(i), n(h)) : t(h);
  }
}
function Ba(e, n, t) {
  return r;
  function r(a) {
    return Y(a) ? Ye(e, i)(a) : t(a);
  }
  function i(a) {
    return Wr(e, o, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return M(a) ? B(e, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || z(a) ? n(a) : t(a);
  }
}
const ja = {
  name: "hardBreakEscape",
  tokenize: $a
};
function $a(e, n, t) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), i;
  }
  function i(o) {
    return z(o) ? (e.exit("hardBreakEscape"), n(o)) : t(o);
  }
}
const Ha = {
  name: "headingAtx",
  resolve: Ua,
  tokenize: qa
};
function Ua(e, n) {
  let t = e.length - 2, r = 3, i, o;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, ie(e, r, t - r + 1, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["exit", i, n]])), e;
}
function qa(e, n, t) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e.enter("atxHeadingSequence"), l(f);
  }
  function l(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), l) : f === null || Y(f) ? (e.exit("atxHeadingSequence"), a(f)) : t(f);
  }
  function a(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), s(f)) : f === null || z(f) ? (e.exit("atxHeading"), n(f)) : M(f) ? B(e, a, "whitespace")(f) : (e.enter("atxHeadingText"), u(f));
  }
  function s(f) {
    return f === 35 ? (e.consume(f), s) : (e.exit("atxHeadingSequence"), a(f));
  }
  function u(f) {
    return f === null || f === 35 || Y(f) ? (e.exit("atxHeadingText"), a(f)) : (e.consume(f), u);
  }
}
const Va = [
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
], Wt = ["pre", "script", "style", "textarea"], Wa = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Ga,
  tokenize: Qa
}, Ya = {
  partial: !0,
  tokenize: Ja
}, Xa = {
  partial: !0,
  tokenize: Ka
};
function Ga(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function Qa(e, n, t) {
  const r = this;
  let i, o, l, a, s;
  return u;
  function u(d) {
    return f(d);
  }
  function f(d) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(d), c;
  }
  function c(d) {
    return d === 33 ? (e.consume(d), p) : d === 47 ? (e.consume(d), o = !0, x) : d === 63 ? (e.consume(d), i = 3, r.interrupt ? n : m) : Z(d) ? (e.consume(d), l = String.fromCharCode(d), S) : t(d);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), i = 2, h) : d === 91 ? (e.consume(d), i = 5, a = 0, g) : Z(d) ? (e.consume(d), i = 4, r.interrupt ? n : m) : t(d);
  }
  function h(d) {
    return d === 45 ? (e.consume(d), r.interrupt ? n : m) : t(d);
  }
  function g(d) {
    const ue = "CDATA[";
    return d === ue.charCodeAt(a++) ? (e.consume(d), a === ue.length ? r.interrupt ? n : P : g) : t(d);
  }
  function x(d) {
    return Z(d) ? (e.consume(d), l = String.fromCharCode(d), S) : t(d);
  }
  function S(d) {
    if (d === null || d === 47 || d === 62 || Y(d)) {
      const ue = d === 47, Ce = l.toLowerCase();
      return !ue && !o && Wt.includes(Ce) ? (i = 1, r.interrupt ? n(d) : P(d)) : Va.includes(l.toLowerCase()) ? (i = 6, ue ? (e.consume(d), y) : r.interrupt ? n(d) : P(d)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(d) : o ? E(d) : C(d));
    }
    return d === 45 || K(d) ? (e.consume(d), l += String.fromCharCode(d), S) : t(d);
  }
  function y(d) {
    return d === 62 ? (e.consume(d), r.interrupt ? n : P) : t(d);
  }
  function E(d) {
    return M(d) ? (e.consume(d), E) : k(d);
  }
  function C(d) {
    return d === 47 ? (e.consume(d), k) : d === 58 || d === 95 || Z(d) ? (e.consume(d), D) : M(d) ? (e.consume(d), C) : k(d);
  }
  function D(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || K(d) ? (e.consume(d), D) : _(d);
  }
  function _(d) {
    return d === 61 ? (e.consume(d), w) : M(d) ? (e.consume(d), _) : C(d);
  }
  function w(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), s = d, O) : M(d) ? (e.consume(d), w) : $(d);
  }
  function O(d) {
    return d === s ? (e.consume(d), s = null, j) : d === null || z(d) ? t(d) : (e.consume(d), O);
  }
  function $(d) {
    return d === null || d === 34 || d === 39 || d === 47 || d === 60 || d === 61 || d === 62 || d === 96 || Y(d) ? _(d) : (e.consume(d), $);
  }
  function j(d) {
    return d === 47 || d === 62 || M(d) ? C(d) : t(d);
  }
  function k(d) {
    return d === 62 ? (e.consume(d), v) : t(d);
  }
  function v(d) {
    return d === null || z(d) ? P(d) : M(d) ? (e.consume(d), v) : t(d);
  }
  function P(d) {
    return d === 45 && i === 2 ? (e.consume(d), q) : d === 60 && i === 1 ? (e.consume(d), G) : d === 62 && i === 4 ? (e.consume(d), ae) : d === 63 && i === 3 ? (e.consume(d), m) : d === 93 && i === 5 ? (e.consume(d), pe) : z(d) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ya, me, H)(d)) : d === null || z(d) ? (e.exit("htmlFlowData"), H(d)) : (e.consume(d), P);
  }
  function H(d) {
    return e.check(Xa, L, me)(d);
  }
  function L(d) {
    return e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), T;
  }
  function T(d) {
    return d === null || z(d) ? H(d) : (e.enter("htmlFlowData"), P(d));
  }
  function q(d) {
    return d === 45 ? (e.consume(d), m) : P(d);
  }
  function G(d) {
    return d === 47 ? (e.consume(d), l = "", oe) : P(d);
  }
  function oe(d) {
    if (d === 62) {
      const ue = l.toLowerCase();
      return Wt.includes(ue) ? (e.consume(d), ae) : P(d);
    }
    return Z(d) && l.length < 8 ? (e.consume(d), l += String.fromCharCode(d), oe) : P(d);
  }
  function pe(d) {
    return d === 93 ? (e.consume(d), m) : P(d);
  }
  function m(d) {
    return d === 62 ? (e.consume(d), ae) : d === 45 && i === 2 ? (e.consume(d), m) : P(d);
  }
  function ae(d) {
    return d === null || z(d) ? (e.exit("htmlFlowData"), me(d)) : (e.consume(d), ae);
  }
  function me(d) {
    return e.exit("htmlFlow"), n(d);
  }
}
function Ka(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o) : t(l);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? t(l) : n(l);
  }
}
function Ja(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Je, n, t);
  }
}
const Za = {
  name: "htmlText",
  tokenize: eu
};
function eu(e, n, t) {
  const r = this;
  let i, o, l;
  return a;
  function a(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), s;
  }
  function s(m) {
    return m === 33 ? (e.consume(m), u) : m === 47 ? (e.consume(m), _) : m === 63 ? (e.consume(m), C) : Z(m) ? (e.consume(m), $) : t(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), f) : m === 91 ? (e.consume(m), o = 0, g) : Z(m) ? (e.consume(m), E) : t(m);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), h) : t(m);
  }
  function c(m) {
    return m === null ? t(m) : m === 45 ? (e.consume(m), p) : z(m) ? (l = c, G(m)) : (e.consume(m), c);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), h) : c(m);
  }
  function h(m) {
    return m === 62 ? q(m) : m === 45 ? p(m) : c(m);
  }
  function g(m) {
    const ae = "CDATA[";
    return m === ae.charCodeAt(o++) ? (e.consume(m), o === ae.length ? x : g) : t(m);
  }
  function x(m) {
    return m === null ? t(m) : m === 93 ? (e.consume(m), S) : z(m) ? (l = x, G(m)) : (e.consume(m), x);
  }
  function S(m) {
    return m === 93 ? (e.consume(m), y) : x(m);
  }
  function y(m) {
    return m === 62 ? q(m) : m === 93 ? (e.consume(m), y) : x(m);
  }
  function E(m) {
    return m === null || m === 62 ? q(m) : z(m) ? (l = E, G(m)) : (e.consume(m), E);
  }
  function C(m) {
    return m === null ? t(m) : m === 63 ? (e.consume(m), D) : z(m) ? (l = C, G(m)) : (e.consume(m), C);
  }
  function D(m) {
    return m === 62 ? q(m) : C(m);
  }
  function _(m) {
    return Z(m) ? (e.consume(m), w) : t(m);
  }
  function w(m) {
    return m === 45 || K(m) ? (e.consume(m), w) : O(m);
  }
  function O(m) {
    return z(m) ? (l = O, G(m)) : M(m) ? (e.consume(m), O) : q(m);
  }
  function $(m) {
    return m === 45 || K(m) ? (e.consume(m), $) : m === 47 || m === 62 || Y(m) ? j(m) : t(m);
  }
  function j(m) {
    return m === 47 ? (e.consume(m), q) : m === 58 || m === 95 || Z(m) ? (e.consume(m), k) : z(m) ? (l = j, G(m)) : M(m) ? (e.consume(m), j) : q(m);
  }
  function k(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || K(m) ? (e.consume(m), k) : v(m);
  }
  function v(m) {
    return m === 61 ? (e.consume(m), P) : z(m) ? (l = v, G(m)) : M(m) ? (e.consume(m), v) : j(m);
  }
  function P(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), i = m, H) : z(m) ? (l = P, G(m)) : M(m) ? (e.consume(m), P) : (e.consume(m), L);
  }
  function H(m) {
    return m === i ? (e.consume(m), i = void 0, T) : m === null ? t(m) : z(m) ? (l = H, G(m)) : (e.consume(m), H);
  }
  function L(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? t(m) : m === 47 || m === 62 || Y(m) ? j(m) : (e.consume(m), L);
  }
  function T(m) {
    return m === 47 || m === 62 || Y(m) ? j(m) : t(m);
  }
  function q(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(m);
  }
  function G(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), oe;
  }
  function oe(m) {
    return M(m) ? B(e, pe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : pe(m);
  }
  function pe(m) {
    return e.enter("htmlTextData"), l(m);
  }
}
const st = {
  name: "labelEnd",
  resolveAll: iu,
  resolveTo: lu,
  tokenize: ou
}, nu = {
  tokenize: au
}, tu = {
  tokenize: uu
}, ru = {
  tokenize: su
};
function iu(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && ie(e, 0, e.length, t), e;
}
function lu(e, n) {
  let t = e.length, r = 0, i, o, l, a;
  for (; t--; )
    if (i = e[t][1], o) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (l = t);
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
      ...e[l][1].end
    }
  }, f = {
    type: "labelText",
    start: {
      ...e[o + r + 2][1].end
    },
    end: {
      ...e[l - 2][1].start
    }
  };
  return a = [["enter", s, n], ["enter", u, n]], a = le(a, e.slice(o + 1, o + r + 3)), a = le(a, [["enter", f, n]]), a = le(a, dn(n.parser.constructs.insideSpan.null, e.slice(o + r + 4, l - 3), n)), a = le(a, [["exit", f, n], e[l - 2], e[l - 1], ["exit", u, n]]), a = le(a, e.slice(l + 1)), a = le(a, [["exit", s, n]]), ie(e, o, e.length, a), e;
}
function ou(e, n, t) {
  const r = this;
  let i = r.events.length, o, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(p) {
    return o ? o._inactive ? c(p) : (l = r.parser.defined.includes(ce(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(p), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(p);
  }
  function s(p) {
    return p === 40 ? e.attempt(nu, f, l ? f : c)(p) : p === 91 ? e.attempt(tu, f, l ? u : c)(p) : l ? f(p) : c(p);
  }
  function u(p) {
    return e.attempt(ru, f, c)(p);
  }
  function f(p) {
    return n(p);
  }
  function c(p) {
    return o._balanced = !0, t(p);
  }
}
function au(e, n, t) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return Y(c) ? Ye(e, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : qr(e, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function l(c) {
    return Y(c) ? Ye(e, s)(c) : f(c);
  }
  function a(c) {
    return t(c);
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40 ? Wr(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function u(c) {
    return Y(c) ? Ye(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), n) : t(c);
  }
}
function uu(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return Vr.call(r, e, o, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(ce(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function l(a) {
    return t(a);
  }
}
function su(e, n, t) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), n) : t(o);
  }
}
const cu = {
  name: "labelStartImage",
  resolveAll: st.resolveAll,
  tokenize: fu
};
function fu(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), l) : t(a);
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const hu = {
  name: "labelStartLink",
  resolveAll: st.resolveAll,
  tokenize: pu
};
function pu(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(l) : n(l);
  }
}
const In = {
  name: "lineEnding",
  tokenize: mu
};
function mu(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), B(e, n, "linePrefix");
  }
}
const on = {
  name: "thematicBreak",
  tokenize: du
};
function du(e, n, t) {
  let r = 0, i;
  return o;
  function o(u) {
    return e.enter("thematicBreak"), l(u);
  }
  function l(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || z(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), M(u) ? B(e, a, "whitespace")(u) : a(u));
  }
}
const ee = {
  continuation: {
    tokenize: xu
  },
  exit: wu,
  name: "list",
  tokenize: ku
}, gu = {
  partial: !0,
  tokenize: Su
}, yu = {
  partial: !0,
  tokenize: bu
};
function ku(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return a;
  function a(h) {
    const g = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Vn(h)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(on, t, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return t(h);
  }
  function s(h) {
    return Vn(h) && ++l < 10 ? (e.consume(h), s) : (!r.interrupt || l < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : t(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      Je,
      // Can’t be empty when interrupting.
      r.interrupt ? t : f,
      e.attempt(gu, p, c)
    );
  }
  function f(h) {
    return r.containerState.initialBlankLine = !0, o++, p(h);
  }
  function c(h) {
    return M(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), p) : t(h);
  }
  function p(h) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(h);
  }
}
function xu(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Je, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, B(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !M(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(yu, n, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, B(e, e.attempt(ee, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function bu(e, n, t) {
  const r = this;
  return B(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? n(o) : t(o);
  }
}
function wu(e) {
  e.exit(this.containerState.type);
}
function Su(e, n, t) {
  const r = this;
  return B(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return !M(o) && l && l[1].type === "listItemPrefixWhitespace" ? n(o) : t(o);
  }
}
const Yt = {
  name: "setextUnderline",
  resolveTo: Cu,
  tokenize: Eu
};
function Cu(e, n) {
  let t = e.length, r, i, o;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !o && e[t][1].type === "definition" && (o = t);
  const l = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", o ? (e.splice(i, 0, ["enter", l, n]), e.splice(o + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[o][1].end
  }) : e[r][1] = l, e.push(["exit", l, n]), e;
}
function Eu(e, n, t) {
  const r = this;
  let i;
  return o;
  function o(u) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = u, l(u)) : t(u);
  }
  function l(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), M(u) ? B(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || z(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const Iu = {
  tokenize: Au
};
function Au(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Je,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, B(e, e.attempt(this.parser.constructs.flow, i, e.attempt(La, i)), "linePrefix"))
  );
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const Tu = {
  resolveAll: Xr()
}, vu = Yr("string"), Pu = Yr("text");
function Yr(e) {
  return {
    resolveAll: Xr(e === "text" ? zu : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], o = t.attempt(i, l, a);
    return l;
    function l(f) {
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
      const c = i[f];
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
function Xr(e) {
  return n;
  function n(t, r) {
    let i = -1, o;
    for (; ++i <= t.length; )
      o === void 0 ? t[i] && t[i][1].type === "data" && (o = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== o + 2 && (t[o][1].end = t[i - 1][1].end, t.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(t, r) : t;
  }
}
function zu(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let o = i.length, l = -1, a = 0, s;
      for (; o--; ) {
        const u = i[o];
        if (typeof u == "string") {
          for (l = u.length; u.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
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
            _bufferIndex: o ? l : r.start._bufferIndex + l,
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
const Lu = {
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
  62: jr
}, Du = {
  91: Ma
}, Fu = {
  [-2]: En,
  [-1]: En,
  32: En
}, _u = {
  35: Ha,
  42: on,
  45: [Yt, on],
  60: Wa,
  61: Yt,
  95: on,
  96: Vt,
  126: Vt
}, Ru = {
  38: Hr,
  92: $r
}, Mu = {
  [-5]: In,
  [-4]: In,
  [-3]: In,
  33: cu,
  38: Hr,
  42: Wn,
  60: [ha, Za],
  91: hu,
  92: [ja, $r],
  93: st,
  95: Wn,
  96: Ia
}, Ou = {
  null: [Wn, Tu]
}, Nu = {
  null: [42, 95]
}, Bu = {
  null: []
}, ju = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Nu,
  contentInitial: Du,
  disable: Bu,
  document: Lu,
  flow: _u,
  flowInitial: Fu,
  insideSpan: Ou,
  string: Ru,
  text: Mu
}, Symbol.toStringTag, { value: "Module" }));
function $u(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, o = [];
  let l = [], a = [];
  const s = {
    attempt: O(_),
    check: O(w),
    consume: E,
    enter: C,
    exit: D,
    interrupt: O(w, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: x,
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
    return l = le(l, v), S(), l[l.length - 1] !== null ? [] : ($(n, 0), u.events = dn(o, u.events, u), u.events);
  }
  function p(v, P) {
    return Uu(h(v), P);
  }
  function h(v) {
    return Hu(l, v);
  }
  function g() {
    const {
      _bufferIndex: v,
      _index: P,
      line: H,
      column: L,
      offset: T
    } = r;
    return {
      _bufferIndex: v,
      _index: P,
      line: H,
      column: L,
      offset: T
    };
  }
  function x(v) {
    i[v.line] = v.column, k();
  }
  function S() {
    let v;
    for (; r._index < l.length; ) {
      const P = l[r._index];
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
  function E(v) {
    z(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, k()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = v;
  }
  function C(v, P) {
    const H = P || {};
    return H.type = v, H.start = g(), u.events.push(["enter", H, u]), a.push(H), H;
  }
  function D(v) {
    const P = a.pop();
    return P.end = g(), u.events.push(["exit", P, u]), P;
  }
  function _(v, P) {
    $(v, P.from);
  }
  function w(v, P) {
    P.restore();
  }
  function O(v, P) {
    return H;
    function H(L, T, q) {
      let G, oe, pe, m;
      return Array.isArray(L) ? (
        /* c8 ignore next 1 */
        me(L)
      ) : "tokenize" in L ? (
        // Looks like a construct.
        me([
          /** @type {Construct} */
          L
        ])
      ) : ae(L);
      function ae(Q) {
        return Be;
        function Be(ke) {
          const ze = ke !== null && Q[ke], Le = ke !== null && Q.null, en = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ze) ? ze : ze ? [ze] : [],
            ...Array.isArray(Le) ? Le : Le ? [Le] : []
          ];
          return me(en)(ke);
        }
      }
      function me(Q) {
        return G = Q, oe = 0, Q.length === 0 ? q : d(Q[oe]);
      }
      function d(Q) {
        return Be;
        function Be(ke) {
          return m = j(), pe = Q, Q.partial || (u.currentConstruct = Q), Q.name && u.parser.constructs.disable.null.includes(Q.name) ? Ce() : Q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            P ? Object.assign(Object.create(u), P) : u,
            s,
            ue,
            Ce
          )(ke);
        }
      }
      function ue(Q) {
        return v(pe, m), T;
      }
      function Ce(Q) {
        return m.restore(), ++oe < G.length ? d(G[oe]) : q;
      }
    }
  }
  function $(v, P) {
    v.resolveAll && !o.includes(v) && o.push(v), v.resolve && ie(u.events, P, u.events.length - P, v.resolve(u.events.slice(P), u)), v.resolveTo && (u.events = v.resolveTo(u.events, u));
  }
  function j() {
    const v = g(), P = u.previous, H = u.currentConstruct, L = u.events.length, T = Array.from(a);
    return {
      from: L,
      restore: q
    };
    function q() {
      r = v, u.previous = P, u.currentConstruct = H, u.events.length = L, a = T, k();
    }
  }
  function k() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function Hu(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, o = n.end._bufferIndex;
  let l;
  if (t === i)
    l = [e[t].slice(r, o)];
  else {
    if (l = e.slice(t, i), r > -1) {
      const a = l[0];
      typeof a == "string" ? l[0] = a.slice(r) : l.shift();
    }
    o > 0 && l.push(e[i].slice(0, o));
  }
  return l;
}
function Uu(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const o = e[t];
    let l;
    if (typeof o == "string")
      l = o;
    else switch (o) {
      case -5: {
        l = "\r";
        break;
      }
      case -4: {
        l = `
`;
        break;
      }
      case -3: {
        l = `\r
`;
        break;
      }
      case -2: {
        l = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        l = " ";
        break;
      }
      default:
        l = String.fromCharCode(o);
    }
    i = o === -2, r.push(l);
  }
  return r.join("");
}
function qu(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Nr([ju, ...(e || {}).extensions || []])
    ),
    content: i(la),
    defined: [],
    document: i(aa),
    flow: i(Iu),
    lazy: {},
    string: i(vu),
    text: i(Pu)
  };
  return r;
  function i(o) {
    return l;
    function l(a) {
      return $u(r, o, a);
    }
  }
}
function Vu(e) {
  for (; !Ur(e); )
    ;
  return e;
}
const Xt = /[\0\t\n\r]/g;
function Wu() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(o, l, a) {
    const s = [];
    let u, f, c, p, h;
    for (o = n + (typeof o == "string" ? o.toString() : new TextDecoder(l || void 0).decode(o)), c = 0, n = "", t && (o.charCodeAt(0) === 65279 && c++, t = void 0); c < o.length; ) {
      if (Xt.lastIndex = c, u = Xt.exec(o), p = u && u.index !== void 0 ? u.index : o.length, h = o.charCodeAt(p), !u) {
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
const Yu = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Xu(e) {
  return e.replace(Yu, Gu);
}
function Gu(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), o = i === 120 || i === 88;
    return Br(t.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return ut(t) || e;
}
const Gr = {}.hasOwnProperty;
function Qu(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), Ku(t)(Vu(qu(t).document().write(Wu()(e, n, !0))));
}
function Ku(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(St),
      autolinkProtocol: j,
      autolinkEmail: j,
      atxHeading: o(xt),
      blockQuote: o(Le),
      characterEscape: j,
      characterReference: j,
      codeFenced: o(en),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: o(en, l),
      codeText: o(zi, l),
      codeTextData: j,
      data: j,
      codeFlowValue: j,
      definition: o(Li),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: o(Di),
      hardBreakEscape: o(bt),
      hardBreakTrailing: o(bt),
      htmlFlow: o(wt, l),
      htmlFlowData: j,
      htmlText: o(wt, l),
      htmlTextData: j,
      image: o(Fi),
      label: l,
      link: o(St),
      listItem: o(_i),
      listItemValue: p,
      listOrdered: o(Ct, c),
      listUnordered: o(Ct),
      paragraph: o(Ri),
      reference: d,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: o(xt),
      strong: o(Mi),
      thematicBreak: o(Ni)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: _,
      autolink: s(),
      autolinkEmail: ze,
      autolinkProtocol: ke,
      blockQuote: s(),
      characterEscapeValue: k,
      characterReferenceMarkerHexadecimal: Ce,
      characterReferenceMarkerNumeric: Ce,
      characterReferenceValue: Q,
      characterReference: Be,
      codeFenced: s(S),
      codeFencedFence: x,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: g,
      codeFlowValue: k,
      codeIndented: s(y),
      codeText: s(T),
      codeTextData: k,
      data: k,
      definition: s(),
      definitionDestinationString: D,
      definitionLabelString: E,
      definitionTitleString: C,
      emphasis: s(),
      hardBreakEscape: s(P),
      hardBreakTrailing: s(P),
      htmlFlow: s(H),
      htmlFlowData: k,
      htmlText: s(L),
      htmlTextData: k,
      image: s(G),
      label: pe,
      labelText: oe,
      lineEnding: v,
      link: s(q),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ue,
      resourceDestinationString: m,
      resourceTitleString: ae,
      resource: me,
      setextHeading: s($),
      setextHeadingLineSequence: O,
      setextHeadingText: w,
      strong: s(),
      thematicBreak: s()
    }
  };
  Qr(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(b) {
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
      buffer: l,
      resume: f,
      data: t
    }, N = [];
    let V = -1;
    for (; ++V < b.length; )
      if (b[V][1].type === "listOrdered" || b[V][1].type === "listUnordered")
        if (b[V][0] === "enter")
          N.push(V);
        else {
          const se = N.pop();
          V = i(b, se, V);
        }
    for (V = -1; ++V < b.length; ) {
      const se = n[b[V][0]];
      Gr.call(se, b[V][1].type) && se[b[V][1].type].call(Object.assign({
        sliceSerialize: b[V][2].sliceSerialize
      }, R), b[V][1]);
    }
    if (R.tokenStack.length > 0) {
      const se = R.tokenStack[R.tokenStack.length - 1];
      (se[1] || Gt).call(R, void 0, se[0]);
    }
    for (A.position = {
      start: xe(b.length > 0 ? b[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: xe(b.length > 0 ? b[b.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, V = -1; ++V < n.transforms.length; )
      A = n.transforms[V](A) || A;
    return A;
  }
  function i(b, A, R) {
    let N = A - 1, V = -1, se = !1, Ee, de, je, $e;
    for (; ++N <= R; ) {
      const te = b[N];
      switch (te[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          te[0] === "enter" ? V++ : V--, $e = void 0;
          break;
        }
        case "lineEndingBlank": {
          te[0] === "enter" && (Ee && !$e && !V && !je && (je = N), $e = void 0);
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
      if (!V && te[0] === "enter" && te[1].type === "listItemPrefix" || V === -1 && te[0] === "exit" && (te[1].type === "listUnordered" || te[1].type === "listOrdered")) {
        if (Ee) {
          let De = N;
          for (de = void 0; De--; ) {
            const ge = b[De];
            if (ge[1].type === "lineEnding" || ge[1].type === "lineEndingBlank") {
              if (ge[0] === "exit") continue;
              de && (b[de][1].type = "lineEndingBlank", se = !0), ge[1].type = "lineEnding", de = De;
            } else if (!(ge[1].type === "linePrefix" || ge[1].type === "blockQuotePrefix" || ge[1].type === "blockQuotePrefixWhitespace" || ge[1].type === "blockQuoteMarker" || ge[1].type === "listItemIndent")) break;
          }
          je && (!de || je < de) && (Ee._spread = !0), Ee.end = Object.assign({}, de ? b[de][1].start : te[1].end), b.splice(de || N, 0, ["exit", Ee, te[2]]), N++, R++;
        }
        if (te[1].type === "listItemPrefix") {
          const De = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, te[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ee = De, b.splice(N, 0, ["enter", De, te[2]]), N++, R++, je = void 0, $e = !0;
        }
      }
    }
    return b[A][1]._spread = se, R;
  }
  function o(b, A) {
    return R;
    function R(N) {
      a.call(this, b(N), N), A && A.call(this, N);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(b, A, R) {
    this.stack[this.stack.length - 1].children.push(b), this.stack.push(b), this.tokenStack.push([A, R || void 0]), b.position = {
      start: xe(A.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(b) {
    return A;
    function A(R) {
      b && b.call(this, R), u.call(this, R);
    }
  }
  function u(b, A) {
    const R = this.stack.pop(), N = this.tokenStack.pop();
    if (N)
      N[0].type !== b.type && (A ? A.call(this, b, N[0]) : (N[1] || Gt).call(this, b, N[0]));
    else throw new Error("Cannot close `" + b.type + "` (" + We({
      start: b.start,
      end: b.end
    }) + "): it’s not open");
    R.position.end = xe(b.end);
  }
  function f() {
    return at(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function p(b) {
    if (this.data.expectingFirstListItemValue) {
      const A = this.stack[this.stack.length - 2];
      A.start = Number.parseInt(this.sliceSerialize(b), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.lang = b;
  }
  function g() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.meta = b;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function S() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function E(b) {
    const A = this.resume(), R = this.stack[this.stack.length - 1];
    R.label = A, R.identifier = ce(this.sliceSerialize(b)).toLowerCase();
  }
  function C() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = b;
  }
  function D() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = b;
  }
  function _(b) {
    const A = this.stack[this.stack.length - 1];
    if (!A.depth) {
      const R = this.sliceSerialize(b).length;
      A.depth = R;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function O(b) {
    const A = this.stack[this.stack.length - 1];
    A.depth = this.sliceSerialize(b).codePointAt(0) === 61 ? 1 : 2;
  }
  function $() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function j(b) {
    const R = this.stack[this.stack.length - 1].children;
    let N = R[R.length - 1];
    (!N || N.type !== "text") && (N = Oi(), N.position = {
      start: xe(b.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, R.push(N)), this.stack.push(N);
  }
  function k(b) {
    const A = this.stack.pop();
    A.value += this.sliceSerialize(b), A.position.end = xe(b.end);
  }
  function v(b) {
    const A = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const R = A.children[A.children.length - 1];
      R.position.end = xe(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(A.type) && (j.call(this, b), k.call(this, b));
  }
  function P() {
    this.data.atHardBreak = !0;
  }
  function H() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = b;
  }
  function L() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = b;
  }
  function T() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.value = b;
  }
  function q() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = A, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function G() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = A, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function oe(b) {
    const A = this.sliceSerialize(b), R = this.stack[this.stack.length - 2];
    R.label = Xu(A), R.identifier = ce(A).toLowerCase();
  }
  function pe() {
    const b = this.stack[this.stack.length - 1], A = this.resume(), R = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, R.type === "link") {
      const N = b.children;
      R.children = N;
    } else
      R.alt = A;
  }
  function m() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.url = b;
  }
  function ae() {
    const b = this.resume(), A = this.stack[this.stack.length - 1];
    A.title = b;
  }
  function me() {
    this.data.inReference = void 0;
  }
  function d() {
    this.data.referenceType = "collapsed";
  }
  function ue(b) {
    const A = this.resume(), R = this.stack[this.stack.length - 1];
    R.label = A, R.identifier = ce(this.sliceSerialize(b)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ce(b) {
    this.data.characterReferenceType = b.type;
  }
  function Q(b) {
    const A = this.sliceSerialize(b), R = this.data.characterReferenceType;
    let N;
    R ? (N = Br(A, R === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : N = ut(A);
    const V = this.stack[this.stack.length - 1];
    V.value += N;
  }
  function Be(b) {
    const A = this.stack.pop();
    A.position.end = xe(b.end);
  }
  function ke(b) {
    k.call(this, b);
    const A = this.stack[this.stack.length - 1];
    A.url = this.sliceSerialize(b);
  }
  function ze(b) {
    k.call(this, b);
    const A = this.stack[this.stack.length - 1];
    A.url = "mailto:" + this.sliceSerialize(b);
  }
  function Le() {
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
  function zi() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Li() {
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
  function xt() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function bt() {
    return {
      type: "break"
    };
  }
  function wt() {
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
  function St() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Ct(b) {
    return {
      type: "list",
      ordered: b.type === "listOrdered",
      start: null,
      spread: b._spread,
      children: []
    };
  }
  function _i(b) {
    return {
      type: "listItem",
      spread: b._spread,
      checked: null,
      children: []
    };
  }
  function Ri() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Mi() {
    return {
      type: "strong",
      children: []
    };
  }
  function Oi() {
    return {
      type: "text",
      value: ""
    };
  }
  function Ni() {
    return {
      type: "thematicBreak"
    };
  }
}
function xe(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Qr(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? Qr(e, r) : Ju(e, r);
  }
}
function Ju(e, n) {
  let t;
  for (t in n)
    if (Gr.call(n, t))
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
function Gt(e, n) {
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
function Zu(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return Qu(r, {
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
function es(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ns(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function ts(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, i = n.lang ? n.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let o = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (o.data = { meta: n.meta }), e.patch(n, o), o = e.applyData(n, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(n, o), o;
}
function rs(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function is(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ls(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = Ne(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let l, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(l) }]
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
function os(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function as(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function Kr(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function us(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Kr(e, n);
  const i = { src: Ne(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, o), e.applyData(n, o);
}
function ss(e, n) {
  const t = { src: Ne(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function cs(e, n) {
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
function fs(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Kr(e, n);
  const i = { href: Ne(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function hs(e, n) {
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
function ps(e, n, t) {
  const r = e.all(n), i = t ? ms(t) : Jr(n), o = {}, l = [];
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
    (i || a !== 0 || f.type !== "element" || f.tagName !== "p") && l.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !i ? l.push(...f.children) : l.push(f);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && l.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: o, children: l };
  return e.patch(n, u), e.applyData(n, u);
}
function ms(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Jr(t[r]);
  }
  return n;
}
function Jr(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function ds(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const l = r[i];
    if (l.type === "element" && l.tagName === "li" && l.properties && Array.isArray(l.properties.className) && l.properties.className.includes("task-list-item")) {
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
function gs(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ys(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function ks(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function xs(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const l = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], l), i.push(l);
  }
  if (t.length > 0) {
    const l = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = rt(n.children[1]), s = Lr(n.children[n.children.length - 1]);
    a && s && (l.position = { start: a, end: s }), i.push(l);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function bs(e, n, t) {
  const r = t ? t.children : void 0, o = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", l = t && t.type === "table" ? t.align : void 0, a = l ? l.length : n.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const c = n.children[s], p = {}, h = l ? l[s] : void 0;
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
function ws(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Qt = 9, Kt = 32;
function Ss(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const o = [];
  for (; r; )
    o.push(
      Jt(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return o.push(Jt(n.slice(i), i > 0, !1)), o.join("");
}
function Jt(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let o = e.codePointAt(r);
    for (; o === Qt || o === Kt; )
      r++, o = e.codePointAt(r);
  }
  if (t) {
    let o = e.codePointAt(i - 1);
    for (; o === Qt || o === Kt; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Cs(e, n) {
  const t = { type: "text", value: Ss(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Es(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Is = {
  blockquote: es,
  break: ns,
  code: ts,
  delete: rs,
  emphasis: is,
  footnoteReference: ls,
  heading: os,
  html: as,
  imageReference: us,
  image: ss,
  inlineCode: cs,
  linkReference: fs,
  link: hs,
  listItem: ps,
  list: ds,
  paragraph: gs,
  // @ts-expect-error: root is different, but hard to type.
  root: ys,
  strong: ks,
  table: xs,
  tableCell: ws,
  tableRow: bs,
  text: Cs,
  thematicBreak: Es,
  toml: nn,
  yaml: nn,
  definition: nn,
  footnoteDefinition: nn
};
function nn() {
}
const Zr = -1, gn = 0, Xe = 1, sn = 2, ct = 3, ft = 4, ht = 5, pt = 6, ei = 7, ni = 8, ti = typeof self == "object" ? self : globalThis, Zt = (e, n) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new ti[e](n);
}, As = (e, n) => {
  const t = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, l] = n[i];
    switch (o) {
      case gn:
      case Zr:
        return t(l, i);
      case Xe: {
        const a = t([], i);
        for (const s of l)
          a.push(r(s));
        return a;
      }
      case sn: {
        const a = t({}, i);
        for (const [s, u] of l)
          a[r(s)] = r(u);
        return a;
      }
      case ct:
        return t(new Date(l), i);
      case ft: {
        const { source: a, flags: s } = l;
        return t(new RegExp(a, s), i);
      }
      case ht: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of l)
          a.set(r(s), r(u));
        return a;
      }
      case pt: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const s of l)
          a.add(r(s));
        return a;
      }
      case ei: {
        const { name: a, message: s } = l;
        return t(
          typeof ti[a] == "function" ? Zt(a, s) : new Error(s),
          i
        );
      }
      case ni:
        return t(BigInt(l), i);
      case "BigInt":
        return t(Object(BigInt(l)), i);
      case "ArrayBuffer":
        return t(new Uint8Array(l).buffer, l);
      case "DataView": {
        const { buffer: a } = new Uint8Array(l);
        return t(new DataView(a), l);
      }
    }
    return t(Zt(o, l), i);
  };
  return r;
}, er = (e) => As(/* @__PURE__ */ new Map(), e)(0), Ae = "", { toString: Ts } = {}, { keys: vs } = Object, Ve = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [gn, n];
  const t = Ts.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Xe, Ae];
    case "Object":
      return [sn, Ae];
    case "Date":
      return [ct, Ae];
    case "RegExp":
      return [ft, Ae];
    case "Map":
      return [ht, Ae];
    case "Set":
      return [pt, Ae];
    case "DataView":
      return [Xe, t];
  }
  return t.includes("Array") ? [Xe, t] : e instanceof Error ? [ei, e.name || "Error"] : [sn, t];
}, tn = ([e, n]) => e === gn && (n === "function" || n === "symbol"), Ps = (e, n, t, r) => {
  const i = (l, a) => {
    const s = r.push(l) - 1;
    return t.set(a, s), s;
  }, o = (l) => {
    if (t.has(l))
      return t.get(l);
    let [a, s] = Ve(l);
    switch (a) {
      case gn: {
        let f = l;
        switch (s) {
          case "bigint":
            a = ni, f = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            f = null;
            break;
          case "undefined":
            return i([Zr], l);
        }
        return i([a, f], l);
      }
      case Xe: {
        if (s) {
          let p = l;
          return s === "DataView" ? p = new Uint8Array(l.buffer) : s === "ArrayBuffer" && (p = new Uint8Array(l)), i([s, [...p]], l);
        }
        const f = [], c = i([a, f], l);
        for (const p of l)
          f.push(o(p));
        return c;
      }
      case sn: {
        if (s)
          switch (s) {
            case "BigInt":
              return i([s, l.toString()], l);
            case "Boolean":
            case "Number":
            case "String":
              return i([s, l.valueOf()], l);
          }
        if (n && "toJSON" in l)
          return o(l.toJSON());
        const f = [], c = i([a, f], l);
        for (const p of vs(l))
          (e || !tn(Ve(l[p]))) && f.push([o(p), o(l[p])]);
        return c;
      }
      case ct:
        return i([a, isNaN(l.getTime()) ? Ae : l.toISOString()], l);
      case ft: {
        const { source: f, flags: c } = l;
        return i([a, { source: f, flags: c }], l);
      }
      case ht: {
        const f = [], c = i([a, f], l);
        for (const [p, h] of l)
          (e || !(tn(Ve(p)) || tn(Ve(h)))) && f.push([o(p), o(h)]);
        return c;
      }
      case pt: {
        const f = [], c = i([a, f], l);
        for (const p of l)
          (e || !tn(Ve(p))) && f.push(o(p));
        return c;
      }
    }
    const { message: u } = l;
    return i([a, { name: s, message: u }], l);
  };
  return o;
}, nr = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Ps(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, cn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? er(nr(e, n)) : structuredClone(e)
) : (e, n) => er(nr(e, n));
function zs(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function Ls(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Ds(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || zs, r = e.options.footnoteBackLabel || Ls, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
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
    const g = [], x = e.footnoteCounts.get(c);
    for (; x !== void 0 && ++h <= x; ) {
      g.length > 0 && g.push({ type: "text", value: " " });
      let E = typeof t == "string" ? t : t(s, h);
      typeof E == "string" && (E = { type: "text", value: E }), g.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + p + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(E) ? E : [E]
      });
    }
    const S = f[f.length - 1];
    if (S && S.type === "element" && S.tagName === "p") {
      const E = S.children[S.children.length - 1];
      E && E.type === "text" ? E.value += " " : S.children.push({ type: "text", value: " " }), S.children.push(...g);
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
            ...cn(l),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
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
const yn = (
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
      return Ms;
    if (typeof e == "function")
      return kn(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Fs(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        _s(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Rs(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function Fs(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = yn(e[t]);
  return kn(r);
  function r(...i) {
    let o = -1;
    for (; ++o < n.length; )
      if (n[o].apply(this, i)) return !0;
    return !1;
  }
}
function _s(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return kn(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (i[o] !== n[o]) return !1;
    return !0;
  }
}
function Rs(e) {
  return kn(n);
  function n(t) {
    return t && t.type === e;
  }
}
function kn(e) {
  return n;
  function n(t, r, i) {
    return !!(Os(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Ms() {
  return !0;
}
function Os(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ri = [], Ns = !0, Yn = !1, Bs = "skip";
function ii(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const o = yn(i), l = r ? -1 : 1;
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
      let h = ri, g, x, S;
      if ((!n || o(s, u, f[f.length - 1] || void 0)) && (h = js(t(s, f)), h[0] === Yn))
        return h;
      if ("children" in s && s.children) {
        const y = (
          /** @type {UnistParent} */
          s
        );
        if (y.children && h[0] !== Bs)
          for (x = (r ? y.children.length : -1) + l, S = f.concat(y); x > -1 && x < y.children.length; ) {
            const E = y.children[x];
            if (g = a(E, x, S)(), g[0] === Yn)
              return g;
            x = typeof g[1] == "number" ? g[1] : x + l;
          }
      }
      return h;
    }
  }
}
function js(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Ns, e] : e == null ? ri : [e];
}
function mt(e, n, t, r) {
  let i, o, l;
  typeof n == "function" && typeof t != "function" ? (o = void 0, l = n, i = t) : (o = n, l = t, i = r), ii(e, o, a, i);
  function a(s, u) {
    const f = u[u.length - 1], c = f ? f.children.indexOf(s) : void 0;
    return l(s, c, f);
  }
}
const Xn = {}.hasOwnProperty, $s = {};
function Hs(e, n) {
  const t = n || $s, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = { ...Is, ...t.handlers }, a = {
    all: u,
    applyData: qs,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: l,
    one: s,
    options: t,
    patch: Us,
    wrap: Ws
  };
  return mt(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, p = String(f.identifier).toUpperCase();
      c.has(p) || c.set(p, f);
    }
  }), a;
  function s(f, c) {
    const p = f.type, h = a.handlers[p];
    if (Xn.call(a.handlers, p) && h)
      return h(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(p)) {
      if ("children" in f) {
        const { children: x, ...S } = f, y = cn(S);
        return y.children = a.all(f), y;
      }
      return cn(f);
    }
    return (a.options.unknownHandler || Vs)(a, f, c);
  }
  function u(f) {
    const c = [];
    if ("children" in f) {
      const p = f.children;
      let h = -1;
      for (; ++h < p.length; ) {
        const g = a.one(p[h], f);
        if (g) {
          if (h && p[h - 1].type === "break" && (!Array.isArray(g) && g.type === "text" && (g.value = tr(g.value)), !Array.isArray(g) && g.type === "element")) {
            const x = g.children[0];
            x && x.type === "text" && (x.value = tr(x.value));
          }
          Array.isArray(g) ? c.push(...g) : c.push(g);
        }
      }
    }
    return c;
  }
}
function Us(e, n) {
  e.position && (n.position = Lo(e));
}
function qs(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const l = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: l };
      }
    t.type === "element" && o && Object.assign(t.properties, cn(o)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function Vs(e, n) {
  const t = n.data || {}, r = "value" in n && !(Xn.call(t, "hProperties") || Xn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Ws(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function tr(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function rr(e, n) {
  const t = Hs(e, n), r = t.one(e, void 0), i = Ds(t), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function Ys(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      rr(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      rr(t, { file: r, ...e || n })
    );
  };
}
function ir(e) {
  if (e)
    throw e;
}
var An, lr;
function Xs() {
  if (lr) return An;
  lr = 1;
  var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(u) {
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
  }, l = function(u, f) {
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
  return An = function s() {
    var u, f, c, p, h, g, x = arguments[0], S = 1, y = arguments.length, E = !1;
    for (typeof x == "boolean" && (E = x, x = arguments[1] || {}, S = 2), (x == null || typeof x != "object" && typeof x != "function") && (x = {}); S < y; ++S)
      if (u = arguments[S], u != null)
        for (f in u)
          c = a(x, f), p = a(u, f), x !== p && (E && p && (o(p) || (h = i(p))) ? (h ? (h = !1, g = c && i(c) ? c : []) : g = c && o(c) ? c : {}, l(x, { name: f, newValue: s(E, g, p) })) : typeof p < "u" && l(x, { name: f, newValue: p }));
    return x;
  }, An;
}
var Gs = Xs();
const Tn = /* @__PURE__ */ zr(Gs);
function Gn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Qs() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let o = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    a(null, ...i);
    function a(s, ...u) {
      const f = e[++o];
      let c = -1;
      if (s) {
        l(s);
        return;
      }
      for (; ++c < i.length; )
        (u[c] === null || u[c] === void 0) && (u[c] = i[c]);
      i = u, f ? Ks(f, a)(...u) : l(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function Ks(e, n) {
  let t;
  return r;
  function r(...l) {
    const a = e.length > l.length;
    let s;
    a && l.push(i);
    try {
      s = e.apply(this, l);
    } catch (u) {
      const f = (
        /** @type {Error} */
        u
      );
      if (a && t)
        throw f;
      return i(f);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(o, i) : s instanceof Error ? i(s) : o(s));
  }
  function i(l, ...a) {
    t || (t = !0, n(l, ...a));
  }
  function o(l) {
    i(null, l);
  }
}
const fe = { basename: Js, dirname: Zs, extname: ec, join: nc, sep: "/" };
function Js(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  Ze(e);
  let t = 0, r = -1, i = e.length, o;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (o) {
          t = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let l = -1, a = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (o) {
        t = i + 1;
        break;
      }
    } else
      l < 0 && (o = !0, l = i + 1), a > -1 && (e.codePointAt(i) === n.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = l));
  return t === r ? r = l : r < 0 && (r = e.length), e.slice(t, r);
}
function Zs(e) {
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
function ec(e) {
  Ze(e);
  let n = e.length, t = -1, r = 0, i = -1, o = 0, l;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (l) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (l = !0, t = n + 1), a === 46 ? i < 0 ? i = n : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function nc(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    Ze(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : tc(t);
}
function tc(e) {
  Ze(e);
  const n = e.codePointAt(0) === 47;
  let t = rc(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function rc(e, n) {
  let t = "", r = 0, i = -1, o = 0, l = -1, a, s;
  for (; ++l <= e.length; ) {
    if (l < e.length)
      a = e.codePointAt(l);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === l - 1 || o === 1)) if (i !== l - 1 && o === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), i = l, o = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = l, o = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, l) : t = e.slice(i + 1, l), r = l - i - 1;
      i = l, o = 0;
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
const ic = { cwd: lc };
function lc() {
  return "/";
}
function Qn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function oc(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Qn(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return ac(e);
}
function ac(e) {
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
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const vn = (
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
class li {
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
    n ? Qn(n) ? t = { path: n } : typeof n == "string" || uc(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : ic.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < vn.length; ) {
      const o = vn[r];
      o in t && t[o] !== void 0 && t[o] !== null && (this[o] = o === "history" ? [...t[o]] : t[o]);
    }
    let i;
    for (i in t)
      vn.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? fe.basename(this.path) : void 0;
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
    zn(n, "basename"), Pn(n, "basename"), this.path = fe.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? fe.dirname(this.path) : void 0;
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
    or(this.basename, "dirname"), this.path = fe.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? fe.extname(this.path) : void 0;
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
    if (Pn(n, "extname"), or(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = fe.join(this.dirname, this.stem + (n || ""));
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
    Qn(n) && (n = oc(n)), zn(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? fe.basename(this.path, this.extname) : void 0;
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
    zn(n, "stem"), Pn(n, "stem"), this.path = fe.join(this.dirname || "", n + (this.extname || ""));
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
    const i = this.message(n, t, r);
    throw i.fatal = !0, i;
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
    const i = this.message(n, t, r);
    return i.fatal = void 0, i;
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
    const i = new J(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
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
function Pn(e, n) {
  if (e && e.includes(fe.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + fe.sep + "`"
    );
}
function zn(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function or(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function uc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const sc = (
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
    ), i = r[e], o = function() {
      return i.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  })
), cc = {}.hasOwnProperty;
class dt extends sc {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Qs();
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
      new dt()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(Tn(!0, {}, this.namespace)), n;
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
    return typeof n == "string" ? arguments.length === 2 ? (Fn("data", this.frozen), this.namespace[n] = t, this) : cc.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Fn("data", this.frozen), this.namespace = n, this) : this.namespace;
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
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
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
    return Ln("parse", r), r(String(t), t);
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
    return this.freeze(), Ln("process", this.parser || this.Parser), Dn("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(o, l) {
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
        pc(g) ? p.value = g : p.result = g, u(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          p
        );
      });
      function u(f, c) {
        f || !c ? l(f) : o ? o(c) : t(void 0, c);
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
    return this.freeze(), Ln("processSync", this.parser || this.Parser), Dn("processSync", this.compiler || this.Compiler), this.process(n, i), ur("processSync", "process", t), r;
    function i(o, l) {
      t = !0, ir(o), r = l;
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
    ar(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? o(void 0, r) : new Promise(o);
    function o(l, a) {
      const s = rn(t);
      i.run(n, s, u);
      function u(f, c, p) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || n
        );
        f ? a(f) : l ? l(h) : r(void 0, h, p);
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
    let r = !1, i;
    return this.run(n, t, o), ur("runSync", "run", r), i;
    function o(l, a) {
      ir(l), i = a, r = !0;
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
    const r = rn(t), i = this.compiler || this.Compiler;
    return Dn("stringify", i), ar(n), i(n, r);
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
    const r = this.attachers, i = this.namespace;
    if (Fn("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : l(n);
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
          l(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function l(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (i.settings = Tn(!0, i.settings, u.settings));
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
        const x = r[p][1];
        Gn(x) && Gn(h) && (h = Tn(!0, x, h)), r[p] = [u, h, ...g];
      }
    }
  }
}
const fc = new dt().freeze();
function Ln(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Dn(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Fn(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ar(e) {
  if (!Gn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function ur(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function rn(e) {
  return hc(e) ? e : new li(e);
}
function hc(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function pc(e) {
  return typeof e == "string" || mc(e);
}
function mc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const dc = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", sr = [], cr = { allowDangerousHtml: !0 }, gc = /^(https?|ircs?|mailto|xmpp)$/i, yc = [
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
function kc(e) {
  const n = xc(e), t = bc(e);
  return wc(n.runSync(n.parse(t), t), e);
}
function xc(e) {
  const n = e.rehypePlugins || sr, t = e.remarkPlugins || sr, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...cr } : cr;
  return fc().use(Zu).use(t).use(Ys, r).use(n);
}
function bc(e) {
  const n = e.children || "", t = new li();
  return typeof n == "string" && (t.value = n), t;
}
function wc(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, o = n.disallowedElements, l = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || Sc;
  for (const f of yc)
    Object.hasOwn(n, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + dc + f.id, void 0);
  return mt(e, u), Mo(e, {
    Fragment: Zn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: U,
    jsxs: be,
    passKeys: !0,
    passNode: !0
  });
  function u(f, c, p) {
    if (f.type === "raw" && p && typeof c == "number")
      return l ? p.children.splice(c, 1) : p.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let h;
      for (h in Cn)
        if (Object.hasOwn(Cn, h) && Object.hasOwn(f.properties, h)) {
          const g = f.properties[h], x = Cn[h];
          (x === null || x.includes(f.tagName)) && (f.properties[h] = s(String(g || ""), h, f));
        }
    }
    if (f.type === "element") {
      let h = t ? !t.includes(f.tagName) : o ? o.includes(f.tagName) : !1;
      if (!h && r && typeof c == "number" && (h = !r(f, c, p)), h && p && typeof c == "number")
        return a && f.children ? p.children.splice(c, 1, ...f.children) : p.children.splice(c, 1), c;
    }
  }
}
function Sc(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    gc.test(e.slice(0, n)) ? e : ""
  );
}
function fr(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, i = t.indexOf(n);
  for (; i !== -1; )
    r++, i = t.indexOf(n, i + n.length);
  return r;
}
function Cc(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Ec(e, n, t) {
  const i = yn((t || {}).ignore || []), o = Ic(n);
  let l = -1;
  for (; ++l < o.length; )
    ii(e, "text", a);
  function a(u, f) {
    let c = -1, p;
    for (; ++c < f.length; ) {
      const h = f[c], g = p ? p.children : void 0;
      if (i(
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
    const c = f[f.length - 1], p = o[l][0], h = o[l][1];
    let g = 0;
    const S = c.children.indexOf(u);
    let y = !1, E = [];
    p.lastIndex = 0;
    let C = p.exec(u.value);
    for (; C; ) {
      const D = C.index, _ = {
        index: C.index,
        input: C.input,
        stack: [...f, u]
      };
      let w = h(...C, _);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === !1 ? p.lastIndex = D + 1 : (g !== D && E.push({
        type: "text",
        value: u.value.slice(g, D)
      }), Array.isArray(w) ? E.push(...w) : w && E.push(w), g = D + C[0].length, y = !0), !p.global)
        break;
      C = p.exec(u.value);
    }
    return y ? (g < u.value.length && E.push({ type: "text", value: u.value.slice(g) }), c.children.splice(S, 1, ...E)) : E = [u], S + E.length;
  }
}
function Ic(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const i = t[r];
    n.push([Ac(i[0]), Tc(i[1])]);
  }
  return n;
}
function Ac(e) {
  return typeof e == "string" ? new RegExp(Cc(e), "g") : e;
}
function Tc(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const _n = "phrasing", Rn = ["autolink", "link", "image", "label"];
function vc() {
  return {
    transforms: [Rc],
    enter: {
      literalAutolink: zc,
      literalAutolinkEmail: Mn,
      literalAutolinkHttp: Mn,
      literalAutolinkWww: Mn
    },
    exit: {
      literalAutolink: _c,
      literalAutolinkEmail: Fc,
      literalAutolinkHttp: Lc,
      literalAutolinkWww: Dc
    }
  };
}
function Pc() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: _n,
        notInConstruct: Rn
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: _n,
        notInConstruct: Rn
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: _n,
        notInConstruct: Rn
      }
    ]
  };
}
function zc(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Mn(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function Lc(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function Dc(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function Fc(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function _c(e) {
  this.exit(e);
}
function Rc(e) {
  Ec(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Mc],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), Oc]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function Mc(e, n, t, r, i) {
  let o = "";
  if (!oi(i) || (/^w/i.test(n) && (t = n + t, n = "", o = "http://"), !Nc(t)))
    return !1;
  const l = Bc(t + r);
  if (!l[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + n + l[0],
    children: [{ type: "text", value: n + l[0] }]
  };
  return l[1] ? [a, { type: "text", value: l[1] }] : a;
}
function Oc(e, n, t, r) {
  return (
    // Not an expected previous character.
    !oi(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function Nc(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function Bc(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const i = fr(e, "(");
  let o = fr(e, ")");
  for (; r !== -1 && i > o; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), o++;
  return [e, t];
}
function oi(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || ve(t) || mn(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
ai.peek = Xc;
function jc() {
  this.buffer();
}
function $c(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function Hc() {
  this.buffer();
}
function Uc(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function qc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = ce(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function Vc(e) {
  this.exit(e);
}
function Wc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = ce(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function Yc(e) {
  this.exit(e);
}
function Xc() {
  return "[";
}
function ai(e, n, t, r) {
  const i = t.createTracker(r);
  let o = i.move("[^");
  const l = t.enter("footnoteReference"), a = t.enter("reference");
  return o += i.move(
    t.safe(t.associationId(e), { after: "]", before: o })
  ), a(), l(), o += i.move("]"), o;
}
function Gc() {
  return {
    enter: {
      gfmFootnoteCallString: jc,
      gfmFootnoteCall: $c,
      gfmFootnoteDefinitionLabelString: Hc,
      gfmFootnoteDefinition: Uc
    },
    exit: {
      gfmFootnoteCallString: qc,
      gfmFootnoteCall: Vc,
      gfmFootnoteDefinitionLabelString: Wc,
      gfmFootnoteDefinition: Yc
    }
  };
}
function Qc(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: ai },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, i, o, l) {
    const a = o.createTracker(l);
    let s = a.move("[^");
    const u = o.enter("footnoteDefinition"), f = o.enter("label");
    return s += a.move(
      o.safe(o.associationId(r), { before: s, after: "]" })
    ), f(), s += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), s += a.move(
      (n ? `
` : " ") + o.indentLines(
        o.containerFlow(r, a.current()),
        n ? ui : Kc
      )
    )), u(), s;
  }
}
function Kc(e, n, t) {
  return n === 0 ? e : ui(e, n, t);
}
function ui(e, n, t) {
  return (t ? "" : "    ") + e;
}
const Jc = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
si.peek = rf;
function Zc() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: nf },
    exit: { strikethrough: tf }
  };
}
function ef() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Jc
      }
    ],
    handlers: { delete: si }
  };
}
function nf(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function tf(e) {
  this.exit(e);
}
function si(e, n, t, r) {
  const i = t.createTracker(r), o = t.enter("strikethrough");
  let l = i.move("~~");
  return l += t.containerPhrasing(e, {
    ...i.current(),
    before: l,
    after: "~"
  }), l += i.move("~~"), o(), l;
}
function rf() {
  return "~";
}
function lf(e) {
  return e.length;
}
function of(e, n) {
  const t = n || {}, r = (t.align || []).concat(), i = t.stringLength || lf, o = [], l = [], a = [], s = [];
  let u = 0, f = -1;
  for (; ++f < e.length; ) {
    const x = [], S = [];
    let y = -1;
    for (e[f].length > u && (u = e[f].length); ++y < e[f].length; ) {
      const E = af(e[f][y]);
      if (t.alignDelimiters !== !1) {
        const C = i(E);
        S[y] = C, (s[y] === void 0 || C > s[y]) && (s[y] = C);
      }
      x.push(E);
    }
    l[f] = x, a[f] = S;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < u; )
      o[c] = hr(r[c]);
  else {
    const x = hr(r);
    for (; ++c < u; )
      o[c] = x;
  }
  c = -1;
  const p = [], h = [];
  for (; ++c < u; ) {
    const x = o[c];
    let S = "", y = "";
    x === 99 ? (S = ":", y = ":") : x === 108 ? S = ":" : x === 114 && (y = ":");
    let E = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      s[c] - S.length - y.length
    );
    const C = S + "-".repeat(E) + y;
    t.alignDelimiters !== !1 && (E = S.length + E + y.length, E > s[c] && (s[c] = E), h[c] = E), p[c] = C;
  }
  l.splice(1, 0, p), a.splice(1, 0, h), f = -1;
  const g = [];
  for (; ++f < l.length; ) {
    const x = l[f], S = a[f];
    c = -1;
    const y = [];
    for (; ++c < u; ) {
      const E = x[c] || "";
      let C = "", D = "";
      if (t.alignDelimiters !== !1) {
        const _ = s[c] - (S[c] || 0), w = o[c];
        w === 114 ? C = " ".repeat(_) : w === 99 ? _ % 2 ? (C = " ".repeat(_ / 2 + 0.5), D = " ".repeat(_ / 2 - 0.5)) : (C = " ".repeat(_ / 2), D = C) : D = " ".repeat(_);
      }
      t.delimiterStart !== !1 && !c && y.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && E === "") && (t.delimiterStart !== !1 || c) && y.push(" "), t.alignDelimiters !== !1 && y.push(C), y.push(E), t.alignDelimiters !== !1 && y.push(D), t.padding !== !1 && y.push(" "), (t.delimiterEnd !== !1 || c !== u - 1) && y.push("|");
    }
    g.push(
      t.delimiterEnd === !1 ? y.join("").replace(/ +$/, "") : y.join("")
    );
  }
  return g.join(`
`);
}
function af(e) {
  return e == null ? "" : String(e);
}
function hr(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function uf(e, n, t, r) {
  const i = t.enter("blockquote"), o = t.createTracker(r);
  o.move("> "), o.shift(2);
  const l = t.indentLines(
    t.containerFlow(e, o.current()),
    sf
  );
  return i(), l;
}
function sf(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function cf(e, n) {
  return pr(e, n.inConstruct, !0) && !pr(e, n.notInConstruct, !1);
}
function pr(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function mr(e, n, t, r) {
  let i = -1;
  for (; ++i < t.unsafe.length; )
    if (t.unsafe[i].character === `
` && cf(t.stack, t.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function ff(e, n) {
  const t = String(e);
  let r = t.indexOf(n), i = r, o = 0, l = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++o > l && (l = o) : o = 1, i = r + n.length, r = t.indexOf(n, i);
  return l;
}
function hf(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function pf(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function mf(e, n, t, r) {
  const i = pf(t), o = e.value || "", l = i === "`" ? "GraveAccent" : "Tilde";
  if (hf(e, t)) {
    const c = t.enter("codeIndented"), p = t.indentLines(o, df);
    return c(), p;
  }
  const a = t.createTracker(r), s = i.repeat(Math.max(ff(o, i) + 1, 3)), u = t.enter("codeFenced");
  let f = a.move(s);
  if (e.lang) {
    const c = t.enter(`codeFencedLang${l}`);
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
    const c = t.enter(`codeFencedMeta${l}`);
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
function df(e, n, t) {
  return (t ? "" : "    ") + e;
}
function gt(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function gf(e, n, t, r) {
  const i = gt(t), o = i === '"' ? "Quote" : "Apostrophe", l = t.enter("definition");
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
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), a()), l(), u;
}
function yf(e) {
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
function fn(e, n, t) {
  const r = Me(e), i = Me(n);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
ci.peek = kf;
function ci(e, n, t, r) {
  const i = yf(t), o = t.enter("emphasis"), l = t.createTracker(r), a = l.move(i);
  let s = l.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...l.current()
    })
  );
  const u = s.charCodeAt(0), f = fn(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  f.inside && (s = Qe(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = fn(r.after.charCodeAt(0), c, i);
  p.inside && (s = s.slice(0, -1) + Qe(c));
  const h = l.move(i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: f.outside
  }, a + s + h;
}
function kf(e, n, t) {
  return t.options.emphasis || "*";
}
function xf(e, n) {
  let t = !1;
  return mt(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, Yn;
  }), !!((!e.depth || e.depth < 3) && at(e) && (n.options.setext || t));
}
function bf(e, n, t, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), o = t.createTracker(r);
  if (xf(e, t)) {
    const f = t.enter("headingSetext"), c = t.enter("phrasing"), p = t.containerPhrasing(e, {
      ...o.current(),
      before: `
`,
      after: `
`
    });
    return c(), f(), p + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      p.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(p.lastIndexOf("\r"), p.lastIndexOf(`
`)) + 1)
    );
  }
  const l = "#".repeat(i), a = t.enter("headingAtx"), s = t.enter("phrasing");
  o.move(l + " ");
  let u = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(u) && (u = Qe(u.charCodeAt(0)) + u.slice(1)), u = u ? l + " " + u : l, t.options.closeAtx && (u += " " + l), s(), a(), u;
}
fi.peek = wf;
function fi(e) {
  return e.value || "";
}
function wf() {
  return "<";
}
hi.peek = Sf;
function hi(e, n, t, r) {
  const i = gt(t), o = i === '"' ? "Quote" : "Apostrophe", l = t.enter("image");
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
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), a()), u += s.move(")"), l(), u;
}
function Sf() {
  return "!";
}
pi.peek = Cf;
function pi(e, n, t, r) {
  const i = e.referenceType, o = t.enter("imageReference");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("![");
  const u = t.safe(e.alt, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), l();
  const f = t.stack;
  t.stack = [], l = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return l(), t.stack = f, o(), i === "full" || !u || u !== c ? s += a.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function Cf() {
  return "!";
}
mi.peek = Ef;
function mi(e, n, t) {
  let r = e.value || "", i = "`", o = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < t.unsafe.length; ) {
    const l = t.unsafe[o], a = t.compilePattern(l);
    let s;
    if (l.atBreak)
      for (; s = a.exec(r); ) {
        let u = s.index;
        r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--, r = r.slice(0, u) + " " + r.slice(s.index + 1);
      }
  }
  return i + r + i;
}
function Ef() {
  return "`";
}
function di(e, n) {
  const t = at(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
gi.peek = If;
function gi(e, n, t, r) {
  const i = gt(t), o = i === '"' ? "Quote" : "Apostrophe", l = t.createTracker(r);
  let a, s;
  if (di(e, t)) {
    const f = t.stack;
    t.stack = [], a = t.enter("autolink");
    let c = l.move("<");
    return c += l.move(
      t.containerPhrasing(e, {
        before: c,
        after: ">",
        ...l.current()
      })
    ), c += l.move(">"), a(), t.stack = f, c;
  }
  a = t.enter("link"), s = t.enter("label");
  let u = l.move("[");
  return u += l.move(
    t.containerPhrasing(e, {
      before: u,
      after: "](",
      ...l.current()
    })
  ), u += l.move("]("), s(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), u += l.move("<"), u += l.move(
    t.safe(e.url, { before: u, after: ">", ...l.current() })
  ), u += l.move(">")) : (s = t.enter("destinationRaw"), u += l.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...l.current()
    })
  )), s(), e.title && (s = t.enter(`title${o}`), u += l.move(" " + i), u += l.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...l.current()
    })
  ), u += l.move(i), s()), u += l.move(")"), a(), u;
}
function If(e, n, t) {
  return di(e, t) ? "<" : "[";
}
yi.peek = Af;
function yi(e, n, t, r) {
  const i = e.referenceType, o = t.enter("linkReference");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("[");
  const u = t.containerPhrasing(e, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), l();
  const f = t.stack;
  t.stack = [], l = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return l(), t.stack = f, o(), i === "full" || !u || u !== c ? s += a.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function Af() {
  return "[";
}
function yt(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function Tf(e) {
  const n = yt(e), t = e.options.bulletOther;
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
function vf(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function ki(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function Pf(e, n, t, r) {
  const i = t.enter("list"), o = t.bulletCurrent;
  let l = e.ordered ? vf(t) : yt(t);
  const a = e.ordered ? l === "." ? ")" : "." : Tf(t);
  let s = n && t.bulletLastUsed ? l === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (l === "*" || l === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (s = !0), ki(t) === l && f
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
  s && (l = a), t.bulletCurrent = l;
  const u = t.containerFlow(e, r);
  return t.bulletLastUsed = l, t.bulletCurrent = o, i(), u;
}
function zf(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function Lf(e, n, t, r) {
  const i = zf(t);
  let o = t.bulletCurrent || yt(t);
  n && n.type === "list" && n.ordered && (o = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + o);
  let l = o.length + 1;
  (i === "tab" || i === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (l = Math.ceil(l / 4) * 4);
  const a = t.createTracker(r);
  a.move(o + " ".repeat(l - o.length)), a.shift(l);
  const s = t.enter("listItem"), u = t.indentLines(
    t.containerFlow(e, a.current()),
    f
  );
  return s(), u;
  function f(c, p, h) {
    return p ? (h ? "" : " ".repeat(l)) + c : (h ? o : o + " ".repeat(l - o.length)) + c;
  }
}
function Df(e, n, t, r) {
  const i = t.enter("paragraph"), o = t.enter("phrasing"), l = t.containerPhrasing(e, r);
  return o(), i(), l;
}
const Ff = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  yn([
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
function _f(e, n, t, r) {
  return (e.children.some(function(l) {
    return Ff(l);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function Rf(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
xi.peek = Mf;
function xi(e, n, t, r) {
  const i = Rf(t), o = t.enter("strong"), l = t.createTracker(r), a = l.move(i + i);
  let s = l.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...l.current()
    })
  );
  const u = s.charCodeAt(0), f = fn(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  f.inside && (s = Qe(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = fn(r.after.charCodeAt(0), c, i);
  p.inside && (s = s.slice(0, -1) + Qe(c));
  const h = l.move(i + i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: f.outside
  }, a + s + h;
}
function Mf(e, n, t) {
  return t.options.strong || "*";
}
function Of(e, n, t, r) {
  return t.safe(e.value, r);
}
function Nf(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function Bf(e, n, t) {
  const r = (ki(t) + (t.options.ruleSpaces ? " " : "")).repeat(Nf(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const bi = {
  blockquote: uf,
  break: mr,
  code: mf,
  definition: gf,
  emphasis: ci,
  hardBreak: mr,
  heading: bf,
  html: fi,
  image: hi,
  imageReference: pi,
  inlineCode: mi,
  link: gi,
  linkReference: yi,
  list: Pf,
  listItem: Lf,
  paragraph: Df,
  root: _f,
  strong: xi,
  text: Of,
  thematicBreak: Bf
};
function jf() {
  return {
    enter: {
      table: $f,
      tableData: dr,
      tableHeader: dr,
      tableRow: Uf
    },
    exit: {
      codeText: qf,
      table: Hf,
      tableData: On,
      tableHeader: On,
      tableRow: On
    }
  };
}
function $f(e) {
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
function Hf(e) {
  this.exit(e), this.data.inTable = void 0;
}
function Uf(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function On(e) {
  this.exit(e);
}
function dr(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function qf(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, Vf));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function Vf(e, n) {
  return n === "|" ? n : e;
}
function Wf(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, i = n.stringLength, o = t ? " " : "|";
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
      table: l,
      tableCell: s,
      tableRow: a
    }
  };
  function l(h, g, x, S) {
    return u(f(h, x, S), h.align);
  }
  function a(h, g, x, S) {
    const y = c(h, x, S), E = u([y]);
    return E.slice(0, E.indexOf(`
`));
  }
  function s(h, g, x, S) {
    const y = x.enter("tableCell"), E = x.enter("phrasing"), C = x.containerPhrasing(h, {
      ...S,
      before: o,
      after: o
    });
    return E(), y(), C;
  }
  function u(h, g) {
    return of(h, {
      align: g,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function f(h, g, x) {
    const S = h.children;
    let y = -1;
    const E = [], C = g.enter("table");
    for (; ++y < S.length; )
      E[y] = c(S[y], g, x);
    return C(), E;
  }
  function c(h, g, x) {
    const S = h.children;
    let y = -1;
    const E = [], C = g.enter("tableRow");
    for (; ++y < S.length; )
      E[y] = s(S[y], h, g, x);
    return C(), E;
  }
  function p(h, g, x) {
    let S = bi.inlineCode(h, g, x);
    return x.stack.includes("tableCell") && (S = S.replace(/\|/g, "\\$&")), S;
  }
}
function Yf() {
  return {
    exit: {
      taskListCheckValueChecked: gr,
      taskListCheckValueUnchecked: gr,
      paragraph: Gf
    }
  };
}
function Xf() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: Qf }
  };
}
function gr(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function Gf(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const i = n.children;
      let o = -1, l;
      for (; ++o < i.length; ) {
        const a = i[o];
        if (a.type === "paragraph") {
          l = a;
          break;
        }
      }
      l === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function Qf(e, n, t, r) {
  const i = e.children[0], o = typeof e.checked == "boolean" && i && i.type === "paragraph", l = "[" + (e.checked ? "x" : " ") + "] ", a = t.createTracker(r);
  o && a.move(l);
  let s = bi.listItem(e, n, t, {
    ...r,
    ...a.current()
  });
  return o && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), s;
  function u(f) {
    return f + l;
  }
}
function Kf() {
  return [
    vc(),
    Gc(),
    Zc(),
    jf(),
    Yf()
  ];
}
function Jf(e) {
  return {
    extensions: [
      Pc(),
      Qc(e),
      ef(),
      Wf(e),
      Xf()
    ]
  };
}
const Zf = {
  tokenize: lh,
  partial: !0
}, wi = {
  tokenize: oh,
  partial: !0
}, Si = {
  tokenize: ah,
  partial: !0
}, Ci = {
  tokenize: uh,
  partial: !0
}, eh = {
  tokenize: sh,
  partial: !0
}, Ei = {
  name: "wwwAutolink",
  tokenize: rh,
  previous: Ai
}, Ii = {
  name: "protocolAutolink",
  tokenize: ih,
  previous: Ti
}, ye = {
  name: "emailAutolink",
  tokenize: th,
  previous: vi
}, he = {};
function nh() {
  return {
    text: he
  };
}
let Ie = 48;
for (; Ie < 123; )
  he[Ie] = ye, Ie++, Ie === 58 ? Ie = 65 : Ie === 91 && (Ie = 97);
he[43] = ye;
he[45] = ye;
he[46] = ye;
he[95] = ye;
he[72] = [ye, Ii];
he[104] = [ye, Ii];
he[87] = [ye, Ei];
he[119] = [ye, Ei];
function th(e, n, t) {
  const r = this;
  let i, o;
  return l;
  function l(c) {
    return !Kn(c) || !vi.call(r, r.previous) || kt(r.events) ? t(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return Kn(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), s) : t(c);
  }
  function s(c) {
    return c === 46 ? e.check(eh, f, u)(c) : c === 45 || c === 95 || K(c) ? (o = !0, e.consume(c), s) : f(c);
  }
  function u(c) {
    return e.consume(c), i = !0, s;
  }
  function f(c) {
    return o && i && Z(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(c)) : t(c);
  }
}
function rh(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return l !== 87 && l !== 119 || !Ai.call(r, r.previous) || kt(r.events) ? t(l) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Zf, e.attempt(wi, e.attempt(Si, o), t), t)(l));
  }
  function o(l) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(l);
  }
}
function ih(e, n, t) {
  const r = this;
  let i = "", o = !1;
  return l;
  function l(c) {
    return (c === 72 || c === 104) && Ti.call(r, r.previous) && !kt(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), a) : t(c);
  }
  function a(c) {
    if (Z(c) && i.length < 5)
      return i += String.fromCodePoint(c), e.consume(c), a;
    if (c === 58) {
      const p = i.toLowerCase();
      if (p === "http" || p === "https")
        return e.consume(c), s;
    }
    return t(c);
  }
  function s(c) {
    return c === 47 ? (e.consume(c), o ? u : (o = !0, s)) : t(c);
  }
  function u(c) {
    return c === null || un(c) || Y(c) || ve(c) || mn(c) ? t(c) : e.attempt(wi, e.attempt(Si, f), t)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(c);
  }
}
function lh(e, n, t) {
  let r = 0;
  return i;
  function i(l) {
    return (l === 87 || l === 119) && r < 3 ? (r++, e.consume(l), i) : l === 46 && r === 3 ? (e.consume(l), o) : t(l);
  }
  function o(l) {
    return l === null ? t(l) : n(l);
  }
}
function oh(e, n, t) {
  let r, i, o;
  return l;
  function l(u) {
    return u === 46 || u === 95 ? e.check(Ci, s, a)(u) : u === null || Y(u) || ve(u) || u !== 45 && mn(u) ? s(u) : (o = !0, e.consume(u), l);
  }
  function a(u) {
    return u === 95 ? r = !0 : (i = r, r = void 0), e.consume(u), l;
  }
  function s(u) {
    return i || r || !o ? t(u) : n(u);
  }
}
function ah(e, n) {
  let t = 0, r = 0;
  return i;
  function i(l) {
    return l === 40 ? (t++, e.consume(l), i) : l === 41 && r < t ? o(l) : l === 33 || l === 34 || l === 38 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 60 || l === 63 || l === 93 || l === 95 || l === 126 ? e.check(Ci, n, o)(l) : l === null || Y(l) || ve(l) ? n(l) : (e.consume(l), i);
  }
  function o(l) {
    return l === 41 && r++, e.consume(l), i;
  }
}
function uh(e, n, t) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), o) : a === 93 ? (e.consume(a), i) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || Y(a) || ve(a) ? n(a) : t(a)
    );
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || Y(a) || ve(a) ? n(a) : r(a);
  }
  function o(a) {
    return Z(a) ? l(a) : t(a);
  }
  function l(a) {
    return a === 59 ? (e.consume(a), r) : Z(a) ? (e.consume(a), l) : t(a);
  }
}
function sh(e, n, t) {
  return r;
  function r(o) {
    return e.consume(o), i;
  }
  function i(o) {
    return K(o) ? t(o) : n(o);
  }
}
function Ai(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || Y(e);
}
function Ti(e) {
  return !Z(e);
}
function vi(e) {
  return !(e === 47 || Kn(e));
}
function Kn(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || K(e);
}
function kt(e) {
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
const ch = {
  tokenize: kh,
  partial: !0
};
function fh() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: dh,
        continuation: {
          tokenize: gh
        },
        exit: yh
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: mh
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: hh,
        resolveTo: ph
      }
    }
  };
}
function hh(e, n, t) {
  const r = this;
  let i = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l;
  for (; i--; ) {
    const s = r.events[i][1];
    if (s.type === "labelImage") {
      l = s;
      break;
    }
    if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link")
      break;
  }
  return a;
  function a(s) {
    if (!l || !l._balanced)
      return t(s);
    const u = ce(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }));
    return u.codePointAt(0) !== 94 || !o.includes(u.slice(1)) ? t(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), n(s));
  }
}
function ph(e, n) {
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
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, l = {
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
    ["enter", i, n],
    ["exit", i, n],
    // Everything in between.
    ["enter", o, n],
    ["enter", l, n],
    ["exit", l, n],
    ["exit", o, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...a), e;
}
function mh(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, l;
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
      c === 93 && !l || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || Y(c)
    )
      return t(c);
    if (c === 93) {
      e.exit("chunkString");
      const p = e.exit("gfmFootnoteCallString");
      return i.includes(ce(r.sliceSerialize(p))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(c);
    }
    return Y(c) || (l = !0), o++, e.consume(c), c === 92 ? f : u;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), o++, u) : u(c);
  }
}
function dh(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, l = 0, a;
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
      l > 999 || // Closing brace with nothing.
      g === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      g === null || g === 91 || Y(g)
    )
      return t(g);
    if (g === 93) {
      e.exit("chunkString");
      const x = e.exit("gfmFootnoteDefinitionLabelString");
      return o = ce(r.sliceSerialize(x)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return Y(g) || (a = !0), l++, e.consume(g), g === 92 ? c : f;
  }
  function c(g) {
    return g === 91 || g === 92 || g === 93 ? (e.consume(g), l++, f) : f(g);
  }
  function p(g) {
    return g === 58 ? (e.enter("definitionMarker"), e.consume(g), e.exit("definitionMarker"), i.includes(o) || i.push(o), B(e, h, "gfmFootnoteDefinitionWhitespace")) : t(g);
  }
  function h(g) {
    return n(g);
  }
}
function gh(e, n, t) {
  return e.check(Je, n, e.attempt(ch, n, t));
}
function yh(e) {
  e.exit("gfmFootnoteDefinition");
}
function kh(e, n, t) {
  const r = this;
  return B(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "gfmFootnoteDefinitionIndent" && l[2].sliceSerialize(l[1], !0).length === 4 ? n(o) : t(o);
  }
}
function xh(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: i
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
  function i(l, a) {
    let s = -1;
    for (; ++s < l.length; )
      if (l[s][0] === "enter" && l[s][1].type === "strikethroughSequenceTemporary" && l[s][1]._close) {
        let u = s;
        for (; u--; )
          if (l[u][0] === "exit" && l[u][1].type === "strikethroughSequenceTemporary" && l[u][1]._open && // If the sizes are the same:
          l[s][1].end.offset - l[s][1].start.offset === l[u][1].end.offset - l[u][1].start.offset) {
            l[s][1].type = "strikethroughSequence", l[u][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, l[u][1].start),
              end: Object.assign({}, l[s][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, l[u][1].end),
              end: Object.assign({}, l[s][1].start)
            }, p = [["enter", f, a], ["enter", l[u][1], a], ["exit", l[u][1], a], ["enter", c, a]], h = a.parser.constructs.insideSpan.null;
            h && ie(p, p.length, 0, dn(h, l.slice(u + 1, s), a)), ie(p, p.length, 0, [["exit", c, a], ["enter", l[s][1], a], ["exit", l[s][1], a], ["exit", f, a]]), ie(l, u - 1, s - u + 3, p), s = u + p.length - 2;
            break;
          }
      }
    for (s = -1; ++s < l.length; )
      l[s][1].type === "strikethroughSequenceTemporary" && (l[s][1].type = "data");
    return l;
  }
  function o(l, a, s) {
    const u = this.previous, f = this.events;
    let c = 0;
    return p;
    function p(g) {
      return u === 126 && f[f.length - 1][1].type !== "characterEscape" ? s(g) : (l.enter("strikethroughSequenceTemporary"), h(g));
    }
    function h(g) {
      const x = Me(u);
      if (g === 126)
        return c > 1 ? s(g) : (l.consume(g), c++, h);
      if (c < 2 && !t) return s(g);
      const S = l.exit("strikethroughSequenceTemporary"), y = Me(g);
      return S._open = !y || y === 2 && !!x, S._close = !x || x === 2 && !!y, a(g);
    }
  }
}
class bh {
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
    wh(this, n, t, r);
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
    if (this.map.sort(function(o, l) {
      return o[0] - l[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const o of i)
        n.push(o);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function wh(e, n, t, r) {
  let i = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === n) {
        e.map[i][1] += t, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([n, t, r]);
  }
}
function Sh(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const i = e[n];
    if (t) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function Ch() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Eh,
        resolveAll: Ih
      }
    }
  };
}
function Eh(e, n, t) {
  const r = this;
  let i = 0, o = 0, l;
  return a;
  function a(k) {
    let v = r.events.length - 1;
    for (; v > -1; ) {
      const L = r.events[v][1].type;
      if (L === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      L === "linePrefix") v--;
      else break;
    }
    const P = v > -1 ? r.events[v][1].type : null, H = P === "tableHead" || P === "tableRow" ? w : s;
    return H === w && r.parser.lazy[r.now().line] ? t(k) : H(k);
  }
  function s(k) {
    return e.enter("tableHead"), e.enter("tableRow"), u(k);
  }
  function u(k) {
    return k === 124 || (l = !0, o += 1), f(k);
  }
  function f(k) {
    return k === null ? t(k) : z(k) ? o > 1 ? (o = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), h) : t(k) : M(k) ? B(e, f, "whitespace")(k) : (o += 1, l && (l = !1, i += 1), k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), l = !0, f) : (e.enter("data"), c(k)));
  }
  function c(k) {
    return k === null || k === 124 || Y(k) ? (e.exit("data"), f(k)) : (e.consume(k), k === 92 ? p : c);
  }
  function p(k) {
    return k === 92 || k === 124 ? (e.consume(k), c) : c(k);
  }
  function h(k) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(k) : (e.enter("tableDelimiterRow"), l = !1, M(k) ? B(e, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : g(k));
  }
  function g(k) {
    return k === 45 || k === 58 ? S(k) : k === 124 ? (l = !0, e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), x) : _(k);
  }
  function x(k) {
    return M(k) ? B(e, S, "whitespace")(k) : S(k);
  }
  function S(k) {
    return k === 58 ? (o += 1, l = !0, e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), y) : k === 45 ? (o += 1, y(k)) : k === null || z(k) ? D(k) : _(k);
  }
  function y(k) {
    return k === 45 ? (e.enter("tableDelimiterFiller"), E(k)) : _(k);
  }
  function E(k) {
    return k === 45 ? (e.consume(k), E) : k === 58 ? (l = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), C) : (e.exit("tableDelimiterFiller"), C(k));
  }
  function C(k) {
    return M(k) ? B(e, D, "whitespace")(k) : D(k);
  }
  function D(k) {
    return k === 124 ? g(k) : k === null || z(k) ? !l || i !== o ? _(k) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(k)) : _(k);
  }
  function _(k) {
    return t(k);
  }
  function w(k) {
    return e.enter("tableRow"), O(k);
  }
  function O(k) {
    return k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), O) : k === null || z(k) ? (e.exit("tableRow"), n(k)) : M(k) ? B(e, O, "whitespace")(k) : (e.enter("data"), $(k));
  }
  function $(k) {
    return k === null || k === 124 || Y(k) ? (e.exit("data"), O(k)) : (e.consume(k), k === 92 ? j : $);
  }
  function j(k) {
    return k === 92 || k === 124 ? (e.consume(k), $) : $(k);
  }
}
function Ih(e, n) {
  let t = -1, r = !0, i = 0, o = [0, 0, 0, 0], l = [0, 0, 0, 0], a = !1, s = 0, u, f, c;
  const p = new bh();
  for (; ++t < e.length; ) {
    const h = e[t], g = h[1];
    h[0] === "enter" ? g.type === "tableHead" ? (a = !1, s !== 0 && (yr(p, n, s, u, f), f = void 0, s = 0), u = {
      type: "table",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", u, n]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = !0, c = void 0, o = [0, 0, 0, 0], l = [0, t + 1, 0, 0], a && (a = !1, f = {
      type: "tableBody",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", f, n]])), i = g.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = !1, l[2] === 0 && (o[1] !== 0 && (l[0] = l[1], c = ln(p, n, o, i, void 0, c), o = [0, 0, 0, 0]), l[2] = t)) : g.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (l[0] = l[1], c = ln(p, n, o, i, void 0, c)), o = l, l = [o[1], t, 0, 0])) : g.type === "tableHead" ? (a = !0, s = t) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (s = t, o[1] !== 0 ? (l[0] = l[1], c = ln(p, n, o, i, t, c)) : l[1] !== 0 && (c = ln(p, n, l, i, t, c)), i = 0) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (l[3] = t);
  }
  for (s !== 0 && yr(p, n, s, u, f), p.consume(n.events), t = -1; ++t < n.events.length; ) {
    const h = n.events[t];
    h[0] === "enter" && h[1].type === "table" && (h[1]._align = Sh(n.events, t));
  }
  return e;
}
function ln(e, n, t, r, i, o) {
  const l = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  t[0] !== 0 && (o.end = Object.assign({}, _e(n.events, t[0])), e.add(t[0], 0, [["exit", o, n]]));
  const s = _e(n.events, t[1]);
  if (o = {
    type: l,
    start: Object.assign({}, s),
    // Note: correct end is set later.
    end: Object.assign({}, s)
  }, e.add(t[1], 0, [["enter", o, n]]), t[2] !== 0) {
    const u = _e(n.events, t[2]), f = _e(n.events, t[3]), c = {
      type: a,
      start: Object.assign({}, u),
      end: Object.assign({}, f)
    };
    if (e.add(t[2], 0, [["enter", c, n]]), r !== 2) {
      const p = n.events[t[2]], h = n.events[t[3]];
      if (p[1].end = Object.assign({}, h[1].end), p[1].type = "chunkText", p[1].contentType = "text", t[3] > t[2] + 1) {
        const g = t[2] + 1, x = t[3] - t[2] - 1;
        e.add(g, x, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", c, n]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, _e(n.events, i)), e.add(i, 0, [["exit", o, n]]), o = void 0), o;
}
function yr(e, n, t, r, i) {
  const o = [], l = _e(n.events, t);
  i && (i.end = Object.assign({}, l), o.push(["exit", i, n])), r.end = Object.assign({}, l), o.push(["exit", r, n]), e.add(t + 1, 0, o);
}
function _e(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Ah = {
  name: "tasklistCheck",
  tokenize: vh
};
function Th() {
  return {
    text: {
      91: Ah
    }
  };
}
function vh(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), o)
    );
  }
  function o(s) {
    return Y(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), l) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), l) : t(s);
  }
  function l(s) {
    return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : t(s);
  }
  function a(s) {
    return z(s) ? n(s) : M(s) ? e.check({
      tokenize: Ph
    }, n, t)(s) : t(s);
  }
}
function Ph(e, n, t) {
  return B(e, r, "whitespace");
  function r(i) {
    return i === null ? t(i) : n(i);
  }
}
function zh(e) {
  return Nr([
    nh(),
    fh(),
    xh(e),
    Ch(),
    Th()
  ]);
}
const Lh = {};
function Dh(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || Lh, r = n.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), l = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(zh(t)), o.push(Kf()), l.push(Jf(t));
}
function Fh({ slide: e }) {
  return /* @__PURE__ */ be("div", { className: "slide", children: [
    /* @__PURE__ */ U("h2", { className: "slide__title", children: e.title }),
    /* @__PURE__ */ U("div", { className: "slide__body", children: /* @__PURE__ */ U(kc, { remarkPlugins: [Dh], children: e.body }) })
  ] });
}
const hn = 1920, Jn = 1080, Pi = 1120, _h = hn - Pi;
function Rh() {
  const [e, n] = et(1);
  return kr(() => {
    const t = () => n(Math.min(window.innerWidth / hn, window.innerHeight / Jn));
    return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
  }, []), e;
}
function Kh({ course: e, getScene: n, audioBase: t }) {
  const r = Rh(), i = e.sections, [o, l] = et({ section: 0, beat: 0 }), a = i[o.section], s = a ? n(a.scene) : void 0, u = Re(
    () => a ? Ml(i, o) : null,
    [i, o, a]
  ), f = Re(() => a ? Ol(a) : [], [a]), c = a ? `${t}/${a.id}-${o.beat}.wav` : void 0, { toggle: p, stop: h } = oo(
    c,
    () => l((g) => {
      const x = bn(i, g, 1);
      return x.section === g.section && x.beat === g.beat && h(), x;
    })
  );
  return kr(() => {
    const g = (x) => {
      i.length && (x.key === "ArrowRight" ? l((S) => bn(i, S, 1)) : x.key === "ArrowLeft" ? l((S) => bn(i, S, -1)) : x.key === " " && (x.preventDefault(), p()));
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }), a ? /* @__PURE__ */ U("div", { className: "rp-root", children: /* @__PURE__ */ U("div", { style: { width: hn * r, height: Jn * r }, children: /* @__PURE__ */ be(
    "div",
    {
      className: "rp-stage",
      style: {
        width: hn,
        height: Jn,
        transform: `scale(${r})`,
        transformOrigin: "top left"
      },
      children: [
        /* @__PURE__ */ U("div", { className: "rp-scene-pane", style: { width: Pi }, children: s && /* @__PURE__ */ U(lo, { scene: s, reveal: u, focus: f }) }),
        /* @__PURE__ */ U("div", { className: "rp-slide-pane", style: { width: _h }, children: /* @__PURE__ */ U(Fh, { slide: a.slide }) })
      ]
    }
  ) }) }) : null;
}
export {
  Uh as BLUE,
  Bn as EDGE,
  xr as GRAY,
  qh as GREEN,
  Vh as ORANGE,
  Wh as PURPLE,
  Xh as RED,
  Kh as RevealPlayer,
  lo as SceneViewer,
  Fh as SlidePane,
  Yh as TEAL,
  Gh as YELLOW,
  jh as container,
  pn as edgeKey,
  zl as getIcon,
  $h as group,
  Dl as resolveGrid,
  _l as revealAt,
  Ml as revealForPosition,
  Nl as sceneNodeIds,
  Rl as sceneRunStart,
  bn as step,
  an as tracks,
  oo as useNarration,
  Qh as validateCourse,
  Hh as wgrid
};
