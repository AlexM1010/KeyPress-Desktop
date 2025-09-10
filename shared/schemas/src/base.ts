import { z } from 'zod';

// Schema version for migration support
export const SCHEMA_VERSION = '1.0.0';

// Base enums
export enum NodeType {
  START = 'StartNode',
  MOUSE_CLICK = 'MouseClickNode',
  MOUSE_MOVE = 'MouseMoveNode',
  KEY_PRESS = 'KeyPressNode',
  DELAY = 'DelayNode',
  TYPE_STRING = 'TypeStringNode'
}

export enum MouseButton {
  LEFT = 'left',
  RIGHT = 'right',
  MIDDLE = 'middle'
}

export enum DelayType {
  FIXED = 'Fixed',
  RANDOM = 'Random'
}

export enum TimeUnit {
  MILLISECONDS = 'ms',
  SECONDS = 's',
  MINUTES = 'm'
}

export enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

// Zod schemas for enums
export const NodeTypeSchema = z.nativeEnum(NodeType);
export const MouseButtonSchema = z.nativeEnum(MouseButton);
export const DelayTypeSchema = z.nativeEnum(DelayType);
export const TimeUnitSchema = z.nativeEnum(TimeUnit);
export const ScrollDirectionSchema = z.nativeEnum(ScrollDirection);

// Base node metadata schema
export const NodeMetadataSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  version: z.string().default(SCHEMA_VERSION),
  created: z.date().default(() => new Date()),
  modified: z.date().default(() => new Date())
});

// Position schema
export const PositionSchema = z.object({
  x: z.number(),
  y: z.number()
});

// Base node schema that all nodes extend
export const BaseNodeSchema = z.object({
  id: z.string().uuid(),
  type: NodeTypeSchema,
  position: PositionSchema,
  metadata: NodeMetadataSchema
});

// Edge schema
export const EdgeSchema = z.object({
  id: z.string(),
  source: z.string().uuid(),
  target: z.string().uuid()
});

// Flow metadata schema
export const FlowMetadataSchema = z.object({
  version: z.string().default(SCHEMA_VERSION),
  created: z.date().default(() => new Date()),
  modified: z.date().default(() => new Date()),
  name: z.string().optional(),
  description: z.string().optional()
});

// Complete flow schema
export const FlowSchema = z.object({
  nodes: z.array(BaseNodeSchema),
  edges: z.array(EdgeSchema),
  metadata: FlowMetadataSchema
});

// Type exports for TypeScript usage
export type NodeMetadata = z.infer<typeof NodeMetadataSchema>;
export type Position = z.infer<typeof PositionSchema>;
export type BaseNode = z.infer<typeof BaseNodeSchema>;
export type Edge = z.infer<typeof EdgeSchema>;
export type FlowMetadata = z.infer<typeof FlowMetadataSchema>;
export type Flow = z.infer<typeof FlowSchema>;