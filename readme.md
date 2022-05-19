# Node and Express Tutorial

[Repository](https://github.com/john-smilga/node-express-course)
[Video-Course](https://www.youtube.com/watch?v=Oe421EPjeBE)

## Terms
- REPL is a Clojure Read-Eval-Print Loop, a programming environment, which enables the programmer to interact with a running Clojure program and modify it, by evaluating one code expression at a time. In this post by REPL I mean Clojure Read-Eval-Print Loop used in conjunction with a clj command-line tool, and a text editor capable of sending forms to this REPL, i.e. a standard REPL-aided development workflow;
- CLI is a command line interface, e.g. Unix shell — a command-line processor accepting commands one-at-a-time, a scripting language, and a set of tools;


## Built-in Modules of Node.js 
[Documentation Node 16](https://nodejs.org/dist/latest-v16.x/docs/api/) 
- [os](https://nodejs.org/dist/latest-v16.x/docs/api/os.html): Operating system-related utility methods and properties.

- [path](https://nodejs.org/dist/latest-v16.x/docs/api/path.html): Provides utilities for working file and directory paths.

- [fs](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html): Enables interacting with the file system in a way modeled on standard POSIX functions.

- [http](https://nodejs.org/dist/latest-v16.x/docs/api/http.html): HTTP interface API.


## NPM
npm is the world's largest Software Registry.The registry contains over 800,000 code packages.Open-source developers use npm to share software.Many organizations also use npm to manage private development.

- **Commands**
   - `npm --version`
   - local dependency, `npm i {packageName}`
   - global dependency, `npm install -g {packageName}`, `sudo npm install -g {packageName}`
   - package.json, `npm init`, `npm init -y`
   - dev dependency, `npm install {packageName} -D(or --save-dev)`
   - uninstall, `npm uninstall {packageName}`
   - install from package.json, `npm install`

[The basics of package.json](https://nodesource.com/blog/the-basics-of-package-json) 

## Event Loop

[Doc](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#:~:text=The%20event%20loop%20is%20what,operations%20executing%20in%20the%20background.)

[What is the event Loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

## Events 
- Event-Driven programming
- Used Heavily in Node.js

Listen for specific events to fire a function.

