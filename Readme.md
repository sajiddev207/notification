Notification Service - Vision Pro

The Notification Service for the Vision Pro project handles the delivery of notifications via multiple channels such as SMS, email, and push notifications. It is designed to be modular, scalable, and secure, with the ability to handle large volumes of notifications via a queuing system.

Features
    Modular Notification System: Supports sending notifications via SMS (Twilio), Email (AWS SES), and Push (Firebase).
    
    Queue-Based Processing: Uses Redis-backed Bull queues for asynchronous, scalable notification handling.
    
    Broadcast Capabilities: Supports sending notifications to single users, selected groups, or broadcasting to all users.
    
    Custom Notification Preferences: Users can manage their notification preferences (email, SMS, push).
    
    GDPR Compliance: Ensures data privacy and gives users control over the notifications they receive.
    
    Security: OAuth tokens and API keys for secure communication. Rate limiting and SSL for secure data transmission.

Prerequisites
    Make sure you have the following installed on your machine:

    Node.js (version 14 or higher)
    PostgreSQL (for the database)
    Redis (for queuing via Bull)
    Docker (optional for running the service in containers)
    Postman (for API testing)

Getting Started
    Follow these steps to set up and run the Notification Service locally.

    1. Clone the Repository
    git clone https://git.iloggerz.com/vision-pro/vision-pro-notification-ms.git
    cd vision-pro-notification-ms
    
    2. Install Dependencies
    npm install

    3. Set Up Environment Variables
    Create a .env file in the root directory and configure the environment variables as follows:

    # Server Configuration
    PORT=3002
    NODE_ENV=development

    # External Service URLs
    USER_SERVICE_URL=http://localhost:3000
    CORE_SERVICE_URL=http://localhost:3001

    # Database Configuration (PostgreSQL)
    DB_NAME=notifications
    DB_USER=postgres
    DB_PASS=postgres
    DB_HOST=localhost
    DB_PORT=5432

    # Redis Configuration
    REDIS_HOST=localhost
    REDIS_PORT=6379

    # AWS SES Configuration
    AWS_REGION=your-aws-region
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    SENDER_EMAIL=your-sender-email

    # Twilio Configuration
    TWILIO_ACCOUNT_SID=your-twilio-account-sid
    TWILIO_AUTH_TOKEN=your-twilio-auth-token
    TWILIO_PHONE_NUMBER=your-twilio-phone-number

    # Firebase Configuration
    FIREBASE_PROJECT_ID=your-firebase-project-id
    FIREBASE_CLIENT_EMAIL=your-firebase-client-email
    FIREBASE_PRIVATE_KEY=your-firebase-private-key
    
    4. Running the Service
    To start the service locally, use the following command:

    npm run dev
    The service will start running on the port specified in the .env file (default: 3002).

    5. Database Setup
    Ensure PostgreSQL and Redis are running. You can start these services locally or use Docker for containerized databases.

    To start with Docker:
    docker-compose up -d
    This command will set up PostgreSQL and Redis for the service.

    6. Testing the Service via Postman
        6.1. Send Notification (Email, SMS, or Push)

        URL: POST http://localhost:3002/api/notifications/send-notification
        Body (JSON):

        {
        "type": "email", // or "sms" or "push"
        "recipients": [
            { "email": "john@example.com", "phone": "+1234567890", "deviceToken": "your-device-token" }
        ],
        "message": "This is your notification message"
        }

        6.2. KYC Reminder (Cron Job Example)

        The service runs a daily cron job at 9 AM to send KYC reminders. This job can be tested by observing the logs or via direct triggers through Postman if necessary.

    7. Running Tests
        The project includes unit tests using Jest. To run the tests, execute the following command:

        npm run test

Docker Support
    This service is containerized using Docker for easy deployment.

    1. Build and Run Docker Container:
    docker-compose up --build
    This will create the necessary containers for the Notification Service and its dependencies like PostgreSQL and Redis.

    2. Stopping the Containers:
    docker-compose down

Folder Structure
    .
    ├── config
    │   ├── awsSesConfig.js         # AWS SES configuration
    │   ├── firebaseConfig.js       # Firebase Cloud Messaging configuration
    │   ├── twilioConfig.js         # Twilio configuration
    │   └── database.js             # PostgreSQL database configuration
    ├── controllers
    │   ├── notificationController.js  # Main notification controller
    │   ├── emailController.js         # Email notification controller
    │   ├── smsController.js           # SMS notification controller
    │   ├── pushController.js          # Push notification controller
    │   └── broadcastController.js     # Broadcast notification controller
    ├── services
    │   ├── emailService.js            # Email notification service (AWS SES)
    │   ├── smsService.js              # SMS notification service (Twilio)
    │   ├── pushNotificationService.js # Push notification service (Firebase)
    │   └── broadcastService.js        # Broadcast notification service
    ├── helpers
    │   ├── queueHelper.js             # Queue handling using Bull
    │   ├── notificationHelper.js      # General notification helpers
    │   └── authHelper.js              # Helper for user authentication via User Service
    ├── middlewares
    │   └── authMiddleware.js          # Authentication middleware (using User Service)
    ├── models
    │   └── userPreferencesModel.js    # User preferences for notifications (email, SMS, push)
    ├── queue
    │   └── notificationQueue.js       # Queue for processing notifications
    ├── routes
    │   ├── notificationRoutes.js      # Routes for notification endpoints
    │   ├── emailRoutes.js             # Routes for email notifications
    │   ├── smsRoutes.js               # Routes for SMS notifications
    │   ├── pushRoutes.js              # Routes for push notifications
    │   └── broadcastRoutes.js         # Routes for broadcast notifications
    ├── server.js                       # Server entry point
    ├── .env                            # Environment variables configuration
    ├── package.json                    # Node.js dependencies
    └── tests
        └── notificationService.test.js # Unit tests for the Notification Service

API Endpoints
    POST /api/notifications/send-notification

    Sends a notification to the specified recipients (Email, SMS, or Push).
    Body:
    {
    "type": "email" | "sms" | "push",
    "recipients": [ { "email": "", "phone": "", "deviceToken": "" } ],
    "message": "Notification message"
    }
    Daily KYC Reminder Job (runs automatically via a cron job at 9 AM every day).

Technologies Used
    Node.js: JavaScript runtime for server-side programming.
    Express.js: Web framework for building APIs.
    Sequelize: ORM for managing PostgreSQL databases.
    PostgreSQL: Relational database for storing data.
    Redis: In-memory data structure store for queuing notifications.
    Bull: A Node.js queue library backed by Redis.
    AWS SES: Amazon Web Services' Simple Email Service for sending emails.
    Twilio: API for sending SMS notifications.
    Firebase: Service for sending push notifications via Firebase Cloud Messaging (FCM).
    Jest: Unit testing framework.
    Docker: Containerization of the service.

License
    This project is licensed under the MIT License.