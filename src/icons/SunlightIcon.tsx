import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const SunlightIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Sunlight" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.625 9.99998V5.5H11.375V9.99998H12.625ZM7.94194 10.3081L5.94194 8.30813L5.05806 9.19201L7.05806 11.192L7.94194 10.3081ZM16.9419 11.192L18.9419 9.19201L18.0581 8.30813L16.0581 10.3081L16.9419 11.192ZM16 18.3751L20 18.375L20 17.125L17.5574 17.125C17.1371 14.434 14.809 12.375 12 12.375C9.19101 12.375 6.86293 14.434 6.44264 17.1251L4 17.125L4 18.375L7 18.3751H16ZM7.71251 17.1251H16L16.2875 17.1251C15.8822 15.1281 14.1166 13.625 12 13.625C9.88339 13.625 8.11785 15.1281 7.71251 17.1251Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.625 9.99998V5.5H11.375V9.99998H12.625ZM7.94194 10.3081L5.94194 8.30813L5.05806 9.19201L7.05806 11.192L7.94194 10.3081ZM16.9419 11.192L18.9419 9.19201L18.0581 8.30813L16.0581 10.3081L16.9419 11.192ZM16 18.3751L20 18.375L20 17.125L17.5574 17.125C17.1371 14.434 14.809 12.375 12 12.375C9.19101 12.375 6.86293 14.434 6.44264 17.1251L4 17.125L4 18.375L7 18.3751H16ZM7.71251 17.1251H16L16.2875 17.1251C15.8822 15.1281 14.1166 13.625 12 13.625C9.88339 13.625 8.11785 15.1281 7.71251 17.1251Z" fill="#262525"/>
      </svg>
    );
  }
);

SunlightIcon.displayName = "SunlightIcon";

export default SunlightIcon;
