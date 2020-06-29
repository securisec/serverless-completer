import * as vscode from 'vscode';
import $RefParser from '@apidevtools/json-schema-ref-parser'
import { join } from 'path';

export const SERVERLESS_YAML_SCHEMA = 'slsschema';

export const getYamlApi = async () => {
	const ext = vscode.extensions.getExtension('redhat.vscode-yaml');

	if (!ext) {
		vscode.window.showWarningMessage(
			"You must have 'YAML Support by Red Hat' installed in order to use this extension."
		);
		return undefined;
	}

	const yamlPlugin = await ext.activate();
	if (!yamlPlugin || !yamlPlugin.registerContributor) {
		vscode.window.showWarningMessage(
			"Please upgrade 'YAML Support by Red Hat' via the Extensions pane."
		);
		return undefined;
	}
	return yamlPlugin;
};

export function onRequestSchemaURI(resource: string): string | undefined {
	if (new RegExp(/serverless\.ya?ml/).test(resource)) {
		return `${SERVERLESS_YAML_SCHEMA}://schema/serverless`;
	}
	return undefined;
}

let responseCache = '';
export async function getSchemaContent() {
	if (responseCache !== '') {
		return responseCache;
	}
	try {
		let jsonPath = join(__dirname, '../../schemas/completer.json')
		let deref = await $RefParser.dereference(jsonPath)
		responseCache = JSON.stringify(deref)
		return responseCache;
	} catch (error) {
		console.log(error)
	}
}
