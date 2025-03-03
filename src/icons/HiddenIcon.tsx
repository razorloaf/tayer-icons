import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const HiddenIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Hidden" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25041 13.0963C7.13028 12.7449 6.1123 12.1914 5.5 11.375L6.5 10.625C6.8877 11.1419 7.61972 11.5884 8.62459 11.9037C9.61554 12.2145 10.8008 12.375 12 12.375C13.1992 12.375 14.3845 12.2145 15.3754 11.9037C16.3803 11.5884 17.1123 11.1419 17.5 10.625L18.5 11.375C17.8877 12.1914 16.8697 12.7449 15.7496 13.0963C14.6155 13.4521 13.3008 13.625 12 13.625C10.6992 13.625 9.38446 13.4521 8.25041 13.0963Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25041 13.0963C7.13028 12.7449 6.1123 12.1914 5.5 11.375L6.5 10.625C6.8877 11.1419 7.61972 11.5884 8.62459 11.9037C9.61554 12.2145 10.8008 12.375 12 12.375C13.1992 12.375 14.3845 12.2145 15.3754 11.9037C16.3803 11.5884 17.1123 11.1419 17.5 10.625L18.5 11.375C17.8877 12.1914 16.8697 12.7449 15.7496 13.0963C14.6155 13.4521 13.3008 13.625 12 13.625C10.6992 13.625 9.38446 13.4521 8.25041 13.0963Z" fill="#262525"/>
      </svg>
    );
  }
);

HiddenIcon.displayName = "HiddenIcon";

export default HiddenIcon;
