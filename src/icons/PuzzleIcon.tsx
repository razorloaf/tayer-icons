import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const PuzzleIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Puzzle" : title;
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
        <path d="M5.5 17.1333C5.5 18.1643 6.33574 19 7.36667 19H9.35C9.35 19 9.37745 16.6667 11.3333 16.6667C13.2892 16.6667 13.3167 19 13.3167 19H15.3C16.3309 19 17.1667 18.1643 17.1667 17.1333V15.15C17.1667 15.15 19.5 15.15 19.5 13.1667C19.5 11.1833 17.1667 11.1833 17.1667 11.1833V9.2C17.1667 8.16906 16.3309 7.33333 15.3 7.33333H13.3167C13.3167 7.33333 13.3167 5 11.3333 5C9.35 5 9.35 7.33333 9.35 7.33333H7.36667C6.33574 7.33333 5.5 8.16907 5.5 9.2V11.1833C5.5 11.1833 7.83333 11.2061 7.83333 13.1667C7.83333 15.1272 5.5 15.15 5.5 15.15V17.1333Z" stroke="#262525" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="bevel"/>
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
        <path d="M5.5 17.1333C5.5 18.1643 6.33574 19 7.36667 19H9.35C9.35 19 9.37745 16.6667 11.3333 16.6667C13.2892 16.6667 13.3167 19 13.3167 19H15.3C16.3309 19 17.1667 18.1643 17.1667 17.1333V15.15C17.1667 15.15 19.5 15.15 19.5 13.1667C19.5 11.1833 17.1667 11.1833 17.1667 11.1833V9.2C17.1667 8.16906 16.3309 7.33333 15.3 7.33333H13.3167C13.3167 7.33333 13.3167 5 11.3333 5C9.35 5 9.35 7.33333 9.35 7.33333H7.36667C6.33574 7.33333 5.5 8.16907 5.5 9.2V11.1833C5.5 11.1833 7.83333 11.2061 7.83333 13.1667C7.83333 15.1272 5.5 15.15 5.5 15.15V17.1333Z" stroke="#262525" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="bevel"/>
      </svg>
    );
  }
);

PuzzleIcon.displayName = "PuzzleIcon";

export default PuzzleIcon;
