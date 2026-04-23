import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'site_data');

async function filePath(section: string) {
  await mkdir(DATA_DIR, { recursive: true });
  return path.join(DATA_DIR, `${section}.json`);
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    const { section } = await params;
    const content = await readFile(await filePath(section), 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json(null, { status: 404 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    const { section } = await params;
    const data = await req.json();
    await writeFile(await filePath(section), JSON.stringify(data, null, 2));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Sauvegarde échouée' }, { status: 500 });
  }
}
