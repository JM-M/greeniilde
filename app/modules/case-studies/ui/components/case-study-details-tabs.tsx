"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { CaseStudyEquipment } from "./case-study-equipment";
import { CaseStudyInstallation } from "./case-study-installation";
import { CaseStudyPerformance } from "./case-study-performance";
import { CaseStudySpecifications } from "./case-study-specifications";

export const CaseStudyDetailsTabs = () => {
  return (
    <Tabs defaultValue="specifications" className="w-full">
      <TabsList className="max-w-full justify-start overflow-x-auto lg:mx-auto lg:w-fit">
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="equipment">Equipment</TabsTrigger>
        <TabsTrigger value="installation">Installation</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>

      <TabsContent value="specifications">
        <CaseStudySpecifications className="my-4 rounded-lg border lg:mx-auto lg:max-w-prose" />
      </TabsContent>
      <TabsContent value="equipment">
        <CaseStudyEquipment className="my-4 lg:mx-auto lg:max-w-prose" />
      </TabsContent>
      <TabsContent value="installation">
        <CaseStudyInstallation className="my-4 lg:mx-auto lg:max-w-prose" />
      </TabsContent>
      <TabsContent value="performance">
        <CaseStudyPerformance className="my-4 rounded-lg border lg:mx-auto lg:max-w-prose" />
      </TabsContent>
    </Tabs>
  );
};
