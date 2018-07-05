'use strict';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

// Allow for running under nodejs/requirejs in tests
const _monaco: typeof monaco = (typeof monaco === 'undefined' ? (<any>self).monaco : monaco);

interface ILang extends monaco.languages.ILanguageExtensionPoint {
    loader: () => monaco.Promise<ILangImpl>;
}

interface ILangImpl {
    conf: monaco.languages.LanguageConfiguration;
    language: monaco.languages.IMonarchLanguage;
}

let languageDefinitions: { [languageId: string]: ILang } = {};

function _loadLanguage(languageId: string): monaco.Promise<void> {
    const loader = languageDefinitions[languageId].loader;
    return loader().then((mod) => {
        _monaco.languages.setMonarchTokensProvider(languageId, mod.language);
        _monaco.languages.setLanguageConfiguration(languageId, mod.conf);
    });
}

let languagePromises: { [languageId: string]: monaco.Promise<void> } = {};

export function loadLanguage(languageId: string): monaco.Promise<void> {
    if (!languagePromises[languageId]) {
        languagePromises[languageId] = _loadLanguage(languageId);
    }
    return languagePromises[languageId];
}

export function registerLanguage(def: ILang): void {
    let languageId = def.id;

    languageDefinitions[languageId] = def;
    _monaco.languages.register(def);
    _monaco.languages.onLanguage(languageId, () => {
        loadLanguage(languageId);
    });
}