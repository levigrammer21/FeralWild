# Feralwild — v1.1.2

A mobile-first idle creature RPG for a small circle of players. Everything in this package goes directly in your GitHub repository root, including the creature and item image sheets. No installation, terminal, package manager, or build command is needed to host the game.

## Put the game online from your phone

1. For a new installation, use the original full package and then apply the v1.1.0 update followed by v1.1.1. For an existing v1.1.0 installation, extract `Feralwild-v1.1.1-update.zip` and upload its files over the files with the same names. `UPDATE.md` explains this update.
2. Create your GitHub repository. A public repository works with GitHub Free Pages. Choose a name such as `feralwild` and initialize it with a README if GitHub asks.
3. In the repository, choose **Add file → Upload files**. Select the extracted files, including all PNGs. Upload the files themselves, **not the ZIP and not an enclosing folder**. Use your phone browser's **Request Desktop Site** option if GitHub hides the upload controls. Commit to `main`.
4. Open **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
5. Open the game URL GitHub shows when publishing completes. Play in that browser URL, not by opening the downloaded HTML in Files. You can add the page to your phone's Home Screen.

The local game works immediately. Firebase is only needed for accounts, cloud saves, the marketplace, and the group leaderboard.

## Finish Firebase setup

The supplied project `petmmo-61e87` is already wired into `firebase-config.mjs`. No code changes or database URL are needed.

1. In Firebase Console, select **petmmo-61e87**.
2. Open **Firestore Database**. Create a **Standard edition** database with ID **(default)** in **Production mode**, if it does not exist already.
3. Open **Firestore Database → Rules**. Replace the editor contents with the full contents of `firestore.rules`, then **Publish**. The in-game client cannot publish administrative security rules with a web API key.
4. Open **Authentication → Sign-in method**. Enable **Email/Password** (the password option, not email-link sign-in).
5. In **Authentication → Settings → Authorized domains**, add the hostname of your GitHub Pages site, such as `yourusername.github.io`. Do not include `https://` or the repository path.
6. In the game, tap your profile circle, choose **Create account**, and use an email and password. Then connect your local journey to the new cloud save.

No Analytics, Cloud Storage, Realtime Database, Cloud Functions, Firebase CLI, or custom server is required by this release. The web configuration is client configuration; it is not an administrator credential. Keep service-account/private keys out of the repository.

Collections are created by gameplay. You do not need to add documents manually:

| Collection | Purpose |
| --- | --- |
| `players/{uid}` | Private serialized save with a monotonically increasing revision |
| `scores/{uid}` | Group-visible skill XP, badges, collection count, raid victories |
| `market/{listingId}` | Item stacks in escrow; immutable item/quantity/price after listing |
| `credits/{uid}` | Sale proceeds awaiting an atomic collection into the player's save |

The rules restrict private saves to their owner, validate public field shapes, enforce listing transitions, and tie trade writes to player revisions. Gameplay calculations intentionally remain client-side for this trusted family/friend group. This is not a server-authoritative anti-cheat system. Email account registration is open to people who can reach the game; it is not an invite-only allowlist.

## First session

- Choose Bramblekit, Pebbleback, or Glimmermoth. Starters have fixed 60 IVs; wild Ferals roll all four independently.
- You begin with crafted snares, food, medicine, and treats. A short, skippable guide introduces the game. Your team stays out of combat until you choose Start hunt.
- Watch an enemy's HP. Tap **Hold attacks** to stop your team's attacks, then tap that enemy's **Snare** button. Enemies continue attacking while you hold. Release the hold to resume attacks.
- Capture two more Ferals, retreat, and add them from **Ferals** to make a three-member team.
- In **Skills**, gather timber, ore, herbs/fiber, and fish. The trainer switches to that work; your team keeps fighting without trainer food or capturing.
- Craft snares in **Artifice**, equipment in **Smithing**, food/treats in **Cooking**, and revival medicine in **Alchemy**.
- Return your trainer to the team for safer combat. Restore an incapacitated Feral outside battle through its **Care** panel.
- Complete your region's three requirements, defeat its Champion, and travel onward.

Retreating preserves any surviving wild encounter in that region. Repeatedly starting and stopping a hunt cannot reroll rare encounters for free.

## Implemented content

- 10 regions, 100 named Feral species, and artwork for every species.
- 8 player skills, 147 item definitions, and 90 recipes.
- 10 Champions, three requirements each, badge progression, and Feral level caps through 100.
- A peaceful new-character start, a replayable three-step tutorial, illustrated item families, hidden undiscovered portraits, and configurable synthesized sound effects.
- Real-time three-Feral teams, individual attack/ability timers, threat, taunt, focus targeting, guard, hitsplats, healing, critical hits, and elemental statuses.
- Permanent IVs, appraisal, independent Titanblood and elemental rolls, Morale, and individual Bond.
- Four equipment slots, six crafting qualities, salvage, and three special raid relics.
- Manual capture and later limited automation using both Warden seals and snares.
- Species and duplicate capture research rewards, storage expansion, selling, care, and material/gold sinks.
- Three keyed, three-stage raids with target selection, telegraphed attacks, shared command cooldowns, and between-stage choices.
- Local saves, backup generations, export/import, offline simulation, email accounts, revision-checked cloud saves, transactional marketplace, and leaderboard.

PvP and player-held Champion positions are not included in this release. Regional Champions always remain available for ordinary progression. Combat is separated from presentation so a later PvP mode can reuse its rules.

## Saves and switching phones

Local progress is saved approximately every 15 seconds and after player actions. Two previous valid generations are retained. Saves have a checksum and are validated before import. Supported browsers use a single-tab lock to prevent simultaneous local writers. Export backups regularly in **Settings**; browser storage can be cleared by the phone or user.

After connecting a chosen cloud save, the game uploads about every 90 seconds while visible. Tap **Save to cloud** before deliberately switching phones. On a new device, sign in and choose **Load cloud journey**. The game never silently merges or overwrites conflicting journeys. If another device changes the cloud revision, uploading stops and you must reconnect and select the correct journey. Loading a different journey first downloads a local backup.

Ordinary gathering, crafting, and combat simulate up to 12 hours away using the same deterministic engine. Raid combat pauses while hidden or closed. Ordinary combat never automatically captures; enabled later-game capture automation requires the trainer and consumes supplies for each attempt.

Marketplace purchases, listings, cancellations, and proceeds claims are transactions. They either commit their player-save and market changes together or fail together. The game briefly pauses local simulation during an online transaction. In case of a browser crash during a trade, reconnect and choose the cloud journey before continuing to trade.

## Balancing and maintenance

`data.mjs` holds the catalog and principal balance values. `BALANCE`, XP curves, quality weights, species profiles, recipe costs, and timers can be adjusted there. Species base stats grow approximately 5% per region, with separate stat distributions and move/passive combinations.

- IV multiplier: `0.5 + (IV - 1) / 99`. IVs remain integers 1–100 forever.
- Titanblood: independent base probability `1 / 250`, multiplying rolled stats by `1.10`.
- Elemental: independent base probability `1 / 100`.
- Titanblood beacon: triple Titanblood probability for 30 minutes; expensive and still rare.
- Elemental incense: four times elemental probability, biased entirely to its specified element, for 30 minutes.
- Speed interval: `max(1, 10 / (1 + 9 * (max(1, Speed) - 1) / 49))` seconds.
- Combat triangle: Melee beats Ranged; Ranged beats Magic; Magic beats Melee. Advantage gives 18% more damage, disadvantage 15% less.
- At zero Morale, Attack/Defense/Speed are 55% of their otherwise calculated values. Max HP does not change.
- Max Bond: 10,000; 15% better treat restoration and 10% slower Morale loss. No IV bonuses.
- Level 100 player skill threshold: 49,714,967 XP. Feral threshold: 8,411,367 XP, with badge caps.
- Natural Legendary crafting chance rises from approximately 0.05% at skill 1 to approximately 5% at skill 100.
- Raid keys: `1 / 6500` per defeated wild Feral; key fragments offer a deterministic crafting path.
- Raid relics: 3.5% per clear, guaranteed every 30 clears of that raid.

The intended duration is months of progression. Long-term fun, economic balance, and endgame difficulty still require actual family play; numerical tests cannot certify months of pacing in one development session.

When changing the save format, add and test an explicit migration before raising the schema number. Never reset a player's data to accommodate a new field. Preserve the original save on migration failure. Update `VERSION` and the service-worker cache version together when shipping updates. Export a backup before updating the hosted files.

## File map

| File | Responsibility |
| --- | --- |
| `index.html` | Entry page |
| `game.css` | Responsive game styling and combat effects |
| `app.mjs` | Screens, interactions, and runtime coordination |
| `engine.mjs` | Deterministic simulation and gameplay mutations |
| `data.mjs` | Content catalog and balance formulas |
| `saves.mjs` | Validation envelope, checksum, backups, import/export |
| `online.mjs` | Email auth, cloud save revisions, marketplace transactions |
| `firebase-config.mjs` | Your supplied Firebase web configuration |
| `firestore.rules` | Rules to publish in Firebase Console |
| `service-worker.js` | Offline app-file caching after the first online visit |
| `ferals-a.png`, `ferals-b.png` | Two original 50-portrait creature sheets |
| `item-icons.png`, `item-art.mjs` | Illustrated item families and catalog mapping |
| `audio.mjs` | Original synthesized effects, volume, and gesture-safe audio |
| `alerts.mjs` | Optional browser rare-encounter notifications |
| `icon.svg` | Game mark |
| `test.mjs`, `test-online.mjs`, `test-update.mjs` | Engine and mocked cloud transaction regression tests |
| `TESTING.md` | Verification performed and remaining live checks |

Fonts use Google Fonts when available and fall back to installed sans-serif fonts. Creature illustrations were created using built-in image generation as two aligned 5×10 portrait sheets; the prompts specified the 100 named species in catalog order, hand-painted fantasy style, navy backgrounds, no text, and consistent framing.

## Official setup references

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Firebase email/password: https://firebase.google.com/docs/auth/web/password-auth
- Firestore rules: https://firebase.google.com/docs/firestore/security/get-started
- Firestore transactions: https://firebase.google.com/docs/firestore/manage-data/transactions

## v1.1 rare protection and offline timing

**Pause for Elemental or Titanblood (online only)** is enabled by default in Settings. When selected, a qualifying encounter pauses both teams while the game is visible, including attacks, status damage, Morale loss, and automatic capture. Trainer gathering/crafting continues. Choose **Join & resume** or disable the preference to resume.

Hiding or closing the game resumes rare-paused combat during offline simulation. Offline encounters never trigger rare protection, and the final offline encounter does not trigger a delayed pause on return. Ferals can defeat rare enemies while away. Rare encounters remain in the journal. The shared twelve-hour allowance applies across background checks and save/reload. Saving alone never discards unprocessed time.

In-game rare alerts require no permission. Optional browser notifications require permission and only trigger while the game is visible. There are no offline rare alerts or closed-browser push notifications.

Apex styles are now 4 Melee, 3 Ranged, and 3 Magic. Base stats and each individual's IVs, level, equipment, and Bond are retained. A Feral portrait is revealed once that species is encountered or owned. The three starter choices are visible during initial selection.

Sounds start after a player gesture and are muted when the page is hidden. Settings includes a sound toggle, volume slider, and test button. Item illustrations were generated as one 6×6 atlas of 36 deliberately reusable item-family icons: timber, ores, fish, herbs, equipment, snares, food, care supplies, lenses, salvage, essence, keys, and incense.

## Install on your phone (v1.1.2)

Apply v1.1.2 after v1.1.1. Open Settings → Install Feralwild. iPhone: Safari → Share → Add to Home Screen → Add (keep Open as Web App enabled if shown). Android: use the installation prompt or the browser menu’s Install app / Add to Home screen option. Open the new home-screen icon. Export or cloud-sync your save first; restore it if the installed app opens a new journey. Load online once to fill the offline cache. See UPDATE.md for upload and installation instructions.
