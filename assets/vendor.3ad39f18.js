function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map2[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style: style2 } = props;
  if (klass && !isString$1(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style2) {
    props.style = normalizeStyle(style2);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_4, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate$2 = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize$1 = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize$1(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function warn$1$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1$1(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i2, l;
      for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l = this.cleanups.length; i2 < l; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$1$1(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l = this.length; i2 < l; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow$1(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$1,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size$1(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize$1(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size$1(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size$1(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow$1(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$2(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open2 = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open2, ...formatProps(vnode.props), close] : [open2 + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$2(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray$1(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  flushPreFlushCbs();
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen);
  queue.sort((a2, b2) => getId(a2) - getId(b2));
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count2 = seen.get(fn);
    if (count2 > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$2(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count2 + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
      if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
        instance.parent.ceReload(newComp.styles);
      }
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit("app:unmount", app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
const devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$2(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$2(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$2(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate$2(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate$2(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.emitsCache;
  const cached = cache2.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache2.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache2.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate$2(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
const withScopeId = (_id) => withCtx;
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render: render2, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render3 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render3.length > 1 ? render3(props, true ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render3(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i2 = 0, l = allAttrs.length; i2 < l; i2++) {
          const key = allAttrs[i2];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$2(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn$2(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn$2(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn$2(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index2 = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index2] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children2) {
  let singleRoot;
  for (let i2 = 0; i2 < children2.length; i2++) {
    const child = children2[i2];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i2 = 0; i2 < dynamicProps.length; i2++) {
        const key = dynamicProps[i2];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$2(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject$1(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$2(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$2(`inject() can only be used inside setup() or functional components.`);
  }
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
  return doWatch(effect, null, Object.assign(Object.assign({}, options), { flush: "post" }));
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$2(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush: flush2, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$2(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$2(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn$2(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow$1(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush2 === "sync") {
    scheduler = job;
  } else if (flush2 === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => queuePreFlushCb(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush2 === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children2 = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children2 || !children2.length) {
        return;
      }
      let child = children2[0];
      if (children2.length > 1) {
        let hasFound = false;
        for (const c2 of children2) {
          if (c2.type !== Comment) {
            if (hasFound) {
              warn$2("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c2;
            hasFound = true;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode: mode2 } = rawProps;
      if (mode2 && mode2 !== "in-out" && mode2 !== "out-in" && mode2 !== "default") {
        warn$2(`invalid <transition> mode: ${mode2}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode2 === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode2 === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode: mode2, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode: mode2,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children2, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i2 = 0; i2 < children2.length; i2++) {
    let child = children2[i2];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i2 = 0; i2 < ret.length; i2++) {
      ret[i2].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (!comp) {
        warn$2(`Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`);
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (comp && !isObject(comp) && !isFunction(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(err, instance, 13, !errorComponent);
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded2 = ref(false);
      const error = ref();
      const delayed = ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded2.value && !error.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded2.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded2.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, { vnode: { ref: ref2, props, children: children2, shapeFlag }, parent }) {
  const vnode = createVNode(comp, props, children2);
  vnode.ref = ref2;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn$2(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$2("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives2) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    warn$2(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i2 = 0; i2 < directives2.length; i2++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives2[i2];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i2 = 0; i2 < bindings.length; i2++) {
    const binding = bindings[i2];
    if (oldBindings) {
      binding.oldValue = oldBindings[i2].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const COMPONENTS = "components";
const DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDynamicComponent(component) {
  if (isString$1(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component, false);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize$1(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$2(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$2(`resolve${capitalize$1(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize$1(camelize(name))]);
}
function renderList(source, renderItem, cache2, index2) {
  let ret;
  const cached = cache2 && cache2[index2];
  if (isArray$1(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l = source.length; i2 < l; i2++) {
      ret[i2] = renderItem(source[i2], i2, void 0, cached && cached[i2]);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$2(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, void 0, cached && cached[i2]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, void 0, cached && cached[i2]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l = keys.length; i2 < l; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2, cached && cached[i2]);
      }
    }
  } else {
    ret = [];
  }
  if (cache2) {
    cache2[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot.length > 1) {
    warn$2(`SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`);
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i2) => i2,
  $el: (i2) => i2.vnode.el,
  $data: (i2) => i2.data,
  $props: (i2) => shallowReadonly(i2.props),
  $attrs: (i2) => shallowReadonly(i2.attrs),
  $slots: (i2) => shallowReadonly(i2.slots),
  $refs: (i2) => shallowReadonly(i2.refs),
  $parent: (i2) => getPublicInstance(i2.parent),
  $root: (i2) => getPublicInstance(i2.root),
  $emit: (i2) => i2.emit,
  $options: (i2) => resolveMergedOptions(i2),
  $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
  $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
  $watch: (i2) => instanceWatch.bind(i2)
});
const isReservedPrefix = (key) => key === "_" || key === "$";
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString$1(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$2(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$2(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$2(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$2(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$2(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$2(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache2[key]) {
      warn$2(`${type} property "${key}" is already defined in ${cache2[key]}.`);
    } else {
      cache2[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components: components2,
    directives: directives2,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$2(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$2(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$2(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn$2(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$2(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$2(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components2)
    instance.components = components2;
  if (directives2)
    instance.directives = directives2;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject$1(opt.from || key, opt.default, true);
      } else {
        injected = inject$1(opt.from || key);
      }
    } else {
      injected = inject$1(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        {
          warn$2(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$2(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$2(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$2(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache2, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache2.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions$1(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  cache2.set(base, resolved);
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions$1(to, m2, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$2(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate$2(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate$2(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.propsCache;
  const cached = cache2.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache2.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString$1(raw[i2])) {
        warn$2(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$2(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache2.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$2(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate$2(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$2('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$2(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$2('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize$1).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance) {
      warn$2(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      {
        warn$2(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children2) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn$2(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue(children2);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children2) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children2._;
    if (type) {
      instance.slots = toRaw(children2);
      def(children2, "_", type);
    } else {
      normalizeObjectSlots(children2, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children2) {
      normalizeVNodeSlots(instance, children2);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children2, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children2._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children2);
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children2);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children2.$stable;
      normalizeObjectSlots(children2, slots);
    }
    deletionComparisonTarget = children2;
  } else if (children2) {
    normalizeVNodeSlots(instance, children2);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$2(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$2(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$2(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$2(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$2("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$2(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive2) {
        {
          validateDirectiveName(name);
        }
        if (!directive2) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$2(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive2;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$2(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          {
            context.reload = () => {
              render2(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn$2(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app._container);
          {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else {
          warn$2(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$2(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r2, i2) => setRef(r2, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$2(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn$2("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn$2("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let supported$1;
let perf$1;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf$1.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf$1.mark(endTag);
    perf$1.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf$1.clearMarks(startTag);
    perf$1.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function isSupported() {
  if (supported$1 !== void 0) {
    return supported$1;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported$1 = true;
    perf$1 = window.performance;
  } else {
    supported$1 = false;
  }
  return supported$1;
}
function initFeatureFlags() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else {
          warn$2("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
        hostSetScopeId(el, slotScopeIds[i2]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i2 = start; i2 < children2.length; i2++) {
      const child = children2[i2] = optimized ? cloneIfMounted(children2[i2]) : normalizeVNode(children2[i2]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
            const key = propsToUpdate[i2];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i2 = 0; i2 < newChildren.length; i2++) {
      const oldVNode = oldChildren[i2];
      const newVNode = newChildren[i2];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (isHmrUpdating || patchFlag & 2048) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m2, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          {
            startMeasure(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m2) {
          queuePostRenderEffect(m2, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u2) {
          queuePostRenderEffect(u2, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update2),
      instance.scope
    );
    const update2 = instance.update = () => effect.run();
    update2.id = instance.uid;
    toggleRecurse(instance, true);
    {
      effect.onTrack = instance.rtc ? (e2) => invokeArrayFns(instance.rtc, e2) : void 0;
      effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns(instance.rtg, e2) : void 0;
      update2.ownerInstance = instance;
    }
    update2();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i2;
    for (i2 = 0; i2 < commonLength; i2++) {
      const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i2 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[i2];
      const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i2++;
    }
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i2 > e1) {
      if (i2 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i2 <= e2) {
          patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i2++;
        }
      }
    } else if (i2 > e2) {
      while (i2 <= e1) {
        unmount(c1[i2], parentComponent, parentSuspense, true);
        i2++;
      }
    } else {
      const s1 = i2;
      const s2 = i2;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i2 = s2; i2 <= e2; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$2(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i2);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i2 = 0; i2 < toBePatched; i2++)
        newIndexToOldIndexMap[i2] = 0;
      for (i2 = s1; i2 <= e1; i2++) {
        const prevChild = c1[i2];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s2; j2 <= e2; j2++) {
            if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i2 = toBePatched - 1; i2 >= 0; i2--) {
        const nextIndex = s2 + i2;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i2] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j2 < 0 || i2 !== increasingNewIndexSequence[j2]) {
            move(nextChild, container, anchor, 2);
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children: children2, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i2 = 0; i2 < children2.length; i2++) {
        move(children2[i2], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children: children2, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children2, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update: update2, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update2) {
      update2.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children2, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i2 = start; i2 < children2.length; i2++) {
      unmount(children2[i2], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function toggleRecurse({ effect, update: update2 }, allowed) {
  effect.allowRecurse = update2.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i2 = 0; i2 < ch1.length; i2++) {
      const c1 = ch1[i2];
      let c2 = ch2[i2];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i2, j2, u2, v2, c2;
  const len = arr.length;
  for (i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i2] = j2;
        result.push(i2);
        continue;
      }
      u2 = 0;
      v2 = result.length - 1;
      while (u2 < v2) {
        c2 = u2 + v2 >> 1;
        if (arr[result[c2]] < arrI) {
          u2 = c2 + 1;
        } else {
          v2 = c2;
        }
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) {
          p2[i2] = result[u2 - 1];
        }
        result[u2] = i2;
      }
    }
  }
  u2 = result.length;
  v2 = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v2;
    v2 = p2[v2];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children2, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children2, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children2, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children2, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...args);
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children2 = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children: children2,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children2);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children2) {
    vnode.shapeFlag |= isString$1(children2) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$2(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children2 = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$2(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children2) {
      normalizeChildren(cloned, children2);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style: style2 } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style2)) {
      if (isProxy(style2) && !isArray$1(style2)) {
        style2 = extend({}, style2);
      }
      props.style = normalizeStyle(style2);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$2(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props, children2, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children: children2 } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$1(children2) ? children2.map(deepCloneVNode) : children2,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$1(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text2 = " ", flag = 0) {
  return createVNode(Text, null, text2, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text2 = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text2)) : createVNode(Comment, null, text2);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children2) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children2 == null) {
    children2 = null;
  } else if (isArray$1(children2)) {
    type = 16;
  } else if (typeof children2 === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children2.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children2._;
      if (!slotFlag && !(InternalObjectKey in children2)) {
        children2._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children2._ = 1;
        } else {
          children2._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children2)) {
    children2 = { default: children2, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children2 = String(children2);
    if (shapeFlag & 64) {
      type = 16;
      children2 = [createTextVNode(children2)];
    } else {
      type = 8;
    }
  }
  vnode.children = children2;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$1$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config2) {
  const appIsNativeTag = config2.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$2("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children: children2 } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children2);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$2(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup: setup2 } = Component;
  if (setup2) {
    const setupContext = instance.setupContext = setup2.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup2, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e2) => {
          handleError(e2, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
          warn$2(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$2(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$2(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile$1;
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile$1 && !Component.render) {
      const template = Component.template;
      if (template) {
        {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile$1(template, finalCompilerOptions);
        {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn$2(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$2(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$2(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$2(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$2(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h$1(type, propsOrChildren, children2) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children2 = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children2)) {
      children2 = [children2];
    }
    return createVNode(type, propsOrChildren, children2);
  }
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v2, asRaw = true) {
    if (typeof v2 === "number") {
      return ["span", numberStyle, v2];
    } else if (typeof v2 === "string") {
      return ["span", stringStyle, JSON.stringify(v2)];
    } else if (typeof v2 === "boolean") {
      return ["span", keywordStyle, v2];
    } else if (isObject(v2)) {
      return ["object", { object: asRaw ? toRaw(v2) : v2 }];
    } else {
      return ["span", stringStyle, String(v2)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$1(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m2) => isKeyOfType(m2, key, type))) {
      return true;
    }
  }
  function genRefFlag(v2) {
    if (isShallow(v2)) {
      return `ShallowRef`;
    }
    if (v2.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.2.37";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text2) => doc.createTextNode(text2),
  createComment: (text2) => doc.createComment(text2),
  setText: (node, text2) => {
    node.nodeValue = text2;
  },
  setElementText: (el, text2) => {
    el.textContent = text2;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style2 = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style2, key, next[key]);
    }
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style2, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style2.display;
    if (isCssString) {
      if (prev !== next) {
        style2.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style2.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style2, name, val) {
  if (isArray$1(val)) {
    val.forEach((v2) => setStyle(style2, name, v2));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style2.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style2, name);
      if (importantRE.test(val)) {
        style2.setProperty(hyphenate$2(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style2[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style2, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style2) {
    return prefixCache[rawName] = name;
  }
  name = capitalize$1(name);
  for (let i2 = 0; i2 < prefixes.length; i2++) {
    const prefixed = prefixes[i2] + name;
    if (prefixed in style2) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
    {
      warn$2(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e2);
    }
  }
  needRemove && el.removeAttribute(key);
}
const [_getNow, skipTimestampCheck] = /* @__PURE__ */ (() => {
  let _getNow2 = Date.now;
  let skipTimestampCheck2 = false;
  if (typeof window !== "undefined") {
    if (Date.now() > document.createEvent("Event").timeStamp) {
      _getNow2 = performance.now.bind(performance);
    }
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck2 = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  return [_getNow2, skipTimestampCheck2];
})();
let cachedNow = 0;
const p$1 = /* @__PURE__ */ Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p$1.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options[m2[0].toLowerCase()] = true;
    }
  }
  return [hyphenate$2(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    const timeStamp = e2.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn && fn(e3));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
function useCssVars(getter) {
  const instance = getCurrentInstance();
  if (!instance) {
    warn$2(`useCssVars is called without current active component instance.`);
    return;
  }
  const setVars = () => setVarsOnVNode(instance.subTree, getter(instance.proxy));
  watchPostEffect(setVars);
  onMounted(() => {
    const ob = new MutationObserver(setVars);
    ob.observe(instance.subTree.el.parentNode, { childList: true });
    onUnmounted(() => ob.disconnect());
  });
}
function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128) {
    const suspense = vnode.suspense;
    vnode = suspense.activeBranch;
    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  }
  while (vnode.component) {
    vnode = vnode.component.subTree;
  }
  if (vnode.shapeFlag & 1 && vnode.el) {
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === Fragment) {
    vnode.children.forEach((c2) => setVarsOnVNode(c2, vars));
  } else if (vnode.type === Static) {
    let { el, anchor } = vnode;
    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor)
        break;
      el = el.nextSibling;
    }
  }
}
function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    const style2 = el.style;
    for (const key in vars) {
      style2.setProperty(`--${key}`, vars[key]);
    }
  }
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h$1(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame$1(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame$1(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n2 = NumberOf(duration);
    return [n2, n2];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  validateDuration(res);
  return res;
}
function validateDuration(val) {
  if (typeof val !== "number") {
    warn$2(`<transition> explicit duration is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$2(`<transition> explicit duration is NaN - the duration expression might be incorrect.`);
  }
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame$1(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e2) => {
    if (e2.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d2, i2) => toMs(d2) + toMs(delays[i2])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e2) {
  e2.target.composing = true;
}
function onCompositionEnd(e2) {
  const target = e2.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e2) => {
      if (e2.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e2) => e2.stopPropagation(),
  prevent: (e2) => e2.preventDefault(),
  self: (e2) => e2.target !== e2.currentTarget,
  ctrl: (e2) => !e2.ctrlKey,
  shift: (e2) => !e2.shiftKey,
  alt: (e2) => !e2.altKey,
  meta: (e2) => !e2.metaKey,
  left: (e2) => "button" in e2 && e2.button !== 0,
  middle: (e2) => "button" in e2 && e2.button !== 1,
  right: (e2) => "button" in e2 && e2.button !== 2,
  exact: (e2, modifiers) => systemModifiers.some((m2) => e2[`${m2}Key`] && !modifiers.includes(m2))
};
const withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i2 = 0; i2 < modifiers.length; i2++) {
      const guard = modifierGuards[modifiers[i2]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  };
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate$2(event.key);
    if (modifiers.some((k2) => k2 === eventKey || keyNames[k2] === eventKey)) {
      return fn(event);
    }
  };
};
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$2(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn$2(msg);
        return compilerOptions;
      },
      set() {
        warn$2(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn$2(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$2(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
}
function initDev() {
  {
    initCustomFormatter();
  }
}
{
  initDev();
}
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a2;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
    supported = true;
    perf = global.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin2, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin2;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin2.settings) {
      for (const id in plugin2.settings) {
        const item = plugin2.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin2.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e2) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e2) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve2) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: resolve2
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy)
      setupFn(proxy.proxiedTarget);
  }
}
/*!
  * pinia v2.0.18
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const _global$1 = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
function bom(blob, { autoBom = false } = {}) {
  if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
  }
  return blob;
}
function download(url, name, opts) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.onload = function() {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function() {
    console.error("could not download file");
  };
  xhr.send();
}
function corsEnabled(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, false);
  try {
    xhr.send();
  } catch (e2) {
  }
  return xhr.status >= 200 && xhr.status <= 299;
}
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e2) {
    const evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
  }
}
const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
const saveAs = !IS_CLIENT ? () => {
} : typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : "msSaveOrOpenBlob" in _navigator ? msSaveAs : fileSaverSaveAs;
function downloadSaveAs(blob, name = "download", opts) {
  const a2 = document.createElement("a");
  a2.download = name;
  a2.rel = "noopener";
  if (typeof blob === "string") {
    a2.href = blob;
    if (a2.origin !== location.origin) {
      if (corsEnabled(a2.href)) {
        download(blob, name, opts);
      } else {
        a2.target = "_blank";
        click(a2);
      }
    } else {
      click(a2);
    }
  } else {
    a2.href = URL.createObjectURL(blob);
    setTimeout(function() {
      URL.revokeObjectURL(a2.href);
    }, 4e4);
    setTimeout(function() {
      click(a2);
    }, 0);
  }
}
function msSaveAs(blob, name = "download", opts) {
  if (typeof blob === "string") {
    if (corsEnabled(blob)) {
      download(blob, name, opts);
    } else {
      const a2 = document.createElement("a");
      a2.href = blob;
      a2.target = "_blank";
      setTimeout(function() {
        click(a2);
      });
    }
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name);
  }
}
function fileSaverSaveAs(blob, name, opts, popup) {
  popup = popup || open("", "_blank");
  if (popup) {
    popup.document.title = popup.document.body.innerText = "downloading...";
  }
  if (typeof blob === "string")
    return download(blob, name, opts);
  const force = blob.type === "application/octet-stream";
  const isSafari = /constructor/i.test(String(_global$1.HTMLElement)) || "safari" in _global$1;
  const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
    const reader = new FileReader();
    reader.onloadend = function() {
      let url = reader.result;
      if (typeof url !== "string") {
        popup = null;
        throw new Error("Wrong reader.result type");
      }
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
      if (popup) {
        popup.location.href = url;
      } else {
        location.assign(url);
      }
      popup = null;
    };
    reader.readAsDataURL(blob);
  } else {
    const url = URL.createObjectURL(blob);
    if (popup)
      popup.location.assign(url);
    else
      location.href = url;
    popup = null;
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 4e4);
  }
}
function toastMessage(message, type) {
  const piniaMessage = "\u{1F34D} " + message;
  if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
    __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
  } else if (type === "error") {
    console.error(piniaMessage);
  } else if (type === "warn") {
    console.warn(piniaMessage);
  } else {
    console.log(piniaMessage);
  }
}
function isPinia(o) {
  return "_a" in o && "install" in o;
}
function checkClipboardAccess() {
  if (!("clipboard" in navigator)) {
    toastMessage(`Your browser doesn't support the Clipboard API`, "error");
    return true;
  }
}
function checkNotFocusedError(error) {
  if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
    toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
    return true;
  }
  return false;
}
async function actionGlobalCopyState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
    toastMessage("Global state copied to clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalPasteState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    pinia.state.value = JSON.parse(await navigator.clipboard.readText());
    toastMessage("Global state pasted from clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalSaveState(pinia) {
  try {
    saveAs(new Blob([JSON.stringify(pinia.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (error) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
let fileInput;
function getFileOpener() {
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
  }
  function openFile() {
    return new Promise((resolve2, reject) => {
      fileInput.onchange = async () => {
        const files = fileInput.files;
        if (!files)
          return resolve2(null);
        const file = files.item(0);
        if (!file)
          return resolve2(null);
        return resolve2({ text: await file.text(), file });
      };
      fileInput.oncancel = () => resolve2(null);
      fileInput.onerror = reject;
      fileInput.click();
    });
  }
  return openFile;
}
async function actionGlobalOpenStateFile(pinia) {
  try {
    const open2 = await getFileOpener();
    const result = await open2();
    if (!result)
      return;
    const { text: text2, file } = result;
    pinia.state.value = JSON.parse(text2);
    toastMessage(`Global state imported from "${file.name}".`);
  } catch (error) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
function formatDisplay$1(display2) {
  return {
    _custom: {
      display: display2
    }
  };
}
const PINIA_ROOT_LABEL = "\u{1F34D} Pinia (root)";
const PINIA_ROOT_ID = "_root";
function formatStoreForInspectorTree(store) {
  return isPinia(store) ? {
    id: PINIA_ROOT_ID,
    label: PINIA_ROOT_LABEL
  } : {
    id: store.$id,
    label: store.$id
  };
}
function formatStoreForInspectorState(store) {
  if (isPinia(store)) {
    const storeNames = Array.from(store._s.keys());
    const storeMap = store._s;
    const state2 = {
      state: storeNames.map((storeId) => ({
        editable: true,
        key: storeId,
        value: store.state.value[storeId]
      })),
      getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
        const store2 = storeMap.get(id);
        return {
          editable: false,
          key: id,
          value: store2._getters.reduce((getters, key) => {
            getters[key] = store2[key];
            return getters;
          }, {})
        };
      })
    };
    return state2;
  }
  const state = {
    state: Object.keys(store.$state).map((key) => ({
      editable: true,
      key,
      value: store.$state[key]
    }))
  };
  if (store._getters && store._getters.length) {
    state.getters = store._getters.map((getterName) => ({
      editable: false,
      key: getterName,
      value: store[getterName]
    }));
  }
  if (store._customProperties.size) {
    state.customProperties = Array.from(store._customProperties).map((key) => ({
      editable: true,
      key,
      value: store[key]
    }));
  }
  return state;
}
function formatEventData(events) {
  if (!events)
    return {};
  if (Array.isArray(events)) {
    return events.reduce((data, event) => {
      data.keys.push(event.key);
      data.operations.push(event.type);
      data.oldValue[event.key] = event.oldValue;
      data.newValue[event.key] = event.newValue;
      return data;
    }, {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    });
  } else {
    return {
      operation: formatDisplay$1(events.type),
      key: formatDisplay$1(events.key),
      oldValue: events.oldValue,
      newValue: events.newValue
    };
  }
}
function formatMutationType(type) {
  switch (type) {
    case MutationType.direct:
      return "mutation";
    case MutationType.patchFunction:
      return "$patch";
    case MutationType.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let isTimelineActive = true;
const componentStateTypes = [];
const MUTATIONS_LAYER_ID = "pinia:mutations";
const INSPECTOR_ID = "pinia";
const getStoreType = (id) => "\u{1F34D} " + id;
function registerPiniaDevtools(app, pinia) {
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia \u{1F34D}",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.addTimelineLayer({
      id: MUTATIONS_LAYER_ID,
      label: `Pinia \u{1F34D}`,
      color: 15064968
    });
    api.addInspector({
      id: INSPECTOR_ID,
      label: "Pinia \u{1F34D}",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            actionGlobalCopyState(pinia);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await actionGlobalPasteState(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            actionGlobalSaveState(pinia);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await actionGlobalOpenStateFile(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: "Reset the state (option store only)",
          action: (nodeId) => {
            const store = pinia._s.get(nodeId);
            if (!store) {
              toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
            } else if (!store._isOptionsAPI) {
              toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
            } else {
              store.$reset();
              toastMessage(`Store "${nodeId}" reset.`);
            }
          }
        }
      ]
    });
    api.on.inspectComponent((payload, ctx) => {
      const proxy = payload.componentInstance && payload.componentInstance.proxy;
      if (proxy && proxy._pStores) {
        const piniaStores = payload.componentInstance.proxy._pStores;
        Object.values(piniaStores).forEach((store) => {
          payload.instanceData.state.push({
            type: getStoreType(store.$id),
            key: "state",
            editable: true,
            value: store._isOptionsAPI ? {
              _custom: {
                value: toRaw(store.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => store.$reset()
                  }
                ]
              }
            } : Object.keys(store.$state).reduce((state, key) => {
              state[key] = store.$state[key];
              return state;
            }, {})
          });
          if (store._getters && store._getters.length) {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "getters",
              editable: false,
              value: store._getters.reduce((getters, key) => {
                try {
                  getters[key] = store[key];
                } catch (error) {
                  getters[key] = error;
                }
                return getters;
              }, {})
            });
          }
        });
      }
    });
    api.on.getInspectorTree((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        let stores = [pinia];
        stores = stores.concat(Array.from(pinia._s.values()));
        payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return;
        }
        if (inspectedStore) {
          payload.state = formatStoreForInspectorState(inspectedStore);
        }
      }
    });
    api.on.editInspectorState((payload, ctx) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return toastMessage(`store "${payload.nodeId}" not found`, "error");
        }
        const { path } = payload;
        if (!isPinia(inspectedStore)) {
          if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
            path.unshift("$state");
          }
        } else {
          path.unshift("state");
        }
        isTimelineActive = false;
        payload.set(inspectedStore, path, payload.state.value);
        isTimelineActive = true;
      }
    });
    api.on.editComponentState((payload) => {
      if (payload.type.startsWith("\u{1F34D}")) {
        const storeId = payload.type.replace(/^🍍\s*/, "");
        const store = pinia._s.get(storeId);
        if (!store) {
          return toastMessage(`store "${storeId}" not found`, "error");
        }
        const { path } = payload;
        if (path[0] !== "state") {
          return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
        }
        path[0] = "$state";
        isTimelineActive = false;
        payload.set(store, path, payload.state.value);
        isTimelineActive = true;
      }
    });
  });
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia \u{1F34D}",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: true
      }
    }
  }, (api) => {
    const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
    store.$onAction(({ after, onError, name, args }) => {
      const groupId = runningActionId++;
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now2(),
          title: "\u{1F6EB} " + name,
          subtitle: "start",
          data: {
            store: formatDisplay$1(store.$id),
            action: formatDisplay$1(name),
            args
          },
          groupId
        }
      });
      after((result) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F6EC} " + name,
            subtitle: "end",
            data: {
              store: formatDisplay$1(store.$id),
              action: formatDisplay$1(name),
              args,
              result
            },
            groupId
          }
        });
      });
      onError((error) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            logType: "error",
            title: "\u{1F4A5} " + name,
            subtitle: "end",
            data: {
              store: formatDisplay$1(store.$id),
              action: formatDisplay$1(name),
              args,
              error
            },
            groupId
          }
        });
      });
    }, true);
    store._customProperties.forEach((name) => {
      watch(() => unref(store[name]), (newValue, oldValue) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (isTimelineActive) {
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "Change",
              subtitle: name,
              data: {
                newValue,
                oldValue
              },
              groupId: activeAction
            }
          });
        }
      }, { deep: true });
    });
    store.$subscribe(({ events, type }, state) => {
      api.notifyComponentUpdate();
      api.sendInspectorState(INSPECTOR_ID);
      if (!isTimelineActive)
        return;
      const eventData = {
        time: now2(),
        title: formatMutationType(type),
        data: {
          store: formatDisplay$1(store.$id),
          ...formatEventData(events)
        },
        groupId: activeAction
      };
      activeAction = void 0;
      if (type === MutationType.patchFunction) {
        eventData.subtitle = "\u2935\uFE0F";
      } else if (type === MutationType.patchObject) {
        eventData.subtitle = "\u{1F9E9}";
      } else if (events && !Array.isArray(events)) {
        eventData.subtitle = events.type;
      }
      if (events) {
        eventData.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: events
          }
        };
      }
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: eventData
      });
    }, { detached: true, flush: "sync" });
    const hotUpdate = store._hotUpdate;
    store._hotUpdate = markRaw((newStore) => {
      hotUpdate(newStore);
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now2(),
          title: "\u{1F525} " + store.$id,
          subtitle: "HMR update",
          data: {
            store: formatDisplay$1(store.$id),
            info: formatDisplay$1(`HMR update`)
          }
        }
      });
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
    });
    const { $dispose } = store;
    store.$dispose = () => {
      $dispose();
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store \u{1F5D1}`);
    };
    api.notifyComponentUpdate();
    api.sendInspectorTree(INSPECTOR_ID);
    api.sendInspectorState(INSPECTOR_ID);
    api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed \u{1F195}`);
  });
}
let runningActionId = 0;
let activeAction;
function patchActionForGrouping(store, actionNames) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const _actionId = runningActionId;
      const trackedStore = new Proxy(store, {
        get(...args) {
          activeAction = _actionId;
          return Reflect.get(...args);
        },
        set(...args) {
          activeAction = _actionId;
          return Reflect.set(...args);
        }
      });
      return actions[actionName].apply(trackedStore, arguments);
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  if (options.state) {
    store._isOptionsAPI = true;
  }
  if (typeof options.state === "function") {
    patchActionForGrouping(
      store,
      Object.keys(options.actions)
    );
    const originalHotUpdate = store._hotUpdate;
    toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
    };
  }
  addStoreToDevtools(
    app,
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      if (!isVue2) {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        if (IS_CLIENT) {
          registerPiniaDevtools(app, pinia);
        }
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (IS_CLIENT && true && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop$4 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$4) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$3 } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup2() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? toRefs(ref(state ? state() : {}).value) : toRefs(pinia.state.value[id]);
    return assign$3(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[\u{1F34D}]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup2, options, pinia, hot, true);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$3($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup2, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$3({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = () => {
    throw new Error(`\u{1F34D}: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
  };
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$3({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign$3(
    IS_CLIENT ? {
      _customProperties: markRaw(/* @__PURE__ */ new Set()),
      _hmrPayload
    } : {},
    partialStore
  ));
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup2());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign$3(store, setupStore);
    assign$3(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign$3($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? computed(() => {
          setActivePinia(pinia);
          return getter.call(store, store);
        }) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
    const nonEnumerable = {
      writable: true,
      configurable: true,
      enumerable: false
    };
    if (IS_CLIENT) {
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, {
          value: store[p2],
          ...nonEnumerable
        });
      });
    }
  }
  pinia._p.forEach((extender) => {
    if (IS_CLIENT) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign$3(store, extensions);
    } else {
      assign$3(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup2, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup2 === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup2;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance2 = getCurrentInstance();
    pinia = pinia || currentInstance2 && inject$1(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[\u{1F34D}]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup2, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup2, options, pinia, true) : createOptionsStore(hotId, assign$3({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT && currentInstance2 && currentInstance2.proxy && !hot) {
      const vm = currentInstance2.proxy;
      const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
      cache2[id] = store;
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getBasePlacement(placement)) ? "x" : "y";
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function computeCoordsFromPlacement(_ref) {
  let {
    reference,
    floating,
    placement
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  let coords;
  switch (getBasePlacement(placement)) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] = coords[mainAxis] - (reference[length] / 2 - floating[length] / 2);
      break;
    case "end":
      coords[mainAxis] = coords[mainAxis] + (reference[length] / 2 - floating[length] / 2);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  {
    if (platform2 == null) {
      console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" "));
    }
    if (middleware.filter((_ref) => {
      let {
        name
      } = _ref;
      return name === "autoPlacement" || name === "flip";
    }).length > 1) {
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement`", "middleware detected. This will lead to an infinite loop. Ensure only", "one of either has been passed to the `middleware` array."].join(" "));
    }
  }
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y2
  } = computeCoordsFromPlacement({
    ...rects,
    placement
  });
  let statefulPlacement = placement;
  let middlewareData = {};
  let _debug_loop_count_ = 0;
  for (let i2 = 0; i2 < middleware.length; i2++) {
    {
      _debug_loop_count_++;
      if (_debug_loop_count_ > 100) {
        throw new Error(["Floating UI: The middleware lifecycle appears to be", "running in an infinite loop. This is usually caused by a `reset`", "continually being returned without a break condition."].join(" "));
      }
    }
    const {
      name,
      fn
    } = middleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset: reset2
    } = await fn({
      x: x2,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: data != null ? data : {}
    };
    if (reset2) {
      if (typeof reset2 === "object") {
        if (reset2.placement) {
          statefulPlacement = reset2.placement;
        }
        if (reset2.rects) {
          rects = reset2.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset2.rects;
        }
        ({
          x: x2,
          y: y2
        } = computeCoordsFromPlacement({
          ...rects,
          placement: statefulPlacement
        }));
      }
      i2 = -1;
      continue;
    }
  }
  return {
    x: x2,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function expandPaddingObject(padding2) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding2
  };
}
function getSideObjectFromPadding(padding2) {
  return typeof padding2 !== "number" ? expandPaddingObject(padding2) : {
    top: padding2,
    right: padding2,
    bottom: padding2,
    left: padding2
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(middlewareArguments, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = "clippingParents",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding: padding2 = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding2);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element2 = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = await platform2.getClippingClientRect({
    element: await platform2.isElement(element2) ? element2 : element2.contextElement || await platform2.getDocumentElement({
      element: elements.floating
    }),
    boundary,
    rootBoundary
  });
  const elementClientRect = rectToClientRect(await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: elementContext === "floating" ? {
      ...rects.floating,
      x: x2,
      y: y2
    } : rects.reference,
    offsetParent: await platform2.getOffsetParent({
      element: elements.floating
    }),
    strategy
  }));
  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
}
const min$1 = Math.min;
const max$1 = Math.max;
function within(min$1$1, value, max$1$1) {
  return max$1(min$1$1, min$1(value, max$1$1));
}
const arrow = (options) => ({
  name: "arrow",
  options,
  async fn(middlewareArguments) {
    const {
      element: element2,
      padding: padding2 = 0
    } = options != null ? options : {};
    const {
      x: x2,
      y: y2,
      placement,
      rects,
      platform: platform2
    } = middlewareArguments;
    if (element2 == null) {
      {
        console.warn("Floating UI: No `element` was passed to the `arrow` middleware.");
      }
      return {};
    }
    const paddingObject = getSideObjectFromPadding(padding2);
    const coords = {
      x: x2,
      y: y2
    };
    const basePlacement = getBasePlacement(placement);
    const axis = getMainAxisFromPlacement(basePlacement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform2.getDimensions({
      element: element2
    });
    const minProp = axis === "y" ? "top" : "left";
    const maxProp = axis === "y" ? "bottom" : "right";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await platform2.getOffsetParent({
      element: element2
    });
    const clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    const centerToReference = endDiff / 2 - startDiff / 2;
    const min2 = paddingObject[minProp];
    const max2 = clientSize - arrowDimensions[length] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = within(min2, center, max2);
    return {
      data: {
        [axis]: offset2,
        centerOffset: center - offset2
      }
    };
  }
});
const hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (matched) => hash$1[matched]);
}
function getAlignmentSides(placement, rects) {
  const isStart = getAlignment(placement) === "start";
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? isStart ? "right" : "left" : isStart ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
const hash = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (matched) => hash[matched]);
}
const basePlacements = ["top", "right", "bottom", "left"];
const allPlacements = /* @__PURE__ */ basePlacements.reduce((acc, basePlacement) => acc.concat(basePlacement, basePlacement + "-start", basePlacement + "-end"), []);
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getBasePlacement(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
const autoPlacement = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$autoP, _middlewareData$autoP2, _middlewareData$autoP3, _middlewareData$autoP4, _middlewareData$autoP5, _placementsSortedByLe;
      const {
        x: x2,
        y: y2,
        rects,
        middlewareData,
        placement
      } = middlewareArguments;
      const {
        alignment = null,
        allowedPlacements = allPlacements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = options;
      if ((_middlewareData$autoP = middlewareData.autoPlacement) != null && _middlewareData$autoP.skip) {
        return {};
      }
      const placements2 = getPlacementList(alignment, autoAlignment, allowedPlacements);
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const currentIndex = (_middlewareData$autoP2 = (_middlewareData$autoP3 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP3.index) != null ? _middlewareData$autoP2 : 0;
      const currentPlacement = placements2[currentIndex];
      const {
        main: main2,
        cross
      } = getAlignmentSides(currentPlacement, rects);
      if (placement !== currentPlacement) {
        return {
          x: x2,
          y: y2,
          reset: {
            placement: placements2[0]
          }
        };
      }
      const currentOverflows = [overflow[getBasePlacement(currentPlacement)], overflow[main2], overflow[cross]];
      const allOverflows = [...(_middlewareData$autoP4 = (_middlewareData$autoP5 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP5.overflows) != null ? _middlewareData$autoP4 : [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements2[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByLeastOverflow = allOverflows.slice().sort((a2, b2) => a2.overflows[0] - b2.overflows[0]);
      const placementThatFitsOnAllSides = (_placementsSortedByLe = placementsSortedByLeastOverflow.find((_ref) => {
        let {
          overflows
        } = _ref;
        return overflows.every((overflow2) => overflow2 <= 0);
      })) == null ? void 0 : _placementsSortedByLe.placement;
      return {
        data: {
          skip: true
        },
        reset: {
          placement: placementThatFitsOnAllSides != null ? placementThatFitsOnAllSides : placementsSortedByLeastOverflow[0].placement
        }
      };
    }
  };
};
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
const flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$flip, _middlewareData$flip2;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement
      } = middlewareArguments;
      if ((_middlewareData$flip = middlewareData.flip) != null && _middlewareData$flip.skip) {
        return {};
      }
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const basePlacement = getBasePlacement(placement);
      const isBasePlacement = basePlacement === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[basePlacement]);
      }
      if (checkCrossAxis) {
        const {
          main: main2,
          cross
        } = getAlignmentSides(placement, rects);
        overflows.push(overflow[main2], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side) => side <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip3;
        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip3 = middlewareData.flip) == null ? void 0 : _middlewareData$flip3.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = "bottom";
        switch (fallbackStrategy) {
          case "bestFit": {
            var _overflowsData$slice$;
            const placement2 = (_overflowsData$slice$ = overflowsData.slice().sort((a2, b2) => a2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0) - b2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0))[0]) == null ? void 0 : _overflowsData$slice$.placement;
            if (placement2) {
              resetPlacement = placement2;
            }
            break;
          }
          case "initialPlacement":
            resetPlacement = initialPlacement;
            break;
        }
        return {
          data: {
            skip: true
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
function convertValueToCoords(_ref) {
  let {
    placement,
    rects,
    value
  } = _ref;
  const basePlacement = getBasePlacement(placement);
  const multiplier = ["left", "top"].includes(basePlacement) ? -1 : 1;
  const rawValue = typeof value === "function" ? value({
    ...rects,
    placement
  }) : value;
  const {
    mainAxis,
    crossAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0
  } : {
    mainAxis: 0,
    crossAxis: 0,
    ...rawValue
  };
  return getMainAxisFromPlacement(basePlacement) === "x" ? {
    x: crossAxis,
    y: mainAxis * multiplier
  } : {
    x: mainAxis * multiplier,
    y: crossAxis
  };
}
const offset = function(value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: "offset",
    options: value,
    fn(middlewareArguments) {
      const {
        x: x2,
        y: y2,
        placement,
        rects
      } = middlewareArguments;
      const diffCoords = convertValueToCoords({
        placement,
        rects,
        value
      });
      return {
        x: x2 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function getCrossAxis(axis) {
  return axis === "x" ? "y" : "x";
}
const shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(middlewareArguments) {
      const {
        x: x2,
        y: y2,
        placement
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x3,
              y: y3
            } = _ref;
            return {
              x: x3,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = options;
      const coords = {
        x: x2,
        y: y2
      };
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getBasePlacement(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...middlewareArguments,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y2
        }
      };
    }
  };
};
const size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$size;
      const {
        placement,
        rects,
        middlewareData
      } = middlewareArguments;
      const {
        apply: apply2,
        ...detectOverflowOptions
      } = options;
      if ((_middlewareData$size = middlewareData.size) != null && _middlewareData$size.skip) {
        return {};
      }
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const basePlacement = getBasePlacement(placement);
      const isEnd = getAlignment(placement) === "end";
      let heightSide;
      let widthSide;
      if (basePlacement === "top" || basePlacement === "bottom") {
        heightSide = basePlacement;
        widthSide = isEnd ? "left" : "right";
      } else {
        widthSide = basePlacement;
        heightSide = isEnd ? "top" : "bottom";
      }
      const xMin = max$1(overflow.left, 0);
      const xMax = max$1(overflow.right, 0);
      const yMin = max$1(overflow.top, 0);
      const yMax = max$1(overflow.bottom, 0);
      const dimensions = {
        height: rects.floating.height - (["left", "right"].includes(placement) ? 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max$1(overflow.top, overflow.bottom)) : overflow[heightSide]),
        width: rects.floating.width - (["top", "bottom"].includes(placement) ? 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max$1(overflow.left, overflow.right)) : overflow[widthSide])
      };
      apply2 == null ? void 0 : apply2({
        ...dimensions,
        ...rects
      });
      return {
        data: {
          skip: true
        },
        reset: {
          rects: true
        }
      };
    }
  };
};
function isWindow(value) {
  return (value == null ? void 0 : value.toString()) === "[object Window]";
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function getComputedStyle$1(element2) {
  return getWindow(element2).getComputedStyle(element2);
}
function getNodeName(node) {
  return isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";
}
function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isScrollParent(element2) {
  const {
    overflow,
    overflowX,
    overflowY
  } = getComputedStyle$1(element2);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isTableElement(element2) {
  return ["table", "td", "th"].includes(getNodeName(element2));
}
function isContainingBlock(element2) {
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  const css = getComputedStyle$1(element2);
  return css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].includes(css.willChange) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false);
}
const min = Math.min;
const max = Math.max;
const round = Math.round;
function getBoundingClientRect(element2, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  const clientRect = element2.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;
  if (includeScale && isHTMLElement(element2)) {
    scaleX = element2.offsetWidth > 0 ? round(clientRect.width) / element2.offsetWidth || 1 : 1;
    scaleY = element2.offsetHeight > 0 ? round(clientRect.height) / element2.offsetHeight || 1 : 1;
  }
  return {
    width: clientRect.width / scaleX,
    height: clientRect.height / scaleY,
    top: clientRect.top / scaleY,
    right: clientRect.right / scaleX,
    bottom: clientRect.bottom / scaleY,
    left: clientRect.left / scaleX,
    x: clientRect.left / scaleX,
    y: clientRect.top / scaleY
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element2) {
  if (isWindow(element2)) {
    return {
      scrollLeft: element2.pageXOffset,
      scrollTop: element2.pageYOffset
    };
  }
  return {
    scrollLeft: element2.scrollLeft,
    scrollTop: element2.scrollTop
  };
}
function getWindowScrollBarX(element2) {
  return getBoundingClientRect(getDocumentElement(element2)).left + getNodeScroll(element2).scrollLeft;
}
function isScaled(element2) {
  const rect = getBoundingClientRect(element2);
  return round(rect.width) !== element2.offsetWidth || round(rect.height) !== element2.offsetHeight;
}
function getRectRelativeToOffsetParent(element2, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element2, isOffsetParentAnElement && isScaled(offsetParent));
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  return node.assignedSlot || node.parentNode || (isShadowRoot(node) ? node.host : null) || getDocumentElement(node);
}
function getTrueOffsetParent(element2) {
  if (!isHTMLElement(element2) || getComputedStyle(element2).position === "fixed") {
    return null;
  }
  return element2.offsetParent;
}
function getContainingBlock(element2) {
  let currentNode = getParentNode(element2);
  while (isHTMLElement(currentNode) && !["html", "body"].includes(getNodeName(currentNode))) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element2) {
  const window2 = getWindow(element2);
  let offsetParent = getTrueOffsetParent(element2);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element2) || window2;
}
function getDimensions(element2) {
  return {
    width: element2.offsetWidth,
    height: element2.offsetHeight
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    ...rect,
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  };
}
function getViewportRect(element2) {
  const win = getWindow(element2);
  const html = getDocumentElement(element2);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) < 0.01) {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getDocumentRect(element2) {
  var _element$ownerDocumen;
  const html = getDocumentElement(element2);
  const scroll = getNodeScroll(element2);
  const body = (_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element2);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getScrollParent(node) {
  if (["html", "body", "#document"].includes(getNodeName(node))) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function getScrollParents(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollParent = getScrollParent(node);
  const isBody = scrollParent === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollParent);
  const target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  const updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(getScrollParents(getParentNode(target)));
}
function contains(parent, child) {
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    do {
      if (next && parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getInnerBoundingClientRect(element2) {
  const clientRect = getBoundingClientRect(element2);
  const top = clientRect.top + element2.clientTop;
  const left = clientRect.left + element2.clientLeft;
  return {
    top,
    left,
    x: left,
    y: top,
    right: left + element2.clientWidth,
    bottom: top + element2.clientHeight,
    width: element2.clientWidth,
    height: element2.clientHeight
  };
}
function getClientRectFromClippingParent(element2, clippingParent) {
  if (clippingParent === "viewport") {
    return rectToClientRect(getViewportRect(element2));
  }
  if (isElement(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent);
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element2)));
}
function getClippingParents(element2) {
  const clippingParents = getScrollParents(getParentNode(element2));
  const canEscapeClipping = ["absolute", "fixed"].includes(getComputedStyle$1(element2).position);
  const clipperElement = canEscapeClipping && isHTMLElement(element2) ? getOffsetParent(element2) : element2;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents.filter((clippingParent) => isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body");
}
function getClippingClientRect(_ref) {
  let {
    element: element2,
    boundary,
    rootBoundary
  } = _ref;
  const mainClippingParents = boundary === "clippingParents" ? getClippingParents(element2) : [].concat(boundary);
  const clippingParents = [...mainClippingParents, rootBoundary];
  const firstClippingParent = clippingParents[0];
  const clippingRect = clippingParents.reduce((accRect, clippingParent) => {
    const rect = getClientRectFromClippingParent(element2, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingParent(element2, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
const platform = {
  getElementRects: (_ref) => {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: {
        ...getDimensions(floating),
        x: 0,
        y: 0
      }
    };
  },
  convertOffsetParentRelativeRectToViewportRelativeRect: (args) => convertOffsetParentRelativeRectToViewportRelativeRect(args),
  getOffsetParent: (_ref2) => {
    let {
      element: element2
    } = _ref2;
    return getOffsetParent(element2);
  },
  isElement: (value) => isElement(value),
  getDocumentElement: (_ref3) => {
    let {
      element: element2
    } = _ref3;
    return getDocumentElement(element2);
  },
  getClippingClientRect: (args) => getClippingClientRect(args),
  getDimensions: (_ref4) => {
    let {
      element: element2
    } = _ref4;
    return getDimensions(element2);
  },
  getClientRects: (_ref5) => {
    let {
      element: element2
    } = _ref5;
    return element2.getClientRects();
  }
};
const computePosition = (reference, floating, options) => computePosition$1(reference, floating, {
  platform,
  ...options
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
function assign$2(to, from) {
  for (const key in from) {
    if (Object.prototype.hasOwnProperty.call(from, key)) {
      if (typeof from[key] === "object" && to[key]) {
        assign$2(to[key], from[key]);
      } else {
        to[key] = from[key];
      }
    }
  }
}
const config$1 = {
  disabled: false,
  distance: 5,
  skidding: 0,
  container: "body",
  boundary: void 0,
  instantMove: false,
  disposeTimeout: 5e3,
  popperTriggers: [],
  strategy: "absolute",
  preventOverflow: true,
  flip: true,
  shift: true,
  overflowPadding: 0,
  arrowPadding: 0,
  arrowOverflow: true,
  themes: {
    tooltip: {
      placement: "top",
      triggers: ["hover", "focus", "touch"],
      hideTriggers: (events) => [...events, "click"],
      delay: {
        show: 200,
        hide: 0
      },
      handleResize: false,
      html: false,
      loadingContent: "..."
    },
    dropdown: {
      placement: "bottom",
      triggers: ["click"],
      delay: 0,
      handleResize: true,
      autoHide: true
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover", "focus"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function getDefaultConfig(theme, key) {
  let themeConfig = config$1.themes[theme] || {};
  let value;
  do {
    value = themeConfig[key];
    if (typeof value === "undefined") {
      if (themeConfig.$extend) {
        themeConfig = config$1.themes[themeConfig.$extend] || {};
      } else {
        themeConfig = null;
        value = config$1[key];
      }
    } else {
      themeConfig = null;
    }
  } while (themeConfig);
  return value;
}
function getThemeClasses(theme) {
  const result = [theme];
  let themeConfig = config$1.themes[theme] || {};
  do {
    if (themeConfig.$extend && !themeConfig.$resetCss) {
      result.push(themeConfig.$extend);
      themeConfig = config$1.themes[themeConfig.$extend] || {};
    } else {
      themeConfig = null;
    }
  } while (themeConfig);
  return result.map((c2) => `v-popper--theme-${c2}`);
}
function getAllParentThemes(theme) {
  const result = [theme];
  let themeConfig = config$1.themes[theme] || {};
  do {
    if (themeConfig.$extend) {
      result.push(themeConfig.$extend);
      themeConfig = config$1.themes[themeConfig.$extend] || {};
    } else {
      themeConfig = null;
    }
  } while (themeConfig);
  return result;
}
let supportsPassive = false;
if (typeof window !== "undefined") {
  supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, "passive", {
      get() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test", null, opts);
  } catch (e2) {
  }
}
let isIOS = false;
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
const placements = ["auto", "top", "bottom", "left", "right"].reduce((acc, base) => acc.concat([
  base,
  `${base}-start`,
  `${base}-end`
]), []);
const SHOW_EVENT_MAP = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart"
};
const HIDE_EVENT_MAP = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend"
};
function removeFromArray(array, item) {
  const index2 = array.indexOf(item);
  if (index2 !== -1) {
    array.splice(index2, 1);
  }
}
function nextFrame() {
  return new Promise((resolve2) => requestAnimationFrame(() => {
    requestAnimationFrame(resolve2);
  }));
}
const shownPoppers = [];
let hidingPopper = null;
const shownPoppersByTheme = {};
function getShownPoppersByTheme(theme) {
  let list = shownPoppersByTheme[theme];
  if (!list) {
    list = shownPoppersByTheme[theme] = [];
  }
  return list;
}
let Element$1 = function() {
};
if (typeof window !== "undefined") {
  Element$1 = window.Element;
}
function defaultPropFactory(prop) {
  return function(props) {
    return getDefaultConfig(props.theme, prop);
  };
}
const PROVIDE_KEY = "__floating-vue__popper";
var PrivatePopper = () => defineComponent({
  name: "VPopper",
  provide() {
    return {
      [PROVIDE_KEY]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [PROVIDE_KEY]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    targetNodes: {
      type: Function,
      required: true
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: true
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: defaultPropFactory("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: defaultPropFactory("positioningDisabled")
    },
    placement: {
      type: String,
      default: defaultPropFactory("placement"),
      validator: (value) => placements.includes(value)
    },
    delay: {
      type: [String, Number, Object],
      default: defaultPropFactory("delay")
    },
    distance: {
      type: [Number, String],
      default: defaultPropFactory("distance")
    },
    skidding: {
      type: [Number, String],
      default: defaultPropFactory("skidding")
    },
    triggers: {
      type: Array,
      default: defaultPropFactory("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: defaultPropFactory("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: defaultPropFactory("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: defaultPropFactory("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: defaultPropFactory("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: defaultPropFactory("popperHideTriggers")
    },
    container: {
      type: [String, Object, Element$1, Boolean],
      default: defaultPropFactory("container")
    },
    boundary: {
      type: [String, Element$1],
      default: defaultPropFactory("boundary")
    },
    strategy: {
      type: String,
      validator: (value) => ["absolute", "fixed"].includes(value),
      default: defaultPropFactory("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: defaultPropFactory("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: defaultPropFactory("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: defaultPropFactory("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: defaultPropFactory("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: defaultPropFactory("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: defaultPropFactory("computeTransformOrigin")
    },
    autoMinSize: {
      type: Boolean,
      default: defaultPropFactory("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: defaultPropFactory("autoSize")
    },
    autoMaxSize: {
      type: Boolean,
      default: defaultPropFactory("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: defaultPropFactory("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: defaultPropFactory("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: defaultPropFactory("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: defaultPropFactory("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: defaultPropFactory("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: defaultPropFactory("flip")
    },
    shift: {
      type: Boolean,
      default: defaultPropFactory("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: defaultPropFactory("shiftCrossAxis")
    }
  },
  emits: [
    "show",
    "hide",
    "update:shown",
    "apply-show",
    "apply-hide",
    "close-group",
    "close-directive",
    "auto-hide",
    "resize",
    "dispose"
  ],
  data() {
    return {
      isShown: false,
      isMounted: false,
      skipTransition: false,
      classes: {
        showFrom: false,
        showTo: false,
        hideFrom: false,
        hideTo: true
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: true
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide === "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: __spreadProps(__spreadValues({}, this.classes), {
          popperClass: this.popperClass
        }),
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var _a2;
      return (_a2 = this[PROVIDE_KEY]) == null ? void 0 : _a2.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var _a2, _b;
      return ((_a2 = this.popperTriggers) == null ? void 0 : _a2.includes("hover")) || ((_b = this.popperShowTriggers) == null ? void 0 : _b.includes("hover"));
    }
  },
  watch: __spreadValues(__spreadValues({
    shown: "$_autoShowHide",
    disabled(value) {
      if (value) {
        this.dispose();
      } else {
        this.init();
      }
    },
    async container() {
      if (this.isShown) {
        this.$_ensureTeleport();
        await this.$_computePosition();
      }
    }
  }, [
    "triggers",
    "positioningDisabled"
  ].reduce((acc, prop) => {
    acc[prop] = "$_refreshListeners";
    return acc;
  }, {})), [
    "placement",
    "distance",
    "skidding",
    "boundary",
    "strategy",
    "overflowPadding",
    "arrowPadding",
    "preventOverflow",
    "shift",
    "shiftCrossAxis",
    "flip"
  ].reduce((acc, prop) => {
    acc[prop] = "$_computePosition";
    return acc;
  }, {})),
  created() {
    this.$_isDisposed = true;
    this.randomId = `popper_${[Math.random(), Date.now()].map((n2) => n2.toString(36).substring(2, 10)).join("_")}`;
    if (this.autoMinSize) {
      console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.');
    }
    if (this.autoMaxSize) {
      console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
    }
  },
  mounted() {
    this.init();
    this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event = null, skipDelay = false, force = false } = {}) {
      var _a2, _b;
      if (((_a2 = this.parentPopper) == null ? void 0 : _a2.lockedChild) && this.parentPopper.lockedChild !== this)
        return;
      this.$_pendingHide = false;
      if (force || !this.disabled) {
        if (((_b = this.parentPopper) == null ? void 0 : _b.lockedChild) === this) {
          this.parentPopper.lockedChild = null;
        }
        this.$_scheduleShow(event, skipDelay);
        this.$emit("show");
        this.$_showFrameLocked = true;
        requestAnimationFrame(() => {
          this.$_showFrameLocked = false;
        });
      }
      this.$emit("update:shown", true);
    },
    hide({ event = null, skipDelay = false } = {}) {
      var _a2;
      if (this.$_hideInProgress)
        return;
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = true;
        return;
      }
      if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
        if (this.parentPopper) {
          this.parentPopper.lockedChild = this;
          clearTimeout(this.parentPopper.lockedChildTimer);
          this.parentPopper.lockedChildTimer = setTimeout(() => {
            if (this.parentPopper.lockedChild === this) {
              this.parentPopper.lockedChild.hide({ skipDelay });
              this.parentPopper.lockedChild = null;
            }
          }, 1e3);
        }
        return;
      }
      if (((_a2 = this.parentPopper) == null ? void 0 : _a2.lockedChild) === this) {
        this.parentPopper.lockedChild = null;
      }
      this.$_pendingHide = false;
      this.$_scheduleHide(event, skipDelay);
      this.$emit("hide");
      this.$emit("update:shown", false);
    },
    init() {
      var _a2, _b;
      if (!this.$_isDisposed)
        return;
      this.$_isDisposed = false;
      this.isMounted = false;
      this.$_events = [];
      this.$_preventShow = false;
      this.$_referenceNode = (_b = (_a2 = this.referenceNode) == null ? void 0 : _a2.call(this)) != null ? _b : this.$el;
      this.$_targetNodes = this.targetNodes().filter((e2) => e2.nodeType === e2.ELEMENT_NODE);
      this.$_popperNode = this.popperNode();
      this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner");
      this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container");
      this.$_swapTargetAttrs("title", "data-original-title");
      this.$_detachPopperNode();
      if (this.triggers.length) {
        this.$_addEventListeners();
      }
      if (this.shown) {
        this.show();
      }
    },
    dispose() {
      if (this.$_isDisposed)
        return;
      this.$_isDisposed = true;
      this.$_removeEventListeners();
      this.hide({ skipDelay: true });
      this.$_detachPopperNode();
      this.isMounted = false;
      this.isShown = false;
      this.$_updateParentShownChildren(false);
      this.$_swapTargetAttrs("data-original-title", "title");
      this.$emit("dispose");
    },
    async onResize() {
      if (this.isShown) {
        await this.$_computePosition();
        this.$emit("resize");
      }
    },
    async $_computePosition() {
      var _a2;
      if (this.$_isDisposed || this.positioningDisabled)
        return;
      const options2 = {
        strategy: this.strategy,
        middleware: []
      };
      if (this.distance || this.skidding) {
        options2.middleware.push(offset({
          mainAxis: this.distance,
          crossAxis: this.skidding
        }));
      }
      const isPlacementAuto = this.placement.startsWith("auto");
      if (isPlacementAuto) {
        options2.middleware.push(autoPlacement({
          alignment: (_a2 = this.placement.split("-")[1]) != null ? _a2 : ""
        }));
      } else {
        options2.placement = this.placement;
      }
      if (this.preventOverflow) {
        if (this.shift) {
          options2.middleware.push(shift({
            padding: this.overflowPadding,
            boundary: this.boundary,
            crossAxis: this.shiftCrossAxis
          }));
        }
        if (!isPlacementAuto && this.flip) {
          options2.middleware.push(flip({
            padding: this.overflowPadding,
            boundary: this.boundary
          }));
        }
      }
      options2.middleware.push(arrow({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      }));
      if (this.arrowOverflow) {
        options2.middleware.push({
          name: "arrowOverflow",
          fn: ({ placement, rects, middlewareData }) => {
            let overflow;
            const { centerOffset } = middlewareData.arrow;
            if (placement.startsWith("top") || placement.startsWith("bottom")) {
              overflow = Math.abs(centerOffset) > rects.reference.width / 2;
            } else {
              overflow = Math.abs(centerOffset) > rects.reference.height / 2;
            }
            return {
              data: {
                overflow
              }
            };
          }
        });
      }
      if (this.autoMinSize || this.autoSize) {
        const autoSize = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        options2.middleware.push({
          name: "autoSize",
          fn: ({ rects, placement, middlewareData }) => {
            var _a22;
            if ((_a22 = middlewareData.autoSize) == null ? void 0 : _a22.skip) {
              return {};
            }
            let width;
            let height;
            if (placement.startsWith("top") || placement.startsWith("bottom")) {
              width = rects.reference.width;
            } else {
              height = rects.reference.height;
            }
            this.$_innerNode.style[autoSize === "min" ? "minWidth" : autoSize === "max" ? "maxWidth" : "width"] = width != null ? `${width}px` : null;
            this.$_innerNode.style[autoSize === "min" ? "minHeight" : autoSize === "max" ? "maxHeight" : "height"] = height != null ? `${height}px` : null;
            return {
              data: {
                skip: true
              },
              reset: {
                rects: true
              }
            };
          }
        });
      }
      if (this.autoMaxSize || this.autoBoundaryMaxSize) {
        this.$_innerNode.style.maxWidth = null;
        this.$_innerNode.style.maxHeight = null;
        options2.middleware.push(size({
          boundary: this.boundary,
          padding: this.overflowPadding,
          apply: ({ width, height }) => {
            this.$_innerNode.style.maxWidth = width != null ? `${width}px` : null;
            this.$_innerNode.style.maxHeight = height != null ? `${height}px` : null;
          }
        }));
      }
      const data = await computePosition(this.$_referenceNode, this.$_popperNode, options2);
      Object.assign(this.result, {
        x: data.x,
        y: data.y,
        placement: data.placement,
        strategy: data.strategy,
        arrow: __spreadValues(__spreadValues({}, data.middlewareData.arrow), data.middlewareData.arrowOverflow)
      });
    },
    $_scheduleShow(event = null, skipDelay = false) {
      this.$_updateParentShownChildren(true);
      this.$_hideInProgress = false;
      clearTimeout(this.$_scheduleTimer);
      if (hidingPopper && this.instantMove && hidingPopper.instantMove && hidingPopper !== this.parentPopper) {
        hidingPopper.$_applyHide(true);
        this.$_applyShow(true);
        return;
      }
      if (skipDelay) {
        this.$_applyShow();
      } else {
        this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
      }
    },
    $_scheduleHide(event = null, skipDelay = false) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = true;
        return;
      }
      this.$_updateParentShownChildren(false);
      this.$_hideInProgress = true;
      clearTimeout(this.$_scheduleTimer);
      if (this.isShown) {
        hidingPopper = this;
      }
      if (skipDelay) {
        this.$_applyHide();
      } else {
        this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
      }
    },
    $_computeDelay(type) {
      const delay = this.delay;
      return parseInt(delay && delay[type] || delay || 0);
    },
    async $_applyShow(skipTransition = false) {
      clearTimeout(this.$_disposeTimer);
      clearTimeout(this.$_scheduleTimer);
      this.skipTransition = skipTransition;
      if (this.isShown) {
        return;
      }
      this.$_ensureTeleport();
      await nextFrame();
      await this.$_computePosition();
      await this.$_applyShowEffect();
      if (!this.positioningDisabled) {
        this.$_registerEventListeners([
          ...getScrollParents(this.$_referenceNode),
          ...getScrollParents(this.$_popperNode)
        ], "scroll", () => {
          this.$_computePosition();
        });
      }
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const bounds = this.$_referenceNode.getBoundingClientRect();
        const popperWrapper = this.$_popperNode.querySelector(".v-popper__wrapper");
        const parentBounds = popperWrapper.parentNode.getBoundingClientRect();
        const x2 = bounds.x + bounds.width / 2 - (parentBounds.left + popperWrapper.offsetLeft);
        const y2 = bounds.y + bounds.height / 2 - (parentBounds.top + popperWrapper.offsetTop);
        this.result.transformOrigin = `${x2}px ${y2}px`;
      }
      this.isShown = true;
      this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const showGroup = this.showGroup;
      if (showGroup) {
        let popover;
        for (let i2 = 0; i2 < shownPoppers.length; i2++) {
          popover = shownPoppers[i2];
          if (popover.showGroup !== showGroup) {
            popover.hide();
            popover.$emit("close-group");
          }
        }
      }
      shownPoppers.push(this);
      document.body.classList.add("v-popper--some-open");
      for (const theme of getAllParentThemes(this.theme)) {
        getShownPoppersByTheme(theme).push(this);
        document.body.classList.add(`v-popper--some-open--${theme}`);
      }
      this.$emit("apply-show");
      this.classes.showFrom = true;
      this.classes.showTo = false;
      this.classes.hideFrom = false;
      this.classes.hideTo = false;
      await nextFrame();
      this.classes.showFrom = false;
      this.classes.showTo = true;
      this.$_popperNode.focus();
    },
    async $_applyHide(skipTransition = false) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = true;
        this.$_hideInProgress = false;
        return;
      }
      clearTimeout(this.$_scheduleTimer);
      if (!this.isShown) {
        return;
      }
      this.skipTransition = skipTransition;
      removeFromArray(shownPoppers, this);
      if (shownPoppers.length === 0) {
        document.body.classList.remove("v-popper--some-open");
      }
      for (const theme of getAllParentThemes(this.theme)) {
        const list = getShownPoppersByTheme(theme);
        removeFromArray(list, this);
        if (list.length === 0) {
          document.body.classList.remove(`v-popper--some-open--${theme}`);
        }
      }
      if (hidingPopper === this) {
        hidingPopper = null;
      }
      this.isShown = false;
      this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      });
      clearTimeout(this.$_disposeTimer);
      const disposeTime = getDefaultConfig(this.theme, "disposeTimeout");
      if (disposeTime !== null) {
        this.$_disposeTimer = setTimeout(() => {
          if (this.$_popperNode) {
            this.$_detachPopperNode();
            this.isMounted = false;
          }
        }, disposeTime);
      }
      this.$_removeEventListeners("scroll");
      this.$emit("apply-hide");
      this.classes.showFrom = false;
      this.classes.showTo = false;
      this.classes.hideFrom = true;
      this.classes.hideTo = false;
      await nextFrame();
      this.classes.hideFrom = false;
      this.classes.hideTo = true;
    },
    $_autoShowHide() {
      if (this.shown) {
        this.show();
      } else {
        this.hide();
      }
    },
    $_ensureTeleport() {
      if (this.$_isDisposed)
        return;
      let container = this.container;
      if (typeof container === "string") {
        container = window.document.querySelector(container);
      } else if (container === false) {
        container = this.$_targetNodes[0].parentNode;
      }
      if (!container) {
        throw new Error("No container for popover: " + this.container);
      }
      container.appendChild(this.$_popperNode);
      this.isMounted = true;
    },
    $_addEventListeners() {
      const handleShow = (event) => {
        if (this.isShown && !this.$_hideInProgress) {
          return;
        }
        event.usedByTooltip = true;
        !this.$_preventShow && this.show({ event });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, SHOW_EVENT_MAP, this.triggers, this.showTriggers, handleShow);
      this.$_registerTriggerListeners([this.$_popperNode], SHOW_EVENT_MAP, this.popperTriggers, this.popperShowTriggers, handleShow);
      const handleHide = (event) => {
        if (event.usedByTooltip) {
          return;
        }
        this.hide({ event });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, HIDE_EVENT_MAP, this.triggers, this.hideTriggers, handleHide);
      this.$_registerTriggerListeners([this.$_popperNode], HIDE_EVENT_MAP, this.popperTriggers, this.popperHideTriggers, handleHide);
    },
    $_registerEventListeners(targetNodes, eventType, handler) {
      this.$_events.push({ targetNodes, eventType, handler });
      targetNodes.forEach((node) => node.addEventListener(eventType, handler, supportsPassive ? {
        passive: true
      } : void 0));
    },
    $_registerTriggerListeners(targetNodes, eventMap, commonTriggers, customTrigger, handler) {
      let triggers = commonTriggers;
      if (customTrigger != null) {
        triggers = typeof customTrigger === "function" ? customTrigger(triggers) : customTrigger;
      }
      triggers.forEach((trigger2) => {
        const eventType = eventMap[trigger2];
        if (eventType) {
          this.$_registerEventListeners(targetNodes, eventType, handler);
        }
      });
    },
    $_removeEventListeners(filterEventType) {
      const newList = [];
      this.$_events.forEach((listener) => {
        const { targetNodes, eventType, handler } = listener;
        if (!filterEventType || filterEventType === eventType) {
          targetNodes.forEach((node) => node.removeEventListener(eventType, handler));
        } else {
          newList.push(listener);
        }
      });
      this.$_events = newList;
    },
    $_refreshListeners() {
      if (!this.$_isDisposed) {
        this.$_removeEventListeners();
        this.$_addEventListeners();
      }
    },
    $_handleGlobalClose(event, touch = false) {
      if (this.$_showFrameLocked)
        return;
      this.hide({ event });
      if (event.closePopover) {
        this.$emit("close-directive");
      } else {
        this.$emit("auto-hide");
      }
      if (touch) {
        this.$_preventShow = true;
        setTimeout(() => {
          this.$_preventShow = false;
        }, 300);
      }
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(attrFrom, attrTo) {
      for (const el of this.$_targetNodes) {
        const value = el.getAttribute(attrFrom);
        if (value) {
          el.removeAttribute(attrFrom);
          el.setAttribute(attrTo, value);
        }
      }
    },
    $_applyAttrsToTarget(attrs) {
      for (const el of this.$_targetNodes) {
        for (const n2 in attrs) {
          const value = attrs[n2];
          if (value == null) {
            el.removeAttribute(n2);
          } else {
            el.setAttribute(n2, value);
          }
        }
      }
    },
    $_updateParentShownChildren(value) {
      let parent = this.parentPopper;
      while (parent) {
        if (value) {
          parent.shownChildren.add(this.randomId);
        } else {
          parent.shownChildren.delete(this.randomId);
          if (parent.$_pendingHide) {
            parent.hide();
          }
        }
        parent = parent.parentPopper;
      }
    },
    $_isAimingPopper() {
      const referenceBounds = this.$_referenceNode.getBoundingClientRect();
      if (mouseX >= referenceBounds.left && mouseX <= referenceBounds.right && mouseY >= referenceBounds.top && mouseY <= referenceBounds.bottom) {
        const popperBounds = this.$_popperNode.getBoundingClientRect();
        const vectorX = mouseX - mousePreviousX;
        const vectorY = mouseY - mousePreviousY;
        const distance = popperBounds.left + popperBounds.width / 2 - mousePreviousX + (popperBounds.top + popperBounds.height / 2) - mousePreviousY;
        const newVectorLength = distance + popperBounds.width + popperBounds.height;
        const edgeX = mousePreviousX + vectorX * newVectorLength;
        const edgeY = mousePreviousY + vectorY * newVectorLength;
        return lineIntersectsLine(mousePreviousX, mousePreviousY, edgeX, edgeY, popperBounds.left, popperBounds.top, popperBounds.left, popperBounds.bottom) || lineIntersectsLine(mousePreviousX, mousePreviousY, edgeX, edgeY, popperBounds.left, popperBounds.top, popperBounds.right, popperBounds.top) || lineIntersectsLine(mousePreviousX, mousePreviousY, edgeX, edgeY, popperBounds.right, popperBounds.top, popperBounds.right, popperBounds.bottom) || lineIntersectsLine(mousePreviousX, mousePreviousY, edgeX, edgeY, popperBounds.left, popperBounds.bottom, popperBounds.right, popperBounds.bottom);
      }
      return false;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document !== "undefined" && typeof window !== "undefined") {
  if (isIOS) {
    document.addEventListener("touchstart", handleGlobalMousedown, supportsPassive ? {
      passive: true,
      capture: true
    } : true);
    document.addEventListener("touchend", handleGlobalTouchend, supportsPassive ? {
      passive: true,
      capture: true
    } : true);
  } else {
    window.addEventListener("mousedown", handleGlobalMousedown, true);
    window.addEventListener("click", handleGlobalClick, true);
  }
  window.addEventListener("resize", computePositionAllShownPoppers);
}
function handleGlobalMousedown(event) {
  for (let i2 = 0; i2 < shownPoppers.length; i2++) {
    const popper = shownPoppers[i2];
    try {
      const popperContent = popper.popperNode();
      popper.$_mouseDownContains = popperContent.contains(event.target);
    } catch (e2) {
    }
  }
}
function handleGlobalClick(event) {
  handleGlobalClose(event);
}
function handleGlobalTouchend(event) {
  handleGlobalClose(event, true);
}
function handleGlobalClose(event, touch = false) {
  const preventClose = {};
  for (let i2 = shownPoppers.length - 1; i2 >= 0; i2--) {
    const popper = shownPoppers[i2];
    try {
      const contains2 = popper.$_containsGlobalTarget = isContainingEventTarget(popper, event);
      popper.$_pendingHide = false;
      requestAnimationFrame(() => {
        popper.$_pendingHide = false;
        if (preventClose[popper.randomId])
          return;
        if (shouldAutoHide(popper, contains2, event)) {
          popper.$_handleGlobalClose(event, touch);
          if (!event.closeAllPopover && event.closePopover && contains2) {
            let parent2 = popper.parentPopper;
            while (parent2) {
              preventClose[parent2.randomId] = true;
              parent2 = parent2.parentPopper;
            }
            return;
          }
          let parent = popper.parentPopper;
          while (parent) {
            if (shouldAutoHide(parent, parent.$_containsGlobalTarget, event)) {
              parent.$_handleGlobalClose(event, touch);
            } else {
              break;
            }
            parent = parent.parentPopper;
          }
        }
      });
    } catch (e2) {
    }
  }
}
function isContainingEventTarget(popper, event) {
  const popperContent = popper.popperNode();
  return popper.$_mouseDownContains || popperContent.contains(event.target);
}
function shouldAutoHide(popper, contains2, event) {
  return event.closeAllPopover || event.closePopover && contains2 || getAutoHideResult(popper, event) && !contains2;
}
function getAutoHideResult(popper, event) {
  if (typeof popper.autoHide === "function") {
    const result = popper.autoHide(event);
    popper.lastAutoHide = result;
    return result;
  }
  return popper.autoHide;
}
function computePositionAllShownPoppers(event) {
  for (let i2 = 0; i2 < shownPoppers.length; i2++) {
    const popper = shownPoppers[i2];
    popper.$_computePosition(event);
  }
}
let mousePreviousX = 0;
let mousePreviousY = 0;
let mouseX = 0;
let mouseY = 0;
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (event) => {
    mousePreviousX = mouseX;
    mousePreviousY = mouseY;
    mouseX = event.clientX;
    mouseY = event.clientY;
  }, supportsPassive ? {
    passive: true
  } : void 0);
}
function lineIntersectsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$6$1 = {
  extends: PrivatePopper()
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "reference",
    class: normalizeClass(["v-popper", {
      "v-popper--shown": _ctx.slotData.isShown
    }])
  }, [
    renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(_ctx.slotData)))
  ], 2);
}
var Popper$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6$1, [["render", _sfc_render$3]]);
function getInternetExplorerVersion() {
  var ua2 = window.navigator.userAgent;
  var msie = ua2.indexOf("MSIE ");
  if (msie > 0) {
    return parseInt(ua2.substring(msie + 5, ua2.indexOf(".", msie)), 10);
  }
  var trident = ua2.indexOf("Trident/");
  if (trident > 0) {
    var rv = ua2.indexOf("rv:");
    return parseInt(ua2.substring(rv + 3, ua2.indexOf(".", rv)), 10);
  }
  var edge = ua2.indexOf("Edge/");
  if (edge > 0) {
    return parseInt(ua2.substring(edge + 5, ua2.indexOf(".", edge)), 10);
  }
  return -1;
}
let isIE;
function initCompat() {
  if (!initCompat.init) {
    initCompat.init = true;
    isIE = getInternetExplorerVersion() !== -1;
  }
}
var script = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: false
    },
    ignoreWidth: {
      type: Boolean,
      default: false
    },
    ignoreHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    initCompat();
    nextTick(() => {
      this._w = this.$el.offsetWidth;
      this._h = this.$el.offsetHeight;
      if (this.emitOnMount) {
        this.emitSize();
      }
    });
    const object = document.createElement("object");
    this._resizeObject = object;
    object.setAttribute("aria-hidden", "true");
    object.setAttribute("tabindex", -1);
    object.onload = this.addResizeHandlers;
    object.type = "text/html";
    if (isIE) {
      this.$el.appendChild(object);
    }
    object.data = "about:blank";
    if (!isIE) {
      this.$el.appendChild(object);
    }
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      if (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) {
        this._w = this.$el.offsetWidth;
        this._h = this.$el.offsetHeight;
        this.emitSize();
      }
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify);
      this.compareAndNotify();
    },
    removeResizeHandlers() {
      if (this._resizeObject && this._resizeObject.onload) {
        if (!isIE && this._resizeObject.contentDocument) {
          this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify);
        }
        this.$el.removeChild(this._resizeObject);
        this._resizeObject.onload = null;
        this._resizeObject = null;
      }
    }
  }
};
const _withId = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-b329ee4c");
const _hoisted_1$2$1 = {
  class: "resize-observer",
  tabindex: "-1"
};
popScopeId();
const render$1 = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", _hoisted_1$2$1);
});
script.render = render$1;
script.__scopeId = "data-v-b329ee4c";
script.__file = "src/components/ResizeObserver.vue";
var PrivateThemeClass = (prop = "theme") => ({
  computed: {
    themeClass() {
      return getThemeClasses(this[prop]);
    }
  }
});
const _sfc_main$5$1 = defineComponent({
  name: "VPopperContent",
  components: {
    ResizeObserver: script
  },
  mixins: [
    PrivateThemeClass()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(value) {
      if (value != null && !isNaN(value)) {
        return `${value}px`;
      }
      return null;
    }
  }
});
const _hoisted_1$1$1 = ["id", "aria-hidden", "tabindex", "data-popper-placement"];
const _hoisted_2$1$1 = {
  ref: "inner",
  class: "v-popper__inner"
};
const _hoisted_3$7 = /* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-outer" }, null, -1);
const _hoisted_4$5 = /* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-inner" }, null, -1);
const _hoisted_5$3 = [
  _hoisted_3$7,
  _hoisted_4$5
];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ResizeObserver = resolveComponent("ResizeObserver");
  return openBlock(), createElementBlock("div", {
    id: _ctx.popperId,
    ref: "popover",
    class: normalizeClass(["v-popper__popper", [
      _ctx.themeClass,
      _ctx.classes.popperClass,
      {
        "v-popper__popper--shown": _ctx.shown,
        "v-popper__popper--hidden": !_ctx.shown,
        "v-popper__popper--show-from": _ctx.classes.showFrom,
        "v-popper__popper--show-to": _ctx.classes.showTo,
        "v-popper__popper--hide-from": _ctx.classes.hideFrom,
        "v-popper__popper--hide-to": _ctx.classes.hideTo,
        "v-popper__popper--skip-transition": _ctx.skipTransition,
        "v-popper__popper--arrow-overflow": _ctx.result && _ctx.result.arrow.overflow,
        "v-popper__popper--no-positioning": !_ctx.result
      }
    ]]),
    style: normalizeStyle(_ctx.result ? {
      position: _ctx.result.strategy,
      transform: `translate3d(${Math.round(_ctx.result.x)}px,${Math.round(_ctx.result.y)}px,0)`
    } : void 0),
    "aria-hidden": _ctx.shown ? "false" : "true",
    tabindex: _ctx.autoHide ? 0 : void 0,
    "data-popper-placement": _ctx.result ? _ctx.result.placement : void 0,
    onKeyup: _cache[2] || (_cache[2] = withKeys(($event) => _ctx.autoHide && _ctx.$emit("hide"), ["esc"]))
  }, [
    createBaseVNode("div", {
      class: "v-popper__backdrop",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.autoHide && _ctx.$emit("hide"))
    }),
    createBaseVNode("div", {
      class: "v-popper__wrapper",
      style: normalizeStyle(_ctx.result ? {
        transformOrigin: _ctx.result.transformOrigin
      } : void 0)
    }, [
      createBaseVNode("div", _hoisted_2$1$1, [
        _ctx.mounted ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("div", null, [
            renderSlot(_ctx.$slots, "default")
          ]),
          _ctx.handleResize ? (openBlock(), createBlock(_component_ResizeObserver, {
            key: 0,
            onNotify: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("resize", $event))
          })) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ], 512),
      createBaseVNode("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: normalizeStyle(_ctx.result ? {
          left: _ctx.toPx(_ctx.result.arrow.x),
          top: _ctx.toPx(_ctx.result.arrow.y)
        } : void 0)
      }, _hoisted_5$3, 4)
    ], 4)
  ], 46, _hoisted_1$1$1);
}
var PrivatePopperContent = /* @__PURE__ */ _export_sfc(_sfc_main$5$1, [["render", _sfc_render$2]]);
var PrivatePopperMethods = {
  methods: {
    show(...args) {
      return this.$refs.popper.show(...args);
    },
    hide(...args) {
      return this.$refs.popper.hide(...args);
    },
    dispose(...args) {
      return this.$refs.popper.dispose(...args);
    },
    onResize(...args) {
      return this.$refs.popper.onResize(...args);
    }
  }
};
const _sfc_main$4$1 = defineComponent({
  name: "VPopperWrapper",
  components: {
    Popper: Popper$1,
    PopperContent: PrivatePopperContent
  },
  mixins: [
    PrivatePopperMethods,
    PrivateThemeClass("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    }
  },
  computed: {
    finalTheme() {
      var _a2;
      return (_a2 = this.theme) != null ? _a2 : this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((node) => node !== this.$refs.popperContent.$el);
    }
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PopperContent = resolveComponent("PopperContent");
  const _component_Popper = resolveComponent("Popper");
  return openBlock(), createBlock(_component_Popper, {
    ref: "popper",
    theme: _ctx.finalTheme,
    "target-nodes": _ctx.getTargetNodes,
    "popper-node": () => _ctx.$refs.popperContent.$el,
    class: normalizeClass([
      _ctx.themeClass
    ])
  }, {
    default: withCtx(({
      popperId,
      isShown,
      shouldMountContent,
      skipTransition,
      autoHide,
      show,
      hide,
      handleResize,
      onResize,
      classes,
      result
    }) => [
      renderSlot(_ctx.$slots, "default", {
        shown: isShown,
        show,
        hide
      }),
      createVNode(_component_PopperContent, {
        ref: "popperContent",
        "popper-id": popperId,
        theme: _ctx.finalTheme,
        shown: isShown,
        mounted: shouldMountContent,
        "skip-transition": skipTransition,
        "auto-hide": autoHide,
        "handle-resize": handleResize,
        classes,
        result,
        onHide: hide,
        onResize
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "popper", {
            shown: isShown,
            hide
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 8, ["theme", "target-nodes", "popper-node", "class"]);
}
var PrivatePopperWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$4$1, [["render", _sfc_render$1]]);
const _sfc_main$3$1 = defineComponent(__spreadProps(__spreadValues({}, PrivatePopperWrapper), {
  name: "VDropdown",
  vPopperTheme: "dropdown"
}));
const _sfc_main$2$1 = defineComponent(__spreadProps(__spreadValues({}, PrivatePopperWrapper), {
  name: "VMenu",
  vPopperTheme: "menu"
}));
const _sfc_main$1$1 = defineComponent(__spreadProps(__spreadValues({}, PrivatePopperWrapper), {
  name: "VTooltip",
  vPopperTheme: "tooltip"
}));
const _sfc_main$d = defineComponent({
  name: "VTooltipDirective",
  components: {
    Popper: PrivatePopper(),
    PopperContent: PrivatePopperContent
  },
  mixins: [
    PrivatePopperMethods
  ],
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (props) => getDefaultConfig(props.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (props) => getDefaultConfig(props.theme, "loadingContent")
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content === "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      if (this.isContentAsync) {
        return this.loading ? this.loadingContent : this.asyncContent;
      }
      return this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(true);
      },
      immediate: true
    },
    async finalContent() {
      await this.$nextTick();
      this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(force) {
      if (typeof this.content === "function" && this.$_isShown && (force || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null;
        this.$_loading = true;
        const fetchId = ++this.$_fetchId;
        const result = this.content(this);
        if (result.then) {
          result.then((res) => this.onResult(fetchId, res));
        } else {
          this.onResult(fetchId, result);
        }
      }
    },
    onResult(fetchId, result) {
      if (fetchId !== this.$_fetchId)
        return;
      this.$_loading = false;
      this.asyncContent = result;
    },
    onShow() {
      this.$_isShown = true;
      this.fetchContent();
    },
    onHide() {
      this.$_isShown = false;
    }
  }
});
const _hoisted_1$a = ["innerHTML"];
const _hoisted_2$8 = ["textContent"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PopperContent = resolveComponent("PopperContent");
  const _component_Popper = resolveComponent("Popper");
  return openBlock(), createBlock(_component_Popper, mergeProps({ ref: "popper" }, _ctx.$attrs, {
    theme: _ctx.theme,
    "popper-node": () => _ctx.$refs.popperContent.$el,
    onApplyShow: _ctx.onShow,
    onApplyHide: _ctx.onHide
  }), {
    default: withCtx(({
      popperId,
      isShown,
      shouldMountContent,
      skipTransition,
      autoHide,
      hide,
      handleResize,
      onResize,
      classes,
      result
    }) => [
      createVNode(_component_PopperContent, {
        ref: "popperContent",
        class: normalizeClass({
          "v-popper--tooltip-loading": _ctx.loading
        }),
        "popper-id": popperId,
        theme: _ctx.theme,
        shown: isShown,
        mounted: shouldMountContent,
        "skip-transition": skipTransition,
        "auto-hide": autoHide,
        "handle-resize": handleResize,
        classes,
        result,
        onHide: hide,
        onResize
      }, {
        default: withCtx(() => [
          _ctx.html ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: _ctx.finalContent
          }, null, 8, _hoisted_1$a)) : (openBlock(), createElementBlock("div", {
            key: 1,
            textContent: toDisplayString(_ctx.finalContent)
          }, null, 8, _hoisted_2$8))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "popper-node", "onApplyShow", "onApplyHide"]);
}
var PrivateTooltipDirective = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render]]);
const TARGET_CLASS = "v-popper--has-tooltip";
function getPlacement(options2, modifiers) {
  let result = options2.placement;
  if (!result && modifiers) {
    for (const pos of placements) {
      if (modifiers[pos]) {
        result = pos;
      }
    }
  }
  if (!result) {
    result = getDefaultConfig(options2.theme || "tooltip", "placement");
  }
  return result;
}
function getOptions$1(el, value, modifiers) {
  let options2;
  const type = typeof value;
  if (type === "string") {
    options2 = { content: value };
  } else if (value && type === "object") {
    options2 = value;
  } else {
    options2 = { content: false };
  }
  options2.placement = getPlacement(options2, modifiers);
  options2.targetNodes = () => [el];
  options2.referenceNode = () => el;
  return options2;
}
let directiveApp;
let directives;
let uid = 0;
function ensureDirectiveApp() {
  if (directiveApp)
    return;
  directives = ref([]);
  directiveApp = createApp({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives
      };
    },
    render() {
      return this.directives.map((directive2) => {
        return h$1(PrivateTooltipDirective, __spreadProps(__spreadValues({}, directive2.options), {
          shown: directive2.shown || directive2.options.shown,
          key: directive2.id
        }));
      });
    },
    devtools: {
      hide: true
    }
  });
  const mountTarget = document.createElement("div");
  document.body.appendChild(mountTarget);
  directiveApp.mount(mountTarget);
}
function createTooltip(el, value, modifiers) {
  ensureDirectiveApp();
  const options2 = ref(getOptions$1(el, value, modifiers));
  const shown = ref(false);
  const item = {
    id: uid++,
    options: options2,
    shown
  };
  directives.value.push(item);
  if (el.classList) {
    el.classList.add(TARGET_CLASS);
  }
  const result = el.$_popper = {
    options: options2,
    item,
    show() {
      shown.value = true;
    },
    hide() {
      shown.value = false;
    }
  };
  return result;
}
function destroyTooltip(el) {
  if (el.$_popper) {
    const index2 = directives.value.indexOf(el.$_popper.item);
    if (index2 !== -1)
      directives.value.splice(index2, 1);
    delete el.$_popper;
    delete el.$_popperOldShown;
    delete el.$_popperMountTarget;
  }
  if (el.classList) {
    el.classList.remove(TARGET_CLASS);
  }
}
function bind$1(el, { value, modifiers }) {
  const options2 = getOptions$1(el, value, modifiers);
  if (!options2.content || getDefaultConfig(options2.theme || "tooltip", "disabled")) {
    destroyTooltip(el);
  } else {
    let directive2;
    if (el.$_popper) {
      directive2 = el.$_popper;
      directive2.options.value = options2;
    } else {
      directive2 = createTooltip(el, value, modifiers);
    }
    if (typeof value.shown !== "undefined" && value.shown !== el.$_popperOldShown) {
      el.$_popperOldShown = value.shown;
      value.shown ? directive2.show() : directive2.hide();
    }
  }
}
var PrivateVTooltip = {
  beforeMount: bind$1,
  updated: bind$1,
  beforeUnmount(el) {
    destroyTooltip(el);
  }
};
function addListeners(el) {
  el.addEventListener("click", onClick);
  el.addEventListener("touchstart", onTouchStart, supportsPassive ? {
    passive: true
  } : false);
}
function removeListeners(el) {
  el.removeEventListener("click", onClick);
  el.removeEventListener("touchstart", onTouchStart);
  el.removeEventListener("touchend", onTouchEnd);
  el.removeEventListener("touchcancel", onTouchCancel);
}
function onClick(event) {
  const el = event.currentTarget;
  event.closePopover = !el.$_vclosepopover_touch;
  event.closeAllPopover = el.$_closePopoverModifiers && !!el.$_closePopoverModifiers.all;
}
function onTouchStart(event) {
  if (event.changedTouches.length === 1) {
    const el = event.currentTarget;
    el.$_vclosepopover_touch = true;
    const touch = event.changedTouches[0];
    el.$_vclosepopover_touchPoint = touch;
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchCancel);
  }
}
function onTouchEnd(event) {
  const el = event.currentTarget;
  el.$_vclosepopover_touch = false;
  if (event.changedTouches.length === 1) {
    const touch = event.changedTouches[0];
    const firstTouch = el.$_vclosepopover_touchPoint;
    event.closePopover = Math.abs(touch.screenY - firstTouch.screenY) < 20 && Math.abs(touch.screenX - firstTouch.screenX) < 20;
    event.closeAllPopover = el.$_closePopoverModifiers && !!el.$_closePopoverModifiers.all;
  }
}
function onTouchCancel(event) {
  const el = event.currentTarget;
  el.$_vclosepopover_touch = false;
}
var PrivateVClosePopper = {
  beforeMount(el, { value, modifiers }) {
    el.$_closePopoverModifiers = modifiers;
    if (typeof value === "undefined" || value) {
      addListeners(el);
    }
  },
  updated(el, { value, oldValue, modifiers }) {
    el.$_closePopoverModifiers = modifiers;
    if (value !== oldValue) {
      if (typeof value === "undefined" || value) {
        addListeners(el);
      } else {
        removeListeners(el);
      }
    }
  },
  beforeUnmount(el) {
    removeListeners(el);
  }
};
const VTooltip = PrivateVTooltip;
const Dropdown = _sfc_main$3$1;
function install(app, options2 = {}) {
  if (app.$_vTooltipInstalled)
    return;
  app.$_vTooltipInstalled = true;
  assign$2(config$1, options2);
  app.directive("tooltip", PrivateVTooltip);
  app.directive("close-popper", PrivateVClosePopper);
  app.component("VTooltip", _sfc_main$1$1);
  app.component("VDropdown", _sfc_main$3$1);
  app.component("VMenu", _sfc_main$2$1);
}
const plugin = {
  version: "2.0.0-beta.19",
  install,
  options: config$1
};
function noop$3() {
}
function assign$1(tar, src) {
  for (const k2 in src)
    tar[k2] = src[k2];
  return tar;
}
function add_location(element2, file, line, column, char) {
  element2.__svelte_meta = {
    loc: { file, line, column, char }
  };
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object" || typeof a2 === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i2 = 0; i2 < len; i2 += 1) {
        merged[i2] = $$scope.dirty[i2] | lets[i2];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i2 = 0; i2 < length; i2++) {
      dirty[i2] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k2 in props)
    if (k2[0] !== "$")
      result[k2] = props[k2];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k2 in props)
    if (!keys.has(k2) && k2[0] !== "$")
      rest[k2] = props[k2];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, cancelable, detail);
  return e2;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks2 = component.$$.callbacks[type];
    if (callbacks2) {
      const event = custom_event(type, detail, { cancelable });
      callbacks2.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i2 = 0; i2 < render_callbacks.length; i2 += 1) {
      const callback = render_callbacks[i2];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i2 = levels.length;
  while (i2--) {
    const o = levels[i2];
    const n2 = updates[i2];
    if (n2) {
      for (const key in o) {
        if (!(key in n2))
          to_null_out[key] = 1;
      }
      for (const key in n2) {
        if (!accounted_for[key]) {
          update2[key] = n2[key];
          accounted_for[key] = 1;
        }
      }
      levels[i2] = n2;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index2 = component.$$.props[name];
  if (index2 !== void 0) {
    component.$$.bound[index2] = callback;
    callback(component.$$.ctx[index2]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i2) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i2 / 31 | 0] |= 1 << i2 % 31;
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop$3,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, (i2, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i2], $$.ctx[i2] = value)) {
      if (!$$.skip_bound && $$.bound[i2])
        $$.bound[i2](value);
      if (ready)
        make_dirty(component, i2);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop$3;
  }
  $on(type, callback) {
    const callbacks2 = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks2.push(callback);
    return () => {
      const index2 = callbacks2.indexOf(callback);
      if (index2 !== -1)
        callbacks2.splice(index2, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({ version: "3.49.0" }, detail), { bubbles: true }));
}
function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", { target, node });
  append(target, node);
}
function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", { target, node, anchor });
  insert(target, node, anchor);
}
function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", { node });
  detach(node);
}
function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null)
    dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
  else
    dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
}
function set_data_dev(text2, data) {
  data = "" + data;
  if (text2.wholeText === data)
    return;
  dispatch_dev("SvelteDOMSetData", { node: text2, data });
  text2.data = data;
}
function validate_slots(name, slot, keys) {
  for (const slot_key of Object.keys(slot)) {
    if (!~keys.indexOf(slot_key)) {
      console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
    }
  }
}
class SvelteComponentDev extends SvelteComponent {
  constructor(options) {
    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }
    super();
  }
  $destroy() {
    super.$destroy();
    this.$destroy = () => {
      console.warn("Component was already destroyed");
    };
  }
  $capture_state() {
  }
  $inject_state() {
  }
}
var i = /* @__PURE__ */ new Map([["align-self", "-ms-grid-row-align"], ["color-adjust", "-webkit-print-color-adjust"], ["column-gap", "grid-column-gap"], ["forced-color-adjust", "-ms-high-contrast-adjust"], ["gap", "grid-gap"], ["grid-template-columns", "-ms-grid-columns"], ["grid-template-rows", "-ms-grid-rows"], ["justify-self", "-ms-grid-column-align"], ["margin-inline-end", "-webkit-margin-end"], ["margin-inline-start", "-webkit-margin-start"], ["mask-border", "-webkit-mask-box-image"], ["mask-border-outset", "-webkit-mask-box-image-outset"], ["mask-border-slice", "-webkit-mask-box-image-slice"], ["mask-border-source", "-webkit-mask-box-image-source"], ["mask-border-repeat", "-webkit-mask-box-image-repeat"], ["mask-border-width", "-webkit-mask-box-image-width"], ["overflow-wrap", "word-wrap"], ["padding-inline-end", "-webkit-padding-end"], ["padding-inline-start", "-webkit-padding-start"], ["print-color-adjust", "color-adjust"], ["row-gap", "grid-row-gap"], ["scroll-margin-bottom", "scroll-snap-margin-bottom"], ["scroll-margin-left", "scroll-snap-margin-left"], ["scroll-margin-right", "scroll-snap-margin-right"], ["scroll-margin-top", "scroll-snap-margin-top"], ["scroll-margin", "scroll-snap-margin"], ["text-combine-upright", "-ms-text-combine-horizontal"]]);
function r$1(r2) {
  return i.get(r2);
}
function a$1(i2) {
  var r2 = /^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(i2);
  return r2 ? r2[1] ? 1 : r2[2] ? 2 : r2[3] ? 3 : 5 : 0;
}
function t$1(i2, r2) {
  var a2 = /^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(i2);
  return a2 ? a2[1] ? /^sti/i.test(r2) ? 1 : 0 : a2[2] ? /^pat/i.test(r2) ? 1 : 0 : a2[3] ? /^image-/i.test(r2) ? 1 : 0 : a2[4] ? "-" === r2[3] ? 2 : 0 : /^(?:inline-)?grid$/i.test(r2) ? 4 : 0 : 0;
}
var includes$1 = (value, search) => !!~value.indexOf(search);
var join$1 = (parts, separator2 = "-") => parts.join(separator2);
var joinTruthy = (parts, separator2) => join$1(parts.filter(Boolean), separator2);
var tail = (array, startIndex = 1) => array.slice(startIndex);
var identity = (value) => value;
var noop$2 = () => {
};
var capitalize = (value) => value[0].toUpperCase() + tail(value);
var hyphenate$1 = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
var evalThunk$1 = (value, context) => {
  while (typeof value == "function") {
    value = value(context);
  }
  return value;
};
var ensureMaxSize = (map2, max2) => {
  if (map2.size > max2) {
    map2.delete(map2.keys().next().value);
  }
};
var isCSSProperty$1 = (key, value) => !includes$1("@:&", key[0]) && (includes$1("rg", (typeof value)[5]) || Array.isArray(value));
var merge$1 = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
  const value = evalThunk$1(source[key], context);
  if (isCSSProperty$1(key, value)) {
    target2[hyphenate$1(key)] = value;
  } else {
    target2[key] = key[0] == "@" && includes$1("figa", key[1]) ? (target2[key] || []).concat(value) : merge$1(target2[key] || {}, value, context);
  }
  return target2;
}, target) : target;
var escape = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
var buildMediaQuery = (screen) => {
  if (!Array.isArray(screen)) {
    screen = [screen];
  }
  return "@media " + join$1(screen.map((screen2) => {
    if (typeof screen2 == "string") {
      screen2 = { min: screen2 };
    }
    return screen2.raw || join$1(Object.keys(screen2).map((feature) => `(${feature}-width:${screen2[feature]})`), " and ");
  }), ",");
};
var cyrb32 = (value) => {
  for (var h2 = 9, index2 = value.length; index2--; ) {
    h2 = Math.imul(h2 ^ value.charCodeAt(index2), 1597334677);
  }
  return "tw-" + ((h2 ^ h2 >>> 9) >>> 0).toString(36);
};
var sortedInsertionIndex = (array, element2) => {
  for (var low = 0, high = array.length; low < high; ) {
    const pivot = high + low >> 1;
    if (array[pivot] <= element2) {
      low = pivot + 1;
    } else {
      high = pivot;
    }
  }
  return high;
};
var groupings;
var rules;
var startGrouping = (value = "") => {
  groupings.push(value);
  return "";
};
var endGrouping = (isWhitespace) => {
  groupings.length = Math.max(groupings.lastIndexOf("") + ~~isWhitespace, 0);
};
var onlyPrefixes = (s) => s && !includes$1("!:", s[0]);
var onlyVariants = (s) => s[0] == ":";
var addRule = (directive2, negate) => {
  rules.push({
    v: groupings.filter(onlyVariants),
    d: directive2,
    n: negate,
    i: includes$1(groupings, "!"),
    $: ""
  });
};
var saveRule = (buffer2) => {
  const negate = buffer2[0] == "-";
  if (negate) {
    buffer2 = tail(buffer2);
  }
  const prefix = join$1(groupings.filter(onlyPrefixes));
  addRule(buffer2 == "&" ? prefix : (prefix && prefix + "-") + buffer2, negate);
  return "";
};
var parseString = (token, isVariant) => {
  let buffer2 = "";
  for (let char, dynamic = false, position2 = 0; char = token[position2++]; ) {
    if (dynamic || char == "[") {
      buffer2 += char;
      dynamic = char != "]";
      continue;
    }
    switch (char) {
      case ":":
        buffer2 = buffer2 && startGrouping(":" + (token[position2] == char ? token[position2++] : "") + buffer2);
        break;
      case "(":
        buffer2 = buffer2 && startGrouping(buffer2);
        startGrouping();
        break;
      case "!":
        startGrouping(char);
        break;
      case ")":
      case " ":
      case "	":
      case "\n":
      case "\r":
        buffer2 = buffer2 && saveRule(buffer2);
        endGrouping(char !== ")");
        break;
      default:
        buffer2 += char;
    }
  }
  if (buffer2) {
    if (isVariant) {
      startGrouping(":" + buffer2);
    } else if (buffer2.slice(-1) == "-") {
      startGrouping(buffer2.slice(0, -1));
    } else {
      saveRule(buffer2);
    }
  }
};
var parseGroupedToken = (token) => {
  startGrouping();
  parseToken(token);
  endGrouping();
};
var parseGroup = (key, token) => {
  if (token) {
    startGrouping();
    const isVariant = includes$1("tbu", (typeof token)[1]);
    parseString(key, isVariant);
    if (isVariant) {
      parseGroupedToken(token);
    }
    endGrouping();
  }
};
var parseToken = (token) => {
  switch (typeof token) {
    case "string":
      parseString(token);
      break;
    case "function":
      addRule(token);
      break;
    case "object":
      if (Array.isArray(token)) {
        token.forEach(parseGroupedToken);
      } else if (token) {
        Object.keys(token).forEach((key) => {
          parseGroup(key, token[key]);
        });
      }
  }
};
var staticsCaches = /* @__PURE__ */ new WeakMap();
var buildStatics = (strings) => {
  let statics = staticsCaches.get(strings);
  if (!statics) {
    let slowModeIndex = NaN;
    let buffer2 = "";
    statics = strings.map((token, index2) => {
      if (slowModeIndex !== slowModeIndex && (token.slice(-1) == "[" || includes$1(":-(", (strings[index2 + 1] || "")[0]))) {
        slowModeIndex = index2;
      }
      if (index2 >= slowModeIndex) {
        return (interpolation) => {
          if (index2 == slowModeIndex) {
            buffer2 = "";
          }
          buffer2 += token;
          if (includes$1("rg", (typeof interpolation)[5])) {
            buffer2 += interpolation;
          } else if (interpolation) {
            parseString(buffer2);
            buffer2 = "";
            parseToken(interpolation);
          }
          if (index2 == strings.length - 1) {
            parseString(buffer2);
          }
        };
      }
      const staticRules = rules = [];
      parseString(token);
      const activeGroupings = [...groupings];
      rules = [];
      return (interpolation) => {
        rules.push(...staticRules);
        groupings = [...activeGroupings];
        if (interpolation) {
          parseToken(interpolation);
        }
      };
    });
    staticsCaches.set(strings, statics);
  }
  return statics;
};
var parse$2 = (tokens) => {
  groupings = [];
  rules = [];
  if (Array.isArray(tokens[0]) && Array.isArray(tokens[0].raw)) {
    buildStatics(tokens[0]).forEach((apply2, index2) => apply2(tokens[index2 + 1]));
  } else {
    parseToken(tokens);
  }
  return rules;
};
var isFunctionFree;
var detectFunction = (key, value) => {
  if (typeof value == "function") {
    isFunctionFree = false;
  }
  return value;
};
var stringify = (data) => {
  isFunctionFree = true;
  const key = JSON.stringify(data, detectFunction);
  return isFunctionFree && key;
};
var cacheByFactory = /* @__PURE__ */ new WeakMap();
var directive = (factory, data) => {
  const key = stringify(data);
  let directive2;
  if (key) {
    var cache2 = cacheByFactory.get(factory);
    if (!cache2) {
      cacheByFactory.set(factory, cache2 = /* @__PURE__ */ new Map());
    }
    directive2 = cache2.get(key);
  }
  if (!directive2) {
    directive2 = Object.defineProperty((params, context) => {
      context = Array.isArray(params) ? context : params;
      return evalThunk$1(factory(data, context), context);
    }, "toJSON", {
      value: () => key || data
    });
    if (cache2) {
      cache2.set(key, directive2);
      ensureMaxSize(cache2, 1e4);
    }
  }
  return directive2;
};
var applyFactory = (tokens, { css }) => css(parse$2(tokens));
var apply = (...tokens) => directive(applyFactory, tokens);
var positions = (resolve2) => (value, position2, prefix, suffix) => {
  if (value) {
    const properties = position2 && resolve2(position2);
    if (properties && properties.length > 0) {
      return properties.reduce((declarations, property2) => {
        declarations[joinTruthy([prefix, property2, suffix])] = value;
        return declarations;
      }, {});
    }
  }
};
var corners = /* @__PURE__ */ positions((key) => ({
  t: ["top-left", "top-right"],
  r: ["top-right", "bottom-right"],
  b: ["bottom-left", "bottom-right"],
  l: ["bottom-left", "top-left"],
  tl: ["top-left"],
  tr: ["top-right"],
  bl: ["bottom-left"],
  br: ["bottom-right"]
})[key]);
var expandEdges = (key) => {
  const parts = ({ x: "lr", y: "tb" }[key] || key || "").split("").sort();
  for (let index2 = parts.length; index2--; ) {
    if (!(parts[index2] = {
      t: "top",
      r: "right",
      b: "bottom",
      l: "left"
    }[parts[index2]]))
      return;
  }
  if (parts.length)
    return parts;
};
var edges = /* @__PURE__ */ positions(expandEdges);
var stringifyVariant = (selector, variant) => selector + (variant[1] == ":" ? tail(variant, 2) + ":" : tail(variant)) + ":";
var stringifyRule = (rule, directive2 = rule.d) => typeof directive2 == "function" ? "" : rule.v.reduce(stringifyVariant, "") + (rule.i ? "!" : "") + (rule.n ? "-" : "") + directive2;
var _;
var __;
var $;
var toColumnsOrRows = (x2) => x2 == "cols" ? "columns" : "rows";
var property = (property2) => (params, context, id) => ({
  [property2]: id + ((_ = join$1(params)) && "-" + _)
});
var propertyValue = (property2, separator2) => (params, context, id) => (_ = join$1(params, separator2)) && {
  [property2 || id]: _
};
var themeProperty = (section) => (params, { theme: theme2 }, id) => (_ = theme2(section || id, params)) && {
  [section || id]: _
};
var themePropertyFallback = (section, separator2) => (params, { theme: theme2 }, id) => (_ = theme2(section || id, params, join$1(params, separator2))) && {
  [section || id]: _
};
var alias = (handler, name) => (params, context) => handler(params, context, name);
var display = property("display");
var position = property("position");
var textTransform = property("textTransform");
var textDecoration = property("textDecoration");
var fontStyle = property("fontStyle");
var fontVariantNumeric = (key) => (params, context, id) => ({
  ["--tw-" + key]: id,
  fontVariantNumeric: "var(--tw-ordinal,/*!*/ /*!*/) var(--tw-slashed-zero,/*!*/ /*!*/) var(--tw-numeric-figure,/*!*/ /*!*/) var(--tw-numeric-spacing,/*!*/ /*!*/) var(--tw-numeric-fraction,/*!*/ /*!*/)"
});
var inset = (params, { theme: theme2 }, id) => (_ = theme2("inset", params)) && { [id]: _ };
var opacityProperty = (params, theme2, id, section = id) => (_ = theme2(section + "Opacity", tail(params))) && {
  [`--tw-${id}-opacity`]: _
};
var parseColorComponent = (chars, factor) => Math.round(parseInt(chars, 16) * factor);
var asRGBA = (color, opacityProperty2, opacityDefault) => {
  if (color && color[0] == "#" && (_ = (color.length - 1) / 3) && ($ = [17, 1, 0.062272][_ - 1])) {
    return `rgba(${parseColorComponent(color.substr(1, _), $)},${parseColorComponent(color.substr(1 + _, _), $)},${parseColorComponent(color.substr(1 + 2 * _, _), $)},${opacityProperty2 ? `var(--tw-${opacityProperty2}${opacityDefault ? "," + opacityDefault : ""})` : opacityDefault || 1})`;
  }
  return color;
};
var withOpacityFallback = (property2, kind, color) => color && typeof color == "string" ? (_ = asRGBA(color, kind + "-opacity")) && _ !== color ? {
  [`--tw-${kind}-opacity`]: "1",
  [property2]: [color, _]
} : { [property2]: color } : void 0;
var transparentTo = (color) => ($ = asRGBA(color, "", "0")) == _ ? "transparent" : $;
var reversableEdge = (params, { theme: theme2 }, id, section, prefix, suffix) => (_ = { x: ["right", "left"], y: ["bottom", "top"] }[params[0]]) && ($ = `--tw-${id}-${params[0]}-reverse`) ? params[1] == "reverse" ? {
  [$]: "1"
} : {
  [$]: "0",
  [joinTruthy([prefix, _[0], suffix])]: (__ = theme2(section, tail(params))) && `calc(${__} * var(${$}))`,
  [joinTruthy([prefix, _[1], suffix])]: __ && [__, `calc(${__} * calc(1 - var(${$})))`]
} : void 0;
var placeHelper = (property2, params) => params[0] && {
  [property2]: (includes$1("wun", (params[0] || "")[3]) ? "space-" : "") + params[0]
};
var contentPluginFor = (property2) => (params) => includes$1(["start", "end"], params[0]) ? { [property2]: "flex-" + params[0] } : placeHelper(property2, params);
var gridPlugin = (kind) => (params, { theme: theme2 }) => {
  if (_ = theme2("grid" + capitalize(kind), params, "")) {
    return { ["grid-" + kind]: _ };
  }
  switch (params[0]) {
    case "span":
      return params[1] && {
        ["grid-" + kind]: `span ${params[1]} / span ${params[1]}`
      };
    case "start":
    case "end":
      return (_ = theme2("grid" + capitalize(kind) + capitalize(params[0]), tail(params), join$1(tail(params)))) && {
        [`grid-${kind}-${params[0]}`]: _
      };
  }
};
var border = (params, { theme: theme2 }, id) => {
  switch (params[0]) {
    case "solid":
    case "dashed":
    case "dotted":
    case "double":
    case "none":
      return propertyValue("borderStyle")(params);
    case "collapse":
    case "separate":
      return propertyValue("borderCollapse")(params);
    case "opacity":
      return opacityProperty(params, theme2, id);
  }
  return (_ = theme2(id + "Width", params, "")) ? { borderWidth: _ } : withOpacityFallback("borderColor", id, theme2(id + "Color", params));
};
var transform = (gpu) => (gpu ? "translate3d(var(--tw-translate-x,0),var(--tw-translate-y,0),0)" : "translateX(var(--tw-translate-x,0)) translateY(var(--tw-translate-y,0))") + " rotate(var(--tw-rotate,0)) skewX(var(--tw-skew-x,0)) skewY(var(--tw-skew-y,0)) scaleX(var(--tw-scale-x,1)) scaleY(var(--tw-scale-y,1))";
var transformXYFunction = (params, context, id) => params[0] && (_ = context.theme(id, params[1] || params[0])) && {
  [`--tw-${id}-x`]: params[0] !== "y" && _,
  [`--tw-${id}-y`]: params[0] !== "x" && _,
  transform: [`${id}${params[1] ? params[0].toUpperCase() : ""}(${_})`, transform()]
};
var edgesPluginFor = (key) => (params, context, id) => id[1] ? edges(context.theme(key, params), id[1], key) : themeProperty(key)(params, context, id);
var padding = edgesPluginFor("padding");
var margin = edgesPluginFor("margin");
var minMax = (params, { theme: theme2 }, id) => (_ = { w: "width", h: "height" }[params[0]]) && {
  [_ = `${id}${capitalize(_)}`]: theme2(_, tail(params))
};
var filter = (params, { theme: theme2 }, id) => {
  const parts = id.split("-");
  const prefix = parts[0] == "backdrop" ? parts[0] + "-" : "";
  if (!prefix) {
    params.unshift(...parts);
  }
  if (params[0] == "filter") {
    const filters = [
      "blur",
      "brightness",
      "contrast",
      "grayscale",
      "hue-rotate",
      "invert",
      prefix && "opacity",
      "saturate",
      "sepia",
      !prefix && "drop-shadow"
    ].filter(Boolean);
    return params[1] == "none" ? { [prefix + "filter"]: "none" } : filters.reduce((css, key) => {
      css["--tw-" + prefix + key] = "var(--tw-empty,/*!*/ /*!*/)";
      return css;
    }, {
      [prefix + "filter"]: filters.map((key) => `var(--tw-${prefix}${key})`).join(" ")
    });
  }
  $ = params.shift();
  if (includes$1(["hue", "drop"], $))
    $ += capitalize(params.shift());
  return (_ = theme2(prefix ? "backdrop" + capitalize($) : $, params)) && {
    ["--tw-" + prefix + $]: (Array.isArray(_) ? _ : [_]).map((_4) => `${hyphenate$1($)}(${_4})`).join(" ")
  };
};
var corePlugins = {
  group: (params, { tag }, id) => tag(join$1([id, ...params])),
  hidden: alias(display, "none"),
  inline: display,
  block: display,
  contents: display,
  flow: display,
  table: (params, context, id) => includes$1(["auto", "fixed"], params[0]) ? { tableLayout: params[0] } : display(params, context, id),
  flex(params, context, id) {
    switch (params[0]) {
      case "row":
      case "col":
        return {
          flexDirection: join$1(params[0] == "col" ? ["column", ...tail(params)] : params)
        };
      case "nowrap":
      case "wrap":
        return { flexWrap: join$1(params) };
      case "grow":
      case "shrink":
        _ = context.theme("flex" + capitalize(params[0]), tail(params), params[1] || 1);
        return _ != null && {
          ["flex-" + params[0]]: "" + _
        };
    }
    return (_ = context.theme("flex", params, "")) ? { flex: _ } : display(params, context, id);
  },
  grid(params, context, id) {
    switch (params[0]) {
      case "cols":
      case "rows":
        return (_ = context.theme("gridTemplate" + capitalize(toColumnsOrRows(params[0])), tail(params), params.length == 2 && Number(params[1]) ? `repeat(${params[1]},minmax(0,1fr))` : join$1(tail(params)))) && {
          ["gridTemplate-" + toColumnsOrRows(params[0])]: _
        };
      case "flow":
        return params.length > 1 && {
          gridAutoFlow: join$1(params[1] == "col" ? ["column", ...tail(params, 2)] : tail(params), " ")
        };
    }
    return display(params, context, id);
  },
  auto: (params, { theme: theme2 }) => includes$1(["cols", "rows"], params[0]) && (_ = theme2("gridAuto" + capitalize(toColumnsOrRows(params[0])), tail(params), join$1(tail(params)))) && {
    ["gridAuto-" + toColumnsOrRows(params[0])]: _
  },
  static: position,
  fixed: position,
  absolute: position,
  relative: position,
  sticky: position,
  visible: { visibility: "visible" },
  invisible: { visibility: "hidden" },
  antialiased: {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale"
  },
  "subpixel-antialiased": {
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto"
  },
  truncate: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  "sr-only": {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    clip: "rect(0,0,0,0)",
    borderWidth: "0"
  },
  "not-sr-only": {
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    whiteSpace: "normal",
    clip: "auto"
  },
  resize: (params) => ({
    resize: { x: "horizontal", y: "vertical" }[params[0]] || params[0] || "both"
  }),
  box: (params) => params[0] && { boxSizing: params[0] + "-box" },
  appearance: propertyValue(),
  cursor: themePropertyFallback(),
  float: propertyValue(),
  clear: propertyValue(),
  decoration: propertyValue("boxDecorationBreak"),
  isolate: { isolation: "isolate" },
  isolation: propertyValue(),
  "mix-blend": propertyValue("mixBlendMode"),
  top: inset,
  right: inset,
  bottom: inset,
  left: inset,
  inset: (params, { theme: theme2 }) => (_ = expandEdges(params[0])) ? edges(theme2("inset", tail(params)), params[0]) : (_ = theme2("inset", params)) && {
    top: _,
    right: _,
    bottom: _,
    left: _
  },
  underline: textDecoration,
  "line-through": textDecoration,
  "no-underline": alias(textDecoration, "none"),
  "text-underline": alias(textDecoration, "underline"),
  "text-no-underline": alias(textDecoration, "none"),
  "text-line-through": alias(textDecoration, "line-through"),
  uppercase: textTransform,
  lowercase: textTransform,
  capitalize: textTransform,
  "normal-case": alias(textTransform, "none"),
  "text-normal-case": alias(textTransform, "none"),
  italic: fontStyle,
  "not-italic": alias(fontStyle, "normal"),
  "font-italic": alias(fontStyle, "italic"),
  "font-not-italic": alias(fontStyle, "normal"),
  font: (params, context, id) => (_ = context.theme("fontFamily", params, "")) ? { fontFamily: _ } : themeProperty("fontWeight")(params, context, id),
  items: (params) => params[0] && {
    alignItems: includes$1(["start", "end"], params[0]) ? "flex-" + params[0] : join$1(params)
  },
  "justify-self": propertyValue(),
  "justify-items": propertyValue(),
  justify: contentPluginFor("justifyContent"),
  content: contentPluginFor("alignContent"),
  self: contentPluginFor("alignSelf"),
  place: (params) => params[0] && placeHelper("place-" + params[0], tail(params)),
  overscroll: (params) => params[0] && {
    ["overscrollBehavior" + (params[1] ? "-" + params[0] : "")]: params[1] || params[0]
  },
  col: gridPlugin("column"),
  row: gridPlugin("row"),
  duration: themeProperty("transitionDuration"),
  delay: themeProperty("transitionDelay"),
  tracking: themeProperty("letterSpacing"),
  leading: themeProperty("lineHeight"),
  z: themeProperty("zIndex"),
  opacity: themeProperty(),
  ease: themeProperty("transitionTimingFunction"),
  p: padding,
  py: padding,
  px: padding,
  pt: padding,
  pr: padding,
  pb: padding,
  pl: padding,
  m: margin,
  my: margin,
  mx: margin,
  mt: margin,
  mr: margin,
  mb: margin,
  ml: margin,
  w: themeProperty("width"),
  h: themeProperty("height"),
  min: minMax,
  max: minMax,
  fill: themeProperty(),
  order: themeProperty(),
  origin: themePropertyFallback("transformOrigin", " "),
  select: propertyValue("userSelect"),
  "pointer-events": propertyValue(),
  align: propertyValue("verticalAlign"),
  whitespace: propertyValue("whiteSpace"),
  "normal-nums": { fontVariantNumeric: "normal" },
  ordinal: fontVariantNumeric("ordinal"),
  "slashed-zero": fontVariantNumeric("slashed-zero"),
  "lining-nums": fontVariantNumeric("numeric-figure"),
  "oldstyle-nums": fontVariantNumeric("numeric-figure"),
  "proportional-nums": fontVariantNumeric("numeric-spacing"),
  "tabular-nums": fontVariantNumeric("numeric-spacing"),
  "diagonal-fractions": fontVariantNumeric("numeric-fraction"),
  "stacked-fractions": fontVariantNumeric("numeric-fraction"),
  overflow: (params, context, id) => includes$1(["ellipsis", "clip"], params[0]) ? propertyValue("textOverflow")(params) : params[1] ? { ["overflow-" + params[0]]: params[1] } : propertyValue()(params, context, id),
  transform: (params) => params[0] == "none" ? { transform: "none" } : {
    "--tw-translate-x": "0",
    "--tw-translate-y": "0",
    "--tw-rotate": "0",
    "--tw-skew-x": "0",
    "--tw-skew-y": "0",
    "--tw-scale-x": "1",
    "--tw-scale-y": "1",
    transform: transform(params[0] == "gpu")
  },
  rotate: (params, { theme: theme2 }) => (_ = theme2("rotate", params)) && {
    "--tw-rotate": _,
    transform: [`rotate(${_})`, transform()]
  },
  scale: transformXYFunction,
  translate: transformXYFunction,
  skew: transformXYFunction,
  gap: (params, context, id) => (_ = { x: "column", y: "row" }[params[0]]) ? { [_ + "Gap"]: context.theme("gap", tail(params)) } : themeProperty("gap")(params, context, id),
  stroke: (params, context, id) => (_ = context.theme("stroke", params, "")) ? { stroke: _ } : themeProperty("strokeWidth")(params, context, id),
  outline: (params, { theme: theme2 }) => (_ = theme2("outline", params)) && {
    outline: _[0],
    outlineOffset: _[1]
  },
  "break-normal": {
    wordBreak: "normal",
    overflowWrap: "normal"
  },
  "break-words": { overflowWrap: "break-word" },
  "break-all": { wordBreak: "break-all" },
  text(params, { theme: theme2 }, id) {
    switch (params[0]) {
      case "left":
      case "center":
      case "right":
      case "justify":
        return { textAlign: params[0] };
      case "uppercase":
      case "lowercase":
      case "capitalize":
        return textTransform([], _, params[0]);
      case "opacity":
        return opacityProperty(params, theme2, id);
    }
    const fontSize = theme2("fontSize", params, "");
    if (fontSize) {
      return typeof fontSize == "string" ? { fontSize } : {
        fontSize: fontSize[0],
        ...typeof fontSize[1] == "string" ? { lineHeight: fontSize[1] } : fontSize[1]
      };
    }
    return withOpacityFallback("color", "text", theme2("textColor", params));
  },
  bg(params, { theme: theme2 }, id) {
    switch (params[0]) {
      case "fixed":
      case "local":
      case "scroll":
        return propertyValue("backgroundAttachment", ",")(params);
      case "bottom":
      case "center":
      case "left":
      case "right":
      case "top":
        return propertyValue("backgroundPosition", " ")(params);
      case "no":
        return params[1] == "repeat" && propertyValue("backgroundRepeat")(params);
      case "repeat":
        return includes$1("xy", params[1]) ? propertyValue("backgroundRepeat")(params) : { backgroundRepeat: params[1] || params[0] };
      case "opacity":
        return opacityProperty(params, theme2, id, "background");
      case "clip":
      case "origin":
        return params[1] && {
          ["background-" + params[0]]: params[1] + (params[1] == "text" ? "" : "-box")
        };
      case "blend":
        return propertyValue("background-blend-mode")(tail(params));
      case "gradient":
        if (params[1] == "to" && (_ = expandEdges(params[2]))) {
          return {
            backgroundImage: `linear-gradient(to ${join$1(_, " ")},var(--tw-gradient-stops))`
          };
        }
    }
    return (_ = theme2("backgroundPosition", params, "")) ? { backgroundPosition: _ } : (_ = theme2("backgroundSize", params, "")) ? { backgroundSize: _ } : (_ = theme2("backgroundImage", params, "")) ? { backgroundImage: _ } : withOpacityFallback("backgroundColor", "bg", theme2("backgroundColor", params));
  },
  from: (params, { theme: theme2 }) => (_ = theme2("gradientColorStops", params)) && {
    "--tw-gradient-from": _,
    "--tw-gradient-stops": `var(--tw-gradient-from),var(--tw-gradient-to,${transparentTo(_)})`
  },
  via: (params, { theme: theme2 }) => (_ = theme2("gradientColorStops", params)) && {
    "--tw-gradient-stops": `var(--tw-gradient-from),${_},var(--tw-gradient-to,${transparentTo(_)})`
  },
  to: (params, { theme: theme2 }) => (_ = theme2("gradientColorStops", params)) && {
    "--tw-gradient-to": _
  },
  border: (params, context, id) => expandEdges(params[0]) ? edges(context.theme("borderWidth", tail(params)), params[0], "border", "width") : border(params, context, id),
  divide: (params, context, id) => (_ = reversableEdge(params, context, id, "divideWidth", "border", "width") || border(params, context, id)) && {
    "&>:not([hidden])~:not([hidden])": _
  },
  space: (params, context, id) => (_ = reversableEdge(params, context, id, "space", "margin")) && {
    "&>:not([hidden])~:not([hidden])": _
  },
  placeholder: (params, { theme: theme2 }, id) => (_ = params[0] == "opacity" ? opacityProperty(params, theme2, id) : withOpacityFallback("color", "placeholder", theme2("placeholderColor", params))) && {
    "&::placeholder": _
  },
  shadow: (params, { theme: theme2 }) => (_ = theme2("boxShadow", params)) && {
    ":global": {
      "*": {
        "--tw-shadow": "0 0 transparent"
      }
    },
    "--tw-shadow": _ == "none" ? "0 0 transparent" : _,
    boxShadow: [
      _,
      `var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)`
    ]
  },
  animate: (params, { theme: theme2, tag }) => {
    if ($ = theme2("animation", params)) {
      const parts = $.split(" ");
      if ((_ = theme2("keyframes", parts[0], __ = {})) !== __) {
        return ($ = tag(parts[0])) && {
          animation: $ + " " + join$1(tail(parts), " "),
          ["@keyframes " + $]: _
        };
      }
      return { animation: $ };
    }
  },
  ring(params, { theme: theme2 }, id) {
    switch (params[0]) {
      case "inset":
        return { "--tw-ring-inset": "inset" };
      case "opacity":
        return opacityProperty(params, theme2, id);
      case "offset":
        return (_ = theme2("ringOffsetWidth", tail(params), "")) ? {
          "--tw-ring-offset-width": _
        } : {
          "--tw-ring-offset-color": theme2("ringOffsetColor", tail(params))
        };
    }
    return (_ = theme2("ringWidth", params, "")) ? {
      "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
      "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${_} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
      boxShadow: `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)`,
      ":global": {
        "*": {
          "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
          "--tw-ring-offset-width": theme2("ringOffsetWidth", "", "0px"),
          "--tw-ring-offset-color": theme2("ringOffsetColor", "", "#fff"),
          "--tw-ring-color": asRGBA(theme2("ringColor", "", "#93c5fd"), "ring-opacity", theme2("ringOpacity", "", "0.5")),
          "--tw-ring-offset-shadow": "0 0 transparent",
          "--tw-ring-shadow": "0 0 transparent"
        }
      }
    } : {
      "--tw-ring-opacity": "1",
      "--tw-ring-color": asRGBA(theme2("ringColor", params), "ring-opacity")
    };
  },
  object: (params, context, id) => includes$1(["contain", "cover", "fill", "none", "scale-down"], join$1(params)) ? { objectFit: join$1(params) } : themePropertyFallback("objectPosition", " ")(params, context, id),
  list: (params, context, id) => join$1(params) == "item" ? display(params, context, id) : includes$1(["inside", "outside"], join$1(params)) ? { listStylePosition: params[0] } : themePropertyFallback("listStyleType")(params, context, id),
  rounded: (params, context, id) => corners(context.theme("borderRadius", tail(params), ""), params[0], "border", "radius") || themeProperty("borderRadius")(params, context, id),
  "transition-none": { transitionProperty: "none" },
  transition: (params, { theme: theme2 }) => ({
    transitionProperty: theme2("transitionProperty", params),
    transitionTimingFunction: theme2("transitionTimingFunction", ""),
    transitionDuration: theme2("transitionDuration", "")
  }),
  container: (params, { theme: theme2 }) => {
    const { screens = theme2("screens"), center, padding: padding2 } = theme2("container");
    const paddingFor = (screen) => (_ = padding2 && (typeof padding2 == "string" ? padding2 : padding2[screen] || padding2.DEFAULT)) ? {
      paddingRight: _,
      paddingLeft: _
    } : {};
    return Object.keys(screens).reduce((rules2, screen) => {
      if (($ = screens[screen]) && typeof $ == "string") {
        rules2[buildMediaQuery($)] = {
          "&": {
            "max-width": $,
            ...paddingFor(screen)
          }
        };
      }
      return rules2;
    }, {
      width: "100%",
      ...center ? { marginRight: "auto", marginLeft: "auto" } : {},
      ...paddingFor("xs")
    });
  },
  filter,
  blur: filter,
  brightness: filter,
  contrast: filter,
  grayscale: filter,
  "hue-rotate": filter,
  invert: filter,
  saturate: filter,
  sepia: filter,
  "drop-shadow": filter,
  backdrop: filter
};
var createPreflight = (theme2) => ({
  ":root": { tabSize: 4 },
  "body,blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre,fieldset,ol,ul": { margin: "0" },
  button: { backgroundColor: "transparent", backgroundImage: "none" },
  'button,[type="button"],[type="reset"],[type="submit"]': { WebkitAppearance: "button" },
  "button:focus": { outline: ["1px dotted", "5px auto -webkit-focus-ring-color"] },
  "fieldset,ol,ul,legend": { padding: "0" },
  "ol,ul": { listStyle: "none" },
  html: {
    lineHeight: "1.5",
    WebkitTextSizeAdjust: "100%",
    fontFamily: theme2("fontFamily.sans", "ui-sans-serif,system-ui,sans-serif")
  },
  body: { fontFamily: "inherit", lineHeight: "inherit" },
  "*,::before,::after": {
    boxSizing: "border-box",
    border: `0 solid ${theme2("borderColor.DEFAULT", "currentColor")}`
  },
  hr: { height: "0", color: "inherit", borderTopWidth: "1px" },
  img: { borderStyle: "solid" },
  textarea: { resize: "vertical" },
  "input::placeholder,textarea::placeholder": {
    opacity: "1",
    color: theme2("placeholderColor.DEFAULT", theme2("colors.gray.400", "#a1a1aa"))
  },
  'button,[role="button"]': { cursor: "pointer" },
  table: { textIndent: "0", borderColor: "inherit", borderCollapse: "collapse" },
  "h1,h2,h3,h4,h5,h6": { fontSize: "inherit", fontWeight: "inherit" },
  a: { color: "inherit", textDecoration: "inherit" },
  "button,input,optgroup,select,textarea": {
    fontFamily: "inherit",
    fontSize: "100%",
    margin: "0",
    padding: "0",
    lineHeight: "inherit",
    color: "inherit"
  },
  "button,select": { textTransform: "none" },
  "::-moz-focus-inner": { borderStyle: "none", padding: "0" },
  ":-moz-focusring": { outline: "1px dotted ButtonText" },
  ":-moz-ui-invalid": { boxShadow: "none" },
  progress: { verticalAlign: "baseline" },
  "::-webkit-inner-spin-button,::-webkit-outer-spin-button": { height: "auto" },
  '[type="search"]': { WebkitAppearance: "textfield", outlineOffset: "-2px" },
  "::-webkit-search-decoration": { WebkitAppearance: "none" },
  "::-webkit-file-upload-button": { WebkitAppearance: "button", font: "inherit" },
  summary: { display: "list-item" },
  "abbr[title]": { textDecoration: "underline dotted" },
  "b,strong": { fontWeight: "bolder" },
  "pre,code,kbd,samp": {
    fontFamily: theme2("fontFamily", "mono", "ui-monospace,monospace"),
    fontSize: "1em"
  },
  "sub,sup": { fontSize: "75%", lineHeight: "0", position: "relative", verticalAlign: "baseline" },
  sub: { bottom: "-0.25em" },
  sup: { top: "-0.5em" },
  "img,svg,video,canvas,audio,iframe,embed,object": { display: "block", verticalAlign: "middle" },
  "img,video": { maxWidth: "100%", height: "auto" }
});
var coreVariants = {
  dark: "@media (prefers-color-scheme:dark)",
  sticky: "@supports ((position: -webkit-sticky) or (position:sticky))",
  "motion-reduce": "@media (prefers-reduced-motion:reduce)",
  "motion-safe": "@media (prefers-reduced-motion:no-preference)",
  first: "&:first-child",
  last: "&:last-child",
  even: "&:nth-child(2n)",
  odd: "&:nth-child(odd)",
  children: "&>*",
  siblings: "&~*",
  sibling: "&+*",
  override: "&&"
};
var STYLE_ELEMENT_ID = "__twind";
var getStyleElement = (nonce) => {
  let element2 = self[STYLE_ELEMENT_ID];
  if (!element2) {
    element2 = document.head.appendChild(document.createElement("style"));
    element2.id = STYLE_ELEMENT_ID;
    nonce && (element2.nonce = nonce);
    element2.appendChild(document.createTextNode(""));
  }
  return element2;
};
var cssomSheet = ({
  nonce,
  target = getStyleElement(nonce).sheet
} = {}) => {
  const offset2 = target.cssRules.length;
  return {
    target,
    insert: (rule, index2) => target.insertRule(rule, offset2 + index2)
  };
};
var voidSheet = () => ({
  target: null,
  insert: noop$2
});
var mode = (report) => ({
  unknown(section, key = [], optional, context) {
    if (!optional) {
      this.report({ id: "UNKNOWN_THEME_VALUE", key: section + "." + join$1(key) }, context);
    }
  },
  report({ id, ...info }) {
    return report(`[${id}] ${JSON.stringify(info)}`);
  }
});
var warn$1 = /* @__PURE__ */ mode((message) => console.warn(message));
var strict = /* @__PURE__ */ mode((message) => {
  throw new Error(message);
});
var silent = /* @__PURE__ */ mode(noop$2);
var noprefix = (property2, value, important) => `${property2}:${value}${important ? " !important" : ""}`;
var autoprefix = (property2, value, important) => {
  let cssText = "";
  const propertyAlias = r$1(property2);
  if (propertyAlias)
    cssText += `${noprefix(propertyAlias, value, important)};`;
  let flags = a$1(property2);
  if (flags & 1)
    cssText += `-webkit-${noprefix(property2, value, important)};`;
  if (flags & 2)
    cssText += `-moz-${noprefix(property2, value, important)};`;
  if (flags & 4)
    cssText += `-ms-${noprefix(property2, value, important)};`;
  flags = t$1(property2, value);
  if (flags & 1)
    cssText += `${noprefix(property2, `-webkit-${value}`, important)};`;
  if (flags & 2)
    cssText += `${noprefix(property2, `-moz-${value}`, important)};`;
  if (flags & 4)
    cssText += `${noprefix(property2, `-ms-${value}`, important)};`;
  cssText += noprefix(property2, value, important);
  return cssText;
};
var ratios = (start, end) => {
  const result = {};
  do {
    for (let dividend = 1; dividend < start; dividend++) {
      result[`${dividend}/${start}`] = Number((dividend / start * 100).toFixed(6)) + "%";
    }
  } while (++start <= end);
  return result;
};
var exponential = (stop, unit, start = 0) => {
  const result = {};
  for (; start <= stop; start = start * 2 || 1) {
    result[start] = start + unit;
  }
  return result;
};
var linear = (stop, unit = "", divideBy = 1, start = 0, step = 1, result = {}) => {
  for (; start <= stop; start += step) {
    result[start] = start / divideBy + unit;
  }
  return result;
};
var alias2 = (section) => (theme2) => theme2(section);
var defaultTheme = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },
  colors: {
    transparent: "transparent",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d"
    },
    yellow: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f"
    },
    green: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b"
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a"
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81"
    },
    purple: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95"
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843"
    }
  },
  spacing: {
    px: "1px",
    0: "0px",
    .../* @__PURE__ */ linear(4, "rem", 4, 0.5, 0.5),
    .../* @__PURE__ */ linear(12, "rem", 4, 5),
    14: "3.5rem",
    .../* @__PURE__ */ linear(64, "rem", 4, 16, 4),
    72: "18rem",
    80: "20rem",
    96: "24rem"
  },
  durations: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms"
  },
  animation: {
    none: "none",
    spin: "spin 1s linear infinite",
    ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    bounce: "bounce 1s infinite"
  },
  backdropBlur: /* @__PURE__ */ alias2("blur"),
  backdropBrightness: /* @__PURE__ */ alias2("brightness"),
  backdropContrast: /* @__PURE__ */ alias2("contrast"),
  backdropGrayscale: /* @__PURE__ */ alias2("grayscale"),
  backdropHueRotate: /* @__PURE__ */ alias2("hueRotate"),
  backdropInvert: /* @__PURE__ */ alias2("invert"),
  backdropOpacity: /* @__PURE__ */ alias2("opacity"),
  backdropSaturate: /* @__PURE__ */ alias2("saturate"),
  backdropSepia: /* @__PURE__ */ alias2("sepia"),
  backgroundColor: /* @__PURE__ */ alias2("colors"),
  backgroundImage: {
    none: "none"
  },
  backgroundOpacity: /* @__PURE__ */ alias2("opacity"),
  backgroundSize: {
    auto: "auto",
    cover: "cover",
    contain: "contain"
  },
  blur: {
    0: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px"
  },
  brightness: {
    .../* @__PURE__ */ linear(200, "", 100, 0, 50),
    .../* @__PURE__ */ linear(110, "", 100, 90, 5),
    75: "0.75",
    125: "1.25"
  },
  borderColor: (theme2) => ({
    ...theme2("colors"),
    DEFAULT: theme2("colors.gray.200", "currentColor")
  }),
  borderOpacity: /* @__PURE__ */ alias2("opacity"),
  borderRadius: {
    none: "0px",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "1/2": "50%",
    full: "9999px"
  },
  borderWidth: {
    DEFAULT: "1px",
    .../* @__PURE__ */ exponential(8, "px")
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
    none: "none"
  },
  contrast: {
    .../* @__PURE__ */ linear(200, "", 100, 0, 50),
    75: "0.75",
    125: "1.25"
  },
  divideColor: /* @__PURE__ */ alias2("borderColor"),
  divideOpacity: /* @__PURE__ */ alias2("borderOpacity"),
  divideWidth: /* @__PURE__ */ alias2("borderWidth"),
  dropShadow: {
    sm: "0 1px 1px rgba(0,0,0,0.05)",
    DEFAULT: ["0 1px 2px rgba(0,0,0,0.1)", "0 1px 1px rgba(0,0,0,0.06)"],
    md: ["0 4px 3px rgba(0,0,0,0.07)", "0 2px 2px rgba(0,0,0,0.06)"],
    lg: ["0 10px 8px rgba(0,0,0,0.04)", "0 4px 3px rgba(0,0,0,0.1)"],
    xl: ["0 20px 13px rgba(0,0,0,0.03)", "0 8px 5px rgba(0,0,0,0.08)"],
    "2xl": "0 25px 25px rgba(0,0,0,0.15)",
    none: "0 0 #0000"
  },
  fill: { current: "currentColor" },
  grayscale: {
    0: "0",
    DEFAULT: "100%"
  },
  hueRotate: {
    0: "0deg",
    15: "15deg",
    30: "30deg",
    60: "60deg",
    90: "90deg",
    180: "180deg"
  },
  invert: {
    0: "0",
    DEFAULT: "100%"
  },
  flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none"
  },
  fontFamily: {
    sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'.split(","),
    serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'.split(","),
    mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'.split(",")
  },
  fontSize: {
    xs: ["0.75rem", "1rem"],
    sm: ["0.875rem", "1.25rem"],
    base: ["1rem", "1.5rem"],
    lg: ["1.125rem", "1.75rem"],
    xl: ["1.25rem", "1.75rem"],
    "2xl": ["1.5rem", "2rem"],
    "3xl": ["1.875rem", "2.25rem"],
    "4xl": ["2.25rem", "2.5rem"],
    "5xl": ["3rem", "1"],
    "6xl": ["3.75rem", "1"],
    "7xl": ["4.5rem", "1"],
    "8xl": ["6rem", "1"],
    "9xl": ["8rem", "1"]
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  },
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridAutoColumns: {
    min: "min-content",
    max: "max-content",
    fr: "minmax(0,1fr)"
  },
  gridAutoRows: {
    min: "min-content",
    max: "max-content",
    fr: "minmax(0,1fr)"
  },
  gridColumn: {
    auto: "auto",
    "span-full": "1 / -1"
  },
  gridRow: {
    auto: "auto",
    "span-full": "1 / -1"
  },
  gap: /* @__PURE__ */ alias2("spacing"),
  gradientColorStops: /* @__PURE__ */ alias2("colors"),
  height: (theme2) => ({
    auto: "auto",
    ...theme2("spacing"),
    ...ratios(2, 6),
    full: "100%",
    screen: "100vh"
  }),
  inset: (theme2) => ({
    auto: "auto",
    ...theme2("spacing"),
    ...ratios(2, 4),
    full: "100%"
  }),
  keyframes: {
    spin: {
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(360deg)"
      }
    },
    ping: {
      "0%": {
        transform: "scale(1)",
        opacity: "1"
      },
      "75%,100%": {
        transform: "scale(2)",
        opacity: "0"
      }
    },
    pulse: {
      "0%,100%": {
        opacity: "1"
      },
      "50%": {
        opacity: ".5"
      }
    },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
      },
      "50%": {
        transform: "none",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
      }
    }
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    .../* @__PURE__ */ linear(10, "rem", 4, 3)
  },
  margin: (theme2) => ({
    auto: "auto",
    ...theme2("spacing")
  }),
  maxHeight: (theme2) => ({
    ...theme2("spacing"),
    full: "100%",
    screen: "100vh"
  }),
  maxWidth: (theme2, { breakpoints }) => ({
    none: "none",
    0: "0rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    full: "100%",
    min: "min-content",
    max: "max-content",
    prose: "65ch",
    ...breakpoints(theme2("screens"))
  }),
  minHeight: {
    0: "0px",
    full: "100%",
    screen: "100vh"
  },
  minWidth: {
    0: "0px",
    full: "100%",
    min: "min-content",
    max: "max-content"
  },
  opacity: {
    .../* @__PURE__ */ linear(100, "", 100, 0, 10),
    5: "0.05",
    25: "0.25",
    75: "0.75",
    95: "0.95"
  },
  order: {
    first: "-9999",
    last: "9999",
    none: "0",
    .../* @__PURE__ */ linear(12, "", 1, 1)
  },
  outline: {
    none: ["2px solid transparent", "2px"],
    white: ["2px dotted white", "2px"],
    black: ["2px dotted black", "2px"]
  },
  padding: /* @__PURE__ */ alias2("spacing"),
  placeholderColor: /* @__PURE__ */ alias2("colors"),
  placeholderOpacity: /* @__PURE__ */ alias2("opacity"),
  ringColor: (theme2) => ({
    DEFAULT: theme2("colors.blue.500", "#3b82f6"),
    ...theme2("colors")
  }),
  ringOffsetColor: /* @__PURE__ */ alias2("colors"),
  ringOffsetWidth: /* @__PURE__ */ exponential(8, "px"),
  ringOpacity: (theme2) => ({
    DEFAULT: "0.5",
    ...theme2("opacity")
  }),
  ringWidth: {
    DEFAULT: "3px",
    .../* @__PURE__ */ exponential(8, "px")
  },
  rotate: {
    .../* @__PURE__ */ exponential(2, "deg"),
    .../* @__PURE__ */ exponential(12, "deg", 3),
    .../* @__PURE__ */ exponential(180, "deg", 45)
  },
  saturate: /* @__PURE__ */ linear(200, "", 100, 0, 50),
  scale: {
    .../* @__PURE__ */ linear(150, "", 100, 0, 50),
    .../* @__PURE__ */ linear(110, "", 100, 90, 5),
    75: "0.75",
    125: "1.25"
  },
  sepia: {
    0: "0",
    DEFAULT: "100%"
  },
  skew: {
    .../* @__PURE__ */ exponential(2, "deg"),
    .../* @__PURE__ */ exponential(12, "deg", 3)
  },
  space: /* @__PURE__ */ alias2("spacing"),
  stroke: {
    current: "currentColor"
  },
  strokeWidth: /* @__PURE__ */ linear(2),
  textColor: /* @__PURE__ */ alias2("colors"),
  textOpacity: /* @__PURE__ */ alias2("opacity"),
  transitionDuration: (theme2) => ({
    DEFAULT: "150ms",
    ...theme2("durations")
  }),
  transitionDelay: /* @__PURE__ */ alias2("durations"),
  transitionProperty: {
    none: "none",
    all: "all",
    DEFAULT: "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter",
    colors: "background-color,border-color,color,fill,stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
  },
  transitionTimingFunction: {
    DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
    linear: "linear",
    in: "cubic-bezier(0.4,0,1,1)",
    out: "cubic-bezier(0,0,0.2,1)",
    "in-out": "cubic-bezier(0.4,0,0.2,1)"
  },
  translate: (theme2) => ({
    ...theme2("spacing"),
    ...ratios(2, 4),
    full: "100%"
  }),
  width: (theme2) => ({
    auto: "auto",
    ...theme2("spacing"),
    ...ratios(2, 6),
    ...ratios(12, 12),
    screen: "100vw",
    full: "100%",
    min: "min-content",
    max: "max-content"
  }),
  zIndex: {
    auto: "auto",
    .../* @__PURE__ */ linear(50, "", 1, 0, 10)
  }
};
var flattenColorPalette = (colors2, target = {}, prefix = []) => {
  Object.keys(colors2).forEach((property2) => {
    const value = colors2[property2];
    if (property2 == "DEFAULT") {
      target[join$1(prefix)] = value;
      target[join$1(prefix, ".")] = value;
    }
    const key = [...prefix, property2];
    target[join$1(key)] = value;
    target[join$1(key, ".")] = value;
    if (value && typeof value == "object") {
      flattenColorPalette(value, target, key);
    }
  }, target);
  return target;
};
var resolveContext = {
  negative: () => ({}),
  breakpoints: (screens) => Object.keys(screens).filter((key) => typeof screens[key] == "string").reduce((target, key) => {
    target["screen-" + key] = screens[key];
    return target;
  }, {})
};
var handleArbitraryValues = (section, key) => (key = key[0] == "[" && key.slice(-1) == "]" && key.slice(1, -1)) && includes$1(section, "olor") == /^(#|(hsl|rgb)a?\(|[a-z]+$)/.test(key) && (includes$1(key, "calc(") ? key.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ") : key);
var makeThemeResolver = (config2) => {
  const cache2 = /* @__PURE__ */ new Map();
  const theme2 = { ...defaultTheme, ...config2 };
  const deref = (theme3, section) => {
    const base = theme3 && theme3[section];
    const value = typeof base == "function" ? base(resolve2, resolveContext) : base;
    return value && section == "colors" ? flattenColorPalette(value) : value;
  };
  const resolve2 = (section, key, defaultValue) => {
    const keypath = section.split(".");
    section = keypath[0];
    if (keypath.length > 1) {
      defaultValue = key;
      key = join$1(tail(keypath), ".");
    }
    let base = cache2.get(section);
    if (!base) {
      cache2.set(section, base = { ...deref(theme2, section) });
      Object.assign(base, deref(theme2.extend, section));
    }
    if (key != null) {
      key = (Array.isArray(key) ? join$1(key) : key) || "DEFAULT";
      const value = handleArbitraryValues(section, key) || base[key];
      return value == null ? defaultValue : Array.isArray(value) && !includes$1(["fontSize", "outline", "dropShadow"], section) ? join$1(value, ",") : value;
    }
    return base;
  };
  return resolve2;
};
var translate = (plugins, context) => (rule, isTranslating) => {
  if (typeof rule.d == "function") {
    return rule.d(context);
  }
  const parameters = rule.d.split(/-(?![^[]*])/g);
  if (!isTranslating && parameters[0] == "tw" && rule.$ == rule.d) {
    return rule.$;
  }
  for (let index2 = parameters.length; index2; index2--) {
    const id = join$1(parameters.slice(0, index2));
    if (Object.prototype.hasOwnProperty.call(plugins, id)) {
      const plugin2 = plugins[id];
      return typeof plugin2 == "function" ? plugin2(tail(parameters, index2), context, id) : typeof plugin2 == "string" ? context[isTranslating ? "css" : "tw"](plugin2) : plugin2;
    }
  }
};
var _2;
var GROUP_RE = /^:(group(?:(?!-focus).+?)*)-(.+)$/;
var NOT_PREFIX_RE = /^(:not)-(.+)/;
var prepareVariantSelector = (variant) => variant[1] == "[" ? tail(variant) : variant;
var decorate = (darkMode, variants, { theme: theme2, tag }) => {
  const applyVariant = (translation, variant) => {
    if (_2 = theme2("screens", tail(variant), "")) {
      return { [buildMediaQuery(_2)]: translation };
    }
    if (variant == ":dark" && darkMode == "class") {
      return { ".dark &": translation };
    }
    if (_2 = GROUP_RE.exec(variant)) {
      return { [`.${escape(tag(_2[1]))}:${_2[2]} &`]: translation };
    }
    return {
      [variants[tail(variant)] || "&" + variant.replace(NOT_PREFIX_RE, (_4, not, variant2) => not + "(" + prepareVariantSelector(":" + variant2) + ")")]: translation
    };
  };
  return (translation, rule) => rule.v.reduceRight(applyVariant, translation);
};
var _3;
var responsivePrecedence = (css) => (((_3 = /(?:^|min-width: *)(\d+(?:.\d+)?)(p)?/.exec(css)) ? +_3[1] / (_3[2] ? 15 : 1) / 10 : 0) & 31) << 22;
var seperatorPrecedence = (string) => {
  _3 = 0;
  for (let index2 = string.length; index2--; ) {
    _3 += includes$1("-:,", string[index2]);
  }
  return _3;
};
var atRulePresedence = (css) => (seperatorPrecedence(css) & 15) << 18;
var PRECEDENCES_BY_PSEUDO_CLASS = [
  "rst",
  "st",
  "en",
  "d",
  "nk",
  "sited",
  "pty",
  "ecked",
  "cus-w",
  "ver",
  "cus",
  "cus-v",
  "tive",
  "sable",
  "ad-on",
  "tiona",
  "quire"
];
var pseudoPrecedence = (pseudoClass) => 1 << (~(_3 = PRECEDENCES_BY_PSEUDO_CLASS.indexOf(pseudoClass.replace(GROUP_RE, ":$2").slice(3, 8))) ? _3 : 17);
var makeVariantPresedenceCalculator = (theme2, variants) => (presedence, variant) => presedence | ((_3 = theme2("screens", tail(variant), "")) ? 1 << 27 | responsivePrecedence(buildMediaQuery(_3)) : variant == ":dark" ? 1 << 30 : (_3 = variants[variant] || variant.replace(NOT_PREFIX_RE, ":$2"))[0] == "@" ? atRulePresedence(_3) : pseudoPrecedence(variant));
var declarationPropertyPrecedence = (property2) => property2[0] == "-" ? 0 : seperatorPrecedence(property2) + ((_3 = /^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7}$)|([fl].{5}l|g.{8}$|pl))/.exec(property2)) ? +!!_3[1] || -!!_3[2] : 0) + 1;
var stringifyBlock = (body, selector) => selector + "{" + body + "}";
var serialize = (prefix, variants, context) => {
  const { theme: theme2, tag } = context;
  const tagVar = (_4, property2) => "--" + tag(property2);
  const tagVars = (value) => `${value}`.replace(/--(tw-[\w-]+)\b/g, tagVar);
  const stringifyDeclaration = (property2, value, important) => {
    property2 = tagVars(property2);
    return Array.isArray(value) ? join$1(value.filter(Boolean).map((value2) => prefix(property2, tagVars(value2), important)), ";") : prefix(property2, tagVars(value), important);
  };
  let rules2;
  const stringify2 = (atRules, selector, presedence, css, important) => {
    if (Array.isArray(css)) {
      css.forEach((css2) => css2 && stringify2(atRules, selector, presedence, css2, important));
      return;
    }
    let declarations = "";
    let maxPropertyPresedence = 0;
    let numberOfDeclarations = 0;
    if (css["@apply"]) {
      css = merge$1(evalThunk$1(apply(css["@apply"]), context), { ...css, "@apply": void 0 }, context);
    }
    Object.keys(css).forEach((key) => {
      const value = evalThunk$1(css[key], context);
      if (isCSSProperty$1(key, value)) {
        if (value !== "" && key.length > 1) {
          const property2 = hyphenate$1(key);
          numberOfDeclarations += 1;
          maxPropertyPresedence = Math.max(maxPropertyPresedence, declarationPropertyPrecedence(property2));
          declarations = (declarations && declarations + ";") + stringifyDeclaration(property2, value, important);
        }
      } else if (value) {
        if (key == ":global") {
          key = "@global";
        }
        if (key[0] == "@") {
          if (key[1] == "g") {
            stringify2([], "", 0, value, important);
          } else if (key[1] == "f") {
            stringify2([], key, 0, value, important);
          } else if (key[1] == "k") {
            const currentSize = rules2.length;
            stringify2([], "", 0, value, important);
            const waypoints = rules2.splice(currentSize, rules2.length - currentSize);
            rules2.push({
              r: stringifyBlock(join$1(waypoints.map((p2) => p2.r), ""), key),
              p: waypoints.reduce((sum, p2) => sum + p2.p, 0)
            });
          } else if (key[1] == "i") {
            (Array.isArray(value) ? value : [value]).forEach((value2) => value2 && rules2.push({ p: 0, r: `${key} ${value2};` }));
          } else {
            if (key[2] == "c") {
              key = buildMediaQuery(context.theme("screens", tail(key, 8).trim()));
            }
            stringify2([...atRules, key], selector, presedence | responsivePrecedence(key) | atRulePresedence(key), value, important);
          }
        } else {
          stringify2(atRules, selector ? selector.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (_4, selectorPart, comma) => key.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (_5, keyPart, comma2) => (includes$1(keyPart, "&") ? keyPart.replace(/&/g, selectorPart) : (selectorPart && selectorPart + " ") + keyPart) + comma2) + comma) : key, presedence, value, important);
        }
      }
    });
    if (numberOfDeclarations) {
      rules2.push({
        r: atRules.reduceRight(stringifyBlock, stringifyBlock(declarations, selector)),
        p: presedence * (1 << 8) + ((Math.max(0, 15 - numberOfDeclarations) & 15) << 4 | (maxPropertyPresedence || 15) & 15)
      });
    }
  };
  const variantPresedence = makeVariantPresedenceCalculator(theme2, variants);
  return (css, className, rule, layer = 0) => {
    layer <<= 28;
    rules2 = [];
    stringify2([], className ? "." + escape(className) : "", rule ? rule.v.reduceRight(variantPresedence, layer) : layer, css, rule && rule.i);
    return rules2;
  };
};
var inject = (sheet, mode2, init2, context) => {
  let sortedPrecedences;
  init2((value = []) => sortedPrecedences = value);
  let insertedRules;
  init2((value = /* @__PURE__ */ new Set()) => insertedRules = value);
  return ({ r: css, p: presedence }) => {
    if (!insertedRules.has(css)) {
      insertedRules.add(css);
      const index2 = sortedInsertionIndex(sortedPrecedences, presedence);
      try {
        sheet.insert(css, index2);
        sortedPrecedences.splice(index2, 0, presedence);
      } catch (error) {
        if (!/:-[mwo]/.test(css)) {
          mode2.report({ id: "INJECT_CSS_ERROR", css, error }, context);
        }
      }
    }
  };
};
var sanitize = (value, defaultValue, disabled, enabled = defaultValue) => value === false ? disabled : value === true ? enabled : value || defaultValue;
var loadMode = (mode2) => (typeof mode2 == "string" ? { t: strict, a: warn$1, i: silent }[mode2[1]] : mode2) || warn$1;
var COMPONENT_PROPS = { _: { value: "", writable: true } };
var configure = (config2 = {}) => {
  const theme2 = makeThemeResolver(config2.theme);
  const mode2 = loadMode(config2.mode);
  const hash2 = sanitize(config2.hash, false, false, cyrb32);
  const important = config2.important;
  let activeRule = { v: [] };
  let translateDepth = 0;
  const lastTranslations = [];
  const context = {
    tw: (...tokens) => process(tokens),
    theme: (section, key, defaultValue) => {
      var _a2;
      const value = (_a2 = theme2(section, key, defaultValue)) != null ? _a2 : mode2.unknown(section, key == null || Array.isArray(key) ? key : key.split("."), defaultValue != null, context);
      return activeRule.n && value && includes$1("rg", (typeof value)[5]) ? `calc(${value} * -1)` : value;
    },
    tag: (value) => hash2 ? hash2(value) : value,
    css: (rules2) => {
      translateDepth++;
      const lastTranslationsIndex = lastTranslations.length;
      try {
        ;
        (typeof rules2 == "string" ? parse$2([rules2]) : rules2).forEach(convert);
        const css = Object.create(null, COMPONENT_PROPS);
        for (let index2 = lastTranslationsIndex; index2 < lastTranslations.length; index2++) {
          const translation = lastTranslations[index2];
          if (translation) {
            switch (typeof translation) {
              case "object":
                merge$1(css, translation, context);
                break;
              case "string":
                css._ += (css._ && " ") + translation;
            }
          }
        }
        return css;
      } finally {
        lastTranslations.length = lastTranslationsIndex;
        translateDepth--;
      }
    }
  };
  const translate2 = translate({ ...corePlugins, ...config2.plugins }, context);
  const doTranslate = (rule) => {
    const parentRule = activeRule;
    activeRule = rule;
    try {
      return evalThunk$1(translate2(rule), context);
    } finally {
      activeRule = parentRule;
    }
  };
  const variants = { ...coreVariants, ...config2.variants };
  const decorate2 = decorate(config2.darkMode || "media", variants, context);
  const serialize2 = serialize(sanitize(config2.prefix, autoprefix, noprefix), variants, context);
  const sheet = config2.sheet || (typeof window == "undefined" ? voidSheet() : cssomSheet(config2));
  const { init: init2 = (callback) => callback() } = sheet;
  const inject2 = inject(sheet, mode2, init2, context);
  let idToClassName;
  init2((value = /* @__PURE__ */ new Map()) => idToClassName = value);
  const inlineDirectiveName = /* @__PURE__ */ new WeakMap();
  const evaluateFunctions = (key, value) => key == "_" ? void 0 : typeof value == "function" ? JSON.stringify(evalThunk$1(value, context), evaluateFunctions) : value;
  const convert = (rule) => {
    if (!translateDepth && activeRule.v.length) {
      rule = { ...rule, v: [...activeRule.v, ...rule.v], $: "" };
    }
    if (!rule.$) {
      rule.$ = stringifyRule(rule, inlineDirectiveName.get(rule.d));
    }
    let className = translateDepth ? null : idToClassName.get(rule.$);
    if (className == null) {
      let translation = doTranslate(rule);
      if (!rule.$) {
        rule.$ = cyrb32(JSON.stringify(translation, evaluateFunctions));
        inlineDirectiveName.set(rule.d, rule.$);
        rule.$ = stringifyRule(rule, rule.$);
      }
      if (translation && typeof translation == "object") {
        rule.v = rule.v.map(prepareVariantSelector);
        if (important)
          rule.i = important;
        translation = decorate2(translation, rule);
        if (translateDepth) {
          lastTranslations.push(translation);
        } else {
          const layer = typeof rule.d == "function" ? typeof translation._ == "string" ? 1 : 3 : 2;
          className = hash2 || typeof rule.d == "function" ? (hash2 || cyrb32)(layer + rule.$) : rule.$;
          serialize2(translation, className, rule, layer).forEach(inject2);
          if (translation._) {
            className += " " + translation._;
          }
        }
      } else {
        if (typeof translation == "string") {
          className = translation;
        } else {
          className = rule.$;
          mode2.report({ id: "UNKNOWN_DIRECTIVE", rule: className }, context);
        }
        if (translateDepth && typeof rule.d !== "function") {
          lastTranslations.push(className);
        }
      }
      if (!translateDepth) {
        idToClassName.set(rule.$, className);
        ensureMaxSize(idToClassName, 3e4);
      }
    }
    return className;
  };
  const process = (tokens) => join$1(parse$2(tokens).map(convert).filter(Boolean), " ");
  const preflight = sanitize(config2.preflight, identity, false);
  if (preflight) {
    const css = createPreflight(theme2);
    const styles = serialize2(typeof preflight == "function" ? evalThunk$1(preflight(css, context), context) || css : { ...css, ...preflight });
    init2((injected = (styles.forEach(inject2), true)) => injected);
  }
  return {
    init: () => mode2.report({ id: "LATE_SETUP_CALL" }, context),
    process
  };
};
var create = (config2) => {
  let process = (tokens) => {
    init2();
    return process(tokens);
  };
  let init2 = (config22) => {
    ({ process, init: init2 } = configure(config22));
  };
  if (config2)
    init2(config2);
  let context;
  const fromContext = (key) => () => {
    if (!context) {
      process([
        (_4) => {
          context = _4;
          return "";
        }
      ]);
    }
    return context[key];
  };
  return {
    tw: Object.defineProperties((...tokens) => process(tokens), {
      theme: {
        get: fromContext("theme")
      }
    }),
    setup: (config22) => init2(config22)
  };
};
var { tw, setup } = /* @__PURE__ */ create();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var chroma$1 = { exports: {} };
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */
(function(module2, exports) {
  (function(global2, factory) {
    module2.exports = factory();
  })(commonjsGlobal, function() {
    var limit$2 = function(x2, min3, max3) {
      if (min3 === void 0)
        min3 = 0;
      if (max3 === void 0)
        max3 = 1;
      return x2 < min3 ? min3 : x2 > max3 ? max3 : x2;
    };
    var limit$1 = limit$2;
    var clip_rgb$3 = function(rgb2) {
      rgb2._clipped = false;
      rgb2._unclipped = rgb2.slice(0);
      for (var i3 = 0; i3 <= 3; i3++) {
        if (i3 < 3) {
          if (rgb2[i3] < 0 || rgb2[i3] > 255) {
            rgb2._clipped = true;
          }
          rgb2[i3] = limit$1(rgb2[i3], 0, 255);
        } else if (i3 === 3) {
          rgb2[i3] = limit$1(rgb2[i3], 0, 1);
        }
      }
      return rgb2;
    };
    var classToType = {};
    for (var i$1 = 0, list$1 = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]; i$1 < list$1.length; i$1 += 1) {
      var name = list$1[i$1];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    var type$p = function(obj) {
      return classToType[Object.prototype.toString.call(obj)] || "object";
    };
    var type$o = type$p;
    var unpack$B = function(args, keyOrder) {
      if (keyOrder === void 0)
        keyOrder = null;
      if (args.length >= 3) {
        return Array.prototype.slice.call(args);
      }
      if (type$o(args[0]) == "object" && keyOrder) {
        return keyOrder.split("").filter(function(k2) {
          return args[0][k2] !== void 0;
        }).map(function(k2) {
          return args[0][k2];
        });
      }
      return args[0];
    };
    var type$n = type$p;
    var last$4 = function(args) {
      if (args.length < 2) {
        return null;
      }
      var l = args.length - 1;
      if (type$n(args[l]) == "string") {
        return args[l].toLowerCase();
      }
      return null;
    };
    var PI$2 = Math.PI;
    var utils = {
      clip_rgb: clip_rgb$3,
      limit: limit$2,
      type: type$p,
      unpack: unpack$B,
      last: last$4,
      PI: PI$2,
      TWOPI: PI$2 * 2,
      PITHIRD: PI$2 / 3,
      DEG2RAD: PI$2 / 180,
      RAD2DEG: 180 / PI$2
    };
    var input$h = {
      format: {},
      autodetect: []
    };
    var last$3 = utils.last;
    var clip_rgb$2 = utils.clip_rgb;
    var type$m = utils.type;
    var _input = input$h;
    var Color$D = function Color2() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var me = this;
      if (type$m(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
        return args[0];
      }
      var mode2 = last$3(args);
      var autodetect = false;
      if (!mode2) {
        autodetect = true;
        if (!_input.sorted) {
          _input.autodetect = _input.autodetect.sort(function(a2, b2) {
            return b2.p - a2.p;
          });
          _input.sorted = true;
        }
        for (var i3 = 0, list2 = _input.autodetect; i3 < list2.length; i3 += 1) {
          var chk = list2[i3];
          mode2 = chk.test.apply(chk, args);
          if (mode2) {
            break;
          }
        }
      }
      if (_input.format[mode2]) {
        var rgb2 = _input.format[mode2].apply(null, autodetect ? args : args.slice(0, -1));
        me._rgb = clip_rgb$2(rgb2);
      } else {
        throw new Error("unknown format: " + args);
      }
      if (me._rgb.length === 3) {
        me._rgb.push(1);
      }
    };
    Color$D.prototype.toString = function toString() {
      if (type$m(this.hex) == "function") {
        return this.hex();
      }
      return "[" + this._rgb.join(",") + "]";
    };
    var Color_1 = Color$D;
    var chroma$k = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(chroma$k.Color, [null].concat(args)))();
    };
    chroma$k.Color = Color_1;
    chroma$k.version = "2.4.2";
    var chroma_1 = chroma$k;
    var unpack$A = utils.unpack;
    var max$2 = Math.max;
    var rgb2cmyk$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$A(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      r2 = r2 / 255;
      g = g / 255;
      b2 = b2 / 255;
      var k2 = 1 - max$2(r2, max$2(g, b2));
      var f2 = k2 < 1 ? 1 / (1 - k2) : 0;
      var c2 = (1 - r2 - k2) * f2;
      var m2 = (1 - g - k2) * f2;
      var y2 = (1 - b2 - k2) * f2;
      return [c2, m2, y2, k2];
    };
    var rgb2cmyk_1 = rgb2cmyk$1;
    var unpack$z = utils.unpack;
    var cmyk2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$z(args, "cmyk");
      var c2 = args[0];
      var m2 = args[1];
      var y2 = args[2];
      var k2 = args[3];
      var alpha = args.length > 4 ? args[4] : 1;
      if (k2 === 1) {
        return [0, 0, 0, alpha];
      }
      return [
        c2 >= 1 ? 0 : 255 * (1 - c2) * (1 - k2),
        m2 >= 1 ? 0 : 255 * (1 - m2) * (1 - k2),
        y2 >= 1 ? 0 : 255 * (1 - y2) * (1 - k2),
        alpha
      ];
    };
    var cmyk2rgb_1 = cmyk2rgb;
    var chroma$j = chroma_1;
    var Color$C = Color_1;
    var input$g = input$h;
    var unpack$y = utils.unpack;
    var type$l = utils.type;
    var rgb2cmyk = rgb2cmyk_1;
    Color$C.prototype.cmyk = function() {
      return rgb2cmyk(this._rgb);
    };
    chroma$j.cmyk = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$C, [null].concat(args, ["cmyk"])))();
    };
    input$g.format.cmyk = cmyk2rgb_1;
    input$g.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$y(args, "cmyk");
        if (type$l(args) === "array" && args.length === 4) {
          return "cmyk";
        }
      }
    });
    var unpack$x = utils.unpack;
    var last$2 = utils.last;
    var rnd = function(a2) {
      return Math.round(a2 * 100) / 100;
    };
    var hsl2css$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var hsla = unpack$x(args, "hsla");
      var mode2 = last$2(args) || "lsa";
      hsla[0] = rnd(hsla[0] || 0);
      hsla[1] = rnd(hsla[1] * 100) + "%";
      hsla[2] = rnd(hsla[2] * 100) + "%";
      if (mode2 === "hsla" || hsla.length > 3 && hsla[3] < 1) {
        hsla[3] = hsla.length > 3 ? hsla[3] : 1;
        mode2 = "hsla";
      } else {
        hsla.length = 3;
      }
      return mode2 + "(" + hsla.join(",") + ")";
    };
    var hsl2css_1 = hsl2css$1;
    var unpack$w = utils.unpack;
    var rgb2hsl$3 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$w(args, "rgba");
      var r2 = args[0];
      var g = args[1];
      var b2 = args[2];
      r2 /= 255;
      g /= 255;
      b2 /= 255;
      var min3 = Math.min(r2, g, b2);
      var max3 = Math.max(r2, g, b2);
      var l = (max3 + min3) / 2;
      var s, h2;
      if (max3 === min3) {
        s = 0;
        h2 = Number.NaN;
      } else {
        s = l < 0.5 ? (max3 - min3) / (max3 + min3) : (max3 - min3) / (2 - max3 - min3);
      }
      if (r2 == max3) {
        h2 = (g - b2) / (max3 - min3);
      } else if (g == max3) {
        h2 = 2 + (b2 - r2) / (max3 - min3);
      } else if (b2 == max3) {
        h2 = 4 + (r2 - g) / (max3 - min3);
      }
      h2 *= 60;
      if (h2 < 0) {
        h2 += 360;
      }
      if (args.length > 3 && args[3] !== void 0) {
        return [h2, s, l, args[3]];
      }
      return [h2, s, l];
    };
    var rgb2hsl_1 = rgb2hsl$3;
    var unpack$v = utils.unpack;
    var last$1 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl$2 = rgb2hsl_1;
    var round$6 = Math.round;
    var rgb2css$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgba = unpack$v(args, "rgba");
      var mode2 = last$1(args) || "rgb";
      if (mode2.substr(0, 3) == "hsl") {
        return hsl2css(rgb2hsl$2(rgba), mode2);
      }
      rgba[0] = round$6(rgba[0]);
      rgba[1] = round$6(rgba[1]);
      rgba[2] = round$6(rgba[2]);
      if (mode2 === "rgba" || rgba.length > 3 && rgba[3] < 1) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode2 = "rgba";
      }
      return mode2 + "(" + rgba.slice(0, mode2 === "rgb" ? 3 : 4).join(",") + ")";
    };
    var rgb2css_1 = rgb2css$1;
    var unpack$u = utils.unpack;
    var round$5 = Math.round;
    var hsl2rgb$1 = function() {
      var assign2;
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$u(args, "hsl");
      var h2 = args[0];
      var s = args[1];
      var l = args[2];
      var r2, g, b2;
      if (s === 0) {
        r2 = g = b2 = l * 255;
      } else {
        var t3 = [0, 0, 0];
        var c2 = [0, 0, 0];
        var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var t1 = 2 * l - t2;
        var h_ = h2 / 360;
        t3[0] = h_ + 1 / 3;
        t3[1] = h_;
        t3[2] = h_ - 1 / 3;
        for (var i3 = 0; i3 < 3; i3++) {
          if (t3[i3] < 0) {
            t3[i3] += 1;
          }
          if (t3[i3] > 1) {
            t3[i3] -= 1;
          }
          if (6 * t3[i3] < 1) {
            c2[i3] = t1 + (t2 - t1) * 6 * t3[i3];
          } else if (2 * t3[i3] < 1) {
            c2[i3] = t2;
          } else if (3 * t3[i3] < 2) {
            c2[i3] = t1 + (t2 - t1) * (2 / 3 - t3[i3]) * 6;
          } else {
            c2[i3] = t1;
          }
        }
        assign2 = [round$5(c2[0] * 255), round$5(c2[1] * 255), round$5(c2[2] * 255)], r2 = assign2[0], g = assign2[1], b2 = assign2[2];
      }
      if (args.length > 3) {
        return [r2, g, b2, args[3]];
      }
      return [r2, g, b2, 1];
    };
    var hsl2rgb_1 = hsl2rgb$1;
    var hsl2rgb = hsl2rgb_1;
    var input$f = input$h;
    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var round$4 = Math.round;
    var css2rgb$1 = function(css) {
      css = css.toLowerCase().trim();
      var m2;
      if (input$f.format.named) {
        try {
          return input$f.format.named(css);
        } catch (e2) {
        }
      }
      if (m2 = css.match(RE_RGB)) {
        var rgb2 = m2.slice(1, 4);
        for (var i3 = 0; i3 < 3; i3++) {
          rgb2[i3] = +rgb2[i3];
        }
        rgb2[3] = 1;
        return rgb2;
      }
      if (m2 = css.match(RE_RGBA)) {
        var rgb$1 = m2.slice(1, 5);
        for (var i$12 = 0; i$12 < 4; i$12++) {
          rgb$1[i$12] = +rgb$1[i$12];
        }
        return rgb$1;
      }
      if (m2 = css.match(RE_RGB_PCT)) {
        var rgb$2 = m2.slice(1, 4);
        for (var i$2 = 0; i$2 < 3; i$2++) {
          rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
        }
        rgb$2[3] = 1;
        return rgb$2;
      }
      if (m2 = css.match(RE_RGBA_PCT)) {
        var rgb$3 = m2.slice(1, 5);
        for (var i$3 = 0; i$3 < 3; i$3++) {
          rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
        }
        rgb$3[3] = +rgb$3[3];
        return rgb$3;
      }
      if (m2 = css.match(RE_HSL)) {
        var hsl2 = m2.slice(1, 4);
        hsl2[1] *= 0.01;
        hsl2[2] *= 0.01;
        var rgb$4 = hsl2rgb(hsl2);
        rgb$4[3] = 1;
        return rgb$4;
      }
      if (m2 = css.match(RE_HSLA)) {
        var hsl$1 = m2.slice(1, 4);
        hsl$1[1] *= 0.01;
        hsl$1[2] *= 0.01;
        var rgb$5 = hsl2rgb(hsl$1);
        rgb$5[3] = +m2[4];
        return rgb$5;
      }
    };
    css2rgb$1.test = function(s) {
      return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
    };
    var css2rgb_1 = css2rgb$1;
    var chroma$i = chroma_1;
    var Color$B = Color_1;
    var input$e = input$h;
    var type$k = utils.type;
    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;
    Color$B.prototype.css = function(mode2) {
      return rgb2css(this._rgb, mode2);
    };
    chroma$i.css = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$B, [null].concat(args, ["css"])))();
    };
    input$e.format.css = css2rgb;
    input$e.autodetect.push({
      p: 5,
      test: function(h2) {
        var rest = [], len = arguments.length - 1;
        while (len-- > 0)
          rest[len] = arguments[len + 1];
        if (!rest.length && type$k(h2) === "string" && css2rgb.test(h2)) {
          return "css";
        }
      }
    });
    var Color$A = Color_1;
    var chroma$h = chroma_1;
    var input$d = input$h;
    var unpack$t = utils.unpack;
    input$d.format.gl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgb2 = unpack$t(args, "rgba");
      rgb2[0] *= 255;
      rgb2[1] *= 255;
      rgb2[2] *= 255;
      return rgb2;
    };
    chroma$h.gl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$A, [null].concat(args, ["gl"])))();
    };
    Color$A.prototype.gl = function() {
      var rgb2 = this._rgb;
      return [rgb2[0] / 255, rgb2[1] / 255, rgb2[2] / 255, rgb2[3]];
    };
    var unpack$s = utils.unpack;
    var rgb2hcg$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$s(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      var min3 = Math.min(r2, g, b2);
      var max3 = Math.max(r2, g, b2);
      var delta = max3 - min3;
      var c2 = delta * 100 / 255;
      var _g = min3 / (255 - delta) * 100;
      var h2;
      if (delta === 0) {
        h2 = Number.NaN;
      } else {
        if (r2 === max3) {
          h2 = (g - b2) / delta;
        }
        if (g === max3) {
          h2 = 2 + (b2 - r2) / delta;
        }
        if (b2 === max3) {
          h2 = 4 + (r2 - g) / delta;
        }
        h2 *= 60;
        if (h2 < 0) {
          h2 += 360;
        }
      }
      return [h2, c2, _g];
    };
    var rgb2hcg_1 = rgb2hcg$1;
    var unpack$r = utils.unpack;
    var floor$3 = Math.floor;
    var hcg2rgb = function() {
      var assign2, assign$12, assign$22, assign$32, assign$4, assign$5;
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$r(args, "hcg");
      var h2 = args[0];
      var c2 = args[1];
      var _g = args[2];
      var r2, g, b2;
      _g = _g * 255;
      var _c = c2 * 255;
      if (c2 === 0) {
        r2 = g = b2 = _g;
      } else {
        if (h2 === 360) {
          h2 = 0;
        }
        if (h2 > 360) {
          h2 -= 360;
        }
        if (h2 < 0) {
          h2 += 360;
        }
        h2 /= 60;
        var i3 = floor$3(h2);
        var f2 = h2 - i3;
        var p2 = _g * (1 - c2);
        var q2 = p2 + _c * (1 - f2);
        var t2 = p2 + _c * f2;
        var v2 = p2 + _c;
        switch (i3) {
          case 0:
            assign2 = [v2, t2, p2], r2 = assign2[0], g = assign2[1], b2 = assign2[2];
            break;
          case 1:
            assign$12 = [q2, v2, p2], r2 = assign$12[0], g = assign$12[1], b2 = assign$12[2];
            break;
          case 2:
            assign$22 = [p2, v2, t2], r2 = assign$22[0], g = assign$22[1], b2 = assign$22[2];
            break;
          case 3:
            assign$32 = [p2, q2, v2], r2 = assign$32[0], g = assign$32[1], b2 = assign$32[2];
            break;
          case 4:
            assign$4 = [t2, p2, v2], r2 = assign$4[0], g = assign$4[1], b2 = assign$4[2];
            break;
          case 5:
            assign$5 = [v2, p2, q2], r2 = assign$5[0], g = assign$5[1], b2 = assign$5[2];
            break;
        }
      }
      return [r2, g, b2, args.length > 3 ? args[3] : 1];
    };
    var hcg2rgb_1 = hcg2rgb;
    var unpack$q = utils.unpack;
    var type$j = utils.type;
    var chroma$g = chroma_1;
    var Color$z = Color_1;
    var input$c = input$h;
    var rgb2hcg = rgb2hcg_1;
    Color$z.prototype.hcg = function() {
      return rgb2hcg(this._rgb);
    };
    chroma$g.hcg = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$z, [null].concat(args, ["hcg"])))();
    };
    input$c.format.hcg = hcg2rgb_1;
    input$c.autodetect.push({
      p: 1,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$q(args, "hcg");
        if (type$j(args) === "array" && args.length === 3) {
          return "hcg";
        }
      }
    });
    var unpack$p = utils.unpack;
    var last = utils.last;
    var round$3 = Math.round;
    var rgb2hex$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$p(args, "rgba");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      var a2 = ref2[3];
      var mode2 = last(args) || "auto";
      if (a2 === void 0) {
        a2 = 1;
      }
      if (mode2 === "auto") {
        mode2 = a2 < 1 ? "rgba" : "rgb";
      }
      r2 = round$3(r2);
      g = round$3(g);
      b2 = round$3(b2);
      var u2 = r2 << 16 | g << 8 | b2;
      var str = "000000" + u2.toString(16);
      str = str.substr(str.length - 6);
      var hxa = "0" + round$3(a2 * 255).toString(16);
      hxa = hxa.substr(hxa.length - 2);
      switch (mode2.toLowerCase()) {
        case "rgba":
          return "#" + str + hxa;
        case "argb":
          return "#" + hxa + str;
        default:
          return "#" + str;
      }
    };
    var rgb2hex_1 = rgb2hex$2;
    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
    var hex2rgb$1 = function(hex) {
      if (hex.match(RE_HEX)) {
        if (hex.length === 4 || hex.length === 7) {
          hex = hex.substr(1);
        }
        if (hex.length === 3) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        var u2 = parseInt(hex, 16);
        var r2 = u2 >> 16;
        var g = u2 >> 8 & 255;
        var b2 = u2 & 255;
        return [r2, g, b2, 1];
      }
      if (hex.match(RE_HEXA)) {
        if (hex.length === 5 || hex.length === 9) {
          hex = hex.substr(1);
        }
        if (hex.length === 4) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        var u$1 = parseInt(hex, 16);
        var r$12 = u$1 >> 24 & 255;
        var g$1 = u$1 >> 16 & 255;
        var b$1 = u$1 >> 8 & 255;
        var a2 = Math.round((u$1 & 255) / 255 * 100) / 100;
        return [r$12, g$1, b$1, a2];
      }
      throw new Error("unknown hex color: " + hex);
    };
    var hex2rgb_1 = hex2rgb$1;
    var chroma$f = chroma_1;
    var Color$y = Color_1;
    var type$i = utils.type;
    var input$b = input$h;
    var rgb2hex$1 = rgb2hex_1;
    Color$y.prototype.hex = function(mode2) {
      return rgb2hex$1(this._rgb, mode2);
    };
    chroma$f.hex = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$y, [null].concat(args, ["hex"])))();
    };
    input$b.format.hex = hex2rgb_1;
    input$b.autodetect.push({
      p: 4,
      test: function(h2) {
        var rest = [], len = arguments.length - 1;
        while (len-- > 0)
          rest[len] = arguments[len + 1];
        if (!rest.length && type$i(h2) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h2.length) >= 0) {
          return "hex";
        }
      }
    });
    var unpack$o = utils.unpack;
    var TWOPI$2 = utils.TWOPI;
    var min$2 = Math.min;
    var sqrt$4 = Math.sqrt;
    var acos = Math.acos;
    var rgb2hsi$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$o(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      r2 /= 255;
      g /= 255;
      b2 /= 255;
      var h2;
      var min_ = min$2(r2, g, b2);
      var i3 = (r2 + g + b2) / 3;
      var s = i3 > 0 ? 1 - min_ / i3 : 0;
      if (s === 0) {
        h2 = NaN;
      } else {
        h2 = (r2 - g + (r2 - b2)) / 2;
        h2 /= sqrt$4((r2 - g) * (r2 - g) + (r2 - b2) * (g - b2));
        h2 = acos(h2);
        if (b2 > g) {
          h2 = TWOPI$2 - h2;
        }
        h2 /= TWOPI$2;
      }
      return [h2 * 360, s, i3];
    };
    var rgb2hsi_1 = rgb2hsi$1;
    var unpack$n = utils.unpack;
    var limit = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos$4 = Math.cos;
    var hsi2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$n(args, "hsi");
      var h2 = args[0];
      var s = args[1];
      var i3 = args[2];
      var r2, g, b2;
      if (isNaN(h2)) {
        h2 = 0;
      }
      if (isNaN(s)) {
        s = 0;
      }
      if (h2 > 360) {
        h2 -= 360;
      }
      if (h2 < 0) {
        h2 += 360;
      }
      h2 /= 360;
      if (h2 < 1 / 3) {
        b2 = (1 - s) / 3;
        r2 = (1 + s * cos$4(TWOPI$1 * h2) / cos$4(PITHIRD - TWOPI$1 * h2)) / 3;
        g = 1 - (b2 + r2);
      } else if (h2 < 2 / 3) {
        h2 -= 1 / 3;
        r2 = (1 - s) / 3;
        g = (1 + s * cos$4(TWOPI$1 * h2) / cos$4(PITHIRD - TWOPI$1 * h2)) / 3;
        b2 = 1 - (r2 + g);
      } else {
        h2 -= 2 / 3;
        g = (1 - s) / 3;
        b2 = (1 + s * cos$4(TWOPI$1 * h2) / cos$4(PITHIRD - TWOPI$1 * h2)) / 3;
        r2 = 1 - (g + b2);
      }
      r2 = limit(i3 * r2 * 3);
      g = limit(i3 * g * 3);
      b2 = limit(i3 * b2 * 3);
      return [r2 * 255, g * 255, b2 * 255, args.length > 3 ? args[3] : 1];
    };
    var hsi2rgb_1 = hsi2rgb;
    var unpack$m = utils.unpack;
    var type$h = utils.type;
    var chroma$e = chroma_1;
    var Color$x = Color_1;
    var input$a = input$h;
    var rgb2hsi = rgb2hsi_1;
    Color$x.prototype.hsi = function() {
      return rgb2hsi(this._rgb);
    };
    chroma$e.hsi = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$x, [null].concat(args, ["hsi"])))();
    };
    input$a.format.hsi = hsi2rgb_1;
    input$a.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$m(args, "hsi");
        if (type$h(args) === "array" && args.length === 3) {
          return "hsi";
        }
      }
    });
    var unpack$l = utils.unpack;
    var type$g = utils.type;
    var chroma$d = chroma_1;
    var Color$w = Color_1;
    var input$9 = input$h;
    var rgb2hsl$1 = rgb2hsl_1;
    Color$w.prototype.hsl = function() {
      return rgb2hsl$1(this._rgb);
    };
    chroma$d.hsl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$w, [null].concat(args, ["hsl"])))();
    };
    input$9.format.hsl = hsl2rgb_1;
    input$9.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$l(args, "hsl");
        if (type$g(args) === "array" && args.length === 3) {
          return "hsl";
        }
      }
    });
    var unpack$k = utils.unpack;
    var min$12 = Math.min;
    var max$12 = Math.max;
    var rgb2hsl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$k(args, "rgb");
      var r2 = args[0];
      var g = args[1];
      var b2 = args[2];
      var min_ = min$12(r2, g, b2);
      var max_ = max$12(r2, g, b2);
      var delta = max_ - min_;
      var h2, s, v2;
      v2 = max_ / 255;
      if (max_ === 0) {
        h2 = Number.NaN;
        s = 0;
      } else {
        s = delta / max_;
        if (r2 === max_) {
          h2 = (g - b2) / delta;
        }
        if (g === max_) {
          h2 = 2 + (b2 - r2) / delta;
        }
        if (b2 === max_) {
          h2 = 4 + (r2 - g) / delta;
        }
        h2 *= 60;
        if (h2 < 0) {
          h2 += 360;
        }
      }
      return [h2, s, v2];
    };
    var rgb2hsv$1 = rgb2hsl;
    var unpack$j = utils.unpack;
    var floor$2 = Math.floor;
    var hsv2rgb = function() {
      var assign2, assign$12, assign$22, assign$32, assign$4, assign$5;
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$j(args, "hsv");
      var h2 = args[0];
      var s = args[1];
      var v2 = args[2];
      var r2, g, b2;
      v2 *= 255;
      if (s === 0) {
        r2 = g = b2 = v2;
      } else {
        if (h2 === 360) {
          h2 = 0;
        }
        if (h2 > 360) {
          h2 -= 360;
        }
        if (h2 < 0) {
          h2 += 360;
        }
        h2 /= 60;
        var i3 = floor$2(h2);
        var f2 = h2 - i3;
        var p2 = v2 * (1 - s);
        var q2 = v2 * (1 - s * f2);
        var t2 = v2 * (1 - s * (1 - f2));
        switch (i3) {
          case 0:
            assign2 = [v2, t2, p2], r2 = assign2[0], g = assign2[1], b2 = assign2[2];
            break;
          case 1:
            assign$12 = [q2, v2, p2], r2 = assign$12[0], g = assign$12[1], b2 = assign$12[2];
            break;
          case 2:
            assign$22 = [p2, v2, t2], r2 = assign$22[0], g = assign$22[1], b2 = assign$22[2];
            break;
          case 3:
            assign$32 = [p2, q2, v2], r2 = assign$32[0], g = assign$32[1], b2 = assign$32[2];
            break;
          case 4:
            assign$4 = [t2, p2, v2], r2 = assign$4[0], g = assign$4[1], b2 = assign$4[2];
            break;
          case 5:
            assign$5 = [v2, p2, q2], r2 = assign$5[0], g = assign$5[1], b2 = assign$5[2];
            break;
        }
      }
      return [r2, g, b2, args.length > 3 ? args[3] : 1];
    };
    var hsv2rgb_1 = hsv2rgb;
    var unpack$i = utils.unpack;
    var type$f = utils.type;
    var chroma$c = chroma_1;
    var Color$v = Color_1;
    var input$8 = input$h;
    var rgb2hsv = rgb2hsv$1;
    Color$v.prototype.hsv = function() {
      return rgb2hsv(this._rgb);
    };
    chroma$c.hsv = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$v, [null].concat(args, ["hsv"])))();
    };
    input$8.format.hsv = hsv2rgb_1;
    input$8.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$i(args, "hsv");
        if (type$f(args) === "array" && args.length === 3) {
          return "hsv";
        }
      }
    });
    var labConstants = {
      Kn: 18,
      Xn: 0.95047,
      Yn: 1,
      Zn: 1.08883,
      t0: 0.137931034,
      t1: 0.206896552,
      t2: 0.12841855,
      t3: 8856452e-9
    };
    var LAB_CONSTANTS$3 = labConstants;
    var unpack$h = utils.unpack;
    var pow$a = Math.pow;
    var rgb2lab$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$h(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      var ref$1 = rgb2xyz(r2, g, b2);
      var x2 = ref$1[0];
      var y2 = ref$1[1];
      var z2 = ref$1[2];
      var l = 116 * y2 - 16;
      return [l < 0 ? 0 : l, 500 * (x2 - y2), 200 * (y2 - z2)];
    };
    var rgb_xyz = function(r2) {
      if ((r2 /= 255) <= 0.04045) {
        return r2 / 12.92;
      }
      return pow$a((r2 + 0.055) / 1.055, 2.4);
    };
    var xyz_lab = function(t2) {
      if (t2 > LAB_CONSTANTS$3.t3) {
        return pow$a(t2, 1 / 3);
      }
      return t2 / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
    };
    var rgb2xyz = function(r2, g, b2) {
      r2 = rgb_xyz(r2);
      g = rgb_xyz(g);
      b2 = rgb_xyz(b2);
      var x2 = xyz_lab((0.4124564 * r2 + 0.3575761 * g + 0.1804375 * b2) / LAB_CONSTANTS$3.Xn);
      var y2 = xyz_lab((0.2126729 * r2 + 0.7151522 * g + 0.072175 * b2) / LAB_CONSTANTS$3.Yn);
      var z2 = xyz_lab((0.0193339 * r2 + 0.119192 * g + 0.9503041 * b2) / LAB_CONSTANTS$3.Zn);
      return [x2, y2, z2];
    };
    var rgb2lab_1 = rgb2lab$2;
    var LAB_CONSTANTS$2 = labConstants;
    var unpack$g = utils.unpack;
    var pow$9 = Math.pow;
    var lab2rgb$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$g(args, "lab");
      var l = args[0];
      var a2 = args[1];
      var b2 = args[2];
      var x2, y2, z2, r2, g, b_;
      y2 = (l + 16) / 116;
      x2 = isNaN(a2) ? y2 : y2 + a2 / 500;
      z2 = isNaN(b2) ? y2 : y2 - b2 / 200;
      y2 = LAB_CONSTANTS$2.Yn * lab_xyz(y2);
      x2 = LAB_CONSTANTS$2.Xn * lab_xyz(x2);
      z2 = LAB_CONSTANTS$2.Zn * lab_xyz(z2);
      r2 = xyz_rgb(3.2404542 * x2 - 1.5371385 * y2 - 0.4985314 * z2);
      g = xyz_rgb(-0.969266 * x2 + 1.8760108 * y2 + 0.041556 * z2);
      b_ = xyz_rgb(0.0556434 * x2 - 0.2040259 * y2 + 1.0572252 * z2);
      return [r2, g, b_, args.length > 3 ? args[3] : 1];
    };
    var xyz_rgb = function(r2) {
      return 255 * (r2 <= 304e-5 ? 12.92 * r2 : 1.055 * pow$9(r2, 1 / 2.4) - 0.055);
    };
    var lab_xyz = function(t2) {
      return t2 > LAB_CONSTANTS$2.t1 ? t2 * t2 * t2 : LAB_CONSTANTS$2.t2 * (t2 - LAB_CONSTANTS$2.t0);
    };
    var lab2rgb_1 = lab2rgb$1;
    var unpack$f = utils.unpack;
    var type$e = utils.type;
    var chroma$b = chroma_1;
    var Color$u = Color_1;
    var input$7 = input$h;
    var rgb2lab$1 = rgb2lab_1;
    Color$u.prototype.lab = function() {
      return rgb2lab$1(this._rgb);
    };
    chroma$b.lab = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$u, [null].concat(args, ["lab"])))();
    };
    input$7.format.lab = lab2rgb_1;
    input$7.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$f(args, "lab");
        if (type$e(args) === "array" && args.length === 3) {
          return "lab";
        }
      }
    });
    var unpack$e = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$3 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var round$2 = Math.round;
    var lab2lch$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$e(args, "lab");
      var l = ref2[0];
      var a2 = ref2[1];
      var b2 = ref2[2];
      var c2 = sqrt$3(a2 * a2 + b2 * b2);
      var h2 = (atan2$2(b2, a2) * RAD2DEG + 360) % 360;
      if (round$2(c2 * 1e4) === 0) {
        h2 = Number.NaN;
      }
      return [l, c2, h2];
    };
    var lab2lch_1 = lab2lch$2;
    var unpack$d = utils.unpack;
    var rgb2lab = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;
    var rgb2lch$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$d(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      var ref$1 = rgb2lab(r2, g, b2);
      var l = ref$1[0];
      var a2 = ref$1[1];
      var b_ = ref$1[2];
      return lab2lch$1(l, a2, b_);
    };
    var rgb2lch_1 = rgb2lch$1;
    var unpack$c = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin$3 = Math.sin;
    var cos$3 = Math.cos;
    var lch2lab$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$c(args, "lch");
      var l = ref2[0];
      var c2 = ref2[1];
      var h2 = ref2[2];
      if (isNaN(h2)) {
        h2 = 0;
      }
      h2 = h2 * DEG2RAD;
      return [l, cos$3(h2) * c2, sin$3(h2) * c2];
    };
    var lch2lab_1 = lch2lab$2;
    var unpack$b = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb = lab2rgb_1;
    var lch2rgb$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$b(args, "lch");
      var l = args[0];
      var c2 = args[1];
      var h2 = args[2];
      var ref2 = lch2lab$1(l, c2, h2);
      var L2 = ref2[0];
      var a2 = ref2[1];
      var b_ = ref2[2];
      var ref$1 = lab2rgb(L2, a2, b_);
      var r2 = ref$1[0];
      var g = ref$1[1];
      var b2 = ref$1[2];
      return [r2, g, b2, args.length > 3 ? args[3] : 1];
    };
    var lch2rgb_1 = lch2rgb$1;
    var unpack$a = utils.unpack;
    var lch2rgb = lch2rgb_1;
    var hcl2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var hcl = unpack$a(args, "hcl").reverse();
      return lch2rgb.apply(void 0, hcl);
    };
    var hcl2rgb_1 = hcl2rgb;
    var unpack$9 = utils.unpack;
    var type$d = utils.type;
    var chroma$a = chroma_1;
    var Color$t = Color_1;
    var input$6 = input$h;
    var rgb2lch = rgb2lch_1;
    Color$t.prototype.lch = function() {
      return rgb2lch(this._rgb);
    };
    Color$t.prototype.hcl = function() {
      return rgb2lch(this._rgb).reverse();
    };
    chroma$a.lch = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["lch"])))();
    };
    chroma$a.hcl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["hcl"])))();
    };
    input$6.format.lch = lch2rgb_1;
    input$6.format.hcl = hcl2rgb_1;
    ["lch", "hcl"].forEach(function(m2) {
      return input$6.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$9(args, m2);
          if (type$d(args) === "array" && args.length === 3) {
            return m2;
          }
        }
      });
    });
    var w3cx11$1 = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflower: "#6495ed",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      laserlemon: "#ffff54",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrod: "#fafad2",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      maroon2: "#7f0000",
      maroon3: "#b03060",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      purple2: "#7f007f",
      purple3: "#a020f0",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    };
    var w3cx11_1 = w3cx11$1;
    var Color$s = Color_1;
    var input$5 = input$h;
    var type$c = utils.type;
    var w3cx11 = w3cx11_1;
    var hex2rgb = hex2rgb_1;
    var rgb2hex = rgb2hex_1;
    Color$s.prototype.name = function() {
      var hex = rgb2hex(this._rgb, "rgb");
      for (var i3 = 0, list2 = Object.keys(w3cx11); i3 < list2.length; i3 += 1) {
        var n2 = list2[i3];
        if (w3cx11[n2] === hex) {
          return n2.toLowerCase();
        }
      }
      return hex;
    };
    input$5.format.named = function(name2) {
      name2 = name2.toLowerCase();
      if (w3cx11[name2]) {
        return hex2rgb(w3cx11[name2]);
      }
      throw new Error("unknown color name: " + name2);
    };
    input$5.autodetect.push({
      p: 5,
      test: function(h2) {
        var rest = [], len = arguments.length - 1;
        while (len-- > 0)
          rest[len] = arguments[len + 1];
        if (!rest.length && type$c(h2) === "string" && w3cx11[h2.toLowerCase()]) {
          return "named";
        }
      }
    });
    var unpack$8 = utils.unpack;
    var rgb2num$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$8(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      return (r2 << 16) + (g << 8) + b2;
    };
    var rgb2num_1 = rgb2num$1;
    var type$b = utils.type;
    var num2rgb = function(num2) {
      if (type$b(num2) == "number" && num2 >= 0 && num2 <= 16777215) {
        var r2 = num2 >> 16;
        var g = num2 >> 8 & 255;
        var b2 = num2 & 255;
        return [r2, g, b2, 1];
      }
      throw new Error("unknown num color: " + num2);
    };
    var num2rgb_1 = num2rgb;
    var chroma$9 = chroma_1;
    var Color$r = Color_1;
    var input$4 = input$h;
    var type$a = utils.type;
    var rgb2num = rgb2num_1;
    Color$r.prototype.num = function() {
      return rgb2num(this._rgb);
    };
    chroma$9.num = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$r, [null].concat(args, ["num"])))();
    };
    input$4.format.num = num2rgb_1;
    input$4.autodetect.push({
      p: 5,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        if (args.length === 1 && type$a(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
          return "num";
        }
      }
    });
    var chroma$8 = chroma_1;
    var Color$q = Color_1;
    var input$3 = input$h;
    var unpack$7 = utils.unpack;
    var type$9 = utils.type;
    var round$1 = Math.round;
    Color$q.prototype.rgb = function(rnd2) {
      if (rnd2 === void 0)
        rnd2 = true;
      if (rnd2 === false) {
        return this._rgb.slice(0, 3);
      }
      return this._rgb.slice(0, 3).map(round$1);
    };
    Color$q.prototype.rgba = function(rnd2) {
      if (rnd2 === void 0)
        rnd2 = true;
      return this._rgb.slice(0, 4).map(function(v2, i3) {
        return i3 < 3 ? rnd2 === false ? v2 : round$1(v2) : v2;
      });
    };
    chroma$8.rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$q, [null].concat(args, ["rgb"])))();
    };
    input$3.format.rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgba = unpack$7(args, "rgba");
      if (rgba[3] === void 0) {
        rgba[3] = 1;
      }
      return rgba;
    };
    input$3.autodetect.push({
      p: 3,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$7(args, "rgba");
        if (type$9(args) === "array" && (args.length === 3 || args.length === 4 && type$9(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
          return "rgb";
        }
      }
    });
    var log$1 = Math.log;
    var temperature2rgb$1 = function(kelvin) {
      var temp = kelvin / 100;
      var r2, g, b2;
      if (temp < 66) {
        r2 = 255;
        g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log$1(g);
        b2 = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b2 = temp - 10) + 115.67994401066147 * log$1(b2);
      } else {
        r2 = 351.97690566805693 + 0.114206453784165 * (r2 = temp - 55) - 40.25366309332127 * log$1(r2);
        g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log$1(g);
        b2 = 255;
      }
      return [r2, g, b2, 1];
    };
    var temperature2rgb_1 = temperature2rgb$1;
    var temperature2rgb = temperature2rgb_1;
    var unpack$6 = utils.unpack;
    var round2 = Math.round;
    var rgb2temperature$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgb2 = unpack$6(args, "rgb");
      var r2 = rgb2[0], b2 = rgb2[2];
      var minTemp = 1e3;
      var maxTemp = 4e4;
      var eps = 0.4;
      var temp;
      while (maxTemp - minTemp > eps) {
        temp = (maxTemp + minTemp) * 0.5;
        var rgb$1 = temperature2rgb(temp);
        if (rgb$1[2] / rgb$1[0] >= b2 / r2) {
          maxTemp = temp;
        } else {
          minTemp = temp;
        }
      }
      return round2(temp);
    };
    var rgb2temperature_1 = rgb2temperature$1;
    var chroma$7 = chroma_1;
    var Color$p = Color_1;
    var input$2 = input$h;
    var rgb2temperature = rgb2temperature_1;
    Color$p.prototype.temp = Color$p.prototype.kelvin = Color$p.prototype.temperature = function() {
      return rgb2temperature(this._rgb);
    };
    chroma$7.temp = chroma$7.kelvin = chroma$7.temperature = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$p, [null].concat(args, ["temp"])))();
    };
    input$2.format.temp = input$2.format.kelvin = input$2.format.temperature = temperature2rgb_1;
    var unpack$5 = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$8 = Math.pow;
    var sign$1 = Math.sign;
    var rgb2oklab$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$5(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      var ref$1 = [rgb2lrgb(r2 / 255), rgb2lrgb(g / 255), rgb2lrgb(b2 / 255)];
      var lr = ref$1[0];
      var lg = ref$1[1];
      var lb = ref$1[2];
      var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
      var m2 = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
      var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
      return [
        0.2104542553 * l + 0.793617785 * m2 - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m2 + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m2 - 0.808675766 * s
      ];
    };
    var rgb2oklab_1 = rgb2oklab$2;
    function rgb2lrgb(c2) {
      var abs2 = Math.abs(c2);
      if (abs2 < 0.04045) {
        return c2 / 12.92;
      }
      return (sign$1(c2) || 1) * pow$8((abs2 + 0.055) / 1.055, 2.4);
    }
    var unpack$4 = utils.unpack;
    var pow$7 = Math.pow;
    var sign = Math.sign;
    var oklab2rgb$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$4(args, "lab");
      var L2 = args[0];
      var a2 = args[1];
      var b2 = args[2];
      var l = pow$7(L2 + 0.3963377774 * a2 + 0.2158037573 * b2, 3);
      var m2 = pow$7(L2 - 0.1055613458 * a2 - 0.0638541728 * b2, 3);
      var s = pow$7(L2 - 0.0894841775 * a2 - 1.291485548 * b2, 3);
      return [
        255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m2 + 0.2309699292 * s),
        255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m2 - 0.3413193965 * s),
        255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m2 + 1.707614701 * s),
        args.length > 3 ? args[3] : 1
      ];
    };
    var oklab2rgb_1 = oklab2rgb$1;
    function lrgb2rgb(c2) {
      var abs2 = Math.abs(c2);
      if (abs2 > 31308e-7) {
        return (sign(c2) || 1) * (1.055 * pow$7(abs2, 1 / 2.4) - 0.055);
      }
      return c2 * 12.92;
    }
    var unpack$3 = utils.unpack;
    var type$8 = utils.type;
    var chroma$6 = chroma_1;
    var Color$o = Color_1;
    var input$1 = input$h;
    var rgb2oklab$1 = rgb2oklab_1;
    Color$o.prototype.oklab = function() {
      return rgb2oklab$1(this._rgb);
    };
    chroma$6.oklab = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$o, [null].concat(args, ["oklab"])))();
    };
    input$1.format.oklab = oklab2rgb_1;
    input$1.autodetect.push({
      p: 3,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$3(args, "oklab");
        if (type$8(args) === "array" && args.length === 3) {
          return "oklab";
        }
      }
    });
    var unpack$2 = utils.unpack;
    var rgb2oklab = rgb2oklab_1;
    var lab2lch = lab2lch_1;
    var rgb2oklch$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref2 = unpack$2(args, "rgb");
      var r2 = ref2[0];
      var g = ref2[1];
      var b2 = ref2[2];
      var ref$1 = rgb2oklab(r2, g, b2);
      var l = ref$1[0];
      var a2 = ref$1[1];
      var b_ = ref$1[2];
      return lab2lch(l, a2, b_);
    };
    var rgb2oklch_1 = rgb2oklch$1;
    var unpack$1 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb = oklab2rgb_1;
    var oklch2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$1(args, "lch");
      var l = args[0];
      var c2 = args[1];
      var h2 = args[2];
      var ref2 = lch2lab(l, c2, h2);
      var L2 = ref2[0];
      var a2 = ref2[1];
      var b_ = ref2[2];
      var ref$1 = oklab2rgb(L2, a2, b_);
      var r2 = ref$1[0];
      var g = ref$1[1];
      var b2 = ref$1[2];
      return [r2, g, b2, args.length > 3 ? args[3] : 1];
    };
    var oklch2rgb_1 = oklch2rgb;
    var unpack = utils.unpack;
    var type$7 = utils.type;
    var chroma$5 = chroma_1;
    var Color$n = Color_1;
    var input = input$h;
    var rgb2oklch = rgb2oklch_1;
    Color$n.prototype.oklch = function() {
      return rgb2oklch(this._rgb);
    };
    chroma$5.oklch = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$n, [null].concat(args, ["oklch"])))();
    };
    input.format.oklch = oklch2rgb_1;
    input.autodetect.push({
      p: 3,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack(args, "oklch");
        if (type$7(args) === "array" && args.length === 3) {
          return "oklch";
        }
      }
    });
    var Color$m = Color_1;
    var type$6 = utils.type;
    Color$m.prototype.alpha = function(a2, mutate) {
      if (mutate === void 0)
        mutate = false;
      if (a2 !== void 0 && type$6(a2) === "number") {
        if (mutate) {
          this._rgb[3] = a2;
          return this;
        }
        return new Color$m([this._rgb[0], this._rgb[1], this._rgb[2], a2], "rgb");
      }
      return this._rgb[3];
    };
    var Color$l = Color_1;
    Color$l.prototype.clipped = function() {
      return this._rgb._clipped || false;
    };
    var Color$k = Color_1;
    var LAB_CONSTANTS$1 = labConstants;
    Color$k.prototype.darken = function(amount) {
      if (amount === void 0)
        amount = 1;
      var me = this;
      var lab2 = me.lab();
      lab2[0] -= LAB_CONSTANTS$1.Kn * amount;
      return new Color$k(lab2, "lab").alpha(me.alpha(), true);
    };
    Color$k.prototype.brighten = function(amount) {
      if (amount === void 0)
        amount = 1;
      return this.darken(-amount);
    };
    Color$k.prototype.darker = Color$k.prototype.darken;
    Color$k.prototype.brighter = Color$k.prototype.brighten;
    var Color$j = Color_1;
    Color$j.prototype.get = function(mc) {
      var ref2 = mc.split(".");
      var mode2 = ref2[0];
      var channel = ref2[1];
      var src = this[mode2]();
      if (channel) {
        var i3 = mode2.indexOf(channel) - (mode2.substr(0, 2) === "ok" ? 2 : 0);
        if (i3 > -1) {
          return src[i3];
        }
        throw new Error("unknown channel " + channel + " in mode " + mode2);
      } else {
        return src;
      }
    };
    var Color$i = Color_1;
    var type$5 = utils.type;
    var pow$6 = Math.pow;
    var EPS = 1e-7;
    var MAX_ITER = 20;
    Color$i.prototype.luminance = function(lum) {
      if (lum !== void 0 && type$5(lum) === "number") {
        if (lum === 0) {
          return new Color$i([0, 0, 0, this._rgb[3]], "rgb");
        }
        if (lum === 1) {
          return new Color$i([255, 255, 255, this._rgb[3]], "rgb");
        }
        var cur_lum = this.luminance();
        var mode2 = "rgb";
        var max_iter = MAX_ITER;
        var test = function(low, high) {
          var mid = low.interpolate(high, 0.5, mode2);
          var lm = mid.luminance();
          if (Math.abs(lum - lm) < EPS || !max_iter--) {
            return mid;
          }
          return lm > lum ? test(low, mid) : test(mid, high);
        };
        var rgb2 = (cur_lum > lum ? test(new Color$i([0, 0, 0]), this) : test(this, new Color$i([255, 255, 255]))).rgb();
        return new Color$i(rgb2.concat([this._rgb[3]]));
      }
      return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
    };
    var rgb2luminance = function(r2, g, b2) {
      r2 = luminance_x(r2);
      g = luminance_x(g);
      b2 = luminance_x(b2);
      return 0.2126 * r2 + 0.7152 * g + 0.0722 * b2;
    };
    var luminance_x = function(x2) {
      x2 /= 255;
      return x2 <= 0.03928 ? x2 / 12.92 : pow$6((x2 + 0.055) / 1.055, 2.4);
    };
    var interpolator$1 = {};
    var Color$h = Color_1;
    var type$4 = utils.type;
    var interpolator = interpolator$1;
    var mix$1 = function(col1, col2, f2) {
      if (f2 === void 0)
        f2 = 0.5;
      var rest = [], len = arguments.length - 3;
      while (len-- > 0)
        rest[len] = arguments[len + 3];
      var mode2 = rest[0] || "lrgb";
      if (!interpolator[mode2] && !rest.length) {
        mode2 = Object.keys(interpolator)[0];
      }
      if (!interpolator[mode2]) {
        throw new Error("interpolation mode " + mode2 + " is not defined");
      }
      if (type$4(col1) !== "object") {
        col1 = new Color$h(col1);
      }
      if (type$4(col2) !== "object") {
        col2 = new Color$h(col2);
      }
      return interpolator[mode2](col1, col2, f2).alpha(col1.alpha() + f2 * (col2.alpha() - col1.alpha()));
    };
    var Color$g = Color_1;
    var mix = mix$1;
    Color$g.prototype.mix = Color$g.prototype.interpolate = function(col2, f2) {
      if (f2 === void 0)
        f2 = 0.5;
      var rest = [], len = arguments.length - 2;
      while (len-- > 0)
        rest[len] = arguments[len + 2];
      return mix.apply(void 0, [this, col2, f2].concat(rest));
    };
    var Color$f = Color_1;
    Color$f.prototype.premultiply = function(mutate) {
      if (mutate === void 0)
        mutate = false;
      var rgb2 = this._rgb;
      var a2 = rgb2[3];
      if (mutate) {
        this._rgb = [rgb2[0] * a2, rgb2[1] * a2, rgb2[2] * a2, a2];
        return this;
      } else {
        return new Color$f([rgb2[0] * a2, rgb2[1] * a2, rgb2[2] * a2, a2], "rgb");
      }
    };
    var Color$e = Color_1;
    var LAB_CONSTANTS = labConstants;
    Color$e.prototype.saturate = function(amount) {
      if (amount === void 0)
        amount = 1;
      var me = this;
      var lch2 = me.lch();
      lch2[1] += LAB_CONSTANTS.Kn * amount;
      if (lch2[1] < 0) {
        lch2[1] = 0;
      }
      return new Color$e(lch2, "lch").alpha(me.alpha(), true);
    };
    Color$e.prototype.desaturate = function(amount) {
      if (amount === void 0)
        amount = 1;
      return this.saturate(-amount);
    };
    var Color$d = Color_1;
    var type$3 = utils.type;
    Color$d.prototype.set = function(mc, value, mutate) {
      if (mutate === void 0)
        mutate = false;
      var ref2 = mc.split(".");
      var mode2 = ref2[0];
      var channel = ref2[1];
      var src = this[mode2]();
      if (channel) {
        var i3 = mode2.indexOf(channel) - (mode2.substr(0, 2) === "ok" ? 2 : 0);
        if (i3 > -1) {
          if (type$3(value) == "string") {
            switch (value.charAt(0)) {
              case "+":
                src[i3] += +value;
                break;
              case "-":
                src[i3] += +value;
                break;
              case "*":
                src[i3] *= +value.substr(1);
                break;
              case "/":
                src[i3] /= +value.substr(1);
                break;
              default:
                src[i3] = +value;
            }
          } else if (type$3(value) === "number") {
            src[i3] = value;
          } else {
            throw new Error("unsupported value for Color.set");
          }
          var out = new Color$d(src, mode2);
          if (mutate) {
            this._rgb = out._rgb;
            return this;
          }
          return out;
        }
        throw new Error("unknown channel " + channel + " in mode " + mode2);
      } else {
        return src;
      }
    };
    var Color$c = Color_1;
    var rgb = function(col1, col2, f2) {
      var xyz0 = col1._rgb;
      var xyz1 = col2._rgb;
      return new Color$c(
        xyz0[0] + f2 * (xyz1[0] - xyz0[0]),
        xyz0[1] + f2 * (xyz1[1] - xyz0[1]),
        xyz0[2] + f2 * (xyz1[2] - xyz0[2]),
        "rgb"
      );
    };
    interpolator$1.rgb = rgb;
    var Color$b = Color_1;
    var sqrt$2 = Math.sqrt;
    var pow$5 = Math.pow;
    var lrgb = function(col1, col2, f2) {
      var ref2 = col1._rgb;
      var x1 = ref2[0];
      var y1 = ref2[1];
      var z1 = ref2[2];
      var ref$1 = col2._rgb;
      var x2 = ref$1[0];
      var y2 = ref$1[1];
      var z2 = ref$1[2];
      return new Color$b(
        sqrt$2(pow$5(x1, 2) * (1 - f2) + pow$5(x2, 2) * f2),
        sqrt$2(pow$5(y1, 2) * (1 - f2) + pow$5(y2, 2) * f2),
        sqrt$2(pow$5(z1, 2) * (1 - f2) + pow$5(z2, 2) * f2),
        "rgb"
      );
    };
    interpolator$1.lrgb = lrgb;
    var Color$a = Color_1;
    var lab = function(col1, col2, f2) {
      var xyz0 = col1.lab();
      var xyz1 = col2.lab();
      return new Color$a(
        xyz0[0] + f2 * (xyz1[0] - xyz0[0]),
        xyz0[1] + f2 * (xyz1[1] - xyz0[1]),
        xyz0[2] + f2 * (xyz1[2] - xyz0[2]),
        "lab"
      );
    };
    interpolator$1.lab = lab;
    var Color$9 = Color_1;
    var _hsx = function(col1, col2, f2, m2) {
      var assign2, assign$12;
      var xyz0, xyz1;
      if (m2 === "hsl") {
        xyz0 = col1.hsl();
        xyz1 = col2.hsl();
      } else if (m2 === "hsv") {
        xyz0 = col1.hsv();
        xyz1 = col2.hsv();
      } else if (m2 === "hcg") {
        xyz0 = col1.hcg();
        xyz1 = col2.hcg();
      } else if (m2 === "hsi") {
        xyz0 = col1.hsi();
        xyz1 = col2.hsi();
      } else if (m2 === "lch" || m2 === "hcl") {
        m2 = "hcl";
        xyz0 = col1.hcl();
        xyz1 = col2.hcl();
      } else if (m2 === "oklch") {
        xyz0 = col1.oklch().reverse();
        xyz1 = col2.oklch().reverse();
      }
      var hue0, hue1, sat0, sat1, lbv0, lbv1;
      if (m2.substr(0, 1) === "h" || m2 === "oklch") {
        assign2 = xyz0, hue0 = assign2[0], sat0 = assign2[1], lbv0 = assign2[2];
        assign$12 = xyz1, hue1 = assign$12[0], sat1 = assign$12[1], lbv1 = assign$12[2];
      }
      var sat, hue, lbv, dh;
      if (!isNaN(hue0) && !isNaN(hue1)) {
        if (hue1 > hue0 && hue1 - hue0 > 180) {
          dh = hue1 - (hue0 + 360);
        } else if (hue1 < hue0 && hue0 - hue1 > 180) {
          dh = hue1 + 360 - hue0;
        } else {
          dh = hue1 - hue0;
        }
        hue = hue0 + f2 * dh;
      } else if (!isNaN(hue0)) {
        hue = hue0;
        if ((lbv1 == 1 || lbv1 == 0) && m2 != "hsv") {
          sat = sat0;
        }
      } else if (!isNaN(hue1)) {
        hue = hue1;
        if ((lbv0 == 1 || lbv0 == 0) && m2 != "hsv") {
          sat = sat1;
        }
      } else {
        hue = Number.NaN;
      }
      if (sat === void 0) {
        sat = sat0 + f2 * (sat1 - sat0);
      }
      lbv = lbv0 + f2 * (lbv1 - lbv0);
      return m2 === "oklch" ? new Color$9([lbv, sat, hue], m2) : new Color$9([hue, sat, lbv], m2);
    };
    var interpolate_hsx$5 = _hsx;
    var lch = function(col1, col2, f2) {
      return interpolate_hsx$5(col1, col2, f2, "lch");
    };
    interpolator$1.lch = lch;
    interpolator$1.hcl = lch;
    var Color$8 = Color_1;
    var num = function(col1, col2, f2) {
      var c1 = col1.num();
      var c2 = col2.num();
      return new Color$8(c1 + f2 * (c2 - c1), "num");
    };
    interpolator$1.num = num;
    var interpolate_hsx$4 = _hsx;
    var hcg = function(col1, col2, f2) {
      return interpolate_hsx$4(col1, col2, f2, "hcg");
    };
    interpolator$1.hcg = hcg;
    var interpolate_hsx$3 = _hsx;
    var hsi = function(col1, col2, f2) {
      return interpolate_hsx$3(col1, col2, f2, "hsi");
    };
    interpolator$1.hsi = hsi;
    var interpolate_hsx$2 = _hsx;
    var hsl = function(col1, col2, f2) {
      return interpolate_hsx$2(col1, col2, f2, "hsl");
    };
    interpolator$1.hsl = hsl;
    var interpolate_hsx$1 = _hsx;
    var hsv = function(col1, col2, f2) {
      return interpolate_hsx$1(col1, col2, f2, "hsv");
    };
    interpolator$1.hsv = hsv;
    var Color$7 = Color_1;
    var oklab = function(col1, col2, f2) {
      var xyz0 = col1.oklab();
      var xyz1 = col2.oklab();
      return new Color$7(
        xyz0[0] + f2 * (xyz1[0] - xyz0[0]),
        xyz0[1] + f2 * (xyz1[1] - xyz0[1]),
        xyz0[2] + f2 * (xyz1[2] - xyz0[2]),
        "oklab"
      );
    };
    interpolator$1.oklab = oklab;
    var interpolate_hsx = _hsx;
    var oklch = function(col1, col2, f2) {
      return interpolate_hsx(col1, col2, f2, "oklch");
    };
    interpolator$1.oklch = oklch;
    var Color$6 = Color_1;
    var clip_rgb$1 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$1 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var atan2$1 = Math.atan2;
    var average = function(colors2, mode2, weights) {
      if (mode2 === void 0)
        mode2 = "lrgb";
      if (weights === void 0)
        weights = null;
      var l = colors2.length;
      if (!weights) {
        weights = Array.from(new Array(l)).map(function() {
          return 1;
        });
      }
      var k2 = l / weights.reduce(function(a2, b2) {
        return a2 + b2;
      });
      weights.forEach(function(w2, i4) {
        weights[i4] *= k2;
      });
      colors2 = colors2.map(function(c2) {
        return new Color$6(c2);
      });
      if (mode2 === "lrgb") {
        return _average_lrgb(colors2, weights);
      }
      var first = colors2.shift();
      var xyz = first.get(mode2);
      var cnt = [];
      var dx = 0;
      var dy = 0;
      for (var i3 = 0; i3 < xyz.length; i3++) {
        xyz[i3] = (xyz[i3] || 0) * weights[0];
        cnt.push(isNaN(xyz[i3]) ? 0 : weights[0]);
        if (mode2.charAt(i3) === "h" && !isNaN(xyz[i3])) {
          var A2 = xyz[i3] / 180 * PI$1;
          dx += cos$2(A2) * weights[0];
          dy += sin$2(A2) * weights[0];
        }
      }
      var alpha = first.alpha() * weights[0];
      colors2.forEach(function(c2, ci) {
        var xyz2 = c2.get(mode2);
        alpha += c2.alpha() * weights[ci + 1];
        for (var i4 = 0; i4 < xyz.length; i4++) {
          if (!isNaN(xyz2[i4])) {
            cnt[i4] += weights[ci + 1];
            if (mode2.charAt(i4) === "h") {
              var A3 = xyz2[i4] / 180 * PI$1;
              dx += cos$2(A3) * weights[ci + 1];
              dy += sin$2(A3) * weights[ci + 1];
            } else {
              xyz[i4] += xyz2[i4] * weights[ci + 1];
            }
          }
        }
      });
      for (var i$12 = 0; i$12 < xyz.length; i$12++) {
        if (mode2.charAt(i$12) === "h") {
          var A$12 = atan2$1(dy / cnt[i$12], dx / cnt[i$12]) / PI$1 * 180;
          while (A$12 < 0) {
            A$12 += 360;
          }
          while (A$12 >= 360) {
            A$12 -= 360;
          }
          xyz[i$12] = A$12;
        } else {
          xyz[i$12] = xyz[i$12] / cnt[i$12];
        }
      }
      alpha /= l;
      return new Color$6(xyz, mode2).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };
    var _average_lrgb = function(colors2, weights) {
      var l = colors2.length;
      var xyz = [0, 0, 0, 0];
      for (var i3 = 0; i3 < colors2.length; i3++) {
        var col = colors2[i3];
        var f2 = weights[i3] / l;
        var rgb2 = col._rgb;
        xyz[0] += pow$4(rgb2[0], 2) * f2;
        xyz[1] += pow$4(rgb2[1], 2) * f2;
        xyz[2] += pow$4(rgb2[2], 2) * f2;
        xyz[3] += rgb2[3] * f2;
      }
      xyz[0] = sqrt$1(xyz[0]);
      xyz[1] = sqrt$1(xyz[1]);
      xyz[2] = sqrt$1(xyz[2]);
      if (xyz[3] > 0.9999999) {
        xyz[3] = 1;
      }
      return new Color$6(clip_rgb$1(xyz));
    };
    var chroma$4 = chroma_1;
    var type$2 = utils.type;
    var pow$3 = Math.pow;
    var scale$2 = function(colors2) {
      var _mode = "rgb";
      var _nacol = chroma$4("#ccc");
      var _spread = 0;
      var _domain = [0, 1];
      var _pos = [];
      var _padding = [0, 0];
      var _classes = false;
      var _colors = [];
      var _out = false;
      var _min = 0;
      var _max = 1;
      var _correctLightness = false;
      var _colorCache = {};
      var _useCache = true;
      var _gamma = 1;
      var setColors = function(colors3) {
        colors3 = colors3 || ["#fff", "#000"];
        if (colors3 && type$2(colors3) === "string" && chroma$4.brewer && chroma$4.brewer[colors3.toLowerCase()]) {
          colors3 = chroma$4.brewer[colors3.toLowerCase()];
        }
        if (type$2(colors3) === "array") {
          if (colors3.length === 1) {
            colors3 = [colors3[0], colors3[0]];
          }
          colors3 = colors3.slice(0);
          for (var c2 = 0; c2 < colors3.length; c2++) {
            colors3[c2] = chroma$4(colors3[c2]);
          }
          _pos.length = 0;
          for (var c$1 = 0; c$1 < colors3.length; c$1++) {
            _pos.push(c$1 / (colors3.length - 1));
          }
        }
        resetCache();
        return _colors = colors3;
      };
      var getClass = function(value) {
        if (_classes != null) {
          var n2 = _classes.length - 1;
          var i3 = 0;
          while (i3 < n2 && value >= _classes[i3]) {
            i3++;
          }
          return i3 - 1;
        }
        return 0;
      };
      var tMapLightness = function(t2) {
        return t2;
      };
      var tMapDomain = function(t2) {
        return t2;
      };
      var getColor = function(val, bypassMap) {
        var col, t2;
        if (bypassMap == null) {
          bypassMap = false;
        }
        if (isNaN(val) || val === null) {
          return _nacol;
        }
        if (!bypassMap) {
          if (_classes && _classes.length > 2) {
            var c2 = getClass(val);
            t2 = c2 / (_classes.length - 2);
          } else if (_max !== _min) {
            t2 = (val - _min) / (_max - _min);
          } else {
            t2 = 1;
          }
        } else {
          t2 = val;
        }
        t2 = tMapDomain(t2);
        if (!bypassMap) {
          t2 = tMapLightness(t2);
        }
        if (_gamma !== 1) {
          t2 = pow$3(t2, _gamma);
        }
        t2 = _padding[0] + t2 * (1 - _padding[0] - _padding[1]);
        t2 = Math.min(1, Math.max(0, t2));
        var k2 = Math.floor(t2 * 1e4);
        if (_useCache && _colorCache[k2]) {
          col = _colorCache[k2];
        } else {
          if (type$2(_colors) === "array") {
            for (var i3 = 0; i3 < _pos.length; i3++) {
              var p2 = _pos[i3];
              if (t2 <= p2) {
                col = _colors[i3];
                break;
              }
              if (t2 >= p2 && i3 === _pos.length - 1) {
                col = _colors[i3];
                break;
              }
              if (t2 > p2 && t2 < _pos[i3 + 1]) {
                t2 = (t2 - p2) / (_pos[i3 + 1] - p2);
                col = chroma$4.interpolate(_colors[i3], _colors[i3 + 1], t2, _mode);
                break;
              }
            }
          } else if (type$2(_colors) === "function") {
            col = _colors(t2);
          }
          if (_useCache) {
            _colorCache[k2] = col;
          }
        }
        return col;
      };
      var resetCache = function() {
        return _colorCache = {};
      };
      setColors(colors2);
      var f2 = function(v2) {
        var c2 = chroma$4(getColor(v2));
        if (_out && c2[_out]) {
          return c2[_out]();
        } else {
          return c2;
        }
      };
      f2.classes = function(classes) {
        if (classes != null) {
          if (type$2(classes) === "array") {
            _classes = classes;
            _domain = [classes[0], classes[classes.length - 1]];
          } else {
            var d2 = chroma$4.analyze(_domain);
            if (classes === 0) {
              _classes = [d2.min, d2.max];
            } else {
              _classes = chroma$4.limits(d2, "e", classes);
            }
          }
          return f2;
        }
        return _classes;
      };
      f2.domain = function(domain) {
        if (!arguments.length) {
          return _domain;
        }
        _min = domain[0];
        _max = domain[domain.length - 1];
        _pos = [];
        var k2 = _colors.length;
        if (domain.length === k2 && _min !== _max) {
          for (var i3 = 0, list2 = Array.from(domain); i3 < list2.length; i3 += 1) {
            var d2 = list2[i3];
            _pos.push((d2 - _min) / (_max - _min));
          }
        } else {
          for (var c2 = 0; c2 < k2; c2++) {
            _pos.push(c2 / (k2 - 1));
          }
          if (domain.length > 2) {
            var tOut = domain.map(function(d3, i4) {
              return i4 / (domain.length - 1);
            });
            var tBreaks = domain.map(function(d3) {
              return (d3 - _min) / (_max - _min);
            });
            if (!tBreaks.every(function(val, i4) {
              return tOut[i4] === val;
            })) {
              tMapDomain = function(t2) {
                if (t2 <= 0 || t2 >= 1) {
                  return t2;
                }
                var i4 = 0;
                while (t2 >= tBreaks[i4 + 1]) {
                  i4++;
                }
                var f3 = (t2 - tBreaks[i4]) / (tBreaks[i4 + 1] - tBreaks[i4]);
                var out = tOut[i4] + f3 * (tOut[i4 + 1] - tOut[i4]);
                return out;
              };
            }
          }
        }
        _domain = [_min, _max];
        return f2;
      };
      f2.mode = function(_m) {
        if (!arguments.length) {
          return _mode;
        }
        _mode = _m;
        resetCache();
        return f2;
      };
      f2.range = function(colors3, _pos2) {
        setColors(colors3);
        return f2;
      };
      f2.out = function(_o) {
        _out = _o;
        return f2;
      };
      f2.spread = function(val) {
        if (!arguments.length) {
          return _spread;
        }
        _spread = val;
        return f2;
      };
      f2.correctLightness = function(v2) {
        if (v2 == null) {
          v2 = true;
        }
        _correctLightness = v2;
        resetCache();
        if (_correctLightness) {
          tMapLightness = function(t2) {
            var L0 = getColor(0, true).lab()[0];
            var L1 = getColor(1, true).lab()[0];
            var pol = L0 > L1;
            var L_actual = getColor(t2, true).lab()[0];
            var L_ideal = L0 + (L1 - L0) * t2;
            var L_diff = L_actual - L_ideal;
            var t0 = 0;
            var t1 = 1;
            var max_iter = 20;
            while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
              (function() {
                if (pol) {
                  L_diff *= -1;
                }
                if (L_diff < 0) {
                  t0 = t2;
                  t2 += (t1 - t2) * 0.5;
                } else {
                  t1 = t2;
                  t2 += (t0 - t2) * 0.5;
                }
                L_actual = getColor(t2, true).lab()[0];
                return L_diff = L_actual - L_ideal;
              })();
            }
            return t2;
          };
        } else {
          tMapLightness = function(t2) {
            return t2;
          };
        }
        return f2;
      };
      f2.padding = function(p2) {
        if (p2 != null) {
          if (type$2(p2) === "number") {
            p2 = [p2, p2];
          }
          _padding = p2;
          return f2;
        } else {
          return _padding;
        }
      };
      f2.colors = function(numColors, out) {
        if (arguments.length < 2) {
          out = "hex";
        }
        var result = [];
        if (arguments.length === 0) {
          result = _colors.slice(0);
        } else if (numColors === 1) {
          result = [f2(0.5)];
        } else if (numColors > 1) {
          var dm = _domain[0];
          var dd = _domain[1] - dm;
          result = __range__(0, numColors, false).map(function(i4) {
            return f2(dm + i4 / (numColors - 1) * dd);
          });
        } else {
          colors2 = [];
          var samples = [];
          if (_classes && _classes.length > 2) {
            for (var i3 = 1, end = _classes.length, asc = 1 <= end; asc ? i3 < end : i3 > end; asc ? i3++ : i3--) {
              samples.push((_classes[i3 - 1] + _classes[i3]) * 0.5);
            }
          } else {
            samples = _domain;
          }
          result = samples.map(function(v2) {
            return f2(v2);
          });
        }
        if (chroma$4[out]) {
          result = result.map(function(c2) {
            return c2[out]();
          });
        }
        return result;
      };
      f2.cache = function(c2) {
        if (c2 != null) {
          _useCache = c2;
          return f2;
        } else {
          return _useCache;
        }
      };
      f2.gamma = function(g) {
        if (g != null) {
          _gamma = g;
          return f2;
        } else {
          return _gamma;
        }
      };
      f2.nodata = function(d2) {
        if (d2 != null) {
          _nacol = chroma$4(d2);
          return f2;
        } else {
          return _nacol;
        }
      };
      return f2;
    };
    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i3 = left; ascending ? i3 < end : i3 > end; ascending ? i3++ : i3--) {
        range.push(i3);
      }
      return range;
    }
    var Color$5 = Color_1;
    var scale$1 = scale$2;
    var binom_row = function(n2) {
      var row = [1, 1];
      for (var i3 = 1; i3 < n2; i3++) {
        var newrow = [1];
        for (var j2 = 1; j2 <= row.length; j2++) {
          newrow[j2] = (row[j2] || 0) + row[j2 - 1];
        }
        row = newrow;
      }
      return row;
    };
    var bezier = function(colors2) {
      var assign2, assign$12, assign$22;
      var I2, lab0, lab1, lab2;
      colors2 = colors2.map(function(c2) {
        return new Color$5(c2);
      });
      if (colors2.length === 2) {
        assign2 = colors2.map(function(c2) {
          return c2.lab();
        }), lab0 = assign2[0], lab1 = assign2[1];
        I2 = function(t2) {
          var lab4 = [0, 1, 2].map(function(i3) {
            return lab0[i3] + t2 * (lab1[i3] - lab0[i3]);
          });
          return new Color$5(lab4, "lab");
        };
      } else if (colors2.length === 3) {
        assign$12 = colors2.map(function(c2) {
          return c2.lab();
        }), lab0 = assign$12[0], lab1 = assign$12[1], lab2 = assign$12[2];
        I2 = function(t2) {
          var lab4 = [0, 1, 2].map(function(i3) {
            return (1 - t2) * (1 - t2) * lab0[i3] + 2 * (1 - t2) * t2 * lab1[i3] + t2 * t2 * lab2[i3];
          });
          return new Color$5(lab4, "lab");
        };
      } else if (colors2.length === 4) {
        var lab3;
        assign$22 = colors2.map(function(c2) {
          return c2.lab();
        }), lab0 = assign$22[0], lab1 = assign$22[1], lab2 = assign$22[2], lab3 = assign$22[3];
        I2 = function(t2) {
          var lab4 = [0, 1, 2].map(function(i3) {
            return (1 - t2) * (1 - t2) * (1 - t2) * lab0[i3] + 3 * (1 - t2) * (1 - t2) * t2 * lab1[i3] + 3 * (1 - t2) * t2 * t2 * lab2[i3] + t2 * t2 * t2 * lab3[i3];
          });
          return new Color$5(lab4, "lab");
        };
      } else if (colors2.length >= 5) {
        var labs, row, n2;
        labs = colors2.map(function(c2) {
          return c2.lab();
        });
        n2 = colors2.length - 1;
        row = binom_row(n2);
        I2 = function(t2) {
          var u2 = 1 - t2;
          var lab4 = [0, 1, 2].map(function(i3) {
            return labs.reduce(function(sum, el, j2) {
              return sum + row[j2] * Math.pow(u2, n2 - j2) * Math.pow(t2, j2) * el[i3];
            }, 0);
          });
          return new Color$5(lab4, "lab");
        };
      } else {
        throw new RangeError("No point in running bezier with only one color.");
      }
      return I2;
    };
    var bezier_1 = function(colors2) {
      var f2 = bezier(colors2);
      f2.scale = function() {
        return scale$1(f2);
      };
      return f2;
    };
    var chroma$3 = chroma_1;
    var blend = function(bottom, top, mode2) {
      if (!blend[mode2]) {
        throw new Error("unknown blend mode " + mode2);
      }
      return blend[mode2](bottom, top);
    };
    var blend_f = function(f2) {
      return function(bottom, top) {
        var c0 = chroma$3(top).rgb();
        var c1 = chroma$3(bottom).rgb();
        return chroma$3.rgb(f2(c0, c1));
      };
    };
    var each = function(f2) {
      return function(c0, c1) {
        var out = [];
        out[0] = f2(c0[0], c1[0]);
        out[1] = f2(c0[1], c1[1]);
        out[2] = f2(c0[2], c1[2]);
        return out;
      };
    };
    var normal = function(a2) {
      return a2;
    };
    var multiply = function(a2, b2) {
      return a2 * b2 / 255;
    };
    var darken = function(a2, b2) {
      return a2 > b2 ? b2 : a2;
    };
    var lighten = function(a2, b2) {
      return a2 > b2 ? a2 : b2;
    };
    var screen = function(a2, b2) {
      return 255 * (1 - (1 - a2 / 255) * (1 - b2 / 255));
    };
    var overlay = function(a2, b2) {
      return b2 < 128 ? 2 * a2 * b2 / 255 : 255 * (1 - 2 * (1 - a2 / 255) * (1 - b2 / 255));
    };
    var burn = function(a2, b2) {
      return 255 * (1 - (1 - b2 / 255) / (a2 / 255));
    };
    var dodge = function(a2, b2) {
      if (a2 === 255) {
        return 255;
      }
      a2 = 255 * (b2 / 255) / (1 - a2 / 255);
      return a2 > 255 ? 255 : a2;
    };
    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    var blend_1 = blend;
    var type$1 = utils.type;
    var clip_rgb = utils.clip_rgb;
    var TWOPI = utils.TWOPI;
    var pow$2 = Math.pow;
    var sin$1 = Math.sin;
    var cos$1 = Math.cos;
    var chroma$2 = chroma_1;
    var cubehelix = function(start, rotations, hue, gamma, lightness) {
      if (start === void 0)
        start = 300;
      if (rotations === void 0)
        rotations = -1.5;
      if (hue === void 0)
        hue = 1;
      if (gamma === void 0)
        gamma = 1;
      if (lightness === void 0)
        lightness = [0, 1];
      var dh = 0, dl;
      if (type$1(lightness) === "array") {
        dl = lightness[1] - lightness[0];
      } else {
        dl = 0;
        lightness = [lightness, lightness];
      }
      var f2 = function(fract) {
        var a2 = TWOPI * ((start + 120) / 360 + rotations * fract);
        var l = pow$2(lightness[0] + dl * fract, gamma);
        var h2 = dh !== 0 ? hue[0] + fract * dh : hue;
        var amp = h2 * l * (1 - l) / 2;
        var cos_a = cos$1(a2);
        var sin_a = sin$1(a2);
        var r2 = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
        var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
        var b2 = l + amp * (1.97294 * cos_a);
        return chroma$2(clip_rgb([r2 * 255, g * 255, b2 * 255, 1]));
      };
      f2.start = function(s) {
        if (s == null) {
          return start;
        }
        start = s;
        return f2;
      };
      f2.rotations = function(r2) {
        if (r2 == null) {
          return rotations;
        }
        rotations = r2;
        return f2;
      };
      f2.gamma = function(g) {
        if (g == null) {
          return gamma;
        }
        gamma = g;
        return f2;
      };
      f2.hue = function(h2) {
        if (h2 == null) {
          return hue;
        }
        hue = h2;
        if (type$1(hue) === "array") {
          dh = hue[1] - hue[0];
          if (dh === 0) {
            hue = hue[1];
          }
        } else {
          dh = 0;
        }
        return f2;
      };
      f2.lightness = function(h2) {
        if (h2 == null) {
          return lightness;
        }
        if (type$1(h2) === "array") {
          lightness = h2;
          dl = h2[1] - h2[0];
        } else {
          lightness = [h2, h2];
          dl = 0;
        }
        return f2;
      };
      f2.scale = function() {
        return chroma$2.scale(f2);
      };
      f2.hue(hue);
      return f2;
    };
    var Color$4 = Color_1;
    var digits = "0123456789abcdef";
    var floor$1 = Math.floor;
    var random = Math.random;
    var random_1 = function() {
      var code = "#";
      for (var i3 = 0; i3 < 6; i3++) {
        code += digits.charAt(floor$1(random() * 16));
      }
      return new Color$4(code, "hex");
    };
    var type = type$p;
    var log = Math.log;
    var pow$1 = Math.pow;
    var floor = Math.floor;
    var abs$1 = Math.abs;
    var analyze = function(data, key2) {
      if (key2 === void 0)
        key2 = null;
      var r2 = {
        min: Number.MAX_VALUE,
        max: Number.MAX_VALUE * -1,
        sum: 0,
        values: [],
        count: 0
      };
      if (type(data) === "object") {
        data = Object.values(data);
      }
      data.forEach(function(val) {
        if (key2 && type(val) === "object") {
          val = val[key2];
        }
        if (val !== void 0 && val !== null && !isNaN(val)) {
          r2.values.push(val);
          r2.sum += val;
          if (val < r2.min) {
            r2.min = val;
          }
          if (val > r2.max) {
            r2.max = val;
          }
          r2.count += 1;
        }
      });
      r2.domain = [r2.min, r2.max];
      r2.limits = function(mode2, num2) {
        return limits(r2, mode2, num2);
      };
      return r2;
    };
    var limits = function(data, mode2, num2) {
      if (mode2 === void 0)
        mode2 = "equal";
      if (num2 === void 0)
        num2 = 7;
      if (type(data) == "array") {
        data = analyze(data);
      }
      var min3 = data.min;
      var max3 = data.max;
      var values = data.values.sort(function(a2, b2) {
        return a2 - b2;
      });
      if (num2 === 1) {
        return [min3, max3];
      }
      var limits2 = [];
      if (mode2.substr(0, 1) === "c") {
        limits2.push(min3);
        limits2.push(max3);
      }
      if (mode2.substr(0, 1) === "e") {
        limits2.push(min3);
        for (var i3 = 1; i3 < num2; i3++) {
          limits2.push(min3 + i3 / num2 * (max3 - min3));
        }
        limits2.push(max3);
      } else if (mode2.substr(0, 1) === "l") {
        if (min3 <= 0) {
          throw new Error("Logarithmic scales are only possible for values > 0");
        }
        var min_log = Math.LOG10E * log(min3);
        var max_log = Math.LOG10E * log(max3);
        limits2.push(min3);
        for (var i$12 = 1; i$12 < num2; i$12++) {
          limits2.push(pow$1(10, min_log + i$12 / num2 * (max_log - min_log)));
        }
        limits2.push(max3);
      } else if (mode2.substr(0, 1) === "q") {
        limits2.push(min3);
        for (var i$2 = 1; i$2 < num2; i$2++) {
          var p2 = (values.length - 1) * i$2 / num2;
          var pb = floor(p2);
          if (pb === p2) {
            limits2.push(values[pb]);
          } else {
            var pr = p2 - pb;
            limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
          }
        }
        limits2.push(max3);
      } else if (mode2.substr(0, 1) === "k") {
        var cluster;
        var n2 = values.length;
        var assignments = new Array(n2);
        var clusterSizes = new Array(num2);
        var repeat = true;
        var nb_iters = 0;
        var centroids = null;
        centroids = [];
        centroids.push(min3);
        for (var i$3 = 1; i$3 < num2; i$3++) {
          centroids.push(min3 + i$3 / num2 * (max3 - min3));
        }
        centroids.push(max3);
        while (repeat) {
          for (var j2 = 0; j2 < num2; j2++) {
            clusterSizes[j2] = 0;
          }
          for (var i$4 = 0; i$4 < n2; i$4++) {
            var value = values[i$4];
            var mindist = Number.MAX_VALUE;
            var best = void 0;
            for (var j$12 = 0; j$12 < num2; j$12++) {
              var dist = abs$1(centroids[j$12] - value);
              if (dist < mindist) {
                mindist = dist;
                best = j$12;
              }
              clusterSizes[best]++;
              assignments[i$4] = best;
            }
          }
          var newCentroids = new Array(num2);
          for (var j$2 = 0; j$2 < num2; j$2++) {
            newCentroids[j$2] = null;
          }
          for (var i$5 = 0; i$5 < n2; i$5++) {
            cluster = assignments[i$5];
            if (newCentroids[cluster] === null) {
              newCentroids[cluster] = values[i$5];
            } else {
              newCentroids[cluster] += values[i$5];
            }
          }
          for (var j$3 = 0; j$3 < num2; j$3++) {
            newCentroids[j$3] *= 1 / clusterSizes[j$3];
          }
          repeat = false;
          for (var j$4 = 0; j$4 < num2; j$4++) {
            if (newCentroids[j$4] !== centroids[j$4]) {
              repeat = true;
              break;
            }
          }
          centroids = newCentroids;
          nb_iters++;
          if (nb_iters > 200) {
            repeat = false;
          }
        }
        var kClusters = {};
        for (var j$5 = 0; j$5 < num2; j$5++) {
          kClusters[j$5] = [];
        }
        for (var i$6 = 0; i$6 < n2; i$6++) {
          cluster = assignments[i$6];
          kClusters[cluster].push(values[i$6]);
        }
        var tmpKMeansBreaks = [];
        for (var j$6 = 0; j$6 < num2; j$6++) {
          tmpKMeansBreaks.push(kClusters[j$6][0]);
          tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
        }
        tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a2, b2) {
          return a2 - b2;
        });
        limits2.push(tmpKMeansBreaks[0]);
        for (var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2) {
          var v2 = tmpKMeansBreaks[i$7];
          if (!isNaN(v2) && limits2.indexOf(v2) === -1) {
            limits2.push(v2);
          }
        }
      }
      return limits2;
    };
    var analyze_1 = { analyze, limits };
    var Color$3 = Color_1;
    var contrast = function(a2, b2) {
      a2 = new Color$3(a2);
      b2 = new Color$3(b2);
      var l1 = a2.luminance();
      var l2 = b2.luminance();
      return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };
    var Color$2 = Color_1;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var min2 = Math.min;
    var max2 = Math.max;
    var atan2 = Math.atan2;
    var abs = Math.abs;
    var cos = Math.cos;
    var sin = Math.sin;
    var exp = Math.exp;
    var PI = Math.PI;
    var deltaE = function(a2, b2, Kl, Kc, Kh) {
      if (Kl === void 0)
        Kl = 1;
      if (Kc === void 0)
        Kc = 1;
      if (Kh === void 0)
        Kh = 1;
      var rad2deg = function(rad) {
        return 360 * rad / (2 * PI);
      };
      var deg2rad = function(deg) {
        return 2 * PI * deg / 360;
      };
      a2 = new Color$2(a2);
      b2 = new Color$2(b2);
      var ref2 = Array.from(a2.lab());
      var L1 = ref2[0];
      var a1 = ref2[1];
      var b1 = ref2[2];
      var ref$1 = Array.from(b2.lab());
      var L2 = ref$1[0];
      var a22 = ref$1[1];
      var b22 = ref$1[2];
      var avgL = (L1 + L2) / 2;
      var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
      var C2 = sqrt(pow(a22, 2) + pow(b22, 2));
      var avgC = (C1 + C2) / 2;
      var G2 = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
      var a1p = a1 * (1 + G2);
      var a2p = a22 * (1 + G2);
      var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
      var C2p = sqrt(pow(a2p, 2) + pow(b22, 2));
      var avgCp = (C1p + C2p) / 2;
      var arctan1 = rad2deg(atan2(b1, a1p));
      var arctan2 = rad2deg(atan2(b22, a2p));
      var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
      var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
      var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
      var T2 = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
      var deltaHp = h2p - h1p;
      deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
      deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
      var deltaL = L2 - L1;
      var deltaCp = C2p - C1p;
      var sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
      var sc = 1 + 0.045 * avgCp;
      var sh = 1 + 0.015 * avgCp * T2;
      var deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
      var Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
      var Rt = -Rc * sin(2 * deg2rad(deltaTheta));
      var result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
      return max2(0, min2(100, result));
    };
    var Color$1 = Color_1;
    var distance = function(a2, b2, mode2) {
      if (mode2 === void 0)
        mode2 = "lab";
      a2 = new Color$1(a2);
      b2 = new Color$1(b2);
      var l1 = a2.get(mode2);
      var l2 = b2.get(mode2);
      var sum_sq = 0;
      for (var i3 in l1) {
        var d2 = (l1[i3] || 0) - (l2[i3] || 0);
        sum_sq += d2 * d2;
      }
      return Math.sqrt(sum_sq);
    };
    var Color = Color_1;
    var valid = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      try {
        new (Function.prototype.bind.apply(Color, [null].concat(args)))();
        return true;
      } catch (e2) {
        return false;
      }
    };
    var chroma$12 = chroma_1;
    var scale = scale$2;
    var scales = {
      cool: function cool() {
        return scale([chroma$12.hsl(180, 1, 0.9), chroma$12.hsl(250, 0.7, 0.4)]);
      },
      hot: function hot() {
        return scale(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
      }
    };
    var colorbrewer = {
      OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
      PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
      BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
      Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
      BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
      YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
      YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
      Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
      RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
      Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
      YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
      Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
      GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
      Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
      YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
      PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
      Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
      PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
      Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
      Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
      RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
      RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
      PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
      PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
      RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
      BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
      RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
      PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
      Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
      Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
      Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
      Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
      Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
      Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
      Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
      Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
    };
    for (var i2 = 0, list = Object.keys(colorbrewer); i2 < list.length; i2 += 1) {
      var key = list[i2];
      colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }
    var colorbrewer_1 = colorbrewer;
    var chroma2 = chroma_1;
    chroma2.average = average;
    chroma2.bezier = bezier_1;
    chroma2.blend = blend_1;
    chroma2.cubehelix = cubehelix;
    chroma2.mix = chroma2.interpolate = mix$1;
    chroma2.random = random_1;
    chroma2.scale = scale$2;
    chroma2.analyze = analyze_1.analyze;
    chroma2.contrast = contrast;
    chroma2.deltaE = deltaE;
    chroma2.distance = distance;
    chroma2.limits = analyze_1.limits;
    chroma2.valid = valid;
    chroma2.scales = scales;
    chroma2.colors = w3cx11_1;
    chroma2.brewer = colorbrewer_1;
    var chroma_js = chroma2;
    return chroma_js;
  });
})(chroma$1);
const chroma = chroma$1.exports;
var black = "#000";
var white = "#fff";
var rose = {
  50: "#fff1f2",
  100: "#ffe4e6",
  200: "#fecdd3",
  300: "#fda4af",
  400: "#fb7185",
  500: "#f43f5e",
  600: "#e11d48",
  700: "#be123c",
  800: "#9f1239",
  900: "#881337"
};
var pink = {
  50: "#fdf2f8",
  100: "#fce7f3",
  200: "#fbcfe8",
  300: "#f9a8d4",
  400: "#f472b6",
  500: "#ec4899",
  600: "#db2777",
  700: "#be185d",
  800: "#9d174d",
  900: "#831843"
};
var fuchsia = {
  50: "#fdf4ff",
  100: "#fae8ff",
  200: "#f5d0fe",
  300: "#f0abfc",
  400: "#e879f9",
  500: "#d946ef",
  600: "#c026d3",
  700: "#a21caf",
  800: "#86198f",
  900: "#701a75"
};
var purple = {
  50: "#faf5ff",
  100: "#f3e8ff",
  200: "#e9d5ff",
  300: "#d8b4fe",
  400: "#c084fc",
  500: "#a855f7",
  600: "#9333ea",
  700: "#7e22ce",
  800: "#6b21a8",
  900: "#581c87"
};
var violet = {
  50: "#f5f3ff",
  100: "#ede9fe",
  200: "#ddd6fe",
  300: "#c4b5fd",
  400: "#a78bfa",
  500: "#8b5cf6",
  600: "#7c3aed",
  700: "#6d28d9",
  800: "#5b21b6",
  900: "#4c1d95"
};
var indigo = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81"
};
var blue = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a"
};
var lightBlue = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e"
};
var cyan = {
  50: "#ecfeff",
  100: "#cffafe",
  200: "#a5f3fc",
  300: "#67e8f9",
  400: "#22d3ee",
  500: "#06b6d4",
  600: "#0891b2",
  700: "#0e7490",
  800: "#155e75",
  900: "#164e63"
};
var sky = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e"
};
var teal = {
  50: "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  300: "#5eead4",
  400: "#2dd4bf",
  500: "#14b8a6",
  600: "#0d9488",
  700: "#0f766e",
  800: "#115e59",
  900: "#134e4a"
};
var emerald = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b"
};
var green = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d"
};
var lime = {
  50: "#f7fee7",
  100: "#ecfccb",
  200: "#d9f99d",
  300: "#bef264",
  400: "#a3e635",
  500: "#84cc16",
  600: "#65a30d",
  700: "#4d7c0f",
  800: "#3f6212",
  900: "#365314"
};
var yellow = {
  50: "#fefce8",
  100: "#fef9c3",
  200: "#fef08a",
  300: "#fde047",
  400: "#facc15",
  500: "#eab308",
  600: "#ca8a04",
  700: "#a16207",
  800: "#854d0e",
  900: "#713f12"
};
var amber = {
  50: "#fffbeb",
  100: "#fef3c7",
  200: "#fde68a",
  300: "#fcd34d",
  400: "#fbbf24",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f"
};
var orange = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  300: "#fdba74",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c",
  800: "#9a3412",
  900: "#7c2d12"
};
var red = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d"
};
var warmGray = {
  50: "#fafaf9",
  100: "#f5f5f4",
  200: "#e7e5e4",
  300: "#d6d3d1",
  400: "#a8a29e",
  500: "#78716c",
  600: "#57534e",
  700: "#44403c",
  800: "#292524",
  900: "#1c1917"
};
var trueGray = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717"
};
var gray = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b"
};
var coolGray = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827"
};
var blueGray = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a"
};
const colors = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amber,
  black,
  blue,
  blueGray,
  coolGray,
  cyan,
  emerald,
  fuchsia,
  gray,
  green,
  indigo,
  lightBlue,
  lime,
  orange,
  pink,
  purple,
  red,
  rose,
  sky,
  teal,
  trueGray,
  violet,
  warmGray,
  white,
  yellow
}, Symbol.toStringTag, { value: "Module" }));
var includes = (value, search) => !!~value.indexOf(search);
var hyphenate = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
var evalThunk = (value, context) => {
  while (typeof value == "function") {
    value = value(context);
  }
  return value;
};
var isCSSProperty = (key, value) => !includes("@:&", key[0]) && (includes("rg", (typeof value)[5]) || Array.isArray(value));
var merge = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
  const value = evalThunk(source[key], context);
  if (isCSSProperty(key, value)) {
    target2[hyphenate(key)] = value;
  } else {
    target2[key] = key[0] == "@" && includes("figa", key[1]) ? (target2[key] || []).concat(value) : merge(target2[key] || {}, value, context);
  }
  return target2;
}, target) : target;
var styled$ = (rules2, context) => rules2.reduce((result, rule) => {
  if (typeof rule == "string") {
    rule = apply(rule);
  }
  if (typeof rule == "function") {
    return merge(result, evalThunk(rule, context), context);
  }
  if (rule) {
    return merge(result, rule, context);
  }
  return result;
}, {});
var buildMediaRule = (key, value) => ({
  [key[0] == "@" ? key : `@screen ${key}`]: typeof value == "string" ? apply(value) : value
});
var createStyle = (config2 = {}, base) => {
  const { base: baseStyle, variants = {}, defaults: defaults2, matches: matches2 = [] } = config2;
  const id = cyrb32(JSON.stringify([base == null ? void 0 : base.className, baseStyle, variants, defaults2, matches2]));
  const className = (base ? base.className + " " : "") + id;
  const selector = (base || "") + "." + id;
  return Object.defineProperties((allProps) => {
    const { tw: tw2, css, class: localClass, className: localClassName, ...props } = {
      ...defaults2,
      ...allProps
    };
    const rules2 = [
      base && base(props),
      {
        _: className + (localClassName ? " " + localClassName : "") + (localClass ? " " + localClass : "")
      },
      baseStyle
    ];
    Object.keys(variants).forEach((variantKey) => {
      const variant = variants[variantKey];
      const propsValue = props[variantKey];
      if (propsValue === Object(propsValue)) {
        Object.keys(propsValue).forEach((key) => {
          const value = variant[propsValue[key]];
          rules2.push(key == "initial" ? value : buildMediaRule(key, value));
        });
      } else {
        rules2.push(variant[propsValue]);
      }
    });
    matches2.forEach((matcher) => {
      const ruleIndex = rules2.push(matcher.use) - 1;
      if (!Object.keys(matcher).every((variantKey) => {
        const propsValue = props[variantKey];
        const compoundValue = String(matcher[variantKey]);
        if (propsValue === Object(propsValue)) {
          Object.keys(propsValue).forEach((key) => {
            if (key != "initial" && compoundValue == String(propsValue[key])) {
              rules2.push(buildMediaRule(key, rules2[ruleIndex]));
            }
          });
          return true;
        }
        return variantKey == "use" || compoundValue == String(propsValue);
      })) {
        rules2.length = ruleIndex;
      }
    });
    rules2.push(apply(tw2), css);
    return directive(styled$, rules2);
  }, {
    toString: {
      value: () => selector
    },
    className: {
      value: className
    },
    selector: {
      value: selector
    }
  });
};
var style = (base, config2) => typeof base == "function" ? createStyle(config2, base) : createStyle(base);
const matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const iconDefaults = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16,
  rotate: 0,
  vFlip: false,
  hFlip: false
});
function fullIcon(data) {
  return { ...iconDefaults, ...data };
}
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIcon(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIcon(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIcon(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIcon = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchName)) && icon.name.match(matchName));
};
function mergeIconData(icon, alias3) {
  const result = { ...icon };
  for (const key in iconDefaults) {
    const prop = key;
    if (alias3[prop] !== void 0) {
      const value = alias3[prop];
      if (result[prop] === void 0) {
        result[prop] = value;
        continue;
      }
      switch (prop) {
        case "rotate":
          result[prop] = (result[prop] + value) % 4;
          break;
        case "hFlip":
        case "vFlip":
          result[prop] = value !== result[prop];
          break;
        default:
          result[prop] = value;
      }
    }
  }
  return result;
}
function getIconData$1(data, name, full = false) {
  function getIcon(name2, iteration) {
    if (data.icons[name2] !== void 0) {
      return Object.assign({}, data.icons[name2]);
    }
    if (iteration > 5) {
      return null;
    }
    const aliases = data.aliases;
    if (aliases && aliases[name2] !== void 0) {
      const item = aliases[name2];
      const result2 = getIcon(item.parent, iteration + 1);
      if (result2) {
        return mergeIconData(result2, item);
      }
      return result2;
    }
    const chars = data.chars;
    if (!iteration && chars && chars[name2] !== void 0) {
      return getIcon(chars[name2], iteration + 1);
    }
    return null;
  }
  const result = getIcon(name, 0);
  if (result) {
    for (const key in iconDefaults) {
      if (result[key] === void 0 && data[key] !== void 0) {
        result[key] = data[key];
      }
    }
  }
  return result && full ? fullIcon(result) : result;
}
function isVariation(item) {
  for (const key in iconDefaults) {
    if (item[key] !== void 0) {
      return true;
    }
  }
  return false;
}
function parseIconSet(data, callback, options) {
  options = options || {};
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const icons = data.icons;
  Object.keys(icons).forEach((name) => {
    const iconData = getIconData$1(data, name, true);
    if (iconData) {
      callback(name, iconData);
      names.push(name);
    }
  });
  const parseAliases = options.aliases || "all";
  if (parseAliases !== "none" && typeof data.aliases === "object") {
    const aliases = data.aliases;
    Object.keys(aliases).forEach((name) => {
      if (parseAliases === "variations" && isVariation(aliases[name])) {
        return;
      }
      const iconData = getIconData$1(data, name, true);
      if (iconData) {
        callback(name, iconData);
        names.push(name);
      }
    });
  }
  return names;
}
const optionalProperties = {
  provider: "string",
  aliases: "object",
  not_found: "object"
};
for (const prop in iconDefaults) {
  optionalProperties[prop] = typeof iconDefaults[prop];
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  for (const prop in optionalProperties) {
    if (obj[prop] !== void 0 && typeof obj[prop] !== optionalProperties[prop]) {
      return null;
    }
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchName) || typeof icon.body !== "string") {
      return null;
    }
    for (const prop in iconDefaults) {
      if (icon[prop] !== void 0 && typeof icon[prop] !== typeof iconDefaults[prop]) {
        return null;
      }
    }
  }
  const aliases = data.aliases;
  if (aliases) {
    for (const name in aliases) {
      const icon = aliases[name];
      const parent = icon.parent;
      if (!name.match(matchName) || typeof parent !== "string" || !icons[parent] && !aliases[parent]) {
        return null;
      }
      for (const prop in iconDefaults) {
        if (icon[prop] !== void 0 && typeof icon[prop] !== typeof iconDefaults[prop]) {
          return null;
        }
      }
    }
  }
  return data;
}
const storageVersion = 1;
let storage$1 = /* @__PURE__ */ Object.create(null);
try {
  const w2 = window || self;
  if (w2 && w2._iconifyStorage.version === storageVersion) {
    storage$1 = w2._iconifyStorage.storage;
  }
} catch (err) {
}
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ Object.create(null)
  };
}
function getStorage(provider, prefix) {
  if (storage$1[provider] === void 0) {
    storage$1[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerStorage = storage$1[provider];
  if (providerStorage[prefix] === void 0) {
    providerStorage[prefix] = newStorage(provider, prefix);
  }
  return providerStorage[prefix];
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  const t2 = Date.now();
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing[name] = t2;
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = Object.freeze(fullIcon(icon));
      return true;
    }
  } catch (err) {
  }
  return false;
}
function getIconFromStorage(storage2, name) {
  const value = storage2.icons[name];
  return value === void 0 ? null : value;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  return icon ? getIconFromStorage(getStorage(icon.provider, icon.prefix), icon.name) : null;
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = typeof data.provider === "string" ? data.provider : "";
  }
  if (simpleNames && provider === "" && (typeof data.prefix !== "string" || data.prefix === "")) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  if (typeof data.prefix !== "string" || !validateIcon({
    provider,
    prefix: data.prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, data.prefix);
  return !!addIconSet(storage2, data);
}
const defaults = Object.freeze({
  inline: false,
  width: null,
  height: null,
  hAlign: "center",
  vAlign: "middle",
  slice: false,
  hFlip: false,
  vFlip: false,
  rotate: 0
});
function mergeCustomisations(defaults2, item) {
  const result = {};
  for (const key in defaults2) {
    const attr2 = key;
    result[attr2] = defaults2[attr2];
    if (item[attr2] === void 0) {
      continue;
    }
    const value = item[attr2];
    switch (attr2) {
      case "inline":
      case "slice":
        if (typeof value === "boolean") {
          result[attr2] = value;
        }
        break;
      case "hFlip":
      case "vFlip":
        if (value === true) {
          result[attr2] = !result[attr2];
        }
        break;
      case "hAlign":
      case "vAlign":
        if (typeof value === "string" && value !== "") {
          result[attr2] = value;
        }
        break;
      case "width":
      case "height":
        if (typeof value === "string" && value !== "" || typeof value === "number" && value || value === null) {
          result[attr2] = value;
        }
        break;
      case "rotate":
        if (typeof value === "number") {
          result[attr2] += value;
        }
        break;
    }
  }
  return result;
}
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size2, ratio, precision) {
  if (ratio === 1) {
    return size2;
  }
  precision = precision === void 0 ? 100 : precision;
  if (typeof size2 === "number") {
    return Math.ceil(size2 * ratio * precision) / precision;
  }
  if (typeof size2 !== "string") {
    return size2;
  }
  const oldParts = size2.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size2;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function preserveAspectRatio(props) {
  let result = "";
  switch (props.hAlign) {
    case "left":
      result += "xMin";
      break;
    case "right":
      result += "xMax";
      break;
    default:
      result += "xMid";
  }
  switch (props.vAlign) {
    case "top":
      result += "YMin";
      break;
    case "bottom":
      result += "YMax";
      break;
    default:
      result += "YMid";
  }
  result += props.slice ? " slice" : " meet";
  return result;
}
function iconToSVG(icon, customisations) {
  const box = {
    left: icon.left,
    top: icon.top,
    width: icon.width,
    height: icon.height
  };
  let body = icon.body;
  [icon, customisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== 0 || box.top !== 0) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  let width, height;
  if (customisations.width === null && customisations.height === null) {
    height = "1em";
    width = calculateSize(height, box.width / box.height);
  } else if (customisations.width !== null && customisations.height !== null) {
    width = customisations.width;
    height = customisations.height;
  } else if (customisations.height !== null) {
    height = customisations.height;
    width = calculateSize(height, box.width / box.height);
  } else {
    width = customisations.width;
    height = calculateSize(width, box.height / box.width);
  }
  if (width === "auto") {
    width = box.width;
  }
  if (height === "auto") {
    height = box.height;
  }
  width = typeof width === "string" ? width : width.toString() + "";
  height = typeof height === "string" ? height : height.toString() + "";
  const result = {
    attributes: {
      width,
      height,
      preserveAspectRatio: preserveAspectRatio(customisations),
      viewBox: box.left.toString() + " " + box.top.toString() + " " + box.width.toString() + " " + box.height.toString()
    },
    body
  };
  if (customisations.inline) {
    result.inline = true;
  }
  return result;
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
  });
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    resources,
    path: source.path === void 0 ? "/" : source.path,
    maxURL: source.maxURL ? source.maxURL : 500,
    rotate: source.rotate ? source.rotate : 750,
    timeout: source.timeout ? source.timeout : 5e3,
    random: source.random === true,
    index: source.index ? source.index : 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config2 = createAPIConfig(customConfig);
  if (config2 === null) {
    return false;
  }
  configStorage[provider] = config2;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const mergeParams = (base, params) => {
  let result = base, hasParams = result.indexOf("?") !== -1;
  function paramToString(value) {
    switch (typeof value) {
      case "boolean":
        return value ? "true" : "false";
      case "number":
        return encodeURIComponent(value);
      case "string":
        return encodeURIComponent(value);
      default:
        throw new Error("Invalid parameter");
    }
  }
  Object.keys(params).forEach((key) => {
    let value;
    try {
      value = paramToString(params[key]);
    } catch (err) {
      return;
    }
    result += (hasParams ? "&" : "?") + encodeURIComponent(key) + "=" + value;
    hasParams = true;
  });
  return result;
};
const maxLengthCache = {};
const pathCache = {};
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
  return null;
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config2 = getAPIConfig(provider);
  if (!config2) {
    return 0;
  }
  let result;
  if (!config2.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config2.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = mergeParams(prefix + ".json", {
      icons: ""
    });
    result = config2.maxURL - maxHostLength - config2.path.length - url.length;
  }
  const cacheKey = provider + ":" + prefix;
  pathCache[provider] = config2.path;
  maxLengthCache[cacheKey] = result;
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  let maxLength = maxLengthCache[prefix];
  if (maxLength === void 0) {
    maxLength = calculateMaxLength(provider, prefix);
  }
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index2) => {
    length += name.length + 1;
    if (length >= maxLength && index2 > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    if (pathCache[provider] === void 0) {
      const config2 = getAPIConfig(provider);
      if (!config2) {
        return "/";
      }
      pathCache[provider] = config2.path;
    }
    return pathCache[provider];
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      path += mergeParams(prefix + ".json", {
        icons: iconsList
      });
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        callback("next", defaultError);
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a2, b2) => {
    if (a2.provider !== b2.provider) {
      return a2.provider.localeCompare(b2.provider);
    }
    if (a2.prefix !== b2.prefix) {
      return a2.prefix.localeCompare(b2.prefix);
    }
    return a2.name.localeCompare(b2.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    if (storage2[provider] === void 0) {
      storage2[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerStorage = storage2[provider];
    if (providerStorage[prefix] === void 0) {
      providerStorage[prefix] = getStorage(provider, prefix);
    }
    const localStorage2 = providerStorage[prefix];
    let list;
    if (localStorage2.icons[name] !== void 0) {
      list = result.loaded;
    } else if (prefix === "" || localStorage2.missing[name] !== void 0) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
const callbacks = /* @__PURE__ */ Object.create(null);
const pendingUpdates = /* @__PURE__ */ Object.create(null);
function removeCallback(sources, id) {
  sources.forEach((source) => {
    const provider = source.provider;
    if (callbacks[provider] === void 0) {
      return;
    }
    const providerCallbacks = callbacks[provider];
    const prefix = source.prefix;
    const items = providerCallbacks[prefix];
    if (items) {
      providerCallbacks[prefix] = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(provider, prefix) {
  if (pendingUpdates[provider] === void 0) {
    pendingUpdates[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerPendingUpdates = pendingUpdates[provider];
  if (!providerPendingUpdates[prefix]) {
    providerPendingUpdates[prefix] = true;
    setTimeout(() => {
      providerPendingUpdates[prefix] = false;
      if (callbacks[provider] === void 0 || callbacks[provider][prefix] === void 0) {
        return;
      }
      const items = callbacks[provider][prefix].slice(0);
      if (!items.length) {
        return;
      }
      const storage2 = getStorage(provider, prefix);
      let hasPending = false;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name] !== void 0) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing[name] !== void 0) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([
              {
                provider,
                prefix
              }
            ], item.id);
          }
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (callbacks[provider] === void 0) {
      callbacks[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerCallbacks = callbacks[provider];
    if (providerCallbacks[prefix] === void 0) {
      providerCallbacks[prefix] = [];
    }
    providerCallbacks[prefix].push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, false, simpleNames2) : item;
    if (!validate || validateIcon(icon, simpleNames2)) {
      result.push({
        provider: icon.provider,
        prefix: icon.prefix,
        name: icon.name
      });
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config2, payload, query, done) {
  const resourcesCount = config2.resources.length;
  const startIndex = config2.random ? Math.floor(Math.random() * resourcesCount) : config2.index;
  let resources;
  if (config2.random) {
    let list = config2.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config2.resources.slice(startIndex).concat(config2.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue2 = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue2.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue2 = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue2.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue2.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue2 = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue2 = queue2.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config2.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue2.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config2.random) {
      const index2 = config2.resources.indexOf(item.resource);
      if (index2 !== -1 && index2 !== config2.index) {
        config2.index = index2;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue2.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config2.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue2.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config2.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function setConfig(config2) {
  if (typeof config2 !== "object" || typeof config2.resources !== "object" || !(config2.resources instanceof Array) || !config2.resources.length) {
    throw new Error("Invalid Reduncancy configuration");
  }
  const newConfig = /* @__PURE__ */ Object.create(null);
  let key;
  for (key in defaultConfig) {
    if (config2[key] !== void 0) {
      newConfig[key] = config2[key];
    } else {
      newConfig[key] = defaultConfig[key];
    }
  }
  return newConfig;
}
function initRedundancy(cfg) {
  const config2 = setConfig(cfg);
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config2, payload, queryCallback, (data, error) => {
      cleanup();
      if (doneCallback) {
        doneCallback(data, error);
      }
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    const result = queries.find((value) => {
      return callback(value);
    });
    return result !== void 0 ? result : null;
  }
  const instance = {
    query,
    find,
    setIndex: (index2) => {
      config2.index = index2;
    },
    getIndex: () => config2.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (redundancyCache[provider] === void 0) {
    const config2 = getAPIConfig(provider);
    if (!config2) {
      return;
    }
    const redundancy = initRedundancy(config2);
    const cachedReundancy = {
      config: config2,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config2 = createAPIConfig(target);
    if (config2) {
      redundancy = initRedundancy(config2);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
const cache = {};
function emptyCallback() {
}
const pendingIcons = /* @__PURE__ */ Object.create(null);
const iconsToLoad = /* @__PURE__ */ Object.create(null);
const loaderFlags = /* @__PURE__ */ Object.create(null);
const queueFlags = /* @__PURE__ */ Object.create(null);
function loadedNewIcons(provider, prefix) {
  if (loaderFlags[provider] === void 0) {
    loaderFlags[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerLoaderFlags = loaderFlags[provider];
  if (!providerLoaderFlags[prefix]) {
    providerLoaderFlags[prefix] = true;
    setTimeout(() => {
      providerLoaderFlags[prefix] = false;
      updateCallbacks(provider, prefix);
    });
  }
}
const errorsCache = /* @__PURE__ */ Object.create(null);
function loadNewIcons(provider, prefix, icons) {
  function err() {
    const key = (provider === "" ? "" : "@" + provider + ":") + prefix;
    const time = Math.floor(Date.now() / 6e4);
    if (errorsCache[key] < time) {
      errorsCache[key] = time;
      console.error('Unable to retrieve icons for "' + key + '" because API is not configured properly.');
    }
  }
  if (iconsToLoad[provider] === void 0) {
    iconsToLoad[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerIconsToLoad = iconsToLoad[provider];
  if (queueFlags[provider] === void 0) {
    queueFlags[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerQueueFlags = queueFlags[provider];
  if (pendingIcons[provider] === void 0) {
    pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerPendingIcons = pendingIcons[provider];
  if (providerIconsToLoad[prefix] === void 0) {
    providerIconsToLoad[prefix] = icons;
  } else {
    providerIconsToLoad[prefix] = providerIconsToLoad[prefix].concat(icons).sort();
  }
  if (!providerQueueFlags[prefix]) {
    providerQueueFlags[prefix] = true;
    setTimeout(() => {
      providerQueueFlags[prefix] = false;
      const icons2 = providerIconsToLoad[prefix];
      delete providerIconsToLoad[prefix];
      const api = getAPIModule(provider);
      if (!api) {
        err();
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data, error) => {
          const storage2 = getStorage(provider, prefix);
          if (typeof data !== "object") {
            if (error !== 404) {
              return;
            }
            const t2 = Date.now();
            item.icons.forEach((name) => {
              storage2.missing[name] = t2;
            });
          } else {
            try {
              const parsed = addIconSet(storage2, data);
              if (!parsed.length) {
                return;
              }
              const pending = providerPendingIcons[prefix];
              parsed.forEach((name) => {
                delete pending[name];
              });
              if (cache.store) {
                cache.store(provider, data);
              }
            } catch (err2) {
              console.error(err2);
            }
          }
          loadedNewIcons(provider, prefix);
        });
      });
    });
  }
}
const loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push({
      provider,
      prefix
    });
    if (pendingIcons[provider] === void 0) {
      pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerPendingIcons = pendingIcons[provider];
    if (providerPendingIcons[prefix] === void 0) {
      providerPendingIcons[prefix] = /* @__PURE__ */ Object.create(null);
    }
    if (newIcons[provider] === void 0) {
      newIcons[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerNewIcons = newIcons[provider];
    if (providerNewIcons[prefix] === void 0) {
      providerNewIcons[prefix] = [];
    }
  });
  const time = Date.now();
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const pendingQueue = pendingIcons[provider][prefix];
    if (pendingQueue[name] === void 0) {
      pendingQueue[name] = time;
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(provider, prefix, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const cacheVersion = "iconify2";
const cachePrefix = "iconify";
const countKey = cachePrefix + "-count";
const versionKey = cachePrefix + "-version";
const hour = 36e5;
const cacheExpiration = 168;
const config = {
  local: true,
  session: true
};
let loaded = false;
const count = {
  local: 0,
  session: 0
};
const emptyList = {
  local: [],
  session: []
};
let _window = typeof window === "undefined" ? {} : window;
function getGlobal(key) {
  const attr2 = key + "Storage";
  try {
    if (_window && _window[attr2] && typeof _window[attr2].length === "number") {
      return _window[attr2];
    }
  } catch (err) {
  }
  config[key] = false;
  return null;
}
function setCount(storage2, key, value) {
  try {
    storage2.setItem(countKey, value.toString());
    count[key] = value;
    return true;
  } catch (err) {
    return false;
  }
}
function getCount(storage2) {
  const count2 = storage2.getItem(countKey);
  if (count2) {
    const total = parseInt(count2);
    return total ? total : 0;
  }
  return 0;
}
function initCache(storage2, key) {
  try {
    storage2.setItem(versionKey, cacheVersion);
  } catch (err) {
  }
  setCount(storage2, key, 0);
}
function destroyCache(storage2) {
  try {
    const total = getCount(storage2);
    for (let i2 = 0; i2 < total; i2++) {
      storage2.removeItem(cachePrefix + i2.toString());
    }
  } catch (err) {
  }
}
const loadCache = () => {
  if (loaded) {
    return;
  }
  loaded = true;
  const minTime = Math.floor(Date.now() / hour) - cacheExpiration;
  function load(key) {
    const func = getGlobal(key);
    if (!func) {
      return;
    }
    const getItem = (index2) => {
      const name = cachePrefix + index2.toString();
      const item = func.getItem(name);
      if (typeof item !== "string") {
        return false;
      }
      let valid = true;
      try {
        const data = JSON.parse(item);
        if (typeof data !== "object" || typeof data.cached !== "number" || data.cached < minTime || typeof data.provider !== "string" || typeof data.data !== "object" || typeof data.data.prefix !== "string") {
          valid = false;
        } else {
          const provider = data.provider;
          const prefix = data.data.prefix;
          const storage2 = getStorage(provider, prefix);
          valid = addIconSet(storage2, data.data).length > 0;
        }
      } catch (err) {
        valid = false;
      }
      if (!valid) {
        func.removeItem(name);
      }
      return valid;
    };
    try {
      const version2 = func.getItem(versionKey);
      if (version2 !== cacheVersion) {
        if (version2) {
          destroyCache(func);
        }
        initCache(func, key);
        return;
      }
      let total = getCount(func);
      for (let i2 = total - 1; i2 >= 0; i2--) {
        if (!getItem(i2)) {
          if (i2 === total - 1) {
            total--;
          } else {
            emptyList[key].push(i2);
          }
        }
      }
      setCount(func, key, total);
    } catch (err) {
    }
  }
  for (const key in config) {
    load(key);
  }
};
const storeCache = (provider, data) => {
  if (!loaded) {
    loadCache();
  }
  function store(key) {
    if (!config[key]) {
      return false;
    }
    const func = getGlobal(key);
    if (!func) {
      return false;
    }
    let index2 = emptyList[key].shift();
    if (index2 === void 0) {
      index2 = count[key];
      if (!setCount(func, key, index2 + 1)) {
        return false;
      }
    }
    try {
      const item = {
        cached: Math.floor(Date.now() / hour),
        provider,
        data
      };
      func.setItem(cachePrefix + index2.toString(), JSON.stringify(item));
    } catch (err) {
      return false;
    }
    return true;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
};
const separator = /[\s,]+/;
function flipFromString(custom, flip2) {
  flip2.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function alignmentFromString(custom, align) {
  align.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "left":
      case "center":
      case "right":
        custom.hAlign = value;
        break;
      case "top":
      case "middle":
      case "bottom":
        custom.vAlign = value;
        break;
      case "slice":
      case "crop":
        custom.slice = true;
        break;
      case "meet":
        custom.slice = false;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
let customisationAliases = {};
["horizontal", "vertical"].forEach((prefix) => {
  ["Align", "Flip"].forEach((suffix) => {
    const attr2 = prefix.slice(0, 1) + suffix;
    const value = {
      attr: attr2,
      boolean: suffix === "Flip"
    };
    customisationAliases[prefix + "-" + suffix.toLowerCase()] = value;
    customisationAliases[prefix.slice(0, 1) + "-" + suffix.toLowerCase()] = value;
    customisationAliases[prefix + suffix] = value;
  });
});
const render = (icon, props) => {
  const customisations = mergeCustomisations(defaults, props);
  const componentProps = { ...svgDefaults };
  let style2 = typeof props.style === "object" && !(props.style instanceof Array) ? { ...props.style } : {};
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "align":
        if (typeof value === "string") {
          alignmentFromString(customisations, value);
        }
        break;
      case "color":
        style2.color = value;
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (customisationAliases[key] !== void 0) {
          if (customisationAliases[key].boolean && (value === true || value === "true" || value === 1)) {
            customisations[customisationAliases[key].attr] = true;
          } else if (!customisationAliases[key].boolean && typeof value === "string" && value !== "") {
            customisations[customisationAliases[key].attr] = value;
          }
        } else if (defaults[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  for (let key in item.attributes) {
    componentProps[key] = item.attributes[key];
  }
  if (item.inline && style2.verticalAlign === void 0 && style2["vertical-align"] === void 0) {
    style2.verticalAlign = "-0.125em";
  }
  let localCounter = 0;
  let id = props.id;
  if (typeof id === "string") {
    id = id.replace(/-/g, "_");
  }
  componentProps["innerHTML"] = replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifyVue");
  if (Object.keys(style2).length > 0) {
    componentProps["style"] = style2;
  }
  return h$1("svg", componentProps);
};
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  cache.store = storeCache;
  loadCache();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (typeof item !== "object" || item === null || item instanceof Array || typeof item.icons !== "object" || typeof item.prefix !== "string" || !addCollection(item)) {
            console.error(err);
          }
        } catch (e2) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e2) {
          console.error(err);
        }
      }
    }
  }
}
const emptyIcon = fullIcon({
  body: ""
});
const Icon = defineComponent({
  inheritAttrs: false,
  data() {
    return {
      iconMounted: false,
      counter: 0
    };
  },
  mounted() {
    this._name = "";
    this._loadingIcon = null;
    this.iconMounted = true;
  },
  unmounted() {
    this.abortLoading();
  },
  methods: {
    abortLoading() {
      if (this._loadingIcon) {
        this._loadingIcon.abort();
        this._loadingIcon = null;
      }
    },
    getIcon(icon, onload) {
      if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
        this._name = "";
        this.abortLoading();
        return {
          data: fullIcon(icon)
        };
      }
      let iconName;
      if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
        this.abortLoading();
        return null;
      }
      const data = getIconData(iconName);
      if (data === null) {
        if (!this._loadingIcon || this._loadingIcon.name !== icon) {
          this.abortLoading();
          this._name = "";
          this._loadingIcon = {
            name: icon,
            abort: loadIcons([iconName], () => {
              this.counter++;
            })
          };
        }
        return null;
      }
      this.abortLoading();
      if (this._name !== icon) {
        this._name = icon;
        if (onload) {
          onload(icon);
        }
      }
      const classes = ["iconify"];
      if (iconName.prefix !== "") {
        classes.push("iconify--" + iconName.prefix);
      }
      if (iconName.provider !== "") {
        classes.push("iconify--" + iconName.provider);
      }
      return { data, classes };
    }
  },
  render() {
    this.counter;
    const props = this.$attrs;
    const icon = this.iconMounted ? this.getIcon(props.icon, props.onLoad) : null;
    if (!icon) {
      return render(emptyIcon, props);
    }
    let newProps = props;
    if (icon.classes) {
      newProps = {
        ...props,
        class: (typeof props["class"] === "string" ? props["class"] + " " : "") + icon.classes.join(" ")
      };
    }
    return render(icon.data, newProps);
  }
});
/*!
  * vue-router v4.1.3
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser$1 = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const isArray = Array.isArray;
function warn(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash2 = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash2 = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash2,
    path,
    query,
    hash: hash2
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b2) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b2.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b2.params) && stringifyQuery2(a2.query) === stringifyQuery2(b2.query) && a2.hash === b2.hash;
}
function isSameRouteRecord(a2, b2) {
  return (a2.aliasOf || a2) === (b2.aliasOf || b2);
}
function isSameRouteLocationParams(a2, b2) {
  if (Object.keys(a2).length !== Object.keys(b2).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b2[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b2) {
  return isArray(a2) ? isEquivalentArray(a2, b2) : isArray(b2) ? isEquivalentArray(b2, a2) : a2 === b2;
}
function isEquivalentArray(a2, b2) {
  return isArray(b2) ? a2.length === b2.length && a2.every((value, i2) => value === b2[i2]) : a2.length === 1 && a2[0] === b2;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!from.startsWith("/")) {
    warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position2 = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position2 > 1)
        position2--;
    } else
      break;
  }
  return fromSegments.slice(0, position2).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser$1) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position2) {
  let scrollToOptions;
  if ("el" in position2) {
    const positionEl = position2.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (typeof position2.el === "string") {
      if (!isIdSelector || !document.getElementById(position2.el.slice(1))) {
        try {
          const foundEl = document.querySelector(position2.el);
          if (isIdSelector && foundEl) {
            warn(`The selector "${position2.el}" should be passed as "el: document.querySelector('${position2.el}')" because it starts with "#".`);
            return;
          }
        } catch (err) {
          warn(`The selector "${position2.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
          return;
        }
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      warn(`Couldn't find element using selector "${position2.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position2);
  } else {
    scrollToOptions = position2;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position2 = history.state ? history.state.position - delta : -1;
  return position2 + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash: hash2 } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash2.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash2.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash2;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        warn("Error with push/replace State", err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    if (!history2.state) {
      warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`);
    }
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#"))
    base += "#";
  if (!base.endsWith("#/") && !base.endsWith("#")) {
    warn(`A hash base must end with a "#":
"${base}" should be "${base.replace(/#.*$/, "#")}".`);
  }
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("navigation failure");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const ErrorTypeMessages = {
  [1]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [2]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [4]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [8]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [16]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  {
    return assign(new Error(ErrorTypeMessages[type](params)), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string")
    return to;
  if ("path" in to)
    return to.path;
  const location2 = {};
  for (const key of propertiesToLog) {
    if (key in to)
      location2[key] = to[key];
  }
  return JSON.stringify(location2, null, 2);
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse2(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i2 = 1; i2 < match.length; i2++) {
      const value = match[i2] || "";
      const key = keys[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify2(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text2 = isArray(param) ? param.join("/") : param;
          if (!text2) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text2;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse: parse2,
    stringify: stringify2
  };
}
function compareScoreArray(a2, b2) {
  let i2 = 0;
  while (i2 < a2.length && i2 < b2.length) {
    const diff = b2[i2] - a2[i2];
    if (diff)
      return diff;
    i2++;
  }
  if (a2.length < b2.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b2.length) {
    return b2.length === 1 && b2[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b2) {
  let i2 = 0;
  const aScore = a2.score;
  const bScore = b2.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp)
      return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(
      `Route paths should start with a "/": "${path}" should be "/${path}".`
    );
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer2}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i2 = 0;
  let char;
  let buffer2 = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer2)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer2
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer2}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer2,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer2 = "";
  }
  function addCharToBuffer() {
    buffer2 += char;
  }
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer2) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i2--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer2}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias3 of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias3,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === "/")
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children2 = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children2.length; i2++) {
          addRoute(children2[i2], matcher, originalRecord && originalRecord.children[i2]);
        }
      }
      originalRecord = originalRecord || matcher;
      insertMatcher(matcher);
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i2 = 0;
    while (i2 < matchers.length && comparePathParserScore(matcher, matchers[i2]) >= 0 && (matcher.record.path !== matchers[i2].record.path || !isRecordChildOf(matcher, matchers[i2])))
      i2++;
    matchers.splice(i2, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(
        paramsFromLocation(
          currentLocation.params,
          matcher.keys.filter((k2) => !k2.optional).map((k2) => k2.name)
        ),
        location2.params
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      if (!path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`);
      }
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults2, partialOptions) {
  const options = {};
  for (const key in defaults2) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
  }
  return options;
}
function isSameParam(a2, b2) {
  return a2.name === b2.name && a2.optional === b2.optional && a2.repeatable === b2.repeatable;
}
function checkSameParams(a2, b2) {
  for (const key of a2.keys) {
    if (!key.optional && !b2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" should have the exact same param named "${key.name}"`);
  }
  for (const key of b2.keys) {
    if (!key.optional && !a2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" should have the exact same param named "${key.name}"`);
  }
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key)))
      return warn(`Absolute path "${record.record.path}" should have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text2) {
  return encodeURI("" + text2).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text2) {
  return commonEncode(text2).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text2) {
  return commonEncode(text2).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text2) {
  return encodeQueryValue(text2).replace(EQUAL_RE, "%3D");
}
function encodePath(text2) {
  return commonEncode(text2).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text2) {
  return text2 == null ? "" : encodePath(text2).replace(SLASH_RE, "%2F");
}
function decode(text2) {
  try {
    return decodeURIComponent("" + text2);
  } catch (err) {
    warn(`Error decoding "${text2}". Using original value`);
  }
  return "" + text2;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v2) => v2 && encodeQueryValue(v2)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v2) => v2 == null ? null : "" + v2) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("router view location matched");
const viewDepthKey = Symbol("router view depth");
const routerKey = Symbol("router");
const routeLocationKey = Symbol("route location");
const routerViewLocationKey = Symbol("router view location");
function useCallbacks() {
  let handlers2 = [];
  function add2(handler) {
    handlers2.push(handler);
    return () => {
      const i2 = handlers2.indexOf(handler);
      if (i2 > -1)
        handlers2.splice(i2, 1);
    };
  }
  function reset2() {
    handlers2 = [];
  }
  return {
    add: add2,
    list: () => handlers2,
    reset: reset2
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, canOnlyBeCalledOnce(next, to, from));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    if (guard.length > 2) {
      const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) {
        guardCall = guardCall.then((resolvedValue) => {
          if (!next._called) {
            warn(message);
            return Promise.reject(new Error("Invalid navigation guard"));
          }
          return resolvedValue;
        });
      } else if (guardReturn !== void 0) {
        if (!next._called) {
          warn(message);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1)
      warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1)
      next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    if (!record.components && !record.children.length) {
      warn(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    }
    for (const name in record.components) {
      let rawComponent = record.components[name];
      {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise = rawComponent;
          rawComponent = () => promise;
        } else if (rawComponent.__asyncLoader && !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        if (!("catch" in componentPromise)) {
          warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject$1(routerKey);
  const currentRoute = inject$1(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      return router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
      ).catch(noop$1);
    }
    return Promise.resolve();
  }
  if (isBrowser$1) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject$1(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children2 = slots.default && slots.default(link);
      return props.custom ? children2 : h$1("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children2);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey)
    return;
  if (e2.defaultPrevented)
    return;
  if (e2.button !== void 0 && e2.button !== 0)
    return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e2.preventDefault)
    e2.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject$1(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject$1(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser$1 && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        const internalInstances = isArray(component.ref) ? component.ref.map((r2) => r2.i) : [component.ref.i];
        internalInstances.forEach((instance) => {
          instance.__vrv_devtools = info;
        });
      }
      return normalizeSlot(slots.default, { Component: component, route }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition"))) {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, {
    matched: routeLocation.matched.map((matched) => omit$1(matched, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display2) {
  return {
    _custom: {
      display: display2
    }
  };
}
let routerId = 0;
function addDevtools(app, router, matcher) {
  if (router.__hasDevtools)
    return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: "Routing",
          key: "$route",
          editable: false,
          value: formatRouteLocation(router.currentRoute.value, "Current Route")
        });
      }
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label: devtoolsData.route.path,
            textColor: 0,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay("afterEach")
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : "",
            tooltip: "Navigation Failure",
            value: failure
          }
        };
        data.status = formatDisplay("\u274C");
      } else {
        data.status = formatDisplay("\u2705");
      }
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload)
        return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) {
        routes = routes.filter((route) => isRouteMatching(route, payload.filter.toLowerCase()));
      }
      routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const routes = matcher.getRoutes();
        const route = routes.find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? "*" : "?";
  } else {
    return key.repeatable ? "+" : "";
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [
    { editable: false, key: "path", value: record.path }
  ];
  if (record.name != null) {
    fields.push({
      editable: false,
      key: "name",
      value: record.name
    });
  }
  fields.push({ editable: false, key: "regexp", value: route.re });
  if (route.keys.length) {
    fields.push({
      editable: false,
      key: "keys",
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
          tooltip: "Param keys",
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields.push({
      editable: false,
      key: "redirect",
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields.push({
      editable: false,
      key: "aliases",
      value: route.alias.map((alias3) => alias3.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields.push({
      editable: false,
      key: "meta",
      value: route.record.meta
    });
  }
  fields.push({
    key: "score",
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map((score) => score.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: route.score
      }
    }
  });
  return fields;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: "alias",
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: "matches",
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: "exact",
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: "active",
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
      textColor: 16777215,
      backgroundColor: DARK
    });
  }
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
  }
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter2) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ""), found[2]);
  if (nonEndingRE.test(filter2)) {
    route.children.forEach((child) => isRouteMatching(child, filter2));
    if (route.record.path !== "/" || filter2 === "/") {
      route.__vd_match = route.re.test(filter2);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter2.startsWith("/") && (decodedPath.includes(filter2) || path.includes(filter2)))
    return true;
  if (decodedPath.startsWith(filter2) || path.startsWith(filter2))
    return true;
  if (route.record.name && String(route.record.name).includes(filter2))
    return true;
  return route.children.some((child) => isRouteMatching(child, filter2));
}
function omit$1(obj, keys) {
  const ret = {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (!routerHistory)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser$1 && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      {
        if (href2.startsWith("//"))
          warn(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      if ("params" in rawLocation && !("name" in rawLocation) && Object.keys(rawLocation.params).length) {
        warn(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash2 = rawLocation.hash || "";
    if (hash2 && !hash2.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash2}" with "#${hash2}".`);
    }
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash2),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${"path" in rawLocation ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign({
      fullPath,
      hash: hash2,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      if (!("path" in newTargetLocation) && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: data,
          force,
          replace: replace2
        }),
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        true,
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          if (isSameRouteLocation(stringifyQuery$1, resolve2(failure2.to), toLocation) && redirectedFrom && (redirectedFrom._count = redirectedFrom._count ? redirectedFrom._count + 1 : 1) > 10) {
            warn(`Detected an infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(
            assign({
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: data,
              force
            }),
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser$1 ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser$1) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, 4 | 8)) {
          return error;
        }
        if (isNavigationFailure(error, 2)) {
          pushWithRedirect(
            error.to,
            toLocation
          ).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, 8)) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      {
        warn("uncaught error during route navigation:");
      }
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser$1 || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position2) => position2 && scrollToPosition(position2)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser$1 && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          warn("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if (isBrowser$1) {
        addDevtools(app, router2, matcher);
      }
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject$1(routerKey);
}
function useRoute() {
  return inject$1(routeLocationKey);
}
function t(t2) {
  return "object" == typeof t2 && null != t2 && 1 === t2.nodeType;
}
function e$1(t2, e2) {
  return (!e2 || "hidden" !== t2) && "visible" !== t2 && "clip" !== t2;
}
function n(t2, n2) {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    var r2 = getComputedStyle(t2, null);
    return e$1(r2.overflowY, n2) || e$1(r2.overflowX, n2) || function(t3) {
      var e2 = function(t4) {
        if (!t4.ownerDocument || !t4.ownerDocument.defaultView)
          return null;
        try {
          return t4.ownerDocument.defaultView.frameElement;
        } catch (t5) {
          return null;
        }
      }(t3);
      return !!e2 && (e2.clientHeight < t3.scrollHeight || e2.clientWidth < t3.scrollWidth);
    }(t2);
  }
  return false;
}
function r(t2, e2, n2, r2, i2, o, l, d2) {
  return o < t2 && l > e2 || o > t2 && l < e2 ? 0 : o <= t2 && d2 <= n2 || l >= e2 && d2 >= n2 ? o - t2 - r2 : l > e2 && d2 < n2 || o < t2 && d2 > n2 ? l - e2 + i2 : 0;
}
function compute(e2, i2) {
  var o = window, l = i2.scrollMode, d2 = i2.block, u2 = i2.inline, h2 = i2.boundary, a2 = i2.skipOverflowHiddenElements, c2 = "function" == typeof h2 ? h2 : function(t2) {
    return t2 !== h2;
  };
  if (!t(e2))
    throw new TypeError("Invalid target");
  for (var f2 = document.scrollingElement || document.documentElement, s = [], p2 = e2; t(p2) && c2(p2); ) {
    if ((p2 = p2.parentElement) === f2) {
      s.push(p2);
      break;
    }
    null != p2 && p2 === document.body && n(p2) && !n(document.documentElement) || null != p2 && n(p2, a2) && s.push(p2);
  }
  for (var m2 = o.visualViewport ? o.visualViewport.width : innerWidth, g = o.visualViewport ? o.visualViewport.height : innerHeight, w2 = window.scrollX || pageXOffset, v2 = window.scrollY || pageYOffset, W2 = e2.getBoundingClientRect(), b2 = W2.height, H2 = W2.width, y2 = W2.top, E2 = W2.right, M2 = W2.bottom, V2 = W2.left, x2 = "start" === d2 || "nearest" === d2 ? y2 : "end" === d2 ? M2 : y2 + b2 / 2, I2 = "center" === u2 ? V2 + H2 / 2 : "end" === u2 ? E2 : V2, C2 = [], T2 = 0; T2 < s.length; T2++) {
    var k2 = s[T2], B2 = k2.getBoundingClientRect(), D2 = B2.height, O2 = B2.width, R2 = B2.top, X = B2.right, Y2 = B2.bottom, L2 = B2.left;
    if ("if-needed" === l && y2 >= 0 && V2 >= 0 && M2 <= g && E2 <= m2 && y2 >= R2 && M2 <= Y2 && V2 >= L2 && E2 <= X)
      return C2;
    var S2 = getComputedStyle(k2), j2 = parseInt(S2.borderLeftWidth, 10), q2 = parseInt(S2.borderTopWidth, 10), z2 = parseInt(S2.borderRightWidth, 10), A2 = parseInt(S2.borderBottomWidth, 10), F2 = 0, G2 = 0, J2 = "offsetWidth" in k2 ? k2.offsetWidth - k2.clientWidth - j2 - z2 : 0, K2 = "offsetHeight" in k2 ? k2.offsetHeight - k2.clientHeight - q2 - A2 : 0;
    if (f2 === k2)
      F2 = "start" === d2 ? x2 : "end" === d2 ? x2 - g : "nearest" === d2 ? r(v2, v2 + g, g, q2, A2, v2 + x2, v2 + x2 + b2, b2) : x2 - g / 2, G2 = "start" === u2 ? I2 : "center" === u2 ? I2 - m2 / 2 : "end" === u2 ? I2 - m2 : r(w2, w2 + m2, m2, j2, z2, w2 + I2, w2 + I2 + H2, H2), F2 = Math.max(0, F2 + v2), G2 = Math.max(0, G2 + w2);
    else {
      F2 = "start" === d2 ? x2 - R2 - q2 : "end" === d2 ? x2 - Y2 + A2 + K2 : "nearest" === d2 ? r(R2, Y2, D2, q2, A2 + K2, x2, x2 + b2, b2) : x2 - (R2 + D2 / 2) + K2 / 2, G2 = "start" === u2 ? I2 - L2 - j2 : "center" === u2 ? I2 - (L2 + O2 / 2) + J2 / 2 : "end" === u2 ? I2 - X + z2 + J2 : r(L2, X, O2, j2, z2 + J2, I2, I2 + H2, H2);
      var N2 = k2.scrollLeft, P2 = k2.scrollTop;
      x2 += P2 - (F2 = Math.max(0, Math.min(P2 + F2, k2.scrollHeight - D2 + K2))), I2 += N2 - (G2 = Math.max(0, Math.min(N2 + G2, k2.scrollWidth - O2 + J2)));
    }
    C2.push({ el: k2, top: F2, left: G2 });
  }
  return C2;
}
function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}
function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = "auto";
  }
  var canSmoothScroll = "scrollBehavior" in document.body.style;
  actions.forEach(function(_ref) {
    var el = _ref.el, top = _ref.top, left = _ref.left;
    if (el.scroll && canSmoothScroll) {
      el.scroll({
        top,
        left,
        behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}
function getOptions(options) {
  if (options === false) {
    return {
      block: "end",
      inline: "nearest"
    };
  }
  if (isOptionsObject(options)) {
    return options;
  }
  return {
    block: "start",
    inline: "nearest"
  };
}
function scrollIntoView(target, options) {
  var isTargetAttached = target.isConnected || target.ownerDocument.documentElement.contains(target);
  if (isOptionsObject(options) && typeof options.behavior === "function") {
    return options.behavior(isTargetAttached ? compute(target, options) : []);
  }
  if (!isTargetAttached) {
    return;
  }
  var computeOptions = getOptions(options);
  return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
}
var _a;
const isClient = typeof window !== "undefined";
const isDef = (val) => typeof val !== "undefined";
const isString = (val) => typeof val === "string";
const noop = () => {
};
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function createFilterWrapper(filter2, fn) {
  function wrapper(...args) {
    filter2(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  const filter2 = (invoke) => {
    const duration = unref(ms);
    const maxDuration = unref(options.maxWait);
    if (timer)
      clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }
      return invoke();
    }
    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer)
          clearTimeout(timer);
        maxTimer = null;
        invoke();
      }, maxDuration);
    }
    timer = setTimeout(() => {
      if (maxTimer)
        clearTimeout(maxTimer);
      maxTimer = null;
      invoke();
    }, duration);
  };
  return filter2;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive, pause, resume, eventFilter };
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function refDebounced(value, ms = 200, options = {}) {
  if (ms <= 0)
    return value;
  const debounced = ref(value.value);
  const updater = useDebounceFn(() => {
    debounced.value = value.value;
  }, ms, options);
  watch(value, () => updater());
  return debounced;
}
function tryOnBeforeMount(fn, sync = true) {
  if (getCurrentInstance())
    onBeforeMount(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear2() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear2();
  }
  function start(...args) {
    clear2();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, unref(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending,
    start,
    stop
  };
}
function useToggle(initialValue = false, options = {}) {
  const {
    truthyValue = true,
    falsyValue = false
  } = options;
  const valueIsRef = isRef(initialValue);
  const innerValue = ref(initialValue);
  function toggle(value) {
    if (arguments.length) {
      innerValue.value = value;
      return innerValue.value;
    } else {
      innerValue.value = innerValue.value === unref(truthyValue) ? unref(falsyValue) : unref(truthyValue);
      return innerValue.value;
    }
  }
  if (valueIsRef)
    return toggle;
  else
    return [innerValue, toggle];
}
var __getOwnPropSymbols$6$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$6$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$6$1 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6$1)
    for (var prop of __getOwnPropSymbols$6$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter
  } = _a2, watchOptions = __objRest$5(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
var __defProp$2$1 = Object.defineProperty;
var __defProps$2$1 = Object.defineProperties;
var __getOwnPropDescs$2$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$2$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$2$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2$1 = (obj, key, value) => key in obj ? __defProp$2$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2$1 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$2$1.call(b2, prop))
      __defNormalProp$2$1(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$2$1)
    for (var prop of __getOwnPropSymbols$2$1(b2)) {
      if (__propIsEnum$2$1.call(b2, prop))
        __defNormalProp$2$1(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps$2$1 = (a2, b2) => __defProps$2$1(a2, __getOwnPropDescs$2$1(b2));
var __objRest$1$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2$1)
    for (var prop of __getOwnPropSymbols$2$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchPausable(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter: filter2
  } = _a2, watchOptions = __objRest$1$1(_a2, [
    "eventFilter"
  ]);
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter2);
  const stop = watchWithFilter(source, cb, __spreadProps$2$1(__spreadValues$2$1({}, watchOptions), {
    eventFilter
  }));
  return { stop, pause, resume, isActive };
}
function unrefElement(elRef) {
  var _a2;
  const plain = unref(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
const defaultWindow = isClient ? window : void 0;
const defaultDocument = isClient ? window.document : void 0;
const defaultNavigator = isClient ? window.navigator : void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore, capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  const shouldListen = ref(true);
  let fallback;
  const listener = (event) => {
    window2.clearTimeout(fallback);
    const el = unrefElement(target);
    const composedPath = event.composedPath();
    if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value)
      return;
    if (ignore && ignore.length > 0) {
      if (ignore.some((target2) => {
        const el2 = unrefElement(target2);
        return el2 && (event.target === el2 || composedPath.includes(el2));
      }))
        return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e2) => {
      const el = unrefElement(target);
      shouldListen.value = !!el && !e2.composedPath().includes(el);
    }, { passive: true }),
    useEventListener(window2, "pointerup", (e2) => {
      if (e2.button === 0) {
        const path = e2.composedPath();
        e2.composedPath = () => path;
        fallback = window2.setTimeout(() => listener(e2), 50);
      }
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      var _a2;
      const el = unrefElement(target);
      if (((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(document.activeElement)))
        handler(event);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
function useActiveElement(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const counter2 = ref(0);
  if (window2) {
    useEventListener(window2, "blur", () => counter2.value += 1, true);
    useEventListener(window2, "focus", () => counter2.value += 1, true);
  }
  return computed(() => {
    counter2.value;
    return window2 == null ? void 0 : window2.document.activeElement;
  });
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported2 = Boolean(window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  let mediaQuery;
  const matches2 = ref(false);
  const update2 = () => {
    if (!isSupported2)
      return;
    if (!mediaQuery)
      mediaQuery = window2.matchMedia(query);
    matches2.value = mediaQuery.matches;
  };
  tryOnBeforeMount(() => {
    update2();
    if (!mediaQuery)
      return;
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update2);
    else
      mediaQuery.addListener(update2);
    tryOnScopeDispose(() => {
      if ("removeEventListener" in mediaQuery)
        mediaQuery.removeEventListener("change", update2);
      else
        mediaQuery.removeListener(update2);
    });
  });
  return matches2;
}
function useClipboard(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator,
    read: read2 = false,
    source,
    copiedDuring = 1500
  } = options;
  const events = ["copy", "cut"];
  const isSupported2 = Boolean(navigator2 && "clipboard" in navigator2);
  const text2 = ref("");
  const copied = ref(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring);
  function updateText() {
    navigator2.clipboard.readText().then((value) => {
      text2.value = value;
    });
  }
  if (isSupported2 && read2) {
    for (const event of events)
      useEventListener(event, updateText);
  }
  async function copy(value = unref(source)) {
    if (isSupported2 && value != null) {
      await navigator2.clipboard.writeText(value);
      text2.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  return {
    isSupported: isSupported2,
    text: text2,
    copied,
    copy
  };
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v2) => v2 === "true",
    write: (v2) => String(v2)
  },
  object: {
    read: (v2) => JSON.parse(v2),
    write: (v2) => JSON.stringify(v2)
  },
  number: {
    read: (v2) => Number.parseFloat(v2),
    write: (v2) => String(v2)
  },
  any: {
    read: (v2) => v2,
    write: (v2) => String(v2)
  },
  string: {
    read: (v2) => v2,
    write: (v2) => String(v2)
  },
  map: {
    read: (v2) => new Map(JSON.parse(v2)),
    write: (v2) => JSON.stringify(Array.from(v2.entries()))
  },
  set: {
    read: (v2) => new Set(JSON.parse(v2)),
    write: (v2) => JSON.stringify(Array.from(v2))
  },
  date: {
    read: (v2) => new Date(v2),
    write: (v2) => v2.toISOString()
  }
};
function useStorage(key, initialValue, storage2, options = {}) {
  var _a2;
  const {
    flush: flush2 = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e2) => {
      console.error(e2);
    }
  } = options;
  const data = (shallow ? shallowRef : ref)(initialValue);
  if (!storage2) {
    try {
      storage2 = getSSRHandler("getDefaultStorage", () => {
        var _a22;
        return (_a22 = defaultWindow) == null ? void 0 : _a22.localStorage;
      })();
    } catch (e2) {
      onError(e2);
    }
  }
  if (!storage2)
    return data;
  const rawInit = unref(initialValue);
  const type = guessSerializerType(rawInit);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, () => write(data.value), { flush: flush2, deep, eventFilter });
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", update2);
  update2();
  return data;
  function write(v2) {
    try {
      if (v2 == null)
        storage2.removeItem(key);
      else
        storage2.setItem(key, serializer.write(v2));
    } catch (e2) {
      onError(e2);
    }
  }
  function read2(event) {
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      const rawValue = event ? event.newValue : storage2.getItem(key);
      if (rawValue == null) {
        if (writeDefaults && rawInit !== null)
          storage2.setItem(key, serializer.write(rawInit));
        return rawInit;
      } else if (typeof rawValue !== "string") {
        return rawValue;
      } else {
        return serializer.read(rawValue);
      }
    } catch (e2) {
      onError(e2);
    } finally {
      resumeWatch();
    }
  }
  function update2(event) {
    if (event && event.key !== key)
      return;
    data.value = read2(event);
  }
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
var __defProp$h = Object.defineProperty;
var __getOwnPropSymbols$j = Object.getOwnPropertySymbols;
var __hasOwnProp$j = Object.prototype.hasOwnProperty;
var __propIsEnum$j = Object.prototype.propertyIsEnumerable;
var __defNormalProp$h = (obj, key, value) => key in obj ? __defProp$h(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$h = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$j.call(b2, prop))
      __defNormalProp$h(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$j)
    for (var prop of __getOwnPropSymbols$j(b2)) {
      if (__propIsEnum$j.call(b2, prop))
        __defNormalProp$h(a2, prop, b2[prop]);
    }
  return a2;
};
function useColorMode(options = {}) {
  const {
    selector = "html",
    attribute = "class",
    window: window2 = defaultWindow,
    storage: storage2,
    storageKey = "vueuse-color-scheme",
    listenToStorageChanges = true,
    storageRef,
    emitAuto
  } = options;
  const modes = __spreadValues$h({
    auto: "",
    light: "light",
    dark: "dark"
  }, options.modes || {});
  const preferredDark = usePreferredDark({ window: window2 });
  const preferredMode = computed(() => preferredDark.value ? "dark" : "light");
  const store = storageRef || (storageKey == null ? ref("auto") : useStorage(storageKey, "auto", storage2, { window: window2, listenToStorageChanges }));
  const state = computed({
    get() {
      return store.value === "auto" && !emitAuto ? preferredMode.value : store.value;
    },
    set(v2) {
      store.value = v2;
    }
  });
  const updateHTMLAttrs = getSSRHandler("updateHTMLAttrs", (selector2, attribute2, value) => {
    const el = window2 == null ? void 0 : window2.document.querySelector(selector2);
    if (!el)
      return;
    if (attribute2 === "class") {
      const current = value.split(/\s/g);
      Object.values(modes).flatMap((i2) => (i2 || "").split(/\s/g)).filter(Boolean).forEach((v2) => {
        if (current.includes(v2))
          el.classList.add(v2);
        else
          el.classList.remove(v2);
      });
    } else {
      el.setAttribute(attribute2, value);
    }
  });
  function defaultOnChanged(mode2) {
    var _a2;
    const resolvedMode = mode2 === "auto" ? preferredMode.value : mode2;
    updateHTMLAttrs(selector, attribute, (_a2 = modes[resolvedMode]) != null ? _a2 : resolvedMode);
  }
  function onChanged(mode2) {
    if (options.onChanged)
      options.onChanged(mode2, defaultOnChanged);
    else
      defaultOnChanged(mode2);
  }
  watch(state, onChanged, { flush: "post", immediate: true });
  tryOnMounted(() => onChanged(state.value));
  return state;
}
var __defProp$g = Object.defineProperty;
var __defProps$7 = Object.defineProperties;
var __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$i = Object.getOwnPropertySymbols;
var __hasOwnProp$i = Object.prototype.hasOwnProperty;
var __propIsEnum$i = Object.prototype.propertyIsEnumerable;
var __defNormalProp$g = (obj, key, value) => key in obj ? __defProp$g(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$g = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$i.call(b2, prop))
      __defNormalProp$g(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$i)
    for (var prop of __getOwnPropSymbols$i(b2)) {
      if (__propIsEnum$i.call(b2, prop))
        __defNormalProp$g(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps$7 = (a2, b2) => __defProps$7(a2, __getOwnPropDescs$7(b2));
function useDark(options = {}) {
  const {
    valueDark = "dark",
    valueLight = "",
    window: window2 = defaultWindow
  } = options;
  const mode2 = useColorMode(__spreadProps$7(__spreadValues$g({}, options), {
    onChanged: (mode22, defaultHandler) => {
      var _a2;
      if (options.onChanged)
        (_a2 = options.onChanged) == null ? void 0 : _a2.call(options, mode22 === "dark");
      else
        defaultHandler(mode22);
    },
    modes: {
      dark: valueDark,
      light: valueLight
    }
  }));
  const preferredDark = usePreferredDark({ window: window2 });
  const isDark = computed({
    get() {
      return mode2.value === "dark";
    },
    set(v2) {
      if (v2 === preferredDark.value)
        mode2.value = "auto";
      else
        mode2.value = v2 ? "dark" : "light";
    }
  });
  return isDark;
}
var __getOwnPropSymbols$e = Object.getOwnPropertySymbols;
var __hasOwnProp$e = Object.prototype.hasOwnProperty;
var __propIsEnum$e = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$e.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$e)
    for (var prop of __getOwnPropSymbols$e(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$e.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
  let observer;
  const isSupported2 = window2 && "ResizeObserver" in window2;
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported2 && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported: isSupported2,
    stop
  };
}
function useFocus(target, options = {}) {
  const { initialValue = false } = options;
  const activeElement = useActiveElement(options);
  const targetElement = computed(() => unrefElement(target));
  const focused = computed({
    get() {
      return isDef(activeElement.value) && isDef(targetElement.value) && activeElement.value === targetElement.value;
    },
    set(value) {
      var _a2, _b;
      if (!value && focused.value)
        (_a2 = targetElement.value) == null ? void 0 : _a2.blur();
      if (value && !focused.value)
        (_b = targetElement.value) == null ? void 0 : _b.focus();
    }
  });
  watch(targetElement, () => {
    focused.value = initialValue;
  }, { immediate: true, flush: "post" });
  return { focused };
}
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useMutationObserver(target, callback, options = {}) {
  const _a2 = options, { window: window2 = defaultWindow } = _a2, mutationOptions = __objRest$1(_a2, ["window"]);
  let observer;
  const isSupported2 = window2 && "MutationObserver" in window2;
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported2 && window2 && el) {
      observer = new MutationObserver(callback);
      observer.observe(el, mutationOptions);
    }
  }, { immediate: true });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported: isSupported2,
    stop
  };
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function useTitle(newTitle = null, options = {}) {
  var _a2, _b;
  const {
    document: document2 = defaultDocument,
    observe = false,
    titleTemplate = "%s"
  } = options;
  const title = ref((_a2 = newTitle != null ? newTitle : document2 == null ? void 0 : document2.title) != null ? _a2 : null);
  watch(title, (t2, o) => {
    if (isString(t2) && t2 !== o && document2)
      document2.title = titleTemplate.replace("%s", t2);
  }, { immediate: true });
  if (observe && document2) {
    useMutationObserver((_b = document2.head) == null ? void 0 : _b.querySelector("title"), () => {
      if (document2 && document2.title !== title.value)
        title.value = titleTemplate.replace("%s", document2.title);
    }, { childList: true });
  }
  return title;
}
function unindent(code) {
  const lines = code.split("\n");
  let indentLevel = -1;
  let indentText;
  const linesToAnalyze = lines.filter((line) => line.trim().length > 0);
  for (const line of linesToAnalyze) {
    const match = /^\s*/.exec(line);
    if (match && (indentLevel === -1 || indentLevel > match[0].length)) {
      indentLevel = match[0].length;
      indentText = match[0];
    }
  }
  const result = [];
  for (const line of lines) {
    result.push(line.replace(indentText, ""));
  }
  return result.join("\n").trim();
}
function clone(data) {
  try {
    return structuredClone(data);
  } catch (e2) {
    console.warn(e2, `Fallback to JSON cloning`);
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e3) {
      console.error(e3);
    }
    return data;
  }
}
function omit(data, keys) {
  const copy = {};
  for (const key in data) {
    if (!keys.includes(key)) {
      copy[key] = data[key];
    }
  }
  return copy;
}
function applyState(target, state, override = false) {
  for (const key in state) {
    if (!override && target[key] && !key.startsWith("_h") && typeof target[key] === "object" && !Array.isArray(target[key])) {
      Object.assign(target[key], state[key]);
    } else {
      target[key] = state[key];
    }
  }
}
const _hoisted_1$9 = { class: "htw-p-2 hover:htw-bg-primary-100 dark:hover:htw-bg-primary-800 htw-flex htw-gap-2 htw-flex-wrap" };
const _hoisted_2$7 = { class: "htw-w-28 htw-whitespace-nowrap htw-text-ellipsis htw-overflow-hidden htw-shrink-0" };
const _hoisted_3$6 = { class: "htw-grow htw-flex htw-items-center htw-gap-1" };
const _hoisted_4$4 = { class: "htw-block htw-grow" };
const __default__$c = {
  name: "HstWrapper"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...__default__$c,
  props: {
    title: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", _hoisted_1$9, [
        withDirectives((openBlock(), createElementBlock("span", _hoisted_2$7, [
          createTextVNode(toDisplayString(__props.title), 1)
        ])), [
          [unref(VTooltip), {
            content: __props.title,
            placement: "left",
            distance: 12
          }]
        ]),
        createBaseVNode("span", _hoisted_3$6, [
          createBaseVNode("span", _hoisted_4$4, [
            renderSlot(_ctx.$slots, "default")
          ]),
          renderSlot(_ctx.$slots, "actions")
        ])
      ]);
    };
  }
});
const _hoisted_1$8 = { class: "htw-text-white htw-w-[16px] htw-h-[16px] htw-relative" };
const _hoisted_2$6 = {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  class: "htw-relative htw-z-10"
};
const _hoisted_3$5 = ["stroke-dasharray", "stroke-dashoffset"];
const __default__$b = {
  name: "HstCheckbox"
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...__default__$b,
  props: {
    modelValue: { type: Boolean },
    title: null
  },
  emits: {
    "update:modelValue": (newValue) => true
  },
  setup(__props, { emit: emit2 }) {
    const props = __props;
    function toggle() {
      emit2("update:modelValue", !props.modelValue);
      animationEnabled.value = true;
    }
    const path = ref();
    const dasharray = ref(0);
    const progress = computed(() => props.modelValue ? 1 : 0);
    const dashoffset = computed(() => (1 - progress.value) * dasharray.value);
    const animationEnabled = ref(false);
    watch(path, () => {
      var _a2, _b, _c;
      dasharray.value = (_c = (_b = (_a2 = path.value).getTotalLength) == null ? void 0 : _b.call(_a2)) != null ? _c : 21.21;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, {
        role: "checkbox",
        tabindex: "0",
        class: "htw-cursor-pointer htw-items-center",
        title: __props.title,
        onClick: _cache[0] || (_cache[0] = ($event) => toggle()),
        onKeydown: [
          _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => toggle(), ["prevent"]), ["enter"])),
          _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => toggle(), ["prevent"]), ["space"]))
        ]
      }, {
        actions: withCtx(() => [
          renderSlot(_ctx.$slots, "actions")
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$8, [
            createBaseVNode("div", {
              class: normalizeClass(["htw-border htw-border-solid group-active:htw-bg-gray-500/20 htw-rounded-sm htw-box-border htw-absolute htw-inset-0 htw-transition-border htw-duration-150 htw-ease-out", [
                __props.modelValue ? "htw-border-primary-500 htw-border-8" : "htw-border-black/25 dark:htw-border-white/25 htw-delay-150"
              ]])
            }, null, 2),
            (openBlock(), createElementBlock("svg", _hoisted_2$6, [
              createBaseVNode("path", {
                ref_key: "path",
                ref: path,
                d: "m 4 12 l 5 5 l 10 -10",
                fill: "none",
                class: normalizeClass(["htw-stroke-white htw-stroke-2 htw-duration-200 htw-ease-in-out", [
                  animationEnabled.value ? "htw-transition-all" : "htw-transition-none",
                  {
                    "htw-delay-150": __props.modelValue
                  }
                ]]),
                "stroke-dasharray": dasharray.value,
                "stroke-dashoffset": unref(dashoffset)
              }, null, 10, _hoisted_3$5)
            ]))
          ])
        ]),
        _: 3
      }, 8, ["title"]);
    };
  }
});
const _hoisted_1$7 = ["value"];
const __default__$a = {
  name: "HstText"
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  props: {
    title: null,
    modelValue: null
  },
  emits: {
    "update:modelValue": (newValue) => true
  },
  setup(__props, { emit: emit2 }) {
    const input = ref();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, {
        title: __props.title,
        class: normalizeClass(["htw-cursor-text htw-items-center", _ctx.$attrs.class]),
        style: normalizeStyle(_ctx.$attrs.style),
        onClick: _cache[1] || (_cache[1] = ($event) => input.value.focus())
      }, {
        actions: withCtx(() => [
          renderSlot(_ctx.$slots, "actions")
        ]),
        default: withCtx(() => [
          createBaseVNode("input", mergeProps({
            ref_key: "input",
            ref: input
          }, { ..._ctx.$attrs, class: null, style: null }, {
            type: "text",
            value: __props.modelValue,
            class: "htw-text-inherit htw-bg-transparent htw-w-full htw-outline-none htw-px-2 htw-py-1 -htw-my-1 htw-border htw-border-solid htw-border-black/25 dark:htw-border-white/25 focus:htw-border-primary-500 dark:focus:htw-border-primary-500 htw-rounded-sm",
            onInput: _cache[0] || (_cache[0] = ($event) => emit2("update:modelValue", $event.target.value))
          }), null, 16, _hoisted_1$7)
        ]),
        _: 3
      }, 8, ["title", "class", "style"]);
    };
  }
});
const __default__$9 = {
  name: "HstNumber",
  inheritAttrs: false
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...__default__$9,
  props: {
    title: null,
    modelValue: null
  },
  emits: {
    "update:modelValue": (newValue) => true
  },
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const numberModel = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit2("update:modelValue", value);
      }
    });
    const input = ref();
    function focusAndSelect() {
      input.value.focus();
      input.value.select();
    }
    const isDragging = ref(false);
    let startX;
    let startValue;
    function onMouseDown(event) {
      isDragging.value = true;
      startX = event.clientX;
      startValue = numberModel.value;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", stopDragging);
    }
    function onMouseMove(event) {
      let step = parseFloat(input.value.step);
      if (isNaN(step)) {
        step = 1;
      }
      numberModel.value = startValue + Math.round((event.clientX - startX) / 10 / step) * step;
    }
    function stopDragging() {
      isDragging.value = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    }
    onUnmounted(() => {
      stopDragging();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, {
        class: normalizeClass(["htw-cursor-ew-resize htw-items-center", [
          _ctx.$attrs.class,
          { "htw-select-none": isDragging.value }
        ]]),
        title: __props.title,
        style: normalizeStyle(_ctx.$attrs.style),
        onClick: focusAndSelect,
        onMousedown: onMouseDown
      }, {
        actions: withCtx(() => [
          renderSlot(_ctx.$slots, "actions")
        ]),
        default: withCtx(() => [
          withDirectives(createBaseVNode("input", mergeProps({
            ref_key: "input",
            ref: input
          }, { ..._ctx.$attrs, class: null, style: null }, {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(numberModel) ? numberModel.value = $event : null),
            type: "number",
            class: [{
              "htw-select-none": isDragging.value
            }, "htw-text-inherit htw-bg-transparent htw-w-full htw-outline-none htw-pl-2 htw-py-1 -htw-my-1 htw-border htw-border-solid htw-border-black/25 dark:htw-border-white/25 focus:htw-border-primary-500 dark:focus:htw-border-primary-500 htw-rounded-sm htw-cursor-ew-resize"]
          }), null, 16), [
            [
              vModelText,
              unref(numberModel),
              void 0,
              { number: true }
            ]
          ])
        ]),
        _: 3
      }, 8, ["title", "class", "style"]);
    };
  }
});
const _hoisted_1$6 = { class: "htw-relative htw-w-full htw-flex htw-items-center" };
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("div", { class: "htw-absolute htw-inset-0 htw-flex htw-items-center" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "htw-border htw-border-black/25 dark:htw-border-white/25 htw-h-1 htw-w-full htw-rounded-full" })
], -1);
const __default__$8 = {
  name: "HstSlider",
  inheritAttrs: false
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...__default__$8,
  props: {
    title: null,
    modelValue: null,
    min: null,
    max: null
  },
  emits: {
    "update:modelValue": (newValue) => true
  },
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const showTooltip = ref(false);
    const input = ref(null);
    const numberModel = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit2("update:modelValue", value);
      }
    });
    const percentage = computed(() => {
      return (props.modelValue - props.min) / (props.max - props.min);
    });
    const tooltipStyle = computed(() => {
      const gap = 8;
      if (input.value) {
        const position2 = gap + (input.value.clientWidth - 2 * gap) * percentage.value;
        return {
          left: position2 + "px"
        };
      }
      return {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, {
        class: normalizeClass(["htw-items-center", _ctx.$attrs.class]),
        title: __props.title,
        style: normalizeStyle(_ctx.$attrs.style)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$6, [
            _hoisted_2$5,
            withDirectives(createBaseVNode("input", mergeProps({
              ref_key: "input",
              ref: input,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(numberModel) ? numberModel.value = $event : null),
              class: "htw-range-input htw-appearance-none htw-border-0 htw-bg-transparent htw-cursor-pointer htw-relative htw-w-full htw-m-0 htw-text-gray-700",
              type: "range"
            }, { ..._ctx.$attrs, class: null, style: null, min: __props.min, max: __props.max }, {
              onMouseover: _cache[1] || (_cache[1] = ($event) => showTooltip.value = true),
              onMouseleave: _cache[2] || (_cache[2] = ($event) => showTooltip.value = false)
            }), null, 16), [
              [
                vModelText,
                unref(numberModel),
                void 0,
                { number: true }
              ]
            ]),
            showTooltip.value ? withDirectives((openBlock(), createElementBlock("div", {
              key: 0,
              class: "htw-absolute",
              style: normalizeStyle(unref(tooltipStyle))
            }, null, 4)), [
              [unref(VTooltip), { content: __props.modelValue.toString(), shown: true, distance: 16, delay: 0 }]
            ]) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["title", "class", "style"]);
    };
  }
});
const _hoisted_1$5 = ["value"];
const __default__$7 = {
  name: "HstTextarea",
  inheritAttrs: false
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  props: {
    title: null,
    modelValue: null
  },
  emits: {
    "update:modelValue": (newValue) => true
  },
  setup(__props, { emit: emit2 }) {
    const input = ref();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, {
        title: __props.title,
        class: normalizeClass(["htw-cursor-text", _ctx.$attrs.class]),
        style: normalizeStyle(_ctx.$attrs.style),
        onClick: _cache[1] || (_cache[1] = ($event) => input.value.focus())
      }, {
        actions: withCtx(() => [
          renderSlot(_ctx.$slots, "actions")
        ]),
        default: withCtx(() => [
          createBaseVNode("textarea", mergeProps({
            ref_key: "input",
            ref: input
          }, { ..._ctx.$attrs, class: null, style: null }, {
            value: __props.modelValue,
            class: "htw-text-inherit htw-bg-transparent htw-w-full htw-outline-none htw-px-2 htw-py-1 -htw-my-1 htw-border htw-border-solid htw-border-black/25 dark:htw-border-white/25 focus:htw-border-primary-500 dark:focus:htw-border-primary-500 htw-rounded-sm htw-box-border htw-resize-y htw-min-h-[26px]",
            onInput: _cache[0] || (_cache[0] = ($event) => emit2("update:modelValue", $event.target.value))
          }), null, 16, _hoisted_1$5)
        ]),
        _: 3
      }, 8, ["title", "class", "style"]);
    };
  }
});
const _hoisted_1$4 = { class: "htw-cursor-pointer htw-w-full htw-outline-none htw-px-2 htw-h-[27px] -htw-my-1 htw-border htw-border-solid htw-border-black/25 dark:htw-border-white/25 hover:htw-border-primary-500 dark:hover:htw-border-primary-500 htw-rounded-sm htw-flex htw-gap-2 htw-items-center htw-leading-normal" };
const _hoisted_2$4 = { class: "htw-flex-1 htw-truncate" };
const _hoisted_3$4 = { class: "htw-flex htw-flex-col htw-bg-gray-50 dark:htw-bg-gray-700" };
const _hoisted_4$3 = ["onClick"];
const __default__$6 = {
  name: "CustomSelect"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: {
    modelValue: null,
    options: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const formattedOptions = computed(() => {
      if (Array.isArray(props.options)) {
        return props.options.map((option) => {
          if (typeof option === "string") {
            return [option, option];
          } else {
            return [option.value, option.label];
          }
        });
      } else {
        return Object.entries(props.options);
      }
    });
    const selectedLabel = computed(() => {
      var _a2;
      return (_a2 = formattedOptions.value.find(([value]) => value === props.modelValue)) == null ? void 0 : _a2[1];
    });
    function selectValue(value, hide) {
      emits("update:modelValue", value);
      hide();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Dropdown), { "auto-size": "" }, {
        popper: withCtx(({ hide }) => [
          createBaseVNode("div", _hoisted_3$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(formattedOptions), ([value, label]) => {
              return openBlock(), createElementBlock("div", mergeProps({ ..._ctx.$attrs, class: null, style: null }, {
                key: label,
                class: ["htw-px-2 htw-py-1 htw-cursor-pointer hover:htw-bg-primary-100 dark:hover:htw-bg-primary-700", {
                  "htw-bg-primary-200 dark:htw-bg-primary-800": props.modelValue === value
                }],
                onClick: ($event) => selectValue(value, hide)
              }), toDisplayString(label), 17, _hoisted_4$3);
            }), 128))
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("div", _hoisted_2$4, [
              renderSlot(_ctx.$slots, "default", { label: unref(selectedLabel) }, () => [
                createTextVNode(toDisplayString(unref(selectedLabel)), 1)
              ])
            ]),
            createVNode(unref(Icon), {
              icon: "carbon:chevron-sort",
              class: "htw-w-4 htw-h-4 htw-flex-none htw-ml-auto"
            })
          ])
        ]),
        _: 3
      });
    };
  }
});
const __default__$5 = {
  name: "HstSelect"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  props: {
    title: null,
    modelValue: null,
    options: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, {
        title: __props.title,
        class: normalizeClass(["htw-cursor-text htw-items-center", _ctx.$attrs.class]),
        style: normalizeStyle(_ctx.$attrs.style)
      }, {
        actions: withCtx(() => [
          renderSlot(_ctx.$slots, "actions")
        ]),
        default: withCtx(() => [
          createVNode(_sfc_main$6, {
            options: __props.options,
            "model-value": __props.modelValue,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emits("update:modelValue", $event))
          }, null, 8, ["options", "model-value"])
        ]),
        _: 3
      }, 8, ["title", "class", "style"]);
    };
  }
});
const __default__$4 = {
  name: "HstCopyIcon"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { copy, copied } = useClipboard();
    const action = () => copy(props.content);
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createBlock(unref(Icon), {
        icon: "carbon:copy-file",
        class: "htw-w-4 htw-h-4 htw-opacity-50 hover:htw-opacity-100 hover:htw-text-primary-500 htw-cursor-pointer",
        onClick: _cache[0] || (_cache[0] = ($event) => action())
      }, null, 512)), [
        [unref(VTooltip), {
          content: "Copied!",
          triggers: [],
          shown: unref(copied),
          distance: 12,
          delay: 0
        }]
      ]);
    };
  }
});
const _hoisted_1$3 = {
  key: 0,
  class: "htw-grid htw-gap-4 htw-grid-cols-[repeat(auto-fill,minmax(200px,1fr))] htw-m-4"
};
const _hoisted_2$3 = ["onMouseenter"];
const _hoisted_3$3 = { class: "htw-flex htw-gap-1" };
const _hoisted_4$2 = { class: "htw-my-0 htw-truncate htw-shrink" };
const _hoisted_5$2 = { class: "htw-flex htw-gap-1" };
const _hoisted_6$1 = { class: "htw-my-0 htw-opacity-50 htw-truncate htw-shrink" };
const __default__$3 = {
  name: "HstColorShades"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: {
    shades: null,
    getName: null,
    search: null
  },
  setup(__props) {
    const props = __props;
    const shadesWithName = computed(() => {
      const shades = props.shades;
      const getName = props.getName;
      return Object.entries(shades).map(([key, color]) => {
        const name = getName ? getName(key, color) : key;
        return {
          key,
          color,
          name
        };
      });
    });
    const displayedShades = computed(() => {
      let list = shadesWithName.value;
      if (props.search) {
        const reg = new RegExp(props.search, "i");
        list = list.filter(({ name }) => reg.test(name));
      }
      return list;
    });
    const hover = ref(null);
    return (_ctx, _cache) => {
      return unref(displayedShades).length ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(displayedShades), (shade) => {
          return openBlock(), createElementBlock("div", {
            key: shade.key,
            class: "htw-flex htw-flex-col htw-gap-2",
            onMouseenter: ($event) => hover.value = shade.key,
            onMouseleave: _cache[0] || (_cache[0] = ($event) => hover.value = null)
          }, [
            renderSlot(_ctx.$slots, "default", {
              color: shade.color
            }, () => [
              createBaseVNode("div", {
                class: "htw-rounded-full htw-w-16 htw-h-16",
                style: normalizeStyle({
                  backgroundColor: shade.color
                })
              }, null, 4)
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_3$3, [
                withDirectives((openBlock(), createElementBlock("pre", _hoisted_4$2, [
                  createTextVNode(toDisplayString(shade.name), 1)
                ])), [
                  [unref(VTooltip), shade.name.length > 23 ? shade.name : ""]
                ]),
                hover.value === shade.key ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 0,
                  content: shade.name,
                  class: "htw-flex-none"
                }, null, 8, ["content"])) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_5$2, [
                withDirectives((openBlock(), createElementBlock("pre", _hoisted_6$1, [
                  createTextVNode(toDisplayString(shade.color), 1)
                ])), [
                  [unref(VTooltip), shade.color.length > 23 ? shade.color : ""]
                ]),
                hover.value === shade.key ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 0,
                  content: shade.color,
                  class: "htw-flex-none"
                }, null, 8, ["content"])) : createCommentVNode("", true)
              ])
            ])
          ], 40, _hoisted_2$3);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$2 = ["onMouseenter"];
const _hoisted_2$2 = { class: "htw-mx-4" };
const _hoisted_3$2 = { class: "htw-flex htw-gap-1" };
const _hoisted_4$1 = { class: "htw-my-0 htw-truncate htw-shrink" };
const _hoisted_5$1 = { class: "htw-flex htw-gap-1" };
const _hoisted_6 = { class: "htw-my-0 htw-opacity-50 htw-truncate htw-shrink" };
const __default__$2 = {
  name: "HstTokenList"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: {
    tokens: null,
    getName: null
  },
  setup(__props) {
    const props = __props;
    const processedTokens = computed(() => {
      const list = props.tokens;
      const getName = props.getName;
      return Object.entries(list).map(([key, value]) => {
        const name = getName ? getName(key, value) : key;
        return {
          key,
          name,
          value: typeof value === "number" ? value.toString() : value
        };
      });
    });
    const hover = ref(null);
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(unref(processedTokens), (token) => {
        return openBlock(), createElementBlock("div", {
          key: token.key,
          class: "htw-flex htw-flex-col htw-gap-2 htw-my-8",
          onMouseenter: ($event) => hover.value = token.key,
          onMouseleave: _cache[0] || (_cache[0] = ($event) => hover.value = null)
        }, [
          renderSlot(_ctx.$slots, "default", { token }),
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("pre", _hoisted_4$1, toDisplayString(token.name), 1),
              hover.value === token.key ? (openBlock(), createBlock(_sfc_main$4, {
                key: 0,
                content: token.name,
                class: "htw-flex-none"
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("pre", _hoisted_6, toDisplayString(token.value), 1),
              hover.value === token.key ? (openBlock(), createBlock(_sfc_main$4, {
                key: 0,
                content: typeof token.value === "string" ? token.value : JSON.stringify(token.value),
                class: "htw-flex-none"
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ])
          ])
        ], 40, _hoisted_1$2);
      }), 128);
    };
  }
});
const _hoisted_1$1 = ["onMouseenter"];
const _hoisted_2$1 = { class: "htw-flex htw-gap-1" };
const _hoisted_3$1 = { class: "htw-my-0 htw-truncate htw-shrink" };
const _hoisted_4 = { class: "htw-flex htw-gap-1" };
const _hoisted_5 = { class: "htw-my-0 htw-opacity-50 htw-truncate htw-shrink" };
const __default__$1 = {
  name: "HstTokenGrid"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: {
    tokens: null,
    colSize: { default: 180 },
    getName: { type: Function, default: null }
  },
  setup(__props) {
    const props = __props;
    const processedTokens = computed(() => {
      const list = props.tokens;
      const getName = props.getName;
      return Object.entries(list).map(([key, value]) => {
        const name = getName ? getName(key, value) : key;
        return {
          key,
          name,
          value: typeof value === "number" ? value.toString() : value
        };
      });
    });
    const colSizePx = computed(() => `${props.colSize}px`);
    const hover = ref(null);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "htw-bind-col-size htw-grid htw-gap-4 htw-m-4",
        style: normalizeStyle({
          "--histoire-col-size": unref(colSizePx)
        })
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(processedTokens), (token) => {
          return openBlock(), createElementBlock("div", {
            key: token.key,
            class: "htw-flex htw-flex-col htw-gap-2",
            onMouseenter: ($event) => hover.value = token.key,
            onMouseleave: _cache[0] || (_cache[0] = ($event) => hover.value = null)
          }, [
            renderSlot(_ctx.$slots, "default", { token }),
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_2$1, [
                withDirectives((openBlock(), createElementBlock("pre", _hoisted_3$1, [
                  createTextVNode(toDisplayString(token.name), 1)
                ])), [
                  [unref(VTooltip), token.name.length > __props.colSize / 8 ? token.name : ""]
                ]),
                hover.value === token.key ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 0,
                  content: token.name,
                  class: "htw-flex-none"
                }, null, 8, ["content"])) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_4, [
                withDirectives((openBlock(), createElementBlock("pre", _hoisted_5, [
                  createTextVNode(toDisplayString(token.value), 1)
                ])), [
                  [unref(VTooltip), token.value.length > __props.colSize / 8 ? token.value : ""]
                ]),
                hover.value === token.key ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 0,
                  content: typeof token.value === "string" ? token.value : JSON.stringify(token.value),
                  class: "htw-flex-none"
                }, null, 8, ["content"])) : createCommentVNode("", true)
              ])
            ])
          ], 40, _hoisted_1$1);
        }), 128))
      ], 4);
    };
  }
});
const _hoisted_1 = { class: "-htw-my-1" };
const _hoisted_2 = ["id", "name", "value", "checked", "onChange"];
const _hoisted_3 = ["for", "onKeydown"];
const __default__ = {
  name: "HstRadio"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    title: null,
    modelValue: null,
    options: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const formattedOptions = computed(() => {
      if (Array.isArray(props.options)) {
        return Object.fromEntries(props.options.map((value) => {
          if (typeof value === "string") {
            return [value, value];
          } else {
            return [value.value, value.label];
          }
        }));
      }
      return props.options;
    });
    function selectOption(value) {
      emit2("update:modelValue", value);
      animationEnabled.value = true;
    }
    const animationEnabled = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$c, {
        role: "group",
        title: __props.title,
        class: normalizeClass(["htw-cursor-text", _ctx.$attrs.class]),
        style: normalizeStyle(_ctx.$attrs.style)
      }, {
        actions: withCtx(() => [
          renderSlot(_ctx.$slots, "actions")
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(formattedOptions), (label, value) => {
              return openBlock(), createElementBlock(Fragment, { key: value }, [
                createBaseVNode("input", {
                  id: `${value}-radio`,
                  type: "radio",
                  name: `${value}-radio`,
                  value,
                  checked: value === __props.modelValue,
                  class: "htw-hidden",
                  onChange: ($event) => selectOption(value)
                }, null, 40, _hoisted_2),
                createBaseVNode("label", {
                  tabindex: "0",
                  for: `${value}-radio`,
                  class: "htw-cursor-pointer htw-flex htw-items-center htw-relative htw-py-1 htw-group",
                  onKeydown: [
                    withKeys(withModifiers(($event) => selectOption(value), ["prevent"]), ["enter"]),
                    withKeys(withModifiers(($event) => selectOption(value), ["prevent"]), ["space"])
                  ]
                }, [
                  (openBlock(), createElementBlock("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "-12 -12 24 24",
                    class: normalizeClass(["htw-relative htw-z-10 htw-border htw-border-solid htw-text-inherit htw-rounded-full htw-box-border htw-inset-0 htw-transition-border htw-duration-150 htw-ease-out htw-mr-2 group-hover:htw-border-primary-500", [
                      __props.modelValue === value ? "htw-border-primary-500" : "htw-border-black/25 dark:htw-border-white/25"
                    ]])
                  }, [
                    createBaseVNode("circle", {
                      r: "7",
                      class: normalizeClass(["htw-will-change-transform", [
                        animationEnabled.value ? "htw-transition-all" : "htw-transition-none",
                        {
                          "htw-delay-150": __props.modelValue === value
                        },
                        __props.modelValue === value ? "htw-fill-primary-500" : "htw-fill-transparent htw-scale-0"
                      ]])
                    }, null, 2)
                  ], 2)),
                  createTextVNode(" " + toDisplayString(label), 1)
                ], 40, _hoisted_3)
              ], 64);
            }), 128))
          ])
        ]),
        _: 3
      }, 8, ["title", "class", "style"]);
    };
  }
});
const HstCheckbox = _sfc_main$b;
const HstText = _sfc_main$a;
const HstNumber = _sfc_main$9;
const HstSlider = _sfc_main$8;
const HstTextarea = _sfc_main$7;
const HstSelect = _sfc_main$5;
const HstColorShades = _sfc_main$3;
const HstTokenList = _sfc_main$2;
const HstTokenGrid = _sfc_main$1;
const HstCopyIcon = _sfc_main$4;
const HstRadio = _sfc_main;
const components = {
  HstCheckbox,
  HstText,
  HstNumber,
  HstSlider,
  HstTextarea,
  HstSelect,
  HstColorShades,
  HstTokenList,
  HstTokenGrid,
  HstCopyIcon,
  HstRadio
};
var main$1 = { exports: {} };
(function(module2, exports) {
  !function(t2, n2) {
    module2.exports = n2();
  }(commonjsGlobal, function() {
    return t2 = { 770: function(t3, n3, e2) {
      var r2 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(n3, "__esModule", { value: true }), n3.setDefaultDebugCall = n3.createOnigScanner = n3.createOnigString = n3.loadWASM = n3.OnigScanner = n3.OnigString = void 0;
      const i2 = r2(e2(418));
      let o = null, a2 = false;
      class f2 {
        constructor(t4) {
          const n4 = t4.length, e3 = f2._utf8ByteLength(t4), r3 = e3 !== n4, i3 = r3 ? new Uint32Array(n4 + 1) : null;
          r3 && (i3[n4] = e3);
          const o2 = r3 ? new Uint32Array(e3 + 1) : null;
          r3 && (o2[e3] = n4);
          const a3 = new Uint8Array(e3);
          let s2 = 0;
          for (let e4 = 0; e4 < n4; e4++) {
            const f3 = t4.charCodeAt(e4);
            let u3 = f3, c3 = false;
            if (f3 >= 55296 && f3 <= 56319 && e4 + 1 < n4) {
              const n5 = t4.charCodeAt(e4 + 1);
              n5 >= 56320 && n5 <= 57343 && (u3 = 65536 + (f3 - 55296 << 10) | n5 - 56320, c3 = true);
            }
            r3 && (i3[e4] = s2, c3 && (i3[e4 + 1] = s2), u3 <= 127 ? o2[s2 + 0] = e4 : u3 <= 2047 ? (o2[s2 + 0] = e4, o2[s2 + 1] = e4) : u3 <= 65535 ? (o2[s2 + 0] = e4, o2[s2 + 1] = e4, o2[s2 + 2] = e4) : (o2[s2 + 0] = e4, o2[s2 + 1] = e4, o2[s2 + 2] = e4, o2[s2 + 3] = e4)), u3 <= 127 ? a3[s2++] = u3 : u3 <= 2047 ? (a3[s2++] = 192 | (1984 & u3) >>> 6, a3[s2++] = 128 | (63 & u3) >>> 0) : u3 <= 65535 ? (a3[s2++] = 224 | (61440 & u3) >>> 12, a3[s2++] = 128 | (4032 & u3) >>> 6, a3[s2++] = 128 | (63 & u3) >>> 0) : (a3[s2++] = 240 | (1835008 & u3) >>> 18, a3[s2++] = 128 | (258048 & u3) >>> 12, a3[s2++] = 128 | (4032 & u3) >>> 6, a3[s2++] = 128 | (63 & u3) >>> 0), c3 && e4++;
          }
          this.utf16Length = n4, this.utf8Length = e3, this.utf16Value = t4, this.utf8Value = a3, this.utf16OffsetToUtf8 = i3, this.utf8OffsetToUtf16 = o2;
        }
        static _utf8ByteLength(t4) {
          let n4 = 0;
          for (let e3 = 0, r3 = t4.length; e3 < r3; e3++) {
            const i3 = t4.charCodeAt(e3);
            let o2 = i3, a3 = false;
            if (i3 >= 55296 && i3 <= 56319 && e3 + 1 < r3) {
              const n5 = t4.charCodeAt(e3 + 1);
              n5 >= 56320 && n5 <= 57343 && (o2 = 65536 + (i3 - 55296 << 10) | n5 - 56320, a3 = true);
            }
            n4 += o2 <= 127 ? 1 : o2 <= 2047 ? 2 : o2 <= 65535 ? 3 : 4, a3 && e3++;
          }
          return n4;
        }
        createString(t4) {
          const n4 = t4._omalloc(this.utf8Length);
          return t4.HEAPU8.set(this.utf8Value, n4), n4;
        }
      }
      class s {
        constructor(t4) {
          if (this.id = ++s.LAST_ID, !o)
            throw new Error("Must invoke loadWASM first.");
          this._onigBinding = o, this.content = t4;
          const n4 = new f2(t4);
          this.utf16Length = n4.utf16Length, this.utf8Length = n4.utf8Length, this.utf16OffsetToUtf8 = n4.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = n4.utf8OffsetToUtf16, this.utf8Length < 1e4 && !s._sharedPtrInUse ? (s._sharedPtr || (s._sharedPtr = o._omalloc(1e4)), s._sharedPtrInUse = true, o.HEAPU8.set(n4.utf8Value, s._sharedPtr), this.ptr = s._sharedPtr) : this.ptr = n4.createString(o);
        }
        convertUtf8OffsetToUtf16(t4) {
          return this.utf8OffsetToUtf16 ? t4 < 0 ? 0 : t4 > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[t4] : t4;
        }
        convertUtf16OffsetToUtf8(t4) {
          return this.utf16OffsetToUtf8 ? t4 < 0 ? 0 : t4 > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[t4] : t4;
        }
        dispose() {
          this.ptr === s._sharedPtr ? s._sharedPtrInUse = false : this._onigBinding._ofree(this.ptr);
        }
      }
      n3.OnigString = s, s.LAST_ID = 0, s._sharedPtr = 0, s._sharedPtrInUse = false;
      class u2 {
        constructor(t4) {
          if (!o)
            throw new Error("Must invoke loadWASM first.");
          const n4 = [], e3 = [];
          for (let r4 = 0, i4 = t4.length; r4 < i4; r4++) {
            const i5 = new f2(t4[r4]);
            n4[r4] = i5.createString(o), e3[r4] = i5.utf8Length;
          }
          const r3 = o._omalloc(4 * t4.length);
          o.HEAPU32.set(n4, r3 / 4);
          const i3 = o._omalloc(4 * t4.length);
          o.HEAPU32.set(e3, i3 / 4);
          const a3 = o._createOnigScanner(r3, i3, t4.length);
          for (let e4 = 0, r4 = t4.length; e4 < r4; e4++)
            o._ofree(n4[e4]);
          o._ofree(i3), o._ofree(r3), 0 === a3 && function(t5) {
            throw new Error(t5.UTF8ToString(t5._getLastOnigError()));
          }(o), this._onigBinding = o, this._ptr = a3;
        }
        dispose() {
          this._onigBinding._freeOnigScanner(this._ptr);
        }
        findNextMatchSync(t4, n4, e3) {
          let r3 = a2, i3 = 0;
          if ("number" == typeof e3 ? (8 & e3 && (r3 = true), i3 = e3) : "boolean" == typeof e3 && (r3 = e3), "string" == typeof t4) {
            t4 = new s(t4);
            const e4 = this._findNextMatchSync(t4, n4, r3, i3);
            return t4.dispose(), e4;
          }
          return this._findNextMatchSync(t4, n4, r3, i3);
        }
        _findNextMatchSync(t4, n4, e3, r3) {
          const i3 = this._onigBinding;
          let o2;
          if (o2 = e3 ? i3._findNextOnigScannerMatchDbg(this._ptr, t4.id, t4.ptr, t4.utf8Length, t4.convertUtf16OffsetToUtf8(n4), r3) : i3._findNextOnigScannerMatch(this._ptr, t4.id, t4.ptr, t4.utf8Length, t4.convertUtf16OffsetToUtf8(n4), r3), 0 === o2)
            return null;
          const a3 = i3.HEAPU32;
          let f3 = o2 / 4;
          const s2 = a3[f3++], u3 = a3[f3++];
          let c3 = [];
          for (let n5 = 0; n5 < u3; n5++) {
            const e4 = t4.convertUtf8OffsetToUtf16(a3[f3++]), r4 = t4.convertUtf8OffsetToUtf16(a3[f3++]);
            c3[n5] = { start: e4, end: r4, length: r4 - e4 };
          }
          return { index: s2, captureIndices: c3 };
        }
      }
      n3.OnigScanner = u2;
      let c2 = false, l = null;
      n3.loadWASM = function(t4) {
        if (c2)
          return l;
        let n4, e3, r3, a3;
        if (c2 = true, function(t5) {
          return "function" == typeof t5.instantiator;
        }(t4))
          n4 = t4.instantiator, e3 = t4.print;
        else {
          let r4;
          !function(t5) {
            return void 0 !== t5.data;
          }(t4) ? r4 = t4 : (r4 = t4.data, e3 = t4.print), n4 = function(t5) {
            return "undefined" != typeof Response && t5 instanceof Response;
          }(r4) ? "function" == typeof WebAssembly.instantiateStreaming ? function(t5) {
            return (n5) => WebAssembly.instantiateStreaming(t5, n5);
          }(r4) : function(t5) {
            return async (n5) => {
              const e4 = await t5.arrayBuffer();
              return WebAssembly.instantiate(e4, n5);
            };
          }(r4) : function(t5) {
            return (n5) => WebAssembly.instantiate(t5, n5);
          }(r4);
        }
        return l = new Promise((t5, n5) => {
          r3 = t5, a3 = n5;
        }), function(t5, n5, e4, r4) {
          i2.default({ print: n5, instantiateWasm: (n6, e5) => {
            if ("undefined" == typeof performance) {
              const t6 = () => Date.now();
              n6.env.emscripten_get_now = t6, n6.wasi_snapshot_preview1.emscripten_get_now = t6;
            }
            return t5(n6).then((t6) => e5(t6.instance), r4), {};
          } }).then((t6) => {
            o = t6, e4();
          });
        }(n4, e3, r3, a3), l;
      }, n3.createOnigString = function(t4) {
        return new s(t4);
      }, n3.createOnigScanner = function(t4) {
        return new u2(t4);
      }, n3.setDefaultDebugCall = function(t4) {
        a2 = t4;
      };
    }, 418: (t3) => {
      var n3 = ("undefined" != typeof document && document.currentScript && document.currentScript.src, function(t4) {
        var n4, e2, r2 = void 0 !== (t4 = t4 || {}) ? t4 : {};
        r2.ready = new Promise(function(t5, r3) {
          n4 = t5, e2 = r3;
        });
        var i2, o = {};
        for (i2 in r2)
          r2.hasOwnProperty(i2) && (o[i2] = r2[i2]);
        var a2, u2 = false, l = "";
        function p2(t5) {
          return r2.locateFile ? r2.locateFile(t5, l) : l + t5;
        }
        a2 = function(t5) {
          var n5;
          return "function" == typeof readbuffer ? new Uint8Array(readbuffer(t5)) : (v2("object" == typeof (n5 = read(t5, "binary"))), n5);
        }, "undefined" != typeof scriptArgs ? scriptArgs : void 0 !== arguments && arguments, "undefined" != typeof onig_print && ("undefined" == typeof console && (console = {}), console.log = onig_print, console.warn = console.error = "undefined" != typeof printErr ? printErr : onig_print);
        var h2 = r2.print || console.log.bind(console), d2 = r2.printErr || console.warn.bind(console);
        for (i2 in o)
          o.hasOwnProperty(i2) && (r2[i2] = o[i2]);
        o = null, r2.arguments && r2.arguments, r2.thisProgram && r2.thisProgram, r2.quit && r2.quit;
        var g, _4;
        r2.wasmBinary && (g = r2.wasmBinary), r2.noExitRuntime, "object" != typeof WebAssembly && z2("no native wasm support detected");
        var y2 = false;
        function v2(t5, n5) {
          t5 || z2("Assertion failed: " + n5);
        }
        var w2, S2, A2, b2 = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
        function O2(t5, n5, e3) {
          for (var r3 = n5 + e3, i3 = n5; t5[i3] && !(i3 >= r3); )
            ++i3;
          if (i3 - n5 > 16 && t5.subarray && b2)
            return b2.decode(t5.subarray(n5, i3));
          for (var o2 = ""; n5 < i3; ) {
            var a3 = t5[n5++];
            if (128 & a3) {
              var f2 = 63 & t5[n5++];
              if (192 != (224 & a3)) {
                var s = 63 & t5[n5++];
                if ((a3 = 224 == (240 & a3) ? (15 & a3) << 12 | f2 << 6 | s : (7 & a3) << 18 | f2 << 12 | s << 6 | 63 & t5[n5++]) < 65536)
                  o2 += String.fromCharCode(a3);
                else {
                  var u3 = a3 - 65536;
                  o2 += String.fromCharCode(55296 | u3 >> 10, 56320 | 1023 & u3);
                }
              } else
                o2 += String.fromCharCode((31 & a3) << 6 | f2);
            } else
              o2 += String.fromCharCode(a3);
          }
          return o2;
        }
        function U2(t5, n5) {
          return t5 ? O2(S2, t5, n5) : "";
        }
        function x2(t5, n5) {
          return t5 % n5 > 0 && (t5 += n5 - t5 % n5), t5;
        }
        function P2(t5) {
          w2 = t5, r2.HEAP8 = new Int8Array(t5), r2.HEAP16 = new Int16Array(t5), r2.HEAP32 = A2 = new Int32Array(t5), r2.HEAPU8 = S2 = new Uint8Array(t5), r2.HEAPU16 = new Uint16Array(t5), r2.HEAPU32 = new Uint32Array(t5), r2.HEAPF32 = new Float32Array(t5), r2.HEAPF64 = new Float64Array(t5);
        }
        "undefined" != typeof TextDecoder && new TextDecoder("utf-16le"), r2.INITIAL_MEMORY;
        var T2, R2 = [], E2 = [], M2 = [], L2 = [];
        function I2() {
          if (r2.preRun)
            for ("function" == typeof r2.preRun && (r2.preRun = [r2.preRun]); r2.preRun.length; )
              N2(r2.preRun.shift());
          $2(R2);
        }
        function D2() {
          $2(E2);
        }
        function W2() {
          $2(M2);
        }
        function C2() {
          if (r2.postRun)
            for ("function" == typeof r2.postRun && (r2.postRun = [r2.postRun]); r2.postRun.length; )
              k2(r2.postRun.shift());
          $2(L2);
        }
        function N2(t5) {
          R2.unshift(t5);
        }
        function k2(t5) {
          L2.unshift(t5);
        }
        E2.push({ func: function() {
          ut();
        } });
        var B2 = 0, j2 = null;
        function F2(t5) {
          B2++, r2.monitorRunDependencies && r2.monitorRunDependencies(B2);
        }
        function V2(t5) {
          if (B2--, r2.monitorRunDependencies && r2.monitorRunDependencies(B2), 0 == B2 && j2) {
            var n5 = j2;
            j2 = null, n5();
          }
        }
        function z2(t5) {
          r2.onAbort && r2.onAbort(t5), d2(t5 += ""), y2 = true, t5 = "abort(" + t5 + "). Build with -s ASSERTIONS=1 for more info.";
          var n5 = new WebAssembly.RuntimeError(t5);
          throw e2(n5), n5;
        }
        function q2(t5, n5) {
          return String.prototype.startsWith ? t5.startsWith(n5) : 0 === t5.indexOf(n5);
        }
        r2.preloadedImages = {}, r2.preloadedAudios = {};
        var Y2 = "data:application/octet-stream;base64,";
        function G2(t5) {
          return q2(t5, Y2);
        }
        var J2, K2 = "onig.wasm";
        function Q2(t5) {
          try {
            if (t5 == K2 && g)
              return new Uint8Array(g);
            if (a2)
              return a2(t5);
            throw "both async and sync fetching of the wasm failed";
          } catch (t6) {
            z2(t6);
          }
        }
        function X() {
          return g || !u2 || "function" != typeof fetch ? Promise.resolve().then(function() {
            return Q2(K2);
          }) : fetch(K2, { credentials: "same-origin" }).then(function(t5) {
            if (!t5.ok)
              throw "failed to load wasm binary file at '" + K2 + "'";
            return t5.arrayBuffer();
          }).catch(function() {
            return Q2(K2);
          });
        }
        function Z2() {
          var t5 = { env: st, wasi_snapshot_preview1: st };
          function n5(t6, n6) {
            var e3 = t6.exports;
            r2.asm = e3, P2((_4 = r2.asm.memory).buffer), T2 = r2.asm.__indirect_function_table, V2();
          }
          function i3(t6) {
            n5(t6.instance);
          }
          function o2(n6) {
            return X().then(function(n7) {
              return WebAssembly.instantiate(n7, t5);
            }).then(n6, function(t6) {
              d2("failed to asynchronously prepare wasm: " + t6), z2(t6);
            });
          }
          if (F2(), r2.instantiateWasm)
            try {
              return r2.instantiateWasm(t5, n5);
            } catch (t6) {
              return d2("Module.instantiateWasm callback failed with error: " + t6), false;
            }
          return (g || "function" != typeof WebAssembly.instantiateStreaming || G2(K2) || "function" != typeof fetch ? o2(i3) : fetch(K2, { credentials: "same-origin" }).then(function(n6) {
            return WebAssembly.instantiateStreaming(n6, t5).then(i3, function(t6) {
              return d2("wasm streaming compile failed: " + t6), d2("falling back to ArrayBuffer instantiation"), o2(i3);
            });
          })).catch(e2), {};
        }
        function $2(t5) {
          for (; t5.length > 0; ) {
            var n5 = t5.shift();
            if ("function" != typeof n5) {
              var e3 = n5.func;
              "number" == typeof e3 ? void 0 === n5.arg ? T2.get(e3)() : T2.get(e3)(n5.arg) : e3(void 0 === n5.arg ? null : n5.arg);
            } else
              n5(r2);
          }
        }
        function tt(t5, n5, e3) {
          S2.copyWithin(t5, n5, n5 + e3);
        }
        function nt() {
          return S2.length;
        }
        function et(t5) {
          try {
            return _4.grow(t5 - w2.byteLength + 65535 >>> 16), P2(_4.buffer), 1;
          } catch (t6) {
          }
        }
        function rt(t5) {
          var n5 = nt(), e3 = 2147483648;
          if (t5 > e3)
            return false;
          for (var r3 = 1; r3 <= 4; r3 *= 2) {
            var i3 = n5 * (1 + 0.2 / r3);
            if (i3 = Math.min(i3, t5 + 100663296), et(Math.min(e3, x2(Math.max(t5, i3), 65536))))
              return true;
          }
          return false;
        }
        G2(K2) || (K2 = p2(K2)), J2 = "undefined" != typeof dateNow ? dateNow : function() {
          return performance.now();
        };
        var it = { mappings: {}, buffers: [null, [], []], printChar: function(t5, n5) {
          var e3 = it.buffers[t5];
          0 === n5 || 10 === n5 ? ((1 === t5 ? h2 : d2)(O2(e3, 0)), e3.length = 0) : e3.push(n5);
        }, varargs: void 0, get: function() {
          return it.varargs += 4, A2[it.varargs - 4 >> 2];
        }, getStr: function(t5) {
          return U2(t5);
        }, get64: function(t5, n5) {
          return t5;
        } };
        function ot(t5, n5, e3, r3) {
          for (var i3 = 0, o2 = 0; o2 < e3; o2++) {
            for (var a3 = A2[n5 + 8 * o2 >> 2], f2 = A2[n5 + (8 * o2 + 4) >> 2], s = 0; s < f2; s++)
              it.printChar(t5, S2[a3 + s]);
            i3 += f2;
          }
          return A2[r3 >> 2] = i3, 0;
        }
        function at(t5) {
        }
        var ft, st = { emscripten_get_now: J2, emscripten_memcpy_big: tt, emscripten_resize_heap: rt, fd_write: ot, setTempRet0: at }, ut = (Z2(), r2.___wasm_call_ctors = function() {
          return (ut = r2.___wasm_call_ctors = r2.asm.__wasm_call_ctors).apply(null, arguments);
        });
        function ct(t5) {
          function e3() {
            ft || (ft = true, r2.calledRun = true, y2 || (D2(), W2(), n4(r2), r2.onRuntimeInitialized && r2.onRuntimeInitialized(), C2()));
          }
          B2 > 0 || (I2(), B2 > 0 || (r2.setStatus ? (r2.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              r2.setStatus("");
            }, 1), e3();
          }, 1)) : e3()));
        }
        if (r2.___errno_location = function() {
          return (r2.___errno_location = r2.asm.__errno_location).apply(null, arguments);
        }, r2._omalloc = function() {
          return (r2._omalloc = r2.asm.omalloc).apply(null, arguments);
        }, r2._ofree = function() {
          return (r2._ofree = r2.asm.ofree).apply(null, arguments);
        }, r2._getLastOnigError = function() {
          return (r2._getLastOnigError = r2.asm.getLastOnigError).apply(null, arguments);
        }, r2._createOnigScanner = function() {
          return (r2._createOnigScanner = r2.asm.createOnigScanner).apply(null, arguments);
        }, r2._freeOnigScanner = function() {
          return (r2._freeOnigScanner = r2.asm.freeOnigScanner).apply(null, arguments);
        }, r2._findNextOnigScannerMatch = function() {
          return (r2._findNextOnigScannerMatch = r2.asm.findNextOnigScannerMatch).apply(null, arguments);
        }, r2._findNextOnigScannerMatchDbg = function() {
          return (r2._findNextOnigScannerMatchDbg = r2.asm.findNextOnigScannerMatchDbg).apply(null, arguments);
        }, r2.stackSave = function() {
          return (r2.stackSave = r2.asm.stackSave).apply(null, arguments);
        }, r2.stackRestore = function() {
          return (r2.stackRestore = r2.asm.stackRestore).apply(null, arguments);
        }, r2.stackAlloc = function() {
          return (r2.stackAlloc = r2.asm.stackAlloc).apply(null, arguments);
        }, r2.dynCall_jiji = function() {
          return (r2.dynCall_jiji = r2.asm.dynCall_jiji).apply(null, arguments);
        }, r2.UTF8ToString = U2, j2 = function t5() {
          ft || ct(), ft || (j2 = t5);
        }, r2.run = ct, r2.preInit)
          for ("function" == typeof r2.preInit && (r2.preInit = [r2.preInit]); r2.preInit.length > 0; )
            r2.preInit.pop()();
        return ct(), t4.ready;
      });
      t3.exports = n3;
    } }, n2 = {}, function e2(r2) {
      var i2 = n2[r2];
      if (void 0 !== i2)
        return i2.exports;
      var o = n2[r2] = { exports: {} };
      return t2[r2].call(o.exports, o, o.exports, e2), o.exports;
    }(770);
    var t2, n2;
  });
})(main$1);
var main = { exports: {} };
(function(module2, exports) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    return function(e2) {
      var t2 = {};
      function n2(r2) {
        if (t2[r2])
          return t2[r2].exports;
        var i2 = t2[r2] = { i: r2, l: false, exports: {} };
        return e2[r2].call(i2.exports, i2, i2.exports, n2), i2.l = true, i2.exports;
      }
      return n2.m = e2, n2.c = t2, n2.d = function(e3, t3, r2) {
        n2.o(e3, t3) || Object.defineProperty(e3, t3, { enumerable: true, get: r2 });
      }, n2.r = function(e3) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
      }, n2.t = function(e3, t3) {
        if (1 & t3 && (e3 = n2(e3)), 8 & t3)
          return e3;
        if (4 & t3 && "object" == typeof e3 && e3 && e3.__esModule)
          return e3;
        var r2 = /* @__PURE__ */ Object.create(null);
        if (n2.r(r2), Object.defineProperty(r2, "default", { enumerable: true, value: e3 }), 2 & t3 && "string" != typeof e3)
          for (var i2 in e3)
            n2.d(r2, i2, function(t4) {
              return e3[t4];
            }.bind(null, i2));
        return r2;
      }, n2.n = function(e3) {
        var t3 = e3 && e3.__esModule ? function() {
          return e3.default;
        } : function() {
          return e3;
        };
        return n2.d(t3, "a", t3), t3;
      }, n2.o = function(e3, t3) {
        return Object.prototype.hasOwnProperty.call(e3, t3);
      }, n2.p = "", n2(n2.s = 3);
    }([function(e2, t2, n2) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var r2 = n2(1), i2 = n2(5), o = n2(6), s = n2(2), a2 = "undefined" == typeof performance ? function() {
        return Date.now();
      } : function() {
        return performance.now();
      };
      t2.createGrammar = function(e3, t3, n3, r3, i3, o2) {
        return new v2(e3, t3, n3, r3, i3, o2);
      };
      var c2 = function(e3) {
        this.scopeName = e3;
      };
      t2.FullScopeDependency = c2;
      var u2 = function() {
        function e3(e4, t3) {
          this.scopeName = e4, this.include = t3;
        }
        return e3.prototype.toKey = function() {
          return this.scopeName + "#" + this.include;
        }, e3;
      }();
      t2.PartialScopeDependency = u2;
      var l = function() {
        function e3() {
          this.full = [], this.partial = [], this.visitedRule = /* @__PURE__ */ new Set(), this._seenFull = /* @__PURE__ */ new Set(), this._seenPartial = /* @__PURE__ */ new Set();
        }
        return e3.prototype.add = function(e4) {
          e4 instanceof c2 ? this._seenFull.has(e4.scopeName) || (this._seenFull.add(e4.scopeName), this.full.push(e4)) : this._seenPartial.has(e4.toKey()) || (this._seenPartial.add(e4.toKey()), this.partial.push(e4));
        }, e3;
      }();
      function h2(e3, t3, n3, i3, o2) {
        for (var s2 = 0, a3 = i3; s2 < a3.length; s2++) {
          var l2 = a3[s2];
          if (!e3.visitedRule.has(l2)) {
            e3.visitedRule.add(l2);
            var d3 = l2.repository ? r2.mergeObjects({}, o2, l2.repository) : o2;
            Array.isArray(l2.patterns) && h2(e3, t3, n3, l2.patterns, d3);
            var g2 = l2.include;
            if (g2)
              if ("$base" === g2 || g2 === t3.scopeName)
                f2(e3, t3, t3);
              else if ("$self" === g2 || g2 === n3.scopeName)
                f2(e3, t3, n3);
              else if ("#" === g2.charAt(0))
                p2(e3, t3, n3, g2.substring(1), d3);
              else {
                var m3 = g2.indexOf("#");
                if (m3 >= 0) {
                  var _5 = g2.substring(0, m3), y3 = g2.substring(m3 + 1);
                  _5 === t3.scopeName ? p2(e3, t3, t3, y3, d3) : _5 === n3.scopeName ? p2(e3, t3, n3, y3, d3) : e3.add(new u2(_5, g2.substring(m3 + 1)));
                } else
                  e3.add(new c2(g2));
              }
          }
        }
      }
      function p2(e3, t3, n3, r3, i3) {
        (void 0 === i3 && (i3 = n3.repository), i3 && i3[r3]) && h2(e3, t3, n3, [i3[r3]], i3);
      }
      function f2(e3, t3, n3) {
        if (n3.patterns && Array.isArray(n3.patterns) && h2(e3, t3, n3, n3.patterns, n3.repository), n3.injections) {
          var r3 = [];
          for (var i3 in n3.injections)
            r3.push(n3.injections[i3]);
          h2(e3, t3, n3, r3, n3.repository);
        }
      }
      function d2(e3, t3) {
        if (!e3)
          return false;
        if (e3 === t3)
          return true;
        var n3 = t3.length;
        return e3.length > n3 && e3.substr(0, n3) === t3 && "." === e3[n3];
      }
      function g(e3, t3) {
        if (t3.length < e3.length)
          return false;
        var n3 = 0;
        return e3.every(function(e4) {
          for (var r3 = n3; r3 < t3.length; r3++)
            if (d2(t3[r3], e4))
              return n3 = r3 + 1, true;
          return false;
        });
      }
      function m2(e3, t3, n3, r3, s2) {
        for (var a3 = o.createMatchers(t3, g), c3 = i2.RuleFactory.getCompiledRuleId(n3, r3, s2.repository), u3 = 0, l2 = a3; u3 < l2.length; u3++) {
          var h3 = l2[u3];
          e3.push({ matcher: h3.matcher, ruleId: c3, grammar: s2, priority: h3.priority });
        }
      }
      t2.ScopeDependencyCollector = l, t2.collectSpecificDependencies = p2, t2.collectDependencies = f2;
      var _4 = function(e3, t3, n3, r3) {
        this.scopeName = e3, this.languageId = t3, this.tokenType = n3, this.themeData = r3;
      };
      t2.ScopeMetadata = _4;
      var y2 = function() {
        function e3(t3, n3, r3) {
          if (this._initialLanguage = t3, this._themeProvider = n3, this._cache = /* @__PURE__ */ new Map(), this._defaultMetaData = new _4("", this._initialLanguage, 0, [this._themeProvider.getDefaults()]), this._embeddedLanguages = /* @__PURE__ */ Object.create(null), r3)
            for (var i3 = Object.keys(r3), o2 = 0, s2 = i3.length; o2 < s2; o2++) {
              var a3 = i3[o2], c3 = r3[a3];
              "number" == typeof c3 && 0 !== c3 ? this._embeddedLanguages[a3] = c3 : console.warn("Invalid embedded language found at scope " + a3 + ": <<" + c3 + ">>");
            }
          var u3 = Object.keys(this._embeddedLanguages).map(function(t4) {
            return e3._escapeRegExpCharacters(t4);
          });
          0 === u3.length ? this._embeddedLanguagesRegex = null : (u3.sort(), u3.reverse(), this._embeddedLanguagesRegex = new RegExp("^((" + u3.join(")|(") + "))($|\\.)", ""));
        }
        return e3.prototype.onDidChangeTheme = function() {
          this._cache = /* @__PURE__ */ new Map(), this._defaultMetaData = new _4("", this._initialLanguage, 0, [this._themeProvider.getDefaults()]);
        }, e3.prototype.getDefaultMetadata = function() {
          return this._defaultMetaData;
        }, e3._escapeRegExpCharacters = function(e4) {
          return e4.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
        }, e3.prototype.getMetadataForScope = function(t3) {
          if (null === t3)
            return e3._NULL_SCOPE_METADATA;
          var n3 = this._cache.get(t3);
          return n3 || (n3 = this._doGetMetadataForScope(t3), this._cache.set(t3, n3), n3);
        }, e3.prototype._doGetMetadataForScope = function(e4) {
          var t3 = this._scopeToLanguage(e4), n3 = this._toStandardTokenType(e4), r3 = this._themeProvider.themeMatch(e4);
          return new _4(e4, t3, n3, r3);
        }, e3.prototype._scopeToLanguage = function(e4) {
          if (!e4)
            return 0;
          if (!this._embeddedLanguagesRegex)
            return 0;
          var t3 = e4.match(this._embeddedLanguagesRegex);
          if (!t3)
            return 0;
          var n3 = this._embeddedLanguages[t3[1]] || 0;
          return n3 || 0;
        }, e3.prototype._toStandardTokenType = function(t3) {
          var n3 = t3.match(e3.STANDARD_TOKEN_TYPE_REGEXP);
          if (!n3)
            return 0;
          switch (n3[1]) {
            case "comment":
              return 1;
            case "string":
              return 2;
            case "regex":
              return 4;
            case "meta.embedded":
              return 8;
          }
          throw new Error("Unexpected match for standard token type!");
        }, e3._NULL_SCOPE_METADATA = new _4("", 0, 0, null), e3.STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/, e3;
      }(), v2 = function() {
        function e3(e4, t3, n3, r3, i3, s2) {
          if (this._scopeMetadataProvider = new y2(t3, i3, n3), this._onigLib = s2, this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = i3, this._grammar = C2(e4, null), this._injections = null, this._tokenTypeMatchers = [], r3)
            for (var a3 = 0, c3 = Object.keys(r3); a3 < c3.length; a3++)
              for (var u3 = c3[a3], l2 = 0, h3 = o.createMatchers(u3, g); l2 < h3.length; l2++) {
                var p3 = h3[l2];
                this._tokenTypeMatchers.push({ matcher: p3.matcher, type: r3[u3] });
              }
        }
        return e3.prototype.dispose = function() {
          for (var e4 = 0, t3 = this._ruleId2desc; e4 < t3.length; e4++) {
            var n3 = t3[e4];
            n3 && n3.dispose();
          }
        }, e3.prototype.createOnigScanner = function(e4) {
          return this._onigLib.createOnigScanner(e4);
        }, e3.prototype.createOnigString = function(e4) {
          return this._onigLib.createOnigString(e4);
        }, e3.prototype.onDidChangeTheme = function() {
          this._scopeMetadataProvider.onDidChangeTheme();
        }, e3.prototype.getMetadataForScope = function(e4) {
          return this._scopeMetadataProvider.getMetadataForScope(e4);
        }, e3.prototype.getInjections = function() {
          var e4 = this;
          if (null === this._injections) {
            this._injections = [];
            var t3 = this._grammar.injections;
            if (t3)
              for (var n3 in t3)
                m2(this._injections, n3, t3[n3], this, this._grammar);
            if (this._grammarRepository) {
              var r3 = this._grammarRepository.injections(this._grammar.scopeName);
              r3 && r3.forEach(function(t4) {
                var n4 = e4.getExternalGrammar(t4);
                if (n4) {
                  var r4 = n4.injectionSelector;
                  r4 && m2(e4._injections, r4, n4, e4, n4);
                }
              });
            }
            this._injections.sort(function(e5, t4) {
              return e5.priority - t4.priority;
            });
          }
          return this._injections;
        }, e3.prototype.registerRule = function(e4) {
          var t3 = ++this._lastRuleId, n3 = e4(t3);
          return this._ruleId2desc[t3] = n3, n3;
        }, e3.prototype.getRule = function(e4) {
          return this._ruleId2desc[e4];
        }, e3.prototype.getExternalGrammar = function(e4, t3) {
          if (this._includedGrammars[e4])
            return this._includedGrammars[e4];
          if (this._grammarRepository) {
            var n3 = this._grammarRepository.lookup(e4);
            if (n3)
              return this._includedGrammars[e4] = C2(n3, t3 && t3.$base), this._includedGrammars[e4];
          }
          return null;
        }, e3.prototype.tokenizeLine = function(e4, t3) {
          var n3 = this._tokenize(e4, t3, false);
          return { tokens: n3.lineTokens.getResult(n3.ruleStack, n3.lineLength), ruleStack: n3.ruleStack };
        }, e3.prototype.tokenizeLine2 = function(e4, t3) {
          var n3 = this._tokenize(e4, t3, true);
          return { tokens: n3.lineTokens.getBinaryResult(n3.ruleStack, n3.lineLength), ruleStack: n3.ruleStack };
        }, e3.prototype._tokenize = function(e4, t3, n3) {
          var r3;
          if (-1 === this._rootId && (this._rootId = i2.RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository)), t3 && t3 !== I2.NULL)
            r3 = false, t3.reset();
          else {
            r3 = true;
            var o2 = this._scopeMetadataProvider.getDefaultMetadata(), s2 = o2.themeData[0], a3 = P2.set(0, o2.languageId, o2.tokenType, s2.fontStyle, s2.foreground, s2.background), c3 = this.getRule(this._rootId).getName(null, null), u3 = this._scopeMetadataProvider.getMetadataForScope(c3), l2 = x2.mergeMetadata(a3, null, u3), h3 = new x2(null, null === c3 ? "unknown" : c3, l2);
            t3 = new I2(null, this._rootId, -1, -1, false, null, h3, h3);
          }
          e4 += "\n";
          var p3 = this.createOnigString(e4), f3 = p3.content.length, d3 = new T2(n3, e4, this._tokenTypeMatchers), g2 = S2(this, p3, r3, 0, t3, d3, true);
          return b2(p3), { lineLength: f3, lineTokens: d3, ruleStack: g2 };
        }, e3;
      }();
      function b2(e3) {
        "function" == typeof e3.dispose && e3.dispose();
      }
      function C2(e3, t3) {
        return (e3 = r2.clone(e3)).repository = e3.repository || {}, e3.repository.$self = { $vscodeTextmateLocation: e3.$vscodeTextmateLocation, patterns: e3.patterns, name: e3.scopeName }, e3.repository.$base = t3 || e3.repository.$self, e3;
      }
      function w2(e3, t3, n3, r3, i3, o2, s2) {
        if (0 !== o2.length) {
          for (var a3 = t3.content, c3 = Math.min(o2.length, s2.length), u3 = [], l2 = s2[0].end, h3 = 0; h3 < c3; h3++) {
            var p3 = o2[h3];
            if (null !== p3) {
              var f3 = s2[h3];
              if (0 !== f3.length) {
                if (f3.start > l2)
                  break;
                for (; u3.length > 0 && u3[u3.length - 1].endPos <= f3.start; )
                  i3.produceFromScopes(u3[u3.length - 1].scopes, u3[u3.length - 1].endPos), u3.pop();
                if (u3.length > 0 ? i3.produceFromScopes(u3[u3.length - 1].scopes, f3.start) : i3.produce(r3, f3.start), p3.retokenizeCapturedWithRuleId) {
                  var d3 = p3.getName(a3, s2), g2 = r3.contentNameScopesList.push(e3, d3), m3 = p3.getContentName(a3, s2), _5 = g2.push(e3, m3), y3 = r3.push(p3.retokenizeCapturedWithRuleId, f3.start, -1, false, null, g2, _5), v3 = e3.createOnigString(a3.substring(0, f3.end));
                  S2(e3, v3, n3 && 0 === f3.start, f3.start, y3, i3, false), b2(v3);
                } else {
                  var C3 = p3.getName(a3, s2);
                  if (null !== C3) {
                    var w3 = (u3.length > 0 ? u3[u3.length - 1].scopes : r3.contentNameScopesList).push(e3, C3);
                    u3.push(new A2(w3, f3.end));
                  }
                }
              }
            }
          }
          for (; u3.length > 0; )
            i3.produceFromScopes(u3[u3.length - 1].scopes, u3[u3.length - 1].endPos), u3.pop();
        }
      }
      function k2(e3) {
        for (var t3 = [], n3 = 0, r3 = e3.rules.length; n3 < r3; n3++)
          t3.push("   - " + e3.rules[n3] + ": " + e3.debugRegExps[n3]);
        return t3.join("\n");
      }
      function R2(e3, t3, n3, r3, i3, o2) {
        var c3 = function(e4, t4, n4, r4, i4, o3) {
          var c4 = i4.getRule(e4), u4 = c4.compile(e4, i4.endRule, n4, r4 === o3), l3 = 0;
          s.DebugFlags.InDebugMode && (l3 = a2());
          var h4 = u4.scanner.findNextMatchSync(t4, r4);
          if (s.DebugFlags.InDebugMode) {
            var p4 = a2() - l3;
            p4 > 5 && console.warn("Rule " + c4.debugName + " (" + c4.id + ") matching took " + p4 + " against '" + t4 + "'"), h4 && console.log("matched rule id: " + u4.rules[h4.index] + " from " + h4.captureIndices[0].start + " to " + h4.captureIndices[0].end);
          }
          return h4 ? { captureIndices: h4.captureIndices, matchedRuleId: u4.rules[h4.index] } : null;
        }(e3, t3, n3, r3, i3, o2), u3 = e3.getInjections();
        if (0 === u3.length)
          return c3;
        var l2 = function(e4, t4, n4, r4, i4, o3, a3) {
          for (var c4, u4 = Number.MAX_VALUE, l3 = null, h4 = 0, p4 = o3.contentNameScopesList.generateScopes(), f3 = 0, d3 = e4.length; f3 < d3; f3++) {
            var g2 = e4[f3];
            if (g2.matcher(p4)) {
              var m3 = t4.getRule(g2.ruleId).compile(t4, null, r4, i4 === a3), _5 = m3.scanner.findNextMatchSync(n4, i4);
              if (s.DebugFlags.InDebugMode && (console.log("  scanning for injections"), console.log(k2(m3))), _5) {
                var y3 = _5.captureIndices[0].start;
                if (!(y3 >= u4) && (u4 = y3, l3 = _5.captureIndices, c4 = m3.rules[_5.index], h4 = g2.priority, u4 === i4))
                  break;
              }
            }
          }
          return l3 ? { priorityMatch: -1 === h4, captureIndices: l3, matchedRuleId: c4 } : null;
        }(u3, e3, t3, n3, r3, i3, o2);
        if (!l2)
          return c3;
        if (!c3)
          return l2;
        var h3 = c3.captureIndices[0].start, p3 = l2.captureIndices[0].start;
        return p3 < h3 || l2.priorityMatch && p3 === h3 ? l2 : c3;
      }
      function S2(e3, t3, n3, r3, o2, a3, c3) {
        var u3 = t3.content.length, l2 = false, h3 = -1;
        if (c3) {
          var p3 = function(e4, t4, n4, r4, o3, a4) {
            for (var c4 = o3.beginRuleCapturedEOL ? 0 : -1, u4 = [], l3 = o3; l3; l3 = l3.pop()) {
              var h4 = l3.getRule(e4);
              h4 instanceof i2.BeginWhileRule && u4.push({ rule: h4, stack: l3 });
            }
            for (var p4 = u4.pop(); p4; p4 = u4.pop()) {
              var f4 = p4.rule.compileWhile(e4, p4.stack.endRule, n4, c4 === r4), d3 = f4.scanner.findNextMatchSync(t4, r4);
              if (s.DebugFlags.InDebugMode && (console.log("  scanning for while rule"), console.log(k2(f4))), !d3) {
                s.DebugFlags.InDebugMode && console.log("  popping " + p4.rule.debugName + " - " + p4.rule.debugWhileRegExp), o3 = p4.stack.pop();
                break;
              }
              if (-2 !== f4.rules[d3.index]) {
                o3 = p4.stack.pop();
                break;
              }
              d3.captureIndices && d3.captureIndices.length && (a4.produce(p4.stack, d3.captureIndices[0].start), w2(e4, t4, n4, p4.stack, a4, p4.rule.whileCaptures, d3.captureIndices), a4.produce(p4.stack, d3.captureIndices[0].end), c4 = d3.captureIndices[0].end, d3.captureIndices[0].end > r4 && (r4 = d3.captureIndices[0].end, n4 = false));
            }
            return { stack: o3, linePos: r4, anchorPosition: c4, isFirstLine: n4 };
          }(e3, t3, n3, r3, o2, a3);
          o2 = p3.stack, r3 = p3.linePos, n3 = p3.isFirstLine, h3 = p3.anchorPosition;
        }
        for (; !l2; )
          f3();
        function f3() {
          s.DebugFlags.InDebugMode && (console.log(""), console.log("@@scanNext " + r3 + ": |" + t3.content.substr(r3).replace(/\n$/, "\\n") + "|"));
          var c4 = R2(e3, t3, n3, r3, o2, h3);
          if (!c4)
            return s.DebugFlags.InDebugMode && console.log("  no more matches."), a3.produce(o2, u3), void (l2 = true);
          var p4 = c4.captureIndices, f4 = c4.matchedRuleId, d3 = !!(p4 && p4.length > 0) && p4[0].end > r3;
          if (-1 === f4) {
            var g2 = o2.getRule(e3);
            s.DebugFlags.InDebugMode && console.log("  popping " + g2.debugName + " - " + g2.debugEndRegExp), a3.produce(o2, p4[0].start), o2 = o2.setContentNameScopesList(o2.nameScopesList), w2(e3, t3, n3, o2, a3, g2.endCaptures, p4), a3.produce(o2, p4[0].end);
            var m3 = o2;
            if (o2 = o2.pop(), h3 = m3.getAnchorPos(), !d3 && m3.getEnterPos() === r3)
              return s.DebugFlags.InDebugMode && console.error("[1] - Grammar is in an endless loop - Grammar pushed & popped a rule without advancing"), o2 = m3, a3.produce(o2, u3), void (l2 = true);
          } else {
            var _5 = e3.getRule(f4);
            a3.produce(o2, p4[0].start);
            var y3 = o2, v3 = _5.getName(t3.content, p4), b3 = o2.contentNameScopesList.push(e3, v3);
            if (o2 = o2.push(f4, r3, h3, p4[0].end === u3, null, b3, b3), _5 instanceof i2.BeginEndRule) {
              var C3 = _5;
              s.DebugFlags.InDebugMode && console.log("  pushing " + C3.debugName + " - " + C3.debugBeginRegExp), w2(e3, t3, n3, o2, a3, C3.beginCaptures, p4), a3.produce(o2, p4[0].end), h3 = p4[0].end;
              var k3 = C3.getContentName(t3.content, p4), S3 = b3.push(e3, k3);
              if (o2 = o2.setContentNameScopesList(S3), C3.endHasBackReferences && (o2 = o2.setEndRule(C3.getEndWithResolvedBackReferences(t3.content, p4))), !d3 && y3.hasSameRuleAs(o2))
                return s.DebugFlags.InDebugMode && console.error("[2] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), o2 = o2.pop(), a3.produce(o2, u3), void (l2 = true);
            } else if (_5 instanceof i2.BeginWhileRule) {
              C3 = _5;
              s.DebugFlags.InDebugMode && console.log("  pushing " + C3.debugName), w2(e3, t3, n3, o2, a3, C3.beginCaptures, p4), a3.produce(o2, p4[0].end), h3 = p4[0].end;
              k3 = C3.getContentName(t3.content, p4), S3 = b3.push(e3, k3);
              if (o2 = o2.setContentNameScopesList(S3), C3.whileHasBackReferences && (o2 = o2.setEndRule(C3.getWhileWithResolvedBackReferences(t3.content, p4))), !d3 && y3.hasSameRuleAs(o2))
                return s.DebugFlags.InDebugMode && console.error("[3] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"), o2 = o2.pop(), a3.produce(o2, u3), void (l2 = true);
            } else {
              var P3 = _5;
              if (s.DebugFlags.InDebugMode && console.log("  matched " + P3.debugName + " - " + P3.debugMatchRegExp), w2(e3, t3, n3, o2, a3, P3.captures, p4), a3.produce(o2, p4[0].end), o2 = o2.pop(), !d3)
                return s.DebugFlags.InDebugMode && console.error("[4] - Grammar is in an endless loop - Grammar is not advancing, nor is it pushing/popping"), o2 = o2.safePop(), a3.produce(o2, u3), void (l2 = true);
            }
          }
          p4[0].end > r3 && (r3 = p4[0].end, n3 = false);
        }
        return o2;
      }
      t2.Grammar = v2;
      var P2 = function() {
        function e3() {
        }
        return e3.toBinaryStr = function(e4) {
          for (var t3 = e4.toString(2); t3.length < 32; )
            t3 = "0" + t3;
          return t3;
        }, e3.printMetadata = function(t3) {
          var n3 = e3.getLanguageId(t3), r3 = e3.getTokenType(t3), i3 = e3.getFontStyle(t3), o2 = e3.getForeground(t3), s2 = e3.getBackground(t3);
          console.log({ languageId: n3, tokenType: r3, fontStyle: i3, foreground: o2, background: s2 });
        }, e3.getLanguageId = function(e4) {
          return (255 & e4) >>> 0;
        }, e3.getTokenType = function(e4) {
          return (1792 & e4) >>> 8;
        }, e3.getFontStyle = function(e4) {
          return (14336 & e4) >>> 11;
        }, e3.getForeground = function(e4) {
          return (8372224 & e4) >>> 14;
        }, e3.getBackground = function(e4) {
          return (4286578688 & e4) >>> 23;
        }, e3.set = function(t3, n3, r3, i3, o2, s2) {
          var a3 = e3.getLanguageId(t3), c3 = e3.getTokenType(t3), u3 = e3.getFontStyle(t3), l2 = e3.getForeground(t3), h3 = e3.getBackground(t3);
          return 0 !== n3 && (a3 = n3), 0 !== r3 && (c3 = 8 === r3 ? 0 : r3), -1 !== i3 && (u3 = i3), 0 !== o2 && (l2 = o2), 0 !== s2 && (h3 = s2), (a3 << 0 | c3 << 8 | u3 << 11 | l2 << 14 | h3 << 23) >>> 0;
        }, e3;
      }();
      t2.StackElementMetadata = P2;
      var x2 = function() {
        function e3(e4, t3, n3) {
          this.parent = e4, this.scope = t3, this.metadata = n3;
        }
        return e3._equals = function(e4, t3) {
          for (; ; ) {
            if (e4 === t3)
              return true;
            if (!e4 && !t3)
              return true;
            if (!e4 || !t3)
              return false;
            if (e4.scope !== t3.scope || e4.metadata !== t3.metadata)
              return false;
            e4 = e4.parent, t3 = t3.parent;
          }
        }, e3.prototype.equals = function(t3) {
          return e3._equals(this, t3);
        }, e3._matchesScope = function(e4, t3, n3) {
          return t3 === e4 || e4.substring(0, n3.length) === n3;
        }, e3._matches = function(e4, t3) {
          if (null === t3)
            return true;
          for (var n3 = t3.length, r3 = 0, i3 = t3[r3], o2 = i3 + "."; e4; ) {
            if (this._matchesScope(e4.scope, i3, o2)) {
              if (++r3 === n3)
                return true;
              o2 = (i3 = t3[r3]) + ".";
            }
            e4 = e4.parent;
          }
          return false;
        }, e3.mergeMetadata = function(e4, t3, n3) {
          if (null === n3)
            return e4;
          var r3 = -1, i3 = 0, o2 = 0;
          if (null !== n3.themeData)
            for (var s2 = 0, a3 = n3.themeData.length; s2 < a3; s2++) {
              var c3 = n3.themeData[s2];
              if (this._matches(t3, c3.parentScopes)) {
                r3 = c3.fontStyle, i3 = c3.foreground, o2 = c3.background;
                break;
              }
            }
          return P2.set(e4, n3.languageId, n3.tokenType, r3, i3, o2);
        }, e3._push = function(t3, n3, r3) {
          for (var i3 = 0, o2 = r3.length; i3 < o2; i3++) {
            var s2 = r3[i3], a3 = n3.getMetadataForScope(s2), c3 = e3.mergeMetadata(t3.metadata, t3, a3);
            t3 = new e3(t3, s2, c3);
          }
          return t3;
        }, e3.prototype.push = function(t3, n3) {
          return null === n3 ? this : n3.indexOf(" ") >= 0 ? e3._push(this, t3, n3.split(/ /g)) : e3._push(this, t3, [n3]);
        }, e3._generateScopes = function(e4) {
          for (var t3 = [], n3 = 0; e4; )
            t3[n3++] = e4.scope, e4 = e4.parent;
          return t3.reverse(), t3;
        }, e3.prototype.generateScopes = function() {
          return e3._generateScopes(this);
        }, e3;
      }();
      t2.ScopeListElement = x2;
      var I2 = function() {
        function e3(e4, t3, n3, r3, i3, o2, s2, a3) {
          this.parent = e4, this.depth = this.parent ? this.parent.depth + 1 : 1, this.ruleId = t3, this._enterPos = n3, this._anchorPos = r3, this.beginRuleCapturedEOL = i3, this.endRule = o2, this.nameScopesList = s2, this.contentNameScopesList = a3;
        }
        return e3._structuralEquals = function(e4, t3) {
          for (; ; ) {
            if (e4 === t3)
              return true;
            if (!e4 && !t3)
              return true;
            if (!e4 || !t3)
              return false;
            if (e4.depth !== t3.depth || e4.ruleId !== t3.ruleId || e4.endRule !== t3.endRule)
              return false;
            e4 = e4.parent, t3 = t3.parent;
          }
        }, e3._equals = function(e4, t3) {
          return e4 === t3 || !!this._structuralEquals(e4, t3) && e4.contentNameScopesList.equals(t3.contentNameScopesList);
        }, e3.prototype.clone = function() {
          return this;
        }, e3.prototype.equals = function(t3) {
          return null !== t3 && e3._equals(this, t3);
        }, e3._reset = function(e4) {
          for (; e4; )
            e4._enterPos = -1, e4._anchorPos = -1, e4 = e4.parent;
        }, e3.prototype.reset = function() {
          e3._reset(this);
        }, e3.prototype.pop = function() {
          return this.parent;
        }, e3.prototype.safePop = function() {
          return this.parent ? this.parent : this;
        }, e3.prototype.push = function(t3, n3, r3, i3, o2, s2, a3) {
          return new e3(this, t3, n3, r3, i3, o2, s2, a3);
        }, e3.prototype.getEnterPos = function() {
          return this._enterPos;
        }, e3.prototype.getAnchorPos = function() {
          return this._anchorPos;
        }, e3.prototype.getRule = function(e4) {
          return e4.getRule(this.ruleId);
        }, e3.prototype._writeString = function(e4, t3) {
          return this.parent && (t3 = this.parent._writeString(e4, t3)), e4[t3++] = "(" + this.ruleId + ", TODO-" + this.nameScopesList + ", TODO-" + this.contentNameScopesList + ")", t3;
        }, e3.prototype.toString = function() {
          var e4 = [];
          return this._writeString(e4, 0), "[" + e4.join(",") + "]";
        }, e3.prototype.setContentNameScopesList = function(e4) {
          return this.contentNameScopesList === e4 ? this : this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, e4);
        }, e3.prototype.setEndRule = function(t3) {
          return this.endRule === t3 ? this : new e3(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, t3, this.nameScopesList, this.contentNameScopesList);
        }, e3.prototype.hasSameRuleAs = function(e4) {
          return this.ruleId === e4.ruleId;
        }, e3.NULL = new e3(null, 0, 0, 0, false, null, null, null), e3;
      }();
      t2.StackElement = I2;
      var A2 = function(e3, t3) {
        this.scopes = e3, this.endPos = t3;
      };
      t2.LocalStackElement = A2;
      var T2 = function() {
        function e3(e4, t3, n3) {
          this._emitBinaryTokens = e4, this._tokenTypeOverrides = n3, s.DebugFlags.InDebugMode ? this._lineText = t3 : this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
        }
        return e3.prototype.produce = function(e4, t3) {
          this.produceFromScopes(e4.contentNameScopesList, t3);
        }, e3.prototype.produceFromScopes = function(e4, t3) {
          if (!(this._lastTokenEndIndex >= t3)) {
            if (this._emitBinaryTokens) {
              for (var n3 = e4.metadata, r3 = 0, i3 = this._tokenTypeOverrides; r3 < i3.length; r3++) {
                var o2 = i3[r3];
                o2.matcher(e4.generateScopes()) && (n3 = P2.set(n3, 0, L2(o2.type), -1, 0, 0));
              }
              return this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === n3 || (this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(n3)), void (this._lastTokenEndIndex = t3);
            }
            var a3 = e4.generateScopes();
            if (s.DebugFlags.InDebugMode) {
              console.log("  token: |" + this._lineText.substring(this._lastTokenEndIndex, t3).replace(/\n$/, "\\n") + "|");
              for (var c3 = 0; c3 < a3.length; c3++)
                console.log("      * " + a3[c3]);
            }
            this._tokens.push({ startIndex: this._lastTokenEndIndex, endIndex: t3, scopes: a3 }), this._lastTokenEndIndex = t3;
          }
        }, e3.prototype.getResult = function(e4, t3) {
          return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === t3 - 1 && this._tokens.pop(), 0 === this._tokens.length && (this._lastTokenEndIndex = -1, this.produce(e4, t3), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
        }, e3.prototype.getBinaryResult = function(e4, t3) {
          this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === t3 - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), 0 === this._binaryTokens.length && (this._lastTokenEndIndex = -1, this.produce(e4, t3), this._binaryTokens[this._binaryTokens.length - 2] = 0);
          for (var n3 = new Uint32Array(this._binaryTokens.length), r3 = 0, i3 = this._binaryTokens.length; r3 < i3; r3++)
            n3[r3] = this._binaryTokens[r3];
          return n3;
        }, e3;
      }();
      function L2(e3) {
        switch (e3) {
          case 4:
            return 4;
          case 2:
            return 2;
          case 1:
            return 1;
          case 0:
          default:
            return 8;
        }
      }
    }, function(e2, t2, n2) {
      function r2(e3) {
        return Array.isArray(e3) ? function(e4) {
          for (var t3 = [], n3 = 0, i3 = e4.length; n3 < i3; n3++)
            t3[n3] = r2(e4[n3]);
          return t3;
        }(e3) : "object" == typeof e3 ? function(e4) {
          var t3 = {};
          for (var n3 in e4)
            t3[n3] = r2(e4[n3]);
          return t3;
        }(e3) : e3;
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.clone = function(e3) {
        return r2(e3);
      }, t2.mergeObjects = function(e3) {
        for (var t3 = [], n3 = 1; n3 < arguments.length; n3++)
          t3[n3 - 1] = arguments[n3];
        return t3.forEach(function(t4) {
          for (var n4 in t4)
            e3[n4] = t4[n4];
        }), e3;
      }, t2.basename = function e3(t3) {
        var n3 = ~t3.lastIndexOf("/") || ~t3.lastIndexOf("\\");
        return 0 === n3 ? t3 : ~n3 == t3.length - 1 ? e3(t3.substring(0, t3.length - 1)) : t3.substr(1 + ~n3);
      };
      var i2 = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/, o = function() {
        function e3() {
        }
        return e3.hasCaptures = function(e4) {
          return null !== e4 && i2.test(e4);
        }, e3.replaceCaptures = function(e4, t3, n3) {
          return e4.replace(i2, function(e5, r3, i3, o2) {
            var s = n3[parseInt(r3 || i3, 10)];
            if (!s)
              return e5;
            for (var a2 = t3.substring(s.start, s.end); "." === a2[0]; )
              a2 = a2.substring(1);
            switch (o2) {
              case "downcase":
                return a2.toLowerCase();
              case "upcase":
                return a2.toUpperCase();
              default:
                return a2;
            }
          });
        }, e3;
      }();
      t2.RegexSource = o;
    }, function(e2, t2, n2) {
      (function(e3) {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.DebugFlags = { InDebugMode: void 0 !== e3 && !!e3.env.VSCODE_TEXTMATE_DEBUG };
      }).call(this, n2(7));
    }, function(e2, t2, n2) {
      var r2 = this && this.__awaiter || function(e3, t3, n3, r3) {
        return new (n3 || (n3 = Promise))(function(i3, o2) {
          function s2(e4) {
            try {
              c3(r3.next(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function a3(e4) {
            try {
              c3(r3.throw(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function c3(e4) {
            var t4;
            e4.done ? i3(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
              e5(t4);
            })).then(s2, a3);
          }
          c3((r3 = r3.apply(e3, t3 || [])).next());
        });
      }, i2 = this && this.__generator || function(e3, t3) {
        var n3, r3, i3, o2, s2 = { label: 0, sent: function() {
          if (1 & i3[0])
            throw i3[1];
          return i3[1];
        }, trys: [], ops: [] };
        return o2 = { next: a3(0), throw: a3(1), return: a3(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
          return this;
        }), o2;
        function a3(o3) {
          return function(a4) {
            return function(o4) {
              if (n3)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n3 = 1, r3 && (i3 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i3 = r3.return) && i3.call(r3), 0) : r3.next) && !(i3 = i3.call(r3, o4[1])).done)
                    return i3;
                  switch (r3 = 0, i3 && (o4 = [2 & o4[0], i3.value]), o4[0]) {
                    case 0:
                    case 1:
                      i3 = o4;
                      break;
                    case 4:
                      return s2.label++, { value: o4[1], done: false };
                    case 5:
                      s2.label++, r3 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(i3 = s2.trys, (i3 = i3.length > 0 && i3[i3.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                        s2 = 0;
                        continue;
                      }
                      if (3 === o4[0] && (!i3 || o4[1] > i3[0] && o4[1] < i3[3])) {
                        s2.label = o4[1];
                        break;
                      }
                      if (6 === o4[0] && s2.label < i3[1]) {
                        s2.label = i3[1], i3 = o4;
                        break;
                      }
                      if (i3 && s2.label < i3[2]) {
                        s2.label = i3[2], s2.ops.push(o4);
                        break;
                      }
                      i3[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, s2);
                } catch (e4) {
                  o4 = [6, e4], r3 = 0;
                } finally {
                  n3 = i3 = 0;
                }
              if (5 & o4[0])
                throw o4[1];
              return { value: o4[0] ? o4[1] : void 0, done: true };
            }([o3, a4]);
          };
        }
      };
      Object.defineProperty(t2, "__esModule", { value: true });
      var o = n2(4), s = n2(8), a2 = n2(11), c2 = n2(0), u2 = function() {
        function e3(e4) {
          this._options = e4, this._syncRegistry = new o.SyncRegistry(a2.Theme.createFromRawTheme(e4.theme, e4.colorMap), e4.onigLib), this._ensureGrammarCache = /* @__PURE__ */ new Map();
        }
        return e3.prototype.dispose = function() {
          this._syncRegistry.dispose();
        }, e3.prototype.setTheme = function(e4, t3) {
          this._syncRegistry.setTheme(a2.Theme.createFromRawTheme(e4, t3));
        }, e3.prototype.getColorMap = function() {
          return this._syncRegistry.getColorMap();
        }, e3.prototype.loadGrammarWithEmbeddedLanguages = function(e4, t3, n3) {
          return this.loadGrammarWithConfiguration(e4, t3, { embeddedLanguages: n3 });
        }, e3.prototype.loadGrammarWithConfiguration = function(e4, t3, n3) {
          return this._loadGrammar(e4, t3, n3.embeddedLanguages, n3.tokenTypes);
        }, e3.prototype.loadGrammar = function(e4) {
          return this._loadGrammar(e4, 0, null, null);
        }, e3.prototype._doLoadSingleGrammar = function(e4) {
          return r2(this, void 0, void 0, function() {
            var t3, n3;
            return i2(this, function(r3) {
              switch (r3.label) {
                case 0:
                  return [4, this._options.loadGrammar(e4)];
                case 1:
                  return (t3 = r3.sent()) && (n3 = "function" == typeof this._options.getInjections ? this._options.getInjections(e4) : void 0, this._syncRegistry.addGrammar(t3, n3)), [2];
              }
            });
          });
        }, e3.prototype._loadSingleGrammar = function(e4) {
          return r2(this, void 0, void 0, function() {
            return i2(this, function(t3) {
              return this._ensureGrammarCache.has(e4) || this._ensureGrammarCache.set(e4, this._doLoadSingleGrammar(e4)), [2, this._ensureGrammarCache.get(e4)];
            });
          });
        }, e3.prototype._collectDependenciesForDep = function(e4, t3, n3) {
          var r3 = this._syncRegistry.lookup(n3.scopeName);
          if (r3) {
            n3 instanceof c2.FullScopeDependency ? c2.collectDependencies(t3, this._syncRegistry.lookup(e4), r3) : c2.collectSpecificDependencies(t3, this._syncRegistry.lookup(e4), r3, n3.include);
            var i3 = this._syncRegistry.injections(n3.scopeName);
            if (i3)
              for (var o2 = 0, s2 = i3; o2 < s2.length; o2++) {
                var a3 = s2[o2];
                t3.add(new c2.FullScopeDependency(a3));
              }
          } else if (n3.scopeName === e4)
            throw new Error("No grammar provided for <" + e4 + ">");
        }, e3.prototype._loadGrammar = function(e4, t3, n3, o2) {
          return r2(this, void 0, void 0, function() {
            var r3, s2, a3, u3, l, h2, p2, f2, d2, g, m2, _4, y2 = this;
            return i2(this, function(i3) {
              switch (i3.label) {
                case 0:
                  r3 = /* @__PURE__ */ new Set(), s2 = /* @__PURE__ */ new Set(), r3.add(e4), a3 = [new c2.FullScopeDependency(e4)], i3.label = 1;
                case 1:
                  return a3.length > 0 ? (u3 = a3, a3 = [], [4, Promise.all(u3.map(function(e5) {
                    return y2._loadSingleGrammar(e5.scopeName);
                  }))]) : [3, 3];
                case 2:
                  for (i3.sent(), l = new c2.ScopeDependencyCollector(), h2 = 0, p2 = u3; h2 < p2.length; h2++)
                    _4 = p2[h2], this._collectDependenciesForDep(e4, l, _4);
                  for (f2 = 0, d2 = l.full; f2 < d2.length; f2++)
                    _4 = d2[f2], r3.has(_4.scopeName) || (r3.add(_4.scopeName), a3.push(_4));
                  for (g = 0, m2 = l.partial; g < m2.length; g++)
                    _4 = m2[g], r3.has(_4.scopeName) || s2.has(_4.toKey()) || (s2.add(_4.toKey()), a3.push(_4));
                  return [3, 1];
                case 3:
                  return [2, this.grammarForScopeName(e4, t3, n3, o2)];
              }
            });
          });
        }, e3.prototype.addGrammar = function(e4, t3, n3, o2) {
          return void 0 === t3 && (t3 = []), void 0 === n3 && (n3 = 0), void 0 === o2 && (o2 = null), r2(this, void 0, void 0, function() {
            return i2(this, function(r3) {
              switch (r3.label) {
                case 0:
                  return this._syncRegistry.addGrammar(e4, t3), [4, this.grammarForScopeName(e4.scopeName, n3, o2)];
                case 1:
                  return [2, r3.sent()];
              }
            });
          });
        }, e3.prototype.grammarForScopeName = function(e4, t3, n3, r3) {
          return void 0 === t3 && (t3 = 0), void 0 === n3 && (n3 = null), void 0 === r3 && (r3 = null), this._syncRegistry.grammarForScopeName(e4, t3, n3, r3);
        }, e3;
      }();
      t2.Registry = u2, t2.INITIAL = c2.StackElement.NULL, t2.parseRawGrammar = s.parseRawGrammar;
    }, function(e2, t2, n2) {
      var r2 = this && this.__awaiter || function(e3, t3, n3, r3) {
        return new (n3 || (n3 = Promise))(function(i3, o2) {
          function s2(e4) {
            try {
              c2(r3.next(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function a2(e4) {
            try {
              c2(r3.throw(e4));
            } catch (e5) {
              o2(e5);
            }
          }
          function c2(e4) {
            var t4;
            e4.done ? i3(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          c2((r3 = r3.apply(e3, t3 || [])).next());
        });
      }, i2 = this && this.__generator || function(e3, t3) {
        var n3, r3, i3, o2, s2 = { label: 0, sent: function() {
          if (1 & i3[0])
            throw i3[1];
          return i3[1];
        }, trys: [], ops: [] };
        return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
          return this;
        }), o2;
        function a2(o3) {
          return function(a3) {
            return function(o4) {
              if (n3)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n3 = 1, r3 && (i3 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i3 = r3.return) && i3.call(r3), 0) : r3.next) && !(i3 = i3.call(r3, o4[1])).done)
                    return i3;
                  switch (r3 = 0, i3 && (o4 = [2 & o4[0], i3.value]), o4[0]) {
                    case 0:
                    case 1:
                      i3 = o4;
                      break;
                    case 4:
                      return s2.label++, { value: o4[1], done: false };
                    case 5:
                      s2.label++, r3 = o4[1], o4 = [0];
                      continue;
                    case 7:
                      o4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(i3 = s2.trys, (i3 = i3.length > 0 && i3[i3.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                        s2 = 0;
                        continue;
                      }
                      if (3 === o4[0] && (!i3 || o4[1] > i3[0] && o4[1] < i3[3])) {
                        s2.label = o4[1];
                        break;
                      }
                      if (6 === o4[0] && s2.label < i3[1]) {
                        s2.label = i3[1], i3 = o4;
                        break;
                      }
                      if (i3 && s2.label < i3[2]) {
                        s2.label = i3[2], s2.ops.push(o4);
                        break;
                      }
                      i3[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  o4 = t3.call(e3, s2);
                } catch (e4) {
                  o4 = [6, e4], r3 = 0;
                } finally {
                  n3 = i3 = 0;
                }
              if (5 & o4[0])
                throw o4[1];
              return { value: o4[0] ? o4[1] : void 0, done: true };
            }([o3, a3]);
          };
        }
      };
      Object.defineProperty(t2, "__esModule", { value: true });
      var o = n2(0), s = function() {
        function e3(e4, t3) {
          this._theme = e4, this._grammars = {}, this._rawGrammars = {}, this._injectionGrammars = {}, this._onigLibPromise = t3;
        }
        return e3.prototype.dispose = function() {
          for (var e4 in this._grammars)
            this._grammars.hasOwnProperty(e4) && this._grammars[e4].dispose();
        }, e3.prototype.setTheme = function(e4) {
          var t3 = this;
          this._theme = e4, Object.keys(this._grammars).forEach(function(e5) {
            t3._grammars[e5].onDidChangeTheme();
          });
        }, e3.prototype.getColorMap = function() {
          return this._theme.getColorMap();
        }, e3.prototype.addGrammar = function(e4, t3) {
          this._rawGrammars[e4.scopeName] = e4, t3 && (this._injectionGrammars[e4.scopeName] = t3);
        }, e3.prototype.lookup = function(e4) {
          return this._rawGrammars[e4];
        }, e3.prototype.injections = function(e4) {
          return this._injectionGrammars[e4];
        }, e3.prototype.getDefaults = function() {
          return this._theme.getDefaults();
        }, e3.prototype.themeMatch = function(e4) {
          return this._theme.match(e4);
        }, e3.prototype.grammarForScopeName = function(e4, t3, n3, s2) {
          return r2(this, void 0, void 0, function() {
            var r3, a2, c2, u2, l;
            return i2(this, function(i3) {
              switch (i3.label) {
                case 0:
                  return this._grammars[e4] ? [3, 2] : (r3 = this._rawGrammars[e4]) ? (a2 = this._grammars, c2 = e4, u2 = o.createGrammar, l = [r3, t3, n3, s2, this], [4, this._onigLibPromise]) : [2, null];
                case 1:
                  a2[c2] = u2.apply(void 0, l.concat([i3.sent()])), i3.label = 2;
                case 2:
                  return [2, this._grammars[e4]];
              }
            });
          });
        }, e3;
      }();
      t2.SyncRegistry = s;
    }, function(e2, t2, n2) {
      var r2, i2 = this && this.__extends || (r2 = function(e3, t3) {
        return (r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n3 in t4)
            t4.hasOwnProperty(n3) && (e4[n3] = t4[n3]);
        })(e3, t3);
      }, function(e3, t3) {
        function n3() {
          this.constructor = e3;
        }
        r2(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (n3.prototype = t3.prototype, new n3());
      });
      Object.defineProperty(t2, "__esModule", { value: true });
      var o = n2(1), s = /\\(\d+)/, a2 = /\\(\d+)/g, c2 = function() {
        function e3(e4, t3, n3) {
          this.debugRegExps = t3, this.rules = n3, this.scanner = e4.createOnigScanner(t3);
        }
        return e3.prototype.dispose = function() {
          "function" == typeof this.scanner.dispose && this.scanner.dispose();
        }, e3;
      }();
      t2.CompiledRule = c2;
      var u2 = function() {
        function e3(e4, t3, n3, r3) {
          this.$location = e4, this.id = t3, this._name = n3 || null, this._nameIsCapturing = o.RegexSource.hasCaptures(this._name), this._contentName = r3 || null, this._contentNameIsCapturing = o.RegexSource.hasCaptures(this._contentName);
        }
        return Object.defineProperty(e3.prototype, "debugName", { get: function() {
          var e4 = this.$location ? o.basename(this.$location.filename) + ":" + this.$location.line : "unknown";
          return this.constructor.name + "#" + this.id + " @ " + e4;
        }, enumerable: true, configurable: true }), e3.prototype.getName = function(e4, t3) {
          return this._nameIsCapturing && null !== this._name && null !== e4 && null !== t3 ? o.RegexSource.replaceCaptures(this._name, e4, t3) : this._name;
        }, e3.prototype.getContentName = function(e4, t3) {
          return this._contentNameIsCapturing && null !== this._contentName ? o.RegexSource.replaceCaptures(this._contentName, e4, t3) : this._contentName;
        }, e3;
      }();
      t2.Rule = u2;
      var l = function(e3) {
        function t3(t4, n3, r3, i3, o2) {
          var s2 = e3.call(this, t4, n3, r3, i3) || this;
          return s2.retokenizeCapturedWithRuleId = o2, s2;
        }
        return i2(t3, e3), t3.prototype.dispose = function() {
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          throw new Error("Not supported!");
        }, t3.prototype.compile = function(e4, t4, n3, r3) {
          throw new Error("Not supported!");
        }, t3;
      }(u2);
      t2.CaptureRule = l;
      var h2 = function() {
        function e3(e4, t3, n3) {
          if (void 0 === n3 && (n3 = true), n3)
            if (e4) {
              for (var r3 = e4.length, i3 = 0, o2 = [], a3 = false, c3 = 0; c3 < r3; c3++) {
                if ("\\" === e4.charAt(c3) && c3 + 1 < r3) {
                  var u3 = e4.charAt(c3 + 1);
                  "z" === u3 ? (o2.push(e4.substring(i3, c3)), o2.push("$(?!\\n)(?<!\\n)"), i3 = c3 + 2) : "A" !== u3 && "G" !== u3 || (a3 = true), c3++;
                }
              }
              this.hasAnchor = a3, 0 === i3 ? this.source = e4 : (o2.push(e4.substring(i3, r3)), this.source = o2.join(""));
            } else
              this.hasAnchor = false, this.source = e4;
          else
            this.hasAnchor = false, this.source = e4;
          this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = t3, this.hasBackReferences = s.test(this.source);
        }
        return e3.prototype.clone = function() {
          return new e3(this.source, this.ruleId, true);
        }, e3.prototype.setSource = function(e4) {
          this.source !== e4 && (this.source = e4, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
        }, e3.prototype.resolveBackReferences = function(e4, t3) {
          var n3 = t3.map(function(t4) {
            return e4.substring(t4.start, t4.end);
          });
          return a2.lastIndex = 0, this.source.replace(a2, function(e5, t4) {
            return (n3[parseInt(t4, 10)] || "").replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
          });
        }, e3.prototype._buildAnchorCache = function() {
          var e4, t3, n3, r3, i3 = [], o2 = [], s2 = [], a3 = [];
          for (e4 = 0, t3 = this.source.length; e4 < t3; e4++)
            n3 = this.source.charAt(e4), i3[e4] = n3, o2[e4] = n3, s2[e4] = n3, a3[e4] = n3, "\\" === n3 && e4 + 1 < t3 && ("A" === (r3 = this.source.charAt(e4 + 1)) ? (i3[e4 + 1] = "\uFFFF", o2[e4 + 1] = "\uFFFF", s2[e4 + 1] = "A", a3[e4 + 1] = "A") : "G" === r3 ? (i3[e4 + 1] = "\uFFFF", o2[e4 + 1] = "G", s2[e4 + 1] = "\uFFFF", a3[e4 + 1] = "G") : (i3[e4 + 1] = r3, o2[e4 + 1] = r3, s2[e4 + 1] = r3, a3[e4 + 1] = r3), e4++);
          return { A0_G0: i3.join(""), A0_G1: o2.join(""), A1_G0: s2.join(""), A1_G1: a3.join("") };
        }, e3.prototype.resolveAnchors = function(e4, t3) {
          return this.hasAnchor && this._anchorCache ? e4 ? t3 ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : t3 ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0 : this.source;
        }, e3;
      }();
      t2.RegExpSource = h2;
      var p2 = function() {
        function e3() {
          this._items = [], this._hasAnchors = false, this._cached = null, this._anchorCache = { A0_G0: null, A0_G1: null, A1_G0: null, A1_G1: null };
        }
        return e3.prototype.dispose = function() {
          this._disposeCaches();
        }, e3.prototype._disposeCaches = function() {
          this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
        }, e3.prototype.push = function(e4) {
          this._items.push(e4), this._hasAnchors = this._hasAnchors || e4.hasAnchor;
        }, e3.prototype.unshift = function(e4) {
          this._items.unshift(e4), this._hasAnchors = this._hasAnchors || e4.hasAnchor;
        }, e3.prototype.length = function() {
          return this._items.length;
        }, e3.prototype.setSource = function(e4, t3) {
          this._items[e4].source !== t3 && (this._disposeCaches(), this._items[e4].setSource(t3));
        }, e3.prototype.compile = function(e4, t3, n3) {
          if (this._hasAnchors)
            return t3 ? n3 ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A1_G0) : n3 ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(e4, t3, n3)), this._anchorCache.A0_G0);
          if (!this._cached) {
            var r3 = this._items.map(function(e5) {
              return e5.source;
            });
            this._cached = new c2(e4, r3, this._items.map(function(e5) {
              return e5.ruleId;
            }));
          }
          return this._cached;
        }, e3.prototype._resolveAnchors = function(e4, t3, n3) {
          var r3 = this._items.map(function(e5) {
            return e5.resolveAnchors(t3, n3);
          });
          return new c2(e4, r3, this._items.map(function(e5) {
            return e5.ruleId;
          }));
        }, e3;
      }();
      t2.RegExpSourceList = p2;
      var f2 = function(e3) {
        function t3(t4, n3, r3, i3, o2) {
          var s2 = e3.call(this, t4, n3, r3, null) || this;
          return s2._match = new h2(i3, s2.id), s2.captures = o2, s2._cachedCompiledPatterns = null, s2;
        }
        return i2(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, Object.defineProperty(t3.prototype, "debugMatchRegExp", { get: function() {
          return "" + this._match.source;
        }, enumerable: true, configurable: true }), t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          t4.push(this._match);
        }, t3.prototype.compile = function(e4, t4, n3, r3) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true)), this._cachedCompiledPatterns.compile(e4, n3, r3);
        }, t3;
      }(u2);
      t2.MatchRule = f2;
      var d2 = function(e3) {
        function t3(t4, n3, r3, i3, o2) {
          var s2 = e3.call(this, t4, n3, r3, i3) || this;
          return s2.patterns = o2.patterns, s2.hasMissingPatterns = o2.hasMissingPatterns, s2._cachedCompiledPatterns = null, s2;
        }
        return i2(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          var r3, i3;
          for (r3 = 0, i3 = this.patterns.length; r3 < i3; r3++)
            e4.getRule(this.patterns[r3]).collectPatternsRecursive(e4, t4, false);
        }, t3.prototype.compile = function(e4, t4, n3, r3) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true)), this._cachedCompiledPatterns.compile(e4, n3, r3);
        }, t3;
      }(u2);
      t2.IncludeOnlyRule = d2;
      var g = function(e3) {
        function t3(t4, n3, r3, i3, o2, s2, a3, c3, u3, l2) {
          var p3 = e3.call(this, t4, n3, r3, i3) || this;
          return p3._begin = new h2(o2, p3.id), p3.beginCaptures = s2, p3._end = new h2(a3 || "\uFFFF", -1), p3.endHasBackReferences = p3._end.hasBackReferences, p3.endCaptures = c3, p3.applyEndPatternLast = u3 || false, p3.patterns = l2.patterns, p3.hasMissingPatterns = l2.hasMissingPatterns, p3._cachedCompiledPatterns = null, p3;
        }
        return i2(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
        }, Object.defineProperty(t3.prototype, "debugBeginRegExp", { get: function() {
          return "" + this._begin.source;
        }, enumerable: true, configurable: true }), Object.defineProperty(t3.prototype, "debugEndRegExp", { get: function() {
          return "" + this._end.source;
        }, enumerable: true, configurable: true }), t3.prototype.getEndWithResolvedBackReferences = function(e4, t4) {
          return this._end.resolveBackReferences(e4, t4);
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          if (n3) {
            var r3, i3 = void 0;
            for (i3 = 0, r3 = this.patterns.length; i3 < r3; i3++)
              e4.getRule(this.patterns[i3]).collectPatternsRecursive(e4, t4, false);
          } else
            t4.push(this._begin);
        }, t3.prototype.compile = function(e4, t4, n3, r3) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true), this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end)), this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, t4) : this._cachedCompiledPatterns.setSource(0, t4)), this._cachedCompiledPatterns.compile(e4, n3, r3);
        }, t3;
      }(u2);
      t2.BeginEndRule = g;
      var m2 = function(e3) {
        function t3(t4, n3, r3, i3, o2, s2, a3, c3, u3) {
          var l2 = e3.call(this, t4, n3, r3, i3) || this;
          return l2._begin = new h2(o2, l2.id), l2.beginCaptures = s2, l2.whileCaptures = c3, l2._while = new h2(a3, -2), l2.whileHasBackReferences = l2._while.hasBackReferences, l2.patterns = u3.patterns, l2.hasMissingPatterns = u3.hasMissingPatterns, l2._cachedCompiledPatterns = null, l2._cachedCompiledWhilePatterns = null, l2;
        }
        return i2(t3, e3), t3.prototype.dispose = function() {
          this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
        }, Object.defineProperty(t3.prototype, "debugBeginRegExp", { get: function() {
          return "" + this._begin.source;
        }, enumerable: true, configurable: true }), Object.defineProperty(t3.prototype, "debugWhileRegExp", { get: function() {
          return "" + this._while.source;
        }, enumerable: true, configurable: true }), t3.prototype.getWhileWithResolvedBackReferences = function(e4, t4) {
          return this._while.resolveBackReferences(e4, t4);
        }, t3.prototype.collectPatternsRecursive = function(e4, t4, n3) {
          if (n3) {
            var r3, i3 = void 0;
            for (i3 = 0, r3 = this.patterns.length; i3 < r3; i3++)
              e4.getRule(this.patterns[i3]).collectPatternsRecursive(e4, t4, false);
          } else
            t4.push(this._begin);
        }, t3.prototype.compile = function(e4, t4, n3, r3) {
          return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new p2(), this.collectPatternsRecursive(e4, this._cachedCompiledPatterns, true)), this._cachedCompiledPatterns.compile(e4, n3, r3);
        }, t3.prototype.compileWhile = function(e4, t4, n3, r3) {
          return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new p2(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, t4 || "\uFFFF"), this._cachedCompiledWhilePatterns.compile(e4, n3, r3);
        }, t3;
      }(u2);
      t2.BeginWhileRule = m2;
      var _4 = function() {
        function e3() {
        }
        return e3.createCaptureRule = function(e4, t3, n3, r3, i3) {
          return e4.registerRule(function(e5) {
            return new l(t3, e5, n3, r3, i3);
          });
        }, e3.getCompiledRuleId = function(t3, n3, r3) {
          return t3.id || n3.registerRule(function(i3) {
            if (t3.id = i3, t3.match)
              return new f2(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.match, e3._compileCaptures(t3.captures, n3, r3));
            if (void 0 === t3.begin) {
              t3.repository && (r3 = o.mergeObjects({}, r3, t3.repository));
              var s2 = t3.patterns;
              return void 0 === s2 && t3.include && (s2 = [{ include: t3.include }]), new d2(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.contentName, e3._compilePatterns(s2, n3, r3));
            }
            return t3.while ? new m2(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.contentName, t3.begin, e3._compileCaptures(t3.beginCaptures || t3.captures, n3, r3), t3.while, e3._compileCaptures(t3.whileCaptures || t3.captures, n3, r3), e3._compilePatterns(t3.patterns, n3, r3)) : new g(t3.$vscodeTextmateLocation, t3.id, t3.name, t3.contentName, t3.begin, e3._compileCaptures(t3.beginCaptures || t3.captures, n3, r3), t3.end, e3._compileCaptures(t3.endCaptures || t3.captures, n3, r3), t3.applyEndPatternLast, e3._compilePatterns(t3.patterns, n3, r3));
          }), t3.id;
        }, e3._compileCaptures = function(t3, n3, r3) {
          var i3 = [];
          if (t3) {
            var o2 = 0;
            for (var s2 in t3) {
              if ("$vscodeTextmateLocation" !== s2)
                (c3 = parseInt(s2, 10)) > o2 && (o2 = c3);
            }
            for (var a3 = 0; a3 <= o2; a3++)
              i3[a3] = null;
            for (var s2 in t3)
              if ("$vscodeTextmateLocation" !== s2) {
                var c3 = parseInt(s2, 10), u3 = 0;
                t3[s2].patterns && (u3 = e3.getCompiledRuleId(t3[s2], n3, r3)), i3[c3] = e3.createCaptureRule(n3, t3[s2].$vscodeTextmateLocation, t3[s2].name, t3[s2].contentName, u3);
              }
          }
          return i3;
        }, e3._compilePatterns = function(t3, n3, r3) {
          var i3 = [];
          if (t3)
            for (var o2 = 0, s2 = t3.length; o2 < s2; o2++) {
              var a3 = t3[o2], c3 = -1;
              if (a3.include)
                if ("#" === a3.include.charAt(0)) {
                  var u3 = r3[a3.include.substr(1)];
                  u3 && (c3 = e3.getCompiledRuleId(u3, n3, r3));
                } else if ("$base" === a3.include || "$self" === a3.include)
                  c3 = e3.getCompiledRuleId(r3[a3.include], n3, r3);
                else {
                  var l2 = null, h3 = null, p3 = a3.include.indexOf("#");
                  p3 >= 0 ? (l2 = a3.include.substring(0, p3), h3 = a3.include.substring(p3 + 1)) : l2 = a3.include;
                  var f3 = n3.getExternalGrammar(l2, r3);
                  if (f3)
                    if (h3) {
                      var _5 = f3.repository[h3];
                      _5 && (c3 = e3.getCompiledRuleId(_5, n3, f3.repository));
                    } else
                      c3 = e3.getCompiledRuleId(f3.repository.$self, n3, f3.repository);
                }
              else
                c3 = e3.getCompiledRuleId(a3, n3, r3);
              if (-1 !== c3) {
                var y2 = n3.getRule(c3), v2 = false;
                if ((y2 instanceof d2 || y2 instanceof g || y2 instanceof m2) && y2.hasMissingPatterns && 0 === y2.patterns.length && (v2 = true), v2)
                  continue;
                i3.push(c3);
              }
            }
          return { patterns: i3, hasMissingPatterns: (t3 ? t3.length : 0) !== i3.length };
        }, e3;
      }();
      t2.RuleFactory = _4;
    }, function(e2, t2, n2) {
      function r2(e3) {
        return !!e3 && !!e3.match(/[\w\.:]+/);
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.createMatchers = function(e3, t3) {
        for (var n3, i2, o, s = [], a2 = (o = (i2 = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g).exec(n3 = e3), { next: function() {
          if (!o)
            return null;
          var e4 = o[0];
          return o = i2.exec(n3), e4;
        } }), c2 = a2.next(); null !== c2; ) {
          var u2 = 0;
          if (2 === c2.length && ":" === c2.charAt(1)) {
            switch (c2.charAt(0)) {
              case "R":
                u2 = 1;
                break;
              case "L":
                u2 = -1;
                break;
              default:
                console.log("Unknown priority " + c2 + " in scope selector");
            }
            c2 = a2.next();
          }
          var l = p2();
          if (s.push({ matcher: l, priority: u2 }), "," !== c2)
            break;
          c2 = a2.next();
        }
        return s;
        function h2() {
          if ("-" === c2) {
            c2 = a2.next();
            var e4 = h2();
            return function(t4) {
              return !!e4 && !e4(t4);
            };
          }
          if ("(" === c2) {
            c2 = a2.next();
            var n4 = function() {
              var e5 = [], t4 = p2();
              for (; t4 && (e5.push(t4), "|" === c2 || "," === c2); ) {
                do {
                  c2 = a2.next();
                } while ("|" === c2 || "," === c2);
                t4 = p2();
              }
              return function(t5) {
                return e5.some(function(e6) {
                  return e6(t5);
                });
              };
            }();
            return ")" === c2 && (c2 = a2.next()), n4;
          }
          if (r2(c2)) {
            var i3 = [];
            do {
              i3.push(c2), c2 = a2.next();
            } while (r2(c2));
            return function(e5) {
              return t3(i3, e5);
            };
          }
          return null;
        }
        function p2() {
          for (var e4 = [], t4 = h2(); t4; )
            e4.push(t4), t4 = h2();
          return function(t5) {
            return e4.every(function(e5) {
              return e5(t5);
            });
          };
        }
      };
    }, function(e2, t2) {
      var n2, r2, i2 = e2.exports = {};
      function o() {
        throw new Error("setTimeout has not been defined");
      }
      function s() {
        throw new Error("clearTimeout has not been defined");
      }
      function a2(e3) {
        if (n2 === setTimeout)
          return setTimeout(e3, 0);
        if ((n2 === o || !n2) && setTimeout)
          return n2 = setTimeout, setTimeout(e3, 0);
        try {
          return n2(e3, 0);
        } catch (t3) {
          try {
            return n2.call(null, e3, 0);
          } catch (t4) {
            return n2.call(this, e3, 0);
          }
        }
      }
      !function() {
        try {
          n2 = "function" == typeof setTimeout ? setTimeout : o;
        } catch (e3) {
          n2 = o;
        }
        try {
          r2 = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (e3) {
          r2 = s;
        }
      }();
      var c2, u2 = [], l = false, h2 = -1;
      function p2() {
        l && c2 && (l = false, c2.length ? u2 = c2.concat(u2) : h2 = -1, u2.length && f2());
      }
      function f2() {
        if (!l) {
          var e3 = a2(p2);
          l = true;
          for (var t3 = u2.length; t3; ) {
            for (c2 = u2, u2 = []; ++h2 < t3; )
              c2 && c2[h2].run();
            h2 = -1, t3 = u2.length;
          }
          c2 = null, l = false, function(e4) {
            if (r2 === clearTimeout)
              return clearTimeout(e4);
            if ((r2 === s || !r2) && clearTimeout)
              return r2 = clearTimeout, clearTimeout(e4);
            try {
              r2(e4);
            } catch (t4) {
              try {
                return r2.call(null, e4);
              } catch (t5) {
                return r2.call(this, e4);
              }
            }
          }(e3);
        }
      }
      function d2(e3, t3) {
        this.fun = e3, this.array = t3;
      }
      function g() {
      }
      i2.nextTick = function(e3) {
        var t3 = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n3 = 1; n3 < arguments.length; n3++)
            t3[n3 - 1] = arguments[n3];
        u2.push(new d2(e3, t3)), 1 !== u2.length || l || a2(f2);
      }, d2.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, i2.title = "browser", i2.browser = true, i2.env = {}, i2.argv = [], i2.version = "", i2.versions = {}, i2.on = g, i2.addListener = g, i2.once = g, i2.off = g, i2.removeListener = g, i2.removeAllListeners = g, i2.emit = g, i2.prependListener = g, i2.prependOnceListener = g, i2.listeners = function(e3) {
        return [];
      }, i2.binding = function(e3) {
        throw new Error("process.binding is not supported");
      }, i2.cwd = function() {
        return "/";
      }, i2.chdir = function(e3) {
        throw new Error("process.chdir is not supported");
      }, i2.umask = function() {
        return 0;
      };
    }, function(e2, t2, n2) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var r2 = n2(9), i2 = n2(2), o = n2(10);
      t2.parseRawGrammar = function(e3, t3) {
        return void 0 === t3 && (t3 = null), null !== t3 && /\.json$/.test(t3) ? function(e4, t4) {
          if (i2.DebugFlags.InDebugMode)
            return o.parse(e4, t4, true);
          return JSON.parse(e4);
        }(e3, t3) : function(e4, t4) {
          if (i2.DebugFlags.InDebugMode)
            return r2.parseWithLocation(e4, t4, "$vscodeTextmateLocation");
          return r2.parse(e4);
        }(e3, t3);
      };
    }, function(e2, t2, n2) {
      function r2(e3, t3, n3) {
        var r3 = e3.length, i2 = 0, o = 1, s = 0;
        function a2(t4) {
          if (null === n3)
            i2 += t4;
          else
            for (; t4 > 0; ) {
              10 === e3.charCodeAt(i2) ? (i2++, o++, s = 0) : (i2++, s++), t4--;
            }
        }
        function c2(e4) {
          null === n3 ? i2 = e4 : a2(e4 - i2);
        }
        function u2() {
          for (; i2 < r3; ) {
            var t4 = e3.charCodeAt(i2);
            if (32 !== t4 && 9 !== t4 && 13 !== t4 && 10 !== t4)
              break;
            a2(1);
          }
        }
        function l(t4) {
          return e3.substr(i2, t4.length) === t4 && (a2(t4.length), true);
        }
        function h2(t4) {
          var n4 = e3.indexOf(t4, i2);
          c2(-1 !== n4 ? n4 + t4.length : r3);
        }
        function p2(t4) {
          var n4 = e3.indexOf(t4, i2);
          if (-1 !== n4) {
            var o2 = e3.substring(i2, n4);
            return c2(n4 + t4.length), o2;
          }
          o2 = e3.substr(i2);
          return c2(r3), o2;
        }
        r3 > 0 && 65279 === e3.charCodeAt(0) && (i2 = 1);
        var f2 = 0, d2 = null, g = [], m2 = [], _4 = null;
        function y2(e4, t4) {
          g.push(f2), m2.push(d2), f2 = e4, d2 = t4;
        }
        function v2() {
          if (0 === g.length)
            return b2("illegal state stack");
          f2 = g.pop(), d2 = m2.pop();
        }
        function b2(t4) {
          throw new Error("Near offset " + i2 + ": " + t4 + " ~~~" + e3.substr(i2, 50) + "~~~");
        }
        var C2, w2, k2, R2 = function() {
          if (null === _4)
            return b2("missing <key>");
          var e4 = {};
          null !== n3 && (e4[n3] = { filename: t3, line: o, char: s }), d2[_4] = e4, _4 = null, y2(1, e4);
        }, S2 = function() {
          if (null === _4)
            return b2("missing <key>");
          var e4 = [];
          d2[_4] = e4, _4 = null, y2(2, e4);
        }, P2 = function() {
          var e4 = {};
          null !== n3 && (e4[n3] = { filename: t3, line: o, char: s }), d2.push(e4), y2(1, e4);
        }, x2 = function() {
          var e4 = [];
          d2.push(e4), y2(2, e4);
        };
        function I2() {
          if (1 !== f2)
            return b2("unexpected </dict>");
          v2();
        }
        function A2() {
          return 1 === f2 || 2 !== f2 ? b2("unexpected </array>") : void v2();
        }
        function T2(e4) {
          if (1 === f2) {
            if (null === _4)
              return b2("missing <key>");
            d2[_4] = e4, _4 = null;
          } else
            2 === f2 ? d2.push(e4) : d2 = e4;
        }
        function L2(e4) {
          if (isNaN(e4))
            return b2("cannot parse float");
          if (1 === f2) {
            if (null === _4)
              return b2("missing <key>");
            d2[_4] = e4, _4 = null;
          } else
            2 === f2 ? d2.push(e4) : d2 = e4;
        }
        function M2(e4) {
          if (isNaN(e4))
            return b2("cannot parse integer");
          if (1 === f2) {
            if (null === _4)
              return b2("missing <key>");
            d2[_4] = e4, _4 = null;
          } else
            2 === f2 ? d2.push(e4) : d2 = e4;
        }
        function G2(e4) {
          if (1 === f2) {
            if (null === _4)
              return b2("missing <key>");
            d2[_4] = e4, _4 = null;
          } else
            2 === f2 ? d2.push(e4) : d2 = e4;
        }
        function D2(e4) {
          if (1 === f2) {
            if (null === _4)
              return b2("missing <key>");
            d2[_4] = e4, _4 = null;
          } else
            2 === f2 ? d2.push(e4) : d2 = e4;
        }
        function N2(e4) {
          if (1 === f2) {
            if (null === _4)
              return b2("missing <key>");
            d2[_4] = e4, _4 = null;
          } else
            2 === f2 ? d2.push(e4) : d2 = e4;
        }
        function E2(e4) {
          if (e4.isClosed)
            return "";
          var t4 = p2("</");
          return h2(">"), t4.replace(/&#([0-9]+);/g, function(e5, t5) {
            return String.fromCodePoint(parseInt(t5, 10));
          }).replace(/&#x([0-9a-f]+);/g, function(e5, t5) {
            return String.fromCodePoint(parseInt(t5, 16));
          }).replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, function(e5) {
            switch (e5) {
              case "&amp;":
                return "&";
              case "&lt;":
                return "<";
              case "&gt;":
                return ">";
              case "&quot;":
                return '"';
              case "&apos;":
                return "'";
            }
            return e5;
          });
        }
        for (; i2 < r3 && (u2(), !(i2 >= r3)); ) {
          var O2 = e3.charCodeAt(i2);
          if (a2(1), 60 !== O2)
            return b2("expected <");
          if (i2 >= r3)
            return b2("unexpected end of input");
          var j2 = e3.charCodeAt(i2);
          if (63 !== j2)
            if (33 !== j2) {
              if (47 === j2) {
                if (a2(1), u2(), l("plist")) {
                  h2(">");
                  continue;
                }
                if (l("dict")) {
                  h2(">"), I2();
                  continue;
                }
                if (l("array")) {
                  h2(">"), A2();
                  continue;
                }
                return b2("unexpected closed tag");
              }
              var F2 = (w2 = void 0, k2 = void 0, w2 = p2(">"), k2 = false, 47 === w2.charCodeAt(w2.length - 1) && (k2 = true, w2 = w2.substring(0, w2.length - 1)), { name: w2.trim(), isClosed: k2 });
              switch (F2.name) {
                case "dict":
                  1 === f2 ? R2() : 2 === f2 ? P2() : (d2 = {}, null !== n3 && (d2[n3] = { filename: t3, line: o, char: s }), y2(1, d2)), F2.isClosed && I2();
                  continue;
                case "array":
                  1 === f2 ? S2() : 2 === f2 ? x2() : y2(2, d2 = []), F2.isClosed && A2();
                  continue;
                case "key":
                  C2 = E2(F2), 1 !== f2 ? b2("unexpected <key>") : null !== _4 ? b2("too many <key>") : _4 = C2;
                  continue;
                case "string":
                  T2(E2(F2));
                  continue;
                case "real":
                  L2(parseFloat(E2(F2)));
                  continue;
                case "integer":
                  M2(parseInt(E2(F2), 10));
                  continue;
                case "date":
                  G2(new Date(E2(F2)));
                  continue;
                case "data":
                  D2(E2(F2));
                  continue;
                case "true":
                  E2(F2), N2(true);
                  continue;
                case "false":
                  E2(F2), N2(false);
                  continue;
              }
              if (!/^plist/.test(F2.name))
                return b2("unexpected opened tag " + F2.name);
            } else {
              if (a2(1), l("--")) {
                h2("-->");
                continue;
              }
              h2(">");
            }
          else
            a2(1), h2("?>");
        }
        return d2;
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.parseWithLocation = function(e3, t3, n3) {
        return r2(e3, t3, n3);
      }, t2.parse = function(e3) {
        return r2(e3, null, null);
      };
    }, function(e2, t2, n2) {
      function r2(e3, t3) {
        throw new Error("Near offset " + e3.pos + ": " + t3 + " ~~~" + e3.source.substr(e3.pos, 50) + "~~~");
      }
      Object.defineProperty(t2, "__esModule", { value: true }), t2.parse = function(e3, t3, n3) {
        var a2 = new i2(e3), c2 = new o(), u2 = 0, l = null, h2 = [], p2 = [];
        function f2() {
          h2.push(u2), p2.push(l);
        }
        function d2() {
          u2 = h2.pop(), l = p2.pop();
        }
        function g(e4) {
          r2(a2, e4);
        }
        for (; s(a2, c2); ) {
          if (0 === u2) {
            if (null !== l && g("too many constructs in root"), 3 === c2.type) {
              l = {}, n3 && (l.$vscodeTextmateLocation = c2.toLocation(t3)), f2(), u2 = 1;
              continue;
            }
            if (2 === c2.type) {
              l = [], f2(), u2 = 4;
              continue;
            }
            g("unexpected token in root");
          }
          if (2 === u2) {
            if (5 === c2.type) {
              d2();
              continue;
            }
            if (7 === c2.type) {
              u2 = 3;
              continue;
            }
            g("expected , or }");
          }
          if (1 === u2 || 3 === u2) {
            if (1 === u2 && 5 === c2.type) {
              d2();
              continue;
            }
            if (1 === c2.type) {
              var m2 = c2.value;
              if (s(a2, c2) && 6 === c2.type || g("expected colon"), s(a2, c2) || g("expected value"), u2 = 2, 1 === c2.type) {
                l[m2] = c2.value;
                continue;
              }
              if (8 === c2.type) {
                l[m2] = null;
                continue;
              }
              if (9 === c2.type) {
                l[m2] = true;
                continue;
              }
              if (10 === c2.type) {
                l[m2] = false;
                continue;
              }
              if (11 === c2.type) {
                l[m2] = parseFloat(c2.value);
                continue;
              }
              if (2 === c2.type) {
                var _4 = [];
                l[m2] = _4, f2(), u2 = 4, l = _4;
                continue;
              }
              if (3 === c2.type) {
                var y2 = {};
                n3 && (y2.$vscodeTextmateLocation = c2.toLocation(t3)), l[m2] = y2, f2(), u2 = 1, l = y2;
                continue;
              }
            }
            g("unexpected token in dict");
          }
          if (5 === u2) {
            if (4 === c2.type) {
              d2();
              continue;
            }
            if (7 === c2.type) {
              u2 = 6;
              continue;
            }
            g("expected , or ]");
          }
          if (4 === u2 || 6 === u2) {
            if (4 === u2 && 4 === c2.type) {
              d2();
              continue;
            }
            if (u2 = 5, 1 === c2.type) {
              l.push(c2.value);
              continue;
            }
            if (8 === c2.type) {
              l.push(null);
              continue;
            }
            if (9 === c2.type) {
              l.push(true);
              continue;
            }
            if (10 === c2.type) {
              l.push(false);
              continue;
            }
            if (11 === c2.type) {
              l.push(parseFloat(c2.value));
              continue;
            }
            if (2 === c2.type) {
              _4 = [];
              l.push(_4), f2(), u2 = 4, l = _4;
              continue;
            }
            if (3 === c2.type) {
              y2 = {};
              n3 && (y2.$vscodeTextmateLocation = c2.toLocation(t3)), l.push(y2), f2(), u2 = 1, l = y2;
              continue;
            }
            g("unexpected token in array");
          }
          g("unknown state");
        }
        return 0 !== p2.length && g("unclosed constructs"), l;
      };
      var i2 = function(e3) {
        this.source = e3, this.pos = 0, this.len = e3.length, this.line = 1, this.char = 0;
      }, o = function() {
        function e3() {
          this.value = null, this.type = 0, this.offset = -1, this.len = -1, this.line = -1, this.char = -1;
        }
        return e3.prototype.toLocation = function(e4) {
          return { filename: e4, line: this.line, char: this.char };
        }, e3;
      }();
      function s(e3, t3) {
        t3.value = null, t3.type = 0, t3.offset = -1, t3.len = -1, t3.line = -1, t3.char = -1;
        for (var n3, i3 = e3.source, o2 = e3.pos, s2 = e3.len, a2 = e3.line, c2 = e3.char; ; ) {
          if (o2 >= s2)
            return false;
          if (32 !== (n3 = i3.charCodeAt(o2)) && 9 !== n3 && 13 !== n3) {
            if (10 !== n3)
              break;
            o2++, a2++, c2 = 0;
          } else
            o2++, c2++;
        }
        if (t3.offset = o2, t3.line = a2, t3.char = c2, 34 === n3) {
          for (t3.type = 1, o2++, c2++; ; ) {
            if (o2 >= s2)
              return false;
            if (n3 = i3.charCodeAt(o2), o2++, c2++, 92 !== n3) {
              if (34 === n3)
                break;
            } else
              o2++, c2++;
          }
          t3.value = i3.substring(t3.offset + 1, o2 - 1).replace(/\\u([0-9A-Fa-f]{4})/g, function(e4, t4) {
            return String.fromCodePoint(parseInt(t4, 16));
          }).replace(/\\(.)/g, function(t4, n4) {
            switch (n4) {
              case '"':
                return '"';
              case "\\":
                return "\\";
              case "/":
                return "/";
              case "b":
                return "\b";
              case "f":
                return "\f";
              case "n":
                return "\n";
              case "r":
                return "\r";
              case "t":
                return "	";
              default:
                r2(e3, "invalid escape sequence");
            }
            throw new Error("unreachable");
          });
        } else if (91 === n3)
          t3.type = 2, o2++, c2++;
        else if (123 === n3)
          t3.type = 3, o2++, c2++;
        else if (93 === n3)
          t3.type = 4, o2++, c2++;
        else if (125 === n3)
          t3.type = 5, o2++, c2++;
        else if (58 === n3)
          t3.type = 6, o2++, c2++;
        else if (44 === n3)
          t3.type = 7, o2++, c2++;
        else if (110 === n3) {
          if (t3.type = 8, o2++, c2++, 117 !== (n3 = i3.charCodeAt(o2)))
            return false;
          if (o2++, c2++, 108 !== (n3 = i3.charCodeAt(o2)))
            return false;
          if (o2++, c2++, 108 !== (n3 = i3.charCodeAt(o2)))
            return false;
          o2++, c2++;
        } else if (116 === n3) {
          if (t3.type = 9, o2++, c2++, 114 !== (n3 = i3.charCodeAt(o2)))
            return false;
          if (o2++, c2++, 117 !== (n3 = i3.charCodeAt(o2)))
            return false;
          if (o2++, c2++, 101 !== (n3 = i3.charCodeAt(o2)))
            return false;
          o2++, c2++;
        } else if (102 === n3) {
          if (t3.type = 10, o2++, c2++, 97 !== (n3 = i3.charCodeAt(o2)))
            return false;
          if (o2++, c2++, 108 !== (n3 = i3.charCodeAt(o2)))
            return false;
          if (o2++, c2++, 115 !== (n3 = i3.charCodeAt(o2)))
            return false;
          if (o2++, c2++, 101 !== (n3 = i3.charCodeAt(o2)))
            return false;
          o2++, c2++;
        } else
          for (t3.type = 11; ; ) {
            if (o2 >= s2)
              return false;
            if (!(46 === (n3 = i3.charCodeAt(o2)) || n3 >= 48 && n3 <= 57 || 101 === n3 || 69 === n3 || 45 === n3 || 43 === n3))
              break;
            o2++, c2++;
          }
        return t3.len = o2 - t3.offset, null === t3.value && (t3.value = i3.substr(t3.offset, t3.len)), e3.pos = o2, e3.line = a2, e3.char = c2, true;
      }
    }, function(e2, t2, n2) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var r2 = function(e3, t3, n3, r3, i3, o2) {
        this.scope = e3, this.parentScopes = t3, this.index = n3, this.fontStyle = r3, this.foreground = i3, this.background = o2;
      };
      function i2(e3) {
        return !!/^#[0-9a-f]{6}$/i.test(e3) || (!!/^#[0-9a-f]{8}$/i.test(e3) || (!!/^#[0-9a-f]{3}$/i.test(e3) || !!/^#[0-9a-f]{4}$/i.test(e3)));
      }
      function o(e3) {
        if (!e3)
          return [];
        if (!e3.settings || !Array.isArray(e3.settings))
          return [];
        for (var t3 = e3.settings, n3 = [], o2 = 0, s2 = 0, a3 = t3.length; s2 < a3; s2++) {
          var c3 = t3[s2];
          if (c3.settings) {
            var u3 = void 0;
            if ("string" == typeof c3.scope)
              u3 = c3.scope.replace(/^[,]+/, "").replace(/[,]+$/, "").split(",");
            else
              u3 = Array.isArray(c3.scope) ? c3.scope : [""];
            var l2 = -1;
            if ("string" == typeof c3.settings.fontStyle) {
              l2 = 0;
              for (var h3 = 0, p3 = (g = c3.settings.fontStyle.split(" ")).length; h3 < p3; h3++) {
                switch (g[h3]) {
                  case "italic":
                    l2 |= 1;
                    break;
                  case "bold":
                    l2 |= 2;
                    break;
                  case "underline":
                    l2 |= 4;
                }
              }
            }
            var f2 = null;
            "string" == typeof c3.settings.foreground && i2(c3.settings.foreground) && (f2 = c3.settings.foreground);
            var d2 = null;
            "string" == typeof c3.settings.background && i2(c3.settings.background) && (d2 = c3.settings.background);
            for (h3 = 0, p3 = u3.length; h3 < p3; h3++) {
              var g, m2 = (g = u3[h3].trim().split(" "))[g.length - 1], _4 = null;
              g.length > 1 && (_4 = g.slice(0, g.length - 1)).reverse(), n3[o2++] = new r2(m2, _4, s2, l2, f2, d2);
            }
          }
        }
        return n3;
      }
      function s(e3, t3) {
        e3.sort(function(e4, t4) {
          var n4 = u2(e4.scope, t4.scope);
          return 0 !== n4 || 0 !== (n4 = l(e4.parentScopes, t4.parentScopes)) ? n4 : e4.index - t4.index;
        });
        for (var n3 = 0, r3 = "#000000", i3 = "#ffffff"; e3.length >= 1 && "" === e3[0].scope; ) {
          var o2 = e3.shift();
          -1 !== o2.fontStyle && (n3 = o2.fontStyle), null !== o2.foreground && (r3 = o2.foreground), null !== o2.background && (i3 = o2.background);
        }
        for (var s2 = new a2(t3), f2 = new h2(0, null, n3, s2.getId(r3), s2.getId(i3)), d2 = new p2(new h2(0, null, -1, 0, 0), []), g = 0, m2 = e3.length; g < m2; g++) {
          var _4 = e3[g];
          d2.insert(0, _4.scope, _4.parentScopes, _4.fontStyle, s2.getId(_4.foreground), s2.getId(_4.background));
        }
        return new c2(s2, f2, d2);
      }
      t2.ParsedThemeRule = r2, t2.parseTheme = o;
      var a2 = function() {
        function e3(e4) {
          if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(e4)) {
            this._isFrozen = true;
            for (var t3 = 0, n3 = e4.length; t3 < n3; t3++)
              this._color2id[e4[t3]] = t3, this._id2color[t3] = e4[t3];
          } else
            this._isFrozen = false;
        }
        return e3.prototype.getId = function(e4) {
          if (null === e4)
            return 0;
          e4 = e4.toUpperCase();
          var t3 = this._color2id[e4];
          if (t3)
            return t3;
          if (this._isFrozen)
            throw new Error("Missing color in color map - " + e4);
          return t3 = ++this._lastColorId, this._color2id[e4] = t3, this._id2color[t3] = e4, t3;
        }, e3.prototype.getColorMap = function() {
          return this._id2color.slice(0);
        }, e3;
      }();
      t2.ColorMap = a2;
      var c2 = function() {
        function e3(e4, t3, n3) {
          this._colorMap = e4, this._root = n3, this._defaults = t3, this._cache = {};
        }
        return e3.createFromRawTheme = function(e4, t3) {
          return this.createFromParsedTheme(o(e4), t3);
        }, e3.createFromParsedTheme = function(e4, t3) {
          return s(e4, t3);
        }, e3.prototype.getColorMap = function() {
          return this._colorMap.getColorMap();
        }, e3.prototype.getDefaults = function() {
          return this._defaults;
        }, e3.prototype.match = function(e4) {
          return this._cache.hasOwnProperty(e4) || (this._cache[e4] = this._root.match(e4)), this._cache[e4];
        }, e3;
      }();
      function u2(e3, t3) {
        return e3 < t3 ? -1 : e3 > t3 ? 1 : 0;
      }
      function l(e3, t3) {
        if (null === e3 && null === t3)
          return 0;
        if (!e3)
          return -1;
        if (!t3)
          return 1;
        var n3 = e3.length, r3 = t3.length;
        if (n3 === r3) {
          for (var i3 = 0; i3 < n3; i3++) {
            var o2 = u2(e3[i3], t3[i3]);
            if (0 !== o2)
              return o2;
          }
          return 0;
        }
        return n3 - r3;
      }
      t2.Theme = c2, t2.strcmp = u2, t2.strArrCmp = l;
      var h2 = function() {
        function e3(e4, t3, n3, r3, i3) {
          this.scopeDepth = e4, this.parentScopes = t3, this.fontStyle = n3, this.foreground = r3, this.background = i3;
        }
        return e3.prototype.clone = function() {
          return new e3(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
        }, e3.cloneArr = function(e4) {
          for (var t3 = [], n3 = 0, r3 = e4.length; n3 < r3; n3++)
            t3[n3] = e4[n3].clone();
          return t3;
        }, e3.prototype.acceptOverwrite = function(e4, t3, n3, r3) {
          this.scopeDepth > e4 ? console.log("how did this happen?") : this.scopeDepth = e4, -1 !== t3 && (this.fontStyle = t3), 0 !== n3 && (this.foreground = n3), 0 !== r3 && (this.background = r3);
        }, e3;
      }();
      t2.ThemeTrieElementRule = h2;
      var p2 = function() {
        function e3(e4, t3, n3) {
          void 0 === t3 && (t3 = []), void 0 === n3 && (n3 = {}), this._mainRule = e4, this._rulesWithParentScopes = t3, this._children = n3;
        }
        return e3._sortBySpecificity = function(e4) {
          return 1 === e4.length || e4.sort(this._cmpBySpecificity), e4;
        }, e3._cmpBySpecificity = function(e4, t3) {
          if (e4.scopeDepth === t3.scopeDepth) {
            var n3 = e4.parentScopes, r3 = t3.parentScopes, i3 = null === n3 ? 0 : n3.length, o2 = null === r3 ? 0 : r3.length;
            if (i3 === o2)
              for (var s2 = 0; s2 < i3; s2++) {
                var a3 = n3[s2].length, c3 = r3[s2].length;
                if (a3 !== c3)
                  return c3 - a3;
              }
            return o2 - i3;
          }
          return t3.scopeDepth - e4.scopeDepth;
        }, e3.prototype.match = function(t3) {
          if ("" === t3)
            return e3._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
          var n3, r3, i3 = t3.indexOf(".");
          return -1 === i3 ? (n3 = t3, r3 = "") : (n3 = t3.substring(0, i3), r3 = t3.substring(i3 + 1)), this._children.hasOwnProperty(n3) ? this._children[n3].match(r3) : e3._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
        }, e3.prototype.insert = function(t3, n3, r3, i3, o2, s2) {
          if ("" !== n3) {
            var a3, c3, u3, l2 = n3.indexOf(".");
            -1 === l2 ? (a3 = n3, c3 = "") : (a3 = n3.substring(0, l2), c3 = n3.substring(l2 + 1)), this._children.hasOwnProperty(a3) ? u3 = this._children[a3] : (u3 = new e3(this._mainRule.clone(), h2.cloneArr(this._rulesWithParentScopes)), this._children[a3] = u3), u3.insert(t3 + 1, c3, r3, i3, o2, s2);
          } else
            this._doInsertHere(t3, r3, i3, o2, s2);
        }, e3.prototype._doInsertHere = function(e4, t3, n3, r3, i3) {
          if (null !== t3) {
            for (var o2 = 0, s2 = this._rulesWithParentScopes.length; o2 < s2; o2++) {
              var a3 = this._rulesWithParentScopes[o2];
              if (0 === l(a3.parentScopes, t3))
                return void a3.acceptOverwrite(e4, n3, r3, i3);
            }
            -1 === n3 && (n3 = this._mainRule.fontStyle), 0 === r3 && (r3 = this._mainRule.foreground), 0 === i3 && (i3 = this._mainRule.background), this._rulesWithParentScopes.push(new h2(e4, t3, n3, r3, i3));
          } else
            this._mainRule.acceptOverwrite(e4, n3, r3, i3);
        }, e3;
      }();
      t2.ThemeTrieElement = p2;
    }]);
  });
})(main);
const languages = [
  {
    id: "abap",
    scopeName: "source.abap",
    path: "abap.tmLanguage.json",
    samplePath: "abap.sample"
  },
  {
    id: "actionscript-3",
    scopeName: "source.actionscript.3",
    path: "actionscript-3.tmLanguage.json",
    samplePath: "actionscript-3.sample"
  },
  {
    id: "ada",
    scopeName: "source.ada",
    path: "ada.tmLanguage.json",
    samplePath: "ada.sample"
  },
  {
    id: "apache",
    scopeName: "source.apacheconf",
    path: "apache.tmLanguage.json"
  },
  {
    id: "apex",
    scopeName: "source.apex",
    path: "apex.tmLanguage.json",
    samplePath: "apex.sample"
  },
  {
    id: "apl",
    scopeName: "source.apl",
    path: "apl.tmLanguage.json",
    embeddedLangs: ["html", "xml", "css", "javascript", "json"]
  },
  {
    id: "applescript",
    scopeName: "source.applescript",
    path: "applescript.tmLanguage.json",
    samplePath: "applescript.sample"
  },
  {
    id: "asm",
    scopeName: "source.asm.x86_64",
    path: "asm.tmLanguage.json",
    samplePath: "asm.sample"
  },
  {
    id: "astro",
    scopeName: "text.html.astro",
    path: "astro.tmLanguage.json",
    samplePath: "astro.sample",
    embeddedLangs: ["css", "javascript", "less", "sass", "scss", "stylus", "typescript", "tsx"]
  },
  {
    id: "awk",
    scopeName: "source.awk",
    path: "awk.tmLanguage.json",
    samplePath: "awk.sample"
  },
  {
    id: "ballerina",
    scopeName: "source.ballerina",
    path: "ballerina.tmLanguage.json",
    samplePath: "ballerina.sample"
  },
  {
    id: "bat",
    scopeName: "source.batchfile",
    path: "bat.tmLanguage.json",
    samplePath: "bat.sample",
    aliases: ["batch"]
  },
  {
    id: "berry",
    scopeName: "source.berry",
    path: "berry.tmLanguage.json",
    samplePath: "berry.sample",
    aliases: ["be"]
  },
  {
    id: "bibtex",
    scopeName: "text.bibtex",
    path: "bibtex.tmLanguage.json"
  },
  {
    id: "bicep",
    scopeName: "source.bicep",
    path: "bicep.tmLanguage.json",
    samplePath: "bicep.sample"
  },
  {
    id: "c",
    scopeName: "source.c",
    path: "c.tmLanguage.json",
    samplePath: "c.sample"
  },
  {
    id: "clojure",
    scopeName: "source.clojure",
    path: "clojure.tmLanguage.json",
    samplePath: "clojure.sample",
    aliases: ["clj"]
  },
  {
    id: "cobol",
    scopeName: "source.cobol",
    path: "cobol.tmLanguage.json",
    samplePath: "cobol.sample",
    embeddedLangs: ["sql", "html", "java"]
  },
  {
    id: "codeql",
    scopeName: "source.ql",
    path: "codeql.tmLanguage.json",
    samplePath: "codeql.sample",
    aliases: ["ql"]
  },
  {
    id: "coffee",
    scopeName: "source.coffee",
    path: "coffee.tmLanguage.json",
    samplePath: "coffee.sample",
    embeddedLangs: ["javascript"]
  },
  {
    id: "cpp",
    scopeName: "source.cpp",
    path: "cpp.tmLanguage.json",
    samplePath: "cpp.sample",
    embeddedLangs: ["sql"]
  },
  {
    id: "crystal",
    scopeName: "source.crystal",
    path: "crystal.tmLanguage.json",
    samplePath: "crystal.sample",
    embeddedLangs: ["html", "sql", "css", "c", "javascript", "shellscript"]
  },
  {
    id: "csharp",
    scopeName: "source.cs",
    path: "csharp.tmLanguage.json",
    samplePath: "csharp.sample",
    aliases: ["c#"]
  },
  {
    id: "css",
    scopeName: "source.css",
    path: "css.tmLanguage.json",
    samplePath: "css.sample"
  },
  {
    id: "cue",
    scopeName: "source.cue",
    path: "cue.tmLanguage.json",
    samplePath: "cue.sample"
  },
  {
    id: "d",
    scopeName: "source.d",
    path: "d.tmLanguage.json",
    samplePath: "d.sample"
  },
  {
    id: "dart",
    scopeName: "source.dart",
    path: "dart.tmLanguage.json",
    samplePath: "dart.sample"
  },
  {
    id: "diff",
    scopeName: "source.diff",
    path: "diff.tmLanguage.json",
    samplePath: "diff.sample"
  },
  {
    id: "docker",
    scopeName: "source.dockerfile",
    path: "docker.tmLanguage.json",
    samplePath: "docker.sample"
  },
  {
    id: "dream-maker",
    scopeName: "source.dm",
    path: "dream-maker.tmLanguage.json"
  },
  {
    id: "elixir",
    scopeName: "source.elixir",
    path: "elixir.tmLanguage.json",
    samplePath: "elixir.sample",
    embeddedLangs: ["html"]
  },
  {
    id: "elm",
    scopeName: "source.elm",
    path: "elm.tmLanguage.json",
    samplePath: "elm.sample"
  },
  {
    id: "erb",
    scopeName: "text.html.erb",
    path: "erb.tmLanguage.json",
    samplePath: "erb.sample",
    embeddedLangs: ["html", "ruby"]
  },
  {
    id: "erlang",
    scopeName: "source.erlang",
    path: "erlang.tmLanguage.json",
    samplePath: "erlang.sample"
  },
  {
    id: "fish",
    scopeName: "source.fish",
    path: "fish.tmLanguage.json",
    samplePath: "fish.sample"
  },
  {
    id: "fsharp",
    scopeName: "source.fsharp",
    path: "fsharp.tmLanguage.json",
    samplePath: "fsharp.sample",
    aliases: ["f#"],
    embeddedLangs: ["markdown"]
  },
  {
    id: "gherkin",
    scopeName: "text.gherkin.feature",
    path: "gherkin.tmLanguage.json"
  },
  {
    id: "git-commit",
    scopeName: "text.git-commit",
    path: "git-commit.tmLanguage.json",
    embeddedLangs: ["diff"]
  },
  {
    id: "git-rebase",
    scopeName: "text.git-rebase",
    path: "git-rebase.tmLanguage.json",
    embeddedLangs: ["shellscript"]
  },
  {
    id: "gnuplot",
    scopeName: "source.gnuplot",
    path: "gnuplot.tmLanguage.json"
  },
  {
    id: "go",
    scopeName: "source.go",
    path: "go.tmLanguage.json",
    samplePath: "go.sample"
  },
  {
    id: "graphql",
    scopeName: "source.graphql",
    path: "graphql.tmLanguage.json",
    embeddedLangs: ["javascript", "typescript", "jsx", "tsx"]
  },
  {
    id: "groovy",
    scopeName: "source.groovy",
    path: "groovy.tmLanguage.json"
  },
  {
    id: "hack",
    scopeName: "source.hack",
    path: "hack.tmLanguage.json",
    embeddedLangs: ["html", "sql"]
  },
  {
    id: "haml",
    scopeName: "text.haml",
    path: "haml.tmLanguage.json",
    embeddedLangs: ["ruby", "javascript", "sass", "coffee", "markdown", "css"]
  },
  {
    id: "handlebars",
    scopeName: "text.html.handlebars",
    path: "handlebars.tmLanguage.json",
    aliases: ["hbs"],
    embeddedLangs: ["html", "css", "javascript", "yaml"]
  },
  {
    id: "haskell",
    scopeName: "source.haskell",
    path: "haskell.tmLanguage.json"
  },
  {
    id: "hcl",
    scopeName: "source.hcl",
    path: "hcl.tmLanguage.json"
  },
  {
    id: "hlsl",
    scopeName: "source.hlsl",
    path: "hlsl.tmLanguage.json"
  },
  {
    id: "html",
    scopeName: "text.html.basic",
    path: "html.tmLanguage.json",
    samplePath: "html.sample",
    embeddedLangs: ["javascript", "css"]
  },
  {
    id: "ini",
    scopeName: "source.ini",
    path: "ini.tmLanguage.json"
  },
  {
    id: "java",
    scopeName: "source.java",
    path: "java.tmLanguage.json",
    samplePath: "java.sample"
  },
  {
    id: "javascript",
    scopeName: "source.js",
    path: "javascript.tmLanguage.json",
    samplePath: "javascript.sample",
    aliases: ["js"]
  },
  {
    id: "jinja-html",
    scopeName: "text.html.jinja",
    path: "jinja-html.tmLanguage.json",
    embeddedLangs: ["html"]
  },
  {
    id: "json",
    scopeName: "source.json",
    path: "json.tmLanguage.json"
  },
  {
    id: "jsonc",
    scopeName: "source.json.comments",
    path: "jsonc.tmLanguage.json"
  },
  {
    id: "jsonnet",
    scopeName: "source.jsonnet",
    path: "jsonnet.tmLanguage.json"
  },
  {
    id: "jssm",
    scopeName: "source.jssm",
    path: "jssm.tmLanguage.json",
    samplePath: "jssm.sample",
    aliases: ["fsl"]
  },
  {
    id: "jsx",
    scopeName: "source.js.jsx",
    path: "jsx.tmLanguage.json"
  },
  {
    id: "julia",
    scopeName: "source.julia",
    path: "julia.tmLanguage.json",
    embeddedLangs: ["cpp", "python", "javascript", "r", "sql"]
  },
  {
    id: "jupyter",
    scopeName: "source.jupyter",
    path: "jupyter.tmLanguage.json",
    embeddedLangs: ["json"]
  },
  {
    id: "kotlin",
    scopeName: "source.kotlin",
    path: "kotlin.tmLanguage.json"
  },
  {
    id: "latex",
    scopeName: "text.tex.latex",
    path: "latex.tmLanguage.json",
    embeddedLangs: ["tex", "css", "html", "java", "javascript", "typescript", "lua", "python", "julia", "ruby", "xml", "yaml", "cpp", "haskell", "scala", "gnuplot"]
  },
  {
    id: "less",
    scopeName: "source.css.less",
    path: "less.tmLanguage.json",
    embeddedLangs: ["css"]
  },
  {
    id: "lisp",
    scopeName: "source.lisp",
    path: "lisp.tmLanguage.json"
  },
  {
    id: "logo",
    scopeName: "source.logo",
    path: "logo.tmLanguage.json"
  },
  {
    id: "lua",
    scopeName: "source.lua",
    path: "lua.tmLanguage.json",
    embeddedLangs: ["c"]
  },
  {
    id: "make",
    scopeName: "source.makefile",
    path: "make.tmLanguage.json",
    aliases: ["makefile"]
  },
  {
    id: "markdown",
    scopeName: "text.html.markdown",
    path: "markdown.tmLanguage.json",
    aliases: ["md"],
    embeddedLangs: ["css", "html", "ini", "java", "lua", "make", "perl", "r", "ruby", "php", "sql", "vb", "xml", "xsl", "yaml", "bat", "clojure", "coffee", "c", "cpp", "diff", "docker", "git-commit", "git-rebase", "go", "groovy", "pug", "javascript", "json", "jsonc", "less", "objective-c", "swift", "scss", "raku", "powershell", "python", "rust", "scala", "shellscript", "typescript", "tsx", "csharp", "fsharp", "dart", "handlebars", "erlang", "elixir", "latex", "bibtex"]
  },
  {
    id: "marko",
    scopeName: "text.marko",
    path: "marko.tmLanguage.json",
    samplePath: "marko.sample",
    embeddedLangs: ["css", "less", "scss", "javascript"]
  },
  {
    id: "matlab",
    scopeName: "source.matlab",
    path: "matlab.tmLanguage.json"
  },
  {
    id: "mdx",
    scopeName: "text.html.markdown.jsx",
    path: "mdx.tmLanguage.json",
    embeddedLangs: ["jsx", "markdown"]
  },
  {
    id: "nginx",
    scopeName: "source.nginx",
    path: "nginx.tmLanguage.json",
    embeddedLangs: ["lua"]
  },
  {
    id: "nim",
    scopeName: "source.nim",
    path: "nim.tmLanguage.json",
    embeddedLangs: ["c", "html", "xml", "javascript", "css", "markdown"]
  },
  {
    id: "nix",
    scopeName: "source.nix",
    path: "nix.tmLanguage.json"
  },
  {
    id: "objective-c",
    scopeName: "source.objc",
    path: "objective-c.tmLanguage.json",
    aliases: ["objc"]
  },
  {
    id: "objective-cpp",
    scopeName: "source.objcpp",
    path: "objective-cpp.tmLanguage.json"
  },
  {
    id: "ocaml",
    scopeName: "source.ocaml",
    path: "ocaml.tmLanguage.json"
  },
  {
    id: "pascal",
    scopeName: "source.pascal",
    path: "pascal.tmLanguage.json"
  },
  {
    id: "perl",
    scopeName: "source.perl",
    path: "perl.tmLanguage.json",
    embeddedLangs: ["html", "xml", "css", "javascript", "sql"]
  },
  {
    id: "php",
    scopeName: "source.php",
    path: "php.tmLanguage.json",
    embeddedLangs: ["html", "xml", "sql", "javascript", "json", "css"]
  },
  {
    id: "plsql",
    scopeName: "source.plsql.oracle",
    path: "plsql.tmLanguage.json"
  },
  {
    id: "postcss",
    scopeName: "source.css.postcss",
    path: "postcss.tmLanguage.json"
  },
  {
    id: "powershell",
    scopeName: "source.powershell",
    path: "powershell.tmLanguage.json",
    aliases: ["ps", "ps1"]
  },
  {
    id: "prisma",
    scopeName: "source.prisma",
    path: "prisma.tmLanguage.json",
    samplePath: "prisma.sample"
  },
  {
    id: "prolog",
    scopeName: "source.prolog",
    path: "prolog.tmLanguage.json"
  },
  {
    id: "pug",
    scopeName: "text.pug",
    path: "pug.tmLanguage.json",
    aliases: ["jade"],
    embeddedLangs: ["javascript", "css", "sass", "stylus", "coffee", "html"]
  },
  {
    id: "puppet",
    scopeName: "source.puppet",
    path: "puppet.tmLanguage.json"
  },
  {
    id: "purescript",
    scopeName: "source.purescript",
    path: "purescript.tmLanguage.json"
  },
  {
    id: "python",
    scopeName: "source.python",
    path: "python.tmLanguage.json",
    samplePath: "python.sample",
    aliases: ["py"]
  },
  {
    id: "r",
    scopeName: "source.r",
    path: "r.tmLanguage.json"
  },
  {
    id: "raku",
    scopeName: "source.perl.6",
    path: "raku.tmLanguage.json",
    aliases: ["perl6"]
  },
  {
    id: "razor",
    scopeName: "text.aspnetcorerazor",
    path: "razor.tmLanguage.json",
    embeddedLangs: ["html", "csharp"]
  },
  {
    id: "rel",
    scopeName: "source.rel",
    path: "rel.tmLanguage.json",
    samplePath: "rel.sample"
  },
  {
    id: "riscv",
    scopeName: "source.riscv",
    path: "riscv.tmLanguage.json"
  },
  {
    id: "ruby",
    scopeName: "source.ruby",
    path: "ruby.tmLanguage.json",
    samplePath: "ruby.sample",
    aliases: ["rb"],
    embeddedLangs: ["html", "xml", "sql", "css", "c", "javascript", "shellscript", "lua"]
  },
  {
    id: "rust",
    scopeName: "source.rust",
    path: "rust.tmLanguage.json",
    aliases: ["rs"]
  },
  {
    id: "sas",
    scopeName: "source.sas",
    path: "sas.tmLanguage.json",
    embeddedLangs: ["sql"]
  },
  {
    id: "sass",
    scopeName: "source.sass",
    path: "sass.tmLanguage.json"
  },
  {
    id: "scala",
    scopeName: "source.scala",
    path: "scala.tmLanguage.json"
  },
  {
    id: "scheme",
    scopeName: "source.scheme",
    path: "scheme.tmLanguage.json"
  },
  {
    id: "scss",
    scopeName: "source.css.scss",
    path: "scss.tmLanguage.json",
    embeddedLangs: ["css"]
  },
  {
    id: "shaderlab",
    scopeName: "source.shaderlab",
    path: "shaderlab.tmLanguage.json",
    aliases: ["shader"],
    embeddedLangs: ["hlsl"]
  },
  {
    id: "shellscript",
    scopeName: "source.shell",
    path: "shellscript.tmLanguage.json",
    aliases: ["shell", "bash", "sh", "zsh"],
    embeddedLangs: ["ruby", "python", "applescript", "html", "markdown"]
  },
  {
    id: "smalltalk",
    scopeName: "source.smalltalk",
    path: "smalltalk.tmLanguage.json"
  },
  {
    id: "solidity",
    scopeName: "source.solidity",
    path: "solidity.tmLanguage.json"
  },
  {
    id: "sparql",
    scopeName: "source.sparql",
    path: "sparql.tmLanguage.json",
    samplePath: "sparql.sample",
    embeddedLangs: ["turtle"]
  },
  {
    id: "sql",
    scopeName: "source.sql",
    path: "sql.tmLanguage.json"
  },
  {
    id: "ssh-config",
    scopeName: "source.ssh-config",
    path: "ssh-config.tmLanguage.json"
  },
  {
    id: "stata",
    scopeName: "source.stata",
    path: "stata.tmLanguage.json",
    samplePath: "stata.sample",
    embeddedLangs: ["sql"]
  },
  {
    id: "stylus",
    scopeName: "source.stylus",
    path: "stylus.tmLanguage.json",
    aliases: ["styl"]
  },
  {
    id: "svelte",
    scopeName: "source.svelte",
    path: "svelte.tmLanguage.json",
    embeddedLangs: ["javascript", "typescript", "coffee", "stylus", "sass", "css", "scss", "less", "postcss", "pug", "markdown"]
  },
  {
    id: "swift",
    scopeName: "source.swift",
    path: "swift.tmLanguage.json"
  },
  {
    id: "system-verilog",
    scopeName: "source.systemverilog",
    path: "system-verilog.tmLanguage.json"
  },
  {
    id: "tasl",
    scopeName: "source.tasl",
    path: "tasl.tmLanguage.json",
    samplePath: "tasl.sample"
  },
  {
    id: "tcl",
    scopeName: "source.tcl",
    path: "tcl.tmLanguage.json"
  },
  {
    id: "tex",
    scopeName: "text.tex",
    path: "tex.tmLanguage.json",
    embeddedLangs: ["r"]
  },
  {
    id: "toml",
    scopeName: "source.toml",
    path: "toml.tmLanguage.json"
  },
  {
    id: "tsx",
    scopeName: "source.tsx",
    path: "tsx.tmLanguage.json",
    samplePath: "tsx.sample"
  },
  {
    id: "turtle",
    scopeName: "source.turtle",
    path: "turtle.tmLanguage.json",
    samplePath: "turtle.sample"
  },
  {
    id: "twig",
    scopeName: "text.html.twig",
    path: "twig.tmLanguage.json",
    embeddedLangs: ["css", "javascript", "php", "python", "ruby"]
  },
  {
    id: "typescript",
    scopeName: "source.ts",
    path: "typescript.tmLanguage.json",
    aliases: ["ts"]
  },
  {
    id: "vb",
    scopeName: "source.asp.vb.net",
    path: "vb.tmLanguage.json",
    aliases: ["cmd"]
  },
  {
    id: "verilog",
    scopeName: "source.verilog",
    path: "verilog.tmLanguage.json"
  },
  {
    id: "vhdl",
    scopeName: "source.vhdl",
    path: "vhdl.tmLanguage.json"
  },
  {
    id: "viml",
    scopeName: "source.viml",
    path: "viml.tmLanguage.json",
    aliases: ["vim", "vimscript"]
  },
  {
    id: "vue-html",
    scopeName: "text.html.vue-html",
    path: "vue-html.tmLanguage.json",
    embeddedLangs: ["vue", "javascript"]
  },
  {
    id: "vue",
    scopeName: "source.vue",
    path: "vue.tmLanguage.json",
    embeddedLangs: ["json", "markdown", "pug", "haml", "vue-html", "sass", "scss", "less", "stylus", "postcss", "css", "typescript", "coffee", "javascript"]
  },
  {
    id: "wasm",
    scopeName: "source.wat",
    path: "wasm.tmLanguage.json"
  },
  {
    id: "wenyan",
    scopeName: "source.wenyan",
    path: "wenyan.tmLanguage.json",
    aliases: ["\u6587\u8A00"]
  },
  {
    id: "xml",
    scopeName: "text.xml",
    path: "xml.tmLanguage.json",
    embeddedLangs: ["java"]
  },
  {
    id: "xsl",
    scopeName: "text.xml.xsl",
    path: "xsl.tmLanguage.json",
    embeddedLangs: ["xml"]
  },
  {
    id: "yaml",
    scopeName: "source.yaml",
    path: "yaml.tmLanguage.json"
  },
  {
    id: "zenscript",
    scopeName: "source.zenscript",
    path: "zenscript.tmLanguage.json",
    samplePath: "zenscript.sample"
  }
];
var FontStyle;
(function(FontStyle2) {
  FontStyle2[FontStyle2["NotSet"] = -1] = "NotSet";
  FontStyle2[FontStyle2["None"] = 0] = "None";
  FontStyle2[FontStyle2["Italic"] = 1] = "Italic";
  FontStyle2[FontStyle2["Bold"] = 2] = "Bold";
  FontStyle2[FontStyle2["Underline"] = 4] = "Underline";
})(FontStyle || (FontStyle = {}));
class StackElementMetadata {
  static toBinaryStr(metadata) {
    let r2 = metadata.toString(2);
    while (r2.length < 32) {
      r2 = "0" + r2;
    }
    return r2;
  }
  static printMetadata(metadata) {
    let languageId = StackElementMetadata.getLanguageId(metadata);
    let tokenType = StackElementMetadata.getTokenType(metadata);
    let fontStyle2 = StackElementMetadata.getFontStyle(metadata);
    let foreground = StackElementMetadata.getForeground(metadata);
    let background = StackElementMetadata.getBackground(metadata);
    console.log({
      languageId,
      tokenType,
      fontStyle: fontStyle2,
      foreground,
      background
    });
  }
  static getLanguageId(metadata) {
    return (metadata & 255) >>> 0;
  }
  static getTokenType(metadata) {
    return (metadata & 1792) >>> 8;
  }
  static getFontStyle(metadata) {
    return (metadata & 14336) >>> 11;
  }
  static getForeground(metadata) {
    return (metadata & 8372224) >>> 14;
  }
  static getBackground(metadata) {
    return (metadata & 4286578688) >>> 23;
  }
  static set(metadata, languageId, tokenType, fontStyle2, foreground, background) {
    let _languageId = StackElementMetadata.getLanguageId(metadata);
    let _tokenType = StackElementMetadata.getTokenType(metadata);
    let _fontStyle = StackElementMetadata.getFontStyle(metadata);
    let _foreground = StackElementMetadata.getForeground(metadata);
    let _background = StackElementMetadata.getBackground(metadata);
    if (languageId !== 0) {
      _languageId = languageId;
    }
    if (tokenType !== 0) {
      _tokenType = tokenType === 8 ? 0 : tokenType;
    }
    if (fontStyle2 !== FontStyle.NotSet) {
      _fontStyle = fontStyle2;
    }
    if (foreground !== 0) {
      _foreground = foreground;
    }
    if (background !== 0) {
      _background = background;
    }
    return (_languageId << 0 | _tokenType << 8 | _fontStyle << 11 | _foreground << 14 | _background << 23) >>> 0;
  }
}
function trimEndSlash(str) {
  if (str.endsWith("/") || str.endsWith("\\"))
    return str.slice(0, -1);
  return str;
}
function trimStartDot(str) {
  if (str.startsWith("./"))
    return str.slice(2);
  return str;
}
function dirname(str) {
  const parts = str.split(/[\/\\]/g);
  return parts[parts.length - 2];
}
function join(...parts) {
  return parts.map(trimEndSlash).map(trimStartDot).join("/");
}
function groupBy(elements, keyGetter) {
  const map2 = /* @__PURE__ */ new Map();
  for (const element2 of elements) {
    const key = keyGetter(element2);
    if (map2.has(key)) {
      const group = map2.get(key);
      group.push(element2);
    } else {
      map2.set(key, [element2]);
    }
  }
  return map2;
}
function createScanner(text2, ignoreTrivia) {
  if (ignoreTrivia === void 0) {
    ignoreTrivia = false;
  }
  var len = text2.length;
  var pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count2, exact) {
    var digits = 0;
    var value2 = 0;
    while (digits < count2 || !exact) {
      var ch = text2.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count2) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    var start = pos;
    if (text2.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text2.length && text2.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
        pos++;
        while (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text2.substring(start, pos);
      }
    }
    var end = pos;
    if (pos < text2.length && (text2.charCodeAt(pos) === 69 || text2.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text2.length && text2.charCodeAt(pos) === 43 || text2.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
        pos++;
        while (pos < text2.length && isDigit(text2.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text2.substring(start, end);
  }
  function scanString() {
    var result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text2.substring(start, pos);
        scanError = 2;
        break;
      }
      var ch = text2.charCodeAt(pos);
      if (ch === 34) {
        result += text2.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text2.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        var ch2 = text2.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            var ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text2.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token = 17;
    }
    var code = text2.charCodeAt(pos);
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text2.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token = 15;
    }
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && text2.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code) {
      case 123:
        pos++;
        return token = 1;
      case 125:
        pos++;
        return token = 2;
      case 91:
        pos++;
        return token = 3;
      case 93:
        pos++;
        return token = 4;
      case 58:
        pos++;
        return token = 6;
      case 44:
        pos++;
        return token = 5;
      case 34:
        pos++;
        value = scanString();
        return token = 10;
      case 47:
        var start = pos - 1;
        if (text2.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text2.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text2.substring(start, pos);
          return token = 12;
        }
        if (text2.charCodeAt(pos + 1) === 42) {
          pos += 2;
          var safeLength = len - 1;
          var commentClosed = false;
          while (pos < safeLength) {
            var ch = text2.charCodeAt(pos);
            if (ch === 42 && text2.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text2.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text2.substring(start, pos);
          return token = 13;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
      case 45:
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text2.charCodeAt(pos))) {
          return token = 16;
        }
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token = 11;
      default:
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text2.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text2.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token = 8;
            case "false":
              return token = 9;
            case "null":
              return token = 7;
          }
          return token = 16;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    var result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition,
    getPosition: function() {
      return pos;
    },
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: function() {
      return token;
    },
    getTokenValue: function() {
      return value;
    },
    getTokenOffset: function() {
      return tokenOffset;
    },
    getTokenLength: function() {
      return pos - tokenOffset;
    },
    getTokenStartLine: function() {
      return lineStartOffset;
    },
    getTokenStartCharacter: function() {
      return tokenOffset - prevTokenLineStartOffset;
    },
    getTokenError: function() {
      return scanError;
    }
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch === 5760 || ch >= 8192 && ch <= 8203 || ch === 8239 || ch === 8287 || ch === 12288 || ch === 65279;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var ParseOptions;
(function(ParseOptions2) {
  ParseOptions2.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
function parse$1(text2, errors, options) {
  if (errors === void 0) {
    errors = [];
  }
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }
  var currentProperty = null;
  var currentParent = [];
  var previousParents = [];
  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }
  var visitor = {
    onObjectBegin: function() {
      var object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: function(name) {
      currentProperty = name;
    },
    onObjectEnd: function() {
      currentParent = previousParents.pop();
    },
    onArrayBegin: function() {
      var array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: function() {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: function(error, offset2, length) {
      errors.push({ error, offset: offset2, length });
    }
  };
  visit(text2, visitor, options);
  return currentParent[0];
}
function visit(text2, visitor, options) {
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }
  var _scanner = createScanner(text2, false);
  function toNoArgVisit(visitFunction) {
    return visitFunction ? function() {
      return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function() {
      return true;
    };
  }
  function toOneArgVisit(visitFunction) {
    return visitFunction ? function(arg) {
      return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function() {
      return true;
    };
  }
  var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
  var disallowComments = options && options.disallowComments;
  var allowTrailingComma = options && options.allowTrailingComma;
  function scanNext() {
    while (true) {
      var token = _scanner.scan();
      switch (_scanner.getTokenError()) {
        case 4:
          handleError2(14);
          break;
        case 5:
          handleError2(15);
          break;
        case 3:
          handleError2(13);
          break;
        case 1:
          if (!disallowComments) {
            handleError2(11);
          }
          break;
        case 2:
          handleError2(12);
          break;
        case 6:
          handleError2(16);
          break;
      }
      switch (token) {
        case 12:
        case 13:
          if (disallowComments) {
            handleError2(10);
          } else {
            onComment();
          }
          break;
        case 16:
          handleError2(1);
          break;
        case 15:
        case 14:
          break;
        default:
          return token;
      }
    }
  }
  function handleError2(error, skipUntilAfter, skipUntil) {
    if (skipUntilAfter === void 0) {
      skipUntilAfter = [];
    }
    if (skipUntil === void 0) {
      skipUntil = [];
    }
    onError(error);
    if (skipUntilAfter.length + skipUntil.length > 0) {
      var token = _scanner.getToken();
      while (token !== 17) {
        if (skipUntilAfter.indexOf(token) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token) !== -1) {
          break;
        }
        token = scanNext();
      }
    }
  }
  function parseString2(isValue) {
    var value = _scanner.getTokenValue();
    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
    }
    scanNext();
    return true;
  }
  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11:
        var tokenValue = _scanner.getTokenValue();
        var value = Number(tokenValue);
        if (isNaN(value)) {
          handleError2(2);
          value = 0;
        }
        onLiteralValue(value);
        break;
      case 7:
        onLiteralValue(null);
        break;
      case 8:
        onLiteralValue(true);
        break;
      case 9:
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    scanNext();
    return true;
  }
  function parseProperty() {
    if (_scanner.getToken() !== 10) {
      handleError2(3, [], [2, 5]);
      return false;
    }
    parseString2(false);
    if (_scanner.getToken() === 6) {
      onSeparator(":");
      scanNext();
      if (!parseValue()) {
        handleError2(4, [], [2, 5]);
      }
    } else {
      handleError2(5, [], [2, 5]);
    }
    return true;
  }
  function parseObject() {
    onObjectBegin();
    scanNext();
    var needsComma = false;
    while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError2(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 2 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError2(6, [], []);
      }
      if (!parseProperty()) {
        handleError2(4, [], [2, 5]);
      }
      needsComma = true;
    }
    onObjectEnd();
    if (_scanner.getToken() !== 2) {
      handleError2(7, [2], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseArray() {
    onArrayBegin();
    scanNext();
    var needsComma = false;
    while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError2(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 4 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError2(6, [], []);
      }
      if (!parseValue()) {
        handleError2(4, [], [4, 5]);
      }
      needsComma = true;
    }
    onArrayEnd();
    if (_scanner.getToken() !== 4) {
      handleError2(8, [4], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseValue() {
    switch (_scanner.getToken()) {
      case 3:
        return parseArray();
      case 1:
        return parseObject();
      case 10:
        return parseString2(true);
      default:
        return parseLiteral();
    }
  }
  scanNext();
  if (_scanner.getToken() === 17) {
    if (options.allowEmptyContent) {
      return true;
    }
    handleError2(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError2(4, [], []);
    return false;
  }
  if (_scanner.getToken() !== 17) {
    handleError2(9, [], []);
  }
  return true;
}
var parse = parse$1;
const isWebWorker = typeof self !== "undefined" && typeof self.WorkerGlobalScope !== "undefined";
const isBrowser = isWebWorker || typeof window !== "undefined" && typeof window.document !== "undefined" && typeof fetch !== "undefined";
let CDN_ROOT = "";
function setCDN(root) {
  CDN_ROOT = root;
}
let _onigurumaPromise = null;
async function getOniguruma() {
  if (!_onigurumaPromise) {
    let loader;
    if (isBrowser) {
      {
        loader = main$1.exports.loadWASM({
          data: await fetch(_resolvePath("dist/onig.wasm")).then((r2) => r2.arrayBuffer())
        });
      }
    } else {
      const path = require("path");
      const wasmPath = path.join(require.resolve("vscode-oniguruma"), "../onig.wasm");
      const fs = require("fs");
      const wasmBin = fs.readFileSync(wasmPath).buffer;
      loader = main$1.exports.loadWASM(wasmBin);
    }
    _onigurumaPromise = loader.then(() => {
      return {
        createOnigScanner(patterns) {
          return main$1.exports.createOnigScanner(patterns);
        },
        createOnigString(s) {
          return main$1.exports.createOnigString(s);
        }
      };
    });
  }
  return _onigurumaPromise;
}
function _resolvePath(filepath) {
  if (isBrowser) {
    if (!CDN_ROOT) {
      console.warn("[Shiki] no CDN provider found, use `setCDN()` to specify the CDN for loading the resources before calling `getHighlighter()`");
    }
    return `${CDN_ROOT}${filepath}`;
  } else {
    const path = require("path");
    if (path.isAbsolute(filepath)) {
      return filepath;
    } else {
      return path.resolve(__dirname, "..", filepath);
    }
  }
}
async function _fetchAssets(filepath) {
  const path = _resolvePath(filepath);
  if (isBrowser) {
    return await fetch(path).then((r2) => r2.text());
  } else {
    const fs = require("fs");
    return await fs.promises.readFile(path, "utf-8");
  }
}
async function _fetchJSONAssets(filepath) {
  const errors = [];
  const rawTheme = parse(await _fetchAssets(filepath), errors, {
    allowTrailingComma: true
  });
  if (errors.length) {
    throw errors[0];
  }
  return rawTheme;
}
async function fetchTheme(themePath) {
  let theme = await _fetchJSONAssets(themePath);
  const shikiTheme = toShikiTheme(theme);
  if (shikiTheme.include) {
    const includedTheme = await fetchTheme(join(dirname(themePath), shikiTheme.include));
    if (includedTheme.settings) {
      shikiTheme.settings = includedTheme.settings.concat(shikiTheme.settings);
    }
    if (includedTheme.bg && !shikiTheme.bg) {
      shikiTheme.bg = includedTheme.bg;
    }
    if (includedTheme.colors) {
      shikiTheme.colors = Object.assign(Object.assign({}, includedTheme.colors), shikiTheme.colors);
    }
    delete shikiTheme.include;
  }
  return shikiTheme;
}
async function fetchGrammar(filepath) {
  return await _fetchJSONAssets(filepath);
}
function repairTheme(theme) {
  if (!theme.settings)
    theme.settings = [];
  if (theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope) {
    return;
  }
  theme.settings.unshift({
    settings: {
      foreground: theme.fg,
      background: theme.bg
    }
  });
}
function toShikiTheme(rawTheme) {
  const type = rawTheme.type || "dark";
  const shikiTheme = Object.assign(Object.assign({ name: rawTheme.name, type }, rawTheme), getThemeDefaultColors(rawTheme));
  if (rawTheme.include) {
    shikiTheme.include = rawTheme.include;
  }
  if (rawTheme.tokenColors) {
    shikiTheme.settings = rawTheme.tokenColors;
    delete shikiTheme.tokenColors;
  }
  repairTheme(shikiTheme);
  return shikiTheme;
}
const VSCODE_FALLBACK_EDITOR_FG = { light: "#333333", dark: "#bbbbbb" };
const VSCODE_FALLBACK_EDITOR_BG = { light: "#fffffe", dark: "#1e1e1e" };
function getThemeDefaultColors(theme) {
  var _a2, _b, _c, _d, _e, _f2;
  let fg, bg;
  let settings = theme.settings ? theme.settings : theme.tokenColors;
  const globalSetting = settings ? settings.find((s) => {
    return !s.name && !s.scope;
  }) : void 0;
  if ((_a2 = globalSetting === null || globalSetting === void 0 ? void 0 : globalSetting.settings) === null || _a2 === void 0 ? void 0 : _a2.foreground) {
    fg = globalSetting.settings.foreground;
  }
  if ((_b = globalSetting === null || globalSetting === void 0 ? void 0 : globalSetting.settings) === null || _b === void 0 ? void 0 : _b.background) {
    bg = globalSetting.settings.background;
  }
  if (!fg && ((_d = (_c = theme) === null || _c === void 0 ? void 0 : _c.colors) === null || _d === void 0 ? void 0 : _d["editor.foreground"])) {
    fg = theme.colors["editor.foreground"];
  }
  if (!bg && ((_f2 = (_e = theme) === null || _e === void 0 ? void 0 : _e.colors) === null || _f2 === void 0 ? void 0 : _f2["editor.background"])) {
    bg = theme.colors["editor.background"];
  }
  if (!fg) {
    fg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
  }
  if (!bg) {
    bg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
  }
  return {
    fg,
    bg
  };
}
class Resolver {
  constructor(onigLibPromise, onigLibName) {
    this.languagesPath = "languages/";
    this.languageMap = {};
    this.scopeToLangMap = {};
    this._onigLibPromise = onigLibPromise;
    this._onigLibName = onigLibName;
  }
  get onigLib() {
    return this._onigLibPromise;
  }
  getOnigLibName() {
    return this._onigLibName;
  }
  getLangRegistration(langIdOrAlias) {
    return this.languageMap[langIdOrAlias];
  }
  async loadGrammar(scopeName) {
    const lang = this.scopeToLangMap[scopeName];
    if (!lang) {
      return null;
    }
    if (lang.grammar) {
      return lang.grammar;
    }
    const g = await fetchGrammar(languages.includes(lang) ? `${this.languagesPath}${lang.path}` : lang.path);
    lang.grammar = g;
    return g;
  }
  addLanguage(l) {
    this.languageMap[l.id] = l;
    if (l.aliases) {
      l.aliases.forEach((a2) => {
        this.languageMap[a2] = l;
      });
    }
    this.scopeToLangMap[l.scopeName] = l;
  }
}
function tokenizeWithTheme(theme, colorMap, fileContents, grammar, options) {
  let lines = fileContents.split(/\r\n|\r|\n/);
  let ruleStack = main.exports.INITIAL;
  let actual = [];
  let final = [];
  for (let i2 = 0, len = lines.length; i2 < len; i2++) {
    let line = lines[i2];
    if (line === "") {
      actual = [];
      final.push([]);
      continue;
    }
    let resultWithScopes;
    let tokensWithScopes;
    let tokensWithScopesIndex;
    if (options.includeExplanation) {
      resultWithScopes = grammar.tokenizeLine(line, ruleStack);
      tokensWithScopes = resultWithScopes.tokens;
      tokensWithScopesIndex = 0;
    }
    let result = grammar.tokenizeLine2(line, ruleStack);
    let tokensLength = result.tokens.length / 2;
    for (let j2 = 0; j2 < tokensLength; j2++) {
      let startIndex = result.tokens[2 * j2];
      let nextStartIndex = j2 + 1 < tokensLength ? result.tokens[2 * j2 + 2] : line.length;
      if (startIndex === nextStartIndex) {
        continue;
      }
      let metadata = result.tokens[2 * j2 + 1];
      let foreground = StackElementMetadata.getForeground(metadata);
      let foregroundColor = colorMap[foreground];
      let fontStyle2 = StackElementMetadata.getFontStyle(metadata);
      let explanation = [];
      if (options.includeExplanation) {
        let offset2 = 0;
        while (startIndex + offset2 < nextStartIndex) {
          let tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
          let tokenWithScopesText = line.substring(tokenWithScopes.startIndex, tokenWithScopes.endIndex);
          offset2 += tokenWithScopesText.length;
          explanation.push({
            content: tokenWithScopesText,
            scopes: explainThemeScopes(theme, tokenWithScopes.scopes)
          });
          tokensWithScopesIndex++;
        }
      }
      actual.push({
        content: line.substring(startIndex, nextStartIndex),
        color: foregroundColor,
        fontStyle: fontStyle2,
        explanation
      });
    }
    final.push(actual);
    actual = [];
    ruleStack = result.ruleStack;
  }
  return final;
}
function explainThemeScopes(theme, scopes) {
  let result = [];
  for (let i2 = 0, len = scopes.length; i2 < len; i2++) {
    let parentScopes = scopes.slice(0, i2);
    let scope = scopes[i2];
    result[i2] = {
      scopeName: scope,
      themeMatches: explainThemeScope(theme, scope, parentScopes)
    };
  }
  return result;
}
function matchesOne(selector, scope) {
  let selectorPrefix = selector + ".";
  if (selector === scope || scope.substring(0, selectorPrefix.length) === selectorPrefix) {
    return true;
  }
  return false;
}
function matches(selector, selectorParentScopes, scope, parentScopes) {
  if (!matchesOne(selector, scope)) {
    return false;
  }
  let selectorParentIndex = selectorParentScopes.length - 1;
  let parentIndex = parentScopes.length - 1;
  while (selectorParentIndex >= 0 && parentIndex >= 0) {
    if (matchesOne(selectorParentScopes[selectorParentIndex], parentScopes[parentIndex])) {
      selectorParentIndex--;
    }
    parentIndex--;
  }
  if (selectorParentIndex === -1) {
    return true;
  }
  return false;
}
function explainThemeScope(theme, scope, parentScopes) {
  let result = [], resultLen = 0;
  for (let i2 = 0, len = theme.settings.length; i2 < len; i2++) {
    let setting = theme.settings[i2];
    let selectors;
    if (typeof setting.scope === "string") {
      selectors = setting.scope.split(/,/).map((scope2) => scope2.trim());
    } else if (Array.isArray(setting.scope)) {
      selectors = setting.scope;
    } else {
      continue;
    }
    for (let j2 = 0, lenJ = selectors.length; j2 < lenJ; j2++) {
      let rawSelector = selectors[j2];
      let rawSelectorPieces = rawSelector.split(/ /);
      let selector = rawSelectorPieces[rawSelectorPieces.length - 1];
      let selectorParentScopes = rawSelectorPieces.slice(0, rawSelectorPieces.length - 1);
      if (matches(selector, selectorParentScopes, scope, parentScopes)) {
        result[resultLen++] = setting;
        j2 = lenJ;
      }
    }
  }
  return result;
}
function renderToHtml(lines, options = {}) {
  var _a2;
  const bg = options.bg || "#fff";
  const optionsByLineNumber = groupBy((_a2 = options.lineOptions) !== null && _a2 !== void 0 ? _a2 : [], (option) => option.line);
  let html = "";
  html += `<pre class="shiki" style="background-color: ${bg}">`;
  if (options.langId) {
    html += `<div class="language-id">${options.langId}</div>`;
  }
  html += `<code>`;
  lines.forEach((l, lineIndex) => {
    var _a3;
    const lineNumber = lineIndex + 1;
    const lineOptions = (_a3 = optionsByLineNumber.get(lineNumber)) !== null && _a3 !== void 0 ? _a3 : [];
    const lineClasses = getLineClasses(lineOptions).join(" ");
    html += `<span class="${lineClasses}">`;
    l.forEach((token) => {
      const cssDeclarations = [`color: ${token.color || options.fg}`];
      if (token.fontStyle & FontStyle.Italic) {
        cssDeclarations.push("font-style: italic");
      }
      if (token.fontStyle & FontStyle.Bold) {
        cssDeclarations.push("font-weight: bold");
      }
      if (token.fontStyle & FontStyle.Underline) {
        cssDeclarations.push("text-decoration: underline");
      }
      html += `<span style="${cssDeclarations.join("; ")}">${escapeHtml(token.content)}</span>`;
    });
    html += `</span>
`;
  });
  html = html.replace(/\n*$/, "");
  html += `</code></pre>`;
  return html;
}
const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escapeHtml(html) {
  return html.replace(/[&<>"']/g, (chr) => htmlEscapes[chr]);
}
function getLineClasses(lineOptions) {
  var _a2;
  const lineClasses = /* @__PURE__ */ new Set(["line"]);
  for (const lineOption of lineOptions) {
    for (const lineClass of (_a2 = lineOption.classes) !== null && _a2 !== void 0 ? _a2 : []) {
      lineClasses.add(lineClass);
    }
  }
  return Array.from(lineClasses);
}
class Registry extends main.exports.Registry {
  constructor(_resolver) {
    super(_resolver);
    this._resolver = _resolver;
    this.themesPath = "themes/";
    this._resolvedThemes = {};
    this._resolvedGrammars = {};
  }
  getTheme(theme) {
    if (typeof theme === "string") {
      return this._resolvedThemes[theme];
    } else {
      return theme;
    }
  }
  async loadTheme(theme) {
    if (typeof theme === "string") {
      if (!this._resolvedThemes[theme]) {
        this._resolvedThemes[theme] = await fetchTheme(`${this.themesPath}${theme}.json`);
      }
      return this._resolvedThemes[theme];
    } else {
      theme = toShikiTheme(theme);
      if (theme.name) {
        this._resolvedThemes[theme.name] = theme;
      }
      return theme;
    }
  }
  async loadThemes(themes) {
    return await Promise.all(themes.map((theme) => this.loadTheme(theme)));
  }
  getLoadedThemes() {
    return Object.keys(this._resolvedThemes);
  }
  getGrammar(name) {
    return this._resolvedGrammars[name];
  }
  async loadLanguage(lang) {
    const g = await this.loadGrammar(lang.scopeName);
    this._resolvedGrammars[lang.id] = g;
    if (lang.aliases) {
      lang.aliases.forEach((la2) => {
        this._resolvedGrammars[la2] = g;
      });
    }
  }
  async loadLanguages(langs) {
    for (const lang of langs) {
      this._resolver.addLanguage(lang);
    }
    for (const lang of langs) {
      await this.loadLanguage(lang);
    }
  }
  getLoadedLanguages() {
    return Object.keys(this._resolvedGrammars);
  }
}
function resolveLang(lang) {
  return typeof lang === "string" ? languages.find((l) => {
    var _a2;
    return l.id === lang || ((_a2 = l.aliases) === null || _a2 === void 0 ? void 0 : _a2.includes(lang));
  }) : lang;
}
function resolveOptions(options) {
  var _a2;
  let _languages = languages;
  let _themes = options.themes || [];
  if ((_a2 = options.langs) === null || _a2 === void 0 ? void 0 : _a2.length) {
    _languages = options.langs.map(resolveLang);
  }
  if (options.theme) {
    _themes.unshift(options.theme);
  }
  if (!_themes.length) {
    _themes = ["nord"];
  }
  return { _languages, _themes };
}
async function getHighlighter(options) {
  var _a2, _b;
  const { _languages, _themes } = resolveOptions(options);
  const _resolver = new Resolver(getOniguruma(), "vscode-oniguruma");
  const _registry = new Registry(_resolver);
  if ((_a2 = options.paths) === null || _a2 === void 0 ? void 0 : _a2.themes) {
    _registry.themesPath = options.paths.themes;
  }
  if ((_b = options.paths) === null || _b === void 0 ? void 0 : _b.languages) {
    _resolver.languagesPath = options.paths.languages;
  }
  const themes = await _registry.loadThemes(_themes);
  const _defaultTheme = themes[0];
  let _currentTheme;
  await _registry.loadLanguages(_languages);
  const COLOR_REPLACEMENTS = {
    "#000001": "var(--shiki-color-text)",
    "#000002": "var(--shiki-color-background)",
    "#000004": "var(--shiki-token-constant)",
    "#000005": "var(--shiki-token-string)",
    "#000006": "var(--shiki-token-comment)",
    "#000007": "var(--shiki-token-keyword)",
    "#000008": "var(--shiki-token-parameter)",
    "#000009": "var(--shiki-token-function)",
    "#000010": "var(--shiki-token-string-expression)",
    "#000011": "var(--shiki-token-punctuation)",
    "#000012": "var(--shiki-token-link)"
  };
  function fixCssVariablesTheme(theme, colorMap) {
    theme.bg = COLOR_REPLACEMENTS[theme.bg] || theme.bg;
    theme.fg = COLOR_REPLACEMENTS[theme.fg] || theme.fg;
    colorMap.forEach((val, i2) => {
      colorMap[i2] = COLOR_REPLACEMENTS[val] || val;
    });
  }
  function getTheme(theme) {
    const _theme = theme ? _registry.getTheme(theme) : _defaultTheme;
    if (!_theme) {
      throw Error(`No theme registration for ${theme}`);
    }
    if (!_currentTheme || _currentTheme.name !== _theme.name) {
      _registry.setTheme(_theme);
      _currentTheme = _theme;
    }
    const _colorMap = _registry.getColorMap();
    if (_theme.name === "css-variables") {
      fixCssVariablesTheme(_theme, _colorMap);
    }
    return { _theme, _colorMap };
  }
  function getGrammar(lang) {
    const _grammar = _registry.getGrammar(lang);
    if (!_grammar) {
      throw Error(`No language registration for ${lang}`);
    }
    return { _grammar };
  }
  function codeToThemedTokens(code, lang = "text", theme, options2 = { includeExplanation: true }) {
    if (isPlaintext(lang)) {
      const lines = code.split(/\r\n|\r|\n/);
      return [...lines.map((line) => [{ content: line }])];
    }
    const { _grammar } = getGrammar(lang);
    const { _theme, _colorMap } = getTheme(theme);
    return tokenizeWithTheme(_theme, _colorMap, code, _grammar, options2);
  }
  function codeToHtml(code, arg1 = "text", arg2) {
    let options2;
    if (typeof arg1 === "object") {
      options2 = arg1;
    } else {
      options2 = {
        lang: arg1,
        theme: arg2
      };
    }
    const tokens = codeToThemedTokens(code, options2.lang, options2.theme, {
      includeExplanation: false
    });
    const { _theme } = getTheme(options2.theme);
    return renderToHtml(tokens, {
      fg: _theme.fg,
      bg: _theme.bg,
      lineOptions: options2 === null || options2 === void 0 ? void 0 : options2.lineOptions
    });
  }
  async function loadTheme(theme) {
    await _registry.loadTheme(theme);
  }
  async function loadLanguage(lang) {
    const _lang = resolveLang(lang);
    _resolver.addLanguage(_lang);
    await _registry.loadLanguage(_lang);
  }
  function getLoadedThemes() {
    return _registry.getLoadedThemes();
  }
  function getLoadedLanguages() {
    return _registry.getLoadedLanguages();
  }
  function getBackgroundColor(theme) {
    const { _theme } = getTheme(theme);
    return _theme.bg;
  }
  function getForegroundColor(theme) {
    const { _theme } = getTheme(theme);
    return _theme.fg;
  }
  return {
    codeToThemedTokens,
    codeToHtml,
    getTheme: (theme) => {
      return getTheme(theme)._theme;
    },
    loadTheme,
    loadLanguage,
    getBackgroundColor,
    getForegroundColor,
    getLoadedThemes,
    getLoadedLanguages
  };
}
function isPlaintext(lang) {
  return !lang || ["plaintext", "txt", "text"].includes(lang);
}
var flexsearch_bundle = { exports: {} };
(function(module) {
  (function _f(self) {
    try {
      if (module)
        self = module;
    } catch (e2) {
    }
    self._factory = _f;
    var t;
    function u(a2) {
      return "undefined" !== typeof a2 ? a2 : true;
    }
    function aa(a2) {
      const b2 = Array(a2);
      for (let c2 = 0; c2 < a2; c2++)
        b2[c2] = v();
      return b2;
    }
    function v() {
      return /* @__PURE__ */ Object.create(null);
    }
    function ba(a2, b2) {
      return b2.length - a2.length;
    }
    function x(a2) {
      return "string" === typeof a2;
    }
    function C(a2) {
      return "object" === typeof a2;
    }
    function D(a2) {
      return "function" === typeof a2;
    }
    function ca(a2, b2) {
      var c2 = da;
      if (a2 && (b2 && (a2 = E(a2, b2)), this.H && (a2 = E(a2, this.H)), this.J && 1 < a2.length && (a2 = E(a2, this.J)), c2 || "" === c2)) {
        a2 = a2.split(c2);
        if (this.filter) {
          b2 = this.filter;
          c2 = a2.length;
          const d2 = [];
          for (let e2 = 0, f2 = 0; e2 < c2; e2++) {
            const g = a2[e2];
            g && !b2[g] && (d2[f2++] = g);
          }
          a2 = d2;
        }
        return a2;
      }
      return a2;
    }
    const da = /[\p{Z}\p{S}\p{P}\p{C}]+/u, ea = /[\u0300-\u036f]/g;
    function fa(a2, b2) {
      const c2 = Object.keys(a2), d2 = c2.length, e2 = [];
      let f2 = "", g = 0;
      for (let h2 = 0, k2, m2; h2 < d2; h2++)
        k2 = c2[h2], (m2 = a2[k2]) ? (e2[g++] = F(b2 ? "(?!\\b)" + k2 + "(\\b|_)" : k2), e2[g++] = m2) : f2 += (f2 ? "|" : "") + k2;
      f2 && (e2[g++] = F(b2 ? "(?!\\b)(" + f2 + ")(\\b|_)" : "(" + f2 + ")"), e2[g] = "");
      return e2;
    }
    function E(a2, b2) {
      for (let c2 = 0, d2 = b2.length; c2 < d2 && (a2 = a2.replace(b2[c2], b2[c2 + 1]), a2); c2 += 2)
        ;
      return a2;
    }
    function F(a2) {
      return new RegExp(a2, "g");
    }
    function ha(a2) {
      let b2 = "", c2 = "";
      for (let d2 = 0, e2 = a2.length, f2; d2 < e2; d2++)
        (f2 = a2[d2]) !== c2 && (b2 += c2 = f2);
      return b2;
    }
    var ja = { encode: ia, F: false, G: "" };
    function ia(a2) {
      return ca.call(this, ("" + a2).toLowerCase(), false);
    }
    const ka = {}, G = {};
    function la(a2) {
      I(a2, "add");
      I(a2, "append");
      I(a2, "search");
      I(a2, "update");
      I(a2, "remove");
    }
    function I(a2, b2) {
      a2[b2 + "Async"] = function() {
        const c2 = this, d2 = arguments;
        var e2 = d2[d2.length - 1];
        let f2;
        D(e2) && (f2 = e2, delete d2[d2.length - 1]);
        e2 = new Promise(function(g) {
          setTimeout(function() {
            c2.async = true;
            const h2 = c2[b2].apply(c2, d2);
            c2.async = false;
            g(h2);
          });
        });
        return f2 ? (e2.then(f2), this) : e2;
      };
    }
    function ma(a2, b2, c2, d2) {
      const e2 = a2.length;
      let f2 = [], g, h2, k2 = 0;
      d2 && (d2 = []);
      for (let m2 = e2 - 1; 0 <= m2; m2--) {
        const n2 = a2[m2], w2 = n2.length, q2 = v();
        let r2 = !g;
        for (let l = 0; l < w2; l++) {
          const p2 = n2[l], z2 = p2.length;
          if (z2)
            for (let B2 = 0, A2, y2; B2 < z2; B2++)
              if (y2 = p2[B2], g) {
                if (g[y2]) {
                  if (!m2) {
                    if (c2)
                      c2--;
                    else if (f2[k2++] = y2, k2 === b2)
                      return f2;
                  }
                  if (m2 || d2)
                    q2[y2] = 1;
                  r2 = true;
                }
                if (d2 && (h2[y2] = (A2 = h2[y2]) ? ++A2 : A2 = 1, A2 < e2)) {
                  const H2 = d2[A2 - 2] || (d2[A2 - 2] = []);
                  H2[H2.length] = y2;
                }
              } else
                q2[y2] = 1;
        }
        if (d2)
          g || (h2 = q2);
        else if (!r2)
          return [];
        g = q2;
      }
      if (d2)
        for (let m2 = d2.length - 1, n2, w2; 0 <= m2; m2--) {
          n2 = d2[m2];
          w2 = n2.length;
          for (let q2 = 0, r2; q2 < w2; q2++)
            if (r2 = n2[q2], !g[r2]) {
              if (c2)
                c2--;
              else if (f2[k2++] = r2, k2 === b2)
                return f2;
              g[r2] = 1;
            }
        }
      return f2;
    }
    function na(a2, b2) {
      const c2 = v(), d2 = v(), e2 = [];
      for (let f2 = 0; f2 < a2.length; f2++)
        c2[a2[f2]] = 1;
      for (let f2 = 0, g; f2 < b2.length; f2++) {
        g = b2[f2];
        for (let h2 = 0, k2; h2 < g.length; h2++)
          k2 = g[h2], c2[k2] && !d2[k2] && (d2[k2] = 1, e2[e2.length] = k2);
      }
      return e2;
    }
    function J(a2) {
      this.l = true !== a2 && a2;
      this.cache = v();
      this.h = [];
    }
    function oa(a2, b2, c2) {
      C(a2) && (a2 = a2.query);
      let d2 = this.cache.get(a2);
      d2 || (d2 = this.search(a2, b2, c2), this.cache.set(a2, d2));
      return d2;
    }
    J.prototype.set = function(a2, b2) {
      if (!this.cache[a2]) {
        var c2 = this.h.length;
        c2 === this.l ? delete this.cache[this.h[c2 - 1]] : c2++;
        for (--c2; 0 < c2; c2--)
          this.h[c2] = this.h[c2 - 1];
        this.h[0] = a2;
      }
      this.cache[a2] = b2;
    };
    J.prototype.get = function(a2) {
      const b2 = this.cache[a2];
      if (this.l && b2 && (a2 = this.h.indexOf(a2))) {
        const c2 = this.h[a2 - 1];
        this.h[a2 - 1] = this.h[a2];
        this.h[a2] = c2;
      }
      return b2;
    };
    const qa = { memory: { charset: "latin:extra", D: 3, B: 4, m: false }, performance: { D: 3, B: 3, s: false, context: { depth: 2, D: 1 } }, match: { charset: "latin:extra", G: "reverse" }, score: { charset: "latin:advanced", D: 20, B: 3, context: { depth: 3, D: 9 } }, "default": {} };
    function ra(a2, b2, c2, d2, e2, f2) {
      setTimeout(function() {
        const g = a2(c2, JSON.stringify(f2));
        g && g.then ? g.then(function() {
          b2.export(a2, b2, c2, d2, e2 + 1);
        }) : b2.export(a2, b2, c2, d2, e2 + 1);
      });
    }
    function K(a2, b2) {
      if (!(this instanceof K))
        return new K(a2);
      var c2;
      if (a2) {
        x(a2) ? a2 = qa[a2] : (c2 = a2.preset) && (a2 = Object.assign({}, c2[c2], a2));
        c2 = a2.charset;
        var d2 = a2.lang;
        x(c2) && (-1 === c2.indexOf(":") && (c2 += ":default"), c2 = G[c2]);
        x(d2) && (d2 = ka[d2]);
      } else
        a2 = {};
      let e2, f2, g = a2.context || {};
      this.encode = a2.encode || c2 && c2.encode || ia;
      this.register = b2 || v();
      this.D = e2 = a2.resolution || 9;
      this.G = b2 = c2 && c2.G || a2.tokenize || "strict";
      this.depth = "strict" === b2 && g.depth;
      this.l = u(g.bidirectional);
      this.s = f2 = u(a2.optimize);
      this.m = u(a2.fastupdate);
      this.B = a2.minlength || 1;
      this.C = a2.boost;
      this.map = f2 ? aa(e2) : v();
      this.A = e2 = g.resolution || 1;
      this.h = f2 ? aa(e2) : v();
      this.F = c2 && c2.F || a2.rtl;
      this.H = (b2 = a2.matcher || d2 && d2.H) && fa(b2, false);
      this.J = (b2 = a2.stemmer || d2 && d2.J) && fa(b2, true);
      if (c2 = b2 = a2.filter || d2 && d2.filter) {
        c2 = b2;
        d2 = v();
        for (let h2 = 0, k2 = c2.length; h2 < k2; h2++)
          d2[c2[h2]] = 1;
        c2 = d2;
      }
      this.filter = c2;
      this.cache = (b2 = a2.cache) && new J(b2);
    }
    t = K.prototype;
    t.append = function(a2, b2) {
      return this.add(a2, b2, true);
    };
    t.add = function(a2, b2, c2, d2) {
      if (b2 && (a2 || 0 === a2)) {
        if (!d2 && !c2 && this.register[a2])
          return this.update(a2, b2);
        b2 = this.encode(b2);
        if (d2 = b2.length) {
          const m2 = v(), n2 = v(), w2 = this.depth, q2 = this.D;
          for (let r2 = 0; r2 < d2; r2++) {
            let l = b2[this.F ? d2 - 1 - r2 : r2];
            var e2 = l.length;
            if (l && e2 >= this.B && (w2 || !n2[l])) {
              var f2 = L(q2, d2, r2), g = "";
              switch (this.G) {
                case "full":
                  if (3 < e2) {
                    for (f2 = 0; f2 < e2; f2++)
                      for (var h2 = e2; h2 > f2; h2--)
                        if (h2 - f2 >= this.B) {
                          var k2 = L(q2, d2, r2, e2, f2);
                          g = l.substring(f2, h2);
                          M(this, n2, g, k2, a2, c2);
                        }
                    break;
                  }
                case "reverse":
                  if (2 < e2) {
                    for (h2 = e2 - 1; 0 < h2; h2--)
                      g = l[h2] + g, g.length >= this.B && M(
                        this,
                        n2,
                        g,
                        L(q2, d2, r2, e2, h2),
                        a2,
                        c2
                      );
                    g = "";
                  }
                case "forward":
                  if (1 < e2) {
                    for (h2 = 0; h2 < e2; h2++)
                      g += l[h2], g.length >= this.B && M(this, n2, g, f2, a2, c2);
                    break;
                  }
                default:
                  if (this.C && (f2 = Math.min(f2 / this.C(b2, l, r2) | 0, q2 - 1)), M(this, n2, l, f2, a2, c2), w2 && 1 < d2 && r2 < d2 - 1) {
                    for (e2 = v(), g = this.A, f2 = l, h2 = Math.min(w2 + 1, d2 - r2), e2[f2] = 1, k2 = 1; k2 < h2; k2++)
                      if ((l = b2[this.F ? d2 - 1 - r2 - k2 : r2 + k2]) && l.length >= this.B && !e2[l]) {
                        e2[l] = 1;
                        const p2 = this.l && l > f2;
                        M(this, m2, p2 ? f2 : l, L(g + (d2 / 2 > g ? 0 : 1), d2, r2, h2 - 1, k2 - 1), a2, c2, p2 ? l : f2);
                      }
                  }
              }
            }
          }
          this.m || (this.register[a2] = 1);
        }
      }
      return this;
    };
    function L(a2, b2, c2, d2, e2) {
      return c2 && 1 < a2 ? b2 + (d2 || 0) <= a2 ? c2 + (e2 || 0) : (a2 - 1) / (b2 + (d2 || 0)) * (c2 + (e2 || 0)) + 1 | 0 : 0;
    }
    function M(a2, b2, c2, d2, e2, f2, g) {
      let h2 = g ? a2.h : a2.map;
      if (!b2[c2] || g && !b2[c2][g])
        a2.s && (h2 = h2[d2]), g ? (b2 = b2[c2] || (b2[c2] = v()), b2[g] = 1, h2 = h2[g] || (h2[g] = v())) : b2[c2] = 1, h2 = h2[c2] || (h2[c2] = []), a2.s || (h2 = h2[d2] || (h2[d2] = [])), f2 && -1 !== h2.indexOf(e2) || (h2[h2.length] = e2, a2.m && (a2 = a2.register[e2] || (a2.register[e2] = []), a2[a2.length] = h2));
    }
    t.search = function(a2, b2, c2) {
      c2 || (!b2 && C(a2) ? (c2 = a2, a2 = c2.query) : C(b2) && (c2 = b2));
      let d2 = [], e2;
      let f2, g = 0;
      if (c2) {
        b2 = c2.limit;
        g = c2.offset || 0;
        var h2 = c2.context;
        f2 = c2.suggest;
      }
      if (a2 && (a2 = this.encode(a2), e2 = a2.length, 1 < e2)) {
        c2 = v();
        var k2 = [];
        for (let n2 = 0, w2 = 0, q2; n2 < e2; n2++)
          if ((q2 = a2[n2]) && q2.length >= this.B && !c2[q2])
            if (this.s || f2 || this.map[q2])
              k2[w2++] = q2, c2[q2] = 1;
            else
              return d2;
        a2 = k2;
        e2 = a2.length;
      }
      if (!e2)
        return d2;
      b2 || (b2 = 100);
      h2 = this.depth && 1 < e2 && false !== h2;
      c2 = 0;
      let m2;
      h2 ? (m2 = a2[0], c2 = 1) : 1 < e2 && a2.sort(ba);
      for (let n2, w2; c2 < e2; c2++) {
        w2 = a2[c2];
        h2 ? (n2 = sa(this, d2, f2, b2, g, 2 === e2, w2, m2), f2 && false === n2 && d2.length || (m2 = w2)) : n2 = sa(this, d2, f2, b2, g, 1 === e2, w2);
        if (n2)
          return n2;
        if (f2 && c2 === e2 - 1) {
          k2 = d2.length;
          if (!k2) {
            if (h2) {
              h2 = 0;
              c2 = -1;
              continue;
            }
            return d2;
          }
          if (1 === k2)
            return ta(d2[0], b2, g);
        }
      }
      return ma(d2, b2, g, f2);
    };
    function sa(a2, b2, c2, d2, e2, f2, g, h2) {
      let k2 = [], m2 = h2 ? a2.h : a2.map;
      a2.s || (m2 = ua(m2, g, h2, a2.l));
      if (m2) {
        let n2 = 0;
        const w2 = Math.min(m2.length, h2 ? a2.A : a2.D);
        for (let q2 = 0, r2 = 0, l, p2; q2 < w2; q2++)
          if (l = m2[q2]) {
            if (a2.s && (l = ua(l, g, h2, a2.l)), e2 && l && f2 && (p2 = l.length, p2 <= e2 ? (e2 -= p2, l = null) : (l = l.slice(e2), e2 = 0)), l && (k2[n2++] = l, f2 && (r2 += l.length, r2 >= d2)))
              break;
          }
        if (n2) {
          if (f2)
            return ta(k2, d2, 0);
          b2[b2.length] = k2;
          return;
        }
      }
      return !c2 && k2;
    }
    function ta(a2, b2, c2) {
      a2 = 1 === a2.length ? a2[0] : [].concat.apply([], a2);
      return c2 || a2.length > b2 ? a2.slice(c2, c2 + b2) : a2;
    }
    function ua(a2, b2, c2, d2) {
      c2 ? (d2 = d2 && b2 > c2, a2 = (a2 = a2[d2 ? b2 : c2]) && a2[d2 ? c2 : b2]) : a2 = a2[b2];
      return a2;
    }
    t.contain = function(a2) {
      return !!this.register[a2];
    };
    t.update = function(a2, b2) {
      return this.remove(a2).add(a2, b2);
    };
    t.remove = function(a2, b2) {
      const c2 = this.register[a2];
      if (c2) {
        if (this.m)
          for (let d2 = 0, e2; d2 < c2.length; d2++)
            e2 = c2[d2], e2.splice(e2.indexOf(a2), 1);
        else
          N(this.map, a2, this.D, this.s), this.depth && N(this.h, a2, this.A, this.s);
        b2 || delete this.register[a2];
        if (this.cache) {
          b2 = this.cache;
          for (let d2 = 0, e2, f2; d2 < b2.h.length; d2++)
            f2 = b2.h[d2], e2 = b2.cache[f2], -1 !== e2.indexOf(a2) && (b2.h.splice(d2--, 1), delete b2.cache[f2]);
        }
      }
      return this;
    };
    function N(a2, b2, c2, d2, e2) {
      let f2 = 0;
      if (a2.constructor === Array)
        if (e2)
          b2 = a2.indexOf(b2), -1 !== b2 ? 1 < a2.length && (a2.splice(b2, 1), f2++) : f2++;
        else {
          e2 = Math.min(a2.length, c2);
          for (let g = 0, h2; g < e2; g++)
            if (h2 = a2[g])
              f2 = N(h2, b2, c2, d2, e2), d2 || f2 || delete a2[g];
        }
      else
        for (let g in a2)
          (f2 = N(a2[g], b2, c2, d2, e2)) || delete a2[g];
      return f2;
    }
    t.searchCache = oa;
    t.export = function(a2, b2, c2, d2, e2) {
      let f2, g;
      switch (e2 || (e2 = 0)) {
        case 0:
          f2 = "reg";
          if (this.m) {
            g = v();
            for (let h2 in this.register)
              g[h2] = 1;
          } else
            g = this.register;
          break;
        case 1:
          f2 = "cfg";
          g = { doc: 0, opt: this.s ? 1 : 0 };
          break;
        case 2:
          f2 = "map";
          g = this.map;
          break;
        case 3:
          f2 = "ctx";
          g = this.h;
          break;
        default:
          return;
      }
      ra(a2, b2 || this, c2 ? c2 + "." + f2 : f2, d2, e2, g);
      return true;
    };
    t.import = function(a2, b2) {
      if (b2)
        switch (x(b2) && (b2 = JSON.parse(b2)), a2) {
          case "cfg":
            this.s = !!b2.opt;
            break;
          case "reg":
            this.m = false;
            this.register = b2;
            break;
          case "map":
            this.map = b2;
            break;
          case "ctx":
            this.h = b2;
        }
    };
    la(K.prototype);
    function va(a2) {
      a2 = a2.data;
      var b2 = self._index;
      const c2 = a2.args;
      var d2 = a2.task;
      switch (d2) {
        case "init":
          d2 = a2.options || {};
          a2 = a2.factory;
          b2 = d2.encode;
          d2.cache = false;
          b2 && 0 === b2.indexOf("function") && (d2.encode = Function("return " + b2)());
          a2 ? (Function("return " + a2)()(self), self._index = new self.FlexSearch.Index(d2), delete self.FlexSearch) : self._index = new K(d2);
          break;
        default:
          a2 = a2.id, b2 = b2[d2].apply(b2, c2), postMessage("search" === d2 ? { id: a2, msg: b2 } : { id: a2 });
      }
    }
    let wa = 0;
    function O(a2) {
      if (!(this instanceof O))
        return new O(a2);
      var b2;
      a2 ? D(b2 = a2.encode) && (a2.encode = b2.toString()) : a2 = {};
      (b2 = (self || window)._factory) && (b2 = b2.toString());
      const c2 = self.exports, d2 = this;
      this.o = xa(b2, c2, a2.worker);
      this.h = v();
      if (this.o) {
        if (c2)
          this.o.on("message", function(e2) {
            d2.h[e2.id](e2.msg);
            delete d2.h[e2.id];
          });
        else
          this.o.onmessage = function(e2) {
            e2 = e2.data;
            d2.h[e2.id](e2.msg);
            delete d2.h[e2.id];
          };
        this.o.postMessage({ task: "init", factory: b2, options: a2 });
      }
    }
    P("add");
    P("append");
    P("search");
    P("update");
    P("remove");
    function P(a2) {
      O.prototype[a2] = O.prototype[a2 + "Async"] = function() {
        const b2 = this, c2 = [].slice.call(arguments);
        var d2 = c2[c2.length - 1];
        let e2;
        D(d2) && (e2 = d2, c2.splice(c2.length - 1, 1));
        d2 = new Promise(function(f2) {
          setTimeout(function() {
            b2.h[++wa] = f2;
            b2.o.postMessage({ task: a2, id: wa, args: c2 });
          });
        });
        return e2 ? (d2.then(e2), this) : d2;
      };
    }
    function xa(a, b, c) {
      let d;
      try {
        d = b ? eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")') : a ? new Worker(URL.createObjectURL(new Blob(["onmessage=" + va.toString()], { type: "text/javascript" }))) : new Worker(x(c) ? c : "worker/worker.js", { type: "module" });
      } catch (e2) {
      }
      return d;
    }
    function Q(a2) {
      if (!(this instanceof Q))
        return new Q(a2);
      var b2 = a2.document || a2.doc || a2, c2;
      this.K = [];
      this.h = [];
      this.A = [];
      this.register = v();
      this.key = (c2 = b2.key || b2.id) && S(c2, this.A) || "id";
      this.m = u(a2.fastupdate);
      this.C = (c2 = b2.store) && true !== c2 && [];
      this.store = c2 && v();
      this.I = (c2 = b2.tag) && S(c2, this.A);
      this.l = c2 && v();
      this.cache = (c2 = a2.cache) && new J(c2);
      a2.cache = false;
      this.o = a2.worker;
      this.async = false;
      c2 = v();
      let d2 = b2.index || b2.field || b2;
      x(d2) && (d2 = [d2]);
      for (let e2 = 0, f2, g; e2 < d2.length; e2++)
        f2 = d2[e2], x(f2) || (g = f2, f2 = f2.field), g = C(g) ? Object.assign({}, a2, g) : a2, this.o && (c2[f2] = new O(g), c2[f2].o || (this.o = false)), this.o || (c2[f2] = new K(g, this.register)), this.K[e2] = S(f2, this.A), this.h[e2] = f2;
      if (this.C)
        for (a2 = b2.store, x(a2) && (a2 = [a2]), b2 = 0; b2 < a2.length; b2++)
          this.C[b2] = S(a2[b2], this.A);
      this.index = c2;
    }
    function S(a2, b2) {
      const c2 = a2.split(":");
      let d2 = 0;
      for (let e2 = 0; e2 < c2.length; e2++)
        a2 = c2[e2], 0 <= a2.indexOf("[]") && (a2 = a2.substring(0, a2.length - 2)) && (b2[d2] = true), a2 && (c2[d2++] = a2);
      d2 < c2.length && (c2.length = d2);
      return 1 < d2 ? c2 : c2[0];
    }
    function T(a2, b2) {
      if (x(b2))
        a2 = a2[b2];
      else
        for (let c2 = 0; a2 && c2 < b2.length; c2++)
          a2 = a2[b2[c2]];
      return a2;
    }
    function U(a2, b2, c2, d2, e2) {
      a2 = a2[e2];
      if (d2 === c2.length - 1)
        b2[e2] = a2;
      else if (a2)
        if (a2.constructor === Array)
          for (b2 = b2[e2] = Array(a2.length), e2 = 0; e2 < a2.length; e2++)
            U(a2, b2, c2, d2, e2);
        else
          b2 = b2[e2] || (b2[e2] = v()), e2 = c2[++d2], U(a2, b2, c2, d2, e2);
    }
    function V(a2, b2, c2, d2, e2, f2, g, h2) {
      if (a2 = a2[g])
        if (d2 === b2.length - 1) {
          if (a2.constructor === Array) {
            if (c2[d2]) {
              for (b2 = 0; b2 < a2.length; b2++)
                e2.add(f2, a2[b2], true, true);
              return;
            }
            a2 = a2.join(" ");
          }
          e2.add(f2, a2, h2, true);
        } else if (a2.constructor === Array)
          for (g = 0; g < a2.length; g++)
            V(a2, b2, c2, d2, e2, f2, g, h2);
        else
          g = b2[++d2], V(a2, b2, c2, d2, e2, f2, g, h2);
    }
    t = Q.prototype;
    t.add = function(a2, b2, c2) {
      C(a2) && (b2 = a2, a2 = T(b2, this.key));
      if (b2 && (a2 || 0 === a2)) {
        if (!c2 && this.register[a2])
          return this.update(a2, b2);
        for (let d2 = 0, e2, f2; d2 < this.h.length; d2++)
          f2 = this.h[d2], e2 = this.K[d2], x(e2) && (e2 = [e2]), V(b2, e2, this.A, 0, this.index[f2], a2, e2[0], c2);
        if (this.I) {
          let d2 = T(b2, this.I), e2 = v();
          x(d2) && (d2 = [d2]);
          for (let f2 = 0, g, h2; f2 < d2.length; f2++)
            if (g = d2[f2], !e2[g] && (e2[g] = 1, h2 = this.l[g] || (this.l[g] = []), !c2 || -1 === h2.indexOf(a2))) {
              if (h2[h2.length] = a2, this.m) {
                const k2 = this.register[a2] || (this.register[a2] = []);
                k2[k2.length] = h2;
              }
            }
        }
        if (this.store && (!c2 || !this.store[a2])) {
          let d2;
          if (this.C) {
            d2 = v();
            for (let e2 = 0, f2; e2 < this.C.length; e2++)
              f2 = this.C[e2], x(f2) ? d2[f2] = b2[f2] : U(b2, d2, f2, 0, f2[0]);
          }
          this.store[a2] = d2 || b2;
        }
      }
      return this;
    };
    t.append = function(a2, b2) {
      return this.add(a2, b2, true);
    };
    t.update = function(a2, b2) {
      return this.remove(a2).add(a2, b2);
    };
    t.remove = function(a2) {
      C(a2) && (a2 = T(a2, this.key));
      if (this.register[a2]) {
        for (var b2 = 0; b2 < this.h.length && (this.index[this.h[b2]].remove(a2, !this.o), !this.m); b2++)
          ;
        if (this.I && !this.m)
          for (let c2 in this.l) {
            b2 = this.l[c2];
            const d2 = b2.indexOf(a2);
            -1 !== d2 && (1 < b2.length ? b2.splice(d2, 1) : delete this.l[c2]);
          }
        this.store && delete this.store[a2];
        delete this.register[a2];
      }
      return this;
    };
    t.search = function(a2, b2, c2, d2) {
      c2 || (!b2 && C(a2) ? (c2 = a2, a2 = c2.query) : C(b2) && (c2 = b2, b2 = 0));
      let e2 = [], f2 = [], g, h2, k2, m2, n2, w2, q2 = 0;
      if (c2)
        if (c2.constructor === Array)
          k2 = c2, c2 = null;
        else {
          k2 = (g = c2.pluck) || c2.index || c2.field;
          m2 = c2.tag;
          h2 = this.store && c2.enrich;
          n2 = "and" === c2.bool;
          b2 = c2.limit || 100;
          w2 = c2.offset || 0;
          if (m2 && (x(m2) && (m2 = [m2]), !a2)) {
            for (let l = 0, p2; l < m2.length; l++)
              if (p2 = ya.call(this, m2[l], b2, w2, h2))
                e2[e2.length] = p2, q2++;
            return q2 ? e2 : [];
          }
          x(k2) && (k2 = [k2]);
        }
      k2 || (k2 = this.h);
      n2 = n2 && (1 < k2.length || m2 && 1 < m2.length);
      const r2 = !d2 && (this.o || this.async) && [];
      for (let l = 0, p2, z2, B2; l < k2.length; l++) {
        let A2;
        z2 = k2[l];
        x(z2) || (A2 = z2, z2 = z2.field);
        if (r2)
          r2[l] = this.index[z2].searchAsync(a2, b2, A2 || c2);
        else {
          d2 ? p2 = d2[l] : p2 = this.index[z2].search(a2, b2, A2 || c2);
          B2 = p2 && p2.length;
          if (m2 && B2) {
            const y2 = [];
            let H2 = 0;
            n2 && (y2[0] = [p2]);
            for (let X = 0, pa, R2; X < m2.length; X++)
              if (pa = m2[X], B2 = (R2 = this.l[pa]) && R2.length)
                H2++, y2[y2.length] = n2 ? [R2] : R2;
            H2 && (p2 = n2 ? ma(y2, b2 || 100, w2 || 0) : na(p2, y2), B2 = p2.length);
          }
          if (B2)
            f2[q2] = z2, e2[q2++] = p2;
          else if (n2)
            return [];
        }
      }
      if (r2) {
        const l = this;
        return new Promise(function(p2) {
          Promise.all(r2).then(function(z2) {
            p2(l.search(a2, b2, c2, z2));
          });
        });
      }
      if (!q2)
        return [];
      if (g && (!h2 || !this.store))
        return e2[0];
      for (let l = 0, p2; l < f2.length; l++) {
        p2 = e2[l];
        p2.length && h2 && (p2 = za.call(this, p2));
        if (g)
          return p2;
        e2[l] = { field: f2[l], result: p2 };
      }
      return e2;
    };
    function ya(a2, b2, c2, d2) {
      let e2 = this.l[a2], f2 = e2 && e2.length - c2;
      if (f2 && 0 < f2) {
        if (f2 > b2 || c2)
          e2 = e2.slice(c2, c2 + b2);
        d2 && (e2 = za.call(this, e2));
        return { tag: a2, result: e2 };
      }
    }
    function za(a2) {
      const b2 = Array(a2.length);
      for (let c2 = 0, d2; c2 < a2.length; c2++)
        d2 = a2[c2], b2[c2] = { id: d2, doc: this.store[d2] };
      return b2;
    }
    t.contain = function(a2) {
      return !!this.register[a2];
    };
    t.get = function(a2) {
      return this.store[a2];
    };
    t.set = function(a2, b2) {
      this.store[a2] = b2;
      return this;
    };
    t.searchCache = oa;
    t.export = function(a2, b2, c2, d2, e2) {
      e2 || (e2 = 0);
      d2 || (d2 = 0);
      if (d2 < this.h.length) {
        const f2 = this.h[d2], g = this.index[f2];
        b2 = this;
        setTimeout(function() {
          g.export(a2, b2, e2 ? f2.replace(":", "-") : "", d2, e2++) || (d2++, e2 = 1, b2.export(a2, b2, f2, d2, e2));
        });
      } else {
        let f2;
        switch (e2) {
          case 1:
            c2 = "tag";
            f2 = this.l;
            break;
          case 2:
            c2 = "store";
            f2 = this.store;
            break;
          default:
            return;
        }
        ra(a2, this, c2, d2, e2, f2);
      }
    };
    t.import = function(a2, b2) {
      if (b2)
        switch (x(b2) && (b2 = JSON.parse(b2)), a2) {
          case "tag":
            this.l = b2;
            break;
          case "reg":
            this.m = false;
            this.register = b2;
            for (let d2 = 0, e2; d2 < this.h.length; d2++)
              e2 = this.index[this.h[d2]], e2.register = b2, e2.m = false;
            break;
          case "store":
            this.store = b2;
            break;
          default:
            a2 = a2.split(".");
            const c2 = a2[0];
            a2 = a2[1];
            c2 && a2 && this.index[c2].import(a2, b2);
        }
    };
    la(Q.prototype);
    var Ba = { encode: Aa, F: false, G: "" };
    const Ca = [F("[\xE0\xE1\xE2\xE3\xE4\xE5]"), "a", F("[\xE8\xE9\xEA\xEB]"), "e", F("[\xEC\xED\xEE\xEF]"), "i", F("[\xF2\xF3\xF4\xF5\xF6\u0151]"), "o", F("[\xF9\xFA\xFB\xFC\u0171]"), "u", F("[\xFD\u0177\xFF]"), "y", F("\xF1"), "n", F("[\xE7c]"), "k", F("\xDF"), "s", F(" & "), " and "];
    function Aa(a2) {
      var b2 = a2;
      b2.normalize && (b2 = b2.normalize("NFD").replace(ea, ""));
      return ca.call(this, b2.toLowerCase(), !a2.normalize && Ca);
    }
    var Ea = { encode: Da, F: false, G: "strict" };
    const Fa = /[^a-z0-9]+/, Ga = { b: "p", v: "f", w: "f", z: "s", x: "s", "\xDF": "s", d: "t", n: "m", c: "k", g: "k", j: "k", q: "k", i: "e", y: "e", u: "o" };
    function Da(a2) {
      a2 = Aa.call(this, a2).join(" ");
      const b2 = [];
      if (a2) {
        const c2 = a2.split(Fa), d2 = c2.length;
        for (let e2 = 0, f2, g = 0; e2 < d2; e2++)
          if ((a2 = c2[e2]) && (!this.filter || !this.filter[a2])) {
            f2 = a2[0];
            let h2 = Ga[f2] || f2, k2 = h2;
            for (let m2 = 1; m2 < a2.length; m2++) {
              f2 = a2[m2];
              const n2 = Ga[f2] || f2;
              n2 && n2 !== k2 && (h2 += n2, k2 = n2);
            }
            b2[g++] = h2;
          }
      }
      return b2;
    }
    var Ia = { encode: Ha, F: false, G: "" };
    const Ja = [F("ae"), "a", F("oe"), "o", F("sh"), "s", F("th"), "t", F("ph"), "f", F("pf"), "f", F("(?![aeo])h(?![aeo])"), "", F("(?!^[aeo])h(?!^[aeo])"), ""];
    function Ha(a2, b2) {
      a2 && (a2 = Da.call(this, a2).join(" "), 2 < a2.length && (a2 = E(a2, Ja)), b2 || (1 < a2.length && (a2 = ha(a2)), a2 && (a2 = a2.split(" "))));
      return a2;
    }
    var La = { encode: Ka, F: false, G: "" };
    const Ma = F("(?!\\b)[aeo]");
    function Ka(a2) {
      a2 && (a2 = Ha.call(this, a2, true), 1 < a2.length && (a2 = a2.replace(Ma, "")), 1 < a2.length && (a2 = ha(a2)), a2 && (a2 = a2.split(" ")));
      return a2;
    }
    G["latin:default"] = ja;
    G["latin:simple"] = Ba;
    G["latin:balance"] = Ea;
    G["latin:advanced"] = Ia;
    G["latin:extra"] = La;
    const W = self;
    let Y;
    const Z = { Index: K, Document: Q, Worker: O, registerCharset: function(a2, b2) {
      G[a2] = b2;
    }, registerLanguage: function(a2, b2) {
      ka[a2] = b2;
    } };
    (Y = W.define) && Y.amd ? Y([], function() {
      return Z;
    }) : W.exports ? W.exports = Z : W.FlexSearch = Z;
  })(commonjsGlobal);
})(flexsearch_bundle);
const MountStory = defineComponent({
  name: "MountStory",
  props: {
    story: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    var _a2, _b, _c, _d;
    const options = props.story.file.component;
    let rawVariants = [];
    if (options.onMount) {
      rawVariants = [{
        id: "_default",
        title: "default",
        onMount: options.onMount,
        onMountControls: options.onMountControls
      }];
    } else {
      rawVariants = options.variants;
    }
    for (const index2 in props.story.variants) {
      const rawVariant = rawVariants[index2];
      Object.assign(props.story.variants[index2], {
        slots: () => ({ default: rawVariant.onMount, controls: rawVariant.onMountControls }),
        source: (_a2 = rawVariant.source) != null ? _a2 : options.source,
        responsiveDisabled: (_b = rawVariant.responsiveDisabled) != null ? _b : options.responsiveDisabled,
        autoPropsDisabled: (_c = rawVariant.autoPropsDisabled) != null ? _c : options.autoPropsDisabled,
        setupApp: (_d = rawVariant.setupApp) != null ? _d : options.setupApp,
        configReady: true
      });
    }
  },
  render() {
    return null;
  }
});
const $histoireNoop = () => {
};
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $histoireNoop
}, Symbol.toStringTag, { value: "Module" }));
const m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const RenderStory = defineComponent({
  name: "RenderStory",
  props: {
    variant: {
      type: Object,
      required: true
    },
    story: {
      type: Object,
      required: true
    },
    slotName: {
      type: String,
      default: "default"
    }
  },
  emits: {
    ready: () => true
  },
  setup(props, { emit: emit2 }) {
    const sandbox = ref();
    let mounting = false;
    let app;
    let appHooks;
    async function unmountVariant() {
      var _a2;
      if (app) {
        await ((_a2 = app.onUnmount) == null ? void 0 : _a2.call(app));
        if (appHooks) {
          for (const hook of appHooks.onUnmount) {
            await hook();
          }
        }
        app.el.parentNode.removeChild(app.el);
        app = null;
      }
    }
    async function mountVariant() {
      var _a2;
      if (mounting)
        return;
      mounting = true;
      await unmountVariant();
      app = {
        el: document.createElement("div")
      };
      if (false) {
        await (void 0)({
          app,
          story: props.story,
          variant: props.variant
        });
      }
      if (false) {
        await (void 0)({
          app,
          story: props.story,
          variant: props.variant
        });
      }
      if (typeof props.variant.setupApp === "function") {
        await props.variant.setupApp({
          app,
          story: props.story,
          variant: props.variant
        });
      }
      await ((_a2 = app.onMount) == null ? void 0 : _a2.call(app));
      appHooks = {
        onUpdate: [],
        onUnmount: []
      };
      const api = {
        el: app.el,
        state: props.variant.state,
        onUpdate: (cb) => {
          appHooks.onUpdate.push(cb);
        },
        onUnmount: (cb) => {
          appHooks.onUnmount.push(cb);
        }
      };
      const onMount2 = props.variant.slots()[props.slotName];
      await onMount2(api);
      sandbox.value.appendChild(app.el);
      emit2("ready");
    }
    onMounted(async () => {
      if (props.variant.configReady) {
        await mountVariant();
      }
    });
    watch(() => props.variant, async (value) => {
      if (value.configReady && !mounting) {
        if (!app) {
          await mountVariant();
        }
      }
    }, {
      deep: true
    });
    watch(() => props.variant.state, async () => {
      if (appHooks) {
        for (const hook of appHooks.onUpdate) {
          await hook();
        }
      }
    }, {
      deep: true
    });
    onBeforeUnmount(() => {
      unmountVariant();
    });
    return {
      sandbox
    };
  },
  render() {
    return h$1("div", {
      ref: "sandbox",
      class: "__histoire-sandbox htw-overflow-auto"
    });
  }
});
function generateSourceCode() {
}
const client = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generateSourceCode,
  MountStory,
  RenderStory
}, Symbol.toStringTag, { value: "Module" }));
function V(i2) {
  let e2, l, s = false;
  return { c() {
    e2 = empty();
  }, m(o, n2) {
    insert(o, e2, n2), l = true;
  }, p(o, [n2]) {
  }, i(o) {
    l || (transition_in(s), l = true);
  }, o(o) {
    transition_out(s), l = false;
  }, d(o) {
    o && detach(e2);
  } };
}
function j$1(i2, e2, l) {
  let { $$slots: s = {}, $$scope: o } = e2;
  const n2 = compute_slots(s);
  let { source: f2 = null } = e2, { responsiveDisabled: r2 = false } = e2, { autoPropsDisabled: u2 = false } = e2, { setupApp: c2 = null } = e2;
  const m2 = getContext("__hstStory"), _4 = getContext("__hstIndex"), p2 = getContext("__hstSlots"), b2 = m2.variants[_4.value];
  _4.value++;
  function d2() {
    Object.assign(b2, { slots: () => {
      var t2;
      return { default: true, controls: (t2 = n2.controls) != null ? t2 : p2.controls };
    }, source: f2, responsiveDisabled: r2, autoPropsDisabled: u2, setupApp: c2, configReady: true });
  }
  return d2(), afterUpdate(() => {
    d2();
  }), i2.$$set = (t2) => {
    "source" in t2 && l(0, f2 = t2.source), "responsiveDisabled" in t2 && l(1, r2 = t2.responsiveDisabled), "autoPropsDisabled" in t2 && l(2, u2 = t2.autoPropsDisabled), "setupApp" in t2 && l(3, c2 = t2.setupApp), "$$scope" in t2 && l(4, o = t2.$$scope);
  }, [f2, r2, u2, c2, o, s];
}
class B$1 extends SvelteComponent {
  constructor(e2) {
    super(), init(this, e2, j$1, V, safe_not_equal, { source: 0, responsiveDisabled: 1, autoPropsDisabled: 2, setupApp: 3 });
  }
}
const F = (s) => ({}), k = (s) => ({ slot: "controls" });
function G(s) {
  let o;
  const r2 = s[2].default, e2 = create_slot(r2, s, s[3], null);
  return { c() {
    e2 && e2.c();
  }, m(t2, n2) {
    e2 && e2.m(t2, n2), o = true;
  }, p(t2, n2) {
    e2 && e2.p && (!o || n2 & 8) && update_slot_base(e2, r2, t2, t2[3], o ? get_slot_changes(r2, t2[3], n2, null) : get_all_dirty_from_scope(t2[3]), null);
  }, i(t2) {
    o || (transition_in(e2, t2), o = true);
  }, o(t2) {
    transition_out(e2, t2), o = false;
  }, d(t2) {
    e2 && e2.d(t2);
  } };
}
function H$2(s) {
  let o, r2;
  const e2 = [s[1]];
  let t2 = { $$slots: { controls: [K], default: [J] }, $$scope: { ctx: s } };
  for (let n2 = 0; n2 < e2.length; n2 += 1)
    t2 = assign$1(t2, e2[n2]);
  return o = new B$1({ props: t2 }), { c() {
    create_component(o.$$.fragment);
  }, m(n2, _4) {
    mount_component(o, n2, _4), r2 = true;
  }, p(n2, _4) {
    const u2 = _4 & 2 ? get_spread_update(e2, [get_spread_object(n2[1])]) : {};
    _4 & 8 && (u2.$$scope = { dirty: _4, ctx: n2 }), o.$set(u2);
  }, i(n2) {
    r2 || (transition_in(o.$$.fragment, n2), r2 = true);
  }, o(n2) {
    transition_out(o.$$.fragment, n2), r2 = false;
  }, d(n2) {
    destroy_component(o, n2);
  } };
}
function J(s) {
  let o;
  const r2 = s[2].default, e2 = create_slot(r2, s, s[3], null);
  return { c() {
    e2 && e2.c();
  }, m(t2, n2) {
    e2 && e2.m(t2, n2), o = true;
  }, p(t2, n2) {
    e2 && e2.p && (!o || n2 & 8) && update_slot_base(e2, r2, t2, t2[3], o ? get_slot_changes(r2, t2[3], n2, null) : get_all_dirty_from_scope(t2[3]), null);
  }, i(t2) {
    o || (transition_in(e2, t2), o = true);
  }, o(t2) {
    transition_out(e2, t2), o = false;
  }, d(t2) {
    e2 && e2.d(t2);
  } };
}
function K(s) {
  let o;
  const r2 = s[2].controls, e2 = create_slot(r2, s, s[3], k);
  return { c() {
    e2 && e2.c();
  }, m(t2, n2) {
    e2 && e2.m(t2, n2), o = true;
  }, p(t2, n2) {
    e2 && e2.p && (!o || n2 & 8) && update_slot_base(e2, r2, t2, t2[3], o ? get_slot_changes(r2, t2[3], n2, F) : get_all_dirty_from_scope(t2[3]), k);
  }, i(t2) {
    o || (transition_in(e2, t2), o = true);
  }, o(t2) {
    transition_out(e2, t2), o = false;
  }, d(t2) {
    e2 && e2.d(t2);
  } };
}
function L(s) {
  let o, r2, e2, t2;
  const n2 = [H$2, G], _4 = [];
  function u2(l, c2) {
    return l[0].variants.length === 1 && l[0].variants[0].id === "_default" ? 0 : 1;
  }
  return o = u2(s), r2 = _4[o] = n2[o](s), { c() {
    r2.c(), e2 = empty();
  }, m(l, c2) {
    _4[o].m(l, c2), insert(l, e2, c2), t2 = true;
  }, p(l, [c2]) {
    r2.p(l, c2);
  }, i(l) {
    t2 || (transition_in(r2), t2 = true);
  }, o(l) {
    transition_out(r2), t2 = false;
  }, d(l) {
    _4[o].d(l), l && detach(e2);
  } };
}
function N$1(s, o, r2) {
  const e2 = [];
  let t2 = compute_rest_props(o, e2), { $$slots: n2 = {}, $$scope: _4 } = o;
  const u2 = compute_slots(n2), l = getContext("__hstStory");
  return setContext("__hstIndex", { value: 0 }), setContext("__hstSlots", u2), s.$$set = (f2) => {
    o = assign$1(assign$1({}, o), exclude_internal_props(f2)), r2(1, t2 = compute_rest_props(o, e2)), "$$scope" in f2 && r2(3, _4 = f2.$$scope);
  }, [l, t2, n2, _4];
}
class U extends SvelteComponent {
  constructor(o) {
    super(), init(this, o, N$1, L, safe_not_equal, {});
  }
}
class u extends SvelteComponent {
  constructor(t2) {
    super(), init(this, t2, null, null, safe_not_equal, {});
  }
}
const x = defineComponent({ name: "MountStory", props: { story: { type: Object, required: true } }, setup(t2) {
  const n2 = ref();
  let e2, o;
  async function u2() {
    o = document.createElement("div"), n2.value.appendChild(o), e2 = new t2.story.file.component({ target: o, props: { Hst: { Story: U, Variant: B$1, ...h() } }, context: new Map(Object.entries({ __hstStory: t2.story })) }), typeof (m == null ? void 0 : void 0) == "function" && await (void 0)({ app: e2, story: t2.story, variant: null }), typeof (f == null ? void 0 : void 0) == "function" && await (void 0)({ app: e2, story: t2.story, variant: null });
  }
  function a2() {
    var s;
    e2 == null || e2.$destroy(), o && ((s = o.parentNode) == null || s.removeChild(o), o = null);
  }
  return watch(() => t2.story.id, async () => {
    a2(), await u2();
  }), onMounted(async () => {
    await u2();
  }), onUnmounted(() => {
    a2();
  }), { el: n2 };
}, render() {
  return h$1("div", { ref: "el" });
} });
function h() {
  const t2 = {};
  for (const n2 in components)
    t2[n2.substring(3)] = u;
  return t2;
}
const q$1 = (n2) => ({}), a = (n2) => ({});
function y(n2) {
  let o;
  const f2 = n2[2].controls, e2 = create_slot(f2, n2, n2[1], a);
  return { c() {
    e2 && e2.c();
  }, m(t2, l) {
    e2 && e2.m(t2, l), o = true;
  }, p(t2, l) {
    e2 && e2.p && (!o || l & 2) && update_slot_base(e2, f2, t2, t2[1], o ? get_slot_changes(f2, t2[1], l, q$1) : get_all_dirty_from_scope(t2[1]), a);
  }, i(t2) {
    o || (transition_in(e2, t2), o = true);
  }, o(t2) {
    transition_out(e2, t2), o = false;
  }, d(t2) {
    e2 && e2.d(t2);
  } };
}
function I(n2) {
  let o;
  const f2 = n2[2].default, e2 = create_slot(f2, n2, n2[1], null);
  return { c() {
    e2 && e2.c();
  }, m(t2, l) {
    e2 && e2.m(t2, l), o = true;
  }, p(t2, l) {
    e2 && e2.p && (!o || l & 2) && update_slot_base(e2, f2, t2, t2[1], o ? get_slot_changes(f2, t2[1], l, null) : get_all_dirty_from_scope(t2[1]), null);
  }, i(t2) {
    o || (transition_in(e2, t2), o = true);
  }, o(t2) {
    transition_out(e2, t2), o = false;
  }, d(t2) {
    e2 && e2.d(t2);
  } };
}
function N(n2) {
  let o, f2, e2, t2 = n2[0] === "controls" && y(n2), l = n2[0] === "default" && I(n2);
  return { c() {
    t2 && t2.c(), o = space(), l && l.c(), f2 = empty();
  }, m(s, i2) {
    t2 && t2.m(s, i2), insert(s, o, i2), l && l.m(s, i2), insert(s, f2, i2), e2 = true;
  }, p(s, [i2]) {
    s[0] === "controls" && t2.p(s, i2), s[0] === "default" && l.p(s, i2);
  }, i(s) {
    e2 || (transition_in(t2), transition_in(l), e2 = true);
  }, o(s) {
    transition_out(t2), transition_out(l), e2 = false;
  }, d(s) {
    t2 && t2.d(s), s && detach(o), l && l.d(s), s && detach(f2);
  } };
}
function R(n2, o, f2) {
  let { $$slots: e2 = {}, $$scope: t2 } = o;
  const l = getContext("__hstSlot");
  return setContext("__hstIndex", { value: 0 }), n2.$$set = (i2) => {
    "$$scope" in i2 && f2(1, t2 = i2.$$scope);
  }, [l, t2, e2];
}
class z$2 extends SvelteComponent {
  constructor(o) {
    super(), init(this, o, R, N, safe_not_equal, {});
  }
}
const j = (n2) => ({}), d = (n2) => ({});
function b(n2) {
  let l, r2, t2, e2 = n2[1] === "default" && w(n2), o = n2[1] === "controls" && z$1(n2);
  return { c() {
    e2 && e2.c(), l = space(), o && o.c(), r2 = empty();
  }, m(s, i2) {
    e2 && e2.m(s, i2), insert(s, l, i2), o && o.m(s, i2), insert(s, r2, i2), t2 = true;
  }, p(s, i2) {
    s[1] === "default" && e2.p(s, i2), s[1] === "controls" && o.p(s, i2);
  }, i(s) {
    t2 || (transition_in(e2), transition_in(o), t2 = true);
  }, o(s) {
    transition_out(e2), transition_out(o), t2 = false;
  }, d(s) {
    e2 && e2.d(s), s && detach(l), o && o.d(s), s && detach(r2);
  } };
}
function w(n2) {
  let l;
  const r2 = n2[3].default, t2 = create_slot(r2, n2, n2[2], null);
  return { c() {
    t2 && t2.c();
  }, m(e2, o) {
    t2 && t2.m(e2, o), l = true;
  }, p(e2, o) {
    t2 && t2.p && (!l || o & 4) && update_slot_base(t2, r2, e2, e2[2], l ? get_slot_changes(r2, e2[2], o, null) : get_all_dirty_from_scope(e2[2]), null);
  }, i(e2) {
    l || (transition_in(t2, e2), l = true);
  }, o(e2) {
    transition_out(t2, e2), l = false;
  }, d(e2) {
    t2 && t2.d(e2);
  } };
}
function z$1(n2) {
  let l;
  const r2 = n2[3].controls, t2 = create_slot(r2, n2, n2[2], d);
  return { c() {
    t2 && t2.c();
  }, m(e2, o) {
    t2 && t2.m(e2, o), l = true;
  }, p(e2, o) {
    t2 && t2.p && (!l || o & 4) && update_slot_base(t2, r2, e2, e2[2], l ? get_slot_changes(r2, e2[2], o, j) : get_all_dirty_from_scope(e2[2]), d);
  }, i(e2) {
    l || (transition_in(t2, e2), l = true);
  }, o(e2) {
    transition_out(t2, e2), l = false;
  }, d(e2) {
    t2 && t2.d(e2);
  } };
}
function A$1(n2) {
  let l, r2, t2 = n2[0] && b(n2);
  return { c() {
    t2 && t2.c(), l = empty();
  }, m(e2, o) {
    t2 && t2.m(e2, o), insert(e2, l, o), r2 = true;
  }, p(e2, [o]) {
    e2[0] ? t2 ? (t2.p(e2, o), o & 1 && transition_in(t2, 1)) : (t2 = b(e2), t2.c(), transition_in(t2, 1), t2.m(l.parentNode, l)) : t2 && (group_outros(), transition_out(t2, 1, 1, () => {
      t2 = null;
    }), check_outros());
  }, i(e2) {
    r2 || (transition_in(t2), r2 = true);
  }, o(e2) {
    transition_out(t2), r2 = false;
  }, d(e2) {
    t2 && t2.d(e2), e2 && detach(l);
  } };
}
function B(n2, l, r2) {
  let t2, { $$slots: e2 = {}, $$scope: o } = l;
  const s = getContext("__hstStory"), i2 = getContext("__hstVariant"), V2 = getContext("__hstSlot"), p2 = getContext("__hstIndex"), C2 = s.variants[p2.value];
  p2.value++, n2.$$set = (m2) => {
    "$$scope" in m2 && r2(2, o = m2.$$scope);
  };
  r2(0, t2 = i2.id === C2.id);
  return [t2, V2, o, e2];
}
class H$1 extends SvelteComponent {
  constructor(l) {
    super(), init(this, l, B, A$1, safe_not_equal, {});
  }
}
function W(i2) {
  let t2, o = i2[0].name + "", r2;
  return { c() {
    t2 = element("div"), r2 = text(o);
  }, m(a2, n2) {
    insert(a2, t2, n2), append(t2, r2), i2[3](t2);
  }, p(a2, [n2]) {
    n2 & 1 && o !== (o = a2[0].name + "") && set_data(r2, o);
  }, i: noop$3, o: noop$3, d(a2) {
    a2 && detach(t2), i2[3](null);
  } };
}
function z(i2, t2, o) {
  const r2 = ["controlComponent", "value"];
  let a2 = compute_rest_props(t2, r2), { controlComponent: n2 } = t2, { value: s } = t2;
  const b2 = createEventDispatcher();
  let l, m2;
  const p2 = reactive({});
  function f2(e2, c2) {
    Object.assign(p2, { value: e2, attrs: c2 });
  }
  onMount(() => {
    f2(s, a2), m2 = createApp({ render() {
      const e2 = {};
      if (n2.emits)
        for (const c2 in n2.emits) {
          const u2 = Array.isArray(n2.emits) ? n2.emits[c2] : c2, d2 = u2 === "input" ? "update:modelValue" : u2;
          e2[`on${d2.charAt(0).toUpperCase()}${d2.substring(1)}`] = (..._4) => {
            u2 === "update:modelValue" ? o(2, s = _4[0]) : b2(u2, ..._4);
          };
        }
      return h$1(n2, { modelValue: s, ...p2.attrs, ...e2, key: "component" });
    } }), m2.mount(l);
  });
  function g(e2) {
    binding_callbacks[e2 ? "unshift" : "push"](() => {
      l = e2, o(1, l);
    });
  }
  return i2.$$set = (e2) => {
    t2 = assign$1(assign$1({}, t2), exclude_internal_props(e2)), o(8, a2 = compute_rest_props(t2, r2)), "controlComponent" in e2 && o(0, n2 = e2.controlComponent), "value" in e2 && o(2, s = e2.value);
  }, i2.$$.update = () => {
    f2(s, a2);
  }, [n2, l, s, g];
}
class H extends SvelteComponent {
  constructor(t2) {
    super(), init(this, t2, z, W, safe_not_equal, { controlComponent: 0, value: 2 });
  }
}
function c(e2) {
  const o = {};
  for (const t2 in e2) {
    if (t2 === "Hst")
      continue;
    const r2 = e2[t2];
    typeof r2 != "function" && (o[t2] = r2);
  }
  return o;
}
function p(e2, o) {
  let t2 = false;
  const r2 = watch(() => e2, (n2) => {
    n2 != null && (t2 ? t2 = false : (t2 = true, o(n2)));
  }, { deep: true, immediate: true });
  function f2(n2) {
    n2 != null && (t2 ? t2 = false : (t2 = true, applyState(e2, c(n2))));
  }
  return { apply: f2, stop() {
    r2();
  } };
}
const P = defineComponent({ name: "RenderStory", props: { variant: { type: Object, required: true }, story: { type: Object, required: true }, slotName: { type: String, default: "default" } }, setup(t2, { emit: i2 }) {
  const u2 = ref();
  let r2, a2, c2 = [];
  function $2(n2, s) {
    document.addEventListener(n2, s);
    const e2 = () => document.removeEventListener(n2, s);
    return c2.push(e2), { off: e2 };
  }
  async function l() {
    a2 = document.createElement("div"), u2.value.appendChild(a2);
    let n2 = [];
    const { off: s } = $2("SvelteRegisterComponent", (o) => {
      const { component: p2 } = o.detail;
      n2.push(p2);
    });
    r2 = new t2.story.file.component({ target: a2, props: { Hst: { Story: z$2, Variant: H$1, ...q() } }, context: new Map(Object.entries({ __hstStory: t2.story, __hstVariant: t2.variant, __hstSlot: t2.slotName })) });
    let e2 = n2.find((o) => o.$$ === r2.$$);
    s(), n2 = [];
    function d2() {
      const o = e2.$replace;
      !o || (e2.$replace = (...p2) => {
        const S2 = o.apply(e2, p2);
        return e2 = S2, h2(), d2(), S2;
      });
    }
    d2();
    const { apply: v2, stop: _4 } = p(t2.variant.state, (o) => {
      e2.$inject_state(o);
    });
    c2.push(_4);
    function h2() {
      e2.$$.after_update.push(() => {
        v2(e2.$capture_state());
      });
    }
    h2(), v2(e2.$capture_state()), typeof (m == null ? void 0 : void 0) == "function" && await (void 0)({ app: r2, story: t2.story, variant: t2.variant }), typeof (f == null ? void 0 : void 0) == "function" && await (void 0)({ app: r2, story: t2.story, variant: t2.variant }), typeof t2.variant.setupApp == "function" && await t2.variant.setupApp({ app: r2, story: t2.story, variant: t2.variant }), i2("ready");
  }
  function y2() {
    var n2;
    r2 == null || r2.$destroy(), a2 && ((n2 = a2.parentNode) == null || n2.removeChild(a2), a2 = null), c2.forEach((s) => s()), c2 = [];
  }
  return watch(() => t2.story.id, async () => {
    y2(), await l();
  }), onMounted(async () => {
    await l();
  }), onUnmounted(() => {
    y2();
  }), { el: u2 };
}, render() {
  return h$1("div", { ref: "el" });
} });
function q() {
  const t2 = {};
  for (const i2 in components)
    t2[i2.substring(3)] = A(components[i2]);
  return t2;
}
function A(t2) {
  function i2(u2) {
    return new H({ ...u2, props: { ...u2.props, controlComponent: t2 } });
  }
  return i2;
}
function e() {
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MountStory: x,
  RenderStory: P,
  generateSourceCode: e
}, Symbol.toStringTag, { value: "Module" }));
export {
  validate_slots as $,
  useStorage as A,
  renderList as B,
  onUnmounted as C,
  withModifiers as D,
  normalizeStyle as E,
  Fragment as F,
  useEventListener as G,
  isRef as H,
  Icon as I,
  resolveDirective as J,
  withDirectives as K,
  useMediaQuery as L,
  createTextVNode as M,
  pushScopeId as N,
  popScopeId as O,
  defineAsyncComponent as P,
  vShow as Q,
  reactive as R,
  useTitle as S,
  Transition as T,
  createApp as U,
  createPinia as V,
  plugin as W,
  SvelteComponentDev as X,
  init as Y,
  safe_not_equal as Z,
  dispatch_dev as _,
  createBaseVNode as a,
  unindent as a$,
  style as a0,
  apply as a1,
  tw as a2,
  empty as a3,
  insert_dev as a4,
  group_outros as a5,
  transition_out as a6,
  check_outros as a7,
  transition_in as a8,
  detach_dev as a9,
  set_data_dev as aA,
  useDark as aB,
  useToggle as aC,
  markRaw as aD,
  watchEffect as aE,
  resolveDynamicComponent as aF,
  parseQuery as aG,
  h$1 as aH,
  applyState as aI,
  toRefs as aJ,
  useRouter as aK,
  useResizeObserver as aL,
  vModelText as aM,
  createStaticVNode as aN,
  toRaw as aO,
  Dropdown as aP,
  clone as aQ,
  omit as aR,
  useTimeoutFn as aS,
  onClickOutside as aT,
  nextTick as aU,
  HstTextarea as aV,
  HstCheckbox as aW,
  HstNumber as aX,
  HstText as aY,
  shallowRef as aZ,
  getHighlighter as a_,
  create_slot as aa,
  element as ab,
  attr_dev as ac,
  add_location as ad,
  update_slot_base as ae,
  get_all_dirty_from_scope as af,
  get_slot_changes as ag,
  set_style as ah,
  append_dev as ai,
  assign$1 as aj,
  compute_rest_props as ak,
  exclude_internal_props as al,
  set_attributes as am,
  get_spread_update as an,
  noop$3 as ao,
  setup as ap,
  chroma as aq,
  colors as ar,
  binding_callbacks as as,
  bind as at,
  create_component as au,
  mount_component as av,
  destroy_component as aw,
  space as ax,
  add_flush_callback as ay,
  text as az,
  renderSlot as b,
  HstCopyIcon as b0,
  setCDN as b1,
  onBeforeUnmount as b2,
  useFocus as b3,
  refDebounced as b4,
  flexsearch_bundle as b5,
  client as b6,
  index as b7,
  createBlock as c,
  defineComponent as d,
  withKeys as e,
  watch as f,
  onMounted as g,
  unref as h,
  computed as i,
  useRoute as j,
  ref as k,
  createElementBlock as l,
  mergeProps as m,
  normalizeClass as n,
  openBlock as o,
  createVNode as p,
  createCommentVNode as q,
  resolveComponent as r,
  scrollIntoView as s,
  toDisplayString as t,
  useCssVars as u,
  createRouter as v,
  withCtx as w,
  createWebHistory as x,
  createWebHashHistory as y,
  defineStore as z
};
