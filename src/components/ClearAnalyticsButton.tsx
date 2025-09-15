import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ClearAnalyticsButtonProps {
  onDataCleared?: () => void;
}

export const ClearAnalyticsButton = ({ onDataCleared }: ClearAnalyticsButtonProps) => {
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleClearData = async () => {
    setIsClearing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('clear-analytics-data', {
        method: 'POST'
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Analytics Data Cleared",
          description: "All analytics data has been successfully removed.",
        });
        
        // Refresh the analytics data if callback provided
        if (onDataCleared) {
          onDataCleared();
        }
      } else {
        throw new Error(data?.error || 'Failed to clear analytics data');
      }
    } catch (error) {
      console.error('Error clearing analytics data:', error);
      toast({
        title: "Error",
        description: "Failed to clear analytics data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm"
          disabled={isClearing}
        >
          {isClearing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          Clear All Data
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Analytics Data</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete all analytics data including page views, events, and sessions. 
            This cannot be undone. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleClearData}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Clear All Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};