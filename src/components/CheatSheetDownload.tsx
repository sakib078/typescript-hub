import { useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';

interface CheatSheet {
  id: string;
  title: string;
  description: string;
  content: CheatSheetSection[];
}

interface CheatSheetSection {
  title: string;
  items: CheatSheetItem[];
}

interface CheatSheetItem {
  syntax: string;
  description: string;
}

const cheatSheets: CheatSheet[] = [
  {
    id: 'basics',
    title: 'TypeScript Basics',
    description: 'Essential types, variables, and syntax',
    content: [
      {
        title: 'Primitive Types',
        items: [
          { syntax: 'let name: string = "John"', description: 'String type' },
          { syntax: 'let age: number = 25', description: 'Number type' },
          { syntax: 'let active: boolean = true', description: 'Boolean type' },
          { syntax: 'let data: null = null', description: 'Null type' },
          { syntax: 'let value: undefined', description: 'Undefined type' },
        ]
      },
      {
        title: 'Arrays & Tuples',
        items: [
          { syntax: 'let nums: number[] = [1, 2, 3]', description: 'Array of numbers' },
          { syntax: 'let arr: Array<string> = []', description: 'Generic array syntax' },
          { syntax: 'let tuple: [string, number]', description: 'Tuple with fixed types' },
        ]
      },
      {
        title: 'Union & Literal Types',
        items: [
          { syntax: 'let id: string | number', description: 'Union type' },
          { syntax: 'let status: "active" | "inactive"', description: 'Literal type' },
        ]
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Function types, parameters, and return types',
    content: [
      {
        title: 'Function Declarations',
        items: [
          { syntax: 'function add(a: number, b: number): number', description: 'Typed function' },
          { syntax: 'const fn = (x: string): void => {}', description: 'Arrow function' },
          { syntax: 'function greet(name?: string)', description: 'Optional parameter' },
          { syntax: 'function log(msg = "default")', description: 'Default parameter' },
        ]
      },
      {
        title: 'Advanced Functions',
        items: [
          { syntax: 'function sum(...nums: number[])', description: 'Rest parameters' },
          { syntax: 'type Fn = (x: number) => string', description: 'Function type alias' },
          { syntax: 'function process<T>(val: T): T', description: 'Generic function' },
        ]
      }
    ]
  },
  {
    id: 'objects',
    title: 'Objects & Interfaces',
    description: 'Object types, interfaces, and type aliases',
    content: [
      {
        title: 'Type Aliases',
        items: [
          { syntax: 'type User = { name: string }', description: 'Type alias' },
          { syntax: 'type ID = string | number', description: 'Union type alias' },
          { syntax: 'readonly id: number', description: 'Readonly property' },
        ]
      },
      {
        title: 'Interfaces',
        items: [
          { syntax: 'interface User { name: string }', description: 'Interface' },
          { syntax: 'interface Admin extends User', description: 'Extend interface' },
          { syntax: 'interface Fn { (x: number): void }', description: 'Callable interface' },
        ]
      }
    ]
  },
  {
    id: 'generics',
    title: 'Generics',
    description: 'Generic types, constraints, and utilities',
    content: [
      {
        title: 'Basic Generics',
        items: [
          { syntax: 'function identity<T>(val: T): T', description: 'Generic function' },
          { syntax: 'interface Box<T> { value: T }', description: 'Generic interface' },
          { syntax: 'type Pair<K, V> = { key: K, val: V }', description: 'Multiple type params' },
        ]
      },
      {
        title: 'Constraints & Utilities',
        items: [
          { syntax: '<T extends { length: number }>', description: 'Generic constraint' },
          { syntax: 'Partial<T>', description: 'Make all props optional' },
          { syntax: 'Required<T>', description: 'Make all props required' },
          { syntax: 'Pick<T, "name" | "age">', description: 'Pick specific props' },
          { syntax: 'Omit<T, "password">', description: 'Omit specific props' },
        ]
      }
    ]
  }
];

export function CheatSheetDownload() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const generatePDF = async (sheet: CheatSheet) => {
    setDownloading(sheet.id);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPos = 20;
      const lineHeight = 7;
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // Title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(sheet.title, margin, yPos);
      yPos += 15;

      // Description
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100);
      pdf.text(sheet.description, margin, yPos);
      pdf.setTextColor(0);
      yPos += 15;

      // Content sections
      for (const section of sheet.content) {
        // Check if we need a new page
        if (yPos > 260) {
          pdf.addPage();
          yPos = 20;
        }

        // Section title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(section.title, margin, yPos);
        yPos += 10;

        // Items
        pdf.setFontSize(10);
        for (const item of section.items) {
          if (yPos > 270) {
            pdf.addPage();
            yPos = 20;
          }

          // Syntax (monospace-like)
          pdf.setFont('courier', 'normal');
          pdf.text(item.syntax, margin, yPos);
          
          // Description
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(100);
          const descWidth = pdf.getTextWidth(item.description);
          pdf.text(item.description, pageWidth - margin - descWidth, yPos);
          pdf.setTextColor(0);
          
          yPos += lineHeight;
        }
        yPos += 5;
      }

      // Footer
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(150);
      pdf.text('Generated by TypeScript Hub', margin, pdf.internal.pageSize.getHeight() - 10);

      pdf.save(`typescript-${sheet.id}-cheatsheet.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        TypeScript Cheat Sheets
      </h2>
      <p className="text-muted-foreground mb-6">
        Download printable PDF quick reference guides
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {cheatSheets.map(sheet => (
          <div 
            key={sheet.id}
            className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <h3 className="font-medium text-foreground mb-1">{sheet.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{sheet.description}</p>
            <button
              onClick={() => generatePDF(sheet)}
              disabled={downloading === sheet.id}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {downloading === sheet.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
