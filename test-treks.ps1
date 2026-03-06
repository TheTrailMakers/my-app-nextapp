$treks = @(
  "annapurna-base-camp-trek",
  "miyar-valley-trek",
  "tungnath-deoriatal-trek",
  "bajredara-trek",
  "hilley-versey-trek",
  "beas-kund-trek",
  "barafsar-lake-trek",
  "kashmir-great-lakes-trek",
  "sandakphu-trek",
  "bhrigu-lake-trek",
  "hampta-pass-trek",
  "triund-trek",
  "prashar-lake-trek",
  "roopkund-trek",
  "kedarkantha-trek",
  "kuari-pass-trek",
  "brahmtal-trek",
  "rupin-pass-trek",
  "dayara-bugyal-trek",
  "tarsar-marsar-trek"
)

Write-Host "Testing 20 trek pages..." -ForegroundColor Green
Write-Host "================================`n"

$passCount = 0
$failCount = 0

foreach ($trek in $treks) {
  $url = "http://localhost:3000/treks/$trek"
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    Write-Host "✓ $trek : $($response.StatusCode)" -ForegroundColor Green
    $passCount++
  } catch {
    Write-Host "✗ $trek : FAILED" -ForegroundColor Red
    $failCount++
  }
}

Write-Host "`n================================"
Write-Host "Results: $passCount passed, $failCount failed out of $($treks.Count)" -ForegroundColor Cyan
