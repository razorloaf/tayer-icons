import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const LinkIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Link" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8936 13.9075C11.8134 14.9877 10.8781 15.3476 10.1396 15.3617C9.40138 15.3758 8.74551 15.0466 8.21707 14.5182C7.68863 13.9897 7.3594 13.3339 7.3735 12.5956C7.38761 11.8572 7.74753 10.9218 8.82775 9.84162L7.94387 8.95773C6.70992 10.1917 6.14578 11.4178 6.12373 12.5717C6.10168 13.7258 6.62419 14.693 7.33318 15.402C8.04218 16.111 9.00944 16.6336 10.1635 16.6115C11.3174 16.5895 12.5436 16.0253 13.7775 14.7914L12.8936 13.9075ZM10.5312 13.0879L14.3882 9.23093L13.5043 8.34705L9.64735 12.204L10.5312 13.0879ZM16.0917 12.4772C17.3256 11.2432 17.8898 10.0171 17.9118 8.8632C17.9339 7.70914 17.4113 6.74188 16.7023 6.03288C15.9934 5.32388 15.0261 4.80137 13.872 4.82343C12.7181 4.84548 11.492 5.40962 10.258 6.64356L11.1419 7.52745C12.2221 6.44723 13.1575 6.08731 13.8959 6.0732C14.6342 6.05909 15.29 6.38832 15.8185 6.91676C16.3469 7.4452 16.6761 8.10108 16.662 8.83932C16.6479 9.57775 16.288 10.5131 15.2078 11.5933L16.0917 12.4772ZM5 19.6249H19V18.3749H5V19.6249Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8936 13.9075C11.8134 14.9877 10.8781 15.3476 10.1396 15.3617C9.40138 15.3758 8.74551 15.0466 8.21707 14.5182C7.68863 13.9897 7.3594 13.3339 7.3735 12.5956C7.38761 11.8572 7.74753 10.9218 8.82775 9.84162L7.94387 8.95773C6.70992 10.1917 6.14578 11.4178 6.12373 12.5717C6.10168 13.7258 6.62419 14.693 7.33318 15.402C8.04218 16.111 9.00944 16.6336 10.1635 16.6115C11.3174 16.5895 12.5436 16.0253 13.7775 14.7914L12.8936 13.9075ZM10.5312 13.0879L14.3882 9.23093L13.5043 8.34705L9.64735 12.204L10.5312 13.0879ZM16.0917 12.4772C17.3256 11.2432 17.8898 10.0171 17.9118 8.8632C17.9339 7.70914 17.4113 6.74188 16.7023 6.03288C15.9934 5.32388 15.0261 4.80137 13.872 4.82343C12.7181 4.84548 11.492 5.40962 10.258 6.64356L11.1419 7.52745C12.2221 6.44723 13.1575 6.08731 13.8959 6.0732C14.6342 6.05909 15.29 6.38832 15.8185 6.91676C16.3469 7.4452 16.6761 8.10108 16.662 8.83932C16.6479 9.57775 16.288 10.5131 15.2078 11.5933L16.0917 12.4772ZM5 19.6249H19V18.3749H5V19.6249Z" fill="#262525"/>
      </svg>
    );
  }
);

LinkIcon.displayName = "LinkIcon";

export default LinkIcon;
