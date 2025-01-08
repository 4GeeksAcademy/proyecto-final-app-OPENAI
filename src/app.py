"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from openai import OpenAI
import openai

client = OpenAI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


# Con este código solo las rutas /api/ son accesibles desde cualquier origen y cualquier dominio
CORS(app, resources={r"/api/*": {"origins": "*"}})

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Carga las variables de entorno (como la API_KEY)
load_dotenv()


@app.route('/api/generate-recipe', methods=['POST'])
def generate_recipe():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "No se proporcionó un prompt"}), 400

    #   Prueba para no gastar tokens.
    #     return jsonify({
    #     "recipe": (
    #         f"Receta generada para los ingredientes: {prompt}\n"
    #         "1. Mezclar los ingredientes.\n"
    #         "2. Cocinar a fuego medio por 20 minutos.\n"
    #         "3. Servir y disfrutar."
    #     )
    # }), 200
    
    # Me daba problema el davinci porque está deprecated, así que usamos el modelo gpt-3.5-turbo
    # Temperature es el estilo de respuesta entre 0 y 1. 0 más predecible, 1 más creativa.
    # max_tokens define el límite máximo de tokens (unidad de texto) que el modelo puede generar en la respuesta.
    # Cada solicitud cuenta con los tokens del prompt y de la respuesta. El modelo (450TK) y el
    # prompt (ej. 50 TK), el coste será de 500 tokens.
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Eres un chef virtual experto en crear recetas. Responde "
                        "generando una receta completa basada en los ingredientes "
                        "dados. Incluye tiempos de preparación y cocción, lista de "
                        "ingredientes con cantidades, lista de alérgenos, "
                        "información nutricional (hidratos, "
                        "proteínas, grasas y calorías totales) y peso por ración."
                    )
                },
                {
                    "role": "user",
                    "content": f"Ingredientes: {prompt}"
                }
            ],
            temperature=0.7,
            max_tokens=500)

        # Obtener la respuesta generada por el modelo
        recipe = response.choices[0].message.content.strip()
        return jsonify({"recipe": recipe}), 200

    except openai.OpenAIError as e:
        print("Error con OpenAI:", str(e))
        return jsonify({"error": "Hubo un problema con el servicio de OpenAI"}), 500
    except Exception as e:
        print("Error en el backend:", str(e))
        return jsonify({"error": "Hubo un problema generando la receta"}), 500


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
