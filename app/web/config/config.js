/* eslint-disable import/no-extraneous-dependencies */
import pxToViewPort from 'postcss-px-to-viewport';

const routes = [
  // {
  //   path:      '/practice/:id',
  //   title:     '题库练习',
  //   component: './pages/exam/practice'
  // },
  {
    path:      '/demo',
    title:     'umi的demo',
    component: '../pages/demo/index'
  },
  {
    path:      '/practiceList',
    title:     '智能练习',
    component: '../pages/practice/list/index'
  }
];

export default {
  ssr:        true,
  outputPath: '../public',
  plugins:    [
    [
      'umi-plugin-react',
      {
        locale: {
          baseNavigator: false,
        },
        hd:   false,
        antd: false,
        dva:  {
          immer: true
        },
        // TODO, page router css leak
        // dynamicImport: {
        //   webpackChunkName: true,
        // },
      },
    ],
  ],
  runtimePublicPath:   true,
  disableCSSModules:   false,
  cssModulesWithAffix: true,
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth:     750, // (Number) The width of the viewport.
      viewportHeight:    1334, // (Number) The height of the viewport.
      unitPrecision:     3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit:      'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      minPixelValue:     1, // (Number) Set the minimum pixel value to replace.
      mediaQuery:        false // (Boolean) Allow px to be converted in media queries.
    }),
  ],
  routes,
};
