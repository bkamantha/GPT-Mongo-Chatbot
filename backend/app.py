from flask import Flask, render_template
from modules.movieinfo import (
    movieinfo_bp,
)

app = Flask(__name__, static_url_path="/static")

# Register the blueprint
app.register_blueprint(movieinfo_bp)


# Other routes and configurations remain unchanged
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/dialog")
def dialog_window():
    return render_template("dialogwindow.html")


if __name__ == "__main__":
    app.run(debug=True)
