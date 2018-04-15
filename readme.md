# Google Cloud Functions Example

Small demo to demonstrate how to use Google Cloud Functions to do something useful: in this case, to send an email (intercepted with Ethereal) and write to a Firebase database. Should give you a pretty good picture of how a project would have to be setup in order to make this work.

Setting up CORS and stuff can truly be a pain, especially if this is new to you. I hope this will make it easier to infer some kind of way of handling all of this to set up your own projects.

## Structure

I've done `firebase init` here originally, so most files are generated from that.

The actual code as such is in `index.html` and `functions/index.js`.

## Prerequisites

You need a few things first:

1.  Firebase and Google Cloud account
2.  Blaze (pay-as-you-go) billing plan: This includes the same free stuff as the the regular free tier. Without it you won't be able to connect via SMTP's such as those that Google or Outlook use
3.  You may need a local server to run the `index.html` page. A suggestion is [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) which is super-easy and user-friendly, especially if you are new to that stuff.

## Setup

* Create a Firebase realtime database
* It's fine for testing and learning purposes to let the rights be in "Test Mode" where it's open to anything and anyone

## Available commands

* `firebase login` and `firebase logout` are valuable if you have many Google accounts and want to use the right account when dealing with deployment
* `firebase deploy` to send off your files in the `functions` folder
* `firebase init` if you are doing this from scratch, but I will assume you won't if you are using this

## Firebase console

Go to the [Firebase console](https://console.firebase.google.com/) so you can view the database and functions, including logs.

## Implementation details

* CORS is setup on the client-side
* CORS is setup on the server-side
* Vanilla event handling on the Submit event with very basic validation
* The cloud function will run on request (`functions.https.onRequest()`) to the URL created for this specific function
* First it will send a mail with Nodemailer
* Then it will write to Firebase
* Code for Nodemailer is essentially the same as they are using in their own first example
