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
  var alignItems = [
    {
      caption: "Left",
      value: "left",
      checked: true
    },
    {
      caption: "Center",
      value: "center",
      checked: false
    },
    {
      caption: "Right",
      value: "right",
      checked: false
    }
  ];
  var autoItems = [
    {
      caption: "Fullwidth",
      value: "fullwidth",
      checked: false
    },
    {
      caption: "Auto Width",
      value: "auto-width",
      checked: false
    },
    {
      caption: "Auto Height",
      value: "auto-height",
      checked: false
    }
  ];
  var ImageBlock = class extends import_components.Module {
    constructor() {
      super(...arguments);
      this.tag = {};
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
      if (this.img) {
        this.img.display = "flex";
        this.img.width = this.tag.width;
        this.img.height = this.tag.height;
        switch (this.tag.align) {
          case "left":
            this.img.margin = { right: "auto" };
            break;
          case "center":
            this.img.margin = { left: "auto", right: "auto" };
            break;
          case "right":
            this.img.margin = { left: "auto" };
            break;
        }
      }
      this.widthElm.value = value.width;
      this.heightElm.value = value.height;
      this.alignElm.selectedValue = value.align;
      this.autoElm.selectedValue = value.auto;
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
    async config() {
      this.mdConfig.visible = true;
    }
    async onConfigCancel() {
      this.mdConfig.visible = false;
    }
    async onConfigSave() {
      this.tag.width = this.widthElm.value;
      this.tag.height = this.heightElm.value;
      this.tag.align = this.alignElm.selectedValue;
      this.tag.auto = this.autoElm.selectedValue;
      console.log("-----", this.tag);
      this.img.display = "flex";
      this.img.width = this.tag.width;
      this.img.height = this.tag.height;
      switch (this.tag.align) {
        case "left":
          this.img.margin = { right: "auto" };
          break;
        case "center":
          this.img.margin = { left: "auto", right: "auto" };
          break;
        case "right":
          this.img.margin = { left: "auto" };
          break;
      }
      this.mdConfig.visible = false;
    }
    validate() {
      return !!this.data;
    }
    async handleUploaderOnChange(control, files) {
      if (files && files[0]) {
        this.data = await this.uploader.toBase64(files[0]);
      }
    }
    onChangeAlign(source, event) {
      console.log("align: ", source.selectedValue);
    }
    onChangeAuto(source, event) {
      console.log("auto: ", source.selectedValue);
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", null, /* @__PURE__ */ this.$render("i-modal", {
        id: "mdConfig",
        showBackdrop: true,
        background: { color: "#FFF" },
        maxWidth: "500px",
        popupPlacement: "center",
        closeIcon: { name: "times", fill: "#aaa" }
      }, /* @__PURE__ */ this.$render("i-hstack", {
        justifyContent: "start",
        alignItems: "start"
      }, /* @__PURE__ */ this.$render("i-panel", {
        width: "30%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-input", {
        id: "widthElm",
        caption: "Width",
        width: "100%",
        captionWidth: "46px"
      })), /* @__PURE__ */ this.$render("i-panel", {
        width: "30%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-input", {
        id: "heightElm",
        caption: "Height",
        width: "100%",
        captionWidth: "50px"
      })), /* @__PURE__ */ this.$render("i-panel", {
        width: "40%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-label", {
        width: 100,
        caption: "Align",
        margin: { bottom: 8 }
      }), /* @__PURE__ */ this.$render("i-radio-group", {
        id: "alignElm",
        width: "100%",
        selectedValue: "left",
        radioItems: alignItems,
        onChanged: this.onChangeAlign,
        display: "block"
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        justifyContent: "start",
        alignItems: "center"
      }, /* @__PURE__ */ this.$render("i-panel", {
        width: "100%",
        padding: { top: 5, bottom: 5, left: 5, right: 5 }
      }, /* @__PURE__ */ this.$render("i-label", {
        width: 100,
        caption: "Auto",
        margin: { bottom: 8 }
      }), /* @__PURE__ */ this.$render("i-radio-group", {
        id: "autoElm",
        width: "100%",
        selectedValue: "left",
        radioItems: autoItems,
        onChanged: this.onChangeAuto,
        display: "block"
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        justifyContent: "end",
        alignItems: "center",
        padding: { top: 5, bottom: 5 }
      }, /* @__PURE__ */ this.$render("i-button", {
        caption: "Cancel",
        padding: { top: 5, bottom: 5, left: 10, right: 10 },
        font: { color: "white" },
        background: { color: "#B2554D" },
        icon: { name: "times", fill: "#FFF" },
        onClick: this.onConfigCancel
      }), /* @__PURE__ */ this.$render("i-button", {
        caption: "Save",
        padding: { top: 5, bottom: 5, left: 10, right: 10 },
        icon: { name: "save", fill: "#FFF" },
        onClick: this.onConfigSave,
        margin: { left: 5 },
        font: { color: "white" },
        background: { color: "#77B24D" }
      }))), /* @__PURE__ */ this.$render("i-panel", {
        id: "pnlImage"
      }, /* @__PURE__ */ this.$render("i-upload", {
        id: "uploader",
        onChanged: this.handleUploaderOnChange,
        multiple: true
      }), /* @__PURE__ */ this.$render("i-image", {
        id: "img",
        visible: false
      })));
    }
  };
  ImageBlock = __decorateClass([
    import_components.customModule,
    (0, import_components.customElements)("i-section-image")
  ], ImageBlock);
})();
