import type { ChangeEvent } from "react";

type FloatingFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
};

/**
 * Underline input whose label sits inside the field and floats up on focus or
 * when filled (Kosterina reference). Pure CSS via `peer` + `:placeholder-shown`.
 */
export function FloatingField({ name, label, value, onChange, type = "text", autoComplete, multiline = false, error }: FloatingFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const sharedProps = {
    id,
    name,
    value,
    placeholder: " ",
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
    className:
      "peer block w-full border-0 border-b border-line bg-transparent pb-2 pt-6 text-ink outline-none transition-colors focus:border-brand aria-invalid:border-danger",
  };

  return (
    <div className="relative">
      {multiline ? <textarea rows={4} {...sharedProps} /> : <input type={type} autoComplete={autoComplete} {...sharedProps} />}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-0 text-xs text-muted transition-all duration-300 ease-editorial peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-brand"
      >
        {label}
      </label>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
