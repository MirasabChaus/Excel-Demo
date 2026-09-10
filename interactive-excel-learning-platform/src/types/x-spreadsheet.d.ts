export {};

declare global {
  interface XSpreadsheetInstance {
    loadData(data: unknown): XSpreadsheetInstance;
    getData(): unknown[];
    cellText(
      ri: number,
      ci: number,
      text: string,
      sheetIndex?: number,
    ): XSpreadsheetInstance;
    cell(ri: number, ci: number, sheetIndex?: number): unknown;
    cellStyle(ri: number, ci: number, sheetIndex?: number): unknown;
    reRender(): XSpreadsheetInstance;
    change(cb: (data: unknown) => void): XSpreadsheetInstance;
    on(event: string, cb: (...args: unknown[]) => void): XSpreadsheetInstance;
    validate(): boolean;
    destroy?: () => void;
  }

  interface XSpreadsheetStatic {
    (
      selector: string | HTMLElement,
      options?: Record<string, unknown>,
    ): XSpreadsheetInstance;
    locale?: (lang: string, message: unknown) => void;
  }

  interface Window {
    x_spreadsheet?: XSpreadsheetStatic;
  }
}
