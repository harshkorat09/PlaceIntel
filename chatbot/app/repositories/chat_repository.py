from app.database import get_connection

def get_or_create_session(user_id: int, session_id: int | None = None) -> int:
    """Gets an existing session for the user or creates a new one."""
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            if session_id:
                # Check if session exists and belongs to user
                cursor.execute(
                    'SELECT id FROM "ChatSession" WHERE id = %s AND "userId" = %s',
                    (session_id, user_id)
                )
                row = cursor.fetchone()
                if row:
                    return row[0]
            
            # Create new session
            cursor.execute(
                'INSERT INTO "ChatSession" ("userId", "updatedAt") VALUES (%s, NOW()) RETURNING id',
                (user_id,)
            )
            new_id = cursor.fetchone()[0]
            connection.commit()
            return new_id
    finally:
        connection.close()


def save_message(session_id: int, role: str, content: str):
    """Saves a message to the database."""
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'INSERT INTO "ChatMessage" ("sessionId", role, content) VALUES (%s, %s, %s)',
                (session_id, role, content)
            )
            # update session updatedAt
            cursor.execute(
                'UPDATE "ChatSession" SET "updatedAt" = NOW() WHERE id = %s',
                (session_id,)
            )
            connection.commit()
    finally:
        connection.close()


def get_recent_messages(session_id: int, limit: int = 6) -> list[dict]:
    """Gets the recent messages for a session."""
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                '''
                SELECT role, content FROM "ChatMessage"
                WHERE "sessionId" = %s
                ORDER BY "createdAt" ASC
                ''',
                (session_id,)
            )
            rows = cursor.fetchall()
            
            # Return last `limit` messages
            recent_rows = rows[-limit:] if len(rows) > limit else rows
            
            return [
                {"role": row[0], "content": row[1]}
                for row in recent_rows
            ]
    finally:
        connection.close()
