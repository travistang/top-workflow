import classNames from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';
import { VscCheckAll, VscGitMerge, VscListTree } from 'react-icons/vsc';
import FooterItem from './FooterItem';

type FooterItemProps = {
  icon: IconType;
  path: string;
  className?: string;
};

const footerItems: FooterItemProps[] = [
  { path: '/', icon: VscListTree },
  { path: '/todo', icon: VscCheckAll, className: 'sm:hidden' },
  { path: '/flow', icon: VscGitMerge },
]
export default function Footer() {
  return (
    <div className={classNames(
      "flex items-center justify-around h-16 bg-background",
      "sm:fixed sm:top-0 sm:right-0 sm:z-50"
    )}>
      {footerItems.map(items => (
        <FooterItem key={items.path} path={items.path} className={items.className}>
          <items.icon />
        </FooterItem>
      ))}
    </div>
  );
}