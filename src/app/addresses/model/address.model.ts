export interface Address {
  city: string;
  state: string;
  zip_code: number;
  street: string;
  street_number: number;
  full_street_address: string;
}

export const ADDRESS_MOCK: Address = {
  city: 'Maceió',
  state: 'AL',
  zip_code: 57045140,
  street: 'Rua presidente getulio vargas n 80',
  street_number: 80,
  full_street_address:
    'Rua presidente getulio vargas 80, Barro Duro, Maceió - AL, Brazil',
};
