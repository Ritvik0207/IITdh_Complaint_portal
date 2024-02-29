
# IITdh Unified HelpDesk (IUHD)

IUHD is a helpdesk site to streamline all the work requests in a single format. Every request or feedback regarding food, water, electricity, hostel issues, etc., can be posted here, and the respective admins can check and allot the workforce as required.

## Instructions to Run the Project:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/IUHD.git
   ```

2. **Install Dependencies:**
   - Navigate to the project's main folder and install dependencies.
     ```bash
     npm install
     ```
   - Navigate to the `frontend` folder and install frontend-related dependencies.
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up PostgreSQL Database:**
   - Access PostgreSQL using the command:
     ```bash
     psql -U postgres -h localhost
     ```
   - Create a new database named `helpdesk`:
     ```sql
     CREATE DATABASE helpdesk;
     ```
   - Connect to the `helpdesk` database:
     ```sql
     \c helpdesk
     ```
   - Import the database schema from `database.sql`:
     ```sql
     \i database.sql
     ```
   - For admin access, manually change the `is_admin` property to true:
     ```sql
     UPDATE student
     SET is_admin = true
     WHERE name = 'admin';
     ```

4. **Update Database Credentials:**
   - Change the database credentials in `backend/index.js` file.

5. **Run the Application:**
   - Navigate back to the main folder and run the command:
     ```bash
     npm run dev
     ```

6. **Access the Site:**
   - Open your browser and access the IUHD site from [http://localhost:your-port](http://localhost:your-port).

Feel free to explore and contribute to the IITdh Unified HelpDesk project!

Link for the demo: https://www.youtube.com/watch?v=G8wzyDV0KDw


