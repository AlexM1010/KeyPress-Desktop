import { z } from 'zod';
import { BaseNodeSchema, NodeType, TimeUnit } from '../base.js';
import { DurationSchema, CoordinateSchema, OffsetSchema } from '../values/index.js';

// Mouse move type enum
export enum MouseMoveType {
  ABSOLUTE = 'absolute',
  RELATIVE = 'relative'
}

export const MouseMoveTypeSchema = z.nativeEnum(MouseMoveType);

// Mouse move configuration schema
export const MouseMoveConfigSchema = z.object({
  moveType: MouseMoveTypeSchema,
  coordinate: CoordinateSchema.optional(),
  offset: OffsetSchema.optional(),
  duration: DurationSchema.default({ value: 500, unit: TimeUnit.MILLISECONDS }),
  smooth: z.boolean().default(true)
}).refine(
  (data) => {
    // Absolute move must have coordinate
    if (data.moveType === MouseMoveType.ABSOLUTE && !data.coordinate) {
      return false;
    }
    // Relative move must have offset
    if (data.moveType === MouseMoveType.RELATIVE && !data.offset) {
      return false;
    }
    return true;
  },
  {
    message: "Absolute move requires coordinate, Relative move requires offset"
  }
);

// Mouse move node schema
export const MouseMoveNodeSchema = BaseNodeSchema.extend({
  type: z.literal(NodeType.MOUSE_MOVE),
  config: MouseMoveConfigSchema
});

// Type export
export type MouseMoveConfig = z.infer<typeof MouseMoveConfigSchema>;
export type MouseMoveNode = z.infer<typeof MouseMoveNodeSchema>;