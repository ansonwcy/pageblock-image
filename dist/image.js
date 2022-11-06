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
  var import_components2 = __toModule(__require("@ijstech/components"));

  // src/image.css.ts
  var import_components = __toModule(__require("@ijstech/components"));
  var Theme = import_components.Styles.Theme.ThemeVars;
  import_components.Styles.cssRule("#cropImgWindow", {
    $nest: {
      ".angle": {
        zIndex: "200",
        position: "absolute",
        width: "30px",
        height: "30px",
        background: "black",
        clipPath: "polygon(0 0, 0 100%, 20% 100%, 20% 20%, 100% 20%, 100% 0)"
      },
      ".transform": {
        transformOrigin: "left top"
      },
      ".angle-nw:hover": {
        cursor: "nw-resize",
        background: "blue"
      },
      ".angle-ne:hover": {
        cursor: "ne-resize",
        background: "blue"
      },
      ".angle-sw:hover": {
        cursor: "sw-resize",
        background: "blue"
      },
      ".angle-se:hover": {
        cursor: "se-resize",
        background: "blue"
      },
      ".angle-ne": {
        transform: "rotate(90deg)"
      },
      ".angle-se": {
        transform: "rotate(180deg)"
      },
      ".angle-sw": {
        transform: "rotate(270deg)"
      },
      ".canvas": {
        zIndex: "180",
        position: "absolute",
        top: "0px",
        left: "0px"
      },
      ".canvas-line": {
        zIndex: "190",
        position: "absolute",
        top: "0px",
        left: "0px"
      }
    }
  });

  // src/image.tsx
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
  var ImageBlock = class extends import_components2.Module {
    constructor() {
      super(...arguments);
      this._newX = 0;
      this._newY = 0;
      this._newWidth = 0;
      this._newHeight = 0;
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
      console.log("set data");
      this.data = value;
      const uploader = document.getElementById("uploader");
      uploader.getElementsByTagName("img")[0].src = value;
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
      console.log("edit");
      let img_uploader = document.getElementsByTagName("i-upload")[0].getElementsByTagName("img")[0];
      if (img_uploader != void 0 && img_uploader.src != void 0 && img_uploader.src != null)
        this.cropBtn.visible = true;
      this.tempData = this.img.url;
      this.img.visible = false;
      this.uploader.visible = true;
    }
    async confirm() {
      console.log("confirm");
      let img_uploader = document.getElementsByTagName("i-upload")[0].getElementsByTagName("img")[0];
      this.cropBtn.visible = false;
      this.uploader.visible = false;
      this.img.visible = true;
      this.img.url = this.data;
      this.setData(img_uploader.src);
    }
    async discard() {
      console.log("discard");
      this.setData(this.tempData);
    }
    async config() {
      this.mdConfig.visible = true;
    }
    async onConfigCancel() {
      this.mdConfig.visible = false;
    }
    async onConfigSave() {
      console.log("onConfigSave");
      this.tag.width = this.widthElm.value;
      this.tag.height = this.heightElm.value;
      this.tag.align = this.alignElm.selectedValue;
      this.tag.auto = this.autoElm.selectedValue;
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
      this.cropBtn.visible = true;
      let img_uploader = document.getElementsByTagName("i-upload")[0].getElementsByTagName("img")[0];
      this.tempData = img_uploader.src;
      this.setData(img_uploader.src);
    }
    onChangeAlign(source, event) {
      console.log("align: ", source.selectedValue);
    }
    onChangeAuto(source, event) {
      console.log("auto: ", source.selectedValue);
    }
    showCropPopUpWindow() {
      console.log("showCropPopUpWindow");
      let cropperDiv_old = document.getElementById("cropperDiv");
      cropperDiv_old == null ? void 0 : cropperDiv_old.remove();
      this.cropImgWindow.visible = true;
      this.croppingImgPnl.style.alignContent = "center";
      var cropperDiv = document.createElement("div");
      cropperDiv.id = "cropperDiv";
      cropperDiv.style.display = "table";
      const testImage = document.createElement("img");
      testImage.id = "testImage";
      testImage.alt = "test image";
      let img_uploader = document.getElementsByTagName("i-upload")[0].getElementsByTagName("img")[0];
      testImage.src = img_uploader.src;
      let canvas = document.createElement("canvas");
      canvas.classList.add("canvas");
      canvas.height = testImage.height;
      canvas.width = testImage.width;
      canvas.style.top = cropperDiv.style.top;
      canvas.style.left = cropperDiv.style.left;
      const ctx = canvas.getContext("2d");
      var ptrn = ctx.createPattern(testImage, "no-repeat");
      ctx.fillStyle = ptrn;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cropperDiv.appendChild(canvas);
      cropperDiv.style.width = canvas.width + "px";
      this.croppingImgPnl.appendChild(cropperDiv);
      this.croppingImgPnl.appendChild(/* @__PURE__ */ this.$render("i-hstack", {
        id: "confirmCropHsk",
        width: "100%",
        horizontalAlignment: "center",
        top: canvas.height,
        padding: { top: "2rem", bottom: "1rem" }
      }, /* @__PURE__ */ this.$render("i-button", {
        id: "confirmCropBtn",
        caption: "confirm to crop",
        onClick: () => this.comfirmCrop(this._newX, this._newY, this._newWidth, this._newHeight)
      })));
      let darkenFilter_N = document.createElement("div");
      darkenFilter_N.id = "darkenFilter_N";
      let darkenFilter_E = document.createElement("div");
      darkenFilter_E.id = "darkenFilter_E";
      let darkenFilter_S = document.createElement("div");
      darkenFilter_S.id = "darkenFilter_S";
      let darkenFilter_W = document.createElement("div");
      darkenFilter_W.id = "darkenFilter_W";
      darkenFilter_N.style.opacity = darkenFilter_E.style.opacity = darkenFilter_S.style.opacity = darkenFilter_W.style.opacity = "0.5";
      darkenFilter_N.style.position = darkenFilter_E.style.position = darkenFilter_S.style.position = darkenFilter_W.style.position = "absolute";
      darkenFilter_N.style.background = darkenFilter_E.style.background = darkenFilter_S.style.background = darkenFilter_W.style.background = "black";
      darkenFilter_N.style.zIndex = darkenFilter_E.style.zIndex = darkenFilter_S.style.zIndex = darkenFilter_W.style.zIndex = "185";
      cropperDiv.appendChild(darkenFilter_N);
      cropperDiv.appendChild(darkenFilter_E);
      cropperDiv.appendChild(darkenFilter_S);
      cropperDiv.appendChild(darkenFilter_W);
      this.cropImgWindow.height = canvas.height + 60;
      this.croppingImgPnl.height = canvas.height + 60;
      this.cropImgWindow.width = canvas.width + 50;
      this.croppingImgPnl.width = "100%";
      this.cropImgWindow.minWidth = 500;
      let minDistance = 70;
      var mousePosition_nw, mousePosition_ne, mousePosition_se, mousePosition_sw;
      var isDown_nw = false, isDown_ne = false, isDown_se = false, isDown_sw = false;
      var point_nw_offset = [0, 0], point_ne_offset = [0, 0], point_se_offset = [0, 0], point_sw_offset = [0, 0];
      document.addEventListener("mouseup", function() {
        isDown_nw = false;
      }, true);
      document.addEventListener("mouseup", function() {
        isDown_ne = false;
      }, true);
      document.addEventListener("mouseup", function() {
        isDown_se = false;
      }, true);
      document.addEventListener("mouseup", function() {
        isDown_sw = false;
      }, true);
      var point_nw = document.createElement("div");
      point_nw.classList.add("angle", "angle-nw");
      point_nw.style.left = "0px";
      point_nw.style.top = "0px";
      var point_ne = document.createElement("div");
      point_ne.classList.add("angle", "transform", "angle-ne");
      point_ne.style.left = canvas.width + "px";
      point_ne.style.top = "0px";
      var point_se = document.createElement("div");
      point_se.classList.add("angle", "transform", "angle-se");
      point_se.style.left = canvas.width + "px";
      point_se.style.top = canvas.height + "px";
      var point_sw = document.createElement("div");
      point_sw.classList.add("angle", "transform", "angle-sw");
      point_sw.style.left = "0px";
      point_sw.style.top = canvas.height + "px";
      point_nw.addEventListener("mousedown", function(e) {
        isDown_nw = true;
        point_nw_offset = [
          point_nw.offsetLeft - e.clientX,
          point_nw.offsetTop - e.clientY
        ];
      }, true);
      point_ne.addEventListener("mousedown", function(e) {
        isDown_ne = true;
        point_ne_offset = [
          point_ne.offsetLeft - e.clientX,
          point_ne.offsetTop - e.clientY
        ];
      }, true);
      point_se.addEventListener("mousedown", function(e) {
        isDown_se = true;
        point_se_offset = [
          point_se.offsetLeft - e.clientX,
          point_se.offsetTop - e.clientY
        ];
      }, true);
      point_sw.addEventListener("mousedown", function(e) {
        isDown_sw = true;
        point_sw_offset = [
          point_sw.offsetLeft - e.clientX,
          point_sw.offsetTop - e.clientY
        ];
      }, true);
      document.addEventListener("mousemove", function(event) {
        event.preventDefault();
        if (isDown_nw) {
          mousePosition_nw = {
            x: event.clientX,
            y: event.clientY
          };
          let violate_N = mousePosition_nw.y + point_nw_offset[1] <= 0;
          let violate_E = mousePosition_nw.x + point_nw_offset[0] >= Number(point_ne.style.left.replace("px", "")) - minDistance;
          let violate_S = mousePosition_nw.y + point_nw_offset[1] >= Number(point_sw.style.top.replace("px", "")) - minDistance;
          let violate_W = mousePosition_nw.x + point_nw_offset[0] <= 0;
          if (violate_N && violate_E) {
            console.log("violate_NE");
            point_nw.style.left = Number(point_ne.style.left.replace("px", "")) - minDistance + "px";
            point_nw.style.top = point_ne.style.top;
          } else if (violate_E && violate_S) {
            console.log("violate_ES");
            point_nw.style.left = Number(point_se.style.left.replace("px", "")) - minDistance + "px";
            point_nw.style.top = Number(point_se.style.top.replace("px", "")) - minDistance + "px";
          } else if (violate_S && violate_W) {
            console.log("violate_SW");
            point_nw.style.left = point_sw.style.left;
            point_nw.style.top = Number(point_sw.style.top.replace("px", "")) - minDistance + "px";
          } else if (violate_W && violate_N) {
            console.log("violate_WN");
            point_nw.style.left = 0 + "px";
            point_nw.style.top = 0 + "px";
          } else if (violate_N) {
            console.log("violate_N");
            point_nw.style.left = mousePosition_nw.x + point_nw_offset[0] + "px";
            point_nw.style.top = "0px";
          } else if (violate_E) {
            console.log("violate_E");
            point_nw.style.left = Number(point_ne.style.left.replace("px", "")) - minDistance + "px";
            point_nw.style.top = mousePosition_nw.y + point_nw_offset[1] + "px";
          } else if (violate_S) {
            console.log("violate_S");
            point_nw.style.left = mousePosition_nw.x + point_nw_offset[0] + "px";
            point_nw.style.top = Number(point_sw.style.top.replace("px", "")) - minDistance + "px";
          } else if (violate_W) {
            console.log("violate_W");
            point_nw.style.left = "0px";
            point_nw.style.top = mousePosition_nw.y + point_nw_offset[1] + "px";
          } else {
            point_nw.style.left = mousePosition_nw.x + point_nw_offset[0] + "px";
            point_nw.style.top = mousePosition_nw.y + point_nw_offset[1] + "px";
          }
          point_sw.style.left = point_nw.style.left;
          point_ne.style.top = point_nw.style.top;
          redrawLine();
        }
      }, true);
      document.addEventListener("mousemove", function(event) {
        event.preventDefault();
        if (isDown_ne) {
          mousePosition_ne = {
            x: event.clientX,
            y: event.clientY
          };
          let violate_N = mousePosition_ne.y + point_ne_offset[1] <= 0;
          let violate_E = mousePosition_ne.x + point_ne_offset[0] >= canvas_line.width;
          let violate_S = mousePosition_ne.y + point_ne_offset[1] >= Number(point_se.style.top.replace("px", "")) - minDistance;
          let violate_W = mousePosition_ne.x + point_ne_offset[0] <= Number(point_nw.style.left.replace("px", "")) + minDistance;
          if (violate_N && violate_E) {
            console.log("violate_NE");
            point_ne.style.left = canvas_line.width + "px";
            point_ne.style.top = "0px";
          } else if (violate_E && violate_S) {
            console.log("violate_ES");
            point_ne.style.left = point_se.style.left;
            point_ne.style.top = Number(point_se.style.top.replace("px", "")) - minDistance + "px";
          } else if (violate_S && violate_W) {
            console.log("violate_SW");
            point_ne.style.left = Number(point_nw.style.left.replace("px", "")) + minDistance + "px";
            point_ne.style.top = Number(point_se.style.top.replace("px", "")) - minDistance + "px";
          } else if (violate_W && violate_N) {
            console.log("violate_WN");
            point_ne.style.left = Number(point_nw.style.left.replace("px", "")) + minDistance + "px";
            point_ne.style.top = point_nw.style.top;
          } else if (violate_N) {
            console.log("violate_N");
            point_ne.style.left = mousePosition_ne.x + point_ne_offset[0] + "px";
            point_ne.style.top = "0px";
          } else if (violate_E) {
            console.log("violate_E");
            point_ne.style.left = canvas_line.width + "px";
            point_ne.style.top = mousePosition_ne.y + point_ne_offset[1] + "px";
          } else if (violate_S) {
            console.log("violate_S");
            point_ne.style.left = mousePosition_ne.x + point_ne_offset[0] + "px";
            point_ne.style.top = Number(point_se.style.top.replace("px", "")) - minDistance + "px";
          } else if (violate_W) {
            console.log("violate_W");
            point_ne.style.left = Number(point_nw.style.left.replace("px", "")) + minDistance + "px";
            point_ne.style.top = mousePosition_ne.y + point_ne_offset[1] + "px";
          } else {
            point_ne.style.left = mousePosition_ne.x + point_ne_offset[0] + "px";
            point_ne.style.top = mousePosition_ne.y + point_ne_offset[1] + "px";
          }
          point_se.style.left = point_ne.style.left;
          point_nw.style.top = point_ne.style.top;
          redrawLine();
        }
      }, true);
      document.addEventListener("mousemove", function(event) {
        event.preventDefault();
        if (isDown_se) {
          mousePosition_se = {
            x: event.clientX,
            y: event.clientY
          };
          let violate_N = mousePosition_se.y + point_se_offset[1] <= Number(point_ne.style.top.replace("px", "")) + minDistance;
          let violate_E = mousePosition_se.x + point_se_offset[0] >= canvas_line.width;
          let violate_S = mousePosition_se.y + point_se_offset[1] >= canvas_line.height;
          let violate_W = mousePosition_se.x + point_se_offset[0] <= Number(point_sw.style.left.replace("px", "")) + minDistance;
          if (violate_N && violate_E) {
            console.log("violate_NE");
            point_se.style.left = point_ne.style.left;
            point_se.style.top = Number(point_ne.style.top.replace("px", "")) + minDistance + "px";
          } else if (violate_E && violate_S) {
            console.log("violate_ES");
            point_se.style.left = canvas_line.width + "px";
            point_se.style.top = canvas_line.height + "px";
          } else if (violate_S && violate_W) {
            console.log("violate_SW");
            point_se.style.left = Number(point_sw.style.left.replace("px", "")) + minDistance + "px";
            point_se.style.top = point_sw.style.top;
          } else if (violate_W && violate_N) {
            console.log("violate_WN");
            point_se.style.left = Number(point_sw.style.left.replace("px", "")) + minDistance + "px";
            point_se.style.top = Number(point_ne.style.top.replace("px", "")) + minDistance + "px";
          } else if (violate_N) {
            console.log("violate_N");
            point_se.style.left = mousePosition_se.x + point_se_offset[0] + "px";
            point_se.style.top = Number(point_ne.style.top.replace("px", "")) + minDistance + "px";
          } else if (violate_E) {
            console.log("violate_E");
            point_se.style.left = canvas_line.width + "px";
            point_se.style.top = mousePosition_se.y + point_se_offset[1] + "px";
          } else if (violate_S) {
            console.log("violate_S");
            point_se.style.left = mousePosition_se.x + point_se_offset[0] + "px";
            point_se.style.top = canvas_line.height + "px";
          } else if (violate_W) {
            console.log("violate_W");
            point_se.style.left = Number(point_sw.style.left.replace("px", "")) + minDistance + "px";
            point_se.style.top = mousePosition_se.y + point_se_offset[1] + "px";
          } else {
            point_se.style.left = mousePosition_se.x + point_se_offset[0] + "px";
            point_se.style.top = mousePosition_se.y + point_se_offset[1] + "px";
          }
          point_ne.style.left = point_se.style.left;
          point_sw.style.top = point_se.style.top;
          redrawLine();
        }
      }, true);
      document.addEventListener("mousemove", function(event) {
        event.preventDefault();
        if (isDown_sw) {
          mousePosition_sw = {
            x: event.clientX,
            y: event.clientY
          };
          let violate_N = mousePosition_sw.y + point_sw_offset[1] <= Number(point_nw.style.top.replace("px", "")) + minDistance;
          let violate_E = mousePosition_sw.x + point_sw_offset[0] >= Number(point_se.style.left.replace("px", "")) - minDistance;
          let violate_S = mousePosition_sw.y + point_sw_offset[1] >= canvas_line.height;
          let violate_W = mousePosition_sw.x + point_sw_offset[0] <= 0;
          if (violate_N && violate_E) {
            console.log("violate_NE");
            point_sw.style.left = Number(point_se.style.left.replace("px", "")) - minDistance + "px";
            point_sw.style.top = Number(point_nw.style.top.replace("px", "")) + minDistance + "px";
          } else if (violate_E && violate_S) {
            console.log("violate_ES");
            point_sw.style.left = Number(point_se.style.left.replace("px", "")) - minDistance + "px";
            point_sw.style.top = point_se.style.top;
          } else if (violate_S && violate_W) {
            console.log("violate_SW");
            point_sw.style.left = "0px";
            point_sw.style.top = canvas_line.height + "px";
          } else if (violate_W && violate_N) {
            console.log("violate_WN");
            point_sw.style.left = point_nw.style.left;
            point_sw.style.top = Number(point_nw.style.top.replace("px", "")) + minDistance + "px";
          } else if (violate_N) {
            console.log("violate_N");
            point_sw.style.left = mousePosition_sw.x + point_sw_offset[0] + "px";
            point_sw.style.top = Number(point_nw.style.top.replace("px", "")) + minDistance + "px";
          } else if (violate_E) {
            console.log("violate_E");
            point_sw.style.left = Number(point_se.style.left.replace("px", "")) - minDistance + "px";
            point_sw.style.top = mousePosition_sw.y + point_sw_offset[1] + "px";
          } else if (violate_S) {
            console.log("violate_S");
            point_sw.style.left = mousePosition_sw.x + point_sw_offset[0] + "px";
            point_sw.style.top = canvas_line.height + "px";
          } else if (violate_W) {
            console.log("violate_W");
            point_sw.style.left = 0 + "px";
            point_sw.style.top = mousePosition_sw.y + point_sw_offset[1] + "px";
          } else {
            point_sw.style.left = mousePosition_sw.x + point_sw_offset[0] + "px";
            point_sw.style.top = mousePosition_sw.y + point_sw_offset[1] + "px";
          }
          point_nw.style.left = point_sw.style.left;
          point_se.style.top = point_sw.style.top;
          redrawLine();
        }
      }, true);
      cropperDiv.appendChild(point_nw);
      cropperDiv.appendChild(point_ne);
      cropperDiv.appendChild(point_se);
      cropperDiv.appendChild(point_sw);
      let canvas_line = document.createElement("canvas");
      canvas_line.classList.add("canvas-line");
      canvas_line.height = testImage.height;
      canvas_line.width = testImage.width;
      canvas_line.style.top = cropperDiv.style.top;
      canvas_line.style.left = cropperDiv.style.left;
      cropperDiv.appendChild(canvas);
      cropperDiv.appendChild(canvas_line);
      const ctx_l = canvas_line.getContext("2d");
      var updatePoints = () => {
        this._newX = Number(point_nw.style.left.replace("px", ""));
        this._newY = Number(point_nw.style.top.replace("px", ""));
        this._newWidth = Number(point_ne.style.left.replace("px", "")) - Number(point_nw.style.left.replace("px", ""));
        this._newHeight = Number(point_sw.style.top.replace("px", "")) - Number(point_nw.style.top.replace("px", ""));
      };
      var updateFilter = () => {
        darkenFilter_N.style.width = this._newWidth + "px";
        darkenFilter_N.style.height = point_nw.style.top;
        darkenFilter_N.style.left = point_nw.style.left;
        darkenFilter_N.style.top = "0px";
        darkenFilter_E.style.width = canvas_line.width - Number(point_ne.style.left.replace("px", "")) + "px";
        darkenFilter_E.style.height = canvas_line.height + "px";
        darkenFilter_E.style.left = point_ne.style.left;
        darkenFilter_E.style.top = "0px";
        darkenFilter_S.style.width = this._newWidth + "px";
        darkenFilter_S.style.height = canvas_line.height - Number(point_sw.style.top.replace("px", "")) + "px";
        darkenFilter_S.style.left = point_sw.style.left;
        darkenFilter_S.style.top = point_sw.style.top;
        darkenFilter_W.style.width = point_nw.style.left;
        darkenFilter_W.style.height = canvas_line.height + "px";
        darkenFilter_W.style.left = "0px";
        darkenFilter_W.style.top = "0px";
      };
      function redrawLine() {
        ctx_l.clearRect(0, 0, canvas_line.width, canvas_line.height);
        ctx_l.beginPath();
        ctx_l.setLineDash([]);
        ctx_l.moveTo(parseFloat(point_nw.style.left), parseFloat(point_nw.style.top));
        ctx_l.lineTo(parseFloat(point_ne.style.left), parseFloat(point_ne.style.top));
        ctx_l.moveTo(parseFloat(point_ne.style.left), parseFloat(point_ne.style.top));
        ctx_l.lineTo(parseFloat(point_se.style.left), parseFloat(point_se.style.top));
        ctx_l.moveTo(parseFloat(point_sw.style.left), parseFloat(point_sw.style.top));
        ctx_l.lineTo(parseFloat(point_se.style.left), parseFloat(point_se.style.top));
        ctx_l.moveTo(parseFloat(point_sw.style.left), parseFloat(point_sw.style.top));
        ctx_l.lineTo(parseFloat(point_nw.style.left), parseFloat(point_nw.style.top));
        ctx_l.lineWidth = 2;
        ctx_l.strokeStyle = "#ffffff";
        ctx_l.stroke();
        ctx_l.beginPath();
        ctx_l.setLineDash([5, 10]);
        let verticalStart1Left = (Number(point_ne.style.left.replace("px", "")) - Number(point_nw.style.left.replace("px", ""))) / 3 + Number(point_nw.style.left.replace("px", ""));
        let verticalStart2Left = (Number(point_ne.style.left.replace("px", "")) - Number(point_nw.style.left.replace("px", ""))) / 3 * 2 + Number(point_nw.style.left.replace("px", ""));
        ctx_l.moveTo(verticalStart1Left, parseFloat(point_nw.style.top));
        ctx_l.lineTo(verticalStart1Left, parseFloat(point_sw.style.top));
        ctx_l.moveTo(verticalStart2Left, parseFloat(point_ne.style.top));
        ctx_l.lineTo(verticalStart2Left, parseFloat(point_se.style.top));
        let horizontalStart1Top = (Number(point_sw.style.top.replace("px", "")) - Number(point_nw.style.top.replace("px", ""))) / 3 + Number(point_nw.style.top.replace("px", ""));
        let horizontalStart2Top = (Number(point_sw.style.top.replace("px", "")) - Number(point_nw.style.top.replace("px", ""))) / 3 * 2 + Number(point_nw.style.top.replace("px", ""));
        ctx_l.moveTo(parseFloat(point_nw.style.left), horizontalStart1Top);
        ctx_l.lineTo(parseFloat(point_ne.style.left), horizontalStart1Top);
        ctx_l.moveTo(parseFloat(point_sw.style.left), horizontalStart2Top);
        ctx_l.lineTo(parseFloat(point_se.style.left), horizontalStart2Top);
        ctx_l.lineWidth = 1;
        ctx_l.strokeStyle = "#ffffff";
        ctx_l.stroke();
        updatePoints();
        updateFilter();
      }
      redrawLine();
    }
    comfirmCrop(newX, newY, newWidth, newHeight) {
      console.log("comfirmCrop");
      let img_uploader = document.getElementsByTagName("i-upload")[0].getElementsByTagName("img")[0];
      const originalImage = document.createElement("img");
      if (this.img.url != void 0 && this.img.url != null)
        originalImage.src = this.img.url;
      else
        originalImage.src = img_uploader.src;
      let canvas = document.createElement("canvas");
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      const ctx = canvas.getContext("2d");
      var ptrn = ctx.createPattern(originalImage, "no-repeat");
      ctx.fillStyle = ptrn;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(originalImage, newX, newY, newWidth, newHeight, 0, 0, newWidth, newHeight);
      this.img.url = canvas.toDataURL();
      img_uploader.src = canvas.toDataURL();
      this.cropImgWindow.visible = false;
      var cropperDiv = document.getElementById("cropperDiv");
      cropperDiv.remove();
      this.croppingImgPnl.innerHTML = "";
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
      }))), /* @__PURE__ */ this.$render("i-modal", {
        id: "cropImgWindow",
        title: "Crop image",
        showBackdrop: true,
        minWidth: "500px",
        background: { color: "#FFF" },
        popupPlacement: "center",
        closeIcon: { name: "times", fill: "#aaa" }
      }, /* @__PURE__ */ this.$render("i-panel", {
        margin: { top: "1rem", bottom: "1rem" }
      }, /* @__PURE__ */ this.$render("i-hstack", {
        id: "croppingImgPnl"
      }))), /* @__PURE__ */ this.$render("i-panel", {
        id: "pnlImage"
      }, /* @__PURE__ */ this.$render("i-upload", {
        id: "uploader",
        onChanged: this.handleUploaderOnChange,
        multiple: true,
        height: "100%"
      }), /* @__PURE__ */ this.$render("i-image", {
        id: "img",
        visible: false
      }), /* @__PURE__ */ this.$render("i-button", {
        id: "cropBtn",
        caption: "crop",
        onClick: this.showCropPopUpWindow,
        visible: false,
        margin: { left: "1rem" }
      })));
    }
  };
  ImageBlock = __decorateClass([
    import_components2.customModule,
    (0, import_components2.customElements)("i-section-image")
  ], ImageBlock);
})();
