type FieldType = 'string' | 'number' | 'boolean'; // Field data types
type WidgetType = 'text' | 'select' | 'textarea' | 'date';

// Complete form structure
export interface FormSchema {
  type: string; // Type of the form schema
  layout: Array<Layout>; // Universal layout interface
  widget: { type: string }; // Widget configuration for the entire form
  properties: Record<string, BaseField>; // Fields in the form
  required: string[]; // Required fields in the form
}

// Layout Interfaceexport interface Layout {
export interface Layout {
  type: string; // Type of layout (e.g., "section", "columns", "card")
  items?: Array<Item>; // Fields (string) or nested layouts (Layout)
  config?: {
    columns?: Array<{
      width: number; // Width of the column
      content: number[]; // Indices of items within this column
    }>;
    innerPageLayout?: boolean; // Determines if nested layout is treated as a page
  };
  widget?: {
    type: string; // Type of widget for the layout
  };
}

export interface Item {
  type: string; // The type of layout (e.g., "layout")
  items: string[]; // Array of field names or nested layout references
  config: ItemConfig; // Configuration for the layout
  widget: WidgetConfig; // Widget configuration for the layout
}

export interface ItemConfig {
  columns: ColumnConfig[]; // Array of column configurations
  innerPageLayout: boolean; // Determines if the layout is treated as a nested page
}

export interface ColumnConfig {
  width: number; // Column width in percentage
  content: number[]; // Array of indices pointing to `items` in the layout
}

export interface WidgetConfig {
  type: string; // Type of the widget (e.g., "dtl-fluent-columns")
}

export interface BaseField {
  type: FieldType; // Field data type (e.g., "string")
  title: string; // Field label
  widget: {
    type: WidgetType; // Widget type (e.g., text, select)
    validationMessages?: {
      pattern?: string; // Message for pattern validation errors
      required?: string; // Message for missing required fields
      minLength?: string; // Message for short values
      maxLength?: string; // Message for long values
    };
  };
  oneOf?: Array<{ const: string; title: string }>; // Options for "select" fields
  pattern?: string; // Regex for validation
  config?: Record<string, unknown>; // Optional additional configuration
  localizationData?: Record<string, LocalizationData>; // Localization data for dynamic language support
}

interface LocalizationData {
  [key: string]: {
    // Dynamic keys for languages like "en", "cs", etc.
    title?: string; // Localized field title
    widget?: {
      tooltip?: string; // Localized tooltip
      placeholder?: string; // Localized placeholder text
    };
  };
}
