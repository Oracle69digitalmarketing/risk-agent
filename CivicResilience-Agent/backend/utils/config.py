import os
from dotenv import load_dotenv

load_dotenv()

OPENAIAPIKEY = os.getenv("OPENAIAPIKEY")
TIDBAPIKEY = os.getenv("TIDBAPIKEY")
AUTHORITYWEBHOOK = os.getenv("AUTHORITYWEBHOOK")
DEBUG = os.getenv("DEBUG", "true").lower() == "true"