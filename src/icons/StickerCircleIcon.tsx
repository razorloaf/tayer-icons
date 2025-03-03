import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const StickerCircleIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Sticker Circle" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4436 5.64894C8.18334 5.93083 5.625 8.66665 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C15.1369 18.375 17.7447 16.1093 18.276 13.125H18.0001C14.8232 13.125 12.9702 11.9184 12.0245 10.318C11.1091 8.76874 11.1142 6.96664 11.3937 5.84842L11.4436 5.64894ZM17.9911 11.875L12.5477 6.43155C12.394 7.31976 12.4619 8.60104 13.1007 9.68204C13.7792 10.8303 15.174 11.8728 17.9911 11.875ZM12 4.375C7.78883 4.375 4.375 7.78883 4.375 12C4.375 16.2112 7.78883 19.625 12 19.625C16.2112 19.625 19.625 16.2112 19.625 12L19.4419 11.5581L12.4419 4.55806L12 4.375Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4436 5.64894C8.18334 5.93083 5.625 8.66665 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C15.1369 18.375 17.7447 16.1093 18.276 13.125H18.0001C14.8232 13.125 12.9702 11.9184 12.0245 10.318C11.1091 8.76874 11.1142 6.96664 11.3937 5.84842L11.4436 5.64894ZM17.9911 11.875L12.5477 6.43155C12.394 7.31976 12.4619 8.60104 13.1007 9.68204C13.7792 10.8303 15.174 11.8728 17.9911 11.875ZM12 4.375C7.78883 4.375 4.375 7.78883 4.375 12C4.375 16.2112 7.78883 19.625 12 19.625C16.2112 19.625 19.625 16.2112 19.625 12L19.4419 11.5581L12.4419 4.55806L12 4.375Z" fill="#262525"/>
      </svg>
    );
  }
);

StickerCircleIcon.displayName = "StickerCircleIcon";

export default StickerCircleIcon;
