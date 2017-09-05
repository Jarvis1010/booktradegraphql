# Release notes for the React/Redux Project Starter

## Version 2.2.1

June 5th, 2017

- Added ability to generate blank view & container 
- Added documentation about whitelister to the readme FAQ
- Fixed whitelister issue exposed by npm v5

## Version 2.2.0

May 26th, 2017

- Added sourcemap for easier debugging in the browser

## Version 2.1.0

May 18th, 2017

- Added instructions for using the SSO facade to emulate WAM
- Added tool to generate blank components. Usage: `npm run create:component MyThing`
- Fixed relative path for variables.css in component's style.css
- Resolved Button unit test error and renamed Button test file

## Version 2.0.3

May 10th, 2017

- Convert initial state to opaque, b64 string
- Use the most recent version of react-helmet
- Add Body Parser to Node

## Version 2.0.2

April 25th, 2017

- Update happypack to use .babelrc config

## Version 2.0.1

April 20th, 2017

- Add sourcemaps to webpack config
- Faster webpack build using happy pack
- Containers use more verbose and consistent syntax

## Version 2.0.0

February 6th, 2017

- Change development port to 3000, configurable via env variable
- Add support for apps hosted not on root
- Rename API env variable to API_HOST
- Add isomorphic 404 handling
- Add meta data wrapper for page components
- Fix dev server redirection bug
- Replace `classnames` with `join-classnames`
- Allow toggling of redux dev tools by env variable
- Add `system` state assets
- Demonstrate better redux practices
- Modify the Webpack config to exclude '.jsx' file extensions
- Auto-detect storybook stories
- Include fetch polyfill by default
- Add testing npm script and tests
- Add `react-router-redux` to fix time travel
- Add actions to programmatically change URL
- Add state management for page meta
- Remove HoC pattern from container; add meta support
- Fix HMR when `@import`ed CSS files change
- Extract main view components into view folder
- Update dependencies
- Update eslint settings to Facebook's recommended
- Add Facebook `.editorconfig`
- Update babel to use `latest` prefix
- Rename `lib` folder to hocs (higher order components)
- Remove useless demo route
- Add NPM module to detect if in browser
- Refine env variable sharing process
- Add html-to-jsx utility function
- Move eslint config to `.eslintrc.js`
- Qualify loader names for webpack
- Remove `.js` from imports
- Make the main landing page "pop" 😎, and easy to remove
- Clean up bundled HoCs
- Fix invalid mock nav data
- Other general code cleanup

Note: npm 3 or higher is required
