export interface RootObject {
  data: Datum[];
  meta: RootObjectMeta;
}

export interface Datum {
  _count: Count;
  created: Date;
  description: string;
  id: string;
  location: Location;
  maxGuests: number;
  media: Media[];
  meta: DatumMeta;
  name: string;
  price: number;
  rating: number;
  updated: Date;
}

export interface Count {
  bookings: number;
}

export interface Location {
  address: null | string;
  city: null | string;
  continent: null | string;
  country: null | string;
  lat: number | null;
  lng: number | null;
  zip: null | string;
}

export interface Media {
  alt: string;
  url: string;
}

export interface DatumMeta {
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
  wifi: boolean;
}

export interface CreateVenueInput {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  media?: { url: string; alt: string }[];
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
}

export interface RootObjectMeta {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number;
  pageCount: number;
  previousPage: null;
  totalCount: number;
}
