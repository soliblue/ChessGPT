import os

import firebase_admin
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import firestore

if os.path.exists("app/internal/firebase.json"):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "app/internal/firebase.json"

STORAGE_BUCKET_NAME = "chessgpt-xyz.appspot.com"
firebase_app = firebase_admin.initialize_app(
    options={"storageBucket": STORAGE_BUCKET_NAME}
)
# initialize firestore database client
db = firestore.client()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
