import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const sourceFiles = [
  "src/App.jsx",
  "src/main.jsx",
  "src/components/ActionChecklist.jsx",
  "src/components/CalculatorForm.jsx",
  "src/components/Card.jsx",
  "src/components/Insights.jsx",
  "src/components/ProgressTracker.jsx",
  "src/components/ResultSummary.jsx",
  "src/data/options.js",
  "src/utils/carbon.js",
  "src/utils/recommendations.js",
  "src/utils/storage.js",
  "src/utils/validation.js"
];

describe("source quality and security guardrails", () => {
  it("does not use unsafe HTML injection or console logging in app source", () => {
    const combinedSource = sourceFiles.map((file) => readFileSync(join(process.cwd(), file), "utf8")).join("\n");

    expect(combinedSource).not.toMatch(/dangerouslySetInnerHTML/);
    expect(combinedSource).not.toMatch(/console\.(log|error|warn|info|debug)/);
  });

  it("does not contain obvious exposed API key names", () => {
    const combinedSource = sourceFiles.map((file) => readFileSync(join(process.cwd(), file), "utf8")).join("\n");

    expect(combinedSource).not.toMatch(/api[_-]?key|secret[_-]?key|private[_-]?key/i);
  });
});
