import { StoreOrder } from "@medusajs/types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    padding: 0, // Remove default padding to allow full-width header
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
  },
  headerContainer: {
    backgroundColor: "#f9fafb", // Light gray background
    padding: 40,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContainer: {
    padding: 40,
    lineHeight: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 20,
  },
  brandName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  date: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
    flexDirection: "row",
    gap: 40,
  },
  column: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: 8,
    letterSpacing: 1,
  },
  addressText: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 2,
  },
  table: {
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4b5563",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  colItem: { width: "50%" },
  colPrice: { width: "20%", textAlign: "right" },
  colQty: { width: "10%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },

  itemName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
  },
  itemVariant: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 2,
  },
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalsBox: {
    width: "40%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalLabel: {
    color: "#6b7280",
  },
  totalValue: {
    color: "#111827",
    fontWeight: "medium",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 20,
  },
});

// Helper to format currency with code instead of symbol to avoid font issues
const formatCurrency = (amount: number, currencyCode: string) => {
  return (
    currencyCode.toUpperCase() +
    " " +
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  );
};

export const ReceiptDocument = ({ order }: { order: StoreOrder }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section with Background */}
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.title}>Receipt</Text>
            <Text style={styles.orderId}>Order #{order.display_id}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.brandName}>Greeniilde</Text>
            <Text style={styles.date}>
              {format(new Date(order.created_at), "MMMM d, yyyy")}
            </Text>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          {/* Addresses */}
          <View style={styles.section}>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Billed To</Text>
              <Text style={styles.addressText}>
                {order.billing_address?.first_name}{" "}
                {order.billing_address?.last_name}
              </Text>
              <Text style={styles.addressText}>
                {order.billing_address?.address_1}
              </Text>
              {order.billing_address?.address_2 && (
                <Text style={styles.addressText}>
                  {order.billing_address.address_2}
                </Text>
              )}
              <Text style={styles.addressText}>
                {order.billing_address?.city},{" "}
                {order.billing_address?.postal_code}
              </Text>
              <Text style={styles.addressText}>
                {order.billing_address?.country_code?.toUpperCase()}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Shipped To</Text>
              <Text style={styles.addressText}>
                {order.shipping_address?.first_name}{" "}
                {order.shipping_address?.last_name}
              </Text>
              <Text style={styles.addressText}>
                {order.shipping_address?.address_1}
              </Text>
              {order.shipping_address?.address_2 && (
                <Text style={styles.addressText}>
                  {order.shipping_address.address_2}
                </Text>
              )}
              <Text style={styles.addressText}>
                {order.shipping_address?.city},{" "}
                {order.shipping_address?.postal_code}
              </Text>
              <Text style={styles.addressText}>
                {order.shipping_address?.country_code?.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colItem]}>Item</Text>
              <Text style={[styles.tableHeaderCell, styles.colPrice]}>
                Price
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.colTotal]}>
                Total
              </Text>
            </View>
            {order.items?.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <View style={styles.colItem}>
                  <Text style={styles.itemName}>{item.title}</Text>
                  {item.variant_title && (
                    <Text style={styles.itemVariant}>{item.variant_title}</Text>
                  )}
                </View>
                <View style={styles.colPrice}>
                  <Text>
                    {formatCurrency(item.unit_price, order.currency_code)}
                  </Text>
                </View>
                <View style={styles.colQty}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={styles.colTotal}>
                  <Text>{formatCurrency(item.total, order.currency_code)}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Totals */}
          <View style={styles.totalsContainer}>
            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(order.subtotal, order.currency_code)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Shipping</Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(order.shipping_total, order.currency_code)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(order.tax_total, order.currency_code)}
                </Text>
              </View>
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Total</Text>
                <Text style={styles.grandTotalValue}>
                  {formatCurrency(order.total, order.currency_code)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text style={{ marginTop: 4 }}>
            For any questions, please contact support@greeniilde.com
          </Text>
        </View>
      </Page>
    </Document>
  );
};
