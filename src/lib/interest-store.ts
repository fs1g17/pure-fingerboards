import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "interest.json");

type InterestData = {
  visitors: string[];
};

async function readData(): Promise<InterestData> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as InterestData;
    if (!Array.isArray(parsed.visitors)) return { visitors: [] };
    return parsed;
  } catch {
    return { visitors: [] };
  }
}

async function writeData(data: InterestData): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getInterestCount(): Promise<number> {
  const data = await readData();
  return data.visitors.length;
}

export async function registerVisitor(
  visitorId: string,
): Promise<{ count: number; isNew: boolean }> {
  const data = await readData();

  if (data.visitors.includes(visitorId)) {
    return { count: data.visitors.length, isNew: false };
  }

  data.visitors.push(visitorId);
  await writeData(data);

  return { count: data.visitors.length, isNew: true };
}
