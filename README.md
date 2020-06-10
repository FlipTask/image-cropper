[![CircleCI](https://circleci.com/gh/dev-ashishk/ssr-stream-setup.svg?style=shield)](https://circleci.com/gh/circleci/circleci-docs)

# Image Cropper

![img](https://i.imgur.com/MgGkCi0.png)

### Features

- Docker `(docker-engine >=v19.x)`
- Express ` >= v4.x`
- React ` >= v16.x`
- Redux ` >= v4.x`
- Loadable-components ` >= v5.x `
- Webpack ` >= v4.x`
- Babel ` >= v7.x`
- SASS
- Multer
- aws-sdk
- react-dropzone
- react-easy-crop

### Prerequisite
Before proceeding futher install following prerequisite dependencies to start:

- `Node.js version >= v10.x`
#

### Installation:

Steps to follow

1. Clone image-cropper

2. Change the current directory to `image-cropper`
```
cd image-cropper
```
3. Run the install `npm ci`

4. Create a new file `.env` and Copy .env.example into .env
 
5. To start the server run:
```
npm run dev 
```
or for Production
```
npm run build && npm run serve
```
> open <http://localhost:3000> in browser.

## Settings

- To upload images to S3 bucket, set the following Environment Variables in the .env file
```
STORE_IMG_IN_S3=false // Boolean (default: false)
// If set true then the following Environment Variables are needed.
S3_BUCKET_NAME=
S3_ACCESS_KEY_ID=
S3_SECRET_KEY=
S3_BUCKET_REGION=
```