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

import assert from 'assert';
import Request from './Request.mjs';
import CloudinaryPlugin from '../index.mjs';

global.Request = Request;
global.url = 'https://res.cloudinary.com/tamas-demo/image/upload/sample.jpg';

describe('URL manipulation - 4G connection', () => {
  before(() => {
    global.navigator = {
      connection: {
        effectiveType: '4g'
      }
    };
  });
  it('should add "f_auto" and "q_auto:good" to URL', () => {
    const request = new global.Request(url);
    assert.equal('https://res.cloudinary.com/tamas-demo/image/upload/q_auto:good,f_auto/sample.jpg', CloudinaryPlugin.requestWillFetch(request).url);
  });
});

describe('URL manipulation - 3G connection', () => {
  before(() => {
    global.navigator = {
      connection: {
        effectiveType: '3g'
      }
    };
  });
  it('should add "f_auto" and "q_auto:eco" to URL', () => {
    const request = new global.Request(url);
    assert.equal('https://res.cloudinary.com/tamas-demo/image/upload/q_auto:eco,f_auto/sample.jpg', CloudinaryPlugin.requestWillFetch(request).url);
  });
});

describe('URL manipulation - 2G connection', () => {
  before(() => {
    global.navigator = {
      connection: {
        effectiveType: 'slow-2g'
      }
    };
  });
  it('should add "f_auto" and "q_auto:low" to URL (Slow 2g)', () => {
    const request = new global.Request(url);
    assert.equal('https://res.cloudinary.com/tamas-demo/image/upload/q_auto:low,f_auto/sample.jpg', CloudinaryPlugin.requestWillFetch(request).url);
  });
  before(() => {
    global.navigator = {
      connection: {
        effectiveType: '2g'
      }
    };
  });
  it('should add "f_auto" and "q_auto:low" to URL (2g)', () => {
    const request = new global.Request(url);
    assert.equal('https://res.cloudinary.com/tamas-demo/image/upload/q_auto:low,f_auto/sample.jpg', CloudinaryPlugin.requestWillFetch(request).url);
  });
});

describe('URL manipulation - no connection information', () => {
  before(() => {
    global.navigator = {
      connection: {
        effectiveType: ''
      }
    };
  });
  it('should add "f_auto" and "q_auto:best" to URL', () => {
    const request = new global.Request(url);
    assert.equal('https://res.cloudinary.com/tamas-demo/image/upload/q_auto:best,f_auto/sample.jpg', CloudinaryPlugin.requestWillFetch(request).url);
  });
});

describe('URL manipulation - extra folder', () => {
  const url = 'https://res.cloudinary.com/tamas-demo/image/upload/project/sample.jpg'
  before(() => {
    global.navigator = {
      connection: {
        effectiveType: ''
      }
    };
  });
  it('should add "f_auto" and "q_auto:best" to URL', () => {
    const request = new global.Request(url);
    assert.equal('https://res.cloudinary.com/tamas-demo/image/upload/q_auto:best,f_auto/project/sample.jpg', CloudinaryPlugin.requestWillFetch(request).url);
  });
});