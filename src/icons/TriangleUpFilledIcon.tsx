import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const TriangleUpFilledIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Triangle Up Filled" : title;
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
        <path d="M12.5 9.5L16.5 13.5H8.5L12.5 9.5Z" fill="#262525"/>
<path d="M16.5 13.5V14.125L16.9419 13.0581L16.5 13.5ZM12.5 9.5L12.9419 9.05806H12.0581L12.5 9.5ZM8.5 13.5L8.05806 13.0581L8.5 14.125V13.5ZM16.9419 13.0581L12.9419 9.05806L12.0581 9.94194L16.0581 13.9419L16.9419 13.0581ZM12.0581 9.05806L8.05806 13.0581L8.94194 13.9419L12.9419 9.94194L12.0581 9.05806ZM16.5 12.875H8.5V14.125H16.5V12.875Z" fill="#262525"/>
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
        <path d="M12.5 9.5L16.5 13.5H8.5L12.5 9.5Z" fill="#262525"/>
<path d="M16.5 13.5V14.125L16.9419 13.0581L16.5 13.5ZM12.5 9.5L12.9419 9.05806H12.0581L12.5 9.5ZM8.5 13.5L8.05806 13.0581L8.5 14.125V13.5ZM16.9419 13.0581L12.9419 9.05806L12.0581 9.94194L16.0581 13.9419L16.9419 13.0581ZM12.0581 9.05806L8.05806 13.0581L8.94194 13.9419L12.9419 9.94194L12.0581 9.05806ZM16.5 12.875H8.5V14.125H16.5V12.875Z" fill="#262525"/>
      </svg>
    );
  }
);

TriangleUpFilledIcon.displayName = "TriangleUpFilledIcon";

export default TriangleUpFilledIcon;
