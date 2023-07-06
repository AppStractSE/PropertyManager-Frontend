import * as XLSX from "xlsx";

interface Chore {
  id: number;
  name: string;
  completedBy: string;
}

const PropertyManagerReport = () => {
  const generateReport = () => {
    // Mocked data for the chores
    const chores: Chore[] = [
      { id: 1, name: "Clean kitchen", completedBy: "John" },
      { id: 2, name: "Mow the lawn", completedBy: "Jane" },
      { id: 3, name: "Take out the trash", completedBy: "Alex" },
      { id: 4, name: "Vacuum the living room", completedBy: "Sarah" },
      { id: 5, name: "Water the plants", completedBy: "Michael" },
    ];

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(chores);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Chores");

    // Generate an Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Convert the buffer to a Blob
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and simulate a click to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "property_manager_report.xlsx";
    link.click();
  };

  return (
    <div>
      <button onClick={generateReport}>Download Report</button>
    </div>
  );
};

export default PropertyManagerReport;
