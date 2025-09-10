import { z } from 'zod';
import { BaseNodeSchema, NodeType, TimeUnit } from '../base.js';
import { KeyCombinationSchema, DurationSchema } from '../values/index.js';

// Key press configuration schema
export const KeyPressConfigSchema = z.object({
  keys: z.array(KeyCombinationSchema).min(1),
  sequential: z.boolean().default(true),
  interval: DurationSchema.default({ value: 100, unit: TimeUnit.MILLISECONDS })
});

// Key press node schema
export const KeyPressNodeSchema = BaseNodeSchema.extend({
  type: z.literal(NodeType.KEY_PRESS),
  config: KeyPressConfigSchema
});

// Type export
export type KeyPressConfig = z.infer<typeof KeyPressConfigSchema>;
export type KeyPressNode = z.infer<typeof KeyPressNodeSchema>;