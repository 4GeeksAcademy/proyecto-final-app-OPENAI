import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [prompt, setPrompt] = useState(""); // Para almacenar el input del usuario
	const [recipe, setRecipe] = useState(""); // Para mostrar la respuesta de la API
	const [loading, setLoading] = useState(false); // Para manejar el estado de carga

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Indica que la solicitud está en proceso
		setRecipe(""); // Resetea la receta antes de la nueva solicitud

		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/generate-recipe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				throw new Error("Error al comunicarse con el backend");
			}

			const data = await response.json();
			setRecipe(data.recipe); // Actualiza la receta con la respuesta del backend
		} catch (error) {
			console.error("Error:", error);
			setRecipe("Hubo un problema generando la receta. Intenta de nuevo.");
		} finally {
			setLoading(false); // Indica que la solicitud ha terminado
		}
	};

	return (
		<div className="container">
			<ul className="list-group">
				{store.demo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
								// Check to see if the background is orange, if so, display the message
								item.background === "orange" ? (
									<p style={{ color: item.initial }}>
										Check store/flux.js scroll to the actions to see the code
									</p>
								) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
			<div style={styles.container}>
				<h1>Generador de Recetas</h1>
				<form onSubmit={handleSubmit} style={styles.form}>
					<textarea
						style={styles.textarea}
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder="Ingresa los ingredientes (ejemplo: zanahorias, pollo, arroz)"
						required
					/>
					<button type="submit" style={styles.button}>
						{loading ? "Generando..." : "Generar Receta"}
					</button>
				</form>
				{recipe && (
					<div style={styles.recipeContainer}>
						<h2>Receta Generada:</h2>
						<pre style={styles.recipe}>{recipe}</pre>
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	container: {
	  maxWidth: "600px",
	  margin: "0 auto",
	  padding: "20px",
	  textAlign: "center",
	  fontFamily: "Arial, sans-serif",
	},
	form: {
	  marginBottom: "20px",
	},
	textarea: {
	  width: "100%",
	  height: "100px",
	  padding: "10px",
	  fontSize: "16px",
	  marginBottom: "10px",
	  borderRadius: "5px",
	  border: "1px solid #ccc",
	},
	button: {
	  padding: "10px 20px",
	  fontSize: "16px",
	  borderRadius: "5px",
	  border: "none",
	  backgroundColor: "#007BFF",
	  color: "#fff",
	  cursor: "pointer",
	},
	recipeContainer: {
	  textAlign: "left",
	  marginTop: "20px",
	},
	recipe: {
	  backgroundColor: "#f8f8f8",
	  padding: "10px",
	  borderRadius: "5px",
	  whiteSpace: "pre-wrap",
	  wordWrap: "break-word",
	},
  };