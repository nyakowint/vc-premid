"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/charset.js
var require_charset = __commonJS({
  "node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/charset.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredCharsets;
    module2.exports.preferredCharsets = preferredCharsets;
    var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptCharset(accept) {
      var accepts = accept.split(",");
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
          accepts[j++] = charset;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseCharset(str, i) {
      var match = simpleCharsetRegExp.exec(str);
      if (!match)
        return null;
      var charset = match[1];
      var q = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].trim().split("=");
          if (p[0] === "q") {
            q = parseFloat(p[1]);
            break;
          }
        }
      }
      return {
        charset,
        q,
        i
      };
    }
    function getCharsetPriority(charset, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(charset, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(charset, spec, index) {
      var s = 0;
      if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s |= 1;
      } else if (spec.charset !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredCharsets(accept, provided) {
      var accepts = parseAcceptCharset(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullCharset(spec) {
      return spec.charset;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/encoding.js
var require_encoding = __commonJS({
  "node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/encoding.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredEncodings;
    module2.exports.preferredEncodings = preferredEncodings;
    var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptEncoding(accept) {
      var accepts = accept.split(",");
      var hasIdentity = false;
      var minQuality = 1;
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
          accepts[j++] = encoding;
          hasIdentity = hasIdentity || specify("identity", encoding);
          minQuality = Math.min(minQuality, encoding.q || 1);
        }
      }
      if (!hasIdentity) {
        accepts[j++] = {
          encoding: "identity",
          q: minQuality,
          i
        };
      }
      accepts.length = j;
      return accepts;
    }
    function parseEncoding(str, i) {
      var match = simpleEncodingRegExp.exec(str);
      if (!match)
        return null;
      var encoding = match[1];
      var q = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].trim().split("=");
          if (p[0] === "q") {
            q = parseFloat(p[1]);
            break;
          }
        }
      }
      return {
        encoding,
        q,
        i
      };
    }
    function getEncodingPriority(encoding, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(encoding, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(encoding, spec, index) {
      var s = 0;
      if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s |= 1;
      } else if (spec.encoding !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredEncodings(accept, provided) {
      var accepts = parseAcceptEncoding(accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullEncoding(spec) {
      return spec.encoding;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/language.js
var require_language = __commonJS({
  "node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/language.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredLanguages;
    module2.exports.preferredLanguages = preferredLanguages;
    var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
    function parseAcceptLanguage(accept) {
      var accepts = accept.split(",");
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var language = parseLanguage(accepts[i].trim(), i);
        if (language) {
          accepts[j++] = language;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseLanguage(str, i) {
      var match = simpleLanguageRegExp.exec(str);
      if (!match)
        return null;
      var prefix = match[1];
      var suffix = match[2];
      var full = prefix;
      if (suffix)
        full += "-" + suffix;
      var q = 1;
      if (match[3]) {
        var params = match[3].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].split("=");
          if (p[0] === "q")
            q = parseFloat(p[1]);
        }
      }
      return {
        prefix,
        suffix,
        q,
        i,
        full
      };
    }
    function getLanguagePriority(language, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(language, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(language, spec, index) {
      var p = parseLanguage(language);
      if (!p)
        return null;
      var s = 0;
      if (spec.full.toLowerCase() === p.full.toLowerCase()) {
        s |= 4;
      } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
        s |= 2;
      } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
        s |= 1;
      } else if (spec.full !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredLanguages(accept, provided) {
      var accepts = parseAcceptLanguage(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullLanguage(spec) {
      return spec.full;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});

// node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/mediaType.js
var require_mediaType = __commonJS({
  "node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/lib/mediaType.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredMediaTypes;
    module2.exports.preferredMediaTypes = preferredMediaTypes;
    var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
    function parseAccept(accept) {
      var accepts = splitMediaTypes(accept);
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
          accepts[j++] = mediaType;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseMediaType(str, i) {
      var match = simpleMediaTypeRegExp.exec(str);
      if (!match)
        return null;
      var params = /* @__PURE__ */ Object.create(null);
      var q = 1;
      var subtype = match[2];
      var type = match[1];
      if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for (var j = 0; j < kvps.length; j++) {
          var pair = kvps[j];
          var key = pair[0].toLowerCase();
          var val = pair[1];
          var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.substr(1, val.length - 2) : val;
          if (key === "q") {
            q = parseFloat(value);
            break;
          }
          params[key] = value;
        }
      }
      return {
        type,
        subtype,
        params,
        q,
        i
      };
    }
    function getMediaTypePriority(type, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(type, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(type, spec, index) {
      var p = parseMediaType(type);
      var s = 0;
      if (!p) {
        return null;
      }
      if (spec.type.toLowerCase() == p.type.toLowerCase()) {
        s |= 4;
      } else if (spec.type != "*") {
        return null;
      }
      if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
        s |= 2;
      } else if (spec.subtype != "*") {
        return null;
      }
      var keys = Object.keys(spec.params);
      if (keys.length > 0) {
        if (keys.every(function(k) {
          return spec.params[k] == "*" || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
        })) {
          s |= 1;
        } else {
          return null;
        }
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredMediaTypes(accept, provided) {
      var accepts = parseAccept(accept === void 0 ? "*/*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullType(spec) {
      return spec.type + "/" + spec.subtype;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
    function quoteCount(string) {
      var count = 0;
      var index = 0;
      while ((index = string.indexOf('"', index)) !== -1) {
        count++;
        index++;
      }
      return count;
    }
    function splitKeyValuePair(str) {
      var index = str.indexOf("=");
      var key;
      var val;
      if (index === -1) {
        key = str;
      } else {
        key = str.substr(0, index);
        val = str.substr(index + 1);
      }
      return [key, val];
    }
    function splitMediaTypes(accept) {
      var accepts = accept.split(",");
      for (var i = 1, j = 0; i < accepts.length; i++) {
        if (quoteCount(accepts[j]) % 2 == 0) {
          accepts[++j] = accepts[i];
        } else {
          accepts[j] += "," + accepts[i];
        }
      }
      accepts.length = j + 1;
      return accepts;
    }
    function splitParameters(str) {
      var parameters = str.split(";");
      for (var i = 1, j = 0; i < parameters.length; i++) {
        if (quoteCount(parameters[j]) % 2 == 0) {
          parameters[++j] = parameters[i];
        } else {
          parameters[j] += ";" + parameters[i];
        }
      }
      parameters.length = j + 1;
      for (var i = 0; i < parameters.length; i++) {
        parameters[i] = parameters[i].trim();
      }
      return parameters;
    }
  }
});

// node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/index.js
var require_negotiator = __commonJS({
  "node_modules/.pnpm/negotiator@0.6.3/node_modules/negotiator/index.js"(exports2, module2) {
    "use strict";
    var preferredCharsets = require_charset();
    var preferredEncodings = require_encoding();
    var preferredLanguages = require_language();
    var preferredMediaTypes = require_mediaType();
    module2.exports = Negotiator;
    module2.exports.Negotiator = Negotiator;
    function Negotiator(request) {
      if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
      }
      this.request = request;
    }
    Negotiator.prototype.charset = function charset(available) {
      var set = this.charsets(available);
      return set && set[0];
    };
    Negotiator.prototype.charsets = function charsets(available) {
      return preferredCharsets(this.request.headers["accept-charset"], available);
    };
    Negotiator.prototype.encoding = function encoding(available) {
      var set = this.encodings(available);
      return set && set[0];
    };
    Negotiator.prototype.encodings = function encodings(available) {
      return preferredEncodings(this.request.headers["accept-encoding"], available);
    };
    Negotiator.prototype.language = function language(available) {
      var set = this.languages(available);
      return set && set[0];
    };
    Negotiator.prototype.languages = function languages(available) {
      return preferredLanguages(this.request.headers["accept-language"], available);
    };
    Negotiator.prototype.mediaType = function mediaType(available) {
      var set = this.mediaTypes(available);
      return set && set[0];
    };
    Negotiator.prototype.mediaTypes = function mediaTypes(available) {
      return preferredMediaTypes(this.request.headers.accept, available);
    };
    Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
    Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
    Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
    Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
    Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
    Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
    Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
    Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
  }
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  }
});

// node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = /* @__PURE__ */ Object.create(null);
    exports2.lookup = lookup;
    exports2.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2)
          mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path) {
      if (!path || typeof path !== "string") {
        return false;
      }
      var extension2 = extname("x." + path).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/.pnpm/accepts@1.3.8/node_modules/accepts/index.js
var require_accepts = __commonJS({
  "node_modules/.pnpm/accepts@1.3.8/node_modules/accepts/index.js"(exports2, module2) {
    "use strict";
    var Negotiator = require_negotiator();
    var mime = require_mime_types();
    module2.exports = Accepts;
    function Accepts(req) {
      if (!(this instanceof Accepts)) {
        return new Accepts(req);
      }
      this.headers = req.headers;
      this.negotiator = new Negotiator(req);
    }
    Accepts.prototype.type = Accepts.prototype.types = function(types_) {
      var types = types_;
      if (types && !Array.isArray(types)) {
        types = new Array(arguments.length);
        for (var i = 0; i < types.length; i++) {
          types[i] = arguments[i];
        }
      }
      if (!types || types.length === 0) {
        return this.negotiator.mediaTypes();
      }
      if (!this.headers.accept) {
        return types[0];
      }
      var mimes = types.map(extToMime);
      var accepts = this.negotiator.mediaTypes(mimes.filter(validMime));
      var first = accepts[0];
      return first ? types[mimes.indexOf(first)] : false;
    };
    Accepts.prototype.encoding = Accepts.prototype.encodings = function(encodings_) {
      var encodings = encodings_;
      if (encodings && !Array.isArray(encodings)) {
        encodings = new Array(arguments.length);
        for (var i = 0; i < encodings.length; i++) {
          encodings[i] = arguments[i];
        }
      }
      if (!encodings || encodings.length === 0) {
        return this.negotiator.encodings();
      }
      return this.negotiator.encodings(encodings)[0] || false;
    };
    Accepts.prototype.charset = Accepts.prototype.charsets = function(charsets_) {
      var charsets = charsets_;
      if (charsets && !Array.isArray(charsets)) {
        charsets = new Array(arguments.length);
        for (var i = 0; i < charsets.length; i++) {
          charsets[i] = arguments[i];
        }
      }
      if (!charsets || charsets.length === 0) {
        return this.negotiator.charsets();
      }
      return this.negotiator.charsets(charsets)[0] || false;
    };
    Accepts.prototype.lang = Accepts.prototype.langs = Accepts.prototype.language = Accepts.prototype.languages = function(languages_) {
      var languages = languages_;
      if (languages && !Array.isArray(languages)) {
        languages = new Array(arguments.length);
        for (var i = 0; i < languages.length; i++) {
          languages[i] = arguments[i];
        }
      }
      if (!languages || languages.length === 0) {
        return this.negotiator.languages();
      }
      return this.negotiator.languages(languages)[0] || false;
    };
    function extToMime(type) {
      return type.indexOf("/") === -1 ? mime.lookup(type) : type;
    }
    function validMime(type) {
      return typeof type === "string";
    }
  }
});

// node_modules/.pnpm/base64id@2.0.0/node_modules/base64id/lib/base64id.js
var require_base64id = __commonJS({
  "node_modules/.pnpm/base64id@2.0.0/node_modules/base64id/lib/base64id.js"(exports2, module2) {
    var crypto = require("crypto");
    var Base64Id = function() {
    };
    Base64Id.prototype.getRandomBytes = function(bytes) {
      var BUFFER_SIZE = 4096;
      var self = this;
      bytes = bytes || 12;
      if (bytes > BUFFER_SIZE) {
        return crypto.randomBytes(bytes);
      }
      var bytesInBuffer = parseInt(BUFFER_SIZE / bytes);
      var threshold = parseInt(bytesInBuffer * 0.85);
      if (!threshold) {
        return crypto.randomBytes(bytes);
      }
      if (this.bytesBufferIndex == null) {
        this.bytesBufferIndex = -1;
      }
      if (this.bytesBufferIndex == bytesInBuffer) {
        this.bytesBuffer = null;
        this.bytesBufferIndex = -1;
      }
      if (this.bytesBufferIndex == -1 || this.bytesBufferIndex > threshold) {
        if (!this.isGeneratingBytes) {
          this.isGeneratingBytes = true;
          crypto.randomBytes(BUFFER_SIZE, function(err, bytes2) {
            self.bytesBuffer = bytes2;
            self.bytesBufferIndex = 0;
            self.isGeneratingBytes = false;
          });
        }
        if (this.bytesBufferIndex == -1) {
          return crypto.randomBytes(bytes);
        }
      }
      var result = this.bytesBuffer.slice(bytes * this.bytesBufferIndex, bytes * (this.bytesBufferIndex + 1));
      this.bytesBufferIndex++;
      return result;
    };
    Base64Id.prototype.generateId = function() {
      var rand = Buffer.alloc(15);
      if (!rand.writeInt32BE) {
        return Math.abs(Math.random() * Math.random() * Date.now() | 0).toString() + Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
      }
      this.sequenceNumber = this.sequenceNumber + 1 | 0;
      rand.writeInt32BE(this.sequenceNumber, 11);
      if (crypto.randomBytes) {
        this.getRandomBytes(12).copy(rand);
      } else {
        [0, 4, 8].forEach(function(i) {
          rand.writeInt32BE(Math.random() * Math.pow(2, 32) | 0, i);
        });
      }
      return rand.toString("base64").replace(/\//g, "_").replace(/\+/g, "-");
    };
    exports2 = module2.exports = new Base64Id();
  }
});

// node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/commons.js
var require_commons = __commonJS({
  "node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/commons.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ERROR_PACKET = exports2.PACKET_TYPES_REVERSE = exports2.PACKET_TYPES = void 0;
    var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
    exports2.PACKET_TYPES = PACKET_TYPES;
    PACKET_TYPES["open"] = "0";
    PACKET_TYPES["close"] = "1";
    PACKET_TYPES["ping"] = "2";
    PACKET_TYPES["pong"] = "3";
    PACKET_TYPES["message"] = "4";
    PACKET_TYPES["upgrade"] = "5";
    PACKET_TYPES["noop"] = "6";
    var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
    exports2.PACKET_TYPES_REVERSE = PACKET_TYPES_REVERSE;
    Object.keys(PACKET_TYPES).forEach((key) => {
      PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
    });
    var ERROR_PACKET = { type: "error", data: "parser error" };
    exports2.ERROR_PACKET = ERROR_PACKET;
  }
});

// node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/encodePacket.js
var require_encodePacket = __commonJS({
  "node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/encodePacket.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.encodePacketToBinary = exports2.encodePacket = void 0;
    var commons_js_1 = require_commons();
    var encodePacket = ({ type, data }, supportsBinary, callback) => {
      if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        return callback(supportsBinary ? data : "b" + toBuffer(data, true).toString("base64"));
      }
      return callback(commons_js_1.PACKET_TYPES[type] + (data || ""));
    };
    exports2.encodePacket = encodePacket;
    var toBuffer = (data, forceBufferConversion) => {
      if (Buffer.isBuffer(data) || data instanceof Uint8Array && !forceBufferConversion) {
        return data;
      } else if (data instanceof ArrayBuffer) {
        return Buffer.from(data);
      } else {
        return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      }
    };
    var TEXT_ENCODER;
    function encodePacketToBinary(packet, callback) {
      if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {
        return callback(toBuffer(packet.data, false));
      }
      (0, exports2.encodePacket)(packet, true, (encoded) => {
        if (!TEXT_ENCODER) {
          TEXT_ENCODER = new TextEncoder();
        }
        callback(TEXT_ENCODER.encode(encoded));
      });
    }
    exports2.encodePacketToBinary = encodePacketToBinary;
  }
});

// node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/decodePacket.js
var require_decodePacket = __commonJS({
  "node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/decodePacket.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decodePacket = void 0;
    var commons_js_1 = require_commons();
    var decodePacket = (encodedPacket, binaryType) => {
      if (typeof encodedPacket !== "string") {
        return {
          type: "message",
          data: mapBinary(encodedPacket, binaryType)
        };
      }
      const type = encodedPacket.charAt(0);
      if (type === "b") {
        const buffer = Buffer.from(encodedPacket.substring(1), "base64");
        return {
          type: "message",
          data: mapBinary(buffer, binaryType)
        };
      }
      if (!commons_js_1.PACKET_TYPES_REVERSE[type]) {
        return commons_js_1.ERROR_PACKET;
      }
      return encodedPacket.length > 1 ? {
        type: commons_js_1.PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1)
      } : {
        type: commons_js_1.PACKET_TYPES_REVERSE[type]
      };
    };
    exports2.decodePacket = decodePacket;
    var mapBinary = (data, binaryType) => {
      switch (binaryType) {
        case "arraybuffer":
          if (data instanceof ArrayBuffer) {
            return data;
          } else if (Buffer.isBuffer(data)) {
            return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
          } else {
            return data.buffer;
          }
        case "nodebuffer":
        default:
          if (Buffer.isBuffer(data)) {
            return data;
          } else {
            return Buffer.from(data);
          }
      }
    };
  }
});

// node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/engine.io-parser@5.2.1/node_modules/engine.io-parser/build/cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decodePayload = exports2.decodePacket = exports2.encodePayload = exports2.encodePacket = exports2.protocol = exports2.createPacketDecoderStream = exports2.createPacketEncoderStream = void 0;
    var encodePacket_js_1 = require_encodePacket();
    Object.defineProperty(exports2, "encodePacket", { enumerable: true, get: function() {
      return encodePacket_js_1.encodePacket;
    } });
    var decodePacket_js_1 = require_decodePacket();
    Object.defineProperty(exports2, "decodePacket", { enumerable: true, get: function() {
      return decodePacket_js_1.decodePacket;
    } });
    var commons_js_1 = require_commons();
    var SEPARATOR = String.fromCharCode(30);
    var encodePayload = (packets, callback) => {
      const length = packets.length;
      const encodedPackets = new Array(length);
      let count = 0;
      packets.forEach((packet, i) => {
        (0, encodePacket_js_1.encodePacket)(packet, false, (encodedPacket) => {
          encodedPackets[i] = encodedPacket;
          if (++count === length) {
            callback(encodedPackets.join(SEPARATOR));
          }
        });
      });
    };
    exports2.encodePayload = encodePayload;
    var decodePayload = (encodedPayload, binaryType) => {
      const encodedPackets = encodedPayload.split(SEPARATOR);
      const packets = [];
      for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0, decodePacket_js_1.decodePacket)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
          break;
        }
      }
      return packets;
    };
    exports2.decodePayload = decodePayload;
    function createPacketEncoderStream() {
      return new TransformStream({
        transform(packet, controller) {
          (0, encodePacket_js_1.encodePacketToBinary)(packet, (encodedPacket) => {
            const payloadLength = encodedPacket.length;
            let header;
            if (payloadLength < 126) {
              header = new Uint8Array(1);
              new DataView(header.buffer).setUint8(0, payloadLength);
            } else if (payloadLength < 65536) {
              header = new Uint8Array(3);
              const view = new DataView(header.buffer);
              view.setUint8(0, 126);
              view.setUint16(1, payloadLength);
            } else {
              header = new Uint8Array(9);
              const view = new DataView(header.buffer);
              view.setUint8(0, 127);
              view.setBigUint64(1, BigInt(payloadLength));
            }
            if (packet.data && typeof packet.data !== "string") {
              header[0] |= 128;
            }
            controller.enqueue(header);
            controller.enqueue(encodedPacket);
          });
        }
      });
    }
    exports2.createPacketEncoderStream = createPacketEncoderStream;
    var TEXT_DECODER;
    function totalLength(chunks) {
      return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    }
    function concatChunks(chunks, size) {
      if (chunks[0].length === size) {
        return chunks.shift();
      }
      const buffer = new Uint8Array(size);
      let j = 0;
      for (let i = 0; i < size; i++) {
        buffer[i] = chunks[0][j++];
        if (j === chunks[0].length) {
          chunks.shift();
          j = 0;
        }
      }
      if (chunks.length && j < chunks[0].length) {
        chunks[0] = chunks[0].slice(j);
      }
      return buffer;
    }
    function createPacketDecoderStream(maxPayload, binaryType) {
      if (!TEXT_DECODER) {
        TEXT_DECODER = new TextDecoder();
      }
      const chunks = [];
      let state = 0;
      let expectedLength = -1;
      let isBinary = false;
      return new TransformStream({
        transform(chunk, controller) {
          chunks.push(chunk);
          while (true) {
            if (state === 0) {
              if (totalLength(chunks) < 1) {
                break;
              }
              const header = concatChunks(chunks, 1);
              isBinary = (header[0] & 128) === 128;
              expectedLength = header[0] & 127;
              if (expectedLength < 126) {
                state = 3;
              } else if (expectedLength === 126) {
                state = 1;
              } else {
                state = 2;
              }
            } else if (state === 1) {
              if (totalLength(chunks) < 2) {
                break;
              }
              const headerArray = concatChunks(chunks, 2);
              expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
              state = 3;
            } else if (state === 2) {
              if (totalLength(chunks) < 8) {
                break;
              }
              const headerArray = concatChunks(chunks, 8);
              const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
              const n = view.getUint32(0);
              if (n > Math.pow(2, 53 - 32) - 1) {
                controller.enqueue(commons_js_1.ERROR_PACKET);
                break;
              }
              expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
              state = 3;
            } else {
              if (totalLength(chunks) < expectedLength) {
                break;
              }
              const data = concatChunks(chunks, expectedLength);
              controller.enqueue((0, decodePacket_js_1.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
              state = 0;
            }
            if (expectedLength === 0 || expectedLength > maxPayload) {
              controller.enqueue(commons_js_1.ERROR_PACKET);
              break;
            }
          }
        }
      });
    }
    exports2.createPacketDecoderStream = createPacketDecoderStream;
    exports2.protocol = 4;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/parser-v3/utf8.js
var require_utf8 = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/parser-v3/utf8.js"(exports2, module2) {
    var stringFromCharCode = String.fromCharCode;
    function ucs2decode(string) {
      var output = [];
      var counter = 0;
      var length = string.length;
      var value;
      var extra;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    function ucs2encode(array) {
      var length = array.length;
      var index = -1;
      var value;
      var output = "";
      while (++index < length) {
        value = array[index];
        if (value > 65535) {
          value -= 65536;
          output += stringFromCharCode(value >>> 10 & 1023 | 55296);
          value = 56320 | value & 1023;
        }
        output += stringFromCharCode(value);
      }
      return output;
    }
    function checkScalarValue(codePoint, strict) {
      if (codePoint >= 55296 && codePoint <= 57343) {
        if (strict) {
          throw Error("Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value");
        }
        return false;
      }
      return true;
    }
    function createByte(codePoint, shift) {
      return stringFromCharCode(codePoint >> shift & 63 | 128);
    }
    function encodeCodePoint(codePoint, strict) {
      if ((codePoint & 4294967168) == 0) {
        return stringFromCharCode(codePoint);
      }
      var symbol = "";
      if ((codePoint & 4294965248) == 0) {
        symbol = stringFromCharCode(codePoint >> 6 & 31 | 192);
      } else if ((codePoint & 4294901760) == 0) {
        if (!checkScalarValue(codePoint, strict)) {
          codePoint = 65533;
        }
        symbol = stringFromCharCode(codePoint >> 12 & 15 | 224);
        symbol += createByte(codePoint, 6);
      } else if ((codePoint & 4292870144) == 0) {
        symbol = stringFromCharCode(codePoint >> 18 & 7 | 240);
        symbol += createByte(codePoint, 12);
        symbol += createByte(codePoint, 6);
      }
      symbol += stringFromCharCode(codePoint & 63 | 128);
      return symbol;
    }
    function utf8encode(string, opts) {
      opts = opts || {};
      var strict = false !== opts.strict;
      var codePoints = ucs2decode(string);
      var length = codePoints.length;
      var index = -1;
      var codePoint;
      var byteString = "";
      while (++index < length) {
        codePoint = codePoints[index];
        byteString += encodeCodePoint(codePoint, strict);
      }
      return byteString;
    }
    function readContinuationByte() {
      if (byteIndex >= byteCount) {
        throw Error("Invalid byte index");
      }
      var continuationByte = byteArray[byteIndex] & 255;
      byteIndex++;
      if ((continuationByte & 192) == 128) {
        return continuationByte & 63;
      }
      throw Error("Invalid continuation byte");
    }
    function decodeSymbol(strict) {
      var byte1;
      var byte2;
      var byte3;
      var byte4;
      var codePoint;
      if (byteIndex > byteCount) {
        throw Error("Invalid byte index");
      }
      if (byteIndex == byteCount) {
        return false;
      }
      byte1 = byteArray[byteIndex] & 255;
      byteIndex++;
      if ((byte1 & 128) == 0) {
        return byte1;
      }
      if ((byte1 & 224) == 192) {
        byte2 = readContinuationByte();
        codePoint = (byte1 & 31) << 6 | byte2;
        if (codePoint >= 128) {
          return codePoint;
        } else {
          throw Error("Invalid continuation byte");
        }
      }
      if ((byte1 & 240) == 224) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3;
        if (codePoint >= 2048) {
          return checkScalarValue(codePoint, strict) ? codePoint : 65533;
        } else {
          throw Error("Invalid continuation byte");
        }
      }
      if ((byte1 & 248) == 240) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        byte4 = readContinuationByte();
        codePoint = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
        if (codePoint >= 65536 && codePoint <= 1114111) {
          return codePoint;
        }
      }
      throw Error("Invalid UTF-8 detected");
    }
    var byteArray;
    var byteCount;
    var byteIndex;
    function utf8decode(byteString, opts) {
      opts = opts || {};
      var strict = false !== opts.strict;
      byteArray = ucs2decode(byteString);
      byteCount = byteArray.length;
      byteIndex = 0;
      var codePoints = [];
      var tmp;
      while ((tmp = decodeSymbol(strict)) !== false) {
        codePoints.push(tmp);
      }
      return ucs2encode(codePoints);
    }
    module2.exports = {
      version: "2.1.2",
      encode: utf8encode,
      decode: utf8decode
    };
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/parser-v3/index.js
var require_parser_v3 = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/parser-v3/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decodePayloadAsBinary = exports2.encodePayloadAsBinary = exports2.decodePayload = exports2.encodePayload = exports2.decodeBase64Packet = exports2.decodePacket = exports2.encodeBase64Packet = exports2.encodePacket = exports2.packets = exports2.protocol = void 0;
    var utf8 = require_utf8();
    exports2.protocol = 3;
    var hasBinary = (packets) => {
      for (const packet of packets) {
        if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {
          return true;
        }
      }
      return false;
    };
    exports2.packets = {
      open: 0,
      close: 1,
      ping: 2,
      pong: 3,
      message: 4,
      upgrade: 5,
      noop: 6
    };
    var packetslist = Object.keys(exports2.packets);
    var err = { type: "error", data: "parser error" };
    var EMPTY_BUFFER = Buffer.concat([]);
    function encodePacket(packet, supportsBinary, utf8encode, callback) {
      if (typeof supportsBinary === "function") {
        callback = supportsBinary;
        supportsBinary = null;
      }
      if (typeof utf8encode === "function") {
        callback = utf8encode;
        utf8encode = null;
      }
      if (Buffer.isBuffer(packet.data)) {
        return encodeBuffer(packet, supportsBinary, callback);
      } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
        return encodeBuffer({ type: packet.type, data: arrayBufferToBuffer(packet.data) }, supportsBinary, callback);
      }
      var encoded = exports2.packets[packet.type];
      if (void 0 !== packet.data) {
        encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
      }
      return callback("" + encoded);
    }
    exports2.encodePacket = encodePacket;
    function encodeBuffer(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return encodeBase64Packet(packet, callback);
      }
      var data = packet.data;
      var typeBuffer = Buffer.allocUnsafe(1);
      typeBuffer[0] = exports2.packets[packet.type];
      return callback(Buffer.concat([typeBuffer, data]));
    }
    function encodeBase64Packet(packet, callback) {
      var data = Buffer.isBuffer(packet.data) ? packet.data : arrayBufferToBuffer(packet.data);
      var message = "b" + exports2.packets[packet.type];
      message += data.toString("base64");
      return callback(message);
    }
    exports2.encodeBase64Packet = encodeBase64Packet;
    function decodePacket(data, binaryType, utf8decode) {
      if (data === void 0) {
        return err;
      }
      var type;
      if (typeof data === "string") {
        type = data.charAt(0);
        if (type === "b") {
          return decodeBase64Packet(data.slice(1), binaryType);
        }
        if (utf8decode) {
          data = tryDecode(data);
          if (data === false) {
            return err;
          }
        }
        if (Number(type) != type || !packetslist[type]) {
          return err;
        }
        if (data.length > 1) {
          return { type: packetslist[type], data: data.slice(1) };
        } else {
          return { type: packetslist[type] };
        }
      }
      if (binaryType === "arraybuffer") {
        var intArray = new Uint8Array(data);
        type = intArray[0];
        return { type: packetslist[type], data: intArray.buffer.slice(1) };
      }
      if (data instanceof ArrayBuffer) {
        data = arrayBufferToBuffer(data);
      }
      type = data[0];
      return { type: packetslist[type], data: data.slice(1) };
    }
    exports2.decodePacket = decodePacket;
    function tryDecode(data) {
      try {
        data = utf8.decode(data, { strict: false });
      } catch (e) {
        return false;
      }
      return data;
    }
    function decodeBase64Packet(msg, binaryType) {
      var type = packetslist[msg.charAt(0)];
      var data = Buffer.from(msg.slice(1), "base64");
      if (binaryType === "arraybuffer") {
        var abv = new Uint8Array(data.length);
        for (var i = 0; i < abv.length; i++) {
          abv[i] = data[i];
        }
        data = abv.buffer;
      }
      return { type, data };
    }
    exports2.decodeBase64Packet = decodeBase64Packet;
    function encodePayload(packets, supportsBinary, callback) {
      if (typeof supportsBinary === "function") {
        callback = supportsBinary;
        supportsBinary = null;
      }
      if (supportsBinary && hasBinary(packets)) {
        return encodePayloadAsBinary(packets, callback);
      }
      if (!packets.length) {
        return callback("0:");
      }
      function encodeOne(packet, doneCallback) {
        encodePacket(packet, supportsBinary, false, function(message) {
          doneCallback(null, setLengthHeader(message));
        });
      }
      map(packets, encodeOne, function(err2, results) {
        return callback(results.join(""));
      });
    }
    exports2.encodePayload = encodePayload;
    function setLengthHeader(message) {
      return message.length + ":" + message;
    }
    function map(ary, each, done) {
      const results = new Array(ary.length);
      let count = 0;
      for (let i = 0; i < ary.length; i++) {
        each(ary[i], (error, msg) => {
          results[i] = msg;
          if (++count === ary.length) {
            done(null, results);
          }
        });
      }
    }
    function decodePayload(data, binaryType, callback) {
      if (typeof data !== "string") {
        return decodePayloadAsBinary(data, binaryType, callback);
      }
      if (typeof binaryType === "function") {
        callback = binaryType;
        binaryType = null;
      }
      if (data === "") {
        return callback(err, 0, 1);
      }
      var length = "", n, msg, packet;
      for (var i = 0, l = data.length; i < l; i++) {
        var chr = data.charAt(i);
        if (chr !== ":") {
          length += chr;
          continue;
        }
        if (length === "" || length != (n = Number(length))) {
          return callback(err, 0, 1);
        }
        msg = data.slice(i + 1, i + 1 + n);
        if (length != msg.length) {
          return callback(err, 0, 1);
        }
        if (msg.length) {
          packet = decodePacket(msg, binaryType, false);
          if (err.type === packet.type && err.data === packet.data) {
            return callback(err, 0, 1);
          }
          var more = callback(packet, i + n, l);
          if (false === more)
            return;
        }
        i += n;
        length = "";
      }
      if (length !== "") {
        return callback(err, 0, 1);
      }
    }
    exports2.decodePayload = decodePayload;
    function bufferToString(buffer) {
      var str = "";
      for (var i = 0, l = buffer.length; i < l; i++) {
        str += String.fromCharCode(buffer[i]);
      }
      return str;
    }
    function stringToBuffer(string) {
      var buf = Buffer.allocUnsafe(string.length);
      for (var i = 0, l = string.length; i < l; i++) {
        buf.writeUInt8(string.charCodeAt(i), i);
      }
      return buf;
    }
    function arrayBufferToBuffer(data) {
      var length = data.byteLength || data.length;
      var offset = data.byteOffset || 0;
      return Buffer.from(data.buffer || data, offset, length);
    }
    function encodePayloadAsBinary(packets, callback) {
      if (!packets.length) {
        return callback(EMPTY_BUFFER);
      }
      map(packets, encodeOneBinaryPacket, function(err2, results) {
        return callback(Buffer.concat(results));
      });
    }
    exports2.encodePayloadAsBinary = encodePayloadAsBinary;
    function encodeOneBinaryPacket(p, doneCallback) {
      function onBinaryPacketEncode(packet) {
        var encodingLength = "" + packet.length;
        var sizeBuffer;
        if (typeof packet === "string") {
          sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
          sizeBuffer[0] = 0;
          for (var i = 0; i < encodingLength.length; i++) {
            sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
          }
          sizeBuffer[sizeBuffer.length - 1] = 255;
          return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
        }
        sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
        sizeBuffer[0] = 1;
        for (var i = 0; i < encodingLength.length; i++) {
          sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
        }
        sizeBuffer[sizeBuffer.length - 1] = 255;
        doneCallback(null, Buffer.concat([sizeBuffer, packet]));
      }
      encodePacket(p, true, true, onBinaryPacketEncode);
    }
    function decodePayloadAsBinary(data, binaryType, callback) {
      if (typeof binaryType === "function") {
        callback = binaryType;
        binaryType = null;
      }
      var bufferTail = data;
      var buffers = [];
      var i;
      while (bufferTail.length > 0) {
        var strLen = "";
        var isString = bufferTail[0] === 0;
        for (i = 1; ; i++) {
          if (bufferTail[i] === 255)
            break;
          if (strLen.length > 310) {
            return callback(err, 0, 1);
          }
          strLen += "" + bufferTail[i];
        }
        bufferTail = bufferTail.slice(strLen.length + 1);
        var msgLength = parseInt(strLen, 10);
        var msg = bufferTail.slice(1, msgLength + 1);
        if (isString)
          msg = bufferToString(msg);
        buffers.push(msg);
        bufferTail = bufferTail.slice(msgLength + 1);
      }
      var total = buffers.length;
      for (i = 0; i < total; i++) {
        var buffer = buffers[i];
        callback(decodePacket(buffer, binaryType, true), i, total);
      }
    }
    exports2.decodePayloadAsBinary = decodePayloadAsBinary;
  }
});

// node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../../../AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../../../AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// ../../../../AppData/Local/pnpm/global/5/.pnpm/supports-color@8.1.1/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../../../AppData/Local/pnpm/global/5/.pnpm/supports-color@8.1.1/node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var flagForceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      flagForceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      flagForceColor = 1;
    }
    function envForceColor() {
      if ("FORCE_COLOR" in env) {
        if (env.FORCE_COLOR === "true") {
          return 1;
        }
        if (env.FORCE_COLOR === "false") {
          return 0;
        }
        return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
      const noFlagForceColor = envForceColor();
      if (noFlagForceColor !== void 0) {
        flagForceColor = noFlagForceColor;
      }
      const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
      if (forceColor === 0) {
        return 0;
      }
      if (sniffFlags) {
        if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
          return 3;
        }
        if (hasFlag("color=256")) {
          return 2;
        }
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream, options = {}) {
      const level = supportsColor(stream, {
        streamIsTTY: stream && stream.isTTY,
        ...options
      });
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel({ isTTY: tty.isatty(1) }),
      stderr: getSupportLevel({ isTTY: tty.isatty(2) })
    };
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transport.js
var require_transport = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transport.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Transport = void 0;
    var events_1 = require("events");
    var parser_v4 = require_cjs();
    var parser_v3 = require_parser_v3();
    var debug_1 = require_src();
    var debug = (0, debug_1.default)("engine:transport");
    function noop() {
    }
    var Transport = class extends events_1.EventEmitter {
      /**
       * Transport constructor.
       *
       * @param {http.IncomingMessage} req
       * @api public
       */
      constructor(req) {
        super();
        this.writable = false;
        this._readyState = "open";
        this.discarded = false;
        this.protocol = req._query.EIO === "4" ? 4 : 3;
        this.parser = this.protocol === 4 ? parser_v4 : parser_v3;
        this.supportsBinary = !(req._query && req._query.b64);
      }
      get readyState() {
        return this._readyState;
      }
      set readyState(state) {
        debug("readyState updated from %s to %s (%s)", this._readyState, state, this.name);
        this._readyState = state;
      }
      /**
       * Flags the transport as discarded.
       *
       * @api private
       */
      discard() {
        this.discarded = true;
      }
      /**
       * Called with an incoming HTTP request.
       *
       * @param {http.IncomingMessage} req
       * @api protected
       */
      onRequest(req) {
        debug("setting request");
        this.req = req;
      }
      /**
       * Closes the transport.
       *
       * @api private
       */
      close(fn) {
        if ("closed" === this.readyState || "closing" === this.readyState)
          return;
        this.readyState = "closing";
        this.doClose(fn || noop);
      }
      /**
       * Called with a transport error.
       *
       * @param {String} msg - message error
       * @param {Object} desc - error description
       * @api protected
       */
      onError(msg, desc) {
        if (this.listeners("error").length) {
          const err = new Error(msg);
          err.type = "TransportError";
          err.description = desc;
          this.emit("error", err);
        } else {
          debug("ignored transport error %s (%s)", msg, desc);
        }
      }
      /**
       * Called with parsed out a packets from the data stream.
       *
       * @param {Object} packet
       * @api protected
       */
      onPacket(packet) {
        this.emit("packet", packet);
      }
      /**
       * Called with the encoded packet data.
       *
       * @param {String} data
       * @api protected
       */
      onData(data) {
        this.onPacket(this.parser.decodePacket(data));
      }
      /**
       * Called upon transport close.
       *
       * @api protected
       */
      onClose() {
        this.readyState = "closed";
        this.emit("close");
      }
    };
    exports2.Transport = Transport;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/polling.js
var require_polling = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/polling.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Polling = void 0;
    var transport_1 = require_transport();
    var zlib_1 = require("zlib");
    var accepts = require_accepts();
    var debug_1 = require_src();
    var debug = (0, debug_1.default)("engine:polling");
    var compressionMethods = {
      gzip: zlib_1.createGzip,
      deflate: zlib_1.createDeflate
    };
    var Polling = class extends transport_1.Transport {
      /**
       * HTTP polling constructor.
       *
       * @api public.
       */
      constructor(req) {
        super(req);
        this.closeTimeout = 30 * 1e3;
      }
      /**
       * Transport name
       *
       * @api public
       */
      get name() {
        return "polling";
      }
      get supportsFraming() {
        return false;
      }
      /**
       * Overrides onRequest.
       *
       * @param {http.IncomingMessage}
       * @api private
       */
      onRequest(req) {
        const res = req.res;
        req.res = null;
        if ("GET" === req.method) {
          this.onPollRequest(req, res);
        } else if ("POST" === req.method) {
          this.onDataRequest(req, res);
        } else {
          res.writeHead(500);
          res.end();
        }
      }
      /**
       * The client sends a request awaiting for us to send data.
       *
       * @api private
       */
      onPollRequest(req, res) {
        if (this.req) {
          debug("request overlap");
          this.onError("overlap from client");
          res.writeHead(400);
          res.end();
          return;
        }
        debug("setting request");
        this.req = req;
        this.res = res;
        const onClose = () => {
          this.onError("poll connection closed prematurely");
        };
        const cleanup = () => {
          req.removeListener("close", onClose);
          this.req = this.res = null;
        };
        req.cleanup = cleanup;
        req.on("close", onClose);
        this.writable = true;
        this.emit("drain");
        if (this.writable && this.shouldClose) {
          debug("triggering empty send to append close packet");
          this.send([{ type: "noop" }]);
        }
      }
      /**
       * The client sends a request with data.
       *
       * @api private
       */
      onDataRequest(req, res) {
        if (this.dataReq) {
          this.onError("data request overlap from client");
          res.writeHead(400);
          res.end();
          return;
        }
        const isBinary = "application/octet-stream" === req.headers["content-type"];
        if (isBinary && this.protocol === 4) {
          return this.onError("invalid content");
        }
        this.dataReq = req;
        this.dataRes = res;
        let chunks = isBinary ? Buffer.concat([]) : "";
        const cleanup = () => {
          req.removeListener("data", onData);
          req.removeListener("end", onEnd);
          req.removeListener("close", onClose);
          this.dataReq = this.dataRes = chunks = null;
        };
        const onClose = () => {
          cleanup();
          this.onError("data request connection closed prematurely");
        };
        const onData = (data) => {
          let contentLength;
          if (isBinary) {
            chunks = Buffer.concat([chunks, data]);
            contentLength = chunks.length;
          } else {
            chunks += data;
            contentLength = Buffer.byteLength(chunks);
          }
          if (contentLength > this.maxHttpBufferSize) {
            res.writeHead(413).end();
            cleanup();
          }
        };
        const onEnd = () => {
          this.onData(chunks);
          const headers = {
            // text/html is required instead of text/plain to avoid an
            // unwanted download dialog on certain user-agents (GH-43)
            "Content-Type": "text/html",
            "Content-Length": 2
          };
          res.writeHead(200, this.headers(req, headers));
          res.end("ok");
          cleanup();
        };
        req.on("close", onClose);
        if (!isBinary)
          req.setEncoding("utf8");
        req.on("data", onData);
        req.on("end", onEnd);
      }
      /**
       * Processes the incoming data payload.
       *
       * @param {String} encoded payload
       * @api private
       */
      onData(data) {
        debug('received "%s"', data);
        const callback = (packet) => {
          if ("close" === packet.type) {
            debug("got xhr close packet");
            this.onClose();
            return false;
          }
          this.onPacket(packet);
        };
        if (this.protocol === 3) {
          this.parser.decodePayload(data, callback);
        } else {
          this.parser.decodePayload(data).forEach(callback);
        }
      }
      /**
       * Overrides onClose.
       *
       * @api private
       */
      onClose() {
        if (this.writable) {
          this.send([{ type: "noop" }]);
        }
        super.onClose();
      }
      /**
       * Writes a packet payload.
       *
       * @param {Object} packet
       * @api private
       */
      send(packets) {
        this.writable = false;
        if (this.shouldClose) {
          debug("appending close packet to payload");
          packets.push({ type: "close" });
          this.shouldClose();
          this.shouldClose = null;
        }
        const doWrite = (data) => {
          const compress = packets.some((packet) => {
            return packet.options && packet.options.compress;
          });
          this.write(data, { compress });
        };
        if (this.protocol === 3) {
          this.parser.encodePayload(packets, this.supportsBinary, doWrite);
        } else {
          this.parser.encodePayload(packets, doWrite);
        }
      }
      /**
       * Writes data as response to poll request.
       *
       * @param {String} data
       * @param {Object} options
       * @api private
       */
      write(data, options) {
        debug('writing "%s"', data);
        this.doWrite(data, options, () => {
          this.req.cleanup();
        });
      }
      /**
       * Performs the write.
       *
       * @api private
       */
      doWrite(data, options, callback) {
        const isString = typeof data === "string";
        const contentType = isString ? "text/plain; charset=UTF-8" : "application/octet-stream";
        const headers = {
          "Content-Type": contentType
        };
        const respond = (data2) => {
          headers["Content-Length"] = "string" === typeof data2 ? Buffer.byteLength(data2) : data2.length;
          this.res.writeHead(200, this.headers(this.req, headers));
          this.res.end(data2);
          callback();
        };
        if (!this.httpCompression || !options.compress) {
          respond(data);
          return;
        }
        const len = isString ? Buffer.byteLength(data) : data.length;
        if (len < this.httpCompression.threshold) {
          respond(data);
          return;
        }
        const encoding = accepts(this.req).encodings(["gzip", "deflate"]);
        if (!encoding) {
          respond(data);
          return;
        }
        this.compress(data, encoding, (err, data2) => {
          if (err) {
            this.res.writeHead(500);
            this.res.end();
            callback(err);
            return;
          }
          headers["Content-Encoding"] = encoding;
          respond(data2);
        });
      }
      /**
       * Compresses data.
       *
       * @api private
       */
      compress(data, encoding, callback) {
        debug("compressing");
        const buffers = [];
        let nread = 0;
        compressionMethods[encoding](this.httpCompression).on("error", callback).on("data", function(chunk) {
          buffers.push(chunk);
          nread += chunk.length;
        }).on("end", function() {
          callback(null, Buffer.concat(buffers, nread));
        }).end(data);
      }
      /**
       * Closes the transport.
       *
       * @api private
       */
      doClose(fn) {
        debug("closing");
        let closeTimeoutTimer;
        if (this.dataReq) {
          debug("aborting ongoing data request");
          this.dataReq.destroy();
        }
        const onClose = () => {
          clearTimeout(closeTimeoutTimer);
          fn();
          this.onClose();
        };
        if (this.writable) {
          debug("transport writable - closing right away");
          this.send([{ type: "close" }]);
          onClose();
        } else if (this.discarded) {
          debug("transport discarded - closing right away");
          onClose();
        } else {
          debug("transport not writable - buffering orderly close");
          this.shouldClose = onClose;
          closeTimeoutTimer = setTimeout(onClose, this.closeTimeout);
        }
      }
      /**
       * Returns headers for a response.
       *
       * @param {http.IncomingMessage} request
       * @param {Object} extra headers
       * @api private
       */
      headers(req, headers) {
        headers = headers || {};
        const ua = req.headers["user-agent"];
        if (ua && (~ua.indexOf(";MSIE") || ~ua.indexOf("Trident/"))) {
          headers["X-XSS-Protection"] = "0";
        }
        headers["cache-control"] = "no-store";
        this.emit("headers", headers, req);
        return headers;
      }
    };
    exports2.Polling = Polling;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/polling-jsonp.js
var require_polling_jsonp = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/polling-jsonp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JSONP = void 0;
    var polling_1 = require_polling();
    var qs = require("querystring");
    var rDoubleSlashes = /\\\\n/g;
    var rSlashes = /(\\)?\\n/g;
    var JSONP = class extends polling_1.Polling {
      /**
       * JSON-P polling transport.
       *
       * @api public
       */
      constructor(req) {
        super(req);
        this.head = "___eio[" + (req._query.j || "").replace(/[^0-9]/g, "") + "](";
        this.foot = ");";
      }
      /**
       * Handles incoming data.
       * Due to a bug in \n handling by browsers, we expect a escaped string.
       *
       * @api private
       */
      onData(data) {
        data = qs.parse(data).d;
        if ("string" === typeof data) {
          data = data.replace(rSlashes, function(match, slashes) {
            return slashes ? match : "\n";
          });
          super.onData(data.replace(rDoubleSlashes, "\\n"));
        }
      }
      /**
       * Performs the write.
       *
       * @api private
       */
      doWrite(data, options, callback) {
        const js = JSON.stringify(data).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
        data = this.head + js + this.foot;
        super.doWrite(data, options, callback);
      }
    };
    exports2.JSONP = JSONP;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/websocket.js
var require_websocket = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/websocket.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WebSocket = void 0;
    var transport_1 = require_transport();
    var debug_1 = require_src();
    var debug = (0, debug_1.default)("engine:ws");
    var WebSocket = class extends transport_1.Transport {
      /**
       * WebSocket transport
       *
       * @param {http.IncomingMessage}
       * @api public
       */
      constructor(req) {
        super(req);
        this.socket = req.websocket;
        this.socket.on("message", (data, isBinary) => {
          const message = isBinary ? data : data.toString();
          debug('received "%s"', message);
          super.onData(message);
        });
        this.socket.once("close", this.onClose.bind(this));
        this.socket.on("error", this.onError.bind(this));
        this.writable = true;
        this.perMessageDeflate = null;
      }
      /**
       * Transport name
       *
       * @api public
       */
      get name() {
        return "websocket";
      }
      /**
       * Advertise upgrade support.
       *
       * @api public
       */
      get handlesUpgrades() {
        return true;
      }
      /**
       * Advertise framing support.
       *
       * @api public
       */
      get supportsFraming() {
        return true;
      }
      /**
       * Writes a packet payload.
       *
       * @param {Array} packets
       * @api private
       */
      send(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
          const packet = packets[i];
          const isLast = i + 1 === packets.length;
          const opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }
          const onSent = (err) => {
            if (err) {
              return this.onError("write error", err.stack);
            } else if (isLast) {
              this.writable = true;
              this.emit("drain");
            }
          };
          const send = (data) => {
            if (this.perMessageDeflate) {
              const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
              if (len < this.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
            debug('writing "%s"', data);
            this.socket.send(data, opts, onSent);
          };
          if (packet.options && typeof packet.options.wsPreEncoded === "string") {
            send(packet.options.wsPreEncoded);
          } else if (this._canSendPreEncodedFrame(packet)) {
            this.socket._sender.sendFrame(packet.options.wsPreEncodedFrame, onSent);
          } else {
            this.parser.encodePacket(packet, this.supportsBinary, send);
          }
        }
      }
      /**
       * Whether the encoding of the WebSocket frame can be skipped.
       * @param packet
       * @private
       */
      _canSendPreEncodedFrame(packet) {
        var _a, _b, _c;
        return !this.perMessageDeflate && typeof ((_b = (_a = this.socket) === null || _a === void 0 ? void 0 : _a._sender) === null || _b === void 0 ? void 0 : _b.sendFrame) === "function" && ((_c = packet.options) === null || _c === void 0 ? void 0 : _c.wsPreEncodedFrame) !== void 0;
      }
      /**
       * Closes the transport.
       *
       * @api private
       */
      doClose(fn) {
        debug("closing");
        this.socket.close();
        fn && fn();
      }
    };
    exports2.WebSocket = WebSocket;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/webtransport.js
var require_webtransport = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/webtransport.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WebTransport = void 0;
    var transport_1 = require_transport();
    var debug_1 = require_src();
    var engine_io_parser_1 = require_cjs();
    var debug = (0, debug_1.default)("engine:webtransport");
    var WebTransport = class extends transport_1.Transport {
      constructor(session, stream, reader) {
        super({ _query: { EIO: "4" } });
        this.session = session;
        const transformStream = (0, engine_io_parser_1.createPacketEncoderStream)();
        transformStream.readable.pipeTo(stream.writable).catch(() => {
          debug("the stream was closed");
        });
        this.writer = transformStream.writable.getWriter();
        (async () => {
          try {
            while (true) {
              const { value, done } = await reader.read();
              if (done) {
                debug("session is closed");
                break;
              }
              debug("received chunk: %o", value);
              this.onPacket(value);
            }
          } catch (e) {
            debug("error while reading: %s", e.message);
          }
        })();
        session.closed.then(() => this.onClose());
        this.writable = true;
      }
      get name() {
        return "webtransport";
      }
      get supportsFraming() {
        return true;
      }
      async send(packets) {
        this.writable = false;
        try {
          for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            await this.writer.write(packet);
          }
        } catch (e) {
          debug("error while writing: %s", e.message);
        }
        this.writable = true;
        this.emit("drain");
      }
      doClose(fn) {
        debug("closing WebTransport session");
        this.session.close();
        fn && fn();
      }
    };
    exports2.WebTransport = WebTransport;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/index.js
var require_transports = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var polling_1 = require_polling();
    var polling_jsonp_1 = require_polling_jsonp();
    var websocket_1 = require_websocket();
    var webtransport_1 = require_webtransport();
    exports2.default = {
      polling,
      websocket: websocket_1.WebSocket,
      webtransport: webtransport_1.WebTransport
    };
    function polling(req) {
      if ("string" === typeof req._query.j) {
        return new polling_jsonp_1.JSONP(req);
      } else {
        return new polling_1.Polling(req);
      }
    }
    polling.upgradesTo = ["websocket", "webtransport"];
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/socket.js
var require_socket = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/socket.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Socket = void 0;
    var events_1 = require("events");
    var debug_1 = require_src();
    var timers_1 = require("timers");
    var debug = (0, debug_1.default)("engine:socket");
    var Socket2 = class extends events_1.EventEmitter {
      /**
       * Client class (abstract).
       *
       * @api private
       */
      constructor(id, server, transport, req, protocol) {
        super();
        this._readyState = "opening";
        this.upgrading = false;
        this.upgraded = false;
        this.writeBuffer = [];
        this.packetsFn = [];
        this.sentCallbackFn = [];
        this.cleanupFn = [];
        this.id = id;
        this.server = server;
        this.request = req;
        this.protocol = protocol;
        if (req) {
          if (req.websocket && req.websocket._socket) {
            this.remoteAddress = req.websocket._socket.remoteAddress;
          } else {
            this.remoteAddress = req.connection.remoteAddress;
          }
        } else {
        }
        this.pingTimeoutTimer = null;
        this.pingIntervalTimer = null;
        this.setTransport(transport);
        this.onOpen();
      }
      get readyState() {
        return this._readyState;
      }
      set readyState(state) {
        debug("readyState updated from %s to %s", this._readyState, state);
        this._readyState = state;
      }
      /**
       * Called upon transport considered open.
       *
       * @api private
       */
      onOpen() {
        this.readyState = "open";
        this.transport.sid = this.id;
        this.sendPacket("open", JSON.stringify({
          sid: this.id,
          upgrades: this.getAvailableUpgrades(),
          pingInterval: this.server.opts.pingInterval,
          pingTimeout: this.server.opts.pingTimeout,
          maxPayload: this.server.opts.maxHttpBufferSize
        }));
        if (this.server.opts.initialPacket) {
          this.sendPacket("message", this.server.opts.initialPacket);
        }
        this.emit("open");
        if (this.protocol === 3) {
          this.resetPingTimeout(this.server.opts.pingInterval + this.server.opts.pingTimeout);
        } else {
          this.schedulePing();
        }
      }
      /**
       * Called upon transport packet.
       *
       * @param {Object} packet
       * @api private
       */
      onPacket(packet) {
        if ("open" !== this.readyState) {
          return debug("packet received with closed socket");
        }
        debug(`received packet ${packet.type}`);
        this.emit("packet", packet);
        this.resetPingTimeout(this.server.opts.pingInterval + this.server.opts.pingTimeout);
        switch (packet.type) {
          case "ping":
            if (this.transport.protocol !== 3) {
              this.onError("invalid heartbeat direction");
              return;
            }
            debug("got ping");
            this.sendPacket("pong");
            this.emit("heartbeat");
            break;
          case "pong":
            if (this.transport.protocol === 3) {
              this.onError("invalid heartbeat direction");
              return;
            }
            debug("got pong");
            this.pingIntervalTimer.refresh();
            this.emit("heartbeat");
            break;
          case "error":
            this.onClose("parse error");
            break;
          case "message":
            this.emit("data", packet.data);
            this.emit("message", packet.data);
            break;
        }
      }
      /**
       * Called upon transport error.
       *
       * @param {Error} err - error object
       * @api private
       */
      onError(err) {
        debug("transport error");
        this.onClose("transport error", err);
      }
      /**
       * Pings client every `this.pingInterval` and expects response
       * within `this.pingTimeout` or closes connection.
       *
       * @api private
       */
      schedulePing() {
        this.pingIntervalTimer = (0, timers_1.setTimeout)(() => {
          debug("writing ping packet - expecting pong within %sms", this.server.opts.pingTimeout);
          this.sendPacket("ping");
          this.resetPingTimeout(this.server.opts.pingTimeout);
        }, this.server.opts.pingInterval);
      }
      /**
       * Resets ping timeout.
       *
       * @api private
       */
      resetPingTimeout(timeout) {
        (0, timers_1.clearTimeout)(this.pingTimeoutTimer);
        this.pingTimeoutTimer = (0, timers_1.setTimeout)(() => {
          if (this.readyState === "closed")
            return;
          this.onClose("ping timeout");
        }, timeout);
      }
      /**
       * Attaches handlers for the given transport.
       *
       * @param {Transport} transport
       * @api private
       */
      setTransport(transport) {
        const onError = this.onError.bind(this);
        const onPacket = this.onPacket.bind(this);
        const flush = this.flush.bind(this);
        const onClose = this.onClose.bind(this, "transport close");
        this.transport = transport;
        this.transport.once("error", onError);
        this.transport.on("packet", onPacket);
        this.transport.on("drain", flush);
        this.transport.once("close", onClose);
        this.setupSendCallback();
        this.cleanupFn.push(function() {
          transport.removeListener("error", onError);
          transport.removeListener("packet", onPacket);
          transport.removeListener("drain", flush);
          transport.removeListener("close", onClose);
        });
      }
      /**
       * Upgrades socket to the given transport
       *
       * @param {Transport} transport
       * @api private
       */
      maybeUpgrade(transport) {
        debug('might upgrade socket transport from "%s" to "%s"', this.transport.name, transport.name);
        this.upgrading = true;
        const upgradeTimeoutTimer = (0, timers_1.setTimeout)(() => {
          debug("client did not complete upgrade - closing transport");
          cleanup();
          if ("open" === transport.readyState) {
            transport.close();
          }
        }, this.server.opts.upgradeTimeout);
        let checkIntervalTimer;
        const onPacket = (packet) => {
          if ("ping" === packet.type && "probe" === packet.data) {
            debug("got probe ping packet, sending pong");
            transport.send([{ type: "pong", data: "probe" }]);
            this.emit("upgrading", transport);
            clearInterval(checkIntervalTimer);
            checkIntervalTimer = setInterval(check, 100);
          } else if ("upgrade" === packet.type && this.readyState !== "closed") {
            debug("got upgrade packet - upgrading");
            cleanup();
            this.transport.discard();
            this.upgraded = true;
            this.clearTransport();
            this.setTransport(transport);
            this.emit("upgrade", transport);
            this.flush();
            if (this.readyState === "closing") {
              transport.close(() => {
                this.onClose("forced close");
              });
            }
          } else {
            cleanup();
            transport.close();
          }
        };
        const check = () => {
          if ("polling" === this.transport.name && this.transport.writable) {
            debug("writing a noop packet to polling for fast upgrade");
            this.transport.send([{ type: "noop" }]);
          }
        };
        const cleanup = () => {
          this.upgrading = false;
          clearInterval(checkIntervalTimer);
          (0, timers_1.clearTimeout)(upgradeTimeoutTimer);
          transport.removeListener("packet", onPacket);
          transport.removeListener("close", onTransportClose);
          transport.removeListener("error", onError);
          this.removeListener("close", onClose);
        };
        const onError = (err) => {
          debug("client did not complete upgrade - %s", err);
          cleanup();
          transport.close();
          transport = null;
        };
        const onTransportClose = () => {
          onError("transport closed");
        };
        const onClose = () => {
          onError("socket closed");
        };
        transport.on("packet", onPacket);
        transport.once("close", onTransportClose);
        transport.once("error", onError);
        this.once("close", onClose);
      }
      /**
       * Clears listeners and timers associated with current transport.
       *
       * @api private
       */
      clearTransport() {
        let cleanup;
        const toCleanUp = this.cleanupFn.length;
        for (let i = 0; i < toCleanUp; i++) {
          cleanup = this.cleanupFn.shift();
          cleanup();
        }
        this.transport.on("error", function() {
          debug("error triggered by discarded transport");
        });
        this.transport.close();
        (0, timers_1.clearTimeout)(this.pingTimeoutTimer);
      }
      /**
       * Called upon transport considered closed.
       * Possible reasons: `ping timeout`, `client error`, `parse error`,
       * `transport error`, `server close`, `transport close`
       */
      onClose(reason, description) {
        if ("closed" !== this.readyState) {
          this.readyState = "closed";
          (0, timers_1.clearTimeout)(this.pingIntervalTimer);
          (0, timers_1.clearTimeout)(this.pingTimeoutTimer);
          process.nextTick(() => {
            this.writeBuffer = [];
          });
          this.packetsFn = [];
          this.sentCallbackFn = [];
          this.clearTransport();
          this.emit("close", reason, description);
        }
      }
      /**
       * Setup and manage send callback
       *
       * @api private
       */
      setupSendCallback() {
        const onDrain = () => {
          if (this.sentCallbackFn.length > 0) {
            const seqFn = this.sentCallbackFn.splice(0, 1)[0];
            if ("function" === typeof seqFn) {
              debug("executing send callback");
              seqFn(this.transport);
            } else if (Array.isArray(seqFn)) {
              debug("executing batch send callback");
              const l = seqFn.length;
              let i = 0;
              for (; i < l; i++) {
                if ("function" === typeof seqFn[i]) {
                  seqFn[i](this.transport);
                }
              }
            }
          }
        };
        this.transport.on("drain", onDrain);
        this.cleanupFn.push(() => {
          this.transport.removeListener("drain", onDrain);
        });
      }
      /**
       * Sends a message packet.
       *
       * @param {Object} data
       * @param {Object} options
       * @param {Function} callback
       * @return {Socket} for chaining
       * @api public
       */
      send(data, options, callback) {
        this.sendPacket("message", data, options, callback);
        return this;
      }
      /**
       * Alias of {@link send}.
       *
       * @param data
       * @param options
       * @param callback
       */
      write(data, options, callback) {
        this.sendPacket("message", data, options, callback);
        return this;
      }
      /**
       * Sends a packet.
       *
       * @param {String} type - packet type
       * @param {String} data
       * @param {Object} options
       * @param {Function} callback
       *
       * @api private
       */
      sendPacket(type, data, options = {}, callback) {
        if ("function" === typeof options) {
          callback = options;
          options = {};
        }
        if ("closing" !== this.readyState && "closed" !== this.readyState) {
          debug('sending packet "%s" (%s)', type, data);
          options.compress = options.compress !== false;
          const packet = {
            type,
            options
          };
          if (data)
            packet.data = data;
          this.emit("packetCreate", packet);
          this.writeBuffer.push(packet);
          if (callback)
            this.packetsFn.push(callback);
          this.flush();
        }
      }
      /**
       * Attempts to flush the packets buffer.
       *
       * @api private
       */
      flush() {
        if ("closed" !== this.readyState && this.transport.writable && this.writeBuffer.length) {
          debug("flushing buffer to transport");
          this.emit("flush", this.writeBuffer);
          this.server.emit("flush", this, this.writeBuffer);
          const wbuf = this.writeBuffer;
          this.writeBuffer = [];
          if (!this.transport.supportsFraming) {
            this.sentCallbackFn.push(this.packetsFn);
          } else {
            this.sentCallbackFn.push.apply(this.sentCallbackFn, this.packetsFn);
          }
          this.packetsFn = [];
          this.transport.send(wbuf);
          this.emit("drain");
          this.server.emit("drain", this);
        }
      }
      /**
       * Get available upgrades for this socket.
       *
       * @api private
       */
      getAvailableUpgrades() {
        const availableUpgrades = [];
        const allUpgrades = this.server.upgrades(this.transport.name);
        let i = 0;
        const l = allUpgrades.length;
        for (; i < l; ++i) {
          const upg = allUpgrades[i];
          if (this.server.opts.transports.indexOf(upg) !== -1) {
            availableUpgrades.push(upg);
          }
        }
        return availableUpgrades;
      }
      /**
       * Closes the socket and underlying transport.
       *
       * @param {Boolean} discard - optional, discard the transport
       * @return {Socket} for chaining
       * @api public
       */
      close(discard) {
        if ("open" !== this.readyState)
          return;
        this.readyState = "closing";
        if (this.writeBuffer.length) {
          debug("there are %d remaining packets in the buffer, waiting for the 'drain' event", this.writeBuffer.length);
          this.once("drain", () => {
            debug("all packets have been sent, closing the transport");
            this.closeTransport(discard);
          });
          return;
        }
        debug("the buffer is empty, closing the transport right away", discard);
        this.closeTransport(discard);
      }
      /**
       * Closes the underlying transport.
       *
       * @param {Boolean} discard
       * @api private
       */
      closeTransport(discard) {
        debug("closing the transport (discard? %s)", discard);
        if (discard)
          this.transport.discard();
        this.transport.close(this.onClose.bind(this, "forced close"));
      }
    };
    exports2.Socket = Socket2;
  }
});

// node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js"(exports2) {
    "use strict";
    exports2.parse = parse;
    exports2.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(";");
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var index = pair.indexOf("=");
        if (index < 0) {
          continue;
        }
        var key = pair.substring(0, index).trim();
        if (void 0 == obj[key]) {
          var val = pair.substring(index + 1, pair.length).trim();
          if (val[0] === '"') {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    function concat(list, totalLength) {
      if (list.length === 0)
        return EMPTY_BUFFER;
      if (list.length === 1)
        return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength)
        return target.slice(0, offset);
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module2.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = require("bufferutil");
        module2.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bufferUtil.mask(source, mask, output, offset, length);
        };
        module2.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       * @param {Boolean} [isServer=false] Create the instance in either server or
       *     client mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin)
            data2 = data2.slice(0, data2.length - 4);
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    module2.exports = {
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = require("utf-8-validate");
        module2.exports.isValidUTF8 = function(buf) {
          return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = buf.slice(n);
          return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = buf.slice(n);
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
          }
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (this._payloadLength > 125) {
            this._loop = false;
            return error(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          }
        } else {
          this._loop = false;
          return error(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
          }
        } else if (this._masked) {
          this._loop = false;
          return error(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      /**
       * Payload length has been read.
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(
                error(
                  RangeError,
                  "Max payload size exceeded",
                  false,
                  1009,
                  "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
                )
              );
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @return {(Error|undefined)} A possible error
       * @private
       */
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data, true);
          } else {
            const buf = concat(fragments, messageLength);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              this._loop = false;
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("message", buf, false);
          }
        }
        this._state = GET_INFO;
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else if (data.length === 1) {
            return error(
              RangeError,
              "invalid payload length 1",
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
            }
            const buf = data.slice(2);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("conclude", code, buf);
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    module2.exports = Receiver;
    function error(ErrorCtor, message, prefix, statusCode, errorCode) {
      const err = new ErrorCtor(
        prefix ? `Invalid WebSocket frame: ${message}` : message
      );
      Error.captureStackTrace(err, error);
      err.code = errorCode;
      err[kStatusCode] = statusCode;
      return err;
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var { randomFillSync } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var Sender = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {(net.Socket|tls.Socket)} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            randomFillSync(mask, 0, 4);
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask)
          return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking)
          return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            [kByteLength]: byteLength,
            fin: options.fin,
            generateMask: this._generateMask,
            mask: options.mask,
            maskBuffer: this._maskBuffer,
            opcode,
            readOnly,
            rsv1
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, data, this._compress, opts, cb]);
          } else {
            this.dispatch(data, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(
            _Sender.frame(data, {
              [kByteLength]: byteLength,
              fin: options.fin,
              generateMask: this._generateMask,
              mask: options.mask,
              maskBuffer: this._maskBuffer,
              opcode,
              readOnly,
              rsv1: false
            }),
            cb
          );
        }
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            if (typeof cb === "function")
              cb(err);
            for (let i = 0; i < this._queue.length; i++) {
              const params = this._queue[i];
              const callback = params[params.length - 1];
              if (typeof callback === "function")
                callback(err);
            }
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {Buffer[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender;
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = Symbol("kCode");
    var kData = Symbol("kData");
    var kError = Symbol("kError");
    var kMessage = Symbol("kMessage");
    var kReason = Symbol("kReason");
    var kTarget = Symbol("kTarget");
    var kType = Symbol("kType");
    var kWasClean = Symbol("kWasClean");
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module2.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0)
        dest[name] = [elem];
      else
        dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1)
              start = i;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values))
                values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse };
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/websocket.js
var require_websocket2 = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var https = require("https");
    var http = require("http");
    var net = require("net");
    var tls = require("tls");
    var { randomBytes, createHash } = require("crypto");
    var { Readable } = require("stream");
    var { URL } = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var closeTimeout = 30 * 1e3;
    var kAborted = Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      /**
       * This deviates from the WHATWG interface since ws doesn't support the
       * required default "blob" type (instead we define a custom "nodebuffer"
       * type).
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        const receiver = new Receiver({
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        this._sender = new Sender(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED)
          return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._closeTimer = setTimeout(
          this._socket.destroy.bind(this._socket),
          closeTimeout
        );
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain)
          this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED)
          return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute])
              return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function")
            return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket.prototype.addEventListener = addEventListener;
    WebSocket.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        createConnection: void 0,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL) {
        parsedUrl = address;
        websocket._url = address.href;
      } else {
        try {
          parsedUrl = new URL(address);
        } catch (e) {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
        websocket._url = address;
      }
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost)
              delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted])
          return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket.CONNECTING)
          return;
        req = websocket._req = null;
        if (res.headers.upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      req.end();
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket.CLOSING;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = toBuffer(data).length;
        if (websocket._socket)
          websocket._sender._bufferedBytes += length;
        else
          websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        cb(err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0)
        return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused)
        websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      websocket.emit("error", err);
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data))
          ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed)
          return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed)
          return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called)
            callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy)
          ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null)
          return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted)
            duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused)
          ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream;
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/subprotocol.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1)
            end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module2.exports = { parse };
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var http = require("http");
    var https = require("https");
    var net = require("net");
    var tls = require("tls");
    var { createHash } = require("crypto");
    var extension = require_extension();
    var PerMessageDeflate = require_permessage_deflate();
    var subprotocol = require_subprotocol();
    var WebSocket = require_websocket2();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb)
          this.once("close", cb);
        if (this._state === CLOSING)
          return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (req.headers.upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!key || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 8 && version !== 13) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING)
          return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer;
    function addListeners(server, map) {
      for (const event of Object.keys(map))
        server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message);
      }
    }
  }
});

// node_modules/.pnpm/ws@8.11.0/node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/.pnpm/ws@8.11.0/node_modules/ws/index.js"(exports2, module2) {
    "use strict";
    var WebSocket = require_websocket2();
    WebSocket.createWebSocketStream = require_stream();
    WebSocket.Server = require_websocket_server();
    WebSocket.Receiver = require_receiver();
    WebSocket.Sender = require_sender();
    WebSocket.WebSocket = WebSocket;
    WebSocket.WebSocketServer = WebSocket.Server;
    module2.exports = WebSocket;
  }
});

// node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js
var require_vary = __commonJS({
  "node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js"(exports2, module2) {
    "use strict";
    module2.exports = vary;
    module2.exports.append = append;
    var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    function append(header, field) {
      if (typeof header !== "string") {
        throw new TypeError("header argument is required");
      }
      if (!field) {
        throw new TypeError("field argument is required");
      }
      var fields = !Array.isArray(field) ? parse(String(field)) : field;
      for (var j = 0; j < fields.length; j++) {
        if (!FIELD_NAME_REGEXP.test(fields[j])) {
          throw new TypeError("field argument contains an invalid header name");
        }
      }
      if (header === "*") {
        return header;
      }
      var val = header;
      var vals = parse(header.toLowerCase());
      if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
      }
      for (var i = 0; i < fields.length; i++) {
        var fld = fields[i].toLowerCase();
        if (vals.indexOf(fld) === -1) {
          vals.push(fld);
          val = val ? val + ", " + fields[i] : fields[i];
        }
      }
      return val;
    }
    function parse(header) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = header.length; i < len; i++) {
        switch (header.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            list.push(header.substring(start, end));
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      list.push(header.substring(start, end));
      return list;
    }
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});

// node_modules/.pnpm/cors@2.8.5/node_modules/cors/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/cors@2.8.5/node_modules/cors/lib/index.js"(exports2, module2) {
    (function() {
      "use strict";
      var assign = require_object_assign();
      var vary = require_vary();
      var defaults = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
      };
      function isString(s) {
        return typeof s === "string" || s instanceof String;
      }
      function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
          for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
              return true;
            }
          }
          return false;
        } else if (isString(allowedOrigin)) {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        } else {
          return !!allowedOrigin;
        }
      }
      function configureOrigin(options, req) {
        var requestOrigin = req.headers.origin, headers = [], isAllowed;
        if (!options.origin || options.origin === "*") {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: "*"
          }]);
        } else if (isString(options.origin)) {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: options.origin
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        } else {
          isAllowed = isOriginAllowed(requestOrigin, options.origin);
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: isAllowed ? requestOrigin : false
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        }
        return headers;
      }
      function configureMethods(options) {
        var methods = options.methods;
        if (methods.join) {
          methods = options.methods.join(",");
        }
        return {
          key: "Access-Control-Allow-Methods",
          value: methods
        };
      }
      function configureCredentials(options) {
        if (options.credentials === true) {
          return {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          };
        }
        return null;
      }
      function configureAllowedHeaders(options, req) {
        var allowedHeaders = options.allowedHeaders || options.headers;
        var headers = [];
        if (!allowedHeaders) {
          allowedHeaders = req.headers["access-control-request-headers"];
          headers.push([{
            key: "Vary",
            value: "Access-Control-Request-Headers"
          }]);
        } else if (allowedHeaders.join) {
          allowedHeaders = allowedHeaders.join(",");
        }
        if (allowedHeaders && allowedHeaders.length) {
          headers.push([{
            key: "Access-Control-Allow-Headers",
            value: allowedHeaders
          }]);
        }
        return headers;
      }
      function configureExposedHeaders(options) {
        var headers = options.exposedHeaders;
        if (!headers) {
          return null;
        } else if (headers.join) {
          headers = headers.join(",");
        }
        if (headers && headers.length) {
          return {
            key: "Access-Control-Expose-Headers",
            value: headers
          };
        }
        return null;
      }
      function configureMaxAge(options) {
        var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
        if (maxAge && maxAge.length) {
          return {
            key: "Access-Control-Max-Age",
            value: maxAge
          };
        }
        return null;
      }
      function applyHeaders(headers, res) {
        for (var i = 0, n = headers.length; i < n; i++) {
          var header = headers[i];
          if (header) {
            if (Array.isArray(header)) {
              applyHeaders(header, res);
            } else if (header.key === "Vary" && header.value) {
              vary(res, header.value);
            } else if (header.value) {
              res.setHeader(header.key, header.value);
            }
          }
        }
      }
      function cors(options, req, res, next) {
        var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
        if (method === "OPTIONS") {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureMethods(options, req));
          headers.push(configureAllowedHeaders(options, req));
          headers.push(configureMaxAge(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          if (options.preflightContinue) {
            next();
          } else {
            res.statusCode = options.optionsSuccessStatus;
            res.setHeader("Content-Length", "0");
            res.end();
          }
        } else {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          next();
        }
      }
      function middlewareWrapper(o) {
        var optionsCallback = null;
        if (typeof o === "function") {
          optionsCallback = o;
        } else {
          optionsCallback = function(req, cb) {
            cb(null, o);
          };
        }
        return function corsMiddleware(req, res, next) {
          optionsCallback(req, function(err, options) {
            if (err) {
              next(err);
            } else {
              var corsOptions = assign({}, defaults, options);
              var originCallback = null;
              if (corsOptions.origin && typeof corsOptions.origin === "function") {
                originCallback = corsOptions.origin;
              } else if (corsOptions.origin) {
                originCallback = function(origin, cb) {
                  cb(null, corsOptions.origin);
                };
              }
              if (originCallback) {
                originCallback(req.headers.origin, function(err2, origin) {
                  if (err2 || !origin) {
                    next(err2);
                  } else {
                    corsOptions.origin = origin;
                    cors(corsOptions, req, res, next);
                  }
                });
              } else {
                next();
              }
            }
          });
        };
      }
      module2.exports = middlewareWrapper;
    })();
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/server.js
var require_server = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/server.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Server = exports2.BaseServer = void 0;
    var qs = require("querystring");
    var url_1 = require("url");
    var base64id = require_base64id();
    var transports_1 = require_transports();
    var events_1 = require("events");
    var socket_1 = require_socket();
    var debug_1 = require_src();
    var cookie_1 = require_cookie();
    var ws_1 = require_ws();
    var webtransport_1 = require_webtransport();
    var engine_io_parser_1 = require_cjs();
    var debug = (0, debug_1.default)("engine");
    var kResponseHeaders = Symbol("responseHeaders");
    function parseSessionId(data) {
      try {
        const parsed = JSON.parse(data);
        if (typeof parsed.sid === "string") {
          return parsed.sid;
        }
      } catch (e) {
      }
    }
    var BaseServer = class extends events_1.EventEmitter {
      /**
       * Server constructor.
       *
       * @param {Object} opts - options
       * @api public
       */
      constructor(opts = {}) {
        super();
        this.middlewares = [];
        this.clients = {};
        this.clientsCount = 0;
        this.opts = Object.assign({
          wsEngine: ws_1.Server,
          pingTimeout: 2e4,
          pingInterval: 25e3,
          upgradeTimeout: 1e4,
          maxHttpBufferSize: 1e6,
          transports: ["polling", "websocket"],
          allowUpgrades: true,
          httpCompression: {
            threshold: 1024
          },
          cors: false,
          allowEIO3: false
        }, opts);
        if (opts.cookie) {
          this.opts.cookie = Object.assign({
            name: "io",
            path: "/",
            // @ts-ignore
            httpOnly: opts.cookie.path !== false,
            sameSite: "lax"
          }, opts.cookie);
        }
        if (this.opts.cors) {
          this.use(require_lib()(this.opts.cors));
        }
        if (opts.perMessageDeflate) {
          this.opts.perMessageDeflate = Object.assign({
            threshold: 1024
          }, opts.perMessageDeflate);
        }
        this.init();
      }
      /**
       * Compute the pathname of the requests that are handled by the server
       * @param options
       * @protected
       */
      _computePath(options) {
        let path = (options.path || "/engine.io").replace(/\/$/, "");
        if (options.addTrailingSlash !== false) {
          path += "/";
        }
        return path;
      }
      /**
       * Returns a list of available transports for upgrade given a certain transport.
       *
       * @return {Array}
       * @api public
       */
      upgrades(transport) {
        if (!this.opts.allowUpgrades)
          return [];
        return transports_1.default[transport].upgradesTo || [];
      }
      /**
       * Verifies a request.
       *
       * @param {http.IncomingMessage}
       * @return {Boolean} whether the request is valid
       * @api private
       */
      verify(req, upgrade, fn) {
        const transport = req._query.transport;
        if (!~this.opts.transports.indexOf(transport) || transport === "webtransport") {
          debug('unknown transport "%s"', transport);
          return fn(Server2.errors.UNKNOWN_TRANSPORT, { transport });
        }
        const isOriginInvalid = checkInvalidHeaderChar(req.headers.origin);
        if (isOriginInvalid) {
          const origin = req.headers.origin;
          req.headers.origin = null;
          debug("origin header invalid");
          return fn(Server2.errors.BAD_REQUEST, {
            name: "INVALID_ORIGIN",
            origin
          });
        }
        const sid = req._query.sid;
        if (sid) {
          if (!this.clients.hasOwnProperty(sid)) {
            debug('unknown sid "%s"', sid);
            return fn(Server2.errors.UNKNOWN_SID, {
              sid
            });
          }
          const previousTransport = this.clients[sid].transport.name;
          if (!upgrade && previousTransport !== transport) {
            debug("bad request: unexpected transport without upgrade");
            return fn(Server2.errors.BAD_REQUEST, {
              name: "TRANSPORT_MISMATCH",
              transport,
              previousTransport
            });
          }
        } else {
          if ("GET" !== req.method) {
            return fn(Server2.errors.BAD_HANDSHAKE_METHOD, {
              method: req.method
            });
          }
          if (transport === "websocket" && !upgrade) {
            debug("invalid transport upgrade");
            return fn(Server2.errors.BAD_REQUEST, {
              name: "TRANSPORT_HANDSHAKE_ERROR"
            });
          }
          if (!this.opts.allowRequest)
            return fn();
          return this.opts.allowRequest(req, (message, success) => {
            if (!success) {
              return fn(Server2.errors.FORBIDDEN, {
                message
              });
            }
            fn();
          });
        }
        fn();
      }
      /**
       * Adds a new middleware.
       *
       * @example
       * import helmet from "helmet";
       *
       * engine.use(helmet());
       *
       * @param fn
       */
      use(fn) {
        this.middlewares.push(fn);
      }
      /**
       * Apply the middlewares to the request.
       *
       * @param req
       * @param res
       * @param callback
       * @protected
       */
      _applyMiddlewares(req, res, callback) {
        if (this.middlewares.length === 0) {
          debug("no middleware to apply, skipping");
          return callback();
        }
        const apply = (i) => {
          debug("applying middleware n\xB0%d", i + 1);
          this.middlewares[i](req, res, (err) => {
            if (err) {
              return callback(err);
            }
            if (i + 1 < this.middlewares.length) {
              apply(i + 1);
            } else {
              callback();
            }
          });
        };
        apply(0);
      }
      /**
       * Closes all clients.
       *
       * @api public
       */
      close() {
        debug("closing all open clients");
        for (let i in this.clients) {
          if (this.clients.hasOwnProperty(i)) {
            this.clients[i].close(true);
          }
        }
        this.cleanup();
        return this;
      }
      /**
       * generate a socket id.
       * Overwrite this method to generate your custom socket id
       *
       * @param {Object} request object
       * @api public
       */
      generateId(req) {
        return base64id.generateId();
      }
      /**
       * Handshakes a new client.
       *
       * @param {String} transport name
       * @param {Object} request object
       * @param {Function} closeConnection
       *
       * @api protected
       */
      async handshake(transportName, req, closeConnection) {
        const protocol = req._query.EIO === "4" ? 4 : 3;
        if (protocol === 3 && !this.opts.allowEIO3) {
          debug("unsupported protocol version");
          this.emit("connection_error", {
            req,
            code: Server2.errors.UNSUPPORTED_PROTOCOL_VERSION,
            message: Server2.errorMessages[Server2.errors.UNSUPPORTED_PROTOCOL_VERSION],
            context: {
              protocol
            }
          });
          closeConnection(Server2.errors.UNSUPPORTED_PROTOCOL_VERSION);
          return;
        }
        let id;
        try {
          id = await this.generateId(req);
        } catch (e) {
          debug("error while generating an id");
          this.emit("connection_error", {
            req,
            code: Server2.errors.BAD_REQUEST,
            message: Server2.errorMessages[Server2.errors.BAD_REQUEST],
            context: {
              name: "ID_GENERATION_ERROR",
              error: e
            }
          });
          closeConnection(Server2.errors.BAD_REQUEST);
          return;
        }
        debug('handshaking client "%s"', id);
        try {
          var transport = this.createTransport(transportName, req);
          if ("polling" === transportName) {
            transport.maxHttpBufferSize = this.opts.maxHttpBufferSize;
            transport.httpCompression = this.opts.httpCompression;
          } else if ("websocket" === transportName) {
            transport.perMessageDeflate = this.opts.perMessageDeflate;
          }
        } catch (e) {
          debug('error handshaking to transport "%s"', transportName);
          this.emit("connection_error", {
            req,
            code: Server2.errors.BAD_REQUEST,
            message: Server2.errorMessages[Server2.errors.BAD_REQUEST],
            context: {
              name: "TRANSPORT_HANDSHAKE_ERROR",
              error: e
            }
          });
          closeConnection(Server2.errors.BAD_REQUEST);
          return;
        }
        const socket = new socket_1.Socket(id, this, transport, req, protocol);
        transport.on("headers", (headers, req2) => {
          const isInitialRequest = !req2._query.sid;
          if (isInitialRequest) {
            if (this.opts.cookie) {
              headers["Set-Cookie"] = [
                // @ts-ignore
                (0, cookie_1.serialize)(this.opts.cookie.name, id, this.opts.cookie)
              ];
            }
            this.emit("initial_headers", headers, req2);
          }
          this.emit("headers", headers, req2);
        });
        transport.onRequest(req);
        this.clients[id] = socket;
        this.clientsCount++;
        socket.once("close", () => {
          delete this.clients[id];
          this.clientsCount--;
        });
        this.emit("connection", socket);
        return transport;
      }
      async onWebTransportSession(session) {
        const timeout = setTimeout(() => {
          debug("the client failed to establish a bidirectional stream in the given period");
          session.close();
        }, this.opts.upgradeTimeout);
        const streamReader = session.incomingBidirectionalStreams.getReader();
        const result = await streamReader.read();
        if (result.done) {
          debug("session is closed");
          return;
        }
        const stream = result.value;
        const transformStream = (0, engine_io_parser_1.createPacketDecoderStream)(this.opts.maxHttpBufferSize, "nodebuffer");
        const reader = stream.readable.pipeThrough(transformStream).getReader();
        const { value, done } = await reader.read();
        if (done) {
          debug("stream is closed");
          return;
        }
        clearTimeout(timeout);
        if (value.type !== "open") {
          debug("invalid WebTransport handshake");
          return session.close();
        }
        if (value.data === void 0) {
          const transport = new webtransport_1.WebTransport(session, stream, reader);
          const id = base64id.generateId();
          debug('handshaking client "%s" (WebTransport)', id);
          const socket = new socket_1.Socket(id, this, transport, null, 4);
          this.clients[id] = socket;
          this.clientsCount++;
          socket.once("close", () => {
            delete this.clients[id];
            this.clientsCount--;
          });
          this.emit("connection", socket);
          return;
        }
        const sid = parseSessionId(value.data);
        if (!sid) {
          debug("invalid WebTransport handshake");
          return session.close();
        }
        const client = this.clients[sid];
        if (!client) {
          debug("upgrade attempt for closed client");
          session.close();
        } else if (client.upgrading) {
          debug("transport has already been trying to upgrade");
          session.close();
        } else if (client.upgraded) {
          debug("transport had already been upgraded");
          session.close();
        } else {
          debug("upgrading existing transport");
          const transport = new webtransport_1.WebTransport(session, stream, reader);
          client.maybeUpgrade(transport);
        }
      }
    };
    exports2.BaseServer = BaseServer;
    BaseServer.errors = {
      UNKNOWN_TRANSPORT: 0,
      UNKNOWN_SID: 1,
      BAD_HANDSHAKE_METHOD: 2,
      BAD_REQUEST: 3,
      FORBIDDEN: 4,
      UNSUPPORTED_PROTOCOL_VERSION: 5
    };
    BaseServer.errorMessages = {
      0: "Transport unknown",
      1: "Session ID unknown",
      2: "Bad handshake method",
      3: "Bad request",
      4: "Forbidden",
      5: "Unsupported protocol version"
    };
    var WebSocketResponse = class {
      constructor(req, socket) {
        this.req = req;
        this.socket = socket;
        req[kResponseHeaders] = {};
      }
      setHeader(name, value) {
        this.req[kResponseHeaders][name] = value;
      }
      getHeader(name) {
        return this.req[kResponseHeaders][name];
      }
      removeHeader(name) {
        delete this.req[kResponseHeaders][name];
      }
      write() {
      }
      writeHead() {
      }
      end() {
        this.socket.destroy();
      }
    };
    var Server2 = class _Server extends BaseServer {
      /**
       * Initialize websocket server
       *
       * @api protected
       */
      init() {
        if (!~this.opts.transports.indexOf("websocket"))
          return;
        if (this.ws)
          this.ws.close();
        this.ws = new this.opts.wsEngine({
          noServer: true,
          clientTracking: false,
          perMessageDeflate: this.opts.perMessageDeflate,
          maxPayload: this.opts.maxHttpBufferSize
        });
        if (typeof this.ws.on === "function") {
          this.ws.on("headers", (headersArray, req) => {
            const additionalHeaders = req[kResponseHeaders] || {};
            delete req[kResponseHeaders];
            const isInitialRequest = !req._query.sid;
            if (isInitialRequest) {
              this.emit("initial_headers", additionalHeaders, req);
            }
            this.emit("headers", additionalHeaders, req);
            debug("writing headers: %j", additionalHeaders);
            Object.keys(additionalHeaders).forEach((key) => {
              headersArray.push(`${key}: ${additionalHeaders[key]}`);
            });
          });
        }
      }
      cleanup() {
        if (this.ws) {
          debug("closing webSocketServer");
          this.ws.close();
        }
      }
      /**
       * Prepares a request by processing the query string.
       *
       * @api private
       */
      prepare(req) {
        if (!req._query) {
          req._query = ~req.url.indexOf("?") ? qs.parse((0, url_1.parse)(req.url).query) : {};
        }
      }
      createTransport(transportName, req) {
        return new transports_1.default[transportName](req);
      }
      /**
       * Handles an Engine.IO HTTP request.
       *
       * @param {IncomingMessage} req
       * @param {ServerResponse} res
       * @api public
       */
      handleRequest(req, res) {
        debug('handling "%s" http request "%s"', req.method, req.url);
        this.prepare(req);
        req.res = res;
        const callback = (errorCode, errorContext) => {
          if (errorCode !== void 0) {
            this.emit("connection_error", {
              req,
              code: errorCode,
              message: _Server.errorMessages[errorCode],
              context: errorContext
            });
            abortRequest(res, errorCode, errorContext);
            return;
          }
          if (req._query.sid) {
            debug("setting new request for existing client");
            this.clients[req._query.sid].transport.onRequest(req);
          } else {
            const closeConnection = (errorCode2, errorContext2) => abortRequest(res, errorCode2, errorContext2);
            this.handshake(req._query.transport, req, closeConnection);
          }
        };
        this._applyMiddlewares(req, res, (err) => {
          if (err) {
            callback(_Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
          } else {
            this.verify(req, false, callback);
          }
        });
      }
      /**
       * Handles an Engine.IO HTTP Upgrade.
       *
       * @api public
       */
      handleUpgrade(req, socket, upgradeHead) {
        this.prepare(req);
        const res = new WebSocketResponse(req, socket);
        const callback = (errorCode, errorContext) => {
          if (errorCode !== void 0) {
            this.emit("connection_error", {
              req,
              code: errorCode,
              message: _Server.errorMessages[errorCode],
              context: errorContext
            });
            abortUpgrade(socket, errorCode, errorContext);
            return;
          }
          const head = Buffer.from(upgradeHead);
          upgradeHead = null;
          res.writeHead();
          this.ws.handleUpgrade(req, socket, head, (websocket) => {
            this.onWebSocket(req, socket, websocket);
          });
        };
        this._applyMiddlewares(req, res, (err) => {
          if (err) {
            callback(_Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
          } else {
            this.verify(req, true, callback);
          }
        });
      }
      /**
       * Called upon a ws.io connection.
       *
       * @param {ws.Socket} websocket
       * @api private
       */
      onWebSocket(req, socket, websocket) {
        websocket.on("error", onUpgradeError);
        if (transports_1.default[req._query.transport] !== void 0 && !transports_1.default[req._query.transport].prototype.handlesUpgrades) {
          debug("transport doesnt handle upgraded requests");
          websocket.close();
          return;
        }
        const id = req._query.sid;
        req.websocket = websocket;
        if (id) {
          const client = this.clients[id];
          if (!client) {
            debug("upgrade attempt for closed client");
            websocket.close();
          } else if (client.upgrading) {
            debug("transport has already been trying to upgrade");
            websocket.close();
          } else if (client.upgraded) {
            debug("transport had already been upgraded");
            websocket.close();
          } else {
            debug("upgrading existing transport");
            websocket.removeListener("error", onUpgradeError);
            const transport = this.createTransport(req._query.transport, req);
            transport.perMessageDeflate = this.opts.perMessageDeflate;
            client.maybeUpgrade(transport);
          }
        } else {
          const closeConnection = (errorCode, errorContext) => abortUpgrade(socket, errorCode, errorContext);
          this.handshake(req._query.transport, req, closeConnection);
        }
        function onUpgradeError() {
          debug("websocket error before upgrade");
        }
      }
      /**
       * Captures upgrade requests for a http.Server.
       *
       * @param {http.Server} server
       * @param {Object} options
       * @api public
       */
      attach(server, options = {}) {
        const path = this._computePath(options);
        const destroyUpgradeTimeout = options.destroyUpgradeTimeout || 1e3;
        function check(req) {
          return path === req.url.slice(0, path.length);
        }
        const listeners = server.listeners("request").slice(0);
        server.removeAllListeners("request");
        server.on("close", this.close.bind(this));
        server.on("listening", this.init.bind(this));
        server.on("request", (req, res) => {
          if (check(req)) {
            debug('intercepting request for path "%s"', path);
            this.handleRequest(req, res);
          } else {
            let i = 0;
            const l = listeners.length;
            for (; i < l; i++) {
              listeners[i].call(server, req, res);
            }
          }
        });
        if (~this.opts.transports.indexOf("websocket")) {
          server.on("upgrade", (req, socket, head) => {
            if (check(req)) {
              this.handleUpgrade(req, socket, head);
            } else if (false !== options.destroyUpgrade) {
              setTimeout(function() {
                if (socket.writable && socket.bytesWritten <= 0) {
                  socket.on("error", (e) => {
                    debug("error while destroying upgrade: %s", e.message);
                  });
                  return socket.end();
                }
              }, destroyUpgradeTimeout);
            }
          });
        }
      }
    };
    exports2.Server = Server2;
    function abortRequest(res, errorCode, errorContext) {
      const statusCode = errorCode === Server2.errors.FORBIDDEN ? 403 : 400;
      const message = errorContext && errorContext.message ? errorContext.message : Server2.errorMessages[errorCode];
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        code: errorCode,
        message
      }));
    }
    function abortUpgrade(socket, errorCode, errorContext = {}) {
      socket.on("error", () => {
        debug("ignoring error from closed connection");
      });
      if (socket.writable) {
        const message = errorContext.message || Server2.errorMessages[errorCode];
        const length = Buffer.byteLength(message);
        socket.write("HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-type: text/html\r\nContent-Length: " + length + "\r\n\r\n" + message);
      }
      socket.destroy();
    }
    var validHdrChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
      // ... 255
    ];
    function checkInvalidHeaderChar(val) {
      val += "";
      if (val.length < 1)
        return false;
      if (!validHdrChars[val.charCodeAt(0)]) {
        debug('invalid header, index 0, char "%s"', val.charCodeAt(0));
        return true;
      }
      if (val.length < 2)
        return false;
      if (!validHdrChars[val.charCodeAt(1)]) {
        debug('invalid header, index 1, char "%s"', val.charCodeAt(1));
        return true;
      }
      if (val.length < 3)
        return false;
      if (!validHdrChars[val.charCodeAt(2)]) {
        debug('invalid header, index 2, char "%s"', val.charCodeAt(2));
        return true;
      }
      if (val.length < 4)
        return false;
      if (!validHdrChars[val.charCodeAt(3)]) {
        debug('invalid header, index 3, char "%s"', val.charCodeAt(3));
        return true;
      }
      for (let i = 4; i < val.length; ++i) {
        if (!validHdrChars[val.charCodeAt(i)]) {
          debug('invalid header, index "%i", char "%s"', i, val.charCodeAt(i));
          return true;
        }
      }
      return false;
    }
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports-uws/polling.js
var require_polling2 = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports-uws/polling.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Polling = void 0;
    var transport_1 = require_transport();
    var zlib_1 = require("zlib");
    var accepts = require_accepts();
    var debug_1 = require_src();
    var debug = (0, debug_1.default)("engine:polling");
    var compressionMethods = {
      gzip: zlib_1.createGzip,
      deflate: zlib_1.createDeflate
    };
    var Polling = class extends transport_1.Transport {
      /**
       * HTTP polling constructor.
       *
       * @api public.
       */
      constructor(req) {
        super(req);
        this.closeTimeout = 30 * 1e3;
      }
      /**
       * Transport name
       *
       * @api public
       */
      get name() {
        return "polling";
      }
      get supportsFraming() {
        return false;
      }
      /**
       * Overrides onRequest.
       *
       * @param req
       *
       * @api private
       */
      onRequest(req) {
        const res = req.res;
        req.res = null;
        if (req.getMethod() === "get") {
          this.onPollRequest(req, res);
        } else if (req.getMethod() === "post") {
          this.onDataRequest(req, res);
        } else {
          res.writeStatus("500 Internal Server Error");
          res.end();
        }
      }
      /**
       * The client sends a request awaiting for us to send data.
       *
       * @api private
       */
      onPollRequest(req, res) {
        if (this.req) {
          debug("request overlap");
          this.onError("overlap from client");
          res.writeStatus("500 Internal Server Error");
          res.end();
          return;
        }
        debug("setting request");
        this.req = req;
        this.res = res;
        const onClose = () => {
          this.writable = false;
          this.onError("poll connection closed prematurely");
        };
        const cleanup = () => {
          this.req = this.res = null;
        };
        req.cleanup = cleanup;
        res.onAborted(onClose);
        this.writable = true;
        this.emit("drain");
        if (this.writable && this.shouldClose) {
          debug("triggering empty send to append close packet");
          this.send([{ type: "noop" }]);
        }
      }
      /**
       * The client sends a request with data.
       *
       * @api private
       */
      onDataRequest(req, res) {
        if (this.dataReq) {
          this.onError("data request overlap from client");
          res.writeStatus("500 Internal Server Error");
          res.end();
          return;
        }
        const expectedContentLength = Number(req.headers["content-length"]);
        if (!expectedContentLength) {
          this.onError("content-length header required");
          res.writeStatus("411 Length Required").end();
          return;
        }
        if (expectedContentLength > this.maxHttpBufferSize) {
          this.onError("payload too large");
          res.writeStatus("413 Payload Too Large").end();
          return;
        }
        const isBinary = "application/octet-stream" === req.headers["content-type"];
        if (isBinary && this.protocol === 4) {
          return this.onError("invalid content");
        }
        this.dataReq = req;
        this.dataRes = res;
        let buffer;
        let offset = 0;
        const headers = {
          // text/html is required instead of text/plain to avoid an
          // unwanted download dialog on certain user-agents (GH-43)
          "Content-Type": "text/html"
        };
        this.headers(req, headers);
        for (let key in headers) {
          res.writeHeader(key, String(headers[key]));
        }
        const onEnd = (buffer2) => {
          this.onData(buffer2.toString());
          this.onDataRequestCleanup();
          res.cork(() => {
            res.end("ok");
          });
        };
        res.onAborted(() => {
          this.onDataRequestCleanup();
          this.onError("data request connection closed prematurely");
        });
        res.onData((arrayBuffer, isLast) => {
          const totalLength = offset + arrayBuffer.byteLength;
          if (totalLength > expectedContentLength) {
            this.onError("content-length mismatch");
            res.close();
            return;
          }
          if (!buffer) {
            if (isLast) {
              onEnd(Buffer.from(arrayBuffer));
              return;
            }
            buffer = Buffer.allocUnsafe(expectedContentLength);
          }
          Buffer.from(arrayBuffer).copy(buffer, offset);
          if (isLast) {
            if (totalLength != expectedContentLength) {
              this.onError("content-length mismatch");
              res.writeStatus("400 Content-Length Mismatch").end();
              this.onDataRequestCleanup();
              return;
            }
            onEnd(buffer);
            return;
          }
          offset = totalLength;
        });
      }
      /**
       * Cleanup request.
       *
       * @api private
       */
      onDataRequestCleanup() {
        this.dataReq = this.dataRes = null;
      }
      /**
       * Processes the incoming data payload.
       *
       * @param {String} encoded payload
       * @api private
       */
      onData(data) {
        debug('received "%s"', data);
        const callback = (packet) => {
          if ("close" === packet.type) {
            debug("got xhr close packet");
            this.onClose();
            return false;
          }
          this.onPacket(packet);
        };
        if (this.protocol === 3) {
          this.parser.decodePayload(data, callback);
        } else {
          this.parser.decodePayload(data).forEach(callback);
        }
      }
      /**
       * Overrides onClose.
       *
       * @api private
       */
      onClose() {
        if (this.writable) {
          this.send([{ type: "noop" }]);
        }
        super.onClose();
      }
      /**
       * Writes a packet payload.
       *
       * @param {Object} packet
       * @api private
       */
      send(packets) {
        this.writable = false;
        if (this.shouldClose) {
          debug("appending close packet to payload");
          packets.push({ type: "close" });
          this.shouldClose();
          this.shouldClose = null;
        }
        const doWrite = (data) => {
          const compress = packets.some((packet) => {
            return packet.options && packet.options.compress;
          });
          this.write(data, { compress });
        };
        if (this.protocol === 3) {
          this.parser.encodePayload(packets, this.supportsBinary, doWrite);
        } else {
          this.parser.encodePayload(packets, doWrite);
        }
      }
      /**
       * Writes data as response to poll request.
       *
       * @param {String} data
       * @param {Object} options
       * @api private
       */
      write(data, options) {
        debug('writing "%s"', data);
        this.doWrite(data, options, () => {
          this.req.cleanup();
        });
      }
      /**
       * Performs the write.
       *
       * @api private
       */
      doWrite(data, options, callback) {
        const isString = typeof data === "string";
        const contentType = isString ? "text/plain; charset=UTF-8" : "application/octet-stream";
        const headers = {
          "Content-Type": contentType
        };
        const respond = (data2) => {
          this.headers(this.req, headers);
          this.res.cork(() => {
            Object.keys(headers).forEach((key) => {
              this.res.writeHeader(key, String(headers[key]));
            });
            this.res.end(data2);
          });
          callback();
        };
        if (!this.httpCompression || !options.compress) {
          respond(data);
          return;
        }
        const len = isString ? Buffer.byteLength(data) : data.length;
        if (len < this.httpCompression.threshold) {
          respond(data);
          return;
        }
        const encoding = accepts(this.req).encodings(["gzip", "deflate"]);
        if (!encoding) {
          respond(data);
          return;
        }
        this.compress(data, encoding, (err, data2) => {
          if (err) {
            this.res.writeStatus("500 Internal Server Error");
            this.res.end();
            callback(err);
            return;
          }
          headers["Content-Encoding"] = encoding;
          respond(data2);
        });
      }
      /**
       * Compresses data.
       *
       * @api private
       */
      compress(data, encoding, callback) {
        debug("compressing");
        const buffers = [];
        let nread = 0;
        compressionMethods[encoding](this.httpCompression).on("error", callback).on("data", function(chunk) {
          buffers.push(chunk);
          nread += chunk.length;
        }).on("end", function() {
          callback(null, Buffer.concat(buffers, nread));
        }).end(data);
      }
      /**
       * Closes the transport.
       *
       * @api private
       */
      doClose(fn) {
        debug("closing");
        let closeTimeoutTimer;
        const onClose = () => {
          clearTimeout(closeTimeoutTimer);
          fn();
          this.onClose();
        };
        if (this.writable) {
          debug("transport writable - closing right away");
          this.send([{ type: "close" }]);
          onClose();
        } else if (this.discarded) {
          debug("transport discarded - closing right away");
          onClose();
        } else {
          debug("transport not writable - buffering orderly close");
          this.shouldClose = onClose;
          closeTimeoutTimer = setTimeout(onClose, this.closeTimeout);
        }
      }
      /**
       * Returns headers for a response.
       *
       * @param req - request
       * @param {Object} extra headers
       * @api private
       */
      headers(req, headers) {
        headers = headers || {};
        const ua = req.headers["user-agent"];
        if (ua && (~ua.indexOf(";MSIE") || ~ua.indexOf("Trident/"))) {
          headers["X-XSS-Protection"] = "0";
        }
        headers["cache-control"] = "no-store";
        this.emit("headers", headers, req);
        return headers;
      }
    };
    exports2.Polling = Polling;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports-uws/websocket.js
var require_websocket3 = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports-uws/websocket.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WebSocket = void 0;
    var transport_1 = require_transport();
    var debug_1 = require_src();
    var debug = (0, debug_1.default)("engine:ws");
    var WebSocket = class extends transport_1.Transport {
      /**
       * WebSocket transport
       *
       * @param req
       * @api public
       */
      constructor(req) {
        super(req);
        this.writable = false;
        this.perMessageDeflate = null;
      }
      /**
       * Transport name
       *
       * @api public
       */
      get name() {
        return "websocket";
      }
      /**
       * Advertise upgrade support.
       *
       * @api public
       */
      get handlesUpgrades() {
        return true;
      }
      /**
       * Advertise framing support.
       *
       * @api public
       */
      get supportsFraming() {
        return true;
      }
      /**
       * Writes a packet payload.
       *
       * @param {Array} packets
       * @api private
       */
      send(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
          const packet = packets[i];
          const isLast = i + 1 === packets.length;
          const send = (data) => {
            const isBinary = typeof data !== "string";
            const compress = this.perMessageDeflate && Buffer.byteLength(data) > this.perMessageDeflate.threshold;
            debug('writing "%s"', data);
            this.socket.send(data, isBinary, compress);
            if (isLast) {
              this.writable = true;
              this.emit("drain");
            }
          };
          if (packet.options && typeof packet.options.wsPreEncoded === "string") {
            send(packet.options.wsPreEncoded);
          } else {
            this.parser.encodePacket(packet, this.supportsBinary, send);
          }
        }
      }
      /**
       * Closes the transport.
       *
       * @api private
       */
      doClose(fn) {
        debug("closing");
        fn && fn();
        this.socket.end();
      }
    };
    exports2.WebSocket = WebSocket;
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports-uws/index.js
var require_transports_uws = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/transports-uws/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var polling_1 = require_polling2();
    var websocket_1 = require_websocket3();
    exports2.default = {
      polling: polling_1.Polling,
      websocket: websocket_1.WebSocket
    };
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/userver.js
var require_userver = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/userver.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.uServer = void 0;
    var debug_1 = require_src();
    var server_1 = require_server();
    var transports_uws_1 = require_transports_uws();
    var debug = (0, debug_1.default)("engine:uws");
    var uServer = class extends server_1.BaseServer {
      init() {
      }
      cleanup() {
      }
      /**
       * Prepares a request by processing the query string.
       *
       * @api private
       */
      prepare(req, res) {
        req.method = req.getMethod().toUpperCase();
        req.url = req.getUrl();
        const params = new URLSearchParams(req.getQuery());
        req._query = Object.fromEntries(params.entries());
        req.headers = {};
        req.forEach((key, value) => {
          req.headers[key] = value;
        });
        req.connection = {
          remoteAddress: Buffer.from(res.getRemoteAddressAsText()).toString()
        };
        res.onAborted(() => {
          debug("response has been aborted");
        });
      }
      createTransport(transportName, req) {
        return new transports_uws_1.default[transportName](req);
      }
      /**
       * Attach the engine to a µWebSockets.js server
       * @param app
       * @param options
       */
      attach(app, options = {}) {
        const path = this._computePath(options);
        app.any(path, this.handleRequest.bind(this)).ws(path, {
          compression: options.compression,
          idleTimeout: options.idleTimeout,
          maxBackpressure: options.maxBackpressure,
          maxPayloadLength: this.opts.maxHttpBufferSize,
          upgrade: this.handleUpgrade.bind(this),
          open: (ws) => {
            const transport = ws.getUserData().transport;
            transport.socket = ws;
            transport.writable = true;
            transport.emit("drain");
          },
          message: (ws, message, isBinary) => {
            ws.getUserData().transport.onData(isBinary ? message : Buffer.from(message).toString());
          },
          close: (ws, code, message) => {
            ws.getUserData().transport.onClose(code, message);
          }
        });
      }
      _applyMiddlewares(req, res, callback) {
        if (this.middlewares.length === 0) {
          return callback();
        }
        req.res = new ResponseWrapper(res);
        super._applyMiddlewares(req, req.res, (err) => {
          req.res.writeHead();
          callback(err);
        });
      }
      handleRequest(res, req) {
        debug('handling "%s" http request "%s"', req.getMethod(), req.getUrl());
        this.prepare(req, res);
        req.res = res;
        const callback = (errorCode, errorContext) => {
          if (errorCode !== void 0) {
            this.emit("connection_error", {
              req,
              code: errorCode,
              message: server_1.Server.errorMessages[errorCode],
              context: errorContext
            });
            this.abortRequest(req.res, errorCode, errorContext);
            return;
          }
          if (req._query.sid) {
            debug("setting new request for existing client");
            this.clients[req._query.sid].transport.onRequest(req);
          } else {
            const closeConnection = (errorCode2, errorContext2) => this.abortRequest(res, errorCode2, errorContext2);
            this.handshake(req._query.transport, req, closeConnection);
          }
        };
        this._applyMiddlewares(req, res, (err) => {
          if (err) {
            callback(server_1.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
          } else {
            this.verify(req, false, callback);
          }
        });
      }
      handleUpgrade(res, req, context) {
        debug("on upgrade");
        this.prepare(req, res);
        req.res = res;
        const callback = async (errorCode, errorContext) => {
          if (errorCode !== void 0) {
            this.emit("connection_error", {
              req,
              code: errorCode,
              message: server_1.Server.errorMessages[errorCode],
              context: errorContext
            });
            this.abortRequest(res, errorCode, errorContext);
            return;
          }
          const id = req._query.sid;
          let transport;
          if (id) {
            const client = this.clients[id];
            if (!client) {
              debug("upgrade attempt for closed client");
              res.close();
            } else if (client.upgrading) {
              debug("transport has already been trying to upgrade");
              res.close();
            } else if (client.upgraded) {
              debug("transport had already been upgraded");
              res.close();
            } else {
              debug("upgrading existing transport");
              transport = this.createTransport(req._query.transport, req);
              client.maybeUpgrade(transport);
            }
          } else {
            transport = await this.handshake(req._query.transport, req, (errorCode2, errorContext2) => this.abortRequest(res, errorCode2, errorContext2));
            if (!transport) {
              return;
            }
          }
          req.res.writeStatus("101 Switching Protocols");
          res.upgrade({
            transport
          }, req.getHeader("sec-websocket-key"), req.getHeader("sec-websocket-protocol"), req.getHeader("sec-websocket-extensions"), context);
        };
        this._applyMiddlewares(req, res, (err) => {
          if (err) {
            callback(server_1.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
          } else {
            this.verify(req, true, callback);
          }
        });
      }
      abortRequest(res, errorCode, errorContext) {
        const statusCode = errorCode === server_1.Server.errors.FORBIDDEN ? "403 Forbidden" : "400 Bad Request";
        const message = errorContext && errorContext.message ? errorContext.message : server_1.Server.errorMessages[errorCode];
        res.writeStatus(statusCode);
        res.writeHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          code: errorCode,
          message
        }));
      }
    };
    exports2.uServer = uServer;
    var ResponseWrapper = class {
      constructor(res) {
        this.res = res;
        this.statusWritten = false;
        this.headers = [];
        this.isAborted = false;
      }
      set statusCode(status) {
        if (!status) {
          return;
        }
        this.writeStatus(status === 200 ? "200 OK" : "204 No Content");
      }
      writeHead(status) {
        this.statusCode = status;
      }
      setHeader(key, value) {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            this.writeHeader(key, val);
          });
        } else {
          this.writeHeader(key, value);
        }
      }
      removeHeader() {
      }
      // needed by vary: https://github.com/jshttp/vary/blob/5d725d059b3871025cf753e9dfa08924d0bcfa8f/index.js#L134
      getHeader() {
      }
      writeStatus(status) {
        if (this.isAborted)
          return;
        this.res.writeStatus(status);
        this.statusWritten = true;
        this.writeBufferedHeaders();
        return this;
      }
      writeHeader(key, value) {
        if (this.isAborted)
          return;
        if (key === "Content-Length") {
          return;
        }
        if (this.statusWritten) {
          this.res.writeHeader(key, value);
        } else {
          this.headers.push([key, value]);
        }
      }
      writeBufferedHeaders() {
        this.headers.forEach(([key, value]) => {
          this.res.writeHeader(key, value);
        });
      }
      end(data) {
        if (this.isAborted)
          return;
        this.res.cork(() => {
          if (!this.statusWritten) {
            this.writeBufferedHeaders();
          }
          this.res.end(data);
        });
      }
      onData(fn) {
        if (this.isAborted)
          return;
        this.res.onData(fn);
      }
      onAborted(fn) {
        if (this.isAborted)
          return;
        this.res.onAborted(() => {
          this.isAborted = true;
          fn();
        });
      }
      cork(fn) {
        if (this.isAborted)
          return;
        this.res.cork(fn);
      }
    };
  }
});

// node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/engine.io.js
var require_engine_io = __commonJS({
  "node_modules/.pnpm/engine.io@6.5.4/node_modules/engine.io/build/engine.io.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.protocol = exports2.Transport = exports2.Socket = exports2.uServer = exports2.parser = exports2.attach = exports2.listen = exports2.transports = exports2.Server = void 0;
    var http_1 = require("http");
    var server_1 = require_server();
    Object.defineProperty(exports2, "Server", { enumerable: true, get: function() {
      return server_1.Server;
    } });
    var index_1 = require_transports();
    exports2.transports = index_1.default;
    var parser = require_cjs();
    exports2.parser = parser;
    var userver_1 = require_userver();
    Object.defineProperty(exports2, "uServer", { enumerable: true, get: function() {
      return userver_1.uServer;
    } });
    var socket_1 = require_socket();
    Object.defineProperty(exports2, "Socket", { enumerable: true, get: function() {
      return socket_1.Socket;
    } });
    var transport_1 = require_transport();
    Object.defineProperty(exports2, "Transport", { enumerable: true, get: function() {
      return transport_1.Transport;
    } });
    exports2.protocol = parser.protocol;
    function listen(port, options, fn) {
      if ("function" === typeof options) {
        fn = options;
        options = {};
      }
      const server = (0, http_1.createServer)(function(req, res) {
        res.writeHead(501);
        res.end("Not Implemented");
      });
      const engine = attach(server, options);
      engine.httpServer = server;
      server.listen(port, fn);
      return engine;
    }
    exports2.listen = listen;
    function attach(server, options) {
      const engine = new server_1.Server(options);
      engine.attach(server, options);
      return engine;
    }
    exports2.attach = attach;
  }
});

// node_modules/.pnpm/@socket.io+component-emitter@3.1.0/node_modules/@socket.io/component-emitter/index.js
var require_component_emitter = __commonJS({
  "node_modules/.pnpm/@socket.io+component-emitter@3.1.0/node_modules/@socket.io/component-emitter/index.js"(exports2) {
    exports2.Emitter = Emitter;
    function Emitter(obj) {
      if (obj)
        return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
      return this;
    };
    Emitter.prototype.once = function(event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks["$" + event];
      if (!callbacks)
        return this;
      if (1 == arguments.length) {
        delete this._callbacks["$" + event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      if (callbacks.length === 0) {
        delete this._callbacks["$" + event];
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }
      return this;
    };
    Emitter.prototype.emitReserved = Emitter.prototype.emit;
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks["$" + event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
  }
});

// node_modules/.pnpm/socket.io-parser@4.2.4/node_modules/socket.io-parser/build/cjs/is-binary.js
var require_is_binary = __commonJS({
  "node_modules/.pnpm/socket.io-parser@4.2.4/node_modules/socket.io-parser/build/cjs/is-binary.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.hasBinary = exports2.isBinary = void 0;
    var withNativeArrayBuffer = typeof ArrayBuffer === "function";
    var isView = (obj) => {
      return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
    };
    var toString = Object.prototype.toString;
    var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
    var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
    function isBinary(obj) {
      return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
    }
    exports2.isBinary = isBinary;
    function hasBinary(obj, toJSON) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
          if (hasBinary(obj[i])) {
            return true;
          }
        }
        return false;
      }
      if (isBinary(obj)) {
        return true;
      }
      if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
      }
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
          return true;
        }
      }
      return false;
    }
    exports2.hasBinary = hasBinary;
  }
});

// node_modules/.pnpm/socket.io-parser@4.2.4/node_modules/socket.io-parser/build/cjs/binary.js
var require_binary = __commonJS({
  "node_modules/.pnpm/socket.io-parser@4.2.4/node_modules/socket.io-parser/build/cjs/binary.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reconstructPacket = exports2.deconstructPacket = void 0;
    var is_binary_js_1 = require_is_binary();
    function deconstructPacket(packet) {
      const buffers = [];
      const packetData = packet.data;
      const pack = packet;
      pack.data = _deconstructPacket(packetData, buffers);
      pack.attachments = buffers.length;
      return { packet: pack, buffers };
    }
    exports2.deconstructPacket = deconstructPacket;
    function _deconstructPacket(data, buffers) {
      if (!data)
        return data;
      if ((0, is_binary_js_1.isBinary)(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
      } else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
          newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
      } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            newData[key] = _deconstructPacket(data[key], buffers);
          }
        }
        return newData;
      }
      return data;
    }
    function reconstructPacket(packet, buffers) {
      packet.data = _reconstructPacket(packet.data, buffers);
      delete packet.attachments;
      return packet;
    }
    exports2.reconstructPacket = reconstructPacket;
    function _reconstructPacket(data, buffers) {
      if (!data)
        return data;
      if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
        if (isIndexValid) {
          return buffers[data.num];
        } else {
          throw new Error("illegal attachments");
        }
      } else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          data[i] = _reconstructPacket(data[i], buffers);
        }
      } else if (typeof data === "object") {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = _reconstructPacket(data[key], buffers);
          }
        }
      }
      return data;
    }
  }
});

// node_modules/.pnpm/socket.io-parser@4.2.4/node_modules/socket.io-parser/build/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/.pnpm/socket.io-parser@4.2.4/node_modules/socket.io-parser/build/cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Decoder = exports2.Encoder = exports2.PacketType = exports2.protocol = void 0;
    var component_emitter_1 = require_component_emitter();
    var binary_js_1 = require_binary();
    var is_binary_js_1 = require_is_binary();
    var debug_1 = require_src();
    var debug = (0, debug_1.default)("socket.io-parser");
    var RESERVED_EVENTS = [
      "connect",
      "connect_error",
      "disconnect",
      "disconnecting",
      "newListener",
      "removeListener"
      // used by the Node.js EventEmitter
    ];
    exports2.protocol = 5;
    var PacketType;
    (function(PacketType2) {
      PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
      PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
      PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
      PacketType2[PacketType2["ACK"] = 3] = "ACK";
      PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
      PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
      PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
    })(PacketType = exports2.PacketType || (exports2.PacketType = {}));
    var Encoder = class {
      /**
       * Encoder constructor
       *
       * @param {function} replacer - custom replacer to pass down to JSON.parse
       */
      constructor(replacer) {
        this.replacer = replacer;
      }
      /**
       * Encode a packet as a single string if non-binary, or as a
       * buffer sequence, depending on packet type.
       *
       * @param {Object} obj - packet object
       */
      encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
          if ((0, is_binary_js_1.hasBinary)(obj)) {
            return this.encodeAsBinary({
              type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
              nsp: obj.nsp,
              data: obj.data,
              id: obj.id
            });
          }
        }
        return [this.encodeAsString(obj)];
      }
      /**
       * Encode packet as string.
       */
      encodeAsString(obj) {
        let str = "" + obj.type;
        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
          str += obj.attachments + "-";
        }
        if (obj.nsp && "/" !== obj.nsp) {
          str += obj.nsp + ",";
        }
        if (null != obj.id) {
          str += obj.id;
        }
        if (null != obj.data) {
          str += JSON.stringify(obj.data, this.replacer);
        }
        debug("encoded %j as %s", obj, str);
        return str;
      }
      /**
       * Encode packet as 'buffer sequence' by removing blobs, and
       * deconstructing packet into object with placeholders and
       * a list of buffers.
       */
      encodeAsBinary(obj) {
        const deconstruction = (0, binary_js_1.deconstructPacket)(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack);
        return buffers;
      }
    };
    exports2.Encoder = Encoder;
    function isObject(value) {
      return Object.prototype.toString.call(value) === "[object Object]";
    }
    var Decoder = class _Decoder extends component_emitter_1.Emitter {
      /**
       * Decoder constructor
       *
       * @param {function} reviver - custom reviver to pass down to JSON.stringify
       */
      constructor(reviver) {
        super();
        this.reviver = reviver;
      }
      /**
       * Decodes an encoded packet string into packet JSON.
       *
       * @param {String} obj - encoded packet
       */
      add(obj) {
        let packet;
        if (typeof obj === "string") {
          if (this.reconstructor) {
            throw new Error("got plaintext data when reconstructing a packet");
          }
          packet = this.decodeString(obj);
          const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
          if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
            packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
            this.reconstructor = new BinaryReconstructor(packet);
            if (packet.attachments === 0) {
              super.emitReserved("decoded", packet);
            }
          } else {
            super.emitReserved("decoded", packet);
          }
        } else if ((0, is_binary_js_1.isBinary)(obj) || obj.base64) {
          if (!this.reconstructor) {
            throw new Error("got binary data when not reconstructing a packet");
          } else {
            packet = this.reconstructor.takeBinaryData(obj);
            if (packet) {
              this.reconstructor = null;
              super.emitReserved("decoded", packet);
            }
          }
        } else {
          throw new Error("Unknown type: " + obj);
        }
      }
      /**
       * Decode a packet String (JSON data)
       *
       * @param {String} str
       * @return {Object} packet
       */
      decodeString(str) {
        let i = 0;
        const p = {
          type: Number(str.charAt(0))
        };
        if (PacketType[p.type] === void 0) {
          throw new Error("unknown packet type " + p.type);
        }
        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          const start = i + 1;
          while (str.charAt(++i) !== "-" && i != str.length) {
          }
          const buf = str.substring(start, i);
          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }
          p.attachments = Number(buf);
        }
        if ("/" === str.charAt(i + 1)) {
          const start = i + 1;
          while (++i) {
            const c = str.charAt(i);
            if ("," === c)
              break;
            if (i === str.length)
              break;
          }
          p.nsp = str.substring(start, i);
        } else {
          p.nsp = "/";
        }
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
          const start = i + 1;
          while (++i) {
            const c = str.charAt(i);
            if (null == c || Number(c) != c) {
              --i;
              break;
            }
            if (i === str.length)
              break;
          }
          p.id = Number(str.substring(start, i + 1));
        }
        if (str.charAt(++i)) {
          const payload = this.tryParse(str.substr(i));
          if (_Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }
        debug("decoded %s as %j", str, p);
        return p;
      }
      tryParse(str) {
        try {
          return JSON.parse(str, this.reviver);
        } catch (e) {
          return false;
        }
      }
      static isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return isObject(payload);
          case PacketType.DISCONNECT:
            return payload === void 0;
          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || isObject(payload);
          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
      /**
       * Deallocates a parser's resources
       */
      destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
          this.reconstructor = null;
        }
      }
    };
    exports2.Decoder = Decoder;
    var BinaryReconstructor = class {
      constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
      }
      /**
       * Method to be called when binary data received from connection
       * after a BINARY_EVENT packet.
       *
       * @param {Buffer | ArrayBuffer} binData - the raw binary data received
       * @return {null | Object} returns null if more binary data is expected or
       *   a reconstructed packet object if all buffers have been received.
       */
      takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
          const packet = (0, binary_js_1.reconstructPacket)(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }
        return null;
      }
      /**
       * Cleans up binary packet reconstruction variables.
       */
      finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }
    };
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/client.js
var require_client = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/client.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Client = void 0;
    var socket_io_parser_1 = require_cjs2();
    var debugModule = require_src();
    var url = require("url");
    var debug = debugModule("socket.io:client");
    var Client = class {
      /**
       * Client constructor.
       *
       * @param server instance
       * @param conn
       * @package
       */
      constructor(server, conn) {
        this.sockets = /* @__PURE__ */ new Map();
        this.nsps = /* @__PURE__ */ new Map();
        this.server = server;
        this.conn = conn;
        this.encoder = server.encoder;
        this.decoder = new server._parser.Decoder();
        this.id = conn.id;
        this.setup();
      }
      /**
       * @return the reference to the request that originated the Engine.IO connection
       *
       * @public
       */
      get request() {
        return this.conn.request;
      }
      /**
       * Sets up event listeners.
       *
       * @private
       */
      setup() {
        this.onclose = this.onclose.bind(this);
        this.ondata = this.ondata.bind(this);
        this.onerror = this.onerror.bind(this);
        this.ondecoded = this.ondecoded.bind(this);
        this.decoder.on("decoded", this.ondecoded);
        this.conn.on("data", this.ondata);
        this.conn.on("error", this.onerror);
        this.conn.on("close", this.onclose);
        this.connectTimeout = setTimeout(() => {
          if (this.nsps.size === 0) {
            debug("no namespace joined yet, close the client");
            this.close();
          } else {
            debug("the client has already joined a namespace, nothing to do");
          }
        }, this.server._connectTimeout);
      }
      /**
       * Connects a client to a namespace.
       *
       * @param {String} name - the namespace
       * @param {Object} auth - the auth parameters
       * @private
       */
      connect(name, auth = {}) {
        if (this.server._nsps.has(name)) {
          debug("connecting to namespace %s", name);
          return this.doConnect(name, auth);
        }
        this.server._checkNamespace(name, auth, (dynamicNspName) => {
          if (dynamicNspName) {
            this.doConnect(name, auth);
          } else {
            debug("creation of namespace %s was denied", name);
            this._packet({
              type: socket_io_parser_1.PacketType.CONNECT_ERROR,
              nsp: name,
              data: {
                message: "Invalid namespace"
              }
            });
          }
        });
      }
      /**
       * Connects a client to a namespace.
       *
       * @param name - the namespace
       * @param {Object} auth - the auth parameters
       *
       * @private
       */
      doConnect(name, auth) {
        const nsp = this.server.of(name);
        nsp._add(this, auth, (socket) => {
          this.sockets.set(socket.id, socket);
          this.nsps.set(nsp.name, socket);
          if (this.connectTimeout) {
            clearTimeout(this.connectTimeout);
            this.connectTimeout = void 0;
          }
        });
      }
      /**
       * Disconnects from all namespaces and closes transport.
       *
       * @private
       */
      _disconnect() {
        for (const socket of this.sockets.values()) {
          socket.disconnect();
        }
        this.sockets.clear();
        this.close();
      }
      /**
       * Removes a socket. Called by each `Socket`.
       *
       * @private
       */
      _remove(socket) {
        if (this.sockets.has(socket.id)) {
          const nsp = this.sockets.get(socket.id).nsp.name;
          this.sockets.delete(socket.id);
          this.nsps.delete(nsp);
        } else {
          debug("ignoring remove for %s", socket.id);
        }
      }
      /**
       * Closes the underlying connection.
       *
       * @private
       */
      close() {
        if ("open" === this.conn.readyState) {
          debug("forcing transport close");
          this.conn.close();
          this.onclose("forced server close");
        }
      }
      /**
       * Writes a packet to the transport.
       *
       * @param {Object} packet object
       * @param {Object} opts
       * @private
       */
      _packet(packet, opts = {}) {
        if (this.conn.readyState !== "open") {
          debug("ignoring packet write %j", packet);
          return;
        }
        const encodedPackets = opts.preEncoded ? packet : this.encoder.encode(packet);
        this.writeToEngine(encodedPackets, opts);
      }
      writeToEngine(encodedPackets, opts) {
        if (opts.volatile && !this.conn.transport.writable) {
          debug("volatile packet is discarded since the transport is not currently writable");
          return;
        }
        const packets = Array.isArray(encodedPackets) ? encodedPackets : [encodedPackets];
        for (const encodedPacket of packets) {
          this.conn.write(encodedPacket, opts);
        }
      }
      /**
       * Called with incoming transport data.
       *
       * @private
       */
      ondata(data) {
        try {
          this.decoder.add(data);
        } catch (e) {
          debug("invalid packet format");
          this.onerror(e);
        }
      }
      /**
       * Called when parser fully decodes a packet.
       *
       * @private
       */
      ondecoded(packet) {
        let namespace;
        let authPayload;
        if (this.conn.protocol === 3) {
          const parsed = url.parse(packet.nsp, true);
          namespace = parsed.pathname;
          authPayload = parsed.query;
        } else {
          namespace = packet.nsp;
          authPayload = packet.data;
        }
        const socket = this.nsps.get(namespace);
        if (!socket && packet.type === socket_io_parser_1.PacketType.CONNECT) {
          this.connect(namespace, authPayload);
        } else if (socket && packet.type !== socket_io_parser_1.PacketType.CONNECT && packet.type !== socket_io_parser_1.PacketType.CONNECT_ERROR) {
          process.nextTick(function() {
            socket._onpacket(packet);
          });
        } else {
          debug("invalid state (packet type: %s)", packet.type);
          this.close();
        }
      }
      /**
       * Handles an error.
       *
       * @param {Object} err object
       * @private
       */
      onerror(err) {
        for (const socket of this.sockets.values()) {
          socket._onerror(err);
        }
        this.conn.close();
      }
      /**
       * Called upon transport close.
       *
       * @param reason
       * @param description
       * @private
       */
      onclose(reason, description) {
        debug("client close with reason %s", reason);
        this.destroy();
        for (const socket of this.sockets.values()) {
          socket._onclose(reason, description);
        }
        this.sockets.clear();
        this.decoder.destroy();
      }
      /**
       * Cleans up event listeners.
       * @private
       */
      destroy() {
        this.conn.removeListener("data", this.ondata);
        this.conn.removeListener("error", this.onerror);
        this.conn.removeListener("close", this.onclose);
        this.decoder.removeListener("decoded", this.ondecoded);
        if (this.connectTimeout) {
          clearTimeout(this.connectTimeout);
          this.connectTimeout = void 0;
        }
      }
    };
    exports2.Client = Client;
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/typed-events.js
var require_typed_events = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/typed-events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StrictEventEmitter = void 0;
    var events_1 = require("events");
    var StrictEventEmitter = class extends events_1.EventEmitter {
      /**
       * Adds the `listener` function as an event listener for `ev`.
       *
       * @param ev Name of the event
       * @param listener Callback function
       */
      on(ev, listener) {
        return super.on(ev, listener);
      }
      /**
       * Adds a one-time `listener` function as an event listener for `ev`.
       *
       * @param ev Name of the event
       * @param listener Callback function
       */
      once(ev, listener) {
        return super.once(ev, listener);
      }
      /**
       * Emits an event.
       *
       * @param ev Name of the event
       * @param args Values to send to listeners of this event
       */
      emit(ev, ...args) {
        return super.emit(ev, ...args);
      }
      /**
       * Emits a reserved event.
       *
       * This method is `protected`, so that only a class extending
       * `StrictEventEmitter` can emit its own reserved events.
       *
       * @param ev Reserved event name
       * @param args Arguments to emit along with the event
       */
      emitReserved(ev, ...args) {
        return super.emit(ev, ...args);
      }
      /**
       * Emits an event.
       *
       * This method is `protected`, so that only a class extending
       * `StrictEventEmitter` can get around the strict typing. This is useful for
       * calling `emit.apply`, which can be called as `emitUntyped.apply`.
       *
       * @param ev Event name
       * @param args Arguments to emit along with the event
       */
      emitUntyped(ev, ...args) {
        return super.emit(ev, ...args);
      }
      /**
       * Returns the listeners listening to an event.
       *
       * @param event Event name
       * @returns Array of listeners subscribed to `event`
       */
      listeners(event) {
        return super.listeners(event);
      }
    };
    exports2.StrictEventEmitter = StrictEventEmitter;
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/broadcast-operator.js
var require_broadcast_operator = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/broadcast-operator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RemoteSocket = exports2.BroadcastOperator = void 0;
    var socket_1 = require_socket2();
    var socket_io_parser_1 = require_cjs2();
    var BroadcastOperator = class _BroadcastOperator {
      constructor(adapter, rooms = /* @__PURE__ */ new Set(), exceptRooms = /* @__PURE__ */ new Set(), flags = {}) {
        this.adapter = adapter;
        this.rooms = rooms;
        this.exceptRooms = exceptRooms;
        this.flags = flags;
      }
      /**
       * Targets a room when emitting.
       *
       * @example
       * // the “foo” event will be broadcast to all connected clients in the “room-101” room
       * io.to("room-101").emit("foo", "bar");
       *
       * // with an array of rooms (a client will be notified at most once)
       * io.to(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * io.to("room-101").to("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      to(room) {
        const rooms = new Set(this.rooms);
        if (Array.isArray(room)) {
          room.forEach((r) => rooms.add(r));
        } else {
          rooms.add(room);
        }
        return new _BroadcastOperator(this.adapter, rooms, this.exceptRooms, this.flags);
      }
      /**
       * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
       *
       * @example
       * // disconnect all clients in the "room-101" room
       * io.in("room-101").disconnectSockets();
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      in(room) {
        return this.to(room);
      }
      /**
       * Excludes a room when emitting.
       *
       * @example
       * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
       * io.except("room-101").emit("foo", "bar");
       *
       * // with an array of rooms
       * io.except(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * io.except("room-101").except("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      except(room) {
        const exceptRooms = new Set(this.exceptRooms);
        if (Array.isArray(room)) {
          room.forEach((r) => exceptRooms.add(r));
        } else {
          exceptRooms.add(room);
        }
        return new _BroadcastOperator(this.adapter, this.rooms, exceptRooms, this.flags);
      }
      /**
       * Sets the compress flag.
       *
       * @example
       * io.compress(false).emit("hello");
       *
       * @param compress - if `true`, compresses the sending data
       * @return a new BroadcastOperator instance
       */
      compress(compress) {
        const flags = Object.assign({}, this.flags, { compress });
        return new _BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
       * receive messages (because of network slowness or other issues, or because they’re connected through long polling
       * and is in the middle of a request-response cycle).
       *
       * @example
       * io.volatile.emit("hello"); // the clients may or may not receive it
       *
       * @return a new BroadcastOperator instance
       */
      get volatile() {
        const flags = Object.assign({}, this.flags, { volatile: true });
        return new _BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
       *
       * @example
       * // the “foo” event will be broadcast to all connected clients on this node
       * io.local.emit("foo", "bar");
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get local() {
        const flags = Object.assign({}, this.flags, { local: true });
        return new _BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
      }
      /**
       * Adds a timeout in milliseconds for the next operation
       *
       * @example
       * io.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @param timeout
       */
      timeout(timeout) {
        const flags = Object.assign({}, this.flags, { timeout });
        return new _BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
      }
      /**
       * Emits to all clients.
       *
       * @example
       * // the “foo” event will be broadcast to all connected clients
       * io.emit("foo", "bar");
       *
       * // the “foo” event will be broadcast to all connected clients in the “room-101” room
       * io.to("room-101").emit("foo", "bar");
       *
       * // with an acknowledgement expected from all connected clients
       * io.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @return Always true
       */
      emit(ev, ...args) {
        if (socket_1.RESERVED_EVENTS.has(ev)) {
          throw new Error(`"${String(ev)}" is a reserved event name`);
        }
        const data = [ev, ...args];
        const packet = {
          type: socket_io_parser_1.PacketType.EVENT,
          data
        };
        const withAck = typeof data[data.length - 1] === "function";
        if (!withAck) {
          this.adapter.broadcast(packet, {
            rooms: this.rooms,
            except: this.exceptRooms,
            flags: this.flags
          });
          return true;
        }
        const ack = data.pop();
        let timedOut = false;
        let responses = [];
        const timer = setTimeout(() => {
          timedOut = true;
          ack.apply(this, [
            new Error("operation has timed out"),
            this.flags.expectSingleResponse ? null : responses
          ]);
        }, this.flags.timeout);
        let expectedServerCount = -1;
        let actualServerCount = 0;
        let expectedClientCount = 0;
        const checkCompleteness = () => {
          if (!timedOut && expectedServerCount === actualServerCount && responses.length === expectedClientCount) {
            clearTimeout(timer);
            ack.apply(this, [
              null,
              this.flags.expectSingleResponse ? responses[0] : responses
            ]);
          }
        };
        this.adapter.broadcastWithAck(packet, {
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        }, (clientCount) => {
          expectedClientCount += clientCount;
          actualServerCount++;
          checkCompleteness();
        }, (clientResponse) => {
          responses.push(clientResponse);
          checkCompleteness();
        });
        this.adapter.serverCount().then((serverCount) => {
          expectedServerCount = serverCount;
          checkCompleteness();
        });
        return true;
      }
      /**
       * Emits an event and waits for an acknowledgement from all clients.
       *
       * @example
       * try {
       *   const responses = await io.timeout(1000).emitWithAck("some-event");
       *   console.log(responses); // one response per client
       * } catch (e) {
       *   // some clients did not acknowledge the event in the given delay
       * }
       *
       * @return a Promise that will be fulfilled when all clients have acknowledged the event
       */
      emitWithAck(ev, ...args) {
        return new Promise((resolve, reject) => {
          args.push((err, responses) => {
            if (err) {
              err.responses = responses;
              return reject(err);
            } else {
              return resolve(responses);
            }
          });
          this.emit(ev, ...args);
        });
      }
      /**
       * Gets a list of clients.
       *
       * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
       * {@link fetchSockets} instead.
       */
      allSockets() {
        if (!this.adapter) {
          throw new Error("No adapter for this namespace, are you trying to get the list of clients of a dynamic namespace?");
        }
        return this.adapter.sockets(this.rooms);
      }
      /**
       * Returns the matching socket instances. This method works across a cluster of several Socket.IO servers.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // return all Socket instances
       * const sockets = await io.fetchSockets();
       *
       * // return all Socket instances in the "room1" room
       * const sockets = await io.in("room1").fetchSockets();
       *
       * for (const socket of sockets) {
       *   console.log(socket.id);
       *   console.log(socket.handshake);
       *   console.log(socket.rooms);
       *   console.log(socket.data);
       *
       *   socket.emit("hello");
       *   socket.join("room1");
       *   socket.leave("room2");
       *   socket.disconnect();
       * }
       */
      fetchSockets() {
        return this.adapter.fetchSockets({
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        }).then((sockets) => {
          return sockets.map((socket) => {
            if (socket instanceof socket_1.Socket) {
              return socket;
            } else {
              return new RemoteSocket(this.adapter, socket);
            }
          });
        });
      }
      /**
       * Makes the matching socket instances join the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       *
       * // make all socket instances join the "room1" room
       * io.socketsJoin("room1");
       *
       * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
       * io.in("room1").socketsJoin(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsJoin(room) {
        this.adapter.addSockets({
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        }, Array.isArray(room) ? room : [room]);
      }
      /**
       * Makes the matching socket instances leave the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // make all socket instances leave the "room1" room
       * io.socketsLeave("room1");
       *
       * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
       * io.in("room1").socketsLeave(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsLeave(room) {
        this.adapter.delSockets({
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        }, Array.isArray(room) ? room : [room]);
      }
      /**
       * Makes the matching socket instances disconnect.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
       * io.disconnectSockets();
       *
       * // make all socket instances in the "room1" room disconnect and close the underlying connections
       * io.in("room1").disconnectSockets(true);
       *
       * @param close - whether to close the underlying connection
       */
      disconnectSockets(close = false) {
        this.adapter.disconnectSockets({
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        }, close);
      }
    };
    exports2.BroadcastOperator = BroadcastOperator;
    var RemoteSocket = class {
      constructor(adapter, details) {
        this.id = details.id;
        this.handshake = details.handshake;
        this.rooms = new Set(details.rooms);
        this.data = details.data;
        this.operator = new BroadcastOperator(adapter, /* @__PURE__ */ new Set([this.id]), /* @__PURE__ */ new Set(), {
          expectSingleResponse: true
          // so that remoteSocket.emit() with acknowledgement behaves like socket.emit()
        });
      }
      /**
       * Adds a timeout in milliseconds for the next operation.
       *
       * @example
       * const sockets = await io.fetchSockets();
       *
       * for (const socket of sockets) {
       *   if (someCondition) {
       *     socket.timeout(1000).emit("some-event", (err) => {
       *       if (err) {
       *         // the client did not acknowledge the event in the given delay
       *       }
       *     });
       *   }
       * }
       *
       * // note: if possible, using a room instead of looping over all sockets is preferable
       * io.timeout(1000).to(someConditionRoom).emit("some-event", (err, responses) => {
       *   // ...
       * });
       *
       * @param timeout
       */
      timeout(timeout) {
        return this.operator.timeout(timeout);
      }
      emit(ev, ...args) {
        return this.operator.emit(ev, ...args);
      }
      /**
       * Joins a room.
       *
       * @param {String|Array} room - room or array of rooms
       */
      join(room) {
        return this.operator.socketsJoin(room);
      }
      /**
       * Leaves a room.
       *
       * @param {String} room
       */
      leave(room) {
        return this.operator.socketsLeave(room);
      }
      /**
       * Disconnects this client.
       *
       * @param {Boolean} close - if `true`, closes the underlying connection
       * @return {Socket} self
       */
      disconnect(close = false) {
        this.operator.disconnectSockets(close);
        return this;
      }
    };
    exports2.RemoteSocket = RemoteSocket;
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/socket.js
var require_socket2 = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/socket.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Socket = exports2.RESERVED_EVENTS = void 0;
    var socket_io_parser_1 = require_cjs2();
    var debug_1 = __importDefault(require_src());
    var typed_events_1 = require_typed_events();
    var base64id_1 = __importDefault(require_base64id());
    var broadcast_operator_1 = require_broadcast_operator();
    var debug = (0, debug_1.default)("socket.io:socket");
    var RECOVERABLE_DISCONNECT_REASONS = /* @__PURE__ */ new Set([
      "transport error",
      "transport close",
      "forced close",
      "ping timeout",
      "server shutting down",
      "forced server close"
    ]);
    exports2.RESERVED_EVENTS = /* @__PURE__ */ new Set([
      "connect",
      "connect_error",
      "disconnect",
      "disconnecting",
      "newListener",
      "removeListener"
    ]);
    function noop() {
    }
    var Socket2 = class extends typed_events_1.StrictEventEmitter {
      /**
       * Interface to a `Client` for a given `Namespace`.
       *
       * @param {Namespace} nsp
       * @param {Client} client
       * @param {Object} auth
       * @package
       */
      constructor(nsp, client, auth, previousSession) {
        super();
        this.nsp = nsp;
        this.client = client;
        this.recovered = false;
        this.data = {};
        this.connected = false;
        this.acks = /* @__PURE__ */ new Map();
        this.fns = [];
        this.flags = {};
        this.server = nsp.server;
        this.adapter = this.nsp.adapter;
        if (previousSession) {
          this.id = previousSession.sid;
          this.pid = previousSession.pid;
          previousSession.rooms.forEach((room) => this.join(room));
          this.data = previousSession.data;
          previousSession.missedPackets.forEach((packet) => {
            this.packet({
              type: socket_io_parser_1.PacketType.EVENT,
              data: packet
            });
          });
          this.recovered = true;
        } else {
          if (client.conn.protocol === 3) {
            this.id = nsp.name !== "/" ? nsp.name + "#" + client.id : client.id;
          } else {
            this.id = base64id_1.default.generateId();
          }
          if (this.server._opts.connectionStateRecovery) {
            this.pid = base64id_1.default.generateId();
          }
        }
        this.handshake = this.buildHandshake(auth);
        this.on("error", noop);
      }
      /**
       * Builds the `handshake` BC object
       *
       * @private
       */
      buildHandshake(auth) {
        var _a, _b, _c, _d;
        return {
          headers: ((_a = this.request) === null || _a === void 0 ? void 0 : _a.headers) || {},
          time: /* @__PURE__ */ new Date() + "",
          address: this.conn.remoteAddress,
          xdomain: !!((_b = this.request) === null || _b === void 0 ? void 0 : _b.headers.origin),
          // @ts-ignore
          secure: !this.request || !!this.request.connection.encrypted,
          issued: +/* @__PURE__ */ new Date(),
          url: (_c = this.request) === null || _c === void 0 ? void 0 : _c.url,
          // @ts-ignore
          query: ((_d = this.request) === null || _d === void 0 ? void 0 : _d._query) || {},
          auth
        };
      }
      /**
       * Emits to this client.
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.emit("hello", "world");
       *
       *   // all serializable datastructures are supported (no need to call JSON.stringify)
       *   socket.emit("hello", 1, "2", { 3: ["4"], 5: Buffer.from([6]) });
       *
       *   // with an acknowledgement from the client
       *   socket.emit("hello", "world", (val) => {
       *     // ...
       *   });
       * });
       *
       * @return Always returns `true`.
       */
      emit(ev, ...args) {
        if (exports2.RESERVED_EVENTS.has(ev)) {
          throw new Error(`"${String(ev)}" is a reserved event name`);
        }
        const data = [ev, ...args];
        const packet = {
          type: socket_io_parser_1.PacketType.EVENT,
          data
        };
        if (typeof data[data.length - 1] === "function") {
          const id = this.nsp._ids++;
          debug("emitting packet with ack id %d", id);
          this.registerAckCallback(id, data.pop());
          packet.id = id;
        }
        const flags = Object.assign({}, this.flags);
        this.flags = {};
        if (this.nsp.server.opts.connectionStateRecovery) {
          this.adapter.broadcast(packet, {
            rooms: /* @__PURE__ */ new Set([this.id]),
            except: /* @__PURE__ */ new Set(),
            flags
          });
        } else {
          this.notifyOutgoingListeners(packet);
          this.packet(packet, flags);
        }
        return true;
      }
      /**
       * Emits an event and waits for an acknowledgement
       *
       * @example
       * io.on("connection", async (socket) => {
       *   // without timeout
       *   const response = await socket.emitWithAck("hello", "world");
       *
       *   // with a specific timeout
       *   try {
       *     const response = await socket.timeout(1000).emitWithAck("hello", "world");
       *   } catch (err) {
       *     // the client did not acknowledge the event in the given delay
       *   }
       * });
       *
       * @return a Promise that will be fulfilled when the client acknowledges the event
       */
      emitWithAck(ev, ...args) {
        const withErr = this.flags.timeout !== void 0;
        return new Promise((resolve, reject) => {
          args.push((arg1, arg2) => {
            if (withErr) {
              return arg1 ? reject(arg1) : resolve(arg2);
            } else {
              return resolve(arg1);
            }
          });
          this.emit(ev, ...args);
        });
      }
      /**
       * @private
       */
      registerAckCallback(id, ack) {
        const timeout = this.flags.timeout;
        if (timeout === void 0) {
          this.acks.set(id, ack);
          return;
        }
        const timer = setTimeout(() => {
          debug("event with ack id %d has timed out after %d ms", id, timeout);
          this.acks.delete(id);
          ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks.set(id, (...args) => {
          clearTimeout(timer);
          ack.apply(this, [null, ...args]);
        });
      }
      /**
       * Targets a room when broadcasting.
       *
       * @example
       * io.on("connection", (socket) => {
       *   // the “foo” event will be broadcast to all connected clients in the “room-101” room, except this socket
       *   socket.to("room-101").emit("foo", "bar");
       *
       *   // the code above is equivalent to:
       *   io.to("room-101").except(socket.id).emit("foo", "bar");
       *
       *   // with an array of rooms (a client will be notified at most once)
       *   socket.to(["room-101", "room-102"]).emit("foo", "bar");
       *
       *   // with multiple chained calls
       *   socket.to("room-101").to("room-102").emit("foo", "bar");
       * });
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      to(room) {
        return this.newBroadcastOperator().to(room);
      }
      /**
       * Targets a room when broadcasting. Similar to `to()`, but might feel clearer in some cases:
       *
       * @example
       * io.on("connection", (socket) => {
       *   // disconnect all clients in the "room-101" room, except this socket
       *   socket.in("room-101").disconnectSockets();
       * });
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      in(room) {
        return this.newBroadcastOperator().in(room);
      }
      /**
       * Excludes a room when broadcasting.
       *
       * @example
       * io.on("connection", (socket) => {
       *   // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
       *   // and this socket
       *   socket.except("room-101").emit("foo", "bar");
       *
       *   // with an array of rooms
       *   socket.except(["room-101", "room-102"]).emit("foo", "bar");
       *
       *   // with multiple chained calls
       *   socket.except("room-101").except("room-102").emit("foo", "bar");
       * });
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      except(room) {
        return this.newBroadcastOperator().except(room);
      }
      /**
       * Sends a `message` event.
       *
       * This method mimics the WebSocket.send() method.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.send("hello");
       *
       *   // this is equivalent to
       *   socket.emit("message", "hello");
       * });
       *
       * @return self
       */
      send(...args) {
        this.emit("message", ...args);
        return this;
      }
      /**
       * Sends a `message` event. Alias of {@link send}.
       *
       * @return self
       */
      write(...args) {
        this.emit("message", ...args);
        return this;
      }
      /**
       * Writes a packet.
       *
       * @param {Object} packet - packet object
       * @param {Object} opts - options
       * @private
       */
      packet(packet, opts = {}) {
        packet.nsp = this.nsp.name;
        opts.compress = false !== opts.compress;
        this.client._packet(packet, opts);
      }
      /**
       * Joins a room.
       *
       * @example
       * io.on("connection", (socket) => {
       *   // join a single room
       *   socket.join("room1");
       *
       *   // join multiple rooms
       *   socket.join(["room1", "room2"]);
       * });
       *
       * @param {String|Array} rooms - room or array of rooms
       * @return a Promise or nothing, depending on the adapter
       */
      join(rooms) {
        debug("join room %s", rooms);
        return this.adapter.addAll(this.id, new Set(Array.isArray(rooms) ? rooms : [rooms]));
      }
      /**
       * Leaves a room.
       *
       * @example
       * io.on("connection", (socket) => {
       *   // leave a single room
       *   socket.leave("room1");
       *
       *   // leave multiple rooms
       *   socket.leave("room1").leave("room2");
       * });
       *
       * @param {String} room
       * @return a Promise or nothing, depending on the adapter
       */
      leave(room) {
        debug("leave room %s", room);
        return this.adapter.del(this.id, room);
      }
      /**
       * Leave all rooms.
       *
       * @private
       */
      leaveAll() {
        this.adapter.delAll(this.id);
      }
      /**
       * Called by `Namespace` upon successful
       * middleware execution (ie: authorization).
       * Socket is added to namespace array before
       * call to join, so adapters can access it.
       *
       * @private
       */
      _onconnect() {
        debug("socket connected - writing packet");
        this.connected = true;
        this.join(this.id);
        if (this.conn.protocol === 3) {
          this.packet({ type: socket_io_parser_1.PacketType.CONNECT });
        } else {
          this.packet({
            type: socket_io_parser_1.PacketType.CONNECT,
            data: { sid: this.id, pid: this.pid }
          });
        }
      }
      /**
       * Called with each packet. Called by `Client`.
       *
       * @param {Object} packet
       * @private
       */
      _onpacket(packet) {
        debug("got packet %j", packet);
        switch (packet.type) {
          case socket_io_parser_1.PacketType.EVENT:
            this.onevent(packet);
            break;
          case socket_io_parser_1.PacketType.BINARY_EVENT:
            this.onevent(packet);
            break;
          case socket_io_parser_1.PacketType.ACK:
            this.onack(packet);
            break;
          case socket_io_parser_1.PacketType.BINARY_ACK:
            this.onack(packet);
            break;
          case socket_io_parser_1.PacketType.DISCONNECT:
            this.ondisconnect();
            break;
        }
      }
      /**
       * Called upon event packet.
       *
       * @param {Packet} packet - packet object
       * @private
       */
      onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
          debug("attaching ack callback to event");
          args.push(this.ack(packet.id));
        }
        if (this._anyListeners && this._anyListeners.length) {
          const listeners = this._anyListeners.slice();
          for (const listener of listeners) {
            listener.apply(this, args);
          }
        }
        this.dispatch(args);
      }
      /**
       * Produces an ack callback to emit with an event.
       *
       * @param {Number} id - packet id
       * @private
       */
      ack(id) {
        const self = this;
        let sent = false;
        return function() {
          if (sent)
            return;
          const args = Array.prototype.slice.call(arguments);
          debug("sending ack %j", args);
          self.packet({
            id,
            type: socket_io_parser_1.PacketType.ACK,
            data: args
          });
          sent = true;
        };
      }
      /**
       * Called upon ack packet.
       *
       * @private
       */
      onack(packet) {
        const ack = this.acks.get(packet.id);
        if ("function" == typeof ack) {
          debug("calling ack %s with %j", packet.id, packet.data);
          ack.apply(this, packet.data);
          this.acks.delete(packet.id);
        } else {
          debug("bad ack %s", packet.id);
        }
      }
      /**
       * Called upon client disconnect packet.
       *
       * @private
       */
      ondisconnect() {
        debug("got disconnect packet");
        this._onclose("client namespace disconnect");
      }
      /**
       * Handles a client error.
       *
       * @private
       */
      _onerror(err) {
        this.emitReserved("error", err);
      }
      /**
       * Called upon closing. Called by `Client`.
       *
       * @param {String} reason
       * @param description
       * @throw {Error} optional error object
       *
       * @private
       */
      _onclose(reason, description) {
        if (!this.connected)
          return this;
        debug("closing socket - reason %s", reason);
        this.emitReserved("disconnecting", reason, description);
        if (this.server._opts.connectionStateRecovery && RECOVERABLE_DISCONNECT_REASONS.has(reason)) {
          debug("connection state recovery is enabled for sid %s", this.id);
          this.adapter.persistSession({
            sid: this.id,
            pid: this.pid,
            rooms: [...this.rooms],
            data: this.data
          });
        }
        this._cleanup();
        this.client._remove(this);
        this.connected = false;
        this.emitReserved("disconnect", reason, description);
        return;
      }
      /**
       * Makes the socket leave all the rooms it was part of and prevents it from joining any other room
       *
       * @private
       */
      _cleanup() {
        this.leaveAll();
        this.nsp._remove(this);
        this.join = noop;
      }
      /**
       * Produces an `error` packet.
       *
       * @param {Object} err - error object
       *
       * @private
       */
      _error(err) {
        this.packet({ type: socket_io_parser_1.PacketType.CONNECT_ERROR, data: err });
      }
      /**
       * Disconnects this client.
       *
       * @example
       * io.on("connection", (socket) => {
       *   // disconnect this socket (the connection might be kept alive for other namespaces)
       *   socket.disconnect();
       *
       *   // disconnect this socket and close the underlying connection
       *   socket.disconnect(true);
       * })
       *
       * @param {Boolean} close - if `true`, closes the underlying connection
       * @return self
       */
      disconnect(close = false) {
        if (!this.connected)
          return this;
        if (close) {
          this.client._disconnect();
        } else {
          this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
          this._onclose("server namespace disconnect");
        }
        return this;
      }
      /**
       * Sets the compress flag.
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.compress(false).emit("hello");
       * });
       *
       * @param {Boolean} compress - if `true`, compresses the sending data
       * @return {Socket} self
       */
      compress(compress) {
        this.flags.compress = compress;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
       * receive messages (because of network slowness or other issues, or because they’re connected through long polling
       * and is in the middle of a request-response cycle).
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.volatile.emit("hello"); // the client may or may not receive it
       * });
       *
       * @return {Socket} self
       */
      get volatile() {
        this.flags.volatile = true;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the
       * sender.
       *
       * @example
       * io.on("connection", (socket) => {
       *   // the “foo” event will be broadcast to all connected clients, except this socket
       *   socket.broadcast.emit("foo", "bar");
       * });
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get broadcast() {
        return this.newBroadcastOperator();
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
       *
       * @example
       * io.on("connection", (socket) => {
       *   // the “foo” event will be broadcast to all connected clients on this node, except this socket
       *   socket.local.emit("foo", "bar");
       * });
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get local() {
        return this.newBroadcastOperator().local;
      }
      /**
       * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
       * given number of milliseconds have elapsed without an acknowledgement from the client:
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.timeout(5000).emit("my-event", (err) => {
       *     if (err) {
       *       // the client did not acknowledge the event in the given delay
       *     }
       *   });
       * });
       *
       * @returns self
       */
      timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
      }
      /**
       * Dispatch incoming event to socket listeners.
       *
       * @param {Array} event - event that will get emitted
       * @private
       */
      dispatch(event) {
        debug("dispatching an event %j", event);
        this.run(event, (err) => {
          process.nextTick(() => {
            if (err) {
              return this._onerror(err);
            }
            if (this.connected) {
              super.emitUntyped.apply(this, event);
            } else {
              debug("ignore packet received after disconnection");
            }
          });
        });
      }
      /**
       * Sets up socket middleware.
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.use(([event, ...args], next) => {
       *     if (isUnauthorized(event)) {
       *       return next(new Error("unauthorized event"));
       *     }
       *     // do not forget to call next
       *     next();
       *   });
       *
       *   socket.on("error", (err) => {
       *     if (err && err.message === "unauthorized event") {
       *       socket.disconnect();
       *     }
       *   });
       * });
       *
       * @param {Function} fn - middleware function (event, next)
       * @return {Socket} self
       */
      use(fn) {
        this.fns.push(fn);
        return this;
      }
      /**
       * Executes the middleware for an incoming event.
       *
       * @param {Array} event - event that will get emitted
       * @param {Function} fn - last fn call in the middleware
       * @private
       */
      run(event, fn) {
        const fns = this.fns.slice(0);
        if (!fns.length)
          return fn(null);
        function run(i) {
          fns[i](event, function(err) {
            if (err)
              return fn(err);
            if (!fns[i + 1])
              return fn(null);
            run(i + 1);
          });
        }
        run(0);
      }
      /**
       * Whether the socket is currently disconnected
       */
      get disconnected() {
        return !this.connected;
      }
      /**
       * A reference to the request that originated the underlying Engine.IO Socket.
       */
      get request() {
        return this.client.request;
      }
      /**
       * A reference to the underlying Client transport connection (Engine.IO Socket object).
       *
       * @example
       * io.on("connection", (socket) => {
       *   console.log(socket.conn.transport.name); // prints "polling" or "websocket"
       *
       *   socket.conn.once("upgrade", () => {
       *     console.log(socket.conn.transport.name); // prints "websocket"
       *   });
       * });
       */
      get conn() {
        return this.client.conn;
      }
      /**
       * Returns the rooms the socket is currently in.
       *
       * @example
       * io.on("connection", (socket) => {
       *   console.log(socket.rooms); // Set { <socket.id> }
       *
       *   socket.join("room1");
       *
       *   console.log(socket.rooms); // Set { <socket.id>, "room1" }
       * });
       */
      get rooms() {
        return this.adapter.socketRooms(this.id) || /* @__PURE__ */ new Set();
      }
      /**
       * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
       * the callback.
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.onAny((event, ...args) => {
       *     console.log(`got event ${event}`);
       *   });
       * });
       *
       * @param listener
       */
      onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
       * the callback. The listener is added to the beginning of the listeners array.
       *
       * @param listener
       */
      prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
      }
      /**
       * Removes the listener that will be fired when any event is received.
       *
       * @example
       * io.on("connection", (socket) => {
       *   const catchAllListener = (event, ...args) => {
       *     console.log(`got event ${event}`);
       *   }
       *
       *   socket.onAny(catchAllListener);
       *
       *   // remove a specific listener
       *   socket.offAny(catchAllListener);
       *
       *   // or remove all listeners
       *   socket.offAny();
       * });
       *
       * @param listener
       */
      offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }
        if (listener) {
          const listeners = this._anyListeners;
          for (let i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyListeners = [];
        }
        return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       */
      listenersAny() {
        return this._anyListeners || [];
      }
      /**
       * Adds a listener that will be fired when any event is sent. The event name is passed as the first argument to
       * the callback.
       *
       * Note: acknowledgements sent to the client are not included.
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.onAnyOutgoing((event, ...args) => {
       *     console.log(`sent event ${event}`);
       *   });
       * });
       *
       * @param listener
       */
      onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback. The listener is added to the beginning of the listeners array.
       *
       * @example
       * io.on("connection", (socket) => {
       *   socket.prependAnyOutgoing((event, ...args) => {
       *     console.log(`sent event ${event}`);
       *   });
       * });
       *
       * @param listener
       */
      prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
      }
      /**
       * Removes the listener that will be fired when any event is sent.
       *
       * @example
       * io.on("connection", (socket) => {
       *   const catchAllListener = (event, ...args) => {
       *     console.log(`sent event ${event}`);
       *   }
       *
       *   socket.onAnyOutgoing(catchAllListener);
       *
       *   // remove a specific listener
       *   socket.offAnyOutgoing(catchAllListener);
       *
       *   // or remove all listeners
       *   socket.offAnyOutgoing();
       * });
       *
       * @param listener - the catch-all listener
       */
      offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
          return this;
        }
        if (listener) {
          const listeners = this._anyOutgoingListeners;
          for (let i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyOutgoingListeners = [];
        }
        return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       */
      listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
      }
      /**
       * Notify the listeners for each packet sent (emit or broadcast)
       *
       * @param packet
       *
       * @private
       */
      notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
          const listeners = this._anyOutgoingListeners.slice();
          for (const listener of listeners) {
            listener.apply(this, packet.data);
          }
        }
      }
      newBroadcastOperator() {
        const flags = Object.assign({}, this.flags);
        this.flags = {};
        return new broadcast_operator_1.BroadcastOperator(this.adapter, /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set([this.id]), flags);
      }
    };
    exports2.Socket = Socket2;
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/namespace.js
var require_namespace = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/namespace.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Namespace = exports2.RESERVED_EVENTS = void 0;
    var socket_1 = require_socket2();
    var typed_events_1 = require_typed_events();
    var debug_1 = __importDefault(require_src());
    var broadcast_operator_1 = require_broadcast_operator();
    var debug = (0, debug_1.default)("socket.io:namespace");
    exports2.RESERVED_EVENTS = /* @__PURE__ */ new Set(["connect", "connection", "new_namespace"]);
    var Namespace2 = class extends typed_events_1.StrictEventEmitter {
      /**
       * Namespace constructor.
       *
       * @param server instance
       * @param name
       */
      constructor(server, name) {
        super();
        this.sockets = /* @__PURE__ */ new Map();
        this._fns = [];
        this._ids = 0;
        this.server = server;
        this.name = name;
        this._initAdapter();
      }
      /**
       * Initializes the `Adapter` for this nsp.
       * Run upon changing adapter by `Server#adapter`
       * in addition to the constructor.
       *
       * @private
       */
      _initAdapter() {
        this.adapter = new (this.server.adapter())(this);
      }
      /**
       * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.use((socket, next) => {
       *   // ...
       *   next();
       * });
       *
       * @param fn - the middleware function
       */
      use(fn) {
        this._fns.push(fn);
        return this;
      }
      /**
       * Executes the middleware for an incoming client.
       *
       * @param socket - the socket that will get added
       * @param fn - last fn call in the middleware
       * @private
       */
      run(socket, fn) {
        const fns = this._fns.slice(0);
        if (!fns.length)
          return fn(null);
        function run(i) {
          fns[i](socket, function(err) {
            if (err)
              return fn(err);
            if (!fns[i + 1])
              return fn(null);
            run(i + 1);
          });
        }
        run(0);
      }
      /**
       * Targets a room when emitting.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // the “foo” event will be broadcast to all connected clients in the “room-101” room
       * myNamespace.to("room-101").emit("foo", "bar");
       *
       * // with an array of rooms (a client will be notified at most once)
       * myNamespace.to(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * myNamespace.to("room-101").to("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      to(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).to(room);
      }
      /**
       * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // disconnect all clients in the "room-101" room
       * myNamespace.in("room-101").disconnectSockets();
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      in(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).in(room);
      }
      /**
       * Excludes a room when emitting.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
       * myNamespace.except("room-101").emit("foo", "bar");
       *
       * // with an array of rooms
       * myNamespace.except(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * myNamespace.except("room-101").except("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      except(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).except(room);
      }
      /**
       * Adds a new client.
       *
       * @return {Socket}
       * @private
       */
      async _add(client, auth, fn) {
        var _a;
        debug("adding socket to nsp %s", this.name);
        const socket = await this._createSocket(client, auth);
        if (
          // @ts-ignore
          ((_a = this.server.opts.connectionStateRecovery) === null || _a === void 0 ? void 0 : _a.skipMiddlewares) && socket.recovered && client.conn.readyState === "open"
        ) {
          return this._doConnect(socket, fn);
        }
        this.run(socket, (err) => {
          process.nextTick(() => {
            if ("open" !== client.conn.readyState) {
              debug("next called after client was closed - ignoring socket");
              socket._cleanup();
              return;
            }
            if (err) {
              debug("middleware error, sending CONNECT_ERROR packet to the client");
              socket._cleanup();
              if (client.conn.protocol === 3) {
                return socket._error(err.data || err.message);
              } else {
                return socket._error({
                  message: err.message,
                  data: err.data
                });
              }
            }
            this._doConnect(socket, fn);
          });
        });
      }
      async _createSocket(client, auth) {
        const sessionId = auth.pid;
        const offset = auth.offset;
        if (
          // @ts-ignore
          this.server.opts.connectionStateRecovery && typeof sessionId === "string" && typeof offset === "string"
        ) {
          let session;
          try {
            session = await this.adapter.restoreSession(sessionId, offset);
          } catch (e) {
            debug("error while restoring session: %s", e);
          }
          if (session) {
            debug("connection state recovered for sid %s", session.sid);
            return new socket_1.Socket(this, client, auth, session);
          }
        }
        return new socket_1.Socket(this, client, auth);
      }
      _doConnect(socket, fn) {
        this.sockets.set(socket.id, socket);
        socket._onconnect();
        if (fn)
          fn(socket);
        this.emitReserved("connect", socket);
        this.emitReserved("connection", socket);
      }
      /**
       * Removes a client. Called by each `Socket`.
       *
       * @private
       */
      _remove(socket) {
        if (this.sockets.has(socket.id)) {
          this.sockets.delete(socket.id);
        } else {
          debug("ignoring remove for %s", socket.id);
        }
      }
      /**
       * Emits to all connected clients.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.emit("hello", "world");
       *
       * // all serializable datastructures are supported (no need to call JSON.stringify)
       * myNamespace.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
       *
       * // with an acknowledgement from the clients
       * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @return Always true
       */
      emit(ev, ...args) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).emit(ev, ...args);
      }
      /**
       * Sends a `message` event to all clients.
       *
       * This method mimics the WebSocket.send() method.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.send("hello");
       *
       * // this is equivalent to
       * myNamespace.emit("message", "hello");
       *
       * @return self
       */
      send(...args) {
        this.emit("message", ...args);
        return this;
      }
      /**
       * Sends a `message` event to all clients. Sends a `message` event. Alias of {@link send}.
       *
       * @return self
       */
      write(...args) {
        this.emit("message", ...args);
        return this;
      }
      /**
       * Sends a message to the other Socket.IO servers of the cluster.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.serverSideEmit("hello", "world");
       *
       * myNamespace.on("hello", (arg1) => {
       *   console.log(arg1); // prints "world"
       * });
       *
       * // acknowledgements (without binary content) are supported too:
       * myNamespace.serverSideEmit("ping", (err, responses) => {
       *  if (err) {
       *     // some servers did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per server (except the current one)
       *   }
       * });
       *
       * myNamespace.on("ping", (cb) => {
       *   cb("pong");
       * });
       *
       * @param ev - the event name
       * @param args - an array of arguments, which may include an acknowledgement callback at the end
       */
      serverSideEmit(ev, ...args) {
        if (exports2.RESERVED_EVENTS.has(ev)) {
          throw new Error(`"${String(ev)}" is a reserved event name`);
        }
        args.unshift(ev);
        this.adapter.serverSideEmit(args);
        return true;
      }
      /**
       * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * try {
       *   const responses = await myNamespace.serverSideEmitWithAck("ping");
       *   console.log(responses); // one response per server (except the current one)
       * } catch (e) {
       *   // some servers did not acknowledge the event in the given delay
       * }
       *
       * @param ev - the event name
       * @param args - an array of arguments
       *
       * @return a Promise that will be fulfilled when all servers have acknowledged the event
       */
      serverSideEmitWithAck(ev, ...args) {
        return new Promise((resolve, reject) => {
          args.push((err, responses) => {
            if (err) {
              err.responses = responses;
              return reject(err);
            } else {
              return resolve(responses);
            }
          });
          this.serverSideEmit(ev, ...args);
        });
      }
      /**
       * Called when a packet is received from another Socket.IO server
       *
       * @param args - an array of arguments, which may include an acknowledgement callback at the end
       *
       * @private
       */
      _onServerSideEmit(args) {
        super.emitUntyped.apply(this, args);
      }
      /**
       * Gets a list of clients.
       *
       * @deprecated this method will be removed in the next major release, please use {@link Namespace#serverSideEmit} or
       * {@link Namespace#fetchSockets} instead.
       */
      allSockets() {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).allSockets();
      }
      /**
       * Sets the compress flag.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.compress(false).emit("hello");
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       */
      compress(compress) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).compress(compress);
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
       * receive messages (because of network slowness or other issues, or because they’re connected through long polling
       * and is in the middle of a request-response cycle).
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.volatile.emit("hello"); // the clients may or may not receive it
       *
       * @return self
       */
      get volatile() {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).volatile;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // the “foo” event will be broadcast to all connected clients on this node
       * myNamespace.local.emit("foo", "bar");
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get local() {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).local;
      }
      /**
       * Adds a timeout in milliseconds for the next operation.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @param timeout
       */
      timeout(timeout) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).timeout(timeout);
      }
      /**
       * Returns the matching socket instances.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // return all Socket instances
       * const sockets = await myNamespace.fetchSockets();
       *
       * // return all Socket instances in the "room1" room
       * const sockets = await myNamespace.in("room1").fetchSockets();
       *
       * for (const socket of sockets) {
       *   console.log(socket.id);
       *   console.log(socket.handshake);
       *   console.log(socket.rooms);
       *   console.log(socket.data);
       *
       *   socket.emit("hello");
       *   socket.join("room1");
       *   socket.leave("room2");
       *   socket.disconnect();
       * }
       */
      fetchSockets() {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).fetchSockets();
      }
      /**
       * Makes the matching socket instances join the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // make all socket instances join the "room1" room
       * myNamespace.socketsJoin("room1");
       *
       * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
       * myNamespace.in("room1").socketsJoin(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsJoin(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsJoin(room);
      }
      /**
       * Makes the matching socket instances leave the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // make all socket instances leave the "room1" room
       * myNamespace.socketsLeave("room1");
       *
       * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
       * myNamespace.in("room1").socketsLeave(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsLeave(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsLeave(room);
      }
      /**
       * Makes the matching socket instances disconnect.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
       * myNamespace.disconnectSockets();
       *
       * // make all socket instances in the "room1" room disconnect and close the underlying connections
       * myNamespace.in("room1").disconnectSockets(true);
       *
       * @param close - whether to close the underlying connection
       */
      disconnectSockets(close = false) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).disconnectSockets(close);
      }
    };
    exports2.Namespace = Namespace2;
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/parent-namespace.js
var require_parent_namespace = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/parent-namespace.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ParentNamespace = void 0;
    var namespace_1 = require_namespace();
    var debug_1 = __importDefault(require_src());
    var debug = (0, debug_1.default)("socket.io:parent-namespace");
    var ParentNamespace = class _ParentNamespace extends namespace_1.Namespace {
      constructor(server) {
        super(server, "/_" + _ParentNamespace.count++);
        this.children = /* @__PURE__ */ new Set();
      }
      /**
       * @private
       */
      _initAdapter() {
        const broadcast = (packet, opts) => {
          this.children.forEach((nsp) => {
            nsp.adapter.broadcast(packet, opts);
          });
        };
        this.adapter = { broadcast };
      }
      emit(ev, ...args) {
        this.children.forEach((nsp) => {
          nsp.emit(ev, ...args);
        });
        return true;
      }
      createChild(name) {
        debug("creating child namespace %s", name);
        const namespace = new namespace_1.Namespace(this.server, name);
        namespace._fns = this._fns.slice(0);
        this.listeners("connect").forEach((listener) => namespace.on("connect", listener));
        this.listeners("connection").forEach((listener) => namespace.on("connection", listener));
        this.children.add(namespace);
        if (this.server._opts.cleanupEmptyChildNamespaces) {
          const remove = namespace._remove;
          namespace._remove = (socket) => {
            remove.call(namespace, socket);
            if (namespace.sockets.size === 0) {
              debug("closing child namespace %s", name);
              namespace.adapter.close();
              this.server._nsps.delete(namespace.name);
              this.children.delete(namespace);
            }
          };
        }
        this.server._nsps.set(name, namespace);
        this.server.sockets.emitReserved("new_namespace", namespace);
        return namespace;
      }
      fetchSockets() {
        throw new Error("fetchSockets() is not supported on parent namespaces");
      }
    };
    exports2.ParentNamespace = ParentNamespace;
    ParentNamespace.count = 0;
  }
});

// node_modules/.pnpm/socket.io-adapter@2.5.2/node_modules/socket.io-adapter/dist/contrib/yeast.js
var require_yeast = __commonJS({
  "node_modules/.pnpm/socket.io-adapter@2.5.2/node_modules/socket.io-adapter/dist/contrib/yeast.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.yeast = exports2.decode = exports2.encode = void 0;
    var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
    var length = 64;
    var map = {};
    var seed = 0;
    var i = 0;
    var prev;
    function encode(num) {
      let encoded = "";
      do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
      } while (num > 0);
      return encoded;
    }
    exports2.encode = encode;
    function decode(str) {
      let decoded = 0;
      for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
      }
      return decoded;
    }
    exports2.decode = decode;
    function yeast() {
      const now = encode(+/* @__PURE__ */ new Date());
      if (now !== prev)
        return seed = 0, prev = now;
      return now + "." + encode(seed++);
    }
    exports2.yeast = yeast;
    for (; i < length; i++)
      map[alphabet[i]] = i;
  }
});

// node_modules/.pnpm/socket.io-adapter@2.5.2/node_modules/socket.io-adapter/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/socket.io-adapter@2.5.2/node_modules/socket.io-adapter/dist/index.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SessionAwareAdapter = exports2.Adapter = void 0;
    var events_1 = require("events");
    var yeast_1 = require_yeast();
    var WebSocket = require_ws();
    var canPreComputeFrame = typeof ((_a = WebSocket === null || WebSocket === void 0 ? void 0 : WebSocket.Sender) === null || _a === void 0 ? void 0 : _a.frame) === "function";
    var Adapter = class extends events_1.EventEmitter {
      /**
       * In-memory adapter constructor.
       *
       * @param {Namespace} nsp
       */
      constructor(nsp) {
        super();
        this.nsp = nsp;
        this.rooms = /* @__PURE__ */ new Map();
        this.sids = /* @__PURE__ */ new Map();
        this.encoder = nsp.server.encoder;
      }
      /**
       * To be overridden
       */
      init() {
      }
      /**
       * To be overridden
       */
      close() {
      }
      /**
       * Returns the number of Socket.IO servers in the cluster
       *
       * @public
       */
      serverCount() {
        return Promise.resolve(1);
      }
      /**
       * Adds a socket to a list of room.
       *
       * @param {SocketId}  id      the socket id
       * @param {Set<Room>} rooms   a set of rooms
       * @public
       */
      addAll(id, rooms) {
        if (!this.sids.has(id)) {
          this.sids.set(id, /* @__PURE__ */ new Set());
        }
        for (const room of rooms) {
          this.sids.get(id).add(room);
          if (!this.rooms.has(room)) {
            this.rooms.set(room, /* @__PURE__ */ new Set());
            this.emit("create-room", room);
          }
          if (!this.rooms.get(room).has(id)) {
            this.rooms.get(room).add(id);
            this.emit("join-room", room, id);
          }
        }
      }
      /**
       * Removes a socket from a room.
       *
       * @param {SocketId} id     the socket id
       * @param {Room}     room   the room name
       */
      del(id, room) {
        if (this.sids.has(id)) {
          this.sids.get(id).delete(room);
        }
        this._del(room, id);
      }
      _del(room, id) {
        const _room = this.rooms.get(room);
        if (_room != null) {
          const deleted = _room.delete(id);
          if (deleted) {
            this.emit("leave-room", room, id);
          }
          if (_room.size === 0 && this.rooms.delete(room)) {
            this.emit("delete-room", room);
          }
        }
      }
      /**
       * Removes a socket from all rooms it's joined.
       *
       * @param {SocketId} id   the socket id
       */
      delAll(id) {
        if (!this.sids.has(id)) {
          return;
        }
        for (const room of this.sids.get(id)) {
          this._del(room, id);
        }
        this.sids.delete(id);
      }
      /**
       * Broadcasts a packet.
       *
       * Options:
       *  - `flags` {Object} flags for this packet
       *  - `except` {Array} sids that should be excluded
       *  - `rooms` {Array} list of rooms to broadcast to
       *
       * @param {Object} packet   the packet object
       * @param {Object} opts     the options
       * @public
       */
      broadcast(packet, opts) {
        const flags = opts.flags || {};
        const packetOpts = {
          preEncoded: true,
          volatile: flags.volatile,
          compress: flags.compress
        };
        packet.nsp = this.nsp.name;
        const encodedPackets = this._encode(packet, packetOpts);
        this.apply(opts, (socket) => {
          if (typeof socket.notifyOutgoingListeners === "function") {
            socket.notifyOutgoingListeners(packet);
          }
          socket.client.writeToEngine(encodedPackets, packetOpts);
        });
      }
      /**
       * Broadcasts a packet and expects multiple acknowledgements.
       *
       * Options:
       *  - `flags` {Object} flags for this packet
       *  - `except` {Array} sids that should be excluded
       *  - `rooms` {Array} list of rooms to broadcast to
       *
       * @param {Object} packet   the packet object
       * @param {Object} opts     the options
       * @param clientCountCallback - the number of clients that received the packet
       * @param ack                 - the callback that will be called for each client response
       *
       * @public
       */
      broadcastWithAck(packet, opts, clientCountCallback, ack) {
        const flags = opts.flags || {};
        const packetOpts = {
          preEncoded: true,
          volatile: flags.volatile,
          compress: flags.compress
        };
        packet.nsp = this.nsp.name;
        packet.id = this.nsp._ids++;
        const encodedPackets = this._encode(packet, packetOpts);
        let clientCount = 0;
        this.apply(opts, (socket) => {
          clientCount++;
          socket.acks.set(packet.id, ack);
          if (typeof socket.notifyOutgoingListeners === "function") {
            socket.notifyOutgoingListeners(packet);
          }
          socket.client.writeToEngine(encodedPackets, packetOpts);
        });
        clientCountCallback(clientCount);
      }
      _encode(packet, packetOpts) {
        const encodedPackets = this.encoder.encode(packet);
        if (canPreComputeFrame && encodedPackets.length === 1 && typeof encodedPackets[0] === "string") {
          const data = Buffer.from("4" + encodedPackets[0]);
          packetOpts.wsPreEncodedFrame = WebSocket.Sender.frame(data, {
            readOnly: false,
            mask: false,
            rsv1: false,
            opcode: 1,
            fin: true
          });
        }
        return encodedPackets;
      }
      /**
       * Gets a list of sockets by sid.
       *
       * @param {Set<Room>} rooms   the explicit set of rooms to check.
       */
      sockets(rooms) {
        const sids = /* @__PURE__ */ new Set();
        this.apply({ rooms }, (socket) => {
          sids.add(socket.id);
        });
        return Promise.resolve(sids);
      }
      /**
       * Gets the list of rooms a given socket has joined.
       *
       * @param {SocketId} id   the socket id
       */
      socketRooms(id) {
        return this.sids.get(id);
      }
      /**
       * Returns the matching socket instances
       *
       * @param opts - the filters to apply
       */
      fetchSockets(opts) {
        const sockets = [];
        this.apply(opts, (socket) => {
          sockets.push(socket);
        });
        return Promise.resolve(sockets);
      }
      /**
       * Makes the matching socket instances join the specified rooms
       *
       * @param opts - the filters to apply
       * @param rooms - the rooms to join
       */
      addSockets(opts, rooms) {
        this.apply(opts, (socket) => {
          socket.join(rooms);
        });
      }
      /**
       * Makes the matching socket instances leave the specified rooms
       *
       * @param opts - the filters to apply
       * @param rooms - the rooms to leave
       */
      delSockets(opts, rooms) {
        this.apply(opts, (socket) => {
          rooms.forEach((room) => socket.leave(room));
        });
      }
      /**
       * Makes the matching socket instances disconnect
       *
       * @param opts - the filters to apply
       * @param close - whether to close the underlying connection
       */
      disconnectSockets(opts, close) {
        this.apply(opts, (socket) => {
          socket.disconnect(close);
        });
      }
      apply(opts, callback) {
        const rooms = opts.rooms;
        const except = this.computeExceptSids(opts.except);
        if (rooms.size) {
          const ids = /* @__PURE__ */ new Set();
          for (const room of rooms) {
            if (!this.rooms.has(room))
              continue;
            for (const id of this.rooms.get(room)) {
              if (ids.has(id) || except.has(id))
                continue;
              const socket = this.nsp.sockets.get(id);
              if (socket) {
                callback(socket);
                ids.add(id);
              }
            }
          }
        } else {
          for (const [id] of this.sids) {
            if (except.has(id))
              continue;
            const socket = this.nsp.sockets.get(id);
            if (socket)
              callback(socket);
          }
        }
      }
      computeExceptSids(exceptRooms) {
        const exceptSids = /* @__PURE__ */ new Set();
        if (exceptRooms && exceptRooms.size > 0) {
          for (const room of exceptRooms) {
            if (this.rooms.has(room)) {
              this.rooms.get(room).forEach((sid) => exceptSids.add(sid));
            }
          }
        }
        return exceptSids;
      }
      /**
       * Send a packet to the other Socket.IO servers in the cluster
       * @param packet - an array of arguments, which may include an acknowledgement callback at the end
       */
      serverSideEmit(packet) {
        console.warn("this adapter does not support the serverSideEmit() functionality");
      }
      /**
       * Save the client session in order to restore it upon reconnection.
       */
      persistSession(session) {
      }
      /**
       * Restore the session and find the packets that were missed by the client.
       * @param pid
       * @param offset
       */
      restoreSession(pid, offset) {
        return null;
      }
    };
    exports2.Adapter = Adapter;
    var SessionAwareAdapter = class extends Adapter {
      constructor(nsp) {
        super(nsp);
        this.nsp = nsp;
        this.sessions = /* @__PURE__ */ new Map();
        this.packets = [];
        this.maxDisconnectionDuration = nsp.server.opts.connectionStateRecovery.maxDisconnectionDuration;
        const timer = setInterval(() => {
          const threshold = Date.now() - this.maxDisconnectionDuration;
          this.sessions.forEach((session, sessionId) => {
            const hasExpired = session.disconnectedAt < threshold;
            if (hasExpired) {
              this.sessions.delete(sessionId);
            }
          });
          for (let i = this.packets.length - 1; i >= 0; i--) {
            const hasExpired = this.packets[i].emittedAt < threshold;
            if (hasExpired) {
              this.packets.splice(0, i + 1);
              break;
            }
          }
        }, 60 * 1e3);
        timer.unref();
      }
      persistSession(session) {
        session.disconnectedAt = Date.now();
        this.sessions.set(session.pid, session);
      }
      restoreSession(pid, offset) {
        const session = this.sessions.get(pid);
        if (!session) {
          return null;
        }
        const hasExpired = session.disconnectedAt + this.maxDisconnectionDuration < Date.now();
        if (hasExpired) {
          this.sessions.delete(pid);
          return null;
        }
        const index = this.packets.findIndex((packet) => packet.id === offset);
        if (index === -1) {
          return null;
        }
        const missedPackets = [];
        for (let i = index + 1; i < this.packets.length; i++) {
          const packet = this.packets[i];
          if (shouldIncludePacket(session.rooms, packet.opts)) {
            missedPackets.push(packet.data);
          }
        }
        return Promise.resolve(Object.assign(Object.assign({}, session), { missedPackets }));
      }
      broadcast(packet, opts) {
        var _a2;
        const isEventPacket = packet.type === 2;
        const withoutAcknowledgement = packet.id === void 0;
        const notVolatile = ((_a2 = opts.flags) === null || _a2 === void 0 ? void 0 : _a2.volatile) === void 0;
        if (isEventPacket && withoutAcknowledgement && notVolatile) {
          const id = (0, yeast_1.yeast)();
          packet.data.push(id);
          this.packets.push({
            id,
            opts,
            data: packet.data,
            emittedAt: Date.now()
          });
        }
        super.broadcast(packet, opts);
      }
    };
    exports2.SessionAwareAdapter = SessionAwareAdapter;
    function shouldIncludePacket(sessionRooms, opts) {
      const included = opts.rooms.size === 0 || sessionRooms.some((room) => opts.rooms.has(room));
      const notExcluded = sessionRooms.every((room) => !opts.except.has(room));
      return included && notExcluded;
    }
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/uws.js
var require_uws = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/uws.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serveFile = exports2.restoreAdapter = exports2.patchAdapter = void 0;
    var socket_io_adapter_1 = require_dist();
    var fs_1 = require("fs");
    var debug_1 = __importDefault(require_src());
    var debug = (0, debug_1.default)("socket.io:adapter-uws");
    var SEPARATOR = "";
    var { addAll, del, broadcast } = socket_io_adapter_1.Adapter.prototype;
    function patchAdapter(app) {
      socket_io_adapter_1.Adapter.prototype.addAll = function(id, rooms) {
        const isNew = !this.sids.has(id);
        addAll.call(this, id, rooms);
        const socket = this.nsp.sockets.get(id);
        if (!socket) {
          return;
        }
        if (socket.conn.transport.name === "websocket") {
          subscribe(this.nsp.name, socket, isNew, rooms);
          return;
        }
        if (isNew) {
          socket.conn.on("upgrade", () => {
            const rooms2 = this.sids.get(id);
            if (rooms2) {
              subscribe(this.nsp.name, socket, isNew, rooms2);
            }
          });
        }
      };
      socket_io_adapter_1.Adapter.prototype.del = function(id, room) {
        del.call(this, id, room);
        const socket = this.nsp.sockets.get(id);
        if (socket && socket.conn.transport.name === "websocket") {
          const sessionId = socket.conn.id;
          const websocket = socket.conn.transport.socket;
          const topic = `${this.nsp.name}${SEPARATOR}${room}`;
          debug("unsubscribe connection %s from topic %s", sessionId, topic);
          websocket.unsubscribe(topic);
        }
      };
      socket_io_adapter_1.Adapter.prototype.broadcast = function(packet, opts) {
        const useFastPublish = opts.rooms.size <= 1 && opts.except.size === 0;
        if (!useFastPublish) {
          broadcast.call(this, packet, opts);
          return;
        }
        const flags = opts.flags || {};
        const basePacketOpts = {
          preEncoded: true,
          volatile: flags.volatile,
          compress: flags.compress
        };
        packet.nsp = this.nsp.name;
        const encodedPackets = this.encoder.encode(packet);
        const topic = opts.rooms.size === 0 ? this.nsp.name : `${this.nsp.name}${SEPARATOR}${opts.rooms.keys().next().value}`;
        debug("fast publish to %s", topic);
        encodedPackets.forEach((encodedPacket) => {
          const isBinary = typeof encodedPacket !== "string";
          app.publish(topic, isBinary ? encodedPacket : "4" + encodedPacket, isBinary);
        });
        this.apply(opts, (socket) => {
          if (socket.conn.transport.name !== "websocket") {
            socket.client.writeToEngine(encodedPackets, basePacketOpts);
          }
        });
      };
    }
    exports2.patchAdapter = patchAdapter;
    function subscribe(namespaceName, socket, isNew, rooms) {
      const sessionId = socket.conn.id;
      const websocket = socket.conn.transport.socket;
      if (isNew) {
        debug("subscribe connection %s to topic %s", sessionId, namespaceName);
        websocket.subscribe(namespaceName);
      }
      rooms.forEach((room) => {
        const topic = `${namespaceName}${SEPARATOR}${room}`;
        debug("subscribe connection %s to topic %s", sessionId, topic);
        websocket.subscribe(topic);
      });
    }
    function restoreAdapter() {
      socket_io_adapter_1.Adapter.prototype.addAll = addAll;
      socket_io_adapter_1.Adapter.prototype.del = del;
      socket_io_adapter_1.Adapter.prototype.broadcast = broadcast;
    }
    exports2.restoreAdapter = restoreAdapter;
    var toArrayBuffer = (buffer) => {
      const { buffer: arrayBuffer, byteOffset, byteLength } = buffer;
      return arrayBuffer.slice(byteOffset, byteOffset + byteLength);
    };
    function serveFile(res, filepath) {
      const { size } = (0, fs_1.statSync)(filepath);
      const readStream = (0, fs_1.createReadStream)(filepath);
      const destroyReadStream = () => !readStream.destroyed && readStream.destroy();
      const onError = (error) => {
        destroyReadStream();
        throw error;
      };
      const onDataChunk = (chunk) => {
        const arrayBufferChunk = toArrayBuffer(chunk);
        const lastOffset = res.getWriteOffset();
        const [ok, done] = res.tryEnd(arrayBufferChunk, size);
        if (!done && !ok) {
          readStream.pause();
          res.onWritable((offset) => {
            const [ok2, done2] = res.tryEnd(arrayBufferChunk.slice(offset - lastOffset), size);
            if (!done2 && ok2) {
              readStream.resume();
            }
            return ok2;
          });
        }
      };
      res.onAborted(destroyReadStream);
      readStream.on("data", onDataChunk).on("error", onError).on("end", destroyReadStream);
    }
    exports2.serveFile = serveFile;
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/package.json"(exports2, module2) {
    module2.exports = {
      name: "socket.io",
      version: "4.7.3",
      description: "node.js realtime framework server",
      keywords: [
        "realtime",
        "framework",
        "websocket",
        "tcp",
        "events",
        "socket",
        "io"
      ],
      files: [
        "dist/",
        "client-dist/",
        "wrapper.mjs",
        "!**/*.tsbuildinfo"
      ],
      directories: {
        doc: "docs/",
        example: "example/",
        lib: "lib/",
        test: "test/"
      },
      type: "commonjs",
      main: "./dist/index.js",
      exports: {
        types: "./dist/index.d.ts",
        import: "./wrapper.mjs",
        require: "./dist/index.js"
      },
      types: "./dist/index.d.ts",
      license: "MIT",
      repository: {
        type: "git",
        url: "git://github.com/socketio/socket.io"
      },
      scripts: {
        compile: "rimraf ./dist && tsc",
        test: "npm run format:check && npm run compile && npm run test:types && npm run test:unit",
        "test:types": "tsd",
        "test:unit": "nyc mocha --require ts-node/register --reporter spec --slow 200 --bail --timeout 10000 test/index.ts",
        "format:check": 'prettier --check "lib/**/*.ts" "test/**/*.ts"',
        "format:fix": 'prettier --write "lib/**/*.ts" "test/**/*.ts"',
        prepack: "npm run compile"
      },
      dependencies: {
        accepts: "~1.3.4",
        base64id: "~2.0.0",
        cors: "~2.8.5",
        debug: "~4.3.2",
        "engine.io": "~6.5.2",
        "socket.io-adapter": "~2.5.2",
        "socket.io-parser": "~4.2.4"
      },
      devDependencies: {
        "@types/mocha": "^9.0.0",
        "expect.js": "0.3.1",
        mocha: "^10.0.0",
        nyc: "^15.1.0",
        prettier: "^2.3.2",
        rimraf: "^3.0.2",
        "socket.io-client": "4.7.2",
        "socket.io-client-v2": "npm:socket.io-client@^2.4.0",
        superagent: "^8.0.0",
        supertest: "^6.1.6",
        "ts-node": "^10.2.1",
        tsd: "^0.27.0",
        typescript: "^4.4.2",
        "uWebSockets.js": "github:uNetworking/uWebSockets.js#v20.30.0"
      },
      contributors: [
        {
          name: "Guillermo Rauch",
          email: "rauchg@gmail.com"
        },
        {
          name: "Arnout Kazemier",
          email: "info@3rd-eden.com"
        },
        {
          name: "Vladimir Dronnikov",
          email: "dronnikov@gmail.com"
        },
        {
          name: "Einar Otto Stangvik",
          email: "einaros@gmail.com"
        }
      ],
      engines: {
        node: ">=10.2.0"
      },
      tsd: {
        directory: "test"
      }
    };
  }
});

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/dist/index.js"(exports2, module2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Namespace = exports2.Socket = exports2.Server = void 0;
    var http = require("http");
    var fs_1 = require("fs");
    var zlib_1 = require("zlib");
    var accepts = require_accepts();
    var stream_1 = require("stream");
    var path = require("path");
    var engine_io_1 = require_engine_io();
    var client_1 = require_client();
    var events_1 = require("events");
    var namespace_1 = require_namespace();
    Object.defineProperty(exports2, "Namespace", { enumerable: true, get: function() {
      return namespace_1.Namespace;
    } });
    var parent_namespace_1 = require_parent_namespace();
    var socket_io_adapter_1 = require_dist();
    var parser = __importStar(require_cjs2());
    var debug_1 = __importDefault(require_src());
    var socket_1 = require_socket2();
    Object.defineProperty(exports2, "Socket", { enumerable: true, get: function() {
      return socket_1.Socket;
    } });
    var typed_events_1 = require_typed_events();
    var uws_1 = require_uws();
    var cors_1 = __importDefault(require_lib());
    var debug = (0, debug_1.default)("socket.io:server");
    var clientVersion = require_package().version;
    var dotMapRegex = /\.map/;
    var Server2 = class _Server extends typed_events_1.StrictEventEmitter {
      constructor(srv, opts = {}) {
        super();
        this._nsps = /* @__PURE__ */ new Map();
        this.parentNsps = /* @__PURE__ */ new Map();
        this.parentNamespacesFromRegExp = /* @__PURE__ */ new Map();
        if ("object" === typeof srv && srv instanceof Object && !srv.listen) {
          opts = srv;
          srv = void 0;
        }
        this.path(opts.path || "/socket.io");
        this.connectTimeout(opts.connectTimeout || 45e3);
        this.serveClient(false !== opts.serveClient);
        this._parser = opts.parser || parser;
        this.encoder = new this._parser.Encoder();
        this.opts = opts;
        if (opts.connectionStateRecovery) {
          opts.connectionStateRecovery = Object.assign({
            maxDisconnectionDuration: 2 * 60 * 1e3,
            skipMiddlewares: true
          }, opts.connectionStateRecovery);
          this.adapter(opts.adapter || socket_io_adapter_1.SessionAwareAdapter);
        } else {
          this.adapter(opts.adapter || socket_io_adapter_1.Adapter);
        }
        opts.cleanupEmptyChildNamespaces = !!opts.cleanupEmptyChildNamespaces;
        this.sockets = this.of("/");
        if (srv || typeof srv == "number")
          this.attach(srv);
        if (this.opts.cors) {
          this._corsMiddleware = (0, cors_1.default)(this.opts.cors);
        }
      }
      get _opts() {
        return this.opts;
      }
      serveClient(v) {
        if (!arguments.length)
          return this._serveClient;
        this._serveClient = v;
        return this;
      }
      /**
       * Executes the middleware for an incoming namespace not already created on the server.
       *
       * @param name - name of incoming namespace
       * @param auth - the auth parameters
       * @param fn - callback
       *
       * @private
       */
      _checkNamespace(name, auth, fn) {
        if (this.parentNsps.size === 0)
          return fn(false);
        const keysIterator = this.parentNsps.keys();
        const run = () => {
          const nextFn = keysIterator.next();
          if (nextFn.done) {
            return fn(false);
          }
          nextFn.value(name, auth, (err, allow) => {
            if (err || !allow) {
              return run();
            }
            if (this._nsps.has(name)) {
              debug("dynamic namespace %s already exists", name);
              return fn(this._nsps.get(name));
            }
            const namespace = this.parentNsps.get(nextFn.value).createChild(name);
            debug("dynamic namespace %s was created", name);
            fn(namespace);
          });
        };
        run();
      }
      path(v) {
        if (!arguments.length)
          return this._path;
        this._path = v.replace(/\/$/, "");
        const escapedPath = this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        this.clientPathRegex = new RegExp("^" + escapedPath + "/socket\\.io(\\.msgpack|\\.esm)?(\\.min)?\\.js(\\.map)?(?:\\?|$)");
        return this;
      }
      connectTimeout(v) {
        if (v === void 0)
          return this._connectTimeout;
        this._connectTimeout = v;
        return this;
      }
      adapter(v) {
        if (!arguments.length)
          return this._adapter;
        this._adapter = v;
        for (const nsp of this._nsps.values()) {
          nsp._initAdapter();
        }
        return this;
      }
      /**
       * Attaches socket.io to a server or port.
       *
       * @param srv - server or port
       * @param opts - options passed to engine.io
       * @return self
       */
      listen(srv, opts = {}) {
        return this.attach(srv, opts);
      }
      /**
       * Attaches socket.io to a server or port.
       *
       * @param srv - server or port
       * @param opts - options passed to engine.io
       * @return self
       */
      attach(srv, opts = {}) {
        if ("function" == typeof srv) {
          const msg = "You are trying to attach socket.io to an express request handler function. Please pass a http.Server instance.";
          throw new Error(msg);
        }
        if (Number(srv) == srv) {
          srv = Number(srv);
        }
        if ("number" == typeof srv) {
          debug("creating http server and binding to %d", srv);
          const port = srv;
          srv = http.createServer((req, res) => {
            res.writeHead(404);
            res.end();
          });
          srv.listen(port);
        }
        Object.assign(opts, this.opts);
        opts.path = opts.path || this._path;
        this.initEngine(srv, opts);
        return this;
      }
      attachApp(app, opts = {}) {
        Object.assign(opts, this.opts);
        opts.path = opts.path || this._path;
        debug("creating uWebSockets.js-based engine with opts %j", opts);
        const engine = new engine_io_1.uServer(opts);
        engine.attach(app, opts);
        this.bind(engine);
        if (this._serveClient) {
          app.get(`${this._path}/*`, (res, req) => {
            if (!this.clientPathRegex.test(req.getUrl())) {
              req.setYield(true);
              return;
            }
            const filename = req.getUrl().replace(this._path, "").replace(/\?.*$/, "").replace(/^\//, "");
            const isMap = dotMapRegex.test(filename);
            const type = isMap ? "map" : "source";
            const expectedEtag = '"' + clientVersion + '"';
            const weakEtag = "W/" + expectedEtag;
            const etag = req.getHeader("if-none-match");
            if (etag) {
              if (expectedEtag === etag || weakEtag === etag) {
                debug("serve client %s 304", type);
                res.writeStatus("304 Not Modified");
                res.end();
                return;
              }
            }
            debug("serve client %s", type);
            res.writeHeader("cache-control", "public, max-age=0");
            res.writeHeader("content-type", "application/" + (isMap ? "json" : "javascript") + "; charset=utf-8");
            res.writeHeader("etag", expectedEtag);
            const filepath = path.join(__dirname, "../client-dist/", filename);
            (0, uws_1.serveFile)(res, filepath);
          });
        }
        (0, uws_1.patchAdapter)(app);
      }
      /**
       * Initialize engine
       *
       * @param srv - the server to attach to
       * @param opts - options passed to engine.io
       * @private
       */
      initEngine(srv, opts) {
        debug("creating engine.io instance with opts %j", opts);
        this.eio = (0, engine_io_1.attach)(srv, opts);
        if (this._serveClient)
          this.attachServe(srv);
        this.httpServer = srv;
        this.bind(this.eio);
      }
      /**
       * Attaches the static file serving.
       *
       * @param srv http server
       * @private
       */
      attachServe(srv) {
        debug("attaching client serving req handler");
        const evs = srv.listeners("request").slice(0);
        srv.removeAllListeners("request");
        srv.on("request", (req, res) => {
          if (this.clientPathRegex.test(req.url)) {
            if (this._corsMiddleware) {
              this._corsMiddleware(req, res, () => {
                this.serve(req, res);
              });
            } else {
              this.serve(req, res);
            }
          } else {
            for (let i = 0; i < evs.length; i++) {
              evs[i].call(srv, req, res);
            }
          }
        });
      }
      /**
       * Handles a request serving of client source and map
       *
       * @param req
       * @param res
       * @private
       */
      serve(req, res) {
        const filename = req.url.replace(this._path, "").replace(/\?.*$/, "");
        const isMap = dotMapRegex.test(filename);
        const type = isMap ? "map" : "source";
        const expectedEtag = '"' + clientVersion + '"';
        const weakEtag = "W/" + expectedEtag;
        const etag = req.headers["if-none-match"];
        if (etag) {
          if (expectedEtag === etag || weakEtag === etag) {
            debug("serve client %s 304", type);
            res.writeHead(304);
            res.end();
            return;
          }
        }
        debug("serve client %s", type);
        res.setHeader("Cache-Control", "public, max-age=0");
        res.setHeader("Content-Type", "application/" + (isMap ? "json" : "javascript") + "; charset=utf-8");
        res.setHeader("ETag", expectedEtag);
        _Server.sendFile(filename, req, res);
      }
      /**
       * @param filename
       * @param req
       * @param res
       * @private
       */
      static sendFile(filename, req, res) {
        const readStream = (0, fs_1.createReadStream)(path.join(__dirname, "../client-dist/", filename));
        const encoding = accepts(req).encodings(["br", "gzip", "deflate"]);
        const onError = (err) => {
          if (err) {
            res.end();
          }
        };
        switch (encoding) {
          case "br":
            res.writeHead(200, { "content-encoding": "br" });
            readStream.pipe((0, zlib_1.createBrotliCompress)()).pipe(res);
            (0, stream_1.pipeline)(readStream, (0, zlib_1.createBrotliCompress)(), res, onError);
            break;
          case "gzip":
            res.writeHead(200, { "content-encoding": "gzip" });
            (0, stream_1.pipeline)(readStream, (0, zlib_1.createGzip)(), res, onError);
            break;
          case "deflate":
            res.writeHead(200, { "content-encoding": "deflate" });
            (0, stream_1.pipeline)(readStream, (0, zlib_1.createDeflate)(), res, onError);
            break;
          default:
            res.writeHead(200);
            (0, stream_1.pipeline)(readStream, res, onError);
        }
      }
      /**
       * Binds socket.io to an engine.io instance.
       *
       * @param engine engine.io (or compatible) server
       * @return self
       */
      bind(engine) {
        this.engine = engine;
        this.engine.on("connection", this.onconnection.bind(this));
        return this;
      }
      /**
       * Called with each incoming transport connection.
       *
       * @param {engine.Socket} conn
       * @return self
       * @private
       */
      onconnection(conn) {
        debug("incoming connection with id %s", conn.id);
        const client = new client_1.Client(this, conn);
        if (conn.protocol === 3) {
          client.connect("/");
        }
        return this;
      }
      /**
       * Looks up a namespace.
       *
       * @example
       * // with a simple string
       * const myNamespace = io.of("/my-namespace");
       *
       * // with a regex
       * const dynamicNsp = io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {
       *   const namespace = socket.nsp; // newNamespace.name === "/dynamic-101"
       *
       *   // broadcast to all clients in the given sub-namespace
       *   namespace.emit("hello");
       * });
       *
       * @param name - nsp name
       * @param fn optional, nsp `connection` ev handler
       */
      of(name, fn) {
        if (typeof name === "function" || name instanceof RegExp) {
          const parentNsp = new parent_namespace_1.ParentNamespace(this);
          debug("initializing parent namespace %s", parentNsp.name);
          if (typeof name === "function") {
            this.parentNsps.set(name, parentNsp);
          } else {
            this.parentNsps.set((nsp2, conn, next) => next(null, name.test(nsp2)), parentNsp);
            this.parentNamespacesFromRegExp.set(name, parentNsp);
          }
          if (fn) {
            parentNsp.on("connect", fn);
          }
          return parentNsp;
        }
        if (String(name)[0] !== "/")
          name = "/" + name;
        let nsp = this._nsps.get(name);
        if (!nsp) {
          for (const [regex, parentNamespace] of this.parentNamespacesFromRegExp) {
            if (regex.test(name)) {
              debug("attaching namespace %s to parent namespace %s", name, regex);
              return parentNamespace.createChild(name);
            }
          }
          debug("initializing namespace %s", name);
          nsp = new namespace_1.Namespace(this, name);
          this._nsps.set(name, nsp);
          if (name !== "/") {
            this.sockets.emitReserved("new_namespace", nsp);
          }
        }
        if (fn)
          nsp.on("connect", fn);
        return nsp;
      }
      /**
       * Closes server connection
       *
       * @param [fn] optional, called as `fn([err])` on error OR all conns closed
       */
      close(fn) {
        for (const socket of this.sockets.sockets.values()) {
          socket._onclose("server shutting down");
        }
        this.engine.close();
        (0, uws_1.restoreAdapter)();
        if (this.httpServer) {
          this.httpServer.close(fn);
        } else {
          fn && fn();
        }
      }
      /**
       * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
       *
       * @example
       * io.use((socket, next) => {
       *   // ...
       *   next();
       * });
       *
       * @param fn - the middleware function
       */
      use(fn) {
        this.sockets.use(fn);
        return this;
      }
      /**
       * Targets a room when emitting.
       *
       * @example
       * // the “foo” event will be broadcast to all connected clients in the “room-101” room
       * io.to("room-101").emit("foo", "bar");
       *
       * // with an array of rooms (a client will be notified at most once)
       * io.to(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * io.to("room-101").to("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      to(room) {
        return this.sockets.to(room);
      }
      /**
       * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
       *
       * @example
       * // disconnect all clients in the "room-101" room
       * io.in("room-101").disconnectSockets();
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      in(room) {
        return this.sockets.in(room);
      }
      /**
       * Excludes a room when emitting.
       *
       * @example
       * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
       * io.except("room-101").emit("foo", "bar");
       *
       * // with an array of rooms
       * io.except(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * io.except("room-101").except("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      except(room) {
        return this.sockets.except(room);
      }
      /**
       * Sends a `message` event to all clients.
       *
       * This method mimics the WebSocket.send() method.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
       *
       * @example
       * io.send("hello");
       *
       * // this is equivalent to
       * io.emit("message", "hello");
       *
       * @return self
       */
      send(...args) {
        this.sockets.emit("message", ...args);
        return this;
      }
      /**
       * Sends a `message` event to all clients. Alias of {@link send}.
       *
       * @return self
       */
      write(...args) {
        this.sockets.emit("message", ...args);
        return this;
      }
      /**
       * Sends a message to the other Socket.IO servers of the cluster.
       *
       * @example
       * io.serverSideEmit("hello", "world");
       *
       * io.on("hello", (arg1) => {
       *   console.log(arg1); // prints "world"
       * });
       *
       * // acknowledgements (without binary content) are supported too:
       * io.serverSideEmit("ping", (err, responses) => {
       *  if (err) {
       *     // some servers did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per server (except the current one)
       *   }
       * });
       *
       * io.on("ping", (cb) => {
       *   cb("pong");
       * });
       *
       * @param ev - the event name
       * @param args - an array of arguments, which may include an acknowledgement callback at the end
       */
      serverSideEmit(ev, ...args) {
        return this.sockets.serverSideEmit(ev, ...args);
      }
      /**
       * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
       *
       * @example
       * try {
       *   const responses = await io.serverSideEmitWithAck("ping");
       *   console.log(responses); // one response per server (except the current one)
       * } catch (e) {
       *   // some servers did not acknowledge the event in the given delay
       * }
       *
       * @param ev - the event name
       * @param args - an array of arguments
       *
       * @return a Promise that will be fulfilled when all servers have acknowledged the event
       */
      serverSideEmitWithAck(ev, ...args) {
        return this.sockets.serverSideEmitWithAck(ev, ...args);
      }
      /**
       * Gets a list of socket ids.
       *
       * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
       * {@link Server#fetchSockets} instead.
       */
      allSockets() {
        return this.sockets.allSockets();
      }
      /**
       * Sets the compress flag.
       *
       * @example
       * io.compress(false).emit("hello");
       *
       * @param compress - if `true`, compresses the sending data
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      compress(compress) {
        return this.sockets.compress(compress);
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
       * receive messages (because of network slowness or other issues, or because they’re connected through long polling
       * and is in the middle of a request-response cycle).
       *
       * @example
       * io.volatile.emit("hello"); // the clients may or may not receive it
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get volatile() {
        return this.sockets.volatile;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
       *
       * @example
       * // the “foo” event will be broadcast to all connected clients on this node
       * io.local.emit("foo", "bar");
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get local() {
        return this.sockets.local;
      }
      /**
       * Adds a timeout in milliseconds for the next operation.
       *
       * @example
       * io.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @param timeout
       */
      timeout(timeout) {
        return this.sockets.timeout(timeout);
      }
      /**
       * Returns the matching socket instances.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // return all Socket instances
       * const sockets = await io.fetchSockets();
       *
       * // return all Socket instances in the "room1" room
       * const sockets = await io.in("room1").fetchSockets();
       *
       * for (const socket of sockets) {
       *   console.log(socket.id);
       *   console.log(socket.handshake);
       *   console.log(socket.rooms);
       *   console.log(socket.data);
       *
       *   socket.emit("hello");
       *   socket.join("room1");
       *   socket.leave("room2");
       *   socket.disconnect();
       * }
       */
      fetchSockets() {
        return this.sockets.fetchSockets();
      }
      /**
       * Makes the matching socket instances join the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       *
       * // make all socket instances join the "room1" room
       * io.socketsJoin("room1");
       *
       * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
       * io.in("room1").socketsJoin(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsJoin(room) {
        return this.sockets.socketsJoin(room);
      }
      /**
       * Makes the matching socket instances leave the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // make all socket instances leave the "room1" room
       * io.socketsLeave("room1");
       *
       * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
       * io.in("room1").socketsLeave(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsLeave(room) {
        return this.sockets.socketsLeave(room);
      }
      /**
       * Makes the matching socket instances disconnect.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
       * io.disconnectSockets();
       *
       * // make all socket instances in the "room1" room disconnect and close the underlying connections
       * io.in("room1").disconnectSockets(true);
       *
       * @param close - whether to close the underlying connection
       */
      disconnectSockets(close = false) {
        return this.sockets.disconnectSockets(close);
      }
    };
    exports2.Server = Server2;
    var emitterMethods = Object.keys(events_1.EventEmitter.prototype).filter(function(key) {
      return typeof events_1.EventEmitter.prototype[key] === "function";
    });
    emitterMethods.forEach(function(fn) {
      Server2.prototype[fn] = function() {
        return this.sockets[fn].apply(this.sockets, arguments);
      };
    });
    module2.exports = (srv, opts) => new Server2(srv, opts);
    module2.exports.Server = Server2;
    module2.exports.Namespace = namespace_1.Namespace;
    module2.exports.Socket = socket_1.Socket;
    var socket_2 = require_socket2();
  }
});

// dependencies.ts
var dependencies_exports = {};
__export(dependencies_exports, {
  Server: () => Server,
  Socket: () => Socket
});
module.exports = __toCommonJS(dependencies_exports);

// node_modules/.pnpm/socket.io@4.7.3/node_modules/socket.io/wrapper.mjs
var import_dist = __toESM(require_dist2(), 1);
var { Server, Namespace, Socket } = import_dist.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Server,
  Socket
});
/*! Bundled license information:

negotiator/index.js:
  (*!
   * negotiator
   * Copyright(c) 2012 Federico Romero
   * Copyright(c) 2012-2014 Isaac Z. Schlueter
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

accepts/index.js:
  (*!
   * accepts
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

base64id/lib/base64id.js:
  (*!
   * base64id v0.1.0
   *)

engine.io/build/parser-v3/utf8.js:
  (*! https://mths.be/utf8js v2.1.2 by @mathias *)

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

vary/index.js:
  (*!
   * vary
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
