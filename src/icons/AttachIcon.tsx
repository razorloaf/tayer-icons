import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const AttachIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Attach" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4222 5.46811C12.9314 4.01047 15.3694 4.01063 16.8784 5.46859C18.4052 6.94369 18.3988 9.34621 16.8647 10.8136C16.8645 10.8138 16.8643 10.814 16.8641 10.8142L11.3556 16.1049C11.3554 16.1051 11.3551 16.1054 11.3549 16.1056C10.4286 16.9997 8.93605 16.9995 8.01008 16.1048C7.07174 15.1983 7.07175 13.7192 8.01009 12.8127L12.5737 8.4037L13.4422 9.30268L8.87862 13.7117C8.4489 14.1268 8.4489 14.7907 8.87861 15.2059L8.44434 15.6553L8.87861 15.2059C9.3204 15.6327 10.0453 15.6327 10.4871 15.2059L10.4884 15.2046L15.9993 9.91169L16.0003 9.91072C17.0221 8.9337 17.0263 7.34951 16.0099 6.36757C14.9851 5.37747 13.315 5.37748 12.2902 6.36758L12.2893 6.36844L6.83967 11.6129L6.83822 11.6143C5.22643 13.1554 5.21983 15.6597 6.82312 17.2087C8.4327 18.7638 11.051 18.7638 12.6606 17.2087L18.5657 11.5035L19.4343 12.4024L13.5291 18.1077C11.4351 20.1308 8.04861 20.1308 5.95458 18.1077C3.84091 16.0656 3.84972 12.743 5.97367 10.7115C5.9739 10.7112 5.97413 10.711 5.97436 10.7108L11.4216 5.46862C11.4218 5.46845 11.422 5.46828 11.4222 5.46811Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4222 5.46811C12.9314 4.01047 15.3694 4.01063 16.8784 5.46859C18.4052 6.94369 18.3988 9.34621 16.8647 10.8136C16.8645 10.8138 16.8643 10.814 16.8641 10.8142L11.3556 16.1049C11.3554 16.1051 11.3551 16.1054 11.3549 16.1056C10.4286 16.9997 8.93605 16.9995 8.01008 16.1048C7.07174 15.1983 7.07175 13.7192 8.01009 12.8127L12.5737 8.4037L13.4422 9.30268L8.87862 13.7117C8.4489 14.1268 8.4489 14.7907 8.87861 15.2059L8.44434 15.6553L8.87861 15.2059C9.3204 15.6327 10.0453 15.6327 10.4871 15.2059L10.4884 15.2046L15.9993 9.91169L16.0003 9.91072C17.0221 8.9337 17.0263 7.34951 16.0099 6.36757C14.9851 5.37747 13.315 5.37748 12.2902 6.36758L12.2893 6.36844L6.83967 11.6129L6.83822 11.6143C5.22643 13.1554 5.21983 15.6597 6.82312 17.2087C8.4327 18.7638 11.051 18.7638 12.6606 17.2087L18.5657 11.5035L19.4343 12.4024L13.5291 18.1077C11.4351 20.1308 8.04861 20.1308 5.95458 18.1077C3.84091 16.0656 3.84972 12.743 5.97367 10.7115C5.9739 10.7112 5.97413 10.711 5.97436 10.7108L11.4216 5.46862C11.4218 5.46845 11.422 5.46828 11.4222 5.46811Z" fill="#262525"/>
      </svg>
    );
  }
);

AttachIcon.displayName = "AttachIcon";

export default AttachIcon;
