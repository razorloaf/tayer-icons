import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const CaretSortIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Caret Sort" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.94204 10.442L8.50009 10.8839L7.61621 10L8.05815 9.55811L11.5582 6.05811H12.442L15.942 9.55811L16.384 10L15.5001 10.8839L15.0582 10.442L12.0001 7.38393L8.94204 10.442ZM8.94204 13.5581L8.50009 13.1162L7.61621 14L8.05815 14.442L11.5582 17.942H12.442L15.942 14.442L16.384 14L15.5001 13.1162L15.0582 13.5581L12.0001 16.6162L8.94204 13.5581Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.94204 10.442L8.50009 10.8839L7.61621 10L8.05815 9.55811L11.5582 6.05811H12.442L15.942 9.55811L16.384 10L15.5001 10.8839L15.0582 10.442L12.0001 7.38393L8.94204 10.442ZM8.94204 13.5581L8.50009 13.1162L7.61621 14L8.05815 14.442L11.5582 17.942H12.442L15.942 14.442L16.384 14L15.5001 13.1162L15.0582 13.5581L12.0001 16.6162L8.94204 13.5581Z" fill="#262525"/>
      </svg>
    );
  }
);

CaretSortIcon.displayName = "CaretSortIcon";

export default CaretSortIcon;
