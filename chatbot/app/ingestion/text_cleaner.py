import re


def clean_text(text: str) -> str:
    """
    Normalize extracted PDF text without changing its meaning.

    The cleaner:
    - normalizes line endings
    - removes excessive whitespace
    - removes repeated blank lines
    - removes spaces around lines
    """

    if not text:
        return ""

    # Normalize different line-ending formats.
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Remove trailing/leading whitespace from each line.
    lines = [line.strip() for line in text.split("\n")]

    # Remove completely empty lines.
    lines = [line for line in lines if line]

    # Rebuild the text.
    text = "\n".join(lines)

    # Collapse excessive spaces/tabs inside lines.
    text = re.sub(r"[ \t]+", " ", text)

    return text.strip()