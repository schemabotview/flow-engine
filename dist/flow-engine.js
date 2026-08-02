import { Key as U, GitBranch as Z, Table as j, Terminal as V, ScrollText as q, Box as J, ShieldCheck as Q, Users as ee, KeyRound as te, Layers as ne, Clock as oe, Workflow as se, MemoryStick as ie, HardDrive as ce, Server as re, AppWindow as ae, Share2 as le, Webhook as de, Plug as ue, Copy as he, DownloadCloud as fe, Network as me, Radio as ge, Cloud as pe, File as be, Zap as ye, Image as we, Braces as ke, Waves as xe, Cpu as Ee, Cog as Ne, Filter as Se, Brain as _e, FileBarChart as Me, BarChart3 as Ae, Database as $e } from "lucide-react";
import { jsx as d, jsxs as y, Fragment as F } from "react/jsx-runtime";
import { useMemo as N, useRef as $, useState as R, useEffect as P, useLayoutEffect as O } from "react";
import { MarkerType as ve, Handle as B, Position as w, useInternalNode as T, useStore as Le, getSmoothStepPath as ze, getBezierPath as Ce, BaseEdge as Re, EdgeLabelRenderer as Pe, ReactFlow as Be } from "@xyflow/react";
const gt = (t, e) => ({ ...t, kind: "container", cell: [0, 0], layout: e.grid, children: e.nodes }), pt = (t, e) => ({
  id: t,
  label: "",
  kind: "group",
  cell: [0, 0],
  layout: e.grid,
  children: e.nodes
}), bt = (t, e) => ({
  grid: t,
  nodes: e.map(({ node: o, at: n }) => ({ ...o, cell: n }))
}), yt = "#5b8cff", wt = "#37d39a", kt = "#ff7a59", xt = "#b98bff", Et = "#3fd0d6", Nt = "#ff5d6c", G = "#9aa3b2", St = "#d9b84a", L = "#5b6270", Te = {
  database: $e,
  barChart: Ae,
  report: Me,
  brain: _e,
  funnel: Se,
  gears: Ne,
  engine: Ee,
  lake: xe,
  json: ke,
  image: we,
  streaming: ye,
  file: be,
  cloud: pe,
  stream: ge,
  federation: me,
  autoload: fe,
  copy: he,
  plug: ue,
  api: de,
  share: le,
  app: ae,
  server: re,
  disk: ce,
  memory: ie,
  workflow: se,
  clock: oe,
  layers: ne,
  key: te,
  users: ee,
  shield: Q,
  box: J,
  scroll: q,
  terminal: V,
  table: j,
  branch: Z,
  surrogateKey: U
}, We = (t) => t ? Te[t] : void 0, Ie = 6;
function De(t, e, o) {
  const n = {};
  return K(t, e, { x: 0, y: 0, w: o.width, h: o.height }, n), n;
}
const S = (t) => Array.isArray(t) ? t : Array.from({ length: t }, () => 1), z = (t) => t.reduce((e, o) => e + o, 0), Fe = (t) => t.reduce((e, o) => [...e, e[e.length - 1] + o], [0]);
function W(t, e, o, n) {
  const s = z(t) + 2 * n + (t.length - 1) * o, i = e / s, r = t.map((a) => a * i);
  return { unit: i, sizes: r, before: Fe(r) };
}
function K(t, e, o, n) {
  var g;
  const { gap: s = 0.2, padding: i = 0.4 } = e, r = W(S(e.cols), o.w, s, i), a = W(S(e.rows), o.h, s, i), l = r.unit * s, c = a.unit * s, u = r.unit * i, h = a.unit * i;
  for (const f of t) {
    const [m, b, x = 1, E = 1] = f.cell, p = {
      x: o.x + u + r.before[m] + m * l,
      y: o.y + h + a.before[b] + b * c,
      w: z(r.sizes.slice(m, m + x)) + (x - 1) * l,
      h: z(a.sizes.slice(b, b + E)) + (E - 1) * c
    };
    if (n[f.id] = p, (g = f.children) != null && g.length && f.layout) {
      const k = f.kind === "container" ? Ie : 0, A = { x: p.x + k, y: p.y + k, w: p.w - 2 * k, h: p.h - 2 * k };
      K(f.children, f.layout, A, n);
    }
  }
}
const M = (t, e) => `${t}->${e}`;
function Oe(t, e) {
  const o = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
  let i = null;
  const r = Math.min(e, t.length - 1);
  for (let l = 0; l <= r; l++)
    for (const c of t[l].delta)
      switch (c.kind) {
        case "solidify":
          for (const u of c.ids) o.add(u);
          break;
        case "draw":
          for (const [u, h] of c.edges) n.add(M(u, h));
          break;
        case "annotate":
          s.set(c.id, c.value);
          break;
        case "pan":
          i = c.to;
          break;
      }
  const a = /* @__PURE__ */ new Set();
  if (r >= 0) {
    for (const l of t[r].delta)
      if (l.kind === "pulse") for (const c of l.ids) a.add(c);
  }
  return { nodes: o, edges: n, annotations: s, pulse: a, camera: i };
}
function Ge(t, e) {
  let o = e;
  for (; o > 0 && t[o - 1].scene === t[e].scene; ) o--;
  return o;
}
function Ke(t, e) {
  const o = Ge(t, e.section), n = [];
  for (let s = o; s < e.section; s++) n.push(...t[s].beats);
  return n.push(...t[e.section].beats.slice(0, e.beat + 1)), Oe(n, n.length - 1);
}
function v(t, e, o) {
  const n = e.beat + o;
  return n >= 0 && n < t[e.section].beats.length ? { section: e.section, beat: n } : o > 0 && e.section < t.length - 1 ? { section: e.section + 1, beat: 0 } : o < 0 && e.section > 0 ? { section: e.section - 1, beat: t[e.section - 1].beats.length - 1 } : e;
}
function Ye(t) {
  const e = /* @__PURE__ */ new Set(), o = (n) => {
    var s;
    for (const i of n)
      e.add(i.id), (s = i.children) != null && s.length && o(i.children);
  };
  return o(t.nodes), e;
}
function He(t) {
  return new Set(t.edges.map((e) => M(e.from, e.to)));
}
function Xe(t) {
  switch (t.kind) {
    case "solidify":
    case "pulse":
      return t.ids;
    case "annotate":
      return [t.id];
    case "pan":
      return [t.to];
    case "draw":
      return t.edges.flat();
  }
}
function _t(t, e) {
  const o = [];
  return t.forEach((n, s) => {
    const i = `§${s + 1} "${n.id}"`, r = e(n.scene);
    if (!r) {
      o.push(`${i}: references unknown scene "${n.scene}"`);
      return;
    }
    const a = Ye(r), l = He(r);
    n.beats.forEach((c, u) => {
      for (const h of c.delta) {
        for (const g of Xe(h))
          a.has(g) || o.push(`${i} beat ${u}: ${h.kind} id "${g}" is not a node in scene "${n.scene}"`);
        if (h.kind === "draw")
          for (const [g, f] of h.edges)
            l.has(M(g, f)) || o.push(`${i} beat ${u}: draw ${g}->${f} has no matching edge in scene "${n.scene}"`);
      }
    });
  }), o;
}
const Ue = (t) => S(t.grid.cols).length > S(t.grid.rows).length ? "horizontal" : "vertical";
function Y(t) {
  var o;
  const e = [];
  for (const n of t)
    e.push(n), (o = n.children) != null && o.length && e.push(...Y(n.children));
  return e;
}
function Ze(t, e, o, n) {
  return Y(t.nodes).map((s) => {
    const i = e[s.id];
    return {
      id: s.id,
      type: "scene",
      position: { x: i.x, y: i.y },
      draggable: !1,
      selectable: !1,
      data: {
        label: s.label,
        sub: s.sub,
        type: s.type,
        icon: s.icon,
        iconInline: s.iconInline,
        mono: s.mono,
        color: s.color ?? G,
        kind: s.kind ?? "symbol",
        direction: o,
        width: i.w,
        height: i.h,
        ghosted: n ? !n.has(s.id) : !1
      }
    };
  });
}
function je(t, e, o) {
  return t.edges.map((n, s) => {
    const i = !e || e.has(n.from) && e.has(n.to) || ((o == null ? void 0 : o.has(M(n.from, n.to))) ?? !1);
    return {
      id: `${n.from}-${n.to}-${s}`,
      source: n.from,
      target: n.to,
      type: "flow",
      data: { color: L, animated: n.animated, label: n.label, ghosted: !i },
      markerEnd: { type: ve.ArrowClosed, color: L }
    };
  });
}
function Ve(t, e, o, n) {
  if (n === "term") {
    const c = Math.max(1, t.replace(/\s+/g, " ").trim().length), u = Math.max(e - 4, 6) / (c * 0.72), h = Math.max(o - 4, 6) / 1.2;
    return Math.max(4, Math.min(u, h, 22));
  }
  const s = t.split(/\s+/).filter(Boolean), i = Math.max(1, ...s.map((c) => c.length)), r = Math.max(e - 20, 8) / (i * 0.72), a = s.length > 1 ? 2 : 1, l = Math.max(o - 18, 8) / (a * 1.25);
  return Math.max(7, Math.min(r, l, 22));
}
function qe(t, e) {
  const n = Math.max(e - 8, 6) / (Math.max(t.length, 1) * 0.86);
  return Math.max(4, Math.min(n, 16));
}
function Je(t, e = 2) {
  const o = t.replace(/[^a-zA-Z0-9]/g, "");
  return o ? o.charAt(0).toUpperCase() + o.slice(1, e).toLowerCase() : "";
}
function H({ data: t }) {
  const e = t;
  if (e.kind === "group")
    return /* @__PURE__ */ d("div", { className: "scene-node scene-node--group", style: { width: e.width, height: e.height } });
  const o = e.ghosted ? " scene-node--ghost" : "", n = e.direction === "horizontal", s = e.kind === "container", i = e.kind === "symbol" && !!e.mono, r = e.kind === "symbol" || s ? We(e.icon) : void 0, a = Math.max(18, Math.min(Math.min(e.width, e.height) * 0.4, 48)), l = !!((r || i) && e.iconInline), c = e.kind === "term" && !!e.type, u = l ? Math.max(24, e.width - a - 12) : c ? Math.max(24, e.width * 0.6) : e.width, h = s ? qe(e.label, e.width) : Ve(e.label, u, e.height, e.kind);
  return /* @__PURE__ */ y(
    "div",
    {
      className: `scene-node scene-node--${e.kind}${i ? " scene-node--mono" : ""}${l ? " scene-node--iconh" : ""}${o}`,
      style: { width: e.width, height: e.height, "--node-color": e.color },
      children: [
        /* @__PURE__ */ d(B, { type: "target", position: n ? w.Left : w.Top, className: "scene-handle", isConnectable: !1 }),
        s ? /* @__PURE__ */ y("span", { className: "scene-node__title", style: { fontSize: h }, children: [
          r && /* @__PURE__ */ d(r, { className: "scene-node__title-icon", size: Math.round(h * 1.25), strokeWidth: 1.75 }),
          e.label
        ] }) : /* @__PURE__ */ y(F, { children: [
          i ? /* @__PURE__ */ d("span", { className: "scene-node__mono", style: { width: a, height: a, fontSize: a * 0.42 }, children: r ? /* @__PURE__ */ d(r, { size: a * 0.6, strokeWidth: 2 }) : Je(e.label) }) : r && /* @__PURE__ */ d(r, { className: "scene-node__icon", size: a, strokeWidth: 1.75 }),
          c ? /* @__PURE__ */ y("span", { className: "scene-node__row", children: [
            /* @__PURE__ */ d("span", { className: "scene-node__label", style: { fontSize: h }, children: e.label }),
            /* @__PURE__ */ d("span", { className: "scene-node__type", style: { fontSize: h * 0.82 }, children: e.type })
          ] }) : /* @__PURE__ */ d("span", { className: "scene-node__label", style: { fontSize: h }, children: e.label }),
          e.sub && /* @__PURE__ */ d("span", { className: "scene-node__sub", children: e.sub })
        ] }),
        /* @__PURE__ */ d(B, { type: "source", position: n ? w.Right : w.Bottom, className: "scene-handle", isConnectable: !1 })
      ]
    }
  );
}
H.defaultColor = G;
const Qe = 16, et = 8, tt = 16, nt = (t) => Math.max(et, Math.min(tt, Qe * t));
function I(t, e) {
  const o = (t.measured.width ?? 0) / 2, n = (t.measured.height ?? 0) / 2, s = t.internals.positionAbsolute.x + o, i = t.internals.positionAbsolute.y + n, r = e.internals.positionAbsolute.x + (e.measured.width ?? 0) / 2, a = e.internals.positionAbsolute.y + (e.measured.height ?? 0) / 2, l = (r - s) / (2 * o) - (a - i) / (2 * n), c = (r - s) / (2 * o) + (a - i) / (2 * n), u = 1 / (Math.abs(l) + Math.abs(c) || 1);
  return { x: o * (u * l + u * c) + s, y: n * (-u * l + u * c) + i };
}
function D(t, e) {
  const o = t.internals.positionAbsolute.x, n = t.internals.positionAbsolute.y, s = t.measured.width ?? 0;
  return e.x <= o + 1 ? w.Left : e.x >= o + s - 1 ? w.Right : e.y <= n + 1 ? w.Top : w.Bottom;
}
function ot({ id: t, source: e, target: o, data: n, markerEnd: s }) {
  const i = T(e), r = T(o), a = Le((A) => A.transform[2]);
  if (!(i != null && i.measured.width) || !(r != null && r.measured.width)) return null;
  const l = I(i, r), c = I(r, i), u = D(i, l), h = D(r, c), g = { sourceX: l.x, sourceY: l.y, targetX: c.x, targetY: c.y, sourcePosition: u, targetPosition: h }, [f, m, b] = u === h ? ze({ ...g, borderRadius: 14, offset: 24 }) : Ce(g), x = (n == null ? void 0 : n.color) ?? L, E = n == null ? void 0 : n.label, p = (n == null ? void 0 : n.ghosted) === !0, k = (n == null ? void 0 : n.animated) !== !1 && !p;
  return /* @__PURE__ */ y(F, { children: [
    /* @__PURE__ */ d(
      Re,
      {
        id: t,
        path: f,
        markerEnd: p ? void 0 : s,
        style: {
          stroke: x,
          strokeWidth: 1.75,
          opacity: p ? 0.14 : 0.6,
          strokeDasharray: p ? "5 5" : void 0
        }
      }
    ),
    k && /* @__PURE__ */ d("circle", { r: 3, fill: x, opacity: 0.85, children: /* @__PURE__ */ d("animateMotion", { dur: "2.4s", repeatCount: "indefinite", path: f }) }),
    E && !p && /* @__PURE__ */ d(Pe, { children: /* @__PURE__ */ d(
      "div",
      {
        className: "scene-edge-label",
        style: { transform: `translate(-50%, -50%) translate(${m}px, ${b}px)`, fontSize: `${nt(a)}px` },
        children: E
      }
    ) })
  ] });
}
const st = { scene: H }, it = { flow: ot };
function ct({ scene: t, reveal: e = null }) {
  const o = Ue(t), n = N(() => De(t.nodes, t.grid, t.canvas), [t]), s = N(
    () => Ze(t, n, o, (e == null ? void 0 : e.nodes) ?? null),
    [t, n, o, e]
  ), i = N(
    () => je(t, (e == null ? void 0 : e.nodes) ?? null, (e == null ? void 0 : e.edges) ?? null),
    [t, e]
  );
  return /* @__PURE__ */ d("div", { className: "scene-flow", children: /* @__PURE__ */ d(
    Be,
    {
      nodes: s,
      edges: i,
      nodeTypes: st,
      edgeTypes: it,
      proOptions: { hideAttribution: !0 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !1,
      fitView: !0,
      fitViewOptions: { padding: 0.12 },
      panOnDrag: !0,
      zoomOnScroll: !0,
      zoomOnDoubleClick: !1,
      minZoom: 0.2,
      maxZoom: 8
    }
  ) });
}
function rt(t, e) {
  const o = $(null), n = $(e);
  n.current = e;
  const [s, i] = R(!1), r = $(s);
  return r.current = s, P(() => {
    const c = new Audio();
    return c.addEventListener("ended", () => n.current()), o.current = c, () => c.pause();
  }, []), P(() => {
    const c = o.current;
    c && (c.pause(), t ? (c.src = t, c.currentTime = 0, r.current && c.play().catch(() => {
    })) : (c.removeAttribute("src"), c.load()));
  }, [t]), { playing: s, toggle: () => {
    const c = o.current;
    !c || !c.getAttribute("src") || (r.current ? (c.pause(), i(!1)) : (c.play().catch(() => {
    }), i(!0)));
  }, stop: () => {
    var c;
    (c = o.current) == null || c.pause(), i(!1);
  } };
}
function at({ slide: t }) {
  return /* @__PURE__ */ y("div", { className: "slide", children: [
    /* @__PURE__ */ d("h2", { className: "slide__title", children: t.title }),
    /* @__PURE__ */ d("ul", { className: "slide__list", children: t.bullets.map((e, o) => /* @__PURE__ */ y("li", { className: "slide__item", children: [
      /* @__PURE__ */ d("span", { className: "slide__bullet", children: "—" }),
      /* @__PURE__ */ d("span", { children: e })
    ] }, o)) })
  ] });
}
const _ = 1920, C = 1080, X = 1120, lt = _ - X;
function dt() {
  const [t, e] = R(1);
  return O(() => {
    const o = () => e(Math.min(window.innerWidth / _, window.innerHeight / C));
    return o(), window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, []), t;
}
function Mt({ course: t, getScene: e, audioBase: o }) {
  const n = dt(), s = t.sections, [i, r] = R({ section: 0, beat: 0 }), a = s[i.section], l = a ? e(a.scene) : void 0, c = N(
    () => a ? Ke(s, i) : null,
    [s, i, a]
  ), u = a ? `${o}/audio/${a.id}-${i.beat}.wav` : void 0, { toggle: h, stop: g } = rt(
    u,
    () => r((f) => {
      const m = v(s, f, 1);
      return m.section === f.section && m.beat === f.beat && g(), m;
    })
  );
  return O(() => {
    const f = (m) => {
      s.length && (m.key === "ArrowRight" ? r((b) => v(s, b, 1)) : m.key === "ArrowLeft" ? r((b) => v(s, b, -1)) : m.key === " " && (m.preventDefault(), h()));
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }), a ? /* @__PURE__ */ d("div", { className: "rp-root", children: /* @__PURE__ */ d("div", { style: { width: _ * n, height: C * n }, children: /* @__PURE__ */ y(
    "div",
    {
      className: "rp-stage",
      style: {
        width: _,
        height: C,
        transform: `scale(${n})`,
        transformOrigin: "top left"
      },
      children: [
        /* @__PURE__ */ d("div", { className: "rp-scene-pane", style: { width: X }, children: l && /* @__PURE__ */ d(ct, { scene: l, reveal: c }) }),
        /* @__PURE__ */ d("div", { className: "rp-slide-pane", style: { width: lt }, children: /* @__PURE__ */ d(at, { slide: a.slide }) })
      ]
    }
  ) }) }) : null;
}
export {
  yt as BLUE,
  L as EDGE,
  G as GRAY,
  wt as GREEN,
  kt as ORANGE,
  xt as PURPLE,
  Nt as RED,
  Mt as RevealPlayer,
  ct as SceneViewer,
  at as SlidePane,
  Et as TEAL,
  St as YELLOW,
  gt as container,
  M as edgeKey,
  We as getIcon,
  pt as group,
  De as resolveGrid,
  Oe as revealAt,
  Ke as revealForPosition,
  Ye as sceneNodeIds,
  Ge as sceneRunStart,
  v as step,
  S as tracks,
  rt as useNarration,
  _t as validateCourse,
  bt as wgrid
};
