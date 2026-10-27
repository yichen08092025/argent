---
name: argent
description: 'Argent — a neutral UI/UX system for dense, desktop-grade web apps: app shells, primary/secondary/tertiary space, negative-space rules, surfaces (dock / island / card / tile / well), the full control set (buttons, fields, tabs, menus, dialogs, tables, empty / loading states), a state grammar, and calm motion. Use when designing or building any tool-like interface — dashboard, editor, admin, settings, onboarding, data table — or when reviewing layout, spacing, component states, UX patterns, or implementing the Argent library.'
---

# Argent

**Argent** (silver) is a neutral interface system for software that should feel like an instrument: quiet chrome, clear hierarchy, visible state, and space used as structure. It is not a theme or a product template. It is a set of decisions that can become a dashboard, a settings page, a wizard, an editor, or a data console.

The system was learned from the open-source **DogSC** recorder (MIT), then generalized. The docked studio shell, the floating island, the platinum accent, the narrow type ramp and the inspector rhythm are kept. The recorder-specific canvas, timeline and permissions are demoted to one worked example. The library is in assets/argent.css and assets/argent.js; the visual manual is examples/lab/index.html.

## Four layers

Design them in this order.

1. **Space** — chrome, primary work, secondary context, tertiary overlays, and the negative space that separates them.
2. **Surface** — dock, island, card, tile, well. One job and one material each.
3. **Control** — buttons, fields, navigation, feedback, data, overlays. A small vocabulary, used consistently.
4. **Behaviour** — states, motion, and repeated UX patterns: save, undo, confirm, disclose, bulk, wizard.

If a screen feels wrong, check the layers in reverse. Most ugly screens are a space problem with a component painted on top.

## Space: the five roles

| role | what it is | rhythm | examples |
| --- | --- | --- | --- |
| **Chrome** | the persistent frame | 16 / 12 / 8 | top bar, rail, tab bar, status bar |
| **Primary** | the work itself | 40 / 32 / 24 | table, canvas, form, article, chart |
| **Secondary** | context for the work | 20 / 16 / 8 | inspector, detail pane, filters, preview |
| **Tertiary** | temporary attention | 12 / 8 / 4 | menu, popover, dialog, sheet, toast |
| **Negative** | separation between groups | 4–96 | gutters, section gaps, empty bands |

**Primary and secondary are different instruments.** A 40 px page rhythm must not be inherited by a 320 px inspector. If a secondary panel needs the primary rhythm, it is a page or a split view, not an inspector.

**Tertiary is borrowed, not owned.** A menu, dialog or sheet is a temporary room: dense, focused, dismissible, and it returns focus and scroll position. Do not let an overlay become a second page.

**Negative space is a material, not leftover.** Use 4–8 between a label and its control, 12–16 between controls, 24–32 between groups, 48–64 between page sections, 56–72 for a page gutter. If a divider is doing the grouping, the spacing has already failed.

### Sub-space in practice

- **Primary + secondary**: main content plus a 320–360 px inspector. The inspector gets its own 20 px inset, 16 px section gaps and 8 px control gaps.
- **Primary + tertiary**: a table that opens a detail sheet or a command dialog. The primary width never changes; the overlay floats.
- **Chrome + primary**: rail + main. The rail is 208–248 px, 34 px items, 22 px between groups. It is navigation, not content.
- **Negative split**: a two-column page with a 64 px gutter and no divider. The gutter is the structure.
- **Dense + airy**: a toolbar can be 44 px while content below has 40 px section gaps. Density is local; the page can breathe.

## Surface grammar

| surface | use | rule |
| --- | --- | --- |
| **Dock** | persistent chrome: top bar, rail, inspector, timeline | flat, square, 1 px hairline seam; no radius, no shadow |
| **Island** | floating tools: HUD, toast, popover, sheet, recorder | 20 px radius, 0.5 px silhouette, top bevel, three shadows |
| **Card** | a group inside primary space | flat fill or 1 px hairline; no shadow unless raised |
| **Tile** | a group inside an island or inspector | fill, 12–18 px radius, no border, no shadow |
| **Well** | a recessed track or groove | sunken surface; sit it inside a tile |

Rules:

- **One primary surface per layer.** No island inside an island. No card inside a card with the same fill.
- **Only floating things cast shadows.** Dock and card are flat. Island and overlay use the three-step shadow.
- **No glass, no blur** on chrome. A dim backdrop is enough for a dialog.
- **A border is a last resort.** A 1 px hairline for seams, a 0.5 px silhouette for islands; everything else is separated by space.
- **Top-lit, not glowing.** The island gradient is nearly invisible; the bevel and silhouette do the material work.

## Control grammar

The full inventory, anatomy and states are in references/components.md. The short version:

- **Actions**: primary (one per surface), secondary, quiet, danger, link, icon, split, group. 28 / 34 / 40 px; 8–10 px radius.
- **Fields**: input, textarea, select, search, number stepper, password, checkbox, radio, switch, slider, tags, dropzone. Label above, help below, error inline. Native semantics first.
- **Navigation**: top bar, rail, tabs (pill / underline / vertical), segmented control, breadcrumb, pagination, stepper, menu, command palette.
- **Feedback**: banner, toast, progress, spinner, skeleton, empty, error, success, save state, undo.
- **Data**: table, list, stat, key–value, timeline, badge, chip, avatar, chart.
- **Overlays**: tooltip, popover, menu, dialog, sheet, command palette, context menu.

### State grammar

| state | rule |
| --- | --- |
| hover | 5.5% ink wash (7% in dark) |
| open / focus | 8.5–10% wash; 2 px focus ring at 2 px offset |
| pressed | 12% wash, scale 0.97 |
| selected | a raised thumb or a solid ink fill, never a coloured wash |
| disabled | 42% opacity, no pointer events |
| loading | keep the width, hide the label, show a spinner |
| error | red ink, inline message, 3 px soft ring |
| empty | explain why, show one next action |
| dirty | a dot or a quiet label, not an alarm |

Meaningful text must clear **4.5:1**; large text 3:1. Colour is identity, not decoration: semantic colours only for status. A selected tab is a surface, not a brand colour.

## Layout recipes

**Docked app shell**:

~~~text
┌──── top bar 56 ───────────────────────────────┐
│ brand · nav · search              theme · avatar │
├──────── 232 rail ────────┬─────────────────────┤
│ workspace                │ primary work       │
│ data                     │ 32–40 padding      │
│ manage                   │ 24–32 section gap  │
└──────────────────────────┴─────────────────────┘
~~~

With context: add a 320 px inspector. With a flow: drop the rail and use a centered 560 px card. With a canvas: use stage + tools + inspector + timeline. The shell is a variable, not a template.

**Page rhythm**: top bar 56 (compact 50); page padding 32–40; content max 1200–1440; title 28–30; stat row gap 10–12; panel radius 14–16; section gap 24–32.

**Responsive**:

| width | change |
| --- | --- |
| 1440 | rail 232, inspector 320, 32–40 padding |
| ≤ 1180 | rail 208, padding 28, stat cards 2-up |
| ≤ 980 | rail and inspector become overlays; top nav hides; main full width |
| ≤ 760 | one column; actions wrap; tables scroll inside their panel; never scroll the page |

Compress chrome and gaps before type. A 12 px label stays 12 px; a 34 px control may become 30. Use container queries for embeds and media; the outer shell uses the viewport.

## Motion

- **Hover** 150 ms ease-out. **Press** 140 ms, scale 0.97. **Settle** 320–380 ms cubic-bezier(.22,.8,.2,1), no overshoot.
- Tabs and segments glide the pill in 320–380 ms; labels fade in 160 ms.
- **Panel swap**: crossfade; incoming content drifts 14 px from the chosen side. Old leaves in 180 ms, new arrives in 280–320 ms.
- **Island entrance** 260 ms (fade + 8–10 px rise + 0.975 scale); toast 320 ms; dialog 260 ms.
- **Reduced motion**: remove travel and springs, keep opacity and a light press. Respect prefers-reduced-motion and offer a product-level toggle.

## UX patterns

- **Progressive disclosure**: summary → detail, one decision per step. A wizard is a progress model with a back door.
- **Dirty state**: show it, keep the draft, put save and discard at the end of the group. Never silently lose work.
- **Destructive actions**: confirm only irreversible things; name the object, scope and recovery. For small things, undo instead of confirm.
- **Bulk actions**: the row is the unit; the bar names the count and exceptions; the primary action is the safe one.
- **Empty / loading / error**: preserve geometry; empty offers a next move; error names the failure and a path; loading prefers skeletons.
- **Command palette**: a search field for the whole product; ⌘K; every command also exists in a visible menu.
- **Keyboard**: every shortcut has a visible command; focus returns after every overlay.
- **Permissions**: explain the role and offer a request; do not hide the whole page behind a lock.
- **Long tasks**: progress + what is happening + a way out; do not block the window.

The full playbook is in references/ux-patterns.md.

## Build order

1. **Map the space.** Name chrome, primary, secondary, tertiary and the negative-space scale. Decide what is docked and what floats. Done when the empty shell reads as an app.
2. **Lay the shell.** Top bar, rail or no rail, main, optional inspector; hairline seams. Done when 1440, 1024 and 900 px all have a clear primary space.
3. **Choose surfaces.** Dock and cards flat; islands only for floating tools. Done when no island is inside an island and no card is inside the same fill.
4. **Add controls.** Navigation, fields, data, feedback, overlays. Done when every control has rest / hover / focus / pressed / disabled and the relevant loading, error or empty state.
5. **Add behaviour.** Dirty save, destructive confirm, bulk, command, wizard. Done when the happy path and the recovery path are both visible.
6. **Compose examples.** One data-heavy, one form-heavy, one flow. Done when the same components change composition without re-styling.

## Review checklist

- [ ] Can you name chrome, primary, secondary and tertiary space? Does each have its own rhythm?
- [ ] Is negative space doing the grouping, or are borders compensating?
- [ ] Is there exactly one primary action per surface?
- [ ] Are dock and island clearly different materials? Does every island have a silhouette, top bevel and three shadows?
- [ ] Are hover / focus / pressed / disabled / loading / error / empty / dirty all visible somewhere?
- [ ] Is the type ramp one family and three weights? Are numbers tabular? Is chrome text at least 10 px?
- [ ] Does 4.5:1 hold for meaningful copy in both themes?
- [ ] Does the page scroll only in the main region? Do tables scroll inside their panel?
- [ ] At 980 px, do rail and inspector become overlays without losing focus or scroll?
- [ ] Does every overlay close on Escape and return focus?
- [ ] Is motion under 420 ms and free of overshoot? Is reduced motion honest?
- [ ] Can a keyboard user reach and operate every command?

## Anti-patterns

- **Card soup**: every group in a card, every card with a shadow. Collapse to one surface and use space.
- **Accent confetti**: primary buttons in three colours, coloured tabs, coloured headings. One accent; colour is identity.
- **Glass everywhere**: blur on chrome destroys the instrument and the contrast.
- **The 40 px inspector**: secondary space inheriting the primary rhythm, then becoming a cramped page.
- **Four-sided borders**: every region outlined. Use a seam or a silhouette.
- **Nine-pixel chrome**: labels shrunk until the hierarchy disappears.
- **A modal for everything**: if it is a decision inside the page, use a popover or an inline state.
- **Confirmation for undoable work**: ask only when recovery is impossible.
- **A wizard with no back**: progress without escape is a trap.
- **A hidden state**: no empty, no loading, no error, no dirty; the component only exists on the happy path.

## Files

- assets/argent.css — tokens, shell, surfaces and the full control set. assets/argent.js — icons, theme/density/brand, tabs, segments, popovers, dialogs, sheets, command palette, toasts, copy, ranges, steppers, tables.
- examples/lab/index.html — the visual field manual: 11 chapters, 40+ plates, spec mode, light/dark, density.
- examples/pulse/index.html, examples/settings/index.html, examples/onboarding/index.html — three cross-domain compositions.
- examples/motion/index.html — the original DogSC study, demoted to a domain example.
- references/layout.md — the space map, sub-space, negative space, responsive.
- references/components.md — inventory, anatomy, states.
- references/ux-patterns.md — save, undo, confirm, disclose, bulk, wizard, empty/error/loading.
- references/foundations.md — colour, type, space, radius, elevation, motion, icons.
- references/dogsc-study.md — what was learned from DogSC, and what was deliberately left behind.
- CREDITS.md — lineage, font licence, artwork.
