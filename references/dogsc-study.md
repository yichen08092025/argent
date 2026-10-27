# DogSC study

Argent began as a study of **DogSC**, an open-source macOS screen recorder and lightweight editor by laogou717 (MIT). The goal of the study was not to clone the product. It was to find the reusable decisions underneath it.

Source: https://github.com/laogou717/dogsc (studied at the 0.1.8 release). The installed copy on this machine is 0.1.4.

## What the source made clear

**A docked studio, not a page of cards.** The editor is a 46 px title bar, a stage, a 384 px inspector and a full-width timeline. They are flat bands separated by 1 px hairlines. Only the transport HUD is an island. That contrast is the whole layout: the work is docked; the tools float.

**One material, three shadows.** The island recipe in EditorWorkspaceSurface is a near-invisible vertical gradient, a 0.5 px silhouette, a 1 px top bevel that fades by 46%, and contact / soft / ambient shadows. No glass, no blur. The same recipe is used for the recorder capsule, the HUD and toasts.

**A tight type ramp.** The editor uses 10 / 11 / 12 / 13 for chrome, a 32 px inspector title, and 600 as the heaviest weight. Numbers are tabular. The narrowness is the calm.

**A secondary rhythm.** The inspector is 384 px with a 14 px inset and 14/16 px section gaps. It does not inherit the stage's generous rhythm. That is why it reads as context rather than a second page.

**State as a wash.** Hover 5.5%, open 8.5%, pressed 12%; selected is a raised thumb or an ink fill. The interface almost never uses a coloured state for chrome.

**Colour belongs to content.** The primary recording clip stays neutral graphite; effect lanes use lime, amber, coral, teal and rose. The same hue identifies a lane in the inspector, the clip, the handles and the canvas focus. Colour is identity, not decoration.

**Motion settles.** Springs run at damping 0.84–1.0; nothing overshoots. The tab pill glides; the inspector pages drift in from the side; the island materialises with a fade and a small rise. The old spring values are in SpringMotion.

**The UX is direct.** The inspector owns the current task; selecting a clip routes to its panel. Small actions undo from a toast; destructive actions ask once, with the consequence. The recorder uses a floating memo as a teleprompter; the editor uses a scene preset to carry a whole look. These are product-specific patterns, but the grammar—context, undo, direct manipulation, one primary—is general.

## What we kept

- The Soft Silver / Graphite pairing, with a dynamic dual appearance.
- The docked studio shell and the floating island.
- The top-lit surface recipe, the narrow type ramp and the tabular numerals.
- The inspector rhythm and the one-primary action.
- The wash-based state model and the settle motion.
- The Chinese microcopy voice (short labels, 2–4 characters).

## What we left behind

- The canvas, timeline, recorder permissions, cursor recording and video export. They belong to the recorder, not the system.
- The 384 px fixed inspector as a universal answer. Argent uses 320–360 by default and promotes to a split view when the context needs more room.
- The single vertical “everything is an editor” composition. Argent ships a dashboard, a settings page and a wizard to prove the shell is a variable.
- The 46 px title bar. Argent's general apps use 56 px; the studio variant can still use 46.
- The macOS-only material details (traffic lights, native window chrome). Argent is web-native.

## The demoted example

The original study is preserved at examples/motion. It is a standalone snapshot (its own CSS and fonts) and is intentionally not the main library demo. It answers one question: how far can this language go inside a single vertical product? The component lab answers the other: what are the reusable pieces?

## Why “Argent”

Silver is the material that reflects the work rather than competing with it. The name is short, neutral and not tied to recording. The code prefix is ag-.

## Credit

DogSC is MIT licensed. Argent is an independent implementation; the token values and layout ideas are adapted with credit, not copied as source. See CREDITS.md.
