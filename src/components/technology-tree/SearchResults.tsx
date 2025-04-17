
import React, { useEffect } from "react";
import { PaperList } from "./PaperList";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Code } from "lucide-react";
import { ImplementationList } from "./ImplementationList";
import { FilterSort } from "./FilterSort";

export const SearchResults = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("papers");

  useEffect(() => {
    const handleRefresh = () => {
      console.log("SearchResults component detected refresh event");
      
      const sidebarContent = document.querySelector('[data-sidebar="content"]');
      if (sidebarContent) {
        sidebarContent.scrollTop = 0;
      }
    };
    
    document.addEventListener('refresh-papers', handleRefresh);
    
    return () => {
      document.removeEventListener('refresh-papers', handleRefresh);
    };
  }, [toast]);

  return (
    <div className="h-full p-4 overflow-auto bg-[#fffdf5]" data-sidebar="content">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">32 papers • 9 implementations</span>
        <FilterSort className="justify-end" />
      </div>

      <Tabs defaultValue="papers" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="papers" className="flex-1">
            <Book className="w-4 h-4 mr-2" />
            Papers
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex-1">
            <Code className="w-4 h-4 mr-2" />
            Implementation
          </TabsTrigger>
        </TabsList>
        
        {activeTab === "papers" ? (
          <PaperList />
        ) : (
          <ImplementationList />
        )}
      </Tabs>
    </div>
  );
};

