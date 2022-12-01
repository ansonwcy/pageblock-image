import {
  Module,
  Image,
  Input,
  Upload,
  Control,
  customElements,
  customModule,
  Modal,
  RadioGroup,
} from "@ijstech/components";
import { PageBlock } from "@image/global";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-section-image"]: ImageBlock;
    }
  }
}

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

@customModule
@customElements("i-section-image")
export class ImageBlock extends Module implements PageBlock {
  private data: any;
  private mdConfig: Modal;
  private uploader: Upload;
  private img: Image;
  private widthElm: Input;
  private heightElm: Input;
  private alignElm: RadioGroup;
  private autoElm: RadioGroup;
  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  async init() {
    super.init();
  }

  async getData() {
    return this.data;
  }

  async setData(value: any) {
    this.data = value;
    this.uploader.visible = false;
    this.img.visible = true;
    this.img.url = value;
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
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

  async discard() {}

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

  validate(): boolean {
    return !!this.data;
  }

  async handleUploaderOnChange(control: Control, files: any[]) {
    if (files && files[0]) {
      this.data = await this.uploader.toBase64(files[0]);
    }
  }

  onChangeAlign(source: Control, event: Event) {
    console.log("align: ", (source as RadioGroup).selectedValue);
  }

  onChangeAuto(source: Control, event: Event) {
    console.log("auto: ", (source as RadioGroup).selectedValue);
  }

  render() {
    return (
      <i-panel>
        <i-modal
          id={"mdConfig"}
          showBackdrop={true}
          background={{ color: "#FFF" }}
          maxWidth={"500px"}
          popupPlacement={"center"}
          closeIcon={{ name: "times", fill: "#aaa" }}
        >
          <i-hstack justifyContent={"start"} alignItems={"start"}>
            <i-panel
              width={"30%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-input
                id={"widthElm"}
                caption={"Width"}
                width={"100%"}
                captionWidth={"46px"}
              ></i-input>
            </i-panel>
            <i-panel
              width={"30%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-input
                id={"heightElm"}
                caption={"Height"}
                width={"100%"}
                captionWidth={"50px"}
              ></i-input>
            </i-panel>
            <i-panel
              width={"40%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-label
                width={100}
                caption="Align"
                margin={{ bottom: 8 }}
              ></i-label>
              <i-radio-group
                id="alignElm"
                width={"100%"}
                selectedValue="left"
                radioItems={alignItems}
                onChanged={this.onChangeAlign}
                display="block"
              ></i-radio-group>
            </i-panel>
          </i-hstack>

          <i-hstack justifyContent={"start"} alignItems={"center"}>
            <i-panel
              width={"100%"}
              padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <i-label
                width={100}
                caption="Auto"
                margin={{ bottom: 8 }}
              ></i-label>
              <i-radio-group
                id="autoElm"
                width={"100%"}
                selectedValue="left"
                radioItems={autoItems}
                onChanged={this.onChangeAuto}
                display="block"
              ></i-radio-group>
            </i-panel>
          </i-hstack>

          <i-hstack
            justifyContent={"end"}
            alignItems={"center"}
            padding={{ top: 5, bottom: 5 }}
          >
            <i-button
              caption={"Cancel"}
              padding={{ top: 5, bottom: 5, left: 10, right: 10 }}
              font={{ color: "white" }}
              background={{ color: "#B2554D" }}
              icon={{ name: "times", fill: "#FFF" }}
              onClick={this.onConfigCancel}
            ></i-button>
            <i-button
              caption={"Save"}
              padding={{ top: 5, bottom: 5, left: 10, right: 10 }}
              icon={{ name: "save", fill: "#FFF" }}
              onClick={this.onConfigSave}
              margin={{ left: 5 }}
              font={{ color: "white" }}
              background={{ color: "#77B24D" }}
            ></i-button>
          </i-hstack>
        </i-modal>

        <i-panel id={"pnlImage"}>
          <i-upload
            id={"uploader"}
            onChanged={this.handleUploaderOnChange}
            multiple={true}
          ></i-upload>

          <i-image id={"img"} visible={false}></i-image>
        </i-panel>
      </i-panel>
    );
  }
}
