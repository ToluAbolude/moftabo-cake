
import { Download, RefreshCw, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ExportDropdownProps {
  onRefresh: () => void;
  onExportSpreadsheet: () => void;
  onExportPDF: () => void;
  onExportJSON: () => void;
}

export const ExportDropdown = ({ 
  onRefresh, 
  onExportSpreadsheet, 
  onExportPDF, 
  onExportJSON 
}: ExportDropdownProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        onClick={onRefresh}
        size="sm"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onExportSpreadsheet}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export as CSV (Spreadsheet)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Export as PDF Report
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportJSON}>
            <Download className="h-4 w-4 mr-2" />
            Export as JSON (Raw Data)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
