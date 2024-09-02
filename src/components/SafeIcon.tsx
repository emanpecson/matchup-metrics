/* Delay icon component from rendering to ensure consistency between client/server */

import { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SafeIcon({ Icon }: { Icon: LucideIcon }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Icon />;
}
