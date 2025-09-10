#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Import the compiled schemas
import('../dist/index.js').then((schemas) => {
  console.log('🔧 Generating JSON schema from Zod schemas...');

  // Ensure temp directory exists
  if (!existsSync('./temp')) {
    mkdirSync('./temp', { recursive: true });
  }

  // Generate JSON schema for the main Flow schema
  const jsonSchema = zodToJsonSchema(schemas.FlowSchema, {
    name: 'Flow',
    $refStrategy: 'none' // Inline all references for quicktype compatibility
  });

  // Write the JSON schema
  writeFileSync('./temp/schema.json', JSON.stringify(jsonSchema, null, 2));
  
  console.log('✅ JSON schema generated successfully at ./temp/schema.json');
}).catch((error) => {
  console.error('❌ Failed to generate JSON schema:', error.message);
  process.exit(1);
});