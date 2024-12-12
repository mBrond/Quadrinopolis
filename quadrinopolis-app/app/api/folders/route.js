// app/api/folders/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const directoryPath = path.join(process.cwd(), 'public/uploads/pendente'); // Change 'your-directory' to your target directory

  try {
    const files = await fs.promises.readdir(directoryPath);
    const folders = files.filter(file => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isDirectory();
    });

    return NextResponse.json(folders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}