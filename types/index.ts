// Types pour KIC-FORMATIONS

export enum Category {
  LANGUES_FR = 'LANGUES_FR',
  LANGUES_EN = 'LANGUES_EN',
  INFORMATIQUE = 'INFORMATIQUE',
  ACCOMPAGNEMENT = 'ACCOMPAGNEMENT',
  ATELIERS = 'ATELIERS',
}

export enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  DEBUTANT = 'DEBUTANT',
  INTERMEDIAIRE = 'INTERMEDIAIRE',
  AVANCE = 'AVANCE',
}

export enum Modality {
  PRESENTIEL = 'PRESENTIEL',
  LIGNE = 'LIGNE',
  HYBRIDE = 'HYBRIDE',
}

export enum SessionStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum RegistrationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export enum PaymentMethod {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

export enum ContactStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

// Interfaces principales

export interface Formation {
  id: string;
  slug: string;
  category: Category;
  title: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  prerequisites: string;
  duration: number; // en heures
  level: Level;
  modality: Modality;
  price: number;
  promoPrice?: number;
  maxParticipants: number;
  imageUrl: string;
  syllabus?: string;
  isActive: boolean;
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
  sessions?: Session[];
  testimonials?: Testimonial[];
  rating?: number;
  reviewCount?: number;
}

export interface Session {
  id: string;
  formationId: string;
  formation?: Formation;
  startDate: Date;
  endDate: Date;
  schedule: string; // ex: "Lundi/Mercredi 18h-20h"
  availableSeats: number;
  location: string;
  instructor?: string;
  status: SessionStatus;
  registrationDeadline: Date;
  registrations?: Registration[];
}

export interface Registration {
  id: string;
  sessionId: string;
  session?: Session;
  userId?: string;
  user?: User;

  // Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;

  // Informations formation
  currentLevel?: string;
  specialNeeds?: string;
  comments?: string;

  // Informations administratives
  registrationDate: Date;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;

  // Documents
  documentsSubmitted: boolean;
  documentsUrls?: string[];

  // RGPD
  consentMarketing: boolean;
  consentDataProcessing: boolean;
  ipAddress: string;

  payment?: Payment;
}

export interface Payment {
  id: string;
  registrationId: string;
  registration?: Registration;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
  paidAt?: Date;
  refundedAt?: Date;
  refundAmount?: number;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
  registrations?: Registration[];
}

export interface Testimonial {
  id: string;
  studentName: string;
  formationId?: string;
  formation?: Formation;
  rating: number; // 1-5
  comment: string;
  photo?: string;
  isApproved: boolean;
  isVisible: boolean;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  authorId: string;
  author?: User;
  publishedAt?: Date;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  formationType?: string;
  status: ContactStatus;
  createdAt: Date;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  firstName?: string;
  subscribedAt: Date;
  isActive: boolean;
  unsubscribedAt?: Date;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  order: number;
  isVisible: boolean;
}

export interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requestedDate: Date;
  requestedTime: string;
  purpose: string;
  message?: string;
  status: AppointmentStatus;
  confirmedDateTime?: Date;
  createdAt: Date;
}

// Types pour les filtres

export interface FormationFilters {
  category?: Category[];
  level?: Level[];
  modality?: Modality[];
  priceMin?: number;
  priceMax?: number;
  availableNow?: boolean;
  search?: string;
}

// Types pour les formulaires

export interface RegistrationFormData {
  // Étape 1: Niveau
  currentLevel?: string;
  specialNeeds?: string;

  // Étape 2: Coordonnées
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;

  // RGPD
  consentDataProcessing: boolean;
  consentMarketing: boolean;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  formationType?: string;
  consentDataProcessing: boolean;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  consent: boolean;
}

// Types pour les props de composants

export interface FormationCardProps {
  formation: Formation;
  nextSession?: Session;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export interface BadgeProps {
  type: 'niveau' | 'modalite' | 'promo';
  children: React.ReactNode;
}

// Types pour les métadonnées SEO

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

// Types pour la pagination

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Types pour les statistiques

export interface SiteStats {
  totalStudents: number;
  successRate: number;
  yearsExperience: number;
  totalFormations: number;
}

// Helpers pour les labels

export const CategoryLabels: Record<Category, string> = {
  [Category.LANGUES_FR]: 'Français',
  [Category.LANGUES_EN]: 'Anglais',
  [Category.INFORMATIQUE]: 'Informatique',
  [Category.ACCOMPAGNEMENT]: 'Accompagnement',
  [Category.ATELIERS]: 'Ateliers',
};

export const ModalityLabels: Record<Modality, string> = {
  [Modality.PRESENTIEL]: 'Présentiel',
  [Modality.LIGNE]: 'En ligne',
  [Modality.HYBRIDE]: 'Hybride',
};

export const LevelLabels: Record<Level, string> = {
  [Level.A1]: 'A1',
  [Level.A2]: 'A2',
  [Level.B1]: 'B1',
  [Level.B2]: 'B2',
  [Level.DEBUTANT]: 'Débutant',
  [Level.INTERMEDIAIRE]: 'Intermédiaire',
  [Level.AVANCE]: 'Avancé',
};
