import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const EditIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Edit" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9943 4.53256L14.8673 4.39429L18.1034 6.74543L18.2416 7.61843L16.6049 9.87123L13.5394 14.0906L11.1882 17.3266L10.7964 17.866L10.5353 18.0738L6.95798 19.5949L6.09082 18.9649L6.43207 15.0926L6.54902 14.7801L6.94088 14.2408L9.29202 11.0047L12.3336 6.81827L13.9943 4.53256ZM14.6382 5.77292L13.716 7.0422L15.9573 8.63598L16.863 7.38933L14.6382 5.77292ZM15.2225 9.6473L12.9813 8.05352L10.3033 11.7394L7.95215 14.9755L7.66205 15.3748L7.42744 18.037L9.88684 16.9912L10.1769 16.5919L12.5281 13.3558L15.2225 9.6473Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9943 4.53256L14.8673 4.39429L18.1034 6.74543L18.2416 7.61843L16.6049 9.87123L13.5394 14.0906L11.1882 17.3266L10.7964 17.866L10.5353 18.0738L6.95798 19.5949L6.09082 18.9649L6.43207 15.0926L6.54902 14.7801L6.94088 14.2408L9.29202 11.0047L12.3336 6.81827L13.9943 4.53256ZM14.6382 5.77292L13.716 7.0422L15.9573 8.63598L16.863 7.38933L14.6382 5.77292ZM15.2225 9.6473L12.9813 8.05352L10.3033 11.7394L7.95215 14.9755L7.66205 15.3748L7.42744 18.037L9.88684 16.9912L10.1769 16.5919L12.5281 13.3558L15.2225 9.6473Z" fill="#262525"/>
      </svg>
    );
  }
);

EditIcon.displayName = "EditIcon";

export default EditIcon;
