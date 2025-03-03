import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const BookIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Book" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.625 6.12652L14.2171 8.7433L14.2171 16.25V18.378L6.625 15.8021V6.12652ZM9.73131 5.87501L15.0458 7.70675L15.4671 8.29764L15.4671 15.625H17.375V5.87501L16.9343 5.87501L14.1581 5.875L9.73131 5.87501ZM18 5.25002L18 4.62502L18.625 5.25002V16.25L18 16.875H15.4671V19.25L14.6413 19.8419L5.79919 16.8419L5.375 16.25V5.25002L5.99999 4.62502L14.1581 4.625L16.9343 4.62501L17.7204 4.62502L17.9285 4.62502L17.9819 4.62502L17.9955 4.62502L17.9989 4.62502H17.9997H17.9999L18 5.25002Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.625 6.12652L14.2171 8.7433L14.2171 16.25V18.378L6.625 15.8021V6.12652ZM9.73131 5.87501L15.0458 7.70675L15.4671 8.29764L15.4671 15.625H17.375V5.87501L16.9343 5.87501L14.1581 5.875L9.73131 5.87501ZM18 5.25002L18 4.62502L18.625 5.25002V16.25L18 16.875H15.4671V19.25L14.6413 19.8419L5.79919 16.8419L5.375 16.25V5.25002L5.99999 4.62502L14.1581 4.625L16.9343 4.62501L17.7204 4.62502L17.9285 4.62502L17.9819 4.62502L17.9955 4.62502L17.9989 4.62502H17.9997H17.9999L18 5.25002Z" fill="#262525"/>
      </svg>
    );
  }
);

BookIcon.displayName = "BookIcon";

export default BookIcon;
