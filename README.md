# DX-SPA-TODO

Example TODO app as SAP using [DX](https://github.com/xtompie/dx) and [DX-VAL](https://github.com/xtompie/dx-val)

- Modular
- No dependecy
- No npm
- No webpack
- Easy to deploy (composer.json -> script -> build)
- Autoload module by _export.php
- Html in .html, JavaScript in .js
- Router pushState popState
- JavaScript code completion
- Global Registry Pattern, IoC - check Task module
- Fully accessible via keyboard without the need for a mouse
- PubSub example in App.Window.Boot

## Key binds

List

`a` - add
`s` - focus search
`Enter` (in search) - submit search
`ArrowUp`, `ArrowDown` - Select next, prev task
`Enter` - go to task detail

Add

`Escape` - go to list
`Enter` (in input) - submit form

 Detail

`Escape` - go to list
`Enter` - togle status: done, todo
`e` - go to edit
`d` - go to delete

Edit

`Escape` - go to detail
`Enter` (in input) - submit form




