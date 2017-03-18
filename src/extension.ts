'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const COMMAND_PREFIX = "fastsnippet"

function insertText(editor: vscode.TextEditor, args: [string, number, string[]]) {
    if (!args) {
        let msg = "Fast Snippet: Please don't use this command directly. Assign a command in your keybindings.json with argument instead.";
        vscode.window.showInformationMessage(msg);
        return
    }
    let [snippetString, cursorOffset = 0, externalCommands = []] = args;
    let selectionTexts: string[] = []
    editor.edit((editBuilder) => {
        editor.selections.forEach((selection) => {
            selectionTexts.push(editor.document.getText(selection));
            editBuilder.replace(selection, "");
            editBuilder.insert(selection.active, snippetString);
        })
    })
    // execute cursor commands
    let cmds: string[] = ["cancelSelection"];
    if (cursorOffset > 0) {
        for (let i = 0; i < cursorOffset; i++) {
            cmds.push("cursorRight");
        }
    } else {
        for (let i = 0; i > cursorOffset; i--) {
            cmds.push("cursorLeft");
        }
    }
    cmds.forEach((cmd) => {
        vscode.commands.executeCommand(cmd);
    })
    setTimeout(function () {
        editor.edit((editBuilder) => {
            editor.selections.forEach((selection, index) => {
                console.log(`insert ${selectionTexts[index]} to ${selection.active.character}`);
                editBuilder.insert(selection.active, selectionTexts[index]);
            })
            // execute external commands
        })
        for (let arr = externalCommands, i = 0; i < arr.length; i++) {
            let cmd = arr[i];
            vscode.commands.executeCommand(cmd);
        }
    }, 40);
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let commands = [
        vscode.commands.registerTextEditorCommand(`${COMMAND_PREFIX}.insertText`, (editor, edit, args) => {
            insertText(editor, args)
        })
    ]

    context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {
}