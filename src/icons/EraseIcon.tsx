import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const EraseIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Erase" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.442 9.8818L13.4419 4.88184L12.558 4.88185L5.05811 12.3818L5.05811 13.2657L8.55814 16.7657L9.00007 16.9487L12 16.9488L12.442 16.7657L18.442 10.7657L18.442 9.8818ZM6.38393 12.8238L13 6.20766L17.1162 10.3238L11.7412 15.6988L9.25896 15.6988L6.38393 12.8238ZM10.9999 19.6251H18.9999V18.3751H10.9999V19.6251Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.442 9.8818L13.4419 4.88184L12.558 4.88185L5.05811 12.3818L5.05811 13.2657L8.55814 16.7657L9.00007 16.9487L12 16.9488L12.442 16.7657L18.442 10.7657L18.442 9.8818ZM6.38393 12.8238L13 6.20766L17.1162 10.3238L11.7412 15.6988L9.25896 15.6988L6.38393 12.8238ZM10.9999 19.6251H18.9999V18.3751H10.9999V19.6251Z" fill="#262525"/>
      </svg>
    );
  }
);

EraseIcon.displayName = "EraseIcon";

export default EraseIcon;
