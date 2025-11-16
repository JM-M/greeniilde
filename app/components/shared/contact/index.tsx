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
  return (
    <div>
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="mb-6 mx-auto flex-wrap justify-center gap-2">
          <TabsTrigger value="form">
            <Send />
            Form
          </TabsTrigger>
          <TabsTrigger value="whatsapp">
            <SiWhatsapp className="size-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail />
            Email
          </TabsTrigger>
          <TabsTrigger value="call">
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
