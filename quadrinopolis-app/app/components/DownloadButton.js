// app/page.js (or any other component)

const DownloadButton = ({ dirPath }) => {
  const handleDownload = () => {
    console.log("CERDDDOOO")
    // Construct the URL with the dirPath query parameter
    const downloadUrl = `/api/download?dirPath=${encodeURIComponent(dirPath)}`;
    window.location.href = downloadUrl; // Redirect to the download URL
  };

  return (
    <div>
      <button onClick={handleDownload}>Visualizar arquivos</button>
    </div>
  );
};

export default DownloadButton;