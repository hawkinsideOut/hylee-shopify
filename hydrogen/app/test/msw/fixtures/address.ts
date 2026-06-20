export type MockMailingAddress = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  provinceCode: string | null;
  country: string | null;
  countryCodeV2: string | null;
  zip: string | null;
  phone: string | null;
  formatted: string[];
};

let _addressCounter = 0;

export const makeMailingAddress = (
  overrides?: Partial<MockMailingAddress>,
): MockMailingAddress => {
  const n = ++_addressCounter;
  return {
    id: `gid://shopify/MailingAddress/${n}`,
    firstName: 'Jane',
    lastName: 'Doe',
    address1: `${n * 100} Main St`,
    address2: null,
    city: 'Austin',
    province: 'Texas',
    provinceCode: 'TX',
    country: 'United States',
    countryCodeV2: 'US',
    zip: '78701',
    phone: null,
    formatted: [`${n * 100} Main St`, 'Austin TX 78701', 'United States'],
    ...overrides,
  };
};
