import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const ClockIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Clock" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.625C8.47918 5.625 5.625 8.47918 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C15.5208 18.375 18.375 15.5208 18.375 12C18.375 8.47918 15.5208 5.625 12 5.625ZM4.375 12C4.375 7.78883 7.78883 4.375 12 4.375C16.2112 4.375 19.625 7.78883 19.625 12C19.625 16.2112 16.2112 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12ZM11.375 12V7H12.625V11.7411L14.4419 13.5581L13.5581 14.4419L11.5581 12.4419L11.375 12.2589V12Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.625C8.47918 5.625 5.625 8.47918 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C15.5208 18.375 18.375 15.5208 18.375 12C18.375 8.47918 15.5208 5.625 12 5.625ZM4.375 12C4.375 7.78883 7.78883 4.375 12 4.375C16.2112 4.375 19.625 7.78883 19.625 12C19.625 16.2112 16.2112 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12ZM11.375 12V7H12.625V11.7411L14.4419 13.5581L13.5581 14.4419L11.5581 12.4419L11.375 12.2589V12Z" fill="#262525"/>
      </svg>
    );
  }
);

ClockIcon.displayName = "ClockIcon";

export default ClockIcon;
