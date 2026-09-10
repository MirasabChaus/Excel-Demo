import "dotenv/config";
import { db } from "@/db";
import { modules, lessons, type DemoData } from "@/db/schema";

type LessonSeed = {
  slug: string;
  title: string;
  summary: string;
  durationMin: number;
  videoId: string;
  videoStart?: number;
  keyPoints: string[];
  formula: string;
  formulaExplain: string;
  demo: DemoData;
  task: string;
  taskData: string[][];
  taskTarget: string;
  taskExpected: string;
};

type ModuleSeed = {
  slug: string;
  title: string;
  level: string;
  tagline: string;
  description: string;
  order: number;
  icon: string;
  accent: string;
  lessons: LessonSeed[];
};

const V = {
  beginner: "Ai0MV7twEBE", // Excel Tutorial for Beginners (Start Here)
  formulas: "Y8xhrUa3KH4", // Excel Formulas and Functions | Full Course
  pivot: "PdJzy956wo4", // How to Create Pivot Tables in Excel
  pivotAdvanced: "dvbLrwD2SpA", // Pivot Table Excel | Step-by-Step
  charts: "eHtZrIb0oWY", // Excel Charts and Graphs Tutorial
  condFormat: "Jp29JYGq5Hw", // Conditional Formatting in Excel Tutorial
};

const SEED: ModuleSeed[] = [
  {
    slug: "foundations",
    title: "Excel Foundations",
    level: "Beginner",
    tagline: "Start from zero",
    description:
      "Get comfortable inside Excel. Learn the interface, how to enter data, navigate the grid, format cells, and run your very first formulas.",
    order: 1,
    icon: "🌱",
    accent: "#16a34a",
    lessons: [
      {
        slug: "excel-interface",
        title: "The Excel Interface & Ribbon",
        summary:
          "Tour the workbook, worksheet, ribbon, formula bar and grid so you always know where you are.",
        durationMin: 7,
        videoId: V.beginner,
        keyPoints: ["Workbook vs worksheet", "Ribbon, tabs & quick access toolbar", "Name box and formula bar", "Columns (letters), rows (numbers), cells"],
        formula: "=A1+B1",
        formulaExplain:
          "Every formula starts with an equals sign. This one adds whatever number is in cell A1 to the number in cell B1 and shows the result where you typed it.",
        demo: {
          beforeTitle: "Two numbers in cells",
          beforeHeaders: ["Value 1 (A1)", "Value 2 (B1)"],
          beforeRows: [[100, 50]],
          afterTitle: "Formula in C1",
          afterHeaders: ["Value 1 (A1)", "Value 2 (B1)", "Total (=A1+B1)"],
          afterRows: [[100, 50, 150]],
          steps: [
            "Click cell A1 and type 100, then press Enter.",
            "Click cell B1 and type 50, then press Enter.",
            "Click cell C1 and type =A1+B1.",
            "Press Enter — Excel instantly shows 150.",
          ],
        },
        task: "In the sheet below, type the formula =A1+B1 into cell C1 to add the two numbers together.",
        taskData: [["100", "50", ""]],
        taskTarget: "C1",
        taskExpected: "150",
      },
      {
        slug: "cells-references",
        title: "Cells, Rows, Columns & References",
        summary:
          "Understand the A1 reference style — the coordinate system every formula uses.",
        durationMin: 6,
        videoId: V.beginner,
        keyPoints: ["Cell = column letter + row number", "A range is written A1:B5", "Formulas reference cells, not just values", "Change a value → formulas update"],
        formula: "=A2*B2",
        formulaExplain:
          "Multiply the price in A2 by the quantity in B2. Because we reference the cells, editing the price automatically updates the total.",
        demo: {
          beforeTitle: "A price and a quantity",
          beforeHeaders: ["Price (A2)", "Qty (B2)"],
          beforeRows: [[5, 10]],
          afterTitle: "Multiply with a reference",
          afterHeaders: ["Price (A2)", "Qty (B2)", "Total (=A2*B2)"],
          afterRows: [[5, 10, 50]],
          steps: [
            "Type 5 in A2 and 10 in B2.",
            "In C2 enter =A2*B2 and press Enter.",
            "Now change A2 to 8 — C2 recalculates to 80 instantly.",
          ],
        },
        task: "Enter =A2*B2 into cell C2 to calculate the total cost.",
        taskData: [
          ["Price", "Qty", "Total"],
          ["5", "10", ""],
        ],
        taskTarget: "C2",
        taskExpected: "50",
      },
      {
        slug: "data-types",
        title: "Entering & Editing Data Types",
        summary: "Numbers, text, dates and times — and how Excel tells them apart.",
        durationMin: 6,
        videoId: V.beginner,
        keyPoints: ["Numbers right-align, text left-aligns", "Dates and times are really numbers", "Edit with F2 or double-click", "Use fill handle to continue series"],
        formula: "=A2-B2",
        formulaExplain:
          "Subtract the cost in B2 from the revenue in A2 to work out profit. Numbers make arithmetic possible; text would just be joined.",
        demo: {
          beforeTitle: "Revenue and cost",
          beforeHeaders: ["Revenue (A2)", "Cost (B2)"],
          beforeRows: [[250, 90]],
          afterTitle: "Profit formula",
          afterHeaders: ["Revenue (A2)", "Cost (B2)", "Profit (=A2-B2)"],
          afterRows: [[250, 90, 160]],
          steps: [
            "Enter 250 in A2 and 90 in B2.",
            "In C2 type =A2-B2.",
            "Excel shows 160 — the profit.",
          ],
        },
        task: "Enter =A2-B2 into cell C2 to calculate the profit.",
        taskData: [
          ["Revenue", "Cost", "Profit"],
          ["250", "90", ""],
        ],
        taskTarget: "C2",
        taskExpected: "160",
      },
      {
        slug: "formatting",
        title: "Formatting & Number Styles",
        summary: "Make data readable with currency, percentage, fonts and colors.",
        durationMin: 7,
        videoId: V.beginner,
        keyPoints: ["Currency, percent & comma styles", "Bold, fill color & borders", "Column width & row height", "Format doesn't change the value"],
        formula: "=A2*B2",
        formulaExplain:
          "Compute total price by multiplying quantity by unit price, then apply a currency format so it reads like money.",
        demo: {
          beforeTitle: "Quantity and unit price",
          beforeHeaders: ["Qty (A2)", "Unit Price (B2)"],
          beforeRows: [[3, 19.99]],
          afterTitle: "Total with currency format",
          afterHeaders: ["Qty (A2)", "Unit Price (B2)", "Total (=A2*B2)"],
          afterRows: [[3, 19.99, "$59.97"]],
          steps: [
            "Enter 3 in A2 and 19.99 in B2.",
            "In C2 type =A2*B2 → 59.97.",
            "Select C2 and apply the Currency format from the Home tab.",
          ],
        },
        task: "Enter =A2*B2 into cell C2 to get the total price.",
        taskData: [
          ["Qty", "Unit Price", "Total"],
          ["3", "19.99", ""],
        ],
        taskTarget: "C2",
        taskExpected: "59.97",
      },
      {
        slug: "autosum",
        title: "AutoSum & Basic Arithmetic",
        summary: "Total a column in one click and meet the SUM function.",
        durationMin: 8,
        videoId: V.formulas,
        videoStart: 120,
        keyPoints: ["AutoSum (Alt + =) totals a range", "=SUM(B2:B6) adds a range", "Use + - * / for arithmetic", "Watch the formula bar while selecting"],
        formula: "=SUM(B2:B6)",
        formulaExplain:
          "SUM adds every number in the range B2 to B6. The colon means 'from B2 through B6'. This is the single most-used formula in Excel.",
        demo: {
          beforeTitle: "Monthly sales",
          beforeHeaders: ["Month", "Sales"],
          beforeRows: [["Jan", 120], ["Feb", 90], ["Mar", 150], ["Apr", 110], ["May", 130]],
          afterTitle: "Add a Total row",
          afterHeaders: ["Month", "Sales"],
          afterRows: [["Jan", 120], ["Feb", 90], ["Mar", 150], ["Apr", 110], ["May", 130], ["Total", 600]],
          steps: [
            "Select the numbers in B2:B6.",
            "Press Alt + = (AutoSum) or type =SUM(B2:B6).",
            "Excel inserts the total 600 instantly.",
          ],
        },
        task: "Enter =SUM(B2:B6) into cell B7 to total the sales column.",
        taskData: [
          ["Month", "Sales"],
          ["Jan", "120"],
          ["Feb", "90"],
          ["Mar", "150"],
          ["Apr", "110"],
          ["May", "130"],
          ["Total", ""],
        ],
        taskTarget: "B7",
        taskExpected: "600",
      },
      {
        slug: "shortcuts",
        title: "Keyboard Shortcuts & Speed",
        summary: "The shortcuts pros use every day to fly around the grid.",
        durationMin: 5,
        videoId: V.beginner,
        keyPoints: ["Ctrl + arrows to jump to edges", "Ctrl + Shift + arrows to select", "Ctrl + C / X / V copy, cut, paste", "Ctrl + Z / Y undo and redo"],
        formula: "=AVERAGE(B2:B6)",
        formulaExplain:
          "AVERAGE returns the mean of a range. It is SUM of the values divided by the count of the values.",
        demo: {
          beforeTitle: "Test scores",
          beforeHeaders: ["Student", "Score"],
          beforeRows: [["Ana", 88], ["Ben", 92], ["Cal", 76], ["Dee", 81], ["Eli", 95]],
          afterTitle: "Average score",
          afterHeaders: ["Student", "Score"],
          afterRows: [["Ana", 88], ["Ben", 92], ["Cal", 76], ["Dee", 81], ["Eli", 95], ["Average", 86.4]],
          steps: [
            "Select the scores B2:B6.",
            "Type =AVERAGE(B2:B6).",
            "The average 86.4 appears.",
          ],
        },
        task: "Enter =AVERAGE(B2:B6) into cell B7 to find the average score.",
        taskData: [
          ["Student", "Score"],
          ["Ana", "88"],
          ["Ben", "92"],
          ["Cal", "76"],
          ["Dee", "81"],
          ["Eli", "95"],
          ["Average", ""],
        ],
        taskTarget: "B7",
        taskExpected: "86.4",
      },
    ],
  },
  {
    slug: "formulas-functions",
    title: "Formulas & Functions",
    level: "Beginner–Intermediate",
    tagline: "The heart of Excel",
    description:
      "Master the logic that makes Excel powerful: order of operations, references, conditional logic, and the functions you'll use every day.",
    order: 2,
    icon: "🧮",
    accent: "#2563eb",
    lessons: [
      {
        slug: "formula-basics",
        title: "Formula Anatomy & Order of Operations",
        summary: "Build multi-step formulas and control how Excel calculates them.",
        durationMin: 8,
        videoId: V.formulas,
        videoStart: 45,
        keyPoints: ["Every formula begins with =", "PEMDAS: Parentheses, Exponents, Multiply/Divide, Add/Subtract", "Use parentheses to control order", "References vs hard-coded numbers"],
        formula: "=(A2*B2)+C2",
        formulaExplain:
          "Parentheses force multiplication to happen first, then the shipping fee in C2 is added. Without parentheses the result would differ.",
        demo: {
          beforeTitle: "Units, price and a fee",
          beforeHeaders: ["Units (A2)", "Price (B2)", "Fee (C2)"],
          beforeRows: [[4, 25, 10]],
          afterTitle: "Total with parentheses",
          afterHeaders: ["Units (A2)", "Price (B2)", "Fee (C2)", "Total (=(A2*B2)+C2)"],
          afterRows: [[4, 25, 10, 110]],
          steps: [
            "4 × 25 = 100 (parentheses go first).",
            "Then 100 + 10 = 110.",
            "The parentheses make the order explicit and readable.",
          ],
        },
        task: "Enter =(A2*B2)+C2 into cell D2 to calculate the grand total.",
        taskData: [
          ["Units", "Price", "Fee", "Total"],
          ["4", "25", "10", ""],
        ],
        taskTarget: "D2",
        taskExpected: "110",
      },
      {
        slug: "relative-absolute",
        title: "Relative vs Absolute References ($)",
        summary: "Lock a cell with the dollar sign so it stays put when you copy.",
        durationMin: 8,
        videoId: V.formulas,
        keyPoints: ["Relative: A1 changes as you copy", "Absolute: $A$1 never changes", "F4 toggles reference types", "Mixed: $A1 or A$1"],
        formula: "=A3*$B$1",
        formulaExplain:
          "The price in A3 is relative, but the tax rate in B1 is locked with $ signs. Copy the formula down and the tax reference never drifts.",
        demo: {
          beforeTitle: "A fixed tax rate in B1",
          beforeHeaders: ["Tax rate (B1)", "Price", "Total"],
          beforeRows: [[0.1, 100, 110], ["", 250, 275]],
          afterTitle: "Copy the formula down",
          afterHeaders: ["Tax rate (B1)", "Price", "Total"],
          afterRows: [[0.1, 100, "=A3*$B$1"], ["", 250, "=A4*$B$1"]],
          steps: [
            "Store the tax rate once in B1.",
            "Use =A3*$B$1 so B1 is locked.",
            "Drag the formula down — B1 stays, A3 becomes A4.",
          ],
        },
        task: "In B3 enter =A3*$B$1 and in B4 enter =A4*$B$1 to apply the locked tax rate.",
        taskData: [
          ["Tax rate", "0.1"],
          ["Price", "Total"],
          ["100", ""],
          ["250", ""],
        ],
        taskTarget: "B3",
        taskExpected: "10",
      },
      {
        slug: "sum-average-min-max",
        title: "SUM, AVERAGE, MIN & MAX",
        summary: "The four aggregate functions that summarize any dataset.",
        durationMin: 8,
        videoId: V.formulas,
        videoStart: 1448,
        keyPoints: ["SUM totals a range", "AVERAGE returns the mean", "MIN and MAX find extremes", "Select a range to see stats in the status bar"],
        formula: "=SUM(B2:B6)",
        formulaExplain:
          "SUM is the workhorse. AVERAGE, MIN and MAX work the same way — point them at a range and get one number back.",
        demo: {
          beforeTitle: "Five months of sales",
          beforeHeaders: ["Month", "Sales"],
          beforeRows: [["Jan", 120], ["Feb", 90], ["Mar", 150], ["Apr", 110], ["May", 130]],
          afterTitle: "One-row summary",
          afterHeaders: ["Stat", "Value"],
          afterRows: [["SUM", 600], ["AVERAGE", 120], ["MIN", 90], ["MAX", 150]],
          steps: [
            "=SUM(B2:B6) → 600.",
            "=AVERAGE(B2:B6) → 120.",
            "=MIN(B2:B6) → 90 and =MAX(B2:B6) → 150.",
          ],
        },
        task: "Enter =SUM(B2:B6) into cell B7 for the total, then try AVERAGE, MIN and MAX below it.",
        taskData: [
          ["Month", "Sales"],
          ["Jan", "120"],
          ["Feb", "90"],
          ["Mar", "150"],
          ["Apr", "110"],
          ["May", "130"],
          ["Total", ""],
        ],
        taskTarget: "B7",
        taskExpected: "600",
      },
      {
        slug: "if-function",
        title: "IF & Conditional Logic",
        summary: "Make Excel decide for you with the IF function.",
        durationMin: 9,
        videoId: V.formulas,
        keyPoints: ["IF(condition, if-true, if-false)", "Comparisons: > < = >= <=", "Text results go in quotes", "Nest IFs for more branches"],
        formula: '=IF(B2>=60,"Pass","Fail")',
        formulaExplain:
          "IF checks whether the score in B2 is at least 60. If yes it returns Pass, otherwise Fail. The text values must be wrapped in double quotes.",
        demo: {
          beforeTitle: "Exam scores",
          beforeHeaders: ["Student", "Score"],
          beforeRows: [["Ana", 78], ["Ben", 52], ["Cal", 63]],
          afterTitle: "Add a Result column",
          afterHeaders: ["Student", "Score", "Result"],
          afterRows: [["Ana", 78, "Pass"], ["Ben", 52, "Fail"], ["Cal", 63, "Pass"]],
          steps: [
            "In C2 type =IF(B2>=60,\"Pass\",\"Fail\").",
            "Ana's 78 → Pass, Ben's 52 → Fail.",
            "Drag the formula down for the rest.",
          ],
        },
        task: 'Enter =IF(B2>=60,"Pass","Fail") into cell C2 to grade the first score.',
        taskData: [
          ["Student", "Score", "Result"],
          ["Ana", "78", ""],
          ["Ben", "52", ""],
          ["Cal", "63", ""],
        ],
        taskTarget: "C2",
        taskExpected: "Pass",
      },
      {
        slug: "and-or",
        title: "AND / OR with IF",
        summary: "Test multiple conditions at once inside a single formula.",
        durationMin: 9,
        videoId: V.formulas,
        keyPoints: ["AND() — every condition must be true", "OR() — at least one must be true", "Wrap them inside IF", "Nested IFs for multi-level rules"],
        formula: '=IF(AND(A2>=50,B2>=50),"Pass","Fail")',
        formulaExplain:
          "AND requires both the midterm (A2) and final (B2) to be at least 50 for a Pass. Swap AND for OR to pass when either score qualifies.",
        demo: {
          beforeTitle: "Midterm and final scores",
          beforeHeaders: ["Midterm (A)", "Final (B)"],
          beforeRows: [[45, 70], [60, 65], [80, 40]],
          afterTitle: "Pass only when both ≥ 50",
          afterHeaders: ["Midterm (A)", "Final (B)", "Result"],
          afterRows: [[45, 70, "Fail"], [60, 65, "Pass"], [80, 40, "Fail"]],
          steps: [
            "=IF(AND(A2>=50,B2>=50),\"Pass\",\"Fail\").",
            "Row 2: 45 < 50 → Fail even though final is 70.",
            "Row 4: 40 < 50 → Fail even though midterm is 80.",
          ],
        },
        task: 'Enter =IF(AND(A2>=50,B2>=50),"Pass","Fail") into cell C2.',
        taskData: [
          ["Midterm", "Final", "Result"],
          ["45", "70", ""],
          ["60", "65", ""],
          ["80", "40", ""],
        ],
        taskTarget: "C2",
        taskExpected: "Fail",
      },
      {
        slug: "concat-text",
        title: "CONCAT & Text Formulas",
        summary: "Join text from cells and build clean strings.",
        durationMin: 7,
        videoId: V.formulas,
        videoStart: 1886,
        keyPoints: ["CONCAT joins values", "Add spaces or punctuation between parts", "& also concatenates", "Combine text with numbers"],
        formula: '=CONCAT(A2," ",B2)',
        formulaExplain:
          "CONCAT glues the first name in A2, a literal space (\" \"), and the last name in B2 into a single full name.",
        demo: {
          beforeTitle: "First and last names",
          beforeHeaders: ["First", "Last"],
          beforeRows: [["Ada", "Lovelace"], ["Alan", "Turing"]],
          afterTitle: "Full name column",
          afterHeaders: ["First", "Last", "Full name"],
          afterRows: [["Ada", "Lovelace", "Ada Lovelace"], ["Alan", "Turing", "Alan Turing"]],
          steps: [
            "In C2 type =CONCAT(A2,\" \",B2).",
            "The space between the quotes becomes a real space.",
            "Copy down for the rest.",
          ],
        },
        task: 'Enter =CONCAT(A2," ",B2) into cell C2 to build the full name.',
        taskData: [
          ["First", "Last", "Full name"],
          ["Ada", "Lovelace", ""],
          ["Alan", "Turing", ""],
        ],
        taskTarget: "C2",
        taskExpected: "Ada Lovelace",
      },
    ],
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    level: "Intermediate",
    tagline: "Turn data into decisions",
    description:
      "Sort, filter, highlight and visualize. Learn conditional formatting, charts, tables, lookups and pivot tables — the analyst's toolkit.",
    order: 3,
    icon: "📊",
    accent: "#7c3aed",
    lessons: [
      {
        slug: "sort-filter",
        title: "Sorting & Filtering",
        summary: "Reorder and narrow data to surface what actually matters.",
        durationMin: 8,
        videoId: V.beginner,
        keyPoints: ["Sort A→Z, Z→A or custom", "AutoFilter adds dropdown arrows", "Filter by value, text or color", "Clear filters to restore view"],
        formula: "=MAX(B2:B6)",
        formulaExplain:
          "Before sorting, use MAX to find the top value. Sorting then shows the same insight visually.",
        demo: {
          beforeTitle: "Unsorted product sales",
          beforeHeaders: ["Product", "Sales"],
          beforeRows: [["Pens", 210], ["Mugs", 420], ["Pads", 90], ["Bags", 340], ["Keys", 150]],
          afterTitle: "Sorted high to low",
          afterHeaders: ["Product", "Sales"],
          afterRows: [["Mugs", 420], ["Bags", 340], ["Pens", 210], ["Keys", 150], ["Pads", 90]],
          steps: [
            "Select any cell in the data.",
            "Data tab → Sort largest to smallest.",
            "Mugs (420) is now at the top — the clear winner.",
          ],
        },
        task: "Enter =MAX(B2:B6) into cell B7 to find the highest sales value.",
        taskData: [
          ["Product", "Sales"],
          ["Pens", "210"],
          ["Mugs", "420"],
          ["Pads", "90"],
          ["Bags", "340"],
          ["Keys", "150"],
          ["Best", ""],
        ],
        taskTarget: "B7",
        taskExpected: "420",
      },
      {
        slug: "conditional-formatting",
        title: "Conditional Formatting",
        summary: "Automatically color cells based on their value.",
        durationMin: 8,
        videoId: V.condFormat,
        keyPoints: ["Highlight cells rules", "Color scales & data bars", "Top/bottom rules", "Formula-based custom rules"],
        formula: '=IF(B2>100,"High","Normal")',
        formulaExplain:
          "Conditional formatting applies the same kind of logic as this IF — it evaluates each cell and applies a style when the condition is true.",
        demo: {
          beforeTitle: "Sales per region",
          beforeHeaders: ["Region", "Sales"],
          beforeRows: [["North", 130], ["South", 85], ["East", 160], ["West", 95]],
          afterTitle: "Flag values over 100",
          afterHeaders: ["Region", "Sales", "Flag"],
          afterRows: [["North", 130, "High"], ["South", 85, "Normal"], ["East", 160, "High"], ["West", 95, "Normal"]],
          steps: [
            "Select the Sales range.",
            "Home → Conditional Formatting → Highlight Cells → Greater Than 100.",
            "Every cell above 100 is instantly highlighted.",
          ],
        },
        task: 'Enter =IF(B2>100,"High","Normal") into cell C2 to flag the first region.',
        taskData: [
          ["Region", "Sales", "Flag"],
          ["North", "130", ""],
          ["South", "85", ""],
          ["East", "160", ""],
          ["West", "95", ""],
        ],
        taskTarget: "C2",
        taskExpected: "High",
      },
      {
        slug: "charts",
        title: "Charts & Graphs",
        summary: "Visualize data with column, line and pie charts.",
        durationMin: 9,
        videoId: V.charts,
        keyPoints: ["Select data → Insert chart (Alt+F1)", "Column, line, pie & bar types", "Chart titles, axes & legends", "Sparklines for tiny in-cell charts"],
        formula: "=SUM(B2:B6)",
        formulaExplain:
          "Charts read from the same numbers your formulas compute. Total the revenue first, then chart it.",
        demo: {
          beforeTitle: "Monthly revenue",
          beforeHeaders: ["Month", "Revenue"],
          beforeRows: [["Jan", 1200], ["Feb", 980], ["Mar", 1500], ["Apr", 1350], ["May", 1700]],
          afterTitle: "Total before charting",
          afterHeaders: ["Month", "Revenue"],
          afterRows: [["Jan", 1200], ["Feb", 980], ["Mar", 1500], ["Apr", 1350], ["May", 1700], ["Total", 6730]],
          steps: [
            "Total the column with =SUM(B2:B6).",
            "Select the data and press Alt + F1.",
            "A column chart appears instantly — style it from Chart Design.",
          ],
        },
        task: "Enter =SUM(B2:B6) into cell B7 to total the revenue before charting.",
        taskData: [
          ["Month", "Revenue"],
          ["Jan", "1200"],
          ["Feb", "980"],
          ["Mar", "1500"],
          ["Apr", "1350"],
          ["May", "1700"],
          ["Total", ""],
        ],
        taskTarget: "B7",
        taskExpected: "6730",
      },
      {
        slug: "tables",
        title: "Excel Tables & Structured Data",
        summary: "Convert ranges into Tables with automatic filtering and styling.",
        durationMin: 8,
        videoId: V.beginner,
        keyPoints: ["Ctrl + T creates a Table", "Auto-expanding ranges", "Sort & filter headers built in", "Structured references like [Sales]"],
        formula: "=AVERAGE(B2:B6)",
        formulaExplain:
          "In a Table, this becomes =AVERAGE(Table1[Score]) — a structured reference that always covers the whole column.",
        demo: {
          beforeTitle: "A plain range",
          beforeHeaders: ["Student", "Score"],
          beforeRows: [["Ana", 88], ["Ben", 92], ["Cal", 76], ["Dee", 81], ["Eli", 95]],
          afterTitle: "Converted to a Table",
          afterHeaders: ["Student", "Score"],
          afterRows: [["Ana", 88], ["Ben", 92], ["Cal", 76], ["Dee", 81], ["Eli", 95], ["Average", 86.4]],
          steps: [
            "Click inside the data and press Ctrl + T.",
            "Excel adds filters and a style automatically.",
            "New rows are included in the table instantly.",
          ],
        },
        task: "Enter =AVERAGE(B2:B6) into cell B7 to compute the average score.",
        taskData: [
          ["Student", "Score"],
          ["Ana", "88"],
          ["Ben", "92"],
          ["Cal", "76"],
          ["Dee", "81"],
          ["Eli", "95"],
          ["Average", ""],
        ],
        taskTarget: "B7",
        taskExpected: "86.4",
      },
      {
        slug: "vlookup-xlookup",
        title: "VLOOKUP & XLOOKUP",
        summary: "Pull a matching value from a table — the #1 lookup skill.",
        durationMin: 10,
        videoId: V.formulas,
        videoStart: 2732,
        keyPoints: ["XLOOKUP(lookup, search, return)", "VLOOKUP(lookup, table, column, false)", "XLOOKUP searches both directions", "if_not_found for clean errors"],
        formula: "=XLOOKUP(A8,A2:A6,B2:B6)",
        formulaExplain:
          "XLOOKUP searches the code in A8 against the code column A2:A6 and returns the matching product from B2:B6. It's the modern, easier replacement for VLOOKUP.",
        demo: {
          beforeTitle: "Product catalog",
          beforeHeaders: ["Code", "Product", "Price"],
          beforeRows: [[101, "Apple", 1.2], [102, "Banana", 0.8], [103, "Cherry", 2.5], [104, "Date", 1.8], [105, "Elderberry", 3.2]],
          afterTitle: "Look up code 102",
          afterHeaders: ["Lookup", "Result"],
          afterRows: [[102, "Banana"]],
          steps: [
            "=XLOOKUP(102, A2:A6, B2:B6) → Banana.",
            "Change 102 to 104 → Date.",
            "No more counting columns like VLOOKUP requires.",
          ],
        },
        task: 'Enter =IF(C2>=2,"Premium","Standard") into cell D2 to classify the first product by price.',
        taskData: [
          ["Code", "Product", "Price", "Tier"],
          ["101", "Apple", "1.2", ""],
          ["102", "Banana", "0.8", ""],
          ["103", "Cherry", "2.5", ""],
        ],
        taskTarget: "D2",
        taskExpected: "Standard",
      },
      {
        slug: "pivot-tables",
        title: "Pivot Tables",
        summary: "Summarize thousands of rows by dragging and dropping fields.",
        durationMin: 11,
        videoId: V.pivot,
        keyPoints: ["Insert → PivotTable", "Drag fields to Rows, Columns & Values", "Summarize by sum, average, count", "Slicers & timelines for interactivity"],
        formula: "=SUM(B2:B7)",
        formulaExplain:
          "A pivot table does this sum automatically per group. Here we total the raw sales column before pivoting.",
        demo: {
          beforeTitle: "Raw sales rows",
          beforeHeaders: ["Region", "Sales"],
          beforeRows: [["North", 100], ["South", 80], ["North", 120], ["East", 140], ["South", 60], ["East", 110]],
          afterTitle: "Pivot summary by region",
          afterHeaders: ["Region", "Total Sales"],
          afterRows: [["North", 220], ["South", 140], ["East", 250]],
          steps: [
            "Select the data → Insert → PivotTable.",
            "Drag Region to Rows and Sales to Values.",
            "Excel aggregates each region automatically.",
          ],
        },
        task: "Enter =SUM(B2:B7) into cell B8 to total all sales before pivoting.",
        taskData: [
          ["Region", "Sales"],
          ["North", "100"],
          ["South", "80"],
          ["North", "120"],
          ["East", "140"],
          ["South", "60"],
          ["East", "110"],
          ["Total", ""],
        ],
        taskTarget: "B8",
        taskExpected: "610",
      },
    ],
  },
  {
    slug: "advanced-excel",
    title: "Advanced Excel",
    level: "Advanced",
    tagline: "Level up to pro",
    description:
      "Go beyond the basics with INDEX/MATCH, dynamic arrays, what-if analysis, Power Query, macros, and a full dashboard capstone.",
    order: 4,
    icon: "🚀",
    accent: "#e11d48",
    lessons: [
      {
        slug: "index-match",
        title: "INDEX & MATCH",
        summary: "A flexible lookup combo that beats VLOOKUP for any direction.",
        durationMin: 10,
        videoId: V.formulas,
        keyPoints: ["MATCH finds a position", "INDEX returns a value by position", "Look up left, right, up or down", "Combine for two-way lookups"],
        formula: "=INDEX(B2:B6,MATCH(A8,A2:A6,0))",
        formulaExplain:
          "MATCH locates the row where the code in A8 appears, then INDEX returns the product from that same row in B2:B6.",
        demo: {
          beforeTitle: "Catalog",
          beforeHeaders: ["Code", "Product"],
          beforeRows: [[101, "Apple"], [102, "Banana"], [103, "Cherry"], [104, "Date"], [105, "Elderberry"]],
          afterTitle: "Two-way lookup for code 104",
          afterHeaders: ["Lookup", "Result"],
          afterRows: [[104, "Date"]],
          steps: [
            "MATCH(104, A2:A6, 0) → 4 (4th row).",
            "INDEX(B2:B6, 4) → Date.",
            "Works even when the return column is to the left.",
          ],
        },
        task: "Enter =MAX(B2:B6) into cell B7 to find the highest value in the column.",
        taskData: [
          ["Item", "Value"],
          ["A", "15"],
          ["B", "42"],
          ["C", "28"],
          ["D", "37"],
          ["E", "19"],
          ["Best", ""],
        ],
        taskTarget: "B7",
        taskExpected: "42",
      },
      {
        slug: "what-if",
        title: "What-If Analysis & Goal Seek",
        summary: "Ask 'what if?' and let Excel solve for the answer.",
        durationMin: 9,
        videoId: V.formulas,
        keyPoints: ["Scenario Manager for side-by-side cases", "Goal Seek solves for an input", "Data Tables vary one or two inputs", "Sensitivity analysis"],
        formula: "=A2*B2*(1-C2)",
        formulaExplain:
          "Net revenue = price × units × (1 − discount). Change any input and the result updates — that's the essence of what-if modeling.",
        demo: {
          beforeTitle: "Price, units and a discount",
          beforeHeaders: ["Price (A2)", "Units (B2)", "Discount (C2)"],
          beforeRows: [[40, 25, 0.1]],
          afterTitle: "Net revenue",
          afterHeaders: ["Price (A2)", "Units (B2)", "Discount (C2)", "Net (=A2*B2*(1-C2))"],
          afterRows: [[40, 25, 0.1, 900]],
          steps: [
            "40 × 25 = 1000 gross.",
            "1000 × (1 − 0.1) = 900 net.",
            "Use Goal Seek to find the price that hits a target of 1200.",
          ],
        },
        task: "Enter =A2*B2*(1-C2) into cell D2 to calculate net revenue.",
        taskData: [
          ["Price", "Units", "Discount", "Net"],
          ["40", "25", "0.1", ""],
        ],
        taskTarget: "D2",
        taskExpected: "900",
      },
      {
        slug: "dynamic-arrays",
        title: "Dynamic Arrays (Modern Excel)",
        summary: "UNIQUE, FILTER and SORT spill results automatically.",
        durationMin: 9,
        videoId: V.beginner,
        keyPoints: ["UNIQUE removes duplicates", "FILTER returns matching rows", "SORT orders a range", "Spill ranges with the # operator"],
        formula: "=UNIQUE(B2:B7)",
        formulaExplain:
          "One formula returns a whole list of unique regions and 'spills' into the cells below. No copying needed.",
        demo: {
          beforeTitle: "Regions with duplicates",
          beforeHeaders: ["Region"],
          beforeRows: [["North"], ["South"], ["North"], ["East"], ["South"], ["East"]],
          afterTitle: "=UNIQUE() result",
          afterHeaders: ["Unique Region"],
          afterRows: [["North"], ["South"], ["East"]],
          steps: [
            "Type =UNIQUE(B2:B7).",
            "Excel spills North, South, East below.",
            "The result auto-updates as data changes.",
          ],
        },
        task: 'Enter =IF(OR(A2="North",A2="South"),"Core","Other") into cell B2 to classify the region.',
        taskData: [
          ["Region", "Zone"],
          ["North", ""],
          ["East", ""],
          ["South", ""],
        ],
        taskTarget: "B2",
        taskExpected: "Core",
      },
      {
        slug: "power-query",
        title: "Power Query & Power Pivot",
        summary: "Clean, combine and model big data without formulas.",
        durationMin: 10,
        videoId: V.beginner,
        keyPoints: ["Get & Transform = Power Query", "Remove duplicates, split columns", "Merge and append queries", "Power Pivot for data models"],
        formula: "=SUM(B2:B6)",
        formulaExplain:
          "Power Query cleans the data; a plain SUM (or a measure in Power Pivot) then totals the clean column.",
        demo: {
          beforeTitle: "Raw amounts with blanks",
          beforeHeaders: ["Item", "Amount"],
          beforeRows: [["A", 100], ["B", 250], ["C", ""], ["D", 180], ["E", 90]],
          afterTitle: "Cleaned and totaled",
          afterHeaders: ["Item", "Amount"],
          afterRows: [["A", 100], ["B", 250], ["D", 180], ["E", 90], ["Total", 620]],
          steps: [
            "Load the data into Power Query.",
            "Filter out blank Amount rows.",
            "Close & Load — then =SUM gives 620.",
          ],
        },
        task: "Enter =SUM(B2:B5) into cell B6 to total the cleaned amounts.",
        taskData: [
          ["Item", "Amount"],
          ["A", "100"],
          ["B", "250"],
          ["D", "180"],
          ["E", "90"],
          ["Total", ""],
        ],
        taskTarget: "B6",
        taskExpected: "620",
      },
      {
        slug: "macros-vba",
        title: "Macros & VBA Basics",
        summary: "Automate repetitive tasks by recording macros and reading VBA.",
        durationMin: 10,
        videoId: V.formulas,
        keyPoints: ["Record a macro (View → Macros)", "Run with a button or shortcut", "Read/edit VBA in the editor", "Absolute vs relative macro recording"],
        formula: '=CONCAT(A2,"!")',
        formulaExplain:
          "Small formulas can also automate text. Macros extend that idea to multi-step actions you record once and replay forever.",
        demo: {
          beforeTitle: "Task list",
          beforeHeaders: ["Task"],
          beforeRows: [["Send report"], ["Update tracker"], ["Email team"]],
          afterTitle: "Auto-appended reminder",
          afterHeaders: ["Task", "Reminder"],
          afterRows: [["Send report", "Send report!"], ["Update tracker", "Update tracker!"], ["Email team", "Email team!"]],
          steps: [
            "Record a macro that formats and adds the reminder column.",
            "Stop recording and assign it to a button.",
            "Run the macro any time to repeat the steps.",
          ],
        },
        task: 'Enter =CONCAT(A2,"!") into cell B2 to build the reminder for the first task.',
        taskData: [
          ["Task", "Reminder"],
          ["Send report", ""],
          ["Update tracker", ""],
        ],
        taskTarget: "B2",
        taskExpected: "Send report!",
      },
      {
        slug: "dashboard-capstone",
        title: "Build a Dashboard (Capstone)",
        summary: "Combine SUM, AVERAGE, IF and charts into a working dashboard.",
        durationMin: 12,
        videoId: V.pivotAdvanced,
        keyPoints: ["KPIs with SUM/AVERAGE/MAX", "IF for status flags", "Charts tied to the data", "Slicers for interactivity"],
        formula: "=SUM(B2:B6)",
        formulaExplain:
          "A dashboard is a collection of summaries. Start with SUM for the headline number, then add AVERAGE and MAX for supporting KPIs.",
        demo: {
          beforeTitle: "Weekly sales",
          beforeHeaders: ["Day", "Sales"],
          beforeRows: [["Mon", 210], ["Tue", 180], ["Wed", 250], ["Thu", 220], ["Fri", 300]],
          afterTitle: "Dashboard KPIs",
          afterHeaders: ["KPI", "Value"],
          afterRows: [["Total", 1160], ["Average", 232], ["Best day", 300]],
          steps: [
            "Total: =SUM(B2:B6) → 1160.",
            "Average: =AVERAGE(B2:B6) → 232.",
            "Best: =MAX(B2:B6) → 300, then chart the trend.",
          ],
        },
        task: "Enter =SUM(B2:B6) into cell B7 for the dashboard total, then add AVERAGE and MAX.",
        taskData: [
          ["Day", "Sales"],
          ["Mon", "210"],
          ["Tue", "180"],
          ["Wed", "250"],
          ["Thu", "220"],
          ["Fri", "300"],
          ["Total", ""],
        ],
        taskTarget: "B7",
        taskExpected: "1160",
      },
    ],
  },
];

async function run() {
  console.log("Seeding Excel Master curriculum…");
  await db.delete(lessons);
  await db.delete(modules);

  for (const m of SEED) {
    const [mod] = await db
      .insert(modules)
      .values({
        slug: m.slug,
        title: m.title,
        level: m.level,
        tagline: m.tagline,
        description: m.description,
        order: m.order,
        icon: m.icon,
        accent: m.accent,
      })
      .returning({ id: modules.id });

    for (const l of m.lessons) {
      await db.insert(lessons).values({
        moduleId: mod.id,
        slug: l.slug,
        title: l.title,
        summary: l.summary,
        durationMin: l.durationMin,
        order: m.lessons.indexOf(l) + 1,
        videoId: l.videoId,
        videoStart: l.videoStart ?? 0,
        level: m.level,
        keyPoints: l.keyPoints,
        formula: l.formula,
        formulaExplain: l.formulaExplain,
        demo: l.demo,
        task: l.task,
        taskData: l.taskData,
        taskTarget: l.taskTarget,
        taskExpected: l.taskExpected,
      });
    }
    console.log(`  ✓ ${m.title} (${m.lessons.length} lessons)`);
  }
  console.log("Done.");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
