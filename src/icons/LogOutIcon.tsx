import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const LogOutIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Log Out" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4.375L6.375 5V18.375H5V19.625H19V18.375H17.625V12.5833V11.4167H16.375V12.5833V18.375H7.625V5.625H12V4.375H7ZM15.6161 6L16.0581 6.44194L16.9911 7.375H12.5H11.875V8.625H12.5H16.9911L16.0581 9.55806L15.6161 10L16.5 10.8839L16.9419 10.4419L18.9419 8.44194V7.55806L16.9419 5.55806L16.5 5.11612L15.6161 6ZM14 14C14.5523 14 15 13.5523 15 13C15 12.4477 14.5523 12 14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4.375L6.375 5V18.375H5V19.625H19V18.375H17.625V12.5833V11.4167H16.375V12.5833V18.375H7.625V5.625H12V4.375H7ZM15.6161 6L16.0581 6.44194L16.9911 7.375H12.5H11.875V8.625H12.5H16.9911L16.0581 9.55806L15.6161 10L16.5 10.8839L16.9419 10.4419L18.9419 8.44194V7.55806L16.9419 5.55806L16.5 5.11612L15.6161 6ZM14 14C14.5523 14 15 13.5523 15 13C15 12.4477 14.5523 12 14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14Z" fill="#262525"/>
      </svg>
    );
  }
);

LogOutIcon.displayName = "LogOutIcon";

export default LogOutIcon;
