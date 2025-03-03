import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const PreferencesIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Preferences" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 5.375L6.375 6V7.375H4V8.625H6.375V10L7 10.625H11L11.625 10V8.625H20V7.375H11.625V6L11 5.375H7ZM7.625 8V6.625H10.375V8V9.375H7.625V8ZM12.375 15.375H4V16.625H12.375V18L13 18.625H17L17.625 18V16.625H20V15.375H17.625V14L17 13.375H13L12.375 14V15.375ZM13.625 17.375V14.625H16.375V17.375H13.625Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 5.375L6.375 6V7.375H4V8.625H6.375V10L7 10.625H11L11.625 10V8.625H20V7.375H11.625V6L11 5.375H7ZM7.625 8V6.625H10.375V8V9.375H7.625V8ZM12.375 15.375H4V16.625H12.375V18L13 18.625H17L17.625 18V16.625H20V15.375H17.625V14L17 13.375H13L12.375 14V15.375ZM13.625 17.375V14.625H16.375V17.375H13.625Z" fill="#262525"/>
      </svg>
    );
  }
);

PreferencesIcon.displayName = "PreferencesIcon";

export default PreferencesIcon;
