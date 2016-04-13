## Source Viewer
Source viewer and tag counter
## Synopsis

This project is a lightweight client-side web application designed to view the source of an existing webpage. It will count the html tags on the page and, if clicked, will highlight the tags in the source.

## Motivation

Written for a technical interview.

## Installation

Just run it on your favorite web server. I personally run it on an Amazon S3 bucket.

## Known Issues

Does not capture ALL HTML tags - namely body, head, and html. However, because there should only be one instance each of these tags, this seems less critical.
Should not rely on third-party CORs proxy.

## Contributors

Thanks to technoboy10 for setting up a cross-origin proxy. I plan on setting up my own soon!
