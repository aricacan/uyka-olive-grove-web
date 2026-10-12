/** "From olive to oil" step order. Copy lives in `content/<locale>/home.ts`. */
export const PROCESS_STEP_IDS = ["harvest", "selection", "transport", "milling", "filtering", "storage", "bottling"] as const;
export type ProcessStepId = (typeof PROCESS_STEP_IDS)[number];
