import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const UnlockIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Unlock" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.40197 10.5893H7L6.375 11.2143V17.5L7 18.125H17L17.625 17.5V11.2143L17 10.5893H16H8.65747C8.73802 9.81668 8.97146 9.03942 9.39139 8.42352C9.90463 7.67077 10.7148 7.125 12 7.125C13.2069 7.125 13.99 7.60597 14.5034 8.2778L15.4966 7.51876C14.7492 6.54086 13.6006 5.875 12 5.875C10.2852 5.875 9.09537 6.63876 8.35861 7.71935C7.77122 8.58086 7.48563 9.61929 7.40197 10.5893ZM7.625 11.8393V16.875H16.375V11.8393H16H8H7.625Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.40197 10.5893H7L6.375 11.2143V17.5L7 18.125H17L17.625 17.5V11.2143L17 10.5893H16H8.65747C8.73802 9.81668 8.97146 9.03942 9.39139 8.42352C9.90463 7.67077 10.7148 7.125 12 7.125C13.2069 7.125 13.99 7.60597 14.5034 8.2778L15.4966 7.51876C14.7492 6.54086 13.6006 5.875 12 5.875C10.2852 5.875 9.09537 6.63876 8.35861 7.71935C7.77122 8.58086 7.48563 9.61929 7.40197 10.5893ZM7.625 11.8393V16.875H16.375V11.8393H16H8H7.625Z" fill="#262525"/>
      </svg>
    );
  }
);

UnlockIcon.displayName = "UnlockIcon";

export default UnlockIcon;
