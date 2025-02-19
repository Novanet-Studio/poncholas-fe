declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;
  export = Schema;
}

declare module 'vue3-tabs-component' {
  import { Component } from 'vue';
  const Tabs: Component;
  const Tab: Component;

  export { Tabs, Tab };
}

type HttpsCallableHelper = <T, U>(data: T) => U;

interface Pagination {
  total: number;
  pageCount: number;
}

interface Meta {
  pagination: Pagination;
}

// Helper interfaces generics to reduce typings code
interface DataWrapper<T> {
  data: T;
}

interface StrapiDataWrapper<T> {
  id?: string;
  attributes?: T;
}

type MetaInfo = { meta: Meta };

// API Request

type CategoriesRequest = DataWrapper<CategoriesRequestData>;
type InvoicesRequest = DataWrapper<InvoicesRequestData>;
type ProductRequest = DataWrapper<ProductRequestData>;
type LoginRequest = DataWrapper<LoginRequestData>;
type RegisterRequest = DataWrapper<RegisterRequestData>;
type CreateInvoiceRequest = DataWrapper<CreateInvoiceRequestData>;
type FabricsRequest = DataWrapper<FabricsRequestData>;
type SizesRequest = DataWrapper<SizesRequestData>;

// API Request Data
interface CategoriesRequestData {
  categories: Categories;
}

interface InvoicesRequestData {
  invoices: Invoices;
}

interface ProductRequestData {
  products: Products;
}

interface LoginRequestData {
  login: UserData;
}

interface RegisterRequestData {
  register: UserData;
}

interface CreateInvoiceRequestData {
  createInvoice: CreateInvoice;
}

interface FabricsRequestData {
  fabrics: Fabrics;
}

interface SizesRequestData {
  sizes: Sizes;
}

// API Content
interface UserData {
  jwt: string;
  user: User;
}

type Categories = DataWrapper<CategoriesData[]>;
type SubCategories = DataWrapper<SubCategoriesData[]>;
type Invoices = DataWrapper<InvoicesData[]> & MetaInfo;
type Invoice = DataWrapper<InvoicesData>;
type Products = DataWrapper<ProductsData[]>;
type ProductsList = DataWrapper<ProductsData[]>;
type CreateInvoice = DataWrapper<InvoicesData>;
type Fabrics = DataWrapper<FabricsData[]>;
type Sizes = DataWrapper<SizesData[]>;

// API Data
type CategoriesData = StrapiDataWrapper<CategoryAttributes>;
type SubCategoriesData = StrapiDataWrapper<CategoryAttributes>;
type InvoicesData = StrapiDataWrapper<InvoiceAtributes>;
type ProductsData = StrapiDataWrapper<ProductAttributes>;
type FabricsData = StrapiDataWrapper<FabricsAttributes>;
type SizesData = StrapiDataWrapper<SizesAttributes>;

// Data attributes
interface CategoryAttributes {
  name: string;
  categories: Categories[];
}

interface CategoryAttributes {
  name: string;
  products: Products[];
}

interface ProductAttributes {
  name: string;
  description: string;
  images: any;
  size: string;
  materials: string;
  price: number;
  subcategory: CategoryAttributes;
}

interface InvoiceAtributes {
  paid: boolean;
  amount: number;
  products: ProductBuyed[];
  payment_id: string;
  order_id: string;
  shipment_address: AddressDetail;
  payment_method: string;
  payment_info: InvoicePaymentInfo[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface FabricsAttributes {
  name: string;
}

interface SizesAttributes {
  talla: string;
}

// Mappeds
interface CategoriesMapped {
  id: string;
  name: string;
  categories: CategoriesMapped[];
}

interface SubCategoriesMapped {
  id?: string;
  name: string;
  products: ProductsMapped[];
}

interface ProductsMapped extends ProductAttributes {
  id: string;
}

interface InvoicesMapped extends InvoiceAtributes {
  id: string;
}

interface FabricsMapped extends FabricsAttributes {
  id: string;
  name: string;
}

interface SizesMapped extends SizesAttributes {
  id: string;
  talla: string;
}

// Others ...
interface InvoicePaymentInfo {
  nombre: string;
  // last_name: string;
  email: string;
  monto: string;
  confirmacion: string;
  fecha_pago: string;
}

interface BCVSource {
  name: string;
  quote: string;
  last_retrieved: string;
}

interface BcvUsdResponse {
  name: string;
  pair: string;
  sources: {
    BCV: BCVSource;
  };
}

// Rest...

interface Category {
  id: string;
  name: string;
}

interface Image {
  id?: string;
  name: string;
  formats: Formats;
  alternativeText: string;
  url: string;
  caption?: string;
}

interface Formats {
  medium: ImageMetadata;
  small: ImageMetadata;
  thumbnail: ImageMetadata;
}

interface ImageMetadata {
  ext: string;
  url: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path?: string | null;
  size: number;
  width: number;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface InvoiceTableDetail extends InvoiceAtributes {
  id: string;
  id_invoice_user: number;
  date: string;
  status: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  customerId: string | null;
  first_name: string | null;
  last_name: string | null;
  shipping_address: AddressDetail | null;
  billing_address: AddressDetail | null;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

interface ProductBuyed {
  id: string;
  quantity: number;
  product: ProductsMapped;
}

interface AddressDetail {
  home: string;
  city: string;
  phone: string;
  address: string;
  addressLine1?: string;
  country: string;
  zipCode: string;
}
