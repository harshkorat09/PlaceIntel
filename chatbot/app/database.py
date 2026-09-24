import psycopg2
from psycopg2.extensions import connection as PostgreSQLConnection

from app.config import DATABASE_URL


def get_connection() -> PostgreSQLConnection:
    """Create and return a PostgreSQL database connection."""

    # psycopg2 does not support Prisma-specific query parameters like ?schema=public
    clean_url = DATABASE_URL.split('?')[0]
    return psycopg2.connect(clean_url)


def test_database_connection() -> None:
    """Verify that PostgreSQL is reachable."""

    connection = get_connection()

    try:
        print("PostgreSQL connection successful.")
    finally:
        connection.close()