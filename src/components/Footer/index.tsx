import React from 'react';
import { VscCheckAll, VscGitMerge } from 'react-icons/vsc';
import FooterItem from './FooterItem';
export default function Footer() {
  return (
    <div className="flex items-center justify-around h-16 bg-background">
      <FooterItem path='/'>
        <VscCheckAll />
      </FooterItem>
      <FooterItem path='/flow'>
        <VscGitMerge />
      </FooterItem>
    </div>
  );
}