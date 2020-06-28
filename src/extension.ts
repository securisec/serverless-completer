import * as vscode from 'vscode';

import {
	getYamlApi,
	getSchemaContent,
	onRequestSchemaURI,
	SERVERLESS_YAML_SCHEMA
} from './yaml-complete/schema';

export async function activate(context: vscode.ExtensionContext) {
	const yamlApi = await getYamlApi();
	if (yamlApi) {
		const resolveSchemaContent = await getSchemaContent();
		yamlApi.registerContributor(
			SERVERLESS_YAML_SCHEMA,
			onRequestSchemaURI,
			() => resolveSchemaContent
		);
	}
}
