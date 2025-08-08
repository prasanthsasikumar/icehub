import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, getCookie, getHeader, getMethod, setCookie, deleteCookie, setHeader, readMultipartFormData, getResponseStatusText } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import path, { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/@vue/shared/dist/shared.cjs.js';
import bcrypt from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/bcrypt/bcrypt.js';
import { v4 } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/uuid/dist/esm/index.js';
import jwt from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/jsonwebtoken/index.js';
import { put } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/@vercel/blob/dist/index.js';
import { promises } from 'node:fs';
import { createClient } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/@supabase/supabase-js/dist/main/index.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/nitropack/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/errx/dist/index.js';
import { isVNode, toValue, isRef } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/vue/index.mjs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/unhead/dist/server.mjs';
import { renderToString } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/vue/server-renderer/index.mjs';
import { walkResolver } from 'file:///Users/prasanthsasikumar/Documents/GitHub/icehub/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/prasanthsasikumar/Documents/GitHub/icehub/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/prasanthsasikumar/Documents/GitHub/icehub","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/prasanthsasikumar/Documents/GitHub/icehub/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/prasanthsasikumar/Documents/GitHub/icehub/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/prasanthsasikumar/Documents/GitHub/icehub/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/prasanthsasikumar/Documents/GitHub/icehub/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/": {
        "prerender": true
      },
      "/teams/**": {
        "isr": 60,
        "headers": {
          "Cache-Control": "s-maxage=60"
        }
      },
      "/api/teams/**": {
        "cors": true,
        "headers": {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "*",
          "access-control-allow-headers": "*",
          "access-control-max-age": "0",
          "Cache-Control": "s-maxage=30",
          "Access-Control-Allow-Origin": "*"
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _lGPwgk_1tWcSz96bDwvTewtBNKdX6lAcUru2zxNV9VQ = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/prasanthsasikumar/Documents/GitHub/icehub";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, viewport-fit=cover"},{"name":"format-detection","content":"telephone=no"}],"link":[{"rel":"icon","type":"image/svg+xml","href":"/favicon.svg"},{"rel":"alternate icon","href":"/favicon.ico"},{"rel":"apple-touch-icon","sizes":"180x180","href":"/favicon.svg"}],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _imlJlEtcYUErFKlIoV3o40RwAHyYMj1YM8ArfD1nFG0 = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _lGPwgk_1tWcSz96bDwvTewtBNKdX6lAcUru2zxNV9VQ,
_imlJlEtcYUErFKlIoV3o40RwAHyYMj1YM8ArfD1nFG0
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"318ae-lBXQ1Fl0mJmIHZ2yZUUzwSTpKco\"",
    "mtime": "2025-08-08T05:41:31.731Z",
    "size": 202926,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"b13e8-lwFHenCVcBKuSQ9Qpvm95BhcToQ\"",
    "mtime": "2025-08-08T05:41:31.731Z",
    "size": 725992,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _8dfJm_ = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file:///Users/prasanthsasikumar/Documents/GitHub/icehub/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file:///Users/prasanthsasikumar/Documents/GitHub/icehub/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
      const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
      const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
      const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
      return appTemplate + loaderTemplate;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (error) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", error);
    throw error;
  });
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_3VIfLL = () => Promise.resolve().then(function () { return addUserToTeam_post$1; });
const _lazy_BHpmOL = () => Promise.resolve().then(function () { return create_post$3; });
const _lazy_j59clI = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_TcjyYq = () => Promise.resolve().then(function () { return restore_post$1; });
const _lazy_hiK3Zm = () => Promise.resolve().then(function () { return bulkCreateUsers_post$1; });
const _lazy_6ilHbl = () => Promise.resolve().then(function () { return deleteUser_delete$1; });
const _lazy_9qII0L = () => Promise.resolve().then(function () { return resetPassword_post$1; });
const _lazy_X46lLS = () => Promise.resolve().then(function () { return toggleRole_post$1; });
const _lazy_jFB6u3 = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_HLNQ5j = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_TpPcI3 = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_Mse3dG = () => Promise.resolve().then(function () { return admin_get$1; });
const _lazy_Us_3zY = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_G6ZFJ3 = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_XYs2hc = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_sfy6lD = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_QtDuhZ = () => Promise.resolve().then(function () { return me_get$1; });
const _lazy_Z_k7UE = () => Promise.resolve().then(function () { return register_post$1; });
const _lazy_HItsH8 = () => Promise.resolve().then(function () { return conversations_get$1; });
const _lazy_ttNtBU = () => Promise.resolve().then(function () { return messages_get$1; });
const _lazy_nCeQW7 = () => Promise.resolve().then(function () { return send_post$1; });
const _lazy_0X8xDp = () => Promise.resolve().then(function () { return status_get$1; });
const _lazy_Cn2ye5 = () => Promise.resolve().then(function () { return testUpload_post$1; });
const _lazy_nvt3qp = () => Promise.resolve().then(function () { return gallery_get$1; });
const _lazy_srlr7l = () => Promise.resolve().then(function () { return proxyImage_get$1; });
const _lazy_HejCb8 = () => Promise.resolve().then(function () { return skills$1; });
const _lazy_w7ePJD = () => Promise.resolve().then(function () { return complete_get$1; });
const _lazy_xNBtKJ = () => Promise.resolve().then(function () { return delete_delete$1; });
const _lazy_J70_p5 = () => Promise.resolve().then(function () { return images_get$1; });
const _lazy_Case9e = () => Promise.resolve().then(function () { return images_post$1; });
const _lazy_TOpMPX = () => Promise.resolve().then(function () { return _imageId__delete$1; });
const _lazy_X7rScc = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_Bc46BS = () => Promise.resolve().then(function () { return join_post$1; });
const _lazy_4W2Kfz = () => Promise.resolve().then(function () { return leave_post$1; });
const _lazy_N0wkGH = () => Promise.resolve().then(function () { return links_get$1; });
const _lazy_0xoTJ6 = () => Promise.resolve().then(function () { return links_post$1; });
const _lazy_QdJ6da = () => Promise.resolve().then(function () { return _linkId__delete$1; });
const _lazy_PlLZQY = () => Promise.resolve().then(function () { return update_put$1; });
const _lazy_WcKr2s = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy_dYTeGo = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy__RvuYf = () => Promise.resolve().then(function () { return optimization_get$1; });
const _lazy_oEw_c6 = () => Promise.resolve().then(function () { return upload_post$1; });
const _lazy_GGJj8N = () => Promise.resolve().then(function () { return user_get$1; });
const _lazy_YqJ3kE = () => Promise.resolve().then(function () { return updatePassword_post$1; });
const _lazy_oxtIvS = () => Promise.resolve().then(function () { return update_post$1; });
const _lazy_VljHyK = () => Promise.resolve().then(function () { return users$1; });
const _lazy_mqZ_dN = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _8dfJm_, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/add-user-to-team', handler: _lazy_3VIfLL, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/backup/create', handler: _lazy_BHpmOL, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/backup', handler: _lazy_j59clI, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/backup/restore', handler: _lazy_TcjyYq, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/bulk-create-users', handler: _lazy_hiK3Zm, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/delete-user', handler: _lazy_6ilHbl, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/reset-password', handler: _lazy_9qII0L, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/toggle-role', handler: _lazy_X46lLS, lazy: true, middleware: false, method: "post" },
  { route: '/api/announcements/:id', handler: _lazy_jFB6u3, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcements/:id', handler: _lazy_HLNQ5j, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements/:id', handler: _lazy_TpPcI3, lazy: true, middleware: false, method: "put" },
  { route: '/api/announcements/admin', handler: _lazy_Mse3dG, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements', handler: _lazy_Us_3zY, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements', handler: _lazy_G6ZFJ3, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_XYs2hc, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_sfy6lD, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/me', handler: _lazy_QtDuhZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/register', handler: _lazy_Z_k7UE, lazy: true, middleware: false, method: "post" },
  { route: '/api/chat/conversations', handler: _lazy_HItsH8, lazy: true, middleware: false, method: "get" },
  { route: '/api/chat/messages', handler: _lazy_ttNtBU, lazy: true, middleware: false, method: "get" },
  { route: '/api/chat/send', handler: _lazy_nCeQW7, lazy: true, middleware: false, method: "post" },
  { route: '/api/debug/status', handler: _lazy_0X8xDp, lazy: true, middleware: false, method: "get" },
  { route: '/api/debug/test-upload', handler: _lazy_Cn2ye5, lazy: true, middleware: false, method: "post" },
  { route: '/api/media/gallery', handler: _lazy_nvt3qp, lazy: true, middleware: false, method: "get" },
  { route: '/api/proxy-image', handler: _lazy_srlr7l, lazy: true, middleware: false, method: "get" },
  { route: '/api/skills', handler: _lazy_HejCb8, lazy: true, middleware: false, method: undefined },
  { route: '/api/teams/:id/complete', handler: _lazy_w7ePJD, lazy: true, middleware: false, method: "get" },
  { route: '/api/teams/:id/delete', handler: _lazy_xNBtKJ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/teams/:id/images', handler: _lazy_J70_p5, lazy: true, middleware: false, method: "get" },
  { route: '/api/teams/:id/images', handler: _lazy_Case9e, lazy: true, middleware: false, method: "post" },
  { route: '/api/teams/:id/images/:imageId', handler: _lazy_TOpMPX, lazy: true, middleware: false, method: "delete" },
  { route: '/api/teams/:id', handler: _lazy_X7rScc, lazy: true, middleware: false, method: "get" },
  { route: '/api/teams/:id/join', handler: _lazy_Bc46BS, lazy: true, middleware: false, method: "post" },
  { route: '/api/teams/:id/leave', handler: _lazy_4W2Kfz, lazy: true, middleware: false, method: "post" },
  { route: '/api/teams/:id/links', handler: _lazy_N0wkGH, lazy: true, middleware: false, method: "get" },
  { route: '/api/teams/:id/links', handler: _lazy_0xoTJ6, lazy: true, middleware: false, method: "post" },
  { route: '/api/teams/:id/links/:linkId', handler: _lazy_QdJ6da, lazy: true, middleware: false, method: "delete" },
  { route: '/api/teams/:id/update', handler: _lazy_PlLZQY, lazy: true, middleware: false, method: "put" },
  { route: '/api/teams/create', handler: _lazy_WcKr2s, lazy: true, middleware: false, method: "post" },
  { route: '/api/teams', handler: _lazy_dYTeGo, lazy: true, middleware: false, method: "get" },
  { route: '/api/test/optimization', handler: _lazy__RvuYf, lazy: true, middleware: false, method: "get" },
  { route: '/api/upload', handler: _lazy_oEw_c6, lazy: true, middleware: false, method: "post" },
  { route: '/api/user', handler: _lazy_GGJj8N, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/update-password', handler: _lazy_YqJ3kE, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/update', handler: _lazy_oxtIvS, lazy: true, middleware: false, method: "post" },
  { route: '/api/users', handler: _lazy_VljHyK, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_mqZ_dN, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_mqZ_dN, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.absolute{position:absolute}.top-6{top:1.5rem}.z-10{z-index:10}.mx-auto{margin-left:auto;margin-right:auto}.mb-4{margin-bottom:1rem}.mb-8{margin-bottom:2rem}.inline-block{display:inline-block}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.border{border-width:1px}.border-b-0{border-bottom-width:0}.border-black\\/5{border-color:#0000000d}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-gray-50\\/50{background-color:#f5f5f580}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-12{padding-top:3rem}.text-6xl{font-size:3.75rem;line-height:1}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.hover\\:text-\\[\\#00DC82\\]:hover{--un-text-opacity:1;color:rgb(0 220 130/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.hover\\:underline:hover{text-decoration-line:underline}.underline-offset-3{text-underline-offset:3px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:border-white\\/10{border-color:#ffffff1a}.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:bg-white\\/5{background-color:#ffffff0d}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:right-6{right:1.5rem}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white flex flex-col font-sans min-h-screen pt-12 px-10 text-black"><h1 class="font-medium mb-4 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><a href="https://nuxt.com/docs/getting-started/error-handling?utm_source=nuxt-error-dev-page" target="_blank" class="absolute font-medium hover:text-[#00DC82] hover:underline inline-block mx-auto sm:right-6 text-sm top-6 underline-offset-3">Customize this page</a><div class="bg-gray-50/50 border border-b-0 border-black/5 dark:bg-white/5 dark:border-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET$2 = process.env.JWT_SECRET || "your-secret-key-change-in-production";
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET$2);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      userRole: decoded.userRole || "participant"
      // Default to participant for existing users
    };
  } catch {
    return null;
  }
}
function getUserFromRequest(event) {
  var _a;
  const token = getCookie(event, "auth-token") || ((_a = getHeader(event, "authorization")) == null ? void 0 : _a.replace("Bearer ", ""));
  if (!token) return null;
  return verifyToken(token);
}
async function requireAuth(event) {
  const user = getUserFromRequest(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  return user;
}

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
class Database {
  // Users
  static async getUsers() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getUserById(id) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  }
  static async getUsersByIds(ids) {
    if (ids.length === 0) return [];
    const { data, error } = await supabase.from("users").select("*").in("id", ids);
    if (error) throw error;
    return data || [];
  }
  // Method to simulate old approach (for comparison purposes)
  static async getUsersByIdsOldWay(ids) {
    if (ids.length === 0) return [];
    console.log(`\u{1F40C} Old approach: Making ${ids.length} individual database calls...`);
    const startTime = Date.now();
    const users = [];
    for (const id of ids) {
      try {
        const user = await this.getUserById(id);
        if (user) {
          users.push(user);
        }
      } catch (error) {
        console.error(`Failed to get user ${id}:`, error);
      }
    }
    const endTime = Date.now();
    console.log(`\u{1F40C} Old approach completed in ${endTime - startTime}ms with ${ids.length} database calls`);
    return users;
  }
  static async getUserByEmail(email) {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
    if (error && error.code !== "PGRST116") throw error;
    return data;
  }
  static async getUserByName(name) {
    const { data, error } = await supabase.from("users").select("*").eq("name", name).single();
    if (error && error.code !== "PGRST116") throw error;
    return data;
  }
  static async createUser(user) {
    const { data, error } = await supabase.from("users").insert([user]).select().single();
    if (error) throw error;
    return data;
  }
  static async updateUser(id, updates) {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  static async deleteUser(id) {
    try {
      console.log(`Starting cascade deletion for user: ${id}`);
      console.log("Deleting user messages...");
      const { error: sentMessagesError } = await supabaseAdmin.from("messages").delete().eq("senderId", id);
      if (sentMessagesError) {
        console.warn("Error deleting sent messages:", sentMessagesError);
      }
      const { error: receivedMessagesError } = await supabaseAdmin.from("messages").delete().eq("receiverId", id);
      if (receivedMessagesError) {
        console.warn("Error deleting received messages:", receivedMessagesError);
      }
      console.log("Updating teams to remove user...");
      const { data: allTeams } = await supabaseAdmin.from("teams").select("id, members");
      if (allTeams) {
        for (const team of allTeams) {
          let needsUpdate = false;
          let updatedMembers = team.members;
          if (team.members) {
            let members;
            try {
              if (typeof team.members === "string") {
                try {
                  members = JSON.parse(team.members);
                } catch (jsonError) {
                  members = [];
                }
              } else if (Array.isArray(team.members)) {
                members = team.members;
              } else {
                members = [];
              }
            } catch (e) {
              members = [];
            }
            if (Array.isArray(members)) {
              const cleanMembers = members.map((member) => {
                if (typeof member === "string") {
                  try {
                    return JSON.parse(member);
                  } catch {
                    return null;
                  }
                }
                return member;
              }).filter(Boolean);
              const filteredMembers = cleanMembers.filter((member) => member.userId !== id);
              if (filteredMembers.length !== cleanMembers.length) {
                updatedMembers = filteredMembers;
                needsUpdate = true;
              }
            }
          }
          if (needsUpdate) {
            console.log(`Updating team ${team.id} to remove user ${id}`);
            const { error: updateError } = await supabaseAdmin.from("teams").update({ members: updatedMembers }).eq("id", team.id);
            if (updateError) {
              console.warn(`Error updating team ${team.id}:`, updateError);
            }
          }
        }
      }
      console.log(`Checking if user exists: ${id}`);
      const { data: existingUser, error: checkError } = await supabase.from("users").select("*").eq("id", id).single();
      if (checkError) {
        console.log("User check error:", checkError);
        if (checkError.code === "PGRST116") {
          throw new Error("User not found");
        }
        throw checkError;
      }
      console.log("User found:", existingUser);
      console.log(`Attempting to delete user with admin client: ${id}`);
      const { data: deleteData, error: deleteError, count } = await supabaseAdmin.from("users").delete().eq("id", id);
      console.log("Admin delete result:", { data: deleteData, error: deleteError, count });
      if (deleteError) {
        console.log("Admin delete error details:", deleteError);
        throw deleteError;
      }
      const { data, error } = await supabaseAdmin.from("users").select("*").eq("id", id).single();
      console.log("User lookup after admin delete:", { data, error });
      if (data && !error) {
        throw new Error("Admin delete operation failed - user still exists");
      }
      console.log("User successfully deleted with admin privileges");
      return { id, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error in deleteUser:", error);
      throw error;
    }
  }
  // Messages
  static async getMessages() {
    const { data, error } = await supabase.from("messages").select("*").order("timestamp", { ascending: true });
    if (error) throw error;
    return data || [];
  }
  static async getMessagesBetweenUsers(userId1, userId2) {
    const { data, error } = await supabase.from("messages").select("*").or(`and(senderId.eq.${userId1},receiverId.eq.${userId2}),and(senderId.eq.${userId2},receiverId.eq.${userId1})`).order("timestamp", { ascending: true });
    if (error) throw error;
    return data || [];
  }
  static async createMessage(message) {
    const { data, error } = await supabase.from("messages").insert([message]).select().single();
    if (error) throw error;
    return data;
  }
  // Teams
  static async getTeams() {
    const { data, error } = await supabase.from("teams").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getTeamById(id) {
    const { data, error } = await supabase.from("teams").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  }
  static async createTeam(team) {
    const teamWithId = {
      id: team.id || crypto.randomUUID(),
      ...team
    };
    const { data, error } = await supabase.from("teams").insert([teamWithId]).select().single();
    if (error) throw error;
    return data;
  }
  static async updateTeam(id, updates) {
    const { data, error } = await supabase.from("teams").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  static async deleteTeam(id) {
    const { data, error } = await supabase.from("teams").delete().eq("id", id);
    if (error) throw error;
    return data;
  }
  // Team Chats
  static async getTeamChats() {
    const { data, error } = await supabase.from("team_chats").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getTeamChatById(id) {
    const { data, error } = await supabase.from("team_chats").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  }
  static async createTeamChat(teamChat) {
    const teamChatWithId = {
      id: teamChat.id || crypto.randomUUID(),
      ...teamChat
    };
    const { data, error } = await supabase.from("team_chats").insert([teamChatWithId]).select().single();
    if (error) throw error;
    return data;
  }
  static async updateTeamChat(id, updates) {
    const { data, error } = await supabase.from("team_chats").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  // Team Links
  static async getTeamLinks(teamId) {
    const { data, error } = await supabase.from("team_links").select("*").eq("team_id", teamId).order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }
  static async createTeamLink(link) {
    const linkWithId = {
      id: link.id || crypto.randomUUID(),
      ...link
    };
    const { data, error } = await supabase.from("team_links").insert([linkWithId]).select().single();
    if (error) throw error;
    return data;
  }
  static async deleteTeamLink(id) {
    const { data, error } = await supabase.from("team_links").delete().eq("id", id);
    if (error) throw error;
    return data;
  }
  // Team Images
  static async getTeamImages(teamId) {
    const { data, error } = await supabase.from("team_images").select("*").eq("team_id", teamId).order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }
  static async createTeamImage(image) {
    const imageWithId = {
      id: image.id || crypto.randomUUID(),
      ...image
    };
    const { data, error } = await supabase.from("team_images").insert([imageWithId]).select().single();
    if (error) throw error;
    return data;
  }
  static async deleteTeamImage(id) {
    const { data, error } = await supabase.from("team_images").delete().eq("id", id);
    if (error) throw error;
    return data;
  }
  // Legacy compatibility methods for teams API
  static async getteams() {
    return this.getTeams();
  }
  static async getteamById(id) {
    return this.getTeamById(id);
  }
  static async createteam(team) {
    return this.createTeam(team);
  }
  static async updateteam(id, updates) {
    return this.updateTeam(id, updates);
  }
  static async deleteteam(id) {
    return this.deleteTeam(id);
  }
  static async getteamChats() {
    return this.getTeamChats();
  }
  static async getteamChatById(id) {
    return this.getTeamChatById(id);
  }
  static async createteamChat(teamChat) {
    return this.createTeamChat(teamChat);
  }
  static async updateteamChat(id, updates) {
    return this.updateTeamChat(id, updates);
  }
  static async getteamLinks(teamId) {
    return this.getTeamLinks(teamId);
  }
  static async createteamLink(link) {
    return this.createTeamLink(link);
  }
  static async deleteteamLink(id) {
    return this.deleteTeamLink(id);
  }
  static async getteamImages(teamId) {
    return this.getTeamImages(teamId);
  }
  static async createteamImage(image) {
    return this.createTeamImage(image);
  }
  static async deleteteamImage(id) {
    return this.deleteTeamImage(id);
  }
  // Backup-specific methods
  static async getAllUsers() {
    const { data, error } = await supabaseAdmin.from("users").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getAllMessages() {
    const { data, error } = await supabaseAdmin.from("messages").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getAllTeams() {
    const { data, error } = await supabaseAdmin.from("teams").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getAllTeamChats() {
    const { data, error } = await supabaseAdmin.from("team_chats").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getAllTeamLinks() {
    const { data, error } = await supabaseAdmin.from("team_links").select("*");
    if (error) throw error;
    return data || [];
  }
  static async getAllTeamImages() {
    const { data, error } = await supabaseAdmin.from("team_images").select("*");
    if (error) throw error;
    return data || [];
  }
  // Announcements
  static async getAnnouncements() {
    const { data, error } = await supabase.from("announcements").select("*").eq("is_published", true).order("is_pinned", { ascending: false }).order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }
  static async getAnnouncementById(id) {
    const { data, error } = await supabase.from("announcements").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  }
  static async createAnnouncement(announcement) {
    const announcementWithId = {
      id: announcement.id || crypto.randomUUID(),
      ...announcement,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    const { data, error } = await supabase.from("announcements").insert([announcementWithId]).select().single();
    if (error) throw error;
    return data;
  }
  static async updateAnnouncement(id, updates) {
    const updatesWithTimestamp = {
      ...updates,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    const { data, error } = await supabase.from("announcements").update(updatesWithTimestamp).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  static async deleteAnnouncement(id) {
    const { data, error } = await supabaseAdmin.from("announcements").delete().eq("id", id).select();
    if (error) throw error;
    return data;
  }
  static async getAllAnnouncements() {
    const { data, error } = await supabaseAdmin.from("announcements").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }
}

const supabase$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Database: Database,
  supabase: supabase,
  supabaseAdmin: supabaseAdmin
}, Symbol.toStringTag, { value: 'Module' }));

const addUserToTeam_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  if (currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  const { userId, teamId, role } = await readBody(event);
  if (!userId || !teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID and team ID are required"
    });
  }
  console.log("Admin adding user to team:", { userId, teamId, role, adminId: currentUser.id });
  try {
    const team = await Database.getteamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    const userToAdd = await Database.getUserById(userId);
    if (!userToAdd) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    let members = [];
    try {
      if (team.members) {
        if (typeof team.members === "string") {
          try {
            members = JSON.parse(team.members);
          } catch (jsonError) {
            console.log("Failed to parse as JSON, attempting manual parsing...");
            members = [];
          }
        } else if (Array.isArray(team.members)) {
          members = team.members;
        }
      }
    } catch (e) {
      console.error("Error parsing members:", e);
      members = [];
    }
    const cleanMembers = [];
    for (const member of members) {
      try {
        let cleanMember = null;
        if (typeof member === "string") {
          try {
            cleanMember = JSON.parse(member);
          } catch {
            console.warn("Skipping unparseable member string:", member);
            continue;
          }
        } else if (typeof member === "object" && member !== null) {
          cleanMember = member;
        }
        if (cleanMember && (cleanMember.id || cleanMember.userId)) {
          const normalizedMember = {
            id: cleanMember.id || cleanMember.userId,
            userId: cleanMember.userId || cleanMember.id,
            name: cleanMember.name || cleanMember.userName,
            userName: cleanMember.userName || cleanMember.name,
            email: cleanMember.email,
            image: cleanMember.image,
            role: cleanMember.role || "member",
            joinedAt: cleanMember.joinedAt || (/* @__PURE__ */ new Date()).toISOString()
          };
          cleanMembers.push(normalizedMember);
        }
      } catch (error) {
        console.warn("Error processing member:", member, error);
        continue;
      }
    }
    members = cleanMembers;
    console.log("Cleaned members array:", members.length, "valid members");
    const existingMember = members.find(
      (member) => member && (member.id === userId || member.userId === userId)
    );
    if (existingMember) {
      throw createError({
        statusCode: 409,
        statusMessage: "User is already a member of this team"
      });
    }
    const memberRole = role || (userToAdd.userRole === "mentor" ? "mentor" : "member");
    const newMember = {
      id: userToAdd.id,
      userId: userToAdd.id,
      // Include both for compatibility
      name: userToAdd.name,
      userName: userToAdd.name,
      // Include both for compatibility
      email: userToAdd.email,
      image: userToAdd.image,
      role: memberRole,
      joinedAt: (/* @__PURE__ */ new Date()).toISOString(),
      addedBy: currentUser.id
      // Track who added this user
    };
    members.push(newMember);
    const updatedteam = await Database.updateteam(teamId, {
      members
      // Pass as an array, not JSON string
    });
    console.log("Successfully added user to team:", {
      teamId,
      userId,
      role: memberRole,
      totalMembers: members.length
    });
    return {
      success: true,
      message: `${userToAdd.name} has been added to ${team.name} as ${memberRole}`,
      team: updatedteam,
      newMember
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error adding user to team:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to add user to team"
    });
  }
});

const addUserToTeam_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: addUserToTeam_post
}, Symbol.toStringTag, { value: 'Module' }));

const create_post$2 = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  if (currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  try {
    const body = await readBody(event);
    const backupType = body.type || "full";
    const includeFiles = body.includeFiles !== false;
    const includePasswords = body.includePasswords === true;
    console.log(`Creating ${backupType} backup for admin user: ${currentUser.name}`);
    const backupData = {
      metadata: {
        id: `backup-${Date.now()}`,
        type: backupType,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: currentUser.name,
        includeFiles,
        includePasswords,
        version: "1.0.0"
      },
      database: {},
      externalResources: {}
    };
    if (backupType === "full" || backupType === "database" || backupType === "users") {
      const users = await Database.getAllUsers();
      const processedUsers = users.map((user) => {
        const userCopy = { ...user };
        if (!includePasswords) {
          delete userCopy.password;
        }
        return userCopy;
      });
      backupData.database.users = processedUsers;
      if (backupType === "full" || backupType === "database") {
        try {
          backupData.database.messages = await Database.getAllMessages();
        } catch (error) {
          console.warn("Could not export messages:", error);
          backupData.database.messages = [];
        }
        try {
          backupData.database.teams = await Database.getAllTeams();
        } catch (error) {
          console.warn("Could not export teams:", error);
          backupData.database.teams = [];
        }
        try {
          backupData.database.team_chats = await Database.getAllTeamChats();
        } catch (error) {
          console.warn("Could not export team chats:", error);
          backupData.database.team_chats = [];
        }
        try {
          backupData.database.team_links = await Database.getAllTeamLinks();
        } catch (error) {
          console.warn("Could not export team links:", error);
          backupData.database.team_links = [];
        }
        try {
          backupData.database.team_images = await Database.getAllTeamImages();
        } catch (error) {
          console.warn("Could not export team images:", error);
          backupData.database.team_images = [];
        }
      }
      backupData.externalResources = createExternalResourcesCatalog(processedUsers);
    }
    backupData.restoreInstructions = createRestoreInstructions(backupType, includeFiles, includePasswords);
    return backupData;
  } catch (error) {
    console.error("Backup creation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create backup: " + error.message
    });
  }
});
function createExternalResourcesCatalog(users) {
  const externalResources = {
    googleDriveLinks: [],
    userLinks: [],
    videoLinks: []
  };
  for (const user of users) {
    if (user.image && user.image.includes("drive.google.com")) {
      externalResources.googleDriveLinks.push({
        userId: user.id,
        userName: user.name,
        type: "profile_image",
        url: user.image
      });
    }
    if (user.video && user.video.trim()) {
      externalResources.videoLinks.push({
        userId: user.id,
        userName: user.name,
        url: user.video
      });
    }
    if (user.user_links) {
      try {
        const links = typeof user.user_links === "string" ? JSON.parse(user.user_links) : user.user_links;
        if (Array.isArray(links) && links.length > 0) {
          externalResources.userLinks.push({
            userId: user.id,
            userName: user.name,
            links
          });
        }
      } catch (error) {
        console.warn(`Error parsing user links for ${user.name}:`, error);
      }
    }
  }
  return externalResources;
}
function createRestoreInstructions(type, includeFiles, includePasswords) {
  return `# ICE2025 Backup Restore Instructions

## Backup Information
- Type: ${type}
- Files Included: ${includeFiles ? "Yes" : "No"}
- Passwords Included: ${includePasswords ? "Yes" : "No"}
- Created: ${(/* @__PURE__ */ new Date()).toISOString()}

## Restore Process

### 1. Database Restoration

#### Users Table
Use the admin bulk import feature with the data from database.users array

#### Other Tables
Import data from:
- database.messages
- database.teams
- database.team_chats
- database.team_links
- database.team_images

### 2. External Resources

Check externalResources for:
- Google Drive links that need to be accessible
- User-submitted external links  
- Video links (YouTube, Google Drive, etc.)

### 3. Post-Restore Steps

1. Verify database connections
2. Test file uploads and image serving
3. Check user authentication (${includePasswords ? "passwords included" : "passwords need to be reset"})
4. Validate external link accessibility

## Support

For technical support, contact the system administrator.
Created by ICE2025 Backup System v1.0.0
`;
}

const create_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$6 = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  if (currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  try {
    const backupHistory = [
      {
        id: "backup-2025-08-05-120000",
        type: "full",
        createdAt: "2025-08-05T12:00:00.000Z",
        createdBy: "Admin User",
        size: "15.2 MB",
        includeFiles: true,
        includePasswords: false,
        status: "completed"
      }
    ];
    return {
      success: true,
      backups: backupHistory,
      totalBackups: backupHistory.length
    };
  } catch (error) {
    console.error("Error fetching backup history:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch backup history"
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const restore_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  if (currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  try {
    const body = await readBody(event);
    const { backupData, restoreOptions } = body;
    if (!backupData) {
      throw createError({
        statusCode: 400,
        statusMessage: "Backup data is required"
      });
    }
    console.log(`Starting restore process for admin user: ${currentUser.name}`);
    const results = {
      users: { imported: 0, skipped: 0, errors: 0, tempPasswordGenerated: 0 },
      messages: { imported: 0, errors: 0 },
      teams: { imported: 0, errors: 0 },
      summary: { success: true, message: "", warnings: [] }
    };
    if (((_a = backupData.database) == null ? void 0 : _a.users) && restoreOptions.restoreUsers) {
      console.log(`Restoring ${backupData.database.users.length} users...`);
      for (const userData of backupData.database.users) {
        try {
          const existingUser = await Database.getUserByEmail(userData.email);
          if (existingUser && !restoreOptions.overwriteExisting) {
            results.users.skipped++;
            continue;
          }
          const userDataWithPassword = { ...userData };
          if (!userDataWithPassword.password) {
            userDataWithPassword.password = "workshop123";
            results.users.tempPasswordGenerated++;
            console.log(`Set default password for user ${userData.email}`);
          }
          if (existingUser && restoreOptions.overwriteExisting) {
            const updateData = { ...userDataWithPassword };
            if (!userData.password) {
              delete updateData.password;
            }
            await Database.updateUser(existingUser.id, updateData);
          } else {
            await Database.createUser(userDataWithPassword);
          }
          results.users.imported++;
        } catch (error) {
          console.error(`Error importing user ${userData.email}:`, error);
          results.users.errors++;
        }
      }
    }
    if (((_b = backupData.database) == null ? void 0 : _b.messages) && restoreOptions.restoreMessages) {
      results.messages.imported = backupData.database.messages.length;
      console.log(`Would restore ${results.messages.imported} messages (not implemented yet)`);
    }
    if (((_c = backupData.database) == null ? void 0 : _c.teams) && restoreOptions.restoreTeams) {
      console.log(`Restoring ${backupData.database.teams.length} teams...`);
      for (const teamData of backupData.database.teams) {
        try {
          const existingTeams = await Database.getTeams();
          const existingTeam = existingTeams.find((t) => t.name.toLowerCase() === teamData.name.toLowerCase());
          if (existingTeam && !restoreOptions.overwriteExisting) {
            console.log(`Team ${teamData.name} already exists, skipping`);
            continue;
          }
          if (existingTeam && restoreOptions.overwriteExisting) {
            await Database.updateTeam(existingTeam.id, {
              description: teamData.description,
              coverImage: teamData.coverImage,
              isPublic: teamData.isPublic,
              members: teamData.members,
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            });
            console.log(`Updated existing team: ${teamData.name}`);
          } else {
            await Database.createTeam({
              ...teamData,
              // Ensure we have required fields
              name: teamData.name,
              description: teamData.description || "",
              coverImage: teamData.coverImage || "/uploads/groupCoverSamples/cover1.svg",
              creatorId: teamData.creatorId,
              isPublic: teamData.isPublic !== false,
              // Default to true if not specified
              members: teamData.members || [],
              createdAt: teamData.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            });
            console.log(`Created new team: ${teamData.name}`);
          }
          results.teams.imported++;
        } catch (error) {
          console.error(`Error importing team ${teamData.name}:`, error);
          results.teams.errors++;
        }
      }
    }
    results.summary.message = `Restore completed: ${results.users.imported} users imported, ${results.users.skipped} skipped, ${results.users.errors} errors, ${results.teams.imported} teams imported, ${results.teams.errors} team errors`;
    if (results.users.tempPasswordGenerated > 0) {
      results.summary.warnings.push(`${results.users.tempPasswordGenerated} users were imported with default password "workshop123". These users should change their passwords after login.`);
    }
    return {
      success: true,
      results,
      restoredAt: (/* @__PURE__ */ new Date()).toISOString(),
      restoredBy: currentUser.name,
      restoredItems: results.users.imported + results.messages.imported + results.teams.imported
    };
  } catch (error) {
    console.error("Restore failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Restore failed: " + error.message
    });
  }
});

const restore_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: restore_post
}, Symbol.toStringTag, { value: 'Module' }));

const bulkCreateUsers_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  if (currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  const body = await readBody(event);
  const { users } = body;
  if (!users || !Array.isArray(users) || users.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Users array is required"
    });
  }
  try {
    const existingUsers = await Database.getUsers();
    const existingEmails = new Set(existingUsers.map((user) => user.email.toLowerCase()));
    const newUsers = [];
    const skipped = [];
    const saltRounds = 10;
    for (const userData of users) {
      const {
        name,
        email,
        bio,
        password,
        userRole,
        affiliation,
        expertise,
        gender,
        skills,
        image,
        video
      } = userData;
      if (!name || !email) {
        skipped.push({ email: email || "unknown", reason: "Missing name or email" });
        continue;
      }
      if (existingEmails.has(email.toLowerCase())) {
        skipped.push({ email, reason: "Email already exists" });
        continue;
      }
      const hashedPassword = await bcrypt.hash(password || "workshop123", saltRounds);
      let processedSkills = [];
      if (skills) {
        if (typeof skills === "string") {
          processedSkills = skills.split(",").map((skill) => skill.trim()).filter((skill) => skill.length > 0);
        } else if (Array.isArray(skills)) {
          processedSkills = skills.filter((skill) => skill && skill.trim().length > 0);
        }
      }
      const newUser = {
        id: v4(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        bio: (bio == null ? void 0 : bio.trim()) || "",
        password: hashedPassword,
        role: "user",
        userRole: (userRole == null ? void 0 : userRole.trim()) || "participant",
        affiliation: (affiliation == null ? void 0 : affiliation.trim()) || "",
        expertise: (expertise == null ? void 0 : expertise.trim()) || "",
        gender: (gender == null ? void 0 : gender.trim()) || "",
        image: (image == null ? void 0 : image.trim()) || "/uploads/default/default_user_icon.png",
        video: (video == null ? void 0 : video.trim()) || "",
        skills: processedSkills,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await Database.createUser(newUser);
      newUsers.push(newUser);
      existingEmails.add(email.toLowerCase());
    }
    return {
      message: `Successfully created ${newUsers.length} users`,
      created: newUsers.length,
      skipped: skipped.length,
      skippedDetails: skipped
    };
  } catch (error) {
    console.error("Bulk user creation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create users"
    });
  }
});

const bulkCreateUsers_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: bulkCreateUsers_post
}, Symbol.toStringTag, { value: 'Module' }));

const deleteUser_delete = defineEventHandler(async (event) => {
  if (getMethod(event) !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  if (currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  const { userId } = await readBody(event);
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required"
    });
  }
  if (userId === currentUser.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot delete your own account"
    });
  }
  try {
    const userToDelete = await Database.getUserById(userId);
    if (!userToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    console.log("Attempting to delete user:", userToDelete.name, userToDelete.id);
    await Database.deleteUser(userId);
    console.log("User deleted successfully:", userToDelete.name);
    return {
      success: true,
      message: `User ${userToDelete.name} has been deleted successfully`
    };
  } catch (error) {
    console.error("User deletion error details:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      statusCode: error.statusCode
    });
    if (error.statusCode) {
      throw error;
    }
    let errorMessage = "Internal server error";
    if (error.code === "23503") {
      errorMessage = "Cannot delete user due to existing data dependencies";
    } else if (error.message) {
      errorMessage = error.message;
    }
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    });
  }
});

const deleteUser_delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: deleteUser_delete
}, Symbol.toStringTag, { value: 'Module' }));

const resetPassword_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser || currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  const { userId } = await readBody(event);
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "userId is required"
    });
  }
  try {
    const user = await Database.getUserById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    const defaultPassword = "workshop123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);
    await Database.updateUser(userId, {
      password: hashedPassword,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    return {
      message: `Password reset successfully for ${user.name}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    console.error("Error resetting user password:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to reset user password"
    });
  }
});

const resetPassword_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: resetPassword_post
}, Symbol.toStringTag, { value: 'Module' }));

const toggleRole_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser || currentUser.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required"
    });
  }
  const { userId, newRole } = await readBody(event);
  if (!userId || !newRole || !["user", "admin"].includes(newRole)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Valid userId and newRole are required"
    });
  }
  try {
    const user = await Database.getUserById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    if (user.id === currentUser.id && newRole === "user") {
      throw createError({
        statusCode: 400,
        statusMessage: "Cannot remove your own admin privileges"
      });
    }
    const updatedUser = await Database.updateUser(userId, { role: newRole });
    return {
      message: `User role updated to ${newRole}`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update user role"
    });
  }
});

const toggleRole_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: toggleRole_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Announcement ID is required"
      });
    }
    const announcement = await Database.getAnnouncementById(id);
    if (!announcement) {
      throw createError({
        statusCode: 404,
        statusMessage: "Announcement not found"
      });
    }
    if (user.role !== "admin" && user.id !== announcement.author_id) {
      throw createError({
        statusCode: 403,
        statusMessage: "You can only delete your own announcements or be an admin"
      });
    }
    const deletedAnnouncement = await Database.deleteAnnouncement(id);
    return {
      success: true,
      data: deletedAnnouncement,
      message: "Announcement deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting announcement:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete announcement"
    });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Announcement ID is required"
    });
  }
  try {
    const announcement = await Database.getAnnouncementById(id);
    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error("Error fetching announcement:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Announcement not found"
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Announcement ID is required"
    });
  }
  try {
    const body = await readBody(event);
    const existingAnnouncement = await Database.getAnnouncementById(id);
    if (existingAnnouncement.author_id !== user.id && user.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "You can only update your own announcements"
      });
    }
    const updates = {};
    if (body.title !== void 0) {
      updates.title = body.title.trim();
    }
    if (body.content !== void 0) {
      updates.content = body.content.trim();
    }
    if (body.type !== void 0) {
      if (["important", "urgent"].includes(body.type) && user.role !== "admin") {
        throw createError({
          statusCode: 403,
          statusMessage: "Only admins can create important or urgent announcements"
        });
      }
      updates.type = body.type;
    }
    if (body.is_pinned !== void 0 && user.role === "admin") {
      updates.is_pinned = body.is_pinned;
    }
    if (body.is_published !== void 0) {
      updates.is_published = body.is_published;
    }
    if (body.expires_at !== void 0) {
      updates.expires_at = body.expires_at;
    }
    const updatedAnnouncement = await Database.updateAnnouncement(id, updates);
    return {
      success: true,
      data: updatedAnnouncement,
      message: "Announcement updated successfully"
    };
  } catch (error) {
    console.error("Error updating announcement:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update announcement"
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const admin_get = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  try {
    if (user.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Admin access required"
      });
    }
    const announcements = await Database.getAllAnnouncements();
    return {
      success: true,
      data: announcements
    };
  } catch (error) {
    console.error("Error fetching all announcements for admin:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch announcements"
    });
  }
});

const admin_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: admin_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  try {
    const announcements = await Database.getAnnouncements();
    return {
      success: true,
      data: announcements
    };
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch announcements"
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_post = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  try {
    const body = await readBody(event);
    if (!body.title || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: "Title and content are required"
      });
    }
    if (["important", "urgent"].includes(body.type) && user.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Only admins can create important or urgent announcements"
      });
    }
    const announcement = {
      title: body.title.trim(),
      content: body.content.trim(),
      type: body.type || "general",
      author_id: user.id,
      author_name: user.name,
      is_pinned: user.role === "admin" ? body.is_pinned || false : false,
      is_published: body.is_published !== false,
      // Default to true
      expires_at: body.expires_at || null
    };
    const createdAnnouncement = await Database.createAnnouncement(announcement);
    return {
      success: true,
      data: createdAnnouncement,
      message: "Announcement created successfully"
    };
  } catch (error) {
    console.error("Error creating announcement:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create announcement"
    });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET$1 = process.env.JWT_SECRET || "your-secret-key";
const login_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const body = await readBody(event);
  const { email, password } = body;
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required"
    });
  }
  try {
    const user = await Database.getUserByEmail(email);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials"
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials"
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        userRole: user.userRole || "participant"
        // Default to participant if not set
      },
      JWT_SECRET$1,
      { expiresIn: "24h" }
    );
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24
      // 24 hours
    });
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Login error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const logout_post = defineEventHandler(async (event) => {
  deleteCookie(event, "auth-token");
  return { message: "Logged out successfully" };
});

const logout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: logout_post
}, Symbol.toStringTag, { value: 'Module' }));

const getDefaultUserImage = () => {
  return "/uploads/default/user-avatar.svg";
};
const ensureUserImage = (userImage) => {
  if (!userImage || userImage.includes("via.placeholder.com") || userImage.includes("placeholder")) {
    return getDefaultUserImage();
  }
  return userImage;
};
const uploadImageBuffer = async (imageBuffer, filename, contentType) => {
  try {
    if (!imageBuffer || imageBuffer.length === 0) {
      return {
        success: false,
        error: "Invalid image data"
      };
    }
    const uniqueId = v4();
    const fileExtension = contentType.split("/")[1] || "jpg";
    const uniqueFilename = `${Date.now()}-${uniqueId}.${fileExtension}`;
    const isProduction = process.env.VERCEL;
    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(uniqueFilename, imageBuffer, {
        access: "public",
        contentType,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      return {
        success: true,
        url: blob.url,
        filename: uniqueFilename
      };
    } else {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await promises.mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, uniqueFilename);
      await promises.writeFile(filePath, imageBuffer);
      const publicUrl = `/uploads/${uniqueFilename}`;
      return {
        success: true,
        url: publicUrl,
        filename: uniqueFilename
      };
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error: "Failed to upload image"
    };
  }
};
const uploadImage = async (imageData, filename) => {
  try {
    if (!imageData || !imageData.startsWith("data:image/")) {
      return {
        success: false,
        error: "Invalid image data"
      };
    }
    const imageMatch = imageData.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!imageMatch) {
      return {
        success: false,
        error: "Invalid image format"
      };
    }
    const [, format, base64Data] = imageMatch;
    const imageBuffer = Buffer.from(base64Data, "base64");
    const uniqueId = v4();
    const fileExtension = format.toLowerCase();
    const fileName = filename || `${uniqueId}.${fileExtension}`;
    const isProduction = process.env.VERCEL;
    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(fileName, imageBuffer, {
        access: "public",
        contentType: `image/${format}`,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      return {
        success: true,
        url: blob.url,
        filename: fileName
      };
    } else {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await promises.mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, fileName);
      await promises.writeFile(filePath, imageBuffer);
      const publicUrl = `/uploads/${fileName}`;
      return {
        success: true,
        url: publicUrl,
        filename: fileName
      };
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error: "Failed to upload image"
    };
  }
};

const me_get = defineEventHandler(async (event) => {
  const authUser = getUserFromRequest(event);
  if (!authUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Not authenticated"
    });
  }
  try {
    const fullUser = await Database.getUserById(authUser.id);
    if (!fullUser) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    return {
      user: {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        image: ensureUserImage(fullUser.image),
        bio: fullUser.bio,
        skills: fullUser.skills,
        role: fullUser.role,
        userRole: fullUser.userRole,
        affiliation: fullUser.affiliation,
        expertise: fullUser.expertise,
        gender: fullUser.gender,
        video: fullUser.video,
        user_links: fullUser.user_links,
        createdAt: fullUser.createdAt
      }
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch user data"
    });
  }
});

const me_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: me_get
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const register_post = defineEventHandler(async (event) => {
  var _a;
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const body = await readBody(event);
  const { name, email, password, bio, skills, image, userRole, affiliation, expertise, gender } = body;
  console.log("Registration request received:", {
    name,
    email,
    hasImage: !!image,
    imageUrl: image,
    userRole,
    affiliation,
    expertise,
    gender,
    bio: (bio == null ? void 0 : bio.substring(0, 50)) + ((bio == null ? void 0 : bio.length) > 50 ? "..." : ""),
    skillsCount: (skills == null ? void 0 : skills.length) || 0
  });
  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name, email, and password are required"
    });
  }
  try {
    const existingUser = await Database.getUserByEmail(email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "User with this email already exists"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl = getDefaultUserImage();
    if (image) {
      if (image.startsWith("data:image/")) {
        console.log("Processing base64 image upload for registration...");
        try {
          const uploadResult = await uploadImage(image);
          console.log("Image upload result:", uploadResult);
          if (uploadResult.success && uploadResult.url) {
            imageUrl = uploadResult.url;
            console.log("Image URL set to:", imageUrl);
          }
        } catch (uploadError) {
          console.error("Error during image upload:", uploadError);
        }
      } else if (image.startsWith("/uploads/") || image.startsWith("http")) {
        imageUrl = image;
        console.log("Using pre-uploaded image:", imageUrl);
      }
    } else {
      console.log("No image provided, using default");
    }
    const newUser = {
      id: v4(),
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      bio: bio || "",
      skills: skills || [],
      role: "user",
      userRole: userRole || "participant",
      affiliation: affiliation || "",
      expertise: expertise || "",
      gender: gender || "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const createdUser = await Database.createUser(newUser);
    console.log("User created with image:", {
      name: createdUser.name,
      imageUrl: createdUser.image,
      isDefault: (_a = createdUser.image) == null ? void 0 : _a.includes("default")
    });
    const token = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        role: createdUser.role,
        userRole: createdUser.userRole || "participant"
        // Default to participant if not set
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24
      // 24 hours
    });
    const { password: _, ...userWithoutPassword } = createdUser;
    return {
      success: true,
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Registration error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const register_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: register_post
}, Symbol.toStringTag, { value: 'Module' }));

const conversations_get = defineEventHandler(async (event) => {
  try {
    const currentUser = await requireAuth(event);
    let directConversations = [];
    const users = await Database.getUsers();
    try {
      const messages = await Database.getMessages();
      const conversationMap = /* @__PURE__ */ new Map();
      messages.forEach((message) => {
        const participants = [message.senderId, message.receiverId].sort();
        const conversationKey = participants.join("-");
        if (participants.includes(currentUser.id)) {
          if (!conversationMap.has(conversationKey)) {
            conversationMap.set(conversationKey, {
              id: conversationKey,
              type: "direct",
              participants,
              messages: [],
              lastMessage: null,
              createdAt: message.timestamp,
              updatedAt: message.timestamp
            });
          }
          const conversation = conversationMap.get(conversationKey);
          conversation.messages.push(message);
          if (!conversation.lastMessage || new Date(message.timestamp) > new Date(conversation.lastMessage.timestamp)) {
            conversation.lastMessage = message;
            conversation.updatedAt = message.timestamp;
          }
        }
      });
      directConversations = Array.from(conversationMap.values()).map((conversation) => {
        var _a, _b;
        const otherUserId = conversation.participants.find((id) => id !== currentUser.id);
        const otherUser = users.find((u) => u.id === otherUserId);
        return {
          userId: otherUserId,
          userName: (otherUser == null ? void 0 : otherUser.name) || "Unknown User",
          userImage: (otherUser == null ? void 0 : otherUser.image) || "/uploads/default/user-avatar.svg",
          lastMessage: ((_a = conversation.lastMessage) == null ? void 0 : _a.content) || "",
          lastMessageTime: ((_b = conversation.lastMessage) == null ? void 0 : _b.timestamp) || conversation.createdAt,
          unreadCount: 0,
          // TODO: Implement unread count logic
          type: "direct"
        };
      });
    } catch (error) {
      console.log("No messages found or error reading them:", error);
    }
    return {
      success: true,
      directConversations,
      teamConversations: []
      // Empty array since we removed team chat
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Get conversations error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const conversations_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: conversations_get
}, Symbol.toStringTag, { value: 'Module' }));

const messages_get = defineEventHandler(async (event) => {
  try {
    const currentUser = await requireAuth(event);
    const query = getQuery$1(event);
    const { withUserId } = query;
    if (!withUserId) {
      throw createError({
        statusCode: 400,
        statusMessage: "withUserId parameter is required"
      });
    }
    const allMessages = await Database.getMessages();
    const messages = allMessages.filter(
      (message) => message.senderId === currentUser.id && message.receiverId === withUserId || message.senderId === withUserId && message.receiverId === currentUser.id
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    return {
      success: true,
      messages
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Get messages error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const messages_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: messages_get
}, Symbol.toStringTag, { value: 'Module' }));

const send_post = defineEventHandler(async (event) => {
  try {
    const currentUser = await requireAuth(event);
    const body = await readBody(event);
    const { content, receiverId, chatType } = body;
    if (!content || !content.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message content is required"
      });
    }
    if (chatType !== "direct") {
      throw createError({
        statusCode: 400,
        statusMessage: "Only direct messages are supported"
      });
    }
    if (!receiverId) {
      throw createError({
        statusCode: 400,
        statusMessage: "receiverId is required for direct messages"
      });
    }
    const receiver = await Database.getUserById(receiverId);
    if (!receiver) {
      throw createError({
        statusCode: 404,
        statusMessage: "Receiver not found"
      });
    }
    const newMessage = {
      id: v4(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId,
      receiverName: receiver.name,
      // Add receiver name
      content: content.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      read: false
    };
    await Database.createMessage(newMessage);
    return {
      success: true,
      message: newMessage
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Send message error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const send_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: send_post
}, Symbol.toStringTag, { value: 'Module' }));

const status_get = defineEventHandler(async (event) => {
  try {
    const envStatus = {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      JWT_SECRET: !!process.env.JWT_SECRET,
      BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
      NODE_ENV: "development",
      VERCEL: !!process.env.VERCEL
    };
    let supabaseStatus = "unknown";
    try {
      const { Database } = await Promise.resolve().then(function () { return supabase$1; });
      const users = await Database.getUsers();
      supabaseStatus = `connected (${users.length} users)`;
    } catch (error) {
      supabaseStatus = `error: ${error.message}`;
    }
    return {
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: envStatus,
      supabase: supabaseStatus
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Debug error: ${error.message}`
    });
  }
});

const status_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: status_get
}, Symbol.toStringTag, { value: 'Module' }));

const testUpload_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Test upload request received:", {
    hasImage: !!body.image,
    imageFormat: body.image ? body.image.substring(0, 50) + "..." : "none",
    imageLength: body.image ? body.image.length : 0
  });
  return {
    success: true,
    received: {
      hasImage: !!body.image,
      imageLength: body.image ? body.image.length : 0,
      imageStart: body.image ? body.image.substring(0, 50) : null
    }
  };
});

const testUpload_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: testUpload_post
}, Symbol.toStringTag, { value: 'Module' }));

const gallery_get = defineEventHandler(async (event) => {
  try {
    const images = [
      // Replace these examples with your actual Google Drive file IDs:
      // {
      //   id: 'YOUR_ACTUAL_FILE_ID_1',
      //   title: 'Workshop Setup',
      //   description: 'ICE2025 Workshop venue preparation',
      //   type: 'image'
      // },
      // {
      //   id: 'YOUR_ACTUAL_FILE_ID_2', 
      //   title: 'Opening Ceremony',
      //   description: 'Prof. Suranga Nanayakkara opening the workshop',
      //   type: 'image'
      // },
      // {
      //   id: 'YOUR_ACTUAL_FILE_ID_3',
      //   title: 'Team Brainstorming',
      //   description: 'Participants working on AI innovation ideas',
      //   type: 'image'
      // },
      // Add more images here...
    ];
    const placeholderImages = [
      {
        id: "placeholder_1",
        title: "Workshop Opening",
        description: "Prof. Suranga Nanayakkara welcoming participants to ICE2025",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_2",
        title: "Team Formation",
        description: "Participants forming teams and discussing project ideas",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_3",
        title: "Mentoring Session",
        description: "International mentors guiding teams on AI development",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_4",
        title: "Prototype Development",
        description: "Teams building their AI innovation prototypes",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_5",
        title: "Technical Discussion",
        description: "Deep dive into machine learning algorithms and applications",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_6",
        title: "Networking Break",
        description: "Participants networking and sharing experiences",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_7",
        title: "Demo Preparation",
        description: "Teams preparing for their final presentations",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_8",
        title: "Final Presentations",
        description: "Teams showcasing their AI prototypes to judges",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_9",
        title: "Awards Ceremony",
        description: "Recognizing outstanding innovations and achievements",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_10",
        title: "Group Photo",
        description: "All ICE2025 participants, mentors, and organizers together",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_11",
        title: "Workshop Venue",
        description: "The beautiful venue hosting the ICE2025 workshop",
        type: "image",
        isPlaceholder: true
      },
      {
        id: "placeholder_12",
        title: "Innovation Showcase",
        description: "Display of all the amazing AI prototypes created",
        type: "image",
        isPlaceholder: true
      }
    ];
    return {
      success: true,
      data: {
        images: images.length > 0 ? images : placeholderImages,
        totalCount: images.length > 0 ? images.length : placeholderImages.length
      }
    };
  } catch (error) {
    console.error("Error fetching media gallery:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch media gallery"
    });
  }
});

const gallery_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: gallery_get
}, Symbol.toStringTag, { value: 'Module' }));

const proxyImage_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery$1(event);
  const { id } = query;
  if (!id || typeof id !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing file ID"
    });
  }
  try {
    const urls = [
      `https://lh3.googleusercontent.com/d/${id}=w400`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w400`,
      `https://drive.google.com/uc?export=view&id=${id}`
    ];
    let imageResponse = null;
    let error = null;
    for (const url of urls) {
      try {
        console.log(`Trying to fetch image from: ${url}`);
        const response = await fetch(url);
        if (response.ok && ((_a = response.headers.get("content-type")) == null ? void 0 : _a.startsWith("image/"))) {
          console.log(`Success with URL: ${url}`);
          imageResponse = response;
          break;
        } else {
          console.log(`Failed with URL: ${url}, status: ${response.status}`);
        }
      } catch (fetchError) {
        console.log(`Error with URL: ${url}`, fetchError);
        error = fetchError;
        continue;
      }
    }
    if (!imageResponse || !imageResponse.ok) {
      throw createError({
        statusCode: 404,
        statusMessage: "Image not found or inaccessible"
      });
    }
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, max-age=86400");
    setHeader(event, "Access-Control-Allow-Origin", "*");
    return new Uint8Array(imageBuffer);
  } catch (error) {
    console.error("Proxy image error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch image"
    });
  }
});

const proxyImage_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: proxyImage_get
}, Symbol.toStringTag, { value: 'Module' }));

const skills = defineEventHandler(async () => {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "Flask",
    "FastAPI",
    "Java",
    "Spring Boot",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Ruby",
    "Rails",
    "Go",
    "Rust",
    "C++",
    "C",
    "HTML",
    "CSS",
    "SASS",
    "Tailwind CSS",
    "Bootstrap",
    "Material UI",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Firebase",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "DevOps",
    "Git",
    "GitHub",
    "GitLab",
    "Jira",
    "Figma",
    "Photoshop",
    "Machine Learning",
    "AI",
    "Data Science",
    "TensorFlow",
    "PyTorch",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "iOS",
    "Android",
    "UI/UX Design",
    "Product Management",
    "Agile",
    "Scrum",
    "Testing"
  ];
  return skills.sort();
});

const skills$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: skills
}, Symbol.toStringTag, { value: 'Module' }));

const complete_get = defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  try {
    const currentUser = getUserFromRequest(event);
    const queryStartTime = Date.now();
    const [team, links, images] = await Promise.all([
      Database.getteamById(teamId),
      Database.getTeamLinks(teamId).catch(() => []),
      // Fallback to empty array on error
      Database.getTeamImages(teamId).catch(() => [])
      // Fallback to empty array on error
    ]);
    const dbTime = Date.now() - queryStartTime;
    console.log(`\u{1F680} Complete endpoint: Database queries completed in ${dbTime}ms`);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    const parsedMembers = team.members ? team.members.map((member) => {
      try {
        return typeof member === "string" ? JSON.parse(member) : member;
      } catch (e) {
        console.error("Error parsing member:", member, e);
        return member;
      }
    }) : [];
    const membersWithRoles = [];
    const mentors = [];
    console.log(`\u{1F680} Database Optimization: Fetching user details for ${parsedMembers.length} members in batch`);
    const userQueryStartTime = Date.now();
    const userIds = parsedMembers.map((member) => member.userId);
    const userDetails = await Database.getUsersByIds(userIds);
    const userQueryTime = Date.now() - userQueryStartTime;
    console.log(`\u2705 Batch query completed in ${userQueryTime}ms. Retrieved ${userDetails.length} user records`);
    const userDetailsMap = /* @__PURE__ */ new Map();
    userDetails.forEach((user) => {
      userDetailsMap.set(user.id, user);
    });
    for (const member of parsedMembers) {
      try {
        const userDetail = userDetailsMap.get(member.userId);
        if (userDetail) {
          const memberWithRole = {
            ...member,
            userRole: userDetail.userRole || "participant",
            skills: userDetail.skills || []
          };
          if (userDetail.userRole === "mentor") {
            mentors.push(memberWithRole);
          } else {
            membersWithRoles.push(memberWithRole);
          }
        } else {
          membersWithRoles.push(member);
        }
      } catch (error) {
        console.error("Error processing member:", member.userId, error);
        membersWithRoles.push(member);
      }
    }
    const isMember = currentUser ? parsedMembers.some((member) => member.userId === currentUser.id) : false;
    if (!team.isPublic && !isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: "Access denied to private team"
      });
    }
    return {
      team: {
        id: team.id,
        name: team.name,
        description: team.description,
        coverImage: team.coverImage || "/uploads/teamCoverSamples/cover1.svg",
        createdBy: team.creatorId,
        createdAt: team.createdAt,
        isPrivate: !team.isPublic,
        // Convert isPublic to isPrivate
        members: membersWithRoles,
        mentors,
        isMember,
        userRole: isMember ? "member" : null
      },
      links: links || [],
      images: images || []
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error fetching complete team data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const complete_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: complete_get
}, Symbol.toStringTag, { value: 'Module' }));

const delete_delete = defineEventHandler(async (event) => {
  if (getMethod(event) !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  try {
    const team = await Database.getteamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    if (team.creatorId !== currentUser.id && currentUser.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Only the team creator or admin can delete this team"
      });
    }
    await Database.deleteteam(teamId);
    return {
      message: "team deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting team:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete team"
    });
  }
});

const delete_delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: delete_delete
}, Symbol.toStringTag, { value: 'Module' }));

const images_get = defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  try {
    const images = await Database.getTeamImages(teamId);
    return images || [];
  } catch (error) {
    console.error("Error fetching team images:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch team images"
    });
  }
});

const images_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: images_get
}, Symbol.toStringTag, { value: 'Module' }));

const images_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  try {
    const team = await Database.getteamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    const parsedMembers = team.members ? team.members.map((member) => {
      try {
        return typeof member === "string" ? JSON.parse(member) : member;
      } catch (e) {
        return member;
      }
    }) : [];
    const isMember = parsedMembers.some((member) => member.userId === currentUser.id);
    if (!isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: "You must be a team member to upload images"
      });
    }
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No image file provided"
      });
    }
    const imageFile = formData.find((field) => field.name === "image");
    if (!imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: "Image field is required"
      });
    }
    const uploadResult = await uploadImageBuffer(
      imageFile.data,
      imageFile.filename || "team-image.jpg",
      imageFile.type || "image/jpeg"
    );
    if (!uploadResult || !uploadResult.success || !uploadResult.url) {
      throw createError({
        statusCode: 500,
        statusMessage: (uploadResult == null ? void 0 : uploadResult.error) || "Failed to upload image"
      });
    }
    const newImage = {
      team_id: teamId,
      created_by: currentUser.id,
      image_url: uploadResult.url,
      filename: uploadResult.filename
    };
    const createdImage = await Database.createteamImage(newImage);
    return createdImage;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error uploading team image:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to upload image"
    });
  }
});

const images_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: images_post
}, Symbol.toStringTag, { value: 'Module' }));

const _imageId__delete = defineEventHandler(async (event) => {
  if (getMethod(event) !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  const imageId = getRouterParam(event, "imageId");
  if (!teamId || !imageId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID and Image ID are required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  try {
    const team = await Database.getteamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    const parsedMembers = team.members ? team.members.map((member) => {
      try {
        return typeof member === "string" ? JSON.parse(member) : member;
      } catch (e) {
        return member;
      }
    }) : [];
    const isMember = parsedMembers.some((member) => member.userId === currentUser.id);
    if (!isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: "You must be a team member to delete images"
      });
    }
    const images = await Database.getTeamImages(teamId);
    const imageToDelete = images.find((image) => image.id === imageId);
    if (!imageToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: "Image not found"
      });
    }
    if (imageToDelete.user_id !== currentUser.id && currentUser.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "You can only delete your own images"
      });
    }
    await Database.deleteteamImage(imageId);
    return { message: "Image deleted successfully" };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error deleting team image:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete image"
    });
  }
});

const _imageId__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _imageId__delete
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  try {
    const currentUser = getUserFromRequest(event);
    const team = await Database.getteamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    const parsedMembers = team.members ? team.members.map((member) => {
      try {
        return typeof member === "string" ? JSON.parse(member) : member;
      } catch (e) {
        console.error("Error parsing member:", member, e);
        return member;
      }
    }) : [];
    const membersWithRoles = [];
    const mentors = [];
    console.log(`\u{1F680} Database Optimization: Fetching user details for ${parsedMembers.length} members in batch instead of ${parsedMembers.length} individual queries`);
    const startTime = Date.now();
    const userIds = parsedMembers.map((member) => member.userId);
    const userDetails = await Database.getUsersByIds(userIds);
    const endTime = Date.now();
    console.log(`\u2705 Batch query completed in ${endTime - startTime}ms. Retrieved ${userDetails.length} user records in 1 database call instead of ${parsedMembers.length} calls`);
    const userDetailsMap = /* @__PURE__ */ new Map();
    userDetails.forEach((user) => {
      userDetailsMap.set(user.id, user);
    });
    for (const member of parsedMembers) {
      try {
        const userDetail = userDetailsMap.get(member.userId);
        if (userDetail) {
          const memberWithRole = {
            ...member,
            userRole: userDetail.userRole || "participant",
            skills: userDetail.skills || []
          };
          if (userDetail.userRole === "mentor") {
            mentors.push(memberWithRole);
          } else {
            membersWithRoles.push(memberWithRole);
          }
        } else {
          membersWithRoles.push(member);
        }
      } catch (error) {
        console.error("Error processing member:", member.userId, error);
        membersWithRoles.push(member);
      }
    }
    const isMember = currentUser ? parsedMembers.some((member) => member.userId === currentUser.id) : false;
    if (!team.isPublic && !isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: "Access denied to private team"
      });
    }
    return {
      id: team.id,
      name: team.name,
      description: team.description,
      coverImage: team.coverImage || "/uploads/teamCoverSamples/cover1.svg",
      createdBy: team.creatorId,
      createdAt: team.createdAt,
      isPrivate: !team.isPublic,
      // Convert isPublic to isPrivate
      members: membersWithRoles,
      mentors,
      isMember,
      userRole: isMember ? "member" : null
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error fetching team:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const join_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  console.log("Current user for team join:", currentUser);
  try {
    const team = await Database.getteamById(teamId);
    const joinAsRole = currentUser.userRole === "mentor" ? "mentor" : "member";
    let members = [];
    try {
      if (team.members) {
        if (typeof team.members === "string") {
          try {
            members = JSON.parse(team.members);
          } catch (jsonError) {
            members = [];
          }
        } else if (Array.isArray(team.members)) {
          members = team.members;
        } else {
          members = [];
        }
      }
    } catch (e) {
      members = [];
    }
    members = members.map((member) => {
      if (typeof member === "string") {
        try {
          return JSON.parse(member);
        } catch {
          return null;
        }
      }
      return member;
    }).filter(Boolean);
    const isAlreadyMember = members.some((member) => member.userId === currentUser.id);
    if (isAlreadyMember) {
      throw createError({
        statusCode: 409,
        statusMessage: "User is already part of this team"
      });
    }
    let userName = currentUser.name;
    if (!userName) {
      console.warn("Name missing from JWT token, fetching from database...");
      const fullUser = await Database.getUserById(currentUser.id);
      userName = (fullUser == null ? void 0 : fullUser.name) || "Unknown User";
    }
    const newMember = {
      userId: currentUser.id,
      userName,
      role: joinAsRole,
      joinedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    console.log("Adding new member:", newMember);
    if (!currentUser.name) {
      console.warn("Warning: currentUser.name is missing. CurrentUser:", currentUser);
    }
    members.push(newMember);
    console.log("Updated members array:", members);
    console.log("Sending to database:", { members });
    const updatedteam = await Database.updateteam(teamId, {
      members
      // Send as array, let Supabase handle JSONB conversion
    });
    console.log("Database update result:", updatedteam);
    return {
      message: "Successfully joined the team",
      team: updatedteam
    };
  } catch (error) {
    console.error("Error joining team:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to join team"
    });
  }
});

const join_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: join_post
}, Symbol.toStringTag, { value: 'Module' }));

const leave_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  try {
    const team = await Database.getteamById(teamId);
    let members = [];
    try {
      if (team.members) {
        if (typeof team.members === "string") {
          try {
            members = JSON.parse(team.members);
          } catch (jsonError) {
            members = [];
          }
        } else if (Array.isArray(team.members)) {
          members = team.members;
        } else {
          members = [];
        }
      }
    } catch (e) {
      members = [];
    }
    members = members.map((member) => {
      if (typeof member === "string") {
        try {
          return JSON.parse(member);
        } catch {
          return null;
        }
      }
      return member;
    }).filter(Boolean);
    const memberIndex = members.findIndex((member) => member.userId === currentUser.id);
    if (memberIndex === -1) {
      throw createError({
        statusCode: 409,
        statusMessage: "User is not part of this team"
      });
    }
    members.splice(memberIndex, 1);
    if (members.length === 0) {
      await Database.deleteteam(teamId);
      return {
        message: "Left team and team was deleted (no members left)"
      };
    } else {
      await Database.updateteam(teamId, {
        members
        // Send as array, let Supabase handle JSONB conversion
      });
      return {
        message: "Successfully left the team"
      };
    }
  } catch (error) {
    console.error("Error leaving team:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to leave team"
    });
  }
});

const leave_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: leave_post
}, Symbol.toStringTag, { value: 'Module' }));

const links_get = defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  try {
    const links = await Database.getTeamLinks(teamId);
    return links || [];
  } catch (error) {
    console.error("Error fetching team links:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch team links"
    });
  }
});

const links_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: links_get
}, Symbol.toStringTag, { value: 'Module' }));

const links_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID is required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  const body = await readBody(event);
  const { content } = body;
  if (!content || !content.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Content is required"
    });
  }
  try {
    const team = await Database.getteamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    const parsedMembers = team.members ? team.members.map((member) => {
      try {
        return typeof member === "string" ? JSON.parse(member) : member;
      } catch (e) {
        return member;
      }
    }) : [];
    const isMember = parsedMembers.some((member) => member.userId === currentUser.id);
    if (!isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: "You must be a team member to share links"
      });
    }
    const newLink = {
      team_id: teamId,
      created_by: currentUser.id,
      content: content.trim()
    };
    const createdLink = await Database.createteamLink(newLink);
    return createdLink;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error creating team link:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create shared link"
    });
  }
});

const links_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: links_post
}, Symbol.toStringTag, { value: 'Module' }));

const _linkId__delete = defineEventHandler(async (event) => {
  if (getMethod(event) !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  const linkId = getRouterParam(event, "linkId");
  if (!teamId || !linkId) {
    throw createError({
      statusCode: 400,
      statusMessage: "team ID and Link ID are required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  try {
    const team = await Database.getteamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "team not found"
      });
    }
    const parsedMembers = team.members ? team.members.map((member) => {
      try {
        return typeof member === "string" ? JSON.parse(member) : member;
      } catch (e) {
        return member;
      }
    }) : [];
    const isMember = parsedMembers.some((member) => member.userId === currentUser.id);
    if (!isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: "You must be a team member to delete links"
      });
    }
    const links = await Database.getTeamLinks(teamId);
    const linkToDelete = links.find((link) => link.id === linkId);
    if (!linkToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: "Link not found"
      });
    }
    if (linkToDelete.user_id !== currentUser.id && currentUser.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "You can only delete your own links"
      });
    }
    await Database.deleteteamLink(linkId);
    return { message: "Link deleted successfully" };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error deleting team link:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete shared link"
    });
  }
});

const _linkId__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _linkId__delete
}, Symbol.toStringTag, { value: 'Module' }));

const update_put = defineEventHandler(async (event) => {
  if (getMethod(event) !== "PUT") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Team ID is required"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  try {
    const body = await readBody(event);
    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Team name is required"
      });
    }
    if (!body.description || typeof body.description !== "string" || body.description.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Team description is required"
      });
    }
    const team = await Database.getTeamById(teamId);
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: "Team not found"
      });
    }
    let isMember = false;
    if (team.members) {
      let members = [];
      try {
        if (typeof team.members === "string") {
          members = JSON.parse(team.members);
        } else if (Array.isArray(team.members)) {
          members = team.members;
        }
      } catch (e) {
        members = [];
      }
      members = members.map((member) => {
        if (typeof member === "string") {
          try {
            return JSON.parse(member);
          } catch {
            return null;
          }
        }
        return member;
      }).filter(Boolean);
      isMember = members.some((member) => member.userId === currentUser.id);
    }
    if (!isMember && team.createdBy !== currentUser.id && currentUser.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "You do not have permission to update this team"
      });
    }
    const updatedTeam = await Database.updateTeam(teamId, {
      name: body.name.trim(),
      description: body.description.trim(),
      coverImage: body.coverImage || team.coverImage,
      isPublic: body.isPrivate !== void 0 ? !body.isPrivate : team.isPublic,
      // Convert isPrivate to isPublic
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    return {
      success: true,
      team: {
        ...updatedTeam,
        isPrivate: !updatedTeam.isPublic
        // Convert isPublic back to isPrivate for frontend
      }
    };
  } catch (error) {
    console.error("Update team error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const update_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: update_put
}, Symbol.toStringTag, { value: 'Module' }));

const create_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  const { name, description, coverImage, isPrivate = false } = await readBody(event);
  const isPublic = !isPrivate;
  if (!name || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name and description are required"
    });
  }
  try {
    const existingteams = await Database.getteams();
    const existingteam = existingteams.find((g) => g.name.toLowerCase() === name.toLowerCase());
    if (existingteam) {
      throw createError({
        statusCode: 409,
        statusMessage: "team name already exists"
      });
    }
    const newteam = await Database.createteam({
      name: name.trim(),
      description: description.trim(),
      coverImage: coverImage || "/uploads/teamCoverSamples/cover1.svg",
      creatorId: currentUser.id,
      isPublic,
      members: [
        {
          userId: currentUser.id,
          userName: currentUser.name,
          joinedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]
    });
    return {
      message: "team created successfully",
      team: {
        ...newteam,
        isPrivate: !newteam.isPublic
        // Convert isPublic to isPrivate for frontend
      }
    };
  } catch (error) {
    console.error("Error creating team:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create team"
    });
  }
});

const create_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const teams = await Database.getteams();
    if (!teams) {
      return [];
    }
    const query = getQuery$1(event);
    const userId = query.userId;
    let filteredteams = teams;
    const processedteams = filteredteams.map((team) => {
      let members = [];
      try {
        if (team.members) {
          if (typeof team.members === "string") {
            members = JSON.parse(team.members);
          } else if (Array.isArray(team.members)) {
            members = team.members;
          }
        }
      } catch (e) {
        members = [];
      }
      members = members.map((member) => {
        if (typeof member === "string") {
          try {
            return JSON.parse(member);
          } catch {
            return null;
          }
        }
        return member;
      }).filter(Boolean);
      return {
        ...team,
        parsedMembers: members
      };
    });
    if (!userId) {
      filteredteams = processedteams.filter((team) => !team.isPrivate);
    } else {
      filteredteams = processedteams.filter(
        (team) => !team.isPrivate || team.parsedMembers && team.parsedMembers.some((member) => member.userId === userId)
      );
    }
    return filteredteams.map((team) => {
      var _a;
      const isMember = userId ? team.parsedMembers && team.parsedMembers.some((member) => member.userId === userId) : false;
      let userRole = null;
      if (isMember && team.parsedMembers) {
        const userMember = team.parsedMembers.find((member) => member.userId === userId);
        userRole = (userMember == null ? void 0 : userMember.role) || "member";
      }
      return {
        id: team.id,
        name: team.name,
        description: team.description,
        coverImage: team.coverImage || "/uploads/teamCoverSamples/cover1.svg",
        createdBy: team.createdBy,
        createdAt: team.createdAt,
        memberCount: ((_a = team.parsedMembers) == null ? void 0 : _a.length) || 0,
        isPrivate: team.isPrivate,
        isMember,
        userRole
      };
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const optimization_get = defineEventHandler(async (event) => {
  try {
    const allUsers = await Database.getUsers();
    const sampleUserIds = allUsers.slice(0, 10).map((user) => user.id);
    if (sampleUserIds.length === 0) {
      return {
        message: "No users found to test with",
        oldApproach: null,
        newApproach: null,
        improvement: null
      };
    }
    console.log(`
\u{1F525} DATABASE OPTIMIZATION COMPARISON TEST`);
    console.log(`Testing with ${sampleUserIds.length} user IDs`);
    console.log(`===========================================`);
    const oldStartTime = Date.now();
    await Database.getUsersByIdsOldWay(sampleUserIds);
    const oldEndTime = Date.now();
    const oldDuration = oldEndTime - oldStartTime;
    await new Promise((resolve) => setTimeout(resolve, 100));
    const newStartTime = Date.now();
    await Database.getUsersByIds(sampleUserIds);
    const newEndTime = Date.now();
    const newDuration = newEndTime - newStartTime;
    const improvement = ((oldDuration - newDuration) / oldDuration * 100).toFixed(1);
    const speedup = (oldDuration / newDuration).toFixed(1);
    console.log(`
\u{1F4CA} PERFORMANCE COMPARISON RESULTS:`);
    console.log(`Old approach (${sampleUserIds.length} individual calls): ${oldDuration}ms`);
    console.log(`New approach (1 batch call): ${newDuration}ms`);
    console.log(`Performance improvement: ${improvement}% faster (${speedup}x speedup)`);
    console.log(`Database calls reduced from ${sampleUserIds.length} to 1`);
    console.log(`===========================================
`);
    return {
      message: "Database optimization comparison completed",
      testUserIds: sampleUserIds.length,
      oldApproach: {
        duration: oldDuration,
        databaseCalls: sampleUserIds.length,
        method: "Individual getUserById() calls"
      },
      newApproach: {
        duration: newDuration,
        databaseCalls: 1,
        method: "Batch getUsersByIds() call"
      },
      improvement: {
        percentFaster: `${improvement}%`,
        speedupFactor: `${speedup}x`,
        callsReduced: `${sampleUserIds.length} calls \u2192 1 call`
      }
    };
  } catch (error) {
    console.error("Error in optimization test:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Test failed"
    });
  }
});

const optimization_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: optimization_get
}, Symbol.toStringTag, { value: 'Module' }));

const upload_post = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { image, filename } = body;
    if (!image || !image.startsWith("data:image/")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid image data"
      });
    }
    const imageMatch = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!imageMatch) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid image format"
      });
    }
    const [, format, base64Data] = imageMatch;
    const imageBuffer = Buffer.from(base64Data, "base64");
    const uniqueId = v4();
    const fileExtension = format.toLowerCase();
    const fileName = `${uniqueId}.${fileExtension}`;
    const isProduction = process.env.VERCEL;
    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(fileName, imageBuffer, {
        access: "public",
        contentType: `image/${format}`,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      return {
        success: true,
        url: blob.url,
        filename: fileName
      };
    } else {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await promises.mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, fileName);
      await promises.writeFile(filePath, imageBuffer);
      const publicUrl = `/uploads/${fileName}`;
      return {
        success: true,
        url: publicUrl,
        filename: fileName
      };
    }
  } catch (error) {
    console.error("File upload error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to upload image"
    });
  }
});

const upload_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: upload_post
}, Symbol.toStringTag, { value: 'Module' }));

const user_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const { name, id } = query;
  if (!name && !id) {
    throw createError({
      statusCode: 400,
      statusMessage: "User name or ID is required"
    });
  }
  try {
    let user = null;
    if (id) {
      user = await Database.getUserById(id.toString());
    } else if (name) {
      user = await Database.getUserByName(decodeURIComponent(name.toString()));
    }
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error fetching user:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch user"
    });
  }
});

const user_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: user_get
}, Symbol.toStringTag, { value: 'Module' }));

const updatePassword_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  const body = await readBody(event);
  const { currentPassword, newPassword } = body;
  if (!currentPassword || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Current password and new password are required"
    });
  }
  if (newPassword.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: "New password must be at least 6 characters long"
    });
  }
  try {
    const userToUpdate = await Database.getUserById(currentUser.id);
    if (!userToUpdate) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userToUpdate.password);
    if (!isCurrentPasswordValid) {
      throw createError({
        statusCode: 400,
        statusMessage: "Current password is incorrect"
      });
    }
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    await Database.updateUser(currentUser.id, { password: hashedNewPassword });
    return { message: "Password updated successfully" };
  } catch (error) {
    console.error("Password update error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update password"
    });
  }
});

const updatePassword_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: updatePassword_post
}, Symbol.toStringTag, { value: 'Module' }));

const update_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  const currentUser = getUserFromRequest(event);
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  const { name, bio, skills, image, userRole, affiliation, expertise, gender, video, user_links } = await readBody(event);
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name is required"
    });
  }
  try {
    const existingUser = await Database.getUserById(currentUser.id);
    if (!existingUser) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    const userWithSameName = await Database.getUserByName(name);
    if (userWithSameName && userWithSameName.id !== currentUser.id) {
      throw createError({
        statusCode: 409,
        statusMessage: "Name is already taken"
      });
    }
    let imageUrl = existingUser.image;
    if (image && image.startsWith("data:image/")) {
      try {
        const uploadResult = await uploadImage(image);
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url;
        }
      } catch (uploadError) {
        console.error("Error during image upload:", uploadError);
      }
    } else if (image && !image.startsWith("data:image/")) {
      imageUrl = image;
    }
    let processedSkills = [];
    if (Array.isArray(skills)) {
      if (skills.length > 0) {
        if (typeof skills[0] === "object" && "name" in skills[0] && "level" in skills[0]) {
          processedSkills = skills.filter(
            (skill) => skill.name && typeof skill.name === "string" && skill.level && typeof skill.level === "number" && skill.level >= 1 && skill.level <= 5
          ).map((skill) => ({
            name: skill.name.trim(),
            level: skill.level
          }));
        } else {
          processedSkills = skills.filter((skill) => typeof skill === "string" && skill.trim().length > 0).map((skill) => ({
            name: skill.trim(),
            level: 3
          }));
        }
      }
    }
    let processedLinks = "";
    if (Array.isArray(user_links)) {
      const validLinks = user_links.filter(
        (link) => link && typeof link === "object" && link.label && typeof link.label === "string" && link.label.trim().length > 0 && link.url && typeof link.url === "string" && link.url.trim().length > 0
      ).slice(0, 5).map((link) => ({
        label: link.label.trim(),
        url: link.url.trim()
      }));
      if (validLinks.length > 0) {
        processedLinks = JSON.stringify(validLinks);
      }
    }
    const updatedUser = await Database.updateUser(currentUser.id, {
      name,
      bio: bio || "",
      image: imageUrl,
      userRole: userRole || "participant",
      affiliation: affiliation || "",
      expertise: expertise || "",
      gender: gender || "",
      video: video || "",
      skills: processedSkills,
      user_links: processedLinks
    });
    return {
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        role: updatedUser.role
      }
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("User update error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

const update_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: update_post
}, Symbol.toStringTag, { value: 'Module' }));

const users = defineEventHandler(async (event) => {
  try {
    const users = await Database.getUsers();
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPasswords;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch users"
    });
  }
});

const users$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: users
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    if (typeof ssrError.data === "string") {
      try {
        ssrError.data = destr(ssrError.data);
      } catch {
      }
    }
    setSSRError(ssrContext, ssrError);
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
