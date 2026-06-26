import { CheatSheetDownload } from '@/components/CheatSheetDownload';
import { Seo } from '@/components/Seo';

export default function CheatSheetsPage() {
  return (
    <>
      <Seo
        title="TypeScript Cheat Sheets (PDF)"
        description="Download free printable TypeScript cheat sheets: basics, functions, objects & interfaces, and generics."
        path="/cheatsheets"
        keywords="typescript cheat sheet, typescript pdf, typescript reference"
      />
      <CheatSheetDownload />
    </>
  );
}
