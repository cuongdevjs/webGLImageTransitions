/**
 *
 * WebGl
 *
 */

import React, { memo } from 'react';
interface Props {}

export const CanvasContainer = memo((props: Props) => {
  return (
    <div id="content" className="content">
      <div
        id="slider"
        data-images='["/img/disp1.jpg","/img/disp3.jpg","/img/img11.jpg","/img/img12.jpg","/img/img13.jpg","/img/img21.jpg","/img/img22.jpg","/img/img23.jpg","/img/img31.jpg","/img/img32.jpg","/img/img33.jpg","/img/img41.jpg","/img/img42.jpg","/img/img43.jpg","/img/img51.jpg","/img/img52.jpg","/img/img53.jpg","/img/img61.jpg","/img/img62.jpg","/img/img63.jpg","/img/img71.jpg","/img/img72.jpg","/img/img73.jpg","/img/img81.jpg","/img/img82.jpg","/img/img83.jpg"]'
        data-displacement=""
      ></div>
    </div>
  );
});
