# Fast Snippet

Insert little snippet with one shortcut.
Input `=>` with `ctrl+alt+shift+.` for example.

## Usage
Fast Snippet can only be triggered by defining your keybindings.

For example:

Adding this in config into your keybindings.json
```json
    {
        // input "=>" with ctrl+alt+>
        "key": "ctrl+alt+shift+.",
        "command": "fastsnippet.insertText",
        "args": [ "=>" ]
    }
```
and your will be able to insert `=>` with one shourtcut.

Fast Snippet also support cursor position offset, you can set where to put your cursor after text inserted.

See this example:
```json
    {
        // input "()" and put cursor in the middle with alt+(
        "key": "alt+shift+9",
        "command": "fastsnippet.insertText",
        "args": [ "()", -1 ] //the second argument is cursor offset
    },
```
This will let you insert a pair of `()` and put cursor between them when press `alt+(` ( `alt+shift+9` ).

You can do the same things to `""`, `''`, `[]`, `<>` and more.

This can be extremely handy if you don't wan't editor to auto-close brackets for you. (It's much more stupied than it's designed to be :p).

*Enjoy!*

## Selection behaviour
When you save one or more selection, Fast Snippet will do these steps:

- Cut all text in selection.
- Insert your sneppet.
- Move cursor according to cursor offset.
- Paste old selection text into current cursor position.

So if you have some text surrounded by selection, triggering `alt+(` in the example above will create a pair of `()` that surrounds your text.

## TODOs
Nothing in my mind yet, this is good enough now.

Maybe make selection behaviour configurable, or let you insert normal snippet with on keyboard shortcut ?
