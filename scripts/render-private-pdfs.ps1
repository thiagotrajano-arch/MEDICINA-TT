param(
  [Parameter(Mandatory = $true)][string]$InputDir,
  [Parameter(Mandatory = $true)][string]$OutputDir,
  [int]$FirstPage = 1,
  [int]$LastPage = 1,
  [switch]$AllPages
)

$ErrorActionPreference = 'Stop'
$popplerCandidates = @(
  $env:CODEX_POPPLER_PDFTOPPM,
  (Join-Path $env:LOCALAPPDATA 'codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe'),
  'C:\Users\Adm\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe'
)
$pdftoppm = $popplerCandidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $pdftoppm) { throw 'pdftoppm.exe nao encontrado. Defina CODEX_POPPLER_PDFTOPPM para o executavel do Poppler.' }

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
foreach ($pdf in Get-ChildItem -LiteralPath $InputDir -Filter '*.pdf' -File) {
  $prefix = Join-Path $OutputDir $pdf.BaseName
  $args = @('-png', '-r', '120')
  if ($AllPages) { } else { $args += @('-f', $FirstPage, '-l', $LastPage) }
  $args += @($pdf.FullName, $prefix)
  & $pdftoppm @args | Out-Null
  if ($LASTEXITCODE -ne 0) { Write-Warning "Falha de renderizacao: $($pdf.Name)" }
}

Write-Output (Get-ChildItem -LiteralPath $OutputDir -Filter '*.png' -File | Measure-Object).Count
