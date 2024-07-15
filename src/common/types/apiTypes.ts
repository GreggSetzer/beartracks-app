export interface Park {
  description: string;
  designation: string;
  directionsInfo: string;
  directionsUrl: string;
  email: string;
  ext: string;
  fullName: string;
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  parkCode: string;
  phoneNumber: string;
  url: string;
  weatherInfo: string;
}

export interface Article {
  altText: string;
  id: string;
  listingImageUrl: string;
  latitude: string;
  listingDescription: string;
  longitude: string;
  parkCode: string;
  tags: string;
  title: string;
  url: string;
}

interface KeyValue {
  [key: string]: string | string[];
}

interface ContactInfo {
  phoneNumbers: Array<{
    phoneNumber: string;
    description: string;
    extension: string;
    type: string;
  }>;
  emailAddresses: Array<{
    description: string;
    emailAddress: string;
  }>;
}

interface FeeInfo {
  cost: string;
  description: string;
  title: string;
}

interface OperatingHours {
  exceptions: Array<{
    exceptionHours: KeyValue;
    startDate: string;
    name: string;
    endDate: string;
  }>;
  description: string;
  standardHours: KeyValue;
  name: string;
}

interface AddressInfo {
  postalCode: string;
  city: string;
  stateCode: string;
  countryCode: string;
  provinceTerritoryCode: string;
  line1: string;
  type: string;
  line3: string;
  line2: string;
}

export interface ImageInfo {
  credit?: string;
  crops?: string[];
  title?: string;
  altText: string;
  caption?: string;
  url: string;
}

interface CampgroundInfo {
  totalSites: string;
  group: string;
  horse: string;
  tentOnly: string;
  electricalHookups: string;
  rvOnly: string;
  walkBoatTo: string;
  other: string;
}

interface AccessibilityInfo {
  wheelchairAccess: string;
  internetInfo: string;
  cellPhoneInfo: string;
  fireStovePolicy: string;
  rvAllowed: string;
  rvInfo: string;
  rvMaxLength: string;
  additionalInfo: string;
  trailerMaxLength: string;
  adaInfo: string;
  trailerAllowed: string;
  accessRoads: string[];
  classifications: string[];
}

export interface Campground {
  pk: string;
  sk: string;
  id: string;
  url?: string;
  name?: string;
  parkCode: string;
  description?: string;
  latitude?: string;
  longitude?: string;
  reservationInfo?: string;
  reservationUrl?: string;
  regulationsUrl?: string;
  regulationsOverview?: string;
  amenities?: KeyValue;
  contacts?: ContactInfo;
  fees?: FeeInfo[];
  directionsOverview?: string;
  directionsUrl?: string;
  operatingHours?: OperatingHours[];
  addresses?: AddressInfo[];
  images?: ImageInfo[];
  weatherOverview?: string;
  numberOfSitesReservable?: string;
  numberOfSitesFirstComeFirstServe?: string;
  campgrounds?: CampgroundInfo;
  accessibility?: AccessibilityInfo;
  designation?: string;
  directionsInfo?: string;
  email?: string;
  ext?: string;
  fullName?: string;
  phoneNumber?: string;
  weatherInfo?: string;
  entity: 'campsite';
}

export interface FetchApiResponse<T> {
  items: T;
}

export interface FeaturedPark {
  articles: Article[];
  campgrounds: Campground[];
}

export interface SelectedPark {
  featuredParkDetails: FeaturedPark | null;
  featuredPark: Park | null;
}

export interface Favorite {
  userId: string;
  campgroundId: string;
  campgroundName: string;
  campgroundUrl: string;
  campgroundImageUrl: string;
  campgroundImageAltText: string;
  parkName: string;
  parkId: string;
}

export interface Position {
  lat: number;
  lng: number;
}
