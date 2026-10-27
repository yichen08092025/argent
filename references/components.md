# Components

The library is a vocabulary, not a menu. Every component has one job, one geometry and a known set of states. The class prefix is ag- (Argent). The source is assets/argent.css; the visual specimens are in examples/lab.

## The state model

| state | how it is expressed |
| --- | --- |
| rest | neutral surface, ink text |
| hover | ink wash 5.5% (7% dark) |
| open / focus | wash 8.5–10%, 2 px focus ring, 2 px offset |
| pressed | wash 12%, scale 0.97 |
| selected | raised thumb or solid ink fill |
| disabled | 42% opacity, no pointer events |
| loading | same width, hidden label, spinner |
| error | semantic red ink, inline message, 3 px soft ring |
| empty | explanation + one next action |
| dirty | a dot or a quiet label; never an alarm |

A component is not done until the states that apply to it are designed. Buttons need rest/hover/focus/pressed/disabled/loading. Fields need rest/hover/focus/filled/error/disabled/read-only. Tables need empty/loading/sorted/selected. Overlays need open/closed and Escape.

## Buttons

Anatomy: height 28 / 34 / 40; horizontal padding 9 / 13 / 17; icon 13 / 15 / 17; gap 5 / 7 / 8; radius 6 / 8 / 10; font 11.5 / 12.5 / 13.5 with weight 600.

| variant | fill | label | when |
| --- | --- | --- | --- |
| primary | brand ink | on-brand | the one commitment on the surface |
| secondary | raised surface + hairline | ink | the safe alternative |
| quiet | transparent | ink-2 | tertiary actions, cancel |
| danger | danger ink | white (dark ink in dark) | irreversible |
| danger-quiet | transparent | danger ink | a dangerous secondary |
| icon | same as secondary/quiet | icon only | toolbars, rows |
| link | transparent | brand | navigation, not an action |

Rules: one primary per surface; never two primaries in a toolbar; a split button is one intent with a smaller path; a group is for siblings; a loading button keeps its width.

## Fields

Anatomy: label 12/500 above; control 34; padding 0 10; radius 8; help 11 below; error 11 in danger ink; focus ring 3 px.

| field | notes |
| --- | --- |
| text / email / password | 34 px; password has a visibility toggle |
| textarea | min 92, resize vertical, same border/focus |
| select | native select with a custom chevron; one affordance |
| search | leading icon, optional clear, optional ⌘K hint |
| number | stepper buttons + mono input |
| checkbox / radio | native input, 16 px, custom check; label is the hit target |
| switch | 36 × 20, 16 knob; off is ink 11%, on is brand |
| slider | 4 px rail, accent fill, 14 px paper thumb |
| tags | 24 px chips with remove buttons |
| dropzone | dashed, one action, one file-type sentence |

Native semantics first. If you replace a control, keep the input, label, focus and keyboard behavior. Validation: inline first, summary second; error text names the fix; success is quiet; disabled is not an error.

## Navigation

| component | use | spec |
| --- | --- | --- |
| top bar | persistent frame | 56; brand + nav + search + theme + avatar |
| rail | destinations | 208–248; 34 items; 22 group gap |
| tabs (pill) | sibling views inside a panel | 32 track, 28 items, 999 radius, pill glides |
| tabs (underline) | page-level views | 38, 2 px active underline |
| vertical tabs | settings | 34 items, left aligned |
| segmented | quick mode | 32–36 track, 28–32 items, raised thumb |
| breadcrumb | depth | 12 px, chevron 12, current ink |
| pagination | volume | 28 px buttons, active ink |
| stepper | progress | 24 marker, 1 px connector |
| menu | actions | 32 rows, 14 icons, shortcut right |
| command palette | intent | 580, 14 input, 36 rows, ⌘K |

Tabs and segments move one active thing. Do not use both for the same level. A tab is a view; a segment is a mode. A breadcrumb is not navigation for siblings; it is depth.

## Feedback

| component | use | rules |
| --- | --- | --- |
| banner | persistent page-level status | inline action; dismissible only if dismissible |
| toast | completed action | no decision, auto-dismiss 3–5 s |
| progress | known length | 4 px; percentage tabular |
| spinner | unknown, short | 16/24; last resort |
| skeleton | unknown, structural | preserve the shape; shimmer only when stable |
| empty | no data | why + one next action |
| error | failed load/action | what failed + what to do |
| save state | dirty/saving/saved | quiet check or dot; never a celebration |
| undo | reversible action | inline in the toast; 5–8 s |

Colour is status: success green, warning amber, danger red, info blue. Never a coloured card for a neutral hint.

## Data

| component | use | spec |
| --- | --- | --- |
| table | comparable rows | header 34, row 44 (38 compact), cell 12 px, checkbox 15 |
| list | non-comparable rows | 12/14 padding, avatar + copy + meta |
| stat | one number + change | 13/14 padding, value 22–26, delta mono |
| key–value | one object | 110 label + 1fr value, 8/16 gaps |
| timeline | order matters | 11 dot, 1 px rail, title + time |
| badge | status | 21 high, 10.5/600, dot optional |
| chip | filter | 28 high, pill, on = ink |
| avatar | identity | 24/30/40 circle, initials |
| chart | shape of a series | 2 px line, soft area, dotted comparison, 9 px axis |

Rows are the unit of selection. The bulk bar names the count and exceptions. Empty and loading states keep the column geometry. Tables scroll inside their wrapper; the page never scrolls sideways.

## Overlays

| component | when | rule |
| --- | --- | --- |
| tooltip | short explanation | hover/focus only; no action |
| popover | small choice | click; close on outside/Escape |
| menu | actions | sections, shortcuts, one danger at the end |
| dialog | decision/task | one primary, one quiet exit, consequence first |
| sheet | context/detail | right side, 420 max, returns scroll |
| command palette | whole-product search | ⌘K, arrow keys, Enter |
| context menu | row/object actions | same menu grammar; no new styles |

Dialogs dim, they do not blur. Focus is trapped and returns. Every overlay has one escape path: Escape, a visible close, or click-outside.

## Accessibility

- Tabs: role tablist/tab, aria-selected, aria-controls, roving tabindex.
- Segments: same as tabs, plus aria-pressed in a toggle group.
- Switches: role switch + aria-checked; native checkbox under the skin.
- Sliders: native range, real label, aria-valuetext when the unit matters.
- Icon buttons: aria-label; decorative SVG aria-hidden.
- Focus: 2 px ring, 2 px offset; never remove it.
- Contrast: 4.5:1 for meaningful text; 3:1 for large.
- Motion: respect prefers-reduced-motion; no autoplay shimmer when reduced.
- Errors: inline + summary; announced with aria-live if dynamic.

## Component checklist

- [ ] Does it have the states that apply, not just rest?
- [ ] Does it use the 4 px spacing scale?
- [ ] Is the hit target at least 30 px (44 on floating islands)?
- [ ] Is the label a sentence a person would say?
- [ ] Does it keep native semantics?
- [ ] Does it return focus after closing?
- [ ] Does it survive dark mode and compact density?
- [ ] Does it have an empty/loading/error path if it fetches?
