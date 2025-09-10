# PowerShell script for Windows schema generation
param(
    [switch]$Install = $false
)

$SHARED_SCHEMAS_DIR = "shared/schemas"
$INTERNAL_SCHEMA_DIR = "internal/schema"

Write-Host "🔧 Setting up schema generation toolchain..." -ForegroundColor Cyan

# Ensure directories exist
if (-not (Test-Path $INTERNAL_SCHEMA_DIR)) {
    New-Item -ItemType Directory -Path $INTERNAL_SCHEMA_DIR -Force | Out-Null
    Write-Host "✅ Created directory: $INTERNAL_SCHEMA_DIR" -ForegroundColor Green
}

if ($Install) {
    # Install dependencies for shared schemas
    Write-Host "📦 Installing schema dependencies..." -ForegroundColor Yellow
    try {
        Set-Location $SHARED_SCHEMAS_DIR
        npm install
        Set-Location ../..
        Write-Host "✅ Schema dependencies installed" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to install schema dependencies: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Generate Go structs from TypeScript schemas
Write-Host "🏗️  Generating Go structs from TypeScript schemas..." -ForegroundColor Yellow
try {
    Set-Location $SHARED_SCHEMAS_DIR
    npm run build
    Set-Location ../..
    Write-Host "✅ Go structs generated successfully" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Schema generation will be available after TypeScript schemas are created" -ForegroundColor Yellow
}

Write-Host "🎉 Schema generation toolchain setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create TypeScript schemas in shared/schemas/src/" -ForegroundColor White
Write-Host "2. Run 'powershell scripts/generate-schemas.ps1' to regenerate Go structs" -ForegroundColor White
Write-Host "3. Import generated structs in your Go code from internal/schema package" -ForegroundColor White