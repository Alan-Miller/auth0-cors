## Troubleshooting
```sh
/Users/Home/dev/auth0-cors/node_modules/passport-auth0/lib/index.js:35
    if(!options[k]){
               ^

TypeError: Cannot read property 'domain' of undefined
    at /Users/Home/dev/auth0-cors/node_modules/passport-auth0/lib/index.js:35:16
    at Array.forEach (<anonymous>)
    at new Strategy (/Users/Home/dev/auth0-cors/node_modules/passport-auth0/lib/index.js:34:20)
    at Object.<anonymous> (/Users/Home/dev/auth0-cors/server/server.js:15:14)
    at Module._compile (module.js:635:30)
    at Object.Module._extensions..js (module.js:646:10)
    at Module.load (module.js:554:32)
    at tryModuleLoad (module.js:497:12)
    at Function.Module._load (module.js:489:3)
    at Function.Module.runMain (module.js:676:10)
[nodemon] app crashed - waiting for file changes before starting...
```
Invoked new Auth0Strategy incorrectly (added comma after Auth0Strategy).