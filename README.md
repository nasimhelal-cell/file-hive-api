
# FileHive-API

## Description
This is a sophisticated file management app. You can easily upload, update, edit, delete, comment, and share your files.

## Features
- Feature 1: Role-based user authentication
- Feature 2: Create, update, edit, delete folders and files. You can also create nested folders
- Feature 3: One can place comments and annotations for a file

# FileHive necessary files and file links
The following documents outline the key requirements and design considerations for FileHive:

### Project Requirements:
- **Project Requirements**: [Download here](https://drive.google.com/file/d/14Lj_C1NDF96JrByKIYZtshW6vBSWAgjt/view?usp=sharing)
- **Developer-Friendly Requirements**: [Download here](https://drive.google.com/file/d/1FeB2pMxJv0hCSdt0nimtFtHBJDp-ZhRF/view?usp=sharing)

### Documentation:
- **Raff Documentation**: [Download here](https://drive.google.com/file/d/1eyfBELhgVwjplhQUZi3hOjf4y2lCLS9L/view?usp=drive_link)
- **Swagger Documentation**: [View API documentation](https://app.swaggerhub.com/apis/NASIMHELAL123/FileHive/1.0.0)

### Development:
- **Database Schema and Design**: [Download here](https://drive.google.com/file/d/1_gbwNTvBKojJxUmO1Pl_bRtx3XQyzNYB/view?usp=sharing)
- **API Folder Structure**: [Download here](https://drive.google.com/file/d/1oThJn1DSl6_X49F4UgpEM5dIehuqxOKB/view?usp=sharing)


## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Swagger for API documentation
- Jest for testing
- Other relevant technologies

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v18 or above)
- npm (v8 or above) or Yarn
- MongoDB

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/nasimhelal-cell/file-hive-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd file-hive-api
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    PORT=4000
    DB_URL=mongodb://localhost:27017/filehive
    JWT_SECRET=secret
    ```

2. Modify other configurations as necessary.

## Running the Application
### Development
To run the application in development mode:
```bash
npm start

