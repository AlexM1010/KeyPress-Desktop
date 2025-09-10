import { z } from 'zod';
import { BaseNodeSchema, NodeType, TimeUnit } from '../base.js';
import { DurationSchema } from '../values/index.js';

// Type string configuration schema
export const TypeStringConfigSchema = z.object({
  text: z.string().min(1),
  typingSpeed: DurationSchema.default({ value: 50, unit: TimeUnit.MILLISECONDS }),
  clearBefore: z.boolean().default(false),
  pressEnter: z.boolean().default(false)
});

// Type string node schema
export const TypeStringNodeSchema = BaseNodeSchema.extend({
  type: z.literal(NodeType.TYPE_STRING),
  config: TypeStringConfigSchema
});

// Type export
export type TypeStringConfig = z.infer<typeof TypeStringConfigSchema>;
export type TypeStringNode = z.infer<typeof TypeStringNodeSchema>;