import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const ImageIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Image" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4.375L4.375 5V18.9392V19L5 19.625H15H19L19.625 19V13.75V9.375V5L19 4.375H5ZM18.375 10.2652V13.75V18.375H15.465L14.1555 14.0099L14.9971 11.485L18.375 10.2652ZM12.9731 14.4188L14.16 18.375H5.98607L7.99637 14.4033L10.0587 12.7534L12.9731 14.4188ZM6.94236 13.7177L5.625 16.3204V5.625H18.375V8.93619L14.2877 10.4122L13.9071 10.8024L13.1482 13.0791L10.3101 11.4573L9.60957 11.512L7.10957 13.512L6.94236 13.7177ZM8 9C8.55229 9 9 8.55229 9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4.375L4.375 5V18.9392V19L5 19.625H15H19L19.625 19V13.75V9.375V5L19 4.375H5ZM18.375 10.2652V13.75V18.375H15.465L14.1555 14.0099L14.9971 11.485L18.375 10.2652ZM12.9731 14.4188L14.16 18.375H5.98607L7.99637 14.4033L10.0587 12.7534L12.9731 14.4188ZM6.94236 13.7177L5.625 16.3204V5.625H18.375V8.93619L14.2877 10.4122L13.9071 10.8024L13.1482 13.0791L10.3101 11.4573L9.60957 11.512L7.10957 13.512L6.94236 13.7177ZM8 9C8.55229 9 9 8.55229 9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9Z" fill="#262525"/>
      </svg>
    );
  }
);

ImageIcon.displayName = "ImageIcon";

export default ImageIcon;
