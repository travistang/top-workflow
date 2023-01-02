import { atom } from "recoil";

export const LS_SETTINGS_KEY = "@workflow/settings";

export type SettingsConfig = {
  workflowServerUrl: string;
};

const defaultSettingsConfig: SettingsConfig = {
  workflowServerUrl: "",
};
export const getConfigFromLS = () => {
  const configString =
    window.localStorage.getItem(LS_SETTINGS_KEY) ??
    JSON.stringify(defaultSettingsConfig);

  return JSON.parse(configString);
};

export const settingsAtom = atom<SettingsConfig>({
  key: "settings",
  default: getConfigFromLS(),
  effects: [
    ({ onSet }) =>
      onSet((settings) =>
        window.localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings))
      ),
  ],
});
