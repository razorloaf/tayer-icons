import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const ReturnIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Return" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.37493 11.0742L9.55877 5.61963L10.5506 6.3804L7.58657 10.2447C8.05042 10.1156 8.57437 9.98387 9.13099 9.86853C10.0956 9.66866 11.1743 9.51462 12.2167 9.51462C13.2517 9.51462 14.3025 9.66613 15.1751 10.1212C17.7301 11.4536 18.4444 13.5165 18.4931 15.2257C18.517 16.0651 18.3823 16.8147 18.2439 17.3513C18.1744 17.6208 18.1031 17.8401 18.0482 17.9942C18.0207 18.0713 17.9972 18.1324 17.98 18.1756C17.9714 18.1972 17.9644 18.2143 17.9592 18.2268L17.9528 18.2419L17.9507 18.2468L17.9499 18.2486L17.9496 18.2493C17.9495 18.2496 17.9493 18.2499 17.3765 18C16.8036 17.7501 16.8035 17.7503 16.8034 17.7506L16.8058 17.7449C16.8084 17.7387 16.8128 17.728 16.8188 17.713C16.8307 17.6831 16.8487 17.6364 16.8707 17.5746C16.9148 17.4508 16.9746 17.2676 17.0335 17.0392C17.152 16.5798 17.2632 15.9512 17.2436 15.2613C17.2051 13.9121 16.6742 12.3127 14.5971 11.2295C13.9755 10.9053 13.1522 10.7646 12.2167 10.7646C11.2886 10.7646 10.3003 10.9028 9.38462 11.0925C8.55094 11.2653 7.79073 11.478 7.21008 11.6585L11.4692 14.768L10.7321 15.7775L5.50232 11.9593L5.37493 11.0742Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.37493 11.0742L9.55877 5.61963L10.5506 6.3804L7.58657 10.2447C8.05042 10.1156 8.57437 9.98387 9.13099 9.86853C10.0956 9.66866 11.1743 9.51462 12.2167 9.51462C13.2517 9.51462 14.3025 9.66613 15.1751 10.1212C17.7301 11.4536 18.4444 13.5165 18.4931 15.2257C18.517 16.0651 18.3823 16.8147 18.2439 17.3513C18.1744 17.6208 18.1031 17.8401 18.0482 17.9942C18.0207 18.0713 17.9972 18.1324 17.98 18.1756C17.9714 18.1972 17.9644 18.2143 17.9592 18.2268L17.9528 18.2419L17.9507 18.2468L17.9499 18.2486L17.9496 18.2493C17.9495 18.2496 17.9493 18.2499 17.3765 18C16.8036 17.7501 16.8035 17.7503 16.8034 17.7506L16.8058 17.7449C16.8084 17.7387 16.8128 17.728 16.8188 17.713C16.8307 17.6831 16.8487 17.6364 16.8707 17.5746C16.9148 17.4508 16.9746 17.2676 17.0335 17.0392C17.152 16.5798 17.2632 15.9512 17.2436 15.2613C17.2051 13.9121 16.6742 12.3127 14.5971 11.2295C13.9755 10.9053 13.1522 10.7646 12.2167 10.7646C11.2886 10.7646 10.3003 10.9028 9.38462 11.0925C8.55094 11.2653 7.79073 11.478 7.21008 11.6585L11.4692 14.768L10.7321 15.7775L5.50232 11.9593L5.37493 11.0742Z" fill="#262525"/>
      </svg>
    );
  }
);

ReturnIcon.displayName = "ReturnIcon";

export default ReturnIcon;
