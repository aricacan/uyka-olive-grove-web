type ChoiceChipsProps = {
  name: string;
  legend: string;
  hint?: string;
  options: readonly string[];
  selected: readonly string[];
  onToggle: (option: string) => void;
  multiple?: boolean;
  error?: string;
};

/**
 * Pill-shaped radio / checkbox group (replaces dropdowns; Brightland pill
 * reference). Real inputs stay in the DOM for keyboard and screen readers.
 */
export function ChoiceChips({ name, legend, hint, options, selected, onToggle, multiple = false, error }: ChoiceChipsProps) {
  return (
    <fieldset aria-invalid={Boolean(error)}>
      <legend className="text-sm text-muted">
        {legend}
        {hint && <span className="ml-2 text-xs opacity-70">{hint}</span>}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="cursor-pointer rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-brand has-checked:border-brand has-checked:bg-brand has-checked:text-on-brand has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={option}
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </fieldset>
  );
}
