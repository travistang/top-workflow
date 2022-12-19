import React from 'react';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

type Props = {
  expanded: boolean;
  hasSubTask: boolean;
}
export default function ExpandIcon({ expanded, hasSubTask}: Props) {
  if (!hasSubTask) return null;
  return expanded ? <VscTriangleUp /> : <VscTriangleDown />;
}