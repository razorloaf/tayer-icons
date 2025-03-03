import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const AccessibilityIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Accessibility" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 12C5.625 8.47918 8.47918 5.625 12 5.625C15.5208 5.625 18.375 8.47918 18.375 12C18.375 15.5208 15.5208 18.375 12 18.375C8.47918 18.375 5.625 15.5208 5.625 12ZM12 4.375C7.78883 4.375 4.375 7.78883 4.375 12C4.375 16.2112 7.78883 19.625 12 19.625C16.2112 19.625 19.625 16.2112 19.625 12C19.625 7.78883 16.2112 4.375 12 4.375ZM8.47997 10.3467C9.10716 11.2875 9.76633 11.9045 10.4577 12.2563C10.1387 12.5696 9.86775 12.9327 9.64764 13.3101C9.16191 14.1427 8.875 15.1253 8.875 16H10.125C10.125 15.3747 10.3381 14.6073 10.7274 13.9399C11.0723 13.3485 11.518 12.898 12 12.6721C12.482 12.898 12.9277 13.3485 13.2726 13.9399C13.6619 14.6073 13.875 15.3747 13.875 16H15.125C15.125 15.1253 14.8381 14.1427 14.3524 13.3101C14.1322 12.9327 13.8613 12.5696 13.5423 12.2563C14.2337 11.9045 14.8928 11.2875 15.52 10.3467L14.48 9.65331C13.5585 11.0356 12.7315 11.375 12 11.375C11.2685 11.375 10.4415 11.0356 9.52003 9.65331L8.47997 10.3467ZM12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 12C5.625 8.47918 8.47918 5.625 12 5.625C15.5208 5.625 18.375 8.47918 18.375 12C18.375 15.5208 15.5208 18.375 12 18.375C8.47918 18.375 5.625 15.5208 5.625 12ZM12 4.375C7.78883 4.375 4.375 7.78883 4.375 12C4.375 16.2112 7.78883 19.625 12 19.625C16.2112 19.625 19.625 16.2112 19.625 12C19.625 7.78883 16.2112 4.375 12 4.375ZM8.47997 10.3467C9.10716 11.2875 9.76633 11.9045 10.4577 12.2563C10.1387 12.5696 9.86775 12.9327 9.64764 13.3101C9.16191 14.1427 8.875 15.1253 8.875 16H10.125C10.125 15.3747 10.3381 14.6073 10.7274 13.9399C11.0723 13.3485 11.518 12.898 12 12.6721C12.482 12.898 12.9277 13.3485 13.2726 13.9399C13.6619 14.6073 13.875 15.3747 13.875 16H15.125C15.125 15.1253 14.8381 14.1427 14.3524 13.3101C14.1322 12.9327 13.8613 12.5696 13.5423 12.2563C14.2337 11.9045 14.8928 11.2875 15.52 10.3467L14.48 9.65331C13.5585 11.0356 12.7315 11.375 12 11.375C11.2685 11.375 10.4415 11.0356 9.52003 9.65331L8.47997 10.3467ZM12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10Z" fill="#262525"/>
      </svg>
    );
  }
);

AccessibilityIcon.displayName = "AccessibilityIcon";

export default AccessibilityIcon;
