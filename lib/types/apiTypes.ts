export interface RootObject {
  data: Venue[];
  meta: RootObjectMeta;
}

export interface VenueOwner {
  name: string;
  email: string;
  avatar?: { url: string; alt: string };
}

export interface Venue {
  _count: Count;
  created: Date;
  description: string;
  id: string;
  location: Location;
  maxGuests: number;
  media: Media[];
  meta: VenueMeta;
  name: string;
  owner?: VenueOwner;
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

export interface VenueMeta {
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

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer?: {
    name: string;
    email: string;
    avatar?: { url: string; alt: string };
  };
}

export interface VenueWithBookings extends Venue {
  bookings?: Booking[];
}

export interface BookingWithVenue extends Booking {
  venue?: {
    id: string;
    name: string;
    price: number;
    media: Media[];
    location: Location;
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
