  // const fs = require('fs');
  // const path = require('path');

  // // ✅ Allowed CSS properties (camelCase)
  // const allowedStyles = new Set([
  //   // Layout
  //   'display',
  //   'flexDirection',
  //   'flexWrap',
  //   'justifyContent',
  //   'alignItems',
  //   'alignContent',
  //   'alignSelf',
  //   'order',
  //   'flexGrow',
  //   'flexShrink',
  //   'flexBasis',
  //   'gap',
  //   'rowGap',
  //   'columnGap',
  //   'gridTemplateColumns',
  //   'gridTemplateRows',
  //   'gridColumn',
  //   'gridRow',
  //   'gridColumnStart',
  //   'gridColumnEnd',
  //   'gridRowStart',
  //   'gridRowEnd',
  //   'gridArea',
  //   'placeItems',
  //   'placeContent',
  //   'placeSelf',

  //   // Size
  //   'width',
  //   'height',
  //   'minWidth',
  //   'minHeight',
  //   'maxWidth',
  //   'maxHeight',

  //   // Position
  //   'position',
  //   'top',
  //   'right',
  //   'bottom',
  //   'left',
  //   'zIndex'
  // ]);

  // /**
  //  * Recursively filter styles to retain only layout/position/size properties
  //  */
  // function filterStylesRecursively(node) {
  //   if (!node || typeof node !== 'object') return node;

  //   for (const tag in node) {
  //     const element = node[tag];

  //     if (element.styles && typeof element.styles === 'object') {
  //       const filtered = {};
  //       for (const key in element.styles) {
  //         if (allowedStyles.has(key)) {
  //           filtered[key] = element.styles[key];
  //         }
  //       }
  //       element.styles = filtered;
  //     }

  //     if (Array.isArray(element.children)) {
  //       element.children = element.children.map(filterStylesRecursively);
  //     }

  //     node[tag] = filterStylesRecursively(element);
  //   }

  //   return node;
  // }

  // // === Main Script ===
  // const inputPath = path.resolve(__dirname, 'input.json');
  // const outputPath = path.resolve(__dirname, 'output.filtered.json');

  // try {
  //   const raw = fs.readFileSync(inputPath, 'utf8');
  //   const parsed = JSON.parse(raw);
  //   const filtered = filterStylesRecursively(parsed);
  //   fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));
  //   console.log(`✅ Layout/position-only styles written to ${outputPath}`);
  // } catch (err) {
  //   console.error('❌ Failed to process JSON:', err.message);
  // }





// const fs = require('fs');
// const path = require('path');

// // ✅ Style keys to keep
// const allowedStyles = new Set([
//   // Layout: Flex/Grid
//   'display',
//   'flexDirection',
//   'flexWrap',
//   'justifyContent',
//   'alignItems',
//   'alignContent',
//   'alignSelf',
//   'order',
//   'flexGrow',
//   'flexShrink',
//   'flexBasis',
//   'gap',
//   'rowGap',
//   'columnGap',
//   'gridTemplateColumns',
//   'gridTemplateRows',
//   'gridColumn',
//   'gridRow',
//   'gridColumnStart',
//   'gridColumnEnd',
//   'gridRowStart',
//   'gridRowEnd',
//   'gridArea',
//   'placeItems',
//   'placeContent',
//   'placeSelf',

//   // Size
//   'width',
//   'height',

//   // Position
//   'position',
//   'top',
//   'right',
//   'bottom',
//   'left',
//   'zIndex'
// ]);

// // ✅ Tags to completely remove
// const removedTags = new Set([
//   'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
//   'P', 'SVG', 'IMG', 'IMAGE', 'VIDEO', 'WOW-IMAGE',
// ]);

// // Convert kebab-case to camelCase for matching
// function toCamelCase(str) {
//   return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
// }

// // ✅ Clean styles: only allow layout/position/background/size
// function filterAllowedStyles(styles) {
//   const result = {};
//   for (const key in styles) {
//     const camelKey = toCamelCase(key);
//     if (
//       allowedStyles.has(camelKey) ||
//       camelKey.startsWith('background')
//     ) {
//       result[key] = styles[key]; // keep original key style (kebab-case)
//     }
//   }
//   return result;
// }

// // ✅ Recursive cleaner
// function cleanNode(node) {
//   if (!node || typeof node !== 'object') return null;

//   // Remove the entire node if tag is in removed list
//   if (removedTags.has((node.tag || '').toUpperCase())) {
//     return null;
//   }

//   // Clean styles
//   if (node.styles && typeof node.styles === 'object') {
//     node.styles = filterAllowedStyles(node.styles);
//   }

//   // Recursively clean children
//   if (Array.isArray(node.children)) {
//     node.children = node.children
//       .map(cleanNode)
//       .filter(child => child !== null); // remove null children
//   }

//   return node;
// }

// // ✅ Traverse each top-level key
// function traverseAndClean(json) {
//   const cleaned = {};
//   for (const key in json) {
//     const result = cleanNode(json[key]);
//     if (result) cleaned[key] = result;
//   }
//   return cleaned;
// }

// // === Main Script ===
// const inputPath = path.resolve(__dirname, 'input.json');
// const outputPath = path.resolve(__dirname, 'output.filtered.json');

// try {
//   const raw = fs.readFileSync(inputPath, 'utf8');
//   const parsed = JSON.parse(raw);
//   const cleaned = traverseAndClean(parsed);
//   fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));
//   console.log(`✅ Cleaned JSON saved to ${outputPath}`);
// } catch (err) {
//   console.error('❌ Error:', err.message);
// }



const fs = require('fs');
const path = require('path');

// === Layout Styles ===
const allowedLayoutStyles = new Set([
  'display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent',
  'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow', 'gridColumnStart',
  'gridColumnEnd', 'gridRowStart', 'gridRowEnd', 'gridArea', 'placeItems', 'placeContent',
  'placeSelf', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'position', 'top', 'right', 'bottom', 'left', 'zIndex', 'backgroundColor'
]);

// === Widget Tags ===
const widgetTags = new Set([
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SVG', 'IMG', 'IMAGE', 'VIDEO', 'SPAN', 'BUTTON', 'A', 'TEXT'
]);

// === Widget Font/Text Styles ===
const fontAndTextStyles = new Set([
  'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight',
  'textAlign', 'textDecoration', 'textDecorationColor', 'textShadow', 'textTransform',
  'textOverflow', 'whiteSpace', 'wordBreak', 'wordWrap', 'overflowWrap',
  'textSizeAdjust', 'caretColor', 'color', 'outlineColor', 'textEmphasisColor',
  '-webkitTextFillColor', '-webkitTextStrokeColor'
]);

// === Widget Image/SVG/Video Styles ===
const svgImageStyles = new Set([
  'fill', 'stroke', 'strokeWidth', 'strokeOpacity', 'vectorEffect', 'transformOrigin',
  'perspectiveOrigin', 'display', 'position', 'top', 'right', 'bottom', 'left',
  'width', 'height', 'blockSize', 'inlineSize',
  'insetBlockStart', 'insetBlockEnd', 'insetInlineStart', 'insetInlineEnd',
  '-webkitTapHighlightColor'
]);

// === Common Background & Color Styles ===
const colorBackgroundStyles = new Set([
  'background', 'backgroundColor', 'backgroundImage', 'color'
]);

// === Helpers ===
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function filterLayoutStyles(styles) {
  const result = {};
  for (const key in styles) {
    const camelKey = toCamelCase(key);
    if (allowedLayoutStyles.has(camelKey) || camelKey.startsWith('background')) {
      result[key] = styles[key];
    }
  }
  return result;
}

function filterWidgetStyles(styles) {
  const result = {};
  for (const key in styles) {
    const camelKey = toCamelCase(key);
    if (
      fontAndTextStyles.has(camelKey) ||
      svgImageStyles.has(camelKey) ||
      colorBackgroundStyles.has(camelKey)
    ) {
      result[key] = styles[key];
    }
  }
  return result;
}

function splitNode(node) {
  if (!node || typeof node !== 'object') return { layout: null, widget: null };

  const isWidget = widgetTags.has((node.tag || '').toUpperCase());

  const layoutStyles = node.styles ? filterLayoutStyles(node.styles) : {};
  const widgetStyles = node.styles ? filterWidgetStyles(node.styles) : {};

  const children = Array.isArray(node.children) ? node.children.map(splitNode) : [];

  const layoutChildren = children.map(c => c.layout).filter(Boolean);
  const widgetChildren = children.map(c => c.widget).filter(Boolean);

  const layoutNode = !isWidget && Object.keys(layoutStyles).length > 0 ? {
    ...node,
    styles: layoutStyles,
    children: layoutChildren
  } : layoutChildren.length ? {
    ...node,
    styles: layoutStyles,
    children: layoutChildren
  } : null;

  const widgetNode = isWidget && Object.keys(widgetStyles).length > 0 ? {
    ...node,
    styles: widgetStyles,
    children: widgetChildren
  } : widgetChildren.length ? {
    ...node,
    styles: widgetStyles,
    children: widgetChildren
  } : null;

  return { layout: layoutNode, widget: widgetNode };
}

function splitJsonTree(parsed) {
  const layoutTree = {};
  const widgetTree = {};

  for (const key in parsed) {
    const { layout, widget } = splitNode(parsed[key]);
    if (layout) layoutTree[key] = layout;
    if (widget) widgetTree[key] = widget;
  }

  return { layoutTree, widgetTree };
}

// === Main Script ===
const inputPath = path.resolve(__dirname, 'input.json');
const layoutPath = path.resolve(__dirname, 'layout.filtered.json');
const widgetPath = path.resolve(__dirname, 'widgets.filtered.json');

try {
  const raw = fs.readFileSync(inputPath, 'utf8');
  const parsed = JSON.parse(raw);

  const { layoutTree, widgetTree } = splitJsonTree(parsed);

  fs.writeFileSync(layoutPath, JSON.stringify(layoutTree, null, 2));
  fs.writeFileSync(widgetPath, JSON.stringify(widgetTree, null, 2));

  console.log('✅ layout.filtered.json created');
  console.log('✅ widgets.filtered.json created');
} catch (err) {
  console.error('❌ Error:', err.message);
}























































//   const fs = require('fs');
// const path = require('path');

// // ✅ Allowed layout/size/position styles
// const allowedStyles = new Set([
//   // Layout: Flexbox & Grid
//   'display',
//   'flexDirection',
//   'flexWrap',
//   'justifyContent',
//   'alignItems',
//   'alignContent',
//   'alignSelf',
//   'order',
//   'flexGrow',
//   'flexShrink',
//   'flexBasis',
//   'gap',
//   'rowGap',
//   'columnGap',
//   'gridTemplateColumns',
//   'gridTemplateRows',
//   'gridColumn',
//   'gridRow',
//   'gridColumnStart',
//   'gridColumnEnd',
//   'gridRowStart',
//   'gridRowEnd',
//   'gridArea',
//   'placeItems',
//   'placeContent',
//   'placeSelf',

//   // Size
//   'width',
//   'height',
//   'minWidth',
//   'minHeight',
//   'maxWidth',
//   'maxHeight',

//   // Position
//   'position',
//   'top',
//   'right',
//   'bottom',
//   'left',
//   'zIndex'
// ]);

// /**
//  * Recursively filters styles to retain only layout/position/size properties
//  */
// function toCamelCase(str) {
//   return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
// }

// function filterStylesRecursively(node) {
//   if (!node || typeof node !== 'object') return node;

//   for (const tag in node) {
//     const element = node[tag];

//     if (element.styles && typeof element.styles === 'object') {
//       const filtered = {};
//       for (const key in element.styles) {
//         const camelKey = toCamelCase(key);
//         if (allowedStyles.has(camelKey)) {
//           filtered[key] = element.styles[key]; // use original key (kebab-case)
//         }
//       }
//       element.styles = filtered;
//     }

//     if (Array.isArray(element.children)) {
//       element.children = element.children.map(filterStylesRecursively);
//     }

//     node[tag] = filterStylesRecursively(element);
//   }

//   return node;
// }
// // === Main Script ===
// const inputPath = path.resolve(__dirname, 'input.json');
// const outputPath = path.resolve(__dirname, 'output.filtered.json');

// try {
//   const raw = fs.readFileSync(inputPath, 'utf8');
//   const parsed = JSON.parse(raw);
//   const filtered = filterStylesRecursively(parsed);
//   fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));
//   console.log(`✅ Layout/position-only styles written to ${outputPath}`);
// } catch (err) {
//   console.error('❌ Failed to process JSON:', err.message);
// }


  // Remove duplicate declarations and keep only one set of logic and variables

  // const fs = require('fs');
  // const path = require('path');

  // // ✅ Base Layout/Position/Size
  // const layoutStyles = [
  //   'display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent', 'alignSelf',
  //   'order', 'flexGrow', 'flexShrink', 'flexBasis', 'gap', 'rowGap', 'columnGap',
  //   'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow', 'gridColumnStart',
  //   'gridColumnEnd', 'gridRowStart', 'gridRowEnd', 'gridArea',
  //   'placeItems', 'placeContent', 'placeSelf',
  //   'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  //   'position', 'top', 'right', 'bottom', 'left', 'zIndex'
  // ];

  // // ✅ Font & Text
  // const fontAndTextStyles = [
  //   'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight',
  //   'textAlign', 'textDecoration', 'textDecorationColor', 'textShadow', 'textTransform',
  //   'textOverflow', 'whiteSpace', 'wordBreak', 'wordWrap', 'overflowWrap',
  //   'textSizeAdjust', 'caretColor', 'color', 'outlineColor', 'textEmphasisColor',
  //   '-webkitTextFillColor', '-webkitTextStrokeColor'
  // ];

  // // ✅ SVG & Image Styles
  // const svgImageStyles = [
  //   'fill', 'stroke', 'strokeWidth', 'strokeOpacity', 'vectorEffect',
  //   'transformOrigin', 'perspectiveOrigin',
  //   'display', 'position', 'top', 'right', 'bottom', 'left',
  //   'width', 'height', 'blockSize', 'inlineSize',
  //   'insetBlockStart', 'insetBlockEnd', 'insetInlineStart', 'insetInlineEnd',
  //   '-webkitTapHighlightColor'
  // ];

  // // ✅ Merge all
  // const allowedStyles = new Set([
  //   ...layoutStyles,
  //   ...fontAndTextStyles,
  //   ...svgImageStyles
  // ]);

  // const imageTags = new Set(['img', 'svg', 'path', 'g', 'image']);

  // /**
  //  * Filter styles deeply, retaining only allowed properties.
  //  */
  // function filterStylesRecursively(node) {
  //   if (!node || typeof node !== 'object') return node;

  //   for (const tag in node) {
  //     const element = node[tag];

  //     if (element.styles && typeof element.styles === 'object') {
  //       const filtered = {};
  //       for (const key in element.styles) {
  //         // Convert kebab-case to camelCase for comparison
  //         const normalizedKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
  //         if (allowedStyles.has(normalizedKey)) {
  //           filtered[key] = element.styles[key]; // preserve original key
  //         }
  //       }

  //       // Ensure width/height are kept for image tags
  //       if (imageTags.has(tag)) {
  //         if (element.styles.width) filtered.width = element.styles.width;
  //         if (element.styles.height) filtered.height = element.styles.height;
  //       }

  //       element.styles = filtered;
  //     }

  //     if (Array.isArray(element.children)) {
  //       element.children = element.children.map(filterStylesRecursively);
  //     }

  //     node[tag] = filterStylesRecursively(element);
  //   }

  //   return node;
  // }

  // // === Main Script ===
  // const inputPath = path.resolve(__dirname, 'input.json');
  // const outputPath = path.resolve(__dirname, 'output.filtered.json');

  // try {
  //   const raw = fs.readFileSync(inputPath, 'utf8');
  //   const parsed = JSON.parse(raw);
  //   const filtered = filterStylesRecursively(parsed);
  //   fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));
  //   console.log(`✅ Filtered styles (with font/text/svg) written to ${outputPath}`);
  // } catch (err) {
  //   console.error('❌ Failed to process JSON:', err.message);
  // }
//   const fs = require('fs');
// const path = require('path');

// // Font & Text Styles
// const fontAndTextStyles = [
//   'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight',
//   'textAlign', 'textDecoration', 'textDecorationColor', 'textShadow', 'textTransform',
//   'textOverflow', 'whiteSpace', 'wordBreak', 'wordWrap', 'overflowWrap',
//   'textSizeAdjust', 'caretColor', 'color', 'outlineColor', 'textEmphasisColor',
//   '-webkitTextFillColor', '-webkitTextStrokeColor'
// ];

// // SVG & Image Styles
// const svgImageStyles = [
//   'fill', 'stroke', 'strokeWidth', 'strokeOpacity', 'vectorEffect',
//   'transformOrigin', 'perspectiveOrigin',
//   'width', 'height', 'blockSize', 'inlineSize',
//   'insetBlockStart', 'insetBlockEnd', 'insetInlineStart', 'insetInlineEnd',
//   '-webkitTapHighlightColor'
// ];

// // Combine Allowed Styles
// const allowedStyles = new Set([...fontAndTextStyles, ...svgImageStyles]);

// // Tags where width/height is allowed
// const imageTags = new Set(['img', 'svg', 'path', 'g', 'image']);

// // Tags considered as layout wrappers
// const layoutTags = new Set(['div', 'section', 'main', 'article', 'header', 'footer', 'aside']);

// /**
//  * Recursively filters node styles:
//  * - Layout tags get no styles
//  * - Others get only allowed styles
//  */
// function filterStylesRecursively(node) {
//   if (!node || typeof node !== 'object') return node;

//   for (const tag in node) {
//     const element = node[tag];

//     // Wipe layout tag styles completely
//     if (layoutTags.has(tag.toLowerCase())) {
//       element.styles = {}; // Remove all layout styles
//     } else if (element.styles && typeof element.styles === 'object') {
//       const filtered = {};
//       for (const key in element.styles) {
//         const normalizedKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
//         if (allowedStyles.has(normalizedKey)) {
//           filtered[key] = element.styles[key]; // Keep allowed styles only
//         }
//       }

//       // Preserve width/height only for image/SVG tags
//       if (imageTags.has(tag.toLowerCase())) {
//         if (element.styles.width) filtered.width = element.styles.width;
//         if (element.styles.height) filtered.height = element.styles.height;
//       }

//       element.styles = filtered;
//     }

//     // Recurse into children
//     if (Array.isArray(element.children)) {
//       element.children = element.children.map(filterStylesRecursively);
//     }

//     node[tag] = filterStylesRecursively(element);
//   }

//   return node;
// }

// // === Main Script ===
// const inputPath = path.resolve(__dirname, 'input.json');
// const outputPath = path.resolve(__dirname, 'output.filtered.json');

// try {
//   const raw = fs.readFileSync(inputPath, 'utf8');
//   const parsed = JSON.parse(raw);
//   const filtered = filterStylesRecursively(parsed);
//   fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));
//   console.log(`✅ Filtered styles written to ${outputPath}`);
// } catch (err) {
//   console.error('❌ Failed to process JSON:', err.message);
// }
