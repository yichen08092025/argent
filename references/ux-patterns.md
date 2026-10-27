# UX patterns

A pattern is a decision that has earned repetition. Components are letters; patterns are sentences. The governing idea is **recovery before confirmation**: make reversible things reversible, and ask only when they are not.

## 1. Dirty state and save

When a form changes, the surface must say so.

- Show a quiet dirty label near the page actions: 未保存的更改 / Unsaved changes, with a dot, not red.
- Keep a draft. Navigation away must warn once, not three times.
- Put save and discard at the end of the group, or in a sticky save bar when the group is long.
- Saving is a state, not a toast only: label to 保存中…, disable the button, keep the width; on success return to 已保存 and a timestamp.
- Do not auto-save silently unless the product has a visible “saved just now” message. Autosave without feedback is indistinguishable from loss.

Anti-pattern: a modal “you have unsaved changes” for every tab switch; a save button that never disables; a success toast with no persisted state.

## 2. Destructive vs undo

Ask this first: can the user recover?

~~~text
Reversible in 5–8 s?   → do it, show an undo toast.
Reversible from trash? → do it, show a quiet “Moved to trash — Undo” line.
Irreversible?          → confirm in a dialog, name the object and the scope.
~~~

Rules for the confirm dialog:

- Title asks the question: “Delete this workspace?”
- First sentence names the scope and the loss: “This removes 24 projects, 3,000 events and every saved view.”
- The primary is the dangerous one, placed last, in danger ink.
- The quiet exit is clear: “Keep workspace”.
- For high-stakes deletion, require typing the name or “delete”. Never use a generic “Are you sure?”.
- Never put a destructive action in a menu without a second, explicit step.

Anti-pattern: a confirm dialog for “archive”; a red toast that disappears before it can be read; a “Delete” primary on the left and a “Cancel” primary on the right.

## 3. Progressive disclosure

A summary is a promise. Opening it must not move the page under the pointer.

- Use a disclosure row when the detail is optional and the summary is enough.
- Keep the summary stable: title, state, one meta line.
- Animate the body with height? No. Fade/translate the content inside a stable container, or let the row expand without moving focus.
- Nested disclosure is a smell; two levels is usually enough.
- If the detail needs its own tools, it is a page or a split view, not a disclosure.

## 4. Wizard

A wizard is progressive disclosure with a progress model.

- One question per step. The question is the step title.
- Back is always available. Forward is the only primary.
- Show step count and what remains; do not show a 12-step list for a 3-step task.
- Validate on continue, not on every keystroke. Keep the error next to the field.
- Preserve work when going back.
- The final step is a result, not another form. “Import complete” with the next action.
- A wizard must be escapable; “save and exit” must preserve the draft.

## 5. Bulk actions

- The row is the unit; the checkbox selects, the row opens.
- A bulk bar names the count and the exceptions: “12 selected · 3 cannot be moved”.
- The safe action is primary; the destructive action is quiet-danger and asks.
- Show the bar only when count > 0; keep it above the content, not off-screen.
- Select-all should say what it selects: “Select all 24” or “Select this page”.
- After the action, clear the selection and show a result with undo if possible.

## 6. Empty, loading, error

Preserve the geometry of the final state.

- **Loading**: skeleton first; spinner only for an unknown delay under 2 s. Do not replace the whole page with a spinner.
- **Empty**: say why (“No signals yet”), what to do (“Connect a source”), and one action. Do not use a generic “No data”.
- **Error**: name the failure and the next step (“The query took too long. Try a shorter window.”). Provide retry and a secondary path (logs, support).
- **Partial**: show the rows you have; a banner explains the missing part.
- **Success**: quiet. A check and a timestamp are enough.

Do not show a toast for a state that persists; use a banner or inline message. Do not show a banner for a state that passed; use a toast.

## 7. Command palette

- One input, a filtered list, keyboard first.
- ⌘K / Ctrl+K opens; Escape closes; arrows move; Enter runs; focus returns.
- Every command has a visible equivalent elsewhere. The palette is a faster path, not the only path.
- Group by object or action; show shortcuts on the right.
- Empty query shows recent commands, not a wall of every command.
- Do not put a destructive command at the top of the default list.

## 8. Permissions

- Explain the role and the missing capability: “Analyst access required to query production.”
- Offer the request or the upgrade; do not just lock the page.
- Show the locked affordance in place, not a 404.
- Disable with a reason; do not hide the feature entirely unless it is irrelevant.
- A permission gate is a state, not an error.

## 9. Long-running work

- Show progress and what is happening: “Importing 3.4M rows · 42%”.
- Keep the interface responsive; do not block the window with a modal.
- Offer a way out without losing the job; make it resumable when possible.
- On failure, keep the partial result and name the row/field that failed.
- On success, give the result and the next action.

## 10. Onboarding and checklists

- One primary action at a time; a checklist is for optional completeness.
- Show progress and what remains; do not require a tour to use the product.
- Onboarding is not a modal prison: “Skip for now” must be visible.
- Use the product’s real surfaces; a fake sample screen teaches the wrong thing.
- Persist completion; do not show the same welcome again.

## 11. Keyboard and focus

- Every command has a visible shortcut; every shortcut has a visible command.
- Focus order follows reading order; no positive tabindex.
- Focus returns to the trigger after an overlay closes.
- Escape closes the topmost layer only.
- A focus ring is never removed; it is the keyboard user’s cursor.
- Shortcuts should not fire when typing in an input.

## 12. Optimistic UI

- Use it for high-confidence, reversible actions (toggle, rename, reorder).
- Show the new state immediately; keep a subtle in-flight indicator.
- On failure, roll back and explain; do not silently keep the lie.
- Do not use optimism for destructive or financial actions.

## Copy and tone

- Say what happened, not “Success!”. “Workspace verified” beats “Success”.
- The title names the object; the detail names the consequence.
- No exclamation marks in errors. No blame. No “Oops”.
- Use the user’s vocabulary; “signal” if the product says signal, not “record”.
- Numbers are tabular; time zones and units are explicit.

## UX checklist

- [ ] Is the action reversible? If yes, is undo visible?
- [ ] If irreversible, does the confirm name the object, scope and recovery?
- [ ] Is dirty state visible before navigation?
- [ ] Are empty/loading/error states designed with the same geometry?
- [ ] Does every overlay return focus and scroll?
- [ ] Does the wizard keep back and a draft?
- [ ] Does bulk state name count and exceptions?
- [ ] Does the command palette have visible equivalents?
- [ ] Does the permission state explain the role and offer a request?
- [ ] Can a keyboard user complete the primary flow?
