export const bodyTypes = ["SUV", "Sedan", "Hatchback", "Pickup", "Crossover"] as const;
export const luxuryFilter = "Luxury" as const;

export type BodyType = (typeof bodyTypes)[number];
export type BodyFilter = BodyType | typeof luxuryFilter;
export type VehicleCondition = "new" | "used";
export type Transmission = "Automatic" | "Manual" | "CVT";
export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Drivetrain = "FWD" | "RWD" | "AWD" | "4WD";

export type VehicleImage = {
  src: string;
  alt: string;
};

export type Vehicle = {
  id: string;
  slug: string;
  stockNumber: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  condition: VehicleCondition;
  price: number;
  currency: "GHS";
  mileage: number;
  transmission: Transmission;
  fuelType: FuelType;
  bodyType: BodyType;
  luxury: boolean;
  engineCapacity?: string;
  drivetrain: Drivetrain;
  exteriorColor?: string;
  interiorColor?: string;
  description: string;
  features: string[];
  images: VehicleImage[];
  featured: boolean;
  availability: string;
  dateAdded: string;
};
