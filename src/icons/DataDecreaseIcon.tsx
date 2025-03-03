import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const DataDecreaseIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Data Decrease" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0417 12.8448C16.0417 10.05 13.6607 5.625 7.89655 5.625V4.375C14.4696 4.375 17.2917 9.48451 17.2917 12.8448V13.8713L18.3745 12.6681L19.3036 13.5043L17.1312 15.9181H16.2021L14.0297 13.5043L14.9588 12.6681L16.0417 13.8713V12.8448ZM4.375 19V5H5.625V18.375H19V19.625H5L4.375 19Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0417 12.8448C16.0417 10.05 13.6607 5.625 7.89655 5.625V4.375C14.4696 4.375 17.2917 9.48451 17.2917 12.8448V13.8713L18.3745 12.6681L19.3036 13.5043L17.1312 15.9181H16.2021L14.0297 13.5043L14.9588 12.6681L16.0417 13.8713V12.8448ZM4.375 19V5H5.625V18.375H19V19.625H5L4.375 19Z" fill="#262525"/>
      </svg>
    );
  }
);

DataDecreaseIcon.displayName = "DataDecreaseIcon";

export default DataDecreaseIcon;
