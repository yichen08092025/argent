# Foundations

The material is silver and graphite. The structure is a ruler. The behaviour is quiet. Everything else is composition.

## Colour

Two appearances, one structure. The chrome is neutral in both; colour is reserved for state, data and brand injection.

| role | Soft Silver | Graphite |
| --- | --- | --- |
| bg | #E8E9EB | #08090A |
| surface | #FCFCFD | #111214 |
| raised | #FFFFFF | #16171A |
| sunken | #F3F4F6 | #0C0D0F |
| ink | #14161A | #F4F4F6 |
| ink-2 | #555A61 | #A6A9AF |
| ink-3 | #6F747B | #8A8D94 |
| accent / brand | #17191E | #F4F4F6 |
| on-accent | #FFFFFF | #121316 |
| fill | ink 4% | ink 4.5% |
| hairline | ink 6% | ink 6% |
| line | ink 8.5% | ink 8.5% |
| live | #E5484D | same |
| success | #2F7D4F | #7BC79A |
| warning | #956200 | #E2B35E |
| danger | #C3403A | #FF8A84 |
| info | #2F5F9E | #8FB8EF |

Semantic colours are status, never decoration. Brand is an injected token: Graphite is the default; Cobalt, Moss and Clay are examples. The rest of the system does not change when the brand does.

**Contrast**: meaningful copy ≥ 4.5:1; large ≥ 3:1. ink-3 is calibrated for 11–12 px helper text. Do not use opacity on text instead of a token.

## Type

One UI family: Alibaba PuHuiTi 3.0, then PingFang SC / SF Pro Text / system sans. One display family for editorial moments: Iowan Old Style / Palatino / Songti. One mono family for specs and data: SF Mono / JetBrains Mono / Menlo.

| role | size / line | weight | use |
| --- | --- | --- | --- |
| display | 48–94 / 0.96 | 400 serif | manual hero, editorial |
| h1 | 28–30 / 1.12 | 600 | page title |
| h2 | 22 / 1.25 | 600 | section |
| h3 | 16 / 1.3 | 600 | panel, card |
| body | 14 / 1.55 | 400 | default |
| action | 12.5 / 1.3 | 500–600 | buttons, tabs |
| label | 12 / 1.4 | 400–500 | fields, rows |
| caption | 11 / 1.4 | 400–500 | helper |
| micro | 10 / 1.3 | 500 | ruler, badges, axes |
| mono | 10–11 / 1.5 | 400 | timecode, values, specs |

Rules: no weight above 600; no chrome below 10; tabular numbers everywhere; letter-spacing 0 for UI, −0.03em for titles, +0.14em for uppercase eyebrows (Latin only). Never set a paragraph in the mono face.

## Space

4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96. Four is the half-step; eight is the base. Labels 4–8, controls 12–16, groups 24–32, sections 48–64.

## Radius

4 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 999.

- 6–10: controls, inputs, small buttons.
- 12–16: cards, panels, tables.
- 18–24: islands, dialogs, sheets.
- 999: pills, chips, switches.

Radius communicates nesting: a control inside a card is smaller than the card; an island is larger than the tile inside it.

## Elevation

| step | use | recipe |
| --- | --- | --- |
| 0 | dock, card | flat + hairline |
| 1 | rest, raised card | 0 1 1 / 0 2 6 |
| 2 | island, popover | contact + 9 18 + 22 44 |
| 3 | dialog, command palette | 2 4 + 18 40 + 48 80 |

In dark, shadows are black, not grey. Never a coloured glow on a neutral surface.

## Motion

- Hover 150 ms ease-out; press 140 ms, scale 0.97; settle 320–380 ms cubic-bezier(.22,.8,.2,1).
- No overshoot. No bounce. No layout animation if transform can do the job.
- Panel swaps crossfade; the incoming content drifts 14 px from the chosen side.
- The island enters with a 260 ms fade + 8–10 px rise + 0.975 scale.
- Reduced motion: remove travel and spring; keep opacity and a light press.

## Icons

18 × 18 grid, 1.6 px stroke, round caps and joins, open silhouettes. 14–17 px in controls, 20 px in empty states, 12–14 px in dense rows. Icon-only controls always have a tooltip and an aria-label.

## Density

Compact: top bar 50, rail 208, control 30, row 38, panel inset 16. Comfortable: 56, 232, 34, 44, 20. Type size does not change. Density is a preference, not a second design.

## Brand injection

~~~css
:root { --ag-brand: #2456c7; --ag-brand-ink: #fff; --ag-brand-soft: rgba(36,86,199,.1); }
[data-brand="moss"] { --ag-brand: #3f6b4a; --ag-brand-ink: #fff; }
~~~

The brand changes primary buttons, links and the selection tint. It does not change the dock, the ink accent for selected tabs, or the semantic colours. One accent, one place.

## Name

**Argent** means silver. It is the metal that reflects without shouting: a surface for the work, not a costume for it. The name is deliberately domain-neutral; the system is not a recorder.
