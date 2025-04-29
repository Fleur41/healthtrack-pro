# HealthTrack Pro

A modern fitness management system built with React and Flask, designed to help trainers manage their clients and fitness programs effectively.

## 🎯 Overview

HealthTrack Pro is a full-stack web application that provides:
- Client management and tracking
- Fitness program creation and assignment
- Real-time analytics dashboard
- Secure authentication and authorization
- RESTful API backend

## 🏗️ Architecture

```
healthtrack-pro/
├── frontend/          # React + Vite frontend
├── backend/           # Flask API backend
└── docs/             # Additional documentation
```

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Headless UI
- JWT Authentication
- Recharts

### Backend
- Flask
- SQLAlchemy
- JWT Extended
- PostgreSQL
- Docker

## 🛠️ Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthtrack-pro.git
cd healthtrack-pro
```

2. Start the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

3. Start the frontend:
```bash
cd healthtrack-frontend
npm install
npm run dev
```

4. Or use Docker Compose:
```bash
docker compose up --build
```

## 📚 Documentation

- [Frontend Documentation](frontend/README.md)
- [API Documentation](backend/README.md)
- [API Endpoints](http://localhost:5000/api/docs) (when running)

## 🔐 Environment Setup

### Backend (.env)
```env
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/healthtrack
JWT_SECRET_KEY=your-secret-key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd healthtrack-frontend
npm test
```

## 📱 Features

- **User Authentication**
  - JWT-based auth
  - Protected routes
  - Role-based access

- **Client Management**
  - Client profiles
  - Progress tracking
  - Program assignments

- **Program Management**
  - Custom program creation
  - Assignment to clients
  - Progress monitoring

- **Dashboard**
  - Real-time statistics
  - Client overview
  - Program analytics

## 🔒 Security

- JWT Authentication
- Password hashing
- Input validation
- CORS protection
- Error handling

## 🎨 UI/UX

- Responsive design
- Dark mode support
- Interactive charts
- Accessible components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Frontend Developer: Simon Muriithi.
- Backend Developer: Simon Muriithi


## 📧 Contact

- Email: muriitikings456@gmail.com
- GitHub: [@Fleur41](https://github.com/Fleur41)

## 🙏 Acknowledgments

- React and Flask communities
- All contributors and users
- Open source packages used
