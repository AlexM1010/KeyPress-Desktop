import { z } from 'zod';
import { BaseNodeSchema, NodeType } from '../base.js';

// Start node has no additional configuration
export const StartConfigSchema = z.object({});

// Start node schema
export const StartNodeSchema = BaseNodeSchema.extend({
  type: z.literal(NodeType.START),
  config: StartConfigSchema
});

// Type export
export type StartConfig = z.infer<typeof StartConfigSchema>;
export type StartNode = z.infer<typeof StartNodeSchema>;