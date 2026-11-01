# Quick Pick Worker

Web Worker for the QuickPick functionality in LVCE Editor.

## Contributing

```sh
git clone git@github.com:lvce-editor/quick-pick-worker.git &&
cd quick-pick-worker &&
npm ci &&
npm test
```

### Command palette keyboard shortcuts

Set `"quickPick.showKeyBindings": true` in user settings to display keyboard shortcuts beside command palette entries. The setting defaults to `false`. Built-in and extension commands are supported, and user keybindings take precedence over defaults. Other quick picks do not display shortcuts.
