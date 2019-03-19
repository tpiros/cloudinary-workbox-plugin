# Cloudinary Workbox.js Plugin

The official [Cloudinary](http://cloudinary.com) plugin for [Workbox.js](https://developers.google.com/web/tools/workbox/).

# Usage instructions
The installation will place the plugin itself under the `node_modules` folder, therefore we'll need to copy it over to a location where we can use it from in the service worker. The easiest way to copy it would be via gulp:

```javascript
const copyCloudinaryPlugin = () => gulp.src(['node_modules/cloudinary-workbox-plugin/dist/cloudinaryPlugin.js']).pipe(gulp.dest('build'));
gulp.task('copy-cloudinary-plugin', copyCloudinaryPlugin);
```

To use the plugin, we'll need to make use of the `importScripts()` method which synchronously imports scripts into the service worker's scope. We can achieve this via Workbox's `generateSW()` method:

```javascript
const serviceWorkerImportscript = async () => {
  return await workboxBuild
  .generateSW({
    swDest: 'build/sw.js',
    globDirectory: 'build',
    importScripts: ['./cloudinaryPlugin.js'], // location of the plugin
    runtimeCaching: [{
      urlPattern: '/api/news',
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: 'api-cache',
      }
    }, {
      urlPattern: new RegExp('^https:\/\/res\.cloudinary\.com\/.*\/image\/upload\/'),
      handler: 'cacheFirst',
      options: {
        cacheName: 'cloudinary-images',
        plugins: [{
          requestWillFetch: async ({ request }) => cloudinaryPlugin.requestWillFetch(request)
        }]
      }
    }]
  });
};
```

> Note that copying the plugin should happen before the above build task.

## Prerequisite
If you'd like to modify / build this plugin make sure to install the dependencies first by running `npm i`.

## Build
To build the plugin please execute `npm run build`. The result of the build is going to be a `dist` folder with a single `cloudinaryPlugin.js` file along with a `cloudinaryPlugin.min.js` file for a minified build.

## Usage Instructions
For further information please visit [https://blog.fullstacktraining.com/a-cloudinary-plugin-for-workbox/](https://blog.fullstacktraining.com/a-cloudinary-plugin-for-workbox/)

## Test
To test the plugin please execute `npm test`.
