# Kit Run Command Faster

## Description
* Kit written by nodejs. It will run command faster and support for Linux and Darwin.

## Requried
* NodeJS >= 10 and NPM.

## Install
```shell
$ npm install -g kit-command --unsafe
```

## How to use

##### 1. kit pwd
* Run command `kit pwd` : Print current working directory and copy it to clipboard.

##### 2. kit project
* Run command `kit project .` : Save info project current working directory.
* Run command `kit project list` : List all project saved.
- **if you want to delete or update**
* Run command `kit project list --drop [projectId]` : Delete info project saved with id.
* Run command `kit project list --update [projectId]` : Update info project saved with id.

##### 2. kit open
* Run command `kit open <project>` : `[<project>]` is optional. It could `projectId` or `host`. Default open with vscode.

##### 2. kit create-project
* Run command `kit create-project`: Choose project and enter.
* * 1. React Native version 0.63
