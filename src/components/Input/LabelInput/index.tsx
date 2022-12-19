import classNames from 'classnames';
import React, { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { caseInsensitiveEqual } from '../../../utils/strings';
import InputLabel from '../Label';
type Props = {
  label?: string;
  placeholder?: string;
  labels: string[];
  onChange: (newLabels: string[]) => void;
  className?: string;
  inputClassName?: string;
};
export default function LabelInput({ inputClassName, label, placeholder, onChange, labels, className }: Props) {
  const [inputText, setInputText] = useState('');

  const removeLabel = (label: string) => {
    onChange(labels.filter(l => l !== label));
  };

  const handleKeystroke = (ev: React.KeyboardEvent) => {
    const { key } = ev;
    if (key.toLowerCase() === 'enter') {
      if (!inputText || labels.some(label => caseInsensitiveEqual(label, inputText))) return;
      onChange([...labels, inputText]);
      setInputText('');
      return;
    }

    if (key.toLowerCase() === 'backspace') {
      if (inputText.length > 0) return;
      onChange(labels.slice(0, -1));
    }
  };

  return (
    <div className={classNames("flex flex-col gap-2 bg-opacity-0 items-stretch", className)}>
      <InputLabel text={label} />
      <input
        onKeyDown={handleKeystroke}
        placeholder={placeholder}
        value={inputText}
        className={classNames(
          "outline-none focus:outline-primary placeholder:text-xs flex-1 rounded-lg border-none px-2 bg-text bg-opacity-20 flex-shrink-0 min-h-[36px]",
          inputClassName
        )}
        onChange={e => setInputText(e.target.value)} />
      <div data-id='label-input-wrapper' className="flex flex-row gap-2 flex-wrap">
        {labels.map((label) => (
          <div
            key={label}
            className="rounded-full px-2 py-1 flex items-center justify-center whitespace-nowrap gap-2 text-sm bg-secondary-alt text-background"
          >
            {label}
            <VscClose onClick={() => removeLabel(label)} />
          </div>
        ))}
      </div>
    </div>
  );
}