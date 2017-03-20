# Fast Snippet

Insert little snippet with one shortcut.
Input `=>` with `ctrl+alt+shift+.` for example.

## Usage
Fast Snippet can only be triggered by defining your keybindings.

For example:

Adding this in config into your keybindings.json
```javascript
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
```javascript
    {
        // input "()" and put cursor in the middle with alt+(
        "key": "alt+shift+9",
        "command": "fastsnippet.insertText",
        "args": [ "()", -1 ] //the second argument is cursor offset
    },
```
This will let you insert a pair of `()` and put cursor between them when press `alt+(` ( `alt+shift+9` ).

You can do the same things to `""`, `''`, `[]`, `<>` and more.

> Note: cursor offset must not bigger than `0`, and it's default value is `0`.

This can be extremely handy if you don't wan't editor to auto-close brackets for you. (It's just not smart enough).

## Selection behaviour
If your cursor offset is 0 , Fast Snippet will assume you may not intend to use this snippet with selection (like the `=>` example above), If you do have a selection, Fast Snippet will cancel the selection, and insert your snippet right after it.

If your cursor offset smaller than 0, and you have one or more selections, Fast Snippet will do the following steps:

- Cut all text in selection.
- Insert your sneppet.
- Move cursor according to cursor offset.
- Paste old selection text into current cursor position.

So if you have some text surrounded by selection, triggering `alt+(` in the example above will create a pair of `()` that surrounds your text.

## Next
Nothing in my mind yet, maybe you can tell me ?

-----
*Enjoy!*
