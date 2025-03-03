import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const SignIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Sign" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.03654 7.48726C5.44657 6.81439 6.1418 6.375 6.99994 6.375C8.29618 6.375 9.33965 7.22338 10.0335 8.30264C10.7338 9.39208 11.1535 10.8184 11.1872 12.2351C11.1985 12.7096 11.1666 13.1905 11.0843 13.6627C11.8696 13.852 12.5475 13.9106 13.1273 13.8781C12.6311 13.1259 12.3749 12.2976 12.3749 11.5C12.3749 10.188 13.2203 9.33191 14.2233 9.08116C15.2008 8.83679 16.3576 9.15984 17.0199 10.1533C17.7414 11.2356 17.3762 12.9236 16.1785 13.9915C15.9778 14.1704 15.7549 14.3329 15.5096 14.4756C16.3608 15.0121 17.5146 15.375 18.9999 15.375V16.625C16.8914 16.625 15.2483 15.9639 14.1258 15.0027C13.1911 15.2051 12.0652 15.1887 10.7499 14.8674C10.5547 15.3637 10.2896 15.8331 9.94475 16.2549C9.00452 17.4051 7.53414 18.1249 5.49992 18.1249V16.8749C7.21571 16.8749 8.30782 16.2823 8.97696 15.4638C9.21101 15.1775 9.40063 14.8544 9.54771 14.505C6.56663 13.4396 5.06008 11.6031 4.70057 9.87744C4.51803 9.00127 4.63497 8.14623 5.03654 7.48726ZM9.87752 13.295C9.92629 12.9606 9.94593 12.6151 9.93759 12.2649C9.90882 11.0566 9.54726 9.85789 8.982 8.97859C8.41019 8.08912 7.70368 7.625 6.99994 7.625C6.60808 7.625 6.30331 7.8106 6.10396 8.13773C5.89615 8.47875 5.79433 8.99869 5.92429 9.6225C6.1699 10.8014 7.2596 12.3344 9.87752 13.295ZM14.4783 13.5906C14.8329 13.4463 15.1202 13.2603 15.3466 13.0585C16.2238 12.2764 16.2584 11.2644 15.9799 10.8467C15.6422 10.3402 15.049 10.1632 14.5265 10.2938C14.0295 10.4181 13.6249 10.812 13.6249 11.5C13.6249 12.1457 13.899 12.9112 14.4783 13.5906Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.03654 7.48726C5.44657 6.81439 6.1418 6.375 6.99994 6.375C8.29618 6.375 9.33965 7.22338 10.0335 8.30264C10.7338 9.39208 11.1535 10.8184 11.1872 12.2351C11.1985 12.7096 11.1666 13.1905 11.0843 13.6627C11.8696 13.852 12.5475 13.9106 13.1273 13.8781C12.6311 13.1259 12.3749 12.2976 12.3749 11.5C12.3749 10.188 13.2203 9.33191 14.2233 9.08116C15.2008 8.83679 16.3576 9.15984 17.0199 10.1533C17.7414 11.2356 17.3762 12.9236 16.1785 13.9915C15.9778 14.1704 15.7549 14.3329 15.5096 14.4756C16.3608 15.0121 17.5146 15.375 18.9999 15.375V16.625C16.8914 16.625 15.2483 15.9639 14.1258 15.0027C13.1911 15.2051 12.0652 15.1887 10.7499 14.8674C10.5547 15.3637 10.2896 15.8331 9.94475 16.2549C9.00452 17.4051 7.53414 18.1249 5.49992 18.1249V16.8749C7.21571 16.8749 8.30782 16.2823 8.97696 15.4638C9.21101 15.1775 9.40063 14.8544 9.54771 14.505C6.56663 13.4396 5.06008 11.6031 4.70057 9.87744C4.51803 9.00127 4.63497 8.14623 5.03654 7.48726ZM9.87752 13.295C9.92629 12.9606 9.94593 12.6151 9.93759 12.2649C9.90882 11.0566 9.54726 9.85789 8.982 8.97859C8.41019 8.08912 7.70368 7.625 6.99994 7.625C6.60808 7.625 6.30331 7.8106 6.10396 8.13773C5.89615 8.47875 5.79433 8.99869 5.92429 9.6225C6.1699 10.8014 7.2596 12.3344 9.87752 13.295ZM14.4783 13.5906C14.8329 13.4463 15.1202 13.2603 15.3466 13.0585C16.2238 12.2764 16.2584 11.2644 15.9799 10.8467C15.6422 10.3402 15.049 10.1632 14.5265 10.2938C14.0295 10.4181 13.6249 10.812 13.6249 11.5C13.6249 12.1457 13.899 12.9112 14.4783 13.5906Z" fill="#262525"/>
      </svg>
    );
  }
);

SignIcon.displayName = "SignIcon";

export default SignIcon;
