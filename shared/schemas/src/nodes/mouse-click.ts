import { z } from 'zod';
import { BaseNodeSchema, NodeType, MouseButtonSchema, TimeUnit } from '../base.js';
import { DurationSchema, ScrollConfigSchema } from '../values/index.js';

// Mouse click configuration schema
export const MouseClickConfigSchema = z.object({
  buttonType: MouseButtonSchema,
  clickCount: z.number().min(1).max(1000).default(1),
  clickDelay: DurationSchema.default({ value: 100, unit: TimeUnit.MILLISECONDS }),
  pressReleaseDelay: DurationSchema.default({ value: 50, unit: TimeUnit.MILLISECONDS }),
  releaseAfterPress: z.boolean().default(true),
  scrollConfig: ScrollConfigSchema.optional()
});

// Mouse click node schema
export const MouseClickNodeSchema = BaseNodeSchema.extend({
  type: z.literal(NodeType.MOUSE_CLICK),
  config: MouseClickConfigSchema
});

// Type export
export type MouseClickConfig = z.infer<typeof MouseClickConfigSchema>;
export type MouseClickNode = z.infer<typeof MouseClickNodeSchema>;