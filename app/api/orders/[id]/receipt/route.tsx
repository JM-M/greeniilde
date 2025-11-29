import { retrieveOrder } from "@/app/lib/api/orders";
import { ReceiptDocument } from "@/app/modules/orders/ui/components/receipt-document";
import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // 1. Fetch the order (this includes the auth check via getAuthHeaders)
  const order = await retrieveOrder(id);

  if (!order) {
    return new NextResponse("Order not found or unauthorized", { status: 404 });
  }

  // 2. Generate the PDF stream
  const stream = await renderToStream(<ReceiptDocument order={order} />);

  // 3. Return the stream with correct headers
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="receipt-${order.display_id}.pdf"`,
    },
  });
}
