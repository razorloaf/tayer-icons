import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const TargetIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Target" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.375 9V6.66095C8.90596 6.94686 6.94686 8.90596 6.66095 11.375H9V12.625H6.66095C6.94686 15.094 8.90596 17.0531 11.375 17.3391V15H12.625V17.3391C15.094 17.0531 17.0531 15.094 17.3391 12.625H15V11.375H17.3391C17.0531 8.90596 15.094 6.94686 12.625 6.66095V9H11.375ZM12.625 18.5959C15.785 18.3002 18.3002 15.785 18.5959 12.625H20V11.375H18.5959C18.3002 8.21496 15.785 5.69978 12.625 5.4041V4H11.375V5.4041C8.21496 5.69978 5.69978 8.21496 5.4041 11.375H4V12.625H5.4041C5.69978 15.785 8.21496 18.3002 11.375 18.5959V20H12.625V18.5959Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.375 9V6.66095C8.90596 6.94686 6.94686 8.90596 6.66095 11.375H9V12.625H6.66095C6.94686 15.094 8.90596 17.0531 11.375 17.3391V15H12.625V17.3391C15.094 17.0531 17.0531 15.094 17.3391 12.625H15V11.375H17.3391C17.0531 8.90596 15.094 6.94686 12.625 6.66095V9H11.375ZM12.625 18.5959C15.785 18.3002 18.3002 15.785 18.5959 12.625H20V11.375H18.5959C18.3002 8.21496 15.785 5.69978 12.625 5.4041V4H11.375V5.4041C8.21496 5.69978 5.69978 8.21496 5.4041 11.375H4V12.625H5.4041C5.69978 15.785 8.21496 18.3002 11.375 18.5959V20H12.625V18.5959Z" fill="#262525"/>
      </svg>
    );
  }
);

TargetIcon.displayName = "TargetIcon";

export default TargetIcon;
