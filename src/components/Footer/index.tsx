import React from 'react';
import { VscCheckAll, VscGitMerge, VscListTree } from 'react-icons/vsc';
import FooterItem from './FooterItem';
export default function Footer() {
  return (
    <div className="flex items-center justify-around h-16 bg-background">
      <FooterItem path='/'>
        <VscListTree />
      </FooterItem>
      <FooterItem path='/todo'>
        <VscCheckAll />
      </FooterItem>
      <FooterItem path='/flow'>
        <VscGitMerge />
      </FooterItem>
    </div>
  );
}