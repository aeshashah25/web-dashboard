# web-dashboard
React dashboard app with nodejs.

Project: Web-Based Dashboard (Organization & Team Management)

1. Setup Instructions:
To run the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/aeshashah25/web-dashboard.git
cd web-dashboard
Install dependencies: For Node.js (assuming you're using Express or another backend framework):

bash
Copy code
npm install
Start the local development server: For a Node.js server:

bash
Copy code
npm start
The server will typically run on http://localhost:3000.

for bckend:
cd backend(in other terminal)
node server.js
show on 5000/api/organization
Open the application in the browser: Go to http://localhost:3000 to view the web-based dashboard.

2. Description of Implemented Features:
1. Organization and Team Management:
The application allows users to:
Register organizations by providing basic details like name, email, and location.
Add teams under the registered organizations.
Add individual members to teams, each with a unique ID.
A hierarchical structure is displayed, showing organizations, their teams, and the members within each team.
2. File Upload:
Users can upload profile images for individual members.
The system supports both file uploads (via file selection) and camera uploads (using the camera).
Uploaded images are associated with individual profiles and displayed in the profile section.
3. Status Display:
Each member has a dynamic status marker, which indicates whether their image has been uploaded or not.
"Image Not Uploaded": Displayed in red.
"Image Uploaded": Displayed in green.
This status is shown in the individual list view to easily identify members who still need to upload their profile image.
4. API Endpoint:
A REST API is available to fetch all individual records in JSON format. This API endpoint is useful for external applications or services to interact with the dashboard.
GET /api/individuals - Returns a list of all individuals with their details, including name, team, organization, and profile status.
5. Optional Bonus:
The application is deployed on a free hosting platform, such as Netlify, Vercel, or Render.
A live demo is available at: live_link
3. Assumptions or Limitations:
Assumptions:
The application assumes that all organizations, teams, and members will have unique identifiers to prevent conflicts.
Profile images must be JPEG or PNG format to ensure compatibility.
Only one image per individual is allowed; replacing an image will overwrite the existing one.
Limitations:
User authentication is not implemented in this version. All users can interact with the dashboard without login.
The image upload feature may not handle large files efficiently, and there are no restrictions on the file size at the moment.
The status markers are static based on whether an image is uploaded or not. There is no additional status tracking beyond this.

