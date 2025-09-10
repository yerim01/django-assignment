# Product Search App
This project is a simple product search app built with Django + React.

**Users can**:

- Search products by description  
- Filter products by category  
- Filter products by tags  
- Combine search and filters  


## Screenshots

![Screenshot]()


## Tech Stack

- **Django** + DRF for the backend API  
- **React** + **Tailwind CSS** for the frontend  
- **PostgreSQL/sqlite3** for the database
- **Docker**

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yerim01/django-assignment
cd django-assignment
```

### 2. Backend setup
```bash
cd Backend

# Create a virtual environment to isolate our package dependencies locally
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Load sample data (Optional. If you want to add data manually in the Django admin, skip this step)
python manage.py loaddata sample_data.json

# Create superuser to access Django admin
python manage.py createsuperuser

# Run server
python manage.py runserver
```

#### Set up environment variables (Optional)
Default is SQLite. If you want to use PostgreSQL, add env variables.

Create a .env.local file and add the following:
```bash
DB_ENGINE=django.db.backends.postgresql
POSTGRES_DB=shop
POSTGRES_USER=shopuser
POSTGRES_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5432
```

- Access backend API: `http://localhost:8000/`
- Access Django admin: `http://localhost:8000/admin/`


### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev

```
- React app runs on: `http://localhost:5173/`

### Docker setup (Optional)
When using Docker, you do not need PostgreSQL. The container runs with SQLite.
- Clone the source code and install docker before running commands below
```bash
# Run where docker-compose.yml is located
docker-compose up --build

docker-compose exec backend python manage.py migrate

docker-compose exec backend python manage.py createsuperuser

# Load sample data (Optional. If you want to add data manually in the Django admin, skip this step)
docker-compose exec backend python manage.py loaddata sample_data.json
```
- Access backend API: `http://localhost:8000/`
- Access Django admin: `http://localhost:8000/admin/`
- React app runs on: `http://localhost:3000/`
## API Reference

- `/products/` - GET all products, supports query params:
  - `search`: search by product description (example: `/products/?search=wire`)
  - `category`: filter by category ID (example: `/products/?category=2`)
  - `tags`: filter by one or more tag IDs (example: `/products/?tags=1&tags=3`)
  - You can combine these filters (example: `http://localhost:8000/products/?search=wire&category=2&tags=1&tags=3`)

- `/categories/` - GET a lit of categories (example: `http://localhost:8000/categories/`)
- `/tags/` - GET a list of tags (example: `http://localhost:8000/tags/`)


## Running Tests

To run tests, run the following command

```bash
  python manage.py test
```
On Docker, run the following command
```bash
  docker-compose exec backend python manage.py test
```


## Notes

- Category, Tag and Product are ordered by name
- Filtering uses AND logic between search, category and tags
- Tag filtering uses OR logic for multiple tags
- Frontend fetches data dynamically as the user types search keyword or selects filters


## Acknowledgements

 - Used ChatGPT and Figma Make to generate sample data and boilerplate for this project.
