/* Delay icon component from rendering to ensure consistency between client/server */

import { LucideIcon, LucideProps } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface SafeIconProps extends LucideProps {
  Icon: LucideIcon;
}

export default function SafeIcon(props: SafeIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <props.Icon {...props} />;
}
