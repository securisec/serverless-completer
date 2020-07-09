# Serverless completer for VSCode
A VsCode plugin that provides intellisense and linting for `serverless.yml` files. The plugin is not a snippet library, but more of a serverless.yaml file linter. This is based on the examples provided in the serverless framework website.

Currently covers: 
- Most of the AWS configurations
- Most of the Lambda event triggers
- intellisense for various CloudFormation resources including types, and their properties (more added all the time)
- Various plugins and their custom setup:
    - serverless-localstack
    - serverless-python-requirements
    - serverless-plugin-typescript
    - serverless-webpack
    - serverless-offline
    - serverless-go-plugin

## WIP
Pull requests are very welcome. 

## Help
Would love pull requests to cover more of the following:
- CloudFormation resources. Check out examples in `schmemas/aws/cf` directory
- Other providers like azure, gcp etc

## Install
- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=securisec.serverless-completer)
- Or clone the repo and build with `vsce package` and install VSIX file from VS Code. 


VSCode extension that provides linting and intellisense for serverless.yaml files. 

Pull requests are welcome! 

## Demo
![](https://i.imgur.com/VzPWZDK.gif)

### Resourecs
- [AWS](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/)