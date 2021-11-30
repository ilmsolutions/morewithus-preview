# Everyday Jobs
An application that serves as a marketplace for employers, and employees. 

It comprises of two components: app, authorization-api. 

The app includes the UI, UI process components, and the business workflow components. The technology stack for the app includes: React, Handlebars, ExpressJS, NodeJS. The configurations for the app are maintained in [default.json](./app/src/config/default.json).

The authorization-api uses OAuth authorization code grant strategy to provision delegated authentication functionality to apps. It provisions through APIs both anonymous and authorized access to business entities. It contains the data access layer which interfaces with the backend DB. The technology stack for the api includes: React, ExpressJS, NodeJs, Mongoose, PassportJS. The configurations for the api are maintained in [default.json](./authorization-api/src/config/default.json).


# Authorization API Reference
Authorization API is a collection of api modules each having multiple endpoints; they are organized around authorization rules, and functionality. It also supports a minimal number of views in order to provide centralized OAuth based SSO for the Workwithme apps.

* [AdminAPI](#AdminAPI)
* [AuthAPI](#AuthAPI)
* [SettingsAPI](#SettingsAPI)
* [Client](#Client)
* [App](#App)
* [AuthApp](#AuthApp)

# Scheduled Jobs
Additionally the API runs regular scheduled jobs at varying duration. The scheduled jobs [module](./authorization-api/src/policies/schedulejobs.ts) handles job dealing with expiring subscriptions, and [sending out notifications](#Notifications).

# API Reference
[AdminAPI](./authorization-api/src/routers/AdminApiRouter.ts)
Admin API is a collection of endpoints that supports Administrator functionality

[AuthAPI](./authorization-api/src/routers/AuthApiRouter.ts)
Auth API is a collection of endpoints that supports Authorized User functionality

[SettingsAPI](./authorization-api/src/routers/SettingsApiRouter.ts)
Settings API is a collection of endpoints that supports site configuration functionality

[Client](./authorization-api/src/routers/ClientRouter.ts)
Client supports OAuth2 code grant client validation functionality

[App](./authorization-api/src/routers/AppRouter.ts)
App supports OAuth2 code grant two legged authorization 

[AuthApp](./authorization-api/src/routers/AuthAppRouter.ts)
AuthApp supports OAuth2 code grant two legged authorization

# Business Rules
The configuration of the business rules is controlled through the Administrator Configuration panel.

### Email Notifications
The "Email Notifications" tab in the configuration panel allows the admin to set the duration, and frequency at which the notifications has to be sent. It also allows the admin to update the notification text.

* Inactive Individual Employee [code](./authorization-api/src/policies/schedulejobs.ts#L176)
**NOTE:** The duration property should numerically match with the duration property in the "Rules" tab. If the rule is to expire an account which is inactive for 90 days. Then the duration property in "Rules" tab should be -90 days, and for the email notification should be 90 days. 





