// Sample TagUI script that demonstrates basic web automation

// Use variable passed from Go
var search_term = var_1  // var_1 will be passed from Go

// Start at website
https://www.google.com

// Type search term and submit
type search-box as search_term
click search-button

// Wait for results
wait 2

// Extract first result
read first-result to result
echo result