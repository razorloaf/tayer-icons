import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const HamburgerAltIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Hamburger Alt" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.39816 9.37499L16.6018 9.37502C15.7374 7.55337 13.8943 6.625 12 6.625C10.1057 6.625 8.26264 7.55336 7.39816 9.37499ZM12 5.375C14.5977 5.375 17.2614 6.84311 18.1017 9.83081L17.5 10.625L6.5 10.625L5.89834 9.83077C6.73863 6.84309 9.40234 5.375 12 5.375ZM19 13.625H5V12.375H19V13.625ZM5.89149 16.0093L6.5 15.2417H17.5L18.1085 16.0093L17.6085 18.1426L17 18.625H7L6.39149 18.1426L5.89149 16.0093ZM7.28842 16.4917L7.49545 17.375H16.5045L16.7116 16.4917H7.28842Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.39816 9.37499L16.6018 9.37502C15.7374 7.55337 13.8943 6.625 12 6.625C10.1057 6.625 8.26264 7.55336 7.39816 9.37499ZM12 5.375C14.5977 5.375 17.2614 6.84311 18.1017 9.83081L17.5 10.625L6.5 10.625L5.89834 9.83077C6.73863 6.84309 9.40234 5.375 12 5.375ZM19 13.625H5V12.375H19V13.625ZM5.89149 16.0093L6.5 15.2417H17.5L18.1085 16.0093L17.6085 18.1426L17 18.625H7L6.39149 18.1426L5.89149 16.0093ZM7.28842 16.4917L7.49545 17.375H16.5045L16.7116 16.4917H7.28842Z" fill="#262525"/>
      </svg>
    );
  }
);

HamburgerAltIcon.displayName = "HamburgerAltIcon";

export default HamburgerAltIcon;
