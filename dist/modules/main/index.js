var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@image/main", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageBlock = void 0;
    const alignItems = [
        {
            caption: "Left",
            value: "left",
            checked: true,
        },
        {
            caption: "Center",
            value: "center",
            checked: false,
        },
        {
            caption: "Right",
            value: "right",
            checked: false,
        },
    ];
    const autoItems = [
        {
            caption: "Fullwidth",
            value: "fullwidth",
            checked: false,
        },
        {
            caption: "Auto Width",
            value: "auto-width",
            checked: false,
        },
        {
            caption: "Auto Height",
            value: "auto-height",
            checked: false,
        },
    ];
    let ImageBlock = class ImageBlock extends components_1.Module {
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
        async discard() { }
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
            return (this.$render("i-panel", null,
                this.$render("i-modal", { id: "mdConfig", showBackdrop: true, background: { color: "#FFF" }, maxWidth: "500px", popupPlacement: "center", closeIcon: { name: "times", fill: "#aaa" } },
                    this.$render("i-hstack", { justifyContent: "start", alignItems: "start" },
                        this.$render("i-panel", { width: "30%", padding: { top: 5, bottom: 5, left: 5, right: 5 } },
                            this.$render("i-input", { id: "widthElm", caption: "Width", width: "100%", captionWidth: "46px" })),
                        this.$render("i-panel", { width: "30%", padding: { top: 5, bottom: 5, left: 5, right: 5 } },
                            this.$render("i-input", { id: "heightElm", caption: "Height", width: "100%", captionWidth: "50px" })),
                        this.$render("i-panel", { width: "40%", padding: { top: 5, bottom: 5, left: 5, right: 5 } },
                            this.$render("i-label", { width: 100, caption: "Align", margin: { bottom: 8 } }),
                            this.$render("i-radio-group", { id: "alignElm", width: "100%", selectedValue: "left", radioItems: alignItems, onChanged: this.onChangeAlign, display: "block" }))),
                    this.$render("i-hstack", { justifyContent: "start", alignItems: "center" },
                        this.$render("i-panel", { width: "100%", padding: { top: 5, bottom: 5, left: 5, right: 5 } },
                            this.$render("i-label", { width: 100, caption: "Auto", margin: { bottom: 8 } }),
                            this.$render("i-radio-group", { id: "autoElm", width: "100%", selectedValue: "left", radioItems: autoItems, onChanged: this.onChangeAuto, display: "block" }))),
                    this.$render("i-hstack", { justifyContent: "end", alignItems: "center", padding: { top: 5, bottom: 5 } },
                        this.$render("i-button", { caption: "Cancel", padding: { top: 5, bottom: 5, left: 10, right: 10 }, font: { color: "white" }, background: { color: "#B2554D" }, icon: { name: "times", fill: "#FFF" }, onClick: this.onConfigCancel }),
                        this.$render("i-button", { caption: "Save", padding: { top: 5, bottom: 5, left: 10, right: 10 }, icon: { name: "save", fill: "#FFF" }, onClick: this.onConfigSave, margin: { left: 5 }, font: { color: "white" }, background: { color: "#77B24D" } }))),
                this.$render("i-panel", { id: "pnlImage" },
                    this.$render("i-upload", { id: "uploader", onChanged: this.handleUploaderOnChange, multiple: true }),
                    this.$render("i-image", { id: "img", visible: false }))));
        }
    };
    ImageBlock = __decorate([
        components_1.customModule,
        components_1.customElements("i-section-image")
    ], ImageBlock);
    exports.ImageBlock = ImageBlock;
});
