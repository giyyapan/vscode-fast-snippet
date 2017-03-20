'use strict';
import * as vscode from 'vscode';

const IDENTIFIER = "fastsnippet"

function insertText(args: [string, number, string[]]) {
    if (!args) {
        let msg = "Fast Snippet: Please don't use this command directly. Assign a command in your keybindings.json with argument instead.";
        vscode.window.showInformationMessage(msg);
        return
    }
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return
    }
    let [snippetString, cursorOffset = 0, externalCommands = []] = args;
    if (cursorOffset > 0) {
        vscode.window.showInformationMessage("Fast Snippet: cursorOffset must not bigger than 0");
        return
    }
    let hasSelection = false;
    editor.edit((editBuilder) => {
        editor.selections.forEach((selection) => {
            let selectionText = editor.document.getText(selection);
            if (selectionText.length > 0) hasSelection = true;
            let newText: string;
            if (cursorOffset == 0) {
                newText = selectionText + snippetString;
            } else {
                let idx = snippetString.length - 2 - cursorOffset;
                if (idx < 0) idx = 0;
                let textParts = snippetString.split("");
                textParts.splice(idx, 0, selectionText);
                newText = textParts.join("");
            }
            editBuilder.replace(selection, "");
            editBuilder.insert(selection.active, newText);
        })
    })
    // execute cursor commands
        vscode.commands.executeCommand("cancelSelection");
    if (cursorOffset != 0) {
        for (let i = 0; i > cursorOffset; i--) {
            vscode.commands.executeCommand("cursorLeft");
        }
    }
    setTimeout(() => {
        for (let arr = externalCommands, i = 0; i < arr.length; i++) {
            let cmd = arr[i];
            vscode.commands.executeCommand(cmd);
        }
    }, 40);
}

export function activate(context: vscode.ExtensionContext) {
    let commands = [
        vscode.commands.registerCommand(`${IDENTIFIER}.insertText`, (args) => {
            insertText(args)
        })
    ]

    context.subscriptions.push(...commands);
}

export function deactivate() {}