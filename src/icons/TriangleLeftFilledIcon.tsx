import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const TriangleLeftFilledIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const {
      color = 'currentColor',
      size = 24,
      title,
      decorative = false,
      disableOSAdaptation = false,
      highContrastStrokeWidth,
      ...restProps
    } = useIconFamily(props);

    const { prefersHighContrast, forcedColors } = useOSAccessibility();
    const titleId = React.useId();
    const accessibleTitle = title === undefined ? "Triangle Left Filled" : title;
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
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        ref={ref}
        aria-hidden="true"
        {...restProps}
      >
        <path d="M9.5 12L13.5 8V16L9.5 12Z" fill="#262525"/>
<path d="M13.5 8H14.125L13.0581 7.55806L13.5 8ZM9.5 12L9.05806 11.5581V12.4419L9.5 12ZM13.5 16L13.0581 16.4419L14.125 16H13.5ZM13.0581 7.55806L9.05806 11.5581L9.94194 12.4419L13.9419 8.44194L13.0581 7.55806ZM9.05806 12.4419L13.0581 16.4419L13.9419 15.5581L9.94194 11.5581L9.05806 12.4419ZM12.875 8V16H14.125V8H12.875Z" fill="#262525"/>
      </svg>
    ) : (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        ref={ref}
        role="img"
        aria-labelledby={accessibleTitle ? titleId : undefined}
        {...restProps}
      >
        {accessibleTitle && <title id={titleId}>{accessibleTitle}</title>}
        <path d="M9.5 12L13.5 8V16L9.5 12Z" fill="#262525"/>
<path d="M13.5 8H14.125L13.0581 7.55806L13.5 8ZM9.5 12L9.05806 11.5581V12.4419L9.5 12ZM13.5 16L13.0581 16.4419L14.125 16H13.5ZM13.0581 7.55806L9.05806 11.5581L9.94194 12.4419L13.9419 8.44194L13.0581 7.55806ZM9.05806 12.4419L13.0581 16.4419L13.9419 15.5581L9.94194 11.5581L9.05806 12.4419ZM12.875 8V16H14.125V8H12.875Z" fill="#262525"/>
      </svg>
    );
  }
);

TriangleLeftFilledIcon.displayName = "TriangleLeftFilledIcon";

export default TriangleLeftFilledIcon;
