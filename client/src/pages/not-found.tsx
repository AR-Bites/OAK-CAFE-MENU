import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  // Debug logging to track what URL caused 404
  console.error('404 PAGE NOT FOUND - Current URL:', window.location.href);
  console.error('404 PATH:', window.location.pathname);
  console.error('404 SEARCH:', window.location.search);
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Path: {window.location.pathname}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            URL: {window.location.href}
          </p>
          
          {window.location.pathname.includes('/models/') && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-sm text-red-700">
              ⚠️ FOUND THE ISSUE: URL contains "/models/" but files are in "/attached_assets/"
              <br />This indicates browser cache or old reference needs clearing.
            </div>
          )}
          
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
