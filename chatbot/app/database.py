import psycopg2
from psycopg2.extensions import connection as PostgreSQLConnection

from app.config import DATABASE_URL


def get_connection() -> PostgreSQLConnection:
    """Create and return a PostgreSQL database connection."""

    return psycopg2.connect(DATABASE_URL)


def test_database_connection() -> None:
    """Verify that PostgreSQL is reachable."""

    connection = get_connection()

    try:
        print("PostgreSQL connection successful.")
    finally:
        connection.close()