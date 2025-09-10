#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const SHARED_SCHEMAS_DIR = 'shared/schemas';
const INTERNAL_SCHEMA_DIR = 'internal/schema';

console.log('🔧 Setting up schema generation toolchain...');

// Ensure directories exist
if (!existsSync(INTERNAL_SCHEMA_DIR)) {
  mkdirSync(INTERNAL_SCHEMA_DIR, { recursive: true });
  console.log(`✅ Created directory: ${INTERNAL_SCHEMA_DIR}`);
}

// Install dependencies for shared schemas
console.log('📦 Installing schema dependencies...');
try {
  execSync('npm install', { 
    cwd: SHARED_SCHEMAS_DIR, 
    stdio: 'inherit' 
  });
  console.log('✅ Schema dependencies installed');
} catch (error) {
  console.error('❌ Failed to install schema dependencies:', error.message);
  process.exit(1);
}

// Generate Go structs from TypeScript schemas
console.log('🏗️  Generating Go structs from TypeScript schemas...');
try {
  execSync('npm run build', { 
    cwd: SHARED_SCHEMAS_DIR, 
    stdio: 'inherit' 
  });
  console.log('✅ Go structs generated successfully');
} catch (error) {
  console.log('⚠️  Schema generation will be available after TypeScript schemas are created');
}

console.log('🎉 Schema generation toolchain setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Create TypeScript schemas in shared/schemas/src/');
console.log('2. Run "node scripts/generate-schemas.js" to regenerate Go structs');
console.log('3. Import generated structs in your Go code from internal/schema package');