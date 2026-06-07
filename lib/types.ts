// Ron's Landscape OS — Domain Types
// Shared across all 7 modules

export type ID = string;

// ==================== CLIENTS ====================
export type ServiceFrequency = "weekly" | "biweekly" | "monthly" | "daily" | "as-needed";

export interface Photo {
  id: ID;
  url: string;       // placeholder URLs in seed data
  caption?: string;
  takenAt: string;   // ISO date
  type: "before" | "after" | "general";
}

export interface Client {
  id: ID;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  gateCode?: string;
  serviceNotes: string;            // general service expectations
  maintenanceFrequency: ServiceFrequency;
  propertyInstructions: string;    // gates, dogs, parking, alarm
  beforeAfterPhotos: Photo[];
  crewNotes: string;               // tribal knowledge for crew
  equipmentNotes: string;          // mower deck size limits, tight gates, etc.
  contaminationNotes: string;      // weed/disease cross-contamination warnings
  tags: string[];
  createdAt: string;
}

// ==================== WORK ORDERS ====================
export type WorkOrderStatus =
  | "draft"
  | "scheduled"
  | "in-progress"
  | "completed"
  | "invoiced"
  | "paid";

export type JobType =
  | "maintenance"
  | "cleanup"
  | "install"
  | "hardscape"
  | "tree-work"
  | "irrigation"
  | "hauling"
  | "other";

export interface MaterialLine {
  id: ID;
  description: string;
  quantity: number;
  unit: string;       // yd, ea, ton, bag
  unitCost: number;
  markup: number;     // 1.25 = 25%
}

export interface WorkOrder {
  id: ID;
  number: string;             // human-readable WO-2026-0142
  clientId: ID;
  propertyAddress: string;
  jobType: JobType;
  description: string;
  beforePhotos: Photo[];
  afterPhotos: Photo[];
  notes: string;
  materials: MaterialLine[];
  laborHoursEstimated: number;
  laborHoursActual?: number;
  laborRate: number;          // $/hr loaded
  crewSize: number;
  status: WorkOrderStatus;
  scheduledFor?: string;      // ISO date
  completedAt?: string;
  invoiceNumber?: string;
  invoiceTotal?: number;
  paymentNotes?: string;
}

// ==================== MAINTENANCE CONTRACTS ====================
export interface AddOnService {
  id: ID;
  name: string;          // "Hedge trim quarterly", "Spring mulch"
  monthlyValue: number;
  frequency: string;     // "quarterly", "annual", "spring"
}

export interface MaintenanceContract {
  id: ID;
  clientId: ID;
  frequency: ServiceFrequency;
  routeId?: ID;
  crewId?: ID;
  monthlyValue: number;
  recurringPrice: number;       // per-visit price
  firstCleanupFee: number;
  startDate: string;
  endDate?: string;
  addOns: AddOnService[];
  active: boolean;
  notes: string;
}

// ==================== ESTIMATING ====================
export interface EstimateInputs {
  lotSizeSqFt: number;
  hasGrass: boolean;
  hasBeds: boolean;
  heavyPlanting: boolean;
  hedgeLinearFt: number;
  rockYards: number;
  mulchYards: number;
  crewSize: number;
  isFirstTime: boolean;
  deliveryMiles: number;
}

export interface EstimateOutput {
  laborHours: number;
  laborCost: number;
  materialsCost: number;
  deliveryCost: number;
  firstTimeCleanupCost: number;
  recurringMaintenancePrice: number;   // per visit
  monthlyValue: number;                 // assuming weekly default
  total: number;
  breakdown: { label: string; amount: number }[];
}

// ==================== ROUTING ====================
export interface RouteStop {
  clientId: ID;
  contractId: ID;
  estimatedMinutes: number;
  order: number;
}

export interface Route {
  id: ID;
  name: string;          // "Stone Oak Tuesday"
  dayOfWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  zipCodes: string[];
  crewId: ID;
  truckId: ID;
  trailerId?: ID;
  stops: RouteStop[];
  weeklyRevenue: number;
  estimatedDriveMinutes: number;
  estimatedJobMinutes: number;
}

// ==================== EQUIPMENT ====================
export type EquipmentType =
  | "vehicle"
  | "trailer"
  | "mower"
  | "trimmer"
  | "edger"
  | "blower"
  | "combo-unit"
  | "hand-tool"
  | "other";

export type ShopStatus = "in-service" | "needs-service" | "in-shop" | "retired";

export interface MaintenanceLog {
  id: ID;
  date: string;
  description: string;
  cost: number;
  shop?: string;
  receiptUrl?: string;
}

export interface Equipment {
  id: ID;
  type: EquipmentType;
  make: string;
  model: string;
  serialNumber: string;
  year?: number;
  purchaseDate?: string;
  purchasePrice?: number;
  assignedCrewId?: ID;
  shopStatus: ShopStatus;
  hoursOrMileage?: number;
  nextServiceDue?: string;       // ISO date
  serviceIntervalHours?: number;
  maintenanceLog: MaintenanceLog[];
  notes: string;
}

// ==================== CREW ====================
export interface Crew {
  id: ID;
  name: string;             // "Crew 1 — Diego"
  leadName: string;
  members: string[];
  truckId?: ID;
  trailerId?: ID;
  phone: string;
  defaultRouteIds: ID[];
}

// ==================== UTIL ====================
export interface KpiTile {
  label: string;
  value: string;
  delta?: string;
  tone?: "good" | "warn" | "bad" | "neutral";
}
