import { z } from 'zod';
import { TimeUnitSchema, ScrollDirectionSchema } from '../base.js';

// Duration value object
export const DurationSchema = z.object({
  value: z.number().min(0),
  unit: TimeUnitSchema
});

// Duration range for random delays
export const DurationRangeSchema = z.object({
  min: DurationSchema,
  max: DurationSchema
}).refine(
  (data) => {
    // Convert to milliseconds for comparison
    const minMs = convertToMilliseconds(data.min);
    const maxMs = convertToMilliseconds(data.max);
    return minMs <= maxMs;
  },
  {
    message: "Minimum duration must be less than or equal to maximum duration"
  }
);

// Scroll configuration
export const ScrollConfigSchema = z.object({
  directions: z.array(ScrollDirectionSchema).min(1),
  lines: z.number().min(1).max(100)
});

// Key combination for key press nodes
export const KeyCombinationSchema = z.object({
  key: z.string().min(1),
  modifiers: z.array(z.enum(['ctrl', 'alt', 'shift', 'meta'])).default([]),
  duration: DurationSchema.optional()
});

// Coordinate for absolute positioning
export const CoordinateSchema = z.object({
  x: z.number(),
  y: z.number()
});

// Relative offset for mouse movements
export const OffsetSchema = z.object({
  dx: z.number(),
  dy: z.number()
});

// Helper function to convert duration to milliseconds
function convertToMilliseconds(duration: z.infer<typeof DurationSchema>): number {
  switch (duration.unit) {
    case 'ms':
      return duration.value;
    case 's':
      return duration.value * 1000;
    case 'm':
      return duration.value * 60 * 1000;
    default:
      return duration.value;
  }
}

// Type exports
export type Duration = z.infer<typeof DurationSchema>;
export type DurationRange = z.infer<typeof DurationRangeSchema>;
export type ScrollConfig = z.infer<typeof ScrollConfigSchema>;
export type KeyCombination = z.infer<typeof KeyCombinationSchema>;
export type Coordinate = z.infer<typeof CoordinateSchema>;
export type Offset = z.infer<typeof OffsetSchema>;