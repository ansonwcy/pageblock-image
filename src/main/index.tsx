import {
  Module,
  Panel,
  Image,
  Input,
  Upload,
  Control,
  customModule,
  Modal,
  RadioGroup,
  Button,
  HStack,
  Label,
  Link
} from "@ijstech/components";
import { PageBlock } from "@image/global";
import './index.css';
import { ImageCropper } from "@image/cropper";

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

const configSchema = {
  type: 'object',
  required: [],
  properties: {
    width: {
      type: 'string',
    },
    height: {
      type: 'string',
    },
    position: {
      type: 'string',
      enum: ['left', 'center', 'right'],
    },
    // 'backgroundColor': {
    //   type: 'string',
    //   format: 'color'
    // },
    // 'url': {
    //   type: 'string',
    // },
  }
}

@customModule
export class ImageBlock extends Module implements PageBlock {
  private data: any;
  private tempData: any;
  private mdConfig: Modal;
  private cropPopupWindow: Modal;
  private uploader: Upload;
  private img: Image;
  private imgLink: Label;
  // private widthElm: Input;
  // private heightElm: Input;
  // private alignElm: RadioGroup;
  // private autoElm: RadioGroup;
  private pnlImage: Panel;
  private croppingImg: Image;
  private imgToCrop: Image;
  private confirmCropBtn: Button;
  // private croppingImgPnl: HStack;
  private cropBtn: Button;
  private confirmCropHsk: HStack;
  private linkStack: Panel;
  private edtLink: Input;
  private imgCropper: ImageCropper;

  // private _newX: number = 0;
  // private _newY: number = 0;
  // private _newWidth: number = 0;
  // private _newHeight: number = 0;

  tag: any;
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  async init() {
    super.init();
  }

  getConfigSchema() {
    return configSchema;
  }

  async getData() {
    return this.data;
  }

  async setData(value: any) {
    console.log("set data");
    this.data = value;

    const uploader = document.getElementById("uploader");
    const imageElm = uploader?.getElementsByTagName("img")[0];
    if (imageElm)
      imageElm.src = value;
    else
      this.edtLink.value = value;

    this.uploader.visible = false;
    this.linkStack.visible = false;
    this.img.visible = true;
    this.img.url = value;
    // console.log('img url: ' + this.img.url)
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
    // this.widthElm.value = value.width;
    // this.heightElm.value = value.height;
    // this.alignElm.selectedValue = value.align;
    // this.autoElm.selectedValue = value.auto;
  }

  async edit() {
    console.log("edit");
    let img_uploader = this.uploader.getElementsByTagName("img")[0];
    if (img_uploader != undefined && img_uploader.src != undefined && img_uploader.src != null)
      this.cropBtn.visible = true;

    this.tempData = this.img.url;
    this.img.visible = false;
    this.uploader.visible = true;
    this.linkStack.visible = true;
  }

  async confirm() {
    console.log("confirm");
    const img_uploader = this.uploader.getElementsByTagName("img")[0];
    const hasUploader = img_uploader != undefined && img_uploader.src != undefined && img_uploader.src != null;
    const hasUrl = this.edtLink.value;
    if (hasUploader || hasUrl) {
      this.cropBtn.visible = false;
      this.uploader.visible = false;
      this.linkStack.visible = false;
      this.img.visible = true;
      this.img.url = this.data;
      this.setData(img_uploader?.src || this.edtLink.value);
    }
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

  async onConfigSave(config: any) {
    console.log("onConfigSave");
    this.tag = config;
    const { width, height, position, backgroundColor, url } = config;
    if (width)
      this.img.width = width;
    if (height)
      this.img.height = height;
    if (position)
      this.pnlImage.style.textAlign = position;
    // if (backgroundColor)
    //     this.pnlImage.background.color = backgroundColor;
    // if (url)
    //     this.imgLink.link = new Link(this, { href: url, target: '_blank' })

  }

  validate(): boolean {
    return !!this.data;
  }

  async handleUploaderOnChange(control: Control, files: any[]) {
    if (files && files[0]) {
      this.data = await this.uploader.toBase64(files[0]);
    }
    this.cropBtn.visible = true;
    let img_uploader = this.uploader.getElementsByTagName("img")[0];
    this.tempData = img_uploader.src;
    this.setData(img_uploader.src);
  }

  handleRemoved(control: Control, file: File) {
    this.cropBtn.visible = false;
    this.data = this.edtLink.value || '';
    this.tempData = this.edtLink.value || '';
  }

  onChangeAlign(source: Control, event: Event) {
    console.log("align: ", (source as RadioGroup).selectedValue);
  }

  onChangeAuto(source: Control, event: Event) {
    console.log("auto: ", (source as RadioGroup).selectedValue);
  }

  // showCropPopUpWindow() {
  //   console.log("showCropPopUpWindow")

  //   // clean the cropperDiv if need
  //   let cropperDiv_old = document.getElementById("cropperDiv");
  //   cropperDiv_old?.remove();

  //   // turn on the pop-up window
  //   this.cropPopupWindow.visible = true;
  //   this.croppingImgPnl.style.alignContent = 'center';

  //   // create a div to contain all points and the img
  //   var cropperDiv = document.createElement('div');
  //   cropperDiv.id = 'cropperDiv';
  //   cropperDiv.style.display = 'table';

  //   // create a img of cropper, append the img to cropperDiv
  //   const testImage = document.createElement('img');
  //   testImage.id = 'testImage';
  //   testImage.alt = 'test image';

  //   // get the img inside the i-upload
  //   let img_uploader = this.uploader.getElementsByTagName("img")[0];
  //   testImage.src = img_uploader.src;
  //   // testImage.src = this.img.url;


  //   // create a new empty canvas
  //   let canvas = document.createElement('canvas');
  //   canvas.classList.add('canvas');
  //   canvas.height = testImage.height;
  //   canvas.width = testImage.width;

  //   canvas.style.top = cropperDiv.style.top; // new
  //   canvas.style.left = cropperDiv.style.left; // new

  //   const ctx = canvas!.getContext('2d');
  //   var ptrn = ctx!.createPattern(testImage, 'no-repeat');
  //   ctx!.fillStyle = ptrn!;
  //   ctx!.fillRect(0, 0, canvas.width, canvas.height);
  //   cropperDiv.appendChild(canvas);
  //   cropperDiv.style.width = canvas.width + 'px';

  //   // append the div to croppingImgPnl
  //   this.croppingImgPnl.appendChild(cropperDiv);

  //   // append a button to croppingImgPnl
  //   this.croppingImgPnl.appendChild(
  //     <i-hstack id='confirmCropHsk' width='100%' horizontalAlignment="center" top={canvas.height} padding={{ top: '2rem', bottom: '1rem' }}>
  //       <i-button id='confirmCropBtn' caption='confirm to crop'
  //         onClick={() => this.comfirmCrop(this._newX, this._newY, this._newWidth, this._newHeight)} />
  //     </i-hstack>
  //   )

  //   // create 4 transparent darken div, and append them to cropperDiv
  //   let darkenFilter_N = document.createElement("div");
  //   darkenFilter_N.id = 'darkenFilter_N';
  //   let darkenFilter_E = document.createElement("div");
  //   darkenFilter_E.id = 'darkenFilter_E';
  //   let darkenFilter_S = document.createElement("div");
  //   darkenFilter_S.id = 'darkenFilter_S';
  //   let darkenFilter_W = document.createElement("div");
  //   darkenFilter_W.id = 'darkenFilter_W';

  //   darkenFilter_N.style.opacity = darkenFilter_E.style.opacity = darkenFilter_S.style.opacity = darkenFilter_W.style.opacity = '0.5';
  //   darkenFilter_N.style.position = darkenFilter_E.style.position = darkenFilter_S.style.position = darkenFilter_W.style.position = 'absolute'
  //   darkenFilter_N.style.background = darkenFilter_E.style.background = darkenFilter_S.style.background = darkenFilter_W.style.background = 'black'
  //   darkenFilter_N.style.zIndex = darkenFilter_E.style.zIndex = darkenFilter_S.style.zIndex = darkenFilter_W.style.zIndex = '185';
  //   cropperDiv.appendChild(darkenFilter_N);
  //   cropperDiv.appendChild(darkenFilter_E);
  //   cropperDiv.appendChild(darkenFilter_S);
  //   cropperDiv.appendChild(darkenFilter_W);

  //   this.cropPopupWindow.height = canvas.height + 60
  //   this.croppingImgPnl.height = canvas.height + 60

  //   this.cropPopupWindow.width = canvas.width + 50
  //   this.croppingImgPnl.width = '100%'

  //   this.cropPopupWindow.minWidth = 500
  //   // this.croppingImgPnl.minWidth = 500

  //   // declare mouse variables and events
  //   let minDistance = 70;
  //   var mousePosition_nw, mousePosition_ne, mousePosition_se, mousePosition_sw;
  //   var isDown_nw = false, isDown_ne = false, isDown_se = false, isDown_sw = false;
  //   var point_nw_offset = [0, 0], point_ne_offset = [0, 0], point_se_offset = [0, 0], point_sw_offset = [0, 0];

  //   document.addEventListener('mouseup', function () {
  //     isDown_nw = false;
  //   }, true);

  //   document.addEventListener('mouseup', function () {
  //     isDown_ne = false;
  //   }, true);

  //   document.addEventListener('mouseup', function () {
  //     isDown_se = false;
  //   }, true);

  //   document.addEventListener('mouseup', function () {
  //     isDown_sw = false;
  //   }, true);

  //   var point_nw = document.createElement("div");
  //   point_nw.classList.add('angle', 'angle-nw');
  //   point_nw.style.left = "0px";
  //   point_nw.style.top = '0px';

  //   var point_ne = document.createElement("div");
  //   point_ne.classList.add("angle", 'transform', 'angle-ne');
  //   point_ne.style.left = canvas.width + "px";
  //   point_ne.style.top = '0px'

  //   var point_se = document.createElement("div");
  //   point_se.classList.add("angle", 'transform', 'angle-se');
  //   point_se.style.left = canvas.width + "px";
  //   point_se.style.top = canvas.height + "px";

  //   var point_sw = document.createElement("div");
  //   point_sw.classList.add("angle", 'transform', 'angle-sw');
  //   point_sw.style.left = "0px";
  //   point_sw.style.top = canvas.height + "px";

  //   point_nw.addEventListener('mousedown', function (e) {
  //     isDown_nw = true;
  //     point_nw_offset = [
  //       point_nw.offsetLeft - e.clientX,
  //       point_nw.offsetTop - e.clientY
  //     ];
  //   }, true);

  //   point_ne.addEventListener('mousedown', function (e) {
  //     isDown_ne = true;
  //     point_ne_offset = [
  //       point_ne.offsetLeft - e.clientX,
  //       point_ne.offsetTop - e.clientY
  //     ];
  //   }, true);

  //   point_se.addEventListener('mousedown', function (e) {
  //     isDown_se = true;
  //     point_se_offset = [
  //       point_se.offsetLeft - e.clientX,
  //       point_se.offsetTop - e.clientY
  //     ];
  //   }, true);

  //   point_sw.addEventListener('mousedown', function (e) {
  //     isDown_sw = true;
  //     point_sw_offset = [
  //       point_sw.offsetLeft - e.clientX,
  //       point_sw.offsetTop - e.clientY
  //     ];
  //   }, true);

  //   document.addEventListener('mousemove', function (event) {
  //     event.preventDefault();
  //     if (isDown_nw) {
  //       mousePosition_nw = {

  //         x: event.clientX,
  //         y: event.clientY

  //       };

  //       // check constraint
  //       let violate_N = (mousePosition_nw.y + point_nw_offset[1]) <= 0;
  //       let violate_E = (mousePosition_nw.x + point_nw_offset[0]) >= Number(point_ne.style.left.replace("px", "")) - minDistance;
  //       let violate_S = (mousePosition_nw.y + point_nw_offset[1]) >= Number(point_sw.style.top.replace("px", "")) - minDistance;
  //       let violate_W = (mousePosition_nw.x + point_nw_offset[0]) <= 0;

  //       // move the point
  //       if (violate_N && violate_E) {

  //         console.log("violate_NE")
  //         point_nw.style.left = (Number(point_ne.style.left.replace("px", "")) - minDistance) + 'px';
  //         point_nw.style.top = point_ne.style.top;

  //       } else if (violate_E && violate_S) {

  //         console.log("violate_ES")
  //         point_nw.style.left = (Number(point_se.style.left.replace("px", "")) - minDistance) + 'px';
  //         point_nw.style.top = (Number(point_se.style.top.replace("px", "")) - minDistance) + 'px';

  //       } else if (violate_S && violate_W) {

  //         console.log("violate_SW")
  //         point_nw.style.left = point_sw.style.left;
  //         point_nw.style.top = (Number(point_sw.style.top.replace("px", "")) - minDistance) + 'px';

  //       } else if (violate_W && violate_N) {

  //         console.log("violate_WN")
  //         point_nw.style.left = 0 + 'px';
  //         point_nw.style.top = 0 + 'px';

  //       } else if (violate_N) {

  //         console.log("violate_N")
  //         point_nw.style.left = (mousePosition_nw.x + point_nw_offset[0]) + 'px';
  //         point_nw.style.top = '0px';

  //       } else if (violate_E) {

  //         console.log("violate_E");
  //         point_nw.style.left = (Number(point_ne.style.left.replace("px", "")) - minDistance) + 'px';
  //         point_nw.style.top = (mousePosition_nw.y + point_nw_offset[1]) + 'px';

  //       } else if (violate_S) {

  //         console.log("violate_S");
  //         point_nw.style.left = (mousePosition_nw.x + point_nw_offset[0]) + 'px';
  //         point_nw.style.top = (Number(point_sw.style.top.replace("px", "")) - minDistance) + 'px';

  //       } else if (violate_W) {

  //         console.log("violate_W");
  //         point_nw.style.left = '0px'
  //         point_nw.style.top = (mousePosition_nw.y + point_nw_offset[1]) + 'px';

  //       } else {

  //         point_nw.style.left = (mousePosition_nw.x + point_nw_offset[0]) + 'px';
  //         point_nw.style.top = (mousePosition_nw.y + point_nw_offset[1]) + 'px';

  //       }

  //       // move SW and NE correspondingly
  //       point_sw.style.left = point_nw.style.left
  //       point_ne.style.top = point_nw.style.top

  //       redrawLine();
  //     }
  //   }, true);

  //   document.addEventListener('mousemove', function (event) {
  //     event.preventDefault();
  //     if (isDown_ne) {
  //       mousePosition_ne = {

  //         x: event.clientX,
  //         y: event.clientY

  //       };

  //       // check constraint
  //       let violate_N = (mousePosition_ne.y + point_ne_offset[1]) <= 0;
  //       let violate_E = (mousePosition_ne.x + point_ne_offset[0]) >= canvas_line.width;
  //       let violate_S = (mousePosition_ne.y + point_ne_offset[1]) >= Number(point_se.style.top.replace("px", "")) - minDistance;
  //       let violate_W = (mousePosition_ne.x + point_ne_offset[0]) <= Number(point_nw.style.left.replace("px", "")) + minDistance;

  //       // move the point
  //       if (violate_N && violate_E) {

  //         console.log("violate_NE")
  //         point_ne.style.left = canvas_line.width + "px";
  //         point_ne.style.top = "0px";

  //       } else if (violate_E && violate_S) {

  //         console.log("violate_ES")
  //         point_ne.style.left = point_se.style.left;
  //         point_ne.style.top = (Number(point_se.style.top.replace("px", "")) - minDistance) + 'px';

  //       } else if (violate_S && violate_W) {

  //         console.log("violate_SW")
  //         point_ne.style.left = (Number(point_nw.style.left.replace("px", "")) + minDistance) + 'px';
  //         point_ne.style.top = (Number(point_se.style.top.replace("px", "")) - minDistance) + 'px';

  //       } else if (violate_W && violate_N) {

  //         console.log("violate_WN")
  //         point_ne.style.left = (Number(point_nw.style.left.replace("px", "")) + minDistance) + 'px';
  //         point_ne.style.top = point_nw.style.top;

  //       } else if (violate_N) {

  //         console.log("violate_N")
  //         point_ne.style.left = (mousePosition_ne.x + point_ne_offset[0]) + 'px';
  //         point_ne.style.top = '0px';

  //       } else if (violate_E) {

  //         console.log("violate_E");
  //         point_ne.style.left = canvas_line.width + 'px';
  //         point_ne.style.top = (mousePosition_ne.y + point_ne_offset[1]) + 'px';

  //       } else if (violate_S) {

  //         console.log("violate_S");
  //         point_ne.style.left = (mousePosition_ne.x + point_ne_offset[0]) + 'px';
  //         point_ne.style.top = (Number(point_se.style.top.replace("px", "")) - minDistance) + 'px';

  //       } else if (violate_W) {

  //         console.log("violate_W");
  //         point_ne.style.left = (Number(point_nw.style.left.replace("px", "")) + minDistance) + 'px';
  //         point_ne.style.top = (mousePosition_ne.y + point_ne_offset[1]) + 'px';

  //       } else {

  //         point_ne.style.left = (mousePosition_ne.x + point_ne_offset[0]) + 'px';
  //         point_ne.style.top = (mousePosition_ne.y + point_ne_offset[1]) + 'px';

  //       }

  //       // move SE and NW correspondingly
  //       point_se.style.left = point_ne.style.left
  //       point_nw.style.top = point_ne.style.top

  //       redrawLine();
  //     }
  //   }, true);

  //   document.addEventListener('mousemove', function (event) {
  //     event.preventDefault();
  //     if (isDown_se) {
  //       mousePosition_se = {

  //         x: event.clientX,
  //         y: event.clientY

  //       };

  //       // check constraint
  //       let violate_N = (mousePosition_se.y + point_se_offset[1]) <= Number(point_ne.style.top.replace("px", "")) + minDistance;
  //       let violate_E = (mousePosition_se.x + point_se_offset[0]) >= canvas_line.width;
  //       let violate_S = (mousePosition_se.y + point_se_offset[1]) >= canvas_line.height;
  //       let violate_W = (mousePosition_se.x + point_se_offset[0]) <= Number(point_sw.style.left.replace("px", "")) + minDistance;

  //       // move the point
  //       if (violate_N && violate_E) {

  //         console.log("violate_NE")
  //         point_se.style.left = point_ne.style.left;
  //         point_se.style.top = (Number(point_ne.style.top.replace("px", "")) + minDistance) + 'px';

  //       } else if (violate_E && violate_S) {

  //         console.log("violate_ES")
  //         point_se.style.left = canvas_line.width + 'px'
  //         point_se.style.top = canvas_line.height + 'px';

  //       } else if (violate_S && violate_W) {

  //         console.log("violate_SW")
  //         point_se.style.left = (Number(point_sw.style.left.replace("px", "")) + minDistance) + 'px';
  //         point_se.style.top = point_sw.style.top;

  //       } else if (violate_W && violate_N) {

  //         console.log("violate_WN")
  //         point_se.style.left = (Number(point_sw.style.left.replace("px", "")) + minDistance) + 'px';
  //         point_se.style.top = (Number(point_ne.style.top.replace("px", "")) + minDistance) + 'px';

  //       } else if (violate_N) {

  //         console.log("violate_N")
  //         point_se.style.left = (mousePosition_se.x + point_se_offset[0]) + 'px';
  //         point_se.style.top = (Number(point_ne.style.top.replace("px", "")) + minDistance) + 'px'

  //       } else if (violate_E) {

  //         console.log("violate_E");
  //         point_se.style.left = canvas_line.width + 'px';
  //         point_se.style.top = (mousePosition_se.y + point_se_offset[1]) + 'px';

  //       } else if (violate_S) {

  //         console.log("violate_S");
  //         point_se.style.left = (mousePosition_se.x + point_se_offset[0]) + 'px';
  //         point_se.style.top = canvas_line.height + 'px';

  //       } else if (violate_W) {

  //         console.log("violate_W");
  //         point_se.style.left = (Number(point_sw.style.left.replace("px", "")) + minDistance) + 'px';
  //         point_se.style.top = (mousePosition_se.y + point_se_offset[1]) + 'px';

  //       } else {

  //         point_se.style.left = (mousePosition_se.x + point_se_offset[0]) + 'px';
  //         point_se.style.top = (mousePosition_se.y + point_se_offset[1]) + 'px';

  //       }

  //       // move NE and SW correspondingly
  //       point_ne.style.left = point_se.style.left
  //       point_sw.style.top = point_se.style.top

  //       redrawLine();
  //     }
  //   }, true);

  //   document.addEventListener('mousemove', function (event) {
  //     event.preventDefault();
  //     if (isDown_sw) {
  //       mousePosition_sw = {

  //         x: event.clientX,
  //         y: event.clientY

  //       };

  //       // check constraint
  //       let violate_N = (mousePosition_sw.y + point_sw_offset[1]) <= Number(point_nw.style.top.replace("px", "")) + minDistance;
  //       let violate_E = (mousePosition_sw.x + point_sw_offset[0]) >= Number(point_se.style.left.replace("px", "")) - minDistance;
  //       let violate_S = (mousePosition_sw.y + point_sw_offset[1]) >= canvas_line.height;
  //       let violate_W = (mousePosition_sw.x + point_sw_offset[0]) <= 0;

  //       // move the point
  //       if (violate_N && violate_E) {

  //         console.log("violate_NE")
  //         point_sw.style.left = (Number(point_se.style.left.replace("px", "")) - minDistance) + 'px';
  //         point_sw.style.top = (Number(point_nw.style.top.replace("px", "")) + minDistance) + 'px';

  //       } else if (violate_E && violate_S) {

  //         console.log("violate_ES")
  //         point_sw.style.left = (Number(point_se.style.left.replace("px", "")) - minDistance) + 'px';
  //         point_sw.style.top = point_se.style.top;

  //       } else if (violate_S && violate_W) {

  //         console.log("violate_SW")
  //         point_sw.style.left = '0px';
  //         point_sw.style.top = canvas_line.height + 'px';

  //       } else if (violate_W && violate_N) {

  //         console.log("violate_WN")
  //         point_sw.style.left = point_nw.style.left;
  //         point_sw.style.top = (Number(point_nw.style.top.replace("px", "")) + minDistance) + 'px';

  //       } else if (violate_N) {

  //         console.log("violate_N")
  //         point_sw.style.left = (mousePosition_sw.x + point_sw_offset[0]) + 'px';
  //         point_sw.style.top = (Number(point_nw.style.top.replace("px", "")) + minDistance) + 'px'

  //       } else if (violate_E) {

  //         console.log("violate_E");
  //         point_sw.style.left = (Number(point_se.style.left.replace("px", "")) - minDistance) + 'px';
  //         point_sw.style.top = (mousePosition_sw.y + point_sw_offset[1]) + 'px';

  //       } else if (violate_S) {

  //         console.log("violate_S");
  //         point_sw.style.left = (mousePosition_sw.x + point_sw_offset[0]) + 'px';
  //         point_sw.style.top = canvas_line.height + 'px';

  //       } else if (violate_W) {

  //         console.log("violate_W");
  //         point_sw.style.left = 0 + 'px';
  //         point_sw.style.top = (mousePosition_sw.y + point_sw_offset[1]) + 'px';

  //       } else {

  //         point_sw.style.left = (mousePosition_sw.x + point_sw_offset[0]) + 'px';
  //         point_sw.style.top = (mousePosition_sw.y + point_sw_offset[1]) + 'px';

  //       }

  //       // move NW and SE correspondingly
  //       point_nw.style.left = point_sw.style.left
  //       point_se.style.top = point_sw.style.top

  //       redrawLine();
  //     }
  //   }, true);

  //   cropperDiv.appendChild(point_nw)
  //   cropperDiv.appendChild(point_ne)
  //   cropperDiv.appendChild(point_se)
  //   cropperDiv.appendChild(point_sw)

  //   let canvas_line = document.createElement('canvas');
  //   canvas_line.classList.add('canvas-line')

  //   canvas_line.height = testImage.height;
  //   canvas_line.width = testImage.width;

  //   canvas_line.style.top = cropperDiv.style.top;
  //   canvas_line.style.left = cropperDiv.style.left;

  //   cropperDiv.appendChild(canvas);
  //   cropperDiv.appendChild(canvas_line);

  //   const ctx_l = canvas_line!.getContext('2d');

  //   var updatePoints = () => {
  //     this._newX = Number(point_nw.style.left.replace("px", ""))
  //     this._newY = Number(point_nw.style.top.replace("px", ""))
  //     this._newWidth = Number(point_ne.style.left.replace("px", "")) - Number(point_nw.style.left.replace("px", ""))
  //     this._newHeight = Number(point_sw.style.top.replace("px", "")) - Number(point_nw.style.top.replace("px", ""))
  //   }

  //   var updateFilter = () => {

  //     darkenFilter_N.style.width = this._newWidth + 'px';
  //     darkenFilter_N.style.height = point_nw.style.top;
  //     darkenFilter_N.style.left = point_nw.style.left;
  //     darkenFilter_N.style.top = '0px'

  //     darkenFilter_E.style.width = (canvas_line.width - Number(point_ne.style.left.replace("px", ""))) + 'px'
  //     darkenFilter_E.style.height = canvas_line.height + 'px';
  //     darkenFilter_E.style.left = point_ne.style.left;
  //     darkenFilter_E.style.top = '0px'

  //     darkenFilter_S.style.width = this._newWidth + 'px';
  //     darkenFilter_S.style.height = (canvas_line.height - Number(point_sw.style.top.replace("px", ""))) + 'px'
  //     darkenFilter_S.style.left = point_sw.style.left;
  //     darkenFilter_S.style.top = point_sw.style.top;

  //     darkenFilter_W.style.width = point_nw.style.left;
  //     darkenFilter_W.style.height = canvas_line.height + 'px';
  //     darkenFilter_W.style.left = '0px';
  //     darkenFilter_W.style.top = '0px';

  //   }

  //   function redrawLine() {

  //     // clear the previous canvas
  //     ctx_l!.clearRect(0, 0, canvas_line.width, canvas_line.height);

  //     ctx_l!.beginPath();
  //     ctx_l!.setLineDash([]);

  //     // N line
  //     ctx_l!.moveTo(parseFloat(point_nw.style.left), parseFloat(point_nw.style.top));
  //     ctx_l!.lineTo(parseFloat(point_ne.style.left), parseFloat(point_ne.style.top));

  //     // E line
  //     ctx_l!.moveTo(parseFloat(point_ne.style.left), parseFloat(point_ne.style.top));
  //     ctx_l!.lineTo(parseFloat(point_se.style.left), parseFloat(point_se.style.top));

  //     // S line
  //     ctx_l!.moveTo(parseFloat(point_sw.style.left), parseFloat(point_sw.style.top));
  //     ctx_l!.lineTo(parseFloat(point_se.style.left), parseFloat(point_se.style.top));

  //     // W line
  //     ctx_l!.moveTo(parseFloat(point_sw.style.left), parseFloat(point_sw.style.top));
  //     ctx_l!.lineTo(parseFloat(point_nw.style.left), parseFloat(point_nw.style.top));

  //     ctx_l!.lineWidth = 2;
  //     ctx_l!.strokeStyle = '#ffffff';
  //     ctx_l!.stroke();

  //     ctx_l!.beginPath();
  //     ctx_l!.setLineDash([5, 10]);

  //     // vertical dashed lines

  //     let verticalStart1Left = (Number(point_ne.style.left.replace("px", "")) - Number(point_nw.style.left.replace("px", ""))) / 3.0 + Number(point_nw.style.left.replace("px", ""))
  //     let verticalStart2Left = (Number(point_ne.style.left.replace("px", "")) - Number(point_nw.style.left.replace("px", ""))) / 3.0 * 2.0 + Number(point_nw.style.left.replace("px", ""))

  //     ctx_l!.moveTo(verticalStart1Left, parseFloat(point_nw.style.top));
  //     ctx_l!.lineTo(verticalStart1Left, parseFloat(point_sw.style.top));

  //     ctx_l!.moveTo(verticalStart2Left, parseFloat(point_ne.style.top));
  //     ctx_l!.lineTo(verticalStart2Left, parseFloat(point_se.style.top));

  //     // horizontal dashed lines
  //     let horizontalStart1Top = (Number(point_sw.style.top.replace("px", "")) - Number(point_nw.style.top.replace("px", ""))) / 3.0 + Number(point_nw.style.top.replace("px", ""))
  //     let horizontalStart2Top = (Number(point_sw.style.top.replace("px", "")) - Number(point_nw.style.top.replace("px", ""))) / 3.0 * 2.0 + Number(point_nw.style.top.replace("px", ""))

  //     ctx_l!.moveTo(parseFloat(point_nw.style.left), horizontalStart1Top);
  //     ctx_l!.lineTo(parseFloat(point_ne.style.left), horizontalStart1Top);

  //     ctx_l!.moveTo(parseFloat(point_sw.style.left), horizontalStart2Top);
  //     ctx_l!.lineTo(parseFloat(point_se.style.left), horizontalStart2Top);

  //     ctx_l!.lineWidth = 1;
  //     ctx_l!.strokeStyle = '#ffffff';
  //     ctx_l!.stroke();

  //     updatePoints();
  //     updateFilter();
  //   }

  //   redrawLine();
  // }

  // comfirmCrop(newX: number, newY: number, newWidth: number, newHeight: number) {

  //   console.log("comfirmCrop");
  //   let img_uploader = this.uploader.getElementsByTagName("img")[0];

  //   // originalImage in form of img
  //   const originalImage = document.createElement('img');
  //   if (this.img.url != undefined && this.img.url != null)
  //     originalImage.src = this.img.url;
  //   else
  //     originalImage.src = img_uploader.src;

  //   // create a new empty canvas
  //   let canvas = document.createElement('canvas');
  //   canvas.height = window.innerHeight;
  //   canvas.width = window.innerWidth;
  //   const ctx = canvas!.getContext('2d');

  //   var ptrn = ctx!.createPattern(originalImage, 'no-repeat');
  //   ctx!.fillStyle = ptrn!;

  //   // converted the originalImage to canvas
  //   ctx!.fillRect(0, 0, canvas.width, canvas.height);

  //   // set the canvas size to the new width and height
  //   canvas.width = newWidth;
  //   canvas.height = newHeight;

  //   // draw the image
  //   ctx!.drawImage(originalImage, newX, newY, newWidth, newHeight, 0, 0, newWidth, newHeight);
  //   // this.img.url = canvas!.toDataURL();
  //   // this.setData(canvas!.toDataURL());
  //   this.img.url = canvas!.toDataURL();
  //   img_uploader.src = canvas!.toDataURL();

  //   this.cropPopupWindow.visible = false;

  //   // clean all element
  //   var cropperDiv = document.getElementById("cropperDiv");
  //   cropperDiv!.remove()
  //   this.croppingImgPnl.innerHTML = "";
  //   // this.cropBtn.visible = false;
  // }

  onChangedLink(source: Control) {
    const link = (source as Input).value;
    this.data = link;
  }

  render() {
    return (
      <i-panel>

        <i-modal
          id={"cropPopupWindow"}
          title={'Crop image'}
          showBackdrop={true}
          minWidth='500px'
          background={{ color: "#FFF" }}
          popupPlacement={"center"}
          closeIcon={{ name: "times", fill: "#aaa" }}
        >
          <i-panel margin={{ top: '1rem', bottom: '1rem' }}>
            {/* <i-hstack id={'croppingImgPnl'}>

            </i-hstack> */}
            <image-cropper id="imgCropper" img={this.img}></image-cropper>
          </i-panel>
        </i-modal>

        <i-vstack id={"pnlImage"}>
          <i-upload
            id={"uploader"}
            multiple={true}
            height={'100%'}
            onChanged={this.handleUploaderOnChange}
            onRemoved={this.handleRemoved}
          ></i-upload>
          <i-label id={"imgLink"}>
            <i-image id={"img"} visible={false} margin={{ bottom: '1rem' }}></i-image>
          </i-label>
          <i-panel>
            <i-button id={'cropBtn'} caption='crop' onClick={() => { this.imgCropper.visible = true }} visible={false} margin={{ bottom: '1rem', top: '1rem' }} />
          </i-panel>
          <i-panel id="linkStack">
            <i-label caption="URL"></i-label>
            <i-input id="edtLink" width="100%" onChanged={this.onChangedLink.bind(this)}></i-input>
          </i-panel>
        </i-vstack>
      </i-panel>
    );
  }
}
