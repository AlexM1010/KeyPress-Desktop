// Export all node schemas
export * from './start.js';
export * from './mouse-click.js';
export * from './mouse-move.js';
export * from './key-press.js';
export * from './delay.js';
export * from './type-string.js';

import { z } from 'zod';
import { StartNodeSchema } from './start.js';
import { MouseClickNodeSchema } from './mouse-click.js';
import { MouseMoveNodeSchema } from './mouse-move.js';
import { KeyPressNodeSchema } from './key-press.js';
import { DelayNodeSchema } from './delay.js';
import { TypeStringNodeSchema } from './type-string.js';

// Union schema for all node types
export const NodeSchema = z.discriminatedUnion('type', [
  StartNodeSchema,
  MouseClickNodeSchema,
  MouseMoveNodeSchema,
  KeyPressNodeSchema,
  DelayNodeSchema,
  TypeStringNodeSchema
]);

// Type export for the union
export type Node = z.infer<typeof NodeSchema>;