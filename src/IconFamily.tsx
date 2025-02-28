import * as React from 'react';
import { IconFamilyContext, IconFamilyConfig } from './IconFamilyContext';

export interface IconFamilyProps extends IconFamilyConfig {
  children: React.ReactNode;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  wrapper?: boolean;
}

/**
 * Icon Family component
 * 
 * Groups icons together and provides shared properties
 * 
 * @example
 * ```jsx
 * <IconFamily size={24} variant="outline" color="green">
 *   <Home />
 *   <Settings />
 *   <Profile />
 * </IconFamily>
 * ```
 */
export function IconFamily({
  children,
  wrapperProps,
  wrapper = true,
  ...familyConfig
}: IconFamilyProps) {
  const config = React.useMemo(
    () => familyConfig,
    [JSON.stringify(familyConfig)]
  );
  
  return (
    <IconFamilyContext.Provider value={config}>
      {wrapper ? (
        <div 
          className={`a11y00p-icon-family ${
            familyConfig.variant ? `a11y00p-icon-family-${familyConfig.variant}` : ''
          }`}
          data-family-variant={familyConfig.variant}
          data-family-size={familyConfig.size}
          {...wrapperProps}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </IconFamilyContext.Provider>
  );
}