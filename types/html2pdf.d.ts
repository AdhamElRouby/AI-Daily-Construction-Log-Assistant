declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number; useCORS?: boolean };
    jsPDF?: { unit?: string; format?: string; orientation?: string };
  }

  interface Html2PdfInstance {
    from(element: HTMLElement): Html2PdfInstance;
    set(options: Html2PdfOptions): Html2PdfInstance;
    save(filename?: string): Promise<void>;
    toPdf(): Html2PdfInstance;
    output(type?: string): string | ArrayBuffer | Blob | undefined;
    outputPdf(type?: string): string | ArrayBuffer | Blob | undefined;
  }

  function html2pdf(): Html2PdfInstance;
  function html2pdf(element: HTMLElement): Html2PdfInstance;
  function html2pdf(
    element: HTMLElement,
    options: Html2PdfOptions
  ): Html2PdfInstance;

  export = html2pdf;
}
