<?php
error_reporting(0);
ini_set('display_errors', 0);

try {
    // Get the current page URL
    $currentUrl = $_SERVER['REQUEST_URI'];

    // Extract the last part of the URL and remove its extension
    $parts = pathinfo($currentUrl);
    $pageName = basename($parts['filename']);

    // Check if it's the index page and set the parameter accordingly
    if ($pageName === 'index' || $pageName === '') {
        $seoPage = 'home'; // If it's the index page, set the parameter to 'home'
    } else {
        $seoPage = $pageName; // Otherwise, use the extracted page name
    }

    if ($seoPage) {
        // Define the URL you want to send the POST request to
        $url = 'http://ap-artem.elloweb.com/web/seo';

        // Define the form data as an associative array
        $formData = array(
            "page" => $seoPage
        );

        // Initialize cURL session
        $ch = curl_init();

        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData)); // Encode the data as a query string

        // Execute cURL request and store the response
        $response = curl_exec($ch);

        // Check for cURL errors
        if ($response === false) {
            throw new Exception('cURL error: ' . curl_error($ch));
        }

        // Close the cURL session
        curl_close($ch);

        // Parse the JSON response
        $jsonData = json_decode($response, true);

        // Check if JSON decoding was successful
        if ($jsonData === null) {
            throw new Exception('Error parsing JSON response');
        } else if ($jsonData['status'] == false) {
            throw new Exception('JSON response status is false');
        } else if ($jsonData['status'] == true) {
            $title = $jsonData['data']['s_title'];
            $description = $jsonData['data']['s_description'];
            $url = $jsonData['data']['s_url'];
            $keywords = $jsonData['data']['s_keywords'];

            echo "<meta name='title' content='$title' />\n";
            echo "<meta name='description' content='$description' />\n";
            echo "<meta name='url' content='$url' />\n";
            echo "<meta name='keywords' content='$keywords' />\n";
        }
    }
} catch (Exception $e) {
    
}
?>
