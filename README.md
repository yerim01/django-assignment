# Product Search App

This project is a simple product search app built with Django + React.

**Users can**:

- Search products by description
- Filter products by category
- Filter products by tags
- Combine search and filters

## ✨ Tech Stack

- **Django** + DRF for the backend API
- **React** + **Tailwind CSS** for the frontend
- **PostgreSQL/sqlite3** for the database

## 📦 Getting Started

### 1. Clone the repo

```
git clone https://github.com/yerim01/django-assignment
cd django-assignment
```

### 2. Backend setup

```
cd Backend

# Create a virtual environment to isolate our package dependencies locally
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser to access Django admin
python manage.py createsuperuser

# Run server
python manage.py runserver
```

#### Set up environment variables (Optional)

Default is SQLite. If you want to use PostgreSQL, add env variables.

Create a .env.local file and add the following:

```
POSTGRES_DB=shop
POSTGRES_USER=shopuser
POSTGRES_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5432

```

- Access backend API: http://localhost:8000/
- Access Django admin: http://localhost:8000/admin/

### 3. Frontend setup

```
cd frontend
npm install
npm run dev

```

- React app runs on: http://localhost:5173/

## API Reference

- `/products/` - GET all products, supports query params:

  - `search`: search by product description (example: `/products/?search=wire`)
  - `category`: filter by category ID (example: `/products/?category=2`)
  - `tags`: filter by one or more tag IDs (example: `/products/?tags=1&tags=3`)
  - You can combine these filters (example: `/products/?search=wire&category=2&tags=1&tags=3`)

- `/categories/` - GET a lit of categories
- `/tags/` - GET a list of tags

## Acknowledgements

- Used ChatGPT and Figma Make to generate boilerplate for this project.
