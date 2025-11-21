// Generic API Response Types
type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

type PaginatedResponse<T> = {
  status: boolean;
  message: string;
  data: T & {
    pagination: PaginationInfo;
  };
};

type PaginationInfo = {
  perPage: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  total: number;
  pageCount: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

// Type definitions
type Metadata = Record<string, unknown>;
type WeightUnit = "kg";
type SizeUnit = "cm";
type Currency = "NGN";

// Base interfaces
interface BaseAddress {
  id: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  line1?: string;
  line2?: string;
  phone?: string;
  state: string;
  zip?: string;
  created_at: string;
  updated_at: string;
}

interface BaseLocation {
  name: string;
  latitude: string;
  longitude: string;
}

interface TimezoneInfo {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

// Address Types
export interface TerminalAddress extends BaseAddress {
  address_id: string;
  is_residential: boolean;
  metadata?: Metadata;
  name?: string;
}

export type TerminalCreateAddressResponse = ApiResponse<TerminalAddress>;
export type TerminalGetAddressesResponse = PaginatedResponse<{
  addresses: TerminalAddress[];
}>;
export type TerminalGetAddressResponse = ApiResponse<TerminalAddress>;

// Location Types
export interface TerminalCountry extends BaseLocation {
  isoCode: string;
  phonecode: string;
  flag: string;
  currency: Currency;
  timezones: TimezoneInfo[];
}

export interface TerminalState extends BaseLocation {
  isoCode: string;
  countryCode: string;
}

export interface TerminalCity extends BaseLocation {
  countryCode: string;
  stateCode: string;
}

export type TerminalGetCountriesResponse = ApiResponse<TerminalCountry[]>;
export type TerminalGetStatesResponse = ApiResponse<TerminalState[]>;
export type TerminalGetCitiesResponse = ApiResponse<TerminalCity[]>;

// Packaging Types
export interface TerminalPackaging {
  height: number;
  id: string;
  length: number;
  name: string;
  packaging_id: string;
  size_unit: SizeUnit;
  default: boolean;
  type: string;
  weight: number;
  weight_unit: WeightUnit;
  width: number;
  created_at: string;
  updated_at: string;
}

export type TerminalGetPackagingsResponse = PaginatedResponse<{
  packaging: TerminalPackaging[];
}>;

// Pickup Address Types
export interface CreatePickupAddressInput {
  terminalAddressId: string;
  isDefault?: boolean;
  nickname?: string;
}

export interface UpdatePickupAddressInput {
  id: string;
  terminalAddressId?: string;
  isDefault?: boolean;
  nickname?: string;
}

// Parcel Types
export interface TerminalParcelItem {
  description: string;
  name: string;
  currency: Currency;
  value: number;
  weight: number;
  quantity: number;
}

export interface TerminalParcel {
  id: string;
  parcel_id: string;
  description?: string;
  items: TerminalParcelItem[];
  metadata?: Metadata;
  proof_of_payments: string[];
  rec_docs: string[];
  packaging: string;
  totalWeight: number;
  weight: number;
  weight_unit: WeightUnit;
  created_at: string;
  updated_at: string;
}

export type TerminalCreateParcelResponse = ApiResponse<TerminalParcel>;

// Rate Types
export interface TerminalRate {
  amount: number;
  breakdown: unknown[];
  carrier_logo: string;
  carrier_name: string;
  carrier_rate_description: string;
  carrier_reference: string;
  carrier_slug: string;
  currency: Currency;
  delivery_address: string;
  delivery_date: string;
  delivery_eta: number;
  delivery_time: string;
  insurance_coverage: number;
  insurance_fee: number;
  includes_insurance: boolean;
  metadata: Metadata;
  parcel: string;
  pickup_address: string;
  pickup_eta: number;
  pickup_time: string;
  rate_id: string;
  used: boolean;
  user: string;
  created_at: string;
  updated_at: string;
}

export type TerminalGetRatesForShipmentResponse = ApiResponse<
  TerminalRate[]
> & {
  pageData: {
    total: number;
    perPage: number;
    page: number;
    pageCount: number;
  };
};

export type TerminalGetRateResponse = ApiResponse<TerminalRate>;

// Default Sender Type
export interface DefaultSenderAddress extends BaseAddress {
  _id: string;
  user: string;
  address_id: string;
  coordinates: {
    lat: number;
    lng: number;
    place_id: string;
    google_postal_code: string;
  };
  place_id: string;
  is_residential: boolean;
  sender_default: boolean;
  metadata: {
    google_postal_code: string;
  };
  __v: number;
}

export type TerminalGetDefaultSenderResponse =
  ApiResponse<DefaultSenderAddress>;

export interface TerminalShipmentEvent {
  created_at: string;
  description: string;
  location: string;
  status: string;
}

export interface TerminalShipment {
  address_from: TerminalAddress;
  address_return?: TerminalAddress;
  address_to: TerminalAddress;
  events: TerminalShipmentEvent[];
  id: string;
  metadata?: Metadata;
  parcel: TerminalParcel;
  rate?: string | null;
  shipment_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}
