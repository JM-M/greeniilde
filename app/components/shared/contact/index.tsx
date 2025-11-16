"use client";

import { Mail, PhoneCall, Send } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import { ContactCallChannel } from "./channels/call";
import { ContactEmailChannel } from "./channels/email";
import { ContactFormChannel } from "./channels/form";
import { ContactWhatsappChannel } from "./channels/whatsapp";

export const Contact = () => {
  const triggerClassName =
    "flex-[unset] hover:bg-primary/10 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground";

  return (
    <div>
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="mb-6 mx-auto flex-wrap justify-center gap-2 flex  bg-transparent h-fit">
          <TabsTrigger value="form" className={triggerClassName}>
            <Send />
            Form
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className={triggerClassName}>
            <SiWhatsapp className="size-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="email" className={triggerClassName}>
            <Mail />
            Email
          </TabsTrigger>
          <TabsTrigger value="call" className={triggerClassName}>
            <PhoneCall />
            Call
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <ContactFormChannel />
        </TabsContent>

        <TabsContent value="whatsapp">
          <ContactWhatsappChannel />
        </TabsContent>

        <TabsContent value="email">
          <ContactEmailChannel />
        </TabsContent>

        <TabsContent value="call">
          <ContactCallChannel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
