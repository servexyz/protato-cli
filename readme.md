![protato logo](./docs/logo/protato.svg)

![travis CI](https://travis-ci.org/servexyz/protato-cli.svg?branch=master)
> HMR. Auto-update parent module's child dependency when you update a child dependency's file

## FAQ

<details>
  <summary>What</summary>
Auto-update parent module when a child module's file changes.
</details>

<details>
  <summary>Why</summary>
There are a lot of great projects (lerna, yarn workspaces, vscode) that solve code organization issues. I wanted a HMR tool that parsed a config and worked with my monolith tool of choice ( <a href="https://www.npmjs.com/package/repo-genesis">repo-genesis</a> )

This is a summary of how Protato fits into my design/development flow.
<img src="./docs/Flows - UI - Protato - Protato - Tech Summary.png" alt="protato tech summary"/>
</details>

<details>
  <summary>How</summary>
  Under the hood, this is using <a href="https://github.com/whitecolor/yalc">yalc</a> which avoids some of the pain points around NPM global modules. 
  
  The reason I went with yalc was because of the difficulty of installing or linking modules to a specific directory in a cross-platform way.
  
  <b>References</b>
  * <a href="https://docs.npmjs.com/files/folders">npm-folders</a>
  * <a href="https://github.com/servexyz/protato-lib/pull/6">protato-lib/pull/6</a> for a play-by-play of the discovery process(all the things to not do)
</details>

<details>
<summary>"Protato"</summary>
The logo consists of a potato replacing the blue crystal in a Protoss <a href="https://liquipedia.net/starcraft2/Pylon_(Legacy_of_the_Void)">Pylon</a>
<br />
<br />
<ul>
  <li>“Protato” is a portmanteau of “potato” and “protoss”</li>
  <ul>
    <li>“Potato” from “hot potato”</li>
    <li>“Protoss” because of 2-way teleporting (warp gate, recall, etc)</li>
  </ul>
</ul>

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
export const config = {
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

| Status | Name     | Description                                                      |
|:-------|:---------|:-----------------------------------------------------------------|
| :x:    | `yalc`   | List your current packages; install yalc if directory not found. |
| :x:    | `config` | Generate an empty config if you don't have one in your CWD.      |
| :x:    | `watch`  | Begin watching your child modules for updates                    |

### CLI `Flags`

| Status | Name     | Description                                          |
|:-------|:---------|:-----------------------------------------------------|
| :x:    | `--link` | Add child package symlink in your parent project     |
| :x:    | `--add`  | Pull child package contents into your parent project |
| :x:    | `--help` | Print help menu                                      |
