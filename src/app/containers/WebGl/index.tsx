/**
 *
 * WebGl
 *
 */

import React, { memo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import { WebGlWrapper } from './styled';
import './base.css';
import { useParams } from 'react-router-dom';
import { history } from 'utils/history';
import { CanvasContainer } from './components';

interface Props {}

// React.useEffect(() => {
//   import('./sketch/sketch.js').then(() => {
//     console.log('afafsa');
//     import('./sketch/demo1.js').then(() => {
//       console.log('afsafsaafafsa');
//       import('./sketch/demoad.js').then(component => callService());
//     });
//   });
// }, []);

export const WebGl = memo((props: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const params: { type?: string } = useParams();
  const linkArrs = new Array(8).fill(0).map((item, index) => '' + (index + 1));

  const getAllScriptTransition = useCallback(() => {
    return new Promise(async resolve => {
      const scripts = await document.querySelectorAll('[id^=demo]');
      await scripts.forEach(el => document.body.removeChild(el));
      resolve(true);
    });
  }, []);

  const addScript = useCallback((url: string, id: string) => {
    const el = document.createElement('script');
    el.setAttribute('id', id);
    el.src = url;
    // el.setAttribute('defer', 'defer');
    // el.setAttribute('async', 'async');
    document.body.appendChild(el);
  }, []);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMounted && params.type)
      getAllScriptTransition().then(() => {
        addScript(`/sketch/sketch.js`, `demo`);
        addScript(`/sketch/demo${params.type}.js`, `demo${params.type}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isMounted]);

  const onChangeType = useCallback((type: string) => {
    history.push(`/webgl/${type}`);
  }, []);

  return (
    <>
      <Helmet>
        <title>WebGl - Threejs - Transition Image</title>
        <meta name="description" content="Description of WebGl" />
      </Helmet>
      <WebGlWrapper>
        <main>
          <div className="frame">
            <div className="frame__title-wrap">
              <h1 className="frame__title">WebGL Image Transitions</h1>
            </div>
            <div className="frame__links">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/akella/webGLImageTransitions"
              >
                GitHub
              </a>
            </div>
            <div className="frame__info">Click the image</div>
            <div className="frame__demos">
              {linkArrs.map(item => (
                <span
                  onClick={() => onChangeType(item)}
                  key={item}
                  className={[
                    'frame__demo',
                    params && params.type === item
                      ? 'frame__demo--current'
                      : '',
                  ].join(' ')}
                >
                  Demo {item}
                </span>
              ))}
            </div>
          </div>
          <CanvasContainer key={params.type} />
        </main>
      </WebGlWrapper>
    </>
  );
});
