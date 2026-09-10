# Feralwild v1.1.0 update

This ZIP contains only changed/new files. Apply it to your existing v1.0.0 game; it is not a separate full installation.

## Install from your phone

1. In the current game, open Settings and export a save backup.
2. Extract this update ZIP.
3. In GitHub, upload all extracted files directly into the existing repository root, replacing files with the same names. Keep all other existing files, including the original creature pictures, Firebase configuration, and rules.
4. Commit the upload. When GitHub Pages finishes updating, close the old game tab and reopen the game. Verify **v1.1.0** in Settings.

Your existing save is upgraded automatically. You do not need a new character, a new Firebase project, or new security rules.

## Changes

- New characters start peacefully with a short, skippable tutorial. Existing players can replay it from Settings.
- Item pictures in inventory, gathering/crafting, care, and equipment inspection.
- Undiscovered Feral portraits hidden until encountered or owned.
- Elemental chance: **1 in 100**. Titanblood chance: **1 in 250**. Independent rolls.
- Default-on rare encounter protection freezes both sides and preserves the exact encounter, including during offline progress. Trainer skilling continues. Use **Join & resume** when ready.
- Offline progress keeps the **12-hour cap**, shared across background checks. Fixed a save-timestamp issue that could discard unprocessed offline time.
- Apex distribution: **4 Melee / 3 Ranged / 3 Magic**. No individual IVs or progression are reset.
- Sound effects for combat, healing, gathering, crafting, captures, victories, and rare encounters; mute and volume controls in Settings.

In-game rare alerts always work. Browser notifications are optional and require permission plus a page that can still run. If the browser is closed or suspended, the rare encounter is protected during catch-up and the alert appears when you return; live closed-browser push requires additional backend work.

Verification: 36 automated checks passed, with targeted phone browser checks.
