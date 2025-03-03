import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const LoaderIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Loader" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.375 4V6.00001H12.625V4H11.375ZM16.5581 6.55806L14.5581 8.55806L15.4419 9.44194L17.4419 7.44194L16.5581 6.55806ZM18 11.375H20V12.625H18V11.375ZM17.4419 16.5581L15.4419 14.5581L14.5581 15.4419L16.5581 17.4419L17.4419 16.5581ZM11.375 20V18H12.625V20H11.375ZM8.55806 14.5581L6.55806 16.5581L7.44194 17.4419L9.44194 15.4419L8.55806 14.5581ZM4 11.375H6V12.625H4V11.375ZM9.44194 8.55806L7.44194 6.55806L6.55806 7.44194L8.55806 9.44194L9.44194 8.55806Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.375 4V6.00001H12.625V4H11.375ZM16.5581 6.55806L14.5581 8.55806L15.4419 9.44194L17.4419 7.44194L16.5581 6.55806ZM18 11.375H20V12.625H18V11.375ZM17.4419 16.5581L15.4419 14.5581L14.5581 15.4419L16.5581 17.4419L17.4419 16.5581ZM11.375 20V18H12.625V20H11.375ZM8.55806 14.5581L6.55806 16.5581L7.44194 17.4419L9.44194 15.4419L8.55806 14.5581ZM4 11.375H6V12.625H4V11.375ZM9.44194 8.55806L7.44194 6.55806L6.55806 7.44194L8.55806 9.44194L9.44194 8.55806Z" fill="#262525"/>
      </svg>
    );
  }
);

LoaderIcon.displayName = "LoaderIcon";

export default LoaderIcon;
