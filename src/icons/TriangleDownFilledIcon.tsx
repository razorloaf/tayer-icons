import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const TriangleDownFilledIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Triangle Down Filled" : title;
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
        <path d="M12.5 14.5L16.5 10.5H8.5L12.5 14.5Z" fill="#262525"/>
<path d="M16.5 10.5L16.9419 10.9419L16.5 9.875V10.5ZM12.5 14.5L12.0581 14.9419H12.9419L12.5 14.5ZM8.5 10.5V9.875L8.05806 10.9419L8.5 10.5ZM16.0581 10.0581L12.0581 14.0581L12.9419 14.9419L16.9419 10.9419L16.0581 10.0581ZM12.9419 14.0581L8.94194 10.0581L8.05806 10.9419L12.0581 14.9419L12.9419 14.0581ZM16.5 9.875H8.5V11.125H16.5V9.875Z" fill="#262525"/>
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
        <path d="M12.5 14.5L16.5 10.5H8.5L12.5 14.5Z" fill="#262525"/>
<path d="M16.5 10.5L16.9419 10.9419L16.5 9.875V10.5ZM12.5 14.5L12.0581 14.9419H12.9419L12.5 14.5ZM8.5 10.5V9.875L8.05806 10.9419L8.5 10.5ZM16.0581 10.0581L12.0581 14.0581L12.9419 14.9419L16.9419 10.9419L16.0581 10.0581ZM12.9419 14.0581L8.94194 10.0581L8.05806 10.9419L12.0581 14.9419L12.9419 14.0581ZM16.5 9.875H8.5V11.125H16.5V9.875Z" fill="#262525"/>
      </svg>
    );
  }
);

TriangleDownFilledIcon.displayName = "TriangleDownFilledIcon";

export default TriangleDownFilledIcon;
