import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const FlagIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Flag" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1029 6.20026C11.4908 5.884 9.92001 6.62059 8.83341 7.45306C8.48848 7.71733 8.36696 8.23711 8.59789 8.75459L10.1564 12.247C10.717 11.518 11.604 11.0843 12.4789 10.8394C13.4649 10.5634 14.5584 10.4833 15.4907 10.5007L13.7742 6.80819C13.613 6.46137 13.3611 6.25091 13.1029 6.20026ZM10.8376 13.7736C10.9548 12.9198 11.661 12.3664 12.8159 12.0431C14.0138 11.7078 15.4622 11.7036 16.4314 11.8104L17.0667 10.9257L14.9077 6.28128C14.6314 5.68682 14.1039 5.12281 13.3436 4.97364C11.2221 4.55747 9.2856 5.53194 8.0732 6.4608C7.16814 7.1542 7.04561 8.34346 7.45639 9.26398L9.62914 14.1329L11.2791 17.8304L11.6916 18.7548L12.8331 18.2454L12.4206 17.321L10.8376 13.7736Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1029 6.20026C11.4908 5.884 9.92001 6.62059 8.83341 7.45306C8.48848 7.71733 8.36696 8.23711 8.59789 8.75459L10.1564 12.247C10.717 11.518 11.604 11.0843 12.4789 10.8394C13.4649 10.5634 14.5584 10.4833 15.4907 10.5007L13.7742 6.80819C13.613 6.46137 13.3611 6.25091 13.1029 6.20026ZM10.8376 13.7736C10.9548 12.9198 11.661 12.3664 12.8159 12.0431C14.0138 11.7078 15.4622 11.7036 16.4314 11.8104L17.0667 10.9257L14.9077 6.28128C14.6314 5.68682 14.1039 5.12281 13.3436 4.97364C11.2221 4.55747 9.2856 5.53194 8.0732 6.4608C7.16814 7.1542 7.04561 8.34346 7.45639 9.26398L9.62914 14.1329L11.2791 17.8304L11.6916 18.7548L12.8331 18.2454L12.4206 17.321L10.8376 13.7736Z" fill="#262525"/>
      </svg>
    );
  }
);

FlagIcon.displayName = "FlagIcon";

export default FlagIcon;
