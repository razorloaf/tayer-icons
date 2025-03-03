import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const TriangleRightFilledIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Triangle Right Filled" : title;
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
        <path d="M14.5 12L10.5 8V16L14.5 12Z" fill="#262525"/>
<path d="M10.5 8L10.9419 7.55806L9.875 8H10.5ZM14.5 12L14.9419 12.4419V11.5581L14.5 12ZM10.5 16H9.875L10.9419 16.4419L10.5 16ZM10.0581 8.44194L14.0581 12.4419L14.9419 11.5581L10.9419 7.55806L10.0581 8.44194ZM14.0581 11.5581L10.0581 15.5581L10.9419 16.4419L14.9419 12.4419L14.0581 11.5581ZM9.875 8V16H11.125V8H9.875Z" fill="#262525"/>
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
        <path d="M14.5 12L10.5 8V16L14.5 12Z" fill="#262525"/>
<path d="M10.5 8L10.9419 7.55806L9.875 8H10.5ZM14.5 12L14.9419 12.4419V11.5581L14.5 12ZM10.5 16H9.875L10.9419 16.4419L10.5 16ZM10.0581 8.44194L14.0581 12.4419L14.9419 11.5581L10.9419 7.55806L10.0581 8.44194ZM14.0581 11.5581L10.0581 15.5581L10.9419 16.4419L14.9419 12.4419L14.0581 11.5581ZM9.875 8V16H11.125V8H9.875Z" fill="#262525"/>
      </svg>
    );
  }
);

TriangleRightFilledIcon.displayName = "TriangleRightFilledIcon";

export default TriangleRightFilledIcon;
