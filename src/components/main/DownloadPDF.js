// src/DownloadPDF.js
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const DownloadPDF = ({ selector, options }) => {
  const handleDownload = () => {
    const element = document.querySelector(selector);

    html2canvas(element, { scale: 2 }).then(function (canvas) {
      // Get custom options or set default values
      const {
        pageSize = "a4", // default is A4
        marginTop = 30,
        marginLeft = 20,
        marginBottom = 20,
        marginRight = 30,
        fileName = "multi-page-content.pdf",
        orientation = "p", // portrait ('p') or landscape ('l')
      } = options || {};

      // Initialize jsPDF with custom page size and orientation
      const doc = new jsPDF(orientation, "pt", pageSize);

      // Get the image data from the canvas
      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions for the PDF
      const pageWidth =
        doc.internal.pageSize.getWidth() - marginLeft - marginRight;
      const pageHeight =
        doc.internal.pageSize.getHeight() - marginTop - marginBottom;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = Math.min(
        pageWidth / canvasWidth,
        pageHeight / canvasHeight
      );
      const imgHeight = canvasHeight * ratio;
      const imgWidth = canvasWidth * ratio;

      // Number of pages required to fit the entire content
      const totalPages = Math.ceil(imgHeight / pageHeight);

      for (let i = 0; i < totalPages; i++) {
        // Add the image to the PDF
        const srcY = (i * pageHeight) / ratio; // Y offset to start the next part of the image
        const srcHeight = pageHeight / ratio;

        doc.addImage(
          imgData,
          "PNG",
          marginLeft,
          marginTop,
          imgWidth,
          imgHeight,
          undefined,
          undefined,
          undefined,
          undefined,
          srcY,
          srcHeight
        );

        if (i < totalPages - 1) {
          doc.addPage(); // Add a new page if more pages are needed
        }
      }

      // Save the PDF with the custom file name
      doc.save(fileName);
    });
  };

  return { handleDownload };
};

export default DownloadPDF;
