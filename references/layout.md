# Space and layout

The layout is the system. Components are what you put in it.

Argent treats a screen as five kinds of space. The names matter because they decide the rhythm, the width, the material and the scroll owner.

## The five roles

| role | owns | default | scroll |
| --- | --- | --- | --- |
| Chrome | navigation and frame | 56 top bar, 232 rail, 30 tab bar | no |
| Primary | the work | all remaining width, 32–40 padding | yes, vertically |
| Secondary | context | 320–360 wide, 20 padding | yes, independently |
| Tertiary | temporary attention | 320–560 wide, 12/8/4 rhythm | usually no |
| Negative | separation | 4–96 | — |

### Chrome

Chrome is persistent, flat and quiet. It has one hairline seam, no radius, no shadow. The top bar is 56 px (50 compact); the rail is 208–248 px; the tab bar is 30–34 px. Chrome never uses the primary page rhythm and never carries a floating material.

### Primary

Primary is the reason the screen exists: a table, a chart, a canvas, a form, an article. It gets the largest share of width, the largest section gaps (24–32) and the page gutter (32–40). The scroll owner is the main region, not the document.

### Secondary

Secondary is context: an inspector, a detail pane, a filter column, a preview. It is narrower (320–360), tighter (20 px inset, 16 px section gap, 8 px control gap) and has its own scroll. It never inherits the 40 px page rhythm. If it needs the page rhythm, it is a page, not an inspector.

### Tertiary

Tertiary is borrowed attention: a popover, menu, dialog, sheet, command palette, toast. It is dense (12/8/4), floats above everything and must return focus and scroll to where it came from. It must never become a second page.

### Negative

Negative space is the material that separates groups. It is not leftover; it is the first grouping tool.

## Space budget

| relationship | gap |
| --- | --- |
| icon → label | 4–6 |
| label → control | 6–8 |
| control → help | 3–5 |
| control → control | 8–12 |
| field → field | 14–18 |
| group → group | 24–32 |
| section → section | 48–64 |
| page gutter | 56–72 |
| panel inset | 16–20 |
| compact panel inset | 12–14 |

Use a 4 px half-step and an 8 px base. Do not invent 7 or 13. A 1 px difference is noise; a 4 px difference is a decision.

## Sub-space

Two panels can share a screen without sharing a rhythm.

~~~text
primary: 32–40 padding · 24–32 sections · 14–16 controls
secondary: 20 padding · 16 sections · 8 controls
tertiary: 12 padding · 8 sections · 4 controls
~~~

- Primary has one dominant surface and one dominant void.
- Secondary has one job and a tighter rhythm; it is not a smaller primary.
- Tertiary has one decision and a dismiss path.

When a secondary panel gets wider than 400 px, it starts behaving like a split view. At that point: promote it to a real column with its own header, or collapse it into a sheet. Do not let it hover between the two.

## Negative space rules

1. **Group with distance first.** Adjacent related things sit closer than unrelated things.
2. **One dominant void.** Every screen has one largest empty area; that is where the eye rests.
3. **Do not fence everything.** If a border is removed and the grouping survives, remove the border.
4. **Space is not symmetric by default.** A page can have a large top margin and a tight control cluster; hierarchy is not a grid of equal gaps.
5. **Density is local.** A 44 px toolbar can sit above a 40 px section gap. The page can breathe while the tool is tight.
6. **The inspector is the counter-rhythm.** It is intentionally tighter; that is how it reads as secondary.
7. **No orphan gaps.** A gap belongs to one group. If it belongs to both, it is too large or the groups are one group.

### A quick test

Hide every border and divider. Can you still see the groups? If not, the space is wrong. If yes, the borders were decoration.

## Layout variants

### Docked app shell

~~~text
top bar 56
rail 232 | primary 1fr | inspector 320
~~~

Use for dashboards, admin, settings, data consoles. The rail is navigation; the inspector is context. The main region scrolls; the rail and inspector scroll independently.

### Split view

~~~text
primary 1fr | secondary 360–480
~~~

Use when the secondary is a real working surface: a detail editor, a preview, a compare pane. Give the secondary its own header. The split is a layout, not an overlay.

### Centered flow

~~~text
screen gutter | 560 card | screen gutter
~~~

Use for onboarding, import, checkout, a single decision. No rail, no inspector. The card owns the task; the page owns the air. The aside (if any) is editorial, not navigation.

### Canvas studio

~~~text
top bar | tool rail | stage + inspector | timeline
~~~

Use for editors and creative tools. The stage is the primary space; the inspector is secondary; the timeline is a second primary band. This is the original DogSC composition and remains a valid variant, not the default.

### Content page

~~~text
sidebar? | 720–820 reading column | air
~~~

Use for docs, policies, articles. The reading column is the primary surface; the rail is optional. A sticky table of contents is secondary.

## Page rhythm

~~~text
page padding 32–40
title 28–30 / sub 12
16 to the action row
24–32 to the first group
group: headline 13, rows 44, 14 radius
32–48 to the next section
64 before the footer
~~~

The title and the action row share a baseline. The first group starts closer than the next group; that is how the page says what belongs together.

## Responsive compression

| width | rail | inspector | padding | stat / card grid |
| --- | --- | --- | --- | --- |
| 1440 | 232 | 320 | 32–40 | 4 |
| 1180 | 208 | 320 | 28 | 2 |
| 980 | overlay | overlay | 20–24 | 1–2 |
| 760 | overlay | sheet | 16–20 | 1 |

Rules:

- Compress chrome and gaps before type. Never shrink a 12 px label to 9.
- Tables scroll inside their panel; the page never scrolls horizontally.
- At 980, the rail becomes a slide-over and the inspector becomes a sheet. Both need a visible trigger and Escape.
- At 760, the page actions wrap; the primary stays on the right or on its own row.
- Container queries are for embeds (a recorded page, a preview, a card). The shell uses the viewport.

## Density

Compact reduces row height (44 → 38), control height (34 → 30) and inset (20 → 16). It does not reduce type size. Density is a preference, not a second design.

## Layout checklist

- [ ] Can you name the five roles on this screen?
- [ ] Does secondary have a different rhythm from primary?
- [ ] Is there one dominant void?
- [ ] Are groups readable without dividers?
- [ ] Does the main region own the page scroll?
- [ ] Does the inspector own its own scroll?
- [ ] At 980, do the rail and inspector become overlays with triggers?
- [ ] Does the page avoid horizontal scroll at 1024 and 900?
