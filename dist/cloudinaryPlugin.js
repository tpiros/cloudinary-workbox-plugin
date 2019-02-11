var cloudinaryPlugin = (function () {
  'use strict';

  /*
    Copyright 2019 Cloudinary Ltd. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  */
  const CloudinaryPlugin = {
    requestWillFetch(request) {
      if (/\.jpg$|\.png$|\.gif$|\.webp$/.test(request.url)) {
        const url = request.url.split('/');
        const insertIndex = url.indexOf('upload');
        let newPart;
        const format = 'f_auto';
        switch ((navigator && navigator.connection) ? navigator.connection.effectiveType : '') {
          case '4g':
            newPart = 'q_auto:good';
          break;
    
          case '3g':
            newPart = 'q_auto:eco';
          break;
    
          case'2g':
          case 'slow-2g':
            newPart = 'q_auto:low';
          break;
    
          default:
            newPart = 'q_auto:best';
          break;
        }
        url.splice(insertIndex + 1, 0, `${newPart},${format}`);
        const finalUrl = url.join('/');
        const newUrl = new URL(finalUrl);
        return new Request(newUrl.href, { headers: request.headers });
      }
    }
  };

  return CloudinaryPlugin;

}());
