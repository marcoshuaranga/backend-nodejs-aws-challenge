import type { $ZodIssue } from "zod/v4/core";

export function planifyZodIssues(issues: $ZodIssue[]) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of issues) {
    const key = issue.path
      .filter((p): p is string | number => typeof p === "string" || typeof p === "number")
      .join('.') || 'form';
    if (!fieldErrors[key]) fieldErrors[key] = [];
    fieldErrors[key].push(issue.message);
  }
  return fieldErrors;
}
