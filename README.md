#MyWebsite

https://ericconnelly.me

https://ericgeerts.com

Static serverless personal website hosted in S3 and delivered by CloudFront.

Contains JavaScript that makes custom API calls to an AWS API Gateway integrated with Lambda and AWS SES in in order to generate email messages to my personal inbox (while not exposing my actual email), as well as forward them to the submitter's inbox.

Automatic CodePipeline detects changes to this repository, tests them, deploys it, and rolls back if issues.
