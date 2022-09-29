(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // src/image.tsx
  var import_components = __toModule(__require("@ijstech/components"));
  var ImageBlock = class extends import_components.Module {
    constructor() {
      super(...arguments);
      this.defaultEdit = true;
    }
    async init() {
      super.init();
    }
    async getData() {
      return this.data;
    }
    async setData(value) {
      this.data = value;
      this.uploader.visible = false;
      this.img.visible = true;
      this.img.url = value;
    }
    getTag() {
      return this.tag;
    }
    async setTag(value) {
      this.tag = value;
    }
    async edit() {
      this.img.visible = false;
      this.uploader.visible = true;
    }
    async confirm() {
      this.uploader.visible = false;
      this.img.visible = true;
      this.img.url = this.data;
    }
    async discard() {
    }
    async configSave() {
    }
    validate() {
      return !!this.data;
    }
    async handleUploaderOnChange(control, files) {
      if (files && files[0]) {
        this.data = await this.uploader.toBase64(files[0]);
      }
    }
    async config() {
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", {
        id: "pnlImage"
      }, /* @__PURE__ */ this.$render("i-upload", {
        id: "uploader",
        onChanged: this.handleUploaderOnChange,
        multiple: true
      }), /* @__PURE__ */ this.$render("i-image", {
        id: "img",
        visible: false
      }));
    }
  };
  ImageBlock = __decorateClass([
    import_components.customModule,
    (0, import_components.customElements)("i-section-image")
  ], ImageBlock);
})();
