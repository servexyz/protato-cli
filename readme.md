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
  * <a href="https://github.com/servexyz/protato-lib/pull/6">protato-lib/pull/6</a> for a play-by-play of the discovery process(all the things to not do)
</details>

## Install

```
npm install -g protato
```

## Usage

### CLI `Config`

<details>
<summary>Name & Location</summary>
<b>.protato.js</b> should be stored in your project's root directory. If your root directory and your parent are one in the same, then set the directory to "."
</details>

<details>
<summary>Example</summary>

<pre><code class="language-javascript">
export default {
  parent: {
    dir: "sandbox/node-starter"
  },
  children: [
    {
      dir: "sandbox/npm-starter-sample-module",
      src: "src"
    },
    {
      dir: "sandbox/library-genesis",
      src: "src"
    }
  ]
};
</code></pre>

- <b><em>.protato.js</em></b> this file should be declared at the root of your project
- <b>parent</b> is your main project; your entry point. It will consume children modules and do something useful with them.
- <b>children</b> are the modules that will be "installed" into the parent module directory
- <b>"dir"</b> refers to the relative directory where your projects are stored <em>from</em> your current working directory. This value will default to `process.cwd()`. You can override this by setting the environment variable <code>process.env.configRootDir</code>
- <b>"src"</b> refers to the source directory where your source code is stored for your child project. It's the directory that's being watched. Hypothetically, you could make it your build directory as well if your project completely recompiles & rebuilds on every save (although I haven't tested this hypothetical; might be dragons here)
  </details>

### CLI `Commands`

| Name     | Description                                                      |
|:---------|:-----------------------------------------------------------------|
| `yalc`   | List your current packages; install yalc if directory not found. |
| `config` | Generate an empty config if you don't have one in your CWD.      |
| `watch`  | Begin watching your child modules for updates                    |

### CLI `Flags`

| Name     | Description                                          |
|:---------|:-----------------------------------------------------|
| `--link` | Add child package symlink in your parent project     |
| `--add`  | Pull child package contents into your parent project |
| `--help` | Print help menu                                      |