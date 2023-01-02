import React from 'react';
import { useRecoilState } from 'recoil';
import { settingsAtom } from '../atoms/settings';
import TextInput from '../components/Input/TextInput';

export default function SettingsPage() {
  const [settings, setSettings] = useRecoilState(settingsAtom);
  return (
    <div className="flex flex-col items-stretch flex-1">
      <TextInput
        label="Workflow server"
        value={settings.workflowServerUrl}
        onChange={(url) => setSettings({ ...settings, workflowServerUrl: url})}
      />
    </div>
  )
}