# Feralwild v1.1.1 update

Apply this small patch after v1.1.0. It contains only changed files.

1. Export a save backup from Settings.
2. Extract this ZIP on your phone.
3. Upload all extracted files to the existing GitHub repository root, replacing matching files. Keep every other file.
4. After GitHub Pages updates, close and reopen the game. Settings should show v1.1.1.

Rare encounter pausing now only applies while the game is visible and the setting is selected. This applies to both Titanblood and Elemental Ferals. Offline hunting continues, including if you leave during a rare pause. Turning the setting off also releases a current rare pause. Offline rares are logged, but do not trigger alerts or a delayed pause on return.

The twelve-hour offline cap and your existing progress are retained. No Firebase changes are needed.

Verification: all 37 automated engine, save, update, and mocked online transaction checks passed. App and notification modules passed syntax checks.
