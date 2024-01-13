from flask import Blueprint, request, jsonify
from pymongo import MongoClient

movieinfo_bp = Blueprint("movieinfo", __name__)

# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://admin:admin@cluster0.mlt4ten.mongodb.net/?retryWrites=true&w=majority"
)
db = client["sample_mflix"]
collection = db["movies"]


@movieinfo_bp.route("/api/movies", methods=["GET"])
def api_movies():
    # Get query parameters for pagination
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 12 * 5))

    # Calculate the offset based on page number and items per page
    offset = (page - 1) * per_page

    # Fetch movies with pagination
    movies = list(collection.find({}, {"_id": 0}).skip(offset).limit(per_page))

    return jsonify({"movies": movies})
