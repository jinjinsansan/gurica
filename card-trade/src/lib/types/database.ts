export type UUID = string;

export type CategorySlug =
  | "pokemon"
  | "yugioh"
  | "onepiece"
  | "other_tcg"
  | "digital";

export type Rarity = "UR" | "SR" | "R" | "C" | "OTHER";

export type ProductCondition = "mint" | "near_mint" | "good" | "damaged";

export type ProductStatus = "active" | "sold" | "draft";

export type ProductBadge = "new" | "sale" | "rare" | "digital";

export type UserRole = "user" | "admin";

export type AssessmentStatus =
  | "pending"
  | "reviewing"
  | "quoted"
  | "accepted"
  | "completed"
  | "cancelled";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "preparing"
  | "shipped"
  | "completed"
  | "cancelled";

export type ContactStatus = "unread" | "in_progress" | "resolved";

export type InquiryType = "buy" | "sell" | "other";

export interface Profile {
  id: UUID;
  email: string;
  fullName?: string | null;
  phone?: string | null;
  postalCode?: string | null;
  address?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: UUID;
  name: string;
  slug: CategorySlug;
  displayOrder: number;
  icon?: string | null;
  color?: string | null;
  createdAt: string;
}

export interface Product {
  id: UUID;
  categoryId: UUID;
  name: string;
  slug: string;
  series?: string | null;
  rarity?: Rarity | null;
  condition: ProductCondition;
  price: number;
  originalPrice?: number | null;
  description?: string | null;
  isDigital: boolean;
  status: ProductStatus;
  badge?: ProductBadge | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: UUID;
  productId: UUID;
  url: string;
  displayOrder: number;
  createdAt: string;
}

export interface BuyPrice {
  id: UUID;
  categoryId: UUID;
  cardName: string;
  series?: string | null;
  rarity?: Rarity | null;
  conditionMint?: number | null;
  conditionNearMint?: number | null;
  conditionGood?: number | null;
  conditionDamaged?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: UUID;
  userId?: UUID | null;
  name: string;
  email: string;
  phone?: string | null;
  categoryId: UUID;
  cardDetail: string;
  condition: ProductCondition;
  notes?: string | null;
  status: AssessmentStatus;
  quotedPrice?: number | null;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentImage {
  id: UUID;
  assessmentId: UUID;
  url: string;
  createdAt: string;
}

export interface Order {
  id: UUID;
  userId?: UUID | null;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  shippingPostalCode: string;
  shippingAddress: string;
  totalAmount: number;
  status: OrderStatus;
  trackingNumber?: string | null;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: UUID;
  orderId: UUID;
  productId: UUID;
  productName: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface Contact {
  id: UUID;
  name: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
  status: ContactStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: UUID;
  title: string;
  content?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDisplayMeta {
  label: string;
  description: string;
  gradient: [string, string];
  emoji: string;
}
