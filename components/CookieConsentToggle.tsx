type Props = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

export function CookieConsentToggle({ checked, disabled = false, label, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`cookie-consent__toggle${checked ? " is-on" : ""}${disabled ? " is-disabled" : ""}`}
      onClick={() => {
        if (!disabled) {
          onChange(!checked);
        }
      }}
    >
      <span className="cookie-consent__toggle-knob" aria-hidden />
    </button>
  );
}
