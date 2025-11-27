import { useEffect, useState } from "react";
import "./MyApiGame.css";

export default function MyApiGame() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  

  // Sound effects

  const correctSound = new Audio("/sounds/correct.wav");
  const wrongSound = new Audio("/sounds/wrong.wav");
  const revealSound = new Audio("/sounds/reveal.wav");


  // Fetch random Pokemon

  function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 151) + 1; 
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        setGuess("");
        setResult("");
        setRevealed(false);
      });
  }

  useEffect(() => {
    fetchRandomPokemon();
  }, []);


  // Check player's guess

  function checkAnswer() {
    if (!pokemon) return;

    setRevealed(true);
    revealSound.play(); 

    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setResult(` Correct! It's ${pokemon.name}!`);
      setScore(score + 1);
      correctSound.play();
    } else {
      setResult(` Wrong! It was ${pokemon.name}.`);
      wrongSound.play();
    }
  }

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Guess the Pokemon!</h1>
        <h3 className="score">Score: {score}</h3>

        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt="pokemon"
          className="image"
          style={{
            filter: revealed ? "brightness(1)" : "brightness(0)",
            transform: revealed ? "scale(1)" : "scale(0.9)",
          }}
        />

        <input
          type="text"
          placeholder="Enter Pokemon name..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="input"
        />

        <button onClick={checkAnswer} className="buttonPrimary">
          Guess
        </button>

        <p className="result">{result}</p>

        <button onClick={fetchRandomPokemon} className="buttonSecondary">
          Next Pokémon
        </button>
      </div>
    </div>
  );
}
