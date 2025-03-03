import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const PlayIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Play" : title;
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
        <path d="M9 7L9.36327 6.49142L8.375 7H9ZM16 12L16.3633 12.5086V11.4914L16 12ZM9 17H8.375L9.36327 17.5086L9 17ZM8.63673 7.50858L15.6367 12.5086L16.3633 11.4914L9.36327 6.49142L8.63673 7.50858ZM15.6367 11.4914L8.63673 16.4914L9.36327 17.5086L16.3633 12.5086L15.6367 11.4914ZM8.375 7V17H9.625V7H8.375Z" fill="#262525"/>
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
        <path d="M9 7L9.36327 6.49142L8.375 7H9ZM16 12L16.3633 12.5086V11.4914L16 12ZM9 17H8.375L9.36327 17.5086L9 17ZM8.63673 7.50858L15.6367 12.5086L16.3633 11.4914L9.36327 6.49142L8.63673 7.50858ZM15.6367 11.4914L8.63673 16.4914L9.36327 17.5086L16.3633 12.5086L15.6367 11.4914ZM8.375 7V17H9.625V7H8.375Z" fill="#262525"/>
      </svg>
    );
  }
);

PlayIcon.displayName = "PlayIcon";

export default PlayIcon;
