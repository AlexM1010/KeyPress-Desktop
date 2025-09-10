import { z } from 'zod';
import { BaseNodeSchema, NodeType, DelayTypeSchema } from '../base.js';
import { DurationSchema, DurationRangeSchema } from '../values/index.js';

// Delay configuration schema
export const DelayConfigSchema = z.object({
  delayType: DelayTypeSchema,
  duration: DurationSchema.optional(),
  range: DurationRangeSchema.optional()
}).refine(
  (data) => {
    // Fixed delay must have duration
    if (data.delayType === 'Fixed' && !data.duration) {
      return false;
    }
    // Random delay must have range
    if (data.delayType === 'Random' && !data.range) {
      return false;
    }
    return true;
  },
  {
    message: "Fixed delay requires duration, Random delay requires range"
  }
);

// Delay node schema
export const DelayNodeSchema = BaseNodeSchema.extend({
  type: z.literal(NodeType.DELAY),
  config: DelayConfigSchema
});

// Type export
export type DelayConfig = z.infer<typeof DelayConfigSchema>;
export type DelayNode = z.infer<typeof DelayNodeSchema>;