import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const PercentageIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Percentage" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5581 6.55811L6.55811 16.5581L7.44199 17.442L17.442 7.44199L16.5581 6.55811ZM9.00005 8.00005C9.00005 8.55233 8.55234 9.00005 8.00005 9.00005C7.44777 9.00005 7.00005 8.55233 7.00005 8.00005C7.00005 7.44776 7.44777 7.00005 8.00005 7.00005C8.55234 7.00005 9.00005 7.44776 9.00005 8.00005ZM16.0001 17C16.5523 17 17.0001 16.5523 17.0001 16C17.0001 15.4478 16.5523 15 16.0001 15C15.4478 15 15.0001 15.4478 15.0001 16C15.0001 16.5523 15.4478 17 16.0001 17Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5581 6.55811L6.55811 16.5581L7.44199 17.442L17.442 7.44199L16.5581 6.55811ZM9.00005 8.00005C9.00005 8.55233 8.55234 9.00005 8.00005 9.00005C7.44777 9.00005 7.00005 8.55233 7.00005 8.00005C7.00005 7.44776 7.44777 7.00005 8.00005 7.00005C8.55234 7.00005 9.00005 7.44776 9.00005 8.00005ZM16.0001 17C16.5523 17 17.0001 16.5523 17.0001 16C17.0001 15.4478 16.5523 15 16.0001 15C15.4478 15 15.0001 15.4478 15.0001 16C15.0001 16.5523 15.4478 17 16.0001 17Z" fill="#262525"/>
      </svg>
    );
  }
);

PercentageIcon.displayName = "PercentageIcon";

export default PercentageIcon;
