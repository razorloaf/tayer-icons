import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const NumPadIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Num Pad" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4C5.55228 4 6 4.44772 6 5ZM6 19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19C4 18.4477 4.44772 18 5 18C5.55228 18 6 18.4477 6 19ZM5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12ZM12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6ZM20 5C20 5.55228 19.5523 6 19 6C18.4477 6 18 5.55228 18 5C18 4.44772 18.4477 4 19 4C19.5523 4 20 4.44772 20 5ZM11.9718 11.4217C11.9718 10.8962 12.3978 10.4702 12.9233 10.4702C13.4488 10.4702 13.8749 10.8962 13.8749 11.4217V15.0001L14.6514 15.6065C15.5842 15.3733 16.2761 15.3769 16.788 15.5134C17.2874 15.6465 17.6541 15.9159 17.9344 16.296C18.5253 17.0976 18.75 18.4175 18.75 20.0001H20C20 18.3827 19.7871 16.7027 18.9405 15.5542C18.502 14.9594 17.8999 14.5162 17.1101 14.3056C16.5283 14.1505 15.8679 14.1275 15.1249 14.2377V11.4217C15.1249 10.2059 14.1392 9.22021 12.9233 9.22021C11.7075 9.22021 10.7218 10.2059 10.7218 11.4217V14.8373C10.0411 14.5908 9.29432 14.6591 8.70789 15.1431C7.77426 15.9135 7.6378 17.409 8.42534 19.2463L9.57425 18.7539C8.86161 17.0913 9.22524 16.3368 9.50347 16.1072C9.78259 15.8769 10.3678 15.8452 10.8818 16.4177L11.9718 16.0001V11.4217Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4C5.55228 4 6 4.44772 6 5ZM6 19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19C4 18.4477 4.44772 18 5 18C5.55228 18 6 18.4477 6 19ZM5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12ZM12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6ZM20 5C20 5.55228 19.5523 6 19 6C18.4477 6 18 5.55228 18 5C18 4.44772 18.4477 4 19 4C19.5523 4 20 4.44772 20 5ZM11.9718 11.4217C11.9718 10.8962 12.3978 10.4702 12.9233 10.4702C13.4488 10.4702 13.8749 10.8962 13.8749 11.4217V15.0001L14.6514 15.6065C15.5842 15.3733 16.2761 15.3769 16.788 15.5134C17.2874 15.6465 17.6541 15.9159 17.9344 16.296C18.5253 17.0976 18.75 18.4175 18.75 20.0001H20C20 18.3827 19.7871 16.7027 18.9405 15.5542C18.502 14.9594 17.8999 14.5162 17.1101 14.3056C16.5283 14.1505 15.8679 14.1275 15.1249 14.2377V11.4217C15.1249 10.2059 14.1392 9.22021 12.9233 9.22021C11.7075 9.22021 10.7218 10.2059 10.7218 11.4217V14.8373C10.0411 14.5908 9.29432 14.6591 8.70789 15.1431C7.77426 15.9135 7.6378 17.409 8.42534 19.2463L9.57425 18.7539C8.86161 17.0913 9.22524 16.3368 9.50347 16.1072C9.78259 15.8769 10.3678 15.8452 10.8818 16.4177L11.9718 16.0001V11.4217Z" fill="#262525"/>
      </svg>
    );
  }
);

NumPadIcon.displayName = "NumPadIcon";

export default NumPadIcon;
