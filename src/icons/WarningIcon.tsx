import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const WarningIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Warning" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.90053 7.11766L16.8823 16.0995C17.8144 14.9908 18.375 13.5613 18.375 12C18.375 8.47918 15.5208 5.625 12 5.625C10.4387 5.625 9.00919 6.18564 7.90053 7.11766ZM15.9886 16.9735L7.02654 8.01144C6.14924 9.10376 5.625 10.4902 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C13.5098 18.375 14.8962 17.8508 15.9886 16.9735ZM6.5536 6.66358C7.93683 5.25201 9.86656 4.375 12 4.375C16.2112 4.375 19.625 7.78883 19.625 12C19.625 14.1334 18.748 16.0632 17.3364 17.4464C15.9618 18.7934 14.0774 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12C4.375 9.92262 5.20658 8.0382 6.5536 6.66358Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.90053 7.11766L16.8823 16.0995C17.8144 14.9908 18.375 13.5613 18.375 12C18.375 8.47918 15.5208 5.625 12 5.625C10.4387 5.625 9.00919 6.18564 7.90053 7.11766ZM15.9886 16.9735L7.02654 8.01144C6.14924 9.10376 5.625 10.4902 5.625 12C5.625 15.5208 8.47918 18.375 12 18.375C13.5098 18.375 14.8962 17.8508 15.9886 16.9735ZM6.5536 6.66358C7.93683 5.25201 9.86656 4.375 12 4.375C16.2112 4.375 19.625 7.78883 19.625 12C19.625 14.1334 18.748 16.0632 17.3364 17.4464C15.9618 18.7934 14.0774 19.625 12 19.625C7.78883 19.625 4.375 16.2112 4.375 12C4.375 9.92262 5.20658 8.0382 6.5536 6.66358Z" fill="#262525"/>
      </svg>
    );
  }
);

WarningIcon.displayName = "WarningIcon";

export default WarningIcon;
