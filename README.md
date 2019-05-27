# Mythngapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Site

This project is deployed to AWS S3/CloudFront at https://d12vet4pr23f3z.cloudfront.net/.  It will show mock data as a default, but you can enter your own base url to access live data.  

## API calls

Due to CORS restrictions, you will need to use an intermediate service to accept and forward API calls.  You can find api.php file in the /ext/ directory as one possible API redirect tool.  It would need to be installed on your own server that has access to the MythTV backend.
