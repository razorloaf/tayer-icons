import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const BoltIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Bolt" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.49589 11.4509L11.4959 4.63037L12.504 5.36941L8.23308 11.1954H15L15.5459 12.1246L11.5459 19.3041L10.454 18.6957L13.9363 12.4454H6.99995L6.49589 11.4509ZM18.4419 14.4418L16.4419 16.4418L15.558 15.5579L17.558 13.5579L18.4419 14.4418ZM6.442 14.558L9.4419 17.558L8.558 18.4418L5.55811 15.4418L6.442 14.558Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.49589 11.4509L11.4959 4.63037L12.504 5.36941L8.23308 11.1954H15L15.5459 12.1246L11.5459 19.3041L10.454 18.6957L13.9363 12.4454H6.99995L6.49589 11.4509ZM18.4419 14.4418L16.4419 16.4418L15.558 15.5579L17.558 13.5579L18.4419 14.4418ZM6.442 14.558L9.4419 17.558L8.558 18.4418L5.55811 15.4418L6.442 14.558Z" fill="#262525"/>
      </svg>
    );
  }
);

BoltIcon.displayName = "BoltIcon";

export default BoltIcon;
