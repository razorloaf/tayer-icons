import * as React from "react";
import { forwardRef } from "react";
import { IconProps } from "../types";
import { useIconFamily } from "../IconFamilyContext";
import { useOSAccessibility } from "../AccessibilityUtils";

const ShoppingBagIcon = forwardRef<SVGSVGElement, IconProps>(
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
    const accessibleTitle = title === undefined ? "Shopping Bag" : title;
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.58661 9.02717H9.72807C9.79609 8.37634 9.9782 7.63608 10.3564 6.98897C10.4281 6.86626 10.5069 6.7471 10.5931 6.63279C9.81822 6.69253 9.34536 7.09003 9.03572 7.61975C8.78969 8.04064 8.64986 8.54716 8.58661 9.02717ZM12.0001 6.97789C11.7655 7.14762 11.5822 7.36884 11.4356 7.61972C11.1896 8.04061 11.0498 8.54714 10.9866 9.02717H13.0135C12.9502 8.54713 12.8105 8.04059 12.5645 7.61969C12.4179 7.36882 12.2347 7.14761 12.0001 6.97789ZM14.2719 9.02717C14.2039 8.37636 14.0219 7.63611 13.6437 6.989C13.572 6.86628 13.4932 6.74711 13.407 6.63278C14.1819 6.6925 14.6548 7.09 14.9644 7.61972C15.2104 8.04061 15.3502 8.54714 15.4134 9.02717H14.2719ZM13.68 10.2772H10.32H7.92004H7.5173L6.70105 17.375H17.2991L16.4828 10.2772H16.08H13.68ZM7.3281 9.02717H6.96005L6.33914 9.58076L5.37915 17.9286L6.00006 18.625H18.0001L18.621 17.9286L17.661 9.58076L17.0401 9.02717H16.6719C16.6039 8.37634 16.4218 7.63608 16.0436 6.98897C15.5158 6.08606 14.6047 5.375 13.2 5.375C12.7508 5.375 12.352 5.44773 12.0001 5.5762C11.6482 5.44773 11.2495 5.375 10.8002 5.375C9.39555 5.375 8.48434 6.08605 7.95656 6.98894C7.5783 7.63606 7.39614 8.37633 7.3281 9.02717Z" fill="#262525"/>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.58661 9.02717H9.72807C9.79609 8.37634 9.9782 7.63608 10.3564 6.98897C10.4281 6.86626 10.5069 6.7471 10.5931 6.63279C9.81822 6.69253 9.34536 7.09003 9.03572 7.61975C8.78969 8.04064 8.64986 8.54716 8.58661 9.02717ZM12.0001 6.97789C11.7655 7.14762 11.5822 7.36884 11.4356 7.61972C11.1896 8.04061 11.0498 8.54714 10.9866 9.02717H13.0135C12.9502 8.54713 12.8105 8.04059 12.5645 7.61969C12.4179 7.36882 12.2347 7.14761 12.0001 6.97789ZM14.2719 9.02717C14.2039 8.37636 14.0219 7.63611 13.6437 6.989C13.572 6.86628 13.4932 6.74711 13.407 6.63278C14.1819 6.6925 14.6548 7.09 14.9644 7.61972C15.2104 8.04061 15.3502 8.54714 15.4134 9.02717H14.2719ZM13.68 10.2772H10.32H7.92004H7.5173L6.70105 17.375H17.2991L16.4828 10.2772H16.08H13.68ZM7.3281 9.02717H6.96005L6.33914 9.58076L5.37915 17.9286L6.00006 18.625H18.0001L18.621 17.9286L17.661 9.58076L17.0401 9.02717H16.6719C16.6039 8.37634 16.4218 7.63608 16.0436 6.98897C15.5158 6.08606 14.6047 5.375 13.2 5.375C12.7508 5.375 12.352 5.44773 12.0001 5.5762C11.6482 5.44773 11.2495 5.375 10.8002 5.375C9.39555 5.375 8.48434 6.08605 7.95656 6.98894C7.5783 7.63606 7.39614 8.37633 7.3281 9.02717Z" fill="#262525"/>
      </svg>
    );
  }
);

ShoppingBagIcon.displayName = "ShoppingBagIcon";

export default ShoppingBagIcon;
