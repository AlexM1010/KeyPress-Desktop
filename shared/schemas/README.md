# Shared Schema Definitions

This package contains the unified schema definitions for the Keypress automation tool, providing type-safe communication between the TypeScript frontend and Go backend.

## Overview

The schema system uses:
- **Zod** for TypeScript runtime validation and schema definition
- **QuickType** for automatic Go struct generation from TypeScript schemas
- **Build scripts** for automated code generation

## Directory Structure

```
shared/schemas/
├── src/
│   ├── index.ts          # Main schema exports
│   ├── base.ts           # Base node schemas and enums
│   ├── nodes/            # Node-specific schemas
│   └── values/           # Value object schemas (Duration, Position, etc.)
├── dist/                 # Compiled TypeScript output
├── package.json          # Dependencies and build scripts
└── tsconfig.json         # TypeScript configuration
```

## Usage

### Development Workflow

1. **Define schemas** in TypeScript using Zod:
   ```typescript
   // src/nodes/mouse-click.ts
   import { z } from 'zod';
   import { BaseNodeSchema } from '../base.js';
   
   export const MouseClickNodeSchema = BaseNodeSchema.extend({
     type: z.literal('MouseClickNode'),
     config: z.object({
       buttonType: z.enum(['left', 'right', 'middle']),
       clickCount: z.number().min(1).max(1000)
     })
   });
   ```

2. **Generate Go structs** automatically:
   ```bash
   npm run build
   ```

3. **Use in frontend** with full type safety:
   ```typescript
   import { MouseClickNodeSchema } from '@keypress/schemas';
   
   const node = MouseClickNodeSchema.parse(data); // Runtime validation
   ```

4. **Use in backend** with generated structs:
   ```go
   import "keypress/internal/schema"
   
   var node schema.MouseClickNode
   json.Unmarshal(data, &node)
   ```

## Build Scripts

- `npm run build` - Generate Go structs from TypeScript schemas
- `npm run validate` - Type-check TypeScript without emitting files

## Generated Output

Go structs are automatically generated to `../../internal/schema/generated.go` with:
- Proper JSON tags for serialization
- Validation tags for go-playground/validator
- Type-safe field access

## Schema Versioning

Schemas include version information for migration support:
- Breaking changes increment major version
- New optional fields increment minor version
- Bug fixes increment patch version