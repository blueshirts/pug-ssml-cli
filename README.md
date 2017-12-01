# pug-ssml-cli

A command line interpreter for the Pug SSML library to compile templates into a Node module.

## Installation

pug-ssml is a peer dependency and must be present so you can install the version of your choice.
It must be present in order to run the cli.

```bash
# Install the cli as a dev dependency.
npm install pug-ssml-cli --save-dev

# It is also required to install a version of pug-ssml.  You can install any compatible version.
npm install pug-ssml --version
```

You can now run the cli from the local bin directory. The cli is installed locally so that it can
stay self contained within your project directory.

```bash
./node_modules/.bin/pug-ssml --templates ./templates
```

## ToDo

Mixins
- Determine a better way of importing mixins.

Testing
- Add test cases and code coverage.

CI
- Add travis support.

Terminal input
- Accept input from the terminal.