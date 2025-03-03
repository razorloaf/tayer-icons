import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const BoxIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Box" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 8.52688L11.375 10.6831V18.0981L5.625 15.9419V8.52688ZM12.625 18.0981L18.375 15.9419V8.52688L15.7195 9.52271L12.625 10.6831V18.0981ZM12 9.5825L15.2805 8.3523L17.22 7.625L12 5.6675L6.78 7.625L12 9.5825ZM4.78055 7.03979L11.7805 4.41479H12.2195L19.2195 7.03979L19.625 7.625V16.375L19.2195 16.9602L12.2195 19.5852H11.7805L4.78055 16.9602L4.375 16.375V7.625L4.78055 7.03979Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 8.52688L11.375 10.6831V18.0981L5.625 15.9419V8.52688ZM12.625 18.0981L18.375 15.9419V8.52688L15.7195 9.52271L12.625 10.6831V18.0981ZM12 9.5825L15.2805 8.3523L17.22 7.625L12 5.6675L6.78 7.625L12 9.5825ZM4.78055 7.03979L11.7805 4.41479H12.2195L19.2195 7.03979L19.625 7.625V16.375L19.2195 16.9602L12.2195 19.5852H11.7805L4.78055 16.9602L4.375 16.375V7.625L4.78055 7.03979Z" fill="#262525"/>
      </svg>
    );
  }
);

BoxIcon.displayName = "BoxIcon";

export default BoxIcon;
