import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const ShareIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Share" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4959 11.0742L14.3121 5.61963L13.3202 6.3804L16.2843 10.2447C15.8204 10.1156 15.2965 9.98387 14.7399 9.86853C13.7753 9.66866 12.6966 9.51462 11.6541 9.51462C10.6191 9.51462 9.56833 9.66613 8.69576 10.1212C6.14077 11.4536 5.42649 13.5165 5.37778 15.2257C5.35385 16.0651 5.48854 16.8147 5.6269 17.3513C5.69641 17.6208 5.76774 17.8401 5.82266 17.9942C5.85015 18.0713 5.87361 18.1324 5.89081 18.1756C5.89942 18.1972 5.90646 18.2143 5.91167 18.2268L5.91807 18.2419L5.92018 18.2468L5.92094 18.2486L5.92126 18.2493C5.92139 18.2496 5.92152 18.2499 6.49437 18C7.06723 17.7501 7.06734 17.7503 7.06744 17.7506L7.06507 17.7449C7.06246 17.7387 7.05804 17.728 7.05209 17.713C7.04018 17.6831 7.02216 17.6364 7.00013 17.5746C6.95601 17.4508 6.89621 17.2676 6.83731 17.0392C6.71884 16.5798 6.60761 15.9512 6.62727 15.2613C6.66572 13.9121 7.19662 12.3127 9.27375 11.2295C9.8954 10.9053 10.7186 10.7646 11.6541 10.7646C12.5822 10.7646 13.5706 10.9028 14.4862 11.0925C15.3199 11.2653 16.0801 11.478 16.6608 11.6585L12.4017 14.768L13.1387 15.7775L18.3685 11.9593L18.4959 11.0742Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4959 11.0742L14.3121 5.61963L13.3202 6.3804L16.2843 10.2447C15.8204 10.1156 15.2965 9.98387 14.7399 9.86853C13.7753 9.66866 12.6966 9.51462 11.6541 9.51462C10.6191 9.51462 9.56833 9.66613 8.69576 10.1212C6.14077 11.4536 5.42649 13.5165 5.37778 15.2257C5.35385 16.0651 5.48854 16.8147 5.6269 17.3513C5.69641 17.6208 5.76774 17.8401 5.82266 17.9942C5.85015 18.0713 5.87361 18.1324 5.89081 18.1756C5.89942 18.1972 5.90646 18.2143 5.91167 18.2268L5.91807 18.2419L5.92018 18.2468L5.92094 18.2486L5.92126 18.2493C5.92139 18.2496 5.92152 18.2499 6.49437 18C7.06723 17.7501 7.06734 17.7503 7.06744 17.7506L7.06507 17.7449C7.06246 17.7387 7.05804 17.728 7.05209 17.713C7.04018 17.6831 7.02216 17.6364 7.00013 17.5746C6.95601 17.4508 6.89621 17.2676 6.83731 17.0392C6.71884 16.5798 6.60761 15.9512 6.62727 15.2613C6.66572 13.9121 7.19662 12.3127 9.27375 11.2295C9.8954 10.9053 10.7186 10.7646 11.6541 10.7646C12.5822 10.7646 13.5706 10.9028 14.4862 11.0925C15.3199 11.2653 16.0801 11.478 16.6608 11.6585L12.4017 14.768L13.1387 15.7775L18.3685 11.9593L18.4959 11.0742Z" fill="#262525"/>
      </svg>
    );
  }
);

ShareIcon.displayName = "ShareIcon";

export default ShareIcon;
