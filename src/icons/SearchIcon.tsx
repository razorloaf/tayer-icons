import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const SearchIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Search" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6.625C8.58375 6.625 6.625 8.58375 6.625 11C6.625 13.4162 8.58375 15.375 11 15.375C12.1926 15.375 13.2727 14.8986 14.0625 14.1244C14.8732 13.3296 15.375 12.224 15.375 11C15.375 8.58375 13.4162 6.625 11 6.625ZM5.375 11C5.375 7.8934 7.8934 5.375 11 5.375C14.1066 5.375 16.625 7.8934 16.625 11C16.625 12.3438 16.1532 13.5782 15.3672 14.5454L18.4374 17.5536L17.5626 18.4464L14.4763 15.4225C13.5197 16.1753 12.3119 16.625 11 16.625C7.8934 16.625 5.375 14.1066 5.375 11Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6.625C8.58375 6.625 6.625 8.58375 6.625 11C6.625 13.4162 8.58375 15.375 11 15.375C12.1926 15.375 13.2727 14.8986 14.0625 14.1244C14.8732 13.3296 15.375 12.224 15.375 11C15.375 8.58375 13.4162 6.625 11 6.625ZM5.375 11C5.375 7.8934 7.8934 5.375 11 5.375C14.1066 5.375 16.625 7.8934 16.625 11C16.625 12.3438 16.1532 13.5782 15.3672 14.5454L18.4374 17.5536L17.5626 18.4464L14.4763 15.4225C13.5197 16.1753 12.3119 16.625 11 16.625C7.8934 16.625 5.375 14.1066 5.375 11Z" fill="#262525"/>
      </svg>
    );
  }
);

SearchIcon.displayName = "SearchIcon";

export default SearchIcon;
