> Expect this project to have worse maintainance than [degit](https://github.com/Rich-Harris/degit) or [tiged](https://github.com/tiged/tiged)(which is going to be used as upstream)

# a smidge more "de-gited" degit

---

### Why ?

If, for some odd reason, you need to use degit to programmatically get stuff from github and you want to use degit but you can't count on git being the your users machines then you can use degitdegit which relies on isomorphic-git (which makes it heavier obviously)

---

**degit** makes copies of git repositories. When you run `degit some-user/some-repo`, it will find the latest commit on https://github.com/some-user/some-repo and download the associated tar file to `~/.degit/some-user/some-repo/commithash.tar.gz` if it doesn't already exist locally. (This is much quicker than using `git clone`, because you're not downloading the entire git history.)

_Requires Node 8 or above, because `async` and `await` are the cat's pyjamas_

## Installation

```bash
npm i --save degitdegit
```

## Usage

## Basics

```js
const degit = require('degitdegit');

const emitter = degit('user/repo', {
	cache: true,
	force: true,
	verbose: true
});

emitter.on('info', info => {
	console.log(info.message);
});

emitter.clone('path/to/dest').then(() => {
	console.log('done');
});
```

The simplest use of degit is to download the master branch of a repo from GitHub to the current working directory:

```js
degit('user/repo');

//these are equivalent
degit('github:user/repo');
degit('git@github.com:user/repo');
degit('https://github.com/user/repo');
```

Or you can download from GitLab and BitBucket:  
(won't be actively tested)

```js
//download from GitLab
degit('gitlab:user/repo');
degit('git@gitlab.com:user/repo');
degit('https://gitlab.com/user/repo');

//download from BitBucket
degit('bitbucket:user/repo');
degit('git@bitbucket.org:user/repo');
degit('https://bitbucket.org/user/repo');

//download from Sourcehut
degit('git.sr.ht/user/repo');
degit('git@git.sr.ht:user/repo');
degit('https://git.sr.ht/user/repo');
```

### Specify a tag, branch or commit

```js
degit('user/repo#dev'); //branch
degit('user/repo#v1.2.3'); //release tag
degit('user/repo#1234abcd'); //commit hash
```

### Specify a subdirectory

To clone a specific subdirectory instead of the entire repo, just add it to the argument:

```js
degit('user/repo/subdirectory');
```

### Private repositories

Private repos can be cloned by specifying `--mode=git` (the default is `tar`). In this mode, Degit will use `git` under the hood. It's much slower than fetching a tarball, which is why it's not the default.

Note: this clones over SSH, not HTTPS.

## Wait, isn't this just `git clone --depth 1`?

A few salient differences:

- If you `git clone`, you get a `.git` folder that pertains to the project template, rather than your project. You can easily forget to re-init the repository, and end up confusing yourself
- Caching and offline support (if you already have a `.tar.gz` file for a specific commit, you don't need to fetch it again).
- Less to type (`degit user/repo` instead of `git clone --depth 1 git@github.com:user/repo`)
- Composability via [actions](#actions)
- Future capabilities — [interactive mode](https://github.com/Rich-Harris/degit/issues/4), [friendly onboarding and postinstall scripts](https://github.com/Rich-Harris/degit/issues/6)

## Actions

You can manipulate repositories after they have been cloned with _actions_, specified in a `degit.json` file that lives at the top level of the working directory. Currently, there are two actions — `clone` and `remove`. Additional actions may be added in future.

### clone

```json
// degit.json
[
	{
		"action": "clone",
		"src": "user/another-repo"
	}
]
```

This will clone `user/another-repo`, preserving the contents of the existing working directory. This allows you to, say, add a new README.md or starter file to a repo that you do not control. The cloned repo can contain its own `degit.json` actions.

### remove

```json
// degit.json
[
	{
		"action": "remove",
		"files": ["LICENSE"]
	}
]
```

Remove a file at the specified path.

## See also

- [zel](https://github.com/vutran/zel) by [Vu Tran](https://twitter.com/tranvu)
- [gittar](https://github.com/lukeed/gittar) by [Luke Edwards](https://twitter.com/lukeed05)

## License

[MIT](LICENSE.md).
