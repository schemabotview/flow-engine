import { JSX } from 'react';
import { LucideIcon } from 'lucide-react';

/** A beat = one narration line + one reveal delta (a list of deltas fired together). */
export declare interface Beat {
    line: string;
    delta: RevealDelta[];
}

export declare const BLUE = "#5b8cff";

export declare interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
}

/** A titled box whose children lay out inside it (title rides the border). */
export declare const container: (meta: {
    id: string;
    label: string;
    color?: string;
}, inner: PatternResult) => SceneNodeSpec;

/**
 * One course = an ordered list of sections. A concept can have several courses (the
 * concept app holds a registry of them); `id` routes to it (#/<id>) and names its audio
 * directory, `title` shows in the index.
 */
export declare interface Course {
    id: string;
    title: string;
    sections: Section[];
}

/** Edges are calm and uniform — color semantics live in nodes, not arrows. */
export declare const EDGE = "#5b6270";

/** The edge key convention shared with sceneGraph's edge lookup. */
export declare const edgeKey: (from: string, to: string) => string;

export declare const getIcon: (name?: string) => LucideIcon | undefined;

export declare const GRAY = "#9aa3b2";

export declare const GREEN = "#37d39a";

/** An invisible arranger (no chrome) that only sub-lays out its children. */
export declare const group: (id: string, inner: PatternResult) => SceneNodeSpec;

/**
 * 'symbol'    = filled role-colored block: bold title (+ optional `sub` caption).
 * 'term'      = mono filled chip whose text IS the concept (an option/value).
 * 'code'      = an IDE-editor card: window chrome + line-number gutter + the `label`
 *               rendered as SYNTAX-HIGHLIGHTED source (a `sub` becomes a `# comment` line).
 * 'container' = titled box whose `children` lay out INSIDE it (title rides border).
 * 'group'     = invisible arranger: no chrome, only sub-lays out its `children`.
 */
export declare type NodeKind = 'symbol' | 'term' | 'code' | 'container' | 'group';

/** Convenience alias for a leaf/node before it's placed (cell defaults to [0,0]). */
export declare type NodeSeed = SceneNodeSpec;

export declare const ORANGE = "#ff7a59";

export declare interface PatternResult {
    grid: SceneGrid;
    nodes: SceneNodeSpec[];
}

export declare interface Position {
    section: number;
    beat: number;
}

export declare const PURPLE = "#b98bff";

export declare const RED = "#ff5d6c";

/** Resolve the scene tree into an id → absolute Box map (top-left origin). */
export declare function resolveGrid(nodes: SceneNodeSpec[], grid: SceneGrid, canvas: {
    width: number;
    height: number;
}): Record<string, Box>;

/**
 * Fold beats [0…index] into the reveal state. `index` is clamped to the beat range; an
 * index below 0 (before the first beat) yields the empty state (nothing revealed).
 */
export declare function revealAt(beats: Beat[], index: number): RevealState;

/**
 * The verb set — small and ADDITIVE (reveal only ever accumulates within a scene; there
 * are no un-reveal verbs).
 *  - solidify: fill in node id(s) — the dominant verb.
 *  - draw:     mark edge(s) drawn, as [from, to] pairs.
 *  - pulse:    momentary emphasis on node id(s) — applies to the CURRENT beat only.
 *  - annotate: show a runtime value on a node (state changing over time — the Trace tell).
 *  - pan:      move the camera to frame a node/group id.
 */
export declare type RevealDelta = {
    kind: 'solidify';
    ids: string[];
} | {
    kind: 'draw';
    edges: [string, string][];
} | {
    kind: 'pulse';
    ids: string[];
} | {
    kind: 'annotate';
    id: string;
    value: string;
} | {
    kind: 'pan';
    to: string;
};

/**
 * Fold every beat in the current scene-run up to (and including) `pos`. Earlier sections
 * in the run contribute all their beats; the current section contributes beats [0…beat].
 * A fresh run (scene just changed) folds only from its own start → the scene enters
 * ghosted. Pure function of position — paging back re-derives the exact partial reveal.
 */
export declare function revealForPosition(sections: Section[], pos: Position): RevealState;

export declare function RevealPlayer({ course, getScene, audioBase }: RevealPlayerProps): JSX.Element | null;

export declare interface RevealPlayerProps {
    course: Course;
    getScene: (id: string) => SceneSpec | undefined;
    /** Directory holding this course's clips; a clip resolves as
     *  `${audioBase}/<section-id>-<beatIndex>.wav`. A concept app typically passes
     *  `${import.meta.env.BASE_URL}audio/<courseId>` (per-course audio folder). */
    audioBase: string;
}

/** The folded reveal at a beat. `nodes`/`edges`/`annotations` ACCUMULATE across [0…i];
 *  `pulse` is momentary (beat i only); `camera` is the most recent pan (last wins). */
export declare interface RevealState {
    /** Solidified node ids — the ghost gate: anything NOT here renders ghosted. */
    nodes: Set<string>;
    /** Drawn edge keys `${from}->${to}`. */
    edges: Set<string>;
    /** node id → value to display (later annotate on the same id overwrites). */
    annotations: Map<string, string>;
    /** Node ids emphasised at THIS beat only (not accumulated). */
    pulse: Set<string>;
    /** Most recent pan target across [0…i], or null if never panned. */
    camera: string | null;
}

export declare interface SceneEdgeSpec {
    from: string;
    to: string;
    label?: string;
    /** Animate a slow dot along this edge as a gentle directional cue. Default true. */
    animated?: boolean;
}

export declare interface SceneGrid {
    /** Column tracks: a count `n` = n equal columns, or an array of relative weights. */
    cols: number | number[];
    /** Row tracks — same rule as `cols`. */
    rows: number | number[];
    /** Gap between tracks, in grid units (1 unit = one weight-1 track). Default 0.2. */
    gap?: number;
    /** Inner padding, in grid units. Default 0.4. */
    padding?: number;
}

/** Flatten every node id in a scene (the "valid set" — the scene enumerates its ids for
 *  free because ghost-and-solidify draws every element from the start). */
export declare function sceneNodeIds(scene: SceneSpec): Set<string>;

export declare interface SceneNodeSpec {
    id: string;
    label: string;
    /** [col, row, colSpan?, rowSpan?] within the PARENT's grid (scene grid at top level). */
    cell: [number, number, number?, number?];
    /** A semantic role color from `colors.ts` (driver=BLUE, compute=GREEN, …). */
    color?: string;
    kind?: NodeKind;
    /** Optional smaller caption under the label. */
    sub?: string;
    /** Optional data type / role tag for a `term` used as an ERD table row — rendered
     *  right-aligned and dimmed on the SAME line (e.g. `customer_key` … `int PK`). */
    type?: string;
    /** Optional icon name (see engine/icons, added later) for a `symbol` node. */
    icon?: string;
    /** Filename shown in the window-chrome tab of a `code` node (e.g. `query.py`). */
    filename?: string;
    /** Render the icon to the LEFT of the label (instead of above), for short-but-wide boxes. */
    iconInline?: boolean;
    /** Render a MONOGRAM badge instead of a lucide icon — the service-tile look. `symbol` only. */
    mono?: boolean;
    /** Inner grid for this node's `children`, resolved inside this node's box. */
    layout?: SceneGrid;
    /** Child nodes laid out inside this node's box via `layout`. */
    children?: SceneNodeSpec[];
}

/** First section index of the scene-run containing section `i`. */
export declare function sceneRunStart(sections: Section[], i: number): number;

export declare interface SceneSpec {
    id: string;
    title: string;
    grid: SceneGrid;
    nodes: SceneNodeSpec[];
    edges: SceneEdgeSpec[];
    /** Logical canvas the grid resolves into; aspect should match the grid so cells stay
     *  square. A later fitView scales it into the scene pane. */
    canvas: {
        width: number;
        height: number;
    };
}

export declare function SceneViewer({ scene, reveal, focus, fitMs, }: {
    scene: SceneSpec;
    reveal?: RevealState | null;
    focus?: string[];
    /** Camera fit animation ms. Capture passes 0 so a seeked frame opens already-framed. */
    fitMs?: number;
}): JSX.Element;

export declare interface Section {
    /** Slug — also the audio path stem: `audio/<id>-<beatIndex>.wav`. */
    id: string;
    heading: string;
    /** Scene id, resolved via the scene registry (scenes/index.ts). */
    scene: string;
    slide: Slide;
    /**
     * The per-section ordered beat list. A Map section has length 1 (the whole section is
     * one beat); a Trace section has length N (one beat per step). Beats reference the
     * scene's raw node ids — a scene may be ridden by many sections, each with its own beats.
     */
    beats: Beat[];
    /** Camera framing (per section) — wired in a later slice. */
    focus?: string | string[];
    highlight?: string[];
}

/** The right-pane slide — one per section, static across the section's beats. `body` is a
 *  curated, one-screen subset of Markdown (headings, lists, tables, bold, code) rendered by
 *  SlidePane via react-markdown + GFM — so authors write content, not per-element markup. */
export declare interface Slide {
    title: string;
    body: string;
}

export declare function SlidePane({ slide }: {
    slide: Slide;
}): JSX.Element;

/**
 * Step the cursor by ±1, rolling across section boundaries: past a section's last beat →
 * next section's first beat (and symmetrically for ←). Clamps at the course's very first
 * / last beat (returns the same position, so callers can detect the end).
 */
export declare function step(sections: Section[], pos: Position, delta: 1 | -1): Position;

export declare const TEAL = "#3fd0d6";

/** Normalize a grid dimension to per-track WEIGHTS: `n` → n equal tracks `[1,…]`;
 *  an array passes through as relative track sizes. */
export declare const tracks: (dim: number | number[]) => number[];

export declare function useNarration(src: string | undefined, onEnded: () => void): {
    playing: boolean;
    toggle: () => void;
    stop: () => void;
};

/**
 * Validate a course against the scene registry. Returns a list of human-readable errors
 * (empty = valid). Checks, per beat: (1) every referenced node id exists in the scene;
 * (2) every drawn edge matches a declared scene edge (else the draw is a silent no-op).
 */
export declare function validateCourse(sections: Section[], getScene: (id: string) => SceneSpec | undefined): string[];

/** A child placed in a weighted grid: the node plus its cell (`at` → `cell`). */
export declare interface WeightedSeed {
    node: SceneNodeSpec;
    at: SceneNodeSpec['cell'];
}

export declare type WeightedSpec = SceneGrid;

/** Pair a weighted grid with children carrying their placement in `at`. */
export declare const wgrid: (grid: WeightedSpec, children: WeightedSeed[]) => PatternResult;

export declare const YELLOW = "#d9b84a";

export { }
