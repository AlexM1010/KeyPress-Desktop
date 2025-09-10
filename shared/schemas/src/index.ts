// Export base schemas and types
export * from './base.js';

// Export value object schemas
export * from './values/index.js';

// Export all node schemas
export * from './nodes/index.js';

// Re-export commonly used schemas for convenience
export {
  BaseNodeSchema,
  EdgeSchema,
  FlowSchema,
  NodeTypeSchema,
  MouseButtonSchema,
  DelayTypeSchema
} from './base.js';

export {
  NodeSchema
} from './nodes/index.js';

export {
  MouseClickNodeSchema,
  DelayNodeSchema,
  StartNodeSchema,
  MouseMoveNodeSchema,
  KeyPressNodeSchema,
  TypeStringNodeSchema
} from './nodes/index.js';

export {
  DurationSchema,
  DurationRangeSchema,
  ScrollConfigSchema,
  KeyCombinationSchema,
  CoordinateSchema,
  OffsetSchema
} from './values/index.js';

// Schema version constant
export { SCHEMA_VERSION } from './base.js';