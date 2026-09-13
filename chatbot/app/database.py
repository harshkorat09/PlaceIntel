import psycopg2

from app.config import DATABASE_URL


def test_database_connection() -> None:
    connection = psycopg2.connect(DATABASE_URL)

    try:
        print("PostgreSQL connection successful.")
    finally:
        connection.close()