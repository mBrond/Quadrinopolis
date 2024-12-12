// app/api/download/route.js
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const dirPath = searchParams.get('dirPath');

  // Validate the dirPath to prevent directory traversal attacks
  if (!dirPath) {
    return new Response('Invalid directory path', { status: 400 });
  }

  const absoluteDirPath = path.join(process.cwd(), dirPath);

  // Check if the directory exists
  if (!fs.existsSync(absoluteDirPath)) {
    return new Response('Directory not found', { status: 404 });
  }

  const zipFileName = `${path.basename(dirPath)}.zip`;

  // Set the headers for the response
  const headers = {
    'Content-Type': 'application/zip',
    'Content-Disposition': `attachment; filename=${zipFileName}`,
  };

  // Create a zip archive
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level
  });

  // Pipe the archive to the response
  const response = new Response(archive, {
    headers,
  });

  // Append files from the specified directory
  archive.directory(absoluteDirPath, false);

  // Finalize the archive (this will also end the stream)
  archive.finalize();

  // Return the response
  return response;
}