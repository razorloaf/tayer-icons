import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const BinIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const {
      color = 'currentColor',
      size = 20,
      title,
      decorative = false,
      disableOSAdaptation = false,
      highContrastStrokeWidth,
      ...restProps
    } = useIconFamily(props);

    const { prefersHighContrast, forcedColors } = useOSAccessibility();
    const titleId = React.useId();
    const accessibleTitle = title === undefined ? "Bin" : title;
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
        viewBox="0 0 20 20"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        ref={ref}
        aria-hidden="true"
        {...restProps}
      >
        <path d="M8.125 7L5 7L5.75686 16.083C5.80004 16.6013 6.23331 17 6.7534 17H8.75M8.125 7L8.75 17M8.125 7L11.875 7M8.75 17H11.25M11.875 7L15 7L14.243 16.0831C14.1998 16.6013 13.7666 17 13.2465 17H11.25M11.875 7L11.25 17" stroke="#191818" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 4.5L14 3" stroke="#191818" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    ) : (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        ref={ref}
        role="img"
        aria-labelledby={accessibleTitle ? titleId : undefined}
        {...restProps}
      >
        {accessibleTitle && <title id={titleId}>{accessibleTitle}</title>}
        <path d="M8.125 7L5 7L5.75686 16.083C5.80004 16.6013 6.23331 17 6.7534 17H8.75M8.125 7L8.75 17M8.125 7L11.875 7M8.75 17H11.25M11.875 7L15 7L14.243 16.0831C14.1998 16.6013 13.7666 17 13.2465 17H11.25M11.875 7L11.25 17" stroke="#191818" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 4.5L14 3" stroke="#191818" stroke-width="1.25" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    );
  }
);

BinIcon.displayName = "BinIcon";

export default BinIcon;
