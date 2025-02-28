import * as React from 'react';

export interface IconProps extends Omit<React.SVGAttributes<SVGElement>, 'children' | 'display' | 'mask'> {
  color?: string;
  title?: string;
  decorative?: boolean;
  size?: number;
  disableOSAdaptation?: boolean;
  highContrastStrokeWidth?: number;
}
