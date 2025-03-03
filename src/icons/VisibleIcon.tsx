import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const VisibleIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Visible" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.375C9.94673 15.375 7.87199 14.2688 6.69669 12C7.87199 9.7312 9.94673 8.625 12 8.625C14.0533 8.625 16.128 9.73121 17.3033 12C16.128 14.2688 14.0533 15.375 12 15.375ZM12 7.375C9.38174 7.375 6.78664 8.84927 5.43408 11.7347V12.2653C6.78664 15.1507 9.38174 16.625 12 16.625C14.6182 16.625 17.2134 15.1507 18.5659 12.2653L18.5659 11.7347C17.2133 8.84928 14.6182 7.375 12 7.375ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 9.99999 10.8954 9.99999 12C9.99999 13.1046 10.8954 14 12 14Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.375C9.94673 15.375 7.87199 14.2688 6.69669 12C7.87199 9.7312 9.94673 8.625 12 8.625C14.0533 8.625 16.128 9.73121 17.3033 12C16.128 14.2688 14.0533 15.375 12 15.375ZM12 7.375C9.38174 7.375 6.78664 8.84927 5.43408 11.7347V12.2653C6.78664 15.1507 9.38174 16.625 12 16.625C14.6182 16.625 17.2134 15.1507 18.5659 12.2653L18.5659 11.7347C17.2133 8.84928 14.6182 7.375 12 7.375ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 9.99999 10.8954 9.99999 12C9.99999 13.1046 10.8954 14 12 14Z" fill="#262525"/>
      </svg>
    );
  }
);

VisibleIcon.displayName = "VisibleIcon";

export default VisibleIcon;
