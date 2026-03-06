$treks = @("annapurna-base-camp-trek", "miyar-valley-trek", "tungnath-deoriatal-trek", "bajredara-trek", "hilley-versey-trek", "beas-kund-trek", "barafsar-lake-trek", "kashmir-great-lakes-trek", "sandakphu-trek", "bhrigu-lake-trek", "hampta-pass-trek", "triund-trek", "prashar-lake-trek", "roopkund-trek", "kedarkantha-trek", "kuari-pass-trek", "brahmtal-trek", "rupin-pass-trek", "dayara-bugyal-trek", "tarsar-marsar-trek")

$pass = 0
$fail = 0
foreach ($trek in $treks) {
  $url = "http://localhost:3000/treks/$trek"
  $result = $(curl -s -o /dev/null -w "%{http_code}" "$url")
  if ($result -eq "200") {
    Write-Host "PASS: $trek"
    $pass++
  } else {
    Write-Host "FAIL: $trek ($result)"
    $fail++
  }
}
Write-Host ""
Write-Host "TOTAL: $pass passed, $fail failed"
