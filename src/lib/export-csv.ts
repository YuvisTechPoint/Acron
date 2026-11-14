/**
 * Utility for RFC 4180 compliant CSV export in the browser.
 * Includes UTF-8 BOM (\uFEFF) for seamless opening in Microsoft Excel and LibreOffice Calc.
 */
export function downloadCsv(filename: string, headers: string[], rows: (string | number | boolean | null | undefined)[][]): void {
  if (typeof window === "undefined") return;

  const escapeCell = (val: string | number | boolean | null | undefined): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const headerRow = headers.map(escapeCell).join(",");
  const bodyRows = rows.map((r) => r.map(escapeCell).join(","));
  const csvContent = "\uFEFF" + [headerRow, ...bodyRows].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
