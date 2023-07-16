import { CustomerResponseDto } from "../api/client";
// import { saveAs } from 'file-saver';

function downloadReport(report: any, customer: CustomerResponseDto | undefined) {
  return () => {
    const downloadFile = (data: Blob, fileName: string) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
      const reportData = report.data;
      console.log(report)
      console.log(reportData)
    const fileName = `Rapport - ${customer?.name}.xlsx`;
    downloadFile(reportData, fileName);
  };
}

export default downloadReport;
