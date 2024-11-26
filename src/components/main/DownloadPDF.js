// src/DownloadPDF.js
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const DownloadPDF = ({ selector, options }) => {
  const handleDownload = () => {
    const element = document.querySelector(selector);

    if (!element) {
      console.error("Invalid selector: Element not found.");
      return;
    }

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const {
        pageSize = "a4", // default page size is A4
        marginTop = 30,
        marginLeft = 20,
        marginBottom = 30,
        marginRight = 20,
        fileName = "multi-page-content.pdf",
        orientation = "p", // portrait ('p') or landscape ('l')
      } = options || {};

      const doc = new jsPDF(orientation, "pt", pageSize);

      const imgData = canvas.toDataURL("image/png");

      // Get the dimensions of the PDF page
      const pdfPageWidth =
        doc.internal.pageSize.getWidth() - marginLeft - marginRight;
      const pdfPageHeight =
        doc.internal.pageSize.getHeight() - marginTop - marginBottom;

      // Calculate the scaling ratio
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / pdfPageWidth;

      const scaledCanvasHeight = canvasHeight / ratio;

      let position = 0;

      // Add each page to the PDF by slicing the canvas content
      while (position < canvasHeight) {
        const canvasPage = document.createElement("canvas");
        canvasPage.width = canvasWidth;
        canvasPage.height = Math.min(
          canvasHeight - position,
          pdfPageHeight * ratio
        );

        const ctx = canvasPage.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          position,
          canvasWidth,
          canvasPage.height,
          0,
          0,
          canvasPage.width,
          canvasPage.height
        );

        const imgDataPage = canvasPage.toDataURL("image/png");

        // Add the canvas image to the PDF
        doc.addImage(
          imgDataPage,
          "PNG",
          marginLeft,
          marginTop,
          pdfPageWidth,
          canvasPage.height / ratio // Add only the portion that fits within the PDF
        );

        position += canvasPage.height;

        // If there's more content, add a new page
        if (position < canvasHeight) {
          doc.addPage();
        }
      }

      // Save the PDF
      doc.save(fileName);
    });
  };

  return { handleDownload };
};

export default DownloadPDF;
