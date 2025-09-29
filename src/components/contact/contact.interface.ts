export interface Contact {
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  phone: {
    display: string;
    link: string;
  };
  openingHours: {
    weekdays: {
      days: string;
      hours: string;
    };
    weekend: {
      days: string;
      hours: string;
    };
  };
  socials: {
    facebook: {
      url: string;
      icon: string;
      alt: string;
    };
    maps: {
      url: string;
      icon: string;
      alt: string;
    };
  };
  map: {
    latitude: number;
    longitude: number;
    name: string;
  };
}
