# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

`npx create-docusaurus@latest my-website classic  --typescript`

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


# Deploy to github page
需要注意你使用的shell环境
windows下有power shell, cmd, git bash
最好使用cmd

```
cmd /C "set "GIT_USER=Arterning" && yarn deploy"
```

Linux

```
GIT_USER=Arterning yarn deploy
```

# Add page 
Create new js or ts component under src/components directory, please notice your baseUrl configuration

for example if your baseUrl is just like following:

```
 baseUrl: '/blogs/',
```
so you should visit http://domain/blogs/helloReact

if you follow the official site, use `http://domain/helloReact`, it will return page not found error