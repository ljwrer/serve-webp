# serve-webp
Create a new middleware function to serve images from within a given root directory. The images to serve will be determined by combining req.url with the provided root directory.
When browser support [webp](https://developers.google.com/speed/webp/),this module will convert the local images(jpg,gif,png) to webp and save into specify cache directory and response as webp,otherwise it will call next() to move on to the next middleware


# Installation
```bash
npm install serve-webp
```

# Usage

```js
const serveWebp = require('serve-webp');
const app = require('express')();
app.get('/*',serveWebp({
    root:path.resolve(process.cwd()),
    cache:path.resolve(process.cwd(),'webp')
}));


```

## config
### root
images root directory
```
use path.join(root, req.url) as file path
```

### cache
webp cache directory
