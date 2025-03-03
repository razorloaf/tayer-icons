import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const PieChartIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Pie Chart" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.375 5.65525C8.14752 5.9693 5.625 8.69007 5.625 12C5.625 15.3099 8.14752 18.0307 11.375 18.3448V12V5.65525ZM12.625 5.65525V11.0119L17.4656 8.71647C16.4512 7.03166 14.6807 5.85527 12.625 5.65525ZM18.0019 9.84556L12.625 12.3953V18.3448C15.8525 18.0307 18.375 15.3099 18.375 12C18.375 11.2431 18.2433 10.5179 18.0019 9.84556ZM4.375 12C4.375 7.78883 7.78883 4.375 12 4.375C15.0427 4.375 17.6678 6.15717 18.8909 8.73182C19.3618 9.7231 19.625 10.8317 19.625 12C19.625 16.2112 16.2112 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.375 5.65525C8.14752 5.9693 5.625 8.69007 5.625 12C5.625 15.3099 8.14752 18.0307 11.375 18.3448V12V5.65525ZM12.625 5.65525V11.0119L17.4656 8.71647C16.4512 7.03166 14.6807 5.85527 12.625 5.65525ZM18.0019 9.84556L12.625 12.3953V18.3448C15.8525 18.0307 18.375 15.3099 18.375 12C18.375 11.2431 18.2433 10.5179 18.0019 9.84556ZM4.375 12C4.375 7.78883 7.78883 4.375 12 4.375C15.0427 4.375 17.6678 6.15717 18.8909 8.73182C19.3618 9.7231 19.625 10.8317 19.625 12C19.625 16.2112 16.2112 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12Z" fill="#262525"/>
      </svg>
    );
  }
);

PieChartIcon.displayName = "PieChartIcon";

export default PieChartIcon;
