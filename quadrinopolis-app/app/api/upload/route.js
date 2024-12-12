// Import necessary modules
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir, access, constants } from "fs/promises";
import fs from 'fs'

const getPdfCount = (pdfDirectory) => {
 try {
   const files = fs.readdirSync(pdfDirectory);
   const pdfFiles = files.filter(file => file.endsWith('.pdf'));
   return pdfFiles.length;

 } catch (error) {
   console.error('Error reading directory:', error);
   return 0; // Return 0 if there's an error
 }
};


// Define the POST handler for the file upload
export const POST = async (req) => {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the files and fields from the form data
  const imageFile = formData.get("image"); // This is now optional
  const pdfFile = formData.get("pdf");
  const titulo = formData.get("titulo");
  const sinopse = formData.get("sinopse");

  // Check if the PDF file is received
  if (!pdfFile) {
    return NextResponse.json({ error: "No PDF file received." }, { status: 400 });
  }

  // Sanitize the title for folder creation
  const sanitizedTitle = titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const uploadDir = path.join(process.cwd(), "/public/uploads/pendente", sanitizedTitle);

  try {
    // Check if the directory exists
    await access(uploadDir, constants.F_OK);
  } catch {
    // If the directory does not exist, create it
    await mkdir(uploadDir, { recursive: true });
  }

  // If an image file is provided, process it
  if (imageFile) {
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageFilename = imageFile.name.replaceAll(" ", "_");

    try {
      // Write the image file to the specified directory
      await writeFile(
        path.join(uploadDir, imageFilename),
        imageBuffer
      );
    } catch (error) {
      console.log("Error occurred while saving image: ", error);
      return NextResponse.json({ message: "Failed to upload image", status: 500 });
    }
  }

  // Process the PDF file
  const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

  const pdfCount = getPdfCount(uploadDir);
  const pdfFilename = `${pdfCount + 1}.${pdfFile.name}`;

  try {
    // Write the PDF file to the specified directory
    await writeFile(
      path.join(uploadDir, pdfFilename),
      pdfBuffer
    );

    // Save the synopsis to a new text file
    await writeFile(
      path.join(uploadDir, "sinopse.txt"),
      sinopse
    );

    // Return a JSON response with a success message
    return NextResponse.json({
      message: "Files uploaded successfully",
      status: 201,
      data: {
        titulo,
        sinopse,
        imageFilename: imageFile ? imageFile.name : null, // Include image filename if provided
        pdfFilename,
      },
    });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message
    console.log("Error occurred while saving PDF: ", error);
    return NextResponse.json({ message: "Failed to upload files", status: 500 });
  }
};