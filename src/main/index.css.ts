import { Styles } from '@ijstech/components';

Styles.cssRule('#cropImgWindow', {
  $nest: {
    ".angle": {
      zIndex: '200',
      position: 'absolute',
      width: '30px',
      height: '30px',
      background: 'black',
      clipPath: "polygon(0 0, 0 100%, 20% 100%, 20% 20%, 100% 20%, 100% 0)"
    },
    ".transform": {
      transformOrigin: "left top"
    },

    ".angle-nw:hover": {
      cursor: 'nw-resize',
      background: 'blue'
    },
    ".angle-ne:hover": {
      cursor: 'ne-resize',
      background: 'blue'
    },
    ".angle-sw:hover": {
      cursor: 'sw-resize',
      background: 'blue'
    },
    ".angle-se:hover": {
      cursor: 'se-resize',
      background: 'blue'
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
      zIndex: '180',
      position: 'absolute',
      top: '0px',
      left: '0px'
    },
    ".canvas-line": {
      zIndex: '190',
      position: 'absolute',
      top: '0px',
      left: '0px'
    }
  }
});

Styles.cssRule('#pnlImage', {
  $nest: {
    "i-upload i-button": {
      display: "none"
    },
    ".dropBoxTxt": {
      color: "#2F4050"
    }
  }
});
