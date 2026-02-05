# HRMS Lite - Human Resource Management System

A lightweight, modern web-based Human Resource Management System for managing employee records and daily attendance tracking.

## 🚀 Live Demo

- **Frontend URL**: [To be deployed on Vercel]
- **Backend API**: [To be deployed on Render]
- **API Documentation**: [Backend URL]/docs

## ✨ Features

### Employee Management
- ✅ Add new employees with validation
- ✅ View all employees in a sortable table
- ✅ Delete employees with confirmation
- ✅ Unique employee ID enforcement
- ✅ Email validation

### Attendance Management
- ✅ Mark daily attendance (Present/Absent)
- ✅ View attendance records by employee
- ✅ Filter and sort attendance data
- ✅ Date-based attendance tracking

### UI/UX Features
- ✅ Professional, modern interface with Ant Design
- ✅ Responsive design (mobile and desktop)
- ✅ Loading states for async operations
- ✅ Empty states with helpful messages
- ✅ Error handling with user-friendly messages
- ✅ Form validation with real-time feedback

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Ant Design
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Date Handling**: Day.js

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase PostgreSQL

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL database (Supabase or local)

## 🚀 Local Setup

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite
   CORS_ORIGINS=http://localhost:5173
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`
   
   API Documentation: `http://localhost:8000/docs`

   > **Note**: For Supabase setup, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📡 API Endpoints

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Create a new employee |
| GET | `/api/employees` | Get all employees |
| DELETE | `/api/employees/{employee_id}` | Delete an employee |

### Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attendance` | Mark attendance |
| GET | `/api/attendance/{employee_id}` | Get employee attendance records |

### Request/Response Examples

**Create Employee**
```json
POST /api/employees
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}
```

**Mark Attendance**
```json
POST /api/attendance
{
  "employee_id": "EMP001",
  "date": "2026-02-05",
  "status": "Present"
}
```

## 🗄️ Database Schema

### Employees Table
```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  employee_id VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);
```

## 🚢 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `DATABASE_URL`: Your Supabase PostgreSQL URL
   - `CORS_ORIGINS`: Your Vercel frontend URL

### Frontend Deployment (Vercel)

1. Import your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL
4. Deploy

### Database Setup (Supabase)

1. Create a new PostgreSQL database on Supabase
2. Copy the direct connection URL (port 5432)
3. Use it in your backend `.env` and Render environment variables

**Important**: Use the **direct connection string** (port 5432), not the pooler (port 6543) for SQLAlchemy compatibility.

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required)
- All users have admin privileges
- Employees are identified by unique employee IDs
- Attendance can be marked for any date (past or future)
- One attendance record per employee per date

### Limitations
- No user authentication/authorization
- No role-based access control
- No leave management
- No payroll features
- No attendance reports/analytics
- No bulk operations
- No employee profile pictures
- No audit logs

### Future Enhancements
- User authentication with JWT
- Role-based permissions (Admin, HR, Employee)
- Attendance reports and analytics
- Leave management system
- Employee self-service portal
- Bulk import/export (CSV/Excel)
- Email notifications
- Dashboard with statistics

## 🧪 Testing

### Backend Testing
```bash
# Start the backend server
cd backend
uvicorn app.main:app --reload

# Test endpoints using the interactive docs
# Visit http://localhost:8000/docs
```

### Frontend Testing
```bash
# Start the frontend dev server
cd frontend
npm run dev

# Manually test:
# - Add employee with valid/invalid data
# - View employee list
# - Delete employee
# - Mark attendance
# - View attendance records
# - Check responsive design
```

## 📂 Project Structure

```
HRMS/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── employees.py
│   │   │   └── attendance.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Employees/
│   │   │   ├── Attendance/
│   │   │   └── Common/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
└── README.md
```

## 👨‍💻 Developer

Built as a full-stack coding assignment demonstrating:
- RESTful API design
- Database modeling
- Modern React development
- Professional UI/UX
- Error handling & validation
- Production deployment

## 📄 License

This project is created for educational and demonstration purposes.

---

**HRMS Lite** - Simple, Modern, Efficient HR Management
