# v1.1.2 installation verification

Run `node test-install.mjs`. Checks cover Safari/Android instructions, one-use browser prompts, dismissal, expired prompt fallback, installed state, relative manifest scope/start URL, icon PNG sizes, and presence of every offline cache asset. These pass, along with all 37 existing checks. App, install module, and service-worker syntax checks pass.

Physical-phone acceptance: after uploading, open the HTTPS game in Safari or Chrome, install from Settings/browser menu, and open its home-screen icon. Check that browser chrome is absent and controls clear the notch/home indicator. Verify or restore your save, let the game load online, then reopen without a network connection to check core play. Reconnect for cloud features. Physical-device installation and the new Settings panel have not been browser-tested in this patch.

---

# Feralwild v1.1.1 — update verification

All existing 18 engine checks and 6 mocked online transaction checks still pass. `test-update.mjs` has 13 passing checks for:

- Peaceful new-character start and tutorial defaults.
- Idempotent migration retaining existing Ferals, equipment references, inventory, skills, and teams.
- Exact 1/100 Elemental and 1/250 Titanblood probabilities, plus a 100,000-roll sample.
- Four Melee, three Ranged, and three Magic Apex species.
- Discovery tracking and complete item-art mappings.
- Rare protection freezing attacks, status damage, food, snares, automatic capture, and Morale.
- Offline gathering continues while existing rare pauses are released.
- A shared 12-hour budget across background updates and save/reload, without duplicated rewards.
- Twelve-hour hunts continue through new offline rares, without a delayed pause on return.
- Foreground catch-up preserves selected protection; disabling the setting releases it.
- Explicit resume and disabling future protection.
- Offline crafting with exact material consumption and no replay after reload.

Previous v1.1.0 phone browser checks verified the upgraded existing save, illustrated inventory, hidden portraits for all ten undiscovered Crown species, the three tutorial steps and completion, sound controls, and Settings without horizontal page overflow. No game errors appeared in the inspected console log. The sound test control was exercised; sound quality on physical phone speakers was not evaluated.

Live OS notification delivery on iOS/Android, closed-browser push, and live Firebase services were not tested. Closed-browser push is not implemented. v1.1.1 intentionally continues offline combat through rare encounters; this behavior is covered by engine tests. This logic and text patch was syntax-checked; no new phone browser check was performed. Firebase rules and account setup remain unchanged.

The original verification record follows for context.

---

# Feralwild v1.0.0 — verification

## Automated checks completed

`node test.mjs` passes 18 checks:

- 100 distinct species across 10 regions.
- Every recipe ingredient, move, passive, and drop resolves.
- IV endpoints, Titanblood multiplication, and Speed bounds.
- Appraisal and care preserve IVs.
- Zero Morale reduces stats but permits combat.
- Crafting charges inputs once and stops when supplies run out.
- Equipped items cannot be salvaged.
- Trainer absence disables captures/food without stopping gathering or team combat.
- Capture preserves species, individual identity, IVs, element, and Titanblood.
- Capture cannot award a kill or capture twice.
- Badge level caps, including the ninth badge unlocking level 100.
- Champion rewards cannot be repeated.
- Raid entry consumes one key; offline raid combat pauses; stage choices gate progression.
- Foreground and offline simulation produce identical results from the same state.
- Save roundtrip, checksum rejection, and invalid-data rejection.
- Offline progress is capped at 12 hours.
- Level-100 XP thresholds and Legendary quality probabilities.
- Retreating and restarting cannot freely reroll wild encounters.

`node test-online.mjs` passes 6 checks using the actual online module with an in-memory Firestore transaction double:

- Listing escrow and the 2% fee.
- Purchase retries cannot duplicate items or charges; seller receives 95%.
- A sold listing cannot be bought again.
- Sale proceeds can only be collected once, including transaction retries.
- Cancellation restores the escrow once and retains the listing fee.
- A stale cloud revision cannot overwrite another device's save.

These are logic tests, not live Firebase integration or Firestore rules-emulator tests.

A populated 12-hour simulation with three level-100 Ferals, regenerative equipment, gathering, and continuous combat completed in approximately 1.3 seconds in the development runtime. Phone performance varies.

## Browser checks completed

The actual game was opened through the supervised browser preview. A 390-pixel-wide iframe provided a portrait phone layout, and the full browser provided a desktop view.

Verified:

- Starter selection and a new named journey.
- Visible creature artwork, combat health and attack bars, ability timers, and damage hitsplats.
- Battle, Skills, Ferals, Inventory, and World navigation, plus the mobile More menu.
- Gathering while the trainer is away from combat.
- Feral detail and care dialogs.
- Incapacitation recovery consuming one medicine and updating inventory.
- Active capture failure feedback.
- Save persistence when reopening the game.
- Inventory and World pages had no horizontal document overflow in the phone viewport.

An early local-preview connection limitation was resolved using the supported supervised preview. Browser-extension metadata errors were present in the environment; no game runtime exception was observed during these interactions.

## Live checks still needed after publishing

The supplied web configuration cannot grant administrative Firebase access. The owner must enable Email/Password and publish `firestore.rules` in the Firebase Console.

After that setup, check from your phone:

1. Register with your email and connect the new local journey to cloud.
2. Save to cloud, reopen the game, reconnect, and load the same journey.
3. With a friend using a separate account, list a small stack, buy it, and collect proceeds.
4. Confirm the buyer receives the exact quantity and the seller receives 95% of the price.
5. Confirm both players appear on the leaderboard after connecting and saving.

Live email registration, published Firestore rules, actual cross-account trading, iOS/Android hardware behavior, and months of progression balance were not verified in this environment. PvP/player-held Champions are not part of v1.0.0.

You do not need Node or a terminal to play or host the game. The two test scripts are included so future development can rerun the same regression checks.
