import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const MoonIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Moon" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.546 5.79157C7.72577 6.44948 5.625 8.97941 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C15.0712 18.375 17.6351 16.2033 18.2399 13.3117C17.0196 14.0494 15.7981 14.3704 14.6572 14.3436C13.1559 14.3083 11.8412 13.6706 10.917 12.6753C9.32296 10.9586 8.93351 8.24315 10.546 5.79157ZM4.375 12C4.375 7.78883 7.78883 4.375 12 4.375L12.4419 5.44194C10.1647 7.71914 10.4508 10.3362 11.833 11.8247C12.5338 12.5794 13.5316 13.0667 14.6866 13.0939C15.8394 13.121 17.1961 12.6897 18.5999 11.5199L19.625 12C19.625 16.2112 16.2112 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.546 5.79157C7.72577 6.44948 5.625 8.97941 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C15.0712 18.375 17.6351 16.2033 18.2399 13.3117C17.0196 14.0494 15.7981 14.3704 14.6572 14.3436C13.1559 14.3083 11.8412 13.6706 10.917 12.6753C9.32296 10.9586 8.93351 8.24315 10.546 5.79157ZM4.375 12C4.375 7.78883 7.78883 4.375 12 4.375L12.4419 5.44194C10.1647 7.71914 10.4508 10.3362 11.833 11.8247C12.5338 12.5794 13.5316 13.0667 14.6866 13.0939C15.8394 13.121 17.1961 12.6897 18.5999 11.5199L19.625 12C19.625 16.2112 16.2112 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12Z" fill="#262525"/>
      </svg>
    );
  }
);

MoonIcon.displayName = "MoonIcon";

export default MoonIcon;
