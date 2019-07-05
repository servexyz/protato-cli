# Protato

> Hot-module updating

## FAQ

<details>
  <summary>What</summary>
Auto-update parent module when a child module's file changes.
</details>

<details>
  <summary>Why</summary>
There are a lot of great projects (lerna, yarn workspaces, vscode) that solve code organization issues. I wanted a tool that allowed me to translate a simple config and enable watching without any extra configuration.

I am using [repo-genesis](https://www.npmjs.com/package/repo-genesis) for managing my monoliths
</details>

<details>
  <summary>How</summary>
  Under the hood, this is using <a href="https://github.com/whitecolor/yalc">yalc</a> which avoids some of the pain points around NPM global modules. 
  
  The reason I went with yalc was because of the difficulty of installing or linking modules to a specific directory in a cross-platform way.
  
  <b>References</b>
  * <a href="https://docs.npmjs.com/files/folders">npm-folders</a>
  * <a href="https://github.com/servexyz/protato-lib/pull/6">protato-lib/pull/6</a> for a play-by-play of the discovery process... AKA. All the things to not do.)
</details>

## Install

```
npm install -g protato
```


## Usage

```
$ unicorn-fun --help

  Usage
    $ unicorn-fun [input]

  Options
    --postfix  Lorem ipsum  [Default: rainbows]

  Examples
    $ cli-name
    unicorns & rainbows
    $ cli-name ponies
    ponies & rainbows
```

## Related
