
// const fs = require('fs');
// const path = require('path');

// // === Widget Tags ===
// const widgetTags = new Set([
//   'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SVG', 'IMG', 'IMAGE', 'VIDEO',
//   'SPAN', 'BUTTON', 'A', 'TEXT', 'WOW-IMAGE', 'WOW-VIDEO', 'WOW-SVG', 'WOW-ICON', 'WOW-CANVAS'
// ]);

// // === Widget Font/Text Styles ===
// const fontAndTextStyles = new Set([
//   'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight',
//   'textAlign', 'textDecoration', 'textDecorationColor', 'textShadow', 'textTransform',
//   'textOverflow', 'whiteSpace', 'wordBreak', 'wordWrap', 'overflowWrap',
//   'textSizeAdjust', 'caretColor', 'color', 'outlineColor', 'textEmphasisColor',
//   '-webkitTextFillColor', '-webkitTextStrokeColor'
// ]);

// // === Widget Image/SVG/Video Styles ===
// const svgImageStyles = new Set([
//   'fill', 'stroke', 'strokeWidth', 'strokeOpacity', 'vectorEffect', 'transformOrigin',
//   'perspectiveOrigin', 'display', 'position', 'top', 'right', 'bottom', 'left',
//   'width', 'height', 'blockSize', 'inlineSize',
//   'insetBlockStart', 'insetBlockEnd', 'insetInlineStart', 'insetInlineEnd',
//   '-webkitTapHighlightColor'
// ]);

// // === Common Background & Color Styles ===
// const colorBackgroundStyles = new Set([
//   'background', 'backgroundColor', 'backgroundImage', 'color'
// ]);

// // === Helpers ===
// function toCamelCase(str) {
//   return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
// }

// function filterWidgetStyles(styles) {
//   const result = {};
//   for (const key in styles) {
//     const camelKey = toCamelCase(key);
//     if (
//       fontAndTextStyles.has(camelKey) ||
//       svgImageStyles.has(camelKey) ||
//       colorBackgroundStyles.has(camelKey)
//     ) {
//       result[key] = styles[key];
//     }
//   }
//   return result;
// }

// function extractWidgetsOnly(node) {
//   if (!node || typeof node !== 'object') return null;

//   const isWidget = widgetTags.has((node.tag || '').toUpperCase());
//   const widgetStyles = node.styles ? filterWidgetStyles(node.styles) : {};

//   // Recursively process children
//   const children = Array.isArray(node.children)
//     ? node.children.map(extractWidgetsOnly).flat().filter(Boolean)
//     : [];

//   // If it's a widget, keep it
//   if (isWidget) {
//     return {
//       tag: node.tag,
//       id: node.id || '',
//       className: node.className || '',
//       html: node.html,
//       ...(Object.keys(widgetStyles).length > 0 ? { styles: widgetStyles } : {}),
//       ...(children.length > 0 ? { children } : {})
//     };
//   }

//   // If not widget, return flattened widget children
//   return children;
// }

// function extractWidgetsTree(parsed) {
//   const widgetTree = {};

//   for (const key in parsed) {
//     const widget = extractWidgetsOnly(parsed[key]);
//     if (widget && Array.isArray(widget)) {
//       // If it's multiple top-level widgets, wrap them as an array
//       widgetTree[key] = widget;
//     } else if (widget) {
//       widgetTree[key] = widget;
//     }
//   }

//   return widgetTree;
// }

// // === Main Script ===
// const inputPath = path.resolve(__dirname, 'input.json');
// const widgetPath = path.resolve(__dirname, 'widgets.filtered.json');

// try {
//   const raw = fs.readFileSync(inputPath, 'utf8');
//   const parsed = JSON.parse(raw);

//   const widgetTree = extractWidgetsTree(parsed);

//   fs.writeFileSync(widgetPath, JSON.stringify(widgetTree, null, 2));
//   console.log('✅ widgets.filtered.json created (layouts removed)');
// } catch (err) {
//   console.error('❌ Error:', err.message);
// }

const fs = require('fs');
const path = require('path');

// === Widget Tags ===
const widgetTags = new Set([
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SVG', 'IMG', 'IMAGE', 'VIDEO',
  'SPAN', 'BUTTON', 'A', 'TEXT', 'WOW-IMAGE', 'WOW-VIDEO', 'WOW-SVG', 'WOW-ICON', 'WOW-CANVAS'
]);

// === Layout Styles ===
const allowedLayoutStyles = new Set([
  'display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent',
  'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow', 'gridColumnStart',
  'gridColumnEnd', 'gridRowStart', 'gridRowEnd', 'gridArea', 'placeItems', 'placeContent',
  'placeSelf', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'position', 'top', 'right', 'bottom', 'left', 'zIndex', 'backgroundColor'
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

  const baseProps = {
    tag: node.tag,
    id: node.id || '',
    className: node.className || '',
    html: node.html
  };

  // ✅ Updated: Only non-widget nodes go into layout tree
  const layoutNode = !isWidget && (Object.keys(layoutStyles).length > 0 || layoutChildren.length > 0)
    ? {
        ...baseProps,
        ...(Object.keys(layoutStyles).length > 0 ? { styles: layoutStyles } : {}),
        ...(layoutChildren.length > 0 ? { children: layoutChildren } : {})
      }
    : null;

  const widgetNode = isWidget
    ? {
        ...baseProps,
        ...(Object.keys(widgetStyles).length > 0 ? { styles: widgetStyles } : {}),
        ...(widgetChildren.length > 0 ? { children: widgetChildren } : {})
      }
    : widgetChildren.length > 0 ? widgetChildren.length === 1 ? widgetChildren[0] : widgetChildren : null;

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
