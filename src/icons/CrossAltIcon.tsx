import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const CrossAltIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Cross Alt" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 12C5.625 8.47918 8.47918 5.625 12 5.625C15.5208 5.625 18.375 8.47918 18.375 12C18.375 15.5208 15.5208 18.375 12 18.375C8.47918 18.375 5.625 15.5208 5.625 12ZM12 4.375C7.78883 4.375 4.375 7.78883 4.375 12C4.375 16.2112 7.78883 19.625 12 19.625C16.2112 19.625 19.625 16.2112 19.625 12C19.625 7.78883 16.2112 4.375 12 4.375ZM8.72975 9.61351L11.1162 12L8.72975 14.3865L9.61363 15.2704L12.0001 12.8839L14.3866 15.2704L15.2705 14.3865L12.884 12L15.2705 9.61351L14.3866 8.72963L12.0001 11.1161L9.61363 8.72963L8.72975 9.61351Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 12C5.625 8.47918 8.47918 5.625 12 5.625C15.5208 5.625 18.375 8.47918 18.375 12C18.375 15.5208 15.5208 18.375 12 18.375C8.47918 18.375 5.625 15.5208 5.625 12ZM12 4.375C7.78883 4.375 4.375 7.78883 4.375 12C4.375 16.2112 7.78883 19.625 12 19.625C16.2112 19.625 19.625 16.2112 19.625 12C19.625 7.78883 16.2112 4.375 12 4.375ZM8.72975 9.61351L11.1162 12L8.72975 14.3865L9.61363 15.2704L12.0001 12.8839L14.3866 15.2704L15.2705 14.3865L12.884 12L15.2705 9.61351L14.3866 8.72963L12.0001 11.1161L9.61363 8.72963L8.72975 9.61351Z" fill="#262525"/>
      </svg>
    );
  }
);

CrossAltIcon.displayName = "CrossAltIcon";

export default CrossAltIcon;
