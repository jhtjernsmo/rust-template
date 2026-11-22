# Graph Report - rust-template  (2026-11-22)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 372 nodes · 491 edges · 20 communities (16 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 15 edges
3. `with` - 13 edges
4. `App()` - 11 edges
5. `with` - 11 edges
6. `env` - 10 edges
7. `SettingsStore` - 8 edges
8. `scripts` - 8 edges
9. `steps` - 8 edges
10. `react` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AppState` --references--> `SettingsStore`  [EXTRACTED]
  src-tauri/src/lib.rs → crates/app-core/src/settings.rs
- `rust-template` --depends_on--> `app-core`  [EXTRACTED]
  src-tauri/Cargo.toml → crates/app-core/Cargo.toml
- `DemoBlock()` --calls--> `Demo()`  [EXTRACTED]
  ui/src/components/WikiPage.tsx → ui/src/components/Demos.tsx
- `Props` --references--> `WikiPage`  [EXTRACTED]
  ui/src/components/WikiPage.tsx → ui/src/wiki/index.ts
- `App()` --calls--> `appInfo()`  [EXTRACTED]
  ui/src/App.tsx → ui/src/api.ts

## Import Cycles
- 2-file cycle: `crates/app-core/src/lib.rs -> crates/app-core/src/settings.rs -> crates/app-core/src/lib.rs`

## Communities (20 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (39): lucide-react, react, @tauri-apps/api, vitest, lucide-react@^1.56.0, @tauri-apps/api@^2.12.3, AppInfo, appInfo() (+31 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (45): name, needs, runs-on, steps, concurrency, cancel-in-progress, group, name (+37 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (38): jsdom, oxlint, react-dom, react-markdown, remark-gfm, @tauri-apps/cli, @tauri-apps/plugin-opener, @testing-library/dom (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (34): name, runs-on, steps, strategy, APPLE_CERTIFICATE, APPLE_CERTIFICATE_PASSWORD, APPLE_ID, APPLE_PASSWORD (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (12): greet(), greets_a_trimmed_name(), MAX_NAME_LEN, rejects_empty_and_too_long_names(), Error, Corrupt, Invalid, Io (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): app, security, windows, build, beforeBuildCommand, beforeDevCommand, devUrl, frontendDist (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (11): run(), brings_back_a_window_that_opened_partly_off_screen(), FILL, fit_main_window(), fit_to_screen(), fitted(), LAPTOP, leaves_a_window_that_fits_alone() (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (16): patterns, patterns, actions, cargo, npm, dependency-name, update-types, patterns (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (7): app_info(), AppInfo, CmdResult, get_settings(), greet(), save_settings(), AppState

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (13): with, args, cache, cache-dependency-path, includeUpdaterJson, node-version, prerelease, releaseBody (+5 more)

### Community 12 - "Community 12"
Cohesion: 0.17
Nodes (6): changed, conf, edits, [name, identifier], root, slug

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, preview, tauri, test, typecheck

### Community 14 - "Community 14"
Cohesion: 0.33
Nodes (5): description, identifier, permissions, $schema, windows

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (5): on, pull_request, push, workflow_dispatch, branches

## Knowledge Gaps
- **5 isolated node(s):** `app-core`, `rust-template`, `Corrupt`, `Invalid`, `Io`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 195 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `steps` connect `Community 3` to `Community 11`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `app-core`, `rust-template`, `Corrupt` to the rest of the system?**
  _5 weakly-connected nodes found - possible missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06187202538339503 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Community 13` to `Community 2`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05314009661835749 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06923076923076923 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._