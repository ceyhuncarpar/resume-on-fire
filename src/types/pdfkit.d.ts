declare module '@react-pdf/pdfkit' {
  import type { PDFDocument } from 'pdfkit'
  const pdfkit: typeof PDFDocument
  export default pdfkit
}