'use strict';

const fs = require('fs').promises;
const path = require('path');

// Configuration object for paths and settings
const CONFIG = {
  SVG_DIR: path.resolve(__dirname, '../src/svg'),
  COMPONENT_DIR: path.resolve(__dirname, '../src/icons'),
  INDEX_PATH: path.resolve(__dirname, '../src/index.tsx'),
  TYPES_PATH: path.resolve(__dirname, '../src/types.ts'),
  TEMPLATE_VERSION: 1,
  FORCE_REGENERATE: process.argv.includes('--force'),
};

// Utility to check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Convert camelCase to sentence case with special handling
function toSentenceCase(str) {
  const baseName = str.replace(/Icon$/, '');
  const withSpaces = baseName.replace(/([A-Z])/g, ' $1').trim();
  const specialCases = {
    Bt: 'Bluetooth',
    Wifi: 'WiFi',
    Ios: 'iOS',
    'Mac Os': 'macOS',
    Url: 'URL',
  };
  const specialized = withSpaces
    .split(' ')
    .map((word) => specialCases[word] || word)
    .join(' ');
  return specialized.charAt(0).toUpperCase() + specialized.slice(1);
}

// Read SVG files asynchronously
async function readSvgFiles() {
  if (!(await fileExists(CONFIG.SVG_DIR))) {
    console.log(`SVG directory doesn't exist: ${CONFIG.SVG_DIR}`);
    return [];
  }
  const files = await fs.readdir(CONFIG.SVG_DIR);
  const svgFiles = files.filter((file) => file.endsWith('.svg'));
  console.log(`Found ${svgFiles.length} SVG files`);
  return svgFiles;
}

// Check if a component needs updating
async function needsUpdate(svgPath, componentPath) {
  if (CONFIG.FORCE_REGENERATE) return true;
  if (!(await fileExists(componentPath))) return true;

  const [svgStat, componentStat] = await Promise.all([
    fs.stat(svgPath),
    fs.stat(componentPath),
  ]);

  if (svgStat.mtime > componentStat.mtime) return true;

  const content = await fs.readFile(componentPath, 'utf8');
  const versionMatch = content.match(/Template version: (\d+)/);
  const fileVersion = versionMatch ? parseInt(versionMatch[1], 10) : 0;
  return fileVersion < CONFIG.TEMPLATE_VERSION;
}

// Extract SVG data (viewBox and inner content)
async function extractSvgData(svgPath) {
  const svgContent = await fs.readFile(svgPath, 'utf8');
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']*)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 20 20';
  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const innerContent = innerMatch ? innerMatch[1].trim() : '';
  return { viewBox, innerContent };
}

// Generate React component code
function generateComponentCode(componentName, readableName, viewBox, innerContent) {
  return `import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const {
      color = 'currentColor',
      size = 20,
      title,
      decorative = false,
      disableOSAdaptation = false,
      highContrastStrokeWidth,
      ...restProps
    } = useIconFamily(props);

    const { prefersHighContrast, forcedColors } = useOSAccessibility();
    const titleId = React.useId();
    const accessibleTitle = title === undefined ? "${readableName}" : title;
    const isDecorativeOnly = decorative || accessibleTitle === '';

    const [isInsideButton, setIsInsideButton] = React.useState(false);

    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        let parent = ref.current.parentElement;
        while (parent) {
          if (
            parent.tagName === 'BUTTON' ||
            parent.tagName === 'A' ||
            parent.getAttribute('role') === 'button'
          ) {
            setIsInsideButton(true);
            break;
          }
          parent = parent.parentElement;
        }
      }
    }, [ref]);

    const isHighContrast = !disableOSAdaptation && (prefersHighContrast || forcedColors);
    const strokeWidth = isHighContrast && highContrastStrokeWidth !== undefined
      ? highContrastStrokeWidth
      : restProps.strokeWidth;

    return isDecorativeOnly || isInsideButton ? (
      <svg
        width={size}
        height={size}
        viewBox="${viewBox}"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        ref={ref}
        aria-hidden="true"
        {...restProps}
      >
        ${innerContent}
      </svg>
    ) : (
      <svg
        width={size}
        height={size}
        viewBox="${viewBox}"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        ref={ref}
        role="img"
        aria-labelledby={accessibleTitle ? titleId : undefined}
        {...restProps}
      >
        {accessibleTitle && <title id={titleId}>{accessibleTitle}</title>}
        ${innerContent}
      </svg>
    );
  }
);

${componentName}.displayName = "${componentName}";

export default ${componentName};
`;
}

// Process a single SVG file
async function processSvgFile(svgFile) {
  try {
    const name = path.basename(svgFile, '.svg');
    const componentName = name.charAt(0).toUpperCase() + name.slice(1) + 'Icon';
    const readableName = toSentenceCase(componentName);
    const svgPath = path.join(CONFIG.SVG_DIR, svgFile);
    const componentPath = path.join(CONFIG.COMPONENT_DIR, `${componentName}.tsx`);

    const shouldUpdate = await needsUpdate(svgPath, componentPath);
    if (!shouldUpdate) {
      console.log(`${componentName} is already up to date`);
      return { name, componentName, readableName, updated: false };
    }

    const { viewBox, innerContent } = await extractSvgData(svgPath);
    const componentCode = generateComponentCode(componentName, readableName, viewBox, innerContent);
    await fs.writeFile(componentPath, componentCode);
    console.log(`Generated ${componentName}`);
    return { name, componentName, readableName, updated: true };
  } catch (error) {
    console.error(`Error processing ${svgFile}:`, error);
    return null;
  }
}

// Generate types.ts file
async function generateTypesFile() {
  const content = `import * as React from 'react';

export interface IconProps extends Omit<React.SVGAttributes<SVGElement>, 'children' | 'display' | 'mask'> {
  color?: string;
  title?: string;
  decorative?: boolean;
  size?: number;
  disableOSAdaptation?: boolean;
  highContrastStrokeWidth?: number;
}
`;

  if (!(await fileExists(CONFIG.TYPES_PATH)) || (await fs.readFile(CONFIG.TYPES_PATH, 'utf8')) !== content) {
    await fs.writeFile(CONFIG.TYPES_PATH, content);
    console.log('Generated types.ts');
  }
}

// Generate index.tsx file
async function generateIndexFile(components) {
  if (!components?.length) {
    console.log('No components to include in index.tsx');
    return;
  }

  const typeExports = [
    `export type { IconProps } from './types';`,
    `export { IconFamily } from './IconFamily';`,
    `export type { IconFamilyProps } from './IconFamily';`,
    `export type { IconFamilyConfig } from './IconFamilyContext';`,
  ];
  const exportStatements = components.map(
    (comp) => `export { default as ${comp.componentName.replace(/Icon$/, '')} } from './icons/${comp.componentName}';`
  );
  const newContent = [...typeExports, '', ...exportStatements].join('\n');

  if (await fileExists(CONFIG.INDEX_PATH)) {
    const existingContent = await fs.readFile(CONFIG.INDEX_PATH, 'utf8');
    if (existingContent === newContent && !CONFIG.FORCE_REGENERATE) {
      console.log('Index file is already up to date');
      return;
    }
  }

  await fs.writeFile(CONFIG.INDEX_PATH, newContent);
  console.log('Generated index.tsx');
}

// Main execution
(async () => {
  try {
    // Ensure output directory exists
    if (!(await fileExists(CONFIG.COMPONENT_DIR))) {
      await fs.mkdir(CONFIG.COMPONENT_DIR, { recursive: true });
    }

    if (CONFIG.FORCE_REGENERATE) {
      console.log('Force regeneration enabled - will rebuild all components');
    }

    const svgFiles = await readSvgFiles();
    if (!svgFiles.length) {
      console.log('No SVG files found. No components generated.');
      if (!(await fileExists(CONFIG.INDEX_PATH))) {
        await fs.writeFile(CONFIG.INDEX_PATH, '// No icons available\n');
      }
      return;
    }

    await generateTypesFile();
    const components = (await Promise.all(svgFiles.map(processSvgFile))).filter(Boolean);
    await generateIndexFile(components);

    const updatedCount = components.filter((c) => c.updated).length;
    console.log(`${updatedCount} components updated out of ${components.length} total`);
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
})();