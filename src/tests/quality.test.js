import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function listSourceFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      return listSourceFiles(path);
    }
    return /\.(js|jsx)$/.test(path) && !path.includes(`${join("src", "tests")}${"\\"}`) ? [path] : [];
  });
}

function readAppSource() {
  return listSourceFiles(join(process.cwd(), "src"))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
}

describe("source quality and security guardrails", () => {
  it("does not use unsafe HTML injection or console logging in app source", () => {
    const combinedSource = readAppSource();

    expect(combinedSource).not.toMatch(/dangerouslySetInnerHTML/);
    expect(combinedSource).not.toMatch(/console\.(log|error|warn|info|debug)/);
  });

  it("does not contain obvious exposed API key names", () => {
    const combinedSource = readAppSource();

    expect(combinedSource).not.toMatch(/api[_-]?key|secret[_-]?key|private[_-]?key/i);
  });
});
