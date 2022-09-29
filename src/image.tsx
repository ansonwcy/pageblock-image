import {
    Module,
    Panel,
    Image,
    Input,
    Markdown,
    Upload,
    Control,
    customElements,
    customModule
} from '@ijstech/components';
import {PageBlock} from "./pageBlock.interface";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-section-image']: ImageBlock;
        }
    }
}

@customModule
@customElements('i-section-image')
export class ImageBlock extends Module implements PageBlock {
    private data: any;
    private txtMarkdown: Input;
    private mdViewer: Markdown;
    private pnlMarkdown: Panel;
    private uploader: Upload;
    private img: Image;
    tag: any;
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

    validate(): boolean {
        return !!this.data;
    }

    async handleUploaderOnChange(control: Control, files: any[]) {
        if(files && files[0]) {
            this.data = await this.uploader.toBase64(files[0]);
        }
    }

    async config() {

    }

    render() {
        return (
            <i-panel id={"pnlImage"}>
                <i-upload id={"uploader"} onChanged={this.handleUploaderOnChange} multiple={true}></i-upload>
                <i-image id={"img"} visible={false}></i-image>
            </i-panel>
        );
    }
}
