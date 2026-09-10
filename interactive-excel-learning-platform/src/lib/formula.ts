/**
 * A tiny spreadsheet formula evaluator used to verify practice answers.
 * Supports the same subset as the embedded sheet: SUM, AVERAGE, MIN, MAX,
 * IF, AND, OR, CONCAT, arithmetic, comparisons, cell references and ranges.
 */

type Value = number | string | boolean;
type Range = { __range: true; values: Value[] };
type Result = Value | Range;

const isRange = (v: Result): v is Range =>
  typeof v === "object" && v !== null && "__range" in v;

function colIndex(col: string): number {
  let n = 0;
  for (const ch of col) {
    n = n * 26 + (ch.toUpperCase().charCodeAt(0) - 64);
  }
  return n - 1;
}

function toNumber(v: Value): number {
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function truthy(v: Value): boolean {
  return Boolean(v);
}

class Parser {
  private s: string;
  private i = 0;
  private getCell: (ri: number, ci: number) => string;
  private visiting = new Set<string>();

  constructor(formula: string, getCell: (ri: number, ci: number) => string) {
    // Strip absolute-reference markers ($) — they carry no meaning here.
    this.s = formula.replace(/\$/g, "");
    this.getCell = getCell;
  }

  private skipWs() {
    while (this.i < this.s.length && /\s/.test(this.s[this.i])) this.i += 1;
  }

  private peek(): string {
    this.skipWs();
    return this.s[this.i] ?? "";
  }

  private consume(): string {
    this.skipWs();
    return this.s[this.i++];
  }

  parse(): Result {
    const r = this.parseComparison();
    this.skipWs();
    if (this.i < this.s.length) {
      throw new Error(`Unexpected token at ${this.i}: "${this.s.slice(this.i)}"`);
    }
    return r;
  }

  private parseComparison(): Result {
    let left = this.parseAddSub();
    this.skipWs();
    let op = "";
    const c = this.peek();
    if (c === "=" || c === ">" || c === "<") {
      op = this.consume();
      const n = this.peek();
      if (op === "=" && n === "=") {
        op = "==";
        this.consume();
      } else if ((op === ">" || op === "<") && n === "=") {
        op += "=";
        this.consume();
      }
      const right = this.parseAddSub();
      left = this.compare(op, left, right);
    }
    return left;
  }

  private compare(op: string, a: Result, b: Result): Value {
    const av = isRange(a) ? a.values[0] : a;
    const bv = isRange(b) ? b.values[0] : b;
    const an = toNumber(av);
    const bn = toNumber(bv);
    const useNumbers = Number.isFinite(an) && Number.isFinite(bn);
    const left: number | string = useNumbers ? an : String(av ?? "");
    const right: number | string = useNumbers ? bn : String(bv ?? "");
    switch (op) {
      case "=":
      case "==":
        return left === right;
      case ">":
        return left > right;
      case ">=":
        return left >= right;
      case "<":
        return left < right;
      case "<=":
        return left <= right;
      case "<>":
        return left !== right;
      default:
        return false;
    }
  }

  private parseAddSub(): Result {
    let left = this.parseMulDiv();
    this.skipWs();
    while (this.peek() === "+" || this.peek() === "-") {
      const op = this.consume();
      const right = this.parseMulDiv();
      left = this.arith(op, left, right);
      this.skipWs();
    }
    return left;
  }

  private parseMulDiv(): Result {
    let left = this.parseUnary();
    this.skipWs();
    while (this.peek() === "*" || this.peek() === "/") {
      const op = this.consume();
      const right = this.parseUnary();
      left = this.arith(op, left, right);
      this.skipWs();
    }
    return left;
  }

  private parseUnary(): Result {
    this.skipWs();
    if (this.peek() === "-") {
      this.consume();
      const v = this.parseUnary();
      const n = toNumber(isRange(v) ? v.values[0] : v);
      return -n;
    }
    return this.parsePrimary();
  }

  private arith(op: string, a: Result, b: Result): Value {
    const av = isRange(a) ? a.values[0] : a;
    const bv = isRange(b) ? b.values[0] : b;
    const an = toNumber(av);
    const bn = toNumber(bv);
    switch (op) {
      case "+":
        return an + bn;
      case "-":
        return an - bn;
      case "*":
        return an * bn;
      case "/":
        return an / bn;
      default:
        return 0;
    }
  }

  private parsePrimary(): Result {
    this.skipWs();
    const c = this.peek();

    if (c === '"') {
      this.consume();
      let out = "";
      while (this.i < this.s.length && this.s[this.i] !== '"') {
        out += this.s[this.i++];
      }
      this.i += 1; // closing quote
      return out;
    }

    if (c === "(") {
      this.consume();
      const v = this.parseComparison();
      this.skipWs();
      if (this.peek() === ")") this.consume();
      return v;
    }

    if (/[0-9.]/.test(c)) {
      let num = "";
      while (this.i < this.s.length && /[0-9.]/.test(this.s[this.i])) {
        num += this.s[this.i++];
      }
      return Number(num);
    }

    if (/[A-Za-z]/.test(c)) {
      let word = "";
      while (this.i < this.s.length && /[A-Za-z]/.test(this.s[this.i])) {
        word += this.s[this.i++];
      }
      this.skipWs();
      if (this.peek() === "(") {
        return this.parseFunction(word);
      }
      if (/[0-9]/.test(this.peek())) {
        let rowStr = "";
        while (this.i < this.s.length && /[0-9]/.test(this.s[this.i])) {
          rowStr += this.s[this.i++];
        }
        const ref: [number, number] = [parseInt(rowStr, 10) - 1, colIndex(word)];
        // Handle ranges inside function arguments: A1:B5
        this.skipWs();
        if (this.peek() === ":") {
          this.consume();
          return this.parseRange(ref);
        }
        return this.evalRef(ref);
      }
      return word; // bare word (e.g. TRUE)
    }

    throw new Error(`Unexpected character "${c}"`);
  }

  private parseRange(start: [number, number]): Range {
    this.skipWs();
    let word = "";
    while (this.i < this.s.length && /[A-Za-z]/.test(this.s[this.i])) {
      word += this.s[this.i++];
    }
    let rowStr = "";
    while (this.i < this.s.length && /[0-9]/.test(this.s[this.i])) {
      rowStr += this.s[this.i++];
    }
    const end: [number, number] = [parseInt(rowStr, 10) - 1, colIndex(word)];
    const values: Value[] = [];
    const [sr, sc] = start;
    const [er, ec] = end;
    for (let r = Math.min(sr, er); r <= Math.max(sr, er); r += 1) {
      for (let cc = Math.min(sc, ec); cc <= Math.max(sc, ec); cc += 1) {
        values.push(this.evalRef([r, cc]));
      }
    }
    return { __range: true, values };
  }

  private evalRef([ri, ci]: [number, number]): Value {
    const raw = this.getCell(ri, ci) ?? "";
    if (typeof raw !== "string" || !raw.trim().startsWith("=")) {
      return raw;
    }
    const key = `${ri},${ci}`;
    if (this.visiting.has(key)) return 0;
    this.visiting.add(key);
    try {
      const sub = new Parser(raw, this.getCell);
      sub.visiting = this.visiting;
      const r = sub.parse();
      return isRange(r) ? r.values[0] : r;
    } catch {
      return 0;
    } finally {
      this.visiting.delete(key);
    }
  }

  private parseFunction(name: string): Result {
    this.consume(); // '('
    const args: Result[] = [];
    this.skipWs();
    if (this.peek() === ")") {
      this.consume();
      return this.apply(name, args);
    }
    for (;;) {
      args.push(this.parseArg());
      this.skipWs();
      const n = this.peek();
      if (n === ",") {
        this.consume();
        continue;
      }
      if (n === ")") {
        this.consume();
        break;
      }
      throw new Error(`Expected "," or ")" in ${name}`);
    }
    return this.apply(name, args);
  }

  private parseArg(): Result {
    const start = this.i;
    // Try to parse a cell reference or a range.
    this.skipWs();
    let word = "";
    while (this.i < this.s.length && /[A-Za-z]/.test(this.s[this.i])) {
      word += this.s[this.i++];
    }
    if (word && /[0-9]/.test(this.peek())) {
      let rowStr = "";
      while (this.i < this.s.length && /[0-9]/.test(this.s[this.i])) {
        rowStr += this.s[this.i++];
      }
      const ref: [number, number] = [parseInt(rowStr, 10) - 1, colIndex(word)];
      this.skipWs();
      if (this.peek() === ":") {
        this.consume();
        return this.parseRange(ref);
      }
      const n = this.peek();
      if (n === "," || n === ")" || n === "") {
        return this.evalRef(ref);
      }
    }
    this.i = start;
    return this.parseComparison();
  }

  private apply(name: string, args: Result[]): Value {
    const fn = name.toUpperCase();
    if (fn === "IF") {
      const cond = isRange(args[0]) ? args[0].values[0] : args[0];
      const t = isRange(args[1]) ? args[1].values[0] : args[1];
      const f = isRange(args[2]) ? args[2].values[0] : args[2];
      return truthy(cond) ? t : f;
    }
    const flat = args.flatMap((a) => (isRange(a) ? a.values : [a]));
    switch (fn) {
      case "SUM": {
        const nums = flat.map(toNumber).filter((n) => Number.isFinite(n));
        return nums.reduce((a, b) => a + b, 0);
      }
      case "AVERAGE": {
        const nums = flat.map(toNumber).filter((n) => Number.isFinite(n));
        if (nums.length === 0) return 0;
        return nums.reduce((a, b) => a + b, 0) / nums.length;
      }
      case "MIN": {
        const nums = flat.map(toNumber).filter((n) => Number.isFinite(n));
        return nums.length ? Math.min(...nums) : 0;
      }
      case "MAX": {
        const nums = flat.map(toNumber).filter((n) => Number.isFinite(n));
        return nums.length ? Math.max(...nums) : 0;
      }
      case "AND":
        return flat.every((v) => truthy(v));
      case "OR":
        return flat.some((v) => truthy(v));
      case "CONCAT":
        return flat.map((v) => String(v)).join("");
      default:
        throw new Error(`Unknown function ${name}`);
    }
  }
}

export function parseCellRef(ref: string): { ri: number; ci: number } {
  const m = ref.trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
  if (!m) throw new Error(`Invalid cell reference: ${ref}`);
  return { ri: parseInt(m[2], 10) - 1, ci: colIndex(m[1]) };
}

/**
 * Evaluate a cell's contents. Returns a number, string, or boolean.
 */
export function evaluateCell(
  text: string,
  getCell: (ri: number, ci: number) => string,
): Value {
  const t = (text ?? "").trim();
  if (!t.startsWith("=")) {
    const n = Number(t);
    return t !== "" && Number.isFinite(n) ? n : t;
  }
  const parser = new Parser(t.slice(1), getCell);
  const result = parser.parse();
  return isRange(result) ? result.values[0] : result;
}

/**
 * Compare a computed result against an expected string (numeric or text).
 */
export function matchesExpected(result: Value, expected: string): boolean {
  const exp = expected.trim();
  if (/^-?\d+(\.\d+)?$/.test(exp)) {
    const got = toNumber(result);
    const want = Number(exp);
    if (Number.isFinite(got) && Number.isFinite(want)) {
      return Math.abs(got - want) < 0.001;
    }
    return false;
  }
  return String(result ?? "").trim().toLowerCase() === exp.toLowerCase();
}
