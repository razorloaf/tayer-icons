import * as React from 'react';
import { IconProps } from './types';

export interface IconFamilyConfig extends Omit<IconProps, 'decorative'> {
  variant?: string;
  decorative?: boolean;
  weight?: number;
  label?: string;
}

// Create the context with default values
export const IconFamilyContext = React.createContext<IconFamilyConfig | null>(null);

export function useIconFamily(iconProps: IconProps): IconProps {
  const familyProps = React.useContext(IconFamilyContext);
  
  // If no family context or icon has explicit props, return icon props
  if (!familyProps) {
    return iconProps;
  }
  
  // Merge props, with icon-specific props taking precedence
  return {
    ...familyProps,
    ...iconProps,
    className: iconProps.className 
      ? `${familyProps.className || ''} ${iconProps.className}`.trim()
      : familyProps.className,
  };
}