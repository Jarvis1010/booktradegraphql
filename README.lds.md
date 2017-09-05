# LDS Specific Fork of the React/Redux Project Starter

## Introduction

This is a fork of the react-starter on github. The ldsjs tool uses this Bitbucket repository to generate a new React project.

- [react-starter on Github](https://github.com/tuxsudo/react-starter)
- [react-starter on Bitbucket](https://code.ldschurch.org/git/projects/OWS/repos/react-starter/browse)

## How to contribute

LDS specific contributions should be added to this repository. Other contributions should be added directly to the github repository. Please fork the appropriate repository and create a pull request to have your changes reviewed and considered. It's always a good idea to ping the owners regarding the chance that your request will be accepted before spending time on the changes.

## FAQ

### How do I emulate WAM in development?

The [LDS Stack SSO Facade](https://code.ldschurch.org/git/projects/INPM/repos/lds-sso-facade/browse) is an `npm` module (`lds-sso-facade`) that provides staging LDS Account policy header injection to applications running in the local environment.

#### Configure your project

Add the following environment variables in `./.env`

```
API_HOST = https://localhost.lds.org:8443
WDS_PUBLIC_HOST = localhost.lds.org:8443
# Turning off certificat validation should only be done in development!!
NODE_TLS_REJECT_UNAUTHORIZED = "0"
```

- `API_HOST` should be set to the address that the sso-facade proxy is listening on.
- `WDS_PUBLIC_HOST` tells the webpack client piece where to find the webpack dev server.
- `NODE_TLS_REJECT_UNAUTHORIZED` is needed to disable SSL certificate validation (dev only!).

In `webpack.client.babel.js` modify the line that destructures `process.env` to include `WDS_PUBLIC_HOST`. In other words, add `WDS_PUBLIC_HOST` to the line that looks like:
```const {WDS_PORT, WDS_PUBLIC_HOST, PORT, APP_WEB_BASE_PATH} = process.env;```

Also in `webpack.client.babel.js` add the following setting to `devServer`:
```public: WDS_PUBLIC_HOST ```

Start your development server:
```$ npm run dev```

#### Install and run the LDS Stack SSO Facade

Install the Facade tool:
```$ npm install -g @lds/sso-facade --registry=http://icsnpm.ldschurch.org```

Run the Facade tool such that it proxies port 3000 (the webpack development server port) on port 8443:
```$ sso-facade 3000:/```

#### Open your site in the browser

You will get a certificate `warning` on the next step. Dismiss the browser's certificate warning to access your application. In order to use staging SSO in the local environment, the sso-facade must communicate over HTTPS, which requires the sso-facade to create a self-signed certificate at runtime.

Also notice the port number of 8443 which is not the standard port so don't leave it off.

Open your browser to https://localhost.lds.org:8443
```open https://localhost.lds.org```

Test your application with real staging accounts.
- To sign in via the sso-facade, append `?signmein` to the URL. Sign in with your own account or with any number of test accounts created exclusively for the stage environment (e.g. member02/password1).
- To sign out via the sso-facade, append `?signmeout` to the URL.

You can now configure your application to respond to the WAM headers, and test that it is responding properly.

Related documentation is available on [Integration Point](http://integration-point) and in the [LDS Stack SSO readme](https://code.ldschurch.org/git/projects/INPM/repos/lds-sso-facade/browse)
