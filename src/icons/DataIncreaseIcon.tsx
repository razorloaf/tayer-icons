import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const DataIncreaseIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Data Increase" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.375 19V5H5.625V18.375H19V19.625H5L4.375 19ZM16.2021 5.74856L17.1312 5.74856L19.3036 8.16236L18.3745 8.99856L17.2917 7.79539V8.82184C17.2917 12.2387 14.4162 16.7284 7.89655 16.7284V15.4784C13.7141 15.4784 16.0417 11.5601 16.0417 8.82184V7.79539L14.9588 8.99856L14.0297 8.16236L16.2021 5.74856Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.375 19V5H5.625V18.375H19V19.625H5L4.375 19ZM16.2021 5.74856L17.1312 5.74856L19.3036 8.16236L18.3745 8.99856L17.2917 7.79539V8.82184C17.2917 12.2387 14.4162 16.7284 7.89655 16.7284V15.4784C13.7141 15.4784 16.0417 11.5601 16.0417 8.82184V7.79539L14.9588 8.99856L14.0297 8.16236L16.2021 5.74856Z" fill="#262525"/>
      </svg>
    );
  }
);

DataIncreaseIcon.displayName = "DataIncreaseIcon";

export default DataIncreaseIcon;
