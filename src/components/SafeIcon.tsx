/* Delay icon component from rendering to ensure consistency between client/server */

import { LucideIcon, LucideProps } from 'lucide-react';
import { useState, useEffect, ForwardRefExoticComponent, RefAttributes } from 'react';

export interface SafeIconProps extends LucideProps {
  Icon: LucideIcon;
}

export default function SafeIcon(props: SafeIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <props.Icon {...props} />;
}
